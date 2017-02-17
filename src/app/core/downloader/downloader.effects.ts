import { FilesService } from '../files/files.service';
import { AppState } from '../../app.reducers';
import { Action, Store } from '@ngrx/store';
import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
import { Observable } from 'rxjs/Observable';
import { DownloaderActions } from './downloader.actions';
import { DownloaderService } from './downloader.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

const streamToPromise = require('stream-to-promise');
const R = require('ramda');
const crypto = require('crypto-browserify');
const blobUtil = require('blob-util');

const DECRYPT_ALGO = 'aes-256-cbc';

/**
 * Function to find by id.
 */
const findById = (id) => R.find(item => item._id === id);

@Injectable()
export class DownloaderEffects {

  @Effect()
  downloadItemComplete$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_COMPLETED)
    .map((action) => this.downloaderActions.decrypt(action.payload._id));

  @Effect()
  decrypt$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_DECRYPTING)
    .withLatestFrom(this.store.select(state => state.downloading))
    .switchMap(([action, downloading]) => {
      const file = findById(action.payload._id)(downloading.files);
      return this.filesService.getOne(file._id)
        .pluck('encryption_key')
        .switchMap(key => {
          const decipher = crypto.createDecipher(DECRYPT_ALGO, key);
          const stream = file.torrent_file.createReadStream();
          return Observable.fromPromise(streamToPromise(stream.pipe(decipher)));
        })
        .map(decryptedStream => this.downloaderActions.decryptSuccess(file._id, decryptedStream))
        .catch(err => Observable.of(this.downloaderActions.decryptError(file._id, err)));
    });

  @Effect({ dispatch: false })
  decryptSuccess$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_DECRYPTING_SUCCESS)
    .withLatestFrom(this.store.select(state => state.downloading))
    .flatMap(([action, downloading]) => {
      const file = findById(action.payload._id)(downloading.files);
      return Observable.fromPromise(blobUtil.arrayBufferToBlob(file.decrypted))
        .do(blob => {
          const a = document.createElement('a');

          a.target = '_blank';
          a.download = file.name;
          a.href = blobUtil.createObjectURL(blob);
          a.textContent = 'Download ' + file.name;
          a.click();
        })
        .catch(err => Observable.of(err));
    });

  @Effect()
  downloadFile$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE)
    .map(action => action.payload.file)
    .switchMap((file) => {
      return Observable
        .fromPromise(this.downloaderService.download(file));
    })
    .map((file) => this.downloaderActions.downloadFileAdded(file));

  @Effect()
  totalProgress$ = this.actions$
    .ofType(DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM)
    .sample(Observable.interval(100))
    .map(() => Math.round(this.downloaderService.client['progress'] * 100))
    .map(totalProgress =>
      this.downloaderActions.downloadFileProgressAll(totalProgress));

  @Effect({ dispatch: false })
  onItemRemoved$ = this.actions$
    .ofType(DownloaderActions.REMOVE_ITEM)
    .do((action) => {
      this.downloaderService.remove(action.payload.file);
    });

  constructor (
    private actions$: Actions,
    private downloaderService: DownloaderService,
    private filesService: FilesService,
    private downloaderActions: DownloaderActions,
    private store: Store<AppState>
  ) {

  }
}
