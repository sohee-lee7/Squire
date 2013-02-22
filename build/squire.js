var UA=function(e){"use strict";var t=navigator.userAgent,n=!!e.opera,r=/Trident\//.test(t),i=/WebKit\//.test(t);return{isOpera:n,isIE8:8===e.ie,isIE:r,isGecko:/Gecko\//.test(t),isWebKit:i,isIOS:/iP(?:ad|hone|od)/.test(t),useTextFixer:r||n,cantFocusEmptyTextNodes:r||i,losesSelectionOnBlur:r}}(window),DOMTreeWalker=function(){"use strict";var e={1:1,2:2,3:4,8:128,9:256,11:1024},t=1,n=function(e,t,n){this.root=this.currentNode=e,this.nodeType=t,this.filter=n};return n.prototype.nextNode=function(){for(var n,r=this.currentNode,i=this.root,o=this.nodeType,s=this.filter;;){for(n=r.firstChild;!n&&r&&r!==i;)n=r.nextSibling,n||(r=r.parentNode);if(!n)return null;if(e[n.nodeType]&o&&s(n)===t)return this.currentNode=n,n;r=n}},n.prototype.previousNode=function(){for(var n,r=this.currentNode,i=this.root,o=this.nodeType,s=this.filter;;){if(r===i)return null;if(n=r.previousSibling)for(;r=n.lastChild;)n=r;else n=r.parentNode;if(!n)return null;if(e[n.nodeType]&o&&s(n)===t)return this.currentNode=n,n;r=n}},n}();(function(e,t){"use strict";var n=function(e,t){for(var n,r,i=e.length;i--;){n=e[i].prototype;for(r in t)n[r]=t[r]}},r=function(e,t){for(var n=e.length;n--;)if(!t(e[n]))return!1;return!0},i=function(){return!1},o=function(){return!0},s=/^(?:A(?:BBR|CRONYM)?|B(?:R|D[IO])?|C(?:ITE|ODE)|D(?:FN|EL)|EM|FONT|HR|I(?:NPUT|MG|NS)?|KBD|Q|R(?:P|T|UBY)|S(?:U[BP]|PAN|TRONG|AMP)|U)$/,a={BR:1,IMG:1,INPUT:1},l=function(e,t){var n=t.parentNode;return n&&n.replaceChild(e,t),e},d=1,c=3,f=1,u=1,h=3,p=function(e){return e.isBlock()?u:h};n(window.Node?[Node]:[Text,Element,HTMLDocument],{isLeaf:i,isInline:i,isBlock:i,isContainer:i,getPath:function(){var e=this.parentNode;return e?e.getPath():""},detach:function(){var e=this.parentNode;return e&&e.removeChild(this),this},replaceWith:function(e){return l(e,this),this},replaces:function(e){return l(this,e),this},nearest:function(e,t){var n=this.parentNode;return n?n.nearest(e,t):null},getPreviousBlock:function(){var e=this.ownerDocument,n=new t(e.body,f,p,!1);return n.currentNode=this,n.previousNode()},getNextBlock:function(){var e=this.ownerDocument,n=new t(e.body,f,p,!1);return n.currentNode=this,n.nextNode()},split:function(e){return e},mergeContainers:function(){}}),n([Text],{isInline:o,getLength:function(){return this.length},isLike:function(e){return e.nodeType===c},split:function(e,t){var n=this;return n===t?e:n.parentNode.split(n.splitText(e),t)}}),n([Element],{isLeaf:function(){return!!a[this.nodeName]},isInline:function(){return s.test(this.nodeName)},isBlock:function(){return!this.isInline()&&r(this.childNodes,function(e){return e.isInline()})},isContainer:function(){return!this.isInline()&&!this.isBlock()},getLength:function(){return this.childNodes.length},getPath:function(){var e,t,n,r,i=this.parentNode;return i?(e=i.getPath(),e+=(e?">":"")+this.nodeName,(t=this.id)&&(e+="#"+t),(n=this.className.trim())&&(r=n.split(/\s\s*/),r.sort(),e+=".",e+=r.join(".")),e):""},wraps:function(e){return l(this,e).appendChild(e),this},empty:function(){for(var e=this.ownerDocument.createDocumentFragment(),t=this.childNodes.length;t--;)e.appendChild(this.firstChild);return e},is:function(e,t){if(this.nodeName!==e)return!1;var n;for(n in t)if(this.getAttribute(n)!==t[n])return!1;return!0},nearest:function(e,t){var n=this;do if(n.is(e,t))return n;while((n=n.parentNode)&&n.nodeType===d);return null},isLike:function(e){return e.nodeType===d&&e.nodeName===this.nodeName&&e.className===this.className&&e.style.cssText===this.style.cssText},mergeInlines:function(e){for(var t,n,r,i=this.childNodes,o=i.length,s=[];o--;)if(t=i[o],n=o&&i[o-1],o&&t.isInline()&&t.isLike(n)&&!a[t.nodeName])e.startContainer===t&&(e.startContainer=n,e.startOffset+=n.getLength()),e.endContainer===t&&(e.endContainer=n,e.endOffset+=n.getLength()),e.startContainer===this&&(e.startOffset>o?e.startOffset-=1:e.startOffset===o&&(e.startContainer=n,e.startOffset=n.getLength())),e.endContainer===this&&(e.endOffset>o?e.endOffset-=1:e.endOffset===o&&(e.endContainer=n,e.endOffset=n.getLength())),t.detach(),t.nodeType===c?n.appendData(t.data.replace(/\u200B/g,"")):s.push(t.empty());else if(t.nodeType===d){for(r=s.length;r--;)t.appendChild(s.pop());t.mergeInlines(e)}},mergeWithBlock:function(e,t){for(var n,r,i,o=this,s=e;1===s.parentNode.childNodes.length;)s=s.parentNode;s.detach(),r=o.childNodes.length,n=o.lastChild,n&&"BR"===n.nodeName&&(o.removeChild(n),r-=1),i={startContainer:o,startOffset:r,endContainer:o,endOffset:r},o.appendChild(e.empty()),o.mergeInlines(i),t.setStart(i.startContainer,i.startOffset),t.collapse(!0),window.opera&&(n=o.lastChild)&&"BR"===n.nodeName&&o.removeChild(n)},mergeContainers:function(){var e=this.previousSibling,t=this.firstChild;e&&e.isLike(this)&&e.isContainer()&&(e.appendChild(this.detach().empty()),t&&t.mergeContainers())},split:function(e,t){var n=this;if("number"==typeof e&&(e=n.childNodes.length>e?n.childNodes[e]:null),n===t)return e;for(var r,i=n.parentNode,o=n.cloneNode(!1);e;)r=e.nextSibling,o.appendChild(e),e=r;return n.fixCursor(),o.fixCursor(),(r=n.nextSibling)?i.insertBefore(o,r):i.appendChild(o),i.split(o,t)},fixCursor:function(){var t,n,r=this,i=r.ownerDocument;if("BODY"===r.nodeName&&((n=r.firstChild)&&"BR"!==n.nodeName||(t=i.createElement("DIV"),n?r.replaceChild(t,n):r.appendChild(t),r=t,t=null)),r.isInline())r.firstChild||(e.cantFocusEmptyTextNodes?(t=i.createTextNode("​"),editor._setPlaceholderTextNode(t)):t=i.createTextNode(""));else if(e.useTextFixer){for(;r.nodeType!==c&&!r.isLeaf();){if(n=r.firstChild,!n){t=i.createTextNode("");break}r=n}r.nodeType===c?/^ +$/.test(r.data)&&(r.data=""):r.isLeaf()&&r.parentNode.insertBefore(i.createTextNode(""),r)}else if(!r.querySelector("BR"))for(t=i.createElement("BR");(n=r.lastElementChild)&&!n.isInline();)r=n;return t&&r.appendChild(t),this}}),function(){var e=document.createElement("div"),t=document.createTextNode("12");return e.appendChild(t),t.splitText(2),2!==e.childNodes.length}()&&(Text.prototype.splitText=function(e){var t=this.ownerDocument.createTextNode(this.data.slice(e)),n=this.nextSibling,r=this.parentNode,i=this.length-e;return n?r.insertBefore(t,n):r.appendChild(t),i&&this.deleteData(e,i),t})})(UA,DOMTreeWalker),function(e){"use strict";var t,n=Array.prototype.indexOf,r=1,i=3,o=4,s=1,a=0,l=1,d=2,c=3,f=function(e,t){for(var n=e.childNodes;t&&e.nodeType===r;)e=n[t-1],n=e.childNodes,t=n.length;return e},u=function(e,t){if(e.nodeType===r){var n=e.childNodes;if(n.length>t)e=n[t];else{for(;e&&!e.nextSibling;)e=e.parentNode;e&&(e=e.nextSibling)}}return e},h={forEachTextNode:function(t){var n=this.cloneRange();n.moveBoundariesDownTree();for(var r=n.startContainer,i=n.endContainer,a=n.commonAncestorContainer,l=new e(a,o,function(){return s},!1),d=l.currentNode=r;!t(d,n)&&d!==i&&(d=l.nextNode()););},getTextContent:function(){var e="";return this.forEachTextNode(function(t,n){var r=t.data;r&&/\S/.test(r)&&(t===n.endContainer&&(r=r.slice(0,n.endOffset)),t===n.startContainer&&(r=r.slice(n.startOffset)),e+=r)}),e},_insertNode:function(e){var t,r,o,s,a=this.startContainer,l=this.startOffset,d=this.endContainer,c=this.endOffset;return a.nodeType===i?(t=a.parentNode,r=t.childNodes,l===a.length?(l=n.call(r,a)+1,this.collapsed&&(d=t,c=l)):(l&&(s=a.splitText(l),d===a?(c-=l,d=s):d===t&&(c+=1),a=s),l=n.call(r,a)),a=t):r=a.childNodes,o=r.length,l===o?a.appendChild(e):a.insertBefore(e,r[l]),a===d&&(c+=r.length-o),this.setStart(a,l),this.setEnd(d,c),this},_extractContents:function(e){var t=this.startContainer,r=this.startOffset,o=this.endContainer,s=this.endOffset;e||(e=this.commonAncestorContainer),e.nodeType===i&&(e=e.parentNode);for(var a,l=o.split(s,e),d=t.split(r,e),c=e.ownerDocument.createDocumentFragment();d!==l;)a=d.nextSibling,c.appendChild(d),d=a;return this.setStart(e,l?n.call(e.childNodes,l):e.childNodes.length),this.collapse(!0),e.fixCursor(),c},_deleteContents:function(){this.moveBoundariesUpTree(),this._extractContents();var e=this.getStartBlock(),t=this.getEndBlock();e&&t&&e!==t&&e.mergeWithBlock(t,this),e&&e.fixCursor();var n=this.endContainer.ownerDocument.body,r=n.firstChild;r&&"BR"!==r.nodeName||(n.fixCursor(),this.selectNodeContents(n.firstChild));var i=this.collapsed;return this.moveBoundariesDownTree(),i&&this.collapse(!0),this},insertTreeFragment:function(e){for(var t=!0,n=e.childNodes,i=n.length;i--;)if(!n[i].isInline()){t=!1;break}if(this.collapsed||this._deleteContents(),this.moveBoundariesDownTree(),t)this._insertNode(e),this.collapse(!1);else{for(var o,s,a=this.startContainer.split(this.startOffset,this.startContainer.ownerDocument.body),l=a.previousSibling,d=l,c=d.childNodes.length,f=a,u=0,h=a.parentNode;(o=d.lastChild)&&o.nodeType===r&&"BR"!==o.nodeName;)d=o,c=d.childNodes.length;for(;(o=f.firstChild)&&o.nodeType===r&&"BR"!==o.nodeName;)f=o;for(;(o=e.firstChild)&&o.isInline();)d.appendChild(o);for(;(o=e.lastChild)&&o.isInline();)f.insertBefore(o,f.firstChild),u+=1;for(s=e;s=s.getNextBlock();)s.fixCursor();h.insertBefore(e,a),s=a.previousSibling,a.textContent?a.mergeContainers():h.removeChild(a),a.parentNode||(f=s,u=f.getLength()),l.textContent?l.mergeContainers():(d=l.nextSibling,c=0,h.removeChild(l)),this.setStart(d,c),this.setEnd(f,u),this.moveBoundariesDownTree()}},containsNode:function(e,t){var n=this,r=e.ownerDocument.createRange();if(r.selectNode(e),t){var i=n.compareBoundaryPoints(c,r)>-1,o=1>n.compareBoundaryPoints(l,r);return!i&&!o}var s=1>n.compareBoundaryPoints(a,r),f=n.compareBoundaryPoints(d,r)>-1;return s&&f},moveBoundariesDownTree:function(){for(var e,t=this.startContainer,n=this.startOffset,r=this.endContainer,o=this.endOffset;t.nodeType!==i&&(e=t.childNodes[n],e&&!e.isLeaf());)t=e,n=0;if(o)for(;r.nodeType!==i&&(e=r.childNodes[o-1],e&&!e.isLeaf());)r=e,o=r.getLength();else for(;r.nodeType!==i&&(e=r.firstChild,e&&!e.isLeaf());)r=e;return this.collapsed?(this.setStart(r,o),this.setEnd(t,n)):(this.setStart(t,n),this.setEnd(r,o)),this},moveBoundariesUpTree:function(e){var t,r=this.startContainer,i=this.startOffset,o=this.endContainer,s=this.endOffset;for(e||(e=this.commonAncestorContainer);r!==e&&!i;)t=r.parentNode,i=n.call(t.childNodes,r),r=t;for(;o!==e&&s===o.getLength();)t=o.parentNode,s=n.call(t.childNodes,o)+1,o=t;return this.setStart(r,i),this.setEnd(o,s),this},getStartBlock:function(){var e,t=this.startContainer;return t.isInline()?e=t.getPreviousBlock():t.isBlock()?e=t:(e=f(t,this.startOffset),e=e.getNextBlock()),e&&this.containsNode(e,!0)?e:null},getEndBlock:function(){var e,t,n=this.endContainer;if(n.isInline())e=n.getPreviousBlock();else if(n.isBlock())e=n;else{if(e=u(n,this.endOffset),!e)for(e=n.ownerDocument.body;t=e.lastChild;)e=t;e=e.getPreviousBlock()}return e&&this.containsNode(e,!0)?e:null},startsAtBlockBoundary:function(){for(var e,t,r=this.startContainer,i=this.startOffset;r.isInline();){if(i)return!1;e=r.parentNode,i=n.call(e.childNodes,r),r=e}for(;i&&(t=r.childNodes[i-1])&&(""===t.data||"BR"===t.nodeName);)i-=1;return!i},endsAtBlockBoundary:function(){for(var e,t,r=this.endContainer,i=this.endOffset,o=r.getLength();r.isInline();){if(i!==o)return!1;e=r.parentNode,i=n.call(e.childNodes,r)+1,r=e,o=r.childNodes.length}for(;o>i&&(t=r.childNodes[i])&&(""===t.data||"BR"===t.nodeName);)i+=1;return i===o},expandToBlockBoundaries:function(){var e,t=this.getStartBlock(),r=this.getEndBlock();return t&&r&&(e=t.parentNode,this.setStart(e,n.call(e.childNodes,t)),e=r.parentNode,this.setEnd(e,n.call(e.childNodes,r)+1)),this}};for(t in h)Range.prototype[t]=h[t]}(DOMTreeWalker),function(e,t,n){"use strict";var r,i=2,o=1,s=3,a=4,l=1,d=3,c=e.defaultView,f=e.body,u=t.isOpera,h=t.isGecko,p=t.isIOS,N=t.isIE,C=t.isIE8,g=t.cantFocusEmptyTextNodes,m=t.losesSelectionOnBlur,v=t.useTextFixer,y=function(t,n,r){var i,o,s,a=e.createElement(t);if(n instanceof Array&&(r=n,n=null),n)for(i in n)a.setAttribute(i,n[i]);if(r)for(o=0,s=r.length;s>o;o+=1)a.appendChild(r[o]);return a},T={focus:1,blur:1,pathChange:1,select:1,input:1,undoStateChange:1},B={},x=function(e,t){var n,i,o,s=B[e];if(s)for(t||(t={}),t.type!==e&&(t.type=e),n=0,i=s.length;i>n;n+=1){o=s[n];try{o.handleEvent?o.handleEvent(t):o(t)}catch(a){r.didError(a)}}},S=function(e){x(e.type,e)},O=function(t,n){var r=B[t];r||(r=B[t]=[],T[t]||e.addEventListener(t,S,!1)),r.push(n)},I=function(t,n){var r,i=B[t];if(i){for(r=i.length;r--;)i[r]===n&&i.splice(r,1);i.length||(delete B[t],T[t]||e.removeEventListener(t,S,!1))}},E=function(t,n,r,i){if(t instanceof Range)return t.cloneRange();var o=e.createRange();return o.setStart(t,n),r?o.setEnd(r,i):o.setEnd(t,n),o},D=c.getSelection(),k=null,L=function(e){e&&(p&&c.focus(),D.removeAllRanges(),D.addRange(e))},b=function(){return D.rangeCount&&(k=D.getRangeAt(0).cloneRange(),k.startContainer.isLeaf()&&k.setStartBefore(k.startContainer),k.endContainer.isLeaf()&&k.setEndBefore(k.endContainer)),k};m&&c.addEventListener("beforedeactivate",b,!0);var A,w,P=null,R=!0,U=!1,V=function(){R=!0,U=!1},F=function(e){P&&(R=!0,H()),U||(setTimeout(V,0),U=!0),R=!1,P=e},H=function(){if(R){var e,t=P;if(P=null,t.parentNode){for(;(e=t.data.indexOf("​"))>-1;)t.deleteData(e,1);t.data||t.nextSibling||t.previousSibling||!t.parentNode.isInline()||t.parentNode.detach()}}},W="",_=function(e,t){P&&!t&&H(e);var n,r=e.startContainer,i=e.endContainer;(t||r!==A||i!==w)&&(A=r,w=i,n=r&&i?r===i?i.getPath():"(selection)":"",W!==n&&(W=n,x("pathChange",{path:n}))),r!==i&&x("select")},M=function(){_(b())};O("keyup",M),O("mouseup",M);var z=function(){h&&f.focus(),c.focus()},K=function(){h&&f.blur(),top.focus()};c.addEventListener("focus",S,!1),c.addEventListener("blur",S,!1);var q,G,Q,Y,$=function(){return f.innerHTML},j=function(e){var t=f;t.innerHTML=e;do t.fixCursor();while(t=t.getNextBlock())},Z=function(e,t){t||(t=b()),t.collapse(!0),t._insertNode(e),t.setStartAfter(e),L(t),_(t)},J=Array.prototype.indexOf,X="squire-selection-start",et="squire-selection-end",tt=function(e){var t,n=y("INPUT",{id:X,type:"hidden"}),r=y("INPUT",{id:et,type:"hidden"});e._insertNode(n),e.collapse(!1),e._insertNode(r),n.compareDocumentPosition(r)&i&&(n.id=et,r.id=X,t=n,n=r,r=t),e.setStartAfter(n),e.setEndBefore(r)},nt=function(t){var n=e.getElementById(X),r=e.getElementById(et);if(n&&r){var i,o=n.parentNode,s=r.parentNode,a={startContainer:o,endContainer:s,startOffset:J.call(o.childNodes,n),endOffset:J.call(s.childNodes,r)};o===s&&(a.endOffset-=1),n.detach(),r.detach(),o.mergeInlines(a),o!==s&&s.mergeInlines(a),t||(t=e.createRange()),t.setStart(a.startContainer,a.startOffset),t.setEnd(a.endContainer,a.endOffset),i=t.collapsed,t.moveBoundariesDownTree(),i&&t.collapse(!0)}return t||null},rt=function(){Y&&(Y=!1,x("undoStateChange",{canUndo:!0,canRedo:!1})),x("input")};O("keyup",function(e){var t=e.keyCode;e.ctrlKey||e.metaKey||e.altKey||!(16>t||t>20)||!(33>t||t>45)||rt()});var it=function(e){Y||(q+=1,Q>q&&(G.length=Q=q),e&&tt(e),G[q]=$(),Q+=1,Y=!0)},ot=function(){if(0!==q||!Y){it(b()),q-=1,j(G[q]);var e=nt();e&&L(e),Y=!0,x("undoStateChange",{canUndo:0!==q,canRedo:!0}),x("input")}},st=function(){if(Q>q+1&&Y){q+=1,j(G[q]);var e=nt();e&&L(e),x("undoStateChange",{canUndo:!0,canRedo:Q>q+1}),x("input")}},at=function(e,t,r){if(e=e.toUpperCase(),t||(t={}),!r&&!(r=b()))return!1;var i,o,c=r.commonAncestorContainer;if(c.nearest(e,t))return!0;if(c.nodeType===s)return!1;i=new n(c,a,function(e){return r.containsNode(e,!0)?l:d},!1);for(var f=!1;o=i.nextNode();){if(!o.nearest(e,t))return!1;f=!0}return f},lt=function(e,t,r){if(r.collapsed){var i=y(e,t).fixCursor();r._insertNode(i),r.setStart(i.firstChild,i.firstChild.length),r.collapse(!0)}else{var o,c,f,u=new n(r.commonAncestorContainer,a,function(e){return r.containsNode(e,!0)?l:d},!1),h=0,p=0,N=u.currentNode=r.startContainer;N.nodeType!==s&&(N=u.nextNode());do f=!N.nearest(e,t),N===r.endContainer&&(f&&N.length>r.endOffset?N.splitText(r.endOffset):p=r.endOffset),N===r.startContainer&&(f&&r.startOffset?N=N.splitText(r.startOffset):h=r.startOffset),f&&(y(e,t).wraps(N),p=N.length),c=N,o||(o=c);while(N=u.nextNode());r=E(o,h,c,p)}return r},dt=function(t,n,r,i){tt(r);var o;r.collapsed&&(g?(o=e.createTextNode("​"),F(o)):o=e.createTextNode(""),r._insertNode(o));for(var a=r.commonAncestorContainer;a.isInline();)a=a.parentNode;var l=r.startContainer,d=r.startOffset,c=r.endContainer,f=r.endOffset,u=[],h=function(e,t){if(!r.containsNode(e,!1)){var n,i,o=e.nodeType===s;if(!r.containsNode(e,!0))return"INPUT"===e.nodeName||o&&!e.data||u.push([t,e]),void 0;if(o)e===c&&f!==e.length&&u.push([t,e.splitText(f)]),e===l&&d&&(e.splitText(d),u.push([t,e]));else for(n=e.firstChild;n;n=i)i=n.nextSibling,h(n,t)}},p=Array.prototype.filter.call(a.getElementsByTagName(t),function(e){return r.containsNode(e,!0)&&e.is(t,n)});i||p.forEach(function(e){h(e,e)}),u.forEach(function(e){e[0].cloneNode(!1).wraps(e[1])}),p.forEach(function(e){e.replaceWith(e.empty())}),nt(r),o&&r.collapse(!1);var N={startContainer:r.startContainer,startOffset:r.startOffset,endContainer:r.endContainer,endOffset:r.endOffset};return a.mergeInlines(N),r.setStart(N.startContainer,N.startOffset),r.setEnd(N.endContainer,N.endOffset),r},ct=function(e,t,n,r){(n||(n=b()))&&(it(n),nt(n),t&&(n=dt(t.tag.toUpperCase(),t.attributes||{},n,r)),e&&(n=lt(e.tag.toUpperCase(),e.attributes||{},n)),L(n),_(n,!0),rt())},ft={DIV:"DIV",PRE:"DIV",H1:"DIV",H2:"DIV",H3:"DIV",H4:"DIV",H5:"DIV",H6:"DIV",P:"DIV",DT:"DD",DD:"DT",LI:"LI"},ut=function(e,t,n){var r=ft[e.nodeName],i=t.split(n,e.parentNode);return i.nodeName!==r&&(e=y(r),e.className="rtl"===i.dir?"dir-rtl":"",e.dir=i.dir,e.replaces(i).appendChild(i.empty()),i=e),i},ht=function(e,t,n){if(n||(n=b())){t&&(it(n),nt(n));var r=n.getStartBlock(),i=n.getEndBlock();if(r&&i)do if(e(r)||r===i)break;while(r=r.getNextBlock());t&&(L(n),_(n,!0),rt())}},pt=function(e,t){if(t||(t=b())){u||f.setAttribute("contenteditable","false"),Y?tt(t):it(t),t.expandToBlockBoundaries(),t.moveBoundariesUpTree(f);var n=t._extractContents(f);t._insertNode(e(n)),t.endOffset<t.endContainer.childNodes.length&&t.endContainer.childNodes[t.endOffset].mergeContainers(),t.startContainer.childNodes[t.startOffset].mergeContainers(),u||f.setAttribute("contenteditable","true"),nt(t),L(t),_(t,!0),rt()}},Nt=function(e){return y("BLOCKQUOTE",[e])},Ct=function(e){var t=e.querySelectorAll("blockquote");return Array.prototype.filter.call(t,function(e){return!e.parentNode.nearest("BLOCKQUOTE")}).forEach(function(e){e.replaceWith(e.empty())}),e},gt=function(e){for(var t,n=e.querySelectorAll("blockquote"),r=n.length;r--;)t=n[r],t.replaceWith(t.empty());return e},mt=function(e,t){var n,r,i,o,s,a;for(n=0,r=e.length;r>n;n+=1)i=e[n],o=i.nodeName,i.isBlock()?"LI"!==o&&(a=y("LI",{"class":"rtl"===i.dir?"dir-rtl":"",dir:i.dir},[i.empty()]),i.parentNode.nodeName===t?i.replaceWith(a):(s=i.previousSibling)&&s.nodeName===t?(s.appendChild(a),i.detach(),n-=1,r-=1):i.replaceWith(y(t,[a]))):i.isContainer()&&(o!==t&&/^[DOU]L$/.test(o)?i.replaceWith(y(t,[i.empty()])):mt(i.childNodes,t))},vt=function(e){return mt(e.childNodes,"UL"),e},yt=function(e){return mt(e.childNodes,"OL"),e},Tt=function(e){var t=e.querySelectorAll("UL, OL");return Array.prototype.filter.call(t,function(e){return!e.parentNode.nearest("UL")&&!e.parentNode.nearest("OL")}).forEach(function(e){for(var t,n=e.empty(),r=n.childNodes,i=r.length;i--;)t=r[i],"LI"===t.nodeName&&n.replaceChild(y("DIV",{"class":"rtl"===t.dir?"dir-rtl":"",dir:t.dir},[t.empty()]),t);e.replaceWith(n)}),e},Bt=/\b((?:(?:ht|f)tps?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\([^\s()<>]+\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])|(?:[\w\-.%+]+@(?:[\w\-]+\.)+[A-Z]{2,4}))/i,xt=function(e){for(var t,r,i,o,s,c,f,u=e.ownerDocument,h=new n(e,a,function(e){return e.nearest("A")?d:l},!1);t=h.nextNode();)if(r=t.data.split(Bt),o=r.length,o>1){for(c=t.parentNode,f=t.nextSibling,i=0;o>i;i+=1)s=r[i],i?(i%2?(t=u.createElement("A"),t.textContent=s,t.href=/@/.test(s)?"mailto:"+s:/^(?:ht|f)tps?:/.test(s)?s:"http://"+s):t=u.createTextNode(s),f?c.insertBefore(t,f):c.appendChild(t)):t.data=s;h.currentNode=t}},St=/^A(?:DDRESS|RTICLE|SIDE)|BLOCKQUOTE|CAPTION|D(?:[DLT]|IV)|F(?:IGURE|OOTER)|H[1-6]|HEADER|L(?:ABEL|EGEND|I)|O(?:L|UTPUT)|P(?:RE)?|SECTION|T(?:ABLE|BODY|D|FOOT|H|HEAD|R)|UL$/,Ot={1:10,2:13,3:16,4:18,5:24,6:32,7:48},It={color:{regexp:/\S/,replace:function(e){return y("SPAN",{"class":"colour",style:"color:"+e})}},fontWeight:{regexp:/^bold/i,replace:function(){return y("B")}},fontStyle:{regexp:/^italic/i,replace:function(){return y("I")}},fontFamily:{regexp:/\S/,replace:function(e){return y("SPAN",{"class":"font",style:"font-family:"+e})}},fontSize:{regexp:/\S/,replace:function(e){return y("SPAN",{"class":"size",style:"font-size:"+e})}}},Et={SPAN:function(e,t){var n,r,i,o,s,a,l=e.style;for(n in It)r=It[n],i=l[n],i&&r.regexp.test(i)&&(a=r.replace(i),o&&o.appendChild(a),o=a,s||(s=a));return s&&(o.appendChild(e.empty()),t.replaceChild(s,e)),o||e},STRONG:function(e,t){var n=y("B");return t.replaceChild(n,e),n.appendChild(e.empty()),n},EM:function(e,t){var n=y("I");return t.replaceChild(n,e),n.appendChild(e.empty()),n},FONT:function(e,t){var n,r,i,o,s=e.face,a=e.size;return s&&(n=y("SPAN",{"class":"font",style:"font-family:"+s})),a&&(r=y("SPAN",{"class":"size",style:"font-size:"+Ot[a]+"px"}),n&&n.appendChild(r)),o=n||r||y("SPAN"),i=r||n||o,t.replaceChild(o,e),i.appendChild(e.empty()),i},TT:function(e,t){var n=y("SPAN",{"class":"font",style:'font-family:menlo,consolas,"courier new",monospace'});return t.replaceChild(n,e),n.appendChild(e.empty()),n}},Dt=function(e){for(var t,n=e.childNodes,r=n.length;r--;)t=n[r],t.nodeType===o&&(Dt(t),t.isInline()&&!t.firstChild&&e.removeChild(t))},kt=function(e,t){var n,r,i,a,l,d,c,f=e.childNodes;for(n=0,r=f.length;r>n;n+=1)if(i=f[n],a=i.nodeName,l=i.nodeType,d=Et[a],l===o){if(c=i.childNodes.length,d)i=d(i,e);else if(!St.test(a)&&!i.isInline()){n-=1,r+=c-1,e.replaceChild(i.empty(),i);continue}!t&&i.style.cssText&&i.removeAttribute("style"),c&&kt(i,t)}else l===s&&(/\S/.test(i.data)||n>0&&f[n-1].isInline()||r>n+1&&f[n+1].isInline())||(e.removeChild(i),n-=1,r-=1);return e},Lt=function(e,t){var n,r,i,o,s=e.childNodes,a=null;for(n=0,r=s.length;r>n;n+=1)i=s[n],o="BR"===i.nodeName,!o&&i.isInline()?(a||(a=y(t)),a.appendChild(i),n-=1,r-=1):(o||a)&&(a||(a=y(t)),a.fixCursor(),o?e.replaceChild(a,i):(e.insertBefore(a,i),n+=1,r+=1),a=null);return a&&e.appendChild(a.fixCursor()),e},bt=function(e){for(var t,n,r=e.querySelectorAll("BR"),i=r.length;i--;)if(t=r[i],n=t.parentNode){for(;n.isInline();)n=n.parentNode;n.isBlock()?ft[n.nodeName]&&/\S/.test(n.textContent)&&(ut(n,t.parentNode,t),t.detach()):Lt(n,"DIV")}},At=function(){try{f.fixCursor()}catch(e){r.didError(e)}};O(N?"beforecut":"cut",function(){var e=b();it(e),nt(e),L(e),setTimeout(At,0)});var wt=!1;O(N?"beforepaste":"paste",function(e){if(!wt){var t,n=e.clipboardData,i=n&&n.items,o=!1;if(i)for(t=i.length;t--;)if(/^image\/.*/.test(i[t].type))return e.preventDefault(),x("dragover",{dataTransfer:n,preventDefault:function(){o=!0}}),o&&x("drop",{dataTransfer:n}),void 0;wt=!0;var s=b(),a=s.startContainer,l=s.startOffset,d=s.endContainer,c=s.endOffset,u=y("DIV",{style:"position: absolute; overflow: hidden; top:"+(f.scrollTop+30)+"px; left: 0; width: 1px; height: 1px;"});f.appendChild(u),s.selectNodeContents(u),L(s),setTimeout(function(){try{var e=u.detach().empty(),t=e.firstChild,n=E(a,l,d,c);if(t){t===e.lastChild&&"DIV"===t.nodeName&&e.replaceChild(t.empty(),t),e.normalize(),xt(e),kt(e,!1),bt(e),Dt(e);for(var i=e,o=!0;i=i.getNextBlock();)i.fixCursor();x("willPaste",{fragment:e,preventDefault:function(){o=!1}}),o&&(n.insertTreeFragment(e),rt(),n.collapse(!1))}L(n),_(n,!0),wt=!1}catch(s){r.didError(s)}},0)}});var Pt={8:"backspace",9:"tab",13:"enter",32:"space",46:"delete"},Rt=function(e){return function(t){t.preventDefault(),e()}},Ut=function(e){return function(t){t.preventDefault();var n=b();at(e,null,n)?ct(null,{tag:e},n):ct({tag:e},null,n)}},Vt=function(){try{var e,t=b(),n=t.startContainer;if(n.nodeType===s&&(n=n.parentNode),n.isInline()&&!n.textContent){do e=n.parentNode;while(e.isInline()&&!e.textContent&&(n=e));t.setStart(e,J.call(e.childNodes,n)),t.collapse(!0),e.removeChild(n),e.isBlock()||(e=e.getPreviousBlock()),e.fixCursor(),t.moveBoundariesDownTree(),L(t),_(t)}}catch(i){r.didError(i)}};C&&O("keyup",function(){var e=f.firstChild;"P"===e.nodeName&&(tt(b()),e.replaceWith(y("DIV",[e.empty()])),L(nt()))});var Ft={enter:function(t){t.preventDefault();var n=b();if(n){it(n),xt(n.startContainer),nt(n),n.collapsed||n._deleteContents();var r,i=n.getStartBlock(),a=i?i.nodeName:"DIV",l=ft[a];if(!i)return n._insertNode(y("BR")),n.collapse(!1),L(n),_(n,!0),rt(),void 0;var d,c=n.startContainer,h=n.startOffset;if(l||(c===i&&(c=h?c.childNodes[h-1]:null,h=0,c&&("BR"===c.nodeName?c=c.nextSibling:h=c.getLength(),c&&"BR"!==c.nodeName||(d=y("DIV").fixCursor(),c?i.replaceChild(d,c):i.appendChild(d),c=d))),Lt(i,"DIV"),l="DIV",c||(c=i.firstChild),n.setStart(c,h),n.setEnd(c,h),i=n.getStartBlock()),!i.textContent){if(i.nearest("UL")||i.nearest("OL"))return pt(Tt,n);if(i.nearest("BLOCKQUOTE"))return pt(gt,n)}for(r=ut(i,c,h);r.nodeType===o;){var p,N=r.firstChild;if("A"!==r.nodeName){for(;N&&N.nodeType===s&&!N.data&&(p=N.nextSibling,p&&"BR"!==p.nodeName);)N.detach(),N=p;if(!N||"BR"===N.nodeName||N.nodeType===s&&!u)break;r=N}else r.replaceWith(r.empty()),r=N}n=E(r,0),L(n),_(n,!0),r.nodeType===s&&(r=r.parentNode),r.offsetTop+r.offsetHeight>(e.documentElement.scrollTop||f.scrollTop)+f.offsetHeight&&r.scrollIntoView(!1),rt()}},backspace:function(e){var t=b();if(t.collapsed)if(t.startsAtBlockBoundary()){e.preventDefault();var n=t.getStartBlock(),r=n.getPreviousBlock();if(r){if(!r.isContentEditable)return r.detach(),void 0;for(r.mergeWithBlock(n,t),n=r.parentNode;n&&!n.nextSibling;)n=n.parentNode;n&&(n=n.nextSibling)&&n.mergeContainers(),L(t)}else{if(n.nearest("UL")||n.nearest("OL"))return pt(Tt,t);if(n.nearest("BLOCKQUOTE"))return pt(Ct,t);L(t),_(t,!0)}}else setTimeout(Vt,0);else e.preventDefault(),t._deleteContents(),L(t),_(t,!0)},"delete":function(e){var t=b();if(t.collapsed)if(t.endsAtBlockBoundary()){e.preventDefault();var n=t.getStartBlock(),r=n.getNextBlock();if(r){if(!r.isContentEditable)return r.detach(),void 0;for(n.mergeWithBlock(r,t),r=n.parentNode;r&&!r.nextSibling;)r=r.parentNode;r&&(r=r.nextSibling)&&r.mergeContainers(),L(t),_(t,!0)}}else setTimeout(Vt,0);else e.preventDefault(),t._deleteContents(),L(t),_(t,!0)},space:function(){var e=b();it(e),xt(e.startContainer),nt(e),L(e)},"ctrl-b":Ut("B"),"ctrl-i":Ut("I"),"ctrl-u":Ut("U"),"ctrl-y":Rt(st),"ctrl-z":Rt(ot),"ctrl-shift-z":Rt(st)};O(u?"keypress":"keydown",function(e){var t=e.keyCode,n=Pt[t]||String.fromCharCode(t).toLowerCase(),r="";u&&46===e.which&&(n="."),t>111&&124>t&&(n="f"+(t-111)),e.altKey&&(r+="alt-"),(e.ctrlKey||e.metaKey)&&(r+="ctrl-"),e.shiftKey&&(r+="shift-"),n=r+n,Ft[n]&&Ft[n](e)});var Ht=function(e){return function(){return e.apply(null,arguments),this}},Wt=function(e,t,n){return function(){return e(t,n),z(),this}};c.editor=r={didError:function(e){console.log(e)},_setPlaceholderTextNode:F,addEventListener:Ht(O),removeEventListener:Ht(I),focus:Ht(z),blur:Ht(K),getDocument:function(){return e},addStyles:function(t){if(t){var n=e.documentElement.firstChild,r=y("STYLE",{type:"text/css"});r.styleSheet?(n.appendChild(r),r.styleSheet.cssText=t):(r.appendChild(e.createTextNode(t)),n.appendChild(r))}return this},getHTML:function(e){var t,n,r,i,o,s=[];if(e&&(o=b())&&tt(o),v)for(t=f;t=t.getNextBlock();)t.textContent||t.querySelector("BR")||(n=y("BR"),t.appendChild(n),s.push(n));if(r=$(),v)for(i=s.length;i--;)s[i].detach();return o&&nt(o),r},setHTML:function(t){var n,r=e.createDocumentFragment(),i=y("DIV");i.innerHTML=t,r.appendChild(i.empty()),kt(r,!0),bt(r),Lt(r,"DIV");for(var o=r;o=o.getNextBlock();)o.fixCursor();for(;n=f.lastChild;)f.removeChild(n);f.appendChild(r),f.fixCursor(),q=-1,G=[],Q=0,Y=!1;var s=nt()||E(f.firstChild,0);return it(s),nt(s),m?k=s:L(s),_(s,!0),this},getSelectedText:function(){return b().getTextContent()},insertElement:Ht(Z),insertImage:function(e){var t=y("IMG",{src:e});return Z(t),t},getPath:function(){return W},getSelection:b,setSelection:Ht(L),undo:Ht(ot),redo:Ht(st),hasFormat:at,changeFormat:Ht(ct),bold:Wt(ct,{tag:"B"}),italic:Wt(ct,{tag:"I"}),underline:Wt(ct,{tag:"U"}),removeBold:Wt(ct,null,{tag:"B"}),removeItalic:Wt(ct,null,{tag:"I"}),removeUnderline:Wt(ct,null,{tag:"U"}),makeLink:function(t){t=encodeURI(t);var n=b();if(n.collapsed){var r=t.indexOf(":")+1;if(r)for(;"/"===t[r];)r+=1;n._insertNode(e.createTextNode(t.slice(r)))}return ct({tag:"A",attributes:{href:t}},{tag:"A"},n),z(),this},removeLink:function(){return ct(null,{tag:"A"},b(),!0),z(),this},setFontFace:function(e){return ct({tag:"SPAN",attributes:{"class":"font",style:"font-family: "+e+", sans-serif;"}},{tag:"SPAN",attributes:{"class":"font"}}),z(),this},setFontSize:function(e){return ct({tag:"SPAN",attributes:{"class":"size",style:"font-size: "+("number"==typeof e?e+"px":e)}},{tag:"SPAN",attributes:{"class":"size"}}),z(),this},setTextColour:function(e){return ct({tag:"SPAN",attributes:{"class":"colour",style:"color: "+e}},{tag:"SPAN",attributes:{"class":"colour"}}),z(),this},setHighlightColour:function(e){return ct({tag:"SPAN",attributes:{"class":"highlight",style:"background-color: "+e}},{tag:"SPAN",attributes:{"class":"highlight"}}),z(),this},setTextAlignment:function(e){return ht(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/align/.test(e)}).join(" ")+" align-"+e).trim(),t.style.textAlign=e},!0),z(),this},setTextDirection:function(e){return ht(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/dir/.test(e)}).join(" ")+" dir-"+e).trim(),t.dir=e},!0),z(),this},forEachBlock:Ht(ht),modifyBlocks:Ht(pt),increaseQuoteLevel:Wt(pt,Nt),decreaseQuoteLevel:Wt(pt,Ct),makeUnorderedList:Wt(pt,vt),makeOrderedList:Wt(pt,yt),removeList:Wt(pt,Tt)},f.setAttribute("contenteditable","true"),r.setHTML(""),c.onEditorLoad&&(c.onEditorLoad(c.editor),c.onEditorLoad=null)}(document,UA,DOMTreeWalker);