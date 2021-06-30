import React, {Component} from 'react';
import FileContainer from '../ContainerFile/FileContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './LastCorpus.css';
import UploadAudio from '../../../../components/UploadAudio/UploadAudio';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import EditableLabel from 'react-inline-editing';
import * as repoActions from '../../../../store/actions/index';

import {injectIntl, FormattedMessage} from 'react-intl';
import ReactHtmlParser from "react-html-parser";

class LastCorpus extends Component {


    downloadLastCorpus = (event) => {
        event.preventDefault();

        let projectId = this.props.currentProjectID;
        let corpusPath = process.env.REACT_APP_API_URL+ "/repoFiles/downloadCorpus/" + projectId+"/?api_key="+this.props.token;
		
        window.open(corpusPath);

        this.props.onKorpusDownloaded();
    }

    render() {

        let message = null;
        if(!this.props.corpusCreatedAt){
            message = "Nie utworzono jeszcze korpusu"
        } else {
            message =  (
                <div>
                    {this.props.intl.formatMessage(
                        {
                            id:"LastCorpus-infotext",
                            description: 'Korspus z dnia ...', 
                            defaultMessage: "Korpus z dnia ",
                        },
                    )}
                     <span style={{fontSize:'11px'}}>{this.props.corpusCreatedAt}</span>  <a href="#" onClick={this.downloadLastCorpus}><FontAwesomeIcon icon={faDownload}  /> </a>
                </div>
            )
        }


        return (
            <div className="LastCorpus">
                
                {
                    message
                }
                
             </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
       // reactTourOpenDemoSession: state.repoR.reactTourOpenDemoSession,
       corpusCreatedAt: state.repoR.corpusCreatedAt,
       currentProjectID: state.projectR.currentProjectID,
       token: state.homeR.token,
	}
}



const mapDispatchToProps = dispatch => {
	return {
        onKorpusDownloaded: () => dispatch(repoActions.korpusDownloaded()),
    //	onUploadFiles: (fileList, folderKey, userId, projectId, token) => dispatch(repoActions.uploadFiles(fileList,folderKey,userId, projectId, token)),
     // onChangeSessionName: (sessionId, newText, token) => dispatch(repoActions.changeSessionName(sessionId, newText, token)),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(LastCorpus)));



