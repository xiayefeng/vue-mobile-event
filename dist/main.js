"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var MyEvent=function(){function n(e){_classCallCheck(this,n);var t=e.select;if("string"==typeof t)this.ele=document.querySelector(t);else{if(!(t instanceof HTMLElement&&1===t.nodeType))throw new TypeError("props of select must be string or HTMLElement");this.ele=t}this.tapLastTime=null}return _createClass(n,[{key:"tap",value:function(t){function e(e){switch(e.preventDefault(),e.type){case"touchstart":n=(new Date).getTime();break;case"touchend":(c=(new Date).getTime())-n<200&&(!this.tapLastTime||600<c-this.tapLastTime)&&(this.tapLastTime=+new Date,t.call(this,e));break;default:n=(new Date).getTime()}}var n,c;this.ele.addEventListener("touchstart",e),this.ele.addEventListener("touchend",e)}},{key:"longTap",value:function(c,a){function e(e){var t=this;e.preventDefault();var n=20<Math.abs(e.changedTouches[0].clientX-h)||20<Math.abs(e.changedTouches[0].clientY-l);switch(e.type){case"touchstart":s=(new Date).getTime(),h=e.changedTouches[0].clientX,l=e.changedTouches[0].clientY,o=setTimeout(function(){c.call(t,e),r=!0,o=null},500);break;case"touchmove":s=(new Date).getTime(),n&&!r&&(o&&clearTimeout(o),o=setTimeout(function(){c.call(t,e),r=!0,o=null},500));break;case"touchend":i=(new Date).getTime(),u=e.changedTouches[0].clientY,i-s<500?o&&clearTimeout(o):a&&l-u<30&&a.call(this,e);break;default:clearTimeout(o)}}var s,i,o,h,l,u,r=!1;this.ele.addEventListener("touchstart",e),this.ele.addEventListener("touchmove",e),this.ele.addEventListener("touchend",e)}},{key:"leftSlip",value:function(t){function e(e){switch(e.preventDefault(),e.type){case"touchstart":n=e.changedTouches[0].clientX,c=e.changedTouches[0].clientY;break;case"touchend":a=e.changedTouches[0].clientX,s=e.changedTouches[0].clientY,Math.abs(c-s)<30&&50<n-a&&t.call(this,e)}}var n,c,a,s;this.ele.addEventListener("touchstart",e),this.ele.addEventListener("touchend",e)}},{key:"rightSlip",value:function(t){function e(e){switch(e.preventDefault(),e.type){case"touchstart":n=e.changedTouches[0].clientX,c=e.changedTouches[0].clientY;break;case"touchend":a=e.changedTouches[0].clientX,s=e.changedTouches[0].clientY,Math.abs(c-s)<30&&50<a-n&&t.call(this,e)}}var n,c,a,s;this.ele.addEventListener("touchstart",e),this.ele.addEventListener("touchend",e)}},{key:"upSlip",value:function(t,n){function e(e){switch(console.log(e.type),e.preventDefault(),e.type){case"touchstart":c=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY;break;case"touchend":s=e.changedTouches[0].clientX,i=e.changedTouches[0].clientY,(Math.abs(c-s)<40&&50<a-i||n&&60<a-i)&&t.call(this,e)}}var c,a,s,i;this.ele.addEventListener("touchstart",e),this.ele.addEventListener("touchend",e)}},{key:"downSlip",value:function(t){function e(e){switch(console.log(e.type),e.preventDefault(),e.type){case"touchstart":n=e.changedTouches[0].clientX,c=e.changedTouches[0].clientY;break;case"touchend":a=e.changedTouches[0].clientX,s=e.changedTouches[0].clientY,console.log("X:"+Math.abs(n-a)),console.log("Y:"+(s-c)),Math.abs(n-a)<30&&50<s-c&&t.call(this,e)}}var n,c,a,s;this.ele.addEventListener("touchstart",e),this.ele.addEventListener("touchend",e)}}]),n}(),vuePhoneEvent={install:function(e){e.directive("event",{inserted:function(e,t){var n=new MyEvent({select:e});if(!n[t.arg])throw new Error("no such ".concat(t.arg," evnet type"));if("function"!=typeof t.value)throw new TypeError("expression must be function");n[t.arg](t.value)}})}};module.exports=vuePhoneEvent;