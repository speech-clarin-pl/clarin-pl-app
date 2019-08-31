import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (

    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />

{
    props.show? 

        <div className="Modal">
            
            <div className="modalTitle">
                <h5>{props.modalTitle}</h5>
            </div>
            <div className="modal-body">
                {props.children}
            </div>
        </div>

    :null
}
        {
            /*
            props.show? 
                <div className="Modal"
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    }}>
                        {props.children}
                </div>
                : null
                */
        }
        
                
        {/*
        <div className="Modal"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
            }}>
              
            
            {props.children}
        </div>
          */
        }
    </Aux>
);

export default modal;