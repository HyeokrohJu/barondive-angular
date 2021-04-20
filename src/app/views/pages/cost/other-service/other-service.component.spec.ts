/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtherServiceComponent } from './other-service.component';

describe('OtherServiceComponent', () => {
  let component: OtherServiceComponent;
  let fixture: ComponentFixture<OtherServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherServiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
