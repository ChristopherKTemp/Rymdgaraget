import { Component, Input, OnInit } from '@angular/core';
import { Garage } from 'src/app/classes/garage';

@Component({
  selector: 'app-garage-view',
  templateUrl: './garage-view.component.html',
  styleUrls: ['./garage-view.component.scss']
})
export class GarageViewComponent implements OnInit {

  @Input() garage: Garage
  
  constructor() { }

  ngOnInit(): void {

  }
}
