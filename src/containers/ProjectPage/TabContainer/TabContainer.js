import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TabContainer.css';
import Tab from './Tab/Tab';

const tabContainer = (props) => {

    let activeTab = props.displayedTab;

    let listToRender = Object.keys(props.listOfTabs).map((tabkey,i)=>{

        let activetab = false;

        activeTab === props.listOfTabs[tabkey] ? activetab = true : activetab = false;

        return (
                    <Tab key={tabkey} ifActive={activetab} title={props.listOfTabs[tabkey]} whenClickTab={props.clickTab}/>
        )
    });

    return(
        <Aux>

            <div className="TabContainer">
                <ul className={["nav nav-tabs", "darkbg"].join(' ')}>

                    {listToRender}
                    {console.log("aaa: "+props.displayedTab)}
                </ul>

                {props.children}

                
            </div>
        </Aux>
    );
}

export default tabContainer;