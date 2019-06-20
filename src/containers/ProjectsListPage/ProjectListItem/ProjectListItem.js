import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ProjectListItem.css';
import {Link} from 'react-router-dom';

const projectListItem = (props) => {

    

          // console.log(props.key)

    return(
        <Aux>
             <tr className="ProjectListItem">   
                <td className="projectTitle">

                    <Link to={{
                            pathname: "/projects/" + encodeURIComponent(props.projektID),
                            state: {
                                projectTitle: props.title,
                                projectOwner: props.owner,
                            }
                        }}> {props.title}</Link>

                </td>
                <td>{props.owner}</td>
                <td>{props.modified}</td>
                <td>
                    {
                    //<span onClick={props.duplicateProject}><i className={["fas", "fa-clone", "ProjectIcon"].join(' ')}></i></span>
                    //<span onClick={props.shareProject}><i className={["fas", "fa-share-alt", "ProjectIcon"].join(' ')}></i></span>
                    }
                    <span onClick={props.editName}><i className={["fas", "fa-pen", "ProjectIcon"].join(' ')}></i></span>
                    <span onClick={props.deleteProject}><i className={["fas", "fa-trash-alt", "ProjectIcon"].join(' ')}></i></span>
                </td>
			</tr>
        </Aux>
    );
}

export default projectListItem;