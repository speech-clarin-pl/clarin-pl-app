import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RepoBar.css';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

const apiOptions = {
	...connectorNodeV1.apiOptions,
	apiRoot: `http://127.0.0.1:1234` // Or you local Server Node V1 installation.
  }

  const fileManager = (
	<div style={{ height: '480px' }}>
	   <FileManager>
		 <FileNavigator
		   id="filemanager-1"
		   api={connectorNodeV1.api}
		   apiOptions={apiOptions}
		   capabilities={connectorNodeV1.capabilities}
		   listViewLayout={connectorNodeV1.listViewLayout}
		   viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
		 />
	   </FileManager>
	 </div>
   );

  
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
				{fileManager}
			
			</div>
		</div>
            
        </Aux>
    );
}

export default repoBar;