const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pusher-CYDBBLYO.js","assets/inertia-BEHl0vk_.js","assets/Index-BCLf0z3g.js","assets/AdminLayout-DNh9n8Eb.js","assets/clsx-Cy1F_eMr.js","assets/XMarkIcon-FWy0L9tR.js","assets/DocumentTextIcon-MKnFnKmh.js","assets/ChartBarIcon-pCHAFdaB.js","assets/TrashIcon-Dn7g19qi.js","assets/ChevronRightIcon-CEgUbM3v.js","assets/ArrowRightIcon-BmRdU9B5.js","assets/vendor-TK0t8ahh.js","assets/Dashboard-z1EGA5eP.js","assets/UserGroupIcon-Bwg31q74.js","assets/ClipboardDocumentListIcon-BKvjzkE_.js","assets/AcademicCapIcon-B45j8uIB.js","assets/ClockIcon-BaZgS1hf.js","assets/ArrowTrendingUpIcon-Dby9weOn.js","assets/Form-DIcJrCim.js","assets/with-selector-DQriL4En.js","assets/ArrowLeftIcon-shuPnah-.js","assets/PhotoIcon-a_eo3mW1.js","assets/CheckCircleIcon-Z9Q2J5p2.js","assets/Index-CkOKVb7c.js","assets/MagnifyingGlassIcon-7hRWudYL.js","assets/FunnelIcon-71smuPcQ.js","assets/ExclamationTriangleIcon-xHejS8b4.js","assets/Index-W6MSJTde.js","assets/NoSymbolIcon-Ep6el8XP.js","assets/Violations-BVNluQEh.js","assets/Index-D9rfl2zs.js","assets/ShieldCheckIcon-DJRvPaHI.js","assets/EnvelopeIcon-CKcdI9kh.js","assets/Form-7kxJC5MH.js","assets/CalendarIcon-f862JYkR.js","assets/Index-BkskiSTE.js","assets/format-Dl1nktRO.js","assets/id-BzV5ZBcg.js","assets/Questions-BAZ-Sb-w.js","assets/Index-Ho5D5Usv.js","assets/UserCircleIcon-BO6_9gpL.js","assets/AdminLogin-DvxSLS1Q.js","assets/EyeIcon-DQIS1OAi.js","assets/Login-fVrCC239.js","assets/Register-CQuUX-EV.js","assets/Dashboard-OCNIvkj8.js","assets/MainLayout-BHpPMoaa.js","assets/Error-CgPxOydP.js","assets/Result-N_Idh4Oo.js","assets/XCircleIcon-ddsLuIIy.js","assets/BookOpenIcon-jjkIpqm6.js","assets/TrophyIcon-DEvMpUrG.js","assets/ExclamationCircleIcon-Dvn4drsM.js","assets/Review-DN86gjA9.js","assets/ChevronLeftIcon-CiEPEXf1.js","assets/Show-BKdZD6o2.js","assets/InformationCircleIcon-gmjg1nxw.js","assets/Take-BIlxfy9W.js","assets/Index-Bn1ZiwFw.js","assets/Show-wlRVEjzM.js","assets/Edit-GEQ7Jyqe.js","assets/Index-DvRTeIjn.js","assets/Welcome-Dth5gVYa.js"])))=>i.map(i=>d[i]);
import{r as u,a as G,W as ee}from"./inertia-BEHl0vk_.js";import{r as te}from"./vendor-TK0t8ahh.js";const re="modulepreload",oe=function(e){return"/build/"+e},F={},m=function(t,r,s){let i=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),n=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(r.map(l=>{if(l=oe(l),l in F)return;F[l]=!0;const c=l.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":re,c||(d.as="script"),d.crossOrigin="",d.href=l,n&&d.setAttribute("nonce",n),document.head.appendChild(d),c)return new Promise((f,_)=>{d.addEventListener("load",f),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(o){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=o,window.dispatchEvent(n),!n.defaultPrevented)throw o}return i.then(o=>{for(const n of o||[])n.status==="rejected"&&a(n.reason);return t().catch(a)})};var U={exports:{}},I={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var se=u,ae=Symbol.for("react.element"),ie=Symbol.for("react.fragment"),ne=Object.prototype.hasOwnProperty,le=se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,de={key:!0,ref:!0,__self:!0,__source:!0};function W(e,t,r){var s,i={},a=null,o=null;r!==void 0&&(a=""+r),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(s in t)ne.call(t,s)&&!de.hasOwnProperty(s)&&(i[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)i[s]===void 0&&(i[s]=t[s]);return{$$typeof:ae,type:e,key:a,ref:o,props:i,_owner:le.current}}I.Fragment=ie;I.jsx=W;I.jsxs=W;U.exports=I;var A=U.exports;window.axios=G;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";m(async()=>{const{default:e}=await import("./echo-DL0QqwGZ.js");return{default:e}},[]).then(({default:e})=>{m(async()=>{const{default:t}=await import("./pusher-CYDBBLYO.js").then(r=>r.p);return{default:t}},__vite__mapDeps([0,1])).then(({default:t})=>{window.Pusher=t,window.Echo=new e({broadcaster:"reverb",key:"tryout-utbk-key",wsHost:"localhost",wsPort:"8080",wssPort:"8080",forceTLS:!1,enabledTransports:["ws","wss"]})})});var q,z=te;q=z.createRoot,z.hydrateRoot;async function ue(e,t){for(const r of Array.isArray(e)?e:[e]){const s=t[r];if(!(typeof s>"u"))return typeof s=="function"?s():s}throw new Error(`Page not found: ${e}`)}let ce={data:""},pe=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||ce},me=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,fe=/\/\*[^]*?\*\/|  +/g,H=/\n+/g,E=(e,t)=>{let r="",s="",i="";for(let a in e){let o=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+o+";":s+=a[1]=="f"?E(o,a):a+"{"+E(o,a[1]=="k"?"":t)+"}":typeof o=="object"?s+=E(o,t?t.replace(/([^,])+/g,n=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=E.p?E.p(a,o):a+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+s},h={},B=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+B(e[r]);return t}return e},_e=(e,t,r,s,i)=>{let a=B(e),o=h[a]||(h[a]=(l=>{let c=0,p=11;for(;c<l.length;)p=101*p+l.charCodeAt(c++)>>>0;return"go"+p})(a));if(!h[o]){let l=a!==e?e:(c=>{let p,d,f=[{}];for(;p=me.exec(c.replace(fe,""));)p[4]?f.shift():p[3]?(d=p[3].replace(H," ").trim(),f.unshift(f[0][d]=f[0][d]||{})):f[0][p[1]]=p[2].replace(H," ").trim();return f[0]})(e);h[o]=E(i?{["@keyframes "+o]:l}:l,r?"":"."+o)}let n=r&&h.g?h.g:null;return r&&(h.g=h[o]),((l,c,p,d)=>{d?c.data=c.data.replace(d,l):c.data.indexOf(l)===-1&&(c.data=p?l+c.data:c.data+l)})(h[o],t,s,n),o},ge=(e,t,r)=>e.reduce((s,i,a)=>{let o=t[a];if(o&&o.call){let n=o(r),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;o=l?"."+l:n&&typeof n=="object"?n.props?"":E(n,""):n===!1?"":n}return s+i+(o??"")},"");function T(e){let t=this||{},r=e.call?e(t.p):e;return _e(r.unshift?r.raw?ge(r,[].slice.call(arguments,1),t.p):r.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):r,pe(t.target),t.g,t.o,t.k)}let M,k,V;T.bind({g:1});let x=T.bind({k:1});function ye(e,t,r,s){E.p=t,M=e,k=r,V=s}function b(e,t){let r=this||{};return function(){let s=arguments;function i(a,o){let n=Object.assign({},a),l=n.className||i.className;r.p=Object.assign({theme:k&&k()},n),r.o=/ *go\d+/.test(l),n.className=T.apply(r,s)+(l?" "+l:"");let c=e;return e[0]&&(c=n.as||e,delete n.as),V&&c[0]&&V(n),M(c,n)}return i}}var ve=e=>typeof e=="function",j=(e,t)=>ve(e)?e(t):e,he=(()=>{let e=0;return()=>(++e).toString()})(),Q=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),xe=20,C="default",Y=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:s}=t;return Y(e,{type:e.toasts.find(o=>o.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(o=>o.id===i||i===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+a}))}}},R=[],K={toasts:[],pausedAt:void 0,settings:{toastLimit:xe}},v={},X=(e,t=C)=>{v[t]=Y(v[t]||K,e),R.forEach(([r,s])=>{r===t&&s(v[t])})},Z=e=>Object.keys(v).forEach(t=>X(e,t)),Ee=e=>Object.keys(v).find(t=>v[t].toasts.some(r=>r.id===e)),D=(e=C)=>t=>{X(t,e)},be={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Pe=(e={},t=C)=>{let[r,s]=u.useState(v[t]||K),i=u.useRef(v[t]);u.useEffect(()=>(i.current!==v[t]&&s(v[t]),R.push([t,s]),()=>{let o=R.findIndex(([n])=>n===t);o>-1&&R.splice(o,1)}),[t]);let a=r.toasts.map(o=>{var n,l,c;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((n=e[o.type])==null?void 0:n.removeDelay)||(e==null?void 0:e.removeDelay),duration:o.duration||((l=e[o.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||be[o.type],style:{...e.style,...(c=e[o.type])==null?void 0:c.style,...o.style}}});return{...r,toasts:a}},we=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||he()}),P=e=>(t,r)=>{let s=we(t,e,r);return D(s.toasterId||Ee(s.id))({type:2,toast:s}),s.id},g=(e,t)=>P("blank")(e,t);g.error=P("error");g.success=P("success");g.loading=P("loading");g.custom=P("custom");g.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):Z(r)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):Z(r)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,r)=>{let s=g.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let a=t.success?j(t.success,i):void 0;return a?g.success(a,{id:s,...r,...r==null?void 0:r.success}):g.dismiss(s),i}).catch(i=>{let a=t.error?j(t.error,i):void 0;a?g.error(a,{id:s,...r,...r==null?void 0:r.error}):g.dismiss(s)}),e};var Ae=1e3,Oe=(e,t="default")=>{let{toasts:r,pausedAt:s}=Pe(e,t),i=u.useRef(new Map).current,a=u.useCallback((d,f=Ae)=>{if(i.has(d))return;let _=setTimeout(()=>{i.delete(d),o({type:4,toastId:d})},f);i.set(d,_)},[]);u.useEffect(()=>{if(s)return;let d=Date.now(),f=r.map(_=>{if(_.duration===1/0)return;let w=(_.duration||0)+_.pauseDuration-(d-_.createdAt);if(w<0){_.visible&&g.dismiss(_.id);return}return setTimeout(()=>g.dismiss(_.id,t),w)});return()=>{f.forEach(_=>_&&clearTimeout(_))}},[r,s,t]);let o=u.useCallback(D(t),[t]),n=u.useCallback(()=>{o({type:5,time:Date.now()})},[o]),l=u.useCallback((d,f)=>{o({type:1,toast:{id:d,height:f}})},[o]),c=u.useCallback(()=>{s&&o({type:6,time:Date.now()})},[s,o]),p=u.useCallback((d,f)=>{let{reverseOrder:_=!1,gutter:w=8,defaultPosition:S}=f||{},L=r.filter(y=>(y.position||S)===(d.position||S)&&y.height),J=L.findIndex(y=>y.id===d.id),N=L.filter((y,$)=>$<J&&y.visible).length;return L.filter(y=>y.visible).slice(..._?[N+1]:[0,N]).reduce((y,$)=>y+($.height||0)+w,0)},[r]);return u.useEffect(()=>{r.forEach(d=>{if(d.dismissed)a(d.id,d.removeDelay);else{let f=i.get(d.id);f&&(clearTimeout(f),i.delete(d.id))}})},[r,a]),{toasts:r,handlers:{updateHeight:l,startPause:n,endPause:c,calculateOffset:p}}},Re=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,je=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ie=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Te=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Re} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${je} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ie} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,De=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Le=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${De} 1s linear infinite;
`,$e=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ke=x`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ve=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$e} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ke} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Ce=b("div")`
  position: absolute;
`,Se=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ne=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Fe=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ne} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ze=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?u.createElement(Fe,null,t):t:r==="blank"?null:u.createElement(Se,null,u.createElement(Le,{...s}),r!=="loading"&&u.createElement(Ce,null,r==="error"?u.createElement(Te,{...s}):u.createElement(Ve,{...s})))},He=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ue=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,We="0%{opacity:0;} 100%{opacity:1;}",qe="0%{opacity:1;} 100%{opacity:0;}",Be=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Me=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Qe=(e,t)=>{let r=e.includes("top")?1:-1,[s,i]=Q()?[We,qe]:[He(r),Ue(r)];return{animation:t?`${x(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ye=u.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?Qe(e.position||t||"top-center",e.visible):{opacity:0},a=u.createElement(ze,{toast:e}),o=u.createElement(Me,{...e.ariaProps},j(e.message,e));return u.createElement(Be,{className:e.className,style:{...i,...r,...e.style}},typeof s=="function"?s({icon:a,message:o}):u.createElement(u.Fragment,null,a,o))});ye(u.createElement);var Ke=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let a=u.useCallback(o=>{if(o){let n=()=>{let l=o.getBoundingClientRect().height;s(e,l)};n(),new MutationObserver(n).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return u.createElement("div",{ref:a,className:t,style:r},i)},Xe=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Q()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...i}},Ze=T`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,O=16,Je=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:a,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:c}=Oe(r,a);return u.createElement("div",{"data-rht-toaster":a||"",style:{position:"fixed",zIndex:9999,top:O,left:O,right:O,bottom:O,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(p=>{let d=p.position||t,f=c.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),_=Xe(d,f);return u.createElement(Ke,{id:p.id,key:p.id,onHeightUpdate:c.updateHeight,className:p.visible?Ze:"",style:_},p.type==="custom"?j(p.message,p):i?i(p):u.createElement(Ye,{toast:p,position:d}))}))};const Ge="Tryout UTBK";ee({title:e=>`${e} - ${Ge}`,resolve:e=>ue(`./Pages/${e}.jsx`,Object.assign({"./Pages/Admin/Categories/Index.jsx":()=>m(()=>import("./Index-BCLf0z3g.js"),__vite__mapDeps([2,1,3,4,5,6,7,8,9,10,11])),"./Pages/Admin/Dashboard.jsx":()=>m(()=>import("./Dashboard-z1EGA5eP.js"),__vite__mapDeps([12,1,3,4,5,6,7,13,14,15,16,17,11])),"./Pages/Admin/Questions/Form.jsx":()=>m(()=>import("./Form-DIcJrCim.js"),__vite__mapDeps([18,1,3,4,5,6,7,11,19,20,21,22])),"./Pages/Admin/Questions/Index.jsx":()=>m(()=>import("./Index-CkOKVb7c.js"),__vite__mapDeps([23,1,3,4,5,6,7,8,20,24,25,26,11])),"./Pages/Admin/Reports/Index.jsx":()=>m(()=>import("./Index-W6MSJTde.js"),__vite__mapDeps([27,1,3,4,5,6,7,16,17,22,26,13,28,11])),"./Pages/Admin/Reports/Violations.jsx":()=>m(()=>import("./Violations-BVNluQEh.js"),__vite__mapDeps([29,1,3,4,5,6,7,20,28,11])),"./Pages/Admin/Settings/Index.jsx":()=>m(()=>import("./Index-D9rfl2zs.js"),__vite__mapDeps([30,1,3,4,5,6,7,15,31,32,26,11])),"./Pages/Admin/Tryouts/Form.jsx":()=>m(()=>import("./Form-7kxJC5MH.js"),__vite__mapDeps([33,1,3,4,5,6,7,20,21,16,22,34,11])),"./Pages/Admin/Tryouts/Index.jsx":()=>m(()=>import("./Index-BkskiSTE.js"),__vite__mapDeps([35,1,3,4,5,6,7,8,24,21,34,36,37,16,13,11])),"./Pages/Admin/Tryouts/Questions.jsx":()=>m(()=>import("./Questions-BAZ-Sb-w.js"),__vite__mapDeps([38,1,3,4,5,6,7,20,8,22,11])),"./Pages/Admin/Users/Index.jsx":()=>m(()=>import("./Index-Ho5D5Usv.js"),__vite__mapDeps([39,1,3,4,5,6,7,8,24,40,31,15,36,37,11])),"./Pages/Auth/AdminLogin.jsx":()=>m(()=>import("./AdminLogin-DvxSLS1Q.js"),__vite__mapDeps([41,1,42,11])),"./Pages/Auth/Login.jsx":()=>m(()=>import("./Login-fVrCC239.js"),__vite__mapDeps([43,1,20,42,22,11])),"./Pages/Auth/Register.jsx":()=>m(()=>import("./Register-CQuUX-EV.js"),__vite__mapDeps([44,1,22,20,42,11])),"./Pages/Dashboard.jsx":()=>m(()=>import("./Dashboard-OCNIvkj8.js"),__vite__mapDeps([45,1,46,4,11,5,6,7,16,14])),"./Pages/Error.jsx":()=>m(()=>import("./Error-CgPxOydP.js"),__vite__mapDeps([47,1,46,4,11,5,26])),"./Pages/Exam/Result.jsx":()=>m(()=>import("./Result-N_Idh4Oo.js"),__vite__mapDeps([48,1,46,4,11,5,16,22,49,50,51,10,52,20,36,37])),"./Pages/Exam/Review.jsx":()=>m(()=>import("./Review-DN86gjA9.js"),__vite__mapDeps([53,1,46,4,11,5,50,20,22,49,9,54])),"./Pages/Exam/Show.jsx":()=>m(()=>import("./Show-BKdZD6o2.js"),__vite__mapDeps([55,1,46,4,11,5,6,16,13,26,10,7,37,56])),"./Pages/Exam/Take.jsx":()=>m(()=>import("./Take-BIlxfy9W.js"),__vite__mapDeps([57,1,19,16,26,54,9,5,11])),"./Pages/History/Index.jsx":()=>m(()=>import("./Index-Bn1ZiwFw.js"),__vite__mapDeps([58,1,46,4,11,5,7,6,22,10,34,16,49,52])),"./Pages/Leaderboard/Show.jsx":()=>m(()=>import("./Show-wlRVEjzM.js"),__vite__mapDeps([59,1,46,4,11,5,20,13,24,51,16])),"./Pages/Profile/Edit.jsx":()=>m(()=>import("./Edit-GEQ7Jyqe.js"),__vite__mapDeps([60,1,46,4,11,5,40,32,15,56])),"./Pages/Tryouts/Index.jsx":()=>m(()=>import("./Index-DvRTeIjn.js"),__vite__mapDeps([61,1,46,4,11,5,14,24,25,6,16,13,10])),"./Pages/Welcome.jsx":()=>m(()=>import("./Welcome-Dth5gVYa.js"),__vite__mapDeps([62,1,10,50,16,7,51,15,31,11]))})),setup({el:e,App:t,props:r}){q(e).render(A.jsxs(A.Fragment,{children:[A.jsx(t,{...r}),A.jsx(Je,{position:"top-right",toastOptions:{duration:4e3,style:{background:"#363636",color:"#fff"},success:{style:{background:"#10b981"}},error:{style:{background:"#ef4444"}}}})]}))},progress:{color:"#4F46E5"}});export{A as j};
