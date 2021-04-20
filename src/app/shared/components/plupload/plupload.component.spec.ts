/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PluploadComponent } from './plupload.component';

describe('PluploadComponent', () => {
  let component: PluploadComponent;
  let fixture: ComponentFixture<PluploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PluploadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
