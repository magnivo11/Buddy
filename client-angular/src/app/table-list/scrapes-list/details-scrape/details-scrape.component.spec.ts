import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsScrapeComponent } from './details-scrape.component';

describe('DetailsScrapeComponent', () => {
  let component: DetailsScrapeComponent;
  let fixture: ComponentFixture<DetailsScrapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsScrapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsScrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
