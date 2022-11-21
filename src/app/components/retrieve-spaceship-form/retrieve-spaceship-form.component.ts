import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Coordinate } from 'src/app/classes/coordinate';
import { Garage } from 'src/app/classes/garage';
import { GoodbyeTicket } from 'src/app/classes/goodbye-ticket';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ParkingService } from 'src/app/services/parking.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-retrieve-spaceship-form',
  templateUrl: './retrieve-spaceship-form.component.html',
  styleUrls: ['./retrieve-spaceship-form.component.scss']
})
export class RetrieveSpaceshipFormComponent implements OnInit {
  garage: Garage
  coordinate: Coordinate
  goodbyeTicket: GoodbyeTicket
  ticketPrinted: boolean = false;
  showError: boolean = false

  constructor(private localstorageService: LocalstorageService,
    private parkingService: ParkingService,
    private ticketService: TicketService) { }

  ngOnInit(): void {
    this.garage = this.localstorageService.setupLocalStorageGarage()
    console.log(this.garage)
  }

  onSubmit(form: NgForm) {
    this.coordinate = this.parkingService.retrieve(form.value.licensePlate, this.garage)
  
    if (this.coordinate) {
      this.goodbyeTicket = this.ticketService.printGoodbyeTicket(form.value.licensePlate, this.coordinate)
      if (this.goodbyeTicket) this.ticketPrinted = true
      this.showError = false
    }
    else {
      this.showError = true
      this.ticketPrinted = false
    }
  }
}
