import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageColorwaysComponent } from './manage-colorways.component';

describe('ManageColorwaysComponent', () => {
  let component: ManageColorwaysComponent;
  let fixture: ComponentFixture<ManageColorwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageColorwaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageColorwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
