import { Injectable } from '@angular/core';
import { Coordinate } from '../classes/coordinate';
import { GoodbyeTicket } from '../classes/goodbye-ticket';
import { Spaceship } from '../classes/spaceship';
import { Ticket } from '../classes/ticket';
import { Time } from '../classes/time';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private paymentService: PaymentService) { }

  printTicket(spaceship: Spaceship, time: Time, floorNr: number, parkingSpotNr: number) {
    let ticket = new Ticket
    ticket.floor = floorNr
    ticket.parkingSpot = parkingSpotNr
    ticket.price = this.paymentService.calculateTicketPrice(time)
    ticket.licensePlate = spaceship.licensePlate
    ticket.todaysDate = new Date(Date.now())
    ticket.parkingDays = time.days
    ticket.parkingHOurs = time.hours
    return ticket
  }

  printGoodbyeTicket(licensePlate: string, coordinate: Coordinate): GoodbyeTicket {
    let goodbyeTicket = new GoodbyeTicket
    goodbyeTicket.licensePlate = licensePlate
    goodbyeTicket.floorNr = coordinate.floorNr
    goodbyeTicket.parkingSpotNr = coordinate.parkingSpotNr
    goodbyeTicket.todaysDate = new Date(Date.now())
    return goodbyeTicket
  }
}
