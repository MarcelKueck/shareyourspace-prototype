import { create } from 'zustand';
import { User, users, Company, getCompanyByDomain, getCompanyById } from '../lib/dummy-data';

interface CorporateBenefits {
  hasAccess: boolean;
  allowanceRemaining: number;
  monthlyAllowance: number;
  usedThisMonth: number;
  company?: Company;
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  corporateAllowance: CorporateBenefits | null;
  isTeamBooking: boolean;
  selectedCompany: Company | null;
  login: (email: string) => boolean;
  logout: () => void;
  updateCorporateAllowance: (amount: number) => void;
  enableTeamBooking: (enabled: boolean) => void;
  switchCompany: (companyId: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  currentUser: null,
  corporateAllowance: null,
  isTeamBooking: false,
  selectedCompany: null,
  
  login: (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      // Check for corporate benefits
      let corporateBenefits: CorporateBenefits | null = null;
      let company: Company | null = null;
      
      if (user.corporateBenefits) {
        company = user.companyId ? getCompanyById(user.companyId) : getCompanyByDomain(email);
        corporateBenefits = {
          ...user.corporateBenefits,
          company: company || undefined
        };
      }
      
      set({ 
        isAuthenticated: true, 
        currentUser: user,
        corporateAllowance: corporateBenefits,
        selectedCompany: company
      });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ 
      isAuthenticated: false, 
      currentUser: null,
      corporateAllowance: null,
      isTeamBooking: false,
      selectedCompany: null
    });
  },
  
  updateCorporateAllowance: (amount: number) => {
    const { corporateAllowance } = get();
    if (corporateAllowance) {
      set({
        corporateAllowance: {
          ...corporateAllowance,
          allowanceRemaining: Math.max(0, corporateAllowance.allowanceRemaining - amount),
          usedThisMonth: corporateAllowance.usedThisMonth + amount
        }
      });
    }
  },
  
  enableTeamBooking: (enabled: boolean) => {
    set({ isTeamBooking: enabled });
  },
  
  switchCompany: (companyId: string) => {
    const company = getCompanyById(companyId);
    if (company) {
      set({ selectedCompany: company });
    }
  }
}));
