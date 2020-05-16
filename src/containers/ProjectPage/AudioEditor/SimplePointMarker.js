import React, { Component } from 'react';
import Konva from 'konva';

class SimplePointMarker {
	constructor(options) {
		console.log('[SimplePointMarker] constructor')
		this._options = options;
	}

	init(group) {
		this._group = group;

		// Vertical Line - create with default y and points, the real values
		// are set in fitToView().
		this._line = new Konva.Line({
		  x:           0,
		  y:           0,
		  stroke:      this._options.color,
		  strokeWidth: 1
		});

		group.add(this._line);

		this.fitToView();
	  };

	  fitToView() {
		var height = this._options.layer.getHeight();

		this._line.points([0.5, 0, 0.5, height]);
	  };

}
  

export default SimplePointMarker;
