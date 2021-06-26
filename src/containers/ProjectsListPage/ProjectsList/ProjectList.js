import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ProjectList.css';
import {injectIntl, FormattedMessage} from 'react-intl';

const projectsList = (props) => {

    //const ifLoading = props.ifLoading;

     const listHeader = (
            <tr className="thead-dark">
                <td className="title">
                    <FormattedMessage
                        id="ProjectList-nazwa"
                        description="nazwa projektu" 
                        defaultMessage="Nazwa" 
                    />
                </td>
                <td>
                    <FormattedMessage
                        id="ProjectList-id"
                        description="id projektu" 
                        defaultMessage="Identyfikator" 
                    />
                </td>
                <td>
                    <FormattedMessage
                        id="ProjectList-createDate"
                        description="data utworzenia" 
                        defaultMessage="Data utworzenia" 
                    />
                </td>
                <td >
                    <FormattedMessage
                        id="ProjectList-akcje"
                        description="akcje" 
                        defaultMessage="Akcje" 
                    />
                </td>
            </tr>
        );
 

    return(
        <Aux>
           
            <div className={"ProjectList"}>
                {props.siteBar}
                <div className="containerForListProject">
                    <table className="table">
                        <tbody>
                            {listHeader}
                            {props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        </Aux>
    );
}

export default injectIntl(projectsList);