import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RecognitionTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import RecognitionItem from './RecognitionItem/RecognitionItem';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';

class RecognitionTool extends Component {

    state = {
        draggedFiles: null,
    }


    droppingFilesFromDiscHandler = (files, event) => {

        this.setState({
            draggedFiles: files
        });
        
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

                <LeftSiteBar czyTopPart="true" desc="Tutaj opis do rozpoznawania" >

                    <ButtonLeftBar napis="Rozpocznij rozpoznawanie" iconType="fa-comments" whenClicked={null} />
                    <ButtonLeftBar napis="Zapisz wynik na Twoim dysku" disabled={true} iconType="fa-download" whenClicked={null}/>
                    <ButtonLeftBar napis="Zapisz wynik w repozytorium" disabled={true} iconType="fa-cloud-download-alt" whenClicked={null}/>

                </LeftSiteBar>



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