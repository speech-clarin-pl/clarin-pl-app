import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import './SegmentTool.css';
import SegmentItem from './SegmentItem/SegmentItem';

const segmentTool = (props) => {

    return(
        <Aux>
            <SettingBar />
            
            <section className="Content" data-scrollbar>

						<div className={["container-fluid", "SegmentTool"].join(' ')}>
							<div className="tool-desc">
								
								<p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
							</div>

							<div className="tool-body">

							<div className="row">
								<div className="col-md">
									<div className="uploadAudio" ondrop="" ondragover="">
										<h2>Wgraj pliki audio</h2>
										<p>Z dysku bądź z repozytorium</p>
										<i className="fas fa-upload"></i> <i className="fas fa-cloud-upload-alt"></i>
									</div>

								</div>
								<div className="col-md">
										<div className="uploadTxt" ondrop="" ondragover="">
											<h2>Wgraj pliki tekstowe</h2>
											<p>Z dysku bądź z repozytorium</p>
											<i class="fas fa-upload"></i> <i class="fas fa-cloud-upload-alt"></i>
										</div>
								</div>
							</div>


							<div className="file-list">

								<div className={["row", "pairedItem", "header-pair"].join(' ')}>

									<div className="col-sm-auto pair-order">

											
									</div>

									<div className="col-sm audio-info">

										<h3>Lista plików audio</h3>
									</div>
									<div className="col-sm-auto pair-status">
										
									</div>
									<div className="col-sm txt-info">

										<h3>Lista plików tekstowych</h3>
									</div>

									<div className="col-sm-auto pair-icons">
										
										
									</div>
								</div>

                            <SegmentItem />
                            <SegmentItem />
                            <SegmentItem />
                            <SegmentItem />

							</div>
							
							</div>
						
						</div>

					
						<FooterTool />

					</section>
        </Aux>
    );
}

export default segmentTool;