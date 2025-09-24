export interface AddOn {
  id: string;
  label: string;
  value: string;
  information: string;
  price: number;
  priceYearly: number;
}

export const addOns: AddOn[] = [
  {
    id: 'online-services',
    label: 'Online service',
    value: 'Online service',
    information: 'Access to multiplayer games',
    price: 1,
    priceYearly: 510,
  },
  {
    id: 'larger-storage',
    label: 'Larger Storage',
    value: 'Larger Storage',
    information: 'Extra 1TB of cloud save',
    price: 2,
    priceYearly: 520,
  },
  {
    id: 'customizable-profile',
    label: 'Customizable profile',
    value: 'Customizable profile',
    information: 'Custom theme on your profile',
    price: 2,
    priceYearly: 520,
  },
];
