import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
//import { extensionMapping } from '../../utils/fileTypes';
import './TextEdit.css'
import { connect } from 'react-redux';
import * as repoActions from '../../store/actions/index'
import {getFileKeyFromURL} from '../../utils/utils';

class TextEdit extends Component {

    state = {
        url: null,
        fileKey: null,
        txtContent: '',
        txtLoaded: false,
    }

    load = url => {
        let fileKey = getFileKeyFromURL(url);
        this.setState({
            url: url,
            fileKey: fileKey,
        }, () => {
            fetch(this.state.url)
            .then(response => {
                response.text().then(content => {
                    
                    this.setState({
                        txtContent: content,
                        txtLoaded: true,
                    });
                    
                })
            })
            .catch(error => {
                //console.log(error)
            })
        })
    }


    componentDidMount = () => {
        this.load(this.props.textURL)
    }
    
    txtAreaChangedHandler = (e) => {
        // console.log(e.currentTarget.value);
        this.setState({
            txtContent: e.currentTarget.value
        })
        
    }

    saveEditedFile = () => {
        this.props.onSaveEditedFileHandler(this.props.userId, this.props.projectId, this.props.token,this.state.fileKey, this.state.txtContent )
    }

    

   

    render(){

        let przyciskSaveDisabled = true;
        if(this.state.txtLoaded){
            przyciskSaveDisabled = false;
        }

        let potwierdzenieZapisania;

        if(this.props.editTxtFileOK){
            potwierdzenieZapisania = (
                <button type="button" disabled={przyciskSaveDisabled} className="btn btn-success" onClick={this.props.whenClose}>Success</button>
            )
        }

        return(
            <Aux>
                <textarea
                    className="textEditPreview"
                    placeholder="Zaznacz plik txt w repozytorium"
                    value={this.state.txtContent}
                    onChange={this.txtAreaChangedHandler}
                >
                </textarea>

                <button type="button" disabled={przyciskSaveDisabled} className="btn btn-primary" onClick={this.saveEditedFile}>Save</button>

                {potwierdzenieZapisania}
            </Aux>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      //currentProjectID: state.prolistR.chosenProjectID,
      editTxtFileOK: state.repoR.editTxtFileOK,
      userId: state.homeR.userId,
      projectId: state.projectR.currentProjectID,
      token: state.homeR.token,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      // onInitProjectHandler: (projectId, projectTitle, projectOwner) => dispatch(projectActions.initProject(projectId, projectTitle, projectOwner)),
        onSaveEditedFileHandler: (userId, projectId, token, filekey, newConent) => dispatch(repoActions.handleUpdateTxtFile(userId, projectId, token, filekey, newConent)),
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TextEdit);
