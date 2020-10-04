import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {rolesForModerator} from '../../model/user-roles-combinations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  rolesForModerator = rolesForModerator;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showSongs() {
    this.router.navigateByUrl('songs');
  }

  showCategories() {
    this.router.navigateByUrl('categories');
  }
}
