import React, { Component } from 'react';
import './DragAndDrop.css';
//import { DropTarget } from 'react-dnd'
//import { NativeTypes } from 'react-dnd-html5-backend'
  

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

    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }
  handleDragOut = (e) => {

    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
  }
  handleDrop = (e) => {

    
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    //checking if files are from local storage
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.whenDropped(e.dataTransfer.files)
      e.dataTransfer.clearData()
      this.dragCounter = 0    
    } 
    
    //checking if files come from repo
    if(e.dataTransfer.getData("fileId").length > 0){

      //składam obiekt z danymi pobranymi z repo
      const draggedFile = {
        "fileURL": e.dataTransfer.getData("fileURL"),
        "fileSize": e.dataTransfer.getData("fileSize"),
        "fileId": e.dataTransfer.getData("fileId"),
      }

      this.props.whenDropped(draggedFile)
      e.dataTransfer.clearData();

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

      <div className="DragAndDrop folder" style={dragAndDropStyles} ref={this.dropRef} >
      

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
export default DragAndDrop;