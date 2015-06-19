'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

// Translates an element horizontally by a number of columns, in a specific nesting context.
//
// @columns
//   The number of columns to shift (required).
//
// @container-columns
//   The number of columns of the parent element.
//
// @direction
//  Sets the layout direction. Can be `LTR` (left-to-right) or `RTL` (right-to-left).
//
// @example - LESS Usage
//   .element-neg {
//     @mixin shift -3 6;
//   }
//
//   .element-pos {
//     @mixin shift 2;
//   }
//
// @example - CSS output
//   .element-neg {
//     margin-left: -52.41457896%;
//   }
//
//   .element-pos {
//     margin-left: 17.0596086%;
//   }

var shift = function shift(columns) {
  var containerColumns = arguments[1] === undefined ? _coreVariablesEs6Js2['default'].neatGridColumns : arguments[1];
  var direction = arguments[2] === undefined ? _coreVariablesEs6Js2['default'].neatDefaultDirection : arguments[2];

  var directions = _coreFunctionsEs6Js2['default'].getDirection(direction);
  var columnWidth = _coreFunctionsEs6Js2['default'].flexWidth(1, containerColumns);
  var columnGutter = _coreFunctionsEs6Js2['default'].flexGutter(containerColumns);
  return _defineProperty({}, 'margin-' + directions.oppositeDirection, _coreFunctionsEs6Js2['default'].percentage(columns * columnWidth + columns * columnGutter));
};

exports['default'] = shift;
module.exports = exports['default'];
//# sourceMappingURL=../grid/shift.es6.js.map