import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './LeftSiteBar.css';


const leftSiteBar = (props) => {

    return(
        <Aux>

            <div className="LeftSiteBar">
				<div className={props.czyTopPart==="true" ? "topPart" : "resetTopPart"}>
					
				</div>

                <div className={props.czyTopPart==="true" ? "hintPanel" : "resetHintPanel"}>
                            <div className="btn-group-vertical btn-block" id="hint-buttons">

                            </div>

                            <div id="hint-content"  data-scrollbar>
                                <div className="container-fluid">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis, velit eu facilisis fermentum, enim ligula commodo ex, vitae ornare neque nisi ut turpis. Nullam malesuada nisl id magna elementum, ut congue massa eleifend. 

                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis, velit eu facilisis fermentum, enim ligula commodo ex, vitae ornare neque nisi ut turpis. Nullam malesuada nisl id magna elementum, ut congue massa eleifend. 

                                </div> 
                            </div>
                </div>
            </div>
        </Aux>
    );
}

export default leftSiteBar;