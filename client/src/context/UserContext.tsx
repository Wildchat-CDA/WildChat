import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  uuid: string;
  nom: string;
  prenom: string;
  avatarURL: string;
}

interface UserContextType {
  user: User | null;
  jwt: string | null;
  setUser: (user: User | null) => void;
  setJwt: (jwt: string | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedJwt = localStorage.getItem('jwt');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedJwt) setJwt(storedJwt);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [jwt]);

  const logout = () => {
    setUser(null);
    setJwt(null);
  };

  return (
    <UserContext.Provider value={{ user, jwt, setUser, setJwt, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}