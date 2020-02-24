/* 
  @package NOTY - Dependency-free notification library 
  @version version: 3.2.0-beta 
  @contributors https://github.com/needim/noty/graphs/contributors 
  @documentation Examples and Documentation - https://ned.im/noty 
  @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php 
*/

!function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("Noty", [], e) : "object" == typeof exports ? exports.Noty = e() : t.Noty = e()
}(this, function () {
  return function (t) {
    function e (o) {
      if (n[o])
        return n[o].exports;
      var i = n[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return t[o].call(i.exports, i, i.exports, e),
        i.l = !0,
        i.exports
    }
    var n = {};
    return e.m = t,
      e.c = n,
      e.i = function (t) {
        return t
      }
      ,
      e.d = function (t, n, o) {
        e.o(t, n) || Object.defineProperty(t, n, {
          configurable: !1,
          enumerable: !0,
          get: o
        })
      }
      ,
      e.n = function (t) {
        var n = t && t.__esModule ? function () {
          return t.default
        }
          : function () {
            return t
          }
          ;
        return e.d(n, "a", n),
          n
      }
      ,
      e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }
      ,
      e.p = "",
      e(e.s = 6)
  }([function (t, e, n) {
    "use strict";
    function o (t, e, n) {
      var o = void 0;
      if (!n) {
        for (o in e)
          if (e.hasOwnProperty(o) && e[o] === t)
            return !0
      } else
        for (o in e)
          if (e.hasOwnProperty(o) && e[o] === t)
            return !0;
      return !1
    }
    function i (t) {
      t = t || window.event,
        void 0 !== t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
    }
    function r () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
        , e = "noty_" + t + "_";
      return e += "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var e = 16 * Math.random() | 0;
        return ("x" === t ? e : 3 & e | 8).toString(16)
      })
    }
    function s (t) {
      var e = t.offsetHeight
        , n = window.getComputedStyle(t);
      return e += parseInt(n.marginTop) + parseInt(n.marginBottom)
    }
    function u (t, e, n) {
      var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      e = e.split(" ");
      for (var i = 0; i < e.length; i++)
        document.addEventListener ? t.addEventListener(e[i], n, o) : document.attachEvent && t.attachEvent("on" + e[i], n)
    }
    function a (t, e) {
      return ("string" == typeof t ? t : f(t)).indexOf(" " + e + " ") >= 0
    }
    function c (t, e) {
      var n = f(t)
        , o = n + e;
      a(n, e) || (t.className = o.substring(1))
    }
    function l (t, e) {
      var n = f(t)
        , o = void 0;
      a(t, e) && (o = n.replace(" " + e + " ", " "),
        t.className = o.substring(1, o.length - 1))
    }
    function d (t) {
      t.parentNode && t.parentNode.removeChild(t)
    }
    function f (t) {
      return (" " + (t && t.className || "") + " ").replace(/\s+/gi, " ")
    }
    function h () {
      function t () {
        b.PageHidden = document[s],
          o()
      }
      function e () {
        b.PageHidden = !0,
          o()
      }
      function n () {
        b.PageHidden = !1,
          o()
      }
      function o () {
        b.PageHidden ? i() : r()
      }
      function i () {
        setTimeout(function () {
          Object.keys(b.Store).forEach(function (t) {
            b.Store.hasOwnProperty(t) && b.Store[t].options.visibilityControl && b.Store[t].stop()
          })
        }, 100)
      }
      function r () {
        setTimeout(function () {
          Object.keys(b.Store).forEach(function (t) {
            b.Store.hasOwnProperty(t) && b.Store[t].options.visibilityControl && b.Store[t].resume()
          }),
            b.queueRenderAll()
        }, 100)
      }
      var s = void 0
        , a = void 0;
      void 0 !== document.hidden ? (s = "hidden",
        a = "visibilitychange") : void 0 !== document.msHidden ? (s = "msHidden",
          a = "msvisibilitychange") : void 0 !== document.webkitHidden && (s = "webkitHidden",
            a = "webkitvisibilitychange"),
        a && u(document, a, t),
        u(window, "blur", e),
        u(window, "focus", n)
    }
    function p (t) {
      if (t.hasSound) {
        var e = document.createElement("audio");
        t.options.sounds.sources.forEach(function (t) {
          var n = document.createElement("source");
          n.src = t,
            n.type = "audio/" + m(t),
            e.appendChild(n)
        }),
          t.barDom ? t.barDom.appendChild(e) : document.querySelector("body").appendChild(e),
          e.volume = t.options.sounds.volume,
          t.soundPlayed || (e.play(),
            t.soundPlayed = !0),
          e.onended = function () {
            d(e)
          }
      }
    }
    function m (t) {
      return t.match(/\.([^.]+)$/)[1]
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    }),
      e.css = e.deepExtend = e.animationEndEvents = void 0;
    var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    }
      : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      }
      ;
    e.inArray = o,
      e.stopPropagation = i,
      e.generateID = r,
      e.outerHeight = s,
      e.addListener = u,
      e.hasClass = a,
      e.addClass = c,
      e.removeClass = l,
      e.remove = d,
      e.classList = f,
      e.visibilityChangeFlow = h,
      e.createAudioElements = p;
    var y = n(1)
      , b = function (t) {
        if (t && t.__esModule)
          return t;
        var e = {};
        if (null != t)
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t,
          e
      }(y);
    e.animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
      e.deepExtend = function t (e) {
        e = e || {};
        for (var n = 1; n < arguments.length; n++) {
          var o = arguments[n];
          if (o)
            for (var i in o)
              o.hasOwnProperty(i) && (Array.isArray(o[i]) ? e[i] = o[i] : "object" === v(o[i]) && null !== o[i] ? e[i] = t(e[i], o[i]) : e[i] = o[i])
        }
        return e
      }
      ,
      e.css = function () {
        function t (t) {
          return t.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (t, e) {
            return e.toUpperCase()
          })
        }
        function e (t) {
          var e = document.body.style;
          if (t in e)
            return t;
          for (var n = i.length, o = t.charAt(0).toUpperCase() + t.slice(1), r = void 0; n--;)
            if ((r = i[n] + o) in e)
              return r;
          return t
        }
        function n (n) {
          return n = t(n),
            r[n] || (r[n] = e(n))
        }
        function o (t, e, o) {
          e = n(e),
            t.style[e] = o
        }
        var i = ["Webkit", "O", "Moz", "ms"]
          , r = {};
        return function (t, e) {
          var n = arguments
            , i = void 0
            , r = void 0;
          if (2 === n.length)
            for (i in e)
              e.hasOwnProperty(i) && void 0 !== (r = e[i]) && e.hasOwnProperty(i) && o(t, i, r);
          else
            o(t, n[1], n[2])
        }
      }()
  }
    , function (t, e, n) {
      "use strict";
      function o () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "global"
          , e = 0
          , n = x;
        return E.hasOwnProperty(t) && (n = E[t].maxVisible,
          Object.keys(P).forEach(function (n) {
            P[n].options.queue !== t || P[n].closed || e++
          })),
        {
          current: e,
          maxVisible: n
        }
      }
      function i (t) {
        E.hasOwnProperty(t.options.queue) || (E[t.options.queue] = {
          maxVisible: x,
          queue: []
        }),
          E[t.options.queue].queue.push(t)
      }
      function r (t) {
        if (E.hasOwnProperty(t.options.queue)) {
          var e = [];
          Object.keys(E[t.options.queue].queue).forEach(function (n) {
            E[t.options.queue].queue[n].id !== t.id && e.push(E[t.options.queue].queue[n])
          }),
            E[t.options.queue].queue = e
        }
      }
      function s () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "global";
        if (E.hasOwnProperty(t)) {
          var e = E[t].queue.shift();
          e && e.show()
        }
      }
      function u () {
        Object.keys(E).forEach(function (t) {
          s(t)
        })
      }
      function a (t) {
        var e = k.generateID("ghost")
          , n = document.createElement("div");
        n.setAttribute("id", e),
          k.css(n, {
            height: k.outerHeight(t.barDom) + "px"
          }),
          t.barDom.insertAdjacentHTML("afterend", n.outerHTML),
          k.remove(t.barDom),
          n = document.getElementById(e),
          k.addClass(n, "noty_fix_effects_height"),
          k.addListener(n, k.animationEndEvents, function () {
            k.remove(n)
          })
      }
      function c (t) {
        m(t);
        var e = '<div class="noty_body">' + t.options.text + "</div>" + d(t) + '<div class="noty_progressbar"></div>';
        t.barDom = document.createElement("div"),
          t.barDom.setAttribute("id", t.id),
          k.addClass(t.barDom, "noty_bar noty_type__" + t.options.type + " noty_theme__" + t.options.theme),
          t.barDom.innerHTML = e,
          b(t, "onTemplate")
      }
      function l (t) {
        return !(!t.options.buttons || !Object.keys(t.options.buttons).length)
      }
      function d (t) {
        if (l(t)) {
          var e = document.createElement("div");
          return k.addClass(e, "noty_buttons"),
            Object.keys(t.options.buttons).forEach(function (n) {
              e.appendChild(t.options.buttons[n].dom)
            }),
            t.options.buttons.forEach(function (t) {
              e.appendChild(t.dom)
            }),
            e.outerHTML
        }
        return ""
      }
      function f (t) {
        t.options.modal && (0 === C && p(),
          e.DocModalCount = C += 1)
      }
      function h (t) {
        if (t.options.modal && C > 0 && (e.DocModalCount = C -= 1,
          C <= 0)) {
          var n = document.querySelector(".noty_modal");
          n && (k.removeClass(n, "noty_modal_open"),
            k.addClass(n, "noty_modal_close"),
            k.addListener(n, k.animationEndEvents, function () {
              k.remove(n)
            }))
        }
      }
      function p () {
        var t = document.querySelector("body")
          , e = document.createElement("div");
        k.addClass(e, "noty_modal"),
          t.insertBefore(e, t.firstChild),
          k.addClass(e, "noty_modal_open"),
          k.addListener(e, k.animationEndEvents, function () {
            k.removeClass(e, "noty_modal_open")
          })
      }
      function m (t) {
        if (t.options.container)
          return void (t.layoutDom = document.querySelector(t.options.container));
        var e = "noty_layout__" + t.options.layout;
        t.layoutDom = document.querySelector("div#" + e),
          t.layoutDom || (t.layoutDom = document.createElement("div"),
            t.layoutDom.setAttribute("id", e),
            t.layoutDom.setAttribute("role", "alert"),
            t.layoutDom.setAttribute("aria-live", "polite"),
            k.addClass(t.layoutDom, "noty_layout"),
            document.querySelector("body").appendChild(t.layoutDom))
      }
      function v (t) {
        t.options.timeout && (t.options.progressBar && t.progressDom && k.css(t.progressDom, {
          transition: "width " + t.options.timeout + "ms linear",
          width: "0%"
        }),
          clearTimeout(t.closeTimer),
          t.closeTimer = setTimeout(function () {
            t.close()
          }, t.options.timeout))
      }
      function y (t) {
        t.options.timeout && t.closeTimer && (clearTimeout(t.closeTimer),
          t.closeTimer = -1,
          t.options.progressBar && t.progressDom && k.css(t.progressDom, {
            transition: "width 0ms linear",
            width: "100%"
          }))
      }
      function b (t, e) {
        t.listeners.hasOwnProperty(e) && t.listeners[e].forEach(function (e) {
          "function" == typeof e && e.apply(t)
        })
      }
      function w (t) {
        b(t, "afterShow"),
          v(t),
          k.addListener(t.barDom, "mouseenter", function () {
            y(t)
          }),
          k.addListener(t.barDom, "mouseleave", function () {
            v(t)
          })
      }
      function g (t) {
        delete P[t.id],
          t.closing = !1,
          b(t, "afterClose"),
          k.remove(t.barDom),
          0 !== t.layoutDom.querySelectorAll(".noty_bar").length || t.options.container || k.remove(t.layoutDom),
          (k.inArray("docVisible", t.options.titleCount.conditions) || k.inArray("docHidden", t.options.titleCount.conditions)) && D.decrement(),
          s(t.options.queue)
      }
      Object.defineProperty(e, "__esModule", {
        value: !0
      }),
        e.Defaults = e.Store = e.Queues = e.DefaultMaxVisible = e.docTitle = e.DocModalCount = e.PageHidden = void 0,
        e.getQueueCounts = o,
        e.addToQueue = i,
        e.removeFromQueue = r,
        e.queueRender = s,
        e.queueRenderAll = u,
        e.ghostFix = a,
        e.build = c,
        e.hasButtons = l,
        e.handleModal = f,
        e.handleModalClose = h,
        e.queueClose = v,
        e.dequeueClose = y,
        e.fire = b,
        e.openFlow = w,
        e.closeFlow = g;
      var _ = n(0)
        , k = function (t) {
          if (t && t.__esModule)
            return t;
          var e = {};
          if (null != t)
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e.default = t,
            e
        }(_)
        , C = (e.PageHidden = !1,
          e.DocModalCount = 0)
        , S = {
          originalTitle: null,
          count: 0,
          changed: !1,
          timer: -1
        }
        , D = e.docTitle = {
          increment: function () {
            S.count++ ,
              D._update()
          },
          decrement: function () {
            if (--S.count <= 0)
              return void D._clear();
            D._update()
          },
          _update: function () {
            var t = document.title;
            S.changed ? document.title = "(" + S.count + ") " + S.originalTitle : (S.originalTitle = t,
              document.title = "(" + S.count + ") " + t,
              S.changed = !0)
          },
          _clear: function () {
            S.changed && (S.count = 0,
              document.title = S.originalTitle,
              S.changed = !1)
          }
        }
        , x = e.DefaultMaxVisible = 5
        , E = e.Queues = {
          global: {
            maxVisible: x,
            queue: []
          }
        }
        , P = e.Store = {};
      e.Defaults = {
        type: "alert",
        layout: "topRight",
        theme: "mint",
        text: "",
        timeout: !1,
        progressBar: !0,
        closeWith: ["click"],
        animation: {
          open: "noty_effects_open",
          close: "noty_effects_close"
        },
        id: !1,
        force: !1,
        killer: !1,
        queue: "global",
        container: !1,
        buttons: [],
        callbacks: {
          beforeShow: null,
          onShow: null,
          afterShow: null,
          onClose: null,
          afterClose: null,
          onClick: null,
          onHover: null,
          onTemplate: null
        },
        sounds: {
          sources: [],
          volume: 1,
          conditions: []
        },
        titleCount: {
          conditions: []
        },
        modal: !1,
        visibilityControl: !1
      }
    }
    , function (t, e, n) {
      "use strict";
      function o (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(e, "__esModule", {
        value: !0
      }),
        e.NotyButton = void 0;
      var i = n(0)
        , r = function (t) {
          if (t && t.__esModule)
            return t;
          var e = {};
          if (null != t)
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e.default = t,
            e
        }(i);
      e.NotyButton = function t (e, n, i) {
        var s = this
          , u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        return o(this, t),
          this.dom = document.createElement("button"),
          this.dom.innerHTML = e,
          this.id = u.id = u.id || r.generateID("button"),
          this.cb = i,
          Object.keys(u).forEach(function (t) {
            s.dom.setAttribute(t, u[t])
          }),
          r.addClass(this.dom, n || "noty_btn"),
          this
      }
    }
    , function (t, e, n) {
      "use strict";
      function o (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(e, "__esModule", {
        value: !0
      });
      var i = function () {
        function t (t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1,
              o.configurable = !0,
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o)
          }
        }
        return function (e, n, o) {
          return n && t(e.prototype, n),
            o && t(e, o),
            e
        }
      }();
      e.Push = function () {
        function t () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/service-worker.js";
          return o(this, t),
            this.subData = {},
            this.workerPath = e,
            this.listeners = {
              onPermissionGranted: [],
              onPermissionDenied: [],
              onSubscriptionSuccess: [],
              onSubscriptionCancel: [],
              onWorkerError: [],
              onWorkerSuccess: [],
              onWorkerNotSupported: []
            },
            this
        }
        return i(t, [{
          key: "on",
          value: function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () { }
              ;
            return "function" == typeof e && this.listeners.hasOwnProperty(t) && this.listeners[t].push(e),
              this
          }
        }, {
          key: "fire",
          value: function (t) {
            var e = this
              , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            this.listeners.hasOwnProperty(t) && this.listeners[t].forEach(function (t) {
              "function" == typeof t && t.apply(e, n)
            })
          }
        }, {
          key: "create",
          value: function () {
            console.log("NOT IMPLEMENTED YET")
          }
        }, {
          key: "isSupported",
          value: function () {
            var t = !1;
            try {
              t = window.Notification || window.webkitNotifications || navigator.mozNotification || window.external && void 0 !== window.external.msIsSiteMode()
            } catch (t) { }
            return t
          }
        }, {
          key: "getPermissionStatus",
          value: function () {
            var t = "default";
            if (window.Notification && window.Notification.permissionLevel)
              t = window.Notification.permissionLevel;
            else if (window.webkitNotifications && window.webkitNotifications.checkPermission)
              switch (window.webkitNotifications.checkPermission()) {
                case 1:
                  t = "default";
                  break;
                case 0:
                  t = "granted";
                  break;
                default:
                  t = "denied"
              }
            else
              window.Notification && window.Notification.permission ? t = window.Notification.permission : navigator.mozNotification ? t = "granted" : window.external && void 0 !== window.external.msIsSiteMode() && (t = window.external.msIsSiteMode() ? "granted" : "default");
            return t.toString().toLowerCase()
          }
        }, {
          key: "getEndpoint",
          value: function (t) {
            var e = t.endpoint
              , n = t.subscriptionId;
            return n && -1 === e.indexOf(n) && (e += "/" + n),
              e
          }
        }, {
          key: "isSWRegistered",
          value: function () {
            try {
              return "activated" === navigator.serviceWorker.controller.state
            } catch (t) {
              return !1
            }
          }
        }, {
          key: "unregisterWorker",
          value: function () {
            var t = this;
            "serviceWorker" in navigator && navigator.serviceWorker.getRegistrations().then(function (e) {
              var n = !0
                , o = !1
                , i = void 0;
              try {
                for (var r, s = e[Symbol.iterator](); !(n = (r = s.next()).done); n = !0) {
                  r.value.unregister(),
                    t.fire("onSubscriptionCancel")
                }
              } catch (t) {
                o = !0,
                  i = t
              } finally {
                try {
                  !n && s.return && s.return()
                } finally {
                  if (o)
                    throw i
                }
              }
            })
          }
        }, {
          key: "requestSubscription",
          value: function () {
            var t = this
              , e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
              , n = this
              , o = this.getPermissionStatus()
              , i = function (o) {
                "granted" === o ? (t.fire("onPermissionGranted"),
                  "serviceWorker" in navigator ? navigator.serviceWorker.register(t.workerPath).then(function () {
                    navigator.serviceWorker.ready.then(function (t) {
                      n.fire("onWorkerSuccess"),
                        t.pushManager.subscribe({
                          userVisibleOnly: e
                        }).then(function (t) {
                          var e = t.getKey("p256dh")
                            , o = t.getKey("auth");
                          n.subData = {
                            endpoint: n.getEndpoint(t),
                            p256dh: e ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(e))) : null,
                            auth: o ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(o))) : null
                          },
                            n.fire("onSubscriptionSuccess", [n.subData])
                        }).catch(function (t) {
                          n.fire("onWorkerError", [t])
                        })
                    })
                  }) : n.fire("onWorkerNotSupported")) : "denied" === o && (t.fire("onPermissionDenied"),
                    t.unregisterWorker())
              };
            "default" === o ? window.Notification && window.Notification.requestPermission ? window.Notification.requestPermission(i) : window.webkitNotifications && window.webkitNotifications.checkPermission && window.webkitNotifications.requestPermission(i) : i(o)
          }
        }]),
          t
      }()
    }
    , function (t, e, n) {
      (function (e, o) {
        /*!
* @overview es6-promise - a tiny implementation of Promises/A+.
* @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
* @license   Licensed under MIT license
*            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
* @version   4.1.1
*/
        !function (e, n) {
          t.exports = n()
        }(0, function () {
          "use strict";
          function t (t) {
            var e = typeof t;
            return null !== t && ("object" === e || "function" === e)
          }
          function i (t) {
            return "function" == typeof t
          }
          function r (t) {
            z = t
          }
          function s (t) {
            U = t
          }
          function u () {
            return void 0 !== R ? function () {
              R(c)
            }
              : a()
          }
          function a () {
            var t = setTimeout;
            return function () {
              return t(c, 1)
            }
          }
          function c () {
            for (var t = 0; t < I; t += 2) {
              (0,
                X[t])(X[t + 1]),
                X[t] = void 0,
                X[t + 1] = void 0
            }
            I = 0
          }
          function l (t, e) {
            var n = arguments
              , o = this
              , i = new this.constructor(f);
            void 0 === i[tt] && A(i);
            var r = o._state;
            return r ? function () {
              var t = n[r - 1];
              U(function () {
                return P(r, i, t, o._result)
              })
            }() : S(o, i, t, e),
              i
          }
          function d (t) {
            var e = this;
            if (t && "object" == typeof t && t.constructor === e)
              return t;
            var n = new e(f);
            return g(n, t),
              n
          }
          function f () { }
          function h () {
            return new TypeError("You cannot resolve a promise with itself")
          }
          function p () {
            return new TypeError("A promises callback cannot return that same promise.")
          }
          function m (t) {
            try {
              return t.then
            } catch (t) {
              return it.error = t,
                it
            }
          }
          function v (t, e, n, o) {
            try {
              t.call(e, n, o)
            } catch (t) {
              return t
            }
          }
          function y (t, e, n) {
            U(function (t) {
              var o = !1
                , i = v(n, e, function (n) {
                  o || (o = !0,
                    e !== n ? g(t, n) : k(t, n))
                }, function (e) {
                  o || (o = !0,
                    C(t, e))
                }, "Settle: " + (t._label || " unknown promise"));
              !o && i && (o = !0,
                C(t, i))
            }, t)
          }
          function b (t, e) {
            e._state === nt ? k(t, e._result) : e._state === ot ? C(t, e._result) : S(e, void 0, function (e) {
              return g(t, e)
            }, function (e) {
              return C(t, e)
            })
          }
          function w (t, e, n) {
            e.constructor === t.constructor && n === l && e.constructor.resolve === d ? b(t, e) : n === it ? (C(t, it.error),
              it.error = null) : void 0 === n ? k(t, e) : i(n) ? y(t, e, n) : k(t, e)
          }
          function g (e, n) {
            e === n ? C(e, h()) : t(n) ? w(e, n, m(n)) : k(e, n)
          }
          function _ (t) {
            t._onerror && t._onerror(t._result),
              D(t)
          }
          function k (t, e) {
            t._state === et && (t._result = e,
              t._state = nt,
              0 !== t._subscribers.length && U(D, t))
          }
          function C (t, e) {
            t._state === et && (t._state = ot,
              t._result = e,
              U(_, t))
          }
          function S (t, e, n, o) {
            var i = t._subscribers
              , r = i.length;
            t._onerror = null,
              i[r] = e,
              i[r + nt] = n,
              i[r + ot] = o,
              0 === r && t._state && U(D, t)
          }
          function D (t) {
            var e = t._subscribers
              , n = t._state;
            if (0 !== e.length) {
              for (var o = void 0, i = void 0, r = t._result, s = 0; s < e.length; s += 3)
                o = e[s],
                  i = e[s + n],
                  o ? P(n, o, i, r) : i(r);
              t._subscribers.length = 0
            }
          }
          function x () {
            this.error = null
          }
          function E (t, e) {
            try {
              return t(e)
            } catch (t) {
              return rt.error = t,
                rt
            }
          }
          function P (t, e, n, o) {
            var r = i(n)
              , s = void 0
              , u = void 0
              , a = void 0
              , c = void 0;
            if (r) {
              if (s = E(n, o),
                s === rt ? (c = !0,
                  u = s.error,
                  s.error = null) : a = !0,
                e === s)
                return void C(e, p())
            } else
              s = o,
                a = !0;
            e._state !== et || (r && a ? g(e, s) : c ? C(e, u) : t === nt ? k(e, s) : t === ot && C(e, s))
          }
          function T (t, e) {
            try {
              e(function (e) {
                g(t, e)
              }, function (e) {
                C(t, e)
              })
            } catch (e) {
              C(t, e)
            }
          }
          function O () {
            return st++
          }
          function A (t) {
            t[tt] = st++ ,
              t._state = void 0,
              t._result = void 0,
              t._subscribers = []
          }
          function M (t, e) {
            this._instanceConstructor = t,
              this.promise = new t(f),
              this.promise[tt] || A(this.promise),
              F(e) ? (this.length = e.length,
                this._remaining = e.length,
                this._result = new Array(this.length),
                0 === this.length ? k(this.promise, this._result) : (this.length = this.length || 0,
                  this._enumerate(e),
                  0 === this._remaining && k(this.promise, this._result))) : C(this.promise, q())
          }
          function q () {
            return new Error("Array Methods must be provided an Array")
          }
          function j (t) {
            return new M(this, t).promise
          }
          function N (t) {
            var e = this;
            return new e(F(t) ? function (n, o) {
              for (var i = t.length, r = 0; r < i; r++)
                e.resolve(t[r]).then(n, o)
            }
              : function (t, e) {
                return e(new TypeError("You must pass an array to race."))
              }
            )
          }
          function L (t) {
            var e = this
              , n = new e(f);
            return C(n, t),
              n
          }
          function H () {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
          }
          function W () {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
          }
          function Q (t) {
            this[tt] = O(),
              this._result = this._state = void 0,
              this._subscribers = [],
              f !== t && ("function" != typeof t && H(),
                this instanceof Q ? T(this, t) : W())
          }
          function V () {
            var t = void 0;
            if (void 0 !== o)
              t = o;
            else if ("undefined" != typeof self)
              t = self;
            else
              try {
                t = Function("return this")()
              } catch (t) {
                throw new Error("polyfill failed because global object is unavailable in this environment")
              }
            var e = t.Promise;
            if (e) {
              var n = null;
              try {
                n = Object.prototype.toString.call(e.resolve())
              } catch (t) { }
              if ("[object Promise]" === n && !e.cast)
                return
            }
            t.Promise = Q
          }
          var B = void 0;
          B = Array.isArray ? Array.isArray : function (t) {
            return "[object Array]" === Object.prototype.toString.call(t)
          }
            ;
          var F = B
            , I = 0
            , R = void 0
            , z = void 0
            , U = function (t, e) {
              X[I] = t,
                X[I + 1] = e,
                2 === (I += 2) && (z ? z(c) : Z())
            }
            , Y = "undefined" != typeof window ? window : void 0
            , K = Y || {}
            , G = K.MutationObserver || K.WebKitMutationObserver
            , $ = "undefined" == typeof self && void 0 !== e && "[object process]" === {}.toString.call(e)
            , J = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
            , X = new Array(1e3)
            , Z = void 0;
          Z = $ ? function () {
            return function () {
              return e.nextTick(c)
            }
          }() : G ? function () {
            var t = 0
              , e = new G(c)
              , n = document.createTextNode("");
            return e.observe(n, {
              characterData: !0
            }),
              function () {
                n.data = t = ++t % 2
              }
          }() : J ? function () {
            var t = new MessageChannel;
            return t.port1.onmessage = c,
              function () {
                return t.port2.postMessage(0)
              }
          }() : void 0 === Y ? function () {
            try {
              var t = n(9);
              return R = t.runOnLoop || t.runOnContext,
                u()
            } catch (t) {
              return a()
            }
          }() : a();
          var tt = Math.random().toString(36).substring(16)
            , et = void 0
            , nt = 1
            , ot = 2
            , it = new x
            , rt = new x
            , st = 0;
          return M.prototype._enumerate = function (t) {
            for (var e = 0; this._state === et && e < t.length; e++)
              this._eachEntry(t[e], e)
          }
            ,
            M.prototype._eachEntry = function (t, e) {
              var n = this._instanceConstructor
                , o = n.resolve;
              if (o === d) {
                var i = m(t);
                if (i === l && t._state !== et)
                  this._settledAt(t._state, e, t._result);
                else if ("function" != typeof i)
                  this._remaining-- ,
                    this._result[e] = t;
                else if (n === Q) {
                  var r = new n(f);
                  w(r, t, i),
                    this._willSettleAt(r, e)
                } else
                  this._willSettleAt(new n(function (e) {
                    return e(t)
                  }
                  ), e)
              } else
                this._willSettleAt(o(t), e)
            }
            ,
            M.prototype._settledAt = function (t, e, n) {
              var o = this.promise;
              o._state === et && (this._remaining-- ,
                t === ot ? C(o, n) : this._result[e] = n),
                0 === this._remaining && k(o, this._result)
            }
            ,
            M.prototype._willSettleAt = function (t, e) {
              var n = this;
              S(t, void 0, function (t) {
                return n._settledAt(nt, e, t)
              }, function (t) {
                return n._settledAt(ot, e, t)
              })
            }
            ,
            Q.all = j,
            Q.race = N,
            Q.resolve = d,
            Q.reject = L,
            Q._setScheduler = r,
            Q._setAsap = s,
            Q._asap = U,
            Q.prototype = {
              constructor: Q,
              then: l,
              catch: function (t) {
                return this.then(null, t)
              }
            },
            Q.polyfill = V,
            Q.Promise = Q,
            Q
        })
      }
      ).call(e, n(7), n(8))
    }
    , function (t, e) { }
    , function (t, e, n) {
      "use strict";
      function o (t) {
        if (t && t.__esModule)
          return t;
        var e = {};
        if (null != t)
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t,
          e
      }
      function i (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(e, "__esModule", {
        value: !0
      });
      var r = function () {
        function t (t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1,
              o.configurable = !0,
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o)
          }
        }
        return function (e, n, o) {
          return n && t(e.prototype, n),
            o && t(e, o),
            e
        }
      }();
      n(5);
      var s = n(4)
        , u = function (t) {
          return t && t.__esModule ? t : {
            default: t
          }
        }(s)
        , a = n(0)
        , c = o(a)
        , l = n(1)
        , d = o(l)
        , f = n(2)
        , h = n(3)
        , p = function () {
          function t () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return i(this, t),
              this.options = c.deepExtend({}, d.Defaults, e),
              d.Store[this.options.id] ? d.Store[this.options.id] : (this.id = this.options.id || c.generateID("bar"),
                this.closeTimer = -1,
                this.barDom = null,
                this.layoutDom = null,
                this.progressDom = null,
                this.showing = !1,
                this.shown = !1,
                this.closed = !1,
                this.closing = !1,
                this.killable = this.options.timeout || this.options.closeWith.length > 0,
                this.hasSound = this.options.sounds.sources.length > 0,
                this.soundPlayed = !1,
                this.listeners = {
                  beforeShow: [],
                  onShow: [],
                  afterShow: [],
                  onClose: [],
                  afterClose: [],
                  onClick: [],
                  onHover: [],
                  onTemplate: []
                },
                this.promises = {
                  show: null,
                  close: null
                },
                this.on("beforeShow", this.options.callbacks.beforeShow),
                this.on("onShow", this.options.callbacks.onShow),
                this.on("afterShow", this.options.callbacks.afterShow),
                this.on("onClose", this.options.callbacks.onClose),
                this.on("afterClose", this.options.callbacks.afterClose),
                this.on("onClick", this.options.callbacks.onClick),
                this.on("onHover", this.options.callbacks.onHover),
                this.on("onTemplate", this.options.callbacks.onTemplate),
                this)
          }
          return r(t, [{
            key: "on",
            value: function (t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () { }
                ;
              return "function" == typeof e && this.listeners.hasOwnProperty(t) && this.listeners[t].push(e),
                this
            }
          }, {
            key: "show",
            value: function () {
              var e = this;
              if (this.showing || this.shown)
                return this;
              !0 === this.options.killer ? t.closeAll() : "string" == typeof this.options.killer && t.closeAll(this.options.killer);
              var n = d.getQueueCounts(this.options.queue);
              if (n.current >= n.maxVisible || d.PageHidden && this.options.visibilityControl)
                return d.addToQueue(this),
                  d.PageHidden && this.hasSound && c.inArray("docHidden", this.options.sounds.conditions) && c.createAudioElements(this),
                  d.PageHidden && c.inArray("docHidden", this.options.titleCount.conditions) && d.docTitle.increment(),
                  this;
              if (d.Store[this.id] = this,
                d.fire(this, "beforeShow"),
                this.showing = !0,
                this.closing)
                return this.showing = !1,
                  this;
              if (d.build(this),
                d.handleModal(this),
                this.options.force ? this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild) : this.layoutDom.appendChild(this.barDom),
                this.hasSound && !this.soundPlayed && c.inArray("docVisible", this.options.sounds.conditions) && c.createAudioElements(this),
                c.inArray("docVisible", this.options.titleCount.conditions) && d.docTitle.increment(),
                this.shown = !0,
                this.closed = !1,
                d.hasButtons(this) && Object.keys(this.options.buttons).forEach(function (t) {
                  var n = e.barDom.querySelector("#" + e.options.buttons[t].id);
                  c.addListener(n, "click", function (n) {
                    c.stopPropagation(n),
                      e.options.buttons[t].cb(e)
                  })
                }),
                this.progressDom = this.barDom.querySelector(".noty_progressbar"),
                c.inArray("click", this.options.closeWith) && (c.addClass(this.barDom, "noty_close_with_click"),
                  c.addListener(this.barDom, "click", function (t) {
                    c.stopPropagation(t),
                      d.fire(e, "onClick"),
                      e.close()
                  }, !1)),
                c.addListener(this.barDom, "mouseenter", function () {
                  d.fire(e, "onHover")
                }, !1),
                this.options.timeout && c.addClass(this.barDom, "noty_has_timeout"),
                this.options.progressBar && c.addClass(this.barDom, "noty_has_progressbar"),
                c.inArray("button", this.options.closeWith)) {
                c.addClass(this.barDom, "noty_close_with_button");
                var o = document.createElement("div");
                c.addClass(o, "noty_close_button"),
                  o.innerHTML = "��",
                  this.barDom.appendChild(o),
                  c.addListener(o, "click", function (t) {
                    c.stopPropagation(t),
                      e.close()
                  }, !1)
              }
              return d.fire(this, "onShow"),
                null === this.options.animation.open ? this.promises.show = new u.default(function (t) {
                  t()
                }
                ) : "function" == typeof this.options.animation.open ? this.promises.show = new u.default(this.options.animation.open.bind(this)) : (c.addClass(this.barDom, this.options.animation.open),
                  this.promises.show = new u.default(function (t) {
                    c.addListener(e.barDom, c.animationEndEvents, function () {
                      c.removeClass(e.barDom, e.options.animation.open),
                        t()
                    })
                  }
                  )),
                this.promises.show.then(function () {
                  var t = e;
                  setTimeout(function () {
                    d.openFlow(t)
                  }, 100)
                }),
                this
            }
          }, {
            key: "stop",
            value: function () {
              return d.dequeueClose(this),
                this
            }
          }, {
            key: "resume",
            value: function () {
              return d.queueClose(this),
                this
            }
          }, {
            key: "setTimeout",
            value: function (t) {
              function e (e) {
                return t.apply(this, arguments)
              }
              return e.toString = function () {
                return t.toString()
              }
                ,
                e
            }(function (t) {
              if (this.stop(),
                this.options.timeout = t,
                this.barDom) {
                this.options.timeout ? c.addClass(this.barDom, "noty_has_timeout") : c.removeClass(this.barDom, "noty_has_timeout");
                var e = this;
                setTimeout(function () {
                  e.resume()
                }, 100)
              }
              return this
            })
          }, {
            key: "setText",
            value: function (t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              return this.barDom && (this.barDom.querySelector(".noty_body").innerHTML = t),
                e && (this.options.text = t),
                this
            }
          }, {
            key: "setType",
            value: function (t) {
              var e = this
                , n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (this.barDom) {
                c.classList(this.barDom).split(" ").forEach(function (t) {
                  "noty_type__" === t.substring(0, 11) && c.removeClass(e.barDom, t)
                }),
                  c.addClass(this.barDom, "noty_type__" + t)
              }
              return n && (this.options.type = t),
                this
            }
          }, {
            key: "setTheme",
            value: function (t) {
              var e = this
                , n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (this.barDom) {
                c.classList(this.barDom).split(" ").forEach(function (t) {
                  "noty_theme__" === t.substring(0, 12) && c.removeClass(e.barDom, t)
                }),
                  c.addClass(this.barDom, "noty_theme__" + t)
              }
              return n && (this.options.theme = t),
                this
            }
          }, {
            key: "close",
            value: function () {
              var t = this;
              return this.closed ? this : this.shown ? (d.fire(this, "onClose"),
                this.closing = !0,
                null === this.options.animation.close || !1 === this.options.animation.close ? this.promises.close = new u.default(function (t) {
                  t()
                }
                ) : "function" == typeof this.options.animation.close ? this.promises.close = new u.default(this.options.animation.close.bind(this)) : (c.addClass(this.barDom, this.options.animation.close),
                  this.promises.close = new u.default(function (e) {
                    c.addListener(t.barDom, c.animationEndEvents, function () {
                      t.options.force ? c.remove(t.barDom) : d.ghostFix(t),
                        e()
                    })
                  }
                  )),
                this.promises.close.then(function () {
                  d.closeFlow(t),
                    d.handleModalClose(t)
                }),
                this.closed = !0,
                this) : (d.removeFromQueue(this),
                  this)
            }
          }], [{
            key: "closeAll",
            value: function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return Object.keys(d.Store).forEach(function (e) {
                t ? d.Store[e].options.queue === t && d.Store[e].killable && d.Store[e].close() : d.Store[e].killable && d.Store[e].close()
              }),
                this
            }
          }, {
            key: "clearQueue",
            value: function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "global";
              return d.Queues.hasOwnProperty(t) && (d.Queues[t].queue = []),
                this
            }
          }, {
            key: "overrideDefaults",
            value: function (t) {
              return d.Defaults = c.deepExtend({}, d.Defaults, t),
                this
            }
          }, {
            key: "setMaxVisible",
            value: function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d.DefaultMaxVisible
                , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "global";
              return d.Queues.hasOwnProperty(e) || (d.Queues[e] = {
                maxVisible: t,
                queue: []
              }),
                d.Queues[e].maxVisible = t,
                this
            }
          }, {
            key: "button",
            value: function (t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                , n = arguments[2]
                , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
              return new f.NotyButton(t, e, n, o)
            }
          }, {
            key: "version",
            value: function () {
              return "3.2.0-beta"
            }
          }, {
            key: "Push",
            value: function (t) {
              return new h.Push(t)
            }
          }, {
            key: "Queues",
            get: function () {
              return d.Queues
            }
          }, {
            key: "PageHidden",
            get: function () {
              return d.PageHidden
            }
          }]),
            t
        }();
      e.default = p,
        "undefined" != typeof window && c.visibilityChangeFlow(),
        t.exports = e.default
    }
    , function (t, e) {
      function n () {
        throw new Error("setTimeout has not been defined")
      }
      function o () {
        throw new Error("clearTimeout has not been defined")
      }
      function i (t) {
        if (l === setTimeout)
          return setTimeout(t, 0);
        if ((l === n || !l) && setTimeout)
          return l = setTimeout,
            setTimeout(t, 0);
        try {
          return l(t, 0)
        } catch (e) {
          try {
            return l.call(null, t, 0)
          } catch (e) {
            return l.call(this, t, 0)
          }
        }
      }
      function r (t) {
        if (d === clearTimeout)
          return clearTimeout(t);
        if ((d === o || !d) && clearTimeout)
          return d = clearTimeout,
            clearTimeout(t);
        try {
          return d(t)
        } catch (e) {
          try {
            return d.call(null, t)
          } catch (e) {
            return d.call(this, t)
          }
        }
      }
      function s () {
        m && h && (m = !1,
          h.length ? p = h.concat(p) : v = -1,
          p.length && u())
      }
      function u () {
        if (!m) {
          var t = i(s);
          m = !0;
          for (var e = p.length; e;) {
            for (h = p,
              p = []; ++v < e;)
              h && h[v].run();
            v = -1,
              e = p.length
          }
          h = null,
            m = !1,
            r(t)
        }
      }
      function a (t, e) {
        this.fun = t,
          this.array = e
      }
      function c () { }
      var l, d, f = t.exports = {};
      !function () {
        try {
          l = "function" == typeof setTimeout ? setTimeout : n
        } catch (t) {
          l = n
        }
        try {
          d = "function" == typeof clearTimeout ? clearTimeout : o
        } catch (t) {
          d = o
        }
      }();
      var h, p = [], m = !1, v = -1;
      f.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
        p.push(new a(t, e)),
          1 !== p.length || m || i(u)
      }
        ,
        a.prototype.run = function () {
          this.fun.apply(null, this.array)
        }
        ,
        f.title = "browser",
        f.browser = !0,
        f.env = {},
        f.argv = [],
        f.version = "",
        f.versions = {},
        f.on = c,
        f.addListener = c,
        f.once = c,
        f.off = c,
        f.removeListener = c,
        f.removeAllListeners = c,
        f.emit = c,
        f.prependListener = c,
        f.prependOnceListener = c,
        f.listeners = function (t) {
          return []
        }
        ,
        f.binding = function (t) {
          throw new Error("process.binding is not supported")
        }
        ,
        f.cwd = function () {
          return "/"
        }
        ,
        f.chdir = function (t) {
          throw new Error("process.chdir is not supported")
        }
        ,
        f.umask = function () {
          return 0
        }
    }
    , function (t, e) {
      var n;
      n = function () {
        return this
      }();
      try {
        n = n || Function("return this")() || (0,
          eval)("this")
      } catch (t) {
        "object" == typeof window && (n = window)
      }
      t.exports = n
    }
    , function (t, e) { }
  ])
});

