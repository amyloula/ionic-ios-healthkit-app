import { Component, OnInit, Input } from '@angular/core';
import { HealthkitCard } from '../interfaces/healthkit';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: HealthkitCard;

  constructor() {
  }

  ngOnInit() { }

}
