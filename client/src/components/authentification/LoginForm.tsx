import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthentificationContext';
import { login } from '../../services/authentificationService';
import { PasswordStrength } from "./PasswordStrength"
import './Auth.css';
import Cookies from 'js-cookie';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await login(data.email, data.password);
      if(user?.accessToken){
        Cookies.set('token', user?.accessToken, { secure: true, sameSite: 'Strict' });
      }
      
      authLogin(user, data.password); 
      navigate('/');
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src="./logo/logo-Wild-Chat.svg" alt="WildChat Logo" />
        <div className="auth-logo-title">
          <p>WILD</p>
          <p>CHAT</p>
        </div>
      </div>
      <h2>SE CONNECTER</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div className="form-group">
        <label htmlFor="email" aria-label="adresse mail">Votre Email - Champs obligatoire</label>
          <input
            type="email"
            id="email"
            placeholder="Votre Email"
            {...register('email', { required: "L'email est requis" })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password" aria-label=" mot de passe">Votre Email - Champs obligatoire</label>
          <input
            type="password"
            id="password"
            placeholder="Votre Mot de Passe"
            {...register('password', { required: "Le mot de passe est requis" })}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
          <PasswordStrength password={password} />
        </div>
        <p className="login-link">
           En cliquant sur Se connecter, vous acceptez les <a href="/cgu">CGU</a> . Pour plus d'informations sur la manière dont nous traitons
            vos données personnelles, veuillez consulter <a href="/politique_prive">notre Politique vie privée</a>.
        </p>
        <div className="div-btn">
        <button type="submit" className="auth-button">SE CONNECTER</button>
        </div>
      </form>
      <p className="login-link">Vous n'avez pas encore de compte ? <a href="/register">S'enregistrer</a></p>
    </div>
  );
};

export { LoginForm };
