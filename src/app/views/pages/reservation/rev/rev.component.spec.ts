/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RevComponent } from './rev.component';

describe('RevComponent', () => {
  let component: RevComponent;
  let fixture: ComponentFixture<RevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
