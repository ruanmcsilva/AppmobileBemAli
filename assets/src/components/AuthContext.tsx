import React, { createContext, useState, useContext, ReactNode } from 'react';


interface User {
  email: string;
  senha: string; 
  membroDesde: string;
  nome: string; 
  idade: string;
  planeta: string;
  sexo: string; 
}


interface AuthContextType {
  user: User | null;

  signIn: (dados: any) => void; 
  signUp: (dados: any) => void;
  signOut: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);


const processUserData = (dados: any): User => ({
    email: dados.email || 'N/A',
    senha: dados.senha || 'N/A',
    nome: dados.nome || dados.email.split('@')[0] || 'Usuário',
    idade: dados.idade ? String(dados.idade) : 'N/A', 
    planeta: dados.planeta || 'Terra',
    sexo: dados.sexo || 'N/A',
    membroDesde: new Date().toLocaleDateString('pt-BR'),
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null); 

  const signIn = (dados: any) => {

    const dataWithDefaults = { nome: '', idade: '', planeta: '', sexo: '', ...dados };
    setUser(processUserData(dataWithDefaults));
  };

  const signUp = (dados: any) => {
    setUser(processUserData(dados));
  };

  const signOut = () => {
    setUser(null);
  };

  const value = { user, signIn, signUp, signOut };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