/* https://github.com/serkanyersen/ifvisible.js */
(function () {
  !function (a, b) {
    return "function" == typeof define && define.amd ? define(function () {
      return b()
    }) : "object" == typeof exports ? module.exports = b() : a.ifvisible = b()
  }(this, function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n;
    return i = {},
      c = document,
      k = !1,
      l = "active",
      g = 6e4,
      f = !1,
      b = function () {
        var a, b, c, d, e, f, g;
        return a = function () {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
          ,
          e = function () {
            return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
          }
          ,
          f = {},
          c = "__ceGUID",
          b = function (a, b, d) {
            return a[c] = void 0,
              a[c] || (a[c] = "ifvisible.object.event.identifier"),
              f[a[c]] || (f[a[c]] = {}),
              f[a[c]][b] || (f[a[c]][b] = []),
              f[a[c]][b].push(d)
          }
          ,
          d = function (a, b, d) {
            var e, g, h, i, j;
            if (a[c] && f[a[c]] && f[a[c]][b]) {
              for (i = f[a[c]][b],
                j = [],
                g = 0,
                h = i.length; g < h; g++)
                e = i[g],
                  j.push(e(d || {}));
              return j
            }
          }
          ,
          g = function (a, b, d) {
            var e, g, h, i, j;
            if (d) {
              if (a[c] && f[a[c]] && f[a[c]][b])
                for (j = f[a[c]][b],
                  g = h = 0,
                  i = j.length; h < i; g = ++h)
                  if (e = j[g],
                    e === d)
                    return f[a[c]][b].splice(g, 1),
                      e
            } else if (a[c] && f[a[c]] && f[a[c]][b])
              return delete f[a[c]][b]
          }
          ,
        {
          add: b,
          remove: g,
          fire: d
        }
      }(),
      a = function () {
        var a;
        return a = !1,
          function (b, c, d) {
            return a || (a = b.addEventListener ? function (a, b, c) {
              return a.addEventListener(b, c, !1)
            }
              : b.attachEvent ? function (a, b, c) {
                return a.attachEvent("on" + b, c, !1)
              }
                : function (a, b, c) {
                  return a["on" + b] = c
                }
            ),
              a(b, c, d)
          }
      }(),
      d = function (a, b) {
        var d;
        return c.createEventObject ? a.fireEvent("on" + b, d) : (d = c.createEvent("HTMLEvents"),
          d.initEvent(b, !0, !0),
          !a.dispatchEvent(d))
      }
      ,
      h = function () {
        var a, b, d, e, f;
        for (e = void 0,
          f = 3,
          d = c.createElement("div"),
          a = d.getElementsByTagName("i"),
          b = function () {
            return d.innerHTML = "<!--[if gt IE " + ++f + "]><i></i><![endif]-->",
              a[0]
          }
          ; b();)
          ;
        return f > 4 ? f : e
      }(),
      e = !1,
      n = void 0,
      "undefined" != typeof c.hidden ? (e = "hidden",
        n = "visibilitychange") : "undefined" != typeof c.mozHidden ? (e = "mozHidden",
          n = "mozvisibilitychange") : "undefined" != typeof c.msHidden ? (e = "msHidden",
            n = "msvisibilitychange") : "undefined" != typeof c.webkitHidden && (e = "webkitHidden",
              n = "webkitvisibilitychange"),
      m = function () {
        var b, d;
        return b = [],
          d = function () {
            return b.map(clearTimeout),
              "active" !== l && i.wakeup(),
              f = +new Date,
              b.push(setTimeout(function () {
                if ("active" === l)
                  return i.idle()
              }, g))
          }
          ,
          d(),
          a(c, "mousemove", d),
          a(c, "keyup", d),
          a(c, "touchstart", d),
          a(window, "scroll", d),
          i.focus(d),
          i.wakeup(d)
      }
      ,
      j = function () {
        var b;
        return !!k || (e === !1 ? (b = "blur",
          h < 9 && (b = "focusout"),
          a(window, b, function () {
            return i.blur()
          }),
          a(window, "focus", function () {
            return i.focus()
          })) : a(c, n, function () {
            return c[e] ? i.blur() : i.focus()
          }, !1),
          k = !0,
          m())
      }
      ,
      i = {
        setIdleDuration: function (a) {
          return g = 1e3 * a
        },
        getIdleDuration: function () {
          return g
        },
        getIdleInfo: function () {
          var a, b;
          return a = +new Date,
            b = {},
            "idle" === l ? (b.isIdle = !0,
              b.idleFor = a - f,
              b.timeLeft = 0,
              b.timeLeftPer = 100) : (b.isIdle = !1,
                b.idleFor = a - f,
                b.timeLeft = f + g - a,
                b.timeLeftPer = (100 - 100 * b.timeLeft / g).toFixed(2)),
            b
        },
        focus: function (a) {
          return "function" == typeof a ? this.on("focus", a) : (l = "active",
            b.fire(this, "focus"),
            b.fire(this, "wakeup"),
            b.fire(this, "statusChanged", {
              status: l
            })),
            this
        },
        blur: function (a) {
          return "function" == typeof a ? this.on("blur", a) : (l = "hidden",
            b.fire(this, "blur"),
            b.fire(this, "idle"),
            b.fire(this, "statusChanged", {
              status: l
            })),
            this
        },
        idle: function (a) {
          return "function" == typeof a ? this.on("idle", a) : (l = "idle",
            b.fire(this, "idle"),
            b.fire(this, "statusChanged", {
              status: l
            })),
            this
        },
        wakeup: function (a) {
          return "function" == typeof a ? this.on("wakeup", a) : (l = "active",
            b.fire(this, "wakeup"),
            b.fire(this, "statusChanged", {
              status: l
            })),
            this
        },
        on: function (a, c) {
          return j(),
            b.add(this, a, c),
            this
        },
        off: function (a, c) {
          return j(),
            b.remove(this, a, c),
            this
        },
        onEvery: function (a, b) {
          var c, d;
          return j(),
            c = !1,
            b && (d = setInterval(function () {
              if ("active" === l && c === !1)
                return b()
            }, 1e3 * a)),
          {
            stop: function () {
              return clearInterval(d)
            },
            pause: function () {
              return c = !0
            },
            resume: function () {
              return c = !1
            },
            code: d,
            callback: b
          }
        },
        now: function (a) {
          return j(),
            l === (a || "active")
        }
      }
  })
}
).call(this);

