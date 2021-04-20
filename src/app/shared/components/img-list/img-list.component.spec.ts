/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImgListComponent } from './img-list.component';

describe('ImgListComponent', () => {
  let component: ImgListComponent;
  let fixture: ComponentFixture<ImgListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
