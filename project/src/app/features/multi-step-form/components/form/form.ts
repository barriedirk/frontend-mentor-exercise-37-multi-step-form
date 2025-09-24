import { Control, submit } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  WritableSignal,
} from '@angular/core';

import { plans } from './plans';
import { addOns } from './addOns';
import { personalInfoSignal, personalInfoForm, planSignal, planForm } from './formsSignal';
import { FormattedPhoneDirective } from '@app/shared/directives/formatted-phone-directive';

@Component({
  selector: 'app-form',
  imports: [Control, FormattedPhoneDirective, NgClass],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  @Input() currentStep!: WritableSignal<number>;

  @ViewChildren('cardOption') cardOption!: QueryList<ElementRef<HTMLElement>>;

  protected readonly personalInfoSignal = personalInfoSignal;
  protected readonly personalInfoForm = personalInfoForm(this.personalInfoSignal);

  protected readonly planSignal = planSignal;
  protected readonly planForm = planForm(this.planSignal);

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

  protected personalInfoSubmit() {
    submit(this.personalInfoForm, async (form) => {
      if (form().dirty() || form().touched()) {
      }

      console.log({ formValues: form().value() });
    });
  }

  protected planSubmit() {
    this.planForm();

    submit(this.planForm, async (form) => {
      if (form().dirty() || form().touched()) {
      }

      console.log({ formValues: form().value() });
    });
  }
}
