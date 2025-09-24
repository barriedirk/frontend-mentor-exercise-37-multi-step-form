import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormattedPhone]',
  standalone: true,
})
export class FormattedPhoneDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let raw = input.value;

    const match = raw.match(/^\+(\d{0,3})/);
    const countryCode = match ? match[0] : '+';

    const remaining = raw.replace(/^\+\d{0,3}/, '').replace(/\D/g, '');

    const limited = remaining.slice(0, 9);

    const formattedLocal = limited.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})$/, (_, g1, g2, g3) =>
      [g1, g2, g3].filter(Boolean).join(' ')
    );

    const finalValue = `${countryCode} ${formattedLocal}`.trim();

    input.value = finalValue;

    // Because in signal-based forms, the control instance is different from the classic AbstractControl (used in reactive forms). The current API is a signal-based FormControl, which uses a signal-based setter, not the setValue() method.

    // this.control.control?.setValue(finalValue);
    this.control.valueAccessor?.writeValue(finalValue); // Works with reactive + signal forms
  }
}
