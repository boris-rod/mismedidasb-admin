import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UsersService } from '../users.service';
import { UserPlanSummary } from '../../../core-mismes/models/plan-summary';
import { User } from 'src/app/core-mismes/models/user';
import { finalize } from 'rxjs/operators';
import { EatsService } from '../eats.service';
import { Eat } from 'src/app/core-mismes/models/eat';
import { EatDish } from '../../../core-mismes/models/eatDish';
import { EditUserPlanComponent } from '../edit-user-plan/edit-user-plan.component';
import { json } from '@rxweb/reactive-form-validators';
import { AssignEatMenuComponent } from '../assign-eat-menu/assign-eat-menu.component';

@Component({
  selector: 'app-one-day-plan',
  templateUrl: './one-day-plan.component.html',
  styleUrls: ['./one-day-plan.component.css']
})
export class OneDayPlanComponent implements OnInit {
  isLoading: false;
  selectedIndex = 0;

  userId = 0;
  entry: UserPlanSummary;
  user: User;

  plan: Eat[];
  breakfast: Eat;
  snack1: Eat;
  snack2: Eat;
  lunch: Eat;
  dinner: Eat;

  constructor(private modal: NzModalRef,
    private messageService: NzMessageService,
    private eatService: EatsService,
    private usersService: UsersService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }
  getUserInfo(): void {
    this.usersService.getUserForDetailsViewNoAdmin(this.userId)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.user = resp.result;
      }, error => { });

    this.eatService.getUserPlanByDate(this.userId, this.entry.planDateTime.toString(),
      1, 100000).
      pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.plan = resp.result;
        console.log(this.plan);
        this.breakfast = this.plan.filter(f => f.eatTypeId === 0)[0];
        this.snack1 = this.plan.filter(f => f.eatTypeId === 1)[0];
        this.snack2 = this.plan.filter(f => f.eatTypeId === 3)[0];
        this.lunch = this.plan.filter(f => f.eatTypeId === 2)[0];
        this.dinner = this.plan.filter(f => f.eatTypeId === 4)[0];
      }, error => { });

  }

  close(): void {
    this.modal.destroy();
  }

  save(): void { }

  deleteFrom(eatType: number, item: EatDish): void {
    let ind = -1;
    switch (eatType) {
      case 0:
        ind = this.breakfast.eatDishResponse.findIndex(i => i.dish.id === item.dish.id && i.qty === item.qty);
        if (ind > -1) {
          this.breakfast.eatDishResponse.splice(ind, 1);
        }
        break;
      case 1:
        ind = this.snack1.eatDishResponse.findIndex(i => i.dish.id === item.dish.id && i.qty === item.qty);
        if (ind > -1) {
          this.snack1.eatDishResponse.splice(ind, 1);
        }
        break;
      case 2:
        ind = this.lunch.eatDishResponse.findIndex(i => i.dish.id === item.dish.id && i.qty === item.qty);
        if (ind > -1) {
          this.lunch.eatDishResponse.splice(ind, 1);
        }
        break;
      case 3:
        ind = this.snack2.eatDishResponse.findIndex(i => i.dish.id === item.dish.id && i.qty === item.qty);
        if (ind > -1) {
          this.snack2.eatDishResponse.splice(ind, 1);
        }
        break;

      default:
        ind = this.dinner.eatDishResponse.findIndex(i => i.dish.id === item.dish.id && i.qty === item.qty);
        if (ind > -1) {
          this.dinner.eatDishResponse.splice(ind, 1);
        }
        break;
    }
  }

  addNewDish(): void {
    const modal = this.modalService.create({
      nzTitle: 'Adicionar Alimento',
      nzContent: EditUserPlanComponent,
      nzFooter: null,
      nzComponentParams: { add: true },
      nzBodyStyle: { height: '250px', 'overflow-y': 'auto' }
    });

    modal.afterClose.subscribe(
      resp => {
        if (resp !== null) {
          switch (this.selectedIndex) {
            case 0:
              this.breakfast.eatDishResponse = [...this.breakfast.eatDishResponse, resp];
              const planInd = this.plan.findIndex(p => p.eatTypeId === 0);
              if (planInd > -1) {
                this.plan[planInd] = this.breakfast;
                this.recalculateEverything();
              }

              break;

            default:
              break;
          }
        }
      }
    );
  }

  editEatPlan(item: EatDish, eat: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Editar Alimento',
      nzContent: EditUserPlanComponent,
      nzFooter: null,
      nzComponentParams: { eatDish: item },
      nzBodyStyle: { height: '250px', 'overflow-y': 'auto' }
    });

    modal.afterClose.subscribe(
      resp => {
        if (resp !== null) {
          switch (eat) {
            case 0:
              const ind = this.breakfast.eatDishResponse.findIndex(e => e.dish.id === item.dish.id);
              if (ind > -1) {
                this.breakfast.eatDishResponse.splice(ind, 1);
                this.breakfast.eatDishResponse.push(resp);
                const planInd = this.plan.findIndex(p => p.eatTypeId === 0);
                if (planInd > -1) {
                  this.plan[planInd] = this.breakfast;
                  this.recalculateEverything();
                }
              }
              break;

            default:
              break;
          }
        }
      }
    );
  }

  recalculateEverything(): void {
    this.eatService.getPlanIsBalanced(this.userId, this.plan).subscribe(resp => {
      console.log(resp);
    });
  }

  assignEatMenu(): void {
    const modal = this.modalService.create({
      nzTitle: 'Asignar Menú',
      nzContent: AssignEatMenuComponent,
      nzFooter: null,
      // nzBodyStyle: { height: '250px', 'overflow-y': 'auto' }
    });
  }

}
