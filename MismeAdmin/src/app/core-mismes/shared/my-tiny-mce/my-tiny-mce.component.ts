import { Component, OnInit, OnDestroy, AfterViewInit, EventEmitter, Output, ElementRef, Input } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'my-tiny-mce',
  templateUrl: './my-tiny-mce.component.html',
  styleUrls: ['./my-tiny-mce.component.scss']
})
export class MyTinyMceComponent implements OnDestroy, AfterViewInit {

  @Output() editorKeyup = new EventEmitter<any>();
  @Input() content: string = '';

  editor: any;

  constructor(
    private host: ElementRef,
    private locationStrategy: LocationStrategy,
  ) { }

  ngAfterViewInit() {
    tinymce.init({
      // target: this.host.nativeElement,
      // plugins: ['link', 'paste', 'table'],
      // skin_url: `${this.locationStrategy.getBaseHref()}assets/tinymce/skins/lightgray`,
      // setup: editor => {
      //   this.editor = editor;
      //   editor.on('keyup', () => {
      //     this.editorKeyup.emit(editor.getContent());
      //   });
      // },
      // height: '320',
      target: this.host.nativeElement,
      skin_url: `${this.locationStrategy.getBaseHref()}assets/tinymce/skins/lightgray`,
      resize: false,
      statusbar: false,
      height: '400',
      width: '100%',
      setup: (editor: any) => {
        editor.on('init', () => {
          editor.setContent(this.content);
        });
        editor.on('blur', () => {
          this.editorKeyup.emit(editor.getContent());
        });
        editor.on('keyup', () => {

        });
      },
      plugins: [
        'advlist autolink lists link image print preview anchor',
        'searchreplace fullscreen',
        'insertdatetime media table paste textcolor'
      ],
      toolbar: 'undo redo | fontsizeselect bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify |' +
        ' bullist numlist outdent indent | removeformat',

    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
