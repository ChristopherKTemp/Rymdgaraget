import { Injectable } from '@angular/core';
import { Garage } from '../classes/garage';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  saveGarage(garage: Garage) {
    localStorage.setItem('Garage', JSON.stringify(garage))
  }
}
