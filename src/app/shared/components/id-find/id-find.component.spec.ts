/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IdFindComponent } from './id-find.component';

describe('IdFindComponent', () => {
  let component: IdFindComponent;
  let fixture: ComponentFixture<IdFindComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdFindComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
