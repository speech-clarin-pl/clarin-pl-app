import React, { Component } from 'react';
import Konva from 'konva';

class CustomPointMarker{

    constructor(options) {
        console.log('[CustomPointMarker] construction')
        this._options = options;
    }
  
    init = (group) => {
        const layer = this._options.layer;
        const height = layer.getHeight();
    
        this._handle = new Konva.Rect({
          x:      -20,
          y:      40,
          width:  40,
          height: 50,
          fill:   this._options.color
        });
    
        this._line = new Konva.Line({
          points:      [0.5, 0, 0.5, height], // x1, y1, x2, y2
          stroke:      this._options.color,
          strokeWidth: 1
        });

    
        group.add(this._handle);
        group.add(this._line);

    }

    attachListeners = () => {

      console.log(this._options);

      const layer = this._options.layer;

      this._handle.on('mouseenter', function(){
        console.log("mouseover")
        const highlightColor = '#ff0000';
        this._handle.fill(highlightColor);
        this._line.stroke(highlightColor);
        layer.draw();
      });
      
      this._handle.on('mouseleave', function(){
        console.log("mouseleave")
        const defaultColor = this._options.color;
        this._handle.fill(defaultColor);
        this._line.stroke(defaultColor);
        layer.draw();
      });
    }

  
    fitToView = () => {


        const layer = this._options.layer;
        const height = layer.getHeight();
        
        this._line.points([0.5, 0, 0.5, height]);
    }
  
    timeUpdated(time) {
        console.log('Marker time', time);
    }
  
    destroy() {
        console.log('Marker destroyed');
    }
};
  

export default CustomPointMarker;
