import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Signal } from '@angular/core';
import { TaskList } from 'src/app/core/services/task-list';
import { ToDoTask } from 'src/app/core/models/to-do-task.model'
import { TaskManagement } from 'src/app/core/services/task-management';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

  data: Signal<ToDoTask[]> = this.taskList.$tasks;

  constructor(
    private taskList: TaskList,
    private taskManager: TaskManagement,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    await this.taskList.getTask();
  }

  async addTask() {
    await this.taskManager.setTask();
    await this.getData();
  }
}
