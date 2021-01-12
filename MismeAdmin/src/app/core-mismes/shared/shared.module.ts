import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { NgxUploaderModule } from 'ngx-uploader';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { AntModule } from '../../ant.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AvatarModule,
    AntModule
  ],
  declarations: [
    UploadImagesComponent
  ],
  exports: [
    UploadImagesComponent
  ]
})
export class SharedModule { }
