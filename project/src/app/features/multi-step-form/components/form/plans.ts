export interface Plan {
  id: string;
  svg: string;
  plan: string;
  pricePerYear: number;
  pricePerMonth: number;
  duration: string;
}

export const plans: Plan[] = [
  {
    id: 'plan-arcade',
    svg: './assets/images/sprite-plan.svg#arcade',
    plan: 'Arcade',
    pricePerYear: 90,
    pricePerMonth: 9,
    duration: '2 months free',
  },
  {
    id: 'plan-advanced',
    svg: './assets/images/sprite-plan.svg#advanced',
    plan: 'Advanced',
    pricePerYear: 120,
    pricePerMonth: 12,
    duration: '2 months free',
  },
  {
    id: 'plan-pro',
    svg: './assets/images/sprite-plan.svg#pro',
    plan: 'Pro',
    pricePerYear: 120,
    pricePerMonth: 15,
    duration: '2 months free',
  },
];
