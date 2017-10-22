/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 367);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


const EventBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a();
/* harmony export (immutable) */ __webpack_exports__["a"] = EventBus;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return mapActions; });
/**
 * vuex v2.3.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.3.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(18);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ErrorValidations {

    constructor() {
        let that = this;
        this.errors = {};
        this.exceptions = {
            errors: [],
            add: function (name, description) {
                that.errorExceptions.errors.push({
                    name: name,
                    description: description });
            }
        };
    }

    get(field) {
        if (this.errors[field]) {
            if (this.errors[field] instanceof Array) {
                return this.errors[field][0];
            } else {
                return this.errors[field];
            }
        }
        return "";
    }

    register(errors) {
        this.errors = errors;
    }

    clear(field) {
        if (this.errors[field]) {
            delete this.errors[field][0];
        }
    }
    all() {
        return this.errors;
    }

}
/* harmony export (immutable) */ __webpack_exports__["b"] = ErrorValidations;


class AxiosRequest {

    post(controller, action, data) {
        return axios.post('/api/' + controller + '/' + action, data);
    }

    get(controller, action) {
        var qs = "";
        if (arguments.length >= 3) {
            for (var i = 2; i < arguments.length; i++) {
                qs += arguments[i] + '/';
            }
        }
        qs = qs.substring(0, qs.length - 1);
        var url = '/api/' + controller + '/' + action + (qs !== "" ? "/" + qs : qs);
        return axios.get(url);
    }

    dispatchGet(url, parameters) {
        if (parameters) {
            url = url + "?" + $.param(parameters);
        }
        return axios.get(url);
    }

    route(url) {

        var img = window.imagePath;
        window.location.href = url;
        return this;
    }

    redirect(controller, action = '', data = null, target = '_self') {
        var baseUrl = window.Laravel.baseUrl;
        var url = baseUrl + "/" + controller + "/" + (action !== null ? action : "") + (data !== null ? "/" + data : "");
        window.open(url, target);
    }

    postMultiForm(controller, action, formData) {
        return $.ajax({
            url: '/api/' + controller + '/' + action,
            type: 'POST',
            data: formData,
            headers: { 'X-CSRF-TOKEN': window.Laravel.csrfToken },
            processData: false,
            contentType: false
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AxiosRequest;


const cloneObject = function (objInstance) {
    if (typeof objInstance === "object") return JSON.parse(JSON.stringify(objInstance));else return false;
};
/* harmony export (immutable) */ __webpack_exports__["c"] = cloneObject;


const copiedValue = (source, target, exclude = new Array()) => {
    _.forEach(source, (value, key) => {
        if (exclude.length > 0) {
            if (_.indexOf(exclude, key) < 0) {
                target[key] = value;
            }
        } else {
            target[key] = value;
        }
    });
};
/* harmony export (immutable) */ __webpack_exports__["d"] = copiedValue;


const validation = () => {

    let duplicateOrEmpty = (entity, compArray, field) => {

        for (let i = 0; i < compArray.length; i++) {
            let item = compArray[i];
            if (entity[field] === item[field]) return true;
        }

        return false;
    };

    let isEmpty = (value, ...args) => {
        for (let i = 0; i <= args.length; i++) {
            if (_.trim(value[args[i]]).length === 0) return args[i];
        }
        return "";
    };

    let dateRangePeriod = (startPeriod, startEnd) => {
        if (moment(startPeriod).isAfter(moment(startEnd)) || moment(startPeriod).isSame(moment(startEnd))) {
            return true;
        }
        return false;
    };

    let isNonNumeric = numValue => {
        if (isNaN(numValue)) {
            return true;
        }
        return false;
    };

    function validate(entity, items) {

        let result = {
            key: "",
            isValid: true,
            message: "",
            error(value, key) {
                this.key = key;
                this.isValid = false;
                this.message = value;
            },
            ok() {
                this.message = "";
                this.isValid = true;
                this.key = "";
            }
        };

        //check required
        let req = false;
        if (entity.payment_type === 'bank') req = isEmpty(entity, 'payment_no', 'bank', 'amount');else req = isEmpty(entity, 'payment_no', 'amount');

        if (req) {
            result.error("field is required", req);
            return result;
        }

        if (isNonNumeric(entity.amount)) {
            result.error("Amount must be numeric", "amount");
            return result;
        }

        return result;
    }

    return {
        validate: validate
    };
};
/* harmony export (immutable) */ __webpack_exports__["e"] = validation;


const reIndexing = (items, key = 'id') => {
    items.forEach(function (item, index) {
        index = index + 1;
        item[key] = index;
    });
};
/* harmony export (immutable) */ __webpack_exports__["f"] = reIndexing;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(365)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const toggleModal = {
    data() {
        return {
            toggle: false
        };
    },
    methods: {
        openDialog() {
            this.toggle = true;
        },
        closeDialog() {
            this.toggle = false;
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = toggleModal;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(166),
  /* template */
  __webpack_require__(349),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\ErrorLabel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ErrorLabel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e9ea219a", Component.options)
  } else {
    hotAPI.reload("data-v-e9ea219a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var normalizeHeaderName = __webpack_require__(161);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(14);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(14);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(248)))

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.3
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (true) {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (true) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (true) {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (true) {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (true) {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (true) {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return this
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (true) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (true) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.3';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (true) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    "development" !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}}"
}

function genForScopedSlot (key, el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el)) +
    '})'
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (true) {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var settle = __webpack_require__(153);
var buildURL = __webpack_require__(156);
var parseHeaders = __webpack_require__(162);
var isURLSameOrigin = __webpack_require__(160);
var createError = __webpack_require__(17);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(155);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(158);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(152);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(358)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(170),
  /* template */
  __webpack_require__(324),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\Slider.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Slider.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5dd65970", Component.options)
  } else {
    hotAPI.reload("data-v-5dd65970", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(328),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\PaymentModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PaymentModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6693acf8", Component.options)
  } else {
    hotAPI.reload("data-v-6693acf8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(315),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\TotalPayment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TotalPayment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ef8d55a", Component.options)
  } else {
    hotAPI.reload("data-v-4ef8d55a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(343),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\ContractTerminate.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ContractTerminate.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b865b44e", Component.options)
  } else {
    hotAPI.reload("data-v-b865b44e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(196),
  /* template */
  __webpack_require__(304),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\payee\\Register.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Register.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3079771e", Component.options)
  } else {
    hotAPI.reload("data-v-3079771e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 139 */,
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vee_validate__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vee_validate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vee_validate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_plugins__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_modules__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Sidebar_vue__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Sidebar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Sidebar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_villa_VillaList_vue__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_villa_VillaList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_villa_VillaList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_villa_VillaRegister_vue__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_villa_VillaRegister_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_villa_VillaRegister_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_contract_ContractList_vue__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_contract_ContractList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_contract_ContractList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_contract_ContractRegister_vue__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_contract_ContractRegister_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_contract_ContractRegister_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_contract_CalendarEntry_vue__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_contract_CalendarEntry_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_contract_CalendarEntry_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_bill_BillRegister_vue__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_bill_BillRegister_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_bill_BillRegister_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_bill_BillUpdateForm_vue__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_bill_BillUpdateForm_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_bill_BillUpdateForm_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_reports_ReportList_vue__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_reports_ReportList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_reports_ReportList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_expenditures_Register_vue__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_expenditures_Register_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_expenditures_Register_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_expenditures_ExpenseList_vue__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_expenditures_ExpenseList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_expenditures_ExpenseList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_payee_Register_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_payee_Register_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_payee_Register_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_payee_PayeeList_vue__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_payee_PayeeList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_payee_PayeeList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_bill_BillList_vue__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_bill_BillList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_bill_BillList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_tenant_TenantList_vue__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_tenant_TenantList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__components_tenant_TenantList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_tenant_TenantReg_vue__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_tenant_TenantReg_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__components_tenant_TenantReg_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_accountchart_Register_vue__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_accountchart_Register_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__components_accountchart_Register_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_fixed_asset_FixedAssetList_vue__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_fixed_asset_FixedAssetList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__components_fixed_asset_FixedAssetList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_fixed_asset_FixedAssetRegister_vue__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_fixed_asset_FixedAssetRegister_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__components_fixed_asset_FixedAssetRegister_vue__);

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__(218);

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

window.Vue = __webpack_require__(12);

/**************************
 * Vue Event
 *
 **************************/
window.VueEvent = new Vue();

/**
 * Vue Router include in vue
 */






Vue.use(__WEBPACK_IMPORTED_MODULE_0_vee_validate___default.a);
Vue.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);
Vue.use(__WEBPACK_IMPORTED_MODULE_2__plugins_plugins__["a" /* default */]);

/**************************
*
*
**************************/




















Vue.filter('toDateFormat', value => {
    if (isNaN(Date.parse(value))) {
        value = moment().format('L');
    }
    return moment(value).format('D-MMM-Y');
});

Vue.filter('toCurrencyFormat', value => {

    if (isNaN(Number.parseFloat(value))) {

        value = 0;
    }
    return accounting.formatNumber(value);
});

new Vue({
    el: "#mainApp",
    store: __WEBPACK_IMPORTED_MODULE_3__store_modules__["a" /* store */],
    components: {
        'villaList': __WEBPACK_IMPORTED_MODULE_5__components_villa_VillaList_vue___default.a,
        'villaRegister': __WEBPACK_IMPORTED_MODULE_6__components_villa_VillaRegister_vue___default.a,
        'contractList': __WEBPACK_IMPORTED_MODULE_7__components_contract_ContractList_vue___default.a,
        'contractRegister': __WEBPACK_IMPORTED_MODULE_8__components_contract_ContractRegister_vue___default.a,
        'billRegister': __WEBPACK_IMPORTED_MODULE_10__components_bill_BillRegister_vue___default.a,
        'billUpdateForm': __WEBPACK_IMPORTED_MODULE_11__components_bill_BillUpdateForm_vue___default.a,
        'contractCalendarEntry': __WEBPACK_IMPORTED_MODULE_9__components_contract_CalendarEntry_vue___default.a,
        'sidebar': __WEBPACK_IMPORTED_MODULE_4__components_Sidebar_vue___default.a,
        'reportList': __WEBPACK_IMPORTED_MODULE_12__components_reports_ReportList_vue___default.a,
        ExpenditureRegister: __WEBPACK_IMPORTED_MODULE_13__components_expenditures_Register_vue___default.a,
        ExpenseList: __WEBPACK_IMPORTED_MODULE_14__components_expenditures_ExpenseList_vue___default.a,
        PayeeRegister: __WEBPACK_IMPORTED_MODULE_15__components_payee_Register_vue___default.a,
        PayeeList: __WEBPACK_IMPORTED_MODULE_16__components_payee_PayeeList_vue___default.a,
        BillList: __WEBPACK_IMPORTED_MODULE_17__components_bill_BillList_vue___default.a,
        TenantList: __WEBPACK_IMPORTED_MODULE_18__components_tenant_TenantList_vue___default.a,
        TenantRegister: __WEBPACK_IMPORTED_MODULE_19__components_tenant_TenantReg_vue___default.a,
        AccountChartRegister: __WEBPACK_IMPORTED_MODULE_20__components_accountchart_Register_vue___default.a,
        FixedAssetList: __WEBPACK_IMPORTED_MODULE_21__components_fixed_asset_FixedAssetList_vue___default.a,
        FixedAssetRegister: __WEBPACK_IMPORTED_MODULE_22__components_fixed_asset_FixedAssetRegister_vue___default.a
    }
});

/***/ }),
/* 141 */,
/* 142 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 143 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 144 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 145 */,
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(147);

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var bind = __webpack_require__(18);
var Axios = __webpack_require__(149);
var defaults = __webpack_require__(10);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(15);
axios.CancelToken = __webpack_require__(148);
axios.isCancel = __webpack_require__(16);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(163);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(15);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(10);
var utils = __webpack_require__(4);
var InterceptorManager = __webpack_require__(150);
var dispatchRequest = __webpack_require__(151);
var isAbsoluteURL = __webpack_require__(159);
var combineURLs = __webpack_require__(157);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var transformData = __webpack_require__(154);
var isCancel = __webpack_require__(16);
var defaults = __webpack_require__(10);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(17);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        events: Object,
        url: String,
        editable: Boolean
    },
    data() {
        return {
            cal: null
        };
    },
    mounted() {
        let that = this;
        this.cal = $(this.$el);
        let defaultBackground = "#3a87ad";
        let prevClickedEvent;
        let args = {
            lang: 'en',
            header: {
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            height: "300px",
            allDaySlot: false,
            slotEventOverlap: false,
            events: this.events,
            eventClick: function (event, jsEvent, view) {
                if (prevClickedEvent) {
                    prevClickedEvent.backgroundColor = defaultBackground;
                }
                event.backgroundColor = "#f4c9a0";
                prevClickedEvent = event;
                that.cal.fullCalendar('rerenderEvents');
                that.$emit('onEventClicked', event);
            }
        };

        this.cal.fullCalendar(args);
    },
    watch: {
        events(val) {
            return val;
        }
    }
});

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        dpName: "",
        value: "",
        disabled: false,
        dpformat: 'L'
    },
    data() {
        let dateFormat = this.dpformat === undefined ? 'L' : this.dpformat;
        return {
            dateFormat: dateFormat
        };
    },
    mounted() {
        let dtPicker = this.$refs.$dtPicker;
        $(dtPicker).datetimepicker({ format: this.dateFormat }).on('dp.change', e => {
            if (e.date) {
                this.onChange(e.date.format(this.dateFormat));
            } else {
                this.onChange(moment().format(this.dateFormat));
            }
        });
    },

    methods: {
        onChange(dtValue) {
            this.$emit('pick', dtValue);
        }
    },
    computed: {
        defaultValue() {
            if (moment(this.value).isValid()) {
                return moment(this.value).format(this.dateFormat);
            }
            return moment().format(this.dateFormat);
        }
    }
});

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        errorDisplay: false,
        errorText: ''
    }
});

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "grid",
    props: ['data', 'grid', 'lookups'],
    data() {

        let sortOrders = {};
        let sortKey = "";
        let that = this;

        this.grid.columns.forEach(key => {
            sortOrders[key.name] = 1;
            if (key.default !== undefined && key.default == true) {
                sortKey = key.name;
            }
        });

        return {
            sortKey: sortKey,
            editVisible: false,
            sortOrders: sortOrders

        };
    },
    mounted() {},
    computed: {
        filteredData() {
            let sortKey = this.sortKey;
            let data = this.data;

            let order = this.sortOrders[sortKey] || 1;
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }
            this.$emit('sorted', sortKey);

            return data;
        },
        actionButtons() {
            return this.grid.actions;
        }
    },
    methods: {
        sortBy: function (key) {
            if (key.static) return false;

            this.sortKey = key.name;
            this.sortOrders[key.name] = this.sortOrders[key.name] * -1;
        },
        render: function (entry, key) {

            //check pipe period_start|period_end
            let keypos = key.name.indexOf("|"),
                glue = key.glue || "-",
                value = "";

            if (keypos >= 0) {
                let names = key.name.split('|');
                for (var i = 0; i < names.length; i++) {
                    if (key.dtype == 'date') {
                        entry[names[i]] = moment(entry[names[i]]).format('L');
                    }
                    value += entry[names[i]] + glue;
                }
                value = value.substring(0, value.length - 1);
            } else {
                value = entry[key.name];

                if (key.dtype == 'date') {
                    value = moment(value).format('L');
                }
                if (key.dtype == 'currency') {
                    value = accounting.formatNumber(value) + " QR";
                }
            }

            return value;
        },
        actionTrigger: function (action, id) {
            this.$emit('action', action, id);
        },
        isArrowVisible(name) {
            return this.sortKey === name;
        },
        isIncludeEdit(key) {
            return key.editable && !key.static;
        },
        inputTypeIs(type) {
            return this.inputType == type;
        },
        enableEdit(e) {
            console.log(this.$refs[e]);
        }
    }
});

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            imageData: []
        };
    },
    methods: {
        previewImage(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                var $this = this;
                for (var i = 0; i < input.files.length; i++) {

                    var reader = new FileReader();
                    var file = input.files[i];
                    var data = {};

                    reader.onload = e => {
                        data.blob = e.target.result;
                        data.file = file;
                        $this.imageData.push(data);
                        this.$emit('dispatch', data);
                    };

                    reader.readAsDataURL(input.files[i]);
                }
            }
        }
    }
});

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_Info_vue__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_Info_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_Info_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: { InfoModal: __WEBPACK_IMPORTED_MODULE_0__home_Info_vue___default.a },
    props: ['logo', 'menus', 'title'],
    mounted() {

        let dropdowns = this.$refs.dropdown;
        $('.nb-dropdown-menu').hide();
        $(dropdowns).removeClass('active');
        $(dropdowns).on('click', function (e) {
            $('.nb-dropdown-menu').hide();
            $(dropdowns).parent().removeClass('active');
            let parent = $(this).parent();
            parent.addClass('active');
            parent.find('ul').show();
        });
    },
    methods: {
        openInfo() {
            __WEBPACK_IMPORTED_MODULE_1__eventbus__["a" /* EventBus */].$emit("openInfo");
        }
    }
});

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        slides: { required: true },
        path: '/villa/image'
    },
    data() {
        return {
            sliders: [],
            bullets: [],
            currentSlideNo: 0,
            selected: ""
        };
    },
    updated() {

        var that = this;
        var slideCount = this.slides.length;

        this.sliders = this.$refs.sliders;
        this.bullets = this.$refs.bullets;

        this.currentSlideNo = 0;
        var selectedSlide = this.sliders[this.currentSlideNo];

        //hide initial
        this.sliders.forEach(e => {
            $(e).hide();
        });

        //output
        $(selectedSlide).show();
        $(this.bullets[this.currentSlideNo]).addClass('active');
    },
    methods: {
        onSlide(i) {
            var that = this;
            var selectedSlide = this.sliders[i];
            var currentSlide = this.sliders[this.currentSlideNo];

            this.bullets.forEach(e => {
                $(e).removeClass('active');
            });

            $(currentSlide).fadeOut(500).promise().done(function () {
                $(selectedSlide).fadeIn(500);
                $(that.bullets[that.currentSlideNo]).addClass('active');
            });

            this.currentSlideNo = i;
        },
        fullImagePath(img) {
            if (this.path === undefined) {
                this.path = 'villa/image';
            }
            return window.Laravel.baseUrl + "/" + this.path + "/" + img;
        }
    },
    computed: {}

});

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["chartId"],
  beforeMount() {},
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])("accountCharts", {
    account: state => state.account
  }))

});

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({

    data() {
        return {
            gridView: {
                columns: [{ name: 'bill_no', column: 'Bill No', class: 'text-center', filter: true }, { name: 'full_location', column: 'Property', class: 'text-center', filter: true }, { name: 'villa_no', column: 'Villa No', class: 'text-center', style: "width:10%", filter: true }, { name: 'contract_no', column: 'Contract No', class: 'text-center', filter: true }, { name: 'full_name', column: 'Name' }, { name: 'period', column: 'Period', class: 'text-center' }, { name: 'total_payment', column: 'Total Payment', class: 'text-right' }, { name: 'total_balance', column: 'Total Balance', class: 'text-right' }, { name: '$action', column: '', static: true, class: 'text-center' }],
                actions: [{ key: 'update', name: 'Update' }],
                source: {
                    url: 'api/bill/list'
                }
            }
        };
    },

    methods: {
        redirectToUpdatePayment(billNo) {
            axiosRequest.redirect("bill", "edit", billNo);
        },
        doAction(a, item, index) {

            this.redirectToUpdatePayment(item.bill_no);
        }
    }
});

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PaymentModal_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PaymentModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__PaymentModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContractInfo_vue__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContractInfo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ContractInfo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TotalPayment_vue__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TotalPayment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__TotalPayment_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__eventbus__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










const confirmation = {
    removePayment: cb => {
        bbox.confirm({
            title: "Remove Payment",
            message: "Are you sure want to remove item?",
            callback: result => {
                cb(result);
            }
        });
    },
    prepareCheque: cb => {
        bbox.confirm({
            title: "Cheque Preparation",
            message: "Do you want to instantly prepare 12 cheques?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    },
    clearPayment: cb => {
        bbox.confirm({
            title: "Clear payments",
            message: "Do you want to all clear payments?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

const createGridColumn = value => {
    function columnFactory(value) {
        let grid = {};
        switch (value) {
            case 0:
                grid.columns = [{ name: 'effectivity_date', column: 'Date', style: 'width:10%', class: 'text-center', dtype: 'date' }, { name: 'payment_no', column: 'Payment No', style: 'width:10%', class: 'text-center' }, { name: 'reference_no', column: 'Reference No', style: "width:10%", class: "text-center" }, { name: 'full_bank', column: 'Bank' }, { name: 'full_payment_mode', column: 'Payment Mode', class: 'text-center' }, { name: 'full_payment_type', column: 'Payment Type', class: 'text-center' }, { name: 'period', column: 'Period', class: 'text-center', dtype: 'period', from: 'period_start', to: 'period_end' }, { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right', dtype: 'currency' }, { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center' }, { name: '$action', column: '', static: true }];

                grid.actions = [{ key: 'edit', name: 'Edit' }, { key: 'remove', name: 'Remove' }];
                break;
            default:
                grid.columns = [{ name: 'effectivity_date', column: 'Date', style: 'width:10%', class: 'text-center', dtype: 'date' }, { name: 'payment_no', column: 'Payment No', style: 'width:10%', class: 'text-center' }, { name: 'reference_no', column: 'Reference No', style: "width:10%", class: "text-center" }, { name: 'full_bank', column: 'Bank' }, { name: 'full_payment_mode', column: 'Payment Mode', class: 'text-center' }, { name: 'full_payment_type', column: 'Payment Type', class: 'text-center' }, { name: 'period_start|period_end', column: 'Period', class: 'text-center', dtype: 'date' }, { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right' }, { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center' }];
                break;
        }

        grid.footers = [{ span: 9 }, { span: 3, label: "Total Amount", slot: true }];
        grid.selected = -1;

        return grid;
    }

    return columnFactory(value);
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'billForm',
    props: ['instanceContract', 'instance', 'instanceLookups'],
    components: {
        "contractInfo": __WEBPACK_IMPORTED_MODULE_1__ContractInfo_vue___default.a,
        "paymentModal": __WEBPACK_IMPORTED_MODULE_0__PaymentModal_vue___default.a,
        "totalPayment": __WEBPACK_IMPORTED_MODULE_2__TotalPayment_vue___default.a
    },
    data() {

        let colType = 0;

        if (this.instance.bill_no !== '') {
            colType = 1;
        }

        const gridColumn = createGridColumn(colType);

        return {
            gridColumn: gridColumn,
            unfoldModal: false,
            unfoldChequeModal: false,
            isSaved: false
        };
    },
    mounted() {
        this.$store.dispatch('bills/create', {
            bill: this.instance,
            contract: this.instanceContract,
            lookups: this.instanceLookups
        });
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_vuex__["c" /* mapGetters */])('bills', {
        contract: 'contract',
        bill: 'bill',
        totalPayment: 'totalPayment',
        viewIcon: 'viewIcon',
        payments: 'payments',
        option: 'option'
    })),
    methods: {
        clearPayment() {
            confirmation.clearPayment(result => {
                if (result) this.$store.commit('bills/clearPayment');
                this.gridColumn.selected = -1;
            });
        },
        addPayment() {
            this.gridColumn.selected = -1; //clear payment grid selection
            __WEBPACK_IMPORTED_MODULE_4__eventbus__["a" /* EventBus */].$emit("payment.register.open", "createInstance");
        },
        onAction(a, item, index) {
            const that = this;
            if (a === 'remove') {
                confirmation.removePayment(result => {
                    if (result) {
                        that.$store.commit('bills/removePayment', item.id);
                    }
                });
            } else {
                this.gridColumn.selected = index;
                __WEBPACK_IMPORTED_MODULE_4__eventbus__["a" /* EventBus */].$emit("payment.register.open", "edit", item);
            }
        },
        save() {
            this.$store.dispatch('bills/save');
        },
        print() {
            this.$store.commit('bills/redirectToPrint');
        }
    }
});

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TotalPayment_vue__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TotalPayment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TotalPayment_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PaymentModal_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PaymentModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__PaymentModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PaymentInfoModal_vue__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PaymentInfoModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__PaymentInfoModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ReplaceModal_vue__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ReplaceModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ReplaceModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SearchBill_vue__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SearchBill_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__SearchBill_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DepositModal_vue__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DepositModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__DepositModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__eventbus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











const createGridColumn = function (value) {
    function columnFactory(value) {
        let grid = {};
        switch (value) {
            case 'received':
                {
                    grid.columns = [{ name: 'effectivity_date', column: 'Date', style: 'width:10%', class: 'text-center', default: true, format: 'date' }, { name: 'payment_no', column: 'C/P No.', style: 'width:10%', class: 'text-center' }, { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right' }, { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center' }, { name: 'bank_account', column: 'Accounts', class: 'text-center' }, { name: 'date_deposited', column: 'Date Deposit', class: 'text-center' }, { name: 'remarks', column: 'Remarks', style: 'width:20%', class: 'text-center' }, { name: '', column: 'Action', style: 'width:10%', class: 'text-center', actionable: true }];
                    break;
                }
            case 'bounce':
                {
                    grid.columns = [{
                        name: 'effectivity_date',
                        column: 'Date',
                        style: 'width:10%',
                        class: 'text-center',
                        default: true,
                        format: 'date'
                    }, {
                        name: 'payment_no',
                        column: 'C/P No.',
                        style: 'width:10%',
                        class: 'text-center',
                        editable: true
                    }, { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right', editable: true }, { name: 'status', column: 'Status', style: "width:10%", class: 'text-center', custom: true }, { name: 'bank_account', column: 'Accounts', class: 'text-center' }, { name: 'date_deposited', column: 'Bounce Date', class: 'text-center', format: 'date' }, { name: 'remarks', column: 'Remarks', style: 'width:20%', class: 'text-center' }];
                    break;
                }
            default:
                grid.columns = [{
                    name: 'effectivity_date',
                    column: 'Date',
                    style: 'width:10%',
                    class: 'text-center',
                    default: true,
                    format: 'date'
                }, {
                    name: 'payment_no',
                    column: 'C/P No.',
                    style: 'width:10%',
                    class: 'text-center',
                    editable: false
                }, {
                    name: 'amount',
                    column: 'Amount',
                    style: "width:10%",
                    class: 'text-right',
                    editable: false,
                    format: 'currency'
                }, { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center' }, { name: 'bank_account', column: 'Accounts', class: 'text-center' }, { name: 'date_deposited', column: 'Date Deposit', class: 'text-center', format: 'date' }, { name: 'remarks', column: 'Remarks', style: 'width:20%', class: 'text-center' }];
        }
        return grid;
    }

    return columnFactory(value);
};

const confirmation = {
    updatePayment: cb => {
        bbox.confirm({
            title: "Update Payment",
            message: "Do you want to update payment?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({

    props: ["billNo"],
    components: {
        TotalPayment: __WEBPACK_IMPORTED_MODULE_0__TotalPayment_vue___default.a,
        PaymentModal: __WEBPACK_IMPORTED_MODULE_1__PaymentModal_vue___default.a,
        SearchBill: __WEBPACK_IMPORTED_MODULE_4__SearchBill_vue___default.a,
        ReplaceModal: __WEBPACK_IMPORTED_MODULE_3__ReplaceModal_vue___default.a,
        PaymentInfoModal: __WEBPACK_IMPORTED_MODULE_2__PaymentInfoModal_vue___default.a,
        DepositModal: __WEBPACK_IMPORTED_MODULE_5__DepositModal_vue___default.a
    },
    data() {
        let gridColumn = createGridColumn();
        return {
            searchToggle: false,
            gridColumn: gridColumn,
            unfoldModal: false,
            unfoldReplacementModal: false,
            paymentStatus: ''
        };
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_vuex__["c" /* mapGetters */])('payments', {
        contract: 'contract',
        bill: 'bill',
        filtered: 'filtered',
        totalPayment: 'totalPayment',
        cloneOfInstance: 'cloneOfInstance',
        footerAmount: 'footerAmount',
        options: 'options',
        lookups: 'lookups',
        isPaymentStatusReplace: 'isPaymentStatusReplace'
    })),
    mounted() {
        if (this.billNo) {
            this.$store.state.payments.bill.bill_no = this.billNo;
            this.openSearchModal(false);
        }
    },
    methods: {
        openSearchModal(openToggle) {
            if (openToggle) {
                __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit('openSearchBillDialog');
            } else {
                this.$store.dispatch('payments/edit');
            }
        },
        openPaymentInfoModal() {
            __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit("payment.info.open");
        },
        printBill() {
            this.$store.commit('payments/redirectToPrint');
        },
        save() {
            confirmation.updatePayment(result => {
                if (result) {
                    this.$store.dispatch('payments/update', {
                        done: r => {
                            this.$store.dispatch('payments/edit');
                        }
                    });
                }
            });
        },
        onDismissal(result) {
            this.$store.commit('payments/addNew');
            __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit("closeReplaceModal");
        },
        onSelect(billNo) {
            this.$store.state.payments.bill.bill_no = billNo;
            this.$store.dispatch('payments/edit');
            this.searchToggle = false;
        },
        getBank(account_no) {
            const bank = _.find(this.lookups.bank_accounts, item => {
                return item.account_no === account_no;
            });

            return bank !== undefined ? bank.bank_name : '';
        },
        onChange(id) {
            this.$store.commit('payments/updateDeposit', { id });
        },
        openReplaceModal() {
            this.$store.commit('payments/calculateReplace', () => __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit('openReplaceModal'));
        },
        get(ob) {
            console.log(ob);
        },
        actionTrigger(action, value) {
            if (action === 'info') {
                __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit('payment.info.open', value);
            } else if (action == 'edit') {
                __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit('payment.register.open', "edit", value);
            } else if (action == 'deposit') {
                __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit("payment.deposit.open", value);
            } else if (action == 'replacement') {
                __WEBPACK_IMPORTED_MODULE_6__eventbus__["a" /* EventBus */].$emit("payment.replace.open", value);
            } else {}
        }
    },
    watch: {
        filtered(nv) {
            this.gridColumn = createGridColumn(this.options.currentTabIndex);
        },
        selectedTab(nv) {
            this.options.currentTabIndex;
        }
    }
});

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        contractData: {}
    },
    computed: {
        contract() {
            return this.contractData;
        }
    }
});

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventbus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: "depositModal",
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins__["a" /* toggleModal */]],
    data() {
        return {
            data: {}
        };
    },
    beforeMount() {
        __WEBPACK_IMPORTED_MODULE_1__eventbus__["a" /* EventBus */].$on("payment.deposit.open", item => {
            this.$store.commit("payments/edit", {
                payment: item
            });

            if (this.cloneOfInstance.date_deposited == "0000-00-00") {
                this.cloneOfInstance.date_deposited = moment().format('L');
            }

            this.openDialog();
        });
    },
    computed: {
        lookups() {
            return this.$store.getters["payments/lookups"] || [];
        },
        cloneOfInstance() {
            return this.$store.getters["payments/cloneOfInstance"] || {};
        },
        bankDeposited() {
            return this.$store.getters["payments/bankDeposited"] || "";
        }
    },
    methods: {
        save() {

            this.cloneOfInstance.status = "clear";
            this.cloneOfInstance.full_status = "Clear";
            this.$store.commit("payments/store", {
                trigger: "edit",
                cb: res => {
                    if (res) this.closeDialog();
                }
            });
        }
    }
});

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins__ = __webpack_require__(8);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: "paymentInfo",
    data() {
        return {
            data: {},
            itemIndex: 0
        };
    },
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins__["a" /* toggleModal */]],
    beforeMount() {
        __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$on("payment.info.open", item => {
            this.data = item;
            this.openDialog();
        });
    }
});

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    props: ["namespace"],
    components: {
        'error': __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue___default.a
    },
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins__["a" /* toggleModal */]],
    data() {
        return {
            action: ""
        };
    },
    beforeMount() {
        __WEBPACK_IMPORTED_MODULE_3__eventbus__["a" /* EventBus */].$on("payment.register.open", (action, payment) => {
            this.action = action;
            this.$store.commit(this.namespace + "/" + action, { payment: payment });
            this.openDialog();

            /************************************************/
            //watch payment type
            /***********************************************/
            this.$store.watch(state => state[this.namespace].cloneOfInstance.payment_type, value => {
                this.$store.commit(this.namespace + '/convertPayment', { source: 'payment_term', needle: 'payment_type', target: 'full_payment_type' });
                if (value.toLowerCase() === "cash") this.$store.state[this.namespace].cloneOfInstance.payment_no = "Cash";else this.$store.state[this.namespace].cloneOfInstance.payment_no = '';
            });

            this.$store.watch(state => state[this.namespace].cloneOfInstance.payment_mode, value => this.$store.commit(this.namespace + '/convertPayment', { source: 'payment_mode', needle: 'payment_mode', target: 'full_payment_mode' }));
            this.$store.watch(state => state[this.namespace].cloneOfInstance.bank, value => this.$store.commit(this.namespace + '/convertPayment', { source: 'bank', needle: 'bank', target: 'full_bank' }));
            //*******************************************************************/
        });
    },
    methods: {
        onModalDismiss() {
            this.$store.commit(this.namespace + "/store", {
                trigger: this.action,
                cb: res => {
                    if (res) this.closeDialog();
                }
            });
        }
    },
    computed: {
        cloneOfInstance() {
            return this.$store.getters[this.namespace + "/cloneOfInstance"] || {};
        },
        lookups() {
            return this.$store.getters[this.namespace + "/lookups"] || [];
        }
    },
    watch: {
        toggle(nv) {
            if (nv) {
                __WEBPACK_IMPORTED_MODULE_3__eventbus__["a" /* EventBus */].$emit("payment.register.opening");
            } else {
                __WEBPACK_IMPORTED_MODULE_3__eventbus__["a" /* EventBus */].$emit("payment.register.closing");
            }
        }
    }
});

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DateTimePicker_vue__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DateTimePicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__DateTimePicker_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventbus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins__ = __webpack_require__(8);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        'dtpicker': __WEBPACK_IMPORTED_MODULE_0__DateTimePicker_vue___default.a
    },

    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins__["a" /* toggleModal */]],

    data() {
        return {
            item: {}
        };
    },
    mounted() {
        __WEBPACK_IMPORTED_MODULE_1__eventbus__["a" /* EventBus */].$on("payment.replace.open", item => {
            this.item = item;
            //clone must be new
            this.$store.commit("payments/edit", { payment: item });
            this.openDialog();

            /************************************************/
            //watch payment type
            /***********************************************/
            this.$store.watch(state => state["payments"].cloneOfInstance.payment_type, value => {
                this.$store.commit('payments/convertPayment', { source: 'payment_term', needle: 'payment_type', target: 'full_payment_type' });
                if (value.toLowerCase() === "cash") this.$store.state["payments"].cloneOfInstance.payment_no = "Cash";else this.$store.state["payments"].cloneOfInstance.payment_no = '';
            });

            this.$store.watch(state => state["payments"].cloneOfInstance.payment_mode, value => this.$store.commit('payments/convertPayment', { source: 'payment_mode', needle: 'payment_mode', target: 'full_payment_mode' }));
            this.$store.watch(state => state["payments"].cloneOfInstance.bank, value => this.$store.commit('payments/convertPayment', { source: 'bank', needle: 'bank', target: 'full_bank' }));
            //*******************************************************************/
        });

        __WEBPACK_IMPORTED_MODULE_1__eventbus__["a" /* EventBus */].$on("payment.replace.close", () => this.closeDialog());
    },
    methods: {
        save() {

            this.$store.commit("payments/replace", {
                item: this.item,
                cb: res => {
                    if (res) {
                        this.closeDialog();
                    }
                }
            });
        }
    },
    computed: {
        lookups() {
            return this.$store.getters["payments/lookups"] || [];
        },
        cloneOfInstance() {
            return this.$store.getters["payments/cloneOfInstance"] || {};
        }
    }
});

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            searchToggle: false
        };
    },
    methods: {
        onSearch() {
            this.$store.dispatch('payments/search');
        },
        select(billNo) {
            this.searchToggle = false;
            this.$emit("select", billNo);
        },
        onDismiss(result) {
            this.$emit("cancel");
        }
    },
    mounted() {
        __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$on("openSearchBillDialog", () => this.searchToggle = true);
    },
    computed: {
        search() {
            return this.$store.getters['payments/search'] || {};
        }
    },
    watch: {
        searchToggle(val) {
            if (val) {
                this.$store.commit('payments/clearPayment');
            }
        }
    }
});

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['payment'],
    computed: {
        totalPayment() {
            return this.payment.total_payment !== undefined ? this.payment.total_payment : 0;
        },
        totalCost() {
            return this.payment.total_cost !== undefined ? this.payment.total_cost : 0;
        },
        balance() {
            return this.totalCost - this.totalPayment;
        }
    }
});

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Calendar_vue__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Calendar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Calendar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Renewal_vue__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Renewal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Renewal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ContractListModel__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ContractTerminate_vue__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ContractTerminate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ContractTerminate_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









const confirmation = {
    renew: cb => {
        bbox.confirm({
            title: "Contract renewal confirmation",
            message: "Do you want to renew the contract?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    },
    terminated: (value, cb) => {
        bbox.confirm({
            message: 'Do you want to terminate the contract no ' + value,
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CalendarEntry",
    components: {
        "calendar": __WEBPACK_IMPORTED_MODULE_0__Calendar_vue___default.a,
        "renewal": __WEBPACK_IMPORTED_MODULE_1__Renewal_vue___default.a,
        "terminateDialog": __WEBPACK_IMPORTED_MODULE_3__ContractTerminate_vue___default.a
    },
    data() {
        return {
            viewModel: new __WEBPACK_IMPORTED_MODULE_2__ContractListModel__["a" /* ContractRenewModel */](),
            isOpenModal: false,
            dueRoot: {
                selected: "",
                dues: [{ text: "Current Year", value: "cy" }, { text: "Last Year", value: "ly" }, { text: "Last 5 Years", value: "l5y" }]
            },
            events: {
                url: "/api/contract/calendar"
            },
            event: {
                contract: {
                    tenant: {},
                    villa: {}
                },
                period: {}
            }
        };
    },
    methods: {
        onEventClicked(event) {
            this.event = event;
        },
        onRenewClicked(id) {
            confirmation.renew(result => {
                if (result) {
                    setTimeout(function () {
                        __WEBPACK_IMPORTED_MODULE_4__eventbus__["a" /* EventBus */].$emit("contracts.renewal.open", id);
                    }, 500);
                }
            });
        },
        onTerminateClicked(value) {
            confirmation.terminated(value.contract_no, isOpenDialog => {
                if (isOpenDialog) {
                    setTimeout(function () {
                        __WEBPACK_IMPORTED_MODULE_4__eventbus__["a" /* EventBus */].$emit("contracts.terminate.open", value);

                        __WEBPACK_IMPORTED_MODULE_4__eventbus__["a" /* EventBus */].$on("contracts.terminate.close", isClose => {
                            if (isClose) axiosRequest.redirect('contract', 'calendar');
                        });
                    }, 500);
                }
            });
        },
        onDismiss(result) {
            if (result) {
                this.viewModel.save(id => {
                    this.isOpenModal = true;
                    this.viewModel.redirectToBill(id);
                });
            } else {
                this.isOpenModal = false;
            }
        }
    }
});

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ContractEntry",
    data() {
        return {
            rate_per_month: 0
        };
    },
    methods: {
        calc(direct = false) {
            if (direct) this.$store.dispatch('contracts/recalc', { rate: 0 });else this.$store.dispatch('contracts/recalc', { rate: this.rate_per_month });
        }
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])('contracts', {
        contract: 'contract',
        lookups: 'lookups',
        errors: 'stateContractError',
        selectedVilla: 'selectedVilla'
    }))
});

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContractTerminate_vue__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContractTerminate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ContractTerminate_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eventbus__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








const confirmation = {
    cancel: cb => {
        bbox.confirm({
            title: "Contract cancel confirmation",
            message: "Do you want to cancel the contract?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                if (result) {
                    cb();
                }
            }
        });
    },
    terminated: (value, cb) => {
        bbox.confirm({
            message: 'Do you want to terminate the contract no ' + value,
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "list",
    data() {
        return {
            gridView: {
                columns: [{ name: 'created_at', column: 'Date', default: true, class: 'text-center' }, { name: 'contract_no', column: 'Contract No', class: 'text-center', filter: true }, { name: 'villa_no', column: 'Villa No', class: 'text-center', filter: true }, { name: 'full_name', column: 'Tenant', class: 'text-left', filter: true }, { name: 'period', column: 'Period', class: 'text-center' }, { name: 'amount', column: 'Amount', class: 'text-right', filter: true }, { name: 'status', column: 'Status', class: 'text-center' }, { name: '$action', column: '', static: true, class: 'text-center' }],
                actions: [{ key: 'create', name: 'Create Bill' }, { key: 'cancelled', name: 'Cancel' }],
                source: {
                    url: '/api/contract/list',
                    params: { status: '' }
                }
            },
            initValue: {},
            terminateModalState: false
        };
    },
    components: {
        'error': __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue___default.a,
        'terminateDialog': __WEBPACK_IMPORTED_MODULE_1__ContractTerminate_vue___default.a
    },
    methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapMutations */])("contracts", ["setContractForTerminate"]), {
        create() {
            this.$store.commit('contracts/redirectToRegister');
        },
        doAction(a, item, index) {
            if (a.key == 'create') {
                this.$store.commit('contracts/createBill', item.contract_no);
            } else if (a.key == 'cancelled') {
                confirmation.cancel(result => {
                    this.$store.dispatch('contracts/cancel', {
                        contractId: item.id,
                        cbError: errMessage => {
                            toastr.errors(errMessage);
                        },
                        done: r => {
                            __WEBPACK_IMPORTED_MODULE_3__eventbus__["a" /* EventBus */].$emit("onLiveViewFetch");
                        }
                    });
                });
            } else if (a.key == 'terminated') {
                confirmation.terminated(item.contract_no, isOpenDialog => {
                    if (isOpenDialog) {
                        setTimeout(function () {
                            __WEBPACK_IMPORTED_MODULE_3__eventbus__["a" /* EventBus */].$emit("contracts.terminate.open", item);
                            __WEBPACK_IMPORTED_MODULE_3__eventbus__["a" /* EventBus */].$on("contracts.terminate.close", isClose => {
                                if (isClose) axiosRequest.redirect("contract", "");
                            });
                        }, 500);
                    }
                });
            } else if (a.key == 'view') {
                this.$store.commit('contracts/redirectToRead', item.bill_no);
            }
        }
    }),
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])('contracts', {
        contracts: 'contracts',
        status: 'status',
        contractForTerminate: 'contractForTerminate'
    })),
    watch: {
        status(nv) {
            //dynamic
            if (nv === 'pending') {
                this.gridView.actions = [{ key: 'create', name: 'Create Bill' }, { key: 'cancelled', name: 'Cancel' }];
            } else {
                this.gridView.actions = [{ key: 'view', name: 'View PDF' }, { key: 'terminated', name: 'Terminate' }];
            }

            this.gridView.source.params.status = nv;
            __WEBPACK_IMPORTED_MODULE_3__eventbus__["a" /* EventBus */].$emit("onLiveViewFetch");
        }
    }

});

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TenantRegister_vue__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TenantRegister_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TenantRegister_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContractVilla_vue__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContractVilla_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ContractVilla_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ContractEntry_vue__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ContractEntry_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ContractEntry_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






const confirmation = {
    contractSave: cb => {
        bbox.confirm({
            title: "Create Contract",
            message: "Do you want to create contract? Note: Please review your detail before saving..",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Register",
    components: {
        'tenantRegister': __WEBPACK_IMPORTED_MODULE_0__TenantRegister_vue___default.a,
        'contractVilla': __WEBPACK_IMPORTED_MODULE_1__ContractVilla_vue___default.a,
        'contractEntry': __WEBPACK_IMPORTED_MODULE_2__ContractEntry_vue___default.a
    },
    mounted() {
        this.$store.dispatch('contracts/create');
    },
    methods: {
        save() {
            confirmation.contractSave(result => {
                if (result) {
                    this.$store.dispatch('contracts/save');
                }
            });
        }
    },
    computed: {
        errors() {
            return this.$store.getters['contracts/stateContractError'];
        }
    }
});

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventbus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins__["a" /* toggleModal */]],
    data() {
        return {
            validations: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]()
        };
    },
    beforeMount() {
        __WEBPACK_IMPORTED_MODULE_2__eventbus__["a" /* EventBus */].$on("contracts.terminate.open", value => {
            this.$store.commit("contracts/setContractForTerminate", value);
            this.openDialog();
        });
    },
    methods: {
        save(result) {
            const onResult = {
                success: result => {
                    toastr.success("contract successfully terminated");
                    this.closeDialog();
                    __WEBPACK_IMPORTED_MODULE_2__eventbus__["a" /* EventBus */].$emit("contracts.terminate.close", true);
                }
            };

            this.$store.dispatch("contracts/terminate", onResult);
        }
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* mapGetters */])('contracts', {
        contractForTerminate: 'contractForTerminate'
    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapState */])('contracts', {
        errors: state => state.errors.terminateError
    }))
});

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Slider_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ErrorLabel_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ErrorLabel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ErrorLabel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: "villa",
    components: { 'slider': __WEBPACK_IMPORTED_MODULE_0__Slider_vue___default.a, 'error': __WEBPACK_IMPORTED_MODULE_1__ErrorLabel_vue___default.a },
    methods: {
        selected: function () {
            this.$store.dispatch('contracts/recalc');
        }
    },
    mounted() {},
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])('contracts', {
        villas: 'villas',
        contract: 'contract',
        stateContractError: 'stateContractError',
        lookups: 'lookups',
        selectedVilla: "selectedVilla"
    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapState */])('contracts', {
        filter: state => state.filter
    }), {
        fullVilla() {
            return;
        }
    })

});

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    props: ["viewModel"],
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins__["a" /* toggleModal */]],
    beforeMount() {
        __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$on("contracts.renewal.open", contract_id => {
            this.$store.dispatch("contracts/renew", {
                id: contract_id,
                cb: () => this.openDialog()
            });
        });
    },
    data() {
        return {
            rate_per_month: 0
        };
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapState */])("contracts", {
        contract: state => state.contract
    }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])("contracts", {
        stateRenewError: "stateRenewError",
        lookups: "lookups"
    })),
    methods: {
        save() {
            this.$store.dispatch("contracts/update");
        },
        calc() {
            this.$store.dispatch('contracts/recalc', { rate: this.rate_per_month });
        }
    }
});

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


//import widget




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "TenantRegister",
    components: {
        'error': __WEBPACK_IMPORTED_MODULE_0__ErrorLabel_vue___default.a
    },
    methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["d" /* mapActions */])('contracts', ['searchTenant'])),
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* mapGetters */])('contracts', {
        tenant: 'tenant',
        lookups: 'lookups',
        labels: 'labels',
        showGender: 'showGender',
        stateContractError: 'stateContractError'
    }))
});

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            gridView: {
                columns: [{ name: 'payment_date', column: 'Payment Date', class: 'text-center', dtype: 'date' }, { name: 'location', column: 'Villa Location', class: 'text-center' }, { name: 'villa', column: 'Villa No', class: 'text-center' }, { name: 'expense_type', column: 'Expense Type', class: 'text-center' }, { name: 'payee', column: 'Paid To', class: 'text-center' }, { name: 'amount', column: 'Amount', class: 'text-center' }],
                source: {
                    url: 'api/expenses'
                }
            }
        };
    }
});

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__payee_Register_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__payee_Register_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__payee_Register_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const confirmation = {
    ExpensesSave: cb => {
        bbox.confirm({
            title: "Create Expenses",
            message: "Do you want to create expenses?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({

    mounted() {
        if (this.index !== '') {
            this.$store.dispatch('expenditures/edit', { id: this.index });
        } else {
            this.$store.dispatch('expenditures/create');
        }
    },
    props: ['index'],
    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])('expenditures', {
        expense: 'expense',
        lookups: 'lookups',
        filtered_villas: 'filtered_villas',
        errors: 'errors',
        payee: 'payee',
        payeeTypes: 'payeeTypes',
        options: 'options'
    }),
    components: {
        payeeRegister: __WEBPACK_IMPORTED_MODULE_1__payee_Register_vue___default.a
    },
    methods: {
        save() {
            confirmation.ExpensesSave(result => {
                if (result) {
                    this.$store.dispatch('expenditures/save');
                }
            });
        },
        createpayee() {
            if (!this.options.isPayeeCreated) {
                //this.$store.dispatch('expenditure/createPayee')
            }
            this.unfold = true;
        },
        dismiss(result) {
            if (result) {
                __WEBPACK_IMPORTED_MODULE_2__eventbus__["a" /* EventBus */].$emit("onSavePayee", r => {
                    this.lookups.payees = r;
                });
            }
            this.unfold = false;
        }
    },
    data() {
        return {
            unfold: false
        };
    }

});

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "infoModal",
    data() {
        return {
            toggle: false,
            easterEgg: false,
            info: {
                devteam: {
                    head: {},
                    dev: {}
                }
            }
        };
    },
    mounted() {
        __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$on("openInfo", () => this.toggle = true);
    },
    methods: {
        fetchData() {
            axios.get("/api/about").then(r => {

                this.info = r.data;
            });
        }
    },
    watch: {
        toggle(nv) {
            if (nv && this.info.ver === undefined) {
                this.fetchData();
            }
        }
    }
});

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            gridView: {
                columns: [{ name: 'name', column: 'Name', filter: true }, { name: 'full_address', column: 'Address' }, { name: 'contact_no', column: 'Contact No', filter: true }, { name: 'fax_no', column: 'Fax No' }],
                source: {
                    url: 'api/payee/list'
                }
            }
        };
    },
    methods: {
        onAddPayee() {
            axiosRequest.redirect('payee', 'create');
        }
    }

});

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const confirmation = {
    PayeeSave: cb => {
        bbox.confirm({
            title: "Create Payee",
            message: "Do you want to create Payee?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted() {
        __WEBPACK_IMPORTED_MODULE_1__eventbus__["a" /* EventBus */].$on("onSavePayee", response => {
            this.save(response);
        });
        this.$store.dispatch('payees/create');
    },
    props: ['type'],
    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])('payees', {
        payee: 'payee',
        payeeTypes: 'payeeTypes',
        errors: 'errors'
    }),
    methods: {
        save() {
            confirmation.PayeeSave(result => {
                if (result) {
                    this.$store.dispatch('payees/save');
                }
            });
        }
    }

});

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



const func = {
    'autoDate': (models, actions, value) => {
        models[actions.bind_from] = moment().startOf('year').month(value - 1).format("MM/DD/YY");
        models[actions.bind_to] = moment().startOf('year').month(value).subtract(1, 'days').format("MM/DD/YY");
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ["params"],
    data() {
        return {
            selected: {
                report_name: '',
                params: {}
            },
            report_title: ''
        };
    },
    methods: {

        onNotify(response) {
            this.report_title = response.report_title;

            const params = this.params.params.find(item => {
                return item.report_id === response.id;
            });
            console.log(response);

            if (params !== undefined) {
                if (params.lookups !== undefined && params.lookups.length === 0) {
                    axiosRequest.get("reports", "lookups", response.report_name).then(r => params.lookups = r.data);
                }
                this.selected.params = params;
            } else {
                this.selected.params = {};
            }
            this.selected.report_name = response.report_name;
        },
        onChange(input, value) {
            if (input.actions) {
                func[input.actions.func](this.selected.params.models, input.actions, value);
            }
        },
        onViewReportClick() {
            this.$emit("viewReportClick", this.selected);
        },
        isEmpty(value) {
            return _.isEmpty(value);
        },
        getLookupValue(value) {
            return value || "code";
        },
        getLookupText(value) {
            return value || "name";
        }
    },
    mounted() {
        __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$on("onReportSelected", response => this.onNotify(response));
    }

});

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReportForm_vue__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReportForm_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ReportForm_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: { ReportForm: __WEBPACK_IMPORTED_MODULE_0__ReportForm_vue___default.a },
    props: ['list', 'params'],
    name: "reportList",
    methods: {
        viewReport(selected) {
            if (selected.report_name) {
                let query = '';
                if (selected.params) {
                    const report = selected.params;
                    if (report.models) {
                        query = "?" + $.param(report.models);
                    }
                }

                var url = window.Laravel.baseUrl + "/reports/" + selected.report_name + query;
                window.open(url, "_blank");
            }
        },
        onReportClick(value) {
            __WEBPACK_IMPORTED_MODULE_1__eventbus__["a" /* EventBus */].$emit("onReportSelected", value);
        }
    },
    data() {
        return {
            columns: [{ name: 'report_title', column: 'Report Name' }, { name: '$parameters', column: 'Parameters', style: "width:40%" }, { name: '$action', column: '', static: true, class: 'text-center', style: 'width:5%' }],
            reports: [],
            selected: {
                report_name: '',
                params: []
            }
        };
    },
    computed: {
        reportList() {
            return this.list;
        }
    }
});

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            gridView: {
                columns: [{ name: 'full_name', column: 'Name', filter: true }, { name: 'reg_id', column: 'Qatar / CR ID', filter: true }, { name: 'email_address', column: 'Email Address' }, { name: 'mobile_no', column: 'Mobile No' }, { name: '$action', column: '', static: true, class: 'text-center' }],
                actions: [{ key: 'edit', name: 'Edit' }],
                source: {
                    url: 'api/tenant/list'
                }
            }
        };
    },
    methods: {
        doAction(a, item, index) {
            console.log(item);
            this.$store.commit('tenants/toEdit', item.id);
        },
        create() {
            this.$store.commit('tenants/toCreate');
        }
    }
});

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



const confirmation = {
    TenantSave: cb => {
        bbox.confirm({
            title: "Update Tenant",
            message: "Do you want to update Tenant?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: result => {
                cb(result);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['model'],
    mounted() {
        this.$store.commit('tenants/fetchData', { tenant: this.model.tenant, lookups: this.model.lookups });
    },
    methods: {
        save() {
            confirmation.TenantSave(result => {
                if (result) {
                    this.$store.dispatch('tenants/save');
                }
            });
        }
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])('tenants', {
        tenant: 'tenant',
        lookups: 'lookups',
        labels: 'labels',
        showGender: 'showGender'
    }))

});

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'list',
    data() {
        return {
            filterKey: "",
            filterFields: [{ name: 'villa_no', text: 'Villa No' }, { name: 'location', text: 'Location' }, { name: 'villa_class', text: 'Class' }, { name: 'rate_per_month', text: 'Rate/Month' }, { name: 'status', text: 'Status' }],
            gridView: {
                columns: [{ name: 'villa_no', column: 'Villa No', style: 'width:10%', class: 'text-center', filter: true }, { name: 'full_location', column: 'Location', filter: true }, { name: 'electricity_no', column: 'Electricity No', class: 'text-center' }, { name: 'water_no', column: 'Water No', class: 'text-center' }, { name: 'qtel_no', column: 'QTel No', class: 'text-center' }, { name: 'full_villa_class', column: 'Class', class: 'text-center' }, { name: 'rate_per_month', column: 'Rate/Month', class: 'text-right', dtype: 'currency' }, { name: 'full_status', column: 'Status', class: 'text-center', style: 'width:10%', filter: true }, { name: '$switch', column: 'Active', bind: 'is_active', disabled: 'is_disabled' }, { name: '$action', column: '', static: true, class: 'text-center' }],
                source: {
                    url: '/api/api_villa/list',
                    pointer: 'villas'
                },
                actions: [{ key: 'edit', name: 'Edit' }, { key: 'remove', name: 'Remove' }]
            }
        };
    },
    mounted() {},
    methods: {
        doAction(a, item, index) {
            if (a.key == 'edit') {
                this.$store.commit('villas/redirectToRegister', item.id);
            }
        },
        addNew() {
            this.$store.commit('villas/redirectToRegister', 0);
        }
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])('liveviews', {
        cache: 'cache'
    }))
});

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ImageUpload_vue__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ImageUpload_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ImageUpload_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GridView_vue__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GridView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__GridView_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Slider_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Slider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Slider_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorLabel_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorLabel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorLabel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['villaId'],
    components: {
        'imageUpload': __WEBPACK_IMPORTED_MODULE_0__ImageUpload_vue___default.a,
        'gridView': __WEBPACK_IMPORTED_MODULE_1__GridView_vue___default.a,
        'slider': __WEBPACK_IMPORTED_MODULE_2__Slider_vue___default.a,
        'errorLabel': __WEBPACK_IMPORTED_MODULE_3__ErrorLabel_vue___default.a
    },
    data() {
        return {
            btnDisabled: false,
            grid: {
                columns: [{ name: 'image_name', column: 'Image Name', static: true, style: 'width:10%' }, { name: 'mime_type', column: 'Mime Type', static: true }, {
                    name: 'delete_mark',
                    column: '',
                    style: 'width:5%;text-align:center',
                    editable: true,
                    bind: 'delete_mark',
                    itype: 'selector'
                }]
            }
        };
    },
    mounted() {
        //create initialize
        this.$store.dispatch('villas/create', this.villaId);
    },
    methods: {
        onSave() {
            let that = this;
            bbox.confirm({
                title: 'Confirmation',
                message: 'Do you want to save?',
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: result => {
                    if (result) {
                        this.$store.dispatch('villas/save');
                    }
                }
            });
        },
        onDispatch(file) {
            if (file) {
                this.$store.dispatch('villas/insertImage', { file: file });
                //this.viewModel.insert(file.file);
            }
        },
        onDelete(a, id) {
            this.$store.dispatch('villas/removeImage', { id: id });
            //this.viewModel.remove(id);
        }
    },
    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex__["c" /* mapGetters */])('villas', {
        villa: 'villa',
        lookups: 'lookups',
        errors: 'errors'
    })
});

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vDialog",
    props: {
        dialogTitle: String,
        size: String,
        ftype: String,
        modalType: String,
        modalId: String,
        unfold: Boolean,
        value: Boolean,
        buttonType: String,
        saveCaption: String
    },
    data() {
        return {
            modalSize: ''
        };
    },
    methods: {
        dismiss(result) {
            if (result) {
                this.$emit("dismiss", result);
            } else {
                this.$emit("input", false);
            }
        }
    },
    mounted() {

        if (this.size == 'lg') {
            this.modalSize = 'modal-lg';
        } else {
            this.modalSize = 'modal-md';
        }

        $("#" + this.modalId).modal({ backdrop: false, show: false, keyboard: false });
    },
    computed: {
        saveCaptionComputed() {
            return this.saveCaption || 'Save Changes';
        }
    },
    watch: {
        value(val) {
            if (val) {
                $("#" + this.modalId).modal('show');
            } else {
                $("#" + this.modalId).modal('hide');
            }
        }
    }
});

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vInputWrapper",
    props: ["label", "modelName", "labelClass", "controlClass", "required", "customDisplay", "excludeRow"],
    mounted() {}

});

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vPanel",
    props: ["panelTheme", "classic", "headIcon", "header"]
});

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vTab",
    props: ["text", "tabId"],
    data() {
        return {
            selected: false
        };
    },
    methods: {
        onClick() {
            __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$emit("onVTabClick", this.tabId);
        }
    }
});

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vTabGroup",
    props: ['value'],
    data() {
        return {
            selected: 0
        };
    },
    mounted() {
        let children = this.$children;
        _.forEach(children, (child, index) => {
            const tabId = child.$props.tabId;
            child.$data.selected = false;
            if (tabId === this.value) {
                child.$data.selected = true;
            }
        });

        __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$on("onVTabClick", r => this.update(r));
    },
    methods: {
        clickSlot() {
            console.log("click");
        },
        update(tabId) {
            this.$emit('input', tabId);
        }
    },
    watch: {
        value(nv) {
            let children = this.$children;
            _.forEach(children, (child, index) => {
                const tabId = child.$props.tabId;
                child.$data.selected = false;
                if (tabId === nv) {
                    child.$data.selected = true;
                }
            });
        }
    }
});

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'customAccordion',
    props: ['data'],
    data() {
        return {
            items: [{
                heading: "",
                reports: []
            }]
        };
    }
});

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "grid",
    props: ['grid', 'data'],
    data() {
        let sortOrders = {};
        let sortKey = "";
        this.grid.columns.forEach(key => {
            sortOrders[key.name] = 1;
            if (key.default !== undefined && key.default == true) {
                sortKey = key.name;
            }
        });

        return {
            sortKey: sortKey,
            editVisible: false,
            sortOrders: sortOrders
        };
    },
    computed: {
        filteredData() {
            let sortKey = this.sortKey;
            let data = this.data;

            let order = this.sortOrders[sortKey] || 1;
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }
            this.$emit('sorted', sortKey);

            return data;
        },
        actionButtons() {
            return this.grid.actions;
        }
    },
    methods: {
        sortBy: function (key) {
            if (key.static) return false;
            this.sortKey = key.name;
            this.sortOrders[key.name] = this.sortOrders[key.name] * -1;
        },
        actionTrigger: function (action, id) {
            this.$emit('action', action, id);
        },
        isArrowVisible(name) {
            return this.sortKey === name;
        },
        isIncludeEdit(key) {
            return key.editable && !key.static;
        },
        inputTypeIs(type) {
            return this.inputType == type;
        },
        enableEdit(e) {
            console.log(this.$refs[e]);
        }

    }
});

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "dtPicker",
    props: {
        dpName: "",
        value: "",
        disabled: false,
        dpformat: 'L'
    },
    data() {
        let dateFormat = this.dpformat === undefined ? 'L' : this.dpformat;
        return {
            dateFormat: dateFormat
        };
    },
    mounted() {
        let dtPicker = this.$refs.$dtPicker;
        $(dtPicker).datetimepicker({ format: this.dateFormat }).on('dp.change', e => {
            if (e.date) {
                this.onChange(e.date.format(this.dateFormat));
            } else {
                this.onChange(moment().format(this.dateFormat));
            }
        });
    },

    methods: {
        onChange(dtValue) {
            this.$emit('pick', dtValue);
        }
    },
    computed: {
        defaultValue() {
            if (moment(this.value).isValid()) {
                return moment(this.value).format(this.dateFormat);
            }
            return moment().format(this.dateFormat);
        }
    }
});

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "errorSpan",
    props: ['value', 'name'],
    methods: {
        get() {

            return this.value.get(this.name);
        }
    }
});

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: "gridView",
    props: ['data', 'grid', 'lookups'],
    data() {

        let sortOrders = {};
        let sortKey = "";
        let that = this;

        this.grid.columns.forEach(key => {
            sortOrders[key.name] = 1;
            if (key.default !== undefined && key.default == true) {
                sortKey = key.name;
            }
        });

        return {
            sortKey: sortKey,
            editVisible: false,
            sortOrders: sortOrders

        };
    },
    computed: {
        filteredData() {
            let sortKey = this.sortKey;
            let data;
            data = this.data;
            let order = this.sortOrders[sortKey] || 1;
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }
            this.$emit('sorted', sortKey);

            return data;
        },
        actionButtons() {
            return this.grid.actions;
        }
    },
    methods: {
        sortBy: function (key) {
            if (key.static) return false;

            this.sortKey = key.name;
            this.sortOrders[key.name] = this.sortOrders[key.name] * -1;
        },
        render: function (entry, key) {

            //check pipe period_start|period_end
            let keypos = key.name.indexOf("|"),
                glue = key.glue || " - ",
                value = "";

            if (keypos >= 0) {
                let names = key.name.split('|');
                for (var i = 0; i < names.length; i++) {
                    if (key.dtype == 'date') {
                        entry[names[i]] = moment(entry[names[i]]).format('D, MMM, Y');
                    }
                    value += entry[names[i]] + glue;
                }
                value = value.substring(0, value.length - 3);
            } else {
                value = entry[key.name];
                if (key.dtype == 'date') {
                    value = moment(value).format('D, MMM, Y');
                }
                if (key.dtype == 'currency') {
                    value = accounting.formatNumber(value) + " QR";
                }
            }

            return value;
        },
        actionTrigger: function (action, id, index) {
            this.$emit('action', action, id, index);
        },
        isArrowVisible(name) {
            return this.sortKey === name;
        },
        isIncludeEdit(key) {
            return key.editable && !key.static;
        },
        inputTypeIs(type) {
            return this.inputType == type;
        },
        onPaginateClick(url) {
            this.$emit("paginateClick", url);
        }
    }
});

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'pagination',
    props: ['param'],
    data() {
        return {
            total: 1
        };
    },
    methods: {
        onClick(step) {
            this.$emit('click', step);
        }
    },
    computed: {
        currentPage() {
            return this.param.current_page;
        }
    }
});

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vComboBox",
    props: {
        options: Array,
        dvalue: "",
        dtext: "",
        includeDefault: false,
        value: ""
    },
    methods: {
        onChange(value) {
            this.$emit('input', value);
            this.$emit('change', value);
        }
    },
    computed: {
        keyValue() {
            return this.dvalue || "value";
        },
        keyText() {
            return this.dtext || "text";
        }
    }
});

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vInput",
    props: ["value", "items", "itemText", "itemValue"],
    data() {
        return {
            isShowDropdown: false,
            values: {
                label: '',
                value: ''
            },
            search: ''
        };
    },
    methods: {
        update() {
            const val = this.values.value;
            this.$emit('input', val);
        },
        onChange(nv) {
            if (nv.length > 0) {
                this.isShowDropdown = true;
            } else {
                this.isShowDropdown = false;
            }
        },
        select(values) {
            const option = this.items.find(item => {
                return item[this.itemValue] == values[this.itemValue];
            });

            this.values.value = option[this.itemValue];
            this.$refs.textbox.focus();
            this.update();
        },
        setLabel(nv) {
            const option = this.items.find(item => {
                return item[this.itemValue] == nv;
            });

            this.values.label = option !== undefined ? option[this.itemText] : '';
        }
    },
    computed: {
        options() {

            let options = [];

            if (this.search.length > 0) {
                this.items.forEach(item => {
                    if (item[this.itemText].toLowerCase().indexOf(this.search.toLowerCase()) >= 0) {
                        options.push(item);
                    }
                });
            } else {
                options = this.items;
            }

            return options;
        },
        label() {
            return this.values.label;
        }
    },
    watch: {
        value(nv) {
            this.values.value = nv;
            this.setLabel(nv);
        },
        isShowDropdown(nv) {
            if (nv) {
                this.search = "";
                setTimeout(() => {
                    this.$refs.searchText.focus();
                }, 500);
            }
        }
    }
});

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventbus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controls_Pagination_vue__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controls_Pagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__controls_Pagination_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vLiveView",
    props: ["grid"],
    components: { Pagination: __WEBPACK_IMPORTED_MODULE_1__controls_Pagination_vue___default.a },
    data() {
        return {
            editVisible: false
        };
    },
    beforeMount() {

        //listen to view fetch will call by the client
        __WEBPACK_IMPORTED_MODULE_0__eventbus__["a" /* EventBus */].$on("onLiveViewFetch", response => {
            this.$store.commit('liveviews/clearFilter');
            this.fetchData({ grid: this.grid });
        });

        //initialize sorting
        this.$store.commit('liveviews/initSort', { grid: this.grid });
    },
    mounted() {

        let lazyLoad = this.grid.lazyLoad || false;
        if (!lazyLoad) {
            this.fetchData({ grid: this.grid });
        }
    },
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])('liveviews', { filteredData: 'filteredData' }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapState */])('liveviews', {
        filter: state => state.filter,
        selectedFilter: state => state.selectedFilter,
        sortKey: state => state.sortKey,
        sortOrders: state => state.sortOrders,
        fetchLoading: state => state.fetchLoading
    }), {
        actionButtons() {
            return this.grid.actions;
        }
    }),
    methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapActions */])('liveviews', ['fetchData']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["e" /* mapMutations */])('liveviews', ['loadData', 'filterWrap']), {
        sortBy: function (key) {

            if (key.static) return false;

            this.$store.state.liveviews.sortKey = key.name;
            this.$store.state.liveviews.sortOrders[key.name] = this.$store.state.liveviews.sortOrders[key.name] * -1;
        },
        render: function (entry, key) {
            let value = entry[key.name];
            if (key.dtype === 'date') {
                value = moment(value).format('L');
            } else if (key.dtype === 'currency') {
                value = accounting.formatNumber(value) + " QR";
            }

            return value;
        },
        actionTrigger: function (action, id) {
            this.$emit('action', action, id);
        },
        isArrowVisible(name) {
            return this.$store.state.liveviews.sortKey === name;
        },
        doFilter(field, label) {
            this.filter.field = field;
            this.filter.label = label + ' - ' + this.filter.value;
            this.fetchData({ grid: this.grid });
        },
        clearFilter() {
            this.$store.commit('liveviews/clearFilter');
            this.fetchData({ grid: this.grid });
        }
    })
});

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "vswitch",
    props: {
        value: Boolean,
        isDisabled: Boolean
    },
    data() {
        return {
            toggle: false
        };
    },
    methods: {
        onClick(value) {
            this.$emit("@input", value);
        }
    }

});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(146);

window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);



class ContractListModel {

    constructor() {
        this.data = [];
        this.filterData = [];
        this.errors = new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]();
    }

    reload(status) {
        //reset filter
        this.filterData = [];
        this.filterData = this.filter(status);
        if (this.filterData.length === 0) {
            axiosRequest.get("contract", "list", status).then(res => {

                if (this.data.length > 0) {
                    res.data.forEach(item => {
                        this.data.push(item);
                    });
                } else {
                    this.data = res.data;
                }

                this.filterData = this.filter(status);
            }).catch(err => {
                toastr.errors(err.response.message);
            });
        }
    }

    filter(status = "pending") {
        return this.data.filter(item => {
            return item.status.toLowerCase() == status;
        });
    }

    find(id) {
        return _.find(this.data, item => {
            return item.id == id;
        });
    }

    remove(id, status) {

        let contract = _.find(this.data, item => {
            return item.id == id;
        });
        let index = this.data.indexOf(contract);

        this.data.splice(index, 1);
        this.filterData = this.filter(status);
    }

    redirectToRegister() {
        axiosRequest.redirect("contract", "register");
    }

    redirectToRead(id) {

        axiosRequest.redirect('contract', 'show', id, '_blank');
    }

    cancel(contractId, status) {
        bbox.confirm({
            title: "Contract cancel confirmation",
            message: "Do you want to cancel the contract?",
            callback: result => {
                if (result) {
                    axiosRequest.post("contract", "cancel", { id: contractId }).then(r => {
                        if (r.data.isOk) {
                            this.remove(contractId, status);
                        }
                    }).catch(e => {
                        toastr.errors(e.response.message);
                    });
                }
            }
        });
    }

    createBill(contractId) {

        var item = _.find(this.data, function (item) {
            return item.id == contractId;
        });

        axiosRequest.redirect("bill", "create", item.contract_no);
    }

}
/* unused harmony export ContractListModel */


class ContractRenewModel {

    constructor() {

        this.data = {
            period_start: moment().format('L'),
            period_end: moment().format('L')
        };
        this.errors = new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]();
    }

    clear() {
        this.data = {
            period_start: moment().format('L'),
            period_end: moment().format('L')
        };
    }

    create(id = 0, callback) {
        axiosRequest.get('contract', 'renew', id).then(r => {
            this.data = r.data;
            callback();
        }).catch(e => {
            toastr.error(e.response.data.message);
        });
    }
    redirectToBill(id) {
        axiosRequest.redirect('bill', 'create', id);
    }

    save(cbSuccess) {
        var data = {
            id: this.data.id,
            period_start: this.data.period_start,
            period_end: this.data.period_end,
            amount: this.data.amount
        };

        axiosRequest.post('contract', 'renew', data).then(r => {
            cbSuccess(r.data.data.id);
        }).catch(e => {
            if (e.response.status = 422) {
                this.errors.register(e.response.data);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContractRenewModel;


class ContractTerminationModel {

    constructor() {

        this.data = {
            id: 0,
            contract_no: 0,
            name: '',
            description: '',
            ref_no: '',
            password: ''
        };

        this.errors = new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]();
    }

    clear(id, contract_no, tenant_name) {
        this.data.id = id;
        this.data.contract_no = contract_no;
        this.data.name = tenant_name;
        this.data.description = '';
        this.data.ref_no = '';
        this.data.password = '';
    }
    save(cb) {

        axiosRequest.post("contract", "terminate", this.data).then(r => {
            if (r.data.isOk) {
                toastr.success("Contract Terminated");
                cb(this.data.id);
            }
        }).catch(e => {
            if (e.response.status === 422) {
                this.errors.register(e.response.data);
            } else {
                toastr.error(e.response.data.message);
            }
        });
    }
}
/* unused harmony export ContractTerminationModel */


/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controls_Accordion_vue__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controls_Accordion_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__controls_Accordion_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_select__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controls_DateTimePicker_vue__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controls_DateTimePicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__controls_DateTimePicker_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controls_ErrorSpan_vue__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controls_ErrorSpan_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__controls_ErrorSpan_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controls_DataView_vue__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controls_DataView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__controls_DataView_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controls_GridView_vue__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controls_GridView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__controls_GridView_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controls_VLiveView_vue__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controls_VLiveView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__controls_VLiveView_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controls_VComboBox_vue__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controls_VComboBox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__controls_VComboBox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controls_VInput_vue__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controls_VInput_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__controls_VInput_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__containers_VDialog_vue__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__containers_VDialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__containers_VDialog_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__containers_VPanel_vue__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__containers_VPanel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__containers_VPanel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__containers_VTab_vue__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__containers_VTab_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__containers_VTab_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__containers_VTabGroup_vue__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__containers_VTabGroup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__containers_VTabGroup_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__containers_VInputWrapper_vue__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__containers_VInputWrapper_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__containers_VInputWrapper_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__controls_VSwitch_vue__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__controls_VSwitch_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__controls_VSwitch_vue__);





















const MyPlugins = {
    install(Vue, options) {

        Vue.component(__WEBPACK_IMPORTED_MODULE_0__controls_Accordion_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__controls_Accordion_vue___default.a);
        Vue.component('dataView', __WEBPACK_IMPORTED_MODULE_4__controls_DataView_vue___default.a);
        Vue.component('vSelect', __WEBPACK_IMPORTED_MODULE_1_vue_select___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_2__controls_DateTimePicker_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_2__controls_DateTimePicker_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_3__controls_ErrorSpan_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_3__controls_ErrorSpan_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_5__controls_GridView_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_5__controls_GridView_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_9__containers_VDialog_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_9__containers_VDialog_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_8__controls_VInput_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_8__controls_VInput_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_10__containers_VPanel_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_10__containers_VPanel_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_6__controls_VLiveView_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_6__controls_VLiveView_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_11__containers_VTab_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_11__containers_VTab_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_12__containers_VTabGroup_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_12__containers_VTabGroup_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_13__containers_VInputWrapper_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_13__containers_VInputWrapper_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_7__controls_VComboBox_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_7__controls_VComboBox_vue___default.a);
        Vue.component(__WEBPACK_IMPORTED_MODULE_14__controls_VSwitch_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_14__controls_VSwitch_vue___default.a);
    }
};

/* harmony default export */ __webpack_exports__["a"] = (MyPlugins);

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const state = {
    accounts: [],
    account: {
        lookups: []
    }

};

const mutations = {
    fetchAll(state, data) {
        state.accounts = data;
    },
    create(state, data) {
        state.account = {
            code: "",
            description: "",
            account_type: "",
            lookups: data
        };
    }
};

const actions = {
    fetchAll({ state, commit }) {
        axiosRequest.dispatchGet("/api/chart").then(response => commit("fetchAll", response.data)).catch(error => toastr.error(e.response.message));
    },
    create({ state, commit }) {
        axiosRequest.dispatchGet("/api/chart/create").then(response => commit("create", response.data)).catch(error => toastr.error(e.response.message));
    },
    edit({ state, commit }) {}
};

const getters = {};

const accountChartsModule = {
    namespaced: true,
    state,
    mutations,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (accountChartsModule);

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);



const state = {
    bill: {
        bill_no: '',
        payments: [],
        instance: {},
        paymentSummary: {
            total_payment: 0,
            total_cost: 0
        }
    },
    contract: {
        tenant: {},
        villa: {}
    },
    search: {},
    cloneOfInstance: {},
    lookups: [],
    errors: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */](),
    options: {
        loadingSave: false,
        loadingSearch: false,
        currentTabIndex: 'received'
    }
};

const mutations = {
    clearPayment(state) {
        state.bill.payments = [];
    },
    validate(state, payload) {
        //validate on client side
        const result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["e" /* validation */])().validate(state.cloneOfInstance, state.bill.payments);
        payload.cb(result);
    },
    createInstance(state) {
        state.cloneOfInstance = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["c" /* cloneObject */])(state.bill.instance);
    },
    edit(state, payload) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["d" /* copiedValue */])(payload.payment, state.cloneOfInstance);
    },
    store(state, payload) {
        const trigger = payload.trigger;
        const result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["e" /* validation */])().validate(state.cloneOfInstance, state.bill.payments);
        if (result.isValid) {
            if (trigger === 'createInstance') {
                state.bill.payments.push(state.cloneOfInstance);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["f" /* reIndexing */])(state.bill.payments);
                payload.cb(true);
            } else {
                let p = state.bill.payments.find(item => item.id === state.cloneOfInstance.id);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["d" /* copiedValue */])(state.cloneOfInstance, p);
                payload.cb(true);
            }
        } else {
            toastr.error(result.error);
            payload.cb(false);
        }
    },
    convertPayment(state, payload) {
        const convertion = state.lookups[payload.source].find(item => {
            return item.code == state.cloneOfInstance[payload.needle];
        });
        state.cloneOfInstance[payload.target] = convertion.name;
    },
    removePayment(state, id) {
        state.bill.payments = state.bill.payments.filter(payment => {
            return payment.id !== id;
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["f" /* reIndexing */])(state.bill.payments);
    },
    redirectToPrint(state) {
        axiosRequest.redirect('bill', 'show', state.bill.bill_no, "_blank");
    }
};

const actions = {
    create({ commit, state }, payload) {
        state.bill = payload.bill;
        state.contract = payload.contract;
        state.lookups = payload.lookups;

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["f" /* reIndexing */])(state.bill.payments);

        commit('createInstance');
    },
    save({ commit, state }, payload) {
        state.options.loadingSave = true;
        axiosRequest.post('bill', 'store', state.bill).then(r => {
            state.options.loadingSave = false;
            //commit('redirectToPrint', {billId: r.data.bill.billNo});
            axiosRequest.redirect('contract', '');
        }).catch(e => {
            if (e.response.status === 422) toastr.error(e.response.data.payments[0]);else toastr.error(e.response.data.message);
            state.options.loadingSave = false;
        });
    },
    prepare({ commit, state }) {
        const cloneOfInstance = state.cloneOfInstance;
        axiosRequest.dispatchGet('/api/bill/prepare', cloneOfInstance).then(r => {
            state.bill.payments = r.data;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["f" /* reIndexing */])(state.bill.payments);
        }).catch(e => {
            toastr.error("Internal errors occured");
        });
    }
};

const getters = {
    bill(state) {
        return state.bill;
    },
    payments(state) {
        return state.bill.payments;
    },
    contract(state) {
        return state.contract;
    },
    lookups(state) {
        return state.lookups;
    },
    totalPayment(state) {
        const sum = _.sumBy(state.bill.payments, p => parseInt(p.amount)) || 0;
        return {
            total_payment: sum,
            total_cost: state.contract.amount
        };
    },
    viewIcon(state) {
        return state.options.loadingSave ? "fa-refresh fa-spin" : "fa-save";
    },
    option(state) {
        return state.options;
    },
    cloneOfInstance(state) {
        return state.cloneOfInstance;
    }
};

const billModule = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (billModule);

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);


const state = {
    contracts: {
        data: []
    },
    contractForTerminateId: 0,
    status: "pending",
    contractForTerminate: {
        id: 0,
        contract_no: '',
        tenant_name: '',
        description: '',
        password: '',
        ref_no: ''
    },
    contract: {
        register_tenant: {
            tenant_address: {}
        },
        tenant: {},
        villa: {}
    },
    rate_per_month: 0,
    tenant_default: {
        tenant_address: {}
    },
    lookups: {
        contract_type: [],
        tenant_type: []
    },
    filter: {
        location: ''
    },
    errors: {
        terminateError: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */](),
        contractError: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */](),
        renewError: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]()
    }
};

const mutations = {
    load(state, payload) {
        state.contracts = payload.data;
    },
    redirectToRegister(state) {
        axiosRequest.redirect("contract", "register");
    },
    redirectToRead(state, id) {
        axiosRequest.redirect('bill', 'show', id, '_blank');
    },
    createBill(state, contract_no) {
        axiosRequest.redirect("bill", "create", contract_no);
    },
    cancel(state, payload) {
        state.contracts = state.contracts.data.filter(item => {
            return item.id != payload.contractId;
        });
    },
    setContractForTerminate(state, payload) {
        if (payload) {
            state.contractForTerminate.id = payload.id;
            state.contractForTerminate.contract_no = payload.contract_no;
            state.contractForTerminate.tenant_name = payload.full_name;
        }
    }
};

const actions = {
    load({
        commit,
        state
    }, payload) {
        let url = "/api/contract/list/" + state.status;
        if (payload) {
            url = payload.url;
        }
        axiosRequest.dispatchGet(url).then(r => {
            commit('load', {
                data: r.data
            });
        }).catch(e => toastr.error(e.response.message));
    },
    create({ state }) {
        axiosRequest.get('contract', 'create').then(r => {
            state.contract = {};
            state.contract = r.data.data;
            state.lookups = r.data.lookups;
            state.tenant_default = state.contract.register_tenant;
        });
    },
    renew({ state, commit }, payload) {
        axiosRequest.get('contract', 'renew', payload.id).then(r => {
            state.contract = {};
            state.contract = r.data.oldContract;
            state.lookups = r.data.lookups;
            payload.cb();
        }).catch(e => {
            toastr.error(e.response.data.message);
        });
    },
    update({ state, commit }, payload) {

        var data = {
            id: state.contract.id,
            contract_type: state.contract.contract_type,
            extra_days: state.contract.extra_days,
            prep_series: state.contract.prep_series,
            prep_bank: state.contract.prep_bank,
            prep_due_date: state.contract.prep_due_date,
            prep_ref_no: state.contract.prep_ref_no,
            period_start: state.contract.period_start,
            period_end: state.contract.period_end,
            amount: state.contract.amount
        };

        axiosRequest.post('contract', 'renew', data).then(r => commit('createBill', r.data.data.id)).catch(e => {
            if (e.response.status === 422) this.errors.renewError.register(e.response.data);
        });
    },
    recalc({ state }, payload) {

        const data = {
            villa_id: state.contract.villa_id,
            period_start: state.contract.period_start,
            custom_rate: payload !== undefined ? payload.rate : 0,
            period_end: state.contract.period_end
        };
        axiosRequest.post("contract", "recalc", data).then(r => state.contract.amount = r.data.amount).catch(e => toastr.errors(e.response.message));
    },
    save({ state }) {
        let contract = {};

        //cleansing of data
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["d" /* copiedValue */])(state.contract, contract, ["full_status", "is_extra", "payable_per_month", "tenant_id", "total_year_month", "total_received_payment", "villa_list", "full_contract_type", "full_period_start", "full_period_end"]);

        //remove villa first
        axiosRequest.post("contract", "store", contract).then(r => axiosRequest.redirect("bill", "create", r.data.data.id)).catch(error => {
            if (error.response.status == 422) state.errors.contractError.register(error.response.data);
            toastr.error("Unable to save");
            if (cbError) cbError();
        });
    },
    cancel({ commit, state }, payload) {
        axiosRequest.post("contract", "cancel", {
            id: payload.contractId
        }).then(r => {
            if (r.data.isOk) {
                payload.done();
            }
        }).catch(e => payload.cbError(e.response.data.message));
    },
    terminate({
        commit,
        state
    }, payload) {

        axiosRequest.post("contract", "terminate", state.contractForTerminate).then(r => {
            if (r.data.isOk) {
                payload.success();
            }
        }).catch(e => {
            if (e.response.status === 422) {
                state.errors.terminateError.register(e.response.data);
                toastr.error("Unable to save!!!");
            } else {
                toastr.error(e.response.data.message);
            }
        });
    },
    remove({
        commit
    }, payload) {
        setTimeout(() => {
            commit('cancel', {
                contractId: payload.contractId
            });
            commit('filter', {
                statusIndex: payload.statusIndex
            });
        }, 100);
    },
    searchTenant({
        state,
        commit
    }) {

        const regId = state.contract.register_tenant.reg_id;
        state.contract.register_tenant = state.tenant_default;
        state.contract.register_tenant.reg_id = regId;

        axiosRequest.get('tenant', 'search', state.contract.register_tenant.reg_id).then(r => {
            state.contract.register_tenant = r.data;
            toastr.success("Tenant found");
        }).catch(e => {
            toastr.error(e.response.data.message);
        });
    }
};
const getters = {
    contracts(state) {
        return state.contracts;
    },
    contract(state) {
        return state.contract;
    },
    contractForTerminate(state) {
        return state.contractForTerminate;
    },
    status(state) {
        return state.status;
    },
    tenant(state) {
        return state.contract.register_tenant;
    },
    lookups(state) {
        return state.lookups;
    },
    showGender(state) {
        return state.contract.register_tenant.type === 'individual';
    },
    selectedVilla(state) {
        const v = _.find(state.contract.villa_list, item => {
            return item.id == state.contract.villa_id;
        }) || {};
        return v;
    },
    villas(state) {
        return _.filter(state.contract.villa_list, item => item.location == state.filter.location);
    },
    labels(state) {
        if (state.contract.register_tenant.type == 'individual') {
            return {
                regName: "Company",
                fullName: "Full Name",
                regDate: "Birthday",
                regNo: "Qatar Id"
            };
        } else {
            return {
                regName: "Representative",
                fullName: "Business Name",
                regDate: "Validity Date",
                regNo: "CR No"
            };
        }
    },
    stateErrors(state) {
        return state.errors.terminateError;
    },
    stateContractError(state) {
        return state.errors.contractError;
    },
    stateRenewError(state) {
        return state.errors.renewError;
    }
};

const contractModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (contractModule);

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);


const state = {
    expenses: {
        data: []
    },
    expense: {},
    payee: {
        data: [],
        single: {},
        lookups: {
            payee_type: []
        }
    },
    lookups: {
        villas: []
    },
    options: {
        isPayeeLoaded: false,
        isPayeeCreated: false
    },
    errors: {
        expense: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */](),
        payee: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]()
    }
};

const mutations = {
    redirectToList(state) {
        axiosRequest.redirect('expenses', '');
    },
    redirectToRegister(state, payload) {
        if (payload) {
            axiosRequest.redirect('expenses', 'create', payload.id);
        } else {
            axiosRequest.redirect('expenses', 'create');
        }
    },
    clearPayee(state) {
        state.payee.single = {};
    }
};

const actions = {
    fetch({ state }) {
        axiosRequest.get('expenses', '').then(r => {
            state.expenses = r.data;
        });
    },
    create({ state }) {
        axiosRequest.get('expenses', 'create').then(r => {
            state.expense = r.data.data;
            state.lookups = r.data.lookups;
        });
    },
    createPayee({ state, commit }) {
        if (_.isEmpty(state.payee.single)) {
            axiosRequest.get('payee', 'create').then(r => {
                state.payee.single = r.data.data;
                state.payee.lookups = r.data.lookups;
            });
            state.options.isPayeeCreated = true;
        }
    },
    save({ commit, state }) {
        axiosRequest.post('expenses', 'store', state.expense).then(r => {
            toastr.success('Save successfully!!!');
            commit("redirectToList");
        }).catch(e => {
            if (e.response.status === 422) {
                state.errors.expense.register(e.response.data);
            }
        });
    },
    fetchPayees({ commit, state }) {
        axiosRequest.post('payee', 'store', state.payee.single).then(r => {
            state.lookups.payees = r.data;
            commit('clearPayee');
        }).catch(e => {
            if (e.response.status === 422) {
                state.errors.payee.register(e.response.data);
            }
        });
    },
    edit({ state }, payload) {
        axiosRequest.get('expenses', 'edit', payload.id).then(r => {
            state.expense = r.data.data;
            state.lookups = r.data.lookups;
        });
    }

};

const getters = {
    expense(state) {
        return state.expense;
    },
    expenses(state) {
        return state.expenses.data;
    },
    payee(state) {
        return state.payee.single;
    },
    payeeTypes(state) {
        return state.payee.lookups.payee_type;
    },
    filtered_villas(state) {
        const filters = state.lookups.villas.filter(item => {
            return item.location === state.expense.location;
        });
        return filters;
    },
    lookups(state) {
        return state.lookups;
    },
    errors(state) {
        return state.errors.expense;
    },
    options(state) {
        return state.options;
    }
};

const expenditureModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (expenditureModule);

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);


const state = {
    list: []
};

const mutations = {
    'GETALL': (state, data) => {
        state.list = data;
    }
};

const actions = {
    'GETALL': ({ state, commit }) => {
        axiosRequest.get('fixed-asset', '').then(r => commit(r.data));
    }
};

const getters = {
    list(state) {
        return state.list;
    }
};

const fixedAssetModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (fixedAssetModule);

/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__villas__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contracts__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bills__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__payments__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__expenditures__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__payees__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tenants__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__accountcharts__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__fixed_assets__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__liveviews__ = __webpack_require__(227);















__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    modules: {
        villas: __WEBPACK_IMPORTED_MODULE_2__villas__["a" /* default */],
        contracts: __WEBPACK_IMPORTED_MODULE_3__contracts__["a" /* default */],
        bills: __WEBPACK_IMPORTED_MODULE_4__bills__["a" /* default */],
        payments: __WEBPACK_IMPORTED_MODULE_5__payments__["a" /* default */],
        expenditures: __WEBPACK_IMPORTED_MODULE_6__expenditures__["a" /* default */],
        payees: __WEBPACK_IMPORTED_MODULE_7__payees__["a" /* default */],
        liveviews: __WEBPACK_IMPORTED_MODULE_11__liveviews__["a" /* default */],
        tenants: __WEBPACK_IMPORTED_MODULE_8__tenants__["a" /* default */],
        accountCharts: __WEBPACK_IMPORTED_MODULE_9__accountcharts__["a" /* default */],
        fixedAsset: __WEBPACK_IMPORTED_MODULE_10__fixed_assets__["a" /* default */]

    }
});
/* harmony export (immutable) */ __webpack_exports__["a"] = store;


/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const state = {
    filter: {
        field: '',
        value: '',
        label: ''
    },
    items: {
        data: []
    },
    cache: {},
    selectedFilter: -1,
    sortKey: '',
    sortOrders: '',
    fetchLoading: false
};

const mutations = {
    loadData(state, payload) {
        state.fetchLoading = true;
        if (payload.pointer) {
            state.items = payload.data[payload.pointer];
        } else {
            state.items = payload.data;
        }
        state.cache = payload.data;
        state.fetchLoading = false;
    },
    doFilter(state, payload) {
        state.filter.field = payload.field;
        state.filter.label = payload.label;
    },
    filterWrap(state, index) {
        if (state.selectedFilter === index) {
            state.selectedFilter = -1;
        } else {
            state.selectedFilter = index;
        }
    },
    initSort(state, payload) {

        let sortOrders = {};
        let sortKey = "";

        payload.grid.columns.forEach(key => {
            sortOrders[key.name] = 1;
            if (key.default !== undefined && key.default === true) {
                sortKey = key.name;
            }
        });

        state.sortKey = sortKey;
        state.sortOrders = sortOrders;
    },
    clearFilter(state) {
        state.filter.field = "";
        state.filter.label = "";
        state.filter.value = "";
    }
};

const actions = {

    fetchData({ state, commit }, payload) {
        let url = "";
        let query = "";
        if (payload.paramUrl === undefined) {
            const source = payload.grid.source;
            let params = "";

            if (source.params) {
                _.forEach(source.params, (value, key) => {
                    params = params + "/" + value;
                });
            }

            if (state.filter.field.length > 0) {
                query = "?filter_field=" + state.filter.field + "&filter_value=" + state.filter.value;
            }

            url = source.url + params + query;
            state.selectedFilter = -1;
            state.filter.value = '';
        } else {
            url = payload.paramUrl;
        }

        state.fetchLoading = true;
        axiosRequest.dispatchGet(url).then(response => commit('loadData', { data: response.data, pointer: payload.grid.source.pointer || false })).catch(errors => {
            toastr.error("Loading error");
            state.fetchLoading = false;
        });
    }
};

const getters = {
    filteredData(state) {

        let sortKey = state.sortKey;
        let data = state.items.data;
        let order = state.sortOrders[sortKey] || 1;

        if (sortKey) {
            data = data.slice().sort(function (a, b) {
                a = a[sortKey];
                b = b[sortKey];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
            });
        }

        return data;
    },
    cache(state) {
        return state.cache;
    }

};

const liveviewsModule = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (liveviewsModule);

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);


const state = {
    payee: {
        data: [],
        single: {},
        lookups: {
            payee_type: []
        }
    },
    errors: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]()
};

const mutations = {
    clearPayee(state) {
        state.payee.single = {};
    }
};

const actions = {
    create({ state, commit }) {
        if (_.isEmpty(state.payee.single)) {
            axiosRequest.get('payee', 'create').then(r => {
                state.payee.single = r.data.data;
                state.payee.lookups = r.data.lookups;
            });
        }
    },
    save({ commit, state }, payload) {

        axiosRequest.post('payee', 'store', state.payee.single).then(r => {
            commit('clearPayee');
            toastr.success("Payee successfully added");
            if (payload) payload.cb(r.data);
        }).catch(e => {
            if (e.response.status === 422) {
                state.errors.register(e.response.data);
            }
        });
    }
};

const getters = {
    payee(state) {
        return state.payee.single;
    },
    payeeTypes(state) {
        return state.payee.lookups.payee_type;
    },
    errors(state) {
        return state.errors;
    }
};

const payeeModule = {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
};

/* harmony default export */ __webpack_exports__["a"] = (payeeModule);

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);


const state = {
    bill: {
        bill_no: '',
        payments: [],
        instance: {}
    },
    contract: {
        tenant: {},
        villa: {}
    },
    search: {
        field: '',
        value: '',
        options: [{ value: 'bill', label: 'Bill No' }, { value: 'contract', label: 'Contract No' }, { value: 'villa', label: 'Villa No' }],
        data: []
    },
    cloneOfInstance: {},
    lookups: {
        bank_accounts: {}
    },
    errors: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */](),
    options: {
        loadingSave: false,
        loadingSearch: false,
        currentTabIndex: 'received'
    }
};

const mutations = {
    clearSearch(state) {
        state.search.data = [];
        state.search.field = "";
        state.search.value = "";
    },
    createInstance(state) {
        state.cloneOfInstance = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["c" /* cloneObject */])(state.bill.instance);
    },
    edit(state, payload) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["d" /* copiedValue */])(payload.payment, state.cloneOfInstance);
    },
    replace(state, payload) {
        let p = state.bill.payments.find(item => item.id === payload.item.id);
        p.replace_ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["c" /* cloneObject */])(p);
        p.date_deposited = "0000-00-00";
        state.cloneOfInstance.id = p.id;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["d" /* copiedValue */])(state.cloneOfInstance, p, ["replace_ref"]);
        payload.cb(true);
    },
    store(state, payload) {
        const trigger = payload.trigger;
        const result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["e" /* validation */])().validate(state.cloneOfInstance, state.bill.payments);
        if (result.isValid) {
            if (trigger === 'createInstance') {
                state.bill.payments.push(state.cloneOfInstance);
                payload.cb(true);
            } else {
                let p = state.bill.payments.find(item => item.id === state.cloneOfInstance.id);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["d" /* copiedValue */])(state.cloneOfInstance, p);
                payload.cb(true);
            }
        } else {
            toastr.error(result.error);
            payload.cb(false);
        }
    },

    convertPayment(state, payload) {

        const convertion = state.lookups[payload.source].find(item => {
            return item.code == state.cloneOfInstance[payload.needle];
        });
        if (convertion) state.cloneOfInstance[payload.target] = convertion.name;else state.cloneOfInstance[payload.target] = "";
    },
    redirectToPrint(state) {
        if (state.bill.bill_no !== '') axiosRequest.redirect('bill', 'show', state.bill.bill_no, "_blank");
    },
    updateDeposit(state, payload) {
        const payment = state.bill.payments.find(item => {
            return item.id === payload.id;
        });
        if (payment) {
            //payment.date_deposited = moment().format();
        }
    },
    calculateReplace(state, cb) {
        const replace = state.bill.payments.filter(item => {
            return item.status == 'replace';
        });

        let amount = 0;
        let replaceNo = "";
        if (replace) {
            amount = _.sumBy(replace, item => parseFloat(item.amount));
            replace.forEach(item => {
                replaceNo = replaceNo + item.payment_no + ",";
            });

            replaceNo = replaceNo.substring(0, replaceNo.length - 1);
        }

        state.cloneOfInstance.remarks = "Cheques being replace " + replaceNo;
        state.cloneOfInstance.amount = amount;

        cb();
    }
};

const actions = {
    edit({ commit, state }, payload) {
        state.options.loadingSearch = true;
        state.options.currentTabIndex = 'received';
        axiosRequest.get('bill', 'edit', state.bill.bill_no).then(res => {
            state.bill = res.data.bill;
            state.bill.instance = res.data.paymentInstance;
            state.contract = res.data.contract;
            state.lookups = res.data.lookups;
            state.bill.payments.forEach(p => {});
            state.options.loadingSearch = false;
            commit('createInstance');
        }).catch(err => {
            toastr.error(err.response.data.message);
            this.options.loadingSearch = false;
        });
    },
    search({ commit, state }, payload) {
        axiosRequest.get('bill', 'search', state.search.field.value, state.search.value).then(r => state.search.data = r.data).catch(e => toastr.errors(e.response.data.message));
    },
    update({ commit, state }, payload) {
        //update only the received portion
        const payments = state.bill.payments;

        state.options.loadingSave = true;
        //console.log(payments);
        axiosRequest.post('bill', 'update', { id: state.bill.id, payments: payments }).then(res => {

            toastr.success(res.data.message);

            state.options.loadingSave = false;
            state.options.currentTabIndex = 'received';

            payload.done();
        }).catch(err => {
            state.options.loadingSave = false;
            if (err.response.status === 422) {
                state.errors.register(err.response.data);
                toastr.error(state.errors.get('payments'));
            }
        });
    }
};

const getters = {
    contract(state) {
        return state.contract;
    },
    bill(state) {
        return state.bill;
    },
    filtered(state) {
        let payments = [];
        if (state.options.currentTabIndex === 'received') {
            const exception = ["received", "bounce", "deposit", "replace"];
            payments = state.bill.payments.filter(item => {
                for (var i = 0; i < exception.length; i++) {
                    let stat = item.status_flag === exception[i] && item.payment_mode === 'payment';
                    if (stat) return stat;
                }
            });
        } else {
            payments = state.bill.payments.filter(item => {
                return item.full_status.toLowerCase() === state.options.currentTabIndex;
            });
        }

        return payments;
    },
    footerAmount(state) {
        return _.sumBy(state.bill.payments, p => {
            if (p.status == state.options.currentTabIndex) return parseInt(p.amount);else return 0;
        });
    },
    totalPayment(state) {
        const payments = _.sumBy(state.bill.payments, p => {
            if (p.status === 'clear') return parseInt(p.amount);else return 0;
        });

        return {
            total_payment: payments,
            total_cost: state.contract.amount
        };
    },
    options(state) {
        return state.options;
    },
    search(state) {
        return state.search;
    },
    cloneOfInstance(state) {
        return state.cloneOfInstance;
    },
    lookups(state) {
        return state.lookups;
    },
    isPaymentStatusReplace(state) {
        const item = state.bill.payments.find(item => {
            if (item.status === 'replace') {
                return true;
            }
        });

        return item === undefined ? false : true;
    },
    bankDeposited(state) {
        const bank = _.find(state.lookups.bank_accounts, item => {
            return item.account_no === state.cloneOfInstance.bank_account;
        });
        return bank !== undefined ? bank.bank_name : '';
    }
};

const paymentModule = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (paymentModule);

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);


const state = {
    key: '',
    tenant: {
        tenant_address: {}
    },
    lookups: {},
    errors: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */]()
};

const mutations = {
    fetchData(state, payload) {
        state.tenant = payload.tenant;
        state.lookups = payload.lookups;
    },
    toEdit({ state, commit }, id) {
        axiosRequest.redirect('tenant', 'register', id);
    },
    toCreate({ state, commit }) {
        axiosRequest.redirect('tenant', 'register');
    }
};

const actions = {
    fetchData({
        state,
        commit
    }) {
        axiosRequest.get('tenant', 'edit', this.key).then(r => commit('fetchData', {
            tenant: r.data.tenant,
            lookups: r.data.lookups
        })).catch(e => {
            if (e.response.status === 422) {
                state.errors.register(e.response.data);
            }
        });
    },
    save({
        state,
        commit
    }) {
        axiosRequest.post('tenant', 'store', state.tenant).then(r => {
            toastr.success("Successfully save");
            axiosRequest.redirect("tenant", "");
        }).catch(e => {
            if (e.response.status === 422) {
                state.errors.register(e.response.data);
            }
        });
    }
};

const getters = {
    tenant(state) {
        return state.tenant;
    },
    lookups(state) {
        return state.lookups;
    },
    labels(state) {
        if (state.tenant.type == 'individual') {
            return {
                regName: "Company",
                fullName: "Full Name",
                regDate: "Birthday",
                regNo: "Qatar Id"
            };
        } else {
            return {
                regName: "Representative",
                fullName: "Business Name",
                regDate: "Validity Date",
                regNo: "CR No"
            };
        }
    },
    showGender(state) {
        return state.tenant.type === 'individual';
    }
};

const tenantModule = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};

/* harmony default export */ __webpack_exports__["a"] = (tenantModule);

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(5);



const state = {
    villas: [],
    statuses: [],
    villa: {
        villa_galleries: []
    },
    lookups: {},
    villa_newImages: [],
    errors: new __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["b" /* ErrorValidations */](),
    search: {
        field: '',
        value: ''
    }
};

const mutations = {
    load(state, payload) {
        state.villas = payload.villas;
        state.statuses = payload.status;
    },
    redirectToRegister(state, id) {
        axiosRequest.redirect("villa", "register", id);
    },
    redirectToVilla(state) {
        axiosRequest.redirect('villa');
    },
    insertImage(state, payload) {
        state.villa_newImages.push(payload.file);
    },
    removeImage(state, payload) {
        state.villa_newImages = state.villa_newImages.filter((item, index) => {
            return item.id !== payload.id;
        });
    }
};

const actions = {
    load({ commit, state }, payload) {
        axiosRequest.get('villa', 'list', state.search.field, state.search.value).then(res => {
            commit('load', res.data);
        }).catch(err => {
            payload.cbError(err.response.data.message);
        });
    },
    create({ state }, id) {
        axiosRequest.get("villa", "create", id).then(res => {
            state.villa = res.data.instance;
            state.lookups = res.data.lookups;
        }).catch(err => {
            toastr.errors(err.response.message);
        });
    },
    save({ commit, state }) {

        let formData = new FormData();

        //take villa data
        Object.keys(state.villa).forEach(key => {
            if (key === 'villa_galleries') {
                let villaGalleries = state.villa.villa_galleries;
                //take galleries which has mark deleted
                if (villaGalleries.length > 0) {
                    for (var i = 0; i < villaGalleries.length; i++) {
                        if (villaGalleries[i].delete_mark == true) {
                            formData.append('villaGalleriesDeleteMark[]', villaGalleries[i].id);
                        }
                    }
                }
            } else {
                formData.append(key, state.villa[key]);
            }
        });

        //check for new image galleries
        if (state.villa_newImages.length > 0) {
            for (var i = 0; i < state.villa_newImages.length; i++) {
                formData.append('galleries[]', state.villa_newImages[i]);
            }
        }

        axiosRequest.postMultiForm('villa', 'store', formData).done(resp => {
            commit('redirectToVilla');
        }).fail(err => {
            if (err.status === 422) {
                state.errors.register(err.responseJSON);
            }
        });
    }
};

const getters = {
    villas(state) {
        return state.villas;
    },
    statuses(state) {
        return state.statuses;
    },
    villa(state) {
        return state.villa;
    },
    lookups(state) {
        return state.lookups;
    },
    errors(state) {
        return state.errors;
    }
};

const villaModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

/* harmony default export */ __webpack_exports__["a"] = (villaModule);

/***/ }),
/* 232 */,
/* 233 */,
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n.search-width {\n    width: 350px !important;\n}\n", ""]);

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n.v-input-container[data-v-4aaf4ccc] {\r\n    position: relative;\n}\n.v-input-list[data-v-4aaf4ccc] {\r\n    background: #fff;\r\n    height: 150px;\r\n    overflow: scroll;\r\n    padding: 10px;\r\n    position: absolute;\r\n    top: 35px;\r\n    left: 0;\r\n    width: 100%;\r\n    z-index: 3;\n}\n.v-input-list ul[data-v-4aaf4ccc] {\r\n    list-style: none;\r\n    width: 100%;\r\n    margin: 0;\r\n    padding: 0;\n}\n.v-input-list ul li[data-v-4aaf4ccc] {\r\n    display: block;\n}\n.v-input-list a[data-v-4aaf4ccc] {\r\n    text-decoration: none;\r\n    color: #333;\r\n    padding: 5 0;\r\n    display: block;\n}\n.v-input-list a[data-v-4aaf4ccc]:hover {\r\n    background: #ccc;\n}\n.label[data-v-4aaf4ccc] {\r\n    font-size: 12px;\r\n    color: red;\r\n    font-weight: bold;\n}\r\n", ""]);

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n.slider-wrapper {\n        position: relative;\n        overflow: hidden;\n        height: 242px;\n}\n.slider-wrapper .sliders img {\n        width: 484px;\n        height: 242px;\n}\n.slider-wrapper ::after {\n        content: '';\n        display: block;\n        clear: both;\n}\n.slider-wrapper .slider {\n        width: 99999999px;\n        transition: all 0.5s;\n        position:absolute;\n        top:0;\n        left:0;\n}\n.slider-wrapper ul.slider-nav {\n            position: absolute;\n            right: 1rem;\n        bottom: 1rem;\n        list-style: none;\n}\n.slider-wrapper ul.slider-nav li {\nfloat: left;\nmargin: 0 3px;\n}\n.slider-wrapper ul.slider-nav li .circle {\ndisplay: block;\nwidth: 10px;\nheight: 10px;\nborder: 1px solid #ddd;\nborder-radius: 50%;\nbackground: transparent;\n}\n.slider-wrapper ul.slider-nav li .circle.active {\nbackground: #fb83ac;\nborder-color: #fb83ac;\n}\n\n", ""]);

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n.column-group {\r\n    width: 100%;\r\n    padding: 10px;\n}\n.column-group label {\r\n    font-size: 1.8em;\r\n    font-weight: 400;\n}\n.column-group .input {\r\n    border: 0px;\r\n    background: transparent;\r\n    border-bottom: 2px solid #cecece;\r\n    font-size: 1.8em;\r\n    width: 230px;\n}\r\n", ""]);

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Enter and leave animations can use different */\n/* durations and timing functions.              */\n.v-slide-fade-enter-active {\n    transition: all .3s ease;\n}\n.v-slide-fade-leave-active {\n    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);\n}\n.v-slide-fade-enter, .v-slide-fade-leave-to\n    /* .slide-fade-leave-active below version 2.1.8 */ {\n\n    opacity: 0;\n}\n.v-view-loading-container {\n    width: 100%;\n    height: 350px;\n    position:relative;\n}\n.v-view-loading {\n    position:absolute;\n    top:30%;\n    left: 40%;\n    font-size: 40px;\n}\n", ""]);

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n.temp-modal {\n    display: none\n}\n", ""]);

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n.dropbox {\n  outline: 2px dashed grey;\n  /* the dash box */\n  outline-offset: -10px;\n  background: lightcyan;\n  color: dimgray;\n  padding: 5px 5px;\n  min-height: 30px;\n  /* minimum height */\n  position: relative;\n  cursor: pointer;\n  margin-bottom: 10px;\n}\n.input-file {\n  opacity: 0;\n  /*invisible but its there! */\n  width: 100%;\n  min-height: 50px;\n  position: absolute;\n  cursor: pointer;\n}\n.dropbox:hover {\n  background: lightblue;\n  /* when mouse over to the drop zone, change color */\n}\n.dropbox p {\n  font-size: 1.2em;\n  text-align: center;\n  padding: 10px 0;\n}\nimg.preview {\n  width: 200px;\n  background-color: white;\n  border: 1px solid #DDD;\n  padding: 5px;\n}\n", ""]);

/***/ }),
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 249 */,
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * vee-validate v2.0.0-rc.2
 * (c) 2017 Abdelrahman Awad
 * @license MIT
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VeeValidate = factory());
}(this, (function () { 'use strict';

/**
 * Some Alpha Regex helpers.
 * https://github.com/chriso/validator.js/blob/master/src/lib/alpha.js
 */

var alpha$1 = {
  en: /^[A-Z]*$/i,
  cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
  da: /^[A-ZÆØÅ]*$/i,
  de: /^[A-ZÄÖÜß]*$/i,
  es: /^[A-ZÁÉÍÑÓÚÜ]*$/i,
  fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
  nl: /^[A-ZÉËÏÓÖÜ]*$/i,
  hu: /^[A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
  pl: /^[A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
  pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
  ru: /^[А-ЯЁ]*$/i,
  sr: /^[A-ZČĆŽŠĐ]*$/i,
  tr: /^[A-ZÇĞİıÖŞÜ]*$/i,
  uk: /^[А-ЩЬЮЯЄIЇҐ]*$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
};

var alphaSpaces = {
  en: /^[A-Z\s]*$/i,
  cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]*$/i,
  da: /^[A-ZÆØÅ\s]*$/i,
  de: /^[A-ZÄÖÜß\s]*$/i,
  es: /^[A-ZÁÉÍÑÓÚÜ\s]*$/i,
  fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]*$/i,
  nl: /^[A-ZÉËÏÓÖÜ\s]*$/i,
  hu: /^[A-ZÁÉÍÓÖŐÚÜŰ\s]*$/i,
  pl: /^[A-ZĄĆĘŚŁŃÓŻŹ\s]*$/i,
  pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ\s]*$/i,
  ru: /^[А-ЯЁ\s]*$/i,
  sr: /^[A-ZČĆŽŠĐ\s]*$/i,
  tr: /^[A-ZÇĞİıÖŞÜ\s]*$/i,
  uk: /^[А-ЩЬЮЯЄIЇҐ\s]*$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ\s]*$/
};

var alphanumeric = {
  en: /^[0-9A-Z]*$/i,
  cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
  da: /^[0-9A-ZÆØÅ]$/i,
  de: /^[0-9A-ZÄÖÜß]*$/i,
  es: /^[0-9A-ZÁÉÍÑÓÚÜ]*$/i,
  fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
  hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
  nl: /^[0-9A-ZÉËÏÓÖÜ]*$/i,
  pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
  pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
  ru: /^[0-9А-ЯЁ]*$/i,
  sr: /^[0-9A-ZČĆŽŠĐ]*$/i,
  tr: /^[0-9A-ZÇĞİıÖŞÜ]*$/i,
  uk: /^[0-9А-ЩЬЮЯЄIЇҐ]*$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
};

var alphaDash = {
  en: /^[0-9A-Z_-]*$/i,
  cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ_-]*$/i,
  da: /^[0-9A-ZÆØÅ_-]*$/i,
  de: /^[0-9A-ZÄÖÜß_-]*$/i,
  es: /^[0-9A-ZÁÉÍÑÓÚÜ_-]*$/i,
  fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ_-]*$/i,
  nl: /^[0-9A-ZÉËÏÓÖÜ_-]*$/i,
  hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ_-]*$/i,
  pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ_-]*$/i,
  pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ_-]*$/i,
  ru: /^[0-9А-ЯЁ_-]*$/i,
  sr: /^[0-9A-ZČĆŽŠĐ_-]*$/i,
  tr: /^[0-9A-ZÇĞİıÖŞÜ_-]*$/i,
  uk: /^[0-9А-ЩЬЮЯЄIЇҐ_-]*$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ_-]*$/
};

var alpha$$1 = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alpha$1).some(function (loc) { return alpha$1[loc].test(value); });
  }

  return (alpha$1[locale] || alpha$1.en).test(value);
};

var alpha_dash = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alphaDash).some(function (loc) { return alphaDash[loc].test(value); });
  }

  return (alphaDash[locale] || alphaDash.en).test(value);
};

var alpha_num = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alphanumeric).some(function (loc) { return alphanumeric[loc].test(value); });
  }

  return (alphanumeric[locale] || alphanumeric.en).test(value);
};

var alpha_spaces = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alphaSpaces).some(function (loc) { return alphaSpaces[loc].test(value); });
  }

  return (alphaSpaces[locale] || alphaSpaces.en).test(value);
};

var between = function (value, ref) {
	var min = ref[0];
	var max = ref[1];

	return Number(min) <= value && Number(max) >= value;
};

var confirmed = function (value, ref, validatingField) {
  var confirmedField = ref[0];

  var field = confirmedField
    ? document.querySelector(("input[name='" + confirmedField + "']"))
    : document.querySelector(("input[name='" + validatingField + "_confirmation']"));

  return !! (field && String(value) === field.value);
};

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var assertString_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];
});

var isCreditCard_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCreditCard;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})|62[0-9]{14}$/;
/* eslint-enable max-len */

function isCreditCard(str) {
  (0, _assertString2.default)(str);
  var sanitized = str.replace(/[^0-9]+/g, '');
  if (!creditCard.test(sanitized)) {
    return false;
  }
  var sum = 0;
  var digit = void 0;
  var tmpNum = void 0;
  var shouldDouble = void 0;
  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  return !!(sum % 10 === 0 ? sanitized : false);
}
module.exports = exports['default'];
});

var isCreditCard = unwrapExports(isCreditCard_1);

var credit_card = function (value) { return isCreditCard(String(value)); };

var decimal = function (value, params) {
  var decimals = Array.isArray(params) ? (params[0] || '*') : '*';
  if (Array.isArray(value)) {
    return false;
  }

  if (value === null || value === undefined || value === '') {
    return true;
  }

    // if is 0.
  if (Number(decimals) === 0) {
    return /^-?\d*$/.test(value);
  }

  var regexPart = decimals === '*' ? '+' : ("{1," + decimals + "}");
  var regex = new RegExp(("^-?\\d*(\\.\\d" + regexPart + ")?$"));

  if (! regex.test(value)) {
    return false;
  }

  var parsedValue = parseFloat(value);

    // eslint-disable-next-line
    return parsedValue === parsedValue;
};

var digits = function (value, ref) {
  var length = ref[0];

  var strVal = String(value);

  return /^[0-9]*$/.test(strVal) && strVal.length === Number(length);
};

var validateImage = function (file, width, height) {
  var URL = window.URL || window.webkitURL;
  return new Promise(function (resolve) {
    var image = new Image();
    image.onerror = function () { return resolve({ valid: false }); };
    image.onload = function () { return resolve({
      valid: image.width === Number(width) && image.height === Number(height)
    }); };

    image.src = URL.createObjectURL(file);
  });
};

var dimensions = function (files, ref) {
  var width = ref[0];
  var height = ref[1];

  var list = [];
  for (var i = 0; i < files.length; i++) {
        // if file is not an image, reject.
    if (! /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
      return false;
    }

    list.push(files[i]);
  }

  return Promise.all(list.map(function (file) { return validateImage(file, width, height); }));
};

var merge_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];
});

var isByteLength_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];
});

var isFQDN = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFDQN;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFDQN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
      // disallow full-width chars
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
});

var isEmail_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);



var _isByteLength2 = _interopRequireDefault(isByteLength_1);



var _isFQDN2 = _interopRequireDefault(isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 256 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];
});

var isEmail = unwrapExports(isEmail_1);

var email = function (value) { return isEmail(String(value)); };

var ext = function (files, extensions) {
  var regex = new RegExp((".(" + (extensions.join('|')) + ")$"), 'i');

  return files.every(function (file) { return regex.test(file.name); });
};

var image = function (files) { return files.every(function (file) { return /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name); }
); };

var In = function (value, options) { return !! options.filter(function (option) { return option == value; }).length; }; // eslint-disable-line

var isIP_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2.default)(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var blocks = str.split(':');
    var foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
}
module.exports = exports['default'];
});

var isIP = unwrapExports(isIP_1);

var ip = function (value, ref) {
	if ( ref === void 0 ) ref = [4];
	var version = ref[0];

	return isIP(value, version);
};

var max = function (value, ref) {
  var length = ref[0];

  if (value === undefined || value === null) {
    return length >= 0;
  }

  return String(value).length <= length;
};

var max_value = function (value, ref) {
  var max = ref[0];

  if (Array.isArray(value) || value === null || value === undefined || value === '') {
    return false;
  }

  return Number(value) <= max;
};

var mimes = function (files, mimes) {
  var regex = new RegExp(((mimes.join('|').replace('*', '.+')) + "$"), 'i');

  return files.every(function (file) { return regex.test(file.type); });
};

var min = function (value, ref) {
  var length = ref[0];

  if (value === undefined || value === null) {
    return false;
  }
  return String(value).length >= length;
};

var min_value = function (value, ref) {
  var min = ref[0];

  if (Array.isArray(value) || value === null || value === undefined || value === '') {
    return false;
  }

  return Number(value) >= min;
};

var not_in = function (value, options) { return ! options.filter(function (option) { return option == value; }).length; }; // eslint-disable-line

var numeric = function (value) { return /^[0-9]+$/.test(String(value)); };

var regex = function (value, ref) {
  var regex = ref[0];
  var flags = ref.slice(1);

  if (regex instanceof RegExp) {
    return regex.test(value);
  }

  return new RegExp(regex, flags).test(String(value));
};

var required = function (value) {
  if (Array.isArray(value)) {
    return !! value.length;
  }

  if (value === undefined || value === null) {
    return false;
  }

  return !! String(value).trim().length;
};

var size = function (files, ref) {
  var size = ref[0];

  if (isNaN(size)) {
    return false;
  }

  var nSize = Number(size) * 1024;
  for (var i = 0; i < files.length; i++) {
    if (files[i].size > nSize) {
      return false;
    }
  }

  return true;
};

var isURL_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;



var _assertString2 = _interopRequireDefault(assertString_1);



var _isFQDN2 = _interopRequireDefault(isFQDN);



var _isIP2 = _interopRequireDefault(isIP_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};

var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}

function isURL(url, options) {
  (0, _assertString2.default)(url);
  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
    return false;
  }
  if (url.indexOf('mailto:') === 0) {
    return false;
  }
  options = (0, _merge2.default)(options, default_url_options);
  var protocol = void 0,
      auth = void 0,
      host = void 0,
      hostname = void 0,
      port = void 0,
      port_str = void 0,
      split = void 0,
      ipv6 = void 0;

  split = url.split('#');
  url = split.shift();

  split = url.split('?');
  url = split.shift();

  split = url.split('://');
  if (split.length > 1) {
    protocol = split.shift();
    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
    split[0] = url.substr(2);
  }
  url = split.join('://');

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');
  if (split.length > 1) {
    auth = split.shift();
    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }
  hostname = split.join('@');

  port_str = ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);
    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  }

  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6)) && host !== 'localhost') {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }
  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}
module.exports = exports['default'];
});

var isURL = unwrapExports(isURL_1);

var url = function (value, ref) {
        if ( ref === void 0 ) ref = [true];
        var requireProtocol = ref[0];

        return isURL(value, { require_protocol: !! requireProtocol });
};

/* eslint-disable camelcase */
var Rules = {
  alpha_dash: alpha_dash,
  alpha_num: alpha_num,
  alpha_spaces: alpha_spaces,
  alpha: alpha$$1,
  between: between,
  confirmed: confirmed,
  credit_card: credit_card,
  decimal: decimal,
  digits: digits,
  dimensions: dimensions,
  email: email,
  ext: ext,
  image: image,
  in: In,
  ip: ip,
  max: max,
  max_value: max_value,
  mimes: mimes,
  min: min,
  min_value: min_value,
  not_in: not_in,
  numeric: numeric,
  regex: regex,
  required: required,
  size: size,
  url: url
};

var ErrorBag = function ErrorBag() {
  this.errors = [];
};

  /**
   * Adds an error to the internal array.
   *
   * @param {string} field The field name.
   * @param {string} msg The error message.
   * @param {String} rule The rule that is responsible for the error.
   * @param {String} scope The Scope name, optional.
   */
ErrorBag.prototype.add = function add (field, msg, rule, scope) {
    if ( scope === void 0 ) scope = '__global__';

  this.errors.push({ field: field, msg: msg, rule: rule, scope: scope });
};

  /**
   * Gets all error messages from the internal array.
   *
   * @param {String} scope The Scope name, optional.
   * @return {Array} errors Array of all error messages.
   */
ErrorBag.prototype.all = function all (scope) {
  if (! scope) {
    return this.errors.map(function (e) { return e.msg; });
  }

  return this.errors.filter(function (e) { return e.scope === scope; }).map(function (e) { return e.msg; });
};

  /**
   * Checks if there are any errors in the internal array.
   * @param {String} scope The Scope name, optional.
   * @return {boolean} result True if there was at least one error, false otherwise.
   */
ErrorBag.prototype.any = function any (scope) {
  if (! scope) {
    return !! this.errors.length;
  }

  return !! this.errors.filter(function (e) { return e.scope === scope; }).length;
};

  /**
   * Removes all items from the internal array.
   *
   * @param {String} scope The Scope name, optional.
   */
ErrorBag.prototype.clear = function clear (scope) {
  if (! scope) {
    scope = '__global__';
  }

  this.errors = this.errors.filter(function (e) { return e.scope !== scope; });
};

  /**
   * Collects errors into groups or for a specific field.
   *
   * @param{string} field The field name.
   * @param{string} scope The scope name.
   * @param {Boolean} map If it should map the errors to strings instead of objects.
   * @return {Array} errors The errors for the specified field.
   */
ErrorBag.prototype.collect = function collect (field, scope, map) {
    if ( map === void 0 ) map = true;

  if (! field) {
    var collection = {};
    this.errors.forEach(function (e) {
      if (! collection[e.field]) {
        collection[e.field] = [];
      }

      collection[e.field].push(map ? e.msg : e);
    });

    return collection;
  }

  if (! scope) {
    return this.errors.filter(function (e) { return e.field === field; }).map(function (e) { return (map ? e.msg : e); });
  }

  return this.errors.filter(function (e) { return e.field === field && e.scope === scope; })
                    .map(function (e) { return (map ? e.msg : e); });
};
  /**
   * Gets the internal array length.
   *
   * @return {Number} length The internal array length.
   */
ErrorBag.prototype.count = function count () {
  return this.errors.length;
};

  /**
   * Gets the first error message for a specific field.
   *
   * @param{string} field The field name.
   * @return {string|null} message The error message.
   */
ErrorBag.prototype.first = function first (field, scope) {
    var this$1 = this;
    if ( scope === void 0 ) scope = '__global__';

  var selector = this._selector(field);
  var scoped = this._scope(field);

  if (scoped) {
    var result = this.first(scoped.name, scoped.scope);
    // if such result exist, return it. otherwise it could be a field.
    // with dot in its name.
    if (result) {
      return result;
    }
  }

  if (selector) {
    return this.firstByRule(selector.name, selector.rule, scope);
  }

  for (var i = 0; i < this.errors.length; i++) {
    if (this$1.errors[i].field === field && (this$1.errors[i].scope === scope)) {
      return this$1.errors[i].msg;
    }
  }

  return null;
};

  /**
   * Returns the first error rule for the specified field
   *
   * @param {string} field The specified field.
   * @return {string|null} First error rule on the specified field if one is found, otherwise null
   */
ErrorBag.prototype.firstRule = function firstRule (field, scope) {
  var errors = this.collect(field, scope, false);

  return (errors.length && errors[0].rule) || null;
};

  /**
   * Checks if the internal array has at least one error for the specified field.
   *
   * @param{string} field The specified field.
   * @return {Boolean} result True if at least one error is found, false otherwise.
   */
ErrorBag.prototype.has = function has (field, scope) {
    if ( scope === void 0 ) scope = '__global__';

  return !! this.first(field, scope);
};

  /**
   * Gets the first error message for a specific field and a rule.
   * @param {String} name The name of the field.
   * @param {String} rule The name of the rule.
   * @param {String} scope The name of the scope (optional).
   */
ErrorBag.prototype.firstByRule = function firstByRule (name, rule, scope) {
  var error = this.collect(name, scope, false).filter(function (e) { return e.rule === rule; })[0];

  return (error && error.msg) || null;
};

  /**
   * Removes all error messages associated with a specific field.
   *
   * @param{string} field The field which messages are to be removed.
   * @param {String} scope The Scope name, optional.
   */
ErrorBag.prototype.remove = function remove (field, scope) {
  if (scope) {
    this.errors = this.errors.filter(function (e) { return e.field !== field || e.scope !== scope; });

    return;
  }

  this.errors = this.errors.filter(function (e) { return e.field !== field || e.scope !== '__global__'; });
};


  /**
   * Get the field attributes if there's a rule selector.
   *
   * @param{string} field The specified field.
   * @return {Object|null}
   */
ErrorBag.prototype._selector = function _selector (field) {
  if (field.indexOf(':') > -1) {
    var ref = field.split(':');
      var name = ref[0];
      var rule = ref[1];

    return { name: name, rule: rule };
  }

  return null;
};

  /**
   * Get the field scope if specified using dot notation.
   *
   * @param {string} field the specifie field.
   * @return {Object|null}
   */
ErrorBag.prototype._scope = function _scope (field) {
  if (field.indexOf('.') > -1) {
    var ref = field.split('.');
      var scope = ref[0];
      var name = ref[1];

    return { name: name, scope: scope };
  }

  return null;
};

var ValidatorException = (function () {
  function anonymous(msg) {
    this.msg = "[vee-validate]: " + msg;
  }

  anonymous.prototype.toString = function toString () {
    return this.msg;
  };

  return anonymous;
}());

/**
 * Gets the data attribute. the name must be kebab-case.
 */
var getDataAttribute = function (el, name) { return el.getAttribute(("data-vv-" + name)); };

/**
 * Determines the input field scope.
 */
var getScope = function (el) {
  var scope = getDataAttribute(el, 'scope');
  if (! scope && el.form) {
    scope = getDataAttribute(el.form, 'scope');
  }

  return scope;
};

/**
 * Gets the value in an object safely.
 * @param {String} propPath
 * @param {Object} target
 * @param {*} def
 */
var getPath = function (propPath, target, def) {
  if ( def === void 0 ) def = undefined;

  if (!propPath || !target) { return def; }

  var value = target;
  propPath.split('.').every(function (prop) {
    if (! Object.prototype.hasOwnProperty.call(value, prop)) {
      value = def;

      return false;
    }

    value = value[prop];

    return true;
  });

  return value;
};

/**
 * Debounces a function.
 */
var debounce = function (callback, wait, immediate) {
  if ( wait === void 0 ) wait = 0;

  var timeout;

  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var later = function () {
      timeout = null;
      if (!immediate) { callback.apply(void 0, args); }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { callback(args); }
  };
};

/**
 * Emits a warning to the console.
 */
var warn = function (message) {
  if (! console) {
    return;
  }

    console.warn(("[vee-validate]: " + message)); // eslint-disable-line
};

/**
 * Checks if the value is an object.
 */
var isObject = function (object) { return object !== null && object && typeof object === 'object' && ! Array.isArray(object); };

/**
 * Checks if a function is callable.
 */
var isCallable = function (func) { return typeof func === 'function'; };

/**
 * Check if element has the css class on it.
 */
var hasClass = function (el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return !!el.className.match(new RegExp(("(\\s|^)" + className + "(\\s|$)")));
};

/**
 * Adds the provided css className to the element.
 */
var addClass = function (el, className) {
  if (el.classList) {
    el.classList.add(className);
    return;
  }

  if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

/**
 * Remove the provided css className from the element.
 */
var removeClass = function (el, className) {
  if (el.classList) {
    el.classList.remove(className);
    return;
  }

  if (hasClass(el, className)) {
    var reg = new RegExp(("(\\s|^)" + className + "(\\s|$)"));
    el.className = el.className.replace(reg, ' ');
  }
};

/**
 * Converts an array-like object to array.
 * Simple polyfill for Array.from
 */
var toArray = function (arrayLike) {
  if (Array.from) {
    return Array.from(arrayLike);
  }

  var array = [];
  var length = arrayLike.length;
  for (var i = 0; i < length; i++) {
    array.push(arrayLike[i]);
  }

  return array;
};

/**
 * Assign polyfill from the mdn.
 */
var assign = function (target) {
  var others = [], len = arguments.length - 1;
  while ( len-- > 0 ) others[ len ] = arguments[ len + 1 ];

  if (Object.assign) {
    return Object.assign.apply(Object, [ target ].concat( others ));
  }

  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);
  others.forEach(function (arg) {
    // Skip over if undefined or null
    if (arg != null) {
      Object.keys(arg).forEach(function (key) {
        to[key] = arg[key];
      });
    }
  });

  return to;
};

/**
 * polyfills array.find
 * @param {Array} array
 * @param {Function} predicate
 */
var find = function (array, predicate) {
  if (array.find) {
    return array.find(predicate);
  }

  var result;
  array.some(function (item) {
    if (predicate(item)) {
      result = item;
      return true;
    }

    return false;
  });

  return result;
};

/**
 * Gets the rules from a binding value or the element dataset.
 *
 * @param {String} expression The binding expression.
 * @param {Object|String} value The binding value.
 * @param {element} el The element.
 * @returns {String|Object}
 */
var getRules = function (expression, value, el) {
  if (! expression) {
    return getDataAttribute(el, 'rules');
  }

  if (typeof value === 'string') {
    return value;
  }

  if (~['string', 'object'].indexOf(typeof value.rules)) {
    return value.rules;
  }

  return value;
};

/* eslint-disable prefer-rest-params */
var Dictionary = function Dictionary(dictionary) {
  if ( dictionary === void 0 ) dictionary = {};

  this.dictionary = {};
  this.merge(dictionary);
};

Dictionary.prototype.hasLocale = function hasLocale (locale) {
  return !! this.dictionary[locale];
};

Dictionary.prototype.getMessage = function getMessage (locale, key, fallback) {
  if (! this.hasMessage(locale, key)) {
    return fallback || this._getDefaultMessage(locale);
  }

  return this.dictionary[locale].messages[key];
};

Dictionary.prototype._getDefaultMessage = function _getDefaultMessage (locale) {
  if (this.hasMessage(locale, '_default')) {
    return this.dictionary[locale].messages._default;
  }

  return this.dictionary.en.messages._default;
};

Dictionary.prototype.getAttribute = function getAttribute (locale, key, fallback) {
    if ( fallback === void 0 ) fallback = '';

  if (! this.hasAttribute(locale, key)) {
    return fallback;
  }

  return this.dictionary[locale].attributes[key];
};

Dictionary.prototype.hasMessage = function hasMessage (locale, key) {
  return !! (
          this.hasLocale(locale) &&
          this.dictionary[locale].messages &&
          this.dictionary[locale].messages[key]
      );
};

Dictionary.prototype.hasAttribute = function hasAttribute (locale, key) {
  return !! (
          this.hasLocale(locale) &&
          this.dictionary[locale].attributes &&
          this.dictionary[locale].attributes[key]
      );
};

Dictionary.prototype.merge = function merge (dictionary) {
  this._merge(this.dictionary, dictionary);
};

Dictionary.prototype.setMessage = function setMessage (locale, key, message) {
  if (! this.hasLocale(locale)) {
    this.dictionary[locale] = {
      messages: {},
      attributes: {}
    };
  }

  this.dictionary[locale].messages[key] = message;
};

Dictionary.prototype.setAttribute = function setAttribute (locale, key, attribute) {
  if (! this.hasLocale(locale)) {
    this.dictionary[locale] = {
      messages: {},
      attributes: {}
    };
  }

  this.dictionary[locale].attributes[key] = attribute;
};

Dictionary.prototype._merge = function _merge (target, source) {
    var this$1 = this;

  if (! (isObject(target) && isObject(source))) {
    return target;
  }

  Object.keys(source).forEach(function (key) {
    if (isObject(source[key])) {
      if (! target[key]) {
        assign(target, ( obj = {}, obj[key] = {}, obj ));
          var obj;
      }

      this$1._merge(target[key], source[key]);
      return;
    }

    assign(target, ( obj$1 = {}, obj$1[key] = source[key], obj$1 ));
      var obj$1;
  });

  return target;
};

/* istanbul ignore next */
/* eslint-disable max-len */
var messages = {
  _default: function (field) { return ("The " + field + " value is not valid."); },
  alpha_dash: function (field) { return ("The " + field + " field may contain alpha-numeric characters as well as dashes and underscores."); },
  alpha_num: function (field) { return ("The " + field + " field may only contain alpha-numeric characters."); },
  alpha_spaces: function (field) { return ("The " + field + " field may only contain alphabetic characters as well as spaces."); },
  alpha: function (field) { return ("The " + field + " field may only contain alphabetic characters."); },
  between: function (field, ref) {
    var min = ref[0];
    var max = ref[1];

    return ("The " + field + " field must be between " + min + " and " + max + ".");
},
  confirmed: function (field) { return ("The " + field + " confirmation does not match."); },
  credit_card: function (field) { return ("The " + field + " field is invalid."); },
  decimal: function (field, ref) {
    if ( ref === void 0 ) ref = ['*'];
    var decimals = ref[0];

    return ("The " + field + " field must be numeric and may contain " + (decimals === '*' ? '' : decimals) + " decimal points.");
},
  digits: function (field, ref) {
    var length = ref[0];

    return ("The " + field + " field must be numeric and exactly contain " + length + " digits.");
},
  dimensions: function (field, ref) {
    var width = ref[0];
    var height = ref[1];

    return ("The " + field + " field must be " + width + " pixels by " + height + " pixels.");
},
  email: function (field) { return ("The " + field + " field must be a valid email."); },
  ext: function (field) { return ("The " + field + " field must be a valid file."); },
  image: function (field) { return ("The " + field + " field must be an image."); },
  in: function (field) { return ("The " + field + " field must be a valid value."); },
  ip: function (field) { return ("The " + field + " field must be a valid ip address."); },
  max: function (field, ref) {
    var length = ref[0];

    return ("The " + field + " field may not be greater than " + length + " characters.");
},
  max_value: function (field, ref) {
    var max = ref[0];

    return ("The " + field + " field must be " + max + " or less.");
},
  mimes: function (field) { return ("The " + field + " field must have a valid file type."); },
  min: function (field, ref) {
    var length = ref[0];

    return ("The " + field + " field must be at least " + length + " characters.");
},
  min_value: function (field, ref) {
    var min = ref[0];

    return ("The " + field + " field must be " + min + " or more.");
},
  not_in: function (field) { return ("The " + field + " field must be a valid value."); },
  numeric: function (field) { return ("The " + field + " field may only contain numeric characters."); },
  regex: function (field) { return ("The " + field + " field format is invalid."); },
  required: function (field) { return ("The " + field + " field is required."); },
  size: function (field, ref) {
    var size = ref[0];

    return ("The " + field + " field must be less than " + size + " KB.");
},
  url: function (field) { return ("The " + field + " field is not a valid URL."); }
};

var after = function (moment) { return function (value, ref) {
  var targetField = ref[0];
  var inclusion = ref[1];
  var format = ref[2];

  var field = document.querySelector(("input[name='" + targetField + "']"));
  if (typeof format === 'undefined') {
    format = inclusion;
    inclusion = false;
  }
  var dateValue = moment(value, format, true);
  var otherValue = moment(field ? field.value : targetField, format, true);

  // if either is not valid.
  if (! dateValue.isValid() || ! otherValue.isValid()) {
    return false;
  }

  return dateValue.isAfter(otherValue) || (inclusion && dateValue.isSame(otherValue));
}; };

var before = function (moment) { return function (value, ref) {
  var targetField = ref[0];
  var inclusion = ref[1];
  var format = ref[2];

  var field = document.querySelector(("input[name='" + targetField + "']"));
  if (typeof format === 'undefined') {
    format = inclusion;
    inclusion = false;
  }
  var dateValue = moment(value, format, true);
  var otherValue = moment(field ? field.value : targetField, format, true);

  // if either is not valid.
  if (! dateValue.isValid() || ! otherValue.isValid()) {
    return false;
  }

  return dateValue.isBefore(otherValue) || (inclusion && dateValue.isSame(otherValue));
}; };

var date_format = function (moment) { return function (value, ref) {
	var format = ref[0];

	return moment(value, format, true).isValid();
 }	};

var date_between = function (moment) { return function (value, params) {
  var min;
  var max;
  var format;
  var inclusivity = '()';

  if (params.length > 3) {
    var assign;
    (assign = params, min = assign[0], max = assign[1], inclusivity = assign[2], format = assign[3]);
  } else {
    var assign$1;
    (assign$1 = params, min = assign$1[0], max = assign$1[1], format = assign$1[2]);
  }

  var minDate = moment(min, format, true);
  var maxDate = moment(max, format, true);
  var dateVal = moment(value, format, true);

  if (! (minDate.isValid() && maxDate.isValid() && dateVal.isValid())) {
    return false;
  }

  return dateVal.isBetween(minDate, maxDate, 'days', inclusivity);
}; };

/* istanbul ignore next */
/* eslint-disable max-len */
var messages$1 = {
  after: function (field, ref) {
    var target = ref[0];

    return ("The " + field + " must be after " + target + ".");
},
  before: function (field, ref) {
    var target = ref[0];

    return ("The " + field + " must be before " + target + ".");
},
  date_between: function (field, ref) {
    var min = ref[0];
    var max = ref[1];

    return ("The " + field + " must be between " + min + " and " + max + ".");
},
  date_format: function (field, ref) {
    var format = ref[0];

    return ("The " + field + " must be in the format " + format + ".");
}
};

var date = {
  make: function (moment) { return ({
    date_format: date_format(moment),
    after: after(moment),
    before: before(moment),
    date_between: date_between(moment)
  }); },
  messages: messages$1,
  installed: false
};

var LOCALE = 'en';
var STRICT_MODE = true;
var DICTIONARY = new Dictionary({
  en: {
    messages: messages,
    attributes: {}
  }
});

var Validator = function Validator(validations, options) {
  if ( options === void 0 ) options = { init: true };

  this.strictMode = STRICT_MODE;
  this.$scopes = { __global__: {} };
  this._createFields(validations);
  this.errorBag = new ErrorBag();
  this.fieldBag = {};
  // Some fields will be later evaluated, because the vm isn't mounted yet
  // so it may register it under an inaccurate scope.
  this.$deferred = [];
  this.$ready = false;

  // if momentjs is present, install the validators.
  if (typeof moment === 'function') {
    // eslint-disable-next-line
    this.installDateTimeValidators(moment);
  }

  if (options.init) {
    this.init();
  }
};

var prototypeAccessors = { dictionary: {},locale: {},rules: {} };

/**
 * @return {Dictionary}
 */
prototypeAccessors.dictionary.get = function () {
  return DICTIONARY;
};

/**
 * @return {String}
 */
prototypeAccessors.locale.get = function () {
  return LOCALE;
};

/**
 * @return {Object}
 */
prototypeAccessors.rules.get = function () {
  return Rules;
};

/**
 * Merges a validator object into the Rules and Messages.
 *
 * @param{string} name The name of the validator.
 * @param{function|object} validator The validator object.
 */
Validator._merge = function _merge (name, validator) {
  if (isCallable(validator)) {
    Rules[name] = validator;
    return;
  }

  Rules[name] = validator.validate;
  if (isCallable(validator.getMessage)) {
    DICTIONARY.setMessage(LOCALE, name, validator.getMessage);
  }

  if (validator.messages) {
    DICTIONARY.merge(
      Object.keys(validator.messages).reduce(function (prev, curr) {
        var dict = prev;
        dict[curr] = {
          messages: ( obj = {}, obj[name] = validator.messages[curr], obj )
        };
          var obj;

        return dict;
      }, {})
    );
  }
};

/**
 * Guards from extnsion violations.
 *
 * @param{string} name name of the validation rule.
 * @param{object} validator a validation rule object.
 */
Validator._guardExtend = function _guardExtend (name, validator) {
  if (Rules[name]) {
    throw new ValidatorException(
      ("Extension Error: There is an existing validator with the same name '" + name + "'.")
    );
  }

  if (isCallable(validator)) {
    return;
  }

  if (! isCallable(validator.validate)) {
    throw new ValidatorException(
      // eslint-disable-next-line
      ("Extension Error: The validator '" + name + "' must be a function or have a 'validate' method.")
    );
  }

  if (! isCallable(validator.getMessage) && ! isObject(validator.messages)) {
    throw new ValidatorException(
      // eslint-disable-next-line
      ("Extension Error: The validator '" + name + "' must have a 'getMessage' method or have a 'messages' object.")
    );
  }
};

/**
 * Static constructor.
 *
 * @param{object} validations The validations object.
 * @return {Validator} validator A validator object.
 */
Validator.create = function create (validations, $vm, options) {
  return new Validator(validations, $vm, options);
};

/**
 * Adds a custom validator to the list of validation rules.
 *
 * @param{string} name The name of the validator.
 * @param{object|function} validator The validator object/function.
 */
Validator.extend = function extend (name, validator) {
  Validator._guardExtend(name, validator);
  Validator._merge(name, validator);
};

/**
 * Installs the datetime validators and the messages.
 */
Validator.installDateTimeValidators = function installDateTimeValidators (moment) {
  if (typeof moment !== 'function') {
    warn('To use the date-time validators you must provide moment reference.');

    return false;
  }

  if (date.installed) {
    return true;
  }

  var validators = date.make(moment);
  Object.keys(validators).forEach(function (name) {
    Validator.extend(name, validators[name]);
  });

  Validator.updateDictionary({
    en: {
      messages: date.messages
    }
  });
  date.installed = true;

  return true;
};

/**
 * Removes a rule from the list of validators.
 * @param {String} name The name of the validator/rule.
 */
Validator.remove = function remove (name) {
  delete Rules[name];
};

/**
 * Sets the default locale for all validators.
 *
 * @param {String} language The locale id.
 */
Validator.setLocale = function setLocale (language) {
    if ( language === void 0 ) language = 'en';

  /* istanbul ignore if */
  if (! DICTIONARY.hasLocale(language)) {
    // eslint-disable-next-line
    warn('You are setting the validator locale to a locale that is not defined in the dicitionary. English messages may still be generated.');
  }

  LOCALE = language;
};

/**
 * Sets the operating mode for all newly created validators.
 * strictMode = true: Values without a rule are invalid and cause failure.
 * strictMode = false: Values without a rule are valid and are skipped.
 * @param {Boolean} strictMode.
 */
Validator.setStrictMode = function setStrictMode (strictMode) {
    if ( strictMode === void 0 ) strictMode = true;

  STRICT_MODE = strictMode;
};

/**
 * Updates the dicitionary, overwriting existing values and adding new ones.
 *
 * @param{object} data The dictionary object.
 */
Validator.updateDictionary = function updateDictionary (data) {
  DICTIONARY.merge(data);
};

Validator.addLocale = function addLocale (locale) {
  if (! locale.name) {
    warn('Your locale must have a name property');
    return;
  }

  this.updateDictionary(( obj = {}, obj[locale.name] = locale, obj ));
    var obj;
};

Validator.prototype.addLocale = function addLocale (locale) {
  Validator.addLocale(locale);
};

/**
 * Resolves the scope value. Only strings and functions are allowed.
 * @param {Function|String} scope
 * @returns {String}
 */
Validator.prototype._resolveScope = function _resolveScope (scope) {
  if (typeof scope === 'string') {
    return scope;
  }

  // The resolved value should be string.
  if (isCallable(scope)) {
    var value = scope();
    return typeof value === 'string' ? value : '__global__';
  }

  return '__global__';
};

/**
 * Resolves the field values from the getter functions.
 */
Validator.prototype._resolveValuesFromGetters = function _resolveValuesFromGetters (scope) {
    var this$1 = this;
    if ( scope === void 0 ) scope = '__global__';

  if (! this.$scopes[scope]) {
    return {};
  }
  var values = {};
  Object.keys(this.$scopes[scope]).forEach(function (name) {
    var field = this$1.$scopes[scope][name];
    var getter = field.getter;
    var context = field.context;
    var fieldScope = this$1._resolveScope(field.scope);
    if (getter && context && (scope === '__global__' || fieldScope === scope)) {
      values[name] = {
        value: getter(context()),
        scope: fieldScope
      };
    }
  });

  return values;
};

/**
 * Creates the fields to be validated.
 *
 * @param{object} validations
 * @return {object} Normalized object.
 */
Validator.prototype._createFields = function _createFields (validations) {
    var this$1 = this;

  if (! validations) {
    return;
  }

  Object.keys(validations).forEach(function (field) {
    this$1._createField(field, validations[field]);
  });
};

/**
 * Creates a field entry in the fields object.
 * @param {String} name.
 * @param {String|Array} checks.
 */
Validator.prototype._createField = function _createField (name, checks, scope) {
    if ( scope === void 0 ) scope = '__global__';

  scope = this._resolveScope(scope);
  if (! this.$scopes[scope]) {
    this.$scopes[scope] = {};
  }

  if (! this.$scopes[scope][name]) {
    this.$scopes[scope][name] = {};
  }

  var field = this.$scopes[scope][name];
  field.validations = this._normalizeRules(name, checks, scope);
  field.required = this._isRequired(field);
};

/**
 * Normalizes rules.
 * @return {Object}
 */
Validator.prototype._normalizeRules = function _normalizeRules (name, checks, scope) {
  if (! checks) { return {}; }

  if (typeof checks === 'string') {
    return this._normalizeString(checks);
  }

  if (! isObject(checks)) {
    warn(("Your checks for '" + scope + "." + name + "' must be either a string or an object."));
    return {};
  }

  return this._normalizeObject(checks);
};

/**
 * Checks if a field has a required rule.
 */
Validator.prototype._isRequired = function _isRequired (field) {
  return field.validations && field.validations.required;
};

/**
 * Normalizes an object of rules.
 */
Validator.prototype._normalizeObject = function _normalizeObject (rules) {
    var this$1 = this;

  var validations = {};
  Object.keys(rules).forEach(function (rule) {
    var params = [];
    if (rules[rule] === true) {
      params = [];
    } else if (Array.isArray(rules[rule])) {
      params = rules[rule];
    } else {
      params = [rules[rule]];
    }

    if (rules[rule] === false) {
      delete validations[rule];
    } else {
      validations[rule] = params;
    }

    if (date.installed && this$1._isADateRule(rule)) {
      var dateFormat = this$1._getDateFormat(validations);

      if (! this$1._containsValidation(validations[rule], dateFormat)) {
        validations[rule].push(this$1._getDateFormat(validations));
      }
    }
  });

  return validations;
};

/**
 * Date rules need the existance of a format, so date_format must be supplied.
 * @param {String} name The rule name.
 * @param {Array} validations the field validations.
 */
Validator.prototype._getDateFormat = function _getDateFormat (validations) {
  if (validations.date_format && Array.isArray(validations.date_format)) {
    return validations.date_format[0];
  }

  return null;
};

/**
 * Checks if the passed rule is a date rule.
 */
Validator.prototype._isADateRule = function _isADateRule (rule) {
  return !! ~['after', 'before', 'date_between'].indexOf(rule);
};

/**
 * Checks if the passed validation appears inside the array.
 */
Validator.prototype._containsValidation = function _containsValidation (validations, validation) {
  return !! ~validations.indexOf(validation);
};

/**
 * Normalizes string rules.
 * @param {String} rules The rules that will be normalized.
 * @param {Object} field The field object that is being operated on.
 */
Validator.prototype._normalizeString = function _normalizeString (rules) {
    var this$1 = this;

  var validations = {};
  rules.split('|').forEach(function (rule) {
    var parsedRule = this$1._parseRule(rule);
    if (! parsedRule.name) {
      return;
    }

    if (parsedRule.name === 'required') {
      validations.required = true;
    }

    validations[parsedRule.name] = parsedRule.params;
    if (date.installed && this$1._isADateRule(parsedRule.name)) {
      var dateFormat = this$1._getDateFormat(validations);

      if (! this$1._containsValidation(validations[parsedRule.name], dateFormat)) {
        validations[parsedRule.name].push(this$1._getDateFormat(validations));
      }
    }
  });

  return validations;
};

/**
 * Normalizes a string rule.
 *
 * @param {string} rule The rule to be normalized.
 * @return {object} rule The normalized rule.
 */
Validator.prototype._parseRule = function _parseRule (rule) {
  var params = [];
  var name = rule.split(':')[0];

  if (~rule.indexOf(':')) {
    params = rule.split(':').slice(1).join(':').split(',');
  }

  return { name: name, params: params };
};

/**
 * Formats an error message for field and a rule.
 *
 * @param{string} field The field name.
 * @param{object} rule Normalized rule object.
 * @param {object} data Additional Information about the validation result.
 * @param {string} scope The field scope.
 * @return {string} Formatted error message.
 */
Validator.prototype._formatErrorMessage = function _formatErrorMessage (field, rule, data, scope) {
    if ( data === void 0 ) data = {};
    if ( scope === void 0 ) scope = '__global__';

  var name = this._getFieldDisplayName(field, scope);
  var params = this._getLocalizedParams(rule, scope);
  // Defaults to english message.
  if (! this.dictionary.hasLocale(LOCALE)) {
    return this.dictionary.getMessage('en', rule.name)(name, params, data);
  }

  return this.dictionary.getMessage(LOCALE, rule.name)(name, params, data);
};

/**
 * Translates the parameters passed to the rule (mainly for target fields).
 */
Validator.prototype._getLocalizedParams = function _getLocalizedParams (rule, scope) {
    if ( scope === void 0 ) scope = '__global__';

  if (~ ['after', 'before', 'confirmed'].indexOf(rule.name) &&
      rule.params && rule.params[0]) {
    var param = this.$scopes[scope][rule.params[0]];
    if (param && param.name) { return [param.name]; }
    return [this.dictionary.getAttribute(LOCALE, rule.params[0], rule.params[0])];
  }

  return rule.params;
};

/**
 * Resolves an appropiate display name, first checking 'data-as' or the registered 'prettyName'
 * Then the dictionary, then fallsback to field name.
 * @return {String} displayName The name to be used in the errors.
 */
Validator.prototype._getFieldDisplayName = function _getFieldDisplayName (field, scope) {
    if ( scope === void 0 ) scope = '__global__';

  return this.$scopes[scope][field].as || this.dictionary.getAttribute(LOCALE, field, field);
};

/**
 * Tests a single input value against a rule.
 *
 * @param{*} name The name of the field.
 * @param{*} valuethe value of the field.
 * @param{object} rule the rule object.
 * @param {scope} scope The field scope.
 * @return {boolean} Whether it passes the check.
 */
Validator.prototype._test = function _test (name, value, rule, scope) {
    var this$1 = this;
    if ( scope === void 0 ) scope = '__global__';

  var validator = Rules[rule.name];
  if (! validator || typeof validator !== 'function') {
    throw new ValidatorException(("No such validator '" + (rule.name) + "' exists."));
  }

  var result = validator(value, rule.params, name);

  // If it is a promise.
  if (isCallable(result.then)) {
    return result.then(function (values) {
      var allValid = true;
      var data = {};
      if (Array.isArray(values)) {
        allValid = values.every(function (t) { return t.valid; });
      } else { // Is a single object.
        allValid = values.valid;
        data = values.data;
      }

      if (! allValid) {
        this$1.errorBag.add(
                      name,
                      this$1._formatErrorMessage(name, rule, data, scope),
                      rule.name,
                      scope
                  );
      }

      return allValid;
    });
  }

  if (! isObject(result)) {
    result = { valid: result, data: {} };
  }

  if (! result.valid) {
    this.errorBag.add(
              name,
              this._formatErrorMessage(name, rule, result.data, scope),
              rule.name,
              scope
          );
  }

  return result.valid;
};

/**
 * Adds an event listener for a specific field.
 * @param {String} name
 * @param {String} fieldName
 * @param {Function} callback
 */
Validator.prototype.on = function on (name, fieldName, callback) {
  if (! fieldName) {
    throw new ValidatorException(("Cannot add a listener for non-existent field " + fieldName + "."));
  }

  if (! isCallable(callback)) {
    throw new ValidatorException(("The " + name + " callback for field " + fieldName + " is not callable."));
  }

  var scope = '__global__';
  if (fieldName.indexOf('.') > -1) {
    // if no such field, try the scope form.
    if (! this.$scopes.__global__[name]) {
      var assign$$1;
        (assign$$1 = fieldName.split('.'), scope = assign$$1[0], fieldName = assign$$1[1]);
    }
  }

  this.$scopes[scope][fieldName].events[name] = callback;
};

/**
 * Removes the event listener for a specific field.
 * @param {String} name
 * @param {String} fieldName
 */
Validator.prototype.off = function off (name, fieldName) {
  if (! fieldName) {
    warn(("Cannot remove a listener for non-existent field " + fieldName + "."));
  }

  var scope = '__global__';
  if (fieldName.indexOf('.') > -1) {
    // if no such field, try the scope form.
    if (! this.$scopes.__global__[name]) {
      var assign$$1;
        (assign$$1 = fieldName.split('.'), scope = assign$$1[0], fieldName = assign$$1[1]);
    }
  }
  this.$scopes[scope][fieldName].events[name] = undefined;
};

Validator.prototype._assignFlags = function _assignFlags (field) {
  field.flags = {
    untouched: true,
    touched: false,
    dirty: false,
    pristine: true,
    valid: false,
    invalid: false
  };

  var flagObj = {};
    flagObj[field.name] = field.flags;
  if (field.scope === '__global__') {
    this.fieldBag = assign({}, this.fieldBag, flagObj);
    return;
  }

  var scopeObj = assign({}, this.fieldBag[("$" + (field.scope))], flagObj);

  this.fieldBag = assign({}, this.fieldBag, ( obj = {}, obj[("$" + (field.scope))] = scopeObj, obj ));
    var obj;
};

/**
 * Registers a field to be validated.
 *
 * @param{string} name The field name.
 * @param{String|Array|Object} checks validations expression.
 * @param {string} prettyName Custom name to be used as field name in error messages.
 * @param {Function} getter A function used to retrive a fresh value for the field.
 */
Validator.prototype.attach = function attach (name, checks, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

  var attach = function () {
    options.scope = this$1._resolveScope(options.scope);
    this$1.updateField(name, checks, options);
    var field = this$1.$scopes[options.scope][name];
    field.scope = options.scope;
    field.name = name;
    field.as = options.prettyName;
    field.getter = options.getter;
    field.context = options.context;
    field.listeners = options.listeners || { detach: function detach() {} };
    field.el = field.listeners.el;
    field.events = {};
    this$1._assignFlags(field);

    if (field.listeners.classes) {
      field.listeners.classes.attach(field);
    }
    this$1._setAriaRequiredAttribute(field);
    this$1._setAriaValidAttribute(field, true);
    // if initial modifier is applied, validate immediatly.
    if (options.initial) {
      this$1.validate(name, field.getter(field.context()), field.scope).catch(function () {});
    }
  };

  var scope = isCallable(options.scope) ? options.scope() : options.scope;
  if (! scope && ! this.$ready) {
    this.$deferred.push(attach);
    return;
  }

  attach();
};

/**
 * Initializes the non-scoped fields and any bootstrap logic.
 */
Validator.prototype.init = function init () {
  this.$ready = true;
  this.$deferred.forEach(function (attach) {
    attach();
  });
  this.$deferred = [];

  return this;
};

/**
 * Sets the flags on a field.
 *
 * @param {String} name
 * @param {Object} flags
 */
Validator.prototype.flag = function flag (name, flags) {
  var ref = name.split('.');
    var scope = ref[0];
    var fieldName = ref[1];
  if (!fieldName) {
    fieldName = scope;
    scope = null;
  }
  var field = scope ? getPath((scope + "." + fieldName), this.$scopes) : this.$scopes[fieldName];
  if (! field) {
    return;
  }

  Object.keys(field.flags).forEach(function (flag) {
    field.flags[flag] = flags[flag] !== undefined ? flags[flag] : field.flags[flag];
  });
  field.listeners.classes.sync();
};

/**
 * Append another validation to an existing field.
 *
 * @param{string} name The field name.
 * @param{string} checks validations expression.
 */
Validator.prototype.append = function append (name, checks, options) {
    if ( options === void 0 ) options = {};

  options.scope = this._resolveScope(options.scope);
  // No such field
  if (! this.$scopes[options.scope] || ! this.$scopes[options.scope][name]) {
    this.attach(name, checks, options);
  }

  var field = this.$scopes[options.scope][name];
  var newChecks = this._normalizeRules(name, checks, options.scope);
  Object.keys(newChecks).forEach(function (key) {
    field.validations[key] = newChecks[key];
  });
};

/**
 * Updates the field rules with new ones.
 */
Validator.prototype.updateField = function updateField (name, checks, options) {
    if ( options === void 0 ) options = {};

  var field = getPath(((options.scope) + "." + name), this.$scopes, null);
  var oldChecks = field ? JSON.stringify(field.validations) : '';
  this._createField(name, checks, options.scope);
  field = getPath(((options.scope) + "." + name), this.$scopes, null);
  var newChecks = field ? JSON.stringify(field.validations) : '';

  // compare both newChecks and oldChecks to make sure we don't trigger uneccessary directive
  // update by changing the errorBag (prevents infinite loops).
  if (newChecks !== oldChecks) {
    this.errorBag.remove(name, options.scope);
  }
};

/**
 * Removes a field from the validator.
 *
 * @param{String} name The name of the field.
 * @param {String} scope The name of the field scope.
 */
Validator.prototype.detach = function detach (name, scope) {
    if ( scope === void 0 ) scope = '__global__';

  // No such field.
  if (! this.$scopes[scope] || ! this.$scopes[scope][name]) {
    return;
  }

  this.$scopes[scope][name].listeners.detach();
  this.errorBag.remove(name, scope);
  delete this.$scopes[scope][name];
};

/**
 * Adds a custom validator to the list of validation rules.
 *
 * @param{string} name The name of the validator.
 * @param{object|function} validator The validator object/function.
 */
Validator.prototype.extend = function extend (name, validator) {
  Validator.extend(name, validator);
};

/**
 * Gets the internal errorBag instance.
 *
 * @return {ErrorBag} errorBag The internal error bag object.
 */
Validator.prototype.getErrors = function getErrors () {
  return this.errorBag;
};

/**
 * Just an alias to the static method for convienece.
 */
Validator.prototype.installDateTimeValidators = function installDateTimeValidators (moment) {
  Validator.installDateTimeValidators(moment);
};

/**
 * Removes a rule from the list of validators.
 * @param {String} name The name of the validator/rule.
 */
Validator.prototype.remove = function remove (name) {
  Validator.remove(name);
};

/**
 * Sets the validator current langauge.
 *
 * @param {string} language locale or language id.
 */
Validator.prototype.setLocale = function setLocale (language) {
  /* istanbul ignore if */
  if (! this.dictionary.hasLocale(language)) {
    // eslint-disable-next-line
    warn('You are setting the validator locale to a locale that is not defined in the dicitionary. English messages may still be generated.');
  }

  LOCALE = language;
};

/**
 * Sets the operating mode for this validator.
 * strictMode = true: Values without a rule are invalid and cause failure.
 * strictMode = false: Values without a rule are valid and are skipped.
 * @param {Boolean} strictMode.
 */
Validator.prototype.setStrictMode = function setStrictMode (strictMode) {
    if ( strictMode === void 0 ) strictMode = true;

  this.strictMode = strictMode;
};

/**
 * Updates the messages dicitionary, overwriting existing values and adding new ones.
 *
 * @param{object} data The messages object.
 */
Validator.prototype.updateDictionary = function updateDictionary (data) {
  Validator.updateDictionary(data);
};

/**
 * Adds a scope.
 */
Validator.prototype.addScope = function addScope (scope) {
  if (scope && ! this.$scopes[scope]) {
    this.$scopes[scope] = {};
  }
};

/**
 * Validates a value against a registered field validations.
 *
 * @param{string} name the field name.
 * @param{*} value The value to be validated.
 * @param {String} scope The scope of the field.
 * @param {Boolean} throws If it should throw.
 * @return {Promise}
 */
Validator.prototype.validate = function validate (name, value, scope, throws) {
    var this$1 = this;
    if ( scope === void 0 ) scope = '__global__';
    if ( throws === void 0 ) throws = true;

  if (name && name.indexOf('.') > -1) {
    // no such field, try the scope form.
    if (! this.$scopes.__global__[name]) {
      var assign$$1;
        (assign$$1 = name.split('.'), scope = assign$$1[0], name = assign$$1[1]);
    }
  }
  if (! scope) { scope = '__global__'; }
  if (! this.$scopes[scope] || ! this.$scopes[scope][name]) {
    if (! this.strictMode) { return Promise.resolve(true); }

    var fullName = scope === '__global__' ? name : (scope + "." + name);
    warn(("Validating a non-existant field: \"" + fullName + "\". Use \"attach()\" first."));

    throw new ValidatorException('Validation Failed');
  }

  var field = this.$scopes[scope][name];
  this.errorBag.remove(name, scope);
  // if its not required and is empty or null or undefined then it passes.
  if (! field.required && ~[null, undefined, ''].indexOf(value)) {
    this._setAriaValidAttribute(field, true);
    if (field.events && isCallable(field.events.after)) {
      field.events.after({ valid: true });
    }
    return Promise.resolve(true);
  }

  try {
    var promises = Object.keys(field.validations).map(function (rule) {
      var result = this$1._test(
        name,
        value,
        { name: rule, params: field.validations[rule] },
        scope
      );

      if (isCallable(result.then)) {
        return result;
      }

      // Early exit.
      if (! result) {
        if (field.events && isCallable(field.events.after)) {
          field.events.after({ valid: false });
        }
        throw new ValidatorException('Validation Aborted.');
      }

      if (field.events && isCallable(field.events.after)) {
        field.events.after({ valid: true });
      }
      return Promise.resolve(result);
    });

    return Promise.all(promises).then(function (values) {
      var valid = values.every(function (t) { return t; });
      this$1._setAriaValidAttribute(field, valid);

      if (! valid && throws) {
        if (field.events && isCallable(field.events.after)) {
          field.events.after({ valid: false });
        }
        throw new ValidatorException('Failed Validation');
      }
      return valid;
    });
  } catch (error) {
    if (error.msg === '[vee-validate]: Validation Aborted.') {
      if (field.events && isCallable(field.events.after)) {
        field.events.after({ valid: false });
      }
      return Promise.resolve(false);
    }

    throw error;
  }
};

/**
 * Sets the aria-invalid attribute on the element.
 */
Validator.prototype._setAriaValidAttribute = function _setAriaValidAttribute (field, valid) {
  if (! field.el || field.listeners.component) {
    return;
  }

  field.el.setAttribute('aria-invalid', !valid);
};

/**
 * Sets the aria-required attribute on the element.
 */
Validator.prototype._setAriaRequiredAttribute = function _setAriaRequiredAttribute (field) {
  if (! field.el || field.listeners.component) {
    return;
  }

  field.el.setAttribute('aria-required', !! field.required);
};

/**
 * Validates each value against the corresponding field validations.
 * @param{object} values The values to be validated.
 * @param{String} scope The scope to be applied on validation.
 * @return {Promise} Returns a promise with the validation result.
 */
Validator.prototype.validateAll = function validateAll (values, scope) {
    var this$1 = this;
    if ( scope === void 0 ) scope = '__global__';

  var normalizedValues;
  if (! values || typeof values === 'string') {
    this.errorBag.clear(values);
    normalizedValues = this._resolveValuesFromGetters(values);
  } else {
    normalizedValues = {};
    Object.keys(values).forEach(function (key) {
      normalizedValues[key] = {
        value: values[key],
        scope: scope
      };
    });
  }
  var promises = Object.keys(normalizedValues).map(function (property) { return this$1.validate(
    property,
    normalizedValues[property].value,
    normalizedValues[property].scope,
    false // do not throw
  ); });

  return Promise.all(promises).then(function (results) {
    var valid = results.every(function (t) { return t; });
    if (! valid) {
      throw new ValidatorException('Validation Failed');
    }

    return valid;
  });
};

/**
 * Validates all scopes.
 * @returns {Promise} All promises resulted from each scope.
 */
Validator.prototype.validateScopes = function validateScopes () {
    var this$1 = this;

  return Promise.all(
    Object.keys(this.$scopes).map(function (scope) { return this$1.validateAll(scope); })
  );
};

Object.defineProperties( Validator.prototype, prototypeAccessors );

var makeMixin = function (Vue, options) { return ({
  computed: ( obj = {}, obj[options.errorBagName] = {
      get: function get() {
        return this.$validator.errorBag;
      }
    }, obj[options.fieldsBagName] = {
      get: function get() {
        return this.$validator.fieldBag;
      }
    }, obj ),
  beforeCreate: function beforeCreate() {
    this.$validator = new Validator(null, { init: false });
    Vue.util.defineReactive(this.$validator, 'errorBag', this.$validator.errorBag);
    Vue.util.defineReactive(this.$validator, 'fieldBag', this.$validator.fieldBag);
  },
  mounted: function mounted() {
    this.$validator.init();
  }
})
  var obj; };

var DEFAULT_CLASS_NAMES = {
  touched: 'touched', // the control has been blurred
  untouched: 'untouched', // the control hasn't been blurred
  valid: 'valid', // model is valid
  invalid: 'invalid', // model is invalid
  pristine: 'pristine', // control has not been interacted with
  dirty: 'dirty' // control has been interacted with
};

var ClassListener = function ClassListener(el, validator, options) {
  if ( options === void 0 ) options = {};

  this.el = el;
  this.validator = validator;
  this.enabled = options.enableAutoClasses;
  this.classNames = assign({}, DEFAULT_CLASS_NAMES, options.classNames || {});
  this.component = options.component;
  this.listeners = {};
};

/**
 * Resets the classes state.
 */
ClassListener.prototype.reset = function reset () {
  // detach all listeners.
  this.detach();

  // remove classes
  this.remove(this.classNames.dirty);
  this.remove(this.classNames.touched);
  this.remove(this.classNames.valid);
  this.remove(this.classNames.invalid);

  // listen again.
  this.attach(this.field);
};

/**
 * Syncs the automatic classes.
 */
ClassListener.prototype.sync = function sync () {
  if (! this.enabled) { return; }

  this.toggle(this.classNames.dirty, this.field.flags.dirty);
  this.toggle(this.classNames.pristine, this.field.flags.pristine);
  this.toggle(this.classNames.valid, this.field.flags.valid);
  this.toggle(this.classNames.invalid, this.field.flags.invalid);
  this.toggle(this.classNames.touched, this.field.flags.touched);
  this.toggle(this.classNames.untouched, this.field.flags.untouched);
};

/**
 * Attach field with its listeners.
 * @param {*} field
 */
ClassListener.prototype.attach = function attach (field) {
    var this$1 = this;

  this.field = field;
  this.add(this.classNames.pristine);
  this.add(this.classNames.untouched);

  // listen for focus event.
  this.listeners.focus = function () {
    this$1.remove(this$1.classNames.untouched);
    this$1.add(this$1.classNames.touched);
    // only needed once.
    this$1.el.removeEventListener('focus', this$1.listeners.focus);
    this$1.field.flags.touched = true;
    this$1.field.flags.untouched = false;
  };

  // listen for input.
  this.listeners.input = function () {
    this$1.remove(this$1.classNames.pristine);
    this$1.add(this$1.classNames.dirty);
    // only needed once.
    this$1.el.removeEventListener('input', this$1.listeners.input);
    this$1.field.flags.dirty = true;
    this$1.field.flags.pristine = false;
  };

  this.listeners.after = function (e) {
    this$1.remove(e.valid ? this$1.classNames.invalid : this$1.classNames.valid);
    this$1.add(e.valid ? this$1.classNames.valid : this$1.classNames.invalid);
    this$1.field.flags.valid = e.valid;
    this$1.field.flags.invalid = ! e.valid;
  };

  if (this.component) {
    this.component.$on('input', this.listeners.input);
    this.component.$on('focus', this.listeners.focus);
  } else {
    this.el.addEventListener('focus', this.listeners.focus);
    this.el.addEventListener('input', this.listeners.input);
  }
  this.validator.on('after', ((this.field.scope) + "." + (this.field.name)), this.listeners.after);
};

/**
 * Detach all listeners.
 */
ClassListener.prototype.detach = function detach () {
  // TODO: Why could the field be undefined?
  if (! this.field) { return; }

  if (this.component) {
    this.component.$off('input', this.listeners.input);
    this.component.$off('focus', this.listeners.focus);
  } else {
    this.el.removeEventListener('focus', this.listeners.focus);
    this.el.removeEventListener('input', this.listeners.input);
  }
  this.validator.off('after', ((this.field.scope) + "." + (this.field.name)));
};

/**
 * Add a class.
 * @param {*} className
 */
ClassListener.prototype.add = function add (className) {
  if (! this.enabled || this.component) { return; }

  addClass(this.el, className);
};

/**
 * Remove a class.
 * @param {*} className
 */
ClassListener.prototype.remove = function remove (className) {
  if (! this.enabled || this.component) { return; }

  removeClass(this.el, className);
};

/**
 * Toggles the class name.
 *
 * @param {String} className
 * @param {Boolean} status
 */
ClassListener.prototype.toggle = function toggle (className, status) {
  if (status) {
    this.add(className);
    return;
  }

  this.remove(className);
};

var ListenerGenerator = function ListenerGenerator(el, binding, vnode, options) {
  this.unwatch = undefined;
  this.callbacks = [];
  this.el = el;
  this.scope = isObject(binding.value) ? binding.value.scope : getScope(el);
  this.binding = binding;
  this.vm = vnode.context;
  this.component = vnode.child;
  this.options = options;
  this.fieldName = this._resolveFieldName();
  this.model = this._resolveModel(vnode.data.directives);
  this.classes = new ClassListener(el, this.vm.$validator, {
    component: this.component,
    enableAutoClasses: options.enableAutoClasses,
    classNames: options.classNames
  });
};

/**
 * Checks if the node directives contains a v-model.
 */
ListenerGenerator.prototype._resolveModel = function _resolveModel (directives) {
  var expRegex = /^[a-z_]+[0-9]*(\w*\.[a-z_]\w*)*$/i;
  var model = find(directives, function (d) { return d.name === 'model' && expRegex.test(d.expression); });

  return model && this._isExistingPath(model.expression) && model.expression;
};

/**
 * @param {String} path
 */
ListenerGenerator.prototype._isExistingPath = function _isExistingPath (path) {
  var obj = this.vm;
  return path.split('.').every(function (prop) {
    if (! Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }

    obj = obj[prop];

    return true;
  });
};

  /**
   * Resolves the field name to trigger validations.
   * @return {String} The field name.
   */
ListenerGenerator.prototype._resolveFieldName = function _resolveFieldName () {
  if (this.component) {
    return getDataAttribute(this.el, 'name') || this.component.name;
  }

  return getDataAttribute(this.el, 'name') || this.el.name;
};

  /**
   * Determines if the validation rule requires additional listeners on target fields.
   */
ListenerGenerator.prototype._hasFieldDependency = function _hasFieldDependency (rules) {
    var this$1 = this;

  var fieldName = false;
  if (! rules) {
    return false;
  }

  if (isObject(rules)) {
    Object.keys(rules).forEach(function (r) { // eslint-disable-line
      if (/confirmed|after|before/.test(r)) {
        fieldName = rules[r];

        return false;
      }
    });

    return fieldName;
  }

  rules.split('|').every(function (r) {
    if (/\b(confirmed|after|before):/.test(r)) {
      fieldName = r.split(':')[1];
      return false;
    }

    if (/\b(confirmed)/.test(r)) {
      fieldName = (this$1.fieldName) + "_confirmation";
      return false;
    }

    return true;
  });

  return fieldName;
};

  /**
   * Validates input value, triggered by 'input' event.
   */
ListenerGenerator.prototype._inputListener = function _inputListener () {
  return this._validate(this.el.value);
};

  /**
   * Validates files, triggered by 'change' event.
   */
ListenerGenerator.prototype._fileListener = function _fileListener () {
    var this$1 = this;

  return this._validate(toArray(this.el.files)).then(function (isValid) {
    if (! isValid && this$1.binding.modifiers.reject) {
      this$1.el.value = '';
    }
  });
};

  /**
   * Validates radio buttons, triggered by 'change' event.
   */
ListenerGenerator.prototype._radioListener = function _radioListener () {
  var checked = document.querySelector(("input[name=\"" + (this.el.name) + "\"]:checked"));
  return this._validate(checked ? checked.value : null);
};

  /**
   * Validates checkboxes, triggered by change event.
   */
ListenerGenerator.prototype._checkboxListener = function _checkboxListener () {
    var this$1 = this;

  var checkedBoxes = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]:checked"));
  if (! checkedBoxes || ! checkedBoxes.length) {
    this._validate(null);
    return;
  }

  toArray(checkedBoxes).forEach(function (box) {
    this$1._validate(box.value);
  });
};

  /**
   * Trigger the validation for a specific value.
   */
ListenerGenerator.prototype._validate = function _validate (value) {
  return this.vm.$validator.validate(
    this.fieldName, value, this.scope || getScope(this.el)
    ).catch(function (result) { return result; });
};

  /**
   * Returns a scoped callback, only runs if the el scope is the same as the recieved scope
   * From the event.
   */
ListenerGenerator.prototype._getScopedListener = function _getScopedListener (callback) {
    var this$1 = this;

  return function (scope) {
    if (! scope || scope === this$1.scope || scope instanceof window.Event) {
      callback();
    }
  };
};

  /**
   * Attaches validator event-triggered validation.
   */
ListenerGenerator.prototype._attachValidatorEvent = function _attachValidatorEvent () {
    var this$1 = this;

  var listener = this._getScopedListener(this._getSuitableListener().listener.bind(this));
  var fieldName = this._hasFieldDependency(
      getRules(this.binding.expression, this.binding.value, this.el)
    );
  if (fieldName) {
          // Wait for the validator ready triggered when vm is mounted because maybe
          // the element isn't mounted yet.
    this.vm.$nextTick(function () {
      var target = document.querySelector(("input[name='" + fieldName + "']"));
      if (! target) {
        warn('Cannot find target field, no additional listeners were attached.');
        return;
      }

      var events = getDataAttribute(this$1.el, 'validate-on') || 'input|blur';
      events.split('|').forEach(function (e) {
        target.addEventListener(e, listener, false);
        this$1.callbacks.push({ name: e, listener: listener, el: target });
      });
    });
  }
};

  /**
   * Determines a suitable listener for the element.
   */
ListenerGenerator.prototype._getSuitableListener = function _getSuitableListener () {
  var listener;

  if (this.el.tagName === 'SELECT') {
    return {
      names: ['change', 'blur'],
      listener: this._inputListener
    };
  }

      // determine the suitable listener and events to handle
  switch (this.el.type) {
  case 'file':
    listener = {
      names: ['change'],
      listener: this._fileListener
    };
    break;

  case 'radio':
    listener = {
      names: ['change'],
      listener: this._radioListener
    };
    break;

  case 'checkbox':
    listener = {
      names: ['change'],
      listener: this._checkboxListener
    };
    break;

  default:
    listener = {
      names: ['input', 'blur'],
      listener: this._inputListener
    };
    break;
  }

  // users are able to specify which events they want to validate on
  // pipe separated list of handler names to use
  var events = getDataAttribute(this.el, 'validate-on');
  if (events) {
    listener.names = events.split('|');
  }

  return listener;
};

/**
 * Attaches neccessary validation events for the component.
 */
ListenerGenerator.prototype._attachComponentListeners = function _attachComponentListeners () {
    var this$1 = this;

  this.componentListener = debounce(function (value) {
    this$1._validate(value);
  }, getDataAttribute(this.el, 'delay') || this.options.delay);

  this.component.$on('input', this.componentListener);
  this.componentPropUnwatch = this.component.$watch('value', this.componentListener);
};

/**
 * Attachs a suitable listener for the input.
 */
ListenerGenerator.prototype._attachFieldListeners = function _attachFieldListeners () {
    var this$1 = this;

  // If it is a component, use vue events instead.
  if (this.component) {
    this._attachComponentListeners();

    return;
  }

  var handler = this._getSuitableListener();
  var listener = debounce(
    handler.listener.bind(this),
    getDataAttribute(this.el, 'delay') || this.options.delay
  );

  if (~['radio', 'checkbox'].indexOf(this.el.type)) {
    this.vm.$nextTick(function () {
      var elms = document.querySelectorAll(("input[name=\"" + (this$1.el.name) + "\"]"));
      toArray(elms).forEach(function (input) {
        handler.names.forEach(function (handlerName) {
          input.addEventListener(handlerName, listener, false);
          this$1.callbacks.push({ name: handlerName, listener: listener, el: input });
        });
      });
    });

    return;
  }

  handler.names.forEach(function (handlerName) {
    this$1.el.addEventListener(handlerName, listener, false);
    this$1.callbacks.push({ name: handlerName, listener: listener, el: this$1.el });
  });
};

/**
 * Returns a context, getter factory pairs for each input type.
 */
ListenerGenerator.prototype._resolveValueGetter = function _resolveValueGetter () {
    var this$1 = this;

  if (this.component) {
    return {
      context: function () { return this$1.component; },
      getter: function getter(context) {
        return context.value;
      }
    };
  }

  switch (this.el.type) {
  case 'checkbox': return {
    context: function () { return document.querySelectorAll(("input[name=\"" + (this$1.el.name) + "\"]:checked")); },
    getter: function getter(context) {
      if (! context || ! context.length) {
        return null;
      }

      return toArray(context).map(function (checkbox) { return checkbox.value; });
    }
  };
  case 'radio': return {
    context: function () { return document.querySelector(("input[name=\"" + (this$1.el.name) + "\"]:checked")); },
    getter: function getter(context) {
      return context && context.value;
    }
  };
  case 'file': return {
    context: function () { return this$1.el; },
    getter: function getter(context) {
      return toArray(context.files);
    }
  };

  default: return {
    context: function () { return this$1.el; },
    getter: function getter(context) {
      return context.value;
    }
  };
  }
};

/*
* Gets the arg string value, either from the directive or the expression value.
*/
ListenerGenerator.prototype._getArg = function _getArg () {
  // Get it from the directive arg.
  if (this.binding.arg) {
    return this.binding.arg;
  }

  // Get it from v-model.
  if (this.model) {
    return this.model;
  }

  return isObject(this.binding.value) ? this.binding.value.arg : null;
};

/**
 * Attaches model watchers and extra listeners.
 */
ListenerGenerator.prototype._attachModelWatcher = function _attachModelWatcher (arg) {
    var this$1 = this;

  var events = getDataAttribute(this.el, 'validate-on') || 'input|blur';
  var listener = debounce(
    this._getSuitableListener().listener.bind(this),
    getDataAttribute(this.el, 'delay') || this.options.delay
  );
  events.split('|').forEach(function (name) {
    if (~['input', 'change'].indexOf(name)) {
      var debounced = debounce(function (value) {
        this$1.vm.$validator.validate(
          this$1.fieldName, value, this$1.scope || getScope(this$1.el)
        ).catch(function (result) { return result; });
      }, getDataAttribute(this$1.el, 'delay') || this$1.options.delay);
      this$1.unwatch = this$1.vm.$watch(arg, debounced, { deep: true });
      // No need to attach it on element as it will use the vue watcher.
      return;
    }

    this$1.el.addEventListener(name, listener, false);
    this$1.callbacks.push({ name: name, listener: listener, el: this$1.el });
  });
};

/**
 * Attaches the Event Listeners.
 */
ListenerGenerator.prototype.attach = function attach () {
    var this$1 = this;

  var ref = this._resolveValueGetter();
    var context = ref.context;
    var getter = ref.getter;
  this.vm.$validator.attach(
    this.fieldName,
    getRules(this.binding.expression, this.binding.value, this.el), {
      // eslint-disable-next-line
      scope: function () {
        return this$1.scope || getScope(this$1.el);
      },
      prettyName: getDataAttribute(this.el, 'as') || this.el.title,
      context: context,
      getter: getter,
      listeners: this,
      initial: this.binding.modifiers.initial
    }
  );

  if (this.binding.modifiers.disable) {
    return;
  }

  this._attachValidatorEvent();
  var arg = this._getArg();
  if (arg) {
    this._attachModelWatcher(arg);
    return;
  }

  this._attachFieldListeners();
};

  /**
   * Removes all attached event listeners.
   */
ListenerGenerator.prototype.detach = function detach () {
  if (this.component) {
    this.component.$off('input', this.componentListener);
    this.componentPropUnwatch();
  }

  if (this.unwatch) {
    this.unwatch();
  }

  this.classes.detach();

  this.callbacks.forEach(function (h) {
    h.el.removeEventListener(h.name, h.listener);
  });
  this.callbacks = [];
};

var listenersInstances = [];

var makeDirective = function (options) { return ({
  inserted: function inserted(el, binding, vnode) {
    var listener = new ListenerGenerator(el, binding, vnode, options);
    listener.attach();
    listenersInstances.push({ vm: vnode.context, el: el, instance: listener });
  },
  update: function update(el, ref, ref$1) {
    var expression = ref.expression;
    var value = ref.value;
    var context = ref$1.context;

    var ref$2 = find(listenersInstances, function (l) { return l.vm === context && l.el === el; });
    var instance = ref$2.instance;
    // make sure we don't do uneccessary work if no expression was passed
    // nor if the expression did not change.
    if (! expression || (instance.cachedExp === JSON.stringify(value))) { return; }

    instance.cachedExp = JSON.stringify(value);
    var scope = isObject(value) ? (value.scope || getScope(el)) : getScope(el);
    context.$validator.updateField(
      instance.fieldName,
      getRules(expression, value, el),
      { scope: scope || '__global__' }
    );
  },
  unbind: function unbind(el, ref, ref$1) {
    var value = ref.value;
    var context = ref$1.context;

    var holder = find(listenersInstances, function (l) { return l.vm === context && l.el === el; });
    if (typeof holder === 'undefined') {
      return;
    }

    var scope = isObject(value) ? value.scope : (getScope(el) || '__global__');
    context.$validator.detach(holder.instance.fieldName, scope);
    listenersInstances.splice(listenersInstances.indexOf(holder), 1);
  }
}); };

var defaultOptions = {
  locale: 'en',
  delay: 0,
  errorBagName: 'errors',
  dictionary: null,
  strict: true,
  fieldsBagName: 'fields',
  enableAutoClasses: false,
  classNames: {}
};

var normalize = function (fields) {
  if (Array.isArray(fields)) {
    return fields.reduce(function (prev, curr) {
      if (~curr.indexOf('.')) {
        prev[curr.split('.')[1]] = curr;
      } else {
        prev[curr] = curr;
      }

      return prev;
    }, {});
  }

  return fields;
};

/**
 * Maps fields to computed functions.
 *
 * @param {Array|Object} fields
 */
var mapFields = function (fields) {
  var normalized = normalize(fields);
  return Object.keys(normalized).reduce(function (prev, curr) {
    var field = normalized[curr];
    prev[curr] = function mappedField() {
      if (this.$validator.fieldBag[field]) {
        return this.$validator.fieldBag[field];
      }

      var index = field.indexOf('.');
      if (index <= 0) {
        return {};
      }
      var ref = field.split('.');
      var scope = ref[0];
      var name = ref[1];

      return getPath(("$" + scope + "." + name), this.$validator.fieldBag, {});
    };

    return prev;
  }, {});
};

// eslint-disable-next-line
var install = function (Vue, options) {
  var config = assign({}, defaultOptions, options);
  if (config.dictionary) {
    Validator.updateDictionary(config.dictionary);
  }

  Validator.setLocale(config.locale);
  Validator.setStrictMode(config.strict);

  Vue.mixin(makeMixin(Vue, config));
  Vue.directive('validate', makeDirective(config));
};

var index = {
  install: install,
  mapFields: mapFields,
  Validator: Validator,
  ErrorBag: ErrorBag,
  Rules: Rules,
  version: '2.0.0-rc.2'
};

return index;

})));


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(164),
  /* template */
  __webpack_require__(350),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\Calendar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Calendar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ef3bf136", Component.options)
  } else {
    hotAPI.reload("data-v-ef3bf136", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(165),
  /* template */
  __webpack_require__(310),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\DateTimePicker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DateTimePicker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43c48b70", Component.options)
  } else {
    hotAPI.reload("data-v-43c48b70", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(360)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(330),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\GridView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] GridView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6bb484b2", Component.options)
  } else {
    hotAPI.reload("data-v-6bb484b2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(364)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(168),
  /* template */
  __webpack_require__(351),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\ImageUpload.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ImageUpload.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f1fafe36", Component.options)
  } else {
    hotAPI.reload("data-v-f1fafe36", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(355)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(169),
  /* template */
  __webpack_require__(309),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\Sidebar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Sidebar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f1cb985", Component.options)
  } else {
    hotAPI.reload("data-v-3f1cb985", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(333),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\accountchart\\Register.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Register.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74930f4a", Component.options)
  } else {
    hotAPI.reload("data-v-74930f4a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(338),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\BillList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BillList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8fc11914", Component.options)
  } else {
    hotAPI.reload("data-v-8fc11914", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(331),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\BillRegister.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BillRegister.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f46c6fb", Component.options)
  } else {
    hotAPI.reload("data-v-6f46c6fb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(359)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(174),
  /* template */
  __webpack_require__(326),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\BillUpdateForm.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BillUpdateForm.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-646ba085", Component.options)
  } else {
    hotAPI.reload("data-v-646ba085", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(347),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\ContractInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ContractInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e51cc5de", Component.options)
  } else {
    hotAPI.reload("data-v-e51cc5de", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(176),
  /* template */
  __webpack_require__(340),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\DepositModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DepositModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aab71940", Component.options)
  } else {
    hotAPI.reload("data-v-aab71940", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(177),
  /* template */
  __webpack_require__(336),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\PaymentInfoModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PaymentInfoModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ec10b2c", Component.options)
  } else {
    hotAPI.reload("data-v-7ec10b2c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(311),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\ReplaceModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ReplaceModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4623dfec", Component.options)
  } else {
    hotAPI.reload("data-v-4623dfec", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(354)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(306),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\bill\\SearchBill.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SearchBill.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3beef8c0", Component.options)
  } else {
    hotAPI.reload("data-v-3beef8c0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(335),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\CalendarEntry.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CalendarEntry.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7eaa76be", Component.options)
  } else {
    hotAPI.reload("data-v-7eaa76be", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(334),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\ContractEntry.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ContractEntry.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-79adaf6a", Component.options)
  } else {
    hotAPI.reload("data-v-79adaf6a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(184),
  /* template */
  __webpack_require__(319),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\ContractList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ContractList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54fd3ad6", Component.options)
  } else {
    hotAPI.reload("data-v-54fd3ad6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(185),
  /* template */
  __webpack_require__(317),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\ContractRegister.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ContractRegister.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f31de5b", Component.options)
  } else {
    hotAPI.reload("data-v-4f31de5b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(187),
  /* template */
  __webpack_require__(345),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\ContractVilla.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ContractVilla.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cfdbe774", Component.options)
  } else {
    hotAPI.reload("data-v-cfdbe774", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(307),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\Renewal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Renewal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c49dde2", Component.options)
  } else {
    hotAPI.reload("data-v-3c49dde2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(320),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\contract\\TenantRegister.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TenantRegister.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57af5573", Component.options)
  } else {
    hotAPI.reload("data-v-57af5573", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(300),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\expenditures\\ExpenseList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ExpenseList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0939c1c2", Component.options)
  } else {
    hotAPI.reload("data-v-0939c1c2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(302),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\expenditures\\Register.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Register.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28eb0727", Component.options)
  } else {
    hotAPI.reload("data-v-28eb0727", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(192),
  /* template */
  __webpack_require__(329),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\fixed-asset\\FixedAssetList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FixedAssetList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b3e28b9", Component.options)
  } else {
    hotAPI.reload("data-v-6b3e28b9", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(193),
  /* template */
  __webpack_require__(323),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\fixed-asset\\FixedAssetRegister.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FixedAssetRegister.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5db322be", Component.options)
  } else {
    hotAPI.reload("data-v-5db322be", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(194),
  /* template */
  __webpack_require__(303),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\home\\Info.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Info.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a7da507", Component.options)
  } else {
    hotAPI.reload("data-v-2a7da507", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(195),
  /* template */
  __webpack_require__(308),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\payee\\PayeeList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PayeeList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3de1dda8", Component.options)
  } else {
    hotAPI.reload("data-v-3de1dda8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(197),
  /* template */
  __webpack_require__(342),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\reports\\ReportForm.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ReportForm.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6ec8262", Component.options)
  } else {
    hotAPI.reload("data-v-b6ec8262", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(198),
  /* template */
  __webpack_require__(316),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\reports\\ReportList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ReportList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4efa34ae", Component.options)
  } else {
    hotAPI.reload("data-v-4efa34ae", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(199),
  /* template */
  __webpack_require__(312),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\tenant\\TenantList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TenantList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46615b96", Component.options)
  } else {
    hotAPI.reload("data-v-46615b96", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(200),
  /* template */
  __webpack_require__(344),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\tenant\\TenantReg.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TenantReg.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c9afc468", Component.options)
  } else {
    hotAPI.reload("data-v-c9afc468", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(352),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\villa\\VillaList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VillaList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fd5e1598", Component.options)
  } else {
    hotAPI.reload("data-v-fd5e1598", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(202),
  /* template */
  __webpack_require__(321),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\components\\villa\\VillaRegister.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VillaRegister.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c4539b9", Component.options)
  } else {
    hotAPI.reload("data-v-5c4539b9", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(362)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(203),
  /* template */
  __webpack_require__(346),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\containers\\VDialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VDialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e1b8ea5c", Component.options)
  } else {
    hotAPI.reload("data-v-e1b8ea5c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(305),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\containers\\VInputWrapper.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VInputWrapper.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-34b464f3", Component.options)
  } else {
    hotAPI.reload("data-v-34b464f3", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(205),
  /* template */
  __webpack_require__(325),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\containers\\VPanel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VPanel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-603a952c", Component.options)
  } else {
    hotAPI.reload("data-v-603a952c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(206),
  /* template */
  __webpack_require__(327),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\containers\\VTab.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VTab.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-650995fb", Component.options)
  } else {
    hotAPI.reload("data-v-650995fb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(207),
  /* template */
  __webpack_require__(299),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\containers\\VTabGroup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VTabGroup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-064f33f4", Component.options)
  } else {
    hotAPI.reload("data-v-064f33f4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(208),
  /* template */
  __webpack_require__(301),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\Accordion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Accordion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26684ec0", Component.options)
  } else {
    hotAPI.reload("data-v-26684ec0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(357)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(209),
  /* template */
  __webpack_require__(318),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\DataView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DataView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54583fc7", Component.options)
  } else {
    hotAPI.reload("data-v-54583fc7", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(210),
  /* template */
  __webpack_require__(332),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\DateTimePicker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DateTimePicker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f9dfd61", Component.options)
  } else {
    hotAPI.reload("data-v-6f9dfd61", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(211),
  /* template */
  __webpack_require__(313),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\ErrorSpan.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ErrorSpan.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-481ae7ca", Component.options)
  } else {
    hotAPI.reload("data-v-481ae7ca", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(363)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(212),
  /* template */
  __webpack_require__(348),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\GridView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] GridView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e77b013a", Component.options)
  } else {
    hotAPI.reload("data-v-e77b013a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(213),
  /* template */
  __webpack_require__(322),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\Pagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Pagination.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d80e072", Component.options)
  } else {
    hotAPI.reload("data-v-5d80e072", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(214),
  /* template */
  __webpack_require__(337),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\VComboBox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VComboBox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8547d46a", Component.options)
  } else {
    hotAPI.reload("data-v-8547d46a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(356)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(215),
  /* template */
  __webpack_require__(314),
  /* scopeId */
  "data-v-4aaf4ccc",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\VInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VInput.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4aaf4ccc", Component.options)
  } else {
    hotAPI.reload("data-v-4aaf4ccc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(361)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(216),
  /* template */
  __webpack_require__(339),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\VLiveView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VLiveView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ccfd7c2", Component.options)
  } else {
    hotAPI.reload("data-v-9ccfd7c2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(217),
  /* template */
  __webpack_require__(341),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\sunrise_ver_2\\rootapp\\resources\\assets\\js\\plugins\\controls\\VSwitch.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VSwitch.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b2ff34bc", Component.options)
  } else {
    hotAPI.reload("data-v-b2ff34bc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "nav nav-tabs"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-064f33f4", module.exports)
  }
}

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Expenses"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": function($event) {
        _vm.$store.commit('expenditures/redirectToRegister')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Add Expenses")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('v-live-view', {
    attrs: {
      "grid": _vm.gridView
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0939c1c2", module.exports)
  }
}

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-group wrap",
    attrs: {
      "id": "bs-collapse"
    }
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "panel-title"
  }, [_c('a', {
    attrs: {
      "data-toggle": "collapse",
      "data-parent": "#",
      "href": "#one"
    }
  }, [_vm._v("\n                        Collapse item #1\n                    ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse",
    attrs: {
      "id": "one"
    }
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_vm._v("\n                    Where now are the horse and the rider? Where is the horn that was blowing? Where is the helm and the hauberk, and the bright hair flowing?\n                ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "panel-title"
  }, [_c('a', {
    attrs: {
      "data-toggle": "collapse",
      "data-parent": "#",
      "href": "#two"
    }
  }, [_vm._v("\n                        Collapse item #2\n                    ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse",
    attrs: {
      "id": "two"
    }
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_vm._v("\n                    Where is the harp on the harpstring, and the red fire glowing? Where is the spring and the harvest and the tall corn growing?\n                ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "panel-title"
  }, [_c('a', {
    attrs: {
      "data-toggle": "collapse",
      "data-parent": "#",
      "href": "#three"
    }
  }, [_vm._v("\n                        Collapse item #3\n                    ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse",
    attrs: {
      "id": "three"
    }
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_vm._v("\n                    The days have gone down in the West behind the hills into shadow. Who shall gather the smoke of the deadwood burning, Or behold the flowing years from the Sea returning?\n                ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('h4', {
    staticClass: "panel-title"
  }, [_c('a', {
    attrs: {
      "data-toggle": "collapse",
      "data-parent": "#",
      "href": "#four"
    }
  }, [_vm._v("\n                        Collapse item #4\n                    ")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse in",
    attrs: {
      "id": "four"
    }
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_vm._v("\n                    They have passed like rain on the mountain, like a wind in the meadow; The days have gone down in the West behind the hills into shadow.\n                ")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-26684ec0", module.exports)
  }
}

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.save()
      },
      "keydown": function($event) {
        _vm.errors.clear($event.target.name)
      }
    }
  }, [_c('div', {
    staticClass: "col-md-10 col-md-offset-1"
  }, [_c('div', {
    staticClass: "panel panel-default wrap"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "panel-body",
    staticStyle: {
      "background-color": "#f6f6f6"
    }
  }, [_c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Property:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.location),
      expression: "expense.location"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.location = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("SELECT PROPERTY")]), _vm._v(" "), _vm._l((_vm.lookups.villa_location), function(look) {
    return _c('option', {
      domProps: {
        "value": look.code
      }
    }, [_vm._v(_vm._s(look.name) + "\n                            ")])
  })], 2), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "location"
    }
  })], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-2"
  }, [_vm._v("Villa:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.villa_id),
      expression: "expense.villa_id"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.villa_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.filtered_villas), function(look) {
    return _c('option', {
      domProps: {
        "value": look.id
      }
    }, [_vm._v(_vm._s(look.villa_no) + "\n                            ")])
  })), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "villa_id"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Expenses:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.expense_type),
      expression: "expense.expense_type"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.expense_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.expense_type), function(look) {
    return _c('option', {
      domProps: {
        "value": look.code
      }
    }, [_vm._v(_vm._s(look.name) + "\n                            ")])
  })), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "expense_type"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Category")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.acct_code),
      expression: "expense.acct_code"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.acct_code = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("SELECT CATEGORY")]), _vm._v(" "), _vm._l((_vm.lookups.accounts), function(look) {
    return _c('option', {
      domProps: {
        "value": look.code
      }
    }, [_vm._v(_vm._s(look.code) + "-" + _vm._s(look.description) + "\n                            ")])
  })], 2), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "acct_code"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Paid to:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6"
  }, [_c('v-input', {
    attrs: {
      "value": _vm.expense.payee,
      "items": _vm.lookups.payees,
      "item-text": "name",
      "item-value": "payee_code"
    },
    on: {
      "input": function($event) {
        _vm.expense.payee = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('button', {
    staticClass: "btn btn-info pull-right btn-block",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.createpayee
    }
  }, [_c('i', {
    staticClass: "fa fa-plus-circle fa-1x",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Add")])])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Paid Date:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('dt-picker', {
    attrs: {
      "value": _vm.expense.payment_date
    },
    on: {
      "pick": function($event) {
        _vm.expense.payment_date = $event
      }
    }
  })], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Doc No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.doc_no),
      expression: "expense.doc_no"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.expense.doc_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.expense.doc_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "doc_no"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Paid Amount:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.amount),
      expression: "expense.amount"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.expense.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.expense.amount = $event.target.value
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "amount"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Mode of Payment:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.mode_of_payment),
      expression: "expense.mode_of_payment"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.mode_of_payment = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("SELECT PAYMENT MODE")]), _vm._v(" "), _vm._l((_vm.lookups.payment_term), function(look) {
    return _c('option', {
      domProps: {
        "value": look.code
      }
    }, [_vm._v(_vm._s(look.name) + "\n                            ")])
  })], 2), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "mode_of_payment"
    }
  })], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-1 col-form-label"
  }, [_vm._v("Payment:")]), _vm._v(" "), (_vm.expense.mode_of_payment === 'cheque') ? _c('div', [_c('div', {
    staticClass: "col-md-3"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.bank_provider),
      expression: "expense.bank_provider"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.bank_provider = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.bank), function(look) {
    return _c('option', {
      domProps: {
        "value": look.code
      }
    }, [_vm._v(_vm._s(look.name))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "col-md-2"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.payment_ref),
      expression: "expense.payment_ref"
    }],
    staticClass: "form-control",
    attrs: {
      "placeholder": "Check Number"
    },
    domProps: {
      "value": (_vm.expense.payment_ref)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.expense.payment_ref = $event.target.value
      }
    }
  })])]) : (_vm.expense.mode_of_payment === 'credit_card') ? _c('div', [_c('div', {
    staticClass: "col-md-3"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.bank_provider),
      expression: "expense.bank_provider"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.bank_provider = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.bank), function(look) {
    return _c('option', {
      domProps: {
        "value": look.id
      }
    }, [_vm._v(_vm._s(look.name))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "col-md-2"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.payment_ref),
      expression: "expense.payment_ref"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.expense.payment_ref = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.bank_provider), function(look) {
    return _c('option', {
      domProps: {
        "value": look.id
      }
    }, [_vm._v(_vm._s(look.name) + "\n                                ")])
  }))])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Doc Ref:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expense.doc_ref),
      expression: "expense.doc_ref"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.expense.doc_ref)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.expense.doc_ref = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "doc_ref"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Doc Ref Date:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('dt-picker', {
    attrs: {
      "value": _vm.expense.doc_date
    },
    on: {
      "pick": function($event) {
        _vm.expense.doc_date = $event
      }
    }
  })], 1)])]), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _c('v-dialog', {
    attrs: {
      "modal-id": "payee",
      "dialog-title": "Payee Information"
    },
    on: {
      "dismiss": _vm.dismiss
    },
    model: {
      value: (_vm.unfold),
      callback: function($$v) {
        _vm.unfold = $$v
      },
      expression: "unfold"
    }
  }, [_c('payee-register', {
    attrs: {
      "type": "modal"
    }
  })], 1)], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading",
    staticStyle: {
      "background-color": "#3f51b5!important"
    }
  }, [_c('h3', {
    staticStyle: {
      "color": "white"
    }
  }, [_vm._v("\n                Expenses")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-footer"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Save")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-28eb0727", module.exports)
  }
}

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "modal-id": "about",
      "dialog-title": "About",
      "button-type": "okOnly"
    },
    model: {
      value: (_vm.toggle),
      callback: function($$v) {
        _vm.toggle = $$v
      },
      expression: "toggle"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3"
  }, [_vm._v("Version")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.info.ver))])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3"
  }, [_vm._v("Developer")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9",
    on: {
      "click": function($event) {
        _vm.easterEgg = !_vm.easterEgg
      }
    }
  }, [_vm._v(_vm._s(_vm.info.dev))])]), _vm._v(" "), (_vm.easterEgg) ? _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3"
  }, [_vm._v("Head Dev")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('span', {
    staticClass: "label label-danger"
  }, [_vm._v(_vm._s(_vm.info.devteam.head.name) + " - " + _vm._s(_vm.info.devteam.head.linkedin))])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_vm._v("FrontEnd Dev")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('span', {
    staticClass: "label label-danger"
  }, [_vm._v(_vm._s(_vm.info.devteam.dev.name) + " - " + _vm._s(_vm.info.devteam.dev.linkedin))])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3"
  }, [_vm._v("Repository")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.info.repo))])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3"
  }, [_vm._v("Environment")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.info.env))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2a7da507", module.exports)
  }
}

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.type == 'modal') ? _c('div', [_c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 col-form-label"
  }, [_vm._v("Name")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.name),
      expression: "payee.name"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.name = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 col-form-label"
  }, [_vm._v("Address")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.full_address),
      expression: "payee.full_address"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "3"
    },
    domProps: {
      "value": (_vm.payee.full_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.full_address = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 col-form-label"
  }, [_vm._v("Contact No")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.contact_no),
      expression: "payee.contact_no"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.contact_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.contact_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 col-form-label"
  }, [_vm._v("Fax No")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.fax_no),
      expression: "payee.fax_no"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.fax_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.fax_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 col-form-label"
  }, [_vm._v("Email Address")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.email_address),
      expression: "payee.email_address"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.email_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.email_address = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 col-form-label"
  }, [_vm._v("Contact Person")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.contact_person),
      expression: "payee.contact_person"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.contact_person)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.contact_person = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 col-form-label"
  }, [_vm._v("Payee Type")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.payee_type),
      expression: "payee.payee_type"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.payee.payee_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("SELECT PAYMENT TYPE")]), _vm._v(" "), _vm._l((_vm.payeeTypes), function(look) {
    return _c('option', {
      domProps: {
        "value": look.code
      }
    }, [_vm._v(_vm._s(look.name))])
  })], 2)])])]) : _c('div', [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.save()
      }
    }
  }, [_c('div', {
    staticClass: "col-md-10 col-md-offset-1"
  }, [_c('div', {
    staticClass: "panel panel-default wrap"
  }, [_c('div', {
    staticClass: "panel-heading",
    staticStyle: {
      "background-color": "#3f51b5!important"
    }
  }, [_c('h3', {
    staticStyle: {
      "color": "white"
    }
  }, [_vm._v("\r\n          Payee Register")])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body",
    staticStyle: {
      "background-color": "#f6f6f6"
    }
  }, [_c('div', {
    staticClass: "col-md-10 col-md-offset-1"
  }, [_c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Name")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.name),
      expression: "payee.name"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.name = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "name"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Address")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.full_address),
      expression: "payee.full_address"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "3"
    },
    domProps: {
      "value": (_vm.payee.full_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.full_address = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "full_address"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Contact No")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.contact_no),
      expression: "payee.contact_no"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.contact_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.contact_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "contact_no"
    }
  })], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-2"
  }, [_vm._v("Fax No.")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.fax_no),
      expression: "payee.fax_no"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.fax_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.fax_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "fax_no"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Email Address:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.email_address),
      expression: "payee.email_address"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.email_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.email_address = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "email_address"
    }
  })], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-2"
  }, [_vm._v("Contact Person")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.contact_person),
      expression: "payee.contact_person"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.payee.contact_person)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.payee.contact_person = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "contact_person"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-2 col-form-label"
  }, [_vm._v("Payee Type")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.payee.payee_type),
      expression: "payee.payee_type"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.payee.payee_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("SELECT PAYMENT TYPE")]), _vm._v(" "), _vm._l((_vm.payeeTypes), function(look) {
    return _c('option', {
      domProps: {
        "value": look.code
      }
    }, [_vm._v(_vm._s(look.name))])
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "payee_type"
    }
  })], 2)]), _vm._v(" "), _c('label', {
    staticClass: "col-md-2"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-footer"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Save")])])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3079771e", module.exports)
  }
}

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: {
      'form-group': _vm.excludeRow === undefined
    }
  }, [(_vm.label) ? _c('label', {
    class: _vm.labelClass !== undefined ? _vm.labelClass : 'col-md-3',
    attrs: {
      "for": _vm.modelName
    }
  }, [_vm._v("\n            " + _vm._s(_vm.label) + "\n        "), (_vm.required && _vm.customDisplay) ? _c('span', {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.customDisplay))]) : (_vm.required) ? _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.controlClass !== undefined ? _vm.controlClass : 'col-md-9'
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-34b464f3", module.exports)
  }
}

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "modal-id": "search",
      "dialog-title": "Bill Search",
      "ftype": "search",
      "size": "lg"
    },
    on: {
      "dismiss": _vm.onDismiss
    },
    model: {
      value: (_vm.searchToggle),
      callback: function($$v) {
        _vm.searchToggle = $$v
      },
      expression: "searchToggle"
    }
  }, [_c('div', {
    staticClass: "form-inline"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.search.value),
      expression: "search.value"
    }],
    staticClass: "form-control search-width",
    attrs: {
      "type": "text",
      "name": "search",
      "placeholder": "Search"
    },
    domProps: {
      "value": (_vm.search.value)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.search.value = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('v-select', {
    attrs: {
      "options": _vm.search.options
    },
    model: {
      value: (_vm.search.field),
      callback: function($$v) {
        _vm.search.field = $$v
      },
      expression: "search.field"
    }
  })], 1), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.onSearch
    }
  }, [_vm._v("Search")])]), _vm._v(" "), _c('div', [_c('table', {
    staticClass: "table table-condensed"
  }, [_c('thead', [_c('tr', [_c('th', [_vm._v("Tenant Code")]), _vm._v(" "), _c('th', [_vm._v("Name")]), _vm._v(" "), _c('th', [_vm._v("Contract No")]), _vm._v(" "), _c('th', [_vm._v("Bill No")]), _vm._v(" "), _c('th')])]), _vm._v(" "), _c('tbody', _vm._l((_vm.search.data), function(item) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(item.code))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.full_name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.contract_no))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.bill_no))]), _vm._v(" "), _c('td', [_c('button', {
      staticClass: "btn btn-info",
      on: {
        "click": function($event) {
          _vm.select(item.bill_no)
        }
      }
    }, [_vm._v("Select")])])])
  }))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3beef8c0", module.exports)
  }
}

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "dialog-title": "Contract Renewal",
      "modal-id": "renewal"
    },
    on: {
      "dismiss": _vm.save
    },
    model: {
      value: (_vm.toggle),
      callback: function($$v) {
        _vm.toggle = $$v
      },
      expression: "toggle"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Tenant Name:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-9 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm.contract.tenant.full_name))])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Villa No:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-9 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm.contract.villa.villa_no))])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Rate per Month:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-9 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.contract.villa.rate_per_month)))])])])])]), _vm._v(" "), _c('form', {
    staticClass: "form-horizontal"
  }, [_c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Contract Type",
      "model-name": "contract_type"
    }
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.lookups.contract_type,
      "dvalue": "code",
      "dtext": "name"
    },
    model: {
      value: (_vm.contract.contract_type),
      callback: function($$v) {
        _vm.contract.contract_type = $$v
      },
      expression: "contract.contract_type"
    }
  })], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label": "Period Start",
      "model-name": "period_start",
      "required": true
    }
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "period_start",
      "value": _vm.contract.period_start
    },
    on: {
      "pick": function($event) {
        _vm.contract.period_start = $event
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "period_start"
    },
    model: {
      value: (_vm.stateRenewError),
      callback: function($$v) {
        _vm.stateRenewError = $$v
      },
      expression: "stateRenewError"
    }
  })], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label": "Period End",
      "model-name": "period_end",
      "required": true
    }
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "period_end",
      "value": _vm.contract.period_end
    },
    on: {
      "pick": function($event) {
        _vm.contract.period_end = $event
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "period_end"
    },
    model: {
      value: (_vm.stateRenewError),
      callback: function($$v) {
        _vm.stateRenewError = $$v
      },
      expression: "stateRenewError"
    }
  })], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label": "Extra Days: ",
      "label-class": "col-md-3 text-right"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.extra_days),
      expression: "contract.extra_days"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.contract.extra_days)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.extra_days = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "extra_days"
    },
    model: {
      value: (_vm.stateRenewError),
      callback: function($$v) {
        _vm.stateRenewError = $$v
      },
      expression: "stateRenewError"
    }
  })], 1), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.contract.contract_type === 'legalized') ? _c('div', [_c('v-input-wrapper', {
    attrs: {
      "label": "Cheque Series:",
      "label-class": "col-md-3 text-right"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.prep_series),
      expression: "contract.prep_series"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.contract.prep_series)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.prep_series = $event.target.value
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label": "Bank:",
      "label-class": "col-md-3 text-right"
    }
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.lookups.bank,
      "include-default": true,
      "dvalue": "code",
      "dtext": "name"
    },
    model: {
      value: (_vm.contract.prep_bank),
      callback: function($$v) {
        _vm.contract.prep_bank = $$v
      },
      expression: "contract.prep_bank"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3 text-right",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Due Date:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.lookups.due_date,
      "include-default": true
    },
    model: {
      value: (_vm.contract.prep_due_date),
      callback: function($$v) {
        _vm.contract.prep_due_date = $$v
      },
      expression: "contract.prep_due_date"
    }
  })], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-3 text-right",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Reference No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-2"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.prep_ref_no),
      expression: "contract.prep_ref_no"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.contract.prep_ref_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.prep_ref_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('hr')], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Contract Value:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.amount),
      expression: "contract.amount"
    }],
    staticClass: "form-control text-right",
    attrs: {
      "name": "amount",
      "type": "text",
      "placeholder": "AMOUNT"
    },
    domProps: {
      "value": (_vm.contract.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.amount = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-primary dropdown-toggle",
    attrs: {
      "type": "button",
      "data-toggle": "dropdown"
    }
  }, [_vm._v("\n                            Action "), _c('i', {
    staticClass: "fa fa-chevron-down"
  })]), _vm._v(" "), _c('ul', {
    staticClass: "dropdown-menu dropdown-menu-right",
    staticStyle: {
      "width": "450px"
    }
  }, [_c('li', [_c('div', {
    staticClass: "form-group"
  }, [_c('div', {
    staticClass: "col-md-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.rate_per_month),
      expression: "rate_per_month"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.rate_per_month)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.rate_per_month = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1"
  }, [_c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.calc()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-calculator",
    attrs: {
      "aria-hidden": "true"
    }
  })])])])])])])]), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "amount"
    },
    model: {
      value: (_vm.stateRenewError),
      callback: function($$v) {
        _vm.stateRenewError = $$v
      },
      expression: "stateRenewError"
    }
  })], 1)])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c49dde2", module.exports)
  }
}

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Payees"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": _vm.onAddPayee
    }
  }, [_c('i', {
    staticClass: "fa fa-plus ",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Add Payee")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('v-live-view', {
    attrs: {
      "grid": _vm.gridView
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3de1dda8", module.exports)
  }
}

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nb-sidebar cold-md-2"
  }, [_c('div', {
    staticClass: "nb-sidebar-brand"
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('a', {
    attrs: {
      "href": "#",
      "id": "logo"
    },
    on: {
      "click": _vm.openInfo
    }
  }, [_c('img', {
    staticClass: "circle",
    attrs: {
      "src": _vm.logo.imgPath
    }
  }), _vm._v("\n                " + _vm._s(_vm.title) + "\n            ")])])]), _vm._v(" "), _c('ul', {
    staticClass: "nb-sidebar-nav"
  }, _vm._l((_vm.menus), function(menu) {
    return (menu.visible) ? _c('li', {
      staticClass: "dropdown"
    }, [_c('a', {
      ref: "dropdown",
      refInFor: true,
      staticClass: "dropdown-toggle",
      attrs: {
        "href": "#"
      }
    }, [_c('i', {
      staticClass: "fa fa-lg",
      class: menu.icon,
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v("  \n                "), _c('span', [_vm._v(_vm._s(menu.name))]), _vm._v(" "), _vm._m(0, true)]), _vm._v(" "), _c('ul', {
      staticClass: "nb-dropdown-menu",
      attrs: {
        "role": "menu"
      }
    }, _vm._l((menu.submenus), function(submenu) {
      return _c('li', {
        class: submenu.name === '$separator' ? 'separator' : 'sub-menu'
      }, [(submenu.disabled) ? _c('span', {
        staticClass: "nav-disabled"
      }, [_vm._v(_vm._s(submenu.name))]) : _vm._e(), _vm._v(" "), (submenu.name !== '$separator' && !submenu.disabled) ? _c('a', {
        attrs: {
          "href": submenu.url
        }
      }, [_vm._v(_vm._s(submenu.name))]) : _vm._e()])
    }))]) : _vm._e()
  })), _vm._v(" "), _c('info-modal')], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "pull-right"
  }, [_c('i', {
    staticClass: "fa fa-chevron-down fa-fw"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3f1cb985", module.exports)
  }
}

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "$dtPicker",
    staticClass: "input-group date"
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "dpName"
    },
    domProps: {
      "value": _vm.defaultValue
    }
  }), _vm._v(" "), _vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "input-group-addon"
  }, [_c('span', {
    staticClass: "fa fa-calendar"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-43c48b70", module.exports)
  }
}

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "modal-id": "replacement",
      "dialog-title": "Replacement Entry",
      "size": "lg"
    },
    on: {
      "dismiss": _vm.save
    },
    model: {
      value: (_vm.toggle),
      callback: function($$v) {
        _vm.toggle = $$v
      },
      expression: "toggle"
    }
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Payment No:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-4 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm.item.payment_no))]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Date Due:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-4 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.item.effectivity_date)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Period:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.item.period_start)) + " - " + _vm._s(_vm._f("toDateFormat")(_vm.item.period_end)))]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Amount:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-4 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.item.amount)))])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "form-horizontal"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2",
    attrs: {
      "for": "payment_type"
    }
  }, [_vm._v("Payment Type")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.payment_type),
      expression: "cloneOfInstance.payment_type"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "payment_type",
      "name": "payment_type"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cloneOfInstance.payment_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.payment_term), function(lookup) {
    return _c('option', {
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name))])
  }))]), _vm._v(" "), _c('label', {
    staticClass: "col-md-2",
    attrs: {
      "for": "bank"
    }
  }, [_vm._v("Bank")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.bank),
      expression: "cloneOfInstance.bank"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "bank"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cloneOfInstance.bank = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("--SELECT BANK--")]), _vm._v(" "), _vm._l((_vm.lookups.bank), function(lookup) {
    return _c('option', {
      key: lookup.code,
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2",
    attrs: {
      "for": "payment_no"
    }
  }, [_vm._v("Payment No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.payment_no),
      expression: "cloneOfInstance.payment_no"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "payment_no",
      "required": ""
    },
    domProps: {
      "value": (_vm.cloneOfInstance.payment_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.payment_no = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "col-md-2",
    attrs: {
      "for": "reference_no"
    }
  }, [_vm._v("Ref# No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.reference_no),
      expression: "cloneOfInstance.reference_no"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "reference_no"
    },
    domProps: {
      "value": (_vm.cloneOfInstance.reference_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.reference_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2",
    attrs: {
      "for": "amount"
    }
  }, [_vm._v("Amount:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.amount),
      expression: "cloneOfInstance.amount"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "amount",
      "id": "amount",
      "required": ""
    },
    domProps: {
      "value": (_vm.cloneOfInstance.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.amount = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2",
    attrs: {
      "for": "remarks"
    }
  }, [_vm._v("Remarks:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.remarks),
      expression: "cloneOfInstance.remarks"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "remarks"
    },
    domProps: {
      "value": (_vm.cloneOfInstance.remarks)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.remarks = $event.target.value
      }
    }
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4623dfec", module.exports)
  }
}

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Tenant"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": _vm.create
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  }), _vm._v(" Add Tenant\n            ")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('v-live-view', {
    attrs: {
      "grid": _vm.gridView
    },
    on: {
      "action": _vm.doAction
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-46615b96", module.exports)
  }
}

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.get()),
      expression: "get()"
    }]
  }, [_c('span', {
    staticClass: "text-danger"
  }, [_c('i', {
    staticClass: "fa fa-times-rectangle"
  }), _c('small', [_vm._v(_vm._s(_vm.get()))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-481ae7ca", module.exports)
  }
}

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-input-container"
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.values.label),
      expression: "values.label"
    }],
    ref: "textbox",
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": ""
    },
    domProps: {
      "value": (_vm.values.label)
    },
    on: {
      "focus": function($event) {
        _vm.isShowDropdown = !_vm.isShowDropdown
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.values.label = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.isShowDropdown = !_vm.isShowDropdown
      }
    }
  }, [_c('i', {
    staticClass: "fa",
    class: _vm.isShowDropdown ? 'fa-chevron-up' : 'fa-chevron-down'
  })])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShowDropdown),
      expression: "isShowDropdown"
    }],
    staticClass: "v-input-list"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.search),
      expression: "search"
    }],
    ref: "searchText",
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "Search"
    },
    domProps: {
      "value": (_vm.search)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.search = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('ul', _vm._l((_vm.options), function(option) {
    return _c('li', [_c('a', {
      attrs: {
        "href": "#",
        "data-value": option[_vm.itemValue]
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.select(option)
        }
      }
    }, [_vm._v(_vm._s(option[_vm.itemText]))])])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4aaf4ccc", module.exports)
  }
}

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-total-panel",
    staticStyle: {
      "margin": "15px 0"
    }
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('span', {
    staticClass: "col-md-7 x-total-label"
  }, [_vm._v("Total Cost:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-5 x-total-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.totalCost)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('span', {
    staticClass: "col-md-7 x-total-label"
  }, [_vm._v("Total Payment:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-5 x-total-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.totalPayment)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('span', {
    staticClass: "col-md-7 x-total-label"
  }, [_vm._v("Balance:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-5 x-total-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.balance)))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4ef8d55a", module.exports)
  }
}

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4"
  }, [_c('div', {
    staticClass: "panel panel-info wrap"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "panel-group wrap",
    attrs: {
      "id": "bs-collapse"
    }
  }, _vm._l((_vm.reportList), function(report, i) {
    return _c('div', {
      key: i,
      staticClass: "panel panel-success active"
    }, [_c('div', {
      staticClass: "panel-heading"
    }, [_c('h4', {
      staticClass: "panel-title"
    }, [_c('a', {
      attrs: {
        "data-toggle": "collapse",
        "data-parent": "#",
        "href": "#one"
      }
    }, [_vm._v("\n                                " + _vm._s(report.title) + "\n                            ")])])]), _vm._v(" "), _c('div', {
      staticClass: "panel-collapse",
      attrs: {
        "id": "one"
      }
    }, [_c('div', {
      staticClass: "panel-body"
    }, [_c('ul', _vm._l((report.data), function(data, index) {
      return _c('li', [_c('a', {
        attrs: {
          "href": "#"
        },
        on: {
          "click": function($event) {
            _vm.onReportClick(data)
          }
        }
      }, [_vm._v(_vm._s(data.report_title))])])
    }))])])])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-8"
  }, [_c('report-form', {
    attrs: {
      "params": _vm.params
    },
    on: {
      "viewReportClick": _vm.viewReport
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading"
  }, [_c('h5', [_vm._v("General Reports")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4efa34ae", module.exports)
  }
}

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    staticClass: "form-horizontal",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.save()
      },
      "keydown": function($event) {
        _vm.errors.clear($event.target.name)
      }
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-6"
  }, [_c('tenant-register')], 1), _vm._v(" "), _c('div', {
    staticClass: "col-md-6"
  }, [_c('contract-villa'), _vm._v(" "), _c('contract-entry')], 1), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-3 col-md-offset-9"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Save")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4f31de5b", module.exports)
  }
}

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('table', {
    staticClass: "table table-condensed table-hover table-bordered",
    attrs: {
      "id": "grid"
    }
  }, [_c('thead', [_c('tr', {
    staticClass: "info"
  }, [_c('th', {
    staticClass: "text-center"
  }, [_vm._v("No")]), _vm._v(" "), _vm._l((_vm.grid.columns), function(key) {
    return _c('th', {
      staticClass: "text-center",
      class: {
        info: _vm.sortKey == key.name
      },
      style: (key.style),
      on: {
        "click": function($event) {
          _vm.sortBy(key)
        }
      }
    }, [_vm._v("\n                " + _vm._s(key.column) + "\n                "), (_vm.isArrowVisible(key.name)) ? _c('span', {
      staticClass: "fa fa-fw",
      class: _vm.sortOrders[key.name] > 0 ?
        'fa-long-arrow-down' : 'fa-long-arrow-up'
    }) : _vm._e()])
  })], 2)]), _vm._v(" "), _c('tbody', _vm._l((_vm.filteredData), function(entry, rowIndex) {
    return _c('tr', {
      key: rowIndex
    }, [_c('td', {
      staticClass: "text-center"
    }, [_vm._v(_vm._s(rowIndex + 1))]), _vm._v(" "), _vm._l((_vm.grid.columns), function(column, columnIndex) {
      return _c('td', {
        key: columnIndex,
        class: column.class,
        style: (column.style)
      }, [_vm._t("body", null, {
        items: {
          column: column,
          items: entry
        }
      })], 2)
    })], 2)
  })), _vm._v(" "), (_vm.grid.footers) ? _c('tfoot', [_c('tr', {
    staticClass: "active"
  }, [_vm._t("footer", null, {
    items: _vm.grid
  })], 2)]) : _vm._e()], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-54583fc7", module.exports)
  }
}

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Contract List"
    }
  }, [_c('v-tab-group', {
    model: {
      value: (_vm.$store.state.contracts.status),
      callback: function($$v) {
        _vm.$store.state.contracts.status = $$v
      },
      expression: "$store.state.contracts.status"
    }
  }, [_c('v-tab', {
    attrs: {
      "tab-id": "pending"
    }
  }, [_vm._v("Pending")]), _vm._v(" "), _c('v-tab', {
    attrs: {
      "tab-id": "active"
    }
  }, [_vm._v("Active")])], 1), _vm._v(" "), _c('div', {
    staticClass: "tab-content",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('div', {
    staticClass: "tab-pane fade in active",
    attrs: {
      "id": "pending"
    }
  }, [_c('v-live-view', {
    attrs: {
      "grid": _vm.gridView
    },
    on: {
      "action": _vm.doAction
    }
  })], 1), _vm._v(" "), _c('terminate-dialog')], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-54fd3ad6", module.exports)
  }
}

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "head-icon": "fa fa-user-circle-o",
      "header": "TENANT REGISTRATION"
    }
  }, [_c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Tenant Type",
      "model-name": "type"
    }
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.type),
      expression: "tenant.type"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "type"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.tenant.type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.tenant_type), function(lookup) {
    return _c('option', {
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name))])
  }))]), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": _vm.labels.fullName,
      "required": true,
      "model-name": "register_tenant.full_name"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.full_name),
      expression: "tenant.full_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "register_tenant.full_name"
    },
    domProps: {
      "value": (_vm.tenant.full_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.full_name = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.full_name')
    }
  }, [_vm._v("\n            " + _vm._s(_vm.stateContractError.get('register_tenant.full_name')) + "\n        ")])], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": _vm.labels.regName,
      "model-name": "register_tenant.reg_name"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.reg_name),
      expression: "tenant.reg_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "register_tenant.reg_name",
      "id": "reg_name"
    },
    domProps: {
      "value": (_vm.tenant.reg_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.reg_name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": _vm.labels.regNo,
      "required": true,
      "model-name": "register_tenant.reg_id"
    }
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.reg_id),
      expression: "tenant.reg_id"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "register_tenant.reg_id"
    },
    domProps: {
      "value": (_vm.tenant.reg_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.reg_id = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.searchTenant($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-search"
  })])])]), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.reg_id')
    }
  }, [_vm._v("\n            " + _vm._s(_vm.stateContractError.get('register_tenant.reg_id')) + "\n        ")])], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label": _vm.labels.regDate,
      "label-class": "col-md-3 text-right",
      "required": true,
      "model-name": "register_tenant.reg_date"
    }
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "register_tenant.reg_date",
      "value": _vm.tenant.reg_date
    },
    on: {
      "pick": function($event) {
        _vm.tenant.reg_date = $event
      }
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.reg_date')
    }
  }, [_vm._v("\n            " + _vm._s(_vm.stateContractError.get('register_tenant.reg_date')) + "\n        ")])], 1), _vm._v(" "), _c('v-input-wrapper', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showGender),
      expression: "showGender"
    }],
    attrs: {
      "label": "Gender",
      "label-class": "col-md-3 text-right",
      "model-name": "gender"
    }
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.gender),
      expression: "tenant.gender"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "gender"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.tenant.gender = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "male",
      "selected": "true"
    }
  }, [_vm._v("Male")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "female"
    }
  }, [_vm._v("Female")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Email Address",
      "required": true,
      "model-name": "register_tenant.email_address"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.email_address),
      expression: "tenant.email_address"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.email_address",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.email_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.email_address = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.email_address')
    }
  }, [_vm._v("\n            " + _vm._s(_vm.stateContractError.get('register_tenant.email_address')) + "\n        ")])], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Tel No",
      "model-name": "tel_no"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tel_no),
      expression: "tenant.tel_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "tel_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tel_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tel_no = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Mobile No",
      "required": true,
      "custom-display": "(tel no or mobile)*",
      "model-name": "register_tenant.mobile_no"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.mobile_no),
      expression: "tenant.mobile_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.mobile_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.mobile_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.mobile_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.mobile_no')
    }
  }, [_vm._v("\n            " + _vm._s(_vm.stateContractError.get('register_tenant.mobile_no')) + "\n        ")])], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Fax No",
      "model-name": "tenant.fax_no"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.fax_no),
      expression: "tenant.fax_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "fax_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.fax_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.fax_no = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "required": true,
      "label": "Address",
      "model-name": "register_tenant.tenant_address.address_1"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.address_1),
      expression: "tenant.tenant_address.address_1"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.tenant_address.address_1",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.address_1)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.address_1 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.tenant_address.address_1')
    }
  }, [_vm._v("\n            " + _vm._s(_vm.stateContractError.get('register_tenant.tenant_address.address_1')) + "\n        ")])], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Address 2",
      "model-name": "tenant.tenant_address.address_2"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.address_2),
      expression: "tenant.tenant_address.address_2"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "address_2",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.address_2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.address_2 = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('v-input-wrapper', {
    attrs: {
      "exclude-row": true,
      "label-class": "col-md-3 text-right",
      "control-class": "col-md-3",
      "label": "City",
      "required": true,
      "model-name": "register_tenant.tenant_address.city"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.city),
      expression: "tenant.tenant_address.city"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.tenant_address.city",
      "id": "register_tenant.tenant_address.city",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.city)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.city = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.tenant_address.city')
    }
  }, [_vm._v("\n                " + _vm._s(_vm.stateContractError.get('register_tenant.tenant_address.city')) + "\n            ")])], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "exclude-row": true,
      "label-class": "col-md-3 text-right",
      "control-class": "col-md-3",
      "label": "Postal Code",
      "required": true,
      "model-name": "register_tenant.tenant_address.postal_code"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.postal_code),
      expression: "tenant.tenant_address.postal_code"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.tenant_address.postal_code",
      "id": "register_tenant.tenant_address.postal_code",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.postal_code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.postal_code = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('register_tenant.tenant_address.postal_code')
    }
  }, [_vm._v("\n                " + _vm._s(_vm.stateContractError.get('register_tenant.tenant_address.postal_code')) + "\n            ")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57af5573", module.exports)
  }
}

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('form', {
    staticClass: "form-horizontal",
    attrs: {
      "id": "frmVillaEntry",
      "enctype": "multipart/form-data"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSave($event)
      },
      "keydown": function($event) {
        _vm.errors.clear($event.target.name)
      }
    }
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('div', {
    staticClass: "col-md-8"
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "location"
    }
  }, [_vm._v("Location:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.location),
      expression: "villa.location"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "location"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.villa.location = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.villa_location), function(lookup) {
    return _c('option', {
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name) + "\n                                    ")])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "form-group "
  }, [_c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "villa_no"
    }
  }, [_vm._v("Villa No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.villa_no),
      expression: "villa.villa_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "villa_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.villa.villa_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.villa.villa_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-label', {
    attrs: {
      "error-display": _vm.errors.get('villa_no')
    }
  }, [_vm._v(_vm._s(_vm.errors.get('villa_no')) + "\n                                ")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "description"
    }
  }, [_vm._v("Description:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.description),
      expression: "villa.description"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "description",
      "rows": "5"
    },
    domProps: {
      "value": (_vm.villa.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.villa.description = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-label', {
    attrs: {
      "error-display": _vm.errors.get('description')
    }
  }, [_vm._v(_vm._s(_vm.errors.get('description')))])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "electricity_no"
    }
  }, [_vm._v("Electrity No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.electricity_no),
      expression: "villa.electricity_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "electricity_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.villa.electricity_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.villa.electricity_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-label', {
    attrs: {
      "error-display": _vm.errors.get('electricity_no')
    }
  }, [_vm._v("\n                                    " + _vm._s(_vm.errors.get('electricity_no')) + "\n                                ")])], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "water_no"
    }
  }, [_vm._v("Water No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.water_no),
      expression: "villa.water_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "water_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.villa.water_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.villa.water_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-label', {
    attrs: {
      "error-display": _vm.errors.get('water_no')
    }
  }, [_vm._v(_vm._s(_vm.errors.get('water_no')) + "\n                                ")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "qtel_no"
    }
  }, [_vm._v("QTel No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.qtel_no),
      expression: "villa.qtel_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "qtel_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.villa.qtel_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.villa.qtel_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-label', {
    attrs: {
      "error-display": _vm.errors.get('qtel_no')
    }
  }, [_vm._v(_vm._s(_vm.errors.get('qtel_no')) + "\n                                ")])], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "capacity"
    }
  }, [_vm._v("Capacity:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.capacity),
      expression: "villa.capacity"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "capacity",
      "type": "number"
    },
    domProps: {
      "value": (_vm.villa.capacity)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.villa.capacity = $event.target.value
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('error-label', {
    attrs: {
      "error-display": _vm.errors.get('capacity')
    }
  }, [_vm._v(_vm._s(_vm.errors.get('capacity')) + "\n                                ")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "rate_per_month"
    }
  }, [_vm._v("Rate per Month:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.rate_per_month),
      expression: "villa.rate_per_month"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "rate_per_month",
      "type": "text"
    },
    domProps: {
      "value": (_vm.villa.rate_per_month)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.villa.rate_per_month = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-label', {
    attrs: {
      "error-display": _vm.errors.get('rate_per_month')
    }
  }, [_vm._v("\n                                    " + _vm._s(_vm.errors.get('rate_per_month')) + "\n                                ")])], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-2 text-right",
    attrs: {
      "for": "villa_class"
    }
  }, [_vm._v("Villa Class:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.villa.villa_class),
      expression: "villa.villa_class"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "villa_class"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.villa.villa_class = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.villa_type), function(lookup) {
    return _c('option', {
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v("\n                                        " + _vm._s(lookup.name) + "\n                                    ")])
  }))])])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    attrs: {
      "disabled": _vm.btnDisabled,
      "type": "submit"
    }
  }, [_vm._v("Save")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('image-upload', {
    on: {
      "dispatch": _vm.onDispatch
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('grid-view', {
    attrs: {
      "data": _vm.villa.villa_galleries,
      "grid": _vm.grid
    },
    on: {
      "action": _vm.onDelete
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('slider', {
    attrs: {
      "slides": _vm.villa.villa_galleries
    }
  })], 1)])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5c4539b9", module.exports)
  }
}

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "group-button"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": _vm.param.previous_page === null
    },
    on: {
      "click": function($event) {
        _vm.onClick(_vm.param.first_page)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-double-left"
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": _vm.param.previous_page === null
    },
    on: {
      "click": function($event) {
        _vm.onClick(_vm.param.previous_page)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })]), _vm._v(" "), _c('input', {
    attrs: {
      "text": "text",
      "disabled": ""
    },
    domProps: {
      "value": _vm.currentPage
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": _vm.param.next_page === null
    },
    on: {
      "click": function($event) {
        _vm.onClick(_vm.param.next_page)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": _vm.param.next_page === null
    },
    on: {
      "click": function($event) {
        _vm.onClick(_vm.param.last_page)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-double-right"
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5d80e072", module.exports)
  }
}

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Fixed Asset Register"
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5db322be", module.exports)
  }
}

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "slider-wrapper"
  }, [_vm._l((_vm.slides), function(slide) {
    return _c('div', {
      ref: "sliders",
      refInFor: true,
      staticClass: "sliders clearfix"
    }, [_c('img', {
      attrs: {
        "src": _vm.fullImagePath(slide.image_name)
      }
    })])
  }), _vm._v(" "), _c('ul', {
    staticClass: "slider-nav"
  }, _vm._l((_vm.slides), function(bullet, index) {
    return _c('li', [_c('span', {
      ref: "bullets",
      refInFor: true,
      staticClass: "circle",
      on: {
        "click": function($event) {
          _vm.onSlide(index)
        }
      }
    })])
  }))], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5dd65970", module.exports)
  }
}

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.classic) ? _c('div', {
    staticClass: "x-panel"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('p', [(_vm.headIcon) ? _c('i', {
    class: _vm.headIcon
  }) : _vm._e(), _vm._v(" " + _vm._s(_vm.header))])])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "panel-footer"
  }, [_vm._t("panel-footer")], 2)]) : _c('div', {
    staticClass: "panel",
    class: _vm.panelTheme === undefined ? 'panel-primary' : _vm.panelTheme
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_vm._t("header", [_c('p', [(_vm.headIcon) ? _c('i', {
    class: _vm.headIcon
  }) : _vm._e(), _vm._v(" " + _vm._s(_vm.header))])])], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "panel-footer"
  }, [_vm._t("panel-footer")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-603a952c", module.exports)
  }
}

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-primary"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._v("Payment Update")]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "col-md-7"
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Tenant Code:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.code))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Full Name:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.full_name))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Email Address:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.email_address))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Tel No: / Mobile No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.tel_no) + "\n                                "), (_vm.contract.tenant.tel_no != '') ? _c('span', [_vm._v("/")]) : _vm._e(), _vm._v(" " + _vm._s(_vm.contract.tenant.mobile_no))])])]), _vm._v(" "), _c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Villa No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.villa.villa_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Description:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.villa.description))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Rate/Month:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.contract.villa.rate_per_month)))])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-5"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "column-group"
  }, [_c('label', {
    attrs: {
      "for": "billSearch"
    }
  }, [_vm._v("Bill No:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.bill.bill_no),
      expression: "bill.bill_no"
    }],
    staticClass: "input",
    attrs: {
      "disabled": "",
      "type": "text",
      "placeholder": "XXX",
      "name": "billSearch"
    },
    domProps: {
      "value": (_vm.bill.bill_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.bill.bill_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-info ",
    on: {
      "click": function($event) {
        _vm.openSearchModal(true)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-fw ",
    class: _vm.options.loadingSearch ? 'fa-refresh fa-spin' : 'fa-search'
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "disabled": _vm.bill.bill_no.length === 0
    },
    on: {
      "click": _vm.printBill
    }
  }, [_c('i', {
    staticClass: "fa fa-fw fa-print"
  })])]), _vm._v(" "), _c('search-bill', {
    on: {
      "select": _vm.onSelect
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "x-panel"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Contract No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.contract_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Type:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.full_contract_type))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Period:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v("\n                                    " + _vm._s(_vm._f("toDateFormat")(_vm.contract.period_start)) + " - " + _vm._s(_vm._f("toDateFormat")(_vm.contract.period_end_extended)) + "\n                                ")])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Amount:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.contract.amount)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Status:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.full_status))])])])])]), _vm._v(" "), (_vm.bill.id) ? _c('div', {
    staticClass: "col-md-12"
  }, [_c('v-tab-group', {
    model: {
      value: (_vm.options.currentTabIndex),
      callback: function($$v) {
        _vm.options.currentTabIndex = $$v
      },
      expression: "options.currentTabIndex"
    }
  }, [_c('v-tab', {
    attrs: {
      "tab-id": "received"
    }
  }, [_vm._v("For Clearing")]), _vm._v(" "), _c('v-tab', {
    attrs: {
      "tab-id": "deposit"
    }
  }, [_vm._v("Deposited")]), _vm._v(" "), _c('v-tab', {
    attrs: {
      "tab-id": "clear"
    }
  }, [_vm._v("Cleared")]), _vm._v(" "), _c('v-tab', {
    attrs: {
      "tab-id": "bounce"
    }
  }, [_vm._v("Bounced")])], 1), _vm._v(" "), _c('div', {
    staticClass: "tab-content"
  }, [_c('div', {
    staticClass: "tab-pane active"
  }, [_c('div', {
    staticClass: "col-md-12 is-margin-bottom"
  }, [_c('div', {
    staticClass: "col-md-3 pull-right"
  }, [(_vm.isPaymentStatusReplace) ? _c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": _vm.openReplaceModal
    }
  }, [_vm._v("Replace New Payment")]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-12",
    attrs: {
      "id": "main"
    }
  }, [_c('data-view', {
    attrs: {
      "grid": _vm.gridColumn,
      "data": _vm.filtered
    },
    scopedSlots: _vm._u([{
      key: "body",
      fn: function(props) {
        return [(props.items.column.custom) ? _c('div', [(props.items.column.name === 'payment_no') ? _c('div', [_c('input', {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: (props.items.items.payment_no),
            expression: "props.items.items.payment_no"
          }],
          staticClass: "form-control",
          attrs: {
            "type": "text"
          },
          domProps: {
            "value": (props.items.items.payment_no)
          },
          on: {
            "input": function($event) {
              if ($event.target.composing) { return; }
              props.items.items.payment_no = $event.target.value
            }
          }
        })]) : (props.items.column.name === 'status') ? _c('div', [_c('v-combo-box', {
          attrs: {
            "options": _vm.lookups.payment_status,
            "dvalue": "code",
            "dtext": "name"
          },
          model: {
            value: (props.items.items.status),
            callback: function($$v) {
              props.items.items.status = $$v
            },
            expression: "props.items.items.status"
          }
        })], 1) : (props.items.column.name === 'bank_account') ? _c('div', [(props.items.items.status === 'clear') ? _c('div', {
          staticClass: "form-group text-center"
        }, [_c('v-combo-box', {
          attrs: {
            "options": _vm.lookups.bank_accounts,
            "dvalue": "account_no",
            "dtext": "account_no",
            "includeDefault": "true"
          },
          on: {
            "change": function($event) {
              _vm.onChange(props.items.items.id)
            }
          },
          model: {
            value: (props.items.items.bank_account),
            callback: function($$v) {
              props.items.items.bank_account = $$v
            },
            expression: "props.items.items.bank_account"
          }
        }), _vm._v(" "), _c('small', {
          staticClass: "label label-info"
        }, [_vm._v("\n                                                        " + _vm._s(_vm.getBank(props.items.items.bank_account)) + "\n                                                    ")])], 1) : _c('div', {
          staticClass: "text-center"
        }, [_c('span', [_vm._v(_vm._s(props.items.items.bank_account))])])]) : (props.items.column.name === 'date_deposited') ? _c('div', [(props.items.items.status === 'clear' || props.items.items.status === 'bounce') ? _c('div', [_c('dt-picker', {
          attrs: {
            "dp-name": "date_deposited",
            "value": props.items.items.date_deposited
          },
          on: {
            "pick": function($event) {
              props.items.items.date_deposited = $event
            }
          }
        })], 1) : _c('div', {
          staticClass: "text-center"
        }, [_c('span', [_vm._v(_vm._s(props.items.items.date_deposited))])])]) : _c('div', [(props.items.items.status === 'clear') ? _c('div', {
          staticClass: "form-group"
        }, [_c('textarea', {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: (props.items.items.remarks),
            expression: "props.items.items.remarks"
          }],
          staticClass: "form-control",
          domProps: {
            "value": (props.items.items.remarks)
          },
          on: {
            "input": function($event) {
              if ($event.target.composing) { return; }
              props.items.items.remarks = $event.target.value
            }
          }
        })]) : _c('div', {
          staticClass: "text-center"
        }, [_c('span', [_vm._v(_vm._s(props.items.items.remarks))])])])]) : _c('div', [(props.items.column.editable) ? _c('div', [_c('input', {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: (props.items.items[_vm.column.name]),
            expression: "props.items.items[column.name]"
          }],
          staticClass: "form-control text-center",
          attrs: {
            "disabled": ""
          },
          domProps: {
            "value": (props.items.items[_vm.column.name])
          },
          on: {
            "input": function($event) {
              if ($event.target.composing) { return; }
              var $$exp = props.items.items,
                $$idx = _vm.column.name;
              if (!Array.isArray($$exp)) {
                props.items.items[_vm.column.name] = $event.target.value
              } else {
                $$exp.splice($$idx, 1, $event.target.value)
              }
            }
          }
        })]) : (props.items.column.actionable) ? _c('div', {
          staticClass: "btn-group"
        }, [_c('button', {
          staticClass: "btn btn-primary dropdown-toggle btn-sm",
          attrs: {
            "type": "button",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false"
          }
        }, [_vm._v("\n                                                    Action "), _c('span', {
          staticClass: "caret"
        })]), _vm._v(" "), _c('ul', {
          staticClass: "dropdown-menu"
        }, [_c('li', [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.actionTrigger('info', props.items.items)
            }
          }
        }, [_vm._v("Info")])]), _vm._v(" "), (props.items.items.replace_ref) ? _c('li', [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.actionTrigger('rep-info', props.items.items)
            }
          }
        }, [_vm._v("Replacement - Info")])]) : _vm._e(), _vm._v(" "), _c('li', {
          staticClass: "divider",
          attrs: {
            "role": "separator"
          }
        }), _vm._v(" "), _c('li', [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.actionTrigger('edit', props.items.items)
            }
          }
        }, [_vm._v("Edit")])]), _vm._v(" "), _c('li', [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.actionTrigger('deposit', props.items.items)
            }
          }
        }, [_vm._v("Add Deposit")])]), _vm._v(" "), _c('li', {
          staticClass: "divider",
          attrs: {
            "role": "separator"
          }
        }), _vm._v(" "), (props.items.items.replace_ref === undefined || props.items.items.replace_ref === null) ? _c('li', [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.actionTrigger('replacement', props.items.items)
            }
          }
        }, [_vm._v("Replacement")])]) : _vm._e()])]) : _c('div', [(props.items.column.format == 'date') ? _c('span', [_vm._v(_vm._s(_vm._f("toDateFormat")(props.items.items[props.items.column.name])))]) : (props.items.column.format == 'currency') ? _c('span', [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(props.items.items[props.items.column.name])))]) : _c('span', [_vm._v(_vm._s(props.items.items[props.items.column.name]))])])])]
      }
    }])
  })], 1), _vm._v(" "), _c('replace-modal', {
    attrs: {
      "clone-of-instance": _vm.cloneOfInstance,
      "lookups": _vm.lookups
    },
    on: {
      "dismiss": _vm.onDismissal
    }
  }), _vm._v(" "), _c('payment-info-modal'), _vm._v(" "), _c('payment-modal', {
    attrs: {
      "namespace": "payments"
    }
  }), _vm._v(" "), _c('deposit-modal'), _vm._v(" "), _c('hr')], 1)]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4 pull-right"
  }, [_c('total-payment', {
    attrs: {
      "payment": _vm.totalPayment
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3 pull-right"
  }, [(_vm.options.currentTabIndex == 'received') ? _c('button', {
    staticClass: "btn btn-info btn-block",
    attrs: {
      "disabled": _vm.options.loadingSave
    },
    on: {
      "click": _vm.save
    }
  }, [_c('i', {
    staticClass: "fa fa-fw fa-lg",
    class: _vm.options.loadingSave ? 'fa-refresh fa-spin' : 'fa-save'
  }), _vm._v(" Save\n                            ")]) : _vm._e()])])], 1) : _vm._e()])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-646ba085", module.exports)
  }
}

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    class: {
      'active': _vm.selected
    }
  }, [_c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onClick($event)
      }
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-650995fb", module.exports)
  }
}

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "modal-id": "payment",
      "dialog-title": "Payment Modal"
    },
    on: {
      "dismiss": _vm.onModalDismiss
    },
    model: {
      value: (_vm.toggle),
      callback: function($$v) {
        _vm.toggle = $$v
      },
      expression: "toggle"
    }
  }, [_c('div', {
    staticClass: "form-horizontal"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "payment_type"
    }
  }, [_vm._v("Payment Type")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.payment_type),
      expression: "cloneOfInstance.payment_type"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "payment_type",
      "name": "payment_type"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cloneOfInstance.payment_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.payment_term), function(lookup) {
    return _c('option', {
      key: lookup.code,
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name))])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "payment_type"
    }
  }, [_vm._v("Payment Mode")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.payment_mode),
      expression: "cloneOfInstance.payment_mode"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "payment_mode",
      "name": "payment_mode"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cloneOfInstance.payment_mode = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.payment_mode), function(lookup) {
    return _c('option', {
      key: lookup.code,
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name))])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "effectivity_date"
    }
  }, [_vm._v("Date of Cheque")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "effectivity_date",
      "value": _vm.cloneOfInstance.effectivity_date
    },
    on: {
      "pick": function($event) {
        _vm.cloneOfInstance.effectivity_date = $event
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "bank"
    }
  }, [_vm._v("Bank")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.bank),
      expression: "cloneOfInstance.bank"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "bank"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cloneOfInstance.bank = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("--SELECT BANK--")]), _vm._v(" "), _vm._l((_vm.lookups.bank), function(lookup) {
    return _c('option', {
      key: lookup.code,
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "payment_no"
    }
  }, [_vm._v("Payment No")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.payment_no),
      expression: "cloneOfInstance.payment_no"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "payment_no",
      "required": ""
    },
    domProps: {
      "value": (_vm.cloneOfInstance.payment_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.payment_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "bank"
    }
  }, [_vm._v("Reference No")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.reference_no),
      expression: "cloneOfInstance.reference_no"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "reference_no",
      "required": ""
    },
    domProps: {
      "value": (_vm.cloneOfInstance.reference_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.reference_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "period_start"
    }
  }, [_vm._v("Period Start")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "period_start",
      "value": _vm.cloneOfInstance.period_start
    },
    on: {
      "pick": function($event) {
        _vm.cloneOfInstance.period_start = $event
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "period_end"
    }
  }, [_vm._v("Period End")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "period_end",
      "value": _vm.cloneOfInstance.period_end
    },
    on: {
      "pick": function($event) {
        _vm.cloneOfInstance.period_end = $event
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "amount"
    }
  }, [_vm._v("Amount")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.amount),
      expression: "cloneOfInstance.amount"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "amount",
      "id": "amount",
      "required": ""
    },
    domProps: {
      "value": (_vm.cloneOfInstance.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.amount = $event.target.value
      }
    }
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6693acf8", module.exports)
  }
}

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Fixed Asset"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": _vm.create
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  }), _vm._v(" Add Fixed Assets\n          ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6b3e28b9", module.exports)
  }
}

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('table', {
    staticClass: "table table-condensed table-hover",
    attrs: {
      "id": "grid"
    }
  }, [_c('thead', [_c('tr', {
    staticClass: "active"
  }, [_c('th', [_vm._v("No")]), _vm._v(" "), _vm._l((_vm.grid.columns), function(key) {
    return _c('th', {
      staticClass: "text-center active",
      class: {
        info: _vm.sortKey == key.name
      },
      style: (key.style),
      on: {
        "click": function($event) {
          _vm.sortBy(key)
        }
      }
    }, [_vm._v("\n\n                " + _vm._s(key.column) + "\n                "), (_vm.isArrowVisible(key.name)) ? _c('span', {
      staticClass: "fa fa-fw",
      class: _vm.sortOrders[key.name] > 0 ?
        'fa-long-arrow-down' : 'fa-long-arrow-up'
    }) : _vm._e()])
  })], 2)]), _vm._v(" "), _c('tbody', [(_vm.data.length == 0) ? _c('tr', [_c('td', {
    staticClass: "text-center",
    attrs: {
      "colspan": _vm.grid.columns.length
    }
  }, [_c('h3', {
    staticClass: "text-warning"
  }, [_vm._v("No Record found")])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredData), function(entry, index) {
    return _c('tr', {
      key: index
    }, [_c('td', [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _vm._l((_vm.grid.columns), function(key) {
      return _c('td', {
        class: key.class,
        style: (key.style)
      }, [(_vm.isIncludeEdit(key) ? false : true) ? _c('span', [_vm._v(_vm._s(_vm.render(entry, key)))]) : _vm._e(), _vm._v(" "), (_vm.isIncludeEdit(key)) ? _c('div', [(key.itype == 'selector') ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "checked": Array.isArray(entry[key.bind]) ? _vm._i(entry[key.bind], null) > -1 : (entry[key.bind])
        },
        on: {
          "__c": function($event) {
            var $$a = entry[key.bind],
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = null,
                $$i = _vm._i($$a, $$v);
              if ($$c) {
                $$i < 0 && (entry[key.bind] = $$a.concat($$v))
              } else {
                $$i > -1 && (entry[key.bind] = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              var $$exp = entry,
                $$idx = key.bind;
              if (!Array.isArray($$exp)) {
                entry[key.bind] = $$c
              } else {
                $$exp.splice($$idx, 1, $$c)
              }
            }
          }
        }
      }) : _vm._e(), _vm._v(" "), (key.itype == 'text') ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        staticClass: "form-control",
        attrs: {
          "type": "text"
        },
        domProps: {
          "value": (entry[key.bind])
        },
        on: {
          "input": function($event) {
            if ($event.target.composing) { return; }
            var $$exp = entry,
              $$idx = key.bind;
            if (!Array.isArray($$exp)) {
              entry[key.bind] = $event.target.value
            } else {
              $$exp.splice($$idx, 1, $event.target.value)
            }
          }
        }
      }) : _vm._e(), _vm._v(" "), (key.itype == 'textarea') ? _c('textarea', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        staticClass: "form-control",
        domProps: {
          "value": (entry[key.bind])
        },
        on: {
          "input": function($event) {
            if ($event.target.composing) { return; }
            var $$exp = entry,
              $$idx = key.bind;
            if (!Array.isArray($$exp)) {
              entry[key.bind] = $event.target.value
            } else {
              $$exp.splice($$idx, 1, $event.target.value)
            }
          }
        }
      }) : _vm._e(), _vm._v(" "), (key.itype == 'dropdown') ? _c('select', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        staticClass: "form-control",
        on: {
          "change": function($event) {
            var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
              return o.selected
            }).map(function(o) {
              var val = "_value" in o ? o._value : o.value;
              return val
            });
            var $$exp = entry,
              $$idx = key.bind;
            if (!Array.isArray($$exp)) {
              entry[key.bind] = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
            } else {
              $$exp.splice($$idx, 1, $event.target.multiple ? $$selectedVal : $$selectedVal[0])
            }
          }
        }
      }, [(key.customDefault === undefined) ? _c('option', {
        attrs: {
          "value": ""
        }
      }, [_vm._v("--SELECT--")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.lookups[key.selection]), function(lookup) {
        return _c('option', {
          domProps: {
            "value": lookup.code
          }
        }, [_vm._v(_vm._s(lookup.name))])
      })], 2) : _vm._e()]) : _vm._e(), _vm._v(" "), (key.name == 'action') ? _c('div', {
        staticClass: "btn-group"
      }, [_vm._m(0, true), _vm._v(" "), _c('ul', {
        staticClass: "dropdown-menu"
      }, _vm._l((_vm.actionButtons), function(action) {
        return _c('li', [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              _vm.actionTrigger(action, entry["id"])
            }
          }
        }, [_vm._v(_vm._s(action.name))])])
      }))]) : _vm._e(), _vm._v(" "), (key.name == '$markDelete') ? _c('div', {
        staticClass: "text-center",
        on: {
          "click": function($event) {
            _vm.actionTrigger("delete", entry["id"])
          }
        }
      }, [_vm._m(1, true)]) : _vm._e()])
    })], 2)
  })], 2), _vm._v(" "), (_vm.grid.footers) ? _c('tfoot', [_c('tr', {
    staticClass: "active"
  }, _vm._l((_vm.grid.footers), function(footer) {
    return _c('th', {
      attrs: {
        "colspan": footer.span
      }
    }, [(footer.label) ? _c('strong', [_vm._v(_vm._s(footer.label) + " :")]) : _vm._e(), _vm._v(" "), (footer.text) ? _c('span', [_vm._v(_vm._s(footer.text))]) : _vm._e(), _vm._v(" "), (footer.slot) ? _c('span', [_vm._t("default")], 2) : _vm._e()])
  }))]) : _vm._e()], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn btn-primary dropdown-toggle btn-sm",
    attrs: {
      "type": "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }
  }, [_vm._v("\n                        Action "), _c('span', {
    staticClass: "caret"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn btn-danger btn-xs",
    attrs: {
      "type": "button"
    }
  }, [_c('i', {
    staticClass: "fa fa-close"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6bb484b2", module.exports)
  }
}

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Bill Entry"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-7"
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Code:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.code))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Full Name:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.full_name))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Email Address:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.email_address))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Tel No: / Mobile No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.tenant.tel_no) + " / " + _vm._s(_vm.contract.tenant.mobile_no))])])]), _vm._v(" "), _c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Villa No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.villa.villa_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Description:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.villa.description))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Rate/Month:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.contract.villa.rate_per_month)))])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-5"
  }, [_c('div', {
    staticClass: "x-panel"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Contract No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.contract_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Type:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.full_contract_type))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Period:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.contract.period_start)) + " - " + _vm._s(_vm._f("toDateFormat")(_vm.contract.period_end_extended)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Extra Days:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.extra_days))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Amount:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.contract.amount)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Status:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contract.full_status))])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [(_vm.bill.bill_no === '') ? _c('button', {
    staticClass: "btn btn-info",
    staticStyle: {
      "margin-bottom": "10px"
    },
    on: {
      "click": _vm.addPayment
    }
  }, [_c('i', {
    staticClass: "fa fa-plus-circle"
  }), _vm._v(" Add\n            ")]) : _vm._e(), _vm._v(" "), (_vm.payments.length > 0) ? _c('button', {
    staticClass: "btn btn-danger",
    staticStyle: {
      "margin-bottom": "10px"
    },
    on: {
      "click": _vm.clearPayment
    }
  }, [_c('i', {
    staticClass: "fa fa-trash-o"
  }), _vm._v(" Clear Payment\n            ")]) : _vm._e(), _vm._v(" "), _c('payment-modal', {
    attrs: {
      "namespace": "bills"
    }
  }), _vm._v(" "), _c('grid-view', {
    attrs: {
      "data": _vm.payments,
      "grid": _vm.gridColumn
    },
    on: {
      "action": _vm.onAction
    }
  }, [_c('label', [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.totalPayment.total_payment)))])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4 pull-right"
  }, [_c('total-payment', {
    attrs: {
      "payment": _vm.totalPayment
    }
  })], 1)], 1)]), _vm._v(" "), _c('template', {
    slot: "panel-footer"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 pull-right"
  }, [(_vm.bill.bill_no === '') ? _c('button', {
    staticClass: "btn btn-info btn-block",
    attrs: {
      "disabled": _vm.option.loadingSave
    },
    on: {
      "click": _vm.save
    }
  }, [_c('i', {
    staticClass: "fa ",
    class: _vm.viewIcon
  }), _vm._v(" Create\n                ")]) : _c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": _vm.print
    }
  }, [_c('i', {
    staticClass: "fa fa-print"
  }), _vm._v(" Print\n                ")])])])])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f46c6fb", module.exports)
  }
}

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "$dtPicker",
    staticClass: "input-group date"
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "dpName"
    },
    domProps: {
      "value": _vm.defaultValue
    }
  }), _vm._v(" "), _vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "input-group-addon"
  }, [_c('span', {
    staticClass: "fa fa-calendar"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f9dfd61", module.exports)
  }
}

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Account Chart Entry"
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74930f4a", module.exports)
  }
}

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "RENTAL CONTRACT ENTRY"
    }
  }, [_c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Contract Type",
      "model-name": "contract_type"
    }
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.lookups.contract_type,
      "dvalue": "code",
      "dtext": "name"
    },
    model: {
      value: (_vm.contract.contract_type),
      callback: function($$v) {
        _vm.contract.contract_type = $$v
      },
      expression: "contract.contract_type"
    }
  })], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Period Start",
      "model-name": "period_start",
      "required": true
    }
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "period_start",
      "value": _vm.contract.period_start
    },
    on: {
      "pick": function($event) {
        _vm.contract.period_start = $event
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "period_start"
    },
    model: {
      value: (_vm.errors),
      callback: function($$v) {
        _vm.errors = $$v
      },
      expression: "errors"
    }
  })], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label-class": "col-md-3 text-right",
      "label": "Period End",
      "model-name": "period_end",
      "required": true
    }
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "period_end",
      "value": _vm.contract.period_end
    },
    on: {
      "pick": function($event) {
        _vm.contract.period_end = $event
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "period_end"
    },
    model: {
      value: (_vm.errors),
      callback: function($$v) {
        _vm.errors = $$v
      },
      expression: "errors"
    }
  })], 1), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label": "Extra Days: ",
      "label-class": "col-md-3 text-right"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.extra_days),
      expression: "contract.extra_days"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.contract.extra_days)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.extra_days = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "extra_days"
    },
    model: {
      value: (_vm.errors),
      callback: function($$v) {
        _vm.errors = $$v
      },
      expression: "errors"
    }
  })], 1), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.contract.contract_type === 'legalized') ? _c('div', [_c('v-input-wrapper', {
    attrs: {
      "label": "Cheque Series:",
      "label-class": "col-md-3 text-right"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.prep_series),
      expression: "contract.prep_series"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.contract.prep_series)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.prep_series = $event.target.value
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('v-input-wrapper', {
    attrs: {
      "label": "Bank:",
      "label-class": "col-md-3 text-right"
    }
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.lookups.bank,
      "include-default": true,
      "dvalue": "code",
      "dtext": "name"
    },
    model: {
      value: (_vm.contract.prep_bank),
      callback: function($$v) {
        _vm.contract.prep_bank = $$v
      },
      expression: "contract.prep_bank"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3 text-right",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Due Date:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.lookups.due_date,
      "include-default": true
    },
    model: {
      value: (_vm.contract.prep_due_date),
      callback: function($$v) {
        _vm.contract.prep_due_date = $$v
      },
      expression: "contract.prep_due_date"
    }
  })], 1), _vm._v(" "), _c('label', {
    staticClass: "col-md-3 text-right",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Reference No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-2"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.prep_ref_no),
      expression: "contract.prep_ref_no"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.contract.prep_ref_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.prep_ref_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('hr')], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Contract Value:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contract.amount),
      expression: "contract.amount"
    }],
    staticClass: "form-control text-right",
    attrs: {
      "name": "amount",
      "type": "text",
      "placeholder": "AMOUNT"
    },
    domProps: {
      "value": (_vm.contract.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contract.amount = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.calc('direct')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-calculator"
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default dropdown-toggle",
    attrs: {
      "type": "button",
      "data-toggle": "dropdown"
    }
  }, [_c('i', {
    staticClass: "fa fa-chevron-down"
  })]), _vm._v(" "), _c('ul', {
    staticClass: "dropdown-menu dropdown-menu-right",
    staticStyle: {
      "width": "450px"
    }
  }, [_c('li', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.rate_per_month),
      expression: "rate_per_month"
    }],
    staticClass: "form-control text-right",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.rate_per_month)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.rate_per_month = $event.target.value
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1"
  }, [_c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.calc()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-calculator",
    attrs: {
      "aria-hidden": "true"
    }
  })])])])])])])]), _vm._v(" "), _c('error-span', {
    attrs: {
      "name": "amount"
    },
    model: {
      value: (_vm.errors),
      callback: function($$v) {
        _vm.errors = $$v
      },
      expression: "errors"
    }
  })], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-79adaf6a", module.exports)
  }
}

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8"
  }, [_c('div', {
    staticClass: "x-panel"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('calendar', {
    attrs: {
      "events": _vm.events,
      "editable": true
    },
    on: {
      "onEventClicked": _vm.onEventClicked
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('div', {
    staticClass: "x-panel"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-4 x-label"
  }, [_vm._v("Tenant:")]), _c('span', {
    staticClass: "col-md-8 x-desc"
  }, [_vm._v(_vm._s(_vm.event.contract.tenant.full_name))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-4 x-label"
  }, [_vm._v("Villa No:")]), _c('span', {
    staticClass: "col-md-8 x-desc"
  }, [_vm._v(_vm._s(_vm.event.contract.villa.villa_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-4 x-label"
  }, [_vm._v("Contract No:")]), _c('span', {
    staticClass: "col-md-8 x-desc"
  }, [_vm._v(_vm._s(_vm.event.contract.contract_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-4 x-label"
  }, [_vm._v("Start:")]), _c('span', {
    staticClass: "col-md-8 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.event.contract.period_start)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-4 x-label"
  }, [_vm._v("End:")]), _c('span', {
    staticClass: "col-md-8 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.event.contract.period_end)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-4 x-label"
  }, [_vm._v("Extra:")]), _c('span', {
    staticClass: "col-md-8 x-desc"
  }, [_vm._v(_vm._s(_vm.event.contract.extra_days))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-4 x-label"
  }, [_vm._v("Final End:")]), _c('span', {
    staticClass: "col-md-8 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.event.contract.period_end_extended)))])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-footer"
  }, [(_vm.event.canRenew) ? _c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": function($event) {
        _vm.onRenewClicked(_vm.event.id)
      }
    }
  }, [_vm._v("Renew")]) : _vm._e(), _vm._v(" "), (_vm.event.canRenew) ? _c('button', {
    staticClass: "btn btn-danger btn-block",
    on: {
      "click": function($event) {
        _vm.onTerminateClicked(_vm.event)
      }
    }
  }, [_vm._v("Terminate")]) : _vm._e()])])]), _vm._v(" "), _c('renewal'), _vm._v(" "), _c('terminate-dialog')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7eaa76be", module.exports)
  }
}

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "modal-id": "info",
      "dialog-title": "Payment Info",
      "button-type": "okOnly",
      "size": "lg"
    },
    model: {
      value: (_vm.toggle),
      callback: function($$v) {
        _vm.toggle = $$v
      },
      expression: "toggle"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Payment Status:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-4 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm.data.full_status))])])]), _vm._v(" "), _c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Type:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm.data.full_payment_type))]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Mode:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm.data.full_payment_mode))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Due Date:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.data.effectivity_date)))]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Bank:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm.data.full_bank))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("P/C No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm.data.payment_no))]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Ref#:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm.data.reference_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Period:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.data.period_start)) + " - " + _vm._s(_vm._f("toDateFormat")(_vm.data.period_end)))]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Amount:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.data.amount)))])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', [_vm._v("Deposit Info")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Date Deposited:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.data.date_deposited)))]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Account No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-4 x-desc"
  }, [_vm._v(_vm._s(_vm.data.bank_account))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-2 x-label"
  }, [_vm._v("Remarks:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-10 x-desc"
  }, [_vm._v(_vm._s(_vm.data.remarks))])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7ec10b2c", module.exports)
  }
}

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    staticClass: "form-control",
    domProps: {
      "value": _vm.value
    },
    on: {
      "change": function($event) {
        _vm.onChange($event.target.value)
      }
    }
  }, [(_vm.includeDefault) ? _c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("--Select--")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.options), function(option, index) {
    return _c('option', {
      key: index,
      domProps: {
        "value": option[_vm.keyValue]
      }
    }, [_vm._v(_vm._s(option[_vm.keyText]))])
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8547d46a", module.exports)
  }
}

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('v-panel', {
    attrs: {
      "header": "Pending Bill"
    }
  }, [_c('v-live-view', {
    attrs: {
      "grid": _vm.gridView
    },
    on: {
      "action": _vm.doAction
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8fc11914", module.exports)
  }
}

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('transition', {
    attrs: {
      "name": "v-slide-fade"
    }
  }, [(_vm.filter.field) ? _c('div', {
    staticClass: "live-views-badge"
  }, [_c('span', [_vm._v(_vm._s(_vm.filter.label))]), _vm._v(" "), _c('a', {
    staticClass: "live-views-close",
    attrs: {
      "href": "#"
    },
    on: {
      "click": _vm.clearFilter
    }
  }, [_vm._v("×")])]) : _vm._e()])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('transition', {
    attrs: {
      "name": "v-slide-fade"
    }
  }, [(_vm.fetchLoading) ? _c('div', {
    key: "loading",
    staticClass: "v-view-loading-container"
  }, [_c('div', {
    staticClass: "v-view-loading"
  }, [_c('span', {
    staticClass: "fa fa-spinner fa-pulse fa-3x fa-fw"
  }), _c('br'), _vm._v("\n                    Loading...\n                ")])]) : _c('div', {
    key: "fetched",
    staticClass: "col-md-12"
  }, [_c('table', {
    staticClass: "table table-condensed table-hover table-live-views",
    attrs: {
      "id": "grid"
    }
  }, [_c('thead', [_c('tr', [_c('th', {
    staticClass: "text-center"
  }, [_vm._v("No")]), _vm._v(" "), _vm._l((_vm.grid.columns), function(key, index) {
    return _c('th', {
      key: index,
      staticClass: "text-left",
      class: {
        info: _vm.sortKey == key.name
      },
      style: (key.style),
      on: {
        "click": function($event) {
          if ($event.target !== $event.currentTarget) { return null; }
          _vm.sortBy(key)
        }
      }
    }, [_vm._v("\n                                " + _vm._s(key.column) + "\n                                \n                                "), (_vm.isArrowVisible(key.name)) ? _c('span', {
      staticClass: "fa fa-fw",
      class: _vm.sortOrders[key.name] > 0 ?
        'fa-long-arrow-down' : 'fa-long-arrow-up'
    }) : _vm._e(), _vm._v(" "), (key.filter) ? _c('a', {
      staticClass: "filter",
      attrs: {
        "href": "#"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          _vm.filterWrap(index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-filter"
    })]) : _vm._e(), _vm._v(" "), _c('transition', {
      attrs: {
        "name": "v-slide-fade"
      }
    }, [(_vm.selectedFilter === index) ? _c('div', {
      ref: "filterWrapper",
      refInFor: true,
      staticClass: "filter-wrapper"
    }, [_c('div', {
      staticClass: "panel panel-primary wrap"
    }, [_c('div', {
      staticClass: "panel-heading"
    }, [_vm._v("Filter Panel - " + _vm._s(key.column))]), _vm._v(" "), _c('div', {
      staticClass: "panel-body"
    }, [_c('div', {
      staticClass: "form-group"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.filter.value),
        expression: "filter.value"
      }],
      staticClass: "form-control",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (_vm.filter.value)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.filter.value = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('button', {
      staticClass: "btn btn-info btn-block",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.doFilter(key.name, key.column)
        }
      }
    }, [_vm._v("\n                                                    Filter\n                                                ")])])])]) : _vm._e()])], 1)
  })], 2)]), _vm._v(" "), _c('tbody', [(_vm.filteredData.length === 0) ? _c('tr', [_c('td', {
    staticClass: "text-center",
    attrs: {
      "colspan": _vm.grid.columns.length
    }
  }, [_c('h3', {
    staticClass: "text-warning"
  }, [_vm._v("\n                            No Record found")])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredData), function(entry, index) {
    return _c('tr', {
      key: index
    }, [_vm._t("table-column", [_c('td', {
      staticClass: "text-center"
    }, [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _vm._l((_vm.grid.columns), function(key) {
      return _c('td', {
        class: key.class,
        style: (key.style)
      }, [_c('span', [_vm._v(_vm._s(_vm.render(entry, key)))]), _vm._v(" "), (key.name === '$action') ? _c('div', {
        staticClass: "btn-group"
      }, [_c('button', {
        staticClass: "btn btn-primary dropdown-toggle btn-sm",
        attrs: {
          "type": "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }
      }, [_vm._v("\n                                        Action "), _c('span', {
        staticClass: "caret"
      })]), _vm._v(" "), _c('ul', {
        staticClass: "dropdown-menu"
      }, _vm._l((_vm.actionButtons), function(action) {
        return _c('li', [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              _vm.actionTrigger(action, entry, index)
            }
          }
        }, [_vm._v(_vm._s(action.name))])])
      }))]) : (key.name === '$markDelete') ? _c('div', {
        staticClass: "text-center",
        on: {
          "click": function($event) {
            _vm.actionTrigger("delete", entry["id"])
          }
        }
      }, [_c('button', {
        staticClass: "btn btn-danger btn-xs",
        attrs: {
          "type": "button"
        }
      }, [_c('i', {
        staticClass: "fa fa-close"
      })])]) : (key.name === '$switch') ? _c('div', [_c('vswitch', {
        attrs: {
          "is-disabled": entry[key.disabled]
        },
        model: {
          value: (entry[key.bind]),
          callback: function($$v) {
            var $$exp = entry,
              $$idx = key.bind;
            if (!Array.isArray($$exp)) {
              entry[key.bind] = $$v
            } else {
              $$exp.splice($$idx, 1, $$v)
            }
          },
          expression: "entry[key.bind]"
        }
      })], 1) : _vm._e()])
    })], {
      props: {
        items: entry,
        index: index
      }
    })], 2)
  })], 2), _vm._v(" "), _c('tfoot', [_c('tr', [_vm._t("table-footer")], 2)])], 1), _vm._v(" "), _c('div', [_c('pagination', {
    attrs: {
      "param": _vm.$store.state.liveviews.items
    },
    on: {
      "click": function($event) {
        _vm.fetchData({
          paramUrl: $event,
          grid: _vm.grid
        })
      }
    }
  })], 1)])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9ccfd7c2", module.exports)
  }
}

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "modal-id": "depositModal",
      "dialog-title": "Payment Deposit"
    },
    on: {
      "dismiss": _vm.save
    },
    model: {
      value: (_vm.toggle),
      callback: function($$v) {
        _vm.toggle = $$v
      },
      expression: "toggle"
    }
  }, [_c('div', {
    staticClass: "x-lite-panel"
  }, [_c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Payment No:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-9 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm.cloneOfInstance.payment_no))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Due Date:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.cloneOfInstance.effectivity_date)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Amount:")]), _vm._v(" "), _c('strong', {
    staticClass: "col-md-9 x-desc text-danger"
  }, [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(_vm.cloneOfInstance.amount)))])]), _vm._v(" "), _c('p', {
    staticClass: "x-read-group"
  }, [_c('strong', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Period:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm._f("toDateFormat")(_vm.cloneOfInstance.period_start)) + " - " + _vm._s(_vm._f("toDateFormat")(_vm.cloneOfInstance.period_end)))])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "form-horizontal"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "payment_type"
    }
  }, [_vm._v("Accounts:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.bank_account),
      expression: "cloneOfInstance.bank_account"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "bank_accounts",
      "name": "bank_accounts"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cloneOfInstance.bank_account = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("--Select Account--")]), _vm._v(" "), _vm._l((_vm.lookups.bank_accounts), function(lookup) {
    return _c('option', {
      key: lookup.account_no,
      domProps: {
        "value": lookup.account_no
      }
    }, [_vm._v(_vm._s(lookup.account_no))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Bank:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "disabled": ""
    },
    domProps: {
      "value": _vm.bankDeposited
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Date Deposit:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "date_deposited",
      "value": _vm.cloneOfInstance.date_deposited
    },
    on: {
      "pick": function($event) {
        _vm.cloneOfInstance.date_deposited = $event
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": ""
    }
  }, [_vm._v("Remarks:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cloneOfInstance.remarks),
      expression: "cloneOfInstance.remarks"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.cloneOfInstance.remarks)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cloneOfInstance.remarks = $event.target.value
      }
    }
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-aab71940", module.exports)
  }
}

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    staticClass: "custom-control custom-checkbox"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.value),
      expression: "value"
    }],
    staticClass: "custom-control-input",
    attrs: {
      "type": "checkbox",
      "disabled": _vm.isDisabled
    },
    domProps: {
      "checked": Array.isArray(_vm.value) ? _vm._i(_vm.value, null) > -1 : (_vm.value)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.value,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.value = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.value = $$c
        }
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "custom-control-indicator"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b2ff34bc", module.exports)
  }
}

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": 'Report Parameters - ' + _vm.report_title,
      "head-icon": "fa fa-paste"
    }
  }, [(!_vm.isEmpty(_vm.selected.params)) ? _c('div', [_c('div', {
    staticClass: "form-horizontal"
  }, _vm._l((_vm.selected.params.inputs), function(input, i) {
    return _c('div', {
      key: i,
      staticClass: "form-group"
    }, [_c('label', {
      staticClass: "col-md-3"
    }, [_vm._v(_vm._s(input.label) + ":")]), _vm._v(" "), _c('div', {
      staticClass: "col-md-9"
    }, [(input.type == 'dropdown') ? _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selected.params.models[input.model]),
        expression: "selected.params.models[input.model]"
      }],
      staticClass: "form-control",
      on: {
        "change": [function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          var $$exp = _vm.selected.params.models,
            $$idx = input.model;
          if (!Array.isArray($$exp)) {
            _vm.selected.params.models[input.model] = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
          } else {
            $$exp.splice($$idx, 1, $event.target.multiple ? $$selectedVal : $$selectedVal[0])
          }
        }, function($event) {
          _vm.onChange(input, $event.target.value)
        }]
      }
    }, [(input.default === '') ? _c('option', {
      attrs: {
        "value": ""
      }
    }, [_vm._v("\n                            " + _vm._s(input.default_text) + "\n                        ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.selected.params.lookups[input.selection]), function(lookup, index) {
      return _c('option', {
        key: index,
        domProps: {
          "value": lookup[_vm.getLookupValue(input.value)]
        }
      }, [_vm._v("\n                            " + _vm._s(lookup[_vm.getLookupText(input.text)]) + "\n                        ")])
    })], 2) : _vm._e(), _vm._v(" "), (input.type == 'date') ? _c('dt-picker', {
      attrs: {
        "value": _vm.selected.params.models[input.model]
      },
      on: {
        "pick": function($event) {
          _vm.selected.params.models[input.model] = $event
        }
      }
    }) : _vm._e(), _vm._v(" "), (input.type == 'number') ? _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selected.params.models[input.model]),
        expression: "selected.params.models[input.model]"
      }],
      staticClass: "form-control",
      attrs: {
        "type": "number"
      },
      domProps: {
        "value": (_vm.selected.params.models[input.model])
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          var $$exp = _vm.selected.params.models,
            $$idx = input.model;
          if (!Array.isArray($$exp)) {
            _vm.selected.params.models[input.model] = $event.target.value
          } else {
            $$exp.splice($$idx, 1, $event.target.value)
          }
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    }) : _vm._e()], 1)])
  }))]) : _vm._e(), _vm._v(" "), _c('template', {
    slot: "panel-footer"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [(_vm.selected.report_name) ? _c('button', {
    staticClass: "btn-info btn btn-block",
    on: {
      "click": _vm.onViewReportClick
    }
  }, [_vm._v("\n                    View Report\n                ")]) : _vm._e()])])])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b6ec8262", module.exports)
  }
}

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    attrs: {
      "dialog-title": "Terminate Contract",
      "modal-id": "terminateContract"
    },
    on: {
      "dismiss": _vm.save
    },
    model: {
      value: (_vm.toggle),
      callback: function($$v) {
        _vm.toggle = $$v
      },
      expression: "toggle"
    }
  }, [_c('form', {
    staticClass: "form-horizontal",
    on: {
      "keydown": function($event) {
        _vm.validations.clear($event.target.name)
      }
    }
  }, [_c('div', {
    staticClass: "x-read-group"
  }, [_c('label', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Contract No:")]), _vm._v(" "), _c('label', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contractForTerminate.contract_no))])]), _vm._v(" "), _c('div', {
    staticClass: "x-read-group"
  }, [_c('label', {
    staticClass: "col-md-3 x-label"
  }, [_vm._v("Tenant Name:")]), _vm._v(" "), _c('label', {
    staticClass: "col-md-9 x-desc"
  }, [_vm._v(_vm._s(_vm.contractForTerminate.tenant_name))])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "description"
    }
  }, [_vm._v("Description")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contractForTerminate.description),
      expression: "contractForTerminate.description"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "description",
      "id": "description",
      "rows": "5"
    },
    domProps: {
      "value": (_vm.contractForTerminate.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contractForTerminate.description = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "description"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "ref_no"
    }
  }, [_vm._v("Ref No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contractForTerminate.ref_no),
      expression: "contractForTerminate.ref_no"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "ref_no",
      "id": "ref_no"
    },
    domProps: {
      "value": (_vm.contractForTerminate.ref_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contractForTerminate.ref_no = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "ref_no"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-md-3",
    attrs: {
      "for": "password"
    }
  }, [_vm._v("Password:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.contractForTerminate.password),
      expression: "contractForTerminate.password"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password",
      "name": "password",
      "id": "password"
    },
    domProps: {
      "value": (_vm.contractForTerminate.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.contractForTerminate.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('error-span', {
    attrs: {
      "value": _vm.errors,
      "name": "password"
    }
  })], 1)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b865b44e", module.exports)
  }
}

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('v-panel', {
    attrs: {
      "header": "Tenant Register"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-lg-2",
    attrs: {
      "align": "center"
    }
  }, [_c('img', {
    staticClass: "img-responsive",
    attrs: {
      "src": "http://via.placeholder.com/250x220"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger btn-block"
  }, [_vm._v("Upload Profile Image")])]), _vm._v(" "), _c('div', {
    staticClass: " col-md-10 col-lg-10 "
  }, [_c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Tenant Type:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.type),
      expression: "tenant.type"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "type"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.tenant.type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.lookups.tenant_type), function(lookup) {
    return _c('option', {
      domProps: {
        "value": lookup.code
      }
    }, [_vm._v(_vm._s(lookup.name))])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v(_vm._s(_vm.labels.fullName) + ":\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.full_name),
      expression: "tenant.full_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "register_tenant.full_name"
    },
    domProps: {
      "value": (_vm.tenant.full_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.full_name = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v(_vm._s(_vm.labels.regName) + ":\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.reg_name),
      expression: "tenant.reg_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "register_tenant.reg_name",
      "id": "reg_name"
    },
    domProps: {
      "value": (_vm.tenant.reg_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.reg_name = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right",
    attrs: {
      "for": "reg_id"
    }
  }, [_vm._v(_vm._s(_vm.labels.regNo) + ":\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.reg_id),
      expression: "tenant.reg_id"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "register_tenant.reg_id"
    },
    domProps: {
      "value": (_vm.tenant.reg_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.reg_id = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v(_vm._s(_vm.labels.regDate) + ":\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('dt-picker', {
    attrs: {
      "dp-name": "register_tenant.reg_date",
      "value": _vm.tenant.reg_date
    },
    on: {
      "pick": function($event) {
        _vm.tenant.reg_date = $event
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [(_vm.showGender) ? _c('div', [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Gender:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.gender),
      expression: "tenant.gender"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "gender"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.tenant.gender = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "male",
      "selected": "true"
    }
  }, [_vm._v("Male")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "female"
    }
  }, [_vm._v("Female")])])])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('div', {
    staticClass: "col-md-3"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('hr')])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Email Address:\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.email_address),
      expression: "tenant.email_address"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.email_address",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.email_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.email_address = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Mobile No:\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("(tel no or mobile)*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.mobile_no),
      expression: "tenant.mobile_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.mobile_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.mobile_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.mobile_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Tel No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tel_no),
      expression: "tenant.tel_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "tel_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tel_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tel_no = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Fax No:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.fax_no),
      expression: "tenant.fax_no"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "fax_no",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.fax_no)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.fax_no = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('div', {
    staticClass: "col-md-3"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('hr')])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Address 1:\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.address_1),
      expression: "tenant.tenant_address.address_1"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.address_instance.address_1",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.address_1)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.address_1 = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Address 2:")]), _vm._v(" "), _c('div', {
    staticClass: "col-md-9"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.address_2),
      expression: "tenant.tenant_address.address_2"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "address_2",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.address_2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.address_2 = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group row"
  }, [_c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("City:\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3 text-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.city),
      expression: "tenant.tenant_address.city"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.address_instance.city",
      "id": "register_tenant.address_instance.city",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.city)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.city = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "col-md-3 text-right"
  }, [_vm._v("Postal Code:\n                        "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tenant.tenant_address.postal_code),
      expression: "tenant.tenant_address.postal_code"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "register_tenant.address_instance.postal_code",
      "id": "register_tenant.address_instance.postal_code",
      "type": "text"
    },
    domProps: {
      "value": (_vm.tenant.tenant_address.postal_code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tenant.tenant_address.postal_code = $event.target.value
      }
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    attrs: {
      "type": "submit"
    },
    on: {
      "click": _vm.save
    }
  }, [_vm._v("Save")])])])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c9afc468", module.exports)
  }
}

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "VILLA DETAILS"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-6"
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.lookups.villa_location,
      "dvalue": "code",
      "dtext": "name",
      "include-default": true
    },
    model: {
      value: (_vm.filter.location),
      callback: function($$v) {
        _vm.filter.location = $$v
      },
      expression: "filter.location"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-md-6"
  }, [_c('v-combo-box', {
    attrs: {
      "options": _vm.villas,
      "dvalue": "id",
      "dtext": "villa_no",
      "include-default": true
    },
    on: {
      "change": _vm.selected
    },
    model: {
      value: (_vm.contract.villa_id),
      callback: function($$v) {
        _vm.contract.villa_id = $$v
      },
      expression: "contract.villa_id"
    }
  }), _vm._v(" "), _c('error', {
    attrs: {
      "errorDisplay": _vm.stateContractError.get('villa_id')
    }
  }, [_vm._v(_vm._s(_vm.stateContractError.get('villa_id')))])], 1)]), _vm._v(" "), (_vm.selectedVilla) ? _c('div', [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "panel panel-primary"
  }, [_c('div', {
    staticClass: "panel-body",
    staticStyle: {
      "padding-left": "0px",
      "padding-right": "0px"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-12"
  }, [_c('p', [_vm._v("Details:\n                "), _c('strong', [_vm._v(" " + _vm._s(_vm.selectedVilla.description))])]), _vm._v(" "), _c('p', [_vm._v("Villa Class:\n                "), _c('strong', [_vm._v(" " + _vm._s(_vm.selectedVilla.full_villa_class) + " ")])]), _vm._v(" "), _c('p', [_vm._v("Rate per Month:\n                "), _c('strong', [_vm._v(" " + _vm._s(_vm._f("toCurrencyFormat")(_vm.selectedVilla.rate_per_month)) + " QR")])]), _vm._v(" "), _c('p', [_vm._v("Status:\n                "), _c('strong', [_vm._v(" " + _vm._s(_vm.selectedVilla.full_status) + " ")])])])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cfdbe774", module.exports)
  }
}

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal fade",
    attrs: {
      "id": _vm.modalId,
      "tabindex": "-1",
      "role": "dialog"
    }
  }, [_c('div', {
    staticClass: "modal-dialog",
    class: _vm.modalSize,
    attrs: {
      "role": "document"
    }
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_c('div', {
    staticClass: "modal-header"
  }, [_c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "aria-label": "Close"
    },
    on: {
      "click": function($event) {
        _vm.dismiss(false)
      }
    }
  }, [_c('span', {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])]), _vm._v(" "), _c('h4', {
    staticClass: "modal-title"
  }, [_vm._v(_vm._s(_vm.dialogTitle))])]), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [(_vm.buttonType == 'okOnly') ? _c('div', [_c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.dismiss(false)
      }
    }
  }, [_vm._v("Ok")])]) : _c('div', [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.dismiss(false)
      }
    }
  }, [_vm._v("Close")]), _vm._v(" "), (_vm.ftype != 'search') ? _c('button', {
    staticClass: "btn btn-primary",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.dismiss(true)
      }
    }
  }, [_vm._v("\n                        " + _vm._s(_vm.saveCaptionComputed) + "\n                    ")]) : _vm._e()])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e1b8ea5c", module.exports)
  }
}

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-info"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('p', {
    staticClass: "row"
  }, [_c('strong', {
    staticClass: "col-md-3"
  }, [_vm._v("Contract No:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.contract.contract_no))])]), _vm._v(" "), _c('p', {
    staticClass: "row"
  }, [_c('strong', {
    staticClass: "col-md-3"
  }, [_vm._v("Type:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.contract.full_contract_type))])]), _vm._v(" "), _c('p', {
    staticClass: "row"
  }, [_c('strong', {
    staticClass: "col-md-3"
  }, [_vm._v("Period:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.contract.period_start) + " - " + _vm._s(_vm.contract.period_end))])]), _vm._v(" "), _c('p', {
    staticClass: "row"
  }, [_c('strong', {
    staticClass: "col-md-3"
  }, [_vm._v("Amount:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.contract.amount))])]), _vm._v(" "), _c('p', {
    staticClass: "row"
  }, [_c('strong', {
    staticClass: "col-md-3"
  }, [_vm._v("Status:")]), _vm._v(" "), _c('span', {
    staticClass: "col-md-9"
  }, [_vm._v(_vm._s(_vm.contract.full_status))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e51cc5de", module.exports)
  }
}

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('table', {
    staticClass: "table table-condensed table-hover",
    attrs: {
      "id": "grid"
    }
  }, [_c('thead', [_c('tr', {
    staticClass: "active"
  }, [(!_vm.grid.excludeIndex) ? _c('th', [_vm._v("No")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.grid.columns), function(key, index) {
    return _c('th', {
      key: index,
      staticClass: "text-center active",
      class: {
        info: _vm.sortKey == key.name
      },
      style: (key.style),
      on: {
        "click": function($event) {
          _vm.sortBy(key)
        }
      }
    }, [_vm._v("\n                    " + _vm._s(key.column) + "\n                    "), (_vm.isArrowVisible(key.name)) ? _c('span', {
      staticClass: "fa fa-fw",
      class: _vm.sortOrders[key.name] > 0 ?
        'fa-long-arrow-down' : 'fa-long-arrow-up'
    }) : _vm._e()])
  })], 2)]), _vm._v(" "), _c('tbody', [_vm._l((_vm.filteredData), function(entry, entryIndex) {
    return _c('tr', {
      key: entryIndex,
      class: {
        'danger': _vm.grid.selected === entryIndex
      }
    }, [(!_vm.grid.excludeIndex) ? _c('td', [_vm._v(_vm._s(entryIndex + 1))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.grid.columns), function(key, columnIndex) {
      return _c('td', {
        key: columnIndex,
        class: key.class,
        style: (key.style)
      }, [(key.editable) ? _c('div', [(key.itype == 'selector') ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "checked": Array.isArray(entry[key.bind]) ? _vm._i(entry[key.bind], null) > -1 : (entry[key.bind])
        },
        on: {
          "__c": function($event) {
            var $$a = entry[key.bind],
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = null,
                $$i = _vm._i($$a, $$v);
              if ($$c) {
                $$i < 0 && (entry[key.bind] = $$a.concat($$v))
              } else {
                $$i > -1 && (entry[key.bind] = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              var $$exp = entry,
                $$idx = key.bind;
              if (!Array.isArray($$exp)) {
                entry[key.bind] = $$c
              } else {
                $$exp.splice($$idx, 1, $$c)
              }
            }
          }
        }
      }) : (key.itype == 'text') ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        staticClass: "form-control",
        class: key.class,
        attrs: {
          "type": "text"
        },
        domProps: {
          "value": (entry[key.bind])
        },
        on: {
          "input": function($event) {
            if ($event.target.composing) { return; }
            var $$exp = entry,
              $$idx = key.bind;
            if (!Array.isArray($$exp)) {
              entry[key.bind] = $event.target.value
            } else {
              $$exp.splice($$idx, 1, $event.target.value)
            }
          }
        }
      }) : (key.itype == 'textarea') ? _c('textarea', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        staticClass: "form-control",
        domProps: {
          "value": (entry[key.bind])
        },
        on: {
          "input": function($event) {
            if ($event.target.composing) { return; }
            var $$exp = entry,
              $$idx = key.bind;
            if (!Array.isArray($$exp)) {
              entry[key.bind] = $event.target.value
            } else {
              $$exp.splice($$idx, 1, $event.target.value)
            }
          }
        }
      }) : _vm._e(), _vm._v(" "), (key.itype == 'dropdown') ? _c('select', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (entry[key.bind]),
          expression: "entry[key.bind]"
        }],
        staticClass: "form-control",
        on: {
          "change": function($event) {
            var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
              return o.selected
            }).map(function(o) {
              var val = "_value" in o ? o._value : o.value;
              return val
            });
            var $$exp = entry,
              $$idx = key.bind;
            if (!Array.isArray($$exp)) {
              entry[key.bind] = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
            } else {
              $$exp.splice($$idx, 1, $event.target.multiple ? $$selectedVal : $$selectedVal[0])
            }
          }
        }
      }, [(key.customDefault === undefined) ? _c('option', {
        attrs: {
          "value": ""
        }
      }, [_vm._v("--SELECT--")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.lookups[key.selection]), function(lookup, index) {
        return _c('option', {
          key: index,
          domProps: {
            "value": lookup.code
          }
        }, [_vm._v(_vm._s(lookup.name))])
      })], 2) : _vm._e()]) : _c('div', [(key.dtype === 'date') ? _c('span', [_vm._v(_vm._s(_vm._f("toDateFormat")(entry[key.name])))]) : (key.dtype === 'currency') ? _c('span', [_vm._v(_vm._s(_vm._f("toCurrencyFormat")(entry[key.name])))]) : (key.dtype === 'period') ? _c('span', [_vm._v(_vm._s(_vm._f("toDateFormat")(entry[key.from])) + " - " + _vm._s(_vm._f("toDateFormat")(entry[key.to])))]) : _c('span', [_vm._v(_vm._s(entry[key.name]))])]), _vm._v(" "), (key.name == '$action') ? _c('div', {
        staticClass: "btn-group"
      }, [_vm._m(0, true), _vm._v(" "), _c('ul', {
        staticClass: "dropdown-menu"
      }, _vm._l((_vm.actionButtons), function(action, actionIndex) {
        return _c('li', {
          key: actionIndex
        }, [_c('a', {
          attrs: {
            "href": "#"
          },
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.actionTrigger(action.key, entry, entryIndex)
            }
          }
        }, [_vm._v(_vm._s(action.name))])])
      }))]) : _vm._e(), _vm._v(" "), (key.name == '$markDelete') ? _c('div', {
        staticClass: "text-center"
      }, [_c('button', {
        staticClass: "btn btn-danger btn-xs",
        attrs: {
          "type": "button"
        },
        on: {
          "click": function($event) {
            _vm.actionTrigger("delete", entry, entryIndex)
          }
        }
      }, [_c('i', {
        staticClass: "fa fa-close"
      })])]) : _vm._e()])
    })], 2)
  }), _vm._v(" "), (_vm.data.length == 0) ? _c('tr', [_c('td', {
    staticClass: "text-center",
    attrs: {
      "colspan": _vm.grid.columns.length
    }
  }, [_c('h3', {
    staticClass: "text-warning"
  }, [_vm._v("No Record found")])])]) : _vm._e()], 2), _vm._v(" "), (_vm.grid.footers) ? _c('tfoot', [_c('tr', {
    staticClass: "active"
  }, _vm._l((_vm.grid.footers), function(footer, index) {
    return _c('th', {
      key: index,
      attrs: {
        "colspan": footer.span
      }
    }, [(footer.label) ? _c('strong', [_vm._v(_vm._s(footer.label) + " :")]) : _vm._e(), _vm._v(" "), (footer.text) ? _c('span', [_vm._v(_vm._s(footer.text))]) : _vm._e(), _vm._v(" "), (footer.slot) ? _c('span', [_vm._t("default")], 2) : _vm._e()])
  }))]) : _vm._e()], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn btn-primary dropdown-toggle btn-sm",
    attrs: {
      "type": "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }
  }, [_vm._v("\n                            Action "), _c('span', {
    staticClass: "caret"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e77b013a", module.exports)
  }
}

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorDisplay),
      expression: "errorDisplay"
    }]
  }, [_c('span', {
    staticClass: "text-danger"
  }, [_c('i', {
    staticClass: "fa fa-times-rectangle"
  }), _vm._v(" "), _c('small', [_vm._t("default")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e9ea219a", module.exports)
  }
}

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div')
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ef3bf136", module.exports)
  }
}

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "dropbox"
  }, [_c('input', {
    staticClass: "input-file",
    attrs: {
      "type": "file",
      "accept": "image/*"
    },
    on: {
      "change": _vm.previewImage
    }
  }), _vm._v(" "), _c('p', [_vm._v("Uploading files...")])]), _vm._v(" "), _c('div', {
    staticClass: "image-preview"
  }, _vm._l((_vm.imageData), function(img) {
    return _c('img', {
      staticClass: "preview",
      attrs: {
        "src": img.blob
      }
    })
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f1fafe36", module.exports)
  }
}

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-panel', {
    attrs: {
      "header": "Villas"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-2 col-md-offset-10"
  }, [_c('button', {
    staticClass: "btn btn-info btn-block",
    on: {
      "click": function($event) {
        _vm.addNew()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  }), _vm._v(" Add New ")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-9"
  }, [_c('v-live-view', {
    attrs: {
      "grid": _vm.gridView
    },
    on: {
      "action": _vm.doAction
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('div', {
    staticClass: "list-group"
  }, _vm._l((_vm.cache.status), function(count) {
    return _c('a', {
      staticClass: "list-group-item",
      attrs: {
        "href": "#"
      }
    }, [_c('i', {
      staticClass: "fa fa-home fa-fw fa-lg"
    }), _vm._v(" " + _vm._s(count.status) + "\n                    "), _c('span', {
      staticClass: "badge"
    }, [_vm._v(_vm._s(count.count))])])
  }))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fd5e1598", module.exports)
  }
}

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueSelect=e():t.VueSelect=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.mixins=e.VueSelect=void 0;var o=n(84),i=r(o),a=n(42),s=r(a);e.default=i.default,e.VueSelect=i.default,e.mixins=s.default},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(11),o=n(33),i=n(25),a=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(59),o=n(16);t.exports=function(t){return r(o(t))}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(4),o=n(14);t.exports=n(2)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(23)("wks"),o=n(15),i=n(1).Symbol,a="function"==typeof i,s=t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))};s.store=r},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(38),o=n(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(13);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(1),o=n(6),i=n(56),a=n(7),s="prototype",u=function(t,e,n){var l,c,f,p=t&u.F,d=t&u.G,h=t&u.S,b=t&u.P,v=t&u.B,y=t&u.W,g=d?o:o[e]||(o[e]={}),m=g[s],x=d?r:h?r[e]:(r[e]||{})[s];d&&(n=e);for(l in n)c=!p&&x&&void 0!==x[l],c&&l in g||(f=c?x[l]:n[l],g[l]=d&&"function"!=typeof x[l]?n[l]:v&&c?i(f,r):y&&x[l]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(f):b&&"function"==typeof f?i(Function.call,f):f,b&&((g.virtual||(g.virtual={}))[l]=f,t&u.R&&m&&!m[l]&&a(m,l,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(3),i=n(8)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(23)("keys"),o=n(15);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(13);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(1),o=n(6),i=n(19),a=n(27),s=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(8)},function(t,e){"use strict";t.exports={props:{loading:{type:Boolean,default:!1},onSearch:{type:Function,default:function(t,e){}}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.search.length>0&&(this.onSearch(this.search,this.toggleLoading),this.$emit("search",this.search,this.toggleLoading))},loading:function(t){this.mutableLoading=t}},methods:{toggleLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null==t?this.mutableLoading=!this.mutableLoading:this.mutableLoading=t}}}},function(t,e){"use strict";t.exports={watch:{typeAheadPointer:function(){this.maybeAdjustScroll()}},methods:{maybeAdjustScroll:function(){var t=this.pixelsToPointerTop(),e=this.pixelsToPointerBottom();return t<=this.viewport().top?this.scrollTo(t):e>=this.viewport().bottom?this.scrollTo(this.viewport().top+this.pointerHeight()):void 0},pixelsToPointerTop:function t(){var t=0;if(this.$refs.dropdownMenu)for(var e=0;e<this.typeAheadPointer;e++)t+=this.$refs.dropdownMenu.children[e].offsetHeight;return t},pixelsToPointerBottom:function(){return this.pixelsToPointerTop()+this.pointerHeight()},pointerHeight:function(){var t=!!this.$refs.dropdownMenu&&this.$refs.dropdownMenu.children[this.typeAheadPointer];return t?t.offsetHeight:0},viewport:function(){return{top:this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop:0,bottom:this.$refs.dropdownMenu?this.$refs.dropdownMenu.offsetHeight+this.$refs.dropdownMenu.scrollTop:0}},scrollTo:function(t){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.scrollTop=t:null}}}},function(t,e){"use strict";t.exports={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){this.typeAheadPointer=0}},methods:{typeAheadUp:function(){this.typeAheadPointer>0&&(this.typeAheadPointer--,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadDown:function(){this.typeAheadPointer<this.filteredOptions.length-1&&(this.typeAheadPointer++,this.maybeAdjustScroll&&this.maybeAdjustScroll())},typeAheadSelect:function(){this.filteredOptions[this.typeAheadPointer]?this.select(this.filteredOptions[this.typeAheadPointer]):this.taggable&&this.search.length&&this.select(this.search),this.clearSearchOnSelect&&(this.search="")}}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(13),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(9)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(19),o=n(12),i=n(39),a=n(7),s=n(3),u=n(18),l=n(61),c=n(21),f=n(68),p=n(8)("iterator"),d=!([].keys&&"next"in[].keys()),h="@@iterator",b="keys",v="values",y=function(){return this};t.exports=function(t,e,n,g,m,x,w){l(n,e,g);var O,S,_,j=function(t){if(!d&&t in C)return C[t];switch(t){case b:return function(){return new n(this,t)};case v:return function(){return new n(this,t)}}return function(){return new n(this,t)}},k=e+" Iterator",P=m==v,A=!1,C=t.prototype,M=C[p]||C[h]||m&&C[m],E=M||j(m),T=m?P?j("entries"):E:void 0,V="Array"==e?C.entries||M:M;if(V&&(_=f(V.call(new t)),_!==Object.prototype&&(c(_,k,!0),r||s(_,p)||a(_,p,y))),P&&M&&M.name!==v&&(A=!0,E=function(){return M.call(this)}),r&&!w||!d&&!A&&C[p]||a(C,p,E),u[e]=E,u[k]=y,m)if(O={values:P?E:j(v),keys:x?E:j(b),entries:T},w)for(S in O)S in C||i(C,S,O[S]);else o(o.P+o.F*(d||A),e,O);return O}},function(t,e,n){var r=n(11),o=n(65),i=n(17),a=n(22)("IE_PROTO"),s=function(){},u="prototype",l=function(){var t,e=n(32)("iframe"),r=i.length,o="<",a=">";for(e.style.display="none",n(58).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+a+"document.F=Object"+o+"/script"+a),t.close(),l=t.F;r--;)delete l[u][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[u]=r(t),n=new s,s[u]=null,n[a]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(38),o=n(17).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(3),o=n(5),i=n(55)(!1),a=n(22)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,l=[];for(n in s)n!=a&&r(s,n)&&l.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){t.exports=n(7)},function(t,e,n){var r=n(16);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),i=r(o),a=n(47),s=r(a),u=n(48),l=r(u),c=n(29),f=r(c),p=n(30),d=r(p),h=n(28),b=r(h);e.default={mixins:[f.default,d.default,b.default],props:{value:{default:null},options:{type:Array,default:function(){return[]}},maxHeight:{type:String,default:"400px"},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"fade"},clearSearchOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},getOptionLabel:{type:Function,default:function(t){return"object"===("undefined"==typeof t?"undefined":(0,l.default)(t))&&this.label&&t[this.label]?t[this.label]:t}},onChange:{type:Function,default:function(t){this.$emit("input",t)}},taggable:{type:Boolean,default:!1},pushTags:{type:Boolean,default:!1},createOption:{type:Function,default:function(t){return"object"===(0,l.default)(this.mutableOptions[0])&&(t=(0,s.default)({},this.label,t)),this.$emit("option:created",t),t}},resetOnOptionsChange:{type:Boolean,default:!1},noDrop:{type:Boolean,default:!1}},data:function(){return{search:"",open:!1,mutableValue:null,mutableOptions:[]}},watch:{value:function(t){this.mutableValue=t},mutableValue:function(t,e){this.multiple?this.onChange?this.onChange(t):null:this.onChange&&t!==e?this.onChange(t):null},options:function(t){this.mutableOptions=t},mutableOptions:function(){!this.taggable&&this.resetOnOptionsChange&&(this.mutableValue=this.multiple?[]:null)},multiple:function(t){this.mutableValue=t?[]:null}},created:function(){this.mutableValue=this.value,this.mutableOptions=this.options.slice(0),this.mutableLoading=this.loading,this.$on("option:created",this.maybePushTag)},methods:{select:function(t){this.isOptionSelected(t)?this.deselect(t):(this.taggable&&!this.optionExists(t)&&(t=this.createOption(t)),this.multiple&&!this.mutableValue?this.mutableValue=[t]:this.multiple?this.mutableValue.push(t):this.mutableValue=t),this.onAfterSelect(t)},deselect:function(t){var e=this;if(this.multiple){var n=-1;this.mutableValue.forEach(function(r){(r===t||"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label])&&(n=r)});var r=this.mutableValue.indexOf(n);this.mutableValue.splice(r,1)}else this.mutableValue=null},onAfterSelect:function(t){this.multiple||(this.open=!this.open,this.$refs.search.blur()),this.clearSearchOnSelect&&(this.search="")},toggleDropdown:function(t){t.target!==this.$refs.openIndicator&&t.target!==this.$refs.search&&t.target!==this.$refs.toggle&&t.target!==this.$el||(this.open?this.$refs.search.blur():(this.open=!0,this.$refs.search.focus()))},isOptionSelected:function(t){var e=this;if(this.multiple&&this.mutableValue){var n=!1;return this.mutableValue.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t[e.label]?n=!0:"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n}return this.mutableValue===t},onEscape:function(){this.search.length?this.search="":this.$refs.search.blur()},onSearchBlur:function(){this.open=!1,this.$emit("search:blur")},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},maybeDeleteValue:function(){if(!this.$refs.search.value.length&&this.mutableValue)return this.multiple?this.mutableValue.pop():this.mutableValue=null},optionExists:function(t){var e=this,n=!1;return this.mutableOptions.forEach(function(r){"object"===("undefined"==typeof r?"undefined":(0,l.default)(r))&&r[e.label]===t?n=!0:r===t&&(n=!0)}),n},maybePushTag:function(t){this.pushTags&&this.mutableOptions.push(t)}},computed:{dropdownClasses:function(){return{open:this.dropdownOpen,searchable:this.searchable,unsearchable:!this.searchable,loading:this.mutableLoading}},dropdownOpen:function(){return!this.noDrop&&(this.open&&!this.mutableLoading)},searchPlaceholder:function(){if(this.isValueEmpty&&this.placeholder)return this.placeholder},filteredOptions:function(){var t=this,e=this.mutableOptions.filter(function(e){return"object"===("undefined"==typeof e?"undefined":(0,l.default)(e))&&e.hasOwnProperty(t.label)?e[t.label].toLowerCase().indexOf(t.search.toLowerCase())>-1:"object"!==("undefined"==typeof e?"undefined":(0,l.default)(e))||e.hasOwnProperty(t.label)?e.toLowerCase().indexOf(t.search.toLowerCase())>-1:console.warn('[vue-select warn]: Label key "option.'+t.label+'" does not exist in options object.\nhttp://sagalbot.github.io/vue-select/#ex-labels')});return this.taggable&&this.search.length&&!this.optionExists(this.search)&&e.unshift(this.search),e},isValueEmpty:function(){return!this.mutableValue||("object"===(0,l.default)(this.mutableValue)?!(0,i.default)(this.mutableValue).length:!this.mutableValue.length)},valueAsArray:function(){return this.multiple?this.mutableValue:this.mutableValue?[this.mutableValue]:[]}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),i=r(o),a=n(30),s=r(a),u=n(29),l=r(u);e.default={ajax:i.default,pointer:s.default,pointerScroll:l.default}},function(t,e,n){t.exports={default:n(49),__esModule:!0}},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){t.exports={default:n(51),__esModule:!0}},function(t,e,n){t.exports={default:n(52),__esModule:!0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(43),i=r(o);e.default=function(t,e,n){return e in t?(0,i.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(46),i=r(o),a=n(45),s=r(a),u="function"==typeof s.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===u(i.default)?function(t){return"undefined"==typeof t?"undefined":u(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":u(t)}},function(t,e,n){n(74);var r=n(6).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(75),t.exports=n(6).Object.keys},function(t,e,n){n(78),n(76),n(79),n(80),t.exports=n(6).Symbol},function(t,e,n){n(77),n(81),t.exports=n(27).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(5),o=n(72),i=n(71);t.exports=function(t){return function(e,n,a){var s,u=r(e),l=o(u.length),c=i(a,l);if(t&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(53);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(10),o=n(37),i=n(20);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,l=0;s.length>l;)u.call(t,a=s[l++])&&e.push(a);return e}},function(t,e,n){t.exports=n(1).document&&document.documentElement},function(t,e,n){var r=n(31);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(31);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(35),o=n(14),i=n(21),a={};n(7)(a,n(8)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(10),o=n(5);t.exports=function(t,e){for(var n,i=o(t),a=r(i),s=a.length,u=0;s>u;)if(i[n=a[u++]]===e)return n}},function(t,e,n){var r=n(15)("meta"),o=n(13),i=n(3),a=n(4).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(9)(function(){return u(Object.preventExtensions({}))}),c=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;c(t)}return t[r].w},d=function(t){return l&&h.NEED&&u(t)&&!i(t,r)&&c(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(4),o=n(11),i=n(10);t.exports=n(2)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(20),o=n(14),i=n(5),a=n(25),s=n(3),u=n(33),l=Object.getOwnPropertyDescriptor;e.f=n(2)?l:function(t,e){if(t=i(t),e=a(e,!0),u)try{return l(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(5),o=n(36).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(3),o=n(40),i=n(22)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(12),o=n(6),i=n(9);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){var r=n(24),o=n(16);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),l=s.length;return u<0||u>=l?t?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===l||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(24),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(24),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){"use strict";var r=n(54),o=n(62),i=n(18),a=n(5);t.exports=n(34)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(12);r(r.S+r.F*!n(2),"Object",{defineProperty:n(4).f})},function(t,e,n){var r=n(40),o=n(10);n(69)("keys",function(){return function(t){return o(r(t))}})},function(t,e){},function(t,e,n){"use strict";var r=n(70)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(1),o=n(3),i=n(2),a=n(12),s=n(39),u=n(64).KEY,l=n(9),c=n(23),f=n(21),p=n(15),d=n(8),h=n(27),b=n(26),v=n(63),y=n(57),g=n(60),m=n(11),x=n(5),w=n(25),O=n(14),S=n(35),_=n(67),j=n(66),k=n(4),P=n(10),A=j.f,C=k.f,M=_.f,E=r.Symbol,T=r.JSON,V=T&&T.stringify,L="prototype",$=d("_hidden"),F=d("toPrimitive"),N={}.propertyIsEnumerable,B=c("symbol-registry"),D=c("symbols"),I=c("op-symbols"),z=Object[L],R="function"==typeof E,H=r.QObject,U=!H||!H[L]||!H[L].findChild,W=i&&l(function(){return 7!=S(C({},"a",{get:function(){return C(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=A(z,e);r&&delete z[e],C(t,e,n),r&&t!==z&&C(z,e,r)}:C,J=function(t){var e=D[t]=S(E[L]);return e._k=t,e},G=R&&"symbol"==typeof E.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof E},K=function(t,e,n){return t===z&&K(I,e,n),m(t),e=w(e,!0),m(n),o(D,e)?(n.enumerable?(o(t,$)&&t[$][e]&&(t[$][e]=!1),n=S(n,{enumerable:O(0,!1)})):(o(t,$)||C(t,$,O(1,{})),t[$][e]=!0),W(t,e,n)):C(t,e,n)},Y=function(t,e){m(t);for(var n,r=y(e=x(e)),o=0,i=r.length;i>o;)K(t,n=r[o++],e[n]);return t},Q=function(t,e){return void 0===e?S(t):Y(S(t),e)},Z=function(t){var e=N.call(this,t=w(t,!0));return!(this===z&&o(D,t)&&!o(I,t))&&(!(e||!o(this,t)||!o(D,t)||o(this,$)&&this[$][t])||e)},q=function(t,e){if(t=x(t),e=w(e,!0),t!==z||!o(D,e)||o(I,e)){var n=A(t,e);return!n||!o(D,e)||o(t,$)&&t[$][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=M(x(t)),r=[],i=0;n.length>i;)o(D,e=n[i++])||e==$||e==u||r.push(e);return r},tt=function(t){for(var e,n=t===z,r=M(n?I:x(t)),i=[],a=0;r.length>a;)!o(D,e=r[a++])||n&&!o(z,e)||i.push(D[e]);return i};R||(E=function(){if(this instanceof E)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===z&&e.call(I,n),o(this,$)&&o(this[$],t)&&(this[$][t]=!1),W(this,t,O(1,n))};return i&&U&&W(z,t,{configurable:!0,set:e}),J(t)},s(E[L],"toString",function(){return this._k}),j.f=q,k.f=K,n(36).f=_.f=X,n(20).f=Z,n(37).f=tt,i&&!n(19)&&s(z,"propertyIsEnumerable",Z,!0),h.f=function(t){return J(d(t))}),a(a.G+a.W+a.F*!R,{Symbol:E});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)d(et[nt++]);for(var et=P(d.store),nt=0;et.length>nt;)b(et[nt++]);a(a.S+a.F*!R,"Symbol",{for:function(t){return o(B,t+="")?B[t]:B[t]=E(t)},keyFor:function(t){if(G(t))return v(B,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){U=!0},useSimple:function(){U=!1}}),a(a.S+a.F*!R,"Object",{create:Q,defineProperty:K,defineProperties:Y,getOwnPropertyDescriptor:q,getOwnPropertyNames:X,getOwnPropertySymbols:tt}),T&&a(a.S+a.F*(!R||l(function(){var t=E();return"[null]"!=V([t])||"{}"!=V({a:t})||"{}"!=V(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!G(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!G(e))return e}),r[1]=e,V.apply(T,r)}}}),E[L][F]||n(7)(E[L],F,E[L].valueOf),f(E,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(73);for(var r=n(1),o=n(7),i=n(18),a=n(8)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;u<5;u++){var l=s[u],c=r[l],f=c&&c.prototype;f&&!f[a]&&o(f,a,l),i[l]=i.Array}},function(t,e,n){e=t.exports=n(83)(),e.push([t.id,'.v-select{position:relative;font-family:sans-serif}.v-select,.v-select *{box-sizing:border-box}.v-select .open-indicator{position:absolute;bottom:6px;right:10px;display:inline-block;cursor:pointer;pointer-events:all;transition:all .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855);opacity:1;transition:opacity .1s;height:20px;width:10px}.v-select .open-indicator:before{border-color:rgba(60,60,60,.5);border-style:solid;border-width:3px 3px 0 0;content:"";display:inline-block;height:10px;width:10px;vertical-align:top;transform:rotate(133deg);transition:all .15s cubic-bezier(1,-.115,.975,.855);transition-timing-function:cubic-bezier(1,-.115,.975,.855);box-sizing:inherit}.v-select.open .open-indicator:before{transform:rotate(315deg)}.v-select.loading .open-indicator{opacity:0}.v-select.open .open-indicator{bottom:1px}.v-select .dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;padding:0;background:none;border:1px solid rgba(60,60,60,.26);border-radius:4px;white-space:normal;transition:border-radius .25s}.v-select .dropdown-toggle:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.v-select.searchable .dropdown-toggle{cursor:text}.v-select.unsearchable .dropdown-toggle{cursor:pointer}.v-select.open .dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.v-select .dropdown-menu{display:block;position:absolute;top:100%;left:0;z-index:1000;min-width:160px;padding:5px 0;margin:0;width:100%;overflow-y:scroll;border:1px solid rgba(0,0,0,.26);box-shadow:0 3px 6px 0 rgba(0,0,0,.15);border-top:none;border-radius:0 0 4px 4px;text-align:left;list-style:none;background:#fff}.v-select .no-options{text-align:center}.v-select .selected-tag{color:#333;background-color:#f0f0f0;border:1px solid #ccc;border-radius:4px;height:26px;margin:4px 1px 0 3px;padding:1px .25em;float:left;line-height:24px}.v-select .selected-tag .close{float:none;margin-right:0;font-size:20px;appearance:none;padding:0;cursor:pointer;background:0 0;border:0;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.v-select input[type=search]::-webkit-search-cancel-button,.v-select input[type=search]::-webkit-search-decoration,.v-select input[type=search]::-webkit-search-results-button,.v-select input[type=search]::-webkit-search-results-decoration{display:none}.v-select input[type=search]::-ms-clear{display:none}.v-select input[type=search],.v-select input[type=search]:focus{appearance:none;-webkit-appearance:none;-moz-appearance:none;line-height:1.42857143;font-size:1em;height:34px;display:inline-block;border:none;outline:none;margin:0;padding:0 .5em;width:10em;max-width:100%;background:none;position:relative;box-shadow:none;float:left;clear:none}.v-select.unsearchable input[type=search]{max-width:1px}.v-select li{line-height:1.42857143}.v-select li>a{display:block;padding:3px 20px;clear:both;color:#333;white-space:nowrap}.v-select li:hover{cursor:pointer}.v-select .dropdown-menu .active>a{color:#333;background:rgba(50,50,50,.1)}.v-select .dropdown-menu>.highlight>a{background:#5897fb;color:#fff}.v-select .highlight:not(:last-child){margin-bottom:0}.v-select .spinner{opacity:0;position:absolute;top:5px;right:10px;font-size:5px;text-indent:-9999em;overflow:hidden;border-top:.9em solid hsla(0,0%,39%,.1);border-right:.9em solid hsla(0,0%,39%,.1);border-bottom:.9em solid hsla(0,0%,39%,.1);border-left:.9em solid rgba(60,60,60,.45);transform:translateZ(0);animation:vSelectSpinner 1.1s infinite linear;transition:opacity .1s}.v-select .spinner,.v-select .spinner:after{border-radius:50%;width:5em;height:5em}.v-select.loading .spinner{opacity:1}@-webkit-keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.fade-enter-active,.fade-leave-active{transition:opacity .15s cubic-bezier(1,.5,.8,1)}.fade-enter,.fade-leave-to{opacity:0}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){n(88);var r=n(85)(n(41),n(86),null,null);t.exports=r.exports},function(t,e){t.exports=function(t,e,n,r){var o,i=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,i=t.default);var s="function"==typeof i?i.options:i;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),r){var u=s.computed||(s.computed={});Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}})}return{esModule:o,exports:i,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown v-select",class:t.dropdownClasses},[n("div",{ref:"toggle",staticClass:"dropdown-toggle",on:{mousedown:function(e){e.preventDefault(),t.toggleDropdown(e)}}},[t._l(t.valueAsArray,function(e){return n("span",{key:e.index,staticClass:"selected-tag"},[t._v("\n      "+t._s(t.getOptionLabel(e))+"\n      "),t.multiple?n("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(n){t.deselect(e)}}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]):t._e()])}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],ref:"search",staticClass:"form-control",style:{width:t.isValueEmpty?"100%":"auto"},attrs:{type:"search",placeholder:t.searchPlaceholder,readonly:!t.searchable},domProps:{value:t.search},on:{keydown:[function(e){return t._k(e.keyCode,"delete",[8,46])?null:void t.maybeDeleteValue(e)},function(e){return t._k(e.keyCode,"up",38)?null:(e.preventDefault(),void t.typeAheadUp(e))},function(e){return t._k(e.keyCode,"down",40)?null:(e.preventDefault(),void t.typeAheadDown(e))}],keyup:[function(e){return t._k(e.keyCode,"esc",27)?null:void t.onEscape(e)},function(e){return t._k(e.keyCode,"enter",13)?null:(e.preventDefault(),void t.typeAheadSelect(e))}],blur:t.onSearchBlur,focus:t.onSearchFocus,input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),t.noDrop?t._e():n("i",{ref:"openIndicator",staticClass:"open-indicator",attrs:{role:"presentation"}}),t._v(" "),t._t("spinner",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.mutableLoading,expression:"mutableLoading"}],staticClass:"spinner"},[t._v("Loading...")])])],2),t._v(" "),n("transition",{attrs:{name:t.transition}},[t.dropdownOpen?n("ul",{ref:"dropdownMenu",staticClass:"dropdown-menu",style:{"max-height":t.maxHeight}},[t._l(t.filteredOptions,function(e,r){return n("li",{key:r,class:{active:t.isOptionSelected(e),highlight:r===t.typeAheadPointer},on:{mouseover:function(e){t.typeAheadPointer=r}}},[n("a",{on:{mousedown:function(n){n.preventDefault(),t.select(e)}}},[t._v("\n          "+t._s(t.getOptionLabel(e))+"\n        ")])])}),t._v(" "),t.filteredOptions.length?t._e():n("li",{staticClass:"no-options"},[t._t("no-options",[t._v("Sorry, no matching options.")])],2)],2):t._e()])],1)},staticRenderFns:[]}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=f[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(u(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(u(r.parts[i],e));f[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],s=o[2],u=o[3],l={css:a,media:s,sourceMap:u};n[i]?n[i].parts.push(l):e.push(n[i]={id:i,parts:[l]})}return e}function i(t,e){var n=h(),r=y[y.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),y.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function u(t,e){var n,r,o;if(e.singleton){var i=v++;n=b||(b=s(e)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else n=s(e),r=c.bind(null,n),o=function(){a(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;
r(t=e)}else o()}}function l(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=g(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function c(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,v=0,y=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],u=f[s.id];u.refs--,i.push(u)}if(t){var l=o(t);r(l,e)}for(var a=0;a<i.length;a++){var u=i[a];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete f[u.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(82);"string"==typeof r&&(r=[[t.id,r,""]]);n(87)(r,{});r.locals&&(t.exports=r.locals)}])});
//# sourceMappingURL=vue-select.js.map

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(234);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("5c7fa98c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3beef8c0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SearchBill.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3beef8c0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SearchBill.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(235);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("4cfbea92", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3f1cb985\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3f1cb985\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(236);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("7b6bfc4b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4aaf4ccc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VInput.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4aaf4ccc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(237);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("5df47d87", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-54583fc7\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./DataView.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-54583fc7\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./DataView.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(238);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("a7ee1eca", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5dd65970\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slider.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5dd65970\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slider.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(239);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("1eef48e2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-646ba085\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BillUpdateForm.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-646ba085\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BillUpdateForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(240);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("07030605", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6bb484b2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GridView.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6bb484b2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GridView.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(241);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("7df4c7f1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-9ccfd7c2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VLiveView.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-9ccfd7c2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VLiveView.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(242);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("b3a8d8c6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e1b8ea5c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VDialog.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e1b8ea5c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VDialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(243);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("73c88cae", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e77b013a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GridView.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e77b013a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GridView.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(244);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("5d9218dd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f1fafe36\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageUpload.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f1fafe36\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageUpload.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 365 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 366 */,
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(140);
__webpack_require__(143);
__webpack_require__(144);
module.exports = __webpack_require__(142);


/***/ })
/******/ ]);