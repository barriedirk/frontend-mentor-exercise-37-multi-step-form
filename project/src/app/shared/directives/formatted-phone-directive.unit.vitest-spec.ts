import { beforeEach, describe, expect, it } from 'vitest';

import { Component, provideZonelessChangeDetection } from '@angular/core';
import { FormattedPhoneDirective } from './formatted-phone-directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormattedPhoneDirective, FormsModule],
  template: `<input [(ngModel)]="phone" type="text" name="phone" appFormattedPhone />`,
})
class TestHostComponent {
  phone: string = '';
}

describe('FormattedPhoneDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    inputEl = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  function typeInInput(value: string) {
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('should format a valid phone number with country code', () => {
    typeInInput('+1234567890123');

    expect(inputEl.value).toBe('+123 456 789 012');
    expect(hostComponent.phone).toBe('+123 456 789 012');
  });

  it('should limit the local number part to 9 digits only', () => {
    typeInInput('+456123456789999');

    expect(inputEl.value).toBe('+456 123 456 789');
    expect(hostComponent.phone).toBe('+456 123 456 789');
  });

  it('should handle partial input gracefully', () => {
    typeInInput('+1a2b3');

    expect(inputEl.value).toBe('+1 23');
    expect(hostComponent.phone).toBe('+1 23');
  });

  it('should default to "+" if no digits are entered', () => {
    typeInInput('abc!@#');

    expect(inputEl.value).toBe('+');
    expect(hostComponent.phone).toBe('+');
  });

  it('should preserve non-digit characters only in country code', () => {
    typeInInput('+44abc123456');

    expect(inputEl.value).toBe('+44 123 456');
    expect(hostComponent.phone).toBe('+44 123 456');
  });
});
