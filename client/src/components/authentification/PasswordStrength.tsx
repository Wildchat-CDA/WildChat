import React from "react";
import { validatePasswordStrength } from "../../utils/ValidationPassword";



interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const { isValid, errors } = validatePasswordStrength(password);

  return (
    <div className="PasswordStrength">
      <h4>Votre mot de passe doit contenir:</h4>
      <ul>
        {[
          "Entre 8 et 100 caractères",
          "1 majuscule",
          "1 minuscule",
          "1 caractère spécial",
          "1 chiffre"
        ].map((requirement, index) => (
          <li 
            key={index} 
            className={isValid || !errors.some(error => error.includes(requirement.toLowerCase())) ? "valid" : "invalid"}
          >
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PasswordStrength };
