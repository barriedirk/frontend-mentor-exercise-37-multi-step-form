import { Control, submit } from '@angular/forms/signals';
import { JsonPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  signal,
  ViewChildren,
  WritableSignal,
} from '@angular/core';

import { Plan, plans } from './plans';
import { AddOn, addOns } from './addOns';
import {
  personalInfoSignal,
  personalInfoForm,
  planSignal,
  planForm,
  addOnsSignal,
  addOnsForm,
} from './formsSignal';
import { FormattedPhoneDirective } from '@app/shared/directives/formatted-phone-directive';

@Component({
  selector: 'app-form',
  imports: [Control, FormattedPhoneDirective, NgClass, JsonPipe],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  @ViewChildren('cardOption') cardOption!: QueryList<ElementRef<HTMLElement>>;

  @Output() gotoStep = new EventEmitter<number>();
  @Output() gotoThankYou = new EventEmitter<boolean>();

  currentStep: WritableSignal<number> = signal(1);

  protected readonly personalInfoSignal = personalInfoSignal;
  protected readonly personalInfoForm = personalInfoForm(this.personalInfoSignal);

  protected readonly planSignal = planSignal;
  protected readonly planForm = planForm(this.planSignal);

  protected readonly addOnsSignal = addOnsSignal;
  protected readonly addOnsForm = addOnsForm(this.addOnsSignal);

  plans = plans;
  addOns = addOns;

  // @todo, improve
  keydownCard(event: KeyboardEvent, index: number) {
    const radios = this.cardOption.toArray();

    if (event.key === 'Enter') {
      event.preventDefault();

      const currentRadio =
        radios[index]?.nativeElement.querySelector<HTMLInputElement>('input[type="radio"]');

      if (!currentRadio) return;

      currentRadio.click();
    }

    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();

      const prev = radios[(index - 1 + radios.length) % radios.length];

      prev.nativeElement.focus();
      prev.nativeElement.querySelector('input[type="radio"]')?.dispatchEvent(new Event('click'));
    }

    if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();

      const next = radios[(index + 1) % radios.length];

      next.nativeElement.focus();
      next.nativeElement.querySelector('input[type="radio"]')?.dispatchEvent(new Event('click'));
    }
  }

  protected updatePlanPrice() {
    const plan = this.planForm.plan().value();
    const isYearly = this.planForm.isYearly().value();
    const foundPlan = this.plans.find((item) => item.plan === plan);

    if (foundPlan) {
      this.planForm
        .price()
        .value.set(isYearly === false ? foundPlan.pricePerMonth : foundPlan.pricePerYear);
    }
  }

  protected updatePlan(plan: Plan) {
    const isYearly = this.planForm.isYearly().value();

    this.planForm.plan().value.set(plan.plan);
    this.planForm.price().value.set(isYearly === false ? plan.pricePerMonth : plan.pricePerYear);
  }

  protected addOrRemoveItem(event: Event, addOn: AddOn, idx: number) {
    const isYearly = this.planForm.isYearly().value();
    const isChecked = (event.target as HTMLInputElement).checked;
    const items = structuredClone(this.addOnsForm.items().value());

    if (isChecked) {
      items[addOn.id] = {
        id: addOn.id,
        addOn: addOn.value,
        price: isYearly ? addOn.priceYearly : addOn.priceMonthly,
      };
    } else {
      delete items[addOn.id];
    }

    console.log('Input value changed:', isChecked, addOn, idx);

    this.addOnsForm.items().value.set(items);
  }

  protected printValues() {
    const personalInfo = this.personalInfoForm().value();
    const planForm = this.planForm().value();
    const addOnsForm = this.addOnsForm().value();

    console.log('printValues', {
      personalInfo,
      planForm,
      addOnsForm,
    });
  }

  protected goBack(step: number) {
    this.printValues();

    this.currentStep.set(step);
    this.gotoStep.emit(step);
  }

  protected personalInfoSubmit() {
    this.printValues();

    this.currentStep.set(2);
    this.gotoStep.emit(2);
  }

  protected planSubmit() {
    this.printValues();

    this.currentStep.set(3);
    this.gotoStep.emit(3);
  }

  protected addOnsSubmit() {
    this.printValues();

    this.currentStep.set(4);
    this.gotoStep.emit(4);
  }

  protected confirmSubmit() {
    this.printValues();

    this.gotoThankYou.emit(true);
  }
}
