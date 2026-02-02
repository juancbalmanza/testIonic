import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addCircleOutline, chevronUpCircle, colorPalette, document, globe } from 'ionicons/icons';
import { Category } from 'src/app/core/models/category.model';
import { CategoryList } from 'src/app/core/services/category-list';
import { CategoryManagement } from 'src/app/core/services/category-management';
import { TaskList } from 'src/app/core/services/task-list';
import { TaskManagement } from 'src/app/core/services/task-management';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { CategoryManagementComponent } from '../category-management/category-management.component';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ActionButtonComponent, IonItem, IonList, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonFab, IonFabButton, IonFabList, IonMenuToggle, CategoryManagementComponent]
})
export class TaskManagementComponent implements OnInit {
  $categories: Signal<Category[]> = this.categoryList.$categories;
  form: FormGroup = this.fb.group(
    {
      title: this.fb.control<string | null>(
        null, { validators: Validators.required }
      ),
      description: this.fb.control<string | null>(
        null, { validators: Validators.required }
      ),
      completed: false,
      categoryId: this.fb.control<number | undefined>(
        undefined
      )
    });

  formInvalid = toSignal(
    this.form.statusChanges,
    { initialValue: 'INVALID' }
  );

  id: WritableSignal<number | undefined> = signal(undefined);
  $open: WritableSignal<boolean> = signal(false);

  constructor(
    private taskList: TaskList,
    private categoryList: CategoryList,
    private categoryManagement: CategoryManagement,
    private taskManager: TaskManagement,
    private fb: FormBuilder
  ) {
    addIcons({ addCircleOutline, chevronUpCircle, document, colorPalette, globe, add });
    effect(() => {
      const selected = this.taskManager.$taskSelected();
      this.form.reset();

      this.id.set(selected?.id);
      this.form.patchValue(selected ?? { completed: false });
    })
    effect(() => {
      const selected = this.categoryManagement.$categorySelected();
      if (selected?.id)
        this.setSignalOpen();
      else if (selected)
        this.setSignalOpen();
    })
  }

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    await this.categoryList.getCategory();
  }

  async save() {
    if (this.id())
      await this.editTask();
    else
      await this.addTask();

    this.clearTask();
    await this.taskList.getTask();
  }

  async editTask() {
    await this.taskManager.updateTask(this.taskList.$tasks(), { ...this.form.value, id: this.id() });
  }

  async addTask() {
    const id = this.setId();
    await this.taskManager.setTask([...this.taskList.$tasks(), { ...this.form.value, id }]);
  }

  async deleteTask() {
    await this.taskManager.deleteTask(this.taskList.$tasks(), { ...this.form.value, id: this.id() });
    this.clearTask();
    await this.taskList.getTask();
  }

  setId() {
    const orderArray = this.taskList.$tasks().sort((a, b) => b.id!! - a.id!!);
    const maxId: number = orderArray?.[0]?.id ?? 0;
    return maxId + 1;
  }

  clearTask() {
    this.taskManager.setTaskSelected(signal(null));
    this.id.set(undefined);
    this.form.reset();
    this.form.patchValue({ completed: false });
  }

  setSignalOpen() {
    this.$open.set(true);
  }

  setSelectedCategory(category: Category) {
    this.categoryManagement.setCategorySelected(signal(category));
    this.setSignalOpen();
  }
}