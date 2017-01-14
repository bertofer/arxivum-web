import { UploaderActions } from './uploader.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FilesService } from '../files/files.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploaderService {

  authToken: string;
  onSuccess: Observable<any>;

  uploader: FileUploader;

  constructor(
    private store: Store<AppState>,
    private filesService: FilesService,
    private uploaderActions: UploaderActions
  ) {

    store.select(state => state.authenticated)
      .subscribe(auth => this.authToken = auth ? auth.token : null);

    this.uploader = new FileUploader({});

    this.uploader.onAfterAddingAll = (files) => {
      this.store.dispatch(
        this.uploaderActions.uploadFilesUpdateQueue(this.uploader.queue)
      );
    };

    this.uploader.onSuccessItem = (item) => {
      this.store.dispatch(
        this.uploaderActions.uploadFilesOnSuccessItem(item)
      );
    };

    this.uploader.onProgressItem = (item) => {
      this.store.dispatch(
        this.uploaderActions.uploadFilesOnProgressItem(item)
      );
    };
  }

}
