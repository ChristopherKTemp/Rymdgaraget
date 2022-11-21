import { Injectable } from '@angular/core';
import { Garage } from '../classes/garage';
import { GarageService } from './garage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private garageService: GarageService) { }

  saveLocalStorage(garage: Garage) {
    localStorage.setItem('Garage', JSON.stringify(garage))
  }

  loadLocalStorage(): Garage {
    return JSON.parse(localStorage.getItem('Garage'))
  }

  setupLocalStorageGarage(): Garage {
    if (!this.loadLocalStorage()) {
      let garage: Garage = new Garage
      garage = this.garageService.buildGarage()
      this.garageService.populateGarage(garage)
      this.saveLocalStorage(garage)
      return garage
    }
    return this.loadLocalStorage()
  }
}
