import { Component } from '@angular/core';
import { IonContent, IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuToggle, IonButton, IonButtons, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { CategoriesMessageComponent } from 'src/app/shared/components/categories-message/categories-message.component';
import { CategoryListComponent } from 'src/app/shared/components/category-list/category-list.component';
import { TaskFilterStateComponent } from 'src/app/shared/components/task-filter-state/task-filter-state.component';
import { TaskListComponent } from 'src/app/shared/components/task-list/task-list.component';
import { TaskManagementComponent } from 'src/app/shared/components/task-management/task-management.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [TaskListComponent, TaskManagementComponent, TaskFilterStateComponent, IonContent, IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuToggle, IonButton, IonButtons, IonIcon, IonLabel, CategoryListComponent, CategoriesMessageComponent]
})
export class TaskPage { }
