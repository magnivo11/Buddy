import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlantsListComponent } from './‏‏‏userPlants-list.component';

describe('UserPlantsListComponent', () => {
  let component: UserPlantsListComponent;
  let fixture: ComponentFixture<UserPlantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlantsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
