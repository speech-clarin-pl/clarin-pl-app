import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ProjectListItem.css';

const projectListItem = (props) => {
    return(
        <Aux>
             <tr className="ProjectListItem">   
                <th scope="row" className="projectTitle">
                    <span onClick={props.wyborprojektu} > {props.title} </span>
                </th>
                <td>{props.owner}</td>
                <td>{props.modified}</td>
                <td>
                    <span onClick={props.duplicateProject}><i className={["fas", "fa-clone", "ProjectIcon"].join(' ')}></i></span>
                    <span onClick={props.editName}><i className={["fas", "fa-pen", "ProjectIcon"].join(' ')}></i></span>
                    <span onClick={props.shareProject}><i className={["fas", "fa-share-alt", "ProjectIcon"].join(' ')}></i></span>
                    <span onClick={props.deleteProject}><i className={["fas", "fa-trash-alt", "ProjectIcon"].join(' ')}></i></span>
                </td>
			</tr>
        </Aux>
    );
}

export default projectListItem;