var funcExecTime = 0, queryParams, timeOutHandle = -1, cd = -1, time, activemode, noti_interval, notis = {};
Noty.setMaxVisible(20, 'noti');
Noty.setMaxVisible(3, 'credit');

function noti_run (params, idle, interval) {
  queryParams = params;
  addEventListener('storage', function (e) {
    if (e.key.substr(0, 5) != 'noti_' || e.newValue)
      return;
    var noti_key = e.key.substr(5);
    if (notis[noti_key]) {
      var noti_tmp = notis[noti_key];
      delete notis[noti_key];
      // ��ɾ���������ظ�ִ��
      noti_tmp.setType('hide');
      noti_tmp.close();
    }
  });
  if (activemode) {
    noti_interval = interval;
    ifvisible.setIdleDuration(idle / 1000);
    ifvisible.on('idle', stopNoti);
    ifvisible.on('wakeup', startNoti);
    if (ifvisible.now('active')) {
      startNoti();
    }
  } else {
    getMsg();
  }
}

function isEmptyNotis () {
  for (var x in notis) {
    if (notis.hasOwnProperty(x))
      return false;
  }
  return true;
}

function startNoti () {
  if (timeOutHandle == -1) {
    timeOutHandle = setInterval(getMsg, noti_interval);
  }
  getMsg();
}

