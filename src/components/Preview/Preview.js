import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import { getExt } from '../../utils/utils';
import { extensionMapping } from '../../utils/fileTypes';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer'
import TextEdit from '../../components/TextEdit/TextEdit'
import {getFileKeyFromURL} from '../../utils/utils';

class Preview extends Component {

    

    render(){

        const fileToPreview = this.props.fileToPreview;
        const ext = getExt(fileToPreview)[0];
        let typPliku = "";
        const fileKey = getFileKeyFromURL(fileToPreview);

        // stwierdzam czy jest to plik txt czy audio
        // na tej podstawie renderuje odpowiedni widok
        let podgladPliku = null;
        
		if (extensionMapping[ext] === "Audio") {
            typPliku = "Audio";

            podgladPliku = (
                <AudioPlayer audioURL={fileToPreview} />
             )

        
		} else if(extensionMapping[ext] === "Text") {
            typPliku = "Text";

            podgladPliku = (
                <TextEdit textURL={fileToPreview} whenClose={this.props.onClose}/>
             )

        } else {
            typPliku = "Unknown";
            podgladPliku = (
                <p>Nieznany typ pliku!</p>
             )
        }

        return(
            <Aux>
                <p>Podgląd pliku: {fileKey}</p>
                {podgladPliku}
            </Aux>
        )
    }
}

export default Preview;