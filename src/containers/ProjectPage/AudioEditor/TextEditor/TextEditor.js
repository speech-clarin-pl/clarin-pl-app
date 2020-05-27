import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './TextEditor.css';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { faAlignJustify} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import ButtonLeftBar from '../../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import * as audioEditorActions from '../../../../store/actions/index';
import EditorJs from 'react-editor-js';

import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
  marker: Marker,
  //list: List,
  //warning: Warning,
  //header: Header,
  //quote: Quote,
  delimiter: Delimiter,
  simpleImage: SimpleImage
};


class TextEditor extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            data: {
                "time" : 0,
                "blocks" : [],
                "version" : "1.1.1"
              },
            editorisready: false,
        }
        
        let editor = null;  //text editor instance
        let container = null;
    }

    saveTranscriptionHandler = () => {
       this.editor.save().then((outputData) => {
        this.props.onSaveTranscription(this.props.container, this.props.toolType, this.props.token, outputData);
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });

    }

    textEditorChange = (evt) => {
       // console.log("zmienilo sie cos");
    }

    textChanged = (evt) => {
        this.setState({
            data: evt.target.value,
        })
        this.props.onTranscriptionChanged();
    }

    componentDidUpdate = (prevProps, prevState) => {

        if(this.props.transcriptionData){
            if(prevProps.transcriptionData !== this.props.transcriptionData){
                if(this.state.editorisready){
                        this.editor.render(this.props.transcriptionData)
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        }
    }

    loadNewTranscription = () => {
         this.props.onLoadExistingTranscription(this.props.container, this.props.toolType, this.props.token);
    }

    setEditorReady = () => {
        this.setState({
            editorisready: true,
        })
    }


       
    componentDidMount() {
        this.editor = this.editorInstance; //instancja edytora
        this.container = this.props.container;
    }
       
	render() {
       
		return (
			<Aux>
                <div className="TextEditor">

                    {
                        this.props.transcriptionSaved? <div>Zapisano transcrypcje</div>: null

                        // <TextareaAutosize maxRows={1000} minRows={5} className="textEditor" onChange={this.textChanged} value={this.state.transcription}/>

                    }


                    <ButtonLeftBar 
                        napis="Załaduj transkrypcje z serwera"
                        iconType="file"
                        icon={null}
                        customeStyle={{textAlign: 'center'}}
                        disabled={false}
                        whenClicked={this.loadNewTranscription}/>

                    <EditorJs 
                        tools={EDITOR_JS_TOOLS}
                        instanceRef={instance => this.editorInstance = instance}
                        placeholder={"transkrybuj tutaj"}
                        onReady={this.setEditorReady}
                        onChange={this.textEditorChange}
                        data={this.props.transcriptionData} />
                   
                    <ButtonLeftBar 
                        napis="Zapisz transkrypcje"
                        iconType="file"
                        icon={null}
                        customeStyle={{textAlign: 'center'}}
                        disabled={false}
                        whenClicked={this.saveTranscriptionHandler}/>

                    
                </div>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {

		// DIAItems: state.diaR.filesToUpload,
		//	modalDisplay: state.projectR.modal,
		//	ifRefusedAudio: state.segR.ifRefusedAudio,
         token: state.homeR.token,
         transcriptionSaved: state.projectR.transcriptionSaved,
         transcriptionData: state.recR.transcriptionData,


	}
}

const mapDispatchToProps = dispatch => {
	return {

        onSaveTranscription: (container, toolType, token, transcription) => dispatch(audioEditorActions.saveTranscription(container, toolType, token, transcription)),
        onTranscriptionChanged: () => dispatch(audioEditorActions.transcriptionChanged()),
        onLoadExistingTranscription: (container, toolType, token) => dispatch(audioEditorActions.loadTranscription(container, toolType, token)),

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);