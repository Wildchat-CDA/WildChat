import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../components/common/Logo';
import "./addStudent.css"

const schema = z.object({
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

// const API_URL = `${import.meta.env.VITE_API_URL}`;

function SetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.put(`${API_URL}/invite/${token}`, {
        password: data.password,
      });
      console.log('Réponse du serveur:', response.data);
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erreur Axios:', error.response?.data);
        setError('password', { 
          type: 'manual', 
          message: error.response?.data?.message || 'Une erreur est survenue lors de la définition du mot de passe' 
        });
      } else {
        console.error('Erreur inattendue:', error);
        setError('password', { 
          type: 'manual', 
          message: 'Une erreur inattendue est survenue' 
        });
      }
    }
  };

  return (
    <div className="auth-container">
    <div className="auth-logo">
     <Logo width={150} height={200} color="white" aria-hidden="true" />
     <div className="auth-logo-title">
       <p>WILD</p>
       <p>CHAT</p>
     </div>
     </div>
    <div className="set-password-page">
      <h1>Définir votre mot de passe</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Votre Mot de passe"
            autoComplete="password"
            {...register('password')}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="confirmPassword" aria-label='confirmPassword'>Confirmer le mot de passe</label>
          <input
            type="password"
            placeholder= "Confirmer Votre password"
            autoComplete="password"
            id="confirmPassword"
            
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit" className="ChangePassword">Définir le mot de passe</button>
      </form>
    </div>
    </div>

  );
}

export default SetPasswordPage;