/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MultiImgUploadComponent } from './multi-img-upload.component';

describe('MultiImgUploadComponent', () => {
  let component: MultiImgUploadComponent;
  let fixture: ComponentFixture<MultiImgUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiImgUploadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
