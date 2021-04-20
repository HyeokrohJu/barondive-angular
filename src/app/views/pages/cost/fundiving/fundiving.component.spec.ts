/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FundivingComponent } from './fundiving.component';

describe('FundivingComponent', () => {
  let component: FundivingComponent;
  let fixture: ComponentFixture<FundivingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundivingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
