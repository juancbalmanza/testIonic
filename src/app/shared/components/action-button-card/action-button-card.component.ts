import { Component, input, output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-action-button-card',
  templateUrl: './action-button-card.component.html',
  styleUrls: ['./action-button-card.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonGrid, IonRow, IonCol]
})
export class ActionButtonCardComponent {
  disabledRealizado = input<boolean>();
  editClick = output<void>();
  didTaskClick = output<void>();
  constructor() { addIcons({ createOutline }); }

  edit() {
    this.editClick.emit();
  }

  didTask() {
    this.didTaskClick.emit();
  }
}