function stopNoti () {
  if (timeOutHandle != -1) {
    clearInterval(timeOutHandle);
    timeOutHandle = -1;
  }
}

function getMsg () {
  if (funcExecTime < 0 || !isEmptyNotis())
    return;
  if (inCd())
    return;

  funcExecTime += 1;
  var ajax = new Ajax();
  var isMobile = window.matchMedia && window.matchMedia('(max-width: 650px)').matches || window.innerWidth <= 650;
  getMsgURL = 'plugin.php?id=noti&inajax=yes&action=checknew' + queryParams + '&time=' + time + '&handlekey=getMsg&m=' + (isMobile ? '1' : '0') + '&f=' + Math.random();
  ajax.get(getMsgURL, function (s) {
    var data = JSON.parse(s);
    if (!isUndefined(data['lastTime'])) {
      time = data['lastTime'];
    }
    if (!data) {
      funcExecTime = -1;
      return;
    }
    if (data['status'] == 0) {
      popNoti(data);
      if (!isEmptyNotis()) {
        clearCd();
      }
    } else if (data['status'] == -1) {
      notiStorage_clear();
    } else if (data['status'] == -2) {
      funcExecTime = -2;
    }
  });
}

function inCd () {
  if (cd != -1)
    return true;
  cd = setTimeout(function () {
    cd = -1;
  }, Math.round(noti_interval * 0.5));
  return false;
}

