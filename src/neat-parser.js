'use strict';

require('babel-polyfill');

import postcss from 'postcss';
import neatCore from './core';
import neatGrid from './grid';

let options = {};
let ampInsertedNodes = {};

const atRules = {
  'fill-parent' () {
    return neatGrid.fillParent(options);
  },
  'omega' (query, direction, media) {
    return neatGrid.omega(query, direction, options, media);
  },
  'outer-container' (maxWidth, media) {
    return neatGrid.outerContainer(maxWidth, options, media);
  },
  'pad' (media, ...padding) {
    return neatGrid.pad(padding, options, media);
  },
  'row' (display, media) {
    return neatGrid.row(display, options, media );
  },
  'shift' (columns, containerColumns, media, direction) {
    return neatGrid.shift(columns, containerColumns, direction, options, media);
  },
  'show-grid' (columns, containerColumns, media, location, direction) {
    return neatGrid.showGrid(columns, containerColumns, location, direction, options, media);
  },
  'span-columns' (columns, containerColumns, display, media, direction) {
    return neatGrid.spanColumns(columns, containerColumns, display, direction, options, media);
  }
};

const unwrapAmp = (nodeSelector, node) => {
  if (nodeSelector.indexOf('&:') >= 0 && node.name !== 'media') {
    return node.selectors.map((selector) => {
      return nodeSelector.replace(/&/g, selector);
    }).join(',');
  }
  return nodeSelector;
};

const getGlobalSelector = (node) => {
  if (node.parent && node.parent.type === 'atrule') {
    return `${node.parent.name} ${node.parent.params} ${node.selector}`;
  } else if (node.name === 'media') {
    return getGlobalSelector(node.parent);
  }
  return node.selector;
};

const applyRuleSetToNode = (ruleSet, node, currentAtRule) => {
  
  console.log('currentAtRule', currentAtRule);
  console.log('atRule', atRules);
  
  Object.keys(ruleSet).forEach((prop) => {
    let rule = ruleSet[prop];
    if (typeof rule === 'object') {
      if (node.name !== 'media') {
        let extRule = postcss.rule({ selector: unwrapAmp(prop, node) });
        applyRuleSetToNode(rule, extRule);

        let globalSelector = getGlobalSelector(node);
        node.parent.insertAfter(ampInsertedNodes[globalSelector] || node, extRule);
        ampInsertedNodes[globalSelector] = extRule;
      } else {
        let mediaNestedRule = postcss.parse(`${prop} ${JSON.stringify(rule).replace(/"/g, '')}`);
        node.append(mediaNestedRule);
      }
    } else {
      if (currentAtRule) {
        node.insertBefore(currentAtRule, { prop, value: rule });
      } else {
        node.append({ prop, value: rule });
      }
    }
  });
};

export default postcss.plugin('postcss-neat', (opts) => {
  options = Object.assign({}, neatCore.variables, opts);
  return (root) => {
    ampInsertedNodes = {};
    root.walkAtRules(/^neat-/i, (rule) => {
      let atRule = rule.name.trim().replace('neat-', '');
      if (atRules[atRule]) {
        let params = rule.params.trim() ? rule.params.trim().split(' ') : [];
        let ruleSet = atRules[atRule](...params);
        applyRuleSetToNode(ruleSet, rule.parent, rule);
      }
      rule.remove();
    });
  };
});
