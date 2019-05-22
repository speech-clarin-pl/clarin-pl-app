import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TabContainer.css';
import Tab from './Tab/Tab';

const tabContainer = (props) => {

    //let activeTab = props.displayedTab;

    /*
    let listToRender = Object.keys(props.listOfTabs).map((tabkey,i)=>{

        let activetab = false;

        activeTab === props.listOfTabs[tabkey] ? activetab = true : activetab = false;

        return (
                    <Tab key={tabkey} ifActive={activetab} title={props.listOfTabs[tabkey]} whenClickTab={props.clickTab}/>
        )
    });
    */

   // console.log(props.children.props.children[0].props.path);

   

    //tworze dynamicznie taby na podstawie przekazanych children
    //const childrens = props.children.props.children.map((comp, i) =>{
    //    return (
    //        <Tab ifActive={false} key={"abc"+i} title="Dashboard" whereToLink={comp.props.path}/>
    //    )
    //});

  

    return(
        <Aux>

            <div className="TabContainer">
                <ul className={["nav nav-tabs", "darkbg"].join(' ')}>
                                    
                </ul>

                {props.children}

            </div>
        </Aux>
    );
}

export default tabContainer;