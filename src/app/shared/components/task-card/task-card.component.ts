import { Component, input, signal, WritableSignal } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { ToDoTask } from 'src/app/core/models/to-do-task.model';
import { ActionButtonCardComponent } from '../action-button-card/action-button-card.component';
import { TaskManagement } from 'src/app/core/services/task-management';
import { TaskList } from 'src/app/core/services/task-list';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, ActionButtonCardComponent]
})
export class TaskCardComponent {
  readonly task = input<ToDoTask>();
  $task: WritableSignal<ToDoTask | null> = signal(this.task()!!);

  constructor(
    private taskManagement: TaskManagement,
    private taskList: TaskList
  ) { }

  loadEdit() {
    this.$task = signal(this.task()!!);
    this.taskManagement.setTaskSelected(this.$task);
  }

  updateTask() {
    this.taskManagement.updateTask(this.taskList.$tasks(), {...this.task()!!, completed: true});
    this.taskManagement.setTaskSelected(signal(null));
    this.taskList.getTask();
  }
}
