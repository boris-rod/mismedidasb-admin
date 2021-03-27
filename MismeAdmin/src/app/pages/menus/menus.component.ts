import { Component, OnInit } from '@angular/core';
import { MenuService } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs/operators';
import { Menu } from 'src/app/core-mismes/models/menu';
import { MenusService } from './menus.service';
import { Logger } from '../../core-mismes/logger.service';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
const log = new Logger('Menus');

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  isLoading = false;
  results: Menu[] = [];
  total = 0;
  perPage = 10;
  page = 1;
  sort = '';
  searchTerm = '';
  // isActive = -1;
  showReset = false;

  constructor(private menuService: MenusService,
    private messageService: NzMessageService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  loadMenus(): void {
    this.isLoading = true;
    // let act = null;
    // if (this.isActive === 0) {
    //   act = false;
    // } else if (this.isActive === 1) {
    //   act = true;
    // }

    this.menuService.getMenusAdmin(this.page, this.perPage, this.sort, this.searchTerm)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        const pData = resp.headers.get('PagingData');
        this.total = JSON.parse(pData).totalItems;
        this.results = resp.body.result;
      }, error => {
        log.error(error);
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.perPage = params.pageSize;
    this.page = params.pageIndex;
    if (sortField !== null) {
      if (sortOrder === 'ascend') {
        this.sort = sortField + '_asc';
      }
      else {
        this.sort = sortField + '_desc';
      }
    }
    this.loadMenus();
  }

  newMenu(): void {
    const modal = this.modalService.create({
      nzTitle: 'Nuevo Menú',
      nzContent: EditMenuComponent,
      nzFooter: null,
      nzWidth: 900,
      // nzBodyStyle: { 'max-height': '450px', 'overflow-y': 'auto' },
      // nzComponentParams: {
      //   dishToEdit: dish
      // }
    });
    modal.afterClose.subscribe(
      resp => {
        if (resp === true) {
          this.loadMenus();
        }
      }
    );
  }

  activate(g: Menu): void {
    this.isLoading = true;
    this.menuService.activateMenu(g.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Menú activado satisfactoriamente.');
        this.loadMenus();
      });
  }

  deactivate(g: Menu): void {
    this.isLoading = true;
    this.menuService.deactivateMenu(g.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(d => {
        this.messageService.create('success', 'Menú desactivado satisfactoriamente.');
        this.loadMenus();
      });
  }
}
