import { Component, OnInit } from '@angular/core';
import { Logger } from '../../../core-mismes/logger.service';
import { ThemeService } from '../../theme.service';
import { FormControl, Validators } from '@angular/forms';
import { NbToastrService, NbDialogRef } from '@nebular/theme';

const log = new Logger('Profile')
@Component({
  selector: 'update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  title: string = '';
  isLoading = false;
  name = new FormControl();


  images: any[] = [];
  removedImages: any[] = [];
  imagesToSend: File[] = [];

  image = '';


  constructor(private themeService: ThemeService, private toastrService: NbToastrService, protected ref: NbDialogRef<UpdateProfileComponent>) {
    this.name.setValidators(Validators.required);
    this.name.setValue('');
  }

  ngOnInit() {
    this.themeService.getProfile().subscribe(p => {
      this.name.setValue(p.body['result'].fullName);
      // if (p.body['result'].avatar !== null && p.body['result'].avatar !== '') {
      //   const img = {
      //     src: p.body['result'].avatar,
      //   };
      //   this.images.push(img);
      // } 
    });

  }

  updateProfile() { }
  close() {
    this.ref.close();
  }

  onImageAdded(images: File[]) {
    this.imagesToSend = images;
  }
  onImageRemoved(src: string) {
    this.removedImages.push(src);
  }
}
