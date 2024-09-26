import { useState, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

interface FormField {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  autocomplete?: string;
}

interface FormComponentProps<T extends FieldValues> {
  fields: FormField[];
  schema: ZodSchema<T>;
  onSubmit: (data: T) => void;
  title: string;
  submitText: string;
  switchText: string;
  switchLink: string;
  switchLinkText: string;
}

function FormComponent<T extends FieldValues>({
  fields,
  schema,
  onSubmit,
  title,
  submitText,
  switchText,
  switchLink,
  switchLinkText
}: FormComponentProps<T>) {
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [passwordStrength, setPasswordStrength] = useState<Record<string, boolean>>({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
    number: false
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const password = watch('password');

  useEffect(() => {
    if (typeof password === 'string') {
      setPasswordStrength({
        length: password.length >= 8 && password.length <= 100,
        uppercase: (password.match(/[A-Z]/g) || []).length >= 2,
        lowercase: (password.match(/[a-z]/g) || []).length >= 2,
        special: (password.match(/[!@#$%^&*]/g) || []).length >= 2,
        number: (password.match(/[0-9]/g) || []).length >= 2
      });
    }
  }, [password]);

  const getInputClass = (fieldName: keyof T) => {
    if (!touchedFields[fieldName as string]) return 'error';
    return errors[fieldName] ? 'error' : 'success';
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-header">
          <Logo />
          <h1>WILD CHAT</h1>
        </div>
        <h2>{title}</h2>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="input-label">
              {field.label}
            </label>
            <div className="input-wrapper">
              <span className={`validation-icon ${getInputClass(field.name as keyof T)}`}>
                {errors[field.name as keyof T] ? <FaTimes /> : <FaCheck />}
              </span>
              <input
                {...register(field.name as keyof T)}
                id={field.name}
                placeholder={field.placeholder}
                type={field.type === 'password' && showPassword[field.name] ? 'text' : field.type}
                className={getInputClass(field.name as keyof T)}
                autoComplete={field.autocomplete}
                onBlur={() => handleBlur(field.name)}
              />
              {field.type === 'password' && (
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field.name)}
                  className="toggle-password"
                  aria-label={showPassword[field.name] ? 'Hide password' : 'Show password'}
                >
                  {showPassword[field.name] ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </div>
            {errors[field.name as keyof T] && (
              <p className="error-message">{errors[field.name as keyof T]?.message as string}</p>
            )}
          </div>
        ))}
        {title === "S'ENREGISTRER" && (
          <div className="password-rules">
            <p className={passwordStrength.length ? 'valid' : 'invalid'}>
              {passwordStrength.length ? <FaCheck /> : <FaTimes />} Entre 8 et 100 caractères
            </p>
            <p className={passwordStrength.uppercase ? 'valid' : 'invalid'}>
              {passwordStrength.uppercase ? <FaCheck /> : <FaTimes />} Au moins 2 majuscules
            </p>
            <p className={passwordStrength.lowercase ? 'valid' : 'invalid'}>
              {passwordStrength.lowercase ? <FaCheck /> : <FaTimes />} Au moins 2 minuscules
            </p>
            <p className={passwordStrength.special ? 'valid' : 'invalid'}>
              {passwordStrength.special ? <FaCheck /> : <FaTimes />} Au moins 2 caractères spéciaux
            </p>
            <p className={passwordStrength.number ? 'valid' : 'invalid'}>
              {passwordStrength.number ? <FaCheck /> : <FaTimes />} Au moins 2 chiffres
            </p>
          </div>
        )}
        <p className="terms-agreement">
          En cliquant sur S'enregistrer, vous acceptez les{" "}
          <a href="/cgu" onClick={(e) => handleLinkClick(e, "/cgu")}>
            CGU
          </a>
          . Pour plus d'informations sur la manière dont nous traitons vos données personnelles, veuillez
          consulter notre{" "}
          <a href="/politics" onClick={(e) => handleLinkClick(e, "/politics")}>
            Politique vie privée
          </a>
          .
        </p>
        <button type="submit" disabled={!isValid}>{submitText}</button>
        <div className="auth-switch">
          {switchText} <Link to={switchLink}>{switchLinkText}</Link>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;