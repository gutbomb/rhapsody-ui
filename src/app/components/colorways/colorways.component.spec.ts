import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorwaysComponent } from './colorways.component';

describe('ColorwaysComponent', () => {
  let component: ColorwaysComponent;
  let fixture: ComponentFixture<ColorwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorwaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
