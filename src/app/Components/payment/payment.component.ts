import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  upiIDs: string[] = [];
  constructor(private router: Router) { }
  
  goBack(): void {
    this.router.navigate(['/wallet']);
  }

  addUPI(): void {
    this.upiIDs.push(''); // Add an empty string as a new UPI ID
  }
  removeUPI(index: number): void {
    this.upiIDs.splice(index, 1); // Remove the UPI ID input field at the specified index
  }
  popularItems = [
    {
      name: 'PAYTM',
      image:
        'https://m.economictimes.com/thumb/msid-107312198,width-1200,height-900,resizemode-4,imgsize-6574/paytm-etonline.jpg',
    },
    {
      name: 'GPAY',
      image:
        'https://static1.anpoimages.com/wordpress/wp-content/uploads/2020/11/05/Google-Pay-India-Tez-new-icon.jpg',
    }, 
    {
      name: 'PHONEPE',
      image:
        'https://gumlet-images.assettype.com/afaqs%2Fimport%2Fall%2Fnews%2Fimages%2Fnews_story_grfx%2F2018%2F03%2F52495%2FPhonePe.jpg?auto=format%2Ccompress&w=1200',
    }, 
    {
      name: 'AMAZON',
      image:
        'https://www.svgrepo.com/show/313459/amazon-pay.svg',
    },
   
  ]
}
