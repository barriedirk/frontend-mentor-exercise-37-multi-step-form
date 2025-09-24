import { apply, email, form, minLength, required, schema, Schema } from '@angular/forms/signals';
import { signal, WritableSignal } from '@angular/core';
import { PersonalInfo, Plan } from '@features/multi-step-form/models/form';

export const requiredSchema: Schema<string | null> = schema((path) => {
  required(path, { message: `This field is required` });
});

export const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: `This field is required` });
  minLength(path, 3, { message: `The value is too short` });
});

export const emailSchema: Schema<string> = schema((path) => {
  required(path, { message: `Email is required` });
  email(path, {
    message: 'Email is invalid',
  });
});

export const phoneSchema: Schema<string> = schema((path) => {
  required(path, { message: `Phone number is required` });
  minLength(path, 10, { message: `Phone number is too short` });
});

export const personalInfoSignal: WritableSignal<PersonalInfo> = signal<PersonalInfo>({
  name: '',
  email: '',
  phone: '',
});

export const personalInfoForm = (personalInfoSignal: WritableSignal<PersonalInfo>) => {
  return form(personalInfoSignal, (path) => [
    apply(path.name, nameSchema),
    apply(path.email, emailSchema),
    apply(path.phone, phoneSchema),
  ]);
};

export const planSignal: WritableSignal<Plan> = signal<Plan>({
  plan: null,
  price: 0,
  isYearly: false,
});

export const planForm = (planSignal: WritableSignal<Plan>) => {
  return form(planSignal, (path) => [apply(path.plan, requiredSchema)]);
};
