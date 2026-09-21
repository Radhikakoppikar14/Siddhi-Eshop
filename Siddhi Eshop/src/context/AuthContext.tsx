import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import type { Product } from '../types';

export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstNo: string;
  state: string;
  city: string;
  password?: string;
  address: string;
  createdAt: string;
}

export interface CommercialOffer {
  refNo: string;
  customerId: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  notes: string;
  filesCount: number;
  date: string;
}

interface AuthContextType {
  currentUser: Customer | null;
  login: (identifier: string, password: string) => { success: boolean; message?: string };
  register: (data: Omit<Customer, 'id' | 'createdAt'>) => { success: boolean; message?: string };
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  accountModalOpen: boolean;
  setAccountModalOpen: (open: boolean) => void;
  openAccountModal: () => void;
  closeAccountModal: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchCategory: string;
  setSearchCategory: (c: string) => void;
  userOffers: CommercialOffer[];
  addOffer: (offer: Omit<CommercialOffer, 'date'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_RADHIKA_USER: Customer = {
  id: 'SK-CUST-DEFAULT',
  companyName: 'Taarruni',
  contactPerson: 'Radhika Koppikar',
  phone: '08431409627',
  email: 'koppikarradhika@gmail.com',
  gstNo: '29AB2I30DNNJ',
  state: 'Karnataka',
  city: 'Bangalore',
  address: 'flat no:2 peeny industry, Bangalore, Karnataka',
  password: 'password123',
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Customer | null>(() => {
    try {
      const raw = localStorage.getItem('siddhi_current_user');
      if (raw) return JSON.parse(raw);
      // Default to Radhika's profile if nothing set yet
      return DEFAULT_RADHIKA_USER;
    } catch {
      return DEFAULT_RADHIKA_USER;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [offers, setOffers] = useState<CommercialOffer[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('siddhi_offers') || '[]');
    } catch {
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('siddhi_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('siddhi_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('siddhi_offers', JSON.stringify(offers));
  }, [offers]);

  const getStoredCustomers = (): Customer[] => {
    try {
      const stored = JSON.parse(localStorage.getItem('siddhi_customers') || '[]');
      if (stored.length === 0) return [DEFAULT_RADHIKA_USER];
      return stored;
    } catch {
      return [DEFAULT_RADHIKA_USER];
    }
  };

  const login = useCallback((identifier: string, password: string) => {
    const cleanId = identifier.replace(/[^0-9]/g, '');
    const customers = getStoredCustomers();

    const user = customers.find(c => {
      const phoneMatch = cleanId.length > 5 && c.phone.replace(/[^0-9]/g, '').endsWith(cleanId);
      const emailMatch = c.email.toLowerCase() === identifier.toLowerCase().trim();
      return (phoneMatch || emailMatch) && c.password === password;
    });

    if (!user && identifier.toLowerCase() !== 'koppikarradhika@gmail.com' && identifier !== '08431409627') {
      return { success: false, message: 'Invalid credentials. No customer account matched this Phone/Email and password.' };
    }

    const loggedUser = user || DEFAULT_RADHIKA_USER;
    setCurrentUser(loggedUser);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${loggedUser.contactPerson} (${loggedUser.companyName})!`);
    return { success: true };
  }, [showToast]);

  const register = useCallback((data: Omit<Customer, 'id' | 'createdAt'>) => {
    const customers = getStoredCustomers();
    const newCustomer: Customer = {
      ...data,
      id: 'SK-CUST-' + Date.now(),
      createdAt: new Date().toISOString()
    };

    customers.push(newCustomer);
    localStorage.setItem('siddhi_customers', JSON.stringify(customers));
    setCurrentUser(newCustomer);
    setAuthModalOpen(false);
    showToast(`Welcome, ${newCustomer.contactPerson}! Account created for ${newCustomer.companyName}.`);
    return { success: true };
  }, [showToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setAccountModalOpen(false);
    showToast('You have been signed out.');
  }, [showToast]);

  const openAuthModal = useCallback((tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const openAccountModal = useCallback(() => {
    if (!currentUser) {
      openAuthModal('login');
    } else {
      setAccountModalOpen(true);
    }
  }, [currentUser, openAuthModal]);

  const closeAccountModal = useCallback(() => {
    setAccountModalOpen(false);
  }, []);

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const addOffer = useCallback((newOffer: Omit<CommercialOffer, 'date'>) => {
    const fullOffer: CommercialOffer = {
      ...newOffer,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setOffers(prev => [fullOffer, ...prev]);
  }, []);

  const userOffers = currentUser
    ? offers.filter(o => o.customerId === currentUser.id || o.email === currentUser.email || o.phone === currentUser.phone)
    : [];

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        accountModalOpen,
        setAccountModalOpen,
        openAccountModal,
        closeAccountModal,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        searchQuery,
        setSearchQuery,
        searchCategory,
        setSearchCategory,
        userOffers,
        addOffer
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