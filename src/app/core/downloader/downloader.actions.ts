import { Action } from '@ngrx/store';
// import { IDownloadingFile } from '../downloader/downloader.reducer';
// import { IFile } from '../files/files.interfaces';
// import { Injectable } from '@angular/core';
// import { Type } from '../../utils/ngrx-actions/types';


// @Injectable()
// export class DownloaderActions {
//   static DOWNLOAD_FILE = '[Downloader] Download file';
//   static DOWNLOAD_FILE_ADDED = '[Downloader] Downloader file added';
//   static DOWNLOAD_FILE_PROGRESS_ITEM = '[Downloader] Download file progress';
//   static DOWNLOAD_FILE_COMPLETED = '[Downloader] Download file completed';
//   static DOWNLOAD_FILE_PROGRESS_ALL = '[Downloader] Download file progress all';

//   static DOWNLOAD_FILE_DECRYPTING = '[Downloader] Download file decrypting';
//   static DOWNLOAD_FILE_DECRYPTING_SUCCESS = '[Downloader] Download file decrypting success';
//   static DOWNLOAD_FILE_DECRYPTING_ERROR = '[Downloader] Download file decrypting error';

//   static REMOVE_FILE = '[Downloader] Remove file';

//   static SAVE_FILE = '[Downloader] Save file'; // Save file in local file system

//   downloadFile (file: IFile) {
//     return {
//       type: DownloaderActions.DOWNLOAD_FILE,
//       payload: { file }
//     };
//   }

//   downloadFileAdded (file: IDownloadingFile) {
//     return {
//       type: DownloaderActions.DOWNLOAD_FILE_ADDED,
//       payload: { file }
//     };
//   }

//   downloadFileProgressItem (_id, progress, download_speed) {
//     return {
//       type: DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM,
//       payload: {
//         _id,
//         progress,
//         download_speed
//       }
//     };
//   }

//   // decrypt (_id) {
//   //   return {
//   //     type: DownloaderActions.DOWNLOAD_FILE_DECRYPTING,
//   //     payload: { _id }
//   //   };
//   // }

//   // decryptSuccess (_id, stream) {
//   //   return {
//   //     type: DownloaderActions.DOWNLOAD_FILE_DECRYPTING_SUCCESS,
//   //     payload: { _id, stream }
//   //   };
//   // }

//   // decryptError (_id, error) {
//   //   return {
//   //     type: DownloaderActions.DOWNLOAD_FILE_DECRYPTING_ERROR,
//   //     payload: { _id, error }
//   //   };
//   // }

//   downloadFileCompleted (_id) {
//     return {
//       type: DownloaderActions.DOWNLOAD_FILE_COMPLETED,
//       payload: { _id }
//     };
//   }

//   downloadFileProgressAll (progress) {
//     return {
//       type: DownloaderActions.DOWNLOAD_FILE_PROGRESS_ALL,
//       payload: { progress }
//     };
//   }

//   removeFile (file) {
//     return {
//       type: DownloaderActions.REMOVE_FILE,
//       payload: { file }
//     };
//   }

//   saveFile (_id) {
//     return {
//       type: DownloaderActions.SAVE_FILE,
//       payload: { _id }
//     };
//   }
// }

export const ADD_DOWNLOADING_FILE = '[Downloader] Add download file';
export class AddDownloadFile implements Action {
  readonly type = ADD_DOWNLOADING_FILE;
  constructor (public file) {}
}

export const FILE_PROGRESS = '[Downloader] File progress'; // id, progress, downloadspeed
export class FileProgress implements Action {
  readonly type = FILE_PROGRESS;
  constructor (public id, public progress, public downloadSpeed?) {};
}

export const TOTAL_PROGRESS = '[Downloader] Total progress'; // progress, speed?
export class TotalProgress implements Action {
  readonly type = TOTAL_PROGRESS;
  constructor(public progress) {}
}

export const FILE_COMPLETE = '[Downloader] File complete'; // id
export class FileComplete implements Action {
  readonly type = FILE_COMPLETE;
  constructor (public id) {}
}

export const REMOVE_FILE = '[Downloader] Remove file'; // file
export class RemoveFile implements Action {
  readonly type = REMOVE_FILE;
  constructor (public file) {};
}
