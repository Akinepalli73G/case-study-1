import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../model/user.model'
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];
  view;

  constructor(
    private apiservice: ApiService, private router: Router,) { }

  ngOnInit() {
    //get Users List
    if (JSON.parse(localStorage.getItem("Level")) == "Level 1") {
      this.view = true;
    } else {
      this.view = false;

    }
    this.apiservice.getUsers().subscribe(response => {
      this.users = response.data;
    })
  }

  editCust(id) {
    this.router.navigate(['/customerInfo', id]);
  }



}
