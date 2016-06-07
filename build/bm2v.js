(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bm2v"] = factory();
	else
		root["bm2v"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _core = __webpack_require__(1);
	
	__webpack_require__(5);
	
	exports.Binder = _core.Binder;
	exports.BinderCache = _core.BinderCache;
	exports.Model = _core.Model;
	exports.View = _core.View;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _binder = __webpack_require__(2);
	
	Object.defineProperty(exports, 'Binder', {
	  enumerable: true,
	  get: function get() {
	    return _binder.Binder;
	  }
	});
	
	var _model = __webpack_require__(3);
	
	Object.defineProperty(exports, 'BinderCache', {
	  enumerable: true,
	  get: function get() {
	    return _model.BinderCache;
	  }
	});
	Object.defineProperty(exports, 'Model', {
	  enumerable: true,
	  get: function get() {
	    return _model.Model;
	  }
	});
	
	var _view = __webpack_require__(4);
	
	Object.defineProperty(exports, 'View', {
	  enumerable: true,
	  get: function get() {
	    return _view.View;
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Binder = exports.Binder = function () {
	  _createClass(Binder, null, [{
	    key: 'register',
	    value: function register(type, fn) {
	      if (Binder.strategies[type]) throw new Error(type + ' has been registered in Binder strategies');
	      Binder.strategies[type] = fn;
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel(type) {
	      delete Binder.strategies[type];
	    }
	  }]);
	
	  function Binder(cog, viewCtx) {
	    _classCallCheck(this, Binder);
	
	    var _cog = _toArray(cog);
	
	    var type = _cog[0];
	
	    var strategyParams = _cog.slice(1);
	
	    var strategy = Binder.strategies[type];
	    if (!strategy) throw new Error(type + ' is not registered in Binder strategies');
	    if (typeof strategy === 'function') {
	      strategyParams.unshift(viewCtx);
	      // `this` points to a view
	      strategy.apply(this, strategyParams);
	    }
	  }
	
	  return Binder;
	}();
	
	Binder.strategies = {};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BinderCache = exports.BinderCache = function () {
	  function BinderCache(bind) {
	    _classCallCheck(this, BinderCache);
	
	    this.cache = [];
	    if (bind) this.add(bind);
	  }
	
	  _createClass(BinderCache, [{
	    key: 'add',
	    value: function add(bind) {
	      this.cache.push(bind);
	    }
	  }]);
	
	  return BinderCache;
	}();
	
	var Model = exports.Model = function () {
	  function Model(value) {
	    _classCallCheck(this, Model);
	
	    this.model = value;
	    this.cache = {};
	  }
	
	  _createClass(Model, [{
	    key: 'cacheBinder',
	    value: function cacheBinder(key, binder) {
	      var old = this.cache[key];
	      if (!old) this.cache[key] = new BinderCache(binder);else old.add(binder);
	    }
	  }, {
	    key: 'get',
	    value: function get(key) {
	      if (!key) return this.model;
	      return this.model[key];
	    }
	  }, {
	    key: 'update',
	    value: function update(key, value) {
	      var _this = this;
	
	      if (key === '') this.model = value;else this.model[key] = value;
	      var bindersOfKey = this.cache[key];
	      var bindersOfModel = key === '' ? null : this.cache[''];
	      if (bindersOfKey) bindersOfKey.cache.forEach(function (binder) {
	        if (typeof binder.update === 'function') binder.update(value);
	      });
	      if (bindersOfModel) bindersOfModel.cache.forEach(function (binder) {
	        if (typeof binder.update === 'function') binder.update(_this.model);
	      });
	    }
	  }, {
	    key: 'updateCollection',
	    value: function updateCollection(key, index, value) {
	      var _this2 = this;
	
	      if (key === '') this.model[index] = value;else this.model[key][index] = value;
	      var bindersOfKey = this.cache[key];
	      var bindersOfModel = key === '' ? null : this.cache[''];
	      if (bindersOfKey) bindersOfKey.cache.forEach(function (binder) {
	        if (typeof binder.update === 'function') binder.update(_this2.model[key]);
	      });
	      if (bindersOfModel) bindersOfModel.cache.forEach(function (binder) {
	        if (typeof binder.update === 'function') binder.update(_this2.model);
	      });
	    }
	  }]);

	  return Model;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.View = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _binder = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var View = exports.View = function () {
	  function View(conf) {
	    var _this = this;
	
	    _classCallCheck(this, View);
	
	    var template = conf.template;
	    var models = conf.models;
	    var events = conf.events;
	    var model = conf.model;
	    var bind = conf.bind;
	
	    this.dom = createContainer(template);
	    // this is a sugar api
	    if (model && bind) this.bindModel(model, bind);
	    if (!model && models) models.forEach(function (_model) {
	      var model = _model.model;
	      var bind = _model.bind;
	
	      _this.bindModel(model, bind);
	    });
	    if (events) for (var selector in events) {
	      var event = events[selector];
	
	      var _event = _slicedToArray(event, 2);
	
	      var eventName = _event[0];
	      var callback = _event[1];
	
	      this.bindEvent(selector, eventName, callback);
	    }
	  }
	
	  _createClass(View, [{
	    key: 'append',
	    value: function append(selector, view) {
	      var parentNode = void 0,
	          childNode = void 0;
	      var errMsg = 'invalid parameters in bm2v.View.append method';
	      switch (arguments.length) {
	        case 2:
	          parentNode = this.query(selector)[0];
	          childNode = view instanceof View ? view.dom : view;
	          break;
	        case 1:
	          parentNode = this.dom;
	          if (selector instanceof View) childNode = selector.dom;else if (selector instanceof HTMLElement) childNode = selector;else throw new Error(errMsg);
	          break;
	        default:
	          throw new Error(errMsg);
	      }
	      if (!parentNode) throw new Error('can not find \'' + selector + '\' when try to append to it');
	      parentNode.appendChild(childNode);
	    }
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent(selector, eventName, callback) {
	      var _this2 = this;
	
	      var doms = this.query(selector);
	      doms.forEach(function (dom) {
	        dom.addEventListener(eventName, function (event) {
	          callback.call(_this2, event);
	        });
	      });
	    }
	  }, {
	    key: 'bindModel',
	    value: function bindModel(model, bind) {
	      var _this3 = this;
	
	      var key = void 0;
	      for (key in bind) {
	        var binderCogs = bind[key];
	        binderCogs.forEach(function (bindCog) {
	          model.cacheBinder(key, new _binder.Binder(bindCog, _this3));
	          model.update(key, key === '' ? model.model : model.model[key]);
	        });
	      }
	    }
	  }, {
	    key: 'query',
	    value: function query(selector) {
	      var ret = [];
	      if (!selector) {
	        ret.push(this.dom);
	        return ret;
	      }
	      if (matchesSelector(this.dom, selector)) ret.push(this.dom);
	      Array.prototype.forEach.call(this.dom.querySelectorAll(selector), function (dom) {
	        ret.push(dom);
	      });
	      return ret;
	    }
	  }]);
	
	  return View;
	}();
	
	function createContainer(html) {
	  var container = document.createElement('div');
	  container.innerHTML = html;
	  if (container.childNodes.length === 1 && container.childNodes[0].nodeType === 1) return container.childNodes[0];
	  return container;
	}
	
	function matchesSelector(dom, selector) {
	  if (!selector || !dom) return false;
	  var matches = dom.matches || dom.msMatchesSelector || dom.mozMatchesSelector || dom.webkitMatchesSelector;
	  if (!matches) return false;
	  return matches.call(dom, selector);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	__webpack_require__(9);
	
	__webpack_require__(10);
	
	__webpack_require__(11);
	
	__webpack_require__(12);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _binder = __webpack_require__(2);
	
	_binder.Binder.register('class', function (view, selector, classNames) {
	  classNames = toClassNameList(classNames);
	  var doms = view.query(selector);
	  this.update = function (value) {
	    doms.forEach(function (dom) {
	      var classList = dom.classList;
	      var exec = !!value ? classList.add : classList.remove;
	      exec.apply(classList, classNames);
	    });
	  };
	});
	
	function toClassNameList(classNames) {
	  if (!classNames) return [];
	  if (Array.isArray(classNames)) return classNames;
	  return [classNames];
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _binder = __webpack_require__(2);
	
	_binder.Binder.register('empty', function () {
	  this.update = function () {};
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _binder = __webpack_require__(2);
	
	_binder.Binder.register('for', function (view, selector, createChildView) {
	  var doms = view.query(selector);
	  this.update = function (collection) {
	    var childViews = [];
	    collection.forEach(function (model, index) {
	      var childView = createChildView(model, index);
	      childViews.push(childView);
	    });
	    doms.forEach(function (dom) {
	      while (dom.firstChild) {
	        dom.firstChild.remove();
	      }
	      childViews.forEach(function (childView) {
	        dom.appendChild(childView.dom);
	      });
	    });
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _binder = __webpack_require__(2);
	
	_binder.Binder.register('form', function (view, selector) {
	  var inputs = view.query(selector);
	  this.update = function (value) {
	    inputs.forEach(function (input) {
	      switch (input.type) {
	        case 'text':
	          input.value !== value ? input.value = value : '';
	          break;
	        case 'checkbox':
	          input.checked = !!value;
	          break;
	        case 'radio':
	          input.checked = input.value === value;
	          break;
	      }
	    });
	  };
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _binder = __webpack_require__(2);
	
	_binder.Binder.register('if', function (view, selector) {
	  var doms = view.query(selector);
	  var cache = [];
	  doms.forEach(function (dom) {
	    cache.push([dom, document.createComment('bm2v if ' + selector)]);
	  });
	  this.update = function (value) {
	    value = !!value;
	    cache.forEach(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2);
	
	      var dom = _ref2[0];
	      var commentDom = _ref2[1];
	
	      if (value) replaceTo(dom, commentDom);else replaceTo(commentDom, dom);
	    });
	  };
	});
	
	function replaceTo(newNode, oldNode) {
	  var parentNode = oldNode.parentNode;
	
	  if (!parentNode) return;
	  parentNode.replaceChild(newNode, oldNode);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _binder = __webpack_require__(2);
	
	_binder.Binder.register('json', function (view, selector) {
	  var doms = view.query(selector);
	  var cache = [];
	  doms.forEach(function (dom) {
	    var textNode = document.createTextNode('');
	    dom.appendChild(textNode);
	    cache.push(textNode);
	  });
	  this.update = function (value) {
	    cache.forEach(function (textNode) {
	      var jsonStr = void 0;
	      try {
	        jsonStr = JSON.stringify(value, null, 2);
	      } catch (err) {
	        jsonStr = 'invalid json';
	      }
	      textNode.textContent = jsonStr;
	    });
	  };
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _binder = __webpack_require__(2);
	
	_binder.Binder.register('text', function (view, selector, transform) {
	  var doms = view.query(selector);
	  var cache = [];
	  var getText = typeof transform === 'function' ? function (value) {
	    return transform(value);
	  } : function (value) {
	    return value;
	  };
	  doms.forEach(function (dom) {
	    removeChildNodes(dom);
	    var textNode = document.createTextNode('');
	    dom.appendChild(textNode);
	    cache.push(textNode);
	  });
	  this.update = function (value) {
	    cache.forEach(function (textNode) {
	      textNode.textContent = getText(value);
	    });
	  };
	});
	
	function removeChildNodes(dom) {
	  var childNodes = dom.childNodes;
	  if (!childNodes || !childNodes.length) return;
	  Array.prototype.forEach.call(childNodes, function (childNode) {
	    return childNode.remove();
	  });
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bm2v.js.map