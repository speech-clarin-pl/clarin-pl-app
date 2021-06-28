import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './G2PTool.css';
import { connect } from 'react-redux';
import * as G2PActions from '../../../store/actions/index';
import {injectIntl, FormattedMessage} from 'react-intl';

class G2PTool extends Component {


	constructor(){
        super();
        this.state = {
            radioSelection: 'alpha',
        }
    }

    onChangeValue=(event) => {
        this.setState({
            radioSelection:event.target.value
        })
    }

    makeTranscript = (event) => {
        event.preventDefault();
        this.props.onTranscribe(this.state.radioSelection, ["do przetranskrybowania jeden", "do przetranskrybowania dwa"])
    }
	

	render() {

		return (
			<Aux>
				

                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-primary" role="alert">
                            <FormattedMessage
                                id="G2PTool-step1"
                                description="instrukcja aby wpisać wyrazy jedem po drugim w G2P" 
                                defaultMessage="Wpisz wyrazy jeden po drugim, każdy w nowej linii po znaku enter." 
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder={
                             this.props.intl.formatMessage(
                                {
                                  id:"G2PTool-inputWords",
                                  description: 'Placeholder na polu do wpisywania słów', 
                                  defaultMessage: 'Słowa wejściowe oddzielone enterem', 
                                }
                              )
                        } >
                    
                        </textarea>
                    </div>
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder="Here the output will show up">
                        
                        </textarea>
                    </div>
                </div>

                <div className="row">
                <div className="col-md-12">
                        <div className="alert alert-primary" role="alert" style={{textAlign:'center'}}>
                            <p><FormattedMessage
                                id="G2PTool-wybierzAlfabetInfo"
                                description="instrukcja aby wybrać alfabet" 
                                defaultMessage="Wybierz alfabet" 
                            />: </p>
                            <div onChange={this.onChangeValue}>
                                <span className="alphabetCheck">
                                    <input type="radio" id="alpha" name="lan" value="alpha" checked={this.state.radioSelection === "alpha"}/>
                                    <label for="alpha">ALPHA</label>
                                </span>
                                <span className="alphabetCheck">
                                    <input type="radio" id="sampa" name="lan" value="sampa" checked={this.state.radioSelection === "sampa"}/>
                                    <label for="sampa">SAMPA</label> 
                                </span>
                                <span className="alphabetCheck">
                                    <input type="radio" id="ipa" name="lan" value="ipa" checked={this.state.radioSelection === "ipa"}/>
                                    <label for="ipa">IPA</label>
                                </span>
                            </div>
                            <button type="button" className="btn btn-primary btn-block op-btn" onClick={this.makeTranscript}>
                                <FormattedMessage
                                    id="G2PTool-transkrybujBtn"
                                    description="Transkrybuj btn" 
                                    defaultMessage="Transkrybuj" 
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
          onTranscribe: (alphabet, setOfWords) => dispatch(G2PActions.startG2P(alphabet, setOfWords)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(G2PTool));