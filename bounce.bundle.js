!function(e){function t(t){for(var i,a,s=t[0],c=t[1],l=t[2],p=0,d=[];p<s.length;p++)a=s[p],r[a]&&d.push(r[a][0]),r[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(i=!1)}i&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={4:0},o=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/computacao-grafica";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;o.push([7,0]),n()}([,function(e,t,n){"use strict";var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=n(0),a=n(2);t.init=a.init,t.initPerspective=a.initPerspective,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(3)),t.axes=function(){var e=new r.LineBasicMaterial({color:16711680}),t=new r.LineBasicMaterial({color:65280}),n=new r.LineBasicMaterial({color:255}),i=new r.Geometry,a=new r.Geometry,s=new r.Geometry;i.vertices.push(new r.Vector3(-9999,0,0)),i.vertices.push(new r.Vector3(9999,0,0)),a.vertices.push(new r.Vector3(0,-9999,0)),a.vertices.push(new r.Vector3(0,9999,0)),s.vertices.push(new r.Vector3(0,0,-9999)),s.vertices.push(new r.Vector3(0,0,9999));var c=new r.Line(i,e),l=new r.Line(a,t),u=new r.Line(s,n);return(new o.Group).add(c,l,u)},t.square=function(e,n,i,r){return t.shape([[e,n],[e+i,n],[e+i,n+i],[e,n+i]],r)},t.shape=function(e,t){var n=new o.Shape(e.map(function(e){return new(o.Vector2.bind.apply(o.Vector2,[void 0].concat(e)))})),i=new o.ShapeGeometry(n),r=new o.MeshBasicMaterial(t);return new o.Mesh(i,r)},t.line2D=function(e,t){var n,i=new o.Geometry;(n=i.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e,[0])))}));var r=new o.LineBasicMaterial(t);return new o.Line(i,r)},t.line3D=function(e,t){var n,i=new o.Geometry;(n=i.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))}));var r=new o.LineBasicMaterial(t);return new o.Line(i,r)},t.degToRad=function(e){return e*Math.PI/180},t.lineLoop=function(e,t){var n,i=new o.Geometry,r=new o.LineBasicMaterial(t);return(n=i.vertices).push.apply(n,e.map(function(e){return new(o.Vector3.bind.apply(o.Vector3,[void 0].concat(e)))})),new o.LineLoop(i,r)},t.controls=function(e){var t=Object.keys(e),n=document.createElement("div");n.innerText="Controles:",t.forEach(function(t){var i=e[t],r=document.createElement("p");r.innerText=t+": "+i,n.appendChild(r)}),n.style.padding="6px 14px",n.style.position="fixed",n.style.bottom="0",n.style.right="0",n.style.backgroundColor="rgba(255,255,255,0.2)",n.style.color="white",n.style.fontFamily="sans-serif",n.style.userSelect="none",n.style.textAlign="left",document.body.appendChild(n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(0),o=n(0);t.init=function(e){var t,n=window.innerWidth,o=window.innerHeight,a=n/2,s=o/2,c=new i.WebGLRenderer({antialias:!0});c.setSize(n,o);var l=new i.OrthographicCamera(-a,a,s,-s,-1,9e3);l.position.set(0,0,100),l.lookAt(0,0,0),e&&e.camera&&((t=l.position).set.apply(t,e.camera.position),l.lookAt.apply(l,e.camera.lookAt));var u=new i.Scene,p=new r.AmbientLight(0);u.add(p);var d=[];d[0]=new i.PointLight(16777215,1,0),d[1]=new i.PointLight(16777215,1,0),d[2]=new i.PointLight(16777215,1,0);var h=1;return e&&e.lights&&(h=e.lights.scale),d[0].position.set(0,200*h,0),d[1].position.set(100*h,300*h,100*h),d[2].position.set(-200*h,-200*h,-100*h),u.add(d[0]),u.add(d[1]),u.add(d[2]),[u,c,l,{width:n,height:o,axisWidth:a,axisHeight:s}]},t.initPerspective=function(e,t,n,a,s){var c,l=window.innerWidth,u=window.innerHeight,p=l/2,d=u/2,h=new i.WebGLRenderer({antialias:!0});h.setSize(l,u);var f=new o.PerspectiveCamera(e,t,n,a);f.position.set(100,100,100),f.lookAt(0,0,0),s&&s.camera&&((c=f.position).set.apply(c,s.camera.position),f.lookAt.apply(f,s.camera.lookAt));var w=new i.Scene,v=new r.AmbientLight(0);w.add(v);var y=[];y[0]=new i.PointLight(16777215,1,0),y[1]=new i.PointLight(16777215,1,0),y[2]=new i.PointLight(16777215,1,0);var m=1;return s&&s.lights&&(m=s.lights.scale),y[0].position.set(0,200*m,0),y[1].position.set(100*m,300*m,100*m),y[2].position.set(-200*m,-200*m,-100*m),w.add(y[0]),w.add(y[1]),w.add(y[2]),[w,h,f,{width:l,height:u,axisWidth:p,axisHeight:d}]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=document.createElement("a"),r=document.createElement("input");r.type="file",document.body.appendChild(r),r.style.display="none",document.body.appendChild(i),i.style.display="none",t.upload=function(){return r.click(),new Promise(function(e,t){r.onchange=function(t){var n=t.target.files[0],i=new FileReader;i.onload=function(t){e(t.target.result)},i.readAsText(n)}})},t.download=function(e,t){i.download=t;var n=new Blob([JSON.stringify(e)],{type:"text/plain"}),r=window.URL.createObjectURL(n);i.href=r,i.click(),window.URL.revokeObjectURL(r)};var o=function(){function e(e){void 0===e&&(e=""),this.title=document.createElement("p"),this.title.style.position="fixed",this.title.style.top="6px",this.title.style.left="50%",this.title.style.transform="translateX(-50%)",this.title.style.fontFamily="sans-serif",this.title.style.fontSize="2em",this.title.style.color="white",this.title.innerText=e,document.body.appendChild(this.title)}return e.prototype.set=function(e){this.title.innerText=e},e}();t.Title=o},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n(0),o=n(0),a=0,s=25,c=.01,l=0,u=new Date,p=null,d=-.001,h=60,f=0;setInterval(function(){a=0,s=25,c=.01,l=0,d=-.001,f=0},6e3),i.controls({"-":"Diminui FPS","=":"Aumenta FPS"}),window.addEventListener("keydown",function(e){switch(e.key){case"-":h=Math.max(15,h/2);break;case"=":h=Math.min(60,2*h)}});var w=i.initPerspective(60,16/9,1,1e3,{camera:{position:[25,20,40],lookAt:[25,20,0]}}),v=w[0],y=w[1],m=w[2],g=w[3];g.axisHeight,g.axisWidth,g.height,g.width;document.body.appendChild(y.domElement);var b=new r.CircleGeometry(1,30),L=new r.MeshBasicMaterial({color:16777215}),x=new o.Mesh(b,L);v.add(x),v.add(i.axes());var P=function(){var e,t;requestAnimationFrame(P),p=new Date,function(e,t){var n=1e3/e;p&&p.getTime()-u.getTime()>=n&&(u=p,t()),p=new Date}(h,function(){y.render(v,m)}),f+=.2,x.position.x=a+=c*f,x.position.y=((t=s+(l+=d*(e=f))/2*e)<1&&(t=1,l*=-.95,c*=.95),s=t)};P()}]);