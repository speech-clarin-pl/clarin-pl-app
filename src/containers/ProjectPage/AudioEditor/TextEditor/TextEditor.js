import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './TextEditor.css';
import { connect } from 'react-redux';
//import uuid from 'uuid';
//import { faAlignJustify} from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import ButtonLeftBar from '../../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import {injectIntl, FormattedMessage} from 'react-intl';
//import * as audioEditorActions from '../../../../store/actions/index';
//import EditorJs from 'react-editor-js';

//import List from "@editorjs/list";
//import Warning from "@editorjs/warning";
//import Header from "@editorjs/header";
//import Quote from "@editorjs/quote";
//import Marker from "@editorjs/marker";
//import Delimiter from "@editorjs/delimiter";
//import SimpleImage from "@editorjs/simple-image";

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
           // text:  this.props.transcriptionData.blocks[0].data.text,
           // text: '',
            editorisready: false,
            transcriptHasChanged: false,
        }
    }

       
    componentDidMount = () => {
        this.setState({
            editorisready: true,
        })

        this.props.onLoadTranscription();
    }


    loadNextForTranscript = () => {
        this.props.onLoadNextElement();
    }
       
	render() {
        

        let loadTranscriptBtnDisabled = false;
        let loadTranscriptBtnText = this.props.intl.formatMessage(
            {
                id:"TextEditor-zaladujTranskrypcjeZSerwera",
                description: 'Napis na przycisku ladowania transkrypcji z serwera', 
                defaultMessage: 'Załaduj transkrypcje z serwera', 
            }
        );

        let loadTranscriptBtnStyle = {backgroundColor: '#3498db'};

        let saveTranscriptBtnDisabled = false;
        let saveTranscriptBtnText = this.props.intl.formatMessage(
            {
                id:"TextEditor-zapiszTranskrypcjeZSerwera",
                description: 'Napis na przycisku zapisywania transkrypcji na serwerze', 
                defaultMessage: "Zapisz transkrypcję na serwerze", 
            }
        );
        let saveTranscriptBtnStyle = {backgroundColor: '#3498db'};

        //jeżeli element nie miał zrobionej jeszcze transkrypcji to
        if(!this.props.container.ifREC){
            loadTranscriptBtnDisabled = true;
            loadTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-rozpocznijTranskrypcje",
                    description: 'Napis na przycisku rozpoczynajacym transkrypcje', 
                    defaultMessage: "Rozpocznij transkrypcje", 
                }
            );
            loadTranscriptBtnStyle = {backgroundColor: '#3498db', textAlign: 'center'};

            saveTranscriptBtnDisabled = false;
            saveTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-plikNiezmieniony",
                    description: 'Napis na przycisku informujący że plik nie jest zmieniony', 
                    defaultMessage: "Plik niezmieniony", 
                }
            );
            saveTranscriptBtnStyle = {backgroundColor: '#c7d5da', textAlign: 'center'};
        }

        //jeżeli element nie miał zrobionej transkrypcji ale jest już edytowany przez użytkownika
        if(!this.props.container.ifREC && this.props.transcriptHasChanged){

            saveTranscriptBtnDisabled = false;
            saveTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-zapiszZmianyNaSerwerze",
                    description: 'Napis na przycisku zapisującym zmiany na serwerze', 
                    defaultMessage: "Zapisz zmiany na serwerze", 
                }
            );
            saveTranscriptBtnStyle = {backgroundColor: '#3498db', textAlign: 'center'};
        }

        //jeżeli jest transkrypcja i jest świeżo załadowana z serwera to przycisk jest nieaktywny
        if(this.props.container.ifREC && !this.props.transcriptHasChanged){
            loadTranscriptBtnDisabled = true;
            loadTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-transkrypcjaZaladowanaOK",
                    description: 'Napis informujący że transkrypcja załadowana została pomyślnie', 
                    defaultMessage: "Transkrypcja załadowana pomyślnie", 
                }
            );
            loadTranscriptBtnStyle = {backgroundColor: '#46d363', textAlign: 'center'};

            saveTranscriptBtnDisabled = true;
            saveTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-fileHasNotChanged",
                    description: 'Napis informujący że plik nie został zmieniony', 
                    defaultMessage: "Plik niezmieniony", 
                }
            );
            saveTranscriptBtnStyle = {backgroundColor: '#c7d5da', textAlign: 'center'};
        }

        // jeżeli coś user zmienił i jeszcze nie zapisał
        if(this.props.container.ifREC && this.props.transcriptHasChanged){
            loadTranscriptBtnDisabled = false;
            loadTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-zaladujPoprzedniaWersje",
                    description: 'Napis na przycisku do zaladowania poprzedniej wersji z serwera', 
                    defaultMessage: "Załaduj poprzednią wersję z serwera", 
                }
            );
            loadTranscriptBtnStyle = {backgroundColor: '#efb710', textAlign: 'center'};

            saveTranscriptBtnDisabled = false;
            saveTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-zapiszZmianyNaSerwerzev2",
                    description: 'Napis na przycisku do zapisywania zmian na serwerze', 
                    defaultMessage: "Zapisz zmiany na serwerze", 
                }
            );
            saveTranscriptBtnStyle = {backgroundColor: '#3498db', textAlign: 'center'};
        }

        // jeżeli user po zmianach zapisał
        if(this.props.transcriptionSaved && this.props.text !== ''){
            loadTranscriptBtnDisabled = true;
            loadTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-transkrypcjaZapisanaPomyslnie",
                    description: 'Informacja że transkrypcja zostałą zapisana pomyślnie', 
                    defaultMessage:"Transkrypcja została zapisana pomyślnie",
                }
            );
            loadTranscriptBtnStyle = {backgroundColor: '#46d363', textAlign: 'center'};

            saveTranscriptBtnDisabled = true;
            saveTranscriptBtnText = this.props.intl.formatMessage(
                {
                    id:"TextEditor-plikNiezmienionyInfo",
                    description: 'Informacja że plik nie został zmieniony', 
                    defaultMessage:"Plik niezmieniony",
                }
            );
            saveTranscriptBtnStyle = {backgroundColor: '#c7d5da', textAlign: 'center'};
        }

       
       
		return (
			<Aux>
                <div className="TextEditor">

                    {
                       // this.props.transcriptionSaved? <div>Zapisano transcrypcje</div>: null

                        // <TextareaAutosize maxRows={1000} minRows={5} className="textEditor" onChange={this.textChanged} value={this.state.transcription}/>

                    }


                    <ButtonLeftBar 
                        napis={loadTranscriptBtnText}
                        iconType="file"
                        icon={null}
                        customeStyle={loadTranscriptBtnStyle}
                        disabled={loadTranscriptBtnDisabled}
                        whenClicked={this.props.onLoadTranscription}/>


                    <TextareaAutosize 
                        maxRows={1000} 
                        minRows={5} 
                        className="textEditor"
                        onChange={this.props.onTextChanged} 
                        value={this.props.text}
                        inputRef={tag => (this.textarea = tag)}
                        autoFocus />

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
                        whenClicked={this.props.onSaveChanges}/>

                    <ButtonLeftBar 
                        napis={
                            this.props.intl.formatMessage(
                                {
                                    id:"TextEditor-zaladujKolejnyNaLiscie",
                                    description: 'Informacja o załadowaniu kolejnego na liście', 
                                    defaultMessage:"Załaduj kolejny na liście",
                                }
                            )
                        }
                        iconType="file"
                        icon={null}
                        customeStyle={{backgroundColor: '#3498db', textAlign: 'center'}}
                        disabled={false}
                        whenClicked={this.loadNextForTranscript}/>
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

       // onSaveTranscription: (container, toolType, token, transcription) => dispatch(audioEditorActions.saveTranscription(container, toolType, token, transcription)),
       // onTranscriptionChanged: () => dispatch(audioEditorActions.transcriptionChanged()),
       // onLoadExistingTranscription: (container, toolType, token) => dispatch(audioEditorActions.loadTranscription(container, toolType, token)),

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TextEditor));