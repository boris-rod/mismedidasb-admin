import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UploadInput } from 'ngx-uploader';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput>;
  @Input() images: any[] = [];
  @Input() hideAddButton = false;
  @Input() hideRemoveButton = false;
  @Output() imageAdded: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() imageRemoved: EventEmitter<string> = new EventEmitter<string>();
  @Input() imagesToSend: File[] = [];

  @Input() maxImagesCount = 1;

  currentCount = 0;
  constructor() { }

  ngOnInit() {
    this.currentCount = this.images.length;
  }

  changeListener($event: any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const fileList: FileList = inputValue.files;
    let error = false;
    if (fileList.length > 0) {
      for (let index = 0; index < fileList.length; index++) {
        const reader = new FileReader();
        const file: File = fileList[index];

        if (file && this.currentCount < 4) {
          if (file.type !== 'image/png' &&
            file.type !== 'image/jpg' &&
            file.type !== 'image/jpeg') {
            error = true;

          } else if (file.size / 1024 / 1024 > 2) {
            error = true;
          } else {
            this.currentCount += 1;
            this.imagesToSend.push(file);

            reader.onloadend = e => {
              let image: any = new Image();
              image.src = e.target['result'];
              this.images.push(image);
            };
            reader.readAsDataURL(file);

          }
        } else {
          error = true;
        }
      }
      if (error === true) {
        // this.toastrService.info(
        //   `Some files was ignored. Only ${this.maxImagesCount} png,
        //   jpg or jpeg files are accepted with max size of 2M per file.`
        //   , 'Issue Images'
        // );
      }
      this.imageAdded.emit(this.imagesToSend);

    }
  }

  removeImage(img: any, i: number) {
    if (this.currentCount !== 0) {
      this.currentCount -= 1;
    }
    this.images.splice(i, 1);
    if (this.imagesToSend.length >= (i + 1)) {
      this.imagesToSend.splice(i, 1);
      this.imageAdded.emit(this.imagesToSend);
    }

    this.imageRemoved.emit(img.src);
  }
}
