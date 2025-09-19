import { ChangeDetectionStrategy, Component, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  @Input() currentStep!: WritableSignal<number>;
}
