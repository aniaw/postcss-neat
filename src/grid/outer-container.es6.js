'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';
import Media from '../core/mediaTypes.es6';

// Makes an element a outer container by centring it in the viewport, clearing its floats, and setting its `max-width`.
// Although optional, using `outer-container` is recommended. The mixin can be called on more than one element per page,
// as long as they are not nested.
//
// @local-max-width
//   Max width to be applied to the element. Can be a percentage or a measure.
//
// @example - PostCSS Usage
//   .element {
//     @neat-outer-container 100%;
//   }
//
// @example - CSS Output
//   .element {
//     *zoom: 1;
//     max-width: 100%;
//     margin-left: auto;
//     margin-right: auto;
//   }
//
//   .element:before,
//   .element:after {
//     content: " ";
//     display: table;
//   }
//
//   .element:after {
//     clear: both;
//   }
//

let outerContainer = (maxWidth, options = variables, media) => {
  maxWidth = maxWidth || (media ? options[media].neatMaxWidth : options[Media.Desktop].neatMaxWidth);

  return Object.assign({
    'max-width': maxWidth,
    'margin-left': 'auto',
    'margin-right': 'auto'
  }, functions.clearfix());
};

export default outerContainer;
