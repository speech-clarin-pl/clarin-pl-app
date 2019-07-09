import React, { Component } from 'react';
import './DragAndDrop.css';

const dragAndDropStyles = {
  position: 'relative',
};

const dropIndicationStyles = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  width: '100%',
  height: '100%',
  color: '#3498db',
  backgroundColor: 'rgba(255,255,255,0.9)',
  border: '4px dotted #3498db',
  borderRadius: '10px',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
};



class DragAndDrop extends Component {
  state = {
    drag: false
  }

  dropRef = React.createRef();
 
  handleDrag = (e) => {
    console.log("handleDrag")
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    console.log("handleDragIn " + this.dragCounter)
    //console.log(e)
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }
  handleDragOut = (e) => {
    console.log("handleDragOut " + this.dragCounter)
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
  }
  handleDrop = (e) => {
    console.log("handleDrop")
    console.log(e.dataTransferItem)
    console.log(e.target)
    console.log(e.currentTarget)
    console.log(e.dataTransfer)
    console.log(e.path)
    console.log(e.srcElement)
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.whenDropped(e.dataTransfer.files)
      e.dataTransfer.clearData()
      this.dragCounter = 0    
    }
  }
  componentDidMount() {
    let div = this.dropRef.current;
    this.dragCounter = 0  
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }
  render() {
    return (

      <div className="DragAndDrop" style={dragAndDropStyles} ref={this.dropRef} >

        {
            this.state.drag?
              <div className="dropIndication" style={dropIndicationStyles}>
                  <h2>Upuść pliki tutaj</h2>
              </div> 
              : 
              null
        }

        {this.props.children}
      </div>

    )
  }
}
export default DragAndDrop