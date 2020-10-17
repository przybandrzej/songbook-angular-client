import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {rolesForAdmin, rolesForModerator} from '../../model/user-roles-combinations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  rolesForModerator = rolesForModerator;
  rolesForAdmin = rolesForAdmin;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showSongs() {
    this.router.navigateByUrl('songs');
  }

  showCategories() {
    this.router.navigateByUrl('categories');
  }

  showAuthors() {
    this.router.navigateByUrl('authors');
  }

  showTags() {
    this.router.navigateByUrl('tags');
  }

  openAdminPanel() {
    this.router.navigateByUrl('admin');
  }
}
