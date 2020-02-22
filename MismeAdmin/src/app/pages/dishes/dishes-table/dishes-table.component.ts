import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../../core-mismes/models/dish';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { Logger } from '../../../core-mismes';
import { DeleteDishComponent } from '../delete-dish/delete-dish.component';
import { TagService } from '../tags.service';
import { Tag } from '../../../core-mismes/models/tag';
const log = new Logger('Dishes Table');
@Component({
  selector: 'dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrls: ['./dishes-table.component.scss']
})
export class DishesTableComponent implements OnInit {

  @Input() dishes: Dish[];
  @Input() isLoading: boolean;
  @Input() perPage: number;
  @Input() showReset: boolean;

  @Output() reseted = new EventEmitter<boolean>()
  @Output() filtered = new EventEmitter<number[]>()
  tags: Tag[] = [];

  currentFilerSelection: number[] = [];


  ColumnMode;

  constructor(private windowService: NbWindowService, private dialogService: NbDialogService, private tagsService: TagService) {
    this.ColumnMode = ColumnMode.force
  }

  ngOnInit() {
    this.loadTags();
  }
  loadTags() {
    this.tagsService.getTags().subscribe(t => {
      this.tags = [...t.body['result']];
    });
  }

  reset() {
    this.currentFilerSelection = [];
    this.filtered.emit(this.currentFilerSelection);
    this.showReset = false;
    this.reseted.emit(true);
  }

  newDish() {
    const wind = this.windowService.open(AddDishComponent, {
      title: 'Nuevo Plato',
      context: {

      }
    });

    wind.onClose.subscribe(s => {
      this.loadTags();
      this.reseted.emit(true);
    });
  }
  editDish(dish: Dish) {
    const wind = this.windowService.open(AddDishComponent, {
      title: 'Editar Plato',
      context: {
        edit: true,
        dishToEdit: dish
      }
    });

    wind.onClose.subscribe(s => {
      this.loadTags();
      this.reseted.emit(true);
    });
  }

  deleteDish(dish: any) {
    this.dialogService.open(DeleteDishComponent, {
      context: {
        title: 'Eliminar Plato',
        dishId: dish.id
      }
    }).onClose.subscribe(s => {
      this.reseted.emit(true);
    });
  }

  selectionChange(selection: number[]) {
    if (selection.length > 0) {
      this.showReset = true;
    }
    this.filtered.emit(selection);
  }

}
