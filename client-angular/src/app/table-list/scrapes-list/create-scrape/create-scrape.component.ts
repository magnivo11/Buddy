import { Component, OnInit } from '@angular/core';
import { Scrape } from '../../../models/scrape';

import { ScrapesService } from '../../../services/scrapes.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-scrape',
  templateUrl: './create-scrape.component.html',
  styleUrls: ['./create-scrape.component.css']
})
export class CreateScrapeComponent implements OnInit {

  
    scrape : Scrape;  
  
    constructor(private scrapesService : ScrapesService, private router: Router) { }
  
    ngOnInit(): void {
    }
    
    onCreate(title: String, img: String, published: Date, time: Date){
      this.scrapesService.addScrape(title, img, published, time).subscribe(data => {
        this.scrape = data;
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
}
