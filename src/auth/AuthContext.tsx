import React, { createContext, useContext, useMemo, useState } from "react";
import type { User } from "../types/user"; 
import { loginUser  } from "../api/users.api"; 

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};
//contesto per auth 
const AuthContext = createContext<AuthContextValue | null>(null);

// sessionStorage: dura finché la tab è aperta 
const AUTH_STORAGE_KEY = "auth.user.v1";

function readUserFromSession(): User | null {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function writeUserToSession(user: User | null) {
  try {
    if (!user) sessionStorage.removeItem(AUTH_STORAGE_KEY);
    else sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch {
    // ignora errori storage
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // init da sessionStorage => refresh non “slocca”
  const [user, setUser] = useState<User | null>(() => readUserFromSession());

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isAuthenticated: !!user,

      // ✅ login fake: chiama API /users?email=...&password=...
      // se trova un utente => login OK
      login: async (email, password) => {
        const found = await loginUser(email.trim(), password);
        if (!found) return false;

        setUser(found);
        writeUserToSession(found);
        return true;
      },

      logout: () => {
        setUser(null);
        writeUserToSession(null);
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
