import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Menu } from 'src/app/core-mismes/models/menu';
import { MenusService } from '../../menus/menus.service';

@Component({
  selector: 'app-assign-eat-menu',
  templateUrl: './assign-eat-menu.component.html',
  styleUrls: ['./assign-eat-menu.component.css']
})
export class AssignEatMenuComponent implements OnInit {
  groupId = 0;

  isLoading = false;

  selectedMenu: Menu;
  groupMenus: Menu[] = [];
  generalMenus: Menu[] = [];
  constructor(private modal: NzModalRef,
    private menuService: MenusService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenusGroup(1, 10000, '', '', this.groupId, true).subscribe(resp => {
      this.groupMenus = resp.body.result;
    });

    this.menuService.getGeneralMenus(1, 10000, '', '').subscribe(resp => {
      const temp: Menu[] = resp.body.result;
      temp.forEach(m => {
        if (m.groupId !== this.groupId) {
          this.generalMenus.push(m);
        }
      });

    });
  }

  close(refresh: Menu | null): void {
    this.modal.close(refresh);
  }

  save(): void {
    this.close(this.selectedMenu);
  }

}
