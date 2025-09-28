import { Control } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { computed } from '@angular/core';

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
import { AutoFocusDirective } from '@app/shared/directives/auto-focus-directive';

@Component({
  selector: 'app-form',
  imports: [Control, FormattedPhoneDirective, NgClass, AutoFocusDirective],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  @ViewChildren('cardOption') cardOption!: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren('addOnOption') addOnOption!: QueryList<ElementRef<HTMLElement>>;

  @Input() currentStep!: WritableSignal<number>;

  @Output() gotoStep = new EventEmitter<number>();
  @Output() gotoThankYou = new EventEmitter<boolean>();

  protected readonly personalInfoSignal = personalInfoSignal;
  protected readonly personalInfoForm = personalInfoForm(this.personalInfoSignal);

  protected readonly planSignal = planSignal;
  protected readonly planForm = planForm(this.planSignal);

  protected readonly addOnsSignal = addOnsSignal;
  protected readonly addOnsForm = addOnsForm(this.addOnsSignal);

  addOnList = computed(() => Object.values(this.addOnsForm.items().value()));

  total = computed(() => {
    const addOnList = Object.values(this.addOnsForm.items().value());

    let total = this.planForm.price().value();

    for (const item of addOnList) {
      total += item.price;
    }

    return total;
  });

  plans = plans;
  addOns = addOns;

  keydownAddOn(event: KeyboardEvent, index: number): void {
    const checkboxes = this.addOnOption.toArray();
    const currentCheckbox = checkboxes[index];

    if (!currentCheckbox) return;

    const checkboxInput =
      currentCheckbox.nativeElement.querySelector<HTMLInputElement>('input[type="checkbox"]');

    if (!checkboxInput) return;

    const focus = (el: ElementRef<HTMLElement>) => {
      const input = el.nativeElement.querySelector<HTMLInputElement>('input[type="checkbox"]');

      if (input) {
        el.nativeElement.focus();
      }
    };

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();

        checkboxInput.click();
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prev = checkboxes[(index - 1 + checkboxes.length) % checkboxes.length];
        focus(prev);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const next = checkboxes[(index + 1) % checkboxes.length];
        focus(next);
        break;
    }
  }

  keydownCard(event: KeyboardEvent, index: number): void {
    const radios = this.cardOption.toArray();
    const currentRadio = radios[index];

    if (!currentRadio) return;

    const radioInput =
      currentRadio.nativeElement.querySelector<HTMLInputElement>('input[type="radio"]');

    if (!radioInput) return;

    const focusAndSelect = (el: ElementRef<HTMLElement>) => {
      const input = el.nativeElement.querySelector<HTMLInputElement>('input[type="radio"]');
      if (input) {
        input.click();
        el.nativeElement.focus();
      }
    };

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();

        radioInput.click();

        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prev = radios[(index - 1 + radios.length) % radios.length];
        focusAndSelect(prev);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const next = radios[(index + 1) % radios.length];
        focusAndSelect(next);
        break;
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

  protected addOrRemoveAddOn(event: Event, addOn: AddOn, idx: number) {
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

    this.addOnsForm.items().value.set(items);
  }

  protected updateAddOnPrices() {
    const items = structuredClone(this.addOnsForm.items().value());
    const keys = Object.keys(items);

    if (keys.length > 0) {
      const isYearly = this.planForm.isYearly().value();

      for (const addOn of this.addOns) {
        if (keys.includes(addOn.id)) {
          items[addOn.id].price = isYearly ? addOn.priceYearly : addOn.priceMonthly;
        }
      }

      this.addOnsForm.items().value.set(items);
    }
  }

  protected testConsoleValues() {
    // const personalInfo = this.personalInfoForm().value();
    // const planForm = this.planForm().value();
    // const addOnsForm = this.addOnsForm().value();

    const personalInfo = this.personalInfoSignal();
    const planForm = this.planSignal();
    const addOnsForm = this.addOnsSignal();

    console.log('testConsoleValues', {
      personalInfo,
      planForm,
      addOnsForm,
    });
  }

  protected goBack(step: number) {
    // @todo, only for test
    // this.testConsoleValues();

    this.gotoStep.emit(step);
  }

  protected personalInfoSubmit() {
    // @todo, only for test
    // this.testConsoleValues();

    this.gotoStep.emit(2);
  }

  protected planSubmit() {
    // @todo, only for test
    // this.testConsoleValues();

    this.gotoStep.emit(3);
  }

  protected addOnsSubmit() {
    // @todo, only for test
    // this.testConsoleValues();

    this.gotoStep.emit(4);
  }

  protected confirmSubmit() {
    // @todo, only for test
    // this.testConsoleValues();

    this.gotoThankYou.emit(true);
  }
}
