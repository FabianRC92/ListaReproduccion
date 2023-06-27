export type RegisterResponse = {
  id: number;
  email: string;
  auth: {
    token: string;
    expirationDate: Date;
  };
  first_Name: string;
  last_Name: string;
};

export type LoginResponse = {
  token: string;
  expirationDate: Date;
};

export type ServiceError = {
  timestamp: Date;
  message: string;
  details: string;
};
