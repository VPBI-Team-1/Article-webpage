"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiBaseUrl}/api/auth/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();

        setUser(data.user.payload);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to get current user:", error);
        setUser(null);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
