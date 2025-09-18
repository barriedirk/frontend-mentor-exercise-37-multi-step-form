import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';

import { signal } from '@angular/core';

@Component({
  selector: 'app-multi-step-form',
  imports: [NgClass],
  templateUrl: './multi-step-form.html',
  styleUrl: './multi-step-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepForm {
  steps: { step: number; label: string; title: string }[] = [
    { step: 1, label: 'Step 1', title: 'Your info' },
    { step: 2, label: 'Step 2', title: 'Select plan' },
    { step: 3, label: 'Step 3', title: 'Add-ons' },
    { step: 4, label: 'Step 4', title: 'Summary' },
  ];
  currentStep: WritableSignal<number> = signal(1);
}
