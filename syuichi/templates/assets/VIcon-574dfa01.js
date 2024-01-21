import{p as m,a as q,l as x,as as ae,T as B,am as T,al as ie,at as re,v as oe,d as S,h,m as c,A as U,S as M,s as k,r as G,x as V,Z as le,M as ue,e as ce,O as H,P as de,V as ge,Q as fe,L as $,au as I,av as p,aw as D,ax as ve,ay as me,az as ye,I as he,N as Se,n as be,q as _e,aA as Ce,t as xe,aB as ze,aC as ke}from"./index-c22e6166.js";const N=m({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component");function R(e){const i=q("useRender");i.render=e}const Ie=m({tag:{type:String,default:"div"}},"tag"),Pe=m({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function y(e,i,s){return x()({name:e,props:Pe({mode:s,origin:i}),setup(t,r){let{slots:l}=r;const n={onBeforeEnter(a){t.origin&&(a.style.transformOrigin=t.origin)},onLeave(a){if(t.leaveAbsolute){const{offsetTop:d,offsetLeft:g,offsetWidth:u,offsetHeight:f}=a;a._transitionInitialStyles={position:a.style.position,top:a.style.top,left:a.style.left,width:a.style.width,height:a.style.height},a.style.position="absolute",a.style.top=`${d}px`,a.style.left=`${g}px`,a.style.width=`${u}px`,a.style.height=`${f}px`}t.hideOnLeave&&a.style.setProperty("display","none","important")},onAfterLeave(a){if(t.leaveAbsolute&&(a!=null&&a._transitionInitialStyles)){const{position:d,top:g,left:u,width:f,height:b}=a._transitionInitialStyles;delete a._transitionInitialStyles,a.style.position=d||"",a.style.top=g||"",a.style.left=u||"",a.style.width=f||"",a.style.height=b||""}}};return()=>{const a=t.group?ae:B;return T(a,{name:t.disabled?"":e,css:!t.disabled,...t.group?void 0:{mode:t.mode},...t.disabled?{}:n},l.default)}}})}function J(e,i){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return x()({name:e,props:{mode:{type:String,default:s},disabled:Boolean},setup(t,r){let{slots:l}=r;return()=>T(B,{name:t.disabled?"":e,css:!t.disabled,...t.disabled?{}:i},l.default)}})}function Q(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const s=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",t=ie(`offset-${s}`);return{onBeforeEnter(n){n._parent=n.parentNode,n._initialStyle={transition:n.style.transition,overflow:n.style.overflow,[s]:n.style[s]}},onEnter(n){const a=n._initialStyle;n.style.setProperty("transition","none","important"),n.style.overflow="hidden";const d=`${n[t]}px`;n.style[s]="0",n.offsetHeight,n.style.transition=a.transition,e&&n._parent&&n._parent.classList.add(e),requestAnimationFrame(()=>{n.style[s]=d})},onAfterEnter:l,onEnterCancelled:l,onLeave(n){n._initialStyle={transition:"",overflow:n.style.overflow,[s]:n.style[s]},n.style.overflow="hidden",n.style[s]=`${n[t]}px`,n.offsetHeight,requestAnimationFrame(()=>n.style[s]="0")},onAfterLeave:r,onLeaveCancelled:r};function r(n){e&&n._parent&&n._parent.classList.remove(e),l(n)}function l(n){const a=n._initialStyle[s];n.style.overflow=n._initialStyle.overflow,a!=null&&(n.style[s]=a),delete n._initialStyle}}y("fab-transition","center center","out-in");y("dialog-bottom-transition");y("dialog-top-transition");y("fade-transition");y("scale-transition");y("scroll-x-transition");y("scroll-x-reverse-transition");y("scroll-y-transition");y("scroll-y-reverse-transition");y("slide-x-transition");y("slide-x-reverse-transition");const Fe=y("slide-y-transition");y("slide-y-reverse-transition");const qe=J("expand-transition",Q()),Ue=J("expand-x-transition",Q("",!0)),we=m({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),Me=x(!1)({name:"VDefaultsProvider",props:we(),setup(e,i){let{slots:s}=i;const{defaults:t,disabled:r,reset:l,root:n,scoped:a}=re(e);return oe(t,{reset:l,root:n,scoped:a,disabled:r}),()=>{var d;return(d=s.default)==null?void 0:d.call(s)}}});const Ve=m({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function Be(e){return{dimensionStyles:S(()=>({height:h(e.height),maxHeight:h(e.maxHeight),maxWidth:h(e.maxWidth),minHeight:h(e.minHeight),minWidth:h(e.minWidth),width:h(e.width)}))}}function Te(e){return{aspectStyles:S(()=>{const i=Number(e.aspectRatio);return i?{paddingBottom:String(1/i*100)+"%"}:void 0})}}const X=m({aspectRatio:[String,Number],contentClass:String,inline:Boolean,...N(),...Ve()},"VResponsive"),F=x()({name:"VResponsive",props:X(),setup(e,i){let{slots:s}=i;const{aspectStyles:t}=Te(e),{dimensionStyles:r}=Be(e);return R(()=>{var l;return c("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[r.value,e.style]},[c("div",{class:"v-responsive__sizer",style:t.value},null),(l=s.additional)==null?void 0:l.call(s),s.default&&c("div",{class:["v-responsive__content",e.contentClass]},[s.default()])])}),{}}}),$e=m({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),P=(e,i)=>{let{slots:s}=i;const{transition:t,disabled:r,...l}=e,{component:n=B,...a}=typeof t=="object"?t:{};return T(n,U(typeof t=="string"?{name:r?"":t}:a,l,{disabled:r}),s)};function Ne(e,i){if(!M)return;const s=i.modifiers||{},t=i.value,{handler:r,options:l}=typeof t=="object"?t:{handler:t,options:{}},n=new IntersectionObserver(function(){var f;let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],d=arguments.length>1?arguments[1]:void 0;const g=(f=e._observe)==null?void 0:f[i.instance.$.uid];if(!g)return;const u=a.some(b=>b.isIntersecting);r&&(!s.quiet||g.init)&&(!s.once||u||g.init)&&r(u,a,d),u&&s.once?Y(e,i):g.init=!0},l);e._observe=Object(e._observe),e._observe[i.instance.$.uid]={init:!1,observer:n},n.observe(e)}function Y(e,i){var t;const s=(t=e._observe)==null?void 0:t[i.instance.$.uid];s&&(s.observer.unobserve(e),delete e._observe[i.instance.$.uid])}const Re={mounted:Ne,unmounted:Y},Ae=Re,Ee=m({alt:String,cover:Boolean,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...X(),...N(),...$e()},"VImg"),Ge=x()({name:"VImg",directives:{intersect:Ae},props:Ee(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,i){let{emit:s,slots:t}=i;const r=q("VImg"),l=k(""),n=G(),a=k(e.eager?"loading":"idle"),d=k(),g=k(),u=S(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),f=S(()=>u.value.aspect||d.value/g.value||0);V(()=>e.src,()=>{b(a.value!=="idle")}),V(f,(o,v)=>{!o&&v&&n.value&&z(n.value)}),le(()=>b());function b(o){if(!(e.eager&&o)&&!(M&&!o&&!e.eager)){if(a.value="loading",u.value.lazySrc){const v=new Image;v.src=u.value.lazySrc,z(v,null)}u.value.src&&ue(()=>{var v;s("loadstart",((v=n.value)==null?void 0:v.currentSrc)||u.value.src),setTimeout(()=>{var _;if(!r.isUnmounted)if((_=n.value)!=null&&_.complete){if(n.value.naturalWidth||A(),a.value==="error")return;f.value||z(n.value,null),a.value==="loading"&&C()}else f.value||z(n.value),E()})})}}function C(){var o;r.isUnmounted||(E(),z(n.value),a.value="loaded",s("load",((o=n.value)==null?void 0:o.currentSrc)||u.value.src))}function A(){var o;r.isUnmounted||(a.value="error",s("error",((o=n.value)==null?void 0:o.currentSrc)||u.value.src))}function E(){const o=n.value;o&&(l.value=o.currentSrc||o.src)}let w=-1;ce(()=>{clearTimeout(w)});function z(o){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const _=()=>{if(clearTimeout(w),r.isUnmounted)return;const{naturalHeight:W,naturalWidth:j}=o;W||j?(d.value=j,g.value=W):!o.complete&&a.value==="loading"&&v!=null?w=window.setTimeout(_,v):(o.currentSrc.endsWith(".svg")||o.currentSrc.startsWith("data:image/svg+xml"))&&(d.value=1,g.value=1)};_()}const L=S(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),K=()=>{var _;if(!u.value.src||a.value==="idle")return null;const o=c("img",{class:["v-img__img",L.value],style:{objectPosition:e.position},src:u.value.src,srcset:u.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:n,onLoad:C,onError:A},null),v=(_=t.sources)==null?void 0:_.call(t);return c(P,{transition:e.transition,appear:!0},{default:()=>[H(v?c("picture",{class:"v-img__picture"},[v,o]):o,[[fe,a.value==="loaded"]])]})},ee=()=>c(P,{transition:e.transition},{default:()=>[u.value.lazySrc&&a.value!=="loaded"&&c("img",{class:["v-img__img","v-img__img--preload",L.value],style:{objectPosition:e.position},src:u.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),te=()=>t.placeholder?c(P,{transition:e.transition,appear:!0},{default:()=>[(a.value==="loading"||a.value==="error"&&!t.error)&&c("div",{class:"v-img__placeholder"},[t.placeholder()])]}):null,ne=()=>t.error?c(P,{transition:e.transition,appear:!0},{default:()=>[a.value==="error"&&c("div",{class:"v-img__error"},[t.error()])]}):null,se=()=>e.gradient?c("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,O=k(!1);{const o=V(f,v=>{v&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{O.value=!0})}),o())})}return R(()=>{const o=F.filterProps(e);return H(c(F,U({class:["v-img",{"v-img--booting":!O.value},e.class],style:[{width:h(e.width==="auto"?d.value:e.width)},e.style]},o,{aspectRatio:f.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>c(ge,null,[c(K,null,null),c(ee,null,null),c(se,null,null),c(te,null,null),c(ne,null,null)]),default:t.default}),[[de("intersect"),{handler:b,options:e.options},null,{once:!0}]])}),{currentSrc:l,image:n,state:a,naturalWidth:d,naturalHeight:g}}}),pe=m({border:[Boolean,Number,String]},"border");function Je(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$();return{borderClasses:S(()=>{const t=I(e)?e.value:e.border,r=[];if(t===!0||t==="")r.push(`${i}--border`);else if(typeof t=="string"||t===0)for(const l of String(t).split(" "))r.push(`border-${l}`);return r})}}function Z(e){return p(()=>{const i=[],s={};if(e.value.background)if(D(e.value.background)){if(s.backgroundColor=e.value.background,!e.value.text&&ve(e.value.background)){const t=me(e.value.background);if(t.a==null||t.a===1){const r=ye(t);s.color=r,s.caretColor=r}}}else i.push(`bg-${e.value.background}`);return e.value.text&&(D(e.value.text)?(s.color=e.value.text,s.caretColor=e.value.text):i.push(`text-${e.value.text}`)),{colorClasses:i,colorStyles:s}})}function Le(e,i){const s=S(()=>({text:I(e)?e.value:i?e[i]:null})),{colorClasses:t,colorStyles:r}=Z(s);return{textColorClasses:t,textColorStyles:r}}function Qe(e,i){const s=S(()=>({background:I(e)?e.value:i?e[i]:null})),{colorClasses:t,colorStyles:r}=Z(s);return{backgroundColorClasses:t,backgroundColorStyles:r}}const Xe=m({elevation:{type:[Number,String],validator(e){const i=parseInt(e);return!isNaN(i)&&i>=0&&i<=24}}},"elevation");function Ye(e){return{elevationClasses:S(()=>{const s=I(e)?e.value:e.elevation,t=[];return s==null||t.push(`elevation-${s}`),t})}}const Ze=m({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function Ke(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$();return{roundedClasses:S(()=>{const t=I(e)?e.value:e.rounded,r=[];if(t===!0||t==="")r.push(`${i}--rounded`);else if(typeof t=="string"||t===0)for(const l of String(t).split(" "))r.push(`rounded-${l}`);return r})}}const Oe=["x-small","small","default","large","x-large"],We=m({size:{type:[String,Number],default:"default"}},"size");function je(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$();return p(()=>{let s,t;return he(Oe,e.size)?s=`${i}--size-${e.size}`:e.size&&(t={width:h(e.size),height:h(e.size)}),{sizeClasses:s,sizeStyles:t}})}const He=m({color:String,start:Boolean,end:Boolean,icon:Se,...N(),...We(),...Ie({tag:"i"}),...be()},"VIcon"),et=x()({name:"VIcon",props:He(),setup(e,i){let{attrs:s,slots:t}=i;const r=G(),{themeClasses:l}=_e(e),{iconData:n}=Ce(S(()=>r.value||e.icon)),{sizeClasses:a}=je(e),{textColorClasses:d,textColorStyles:g}=Le(xe(e,"color"));return R(()=>{var f,b;const u=(f=t.default)==null?void 0:f.call(t);return u&&(r.value=(b=ze(u).filter(C=>C.type===ke&&C.children&&typeof C.children=="string")[0])==null?void 0:b.children),c(n.value.component,{tag:e.tag,icon:n.value.icon,class:["v-icon","notranslate",l.value,a.value,d.value,{"v-icon--clickable":!!s.onClick,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[a.value?void 0:{fontSize:h(e.size),height:h(e.size),width:h(e.size)},g.value,e.style],role:s.onClick?"button":void 0,"aria-hidden":!s.onClick},{default:()=>[u]})}),{}}});export{Ae as I,P as M,Ge as V,Ie as a,pe as b,Xe as c,Ze as d,Qe as e,Je as f,Ye as g,Ke as h,Me as i,qe as j,et as k,We as l,N as m,je as n,Le as o,Ve as p,Be as q,$e as r,Fe as s,Ue as t,R as u,Z as v};