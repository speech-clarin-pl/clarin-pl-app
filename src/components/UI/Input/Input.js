import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;
    let validationError = null;

    const inputClasses = ['Input', 'form-control'];


    if(props.invalid && props.touched){
        inputClasses.push('is-invalid');
        validationError = <p>Wprowadź poprawdną wartość!</p>;
    }

    switch(props.inputtype) {
        case('input'):
            inputElement = <input 
                onChange={props.whenchanged}
                className={inputClasses.join(' ')} {...props}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
                onChange={props.whenchanged}
                className={inputClasses.join(' ')}
                 {...props}/>
            break;
        default:
            inputElement = <input 
                onChange={props.whenchanged}
                className={inputClasses.join(' ')} {...props}/>
    }

    return (
        <div className="Input">
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input;