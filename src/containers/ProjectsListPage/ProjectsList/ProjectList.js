import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ProjectList.css';

const projectsList = (props) => {

    return(
        <Aux>
            <div className={"ProjectList"}>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Tytuł</th>
                        <th scope="col">Właściciel</th>
                        <th scope="col">Data modyfikacji</th>
                        <th scope="col">Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.children}
                    </tbody>
                </table>
            </div>
        </Aux>
    );
}

export default projectsList;