import { Injectable } from '@angular/core';
import { Floor } from '../classes/floor';
import { Garage } from '../classes/garage';
import { ParkingSpot } from '../classes/parking-spot';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  garage: Garage
  floors: Floor[]
  parkingSpots: ParkingSpot[]

  constructor() { }

  buildGarage(numberOfFloors: number, numberOfParkingSpots: number): Garage {
    let garage = new Garage
    garage.floors = this.buildFloors(numberOfFloors)
    garage.floors.forEach(floor => floor.parkingSpots = this.buildParkingSpots(numberOfParkingSpots))
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
}
