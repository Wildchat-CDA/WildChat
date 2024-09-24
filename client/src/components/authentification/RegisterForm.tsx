import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthentificationContext';
import { PasswordStrength } from './PasswordStrength';
import { passwordSchema } from '../../utils/ValidationPassword';
import "./Auth.css";
import "../../App.css"

const registerSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  firstName: z.string().min(1, "Le prénom est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  password: passwordSchema,
  confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data.name, data.firstName, data.email, data.password);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src="./logo-Wild-Chat.svg" alt="App Icon" className="app-icon" />
        <h1>WILDCHAT</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nom</label>
          <input id="name" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input id="firstName" {...register('firstName')} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <PasswordStrength password={password} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
};

export default Register;