function clearCd () {
  if (cd != -1) {
    clearTimeout(cd);
    cd = -1;
  }
}

function decodeNoti (type, data) {
  switch (type) {
    case 'newprompt':
      return data.content.replace(/<a ([^>]+)>([^<>]+)<\/a>$/i, '<a class="noti_action" $1>$2</a>').replace('<div class="quote"><blockquote></blockquote></div>', '');

    case 'newpm':
      newnoti = 'newpm';
      return '<a href="home.php?mod=space&uid=' + data.lastauthorid + '" target="_blank">' + data.lastauthor + '</a> ˵: <span id="p_gpmid_' + data.pmid + '">' + data.lastsummary + '</span> &nbsp; <a href="home.php?mod=space&do=pm">�鿴��Ϣ</a>';

    case 'newthread':
      return '�����»ظ���<a href="forum.php?mod=viewthread&tid=' + data.tid + '" target="_blank">' + data.subject + '</a>';
  }
}

function notiStorage_add (uniqueid) {
  try {
    localStorage.setItem('noti_' + uniqueid, 1);
  } catch (e) { }
}

function notiStorage_hasShown (uniqueid) {
  try {
    return localStorage.getItem('noti_' + uniqueid) > 0;
  } catch (e) {
    return true;
  }
}

function notiStorage_remove (uniqueid) {
  try {
    localStorage.removeItem('noti_' + uniqueid);
  } catch (e) { }
}

