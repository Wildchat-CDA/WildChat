import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type UserRole = 'student' | 'teacher';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  vocalChannelPosition: string | null;
  setVocalChannelPosition: React.Dispatch<React.SetStateAction<string>>;
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

  const value = {
    userRole,
    setUserRole,
    vocalChannelPosition,
    setVocalChannelPosition,
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
}
