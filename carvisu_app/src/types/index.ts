export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  avatar?: string;
  createdAt: string;
}

export interface Generation {
  id: string;
  userId: string;
  originalImage: string;
  wheelReference: string;
  result: string;
  settings: {
    height: number;
    intensity: number;
    style: string;
    wheelType: string;
    color: string;
  };
  creditsUsed: number;
  createdAt: string;
}

export interface CreditPlan {
  id: string;
  credits: number;
  price: number;
  bonus?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'height' | 'intensity' | 'style' | 'wheelType' | 'color';
  values?: string[];
}
