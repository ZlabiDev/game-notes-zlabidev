import {Component} from '@angular/core';
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }
}
