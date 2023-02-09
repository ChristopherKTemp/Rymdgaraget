import { Injectable } from '@angular/core';
import { Time } from '../classes/time';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  calculateTicketPrice(desiredTime: Time): number {
    const pricePerHour: number = 15
    const pricePerDay: number = 50
    let price = 0
      let days = desiredTime.days + Math.floor(desiredTime.hours / 24)
      let remainingHours = desiredTime.hours % 24

      if (days <= 0){
        price = desiredTime.hours * pricePerHour
      }

      if (days >= 1){
        price = (days * pricePerDay) + (remainingHours * pricePerHour)
      }
    return price
  }
}
