export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  statusId: number;
  status: string;
  avatar: string;
  avatarMimeType: string;
  role: string;
  roleId: number;
  createdAt: Date;
  modifiedAt: Date;
  activatedAt: Date | null;
  disabledAt: Date | null;
  language: string;
  imc: number;
  kCal: number;
}
