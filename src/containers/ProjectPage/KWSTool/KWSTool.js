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
           containerId: null,
           keywords:null
        }
    }

    makeKWS = (event) => {
        event.preventDefault();
        this.props.onStartKWS(this.state.containerId, this.state.keywords,this.props.token);
    }

    kwsContainerIDChange = (event) => {
        this.setState({containerId: event.target.value});
    }
	
    kwsKeywordsChanged = (event) => {
        this.setState({keywords: event.target.value});
    }

	render() {

        let outputfield = this.props.intl.formatMessage(
            {
                id:"KWSTool-tutajRezultaty",
                description: 'informacja ze tutaj rezultaty', 
                defaultMessage: "Tutaj pokażą się rezultaty", 
            }
        );
        if(this.props.kwsInProgress){
            outputfield = this.props.intl.formatMessage(
                {
                    id:"KWSTool-proszeczekac",
                    description: 'informacja ze prosze czekac', 
                    defaultMessage: "Proszę czekać ...", 
                }
            )
        } else {
            if(this.props.ifKwsError){
                outputfield = "Error";
            } else {
                if(this.props.kwsResults){
                    outputfield = <textarea 
                                    id="g2p" 
                                    name="g2pinput" 
                                    rows="10" 
                                    style={{width: '100%'}} 
                                    placeholder="Here the output will show up"
                                    value={this.props.kwsResults}
                                    >
                                    </textarea>
                }
            }
        }


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
                        <textarea 
                            id="g2p" 
                            name="g2pinput" 
                            rows="10" 
                            style={{width: '100%'}} 
                            placeholder="Słowa kluczowe" 
                            onChange={this.kwsKeywordsChanged}
                            value={this.state.keywords}>
                    
                        </textarea>
                    </div>
                    <div className="col-md-6">
                        {
                            outputfield
                        }
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

                                <input id="kwsContainerId" type="text" value={this.state.containerId} style={{width: '100%'}} placeholder={
                                    this.props.intl.formatMessage(
                                        {
                                            id:"KWSTool-wklejIdKonteneraKWS",
                                            description: 'placeholder do id kontenera', 
                                            defaultMessage: "Wklej tutaj id kontenera", 
                                        }
                                    )
                                } onChange={this.kwsContainerIDChange}/>
                            </p>
 
                            <button type="button" className="btn btn-primary btn-block op-btn" disabled={(!this.state.keywords) || this.props.kwsInProgress} onClick={this.makeKWS}>
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
        kwsResults: state.KWSR.kwsResults,
        kwsInProgress: state.KWSR.kwsInProgress,
        ifKwsError: state.KWSR.iferror,
	}
}

const mapDispatchToProps = dispatch => {
	return {
          onStartKWS: (containerId, setOfWords, token) => dispatch(KWSActions.runKWS(containerId, setOfWords, token)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(KWSTool));