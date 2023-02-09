import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private aletifyService: AlertifyService,
    private toastrService: CustomToastrService
  ) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.httpClientService
      .post(
        {
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        },
        fileData
      )
      .subscribe(
        (data) => {
          if (this.options.isAdminPage) {
            this.aletifyService.message("Files uploaded succesfully.", {
              dismissOthers: true,
              messageType: AlertifyMessageType.Success,
              position: AlertifyPosition.TopRight
            })
          } else {
            this.aletifyService.message("There was a problem uploading the files.", {
              dismissOthers: true,
              messageType: AlertifyMessageType.Error,
              position: AlertifyPosition.TopRight
            })

          }
        },
        (errorResponse: HttpErrorResponse) => {
          if (this.options.isAdminPage) {
            this.toastrService.message("Files uploaded successfully", "Success", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,
            })
          } else {

          }
        }
      );
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
