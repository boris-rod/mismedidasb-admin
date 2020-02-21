import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { DishesService } from '../dishes.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'delete-dish',
  templateUrl: './delete-dish.component.html',
  styleUrls: ['./delete-dish.component.scss']
})
export class DeleteDishComponent implements OnInit {
  @Input() title: string;
  @Input() dishId: number;
  isLoading: boolean = false;
  constructor(protected ref: NbDialogRef<DeleteDishComponent>, private dishService: DishesService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
  }
  dismiss() {
    this.ref.close();
  }
  delete() {
    this.isLoading = true;
    this.dishService.deleteDish(this.dishId)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.toastrService.success('Plato eliminado satisfactoriamente.', 'Eliminar Plato');
        this.ref.close();
      });
  }
}
