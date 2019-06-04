import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './SegmentAudioItem.css';
import PropTypes from 'prop-types';

const segmentAudioItem = (props) => {

    return(
        <Aux>
     
     
                    <span className="fileAudio">
                        <div className="row">
                                <div className="col-sm-auto">
                                        <i className="fas fa-arrows-alt-v"></i>
                                </div>
                                <div className="col-sm">
                                        <span className="file-name">{props.filename}</span>
                                </div>
                                <div className="col-sm-auto">
                                        <i className="fas fa-play"></i>
                                </div>
                        </div>
                    </span>
        </Aux>
    );
}

segmentAudioItem.propTypes = {
    filename: PropTypes.string,
 };

export default segmentAudioItem;