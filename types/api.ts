export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginResponse extends ApiResponse<User> {}
