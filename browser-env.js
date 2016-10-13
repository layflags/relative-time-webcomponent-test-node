require('browser-env')(['document', 'window', 'HTMLElement'])

// provide window.requestAnimationFrame & window.cancelAnimationFrame
require('requestanimationframe')
global.requestAnimationFrame = window.requestAnimationFrame
global.cancelAnimationFrame = window.cancelAnimationFrame

// provide document.registerElement
require('document-register-element')
