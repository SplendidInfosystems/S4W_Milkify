import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrl: './refer.component.css'
})
export class ReferComponent {

  @Input() value: any[] =[];
  balance=0;
  Rebalance=1500;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private router: Router ,private _formBuilder: FormBuilder) { }
 
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  event: any[] = [];

  ngOnInit() {
    this.event = [
      { content: 'Refer Your friends to Milify',status:'R'},
      { content: 'Friends do their first recharge' ,status:'R'},
      { content: 'Win up to Rs. 100 on every recommendation' },
    ]
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
