import React, { Component } from 'react';


class SingleInputForm extends Component {

    state = {
        inputValue: null,
        isValid: false
    }


    render() {

        return (
            <form onSubmit={this.props.onSubmitHandler}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChangeHandler} />
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