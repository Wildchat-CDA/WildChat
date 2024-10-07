import React, { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

type UserRole = 'student' | 'teacher';
type UserInfos = {
  email: string;
  firstname: string;
  id: number;
  name: string;
  role: string;
};

const cookie = JSON.parse(Cookies.get('token') as string);
interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  vocalChannelPosition: string | null;
  setVocalChannelPosition: React.Dispatch<React.SetStateAction<string>>;
  userInfos: UserInfos;
  setUserInfos: React.Dispatch<React.SetStateAction<UserInfos>>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}

interface UserRoleProviderProps {
  children: ReactNode;
}

export function UserRoleProvider({ children }: UserRoleProviderProps) {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [vocalChannelPosition, setVocalChannelPosition] = useState<string>('');
  const [userInfos, setUserInfos] = useState(cookie.userInfo);

  const value = {
    userRole,
    setUserRole,
    vocalChannelPosition,
    setVocalChannelPosition,
    userInfos,
    setUserInfos,
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
}
