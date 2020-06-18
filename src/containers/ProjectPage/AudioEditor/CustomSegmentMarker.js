import React, { Component } from 'react';
import Konva from 'konva';

class CustomSegmentMarker{

    constructor(options) {
        console.log('[CustomSegmentMarker] constructor')
        this._options = options;
    }
  
    init = (group) => {

        this._group = group;

        this._label = new Konva.Label({
          x: 0.5,
          y: 0.5
        });

        var color = this._options.segment.color;

        this._tag = new Konva.Tag({
          fill:             color,
          stroke:           color,
          strokeWidth:      1,
          pointerDirection: 'down',
          pointerWidth:     10,
          pointerHeight:    10,
          lineJoin:         'round',
          shadowColor:      'black',
          shadowBlur:       10,
          shadowOffsetX:    3,
          shadowOffsetY:    3,
          shadowOpacity:    0.3
        });

        this._label.add(this._tag);

        var labelText = this._options.segment.labelText +
                        (this._options.startMarker ? ' start' : ' end');

        this._text = new Konva.Text({
          text:       labelText,
          fontFamily: 'Calibri',
          fontSize:   14,
          padding:    5,
          fill:       'white'
        });

        this._label.add(this._text);

        // Vertical Line - create with default y and points, the real values
        // are set in fitToView().
        this._line = new Konva.Line({
          x:           0,
          y:           0,
          stroke:      color,
          strokeWidth: 1
        });

        group.add(this._label);
        group.add(this._line);

        this.fitToView();

        var container = document.getElementById('zoomview-container');

        this._group.on('mouseenter', () => {
          console.log("MOUSE ENTER")
          container.style.cursor = 'move';
        });

        this._group.on('mouseleave', () => {
          console.log("MOUSE LEAVE")
          container.style.cursor = 'default';
        });

    }

  
    fitToView = () => {
        var height = this._options.layer.getHeight();

        var labelHeight = this._text.height() + 2 * this._text.padding();
        var offsetTop = 14;
        var offsetBottom = 26;

        this._group.y(offsetTop + labelHeight + 0.5);

        this._line.points([0.5, 0, 0.5, height - labelHeight - offsetTop - offsetBottom]);
    }
  
    timeUpdated(time) {
        console.log('Marker time', time);
    }
  
    destroy() {
        console.log('Marker destroyed');
    }
};
  

export default CustomSegmentMarker;
