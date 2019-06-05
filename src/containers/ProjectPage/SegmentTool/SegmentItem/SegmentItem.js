import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './SegmentItem.css';
import SegmentAudioItem from '../SegmentAudioItem/SegmentAudioItem';

const segmentItem = (props) => {

    return(
        <Aux>
     
            
            <div className={["row", "pairedItem", "SegmentItem"].join(' ')}>

                <div className="col-sm audio-info">

                   
                    
                </div>
                <div className="col-sm-auto pair-status">
                {
                    <div>
                        <span className="segmenticon preview"><i className="fas fa-check"></i></span>
                        
                    </div>
                }
                    
                </div>
                <div className="col-sm txt-info">
                     
                </div>

                <div className="col-sm-auto pair-icons">
                    
                    <i className="fas fa-times"></i>
                </div>
            </div>


        </Aux>
    );
}

export default segmentItem;