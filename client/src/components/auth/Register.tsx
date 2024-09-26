import { useNavigate } from 'react-router-dom';
import { RegisterFormData, registerSchema } from '../../schemas/authSchemas';
import { register } from '../../services/authService';
import FormComponent from './FormComponent';
import './Auth.css';

function Register() {
  const navigate = useNavigate();

  const fields = [
    { name: 'nom' as const, type: 'text', placeholder: 'Votre Nom' },
    { name: 'prenom' as const, type: 'text', placeholder: 'Votre Prénom' },
    { name: 'email' as const, type: 'email', placeholder: 'Votre Email' },
    { name: 'password' as const, type: 'password', placeholder: 'Votre Mot de Passe' },
    { name: 'repeatPassword' as const, type: 'password', placeholder: 'Répétez votre Mot de Passe' }
  ];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await register(data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <FormComponent<RegisterFormData>
      fields={fields}
      schema={registerSchema}
      onSubmit={onSubmit}
      title="S'ENREGISTRER"
      submitText="S'enregistrer"
      switchText="Vous possédez déjà un compte ?"
      switchLink="/login"
      switchLinkText="Connexion"
    />
  );
}

export default Register;