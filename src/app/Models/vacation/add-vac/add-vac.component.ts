import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VacationService } from '../../../Services/vacation.service';
@Component({
  selector: 'app-add-vac',
  templateUrl: './add-vac.component.html',
  styleUrls: ['./add-vac.component.css']
})
export class AddVacComponent {
  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(private router: Router, private vacationService: VacationService) { }
  addVacation() {
    if (this.startDate) {
      this.vacationService.setVacationData({ startDate: this.startDate, endDate: this.endDate });
      this.router.navigate(['/vacation']);
    }
  }
  goBack(): void {
    this.router.navigate(['/vacation']);
  }
}