import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ISectionChannel } from '../types/sectionTypes';

// Définition du type pour le contexte
export interface NavigationContextType {
  currentSection: ISectionChannel;
  setCurrentSection: React.Dispatch<React.SetStateAction<ISectionChannel>>;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  activeContentMainComp: boolean;
  setActiveContentMainComp: React.Dispatch<React.SetStateAction<boolean>>;
  isClassRoom: boolean;
  setIsClassRoom: React.Dispatch<React.SetStateAction<boolean>>;
  activeContentSideBar: ActiveSideBarType;
  setActiveContentSide: (activeContentSideBar: ActiveSideBarType) => void;
}

export enum ContentSideBarEnum {
  Home = 'home',
  PrivateMessage = 'privateMessage',
  PresenceList = 'presenceList',
  RaisedHand = 'raisedHame',
}

export type ActiveSideBarType = ContentSideBarEnum;

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
  const [currentSection, setCurrentSection] = useState<ISectionChannel>({
    sectionId: null,
    sectionTitle: '',
    channelTitle: '',
    channelId: null,
    uuid: '',
    messageIndex: null,
    currentMessage: '',
  });
  const [refresh, setRefresh] = useState<number>(0);
  const [activeContentMainComp, setActiveContentMainComp] =
    useState<boolean>(false);
  const [isClassRoom, setIsClassRoom] = useState<boolean>(false);
  const [activeContentSideBar, setActiveContentSide] =
    useState<ActiveSideBarType>(ContentSideBarEnum['Home']);

  const value = {
    currentSection,
    setCurrentSection,
    refresh,
    setRefresh,
    activeContentMainComp,
    setActiveContentMainComp,
    isClassRoom,
    setIsClassRoom,
    activeContentSideBar,
    setActiveContentSide,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
