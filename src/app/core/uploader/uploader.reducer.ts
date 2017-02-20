import { UploaderActions } from './uploader.actions';

export interface IUploadingFile {
  file: {
    name: string;
    size: number;
    type: string;
  };
}

export interface UploaderState {
  files: IUploadingFile[];
  progress: number;
};

const initialState: UploaderState = {
  files: [],
  progress: 0
};

export function uploaderReducer (state = initialState, action) {
  let files = state ? state.files : [];
  switch (action.type) {
    case UploaderActions.UPLOAD_FILES:
      return state;

    case UploaderActions.UPLOAD_FILES_UPDATE_QUEUE:
      files = action.payload.queue.map(item => {
        // return {
        //   file: item.file
        // };
        return item.file;
      });

      return {
        files,
        progress: state.progress
      };

    case UploaderActions.UPLOAD_FILES_ON_PROGRESS_ALL:
      return {
        files,
        progress: action.payload.progress
      };

    case UploaderActions.UPLOAD_FILES_ON_SUCCESS_ITEM:
      return state;

    case UploaderActions.UPLOAD_FILES_CLEAR_QUEUE:
      return {
        files: [],
        progress: 0
      };

  }
  return state;
}
