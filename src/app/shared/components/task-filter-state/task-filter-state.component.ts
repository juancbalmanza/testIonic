import { Component } from '@angular/core';
import { IonLabel, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonButton, IonIcon, IonContent, IonItem } from '@ionic/angular/standalone';
import { TaskFilter } from 'src/app/core/services/task-filter';

@Component({
  selector: 'app-task-filter-state',
  templateUrl: './task-filter-state.component.html',
  styleUrls: ['./task-filter-state.component.scss'],
  standalone: true,
  imports: [IonLabel, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonButton, IonIcon, IonContent, IonItem]
})
export class TaskFilterStateComponent {
  $categoryFilter = this.taskFilter.$filterCategory;
  constructor(
    private taskFilter: TaskFilter
  ) { }

  setFilter(filter: string) {
    this.taskFilter.setFilter(filter);
  }

  setFilterCategory() {
    this.taskFilter.setFilterCategory(null);
  }
}
