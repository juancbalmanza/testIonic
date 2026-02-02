import { Component, OnInit, signal, Signal } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryList } from 'src/app/core/services/category-list';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, IonContent, IonList, IonItem, IonLabel, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, addCircleOutline } from 'ionicons/icons';
import { CategoryManagement } from 'src/app/core/services/category-management';
import { TaskFilter } from 'src/app/core/services/task-filter';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, IonContent, IonList, IonItem, IonLabel, IonMenuToggle]
})
export class CategoryListComponent implements OnInit {

  $categories: Signal<Category[]> = this.categoryList.$categories;
  constructor(
    private categoryList: CategoryList,
    private categoryManagement: CategoryManagement,
    private taskFilter: TaskFilter,
    private menuCtrl: MenuController
  ) {
    addIcons({addCircleOutline,createOutline});
  }

  ngOnInit() { }

  setEdit(event: Event, category: any) {
    event.stopPropagation();
    event.preventDefault();
    this.categoryManagement.setCategorySelected(signal(category));
  }

  setFilter(category: Category) {
    this.taskFilter.setFilterCategory(category);
    this.menuCtrl.close('main-menu');
  }
}
