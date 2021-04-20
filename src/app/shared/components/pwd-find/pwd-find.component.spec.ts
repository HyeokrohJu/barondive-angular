/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PwdFindComponent } from './pwd-find.component';

describe('PwdFindComponent', () => {
  let component: PwdFindComponent;
  let fixture: ComponentFixture<PwdFindComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PwdFindComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
