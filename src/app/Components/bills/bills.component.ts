import { Component } from '@angular/core';
import { Location} from '@angular/common';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {
  goBack(): void {
    this.location.back();
  }
  constructor(private location: Location) {
}
}