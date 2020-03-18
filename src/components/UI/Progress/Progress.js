import React, { Component } from 'react'
import './Progress.css'

class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {

    let classNameForSuccess = "Progress";

    if(this.props.progress === 100){
      classNameForSuccess = "Progress success";
    } else {
      classNameForSuccess = "Progress";
    }

    return (
      <div className="ProgressProgressBar">
        <div
          className={classNameForSuccess}
          style={{ width: this.props.progress + '%' }}
        />
      </div>
    )
  }
}



export default Progress