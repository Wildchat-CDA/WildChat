import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../../services/authentificationService';
import { PasswordStrength } from './PasswordStrength';
import './Auth.css';
import Logo from '../common/Logo';
import { webSocketService } from '../../services/webSocketService';

type RegisterFormData = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.nom, data.prenom, data.email, data.password);

      navigate('/login');
    } catch (error) {
      console.error("Erreur d'inscription", error);
    }
  };

  const password = watch('password');

  return (
    <div className='auth-container'>
      <div className='auth-logo'>
        <Logo width={200} height={150} color='white' aria-hidden='true' />
        <div className='auth-logo-title'>
          <p>WILD</p>
          <p>CHAT</p>
        </div>
      </div>
      <div className='senRegister'>S'ENREGISTRER</div>
      <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
        <div className='form-group'>
          <label htmlFor='nom' aria-label='nom'>
            {' '}
            Votre Nom{' '}
          </label>
          <input
            type='text'
            id='nom'
            placeholder='Votre Nom'
            {...register('nom', { required: 'Le nom est requis' })}
          />
          {errors.nom && (
            <span className='error-message'>{errors.nom.message}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='prénom' aria-label='prénom'>
            {' '}
            Votre Prénom{' '}
          </label>
          <input
            type='text'
            id='prenom'
            placeholder='Votre Prénom'
            {...register('prenom', { required: 'Le prénom est requis' })}
          />
          {errors.prenom && (
            <span className='error-message'>{errors.prenom.message}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='email' aria-label='adresse mail'>
            {' '}
            Votre Email{' '}
          </label>
          <input
            autoComplete='email'
            type='email'
            id='email'
            placeholder='Votre Email'
            {...register('email', { required: "L'email est requis" })}
          />
          {errors.email && (
            <span className='error-message'>{errors.email.message}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='password' aria-label=' mot de passe'>
            {' '}
            Votre Mot de passe{' '}
          </label>
          <input
            autoComplete='new-password'
            type='password'
            id='password'
            placeholder='Votre Mot de Passe'
            {...register('password', {
              required: 'Le mot de passe est requis',
            })}
          />
          {errors.password && (
            <span className='error-message'>{errors.password.message}</span>
          )}
          <PasswordStrength password={password || ''} />
        </div>
        <div className='form-group'>
          <label htmlFor='repeat-password' aria-label=' mot de passe'>
            {' '}
            Répéter Mot-de-Passe{' '}
          </label>
          <input
            type='password'
            id='repeat-password'
            autoComplete='new-password'
            placeholder='Répéter Mot de Passe'
            {...register('confirmPassword', {
              required: 'La confirmation du mot de passe est requise',
              validate: (value) =>
                value === password || 'Les mots de passe ne correspondent pas',
            })}
          />
          {errors.confirmPassword && (
            <span className='error-message'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <p className='login-link'>
          En cliquant sur Se connecter, vous acceptez les <a href='/cgu'>CGU</a>{' '}
          . Pour plus d'informations sur la manière dont nous traitons vos
          données personnelles, veuillez consulter{' '}
          <a href='/politique_prive'>notre Politique vie privée</a>.
        </p>
        <div className='div-btn'>
          <button type='submit' className='auth-button'>
            S'enregistrer
          </button>
        </div>
      </form>
      <p className='login-link'>
        Vous possédez déjà un compte ? <a href='/login'>Connexion</a>
      </p>
    </div>
  );
};

export { RegisterForm };
