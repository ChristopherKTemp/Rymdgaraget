import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Garage } from 'src/app/classes/garage';
import { ParkingSpot } from 'src/app/classes/parking-spot';
import { Spaceship } from 'src/app/classes/spaceship';
import { Ticket } from 'src/app/classes/ticket';
import { Time } from 'src/app/classes/time';
import { DataService } from 'src/app/services/data.service';
import { ParkingService } from 'src/app/services/parking.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent implements OnInit {
  garage: Garage = new Garage
  parkingSpots: ParkingSpot[] = []
  spaceship: Spaceship = new Spaceship
  time: Time = new Time
  ticket: Ticket
  ticketPrinted: boolean = false
  showError: boolean = false

  constructor(private dataService: DataService,
    private parkingService: ParkingService,
    private ticketService: TicketService) { }

  ngOnInit(): void {
    this.dataService.garageSource.subscribe(garage => this.garage = garage)
    this.parkingSpots = this.garage.floors[0].parkingSpots
    console.log(this.garage)
  }

  onSubmit(form: NgForm) {
    this.spaceship.licensePlate = form.value.licensePlate
    this.time.days = form.value.days
    this.time.hours = form.value.hours

    let spaceshipFound: boolean = this.parkingService.searchForSpaceship(form.value.licensePlate, this.garage)
    let parkingSpotIsEmpty: boolean = this.parkingService.checkIfSpaceIsEmpty(this.garage, form.value.floor, form.value.parkingSpot)

    if (spaceshipFound == false && parkingSpotIsEmpty == true) {
      this.parkingService.park(this.garage, form.value.floor, form.value.parkingSpot, this.spaceship)
      this.ticket = this.ticketService.printTicket(this.spaceship, this.time, form.value.floor, form.value.parkingSpot)
      this.ticketPrinted = true
      this.showError = false
    } else {
      this.ticketPrinted = false
      this.showError = true
    }
  }
}
