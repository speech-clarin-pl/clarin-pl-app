import React, { Component } from 'react'
import './UploadAudio.css'
import Dropzone from '../UI/Dropzone/Dropzone';
import Progress from '../UI/Progress/Progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { connect } from 'react-redux';

class UploadAudio extends Component {

    state = {
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false
      };

      
    constructor(props) {
      super(props)
      this.onFilesAdded = this.onFilesAdded.bind(this);
      this.uploadFiles = this.uploadFiles.bind(this);
      //this.sendRequest = this.sendRequest.bind(this);
      this.renderActions = this.renderActions.bind(this);
    }


    onFilesAdded(files) {
        this.setState(prevState => ({
          files: prevState.files.concat(files)
        }));
    }

    
 
    uploadFiles(sid) {

      this.setState({ uploadProgress: {}, uploading: true });

      const projectId = this.props.currentProjectID;
      const userId = this.props.currentProjectOwner;
      const sessionId = this.props.currentlySelestSessions[0];

      this.state.files.forEach(file => {

        const dataToSend = new FormData();

        dataToSend.append('userId', userId);
        dataToSend.append('projectId', projectId);
        dataToSend.append('sessionId', sessionId);

        dataToSend.append('audioFile', file);


        
        axios.post('/repoFiles/uploadFile', dataToSend,{

          headers: {
              Authorization: 'Bearer ' + this.props.token,
              'Content-Type': `multipart/form-data; boundary=${dataToSend._boundary}`,
          },

          onUploadProgress: ProgressEvent => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = {
              state: "pending",
              percentage: (ProgressEvent.loaded / ProgressEvent.total) * 100
            };
           this.setState({ uploadProgress: copy });
          },
        });
      })

    }



  //   req.upload.addEventListener("load", event => {
  //     const copy = { ...this.state.uploadProgress };
  //     copy[file.name] = { state: "done", percentage: 100 };
  //     this.setState({ uploadProgress: copy });
  //     resolve(req.response);
  //    });
      
  // req.upload.addEventListener("error", event => {
  // const copy = { ...this.state.uploadProgress };
  // copy[file.name] = { state: "error", percentage: 0 };
  // this.setState({ uploadProgress: copy });
  // reject(req.response);
  // });

      // async uploadFiles() {

      //   this.setState({ uploadProgress: {}, uploading: true });
      //   const promises = [];
      //   this.state.files.forEach(file => {
      //     promises.push(this.sendRequest(file));
      //   });

      //   try {
      //     await Promise.all(promises);
      
      //     this.setState({ successfullUploaded: true, uploading: false });
      //   } catch (e) {
      //     // Not Production ready! Do some error handling here instead...
      //     this.setState({ successfullUploaded: true, uploading: false });
      //   }
      // }


      renderActions() {
        if(this.state.files.length > 0){
          if (this.state.successfullUploaded) {
            return (
              <button
                onClick={() =>
                  this.setState({ files: [], successfullUploaded: false })
                }
              >
                Wyczyść
              </button>
            );
          } else {
            return (
              <button
                disabled={this.state.files.length < 0 || this.state.uploading}
                onClick={(sessionId) => this.uploadFiles(sessionId)}
              >
                Wgraj pliki
              </button>
            );
          }
        }
      }

   

      // sendRequest(file) {
      //   return new Promise((resolve, reject) => {
      //     const req = new XMLHttpRequest();

      //     req.upload.addEventListener("progress", event => {
      //       if (event.lengthComputable) {
      //        const copy = { ...this.state.uploadProgress };
      //        copy[file.name] = {
      //         state: "pending",
      //         percentage: (event.loaded / event.total) * 100
      //        };
      //        this.setState({ uploadProgress: copy });
      //       }
      //      });
            
      //      req.upload.addEventListener("load", event => {
      //       const copy = { ...this.state.uploadProgress };
      //       copy[file.name] = { state: "done", percentage: 100 };
      //       this.setState({ uploadProgress: copy });
      //       resolve(req.response);
      //      });
            
      //      req.upload.addEventListener("error", event => {
      //       const copy = { ...this.state.uploadProgress };
      //       copy[file.name] = { state: "error", percentage: 0 };
      //       this.setState({ uploadProgress: copy });
      //       reject(req.response);
      //      });
      
      //     const formData = new FormData();
      //     formData.append("file", file, file.name);

      //     console.log(process.env.REACT_APP_API_URL)
      
      //     req.open("POST", process.env.REACT_APP_API_URL + "/repoFiles/uploadFile");
      //     req.send(formData);
      //   });
      // }


      renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullUploaded) {
          return (
            <div className="ProgressWrapper">
              <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
              {
                /*
                <FontAwesomeIcon icon={faCheck} className="CheckIcon" style={{
                  opacity:
                    uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                }} /> 
                */
              }
              
            </div>
          );
        }
      }


      removeToUpload = (index,fileId, e) => {

        const filetoremove = this.state.files[index];


        const newFileList = this.state.files.filter((file) => {
          return file != filetoremove;
        });

        // usuwanie plików z listy plików do wgrania na serwer
        this.setState(prevState => ({
          files: newFileList
        }))
      }
  
    render() {
        return (
            <div className="UploadAudio">
              <div className="ContentUploadAudio">

                <div>
                  <Dropzone
                    onFilesAdded={this.onFilesAdded}
                    disabled={this.state.uploading || this.state.successfullUploaded}
                  />
                </div>

                <div className="Files">
                    {this.state.files.map((file, index) => {
                    return (
                        <div key={file.name+index} className="FileToUpload">
                           <FontAwesomeIcon icon={faMinusCircle} className="removeFile" onClick={(e) => this.removeToUpload(index, file.name+index, e)} /> 
                          
                            <span className="Filename">{file.name}</span>
                            {this.renderProgress(file)}
                        </div>
                    );
                    })}

                </div>
              </div>
              <div className="Actions">{this.renderActions()}</div>
            </div>
          );
    }
  }


  const mapStateToProps = (state) => {
    return {

      currentProjectID: state.projectR.currentProjectID,
      currentProjectName: state.projectR.currentProjectName,
      currentProjectOwner: state.projectR.currentProjectOwner,
      currentlySelestSessions: state.repoR.currentlySelestSessions,
      token: state.homeR.token,

      // uploadPercent: state.repoR.uploadProgress,
      // uploadBtnDisabled: state.repoR.uploadBtnDisabled,
      // uploadFilesDone: state.repoR.uploadFilesDone,
  
      // files: state.repoR.files,
       
  
      // modal: state.projectR.modal,
  
      //     txtDisplayed: state.previewR.txtDisplayed,
      //     txtfileName: state.previewR.txtfileName,
      //     txtFileUrl: state.previewR.txtFileUrl,
  
      //     audiofileName: state.previewR.audiofileName,
      //     audioDisplayed: state.previewR.audioDisplayed,
      //     audioFileUrl:  state.previewR.audioFileUrl,
      //     waveSurferInitialized: state.previewR.waveSurferInitialized,
      //     playing: state.previewR.playing,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      // onOpenModalHandler: () => dispatch(repoActions.openModalProject()),
      // onCloseModalHandler: () => dispatch(repoActions.closeModalProject()),
      // onUploadFilesFinish: () => dispatch(repoActions.uploadFilesFinish()),
      // onUploadFilesModalOpen: () => dispatch(repoActions.uploadFilesModalOpen()),
      // onUploadFiles: (fileList, folderKey, userId, projectId, token) => dispatch(repoActions.uploadFiles(fileList,folderKey,userId, projectId, token)),
      // onHandleCreateFolder: (key, projectId, userId, token) => dispatch(repoActions.handleCreateFolder(key, projectId, userId, token)),
      // onHandleCreateFiles: (files, prefix) => dispatch(repoActions.handleCreateFiles(files, prefix)),
      // onHandleRenameFolder: (oldKey, newKey, projectId, userId, token) => dispatch(repoActions.handleRenameFolder(oldKey, newKey, projectId, userId, token)),
      // onHandleRenameFile: (oldKey, newKey, projectId, userId, token) => dispatch(repoActions.handleRenameFile(oldKey, newKey, projectId, userId, token)),
      // onHandleDeleteFolder: (folderKey, projectId, userId, token) => dispatch(repoActions.handleDeleteFolder(folderKey, projectId, userId, token)),
      // onHandleDeleteFile: (fileKey, projectId, userId, token) => dispatch(repoActions.handleDeleteFile(fileKey, projectId, userId, token)),
      // onGetProjectFilesForUser: (userId, projectId, token) => dispatch(repoActions.getProjectFilesForUser(userId, projectId, token)),
      // onOpenTxtFileToPreview: (file, ifWaveSurferIsInitialized) => dispatch(repoActions.openTxtFileToPreview(file,ifWaveSurferIsInitialized)),
      // onOpenAudioFileToPreview: (file,ifWaveSurferIsInitialized) => dispatch(repoActions.openAudioFileToPreview(file,ifWaveSurferIsInitialized)),
      // onHandleDownloadFile: (fileKey, projectId, userId, token) => dispatch(repoActions.handleDownloadFile(fileKey, projectId, userId, token))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UploadAudio);