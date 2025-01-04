import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router,RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { DrivingSchools } from '../driving-schools';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomerReviews } from '../customer-reviews';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  shopName!: string ;
  schoolName!: string;
  baseURL = "http://localhost:8080";
  drivingSchools: DrivingSchools = new DrivingSchools();
  drivingSchoolRating!: number;

  floor(value: number): number {
    return Math.floor(value);
  }

  ceil(value: number): number {
    return Math.ceil(value);
  }

  constructor(private route: ActivatedRoute,
    private router: Router, private viewportScroller: ViewportScroller,
    private api:ApiService,private http:HttpClient
  ) {


  }

  // reviews:CustomerReviews[] = [];
  reviews:any;

  ngOnInit(): void {
      // Get the 'id' parameter from the route
      this.shopName = this.route.snapshot.paramMap.get('schoolName')!;
      // console.log('School ID:', this.shopName);

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });

      // this.api.value$.subscribe((value) => {
      //   this.drivingSchools = value;
      //   console.log("url ",this.drivingSchools.photoUrl);
      // });
      const school = this.shopName.split('_')[0];
      this.schoolName = school
      const city = this.shopName.split('_')[1];
      const jsonData = {
        schoolName: school,
        cityName: city
      };

      const httpParams = new HttpParams({ fromObject: jsonData });

      this.http.get<any>(`${this.baseURL}/reviews`, { params: httpParams}).subscribe({
          next:(data: DrivingSchools)=>{
            this.drivingSchools = data;
            // console.log("data: ",this.drivingSchools);
            this.api.updateValue(this.drivingSchools);
            // this.api.setDrivingSchool(this.drivingSchools);
            // console.log("data: ",this.drivingSchools);
            this.reviews = this.drivingSchools.reviews;
            this.filteredReviews = this.reviews;
            // console.log("review: ",this.reviews);
            this.drivingSchoolRating = Number(this.drivingSchools.googleRatings);
          },
          error: (error)=> {
            console.log(error);
          }
      });



  }

  

  products = [
    {
      name: 'Driving School name 1',
      description: 'Location',
      location: 'https://maps.app.goo.gl/3wcUF2kDhzubN5YN9',
      image: 'assets/schools/test.jpg', // Add image URL here if needed
      price: '5000',
      phone: '7754949623'
    }
  ];


  customerReviews = [
    { name: 'Customer-1', rating: 5, feedback: 'Excellent service!' },
    { name: 'Customer-2', rating: 4, feedback: 'Very good, but room for improvement.' },
    { name: 'Customer-3', rating: 3, feedback: 'Average experience.' },
    { name: 'Customer-4', rating: 2, feedback: 'Not satisfied with the service.' },
    { name: 'Customer-4', rating: 2, feedback: 'Not satisfied with the service.' },
    { name: 'Customer-4', rating: 2, feedback: 'Not satisfied with the service.' },
    { name: 'Customer-4', rating: 2, feedback: 'Not satisfied with the service.' },
  ];

  services = [
    { name: 'Vitara Brezza', price: '₹5000' },
    { name: 'Swift', price: '₹5000' },
    { name: 'Automatic', price: '₹6000'},
    { name: 'Fast Track', price: '₹6000'}
  ];

  instructions = [
    {rule: 'This is Rule 1'},
    {rule: 'This is Rule 2'},
    {rule: 'This is Rule 3'},
    {rule: 'This is Rule 4'},
    {rule: 'This is Rule 5'},
    {rule: 'This is Rule 6'},
    {rule: 'This is Rule 7'}
  ];


  copyPhoneNumber() {
    // Get the phone number text from the span element
    const phoneNumber = (document.querySelector('.map-text') as HTMLElement).textContent;

    // Create a temporary input element to copy the text
    const input = document.createElement('input');
    input.value = phoneNumber ?? '';

    // Append the input element to the document body
    document.body.appendChild(input);

    // Select the text in the input field
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    // Execute the "copy" command
    document.execCommand('copy');

    // Remove the input element from the document
    document.body.removeChild(input);

    // Optionally, show a message that the number has been copied
    alert('Phone number copied to clipboard!');
  }


  openInNewTab(googleMapLink:string){
    window.open(googleMapLink, '_blank')
  }


  // booking(schoolName : any) {
  //    // Get the school name dynamically if needed
  //    console.log(schoolName);
  //   this.router.navigate([`/driving-school-list/driving-school-details/${schoolName+'_booking'}`]);
  // }

  isBooking: boolean = false;

  showBooking(){
    this.isBooking = !this.isBooking;
  }

  closeDropdown() {
    this.isBooking = false;
  }

  applyFilters(): void {

  }





  filteredReviews:any;

  showFilters = false;
  hover: any = null;

  sortByRating() {
    this.filteredReviews.sort((a: CustomerReviews, b: CustomerReviews) => Number(b.rating) - Number(a.rating));
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  filterByRating(rating: number) {
    this.filteredReviews = this.reviews.filter((review: CustomerReviews) => Number(review.rating) === rating);
  }

  expandReview(event: Event, review: any) {
    event.preventDefault();
    alert(`Full review: ${review.text}`);
  }

  likeReview(review: any) {
    alert(`You liked ${review.author_name}'s review!`);
  }

  dislikeReview(review: any) {
    alert(`You disliked ${review.author_name}'s review.`);
  }

  redirectToGoogleReviews() {
    window.open(this.drivingSchools.googleMapLink,'_blank');
  }

  // openInNewTab(googleMapLink:string){
  //   window.open(googleMapLink, '_blank')
  // }

  // readableDate: string = '';

  convertTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString().split(",")[0]; // Format the date to a readable string
  }


}
