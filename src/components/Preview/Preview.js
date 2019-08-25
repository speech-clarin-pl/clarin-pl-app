import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import { getExt } from '../../utils/utils';
import { extensionMapping } from '../../utils/fileTypes';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer'


class Preview extends Component {

    

    render(){

        const fileToPreview = this.props.fileToPreview;
        const ext = getExt(fileToPreview)[0];
        let typPliku = "";

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
        } else {
            typPliku = "Unknown";
        }

        return(
            <Aux>
                <p>Podgląd pliku: </p>
                {podgladPliku}
            </Aux>
        )
    }
}

export default Preview;