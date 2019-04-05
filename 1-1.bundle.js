/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"1-1": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/computacao-grafica";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/exercises/1-1.ts","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/exercises/1-1.ts":
/*!******************************!*\
  !*** ./src/exercises/1-1.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
// @ts-ignore
var _a = utils_1.init(), baseScene = _a[0], renderer = _a[1], camera = _a[2], _b = _a[3], axisHeight = _b.axisHeight, axisWidth = _b.axisWidth, height = _b.height, width = _b.width;
document.body.appendChild(renderer.domElement);
var currentScene = 0;
var scenes = [new three_1.Scene(), new three_1.Scene(), new three_1.Scene(), new three_1.Scene()];
var scene;
// Primeira cena
scene = scenes[0];
var firstSceneTriangle = utils_1.shape([
    [0, 0],
    [100, 0],
    [100 * Math.cos((60 * Math.PI) / 180), 100 * Math.sin((60 * Math.PI) / 180)]
], { color: 0xff0000 });
scene.add(firstSceneTriangle);
// Segunda scena
scene = scenes[1];
var tiragleLineGeometry = new three_1.Geometry();
tiragleLineGeometry.vertices.push(new three_1.Vector3(0, 0, 2), new three_1.Vector3(100, 0, 2), new three_1.Vector3(100 * Math.cos((60 * Math.PI) / 180), 100 * Math.sin((60 * Math.PI) / 180), 2));
var triangleLineMaterial = new three_1.LineBasicMaterial({ color: 0xff0000 });
var triangleLine = new three_1.LineLoop(tiragleLineGeometry, triangleLineMaterial);
scene.add(triangleLine);
// Terceira cena
scene = scenes[2];
scene.add(new three_1.LineLoop(tiragleLineGeometry, triangleLineMaterial));
var thirdSceneTriangle = utils_1.shape([
    [0, 0],
    [-100, 0],
    [
        -100 * Math.cos((60 * Math.PI) / 180),
        -100 * Math.sin((60 * Math.PI) / 180)
    ]
], { color: 0xff0000 });
scene.add(thirdSceneTriangle);
// Quarta cena
scene = scenes[3];
// Primeiro ponto, rotacionado 60 graus acima do eixo X, distancia 100;
var x = function (angle) { return 100 * Math.cos((angle * Math.PI) / 180); };
var y = function (angle) { return 100 * Math.sin((angle * Math.PI) / 180); };
// Primeiro ponto no angulo de 60
var initalAngle = 60;
var geo = new three_1.Geometry();
var mat = new three_1.LineBasicMaterial({ color: 0xffffff });
// Rotaciona para baixo de 60 em 60 graus adicionando vértice
for (var i = 0; i < 6; i++) {
    geo.vertices.push(new three_1.Vector3(x(initalAngle + i * -60), y(initalAngle + i * -60), 1));
}
var lin = new three_1.Line(geo, mat);
scene.add(lin);
for (var _i = 0, scenes_1 = scenes; _i < scenes_1.length; _i++) {
    var scene_1 = scenes_1[_i];
    scene_1.add(utils_1.axes());
}
// Inicializa o ciclo de renderização
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();
// Escuta em keydown
window.addEventListener('keydown', function (ev) {
    switch (ev.key) {
        case 'ArrowRight':
            scene = scenes[currentScene++ % 4];
            break;
        case 'ArrowLeft':
            scene = scenes[(currentScene = currentScene + 3) % 4];
            break;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS0xLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiMS0xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQTZDO0FBQzdDLCtCQU9lO0FBQ2YsYUFBYTtBQUNQLElBQUEsbUJBS0ksRUFKUixpQkFBUyxFQUNULGdCQUFRLEVBQ1IsY0FBTSxFQUNOLFVBQXdDLEVBQXRDLDBCQUFVLEVBQUUsd0JBQVMsRUFBRSxrQkFBTSxFQUFFLGdCQUN6QixDQUFDO0FBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRS9DLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQixJQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksYUFBSyxFQUFFLEVBQUUsSUFBSSxhQUFLLEVBQUUsRUFBRSxJQUFJLGFBQUssRUFBRSxFQUFFLElBQUksYUFBSyxFQUFFLENBQUMsQ0FBQztBQUVwRSxJQUFJLEtBQVksQ0FBQztBQUNqQixnQkFBZ0I7QUFDaEIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixJQUFNLGtCQUFrQixHQUFHLGFBQUssQ0FDOUI7SUFDRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDTixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDUixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Q0FDN0UsRUFDRCxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FDcEIsQ0FBQztBQUNGLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU5QixnQkFBZ0I7QUFDaEIsS0FBSyxH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

/***/ })

/******/ });
//# sourceMappingURL=1-1.bundle.js.map