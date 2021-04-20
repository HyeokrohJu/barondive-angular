/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InsertViewComponent } from './insert-view.component';

describe('InsertViewComponent', () => {
  let component: InsertViewComponent;
  let fixture: ComponentFixture<InsertViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
