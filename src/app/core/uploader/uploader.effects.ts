import * as FoldersActions from '../folders/folders.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { FilesService } from '../files/files.service';
import * as UploaderActions from './uploader.actions';
import { Actions, Effect } from '@ngrx/effects';
import { UploaderService } from './uploader.service';
import { Injectable } from '@angular/core';

import * as querystring from 'querystring';

@Injectable()
export class UploaderEffects {

  authenticated$ = this.store.select(state => state.authenticated);
  currentFolder$ = this.store.select(state => state.currentFolder);

  @Effect({ dispatch: false})
  uploadFiles$ = this.actions$
    .ofType(UploaderActions.UPLOAD_FILES)
    .withLatestFrom(this.currentFolder$, (action, current) => {
      const query = current ? {folder : current._id} : null;
      return query;
    })
    .withLatestFrom(this.authenticated$, (query, auth) => ({query, auth}))
    .do(({query, auth}) => {
      this.uploaderService.uploader.setOptions({
        url: this.filesApi.filesUrl + (query && query.folder ? `?${querystring.stringify(query)}` : ''),
        authToken: auth ? `Bearer ${auth.token}` : null
      });

      this.uploaderService.uploader.uploadAll();
    });

  @Effect()
  addToQueue$ = this.actions$
    .ofType(UploaderActions.UPDATE_QUEUE)
    .map(() => new UploaderActions.UploadFiles())

  @Effect({ dispatch: false })
  clearQueue$ = this.actions$
    .ofType(UploaderActions.CLEAR_QUEUE)
    .do(_ => this.uploaderService.clearQueue());

  constructor(
    private uploaderService: UploaderService,
    private actions$: Actions,
    private filesApi: FilesService,
    private store: Store<AppState>
  ) {}
}
