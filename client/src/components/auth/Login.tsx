import { useNavigate } from 'react-router-dom';
import { LoginFormData, loginSchema } from '../../schemas/authSchemas';
import { login } from '../../services/authService';
import FormComponent from './FormComponent';
import './Auth.css';

function Login() {
  const navigate = useNavigate();

  const fields = [
    { name: 'email' as const, type: 'email', placeholder: 'Votre Email' },
    { name: 'password' as const, type: 'password', placeholder: 'Votre Mot de Passe' }
  ];

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <FormComponent<LoginFormData>
      fields={fields}
      schema={loginSchema}
      onSubmit={onSubmit}
      title="SE CONNECTER"
      submitText="Se connecter"
      switchText="Pas encore de compte ?"
      switchLink="/register"
      switchLinkText="S'enregistrer"
    />
  );
}

export default Login;