import { Component, effect, model, OnInit, signal } from '@angular/core';
import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonRow, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline, createOutline, save } from 'ionicons/icons';
import { CategoryList } from 'src/app/core/services/category-list';
import { CategoryManagement } from 'src/app/core/services/category-management';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  standalone: true,
  imports: [IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonInput, IonContent, IonItem, IonGrid, IonRow, IonCol, IonIcon, IonFooter]
})
export class CategoryManagementComponent implements OnInit {
  categorySelected = this.categoryManagement.$categorySelected;
  name = model('');
  open = model.required<boolean>();
  canDismiss = false;
  constructor(
    private modalCtrl: ModalController,
    private categoryManagement: CategoryManagement,
    private categoryList: CategoryList
  ) {
    addIcons({ save, createOutline, closeCircleOutline });
    effect(() => {
      const category = this.categorySelected();
      if (category) this.name.set(category.name);
    });
  }

  ngOnInit() { }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.name.set(input?.value ?? '');
  }

  close() {
    this.cancel();
    this.canDismiss = true;
    this.open.set(false);
  }

  cancel() {
    const selected = this.categorySelected();
    this.categoryManagement.setCategorySelected(signal(null));
    this.name.set('');
    if (selected !== null && selected?.['id'] !== undefined) {
      this.canDismiss = true;
      this.open.set(false);
    }
  }

  async save() {
    const category = this.categorySelected();
    if (category && category.id !== undefined)
      await this.editCategory();
    else
      await this.addCategory();

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

  async deleteCategory() {
    await this.categoryManagement.deleteCategory(this.categoryList.$categories(), { name: this.name(), id: this.categorySelected()!!.id });
    await this.categoryList.getCategory();
    this.close();
  }

  setId() {
    const orderArray = this.categoryList.$categories().sort((a, b) => b.id!! - a.id!!);
    const maxId: number = orderArray?.[0]?.id ?? 0;
    return maxId + 1;
  }

}
