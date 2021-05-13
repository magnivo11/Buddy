import { Component, OnInit } from '@angular/core';
import { Scrape } from '../../../models/scrape';

import { ScrapesService } from '../../../services/scrapes.service';

import { ActivatedRoute, Router, NavigationStart } from '@angular/router';



@Component({
  selector: 'app-details-scrape',
  templateUrl: './details-scrape.component.html',
  styleUrls: ['./details-scrape.component.css']
})
export class DetailsScrapeComponent implements OnInit {

  scrape : Scrape = null;

  constructor(private scrapesService : ScrapesService, private router:Router, private activatedRoute:ActivatedRoute) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.scrape=history.state;
  }

  onEdit(){
    this.router.navigateByUrl('/EditScrape', { state: this.scrape });

  }
  onDelete(){
    this.scrapesService.deleteScrape(this.scrape._id).subscribe(data => {
      this.router.navigate(['/table-list']);
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }
}
