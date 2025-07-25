import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    // Check for saved user in localStorage (for demo purposes)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // For demo purposes, set as admin if email contains "admin"
      setIsAdmin(parsedUser.email.includes('admin'));
    }
  }, []);
  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, any login with valid format succeeds
    if (email && password.length > 5) {
      const newUser = {
        id: Math.random().toString(),
        name: email.split('@')[0],
        email
      };
      setUser(newUser);
      setIsAdmin(email.includes('admin'));
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };
  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (name && email && password.length > 5) {
      const newUser = {
        id: Math.random().toString(),
        name,
        email
      };
      setUser(newUser);
      setIsAdmin(email.includes('admin'));
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isAdmin,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};