import { beforeEach, describe, expect, test } from 'vitest';

import { AutoFocusDirective } from '@app/shared/directives/auto-focus-directive';
import { FormattedPhoneDirective } from '@app/shared/directives/formatted-phone-directive';

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MultiStepForm } from './multi-step-form';
import { Form } from './components/form/form';
import { ThankYou } from './components/thank-you/thank-you';

import { provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('MultiStepForm Integration', () => {
  let fixture: ComponentFixture<MultiStepForm>;
  let component: MultiStepForm;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MultiStepForm,
        Form,
        ThankYou,
        FormsModule,
        FormattedPhoneDirective,
        AutoFocusDirective,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiStepForm);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function clickButton(selector: string) {
    const btn = element.querySelector<HTMLButtonElement>(selector);
    expect(btn, `Expected button: ${selector}`).toBeTruthy();
    btn!.click();
    fixture.detectChanges();
  }

  function inputText(selector: string, text: string) {
    const input = element.querySelector<HTMLInputElement>(selector);
    expect(input, `Expected input: ${selector}`).toBeTruthy();
    input!.value = text;
    input!.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  test('should complete the multi-step form and reach thank you page', async () => {
    // Step 1: Personal Info
    const title1 = element.querySelector('[data-cy="step-form-title"]');
    expect(title1?.textContent).toContain('Personal Info');

    inputText('[data-cy="step-form-name"]', 'Alice Example');
    inputText('[data-cy="step-form-email"]', 'alice@example.com');
    inputText('[data-cy="step-form-phone"]', '+123456789'); // Should be formatted

    await fixture.whenStable();

    clickButton('[data-cy="step-button-next-step"]');
    fixture.detectChanges();
    await fixture.whenStable();

    // Step 2: Plan Selection
    const step2Title = element.querySelector('[data-cy="step-form-title"]');
    expect(step2Title?.textContent).toContain('Select your plan');

    const planInput0 = element.querySelector<HTMLInputElement>('[data-cy="step-plan-input-0"]');
    expect(planInput0).toBeTruthy();
    planInput0!.click();
    fixture.detectChanges();

    const switchInput = element.querySelector<HTMLInputElement>('[data-cy="step-input-switch"]');
    if (switchInput) {
      switchInput.checked = true;
      switchInput.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }

    clickButton('[data-cy="step-button-next-step"]');
    fixture.detectChanges();
    await fixture.whenStable();

    // Step 3: Add-ons
    const addOn0 = element.querySelector<HTMLInputElement>('[data-cy="step-add-on-input-0"]');
    expect(addOn0).toBeTruthy();
    addOn0!.click();
    fixture.detectChanges();

    clickButton('[data-cy="step-button-next-step"]');
    fixture.detectChanges();
    await fixture.whenStable();

    // Step 4: Summary
    const summaryPlan = element.querySelector('[data-cy="step-summary-plan"]');
    expect(summaryPlan).toBeTruthy();
    expect(summaryPlan?.textContent).toContain('Arcade'); // Adjust if needed

    clickButton('[data-cy="step-button-confirm"]');
    fixture.detectChanges();
    await fixture.whenStable();

    // Step 5: Thank You
    const thankYou = element.querySelector('[data-cy="step-thankyou"]');
    expect(thankYou).toBeTruthy();
  });
});
