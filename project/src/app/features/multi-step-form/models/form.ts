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
    addOn: string;
    price: number;
  }[];
}
