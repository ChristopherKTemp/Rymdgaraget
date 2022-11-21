import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/classes/garage';
import { Spaceship } from 'src/app/classes/spaceship';
import { DataService } from 'src/app/services/data.service';
import { GarageService } from 'src/app/services/garage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  garage: Garage
  numberOfFloors: number = 3
  numberOfParkingSpots: number = 15

  showParkForm: boolean = false;
  showHome: boolean = true;

  constructor(private garageService: GarageService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.setupLocalStorage()
    console.log(this.garage)
    this.dataService.garageSource.next(this.garage)
  }

  setupLocalStorage() {
    if (!localStorage.getItem('Garage')) {
      this.garage = this.garageService.buildGarage(this.numberOfFloors, this.numberOfParkingSpots)
      this.populateGarage()
      localStorage.setItem('Garage', JSON.stringify(this.garage))
    }
    this.garage = JSON.parse(localStorage.getItem('Garage'))
  }

  populateGarage() {
    const spaceship1: Spaceship = {
      licensePlate: 'ABC123'
    }
    const spaceship2: Spaceship = {
      licensePlate: 'XYZ123'
    }
    this.garage.floors[0].parkingSpots[0].spaceship = spaceship1
    this.garage.floors[1].parkingSpots[11].spaceship = spaceship2
  }
}
