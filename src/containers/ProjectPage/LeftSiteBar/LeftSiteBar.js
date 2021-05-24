import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './LeftSiteBar.css';


const leftSiteBar = (props) => {

    return(
        <Aux>

            <div className="LeftSiteBar" id="LeftSiteBar">
				<div className={props.czyTopPart==="true" ? "topPart" : "resetTopPart"}>
					
				</div>

                <div className={props.czyTopPart==="true" ? "hintPanel" : "resetHintPanel"}>
                            <div className="btn-group-vertical btn-block" id="hint-buttons" data-tut="edytorUruchomDlaWszystkich">
                                {props.children}
                            </div>

                            <div id="hint-content"  data-scrollbar data-tut="EdytorPodpowiedzi">
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