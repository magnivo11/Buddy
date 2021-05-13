import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  listFor: String;
  search: String = "";
  refresh: string = "false";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.listFor = "";
  }

  ngOnInit() {
    this.search = "";
    this.search = history.state;
  }

  onSearch(search: String) {
    this.search = search;
    if (this.search === "") this.listFor = "";
    else this.listFor = "search";
  }

  onRefresh() {
    this.refresh = "true";
    setTimeout(() => {
      this.refresh = "false";
    }, 5000);

  }
}
