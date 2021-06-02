import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserPlantComponent } from './details-userPlant.component';

describe('DetailsUserPlantComponent', () => {
  let component: DetailsUserPlantComponent;
  let fixture: ComponentFixture<DetailsUserPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUserPlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUserPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
