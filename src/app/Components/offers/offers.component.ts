import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
promoForm: FormGroup;
invalidCode: boolean = false;

constructor(private fb: FormBuilder, private router:Router) {
  this.promoForm = this.fb.group({
    promoCode: ['']
  });
}

applyPromoCode() {
  const validPromoCodes = ['DISCOUNT60', 'SAVE22', 'HEALTH24']; 
  const enteredCode = this.promoForm.get('promoCode')?.value;
  this.invalidCode = !validPromoCodes.includes(enteredCode);
}
  goBack(): void {
    this.router.navigate(['/prod-subs']);
  }


  offers = [
    {
      type: 'Hot Deal',
      discount: '60% off on Kitchen Staples',
      description: 'Enjoy 60% off on Country Selected Kitchen Staples.',
      validity: new Date('2024-05-25'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    },
    {
      type: 'Hot Deal',
      discount: '22% off on Selected Kitchen Staples',
      description: 'Enjoy 22% off on Country Delight Selected Kitchen Staples.',
      validity: new Date('2024-05-29'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    },
    {
      type: 'Hot Deal',
      discount: 'New Milk Subscription Offer',
      description: 'New Milk Subscription Offer -Only for today',
      validity: new Date('2024-05-30'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    },
    {
      type: 'Hot Deal',
      discount: '22% off on Selected Kitchen Staples',
      description: 'Enjoy 22% off on Country Delight Selected Kitchen Staples.',
      validity: new Date('2024-05-31'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    },
    {
      type: 'Hot Deal',
      discount: 'New Milk Subscription Offers    ',
      description: 'New Milk Subscription Offer-Only for today',
      validity: new Date('2024-05-22'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    }
    ,
    {
      type: 'Hot Deal',
      discount: 'VIP Trial - 35% off on Coconut Water',
      description: 'VIP Trial - 35% off on Coconut Water',
      validity: new Date('2024-05-22'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    }
    ,
    {
      type: 'Hot Deal',
      discount: '35% Off on First Order',
      description: '35% Off on First Order-Only for today',
      validity: new Date('2024-05-22'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    },
    {
      type: 'Hot Deal',
      discount: 'VIP Trial - 35% off on Coconut Water',
      description: 'VIP Trial - 35% off on Coconut Water',
      validity: new Date('2024-05-22'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    },
    {
      type: 'Hot Deal',
      discount: '35% Off on First Order',
      description: '35% Off on First Order-Only for today',
      validity: new Date('2024-05-22'),
      image:'https://ik.imagekit.io/dunzo/1615645049486_variant_5ea92fd7668ce56be2b0c739_1.jpg?tr=w-488,h-488,cm-pad_resize'
    }
  ];
}
