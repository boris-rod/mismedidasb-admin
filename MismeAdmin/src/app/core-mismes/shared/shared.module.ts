import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from 'ngx-avatar';
import { NbIconModule } from '@nebular/theme';
import { MyTinyMceComponent } from './my-tiny-mce/my-tiny-mce.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUploaderModule,
        FlexLayoutModule,
        AvatarModule,
        NbIconModule
    ],
    declarations: [
        UploadImagesComponent,
        MyTinyMceComponent
    ],
    exports: [
        UploadImagesComponent,
        MyTinyMceComponent
    ]
})
export class SharedModule { }
