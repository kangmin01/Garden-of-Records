export interface User {
  created_at: string;
  email: string;
  phone: string;
  updated_at: string;
  user_id: string;
  user_name: string;
  user_password: string;
  user_status: string;
}

export interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
