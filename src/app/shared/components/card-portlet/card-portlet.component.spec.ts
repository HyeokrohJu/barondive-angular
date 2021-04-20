/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardPortletComponent } from './card-portlet.component';

describe('CardPortletComponent', () => {
  let component: CardPortletComponent;
  let fixture: ComponentFixture<CardPortletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPortletComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPortletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Card Portlet Component 생성 ...', () => {
    expect(component).toBeTruthy();
  });
});
