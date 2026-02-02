import { ChangeDetectionStrategy, Component, effect, OnInit, signal, Signal } from '@angular/core';
import { ToDoTask } from 'src/app/core/models/to-do-task.model';
import { TaskList } from 'src/app/core/services/task-list';
import { TaskCardComponent } from '../task-card/task-card.component';
import { IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, IonContent } from '@ionic/angular/standalone';
import { PaginateData } from 'src/app/core/services/paginate-data';
import { TaskFilter } from 'src/app/core/services/task-filter';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [TaskCardComponent, IonInfiniteScroll, IonInfiniteScrollContent, IonContent]
})
export class TaskListComponent implements OnInit {

  $data: Signal<ToDoTask[]> = this.taskList.$tasks;
  disabledPaginate = false;
  data: ToDoTask[] = [];

  constructor(
    private taskList: TaskList,
    private taskFilter: TaskFilter,
    private paginate: PaginateData
  ) {
    effect(() => {
      this.loadMore();
    });

    effect(() => {
      const filter: any = this.taskFilter.$filter();
      const filterCategory: any = this.taskFilter.$filterCategory();
      let dataCategory = [];
      if (filterCategory) {
        dataCategory = this.taskFilter.filterData(this.taskList.$tasks(), filterCategory?.id, 'categoryId');
        this.filterState(filter, dataCategory);
      } else
        this.filterState(filter, this.taskList.$tasks());

      this.loadMore();
    });
  }

  filterState(filter: string, data: any[]) {
    if (filter === 'all')
      this.$data = signal(data);
    else
      this.$data = signal(this.taskFilter.filterData(data, (filter === 'completed'), 'completed'));
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    await this.taskList.getTask();
  }

  loadMore(event?: InfiniteScrollCustomEvent) {
    let delay = true;
    if (!event) {
      this.resetData();
    }

    if (this.data.length === 0) delay = false;
    const result = (this.paginate.loadData(this.$data()) ?? []);

    if (result.length === 0) {
      event?.target.complete();
      return
    };

    if (delay) {
      setTimeout(() => {
        this.setData(result);
        event?.target.complete();
      }, 1000);
    } else
      this.setData(result);
  }

  resetData() {
    this.data = [];
    this.paginate.setPage(0);
    this.disabledPaginate = false;
  }

  setData(result: any) {
    this.data = [...this.data, ...result];
    this.disabledPaginate = this.data.length === this.$data().length;
  }
}
