import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Group } from 'src/app/core-mismes/models/group';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  isLoading = false;

  groupName = new FormControl();
  groupDescription = new FormControl();
  adminEmail = new FormControl();

  groupToEdit: Group;

  constructor(private groupService: GroupsService,
    private messageService: NzMessageService,
    private modal: NzModalRef) {

    this.groupName.setValidators(Validators.required);
    this.adminEmail.setValidators([Validators.required, Validators.email]);
  }

  ngOnInit(): void {
    if (this.groupToEdit) {
      this.groupName.setValue(this.groupToEdit.name);
      this.groupDescription.setValue(this.groupToEdit.description);
      this.adminEmail.setValue(this.groupToEdit.adminEmail);
    }
    else {
      this.groupName.setValue('');
      this.groupDescription.setValue('');
      this.adminEmail.setValue('');
    }
  }

  close(refresh = false): void {
    this.modal.destroy(refresh);
  }

  saveGroup(): void {
    this.isLoading = true;
    const obj = {
      name: this.groupName.value,
      description: this.groupDescription.value,
      adminEmail: this.adminEmail.value,
    };

    this.groupService.addGroup(obj)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(resp => {
        this.messageService.success('El grupo se ha creado satisfactoriamente.');
        this.close(true);
      }, error => {
        this.messageService.error(error.error.message);
      });
  }
}
