import React from 'react';
import Aux from '../../../hoc/Auxiliary';


const confirmationForm = (props) => {
    
        return (
            <Aux>
                <div className="alert alert-warning" role="alert">

                     <p style={{textAlign:'center'}}>{props.messageQuestion}</p>
                     <p style={{textAlign:'center',fontWeight:'bold'}}>{props.projectName}</p>

                </div>
                
                <button 
                    className="btn btn-outline-secondary"
                    onClick={props.onCancel}>
                    Cancel
                </button>

                <button 
                    className="btn btn-primary"
                    onClick={props.onOk}>
                    OK
                </button>

            </Aux>
        )
}

export default confirmationForm