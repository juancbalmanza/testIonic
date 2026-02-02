import { Injectable, signal, WritableSignal } from '@angular/core';
import { ToDoTask } from '../models/to-do-task.model';
import { StorageManagement } from './storage-management';

@Injectable({
  providedIn: 'root',
})
export class TaskManagement {
  private readonly _$taskSelected: WritableSignal<ToDoTask | null> = signal(null);
  readonly $taskSelected = this._$taskSelected.asReadonly();
  taskTemp: WritableSignal<ToDoTask | null> = signal(null);
  constructor(private storage: StorageManagement) { }

  public async setTask(tasks: ToDoTask[]) {
    await this.storage?.set('task', tasks);
    this._$taskSelected.set(null);
  }

  public async updateTask(tasks: ToDoTask[], task: ToDoTask) {
    const result = this.setData(tasks, task, false);
    await this.storage?.set('task', result);
    this.setTaskSelected(signal(null));
  }

  public async deleteTask(tasks: ToDoTask[], task: ToDoTask) {
    const result = this.setData(tasks, task, true);
    await this.storage?.set('task', result);
    this.setTaskSelected(signal(null));
  }

  public setTaskSelected(task: WritableSignal<ToDoTask | null>) {
    this.taskTemp.update(av => (av ? { ...av!!, selected: false } : null));
    if (task()) task.update(av => ({ ...av!!, selected: true }));
    this.taskTemp = task;
    this._$taskSelected.set(task()!!);
  }

  setData(tasks: ToDoTask[], task: ToDoTask, deleteTask: boolean ) {
    const taskResult = tasks.find(x => x.id === task.id);
    const index = tasks.indexOf(taskResult!!);
    deleteTask ? tasks.splice(index, 1) : tasks[index] = { ...tasks[index], ...task }; 
    return tasks;
  }
}
