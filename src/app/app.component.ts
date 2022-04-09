/*********************************************************************************
* WEB422 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: Bo We Hou Student ID: 129974200 Date: 4/8/2022
*
********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'mindy-a5';
  searchString: string="";
  token: any;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.authService.readToken();
      }
    });
  }

  handleSearch(): void {
      this.router.navigate(['/search'], {queryParams: {q: this.searchString}});
      this.searchString =""; // clear the searchString
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}