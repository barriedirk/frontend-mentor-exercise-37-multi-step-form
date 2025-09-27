import { beforeEach, describe, expect, it } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYou } from './thank-you';

describe('ThankYou', () => {
  let component: ThankYou;
  let fixture: ComponentFixture<ThankYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYou],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
