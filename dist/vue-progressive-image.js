/*!
 * vue-progressive-image v3.2.0
 * (c) 2018 Matteo Gabriele
 * Released under the ISC License.
 */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var r=this[t];r[2]?e.push("@media "+r[2]+"{"+r[1]+"}"):e.push(r[1])}return e.join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(n[a]=!0)}for(i=0;i<t.length;i++){var o=t[i];"number"==typeof o[0]&&n[o[0]]||(r&&!o[2]?o[2]=r:r&&(o[2]="("+o[2]+") and ("+r+")"),e.push(o))}},e}},function(e,t,r){function n(e){for(var t=0;t<e.length;t++){var r=e[t],n=u[r.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](r.parts[i]);for(;i<r.parts.length;i++)n.parts.push(a(r.parts[i]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var o=[],i=0;i<r.parts.length;i++)o.push(a(r.parts[i]));u[r.id]={id:r.id,refs:1,parts:o}}}}function i(){var e=document.createElement("style");return e.type="text/css",d.appendChild(e),e}function a(e){var t,r,n=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(n){if(f)return h;n.parentNode.removeChild(n)}if(v){var a=g++;n=p||(p=i()),t=o.bind(null,n,a,!1),r=o.bind(null,n,a,!0)}else n=i(),t=s.bind(null,n),r=function(){n.parentNode.removeChild(n)};return t(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;t(e=n)}else r()}}function o(e,t,r,n){var i=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=m(t,i);else{var a=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(a,o[t]):e.appendChild(a)}}function s(e,t){var r=t.css,n=t.media,i=t.sourceMap;if(n&&e.setAttribute("media",n),i&&(r+="\n/*# sourceURL="+i.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=r(8),u={},d=l&&(document.head||document.getElementsByTagName("head")[0]),p=null,g=0,f=!1,h=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,r){f=r;var i=c(e,t);return n(i),function(t){for(var r=[],a=0;a<i.length;a++){var o=i[a],s=u[o.id];s.refs--,r.push(s)}t?(i=c(e,t),n(i)):i=[];for(var a=0;a<r.length;a++){var s=r[a];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete u[s.id]}}}};var m=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t,r,n){var i,a=e=e||{},o=typeof e.default;"object"!==o&&"function"!==o||(i=e,a=e.default);var s="function"==typeof a?a.options:a;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),r&&(s._scopeId=r),n){var l=Object.create(s.computed||null);Object.keys(n).forEach(function(e){var t=n[e];l[e]=function(){return t}}),s.computed=l}return{esModule:i,exports:a,options:s}}},function(e,t,r){"use strict";var n=r(10);t.a={props:{src:{type:null,required:!0},placeholder:{type:String},blur:{type:Number},aspectRatio:{type:Number},noRatio:{type:Boolean},fallback:{type:String},alt:{type:String},customClass:{type:String}},data:function(){return{isRendered:!1,options:{cache:!0},defaultBlur:20,image:null,originalWidth:0,placeholderImage:null,aspectRatioDetect:.5625,isPollingKilled:!1,isImageCached:!1,imageError:!1,parsedSrc:null}},watch:{src:function(){this.handleImageLoading()}},computed:{shouldPlaceholderRender:function(){return!!this.placeholderImage},shouldImageRender:function(){return this.isRendered},cached:function(){return this.options.cache&&this.isImageCached},calculatedRatio:function(){return this.aspectRatio||this.aspectRatioDetect},wrapperStyle:function(){return this.noRatio?{}:{paddingBottom:100*this.calculatedRatio+"%"}},componentStyle:function(){return{maxWidth:0===this.originalWidth?"100%":this.originalWidth+"px"}},blurStyle:function(){var e=this.defaultBlur;return Object(n.a)(this.blur)?this.getBlurStyle(this.blur):Object(n.a)(this.options.blur)?this.getBlurStyle(this.options.blur):this.getBlurStyle(e)}},mounted:function(){this.handleImageLoading()},methods:{getBlurStyle:function(e){if(0!==e)return{filter:"blur("+e+"px)"}},defineAspectRatio:function(e){var t=this,r=this.options.timeout||2500,n=this.options.pollInterval||10,i=setInterval(function(){if(e.naturalWidth){clearInterval(i);var r=e.naturalHeight,n=e.naturalWidth;t.aspectRatioDetect=r/n,t.originalWidth=n}},n);setTimeout(function(){e.naturalWidth||(clearInterval(i),t.isPollingKilled=!0)},r)},isCached:function(e){var t=new Image;return t.src=e,t.complete},loadImage:function(e,t){var r=this,n=new Image,i=this.options.delay||0,a=this.fallback||this.options.fallback,o=this.imageError?a:e;this.options.cache&&this.isCached(o)?(this.image=o,this.placeholderImage=null,this.isImageCached=!0):(this.image=null,this.isImageCached=!1,this.isRendered=!1),this.aspectRatio||this.defineAspectRatio(n),n.onload=function(){if(!r.image){r.isPollingKilled&&!r.aspectRatio&&r.defineAspectRatio(n),r.image=o;var e=n.width,a=n.height,s=void 0;try{switch(s=r.$refs.canvas.getContext("2d"),t){case 2:s.transform(-1,0,0,1,e,0);break;case 3:s.transform(-1,0,0,-1,e,a);break;case 4:s.transform(1,0,0,-1,0,a);break;case 5:s.transform(0,1,1,0,0,0);break;case 6:s.transform(0,1,-1,0,a,0);break;case 7:s.transform(0,-1,-1,0,a,e);break;case 8:s.transform(0,-1,1,0,0,e)}s.drawImage(r.$refs.main,0,0)}catch(e){}r.$nextTick(function(){setTimeout(function(){r.isRendered=!0,r.placeholderImage=null},i)}),r.imageError=!1,r.$emit("onLoad",n.src)}},n.onerror=function(e){r.$emit("onError",e),(r.fallback||r.options.fallback)&&(r.imageError=!0,r.handleImageLoading())},n.src=o},loadPlaceholder:function(){var e=this;if(this.placeholder||this.options.placeholder){var t=new Image,r=this.placeholder||this.options.placeholder;t.src=r,t.onload=function(){e.placeholderImage=r,e.$emit("onLoadPlaceholder",r)},t.onerror=function(t){e.$emit("onPlaceholderError",t)}}},getOrientation:function(e,t){var r=new FileReader;r.onloadend=function(){var n="data:"+e.type+";base64,"+_arrayBufferToBase64(r.result),i=new DataView(r.result),a=0,o=1;if(r.result.length<2||65496!=i.getUint16(a))return void(t&&t(n,o));a+=2;for(var s=i.byteLength;a<s-2;){var l=i.getUint16(a);switch(a+=2,l){case 65505:s=i.getUint16(a)-a,a+=2;break;case 274:o=i.getUint16(a+6,!1),s=0}}t&&t(n,o)},r.readAsArrayBuffer(e)},handleImageLoading:function(){var e=this;this.loadPlaceholder(),fetch(this.src).then(function(t){e.getOrientation(t.blob(),function(t,r){e.loadImage(t,r)})})}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(5),i=r.n(n),a=r(12),o=r.n(a),s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return s({},e,{data:function(){return{options:t}}})},c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.component("progressive-img",l(i.a,t)),e.component("progressive-background",l(o.a,t))};t.default={install:c}},function(e,t,r){r(6);var n=r(2)(r(9),r(11),null,null);e.exports=n.exports},function(e,t,r){var n=r(7);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals),r(1)("c467ffae",n,!0)},function(e,t,r){t=e.exports=r(0)(),t.push([e.i,".progressive-image{position:relative;overflow:hidden;width:100%;display:inline-block}.progressive-image-canvas{visibility:hidden;position:absolute;top:0;left:0}.progressive-image-main{position:absolute;top:0;left:0;width:100%;height:auto;z-index:1;transition-duration:.3s;transition-property:all;transition-timing-function:ease-out;transform:translateZ(0)}.progressive-image-before-enter{opacity:1}.progressive-image-enter{opacity:0}.progressive-image-placeholder{position:absolute;top:0;left:0;z-index:0;overflow:hidden;transition-duration:.3s;transition-property:all;transition-timing-function:ease-out;backface-visibility:hidden;transform:translateZ(0) scale(1.1);width:100%;height:100%;background-size:cover}.progressive-image-placeholder-out{transition-duration:inherit;transition-property:all;transition-timing-function:ease-out;transition-delay:.4s;opacity:0}.progressive-image-preloader{pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;z-index:2}",""])},function(e,t){e.exports=function(e,t){for(var r=[],n={},i=0;i<t.length;i++){var a=t[i],o=a[0],s=a[1],l=a[2],c=a[3],u={id:e+":"+i,css:s,media:l,sourceMap:c};n[o]?n[o].parts.push(u):r.push(n[o]={id:o,parts:[u]})}return r}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default={name:"progressive-img",props:{imageCustomClass:{type:String}},mixins:[n.a],computed:{placeholderStyle:function(){return i({},this.blurStyle,{"background-image":"url("+(this.placeholder||this.options.placeholder)+")"})}}}},function(e,t,r){"use strict";r.d(t,"a",function(){return n});var n=function(e){return void 0!==e&&null!==e}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"image",class:["progressive-image",e.customClass],style:e.componentStyle},[e.cached?r("div",{staticClass:"progressive-image-wrapper",style:e.wrapperStyle},[r("img",{class:["progressive-image-main",e.imageCustomClass],attrs:{src:e.image,alt:e.alt}})]):r("span",[e.shouldImageRender?e._e():r("canvas",{ref:"canvas",staticClass:"progressive-image-canvas",attrs:{width:"1",height:"1"}}),e._v(" "),r("div",{staticClass:"progressive-image-wrapper",style:e.wrapperStyle},[r("transition",{attrs:{"enter-class":"progressive-image-enter","enter-active-class":"progressive-image-before-enter"}},[r("img",{directives:[{name:"show",rawName:"v-show",value:e.shouldImageRender,expression:"shouldImageRender"}],ref:"main",class:["progressive-image-main",e.imageCustomClass],attrs:{src:e.image,alt:e.alt}})]),e._v(" "),r("transition",{attrs:{"enter-class":"progressive-image-enter","enter-active-class":"progressive-image-before-enter"}},[e.shouldPlaceholderRender?r("div",{staticClass:"progressive-image-placeholder",class:{"progressive-image-placeholder-out":e.shouldImageRender},style:e.placeholderStyle}):e._e()])],1)])])},staticRenderFns:[]}},function(e,t,r){r(13);var n=r(2)(r(15),r(16),null,null);e.exports=n.exports},function(e,t,r){var n=r(14);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals),r(1)("716f1046",n,!0)},function(e,t,r){t=e.exports=r(0)(),t.push([e.i,".progressive-background{position:relative;width:100%;height:100%;overflow:hidden}.progressive-background-slot{position:relative;z-index:1}.progressive-background-canvas{visibility:hidden;position:absolute;top:0;left:0}.progressive-background-image,.progressive-background-placeholder{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;transition:all .4s ease-out;background-position:50%;background-repeat:no-repeat;background-size:cover}.progressive-background-placeholder{transform:scale(1.1);z-index:0}.progressive-background-before{opacity:1}.progressive-background-enter{opacity:0}.progressive-background-preloader{pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;z-index:2}",""])},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default={name:"progressive-background",props:{noRatio:{type:Boolean,required:!1}},mixins:[n.a],data:function(){return{applyRatio:!this.noRatio}},computed:{imageStyle:function(){return{backgroundImage:"url("+this.image+")"}},placeholderStyle:function(){return i({},this.blurStyle,{backgroundImage:"url("+this.placeholderImage+")"})}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:["progressive-background",e.customClass]},[e.cached?r("div",{style:e.wrapperStyle},[r("div",{staticClass:"progressive-background-image",style:e.imageStyle}),e._v(" "),r("div",{staticClass:"progressive-background-slot"},[e._t("content")],2)]):r("span",[e.shouldImageRender?e._e():r("div",[r("canvas",{ref:"canvas",staticClass:"progressive-background-canvas",attrs:{width:"1",height:"1"}}),e._v(" "),r("img",{ref:"main",attrs:{src:e.image,hidden:""}})]),e._v(" "),r("div",{style:e.wrapperStyle},[r("transition",{attrs:{"enter-class":"progressive-background-enter","enter-active-class":"progressive-background-before"}},[e.shouldImageRender?r("div",{staticClass:"progressive-background-image",style:e.imageStyle}):e._e()]),e._v(" "),r("div",{staticClass:"progressive-background-slot"},[e._t("content",null,{visible:!e.shouldImageRender})],2),e._v(" "),r("transition",{attrs:{"enter-class":"progressive-background-enter","enter-active-class":"progressive-background-before"}},[e.shouldPlaceholderRender?r("div",{staticClass:"progressive-background-placeholder",style:e.placeholderStyle}):e._e()])],1)])])},staticRenderFns:[]}}])});