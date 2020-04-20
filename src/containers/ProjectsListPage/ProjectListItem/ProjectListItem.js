import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ProjectListItem.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const projectListItem = (props) => {

    

          // console.log(props.key)

    return(
        <Aux>
             <tr className="ProjectListItem">   
                <td className="projectTitle">

                     <a onClick={props.wyborprojektu}>
                        {props.title}
                     </a>
                   

                </td>
                {
                    //<td>{props.owner}</td>
                }
                
                <td>{props.modified}</td>
                <td>
                    {
                    //<span onClick={props.duplicateProject}><i className={["fas", "fa-clone", "ProjectIcon"].join(' ')}></i></span>
                    //<span onClick={props.shareProject}><i className={["fas", "fa-share-alt", "ProjectIcon"].join(' ')}></i></span>
                    }

                    <FontAwesomeIcon icon={faTrash} 
                                          className="ProjectIcon removeProject" 
                                          onClick={props.deleteProject} /> 
                     {
                       // <span onClick={props.editName}><i className={["fas", "fa-pen", "ProjectIcon"].join(' ')}></i></span>
                       //  <span onClick={props.deleteProject}><i className={["fas", "fa-trash-alt", "ProjectIcon"].join(' ')}></i></span>
                     }                     
                    
                </td>
			</tr>
        </Aux>
    );
}

export default projectListItem;