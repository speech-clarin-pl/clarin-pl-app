import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ProjectListItem.css';

const projectListItem = (props) => {
    return(
        <Aux>
             <tr className="ProjectListItem">   
                <th scope="row">
                    <a onClick={props.wyborprojektu}> {props.title} </a>
                </th>
                <td>{props.owner}</td>
                <td>{props.modified}</td>
                <td>
                    <a onClick={props.duplicateProject}><i className={["fas", "fa-clone", "ProjectIcon"].join(' ')}></i></a>
                    <a onClick={props.editName}><i className={["fas", "fa-pen", "ProjectIcon"].join(' ')}></i></a>
                    <a onClick={props.shareProject}><i className={["fas", "fa-share-alt", "ProjectIcon"].join(' ')}></i></a>
                    <a onClick={props.deleteProject}><i className={["fas", "fa-trash-alt", "ProjectIcon"].join(' ')}></i></a>
                </td>
			</tr>
        </Aux>
    );
}

export default projectListItem;