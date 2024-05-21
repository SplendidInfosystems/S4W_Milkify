import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-guide',
  templateUrl: './app-guide.component.html',
  styleUrl: './app-guide.component.css'
})
export class AppGuideComponent {
  constructor( private router:Router) { }
  goBack() {
    this.router.navigate(['/need-help']);
}
  
}