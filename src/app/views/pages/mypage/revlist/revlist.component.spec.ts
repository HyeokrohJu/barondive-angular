/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RevlistComponent } from './revlist.component';

describe('RevlistComponent', () => {
  let component: RevlistComponent;
  let fixture: ComponentFixture<RevlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevlistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
