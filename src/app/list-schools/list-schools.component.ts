import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FiltersComponent } from '../filters/filters.component';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { DrivingSchoolList } from '../driving-school-list';

interface Breadcrumb {
  label: string;
  path: string;
}

@Component({
  selector: 'app-list-schools',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './list-schools.component.html',
  styleUrl: './list-schools.component.css'
})
export class ListSchoolsComponent implements AfterViewInit {

  @ViewChild('myComponentElement') myComponentElement!: ElementRef;

  constructor(private router:Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog, private activatedRoute: ActivatedRoute,
    private api:ApiService, private http:HttpClient
  ){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        //Small timeout to ensure view is rendered
        setTimeout(()=>{
            this.scrollToTop();
        })
    });
  }

  ngAfterViewInit() {
    this.scrollToTop();
}

  scrollToTop(){
      if (this.myComponentElement) {
          this.myComponentElement.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
  }

  imagePath:string = "src/assets/os.png";

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: Event) {
  //   localStorage.setItem('lastRoute', this.router.url);
  // }

  // openOverlay(): void {
  //   console.log("filter");
  //   this.dialog.open(FiltersComponent, {
  //     width: 'auto',
  //     height: 'auto',
  //     panelClass: 'custom-dialog-container',
      
  //     disableClose:true
  //   });
  // }

  cityName!: string ;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.generateBreadcrumbs(this.activatedRoute.root);
      });

    
    this.cityName = this.route.snapshot.paramMap.get('cityName')!;
    console.log("cityName: ",this.cityName);

    this.http.get<any>(`${this.baseURL}/drivingschools`,{
      params: { cityName: this.cityName }
    }).subscribe({
        next:(data: DrivingSchoolList)=>{
          this.drivingSchoolsList = data;
          console.log("data: ",this.drivingSchoolsList);
        },
        error: (error)=> {
          console.log(error);
        }
    });
  }



  isDropdownOpen = false;
  selectedPrice: string | null = null;

  searchText: string = '';

  searchOn:boolean = false;

  searchedDrivingSchoolsList: any[] = [];

  searchByLocality():void {

    this.searchedDrivingSchoolsList.length = 0;

    const searchWord = this.searchText.trim().toLowerCase();
    // console.log("searchText: ",this.searchText);
    // console.log("length: ",this.searchText.length);

    // console.log("searchon:before ",this.searchOn);

    if(this.searchText.length!==0) {
      // console.log("ifblock ",this.searchOn);
      this.searchOn = true;
    }
    else{
      this.searchOn = false;
      // console.log("elseblock ",this.searchOn);
      // console.log("drivingSchoolsList: ",this.drivingSchoolsList);
      return;
    }
    // console.log("searchon:after ",this.searchOn);
    // console.log('Search by locality:', this.searchText);
    // console.log("drivingSchoolsList: ",this.drivingSchoolsList);



    for (let i = 0; i < this.drivingSchoolsList.length; i++) {

      const word = this.drivingSchoolsList[i].address.toLowerCase().split(/\s+/);

      // console.log("school: ",school);
      // console.log("word: ",word);
      // console.log("searchWord: ",searchWord);


      const regex = new RegExp(`(^|\\s|,|\\b)${searchWord}(\\s|,|\\b|$)`, 'i');
      // console.log("condition: ",regex.test(this.drivingSchoolsList[i].address));

      // console.log("school: ",this.drivingSchoolsList[i].address);
      // console.log("word: ",word);
      // console.log("searchWord: ",searchWord);

      if(regex.test(this.drivingSchoolsList[i].address)){

        this.searchedDrivingSchoolsList.push(this.drivingSchoolsList[i]);
      }


    }

    // this.drivingSchoolsList = this.drivingSchoolsList.filter((school: any) => {
    //   const word = school.address.toLowerCase().split(/\s+/);




    //   const regex = new RegExp(`(^|\\s|,|\\b)${searchWord}(\\s|,|\\b|$)`, 'i');
    //   console.log("condition: ",regex.test(school.address));

    //   if(regex.test(school.address)){
    //     this.searchedDrivingSchoolsList.push(school);
    //   }
    // });

    // console.log("searchedDrivingSchoolsList: ",this.searchedDrivingSchoolsList);

  }

  closeDropdown() {
    this.isDropdownOpen = false;
    this.filters.distance = 1;
    this.filters.pricing = 0;
    this.filters.rating = 1;
  }

  selectPrice(range: string) {
    this.selectedPrice = range;
  }

  // applyFilters() {
  //   console.log('Filters applied with range:', this.selectedPrice);
  //   this.closeDropdown();
  // }

  clearFilters() {
    this.selectedPrice = null;
    console.log('Filters cleared');
  }


  
  filters = {
    distance: 1, // Default distance
    pricing: 0,   // Default pricing
    rating: 1     // Default rating
  };

  applyFilters(): void {
    console.log('Filters applied:', this.filters);
    // Add logic to send the filters to your parent component or service
  }
  distanceFilter(): void{

  }

  ratingFilterOn:boolean = false;
  drivingSchoolListrating: any[] = [];
  ratingFilter(): void{
    this.drivingSchoolListrating.length = 0;
    console.log('Filters applied:', this.filters);
    let inputrating: number = Number(this.filters.rating);

    console.log("rating: ",inputrating);
    this.ratingFilterOn = true;
    this.searchOn = true;

    for(let i=0;i<this.drivingSchoolsList.length;i++){
      if(this.drivingSchoolsList[i].googleRating >= inputrating){
        this.drivingSchoolListrating.push(this.drivingSchoolsList[i]);
      }
    }
    console.log("ratingFilter: ",this.drivingSchoolListrating);
  }


  viewSchoolDetails(schoolName: string): void {
    console.log("school name: ",schoolName);
    this.router.navigate(['/driving-school-list/driving-school-details', schoolName.trim()+'_'+this.cityName]);
  }

  breadcrumbs: Breadcrumb[] = [];

  baseURL = "http://localhost:8080";
  drivingSchoolsList:any;

  name: string = '';



  private generateBreadcrumbs(route: ActivatedRoute, path: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        path += `/${routeURL}`;
        console.log("path ",path);
        breadcrumbs.push({
          label: this.capitalizeFirstLetter(routeURL),
          path: path
        });
      }

      return this.generateBreadcrumbs(child, path, breadcrumbs);
    }

    return breadcrumbs;
  }

  capitalizeFirstLetter(str: string): string {
    // console.log("str ",str);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  copyPhoneNumber() {
    // Get the phone number text from the span element
    const phoneNumber = (document.querySelector('.phone-number') as HTMLElement).textContent;

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


  filtersRating = {
    rating: 1, // Default to 1 star
  };

  stars = [1, 2, 3, 4, 5]; // Array for 5 stars

  setRating(rating: number): void {
    this.filters.rating = rating;
  }

}
