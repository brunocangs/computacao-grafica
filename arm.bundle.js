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
/******/ 		"arm": 0
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
/******/ 	deferredModules.push(["./src/exercises/arm.ts","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/exercises/arm.ts":
/*!******************************!*\
  !*** ./src/exercises/arm.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var three_2 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
utils_1.controls({
    '1, 2, 3': 'Seleciona parte do braço para mexer',
    Q: 'Move braço selecionado para cima',
    E: 'Move braço selecionado para baixo',
    'Seta para cima': 'Abre a garra',
    'Seta para baixo': 'Fecha a garra'
});
var x = 1300, y = 800, z = 1300, angle = 60;
var axies = utils_1.axes();
var _a = utils_1.init({
    camera: {
        position: [x, y, z],
        lookAt: [0, 0, 0]
    }
}), scene = _a[0], renderer = _a[1], camera = _a[2], _b = _a[3], axisHeight = _b.axisHeight, axisWidth = _b.axisWidth, height = _b.height, width = _b.width;
document.body.appendChild(renderer.domElement);
var armsRotation = [0, 0, 0];
var currentArm = 0;
var clawOpening = 0;
var geometry = new three_1.BoxGeometry(30, 30, 30);
var material = new three_1.MeshLambertMaterial({
    color: 0xffff00,
    side: three_1.DoubleSide
});
var clawMaterial = new three_1.MeshLambertMaterial({
    color: 0xff0000,
    side: three_1.DoubleSide
});
geometry.scale(2, 0.5, 0.5);
window.addEventListener('keydown', function (ev) {
    console.log(ev.key);
    switch (ev.key) {
        case 'q':
            armsRotation[currentArm] += utils_1.degToRad(5);
            break;
        case 'e':
            armsRotation[currentArm] -= utils_1.degToRad(5);
            break;
        case '1':
            currentArm = 0;
            break;
        case '2':
            currentArm = 1;
            break;
        case '3':
            currentArm = 2;
            break;
        case 'ArrowUp':
            clawOpening += utils_1.degToRad(5);
            break;
        case 'ArrowDown':
            clawOpening -= utils_1.degToRad(5);
            break;
    }
});
var claw = function () {
    var firstBottomGeometry = geometry
        .clone()
        .translate(30, 0, 0)
        .rotateZ(utils_1.degToRad(35))
        .translate(-60 * Math.cos(utils_1.degToRad(35)), 0, 0);
    var secondBottomGeometry = firstBottomGeometry.clone().scale(-1, 1, 1);
    var firstBottom = new three_2.Mesh(firstBottomGeometry, clawMaterial);
    var secondBottom = new three_2.Mesh(secondBottomGeometry, clawMaterial);
    var firstTopGeometry = firstBottomGeometry.clone().scale(1, -1, 1);
    var secondTopGeometry = secondBottomGeometry.clone().scale(1, -1, 1);
    var firstTop = new three_2.Mesh(firstTopGeometry, clawMaterial);
    var secondTop = new three_2.Mesh(secondTopGeometry, clawMaterial);
    var ClawBottom = new three_2.Group();
    ClawBottom.add(firstBottom, secondBottom);
    ClawBottom.rotateZ(clawOpening);
    ClawBottom.translateX(60 * Math.cos(utils_1.degToRad(35)));
    var ClawTop = new three_2.Group();
    ClawTop.add(firstTop, secondTop);
    ClawTop.rotateZ(-clawOpening);
    ClawTop.translateX(60 * Math.cos(utils_1.degToRad(35)));
    var Claw = new three_2.Group();
    Claw.add(ClawTop, ClawBottom);
    Claw.translateX(30 * Math.cos(utils_1.degToRad(35)));
    return Claw;
};
var start = function () {
    var Claw = claw();
    // Claw.translateX(30);
    var thirdArmGeometry = geometry.clone();
    var thirdArmBase = new three_2.Mesh(thirdArmGeometry, material);
    var thirdArm = new three_2.Group();
    thirdArm.add(thirdArmBase, Claw);
    thirdArm.translateX(30);
    thirdArm.rotateZ(armsRotation[2]);
    thirdArm.translateX(30);
    var secondArmGeometry = geometry.clone();
    var secondArmBase = new three_2.Mesh(secondArmGeometry, material);
    var secondArm = new three_2.Group();
    secondArm.translateX(30);
    secondArm.rotateZ(armsRotation[1]);
    secondArm.translateX(30);
    secondArm.add(secondArmBase, thirdArm);
    var firstArmGeometry = geometry.clone();
    var firstArmBase = new three_2.Mesh(firstArmGeometry, material);
    var firstArm = new three_2.Group();
    firstArm.add(firstArmBase, secondArm);
    firstArm.rotateZ(armsRotation[0]);
    firstArm.translateX(30);
    return [firstArm, axies];
};
var render = function () {
    requestAnimationFrame(render);
    angle += 0.1;
    var components = start();
    camera.position.set(x * Math.cos(utils_1.degToRad(angle)), y, x * Math.sin(utils_1.degToRad(angle)));
    scene.add.apply(scene, components);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    scene.remove.apply(scene, components);
};
render();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQTBEO0FBQzFELCtCQVFlO0FBQ2YsK0JBQW9DO0FBQ3BDLGdCQUFRLENBQUM7SUFDUCxTQUFTLEVBQUUscUNBQXFDO0lBQ2hELENBQUMsRUFBRSxrQ0FBa0M7SUFDckMsQ0FBQyxFQUFFLG1DQUFtQztJQUN0QyxnQkFBZ0IsRUFBRSxjQUFjO0lBQ2hDLGlCQUFpQixFQUFFLGVBQWU7Q0FDbkMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUNWLENBQUMsR0FBRyxHQUFHLEVBQ1AsQ0FBQyxHQUFHLElBQUksRUFDUixLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2IsSUFBTSxLQUFLLEdBQUcsWUFBSSxFQUFFLENBQUM7QUFDZixJQUFBOzs7OztFQVVKLEVBVEEsYUFBSyxFQUNMLGdCQUFRLEVBQ1IsY0FBTSxFQUNOLFVBQXdDLEVBQXRDLDBCQUFVLEVBQUUsd0JBQVMsRUFBRSxrQkFBTSxFQUFFLGdCQU1qQyxDQUFDO0FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRS9DLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbkIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLElBQU0sUUFBUSxHQUFHLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLElBQU0sUUFBUSxHQUFHLElBQUksMkJBQW1CLENBQUM7SUFDdkMsS0FBSyxFQUFFLFFBQVE7SUFDZixJQUFJLEVBQUUsa0JBQVU7Q0FDakIsQ0FBQyxDQUFDO0FBQ0gsSUFBTSxZQUFZLEdBQUcsSUFBSSwyQkFBbUIsQ0FBQztJ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

/***/ })

/******/ });
//# sourceMappingURL=arm.bundle.js.map