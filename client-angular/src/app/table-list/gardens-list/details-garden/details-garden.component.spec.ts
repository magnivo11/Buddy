import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGardenComponent } from './details-garden.component';

describe('DetailsGardenComponent', () => {
  let component: DetailsGardenComponent;
  let fixture: ComponentFixture<DetailsGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGardenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
