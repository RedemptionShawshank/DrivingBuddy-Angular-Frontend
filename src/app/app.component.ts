import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet,Router } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'driving-schools-finder';

  constructor(private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    console.log("page reload came to app.component");
  

    // if (isPlatformBrowser(this.platformId)) {
      
    //   const storedRoute = localStorage.getItem('lastRoute');
    //   localStorage.clear();
    //   console.log(storedRoute);
    //   if(storedRoute){
    //     console.log("inside");
        
    //   }
    // }


  }

}
