import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  filters = {
    distance: 10, // Default distance
    pricing: 0,   // Default pricing
    rating: 1     // Default rating
  };

  applyFilters(): void {
    console.log('Filters applied:', this.filters);
    // Add logic to send the filters to your parent component or service
  }

  



}
