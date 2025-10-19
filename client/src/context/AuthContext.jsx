'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);

  // Placeholder sign-in and sign-out functions (to be implemented later)
  const signIn = async (userData) => {
    setProfile(userData); // later, get real user data from backend
  };

  const signOut = () => {
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ profile, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
