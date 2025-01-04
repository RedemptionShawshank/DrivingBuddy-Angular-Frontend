import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Car {
  id: number;
  name: string;
  model: string;
}
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  // constructor(
  //   private formBuilder: FormBuilder,
  // ) {}

  cities: string[] = [];

  constructor(private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http:HttpClient
  ){
    this.http.get<any>(`${this.baseURL}/cities`).subscribe({
      next:(response)=> {
        this.cities = response;
        console.log(this.cities);
      },
      error:(error)=> {
        console.log(error);
      }

    });
  }

  cityName: any='';
  baseURL = "http://localhost:8080";

  findSchools() {
    // console.log(this.cityName);

    if(this.cityName == ''){
      alert('Please enter a city name');
      return;
    }

    const params = new HttpParams().set('cityName', this.cityName.trimEnd());
    this.http.get<any>(`${this.baseURL}/checkCity`,{
      observe: 'response',
      params
    }).subscribe({
      next:(response)=>{
        if(response.status == 200){
          this.router.navigate(['/driving-school-list',this.cityName]);
        }
      },
      error: (error)=> {
        alert('Not yet there');
        console.log(error);
      }
    });
  }

  list:boolean = false;



  cityList(){
    this.list = !this.list;
  }



  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: Event) {
  //   localStorage.setItem('lastRoute', this.router.url);

  // }


  activeTipIndex: number = 0;

  tips = [
    'Tip 1: Always check your mirrors.',
    'Tip 2: Stay within the speed limit.',
    'Tip 3: Keep both hands on the wheel.',
    'Tip 4: Learn to park confidently.',
    'Tip 5: Practice makes perfect!'
  ];

  testimonials = [
    { user: 'John Doe', text: 'This platform helped me find the best driving school in no time!' },
    { user: 'Jane Smith', text: 'The reviews were super helpful in choosing the right instructor.' }
  ];

  faqs = [
    { question: 'How do I find driving schools?', answer: 'Enter your city name and click "Find Driving Schools".' },
    { question: 'What if I can’t find a school in my area?', answer: 'Our platform is constantly growing, so check back soon!' }
  ];

  prevTip(): void {
    this.activeTipIndex = (this.activeTipIndex - 1 + this.tips.length) % this.tips.length;
  }

  nextTip(): void {
    this.activeTipIndex = (this.activeTipIndex + 1) % this.tips.length;
  }


  // cars: Car[] = [
  //   { id: 1, name: 'Toyota Camry', model: '2023' },
  //   { id: 2, name: 'Honda Civic', model: '2022' },
  //   { id: 3, name: 'Ford Mustang', model: '2024' }
  // ];
  // selectedCar: Car = this.cars[1];

  // cars: Car[] = [
  //   { id: 1, name: 'Toyota Camry', model: '2023' },
  //   { id: 2, name: 'Honda Civic', model: '2022' },
  //   { id: 3, name: 'Ford Mustang', model: '2024' },
  //   { id: 4, name: 'Chevrolet Silverado', model: '2023' },
  //   { id: 5, name: 'BMW X5', model: '2022' },
  //   { id: 6, name: 'Mercedes-Benz C-Class', model: '2024' }
  // ];
  // selectedCar: Car | undefined;
  // searchTerm: string = '';

  // get filteredCars(): Car[] {
  //   if (!this.searchTerm) {
  //     return this.cars;
  //   }
  //   return this.cars.filter(car =>
  //     car.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  // compareCars(c1: Car, c2: Car): boolean {
  //   return c1 && c2 && c1.id === c2.id;
  // }

  cars: Car[] = [
    { id: 1, name: 'Toyota Camry', model: '2023' },
    { id: 2, name: 'Honda Civic', model: '2022' },
    { id: 3, name: 'Ford Mustang', model: '2024' },
    { id: 4, name: 'Chevrolet Silverado', model: '2023' },
    { id: 5, name: 'BMW X5', model: '2022' },
    { id: 6, name: 'Mercedes-Benz C-Class', model: '2024' }
  ];
  selectedCar: string | undefined;
  searchTerm: string = '';
  showDropdown: boolean = false;

  get filteredCity(): string[] {
    if (!this.cityName) {
      return []; // Return empty array when search is empty
    }
    return this.cities.filter(city =>
      city.toLowerCase().includes(this.cityName.toLowerCase())
    );
  }

  selectCar(city: string) {
    this.selectedCar = city;
    this.cityName = city; // Set the input value
    console.log(this.cityName);
    this.showDropdown = false; // Hide dropdown after selection
  }

    onInputFocus() {
        this.showDropdown = true;
    }

    onBlur() {
        setTimeout(()=>{
            this.showDropdown = false;
        }, 200);
    }

  compareCars(c1: Car, c2: Car): boolean {
    return c1 && c2 && c1.id === c2.id;
  }
}
