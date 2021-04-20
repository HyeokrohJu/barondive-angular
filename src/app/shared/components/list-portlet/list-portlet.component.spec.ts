/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListPortletComponent } from './list-portlet.component';

describe('ListPortletComponent', () => {
  let component: ListPortletComponent;
  let fixture: ComponentFixture<ListPortletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPortletComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPortletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('List Portlet Component 생성 ...', () => {
    expect(component).toBeTruthy();
  });
});
