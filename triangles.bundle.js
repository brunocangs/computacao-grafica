!function(e){function t(t){for(var i,a,l=t[0],c=t[1],s=t[2],p=0,d=[];p<l.length;p++)a=l[p],r[a]&&d.push(r[a][0]),r[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,l=1;l<n.length;l++){var c=n[l];0!==r[c]&&(i=!1)}i&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={11:0},o=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/computacao-grafica";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var u=c;o.push([40,0]),n()}({1:function(e,t,n){"use strict";var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=n(0),a=n(2);t.init=a.init,t.initPerspective=a.initPerspective,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(3)),t.axes=function(){var e=new r.LineBasicMaterial({color:16711680}),t=new r.LineBasicMaterial({color:65280}),n=new r.LineBasicMaterial({color:255}),i=new r.Geometry,a=new r.Geometry,l=new r.Geometry;i.vertices.push(new r.Vector3(-9999,0,0)),i.vertices.push(new r.Vector3(9999,0,0)),a.vertices.push(new r.Vector3(0,-9999,0)),a.vertices.push(new r.Vector3(0,9999,0)),l.vertices.push(new r.Vector3(0,0,-9999)),l.vertices.push(new r.Vector3(0,0,9999));var c=new r.Line(i,e),s=new r.Line(a,t),u=new r.Line(l,n);return(new o.Group).add(c,s,u)},t.square=function(e,n,i,r){return t.shape([[e,n],[e+i,n],[e+i,n+i],[e,n+i]],r)},t.shape=function(e,t){var n=new o.Shape(e.map(function(e){return new(o.Vector2.bind.apply(o.Vector2,[void 0].concat(e)))})),i=new o.ShapeGeometry(n),r=new o.MeshBasicMaterial(t);return new o.Mesh(i,r)},t.line2D=function(e,t){var n,i=new o.Geometry;(n=i.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e,[0])))}));var r=new o.LineBasicMaterial(t);return new o.Line(i,r)},t.line3D=function(e,t){var n,i=new o.Geometry;(n=i.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))}));var r=new o.LineBasicMaterial(t);return new o.Line(i,r)},t.degToRad=function(e){return e*Math.PI/180},t.lineLoop=function(e,t){var n,i=new o.Geometry,r=new o.LineBasicMaterial(t);return(n=i.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))})),new o.LineLoop(i,r)},t.controls=function(e){var t=Object.keys(e),n=document.createElement("div");return n.innerText="Controles:",t.forEach(function(t){var i=e[t],r=document.createElement("p");r.innerText=t+": "+i,n.appendChild(r)}),n.style.padding="6px 14px",n.style.position="fixed",n.style.bottom="0",n.style.right="0",n.style.backgroundColor="rgba(255,255,255,0.2)",n.style.color="white",n.style.fontFamily="sans-serif",n.style.userSelect="none",n.style.textAlign="left",document.body.appendChild(n),n}},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(0),o=n(0);t.init=function(e){var t,n=window.innerWidth,o=window.innerHeight,a=n/2,l=o/2,c=new i.WebGLRenderer({antialias:!0});c.setSize(n,o);var s=new i.OrthographicCamera(-a,a,l,-l,-1,9e3);s.position.set(0,0,100),s.lookAt(0,0,0),e&&e.camera&&((t=s.position).set.apply(t,e.camera.position),s.lookAt.apply(s,e.camera.lookAt));var u=new i.Scene,p=new r.AmbientLight(0);u.add(p);var d=[];d[0]=new i.PointLight(16777215,1,0),d[1]=new i.PointLight(16777215,1,0),d[2]=new i.PointLight(16777215,1,0);var f=1;return e&&e.lights&&(f=e.lights.scale),d[0].position.set(0,200*f,0),d[1].position.set(100*f,300*f,100*f),d[2].position.set(-200*f,-200*f,-100*f),u.add(d[0]),u.add(d[1]),u.add(d[2]),[u,c,s,{width:n,height:o,axisWidth:a,axisHeight:l}]},t.initPerspective=function(e,t,n,a,l){var c,s=window.innerWidth,u=window.innerHeight,p=s/2,d=u/2,f=new i.WebGLRenderer({antialias:!0});f.setSize(s,u);var h=new o.PerspectiveCamera(e,t,n,a);h.position.set(100,100,100),h.lookAt(0,0,0),l&&l.camera&&((c=h.position).set.apply(c,l.camera.position),h.lookAt.apply(h,l.camera.lookAt));var w=new i.Scene,y=new r.AmbientLight(0);w.add(y);var v=[];v[0]=new i.PointLight(16777215,1,0),v[1]=new i.PointLight(16777215,1,0),v[2]=new i.PointLight(16777215,1,0);var m=1;return l&&l.lights&&(m=l.lights.scale),v[0].position.set(0,200*m,0),v[1].position.set(100*m,300*m,100*m),v[2].position.set(-200*m,-200*m,-100*m),w.add(v[0]),w.add(v[1]),w.add(v[2]),[w,f,h,{width:s,height:u,axisWidth:p,axisHeight:d}]}},3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=document.createElement("a"),r=document.createElement("input");r.type="file",document.body.appendChild(r),r.style.display="none",document.body.appendChild(i),i.style.display="none",t.upload=function(){return r.click(),new Promise(function(e,t){r.onchange=function(t){var n=t.target.files[0],i=new FileReader;i.onload=function(t){e(t.target.result)},i.readAsText(n)}})},t.download=function(e,t){i.download=t;var n=new Blob([JSON.stringify(e)],{type:"text/plain"}),r=window.URL.createObjectURL(n);i.href=r,i.click(),window.URL.revokeObjectURL(r)};var o=function(){function e(e){void 0===e&&(e=""),this.title=document.createElement("p"),this.title.style.position="fixed",this.title.style.top="6px",this.title.style.left="50%",this.title.style.transform="translateX(-50%)",this.title.style.fontFamily="sans-serif",this.title.style.fontSize="2em",this.title.style.color="white",this.title.innerText=e,this.title.style.pointerEvents="none",document.body.appendChild(this.title)}return e.prototype.set=function(e){this.title.innerText=e},e.prototype.toggleVisibility=function(){this.title.style.visibility="hidden"===this.title.style.visibility?"visible":"hidden"},e}();t.Title=o},40:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n(0);i.controls({"Seta para a direita":"Adiciona mais um polígono","Seta para cima":"Adiciona um véric em cada polígono","-":"Diminúi FPS","=":"Aumenta FPS"});var o=null,a=new Date,l=60,c=2,s=3,u=new Array(c).fill(null).map(function(){return 16777215*Math.random()});window.addEventListener("keydown",function(e){switch(e.key){case"ArrowUp":f();break;case"ArrowRight":h();break;case"-":l=Math.max(15,l/2);break;case"=":l=Math.min(60,2*l)}});var p=function(){return Math.random()>=.5?-1:1},d=function(e,t){return t?[Math.floor(Math.random()*e)*p(),Math.floor(Math.random()*e)*p(),0]:[Math.random()*e*p(),Math.random()*e*p(),0]},f=function(){w=w.map(function(e){return e.concat([d(250,!0)])}),y=y.map(function(e){return e.concat([d(3)])}),s++},h=function(){w.push(new Array(s).fill(null).map(function(){return d(250,!0)})),y.push(new Array(s).fill(null).map(function(){return d(3)})),u.push(16777215*Math.random()),c++},w=new Array(c).fill(null).map(function(){return new Array(s).fill(null).map(function(){return d(250,!0)})}),y=new Array(c).fill(null).map(function(){return new Array(s).fill(null).map(function(){return d(3)})}),v=i.init(),m=v[0],b=v[1],g=v[2],L=v[3];L.axisHeight,L.axisWidth,L.height,L.width;document.body.appendChild(b.domElement);new r.LineBasicMaterial({color:16711935});var M=function(){o=new Date,requestAnimationFrame(M),function(){for(var e in w){var t=w[e],n=y[e];for(var i in t){var r=t[i],o=n[i];for(var a in r){var l=r[a],c=o[a],s=l+c;Math.abs(s)>=250&&(s=l-c,y[e][i][a]*=-1),w[e][i][a]=s}}}}();var e,t,n=(e=i.lineLoop([[250,250,0],[250,-250,0],[-250,-250,0],[-250,250,0]],{color:16777215}),t=w.map(function(e,t){return i.lineLoop(e,{color:u[t]})}),[e].concat(t));m.add.apply(m,n),function(e,t){var n=1e3/e;o&&o.getTime()-a.getTime()>=n&&(a=o,t()),o=new Date}(l,function(){b.render(m,g)}),m.remove.apply(m,n)};M()}});