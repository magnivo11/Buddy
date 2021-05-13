import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact';
import { ContactsService } from '../../../services/contacts.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  
      contact: Contact = null;
    
      constructor(private contactsService : ContactsService, private router:Router, private activatedRoute:ActivatedRoute) {
        //this.router.getCurrentNavigation().extras.state;
      }
    
      ngOnInit(): void {
        this.contact=history.state;
      }
    
      onUpdate(fullName: String, email: String, message: String){
        if(fullName === '' || email === '' || message === '')
        window.alert('Please fill all fields');
        else{
          this.contact.fullName = fullName;
          this.contact.email = email;
          this.contact.message = message;
          this.contactsService.updateContact(this.contact).subscribe(data => {
            this.contact = data;
            this.router.navigate(['/table-list']);
          });
        }
      }
  
}
