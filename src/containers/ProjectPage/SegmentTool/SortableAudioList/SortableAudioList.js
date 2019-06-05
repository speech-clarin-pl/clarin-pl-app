import uuid  from 'uuid';
import React from 'react';
import Sortable from 'react-sortablejs';
import PropTypes from 'prop-types';
import './SortableAudioList.css';
 
// Functional Component
const sortableAudioList = ({ items, onChange }) => {
    
    let sortable = null; // sortable instance

    /*
    const reverseOrder = (evt) => {
        const order = sortable.toArray();
        onChange(order.reverse());
    };
    */

   // console.log(items);

    const listItems = items.map((val,i) => (
    
        <div className="SortableAudioList" key={val.id}  data-id={val.id}>
            
            <div className="row">
                    <div className="col-sm-auto withReference">
                            <span className="orderNo">{i+1 }</span>
                            <i className="fas fa-arrows-alt-v"></i>
                    </div>
                    <div className="col-sm">
                            <span className="file-name">{val.file.name}</span>
                    </div>
                    <div className="col-sm-auto">
                            <i className="fas fa-play preview"></i>
                    </div>
            </div>
        </div>
    ));
 
    return (
        <div>
          
            <Sortable
                // Sortable options (https://github.com/RubaXa/Sortable#options)
                options={{
                    handle: '.fa-arrows-alt-v', // handle's class
                    animation: 150
                }}
 
                // [Optional] Use ref to get the sortable instance
                // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
                ref={(c) => {
                    if (c) {
                        sortable = c.sortable;
                    }
                }}
 
                // [Optional] A tag or react component to specify the wrapping element. Defaults to "div".
                // In a case of a react component it is required to has children in the component
                // and pass it down.
                tag="div"
 
                // [Optional] The onChange method allows you to implement a controlled component and keep
                // DOM nodes untouched. You have to change state to re-render the component.
                // @param {Array} order An ordered array of items defined by the `data-id` attribute.
                // @param {Object} sortable The sortable instance.
                // @param {Event} evt The event object.
                onChange={(order, sortable, evt) => {
                    onChange(order);
                }}
            >
                {listItems}
            </Sortable>
        </div>
    );
};
 
sortableAudioList.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func
};
 
export default sortableAudioList;
