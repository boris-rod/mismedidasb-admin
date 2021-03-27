import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Menu } from 'src/app/core-mismes/models/menu';
import { MenusService } from '../menus.service';
import { SelectDishComponent } from '../select-dish/select-dish.component';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  menuToEdit: Menu;
  groupId = null;
  isLoading = false;
  menuName = new FormControl();

  breakfast = [];
  snack1 = [];
  lunch = [];
  snack2 = [];
  dinner = [];

  constructor(private menusService: MenusService,
    private messageService: NzMessageService,
    private modal: NzModalRef,
    private modalService: NzModalService) {
    this.menuName.setValidators(Validators.required);
  }

  ngOnInit(): void {
  }

  close(refresh = false): void {
    this.modal.destroy(refresh);
  }

  saveMenu(): void {
    this.isLoading = true;

    const objBase = {
      name: this.menuName.value,
      nameEN: '',
      nameIT: '',
      description: '',
      descriptionEN: '',
      descriptionIT: '',
      groupId: this.groupId
    };
    const breakIds = [];
    this.breakfast.forEach(b => breakIds.push({ qty: b.qty, dishId: b.dish.id }));
    const snack1Ids = [];
    this.snack1.forEach(b => snack1Ids.push({ qty: b.qty, dishId: b.dish.id }));
    const snack2Ids = [];
    this.snack2.forEach(b => snack2Ids.push({ qty: b.qty, dishId: b.dish.id }));
    const lunchIds = [];
    this.lunch.forEach(b => lunchIds.push({ qty: b.qty, dishId: b.dish.id }));
    const dinnerIds = [];
    this.dinner.forEach(b =>
      dinnerIds.push({ qty: b.qty, dishId: b.dish.id })
    );

    const breakObj = { eatType: 0, dishes: breakIds, compoundDishes: [] };
    const snack1Obj = { eatType: 1, dishes: snack1Ids, compoundDishes: [] };
    const lunchObj = { eatType: 2, dishes: lunchIds, compoundDishes: [] };
    const snack2Obj = { eatType: 3, dishes: snack2Ids, compoundDishes: [] };
    const dinnerObj = { eatType: 4, dishes: dinnerIds, compoundDishes: [] };

    const objExtra = { eats: [breakObj, snack1Obj, lunchObj, snack2Obj, dinnerObj] };

    console.log(objExtra);

    this.menusService.addMenuBasic(objBase)
      .subscribe(resp => {
        const id = resp.body.result.id;
        this.menusService.addMenuWithDishes(objExtra, id).subscribe(resp1 => {
          this.messageService.success('El menú se ha creado satisfactoriamente.');
          this.close(true);
        });
      }, error => {
        this.messageService.error(error.error.message);
      });

  }

  addDishEat(ev: any, eatType: number): void {
    ev.stopPropagation();
    const modal = this.modalService.create({
      nzTitle: 'Seleccione el Plato',
      nzContent: SelectDishComponent,
      nzFooter: null,
      // nzWidth: 900,
      // nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      // nzComponentParams: {
      //   dishToEdit: dish
      // }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp !== null) {
          switch (eatType) {
            case 0:
              this.breakfast.push(resp);
              break;
            case 1:
              this.snack1.push(resp);
              break;
            case 2:
              this.lunch.push(resp);
              break;
            case 3:
              this.snack2.push(resp);
              break;
            default:
              this.dinner.push(resp);
              break;
          }
        }
      }
    );

  }

  removeEat(ev: any, item: any, eatType: number): void {
    switch (eatType) {
      case 0:
        const ind = this.breakfast.findIndex(b => b.name === item.name && b.qty === item.qty);
        if (ind !== -1) {
          this.breakfast.splice(ind, 1);
        }
        break;
      case 1:
        const ind1 = this.snack1.findIndex(b => b.name === item.name && b.qty === item.qty);
        if (ind1 !== -1) {
          this.snack1.splice(ind, 1);
        }
        break;
      case 2:
        const ind2 = this.lunch.findIndex(b => b.name === item.name && b.qty === item.qty);
        if (ind2 !== -1) {
          this.lunch.splice(ind, 1);
        }
        break;
      case 3:
        const ind3 = this.snack2.findIndex(b => b.name === item.name && b.qty === item.qty);
        if (ind3 !== -1) {
          this.snack2.splice(ind, 1);
        }
        break;
      default:
        const ind4 = this.dinner.findIndex(b => b.name === item.name && b.qty === item.qty);
        if (ind4 !== -1) {
          this.dinner.splice(ind, 1);
        }
        break;
    }
  }

}
