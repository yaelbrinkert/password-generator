"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Définition du type du contexte
interface PasswordsContextType {
  arrayOfPasswords: string[];
  setArrayOfPasswords: React.Dispatch<React.SetStateAction<string[]>>;
}

// Création du contexte avec une valeur par défaut
const PasswordsContext = createContext<PasswordsContextType | undefined>(
  undefined
);

// Définition des props pour le provider
interface PasswordsProviderProps {
  children: ReactNode;
}

export function PasswordsProvider({ children }: PasswordsProviderProps) {
  const [arrayOfPasswords, setArrayOfPasswords] = useState<string[]>([]);

  return (
    <PasswordsContext.Provider
      value={{ arrayOfPasswords, setArrayOfPasswords }}
    >
      {children}
    </PasswordsContext.Provider>
  );
}

// Hook personnalisé pour consommer le contexte
export function usePasswords() {
  const context = useContext(PasswordsContext);
  if (!context) {
    throw new Error("usePasswords must be used within a PasswordsProvider");
  }
  return context;
}
