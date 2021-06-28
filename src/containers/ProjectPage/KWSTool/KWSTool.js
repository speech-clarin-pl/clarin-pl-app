import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './KWSTool.css';
import { connect } from 'react-redux';
import * as KWSActions from '../../../store/actions/index';
import {injectIntl, FormattedMessage} from 'react-intl';


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
                    <div className="col-md-12">
                        <div className="alert alert-primary" role="alert">
                            <FormattedMessage
                                id="KWSTool-step1"
                                description="instrukcja aby wpisać wyrazy jedem po drugim w KWS" 
                                defaultMessage=" Wpisz słowa kluczowe jeden po drugim, każdy w nowej linii po znaku enter." 
                            />
                           
                        </div>
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder="Słowa kluczowe" >
                    
                        </textarea>
                    </div>
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder="Here the output will show up">
                        
                        </textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-primary" role="alert">
                            <p>
                                <FormattedMessage
                                    id="KWSTool-step2"
                                    description="Instrukcja Wklej identyfikator wybranego kontenera z repozytorium" 
                                    defaultMessage="Wklej identyfikator wybranego kontenera z repozytorium" 
                                />
                            </p>
 
                            <button type="button" className="btn btn-primary btn-block op-btn" onClick={this.makeKWS}>
                                <FormattedMessage
                                    id="KWSTool-buttonmsg"
                                    description="Napis na przycisku kws" 
                                    defaultMessage="Uruchom detekcję słów kluczowych" 
                                />
                            </button>
                        </div>
                        
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


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(KWSTool));