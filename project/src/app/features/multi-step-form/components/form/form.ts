import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [DecimalPipe],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  @Input() currentStep!: WritableSignal<number>;

  @ViewChildren('cardOption') cardOption!: QueryList<ElementRef<HTMLElement>>;

  plans: {
    id: string;
    svg: string;
    plan: string;
    pricePerYear: number;
    duration: string;
  }[] = [
    {
      id: 'plan-arcade',
      svg: './assets/images/sprite-plan.svg#arcade',
      plan: 'Arcade',
      pricePerYear: 90,
      duration: '2 months free',
    },
    {
      id: 'plan-advanced',
      svg: './assets/images/sprite-plan.svg#advanced',
      plan: 'Advanced',
      pricePerYear: 120,
      duration: '2 months free',
    },
    {
      id: 'plan-pro',
      svg: './assets/images/sprite-plan.svg#pro',
      plan: 'Pro',
      pricePerYear: 120,
      duration: '2 months free',
    },
  ];

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
}
