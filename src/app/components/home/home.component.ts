import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/classes/garage';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  garage: Garage

  constructor(private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.garage = this.localstorageService.setupLocalStorageGarage()
    console.log(this.garage)
  }
}
