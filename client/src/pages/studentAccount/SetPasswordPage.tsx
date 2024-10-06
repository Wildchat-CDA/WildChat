import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

function SetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.put(`${API_URL}/invite/${token}`, {
        password: data.password,
        
      });
      navigate('/login');
      console.log(response.data, response.status);
    } catch (error) {
      console.error('Erreur lors de la définition du mot de passe:', error);
    }
  };

  return (
    <div className="set-password-page">
      <h1>Définir votre mot de passe</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit">Définir le mot de passe</button>
      </form>
    </div>
  );
}

export default SetPasswordPage;