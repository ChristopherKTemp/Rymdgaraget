import { Injectable } from '@angular/core';
import { Floor } from '../classes/floor';
import { Garage } from '../classes/garage';
import { ParkingSpot } from '../classes/parking-spot';
import { Spaceship } from '../classes/spaceship';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  numberOfFloors: number = 3
  numberOfParkingSpots: number = 15

  garage: Garage
  floors: Floor[]
  parkingSpots: ParkingSpot[]

  constructor() { }

  buildGarage(): Garage {
    let garage = new Garage
    garage.floors = this.buildFloors(this.numberOfFloors)
    garage.floors.forEach(floor => floor.parkingSpots = this.buildParkingSpots(this.numberOfParkingSpots))
    return garage
  }

  buildParkingSpots(numberOfParkingSpots: number): ParkingSpot[] {
    let parkingSpots: ParkingSpot[] = []
    for (let i = 0; i < numberOfParkingSpots; i++) {
      let parkingSpot: ParkingSpot = new ParkingSpot
      parkingSpot.id = i
      parkingSpots.push(parkingSpot)
    }
    return parkingSpots
  }

  buildFloors(numberOfFloors: number) {
    let floors: Floor[] = []
    for (let i = 0; i < numberOfFloors; i++) {
      let floor: Floor = new Floor
      floor.id = i
      floors.push(floor)
    }
    return floors
  }

  populateGarage(garage: Garage) {
    const spaceship1: Spaceship = {
      licensePlate: 'ABC123'
    }
    const spaceship2: Spaceship = {
      licensePlate: 'XYZ123'
    }
    garage.floors[0].parkingSpots[0].spaceship = spaceship1
    garage.floors[1].parkingSpots[11].spaceship = spaceship2
  }
}
