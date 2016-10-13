var component = require('relative-time-webcomponent');

// apply patch to fix: setting `autoupdate` doesn't call `tick`
var origMethod = component.prototype.attributeChangedCallback;
component.prototype.attributeChangedCallback = function (attr, oldVal, newVal) {
  if (attr === 'autoupdate') attr = 'datetime'
  origMethod.call(this, attr, oldVal, newVal)
}

module.exports = component
