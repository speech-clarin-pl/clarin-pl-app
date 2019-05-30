import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './LeftSiteBar.css';


const leftSiteBar = (props) => {

    return(
        <Aux>

            <div className="LeftSiteBar">
				<div className={props.czyTopPart==="true" ? "topPart" : "resetTopPart"}>
					
				</div>

                <div className={props.czyTopPart==="true" ? "hintPanel" : "resetHintPanel"}>
                            <div className="btn-group-vertical btn-block" id="hint-buttons">

                                {props.children}

                            </div>

                            <div id="hint-content"  data-scrollbar>
                                <div className="container-fluid texts">
                                    {props.desc} 
                                </div> 
                            </div>
                </div>
            </div>
        </Aux>
    );
}

export default leftSiteBar;