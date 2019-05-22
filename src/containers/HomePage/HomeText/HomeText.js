import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './HomeText.css';

const hometext = (props) => {

    let myclasses = ["container", "HomeText"];
    return(
        <Aux>
            <div className={myclasses.join(' ')}>
                <div className="row">
                    <dir className="col">
                        <h2>Narzędzia do rozpoznawania mowy</h2>
                        <p>consectetur adipiscing elit. Pellentesque id eleifend magna. In ut varius tortor, quis sagittis felis. Suspendisse dapibus lorem at dui interdum, a placerat purus sodales. Vestibulum mattis mauris rhoncus diam posuere iaculis. Quisque ultricies, purus ac imperdiet elementum, massa lacus rhoncus magna, non molestie urna risus sed risus. Nunc euismod augue ligula, id suscipit odio vestibulum id. Donec malesuada odio at lacus ullamcorper fringilla. Mauris auctor commodo mattis. Nullam rutrum sodales arcu. Phasellus euismod tellus id leo imperdiet, id vehicula justo blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>

                        <h2>Przetwarzanie dużej ilości plików</h2>
                        <p>consectetur adipiscing elit. Pellentesque id eleifend magna. In ut varius tortor, quis sagittis felis. Suspendisse dapibus lorem at dui interdum, a placerat purus sodales. Vestibulum mattis mauris rhoncus diam posuere iaculis. Quisque ultricies, purus ac imperdiet elementum, massa lacus rhoncus magna, non molestie urna risus sed risus. Nunc euismod augue ligula, id suscipit odio vestibulum id. Donec malesuada odio at lacus ullamcorper fringilla. Mauris auctor commodo mattis. Nullam rutrum sodales arcu. Phasellus euismod tellus id leo imperdiet, id vehicula justo blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    </dir>
                    <dir className="col">
                        <h2>Bezpieczeństwo danych</h2>
                        <p>consectetur adipiscing elit. Pellentesque id eleifend magna. In ut varius tortor, quis sagittis felis. Suspendisse dapibus lorem at dui interdum, a placerat purus sodales. Vestibulum mattis mauris rhoncus diam posuere iaculis. Quisque ultricies, purus ac imperdiet elementum, massa lacus rhoncus magna, non molestie urna risus sed risus. Nunc euismod augue ligula, id suscipit odio vestibulum id. Donec malesuada odio at lacus ullamcorper fringilla. Mauris auctor commodo mattis. Nullam rutrum sodales arcu. Phasellus euismod tellus id leo imperdiet, id vehicula justo blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                        
                        <h2>Łatwość obsługi</h2>
                        <p>consectetur adipiscing elit. Pellentesque id eleifend magna. In ut varius tortor, quis sagittis felis. Suspendisse dapibus lorem at dui interdum, a placerat purus sodales. Vestibulum mattis mauris rhoncus diam posuere iaculis. Quisque ultricies, purus ac imperdiet elementum, massa lacus rhoncus magna, non molestie urna risus sed risus. Nunc euismod augue ligula, id suscipit odio vestibulum id. Donec malesuada odio at lacus ullamcorper fringilla. Mauris auctor commodo mattis. Nullam rutrum sodales arcu. Phasellus euismod tellus id leo imperdiet, id vehicula justo blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    </dir>
                </div>
            </div>
        </Aux>
    );
}

export default hometext;