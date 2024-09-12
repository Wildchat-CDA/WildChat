import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ISectionChannel } from '../types/sectionTypes';

// Définition du type pour le contexte
interface NavigationContextType {
  currentSection: ISectionChannel | null;
  setCurrentSection: React.Dispatch<
    React.SetStateAction<ISectionChannel | null>
  >;
}

// Création du contexte avec un type par défaut
const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

// Hook personnalisé pour accéder au contexte
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

interface NavigationProviderProps {
  children: ReactNode;
}

// Composant provider pour le contexte de navigation
export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentSection, setCurrentSection] = useState<ISectionChannel | null>(
    null
  );

  const value = {
    currentSection,
    setCurrentSection,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
