import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './SegmentItem.css';
import SegmentAudioItem from '../SegmentAudioItem/SegmentAudioItem';

const segmentItem = (props) => {

    return(
        <Aux>
     
            
            <div className={["row", "pairedItem", "SegmentItem"].join(' ')}>

                <div className="col-sm-auto pair-order">

                        <span className="pair-order-icon">1</span>
                </div>

                <div className="col-sm audio-info">

                    <SegmentAudioItem filename={props.audioFileName} />

                    
                </div>
                <div className="col-sm-auto pair-status">
                {
                //	<span className="ready"><i className="fas fa-check"></i> Gotowe</span>
                //	<a href="#" className="download"><i className="fas fa-download"></i></a>
                //	<a href="#" className="download-repo"><i className="fas fa-cloud-download-alt"></i></a>
                }
                    
                </div>
                <div className="col-sm txt-info">

                    <span className="fileText">

                        <div className="row">
                                    <div className="col-sm-auto">
                                        <i className="fas fa-arrows-alt-v"></i>
                                    </div>
                                    <div className="col-sm">
                                            <span className="file-name">Lorem ipsum dolor.txt </span>
                                    </div>
                                    <div className="col-sm-auto">
                                            <i className="fas fa-eye"></i>
                                    </div>
                        </div>

                    </span>
                </div>

                <div className="col-sm-auto pair-icons">
                    
                    <i className="fas fa-times"></i>
                </div>
            </div>


        </Aux>
    );
}

export default segmentItem;