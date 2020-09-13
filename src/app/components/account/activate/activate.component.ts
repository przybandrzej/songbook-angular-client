import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  message = 'Activating';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const key = this.route.snapshot.queryParamMap.get('key');
    this.authService.activateAccount(key);
    this.message = 'Activated';
  }

}
