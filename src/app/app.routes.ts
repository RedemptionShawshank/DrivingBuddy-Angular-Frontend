import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListSchoolsComponent } from './list-schools/list-schools.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DetailsComponent } from './details/details.component';
import { SchedulingComponent } from './scheduling/scheduling.component';

const routeConfig: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        title: 'Home Page'
    },
    {
        path: 'driving-school-list',
        component: ListSchoolsComponent,
        title: 'School list'

    },
    {
        path: 'driving-school-list/:cityName',
        component: ListSchoolsComponent,
        title: 'School list'

    },
    {
        path: 'driving-school-list/profile-page',
        component: ProfilePageComponent,
        title: 'Profile Page'
    },
    {
        path: 'profile-page',
        component: ProfilePageComponent,
        title: 'Profile Page'
    },
    {
        path: 'driving-school-list/driving-school-details',
        component: DetailsComponent,
        title: ''
    },
    {
        path: 'driving-school-list/driving-school-details/:schoolName',
        component: DetailsComponent,
        // children: [
        //     {
        //       path: 'next-component',
        //       component: SchedulingComponent,
        //     },
        //   ],
          title: ''
    },



];

export default routeConfig;
