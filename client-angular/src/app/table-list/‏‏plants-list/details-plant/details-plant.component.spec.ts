import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlantComponent } from './details-plant.component';

describe('DetailsPlantComponent', () => {
  let component: DetailsPlantComponent;
  let fixture: ComponentFixture<DetailsPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
