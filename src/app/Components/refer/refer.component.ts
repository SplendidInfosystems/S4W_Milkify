import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReferService } from '../../Services/refer.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css']
})
export class ReferComponent implements OnInit {

  @Input() value: any[] = [];
  balance = 0;
  loading: boolean = true;
  Rebalance = 1500;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  referralData: any;
  event: any[] = [];

  constructor(private router: Router, private _formBuilder: FormBuilder, private referService: ReferService) { }

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });

  ngOnInit() {
    this.event = [
      { content: 'Refer Your friends to Milify', status: 'R' },
      { content: 'Friends do their first recharge', status: 'R' },
      { content: 'Win up to Rs. 100 on every recommendation' },
    ];

    const storedReferralData = localStorage.getItem('referralData');
    if (storedReferralData) {
      this.referralData = JSON.parse(storedReferralData);
      this.loading = false; // Set loading to false since we have data
    } else {
      this.fetchReferralData(2);
    }
  }

  fetchReferralData(userId: number): void {
    this.referService.getReferral(userId).subscribe(
      (response) => {
        this.referralData = response;
        console.log('Referral data:', this.referralData);
        localStorage.setItem('referralData', JSON.stringify(this.referralData));
        this.loading = false; 
      },
      (error) => {
        console.error('Error fetching referral data:', error);
        this.loading = false; 
      }
    );
  }

  openShareContent(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Share Title',
        text: 'Share Text',
        url: 'https://example.com',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Web Share API not supported');
    }
  }

  openWhatsApp(number: string) {
    window.open(`https://wa.me/${number}`, '_blank');
  }

  openContact(number: string) {
    window.open(`tel:${number}`, '_blank');
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

}
