import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loja-angular-ui';

  constructor(private router: Router) {}

  navigateToOrders(): void {
    this.router.navigate(['/produtos']);
  }
}
