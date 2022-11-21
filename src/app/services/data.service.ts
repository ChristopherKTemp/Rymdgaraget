import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Garage } from '../classes/garage';
import { Spaceship } from '../classes/spaceship';
import { Time } from '../classes/time';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  garageSource = new BehaviorSubject<Garage>(null)
  spaceshipSource = new BehaviorSubject<Spaceship>(null)
  timeSource = new BehaviorSubject<Time>(null)

  constructor() { }

  sendDataFromParkingForm(time: Time, spaceship: Spaceship) {
    this.timeSource.next(time)
    this.spaceshipSource.next(spaceship)
    console.log(time)
    console.log(spaceship)
  }

  sendGarage(garage: Garage){
    this.garageSource.next(garage)
  }
}
