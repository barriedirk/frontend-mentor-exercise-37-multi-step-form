export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Plan {
  plan: string | null;
  price: number;
  isYearly: boolean;
}

export interface AddOns {
  items: {
    [key: string]: AddOn;
  };
}

export interface AddOn {
  id: string;
  addOn: string;
  price: number;
}
