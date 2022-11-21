import { Injectable } from '@angular/core';
import { Coordinate } from '../classes/coordinate';
import { Garage } from '../classes/garage';
import { Spaceship } from '../classes/spaceship';
import { DataService } from './data.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  coordinate: Coordinate = new Coordinate

  constructor(private dataService: DataService,
    private localstorageService: LocalstorageService) { }

  checkIfSpaceIsEmpty(garage: Garage, floor: number, parkingSpot: number): boolean {
    if (garage.floors[floor].parkingSpots[parkingSpot].spaceship) {
      return false
    }
    return true
  }

  park(garage: Garage, floor: number, parkingSpot: number, spaceship: Spaceship) {
    garage.floors[floor].parkingSpots[parkingSpot].spaceship = spaceship
    this.dataService.garageSource.next(garage)
    this.localstorageService.saveGarage(garage)
    console.log(garage)
  }

  retrieve(licensePlate: string, garage: Garage): Coordinate {
    let spaceshipFound: boolean = this.searchForSpaceship(licensePlate, garage)
    if (spaceshipFound) {
      this.removeSpaceship(garage, this.coordinate.floorNr, this.coordinate.parkingSpotNr)
      return this.coordinate
    }
    return null
  }

  searchForSpaceship(licensePlate: string, garage: Garage): boolean {
    let found: boolean = false;
    for (let i = 0; i < garage.floors.length; i++) {
      for (let k = 0; k < garage.floors[0].parkingSpots.length; k++) {
        if (garage.floors[i].parkingSpots[k].spaceship?.licensePlate == licensePlate) {
          console.log(i, k)
          this.coordinate.floorNr = i
          this.coordinate.parkingSpotNr = k
          found = true
          break
        }
      }
    }
    return found
  }

  removeSpaceship(garage: Garage, floorNr: number, parkingSpotNr: number) {
    garage.floors[floorNr].parkingSpots[parkingSpotNr].spaceship = null
    this.dataService.garageSource.next(garage)
    this.localstorageService.saveGarage(garage)
    console.log(garage)
  }
}
