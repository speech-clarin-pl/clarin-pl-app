import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './SettingBar.css';

const settingBar = (props) => {
    return(
        <Aux>
            <div className={"SettingBar"}>
                <nav className="navbar navbar-expand-lg">
                    <div className=" navbar-collapse">
                    
                        Setting here

                    </div>
                </nav>
            </div>
        </Aux>
    );
}

export default settingBar;