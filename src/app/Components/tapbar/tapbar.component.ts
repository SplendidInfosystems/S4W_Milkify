import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tapbar',
  templateUrl: './tapbar.component.html',
  styleUrl: './tapbar.component.css'
})
export class TapbarComponent {
  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
