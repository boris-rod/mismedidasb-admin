export interface User {
  first_name: string;
  last_name: string;
  email: string;
  public_id: string;
  admin: boolean;
  default_user_broker_id: number;
  has_onboard: boolean;
}
