import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RepoBar.css';

const repoBar = (props) => {

    return(
        <Aux>
        <div className="RepoBar">
            <div className="topPart">
				<div className="repoTab" >
					Repozytorium
				</div>
				<div className="repoNav" >
					Navigation to repo
				</div>
			</div>
			<div className="mainRepoContent" data-scrollbar>
				<p>TO DO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec tellus diam. Quisque rhoncus facilisis metus et pulvinar. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>

				<p>TO DO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec tellus diam. Quisque rhoncus facilisis metus et pulvinar. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>

			
			</div>
		</div>
            
        </Aux>
    );
}

export default repoBar;