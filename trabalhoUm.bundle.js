!function(e){function t(t){for(var i,a,s=t[0],c=t[1],l=t[2],p=0,d=[];p<s.length;p++)a=s[p],o[a]&&d.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(u&&u(t);d.length;)d.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(i=!1)}i&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},o={9:0},r=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/computacao-grafica";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;r.push([16,0]),n()}([,function(e,t,n){"use strict";var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var o=i(n(0)),r=n(0),a=n(2);t.init=a.init,t.initPerspective=a.initPerspective,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(3)),t.axes=function(){var e=new o.LineBasicMaterial({color:16711680}),t=new o.LineBasicMaterial({color:65280}),n=new o.LineBasicMaterial({color:255}),i=new o.Geometry,a=new o.Geometry,s=new o.Geometry;i.vertices.push(new o.Vector3(-9999,0,0)),i.vertices.push(new o.Vector3(9999,0,0)),a.vertices.push(new o.Vector3(0,-9999,0)),a.vertices.push(new o.Vector3(0,9999,0)),s.vertices.push(new o.Vector3(0,0,-9999)),s.vertices.push(new o.Vector3(0,0,9999));var c=new o.Line(i,e),l=new o.Line(a,t),u=new o.Line(s,n);return(new r.Group).add(c,l,u)},t.square=function(e,n,i,o){return t.shape([[e,n],[e+i,n],[e+i,n+i],[e,n+i]],o)},t.shape=function(e,t){var n=new r.Shape(e.map(function(e){return new(r.Vector2.bind.apply(r.Vector2,[void 0].concat(e)))})),i=new r.ShapeGeometry(n),o=new r.MeshBasicMaterial(t);return new r.Mesh(i,o)},t.line2D=function(e,t){var n,i=new r.Geometry;(n=i.vertices).push.apply(n,e.map(function(e){return new(r.Vector3.bind.apply(r.Vector3,[void 0].concat(e,[0])))}));var o=new r.LineBasicMaterial(t);return new r.Line(i,o)},t.line3D=function(e,t){var n,i=new r.Geometry;(n=i.vertices).push.apply(n,e.map(function(e){return new(r.Vector3.bind.apply(r.Vector3,[void 0].concat(e)))}));var o=new r.LineBasicMaterial(t);return new r.Line(i,o)},t.degToRad=function(e){return e*Math.PI/180},t.lineLoop=function(e,t){var n,i=new r.Geometry,o=new r.LineBasicMaterial(t);return(n=i.vertices).push.apply(n,e.map(function(e){return new(r.Vector3.bind.apply(r.Vector3,[void 0].concat(e)))})),new r.LineLoop(i,o)},t.controls=function(e){var t=Object.keys(e),n=document.createElement("div");n.innerText="Controles:",t.forEach(function(t){var i=e[t],o=document.createElement("p");o.innerText=t+": "+i,n.appendChild(o)}),n.style.padding="6px 14px",n.style.position="fixed",n.style.bottom="0",n.style.right="0",n.style.backgroundColor="rgba(255,255,255,0.2)",n.style.color="white",n.style.fontFamily="sans-serif",n.style.userSelect="none",n.style.textAlign="left",document.body.appendChild(n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(0),r=n(0);t.init=function(e){var t,n=window.innerWidth,r=window.innerHeight,a=n/2,s=r/2,c=new i.WebGLRenderer({antialias:!0});c.setSize(n,r);var l=new i.OrthographicCamera(-a,a,s,-s,-1,9e3);l.position.set(0,0,100),l.lookAt(0,0,0),e&&e.camera&&((t=l.position).set.apply(t,e.camera.position),l.lookAt.apply(l,e.camera.lookAt));var u=new i.Scene,p=new o.AmbientLight(0);u.add(p);var d=[];d[0]=new i.PointLight(16777215,1,0),d[1]=new i.PointLight(16777215,1,0),d[2]=new i.PointLight(16777215,1,0);var f=1;return e&&e.lights&&(f=e.lights.scale),d[0].position.set(0,200*f,0),d[1].position.set(100*f,300*f,100*f),d[2].position.set(-200*f,-200*f,-100*f),u.add(d[0]),u.add(d[1]),u.add(d[2]),[u,c,l,{width:n,height:r,axisWidth:a,axisHeight:s}]},t.initPerspective=function(e,t,n,a,s){var c,l=window.innerWidth,u=window.innerHeight,p=l/2,d=u/2,f=new i.WebGLRenderer({antialias:!0});f.setSize(l,u);var y=new r.PerspectiveCamera(e,t,n,a);y.position.set(100,100,100),y.lookAt(0,0,0),s&&s.camera&&((c=y.position).set.apply(c,s.camera.position),y.lookAt.apply(y,s.camera.lookAt));var h=new i.Scene,w=new o.AmbientLight(0);h.add(w);var v=[];v[0]=new i.PointLight(16777215,1,0),v[1]=new i.PointLight(16777215,1,0),v[2]=new i.PointLight(16777215,1,0);var m=1;return s&&s.lights&&(m=s.lights.scale),v[0].position.set(0,200*m,0),v[1].position.set(100*m,300*m,100*m),v[2].position.set(-200*m,-200*m,-100*m),h.add(v[0]),h.add(v[1]),h.add(v[2]),[h,f,y,{width:l,height:u,axisWidth:p,axisHeight:d}]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=document.createElement("a"),o=document.createElement("input");o.type="file",document.body.appendChild(o),o.style.display="none",document.body.appendChild(i),i.style.display="none",t.upload=function(){return o.click(),new Promise(function(e,t){o.onchange=function(t){var n=t.target.files[0],i=new FileReader;i.onload=function(t){e(t.target.result)},i.readAsText(n)}})},t.download=function(e,t){i.download=t;var n=new Blob([JSON.stringify(e)],{type:"text/plain"}),o=window.URL.createObjectURL(n);i.href=o,i.click(),window.URL.revokeObjectURL(o)};var r=function(){function e(e){void 0===e&&(e=""),this.title=document.createElement("p"),this.title.style.position="fixed",this.title.style.top="6px",this.title.style.left="50%",this.title.style.transform="translateX(-50%)",this.title.style.fontFamily="sans-serif",this.title.style.fontSize="2em",this.title.style.color="white",this.title.innerText=e,document.body.appendChild(this.title)}return e.prototype.set=function(e){this.title.innerText=e},e}();t.Title=r},,,,,,,,,,,,,function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=i(n(17)),a=i(n(18)),s=i(n(19)),c=n(0),l=n(4),u=n(0),p=i(n(20)),d=n(0),f=n(0),y=n(0),h=n(0),w=n(0);o.controls({"Setas dir/esq":"Muda grupo selecionado","Setas cima/baixo":"Altera profundidade da seção",", e . ":"Altera largura da seção","s ":"Salva modelo atual","l ":"Carrega um modelo salvo"});var v=document.createElement("button");v.innerText="Modelo 1",v.onclick=function(){$(JSON.stringify(r.default))};var m=document.createElement("button");m.innerText="Modelo 2",m.onclick=function(){$(JSON.stringify(a.default))};var g=document.createElement("button");g.innerText="Modelo 3",g.onclick=function(){$(JSON.stringify(s.default))};var x=document.createElement("div");x.appendChild(v),x.appendChild(m),x.appendChild(g),x.style.padding="8px 6px",x.style.position="fixed",x.style.top="0",x.style.right="0",document.body.appendChild(x);var b=o.init(),L=b[0],O=b[1],M=(b[2],b[3]),P=(M.axisHeight,M.axisWidth,M.height),S=M.width,j=1,k=1,z=0,A=new o.Title(""),E=new c.OrthographicCamera(-1,1,1,-1,-1e3,1e4),T=(S/2-2)/P,V=new y.PerspectiveCamera(60,T,.2,1e3);V.position.set(1.3,1.3,1.3),V.lookAt(0,0,0);var _=new h.Scene,C=new c.PointLight(16777215,1,8,2),G=new c.PointLight(16777215,1,8,2);C.position.copy(V.position),G.position.copy(C.position),G.rotation.z=o.degToRad(120),_.add(C),_.add(G),L.add(o.axes()),_.add(o.axes());var B=[new d.Group],R=[new d.Group];L.add.apply(L,R),_.add.apply(_,B);var W=B[z],F=R[z],H=new l.OrbitControls(V,O.domElement,window);H.enableDamping=!0,H.dampingFactor=.25,O.setPixelRatio(window.devicePixelRatio),O.autoClear=!1,document.body.appendChild(O.domElement);var N=function(){requestAnimationFrame(N),A.set("Grupo: "+(z+1)+" - Profundidade: "+j+" - Largura: "+k),H.update(),G.position.copy(C.position),C.position.copy(V.position),O.clear(),O.setViewport(1,1,S/2-2,P),O.render(L,E),O.setViewport(S/2+1,1,S/2-2,P),O.render(_,V)};N();var D=function(e){for(var t=0,n=e;t<n.length;t++){var i=n[t],o=i[0],r=i[1],a=i[2],s=i[3];console.log([o,r,a],s);var l=new u.CircleGeometry(.01,16),p=new c.MeshBasicMaterial({color:16777215}),d=new c.Mesh(l,p);d.width=s,d.position.x=o,d.position.y=r,d.position.z=a,F.add(d);var y=F.children;if(y.length>=2){var h=y.slice(-2),v=h[0],m=h[1],g=J(v.position,m.position),x=new w.BoxGeometry(1,1,1);U(x,m,v,g,s);var b=new f.MeshPhongMaterial({color:16776960,side:c.DoubleSide,flatShading:!0}),L=new c.Mesh(x,b);W.add(L)}}},J=function(e,t){var n=new c.Vector3;return n.x=t.x-e.x,n.y=t.y-e.y,n.z=0,n.applyAxisAngle(new c.Vector3(0,0,1),o.degToRad(90)),n.setLength(.02),n},U=function(e,t,n,i,o){var r=e.vertices;r[0].x=n.position.x+i.x*o,r[0].y=n.position.y+i.y*o,r[0].z=0,r[5].x=n.position.x-i.x*o,r[5].y=n.position.y-i.y*o,r[5].z=0,r[2].x=t.position.x+i.x*o,r[2].y=t.position.y+i.y*o,r[2].z=0,r[7].x=t.position.x-i.x*o,r[7].y=t.position.y-i.y*o,r[7].z=0,r[1].x=n.position.x+i.x*o,r[1].y=n.position.y+i.y*o,r[1].z=n.position.z,r[4].x=n.position.x-i.x*o,r[4].y=n.position.y-i.y*o,r[4].z=n.position.z,r[3].x=t.position.x+i.x*o,r[3].y=t.position.y+i.y*o,r[3].z=t.position.z,r[6].x=t.position.x-i.x*o,r[6].y=t.position.y-i.y*o,r[6].z=t.position.z,e.computeFaceNormals(),e.computeBoundingBox(),Z(e,n),e.computeBoundingSphere()},q=function(e,t,n,i,o,r,a,s){var c,l,u,p;return 0==(c=(s-r)*(n-e)-(a-o)*(i-t))?[0,0,0]:(p=(a-o)*(l=t-r)-(s-r)*(u=e-o),u=((n-e)*l-(i-t)*u)/c,[e+(l=p/c)*(n-e),t+l*(i-t),0])},Z=function(e,t){var n,i,o,r,a,s,l,u,p=W.children.slice(-1)[0];if(p){var d=p.geometry,f=d.vertices,y=(new c.Vector3).subVectors(f[0],f[2]),h=e.vertices,w=(new c.Vector3).subVectors(h[0],h[2]),v=q(f[0].x,f[0].y,f[0].x+y.x,f[0].y+y.y,h[0].x,h[0].y,h[0].x+w.x,h[0].y+w.y),m=q(f[5].x,f[5].y,f[5].x+y.x,f[5].y+y.y,h[5].x,h[5].y,h[5].x+w.x,h[5].y+w.y);(n=f[3]).set.apply(n,(i=f[2]).set.apply(i,v).clone().setZ(f[3].z).toArray()),(o=f[6]).set.apply(o,(r=f[7]).set.apply(r,m).clone().setZ(f[6].z).toArray()),(a=h[1]).set.apply(a,(s=h[0]).set.apply(s,v).clone().setZ(h[1].z).toArray()),(l=h[4]).set.apply(l,(u=h[5]).set.apply(u,m).clone().setZ(h[4].z).toArray()),d.verticesNeedUpdate=!0,d.computeBoundingBox(),d.computeBoundingSphere(),d.computeFaceNormals()}},$=function(e){for(var t in R)L.remove(R[t]),_.remove(B[t]);R=[],B=[],z=-1;for(var n=0,i=JSON.parse(e);n<i.length;n++){var o=i[n],r=z+1;R.push(new d.Group),B.push(new d.Group),L.add(R[r]),_.add(B[r]),0===r?(F=R[r],W=B[r],z++):X(r),k=j,D(o)}};var I=function(e){var t=F.children.slice(-1)[0];if(t){F.remove(t),t.geometry.dispose();var n=W.children.slice(-1)[0];n&&(W.remove(n),n.geometry.dispose())}},X=function(e){var t=z;R[t].children.forEach(function(e){e.material.color.setHSL(0,0,.2)}),R[e].children.forEach(function(e){e.material.color.setHSL(0,0,1)}),B[t].children.forEach(function(e){e.material.color.setHSL(60/360,1,.2)}),B[e].children.forEach(function(e){e.material.color.setHex(16776960)}),F=R[e],W=B[e],z=e},Y=p.default(function(e){var t=V.position,n=t.x,i=t.y,o=t.z;e.deltaY<0?V.position.set(1.05*n,1.05*i,1.05*o):V.position.set(.95*n,.95*i,.95*o)},1e3/60);window.addEventListener("resize",function(){P=window.innerHeight;var e=((S=window.innerWidth)/2-2)/P;V.aspect=e,V.updateProjectionMatrix(),O.setSize(window.innerWidth,window.innerHeight)},!1),window.addEventListener("mousedown",function(e){if(3===e.which)return I(e);var t=e.clientX/window.innerWidth*2-1,n=-e.clientY/window.innerHeight*2+1;t<0&&D([[t=2*(t+.5),n,.1*j,k]])},!1),window.addEventListener("keydown",function(e){var t;switch(e.stopPropagation(),e.key){case"ArrowLeft":var n=(z-1+B.length)%B.length;X(n);break;case"ArrowRight":var i=z+1;i===B.length&&(R.push(new d.Group),B.push(new d.Group)),L.add(R[i]),_.add(B[i]),X(i);break;case"ArrowUp":j=++j%10||1;break;case"ArrowDown":j=(10+--j)%10||9;break;case".":k=++k%10||1;break;case",":k=(10+--k)%10||9;break;case"F12":document.fullscreen?document.exitFullscreen():document.documentElement.requestFullscreen();break;case"l":o.upload().then($);break;case"s":t=R.map(function(e){return e.children.map(function(e){return e.position.toArray().concat([e.width])}).filter(function(e){return e.length>0})}),o.download(t,"model.json")}},!1),window.addEventListener("mousewheel",Y,!1)},function(e){e.exports=[[[-.7333333333333334,.7243107769423559,.1,1],[.16666666666666674,.6215538847117794,.1,2],[-.46944444444444455,.2556390977443609,.1,3],[.41666666666666674,.17794486215538852,.1,4],[-.6277777777777778,-.3007518796992481,.1,5],[.1416666666666666,-.5989974937343359,.1,6],[-.47777777777777786,-.844611528822055,.1,7],[-.8111111111111111,-.9323308270676691,.1,7],[.5527777777777778,-.8897243107769424,.1,5],[.663888888888889,-.1428571428571428,.1,4],[.33333333333333326,-.17042606516290726,.1,3],[.18055555555555558,-.4035087719298245,.1,1],[.2972222222222223,-.43107769423558895,.1,1],[.461111111111111,-.3258145363408522,.1,1]],[[-.7305555555555556,.8546365914786967,.1,1],[-.3999999999999999,.87468671679198,.1,4],[.30833333333333335,.7393483709273183,.1,2],[.5249999999999999,.5213032581453634,.1,1],[.23888888888888893,.41102756892230574,.1,3],[.6361111111111111,.41102756892230574,.1,3],[.8111111111111111,.3458646616541353,.1,3],[.8222222222222222,.15538847117794485,.1,2],[.5,.03007518796992481,.1,1]],[[-.7388888888888889,.6516290726817042,.1,1],[-.125,.5789473684210527,.1,1],[-.5416666666666667,.418546365914787,.1,1],[-.7277777777777779,.2506265664160401,.1,2],[-.8444444444444446,.09273182957393489,.1,2],[-.661111111111111,.06265664160401008,.1,3],[-.2583333333333333,.07518796992481203,.1,2],[-.1499999999999999,.09022556390977443,.1,1],[-.4083333333333332,-.03508771929824572,.1,1],[-.7333333333333334,-.16040100250626566,.1,1],[-.9888888888888889,-.29824561403508776,.1,1]],[]]},function(e){e.exports=[[[.1611111111111112,.9092122830440588,.1,1],[.02499999999999991,.8958611481975968,.1,2],[-.4222222222222223,.7516688918558078,.1,3],[-.5944444444444446,.5567423230974633,.1,4],[-.7555555555555555,.29238985313751664,.1,5],[-.8055555555555556,-.07877169559412556,.1,6],[-.7027777777777777,-.21762349799732972,.1,5],[-.4083333333333332,-.3991989319092122,.1,4],[.019444444444444375,-.38050734312416545,.1,5],[.22222222222222232,-.2149532710280373,.1,5],[.3222222222222222,-.014686248331108098,.1,4],[.3222222222222222,.20427236315086783,.1,3],[.1166666666666667,.33778371161548737,.1,4],[-.09166666666666679,.3724966622162884,.1,5],[-.22222222222222232,.35113484646194926,.1,4],[-.38611111111111107,.22563417890520698,.1,3],[-.411111111111111,.03871829105473967,.1,2],[-.31666666666666665,-.09746328437917229,.1,1],[-.06944444444444442,-.11615487316421902,.1,1],[.08611111111111103,-.028037383177569986,.1,1],[.07499999999999996,.13751668891855806,.1,1],[-.1166666666666667,.07610146862483314,.1,1]],[[.002777777777777768,.03604806408544725,.1,1],[-.061111111111111116,-.020026702269692942,.1,1],[-.17222222222222228,-.012016021361815676,.1,1],[-.2416666666666667,.057409879839786404,.1,2],[-.2250000000000001,.12683578104138848,.1,2],[-.15277777777777768,.18291054739652868,.1,2],[-.07222222222222219,.2149532710280374,.1,1],[.07222222222222219,.20694259012016025,.1,1],[.14722222222222214,.19092122830440583,.1,1],[.21666666666666656,.11615487316421891,.1,1],[.20277777777777772,-.004005340453938633,.1,1],[.1416666666666666,-.06542056074766345,.1,1],[.047222222222222276,-.14018691588785037,.1,1],[-.061111111111111116,-.18024032042723626,.1,2],[-.2749999999999999,-.2977303070761015,.1,1],[-.36388888888888893,-.22029372496662214,.1,2],[-.463888888888889,-.10814419225634175,.1,3],[-.5638888888888889,-.028037383177569986,.1,4],[-.5527777777777778,.21762349799732972,.1,2],[-.41388888888888875,.3991989319092123,.1,2],[-.2944444444444443,.5647530040053405,.1,2],[-.1972222222222222,.5887850467289719,.1,3],[.12777777777777777,.548731642189586,.1,4],[.3472222222222223,.4312416555407209,.1,5],[.48611111111111116,.4979973297730307,.1,3],[.4638888888888888,.6528704939919894,.1,4],[.3055555555555556,.7303070761014686,.1,4],[.2416666666666667,.8664886515353805,.1,3],[.23611111111111116,.9065420560747663,.1,2],[.14722222222222214,.9065420560747663,.1,2]],[]]},function(e){e.exports=[[[-.7861111111111112,.8825100133511349,.1,1],[-.9194444444444445,.87716955941255,.1,1],[-.9194444444444445,.7222963951935915,.1,1],[-.7916666666666667,.732977303070761,.1,1]],[[-.6777777777777778,.8744993324432577,.1,1],[-.6888888888888889,.7276368491321763,.1,1],[-.5777777777777777,.7356475300400533,.1,1],[-.5805555555555555,.8611481975967957,.1,1],[-.6972222222222222,.855807743658211,.1,1]],[[-.5166666666666666,.732977303070761,.1,1],[-.4750000000000001,.8744993324432577,.1,1],[-.43333333333333335,.7757009345794392,.1,1],[-.3999999999999999,.8691588785046729,.1,1],[-.3555555555555556,.7516688918558078,.1,1]],[[-.2666666666666666,.7436582109479306,.1,1],[-.2694444444444444,.890520694259012,.1,1],[-.1499999999999999,.8878504672897196,.1,1],[-.14722222222222214,.8157543391188251,.1,1],[-.26388888888888884,.8130841121495327,.1,1]],[[-.06388888888888888,.8825100133511349,.1,1],[-.06388888888888888,.7249666221628839,.1,1],[.06944444444444442,.7276368491321763,.1,1],[.06944444444444442,.8584779706275033,.1,1]],[[.11944444444444446,.8584779706275033,.1,1],[.2749999999999999,.8664886515353805,.1,1]],[[.1972222222222222,.8531375166889186,.1,1],[.19999999999999996,.7142857142857143,.1,1]],[[.3277777777777777,.6982643524699599,.1,1],[.36111111111111116,.855807743658211,.1,1],[.4361111111111111,.7169559412550066,.1,1]],[[.34444444444444455,.7516688918558078,.1,1],[.40555555555555545,.7676902536715621,.1,1]],[[.5888888888888888,.8531375166889186,.1,1],[.5027777777777778,.8531375166889186,.1,1],[.4916666666666667,.7169559412550066,.1,1],[.586111111111111,.7142857142857143,.1,1]],[[.5472222222222223,.7142857142857143,.1,1],[.5166666666666666,.6769025367156208,.1,1]],[[.6444444444444444,.7116154873164219,.1,1],[.7194444444444446,.842456608811749,.1,1],[.7777777777777777,.6982643524699599,.1,1]],[[.675,.7516688918558078,.1,1],[.7472222222222222,.7516688918558078,.1,1]],[[.8138888888888889,.6982643524699599,.1,1],[.8166666666666667,.8371161548731643,.1,1],[.9305555555555556,.8397863818424566,.1,1],[.925,.6929238985313751,.1,1],[.7944444444444445,.7062750333778371,.1,1]],[[-.7861111111111112,.3431241655540721,.1,1],[-.7805555555555554,.4606141522029372,.1,1],[-.9305555555555556,.4606141522029372,.1,1],[-.9333333333333333,.2149532710280374,.1,1],[-.7861111111111112,.2149532710280374,.1,1],[-.788888888888889,.26301735647530045,.1,1],[-.8500000000000001,.26301735647530045,.1,1]],[[-.675,.22029372496662214,.1,1],[-.6777777777777778,.46328437917222964,.1,1],[-.55,.46595460614152207,.1,1],[-.49444444444444446,.4312416555407209,.1,1],[-.49722222222222223,.35113484646194926,.1,1],[-.5583333333333333,.32443257676902537,.1,1],[-.6305555555555555,.31909212283044064,.1,1],[-.5722222222222222,.22296395193591456,.1,1]],[[-.463888888888889,.21228304405874499,.1,1],[-.3666666666666667,.46328437917222964,.1,1],[-.2666666666666666,.22296395193591456,.1,1]],[[-.4194444444444443,.3004005340453939,.1,1],[-.30000000000000004,.30841121495327106,.1,1]],[[-.3500000000000001,.5300400534045394,.1,1],[-.31666666666666665,.6128170894526035,.1,1]],[[-.061111111111111116,.4552736982643525,.1,1],[-.17500000000000004,.4686248331108144,.1,1],[-.18055555555555558,.2576769025367156,.1,1]],[[-.06666666666666665,.37783711615487314,.1,1],[-.1694444444444443,.38050734312416556,.1,1]],[[.05555555555555558,.44726301735647533,.1,1],[.05833333333333335,.24432576769025371,.1,1]],[[.05555555555555558,.548731642189586,.1,1],[.05555555555555558,.5086782376502003,.1,1]],[[.27222222222222214,.4873164218958611,.1,1],[.13055555555555554,.47663551401869164,.1,1],[.1416666666666666,.24699599465954603,.1,1],[.2944444444444445,.260347129506008,.1,1]],[[.3472222222222223,.2550066755674232,.1,1],[.3944444444444444,.5166889185580774,.1,1],[.5055555555555555,.2710280373831776,.1,1]],[[.3666666666666667,.3297730307076101,.1,1],[.4750000000000001,.3457943925233645,.1,1]],[[-.7611111111111111,.025367156208277675,.1,1],[-.5444444444444445,.03604806408544725,.1,1],[-.5388888888888888,-.10547396528704933,.1,1],[-.7361111111111112,-.1134846461949266,.1,1],[-.7361111111111112,-.23898531375166887,.1,1],[-.5277777777777777,-.23097463284379183,.1,1]],[[-.411111111111111,.04672897196261683,.1,1],[-.411111111111111,-.20694259012016025,.1,1],[-.21388888888888902,-.198931909212283,.1,1],[-.21111111111111125,.044058744993324406,.1,1],[-.4305555555555556,.041388518024032095,.1,1]],[[-.10000000000000009,-.04405874499332452,.1,1],[-.022222222222222143,.03604806408544725,.1,1],[-.008333333333333304,-.2016021361815754,.1,1]],[[-.07777777777777772,-.20427236315086783,.1,1],[.06666666666666665,-.198931909212283,.1,1]],[[.2694444444444444,-.05473965287049398,.1,1],[.10555555555555562,-.05473965287049398,.1,1],[.09444444444444455,.07877169559412545,.1,1],[.2666666666666666,.07877169559412545,.1,1],[.26388888888888884,-.20961281708945267,.1,1]],[[.3305555555555555,-.20427236315086783,.1,1],[.36388888888888893,-.20427236315086783,.1,1]],[[.4361111111111111,-.04939919893190914,.1,1],[.5361111111111112,.04672897196261683,.1,1],[.5472222222222223,-.19626168224299056,.1,1]],[[.47777777777777786,-.20694259012016025,.1,1],[.6194444444444445,-.19626168224299056,.1,1]],[]]},function(e,t,n){(function(t){var n="Expected a function",i=NaN,o="[object Symbol]",r=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,c=/^0o[0-7]+$/i,l=parseInt,u="object"==typeof t&&t&&t.Object===Object&&t,p="object"==typeof self&&self&&self.Object===Object&&self,d=u||p||Function("return this")(),f=Object.prototype.toString,y=Math.max,h=Math.min,w=function(){return d.Date.now()};function v(e,t,i){var o,r,a,s,c,l,u=0,p=!1,d=!1,f=!0;if("function"!=typeof e)throw new TypeError(n);function v(t){var n=o,i=r;return o=r=void 0,u=t,s=e.apply(i,n)}function x(e){var n=e-l;return void 0===l||n>=t||n<0||d&&e-u>=a}function b(){var e=w();if(x(e))return L(e);c=setTimeout(b,function(e){var n=t-(e-l);return d?h(n,a-(e-u)):n}(e))}function L(e){return c=void 0,f&&o?v(e):(o=r=void 0,s)}function O(){var e=w(),n=x(e);if(o=arguments,r=this,l=e,n){if(void 0===c)return function(e){return u=e,c=setTimeout(b,t),p?v(e):s}(l);if(d)return c=setTimeout(b,t),v(l)}return void 0===c&&(c=setTimeout(b,t)),s}return t=g(t)||0,m(i)&&(p=!!i.leading,a=(d="maxWait"in i)?y(g(i.maxWait)||0,t):a,f="trailing"in i?!!i.trailing:f),O.cancel=function(){void 0!==c&&clearTimeout(c),u=0,o=l=r=c=void 0},O.flush=function(){return void 0===c?s:L(w())},O}function m(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function g(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&f.call(e)==o}(e))return i;if(m(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=m(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(r,"");var n=s.test(e);return n||c.test(e)?l(e.slice(2),n?2:8):a.test(e)?i:+e}e.exports=function(e,t,i){var o=!0,r=!0;if("function"!=typeof e)throw new TypeError(n);return m(i)&&(o="leading"in i?!!i.leading:o,r="trailing"in i?!!i.trailing:r),v(e,t,{leading:o,maxWait:t,trailing:r})}}).call(this,n(21))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n}]);