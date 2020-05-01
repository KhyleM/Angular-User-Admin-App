import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private newService: CommonService) {}
  Repdata;
  index = 1;
  valButton = 'Save';
  mainUser = 'Admin User';
  id: any;
  firstName: any;
  lastName: any;
  birthday: any;
  employment: any;
  favoriteColor: any;

  ngOnInit() {
    this.newService.GetUser().subscribe(data => this.Repdata = data);
  }

  onSave = function(user) {
    user.mode = this.valButton;
    this.newService.saveUser(user).subscribe(data => { alert(data.data);
                                                       this.ngOnInit();
    }
    , error => this.errorMessage = error );
  };
  edit = function(myData) {
    this.id = myData._id;
    this.firstName = myData.firstName;
    this.lastName = myData.lastName;
    this.email = myData.email;
    this.birthday = myData.birthday;
    this.employment = myData.employment;
    this.favoriteColor = myData.favoriteColor;
    this.valButton = 'Update';
  };

  delete = function(id) {
    this.newService.deleteUser(id).subscribe(data => { alert(data.data) ; this.ngOnInit(); }, error => this.errorMessage = error );
  };

}
