/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TourstoryComponent } from './tourstory.component';

describe('TourstoryComponent', () => {
  let component: TourstoryComponent;
  let fixture: ComponentFixture<TourstoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourstoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
