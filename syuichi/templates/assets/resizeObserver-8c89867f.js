import{r as u,a2 as a,e as R,x as c,a3 as f,a4 as g}from"./index-c22e6166.js";function m(s){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"content";const o=u(),n=u();if(a){const t=new ResizeObserver(e=>{s==null||s(e,t),e.length&&(i==="content"?n.value=e[0].contentRect:n.value=e[0].target.getBoundingClientRect())});R(()=>{t.disconnect()}),c(o,(e,r)=>{r&&(t.unobserve(f(r)),n.value=void 0),e&&t.observe(f(e))},{flush:"post"})}return{resizeRef:o,contentRect:g(n)}}export{m as u};
