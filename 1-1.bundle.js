!function(e){function t(t){for(var r,a,c=t[0],s=t[1],l=t[2],p=0,d=[];p<c.length;p++)a=c[p],i[a]&&d.push(i[a][0]),i[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var s=n[c];0!==i[s]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={1:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/computacao-grafica";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=s;o.push([3,0]),n()}([,function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(0)),o=n(0),a=n(2);t.init=a.init,t.initPerspective=a.initPerspective,t.axes=function(){var e=new i.LineBasicMaterial({color:16711680}),t=new i.LineBasicMaterial({color:65280}),n=new i.LineBasicMaterial({color:255}),r=new i.Geometry,a=new i.Geometry,c=new i.Geometry;r.vertices.push(new i.Vector3(-9999,0,0)),r.vertices.push(new i.Vector3(9999,0,0)),a.vertices.push(new i.Vector3(0,-9999,0)),a.vertices.push(new i.Vector3(0,9999,0)),c.vertices.push(new i.Vector3(0,0,-9999)),c.vertices.push(new i.Vector3(0,0,9999));var s=new i.Line(r,e),l=new i.Line(a,t),u=new i.Line(c,n);return(new o.Group).add(s,l,u)},t.square=function(e,n,r,i){return t.shape([[e,n],[e+r,n],[e+r,n+r],[e,n+r]],i)},t.shape=function(e,t){var n=new o.Shape(e.map(function(e){return new(o.Vector2.bind.apply(o.Vector2,[void 0].concat(e)))})),r=new o.ShapeGeometry(n),i=new o.MeshBasicMaterial(t);return new o.Mesh(r,i)},t.line2D=function(e,t){var n,r=new o.Geometry;(n=r.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e,[0])))}));var i=new o.LineBasicMaterial(t);return new o.Line(r,i)},t.line3D=function(e,t){var n,r=new o.Geometry;(n=r.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))}));var i=new o.LineBasicMaterial(t);return new o.Line(r,i)},t.degToRad=function(e){return e*Math.PI/180},t.lineLoop=function(e,t){var n,r=new o.Geometry,i=new o.LineBasicMaterial(t);return(n=r.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))})),new o.LineLoop(r,i)},t.controls=function(e){var t=Object.keys(e),n=document.createElement("div");n.innerText="Controles:",t.forEach(function(t){var r=e[t],i=document.createElement("p");i.innerText=t+": "+r,n.appendChild(i)}),n.style.padding="6px 14px",n.style.position="fixed",n.style.bottom="0",n.style.right="0",n.style.backgroundColor="rgba(255,255,255,0.2)",n.style.color="white",n.style.fontFamily="sans-serif",n.style.userSelect="none",n.style.textAlign="left",document.body.appendChild(n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n(0),o=n(0);t.init=function(e){var t,n=window.innerWidth,o=window.innerHeight,a=n/2,c=o/2,s=new r.WebGLRenderer({antialias:!0});s.setSize(n,o);var l=new r.OrthographicCamera(-a,a,c,-c,-1,9e3);l.position.set(0,0,100),l.lookAt(0,0,0),e&&e.camera&&((t=l.position).set.apply(t,e.camera.position),l.lookAt.apply(l,e.camera.lookAt));var u=new r.Scene,p=new i.AmbientLight(0);u.add(p);var d=[];d[0]=new r.PointLight(16777215,1,0),d[1]=new r.PointLight(16777215,1,0),d[2]=new r.PointLight(16777215,1,0);var h=1;return e&&e.lights&&(h=e.lights.scale),d[0].position.set(0,200*h,0),d[1].position.set(100*h,300*h,100*h),d[2].position.set(-200*h,-200*h,-100*h),u.add(d[0]),u.add(d[1]),u.add(d[2]),[u,s,l,{width:n,height:o,axisWidth:a,axisHeight:c}]},t.initPerspective=function(e,t,n,a,c){var s,l=window.innerWidth,u=window.innerHeight,p=l/2,d=u/2,h=new r.WebGLRenderer({antialias:!0});h.setSize(l,u);var w=new o.PerspectiveCamera(e,t,n,a);w.position.set(100,100,100),w.lookAt(0,0,0),c&&c.camera&&((s=w.position).set.apply(s,c.camera.position),w.lookAt.apply(w,c.camera.lookAt));var v=new r.Scene,f=new i.AmbientLight(0);v.add(f);var y=[];y[0]=new r.PointLight(16777215,1,0),y[1]=new r.PointLight(16777215,1,0),y[2]=new r.PointLight(16777215,1,0);var m=1;return c&&c.lights&&(m=c.lights.scale),y[0].position.set(0,200*m,0),y[1].position.set(100*m,300*m,100*m),y[2].position.set(-200*m,-200*m,-100*m),v.add(y[0]),v.add(y[1]),v.add(y[2]),[v,h,w,{width:l,height:u,axisWidth:p,axisHeight:d}]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(0),o=r.init(),a=(o[0],o[1]),c=o[2],s=o[3];s.axisHeight,s.axisWidth,s.height,s.width;document.body.appendChild(a.domElement);var l,u=0,p=[new i.Scene,new i.Scene,new i.Scene,new i.Scene];l=p[0];var d=r.shape([[0,0],[100,0],[100*Math.cos(60*Math.PI/180),100*Math.sin(60*Math.PI/180)]],{color:16711680});l.add(d),l=p[1];var h=new i.Geometry;h.vertices.push(new i.Vector3(0,0,2),new i.Vector3(100,0,2),new i.Vector3(100*Math.cos(60*Math.PI/180),100*Math.sin(60*Math.PI/180),2));var w=new i.LineBasicMaterial({color:16711680}),v=new i.LineLoop(h,w);l.add(v),(l=p[2]).add(new i.LineLoop(h,w));var f=r.shape([[0,0],[-100,0],[-100*Math.cos(60*Math.PI/180),-100*Math.sin(60*Math.PI/180)]],{color:16711680});l.add(f),l=p[3];for(var y,m=function(e){return 100*Math.sin(e*Math.PI/180)},g=new i.Geometry,b=new i.LineBasicMaterial({color:16777215}),M=0;M<6;M++)g.vertices.push(new i.Vector3((y=60+-60*M,100*Math.cos(y*Math.PI/180)),m(60+-60*M),1));var L=new i.Line(g,b);l.add(L);for(var P=0,x=p;P<x.length;P++){x[P].add(r.axes())}var V=function(){requestAnimationFrame(V),a.render(l,c)};V(),window.addEventListener("keydown",function(e){switch(e.key){case"ArrowRight":l=p[u++%4];break;case"ArrowLeft":l=p[(u+=3)%4]}})}]);