function notiStorage_clear () {
  try {
    var i = localStorage.length;
    while (i--) {
      var key = localStorage.key(i);
      if (key.substr(0, 5) == 'noti_') {
        localStorage.removeItem(key);
      }
    }
  } catch (e) { }
}

function popNoti (data) {
  var type = getcookie('noticonf').split('D');
  var pop = type[2].split('_');
  var rType;
  if (pop.length == 3) {
    rType = {
      'newprompt': pop[0],
      'newpm': pop[1],
      'newthread': pop[2]
    };
  }
  msgs = data.msg;
  for (var i = 0; i < msgs.length; i++) {
    msgs[i].unid = msgs[i].type + msgs[i].id;
    var hasShown = notiStorage_hasShown(msgs[i].unid);
    notiStorage_add(msgs[i].unid);

    notis[msgs[i].unid] = new Noty({
      text: decodeNoti(msgs[i].type, msgs[i].data) + '<a href="home.php?mod=spacecp&ac=plugin&id=noti:noti" class="noti_setting" target="_blank" title="����">?</a>',
      layout: msgs[i].layout || 'bottomRight',
      theme: 'mint',
      closeWith: ['click'],
      type: msgs[i].style || 'normal',
      timeout: rType[msgs[i].type] == 2 && !msgs[i].force ? 10000 : 0,
      animation: {
        open: msgs[i].silent || hasShown ? 'noty_effects_silent_open' : 'noty_effects_open',
        close: msgs[i].silent ? 'noty_effects_silent_close' : 'noty_effects_close'
      },
      queue: 'noti',
      callbacks: {
        onClose: (function (type, id, unid, force) {
          if (!notis[unid])
            return;
          if (rType[type] != 1 || force)
            clearNew(type, id);
          delete notis[unid];
          notiStorage_remove(unid);
        }
        ).bind(this, msgs[i].type, msgs[i].id, msgs[i].unid, msgs[i].force)
      }
    }).show();
  }

}

