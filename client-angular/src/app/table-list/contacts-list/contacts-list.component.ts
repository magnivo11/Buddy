import { Component,Input, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts : Contact[] = [];  
  @Input() search: string = '';
  @Input() refresh: string = "false";

  constructor(private contactsService : ContactsService,  private router: Router){}
  
  ngOnInit() {
    this.loadAll();
  }
  
  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.refresh === "true")
      this.loadAll();
    if(this.search === "")
    { 
      this.loadAll();
    }
    else
    { 
      this.contactsService.filter(this.search).subscribe(data =>{
        this.contacts = data;
      }, err => {
        window.alert(err.error);
      })
    }
  }

  loadAll(){
    this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
    }, err => {
      window.alert(err.error);
    });
  }

  onCreate(){
    //this.currentArticleService.changeCurrentArticle(article);
    this.router.navigateByUrl('/CreateContact');
  }

  onEdit(contact : Contact){
    //this.currentArticleService.changeCurrentArticle(article);
    this.router.navigateByUrl('/EditContact', { state: contact });
  }
  onDelete(contact : Contact){
    //this.currentArticleService.changeCurrentArticle(article);
    this.contactsService.deleteContact(contact._id).subscribe(data => {
      this.contacts.splice(this.contacts.indexOf(contact),1);
    }, err => {
      window.alert(err.error);
      this.contacts.splice(this.contacts.indexOf(contact),1);
    });
  }
  onDetails(contact : Contact){
    //this.currentArticleService.changeCurrentArticle(article);
    this.router.navigateByUrl('/DetailsContact', { state: contact });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
