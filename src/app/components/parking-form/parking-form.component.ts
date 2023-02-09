import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Garage } from 'src/app/classes/garage';
import { ParkingSpot } from 'src/app/classes/parking-spot';
import { Spaceship } from 'src/app/classes/spaceship';
import { Ticket } from 'src/app/classes/ticket';
import { Time } from 'src/app/classes/time';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ParkingService } from 'src/app/services/parking.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent implements OnInit {
  garage: Garage
  parkingSpots: ParkingSpot[] = []
  spaceship: Spaceship = new Spaceship
  time: Time = new Time
  ticket: Ticket
  ticketPrinted: boolean = false
  showError: boolean = false

  constructor(private parkingService: ParkingService,
    private localstorageService: LocalstorageService,
    private ticketService: TicketService) { }

  ngOnInit(): void {
    this.garage = this.localstorageService.setupLocalStorageGarage()
    this.parkingSpots = this.garage.floors[0].parkingSpots
    console.log(this.garage)
  }

  onSubmit(form: NgForm) {
    this.spaceship.licensePlate = form.value.licensePlate
    this.time.days = form.value.days
    this.time.hours = form.value.hours
    console.log(form.value.floor)
    console.log(form.value.parkingSpot)
    this.tryPark(form.value.licensePlate, this.time, form.value.floor, form.value.parkingSpot)
  }

  tryPark(licensePlate: string, time: Time, floor: number, parkingSpot: number) {

    let spaceshipFound: boolean = this.parkingService.searchForSpaceship(licensePlate, this.garage)
    let parkingSpotIsEmpty: boolean = this.parkingService.checkIfSpaceIsEmpty(this.garage, floor, parkingSpot)

    if (spaceshipFound == false && parkingSpotIsEmpty == true) {
      this.parkingService.park(this.garage, floor, parkingSpot, this.spaceship)
      this.ticket = this.ticketService.printTicket(this.spaceship, time, floor, parkingSpot)
      this.ticketPrinted = true
      this.showError = false
    } else {
      this.ticketPrinted = false
      this.showError = true
    }
  }
}
