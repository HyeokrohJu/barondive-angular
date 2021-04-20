/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubVisualComponent } from './sub-visual.component';

describe('SubVisualComponent', () => {
  let component: SubVisualComponent;
  let fixture: ComponentFixture<SubVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubVisualComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
