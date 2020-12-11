import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ProjectList.css';

const projectsList = (props) => {

    const ifLoading = props.ifLoading;

     const listHeader = (
            <tr className="thead-dark">
                <td className="title">Tytuł</td>
                {
                    //<tSuperMpongoDBd >Właściciel</td>
                }
                <td> Identyfikator</td>
                <td >Data utworzenia</td>
                <td >Akcje</td>
            </tr>
        );
 

    return(
        <Aux>
            <div className={"ProjectList"}>
                {props.siteBar}
                <table className="table">
                    <tbody>
                        {listHeader}
                        {props.children}
                    </tbody>
                </table>
            </div>
        </Aux>
    );
}

export default projectsList;