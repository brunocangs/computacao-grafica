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
/******/ 		"bounce": 0
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
/******/ 	deferredModules.push(["./src/exercises/bounce.ts","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/exercises/bounce.ts":
/*!*********************************!*\
  !*** ./src/exercises/bounce.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var three_2 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var x = 0;
var y = 25;
var speedX = 0.01;
var speedY = 0;
var now = new Date();
var after = null;
var accelY = -0.001;
var fps = 60;
var tick = 0;
setInterval(function () {
    x = 0;
    y = 25;
    speedX = 0.01;
    speedY = 0;
    accelY = -0.001;
    tick = 0;
}, 6000);
utils_1.controls({
    '-': 'Diminui FPS',
    '=': 'Aumenta FPS'
});
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case '-':
            fps = Math.max(15, fps / 2);
            break;
        case '=':
            fps = Math.min(60, fps * 2);
            break;
    }
});
var _a = utils_1.initPerspective(60, 16 / 9, 1, 1000, {
    camera: {
        position: [25, 20, 40],
        lookAt: [25, 20, 0]
    }
}), scene = _a[0], renderer = _a[1], camera = _a[2], _b = _a[3], axisHeight = _b.axisHeight, axisWidth = _b.axisWidth, height = _b.height, width = _b.width;
document.body.appendChild(renderer.domElement);
var limitFps = function (fps, callback) {
    var frameTime = 1000 / fps;
    if (after && after.getTime() - now.getTime() >= frameTime) {
        now = after;
        callback();
    }
    after = new Date();
};
var pos = function (t) {
    speedY = speedY + accelY * t;
    var newpos = y + (speedY / 2) * t;
    if (newpos < 1) {
        newpos = 1;
        speedY *= -0.95;
        speedX *= 0.95;
    }
    return newpos;
};
var geo = new three_1.CircleGeometry(1, 30);
var mat = new three_1.MeshBasicMaterial({
    color: 0xffffff
});
var circle = new three_2.Mesh(geo, mat);
scene.add(circle);
scene.add(utils_1.axes());
var render = function () {
    requestAnimationFrame(render);
    after = new Date();
    limitFps(fps, function () {
        renderer.render(scene, camera);
    });
    tick = tick + 0.2;
    circle.position.x = x = x + speedX * tick;
    circle.position.y = y = pos(tick);
};
render();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm91bmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm91bmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQWlFO0FBQ2pFLCtCQU9lO0FBQ2YsK0JBQTZCO0FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNWLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNYLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztBQUNsQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3JCLElBQUksS0FBSyxHQUFnQixJQUFJLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDcEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBRWIsV0FBVyxDQUFDO0lBQ1YsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNOLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDUCxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2QsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNYLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQztJQUNoQixJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1QsZ0JBQVEsQ0FBQztJQUNQLEdBQUcsRUFBRSxhQUFhO0lBQ2xCLEdBQUcsRUFBRSxhQUFhO0NBQ25CLENBQUMsQ0FBQztBQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQSxDQUFDO0lBQ2xDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRTtRQUNmLEtBQUssR0FBRztZQUNOLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTTtRQUNSLEtBQUssR0FBRztZQUNOLEdBQUcsR0FB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

/***/ })

/******/ });
//# sourceMappingURL=bounce.bundle.js.map