export interface User {
  email: string;
  isAdmin: boolean;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}