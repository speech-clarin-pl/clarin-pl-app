import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RecognitionTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import RecognitionItem from './RecognitionItem/RecognitionItem';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';

class RecognitionTool extends Component {

    state = {
        draggedFiles: null,
    }


    droppingFilesFromDiscHandler = (files, event) => {
        
        this.setState({
            draggedFiles: files
        });
        
        const fileList = files;
        

        const numFiles = files.length;
        let nBytes = 0;

         // Loop through each of the selected files.
         for (var i = 0; i < files.length; i++) {
            var file = files[i];

            //if (!file.type.startsWith('audio/')){ continue }

            nBytes += file.size;

            this.FileUpload(file)

            //const reader = new FileReader();
           
            //reader.readAsDataURL(file);
        }

        let sOutput = nBytes + " bytes";

        for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
          }

          console.log(sOutput);

       
        this.setState({
            draggedFiles: files
        });
    }

    FileUpload(file) {
        const reader = new FileReader();  

        reader.onload = function(e) {
          
        //console.log(e.target.result);
        console.log(file.name);
        
           // console.log(file.size);
           // console.log(file.type);
           // console.log(file.lastModifiedDate );
        };

        reader.onprogress = function(evt) {
           
            if (evt.lengthComputable) {
                var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                // Increase the progress bar length.
                console.log("loading...." + percentLoaded + "%");
                if (percentLoaded < 100) {
                  console.log(percentLoaded + "%");
                }
            }
        }

        reader.onerror = function(evt) {
            switch(evt.target.error.code) {
                case evt.target.error.NOT_FOUND_ERR:
                  alert('File Not Found!');
                  break;
                case evt.target.error.NOT_READABLE_ERR:
                  alert('File is not readable');
                  break;
                case evt.target.error.ABORT_ERR:
                  break; // noop
                default:
                  alert('An error occurred reading this file.');
              };
            
        }

        reader.onloadend = function(evt) {
            console.log("onloadend");
        }

        reader.onloadstart = function(evt) {
            console.log("onloadstart");
        }

     
        reader.readAsBinaryString(file);

        //przerwanie uploadu to reader.abort(); TO DO

      }

    render(){

        let filelist = "Wgraj pliki do rozpoznawania";

       

        if(this.state.draggedFiles !== null){

            filelist = [];
   
            const files = Array.from(this.state.draggedFiles);

            console.log(files);

            const numFiles = files.length;

            filelist = files.map((file,i)=>{
                return (
                    <RecognitionItem key={"key"+i} 
                        file={file}/>
                );
            });
        }
        

        return(
            <Aux>
                 <SettingBar />
    
                <section className="Content" data-scrollbar>
    
                    <div className={["container-fluid", "RecognitionTool"].join(' ')}>
                    <div className="tool-desc">
                        <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
                    </div>
    
                    <div className="tool-body">
    
                        <div className="row">
                            <div className="col-md">
                                <DropFilesArea whenFilesDropped={this.droppingFilesFromDiscHandler}/>
                            </div>
                            <div className="col-md">
                                    <div className="uploadFromRepo">
                                        <h2>Wgraj pliki z repozytorium</h2>
                                        <p>Przeciągnij pliki z repozytorium. Podczas przetwarzania nie bedziesz mógł wykonywać żadnych dodatkowych operacji na tych plikach</p>
                                        <i className="fas fa-cloud-upload-alt"></i>
                                    </div>
                            </div>
                        </div>
    
                        <div className="file-list">
                            {filelist}
                            
    
    {/*
                            <RecognitionItem status="loaded"/>
                            <RecognitionItem status="ready"/>		
                            <RecognitionItem status="ready"/>
                            <RecognitionItem status="error"/>
                            <RecognitionItem status="progress"/>
                            <RecognitionItem status="progress"/>

    */ }
    
                        </div>
    
    
                    </div>
    
                     
                    </div>
    
                    <FooterTool />
    
                </section>
            </Aux>
        );
    }


}

export default RecognitionTool;