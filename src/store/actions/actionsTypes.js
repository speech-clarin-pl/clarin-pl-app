
// home page actions
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_FAILED = 'LOG_IN_FAILED';
export const SET_AUTO_LOGOUT = 'SET_AUTO_LOGOUT';
export const REGISTER = 'REGISTER';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const SET_CURRENT_PROJECT_ID = 'SET_CURRENT_PROJECT_ID';

// project list actions
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const GET_PROJECTS_LIST = 'GET_PROJECTS_LIST';
export const GET_PROJECTS_LIST_FAILED = 'GET_PROJECTS_LIST_FAILED';
export const CHOSE_PROJECT = 'CHOSE_PROJECT';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_FAILED = 'ADD_PROJECT_FAILED';
export const ADD_PROJECT_INIT = 'ADD_PROJECT_INIT';
export const ADD_PROJECT_DONE = 'ADD_PROJECT_DONE';

export const DUPLICATE_PROJECT = 'DUPLICATE_PROJECT';
export const SHARE_PROJECT = 'SHARE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const EDIT_NAME = 'EDIT_NAME';
export const EDIT_NAME_FAILED = 'EDIT_NAME_FAILED';

//project page
export const INIT_PROJECT = 'INIT_PROJECT';
export const OPEN_MODAL_PROJECT = 'OPEN_MODAL_PROJECT';
export const CLOSE_MODAL_PROJECT = 'CLOSE_MODAL_PROJECT';
export const CLEAR_RECO_STORE = 'CLEAR_RECO_STORE';
export const CLEAR_SEGMENT_STORE = 'CLEAR_SEGMENT_STORE';
export const CLEAR_PREVIEW_STORE = 'CLEAR_PREVIEW_STORE';

// recognition tab
export const INIT_BATCH_RECOGNITION = 'INIT_BATCH_RECOGNITION';
export const INIT_FILE_RECOGNITION = 'INIT_BATCH_RECOGNITION';
export const DROP_FILES = 'DROP_FILES';
export const UPDATE_FILE_STATE = 'UPDATE_FILE_STATE';
export const OPEN_AUDIO_RECOGNITION_PREVIEW = 'OPEN_AUDIO_RECOGNITION_PREVIEW';
export const REMOVE_RECOGNITION_ITEM = 'REMOVE_RECOGNITION_ITEM';
export const REFUSE_RECO_FILES = 'REFUSE_RECO_FILES';

// segmentation tab
//export const INIT_BATCH_SEGMENTATION = 'INIT_BATCH_SEGMENTATION';
export const INIT_FILE_SEGMENTATION = 'INIT_FILE_SEGMENTATION';
export const DROP_AUDIO_FILES = 'DROP_AUDIO_FILES';
export const DROP_TXT_FILES = 'DROP_TXT_FILES';
export const CHANGE_AUDIO_LIST_ORDER = 'CHANGE_AUDIO_LIST_ORDER';
export const CHANGE_TXT_LIST_ORDER = 'CHANGE_TXT_LIST_ORDER';
export const REMOVE_SEGMENT_ENTRY = 'REMOVE_SEGMENT_ENTRY';
export const FILE_SEGMENTATION_SUCCESS = 'FILE_SEGMENTATION_SUCCESS';
export const FILE_SEGMENTATION_FAILED = 'FILE_SEGMENTATION_FAILED';
export const REFUSE_SEGMENT_AUDIO_FILES = 'REFUSE_SEGMENT_AUDIO_FILES';
export const REFUSE_SEGMENT_TXT_FILES = 'REFUSE_SEGMENT_TXT_FILES';




// repo
export const REPO_SELECT_CONTAINER = 'REPO_SELECT_CONTAINER';
export const REPO_SELECT_SESSION = 'REPO_SELECT_SESSION';


// pod spodem to kopie
export const REPO_UPLOAD_FILES_MODAL_OPEN = 'REPO_UPLOAD_FILES_MODAL_OPEN';
export const REPO_UPLOAD_FILES_PROGRESS = 'REPO_UPLOAD_FILES_PROGRESS';
export const REPO_UPLOAD_FILES_FINISH = 'REPO_UPLOAD_FILES_FINISH';
export const REPO_UPLOAD_FILES_INIT = 'REPO_UPLOAD_FILES_INIT';
export const REPO_UPLOAD_FILES_SUCCESS = 'REPO_UPLOAD_FILES_SUCCESS';
export const REPO_UPLOAD_FILES_FAILED = 'REPO_UPLOAD_FILES_FAILED';
export const REPO_EDIT_TXT_SUCCESS = 'REPO_EDIT_TXT_SUCCESS';
export const REPO_EDIT_TXT_FAILED = 'REPO_EDIT_TXT_FAILED';
export const REPO_UPLOAD_FILE = 'REPO_UPLOAD_FILE';
export const REPO_UPLOAD_FILE_FAILED = 'REPO_UPLOAD_FILE_FAILED';
export const REPO_CREATE_FOLDER = 'REPO_CREATE_FOLDER';
export const REPO_CREATE_FOLDER_FAILED = 'REPO_CREATE_FOLDER_FAILED';
export const REPO_CREATE_FILES = 'REPO_CREATE_FILES';
export const REPO_CREATE_FILES_FAILED = 'REPO_CREATE_FILES_FAILED';
export const REPO_RENAME_FOLDER = 'REPO_RENAME_FOLDER';
export const REPO_RENAME_FOLDER_FAILED = 'REPO_RENAME_FOLDER_FAILED';
export const REPO_RENAME_FILE = 'REPO_RENAME_FILE';
export const REPO_RENAME_FILE_FAILED = 'REPO_RENAME_FILE_FAILED';
export const REPO_DELETE_FOLDER = 'REPO_DELETE_FOLDER';
export const REPO_DELETE_FOLDER_FAILED = 'REPO_DELETE_FOLDER_FAILED';
export const REPO_DELETE_FILE = 'REPO_DELETE_FILE';
export const REPO_DELETE_FILE_FAILED = 'REPO_DELETE_FILE_FAILED';
export const REPO_GET_USER_PROJECT_FILES = 'REPO_GET_USER_PROJECT_FILES';
export const REPO_GET_USER_PROJECT_FILES_FAILED = 'REPO_GET_USER_PROJECT_FILES_FAILED';
export const REPO_DOWNLOAD_FILE = 'REPO_DOWNLOAD_FILE';

//preview
export const UPDATE_TXT_PREVIEW = 'UPDATE_TXT_PREVIEW';
export const UPDATE_AUDIO_PREVIEW = 'UPDATE_AUDIO_PREVIEW';
export const OPEN_TXT_FILE_PREVIEW = 'OPEN_TXT_FILE_PREVIEW';
export const OPEN_AUDIO_FILE_PREVIEW = 'OPEN_AUDIO_FILE_PREVIEW';
export const WAVESURFER_INITIALIZED = 'WAVESURFER_INITIALIZED';
export const TOGGLE_PLAYING_PREVIEW = 'TOGGLE_PLAYING_PREVIEW';
export const CHANGE_AUDIO_DISPLAYED = 'CHANGE_AUDIO_DISPLAYED';
