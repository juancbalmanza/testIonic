import { Component } from '@angular/core';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { TaskFilter } from 'src/app/core/services/task-filter';

@Component({
  selector: 'app-task-filter-state',
  templateUrl: './task-filter-state.component.html',
  styleUrls: ['./task-filter-state.component.scss'],
  standalone: true,
  imports: [IonLabel, IonSegment, IonSegmentButton]
})
export class TaskFilterStateComponent {

  constructor(
    private taskFilter: TaskFilter
  ) { }

  setFilter(filter: string) {
    this.taskFilter.setFilter(filter);
  }
}
