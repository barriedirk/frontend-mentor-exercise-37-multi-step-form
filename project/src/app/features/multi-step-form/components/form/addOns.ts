export interface AddOn {
  id: string;
  label: string;
  value: string;
  information: string;
  priceMonthly: number;
  priceYearly: number;
}

export const addOns: AddOn[] = [
  {
    id: 'online-services',
    label: 'Online service',
    value: 'Online service',
    information: 'Access to multiplayer games',
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    id: 'larger-storage',
    label: 'Larger Storage',
    value: 'Larger Storage',
    information: 'Extra 1TB of cloud save',
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    id: 'customizable-profile',
    label: 'Customizable profile',
    value: 'Customizable profile',
    information: 'Custom theme on your profile',
    priceMonthly: 2,
    priceYearly: 20,
  },
];
