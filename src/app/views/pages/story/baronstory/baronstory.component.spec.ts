/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaronstoryComponent } from './baronstory.component';

describe('BaronstoryComponent', () => {
  let component: BaronstoryComponent;
  let fixture: ComponentFixture<BaronstoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaronstoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaronstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
