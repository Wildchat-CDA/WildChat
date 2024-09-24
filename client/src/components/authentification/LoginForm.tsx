import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthentificationContext';
import "./Auth.css";
import "../../App.css"

const schema = z.object({
  email: z.string().email('Email invalide').nonempty('L\'email est requis'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').nonempty('Le mot de passe est requis')
});

type LoginFormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (

    
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Mot de passe</label>
        <input type="password" {...register('password')} />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <button type="submit" className="submit-button">Se connecter</button>
    </form>
  );
};

export default LoginForm;