export interface Group {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  usersCout: number;
  adminEmail: string;
  createAt: Date;
  modifiedAT: Date;
}
