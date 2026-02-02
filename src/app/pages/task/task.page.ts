import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { TaskFilterStateComponent } from 'src/app/shared/components/task-filter-state/task-filter-state.component';
import { TaskListComponent } from 'src/app/shared/components/task-list/task-list.component';
import { TaskManagementComponent } from 'src/app/shared/components/task-management/task-management.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [TaskListComponent, TaskManagementComponent, TaskFilterStateComponent, IonContent]
})
export class TaskPage { }
