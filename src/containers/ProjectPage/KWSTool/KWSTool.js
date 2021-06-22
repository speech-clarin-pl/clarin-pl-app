import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './KWSTool.css';
import { connect } from 'react-redux';
import * as KWSActions from '../../../store/actions/index';

class KWSTool extends Component {


	constructor(){
        super();
        this.state = {
           
        }
    }



    makeKWS = (event) => {
        event.preventDefault();
        this.props.onStartKWS("jakisKontainerID", ["SłowoKluczowe1", "SłowoKluczowe2"])
    }
	

	render() {

		return (
			<Aux>
				

                <div className="row">
                    <div className="col-md-6">
                        <div className="alert alert-primary" role="alert">
                            1) Wpisz słowa kluczowe jeden po drugim, każdy w nowej linii po znaku enter.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="alert alert-primary" role="alert">
                            <p>Wybierz plik dźwiękowy z repozytorium</p>
 
                            <button type="button" className="btn btn-primary btn-block op-btn" onClick={this.makeKWS}>
                                    Wyszukaj słowa kluczowe
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder="Słowa kluczowe" >
                    
                        </textarea>
                    </div>
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder="Rezultat">
                        
                        </textarea>
                    </div>
                </div>

                
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.homeR.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
          onStartKWS: (containerId, setOfWords) => dispatch(KWSActions.startKWS(containerId, setOfWords)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(KWSTool);