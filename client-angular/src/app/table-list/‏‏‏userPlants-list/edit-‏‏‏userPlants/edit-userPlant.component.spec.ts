import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPlantComponent } from './edit-userPlant.component';

describe('EditUserPlantComponent', () => {
  let component: EditUserPlantComponent;
  let fixture: ComponentFixture<EditUserPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserPlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
