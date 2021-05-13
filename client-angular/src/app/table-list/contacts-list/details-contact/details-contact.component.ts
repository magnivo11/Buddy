import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact';
import { ContactsService } from '../../../services/contacts.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.css']
})
export class DetailsContactComponent implements OnInit {

  contact: Contact = null;

  constructor(private contactsService : ContactsService, private router:Router, private activatedRoute:ActivatedRoute) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.contact=history.state;
  }

  onEdit(){
    this.router.navigateByUrl('/EditContact', { state: this.contact });

  }
  onDelete(){
    this.contactsService.deleteContact(this.contact._id).subscribe(data => {
      this.router.navigate(['/table-list']);
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }
}
