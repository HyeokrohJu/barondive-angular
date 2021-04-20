/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainCarouselComponent } from './main-carousel.component';

describe('MainCarouselComponent', () => {
  let component: MainCarouselComponent;
  let fixture: ComponentFixture<MainCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Main Carousel Component 생성 ...', () => {
    expect(component).toBeTruthy();
  });
});
