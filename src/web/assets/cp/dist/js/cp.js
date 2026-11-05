var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r},n=customElements,r=n;if(!r.__pkSafeDefine){let e=n.define.bind(n);n.define=((t,r,i)=>{n.get(t)||e(t,r,i)}),r.__pkSafeDefine=!0}var i={"bis-subscription-created":{width:24,height:24,path:`M9 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM9 12c-4.42 0-8 3.13-8 7v3h1.5v-3c0-3.04 2.91-5.5 6.5-5.5 1.57 0 3.01.47 4.14 1.26l.86-1.23A8.8 8.8 0 0 0 9 12Zm9-1v4h-4v1.5h4v4h1.5v-4h4V15h-4v-4Z`},"bis-verification-pending":{width:24,height:24,path:`M7 10V7a5 5 0 0 1 10 0v3h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1Zm1.5 0h7V7a3.5 3.5 0 0 0-7 0v3ZM6 11.5A1.5 1.5 0 0 0 4.5 13v6A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H6Zm5.25 3h1.5v4h-1.5Z`},"bis-subscription-verified":{width:24,height:24,path:`M12 1 3 5v7c0 5 4 9 9 11 5-2 9-6 9-11V5l-9-4Zm0 1.65 7.5 3.32V12c0 4.12-3.28 7.62-7.5 9.37C7.78 19.62 4.5 16.12 4.5 12V5.97L12 2.65ZM8.06 11.44 7 12.5l3.5 3.5L17 9.5l-1.06-1.06-5.44 5.44Z`},"bis-notification-sent":{width:24,height:24,path:`M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H4Zm0 1.5h16c.38 0 .73.14 1 .37L12 12.5 3 5.87c.27-.23.62-.37 1-.37ZM2.5 7.36l9.5 6.99 9.5-6.99V17a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V7.36Z`},"bis-notification-review":{width:24,height:24,path:`M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h9v-1.5H4A1.5 1.5 0 0 1 2.5 17V7.36l9.5 6.99 9.5-6.99V13H23V7a3 3 0 0 0-3-3H4Zm0 1.5h16c.38 0 .73.14 1 .37L12 12.5 3 5.87c.27-.23.62-.37 1-.37Zm12.06 9.44L15 16l2.44 2.44L15 20.88l1.06 1.06 2.44-2.44 2.44 2.44L22 20.88l-2.44-2.44L22 16l-1.06-1.06-2.44 2.44Z`},"bis-activity":{width:24,height:24,path:`M12 1a11 11 0 1 1 0 22 11 11 0 0 1 0-22Zm0 1.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm-.75 3.5v6.44l4.97 2.87.75-1.3-4.22-2.44V6Z`}},a=globalThis,o=a.ShadowRoot&&(a.ShadyCSS===void 0||a.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,s=Symbol(),c=new WeakMap,l=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(o&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=c.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&c.set(t,e))}return e}toString(){return this.cssText}},u=e=>new l(typeof e==`string`?e:e+``,void 0,s),d=(e,...t)=>new l(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,s),f=(e,t)=>{if(o)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=a.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},p=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return u(t)})(e):e,{is:m,defineProperty:h,getOwnPropertyDescriptor:g,getOwnPropertyNames:_,getOwnPropertySymbols:v,getPrototypeOf:y}=Object,b=globalThis,x=b.trustedTypes,ee=x?x.emptyScript:``,S=b.reactiveElementPolyfillSupport,C=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?ee:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},te=(e,t)=>!m(e,t),ne={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:te};Symbol.metadata??=Symbol(`metadata`),b.litPropertyMetadata??=new WeakMap;var re=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&h(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=g(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ne}static _$Ei(){if(this.hasOwnProperty(C(`elementProperties`)))return;let e=y(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C(`properties`))){let e=this.properties,t=[..._(e),...v(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(p(e))}else e!==void 0&&t.push(p(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return f(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?w:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?w:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??te)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};re.elementStyles=[],re.shadowRootOptions={mode:`open`},re[C(`elementProperties`)]=new Map,re[C(`finalized`)]=new Map,S?.({ReactiveElement:re}),(b.reactiveElementVersions??=[]).push(`2.1.2`);var T=globalThis,ie=e=>e,ae=T.trustedTypes,oe=ae?ae.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,se=`$lit$`,ce=`lit$${Math.random().toFixed(9).slice(2)}$`,le=`?`+ce,ue=`<${le}>`,de=document,fe=()=>de.createComment(``),pe=e=>e===null||typeof e!=`object`&&typeof e!=`function`,me=Array.isArray,he=e=>me(e)||typeof e?.[Symbol.iterator]==`function`,ge=`[ 	
\f\r]`,_e=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ve=/-->/g,ye=/>/g,be=RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),xe=/'/g,Se=/"/g,Ce=/^(?:script|style|textarea|title)$/i,E=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),D=Symbol.for(`lit-noChange`),O=Symbol.for(`lit-nothing`),we=new WeakMap,Te=de.createTreeWalker(de,129);function Ee(e,t){if(!me(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oe===void 0?t:oe.createHTML(t)}var De=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=_e;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===_e?c[1]===`!--`?o=ve:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=be):(Ce.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=be):o=ye:o===be?c[0]===`>`?(o=i??_e,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?be:c[3]===`"`?Se:xe):o===Se||o===xe?o=be:o===ve||o===ye?o=_e:(o=be,i=void 0);let d=o===be&&e[t+1].startsWith(`/>`)?` `:``;a+=o===_e?n+ue:l>=0?(r.push(s),n.slice(0,l)+se+n.slice(l)+ce+d):n+ce+(l===-2?t:d)}return[Ee(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Oe=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=De(t,n);if(this.el=e.createElement(l,r),Te.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Te.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(se)){let t=u[o++],n=i.getAttribute(e).split(ce),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ne:r[1]===`?`?Pe:r[1]===`@`?Fe:Me}),i.removeAttribute(e)}else e.startsWith(ce)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ce.test(i.tagName)){let e=i.textContent.split(ce),t=e.length-1;if(t>0){i.textContent=ae?ae.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],fe()),Te.nextNode(),c.push({type:2,index:++a});i.append(e[t],fe())}}}else if(i.nodeType===8){if(i.data===le)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(ce,e+1))!==-1;)c.push({type:7,index:a}),e+=ce.length-1}}a++}}static createElement(e,t){let n=de.createElement(`template`);return n.innerHTML=e,n}};function ke(e,t,n=e,r){if(t===D)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=pe(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=ke(e,i._$AS(e,t.values),i,r)),t}var Ae=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??de).importNode(t,!0);Te.currentNode=r;let i=Te.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new je(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ie(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Te.nextNode(),a++)}return Te.currentNode=de,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},je=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ke(this,e,t),pe(e)?e===O||e==null||e===``?(this._$AH!==O&&this._$AR(),this._$AH=O):e!==this._$AH&&e!==D&&this._(e):e._$litType$===void 0?e.nodeType===void 0?he(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==O&&pe(this._$AH)?this._$AA.nextSibling.data=e:this.T(de.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Oe.createElement(Ee(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ae(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new Oe(e)),t}k(t){me(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(fe()),this.O(fe()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ie(e).nextSibling;ie(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Me=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=O,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=O}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=ke(this,e,t,0),a=!pe(e)||e!==this._$AH&&e!==D,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=ke(this,r[n+o],t,o),s===D&&(s=this._$AH[o]),a||=!pe(s)||s!==this._$AH[o],s===O?e=O:e!==O&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ne=class extends Me{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===O?void 0:e}},Pe=class extends Me{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==O)}},Fe=class extends Me{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=ke(this,e,t,0)??O)===D)return;let n=this._$AH,r=e===O&&n!==O||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==O&&(n===O||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ie=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ke(this,e)}},Le={M:se,P:ce,A:le,C:1,L:De,R:Ae,D:he,V:ke,I:je,H:Me,N:Pe,U:Fe,B:Ne,F:Ie},Re=T.litHtmlPolyfillSupport;Re?.(Oe,je),(T.litHtmlVersions??=[]).push(`3.3.3`);var ze=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new je(t.insertBefore(fe(),e),e,void 0,n??{})}return i._$AI(e),i},Be=globalThis,Ve=class extends re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};Ve._$litElement$=!0,Ve.finalized=!0,Be.litElementHydrateSupport?.({LitElement:Ve});var He=Be.litElementPolyfillSupport;He?.({LitElement:Ve}),(Be.litElementVersions??=[]).push(`4.2.2`);var k=e=>(t,n)=>{let r=()=>{customElements.get(e)||customElements.define(e,t)};n===void 0?r():n.addInitializer(r)},Ue=new Map;function We(e,t,n){let r=t.flatMap(e=>Array.isArray(e)?e:[e]).map(e=>`cssText`in e&&typeof e.cssText==`string`?e.cssText:u(e).cssText).join(`
`);if(!(`adoptedStyleSheets`in Document.prototype)||typeof CSSStyleSheet>`u`){let i=n??String(t.length);if(!e.querySelector(`style[data-pk-adopted-styles="${i}"]`)){let t=document.createElement(`style`);t.dataset.pkAdoptedStyles=i,t.textContent=r,e.prepend(t)}return}let i=n??r,a=Ue.get(i);a||(a=new CSSStyleSheet,a.replaceSync(r),Ue.set(i,a)),e.adoptedStyleSheets=[...e.adoptedStyleSheets,a]}var Ge=d`
    @layer pk-component {
        :host {
            display: inline-block;
            vertical-align: middle;
        }
    }
`;d`
    .pk-focus-ring:focus {
        outline: none;
    }

    .pk-focus-ring:focus-visible {
        box-shadow: var(--pk-shadow-focus);
    }
`;var Ke=d`
    @layer pk-reset {
        :host {
            box-sizing: border-box;
        }

        :host *,
        :host *::before,
        :host *::after {
            box-sizing: border-box;
        }

        :host(:not([hidden])) {
            /* Prevent UA / CP margin on unstyled custom element hosts in light DOM. */
            margin: 0;
        }
    }
`,A=class extends Ve{constructor(...e){super(...e),this.pkRenderFailed=!1}static{this.shadowRootOptions={mode:`open`,delegatesFocus:!0}}connectedCallback(){super.connectedCallback(),this.hasAttribute(`data-pk`)||this.setAttribute(`data-pk`,``)}createRenderRoot(){let e=super.createRenderRoot();return We(e,[Ke],`pk-shadow-reset`),e}performUpdate(){if(!this.pkRenderFailed)try{let e=super.performUpdate();e instanceof Promise&&e.catch(e=>{this.handleRenderFailure(e)})}catch(e){this.handleRenderFailure(e)}}handleRenderFailure(e){let t=e instanceof Error?e:Error(String(e));this.pkRenderFailed=!0,this.dispatchEvent(new CustomEvent(`pk-error`,{detail:{tagName:this.localName||this.tagName.toLowerCase(),message:t.message,stack:t.stack},bubbles:!0,composed:!0}));try{let e=this.renderRoot;if(e){e.textContent=``;let t=document.createElement(`div`);t.setAttribute(`part`,`error`),t.setAttribute(`role`,`alert`),t.textContent=`This control failed to load.`,e.appendChild(t)}}catch{}}};function j(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var qe={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:te},Je=(e=qe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function M(e){return(t,n)=>typeof n==`object`?Je(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function N(e){return M({...e,state:!0,attribute:!1})}var Ye=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function P(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return Ye(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return Ye(n,r,{get(){return a(this)}})}}function Xe(e=`default`){return e===`xxs`||e===`xs`?`xxs`:e===`lg`||e===`xl`?`sm`:`xs`}function Ze(e=`default`,t){return t||(e===`primary`||e===`secondary`||e===`dashed`||e===`outline`||e===`transparent`?e:`default`)}var Qe=[Ge,d`
        @layer pk-component {
            :host {
                display: block;
                box-sizing: border-box;
            }

            :host([centered]) {
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                width: fit-content;
                height: fit-content;
                margin: 0;
                transform: translate(-50%, -50%);
            }

            .spinner {
                display: block;
                box-sizing: border-box;
                margin-inline: auto;
                border-style: solid;
                border-bottom-color: transparent;
                border-left-color: transparent;
                border-radius: 50%;
                animation: pk-spinner-spin 0.5s linear infinite;
            }

            /* Sizes */
            :host([size='xxs']) .spinner {
                width: 0.75rem;
                height: 0.75rem;
                border-width: 1px;
            }

            :host([size='xs']) .spinner {
                width: 1rem;
                height: 1rem;
                border-width: 2px;
            }

            :host([size='sm']) .spinner,
            :host(:not([size])) .spinner {
                width: 1.5rem;
                height: 1.5rem;
                border-width: 2px;
            }

            :host([size='md']) .spinner {
                width: 2rem;
                height: 2rem;
                border-width: 2px;
            }

            :host([size='lg']) .spinner {
                width: 3rem;
                height: 3rem;
                border-width: 2px;
            }

            :host([size='xl']) .spinner {
                width: 4rem;
                height: 4rem;
                border-width: 2px;
            }

            /* Variants — matched to button loading contrast */
            :host([variant='default']:not([tone])) .spinner {
                border-top-color: var(--pk-color-red-500);
                border-right-color: var(--pk-color-red-500);
            }

            :host([variant='primary']:not([tone])) .spinner,
            :host([variant='secondary']:not([tone])) .spinner {
                border-top-color: var(--pk-color-white);
                border-right-color: var(--pk-color-white);
            }

            :host([variant='dashed']:not([tone])) .spinner,
            :host([variant='outline']:not([tone])) .spinner,
            :host([variant='transparent']:not([tone])) .spinner {
                border-top-color: var(--pk-color-gray-700);
                border-right-color: var(--pk-color-gray-700);
            }

            /* Standalone tone overrides */
            :host([tone='sky']) .spinner {
                border-top-color: var(--pk-color-sky-600);
                border-right-color: var(--pk-color-sky-600);
            }

            :host([tone='emerald']) .spinner {
                border-top-color: var(--pk-color-emerald-600);
                border-right-color: var(--pk-color-emerald-600);
            }

            :host([tone='violet']) .spinner {
                border-top-color: var(--pk-color-violet-600);
                border-right-color: var(--pk-color-violet-600);
            }

            :host([tone='amber']) .spinner {
                border-top-color: var(--pk-color-amber-500);
                border-right-color: var(--pk-color-amber-500);
            }

            @keyframes pk-spinner-spin {
                to {
                    transform: rotate(360deg);
                }
            }
        }
    `],$e=class extends A{constructor(...e){super(...e),this.variant=`default`,this.size=`sm`,this.centered=!1}static{this.styles=Qe}render(){return E`
            <div part="base" class="spinner" aria-hidden="true"></div>
        `}};j([M({reflect:!0})],$e.prototype,`variant`,void 0),j([M({reflect:!0})],$e.prototype,`size`,void 0),j([M({reflect:!0})],$e.prototype,`tone`,void 0),j([M({type:Boolean,reflect:!0})],$e.prototype,`centered`,void 0),$e=j([k(`pk-spinner`)],$e);var et=d`
    @layer pk-component {
        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            display: block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
            pointer-events: none;
            vertical-align: middle;
            overflow: visible;
        }
    }
`;function tt(e,t=`var(--pk-btn-radius, var(--pk-radius-lg))`){let n=u(e),r=u(t);return d`
        ${n} {
            border-top-left-radius: var(--pk-bg-start-start-radius, ${r});
            border-top-right-radius: var(--pk-bg-start-end-radius, ${r});
            border-bottom-left-radius: var(--pk-bg-end-start-radius, ${r});
            border-bottom-right-radius: var(--pk-bg-end-end-radius, ${r});
        }
    `}function nt(){return d`
        :host([data-pk-group-orientation='horizontal']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-end-start-radius: 0;
        }

        :host([data-pk-group-orientation='vertical']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
        }
    `}function rt(){return d`
        :host([data-pk-group-orientation='horizontal'][data-pk-group-join][variant='outline']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-join][variant='dashed']) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            margin-block-start: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join][variant='outline']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-join][variant='dashed']) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            margin-inline-start: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([variant='outline']):not([variant='dashed']):not([variant='link']):not([variant='none'])) {
            margin-inline-start: var(--pk-bg-horizontal-indent, 0);
            margin-block-start: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([variant='outline']):not([variant='dashed']):not([variant='link']):not([variant='none'])) {
            margin-block-start: var(--pk-bg-vertical-indent, 0);
            margin-inline-start: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join][variant='primary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join][variant='secondary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join][variant='default']) {
            margin-inline-start: 0;
            margin-block-start: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join][variant='primary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join][variant='secondary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join][variant='default']) {
            margin-block-start: 0;
            margin-inline-start: 0;
        }

        /* Filled variants — Craft margin gap; parent background shows through.
         * !important: outer preflight/utilities beat non-important :host margin
         * (revert-layer cannot restore shadow host values — it still specifies outer 0).
         */
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='primary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='secondary']),
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='default']) {
            margin-inline-end: var(--pk-btn-group-gap, 1px) !important;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='primary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='secondary']),
        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='default']) {
            margin-block-end: var(--pk-btn-group-gap, 1px) !important;
        }
    `}function it(e){let t=u(e);return d`
        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) ${t} {
            border-left-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) ${t} {
            border-top-width: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]:not([variant='outline']):not([variant='dashed'])) ${t} {
            border-left-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]:not([variant='outline']):not([variant='dashed'])) ${t} {
            border-top-width: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='outline']) ${t},
        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='dashed']) ${t} {
            border-right-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='outline']) ${t},
        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='dashed']) ${t} {
            border-bottom-width: 0;
        }
    `}var F={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},at=e=>(...t)=>({_$litDirective$:e,values:t}),ot=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},st=class extends ot{constructor(e){if(super(e),this.it=O,e.type!==F.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===O||e==null)return this._t=void 0,this.it=e;if(e===D)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};st.directiveName=`unsafeHTML`,st.resultType=1;var ct=at(st),lt=class extends st{};lt.directiveName=`unsafeSVG`,lt.resultType=2;var ut=at(lt),dt={width:448,height:512,path:`M352 64c0-17.7-14.3-32-32-32L128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32l-192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32z`},ft={width:448,height:512,path:`M448 64c0-17.7-14.3-32-32-32L32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32L32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32z`},pt={width:448,height:512,path:`M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z`},mt={width:448,height:512,path:`M448 64c0 17.7-14.3 32-32 32L192 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z`},ht={width:384,height:512,path:`M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z`},gt={width:512,height:512,path:`M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z`},_t={width:512,height:512,path:`M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z`},vt={width:512,height:512,path:`M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z`},yt={width:512,height:512,path:`M436.7 74.7L448 85.4 448 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l47.9 0-7.6-7.2c-.2-.2-.4-.4-.6-.6-75-75-196.5-75-271.5 0s-75 196.5 0 271.5 196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c99.9-99.9 261.7-100 361.7-.3z`},bt={width:384,height:512,path:`M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z`},xt={width:512,height:512,path:`M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0-201.4 201.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3 448 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 96C35.8 96 0 131.8 0 176L0 432c0 44.2 35.8 80 80 80l256 0c44.2 0 80-35.8 80-80l0-80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 80c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l80 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 96z`},St={width:448,height:512,path:`M224 0c17.7 0 32 14.3 32 32l0 168.6 144-83.1c15.3-8.8 34.9-3.6 43.7 11.7s3.6 34.9-11.7 43.7L288 256 432 339.1c15.3 8.8 20.6 28.4 11.7 43.7s-28.4 20.6-43.7 11.7L256 311.4 256 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-168.6-144 83.1c-15.3 8.8-34.9 3.6-43.7-11.7S.7 348 16 339.1L160 256 16 172.9C.7 164-4.5 144.5 4.3 129.1S32.7 108.6 48 117.4L192 200.6 192 32c0-17.7 14.3-32 32-32z`},Ct={width:384,height:512,path:`M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l32 0 0 320-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l224 0c70.7 0 128-57.3 128-128 0-46.5-24.8-87.3-62-109.7 18.7-22.3 30-51 30-82.3 0-70.7-57.3-128-128-128L32 32zM288 160c0 35.3-28.7 64-64 64l-96 0 0-128 96 0c35.3 0 64 28.7 64 64zM128 416l0-128 128 0c35.3 0 64 28.7 64 64s-28.7 64-64 64l-128 0z`},wt={width:576,height:512,path:`M416 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c17.7 0 32 14.3 32 32l0 37.5c0 25.5 10.1 49.9 28.1 67.9l22.6 22.6-22.6 22.6c-18 18-28.1 42.4-28.1 67.9l0 37.5c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c53 0 96-43 96-96l0-37.5c0-8.5 3.4-16.6 9.4-22.6l45.3-45.3c12.5-12.5 12.5-32.8 0-45.3l-45.3-45.3c-6-6-9.4-14.1-9.4-22.6l0-37.5c0-53-43-96-96-96zM160 32c-53 0-96 43-96 96l0 37.5c0 8.5-3.4 16.6-9.4 22.6L9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l45.3 45.3c6 6 9.4 14.1 9.4 22.6L64 384c0 53 43 96 96 96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-17.7 0-32-14.3-32-32l0-37.5c0-25.5-10.1-49.9-28.1-67.9L77.3 256 99.9 233.4c18-18 28.1-42.4 28.1-67.9l0-37.5c0-17.7 14.3-32 32-32l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0z`},Tt={width:448,height:512,path:`M128 0C110.3 0 96 14.3 96 32l0 32-32 0C28.7 64 0 92.7 0 128l0 48 448 0 0-48c0-35.3-28.7-64-64-64l-32 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32-128 0 0-32c0-17.7-14.3-32-32-32zM0 224L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192-448 0z`},Et={width:320,height:512,path:`M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z`},Dt={width:320,height:512,path:`M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z`},Ot={width:448,height:512,path:`M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z`},kt={width:448,height:512,path:`M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z`},At={width:320,height:512,path:`M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z`},jt={width:320,height:512,path:`M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z`},Mt={width:448,height:512,path:`M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z`},Nt={width:512,height:512,path:`M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z`},Pt={width:512,height:512,path:`M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z`},Ft={width:512,height:512,path:`M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z`},It={width:512,height:512,path:`M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z`},Lt={width:384,height:512,path:`M320 32l-8.6 0C300.4 12.9 279.7 0 256 0L128 0C104.3 0 83.6 12.9 72.6 32L64 32C28.7 32 0 60.7 0 96L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-352c0-35.3-28.7-64-64-64zM136 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0z`},Rt={width:512,height:512,path:`M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z`},zt={width:512,height:512,path:`M288 448l-224 0 0-224 48 0 0-64-48 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-48-64 0 0 48zm-64-96l224 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L224 0c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64z`},Bt={width:576,height:512,path:`M360.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm64.6 136.1c-12.5 12.5-12.5 32.8 0 45.3l73.4 73.4-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0zm-274.7 0c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 150.6 182.6c12.5-12.5 12.5-32.8 0-45.3z`},Vt={width:448,height:512,path:`M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z`},Ht={width:448,height:512,path:`M256 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 210.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 242.7 256 32zM64 320c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-46.9 0-56.6 56.6c-31.2 31.2-81.9 31.2-113.1 0L110.9 320 64 320zm304 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z`},Ut={width:448,height:512,path:`M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z`},Wt={width:512,height:512,path:`M502.6 54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L413 53.8C369.6 20.1 315.2 0 256 0 114.6 0 0 114.6 0 256 0 315.2 20.1 369.6 53.8 413L9.4 457.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L99 458.2c43.3 33.7 97.8 53.8 157 53.8 141.4 0 256-114.6 256-256 0-59.2-20.1-113.6-53.8-157l44.4-44.4zM367.2 99.5L99.5 367.2C77.1 335.9 64 297.5 64 256 64 150 150 64 256 64 297.5 64 335.9 77.1 367.2 99.5zm-222.5 313L412.5 144.8c22.4 31.4 35.5 69.8 35.5 111.2 0 106-86 192-192 192-41.5 0-79.9-13.1-111.2-35.5z`},Gt={width:576,height:512,path:`M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z`},Kt={width:576,height:512,path:`M272 48L160 48c-8.8 0-16 7.2-16 16l0 176-48 0 0-176c0-35.3 28.7-64 64-64L293.5 0c17 0 33.3 6.7 45.3 18.7L461.3 141.3c12 12 18.7 28.3 18.7 45.3l0 53.5-48 0 0-32-88 0c-39.8 0-72-32.2-72-72l0-88zM96 384l48 0 0 64c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-64 48 0 0 64c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-64zM412.1 160L320 67.9 320 136c0 13.3 10.7 24 24 24l68.1 0zM24 288l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24zm208 0l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm208 0l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z`},qt={width:448,height:512,path:`M32 0C49.7 0 64 14.3 64 32l0 16 69-17.2c38.1-9.5 78.3-5.1 113.5 12.5 46.3 23.2 100.8 23.2 147.1 0l9.6-4.8C423.8 28.1 448 43.1 448 66.1l0 279.7c0 13.3-8.3 25.3-20.8 30l-34.7 13c-46.2 17.3-97.6 14.6-141.7-7.4-37.9-19-81.4-23.7-122.5-13.4L64 384 64 480c0 17.7-14.3 32-32 32S0 497.7 0 480L0 32C0 14.3 14.3 0 32 0zM64 187.1l64-13.9 0 65.5-64 13.9 0 65.5 48.8-12.2c5.1-1.3 10.1-2.4 15.2-3.3l0-63.9 38.9-8.4c8.3-1.8 16.7-2.5 25.1-2.1l0-64c13.6 .4 27.2 2.6 40.4 6.4l23.6 6.9 0 66.7-41.7-12.3c-7.3-2.1-14.8-3.4-22.3-3.8l0 71.4c21.8 1.9 43.3 6.7 64 14.4l0-69.8 22.7 6.7c13.5 4 27.3 6.4 41.3 7.4l0-64.2c-7.8-.8-15.6-2.3-23.2-4.5l-40.8-12 0-62c-13-3.8-25.8-8.8-38.2-15-8.2-4.1-16.9-7-25.8-8.8l0 72.4c-13-.4-26 .8-38.7 3.6l-25.3 5.5 0-75.2-64 16 0 73.1zM320 335.7c16.8 1.5 33.9-.7 50-6.8l14-5.2 0-71.7-7.9 1.8c-18.4 4.3-37.3 5.7-56.1 4.5l0 77.4zm64-149.4l0-70.8c-20.9 6.1-42.4 9.1-64 9.1l0 69.4c13.9 1.4 28 .5 41.7-2.6l22.3-5.2z`},Jt={width:448,height:512,path:`M71.3 295.6c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2s-57.4 21.9-79.2 0zM184.4 182.5c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2-57.3 21.8-79.2 0zm0 147c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.9-21.8-21.9-57.3 0-79.2zM297.5 216.4c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.8-21.9-21.8-57.3 0-79.2z`},Yt={width:512,height:512,path:`M64 224a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM256 96a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm192 0a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm0 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM256 416a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM64 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z`},Xt={width:320,height:512,path:`M128 64A64 64 0 1 0 0 64 64 64 0 1 0 128 64zm0 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM0 448c0 35.3 28.7 64 64 64s64-28.7 64-64-28.7-64-64-64-64 28.7-64 64zM320 64a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM192 256a64 64 0 1 0 128 0 64 64 0 1 0 -128 0zM320 448c0-35.3-28.7-64-64-64s-64 28.7-64 64 28.7 64 64 64 64-28.7 64-64z`},Zt={width:512,height:512,path:`M448 96c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-64 32c-15.8 7.9-22.2 27.1-14.3 42.9s27.1 22.2 42.9 14.3l17.7-8.8 0 236.2-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-288zM64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 128 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-128 0 0-128z`},Qt={width:576,height:512,path:`M96 96c0-17.7-14.3-32-32-32S32 78.3 32 96l0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zM368 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l81.1 0c21.5 0 38.9 17.4 38.9 38.9 0 13.9-7.5 26.8-19.6 33.8l-76.3 43.6C347.5 269.7 320 317.1 320 368.5l0 47.5c0 17.7 14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-128 0 0-15.5c0-28.4 15.2-54.6 39.9-68.7l76.3-43.6C532.2 237.9 552 203.8 552 166.9 552 110.1 505.9 64 449.1 64L368 64z`},$t={width:576,height:512,path:`M96 96c0-17.7-14.3-32-32-32S32 78.3 32 96l0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zM352 256c0 17.7 14.3 32 32 32l56 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-88 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l88 0c61.9 0 112-50.1 112-112 0-31.3-12.9-59.7-33.6-80 20.7-20.3 33.6-48.7 33.6-80 0-61.9-50.1-112-112-112l-88 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l88 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-56 0c-17.7 0-32 14.3-32 32z`},en={width:512,height:512,path:`M64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zm288 0c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 44.2 35.8 80 80 80l80 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-80 0c-8.8 0-16-7.2-16-16l0-112z`},tn={width:576,height:512,path:`M96 96c0-17.7-14.3-32-32-32S32 78.3 32 96l0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 96 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128-96 0 0-128zM352 64c-17.7 0-32 14.3-32 32l0 144c0 17.7 14.3 32 32 32l80 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-80 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l80 0c66.3 0 120-53.7 120-120S498.3 208 432 208l-48 0 0-80 120 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L352 64z`},nn={width:512,height:512,path:`M32 64c17.7 0 32 14.3 32 32l0 128 96 0 0-128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-96 0 0 128c0 17.7-14.3 32-32 32S0 433.7 0 416L0 96C0 78.3 14.3 64 32 64zm352 64c-17.7 0-32 14.3-32 32l0 53.5c10-3.5 20.8-5.5 32-5.5l32 0c53 0 96 43 96 96l0 48c0 53-43 96-96 96l-32 0c-53 0-96-43-96-96l0-192c0-53 43-96 96-96l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0zM352 304l0 48c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-48c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32z`},rn={width:576,height:512,path:`M315 315L473.4 99.9 444.1 70.6 229 229 315 315zm-187 5l0 0 0-71.7c0-15.3 7.2-29.6 19.5-38.6L420.6 8.4C428 2.9 437 0 446.2 0 457.6 0 468.5 4.5 476.6 12.6l54.8 54.8c8.1 8.1 12.6 19 12.6 30.5 0 9.2-2.9 18.2-8.4 25.6L334.4 396.5c-9 12.3-23.4 19.5-38.6 19.5l-71.7 0-25.4 25.4c-12.5 12.5-32.8 12.5-45.3 0l-50.7-50.7c-12.5-12.5-12.5-32.8 0-45.3L128 320zM7 466.3l51.7-51.7 70.6 70.6-19.7 19.7c-4.5 4.5-10.6 7-17 7L24 512c-13.3 0-24-10.7-24-24l0-4.7c0-6.4 2.5-12.5 7-17z`},an={width:512,height:512,path:`M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z`},on={width:384,height:512,path:`M128 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-58.7 0-133.3 320 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l58.7 0 133.3-320-64 0c-17.7 0-32-14.3-32-32z`},sn={width:384,height:512,path:`M292.9 384c7.3-22.3 21.9-42.5 38.4-59.9 32.7-34.4 52.7-80.9 52.7-132.1 0-106-86-192-192-192S0 86 0 192c0 51.2 20 97.7 52.7 132.1 16.5 17.4 31.2 37.6 38.4 59.9l201.7 0zM288 432l-192 0 0 16c0 44.2 35.8 80 80 80l32 0c44.2 0 80-35.8 80-80l0-16zM184 112c-39.8 0-72 32.2-72 72 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-66.3 53.7-120 120-120 13.3 0 24 10.7 24 24s-10.7 24-24 24z`},cn={width:576,height:512,path:`M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z`},ln={width:384,height:512,path:`M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z`},un={width:512,height:512,path:`M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z`},dn={width:512,height:512,path:`M0 72C0 58.8 10.7 48 24 48l48 0c13.3 0 24 10.7 24 24l0 104 24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-96 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-80-24 0C10.7 96 0 85.3 0 72zM30.4 301.2C41.8 292.6 55.7 288 70 288l4.9 0c33.7 0 61.1 27.4 61.1 61.1 0 19.6-9.4 37.9-25.2 49.4l-24 17.5 33.2 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-90.7 0C13.1 464 0 450.9 0 434.7 0 425.3 4.5 416.5 12.1 411l70.5-51.3c3.4-2.5 5.4-6.4 5.4-10.6 0-7.2-5.9-13.1-13.1-13.1L70 336c-3.9 0-7.7 1.3-10.8 3.6L38.4 355.2c-10.6 8-25.6 5.8-33.6-4.8S-1 324.8 9.6 316.8l20.8-15.6zM224 64l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z`},fn={width:512,height:512,path:`M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z`},pn={width:448,height:512,path:`M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z`},mn={width:448,height:512,path:`M0 64C0 46.3 14.3 32 32 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 112 224 0 0-112-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 320 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-144-224 0 0 144 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-320-16 0C14.3 96 0 81.7 0 64z`},hn={width:448,height:512,path:`M160 0L416 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0 0 416c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-416-48 0 0 416c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160-48 0C71.6 320 0 248.4 0 160S71.6 0 160 0z`},gn={width:512,height:512,path:`M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z`},_n={width:448,height:512,path:`M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z`},vn={width:512,height:512,path:`M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z`},yn={width:448,height:512,path:`M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 136zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 136z`},bn={width:512,height:512,path:`M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z`},xn={width:512,height:512,path:`M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z`},Sn={width:512,height:512,path:`M307.8 18.4c-12 5-19.8 16.6-19.8 29.6l0 80-112 0c-97.2 0-176 78.8-176 176 0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5-9.4-8.8-22.2-26.4-22.2-56.7 0-53 43-96 96-96l96 0 0 80c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-9.2-9.2-22.9-11.9-34.9-6.9z`},Cn={width:576,height:512,path:`M32 448L160 64h64l128 384h-64l-32-96H128l-32 96H32zm117.3-160h85.3L192 160l-42.7 128zM336 448l80-240h48l80 240h-48l-16-48h-80l-16 48h-48zm80-96h48l-24-72-24 72z`},wn={width:512,height:512,path:`M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z`},Tn={width:512,height:512,path:`M0 416c0 8.8 7.2 16 16 16l65.6 0c7.4 36.5 39.7 64 78.4 64s71-27.5 78.4-64L496 432c8.8 0 16-7.2 16-16s-7.2-16-16-16l-257.6 0c-7.4-36.5-39.7-64-78.4-64s-71 27.5-78.4 64L16 400c-8.8 0-16 7.2-16 16zm112 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM304 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm48-80c-38.7 0-71 27.5-78.4 64L16 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l257.6 0c7.4 36.5 39.7 64 78.4 64s71-27.5 78.4-64l65.6 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-65.6 0c-7.4-36.5-39.7-64-78.4-64zM192 144a48 48 0 1 1 0-96 48 48 0 1 1 0 96zm78.4-64C263 43.5 230.7 16 192 16s-71 27.5-78.4 64L16 80C7.2 80 0 87.2 0 96s7.2 16 16 16l97.6 0c7.4 36.5 39.7 64 78.4 64s71-27.5 78.4-64L496 112c8.8 0 16-7.2 16-16s-7.2-16-16-16L270.4 80z`},En={width:512,height:512,path:`M96 157.5C96 88.2 152.2 32 221.5 32L368 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L221.5 96c-34 0-61.5 27.5-61.5 61.5 0 31 23.1 57.2 53.9 61l44.1 5.5 222 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l83.1 0C103 204.6 96 181.8 96 157.5zM349.2 336l65.5 0c.9 6.1 1.4 12.2 1.4 18.5 0 69.3-56.2 125.5-125.5 125.5L144 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l146.5 0c34 0 61.5-27.5 61.5-61.5 0-6.4-1-12.7-2.8-18.5z`},Dn={width:576,height:512,path:`M96 64C78.3 64 64 78.3 64 96s14.3 32 32 32l15.3 0 89.6 128-89.6 128-15.3 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c10.4 0 20.2-5.1 26.2-13.6L240 311.8 325.8 434.4c6 8.6 15.8 13.6 26.2 13.6l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-15.3 0-89.6-128 89.6-128 15.3 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-10.4 0-20.2 5.1-26.2 13.6L240 200.2 154.2 77.6C148.2 69.1 138.4 64 128 64L96 64zM544 320c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16c-15.8 7.9-22.2 27.1-14.3 42.9 5.6 11.2 16.9 17.7 28.6 17.7l0 80c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-128z`},On={width:576,height:512,path:`M544 32c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16C449.9 27.3 443.5 46.5 451.4 62.3 457 73.5 468.3 80 480 80l0 80c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-128zM96 64C78.3 64 64 78.3 64 96s14.3 32 32 32l15.3 0 89.6 128-89.6 128-15.3 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c10.4 0 20.2-5.1 26.2-13.6L240 311.8 325.8 434.4c6 8.6 15.8 13.6 26.2 13.6l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-15.3 0-89.6-128 89.6-128 15.3 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-10.4 0-20.2 5.1-26.2 13.6L240 200.2 154.2 77.6C148.2 69.1 138.4 64 128 64L96 64z`},kn={width:448,height:512,path:`M384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64l-320 0-6.5-.3C25.2 476.4 0 449.1 0 416L0 96C0 60.7 28.7 32 64 32l320 0zM64 320l0 96 128 0 0-96-128 0zm192 0l0 96 128 0 0-96-128 0zM64 256l128 0 0-96-128 0 0 96zm192 0l128 0 0-96-128 0 0 96z`},An={width:576,height:512,path:`M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L322.7 256.9 368.2 96 471 96 465 120.2c-4.3 17.1 6.1 34.5 23.3 38.8s34.5-6.1 38.8-23.3l11-44.1C545.6 61.3 522.7 32 491.5 32l-319 0c-19.8 0-37.3 12.1-44.5 30.1l-87-87zM180.4 114.5l4.6-18.5 116.7 0-30.8 109-90.5-90.5zM241 310.8L211.3 416 160 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-42.2 0 15.1-53.3-51.9-51.9z`},jn={width:512,height:512,path:`M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z`},Mn={width:384,height:512,path:`M0 32C0 14.3 14.3 0 32 0L96 0c17.7 0 32 14.3 32 32S113.7 64 96 64l0 160c0 53 43 96 96 96s96-43 96-96l0-160c-17.7 0-32-14.3-32-32S270.3 0 288 0l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 160c0 88.4-71.6 160-160 160S32 312.4 32 224L32 64C14.3 64 0 49.7 0 32zM0 480c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32z`},Nn={width:384,height:512,path:`M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z`},Pn={width:128,height:512,path:`M64 144a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0 224c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56zm56-112c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56z`},Fn={width:512,height:512,path:`M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z`},In={width:512,height:512,path:`M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z`},Ln={width:448,height:512,path:`M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z`},Rn={alignCenter:dt,alignJustify:ft,alignLeft:pt,alignRight:mt,arrowDown:ht,arrowLeft:gt,arrowRight:_t,arrowRotateLeft:vt,arrowRotateRight:yt,arrowUp:bt,arrowUpRightFromSquare:xt,asterisk:St,bold:Ct,bracketsCurly:wt,calendar:Tt,caretDown:Et,caretUp:Dt,check:Ot,chevronDown:kt,chevronLeft:At,chevronRight:jt,chevronUp:Mt,circle:Nt,circleCheck:Pt,circleExclamation:Ft,circleInfo:It,clipboard:Lt,clock:Rt,clone:zt,code:Bt,copy:Vt,download:Ht,ellipsis:Ut,ellipsisVertical:Pn,emptySet:Wt,eye:Gt,fileDashedLine:Kt,flagCheckered:qt,gear:Fn,gripDots:Yt,gripDotsVertical:Xt,gripMove:Jt,h1:Zt,h2:Qt,h3:$t,h4:en,h5:tn,h6:nn,heading:mn,highlighter:rn,house:an,italic:on,lightbulb:sn,link:cn,lock:ln,list:un,listOl:dn,listUl:fn,minus:pn,paragraph:hn,pen:gn,penToSquare:In,plus:_n,circlePlus:vn,quoteRight:yn,arrowsRotate:bn,magnifyingGlass:xn,share:Sn,smallCaps:Cn,sliders:wn,slidersOutline:Tn,strikethrough:En,subscript:Dn,superscript:On,table:kn,textSlash:An,trash:Ln,triangleExclamation:jn,underline:Mn,xmark:Nn},zn=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),Bn=e=>{let t=e.trim();return t&&(/[A-Z]/.test(t)?zn(t):t.toLowerCase())},Vn=`__PK_ICON_REGISTRY__`,Hn=`__PK_ICON_REGISTRY_LISTENERS__`,Un=()=>{let e=globalThis;return e[Vn]||(e[Vn]={}),e[Vn]},Wn=()=>{let e=globalThis;return e[Hn]||(e[Hn]=new Set),e[Hn]},Gn=()=>{for(let e of Wn())try{e()}catch{}},Kn=e=>{let t=Wn();return t.add(e),()=>{t.delete(e)}},qn=()=>Object.keys(Un()).sort(),Jn=e=>{if(!e)return;let t=Un();return t[Bn(e)]??t[e]},Yn=(e,t)=>{let n=Bn(e);if(!n)throw Error(`registerIcon: name must be a non-empty string`);if(!t?.path||!t.width||!t.height)throw Error(`registerIcon: icon "${n}" must include width, height, and path`);Un()[n]=t,Gn()},Xn=e=>{let t=!1;for(let[n,r]of Object.entries(e)){let e=Bn(n);if(!e)throw Error(`registerIcon: name must be a non-empty string`);if(!r?.path||!r.width||!r.height)throw Error(`registerIcon: icon "${e}" must include width, height, and path`);Un()[e]=r,t=!0}t&&Gn()},Zn=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),Qn=e=>{let{width:t,height:n}=e;if(t===n)return`0 0 ${t} ${n}`;let r=Math.max(t,n);return`${(t-r)/2} ${(n-r)/2} ${r} ${r}`},$n=(e,t={})=>{let{title:n,className:r,attributes:i={}}=t,a={xmlns:`http://www.w3.org/2000/svg`,viewBox:Qn(e),overflow:`visible`,...i};return r&&(a.class=r),n?(a.role=`img`,a[`aria-label`]=n):(a[`aria-hidden`]=`true`,a.focusable=`false`),`<svg ${Object.entries(a).map(([e,t])=>`${e}="${Zn(t)}"`).join(` `)}><path fill="currentColor" d="${Zn(e.path)}"/></svg>`},er=t({alignCenter:()=>dt,alignJustify:()=>ft,alignLeft:()=>pt,alignRight:()=>mt,arrowDown:()=>ht,arrowLeft:()=>gt,arrowRight:()=>_t,arrowRotateLeft:()=>vt,arrowRotateRight:()=>yt,arrowUp:()=>bt,arrowUpRightFromSquare:()=>xt,arrowsRotate:()=>bn,asterisk:()=>St,bold:()=>Ct,bracketsCurly:()=>wt,calendar:()=>Tt,caretDown:()=>Et,caretUp:()=>Dt,check:()=>Ot,chevronDown:()=>kt,chevronLeft:()=>At,chevronRight:()=>jt,chevronUp:()=>Mt,circle:()=>Nt,circleCheck:()=>Pt,circleExclamation:()=>Ft,circleInfo:()=>It,circlePlus:()=>vn,clipboard:()=>Lt,clock:()=>Rt,clone:()=>zt,code:()=>Bt,copy:()=>Vt,download:()=>Ht,ellipsis:()=>Ut,ellipsisVertical:()=>Pn,emptySet:()=>Wt,eye:()=>Gt,fileDashedLine:()=>Kt,flagCheckered:()=>qt,gear:()=>Fn,getIcon:()=>Jn,getIconNames:()=>qn,gripDots:()=>Yt,gripDotsVertical:()=>Xt,gripMove:()=>Jt,h1:()=>Zt,h2:()=>Qt,h3:()=>$t,h4:()=>en,h5:()=>tn,h6:()=>nn,heading:()=>mn,highlighter:()=>rn,house:()=>an,iconToSvg:()=>$n,iconViewBox:()=>Qn,icons:()=>Rn,italic:()=>on,lightbulb:()=>sn,link:()=>cn,list:()=>un,listOl:()=>dn,listUl:()=>fn,lock:()=>ln,magnifyingGlass:()=>xn,minus:()=>pn,normalizeIconName:()=>Bn,paragraph:()=>hn,pen:()=>gn,penToSquare:()=>In,plus:()=>_n,quoteRight:()=>yn,registerIcon:()=>Yn,registerIcons:()=>Xn,share:()=>Sn,sliders:()=>wn,slidersOutline:()=>Tn,smallCaps:()=>Cn,strikethrough:()=>En,subscribeIconRegistry:()=>Kn,subscript:()=>Dn,superscript:()=>On,table:()=>kn,textSlash:()=>An,trash:()=>Ln,triangleExclamation:()=>jn,underline:()=>Mn,xmark:()=>Nn}),I=at(class extends ot{constructor(e){if(super(e),e.type!==F.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return D}}),tr=[Ge,et,nt(),tt(`.button`),rt(),it(`.button`),d`
        @layer pk-component {
            :host {
                font-family: var(--pk-font-family);
                cursor: pointer;
                --pk-btn-height: var(--pk-btn-height-default);
                --pk-btn-font: var(--pk-btn-font-default);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-default);
                --pk-btn-icon-size: var(--pk-btn-icon-size-default);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-default);
                --pk-btn-caret-size: var(--pk-btn-caret-size-default);
                --pk-btn-radius: var(--pk-btn-radius-default);
                /*
                 * Slotted labels inherit from the host — pin the size-token font
                 * (and button line-height) so Craft CP / Tailwind hosts match.
                 */
                font-size: var(--pk-btn-font);
                line-height: 1.2;
            }

            :host([disabled]) {
                cursor: not-allowed;
                pointer-events: none;
            }

            :host([loading]):not([disabled]) {
                pointer-events: none;
            }

            .button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: var(--pk-btn-icon-gap);
                box-sizing: border-box;
                width: auto;
                margin: 0;
                /* Every button carries a 1px border (transparent for fill/plain variants) so the box
                 * model is identical across variants and states. Prevents width shift when swapping a
                 * button between filled and outline/dashed, or toggling states. Matches Bootstrap
                 * (transparent baseline) and  (border always present, only color changes).
                 */
                border: 1px solid transparent;
                border-radius: var(--pk-btn-radius);
                font: inherit;
                font-size: var(--pk-btn-font);
                font-weight: 400;
                line-height: 1.2;
                text-decoration: none;
                white-space: nowrap;
                /* Inherit host cursor so className/style (e.g. cursor-move) pierce shadow. */
                cursor: inherit;
                user-select: none;
                vertical-align: middle;
                appearance: none;
                background: var(--pk-btn-fill, var(--pk-action-fill));
                color: var(--pk-btn-on, var(--pk-action-on));
                height: var(--pk-btn-height);
                min-height: var(--pk-btn-height);
                /* Block padding defaults to 0 (height tokens center content). Override for nav rows. */
                padding-block: var(--pk-btn-padding-block, 0);
                padding-inline: var(--pk-btn-padding-inline);
                transition: background-color 0.12s ease, box-shadow 0.12s ease, color 0.12s ease;
            }

            .button:disabled {
                opacity: 0.5;
            }

            .icon-slot {
                display: none;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                line-height: 0;
            }

            .icon-slot--has-content {
                display: inline-flex;
            }

            /* Fixed token sizes for all icons (labeled or icon-only) — matches plugin-kit-react Button. */
            .icon-slot slot::slotted(svg),
            slot[name='start']::slotted(svg),
            slot[name='end']::slotted(svg) {
                display: block;
                width: var(--pk-btn-icon-size);
                height: var(--pk-btn-icon-size);
                flex-shrink: 0;
                pointer-events: none;
            }

            .icon-slot slot::slotted(img),
            slot[name='start']::slotted(img),
            slot[name='end']::slotted(img) {
                display: block;
                width: var(--pk-btn-icon-size);
                height: var(--pk-btn-icon-size);
                object-fit: contain;
                flex-shrink: 0;
                pointer-events: none;
            }

            /* pk-icon sizes itself from font-size (1em), so scale it to the
             * icon token. This keeps the idiomatic slotted pk-icon usage in
             * sync with raw slotted svg. Set width/height explicitly — %/size-full
             * collapses when the icon-slot has no definite box.
             */
            .icon-slot slot::slotted(pk-icon),
            slot[name='start']::slotted(pk-icon),
            slot[name='end']::slotted(pk-icon) {
                font-size: var(--pk-btn-icon-size);
                width: var(--pk-btn-icon-size);
                height: var(--pk-btn-icon-size);
                /* Kill pk-icon's text-baseline nudge (-0.125em) — flex slots center optically. */
                vertical-align: 0;
                flex-shrink: 0;
                pointer-events: none;
            }

            .label {
                display: inline-flex;
                align-items: center;
                min-width: 0;
                line-height: 1.2;
            }

            /* Trailing slot (status): grow + clip the label so end sits at the far edge
             * and long titles truncate instead of colliding with the indicator.
             */
            .button:has(.icon-slot--end.icon-slot--has-content) .label:not(.is-empty) {
                flex: 1 1 auto;
                overflow: hidden;
            }

            .label.is-empty {
                display: none;
            }

            /* Icon-only (no label): square hit box = size height. Button owns the target;
             * glyph size comes from --pk-btn-icon-size. Do not Tailwind-size the Icon.
             * Opt out with icon (compact), size=none, or group-trigger (narrow disclosure cap).
             */
            :host(:not([icon]):not([size='none']):not([group-trigger])) .button:not(.has-label) {
                width: var(--pk-btn-height);
                min-width: var(--pk-btn-height);
                padding-inline: 0;
            }

            /* Compact density (icon attr): padless box that hugs the glyph.
             * size still drives --pk-btn-icon-size; height/width tiers do not apply.
             * Use for dense x / ellipsis in cells — not for table action rows (prefer square above).
             * line-height: 0 collapses whitespace flex-struts so the glyph sits dead-center.
             */
            :host([icon]) {
                display: inline-flex;
                line-height: 0;
                vertical-align: middle;
            }

            :host([icon]) .button {
                display: flex;
                width: auto;
                min-width: 0;
                height: auto;
                min-height: 0;
                padding-inline: 0.25rem;
                padding-block: 0;
                line-height: 0;
                align-items: center;
                justify-content: center;
            }

            /* Keep label space while loading even before slotchange runs. */
            .button.loading .label.is-empty {
                display: inline-flex;
                visibility: hidden;
            }

            /* Sizes — token-driven scale (see tokens.css) */
            :host([size='xxs']) {
                --pk-btn-height: var(--pk-btn-height-xxs);
                --pk-btn-font: var(--pk-btn-font-xxs);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-xxs);
                --pk-btn-icon-size: var(--pk-btn-icon-size-xxs);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-xxs);
                --pk-btn-caret-size: var(--pk-btn-caret-size-xxs);
                --pk-btn-radius: var(--pk-btn-radius-xxs);
            }

            :host([size='xs']) {
                --pk-btn-height: var(--pk-btn-height-xs);
                --pk-btn-font: var(--pk-btn-font-xs);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-xs);
                --pk-btn-icon-size: var(--pk-btn-icon-size-xs);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-xs);
                --pk-btn-caret-size: var(--pk-btn-caret-size-xs);
                --pk-btn-radius: var(--pk-btn-radius-xs);
            }

            :host([size='sm']) {
                --pk-btn-height: var(--pk-btn-height-sm);
                --pk-btn-font: var(--pk-btn-font-sm);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-sm);
                --pk-btn-icon-size: var(--pk-btn-icon-size-sm);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-sm);
                --pk-btn-caret-size: var(--pk-btn-caret-size-sm);
                --pk-btn-radius: var(--pk-btn-radius-sm);
            }

            :host([size='default']) {
                --pk-btn-height: var(--pk-btn-height-default);
                --pk-btn-font: var(--pk-btn-font-default);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-default);
                --pk-btn-icon-size: var(--pk-btn-icon-size-default);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-default);
                --pk-btn-caret-size: var(--pk-btn-caret-size-default);
                --pk-btn-radius: var(--pk-btn-radius-default);
            }

            :host([size='lg']) {
                --pk-btn-height: var(--pk-btn-height-lg);
                --pk-btn-font: var(--pk-btn-font-lg);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-lg);
                --pk-btn-icon-size: var(--pk-btn-icon-size-lg);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-lg);
                --pk-btn-caret-size: var(--pk-btn-caret-size-lg);
                --pk-btn-radius: var(--pk-btn-radius-lg);
            }

            :host([size='xl']) {
                --pk-btn-height: var(--pk-btn-height-xl);
                --pk-btn-font: var(--pk-btn-font-xl);
                --pk-btn-padding-inline: var(--pk-btn-padding-inline-xl);
                --pk-btn-icon-size: var(--pk-btn-icon-size-xl);
                --pk-btn-icon-gap: var(--pk-btn-icon-gap-xl);
                --pk-btn-caret-size: var(--pk-btn-caret-size-xl);
                --pk-btn-radius: var(--pk-btn-radius-xl);
            }

            /* No preset scale — size to content or set --pk-btn-* on the host for one-off dimensions
             * (height, padding, font, icon, radius) without fighting a named size tier.
             * Pair with icon for a padless glyph host, or set --pk-btn-padding-inline / --pk-btn-height yourself.
             */
            :host([size='none']) {
                --pk-btn-height: auto;
                --pk-btn-font: inherit;
                --pk-btn-padding-inline: 0px;
                --pk-btn-padding-block: 0px;
                --pk-btn-icon-size: 1em;
                --pk-btn-icon-gap: 0px;
                --pk-btn-caret-size: 1em;
                --pk-btn-radius: 0px;
            }

            :host([size='none']) .button {
                height: auto;
                min-height: auto;
                width: 100%;
            }

            /* Variants */
            :host([variant='default']) {
                --pk-btn-fill: var(--pk-action-fill);
                --pk-btn-fill-hover: var(--pk-action-fill-hover);
                --pk-btn-fill-active: var(--pk-action-fill-active);
                --pk-btn-on: var(--pk-action-on);
            }

            :host([variant='primary']) {
                --pk-btn-fill: var(--pk-action-primary-fill);
                --pk-btn-fill-hover: var(--pk-action-primary-fill-hover);
                --pk-btn-fill-active: var(--pk-action-primary-fill-active);
                --pk-btn-on: var(--pk-action-primary-on);
            }

            :host([variant='primary']) .button,
            :host([variant='secondary']) .button {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
            }

            :host([variant='secondary']) {
                --pk-btn-fill: var(--pk-color-gray-500);
                --pk-btn-fill-hover: var(--pk-color-gray-550);
                --pk-btn-fill-active: var(--pk-color-gray-600);
                --pk-btn-on: var(--pk-color-white);
            }

            :host([variant='outline']) .button {
                background: transparent;
                border-color: var(--pk-color-slate-400);
                color: var(--pk-color-gray-700);
            }

            :host([variant='transparent']) .button {
                background: transparent;
                color: var(--pk-color-gray-700);
            }

            /* link/none opt out of the shared transparent 1px border: they never render a border, so
             * carrying one only pads the box by 2px inline (and 2px block at size='none', where height
             * is auto). These are the "inline text" / "no chrome" variants — content-sized is the point,
             * and neither participates in button-group border joins. Other variants keep the stable box.
             */
            /*
             * Craft CP sets --link-color on :root (inherits into shadow). Prefer that,
             * then kit --pk-color-link — not sky-700 (reads as a different “CP blue”).
             * Color on :host so consumer utilities (e.g. text-[var(--link-color)]) can override.
             * Height must be content-sized — default --pk-btn-height (34px) bloated table rows.
             */
            :host([variant='link']) {
                color: var(--link-color, var(--pk-color-link));
                --pk-btn-height: auto;
                --pk-btn-padding-inline: 0;
                --pk-btn-padding-block: 0;
            }

            :host([variant='link']) .button {
                background: transparent;
                border-width: 0;
                border-radius: 0;
                color: inherit;
                width: auto;
                height: auto;
                min-height: 0;
                padding: 0;
                text-underline-offset: 2px;
            }

            :host([variant='dashed']) .button {
                background: transparent;
                border-style: dashed;
                border-color: var(--pk-color-slate-500);
                color: var(--pk-color-gray-700);
            }

            :host([variant='none']) .button {
                border-width: 0;
                border-radius: 0;
                background: transparent;
                color: inherit;
            }

            /* Interaction — pseudo-classes only; playground matrices use dev/pk-button-demo-states.css */
            .button:hover:not(:disabled) {
                background: var(--pk-btn-fill-hover, var(--pk-btn-fill));
            }

            :host([variant='outline']) .button:hover:not(:disabled),
            :host([variant='transparent']) .button:hover:not(:disabled),
            :host([variant='dashed']) .button:hover:not(:disabled) {
                background: var(--pk-color-slate-150);
            }

            :host([variant='link']) .button:hover:not(:disabled) {
                background: transparent;
                text-decoration: underline;
            }

            :host([variant='none']) .button:hover:not(:disabled) {
                background: transparent;
            }

            .button:active:not(:disabled) {
                background: var(--pk-btn-fill-active, var(--pk-btn-fill-hover, var(--pk-btn-fill)));
            }

            :host([variant='outline']) .button:active:not(:disabled),
            :host([variant='transparent']) .button:active:not(:disabled),
            :host([variant='dashed']) .button:active:not(:disabled) {
                background: var(--pk-color-slate-200);
            }

            :host([variant='link']) .button:active:not(:disabled),
            :host([variant='none']) .button:active:not(:disabled) {
                background: transparent;
            }

            .button:focus {
                outline: none;
            }

            .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            /* Bordered variants: fold the button's own border into the focus ring by recoloring it to
             * the accent (and solidifying dashed) so focus reads as one cohesive ring instead of a
             * doubled border. The ring is thinned to 1px here because the recolored 1px border already
             * supplies the other half — total 2px, matching the filled variants' ring weight.
             */
            :host([variant='outline']) .button:focus-visible,
            :host([variant='dashed']) .button:focus-visible {
                border-color: var(--pk-color-sky-600);
                box-shadow: 0 0 0 1px var(--pk-color-sky-600), 0 0 5px 1px hsl(from var(--pk-color-sky-600) h s l / 0.7);
            }

            :host([variant='dashed']) .button:focus-visible {
                border-style: solid;
            }

            :host(.pk-dialog__close) .button:focus-visible {
                box-shadow: 0 0 0 2px var(--pk-color-gray-600);
            }

            :host-context(pk-button-group) {
                position: relative;
            }

            :host-context(pk-button-group[orientation='vertical']) {
                display: block;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
            }

            :host-context(pk-button-group[orientation='vertical']) .button {
                width: 100%;
                box-sizing: border-box;
            }

            :host-context(pk-button-group:focus-visible) {
                z-index: 2;
            }

            /* Bordered variants — matching border divider (filled uses margin gap via buttonGroupIndentStyles) */

            :host([variant='primary']) .button:focus-visible,
            :host([variant='secondary']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus-inset);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button {
                background: var(--pk-color-gray-500);
                color: var(--pk-color-white);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button:hover:not(:disabled) {
                background: var(--pk-color-gray-550);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button:active:not(:disabled) {
                background: var(--pk-color-gray-600);
            }

            :host-context(pk-button-group[exclusive]):host([aria-pressed='true']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            :host([variant='link']) .button:focus-visible {
                box-shadow: none;
                text-decoration: underline;
            }

            .button.loading {
                position: relative;
                cursor: default;
                pointer-events: none;
            }

            .label.loading {
                visibility: hidden;
            }

            .button.loading .icon-slot,
            .button.loading slot[name='start']::slotted(*),
            .button.loading slot[name='end']::slotted(*) {
                visibility: hidden;
            }

            .button.caret .icon-slot--end.icon-slot--has-content {
                display: none;
            }

            /* Scope to the caret span — the button host also gets class caret when
               with-caret is set; an unscoped .caret rule was adding 2px margin
               to the whole button and shifting dropdown anchors left. */
            .button > .caret {
                display: inline-flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                line-height: 0;
                /* Sits slightly further from the label than the flex gap alone. */
                margin-inline-start: 2px;
            }

            /* Caret has its own per-size token (--pk-btn-caret-size), kept deliberately smaller than
             * --pk-btn-icon-size so it reads as a subordinate dropdown affordance next to real icons.
             */
            .button > .caret svg {
                display: block;
                width: var(--pk-btn-caret-size);
                height: var(--pk-btn-caret-size);
            }

            :host([group-trigger]) .button {
                padding-inline: 6px;
            }

            /* Compact disclosure cap — hide content, keep only the shared SVG caret (centered). */
            :host([group-trigger]) .label,
            :host([group-trigger]) .icon-slot {
                display: none;
            }

            :host([group-trigger]) .button > .caret {
                margin-inline-start: 0;
            }

            :host([size='sm'][group-trigger]) .button,
            :host([size='xs'][group-trigger]) .button,
            :host([size='xxs'][group-trigger]) .button {
                padding-inline: 6px;
            }

            :host([size='lg'][group-trigger]) .button {
                padding-inline: 10px;
            }

            :host([size='xl'][group-trigger]) .button {
                padding-inline: 12px;
            }

            :host-context(pk-button-group[orientation='horizontal']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host-context(pk-button-group[orientation='horizontal']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host-context(pk-button-group[orientation='horizontal']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-left-width: 0;
            }

            :host-context(pk-button-group[orientation='vertical']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host-context(pk-button-group[orientation='vertical']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host-context(pk-button-group[orientation='vertical']):host([data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-top-width: 0;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-left-width: 0;
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])[variant='outline']) .button,
            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])[variant='dashed']) .button,
            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])[variant='transparent']) .button {
                border-top-width: 0;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='outline']) .button {
                box-shadow: none;
                border-left-width: 1px;
                border-left-style: solid;
                border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='outline']) .button {
                box-shadow: none;
                border-top-width: 1px;
                border-top-style: solid;
                border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='dashed']) .button {
                box-shadow: none;
                border-left-width: 1px;
                border-left-style: dashed;
                border-left-color: var(--pk-btn-group-divider-color-dashed, var(--pk-color-slate-500));
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='dashed']) .button {
                box-shadow: none;
                border-top-width: 1px;
                border-top-style: dashed;
                border-top-color: var(--pk-btn-group-divider-color-dashed, var(--pk-color-slate-500));
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='outline']) .button:focus-visible,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][variant='dashed']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='outline']) .button:focus-visible,
            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][variant='dashed']) .button:focus-visible {
                box-shadow: var(--pk-shadow-focus);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='outline']) .button,
            :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail][variant='dashed']) .button {
                border-right-width: 0;
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='outline']) .button,
            :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail][variant='dashed']) .button {
                border-bottom-width: 0;
            }
        }
    `],nr=$n(kt),L=class extends A{constructor(...e){super(...e),this.variant=`default`,this.size=`default`,this.disabled=!1,this.loading=!1,this.withCaret=!1,this.groupTrigger=!1,this.icon=!1,this.title=``,this.ariaLabel=null,this.ariaPressed=null,this.ariaExpanded=null,this.ariaHasPopup=null,this.type=`button`,this.hasDefaultSlotContent=!1,this.hasStartSlotContent=!1,this.hasEndSlotContent=!1,this.startSlotChanged=e=>{this.iconSlotChanged(e,`start`)},this.endSlotChanged=e=>{this.iconSlotChanged(e,`end`)},this.handleHostClick=e=>{if(this.disabled||this.loading||this.href||this.type!==`submit`&&this.type!==`reset`)return;let t=this.resolveAssociatedForm();t&&(e.preventDefault(),e.stopPropagation(),this.type===`reset`?t.reset():typeof t.requestSubmit==`function`?t.requestSubmit():t.dispatchEvent(new Event(`submit`,{bubbles:!0,cancelable:!0})))}}static{this.shadowRootOptions={mode:`open`,delegatesFocus:!0}}static{this.styles=tr}defaultSlotChanged(e){let t=e.target;this.hasDefaultSlotContent=t.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?e.textContent?.trim():e.nodeType===Node.ELEMENT_NODE)}iconSlotChanged(e,t){let n=e.target.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?e.textContent?.trim():e.nodeType===Node.ELEMENT_NODE);t===`start`?this.hasStartSlotContent=n:this.hasEndSlotContent=n}buttonClasses(){return I({button:!0,"has-label":this.hasDefaultSlotContent,loading:this.loading,caret:this.withCaret,"group-trigger":this.groupTrigger})}connectedCallback(){super.connectedCallback(),this.setAttribute(`data-slot`,`button`),this.addEventListener(`click`,this.handleHostClick)}disconnectedCallback(){this.removeEventListener(`click`,this.handleHostClick),super.disconnectedCallback()}resolveAssociatedForm(){let e=(this.form||this.getAttribute(`form`)||``).trim();if(e){let t=this.ownerDocument?.getElementById(e);if(t instanceof HTMLFormElement&&t.id!==`main`)return t}let t=this.closest(`form`);return t&&t.id!==`main`?t:null}render(){let e=this.spinnerSize||Xe(this.size),t=Ze(this.variant,this.spinnerVariant),n=!!this.href,r=this.ariaLabel||this.title||``;return E`
            ${n?E`
                    <a
                        part="base"
                        class=${this.buttonClasses()}
                        href=${this.href}
                        target=${this.target??O}
                        rel=${this.rel??O}
                        aria-label=${r||O}
                        aria-pressed=${this.ariaPressed??O}
                        aria-expanded=${this.ariaExpanded??O}
                        aria-haspopup=${this.ariaHasPopup??O}
                    >
                        ${this.renderInner(e,t)}
                    </a>
                `:E`
                    <button
                        part="base"
                        class=${this.buttonClasses()}
                        type=${this.type}
                        ?disabled=${this.disabled}
                        aria-disabled=${this.disabled?`true`:O}
                        aria-busy=${this.loading?`true`:O}
                        aria-label=${r||O}
                        aria-pressed=${this.ariaPressed??O}
                        aria-expanded=${this.ariaExpanded??O}
                        aria-haspopup=${this.ariaHasPopup??O}
                        name=${this.name??O}
                        value=${this.value??O}
                    >
                        ${this.renderInner(e,t)}
                    </button>
                `}
        `}renderInner(e,t){return E`
            <span
                class=${I({"icon-slot":!0,"icon-slot--start":!0,"icon-slot--has-content":this.hasStartSlotContent})}
            >
                <slot name="start" @slotchange=${this.startSlotChanged}></slot>
            </span>
            ${this.loading?E`
                    <pk-spinner
                        variant=${t}
                        size=${e}
                        tone=${this.spinnerTone??O}
                        centered
                    ></pk-spinner>
                `:O}
            <span
                class=${I({label:!0,"is-empty":!this.hasDefaultSlotContent,loading:this.loading})}
            >
                <slot @slotchange=${this.defaultSlotChanged}></slot>
            </span>
            <span
                class=${I({"icon-slot":!0,"icon-slot--end":!0,"icon-slot--has-content":this.hasEndSlotContent})}
            >
                <slot name="end" @slotchange=${this.endSlotChanged}></slot>
            </span>
            ${this.withCaret||this.groupTrigger?E`<span part="caret" class="caret">${ut(nr)}</span>`:O}
        `}};j([M({reflect:!0})],L.prototype,`variant`,void 0),j([M({reflect:!0})],L.prototype,`size`,void 0),j([M({type:Boolean,reflect:!0})],L.prototype,`disabled`,void 0),j([M({type:Boolean,reflect:!0})],L.prototype,`loading`,void 0),j([M({reflect:!0,attribute:`spinner-size`})],L.prototype,`spinnerSize`,void 0),j([M({reflect:!0,attribute:`spinner-variant`})],L.prototype,`spinnerVariant`,void 0),j([M({reflect:!0,attribute:`spinner-tone`})],L.prototype,`spinnerTone`,void 0),j([M({type:Boolean,reflect:!0,attribute:`with-caret`})],L.prototype,`withCaret`,void 0),j([M({type:Boolean,reflect:!0,attribute:`group-trigger`})],L.prototype,`groupTrigger`,void 0),j([M({type:Boolean,reflect:!0})],L.prototype,`icon`,void 0),j([M()],L.prototype,`href`,void 0),j([M()],L.prototype,`target`,void 0),j([M()],L.prototype,`rel`,void 0),j([M()],L.prototype,`name`,void 0),j([M()],L.prototype,`value`,void 0),j([M()],L.prototype,`title`,void 0),j([M({attribute:`aria-label`})],L.prototype,`ariaLabel`,void 0),j([M({attribute:`aria-pressed`})],L.prototype,`ariaPressed`,void 0),j([M({attribute:`aria-expanded`})],L.prototype,`ariaExpanded`,void 0),j([M({attribute:`aria-haspopup`})],L.prototype,`ariaHasPopup`,void 0),j([M()],L.prototype,`type`,void 0),j([M({reflect:!0})],L.prototype,`form`,void 0),j([N()],L.prototype,`hasDefaultSlotContent`,void 0),j([N()],L.prototype,`hasStartSlotContent`,void 0),j([N()],L.prototype,`hasEndSlotContent`,void 0),L=j([k(`pk-button`)],L);var rr=class extends A{constructor(...e){super(...e),this.icon=``,this.name=``,this.unsubscribeRegistry=null}static{this.styles=d`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: none;
            /* Square em box + slight baseline nudge for inline text. Flex
             * parents (e.g. button slots) should zero vertical-align. */
            width: 1em;
            height: 1em;
            line-height: 1;
            vertical-align: -0.125em;
        }

        svg {
            display: block;
            width: 100%;
            height: 100%;
            fill: currentColor;
            /* Allow intentional path overhang past the icon canvas. */
            overflow: visible;
        }
    `}connectedCallback(){super.connectedCallback(),this.unsubscribeRegistry=Kn(()=>{this.requestUpdate()})}disconnectedCallback(){this.unsubscribeRegistry?.(),this.unsubscribeRegistry=null,super.disconnectedCallback()}render(){let e=Jn(this.icon||this.name);return e?E`${ut($n(e,{title:this.label}))}`:O}};j([M()],rr.prototype,`icon`,void 0),j([M()],rr.prototype,`name`,void 0),j([M()],rr.prototype,`label`,void 0),rr=j([k(`pk-icon`)],rr);var ir=d`
    @layer pk-component {
        .form-control {
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
            width: 100%;
        }

        .form-control__header {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            min-width: 0;
        }

        .form-control__label {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            margin: 0;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            font-weight: 700;
            line-height: var(--pk-line-height);
        }

        .form-control__instructions,
        .form-control__hint {
            margin: 0;
            color: var(--pk-color-gray-500);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .form-control__instructions:empty,
        .form-control__hint:empty {
            display: none;
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .form-control__input {
            display: flex;
            align-items: stretch;
            position: relative;
            width: 100%;
        }

        .form-control__start,
        .form-control__end {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
        }

        .form-control__start {
            margin-inline-end: 6px;
        }

        .form-control__end {
            margin-inline-start: 6px;
        }

        .icon-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: var(--pk-color-gray-500);
            cursor: pointer;
            line-height: 0;
        }

        .icon-button:focus-visible {
            outline: none;
            box-shadow: var(--pk-shadow-focus);
            border-radius: var(--pk-radius-sm);
        }

        .icon-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`,ar=[`aria-labelledby`,`aria-describedby`,`aria-invalid`,`aria-errormessage`,`aria-required`,`aria-label`];function or(e){return e.hasAttribute(`aria-labelledby`)||e.hasAttribute(`aria-describedby`)||e.hasAttribute(`aria-errormessage`)}function sr(e,t){for(let n of ar){let r=e.getAttribute(n);r===null?t.removeAttribute(n):t.setAttribute(n,r)}}function cr({control:e,labelId:t,instructionsId:n,hasLabel:r,hasInstructions:i,required:a=!1,invalid:o=!1}){r&&t?e.setAttribute(`aria-labelledby`,t):e.removeAttribute(`aria-labelledby`),i&&n?e.setAttribute(`aria-describedby`,n):e.removeAttribute(`aria-describedby`),a?e.setAttribute(`aria-required`,`true`):e.removeAttribute(`aria-required`),o?e.setAttribute(`aria-invalid`,`true`):e.removeAttribute(`aria-invalid`),e.removeAttribute(`aria-errormessage`)}var lr=class{constructor(e,t,n){this.host=e,this.getTarget=t,this.onSync=n}connect(){this.sync(),this.observer=new MutationObserver(()=>{this.sync()}),this.observer.observe(this.host,{attributes:!0,attributeFilter:[...ar]})}disconnect(){this.observer?.disconnect(),this.observer=void 0}sync(){if(!or(this.host)){this.onSync?.();return}let e=this.getTarget();e&&sr(this.host,e)}},ur=class extends Event{constructor(){super(`pk-invalid`,{bubbles:!0,cancelable:!1,composed:!0})}};function dr(){return{observedAttributes:[`custom-error`],checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys.push(`customError`)),t}}}var fr=class extends A{static{this.formAssociated=!0}static get validators(){return[dr()]}static get observedAttributes(){let e=new Set(super.observedAttributes??[]);for(let t of this.validators)for(let n of t.observedAttributes??[])e.add(n);return[...e]}constructor(){super(),this.internals=this.attachInternals(),this.assumeInteractionOn=[`input`],this.validators=[],this.name=null,this.disabled=!1,this.required=!1,this.customError=null,this.valueHasChanged=!1,this.hasInteracted=!1,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new ur))},this.handleInteraction=e=>{this.emittedEvents.includes(e.type)||this.emittedEvents.push(e.type),this.emittedEvents.length>=this.assumeInteractionOn.length&&(this.hasInteracted=!0,this.updateValidity())},this.addEventListener(`invalid`,this.emitInvalid)}connectedCallback(){super.connectedCallback();for(let e of this.assumeInteractionOn)this.addEventListener(e,this.handleInteraction);this.updateValidity()}disconnectedCallback(){this.hostAriaMirror?.disconnect(),this.hostAriaMirror=void 0;for(let e of this.assumeInteractionOn)this.removeEventListener(e,this.handleInteraction);this.removeEventListener(`invalid`,this.emitInvalid),super.disconnectedCallback()}updated(e){e.has(`customError`)&&this.setCustomValidity(this.customError??``),e.has(`disabled`)&&this.setState(`disabled`,!!this.disabled),(e.has(`value`)||e.has(`checked`)||e.has(`disabled`)||e.has(`required`)||e.has(`name`))&&this.syncFormValue(),this.updateValidity(),super.updated(e),this.syncHostAriaMirror()}firstUpdated(e){super.firstUpdated(e),this.connectHostAriaMirror()}getAriaMirrorTarget(){return this.input??null}syncStandaloneAria(){}connectHostAriaMirror(){this.hostAriaMirror?.disconnect(),this.hostAriaMirror=new lr(this,()=>this.getAriaMirrorTarget(),()=>this.syncStandaloneAria()),this.hostAriaMirror.connect()}syncHostAriaMirror(){this.hostAriaMirror?.sync()}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.resetToDefaultValue(),this.syncFormValue(),this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.restoreFormState(e),this.syncFormValue(),this.updateValidity()}set form(e){e?this.setAttribute(`form`,e):this.removeAttribute(`form`)}get form(){return this.internals.form}get labels(){return this.internals.labels}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}getForm(){return this.internals.form}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}resetValidity(){this.setCustomValidity(``),this.internals.setValidity({}),this.syncCustomStates()}setCustomValidity(e){if(!e){this.customError=null,this.internals.setValidity({}),this.syncCustomStates();return}this.customError=e;let t=this.validationTarget;t instanceof HTMLElement?this.internals.setValidity({customError:!0},e,t):this.internals.setValidity({customError:!0},e),this.syncCustomStates()}get validationTarget(){return this.input}get allValidators(){return[...this.constructor.validators??[],...this.validators??[]]}setFormValue(e,t){this.internals.setFormValue(e,t??e)}setValue(e,t){this.setFormValue(e,t??e)}updateValidity(){if(this.disabled||this.hasAttribute(`disabled`)||!this.willValidate){this.internals.setValidity({}),this.syncCustomStates();return}let e=this.allValidators;if(!e.length)return;let t={customError:!!this.customError},n=``,r=this.validationTarget;for(let r of e){let{isValid:e,message:i,invalidKeys:a}=r.checkValidity(this);if(!e){n||=i;for(let e of a)t[e]=!0}}n||=this.validationMessage,r instanceof HTMLElement?this.internals.setValidity(t,n,r):this.internals.setValidity(t,n),this.syncCustomStates()}syncCustomStates(){let e=this.internals.validity.valid;this.setState(`required`,this.required),this.setState(`optional`,!this.required),this.setState(`invalid`,!e),this.setState(`valid`,e),this.setState(`user-invalid`,!e&&this.hasInteracted),this.setState(`user-valid`,e&&this.hasInteracted)}setState(e,t){let n=this.internals.states;n&&(t?n.add(e):n.delete(e))}syncFormValue(){}resetToDefaultValue(){}restoreFormState(e){}};j([M({reflect:!0})],fr.prototype,`name`,void 0),j([M({type:Boolean,reflect:!0})],fr.prototype,`disabled`,void 0),j([M({type:Boolean,reflect:!0})],fr.prototype,`required`,void 0),j([M({attribute:`custom-error`,reflect:!0})],fr.prototype,`customError`,void 0),j([M({attribute:!1,state:!0})],fr.prototype,`valueHasChanged`,void 0),j([M({attribute:!1,state:!0})],fr.prototype,`hasInteracted`,void 0);function pr(){return{checkValidity(e){let t=e.input,n={message:``,isValid:!0,invalidKeys:[]};if(!t)return n;let r=!0;if(`checkValidity`in t&&typeof t.checkValidity==`function`&&(r=t.checkValidity()),r)return n;if(n.isValid=!1,`validationMessage`in t&&typeof t.validationMessage==`string`&&(n.message=t.validationMessage),!(`validity`in t)||!t.validity)return n.invalidKeys.push(`customError`),n;for(let e of Object.keys(t.validity)){if(e===`valid`)continue;let r=e;t.validity[r]&&n.invalidKeys.push(r)}return n}}}function mr(e={}){let{validationElement:t,validationProperty:n}=e;!t&&typeof document<`u`&&(t=Object.assign(document.createElement(`input`),{required:!0})),n||=`value`;let r={observedAttributes:[`required`],message:t?.validationMessage??`Please fill out this field.`,checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};if(!e.required)return t;let i=e[n];return i!=null&&i!==!1&&i!==``||(t.isValid=!1,t.message=typeof r.message==`function`?r.message(e):r.message??``,t.invalidKeys.push(`valueMissing`)),t}};return r}function*hr(e=document.activeElement){e!=null&&(yield e,`shadowRoot`in e&&e.shadowRoot&&e.shadowRoot.mode!==`closed`&&(yield*hr(e.shadowRoot.activeElement)))}var gr=0;function _r(e=`pk`){return gr+=1,`${e}-${gr}`}var vr=class extends Event{constructor(){super(`pk-clear`,{bubbles:!0,cancelable:!1,composed:!0})}},yr=class{constructor(e,...t){this.host=e,this.boundSlots=new Set,this.lastHasContent=new Map,this.handleSlotChange=()=>{let e=!1;for(let t of this.slotNames){let n=this.test(t);this.lastHasContent.get(t)!==n&&(this.lastHasContent.set(t,n),e=!0)}e&&this.host.requestUpdate()},this.slotNames=t,e.addController(this)}hostConnected(){this.bindSlotListeners()}hostUpdated(){this.bindSlotListeners()}hostDisconnected(){for(let e of this.boundSlots)e.removeEventListener(`slotchange`,this.handleSlotChange);this.boundSlots.clear()}bindSlotListeners(){for(let e of this.slotNames){let t=this.findSlot(e);t&&!this.boundSlots.has(t)&&(this.boundSlots.add(t),t.addEventListener(`slotchange`,this.handleSlotChange),this.lastHasContent.has(e)||this.lastHasContent.set(e,this.test(e)))}}findSlot(e){return this.host.shadowRoot?e?this.host.shadowRoot.querySelector(`slot[name="${e}"]`):this.host.shadowRoot.querySelector(`slot:not([name])`):null}test(e,t=!1){if(t||this.hasLightDomSlotContent(e))return!0;let n=this.findSlot(e);return n?n.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?!!e.textContent?.trim():e.nodeType===Node.ELEMENT_NODE):!1}hasLightDomSlotContent(e){return[...this.host.children].some(t=>t.getAttribute(`slot`)===e)}};function br(e,t){return t||(e.getAttribute(`hint`)??``)}function xr(e,t,n=!1){return!!t||e(`instructions`,n)||e(`hint`)}var{I:Sr}=Le,Cr=e=>e,wr=e=>e.strings===void 0,Tr=()=>document.createComment(``),Er=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Sr(r.insertBefore(Tr(),i),r.insertBefore(Tr(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Cr(e).nextSibling;Cr(r).insertBefore(e,i),e=t}}}return n},Dr=(e,t,n=e)=>(e._$AI(t,n),e),Or={},kr=(e,t=Or)=>e._$AH=t,Ar=e=>e._$AH,jr=e=>{e._$AR(),e._$AA.remove()},Mr=at(class extends ot{constructor(e){if(super(e),e.type!==F.PROPERTY&&e.type!==F.ATTRIBUTE&&e.type!==F.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wr(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===D||t===O)return t;let n=e.element,r=e.name;if(e.type===F.PROPERTY){if(t===n[r])return D}else if(e.type===F.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return D}else if(e.type===F.ATTRIBUTE&&n.getAttribute(r)===t+``)return D;return kr(e),t}}),Nr=e=>e??O,Pr=new Set([`button`,`submit`,`reset`,`checkbox`,`radio`,`file`,`image`,`hidden`]),Fr=`pk-implicit-submit`,Ir=(e,t)=>{if(e.key!==`Enter`||e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return!1;let n=(t||`text`).toLowerCase();return!Pr.has(n)},Lr=e=>{let t=e.closest?.(`pk-dialog`);if(t){let e=t.querySelector(`form`);if(e)return e}let n=e.form;return n&&n.id===`main`?e.closest?.(`form`)===n?null:e.closest(`form`):n},Rr=(e,t,n)=>{if(e.disabled||e.readonly||!Ir(t,n))return!1;let r=Lr(e);return!r||r.id===`main`?!1:(t.preventDefault(),t.stopPropagation(),r.dispatchEvent(new CustomEvent(Fr,{bubbles:!1,cancelable:!0})),!0)},zr=d`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
            font-size: var(--pk-control-font-default);
            line-height: var(--pk-line-height);
            /*
             * Control chrome tokens — inherit into light-DOM in-control actions
             * (e.g. pk-copy-button[slot=end]) the same way combobox/image-browser
             * size their trailing clear/expand hit targets.
             */
            --pk-input-padding-block: calc((var(--pk-control-height-default) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-input-padding-inline: 8px;
            --pk-input-control-gap: 6px;
            --pk-input-decoration-size: 0.75rem;
        }

        :host([data-pk-group-orientation]) {
            display: flex;
            flex-direction: column;
            width: auto;
            flex: 0 1 auto;
            align-self: stretch;
        }

        :host([data-pk-group-orientation]) .form-control {
            gap: 0;
            height: 100%;
        }

        :host([data-pk-group-orientation]) .form-control__input {
            min-height: var(--pk-btn-height-default);
            height: 100%;
        }

        :host([data-pk-group-orientation]) .form-control__start,
        :host([data-pk-group-orientation]) .form-control__end {
            display: none;
        }

        :host([data-pk-group-orientation]) .form-control__input {
            width: 100%;
        }

        :host([data-pk-group-orientation]) .input {
            width: 100%;
        }

        :host([data-pk-group-orientation]) .input {
            min-height: var(--pk-btn-height-default);
            height: 100%;
        }

        :host([data-pk-group-orientation='vertical']) {
            width: 100%;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]) .form-control__input {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
            box-shadow: none;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
            box-shadow: none;
        }

        :host([data-pk-group-divider]) .form-control__input:focus-within,
        :host([data-pk-group-divider][data-state='focus-visible']) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input:focus-within,
        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-state='focus-visible']) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        /* Chrome lives on the flex shell (part=base) so slot=start/end adornments sit
         * inside the border — same visual contract as pk-input-group / v1 InputGroup.
         * Height is content-sized (v1): padding-block + --pk-input-control-line-height + border.
         * Trailing actions (clear, pk-copy-button[slot=end]) stay in flex flow so long
         * values never paint under the button — mirror combobox / image-browser.
         */
        .form-control__input {
            align-items: center;
            gap: var(--pk-input-control-gap);
            padding-inline: var(--pk-input-padding-inline);
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius, var(--pk-radius-sm));
            background: var(--pk-input-bg);
            background-clip: padding-box;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        .form-control__start,
        .form-control__end {
            margin: 0;
            color: var(--pk-color-gray-400);
            line-height: 0;
            align-self: stretch;
            align-items: center;
        }

        /* Decorative glyphs only — interactive in-control actions opt out below. */
        .form-control__start ::slotted(*),
        .form-control__end ::slotted(*) {
            display: block;
            max-width: 1.25rem;
            max-height: 1.25rem;
        }

        /* Copy (and similar) inside the field: flex-reserved space, not absolute overlay. */
        .form-control__end:has(::slotted(pk-copy-button)) {
            align-items: stretch;
        }

        .form-control__end ::slotted(pk-copy-button) {
            display: inline-flex;
            align-self: stretch;
            align-items: stretch;
            max-width: none;
            max-height: none;
            /*
             * Pull into trailing padding like combobox expand/clear, but leave a
             * small inset so the glyph is not tight against the field border.
             */
            margin-inline-end: calc(-1 * var(--pk-input-padding-inline) + 4px);
            margin-block: calc(-1 * var(--pk-input-padding-block));
        }

        .input {
            display: block;
            width: 100%;
            margin: 0;
            /* v1 Input default: py-1.5 + text-sm (14px / 1.25rem lh) → 34px with border. */
            padding-block: var(--pk-input-padding-block);
            padding-inline: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            /* Craft CP body / field value text. */
            color: var(--pk-color-gray-700);
            font: inherit;
            line-height: var(--pk-input-control-line-height, 1.25rem);
            appearance: none;
            box-sizing: border-box;
            outline: none;
        }

        .form-control__input .input {
            flex: 1 1 auto;
            min-width: 0;
        }

        /* Keep the browser from adding a second clear control. */
        .input[data-custom-clear]::-webkit-search-cancel-button {
            -webkit-appearance: none;
            display: none;
        }

        .input::placeholder {
            color: var(--pk-input-placeholder-color, var(--pk-color-gray-400));
        }

        /*
         * Craft text:focus-visible only sets box-shadow (--focus-ring); resting border stays.
         * Do not also set border-color — --pk-input-focus-shadow already includes 0 0 0 1px,
         * so border-color + that ring reads as a double focus treatment.
         */
        :host(:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        .form-control__input:has(.input:disabled) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .input:disabled {
            cursor: not-allowed;
        }

        :host([invalid]) .form-control__input,
        :host(:state(user-invalid)) .form-control__input {
            border-color: var(--pk-color-rose-600);
        }

        /* Invalid + focus: rose ring (same token as select/combobox), not sky over rose border. */
        :host([invalid]) .form-control__input:focus-within,
        :host([invalid][data-state='focus-visible']) .form-control__input,
        :host(:state(user-invalid)) .form-control__input:focus-within {
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xxs']) {
            --pk-input-padding-block: calc((var(--pk-control-height-xxs) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-input-padding-inline: 6px;
            --pk-input-control-gap: 4px;
            --pk-input-decoration-size: 0.625rem;
        }

        :host([size='xs']) {
            --pk-input-padding-block: calc((var(--pk-control-height-xs) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-input-padding-inline: 6px;
            --pk-input-control-gap: 4px;
            --pk-input-decoration-size: 0.625rem;
        }

        :host([size='xxs']) .input {
            font-size: var(--pk-control-font-xxs);
        }

        :host([size='xs']) .input {
            font-size: var(--pk-control-font-xs);
        }

        :host([size='sm']) {
            --pk-input-padding-block: calc((var(--pk-control-height-sm) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-input-padding-inline: 8px;
            --pk-input-control-gap: 4px;
            --pk-input-decoration-size: 0.6875rem;
        }

        :host([size='sm']) .input {
            font-size: var(--pk-control-font-sm);
        }

        :host([size='lg']) {
            --pk-input-padding-block: calc((var(--pk-control-height-lg) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-input-padding-inline: 12px;
            --pk-input-control-gap: 8px;
            --pk-input-decoration-size: 0.875rem;
        }

        :host([size='lg']) .input {
            font-size: var(--pk-control-font-lg);
        }

        :host([size='xl']) {
            --pk-input-padding-block: calc((var(--pk-control-height-xl) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-input-padding-inline: 16px;
            --pk-input-control-gap: 8px;
            --pk-input-decoration-size: 1rem;
        }

        :host([size='xl']) .input {
            font-size: var(--pk-control-font-xl);
        }

        /* Optical font sizing must not change the control height. */
        :host([mono]) .input {
            font-family: var(--pk-input-mono-font-family);
            font-size: calc(var(--pk-control-font-default) * 0.9);
            line-height: var(--pk-input-control-line-height, 1.25rem);
        }

        :host([mono][size='xxs']) .input {
            font-size: calc(var(--pk-control-font-xxs) * 0.9);
        }

        :host([mono][size='xs']) .input {
            font-size: calc(var(--pk-control-font-xs) * 0.9);
        }

        :host([mono][size='sm']) .input {
            font-size: calc(var(--pk-control-font-sm) * 0.9);
        }

        :host([mono][size='lg']) .input {
            font-size: calc(var(--pk-control-font-lg) * 0.9);
        }

        :host([mono][size='xl']) .input {
            font-size: calc(var(--pk-control-font-xl) * 0.9);
        }

        /* Editable-table cells (v1): flush into the row — no chrome border/radius.
         * Prefer reflected fit-cell (Lit property); data-editable-table-input is a legacy alias.
         * Fill host → form-control → input so the control spans the full td.
         */
        :host([fit-cell]),
        :host([data-editable-table-input]) {
            display: block;
            height: 100%;
            min-height: 100%;
            box-sizing: border-box;
        }

        :host([fit-cell]) .form-control,
        :host([data-editable-table-input]) .form-control {
            height: 100%;
            min-height: 100%;
            gap: 0;
        }

        :host([fit-cell]) .form-control__input,
        :host([data-editable-table-input]) .form-control__input {
            height: 100%;
            min-height: 100%;
            flex: 1 1 auto;
            padding-inline: 0;
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
        }

        :host([fit-cell]) .input,
        :host([data-editable-table-input]) .input {
            height: 100%;
            min-height: 100%;
        }

        :host([fit-cell]:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([fit-cell][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input,
        :host([data-editable-table-input]:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([data-editable-table-input][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200);
        }

        :host([fit-cell][invalid]) .form-control__input,
        :host([fit-cell]:state(user-invalid)) .form-control__input,
        :host([data-editable-table-input][invalid]) .form-control__input,
        :host([data-editable-table-input]:state(user-invalid)) .form-control__input {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        :host([fit-cell][invalid]) .form-control__input:focus-within,
        :host([fit-cell][invalid][data-state='focus-visible']) .form-control__input,
        :host([fit-cell]:state(user-invalid)) .form-control__input:focus-within,
        :host([data-editable-table-input][invalid]) .form-control__input:focus-within,
        :host([data-editable-table-input][invalid][data-state='focus-visible']) .form-control__input,
        :host([data-editable-table-input]:state(user-invalid)) .form-control__input:focus-within {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) .form-control__input {
            border-left-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) .form-control__input {
            border-top-width: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]) .form-control__input {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail]) .form-control__input {
            border-right-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail]) .form-control__input {
            border-bottom-width: 0;
        }

        /*
         * Clear is a flex trailing action (not absolute). Reserves width in the
         * control so values cannot scroll under the glyph — same contract as
         * combobox clear/expand and image-browser clear.
         */
        .clear-button {
            display: inline-flex;
            flex-shrink: 0;
            align-self: stretch;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: calc(var(--pk-input-decoration-size) + var(--pk-input-padding-inline));
            margin-block: calc(-1 * var(--pk-input-padding-block));
            /* Match pk-copy-button[slot=end]: pull into padding but leave a 4px glyph inset. */
            margin-inline-end: calc(-1 * var(--pk-input-padding-inline) + 4px);
            font-size: var(--pk-input-decoration-size);
            line-height: 1;
        }
    }
`,R=class extends fr{constructor(...e){super(...e),this.assumeInteractionOn=[`blur`,`input`],this.hasSlotController=new yr(this,`instructions`,`hint`,`label`,`start`,`end`),this.inputId=_r(`pk-input`),this.type=`text`,this._value=null,this.defaultValue=null,this.size=`default`,this.label=``,this.instructions=``,this.withClear=!1,this.clearLabel=`Clear`,this.placeholder=``,this.readonly=!1,this.invalid=!1,this.fitCell=!1,this.mono=!1,this.autofocus=!1,this.withLabel=!1,this.withInstructions=!1}static{this.styles=[ir,nt(),tt(`.input`,`var(--pk-input-border-radius, var(--pk-radius-sm))`),it(`.input`),zr]}static get validators(){return[...super.validators,pr(),mr()]}get value(){return this.valueHasChanged?this._value??``:this._value??this.defaultValue??``}set value(e){let t=e??``;this._value!==t&&(this.valueHasChanged=!0,this._value=t)}connectedCallback(){this.instructions=br(this,this.instructions),this.hasAttribute(`with-hint`)&&(this.withInstructions=!0),super.connectedCallback()}syncFormValue(){this.setValue(this.value||``)}resetToDefaultValue(){this.valueHasChanged=!1,this._value=null}restoreFormState(e){typeof e==`string`&&(this.value=e)}formResetCallback(){this.valueHasChanged=!1,this._value=null,this.input&&(this.input.value=this.defaultValue??``),super.formResetCallback()}updated(e){(e.has(`value`)||e.has(`defaultValue`))&&this.setState(`blank`,!this.value),super.updated(e)}syncStandaloneAria(){if(!this.input)return;let e=!!this.label||this.hasSlotController.test(`label`,this.withLabel),t=xr((e,t)=>this.hasSlotController.test(e,t),this.instructions,this.withInstructions);cr({control:this.input,labelId:`${this.inputId}-label`,instructionsId:`${this.inputId}-instructions`,hasLabel:e,hasInstructions:t,required:this.required,invalid:this.invalid||!this.internals.validity.valid})}hasLabelContent(){return!!this.label||this.hasSlotController.test(`label`,this.withLabel)}hasInstructionsContent(){return xr((e,t)=>this.hasSlotController.test(e,t),this.instructions,this.withInstructions)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}select(){this.input?.select()}handleInput(){this.value=this.input.value,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))}handleChange(e){this.value=this.input.value,e.stopPropagation(),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}handleKeyDown(e){Rr(this,e,this.type)}handleClearClick(e){e.preventDefault(),this.value!==``&&(this.value=``,this.dispatchEvent(new vr),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.input.focus())}render(){let e=this.hasLabelContent(),t=this.hasInstructionsContent(),n=this.withClear&&!this.disabled&&!this.readonly&&this.value.length>0,r=this.hasSlotController.test(`start`),i=this.hasSlotController.test(`end`);return E`
            <div part="form-control" class="form-control">
                ${e||t?E`
                        <div part="header" class="form-control__header">
                            ${e?E`
                                    <label
                                        part="label"
                                        class="form-control__label"
                                        id=${`${this.inputId}-label`}
                                        for=${`${this.inputId}-control`}
                                    >
                                        <slot name="label">${this.label}</slot>
                                    </label>
                                `:O}

                            ${t?E`
                                    <p
                                        part="instructions"
                                        class="form-control__instructions"
                                        id=${`${this.inputId}-instructions`}
                                    >
                                        <slot name="instructions">${this.instructions}</slot>
                                        <slot name="hint"></slot>
                                    </p>
                                `:O}
                        </div>
                    `:O}

                <div part="base" class="form-control__input">
                    ${r?E`
                            <span part="start" class="form-control__start">
                                <slot name="start"></slot>
                            </span>
                        `:E`<slot name="start" hidden></slot>`}

                    <input
                        part="input"
                        class="input"
                        ?data-custom-clear=${this.withClear}
                        id=${e?`${this.inputId}-control`:O}
                        type=${this.type}
                        .value=${Mr(this.value)}
                        placeholder=${this.placeholder||O}
                        pattern=${Nr(this.pattern)}
                        minlength=${Nr(this.minlength)}
                        maxlength=${Nr(this.maxlength)}
                        min=${Nr(this.min)}
                        max=${Nr(this.max)}
                        step=${Nr(this.step)}
                        autocomplete=${Nr(this.autocomplete)}
                        ?disabled=${this.disabled}
                        ?readonly=${this.readonly}
                        ?required=${this.required}
                        ?autofocus=${this.autofocus}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                        @keydown=${this.handleKeyDown}
                        @focus=${()=>this.dispatchEvent(new Event(`focus`,{bubbles:!0,composed:!0}))}
                        @blur=${()=>this.dispatchEvent(new Event(`blur`,{bubbles:!0,composed:!0}))}
                    />

                    ${n?E`
                            <button
                                part="clear-button"
                                class="icon-button clear-button"
                                type="button"
                                aria-label=${this.clearLabel}
                                @click=${this.handleClearClick}
                            >
                                <slot name="clear-icon">×</slot>
                            </button>
                        `:O}

                    ${i?E`
                            <span part="end" class="form-control__end">
                                <slot name="end"></slot>
                            </span>
                        `:E`<slot name="end" hidden></slot>`}
                </div>
            </div>
        `}};j([P(`input`)],R.prototype,`input`,void 0),j([M({reflect:!0})],R.prototype,`type`,void 0),j([N()],R.prototype,`value`,null),j([M({attribute:`value`,reflect:!0})],R.prototype,`defaultValue`,void 0),j([M({reflect:!0})],R.prototype,`size`,void 0),j([M()],R.prototype,`label`,void 0),j([M()],R.prototype,`instructions`,void 0),j([M({attribute:`with-clear`,type:Boolean})],R.prototype,`withClear`,void 0),j([M({attribute:`clear-label`})],R.prototype,`clearLabel`,void 0),j([M()],R.prototype,`placeholder`,void 0),j([M({type:Boolean,reflect:!0})],R.prototype,`readonly`,void 0),j([M({type:Boolean,reflect:!0})],R.prototype,`invalid`,void 0),j([M({type:Boolean,reflect:!0,attribute:`fit-cell`})],R.prototype,`fitCell`,void 0),j([M({type:Boolean,reflect:!0})],R.prototype,`mono`,void 0),j([M()],R.prototype,`pattern`,void 0),j([M({type:Number})],R.prototype,`minlength`,void 0),j([M({type:Number})],R.prototype,`maxlength`,void 0),j([M()],R.prototype,`min`,void 0),j([M()],R.prototype,`max`,void 0),j([M()],R.prototype,`step`,void 0),j([M()],R.prototype,`autocomplete`,void 0),j([M({type:Boolean,reflect:!0})],R.prototype,`autofocus`,void 0),j([M({attribute:`with-label`,type:Boolean})],R.prototype,`withLabel`,void 0),j([M({attribute:`with-instructions`,type:Boolean})],R.prototype,`withInstructions`,void 0),R=j([k(`pk-input`)],R);var z=(e,t={})=>$n(e,{title:t.title}),Br=(e,t={})=>{let n=document.createElement(`template`);n.innerHTML=z(e,t);let r=n.content.firstElementChild;if(!(r instanceof SVGSVGElement))throw Error(`Icon render did not produce an SVG element.`);return r},Vr=Object.defineProperty,Hr=Object.getOwnPropertyDescriptor,Ur=Object.getOwnPropertyNames,Wr=Object.prototype.hasOwnProperty,Gr=(e,t)=>{let n={};for(var r in e)Vr(n,r,{get:e[r],enumerable:!0});return t||Vr(n,Symbol.toStringTag,{value:`Module`}),n},Kr=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var i=Ur(t),a=0,o=i.length,s;a<o;a++)s=i[a],!Wr.call(e,s)&&s!==n&&Vr(e,s,{get:(e=>t[e]).bind(null,s),enumerable:!(r=Hr(t,s))||r.enumerable});return e},qr=(e,t,n)=>(Kr(e,t,`default`),n&&Kr(n,t,`default`)),Jr=`M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l208 0 32 0 16 0 256 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L320 64l-16 0-32 0L64 64zm512 48c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16l-256 0 0-288 256 0zM178.3 175.9l64 144c4.5 10.1-.1 21.9-10.2 26.4s-21.9-.1-26.4-10.2L196.8 316l-73.6 0-8.9 20.1c-4.5 10.1-16.3 14.6-26.4 10.2s-14.6-16.3-10.2-26.4l64-144c3.2-7.2 10.4-11.9 18.3-11.9s15.1 4.7 18.3 11.9zM179 276l-19-42.8L141 276l38 0zM456 164c-11 0-20 9-20 20l0 4-52 0c-11 0-20 9-20 20s9 20 20 20l72 0 35.1 0c-7.3 16.7-17.4 31.9-29.8 45l-.5-.5-14.6-14.6c-7.8-7.8-20.5-7.8-28.3 0s-7.8 20.5 0 28.3L430 298.3c-5.9 3.6-12.1 6.9-18.5 9.8l-3.6 1.6c-10.1 4.5-14.6 16.3-10.2 26.4s16.3 14.6 26.4 10.2l3.6-1.6c12-5.3 23.4-11.8 34-19.4c4.3 3 8.6 5.8 13.1 8.5l18.9 11.3c9.5 5.7 21.8 2.6 27.4-6.9s2.6-21.8-6.9-27.4l-18.9-11.3c-.9-.5-1.8-1.1-2.7-1.6c17.2-18.8 30.7-40.9 39.6-65.4L534 228l2 0c11 0 20-9 20-20s-9-20-20-20l-16 0-44 0 0-4c0-11-9-20-20-20z`,Yr=()=>{let e=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);e.setAttribute(`aria-hidden`,`true`),e.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),e.setAttribute(`viewBox`,`0 0 640 512`);let t=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return t.setAttribute(`d`,Jr),e.append(t),e},B=Gr({createIconElement:()=>Br,createTranslationIconElement:()=>Yr,renderIconHtml:()=>z});qr(B,er);function Xr(e,t){let n=String(e??``),r=String(t??``).trim();if(!r)return[{text:n,match:!1}];let i=n.toLowerCase(),a=r.toLowerCase(),o=[],s=0,c=i.indexOf(a);for(;c!==-1;)c>s&&o.push({text:n.slice(s,c),match:!1}),o.push({text:n.slice(c,c+r.length),match:!0}),s=c+r.length,c=i.indexOf(a,s);return s<n.length&&o.push({text:n.slice(s),match:!1}),o.length>0?o:[{text:n,match:!1}]}var Zr=d`
    @layer pk-component {
        :host {
            display: block;
            /*
             * Slotted option labels inherit type metrics from this host (same
             * Craft-vs-Tailwind trap as pk-dropdown-item). Size tokens arrive via
             * pk-select ::slotted(pk-option) custom properties.
             */
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            color: var(--pk-color-gray-700);
        }

        .option {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            margin: 0;
            min-height: var(--pk-select-item-min-height, var(--pk-input-height));
            padding-block: var(--pk-select-item-padding-block, 6px);
            padding-inline-start: var(--pk-select-item-padding-inline, 10px);
            padding-inline-end: var(--pk-select-item-padding-inline-end, 2rem);
            border: var(--pk-select-trigger-border-width, 1px) solid transparent;
            background: transparent;
            color: inherit;
            font: inherit;
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            text-align: left;
            white-space: nowrap;
            cursor: default;
            user-select: none;
            outline: none;
            box-sizing: border-box;
        }

        .start {
            display: none;
            flex: 0 0 auto;
            align-items: center;
            /* Decorations must not reserve inline text descender space. */
            line-height: 0;
        }

        :host([data-has-start]) .start {
            display: inline-flex;
        }

        :host([hidden]) {
            display: none !important;
        }

        .option:focus-visible,
        :host([highlighted]) .option {
            background: var(--pk-color-slate-100);
        }

        :host([disabled]) .option,
        .option[aria-disabled='true'] {
            pointer-events: none;
            opacity: 0.5;
        }

        .check {
            position: absolute;
            inset-inline-end: var(--pk-select-item-indicator-inset, 0.5rem);
            top: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            color: var(--pk-color-gray-700);
            pointer-events: none;
            transform: translateY(-50%);
            line-height: 0;
        }

        :host([selected]) .check {
            display: inline-flex;
        }

        .check svg {
            display: block;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            flex-shrink: 0;
            pointer-events: none;
        }

        .label {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            /* Allow custom multi-line option layouts (title + subtitle) to stack. */
            white-space: normal;
        }

        .match {
            padding: 0;
            border-radius: 2px;
            background: var(--pk-color-blue-100);
            color: inherit;
        }
    }
`,Qr=z(B.check),V=class extends A{constructor(...e){super(...e),this.value=``,this.label=``,this.disabled=!1,this.selected=!1,this.highlighted=!1,this.hidden=!1,this.focusIndex=-1,this.optionId=``,this.matchQuery=``}static{this.styles=Zr}focusControl(e=!0){this.shadowRoot?.querySelector(`.option`)?.focus({preventScroll:e})}getLabel(){return this.label.trim()?this.label.trim():this.getDefaultSlotText()}getSearchText(){return this.getDefaultSlotText()||this.getLabel()}getDefaultSlotText(){return[...this.childNodes].filter(e=>e.nodeType===Node.TEXT_NODE||e instanceof Element&&!e.getAttribute(`slot`)).map(e=>(e.textContent??``).trim()).filter(Boolean).join(` `)}hasRichLabelContent(){return[...this.children].some(e=>e instanceof HTMLElement?!e.slot||e.slot===``:!1)}getStartElements(){return[...this.querySelectorAll(`:scope > [slot="start"]`)].filter(e=>e instanceof HTMLElement)}firstUpdated(){(this.shadowRoot?.querySelector(`slot[name="start"]`))?.addEventListener(`slotchange`,()=>this.syncStartDecoration()),this.syncStartDecoration()}syncStartDecoration(){this.toggleAttribute(`data-has-start`,this.getStartElements().length>0)}handleClick(){this.disabled||this.dispatchEvent(new CustomEvent(`pk-option-select`,{detail:{value:this.value},bubbles:!0,composed:!0}))}handleMouseEnter(){this.disabled||this.hidden||this.dispatchEvent(new CustomEvent(`pk-option-highlight`,{detail:{value:this.value},bubbles:!0,composed:!0}))}handleKeyDown(e){if(!new Set([`ArrowDown`,`ArrowUp`,`ArrowLeft`,`ArrowRight`,`Home`,`End`,`Enter`,` `,`Escape`]).has(e.key))return;let t=this.closest(`pk-select, pk-combobox, pk-autocomplete`),n=t?null:this.closest(`[role="listbox"]`);if(!t&&!n)return;e.preventDefault(),e.stopPropagation();let r=new CustomEvent(`pk-listbox-keydown`,{detail:{keyboardEvent:e},bubbles:!0});t?t.dispatchEvent(r):n.dispatchEvent(r)}renderLabel(){let e=this.matchQuery.trim();return!e||this.hasRichLabelContent()?E`
                <span part="label" class="label">
                    <slot></slot>
                </span>
            `:E`
            <span part="label" class="label">
                ${Xr(this.getLabel(),e).map(e=>e.match?E`<mark class="match">${e.text}</mark>`:E`<span>${e.text}</span>`)}
            </span>
        `}render(){return E`
            <button
                part="option"
                type="button"
                class="option"
                role="option"
                id=${this.optionId||O}
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled?`true`:O}
                aria-selected=${this.selected?`true`:`false`}
                tabindex=${this.focusIndex}
                @click=${this.handleClick}
                @mouseenter=${this.handleMouseEnter}
                @keydown=${this.handleKeyDown}
            >
                <span part="start" class="start">
                    <slot name="start"></slot>
                </span>
                ${this.renderLabel()}
                <span part="check" class="check" aria-hidden="true">${ut(Qr)}</span>
            </button>
        `}};j([M()],V.prototype,`value`,void 0),j([M()],V.prototype,`label`,void 0),j([M({type:Boolean,reflect:!0})],V.prototype,`disabled`,void 0),j([M({type:Boolean,reflect:!0})],V.prototype,`selected`,void 0),j([M({type:Boolean,reflect:!0})],V.prototype,`highlighted`,void 0),j([M({type:Boolean,reflect:!0})],V.prototype,`hidden`,void 0),j([M({type:Number,attribute:`focus-index`})],V.prototype,`focusIndex`,void 0),j([M()],V.prototype,`optionId`,void 0),j([M({attribute:!1})],V.prototype,`matchQuery`,void 0),V=j([k(`pk-option`)],V);var $r=[];function ei(e){$r.push(e)}function ti(e){for(let t=$r.length-1;t>=0;--t)if($r[t]===e){$r.splice(t,1);break}}function ni(e){return $r.length>0&&$r[$r.length-1]===e}function ri(e){let t=e.split(`-`)[0];return t===`inline-start`?`left`:t===`inline-end`?`right`:t===`top`||t===`bottom`||t===`left`||t===`right`?t:`bottom`}function ii(e,t,n,r,i){let a=ri(e),o=t.x+t.width/2-n.x,s=t.y+t.height/2-n.y;return Math.abs(i?.y??0)>r&&(a===`top`||a===`bottom`)?`${o}px ${t.y+t.height/2-n.y}px`:{top:`${o}px calc(100% + ${r}px)`,bottom:`${o}px ${-r}px`,left:`calc(100% + ${r}px) ${s}px`,right:`${-r}px ${s}px`}[a]}function ai(e,t){t?e.setAttribute(`data-side`,ri(t)):e.removeAttribute(`data-side`)}function oi(e,t,n=100,r){let i=()=>e.getAttribute(`data-current-placement`)??t;return!r?.requireEvent&&e.hasAttribute(`data-current-placement`)?Promise.resolve(i()):new Promise(t=>{let a=!1,o=()=>{a||(a=!0,t(i()))};e.addEventListener(`pk-reposition`,o,{once:!0}),r?.requireEvent||requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.hasAttribute(`data-current-placement`)&&o()})}),window.setTimeout(o,n)})}var si=globalThis.HTMLElement!==void 0&&Object.prototype.hasOwnProperty.call(globalThis.HTMLElement.prototype,`popover`),ci=Math.min,li=Math.max,ui=Math.round,di=Math.floor,fi=e=>({x:e,y:e}),pi={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function mi(e,t,n){return li(e,ci(t,n))}function hi(e,t){return typeof e==`function`?e(t):e}function gi(e){return e.split(`-`)[0]}function _i(e){return e.split(`-`)[1]}function vi(e){return e===`x`?`y`:`x`}function yi(e){return e===`y`?`height`:`width`}function bi(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function xi(e){return vi(bi(e))}function Si(e,t,n){n===void 0&&(n=!1);let r=_i(e),i=xi(e),a=yi(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=ji(o)),[o,ji(o)]}function Ci(e){let t=ji(e);return[wi(e),t,wi(t)]}function wi(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var Ti=[`left`,`right`],Ei=[`right`,`left`],Di=[`top`,`bottom`],Oi=[`bottom`,`top`];function ki(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Ei:Ti:t?Ti:Ei;case`left`:case`right`:return t?Di:Oi;default:return[]}}function Ai(e,t,n,r){let i=_i(e),a=ki(gi(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(wi)))),a}function ji(e){let t=gi(e);return pi[t]+e.slice(t.length)}function Mi(e){return{top:e.top??0,right:e.right??0,bottom:e.bottom??0,left:e.left??0}}function Ni(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Mi(e)}function Pi(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function Fi(e,t,n){let{reference:r,floating:i}=e,a=bi(t),o=xi(t),s=yi(o),c=gi(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}let m=_i(t);return m&&(p[o]+=f*(m===`end`?1:-1)*(n&&l?-1:1)),p}async function Ii(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=hi(t,e),p=Ni(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Pi(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Pi(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var Li=50,Ri=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Ii},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=Fi(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<Li&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=Fi(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},zi=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=hi(e,t)||{};if(l==null)return{};let d=Ni(u),f={x:n,y:r},p=xi(i),m=yi(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],ee=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),S=ee?ee[y]:0;S&&await(o.isElement==null?void 0:o.isElement(ee))||(S=s.floating[y]||a.floating[m]);let C=b/2-x/2,w=S/2-h[m]/2-1,te=ci(d[_],w),ne=ci(d[v],w),re=S-h[m]-ne,T=S/2-h[m]/2+C,ie=mi(te,T,re),ae=!c.arrow&&_i(i)!=null&&T!==ie&&a.reference[m]/2-(T<te?te:ne)-h[m]/2<0,oe=ae?T<te?T-te:T-re:0;return{[p]:f[p]+oe,data:{[p]:ie,centerOffset:T-ie-oe,...ae&&{alignmentOffset:oe}},reset:ae}}}),Bi=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=hi(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=gi(r),_=bi(o),v=gi(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[ji(o)]:Ci(o)),x=p!==`none`;!d&&x&&b.push(...Ai(o,m,p,y));let ee=[o,...b],S=await s.detectOverflow(t,h),C=[],w=i.flip?.overflows||[];if(l&&C.push(S[g]),u){let e=Si(r,a,y);C.push(S[e[0]],S[e[1]])}if(w=[...w,{placement:r,overflows:C}],!C.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=ee[e];if(t&&(u!==`alignment`||_===bi(t)||w.every(e=>bi(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:w},reset:{placement:t}};let n=w.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=w.filter(e=>{if(x){let t=bi(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}},Vi=new Set([`left`,`top`]);async function Hi(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=gi(n),s=_i(n),c=bi(n)===`y`,l=Vi.has(o)?-1:1,u=a&&c?-1:1,d=hi(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var Ui=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await Hi(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},Wi=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=hi(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=bi(i),p=vi(f),m=u[p],h=u[f],g=(e,t)=>mi(t+d[e===`y`?`top`:`left`],t,t-d[e===`y`?`bottom`:`right`]);o&&(m=g(p,m)),s&&(h=g(f,h));let _=c.fn({...t,[p]:m,[f]:h});return{..._,data:{x:_.x-n,y:_.y-r,enabled:{[p]:o,[f]:s}}}}}},Gi=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){let{placement:n,rects:r,platform:i,elements:a}=t,{apply:o=()=>{},...s}=hi(e,t),c=await i.detectOverflow(t,s),l=gi(n),u=_i(n),d=bi(n)===`y`,{width:f,height:p}=r.floating,m,h;l===`top`||l===`bottom`?(m=l,h=u===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?`start`:`end`)?`left`:`right`):(h=l,m=u===`end`?`top`:`bottom`);let g=p-c.top-c.bottom,_=f-c.left-c.right,v=ci(p-c[m],g),y=ci(f-c[h],_),b=t.middlewareData.shift,x=!b,ee=v,S=y;b!=null&&b.enabled.x&&(S=_),b!=null&&b.enabled.y&&(ee=g),x&&!u&&(d?S=f-2*li(c.left,c.right):ee=p-2*li(c.top,c.bottom)),await o({...t,availableWidth:S,availableHeight:ee});let C=await i.getDimensions(a.floating);return f!==C.width||p!==C.height?{reset:{rects:!0}}:{}}}};function Ki(){return typeof window<`u`}function qi(e){return Yi(e)?(e.nodeName||``).toLowerCase():`#document`}function H(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Ji(e){return((Yi(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function Yi(e){return Ki()?e instanceof Node||e instanceof H(e).Node:!1}function Xi(e){return Ki()?e instanceof Element||e instanceof H(e).Element:!1}function Zi(e){return Ki()?e instanceof HTMLElement||e instanceof H(e).HTMLElement:!1}function Qi(e){return!Ki()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof H(e).ShadowRoot}function $i(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=ua(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function ea(e){return/^(table|td|th)$/.test(qi(e))}function ta(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var na=/transform|translate|scale|rotate|perspective|filter/,ra=/paint|layout|strict|content/,ia=e=>!!e&&e!==`none`,aa;function oa(e){let t=Xi(e)?ua(e):e;return ia(t.transform)||ia(t.translate)||ia(t.scale)||ia(t.rotate)||ia(t.perspective)||!ca()&&(ia(t.backdropFilter)||ia(t.filter))||na.test(t.willChange||``)||ra.test(t.contain||``)}function sa(e){let t=fa(e);for(;Zi(t)&&!la(t);){if(oa(t))return t;if(ta(t))return null;t=fa(t)}return null}function ca(){return aa??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),aa}function la(e){return/^(html|body|#document)$/.test(qi(e))}function ua(e){return H(e).getComputedStyle(e)}function da(e){return Xi(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function fa(e){if(qi(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||Qi(e)&&e.host||Ji(e);return Qi(t)?t.host:t}function pa(e){let t=fa(e);return la(t)?(e.ownerDocument||e).body:Zi(t)&&$i(t)?t:pa(t)}function ma(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=pa(e),i=r===e.ownerDocument?.body,a=H(r);if(i){let e=ha(a);return t.concat(a,a.visualViewport||[],$i(r)?r:[],e&&n?ma(e):[])}return t.concat(r,ma(r,[],n))}function ha(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ga(e){let t=ua(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=Zi(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=ui(n)!==a||ui(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function _a(e){return Xi(e)?e:e.contextElement}function va(e){let t=_a(e);if(!Zi(t))return fi(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=ga(t),o=(a?ui(n.width):n.width)/r,s=(a?ui(n.height):n.height)/i;return o&&Number.isFinite(o)||(o=1),s&&Number.isFinite(s)||(s=1),{x:o,y:s}}var ya=fi(0);function ba(e){let t=H(e);return!ca()||!t.visualViewport?ya:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function xa(e,t,n){return t===void 0&&(t=!1),!!n&&t&&n===H(e)}function Sa(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=_a(e),o=fi(1);t&&(r?Xi(r)&&(o=va(r)):o=va(e));let s=xa(a,n,r)?ba(a):fi(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a&&r){let e=H(a),t=Xi(r)?H(r):r,n=e,i=ha(n);for(;i&&t!==n;){let e=va(i),t=i.getBoundingClientRect(),r=ua(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=H(i),i=ha(n)}}return Pi({width:u,height:d,x:c,y:l})}function Ca(e,t){let n=da(e).scrollLeft;return t?t.left+n:Sa(Ji(e)).left+n}function wa(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Ca(e,n),y:n.top+t.scrollTop}}function Ta(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=Ji(r),s=t?ta(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=fi(1),u=fi(0),d=Zi(r);if((d||!a)&&((qi(r)!==`body`||$i(o))&&(c=da(r)),d)){let e=Sa(r);l=va(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?wa(o,c):fi(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Ea(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function Da(e){let t=da(e),n=e.ownerDocument.body,r=li(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),i=li(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),a=-t.scrollLeft+Ca(e),o=-t.scrollTop;return ua(n).direction===`rtl`&&(a+=li(e.clientWidth,n.clientWidth)-r),{width:r,height:i,x:a,y:o}}var Oa=25;function ka(e,t,n){n===void 0&&(n=`viewport`);let r=n===`layoutViewport`,i=H(e),a=Ji(e),o=i.visualViewport,s=a.clientWidth,c=a.clientHeight,l=0,u=0;if(o){let e=!ca()||t===`fixed`;r?e||(l=-o.offsetLeft,u=-o.offsetTop):(s=o.width,c=o.height,e&&(l=o.offsetLeft,u=o.offsetTop))}if(Ca(a)<=0){let e=a.ownerDocument,t=e.body,n=getComputedStyle(t),r=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,i=Math.abs(a.clientWidth-t.clientWidth-r),o=getComputedStyle(a).scrollbarGutter===`stable both-edges`?i/2:i;o<=Oa&&(s-=o)}return{width:s,height:c,x:l,y:u}}function Aa(e,t){let n=Sa(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=va(e);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function ja(e,t,n){let r;if(t===`viewport`||t===`layoutViewport`)r=ka(e,n,t);else if(t===`document`)r=Da(Ji(e));else if(Xi(t))r=Aa(t,n);else{let n=ba(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Pi(r)}function Ma(e,t){let n=t.get(e);if(n)return n;let r=ma(e,[],!1).filter(e=>Xi(e)&&qi(e)!==`body`),i=null,a=ua(e).position===`fixed`,o=a?fa(e):e;for(;Xi(o)&&!la(o);){let e=ua(o),t=oa(o),n=i?i.position:a?`fixed`:``;!t&&(n===`fixed`||n===`absolute`&&e.position===`static`)?r=r.filter(e=>e!==o):i=e,o=fa(o)}return t.set(e,r),r}function Na(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?ta(t)?[]:Ma(t,this._c):[].concat(n),r],o=ja(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=ja(t,a[e],i);s=li(n.top,s),c=ci(n.right,c),l=ci(n.bottom,l),u=li(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Pa(e){let{width:t,height:n}=ga(e);return{width:t,height:n}}function Fa(e,t,n){let r=Zi(t),i=Ji(t),a=n===`fixed`,o=Sa(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=fi(0);if((r||!a)&&((qi(t)!==`body`||$i(i))&&(s=da(t)),r)){let e=Sa(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}!r&&i&&(c.x=Ca(i));let l=i&&!r&&!a?wa(i,s):fi(0);return{x:o.left+s.scrollLeft-c.x-l.x,y:o.top+s.scrollTop-c.y-l.y,width:o.width,height:o.height}}function Ia(e){return ua(e).position===`static`}function La(e,t){if(!Zi(e)||ua(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return Ji(e)===n&&(n=n.ownerDocument.body),n}function Ra(e,t){let n=H(e);if(ta(e))return n;if(!Zi(e)){let t=fa(e);for(;t&&!la(t);){if(Xi(t)&&!Ia(t))return t;t=fa(t)}return n}let r=La(e,t);for(;r&&ea(r)&&Ia(r);)r=La(r,t);return r&&la(r)&&Ia(r)&&!oa(r)?n:r||sa(e)||n}var za=async function(e){let t=this.getOffsetParent||Ra,n=this.getDimensions,r=await n(e.floating);return{reference:Fa(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Ba(e){return ua(e).direction===`rtl`}var Va={convertOffsetParentRelativeRectToViewportRelativeRect:Ta,getDocumentElement:Ji,getClippingRect:Na,getOffsetParent:Ra,getElementRects:za,getClientRects:Ea,getDimensions:Pa,getScale:va,isElement:Xi,isRTL:Ba};function Ha(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Ua(e,t,n){let r=null,i,a=Ji(e);function o(){var e;clearTimeout(i),(e=r)==null||e.disconnect(),r=null}function s(n,c){n===void 0&&(n=!1),c===void 0&&(c=1),o();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(n||t(),!f||!p)return;let m=di(d),h=di(a.clientWidth-(u+f)),g=di(a.clientHeight-(d+p)),_=di(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:li(0,ci(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(!Ha(l,e.getBoundingClientRect()))return s();if(n!==c){if(!y)return s();n?s(!1,n):i=setTimeout(()=>{s(!1,1e-7)},1e3)}y=!1}try{r=new IntersectionObserver(b,{...v,root:a.ownerDocument})}catch{r=new IntersectionObserver(b,v)}r.observe(e)}let c=H(e),l=()=>s(n);return c.addEventListener(`resize`,l),s(!0),()=>{c.removeEventListener(`resize`,l),o()}}function Wa(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=_a(e),u=i||a?[...l?ma(l):[],...t?ma(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n),a&&e.addEventListener(`resize`,n)});let d=l&&s?Ua(l,n,a):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Sa(e):null;c&&g();function g(){let t=Sa(e);h&&!Ha(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var Ga=Ui,Ka=Wi,qa=Bi,Ja=Gi,Ya=zi,Xa=(e,t,n)=>{let r=new Map,i=n??{},a={...Va,...i.platform,_c:r};return Ri(e,t,{...i,platform:a})};function Za(e){return $a(e)}function Qa(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function $a(e){for(let t=e;t;t=Qa(t))if(t instanceof Element&&getComputedStyle(t).display===`none`)return null;for(let t=Qa(e);t;t=Qa(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if(e.display!==`contents`&&(e.position!==`static`||oa(e)||t.tagName===`BODY`))return t}return null}function eo(e,t){if(!t)return null;let n=e.getRootNode();if(n instanceof Document||n instanceof ShadowRoot){let e=n.getElementById(t);if(e)return e}return e.ownerDocument.getElementById(t)}var to=class extends Event{constructor(){super(`pk-reposition`,{bubbles:!0,cancelable:!1,composed:!0})}},no=d`
    @layer pk-component {
        :host {
            display: contents;
        }

        .popup {
            position: absolute;
            isolation: isolate;
            width: max-content;
            z-index: var(--pk-popup-z-index, 1000);
            /* Never transition coordinates — flip would animate the jump. */
            transition: none;

            /* Reset UA styles for [popover] — see  pk-popup. */
            inset: unset;
            padding: unset;
            margin: unset;
            height: unset;
            color: unset;
            background: unset;
            border: unset;
            overflow: unset;
        }

        .popup-fixed {
            position: fixed;
        }

        .popup:not(.active) {
            display: none;
        }

        /* Prefer visibility over opacity so enter animations are not fighting a
         * 0→1 fade. Matches base-ui isPositioned / hide-until-placed.
         */
        .popup.active:not(.positioned) {
            visibility: hidden;
            pointer-events: none;
        }

        .popup.show {
            animation: pk-popup-surface-in 100ms ease-out;
        }

        .popup.hide {
            animation: pk-popup-surface-out 100ms ease-in forwards;
        }

        @keyframes pk-popup-surface-in {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pk-popup-surface-out {
            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }

        .arrow {
            position: absolute;
            width: var(--pk-popup-arrow-size, 6px);
            height: var(--pk-popup-arrow-size, 6px);
            rotate: 45deg;
            background: var(--pk-popup-arrow-color, var(--pk-color-white));
            z-index: 1;
        }

        .hover-bridge {
            position: fixed;
            z-index: calc(var(--pk-popup-z-index, 1000) - 1);
            inset: 0;
            clip-path: polygon(
                var(--pk-hover-bridge-top-left-x, 0) var(--pk-hover-bridge-top-left-y, 0),
                var(--pk-hover-bridge-top-right-x, 0) var(--pk-hover-bridge-top-right-y, 0),
                var(--pk-hover-bridge-bottom-right-x, 0) var(--pk-hover-bridge-bottom-right-y, 0),
                var(--pk-hover-bridge-bottom-left-x, 0) var(--pk-hover-bridge-bottom-left-y, 0)
            );
            pointer-events: auto;
        }

        .hover-bridge:not(.hover-bridge-visible) {
            display: none;
        }
    }
`;function ro(e){return typeof e==`object`&&!!e&&`getBoundingClientRect`in e}function io(e){return e||(si?`absolute`:`fixed`)}function ao(e,t){if(si&&!ro(e)&&t===`scroll`)return ma(e).filter(e=>e instanceof Element)}var U=class extends A{constructor(...e){super(...e),this.anchor=``,this.active=!1,this.boundary=`viewport`,this.placement=`bottom-start`,this.distance=4,this.skidding=0,this.flip=!0,this.flipFallbackPlacements=``,this.flipFallbackStrategy=`best-fit`,this.flipPadding=8,this.shift=!0,this.shiftPadding=8,this.arrow=!1,this.arrowPlacement=`anchor`,this.arrowPadding=10,this.autoSizePadding=8,this.anchorTracking=!0,this.hoverBridge=!1,this.anchorElement=null,this.settlingInitialPosition=!1,this.settleGeneration=0}static{this.styles=no}disconnectedCallback(){this.stop(),super.disconnectedCallback()}updated(e){super.updated(e),e.has(`active`)&&(this.active?(this.resolveAnchor(),this.start()):this.stop()),e.has(`anchor`)&&this.handleAnchorChange(),this.active&&!e.has(`active`)&&this.reposition()}reposition(){this.settlingInitialPosition||this.repositionAsync()}async repositionAsync(e=!0){let t=this.popupElement,n=this.arrow?this.arrowElement:null;if(!this.active||!this.anchorElement||!t)return!1;let r=ao(this.anchorElement,this.boundary),i=[Ga({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?i.push(Ja({apply:({rects:e})=>{let n=this.sync===`width`||this.sync===`both`,r=this.sync===`height`||this.sync===`both`;t.style.width=n?`${e.reference.width}px`:``,t.style.height=r?`${e.reference.height}px`:``}})):(t.style.width=``,t.style.height=``),this.flip&&i.push(qa({boundary:r,fallbackPlacements:this.flipFallbackPlacements?this.flipFallbackPlacements.split(` `).map(e=>e.trim()).filter(Boolean):void 0,fallbackStrategy:this.flipFallbackStrategy===`best-fit`?`bestFit`:`initialPlacement`,padding:this.flipPadding})),this.shift&&i.push(Ka({boundary:r,padding:this.shiftPadding})),this.autoSize?i.push(Ja({boundary:r,padding:this.autoSizePadding,apply:({availableHeight:e,availableWidth:n})=>{let r=this.autoSize===`horizontal`||this.autoSize===`both`,i=this.autoSize===`vertical`||this.autoSize===`both`;r?t.style.setProperty(`--pk-popup-available-width`,`${Math.max(0,Math.floor(n))}px`):t.style.removeProperty(`--pk-popup-available-width`),i?t.style.setProperty(`--pk-popup-available-height`,`${Math.max(0,Math.floor(e))}px`):t.style.removeProperty(`--pk-popup-available-height`)}})):(t.style.removeProperty(`--pk-popup-available-width`),t.style.removeProperty(`--pk-popup-available-height`)),this.arrow&&n&&i.push(Ya({element:n,padding:this.arrowPadding}));let a=io(this.positionMethod),o=a===`fixed`;t.classList.toggle(`popup-fixed`,o);let s=si?e=>Va.getOffsetParent(e,Za):Va.getOffsetParent,{x:c,y:l,middlewareData:u,placement:d}=await Xa(this.anchorElement,t,{placement:this.placement,middleware:i,strategy:a,platform:{...Va,getOffsetParent:s}});if(!this.active||!t.isConnected)return!1;let f={top:`bottom`,right:`left`,bottom:`top`,left:`right`}[d.split(`-`)[0]];if(this.setAttribute(`data-current-placement`,d),Object.assign(t.style,{left:`${c}px`,top:`${l}px`,...o?{position:`fixed`}:{position:``}}),this.anchorElement){let e=this.anchorElement.getBoundingClientRect(),n=t.getBoundingClientRect();t.style.setProperty(`--pk-anchor-width`,`${e.width}px`),t.style.setProperty(`--pk-anchor-height`,`${e.height}px`);let r=ii(d,e,n,this.distance,u.shift);t.style.setProperty(`--pk-transform-origin`,r)}if(this.arrow&&n){let e=u.arrow?.x,t=u.arrow?.y,r=``,i=``,a=``,o=``;if(this.arrowPlacement===`start`){let n=typeof e==`number`?`${this.arrowPadding}px`:``;r=typeof t==`number`?`${this.arrowPadding}px`:``,o=n}else this.arrowPlacement===`end`?(i=typeof e==`number`?`${this.arrowPadding}px`:``,a=typeof t==`number`?`${this.arrowPadding}px`:``):this.arrowPlacement===`center`?(o=typeof e==`number`?`50%`:``,r=typeof t==`number`?`50%`:``):(o=typeof e==`number`?`${e}px`:``,r=typeof t==`number`?`${t}px`:``);Object.assign(n.style,{top:r,right:i,bottom:a,left:o,transform:``,[f]:`calc(-1 * var(--pk-popup-arrow-size, 6px) / 2)`})}return requestAnimationFrame(()=>this.updateHoverBridge()),e&&this.dispatchEvent(new to),!0}frames(e){return new Promise(t=>{let n=e=>{e<=0?t():requestAnimationFrame(()=>n(e-1))};n(e)})}async settleInitialPosition(){let e=++this.settleGeneration,t=this.popupElement;t?(await this.frames(2),this.active&&e===this.settleGeneration&&(await this.repositionAsync(!1),t.offsetHeight,await this.frames(1),this.active&&e===this.settleGeneration&&(await this.repositionAsync(!1),this.active&&e===this.settleGeneration&&(t.classList.add(`positioned`),this.settlingInitialPosition=!1,requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new to))))):this.settlingInitialPosition=!1}resolveAnchor(){if(typeof this.anchor==`string`&&this.anchor){this.anchorElement=eo(this,this.anchor);return}if(this.anchor instanceof Element||ro(this.anchor)){this.anchorElement=this.anchor;return}let e=this.querySelector(`[slot="anchor"]`);e instanceof HTMLSlotElement&&(e=e.assignedElements({flatten:!0})[0]??null),this.anchorElement=e}async handleAnchorChange(){await this.stop(),this.resolveAnchor(),this.anchorElement&&this.active&&this.start()}usesPopoverTopLayer(){return si&&this.positionMethod!==`fixed`}stop(){return new Promise(e=>{let t=this.popupElement;this.trackingFrame!==void 0&&cancelAnimationFrame(this.trackingFrame),this.trackingFrame=void 0,this.settleGeneration+=1,this.settlingInitialPosition=!1,t?.classList.remove(`positioned`),this.usesPopoverTopLayer()&&t?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,t?.style.removeProperty(`--pk-transform-origin`),requestAnimationFrame(()=>e())):e(),this.removeAttribute(`data-current-placement`)})}releasePositioning(){this.cleanup&&=(this.cleanup(),void 0)}async awaitHidden(){await this.stop()}start(){this.anchorElement&&this.active&&this.isConnected&&this.popupElement&&(this.popupElement.classList.remove(`positioned`),this.settlingInitialPosition=!0,this.usesPopoverTopLayer()&&this.popupElement.showPopover?.(),this.anchorTracking&&(this.cleanup=Wa(this.anchorElement,this.popupElement,()=>{this.settlingInitialPosition||(this.trackingFrame!==void 0&&cancelAnimationFrame(this.trackingFrame),this.trackingFrame=requestAnimationFrame(()=>{this.trackingFrame=void 0,this.reposition()}))})),this.settleInitialPosition())}getContentElement(){let e=((this.shadowRoot?.querySelector(`slot:not([name])`))?.assignedElements({flatten:!0})??[]).find(e=>e instanceof HTMLElement);if(e)return e;for(let e of this.childNodes)if(e instanceof HTMLElement&&e.getAttribute(`slot`)!==`anchor`)return e;return null}updateHoverBridge(){let e=this.popupElement;if(!this.hoverBridge||!this.anchorElement||!e)return;let t=this.anchorElement.getBoundingClientRect(),n=e.getBoundingClientRect(),r=this.placement.includes(`top`)||this.placement.includes(`bottom`),i=0,a=0,o=0,s=0,c=0,l=0,u=0,d=0;r?t.top<n.top?(i=t.left,a=t.bottom,o=t.right,s=t.bottom,c=n.left,l=n.top,u=n.right,d=n.top):(i=n.left,a=n.bottom,o=n.right,s=n.bottom,c=t.left,l=t.top,u=t.right,d=t.top):t.left<n.left?(i=t.right,a=t.top,o=n.left,s=n.top,c=t.right,l=t.bottom,u=n.left,d=n.bottom):(i=n.right,a=n.top,o=t.left,s=t.top,c=n.right,l=n.bottom,u=t.left,d=t.bottom),this.style.setProperty(`--pk-hover-bridge-top-left-x`,`${i}px`),this.style.setProperty(`--pk-hover-bridge-top-left-y`,`${a}px`),this.style.setProperty(`--pk-hover-bridge-top-right-x`,`${o}px`),this.style.setProperty(`--pk-hover-bridge-top-right-y`,`${s}px`),this.style.setProperty(`--pk-hover-bridge-bottom-left-x`,`${c}px`),this.style.setProperty(`--pk-hover-bridge-bottom-left-y`,`${l}px`),this.style.setProperty(`--pk-hover-bridge-bottom-right-x`,`${u}px`),this.style.setProperty(`--pk-hover-bridge-bottom-right-y`,`${d}px`)}render(){let e=!si||this.positionMethod===`fixed`,t=this.usesPopoverTopLayer();return E`
            <slot name="anchor" @slotchange=${()=>{this.handleAnchorChange()}}></slot>
            ${this.hoverBridge?E`
                <div
                    part="hover-bridge"
                    class=${I({"hover-bridge":!0,"hover-bridge-visible":this.active})}
                    aria-hidden="true"
                ></div>
            `:O}
            <div
                popover=${t?`manual`:O}
                part="popup"
                class=${I({popup:!0,active:this.active,"popup-fixed":e})}
            >
                ${this.arrow?E`<div part="arrow" class="arrow"></div>`:O}
                <slot></slot>
            </div>
        `}};j([M()],U.prototype,`anchor`,void 0),j([M({type:Boolean,reflect:!0})],U.prototype,`active`,void 0),j([M({attribute:`position-method`})],U.prototype,`positionMethod`,void 0),j([M({reflect:!0})],U.prototype,`boundary`,void 0),j([M({reflect:!0})],U.prototype,`placement`,void 0),j([M({type:Number})],U.prototype,`distance`,void 0),j([M({type:Number})],U.prototype,`skidding`,void 0),j([M({type:Boolean})],U.prototype,`flip`,void 0),j([M({attribute:`flip-fallback-placements`})],U.prototype,`flipFallbackPlacements`,void 0),j([M({attribute:`flip-fallback-strategy`})],U.prototype,`flipFallbackStrategy`,void 0),j([M({attribute:`flip-padding`,type:Number})],U.prototype,`flipPadding`,void 0),j([M({type:Boolean})],U.prototype,`shift`,void 0),j([M({attribute:`shift-padding`,type:Number})],U.prototype,`shiftPadding`,void 0),j([M({type:Boolean})],U.prototype,`arrow`,void 0),j([M({attribute:`arrow-placement`})],U.prototype,`arrowPlacement`,void 0),j([M({attribute:`arrow-padding`,type:Number})],U.prototype,`arrowPadding`,void 0),j([M()],U.prototype,`sync`,void 0),j([M({attribute:`auto-size`})],U.prototype,`autoSize`,void 0),j([M({attribute:`auto-size-padding`,type:Number})],U.prototype,`autoSizePadding`,void 0),j([M({attribute:`anchor-tracking`,type:Boolean})],U.prototype,`anchorTracking`,void 0),j([M({attribute:`hover-bridge`,type:Boolean})],U.prototype,`hoverBridge`,void 0),j([P(`.popup`)],U.prototype,`popupElement`,void 0),j([P(`.arrow`)],U.prototype,`arrowElement`,void 0),U=j([k(`pk-popup`)],U);var oo=class extends Event{constructor(){super(`pk-show`,{bubbles:!0,cancelable:!1,composed:!0})}},so=class extends Event{constructor(){super(`pk-after-show`,{bubbles:!0,cancelable:!1,composed:!0})}},co=class extends Event{constructor(e=`unknown`){super(`pk-hide`,{bubbles:!0,cancelable:!0,composed:!0}),this.detail={source:e}}},lo=class extends Event{constructor(){super(`pk-after-hide`,{bubbles:!0,cancelable:!1,composed:!0})}};function uo(e){if(e.panel instanceof Element){let t=e.panel.closest(`pk-popup`);if(t)return t;let n=e.panel.getRootNode();if(n instanceof ShadowRoot&&n.host.localName===`pk-popup`)return n.host}return e.host instanceof HTMLElement?e.host.shadowRoot?.querySelector(`pk-popup`)??e.host.querySelector(`:scope > pk-popup`)??e.host.querySelector(`pk-popup`):null}function fo(e,t={}){let n=e.composedPath();if(t.host&&n.includes(t.host)||t.anchor&&n.includes(t.anchor)||t.panel&&n.includes(t.panel))return!0;let r=uo(t);return r&&n.includes(r)?!0:n.some(e=>e instanceof HTMLElement?r&&e.classList.contains(`popup`)&&(e===r||r.contains(e))?!0:t.extraMatches?.(e)??!1:!1)}function po(e,t={}){return fo(e,t)}var mo=d`
    @layer pk-component {
        .pk-popup-content {
            transform-origin: var(--pk-transform-origin, top);
        }

        .pk-popup-content[data-open] {
            animation: pk-popup-content-in 100ms ease-out;
        }

        .pk-popup-content[data-open][data-side='bottom'] {
            animation-name: pk-popup-content-in-bottom;
        }

        .pk-popup-content[data-open][data-side='top'] {
            animation-name: pk-popup-content-in-top;
        }

        .pk-popup-content[data-open][data-side='left'] {
            animation-name: pk-popup-content-in-left;
        }

        .pk-popup-content[data-open][data-side='right'] {
            animation-name: pk-popup-content-in-right;
        }

        /* Exit: fade + zoom only — matches tw-animate animate-out / tooltip motion. */
        .pk-popup-content.closing {
            animation: pk-popup-content-out 100ms ease-in forwards;
        }
    }

    @keyframes pk-popup-content-in {
        from {
            opacity: 0;
            transform: scale(0.95);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes pk-popup-content-out {
        from {
            opacity: 1;
            transform: scale(1);
        }

        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }

    @keyframes pk-popup-content-in-bottom {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes pk-popup-content-in-top {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes pk-popup-content-in-left {
        from {
            opacity: 0;
            transform: scale(0.95) translateX(0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateX(0);
        }
    }

    @keyframes pk-popup-content-in-right {
        from {
            opacity: 0;
            transform: scale(0.95) translateX(-0.5rem);
        }

        to {
            opacity: 1;
            transform: scale(1) translateX(0);
        }
    }
`;function ho(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var go=new Set,_o=null,vo=new Set([` `,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`PageUp`,`PageDown`,`Home`,`End`]);function yo(e){for(let t of e.composedPath())if(t instanceof HTMLElement&&go.has(t))return!0;return!1}function bo(e){if(!(e instanceof HTMLElement))return!1;if(e.isContentEditable)return!0;let t=e.tagName;return t===`INPUT`||t===`TEXTAREA`||t===`SELECT`}function xo(){let e=document.body,t=e.style.overflow;e.style.setProperty(`overflow`,`hidden`,`important`);let n=e=>{yo(e)||e.preventDefault()},r=e=>{yo(e)||e.preventDefault()},i=e=>{vo.has(e.key)&&(yo(e)||bo(e.target)||e.preventDefault())};return window.addEventListener(`wheel`,n,{passive:!1,capture:!0}),window.addEventListener(`touchmove`,r,{passive:!1,capture:!0}),window.addEventListener(`keydown`,i,{capture:!0}),()=>{window.removeEventListener(`wheel`,n,{capture:!0}),window.removeEventListener(`touchmove`,r,{capture:!0}),window.removeEventListener(`keydown`,i,{capture:!0}),e.style.removeProperty(`overflow`),t&&(e.style.overflow=t)}}function So(e){go.add(e),go.size===1&&(document.documentElement.classList.add(`pk-scroll-lock`),document.documentElement.style.setProperty(`--pk-scroll-lock-size`,`0px`),_o=xo())}function Co(e){go.delete(e),go.size===0&&(_o?.(),_o=null,document.documentElement.classList.remove(`pk-scroll-lock`),document.documentElement.style.removeProperty(`--pk-scroll-lock-size`),document.documentElement.style.removeProperty(`--pk-scroll-lock-gutter`))}function wo(e,t,n=`vertical`,r=`smooth`){let i=ho(e,t),a=i.top+t.scrollTop,o=i.left+t.scrollLeft,s=t.scrollLeft,c=t.scrollLeft+t.offsetWidth,l=t.scrollTop,u=t.scrollTop+t.offsetHeight;(n===`horizontal`||n===`both`)&&(o<s?t.scrollTo({left:o,behavior:r}):o+e.clientWidth>c&&t.scrollTo({left:o-t.offsetWidth+e.clientWidth,behavior:r})),(n===`vertical`||n===`both`)&&(a<l?t.scrollTo({top:a,behavior:r}):a+e.clientHeight>u&&t.scrollTo({top:a-t.offsetHeight+e.clientHeight,behavior:r}))}var To=new Set([`ArrowDown`,`ArrowUp`,`ArrowLeft`,`ArrowRight`,`Home`,`End`,`Enter`,` `,`Escape`]);function Eo(e){return e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey}function Do(e){return e.filter(e=>!e.hasAttribute(`disabled`)&&!e.hasAttribute(`hidden`)&&e.getAttribute(`aria-disabled`)!==`true`&&e.getAttribute(`aria-hidden`)!==`true`)}function Oo(e,t,n){if(n){n(t);return}let r=e[t];r instanceof HTMLElement&&`focusControl`in r&&typeof r.focusControl==`function`?r.focusControl():r?.focus()}function ko(e){if(!e)return;let t=e.shadowRoot?.querySelector(`.option`);t instanceof HTMLButtonElement?t.click():e.click()}function Ao(e,t){let n=Do(t.items),r=t.loop===!0;if(n.length===0)return t.currentIndex;let i=Math.max(0,t.currentIndex),a=n[i]??n[0];switch(i=n.indexOf(a),i<0&&(i=0),e.key){case`ArrowDown`:case`ArrowRight`:return e.preventDefault(),i=r&&i>=n.length-1?0:Math.min(i+1,n.length-1),Oo(n,i,t.focusItem),t.onSelect(i),i;case`ArrowUp`:case`ArrowLeft`:return e.preventDefault(),i=r&&i<=0?n.length-1:Math.max(i-1,0),Oo(n,i,t.focusItem),t.onSelect(i),i;case`Home`:return e.preventDefault(),i=0,Oo(n,i,t.focusItem),t.onSelect(i),i;case`End`:return e.preventDefault(),i=n.length-1,Oo(n,i,t.focusItem),t.onSelect(i),i;case`Enter`:case` `:return t.multiselect||(e.preventDefault(),ko(n[i])),i;case`Escape`:return e.preventDefault(),t.onClose?.(),i;default:return i}}function jo(e,t){let n=``,r=0,i=()=>{n=``,window.clearTimeout(r)};return{handleKey:a=>{if(a.key.length!==1||a.ctrlKey||a.metaKey||a.altKey)return;n+=a.key.toLowerCase(),window.clearTimeout(r),r=window.setTimeout(i,750);let o=Do(e);for(let e=0;e<o.length;e+=1)if((o[e]?.textContent??``).trim().toLowerCase().startsWith(n)){t(e),a.preventDefault();return}},reset:i}}var Mo=e=>e.hidden||e.hasAttribute(`data-pk-filter-empty`),No=e=>{let t=[...e.querySelectorAll(`:scope > pk-option, :scope > pk-option-group, :scope > pk-separator`)],n=(e,n)=>{for(let r=e+n;n<0?r>=0:r<t.length;r+=n){let e=t[r];if(e&&e.localName!==`pk-separator`)return e}return null};for(let e=0;e<t.length;e+=1){let r=t[e];if(!r||r.localName!==`pk-separator`)continue;let i=n(e,-1),a=n(e,1);r.hidden=!i||!a||Mo(i)||Mo(a)}},Po=[mo,d`
    ${et}
    @layer pk-component {
        :host {
            display: inline-block;
            position: relative;
            width: fit-content;
            max-width: 100%;
            align-self: flex-start;
            flex: none;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            --pk-select-trigger-border-width: 1px;
            --pk-select-trigger-min-height: var(--pk-control-height-default);
            --pk-select-item-min-height: var(--pk-input-height);
            --pk-select-item-padding-block: calc((var(--pk-control-height-default) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 2rem;
            --pk-select-item-font-size: var(--pk-control-font-default);
            --pk-select-item-line-height: var(--pk-input-control-line-height, 1.25rem);
            --pk-select-item-indicator-size: 0.75rem;
            --pk-select-item-indicator-inset: 0.5rem;
            /* v1 SelectLabel default: text-xs → 12px */
            --pk-select-group-label-font-size: 12px;
            --pk-select-decoration-size: 0.875rem;
        }

        :host([width='full']) {
            display: block;
            width: 100%;
        }

        :host([width='full']) .control {
            width: 100%;
        }

        :host([width='full']) button.control .icon {
            margin-inline-start: auto;
        }

        .control {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            /* Fill the host when consumers set min-width/width on :host. */
            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: var(--pk-select-trigger-min-height);
            margin: 0;
            padding: var(--pk-select-item-padding-block) var(--pk-select-item-padding-inline);
            border: var(--pk-select-trigger-border-width) solid transparent;
            border-radius: var(--pk-radius-lg);
            --pk-select-fill: var(--pk-color-slate-250);
            --pk-select-fill-hover: var(--pk-color-slate-300);
            background: var(--pk-select-fill);
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-select-item-font-size);
            line-height: var(--pk-input-control-line-height, 1.25rem);
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
        }

        button.control {
            appearance: none;
            -webkit-appearance: none;
            text-align: left;
            background-color: var(--pk-select-fill);
            border: var(--pk-select-trigger-border-width) solid transparent;
        }

        :host(:not([disabled])) .control:hover:not(.is-disabled):not(:disabled),
        :host(:not([disabled])) button.control:hover:not(.is-disabled):not(:disabled) {
            background: var(--pk-select-fill-hover);
        }

        :host(:not([disabled])) button.control:hover:not(.is-disabled):not(:disabled) {
            background-color: var(--pk-select-fill-hover);
        }

        :host(:not([invalid]):not(:state(user-invalid))) button.control:focus-visible,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) button.control {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
        }

        .control.is-disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .trigger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            min-width: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: inherit;
            outline: none;
        }

        .control > .trigger:not(.trigger--icon) {
            flex: 0 1 auto;
            justify-content: flex-start;
        }

        .trigger--icon {
            width: 1.25rem;
        }

        .trigger-start {
            display: none;
            flex: 0 0 auto;
            align-items: center;
            /* Decorations must not reserve inline text descender space. */
            line-height: 0;
        }

        .trigger-start.has-decoration {
            display: inline-flex;
        }

        .control-start,
        .control-end {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
            line-height: 0;
            color: var(--pk-color-gray-600);
        }

        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            width: var(--pk-select-decoration-size);
            height: var(--pk-select-decoration-size);
        }

        .value {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
        }

        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            line-height: 0;
            pointer-events: none;
            color: var(--pk-color-gray-600);
        }

        /* Extra space before the expand chevron (control gap stays for start icon ↔ label). */
        .control > .icon,
        .control > .trigger--icon {
            margin-inline-start: 0.25rem;
        }

        .icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
        }

        .tags {
            display: flex;
            flex: 0 1 auto;
            flex-wrap: wrap;
            gap: 0.25rem;
            min-width: 0;
        }

        .tag {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            max-width: 10ch;
            padding: 0.125rem 0.375rem;
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-gray-200);
            color: var(--pk-color-gray-800);
            font-size: 12px;
            line-height: 1.3;
        }

        .tag-label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .tag-remove {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 0.875rem;
            height: 0.875rem;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
        }

        .tag-remove:hover {
            background: rgb(0 0 0 / 8%);
        }

        .clear-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            flex-shrink: 0;
        }

        .clear-button:hover {
            background: rgb(0 0 0 / 6%);
            color: var(--pk-color-gray-800);
        }

        .value-input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .panel ::slotted(pk-separator) {
            margin: 4px 0;
        }

        .panel {
            width: max-content;
            min-width: var(--pk-select-anchor-width, 8rem);
            max-height: 16rem;
            overflow: auto;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
            color: var(--pk-color-gray-700);
            outline: none;
        }

        .panel[hidden] {
            display: none !important;
        }

        :host([invalid]) .control,
        :host(:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) button.control:focus-visible,
        :host([invalid][data-state='focus-visible']) button.control,
        :host(:state(user-invalid)) button.control:focus-visible,
        :host(:state(user-invalid)[data-state='focus-visible']) button.control {
            border-color: var(--pk-color-rose-600);
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xxs']) {
            --pk-select-trigger-min-height: var(--pk-control-height-xxs);
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: calc((var(--pk-control-height-xxs) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: var(--pk-control-font-xxs);
            --pk-select-item-line-height: var(--pk-input-control-line-height, 1.25rem);
            /* v1 SelectLabel xs: text-[11px] */
            --pk-select-group-label-font-size: 11px;
            --pk-select-decoration-size: 0.625rem;
        }

        :host([size='xs']) {
            --pk-select-trigger-min-height: var(--pk-control-height-xs);
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: calc((var(--pk-control-height-xs) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: var(--pk-control-font-xs);
            --pk-select-item-line-height: var(--pk-input-control-line-height, 1.25rem);
            /* v1 SelectLabel xs: text-[11px] */
            --pk-select-group-label-font-size: 11px;
            --pk-select-decoration-size: 0.625rem;
        }

        :host([size='xxs']) .control {
            border-radius: var(--pk-radius-sm);
            /* Keep the trigger line box consistent with the shared control scale. */
            line-height: var(--pk-select-item-line-height, 1.25);
        }

        :host([size='xs']) .control {
            border-radius: var(--pk-radius-sm);
            /* Keep the trigger line box consistent with the shared control scale. */
            line-height: var(--pk-select-item-line-height, 1.25);
        }

        :host([size='xxs']) .icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        :host([size='xs']) .icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        /* Options live in light DOM; ::slotted pushes size tokens onto each pk-option
         * host so the open listbox matches the trigger (inheritance alone is flaky when
         * the panel is promoted to the popover top layer). */
        :host([size='xxs']) ::slotted(pk-option) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: calc((var(--pk-control-height-xxs) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: var(--pk-control-font-xxs);
            --pk-select-item-line-height: var(--pk-input-control-line-height, 1.25rem);
            --pk-select-item-indicator-size: 0.625rem;
        }

        :host([size='xs']) ::slotted(pk-option) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: calc((var(--pk-control-height-xs) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: var(--pk-control-font-xs);
            --pk-select-item-line-height: var(--pk-input-control-line-height, 1.25rem);
            --pk-select-item-indicator-size: 0.625rem;
        }

        :host([size='xxs']) .panel {
            max-height: 12rem;
        }

        :host([size='xs']) .panel {
            max-height: 12rem;
        }

        /* Editable-table cells only (class set by pk-editable-table) — compact chip + menu. */
        :host(.cell-pk-control) {
            --pk-select-trigger-min-height: 0;
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 5px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.5rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-line-height: 1.2;
            /* Compact table chip — match xxs label size. */
            --pk-select-group-label-font-size: 11px;
            --pk-select-decoration-size: 0.625rem;
            --pk-select-item-indicator-size: 0.625rem;
        }

        :host(.cell-pk-control) .control {
            border-radius: var(--pk-radius-sm);
            line-height: var(--pk-select-item-line-height, 1.2);
        }

        :host(.cell-pk-control) ::slotted(pk-option) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 5px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.5rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-line-height: 1.2;
            --pk-select-item-indicator-size: 0.625rem;
        }

        :host(.cell-pk-control) .panel {
            max-height: 11rem;
        }

        :host([size='sm']) {
            --pk-select-trigger-min-height: var(--pk-control-height-sm);
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: calc((var(--pk-control-height-sm) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: var(--pk-control-font-sm);
            --pk-select-item-indicator-inset: 0.625rem;
            /* v1 SelectLabel sm: text-[12px] */
            --pk-select-group-label-font-size: 12px;
            --pk-select-decoration-size: 0.6875rem;
        }

        :host([size='sm']) .control {
            border-radius: var(--pk-radius-md);
        }

        :host([size='sm']) .icon svg {
            width: 0.6875rem;
            height: 0.6875rem;
        }

        :host([size='lg']) {
            --pk-select-trigger-min-height: var(--pk-control-height-lg);
            --pk-select-item-padding-block: calc((var(--pk-control-height-lg) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 12px;
            --pk-select-item-font-size: var(--pk-control-font-lg);
            --pk-select-item-indicator-inset: 0.75rem;
            /* v1 SelectLabel lg: text-sm → 14px */
            --pk-select-group-label-font-size: 14px;
            --pk-select-decoration-size: 1rem;
        }

        :host([size='xl']) {
            --pk-select-trigger-min-height: var(--pk-control-height-xl);
            --pk-select-item-padding-block: calc((var(--pk-control-height-xl) - var(--pk-input-control-line-height, 1.25rem) - 2px) / 2);
            --pk-select-item-padding-inline: 14px;
            --pk-select-item-padding-inline-end: 2.25rem;
            --pk-select-item-font-size: var(--pk-control-font-xl);
            --pk-select-item-indicator-inset: 0.875rem;
            /* v1 SelectLabel xl: text-base → 16px */
            --pk-select-group-label-font-size: 16px;
            --pk-select-decoration-size: 1.125rem;
        }

        :host([size='xl']) .icon svg {
            width: 0.875rem;
            height: 0.875rem;
        }
    }
`],Fo=z(B.chevronDown),W=class extends fr{constructor(...e){super(...e),this.assumeInteractionOn=[`blur`,`input`],this.open=!1,this.multiple=!1,this.placement=`bottom-start`,this.sideOffset=4,this.clearable=!1,this.withClear=!1,this.invalid=!1,this.size=`default`,this.placeholder=``,this.value=``,this.defaultValue=``,this.values=[],this.defaultValues=[],this.ariaLabel=null,this.loopFocus=!1,this.hasSlotController=new yr(this,`start`,`end`),this.listboxId=_r(`pk-select-listbox`),this.triggerId=_r(`pk-select-trigger`),this.options=[],this.highlightedIndex=0,this.dismissRegistered=!1,this.panelEventTarget=null,this.typeToSelect=jo([],()=>{}),this.closing=!1,this.panelAnimated=!1,this.handleOptionsMutation=(e={})=>{let t=this.getOptionElements(),n=t.length!==this.options.length||t.some((e,t)=>e!==this.options[t]);this.options=t,n&&this.open&&this.observeOptionSizes(),this.applySelection(),this.updateTypeToSelect(),e.render!==!1&&n&&this.requestUpdate()},this.syncOptions=()=>{this.handleOptionsMutation({render:!0})},this.handlePopupReposition=()=>{this.fitPanelToOptions(!this.panelAnimated)},this.togglePanel=e=>{e?.preventDefault(),e?.stopPropagation(),!(this.disabled||this.closing)&&(this.open?this.closePanel(`api`):this.openPanel())},this.onDocumentPointerDown=e=>{this.isPointerInside(e)||this.closePanel(`light-dismiss`)},this.onDocumentKeyDown=e=>{if(this.open){if(e.key===`Escape`){if(!ni(this))return;e.preventDefault(),e.stopPropagation(),this.closePanel(`escape`)}else(To.has(e.key)||Eo(e))&&fo(e,{anchor:this.getPopupAnchor(),panel:this.panelElement})&&(e.preventDefault(),e.stopPropagation(),this.onListboxKeyDown(e))}},this.handleOptionSelect=e=>{let{value:t}=e.detail;this.multiple?this.values=this.values.includes(t)?this.values.filter(e=>e!==t):[...this.values,t]:(this.value=t,this.closePanel(`api`)),this.applySelection(),this.emitValueChange()},this.handleOptionHighlight=e=>{if(!this.open)return;let t=this.getEnabledVisibleOptions().findIndex(t=>t.value===e.detail.value);t!==-1&&t!==this.highlightedIndex&&(this.highlightedIndex=t,this.syncHighlight(!1))},this.onKeyDown=e=>{this.open?this.onListboxKeyDown(e):(e.key===`ArrowDown`||e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.openPanel())},this.handleListboxKeyDownEvent=e=>{this.open&&this.onListboxKeyDown(e.detail.keyboardEvent)}}static{this.styles=Po}static get validators(){return[...super.validators,pr(),{observedAttributes:[`required`],checkValidity:e=>{let t=e,n={message:`Please select an item in the list.`,isValid:!0,invalidKeys:[]};return!t.required||!(t.multiple?t.values.length===0:!t.value)||(n.isValid=!1,n.invalidKeys.push(`valueMissing`)),n}}]}get panelElement(){return this.popupElement?.getContentElement()??null}connectedCallback(){this.refreshOptions(),super.connectedCallback(),this.addEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent),this.addEventListener(`keydown`,this.onKeyDown),this.optionsObserver=new MutationObserver(()=>{this.handleOptionsMutation({render:!0})}),this.optionsObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){this.unbindPanelEvents(),this.removeEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent),this.removeEventListener(`keydown`,this.onKeyDown),this.optionsObserver?.disconnect(),this.optionResizeObserver?.disconnect(),cancelAnimationFrame(this.optionResizeFrame??0),this.optionResizeFrame=void 0,this.closePanel(`api`),super.disconnectedCallback()}updated(e){(e.has(`value`)||e.has(`values`)||e.has(`multiple`))&&this.applySelection(),(e.has(`values`)||e.has(`multiple`))&&this.syncFormValue(),super.updated(e)}getOptionElements(){let e=this.popupElement?.getContentElement()?.querySelectorAll(`pk-option`);return e&&e.length>0?[...e]:[...this.querySelectorAll(`pk-option`)]}refreshOptions(){this.handleOptionsMutation({render:!1})}bindPanelEvents(){let e=this.panelElement;e&&e!==this.panelEventTarget&&(this.unbindPanelEvents(),this.panelEventTarget=e,e.addEventListener(`pk-option-select`,this.handleOptionSelect),e.addEventListener(`pk-option-highlight`,this.handleOptionHighlight),e.addEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent))}unbindPanelEvents(){this.panelEventTarget&&=(this.panelEventTarget.removeEventListener(`pk-option-select`,this.handleOptionSelect),this.panelEventTarget.removeEventListener(`pk-option-highlight`,this.handleOptionHighlight),this.panelEventTarget.removeEventListener(`pk-listbox-keydown`,this.handleListboxKeyDownEvent),null)}get validationTarget(){return this.input??this.triggerButton??this.controlElement}getAriaMirrorTarget(){return this.triggerButton??this.controlElement??null}syncFormValue(){if(!this.name)this.setFormValue(null);else if(this.multiple){let e=new FormData;for(let t of this.values)e.append(this.name,t);this.setFormValue(e)}else this.setFormValue(this.value||``)}resetToDefaultValue(){this.multiple?this.values=[...this.defaultValues]:this.value=this.defaultValue,this.applySelection()}restoreFormState(e){e instanceof FormData&&this.name?this.values=e.getAll(this.name).map(String):typeof e==`string`&&(this.value=e)}isOptionInHiddenGroup(e){return!!e.closest(`pk-option-group`)?.hidden}getVisibleOptions(){return this.options.filter(e=>!this.isOptionInHiddenGroup(e))}getEnabledVisibleOptions(){return this.getVisibleOptions().filter(e=>!e.disabled)}isSelected(e){return this.multiple?this.values.includes(e):this.value===e}applySelection(){let e=this.getVisibleOptions();for(let t of this.options)t.selected=this.isSelected(t.value),t.hidden=!e.includes(t),t.optionId=`${this.listboxId}-option-${t.value}`;for(let e of this.querySelectorAll(`pk-option-group`)){let t=[...e.querySelectorAll(`pk-option`)];e.hidden=t.length>0&&t.every(e=>e.hidden)}No(this),this.syncValueInput(),this.syncTriggerDecorations(),this.open&&this.syncHighlight()}syncValueInput(){this.input&&(this.multiple?(this.input.value=this.values.join(`,`),this.input.required=this.required):(this.input.value=this.value,this.input.required=this.required))}getDisplayValue(){if(this.multiple){let e=this.getSelectedOptions().map(e=>e.getLabel());return e.length>0?e.join(`, `):this.placeholder}return this.options.find(e=>e.value===this.value)?.getLabel()||this.placeholder}getSelectedOptions(){return this.options.filter(e=>this.isSelected(e.value))}syncTriggerDecorations(){let e=this.triggerStartElement;if(!e||this.multiple)return;e.replaceChildren(),e.classList.remove(`has-decoration`);let t=this.options.find(e=>e.value===this.value);if(t){for(let n of t.getStartElements())e.append(n.cloneNode(!0));e.classList.toggle(`has-decoration`,e.childElementCount>0)}}hasSelection(){return this.multiple?this.values.length>0:this.options.some(e=>e.value===this.value)||!!this.value}syncHighlightedIndexToSelection(){if(this.multiple)return;let e=this.getEnabledVisibleOptions();if(e.length===0)return;let t=e.findIndex(e=>e.value===this.value);t>=0&&(this.highlightedIndex=t)}observeOptionSizes(){this.optionResizeObserver?.disconnect(),cancelAnimationFrame(this.optionResizeFrame??0),this.optionResizeFrame=void 0,this.optionResizeObserver??=new ResizeObserver(()=>{cancelAnimationFrame(this.optionResizeFrame??0),this.optionResizeFrame=requestAnimationFrame(()=>{this.optionResizeFrame=void 0,this.fitPanelToOptions()})});for(let e of this.options)this.optionResizeObserver.observe(e)}fitPanelToOptions(e=!1){let t=this.panelElement;if(!this.open||this.closing||!t||!t.offsetHeight)return;let n=getComputedStyle(t),r=Number.parseFloat(n.maxHeight),i=Number.parseFloat(n.getPropertyValue(`--pk-popup-available-height`)),a=Math.min(Number.isFinite(r)?r:1/0,Number.isFinite(i)?i:1/0),o=Number.parseFloat(n.borderTopWidth)||0,s=Number.parseFloat(n.borderBottomWidth)||0,c=Number.parseFloat(n.paddingTop)||0,l=Number.parseFloat(n.paddingBottom)||0,u=t.getBoundingClientRect(),d=u.height/t.offsetHeight,f=this.options.filter(e=>e.getClientRects().length>0).map(e=>{let n=e.getBoundingClientRect();return{option:e,top:(n.top-u.top)/d+t.scrollTop-o,bottom:(n.bottom-u.top)/d+t.scrollTop-o}});if(!f.length){t.style.removeProperty(`height`);return}let p=Math.max(0,a-o-s),m=0;if(e){let e=this.getEnabledVisibleOptions()[this.highlightedIndex],t=f.findIndex(t=>t.option===e);for(;m<t&&f[t].bottom-(m?f[m].top-c:0)+l>p;)m++}else{let e=f.findIndex(e=>e.bottom>t.scrollTop+c+.5);m=Math.max(0,e)}let h=m?f[m].top-c:0,g=0;for(let e=m;e<f.length;e++){let t=f[e].bottom-h+l;if(t>p+.5)break;g=t}g=Math.min(a,(g||p)+o+s);let _=`${Math.max(0,Math.round(g*100)/100)}px`;t.style.height!==_&&(t.style.height=_),e&&(t.scrollTop=h)}syncHighlight(e=!0){let t=this.getEnabledVisibleOptions();for(let e of this.options)e.highlighted=!1,e.focusIndex=-1;if(t.length===0){this.highlightedIndex=0;return}this.highlightedIndex>=t.length&&(this.highlightedIndex=0);let n=t[this.highlightedIndex];n&&this.panelElement&&(n.highlighted=!0,n.focusIndex=0,e&&wo(n,this.panelElement,`vertical`,`auto`))}updateTypeToSelect(){this.typeToSelect=jo(this.getEnabledVisibleOptions(),e=>{this.highlightedIndex=e,this.syncHighlight(),this.getEnabledVisibleOptions()[e]?.focusControl()})}getPopupAnchor(){return this.controlElement??null}getActiveDescendantId(){return this.getEnabledVisibleOptions()[this.highlightedIndex]?.optionId||null}async show(){this.open||this.closing||this.disabled||await this.openPanel()}async hide(e=`api`){this.open&&!this.closing&&await this.closePanel(e)}openPanel(){let e=this.getPopupAnchor();if(!e||this.closing)return Promise.resolve();this.dispatchEvent(new oo),this.closing=!1,this.panelAnimated=!1,this.open=!0,this.popupElement.active=!0,this.applySelection(),this.syncHighlightedIndexToSelection(),this.panelElement&&(this.panelElement.style.removeProperty(`height`),this.panelElement.hidden=!1,ai(this.panelElement,this.placement));let t=e.getBoundingClientRect().width;return this.style.setProperty(`--pk-select-anchor-width`,`${t}px`),this.registerDismissHandlers(),this.syncHighlight(),this.updateTypeToSelect(),this.updateComplete.then(async()=>{let e=await oi(this.popupElement,this.placement,300,{requireEvent:!0});this.panelElement&&ai(this.panelElement,e),this.fitPanelToOptions(!0),this.observeOptionSizes(),this.panelAnimated=!0,this.bindPanelEvents(),this.refreshOptions(),this.getEnabledVisibleOptions()[this.highlightedIndex]?.focusControl(),this.dispatchEvent(new so),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!0},bubbles:!0,composed:!0}))})}async closePanel(e=`unknown`){if(!this.open||this.closing)return;let t=new co(e);this.dispatchEvent(t)&&(this.typeToSelect.reset(),this.optionResizeObserver?.disconnect(),cancelAnimationFrame(this.optionResizeFrame??0),this.optionResizeFrame=void 0,this.unbindPanelEvents(),this.unregisterDismissHandlers(),this.closing=!0,this.panelAnimated=!1,await this.waitForExitAnimation(),this.open=!1,this.closing=!1,this.panelAnimated=!1,this.panelElement&&(this.panelElement.hidden=!0,this.panelElement.removeAttribute(`data-side`)),this.popupElement.active=!1,this.dispatchEvent(new lo),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!1},bubbles:!0,composed:!0})),this.shouldReturnFocusToTrigger(e)?this.triggerButton?.focus({preventScroll:!0}):this.triggerButton?.blur())}waitForExitAnimation(){let e=this.panelElement;return e?new Promise(t=>{let n=!1,r=()=>{n||(n=!0,e.removeEventListener(`animationend`,i),window.clearTimeout(a),e.classList.remove(`closing`),t())},i=t=>{t.target===e&&t.animationName.startsWith(`pk-popup-content-out`)&&r()};e.classList.add(`closing`),e.addEventListener(`animationend`,i);let a=window.setTimeout(r,150)}):Promise.resolve()}shouldReturnFocusToTrigger(e){return e!==`light-dismiss`&&e!==`pointer-dismiss`}registerDismissHandlers(){ei(this),this.dismissRegistered=!0,document.addEventListener(`pointerdown`,this.onDocumentPointerDown,!0),document.addEventListener(`keydown`,this.onDocumentKeyDown,!0)}unregisterDismissHandlers(){this.dismissRegistered&&=(ti(this),!1),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!0),document.removeEventListener(`keydown`,this.onDocumentKeyDown,!0)}isPointerInside(e){return po(e,{anchor:this.getPopupAnchor(),panel:this.panelElement})}removeTag(e,t){t.preventDefault(),t.stopPropagation(),this.values=this.values.filter(t=>t!==e),this.applySelection(),this.emitValueChange()}handleClear(e){e.preventDefault(),e.stopPropagation(),this.multiple?this.values=[]:this.value=``,this.applySelection(),this.dispatchEvent(new vr),this.emitValueChange(),this.triggerButton?.focus()}emitValueChange(){this.dispatchEvent(new CustomEvent(`pk-change`,{detail:{value:this.multiple?[...this.values]:this.value},bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}onListboxKeyDown(e){let t=this.getEnabledVisibleOptions();this.highlightedIndex=Ao(e,{items:t,currentIndex:this.highlightedIndex,multiselect:this.multiple,loop:this.loopFocus,onSelect:e=>{this.highlightedIndex=e,this.syncHighlight()},focusItem:e=>{t[e]?.focusControl()},onClose:()=>{this.closePanel(`escape`)}}),e.key.length!==1||e.ctrlKey||e.metaKey||e.altKey||this.typeToSelect.handleKey(e)}renderTags(){return this.getSelectedOptions().map(e=>E`
            <span class="tag" part="tag">
                <span class="tag-label">${e.getLabel()}</span>
                <button
                    type="button"
                    class="tag-remove"
                    part="tag-remove"
                    aria-label=${`Remove ${e.getLabel()}`}
                    @click=${t=>this.removeTag(e.value,t)}
                >
                    ×
                </button>
            </span>
        `)}renderChevronIcon(){return E`
            <span class="icon" aria-hidden="true">${ut(Fo)}</span>
        `}renderHostDecorationSlot(e){return this.hasSlotController.test(e)?E`
            <span part=${e} class=${e===`start`?`control-start`:`control-end`}>
                <slot name=${e}></slot>
            </span>
        `:E`<slot name=${e} hidden></slot>`}render(){let e=this.getDisplayValue(),t=!this.hasSelection(),n=(this.clearable||this.withClear)&&this.hasSelection()&&!this.disabled;return E`
            <input
                class="value-input"
                part="value-input"
                tabindex="-1"
                aria-hidden="true"
                .value=${this.multiple?this.values.join(`,`):this.value}
                ?required=${this.required}
                @input=${()=>this.updateValidity()}
            />
            ${this.multiple?E`
                    <div
                        part="control"
                        class=${I({control:!0,"is-disabled":this.disabled})}
                    >
                        ${this.renderHostDecorationSlot(`start`)}
                        ${this.hasSelection()?E`
                                <div class="tags" part="tags">${this.renderTags()}</div>
                                ${n?E`
                                        <button
                                            type="button"
                                            class="clear-button"
                                            part="clear-button"
                                            aria-label="Clear selection"
                                            @click=${this.handleClear}
                                        >
                                            ×
                                        </button>
                                    `:O}
                            `:E`
                                <button
                                    part="trigger"
                                    type="button"
                                    class="trigger"
                                    id=${this.triggerId}
                                    ?disabled=${this.disabled}
                                    aria-label=${this.ariaLabel??O}
                                    aria-haspopup="listbox"
                                    aria-expanded=${this.open?`true`:`false`}
                                    aria-controls=${this.listboxId}
                                    @click=${this.togglePanel}
                                >
                                    <span class="value is-placeholder">${this.placeholder}</span>
                                </button>
                            `}
                        ${this.renderHostDecorationSlot(`end`)}
                        <button
                            type="button"
                            class="trigger trigger--icon"
                            part="trigger expand-button"
                            aria-label="Toggle options"
                            ?disabled=${this.disabled}
                            @click=${this.togglePanel}
                        >
                            ${this.renderChevronIcon()}
                        </button>
                    </div>
                `:E`
                    <button
                        part="control"
                        type="button"
                        class=${I({control:!0,"is-disabled":this.disabled})}
                        id=${this.triggerId}
                        ?disabled=${this.disabled}
                        aria-label=${this.ariaLabel??O}
                        aria-haspopup="listbox"
                        aria-expanded=${this.open?`true`:`false`}
                        aria-controls=${this.listboxId}
                        @click=${this.togglePanel}
                    >
                        ${this.renderHostDecorationSlot(`start`)}
                        <span part="trigger-start" class="trigger-start"></span>
                        <span
                            class=${I({value:!0,"is-placeholder":t})}
                        >${e}</span>
                        ${n?E`
                                <span
                                    class="clear-button"
                                    part="clear-button"
                                    role="button"
                                    tabindex="-1"
                                    aria-label="Clear selection"
                                    @click=${this.handleClear}
                                >
                                    ×
                                </span>
                            `:O}
                        ${this.renderHostDecorationSlot(`end`)}
                        ${this.renderChevronIcon()}
                    </button>
                `}
            <pk-popup
                .anchor=${this.getPopupAnchor()??``}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                .sync=${`width`}
                auto-size="vertical"
                @pk-reposition=${this.handlePopupReposition}
                flip
                shift
            >
                <div
                    part="panel"
                    class=${I({panel:!0,"pk-popup-content":!0,closing:this.closing})}
                    id=${this.listboxId}
                    role="listbox"
                    aria-multiselectable=${this.multiple?`true`:`false`}
                    tabindex="-1"
                    ?hidden=${!this.open&&!this.closing}
                    data-open=${this.panelAnimated&&!this.closing?``:O}
                    @slotchange=${this.syncOptions}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `}};j([M({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),j([M({type:Boolean,reflect:!0})],W.prototype,`multiple`,void 0),j([M({reflect:!0})],W.prototype,`placement`,void 0),j([M({attribute:`side-offset`,type:Number})],W.prototype,`sideOffset`,void 0),j([M({type:Boolean,reflect:!0})],W.prototype,`clearable`,void 0),j([M({attribute:`with-clear`,type:Boolean})],W.prototype,`withClear`,void 0),j([M({type:Boolean,reflect:!0})],W.prototype,`invalid`,void 0),j([M({reflect:!0})],W.prototype,`size`,void 0),j([M({reflect:!0})],W.prototype,`width`,void 0),j([M()],W.prototype,`placeholder`,void 0),j([M()],W.prototype,`value`,void 0),j([M({attribute:`default-value`})],W.prototype,`defaultValue`,void 0),j([M({type:Array,attribute:!1})],W.prototype,`values`,void 0),j([M({attribute:!1})],W.prototype,`defaultValues`,void 0),j([M({attribute:`aria-label`})],W.prototype,`ariaLabel`,void 0),j([M({attribute:`loop-focus`,type:Boolean})],W.prototype,`loopFocus`,void 0),j([P(`.trigger-start`)],W.prototype,`triggerStartElement`,void 0),j([P(`pk-popup`)],W.prototype,`popupElement`,void 0),j([P(`.control`)],W.prototype,`controlElement`,void 0),j([P(`button.control, .control > button.trigger`)],W.prototype,`triggerButton`,void 0),j([P(`.value-input`)],W.prototype,`input`,void 0),j([N()],W.prototype,`highlightedIndex`,void 0),j([N()],W.prototype,`closing`,void 0),j([N()],W.prototype,`panelAnimated`,void 0),W=j([k(`pk-select`)],W);var Io=d`
    @layer pk-component {
        :host {
            display: inline-block;
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 9999px;
            vertical-align: middle;
        }

        .status {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: inherit;
        }

        :host([status='all']) .status { background: linear-gradient(60deg, #184cef, #e5422b); }
        :host([status='on']) .status,
        :host([status='live']) .status,
        :host([status='active']) .status,
        :host([status='enabled']) .status,
        :host([status='teal']) .status,
        :host([status='turquoise']) .status { background: var(--pk-color-teal-550); }
        :host([status='off']) .status,
        :host([status='suspended']) .status,
        :host([status='expired']) .status,
        :host([status='red']) .status { background: var(--pk-color-red-600); }
        :host([status='warning']) .status { background: var(--pk-color-amber-100); }
        :host([status='pending']) .status,
        :host([status='orange']) .status { background: var(--pk-color-orange-400); }
        :host([status='amber']) .status { background: var(--pk-color-amber-500); }
        :host([status='yellow']) .status { background: var(--pk-color-yellow-500); }
        :host([status='lime']) .status { background: var(--pk-color-lime-500); }
        :host([status='green']) .status { background: var(--pk-color-green-600); }
        :host([status='emerald']) .status { background: var(--pk-color-emerald-500); }
        :host([status='cyan']) .status { background: var(--pk-color-cyan-500); }
        :host([status='sky']) .status { background: var(--pk-color-sky-500); }
        :host([status='blue']) .status { background: var(--pk-color-blue-600); }
        :host([status='indigo']) .status { background: var(--pk-color-indigo-500); }
        :host([status='violet']) .status { background: var(--pk-color-violet-500); }
        :host([status='purple']) .status { background: var(--pk-color-purple-500); }
        :host([status='fuchsia']) .status { background: var(--pk-color-fuchsia-500); }
        :host([status='pink']) .status { background: var(--pk-color-pink-500); }
        :host([status='rose']) .status { background: var(--pk-color-rose-500); }
        :host([status='light']) .status { background: var(--pk-color-gray-100); }
        :host([status='gray']) .status,
        :host([status='grey']) .status { background: var(--pk-color-gray-300); }
        :host([status='white']) .status { background: var(--pk-color-white); }
        :host([status='black']) .status { background: var(--pk-color-gray-800); }
        :host([status='disabled']) .status,
        :host([status='inactive']) .status {
            /* Ring color is overridable for inverted / selected surfaces. */
            background: transparent;
            box-shadow: inset 0 0 0 2px var(--pk-status-ring, var(--pk-color-gray-500));
        }
    }
`,Lo=class extends A{constructor(...e){super(...e),this.status=`on`,this.ariaLabel=null}static{this.styles=Io}render(){return E`
            <span
                part="base"
                class="status"
                role="status"
                aria-label=${this.ariaLabel??O}
            ></span>
        `}};j([M({reflect:!0})],Lo.prototype,`status`,void 0),j([M({attribute:`aria-label`})],Lo.prototype,`ariaLabel`,void 0),Lo=j([k(`pk-status`)],Lo),Xn({...i,arrowLeft:gt,arrowRight:_t,circleCheck:Pt,circleExclamation:Ft,clock:Rt,eye:Gt,lock:ln,magnifyingGlass:xn,triangleExclamation:jn});var Ro=[L,rr,R,V,W,Lo];function zo(){for(let e of Ro)if(typeof e!=`function`)throw Error(`Back in Stock Plugin Kit constructor missing from bundle.`)}function Bo(){return E`
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" viewBox="0 0 640 640">
            <path
                fill="currentColor"
                d="M557.5 192L534.9 214.6L278.9 470.6C266.4 483.1 246.1 483.1 233.6 470.6L105.6 342.6L83 320L128.3 274.7C129.6 276 172.3 318.7 256.3 402.7L489.7 169.3L512.3 146.7L557.6 192z"
            />
        </svg>
    `}function Vo(){return E`
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" viewBox="0 0 640 640">
            <path fill="currentColor" d="M96 352V288H544V352H96z" />
        </svg>
    `}var Ho=[d`
    @layer pk-component {
        .control {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            width: var(--pk-checkbox-size);
            height: var(--pk-checkbox-size);
            border: 1px solid var(--pk-checkbox-border-color, #c0cbd9);
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-white);
            cursor: pointer;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        :host([disabled]) .control {
            cursor: not-allowed;
        }

        .input:focus-visible + .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: 0 0 0 1px var(--pk-color-sky-600), 0 0 4px 0 hsl(from var(--pk-color-sky-600) h s l / 0.7);
        }

        :host([invalid]) .control,
        .input[aria-invalid='true'] + .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .input:focus-visible + .control,
        .input[aria-invalid='true']:focus-visible + .control {
            border-color: var(--pk-color-rose-600);
            box-shadow: 0 0 0 1px var(--pk-color-rose-600), 0 0 4px 0 hsl(from var(--pk-color-rose-600) h s l / 0.7);
        }

        .indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--pk-color-gray-900);
        }

        .icon-check,
        .icon-indeterminate {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
        }

        .icon-check svg {
            width: 14px;
            height: 14px;
            transform: translateY(1px) scale(1.2);
        }

        .icon-indeterminate svg {
            width: 12px;
            height: 12px;
        }

        :host([checked]) .icon-check,
        .input:checked + .control .icon-check {
            opacity: 1;
        }

        :host([indeterminate]) .icon-check,
        .input:indeterminate + .control .icon-check {
            opacity: 0;
        }

        :host([indeterminate]) .icon-indeterminate,
        .input:indeterminate + .control .icon-indeterminate {
            opacity: 1;
        }
    }
`,d`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            /* Hit target is the content-sized .root label (Craft checkbox-select), not the host. */
            cursor: default;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .root {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: flex-start;
            gap: var(--pk-control-label-gap);
            /* Content-sized like Craft's <label> beside the checkbox — not full-row. */
            width: fit-content;
            max-width: 100%;
            margin: 0;
            min-height: 0;
            cursor: pointer;
            user-select: none;
            position: relative;
        }

        :host([disabled]) .root {
            cursor: not-allowed;
        }

        .root--with-hint {
            align-items: flex-start;
        }

        .input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
            opacity: 0;
            appearance: none;
        }

        .text {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            min-width: 0;
        }

        .label {
            line-height: max(1rem, var(--pk-checkbox-size));
            /* Match form-control / Craft body labels (gray-700), not gray-900. */
            color: var(--pk-color-gray-700);
            cursor: pointer;
        }

        :host([disabled]) .label {
            cursor: not-allowed;
        }

        :host(.all-option) .label {
            font-weight: 700;
        }

        .hint {
            margin: 0;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-font-size-sm);
            line-height: var(--pk-line-height);
        }

        .hint:empty {
            display: none;
        }
    }
`],G=class extends fr{constructor(...e){super(...e),this.assumeInteractionOn=[`change`],this.hasSlotController=new yr(this,`hint`),this.checked=!1,this.indeterminate=!1,this.disabled=!1,this.invalid=!1,this.checkboxValue=`on`,this.defaultChecked=!1,this.ariaLabel=null,this.hint=``,this.withHint=!1,this.hasDefaultSlotContent=!1}static{this.shadowRootOptions={mode:`open`,delegatesFocus:!0}}static{this.styles=Ho}static get validators(){return[...super.validators,mr({validationProperty:`checked`})]}get validationTarget(){return this.input}syncFormValue(){this.setFormValue(this.checked?this.checkboxValue:null,this.checked?`on`:`off`)}resetToDefaultValue(){this.checked=this.defaultChecked,this.indeterminate=!1}restoreFormState(e){this.checked=e===`on`||e===this.checkboxValue}updated(e){this.input&&(e.has(`checkboxValue`)&&this.syncFormValue(),(e.has(`indeterminate`)||e.has(`checked`))&&(this.input.indeterminate=this.indeterminate,this.input.checked=this.checked)),super.updated(e)}defaultSlotChanged(e){let t=e.target;this.hasDefaultSlotContent=t.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?e.textContent?.trim():e.nodeType===Node.ELEMENT_NODE)}handleChange(e){let t=e.target;this.checked=t.checked,this.indeterminate=!1,this.dispatchEvent(new CustomEvent(`pk-change`,{detail:{checked:this.checked},bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}render(){let e=this.hasDefaultSlotContent,t=!!this.hint||this.hasSlotController.test(`hint`,this.withHint);return E`
            <label
                part="base"
                class=${I({root:!0,"root--with-hint":t})}
            >
                <input
                    part="input"
                    class="input"
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    name=${this.name??O}
                    value=${this.checkboxValue}
                    aria-labelledby=${e?`label`:O}
                    aria-describedby=${t?`hint`:O}
                    aria-label=${e?O:this.ariaLabel??O}
                    aria-invalid=${this.invalid?`true`:O}
                    @change=${this.handleChange}
                />
                <span part="control" class="control">
                    <span part="checked-icon" class="icon-check">${Bo()}</span>
                    <span part="indeterminate-icon" class="icon-indeterminate">${Vo()}</span>
                </span>
                ${e||t?E`
                        <span class="text">
                            ${e?E`
                                    <span part="label" class="label" id="label">
                                        <slot @slotchange=${this.defaultSlotChanged}></slot>
                                    </span>
                                `:E`<slot @slotchange=${this.defaultSlotChanged} hidden></slot>`}
                            ${t?E`
                                    <span part="hint" class="hint" id="hint">
                                        <slot name="hint">${this.hint}</slot>
                                    </span>
                                `:O}
                        </span>
                    `:E`<slot @slotchange=${this.defaultSlotChanged} hidden></slot>`}
            </label>
        `}};j([M({type:Boolean,reflect:!0})],G.prototype,`checked`,void 0),j([M({type:Boolean,reflect:!0})],G.prototype,`indeterminate`,void 0),j([M({type:Boolean,reflect:!0})],G.prototype,`disabled`,void 0),j([M({type:Boolean,reflect:!0})],G.prototype,`invalid`,void 0),j([M()],G.prototype,`checkboxValue`,void 0),j([M({attribute:`default-checked`,type:Boolean})],G.prototype,`defaultChecked`,void 0),j([M({attribute:`aria-label`})],G.prototype,`ariaLabel`,void 0),j([M()],G.prototype,`hint`,void 0),j([M({type:Boolean,attribute:`with-hint`})],G.prototype,`withHint`,void 0),j([P(`.input`)],G.prototype,`input`,void 0),j([N()],G.prototype,`hasDefaultSlotContent`,void 0),G=j([k(`pk-checkbox`)],G);var Uo=[nt(),mo,d`
        @layer pk-component {
            :host {
                /* Flex column parents stretch cross-axis size — pin to content.
                   (inline-block + align-self; same class of fix as dialog / dropdown.) */
                display: inline-block;
                max-width: 100%;
                align-self: flex-start;
                flex: none;
                vertical-align: middle;
            }

            :host([data-pk-group-orientation]) {
                display: inline-flex;
                vertical-align: middle;
                flex: 0 0 auto;
                align-self: auto;
            }

            :host([data-pk-group-orientation]) ::slotted([slot='trigger']) {
                --pk-bg-start-start-radius: inherit;
                --pk-bg-start-end-radius: inherit;
                --pk-bg-end-start-radius: inherit;
                --pk-bg-end-end-radius: inherit;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]) {
                margin-inline-start: var(--pk-bg-horizontal-indent, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]) {
                margin-block-start: var(--pk-bg-vertical-indent, 0);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            /* Match pk-popup's arrow fill to the panel surface when with-arrow is on. */
            :host([with-arrow]) {
                --pk-popup-arrow-color: var(--pk-color-white);
                --pk-popup-arrow-size: 8px;
            }

            .panel {
                box-sizing: border-box;
                width: 18rem;
                padding: 1rem;
                border-radius: var(--pk-radius-md);
                background: var(--pk-color-white);
                box-shadow: var(--pk-shadow-popover);
                /* Craft CP body text (~gray-700), not gray-900. */
                color: var(--pk-color-gray-700);
            }

            /* Flush panels for command/menu chrome that owns its own inset (variable picker, etc.).
               Match kit v1 PopoverContent min-w 260px / max-w 360px: without min-width,
               width max-content shrinks to short labels and looks narrower than the old picker. */
            :host([flush]) .panel {
                width: max-content;
                min-width: var(--pk-popover-flush-min-width, 16.25rem);
                max-width: min(var(--pk-popover-flush-max-width, 22.5rem), 100vw - 1rem);
                padding: 0;
            }

            .panel[hidden] {
                display: none !important;
            }
        }
    `],K=class extends A{constructor(...e){super(...e),this.open=!1,this.label=``,this.placement=`bottom`,this.sideOffset=4,this.flush=!1,this.withArrow=!1,this.for=``,this.anchor=null,this.triggerElement=null,this.closing=!1,this.panelAnimated=!1,this.triggerId=_r(`pk-popover-trigger`),this.dismissRegistered=!1,this.syncingOpenSideEffects=!1,this.exitAnimationPromise=null,this.handleToggleClick=e=>{e.preventDefault(),e.stopPropagation(),!this.closing&&(this.open=!this.open)},this.onDocumentPointerDown=e=>{this.isPointerInside(e)||this.closing||this.closePopover(`light-dismiss`)},this.onDocumentKeyDown=e=>{e.key===`Escape`&&ni(this)&&!this.closing&&(e.preventDefault(),e.stopPropagation(),this.closePopover(`escape`))}}static{this.styles=Uo}get panelElement(){return this.popupElement?.getContentElement()??null}disconnectedCallback(){this.closePopover(`api`,!0),super.disconnectedCallback()}willUpdate(e){e.has(`open`)&&this.open===!1&&e.get(`open`)===!0&&!this.syncingOpenSideEffects&&!this.closing&&(this.closing=!0,this.panelAnimated=!1)}async updated(e){if(super.updated(e),!e.has(`open`)||this.syncingOpenSideEffects)return;let t=e.get(`open`);t!==this.open&&(t!==void 0||this.open!==!1)&&(this.open?await this.openPopover():await this.closePopover(`api`))}onTriggerSlotChange(e){let[t]=e.target.assignedElements({flatten:!0});this.unbindTrigger(this.triggerElement),this.triggerElement=t??null,this.bindTrigger(this.triggerElement)}bindTrigger(e){e&&(e.id||=this.triggerId,e.setAttribute(`aria-haspopup`,`dialog`),e.addEventListener(`click`,this.handleToggleClick),this.syncExpanded())}unbindTrigger(e){e?.removeEventListener(`click`,this.handleToggleClick)}async openPopover(){if(!this.getAnchor())return;if(this.exitAnimationPromise&&await this.exitAnimationPromise,this.dismissRegistered&&this.open){this.panelElement&&(this.panelElement.hidden=!1),this.syncExpanded();return}if(!this.dispatchEvent(new oo)){this.syncingOpenSideEffects=!0,this.open=!1,this.syncingOpenSideEffects=!1;return}this.syncingOpenSideEffects=!0,this.open=!0,this.syncingOpenSideEffects=!1,this.closing=!1,this.panelAnimated=!1,this.panelElement&&(this.panelElement.hidden=!1,ai(this.panelElement,this.placement)),this.syncExpanded(),this.registerDismissHandlers(),await this.updateComplete;let e=await oi(this.popupElement,this.placement,300,{requireEvent:!0});this.panelElement&&ai(this.panelElement,e),this.panelAnimated=!0,this.dispatchEvent(new so),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!0},bubbles:!0,composed:!0}))}async closePopover(e=`unknown`,t=!1){if(this.exitAnimationPromise)return this.exitAnimationPromise;if(!this.dismissRegistered&&!this.closing&&!this.open)return;let n=new co(e);if(!this.dispatchEvent(n)){this.syncingOpenSideEffects=!0,this.open=!0,this.syncingOpenSideEffects=!1,this.closing=!1,this.panelAnimated=!0;return}this.unregisterDismissHandlers(),this.closing=!0,this.panelAnimated=!1,this.open&&(this.syncingOpenSideEffects=!0,this.open=!1,this.syncingOpenSideEffects=!1);let r=async()=>{t||(await this.updateComplete,await this.waitForExitAnimation());let n=!t&&e!==`light-dismiss`&&this.isConnected&&([...hr()].some(e=>this.contains(e)||this.panelElement?.contains(e))||(e===`close-button`||e===`escape`)&&document.activeElement===document.body);this.closing=!1,this.panelAnimated=!1,this.panelElement&&(this.panelElement.hidden=!0,this.panelElement.removeAttribute(`data-side`)),this.syncExpanded(),n&&this.getAnchorElement()?.focus({preventScroll:!0}),this.dispatchEvent(new lo),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!1},bubbles:!0,composed:!0}))};return this.exitAnimationPromise=r().finally(()=>{this.exitAnimationPromise=null}),this.exitAnimationPromise}waitForExitAnimation(){let e=this.panelElement;return e?new Promise(t=>{let n=!1,r=()=>{n||(n=!0,e.removeEventListener(`animationend`,i),window.clearTimeout(a),e.classList.remove(`closing`),t())},i=t=>{t.target===e&&t.animationName.startsWith(`pk-popup-content-out`)&&r()};e.classList.add(`closing`),e.addEventListener(`animationend`,i);let a=window.setTimeout(r,150)}):Promise.resolve()}getAnchor(){return this.anchor?this.anchor:this.for?eo(this,this.for):this.triggerElement?this.triggerElement:null}registerDismissHandlers(){this.dismissRegistered||(ei(this),this.dismissRegistered=!0,document.addEventListener(`pointerdown`,this.onDocumentPointerDown,!0),document.addEventListener(`keydown`,this.onDocumentKeyDown,!0))}unregisterDismissHandlers(){this.dismissRegistered&&=(ti(this),!1),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!0),document.removeEventListener(`keydown`,this.onDocumentKeyDown,!0)}isPointerInside(e){return po(e,{host:this,anchor:this.getAnchorElement(),panel:this.panelElement})}getAnchorElement(){return this.anchor instanceof HTMLElement?this.anchor:this.triggerElement?this.triggerElement:this.for?eo(this,this.for):null}syncExpanded(){this.triggerElement?.setAttribute(`aria-expanded`,this.open?`true`:`false`)}render(){let e=this.getAnchor();return E`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <pk-popup
                .active=${this.open||this.closing}
                .anchor=${e??``}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                .arrow=${this.withArrow}
                flip
                shift
            >
                <div
                    part="panel"
                    role="dialog"
                    aria-label=${this.label||this.triggerElement?.getAttribute(`aria-label`)||this.triggerElement?.textContent?.trim()||O}
                    class=${I({panel:!0,"pk-popup-content":!0,closing:this.closing})}
                    ?hidden=${!this.open&&!this.closing}
                    data-open=${this.panelAnimated&&!this.closing?``:O}
                    tabindex=${this.open?`-1`:O}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `}};j([M({type:Boolean,reflect:!0})],K.prototype,`open`,void 0),j([M()],K.prototype,`label`,void 0),j([M({reflect:!0})],K.prototype,`placement`,void 0),j([M({attribute:`side-offset`,type:Number})],K.prototype,`sideOffset`,void 0),j([M({type:Boolean,reflect:!0})],K.prototype,`flush`,void 0),j([M({attribute:`with-arrow`,type:Boolean,reflect:!0})],K.prototype,`withArrow`,void 0),j([M({reflect:!0})],K.prototype,`for`,void 0),j([M({attribute:!1})],K.prototype,`anchor`,void 0),j([P(`pk-popup`)],K.prototype,`popupElement`,void 0),j([N()],K.prototype,`triggerElement`,void 0),j([N()],K.prototype,`closing`,void 0),j([N()],K.prototype,`panelAnimated`,void 0),K=j([k(`pk-popover`)],K);var Wo=d`
    @layer pk-component {
        :host {
            display: inline-flex;
            width: fit-content;
            vertical-align: middle;
        }

        .group {
            display: flex;
            position: relative;
            isolation: isolate;
            flex-wrap: nowrap;
            gap: 0;
            width: fit-content;
            max-width: 100%;
            align-items: stretch;
        }

        :host([orientation='horizontal']) .group {
            flex-direction: row;
        }

        :host([orientation='vertical']) .group {
            flex-direction: column;
            align-items: stretch;
        }

        :host([orientation='vertical']) ::slotted(pk-button),
        :host([orientation='vertical']) ::slotted(pk-toggle),
        :host([orientation='vertical']) ::slotted(pk-input),
        :host([orientation='vertical']) ::slotted(pk-input-group),
        :host([orientation='vertical']) ::slotted(.button-group-text),
        :host([orientation='vertical']) ::slotted(select.button-group-select) {
            align-self: stretch;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        @media (hover: hover) {
            .group > :hover,
            ::slotted(:hover) {
                z-index: 1;
            }
        }

        .group > :focus-visible,
        ::slotted(:focus-visible),
        ::slotted(:focus-within),
        ::slotted([aria-checked='true']),
        ::slotted([checked]) {
            position: relative;
            z-index: 2;
        }

        /* Flush join: filled controls sit edge-to-edge; outlined controls overlap 1px to collapse borders */
        :host([orientation='horizontal']) {
            --pk-bg-horizontal-indent: 0;
            --pk-bg-horizontal-indent-outlined: -1px;
            --pk-btn-group-gap: 1px;
            --pk-btn-group-divider-color-outline: var(--pk-color-slate-400);
            --pk-btn-group-divider-color-dashed: var(--pk-color-slate-500);
        }

        :host([orientation='vertical']) {
            --pk-bg-vertical-indent: 0;
            --pk-bg-vertical-indent-outlined: -1px;
            --pk-btn-group-gap: 1px;
            --pk-btn-group-divider-color-outline: var(--pk-color-slate-400);
            --pk-btn-group-divider-color-dashed: var(--pk-color-slate-500);
        }

        :host([separators][orientation='horizontal']) {
            --pk-bg-horizontal-indent: 0;
        }

        :host([separators][orientation='vertical']) {
            --pk-bg-vertical-indent: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-end-start-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
        }

        :host([exclusive]) ::slotted(pk-button[aria-pressed='true']) {
            --pk-btn-fill: var(--pk-color-gray-500);
            --pk-btn-fill-hover: var(--pk-color-gray-550);
            --pk-btn-fill-active: var(--pk-color-gray-600);
            --pk-btn-on: var(--pk-color-white);
        }

        :host:has(::slotted(pk-button-group-separator)) {
            --pk-btn-group-separator-color: transparent;
        }

        ::slotted(pk-input),
        ::slotted(pk-input-group) {
            width: auto;
            flex: 0 1 auto;
            align-self: stretch;
        }

        ::slotted(pk-popover),
        ::slotted(pk-dropdown-menu) {
            display: inline-flex;
            align-self: auto;
            flex: 0 0 auto;
        }

        ::slotted(.button-group-text) {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-height: var(--pk-btn-height-default);
            padding: 0 0.625rem;
            border-width: 1px;
            border-style: solid;
            border-color: var(--pk-color-slate-400);
            background: var(--pk-color-gray-100);
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-sm);
            font-weight: 500;
            line-height: var(--pk-line-height);
            box-sizing: border-box;
            white-space: nowrap;
            border-top-left-radius: var(--pk-bg-start-start-radius, var(--pk-radius-lg));
            border-top-right-radius: var(--pk-bg-start-end-radius, var(--pk-radius-lg));
            border-bottom-left-radius: var(--pk-bg-end-start-radius, var(--pk-radius-lg));
            border-bottom-right-radius: var(--pk-bg-end-end-radius, var(--pk-radius-lg));
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider]).button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])pk-input-group) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            border-left-width: 0;
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider]).button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])pk-input-group) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            border-top-width: 0;
        }

        ::slotted(select.button-group-select) {
            display: block;
            margin: 0;
            padding: 0 10px;
            border-width: 1px;
            border-style: solid;
            border-color: var(--pk-color-slate-400);
            background: var(--pk-color-white);
            color: var(--pk-color-gray-900);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: 1.4;
            appearance: none;
            box-sizing: border-box;
            align-self: stretch;
            min-height: var(--pk-btn-height-default);
            height: var(--pk-btn-height-default);
            border-top-left-radius: var(--pk-bg-start-start-radius, var(--pk-radius-lg));
            border-top-right-radius: var(--pk-bg-start-end-radius, var(--pk-radius-lg));
            border-bottom-left-radius: var(--pk-bg-end-start-radius, var(--pk-radius-lg));
            border-bottom-right-radius: var(--pk-bg-end-end-radius, var(--pk-radius-lg));
        }

        ::slotted(pk-separator) {
            align-self: stretch;
        }

        ::slotted(pk-separator[orientation='vertical']),
        ::slotted(pk-button-group-separator) {
            height: auto;
            flex-shrink: 0;
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join].button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]pk-input-group) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join].button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]pk-input-group) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([orientation='horizontal']) ::slotted(.button-group-text[data-pk-group-divider]),
        :host([orientation='horizontal']) ::slotted(select.button-group-select[data-pk-group-divider]),
        :host([orientation='horizontal']) ::slotted(pk-input-group[data-pk-group-divider]) {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            box-shadow: none;
        }

        :host([orientation='vertical']) ::slotted(.button-group-text[data-pk-group-divider]),
        :host([orientation='vertical']) ::slotted(select.button-group-select[data-pk-group-divider]),
        :host([orientation='vertical']) ::slotted(pk-input-group[data-pk-group-divider]) {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            box-shadow: none;
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail].button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail].button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail]select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail]pk-input-group) {
            border-right-width: 0;
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail].button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail].button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail]select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail]pk-input-group) {
            border-bottom-width: 0;
        }
    }
`,Go=`data-pk-group-join`,Ko=`data-pk-group-divider`,qo=`data-pk-group-item-first`,Jo=`data-pk-group-item-last`,Yo=`data-pk-group-internal-trail`,Xo=`data-pk-group-btn-last`,Zo=`data-pk-group-orientation`,Qo=new Set([`PK-SEPARATOR`,`PK-BUTTON-GROUP-SEPARATOR`]),$o=new Set([`PK-POPOVER`,`PK-DROPDOWN-MENU`]),es={fromAttribute(e){return e===null||e!==`false`},toAttribute(e){return e?``:`false`}};function ts(e){return Qo.has(e.tagName)}function ns(e){return $o.has(e.tagName)?e.querySelector(`[slot="trigger"]`)??e:e}function rs(e){if($o.has(e.tagName)){let t=ns(e);return t===e?[e]:[e,t]}return[e]}function is(e,t){return e===t?[e]:[e,t]}function as(e){let t=ns(e);return[...new Set([...rs(e),...is(e,t)])]}function os(e){for(let t of as(e))t.removeAttribute(Go),t.removeAttribute(Ko),t.removeAttribute(qo),t.removeAttribute(Jo),t.removeAttribute(Yo),t.removeAttribute(Xo),t.removeAttribute(Zo)}function ss(e){return ns(e).hasAttribute(`group-trigger`)||e.hasAttribute(`group-trigger`)}function cs(e){let t=[],n=[];for(let r of e)ts(r)?(n.length&&t.push(n),n=[]):n.push(r);return n.length&&t.push(n),t}var ls=class extends A{constructor(...e){super(...e),this.orientation=`horizontal`,this.separators=!0,this.exclusive=!1,this.label=``}static{this.styles=Wo}firstUpdated(){this.scheduleSyncGroupLayout()}updated(e){e.has(`orientation`)&&(this.setAttribute(`aria-orientation`,this.orientation),this.scheduleSyncGroupLayout()),e.has(`label`)&&(this.label?this.setAttribute(`aria-label`,this.label):this.removeAttribute(`aria-label`)),(e.has(`separators`)||e.has(`exclusive`))&&this.scheduleSyncGroupLayout()}scheduleSyncGroupLayout(){this.syncGroupLayout(),queueMicrotask(()=>this.syncGroupLayout())}handleSlotChange(){this.scheduleSyncGroupLayout()}syncGroupLayout(){let e=this.defaultSlot?.assignedElements({flatten:!0})??[],t=cs(e);for(let t of e)os(t);for(let t of e)for(let e of as(t))e.setAttribute(Zo,this.orientation);for(let e=0;e<t.length;e++){let n=t[e],r=e===0,i=e===t.length-1;for(let e=0;e<n.length;e++){let t=n[e],a=ns(t),o=is(t,a),s=n.length===1,c=e===0,l=e===n.length-1;for(let e of o)s?(r&&e.setAttribute(qo,``),i&&e.setAttribute(Jo,``)):(c&&e.setAttribute(qo,``),l&&e.setAttribute(Jo,``));if(c){if(this.separators&&!l)for(let e of rs(t))e.setAttribute(Yo,``)}else{for(let e of rs(t))e.setAttribute(Go,``),this.separators&&e.setAttribute(Ko,``);if(this.separators&&!l)for(let e of rs(t))e.setAttribute(Yo,``);ss(t)&&a.setAttribute(Xo,``)}}}}render(){return E`
            <div part="base" class="group" role="group" aria-label=${this.label||O}>
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `}};j([M({reflect:!0})],ls.prototype,`orientation`,void 0),j([M({type:Boolean,reflect:!0,converter:es})],ls.prototype,`separators`,void 0),j([M({type:Boolean,reflect:!0})],ls.prototype,`exclusive`,void 0),j([M()],ls.prototype,`label`,void 0),j([P(`slot:not([name])`)],ls.prototype,`defaultSlot`,void 0),ls=j([k(`pk-button-group`)],ls);var us={default:d`
        --pk-dropdown-item-padding-block: 8px;
        --pk-dropdown-item-padding-inline: 12px;
        --pk-dropdown-item-gap: 0.625rem;
        --pk-dropdown-item-font-size: var(--pk-font-size-base);
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 12px;
        --pk-dropdown-label-font-size: 13px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,xs:d`
        --pk-dropdown-item-padding-block: 3px;
        --pk-dropdown-item-padding-inline: 8px;
        --pk-dropdown-item-gap: 0.375rem;
        --pk-dropdown-item-font-size: 12px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 10px;
        --pk-dropdown-label-padding-inline: 8px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 11px;
    `,sm:d`
        --pk-dropdown-item-padding-block: 4px;
        --pk-dropdown-item-padding-inline: 10px;
        --pk-dropdown-item-gap: 0.4375rem;
        --pk-dropdown-item-font-size: 13px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 10px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 12px;
    `,lg:d`
        --pk-dropdown-item-padding-block: 10px;
        --pk-dropdown-item-padding-inline: 14px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 16px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 14px;
        --pk-dropdown-label-padding-inline: 14px;
        --pk-dropdown-label-font-size: 14px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,xl:d`
        --pk-dropdown-item-padding-block: 12px;
        --pk-dropdown-item-padding-inline: 16px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 18px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 16px;
        --pk-dropdown-label-padding-inline: 16px;
        --pk-dropdown-label-font-size: 15px;
        --pk-dropdown-details-font-size: var(--pk-font-size-base);
    `},ds=d`
    @layer pk-component {
        :host {
            ${us.default}
        }

        :host([size='xs']) {
            ${us.xs}
        }

        :host([size='sm']) {
            ${us.sm}
        }

        :host([size='lg']) {
            ${us.lg}
        }

        :host([size='xl']) {
            ${us.xl}
        }
    }
`,fs=d`
    @layer pk-component {
        .panel[data-size='default'],
        .submenu-panel[data-size='default'] {
            ${us.default}
        }

        .panel[data-size='xs'],
        .submenu-panel[data-size='xs'] {
            ${us.xs}
        }

        .panel[data-size='sm'],
        .submenu-panel[data-size='sm'] {
            ${us.sm}
        }

        .panel[data-size='lg'],
        .submenu-panel[data-size='lg'] {
            ${us.lg}
        }

        .panel[data-size='xl'],
        .submenu-panel[data-size='xl'] {
            ${us.xl}
        }
    }
`;d`
    ${ds}
    ${fs}
`;var ps=[mo,fs,d`
    @layer pk-component {
        :host {
            display: block;
            position: relative;
            /*
             * Slotted label text inherits from this host (light DOM), not from
             * shadow .item — pin size-token metrics so Craft CP / Tailwind /
             * bare hosts all get the same item rhythm.
             */
            font-size: var(--pk-dropdown-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-dropdown-item-line-height, 1.5);
            color: var(--text-color, var(--pk-color-gray-700));
        }

        .item {
            display: flex;
            align-items: center;
            gap: var(--pk-dropdown-item-gap, 0.625rem);
            width: 100%;
            margin: 0;
            padding: var(--pk-dropdown-item-padding-block, 8px) var(--pk-dropdown-item-padding-inline, 12px);
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            font-size: var(--pk-dropdown-item-font-size, var(--pk-font-size-base));
            /* Explicit — do not let font:inherit re-leak page line-height. */
            line-height: var(--pk-dropdown-item-line-height, 1.5);
            font-weight: normal;
            text-align: left;
            white-space: nowrap;
            cursor: default;
            user-select: none;
            outline: none;
            box-sizing: border-box;
        }

        .item:hover:not([disabled]):not([aria-disabled='true']),
        :host([data-highlighted]) .item,
        :host([submenu-open]) .item {
            background: var(--pk-color-slate-100);
        }

        .item:focus-visible {
            background: var(--pk-color-slate-100);
        }

        .item[aria-disabled='true'] {
            pointer-events: none;
            opacity: 0.5;
        }

        .label {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .prefix {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-dropdown-item-icon-size, 12px);
            height: var(--pk-dropdown-item-icon-size, 12px);
            line-height: 0;
        }

        .prefix--empty {
            display: none;
        }

        .prefix ::slotted(*) {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-dropdown-item-icon-size, 12px);
            height: var(--pk-dropdown-item-icon-size, 12px);
            /* Kill pk-icon text-baseline nudge inside the padded flex row. */
            vertical-align: 0;
        }

        .prefix ::slotted(svg),
        .prefix ::slotted(*) svg,
        .prefix ::slotted(.pk-dropdown-item__prefix-icon) {
            display: block;
            width: var(--pk-dropdown-item-icon-size, 12px) !important;
            height: var(--pk-dropdown-item-icon-size, 12px) !important;
            max-width: var(--pk-dropdown-item-icon-size, 12px);
            max-height: var(--pk-dropdown-item-icon-size, 12px);
            flex-shrink: 0;
            pointer-events: none;
        }

        .details {
            margin-left: auto;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-dropdown-details-font-size, var(--pk-font-size-sm));
            letter-spacing: 0.04em;
        }

        .details:empty {
            display: none;
        }

        .check {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            color: var(--pk-color-gray-700);
        }

        .check svg {
            display: block;
            width: 12px;
            height: 12px;
            flex-shrink: 0;
            pointer-events: none;
        }

        .submenu-icon {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: 1rem;
            color: var(--pk-color-gray-700);
        }

        .submenu-icon svg {
            display: block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
            pointer-events: none;
        }

        .check {
            opacity: 0;
        }

        :host([checked]) .check {
            opacity: 1;
        }

        :host([type='checkbox']) .check,
        :host([type='radio']) .check {
            margin-left: auto;
        }

        :host([type='checkbox'][checked]) .check,
        :host([type='radio'][checked]) .check {
            opacity: 1;
        }

        .submenu-icon:empty {
            display: none;
        }

        :host([destructive]) .item {
            color: var(--pk-color-error);
        }

        :host([destructive]) .item:hover:not([disabled]):not([aria-disabled='true']),
        :host([destructive]) .item:focus-visible {
            color: var(--pk-color-error);
        }

        .submenu-panel {
            width: max-content;
            min-width: 8rem;
            max-height: var(--pk-popup-available-height, calc(100dvh - 20px));
            overflow: auto;
            overscroll-behavior: contain;
            padding: 4px 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
            /* Match root menu panel — Craft body text, not gray-900. */
            color: var(--text-color, var(--pk-color-gray-700));
        }

        .submenu-panel ::slotted(pk-dropdown-item),
        .submenu-panel ::slotted(pk-dropdown-separator),
        .submenu-panel ::slotted(pk-dropdown-label) {
            display: block;
        }

        .submenu-panel[hidden] {
            display: none !important;
        }
    }
`],ms,hs=z(Ot),gs=z(jt),q=class extends A{static{ms=this}constructor(...e){super(...e),this.value=``,this.type=`normal`,this.radioGroup=``,this.disabled=!1,this.destructive=!1,this.checked=!1,this.submenuOpen=!1,this.active=!1,this.submenuAnimated=!1,this.hasSlotController=new yr(this,`submenu`,`details`,`start`,`prefix`),this.handleMouseEnter=()=>{this.hasSubmenu()&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)},this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.styles=ps}connectedCallback(){super.connectedCallback(),this.syncRole(),this.syncSubmenuAria(),this.addEventListener(`click`,this.handleHostClick),this.addEventListener(`mouseenter`,this.handleMouseEnter)}disconnectedCallback(){this.removeEventListener(`click`,this.handleHostClick),this.removeEventListener(`mouseenter`,this.handleMouseEnter),this.closeSubmenu(),super.disconnectedCallback()}updated(e){(e.has(`type`)||e.has(`checked`))&&this.syncRole(),(e.has(`submenuOpen`)||e.size===0)&&this.syncSubmenuAria(),e.has(`submenuOpen`)&&(this.submenuOpen?this.ensureSubmenuSurface():this.submenuAnimated=!1)}hasSubmenu(){return this.hasSlotController.test(`submenu`)}syncSubmenuAria(){let e=this.hasSubmenu();e?this.setAttribute(`aria-haspopup`,`menu`):this.removeAttribute(`aria-haspopup`),this.setAttribute(`aria-expanded`,e&&this.submenuOpen?`true`:`false`)}focusControl(){this.shadowRoot?.querySelector(`.item`)?.focus({preventScroll:!0})}focus(e){let t=this.shadowRoot?.querySelector(`.item`);t?t.focus(e):super.focus(e)}get submenuElement(){return this.submenuPanelElement??null}closeSubmenu(){this.submenuAnimated=!1,this.submenuOpen=!1}openSubmenu(){this.hasSubmenu()&&!this.disabled&&this.isConnected&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}notifyParentOfOpening(){this.dispatchEvent(new CustomEvent(`pk-submenu-open`,{bubbles:!0,composed:!0,detail:{item:this}}));let e=this.parentElement;if(e)for(let t of e.children)t!==this&&t instanceof ms&&t.getAttribute(`slot`)===this.getAttribute(`slot`)&&t.submenuOpen&&(t.submenuOpen=!1)}ensureSubmenuSurface(){this.hasSubmenu()&&!this.disabled&&(this.submenuAnimated=!0,this.updateComplete.then(()=>{this.submenuOpen&&this.submenuPanelElement&&(this.submenuPanelElement.hidden=!1,ai(this.submenuPanelElement,`right-start`),oi(this.submenuPopupElement,`right-start`).then(e=>{ai(this.submenuPanelElement,e)}))}))}syncRole(){this.type===`checkbox`?(this.setAttribute(`role`,`menuitemcheckbox`),this.setAttribute(`aria-checked`,this.checked?`true`:`false`)):this.type===`radio`?(this.setAttribute(`role`,`menuitemradio`),this.setAttribute(`aria-checked`,this.checked?`true`:`false`)):(this.setAttribute(`role`,`menuitem`),this.removeAttribute(`aria-checked`))}handleClick(e){this.disabled?(e.preventDefault(),e.stopImmediatePropagation()):this.hasSubmenu()&&(e.preventDefault(),this.openSubmenu())}render(){let e=this.hasSubmenu(),t=this.type===`checkbox`||this.type===`radio`,n=this.hasSlotController.test(`start`)||this.hasSlotController.test(`prefix`);return E`
            <button
                part="item"
                type="button"
                class="item"
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled?`true`:O}
                @click=${this.handleClick}
            >
                <span
                    part="prefix"
                    class=${n?`prefix`:`prefix prefix--empty`}
                >
                    <slot name="start"></slot>
                    <slot name="prefix"></slot>
                </span>
                <span part="label" class="label"><slot></slot></span>
                <span class="details"><slot name="details"></slot></span>
                ${t?E`<span part="check" class="check" aria-hidden="true">${ut(hs)}</span>`:O}
                ${e?E`<span class="submenu-icon" aria-hidden="true">${ut(gs)}</span>`:O}
            </button>
            ${e?E`
                <pk-popup
                    .active=${this.submenuOpen}
                    .anchor=${this}
                    placement="right-start"
                    .distance=${0}
                    .skidding=${-4}
                    flip
                    shift
                    auto-size="vertical"
                    .autoSizePadding=${10}
                    hover-bridge
                    style="--pk-popup-z-index: 1001"
                >
                    <div
                        part="submenu"
                        class="submenu-panel pk-popup-content"
                        role="menu"
                        data-size=${_s(this)}
                        ?hidden=${!this.submenuOpen}
                        data-open=${this.submenuAnimated?``:O}
                        aria-orientation="vertical"
                    >
                        <slot name="submenu"></slot>
                    </div>
                </pk-popup>
            `:O}
        `}};j([M()],q.prototype,`value`,void 0),j([M({reflect:!0})],q.prototype,`type`,void 0),j([M({attribute:`radio-group`})],q.prototype,`radioGroup`,void 0),j([M({type:Boolean,reflect:!0})],q.prototype,`disabled`,void 0),j([M({type:Boolean,reflect:!0})],q.prototype,`destructive`,void 0),j([M({type:Boolean,reflect:!0})],q.prototype,`checked`,void 0),j([M({attribute:`submenu-open`,type:Boolean,reflect:!0})],q.prototype,`submenuOpen`,void 0),j([M({type:Boolean})],q.prototype,`active`,void 0),j([N()],q.prototype,`submenuAnimated`,void 0),j([P(`.submenu-panel`)],q.prototype,`submenuPanelElement`,void 0),j([P(`pk-popup`)],q.prototype,`submenuPopupElement`,void 0),q=ms=j([k(`pk-dropdown-item`)],q);function _s(e){let t=e.parentElement?.getAttribute(`data-size`);if(t===`xs`||t===`sm`||t==="default"||t===`lg`||t===`xl`)return t;let n=e.closest(`pk-dropdown-menu`)?.getAttribute(`size`);return n===`xs`||n===`sm`||n===`lg`||n===`xl`?n:`default`}function vs(e,t,n=500){return new Promise(r=>{let i=new AbortController,{signal:a}=i;if(e.classList.contains(t)){r();return}e.classList.add(t);let o=!1,s=()=>{o||(o=!0,e.classList.remove(t),window.clearTimeout(c),r(),i.abort())};e.addEventListener(`animationend`,s,{once:!0,signal:a}),e.addEventListener(`animationcancel`,s,{once:!0,signal:a});let c=window.setTimeout(s,n);requestAnimationFrame(()=>{!o&&e.getAnimations().length===0&&s()})})}var ys=[nt(),ds,fs,d`
        @layer pk-component {
            /* Standalone: keep a real box so the trigger is not a flex-stretched
               child of the page (display:contents flattened pk-button to full card width).
               Button groups override below — same as legacy + React MenuButton inline-flex wrap. */
            :host {
                display: inline-block;
                position: relative;
                width: fit-content;
                max-width: 100%;
                align-self: flex-start;
                vertical-align: middle;
            }

            :host([data-pk-group-orientation]) {
                display: inline-flex;
                vertical-align: middle;
                flex: 0 0 auto;
                width: auto;
                max-width: none;
                align-self: auto;
            }

            /* Belt-and-suspenders if a parent still flattens layout onto the trigger. */
            ::slotted([slot='trigger']) {
                width: fit-content;
                max-width: 100%;
                flex: 0 0 auto;
                align-self: flex-start;
            }

            :host([data-pk-group-orientation]) ::slotted([slot='trigger']) {
                --pk-bg-start-start-radius: inherit;
                --pk-bg-start-end-radius: inherit;
                --pk-bg-end-start-radius: inherit;
                --pk-bg-end-end-radius: inherit;
                align-self: auto;
                max-width: none;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]) {
                margin-inline-start: var(--pk-bg-horizontal-indent, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]) {
                margin-block-start: var(--pk-bg-vertical-indent, 0);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            /* Menu panel — hug content; do not stretch to trigger/anchor width. */
            .panel {
                display: flex;
                flex-direction: column;
                width: max-content;
                min-width: 8rem;
                max-height: var(--pk-popup-available-height, calc(100dvh - 20px));
                margin: 0;
                overflow: auto;
                overscroll-behavior: contain;
                padding: 4px 0;
                border: 0;
                border-radius: var(--pk-radius-md);
                background: var(--pk-color-white);
                box-shadow: var(--pk-shadow-popup);
                /* v1 DropdownMenuItem had no face color — inherited Craft body
                 * (--text-color ≈ gray-700). Do not force gray-900 (too dark). */
                color: var(--text-color, var(--pk-color-gray-700));
                outline: none;
                text-align: start;
                user-select: none;
                /* Match v1 Base UI: popup writes --pk-transform-origin from the
                 * anchor center on the connecting edge (e.g. top-right for
                 * bottom-end). Keyword edge centers made end-aligned menus
                 * scale from the middle of the panel. */
                transform-origin: var(--pk-transform-origin, top);
            }

            .panel.show {
                animation: pk-dropdown-menu-show 100ms ease;
            }

            .panel.hide {
                animation: pk-dropdown-menu-show 100ms ease reverse;
            }

            .panel[hidden] {
                display: none !important;
            }

            ::slotted(pk-dropdown-item),
            ::slotted(pk-dropdown-separator),
            ::slotted(pk-dropdown-label),
            .panel > pk-dropdown-item,
            .panel > pk-dropdown-separator,
            .panel > pk-dropdown-label {
                display: block;
            }

            ::slotted([data-menu-item]) {
                display: flex;
                align-items: center;
                gap: 0.625rem;
                width: 100%;
                margin: 0;
                padding: 8px 12px;
                border: 0;
                background: transparent;
                color: inherit;
                font: inherit;
                font-size: var(--pk-font-size-base);
                text-align: left;
                white-space: nowrap;
                cursor: default;
                user-select: none;
                outline: none;
                box-sizing: border-box;
            }

            ::slotted([data-menu-item]:hover:not([disabled])) {
                background: var(--pk-color-slate-100);
            }

            ::slotted([data-menu-item]:focus-visible) {
                background: var(--pk-color-slate-100);
            }

            ::slotted([data-menu-item][disabled]) {
                pointer-events: none;
                opacity: 0.5;
            }

            ::slotted(pk-dropdown-item[destructive]),
            ::slotted([data-destructive]) {
                color: var(--pk-color-error);
            }

            ::slotted([data-menu-separator]) {
                display: block;
                height: 1px;
                margin: 4px 0;
                background: var(--pk-color-slate-200);
                border: 0;
                padding: 0;
            }
        }

        /* Outside @layer so constructed stylesheets resolve the name reliably. */
        @keyframes pk-dropdown-menu-show {
            from {
                scale: 0.9;
                opacity: 0;
            }

            to {
                scale: 1;
                opacity: 1;
            }
        }
    `],bs=new Set,J=class extends A{constructor(...e){super(...e),this.open=!1,this.size=`default`,this.placement=`bottom-start`,this.sideOffset=4,this.distance=4,this.skidding=0,this.for=``,this.userTypedQuery=``,this.userTypedTimeout=0,this.openSubmenuStack=[],this.openedByKeyboard=!1,this.triggerElement=null,this.handleMenuClick=e=>{let t=this.resolveMenuItem(e);t&&!t.disabled&&(t.hasSubmenu()?(t.submenuOpen||(this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),t.openSubmenu()),e.stopPropagation()):this.makeSelection(t))},this.handleSubmenuOpening=e=>{let t=e.detail?.item;t instanceof q&&(this.closeSiblingSubmenus(t),this.addToSubmenuStack(t))},this.handleGlobalMouseMove=e=>{let t=this.getCurrentSubmenuItem();if(!t?.submenuOpen||!t.submenuElement)return;let n=t.submenuElement,r=e.composedPath(),i=t.matches(`:hover`),a=!!n.matches(`:hover`),o=i||r.some(e=>e===t),s=a||r.some(e=>e instanceof HTMLElement&&e.closest(`[part="submenu"]`)===n);!o&&!s&&window.setTimeout(()=>{!i&&!a&&(t.submenuOpen=!1)},100)},this.handleTriggerClick=e=>{let t=this.getTrigger();t&&e.composedPath().includes(t)&&(e.preventDefault(),e.stopPropagation(),this.openedByKeyboard=!1,this.open=!this.open)},this.handleExternalTriggerClick=e=>{e.preventDefault(),e.stopPropagation(),this.openedByKeyboard=!1,this.open=!this.open},this.handleTriggerKeyDown=e=>{let t=this.getTrigger();t&&e.composedPath().includes(t)&&(this.open||(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),e.stopPropagation(),this.openedByKeyboard=!0,this.open=!0))},this.handleDocumentKeyDown=e=>{let t=this.isRtl();if(e.key===`Escape`&&this.open&&ni(this)){e.preventDefault(),e.stopPropagation(),this.open=!1,this.getTrigger()?.focus({preventScroll:!0});return}if(!this.open)return;let n=[...hr()].find(e=>e.localName===`pk-dropdown-item`),r=n?.localName===`pk-dropdown-item`,i=this.getCurrentSubmenuItem(),a=!!i,o,s,c;a&&i?(o=this.getSubmenuItems(i),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1):(o=this.getItems(),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1);let l;if(e.key===`ArrowUp`&&(e.preventDefault(),e.stopPropagation(),l=c>0?o[c-1]:o[o.length-1]),e.key===`ArrowDown`&&(e.preventDefault(),e.stopPropagation(),l=c!==-1&&c<o.length-1?o[c+1]:o[0]),e.key===(t?`ArrowLeft`:`ArrowRight`)&&r&&s&&s.hasSubmenu())e.preventDefault(),e.stopPropagation(),this.closeSiblingSubmenus(s),s.openSubmenu(),this.addToSubmenuStack(s),window.setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&this.setActiveItem(e,e[0])},0);else if(e.key===(t?`ArrowRight`:`ArrowLeft`)&&a){e.preventDefault(),e.stopPropagation();let t=this.removeFromSubmenuStack();t&&(t.submenuOpen=!1,window.setTimeout(()=>{t.focus({preventScroll:!0}),t.active=!0,(t.slot===`submenu`&&t.parentElement instanceof q?this.getSubmenuItems(t.parentElement):this.getItems()).forEach(e=>{e!==t&&(e.active=!1)})},0))}else if((e.key===`Home`||e.key===`End`)&&(e.preventDefault(),e.stopPropagation(),l=e.key===`Home`?o[0]:o[o.length-1]),e.key===`Tab`)this.open=!1;else{if(e.key.length===1&&!(e.metaKey||e.ctrlKey||e.altKey)&&(e.key!==` `||this.userTypedQuery!==``)){window.clearTimeout(this.userTypedTimeout),this.userTypedTimeout=window.setTimeout(()=>{this.userTypedQuery=``},1e3),this.userTypedQuery+=e.key;let t=this.userTypedQuery.trim().toLowerCase();l=o.find(e=>(e.textContent||``).trim().toLowerCase().startsWith(t))}l?(e.preventDefault(),e.stopPropagation(),this.setActiveItem(o,l)):(e.key===`Enter`||e.key===` `&&this.userTypedQuery===``)&&r&&s&&(e.preventDefault(),e.stopPropagation(),s.hasSubmenu()?(this.closeSiblingSubmenus(s),s.openSubmenu(),this.addToSubmenuStack(s),window.setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&this.setActiveItem(e,e[0])},0)):this.makeSelection(s))}},this.handleDocumentPointerDown=e=>{let t=e.composedPath(),n=this.getTrigger();t.some(e=>e===this||e===n)||(this.open=!1)}}static{this.styles=ys}get panelElement(){return this.menuElement??null}get popup(){return this.popupElement??null}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleTriggerClick,!0),this.addEventListener(`keydown`,this.handleTriggerKeyDown)}firstUpdated(){let e=()=>{this.for?this.resolveExternalTrigger():this.syncSlottedTrigger()};queueMicrotask(e),requestAnimationFrame(e)}disconnectedCallback(){window.clearTimeout(this.userTypedTimeout),this.removeEventListener(`click`,this.handleTriggerClick,!0),this.removeEventListener(`keydown`,this.handleTriggerKeyDown),this.unbindTrigger(this.triggerElement),this.triggerElement=null,this.closeAllSubmenus(),this.popupElement&&(this.popupElement.active=!1),this.menuElement?.classList.remove(`show`,`hide`),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),ti(this),bs.delete(this),super.disconnectedCallback()}async updated(e){if(super.updated(e),e.has(`for`)&&this.resolveExternalTrigger(),e.has(`open`)&&this.syncTriggerExpanded(),!e.has(`open`))return;let t=e.get(`open`);t!==this.open&&(t!==void 0||this.open!==!1)&&(this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu(`unknown`)))}getItems(e=!1){let t=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`pk-dropdown-item`);return e?t:t.filter(e=>!e.disabled)}getSubmenuItems(e,t=!1){let n=((e.shadowRoot?.querySelector(`slot[name="submenu"]`))?.assignedElements({flatten:!0})??[...e.children].filter(e=>e.getAttribute(`slot`)===`submenu`)).filter(e=>e.localName===`pk-dropdown-item`);return t?n:n.filter(e=>!e.disabled)}getTrigger(){return this.for?eo(this,this.for)??this.triggerElement:this.querySelector(`[slot="trigger"]`)??this.triggerElement}getAnchor(){return this.getTrigger()??``}resolveExternalTrigger(){this.unbindTrigger(this.triggerElement),this.triggerElement=this.for?eo(this,this.for):null,this.bindTrigger(this.triggerElement),this.requestUpdate()}onTriggerSlotChange(e){if(this.for)return;let[t]=e.target.assignedElements({flatten:!0});this.unbindTrigger(this.triggerElement),this.triggerElement=t??null,this.bindTrigger(this.triggerElement),this.requestUpdate()}syncSlottedTrigger(){let e=this.renderRoot.querySelector(`slot[name="trigger"]`);e&&this.onTriggerSlotChange({target:e})}bindTrigger(e){e&&(e.setAttribute(`aria-haspopup`,`menu`),this.for&&(e.addEventListener(`click`,this.handleExternalTriggerClick),e.addEventListener(`keydown`,this.handleTriggerKeyDown)),this.syncTriggerExpanded())}unbindTrigger(e){e?.removeEventListener(`click`,this.handleExternalTriggerClick),e?.removeEventListener(`keydown`,this.handleTriggerKeyDown)}syncTriggerExpanded(){this.getTrigger()?.setAttribute(`aria-expanded`,this.open?`true`:`false`)}closeAfterSelect(e=`api`){this.open=!1}makeSelection(e){let t=this.getTrigger();if(e.disabled)return;e.type===`checkbox`&&(e.checked=!e.checked),e.type===`radio`&&!e.checked&&(e.checked=!0);let n={value:e.value,type:e.type,checked:e.checked,radioGroup:e.radioGroup};e.dispatchEvent(new CustomEvent(`pk-select`,{detail:n,bubbles:!1,composed:!1,cancelable:!0}));let r=new CustomEvent(`pk-select`,{detail:n,bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(r),r.defaultPrevented||(this.open=!1,t?.focus({preventScroll:!0}))}resolveMenuItem(e){let t=e.target;if(t instanceof q)return t;if(t instanceof Element){let e=t.closest(`pk-dropdown-item`);if(e instanceof q)return e}return e.composedPath().find(e=>e instanceof q)??null}whenClosed(){return this.open?new Promise(e=>{this.addEventListener(`pk-after-hide`,()=>{this.popupElement.stop().then(()=>e())},{once:!0})}):this.popupElement?.active?this.popupElement.stop():Promise.resolve()}forceDismissCleanup(){this.open=!1,this.popupElement.active=!1,this.menuElement?.classList.remove(`show`,`hide`),this.closeAllSubmenus(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),ti(this),bs.delete(this)}isRtl(){return getComputedStyle(this).direction===`rtl`}addToSubmenuStack(e){let t=this.openSubmenuStack.indexOf(e);t===-1?this.openSubmenuStack.push(e):this.openSubmenuStack=this.openSubmenuStack.slice(0,t+1)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1,e.active=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(e){let t=e.closest(`pk-dropdown-item:not([slot="submenu"])`);(t instanceof q?this.getSubmenuItems(t,!0):this.getItems(!0)).forEach(t=>{t!==e&&t.submenuOpen&&(t.submenuOpen=!1)}),this.openSubmenuStack.includes(e)||this.openSubmenuStack.push(e)}setActiveItem(e,t){e.forEach(e=>{e.active=e===t,e===t?e.setAttribute(`data-highlighted`,``):e.removeAttribute(`data-highlighted`)}),t.focus({preventScroll:!0}),t.scrollIntoView({block:`nearest`})}async showMenu(){if(!this.popupElement||!this.menuElement)return;this.for&&!this.triggerElement?.isConnected&&this.resolveExternalTrigger();let e=new oo;if(!this.dispatchEvent(e)){this.open=!1;return}if(this.popupElement.active&&(this.popupElement.active=!1,this.menuElement.classList.remove(`show`,`hide`),await this.updateComplete),bs.forEach(e=>{e!==this&&(e.open=!1)}),this.popupElement.active=!0,this.open=!0,bs.add(this),ei(this),document.addEventListener(`keydown`,this.handleDocumentKeyDown),document.addEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.addEventListener(`mousemove`,this.handleGlobalMouseMove),await this.updateComplete,await oi(this.popupElement,this.placement,100,{requireEvent:!0}),!this.open){this.popupElement.active=!1,bs.delete(this),ti(this),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove);return}this.menuElement.classList.remove(`hide`),await vs(this.menuElement,`show`);let t=this.getItems();t.length>0&&(this.openedByKeyboard?this.setActiveItem(t,t[0]):(t.forEach(e=>{e.active=!1,e.removeAttribute(`data-highlighted`)}),this.menuElement.focus({preventScroll:!0}))),this.openedByKeyboard=!1,this.dispatchEvent(new so),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!0},bubbles:!0,composed:!0}))}async hideMenu(e){if(!this.popupElement||!this.menuElement)return;let t=new co(e);this.dispatchEvent(t)?(this.open=!1,bs.delete(this),ti(this),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown,!0),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),this.userTypedQuery=``,window.clearTimeout(this.userTypedTimeout),this.getItems(!0).forEach(e=>{e.active=!1,e.removeAttribute(`data-highlighted`)}),this.menuElement.classList.remove(`show`),await vs(this.menuElement,`hide`),this.popupElement.active=!1,this.dispatchEvent(new lo),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!1},bubbles:!0,composed:!0}))):this.open=!0}render(){let e=this.hasUpdated?this.popupElement?.active:this.open;return E`
            <pk-popup
                .anchor=${this.for?this.getAnchor():``}
                placement=${this.placement}
                .distance=${this.distance||this.sideOffset}
                .skidding=${this.skidding}
                ?active=${e}
                flip
                shift
                .shiftPadding=${10}
                auto-size="vertical"
                .autoSizePadding=${10}
            >
                <slot
                    name="trigger"
                    slot="anchor"
                    @slotchange=${this.onTriggerSlotChange}
                ></slot>

                <div
                    id="menu"
                    part="panel"
                    class="panel"
                    role="menu"
                    tabindex="-1"
                    aria-orientation="vertical"
                    data-size=${this.size}
                    @click=${this.handleMenuClick}
                    @pk-submenu-open=${this.handleSubmenuOpening}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `}};j([M({type:Boolean,reflect:!0})],J.prototype,`open`,void 0),j([M({reflect:!0})],J.prototype,`size`,void 0),j([M({reflect:!0})],J.prototype,`placement`,void 0),j([M({attribute:`side-offset`,type:Number})],J.prototype,`sideOffset`,void 0),j([M({type:Number})],J.prototype,`distance`,void 0),j([M({type:Number})],J.prototype,`skidding`,void 0),j([M({reflect:!0})],J.prototype,`for`,void 0),j([P(`slot:not([name])`)],J.prototype,`defaultSlot`,void 0),j([P(`#menu`)],J.prototype,`menuElement`,void 0),j([P(`pk-popup`)],J.prototype,`popupElement`,void 0),J=j([k(`pk-dropdown-menu`)],J);var xs=d`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            max-width: 100%;
            font-family: var(--pk-font-family, system-ui, sans-serif);
        }
        .base {
            --_text: var(--pk-color-gray-900);
            --_tint: var(
                --pk-status-label-neutral-tint,
                var(--pk-color-gray-500)
            );
            display: inline-flex;
            align-items: start;
            justify-content: center;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem 0.25rem 0.25rem;
            border-radius: 0.6875rem;
            background: var(
                --pk-status-label-background,
                color-mix(in srgb, var(--_tint) 15%, transparent)
            );
            color: var(--pk-status-label-color, var(--_text));
            font-size: 0.6875rem;
            font-weight: 500;
            line-height: 1.1;
            text-transform: uppercase;
            max-width: 100%;
            box-sizing: border-box;
        }
        .label {
            min-width: 0;
            overflow-wrap: anywhere;
        }
        pk-status {
            width: 0.75rem;
            height: 0.75rem;
        }
        .base[data-tone='red'] {
            --_text: var(--pk-color-red-900);
            --_tint: var(--pk-color-red-600);
        }
        .base[data-tone='orange'] {
            --_text: var(--pk-color-orange-900);
            --_tint: var(--pk-color-orange-400);
        }
        .base[data-tone='amber'] {
            --_text: var(--pk-color-amber-900);
            --_tint: var(--pk-color-amber-500);
        }
        .base[data-tone='yellow'] {
            --_text: var(--pk-color-yellow-900);
            --_tint: var(--pk-color-yellow-500);
        }
        .base[data-tone='lime'] {
            --_text: var(--pk-color-lime-900);
            --_tint: var(--pk-color-lime-500);
        }
        .base[data-tone='green'] {
            --_text: var(--pk-color-green-900);
            --_tint: var(--pk-color-green-500);
        }
        .base[data-tone='emerald'] {
            --_text: var(--pk-color-emerald-900);
            --_tint: var(--pk-color-emerald-500);
        }
        .base[data-tone='teal'] {
            --_text: var(--pk-color-teal-900);
            --_tint: var(--pk-color-teal-550);
        }
        .base[data-tone='cyan'] {
            --_text: var(--pk-color-cyan-900);
            --_tint: var(--pk-color-cyan-500);
        }
        .base[data-tone='sky'] {
            --_text: var(--pk-color-sky-900);
            --_tint: var(--pk-color-sky-500);
        }
        .base[data-tone='blue'] {
            --_text: var(--pk-color-blue-900);
            --_tint: var(--pk-color-blue-500);
        }
        .base[data-tone='indigo'] {
            --_text: var(--pk-color-indigo-900);
            --_tint: var(--pk-color-indigo-500);
        }
        .base[data-tone='violet'] {
            --_text: var(--pk-color-violet-900);
            --_tint: var(--pk-color-violet-500);
        }
        .base[data-tone='purple'] {
            --_text: var(--pk-color-purple-900);
            --_tint: var(--pk-color-purple-500);
        }
        .base[data-tone='fuchsia'] {
            --_text: var(--pk-color-fuchsia-900);
            --_tint: var(--pk-color-fuchsia-500);
        }
        .base[data-tone='pink'] {
            --_text: var(--pk-color-pink-900);
            --_tint: var(--pk-color-pink-500);
        }
        .base[data-tone='rose'] {
            --_text: var(--pk-color-rose-900);
            --_tint: var(--pk-color-rose-500);
        }
        .base[data-tone='white'] {
            --_text: var(--pk-color-black);
            --_tint: var(--pk-color-gray-500);
        }
        .base[data-tone='black'] {
            --_text: var(--pk-color-black);
            --_tint: var(--pk-color-gray-1000);
        }
        .base[data-indicator='white'] pk-status::part(base) {
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-300);
        }
    }
`,Ss={red:`red`,orange:`orange`,amber:`amber`,yellow:`yellow`,lime:`lime`,green:`green`,emerald:`emerald`,teal:`teal`,cyan:`cyan`,sky:`sky`,blue:`blue`,indigo:`indigo`,violet:`violet`,purple:`purple`,fuchsia:`fuchsia`,pink:`pink`,rose:`rose`,gray:`gray`,white:`white`,black:`black`,all:`gray`,on:`teal`,live:`teal`,active:`teal`,enabled:`teal`,off:`red`,suspended:`red`,expired:`red`,warning:`amber`,pending:`orange`,turquoise:`teal`,light:`gray`,grey:`gray`,disabled:`gray`,inactive:`gray`},Cs=class extends A{constructor(...e){super(...e),this.status=`gray`}static{this.styles=xs}render(){let e=Object.hasOwn(Ss,this.status);return E`<span
            part="base"
            class="base"
            data-tone=${e?Ss[this.status]:`gray`}
            data-indicator=${this.status}
        >
            <pk-status
                part="indicator"
                aria-hidden="true"
                .status=${e?this.status:`gray`}
            ></pk-status>
            <span part="label" class="label"><slot>${this.status}</slot></span>
        </span>`}};j([M({reflect:!0})],Cs.prototype,`status`,void 0),Cs=j([k(`pk-status-label`)],Cs);var ws=class extends Event{constructor(e){super(`pk-copy`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail={value:e}}},Ts=class extends Event{constructor(){super(`pk-copy-error`,{bubbles:!0,cancelable:!1,composed:!0})}};async function Es(e){await navigator.clipboard.writeText(e)}function Ds(e,t,n){if(!t)return n||null;let r=t.includes(`.`),i=t.includes(`[`)&&t.includes(`]`),a=t,o=``;r?[a,o]=t.trim().split(`.`):i&&([a,o]=t.trim().replace(/\]$/,``).split(`[`));let s=`getElementById`in e?e.getElementById(a):null;if(!s)return null;if(i)return s.getAttribute(o)??``;if(r){let e=s[o];return e==null?``:String(e)}return s.textContent??``}var Os=d`
    @layer pk-component {
        :host {
            display: inline-block;
        }

        /* Match React CopyButton size="icon" — square, no horizontal padding. */
        pk-button::part(base) {
            padding-inline: 0;
            width: var(--pk-btn-height-default);
            min-width: var(--pk-btn-height-default);
            border-color: var(--pk-copy-button-border-color);
            border-radius: var(--pk-copy-button-radius);
            background: var(--pk-copy-button-background);
            color: var(--pk-copy-button-color);
        }

        pk-button::part(base):hover:not(:disabled) {
            border-color: var(
                --pk-copy-button-hover-border-color,
                var(--pk-copy-button-border-color)
            );
            background: var(--pk-copy-button-hover-background);
            color: var(--pk-copy-button-hover-color, var(--pk-copy-button-color));
        }

        /*
         * In-control trailing action (slot=end on pk-input, etc.): same family as
         * combobox expand/clear and image-browser clear — flex-reserved hit box
         * flush to the field edge, glyph sized via --pk-input-decoration-size.
         */
        :host([slot='end']) {
            display: inline-flex;
            align-self: stretch;
            height: auto;
            /* size=none buttons resolve --pk-btn-icon-size: 1em against this. */
            font-size: var(--pk-input-decoration-size, 0.75rem);
        }

        :host([slot='end']) pk-button {
            display: flex;
            height: 100%;
        }

        :host([slot='end']) pk-button::part(base) {
            box-sizing: border-box;
            width: calc(
                var(--pk-input-decoration-size, 0.75rem) + var(--pk-input-padding-inline, 8px)
            );
            min-width: calc(
                var(--pk-input-decoration-size, 0.75rem) + var(--pk-input-padding-inline, 8px)
            );
            height: 100%;
            min-height: 100%;
            padding: 0;
            border-width: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-600);
        }

        :host([slot='end']) pk-button::part(base):hover:not(:disabled) {
            color: var(--pk-color-gray-800);
        }
    }
`,ks=z(B.check).replace(`<svg`,`<svg slot="start" part="success-icon"`),As=z(B.copy).replace(`<svg`,`<svg slot="start" part="copy-icon"`),js=2e3,Ms=class extends A{constructor(...e){super(...e),this.hasSlotController=new yr(this,`icon`),this.value=``,this.from=``,this.disabled=!1,this.variant=`transparent`,this.ariaLabel=`Copy`,this.copiedLabel=`Copied`,this.copied=!1,this.resetCopied=()=>{this.copied=!1}}static{this.styles=Os}disconnectedCallback(){window.clearTimeout(this.resetTimer),super.disconnectedCallback()}scheduleReset(){window.clearTimeout(this.resetTimer),this.resetTimer=window.setTimeout(this.resetCopied,js)}async copy(){if(this.disabled)return;let e=Ds(this.getRootNode(),this.from,this.value);if(e==null||e===``)this.dispatchEvent(new Ts);else try{await Es(e),this.copied=!0,this.scheduleReset(),this.dispatchEvent(new ws(e))}catch{this.dispatchEvent(new Ts)}}render(){let e=this.getAttribute(`slot`)===`end`;return E`
            <pk-button
                part="button"
                variant=${e?`none`:this.variant}
                size=${e?`none`:`default`}
                ?icon=${e}
                aria-label=${this.copied?this.copiedLabel:this.ariaLabel}
                ?disabled=${this.disabled}
                @click=${this.copy}
            >
                ${this.copied?ct(ks):this.hasSlotController.test(`icon`)?E`<slot name="icon" slot="start"></slot>`:ct(As)}
            </pk-button>
        `}};j([M()],Ms.prototype,`value`,void 0),j([M()],Ms.prototype,`from`,void 0),j([M({type:Boolean,reflect:!0})],Ms.prototype,`disabled`,void 0),j([M({reflect:!0})],Ms.prototype,`variant`,void 0),j([M({attribute:`aria-label`})],Ms.prototype,`ariaLabel`,void 0),j([M({attribute:`copied-label`})],Ms.prototype,`copiedLabel`,void 0),j([N()],Ms.prototype,`copied`,void 0),Ms=j([k(`pk-copy-button`)],Ms);var Ns=d`
    @layer pk-component {
        :host {
            display: flex;
            flex: 1 1 auto;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: var(--pk-state-panel-min-height, var(--_pk-state-panel-min-height));
            padding: var(--pk-state-panel-padding, var(--_pk-state-panel-padding));
            color: var(--pk-state-panel-body-color, var(--pk-color-gray-500));
            font-family: var(--pk-font-family);
            font-size: var(--_pk-state-panel-font-size);
            line-height: var(--pk-line-height);
            text-align: center;
            --pk-state-panel-accent: var(--pk-color-slate-500);
            --pk-state-panel-icon-background: color-mix(
                in srgb,
                var(--pk-color-slate-200) 55%,
                transparent
            );
            --_pk-state-panel-font-size: var(--pk-font-size-sm);
            --_pk-state-panel-title-size: var(--pk-font-size-base);
            --_pk-state-panel-content-width: 32rem;
            --_pk-state-panel-min-height: 11rem;
            --_pk-state-panel-padding: 2rem 0.875rem;
            --_pk-state-panel-icon-shell-size: 2.125rem;
            --_pk-state-panel-icon-size: 1.0625rem;
            --_pk-state-panel-icon-radius: var(--pk-radius-lg);
            --_pk-state-panel-icon-margin-bottom: 0.625rem;
            --_pk-state-panel-body-margin-top: 0.375rem;
            --_pk-state-panel-details-margin-top: 0.75rem;
            --_pk-state-panel-details-font-size: 0.75rem;
            --_pk-state-panel-details-content-margin-top: 0.625rem;
            --_pk-state-panel-details-max-height: 14rem;
            --_pk-state-panel-details-pre-padding: 0.625rem;
            --_pk-state-panel-details-pre-radius: var(--pk-radius-md);
            --_pk-state-panel-details-pre-font-size: 0.6875rem;
            --_pk-state-panel-copy-button-size: var(--pk-btn-height-xs);
            --_pk-state-panel-copy-icon-size: var(--pk-btn-icon-size-xs);
            --_pk-state-panel-copy-inset: 0.375rem;
            --_pk-state-panel-copy-radius: var(--pk-radius-md);
            --_pk-state-panel-copy-status-size: 0.6875rem;
            --_pk-state-panel-actions-gap: 0.4375rem;
            --_pk-state-panel-actions-margin-top: 1rem;
            --_pk-state-panel-action-height: var(--pk-btn-height-sm);
            --_pk-state-panel-action-font: var(--pk-btn-font-sm);
            --_pk-state-panel-action-padding-inline: var(--pk-btn-padding-inline-sm);
            --_pk-state-panel-action-icon-size: var(--pk-btn-icon-size-sm);
            --_pk-state-panel-action-icon-gap: var(--pk-btn-icon-gap-sm);
            --_pk-state-panel-action-caret-size: var(--pk-btn-caret-size-sm);
            --_pk-state-panel-action-radius: var(--pk-btn-radius-sm);
        }

        :host([size='sm']) {
            --_pk-state-panel-font-size: var(--pk-btn-font-xs);
            --_pk-state-panel-title-size: var(--pk-font-size-sm);
            --_pk-state-panel-content-width: 28rem;
            --_pk-state-panel-min-height: 8rem;
            --_pk-state-panel-padding: 1.25rem 0.75rem;
            --_pk-state-panel-icon-shell-size: 1.75rem;
            --_pk-state-panel-icon-size: 0.875rem;
            --_pk-state-panel-icon-radius: var(--pk-radius-md);
            --_pk-state-panel-icon-margin-bottom: 0.5rem;
            --_pk-state-panel-body-margin-top: 0.25rem;
            --_pk-state-panel-details-margin-top: 0.625rem;
            --_pk-state-panel-details-font-size: 0.6875rem;
            --_pk-state-panel-details-content-margin-top: 0.5rem;
            --_pk-state-panel-details-max-height: 10rem;
            --_pk-state-panel-details-pre-padding: 0.5rem;
            --_pk-state-panel-details-pre-radius: var(--pk-radius-sm);
            --_pk-state-panel-details-pre-font-size: 0.6875rem;
            --_pk-state-panel-copy-button-size: var(--pk-btn-height-xxs);
            --_pk-state-panel-copy-icon-size: var(--pk-btn-icon-size-xxs);
            --_pk-state-panel-copy-inset: 0.3125rem;
            --_pk-state-panel-copy-radius: var(--pk-radius-sm);
            --_pk-state-panel-copy-status-size: 0.6875rem;
            --_pk-state-panel-actions-gap: 0.375rem;
            --_pk-state-panel-actions-margin-top: 0.75rem;
            --_pk-state-panel-action-height: var(--pk-btn-height-xs);
            --_pk-state-panel-action-font: var(--pk-btn-font-xs);
            --_pk-state-panel-action-padding-inline: var(--pk-btn-padding-inline-xs);
            --_pk-state-panel-action-icon-size: var(--pk-btn-icon-size-xs);
            --_pk-state-panel-action-icon-gap: var(--pk-btn-icon-gap-xs);
            --_pk-state-panel-action-caret-size: var(--pk-btn-caret-size-xs);
            --_pk-state-panel-action-radius: var(--pk-btn-radius-xs);
        }

        :host([size='lg']) {
            --_pk-state-panel-font-size: var(--pk-font-size-base);
            --_pk-state-panel-title-size: 1rem;
            --_pk-state-panel-content-width: 35rem;
            --_pk-state-panel-min-height: 14rem;
            --_pk-state-panel-padding: 2.5rem 1rem;
            --_pk-state-panel-icon-shell-size: 2.5rem;
            --_pk-state-panel-icon-size: 1.25rem;
            --_pk-state-panel-icon-radius: 0.625rem;
            --_pk-state-panel-icon-margin-bottom: 0.75rem;
            --_pk-state-panel-body-margin-top: 0.5rem;
            --_pk-state-panel-details-margin-top: 1rem;
            --_pk-state-panel-details-font-size: 0.8125rem;
            --_pk-state-panel-details-content-margin-top: 0.75rem;
            --_pk-state-panel-details-max-height: 18rem;
            --_pk-state-panel-details-pre-padding: 0.75rem;
            --_pk-state-panel-details-pre-radius: var(--pk-radius-lg);
            --_pk-state-panel-details-pre-font-size: 0.75rem;
            --_pk-state-panel-copy-button-size: var(--pk-btn-height-sm);
            --_pk-state-panel-copy-icon-size: var(--pk-btn-icon-size-sm);
            --_pk-state-panel-copy-inset: 0.5rem;
            --_pk-state-panel-copy-radius: var(--pk-radius-lg);
            --_pk-state-panel-copy-status-size: 0.75rem;
            --_pk-state-panel-actions-gap: 0.5rem;
            --_pk-state-panel-actions-margin-top: 1.25rem;
            --_pk-state-panel-action-height: 2.125rem;
            --_pk-state-panel-action-font: var(--pk-font-size-base);
            --_pk-state-panel-action-padding-inline: 9px;
            --_pk-state-panel-action-icon-size: 14px;
            --_pk-state-panel-action-icon-gap: 6px;
            --_pk-state-panel-action-caret-size: 12px;
            --_pk-state-panel-action-radius: var(--pk-radius-lg);
        }

        :host([variant='info']) {
            --pk-state-panel-accent: var(--pk-color-sky-600);
            --pk-state-panel-icon-background: var(--pk-color-sky-50);
        }

        :host([variant='success']) {
            --pk-state-panel-accent: var(--pk-color-teal-600);
            --pk-state-panel-icon-background: var(--pk-color-teal-50);
        }

        :host([variant='warning']) {
            --pk-state-panel-accent: var(--pk-color-amber-600);
            --pk-state-panel-icon-background: var(--pk-color-amber-50);
        }

        :host([variant='error']) {
            --pk-state-panel-accent: var(--pk-color-rose-600);
            --pk-state-panel-icon-background: color-mix(
                in srgb,
                var(--pk-color-rose-500) 12%,
                transparent
            );
        }

        .panel {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: min(
                100%,
                var(--pk-state-panel-content-width, var(--_pk-state-panel-content-width))
            );
            min-width: 0;
        }

        .icon-shell {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-state-panel-icon-shell-size, var(--_pk-state-panel-icon-shell-size));
            height: var(--pk-state-panel-icon-shell-size, var(--_pk-state-panel-icon-shell-size));
            margin-bottom: var(--_pk-state-panel-icon-margin-bottom);
            border-radius: var(--pk-state-panel-icon-radius, var(--_pk-state-panel-icon-radius));
            background: var(--pk-state-panel-icon-background);
            color: var(--pk-state-panel-accent);
        }

        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--pk-state-panel-icon-size, var(--_pk-state-panel-icon-size));
            height: var(--pk-state-panel-icon-size, var(--_pk-state-panel-icon-size));
            font-size: var(--pk-state-panel-icon-size, var(--_pk-state-panel-icon-size));
        }

        .icon svg,
        .icon pk-icon,
        .icon ::slotted(*) {
            display: block;
            width: 100%;
            height: 100%;
            fill: currentColor;
        }

        .title {
            margin: 0;
            color: var(--pk-state-panel-title-color, var(--pk-color-gray-900));
            font-size: var(--pk-state-panel-title-size, var(--_pk-state-panel-title-size));
            font-weight: 600;
            line-height: 1.4;
        }

        .title ::slotted(*) {
            margin: 0;
            color: inherit;
            font: inherit;
        }

        .body {
            max-width: 100%;
            margin-top: var(--_pk-state-panel-body-margin-top);
        }

        .body ::slotted(*) {
            margin-block: 0;
        }

        .details {
            width: 100%;
            margin-top: var(--_pk-state-panel-details-margin-top);
            color: var(--pk-state-panel-accent);
            font-size: var(--_pk-state-panel-details-font-size);
        }

        summary {
            width: fit-content;
            margin-inline: auto;
            border-radius: var(--pk-radius-sm);
            cursor: pointer;
        }

        summary:focus-visible,
        .copy:focus-visible {
            outline: none;
            box-shadow: var(--pk-shadow-focus);
        }

        .details-content {
            position: relative;
            margin-top: var(--_pk-state-panel-details-content-margin-top);
            color: var(--pk-color-gray-800);
            text-align: start;
        }

        .details-scroll {
            min-width: 0;
        }

        .details-content ::slotted(pre) {
            box-sizing: border-box;
            max-height: var(
                --pk-state-panel-details-max-height,
                var(--_pk-state-panel-details-max-height)
            );
            margin: 0;
            padding: var(--_pk-state-panel-details-pre-padding);
            overflow: auto;
            border: 1px solid var(--pk-color-gray-200);
            border-radius: var(--_pk-state-panel-details-pre-radius);
            background: var(--pk-color-white);
            color: var(--pk-color-gray-800);
            font:
                var(--_pk-state-panel-details-pre-font-size)/1.5 ui-monospace,
                SFMono-Regular,
                Consolas,
                'Liberation Mono',
                monospace;
            overflow-wrap: anywhere;
            user-select: text;
            white-space: pre-wrap;
        }

        :host([copyable]) .details-content ::slotted(pre) {
            max-height: none;
            padding-inline-end: calc(
                var(--_pk-state-panel-details-pre-padding) +
                    var(--_pk-state-panel-copy-button-size) +
                    var(--_pk-state-panel-copy-inset)
            );
            overflow: visible;
            border: 0;
            border-radius: 0;
            background: transparent;
        }

        :host([copyable]) .details-content {
            overflow: hidden;
            border: 1px solid var(--pk-color-gray-200);
            border-radius: var(--_pk-state-panel-details-pre-radius);
            background: var(--pk-color-white);
        }

        :host([copyable]) .details-scroll {
            position: relative;
            max-height: var(
                --pk-state-panel-details-max-height,
                var(--_pk-state-panel-details-max-height)
            );
            overflow: auto;
        }

        .copy-overlay {
            position: sticky;
            z-index: 1;
            top: 0;
            display: flex;
            justify-content: flex-end;
            height: 0;
            pointer-events: none;
        }

        .copy {
            flex: none;
            margin-block-start: var(--_pk-state-panel-copy-inset);
            margin-inline-end: var(--_pk-state-panel-copy-inset);
            pointer-events: auto;
            --pk-btn-height-default: var(--_pk-state-panel-copy-button-size);
            --pk-btn-icon-size-default: var(--_pk-state-panel-copy-icon-size);
            --pk-btn-radius-default: var(--_pk-state-panel-copy-radius);
            --pk-copy-button-background: var(--pk-color-white);
            --pk-copy-button-border-color: transparent;
            --pk-copy-button-hover-border-color: transparent;
            --pk-copy-button-color: var(--pk-color-gray-300);
            --pk-copy-button-hover-color: var(--pk-color-gray-500);
            --pk-copy-button-hover-background: color-mix(
                in srgb,
                var(--pk-color-gray-300) 6%,
                var(--pk-color-white)
            );
        }

        .copy-status {
            display: block;
            margin-top: 0.375rem;
            color: var(--pk-color-red-700);
            font-size: var(--_pk-state-panel-copy-status-size);
            text-align: start;
        }

        .copy-status:not([data-error]) {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: var(--_pk-state-panel-actions-gap);
            margin-top: var(--_pk-state-panel-actions-margin-top);
        }

        .actions slot::slotted(pk-button) {
            --pk-btn-height-default: var(--_pk-state-panel-action-height);
            --pk-btn-font-default: var(--_pk-state-panel-action-font);
            --pk-btn-padding-inline-default: var(--_pk-state-panel-action-padding-inline);
            --pk-btn-icon-size-default: var(--_pk-state-panel-action-icon-size);
            --pk-btn-icon-gap-default: var(--_pk-state-panel-action-icon-gap);
            --pk-btn-caret-size-default: var(--_pk-state-panel-action-caret-size);
            --pk-btn-radius-default: var(--_pk-state-panel-action-radius);
        }
    }
`,Ps=3e3,Fs={empty:B.emptySet,info:B.circleInfo,success:B.circleCheck,warning:B.triangleExclamation,error:B.triangleExclamation},Y=class extends A{constructor(...e){super(...e),this.hasSlotController=new yr(this,`title`,`icon`,`details`,`actions`),this.variant=`empty`,this.size=`default`,this.heading=``,this.headingLevel=2,this.icon=``,this.hideIcon=!1,this.announce=`off`,this.detailsLabel=`Details`,this.detailsOpen=!1,this.copyable=!1,this.copyLabel=`Copy details`,this.copiedLabel=`Details copied.`,this.copyErrorLabel=`Copy failed. Select the details and copy them manually.`,this.copyStatus=``,this.copyFailed=!1}static{this.styles=Ns}disconnectedCallback(){window.clearTimeout(this.copyStatusResetTimer),super.disconnectedCallback()}hasTitle(){return!!this.heading||this.hasSlotController.test(`title`)}get detailsValue(){return(this.detailsSlot?.assignedNodes({flatten:!0})??[]).map(e=>e.textContent??``).join(``).trim()}resetCopyStatusLater(){window.clearTimeout(this.copyStatusResetTimer),this.copyStatusResetTimer=window.setTimeout(()=>{this.copyStatus=``,this.copyFailed=!1},Ps)}showCopySuccess(){this.copyFailed=!1,this.copyStatus=this.copiedLabel,this.resetCopyStatusLater()}showCopyError(){this.copyFailed=!0,this.copyStatus=this.copyErrorLabel,this.resetCopyStatusLater()}handleCopySuccess(){this.showCopySuccess()}handleCopyError(){this.showCopyError(),this.selectDetails()}selectDetails(){let e=this.detailsSlot?.assignedNodes({flatten:!0})??[],t=e[0],n=e[e.length-1];if(!t||!n)return;this.detailsOpen=!0;let r=document.createRange();r.setStartBefore(t),r.setEndAfter(n);let i=window.getSelection();i?.removeAllRanges(),i?.addRange(r)}async copyDetails(){let e=this.detailsValue;if(!e)this.showCopyError(),this.dispatchEvent(new Ts);else if(this.copyButton)this.copyButton.value=e,await this.copyButton.copy();else try{await Es(e),this.showCopySuccess();let t=new ws(e);this.dispatchEvent(t)}catch{this.showCopyError(),this.selectDetails(),this.dispatchEvent(new Ts)}}handleDetailsToggle(e){this.detailsOpen=e.currentTarget.open}renderIcon(){if(this.hideIcon)return O;let e;return e=this.hasSlotController.test(`icon`)?E`<slot name="icon"></slot>`:this.icon?E`<pk-icon .icon=${this.icon}></pk-icon>`:ut(z(Fs[this.variant]??Fs.empty)),E`
            <span part="icon-shell" class="icon-shell" aria-hidden="true">
                <span part="icon" class="icon">${e}</span>
            </span>
        `}render(){let e=this.announce===`assertive`?`alert`:this.announce===`polite`?`status`:O,t=this.announce===`off`?O:this.announce,n=this.hasSlotController.test(`details`),r=this.hasSlotController.test(`actions`);return E`
            <div
                part="base"
                class="panel"
                role=${e}
                aria-live=${t}
                aria-atomic=${this.announce===`off`?O:`true`}
            >
                ${this.renderIcon()}

                ${this.hasTitle()?E`
                        <div
                            part="title"
                            class="title"
                            role="heading"
                            aria-level=${this.headingLevel}
                        >
                            ${this.hasSlotController.test(`title`)?E`<slot name="title"></slot>`:this.heading}
                        </div>
                    `:O}

                <div part="body" class="body"><slot></slot></div>

                ${n?E`
                        <details
                            part="details"
                            class="details"
                            ?open=${this.detailsOpen}
                            @toggle=${this.handleDetailsToggle}
                        >
                            <summary part="details-summary">${this.detailsLabel}</summary>
                            <div part="details-content" class="details-content">
                                <div class="details-scroll">
                                    ${this.copyable?E`
                                            <div class="copy-overlay">
                                                <pk-copy-button
                                                    part="copy-button"
                                                    class="copy"
                                                    variant="transparent"
                                                    aria-label=${this.copyLabel}
                                                    .copiedLabel=${this.copiedLabel}
                                                    .value=${this.detailsValue}
                                                    @pk-copy=${this.handleCopySuccess}
                                                    @pk-copy-error=${this.handleCopyError}
                                                ></pk-copy-button>
                                            </div>
                                        `:O}
                                    <slot name="details"></slot>
                                </div>
                            </div>

                            ${this.copyable?E`
                                    <span
                                        part="copy-status"
                                        class="copy-status"
                                        data-error=${this.copyFailed?``:O}
                                        role="status"
                                        aria-live="polite"
                                    >${this.copyStatus}</span>
                                `:O}
                        </details>
                    `:O}

                ${r?E`<div part="actions" class="actions"><slot name="actions"></slot></div>`:O}
            </div>
        `}};j([M({reflect:!0})],Y.prototype,`variant`,void 0),j([M({reflect:!0})],Y.prototype,`size`,void 0),j([M()],Y.prototype,`heading`,void 0),j([M({type:Number,attribute:`heading-level`})],Y.prototype,`headingLevel`,void 0),j([M()],Y.prototype,`icon`,void 0),j([M({type:Boolean,attribute:`hide-icon`,reflect:!0})],Y.prototype,`hideIcon`,void 0),j([M({reflect:!0})],Y.prototype,`announce`,void 0),j([M({attribute:`details-label`})],Y.prototype,`detailsLabel`,void 0),j([M({type:Boolean,attribute:`details-open`,reflect:!0})],Y.prototype,`detailsOpen`,void 0),j([M({type:Boolean,reflect:!0})],Y.prototype,`copyable`,void 0),j([M({attribute:`copy-label`})],Y.prototype,`copyLabel`,void 0),j([M({attribute:`copied-label`})],Y.prototype,`copiedLabel`,void 0),j([M({attribute:`copy-error-label`})],Y.prototype,`copyErrorLabel`,void 0),j([P(`slot[name="details"]`)],Y.prototype,`detailsSlot`,void 0),j([P(`pk-copy-button.copy`)],Y.prototype,`copyButton`,void 0),j([N()],Y.prototype,`copyStatus`,void 0),j([N()],Y.prototype,`copyFailed`,void 0),Y=j([k(`pk-state-panel`)],Y);var Is=`.modal-shade, .modal`,Ls=e=>{let t=getComputedStyle(e);return t.display!==`none`&&t.visibility!==`hidden`&&Number.parseFloat(t.opacity||`1`)>0},Rs=e=>Array.from(e.querySelectorAll(Is)).filter(e=>e instanceof HTMLElement&&!e.closest(`pk-dialog`)&&Ls(e));function zs(e,t={}){let n=t.getDocument?.()??document,r=t.root??n.body,i=new Set(t.ignoreExisting?Rs(n):[]),a=()=>Rs(n).some(e=>!i.has(e)),o=a(),s=()=>{let t=a();t!==o&&(o=t,e(t))},c=new MutationObserver(()=>{s()});c.observe(r,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`class`,`style`,`hidden`]});let l=window.setInterval(s,250);return{disconnect:()=>{c.disconnect(),window.clearInterval(l)}}}var Bs=d`
    @layer pk-component {
        :host {
            /* Not display:contents — that flattens the trigger slot into flex parents
               (e.g. playground cards) and stretches pk-button full width, same class of
               bug as the dropdown host. Dialog host is display none/block, not contents. */
            display: inline-block;
            width: fit-content;
            max-width: 100%;
            align-self: flex-start;
            flex: none;
            vertical-align: middle;
        }

        /*
         * Controlled dialogs (no slot="trigger") — panel is top-layer / fixed while
         * yielding. An inline-block host still sizes to the open <dialog> box in some
         * engines and expands parents (Formie nested field cards grow a blank gap).
         *
         * Zero box ≠ gone from the tree: Tailwind space-y-* uses :not(:last-child) on
         * DOM siblings, so an in-tree host still steals last-child and margins the
         * previous sibling. Prefer flex/grid gap-* (skips out-of-flow children), or
         * mount overlays outside the spaced stack. True light-DOM portal would also fix it.
         */
        :host(:not([data-has-trigger])) {
            position: absolute;
            width: 0;
            height: 0;
            max-width: none;
            margin: 0;
            padding: 0;
            overflow: visible;
            vertical-align: unset;
        }

        .dialog {
            display: flex;
            flex-direction: column;
            width: min(100%, var(--pk-dialog-width, var(--pk-dialog-max-width, 32rem)));
            min-width: var(--pk-dialog-min-width, 0);
            /* Keep UA :modal inset (0) — that + margin:auto centers the panel. Do not
             * unset inset; it breaks centering (field edit landed top-left). */
            height: var(--pk-dialog-height, fit-content);
            min-height: var(--pk-dialog-min-height, 0);
            max-height: var(--pk-dialog-max-height, calc(100vh - 2rem));
            margin: auto;
            padding: 0;
            /* v1 DialogContent: no CSS border — edge is the 1px ring inside --pk-shadow-modal. */
            border: 0;
            border-radius: var(--pk-radius-lg);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-modal);
            color: var(--pk-color-gray-900);
            overflow: hidden;
            opacity: 1;
            transform: scale(1);
        }

        .dialog:focus,
        .dialog:focus-visible {
            outline: none;
        }

        .dialog:not([open]) {
            display: none;
        }

        .dialog--wide {
            --pk-dialog-max-width: 42rem;
        }

        /* motion only via animateWithClass — never auto-animate on [open] alone. */
        .dialog.show {
            animation: pk-dialog-in 0.15s ease;
        }

        .dialog.hide {
            animation: pk-dialog-out 0.15s ease forwards;
        }

        .dialog.pulse {
            animation: pk-dialog-pulse 0.25s ease;
        }

        @keyframes pk-dialog-in {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pk-dialog-out {
            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }

        @keyframes pk-dialog-pulse {
            0%, 100% {
                transform: scale(1);
            }

            50% {
                transform: scale(0.98);
            }
        }

        .dialog.show::backdrop {
            animation: pk-dialog-backdrop-in 0.15s ease;
        }

        .dialog.hide::backdrop {
            animation: pk-dialog-backdrop-in 0.15s ease reverse;
        }

        .dialog::backdrop {
            background: hsl(from var(--pk-color-gray-900) h s l / 0.2);
            opacity: 1;
        }

        @keyframes pk-dialog-backdrop-in {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .header {
            position: relative;
            display: flex;
            flex-shrink: 0;
            flex-direction: column;
            gap: 0.2rem;
            padding: 1rem;
            border-bottom: 1px solid var(--pk-color-gray-150);
            border-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
            background: #f3f7fb;
            text-align: left;
        }

        .title {
            margin: 0;
            padding-inline-end: 2rem;
            font-size: 0.9375rem;
            font-weight: 600;
            line-height: 1.2;
            color: var(--pk-color-gray-900);
        }

        .description {
            margin: 0;
            padding-inline-end: 2rem;
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 1.4;
            color: var(--pk-color-gray-500);
        }

        .close {
            --pk-dialog-close-focus-padding: 0.25rem;
            position: absolute;
            top: calc(1rem - var(--pk-dialog-close-focus-padding));
            right: calc(1rem - var(--pk-dialog-close-focus-padding));
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: calc(1.125rem + 2 * var(--pk-dialog-close-focus-padding));
            height: calc(1.125rem + 2 * var(--pk-dialog-close-focus-padding));
            margin: 0;
            padding: var(--pk-dialog-close-focus-padding);
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            line-height: 0;
            opacity: 0.7;
            transition: opacity 0.12s ease;
            box-sizing: border-box;
        }

        .close-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
        }

        .close-icon svg {
            display: block;
            width: 1.125rem;
            height: 1.125rem;
        }

        .close:hover {
            opacity: 1;
            background: transparent;
        }

        .close:focus-visible {
            opacity: 1;
            box-shadow: 0 0 0 2px var(--pk-color-gray-600);
        }

        .body {
            flex: 1 1 auto;
            min-height: 0;
            overflow: auto;
            padding: 0;
            /* v1 DialogContent inherited CP text defaults (14px / gray-700) — do not
             * downshift body copy to sm/gray-600 or slotted content reads smaller than v1. */
            font-size: var(--pk-font-size-base);
            line-height: 1.5;
            color: var(--pk-color-gray-700);
        }

        .body--padded {
            padding: 1rem;
        }

        .footer {
            display: flex;
            flex-shrink: 0;
            flex-direction: row;
            justify-content: flex-end;
            gap: 0.5rem;
            padding: 0.625rem 1rem;
            border-top: 1px solid var(--pk-color-gray-150);
            border-radius: 0 0 var(--pk-radius-lg) var(--pk-radius-lg);
            background: #e4edf6;
        }
    }
`,Vs=z(B.xmark),X=class extends A{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.disablePointerDismissal=!1,this.withoutHeader=!1,this.withoutBodyPadding=!1,this.disableScrollLock=!1,this.size=`default`,this.triggerElement=null,this.previouslyFocused=null,this.yieldingToHostModal=!1,this.hostModalObserver=null,this.yieldBox=null,this.handleDocumentKeyDown=e=>{this.yieldingToHostModal||e.key===`Escape`&&this.open&&ni(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(`escape`))},this.onHostModalPresenceChange=e=>{e?this.yieldToHostModal():this.restoreFromHostModal()},this.showing=!1,this.handleDialogCancel=e=>{e.preventDefault(),!this.dialogElement.classList.contains(`hide`)&&ni(this)&&this.requestClose(`escape`)},this.handleDialogClick=e=>{e.composedPath().some(e=>e instanceof Element&&e.matches(`[data-dialog="close"], [data-dialog-close]`))&&(e.stopPropagation(),this.requestClose(`close-button`))},this.handleDialogPointerDown=async e=>{e.target===this.dialogElement&&ni(this)&&(this.disablePointerDismissal?await vs(this.dialogElement,`pulse`):this.requestClose(`pointer-dismiss`))},this.onTriggerClick=e=>{e.preventDefault(),this.open=!0},this.onFooterSlotChange=()=>{this.requestUpdate()}}static{this.styles=Bs}hasCustomHeaderSlot(){return this.querySelector(`:scope > [slot="header"]`)!==null}applyYieldPosition(e){let t=this.dialogElement;t.style.position=`fixed`,t.style.top=`${e.top}px`,t.style.left=`${e.left}px`,t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.style.margin=`0`,t.style.maxHeight=`none`,t.style.zIndex=`99`,t.toggleAttribute(`data-yielding`,!0)}clearYieldPosition(){let e=this.dialogElement;e&&(e.style.position=``,e.style.top=``,e.style.left=``,e.style.width=``,e.style.height=``,e.style.margin=``,e.style.maxHeight=``,e.style.zIndex=``,e.removeAttribute(`data-yielding`),this.yieldBox=null)}yieldToHostModal(){if(this.yieldingToHostModal||!this.open||!this.dialogElement?.open)return;let e=this.dialogElement.getBoundingClientRect();this.yieldBox={top:e.top,left:e.left,width:e.width,height:e.height},this.yieldingToHostModal=!0;try{this.dialogElement.close(),this.dialogElement.show(),this.applyYieldPosition(this.yieldBox)}catch{this.yieldingToHostModal=!1,this.clearYieldPosition()}}restoreFromHostModal(){if(this.yieldingToHostModal&&(this.yieldingToHostModal=!1,this.clearYieldPosition(),this.open&&this.dialogElement))try{this.dialogElement.open&&this.dialogElement.close(),this.dialogElement.showModal()}catch{}}firstUpdated(){this.open&&this.show()}disconnectedCallback(){this.disableScrollLock||Co(this),this.removeOpenListeners(),super.disconnectedCallback()}updated(e){super.updated(e),e.has(`open`)&&this.hasUpdated&&this.handleOpenChange()}handleOpenChange(){this.open&&!this.dialogElement.open?this.show():!this.open&&this.dialogElement.open&&(this.open=!0,this.requestClose(`api`))}async show(e=`api`){if(!(this.showing||this.dialogElement?.open)){this.showing=!0;try{let e=new oo;if(!this.dispatchEvent(e)){this.open=!1;return}this.addOpenListeners(),this.previouslyFocused=document.activeElement,this.open=!0,this.dialogElement.showModal(),this.disableScrollLock||So(this),requestAnimationFrame(()=>{let e=this.querySelector(`[autofocus]`);e?(e.shadowRoot?.querySelector(`input, textarea, select, button`)??e).focus({preventScroll:!0}):this.dialogElement.focus({preventScroll:!0})}),await vs(this.dialogElement,`show`),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!0},bubbles:!0,composed:!0})),this.dispatchEvent(new so)}finally{this.showing=!1}}}async hide(e=`unknown`){await this.requestClose(e)}closeDialog(){this.requestClose(`close-button`)}async requestClose(e=`unknown`){let t=new co(typeof e==`string`?e:`close-button`);if(!this.dispatchEvent(t)){this.open=!0,await vs(this.dialogElement,`pulse`);return}this.removeOpenListeners(),await vs(this.dialogElement,`hide`),this.open=!1,this.dialogElement.close(),this.disableScrollLock||Co(this);let n=this.previouslyFocused;this.previouslyFocused=null,n?.isConnected&&window.setTimeout(()=>{n.focus({preventScroll:!0})},0),this.dispatchEvent(new lo),this.dispatchEvent(new CustomEvent(`pk-open-change`,{detail:{open:!1},bubbles:!0,composed:!0}))}forceOverlayReset(){if(this.open=!1,this.yieldingToHostModal=!1,this.clearYieldPosition(),this.removeOpenListeners(),this.dialogElement?.open)try{this.dialogElement.close()}catch{}this.dialogElement?.classList.remove(`hide`,`show`,`pulse`),this.disableScrollLock||Co(this)}addOpenListeners(){document.addEventListener(`keydown`,this.handleDocumentKeyDown),ei(this),this.hostModalObserver?.disconnect(),this.hostModalObserver=zs(this.onHostModalPresenceChange,{ignoreExisting:!0})}removeOpenListeners(){document.removeEventListener(`keydown`,this.handleDocumentKeyDown),ti(this),this.hostModalObserver?.disconnect(),this.hostModalObserver=null,this.yieldingToHostModal=!1,this.clearYieldPosition()}syncHasTriggerAttribute(){this.toggleAttribute(`data-has-trigger`,!!this.triggerElement)}onTriggerSlotChange(e){let[t]=e.target.assignedElements({flatten:!0});this.triggerElement&&this.triggerElement.removeEventListener(`click`,this.onTriggerClick),this.triggerElement=t??null,this.syncHasTriggerAttribute(),this.triggerElement&&this.triggerElement.addEventListener(`click`,this.onTriggerClick)}render(){let e=!this.hasCustomHeaderSlot()&&!this.withoutHeader&&!!this.label,t=e&&!this.withoutBodyPadding,n=this.querySelector(`:scope > [slot="footer"]`)!==null;return E`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <dialog
                part="panel"
                aria-label=${this.label||O}
                class=${I({dialog:!0,open:this.open,"dialog--wide":this.size===`wide`})}
                tabindex="-1"
                @cancel=${this.handleDialogCancel}
                @click=${this.handleDialogClick}
                @pointerdown=${this.handleDialogPointerDown}
            >
                <slot name="header">
                    ${e?E`
                            <header part="header" class="header">
                                <h2 part="title" class="title">
                                    <slot name="label">${this.label}</slot>
                                </h2>
                                ${this.description?E`
                                        <p part="description" class="description">
                                            <slot name="description">${this.description}</slot>
                                        </p>
                                    `:E`<slot name="description" hidden></slot>`}
                                <button type="button" class="close" data-dialog="close" aria-label="Close">
                                    <span class="close-icon" aria-hidden="true">${ut(Vs)}</span>
                                </button>
                            </header>
                        `:O}
                </slot>
                <div
                    part="body"
                    class=${I({body:!0,"body--padded":t})}
                >
                    <slot></slot>
                </div>
                ${n?E`
                        <footer part="footer" class="footer">
                            <slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
                        </footer>
                    `:E`<slot name="footer" @slotchange=${this.onFooterSlotChange} hidden></slot>`}
            </dialog>
        `}};j([M({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),j([M()],X.prototype,`label`,void 0),j([M()],X.prototype,`description`,void 0),j([M({attribute:`disable-pointer-dismissal`,type:Boolean,reflect:!0})],X.prototype,`disablePointerDismissal`,void 0),j([M({attribute:`without-header`,type:Boolean,reflect:!0})],X.prototype,`withoutHeader`,void 0),j([M({attribute:`without-body-padding`,type:Boolean,reflect:!0})],X.prototype,`withoutBodyPadding`,void 0),j([M({attribute:`disable-scroll-lock`,type:Boolean,reflect:!0})],X.prototype,`disableScrollLock`,void 0),j([M({reflect:!0})],X.prototype,`size`,void 0),j([P(`dialog`)],X.prototype,`dialogElement`,void 0),j([N()],X.prototype,`triggerElement`,void 0),X=j([k(`pk-dialog`)],X);var Hs=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Us=at(class extends ot{constructor(e){if(super(e),e.type!==F.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Ar(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=Dr(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=Dr(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=Dr(i[d],a[m]),Er(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=Dr(i[f],a[p]),Er(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Hs(o,p,m),u=Hs(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Er(e,i[d]);Dr(t,a[p]),c[p]=t}else c[p]=Dr(n,a[p]),Er(e,i[d],n),i[t]=null;p++}else jr(i[f]),f--}else jr(i[d]),d++;for(;p<=m;){let t=Er(e,c[m+1]);Dr(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&jr(e)}return this.ut=o,kr(e,c),D}}),Ws=`important`,Gs=` !`+Ws,Ks=at(class extends ot{constructor(e){if(super(e),e.type!==F.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Gs);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Ws:``):n[e]=r}}return D}}),qs=d`
    :host {
        display: block;
        min-width: 0;
        color: var(--pk-color-gray-700, #33404d);
        font: var(--pk-font-size-base, 14px)/1.42
            var(--pk-font-family, system-ui, sans-serif);
    }
    * {
        box-sizing: border-box;
    }
    .toolbar,
    .footer,
    .selection {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
    }
    .header-shell {
        display: flow-root;
    }
    :host([layout='index']) .header-shell {
        /* Keep the frame's 1px outer border clear of the toolbar's 2px mask. */
        margin-block-end: 3px;
        position: sticky;
        top: var(--pk-data-table-header-offset, 0px);
        z-index: 4;
        background: var(--pk-data-table-toolbar-background, var(--pk-color-white, #fff));
        /* Cover the scroll container's inset and the white gap above the table header. */
        box-shadow:
            0 -2px 0 var(--pk-data-table-toolbar-background, var(--pk-color-white, #fff)),
            0 2px 0 var(--pk-data-table-toolbar-background, var(--pk-color-white, #fff));
    }
    .toolbar {
        margin-bottom: 12px;
    }
    .search {
        flex: 1 1 200px;
        min-width: 140px;
    }
    .toolbar-end {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin-inline-start: auto;
    }
    .table-frame {
        padding: 2px;
        background: var(--pk-color-white, #fff);
        border-radius: var(--pk-radius-lg, 5px);
        box-shadow: 0 0 0 1px var(--pk-color-gray-200, #cdd8e4);
    }
    .scroll {
        position: relative;
        overflow: auto;
        border-radius: var(--pk-radius-lg, 5px);
    }
    .scroll:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        outline-offset: 2px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        text-align: start;
    }
    th,
    td {
        padding: var(--pk-data-table-cell-padding, 7px 12px);
        text-align: start;
        vertical-align: middle;
    }
    th {
        padding-block: 14px;
        background: var(--pk-color-gray-50, #f3f7fc);
        color: var(--pk-color-gray-700, #3f4d5a);
        font-size: inherit;
        font-weight: 700;
        white-space: nowrap;
    }
    thead th:first-child {
        border-start-start-radius: var(--pk-radius-lg, 5px);
        border-end-start-radius: var(--pk-radius-lg, 5px);
    }
    thead th:last-child {
        border-start-end-radius: var(--pk-radius-lg, 5px);
        border-end-end-radius: var(--pk-radius-lg, 5px);
    }
    th:not([data-sorted]):has(.sort):hover {
        background: var(--pk-color-gray-100, #e4edf6);
    }
    tbody tr:last-child td {
        border-bottom: 0;
    }
    tbody tr:hover {
        background: var(--pk-color-gray-50, #f3f7fc);
    }
    tbody tr[data-selectable] {
        cursor: default;
    }
    tbody tr[data-selected],
    tbody tr[data-selected]:hover {
        --pk-data-table-cell-color: var(
            --pk-data-table-selected-color,
            var(--pk-color-white, #fff)
        );
        --pk-data-table-cell-muted-color: var(
            --pk-data-table-selected-color,
            var(--pk-color-white, #fff)
        );
        --pk-status-label-color: var(--pk-data-table-cell-color);
        --pk-status-label-neutral-tint: var(--pk-data-table-cell-color);
        --pk-status-ring: var(--pk-color-gray-200);
        background: var(
            --pk-data-table-selected-background,
            var(--pk-color-gray-500, #606d7b)
        );
        color: var(--pk-data-table-cell-color);
    }
    td {
        color: var(--pk-data-table-cell-color, inherit);
        max-width: 33vw;
        overflow-wrap: break-word;
    }
    .cell-link {
        display: block;
        max-width: 33vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cell-handle {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        padding-inline-start: 6px;
        border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
        border-radius: var(--pk-radius-md, 4px);
        color: var(--pk-data-table-cell-muted-color, var(--pk-color-gray-550, #596673));
    }
    .cell-handle code {
        font-family: var(--pk-font-family-mono, ui-monospace, monospace);
        font-size: 12px;
        overflow-wrap: anywhere;
    }
    .cell-handle pk-copy-button {
        flex: none;
        --pk-btn-height-default: 24px;
        --pk-btn-icon-size-default: 12px;
        --pk-copy-button-color: currentColor;
        --pk-copy-button-hover-color: currentColor;
        --pk-copy-button-background: transparent;
        --pk-copy-button-hover-background: transparent;
        --pk-copy-button-border-color: transparent;
    }
    .cell-handle .icon {
        width: var(--pk-btn-icon-size-default, 12px);
        height: var(--pk-btn-icon-size-default, 12px);
    }
    .row-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
    }
    .row-handle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--pk-btn-height-xs, 26px);
        height: var(--pk-btn-height-xs, 26px);
        padding: 0;
        border: 0;
        border-radius: var(--pk-radius-md, 4px);
        background: transparent;
        color: var(--pk-data-table-cell-muted-color, var(--pk-color-gray-550, #596673));
        cursor: move;
        touch-action: none;
        user-select: none;
        font: inherit;
    }
    .row-handle:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        outline-offset: 2px;
    }
    .row-handle[aria-disabled='true'] {
        cursor: default;
        opacity: 0.4;
    }
    tbody[data-row-dragging] tr {
        position: relative;
        background: var(--pk-color-white, #fff);
    }
    tbody tr[data-dragging] {
        z-index: 2;
        box-shadow: var(--pk-shadow-popup, 0 4px 12px rgb(0 0 0 / 0.15));
    }
    .row-order-hint {
        margin: 0 0 8px;
        color: var(--pk-color-gray-550, #596673);
    }
    .row-action::part(base) {
        color: var(--pk-data-table-cell-muted-color, var(--pk-color-gray-550, #596673));
    }
    .row-action[data-preset='move']::part(base):not(:disabled) {
        cursor: move;
    }
    tbody tr[data-selected] td {
        background: var(
            --pk-data-table-selected-background,
            var(--pk-color-gray-500, #606d7b)
        );
    }
    thead + tbody tr:first-child td {
        border-block-start: 1px solid var(--pk-color-white, #fff);
    }
    tbody tr + tr td {
        border-top: 1px solid transparent;
    }
    tbody tr[data-selected] + tr[data-selected] td {
        border-top-color: var(--pk-color-gray-300);
    }
    tbody tr[data-selected] a {
        color: inherit;
    }
    tbody tr[data-selected] pk-button[slot='trigger']::part(base) {
        color: var(--pk-data-table-cell-color);
    }
    tbody tr[data-selected] pk-checkbox {
        color: var(--pk-color-gray-700, #33404d);
    }

    .nowrap {
        white-space: nowrap;
        max-width: none;
    }
    .end {
        text-align: end;
        font-variant-numeric: tabular-nums;
    }
    .center {
        text-align: center;
    }
    .small {
        width: 1%;
        white-space: nowrap;
    }
    th[data-sortable] {
        padding: 0;
    }
    .sort {
        border: 0;
        background: none;
        color: inherit;
        font: inherit;
        padding-block: 14px;
        padding-inline: 14px 35px;
        position: relative;
        text-align: inherit;
        cursor: pointer;
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
    }
    .sort:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        outline-offset: -2px;
    }
    a {
        color: var(--pk-color-blue-600, #176696);
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    .footer {
        min-height: 48px;
        padding: 8px;
        background: color-mix(
            in srgb,
            var(--pk-color-gray-100, #e4edf6) 75%,
            transparent
        );
        border-radius: 0 0 var(--pk-radius-lg, 5px) var(--pk-radius-lg, 5px);
        color: var(--pk-color-gray-550, #596673);
        font-size: inherit;
        font-weight: 400;
    }
    .pager {
        display: flex;
        gap: 6px;
        align-items: center;
    }
    .filter-input::part(header),
    .search::part(header) {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
    }
    .column-option {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .column-option {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .range > * {
        flex: 1;
        min-width: 0;
    }
    .column-option {
        position: relative;
        padding: 0;
        min-height: 24px;
        gap: 4px;
    }
    .column-list[data-reordering] .column-option {
        transition: transform 120ms ease;
    }
    .column-option pk-checkbox {
        flex: 1;
    }
    select {
        font: inherit;
        color: inherit;
        background: var(--pk-color-white, #fff);
        border: 1px solid var(--pk-color-gray-250, #cbd5df);
        border-radius: var(--pk-radius-md, 4px);
        padding: 5px 8px;
        max-width: 100%;
    }

    .filter-trigger {
        /* Input adornments default to icon dimensions; this is an interactive control. */
        display: inline-flex;
        max-width: none;
        max-height: none;
    }
    .filter-trigger::part(base) {
        background: transparent;
    }
    .filter-trigger[slot="end"] {
        margin-inline-end: calc(-1 * var(--pk-input-padding-inline, 8px));
    }
    .filter-dialog {
        --pk-dialog-width: min(680px, calc(100vw - 32px));
    }
    .filter-dialog::part(panel) {
        color: var(--pk-color-gray-700);
        box-shadow: var(--pk-shadow-popup);
    }
    .filter-dialog[data-anchored]::part(panel) {
        /* Anchored filters behave like a popup, without the modal entrance/exit delay. */
        animation: none;
        margin: 0;
        inset: auto;
        top: var(--filter-top);
        left: var(--filter-left);
        width: var(--filter-width);
        max-height: var(--filter-max-height);
    }
    .filter-dialog[data-anchored]::part(panel)::backdrop {
        animation: none;
        background: transparent;
    }
    .filter-dialog::part(footer) {
        background: var(--pk-color-white);
        border-top: 0;
        padding: 0 24px 24px;
    }
    .filter-builder {
        padding: 24px;
    }
    .filter-intro {
        margin: 0 0 12px;
        color: var(--pk-color-gray-700);
    }
    .filter-rule {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 7px;
        border: 1px solid var(--pk-color-gray-200);
        background: var(--pk-color-gray-50);
    }
    .filter-rule:first-of-type {
        border-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
    }
    .filter-rule + .filter-rule {
        border-top: 0;
    }
    .filter-type,
    .filter-operator {
        height: 34px;
        flex: 0 1 150px;
        min-width: 80px;
    }
    .filter-type {
        font-weight: 600;
    }
    .filter-values,
    .filter-value {
        flex: 1 1 160px;
        min-width: 0;
    }
    .filter-values {
        display: flex;
        gap: 8px;
    }
    .filter-values > * {
        flex: 1;
        min-width: 0;
    }
    .filter-values .filter-input {
        width: 100%;
    }
    .filter-remove {
        flex: none;
        margin-inline-start: auto;
    }
    .filter-add {
        padding: 7px;
        border: 1px dashed var(--pk-color-gray-250);
        border-radius: var(--pk-radius-lg);
    }
    .filter-rule + .filter-add {
        border-top: 0;
        border-radius: 0 0 var(--pk-radius-lg) var(--pk-radius-lg);
    }
    .filter-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
    }
    .filter-footer-spacer {
        flex: 1;
    }
    .filter-error {
        margin: 12px 0 0;
        color: var(--pk-color-rose-600);
    }
    .filter-builder slot[name='filters']::slotted(*) {
        margin-block-start: 16px;
    }
    .filter-dialog:not([data-anchored]) .filter-rule {
        flex-wrap: wrap;
    }
    .filter-dialog:not([data-anchored]) .filter-values,
    .filter-dialog:not([data-anchored]) .filter-value {
        flex-basis: calc(100% - 46px);
        order: 2;
    }
    .filter-dialog:not([data-anchored]) .filter-type,
    .filter-dialog:not([data-anchored]) .filter-operator {
        flex: 1 1 40%;
    }
    .filter-dialog:not([data-anchored]) .filter-remove {
        order: 3;
    }
    @media (max-width: 480px) {
        .filter-builder {
            padding: 16px;
        }
        .filter-dialog::part(footer) {
            padding: 0 16px 16px;
        }
        .filter-footer {
            flex-wrap: wrap;
        }
        .filter-footer pk-button {
            font-size: 13px;
        }
    }
    .selection {
        flex: 1 1 auto;
        justify-content: center;
        min-height: 30px;
        color: var(--pk-color-gray-700, #33404d);
    }
    .selection[data-empty] {
        visibility: hidden;
        pointer-events: none;
    }
    .selection-count {
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
    }
    .selection ::slotted(*) {
        max-width: 100%;
    }

    tbody[data-loading] {
        visibility: hidden;
    }
    .loading-space {
        height: var(--pk-state-panel-min-height, 11rem);
    }
    .loading-indicator {
        position: absolute;
        inset: var(--_pk-data-table-heading-height, 0px) 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    .footer-shell {
        min-width: 0;
    }
    :host([layout='index']) .footer-shell {
        position: sticky;
        bottom: var(--pk-data-table-footer-offset, 0px);
        z-index: 3;
        background: var(--pk-color-white);
        border-radius: 0 0 var(--pk-radius-lg, 5px) var(--pk-radius-lg, 5px);
    }
    .scrollbar {
        overflow-x: scroll;
        overflow-y: hidden;
        height: 16px;
        background: var(--pk-color-gray-50);
    }
    .scrollbar > div {
        height: 1px;
    }
    .scrollbar:focus-visible {
        outline: 2px solid var(--pk-color-sky-600);
        outline-offset: -2px;
    }
    .scroll[data-proxy] {
        scrollbar-width: none;
    }
    .scroll[data-proxy]::-webkit-scrollbar {
        display: none;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    .busy {
        opacity: 0.55;
        pointer-events: none;
    }
    :host([size='compact']) {
        --pk-data-table-cell-padding: 5px 10px;
    }
    :host([size='compact']) th {
        padding-block: 8px;
    }
    :host([size='compact']) th[data-sortable] {
        padding: 0;
    }
    :host([size='compact']) .sort {
        padding-block: 8px;
    }
    .icon {
        display: inline-flex;
        width: 1em;
        height: 1em;
        flex: none;
    }
    .icon svg {
        width: 100%;
        height: 100%;
    }
    .search .direction-icon {
        width: 16px;
        height: 16px;
    }
    .direction-icon {
        width: 20px;
        height: 20px;
    }
    th[data-sorted] {
        background: var(--pk-color-gray-200, #cdd8e4);
    }
    th.end .sort {
        justify-content: flex-end;
    }
    th.center .sort {
        justify-content: center;
    }
    .sort .icon {
        position: absolute;
        inset-inline-end: 14px;
        width: 10px;
        height: 10px;
        color: var(--pk-color-gray-500, #667482);
    }
    .sort .sort-spinner {
        position: absolute;
        inset-inline-end: 11px;
    }
    .footer-actions {
        margin-inline-start: auto;
    }
    .pager {
        gap: 3px;
    }
    .pager > span {
        margin-inline-start: 4px;
    }
    .pager pk-button::part(base) {
        width: 30px;
        height: 30px;
        min-height: 30px;
        padding: 0;
        color: var(--pk-color-gray-700);
        border-color: var(--pk-color-gray-400);
        background: transparent;
        opacity: 1;
    }
    .pager .icon {
        width: 10px;
        height: 10px;
    }
    .view-popover > pk-button,
    .footer-actions pk-button {
        --pk-btn-caret-size: 10px;
    }
    .view-popover {
        --pk-popover-flush-min-width: min(400px, calc(100vw - 20px));
        --pk-popover-flush-max-width: min(400px, calc(100vw - 20px));
        --pk-shadow-popover: var(--pk-shadow-popup);
    }
    .view-popover[open] > pk-button::part(base),
    .footer-actions pk-button[aria-expanded='true']::part(base) {
        background: var(--pk-color-slate-500);
    }
    .view-sort pk-button::part(base) {
        width: 42px;
        padding-inline: 0;
    }
    .pager pk-button:not([disabled])::part(base):hover {
        color: var(--pk-color-gray-800);
        border-color: var(--pk-color-gray-600);
        background: var(--pk-color-gray-200);
    }
    .pager pk-button:not([disabled])::part(base):focus-visible {
        border-color: var(--pk-color-gray-600);
        box-shadow: none;
        outline: 2px solid var(--pk-color-gray-600);
        outline-offset: 2px;
    }
    .pager pk-button:not([disabled])::part(base):active {
        color: var(--pk-color-white);
        border-color: var(--pk-color-gray-600);
        background: var(--pk-color-gray-600);
    }
    .pager pk-button[disabled]::part(base) {
        color: var(--pk-color-gray-300);
        border-color: var(--pk-color-gray-200);
    }
    .view-grid {
        display: grid;
        grid-template-columns: 150px minmax(0, 1fr);
    }
    .view-label {
        padding: 14px;
        background: var(--pk-color-white, #fff);
        border-inline-end: 1px solid var(--pk-color-gray-200, #dbe2e8);
        color: var(--pk-color-gray-600, #526171);
    }
    .view-sort {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        min-width: 0;
    }
    .view-sort pk-select {
        flex: 1;
        min-width: 0;
    }
    .view-sort pk-button-group {
        flex: none;
    }
    .columns-label,
    .column-list {
        border-top: 1px solid var(--pk-color-gray-200, #dbe2e8);
    }
    .column-list {
        padding: 8px 10px;
        max-height: min(360px, 45vh);
        overflow-y: auto;
        overscroll-behavior: contain;
    }
    .column-handle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 24px;
        flex: none;
        border: 0;
        padding: 2px;
        background: transparent;
        color: var(--pk-color-gray-500, #667482);
        cursor: move;
        touch-action: none;
    }
    .column-handle:active {
        cursor: move;
    }
    .column-handle:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        border-radius: 3px;
    }
    .column-list[data-reordering] .column-option[data-dragging] {
        z-index: 1;
        background: var(--pk-color-white, #fff);
        transition: none;
        user-select: none;
    }
    @media (prefers-reduced-motion: reduce) {
        .column-list[data-reordering] .column-option {
            transition: none;
        }
    }
    .view-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 24px;
        background: var(--pk-color-gray-50, #f3f7fc);
    }
    @media (max-width: 520px) {
        .search {
            flex-basis: 100%;
        }
        .selection {
            order: 3;
            flex-basis: 100%;
            justify-content: flex-start;
        }
        .view-grid {
            grid-template-columns: 100px minmax(0, 1fr);
        }
        .view-label {
            padding: 14px 12px;
        }
        .view-sort {
            flex-wrap: wrap;
            padding: 12px;
        }
        .view-sort pk-select {
            flex-basis: 100%;
        }
        .column-list {
            padding-inline: 10px;
        }
    }
`;function Js(e){let t;switch(e.type){case`text`:t=[`contains`,`equals`,`not-equals`,`not-contains`,`starts-with`,`ends-with`,`empty`,`not-empty`];break;case`number-range`:case`date-range`:t=[`between`,`equals`,`not-equals`,`greater-than`,`at-least`,`less-than`,`at-most`,`empty`,`not-empty`];break;case`multi-select`:t=[`in`,`not-in`,`empty`,`not-empty`];break;case`boolean`:t=[`equals`,`empty`,`not-empty`];break;default:t=[`equals`,`not-equals`,`empty`,`not-empty`]}let n=e.operators?.filter(e=>t.includes(e));return n?.length?n:t}function Ys(e,t){let n=Js(e);return t&&n.includes(t)?t:n[0]}var Xs=e=>e!==`empty`&&e!==`not-empty`,Zs=e=>Array.isArray(e)?e.every(e=>!e.trim()):!e.trim();function Qs(e,t,n,r,i){let a=Ys(e,r),o=t==null||t===``||Array.isArray(t)&&!t.length;if(a===`empty`)return o;if(a===`not-empty`)return!o;if(Zs(n))return!0;if(e.type===`number-range`||e.type===`date-range`){if(o)return!1;let r=e.type===`date-range`,i=r?Date.parse(String(t)):Number(t),[s=``,c=``]=Array.isArray(n)?n:[n],l=r?Date.parse(s):Number(s),u=r?Date.parse(c)+864e5-1:Number(c);if(!Number.isFinite(i))return!1;if(a===`between`)return(!s||i>=l)&&(!c||i<=u);if(!Number.isFinite(l))return!1;let d=r?l+864e5-1:l;return a===`equals`?i>=l&&i<=d:a===`not-equals`?i<l||i>d:a===`greater-than`?i>d:a===`at-least`?i>=l:a===`less-than`?i<l:i<=d}let s=t==null?``:String(t),c=Array.isArray(n)?n:[n];if(a===`in`||a===`not-in`){let e=c.includes(s);return a===`in`?e:!e}let l=e.type===`text`?s.toLocaleLowerCase(i):s,u=e.type===`text`?String(n).toLocaleLowerCase(i):String(n);switch(a){case`equals`:return l===u;case`not-equals`:return l!==u;case`not-contains`:return!l.includes(u);case`starts-with`:return l.startsWith(u);case`ends-with`:return l.endsWith(u);default:return l.includes(u)}}var $s={search:`Search`,clearSearch:`Clear search`,pagination:`{label} pagination`,scrollColumns:`Scroll {label} columns`,sortDirection:`Sort direction`,filters:`Filters`,filterResults:`Filter results`,addFilter:`Add a filter`,allFiltersAdded:`All filters added`,filterMatch:`Match all of the following conditions:`,filterType:`Filter type`,filterOperator:`{label}: Operator`,removeFilter:`Remove {label} filter`,applyFilters:`Apply`,cancelFilters:`Cancel`,filterRangeError:`{label}: the end must be on or after the start.`,filterValueError:`{label}: enter a valid value.`,filterContains:`contains`,filterNotContains:`does not contain`,filterEquals:`equals`,filterNotEquals:`does not equal`,filterStartsWith:`begins with`,filterEndsWith:`ends with`,filterIn:`is one of`,filterNotIn:`is not one of`,filterBetween:`is between`,filterGreaterThan:`is greater than`,filterAtLeast:`is at least`,filterLessThan:`is less than`,filterAtMost:`is at most`,filterAfter:`is after`,filterOnOrAfter:`is on or after`,filterBefore:`is before`,filterOnOrBefore:`is on or before`,filterEmpty:`is empty`,filterNotEmpty:`has a value`,columns:`Table Columns`,view:`View`,sortBy:`Sort by`,defaultOrder:`Default order`,ascending:`Ascending`,descending:`Descending`,defaults:`Use defaults`,close:`Close`,reorder:`Reorder {label}`,reorderHelp:`Drag to reorder, or use the Up and Down arrow keys.`,reordered:`{label} moved to position {position} of {count}.`,export:`Export`,exporting:`Exporting…`,clear:`Clear filters`,all:`All`,yes:`Yes`,no:`No`,from:`From`,to:`To`,previous:`Previous`,next:`Next`,empty:`No records yet`,noResults:`No matching records`,loading:`Loading…`,updating:`Updating…`,error:`Unable to load records`,retry:`Retry`,selectPage:`Select this page`,selectRow:`Select {id}`,selected:`{count} selected`,range:`{start}–{end} of {total}`,unknownRange:`{start}–{end}`,actions:`Actions for {id}`,editAction:`Edit`,moveAction:`Move`,deleteAction:`Delete`,rowAction:`{label}: {id}`,copyHandle:`Copy {label}`,copiedHandle:`Copied {label}`,rowOrder:`Row order`,reorderRow:`Reorder {label}`,reorderRowHelp:`Drag to reorder, or use Up and Down. Home moves to the start of this page; End moves to the end. Escape cancels a drag.`,reorderRowsFiltered:`Clear search and filters to reorder rows.`,rowReordered:`{label} moved to position {position} of {count} on this page.`,rowReorderCancelled:`Row move cancelled.`,moveUp:`Move {label} earlier`,moveDown:`Move {label} later`,sort:`Sort by {label}`},ec=()=>({search:``,sort:[],filters:{},pageIndex:0,pageSize:25}),tc=(e,t)=>`cell-${typeof e}-${encodeURIComponent(String(e))}-${encodeURIComponent(t)}`,nc=(e,t)=>t.value?t.value(e):e[t.id];function Z(e){return e==null?``:Array.isArray(e)?e.join(`, `):String(e)}function rc(e,t,n,r,i){let a=r.search.trim().toLocaleLowerCase(i),o=e.filter(e=>a&&!t.some(t=>t.searchable!==!1&&Z(nc(e,t)).toLocaleLowerCase(i).includes(a))?!1:n.every(t=>{let n=r.filters[t.id];return n==null||Qs(t,t.value?t.value(e):e[t.id],n,r.filterOperators?.[t.id],i)})),s=new Intl.Collator(i,{numeric:!0,sensitivity:`base`});o.sort((e,n)=>{for(let i of r.sort){let r=t.find(e=>e.id===i.id&&e.sortable);if(!r)continue;let a=nc(e,r),o=nc(n,r),c=r.type===`date`?(Date.parse(Z(a))||0)-(Date.parse(Z(o))||0):r.type===`number`&&Number.isFinite(Number(a))&&Number.isFinite(Number(o))?Number(a)-Number(o):typeof a==`number`&&typeof o==`number`?a-o:s.compare(Z(a),Z(o));if(c)return i.direction===`asc`?c:-c}return 0});let c=r.pageIndex*r.pageSize;return{rows:o.slice(c,c+r.pageSize),total:o.length,hasNext:c+r.pageSize<o.length}}var ic=class{constructor(){this.generation=0}cancel(){this.generation++,this.abort?.abort()}async load(e,t){this.cancel();let n=this.generation,r=this.abort=new AbortController;try{let i=await e(structuredClone(t),{signal:r.signal});return n===this.generation?i:void 0}catch(e){if(n===this.generation)throw e;return}}},ac={contains:`filterContains`,"not-contains":`filterNotContains`,equals:`filterEquals`,"not-equals":`filterNotEquals`,"starts-with":`filterStartsWith`,"ends-with":`filterEndsWith`,in:`filterIn`,"not-in":`filterNotIn`,between:`filterBetween`,"greater-than":`filterGreaterThan`,"at-least":`filterAtLeast`,"less-than":`filterLessThan`,"at-most":`filterAtMost`,empty:`filterEmpty`,"not-empty":`filterNotEmpty`},oc=class{constructor(e){this.host=e,this.rules=[],this.error=``,this.opened=!1,this.closing=!1,this.preserveUnknown=!0,this.signature=``,this.position=()=>{let e=this.host.renderRoot.querySelector(`.search`)??this.host.renderRoot.querySelector(`.toolbar`),t=this.dialog;if(!e||!t)return;let n=e.getBoundingClientRect(),r=this.host.ownerDocument.defaultView,i=n.width>=450&&n.bottom>=0&&r.innerHeight-n.bottom>=240;t.toggleAttribute(`data-anchored`,i),t.style.setProperty(`--filter-left`,`${Math.max(8,Math.min(n.left+1,r.innerWidth-n.width-8))}px`),t.style.setProperty(`--filter-top`,`${n.bottom}px`),t.style.setProperty(`--filter-width`,`${n.width-2}px`),t.style.setProperty(`--filter-max-height`,`${Math.max(200,r.innerHeight-n.bottom-12)}px`)},e.addController(this)}text(e,t={}){return(this.host.labels[e]??$s[e]).replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??e))}get dialog(){return this.host.renderRoot.querySelector(`.filter-dialog`)}get trigger(){return this.host.renderRoot.querySelector(`.filter-trigger`)}get available(){return this.host.filters.filter(e=>!this.rules.some(t=>t.id===e.id))}get querySignature(){return JSON.stringify([this.host.query.filters,this.host.query.filterOperators,this.host.filters])}hostUpdated(){this.opened&&!this.closing&&this.signature!==this.querySignature&&(this.resetDraft(),this.host.requestUpdate())}hostDisconnected(){this.stopObserving(),this.pendingAdd=void 0,this.opened=!1,this.closing=!1}resetDraft(){this.rules=this.host.filters.filter(e=>Object.hasOwn(this.host.query.filters,e.id)).map(e=>({id:e.id,operator:Ys(e,this.host.query.filterOperators?.[e.id]),value:structuredClone(this.host.query.filters[e.id])})),this.error=``,this.preserveUnknown=!0,this.signature=this.querySignature}stopObserving(){this.positionFrame!==void 0&&cancelAnimationFrame(this.positionFrame),this.positionFrame=void 0,this.resizeObserver?.disconnect(),this.resizeObserver=void 0;let e=this.host.ownerDocument.defaultView;e?.removeEventListener(`resize`,this.position),e?.removeEventListener(`scroll`,this.position,!0)}async show(){if(this.opened||this.closing)return;this.resetDraft(),this.opened=!0,this.host.requestUpdate(),await this.host.updateComplete;let e=this.dialog;if(!e||!this.host.isConnected)return;await e.updateComplete,this.position(),this.resizeObserver=new ResizeObserver(()=>{this.positionFrame!==void 0&&cancelAnimationFrame(this.positionFrame),this.positionFrame=requestAnimationFrame(()=>{this.positionFrame=void 0,this.position()})});let t=this.host.renderRoot.querySelector(`.search`)??this.host.renderRoot.querySelector(`.toolbar`);t&&this.resizeObserver.observe(t),this.host.ownerDocument.defaultView?.addEventListener(`resize`,this.position),this.host.ownerDocument.defaultView?.addEventListener(`scroll`,this.position,!0),await e.show(),this.focusRule(this.rules[0]?.id)}focusRule(e){((e?this.host.renderRoot.querySelector(`.filter-rule[data-id="${CSS.escape(e)}"] .filter-type`):this.host.renderRoot.querySelector(`.add-filter`))??this.host.renderRoot.querySelector(`.filter-apply`))?.focus({preventScroll:!0})}afterHide(e){e.target===this.dialog&&(this.stopObserving(),this.opened=!1,this.closing=!1,this.error=``,this.host.requestUpdate(),setTimeout(()=>{!this.opened&&this.host.isConnected&&this.trigger?.focus({preventScroll:!0})},0))}async close(){this.closing||(this.closing=!0,await this.dialog?.hide())}change(e,t){this.rules=this.rules.map(n=>n.id===e?{...n,...t}:n),this.error=``,this.host.requestUpdate()}async add(e){let t=this.available.find(t=>t.id===e);t&&(this.rules=[...this.rules,{id:e,operator:Ys(t),value:``}],this.host.requestUpdate(),await this.host.updateComplete,this.focusRule(e))}async remove(e){let t=this.rules.findIndex(t=>t.id===e);this.rules=this.rules.filter(t=>t.id!==e),this.error=``,this.host.requestUpdate(),await this.host.updateComplete,this.focusRule(this.rules[t]?.id??this.rules[t-1]?.id)}clearDraft(){this.rules=[],this.preserveUnknown=!1,this.error=``,this.host.requestUpdate(),this.host.updateComplete.then(()=>this.focusRule())}operatorLabel(e,t){if(e.type===`date-range`){let e={"greater-than":`filterAfter`,"at-least":`filterOnOrAfter`,"less-than":`filterBefore`,"at-most":`filterOnOrBefore`};if(e[t])return this.text(e[t])}return this.text(ac[t])}async apply(){if(this.closing)return;let e=this.preserveUnknown?{...this.host.query.filters}:{},t=this.preserveUnknown?{...this.host.query.filterOperators}:{};for(let n of this.host.filters)delete e[n.id],delete t[n.id];for(let n of this.rules){let r=this.host.filters.find(e=>e.id===n.id);if(r&&!(Xs(n.operator)&&Zs(n.value))){if(Xs(n.operator)&&(r.type===`number-range`||r.type===`date-range`)){let e=(Array.isArray(n.value)?n.value:[n.value]).map(e=>e?r.type===`date-range`?Date.parse(e):Number(e):void 0);if(e.some(e=>e!==void 0&&!Number.isFinite(e))?this.error=this.text(`filterValueError`,{label:r.label}):n.operator===`between`&&e[0]!=null&&e[1]!=null&&e[0]>e[1]&&(this.error=this.text(`filterRangeError`,{label:r.label})),this.error){this.host.requestUpdate(),await this.host.updateComplete,this.focusRule(n.id);return}}e[n.id]=Xs(n.operator)?structuredClone(n.value):``,n.operator!==Ys(r)&&(t[n.id]=n.operator)}}let n=JSON.stringify([e,t])!==JSON.stringify([this.host.query.filters,this.host.query.filterOperators??{}]);this.closing=!0,n&&this.host.setQuery({filters:e,filterOperators:t}),await this.dialog?.hide()}renderValue(e,t){if(!Xs(t.operator))return O;if(e.type===`select`||e.type===`multi-select`||e.type===`boolean`){let n=e.type===`boolean`?[{value:`true`,label:this.text(`yes`)},{value:`false`,label:this.text(`no`)}]:e.options??[];return E`<pk-select
                class="filter-value"
                width="full"
                aria-label=${e.label}
                .placeholder=${this.text(`all`)}
                .multiple=${e.type===`multi-select`}
                .value=${Array.isArray(t.value)?``:t.value}
                .values=${Array.isArray(t.value)?t.value:t.value?[t.value]:[]}
                @change=${n=>{let r=n.currentTarget;this.change(t.id,{value:e.type===`multi-select`?[...r.values]:r.value})}}
                >${n.map(e=>E`<pk-option .value=${e.value}>${e.label}</pk-option>`)}</pk-select
            >`}let n=t.operator===`between`,r=n?Array.isArray(t.value)?t.value:[t.value,``]:[Array.isArray(t.value)?t.value[0]??``:t.value];return E`<div class="filter-values">
            ${r.map((i,a)=>E`<pk-input
                        class="filter-input"
                        type=${e.type===`date-range`?`date`:e.type===`number-range`?`number`:`text`}
                        .label=${n?`${e.label}: ${this.text(a?`to`:`from`)}`:e.label}
                        .placeholder=${n?this.text(a?`to`:`from`):``}
                        .value=${i}
                        @input=${e=>{let i=e.currentTarget.value,o=[...r];o[a]=i,this.change(t.id,{value:n?o:i})}}
                    ></pk-input>`)}
        </div>`}renderTrigger(e){if(!this.host.filters.length&&!this.host.showFilters)return O;let t=Object.keys(this.host.query.filters).length+(this.host.query.criteria&&Object.keys(this.host.query.criteria).length?1:0);return E`<pk-button
            class="filter-trigger"
            slot=${e??O}
            variant="transparent"
            size="sm"
            ?data-active=${this.opened||t>0}
            aria-label=${`${this.text(`filters`)}${t?` (${t})`:``}`}
            aria-haspopup="dialog"
            aria-expanded=${this.opened?`true`:`false`}
            @click=${()=>this.show()}
            ><svg
                class="direction-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path
                    d="M3 4h18a1 1 0 0 1 .8 1.6L15 14v6a1 1 0 0 1-1.5.86l-4-2.4A1 1 0 0 1 9 17.6V14L2.2 5.6A1 1 0 0 1 3 4Z"
                /></svg
            >${t?E`<span>${t}</span>`:O}</pk-button
        >`}renderDialog(){return E`<pk-dialog
            class="filter-dialog"
            .label=${this.text(`filterResults`)}
            without-header
            @pk-after-hide=${e=>this.afterHide(e)}
            @keydown=${e=>{e.key===`Enter`&&e.composedPath().some(e=>e.localName===`pk-input`)&&!e.composedPath().some(e=>e.localName===`pk-select`)&&(e.preventDefault(),this.apply())}}
            ><div class="filter-builder" part="filter-builder">
                ${this.rules.length?E`<p class="filter-intro">${this.text(`filterMatch`)}</p>`:O}
                ${Us(this.rules,e=>e.id,(e,t)=>{let n=this.host.filters.find(t=>t.id===e.id);return n?E`<div
                            class="filter-rule"
                            part="filter-rule"
                            data-id=${e.id}
                            role="group"
                            aria-label=${n.label}
                        >
                            <pk-select
                                class="filter-type"
                                aria-label=${`${n.label}: ${this.text(`filterType`)}`}
                                width="full"
                                .value=${e.id}
                                @change=${t=>{this.pendingType={id:e.id,nextId:t.currentTarget.value}}}
                                @pk-after-hide=${t=>{if(t.target!==t.currentTarget||this.pendingType?.id!==e.id)return;let n=this.pendingType.nextId;this.pendingType=void 0;let r=this.host.filters.find(e=>e.id===n);r&&n!==e.id&&(this.change(e.id,{id:n,operator:Ys(r),value:``}),this.host.updateComplete.then(()=>this.focusRule(n)))}}
                            >
                                ${[n,...this.available].map(e=>E`<pk-option .value=${e.id}>${e.label}</pk-option>`)}
                            </pk-select>
                            <pk-select
                                class="filter-operator"
                                width="full"
                                .value=${e.operator}
                                aria-label=${this.text(`filterOperator`,{label:n.label})}
                                @change=${t=>{let r=t.currentTarget.value;this.change(e.id,{operator:r,value:r===`between`?Array.isArray(e.value)?e.value:[e.value,``]:n.type===`multi-select`?e.value:Array.isArray(e.value)?e.value[0]??``:e.value})}}
                            >
                                ${Js(n).map(e=>E`<pk-option .value=${e}>${this.operatorLabel(n,e)}</pk-option>`)}
                            </pk-select>
                            ${this.renderValue(n,e)}
                            <pk-button
                                class="filter-remove"
                                variant="transparent"
                                size="sm"
                                aria-label=${this.text(`removeFilter`,{label:n.label})}
                                @click=${()=>this.remove(e.id)}
                                ><span class="icon" aria-hidden="true"
                                    >${ut(z(B.xmark))}</span
                                ></pk-button
                            >
                        </div>`:O})}
                ${this.host.filters.length?E`<div class="filter-add">
                              <pk-select
                                  class="add-filter"
                                  aria-label=${this.text(`addFilter`)}
                                  .placeholder=${this.available.length?this.text(`addFilter`):this.text(`allFiltersAdded`)}
                                  .disabled=${!this.available.length}
                                  .value=${``}
                                  @change=${e=>{let t=e.currentTarget,n=t.value;t.value=``,this.pendingAdd=n}}
                                  @pk-after-hide=${e=>{if(e.target!==e.currentTarget||!this.pendingAdd)return;let t=this.pendingAdd;this.pendingAdd=void 0,this.add(t)}}
                                  >${this.available.map(e=>E`<pk-option .value=${e.id}>${e.label}</pk-option>`)}</pk-select
                              >
                          </div>`:O}
                <slot name="filters"></slot>
                ${this.error?E`<p class="filter-error" role="alert">${this.error}</p>`:O}
            </div>
            <div slot="footer" class="filter-footer" part="filter-footer">
                <pk-button
                    variant="transparent"
                    .disabled=${!this.rules.length&&!Object.keys(this.host.query.filters).length}
                    @click=${()=>this.clearDraft()}
                    >${this.text(`clear`)}</pk-button
                >
                <span class="filter-footer-spacer"></span>
                <pk-button @click=${()=>this.close()}
                    >${this.text(`cancelFilters`)}</pk-button
                >
                <pk-button
                    class="filter-apply"
                    variant="secondary"
                    @click=${()=>this.apply()}
                    >${this.text(`applyFilters`)}</pk-button
                >
            </div></pk-dialog
        >`}},sc=class{constructor(e,t,n){this.enabled=e,this.commit=t,this.cancelled=n}get active(){return!!this.session}start(e){if(!this.enabled()||this.session||e.button!==0||!e.isPrimary)return;let t=e.currentTarget,n=t.closest(`tr`),r=n?.parentElement;if(!n||!(r instanceof HTMLTableSectionElement))return;let i=r.getBoundingClientRect(),a=[...r.rows].map(e=>{let t=e.getBoundingClientRect();return{element:e,top:t.top-i.top,height:t.height}}),o=a.findIndex(e=>e.element===n);if(o<0||a.length<2)return;e.preventDefault(),t.focus({preventScroll:!0});let s=e=>{let t=this.session;t&&e.pointerId===t.pointerId&&(e.preventDefault(),t.pointerY=e.clientY,!(!t.moved&&Math.abs(e.clientY-t.startY)<4)&&(t.moved=!0,r.setAttribute(`data-row-dragging`,``),n.setAttribute(`data-dragging`,``),this.preview()))},c=e=>{let t=this.session;if(!t||e.pointerId!==t.pointerId)return;let n=e.type===`pointerup`&&t.moved&&this.enabled();this.cancel(!1),n&&this.commit(t.fromIndex,t.toIndex)},l=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),this.cancel())},u=()=>this.cancel(),d=t.ownerDocument,f=d.defaultView;t.addEventListener(`pointermove`,s),t.addEventListener(`pointerup`,c),t.addEventListener(`pointercancel`,u),t.addEventListener(`lostpointercapture`,u),d.addEventListener(`keydown`,l,!0),f.addEventListener(`blur`,u),f.addEventListener(`resize`,u),this.session={handle:t,body:r,width:i.width,rows:a,fromIndex:o,toIndex:o,pointerId:e.pointerId,startY:e.clientY,pointerY:e.clientY,grabOffset:e.clientY-n.getBoundingClientRect().top,moved:!1,scrollParents:this.scrollParents(r),cleanup:()=>{t.removeEventListener(`pointermove`,s),t.removeEventListener(`pointerup`,c),t.removeEventListener(`pointercancel`,u),t.removeEventListener(`lostpointercapture`,u),d.removeEventListener(`keydown`,l,!0),f.removeEventListener(`blur`,u),f.removeEventListener(`resize`,u)}},t.setPointerCapture(e.pointerId)}cancel(e=!0){let t=this.session;if(this.session=void 0,this.frame!==void 0&&cancelAnimationFrame(this.frame),this.frame=void 0,t){t.cleanup(),t.body.removeAttribute(`data-row-dragging`);for(let e of t.rows)e.element.style.removeProperty(`transform`),e.element.removeAttribute(`data-dragging`);t.handle.hasPointerCapture(t.pointerId)&&t.handle.releasePointerCapture(t.pointerId),e&&t.moved&&this.cancelled()}}checkGeometry(){let e=this.session;e&&(Math.abs(e.body.getBoundingClientRect().width-e.width)>.5||e.rows.some(e=>Math.abs(e.element.getBoundingClientRect().height-e.height)>.5))&&this.cancel()}preview(){let e=this.session;if(!e?.moved)return;if(!this.enabled()){this.cancel();return}let{rows:t,fromIndex:n,body:r}=e,i=t[n],a=t.at(-1),o=e.pointerY-e.grabOffset-r.getBoundingClientRect().top,s=Math.max(0,Math.min(o,a.top+a.height-i.height)),c=o+i.height/2;e.toIndex=t.filter((e,t)=>t!==n&&c>e.top+e.height/2).length;for(let[r,a]of t.entries()){let t=r===n?s-a.top:r>n&&r<=e.toIndex?-i.height:r<n&&r>=e.toIndex?i.height:0;a.element.style.transform=`translateY(${t}px)`}this.frame!==void 0&&cancelAnimationFrame(this.frame),this.frame=requestAnimationFrame(()=>{this.frame=void 0,this.session===e&&(this.autoScroll(e),this.preview())})}scrollParents(e){let t=[],n=e.ownerDocument,r=e;for(;r;){r instanceof HTMLElement&&/(auto|scroll)/.test(getComputedStyle(r).overflowY)&&r.scrollHeight>r.clientHeight&&t.push(r);let e=r.getRootNode();r=r.parentElement??(e instanceof ShadowRoot?e.host:null)}return n.scrollingElement instanceof HTMLElement&&!t.includes(n.scrollingElement)&&t.push(n.scrollingElement),t}autoScroll(e){let t=e.handle.ownerDocument.defaultView;for(let n of e.scrollParents){let r=n===n.ownerDocument.scrollingElement,i=n.getBoundingClientRect(),a=r?0:Math.max(0,i.top),o=r?t.innerHeight:Math.min(t.innerHeight,i.bottom),s=e.pointerY<a+32?-10:e.pointerY>o-32?10:0;if(s&&(s<0?n.scrollTop>0:n.scrollTop+n.clientHeight<n.scrollHeight)){n.scrollTop+=s;break}}}},cc=new WeakMap,lc=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function uc(e,t,n){let r=lc(e)?e:n,i=t.map(e=>e.id),a=(e,t)=>[...new Set((Array.isArray(e)?e:t).filter(e=>typeof e==`string`&&i.includes(e)))],o=a(r.hiddenColumns,n.hiddenColumns).filter(e=>t.find(t=>t.id===e)?.hideable!==!1);return i.length&&o.length===i.length&&o.splice(o.indexOf(i[0]),1),{hiddenColumns:i.filter(e=>o.includes(e)),columnOrder:[...new Set([...a(r.columnOrder,n.columnOrder),...i])]}}function dc(e,t){if(!Array.isArray(e))return[];let n=new Set;return e.flatMap(e=>!lc(e)||typeof e.id!=`string`||n.has(e.id)||!t.some(t=>t.id===e.id&&t.sortable)||e.direction!==`asc`&&e.direction!==`desc`?[]:(n.add(e.id),[{id:e.id,direction:e.direction}]))}function fc(e,t){cc.get(e)?.disconnect();let n=`pk:data-table:${JSON.stringify([t.version??1,String(t.userId),t.key])}`,r;try{r=t.storage??e.ownerDocument.defaultView?.localStorage}catch{}let i=()=>{if(e.manualOrder)return[];let t=dc(e.defaultSort,e.columns),n=e.columns.find(e=>e.sortable);return t.length?t:n?[{id:n.id,direction:`asc`}]:[]},a=()=>{if(e.manualOrder)return[];let t=dc(e.query.sort,e.columns);return t.length?t:i()};try{let i=r?.getItem(n),a=i?JSON.parse(i):void 0;if(lc(a)&&(e.view=uc(a.view,e.columns,e.view),t.restoreSort!==!1&&!e.manualOrder)){let t=dc(a.sort,e.columns);t.length&&(e.query={...e.query,sort:t})}}catch{}let o=!0,s=!1,c=JSON.stringify(a()),l=()=>{s=!1,c=JSON.stringify(a());try{r?.removeItem(n)}catch{}},u=()=>{if(s=!1,!o)return;let t={view:uc(e.view,e.columns,e.defaultView),sort:a()},u={view:uc(e.defaultView,e.columns,e.defaultView),sort:i()};if(c=JSON.stringify(t.sort),JSON.stringify(t)===JSON.stringify(u))l();else try{r?.setItem(n,JSON.stringify(t))}catch{}},d=()=>{!s&&o&&(s=!0,queueMicrotask(()=>{s&&u()}))},f=t=>{t.target===e&&d()},p=t=>{t.target===e&&JSON.stringify(a())!==c&&d()};e.addEventListener(`pk-view-change`,f),e.addEventListener(`pk-query-change`,p);let m={storageKey:n,clear:l,disconnect(){s&&u(),o=!1,e.removeEventListener(`pk-view-change`,f),e.removeEventListener(`pk-query-change`,p),cc.get(e)===m&&cc.delete(e)}};return cc.set(e,m),m}var Q=class extends A{constructor(...e){super(...e),this.filterController=new oc(this),this.label=`Records`,this.rows=[],this.columns=[],this.filters=[],this.rowKey=`id`,this.query=ec(),this.view={hiddenColumns:[],columnOrder:[]},this.mode=`client`,this.pagination=`offset`,this.hasNext=!1,this.loading=!1,this.error=``,this.searchable=!0,this.showFilters=!1,this.columnControls=!0,this.hideToolbar=!1,this.hideFooter=!1,this.selectable=!1,this.manualOrder=!1,this.reorderDisabled=!1,this.selectedKeys=[],this.exportFormats=[],this.exporting=!1,this.defaultView={hiddenColumns:[],columnOrder:[]},this.defaultSort=[],this.searchDelay=250,this.size=`default`,this.layout=`embedded`,this.locale=``,this.timeZone=``,this.labels={},this.dragOffsets={},this.reorderAnnouncement=``,this.rowOrderAnnouncement=``,this.rowOrder=new sc(()=>this.canReorderRows,(e,t)=>this.reorderRows(e,t),()=>{this.rowOrderAnnouncement=this.text(`rowReorderCancelled`)}),this.tableScrollWidth=0,this.hasHorizontalOverflow=!1,this.sortLoading=!1,this.viewClosePending=!1,this.requests=new ic}static{this.styles=qs}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.observeLayout(),this.hasUpdated&&this.mode===`remote`&&this.dataSource&&this.refresh()}disconnectedCallback(){this.rowOrder.cancel(!1),this.cancelColumnDrag(),this.resizeObserver?.disconnect(),this.layoutFrame!==void 0&&cancelAnimationFrame(this.layoutFrame),this.layoutFrame=void 0,this.resizeObserver=void 0,this.pagingFocus=void 0,clearTimeout(this.searchTimer),this.requests.cancel(),super.disconnectedCallback()}willUpdate(e){this.rowOrder.active&&this.rowOrder.cancel(),this.drag&&(e.has(`columns`)||e.has(`view`))&&this.cancelColumnDrag(),(e.has(`query`)||e.has(`rows`)||e.has(`selectable`))&&(this.selectionAnchor=void 0,this.checkboxGesture=void 0),(this.manualOrder&&this.query.sort.length||!this.query.sort.length&&this.resolvedDefaultSort.length)&&(this.query={...this.query,sort:this.resolvedDefaultSort},this.mode===`remote`&&(this.loading=!0),this.emit(`pk-query-change`,{query:this.query}));let t=Number.isFinite(this.query.pageSize)?Math.max(1,Math.floor(this.query.pageSize)):25,n=Number.isFinite(this.query.pageIndex)?Math.max(0,Math.floor(this.query.pageIndex)):0;if((t!==this.query.pageSize||n!==this.query.pageIndex)&&(this.query={...this.query,pageSize:t,pageIndex:n}),e.has(`query`)){this.requests.cancel(),clearTimeout(this.searchTimer),this.searchDraft=void 0;let t=e.get(`query`);this.sortLoading=!this.manualOrder&&!!(t?.sort.length&&JSON.stringify(t.sort)!==JSON.stringify(this.query.sort)),t&&JSON.stringify([t.criteria,t.search,t.filters,t.filterOperators,t.sort])!==JSON.stringify([this.query.criteria,this.query.search,this.query.filters,this.query.filterOperators,this.query.sort])&&this.setSelection([])}if(e.has(`loading`)&&!this.loading&&(this.sortLoading=!1),(e.has(`dataSource`)||e.has(`mode`))&&(this.requests.cancel(),this.loaded=void 0),e.has(`mode`)&&this.mode===`client`&&(this.loading=!1,this.error=``),this.mode===`client`&&(e.has(`rows`)||e.has(`query`))){let e=rc(this.rows,this.columns,this.filters,this.query,this.locale||void 0),t=Math.max(0,Math.ceil((e.total??0)/this.query.pageSize)-1);this.query.pageIndex>t&&(this.query={...this.query,pageIndex:t},this.emit(`pk-query-change`,{query:this.query}))}}updated(e){this.resizeObserver||this.observeLayout(),this.measureLayout(),this.restorePagingFocus(),(e.has(`query`)||e.has(`dataSource`)||e.has(`mode`))&&this.mode===`remote`&&this.dataSource&&this.refresh()}observeLayout(){this.resizeObserver?.disconnect(),this.resizeObserver=new ResizeObserver(()=>{this.rowOrder.checkGeometry(),this.layoutFrame!==void 0&&cancelAnimationFrame(this.layoutFrame),this.layoutFrame=requestAnimationFrame(()=>{this.layoutFrame=void 0,this.measureLayout()})});for(let e of this.renderRoot.querySelectorAll(`.scroll, table, thead`))this.resizeObserver.observe(e)}measureLayout(){let e=this.renderRoot.querySelector(`.scroll`);if(!e)return;let t=this.renderRoot.querySelector(`thead`);e.style.setProperty(`--_pk-data-table-heading-height`,`${t?.offsetHeight??0}px`),this.tableScrollWidth=e.scrollWidth,this.hasHorizontalOverflow=e.scrollWidth>e.clientWidth+1;let n=this.renderRoot.querySelector(`.scrollbar`);n&&(n.scrollLeft=e.scrollLeft)}syncHorizontalScroll(e,t){let n=this.renderRoot.querySelector(t);n&&(n.scrollLeft=e.currentTarget.scrollLeft)}async restorePagingFocus(){if(!this.pagingFocus||this.loading)return;let e=this.pagingFocus,t=[...this.renderRoot.querySelectorAll(`.pager pk-button`)];if(await Promise.all(t.map(e=>e.updateComplete)),this.pagingFocus!==e||this.loading||!this.isConnected)return;this.pagingFocus=void 0;let{direction:n,button:r}=e,i=this.ownerDocument.activeElement;for(;i?.shadowRoot?.activeElement;)i=i.shadowRoot.activeElement;if(i&&i!==this.ownerDocument.body&&i!==r&&i!==r.shadowRoot?.activeElement)return;let a=t[+(n>0)];((a&&!a.disabled?a:t.find(e=>!e.disabled))??this.renderRoot.querySelector(`.scroll`))?.focus({preventScroll:!0})}text(e,t={}){return(this.labels[e]??$s[e]).replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??e))}emit(e,t={}){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}async refresh(){if(this.mode!==`remote`||!this.dataSource){this.emit(`pk-retry`);return}this.loading=!0,this.error=``;let e=this.manualOrder?{...this.query,sort:[]}:this.query;try{let t=await this.requests.load(this.dataSource,e);if(!t)return;if(!Array.isArray(t.rows))throw TypeError(`DataTable dataSource must return rows.`);this.loaded=t,this.loading=!1,this.emit(`pk-load`,{result:t,query:e})}catch(e){this.error=this.text(`error`),this.loading=!1,this.emit(`pk-load-error`,{error:e})}}get resolvedDefaultSort(){if(this.manualOrder)return[];if(this.defaultSort.length)return this.defaultSort.map(e=>({...e}));let e=this.columns.find(e=>e.sortable);return e?[{id:e.id,direction:`asc`}]:[]}setQuery(e){if(this.manualOrder&&`sort`in e){let{sort:t,...n}=e;if(e=n,!Object.keys(e).length)return}this.requests.cancel(),`sort`in e&&!e.sort?.length&&(e={...e,sort:this.resolvedDefaultSort});let t=`search`in e||`sort`in e||`filters`in e||`filterOperators`in e||`criteria`in e,n=t||`pageSize`in e;this.query={...this.query,...e,...n?{pageIndex:0,cursor:void 0}:{}},t&&(this.pagingFocus=void 0,this.setSelection([])),this.mode===`remote`&&(this.loading=!0),this.emit(`pk-query-change`,{query:this.query})}setSelection(e){e.length||(this.selectionAnchor=void 0),(this.selectedKeys.length!==0||e.length!==0)&&(this.selectedKeys=e,this.emit(`pk-selection-change`,{selectedKeys:e}))}canSelectRow(e){return this.selectable&&!this.loading&&!this.error&&this.isRowSelectable?.(e)!==!1}isRowControl(e){for(let t of e.composedPath()){if(t===e.currentTarget)break;if(t instanceof Element&&t.matches(`a, button, input, select, textarea, label, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], [role="checkbox"], [role="switch"], [tabindex], [data-table-interactive]`))return!0}return!1}isSelectionCommand(e){return!!(/Mac/.test(navigator.platform)?e.metaKey:e.ctrlKey)}isSelectionClick(e){return e.button===0&&(!(e.metaKey||e.ctrlKey)||this.isSelectionCommand(e))}selectPage(e){let t=this.result.rows.filter(e=>this.canSelectRow(e)).map(e=>this.key(e)),n=e?t[0]:this.selectionAnchor;this.setSelection(e?[...new Set([...this.selectedKeys,...t])]:this.selectedKeys.filter(e=>!t.includes(e))),this.selectionAnchor=n}selectRow(e,t){if(!this.canSelectRow(e))return;let n=this.key(e),r=this.result.rows.map(e=>this.key(e)),i=this.selectionAnchor===void 0?-1:r.indexOf(this.selectionAnchor),a=r.indexOf(n);if(t.shiftKey&&i!==-1&&a!==-1){let e=this.result.rows.slice(Math.min(i,a),Math.max(i,a)+1).filter(e=>this.canSelectRow(e)).map(e=>this.key(e)),t=this.selectedKeys.filter(e=>!r.includes(e));this.setSelection([...new Set([...t,...e])])}else this.isSelectionCommand(t)?(this.selectionAnchor=n,this.setSelection([n])):this.selectedKeys.includes(n)?(this.selectionAnchor===n&&(this.selectionAnchor=void 0),this.setSelection(this.selectedKeys.filter(e=>e!==n))):(this.selectionAnchor=n,this.setSelection([...this.selectedKeys,n]))}clickRow(e,t){this.isSelectionClick(e)&&this.canSelectRow(t)&&!this.isRowControl(e)&&(this.selectRow(t,e),e.currentTarget.querySelector(`pk-checkbox`)?.focus({preventScroll:!0}))}clickRowCheckbox(e,t){this.isSelectionClick(e)?(e.shiftKey||this.isSelectionCommand(e))&&!(e.composedPath()[0]instanceof HTMLInputElement)?(e.preventDefault(),this.checkboxGesture=void 0,this.selectRow(t,e),e.currentTarget.focus({preventScroll:!0})):this.checkboxGesture={key:this.key(t),shiftKey:e.shiftKey,metaKey:e.metaKey,ctrlKey:e.ctrlKey}:(e.preventDefault(),this.checkboxGesture=void 0)}changeRowCheckbox(e){let t=this.checkboxGesture?.key===this.key(e)?this.checkboxGesture:{};this.checkboxGesture=void 0,this.selectRow(e,t)}keyRow(e,t){if(!this.canSelectRow(t)||e.defaultPrevented)return;let n=e.currentTarget,r=n.querySelector(`pk-checkbox`);if(!e.composedPath().includes(r)&&e.target!==n)return;let i=this.isSelectionCommand(e),a=this.result.rows.filter(e=>this.canSelectRow(e));if(i&&e.key.toLowerCase()===`a`){e.preventDefault(),this.selectPage(!0);return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),!i&&!e.shiftKey&&this.selectRow(t,{});return}if(![`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(e.key))return;e.preventDefault();let o=a.findIndex(e=>this.key(e)===this.key(t)),s=e.key===`Home`||i&&e.key===`ArrowUp`,c=e.key===`End`||i&&e.key===`ArrowDown`,l=a[s?0:c?a.length-1:Math.max(0,Math.min(a.length-1,o+(e.key===`ArrowUp`?-1:1)))];if(!l)return;let u=this.result.rows.findIndex(e=>this.key(e)===this.key(l)),d=this.renderRoot.querySelectorAll(`tbody tr`)[u];if(d){let e=this.layout===`index`?this.renderRoot.querySelector(`.footer-shell`)?.offsetHeight??0:0,t=this.layout===`index`?(this.renderRoot.querySelector(`.header-shell`)?.offsetHeight??0)+(Number.parseFloat(getComputedStyle(this.renderRoot.querySelector(`.header-shell`)).top)||0)+2:0;d.style.scrollMarginBlockStart=`${t}px`,d.style.scrollMarginBlockEnd=`${e}px`}d?.querySelector(`pk-checkbox`)?.focus({preventScroll:!0}),d?.scrollIntoView({block:`nearest`,inline:`nearest`})}accessibleRowLabel(e){return(typeof this.rowLabel==`function`?this.rowLabel(e):this.rowLabel?Z(e[this.rowLabel]):``)||String(this.key(e))}key(e){let t=typeof this.rowKey==`function`?this.rowKey(e):e[this.rowKey];if(typeof t!=`string`&&typeof t!=`number`)throw TypeError(`DataTable rows require a stable string or number rowKey.`);return t}get result(){return this.mode===`client`?rc(this.rows,this.columns,this.filters,this.manualOrder?{...this.query,sort:[]}:this.query,this.locale||void 0):this.dataSource?this.loaded??{rows:[]}:{rows:this.rows,total:this.total,hasNext:this.hasNext,nextCursor:this.nextCursor,previousCursor:this.previousCursor}}get rowOrderFiltered(){return!!(this.query.search.trim()||this.searchDraft?.trim()||Object.keys(this.query.filters).length||Object.keys(this.query.criteria??{}).length)}get canReorderRows(){let e=this.mode===`client`?Math.min(this.query.pageSize,this.rows.length-this.query.pageIndex*this.query.pageSize):this.dataSource?this.loaded?.rows.length??0:this.rows.length;return this.manualOrder&&!this.reorderDisabled&&!this.loading&&!this.error&&!this.rowOrderFiltered&&e>1}reorderRows(e,t){if(!this.canReorderRows||e===t)return;let n=[...this.result.rows];if(e<0||t<0||e>=n.length||t>=n.length)return;let r=n.map(e=>this.key(e)),[i]=n.splice(e,1);n.splice(t,0,i);let a=[...this.mode===`remote`&&this.dataSource?this.loaded.rows:this.rows],o;if(this.mode===`client`){let e=new Set(r),t=0;o=this.rows.map(r=>e.has(this.key(r))?n[t++]:r),this.rows=o}else this.dataSource?(o=n,this.loaded={...this.loaded,rows:o}):(o=n,this.rows=o);this.selectionAnchor=void 0,this.rowOrderAnnouncement=this.text(`rowReordered`,{label:this.accessibleRowLabel(i),position:t+1,count:n.length});let s={rowKey:this.key(i),fromIndex:e,toIndex:t,orderedKeys:n.map(e=>this.key(e)),previousKeys:r,rows:[...o],previousRows:a,query:structuredClone(this.query)},c=this.renderRoot.querySelectorAll(`.row-handle`)[e],l=this.renderRoot instanceof ShadowRoot&&this.renderRoot.activeElement===c;this.emit(`pk-row-reorder`,s),(async()=>{if(await this.updateComplete,!l||!this.isConnected||!c?.isConnected||this.loading||this.error||!this.manualOrder)return;let e=this.ownerDocument.activeElement;if(e!==this&&e!==this.ownerDocument.body)return;let t=this.renderRoot.activeElement;t&&t!==c||(c.focus({preventScroll:!0}),c.scrollIntoView({block:`nearest`,inline:`nearest`}))})()}keyRowOrder(e,t){if(e.altKey||e.ctrlKey||e.metaKey||![`Home`,`End`,`ArrowUp`,`ArrowDown`].includes(e.key)||(e.preventDefault(),e.stopPropagation(),this.rowOrder.active||!this.canReorderRows))return;let n=this.result.rows,r=n.findIndex(e=>this.key(e)===this.key(t)),i=e.key===`Home`?0:e.key===`End`?n.length-1:e.key===`ArrowUp`?Math.max(0,r-1):e.key===`ArrowDown`?Math.min(n.length-1,r+1):void 0;i!==void 0&&this.reorderRows(r,i)}get orderedColumns(){let e=this.view.columnOrder.map(e=>this.columns.find(t=>t.id===e)).filter(e=>!!e);return[...new Set([...e,...this.columns])]}setView(e){this.view=e,this.emit(`pk-view-change`,{view:e})}toggleColumn(e){let t=new Set(this.view.hiddenColumns);!t.has(e)&&this.columns.filter(e=>e.hideable===!1||!t.has(e.id)).length<=1||(t.has(e)?t.delete(e):t.add(e),this.setView({...this.view,hiddenColumns:[...t]}))}moveColumn(e,t){let n=this.orderedColumns.map(e=>e.id),r=n.indexOf(e);r+t<0||r+t>=n.length||(n.splice(r,1),n.splice(r+t,0,e),this.reorderAnnouncement=this.text(`reordered`,{label:this.columns.find(t=>t.id===e)?.label??e,position:r+t+1,count:n.length}),this.setView({...this.view,columnOrder:n}))}icon(e,t){return E`<span
            class="icon"
            slot=${t??O}
            aria-hidden="true"
            >${ut(z(e))}</span
        >`}directionIcon(e){return E`<svg
            class="direction-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path
                d=${e===`asc`?`M5 20V4m-3 3 3-3 3 3`:`M5 4v16m-3-3 3 3 3-3`}
            />
            <path d="M12 5h9M12 10h6M12 15h3M12 20h1" />
        </svg>`}startColumnDrag(e,t){if(e.button!==0)return;let n=this.renderRoot.querySelector(`.column-list`);if(!n)return;e.preventDefault();let r=e.currentTarget;r.focus();let i=n.getBoundingClientRect(),a=[...n.querySelectorAll(`.column-option`)].map(e=>{let t=e.getBoundingClientRect();return{id:e.dataset.column,top:t.top-i.top+n.scrollTop,height:t.height}});this.drag={id:t,startY:e.clientY,pointerY:e.clientY,startScroll:n.scrollTop,moved:!1,targetIndex:a.findIndex(e=>e.id===t),pointerId:e.pointerId,handle:r,list:n,rows:a},r.setPointerCapture(e.pointerId)}dragColumn(e){this.drag&&e.pointerId===this.drag.pointerId&&(this.drag.pointerY=e.clientY,!(Math.abs(e.clientY-this.drag.startY)<4&&!this.drag.moved)&&(this.drag.moved=!0,this.previewColumnDrag()))}previewColumnDrag(){let e=this.drag;if(!e?.moved)return;let{list:t,rows:n}=e,r=t.getBoundingClientRect(),i=n.findIndex(t=>t.id===e.id),a=n[i],o=a.top+e.pointerY-e.startY+t.scrollTop-e.startScroll,s=Math.max(Math.max(n[0].top,t.scrollTop),Math.min(o,n.at(-1).top+n.at(-1).height-a.height,t.scrollTop+t.clientHeight-a.height)),c=s+a.height/2;e.targetIndex=n.reduce((e,t,r)=>Math.abs(c-t.top-t.height/2)<Math.abs(c-n[e].top-n[e].height/2)?r:e,0),this.dragOffsets=Object.fromEntries(n.map((t,n)=>[t.id,n===i?s-a.top:n>i&&n<=e.targetIndex?-a.height:n<i&&n>=e.targetIndex?a.height:0]));let l=e.pointerY<r.top+24?-8:e.pointerY>r.bottom-24?8:0;this.dragFrame!==void 0&&cancelAnimationFrame(this.dragFrame),this.dragFrame=void 0,l&&(l<0?t.scrollTop>0:t.scrollTop+t.clientHeight<t.scrollHeight)&&(this.dragFrame=requestAnimationFrame(()=>{this.dragFrame=void 0,t.scrollTop+=l,this.previewColumnDrag()}))}cancelColumnDrag(){let e=this.drag;this.drag=void 0,this.dragFrame!==void 0&&cancelAnimationFrame(this.dragFrame),this.dragFrame=void 0,this.dragOffsets={},e?.handle.hasPointerCapture(e.pointerId)&&e.handle.releasePointerCapture(e.pointerId)}endColumnDrag(e,t){let n=this.drag;n&&e.pointerId===n.pointerId&&(this.cancelColumnDrag(),t&&n.moved&&this.moveColumn(n.id,n.targetIndex-n.rows.findIndex(e=>e.id===n.id)))}finishViewChildren(e){let t=e.currentTarget.closest(`pk-popover`);if(!t||e.target!==t)return;if(this.drag&&e.detail.source===`escape`){e.preventDefault(),this.cancelColumnDrag();return}this.cancelColumnDrag();let n=t.querySelector(`pk-select`);n?.open&&(e.preventDefault(),!this.viewClosePending&&(this.viewClosePending=!0,n.addEventListener(`pk-after-hide`,()=>{this.viewClosePending=!1,t.closePopover(e.detail.source)},{once:!0}),n.hide()))}renderView(){let e=this.query.sort[0],t=this.manualOrder?[]:this.columns.filter(e=>e.sortable),n=this.columns.filter(e=>e.hideable===!1||!this.view.hiddenColumns.includes(e.id)).length;return E`<pk-popover
            class="view-popover"
            .label=${this.text(`view`)}
            @pk-hide=${this.finishViewChildren}
            placement="bottom-end"
            flush
        >
            <pk-button slot="trigger" with-caret
                >${this.icon(B.slidersOutline,`start`)}${this.text(`view`)}</pk-button
            >
            <div class="view-grid">
                ${t.length?E`<div class="view-label">
                                  ${this.text(`sortBy`)}
                              </div>
                              <div
                                  class="view-sort"
                                  role="group"
                                  aria-label=${this.text(`sortBy`)}
                              >
                                  <pk-select
                                      aria-label=${this.text(`sortBy`)}
                                      .value=${e?.id??``}
                                      @pk-change=${t=>{let n=t.detail.value;n&&this.setQuery({sort:[{id:n,direction:e?.direction??`asc`}]})}}
                                      >${t.map(e=>E`<pk-option value=${e.id}>${e.label}</pk-option>`)}</pk-select
                                  >
                                  <pk-button-group
                                      .label=${this.text(`sortDirection`)}
                                      >${[`asc`,`desc`].map(t=>E`<pk-button .disabled=${!e} variant=${e?.direction===t?`secondary`:`default`} aria-label=${this.text(t===`asc`?`ascending`:`descending`)} aria-pressed=${e?.direction===t?`true`:`false`} @click=${()=>e&&this.setQuery({sort:[{id:e.id,direction:t}]})}>${this.directionIcon(t)}</pk-button>`)}</pk-button-group
                                  >
                              </div>`:O}
                <div class="view-label columns-label">
                    ${this.text(`columns`)}
                </div>
                <div
                    class="column-list"
                    role="group"
                    aria-label=${this.text(`columns`)}
                    ?data-reordering=${this.drag?.moved}
                >
                    <span id="reorder-help" class="sr-only"
                        >${this.text(`reorderHelp`)}</span
                    >
                    ${Us(this.orderedColumns,e=>e.id,e=>E`<div
                                class="column-option"
                                data-column=${e.id}
                                ?data-dragging=${this.drag?.moved&&this.drag.id===e.id}
                                style=${Ks({transform:this.drag?.moved?`translateY(${this.dragOffsets[e.id]??0}px)`:void 0})}
                            >
                                <button
                                    class="column-handle"
                                    type="button"
                                    aria-label=${this.text(`reorder`,{label:e.label})}
                                    aria-describedby="reorder-help"
                                    @pointerdown=${t=>this.startColumnDrag(t,e.id)}
                                    @pointermove=${e=>this.dragColumn(e)}
                                    @pointerup=${e=>this.endColumnDrag(e,!0)}
                                    @pointercancel=${e=>this.endColumnDrag(e,!1)}
                                    @lostpointercapture=${e=>this.endColumnDrag(e,!1)}
                                    @keydown=${t=>{this.drag&&t.key===`Escape`?(t.preventDefault(),t.stopPropagation(),this.cancelColumnDrag()):this.drag||(t.key===`ArrowUp`||t.key===`ArrowDown`)&&(t.preventDefault(),this.moveColumn(e.id,t.key===`ArrowUp`?-1:1))}}
                                >
                                    ${this.icon(B.gripMove)}
                                </button>
                                <pk-checkbox
                                    .checked=${e.hideable===!1||!this.view.hiddenColumns.includes(e.id)}
                                    .disabled=${e.hideable===!1||!this.view.hiddenColumns.includes(e.id)&&n<=1}
                                    @change=${()=>this.toggleColumn(e.id)}
                                    >${e.label}</pk-checkbox
                                >
                            </div>`)}
                </div>
            </div>
            <div class="view-footer">
                <pk-button
                    variant="transparent"
                    @click=${()=>{this.setView(structuredClone(this.defaultView)),this.setQuery({sort:structuredClone(this.defaultSort)})}}
                    >${this.text(`defaults`)}</pk-button
                ><pk-button
                    @click=${e=>e.currentTarget.closest(`pk-popover`)?.closePopover(`close-button`)}
                    >${this.text(`close`)}</pk-button
                >
            </div>
            <span role="status" class="sr-only"
                >${this.reorderAnnouncement}</span
            >
        </pk-popover>`}renderExport(){return this.exportFormats.length?E`<pk-dropdown-menu
            placement="top-end"
            @pk-select=${e=>{if(this.loading||this.exporting||!this.exportFormats.some(t=>t.value===e.detail.value&&!t.disabled))return;let t={format:e.detail.value,query:structuredClone(this.query),view:structuredClone(this.view),columnIds:this.orderedColumns.filter(e=>e.hideable===!1||!this.view.hiddenColumns.includes(e.id)).map(e=>e.id),selectedKeys:[...this.selectedKeys]};this.emit(`pk-export`,t)}}
            ><pk-button
                slot="trigger"
                with-caret
                size="sm"
                .disabled=${this.loading||this.exporting}
                .loading=${this.exporting}
                aria-label=${this.text(this.exporting?`exporting`:`export`)}
                >${this.text(this.exporting?`exporting`:`export`)}</pk-button
            >${this.exportFormats.map(e=>E`<pk-dropdown-item value=${e.value} .disabled=${!!e.disabled}>${e.label}</pk-dropdown-item>`)}</pk-dropdown-menu
        >`:O}sortColumn(e){if(this.manualOrder)return;let t=this.query.sort[0];this.setQuery({sort:[{id:e,direction:t?.id===e&&t.direction===`asc`?`desc`:`asc`}]})}inputSearch(e){if(e.target!==e.currentTarget)return;let t=e.currentTarget.value;this.searchDraft=t,clearTimeout(this.searchTimer),t?this.searchTimer=setTimeout(()=>this.setQuery({search:t}),this.searchDelay):this.query.search&&this.setQuery({search:``})}renderToolbar(){return this.hideToolbar?O:E`<div class="toolbar" part="toolbar">
            <slot name="toolbar-start"></slot>
            ${this.searchable?E`<pk-input class="search" type="search" with-clear .clearLabel=${this.text(`clearSearch`)} .label=${this.text(`search`)} placeholder=${this.text(`search`)} .value=${this.searchDraft??this.query.search} @input=${this.inputSearch}>${this.icon(B.magnifyingGlass,`start`)}${this.filterController.renderTrigger(`end`)}</pk-input>`:O}
            <div class="toolbar-end">
                ${this.searchable?O:this.filterController.renderTrigger()}
                <slot name="toolbar-controls"></slot>
                ${this.columnControls?this.renderView():O}
                <slot name="toolbar-end"></slot>
            </div>
        </div>`}renderCell(e,t){let n=nc(e,t),r=this.key(e),i={row:e,column:t,value:n,rowKey:r};if(t.renderCell)return t.renderCell(i);if(t.type===`custom`)return E`<slot name=${tc(r,t.id)}
                >${Z(n)}</slot
            >`;if(n==null||n===``)return`—`;if(t.type===`handle`){let e=Z(n);return E`<span class="cell-handle" part="handle">
                <code>${e}</code><pk-copy-button
                    .value=${e}
                    .ariaLabel=${this.text(`copyHandle`,{label:e})}
                    .copiedLabel=${this.text(`copiedHandle`,{label:e})}
                    >${this.icon(B.clipboard,`icon`)}</pk-copy-button>
            </span>`}if(t.type===`number`&&Number.isFinite(Number(n)))return new Intl.NumberFormat(this.locale||void 0,t.numberOptions).format(Number(n));if(t.type===`date`){let e=n instanceof Date?n:new Date(Z(n));return Number.isFinite(e.getTime())?E`<time datetime=${e.toISOString()}
                >${new Intl.DateTimeFormat(this.locale||void 0,{...this.timeZone?{timeZone:this.timeZone}:{},...t.dateOptions}).format(e)}</time
            >`:`—`}if(t.type===`status`)return E`<pk-status-label
                .status=${t.status?.(e)??Z(n)}
                >${Z(n)}</pk-status-label
            >`;if(t.type===`link`){let r=t.href?.(e)??Z(n);try{if(![`http:`,`https:`,`mailto:`,`tel:`].includes(new URL(r,document.baseURI).protocol))return Z(n)}catch{return Z(n)}return E`<a
                href=${r}
                class=${t.wrap===!0?O:`cell-link`}
                title=${Z(n)}
                >${Z(n)}</a
            >`}return Z(n)}actionLabel(e){return e.label??(e.preset?this.text(`${e.preset}Action`):e.id)}activateAction(e,t){e.disabled||this.loading||this.error||this.emit(`pk-row-action`,{action:e.id,row:t,rowKey:this.key(t)})}renderRowActions(e,t){if(!t.length)return O;let n=e=>(e.display??(e.preset?`inline`:`menu`))===`inline`,r=t.filter(e=>!n(e));return E`<div class="row-actions" part="row-actions">
            ${t.filter(n).map(t=>{let n=this.text(`rowAction`,{label:this.actionLabel(t),id:this.accessibleRowLabel(e)});return E`<pk-button
                    class="row-action"
                    data-preset=${t.preset??O}
                    size="sm"
                    variant="none"
                    aria-label=${n}
                    .disabled=${!!t.disabled}
                    @click=${()=>this.activateAction(t,e)}
                    >${t.preset?this.icon({edit:B.pen,move:B.gripMove,delete:B.xmark}[t.preset],`start`):this.actionLabel(t)}</pk-button>`})}
            ${r.length?E`<pk-dropdown-menu placement="bottom-end"
                @pk-select=${t=>{t.stopPropagation();let n=r.find(e=>e.id===t.detail.value);n&&this.activateAction(n,e)}}>
                <pk-button slot="trigger" size="sm" variant="none"
                    aria-label=${this.text(`actions`,{id:this.accessibleRowLabel(e)})}
                    >${this.icon(B.ellipsis,`start`)}</pk-button>
                ${r.map(e=>E`<pk-dropdown-item
                    value=${e.id}
                    .disabled=${!!e.disabled}
                    >${this.actionLabel(e)}</pk-dropdown-item>`)}
            </pk-dropdown-menu>`:O}
        </div>`}page(e,t){let n=this.renderRoot.querySelectorAll(`.pager pk-button`)[+(e>0)];n&&(this.pagingFocus={direction:e,button:n}),this.setQuery({pageIndex:Math.max(0,this.query.pageIndex+e),cursor:this.pagination===`cursor`?e>0?t.nextCursor:t.previousCursor:void 0})}render(){let e=this.result,t=this.orderedColumns.filter(e=>e.hideable===!1||!this.view.hiddenColumns.includes(e.id)),n=e.rows.filter(e=>this.isRowSelectable?.(e)!==!1).map(e=>this.key(e)),r=new Set(this.selectable?this.selectedKeys:[]),i=n.length>0&&n.every(e=>r.has(e)),a=e.rows.length?this.query.pageIndex*this.query.pageSize+1:0,o=e.rows.length?a+e.rows.length-1:0,s=this.pagination===`cursor`?!!e.nextCursor:e.total==null?!!e.hasNext:o<e.total,c=this.pagination===`cursor`?this.query.pageIndex>0&&e.previousCursor!==void 0:this.query.pageIndex>0,l=this.loading||!!this.error,u=this.loading&&this.sortLoading,d=this.loading&&!u,f=this.layout===`index`&&!this.hideFooter&&this.hasHorizontalOverflow,p=this.text(e.total==null?`unknownRange`:`range`,{start:a,end:o,total:e.total??0});return E`
            <div class="header-shell" part="header-shell">
                ${this.renderToolbar()}
            </div>
            ${this.filterController.renderDialog()}
            ${this.manualOrder?E`
                <span id="row-order-help" class="sr-only">${this.text(`reorderRowHelp`)}</span>
                ${this.rowOrderFiltered?E`<p class="row-order-hint">${this.text(`reorderRowsFiltered`)}</p>`:O}
                <span role="status" class="sr-only">${this.rowOrderAnnouncement}</span>
            `:O}
            <div role="status" aria-live="polite" class="sr-only">
                ${this.loading?this.text(e.rows.length?`updating`:`loading`):r.size?`${p}. ${this.text(`selected`,{count:r.size})}`:p}
            </div>
            ${this.error?E`<pk-state-panel variant="error" .heading=${this.error}><pk-button slot="actions" @click=${()=>this.refresh()}>${this.text(`retry`)}</pk-button></pk-state-panel>`:O}
            <div class="table-frame">
                <div
                    class="scroll"
                    part="scroll"
                    ?data-proxy=${f}
                    @scroll=${e=>this.syncHorizontalScroll(e,`.scrollbar`)}
                    role="region"
                    aria-label=${this.label}
                    tabindex="0"
                    aria-busy=${this.loading?`true`:`false`}
                >
                    <table part="table">
                        <caption class="sr-only">
                            ${this.label}
                        </caption>
                        <thead>
                            <tr>
                                ${this.selectable?E`<th class="small"><pk-checkbox aria-label=${this.text(`selectPage`)} .checked=${i} .indeterminate=${!i&&n.some(e=>r.has(e))} .disabled=${l||n.length===0} @change=${()=>this.selectPage(!i)}></pk-checkbox></th>`:O}
                                ${t.map(e=>{let t=!this.manualOrder&&this.query.sort.find(t=>t.id===e.id);return E`<th
                                        scope="col"
                                        style=${Ks({width:e.width})}
                                        class=${e.align??(e.type===`number`?`end`:``)}
                                        ?data-sorted=${!!t}
                                        ?data-sortable=${!(!e.sortable||this.manualOrder)}
                                        aria-sort=${t?t.direction===`asc`?`ascending`:`descending`:O}
                                    >
                                        ${e.sortable&&!this.manualOrder?E`<button class="sort" aria-label=${this.text(`sort`,{label:e.label})} @click=${()=>this.sortColumn(e.id)}>${e.label}${t?u?E`<pk-spinner class="sort-spinner" size="xs" aria-hidden="true"></pk-spinner>`:this.icon(t.direction===`asc`?B.chevronUp:B.chevronDown):O}</button>`:e.label}
                                    </th>`})}
                                ${this.rowActions?E`<th class="small"><span class="sr-only">${this.text(`actions`,{id:``})}</span></th>`:O}
                                ${this.manualOrder?E`<th class="small" scope="col"><span class="sr-only">${this.text(`rowOrder`)}</span></th>`:O}
                            </tr>
                        </thead>
                        <tbody class=${l&&!u?`busy`:``} ?inert=${l} ?data-loading=${d}>
                            ${Us(e.rows,e=>this.key(e),e=>{let n=this.rowActions?.(e)??[];return E`<tr
                                        ?data-selected=${this.selectable&&r.has(this.key(e))}
                                        ?data-selectable=${this.canSelectRow(e)}
                                        @click=${t=>this.clickRow(t,e)}
                                        @keydown=${t=>this.keyRow(t,e)}
                                        @mousedown=${t=>{t.button===0&&this.canSelectRow(e)&&(t.shiftKey||t.metaKey||t.ctrlKey)&&!this.isRowControl(t)&&t.preventDefault()}}
                                    >
                                        ${this.selectable?E`<td class="small">
                                                      <pk-checkbox
                                                          aria-label=${this.text(`selectRow`,{id:this.accessibleRowLabel(e)})}
                                                          .checked=${Mr(r.has(this.key(e)))}
                                                          .disabled=${l||this.isRowSelectable?.(e)===!1}
                                                          @mousedown=${e=>{e.shiftKey&&(e.preventDefault(),e.currentTarget.focus({preventScroll:!0}))}}
                                                          @click=${t=>this.clickRowCheckbox(t,e)}
                                                          @change=${()=>this.changeRowCheckbox(e)}
                                                      ></pk-checkbox>
                                                  </td>`:O}
                                        ${t.map(t=>E`<td part="cell" class=${`${t.align??(t.type===`number`?`end`:``)} ${t.wrap??![`number`,`date`,`status`,`handle`].includes(t.type??`text`)?``:`nowrap`}`}>${this.renderCell(e,t)}</td>`)}
                                        ${this.rowActions?E`<td class="small">
                                                      ${this.renderRowActions(e,n)}
                                                  </td>`:O}
                                        ${this.manualOrder?E`<td class="small">
                                            <button class="row-handle" part="row-handle" type="button"
                                                aria-label=${this.text(`reorderRow`,{label:this.accessibleRowLabel(e)})}
                                                aria-describedby="row-order-help"
                                                aria-disabled=${this.canReorderRows?`false`:`true`}
                                                @pointerdown=${e=>this.rowOrder.start(e)}
                                                @keydown=${t=>this.keyRowOrder(t,e)}
                                                >${this.icon(B.gripMove)}</button>
                                        </td>`:O}
                                    </tr>`})}
                        </tbody>
                    </table>
                    ${d?E`
                        ${e.rows.length?O:E`<div class="loading-space" aria-hidden="true"></div>`}
                        <div class="loading-indicator" aria-hidden="true"><pk-spinner></pk-spinner></div>
                    `:O}
                    ${!e.rows.length&&!d&&!this.error?E`<slot name="empty"><pk-state-panel .heading=${this.text(this.query.search||Object.keys(this.query.filters).length?`noResults`:`empty`)}></pk-state-panel></slot>`:O}
                </div>
                ${this.hideFooter?O:E`<div class="footer-shell" part="footer-shell">
                              ${f?E`<div class="scrollbar" part="scrollbar" role="region" aria-label=${this.text(`scrollColumns`,{label:this.label})} tabindex="0" @scroll=${e=>this.syncHorizontalScroll(e,`.scroll`)}><div style=${Ks({width:`${this.tableScrollWidth}px`})}></div></div>`:O}
                              <div class="footer" part="footer">
                                  <nav
                                      class="pager"
                                      aria-label=${this.text(`pagination`,{label:this.label})}
                                  >
                                      <pk-button
                                          size="sm"
                                          variant="outline"
                                          aria-label=${this.text(`previous`)}
                                          .disabled=${!c||this.loading}
                                          @click=${()=>this.page(-1,e)}
                                          >${this.icon(B.chevronLeft)}</pk-button
                                      >
                                      <pk-button
                                          size="sm"
                                          variant="outline"
                                          aria-label=${this.text(`next`)}
                                          .disabled=${!s||this.loading}
                                          @click=${()=>this.page(1,e)}
                                          >${this.icon(B.chevronRight)}</pk-button
                                      >
                                      <span>${p}</span>
                                  </nav>
                                  ${this.selectable?E`<div
                                                class="selection"
                                                part="selection"
                                                ?data-empty=${r.size===0}
                                                ?inert=${l||r.size===0}
                                                aria-hidden=${r.size===0?`true`:O}
                                            >
                                                <span class="selection-count"
                                                    >${this.text(`selected`,{count:r.size})}</span
                                                >
                                                <slot
                                                    name="selection-actions"
                                                ></slot>
                                            </div>`:O}
                                  <slot name="footer"></slot>
                                  <div class="footer-actions">
                                      ${this.renderExport()}
                                  </div>
                              </div>
                          </div>`}
            </div>
        `}};j([M()],Q.prototype,`label`,void 0),j([M({attribute:!1})],Q.prototype,`rows`,void 0),j([M({attribute:!1})],Q.prototype,`columns`,void 0),j([M({attribute:!1})],Q.prototype,`filters`,void 0),j([M({attribute:!1})],Q.prototype,`rowKey`,void 0),j([M({attribute:!1})],Q.prototype,`query`,void 0),j([M({attribute:!1})],Q.prototype,`view`,void 0),j([M()],Q.prototype,`mode`,void 0),j([M()],Q.prototype,`pagination`,void 0),j([M({attribute:!1})],Q.prototype,`dataSource`,void 0),j([M({type:Number})],Q.prototype,`total`,void 0),j([M({type:Boolean,attribute:`has-next`})],Q.prototype,`hasNext`,void 0),j([M({attribute:`next-cursor`})],Q.prototype,`nextCursor`,void 0),j([M({attribute:`previous-cursor`})],Q.prototype,`previousCursor`,void 0),j([M({type:Boolean})],Q.prototype,`loading`,void 0),j([M()],Q.prototype,`error`,void 0),j([M({type:Boolean})],Q.prototype,`searchable`,void 0),j([M({type:Boolean,attribute:`show-filters`})],Q.prototype,`showFilters`,void 0),j([M({type:Boolean,attribute:`column-controls`})],Q.prototype,`columnControls`,void 0),j([M({type:Boolean,attribute:`hide-toolbar`})],Q.prototype,`hideToolbar`,void 0),j([M({type:Boolean,attribute:`hide-footer`})],Q.prototype,`hideFooter`,void 0),j([M({type:Boolean})],Q.prototype,`selectable`,void 0),j([M({type:Boolean,attribute:`manual-order`})],Q.prototype,`manualOrder`,void 0),j([M({type:Boolean,attribute:`reorder-disabled`})],Q.prototype,`reorderDisabled`,void 0),j([M({attribute:!1})],Q.prototype,`selectedKeys`,void 0),j([M({attribute:!1})],Q.prototype,`isRowSelectable`,void 0),j([M({attribute:!1})],Q.prototype,`rowActions`,void 0),j([M({attribute:!1})],Q.prototype,`exportFormats`,void 0),j([M({type:Boolean})],Q.prototype,`exporting`,void 0),j([M({attribute:!1})],Q.prototype,`defaultView`,void 0),j([M({attribute:!1})],Q.prototype,`defaultSort`,void 0),j([M({type:Number,attribute:`search-delay`})],Q.prototype,`searchDelay`,void 0),j([M({reflect:!0})],Q.prototype,`size`,void 0),j([M({reflect:!0})],Q.prototype,`layout`,void 0),j([M({attribute:!1})],Q.prototype,`rowLabel`,void 0),j([M()],Q.prototype,`locale`,void 0),j([M({attribute:`time-zone`})],Q.prototype,`timeZone`,void 0),j([M({attribute:!1})],Q.prototype,`labels`,void 0),j([N()],Q.prototype,`loaded`,void 0),j([N()],Q.prototype,`searchDraft`,void 0),j([N()],Q.prototype,`dragOffsets`,void 0),j([N()],Q.prototype,`reorderAnnouncement`,void 0),j([N()],Q.prototype,`rowOrderAnnouncement`,void 0),j([N()],Q.prototype,`tableScrollWidth`,void 0),j([N()],Q.prototype,`hasHorizontalOverflow`,void 0),Q=j([k(`pk-data-table`)],Q);var $=(e,t)=>Craft.t(`craft-commerce-back-in-stock`,e,t),pc=e=>Object.entries(e).map(([e,t])=>({value:e,label:$(t)})),mc=(e,t,n)=>({id:e,label:$(t),type:`select`,operators:[`equals`],options:pc(n)});function hc(e){return e.kind===`products`?[{id:`title`,label:$(`Product / Variant`),type:`link`,href:e=>String(e.url),sortable:!0,hideable:!1},{id:`productType`,label:$(`Product Type`),sortable:!0},{id:`sku`,label:$(`SKU`),sortable:!0},{id:`waiting`,label:$(`Waiting`),type:`number`,sortable:!0},{id:`latestRequest`,label:$(`Latest Request`),wrap:!1,sortable:!0}]:e.kind===`subscriptions`?[{id:`subscriber`,label:$(`Subscriber`),sortable:!0,hideable:!1},{id:`state`,label:$(`State`),type:`status`,sortable:!0,value:e=>e.state.label,status:e=>e.state.status},...e.showSite?[{id:`site`,label:Craft.t(`app`,`Site`),sortable:!0}]:[],{id:`subscribed`,label:$(`Subscribed`),wrap:!1,sortable:!0}]:[{id:`event`,label:$(`Event`),hideable:!1,renderCell:({value:e})=>{let t=e,n=E`<pk-status .status=${t.status} aria-hidden="true"></pk-status> ${t.label}`;return t.url?E`<a href=${t.url}>${n}</a>`:E`<span>${n}</span>`}},{id:`when`,label:$(`When`),wrap:!1}]}function gc(e){if(e.kind===`subscriptions`)return[mc(`state`,`State`,{pendingVerification:`Pending verification`,active:`Active`,notified:`Notified`,cancelled:`Cancelled`,expired:`Expired`})];let t=mc(`attention`,`Review state`,{1:`Needs review`});return e.kind===`products`?[mc(`demand`,`Demand`,{active:`Waiting now`,past:`Past demand`}),t]:[mc(`type`,`Activity type`,{subscription:`Subscription changes`,notification:`Notification sending`}),t]}function _c(e,t){let n=new URL(location.href).searchParams,r={...ec(),search:e.kind===`activity`?``:n.get(`search`)??e.search??``,sort:t.defaultSort,filters:{},pageSize:e.kind===`products`?100:50,pageIndex:Math.max(0,(Number(n.get(`page`))||1)-1)};for(let t of gc(e)){let i=n.get(t.id)??e[t.id],a=i===!0?`1`:String(i??``);t.options?.some(e=>e.value===a)&&(r.filters[t.id]=a)}let i=n.get(`order`);return t.columns.some(e=>e.id===i&&e.sortable)&&(r.sort=[{id:i,direction:n.get(`direction`)===`desc`?`desc`:`asc`}]),r}function vc(e,t){let n=new URL(location.href),r=e.query;for(let e of[`search`,`order`,`direction`,`page`,...gc(t).map(e=>e.id)])n.searchParams.delete(e);r.search&&n.searchParams.set(`search`,r.search),r.sort[0]&&(n.searchParams.set(`order`,r.sort[0].id),n.searchParams.set(`direction`,r.sort[0].direction)),r.pageIndex&&n.searchParams.set(`page`,String(r.pageIndex+1));for(let[e,t]of Object.entries(r.filters))n.searchParams.set(e,String(t));t.kind===`subscriptions`&&!r.filters.state&&n.searchParams.set(`state`,`all`),history.replaceState(history.state,``,n),document.querySelectorAll(`[data-bis-product-source]`).forEach(e=>{let t=new URL(e.href),r=t.searchParams.get(`productType`);t.search=n.search,t.searchParams.delete(`page`),r?t.searchParams.set(`productType`,r):t.searchParams.delete(`productType`),e.href=t.toString()})}function yc(e,t){let n=document.createElement(`pk-select`);n.slot=`toolbar-start`,n.setAttribute(`aria-label`,$(`Status`));let r=[{value:`all`,label:$(`All statuses`)},...gc(t)[0].options];for(let e of r){let t=document.createElement(`pk-option`);t.value=e.value,t.textContent=e.label,n.append(t)}let i=()=>{n.value=String(e.query.filters.state??`all`)};return i(),n.addEventListener(`change`,()=>{let t={...e.query.filters};n.value===`all`?delete t.state:t.state=n.value,e.setQuery({filters:t})}),e.addEventListener(`pk-query-change`,i),n}function bc(e){e.rowLabel=`subscriber`,e.rowActions=e=>[...e.canCancel?[{id:`cancel-subscription`,label:$(`Cancel subscription`)}]:[],...e.canErase?[{id:`erase-subscriber`,label:$(`Erase subscriber data`)}]:[]],e.addEventListener(`pk-row-action`,async t=>{let{action:n,row:r}=t.detail,i=$(n===`erase-subscriber`?`Erase all Back in Stock data for {email}? This removes the address from every product and cancels anything they’re waiting for. This can’t be undone.`:`Cancel this subscription for {email}? They won’t be notified about this product.`,{email:r.subscriber});if(confirm(i)){try{let e=await Craft.sendActionRequest(`POST`,`craft-commerce-back-in-stock/dashboard/${n}`,{data:{subscriptionId:r.id}});Craft.cp.displaySuccess(e.data.message)}catch(e){Craft.cp.displayError(e.response?.data?.message)}await e.refresh()}})}function xc(e){let t=JSON.parse(e.dataset.bisTable??`{}`),n=document.createElement(`pk-data-table`);if(n.mode=`remote`,n.layout=`index`,e.classList.contains(`bis-table--index`)){let e=document.querySelector(`#header`);if(e){let t=new ResizeObserver(()=>{n.isConnected?n.style.setProperty(`--pk-data-table-header-offset`,`${e.offsetHeight}px`):t.disconnect()});t.observe(e)}}if(n.label=$(t.kind===`products`?`Products`:t.kind===`subscriptions`?`Subscriptions`:`Activity`),n.searchable=t.kind!==`activity`,n.hideToolbar=t.kind===`activity`,n.columns=hc(t),n.filters=t.kind===`subscriptions`?[]:gc(t),n.defaultSort=t.kind===`products`?[{id:t.sort===`recent`?`latestRequest`:`waiting`,direction:`desc`}]:t.kind===`subscriptions`?[{id:`subscribed`,direction:`desc`}]:[],n.labels=Object.fromEntries(Object.entries($s).map(([e,t])=>[e,$(t)])),n.labels={...n.labels,search:$(t.kind===`products`?`Search products, variants, SKUs or subscriber emails`:`Search email addresses`),empty:$(t.kind===`products`?`No products have Back in Stock activity yet.`:t.kind===`subscriptions`?`No subscriptions exist for this variant yet.`:`No matching activity yet.`),noResults:$(t.kind===`products`?`No product variants match those filters.`:t.kind===`subscriptions`?`No subscriptions match those filters.`:`No matching activity yet.`)},n.query=_c(t,n),t.userId&&t.kind!==`activity`){let e=new URL(location.href).searchParams,r=n.columns.some(t=>t.sortable&&t.id===e.get(`order`))||t.kind===`products`&&[`recent`,`waiting`].includes(e.get(`sort`)??``);fc(n,{key:`back-in-stock:${t.kind}`,userId:t.userId,restoreSort:!r})}t.kind===`subscriptions`&&(n.append(yc(n,t)),bc(n));let r=t.kind===`products`?`product-table`:t.kind===`subscriptions`?`subscription-table`:`activity-table`;n.dataSource=async(e,{signal:i})=>{let a=new URL(Craft.getActionUrl(`craft-commerce-back-in-stock/dashboard/${r}`),location.href);a.searchParams.set(`page`,String(e.pageIndex+1)),a.searchParams.set(`per_page`,String(e.pageSize)),a.searchParams.set(`search`,e.search),t.variantId&&a.searchParams.set(`variantId`,String(t.variantId)),t.productType&&a.searchParams.set(`productType`,String(t.productType));for(let[t,n]of Object.entries(e.filters))a.searchParams.set(t,String(n));e.sort[0]&&(a.searchParams.set(`sort[0][sortField]`,e.sort[0].id),a.searchParams.set(`sort[0][direction]`,e.sort[0].direction));let o=await fetch(a,{signal:i,credentials:`same-origin`,headers:{Accept:`application/json`,"X-Requested-With":`XMLHttpRequest`}});if(!o.ok)throw Error(`Back In Stock table request failed (${o.status}).`);let s=await o.json();if(!Array.isArray(s.data)||!Number.isFinite(s.pagination?.total))throw Error(`Invalid table response.`);return!i.aborted&&n.isConnected&&e.pageIndex!==s.pagination.current_page-1&&n.setQuery({pageIndex:Math.max(0,s.pagination.current_page-1)}),{rows:s.data,total:s.pagination.total}},n.addEventListener(`pk-query-change`,()=>vc(n,t)),e.replaceChildren(n),vc(n,t)}function Sc(){document.querySelectorAll(`[data-bis-table]`).forEach(xc)}zo(),document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Sc,{once:!0}):Sc();
//# sourceMappingURL=cp.js.map