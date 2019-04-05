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
/******/ 		"triangles": 0
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
/******/ 	deferredModules.push(["./src/exercises/triangles.ts","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/exercises/triangles.ts":
/*!************************************!*\
  !*** ./src/exercises/triangles.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
utils_1.controls({
    'Seta para a direita': 'Adiciona mais um polígono',
    'Seta para cima': 'Adiciona um véric em cada polígono',
    '-': 'Diminúi FPS',
    '=': 'Aumenta FPS'
});
// Variáveis globais
var size = 250;
var after = null;
var now = new Date();
var fps = 60;
var quantity = 2;
var dots = 3;
var colors = new Array(quantity).fill(null).map(function () { return Math.random() * 0xffffff; });
// Escutando cliques no teclado
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            addVertex();
            break;
        case 'ArrowRight':
            addPolygon();
            break;
        case '-':
            fps = Math.max(15, fps / 2);
            break;
        case '=':
            fps = Math.min(60, fps * 2);
            break;
    }
});
var limitFps = function (fps, callback) {
    var frameTime = 1000 / fps;
    if (after && after.getTime() - now.getTime() >= frameTime) {
        now = after;
        callback();
    }
    after = new Date();
};
var randomNegative = function () {
    return Math.random() >= 0.5 ? -1 : 1;
};
var randomCoords = function (limit, floor) {
    return floor
        ? [
            Math.floor(Math.random() * limit) * randomNegative(),
            Math.floor(Math.random() * limit) * randomNegative(),
            0
        ]
        : [
            Math.random() * limit * randomNegative(),
            Math.random() * limit * randomNegative(),
            0
        ];
};
var addVertex = function () {
    coordinates = coordinates.map(function (polygon) {
        return polygon.concat([randomCoords(size, true)]);
    });
    speeds = speeds.map(function (speed) {
        return speed.concat([randomCoords(3)]);
    });
    dots++;
};
var addPolygon = function () {
    coordinates.push(new Array(dots).fill(null).map(function () { return randomCoords(size, true); }));
    speeds.push(new Array(dots).fill(null).map(function () { return randomCoords(3); }));
    colors.push(Math.random() * 0xffffff);
    quantity++;
};
var coordinates = new Array(quantity)
    .fill(null)
    .map(function () { return new Array(dots).fill(null).map(function () { return randomCoords(size, true); }); });
var speeds = new Array(quantity)
    .fill(null)
    .map(function () { return new Array(dots).fill(null).map(function () { return randomCoords(3); }); });
var _a = utils_1.init(), scene = _a[0], renderer = _a[1], camera = _a[2], _b = _a[3], axisHeight = _b.axisHeight, axisWidth = _b.axisWidth, height = _b.height, width = _b.width;
document.body.appendChild(renderer.domElement);
var material = new three_1.LineBasicMaterial({
    color: 0xff00ff
});
var start = function () {
    var limitBox = utils_1.lineLoop([[size, size, 0], [size, -size, 0], [-size, -size, 0], [-size, size, 0]], {
        color: 0xffffff
    });
    var triangles = coordinates.map(function (coord, index) {
        return utils_1.lineLoop(coord, { color: colors[index] });
    });
    return [limitBox].concat(triangles);
};
var update = function () {
    // Para cada triangulo
    for (var item in coordinates) {
        var triangle = coordinates[item];
        var tSpeed = speeds[item];
        // Para cada vértice
        for (var tIndex in triangle) {
            var point = triangle[tIndex];
            var pSpeeds = tSpeed[tIndex];
            // Para cada coordenada
            for (var cIndex in point) {
                var pos = point[cIndex];
                var delta = pSpeeds[cIndex];
                var nPos = pos + delta;
                if (Math.abs(nPos) >= size) {
                    nPos = pos - delta;
                    speeds[item][tIndex][cIndex] *= -1;
                }
                coordinates[item][tIndex][cIndex] = nPos;
            }
        }
    }
};
var render = function () {
    after = new Date();
    // @ts-ignore
    requestAnimationFrame(render);
    update();
    var components = start();
    scene.add.apply(scene, components);
    limitFps(fps, function () {
        renderer.render(scene, camera);
    });
    scene.remove.apply(scene, components);
};
render();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpYW5nbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJpYW5nbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQTZEO0FBRTdELCtCQUEwQztBQUcxQyxnQkFBUSxDQUFDO0lBQ1AscUJBQXFCLEVBQUUsMkJBQTJCO0lBQ2xELGdCQUFnQixFQUFFLG9DQUFvQztJQUN0RCxHQUFHLEVBQUUsYUFBYTtJQUNsQixHQUFHLEVBQUUsYUFBYTtDQUNuQixDQUFDLENBQUM7QUFFSCxvQkFBb0I7QUFDcEIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2pCLElBQUksS0FBSyxHQUFnQixJQUFJLENBQUM7QUFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNyQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0FBRWhGLCtCQUErQjtBQUMvQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQztJQUNsQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUU7UUFDZixLQUFLLFNBQVM7WUFDWixTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU07UUFDUixLQUFLLFlBQVk7WUFDZixVQUFVLEVBQUUsQ0FBQztZQUNiLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU07UUFDUixLQUFLLEdBQUc7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

/***/ })

/******/ });
//# sourceMappingURL=triangles.bundle.js.map