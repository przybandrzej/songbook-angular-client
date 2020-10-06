import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  isError = false;
  errorMessage = '';
  message = '';
  isProcessing = true;
  processingMessage = 'Processing account activation';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const key = this.route.snapshot.queryParamMap.get('key');
    this.authService.activateAccount(key).subscribe(() => {
        this.isProcessing = false;
        this.message = 'Success! Your account has been activated!';
      },
      error => {
        this.isProcessing = false;
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

}
