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
  vacationId: any;
  start_date: any;
  loading: boolean = false;
  end_date: any;
  vacationData: any;

  constructor(
    private router: Router,
    private vacationService: VacationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const cachedVacationData = localStorage.getItem('vacationData');
    if (cachedVacationData) {
      this.vacationData = JSON.parse(cachedVacationData);
      this.processVacationData();
    } else {
      this.getVacationData(1); // Fetch vacation data if not cached
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
    if (this.vacationData && this.vacationData.length > 0) {
      this.start_date = this.vacationData[0].start_date;
      this.end_date = this.vacationData[0].end_date;
    }
  }

  getVacationData(userId: number): void {
    this.loading = true;
    this.vacationService.getVacationData(userId).subscribe(
      (data: any) => {
        console.log('Vacation Data:', data.body);
        this.vacationData = data.body || [];
        this.processVacationData();
        localStorage.setItem('vacationData', JSON.stringify(this.vacationData));
      },
      (error: any) => {
        console.error('Error fetching vacation data:', error);
      },
      () => {
        this.loading = false; 
      }
    );
  }
  

  addVacation(): void {
    this.loading = true;
    const vacationData = {
      userId: 1, // Assuming userId is fixed or should come from somewhere else
      startDate: this.startDate,
      endDate: this.endDate
      // Add other necessary properties from your form or component
    };
  
    this.vacationService.addVacation(vacationData).subscribe(
      (response) => {
        console.log('Vacation added successfully:', response);
        this.router.navigate(['/vacation']);
      },
      (error) => {
        console.error('Error adding vacation:', error);
        // Handle error as needed
      },
      () => {
        this.loading = false;
      }
    );
  }
  

  goBack(): void {
    this.router.navigate(['/vacation']);
  }
}
