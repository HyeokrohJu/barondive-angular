/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarondiveComponent } from './barondive.component';

describe('BarondiveComponent', () => {
  let component: BarondiveComponent;
  let fixture: ComponentFixture<BarondiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarondiveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarondiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
