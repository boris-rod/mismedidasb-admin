import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUploaderModule,
        FlexLayoutModule
    ],
    declarations: [
        UploadImagesComponent
    ],
    exports: [
        UploadImagesComponent
    ]
})
export class SharedModule { }
