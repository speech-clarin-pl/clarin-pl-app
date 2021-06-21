import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './G2PTool.css';
import { connect } from 'react-redux';
import * as G2PActions from '../../../store/actions/index';

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
                    <div className="col-md-6">
                        <div className="alert alert-primary" role="alert">
                            1) Wpisz wyrazy jeden po drugim, każdy w nowej linii po znaku enter.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="alert alert-primary" role="alert">
                            <p>Wybierz format wyniku:</p>
                            <div onChange={this.onChangeValue}>
                                
                                <input type="radio" id="alpha" name="lan" value="alpha" checked={this.state.radioSelection === "alpha"}/>
                                <label for="alpha">ALPHA</label>
                                <input type="radio" id="sampa" name="lan" value="sampa" checked={this.state.radioSelection === "sampa"}/>
                                <label for="sampa">SAMPA</label> 
                                <input type="radio" id="ipa" name="lan" value="ipa" checked={this.state.radioSelection === "ipa"}/>
                                <label for="ipa">IPA</label>
                            </div>
                            <button type="button" className="btn btn-primary btn-block op-btn" onClick={this.makeTranscript}>
                                    Transkrybuj
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder="Słowa wejściowe" >
                    
                        </textarea>
                    </div>
                    <div className="col-md-6">
                        <textarea id="g2p" name="g2pinput" rows="10" style={{width: '100%'}} placeholder="Słowa przetranskrybowane na postać fonetyczną">
                        
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
          onTranscribe: (alphabet, setOfWords) => dispatch(G2PActions.startG2P(alphabet, setOfWords)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(G2PTool);