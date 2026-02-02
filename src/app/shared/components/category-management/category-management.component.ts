import { JsonPipe } from '@angular/common';
import { Component, computed, effect, input, model, OnInit, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonInput, IonContent, IonItem, IonGrid, IonRow, IonCol, IonIcon, IonFooter, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, save } from 'ionicons/icons';
import { CategoryList } from 'src/app/core/services/category-list';
import { CategoryManagement } from 'src/app/core/services/category-management';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  standalone: true,
  imports: [JsonPipe, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonInput, IonContent, IonItem, IonGrid, IonRow, IonCol, IonIcon, IonFooter]
})
export class CategoryManagementComponent implements OnInit {
  categorySelected = this.categoryManagement.$categorySelected;
  name = model('');
  open = model.required<boolean>();
  /* task = input<ToDoTask>();
   $task: WritableSignal<ToDoTask | null> = signal(this.task()!!); */
  canDismiss = false;
  constructor(
    private modalCtrl: ModalController,
    private categoryManagement: CategoryManagement,
    private categoryList: CategoryList
  ) {
    addIcons({ save, createOutline });
  }

  ngOnInit() { }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.name.set(input?.value ?? '');
  }

  close() {
    this.canDismiss = true;
    this.open.set(false);
  }

  cancel() {
    this.categoryManagement.setCategorySelected(signal(null));
    this.name.set('');
  }

  async save() {
    if (this.categorySelected())
      await this.editCategory();
    else
      await this.addCategory();

    this.cancel();
    await this.categoryList.getCategory();
    this.close();
  }

  async editCategory() {
    await this.categoryManagement.updateCategory(this.categoryList.$categories(), { name: this.name(), id: this.categorySelected()!!.id });
  }

  async addCategory() {
    const id = this.setId();
    await this.categoryManagement.setCategory([...this.categoryList.$categories(), { name: this.name(), id }]);
  }

  setId() {
    const orderArray = this.categoryList.$categories().sort((a, b) => b.id!! - a.id!!);
    const maxId: number = orderArray?.[0]?.id ?? 0;
    return maxId + 1;
  }

}
