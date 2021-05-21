import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
    /*if(environment.token == '') {
      this.router.navigate(['/login'])

    }*/

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

  }

}
