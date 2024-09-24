import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { validatePasswordStrength } from '../../utils/ValidationPassword';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = "" }) => {
  const { isValid, errors } = validatePasswordStrength(password);
  
  const conditions = [
    { requirement: "Entre 8 et 100 caractères", condition: password.length >= 8 && password.length <= 100 },
    { requirement: "1 majuscule", condition: /[A-Z]/.test(password) },
    { requirement: "1 minuscule", condition: /[a-z]/.test(password) },
    { requirement: "1 caractère spécial", condition: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { requirement: "1 chiffre", condition: /\d/.test(password) },
  ];

  return (
    <div className="password-strength">
      <h5>Votre mot de passe doit contenir :</h5>
      <ul>
        {conditions.map((item, index) => (
          <li key={index} className={item.condition ? "valid" : "invalid"}>
            {item.condition ? <FaCheck className="icon valid" /> : <FaTimes className="icon invalid" />}
            {item.requirement}
          </li>
        ))}
        {errors.map((error, index) => (
          <li key={`error-${index}`} className="error">
            <FaTimes className="icon invalid" />
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PasswordStrength };

