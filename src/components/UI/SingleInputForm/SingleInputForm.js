import React, { Component } from 'react';


class SingleInputForm extends Component {

    state = {
        value: '',
        isValid: false,
    }


    render() {

        const errorMessage = this.props.errorMessage || false;

        return (

            <form onSubmit={this.props.onSubmitHandler}>
                <h5 style={{textAlign:'left'}}>{this.props.title}</h5>
                <hr/>
                {
                    errorMessage !== false ?
                        <div className="alert alert-danger" role="alert">
                            {this.props.errorMessage}
                        </div> : null
                }
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChangeHandler}
                        value={this.props.value} />
                    <div className="input-group-append">
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            {this.props.buttonLabel}
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default SingleInputForm