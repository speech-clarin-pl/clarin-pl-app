import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './G2PTool.css';
import { connect } from 'react-redux';

class G2PTool extends Component {


	state = {
       
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
                            <form>
                                <p>Wybierz format wyniku:</p>
                                <input type="radio" id="alpha" name="lan" value="alpha"/>
                                <label for="alpha">ALPHA</label>
                                <input type="radio" id="sampa" name="lan" value="sampa"/>
                                <label for="sampa">SAMPA</label> 
                                <input type="radio" id="ipa" name="lan" value="ipa"/>
                                <label for="ipa">IPA</label>
                                <button type="button" className="btn btn-primary btn-block op-btn">
                                    Transkrybuj
                                </button>
                            </form>
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
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(G2PTool);