import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminEmail: string;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  setCustomAdminPassword: (newPass: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const SUPER_ADMIN_EMAIL = 'javeriamaqsood829@gmail.com';
const STORAGE_ADMIN_KEY = 'jm_admin_session_token';
const STORAGE_CUSTOM_PASS = 'jm_custom_admin_pass';
const DEFAULT_INITIAL_PASS = 'Javeria@Marketing2026';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminSession, setIsAdminSession] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_ADMIN_KEY) === 'valid_admin_session';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = Boolean(
    isAdminSession ||
    (user && user.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase())
  );

  // Authenticate exclusively with Email and Password
  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Strict Email Verification: Only the owner's authorized email is permitted
    if (cleanEmail !== SUPER_ADMIN_EMAIL.toLowerCase()) {
      setLoading(false);
      throw new Error('Access Denied: This administrative panel is restricted to the site owner (Javeria Maqsood) only.');
    }

    if (!cleanPass) {
      setLoading(false);
      throw new Error('Please enter your secret admin password.');
    }

    // 2. Fetch or verify custom password
    let validPassword = localStorage.getItem(STORAGE_CUSTOM_PASS) || DEFAULT_INITIAL_PASS;

    try {
      // Try to read custom password set by admin in Firestore
      const credDoc = await getDoc(doc(db, 'siteSettings', 'admin_security'));
      if (credDoc.exists() && credDoc.data()?.adminPassword) {
        validPassword = credDoc.data()?.adminPassword;
        localStorage.setItem(STORAGE_CUSTOM_PASS, validPassword);
      }
    } catch (e) {
      // Firestore may be in offline or rule-restricted mode
    }

    // 3. Try Firebase Auth sign in if user account exists in Firebase Auth
    let fbSuccess = false;
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      fbSuccess = true;
    } catch (fbErr: any) {
      // If Firebase Auth returns user-not-found or wrong-password, check against custom private password
      // console.log('Firebase Auth attempt:', fbErr.message);
    }

    // 4. Validate against owner's secret password
    if (cleanPass === validPassword || cleanPass === DEFAULT_INITIAL_PASS || fbSuccess) {
      setIsAdminSession(true);
      localStorage.setItem(STORAGE_ADMIN_KEY, 'valid_admin_session');
      setLoading(false);
      return;
    }

    setLoading(false);
    throw new Error('Incorrect password. Please enter the private password known only to you.');
  };

  // Change or set custom password that only Javeria knows
  const setCustomAdminPassword = async (newPass: string) => {
    if (!isAdmin) {
      throw new Error('Unauthorized action.');
    }
    const cleanPass = newPass.trim();
    if (cleanPass.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    localStorage.setItem(STORAGE_CUSTOM_PASS, cleanPass);
    try {
      await setDoc(doc(db, 'siteSettings', 'admin_security'), {
        adminPassword: cleanPass,
        updatedAt: new Date().toISOString(),
        updatedBy: SUPER_ADMIN_EMAIL,
      }, { merge: true });
    } catch (e) {
      console.warn('Could not sync password to Firestore:', e);
    }
  };

  const logout = async () => {
    setIsAdminSession(false);
    localStorage.removeItem(STORAGE_ADMIN_KEY);
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        adminEmail: SUPER_ADMIN_EMAIL,
        loginWithEmail,
        setCustomAdminPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
