import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScrapeComponent } from './edit-scrape.component';

describe('EditScrapeComponent', () => {
  let component: EditScrapeComponent;
  let fixture: ComponentFixture<EditScrapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScrapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
