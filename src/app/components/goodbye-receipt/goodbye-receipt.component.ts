import { Component, Input, OnInit } from '@angular/core';
import { GoodbyeTicket } from 'src/app/classes/goodbye-ticket';

@Component({
  selector: 'app-goodbye-receipt',
  templateUrl: './goodbye-receipt.component.html',
  styleUrls: ['./goodbye-receipt.component.scss']
})
export class GoodbyeReceiptComponent implements OnInit {
  @Input() goodbyeTicket: GoodbyeTicket
  constructor() { }

  ngOnInit(): void {
  }

}
