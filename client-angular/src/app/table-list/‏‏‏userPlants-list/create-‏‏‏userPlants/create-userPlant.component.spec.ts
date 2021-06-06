import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserPlantComponent } from './create-userPlant.component';

describe('CreateUserPlantComponent', () => {
  let component: CreateUserPlantComponent;
  let fixture: ComponentFixture<CreateUserPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserPlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
