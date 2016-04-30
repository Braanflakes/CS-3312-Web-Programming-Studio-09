/*jslint browser: true, indent: 3 */

// CS 3312, spring 2016
// Studio 9
// YOUR NAME(S): Brendan Murphey, Dobby Maxwell

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict';

   // Add functionality to the sketchy area.
   (function () {
      var sketchyCanvas, sketchyContext, updateSketchyCanvas;

      // Get the canvas object and its two-dimensional rendering context.
      sketchyCanvas = document.querySelector('#sketchy');
      sketchyContext = sketchyCanvas && sketchyCanvas.getContext && sketchyCanvas.getContext('2d');
      if (!sketchyContext) {
         return;
      }

      // Size the canvas.
      sketchyCanvas.width = 360;
      sketchyCanvas.height = 360;

      // WRITE YOUR updateSketchyCanvas FUNCTION HERE
      updateSketchyCanvas = function () {

         // Draw the outer circle.
         sketchyContext.beginPath();
         sketchyContext.arc(275, 75, 60, 0, 2 * Math.PI, false);
         sketchyContext.fill();

         // Draw the green arc.
         sketchyContext.beginPath();
         sketchyContext.moveTo(275, 75);
         sketchyContext.arc(275, 75, 57, Math.PI, 3 * Math.PI / 2, false);
         sketchyContext.closePath();
         sketchyContext.fillStyle = 'rgb(0, 255, 0)';
         sketchyContext.fill();

         // Draw the red arc.
         sketchyContext.beginPath();
         sketchyContext.moveTo(275, 75);
         sketchyContext.arc(275, 75, 57, 3 * Math.PI / 2, 0, false);
         sketchyContext.closePath();
         sketchyContext.fillStyle = 'rgb(255, 0, 0)';
         sketchyContext.fill();

         // Draw the blue arc.
         sketchyContext.beginPath();
         sketchyContext.moveTo(275, 75);
         sketchyContext.arc(275, 75, 57, 0, Math.PI / 2, false);
         sketchyContext.closePath();
         sketchyContext.fillStyle = 'rgb(0, 0, 255)';
         sketchyContext.fill();

         // Draw the yellow arc.
         sketchyContext.beginPath();
         sketchyContext.moveTo(275, 75);
         sketchyContext.arc(275, 75, 57, Math.PI / 2, Math.PI, false);
         sketchyContext.closePath();
         sketchyContext.fillStyle = 'rgb(255, 255, 0)';
         sketchyContext.fill();

         // Draw the inner black circle.
         sketchyContext.beginPath();
         sketchyContext.arc(275, 75, 20, 0, 2 * Math.PI, false);
         sketchyContext.fillStyle = 'rgb(0, 0, 0)';
         sketchyContext.fill();

         // Draw the non-filled 'L'
         sketchyContext.beginPath();
         sketchyContext.moveTo(290, 200);
         sketchyContext.lineTo(290, 300);
         sketchyContext.lineTo(340, 300);
         sketchyContext.lineTo(340, 280);
         sketchyContext.lineTo(310, 280);
         sketchyContext.lineTo(310, 200);
         sketchyContext.lineTo(290, 200);
         sketchyContext.strokeStyle = 'rgb(0, 150, 0)';
         sketchyContext.stroke();

         // Draw the filled 'L'
         sketchyContext.beginPath();
         sketchyContext.moveTo(220, 200);
         sketchyContext.lineTo(220, 300);
         sketchyContext.lineTo(270, 300);
         sketchyContext.lineTo(270, 280);
         sketchyContext.lineTo(240, 280);
         sketchyContext.lineTo(240, 200);
         sketchyContext.lineTo(220, 200);
         sketchyContext.fillStyle = 'rgb(220, 0, 20)';
         sketchyContext.fill();

         // Draw the bezier curve.
         sketchyContext.beginPath();
         sketchyContext.moveTo(120, 50);
         sketchyContext.bezierCurveTo(0, 50, 200, 300, 100, 300);
         sketchyContext.strokeStyle = 'rgb(40, 0, 225)';
         sketchyContext.lineCap = 'round';
         sketchyContext.lineWidth = 10;
         sketchyContext.stroke();
      };

      // When the snapshot button is clicked, show a snapshot of the canvas that the user can save as an image file.
      document.querySelector('#sketchy-snapshot').addEventListener('click', function () {
         
      }, false);

      // Draw on the canvas.
      updateSketchyCanvas();
   }());

   // Add functionality to the Voronoi area.
   (function () {
      var generatingPoints, getPointFromEvent, updateVoronoiDiagram, voronoiCanvas, voronoiContext;

      // Get the canvas object and its two-dimensional rendering context.
      voronoiCanvas = document.querySelector('#voronoi');
      voronoiContext = voronoiCanvas && voronoiCanvas.getContext && voronoiCanvas.getContext('2d');
      if (!voronoiContext) {
         document.querySelector('#voronoi-instructions').textContent = 'Your browser does not seem to support the <canvas> element correctly; please use a recent version of a standards-compliant browser such as Opera, Chrome or Firefox.';
         return;
      }

      // Size the canvas.
      voronoiCanvas.width = 360;
      voronoiCanvas.height = 360;
      // Fill the canvas with black.
      voronoiContext.fillStyle = 'rgb(0, 0, 0)';
      voronoiContext.fillRect(0, 0, voronoiCanvas.width, voronoiCanvas.height);

      // At first we have no generating points.
      generatingPoints = [];

      // WRITE YOUR getPointFromEvent FUNCTION HERE
      getPointFromEvent = function (ev) {
         var rect;
         rect = voronoiCanvas.getBoundingClientRect();

         return {
            color: 'rgb(' + Math.floor(((Math.random() * 255) + 1)) + ', ' + Math.floor(((Math.random() * 255) + 1)) + ', ' + Math.floor(((Math.random() * 255) + 1)) + ')',
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top
         };
      };

      // WRITE YOUR updateVoronoiDiagram FUNCTION HERE
      updateVoronoiDiagram = function () {
         var i, j, k, currentDistance, lowestDistance, whichK;
         lowestDistance = 361;
         currentDistance = 0;
         whichK = 0;

         // Loop through all pixels, and find the shortest distance between the current pixel and a generatingPoint.
         for (i = 0; i < 360; i += 1) {
            for (j = 0; j < 360; j += 1) {
               for (k = 0; k < generatingPoints.length; k += 1) {
                  currentDistance = Math.abs(i - generatingPoints[k].x) + Math.abs(j - generatingPoints[k].y);
                  if (currentDistance < lowestDistance) {
                     lowestDistance = currentDistance;
                     whichK = k;
                  }
               }
               // draw a 1x1 rectangle at the current pixel with the color of the closest generatingPoint.
               voronoiContext.fillStyle = generatingPoints[whichK].color;
               voronoiContext.fillRect(i, j, 1, 1);
               lowestDistance = 361;
               currentDistance = 0;
            }
         }

         for (k = 0; k < generatingPoints.length; k += 1) {
            // Draw the outer circle.
            voronoiContext.beginPath();
            voronoiContext.arc(generatingPoints[k].x, generatingPoints[k].y, 5, 0, 2 * Math.PI, false);
            voronoiContext.fillStyle = 'rgb(0, 0, 0)';
            voronoiContext.fill();

            // Draw the middle circle.
            voronoiContext.beginPath();
            voronoiContext.arc(generatingPoints[k].x, generatingPoints[k].y, 4, 0, 2 * Math.PI, false);
            voronoiContext.fillStyle = 'rgb(255, 255, 255)';
            voronoiContext.fill();

            // Draw the inner circle.
            voronoiContext.beginPath();
            voronoiContext.arc(generatingPoints[k].x, generatingPoints[k].y, 3, 0, 2 * Math.PI, false);
            voronoiContext.fillStyle = generatingPoints[k].color;
            voronoiContext.fill();
         }
      };

      // When the canvas is clicked, add a generating point and redraw the Voronoi diagram.
      voronoiCanvas.addEventListener('click', function (ev) {
         generatingPoints.push(getPointFromEvent(ev));
         updateVoronoiDiagram();
      }, false);

      // When the snapshot button is clicked, show a snapshot of the canvas that the user can save as an image file.
      document.querySelector('#voronoi-snapshot').addEventListener('click', function () {
         
      }, false);
   }());

   // Add functionality to the ripples area.
   (function () {
      var drawRipple, ripplesCanvas, ripplesContext;

      // Get the canvas object and its two-dimensional rendering context.
      ripplesCanvas = document.querySelector('#ripples');
      ripplesContext = ripplesCanvas && ripplesCanvas.getContext && ripplesCanvas.getContext('2d');
      if (!ripplesContext) {
         document.querySelector('#ripples-instructions').textContent = 'Your browser does not seem to support the <canvas> element correctly; please use a recent version of a standards-compliant browser such as Opera, Chrome or Firefox.';
         return;
      }

      // Size the canvas.
      ripplesCanvas.width = 360;
      ripplesCanvas.height = 360;

      // Fill the canvas with a dark color.
      ripplesContext.fillStyle = 'rgb(0, 17, 51)';
      ripplesContext.fillRect(0, 0, ripplesCanvas.width, ripplesCanvas.height);

      // WRITE YOUR drawRipple FUNCTION HERE
      drawRipple = function (state) {
         ripplesContext.beginPath();
         ripplesContext.arc(state.x, state.y, state.radius, 0, 2 * Math.PI, false);
         ripplesContext.fillStyle = 'rgb(0, 17, 51)';
         ripplesContext.fill();
         state.radius += state.radiusIncrement;
         state.opacity += state.opacityIncrement;
         if (state.opacity > 0) {
            ripplesContext.beginPath();
            ripplesContext.arc(state.x, state.y, state.radius, 0, 2 * Math.PI, false);
            ripplesContext.fillStyle = 'rgba(200, 200, 200, ' + state.opacity + ')';
            ripplesContext.fill();
            setTimeout(function () {
               drawRipple(state);
            }, state.timeIncrement);
         }
      };

      // When the mouse is moved over the canvas, animate an expanding and fading ripple.
      ripplesCanvas.addEventListener('click', function (ev) {
         var rect;
         rect = ripplesCanvas.getBoundingClientRect();
         drawRipple({
            opacity: 1, // initial opacity
            opacityIncrement: -0.01, // how much to fade each timer tick
            radius: 0, // initial radius of ripple
            radiusIncrement: 1, // number of pixels to increase radius each timer tick
            timeIncrement: 10, // milliseconds for each timer tick
            x: ev.clientX - rect.left, // x coordinate of center of ripple
            y: ev.clientY - rect.top // y coordinate of center of ripple
         });
      }, false);
   }());

}, false);