function clearNew (type, id) {
  var ajax = new Ajax();
  ajax.get('plugin.php?id=noti&inajax=yes&action=clearnew&ntype=' + type + '&nid=' + id + '&f=' + Math.random(), function (s) { });
}

function hookCredit () {
  var old$F = $F;

  $F = function (func, args, script) {
    if (func == '_showCreditPrompt') {
      showCreditPrompt_noty();
      return true;
    }
    return old$F(func, args, script);
  }
}

function showCreditPrompt_noty () {
  var notice = getcookie('creditnotice').split('D');
  var basev = getcookie('creditbase').split('D');
  var creditrule = decodeURI(getcookie('creditrule', 1)).replace(String.fromCharCode(9), ' ');
  if (!discuz_uid || notice.length < 2 || notice[9] != discuz_uid) {
    setcookie('creditnotice', '');
    setcookie('creditrule', '');
    return;
  }
  var creditnames = creditnotice.split(',');
  var creditinfo = [];
  var e;
  for (var i = 0; i < creditnames.length; i++) {
    e = creditnames[i].split('|');
    creditinfo[e[0]] = [e[1], e[2]];
  }
  creditShow_noty(creditinfo, notice, basev, 0, 1, creditrule);
}

function creditShow_noty (creditinfo, notice, basev, bk, first, creditrule) {
  var s = ''
    , check = 0;
  for (i = 1; i <= 8; i++) {
    v = parseInt(Math.abs(parseInt(notice[i])) / 5) + 1;
    if (notice[i] !== '0' && creditinfo[i]) {
      s += '<span>' + creditinfo[i][0] + (notice[i] != 0 ? (notice[i] > 0 ? '<em>+' : '<em class="desc">') + notice[i] + '</em>' : '') + creditinfo[i][1] + '</span>';
    }
    if (notice[i] > 0) {
      notice[i] = parseInt(notice[i]) - v;
      basev[i] = parseInt(basev[i]) + v;
    } else if (notice[i] < 0) {
      notice[i] = parseInt(notice[i]) + v;
      basev[i] = parseInt(basev[i]) - v;
    }
    if ($('hcredit_' + i)) {
      $('hcredit_' + i).innerHTML = basev[i];
    }
  }
  for (i = 1; i <= 8; i++) {
    if (notice[i] != 0) {
      check = 1;
    }
  }
  if (!s || first) {
    setcookie('creditnotice', '');
    setcookie('creditbase', '');
    setcookie('creditrule', '');
    if (!s) {
      return;
    }
  }

  new Noty({
    text: '<div id="creditpromptdiv">' + (creditrule ? '<i>' + creditrule + '</i> ' : '') + s + '</div>',
    layout: 'bottomCenter',
    theme: 'mint',
    closeWith: ['click'],
    type: 'credit',
    timeout: 2000,
    progressBar: false,
    animation: {
      open: 'noty_effects_bottom_open',
      close: 'noty_effects_bottom_close'
    },
    queue: 'credit',
    callbacks: {}
  }).show();
  return;
}
