import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from '../../../Services/vacation.service';

@Component({
  selector: 'app-add-vac',
  templateUrl: './add-vac.component.html',
  styleUrls: ['./add-vac.component.css']
})
export class AddVacComponent implements OnInit {
  startDate: Date | undefined;
  endDate: Date | undefined;
  isEditMode: boolean = false;
  vacationId: number | undefined;

  constructor(
    private router: Router, 
    private vacationService: VacationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we are in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.vacationId = Number(params['id']); // Ensuring the id is a number
        this.vacationService.vacationData$.subscribe((data: any) => {
          const vacationData = data[this.vacationId!];
          if (vacationData) {
            this.startDate = new Date(vacationData.startDate);
            this.endDate = new Date(vacationData.endDate);
          }
        });
      }
    });
  }

  addVacation() {
    if (this.startDate) {
      const vacationData = { startDate: this.startDate, endDate: this.endDate };
      if (this.isEditMode && this.vacationId !== undefined) {
        this.vacationService.updateVacationData(this.vacationId, vacationData);
      } else {
        this.vacationService.setVacationData(vacationData);
      }
      this.router.navigate(['/vacation']);
    }
  }

  goBack(): void {
    this.router.navigate(['/vacation']);
  }
}
