import { ReactNode, createContext, useState } from 'react';

export interface AuthContextType {
  user: any;
  signIn: (user: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

export let AuthContext = createContext<AuthContextType | null>(null);

const fakeAuthProvider = {
  isAuthenticated: false,
  signIn(callback: VoidFunction) {
    this.isAuthenticated = true;
    setTimeout(callback, 300);
  },
  signOut(callback: VoidFunction) {
    this.isAuthenticated = false;
    setTimeout(callback, 300);
  },
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  let signIn = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signIn(() => {
      setUser(newUser);
      callback();
    });
  };

  let signOut = (callback: VoidFunction) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null);
      callback();
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
