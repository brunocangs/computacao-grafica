!function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],p=0,u=[];p<s.length;p++)i=s[p],a[i]&&u.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(d&&d(t);u.length;)u.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={2:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/computacao-grafica";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;o.push([4,0]),n()}([,function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(0)),o=n(0),i=n(2);t.init=i.init,t.initPerspective=i.initPerspective,t.axes=function(){var e=new a.LineBasicMaterial({color:16711680}),t=new a.LineBasicMaterial({color:65280}),n=new a.LineBasicMaterial({color:255}),r=new a.Geometry,i=new a.Geometry,s=new a.Geometry;r.vertices.push(new a.Vector3(-9999,0,0)),r.vertices.push(new a.Vector3(9999,0,0)),i.vertices.push(new a.Vector3(0,-9999,0)),i.vertices.push(new a.Vector3(0,9999,0)),s.vertices.push(new a.Vector3(0,0,-9999)),s.vertices.push(new a.Vector3(0,0,9999));var c=new a.Line(r,e),l=new a.Line(i,t),d=new a.Line(s,n);return(new o.Group).add(c,l,d)},t.square=function(e,n,r,a){return t.shape([[e,n],[e+r,n],[e+r,n+r],[e,n+r]],a)},t.shape=function(e,t){var n=new o.Shape(e.map(function(e){return new(o.Vector2.bind.apply(o.Vector2,[void 0].concat(e)))})),r=new o.ShapeGeometry(n),a=new o.MeshBasicMaterial(t);return new o.Mesh(r,a)},t.line2D=function(e,t){var n,r=new o.Geometry;(n=r.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e,[0])))}));var a=new o.LineBasicMaterial(t);return new o.Line(r,a)},t.line3D=function(e,t){var n,r=new o.Geometry;(n=r.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))}));var a=new o.LineBasicMaterial(t);return new o.Line(r,a)},t.degToRad=function(e){return e*Math.PI/180},t.lineLoop=function(e,t){var n,r=new o.Geometry,a=new o.LineBasicMaterial(t);return(n=r.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))})),new o.LineLoop(r,a)},t.controls=function(e){var t=Object.keys(e),n=document.createElement("div");n.innerText="Controles:",t.forEach(function(t){var r=e[t],a=document.createElement("p");a.innerText=t+": "+r,n.appendChild(a)}),n.style.padding="6px 14px",n.style.position="fixed",n.style.bottom="0",n.style.right="0",n.style.backgroundColor="rgba(255,255,255,0.2)",n.style.color="white",n.style.fontFamily="sans-serif",n.style.userSelect="none",n.style.textAlign="left",document.body.appendChild(n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(0),o=n(0);t.init=function(e){var t,n=window.innerWidth,o=window.innerHeight,i=n/2,s=o/2,c=new r.WebGLRenderer({antialias:!0});c.setSize(n,o);var l=new r.OrthographicCamera(-i,i,s,-s,-1,9e3);l.position.set(0,0,100),l.lookAt(0,0,0),e&&e.camera&&((t=l.position).set.apply(t,e.camera.position),l.lookAt.apply(l,e.camera.lookAt));var d=new r.Scene,p=new a.AmbientLight(0);d.add(p);var u=[];u[0]=new r.PointLight(16777215,1,0),u[1]=new r.PointLight(16777215,1,0),u[2]=new r.PointLight(16777215,1,0);var w=1;return e&&e.lights&&(w=e.lights.scale),u[0].position.set(0,200*w,0),u[1].position.set(100*w,300*w,100*w),u[2].position.set(-200*w,-200*w,-100*w),d.add(u[0]),d.add(u[1]),d.add(u[2]),[d,c,l,{width:n,height:o,axisWidth:i,axisHeight:s}]},t.initPerspective=function(e,t,n,i,s){var c,l=window.innerWidth,d=window.innerHeight,p=l/2,u=d/2,w=new r.WebGLRenderer({antialias:!0});w.setSize(l,d);var h=new o.PerspectiveCamera(e,t,n,i);h.position.set(100,100,100),h.lookAt(0,0,0),s&&s.camera&&((c=h.position).set.apply(c,s.camera.position),h.lookAt.apply(h,s.camera.lookAt));var v=new r.Scene,f=new a.AmbientLight(0);v.add(f);var y=[];y[0]=new r.PointLight(16777215,1,0),y[1]=new r.PointLight(16777215,1,0),y[2]=new r.PointLight(16777215,1,0);var g=1;return s&&s.lights&&(g=s.lights.scale),y[0].position.set(0,200*g,0),y[1].position.set(100*g,300*g,100*g),y[2].position.set(-200*g,-200*g,-100*g),v.add(y[0]),v.add(y[1]),v.add(y[2]),[v,w,h,{width:l,height:d,axisWidth:p,axisHeight:u}]}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),o=n(0);r.controls({"1, 2, 3":"Seleciona parte do braço para mexer",Q:"Move braço selecionado para cima",E:"Move braço selecionado para baixo","Seta para cima":"Abre a garra","Seta para baixo":"Fecha a garra"});var i=1300,s=60,c=r.axes(),l=r.init({camera:{position:[i,800,1300],lookAt:[0,0,0]}}),d=l[0],p=l[1],u=l[2],w=l[3];w.axisHeight,w.axisWidth,w.height,w.width;document.body.appendChild(p.domElement);var h=[0,0,0],v=0,f=0,y=new a.BoxGeometry(30,30,30),g=new a.MeshLambertMaterial({color:16776960,side:a.DoubleSide}),b=new a.MeshLambertMaterial({color:16711680,side:a.DoubleSide});y.scale(2,.5,.5),window.addEventListener("keydown",function(e){switch(console.log(e.key),e.key){case"q":h[v]+=r.degToRad(5);break;case"e":h[v]-=r.degToRad(5);break;case"1":v=0;break;case"2":v=1;break;case"3":v=2;break;case"ArrowUp":f+=r.degToRad(5);break;case"ArrowDown":f-=r.degToRad(5)}});var m=function(){var e=function(){var e=y.clone().translate(30,0,0).rotateZ(r.degToRad(35)).translate(-60*Math.cos(r.degToRad(35)),0,0),t=e.clone().scale(-1,1,1),n=new o.Mesh(e,b),a=new o.Mesh(t,b),i=e.clone().scale(1,-1,1),s=t.clone().scale(1,-1,1),c=new o.Mesh(i,b),l=new o.Mesh(s,b),d=new o.Group;d.add(n,a),d.rotateZ(f),d.translateX(60*Math.cos(r.degToRad(35)));var p=new o.Group;p.add(c,l),p.rotateZ(-f),p.translateX(60*Math.cos(r.degToRad(35)));var u=new o.Group;return u.add(p,d),u.translateX(30*Math.cos(r.degToRad(35))),u}(),t=y.clone(),n=new o.Mesh(t,g),a=new o.Group;a.add(n,e),a.translateX(30),a.rotateZ(h[2]),a.translateX(30);var i=y.clone(),s=new o.Mesh(i,g),l=new o.Group;l.translateX(30),l.rotateZ(h[1]),l.translateX(30),l.add(s,a);var d=y.clone(),p=new o.Mesh(d,g),u=new o.Group;return u.add(p,l),u.rotateZ(h[0]),u.translateX(30),[u,c]},M=function(){requestAnimationFrame(M),s+=.1;var e=m();u.position.set(i*Math.cos(r.degToRad(s)),800,i*Math.sin(r.degToRad(s))),d.add.apply(d,e),u.lookAt(0,0,0),p.render(d,u),d.remove.apply(d,e)};M()}]);
//# sourceMappingURL=arm.bundle.js.map