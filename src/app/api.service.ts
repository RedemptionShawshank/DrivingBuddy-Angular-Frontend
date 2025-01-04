import { Injectable } from '@angular/core';
import { DrivingSchools } from './driving-schools';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ds: DrivingSchools = new DrivingSchools();

  private valueSubject = new BehaviorSubject<DrivingSchools>(new DrivingSchools());
  value$ = this.valueSubject.asObservable();

  updateValue(newValue: DrivingSchools) {
    this.valueSubject.next(newValue);
  }

  // setDrivingSchool(drivingSchool: DrivingSchools) {
  //   this.ds = drivingSchool;
  //   console.log("set service ",this.ds.photoUrl);
  // }
  // getDrivingSchool() {
  //   console.log("get service ",this.ds.photoUrl);
  //   return this.ds;
  // }
}
