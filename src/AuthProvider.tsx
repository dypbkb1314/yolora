import { ReactNode, createContext, useState } from 'react';

export interface AuthContextType {
  user: any;
  signIn: (user: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

export let AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(localStorage.getItem('user') || null);

  let signIn = (newUser: string, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };

  let signOut = (callback: VoidFunction) => {
    localStorage.removeItem('user'); 
    localStorage.removeItem('token');
    setUser(null);
    callback();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
