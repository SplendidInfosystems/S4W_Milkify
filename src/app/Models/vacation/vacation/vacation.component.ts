import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VacationService } from '../../../Services/vacation.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  vacation: any[] = [];
  showVacationDates: boolean = false;

  constructor(private router: Router, private vacationService: VacationService) {}

  ngOnInit(): void {
    this.vacationService.vacationData$.subscribe((data: any[]) => {
      this.vacation = data;
      this.showVacationDates = !!data && data.length > 0; 
    });
  }
  

  goToAddVacation(): void {
    this.router.navigate(['/add-vac']);
  }

  editVacation(vacationId: number): void {
    this.router.navigate(['edit-vacation', vacationId]);
  }

  goBack(): void {
    this.router.navigate(['/prod-subs']);
  }
 
}
