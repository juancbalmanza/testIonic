import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle } from '@ionic/angular/standalone';
import { TaskListComponent } from 'src/app/shared/components/task-list/task-list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle , CommonModule, FormsModule, TaskListComponent]
})
export class TaskPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
