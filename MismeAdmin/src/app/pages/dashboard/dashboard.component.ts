import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../../core-mismes/authentication/credentials.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role = '';
  constructor(private credsService: CredentialsService) {
    this.role = this.credsService.getCurrentUserRole().toLowerCase();
  }

  ngOnInit(): void {
  }

}
