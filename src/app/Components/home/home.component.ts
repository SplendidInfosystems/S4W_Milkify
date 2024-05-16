import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor() { }

  ngOnInit(): void { }

  currentIndex = 0;

  setCurrentSlide(index: number) {
    this.currentIndex = index;
  }

  popularItems = [
    {
      name: 'Milkify Cream Milk',
      price: '₹50',
      litre: '300ml',
      image:
        'https://cdnasd.countrydelight.in/New_product_image/BM_1646846227411_1665204467802.png',
    },
    {
      name: 'Milkify Cow Milk',
      price: '₹45',
      litre: '400ml',
      image:
        'https://cdnasd.countrydelight.in/New_product_image/CM_1646845937535_1665058250996.png',
    },
    {
      name: 'Milkify  Fat Milk',
      price: '₹65',
      litre: '550ml',
      image:
        'https://cdnasd.countrydelight.in/New_product_image/LFCM-Milk_1646989764729_1665057281149.png',
    },
    {
      name: 'Milkify Buffalo Milk',
      price: '₹60',
      litre: '450ml',
      image:
        'https://cdnasd.countrydelight.in/New_product_image/BM_1646846227411_1665204467802.png',
    },
    {
      name: 'Milkify Cow Milk',
      price: '₹45',
      litre: '550ml',
      image:
        'https://cdnasd.countrydelight.in/New_product_image/CM_1646845937535_1665058250996.png',
    },


  ];


  togglePopup() {
    const popup = document.querySelector('.popup-card') as HTMLElement;
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  }

  // Method to close the popup card
  closePopup() {
    const popup = document.querySelector('.popup-card') as HTMLElement;
    popup.style.display = 'none';
  }
}