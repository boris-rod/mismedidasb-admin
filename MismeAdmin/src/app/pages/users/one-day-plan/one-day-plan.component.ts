import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
import { CredentialsService } from '../../../core-mismes/authentication/credentials.service';
import { Menu } from '../../../core-mismes/models/menu';

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
    private credService: CredentialsService,
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
        if (resp !== null && resp !== undefined) {
          switch (this.selectedIndex) {
            case 0:
              this.breakfast.eatDishResponse = [...this.breakfast.eatDishResponse, resp];
              const planInd = this.plan.findIndex(p => p.eatTypeId === 0);
              if (planInd > -1) {
                this.plan[planInd] = this.breakfast;
                this.recalculateEverything();
              }
              break;
            case 1:
              this.snack1.eatDishResponse = [...this.snack1.eatDishResponse, resp];
              const planSnack1 = this.plan.findIndex(p => p.eatTypeId === 1);
              if (planSnack1 > -1) {
                this.plan[planSnack1] = this.snack1;
                this.recalculateEverything();
              }
              break;
            case 2:
              this.lunch.eatDishResponse = [...this.lunch.eatDishResponse, resp];
              const planLunch = this.plan.findIndex(p => p.eatTypeId === 2);
              if (planLunch > -1) {
                this.plan[planLunch] = this.lunch;
                this.recalculateEverything();
              }
              break;
            case 3:
              this.snack2.eatDishResponse = [...this.snack2.eatDishResponse, resp];
              const planSnack2 = this.plan.findIndex(p => p.eatTypeId === 3);
              if (planSnack2 > -1) {
                this.plan[planSnack2] = this.snack2;
                this.recalculateEverything();
              }
              break;

            default:
              this.dinner.eatDishResponse = [...this.dinner.eatDishResponse, resp];
              const planDinner = this.plan.findIndex(p => p.eatTypeId === 4);
              if (planDinner > -1) {
                this.plan[planDinner] = this.dinner;
                this.recalculateEverything();
              }
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
        if (resp !== null && resp !== undefined) {
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
            case 1:
              const indSnack1 = this.snack1.eatDishResponse.findIndex(e => e.dish.id === item.dish.id);
              if (indSnack1 > -1) {
                this.snack1.eatDishResponse.splice(indSnack1, 1);
                this.snack1.eatDishResponse.push(resp);
                const planInd = this.plan.findIndex(p => p.eatTypeId === 1);
                if (planInd > -1) {
                  this.plan[planInd] = this.snack1;
                  this.recalculateEverything();
                }
              }
              break;
            case 2:
              const indLunch = this.lunch.eatDishResponse.findIndex(e => e.dish.id === item.dish.id);
              if (indLunch > -1) {
                this.lunch.eatDishResponse.splice(indLunch, 1);
                this.lunch.eatDishResponse.push(resp);
                const planInd = this.plan.findIndex(p => p.eatTypeId === 2);
                if (planInd > -1) {
                  this.plan[planInd] = this.lunch;
                  this.recalculateEverything();
                }
              }
              break;
            case 3:
              const indSnack2 = this.snack2.eatDishResponse.findIndex(e => e.dish.id === item.dish.id);
              if (indSnack2 > -1) {
                this.snack2.eatDishResponse.splice(indSnack2, 1);
                this.snack2.eatDishResponse.push(resp);
                const planInd = this.plan.findIndex(p => p.eatTypeId === 3);
                if (planInd > -1) {
                  this.plan[planInd] = this.snack2;
                  this.recalculateEverything();
                }
              }
              break;

            default:
              const indDinner = this.dinner.eatDishResponse.findIndex(e => e.dish.id === item.dish.id);
              if (indDinner > -1) {
                this.dinner.eatDishResponse.splice(indDinner, 1);
                this.dinner.eatDishResponse.push(resp);
                const planInd = this.plan.findIndex(p => p.eatTypeId === 4);
                if (planInd > -1) {
                  this.plan[planInd] = this.dinner;
                  this.recalculateEverything();
                }
              }
              break;
          }
        }
      }
    );
  }

  recalculateEverything(): void {
    this.eatService.getPlanIsBalanced(this.userId, this.plan).subscribe(resp => {
      this.entry.eatBalancedSummary = resp.result;
    });
  }

  assignEatMenu(): void {
    const modal = this.modalService.create({
      nzTitle: 'Asignar Menú',
      nzContent: AssignEatMenuComponent,
      nzFooter: null,
      nzComponentParams: { groupId: this.credService.credentials.account.group.id },
      // nzBodyStyle: { height: '250px', 'overflow-y': 'auto' }
    });

    modal.afterClose.subscribe(resp => {
      if (resp !== null && resp !== undefined) {
        resp.eats.forEach(m => {
          switch (m.eatTypeId) {
            case 0:
              this.breakfast.eatDishResponse = m.eatDishResponse;
              this.recalculateEverything();
              break;
            case 1:
              this.snack1.eatDishResponse = m.eatDishResponse;
              this.recalculateEverything();
              break;
            case 2:
              this.lunch.eatDishResponse = m.eatDishResponse;
              this.recalculateEverything();
              break;
            case 3:
              this.snack2.eatDishResponse = m.eatDishResponse;
              this.recalculateEverything();
              break;

            default:
              this.dinner.eatDishResponse = m.eatDishResponse;
              this.recalculateEverything();
              break;
          }
        });
      }
    });
  }

}
