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
  start_date: any;
  end_date: any;
  vacationData: any;

  constructor(
    private router: Router, 
    private vacationService: VacationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const storedVacationData = localStorage.getItem('vacationData');
    if (storedVacationData) {
      this.vacationData = JSON.parse(storedVacationData);
      this.processVacationData();
    } else {
      this.getVacationData(0);
    }

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.vacationId = Number(params['id']); 
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

  processVacationData(): void {
    if (this.vacationData.length > 0) {
      this.start_date = this.vacationData[0].start_date; 
      this.end_date = this.vacationData[0].end_date; 
    }
  }

  getVacationData(userId: number): void {
    this.vacationService.getVacationData(userId).subscribe(
      (data: any) => {
        console.log('Vacation Data:', data.body);
        this.vacationData = data.body || [];
        this.processVacationData();
        localStorage.setItem('vacationData', JSON.stringify(this.vacationData));
      },
      (error: any) => {
        console.error('Error fetching vacation data:', error);
      }
    );
  }
  
  addVacation() {
    if (this.start_date && this.end_date) {
      const vacationData = { start_date: this.start_date, end_date: this.end_date };
      if (this.isEditMode && this.vacationId !== undefined) {
        this.vacationService.updateVacationData(this.vacationId, vacationData);
      } else {
        this.vacationService.addVacation(vacationData).subscribe(
          (response) => {
            console.log('Vacation added successfully:', response);
            this.router.navigate(['/vacation']);
          },
          (error) => {
            console.error('Error adding vacation:', error);
          }
        );
      }
    } else {
      console.error('Start date or end date is undefined');
    }
  }
  

  goBack(): void {
    this.router.navigate(['/vacation']);
  }
}
