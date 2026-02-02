import { JsonPipe } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash, save } from 'ionicons/icons';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonGrid, IonRow, IonCol, JsonPipe]
})
export class ActionButtonComponent  implements OnInit {

  invalid = input<string>();
  dirtyForm = input<boolean>();
  deleteButton = input<number | undefined>();
  saveClick = output<void>();
  cancelClick = output<void>();
  deleteClick = output<void>();
  constructor() {
    addIcons({trash, save}); 
  }

  ngOnInit() {}

  save() {
    this.saveClick.emit();
  }

  cancel() {
    this.cancelClick.emit();
  }

  delete() {
    this.deleteClick.emit();
  }

}
