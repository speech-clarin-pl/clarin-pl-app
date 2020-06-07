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

/*
export const EDITOR_JS_TOOLS = {
  marker: Marker,
  //list: List,
  //warning: Warning,
  //header: Header,
  //quote: Quote,
  delimiter: Delimiter,
  simpleImage: SimpleImage
};
*/


class TextEditor extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            text:  this.props.transcriptionData.blocks[0].data.text,
            editorisready: false,
            ifTranskriptExists: false,
            transcriptHasChanged: false,
        }
       
        
        //this.state = {
        //    data: "",
        //};
        
        //let editor = null;  //text editor instance
        let container = null;
    }

    saveTranscriptionHandler = () => {

        this.props.onSaveTranscription(this.props.container, this.props.toolType, this.props.token, this.state.text);

        /*
       this.editor.save().then((outputData) => {
        this.props.onSaveTranscription(this.props.container, this.props.toolType, this.props.token, outputData);
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
        */

    }

    textEditorChange = (evt) => {
       // console.log("zmienilo sie cos");
    }

    textChanged = (evt) => {
       // console.log(evt.target.value)
      // console.log(this.state.transcriptionData)
        this.setState({
            text: evt.target.value,
            transcriptHasChanged: true,
        })
        this.props.onTranscriptionChanged();
    }

    componentDidUpdate = (prevProps, prevState) => {
       // console.log("zmienil sie container")
        //jeżeli zmienił się container
        if(prevProps.container !== this.props.container){
            this.container = this.props.container;
            if(this.container.ifREC){
                this.loadNewTranscription();
            }
        }
        

        // jeżeli zmieniła się transkrypcja
        if(this.props.transcriptionData){
            if(prevProps.transcriptionData !== this.props.transcriptionData){
                if(this.state.editorisready){
                        //console.log(this.props.transcriptionData)
                        //this.editor.render(this.props.transcriptionData)
                        //.catch(err => {
                        //    console.log(err)
                        //})
                        //console.log(this.props.transcriptionData.blocks[0].data.text)

                        if(this.container.ifREC){
                            this.setState({
                                text: this.props.transcriptionData.blocks[0].data.text,
                                ifTranskriptExists: true,
                                transcriptHasChanged: false,
                            })
                        }
                        
                }
            }
        }
      
    }

    loadNewTranscription = () => {
        this.props.onLoadExistingTranscription(this.props.container, this.props.toolType, this.props.token);
    }

    /*
    setEditorReady = () => {
        this.setState({
            editorisready: true,
        })
    }
    */


       
    componentDidMount() {

        this.container = this.props.container;
        this.setState({
            editorisready: true,
        })
       
        // sprawdzam czy istnieje już transkrypcja dla tego kontenera. Jeżeli tak to ładuje ją z serwera. Jeżeli nie to można wykonać automatycznie
        //jeżeli transkrypcja istnieje to
        if(this.container.ifREC){
            this.loadNewTranscription();
        }
       
        
    }
       
	render() {

        let loadTranscriptBtnDisabled = false;
        let loadTranscriptBtnText = "Załaduj transkrypcje z serwera";
        let loadTranscriptBtnStyle = {backgroundColor: '#3498db'};

        let saveTranscriptBtnDisabled = false;
        let saveTranscriptBtnText = "Zapisz transkrypcję na serwerze";
        let saveTranscriptBtnStyle = {backgroundColor: '#3498db'};

        //jeżeli jest transkrypcja i jest świeżo załadowana z serwera to przycisk jest nieaktywny
        if(this.state.ifTranskriptExists && !this.state.transcriptHasChanged){
            loadTranscriptBtnDisabled = true;
            loadTranscriptBtnText = "Transkrypcja załadowana pomyślnie";
            loadTranscriptBtnStyle = {backgroundColor: '#46d363', textAlign: 'center'};

            saveTranscriptBtnDisabled = true;
            saveTranscriptBtnText = "Plik niezmieniony";
            saveTranscriptBtnStyle = {backgroundColor: '#c7d5da', textAlign: 'center'};
        }

        // jeżeli coś user zmienił i jeszcze nie zapisał
        if(this.state.ifTranskriptExists && this.state.transcriptHasChanged){
            loadTranscriptBtnDisabled = false;
            loadTranscriptBtnText = "Załaduj poprzednią wersję z serwera";
            loadTranscriptBtnStyle = {backgroundColor: '#efb710', textAlign: 'center'};

            saveTranscriptBtnDisabled = false;
            saveTranscriptBtnText = "Zapisz zmiany na serwerze";
            saveTranscriptBtnStyle = {backgroundColor: '#3498db', textAlign: 'center'};
        }

        // jeżeli user po zmianach zapisał
        if(this.props.transcriptionSaved){
            loadTranscriptBtnDisabled = true;
            loadTranscriptBtnText = "Transkrypcja została zapisana pomyślnie";
            loadTranscriptBtnStyle = {backgroundColor: '#46d363', textAlign: 'center'};

            saveTranscriptBtnDisabled = true;
            saveTranscriptBtnText = "Plik niezmieniony";
            saveTranscriptBtnStyle = {backgroundColor: '#c7d5da', textAlign: 'center'};
        }

       
       
		return (
			<Aux>
                <div className="TextEditor">

                    {
                        this.props.transcriptionSaved? <div>Zapisano transcrypcje</div>: null

                        // <TextareaAutosize maxRows={1000} minRows={5} className="textEditor" onChange={this.textChanged} value={this.state.transcription}/>

                    }


                    <ButtonLeftBar 
                        napis={loadTranscriptBtnText}
                        iconType="file"
                        icon={null}
                        customeStyle={loadTranscriptBtnStyle}
                        disabled={loadTranscriptBtnDisabled}
                        whenClicked={this.loadNewTranscription}/>


                    <TextareaAutosize 
                        maxRows={1000} 
                        minRows={5} 
                        className="textEditor"
                        onChange={this.textChanged} 
                        value={this.state.text} />

                    {
                    /*
                    <EditorJs 
                        tools={EDITOR_JS_TOOLS}
                        instanceRef={instance => this.editorInstance = instance}
                        placeholder={"transkrybuj tutaj"}
                        onReady={this.setEditorReady}
                        onChange={this.textEditorChange}
                        data={this.props.transcriptionData} />

                    */
                    }
                    
                   
                    <ButtonLeftBar 
                        napis={saveTranscriptBtnText}
                        iconType="file"
                        icon={null}
                        customeStyle={saveTranscriptBtnStyle}
                        disabled={saveTranscriptBtnDisabled}
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