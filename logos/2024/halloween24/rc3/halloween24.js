(function() {
    'use strict';
    var h, aa = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("a");
    }
    var ca = ba(this);

    function da(a, b) {
        if (b) a: {
            var c = ca;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && b != null && aa(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }

    function ea(a) {
        function b(d) {
            return a.next(d)
        }

        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        })
    }

    function m(a) {
        return ea(a())
    }
    da("Symbol.dispose", function(a) {
        return a ? a : Symbol("Symbol.dispose")
    });

    function fa(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function() {
            return e
        };
        return e
    }
    da("Array.prototype.values", function(a) {
        return a ? a : function() {
            return fa(this, function(b, c) {
                return c
            })
        }
    });
    da("globalThis", function(a) {
        return a || ca
    });
    da("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    da("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
            return c
        }
    });
    da("Promise.prototype.finally", function(a) {
        return a ? a : function(b) {
            return this.then(function(c) {
                return Promise.resolve(b()).then(function() {
                    return c
                })
            }, function(c) {
                return Promise.resolve(b()).then(function() {
                    throw c;
                })
            })
        }
    });
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var ha = ha || {},
        ia = this || self;

    function ja(a) {
        var b = typeof a;
        b = b != "object" ? b : a ? Array.isArray(a) ? "array" : b : "null";
        return b == "array" || b == "object" && typeof a.length == "number"
    }

    function ka(a) {
        var b = typeof a;
        return b == "object" && a != null || b == "function"
    }

    function la(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ma(a, b, c) {
        if (!a) throw Error();
        if (arguments.length > 2) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function na(a, b, c) {
        na = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? la : ma;
        return na.apply(null, arguments)
    }

    function oa(a, b) {
        a = a.split(".");
        var c = ia;
        a[0] in c || typeof c.execScript == "undefined" || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || b === void 0 ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }

    function pa(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Ab = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Jf = function(d, e, f) {
            for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
            return b.prototype[e].apply(d, g)
        }
    };

    function qa(a) {
        if (!a.j) {
            a.j = !0;
            for (const b of a.u) b()
        }
    }
    class ra {
        constructor(a) {
            this.i = a;
            this.j = !1;
            this.u = []
        }
        o() {}
    };
    var sa;
    const ta = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function(a, b) {
        if (typeof a === "string") return typeof b !== "string" || b.length != 1 ? -1 : a.indexOf(b, 0);
        for (let c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    };

    function ua() {
        this.u = this.u;
        this.N = this.N
    }
    ua.prototype.u = !1;
    ua.prototype.dispose = function() {
        this.u || (this.u = !0, this.Sa())
    };
    ua.prototype[Symbol.dispose] = function() {
        this.dispose()
    };
    ua.prototype.Sa = function() {
        if (this.N)
            for (; this.N.length;) this.N.shift()()
    };

    function va(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.defaultPrevented = !1
    }
    va.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    };
    var wa = function() {
        if (!ia.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        try {
            const c = () => {};
            ia.addEventListener("test", c, b);
            ia.removeEventListener("test", c, b)
        } catch (c) {}
        return a
    }();
    var xa, ya;
    a: {
        for (var Aa = ["CLOSURE_FLAGS"], Ba = ia, Ca = 0; Ca < Aa.length; Ca++)
            if (Ba = Ba[Aa[Ca]], Ba == null) {
                ya = null;
                break a
            } ya = Ba
    }
    var Da = ya && ya[610401301];
    xa = Da != null ? Da : !1;
    var Ea;
    const Fa = ia.navigator;
    Ea = Fa ? Fa.userAgentData || null : null;

    function Ga(a) {
        return xa ? Ea ? Ea.brands.some(({
            brand: b
        }) => b && b.indexOf(a) != -1) : !1 : !1
    }

    function Ha(a) {
        var b;
        a: {
            if (b = ia.navigator)
                if (b = b.userAgent) break a;b = ""
        }
        return b.indexOf(a) != -1
    };

    function Ia() {
        return xa ? !!Ea && Ea.brands.length > 0 : !1
    }

    function Ja() {
        return Ia() ? Ga("Chromium") : (Ha("Chrome") || Ha("CriOS")) && !(Ia() ? 0 : Ha("Edge")) || Ha("Silk")
    };
    var Ka = Ia() ? !1 : Ha("Trident") || Ha("MSIE");

    function La(a, b) {
        va.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.i = null;
        if (a) {
            const c = this.type = a.type,
                d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.g = b;
            b = a.relatedTarget;
            b || (c == "mouseover" ? b = a.fromElement : c == "mouseout" &&
                (b = a.toElement));
            this.relatedTarget = b;
            d ? (this.clientX = d.clientX !== void 0 ? d.clientX : d.pageX, this.clientY = d.clientY !== void 0 ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX, this.clientY = a.clientY !== void 0 ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = a.pointerType;
            this.state = a.state;
            this.i = a;
            a.defaultPrevented && La.Ab.preventDefault.call(this)
        }
    }
    pa(La, va);
    La.prototype.preventDefault = function() {
        La.Ab.preventDefault.call(this);
        const a = this.i;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    var Ma = "closure_listenable_" + (Math.random() * 1E6 | 0);

    function Na(a) {
        return !(!a || !a[Ma])
    };
    var Oa = 0;

    function Pa(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Jb = e;
        this.key = ++Oa;
        this.wb = this.Hb = !1
    }

    function Qa(a) {
        a.wb = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.Jb = null
    };

    function Ra(a, b, c) {
        for (const d in a) b.call(c, a[d], d, a)
    }
    const Sa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ta(a, b) {
        let c, d;
        for (let e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (let f = 0; f < Sa.length; f++) c = Sa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };

    function Ua(a) {
        this.src = a;
        this.g = {};
        this.i = 0
    }
    Ua.prototype.add = function(a, b, c, d, e) {
        const f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [], this.i++);
        const g = Va(a, b, d, e);
        g > -1 ? (b = a[g], c || (b.Hb = !1)) : (b = new Pa(b, this.src, f, !!d, e), b.Hb = c, a.push(b));
        return b
    };

    function Wa(a, b) {
        const c = b.type;
        if (!(c in a.g)) return !1;
        var d = a.g[c];
        const e = ta(d, b);
        let f;
        (f = e >= 0) && Array.prototype.splice.call(d, e, 1);
        f && (Qa(b), a.g[c].length == 0 && (delete a.g[c], a.i--));
        return f
    }

    function Va(a, b, c, d) {
        for (let e = 0; e < a.length; ++e) {
            const f = a[e];
            if (!f.wb && f.listener == b && f.capture == !!c && f.Jb == d) return e
        }
        return -1
    };
    var Xa = "closure_lm_" + (Math.random() * 1E6 | 0),
        Ya = {},
        Za = 0;

    function $a(a, b, c, d, e) {
        if (d && d.once) return ab(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (let f = 0; f < b.length; f++) $a(a, b[f], c, d, e);
            return null
        }
        c = bb(c);
        return Na(a) ? cb(a, b, c, ka(d) ? !!d.capture : !!d, e) : db(a, b, c, !1, d, e)
    }

    function db(a, b, c, d, e, f) {
        if (!b) throw Error("b");
        const g = ka(e) ? !!e.capture : !!e;
        let k = fb(a);
        k || (a[Xa] = k = new Ua(a));
        c = k.add(b, c, d, g, f);
        if (c.proxy) return c;
        d = gb();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) wa || (e = g), e === void 0 && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(hb(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error("c");
        Za++;
        return c
    }

    function gb() {
        function a(c) {
            return b.call(a.src, a.listener, c)
        }
        const b = ib;
        return a
    }

    function ab(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (let f = 0; f < b.length; f++) ab(a, b[f], c, d, e);
            return null
        }
        c = bb(c);
        return Na(a) ? a.j.add(String(b), c, !0, ka(d) ? !!d.capture : !!d, e) : db(a, b, c, !0, d, e)
    }

    function jb(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) jb(a, b[f], c, d, e);
        else(d = ka(d) ? !!d.capture : !!d, c = bb(c), Na(a)) ? (a = a.j, f = String(b).toString(), f in a.g && (b = a.g[f], c = Va(b, c, d, e), c > -1 && (Qa(b[c]), Array.prototype.splice.call(b, c, 1), b.length == 0 && (delete a.g[f], a.i--)))) : a && (a = fb(a)) && (b = a.g[b.toString()], a = -1, b && (a = Va(b, c, d, e)), (c = a > -1 ? b[a] : null) && kb(c))
    }

    function kb(a) {
        if (typeof a === "number" || !a || a.wb) return !1;
        const b = a.src;
        if (Na(b)) return Wa(b.j, a);
        var c = a.type;
        const d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(hb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        Za--;
        (c = fb(b)) ? (Wa(c, a), c.i == 0 && (c.src = null, b[Xa] = null)) : Qa(a);
        return !0
    }

    function hb(a) {
        return a in Ya ? Ya[a] : Ya[a] = "on" + a
    }

    function ib(a, b) {
        if (a.wb) a = !0;
        else {
            b = new La(b, this);
            const c = a.listener,
                d = a.Jb || a.src;
            a.Hb && kb(a);
            a = c.call(d, b)
        }
        return a
    }

    function fb(a) {
        a = a[Xa];
        return a instanceof Ua ? a : null
    }
    var lb = "__closure_events_fn_" + (Math.random() * 1E9 >>> 0);

    function bb(a) {
        if (typeof a === "function") return a;
        a[lb] || (a[lb] = function(b) {
            return a.handleEvent(b)
        });
        return a[lb]
    };

    function mb() {
        ua.call(this);
        this.j = new Ua(this);
        this.Ia = this;
        this.ta = null
    }
    pa(mb, ua);
    mb.prototype[Ma] = !0;
    mb.prototype.addEventListener = function(a, b, c, d) {
        $a(this, a, b, c, d)
    };
    mb.prototype.removeEventListener = function(a, b, c, d) {
        jb(this, a, b, c, d)
    };

    function nb(a, b) {
        var c, d = a.ta;
        if (d)
            for (c = []; d; d = d.ta) c.push(d);
        a = a.Ia;
        d = b.type || b;
        if (typeof b === "string") b = new va(b, a);
        else if (b instanceof va) b.target = b.target || a;
        else {
            var e = b;
            b = new va(d, a);
            Ta(b, e)
        }
        e = !0;
        let f, g;
        if (c)
            for (g = c.length - 1; g >= 0; g--) f = b.g = c[g], e = ob(f, d, !0, b) && e;
        f = b.g = a;
        e = ob(f, d, !0, b) && e;
        e = ob(f, d, !1, b) && e;
        if (c)
            for (g = 0; g < c.length; g++) f = b.g = c[g], e = ob(f, d, !1, b) && e
    }
    mb.prototype.Sa = function() {
        mb.Ab.Sa.call(this);
        this.Yb();
        this.ta = null
    };

    function cb(a, b, c, d, e) {
        return a.j.add(String(b), c, !1, d, e)
    }
    mb.prototype.Yb = function() {
        if (this.j) {
            var a = this.j;
            let b = 0;
            for (const c in a.g) {
                const d = a.g[c];
                for (let e = 0; e < d.length; e++) ++b, Qa(d[e]);
                delete a.g[c];
                a.i--
            }
        }
    };

    function ob(a, b, c, d) {
        b = a.j.g[String(b)];
        if (!b) return !0;
        b = b.concat();
        let e = !0;
        for (let f = 0; f < b.length; ++f) {
            const g = b[f];
            if (g && !g.wb && g.capture == c) {
                const k = g.listener,
                    l = g.Jb || g.src;
                g.Hb && Wa(a.j, g);
                e = k.call(l, d) !== !1 && e
            }
        }
        return e && !d.defaultPrevented
    };
    /*

     Copyright Google LLC
     SPDX-License-Identifier: Apache-2.0
    */
    let pb = globalThis.trustedTypes,
        qb;

    function rb() {
        let a = null;
        if (!pb) return a;
        try {
            const b = c => c;
            a = pb.createPolicy("goog#html", {
                createHTML: b,
                createScript: b,
                createScriptURL: b
            })
        } catch (b) {}
        return a
    }

    function sb() {
        qb === void 0 && (qb = rb());
        return qb
    };
    var tb = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g + ""
        }
    };

    function ub(a) {
        const b = sb();
        return new tb(b ? b.createScriptURL(a) : a)
    };
    var vb = class {
            constructor(a) {
                this.g = a
            }
            toString() {
                return this.g
            }
        },
        wb = new vb("about:invalid#zClosurez");
    class xb {
        constructor(a) {
            this.le = a
        }
    }

    function yb(a) {
        return new xb(b => b.substr(0, a.length + 1).toLowerCase() === a + ":")
    }
    const zb = [yb("data"), yb("http"), yb("https"), yb("mailto"), yb("ftp"), new xb(a => /^[^:]*([/?#]|$)/.test(a))];

    function Ab(a, b = zb) {
        if (a instanceof vb) return a;
        for (let c = 0; c < b.length; ++c) {
            const d = b[c];
            if (d instanceof xb && d.le(a)) return new vb(a)
        }
    }
    var Bb = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;

    function Cb(a) {
        if (a instanceof vb)
            if (a instanceof vb) a = a.g;
            else throw Error("d");
        else a = Bb.test(a) ? a : void 0;
        return a
    };
    var Db = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g + ""
        }
    };

    function Eb(a) {
        const b = sb();
        return new Db(b ? b.createHTML(a) : a)
    }

    function Fb(a) {
        if (a instanceof Db) return a.g;
        throw Error("d");
    };

    function Gb(a, b = `unexpected value ${a}!`) {
        throw Error(b);
    };

    function Hb(a) {
        var b = window;
        a = Cb(a);
        a !== void 0 && b.open(a, void 0, void 0)
    }

    function Ib(a = document) {
        let b, c;
        a = (c = (b = "document" in a ? a.document : a).querySelector) == null ? void 0 : c.call(b, "script[nonce]");
        return a == null ? "" : a.nonce || a.getAttribute("nonce") || ""
    };

    function Jb(a) {
        var b = Kb`//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
        if (b instanceof tb) b = b.g;
        else throw Error("d");
        a.src = b;
        (b = Ib(a.ownerDocument && a.ownerDocument.defaultView || window)) && a.setAttribute("nonce", b)
    };

    function Lb(a, b, c) {
        b = String(b);
        let d = c;
        b.toLowerCase() === "inserthtml" && (d = Fb(c));
        return a.execCommand(b, !1, d)
    };
    var Mb = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

    function Nb(a, b) {
        if (a) {
            a = a.split("&");
            for (let c = 0; c < a.length; c++) {
                const d = a[c].indexOf("=");
                let e, f = null;
                d >= 0 ? (e = a[c].substring(0, d), f = a[c].substring(d + 1)) : e = a[c];
                b(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
            }
        }
    };

    function Ob() {
        mb.call(this);
        this.headers = new Map;
        this.i = !1;
        this.g = null;
        this.W = "";
        this.o = this.U = this.v = this.T = !1;
        this.ya = null;
        this.wa = "";
        this.Ga = !1
    }
    pa(Ob, mb);
    var Pb = /^https?$/i,
        Qb = ["POST", "PUT"];

    function Rb(a, b) {
        if (a.g) throw Error("e`" + a.W + "`" + b);
        a.W = b;
        a.T = !1;
        a.i = !0;
        a.g = new XMLHttpRequest;
        a.g.onreadystatechange = na(a.Kc, a);
        try {
            a.U = !0, a.g.open("GET", String(b), !0), a.U = !1
        } catch (e) {
            Sb(a);
            return
        }
        b = new Map(a.headers);
        const c = Array.from(b.keys()).find(e => "content-type" == e.toLowerCase()),
            d = ia.FormData && !1;
        !(ta(Qb, "GET") >= 0) || c || d || b.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        for (const [e, f] of b) a.g.setRequestHeader(e, f);
        a.wa && (a.g.responseType = a.wa);
        "withCredentials" in a.g &&
            a.g.withCredentials !== a.Ga && (a.g.withCredentials = a.Ga);
        try {
            Tb(a), a.v = !0, a.g.send(""), a.v = !1
        } catch (e) {
            Sb(a)
        }
    }

    function Sb(a) {
        a.i = !1;
        a.g && (a.o = !0, a.g.abort(), a.o = !1);
        Ub(a);
        Vb(a)
    }

    function Ub(a) {
        a.T || (a.T = !0, nb(a, "complete"), nb(a, "error"))
    }
    h = Ob.prototype;
    h.abort = function() {
        this.g && this.i && (this.i = !1, this.o = !0, this.g.abort(), this.o = !1, nb(this, "complete"), nb(this, "abort"), Vb(this))
    };
    h.Sa = function() {
        this.g && (this.i && (this.i = !1, this.o = !0, this.g.abort(), this.o = !1), Vb(this, !0));
        Ob.Ab.Sa.call(this)
    };
    h.Kc = function() {
        this.u || (this.U || this.v || this.o ? Wb(this) : this.De())
    };
    h.De = function() {
        Wb(this)
    };

    function Wb(a) {
        if (a.i && typeof ha != "undefined")
            if (a.v && (a.g ? a.g.readyState : 0) == 4) setTimeout(a.Kc.bind(a), 0);
            else if (nb(a, "readystatechange"), (a.g ? a.g.readyState : 0) == 4) {
            a.i = !1;
            try {
                try {
                    var b = (a.g ? a.g.readyState : 0) > 2 ? a.g.status : -1
                } catch (f) {
                    b = -1
                }
                a: switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var c = !0;
                        break a;
                    default:
                        c = !1
                }
                var d;
                if (!(d = c)) {
                    var e;
                    if (e = b === 0) {
                        let f = String(a.W).match(Mb)[1] || null;
                        !f && ia.self && ia.self.location && (f = ia.self.location.protocol.slice(0, -1));
                        e = !Pb.test(f ?
                            f.toLowerCase() : "")
                    }
                    d = e
                }
                d ? (nb(a, "complete"), nb(a, "success")) : Ub(a)
            } finally {
                Vb(a)
            }
        }
    }

    function Vb(a, b) {
        if (a.g) {
            Tb(a);
            const c = a.g;
            a.g = null;
            b || nb(a, "ready");
            try {
                c.onreadystatechange = null
            } catch (d) {}
        }
    }

    function Tb(a) {
        a.ya && (clearTimeout(a.ya), a.ya = null)
    }
    h.isActive = function() {
        return !!this.g
    };

    function Xb(a) {
        if (a.g && a.g.state == "running" && !a.T) {
            a.T = !0;
            for (let b = 0; b < a.U.length; b++) a.U[b]()
        }
    }

    function Yb(a) {
        a.g && (a.i == null ? Zb(a) : a.i.playbackState === void 0 ? Zb(a) : a.i.playbackState !== a.i.PLAYING_STATE && a.i.playbackState !== a.i.FINISHED_STATE && Zb(a))
    }

    function $b(a) {
        var b = ac;
        if (bc && !b.g) {
            b.g = new(window.AudioContext || window.webkitAudioContext);
            b.j = b.g.createGain();
            b.j.connect(b.g.destination);
            for (let c in b.v) b.v[c].g = b.g;
            for (let c in b.u) cc(b.u[c], b.g, b.j);
            b.g.onstatechange = () => {
                Xb(b)
            };
            Xb(b);
            Yb(b);
            ab(a, "click pointerup mousedown mouseup touchstart touchend".split(" "), () => {
                b.g && (b.g.resume(), Yb(b))
            }, !0)
        }
    }

    function Zb(a) {
        if (a.g) {
            a.i = a.g.createBufferSource();
            var b = a.g.createBuffer(1, 1, 22050);
            a.i.buffer = b;
            a.i.connect(a.g.destination);
            a.i.start(0);
            for (const c of a.W) c()
        }
    }

    function dc(a) {
        for (let b in a.u) a.u[b].stop()
    }

    function ec(a) {
        !a.o && a.g && a.g.suspend();
        a.o = !0
    }

    function fc(a) {
        Promise.resolve();
        a.o && a.g && a.g.resume();
        a.o = !1
    }
    class gc {
        constructor() {
            var a = n;
            this.v = hc;
            this.u = a;
            this.g = null;
            this.W = [];
            this.j = null;
            this.T = this.o = this.N = !1;
            this.U = [];
            this.i = null
        }
        destroy() {
            this.g && (this.g.close(), this.g = null)
        }
        reset() {
            for (let a in this.v) this.v[a].u = [];
            dc(this)
        }
        isMuted() {
            return this.N && !!this.j && this.j.gain.value == 0
        }
        mb() {
            return this.o
        }
    }
    var bc = !(!window.AudioContext && !window.webkitAudioContext) && !!window.GainNode;

    function cc(a, b, c) {
        a.g = b;
        a.N = c
    }

    function ic(a) {
        if (a.g)
            for (const d in a.i) {
                var b = a,
                    c = a.i[d];
                !c.Be && b.g !== null && b.g.currentTime * 1E3 > c.Lc + b.v && delete a.i[d]
            }
    }

    function jc(a) {
        !a.j && a.g && a.g.createGain && (a.j = a.g.createGain())
    }

    function kc(a, b) {
        if (!b) {
            jc(a);
            if (!a.j) return;
            b = a.j
        }
        a = [b].concat(a.u, a.N);
        for (b = 0; b < a.length - 1; b++) a[b].connect(a[b + 1])
    }

    function lc(a, b) {
        jc(a);
        a.j && a.g && a.j.gain.setValueAtTime(b, a.g.currentTime)
    }
    var q = class {
        constructor(a, b) {
            this.W = hc.mc;
            this.T = a;
            this.v = b;
            this.i = {};
            this.o = this.N = this.g = this.j = null;
            this.u = [];
            this.U = 0
        }
        play(a = 0, b = !1, c = 0, d, e = 0, f) {
            if (!this.g || !this.N) return -1;
            ic(this);
            f = f === void 0 ? this.g.currentTime + a / 1E3 : f;
            d || (d = this.g.createBufferSource(), d.playbackRate.setValueAtTime(1, this.g.currentTime));
            jc(this);
            this.o && d.connect(this.o);
            this.j ? (this.o ? this.o.connect(this.j) : d.connect(this.j), kc(this)) : this.o ? kc(this, this.o) : kc(this, d);
            this.o = null;
            d.loop = b;
            try {
                d.buffer = this.W.N
            } catch (k) {
                return -1
            }
            a =
                this.T / 1E3;
            const g = this.v / 1E3 / d.playbackRate.value;
            b ? (d.loopStart = a + (e ? e / 1E3 : c / 1E3), d.loopEnd = a + g, d.start(f, a + c / 1E3)) : d.start(f, a + c / 1E3, g);
            e = this.U++;
            this.i[e] = {
                node: d,
                Lc: f * 1E3 - c,
                Be: b
            };
            return e
        }
        setPlaybackRate(a, b) {
            ic(this);
            if (b !== void 0) {
                if (this.i[b]) try {
                    this.i[b].node.playbackRate.value = a
                } catch (c) {}
            } else
                for (let c in this.i) this.setPlaybackRate(a, c)
        }
        stop(a) {
            ic(this);
            if (a !== void 0 && this.g) {
                if (this.i[a]) {
                    try {
                        this.i[a].node.stop(0)
                    } catch (c) {}
                    var b = (this.g.currentTime * 1E3 - this.i[a].Lc) % this.v;
                    delete this.i[a];
                    return [b]
                }
                return []
            }
            a = [];
            for (b in this.i) a = a.concat(this.stop(b));
            return a
        }
    };
    const mc = document.createElement("audio");
    var nc = typeof mc.canPlayType === "function" && mc.canPlayType("audio/ogg") != "" ? ".ogg" : ".mp3";
    class oc extends gc {}
    var hc = {};
    hc.mc = new class extends ra {
        constructor(a, b, c = nc) {
            super(a + b + c);
            this.g = this.N = null;
            this.v = 0
        }
        o() {
            const a = new Promise(c => {
                this.j ? c() : this.u.push(c)
            });
            if (this.v != 0) return Promise.resolve();
            if (!this.g) return Promise.reject(Error("g"));
            const b = new XMLHttpRequest;
            b.open("GET", this.i, !0);
            b.responseType = "arraybuffer";
            b.onload = () => {
                const c = d => {
                    d && (this.N = d, this.v = 3, qa(this))
                };
                this.g && this.g.decodeAudioData(b.response, c);
                this.v = 2
            };
            b.send();
            this.v = 1;
            return a
        }
    }("/logos/2024/halloween24/rc3/", "audio");
    var n = {};
    n.Uc = new q(80227.9140625, 1520);
    n.Vc = new q(82747.9140625, 491.63299560546875);
    n.Wc = new q(84239.546875, 1270);
    n.Xc = new q(86509.546875, 3991.655029296875);
    n.Yc = new q(114378.3203125, 4683.3330078125);
    n.Zc = new q(120061.65625, 4423.3330078125);
    n.hd = new q(125484.9921875, 1162.4940185546875);
    n.jd = new q(0, 1291.677978515625);
    n.kd = new q(2291.677978515625, 2370);
    n.tc = new q(5661.67822265625, 2966.6669921875);
    n.ld = new q(9628.3447265625, 1741.4969482421875);
    n.nd = new q(12369.8408203125, 1335.14697265625);
    n.xc = new q(165924.71875, 62608.34375);
    n.od = new q(229533.0625, 58378.34375);
    n.qd = new q(288911.40625, 59258.34375);
    n.rd = new q(349169.75, 55383.33203125);
    n.ud = new q(405553.09375, 60540);
    n.vd = new q(14704.9892578125, 1573.1519775390625);
    n.wd = new q(103469.2265625, 1473.3330078125);
    n.xd = new q(105942.5625, 2605.010986328125);
    n.yd = new q(109547.5703125, 3830.748046875);
    n.yf = new q(17278.140625, 10384.6025390625);
    n.zd = new q(138727, 685.010986328125);
    n.Ad = new q(28662.744140625, 1567.3470458984375);
    n.Bd = new q(31230.091796875, 1271.29296875);
    n.Dd = new q(127647.484375, 2071.337890625);
    n.Df = new q(33501.3828125, 4560);
    n.Ed = new q(39061.3828125, 983.5599975585938);
    n.Fd = new q(41044.94140625, 1160);
    n.Gd = new q(43204.94140625, 1248.0050048828125);
    n.Hd = new q(45452.94921875, 1386.6669921875);
    n.Id = new q(47839.61328125, 1482.676025390625);
    n.Ef = new q(50322.2890625, 1271.29296875);
    n.Ff = new q(52593.58203125, 1567.3470458984375);
    n.Jd = new q(55160.9296875, 1625.39697265625);
    n.Ac = new q(57786.328125, 2066.575927734375);
    n.Bc = new q(60852.90234375, 1783.3330078125);
    n.Kd = new q(91501.203125, 2745.010986328125);
    n.Ld = new q(95246.2109375, 3443.3330078125);
    n.Md = new q(99689.546875, 2779.68310546875);
    n.Nd = new q(132583.671875, 1200);
    n.Od = new q(130718.8203125, 864.85302734375);
    n.Cc = new q(140412.015625, 2873.3330078125);
    n.Dc = new q(144285.34375, 1780);
    n.Pd = new q(147065.34375, 2913.3330078125);
    n.Ec = new q(150978.6875, 1151.677978515625);
    n.Qd = new q(153130.359375, 2309.342041015625);
    n.Rd = new q(156439.703125, 1976.6669921875);
    n.Fc = new q(159416.375, 5508.34521484375);
    n.Sd = new q(74636.234375, 4591.67822265625);
    n.If = new q(63636.234375, 1E4);
    n.Td = new q(134783.671875, 2943.3330078125);
    (function() {
        var a = oc;
        a.Wa = void 0;
        a.Rb = function() {
            return a.Wa ? a.Wa : a.Wa = new a
        }
    })();
    var pc = "en af sq am ar hy az eu be bn bs bg my ca zh-HK zh-CN zh-TW hr cs da nl en-GB et fa fil fi fr fr-CA gl ka de el gu iw hi hu is id it ja kn kk km ko ky lo lv lt mk ms ml mr mn ne no pl pt-BR pt-PT pa ro ru sr si sk sl es-419 es sw sv ta te th tr uk ur uz vi zu ".split(" ");
    class qc extends ra {
        constructor(a) {
            super(a);
            this.g = new Image
        }
        o() {
            if (this.g.src) return Promise.resolve(this.g);
            let a;
            const b = new Promise(d => a = d),
                c = () => {
                    qa(this);
                    a(this.g)
                };
            this.g.crossOrigin = "Anonymous";
            this.g.decode ? (this.g.src = this.i, this.g.decode().then(c, () => {
                this.g.removeAttribute("crossOrigin");
                this.g.src = this.i;
                this.g.decode().then(c, () => {
                    c()
                })
            })) : (this.g.onload = c, this.g.onerror = () => {
                this.g.removeAttribute("crossOrigin");
                this.g.removeAttribute("onerror");
                this.g.src = this.g.src
            }, this.g.src = this.i);
            (this.g.complete || this.g.readyState == "complete") && c();
            return b
        }
    };

    function rc(a) {
        return typeof a === "number" ? a : a[0]
    }

    function sc(a, b) {
        const c = a.g[rc(b)];
        return (new Promise(d => {
            c.j ? d() : c.u.push(d);
            c.o()
        })).then(() => {})
    }

    function tc() {
        var a = uc(),
            b = Object.values(vc);
        return Promise.all(b.map(c => sc(a, c))).then(() => {})
    }

    function wc(a, b, c, d, e, f = 1, g = !1) {
        var k = b[3],
            l = b[4];
        c.save();
        c.translate(d, e);
        c.scale(f, f);
        var p = -k * (g ? .5 : 0),
            z = b[1],
            E = b[2];
        const G = b[3],
            X = b[4];
        let V;
        k === void 0 ? (d = z, e = E, f = G, V = X, g = p = 0, k = G, l = X) : p === void 0 ? (d = z, e = E, f = G, V = X, g = p = 0) : (d = z, e = E, f = k, V = l, g = -l * (g ? .5 : 0));
        if (d < z) {
            var za = z - d;
            d = z;
            f -= za;
            p += za;
            k -= za
        }
        e < E && (za = E - e, e = E, V -= za, g += za, l -= za);
        d + f > z + G && (z = d + f - (z + G), f -= z, k -= z);
        e + V > E + X && (E = e + V - (E + X), V -= E, l -= E);
        a = a.g[rc(b)];
        if (!a.j) throw Error("h");
        f > 0 && V > 0 && c.drawImage(a.g, d, e, f, V, p, g, k, l);
        c.restore()
    }

    function xc(a) {
        var b = yc;
        const c = a[5] || 1,
            d = a[5] || 1,
            e = b.i[rc(a)];
        return `url(${b.g[rc(a)].i}) ${`${-(1 * a[1] / c)}px ${-(1 * a[2] / c)}px`}/${`${e[0] / d}px ${e[1] / d}px`} no-repeat`
    }
    var Ac = class {
        constructor() {
            var a = zc;
            this.g = [];
            this.i = [];
            for (const c of a) {
                a = new qc("/logos/2024/halloween24/rc3/" + c.filename);
                var b = c.size;
                this.g.push(a);
                this.i.push(b)
            }
        }
        getSize(a) {
            return {
                width: a[3],
                height: a[4]
            }
        }
    };
    var uc = () => {
        var a = Bc,
            b = "Wa";
        if (a.Wa && a.hasOwnProperty(b)) return a.Wa;
        b = new a;
        return a.Wa = b
    };
    var Bc = class extends Ac {},
        vc = {
            Cd: 0,
            zf: 1,
            Af: 2,
            Bf: 3,
            Gf: 4,
            Ue: 5,
            Ve: 6,
            We: 7,
            Xe: 8,
            Ye: 9,
            Ze: 10,
            df: 11,
            ef: 12,
            ff: 13,
            hf: 14,
            jf: 15,
            kf: 16,
            lf: 17,
            mf: 18,
            nf: 19,
            qf: 20,
            rf: 21,
            tf: 22,
            uf: 23,
            vf: 24,
            wf: 25,
            xf: 26,
            Se: 27
        },
        zc = [{
                filename: "play-sprite.png",
                size: [2445, 200]
            }, {
                filename: "momo-sprite.png",
                size: [2046, 1955]
            }, {
                filename: "momo-sprite-0.png",
                size: [2040, 2036]
            }, {
                filename: "momo-sprite-1.png",
                size: [1983, 403]
            }, {
                filename: "ui-sprite.png",
                size: [2047, 1014]
            }, {
                filename: "level1-sprite.png",
                size: [2021, 1916]
            }, {
                filename: "level1-sprite-0.png",
                size: [2021, 1928]
            }, {
                filename: "level1-sprite-1.png",
                size: [1503, 1729]
            }, {
                filename: "level1-sprite-2.png",
                size: [1393, 430]
            }, {
                filename: "level2-sprite.png",
                size: [2037, 2037]
            }, {
                filename: "level2-sprite-0.png",
                size: [2037, 2037]
            }, {
                filename: "level2-sprite-1.png",
                size: [2037, 2037]
            }, {
                filename: "level2-sprite-2.png",
                size: [1926, 613]
            }, {
                filename: "level3-sprite.png",
                size: [1926, 1946]
            }, {
                filename: "level3-sprite-0.png",
                size: [1926, 1795]
            }, {
                filename: "level3-sprite-1.png",
                size: [1821, 1923]
            }, {
                filename: "level3-sprite-2.png",
                size: [1821,
                    1602
                ]
            }, {
                filename: "level4-sprite.png",
                size: [2040, 1922]
            }, {
                filename: "level4-sprite-0.png",
                size: [1926, 2039]
            }, {
                filename: "level4-sprite-1.png",
                size: [1933, 1947]
            }, {
                filename: "level4-sprite-2.png",
                size: [1933, 1602]
            }, {
                filename: "level5-sprite.png",
                size: [2045, 1989]
            }, {
                filename: "level5-sprite-0.png",
                size: [2029, 1812]
            }, {
                filename: "level5-sprite-1.png",
                size: [1926, 1812]
            }, {
                filename: "level5-sprite-2.png",
                size: [1926, 1812]
            }, {
                filename: "level5-sprite-3.png",
                size: [1926, 1812]
            }, {
                filename: "level5-sprite-4.png",
                size: [1761, 360]
            },
            {
                filename: "ghosts-sprite.png",
                size: [2042, 1676]
            }
        ],
        Cc = [4, 1380, 727, 189, 124],
        Dc = [8, 753, 0, 640, 360],
        Ec = [1, 0, 1929, 123, 26],
        Fc = [21, 1603, 726, 234, 59],
        Gc = [6, 1765, 1683, 224, 245],
        Hc = [4, 1286, 678, 320, 46],
        Ic = [4, 1609, 678, 320, 46],
        Jc = [1, 1982, 520, 50, 50],
        Kc = [4, 2006, 83, 41, 38],
        Lc = [4, 1617, 727, 41, 38],
        Mc = [4, 0, 363, 640, 360],
        Nc = [4, 0, 0, 640, 360],
        Oc = [1, 1954, 661, 20, 40],
        Pc = [4, 1929, 0, 80, 80],
        Qc = [4, 643, 363, 640, 360],
        Rc = [1, 1982, 573, 50, 50],
        Sc = [17, 1929, 660, 111, 107],
        Tc = [1, 1929, 520, 50, 67],
        Uc = [25, 1286, 0, 640, 360],
        Vc = [
            [5, 0, 0, 750, 430],
            [5, 0, 0, 750,
                430
            ],
            [5, 0, 0, 750, 430],
            [5, 0, 0, 750, 430],
            [5, 0, 0, 750, 430],
            [5, 753, 0, 750, 430],
            [5, 0, 433, 750, 430],
            [5, 753, 433, 750, 430],
            [5, 753, 433, 750, 430],
            [5, 0, 866, 750, 430],
            [5, 753, 866, 750, 430],
            [5, 0, 1299, 750, 430],
            [5, 0, 1299, 750, 430],
            [5, 0, 1299, 750, 430],
            [5, 0, 1299, 750, 430],
            [5, 0, 1299, 750, 430],
            [5, 753, 1299, 750, 430],
            [6, 0, 0, 750, 430],
            [6, 753, 0, 750, 430],
            [6, 0, 433, 750, 430],
            [6, 753, 433, 750, 430],
            [6, 753, 433, 750, 430],
            [6, 0, 866, 750, 430],
            [6, 753, 866, 750, 430],
            [6, 0, 1299, 750, 430],
            [6, 753, 1299, 750, 430],
            [7, 0, 0, 750, 430],
            [7, 753, 0, 750, 430],
            [7, 0, 433, 750, 430],
            [7, 753, 433, 750, 430],
            [7, 0, 866, 750, 430],
            [7, 753, 866, 750, 430],
            [7, 0, 1299, 750, 430],
            [7, 753, 1299, 750, 430],
            [8, 0, 0, 750, 430]
        ],
        Wc = [
            [6, 1506, 561, 256, 184],
            [6, 1765, 561, 256, 184],
            [6, 1506, 748, 256, 184],
            [6, 1765, 748, 256, 184],
            [6, 1506, 935, 256, 184],
            [6, 1765, 935, 256, 184],
            [6, 1506, 1122, 256, 184],
            [6, 1765, 1122, 256, 184]
        ],
        Xc = [
            [2, 756, 844, 186, 165],
            [2, 756, 844, 186, 165],
            [2, 756, 844, 186, 165],
            [2, 945, 844, 186, 165],
            [2, 1134, 844, 186, 165],
            [2, 1323, 844, 186, 165],
            [2, 1512, 844, 186, 165],
            [2, 1701, 844, 186, 165],
            [2, 1701, 844, 186, 165],
            [2, 1701, 844, 186, 165],
            [2,
                0, 848, 186, 165
            ],
            [2, 189, 1012, 186, 165],
            [2, 378, 1012, 186, 165],
            [2, 567, 1012, 186, 165],
            [2, 756, 1012, 186, 165],
            [2, 756, 1012, 186, 165],
            [2, 945, 1012, 186, 165],
            [2, 1134, 1012, 186, 165],
            [2, 1323, 1012, 186, 165],
            [2, 1512, 1012, 186, 165],
            [2, 1701, 1012, 186, 165],
            [2, 1701, 1012, 186, 165],
            [2, 1701, 1012, 186, 165],
            [2, 0, 1016, 186, 165],
            [2, 189, 1180, 186, 165],
            [2, 378, 1180, 186, 165],
            [2, 567, 1180, 186, 165],
            [2, 756, 1180, 186, 165],
            [2, 756, 1180, 186, 165]
        ],
        Yc = [
            [18, 1286, 692, 583, 326],
            [18, 0, 726, 583, 326],
            [18, 586, 726, 583, 326],
            [18, 1172, 1021, 583, 326],
            [18, 0, 1055, 583,
                326
            ],
            [18, 0, 1055, 583, 326],
            [18, 0, 1055, 583, 326],
            [18, 586, 1055, 583, 326],
            [18, 1172, 1350, 583, 326],
            [18, 1172, 1350, 583, 326],
            [18, 0, 1384, 583, 326],
            [18, 586, 1384, 583, 326],
            [18, 1172, 1679, 583, 326],
            [18, 0, 1713, 583, 326],
            [18, 586, 1713, 583, 326],
            [19, 0, 0, 583, 326],
            [19, 586, 0, 583, 326]
        ],
        Zc = [
            [27, 346, 1505, 83, 105],
            [27, 432, 1505, 83, 105],
            [27, 518, 1514, 83, 105],
            [27, 604, 1514, 83, 105],
            [27, 690, 1514, 83, 105],
            [27, 776, 1514, 83, 105],
            [27, 1520, 1467, 83, 105],
            [27, 1606, 1521, 83, 105],
            [27, 1606, 1521, 83, 105]
        ],
        $c = [
            [27, 1024, 1582, 78, 63],
            [27, 1105, 1582, 78, 63],
            [27,
                1186, 1582, 78, 63
            ],
            [27, 1267, 1582, 78, 63],
            [27, 1348, 1582, 78, 63],
            [27, 1429, 1582, 78, 63],
            [27, 1692, 1587, 78, 63],
            [27, 1773, 1587, 78, 63],
            [27, 1348, 1582, 78, 63],
            [27, 1854, 1587, 78, 63],
            [27, 1186, 1582, 78, 63],
            [27, 1935, 1587, 78, 63],
            [27, 1024, 1582, 78, 63],
            [27, 0, 1600, 78, 63],
            [27, 862, 1601, 78, 63],
            [27, 346, 1613, 78, 63]
        ],
        ad = [Kc, [4, 2006, 124, 41, 38],
            [4, 2006, 165, 41, 38],
            [4, 2006, 206, 41, 38],
            [4, 2006, 247, 41, 38],
            [4, 2003, 288, 41, 38],
            [4, 2006, 629, 41, 38],
            [4, 2006, 670, 41, 38],
            [4, 2006, 711, 41, 38], Lc
        ],
        bd = [
            [27, 1322, 1056, 143, 134],
            [27, 1468, 1056, 143, 134],
            [27,
                1614, 1110, 143, 134
            ],
            [27, 1760, 1110, 143, 134],
            [27, 0, 1123, 143, 134],
            [27, 0, 1123, 143, 134],
            [27, 0, 1123, 143, 134],
            [27, 592, 1146, 143, 134],
            [27, 1468, 1056, 143, 134],
            [27, 738, 1146, 143, 134],
            [27, 884, 1146, 143, 134],
            [27, 884, 1146, 143, 134],
            [27, 884, 1146, 143, 134],
            [27, 738, 1146, 143, 134],
            [27, 1468, 1056, 143, 134],
            [27, 1030, 1193, 143, 134],
            [27, 1176, 1193, 143, 134],
            [27, 1322, 1193, 143, 134],
            [27, 1322, 1193, 143, 134],
            [27, 1322, 1193, 143, 134],
            [27, 1322, 1193, 143, 134],
            [27, 1176, 1193, 143, 134],
            [27, 1468, 1193, 143, 134],
            [27, 146, 1231, 143, 134],
            [27, 292, 1231, 143,
                134
            ],
            [27, 438, 1231, 143, 134],
            [27, 1614, 1247, 143, 134],
            [27, 1614, 1247, 143, 134],
            [27, 1614, 1247, 143, 134]
        ],
        cd = [
            [21, 1840, 726, 100, 99],
            [21, 1943, 726, 100, 99],
            [21, 1929, 828, 100, 99],
            [21, 1929, 930, 100, 99],
            [21, 1929, 1032, 100, 99],
            [21, 1929, 1134, 100, 99],
            [21, 1929, 1236, 100, 99]
        ],
        dd = [
            [22, 1929, 0, 100, 99],
            [22, 1929, 102, 100, 99],
            [22, 1929, 204, 100, 99],
            [22, 1929, 306, 100, 99],
            [22, 1929, 408, 100, 99],
            [22, 1929, 510, 100, 99],
            [22, 1929, 612, 100, 99]
        ],
        ed = [
            [0, 0, 0, 150, 200],
            [0, 153, 0, 150, 200],
            [0, 306, 0, 150, 200],
            [0, 459, 0, 150, 200],
            [0, 612, 0, 150, 200],
            [0, 765,
                0, 150, 200
            ],
            [0, 918, 0, 150, 200],
            [0, 1071, 0, 150, 200],
            [0, 1224, 0, 150, 200],
            [0, 1377, 0, 150, 200],
            [0, 1530, 0, 150, 200],
            [0, 1683, 0, 150, 200],
            [0, 1836, 0, 150, 200],
            [0, 1989, 0, 150, 200],
            [0, 2142, 0, 150, 200],
            [0, 2295, 0, 150, 200]
        ],
        fd = [
            [17, 1286, 0, 640, 360],
            [17, 0, 363, 640, 360],
            [17, 643, 363, 640, 360],
            [17, 1286, 363, 640, 360],
            [17, 0, 726, 640, 360],
            [17, 643, 726, 640, 360],
            [17, 643, 726, 640, 360],
            [17, 1286, 726, 640, 360],
            [17, 0, 1089, 640, 360],
            [17, 643, 1089, 640, 360],
            [17, 1286, 1089, 640, 360],
            [17, 0, 1452, 640, 360],
            [17, 1286, 0, 640, 360]
        ],
        gd = [
            [10, 1862, 1246, 175, 175],
            [10, 1506, 1424, 175, 175],
            [10, 1684, 1424, 175, 175],
            [10, 1862, 1424, 175, 175],
            [11, 1506, 0, 175, 175],
            [11, 1684, 0, 175, 175],
            [11, 1862, 0, 175, 175],
            [11, 1506, 178, 175, 175]
        ],
        hd = [
            [9, 0, 0, 750, 430],
            [9, 0, 0, 750, 430],
            [9, 0, 0, 750, 430],
            [9, 753, 0, 750, 430],
            [9, 0, 433, 750, 430],
            [9, 753, 433, 750, 430],
            [9, 0, 866, 750, 430],
            [9, 753, 866, 750, 430],
            [9, 0, 1299, 750, 430],
            [9, 753, 1299, 750, 430],
            [10, 0, 0, 750, 430],
            [10, 0, 0, 750, 430],
            [10, 0, 0, 750, 430],
            [10, 753, 0, 750, 430],
            [10, 0, 433, 750, 430],
            [10, 753, 433, 750, 430],
            [10, 0, 866, 750, 430],
            [10, 0, 866, 750, 430],
            [10, 753, 866, 750,
                430
            ],
            [10, 0, 1299, 750, 430],
            [10, 753, 1299, 750, 430],
            [10, 753, 1299, 750, 430],
            [10, 753, 1299, 750, 430],
            [10, 753, 1299, 750, 430],
            [11, 0, 0, 750, 430],
            [11, 753, 0, 750, 430],
            [11, 0, 433, 750, 430],
            [11, 753, 433, 750, 430],
            [11, 0, 866, 750, 430],
            [11, 753, 866, 750, 430],
            [11, 0, 1299, 750, 430],
            [11, 753, 1299, 750, 430]
        ],
        id = [
            [25, 1335, 363, 438, 360],
            [25, 1335, 363, 438, 360],
            [25, 0, 726, 438, 360],
            [25, 0, 726, 438, 360],
            [25, 441, 726, 438, 360],
            [25, 441, 726, 438, 360]
        ],
        jd = [
            [21, 0, 1629, 640, 360],
            [21, 643, 1629, 640, 360],
            [21, 1286, 1629, 640, 360],
            [22, 0, 0, 640, 360],
            [22, 643, 0, 640,
                360
            ],
            [22, 1286, 0, 640, 360],
            [22, 0, 363, 640, 360],
            [22, 643, 363, 640, 360]
        ],
        kd = [
            [22, 1286, 363, 640, 360],
            [22, 0, 726, 640, 360],
            [22, 643, 726, 640, 360],
            [22, 1286, 726, 640, 360],
            [22, 0, 1089, 640, 360],
            [22, 643, 1089, 640, 360],
            [22, 1286, 1089, 640, 360],
            [22, 0, 1452, 640, 360],
            [22, 643, 1452, 640, 360]
        ],
        ld = [
            [23, 643, 1452, 640, 360],
            [23, 643, 1452, 640, 360],
            [23, 1286, 1452, 640, 360],
            [23, 1286, 1452, 640, 360],
            [24, 0, 0, 640, 360],
            [24, 0, 0, 640, 360]
        ],
        md = [
            [21, 1603, 0, 442, 360],
            [21, 1603, 363, 442, 360],
            [25, 0, 363, 442, 360],
            [25, 445, 363, 442, 360],
            [25, 890, 363, 442, 360]
        ],
        nd = [
            [15, 228, 321, 225, 318],
            [15, 456, 321, 225, 318],
            [15, 684, 321, 225, 318],
            [15, 912, 321, 225, 318],
            [15, 1140, 321, 225, 318],
            [15, 1368, 321, 225, 318],
            [15, 1596, 321, 225, 318],
            [15, 0, 642, 225, 318],
            [15, 228, 642, 225, 318],
            [15, 456, 642, 225, 318],
            [15, 684, 642, 225, 318],
            [15, 912, 642, 225, 318],
            [15, 1140, 642, 225, 318],
            [15, 1368, 642, 225, 318],
            [15, 1596, 642, 225, 318],
            [15, 0, 963, 225, 318],
            [15, 228, 963, 225, 318],
            [15, 456, 963, 225, 318],
            [15, 684, 963, 225, 318],
            [15, 912, 963, 225, 318],
            [15, 1140, 963, 225, 318],
            [15, 1368, 963, 225, 318],
            [15, 1596, 963, 225, 318],
            [15, 0, 1284, 225,
                318
            ]
        ],
        od = [
            [15, 228, 1605, 225, 318],
            [15, 456, 1605, 225, 318],
            [15, 684, 1605, 225, 318],
            [15, 912, 1605, 225, 318],
            [15, 1140, 1605, 225, 318],
            [15, 1368, 1605, 225, 318],
            [15, 1596, 1605, 225, 318],
            [16, 0, 0, 225, 318],
            [16, 228, 0, 225, 318],
            [16, 456, 0, 225, 318],
            [16, 684, 0, 225, 318],
            [16, 912, 0, 225, 318]
        ],
        pd = [
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 1286, 0, 640, 360],
            [13, 1286, 0, 640, 360],
            [13, 1286, 0, 640, 360],
            [13, 0, 363, 640, 360],
            [13, 643, 363, 640, 360],
            [13, 1286, 363, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 0, 726, 640, 360],
            [13, 0, 726, 640, 360],
            [13, 643, 726, 640, 360],
            [13, 1286, 726, 640, 360],
            [13, 0, 1089, 640, 360],
            [13, 643, 1089, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 643, 0, 640, 360],
            [13, 1286, 1089, 640, 360],
            [13, 0, 1452, 640, 360],
            [13, 643, 1452, 640, 360],
            [13, 1286, 1452, 640, 360],
            [14, 0, 0, 640, 360],
            [14, 643, 0, 640, 360],
            [14, 1286, 0, 640, 360],
            [14, 1286, 0, 640, 360],
            [14, 0, 363, 640, 360],
            [14, 1286, 0, 640, 360],
            [14, 0, 363, 640, 360],
            [14, 1286, 0, 640, 360],
            [14, 643, 363, 640, 360],
            [14,
                0, 363, 640, 360
            ],
            [14, 0, 363, 640, 360],
            [14, 0, 363, 640, 360],
            [14, 1286, 363, 640, 360],
            [14, 0, 726, 640, 360],
            [14, 643, 726, 640, 360]
        ],
        qd = [
            [1, 0, 0, 640, 640],
            [1, 643, 0, 640, 640],
            [1, 1286, 0, 640, 640],
            [1, 0, 643, 640, 640],
            [1, 643, 643, 640, 640],
            [1, 1286, 643, 640, 640],
            [1, 0, 1286, 640, 640],
            [1, 643, 1286, 640, 640],
            [1, 1286, 1286, 640, 640]
        ],
        rd = [
            [19, 484, 987, 481, 318],
            [19, 968, 987, 481, 318],
            [19, 1452, 987, 481, 318],
            [19, 0, 1308, 481, 318],
            [19, 0, 1308, 481, 318],
            [19, 0, 1308, 481, 318],
            [19, 484, 1308, 481, 318],
            [19, 968, 1308, 481, 318],
            [19, 1452, 1308, 481, 318],
            [19, 1452, 1308,
                481, 318
            ],
            [19, 1452, 1308, 481, 318],
            [19, 0, 1629, 481, 318],
            [19, 484, 1629, 481, 318],
            [19, 968, 1629, 481, 318],
            [19, 1452, 1629, 481, 318],
            [20, 0, 0, 481, 318],
            [20, 484, 0, 481, 318],
            [20, 968, 0, 481, 318],
            [20, 968, 0, 481, 318],
            [20, 968, 0, 481, 318]
        ];
    var r = class {};

    function sd(a, b) {
        const c = b.constructor;
        a.i.set(c, b);
        a.g && a.g && a.g.i.add(c, a);
        return b
    }

    function t(a, b) {
        return a.i.get(b)
    }

    function td(a) {
        var b = ud;
        b = b instanceof r ? b.constructor : b;
        a.i.delete(b);
        if (a.g && a.g) {
            let c;
            (c = a.g.i.g.get(b)) == null || c.delete(a)
        }
    }
    var u = class {
        constructor(...a) {
            this.i = new Map;
            for (const b of a) sd(this, b)
        }
        get(a) {
            const b = this.i.get(a);
            if (b) return b;
            throw Error("i`" + a);
        }
    };
    const vd = new Set;
    var xd = class {
        constructor() {
            this.g = new Map
        }
        find(a) {
            return wd(a.map(b => this.g.get(b) || vd))
        }
        clear() {
            this.g.clear()
        }
        add(a, b) {
            let c = this.g.get(a);
            c || (c = new Set, this.g.set(a, c));
            c.add(b)
        }
    };

    function wd(a) {
        if (a.length === 0) return [];
        if (a.length === 1) return Array.from(a[0]);
        const b = [];
        for (const c of a[0]) {
            let d = !0;
            for (let e = 1; e < a.length; e++) a[e].has(c) || (d = !1);
            d && b.push(c)
        }
        return b
    };
    var ud = class extends r {
            constructor(a) {
                super();
                this.g = a
            }
        },
        yd = class extends r {
            constructor(a = []) {
                super();
                this.children = a
            }
        };

    function zd(a) {
        return (a = t(a, yd)) ? a.children : []
    };

    function Ad(a, ...b) {
        const c = [];
        for (const d of a.g)
            for (const e of b) d.constructor === e && c.push(d);
        return c
    }

    function v(a, b) {
        b.g = a;
        var c = a.i;
        for (const d of b.i.keys()) c.add(d, b);
        for (const d of zd(b)) v(a, d)
    }

    function w(a, b) {
        b.g = void 0;
        var c = a.i;
        for (const e of b.i.keys()) {
            let f = void 0;
            var d = b;
            (f = c.g.get(e)) == null || f.delete(d)
        }
        for (const e of zd(b)) w(a, e)
    }
    var Bd = class {
        constructor() {
            this.g = [];
            this.i = new xd
        }
        find(...a) {
            return this.i.find(a)
        }
        update(a) {
            for (const b of this.g) b.enabled && b.update(a)
        }
    };
    var Cd = class {
        constructor(a) {
            this.g = a;
            this.enabled = !0
        }
    };

    function x(a, b) {
        if (a.length !== 1) throw a = `Expected 1 but found ${a.length}.`, b = b ? `${b} (${a})` : a, Error(b);
        return a[0]
    };

    function Dd(a, ...b) {
        const c = [];
        Ed(a, d => {
            for (const e of b)
                if (!t(d, e)) return;
            c.push(d)
        });
        return c
    }

    function Ed(a, b) {
        const c = [a];
        for (; c.length > 0;) {
            a = c.pop();
            b(a);
            for (const d of zd(a)) c.push(d)
        }
    }

    function Fd(a, b) {
        const c = t(b, ud),
            d = b.g !== a.g;
        d && Gd(b);
        c && c.g !== a && Hd(b);
        c ? c.g = a : sd(b, new ud(a));
        (t(a, yd) || sd(a, new yd)).children.push(b);
        d && a.g && v(a.g, b)
    }

    function Hd(a) {
        var b = t(a, ud);
        b && (b = b.g.get(yd).children, b.splice(b.indexOf(a), 1))
    }

    function Gd(a) {
        let b;
        (b = a.g) == null || w(b, a);
        for (const c of zd(a)) Gd(c)
    };

    function Id(a, b) {
        a.x = b.x;
        a.y = b.y
    }

    function y(a, b) {
        a.x *= b;
        a.y *= b;
        return a
    }
    var A = class {
            constructor(a = 0, b = 0) {
                this.x = a;
                this.y = b
            }
            set(a, b) {
                this.x = a;
                this.y = b;
                return this
            }
            add(a) {
                this.x += a.x;
                this.y += a.y;
                return this
            }
            sub(a) {
                this.x -= a.x;
                this.y -= a.y;
                return this
            }
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }
            transform(a) {
                const b = a.b * this.x + a.d * this.y + a.f;
                this.x = a.a * this.x + a.c * this.y + a.e;
                this.y = b;
                return this
            }
            H() {
                return new A(this.x, this.y)
            }
        },
        Jd = class {
            constructor() {
                this.a = 1;
                this.c = this.b = 0;
                this.d = 1;
                this.f = this.e = 0
            }
            identity() {
                this.a = 1;
                this.c = this.b = 0;
                this.d = 1;
                this.f = this.e = 0;
                return this
            }
            set(a,
                b, c, d, e, f) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.e = e;
                this.f = f;
                return this
            }
            H() {
                return (new Jd).set(this.a, this.b, this.c, this.d, this.e, this.f)
            }
        };

    function Kd(a, b = new Jd) {
        const c = a.scale,
            d = a.position,
            e = Math.sin(a.rotation);
        a = Math.cos(a.rotation);
        return b.set(c.x * a, c.x * e, -c.y * e, c.y * a, d.x, d.y)
    }
    var B = class extends r {
        constructor(a = new A, b = 0, c = new A(1, 1)) {
            super();
            this.position = a;
            this.rotation = b;
            this.scale = c
        }
    };

    function Ld(a, b = new Jd) {
        var c = a;
        for (Kd(a.get(B), b);;) {
            c = t(c, ud);
            if (!c) break;
            c = c.g;
            var d = t(c, B);
            if (!d) break;
            a = b;
            d = Kd(d, Md);
            const e = d.b * a.a + d.d * a.b,
                f = d.a * a.c + d.c * a.d,
                g = d.b * a.c + d.d * a.d,
                k = d.a * a.e + d.c * a.f + d.e,
                l = d.b * a.e + d.d * a.f + d.f;
            a.a = d.a * a.a + d.c * a.b;
            a.b = e;
            a.c = f;
            a.d = g;
            a.e = k;
            a.f = l
        }
        return b
    }
    const Md = new Jd;
    var Nd = class extends r {},
        C = class extends r {
            constructor(a, b = 0, c = 0, d = new A(0, 0), e) {
                super();
                this.Da = a;
                this.Mb = b;
                this.g = c;
                this.offset = d;
                this.alpha = 1;
                this.i = e !== void 0 ? e : Od++
            }
        },
        Od = 0;

    function D(a, b) {
        return new Pd(a.g[rc(b)].g, new A(b[1], b[2]), new A(b[3], b[4]))
    }
    var Pd = class {
            constructor(a, b, c) {
                this.j = a;
                this.i = b;
                this.g = c
            }
        },
        Qd = class {
            constructor(a) {
                this.g = a
            }
        };

    function Rd(a, b, c = !0, d = 12) {
        var e = Sd;
        const f = [];
        for (const g of b) f.push(new Td(D(a, g)));
        a = new e(f, c);
        a.j = d;
        return a
    }

    function Ud() {
        var a = uc();
        const b = Rd(a, ed, !0, 12);
        a = new C(D(a, ed[0]));
        return {
            animation: b,
            Xd: a
        }
    }
    var Sd = class extends r {
            constructor(a, b = !0) {
                super();
                this.i = a;
                this.index = this.g = 0;
                this.loop = !0;
                this.offset = new A(0, 0);
                this.j = 12;
                this.V = null;
                this.loop = b
            }
            reset() {
                this.g = this.index = 0
            }
        },
        Td = class {
            constructor(a) {
                this.Da = a
            }
        };

    function Vd(a) {
        a.sort((b, c) => {
            b = b.get(C);
            c = c.get(C);
            return b.Mb - c.Mb || b.g - c.g || b.i - c.i
        })
    }

    function Wd(a, b = new Jd) {
        a = x(a.g.find(Nd), "Can't find camera");
        const c = a.get(B);
        c.position.x = -c.position.x;
        c.position.y = -c.position.y;
        c.rotation = -c.rotation;
        Ld(a, b);
        c.position.x = -c.position.x;
        c.position.y = -c.position.y;
        c.rotation = -c.rotation
    }
    var Xd = class extends Cd {
            constructor(a, b) {
                super(a);
                this.i = b;
                this.j = new Jd;
                this.o = new Jd
            }
            update() {
                const a = this.i;
                a.save();
                a.clearRect(0, 0, a.canvas.width, a.canvas.height);
                Wd(this, this.j);
                var b = this.g.find(C);
                Vd(b);
                for (const d of b)
                    if (b = d.get(C), b.alpha !== 0) {
                        this.i.globalAlpha = b.alpha;
                        var c = this.j;
                        this.i.setTransform(c.a, c.b, c.c, c.d, c.e, c.f);
                        c = Ld(d, this.o);
                        this.i.transform(c.a, c.b, c.c, c.d, c.e, c.f);
                        this.i.translate(b.offset.x, b.offset.y);
                        c = this.i;
                        b.Da instanceof Pd ? (b = b.Da, this.i.drawImage(b.j, b.i.x, b.i.y,
                            b.g.x, b.g.y, 0, 0, b.g.x, b.g.y)) : b.Da instanceof Qd && b.Da.g(c)
                    } a.restore()
            }
        },
        Yd = class extends Cd {
            update(a) {
                for (const b of this.g.find(Sd)) {
                    const c = b.get(Sd),
                        d = c.j === 0 ? Infinity : 1E3 / c.j;
                    let e = c.i[c.index];
                    for (c.g += a; c.g >= d;) c.index++, c.index >= c.i.length && (c.index = c.loop ? 0 : c.i.length - 1, c.V && c.V()), c.g -= d, e = c.i[c.index];
                    b.get(C).Da = e.Da;
                    b.get(C).offset = c.offset
                }
            }
        };

    function Zd(a) {
        if (a.Ta && typeof a.Ta == "function") return a.Ta();
        if (typeof Map !== "undefined" && a instanceof Map || typeof Set !== "undefined" && a instanceof Set) return Array.from(a.values());
        if (typeof a === "string") return a.split("");
        if (ja(a)) {
            var b = [],
                c = a.length;
            for (var d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a) b[c++] = a[d];
        return b
    }

    function $d(a) {
        if (a.Sb && typeof a.Sb == "function") return a.Sb();
        if (!a.Ta || typeof a.Ta != "function") {
            if (typeof Map !== "undefined" && a instanceof Map) return Array.from(a.keys());
            if (!(typeof Set !== "undefined" && a instanceof Set)) {
                if (ja(a) || typeof a === "string") {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++) b.push(c);
                    return b
                }
                b = [];
                c = 0;
                for (const d in a) b[c++] = d;
                return b
            }
        }
    }

    function ae(a, b, c) {
        if (a.forEach && typeof a.forEach == "function") a.forEach(b, c);
        else if (ja(a) || typeof a === "string") Array.prototype.forEach.call(a, b, c);
        else {
            const d = $d(a),
                e = Zd(a),
                f = e.length;
            for (let g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
        }
    };

    function be(a) {
        this.j = this.N = this.o = "";
        this.T = null;
        this.v = this.i = "";
        this.u = !1;
        let b;
        a instanceof be ? (this.u = a.u, ce(this, a.o), this.N = a.N, this.j = a.j, de(this, a.T), this.i = a.i, ee(this, fe(a.g)), this.v = a.v) : a && (b = String(a).match(Mb)) ? (this.u = !1, ce(this, b[1] || "", !0), this.N = ge(b[2] || ""), this.j = ge(b[3] || "", !0), de(this, b[4]), this.i = ge(b[5] || "", !0), ee(this, b[6] || "", !0), this.v = ge(b[7] || "")) : (this.u = !1, this.g = new he(null, this.u))
    }
    be.prototype.toString = function() {
        const a = [];
        var b = this.o;
        b && a.push(ie(b, je, !0), ":");
        var c = this.j;
        if (c || b == "file") a.push("//"), (b = this.N) && a.push(ie(b, je, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.T, c != null && a.push(":", String(c));
        if (c = this.i) this.j && c.charAt(0) != "/" && a.push("/"), a.push(ie(c, c.charAt(0) == "/" ? ke : le, !0));
        (c = this.g.toString()) && a.push("?", c);
        (c = this.v) && a.push("#", ie(c, me));
        return a.join("")
    };
    be.prototype.resolve = function(a) {
        const b = new be(this);
        let c = !!a.o;
        c ? ce(b, a.o) : c = !!a.N;
        c ? b.N = a.N : c = !!a.j;
        c ? b.j = a.j : c = a.T != null;
        var d = a.i;
        if (c) de(b, a.T);
        else if (c = !!a.i) {
            if (d.charAt(0) != "/")
                if (this.j && !this.i) d = "/" + d;
                else {
                    var e = b.i.lastIndexOf("/");
                    e != -1 && (d = b.i.slice(0, e + 1) + d)
                } e = d;
            if (e == ".." || e == ".") d = "";
            else if (e.indexOf("./") != -1 || e.indexOf("/.") != -1) {
                d = e.lastIndexOf("/", 0) == 0;
                e = e.split("/");
                const f = [];
                for (let g = 0; g < e.length;) {
                    const k = e[g++];
                    k == "." ? d && g == e.length && f.push("") : k == ".." ? ((f.length > 1 ||
                        f.length == 1 && f[0] != "") && f.pop(), d && g == e.length && f.push("")) : (f.push(k), d = !0)
                }
                d = f.join("/")
            } else d = e
        }
        c ? b.i = d : c = a.g.toString() !== "";
        c ? ee(b, fe(a.g)) : c = !!a.v;
        c && (b.v = a.v);
        return b
    };

    function ce(a, b, c) {
        a.o = c ? ge(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""))
    }

    function de(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || b < 0) throw Error("j`" + b);
            a.T = b
        } else a.T = null
    }

    function ee(a, b, c) {
        b instanceof he ? (a.g = b, ne(a.g, a.u)) : (c || (b = ie(b, oe)), a.g = new he(b, a.u))
    }

    function pe(a, b, c) {
        a.g.set(b, c);
        return a
    }

    function ge(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }

    function ie(a, b, c) {
        return typeof a === "string" ? (a = encodeURI(a).replace(b, qe), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }

    function qe(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var je = /[#\/\?@]/g,
        le = /[#\?:]/g,
        ke = /[#\?]/g,
        oe = /[#\?@]/g,
        me = /#/g;

    function he(a, b) {
        this.i = this.g = null;
        this.j = a || null;
        this.o = !!b
    }

    function re(a) {
        a.g || (a.g = new Map, a.i = 0, a.j && Nb(a.j, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    h = he.prototype;
    h.add = function(a, b) {
        re(this);
        this.j = null;
        a = se(this, a);
        let c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.i += 1;
        return this
    };

    function te(a, b) {
        re(a);
        b = se(a, b);
        a.g.has(b) && (a.j = null, a.i -= a.g.get(b).length, a.g.delete(b))
    }
    h.clear = function() {
        this.g = this.j = null;
        this.i = 0
    };

    function ue(a, b) {
        re(a);
        b = se(a, b);
        return a.g.has(b)
    }
    h.forEach = function(a, b) {
        re(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    };
    h.Sb = function() {
        re(this);
        const a = Array.from(this.g.values()),
            b = Array.from(this.g.keys()),
            c = [];
        for (let d = 0; d < b.length; d++) {
            const e = a[d];
            for (let f = 0; f < e.length; f++) c.push(b[d])
        }
        return c
    };
    h.Ta = function(a) {
        re(this);
        let b = [];
        if (typeof a === "string") ue(this, a) && (b = b.concat(this.g.get(se(this, a))));
        else {
            a = Array.from(this.g.values());
            for (let c = 0; c < a.length; c++) b = b.concat(a[c])
        }
        return b
    };
    h.set = function(a, b) {
        re(this);
        this.j = null;
        a = se(this, a);
        ue(this, a) && (this.i -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.i += 1;
        return this
    };
    h.get = function(a, b) {
        if (!a) return b;
        a = this.Ta(a);
        return a.length > 0 ? String(a[0]) : b
    };
    h.toString = function() {
        if (this.j) return this.j;
        if (!this.g) return "";
        const a = [],
            b = Array.from(this.g.keys());
        for (let d = 0; d < b.length; d++) {
            var c = b[d];
            const e = encodeURIComponent(String(c));
            c = this.Ta(c);
            for (let f = 0; f < c.length; f++) {
                let g = e;
                c[f] !== "" && (g += "=" + encodeURIComponent(String(c[f])));
                a.push(g)
            }
        }
        return this.j = a.join("&")
    };

    function fe(a) {
        const b = new he;
        b.j = a.j;
        a.g && (b.g = new Map(a.g), b.i = a.i);
        return b
    }

    function se(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }

    function ne(a, b) {
        b && !a.o && (re(a), a.j = null, a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            if (d != e && (te(this, d), te(this, e), c.length > 0)) {
                this.j = null;
                d = this.g;
                var f = d.set;
                e = se(this, e);
                var g = c.length;
                if (g > 0) {
                    const k = Array(g);
                    for (let l = 0; l < g; l++) k[l] = c[l];
                    g = k
                } else g = [];
                f.call(d, e, g);
                this.i += c.length
            }
        }, a));
        a.o = b
    }
    h.extend = function(a) {
        for (let b = 0; b < arguments.length; b++) ae(arguments[b], function(c, d) {
            this.add(d, c)
        }, this)
    };
    class ve {
        constructor() {
            this.g = navigator.userAgent;
            this.url = new be(location.href)
        }
    }
    var F = new ve;

    function we() {
        var a;
        if (a = navigator.platform === "MacIntel") a = navigator.maxTouchPoints > 1;
        return a
    }

    function xe() {
        return F.g.includes("iPad") || F.g.includes("iPhone") || F.g.includes("iPod") || we()
    }

    function ye() {
        return F.g.toLowerCase().includes("gsa") || F.g.includes("GoogleApp")
    }

    function ze() {
        return ye() && xe()
    }

    function Ae() {
        return xe() || F.g.includes("Android") || F.g.includes("Mobile") || F.g.includes("Silk") || F.g.includes("UCBrowser") || F.g.includes("UCWEB")
    }

    function Be() {
        return document.documentElement.id === "sdoodles"
    }

    function Ce() {
        return F.url.i.includes("/logos/") && F.url.i.includes(".html")
    }

    function De() {
        return !!document.getElementById("fkbx") || Ee()
    }

    function Ee() {
        const a = F.url.g.get("ntp");
        return a === "1" || a === "2"
    }

    function Fe() {
        return F.url.g.get("fpdoodle") === "1" && !!document.getElementById("fpdoodle")
    }

    function Ge() {
        return !!document.querySelector("body#iframedoodle")
    }

    function He() {
        return we() && !(Be() && !Ae()) && !De() && !Fe() && !Ce()
    };
    let Ie;

    function Je() {
        Ie || (Ie = new Ke);
        return Ie.g
    }
    var Ke = class {
        constructor() {
            var a = new URLSearchParams(location.search),
                b, c;
            const d = (c = (b = a.get("hl")) == null ? void 0 : b.toLowerCase()) != null ? c : "en";
            var e, f;
            b = (f = (e = a.get("gl")) == null ? void 0 : e.toLowerCase()) != null ? f : "us";
            a: {
                switch (a.get("cta")) {
                    case "a":
                        e = 2;
                        break a;
                    case "s":
                        e = 1;
                        break a;
                    case "n":
                        e = 3;
                        break a
                }
                e = void 0
            }
            f = a.get("se") === "1";
            var g;
            c = (g = a.get("ved")) != null ? g : void 0;
            let k;
            g = (k = a.get("sved")) != null ? k : void 0;
            let l;
            a = (l = a.get("ei")) != null ? l : void 0;
            this.g = {
                hl: d,
                gl: b,
                Of: f,
                Ic: e,
                Qf: c,
                Pf: g,
                Lf: a
            }
        }
    };

    function Le() {
        const a = Je().Ic;
        return a ? a === 2 : !De()
    }
    var Me = () => {
        if (Ge()) throw Error("d");
        return Fe() || Ce() || Ae() && !we()
    };

    function Ne() {
        const a = Je().Ic;
        if (a !== void 0) switch (a) {
            case 2:
            case 1:
                return !1;
            case 3:
                return !0;
            default:
                Gb(a, void 0)
        }
        return Fe() && !De() && !(xe() && !ze())
    };

    function Oe(a) {
        a.g ? a.g = !1 : (a.u.requestAnimationFrame(() => {
            Oe(a)
        }), a.loop(Date.now()))
    }

    function Pe(a) {
        a.i && (a.j = !0, a.i = !1, a.g = !0)
    }
    var Qe = class {
        constructor(a) {
            var b = window;
            this.v = a;
            this.u = b;
            this.o = 0;
            this.j = this.started = this.g = this.i = !1
        }
        mb() {
            return this.j
        }
        start() {
            this.o = Date.now();
            const a = !this.g && !this.i;
            this.g = !1;
            this.started = this.i = !0;
            this.j = !1;
            a && Oe(this)
        }
        loop(a) {
            var b = a - this.o;
            b < 0 || (b = Math.min(b, 50), this.o = a, this.v(b))
        }
    };

    function Re(a) {
        a.isVisible = !0;
        Le() && a.i.start()
    }
    var Se = class {
        constructor(a) {
            this.g = new Bd;
            this.isVisible = !0;
            this.i = new Qe(d => {
                this.update(d)
            });
            a = a.getContext("2d");
            this.g.g = [new Yd(this.g), new Xd(this.g, a)];
            const {
                Xd: b,
                animation: c
            } = Ud();
            v(this.g, new u(new B, new Nd, b, c));
            this.g.update(1)
        }
        update(a) {
            Le() && this.isVisible && this.g.update(a)
        }
    };

    function H(a) {
        return new Te(a)
    }
    var Ue = class {
            constructor() {
                this.state = 0;
                this.o = !1
            }
            update(a) {
                this.state === 0 && (this.i(), this.state = 1);
                this.state !== 1 || this.o || this.g() || this.Ma(a);
                !this.o && !this.g() || this.Xa() || (this.state = 2)
            }
            g() {
                return !1
            }
            Xa() {
                return this.state === 2
            }
            then(a) {
                return new I([this, a instanceof Function ? new J(a) : a])
            }
            i() {}
            Ma() {}
        },
        Te = class extends Ue {
            constructor(a) {
                super();
                this.j = a
            }
            i() {
                this.action = this.j()
            }
            Ma(a) {
                let b;
                (b = this.action) == null || b.update(a)
            }
            g() {
                return this.action !== void 0 && this.action.Xa()
            }
        },
        J = class extends Ue {
            constructor(a) {
                super();
                this.j = a
            }
            i() {
                this.j();
                this.o = !0
            }
        },
        Ve = class extends Ue {
            constructor(a, b) {
                super();
                this.u = a;
                this.j = b
            }
            Ma(a) {
                this.u(a)
            }
            g() {
                return this.j()
            }
        },
        K = class extends Ue {
            constructor(a) {
                super();
                this.j = a
            }
            g() {
                return this.j()
            }
        },
        L = class extends Ue {
            constructor(a) {
                super();
                this.u = a;
                this.j = 0
            }
            Ma(a) {
                this.j += a
            }
            g() {
                return this.j >= this.u
            }
        },
        I = class extends Ue {
            constructor(a) {
                super();
                this.actions = a;
                this.j = 0
            }
            Ma(a) {
                let b;
                (b = this.actions[this.j]) == null || b.update(a);
                let c;
                ((c = this.actions[this.j]) == null ? 0 : c.Xa()) && this.j++
            }
            g() {
                return this.j >=
                    this.actions.length
            }
            then(a) {
                this.actions.push(a instanceof Function ? new J(a) : a);
                return this
            }
        },
        M = class extends Ue {
            constructor(a) {
                super();
                this.actions = a
            }
            Ma(a) {
                for (const b of this.actions) b.update(a)
            }
            g() {
                return this.actions.every(a => a.Xa())
            }
        };

    function We(a, b) {
        return Math.min(Math.max(a, 0), b)
    }

    function N(a, b, c) {
        return a + c * (b - a)
    }

    function Xe(a, b) {
        a = Math.atan2(b, a) * 180 / Math.PI % 360;
        return a * 360 < 0 ? a + 360 : a
    };

    function Ye(a, b) {
        this.x = a !== void 0 ? a : 0;
        this.y = b !== void 0 ? b : 0
    }
    h = Ye.prototype;
    h.equals = function(a) {
        return a instanceof Ye && (this == a ? !0 : this && a ? this.x == a.x && this.y == a.y : !1)
    };
    h.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    h.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    h.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    h.scale = function(a, b) {
        this.x *= a;
        this.y *= typeof b === "number" ? b : a;
        return this
    };

    function Ze(a, b, c, d, e, f, g, k) {
        this.u = a;
        this.T = b;
        this.g = c;
        this.j = d;
        this.i = e;
        this.o = f;
        this.v = g;
        this.N = k
    }
    Ze.prototype.equals = function(a) {
        return this.u == a.u && this.T == a.T && this.g == a.g && this.j == a.j && this.i == a.i && this.o == a.o && this.v == a.v && this.N == a.N
    };

    function $e(a, b) {
        if (b == 0) return a.u;
        if (b == 1) return a.v;
        let c = N(a.u, a.g, b),
            d = N(a.g, a.i, b);
        a = N(a.i, a.v, b);
        c = N(c, d, b);
        d = N(d, a, b);
        return N(c, d, b)
    }

    function af(a, b) {
        let c = (b - a.u) / (a.v - a.u);
        if (c <= 0) return 0;
        if (c >= 1) return 1;
        let d = 0,
            e = 1,
            f = 0;
        for (var g = 0; g < 8; g++) {
            f = $e(a, c);
            const k = ($e(a, c + 1E-6) - f) / 1E-6;
            if (Math.abs(f - b) < 1E-6) return c;
            if (Math.abs(k) < 1E-6) break;
            else f < b ? d = c : e = c, c -= (f - b) / k
        }
        for (g = 0; Math.abs(f - b) > 1E-6 && g < 8; g++) f < b ? (d = c, c = (c + e) / 2) : (e = c, c = (c + d) / 2), f = $e(a, c);
        return c
    };
    var bf = a => a,
        cf = ((a, b, c, d) => {
            const e = new Ze(0, 0, a, b, c, d, 1, 1);
            return f => {
                f = af(e, f);
                if (f == 0) f = e.T;
                else if (f == 1) f = e.N;
                else {
                    var g = N(e.T, e.j, f),
                        k = N(e.j, e.o, f),
                        l = N(e.o, e.N, f);
                    g = N(g, k, f);
                    k = N(k, l, f);
                    f = N(g, k, f)
                }
                return f
            }
        })(0, 0, .6, 1);
    var df = class extends Ue {
            constructor(a, b, c) {
                super();
                this.u = a;
                this.from = b;
                this.T = c;
                this.j = 0;
                this.v = bf
            }
            i() {
                this.u === 0 && this.N(this.from, this.T, this.v(1))
            }
            Ma(a) {
                this.j += a;
                this.N(this.from, this.T, this.v(Math.min(1, this.j / this.u)))
            }
            g() {
                return this.j >= this.u
            }
        },
        ef = class extends df {
            constructor(a, b, c, d) {
                super(a, b, c);
                this.U = d
            }
            N(a, b, c) {
                this.U(N(a, b, c))
            }
        };
    var ff = {
        ad: ["ca"],
        ae: ["ar", "en", "fa", "hi", "ur"],
        af: ["ps", "fa"],
        ag: ["en"],
        al: ["sq", "en"],
        am: ["hy", "ru"],
        ao: ["pt-PT"],
        ar: ["es-419", "es"],
        as: ["en"],
        at: ["de"],
        au: ["en"],
        az: ["az", "ru"],
        ba: ["bs", "hr", "sr"],
        bd: ["bn", "en"],
        be: ["nl", "de", "en", "fr"],
        bf: ["fr"],
        bg: ["bg"],
        bh: ["ar", "en"],
        bi: ["fr"],
        bj: ["fr"],
        bn: ["ms", "en", "zh-CN"],
        bo: ["es-419", "es"],
        br: ["pt-BR", "en"],
        bs: ["en"],
        bt: ["en"],
        bw: ["tn", "en"],
        by: ["be", "ru"],
        bz: ["en", "es", "es-419"],
        ca: ["en", "fr", "fr-CA"],
        cd: ["fr", "sw"],
        cf: ["fr"],
        cg: ["fr"],
        ch: ["de", "en",
            "fr", "it"
        ],
        ci: ["fr"],
        ck: ["en"],
        cl: ["es-419", "es"],
        cm: ["fr", "en"],
        cn: ["zh-CN"],
        co: ["es-419", "es"],
        cr: ["es-419", "en", "es"],
        cu: ["es-419", "es"],
        cv: ["pt-PT"],
        cy: ["en", "el", "tr"],
        cz: ["cs"],
        de: ["de", "en", "fr"],
        dj: ["fr", "ar", "so"],
        dk: ["da"],
        dm: ["en"],
        "do": ["es-419", "es"],
        dz: ["fr", "ar"],
        ec: ["es-419", "es"],
        ee: ["et", "ru"],
        eg: ["ar", "en"],
        es: ["es", "ca", "en", "eu", "gl"],
        et: ["am", "en", "so"],
        fi: ["fi", "sv"],
        fj: ["en"],
        fr: ["fr"],
        ga: ["fr"],
        ge: ["ka", "en"],
        gg: ["en", "fr"],
        gh: ["en"],
        gi: ["en", "es", "it", "pt-PT"],
        gl: ["da", "en"],
        gm: ["en", "wo"],
        gr: ["el"],
        gt: ["es-419", "es"],
        gy: ["en"],
        hk: ["zh-TW", "en", "zh-CN", "zh-HK"],
        hn: ["es-419", "es"],
        hr: ["hr"],
        ht: ["fr", "en", "ht"],
        hu: ["hu"],
        id: ["id", "en", "nl"],
        ie: ["en-GB", "ga"],
        il: ["iw", "ar", "en"],
        im: ["en"],
        "in": "en bn gu hi kn ml mr ne or pa ta te".split(" "),
        iq: ["ar", "en"],
        is: ["is", "en"],
        it: ["it", "en"],
        je: ["en", "fr"],
        jm: ["en"],
        jo: ["ar", "en"],
        jp: ["ja"],
        ke: ["sw", "en"],
        kg: ["ky", "ru"],
        kh: ["km", "en"],
        ki: ["en"],
        kr: ["ko"],
        kw: ["ar", "en"],
        kz: ["kk", "ru"],
        la: ["lo", "en"],
        lb: ["ar", "en", "fr", "hy"],
        lk: ["en",
            "si", "ta"
        ],
        ls: ["st", "en", "zu"],
        lt: ["lt"],
        lu: ["de", "fr"],
        lv: ["lv", "lt", "ru"],
        ly: ["ar", "en", "it"],
        ma: ["fr", "ar"],
        md: ["ro", "ro-MD", "ru"],
        me: ["sr-ME", "bs", "sr"],
        mg: ["mg", "fr"],
        mk: ["mk"],
        ml: ["fr"],
        mm: ["my", "en"],
        mn: ["mn"],
        mt: ["mt", "en"],
        mu: ["en", "fr"],
        mv: ["en"],
        mw: ["ny", "en"],
        mx: ["es-419", "es"],
        my: ["en", "ms"],
        mz: ["pt-PT", "ny", "sn", "sw"],
        na: ["en", "af", "de"],
        ne: ["fr"],
        ng: ["en"],
        ni: ["es-419", "en", "es"],
        nl: ["nl", "en"],
        no: ["no", "nn"],
        np: ["ne", "en"],
        nr: ["en"],
        nu: ["en"],
        nz: ["en-GB"],
        om: ["ar", "en"],
        pa: ["es-419",
            "en", "es"
        ],
        pe: ["es-419", "es"],
        pg: ["en"],
        ph: ["en"],
        pk: ["en", "pa", "ur"],
        pl: ["pl"],
        pn: ["en"],
        pr: ["es-419", "en", "es"],
        ps: ["ar", "en"],
        pt: ["pt-PT"],
        py: ["es-419", "es"],
        qa: ["ar", "en"],
        ro: ["ro", "de", "hu"],
        rs: ["sr", "sr-Latn"],
        ru: ["ru"],
        rw: ["en", "fr", "sw"],
        sa: ["ar", "en"],
        sb: ["en"],
        sc: ["crs", "en", "fr"],
        se: ["sv"],
        sg: ["en", "ms", "ta", "zh-CN"],
        si: ["sl"],
        sk: ["sk", "hu"],
        sl: ["en"],
        sm: ["it"],
        sn: ["fr", "wo"],
        so: ["so", "ar", "en"],
        sr: ["nl", "en"],
        st: ["pt-PT"],
        sv: ["es-419", "es"],
        td: ["fr", "ar"],
        tg: ["fr"],
        th: ["th", "en"],
        tj: ["tg",
            "ru"
        ],
        tl: ["pt-PT", "en", "id"],
        tm: ["tk", "ru", "uz"],
        tn: ["ar", "fr"],
        to: ["en"],
        tr: ["tr"],
        tt: "en es es-419 fr hi zh-TW".split(" "),
        tw: ["zh-TW", "en"],
        tz: ["sw", "en"],
        ua: ["uk", "ru"],
        ug: ["en"],
        uk: ["en-GB"],
        us: ["en", "es", "es-419", "zh-CN"],
        uy: ["es-419", "es"],
        uz: ["uz", "ru"],
        vc: ["en"],
        ve: ["es-419", "es"],
        vi: ["en"],
        vn: ["vi", "en", "fr", "zh-TW"],
        vu: ["en", "fr"],
        ws: ["en"],
        za: ["en", "af", "st", "tn", "zu"],
        zm: ["en", "ny", "sn"],
        zw: ["en", "ny", "sn", "tn", "zu"]
    };
    var gf = RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]"),
        hf = RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]"),
        jf = /^http:\/\/.*/,
        kf = RegExp("^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)",
            "i"),
        lf = /\s+/,
        mf = /[\d\u06f0-\u06f9]/;
    let nf = null;

    function of() {
        nf || (nf = new pf);
        return nf
    }

    function qf(a, b, c, d) {
        const e = `${b}-${c}`;
        if (d.includes(e)) return a.hl = b, e;
        if (b && d.includes(b)) return a.hl = b;
        if (c && ff[c])
            for (const f of ff[c])
                if (d.includes(f)) return a.hl = f, a.hl;
        return d.includes("en") ? (a.hl = "en", a.hl) : a.hl = null
    }

    function rf(a, b) {
        if (!a.g) throw Error("l");
        return a.g[b] === void 0 ? "" : a.g[b]
    }

    function sf(a) {
        a = rf(tf, a);
        var b;
        let c = b = 0,
            d = !1;
        const e = a.split(lf);
        for (let f = 0; f < e.length; f++) {
            const g = e[f];
            hf.test(g) ? (b++, c++) : jf.test(g) ? d = !0 : gf.test(g) ? c++ : mf.test(g) && (d = !0)
        }
        b = c == 0 ? d ? 1 : 0 : b / c > .4 ? -1 : 1;
        return b === 1 ? "\u202a" + a + "\u202c" : b === -1 ? "\u202b" + a + "\u202c" : a
    }
    var pf = class {
        constructor() {
            this.hl = null
        }
        load(a, b, c, d) {
            a = qf(this, a, b, c);
            if (a == null) return Promise.resolve();
            const e = `${d}messages.${a}.nocache.json`,
                f = new Ob;
            f.wa = "text";
            return new Promise((g, k) => {
                cb(f, "success", () => {
                    try {
                        var l = f.g ? f.g.responseText : ""
                    } catch (p) {
                        l = ""
                    }
                    this.g = JSON.parse(l.substring(5));
                    g()
                });
                cb(f, "error", k);
                Rb(f, e)
            })
        }
    };
    const uf = of();
    uc();

    function vf(a, b, c) {
        a = a * Math.PI / 180;
        return new A(c.x + Math.cos(a) * b, c.y - Math.sin(a) * b)
    }

    function wf(a, b, c, d) {
        return H(() => {
            const e = a.alpha;
            return new ef(b * (d - e) / (d - c), e, d, f => {
                a.alpha = f
            })
        })
    }

    function O(a) {
        return rf(uf, a)
    }
    let xf;
    const yf = new Set([n.Fc, n.Cc, n.Ac, n.Bc, n.Dc, n.Ec]);

    function zf(a) {
        xf = a.createBiquadFilter();
        xf.type = "lowpass";
        xf.frequency.value = xf.frequency.maxValue;
        for (const c of Object.values(n))
            if (!yf.has(c) && (a = xf, !c.u.includes(a))) {
                if (c.j) {
                    var b = [c.j].concat(c.u);
                    for (let d = 0, e; e = b[d++];) e.disconnect()
                }
                c.u.push(a);
                kc(c)
            }
    }

    function Af() {
        var a = Bf.g;
        xf || zf(a);
        xf.frequency.exponentialRampToValueAtTime(350, a.currentTime + 1.5)
    };

    function Cf(a) {
        ia.setTimeout(() => {
            throw a;
        }, 0)
    };
    !Ha("Android") || Ja();
    Ja();
    Ha("Safari") && (Ja() || (Ia() ? 0 : Ha("Coast")) || (Ia() ? 0 : Ha("Opera")) || (Ia() ? 0 : Ha("Edge")) || (Ia() ? Ga("Microsoft Edge") : Ha("Edg/")) || Ia() && Ga("Opera"));
    var Df = {},
        Ef = null;
    var Ff = typeof Uint8Array !== "undefined",
        Gf = !Ka && typeof btoa === "function";
    var Hf = typeof Symbol === "function" && typeof Symbol() === "symbol",
        If = typeof Symbol === "function" && typeof Symbol() === "symbol" ? Symbol() : void 0;
    var Jf = Hf ? a => a[If] | 0 : a => a.Kb | 0,
        Kf = Hf ? a => a[If] : a => a.Kb,
        Lf = Hf ? (a, b) => {
            a[If] = b
        } : (a, b) => {
            a.Kb !== void 0 ? a.Kb = b : Object.defineProperties(a, {
                Kb: {
                    value: b,
                    configurable: !0,
                    writable: !0,
                    enumerable: !1
                }
            })
        };
    var Mf = {},
        Nf = {};

    function Of(a) {
        return !(!a || typeof a !== "object" || a.g !== Nf)
    }

    function Pf(a) {
        return a !== null && typeof a === "object" && !Array.isArray(a) && a.constructor === Object
    }

    function Qf(a) {
        return !Array.isArray(a) || a.length ? !1 : Jf(a) & 1 ? !0 : !1
    };
    var Rf = typeof ia.BigInt === "function" && typeof ia.BigInt(0) === "bigint";
    const Sf = Number.MIN_SAFE_INTEGER.toString(),
        Tf = Rf ? BigInt(Number.MIN_SAFE_INTEGER) : void 0,
        Uf = Number.MAX_SAFE_INTEGER.toString(),
        Vf = Rf ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;

    function Wf(a, b) {
        if (a.length > b.length) return !1;
        if (a.length < b.length || a === b) return !0;
        for (let c = 0; c < a.length; c++) {
            const d = a[c],
                e = b[c];
            if (d > e) return !1;
            if (d < e) return !0
        }
    };

    function Xf(a, b) {
        var c, d, e;
        if (d = c = (d = Yf) == null ? void 0 : (e = d.get(b)) == null ? void 0 : e.get(a)) {
            a: if (a.length !== c.length) c = !1;
                else {
                    for (const f in c) {
                        e = Number(f);
                        if (d = Number.isInteger(e)) d = a[e], e = c[e], d = !(Number.isNaN(d) ? Number.isNaN(e) : d === e);
                        if (d) {
                            c = !1;
                            break a
                        }
                    }
                    c = !0
                }d = !c
        }
        if (d) {
            Zf();
            let f, g;
            (f = Yf) == null || (g = f.get(b)) == null || g.delete(a)
        }
    }

    function Zf() {
        const a = Error();
        a.__closure__error__context__984382 || (a.__closure__error__context__984382 = {});
        a.__closure__error__context__984382.severity = "incident";
        Cf(a)
    }
    let Yf = void 0;
    let $f;

    function ag(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "bigint":
                return (Rf ? a >= Tf && a <= Vf : a[0] === "-" ? Wf(a, Sf) : Wf(a, Uf)) ? Number(a) : String(a);
            case "boolean":
                return a ? 1 : 0;
            case "object":
                if (a)
                    if (Array.isArray(a)) {
                        if (Qf(a)) return
                    } else if (Ff && a != null && a instanceof Uint8Array) {
                    if (Gf) {
                        for (var b = "", c = 0, d = a.length - 10240; c < d;) b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
                        b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
                        a = btoa(b)
                    } else {
                        b === void 0 && (b = 0);
                        if (!Ef) {
                            Ef = {};
                            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
                            d = ["+/=", "+/", "-_=", "-_.", "-_"];
                            for (var e = 0; e < 5; e++) {
                                var f = c.concat(d[e].split(""));
                                Df[e] = f;
                                for (var g = 0; g < f.length; g++) {
                                    var k = f[g];
                                    Ef[k] === void 0 && (Ef[k] = g)
                                }
                            }
                        }
                        b = Df[b];
                        c = Array(Math.floor(a.length / 3));
                        d = b[64] || "";
                        for (e = f = 0; f < a.length - 2; f += 3) {
                            var l = a[f],
                                p = a[f + 1];
                            k = a[f + 2];
                            g = b[l >> 2];
                            l = b[(l & 3) << 4 | p >> 4];
                            p = b[(p & 15) << 2 | k >> 6];
                            k = b[k & 63];
                            c[e++] = g + l + p + k
                        }
                        g = 0;
                        k = d;
                        switch (a.length - f) {
                            case 2:
                                g = a[f + 1], k = b[(g & 15) << 2] || d;
                            case 1:
                                a = a[f], c[e] = b[a >> 2] + b[(a & 3) << 4 | g >> 4] + k + d
                        }
                        a = c.join("")
                    }
                    return a
                }
        }
        return a
    };

    function bg(a, b, c, d, e) {
        if (a != null) {
            if (Array.isArray(a)) a = Qf(a) ? void 0 : e && Jf(a) & 2 ? a : cg(a, b, c, d !== void 0, e);
            else if (Pf(a)) {
                const f = {};
                for (let g in a) f[g] = bg(a[g], b, c, d, e);
                a = f
            } else a = b(a, d);
            return a
        }
    }

    function cg(a, b, c, d, e) {
        const f = d || c ? Jf(a) : 0;
        d = d ? !!(f & 32) : void 0;
        a = Array.prototype.slice.call(a);
        for (let g = 0; g < a.length; g++) a[g] = bg(a[g], b, c, d, e);
        c && c(f, a);
        return a
    }

    function dg(a) {
        return a.Ce === Mf ? a.toJSON() : ag(a)
    };

    function eg(a, b) {
        a = a.g;
        var c = Kf(a);
        if (b === -1) b = null;
        else {
            var d = c >> 15 & 1023 || 536870912;
            b >= d ? b = c & 256 ? a[a.length - 1][b] : void 0 : (b += +!!(c & 512) - 1, b = b < 0 || b >= a.length || b >= d ? void 0 : a[b])
        }
        b = b == null || typeof b === "string" ? b : void 0;
        return b != null ? b : ""
    };
    let fg;
    var hg = class {
        constructor(a) {
            a: {
                var b = b != null ? b : 0;a == null && (a = $f);$f = void 0;
                if (a == null) {
                    var c = 96;
                    a = []
                } else {
                    if (!Array.isArray(a)) throw Error("m");
                    c = Jf(a);
                    if (c & 2048) throw Error("p");
                    if (c & 64) break a;
                    b === 1 || b === 2 || (c |= 64);
                    b = a;
                    var d = b.length;
                    if (d && (--d, Pf(b[d]))) {
                        c |= 256;
                        b = d - (+!!(c & 512) - 1);
                        if (b >= 1024) throw Error("r");
                        c = c & -33521665 | (b & 1023) << 15
                    }
                }
                Lf(a, c)
            }
            this.g = a
        }
        toJSON() {
            return gg(this)
        }
    };
    hg.prototype.Ce = Mf;
    hg.prototype.toString = function() {
        try {
            return fg = !0, gg(this).toString()
        } finally {
            fg = !1
        }
    };

    function gg(a) {
        var b;
        if (a && (b = Yf) != null && b.has(a) && (b = a.g))
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                if (c === b.length - 1 && Pf(d))
                    for (var e in d) {
                        var f = d[e];
                        Array.isArray(f) && Xf(f, a)
                    } else Array.isArray(d) && Xf(d, a)
            }
        a = fg ? a.g : cg(a.g, dg, void 0, void 0, !1);
        e = !fg;
        if (c = a.length) {
            d = a[c - 1];
            (f = Pf(d)) ? c-- : d = void 0;
            b = a;
            if (f) {
                b: {
                    var g = d;
                    var k;
                    var l = !1;
                    if (g)
                        for (let z in g)
                            if (isNaN(+z)) {
                                let E;
                                ((E = k) != null ? E : k = {})[z] = g[z]
                            } else if (f = g[z], Array.isArray(f) && (Qf(f) || Of(f) && f.size === 0) && (f = null), f == null && (l = !0), f != null) {
                        let E;
                        ((E = k) != null ? E : k = {})[z] = f
                    }
                    l || (k = g);
                    if (k)
                        for (let z in k) {
                            l = k;
                            break b
                        }
                    l = null
                }
                g = l == null ? d != null : l !== d
            }
            for (; c > 0; c--) {
                k = b[c - 1];
                if (!(k == null || Qf(k) || Of(k) && k.size === 0)) break;
                var p = !0
            }
            if (b !== a || g || p) {
                if (!e) b = Array.prototype.slice.call(b, 0, c);
                else if (p || g || l) b.length = c;
                l && b.push(l)
            }
            p = b
        } else p = a;
        return p
    };

    function ig(a) {
        return a instanceof Db ? a : Eb(String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"))
    };

    function Kb(a, ...b) {
        if (b.length === 0) return ub(a[0]);
        let c = a[0];
        for (let d = 0; d < b.length; d++) c += encodeURIComponent(b[d]) + a[d + 1];
        return ub(c)
    };
    var jg = {};

    function kg() {
        throw Error("t");
    }
    kg.prototype.Hc = null;
    kg.prototype.toString = function() {
        return this.uc
    };
    kg.prototype.Qc = function() {
        if (this.Qb !== jg) throw Error("u");
        return Eb(this.toString())
    };

    function lg() {
        kg.call(this)
    }
    pa(lg, kg);
    lg.prototype.Qb = jg;

    function mg(a) {
        if (a != null) switch (a.Hc) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return 0
        }
        return null
    }

    function ng(a) {
        return a != null && a.Qb === jg ? a : a instanceof Db ? P(Fb(a).toString()) : P(String(String(a)).replace(og, pg), mg(a))
    }
    var P = function(a) {
        function b(c) {
            this.uc = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            d !== void 0 && (c.Hc = d);
            return c
        }
    }(lg);

    function qg(a) {
        return rg(String(a), () => "").replace(sg, "&lt;")
    }
    const tg = RegExp.prototype.hasOwnProperty("sticky"),
        ug = new RegExp((tg ? "" : "^") + "(?:!|/?([a-zA-Z][a-zA-Z0-9:-]*))", tg ? "gy" : "g");

    function rg(a, b) {
        const c = [],
            d = a.length;
        let e = 0,
            f = [],
            g, k, l = 0;
        for (; l < d;) {
            switch (e) {
                case 0:
                    var p = a.indexOf("<", l);
                    if (p < 0) {
                        if (c.length === 0) return a;
                        c.push(a.substring(l));
                        l = d
                    } else c.push(a.substring(l, p)), k = p, l = p + 1, tg ? (ug.lastIndex = l, p = ug.exec(a)) : (ug.lastIndex = 0, p = ug.exec(a.substring(l))), p ? (f = ["<", p[0]], g = p[1], e = 1, l += p[0].length) : c.push("<");
                    break;
                case 1:
                    p = a.charAt(l++);
                    switch (p) {
                        case "'":
                        case '"':
                            let z = a.indexOf(p, l);
                            z < 0 ? l = d : (f.push(p, a.substring(l, z + 1)), l = z + 1);
                            break;
                        case ">":
                            f.push(p);
                            c.push(b(f.join(""),
                                g));
                            e = 0;
                            f = [];
                            k = g = null;
                            break;
                        default:
                            f.push(p)
                    }
                    break;
                default:
                    throw Error();
            }
            e === 1 && l >= d && (l = k + 1, c.push("<"), e = 0, f = [], k = g = null)
        }
        return c.join("")
    }

    function Q(a) {
        return a != null && a.Qb === jg ? String(qg(a.uc)).replace(vg, pg) : String(a).replace(og, pg)
    }
    const wg = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\v": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    };

    function pg(a) {
        return wg[a]
    }
    const og = /[\x00\x22\x26\x27\x3c\x3e]/g,
        vg = /[\x00\x22\x27\x3c\x3e]/g,
        xg = /^[a-zA-Z0-9+\/_-]+={0,2}$/,
        sg = /</g;

    function yg(a, b) {
        b = String(b);
        a.contentType === "application/xhtml+xml" && (b = b.toLowerCase());
        return a.createElement(b)
    }

    function zg() {
        this.g = ia.document || document
    }
    zg.prototype.contains = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && b.nodeType == 1) return a == b || a.contains(b);
        if (typeof a.compareDocumentPosition != "undefined") return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    /*
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    function Ag() {
        var a = Bg,
            b = sa || (sa = new zg);
        if ((a = a(Cg, void 0)) && a.g) return a.g();
        a = Dg(a);
        var c = b.g;
        b = yg(c, "DIV");
        if (b.nodeType === 1 && /^(script|style)$/i.test(b.tagName)) throw Error("d");
        b.innerHTML = Fb(a);
        if (b.childNodes.length == 1) b = b.removeChild(b.firstChild);
        else {
            for (a = c.createDocumentFragment(); b.firstChild;) a.appendChild(b.firstChild);
            b = a
        }
        return b
    }

    function Eg(a, b) {
        b = a(b || Cg, void 0);
        a = sa || (sa = new zg);
        b && b.g ? a = b.g() : (a = yg(a.g, "DIV"), b = Dg(b), a.innerHTML = Fb(b));
        a.childNodes.length == 1 && (b = a.firstChild, b.nodeType == 1 && (a = b));
        return a
    }

    function Dg(a) {
        return ka(a) ? a.Qc && (a = a.Qc(), a instanceof Db) ? a : ig("zSoyz") : ig(String(a))
    }
    const Cg = {};

    function Bg(a, b) {
        a = P;
        var c = b && b.Kf;
        b = P;
        c ? (c = String(c), c = xg.test(c) ? c : "zSoyz", c = ' nonce="' + Q(c) + '"') : c = "";
        b = b("<style" + c + ">\n.ddl-button-hover-parent{display:grid;grid-template-columns:1fr}.ddl-button-hover-parent>*{grid-row-start:1;grid-column-start:1}@media (min-width:900px){.ddl-button-hover-parent:hover .ddl-button-hover-child{visibility:visible}}.ddl-hidden .ddl-button-hover-parent:hover .ddl-button-hover-child{visibility:hidden}.ddl-button-hover-parent .ddl-button-hover-child{visibility:hidden}@media (min-width:900px){.ddl-button-hover-parent:hover .ddl-button-norm-child{visibility:hidden}}.ddl-gone{display:none}.ddl-game-canvas{position:absolute;top:0;left:0;width:100%;height:100%;background:black}.ddl-pause-button-container{position:absolute;bottom:15px;right:15px;display:grid;grid-template-columns:1fr}.ddl-pause-button-container>*{grid-row-start:1;grid-column-start:1}.ddl-pause-button-container:hover>.ddl-pause-button{-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.ddl-pause-screen{position:absolute;top:0;left:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.ddl-pause-screen .ddl-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:.5}.ddl-pause-screen .ddl-pause-text{font-size:24px;font-weight:400;color:#fbaa1a;line-height:28px;position:relative}.ddl-pause-screen .ddl-resume-text{font-size:48px;color:white;position:relative}.ddl-hidden{visibility:hidden}.ddl-mute-button{pointer-events:auto}.ddl-mute-button:hover{-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.PLAY_SPRITE{background-image:url(/logos/2024/halloween24/rc3/play-sprite.png);background-repeat:no-repeat}.PLAY01_size{width:150px;height:200px}.PLAY01_offset{background-position:0 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY01{background:url(/logos/2024/halloween24/rc3/play-sprite.png) 0 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY02_size{width:150px;height:200px}.PLAY02_offset{background-position:-153px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY02{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -153px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY03_size{width:150px;height:200px}.PLAY03_offset{background-position:-306px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY03{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -306px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY04_size{width:150px;height:200px}.PLAY04_offset{background-position:-459px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY04{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -459px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY05_size{width:150px;height:200px}.PLAY05_offset{background-position:-612px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY05{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -612px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY06_size{width:150px;height:200px}.PLAY06_offset{background-position:-765px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY06{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -765px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY07_size{width:150px;height:200px}.PLAY07_offset{background-position:-918px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY07{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -918px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY08_size{width:150px;height:200px}.PLAY08_offset{background-position:-1071px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY08{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -1071px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY09_size{width:150px;height:200px}.PLAY09_offset{background-position:-1224px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY09{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -1224px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY10_size{width:150px;height:200px}.PLAY10_offset{background-position:-1377px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY10{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -1377px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY11_size{width:150px;height:200px}.PLAY11_offset{background-position:-1530px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY11{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -1530px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY12_size{width:150px;height:200px}.PLAY12_offset{background-position:-1683px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY12{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -1683px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY13_size{width:150px;height:200px}.PLAY13_offset{background-position:-1836px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY13{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -1836px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY14_size{width:150px;height:200px}.PLAY14_offset{background-position:-1989px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY14{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -1989px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY15_size{width:150px;height:200px}.PLAY15_offset{background-position:-2142px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY15{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -2142px 0/2445px 200px no-repeat;width:150px;height:200px}.PLAY16_size{width:150px;height:200px}.PLAY16_offset{background-position:-2295px 0;-webkit-background-size:2445px 200px;background-size:2445px 200px;width:150px;height:200px}.PLAY16{background:url(/logos/2024/halloween24/rc3/play-sprite.png) -2295px 0/2445px 200px no-repeat;width:150px;height:200px}.MOMO_SPRITE{background-image:url(/logos/2024/halloween24/rc3/momo-sprite.png);background-repeat:no-repeat}.BROOM_size{width:123px;height:26px}.BROOM_offset{background-position:0 -1929px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:123px;height:26px}.BROOM{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) 0 -1929px/2046px 1955px no-repeat;width:123px;height:26px}.CAT_SURPRISED_FINAL00_size{width:117px;height:127px}.CAT_SURPRISED_FINAL00_offset{background-position:-1929px 0;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:117px;height:127px}.CAT_SURPRISED_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px 0/2046px 1955px no-repeat;width:117px;height:127px}.CAT_SURPRISED_FINAL01_size{width:117px;height:127px}.CAT_SURPRISED_FINAL01_offset{background-position:-1929px -130px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:117px;height:127px}.CAT_SURPRISED_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -130px/2046px 1955px no-repeat;width:117px;height:127px}.CAT_SURPRISED_FINAL02_size{width:117px;height:127px}.CAT_SURPRISED_FINAL02_offset{background-position:-1929px -260px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:117px;height:127px}.CAT_SURPRISED_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -260px/2046px 1955px no-repeat;width:117px;height:127px}.CAT_SURPRISED_FINAL03_size{width:117px;height:127px}.CAT_SURPRISED_FINAL03_offset{background-position:-1929px -260px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:117px;height:127px}.CAT_SURPRISED_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -260px/2046px 1955px no-repeat;width:117px;height:127px}.CAT_SURPRISED_FINAL04_size{width:117px;height:127px}.CAT_SURPRISED_FINAL04_offset{background-position:-1929px -260px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:117px;height:127px}.CAT_SURPRISED_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -260px/2046px 1955px no-repeat;width:117px;height:127px}.CAT_SURPRISED_FINAL05_size{width:117px;height:127px}.CAT_SURPRISED_FINAL05_offset{background-position:-1929px -260px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:117px;height:127px}.CAT_SURPRISED_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -260px/2046px 1955px no-repeat;width:117px;height:127px}.CAT_SURPRISED_FINAL06_size{width:117px;height:127px}.CAT_SURPRISED_FINAL06_offset{background-position:-1929px -390px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:117px;height:127px}.CAT_SURPRISED_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -390px/2046px 1955px no-repeat;width:117px;height:127px}.GLOW_size{width:50px;height:50px}.GLOW_offset{background-position:-1982px -520px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:50px;height:50px}.GLOW{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1982px -520px/2046px 1955px no-repeat;width:50px;height:50px}.PARTICLE_size{width:50px;height:50px}.PARTICLE_offset{background-position:-1982px -573px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:50px;height:50px}.PARTICLE{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1982px -573px/2046px 1955px no-repeat;width:50px;height:50px}.LIGHTNING_BOLT_size{width:20px;height:40px}.LIGHTNING_BOLT_offset{background-position:-1954px -661px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:20px;height:40px}.LIGHTNING_BOLT{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1954px -661px/2046px 1955px no-repeat;width:20px;height:40px}.SYMBOL_BLUE_size{width:8px;height:32px}.SYMBOL_BLUE_offset{background-position:-2035px -520px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:8px;height:32px}.SYMBOL_BLUE{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -2035px -520px/2046px 1955px no-repeat;width:8px;height:32px}.SYMBOL_GREEN_size{width:24px;height:32px}.SYMBOL_GREEN_offset{background-position:-1929px -625px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:24px;height:32px}.SYMBOL_GREEN{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -625px/2046px 1955px no-repeat;width:24px;height:32px}.SYMBOL_HEART_size{width:25px;height:32px}.SYMBOL_HEART_offset{background-position:-1929px -590px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:25px;height:32px}.SYMBOL_HEART{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -590px/2046px 1955px no-repeat;width:25px;height:32px}.SYMBOL_HOURGLASS_size{width:50px;height:67px}.SYMBOL_HOURGLASS_offset{background-position:-1929px -520px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:50px;height:67px}.SYMBOL_HOURGLASS{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -520px/2046px 1955px no-repeat;width:50px;height:67px}.SYMBOL_LIGHTNING_size{width:18px;height:32px}.SYMBOL_LIGHTNING_offset{background-position:-1957px -590px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:18px;height:32px}.SYMBOL_LIGHTNING{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1957px -590px/2046px 1955px no-repeat;width:18px;height:32px}.SYMBOL_RED_size{width:24px;height:32px}.SYMBOL_RED_offset{background-position:-1956px -626px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:24px;height:32px}.SYMBOL_RED{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1956px -626px/2046px 1955px no-repeat;width:24px;height:32px}.SYMBOL_SHIELD_size{width:22px;height:32px}.SYMBOL_SHIELD_offset{background-position:-1929px -660px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:22px;height:32px}.SYMBOL_SHIELD{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1929px -660px/2046px 1955px no-repeat;width:22px;height:32px}.SYMBOL_WHIRLPOOL_size{width:24px;height:32px}.SYMBOL_WHIRLPOOL_offset{background-position:-1983px -626px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:24px;height:32px}.SYMBOL_WHIRLPOOL{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1983px -626px/2046px 1955px no-repeat;width:24px;height:32px}.SYMBOL_YELLOW_size{width:24px;height:32px}.SYMBOL_YELLOW_offset{background-position:-2010px -626px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:24px;height:32px}.SYMBOL_YELLOW{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -2010px -626px/2046px 1955px no-repeat;width:24px;height:32px}.WHIRLPOOL00_size{width:640px;height:640px}.WHIRLPOOL00_offset{background-position:0 0;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL00{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) 0 0/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL01_size{width:640px;height:640px}.WHIRLPOOL01_offset{background-position:-643px 0;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL01{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -643px 0/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL02_size{width:640px;height:640px}.WHIRLPOOL02_offset{background-position:-1286px 0;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL02{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1286px 0/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL03_size{width:640px;height:640px}.WHIRLPOOL03_offset{background-position:0 -643px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL03{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) 0 -643px/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL04_size{width:640px;height:640px}.WHIRLPOOL04_offset{background-position:-643px -643px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL04{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -643px -643px/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL05_size{width:640px;height:640px}.WHIRLPOOL05_offset{background-position:-1286px -643px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL05{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1286px -643px/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL06_size{width:640px;height:640px}.WHIRLPOOL06_offset{background-position:0 -1286px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL06{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) 0 -1286px/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL07_size{width:640px;height:640px}.WHIRLPOOL07_offset{background-position:-643px -1286px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL07{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -643px -1286px/2046px 1955px no-repeat;width:640px;height:640px}.WHIRLPOOL08_size{width:640px;height:640px}.WHIRLPOOL08_offset{background-position:-1286px -1286px;-webkit-background-size:2046px 1955px;background-size:2046px 1955px;width:640px;height:640px}.WHIRLPOOL08{background:url(/logos/2024/halloween24/rc3/momo-sprite.png) -1286px -1286px/2046px 1955px no-repeat;width:640px;height:640px}.MOMO_SPRITE_0{background-image:url(/logos/2024/halloween24/rc3/momo-sprite-0.png);background-repeat:no-repeat}.SPELL_BLUE_FINAL00_size{width:186px;height:165px}.SPELL_BLUE_FINAL00_offset{background-position:-193px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_BLUE_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -193px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_BLUE_FINAL01_size{width:186px;height:165px}.SPELL_BLUE_FINAL01_offset{background-position:-193px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_BLUE_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -193px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_BLUE_FINAL02_size{width:186px;height:165px}.SPELL_BLUE_FINAL02_offset{background-position:-382px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_BLUE_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -382px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_BLUE_FINAL03_size{width:186px;height:165px}.SPELL_BLUE_FINAL03_offset{background-position:-571px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_BLUE_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -571px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_BLUE_FINAL04_size{width:186px;height:165px}.SPELL_BLUE_FINAL04_offset{background-position:-760px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_BLUE_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -760px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_BLUE_FINAL05_size{width:186px;height:165px}.SPELL_BLUE_FINAL05_offset{background-position:-949px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_BLUE_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -949px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_BLUE_FINAL06_size{width:186px;height:165px}.SPELL_BLUE_FINAL06_offset{background-position:-949px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_BLUE_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -949px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL00_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL00_offset{background-position:-1138px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1138px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL01_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL01_offset{background-position:-1138px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1138px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL02_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL02_offset{background-position:-1327px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1327px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL03_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL03_offset{background-position:-1516px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1516px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL04_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL04_offset{background-position:-1705px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1705px -172px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL05_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL05_offset{background-position:-193px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -193px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL06_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL06_offset{background-position:-382px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -382px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CIRCLE_FINAL07_size{width:186px;height:165px}.SPELL_CIRCLE_FINAL07_offset{background-position:-571px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CIRCLE_FINAL07{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -571px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CONJURING_FINAL00_size{width:186px;height:165px}.SPELL_CONJURING_FINAL00_offset{background-position:-760px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CONJURING_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -760px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CONJURING_FINAL01_size{width:186px;height:165px}.SPELL_CONJURING_FINAL01_offset{background-position:-949px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CONJURING_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -949px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CONJURING_FINAL02_size{width:186px;height:165px}.SPELL_CONJURING_FINAL02_offset{background-position:-1138px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CONJURING_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1138px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CONJURING_FINAL03_size{width:186px;height:165px}.SPELL_CONJURING_FINAL03_offset{background-position:-1327px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CONJURING_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1327px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CONJURING_FINAL04_size{width:186px;height:165px}.SPELL_CONJURING_FINAL04_offset{background-position:-1516px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CONJURING_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1516px -340px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_CONJURING_FINAL05_size{width:186px;height:165px}.SPELL_CONJURING_FINAL05_offset{background-position:-1705px -340px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_CONJURING_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1705px -340px/2040px 2036px no-repeat;width:186px;height:165px}.MOMO_ENTRANCE00_size{width:164px;height:216px}.MOMO_ENTRANCE00_offset{background-position:-756px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE01_size{width:164px;height:216px}.MOMO_ENTRANCE01_offset{background-position:-923px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -923px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE02_size{width:164px;height:216px}.MOMO_ENTRANCE02_offset{background-position:-1090px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1090px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE03_size{width:164px;height:216px}.MOMO_ENTRANCE03_offset{background-position:-756px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE04_size{width:164px;height:216px}.MOMO_ENTRANCE04_offset{background-position:-923px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -923px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE05_size{width:164px;height:216px}.MOMO_ENTRANCE05_offset{background-position:-1090px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1090px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE06_size{width:164px;height:216px}.MOMO_ENTRANCE06_offset{background-position:-756px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE07_size{width:164px;height:216px}.MOMO_ENTRANCE07_offset{background-position:-923px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE07{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -923px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE08_size{width:164px;height:216px}.MOMO_ENTRANCE08_offset{background-position:-1090px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE08{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1090px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE09_size{width:164px;height:216px}.MOMO_ENTRANCE09_offset{background-position:-1257px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE09{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1257px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE10_size{width:164px;height:216px}.MOMO_ENTRANCE10_offset{background-position:-1424px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE10{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1424px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE11_size{width:164px;height:216px}.MOMO_ENTRANCE11_offset{background-position:-1591px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE11{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1591px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE12_size{width:164px;height:216px}.MOMO_ENTRANCE12_offset{background-position:-1758px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE12{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1758px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE13_size{width:164px;height:216px}.MOMO_ENTRANCE13_offset{background-position:0 -1688px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_ENTRANCE13{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -1688px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_EXIT09_size{width:164px;height:216px}.MOMO_EXIT09_offset{background-position:-923px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_EXIT09{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -923px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.MOMO_EXIT10_size{width:164px;height:216px}.MOMO_EXIT10_offset{background-position:-1090px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:164px;height:216px}.MOMO_EXIT10{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1090px -1684px/2040px 2036px no-repeat;width:164px;height:216px}.SPELL_FAILURE_FINAL00_size{width:186px;height:165px}.SPELL_FAILURE_FINAL00_offset{background-position:0 -344px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -344px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL01_size{width:186px;height:165px}.SPELL_FAILURE_FINAL01_offset{background-position:-189px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL02_size{width:186px;height:165px}.SPELL_FAILURE_FINAL02_offset{background-position:-378px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL03_size{width:186px;height:165px}.SPELL_FAILURE_FINAL03_offset{background-position:-567px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL04_size{width:186px;height:165px}.SPELL_FAILURE_FINAL04_offset{background-position:-756px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL05_size{width:186px;height:165px}.SPELL_FAILURE_FINAL05_offset{background-position:-945px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL06_size{width:186px;height:165px}.SPELL_FAILURE_FINAL06_offset{background-position:-1134px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL07_size{width:186px;height:165px}.SPELL_FAILURE_FINAL07_offset{background-position:-1323px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL07{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1323px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL08_size{width:186px;height:165px}.SPELL_FAILURE_FINAL08_offset{background-position:-1512px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL08{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL09_size{width:186px;height:165px}.SPELL_FAILURE_FINAL09_offset{background-position:-1512px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL09{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_FAILURE_FINAL10_size{width:186px;height:165px}.SPELL_FAILURE_FINAL10_offset{background-position:-1512px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_FAILURE_FINAL10{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -508px/2040px 2036px no-repeat;width:186px;height:165px}.MOMOBROOM_GAMEOVER00_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER00_offset{background-position:0 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER01_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER01_offset{background-position:0 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER02_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER02_offset{background-position:0 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER03_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER03_offset{background-position:-193px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -193px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER04_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER04_offset{background-position:-386px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -386px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER05_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER05_offset{background-position:-579px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -579px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER06_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER06_offset{background-position:-772px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -772px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER07_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER07_offset{background-position:-965px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER07{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -965px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER08_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER08_offset{background-position:-1158px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER08{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1158px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER09_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER09_offset{background-position:-1351px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER09{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1351px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER10_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER10_offset{background-position:-1544px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER10{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1544px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER11_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER11_offset{background-position:-1737px 0;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER11{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1737px 0/2040px 2036px no-repeat;width:190px;height:169px}.MOMOBROOM_GAMEOVER12_size{width:190px;height:169px}.MOMOBROOM_GAMEOVER12_offset{background-position:0 -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:190px;height:169px}.MOMOBROOM_GAMEOVER12{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -172px/2040px 2036px no-repeat;width:190px;height:169px}.SPELL_GREEN_FINAL00_size{width:186px;height:165px}.SPELL_GREEN_FINAL00_offset{background-position:-1701px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_GREEN_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_GREEN_FINAL01_size{width:186px;height:165px}.SPELL_GREEN_FINAL01_offset{background-position:-1701px -508px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_GREEN_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -508px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_GREEN_FINAL02_size{width:186px;height:165px}.SPELL_GREEN_FINAL02_offset{background-position:0 -512px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_GREEN_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -512px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_GREEN_FINAL03_size{width:186px;height:165px}.SPELL_GREEN_FINAL03_offset{background-position:-189px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_GREEN_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_GREEN_FINAL04_size{width:186px;height:165px}.SPELL_GREEN_FINAL04_offset{background-position:-378px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_GREEN_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_GREEN_FINAL05_size{width:186px;height:165px}.SPELL_GREEN_FINAL05_offset{background-position:-567px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_GREEN_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_GREEN_FINAL06_size{width:186px;height:165px}.SPELL_GREEN_FINAL06_offset{background-position:-756px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_GREEN_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_HEART_FINAL00_size{width:186px;height:165px}.SPELL_HEART_FINAL00_offset{background-position:-945px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_HEART_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_HEART_FINAL01_size{width:186px;height:165px}.SPELL_HEART_FINAL01_offset{background-position:-945px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_HEART_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_HEART_FINAL02_size{width:186px;height:165px}.SPELL_HEART_FINAL02_offset{background-position:-1134px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_HEART_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_HEART_FINAL03_size{width:186px;height:165px}.SPELL_HEART_FINAL03_offset{background-position:-1323px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_HEART_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1323px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_HEART_FINAL04_size{width:186px;height:165px}.SPELL_HEART_FINAL04_offset{background-position:-1512px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_HEART_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_HEART_FINAL05_size{width:186px;height:165px}.SPELL_HEART_FINAL05_offset{background-position:-1701px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_HEART_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -676px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_HEART_FINAL06_size{width:186px;height:165px}.SPELL_HEART_FINAL06_offset{background-position:-1701px -676px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_HEART_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -676px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_OUCH_FINAL00_size{width:186px;height:165px}.CAT_OUCH_FINAL00_offset{background-position:0 -680px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_OUCH_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -680px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_OUCH_FINAL01_size{width:186px;height:165px}.CAT_OUCH_FINAL01_offset{background-position:-189px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_OUCH_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_OUCH_FINAL02_size{width:186px;height:165px}.CAT_OUCH_FINAL02_offset{background-position:-378px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_OUCH_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_OUCH_FINAL03_size{width:186px;height:165px}.CAT_OUCH_FINAL03_offset{background-position:-567px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_OUCH_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL00_size{width:186px;height:165px}.CAT_IDLE_FINAL00_offset{background-position:-756px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL01_size{width:186px;height:165px}.CAT_IDLE_FINAL01_offset{background-position:-756px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL02_size{width:186px;height:165px}.CAT_IDLE_FINAL02_offset{background-position:-756px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL03_size{width:186px;height:165px}.CAT_IDLE_FINAL03_offset{background-position:-945px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL04_size{width:186px;height:165px}.CAT_IDLE_FINAL04_offset{background-position:-1134px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL05_size{width:186px;height:165px}.CAT_IDLE_FINAL05_offset{background-position:-1323px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1323px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL06_size{width:186px;height:165px}.CAT_IDLE_FINAL06_offset{background-position:-1512px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL07_size{width:186px;height:165px}.CAT_IDLE_FINAL07_offset{background-position:-1701px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL07{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL08_size{width:186px;height:165px}.CAT_IDLE_FINAL08_offset{background-position:-1701px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL08{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL09_size{width:186px;height:165px}.CAT_IDLE_FINAL09_offset{background-position:-1701px -844px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL09{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -844px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL10_size{width:186px;height:165px}.CAT_IDLE_FINAL10_offset{background-position:0 -848px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL10{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -848px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL11_size{width:186px;height:165px}.CAT_IDLE_FINAL11_offset{background-position:-189px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL11{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL12_size{width:186px;height:165px}.CAT_IDLE_FINAL12_offset{background-position:-378px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL12{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL13_size{width:186px;height:165px}.CAT_IDLE_FINAL13_offset{background-position:-567px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL13{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL14_size{width:186px;height:165px}.CAT_IDLE_FINAL14_offset{background-position:-756px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL14{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL15_size{width:186px;height:165px}.CAT_IDLE_FINAL15_offset{background-position:-756px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL15{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL16_size{width:186px;height:165px}.CAT_IDLE_FINAL16_offset{background-position:-945px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL16{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL17_size{width:186px;height:165px}.CAT_IDLE_FINAL17_offset{background-position:-1134px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL17{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL18_size{width:186px;height:165px}.CAT_IDLE_FINAL18_offset{background-position:-1323px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL18{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1323px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL19_size{width:186px;height:165px}.CAT_IDLE_FINAL19_offset{background-position:-1512px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL19{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL20_size{width:186px;height:165px}.CAT_IDLE_FINAL20_offset{background-position:-1701px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL20{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL21_size{width:186px;height:165px}.CAT_IDLE_FINAL21_offset{background-position:-1701px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL21{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL22_size{width:186px;height:165px}.CAT_IDLE_FINAL22_offset{background-position:-1701px -1012px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL22{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -1012px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL23_size{width:186px;height:165px}.CAT_IDLE_FINAL23_offset{background-position:0 -1016px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL23{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -1016px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL24_size{width:186px;height:165px}.CAT_IDLE_FINAL24_offset{background-position:-189px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL24{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL25_size{width:186px;height:165px}.CAT_IDLE_FINAL25_offset{background-position:-378px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL25{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL26_size{width:186px;height:165px}.CAT_IDLE_FINAL26_offset{background-position:-567px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL26{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL27_size{width:186px;height:165px}.CAT_IDLE_FINAL27_offset{background-position:-756px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL27{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_IDLE_FINAL28_size{width:186px;height:165px}.CAT_IDLE_FINAL28_offset{background-position:-756px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.CAT_IDLE_FINAL28{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_LIGHTNING_FINAL00_size{width:186px;height:165px}.SPELL_LIGHTNING_FINAL00_offset{background-position:-945px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_LIGHTNING_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_LIGHTNING_FINAL01_size{width:186px;height:165px}.SPELL_LIGHTNING_FINAL01_offset{background-position:-945px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_LIGHTNING_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_LIGHTNING_FINAL02_size{width:186px;height:165px}.SPELL_LIGHTNING_FINAL02_offset{background-position:-1134px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_LIGHTNING_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_LIGHTNING_FINAL03_size{width:186px;height:165px}.SPELL_LIGHTNING_FINAL03_offset{background-position:-1323px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_LIGHTNING_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1323px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_LIGHTNING_FINAL04_size{width:186px;height:165px}.SPELL_LIGHTNING_FINAL04_offset{background-position:-1512px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_LIGHTNING_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_LIGHTNING_FINAL05_size{width:186px;height:165px}.SPELL_LIGHTNING_FINAL05_offset{background-position:-1701px -1180px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_LIGHTNING_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -1180px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_LIGHTNING_FINAL06_size{width:186px;height:165px}.SPELL_LIGHTNING_FINAL06_offset{background-position:0 -1184px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_LIGHTNING_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -1184px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_RED_FINAL00_size{width:186px;height:165px}.SPELL_RED_FINAL00_offset{background-position:-189px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_RED_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_RED_FINAL01_size{width:186px;height:165px}.SPELL_RED_FINAL01_offset{background-position:-189px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_RED_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_RED_FINAL02_size{width:186px;height:165px}.SPELL_RED_FINAL02_offset{background-position:-378px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_RED_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_RED_FINAL03_size{width:186px;height:165px}.SPELL_RED_FINAL03_offset{background-position:-567px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_RED_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_RED_FINAL04_size{width:186px;height:165px}.SPELL_RED_FINAL04_offset{background-position:-756px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_RED_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_RED_FINAL05_size{width:186px;height:165px}.SPELL_RED_FINAL05_offset{background-position:-945px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_RED_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_RED_FINAL06_size{width:186px;height:165px}.SPELL_RED_FINAL06_offset{background-position:-945px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_RED_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_TRIANGLE_FINAL00_size{width:186px;height:165px}.SPELL_TRIANGLE_FINAL00_offset{background-position:-1134px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_TRIANGLE_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_TRIANGLE_FINAL01_size{width:186px;height:165px}.SPELL_TRIANGLE_FINAL01_offset{background-position:-1134px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_TRIANGLE_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_TRIANGLE_FINAL02_size{width:186px;height:165px}.SPELL_TRIANGLE_FINAL02_offset{background-position:-1323px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_TRIANGLE_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1323px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_TRIANGLE_FINAL03_size{width:186px;height:165px}.SPELL_TRIANGLE_FINAL03_offset{background-position:-1512px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_TRIANGLE_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_TRIANGLE_FINAL04_size{width:186px;height:165px}.SPELL_TRIANGLE_FINAL04_offset{background-position:-1701px -1348px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_TRIANGLE_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -1348px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_TRIANGLE_FINAL05_size{width:186px;height:165px}.SPELL_TRIANGLE_FINAL05_offset{background-position:0 -1352px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_TRIANGLE_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -1352px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_TRIANGLE_FINAL06_size{width:186px;height:165px}.SPELL_TRIANGLE_FINAL06_offset{background-position:-189px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_TRIANGLE_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL00_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL00_offset{background-position:-378px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL01_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL01_offset{background-position:-378px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL02_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL02_offset{background-position:-567px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL03_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL03_offset{background-position:-756px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -756px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL04_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL04_offset{background-position:-945px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -945px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL05_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL05_offset{background-position:-1134px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1134px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL06_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL06_offset{background-position:-1323px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1323px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL07_size{width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL07_offset{background-position:-1512px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_WHIRLPOOL_FINAL07{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1512px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.CAT_WIN_FINAL00_size{width:146px;height:184px}.CAT_WIN_FINAL00_offset{background-position:-1894px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1894px -172px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL01_size{width:146px;height:184px}.CAT_WIN_FINAL01_offset{background-position:-1894px -172px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1894px -172px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL02_size{width:146px;height:184px}.CAT_WIN_FINAL02_offset{background-position:-1894px -359px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1894px -359px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL03_size{width:146px;height:184px}.CAT_WIN_FINAL03_offset{background-position:-1890px -546px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1890px -546px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL04_size{width:146px;height:184px}.CAT_WIN_FINAL04_offset{background-position:-1890px -733px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1890px -733px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL05_size{width:146px;height:184px}.CAT_WIN_FINAL05_offset{background-position:-1890px -920px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1890px -920px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL06_size{width:146px;height:184px}.CAT_WIN_FINAL06_offset{background-position:-1890px -1107px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1890px -1107px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL07_size{width:146px;height:184px}.CAT_WIN_FINAL07_offset{background-position:-1890px -1294px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL07{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1890px -1294px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL08_size{width:146px;height:184px}.CAT_WIN_FINAL08_offset{background-position:-1890px -1481px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL08{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1890px -1481px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL09_size{width:146px;height:184px}.CAT_WIN_FINAL09_offset{background-position:-167px -1852px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL09{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -167px -1852px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL10_size{width:146px;height:184px}.CAT_WIN_FINAL10_offset{background-position:-316px -1852px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL10{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -316px -1852px/2040px 2036px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL11_size{width:146px;height:184px}.CAT_WIN_FINAL11_offset{background-position:-465px -1852px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:146px;height:184px}.CAT_WIN_FINAL11{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -465px -1852px/2040px 2036px no-repeat;width:146px;height:184px}.SPELL_YELLOW_FINAL00_size{width:186px;height:165px}.SPELL_YELLOW_FINAL00_offset{background-position:-1701px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_YELLOW_FINAL00{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_YELLOW_FINAL01_size{width:186px;height:165px}.SPELL_YELLOW_FINAL01_offset{background-position:-1701px -1516px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_YELLOW_FINAL01{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -1701px -1516px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_YELLOW_FINAL02_size{width:186px;height:165px}.SPELL_YELLOW_FINAL02_offset{background-position:0 -1520px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_YELLOW_FINAL02{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) 0 -1520px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_YELLOW_FINAL03_size{width:186px;height:165px}.SPELL_YELLOW_FINAL03_offset{background-position:-189px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_YELLOW_FINAL03{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -189px -1684px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_YELLOW_FINAL04_size{width:186px;height:165px}.SPELL_YELLOW_FINAL04_offset{background-position:-378px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_YELLOW_FINAL04{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -378px -1684px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_YELLOW_FINAL05_size{width:186px;height:165px}.SPELL_YELLOW_FINAL05_offset{background-position:-567px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_YELLOW_FINAL05{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -1684px/2040px 2036px no-repeat;width:186px;height:165px}.SPELL_YELLOW_FINAL06_size{width:186px;height:165px}.SPELL_YELLOW_FINAL06_offset{background-position:-567px -1684px;-webkit-background-size:2040px 2036px;background-size:2040px 2036px;width:186px;height:165px}.SPELL_YELLOW_FINAL06{background:url(/logos/2024/halloween24/rc3/momo-sprite-0.png) -567px -1684px/2040px 2036px no-repeat;width:186px;height:165px}.MOMO_SPRITE_1{background-image:url(/logos/2024/halloween24/rc3/momo-sprite-1.png);background-repeat:no-repeat}.MOMO_ENTRANCE14_size{width:164px;height:216px}.MOMO_ENTRANCE14_offset{background-position:0 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_ENTRANCE14{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) 0 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE15_size{width:164px;height:216px}.MOMO_ENTRANCE15_offset{background-position:-167px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_ENTRANCE15{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -167px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_ENTRANCE16_size{width:164px;height:216px}.MOMO_ENTRANCE16_offset{background-position:-334px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_ENTRANCE16{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -334px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT01_size{width:164px;height:216px}.MOMO_EXIT01_offset{background-position:-501px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT01{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -501px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT02_size{width:164px;height:216px}.MOMO_EXIT02_offset{background-position:-668px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT02{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -668px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT03_size{width:164px;height:216px}.MOMO_EXIT03_offset{background-position:-835px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT03{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -835px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT04_size{width:164px;height:216px}.MOMO_EXIT04_offset{background-position:-1002px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT04{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -1002px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT05_size{width:164px;height:216px}.MOMO_EXIT05_offset{background-position:-1169px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT05{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -1169px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT06_size{width:164px;height:216px}.MOMO_EXIT06_offset{background-position:-1336px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT06{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -1336px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT07_size{width:164px;height:216px}.MOMO_EXIT07_offset{background-position:-1503px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT07{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -1503px 0/1983px 403px no-repeat;width:164px;height:216px}.MOMO_EXIT08_size{width:164px;height:216px}.MOMO_EXIT08_offset{background-position:-1670px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:164px;height:216px}.MOMO_EXIT08{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -1670px 0/1983px 403px no-repeat;width:164px;height:216px}.CAT_WIN_FINAL12_size{width:146px;height:184px}.CAT_WIN_FINAL12_offset{background-position:-1837px 0;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL12{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -1837px 0/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL13_size{width:146px;height:184px}.CAT_WIN_FINAL13_offset{background-position:-1837px -187px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL13{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -1837px -187px/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL14_size{width:146px;height:184px}.CAT_WIN_FINAL14_offset{background-position:0 -219px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL14{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) 0 -219px/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL15_size{width:146px;height:184px}.CAT_WIN_FINAL15_offset{background-position:-149px -219px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL15{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -149px -219px/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL16_size{width:146px;height:184px}.CAT_WIN_FINAL16_offset{background-position:-298px -219px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL16{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -298px -219px/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL17_size{width:146px;height:184px}.CAT_WIN_FINAL17_offset{background-position:-447px -219px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL17{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -447px -219px/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL18_size{width:146px;height:184px}.CAT_WIN_FINAL18_offset{background-position:-596px -219px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL18{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -596px -219px/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL19_size{width:146px;height:184px}.CAT_WIN_FINAL19_offset{background-position:-596px -219px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL19{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -596px -219px/1983px 403px no-repeat;width:146px;height:184px}.CAT_WIN_FINAL20_size{width:146px;height:184px}.CAT_WIN_FINAL20_offset{background-position:-596px -219px;-webkit-background-size:1983px 403px;background-size:1983px 403px;width:146px;height:184px}.CAT_WIN_FINAL20{background:url(/logos/2024/halloween24/rc3/momo-sprite-1.png) -596px -219px/1983px 403px no-repeat;width:146px;height:184px}.UI_SPRITE{background-image:url(/logos/2024/halloween24/rc3/ui-sprite.png);background-repeat:no-repeat}.L4_FIRST_FRAME_size{width:640px;height:360px}.L4_FIRST_FRAME_offset{background-position:0 0;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:640px;height:360px}.L4_FIRST_FRAME{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) 0 0/2047px 1014px no-repeat;width:640px;height:360px}.BANNER_CAT_HEAD_size{width:189px;height:124px}.BANNER_CAT_HEAD_offset{background-position:-1380px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:189px;height:124px}.BANNER_CAT_HEAD{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1380px -727px/2047px 1014px no-repeat;width:189px;height:124px}.BUTTONS_BG_size{width:273px;height:288px}.BUTTONS_BG_offset{background-position:0 -726px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:273px;height:288px}.BUTTONS_BG{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) 0 -726px/2047px 1014px no-repeat;width:273px;height:288px}.GAME_OVER_BG_size{width:640px;height:360px}.GAME_OVER_BG_offset{background-position:-643px 0;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:640px;height:360px}.GAME_OVER_BG{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -643px 0/2047px 1014px no-repeat;width:640px;height:360px}.GAME_WIN_BG_size{width:640px;height:360px}.GAME_WIN_BG_offset{background-position:-1286px 0;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:640px;height:360px}.GAME_WIN_BG{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1286px 0/2047px 1014px no-repeat;width:640px;height:360px}.PLAY_PREV_size{width:74px;height:89px}.PLAY_PREV_offset{background-position:-1929px -83px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:74px;height:89px}.PLAY_PREV{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1929px -83px/2047px 1014px no-repeat;width:74px;height:89px}.PLAY_PREV_HOVER_size{width:74px;height:89px}.PLAY_PREV_HOVER_offset{background-position:-1929px -175px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:74px;height:89px}.PLAY_PREV_HOVER{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1929px -175px/2047px 1014px no-repeat;width:74px;height:89px}.GHOSTBANNER1_size{width:320px;height:46px}.GHOSTBANNER1_offset{background-position:-1286px -678px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:320px;height:46px}.GHOSTBANNER1{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1286px -678px/2047px 1014px no-repeat;width:320px;height:46px}.GHOSTBANNER2_size{width:320px;height:46px}.GHOSTBANNER2_offset{background-position:-1609px -678px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:320px;height:46px}.GHOSTBANNER2{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1609px -678px/2047px 1014px no-repeat;width:320px;height:46px}.HEART_LOSS0000_size{width:41px;height:38px}.HEART_LOSS0000_offset{background-position:-2006px -83px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0000{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -83px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0001_size{width:41px;height:38px}.HEART_LOSS0001_offset{background-position:-2006px -124px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0001{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -124px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0002_size{width:41px;height:38px}.HEART_LOSS0002_offset{background-position:-2006px -165px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0002{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -165px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0003_size{width:41px;height:38px}.HEART_LOSS0003_offset{background-position:-2006px -206px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0003{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -206px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0004_size{width:41px;height:38px}.HEART_LOSS0004_offset{background-position:-2006px -247px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0004{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -247px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0005_size{width:41px;height:38px}.HEART_LOSS0005_offset{background-position:-2003px -288px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0005{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2003px -288px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0006_size{width:41px;height:38px}.HEART_LOSS0006_offset{background-position:-2006px -629px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0006{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -629px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0007_size{width:41px;height:38px}.HEART_LOSS0007_offset{background-position:-2006px -670px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0007{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -670px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0008_size{width:41px;height:38px}.HEART_LOSS0008_offset{background-position:-2006px -711px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0008{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -711px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_LOSS0009_size{width:41px;height:38px}.HEART_LOSS0009_offset{background-position:-1617px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_LOSS0009{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1617px -727px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0001_size{width:41px;height:38px}.HEART_REFILL0001_offset{background-position:-1661px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0001{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1661px -727px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0002_size{width:41px;height:38px}.HEART_REFILL0002_offset{background-position:-1705px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0002{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1705px -727px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0003_size{width:41px;height:38px}.HEART_REFILL0003_offset{background-position:-1749px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0003{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1749px -727px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0004_size{width:41px;height:38px}.HEART_REFILL0004_offset{background-position:-1793px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0004{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1793px -727px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0005_size{width:41px;height:38px}.HEART_REFILL0005_offset{background-position:-1837px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0005{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1837px -727px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0006_size{width:41px;height:38px}.HEART_REFILL0006_offset{background-position:-1881px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0006{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1881px -727px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0007_size{width:41px;height:38px}.HEART_REFILL0007_offset{background-position:-2006px -752px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0007{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2006px -752px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0008_size{width:41px;height:38px}.HEART_REFILL0008_offset{background-position:-1617px -768px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0008{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1617px -768px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0009_size{width:41px;height:38px}.HEART_REFILL0009_offset{background-position:-1661px -768px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0009{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1661px -768px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0010_size{width:41px;height:38px}.HEART_REFILL0010_offset{background-position:-1705px -768px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0010{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1705px -768px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0011_size{width:41px;height:38px}.HEART_REFILL0011_offset{background-position:-1749px -768px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0011{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1749px -768px/2047px 1014px no-repeat;width:41px;height:38px}.HEART_REFILL0012_size{width:41px;height:38px}.HEART_REFILL0012_offset{background-position:-1793px -768px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:41px;height:38px}.HEART_REFILL0012{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1793px -768px/2047px 1014px no-repeat;width:41px;height:38px}.MUTE_size{width:30px;height:30px}.MUTE_offset{background-position:-2012px 0;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:30px;height:30px}.MUTE{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2012px 0/2047px 1014px no-repeat;width:30px;height:30px}.PAUSE_size{width:30px;height:30px}.PAUSE_offset{background-position:-2012px -33px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:30px;height:30px}.PAUSE{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2012px -33px/2047px 1014px no-repeat;width:30px;height:30px}.RESUME_size{width:30px;height:30px}.RESUME_offset{background-position:-2003px -329px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:30px;height:30px}.RESUME{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -2003px -329px/2047px 1014px no-repeat;width:30px;height:30px}.SKIP_size{width:30px;height:30px}.SKIP_offset{background-position:-1837px -768px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:30px;height:30px}.SKIP{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1837px -768px/2047px 1014px no-repeat;width:30px;height:30px}.UNMUTE_size{width:30px;height:30px}.UNMUTE_offset{background-position:-1870px -768px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:30px;height:30px}.UNMUTE{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1870px -768px/2047px 1014px no-repeat;width:30px;height:30px}.CHECK_size{width:45px;height:38px}.CHECK_offset{background-position:-1826px -629px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:45px;height:38px}.CHECK{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1826px -629px/2047px 1014px no-repeat;width:45px;height:38px}.CHECK_RED_size{width:45px;height:38px}.CHECK_RED_offset{background-position:-1874px -629px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:45px;height:38px}.CHECK_RED{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1874px -629px/2047px 1014px no-repeat;width:45px;height:38px}.CHECKMARKS_size{width:42px;height:279px}.CHECKMARKS_offset{background-position:-1572px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:42px;height:279px}.CHECKMARKS{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1572px -727px/2047px 1014px no-repeat;width:42px;height:279px}.MAP_size{width:537px;height:312px}.MAP_offset{background-position:-1286px -363px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:537px;height:312px}.MAP{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1286px -363px/2047px 1014px no-repeat;width:537px;height:312px}.PROGRESS_L1_size{width:273px;height:271px}.PROGRESS_L1_offset{background-position:-276px -726px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:273px;height:271px}.PROGRESS_L1{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -276px -726px/2047px 1014px no-repeat;width:273px;height:271px}.PROGRESS_L2_size{width:273px;height:271px}.PROGRESS_L2_offset{background-position:-552px -726px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:273px;height:271px}.PROGRESS_L2{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -552px -726px/2047px 1014px no-repeat;width:273px;height:271px}.PROGRESS_L3_size{width:273px;height:271px}.PROGRESS_L3_offset{background-position:-828px -726px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:273px;height:271px}.PROGRESS_L3{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -828px -726px/2047px 1014px no-repeat;width:273px;height:271px}.PROGRESS_L4_size{width:273px;height:271px}.PROGRESS_L4_offset{background-position:-1104px -727px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:273px;height:271px}.PROGRESS_L4{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1104px -727px/2047px 1014px no-repeat;width:273px;height:271px}.INTRO_FIRST_FRAME_size{width:640px;height:360px}.INTRO_FIRST_FRAME_offset{background-position:0 -363px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:640px;height:360px}.INTRO_FIRST_FRAME{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) 0 -363px/2047px 1014px no-repeat;width:640px;height:360px}.MEOWLOAD_size{width:80px;height:80px}.MEOWLOAD_offset{background-position:-1929px 0;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:80px;height:80px}.MEOWLOAD{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1929px 0/2047px 1014px no-repeat;width:80px;height:80px}.OUTRO_FIRST_FRAME_size{width:640px;height:360px}.OUTRO_FIRST_FRAME_offset{background-position:-643px -363px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:640px;height:360px}.OUTRO_FIRST_FRAME{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -643px -363px/2047px 1014px no-repeat;width:640px;height:360px}.HOME_size{width:71px;height:71px}.HOME_offset{background-position:-1929px -267px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:71px;height:71px}.HOME{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1929px -267px/2047px 1014px no-repeat;width:71px;height:71px}.HOME_HOVER_size{width:71px;height:71px}.HOME_HOVER_offset{background-position:-1826px -555px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:71px;height:71px}.HOME_HOVER{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1826px -555px/2047px 1014px no-repeat;width:71px;height:71px}.REPLAY_size{width:71px;height:71px}.REPLAY_offset{background-position:-1900px -555px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:71px;height:71px}.REPLAY{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1900px -555px/2047px 1014px no-repeat;width:71px;height:71px}.REPLAY_HOVER_size{width:71px;height:71px}.REPLAY_HOVER_offset{background-position:-1974px -555px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:71px;height:71px}.REPLAY_HOVER{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1974px -555px/2047px 1014px no-repeat;width:71px;height:71px}.SEARCH_size{width:71px;height:71px}.SEARCH_offset{background-position:-1932px -629px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:71px;height:71px}.SEARCH{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1932px -629px/2047px 1014px no-repeat;width:71px;height:71px}.SEARCH_HOVER_size{width:71px;height:71px}.SEARCH_HOVER_offset{background-position:-1932px -703px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:71px;height:71px}.SEARCH_HOVER{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1932px -703px/2047px 1014px no-repeat;width:71px;height:71px}.SHARE_size{width:207px;height:45px}.SHARE_offset{background-position:-1826px -363px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:207px;height:45px}.SHARE{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1826px -363px/2047px 1014px no-repeat;width:207px;height:45px}.SHARE_HOVER_size{width:207px;height:45px}.SHARE_HOVER_offset{background-position:-1826px -411px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:207px;height:45px}.SHARE_HOVER{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1826px -411px/2047px 1014px no-repeat;width:207px;height:45px}.SHARE_IOS_size{width:207px;height:45px}.SHARE_IOS_offset{background-position:-1826px -459px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:207px;height:45px}.SHARE_IOS{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1826px -459px/2047px 1014px no-repeat;width:207px;height:45px}.SHARE_IOS_HOVER_size{width:207px;height:45px}.SHARE_IOS_HOVER_offset{background-position:-1826px -507px;-webkit-background-size:2047px 1014px;background-size:2047px 1014px;width:207px;height:45px}.SHARE_IOS_HOVER{background:url(/logos/2024/halloween24/rc3/ui-sprite.png) -1826px -507px/2047px 1014px no-repeat;width:207px;height:45px}.LEVEL1_SPRITE{background-image:url(/logos/2024/halloween24/rc3/level1-sprite.png);background-repeat:no-repeat}.BAT_ATTACK00_size{width:256px;height:184px}.BAT_ATTACK00_offset{background-position:-1506px 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_ATTACK00{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px 0/2021px 1916px no-repeat;width:256px;height:184px}.BAT_ATTACK01_size{width:256px;height:184px}.BAT_ATTACK01_offset{background-position:-1765px 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_ATTACK01{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px 0/2021px 1916px no-repeat;width:256px;height:184px}.BAT_ATTACK02_size{width:256px;height:184px}.BAT_ATTACK02_offset{background-position:-1506px -187px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_ATTACK02{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -187px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_ATTACK03_size{width:256px;height:184px}.BAT_ATTACK03_offset{background-position:-1506px -187px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_ATTACK03{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -187px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_ATTACK04_size{width:256px;height:184px}.BAT_ATTACK04_offset{background-position:-1765px -187px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_ATTACK04{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -187px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED00_size{width:256px;height:184px}.BAT_DEFEATED00_offset{background-position:-1506px -374px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED00{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -374px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED01_size{width:256px;height:184px}.BAT_DEFEATED01_offset{background-position:-1765px -374px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED01{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -374px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED02_size{width:256px;height:184px}.BAT_DEFEATED02_offset{background-position:-1506px -561px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED02{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -561px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED03_size{width:256px;height:184px}.BAT_DEFEATED03_offset{background-position:-1765px -561px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED03{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -561px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED04_size{width:256px;height:184px}.BAT_DEFEATED04_offset{background-position:-1506px -748px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED04{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -748px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED05_size{width:256px;height:184px}.BAT_DEFEATED05_offset{background-position:-1765px -748px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED05{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -748px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED06_size{width:256px;height:184px}.BAT_DEFEATED06_offset{background-position:-1506px -935px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED06{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -935px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED07_size{width:256px;height:184px}.BAT_DEFEATED07_offset{background-position:-1506px -935px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED07{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -935px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED08_size{width:256px;height:184px}.BAT_DEFEATED08_offset{background-position:-1506px -935px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED08{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -935px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED09_size{width:256px;height:184px}.BAT_DEFEATED09_offset{background-position:-1765px -935px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED09{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -935px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED10_size{width:256px;height:184px}.BAT_DEFEATED10_offset{background-position:-1506px -1122px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED10{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -1122px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED11_size{width:256px;height:184px}.BAT_DEFEATED11_offset{background-position:-1765px -1122px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED11{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -1122px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED12_size{width:256px;height:184px}.BAT_DEFEATED12_offset{background-position:-1506px -1309px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED12{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -1309px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED13_size{width:256px;height:184px}.BAT_DEFEATED13_offset{background-position:-1765px -1309px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED13{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -1309px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED14_size{width:256px;height:184px}.BAT_DEFEATED14_offset{background-position:-1765px -1309px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED14{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -1309px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED15_size{width:256px;height:184px}.BAT_DEFEATED15_offset{background-position:-1506px -1496px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED15{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -1496px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED16_size{width:256px;height:184px}.BAT_DEFEATED16_offset{background-position:-1765px -1496px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED16{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -1496px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED17_size{width:256px;height:184px}.BAT_DEFEATED17_offset{background-position:-1506px -1683px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED17{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1506px -1683px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED18_size{width:256px;height:184px}.BAT_DEFEATED18_offset{background-position:-1765px -1683px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED18{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -1683px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED19_size{width:256px;height:184px}.BAT_DEFEATED19_offset{background-position:-1765px -1683px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED19{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -1683px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED20_size{width:256px;height:184px}.BAT_DEFEATED20_offset{background-position:-1765px -1683px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED20{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1765px -1683px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED21_size{width:256px;height:184px}.BAT_DEFEATED21_offset{background-position:0 -1732px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED21{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -1732px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED22_size{width:256px;height:184px}.BAT_DEFEATED22_offset{background-position:-259px -1732px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED22{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -259px -1732px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED23_size{width:256px;height:184px}.BAT_DEFEATED23_offset{background-position:-518px -1732px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED23{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -518px -1732px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_DEFEATED24_size{width:256px;height:184px}.BAT_DEFEATED24_offset{background-position:-518px -1732px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_DEFEATED24{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -518px -1732px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_FLY_size{width:256px;height:184px}.BAT_FLY_offset{background-position:-777px -1732px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_FLY{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -777px -1732px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_HANG00_size{width:256px;height:184px}.BAT_HANG00_offset{background-position:-1036px -1732px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:256px;height:184px}.BAT_HANG00{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -1036px -1732px/2021px 1916px no-repeat;width:256px;height:184px}.BAT_ENTRANCE00_size{width:750px;height:430px}.BAT_ENTRANCE00_offset{background-position:0 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE00{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 0/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE01_size{width:750px;height:430px}.BAT_ENTRANCE01_offset{background-position:0 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE01{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 0/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE02_size{width:750px;height:430px}.BAT_ENTRANCE02_offset{background-position:0 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE02{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 0/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE03_size{width:750px;height:430px}.BAT_ENTRANCE03_offset{background-position:0 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE03{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 0/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE04_size{width:750px;height:430px}.BAT_ENTRANCE04_offset{background-position:0 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE04{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 0/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE05_size{width:750px;height:430px}.BAT_ENTRANCE05_offset{background-position:-753px 0;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE05{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -753px 0/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE06_size{width:750px;height:430px}.BAT_ENTRANCE06_offset{background-position:0 -433px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE06{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -433px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE07_size{width:750px;height:430px}.BAT_ENTRANCE07_offset{background-position:-753px -433px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE07{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -753px -433px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE08_size{width:750px;height:430px}.BAT_ENTRANCE08_offset{background-position:-753px -433px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE08{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -753px -433px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE09_size{width:750px;height:430px}.BAT_ENTRANCE09_offset{background-position:0 -866px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE09{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -866px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE10_size{width:750px;height:430px}.BAT_ENTRANCE10_offset{background-position:-753px -866px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE10{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -753px -866px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE11_size{width:750px;height:430px}.BAT_ENTRANCE11_offset{background-position:0 -1299px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE11{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -1299px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE12_size{width:750px;height:430px}.BAT_ENTRANCE12_offset{background-position:0 -1299px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE12{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -1299px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE13_size{width:750px;height:430px}.BAT_ENTRANCE13_offset{background-position:0 -1299px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE13{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -1299px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE14_size{width:750px;height:430px}.BAT_ENTRANCE14_offset{background-position:0 -1299px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE14{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -1299px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE15_size{width:750px;height:430px}.BAT_ENTRANCE15_offset{background-position:0 -1299px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE15{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) 0 -1299px/2021px 1916px no-repeat;width:750px;height:430px}.BAT_ENTRANCE16_size{width:750px;height:430px}.BAT_ENTRANCE16_offset{background-position:-753px -1299px;-webkit-background-size:2021px 1916px;background-size:2021px 1916px;width:750px;height:430px}.BAT_ENTRANCE16{background:url(/logos/2024/halloween24/rc3/level1-sprite.png) -753px -1299px/2021px 1916px no-repeat;width:750px;height:430px}.LEVEL1_SPRITE_0{background-image:url(/logos/2024/halloween24/rc3/level1-sprite-0.png);background-repeat:no-repeat}.FG_1_size{width:224px;height:245px}.FG_1_offset{background-position:-1765px -1683px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:224px;height:245px}.FG_1{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1683px/2021px 1928px no-repeat;width:224px;height:245px}.BAT_HANG01_size{width:256px;height:184px}.BAT_HANG01_offset{background-position:-1506px 0;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_HANG01{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px 0/2021px 1928px no-repeat;width:256px;height:184px}.BAT_HANG02_size{width:256px;height:184px}.BAT_HANG02_offset{background-position:-1765px 0;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_HANG02{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px 0/2021px 1928px no-repeat;width:256px;height:184px}.BAT_HANG03_size{width:256px;height:184px}.BAT_HANG03_offset{background-position:-1506px -187px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_HANG03{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -187px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_ENTRANCE17_size{width:750px;height:430px}.BAT_ENTRANCE17_offset{background-position:0 0;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE17{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) 0 0/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE18_size{width:750px;height:430px}.BAT_ENTRANCE18_offset{background-position:-753px 0;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE18{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -753px 0/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE19_size{width:750px;height:430px}.BAT_ENTRANCE19_offset{background-position:0 -433px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE19{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) 0 -433px/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE20_size{width:750px;height:430px}.BAT_ENTRANCE20_offset{background-position:-753px -433px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE20{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -753px -433px/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE21_size{width:750px;height:430px}.BAT_ENTRANCE21_offset{background-position:-753px -433px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE21{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -753px -433px/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE22_size{width:750px;height:430px}.BAT_ENTRANCE22_offset{background-position:0 -866px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE22{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) 0 -866px/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE23_size{width:750px;height:430px}.BAT_ENTRANCE23_offset{background-position:-753px -866px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE23{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -753px -866px/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE24_size{width:750px;height:430px}.BAT_ENTRANCE24_offset{background-position:0 -1299px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE24{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) 0 -1299px/2021px 1928px no-repeat;width:750px;height:430px}.BAT_ENTRANCE25_size{width:750px;height:430px}.BAT_ENTRANCE25_offset{background-position:-753px -1299px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:750px;height:430px}.BAT_ENTRANCE25{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -753px -1299px/2021px 1928px no-repeat;width:750px;height:430px}.BAT_HIT00_size{width:256px;height:184px}.BAT_HIT00_offset{background-position:-1765px -187px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_HIT00{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -187px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_HIT01_size{width:256px;height:184px}.BAT_HIT01_offset{background-position:-1506px -374px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_HIT01{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -374px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_HIT02_size{width:256px;height:184px}.BAT_HIT02_offset{background-position:-1765px -374px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_HIT02{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -374px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_HIT03_size{width:256px;height:184px}.BAT_HIT03_offset{background-position:-1765px -374px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_HIT03{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -374px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE00_size{width:256px;height:184px}.BAT_IDLE00_offset{background-position:-1506px -561px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE00{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -561px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE01_size{width:256px;height:184px}.BAT_IDLE01_offset{background-position:-1765px -561px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE01{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -561px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE02_size{width:256px;height:184px}.BAT_IDLE02_offset{background-position:-1506px -748px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE02{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -748px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE03_size{width:256px;height:184px}.BAT_IDLE03_offset{background-position:-1765px -748px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE03{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -748px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE04_size{width:256px;height:184px}.BAT_IDLE04_offset{background-position:-1506px -935px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE04{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -935px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE05_size{width:256px;height:184px}.BAT_IDLE05_offset{background-position:-1765px -935px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE05{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -935px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE06_size{width:256px;height:184px}.BAT_IDLE06_offset{background-position:-1506px -1122px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE06{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1122px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_IDLE07_size{width:256px;height:184px}.BAT_IDLE07_offset{background-position:-1765px -1122px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_IDLE07{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1122px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN00_size{width:256px;height:184px}.BAT_WIN00_offset{background-position:-1506px -1309px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN00{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1309px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN01_size{width:256px;height:184px}.BAT_WIN01_offset{background-position:-1765px -1309px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN01{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1309px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN02_size{width:256px;height:184px}.BAT_WIN02_offset{background-position:-1506px -1309px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN02{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1309px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN03_size{width:256px;height:184px}.BAT_WIN03_offset{background-position:-1765px -1309px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN03{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1309px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN04_size{width:256px;height:184px}.BAT_WIN04_offset{background-position:-1506px -1309px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN04{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1309px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN05_size{width:256px;height:184px}.BAT_WIN05_offset{background-position:-1765px -1309px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN05{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1309px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN06_size{width:256px;height:184px}.BAT_WIN06_offset{background-position:-1506px -1496px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN06{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1496px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN07_size{width:256px;height:184px}.BAT_WIN07_offset{background-position:-1765px -1496px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN07{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1496px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN08_size{width:256px;height:184px}.BAT_WIN08_offset{background-position:-1506px -1683px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN08{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1683px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN09_size{width:256px;height:184px}.BAT_WIN09_offset{background-position:-1765px -1496px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN09{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1496px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN10_size{width:256px;height:184px}.BAT_WIN10_offset{background-position:-1506px -1683px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN10{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1683px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN11_size{width:256px;height:184px}.BAT_WIN11_offset{background-position:-1765px -1496px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN11{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1496px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN12_size{width:256px;height:184px}.BAT_WIN12_offset{background-position:-1506px -1683px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN12{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1506px -1683px/2021px 1928px no-repeat;width:256px;height:184px}.BAT_WIN13_size{width:256px;height:184px}.BAT_WIN13_offset{background-position:-1765px -1496px;-webkit-background-size:2021px 1928px;background-size:2021px 1928px;width:256px;height:184px}.BAT_WIN13{background:url(/logos/2024/halloween24/rc3/level1-sprite-0.png) -1765px -1496px/2021px 1928px no-repeat;width:256px;height:184px}.LEVEL1_SPRITE_1{background-image:url(/logos/2024/halloween24/rc3/level1-sprite-1.png);background-repeat:no-repeat}.BAT_ENTRANCE26_size{width:750px;height:430px}.BAT_ENTRANCE26_offset{background-position:0 0;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE26{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) 0 0/1503px 1729px no-repeat;width:750px;height:430px}.BAT_ENTRANCE27_size{width:750px;height:430px}.BAT_ENTRANCE27_offset{background-position:-753px 0;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE27{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) -753px 0/1503px 1729px no-repeat;width:750px;height:430px}.BAT_ENTRANCE28_size{width:750px;height:430px}.BAT_ENTRANCE28_offset{background-position:0 -433px;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE28{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) 0 -433px/1503px 1729px no-repeat;width:750px;height:430px}.BAT_ENTRANCE29_size{width:750px;height:430px}.BAT_ENTRANCE29_offset{background-position:-753px -433px;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE29{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) -753px -433px/1503px 1729px no-repeat;width:750px;height:430px}.BAT_ENTRANCE30_size{width:750px;height:430px}.BAT_ENTRANCE30_offset{background-position:0 -866px;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE30{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) 0 -866px/1503px 1729px no-repeat;width:750px;height:430px}.BAT_ENTRANCE31_size{width:750px;height:430px}.BAT_ENTRANCE31_offset{background-position:-753px -866px;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE31{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) -753px -866px/1503px 1729px no-repeat;width:750px;height:430px}.BAT_ENTRANCE32_size{width:750px;height:430px}.BAT_ENTRANCE32_offset{background-position:0 -1299px;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE32{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) 0 -1299px/1503px 1729px no-repeat;width:750px;height:430px}.BAT_ENTRANCE33_size{width:750px;height:430px}.BAT_ENTRANCE33_offset{background-position:-753px -1299px;-webkit-background-size:1503px 1729px;background-size:1503px 1729px;width:750px;height:430px}.BAT_ENTRANCE33{background:url(/logos/2024/halloween24/rc3/level1-sprite-1.png) -753px -1299px/1503px 1729px no-repeat;width:750px;height:430px}.LEVEL1_SPRITE_2{background-image:url(/logos/2024/halloween24/rc3/level1-sprite-2.png);background-repeat:no-repeat}.BG_1_size{width:640px;height:360px}.BG_1_offset{background-position:-753px 0;-webkit-background-size:1393px 430px;background-size:1393px 430px;width:640px;height:360px}.BG_1{background:url(/logos/2024/halloween24/rc3/level1-sprite-2.png) -753px 0/1393px 430px no-repeat;width:640px;height:360px}.BAT_ENTRANCE34_size{width:750px;height:430px}.BAT_ENTRANCE34_offset{background-position:0 0;-webkit-background-size:1393px 430px;background-size:1393px 430px;width:750px;height:430px}.BAT_ENTRANCE34{background:url(/logos/2024/halloween24/rc3/level1-sprite-2.png) 0 0/1393px 430px no-repeat;width:750px;height:430px}.LEVEL2_SPRITE{background-image:url(/logos/2024/halloween24/rc3/level2-sprite.png);background-repeat:no-repeat}.L2_FG00_size{width:640px;height:151px}.L2_FG00_offset{background-position:0 -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG00{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG01_size{width:640px;height:151px}.L2_FG01_offset{background-position:-643px -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG01{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -643px -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG02_size{width:640px;height:151px}.L2_FG02_offset{background-position:-1286px -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG02{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1286px -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG03_size{width:640px;height:151px}.L2_FG03_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG03{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG04_size{width:640px;height:151px}.L2_FG04_offset{background-position:-643px -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG04{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -643px -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG05_size{width:640px;height:151px}.L2_FG05_offset{background-position:-1286px -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG05{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1286px -1886px/2037px 2037px no-repeat;width:640px;height:151px}.SPIDER_ATTACK00_size{width:175px;height:175px}.SPIDER_ATTACK00_offset{background-position:-1506px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK00{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK01_size{width:175px;height:175px}.SPIDER_ATTACK01_offset{background-position:-1684px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK01{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK02_size{width:175px;height:175px}.SPIDER_ATTACK02_offset{background-position:-1862px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK02{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK03_size{width:175px;height:175px}.SPIDER_ATTACK03_offset{background-position:-1506px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK03{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK04_size{width:175px;height:175px}.SPIDER_ATTACK04_offset{background-position:-1684px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK04{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK05_size{width:175px;height:175px}.SPIDER_ATTACK05_offset{background-position:-1862px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK05{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK06_size{width:175px;height:175px}.SPIDER_ATTACK06_offset{background-position:-1506px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK06{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK07_size{width:175px;height:175px}.SPIDER_ATTACK07_offset{background-position:-1684px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK07{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK08_size{width:175px;height:175px}.SPIDER_ATTACK08_offset{background-position:-1684px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK08{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_ATTACK09_size{width:175px;height:175px}.SPIDER_ATTACK09_offset{background-position:-1684px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_ATTACK09{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT00_size{width:175px;height:175px}.SPIDER_DEFEAT00_offset{background-position:-1862px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT00{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT01_size{width:175px;height:175px}.SPIDER_DEFEAT01_offset{background-position:-1862px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT01{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT02_size{width:175px;height:175px}.SPIDER_DEFEAT02_offset{background-position:-1506px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT02{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT03_size{width:175px;height:175px}.SPIDER_DEFEAT03_offset{background-position:-1684px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT03{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT04_size{width:175px;height:175px}.SPIDER_DEFEAT04_offset{background-position:-1862px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT04{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT05_size{width:175px;height:175px}.SPIDER_DEFEAT05_offset{background-position:-1862px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT05{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT06_size{width:175px;height:175px}.SPIDER_DEFEAT06_offset{background-position:-1506px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT06{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT07_size{width:175px;height:175px}.SPIDER_DEFEAT07_offset{background-position:-1684px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT07{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT08_size{width:175px;height:175px}.SPIDER_DEFEAT08_offset{background-position:-1862px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT08{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT09_size{width:175px;height:175px}.SPIDER_DEFEAT09_offset{background-position:-1862px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT09{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT10_size{width:175px;height:175px}.SPIDER_DEFEAT10_offset{background-position:-1862px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT10{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT11_size{width:175px;height:175px}.SPIDER_DEFEAT11_offset{background-position:-1862px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT11{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT12_size{width:175px;height:175px}.SPIDER_DEFEAT12_offset{background-position:-1506px -890px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT12{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -890px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT13_size{width:175px;height:175px}.SPIDER_DEFEAT13_offset{background-position:-1684px -890px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT13{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -890px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT14_size{width:175px;height:175px}.SPIDER_DEFEAT14_offset{background-position:-1862px -890px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT14{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -890px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT15_size{width:175px;height:175px}.SPIDER_DEFEAT15_offset{background-position:-1506px -1068px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT15{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -1068px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT16_size{width:175px;height:175px}.SPIDER_DEFEAT16_offset{background-position:-1684px -1068px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT16{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -1068px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT17_size{width:175px;height:175px}.SPIDER_DEFEAT17_offset{background-position:-1862px -1068px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT17{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -1068px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT18_size{width:175px;height:175px}.SPIDER_DEFEAT18_offset{background-position:-1862px -1068px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT18{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -1068px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT19_size{width:175px;height:175px}.SPIDER_DEFEAT19_offset{background-position:-1506px -1246px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT19{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -1246px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT20_size{width:175px;height:175px}.SPIDER_DEFEAT20_offset{background-position:-1684px -1246px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT20{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -1246px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT21_size{width:175px;height:175px}.SPIDER_DEFEAT21_offset{background-position:-1862px -1246px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT21{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -1246px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT22_size{width:175px;height:175px}.SPIDER_DEFEAT22_offset{background-position:-1506px -1424px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT22{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1506px -1424px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT23_size{width:175px;height:175px}.SPIDER_DEFEAT23_offset{background-position:-1684px -1424px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT23{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1684px -1424px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT24_size{width:175px;height:175px}.SPIDER_DEFEAT24_offset{background-position:-1862px -1424px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT24{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -1862px -1424px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_INTRO00_size{width:750px;height:430px}.SPIDER_INTRO00_offset{background-position:0 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO00{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO01_size{width:750px;height:430px}.SPIDER_INTRO01_offset{background-position:0 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO01{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO02_size{width:750px;height:430px}.SPIDER_INTRO02_offset{background-position:0 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO02{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO03_size{width:750px;height:430px}.SPIDER_INTRO03_offset{background-position:-753px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO03{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -753px 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO04_size{width:750px;height:430px}.SPIDER_INTRO04_offset{background-position:0 -433px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO04{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 -433px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO05_size{width:750px;height:430px}.SPIDER_INTRO05_offset{background-position:-753px -433px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO05{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -753px -433px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO06_size{width:750px;height:430px}.SPIDER_INTRO06_offset{background-position:0 -866px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO06{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 -866px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO07_size{width:750px;height:430px}.SPIDER_INTRO07_offset{background-position:-753px -866px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO07{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -753px -866px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO08_size{width:750px;height:430px}.SPIDER_INTRO08_offset{background-position:0 -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO08{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) 0 -1299px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO09_size{width:750px;height:430px}.SPIDER_INTRO09_offset{background-position:-753px -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO09{background:url(/logos/2024/halloween24/rc3/level2-sprite.png) -753px -1299px/2037px 2037px no-repeat;width:750px;height:430px}.LEVEL2_SPRITE_0{background-image:url(/logos/2024/halloween24/rc3/level2-sprite-0.png);background-repeat:no-repeat}.L2_FG06_size{width:640px;height:151px}.L2_FG06_offset{background-position:0 -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG06{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG07_size{width:640px;height:151px}.L2_FG07_offset{background-position:-643px -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG07{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -643px -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG08_size{width:640px;height:151px}.L2_FG08_offset{background-position:-1286px -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG08{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1286px -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG09_size{width:640px;height:151px}.L2_FG09_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG09{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG10_size{width:640px;height:151px}.L2_FG10_offset{background-position:-643px -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG10{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -643px -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG11_size{width:640px;height:151px}.L2_FG11_offset{background-position:-1286px -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG11{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1286px -1886px/2037px 2037px no-repeat;width:640px;height:151px}.SPIDER_DEFEAT25_size{width:175px;height:175px}.SPIDER_DEFEAT25_offset{background-position:-1506px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT25{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT26_size{width:175px;height:175px}.SPIDER_DEFEAT26_offset{background-position:-1684px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT26{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT27_size{width:175px;height:175px}.SPIDER_DEFEAT27_offset{background-position:-1862px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT27{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT28_size{width:175px;height:175px}.SPIDER_DEFEAT28_offset{background-position:-1506px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT28{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT29_size{width:175px;height:175px}.SPIDER_DEFEAT29_offset{background-position:-1684px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT29{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT30_size{width:175px;height:175px}.SPIDER_DEFEAT30_offset{background-position:-1862px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT30{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT31_size{width:175px;height:175px}.SPIDER_DEFEAT31_offset{background-position:-1506px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT31{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT32_size{width:175px;height:175px}.SPIDER_DEFEAT32_offset{background-position:-1684px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT32{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT33_size{width:175px;height:175px}.SPIDER_DEFEAT33_offset{background-position:-1862px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT33{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT34_size{width:175px;height:175px}.SPIDER_DEFEAT34_offset{background-position:-1506px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT34{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT35_size{width:175px;height:175px}.SPIDER_DEFEAT35_offset{background-position:-1684px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT35{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT36_size{width:175px;height:175px}.SPIDER_DEFEAT36_offset{background-position:-1862px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT36{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT37_size{width:175px;height:175px}.SPIDER_DEFEAT37_offset{background-position:-1506px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT37{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT38_size{width:175px;height:175px}.SPIDER_DEFEAT38_offset{background-position:-1684px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT38{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT39_size{width:175px;height:175px}.SPIDER_DEFEAT39_offset{background-position:-1862px -712px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT39{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -712px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT40_size{width:175px;height:175px}.SPIDER_DEFEAT40_offset{background-position:-1506px -890px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT40{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -890px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT41_size{width:175px;height:175px}.SPIDER_DEFEAT41_offset{background-position:-1684px -890px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT41{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -890px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_DEFEAT42_size{width:175px;height:175px}.SPIDER_DEFEAT42_offset{background-position:-1862px -890px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_DEFEAT42{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -890px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_HIT00_size{width:175px;height:175px}.SPIDER_HIT00_offset{background-position:-1506px -1068px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_HIT00{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -1068px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_HIT01_size{width:175px;height:175px}.SPIDER_HIT01_offset{background-position:-1684px -1068px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_HIT01{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -1068px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_HIT02_size{width:175px;height:175px}.SPIDER_HIT02_offset{background-position:-1862px -1068px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_HIT02{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -1068px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_HIT03_size{width:175px;height:175px}.SPIDER_HIT03_offset{background-position:-1506px -1246px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_HIT03{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -1246px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_HIT04_size{width:175px;height:175px}.SPIDER_HIT04_offset{background-position:-1684px -1246px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_HIT04{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -1246px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_IDLE00_size{width:175px;height:175px}.SPIDER_IDLE00_offset{background-position:-1862px -1246px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE00{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -1246px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_IDLE01_size{width:175px;height:175px}.SPIDER_IDLE01_offset{background-position:-1506px -1424px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE01{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1506px -1424px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_IDLE02_size{width:175px;height:175px}.SPIDER_IDLE02_offset{background-position:-1684px -1424px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE02{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1684px -1424px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_IDLE03_size{width:175px;height:175px}.SPIDER_IDLE03_offset{background-position:-1862px -1424px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE03{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -1862px -1424px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_INTRO10_size{width:750px;height:430px}.SPIDER_INTRO10_offset{background-position:0 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO10{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO11_size{width:750px;height:430px}.SPIDER_INTRO11_offset{background-position:0 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO11{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO12_size{width:750px;height:430px}.SPIDER_INTRO12_offset{background-position:0 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO12{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO13_size{width:750px;height:430px}.SPIDER_INTRO13_offset{background-position:-753px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO13{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -753px 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO14_size{width:750px;height:430px}.SPIDER_INTRO14_offset{background-position:0 -433px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO14{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 -433px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO15_size{width:750px;height:430px}.SPIDER_INTRO15_offset{background-position:-753px -433px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO15{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -753px -433px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO16_size{width:750px;height:430px}.SPIDER_INTRO16_offset{background-position:0 -866px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO16{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 -866px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO17_size{width:750px;height:430px}.SPIDER_INTRO17_offset{background-position:0 -866px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO17{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 -866px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO18_size{width:750px;height:430px}.SPIDER_INTRO18_offset{background-position:-753px -866px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO18{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -753px -866px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO19_size{width:750px;height:430px}.SPIDER_INTRO19_offset{background-position:0 -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO19{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) 0 -1299px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO20_size{width:750px;height:430px}.SPIDER_INTRO20_offset{background-position:-753px -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO20{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -753px -1299px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO21_size{width:750px;height:430px}.SPIDER_INTRO21_offset{background-position:-753px -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO21{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -753px -1299px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO22_size{width:750px;height:430px}.SPIDER_INTRO22_offset{background-position:-753px -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO22{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -753px -1299px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO23_size{width:750px;height:430px}.SPIDER_INTRO23_offset{background-position:-753px -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO23{background:url(/logos/2024/halloween24/rc3/level2-sprite-0.png) -753px -1299px/2037px 2037px no-repeat;width:750px;height:430px}.LEVEL2_SPRITE_1{background-image:url(/logos/2024/halloween24/rc3/level2-sprite-1.png);background-repeat:no-repeat}.L2_FG12_size{width:640px;height:151px}.L2_FG12_offset{background-position:0 -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG12{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG13_size{width:640px;height:151px}.L2_FG13_offset{background-position:-643px -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG13{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -643px -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG14_size{width:640px;height:151px}.L2_FG14_offset{background-position:-1286px -1732px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG14{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1286px -1732px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG15_size{width:640px;height:151px}.L2_FG15_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG15{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG16_size{width:640px;height:151px}.L2_FG16_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG16{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG17_size{width:640px;height:151px}.L2_FG17_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG17{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG18_size{width:640px;height:151px}.L2_FG18_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG18{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG19_size{width:640px;height:151px}.L2_FG19_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG19{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG20_size{width:640px;height:151px}.L2_FG20_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG20{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG21_size{width:640px;height:151px}.L2_FG21_offset{background-position:-643px -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG21{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -643px -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG22_size{width:640px;height:151px}.L2_FG22_offset{background-position:-1286px -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG22{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1286px -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG32_size{width:640px;height:151px}.L2_FG32_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG32{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG33_size{width:640px;height:151px}.L2_FG33_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG33{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG34_size{width:640px;height:151px}.L2_FG34_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG34{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG35_size{width:640px;height:151px}.L2_FG35_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG35{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.L2_FG36_size{width:640px;height:151px}.L2_FG36_offset{background-position:0 -1886px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:640px;height:151px}.L2_FG36{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1886px/2037px 2037px no-repeat;width:640px;height:151px}.SPIDER_IDLE04_size{width:175px;height:175px}.SPIDER_IDLE04_offset{background-position:-1506px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE04{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1506px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_IDLE05_size{width:175px;height:175px}.SPIDER_IDLE05_offset{background-position:-1684px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE05{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_IDLE06_size{width:175px;height:175px}.SPIDER_IDLE06_offset{background-position:-1862px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE06{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1862px 0/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_IDLE07_size{width:175px;height:175px}.SPIDER_IDLE07_offset{background-position:-1506px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_IDLE07{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1506px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_INTRO24_size{width:750px;height:430px}.SPIDER_INTRO24_offset{background-position:0 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO24{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO25_size{width:750px;height:430px}.SPIDER_INTRO25_offset{background-position:-753px 0;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO25{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -753px 0/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO26_size{width:750px;height:430px}.SPIDER_INTRO26_offset{background-position:0 -433px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO26{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -433px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO27_size{width:750px;height:430px}.SPIDER_INTRO27_offset{background-position:-753px -433px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO27{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -753px -433px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO28_size{width:750px;height:430px}.SPIDER_INTRO28_offset{background-position:0 -866px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO28{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -866px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO29_size{width:750px;height:430px}.SPIDER_INTRO29_offset{background-position:-753px -866px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO29{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -753px -866px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO30_size{width:750px;height:430px}.SPIDER_INTRO30_offset{background-position:0 -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO30{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) 0 -1299px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_INTRO31_size{width:750px;height:430px}.SPIDER_INTRO31_offset{background-position:-753px -1299px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:750px;height:430px}.SPIDER_INTRO31{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -753px -1299px/2037px 2037px no-repeat;width:750px;height:430px}.SPIDER_WIN00_size{width:175px;height:175px}.SPIDER_WIN00_offset{background-position:-1684px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN00{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN01_size{width:175px;height:175px}.SPIDER_WIN01_offset{background-position:-1862px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN01{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1862px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN02_size{width:175px;height:175px}.SPIDER_WIN02_offset{background-position:-1506px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN02{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1506px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN03_size{width:175px;height:175px}.SPIDER_WIN03_offset{background-position:-1684px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN03{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN04_size{width:175px;height:175px}.SPIDER_WIN04_offset{background-position:-1684px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN04{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN05_size{width:175px;height:175px}.SPIDER_WIN05_offset{background-position:-1862px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN05{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1862px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN06_size{width:175px;height:175px}.SPIDER_WIN06_offset{background-position:-1506px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN06{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1506px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN07_size{width:175px;height:175px}.SPIDER_WIN07_offset{background-position:-1684px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN07{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN08_size{width:175px;height:175px}.SPIDER_WIN08_offset{background-position:-1684px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN08{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN09_size{width:175px;height:175px}.SPIDER_WIN09_offset{background-position:-1862px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN09{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1862px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN10_size{width:175px;height:175px}.SPIDER_WIN10_offset{background-position:-1506px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN10{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1506px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN11_size{width:175px;height:175px}.SPIDER_WIN11_offset{background-position:-1684px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN11{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN12_size{width:175px;height:175px}.SPIDER_WIN12_offset{background-position:-1684px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN12{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -178px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN13_size{width:175px;height:175px}.SPIDER_WIN13_offset{background-position:-1862px -356px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN13{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1862px -356px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN14_size{width:175px;height:175px}.SPIDER_WIN14_offset{background-position:-1506px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN14{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1506px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN15_size{width:175px;height:175px}.SPIDER_WIN15_offset{background-position:-1684px -534px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN15{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -534px/2037px 2037px no-repeat;width:175px;height:175px}.SPIDER_WIN16_size{width:175px;height:175px}.SPIDER_WIN16_offset{background-position:-1684px -178px;-webkit-background-size:2037px 2037px;background-size:2037px 2037px;width:175px;height:175px}.SPIDER_WIN16{background:url(/logos/2024/halloween24/rc3/level2-sprite-1.png) -1684px -178px/2037px 2037px no-repeat;width:175px;height:175px}.LEVEL2_SPRITE_2{background-image:url(/logos/2024/halloween24/rc3/level2-sprite-2.png);background-repeat:no-repeat}.L2_BG_size{width:640px;height:360px}.L2_BG_offset{background-position:0 0;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:360px}.L2_BG{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) 0 0/1926px 613px no-repeat;width:640px;height:360px}.L2_FG23_size{width:640px;height:151px}.L2_FG23_offset{background-position:-643px 0;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG23{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -643px 0/1926px 613px no-repeat;width:640px;height:151px}.L2_FG24_size{width:640px;height:151px}.L2_FG24_offset{background-position:-1286px 0;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG24{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -1286px 0/1926px 613px no-repeat;width:640px;height:151px}.L2_FG25_size{width:640px;height:151px}.L2_FG25_offset{background-position:-643px -154px;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG25{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -643px -154px/1926px 613px no-repeat;width:640px;height:151px}.L2_FG26_size{width:640px;height:151px}.L2_FG26_offset{background-position:-1286px -154px;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG26{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -1286px -154px/1926px 613px no-repeat;width:640px;height:151px}.L2_FG27_size{width:640px;height:151px}.L2_FG27_offset{background-position:-643px -308px;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG27{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -643px -308px/1926px 613px no-repeat;width:640px;height:151px}.L2_FG28_size{width:640px;height:151px}.L2_FG28_offset{background-position:-1286px -308px;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG28{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -1286px -308px/1926px 613px no-repeat;width:640px;height:151px}.L2_FG29_size{width:640px;height:151px}.L2_FG29_offset{background-position:0 -363px;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG29{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) 0 -363px/1926px 613px no-repeat;width:640px;height:151px}.L2_FG30_size{width:640px;height:151px}.L2_FG30_offset{background-position:-643px -462px;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG30{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -643px -462px/1926px 613px no-repeat;width:640px;height:151px}.L2_FG31_size{width:640px;height:151px}.L2_FG31_offset{background-position:-1286px -462px;-webkit-background-size:1926px 613px;background-size:1926px 613px;width:640px;height:151px}.L2_FG31{background:url(/logos/2024/halloween24/rc3/level2-sprite-2.png) -1286px -462px/1926px 613px no-repeat;width:640px;height:151px}.LEVEL3_SPRITE{background-image:url(/logos/2024/halloween24/rc3/level3-sprite.png);background-repeat:no-repeat}.L3_BG_size{width:640px;height:360px}.L3_BG_offset{background-position:0 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.L3_BG{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 0/1926px 1946px no-repeat;width:640px;height:360px}.L3_FG00_size{width:640px;height:131px}.L3_FG00_offset{background-position:0 -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG00{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1815px/1926px 1946px no-repeat;width:640px;height:131px}.L3_FG01_size{width:640px;height:131px}.L3_FG01_offset{background-position:0 -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG01{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1815px/1926px 1946px no-repeat;width:640px;height:131px}.L3_FG02_size{width:640px;height:131px}.L3_FG02_offset{background-position:0 -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG02{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1815px/1926px 1946px no-repeat;width:640px;height:131px}.L3_FG03_size{width:640px;height:131px}.L3_FG03_offset{background-position:-643px -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG03{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px -1815px/1926px 1946px no-repeat;width:640px;height:131px}.L3_FG04_size{width:640px;height:131px}.L3_FG04_offset{background-position:-1286px -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG04{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px -1815px/1926px 1946px no-repeat;width:640px;height:131px}.L3_FG12_size{width:640px;height:131px}.L3_FG12_offset{background-position:0 -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG12{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1815px/1926px 1946px no-repeat;width:640px;height:131px}.L3_FG13_size{width:640px;height:131px}.L3_FG13_offset{background-position:0 -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG13{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1815px/1926px 1946px no-repeat;width:640px;height:131px}.L3_FG14_size{width:640px;height:131px}.L3_FG14_offset{background-position:0 -1815px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:131px}.L3_FG14{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1815px/1926px 1946px no-repeat;width:640px;height:131px}.TRIANGLE_INTRO00_size{width:640px;height:360px}.TRIANGLE_INTRO00_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO00{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO01_size{width:640px;height:360px}.TRIANGLE_INTRO01_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO01{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO02_size{width:640px;height:360px}.TRIANGLE_INTRO02_offset{background-position:-1286px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO02{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO03_size{width:640px;height:360px}.TRIANGLE_INTRO03_offset{background-position:-1286px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO03{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO04_size{width:640px;height:360px}.TRIANGLE_INTRO04_offset{background-position:-1286px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO04{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO05_size{width:640px;height:360px}.TRIANGLE_INTRO05_offset{background-position:0 -363px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO05{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -363px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO06_size{width:640px;height:360px}.TRIANGLE_INTRO06_offset{background-position:-643px -363px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO06{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px -363px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO07_size{width:640px;height:360px}.TRIANGLE_INTRO07_offset{background-position:-1286px -363px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO07{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px -363px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO08_size{width:640px;height:360px}.TRIANGLE_INTRO08_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO08{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO09_size{width:640px;height:360px}.TRIANGLE_INTRO09_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO09{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO10_size{width:640px;height:360px}.TRIANGLE_INTRO10_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO10{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO11_size{width:640px;height:360px}.TRIANGLE_INTRO11_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO11{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO12_size{width:640px;height:360px}.TRIANGLE_INTRO12_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO12{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO13_size{width:640px;height:360px}.TRIANGLE_INTRO13_offset{background-position:0 -726px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO13{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -726px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO14_size{width:640px;height:360px}.TRIANGLE_INTRO14_offset{background-position:0 -726px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO14{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -726px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO15_size{width:640px;height:360px}.TRIANGLE_INTRO15_offset{background-position:-643px -726px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO15{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px -726px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO16_size{width:640px;height:360px}.TRIANGLE_INTRO16_offset{background-position:-1286px -726px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO16{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px -726px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO17_size{width:640px;height:360px}.TRIANGLE_INTRO17_offset{background-position:0 -1089px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO17{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1089px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO18_size{width:640px;height:360px}.TRIANGLE_INTRO18_offset{background-position:-643px -1089px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO18{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px -1089px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO19_size{width:640px;height:360px}.TRIANGLE_INTRO19_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO19{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO20_size{width:640px;height:360px}.TRIANGLE_INTRO20_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO20{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO21_size{width:640px;height:360px}.TRIANGLE_INTRO21_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO21{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO22_size{width:640px;height:360px}.TRIANGLE_INTRO22_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO22{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO23_size{width:640px;height:360px}.TRIANGLE_INTRO23_offset{background-position:-643px 0;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO23{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px 0/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO24_size{width:640px;height:360px}.TRIANGLE_INTRO24_offset{background-position:-1286px -1089px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO24{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px -1089px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO25_size{width:640px;height:360px}.TRIANGLE_INTRO25_offset{background-position:0 -1452px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO25{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) 0 -1452px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO26_size{width:640px;height:360px}.TRIANGLE_INTRO26_offset{background-position:-643px -1452px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO26{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -643px -1452px/1926px 1946px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO27_size{width:640px;height:360px}.TRIANGLE_INTRO27_offset{background-position:-1286px -1452px;-webkit-background-size:1926px 1946px;background-size:1926px 1946px;width:640px;height:360px}.TRIANGLE_INTRO27{background:url(/logos/2024/halloween24/rc3/level3-sprite.png) -1286px -1452px/1926px 1946px no-repeat;width:640px;height:360px}.LEVEL3_SPRITE_0{background-image:url(/logos/2024/halloween24/rc3/level3-sprite-0.png);background-repeat:no-repeat}.L3_FG05_size{width:640px;height:131px}.L3_FG05_offset{background-position:-1286px -726px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG05{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -726px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG06_size{width:640px;height:131px}.L3_FG06_offset{background-position:-1286px -860px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG06{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -860px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG07_size{width:640px;height:131px}.L3_FG07_offset{background-position:-1286px -994px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG07{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -994px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG08_size{width:640px;height:131px}.L3_FG08_offset{background-position:0 -1089px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG08{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -1089px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG09_size{width:640px;height:131px}.L3_FG09_offset{background-position:-643px -1089px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG09{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1089px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG10_size{width:640px;height:131px}.L3_FG10_offset{background-position:-1286px -1128px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG10{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -1128px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG11_size{width:640px;height:131px}.L3_FG11_offset{background-position:0 -1223px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG11{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -1223px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG15_size{width:640px;height:131px}.L3_FG15_offset{background-position:-643px -1223px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG15{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1223px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG16_size{width:640px;height:131px}.L3_FG16_offset{background-position:-643px -1223px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG16{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1223px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG17_size{width:640px;height:131px}.L3_FG17_offset{background-position:-643px -1223px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG17{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1223px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG18_size{width:640px;height:131px}.L3_FG18_offset{background-position:-1286px -1262px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG18{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -1262px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG19_size{width:640px;height:131px}.L3_FG19_offset{background-position:0 -1357px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG19{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -1357px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG20_size{width:640px;height:131px}.L3_FG20_offset{background-position:-643px -1357px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG20{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1357px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG21_size{width:640px;height:131px}.L3_FG21_offset{background-position:-1286px -1396px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG21{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -1396px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG22_size{width:640px;height:131px}.L3_FG22_offset{background-position:0 -1491px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG22{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -1491px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG23_size{width:640px;height:131px}.L3_FG23_offset{background-position:-643px -1491px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG23{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1491px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG24_size{width:640px;height:131px}.L3_FG24_offset{background-position:-1286px -1530px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG24{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -1530px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG25_size{width:640px;height:131px}.L3_FG25_offset{background-position:0 -1625px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG25{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -1625px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG26_size{width:640px;height:131px}.L3_FG26_offset{background-position:-643px -1625px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG26{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1625px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG27_size{width:640px;height:131px}.L3_FG27_offset{background-position:-1286px -1664px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG27{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -1664px/1926px 1795px no-repeat;width:640px;height:131px}.L3_FG28_size{width:640px;height:131px}.L3_FG28_offset{background-position:-643px -1223px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:131px}.L3_FG28{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -1223px/1926px 1795px no-repeat;width:640px;height:131px}.TRIANGLE_INTRO28_size{width:640px;height:360px}.TRIANGLE_INTRO28_offset{background-position:0 0;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO28{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 0/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO29_size{width:640px;height:360px}.TRIANGLE_INTRO29_offset{background-position:-643px 0;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO29{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px 0/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO30_size{width:640px;height:360px}.TRIANGLE_INTRO30_offset{background-position:-1286px 0;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO30{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px 0/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO31_size{width:640px;height:360px}.TRIANGLE_INTRO31_offset{background-position:-1286px 0;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO31{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px 0/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO32_size{width:640px;height:360px}.TRIANGLE_INTRO32_offset{background-position:0 -363px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO32{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -363px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO33_size{width:640px;height:360px}.TRIANGLE_INTRO33_offset{background-position:-1286px 0;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO33{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px 0/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO34_size{width:640px;height:360px}.TRIANGLE_INTRO34_offset{background-position:0 -363px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO34{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -363px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO35_size{width:640px;height:360px}.TRIANGLE_INTRO35_offset{background-position:-1286px 0;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO35{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px 0/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO36_size{width:640px;height:360px}.TRIANGLE_INTRO36_offset{background-position:-643px -363px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO36{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -363px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO37_size{width:640px;height:360px}.TRIANGLE_INTRO37_offset{background-position:0 -363px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO37{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -363px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO38_size{width:640px;height:360px}.TRIANGLE_INTRO38_offset{background-position:0 -363px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO38{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -363px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO39_size{width:640px;height:360px}.TRIANGLE_INTRO39_offset{background-position:0 -363px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO39{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -363px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO40_size{width:640px;height:360px}.TRIANGLE_INTRO40_offset{background-position:-1286px -363px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO40{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -1286px -363px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO41_size{width:640px;height:360px}.TRIANGLE_INTRO41_offset{background-position:0 -726px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO41{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) 0 -726px/1926px 1795px no-repeat;width:640px;height:360px}.TRIANGLE_INTRO42_size{width:640px;height:360px}.TRIANGLE_INTRO42_offset{background-position:-643px -726px;-webkit-background-size:1926px 1795px;background-size:1926px 1795px;width:640px;height:360px}.TRIANGLE_INTRO42{background:url(/logos/2024/halloween24/rc3/level3-sprite-0.png) -643px -726px/1926px 1795px no-repeat;width:640px;height:360px}.LEVEL3_SPRITE_1{background-image:url(/logos/2024/halloween24/rc3/level3-sprite-1.png);background-repeat:no-repeat}.TRIANGLE_ATTACK_FAST00_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST00_offset{background-position:0 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST00{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) 0 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST01_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST01_offset{background-position:-228px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST01{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -228px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST02_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST02_offset{background-position:-456px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST02{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -456px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST03_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST03_offset{background-position:-684px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST03{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -684px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST04_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST04_offset{background-position:-912px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST04{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -912px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST05_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST05_offset{background-position:-1140px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST05{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST06_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST06_offset{background-position:-1140px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST06{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST07_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST07_offset{background-position:-1140px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST07{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST08_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST08_offset{background-position:-1140px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST08{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST09_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST09_offset{background-position:-1368px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST09{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1368px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST10_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST10_offset{background-position:-1596px 0;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST10{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1596px 0/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST11_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST11_offset{background-position:0 -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST11{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) 0 -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE00_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE00_offset{background-position:-228px -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE00{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -228px -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE01_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE01_offset{background-position:-456px -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE01{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -456px -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE02_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE02_offset{background-position:-684px -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE02{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -684px -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE03_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE03_offset{background-position:-912px -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE03{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -912px -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE04_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE04_offset{background-position:-1140px -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE04{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE05_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE05_offset{background-position:-1368px -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE05{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1368px -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE06_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE06_offset{background-position:-1596px -321px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE06{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1596px -321px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE07_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE07_offset{background-position:0 -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE07{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) 0 -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE08_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE08_offset{background-position:-228px -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE08{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -228px -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE09_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE09_offset{background-position:-456px -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE09{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -456px -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE10_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE10_offset{background-position:-684px -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE10{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -684px -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE11_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE11_offset{background-position:-912px -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE11{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -912px -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE12_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE12_offset{background-position:-1140px -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE12{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE13_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE13_offset{background-position:-1368px -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE13{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1368px -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE14_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE14_offset{background-position:-1596px -642px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE14{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1596px -642px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE15_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE15_offset{background-position:0 -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE15{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) 0 -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE16_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE16_offset{background-position:-228px -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE16{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -228px -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE17_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE17_offset{background-position:-456px -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE17{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -456px -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE18_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE18_offset{background-position:-684px -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE18{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -684px -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE19_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE19_offset{background-position:-912px -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE19{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -912px -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE20_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE20_offset{background-position:-1140px -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE20{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE21_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE21_offset{background-position:-1368px -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE21{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1368px -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE22_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE22_offset{background-position:-1596px -963px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE22{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1596px -963px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE23_size{width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE23_offset{background-position:0 -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_FAST_IDLE23{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) 0 -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW00_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW00_offset{background-position:-228px -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW00{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -228px -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW01_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW01_offset{background-position:-456px -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW01{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -456px -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW02_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW02_offset{background-position:-684px -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW02{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -684px -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW03_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW03_offset{background-position:-912px -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW03{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -912px -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW04_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW04_offset{background-position:-1140px -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW04{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW05_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW05_offset{background-position:-1368px -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW05{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1368px -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW06_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW06_offset{background-position:-1596px -1284px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW06{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1596px -1284px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW07_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW07_offset{background-position:0 -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW07{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) 0 -1605px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE00_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE00_offset{background-position:-228px -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE00{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -228px -1605px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE01_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE01_offset{background-position:-456px -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE01{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -456px -1605px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE02_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE02_offset{background-position:-684px -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE02{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -684px -1605px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE03_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE03_offset{background-position:-912px -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE03{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -912px -1605px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE04_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE04_offset{background-position:-1140px -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE04{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1140px -1605px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE05_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE05_offset{background-position:-1368px -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE05{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1368px -1605px/1821px 1923px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE06_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE06_offset{background-position:-1596px -1605px;-webkit-background-size:1821px 1923px;background-size:1821px 1923px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE06{background:url(/logos/2024/halloween24/rc3/level3-sprite-1.png) -1596px -1605px/1821px 1923px no-repeat;width:225px;height:318px}.LEVEL3_SPRITE_2{background-image:url(/logos/2024/halloween24/rc3/level3-sprite-2.png);background-repeat:no-repeat}.TRIANGLE_ATTACK_SLOW_IDLE07_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE07_offset{background-position:0 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE07{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) 0 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE08_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE08_offset{background-position:-228px 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE08{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -228px 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE09_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE09_offset{background-position:-456px 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE09{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -456px 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE10_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE10_offset{background-position:-684px 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE10{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE11_size{width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE11_offset{background-position:-912px 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_ATTACK_SLOW_IDLE11{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -912px 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED00_size{width:225px;height:318px}.TRIANGLE_DEFEATED00_offset{background-position:-1140px 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED00{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1140px 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED01_size{width:225px;height:318px}.TRIANGLE_DEFEATED01_offset{background-position:-1368px 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED01{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1368px 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED02_size{width:225px;height:318px}.TRIANGLE_DEFEATED02_offset{background-position:-1596px 0;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED02{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1596px 0/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED03_size{width:225px;height:318px}.TRIANGLE_DEFEATED03_offset{background-position:0 -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED03{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) 0 -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED04_size{width:225px;height:318px}.TRIANGLE_DEFEATED04_offset{background-position:-228px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED04{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -228px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED05_size{width:225px;height:318px}.TRIANGLE_DEFEATED05_offset{background-position:-456px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED05{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -456px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED06_size{width:225px;height:318px}.TRIANGLE_DEFEATED06_offset{background-position:-684px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED06{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED07_size{width:225px;height:318px}.TRIANGLE_DEFEATED07_offset{background-position:-912px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED07{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -912px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED08_size{width:225px;height:318px}.TRIANGLE_DEFEATED08_offset{background-position:-1140px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED08{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1140px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED09_size{width:225px;height:318px}.TRIANGLE_DEFEATED09_offset{background-position:-1368px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED09{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1368px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED10_size{width:225px;height:318px}.TRIANGLE_DEFEATED10_offset{background-position:-1596px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED10{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1596px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED11_size{width:225px;height:318px}.TRIANGLE_DEFEATED11_offset{background-position:-912px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED11{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -912px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED12_size{width:225px;height:318px}.TRIANGLE_DEFEATED12_offset{background-position:-1140px -321px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED12{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1140px -321px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED13_size{width:225px;height:318px}.TRIANGLE_DEFEATED13_offset{background-position:0 -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED13{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) 0 -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED14_size{width:225px;height:318px}.TRIANGLE_DEFEATED14_offset{background-position:-228px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED14{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -228px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED15_size{width:225px;height:318px}.TRIANGLE_DEFEATED15_offset{background-position:-456px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED15{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -456px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED16_size{width:225px;height:318px}.TRIANGLE_DEFEATED16_offset{background-position:-684px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED16{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED17_size{width:225px;height:318px}.TRIANGLE_DEFEATED17_offset{background-position:-684px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED17{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED18_size{width:225px;height:318px}.TRIANGLE_DEFEATED18_offset{background-position:-684px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED18{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED19_size{width:225px;height:318px}.TRIANGLE_DEFEATED19_offset{background-position:-684px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED19{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED20_size{width:225px;height:318px}.TRIANGLE_DEFEATED20_offset{background-position:-684px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED20{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED21_size{width:225px;height:318px}.TRIANGLE_DEFEATED21_offset{background-position:-684px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED21{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED22_size{width:225px;height:318px}.TRIANGLE_DEFEATED22_offset{background-position:-912px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED22{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -912px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED23_size{width:225px;height:318px}.TRIANGLE_DEFEATED23_offset{background-position:-1140px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED23{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1140px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED24_size{width:225px;height:318px}.TRIANGLE_DEFEATED24_offset{background-position:-1368px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED24{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1368px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED25_size{width:225px;height:318px}.TRIANGLE_DEFEATED25_offset{background-position:-1596px -642px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED25{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1596px -642px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_DEFEATED26_size{width:225px;height:318px}.TRIANGLE_DEFEATED26_offset{background-position:0 -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_DEFEATED26{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) 0 -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_HIT00_size{width:225px;height:318px}.TRIANGLE_HIT00_offset{background-position:-228px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_HIT00{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -228px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_HIT01_size{width:225px;height:318px}.TRIANGLE_HIT01_offset{background-position:-228px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_HIT01{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -228px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_HIT02_size{width:225px;height:318px}.TRIANGLE_HIT02_offset{background-position:-456px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_HIT02{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -456px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_HIT03_size{width:225px;height:318px}.TRIANGLE_HIT03_offset{background-position:-684px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_HIT03{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -684px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_HIT04_size{width:225px;height:318px}.TRIANGLE_HIT04_offset{background-position:-912px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_HIT04{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -912px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_WIN00_size{width:225px;height:318px}.TRIANGLE_WIN00_offset{background-position:-1140px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_WIN00{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1140px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_WIN01_size{width:225px;height:318px}.TRIANGLE_WIN01_offset{background-position:-1368px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_WIN01{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1368px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_WIN02_size{width:225px;height:318px}.TRIANGLE_WIN02_offset{background-position:-1596px -963px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_WIN02{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -1596px -963px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_WIN03_size{width:225px;height:318px}.TRIANGLE_WIN03_offset{background-position:0 -1284px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_WIN03{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) 0 -1284px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_WIN04_size{width:225px;height:318px}.TRIANGLE_WIN04_offset{background-position:-228px -1284px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_WIN04{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -228px -1284px/1821px 1602px no-repeat;width:225px;height:318px}.TRIANGLE_WIN05_size{width:225px;height:318px}.TRIANGLE_WIN05_offset{background-position:-456px -1284px;-webkit-background-size:1821px 1602px;background-size:1821px 1602px;width:225px;height:318px}.TRIANGLE_WIN05{background:url(/logos/2024/halloween24/rc3/level3-sprite-2.png) -456px -1284px/1821px 1602px no-repeat;width:225px;height:318px}.LEVEL4_SPRITE{background-image:url(/logos/2024/halloween24/rc3/level4-sprite.png);background-repeat:no-repeat}.L4_BG_size{width:640px;height:360px}.L4_BG_offset{background-position:0 0;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.L4_BG{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) 0 0/2040px 1922px no-repeat;width:640px;height:360px}.CONSTELLATION_SCORPION_size{width:640px;height:360px}.CONSTELLATION_SCORPION_offset{background-position:-643px 0;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.CONSTELLATION_SCORPION{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -643px 0/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK00_size{width:640px;height:360px}.SCORPION_ATTACK00_offset{background-position:-1286px 0;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK00{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1286px 0/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK01_size{width:640px;height:360px}.SCORPION_ATTACK01_offset{background-position:0 -363px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK01{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) 0 -363px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK02_size{width:640px;height:360px}.SCORPION_ATTACK02_offset{background-position:-643px -363px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK02{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -643px -363px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK03_size{width:640px;height:360px}.SCORPION_ATTACK03_offset{background-position:-1286px -363px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK03{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1286px -363px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK04_size{width:640px;height:360px}.SCORPION_ATTACK04_offset{background-position:0 -726px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK04{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) 0 -726px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK05_size{width:640px;height:360px}.SCORPION_ATTACK05_offset{background-position:-643px -726px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK05{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -643px -726px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK06_size{width:640px;height:360px}.SCORPION_ATTACK06_offset{background-position:-643px -726px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK06{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -643px -726px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK07_size{width:640px;height:360px}.SCORPION_ATTACK07_offset{background-position:-1286px -726px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK07{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1286px -726px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK08_size{width:640px;height:360px}.SCORPION_ATTACK08_offset{background-position:0 -1089px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK08{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) 0 -1089px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK09_size{width:640px;height:360px}.SCORPION_ATTACK09_offset{background-position:-643px -1089px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK09{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -643px -1089px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK10_size{width:640px;height:360px}.SCORPION_ATTACK10_offset{background-position:-1286px -1089px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK10{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1286px -1089px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK11_size{width:640px;height:360px}.SCORPION_ATTACK11_offset{background-position:0 -1452px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK11{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) 0 -1452px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_ATTACK12_size{width:640px;height:360px}.SCORPION_ATTACK12_offset{background-position:-1286px 0;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_ATTACK12{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1286px 0/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_WIN00_size{width:640px;height:360px}.SCORPION_WIN00_offset{background-position:-1286px 0;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_WIN00{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1286px 0/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_WIN01_size{width:640px;height:360px}.SCORPION_WIN01_offset{background-position:-643px -1452px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_WIN01{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -643px -1452px/2040px 1922px no-repeat;width:640px;height:360px}.SCORPION_WIN02_size{width:640px;height:360px}.SCORPION_WIN02_offset{background-position:-1286px -1452px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:640px;height:360px}.SCORPION_WIN02{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1286px -1452px/2040px 1922px no-repeat;width:640px;height:360px}.STAR_ATTACK00_size{width:111px;height:107px}.STAR_ATTACK00_offset{background-position:-1929px 0;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK00{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px 0/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK01_size{width:111px;height:107px}.STAR_ATTACK01_offset{background-position:-1929px -110px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK01{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -110px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK02_size{width:111px;height:107px}.STAR_ATTACK02_offset{background-position:-1929px -220px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK02{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -220px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK03_size{width:111px;height:107px}.STAR_ATTACK03_offset{background-position:-1929px -330px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK03{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -330px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK04_size{width:111px;height:107px}.STAR_ATTACK04_offset{background-position:-1929px -440px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK04{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -440px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK05_size{width:111px;height:107px}.STAR_ATTACK05_offset{background-position:-1929px -550px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK05{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -550px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK06_size{width:111px;height:107px}.STAR_ATTACK06_offset{background-position:-1929px -330px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK06{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -330px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK07_size{width:111px;height:107px}.STAR_ATTACK07_offset{background-position:-1929px -110px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK07{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -110px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_ATTACK08_size{width:111px;height:107px}.STAR_ATTACK08_offset{background-position:-1929px 0;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_ATTACK08{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px 0/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEFEATED00_size{width:111px;height:107px}.STAR_DEFEATED00_offset{background-position:-1929px -660px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEFEATED00{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -660px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEFEATED01_size{width:111px;height:107px}.STAR_DEFEATED01_offset{background-position:-1929px -770px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEFEATED01{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -770px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEFEATED02_size{width:111px;height:107px}.STAR_DEFEATED02_offset{background-position:-1929px -880px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEFEATED02{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -880px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEFEATED03_size{width:111px;height:107px}.STAR_DEFEATED03_offset{background-position:-1929px -990px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEFEATED03{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -990px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED00_size{width:111px;height:107px}.STAR_DEPOSSESSED00_offset{background-position:-1929px -1100px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED00{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -1100px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED01_size{width:111px;height:107px}.STAR_DEPOSSESSED01_offset{background-position:-1929px -1210px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED01{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -1210px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED02_size{width:111px;height:107px}.STAR_DEPOSSESSED02_offset{background-position:-1929px -1320px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED02{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -1320px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED03_size{width:111px;height:107px}.STAR_DEPOSSESSED03_offset{background-position:-1929px -1430px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED03{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -1430px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED04_size{width:111px;height:107px}.STAR_DEPOSSESSED04_offset{background-position:-1929px -1540px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED04{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -1540px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED05_size{width:111px;height:107px}.STAR_DEPOSSESSED05_offset{background-position:-1929px -1650px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED05{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -1650px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED06_size{width:111px;height:107px}.STAR_DEPOSSESSED06_offset{background-position:-1929px -1760px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED06{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -1760px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED07_size{width:111px;height:107px}.STAR_DEPOSSESSED07_offset{background-position:0 -1815px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED07{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) 0 -1815px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED08_size{width:111px;height:107px}.STAR_DEPOSSESSED08_offset{background-position:-114px -1815px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED08{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -114px -1815px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED09_size{width:111px;height:107px}.STAR_DEPOSSESSED09_offset{background-position:-228px -1815px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED09{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -228px -1815px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_DEPOSSESSED10_size{width:111px;height:107px}.STAR_DEPOSSESSED10_offset{background-position:-342px -1815px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_DEPOSSESSED10{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -342px -1815px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_HIT00_size{width:111px;height:107px}.STAR_HIT00_offset{background-position:-1929px -660px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_HIT00{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -660px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_HIT01_size{width:111px;height:107px}.STAR_HIT01_offset{background-position:-456px -1815px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_HIT01{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -456px -1815px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_HIT02_size{width:111px;height:107px}.STAR_HIT02_offset{background-position:-570px -1815px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_HIT02{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -570px -1815px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_HIT03_size{width:111px;height:107px}.STAR_HIT03_offset{background-position:-684px -1815px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_HIT03{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -684px -1815px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_HIT04_size{width:111px;height:107px}.STAR_HIT04_offset{background-position:-1929px -660px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_HIT04{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -660px/2040px 1922px no-repeat;width:111px;height:107px}.STAR_IDLE_size{width:111px;height:107px}.STAR_IDLE_offset{background-position:-1929px -660px;-webkit-background-size:2040px 1922px;background-size:2040px 1922px;width:111px;height:107px}.STAR_IDLE{background:url(/logos/2024/halloween24/rc3/level4-sprite.png) -1929px -660px/2040px 1922px no-repeat;width:111px;height:107px}.LEVEL4_SPRITE_0{background-image:url(/logos/2024/halloween24/rc3/level4-sprite-0.png);background-repeat:no-repeat}.CONSTELLATION_CROW_size{width:583px;height:326px}.CONSTELLATION_CROW_offset{background-position:-1286px -363px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CONSTELLATION_CROW{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -1286px -363px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK00_size{width:583px;height:326px}.CROW_ATTACK00_offset{background-position:-1286px -692px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK00{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -1286px -692px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK01_size{width:583px;height:326px}.CROW_ATTACK01_offset{background-position:0 -726px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK01{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 -726px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK02_size{width:583px;height:326px}.CROW_ATTACK02_offset{background-position:-586px -726px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK02{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -586px -726px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK03_size{width:583px;height:326px}.CROW_ATTACK03_offset{background-position:-1172px -1021px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK03{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -1172px -1021px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK04_size{width:583px;height:326px}.CROW_ATTACK04_offset{background-position:0 -1055px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK04{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 -1055px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK05_size{width:583px;height:326px}.CROW_ATTACK05_offset{background-position:0 -1055px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK05{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 -1055px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK06_size{width:583px;height:326px}.CROW_ATTACK06_offset{background-position:0 -1055px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK06{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 -1055px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK07_size{width:583px;height:326px}.CROW_ATTACK07_offset{background-position:-586px -1055px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK07{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -586px -1055px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK08_size{width:583px;height:326px}.CROW_ATTACK08_offset{background-position:-1172px -1350px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK08{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -1172px -1350px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK09_size{width:583px;height:326px}.CROW_ATTACK09_offset{background-position:-1172px -1350px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK09{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -1172px -1350px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK10_size{width:583px;height:326px}.CROW_ATTACK10_offset{background-position:0 -1384px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK10{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 -1384px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK11_size{width:583px;height:326px}.CROW_ATTACK11_offset{background-position:-586px -1384px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK11{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -586px -1384px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK12_size{width:583px;height:326px}.CROW_ATTACK12_offset{background-position:-1172px -1679px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK12{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -1172px -1679px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK13_size{width:583px;height:326px}.CROW_ATTACK13_offset{background-position:0 -1713px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK13{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 -1713px/1926px 2039px no-repeat;width:583px;height:326px}.CROW_ATTACK14_size{width:583px;height:326px}.CROW_ATTACK14_offset{background-position:-586px -1713px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:583px;height:326px}.CROW_ATTACK14{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -586px -1713px/1926px 2039px no-repeat;width:583px;height:326px}.SCORPION_WIN03_size{width:640px;height:360px}.SCORPION_WIN03_offset{background-position:0 0;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN03{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 0/1926px 2039px no-repeat;width:640px;height:360px}.SCORPION_WIN04_size{width:640px;height:360px}.SCORPION_WIN04_offset{background-position:-643px 0;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN04{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -643px 0/1926px 2039px no-repeat;width:640px;height:360px}.SCORPION_WIN05_size{width:640px;height:360px}.SCORPION_WIN05_offset{background-position:-643px 0;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN05{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -643px 0/1926px 2039px no-repeat;width:640px;height:360px}.SCORPION_WIN06_size{width:640px;height:360px}.SCORPION_WIN06_offset{background-position:-643px 0;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN06{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -643px 0/1926px 2039px no-repeat;width:640px;height:360px}.SCORPION_WIN07_size{width:640px;height:360px}.SCORPION_WIN07_offset{background-position:-643px 0;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN07{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -643px 0/1926px 2039px no-repeat;width:640px;height:360px}.SCORPION_WIN08_size{width:640px;height:360px}.SCORPION_WIN08_offset{background-position:-1286px 0;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN08{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -1286px 0/1926px 2039px no-repeat;width:640px;height:360px}.SCORPION_WIN09_size{width:640px;height:360px}.SCORPION_WIN09_offset{background-position:0 -363px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN09{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) 0 -363px/1926px 2039px no-repeat;width:640px;height:360px}.SCORPION_WIN10_size{width:640px;height:360px}.SCORPION_WIN10_offset{background-position:-643px -363px;-webkit-background-size:1926px 2039px;background-size:1926px 2039px;width:640px;height:360px}.SCORPION_WIN10{background:url(/logos/2024/halloween24/rc3/level4-sprite-0.png) -643px -363px/1926px 2039px no-repeat;width:640px;height:360px}.LEVEL4_SPRITE_1{background-image:url(/logos/2024/halloween24/rc3/level4-sprite-1.png);background-repeat:no-repeat}.CROW_ATTACK15_size{width:583px;height:326px}.CROW_ATTACK15_offset{background-position:0 0;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_ATTACK15{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 0/1933px 1947px no-repeat;width:583px;height:326px}.CROW_ATTACK16_size{width:583px;height:326px}.CROW_ATTACK16_offset{background-position:-586px 0;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_ATTACK16{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -586px 0/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN00_size{width:583px;height:326px}.CROW_WIN00_offset{background-position:-586px 0;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN00{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -586px 0/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN01_size{width:583px;height:326px}.CROW_WIN01_offset{background-position:-1172px 0;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN01{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1172px 0/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN02_size{width:583px;height:326px}.CROW_WIN02_offset{background-position:0 -329px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN02{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 -329px/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN03_size{width:583px;height:326px}.CROW_WIN03_offset{background-position:-586px -329px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN03{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -586px -329px/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN04_size{width:583px;height:326px}.CROW_WIN04_offset{background-position:-586px -329px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN04{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -586px -329px/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN05_size{width:583px;height:326px}.CROW_WIN05_offset{background-position:-586px -329px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN05{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -586px -329px/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN06_size{width:583px;height:326px}.CROW_WIN06_offset{background-position:-1172px -329px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN06{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1172px -329px/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN07_size{width:583px;height:326px}.CROW_WIN07_offset{background-position:0 -658px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN07{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 -658px/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN08_size{width:583px;height:326px}.CROW_WIN08_offset{background-position:-586px -658px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN08{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -586px -658px/1933px 1947px no-repeat;width:583px;height:326px}.CROW_WIN09_size{width:583px;height:326px}.CROW_WIN09_offset{background-position:-1172px -658px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:583px;height:326px}.CROW_WIN09{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1172px -658px/1933px 1947px no-repeat;width:583px;height:326px}.CONSTELLATION_WOLF_size{width:481px;height:318px}.CONSTELLATION_WOLF_offset{background-position:0 -987px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.CONSTELLATION_WOLF{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 -987px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK00_size{width:481px;height:318px}.WOLF_ATTACK00_offset{background-position:-484px -987px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK00{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -484px -987px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK01_size{width:481px;height:318px}.WOLF_ATTACK01_offset{background-position:-968px -987px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK01{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -968px -987px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK02_size{width:481px;height:318px}.WOLF_ATTACK02_offset{background-position:-1452px -987px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK02{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1452px -987px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK03_size{width:481px;height:318px}.WOLF_ATTACK03_offset{background-position:0 -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK03{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK04_size{width:481px;height:318px}.WOLF_ATTACK04_offset{background-position:0 -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK04{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK05_size{width:481px;height:318px}.WOLF_ATTACK05_offset{background-position:0 -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK05{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK06_size{width:481px;height:318px}.WOLF_ATTACK06_offset{background-position:-484px -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK06{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -484px -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK07_size{width:481px;height:318px}.WOLF_ATTACK07_offset{background-position:-968px -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK07{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -968px -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK08_size{width:481px;height:318px}.WOLF_ATTACK08_offset{background-position:-1452px -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK08{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1452px -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK09_size{width:481px;height:318px}.WOLF_ATTACK09_offset{background-position:-1452px -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK09{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1452px -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK10_size{width:481px;height:318px}.WOLF_ATTACK10_offset{background-position:-1452px -1308px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK10{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1452px -1308px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK11_size{width:481px;height:318px}.WOLF_ATTACK11_offset{background-position:0 -1629px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK11{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) 0 -1629px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK12_size{width:481px;height:318px}.WOLF_ATTACK12_offset{background-position:-484px -1629px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK12{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -484px -1629px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK13_size{width:481px;height:318px}.WOLF_ATTACK13_offset{background-position:-968px -1629px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK13{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -968px -1629px/1933px 1947px no-repeat;width:481px;height:318px}.WOLF_ATTACK14_size{width:481px;height:318px}.WOLF_ATTACK14_offset{background-position:-1452px -1629px;-webkit-background-size:1933px 1947px;background-size:1933px 1947px;width:481px;height:318px}.WOLF_ATTACK14{background:url(/logos/2024/halloween24/rc3/level4-sprite-1.png) -1452px -1629px/1933px 1947px no-repeat;width:481px;height:318px}.LEVEL4_SPRITE_2{background-image:url(/logos/2024/halloween24/rc3/level4-sprite-2.png);background-repeat:no-repeat}.WOLF_ATTACK15_size{width:481px;height:318px}.WOLF_ATTACK15_offset{background-position:0 0;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_ATTACK15{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) 0 0/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_ATTACK16_size{width:481px;height:318px}.WOLF_ATTACK16_offset{background-position:-484px 0;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_ATTACK16{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -484px 0/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_ATTACK17_size{width:481px;height:318px}.WOLF_ATTACK17_offset{background-position:-968px 0;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_ATTACK17{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -968px 0/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_ATTACK18_size{width:481px;height:318px}.WOLF_ATTACK18_offset{background-position:-968px 0;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_ATTACK18{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -968px 0/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_ATTACK19_size{width:481px;height:318px}.WOLF_ATTACK19_offset{background-position:-968px 0;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_ATTACK19{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -968px 0/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN00_size{width:481px;height:318px}.WOLF_WIN00_offset{background-position:-1452px 0;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN00{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -1452px 0/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN01_size{width:481px;height:318px}.WOLF_WIN01_offset{background-position:0 -321px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN01{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) 0 -321px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN02_size{width:481px;height:318px}.WOLF_WIN02_offset{background-position:-484px -321px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN02{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -484px -321px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN03_size{width:481px;height:318px}.WOLF_WIN03_offset{background-position:-968px -321px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN03{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -968px -321px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN04_size{width:481px;height:318px}.WOLF_WIN04_offset{background-position:-1452px -321px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN04{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -1452px -321px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN05_size{width:481px;height:318px}.WOLF_WIN05_offset{background-position:0 -642px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN05{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) 0 -642px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN06_size{width:481px;height:318px}.WOLF_WIN06_offset{background-position:-484px -642px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN06{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -484px -642px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN07_size{width:481px;height:318px}.WOLF_WIN07_offset{background-position:-968px -642px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN07{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -968px -642px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN08_size{width:481px;height:318px}.WOLF_WIN08_offset{background-position:-1452px -642px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN08{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -1452px -642px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN09_size{width:481px;height:318px}.WOLF_WIN09_offset{background-position:0 -963px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN09{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) 0 -963px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN10_size{width:481px;height:318px}.WOLF_WIN10_offset{background-position:-484px -963px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN10{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -484px -963px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN11_size{width:481px;height:318px}.WOLF_WIN11_offset{background-position:-968px -963px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN11{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -968px -963px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN12_size{width:481px;height:318px}.WOLF_WIN12_offset{background-position:-1452px -963px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN12{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -1452px -963px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN13_size{width:481px;height:318px}.WOLF_WIN13_offset{background-position:0 -1284px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN13{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) 0 -1284px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN14_size{width:481px;height:318px}.WOLF_WIN14_offset{background-position:-484px -1284px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN14{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -484px -1284px/1933px 1602px no-repeat;width:481px;height:318px}.WOLF_WIN15_size{width:481px;height:318px}.WOLF_WIN15_offset{background-position:-968px -1284px;-webkit-background-size:1933px 1602px;background-size:1933px 1602px;width:481px;height:318px}.WOLF_WIN15{background:url(/logos/2024/halloween24/rc3/level4-sprite-2.png) -968px -1284px/1933px 1602px no-repeat;width:481px;height:318px}.LEVEL5_SPRITE{background-image:url(/logos/2024/halloween24/rc3/level5-sprite.png);background-repeat:no-repeat}.BG_5_size{width:1600px;height:900px}.BG_5_offset{background-position:0 0;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:1600px;height:900px}.BG_5{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) 0 0/2045px 1989px no-repeat;width:1600px;height:900px}.EARTH_size{width:234px;height:59px}.EARTH_offset{background-position:-1603px -726px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:234px;height:59px}.EARTH{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1603px -726px/2045px 1989px no-repeat;width:234px;height:59px}.METEOR_DEFEAT01_size{width:100px;height:99px}.METEOR_DEFEAT01_offset{background-position:-1840px -726px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_DEFEAT01{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1840px -726px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_DEFEAT02_size{width:100px;height:99px}.METEOR_DEFEAT02_offset{background-position:-1943px -726px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_DEFEAT02{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1943px -726px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_DEFEAT03_size{width:100px;height:99px}.METEOR_DEFEAT03_offset{background-position:-1929px -828px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_DEFEAT03{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -828px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_DEFEAT04_size{width:100px;height:99px}.METEOR_DEFEAT04_offset{background-position:-1929px -930px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_DEFEAT04{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -930px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_DEFEAT05_size{width:100px;height:99px}.METEOR_DEFEAT05_offset{background-position:-1929px -1032px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_DEFEAT05{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1032px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_DEFEAT06_size{width:100px;height:99px}.METEOR_DEFEAT06_offset{background-position:-1929px -1134px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_DEFEAT06{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1134px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_DEFEAT07_size{width:100px;height:99px}.METEOR_DEFEAT07_offset{background-position:-1929px -1236px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_DEFEAT07{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1236px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_HIT01_size{width:100px;height:99px}.METEOR_HIT01_offset{background-position:-1929px -1338px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_HIT01{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1338px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_HIT02_size{width:100px;height:99px}.METEOR_HIT02_offset{background-position:-1929px -1440px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_HIT02{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1440px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_HIT03_size{width:100px;height:99px}.METEOR_HIT03_offset{background-position:-1929px -1542px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_HIT03{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1542px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_HIT04_size{width:100px;height:99px}.METEOR_HIT04_offset{background-position:-1929px -1644px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_HIT04{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1644px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_HIT05_size{width:100px;height:99px}.METEOR_HIT05_offset{background-position:-1929px -1746px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_HIT05{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1746px/2045px 1989px no-repeat;width:100px;height:99px}.METEOR_HIT06_size{width:100px;height:99px}.METEOR_HIT06_offset{background-position:-1929px -1848px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:100px;height:99px}.METEOR_HIT06{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1929px -1848px/2045px 1989px no-repeat;width:100px;height:99px}.SUN_ATTACK_WIND_UP_007_size{width:640px;height:360px}.SUN_ATTACK_WIND_UP_007_offset{background-position:0 -903px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_WIND_UP_007{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) 0 -903px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_WIND_UP_008_size{width:640px;height:360px}.SUN_ATTACK_WIND_UP_008_offset{background-position:-643px -903px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_WIND_UP_008{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -643px -903px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_WIND_UP_009_size{width:640px;height:360px}.SUN_ATTACK_WIND_UP_009_offset{background-position:-1286px -903px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_WIND_UP_009{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1286px -903px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_WIND_UP_010_size{width:640px;height:360px}.SUN_ATTACK_WIND_UP_010_offset{background-position:0 -1266px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_WIND_UP_010{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) 0 -1266px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_WIND_UP_011_size{width:640px;height:360px}.SUN_ATTACK_WIND_UP_011_offset{background-position:-643px -1266px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_WIND_UP_011{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -643px -1266px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_WIND_UP_012_size{width:640px;height:360px}.SUN_ATTACK_WIND_UP_012_offset{background-position:-1286px -1266px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_WIND_UP_012{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1286px -1266px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_013_size{width:640px;height:360px}.SUN_ATTACK_013_offset{background-position:0 -1629px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_013{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) 0 -1629px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_014_size{width:640px;height:360px}.SUN_ATTACK_014_offset{background-position:-643px -1629px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_014{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -643px -1629px/2045px 1989px no-repeat;width:640px;height:360px}.SUN_ATTACK_015_size{width:640px;height:360px}.SUN_ATTACK_015_offset{background-position:-1286px -1629px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:640px;height:360px}.SUN_ATTACK_015{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1286px -1629px/2045px 1989px no-repeat;width:640px;height:360px}.EARTH1_size{width:234px;height:59px}.EARTH1_offset{background-position:-1603px -788px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:234px;height:59px}.EARTH1{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1603px -788px/2045px 1989px no-repeat;width:234px;height:59px}.SWOOP00_size{width:442px;height:360px}.SWOOP00_offset{background-position:-1603px 0;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:442px;height:360px}.SWOOP00{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1603px 0/2045px 1989px no-repeat;width:442px;height:360px}.SWOOP01_size{width:442px;height:360px}.SWOOP01_offset{background-position:-1603px -363px;-webkit-background-size:2045px 1989px;background-size:2045px 1989px;width:442px;height:360px}.SWOOP01{background:url(/logos/2024/halloween24/rc3/level5-sprite.png) -1603px -363px/2045px 1989px no-repeat;width:442px;height:360px}.LEVEL5_SPRITE_0{background-image:url(/logos/2024/halloween24/rc3/level5-sprite-0.png);background-repeat:no-repeat}.METEOR_IDLE01_size{width:100px;height:99px}.METEOR_IDLE01_offset{background-position:-1929px 0;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:100px;height:99px}.METEOR_IDLE01{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1929px 0/2029px 1812px no-repeat;width:100px;height:99px}.METEOR_IDLE02_size{width:100px;height:99px}.METEOR_IDLE02_offset{background-position:-1929px -102px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:100px;height:99px}.METEOR_IDLE02{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1929px -102px/2029px 1812px no-repeat;width:100px;height:99px}.METEOR_IDLE03_size{width:100px;height:99px}.METEOR_IDLE03_offset{background-position:-1929px -204px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:100px;height:99px}.METEOR_IDLE03{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1929px -204px/2029px 1812px no-repeat;width:100px;height:99px}.METEOR_IDLE04_size{width:100px;height:99px}.METEOR_IDLE04_offset{background-position:-1929px -306px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:100px;height:99px}.METEOR_IDLE04{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1929px -306px/2029px 1812px no-repeat;width:100px;height:99px}.METEOR_IDLE05_size{width:100px;height:99px}.METEOR_IDLE05_offset{background-position:-1929px -408px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:100px;height:99px}.METEOR_IDLE05{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1929px -408px/2029px 1812px no-repeat;width:100px;height:99px}.METEOR_IDLE06_size{width:100px;height:99px}.METEOR_IDLE06_offset{background-position:-1929px -510px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:100px;height:99px}.METEOR_IDLE06{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1929px -510px/2029px 1812px no-repeat;width:100px;height:99px}.METEOR_IDLE07_size{width:100px;height:99px}.METEOR_IDLE07_offset{background-position:-1929px -612px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:100px;height:99px}.METEOR_IDLE07{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1929px -612px/2029px 1812px no-repeat;width:100px;height:99px}.SUN_ATTACK_016_size{width:640px;height:360px}.SUN_ATTACK_016_offset{background-position:0 0;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_ATTACK_016{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) 0 0/2029px 1812px no-repeat;width:640px;height:360px}.SUN_ATTACK_017_size{width:640px;height:360px}.SUN_ATTACK_017_offset{background-position:-643px 0;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_ATTACK_017{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -643px 0/2029px 1812px no-repeat;width:640px;height:360px}.SUN_ATTACK_018_size{width:640px;height:360px}.SUN_ATTACK_018_offset{background-position:-1286px 0;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_ATTACK_018{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1286px 0/2029px 1812px no-repeat;width:640px;height:360px}.SUN_ATTACK_019_size{width:640px;height:360px}.SUN_ATTACK_019_offset{background-position:0 -363px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_ATTACK_019{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) 0 -363px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_ATTACK_020_size{width:640px;height:360px}.SUN_ATTACK_020_offset{background-position:-643px -363px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_ATTACK_020{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -643px -363px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_064_size{width:640px;height:360px}.SUN_DEFEAT_FX_064_offset{background-position:-1286px -363px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_064{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1286px -363px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_065_size{width:640px;height:360px}.SUN_DEFEAT_FX_065_offset{background-position:0 -726px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_065{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) 0 -726px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_066_size{width:640px;height:360px}.SUN_DEFEAT_FX_066_offset{background-position:-643px -726px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_066{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -643px -726px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_067_size{width:640px;height:360px}.SUN_DEFEAT_FX_067_offset{background-position:-1286px -726px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_067{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1286px -726px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_068_size{width:640px;height:360px}.SUN_DEFEAT_FX_068_offset{background-position:0 -1089px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_068{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) 0 -1089px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_069_size{width:640px;height:360px}.SUN_DEFEAT_FX_069_offset{background-position:-643px -1089px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_069{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -643px -1089px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_070_size{width:640px;height:360px}.SUN_DEFEAT_FX_070_offset{background-position:-1286px -1089px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_070{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1286px -1089px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_071_size{width:640px;height:360px}.SUN_DEFEAT_FX_071_offset{background-position:0 -1452px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_071{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) 0 -1452px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEAT_FX_072_size{width:640px;height:360px}.SUN_DEFEAT_FX_072_offset{background-position:-643px -1452px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEAT_FX_072{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -643px -1452px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_064_size{width:640px;height:360px}.SUN_DEFEATED_064_offset{background-position:-1286px -1452px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEATED_064{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1286px -1452px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_065_size{width:640px;height:360px}.SUN_DEFEATED_065_offset{background-position:-1286px -1452px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEATED_065{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1286px -1452px/2029px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_066_size{width:640px;height:360px}.SUN_DEFEATED_066_offset{background-position:-1286px -1452px;-webkit-background-size:2029px 1812px;background-size:2029px 1812px;width:640px;height:360px}.SUN_DEFEATED_066{background:url(/logos/2024/halloween24/rc3/level5-sprite-0.png) -1286px -1452px/2029px 1812px no-repeat;width:640px;height:360px}.LEVEL5_SPRITE_1{background-image:url(/logos/2024/halloween24/rc3/level5-sprite-1.png);background-repeat:no-repeat}.SUN_DEFEATED_067_size{width:640px;height:360px}.SUN_DEFEATED_067_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_067{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_068_size{width:640px;height:360px}.SUN_DEFEATED_068_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_068{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_069_size{width:640px;height:360px}.SUN_DEFEATED_069_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_069{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_070_size{width:640px;height:360px}.SUN_DEFEATED_070_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_070{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_071_size{width:640px;height:360px}.SUN_DEFEATED_071_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_071{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_072_size{width:640px;height:360px}.SUN_DEFEATED_072_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_072{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_073_size{width:640px;height:360px}.SUN_DEFEATED_073_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_073{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_074_size{width:640px;height:360px}.SUN_DEFEATED_074_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_074{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_DEFEATED_075_size{width:640px;height:360px}.SUN_DEFEATED_075_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_DEFEATED_075{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_045_size{width:640px;height:360px}.SUN_HIT_045_offset{background-position:-1286px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_045{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -1286px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_046_size{width:640px;height:360px}.SUN_HIT_046_offset{background-position:0 -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_046{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -363px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_047_size{width:640px;height:360px}.SUN_HIT_047_offset{background-position:-643px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_047{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px -363px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_048_size{width:640px;height:360px}.SUN_HIT_048_offset{background-position:-1286px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_048{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -1286px -363px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_049_size{width:640px;height:360px}.SUN_HIT_049_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_049{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_050_size{width:640px;height:360px}.SUN_HIT_050_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_050{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_051_size{width:640px;height:360px}.SUN_HIT_051_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_051{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_052_size{width:640px;height:360px}.SUN_HIT_052_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_052{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_053_size{width:640px;height:360px}.SUN_HIT_053_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_053{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_054_size{width:640px;height:360px}.SUN_HIT_054_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_054{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_055_size{width:640px;height:360px}.SUN_HIT_055_offset{background-position:-643px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_055{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_056_size{width:640px;height:360px}.SUN_HIT_056_offset{background-position:-1286px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_056{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -1286px -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_057_size{width:640px;height:360px}.SUN_HIT_057_offset{background-position:0 -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_057{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -1089px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_058_size{width:640px;height:360px}.SUN_HIT_058_offset{background-position:-643px -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_058{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px -1089px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_059_size{width:640px;height:360px}.SUN_HIT_059_offset{background-position:-1286px -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_059{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -1286px -1089px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_060_size{width:640px;height:360px}.SUN_HIT_060_offset{background-position:0 -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_060{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_061_size{width:640px;height:360px}.SUN_HIT_061_offset{background-position:0 -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_061{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_062_size{width:640px;height:360px}.SUN_HIT_062_offset{background-position:0 -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_062{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_HIT_063_size{width:640px;height:360px}.SUN_HIT_063_offset{background-position:0 -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_HIT_063{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) 0 -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_IDLE_001_size{width:640px;height:360px}.SUN_IDLE_001_offset{background-position:-643px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_IDLE_001{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_IDLE_002_size{width:640px;height:360px}.SUN_IDLE_002_offset{background-position:-643px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_IDLE_002{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -643px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_IDLE_003_size{width:640px;height:360px}.SUN_IDLE_003_offset{background-position:-1286px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_IDLE_003{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -1286px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_IDLE_004_size{width:640px;height:360px}.SUN_IDLE_004_offset{background-position:-1286px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_IDLE_004{background:url(/logos/2024/halloween24/rc3/level5-sprite-1.png) -1286px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.LEVEL5_SPRITE_2{background-image:url(/logos/2024/halloween24/rc3/level5-sprite-2.png);background-repeat:no-repeat}.SUN_IDLE_005_size{width:640px;height:360px}.SUN_IDLE_005_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_IDLE_005{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_IDLE_006_size{width:640px;height:360px}.SUN_IDLE_006_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_IDLE_006{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_021_size{width:640px;height:360px}.SUN_WIN_021_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_021{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_022_size{width:640px;height:360px}.SUN_WIN_022_offset{background-position:-1286px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_022{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_023_size{width:640px;height:360px}.SUN_WIN_023_offset{background-position:0 -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_023{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) 0 -363px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_024_size{width:640px;height:360px}.SUN_WIN_024_offset{background-position:-643px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_024{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -643px -363px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_025_size{width:640px;height:360px}.SUN_WIN_025_offset{background-position:-1286px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_025{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px -363px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_026_size{width:640px;height:360px}.SUN_WIN_026_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_026{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) 0 -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_027_size{width:640px;height:360px}.SUN_WIN_027_offset{background-position:-643px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_027{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -643px -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_028_size{width:640px;height:360px}.SUN_WIN_028_offset{background-position:-1286px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_028{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px -726px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_029_size{width:640px;height:360px}.SUN_WIN_029_offset{background-position:0 -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_029{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) 0 -1089px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_030_size{width:640px;height:360px}.SUN_WIN_030_offset{background-position:-643px -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_030{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -643px -1089px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_031_size{width:640px;height:360px}.SUN_WIN_031_offset{background-position:-1286px -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_031{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px -1089px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_032_size{width:640px;height:360px}.SUN_WIN_032_offset{background-position:0 -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_032{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) 0 -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_033_size{width:640px;height:360px}.SUN_WIN_033_offset{background-position:-643px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_033{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -643px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_034_size{width:640px;height:360px}.SUN_WIN_034_offset{background-position:-1286px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_034{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_037_size{width:640px;height:360px}.SUN_WIN_037_offset{background-position:-1286px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_037{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_040_size{width:640px;height:360px}.SUN_WIN_040_offset{background-position:-1286px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_040{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_043_size{width:640px;height:360px}.SUN_WIN_043_offset{background-position:-1286px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_043{background:url(/logos/2024/halloween24/rc3/level5-sprite-2.png) -1286px -1452px/1926px 1812px no-repeat;width:640px;height:360px}.LEVEL5_SPRITE_3{background-image:url(/logos/2024/halloween24/rc3/level5-sprite-3.png);background-repeat:no-repeat}.SUN1_IDLE01_size{width:438px;height:360px}.SUN1_IDLE01_offset{background-position:-1335px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_IDLE01{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1335px -363px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_IDLE02_size{width:438px;height:360px}.SUN1_IDLE02_offset{background-position:-1335px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_IDLE02{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1335px -363px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_IDLE03_size{width:438px;height:360px}.SUN1_IDLE03_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_IDLE03{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_IDLE04_size{width:438px;height:360px}.SUN1_IDLE04_offset{background-position:0 -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_IDLE04{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_IDLE05_size{width:438px;height:360px}.SUN1_IDLE05_offset{background-position:-441px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_IDLE05{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -441px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_IDLE06_size{width:438px;height:360px}.SUN1_IDLE06_offset{background-position:-441px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_IDLE06{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -441px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO01_size{width:438px;height:360px}.SUN1_INTRO01_offset{background-position:-882px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO01{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -882px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO02_size{width:438px;height:360px}.SUN1_INTRO02_offset{background-position:-1323px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO02{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1323px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO03_size{width:438px;height:360px}.SUN1_INTRO03_offset{background-position:-882px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO03{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -882px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO04_size{width:438px;height:360px}.SUN1_INTRO04_offset{background-position:-1323px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO04{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1323px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO05_size{width:438px;height:360px}.SUN1_INTRO05_offset{background-position:-882px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO05{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -882px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO06_size{width:438px;height:360px}.SUN1_INTRO06_offset{background-position:-1323px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO06{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1323px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO07_size{width:438px;height:360px}.SUN1_INTRO07_offset{background-position:-882px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO07{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -882px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO08_size{width:438px;height:360px}.SUN1_INTRO08_offset{background-position:-1323px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO08{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1323px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO09_size{width:438px;height:360px}.SUN1_INTRO09_offset{background-position:-882px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO09{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -882px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO10_size{width:438px;height:360px}.SUN1_INTRO10_offset{background-position:-1323px -726px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO10{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1323px -726px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO11_size{width:438px;height:360px}.SUN1_INTRO11_offset{background-position:0 -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO11{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 -1089px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_INTRO12_size{width:438px;height:360px}.SUN1_INTRO12_offset{background-position:-441px -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_INTRO12{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -441px -1089px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_WIN01_size{width:438px;height:360px}.SUN1_WIN01_offset{background-position:-882px -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_WIN01{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -882px -1089px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_WIN02_size{width:438px;height:360px}.SUN1_WIN02_offset{background-position:-1323px -1089px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_WIN02{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1323px -1089px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_WIN03_size{width:438px;height:360px}.SUN1_WIN03_offset{background-position:0 -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_WIN03{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 -1452px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_WIN04_size{width:438px;height:360px}.SUN1_WIN04_offset{background-position:-441px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_WIN04{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -441px -1452px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_WIN05_size{width:438px;height:360px}.SUN1_WIN05_offset{background-position:0 -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_WIN05{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 -1452px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_WIN06_size{width:438px;height:360px}.SUN1_WIN06_offset{background-position:-882px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_WIN06{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -882px -1452px/1926px 1812px no-repeat;width:438px;height:360px}.SUN1_WIN07_size{width:438px;height:360px}.SUN1_WIN07_offset{background-position:-1323px -1452px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:438px;height:360px}.SUN1_WIN07{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1323px -1452px/1926px 1812px no-repeat;width:438px;height:360px}.SUN_WIN_035_size{width:640px;height:360px}.SUN_WIN_035_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_035{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_036_size{width:640px;height:360px}.SUN_WIN_036_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_036{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_038_size{width:640px;height:360px}.SUN_WIN_038_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_038{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_039_size{width:640px;height:360px}.SUN_WIN_039_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_039{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_041_size{width:640px;height:360px}.SUN_WIN_041_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_041{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_042_size{width:640px;height:360px}.SUN_WIN_042_offset{background-position:-643px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_042{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -643px 0/1926px 1812px no-repeat;width:640px;height:360px}.SUN_WIN_044_size{width:640px;height:360px}.SUN_WIN_044_offset{background-position:0 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.SUN_WIN_044{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 0/1926px 1812px no-repeat;width:640px;height:360px}.SWOOP02_size{width:442px;height:360px}.SWOOP02_offset{background-position:0 -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:442px;height:360px}.SWOOP02{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) 0 -363px/1926px 1812px no-repeat;width:442px;height:360px}.SWOOP03_size{width:442px;height:360px}.SWOOP03_offset{background-position:-445px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:442px;height:360px}.SWOOP03{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -445px -363px/1926px 1812px no-repeat;width:442px;height:360px}.SWOOP04_size{width:442px;height:360px}.SWOOP04_offset{background-position:-890px -363px;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:442px;height:360px}.SWOOP04{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -890px -363px/1926px 1812px no-repeat;width:442px;height:360px}.VINGETTE_size{width:640px;height:360px}.VINGETTE_offset{background-position:-1286px 0;-webkit-background-size:1926px 1812px;background-size:1926px 1812px;width:640px;height:360px}.VINGETTE{background:url(/logos/2024/halloween24/rc3/level5-sprite-3.png) -1286px 0/1926px 1812px no-repeat;width:640px;height:360px}.LEVEL5_SPRITE_4{background-image:url(/logos/2024/halloween24/rc3/level5-sprite-4.png);background-repeat:no-repeat}.SUN1_WIN08_size{width:438px;height:360px}.SUN1_WIN08_offset{background-position:0 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN08{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) 0 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN09_size{width:438px;height:360px}.SUN1_WIN09_offset{background-position:0 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN09{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) 0 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN10_size{width:438px;height:360px}.SUN1_WIN10_offset{background-position:-441px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN10{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -441px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN11_size{width:438px;height:360px}.SUN1_WIN11_offset{background-position:-441px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN11{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -441px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN12_size{width:438px;height:360px}.SUN1_WIN12_offset{background-position:-882px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN12{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -882px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN13_size{width:438px;height:360px}.SUN1_WIN13_offset{background-position:0 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN13{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) 0 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN14_size{width:438px;height:360px}.SUN1_WIN14_offset{background-position:-1323px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN14{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -1323px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN15_size{width:438px;height:360px}.SUN1_WIN15_offset{background-position:-1323px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN15{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -1323px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN16_size{width:438px;height:360px}.SUN1_WIN16_offset{background-position:-882px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN16{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -882px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN17_size{width:438px;height:360px}.SUN1_WIN17_offset{background-position:-882px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN17{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -882px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN18_size{width:438px;height:360px}.SUN1_WIN18_offset{background-position:-441px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN18{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -441px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN19_size{width:438px;height:360px}.SUN1_WIN19_offset{background-position:-1323px 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN19{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) -1323px 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN20_size{width:438px;height:360px}.SUN1_WIN20_offset{background-position:0 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN20{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) 0 0/1761px 360px no-repeat;width:438px;height:360px}.SUN1_WIN21_size{width:438px;height:360px}.SUN1_WIN21_offset{background-position:0 0;-webkit-background-size:1761px 360px;background-size:1761px 360px;width:438px;height:360px}.SUN1_WIN21{background:url(/logos/2024/halloween24/rc3/level5-sprite-4.png) 0 0/1761px 360px no-repeat;width:438px;height:360px}.GHOSTS_SPRITE{background-image:url(/logos/2024/halloween24/rc3/ghosts-sprite.png);background-repeat:no-repeat}.GHOST_ATTACK_FINAL00_size{width:83px;height:105px}.GHOST_ATTACK_FINAL00_offset{background-position:-346px -1505px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -346px -1505px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL01_size{width:83px;height:105px}.GHOST_ATTACK_FINAL01_offset{background-position:-432px -1505px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -432px -1505px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL02_size{width:83px;height:105px}.GHOST_ATTACK_FINAL02_offset{background-position:-518px -1514px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -518px -1514px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL03_size{width:83px;height:105px}.GHOST_ATTACK_FINAL03_offset{background-position:-604px -1514px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -604px -1514px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL04_size{width:83px;height:105px}.GHOST_ATTACK_FINAL04_offset{background-position:-690px -1514px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -690px -1514px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL05_size{width:83px;height:105px}.GHOST_ATTACK_FINAL05_offset{background-position:-776px -1514px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -776px -1514px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL06_size{width:83px;height:105px}.GHOST_ATTACK_FINAL06_offset{background-position:-1520px -1467px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1520px -1467px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL07_size{width:83px;height:105px}.GHOST_ATTACK_FINAL07_offset{background-position:-1606px -1521px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1606px -1521px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_ATTACK_FINAL08_size{width:83px;height:105px}.GHOST_ATTACK_FINAL08_offset{background-position:-1606px -1521px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:83px;height:105px}.GHOST_ATTACK_FINAL08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1606px -1521px/2042px 1676px no-repeat;width:83px;height:105px}.GHOST_DEFEATED_FINAL00_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL00_offset{background-position:-920px -1420px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -920px -1420px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_DEFEATED_FINAL01_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL01_offset{background-position:-1020px -1467px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1020px -1467px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_DEFEATED_FINAL02_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL02_offset{background-position:-1120px -1467px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1120px -1467px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_DEFEATED_FINAL03_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL03_offset{background-position:-1220px -1467px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1220px -1467px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_DEFEATED_FINAL04_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL04_offset{background-position:-1320px -1467px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1320px -1467px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_DEFEATED_FINAL05_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL05_offset{background-position:-1420px -1467px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1420px -1467px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_DEFEATED_FINAL06_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL06_offset{background-position:-146px -1505px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -146px -1505px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_DEFEATED_FINAL07_size{width:97px;height:112px}.GHOST_DEFEATED_FINAL07_offset{background-position:-246px -1505px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:97px;height:112px}.GHOST_DEFEATED_FINAL07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -246px -1505px/2042px 1676px no-repeat;width:97px;height:112px}.GHOST_HEART_DEFEAT00_size{width:78px;height:63px}.GHOST_HEART_DEFEAT00_offset{background-position:-1906px -1298px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1906px -1298px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT01_size{width:78px;height:63px}.GHOST_HEART_DEFEAT01_offset{background-position:-1692px -1521px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1692px -1521px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT02_size{width:78px;height:63px}.GHOST_HEART_DEFEAT02_offset{background-position:-1773px -1521px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1773px -1521px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT03_size{width:78px;height:63px}.GHOST_HEART_DEFEAT03_offset{background-position:-1854px -1521px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1854px -1521px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT04_size{width:78px;height:63px}.GHOST_HEART_DEFEAT04_offset{background-position:-1935px -1521px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1935px -1521px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT05_size{width:78px;height:63px}.GHOST_HEART_DEFEAT05_offset{background-position:0 -1534px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1534px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT06_size{width:78px;height:63px}.GHOST_HEART_DEFEAT06_offset{background-position:-862px -1535px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -862px -1535px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT07_size{width:78px;height:63px}.GHOST_HEART_DEFEAT07_offset{background-position:-1520px -1575px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1520px -1575px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT08_size{width:78px;height:63px}.GHOST_HEART_DEFEAT08_offset{background-position:-943px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -943px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT09_size{width:78px;height:63px}.GHOST_HEART_DEFEAT09_offset{background-position:-943px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT09{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -943px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT10_size{width:78px;height:63px}.GHOST_HEART_DEFEAT10_offset{background-position:-943px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT10{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -943px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_DEFEAT11_size{width:78px;height:63px}.GHOST_HEART_DEFEAT11_offset{background-position:-943px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_DEFEAT11{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -943px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE00_size{width:78px;height:63px}.GHOST_HEART_IDLE00_offset{background-position:-1024px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1024px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE01_size{width:78px;height:63px}.GHOST_HEART_IDLE01_offset{background-position:-1105px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1105px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE02_size{width:78px;height:63px}.GHOST_HEART_IDLE02_offset{background-position:-1186px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1186px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE03_size{width:78px;height:63px}.GHOST_HEART_IDLE03_offset{background-position:-1267px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1267px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE04_size{width:78px;height:63px}.GHOST_HEART_IDLE04_offset{background-position:-1348px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1348px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE05_size{width:78px;height:63px}.GHOST_HEART_IDLE05_offset{background-position:-1429px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1429px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE06_size{width:78px;height:63px}.GHOST_HEART_IDLE06_offset{background-position:-1692px -1587px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1692px -1587px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE07_size{width:78px;height:63px}.GHOST_HEART_IDLE07_offset{background-position:-1773px -1587px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1773px -1587px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE08_size{width:78px;height:63px}.GHOST_HEART_IDLE08_offset{background-position:-1348px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1348px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE09_size{width:78px;height:63px}.GHOST_HEART_IDLE09_offset{background-position:-1854px -1587px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE09{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1854px -1587px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE10_size{width:78px;height:63px}.GHOST_HEART_IDLE10_offset{background-position:-1186px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE10{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1186px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE11_size{width:78px;height:63px}.GHOST_HEART_IDLE11_offset{background-position:-1935px -1587px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE11{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1935px -1587px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE12_size{width:78px;height:63px}.GHOST_HEART_IDLE12_offset{background-position:-1024px -1582px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE12{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1024px -1582px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE13_size{width:78px;height:63px}.GHOST_HEART_IDLE13_offset{background-position:0 -1600px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE13{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1600px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE14_size{width:78px;height:63px}.GHOST_HEART_IDLE14_offset{background-position:-862px -1601px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE14{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -862px -1601px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HEART_IDLE15_size{width:78px;height:63px}.GHOST_HEART_IDLE15_offset{background-position:-346px -1613px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:78px;height:63px}.GHOST_HEART_IDLE15{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -346px -1613px/2042px 1676px no-repeat;width:78px;height:63px}.GHOST_HIT_FINAL00_size{width:109px;height:91px}.GHOST_HIT_FINAL00_offset{background-position:-1906px -1110px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1906px -1110px/2042px 1676px no-repeat;width:109px;height:91px}.GHOST_HIT_FINAL01_size{width:109px;height:91px}.GHOST_HIT_FINAL01_offset{background-position:-1906px -1204px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1906px -1204px/2042px 1676px no-repeat;width:109px;height:91px}.GHOST_HIT_FINAL02_size{width:109px;height:91px}.GHOST_HIT_FINAL02_offset{background-position:-584px -1420px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -584px -1420px/2042px 1676px no-repeat;width:109px;height:91px}.GHOST_HIT_FINAL03_size{width:109px;height:91px}.GHOST_HIT_FINAL03_offset{background-position:-696px -1420px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -696px -1420px/2042px 1676px no-repeat;width:109px;height:91px}.GHOST_HIT_FINAL04_size{width:109px;height:91px}.GHOST_HIT_FINAL04_offset{background-position:-808px -1420px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -808px -1420px/2042px 1676px no-repeat;width:109px;height:91px}.GHOST_HIT_FINAL05_size{width:109px;height:91px}.GHOST_HIT_FINAL05_offset{background-position:-808px -1420px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -808px -1420px/2042px 1676px no-repeat;width:109px;height:91px}.GHOST_HIT_FINAL06_size{width:109px;height:91px}.GHOST_HIT_FINAL06_offset{background-position:-808px -1420px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -808px -1420px/2042px 1676px no-repeat;width:109px;height:91px}.GHOST_HIT_FINAL07_size{width:109px;height:91px}.GHOST_HIT_FINAL07_offset{background-position:-808px -1420px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:109px;height:91px}.GHOST_HIT_FINAL07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -808px -1420px/2042px 1676px no-repeat;width:109px;height:91px}.MARSHMALLOW_ENTRANCE00_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE00_offset{background-position:0 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 0/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE01_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE01_offset{background-position:-271px 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -271px 0/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE02_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE02_offset{background-position:-542px 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -542px 0/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE03_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE03_offset{background-position:-813px 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -813px 0/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE04_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE04_offset{background-position:-1084px 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1084px 0/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE05_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE05_offset{background-position:-1355px 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1355px 0/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE06_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE06_offset{background-position:-1626px 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1626px 0/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE07_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE07_offset{background-position:0 -242px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -242px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE08_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE08_offset{background-position:-271px -242px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -271px -242px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE09_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE09_offset{background-position:-542px -242px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE09{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -542px -242px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE10_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE10_offset{background-position:-813px -242px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE10{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -813px -242px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE11_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE11_offset{background-position:-1084px -242px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE11{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1084px -242px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE12_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE12_offset{background-position:-1355px -242px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE12{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1355px -242px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE13_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE13_offset{background-position:-1626px -242px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE13{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1626px -242px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_ENTRANCE14_size{width:268px;height:239px}.MARSHMALLOW_ENTRANCE14_offset{background-position:0 -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:268px;height:239px}.MARSHMALLOW_ENTRANCE14{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -484px/2042px 1676px no-repeat;width:268px;height:239px}.MARSHMALLOW_GAMEOVER00_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER00_offset{background-position:-1897px 0;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px 0/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER01_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER01_offset{background-position:-1897px -222px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -222px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER02_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER02_offset{background-position:-1897px -444px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -444px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER03_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER03_offset{background-position:-1897px -444px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -444px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER04_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER04_offset{background-position:-1897px -444px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -444px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER05_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER05_offset{background-position:-1897px -444px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -444px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER06_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER06_offset{background-position:-1897px -444px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -444px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER07_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER07_offset{background-position:-1897px -444px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -444px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER08_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER08_offset{background-position:-1897px -444px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1897px -444px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER09_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER09_offset{background-position:-1874px -666px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER09{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1874px -666px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER10_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER10_offset{background-position:-1874px -666px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER10{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1874px -666px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER11_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER11_offset{background-position:-1145px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER11{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1145px -834px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER12_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER12_offset{background-position:-1293px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER12{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1293px -834px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER13_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER13_offset{background-position:-1441px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER13{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1441px -834px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER14_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER14_offset{background-position:-1589px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER14{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1589px -834px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER15_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER15_offset{background-position:-1737px -888px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER15{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1737px -888px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER16_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER16_offset{background-position:-1885px -888px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER16{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1885px -888px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER17_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER17_offset{background-position:0 -901px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER17{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -901px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER18_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER18_offset{background-position:-148px -1009px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER18{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -148px -1009px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER19_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER19_offset{background-position:-296px -1009px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER19{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -296px -1009px/2042px 1676px no-repeat;width:145px;height:219px}.MARSHMALLOW_GAMEOVER20_size{width:145px;height:219px}.MARSHMALLOW_GAMEOVER20_offset{background-position:-444px -1009px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:145px;height:219px}.MARSHMALLOW_GAMEOVER20{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -444px -1009px/2042px 1676px no-repeat;width:145px;height:219px}.MOMOMARSH_HOURGLASS00_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS00_offset{background-position:-271px -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -271px -484px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS01_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS01_offset{background-position:-500px -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -500px -484px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS02_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS02_offset{background-position:-729px -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -729px -484px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS03_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS03_offset{background-position:-958px -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -958px -484px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS04_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS04_offset{background-position:-1187px -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1187px -484px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS05_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS05_offset{background-position:-1416px -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1416px -484px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS06_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS06_offset{background-position:-1645px -484px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1645px -484px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS07_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS07_offset{background-position:-271px -659px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -271px -659px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS08_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS08_offset{background-position:-500px -659px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -500px -659px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS09_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS09_offset{background-position:-729px -659px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS09{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -729px -659px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS10_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS10_offset{background-position:-958px -659px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS10{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -958px -659px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS11_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS11_offset{background-position:-1187px -659px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS11{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1187px -659px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS12_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS12_offset{background-position:-1416px -659px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS12{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1416px -659px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS13_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS13_offset{background-position:-1645px -659px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS13{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1645px -659px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS14_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS14_offset{background-position:0 -726px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS14{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -726px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS15_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS15_offset{background-position:-229px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS15{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -229px -834px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS16_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS16_offset{background-position:-458px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS16{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -458px -834px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS17_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS17_offset{background-position:-687px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS17{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -687px -834px/2042px 1676px no-repeat;width:226px;height:172px}.MOMOMARSH_HOURGLASS18_size{width:226px;height:172px}.MOMOMARSH_HOURGLASS18_offset{background-position:-916px -834px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:226px;height:172px}.MOMOMARSH_HOURGLASS18{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -916px -834px/2042px 1676px no-repeat;width:226px;height:172px}.MARSHMALLOW_HIT00_size{width:143px;height:134px}.MARSHMALLOW_HIT00_offset{background-position:-592px -1009px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_HIT00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -592px -1009px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_HIT01_size{width:143px;height:134px}.MARSHMALLOW_HIT01_offset{background-position:-738px -1009px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_HIT01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -738px -1009px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_HIT02_size{width:143px;height:134px}.MARSHMALLOW_HIT02_offset{background-position:-884px -1009px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_HIT02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -884px -1009px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_HIT03_size{width:143px;height:134px}.MARSHMALLOW_HIT03_offset{background-position:-1030px -1056px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_HIT03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1030px -1056px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_HIT04_size{width:143px;height:134px}.MARSHMALLOW_HIT04_offset{background-position:-1176px -1056px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_HIT04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1176px -1056px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE00_size{width:143px;height:134px}.MARSHMALLOW_IDLE00_offset{background-position:-1322px -1056px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1322px -1056px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE01_size{width:143px;height:134px}.MARSHMALLOW_IDLE01_offset{background-position:-1468px -1056px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1468px -1056px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE02_size{width:143px;height:134px}.MARSHMALLOW_IDLE02_offset{background-position:-1614px -1110px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1614px -1110px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE03_size{width:143px;height:134px}.MARSHMALLOW_IDLE03_offset{background-position:-1760px -1110px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1760px -1110px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE04_size{width:143px;height:134px}.MARSHMALLOW_IDLE04_offset{background-position:0 -1123px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1123px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE05_size{width:143px;height:134px}.MARSHMALLOW_IDLE05_offset{background-position:0 -1123px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1123px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE06_size{width:143px;height:134px}.MARSHMALLOW_IDLE06_offset{background-position:0 -1123px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1123px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE07_size{width:143px;height:134px}.MARSHMALLOW_IDLE07_offset{background-position:-592px -1146px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -592px -1146px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE08_size{width:143px;height:134px}.MARSHMALLOW_IDLE08_offset{background-position:-1468px -1056px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1468px -1056px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE09_size{width:143px;height:134px}.MARSHMALLOW_IDLE09_offset{background-position:-738px -1146px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE09{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -738px -1146px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE10_size{width:143px;height:134px}.MARSHMALLOW_IDLE10_offset{background-position:-884px -1146px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE10{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -884px -1146px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE11_size{width:143px;height:134px}.MARSHMALLOW_IDLE11_offset{background-position:-884px -1146px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE11{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -884px -1146px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE12_size{width:143px;height:134px}.MARSHMALLOW_IDLE12_offset{background-position:-884px -1146px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE12{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -884px -1146px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE13_size{width:143px;height:134px}.MARSHMALLOW_IDLE13_offset{background-position:-738px -1146px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE13{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -738px -1146px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE14_size{width:143px;height:134px}.MARSHMALLOW_IDLE14_offset{background-position:-1468px -1056px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE14{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1468px -1056px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE15_size{width:143px;height:134px}.MARSHMALLOW_IDLE15_offset{background-position:-1030px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE15{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1030px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE16_size{width:143px;height:134px}.MARSHMALLOW_IDLE16_offset{background-position:-1176px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE16{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1176px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE17_size{width:143px;height:134px}.MARSHMALLOW_IDLE17_offset{background-position:-1322px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE17{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1322px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE18_size{width:143px;height:134px}.MARSHMALLOW_IDLE18_offset{background-position:-1322px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE18{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1322px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE19_size{width:143px;height:134px}.MARSHMALLOW_IDLE19_offset{background-position:-1322px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE19{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1322px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE20_size{width:143px;height:134px}.MARSHMALLOW_IDLE20_offset{background-position:-1322px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE20{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1322px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE21_size{width:143px;height:134px}.MARSHMALLOW_IDLE21_offset{background-position:-1176px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE21{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1176px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE22_size{width:143px;height:134px}.MARSHMALLOW_IDLE22_offset{background-position:-1468px -1193px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE22{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1468px -1193px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE23_size{width:143px;height:134px}.MARSHMALLOW_IDLE23_offset{background-position:-146px -1231px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE23{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -146px -1231px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE24_size{width:143px;height:134px}.MARSHMALLOW_IDLE24_offset{background-position:-292px -1231px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE24{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -292px -1231px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE25_size{width:143px;height:134px}.MARSHMALLOW_IDLE25_offset{background-position:-438px -1231px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE25{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -438px -1231px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE26_size{width:143px;height:134px}.MARSHMALLOW_IDLE26_offset{background-position:-1614px -1247px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE26{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1614px -1247px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE27_size{width:143px;height:134px}.MARSHMALLOW_IDLE27_offset{background-position:-1614px -1247px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE27{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1614px -1247px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_IDLE28_size{width:143px;height:134px}.MARSHMALLOW_IDLE28_offset{background-position:-1614px -1247px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_IDLE28{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1614px -1247px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN00_size{width:143px;height:134px}.MARSHMALLOW_WIN00_offset{background-position:-1760px -1247px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN00{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1760px -1247px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN01_size{width:143px;height:134px}.MARSHMALLOW_WIN01_offset{background-position:0 -1260px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN01{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1260px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN02_size{width:143px;height:134px}.MARSHMALLOW_WIN02_offset{background-position:-584px -1283px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN02{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -584px -1283px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN03_size{width:143px;height:134px}.MARSHMALLOW_WIN03_offset{background-position:-730px -1283px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN03{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -730px -1283px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN04_size{width:143px;height:134px}.MARSHMALLOW_WIN04_offset{background-position:-876px -1283px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN04{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -876px -1283px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN05_size{width:143px;height:134px}.MARSHMALLOW_WIN05_offset{background-position:-1022px -1330px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN05{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1022px -1330px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN06_size{width:143px;height:134px}.MARSHMALLOW_WIN06_offset{background-position:-1168px -1330px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN06{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1168px -1330px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN07_size{width:143px;height:134px}.MARSHMALLOW_WIN07_offset{background-position:-1314px -1330px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN07{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1314px -1330px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN08_size{width:143px;height:134px}.MARSHMALLOW_WIN08_offset{background-position:-1460px -1330px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN08{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1460px -1330px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN09_size{width:143px;height:134px}.MARSHMALLOW_WIN09_offset{background-position:-146px -1368px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN09{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -146px -1368px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN10_size{width:143px;height:134px}.MARSHMALLOW_WIN10_offset{background-position:-292px -1368px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN10{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -292px -1368px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN11_size{width:143px;height:134px}.MARSHMALLOW_WIN11_offset{background-position:-438px -1368px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN11{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -438px -1368px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN12_size{width:143px;height:134px}.MARSHMALLOW_WIN12_offset{background-position:-1606px -1384px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN12{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1606px -1384px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN13_size{width:143px;height:134px}.MARSHMALLOW_WIN13_offset{background-position:-1752px -1384px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN13{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1752px -1384px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN14_size{width:143px;height:134px}.MARSHMALLOW_WIN14_offset{background-position:-1898px -1384px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN14{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) -1898px -1384px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN15_size{width:143px;height:134px}.MARSHMALLOW_WIN15_offset{background-position:0 -1397px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN15{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1397px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN16_size{width:143px;height:134px}.MARSHMALLOW_WIN16_offset{background-position:0 -1397px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN16{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1397px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN17_size{width:143px;height:134px}.MARSHMALLOW_WIN17_offset{background-position:0 -1397px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN17{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1397px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN18_size{width:143px;height:134px}.MARSHMALLOW_WIN18_offset{background-position:0 -1397px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN18{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1397px/2042px 1676px no-repeat;width:143px;height:134px}.MARSHMALLOW_WIN19_size{width:143px;height:134px}.MARSHMALLOW_WIN19_offset{background-position:0 -1397px;-webkit-background-size:2042px 1676px;background-size:2042px 1676px;width:143px;height:134px}.MARSHMALLOW_WIN19{background:url(/logos/2024/halloween24/rc3/ghosts-sprite.png) 0 -1397px/2042px 1676px no-repeat;width:143px;height:134px}.ddl-video-container{position:absolute;top:0;left:0;width:100%;height:100%}.ddl-mute-button{position:absolute;bottom:9px;left:20px;display:grid;grid-template-columns:1fr}.ddl-skip-button:hover{-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.ddl-mute-button>*{grid-row-start:1;grid-column-start:1}.ddl-skip-button{position:absolute;bottom:9px;right:20px}.ddl-info-card-container{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:absolute;width:537px;height:312px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ddl-info-card-container .ddl-bg{position:absolute;top:0;left:0}.ddl-altitudes{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;position:absolute;left:108px;top:4px;color:white;-webkit-transform:rotate(-1.5deg);-ms-transform:rotate(-1.5deg);transform:rotate(-1.5deg);min-width:150px}.ddl-checkpoints{position:absolute;left:40px;top:28px}.ddl-layer-names{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;text-align:right;position:absolute;top:-16px;left:105px;color:white;-webkit-transform:rotate(-2deg);-ms-transform:rotate(-2deg);transform:rotate(-2deg);min-width:150px}.ddl-boss-card{position:absolute;left:276px;top:21px}.ddl-boss-card-bg{position:absolute;top:0;left:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;row-gap:14px}.ddl-boss-name{position:absolute;left:21px;top:202px;-webkit-transform:rotate(13deg);-ms-transform:rotate(13deg);transform:rotate(13deg);text-align:center;color:darkblue;min-width:191px}.ddl-height-0{top:30px;position:absolute}.ddl-height-1{top:109px;position:absolute}.ddl-height-2{top:180px;position:absolute}.ddl-height-3{top:233px;position:absolute}.ddl-height-4{top:285px;position:absolute}.ddl-checkmark-4{left:40px;top:10px;position:absolute}.ddl-checkmark-3{left:43px;top:86px;position:absolute}.ddl-checkmark-2{left:47px;top:156px;position:absolute}.ddl-checkmark-1{left:49px;top:209px;position:absolute}.ddl-checkmark-0{left:52px;top:259px;position:absolute}.ddl-info-card-start-pos{top:150%}.ddl-info-card-slide-in{top:50%;-webkit-transition:top .8s ease-in;transition:top .8s ease-in}.ddl-info-card-slide-out{top:-100%;-webkit-transition:top .8s ease-in;transition:top .8s ease-in}.ddl-info-card-bob{-webkit-animation:infoCardBob 1.7s linear infinite;animation:infoCardBob 1.7s linear infinite}@-webkit-keyframes infoCardBob{0%{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}25%{-webkit-transform:translate(-50%,-48%);transform:translate(-50%,-48%)}50%{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}75%{-webkit-transform:translate(-50%,-52%);transform:translate(-50%,-52%)}100%{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}}@keyframes infoCardBob{0%{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}25%{-webkit-transform:translate(-50%,-48%);transform:translate(-50%,-48%)}50%{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}75%{-webkit-transform:translate(-50%,-52%);transform:translate(-50%,-52%)}100%{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}}.ddl-game-over{position:absolute;top:0;left:0;width:100%;height:100%}.ddl-game-over .ddl-buttons-bg{position:absolute;top:20px;left:323px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;row-gap:12px;color:#ffa76c}.ddl-game-over .ddl-header{font-size:32px;margin-top:20px}.ddl-game-over .ddl-score{font-size:36px}.ddl-buttons-bg .ddl-row-buttons{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-column-gap:12px;-moz-column-gap:12px;column-gap:12px}.ddl-buttons-bg .ddl-share{margin-top:8px}.ddl-play-previous{position:absolute;bottom:-8px;right:0}.ddl-play-previous .ddl-text{position:absolute;top:33px;right:97px;font-size:18px;color:white;background:#bc4680;border-radius:20px;padding:10px;text-align:center;min-width:150px}.ddl-play-previous .ddl-text:hover{background:#dd42ad;cursor:pointer}.ddl-play-previous .ddl-text.ddl-play-prev-hover{background:#dd42ad}.ddl-share-modal .ddl-modal-dialog{top:50%;left:50%;-webkit-transform:scale(.7) translate(-65%,-70%);-ms-transform:scale(.7) translate(-65%,-70%);transform:scale(.7) translate(-65%,-70%)}@media (min-width:900px){.ddl-ghost-hover .ddl-button-hover-child{visibility:visible}}@media (min-width:900px){.ddl-ghost-hover .ddl-button-norm-child{visibility:hidden}}.ddl-loading{position:absolute;top:0;left:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:wheat}.ddl-loading-text{font-size:24px;color:black}#hplogo{-webkit-transition:opacity .2s;transition:opacity .2s;touch-action:none;-webkit-touch-callout:none}#ddlContentRoot{font-family:Itim,sans-serif;pointer-events:auto;overflow:hidden;position:absolute;top:0;left:0;width:100%;height:100%}.ddl-content-root button{border:none;background-color:transparent;cursor:pointer}.expanderHide{opacity:0}.closeFullscreenBtn{z-index:3000}#sadoodle .showCta .halloweenCta,#fpdoodle .showCta .halloweenCta{opacity:1}#ctaRoot{background:none}.ddl-play-button{position:absolute;top:0;left:130px;height:200px;width:150px;pointer-events:none;background:none;opacity:1;-webkit-transition:opacity .2s;transition:opacity .2s}.ctaHideDuringLightbox .ddl-play-button{opacity:0}.ctaAnimated #halloween-animated{display:block}.ctaAnimated #halloween-static{display:none}.hplogocta{width:100%;height:100%;-webkit-background-size:contain;background-size:contain;background-position:center;border:none;overflow:hidden;position:absolute;left:0;top:0;z-index:10;cursor:pointer;padding:0;-webkit-transition:opacity .5s;transition:opacity .5s;opacity:0;pointer-events:auto}.hplogocta.showCta{opacity:1}.hplogocta.ctaHideDuringLightbox{display:none}.closeFullscreenBtn{pointer-events:all;cursor:pointer;position:absolute;top:5px;right:5px;z-index:3000}.domRootLightboxed{left:0;top:0}.contentHide{display:none}#ddlDomRoot{pointer-events:none}#ddl-background{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;top:0;left:0;width:100%;height:100%}.lightboxMode,#hplogo.lightboxMode{position:fixed;top:0;left:0;height:100%;width:100%;z-index:1000;overflow:hidden}.ddlLightboxNoScroll{overflow-y:hidden}.lightboxContentContainer{position:relative;height:100%;width:100%}.lightboxEnabled .lightboxContentContainer{height:90%;width:90%}.lightboxContent{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}.lightboxContainer{position:absolute;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%;height:100%;left:0;top:0}.lightboxBackground{opacity:0;background-color:rgba(0,0,0,.8)}.lightboxEnabled{opacity:1;-webkit-transition:opacity .5s;transition:opacity .5s}.ddl-share-modal{position:absolute;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ddl-modal-overlay{position:absolute;height:100%;width:100%;left:0;top:0;background:#000;border-radius:0;opacity:.32;-webkit-transition:opacity .15s;transition:opacity .15s;-webkit-animation:ddl-overlay-fade-in .15s 1;animation:ddl-overlay-fade-in .15s 1}.ddl-closing .ddl-modal-overlay{opacity:0}@-webkit-keyframes ddl-overlay-fade-in{0%{opacity:0}to{opacity:.32}}@keyframes ddl-overlay-fade-in{0%{opacity:0}to{opacity:.32}}.ddl-modal-dialog{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;margin:0 0 24px;isolation:isolate;position:absolute;width:364px;height:328px;left:88px;top:308px;background:#fff;border-radius:16px;opacity:1;-webkit-transition:opacity .15s;transition:opacity .15s;-webkit-animation:ddl-dialog-fade-in 83ms 1,ddl-dialog-grow-in .15s 1;animation:ddl-dialog-fade-in 83ms 1,ddl-dialog-grow-in .15s 1;overflow:hidden}@-webkit-keyframes ddl-dialog-fade-in{0%{opacity:0}to{opacity:1}}@keyframes ddl-dialog-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes ddl-dialog-grow-in{0%{scale:.8}to{scale:1}}@keyframes ddl-dialog-grow-in{0%{scale:.8}to{scale:1}}.ddl-closing .ddl-modal-dialog{opacity:0}.ddl-modal-header{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;padding-top:12px;padding-bottom:0;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:12px;padding-inline-end:12px;height:61px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-align-self:stretch;align-self:stretch;-webkit-flex-grow:0;flex-grow:0;z-index:0}.ddl-modal-header-text{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;padding:12px 0 0;gap:10px;width:280px;height:36px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-box-flex:1;-webkit-flex-grow:1;flex-grow:1;font-family:Google Sans;font-style:normal;font-weight:400;font-size:28px;line-height:36px;color:#000}.ddl-modal-close{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:transparent;width:48px;height:48px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:2;-webkit-order:1;order:1;-webkit-flex-grow:0;flex-grow:0;cursor:pointer;pointer-events:auto;border:none;padding:0}.ddl-modal-close-icon{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:50%;width:40px;height:40px;background:rgba(68,71,70,0);-webkit-transition:background .2s;transition:background .2s}.ddl-modal-close-icon:hover{background:rgba(68,71,70,.08)}.ddl-modal-close-icon:active{background:rgba(68,71,70,.12)}.ddl-closing .ddl-modal-close-icon{pointer-events:none}.ddl-modal-content{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:8px 24px;gap:24px;height:224px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:4;-webkit-order:3;order:3;-webkit-flex-grow:0;flex-grow:0;z-index:1}.ddl-modal-buttons{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0;gap:24px;width:316px;height:108px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-align-self:stretch;align-self:stretch;-webkit-flex-grow:0;flex-grow:0}.ddl-modal-button-container{height:107px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-flex-grow:0;flex-grow:0}.ddl-modal-button-label{height:19px;padding:8px 0 0;font-family:Google Sans;font-style:normal;font-weight:400;font-size:14px;line-height:20px;text-align:center;color:#444746}.ddl-share-modal .ddl-share-facebook{cursor:pointer;pointer-events:auto;border:none;padding:0;width:80px;height:80px;border-radius:50%;-webkit-transition:background .2s;transition:background .2s;background:#3b5998}.ddl-share-modal .ddl-share-facebook:hover{background:#324b80}.ddl-share-modal .ddl-share-facebook:active{background:#2d4474}.ddl-share-modal .ddl-share-twitter{cursor:pointer;pointer-events:auto;border:none;padding:0;width:80px;height:80px;border-radius:50%;-webkit-transition:background .2s;transition:background .2s;background:#000}.ddl-share-modal .ddl-share-twitter:hover{background:#3f3f3f}.ddl-share-modal .ddl-share-twitter:active{background:#656565}.ddl-share-facebook-icon{padding:22.5px 30.5px}.ddl-share-email-icon,.ddl-share-twitter-icon{padding:26px 23px}.ddl-modal-copy-link-container{width:316px;height:84px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:2;-webkit-order:1;order:1;-webkit-align-self:stretch;align-self:stretch;-webkit-flex-grow:0;flex-grow:0;pointer-events:auto;cursor:pointer}.ddl-modal-copy-link{cursor:pointer;pointer-events:auto;border:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;gap:0;padding:0;width:316px;height:56px;background:#dde3ea;border-radius:4px;-webkit-transition:background .4s;transition:background .4s}.ddl-link-copied .ddl-modal-copy-link{pointer-events:none;background-color:#a8c7fa}.ddl-modal-copy-link-icon{padding:4px 0;width:48px;height:48px}.ddl-modal-copy-link-icon path{-webkit-transition:fill .4s;transition:fill .4s;fill:#444746}.ddl-link-copied .ddl-modal-copy-link-icon path{fill:#041e49}.ddl-modal-share-link{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;cursor:text;height:24px;padding:16px 0;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:2;-webkit-order:1;order:1;-webkit-flex-grow:0;flex-grow:0;max-width:268px;font-family:Google Sans Text;font-style:normal;font-weight:400;font-size:16px;line-height:24px;color:#1f1f1f;overflow:hidden;text-overflow:ellipsis;-webkit-transition:color .4s;transition:color .4s}.ddl-link-copied .ddl-modal-share-link{color:#041e49}.ddl-modal-help-text{font-family:Google Sans Text;font-style:normal;font-weight:400;font-size:14px;line-height:20px;text-align:center;color:#444746;padding:8px}.ddl-modal-snack-bar{position:absolute;bottom:-50px;visibility:hidden}.ddl-with-snack-bar .ddl-modal-snack-bar{width:116px;height:47px;bottom:-50px;left:124px;margin:0 auto;background:#303030;border-radius:4px 4px 0 0;font-family:Google Sans Text;font-style:normal;font-weight:400;font-size:16px;line-height:47px;text-align:center;color:#f2f2f2;z-index:2;-webkit-animation:ddl-snack-bar-in .4s 1 forwards,ddl-snack-bar-out .4s 2.4s 1 forwards;animation:ddl-snack-bar-in .4s 1 forwards,ddl-snack-bar-out .4s 2.4s 1 forwards;visibility:visible}@-webkit-keyframes ddl-snack-bar-in{0%{bottom:-50px}to{bottom:0}}@keyframes ddl-snack-bar-in{0%{bottom:-50px}to{bottom:0}}@-webkit-keyframes ddl-snack-bar-out{0%{bottom:0}to{bottom:-50px}}@keyframes ddl-snack-bar-out{0%{bottom:0}to{bottom:-50px}}sentinel{}\n</style>");
        return a(b)
    }

    function Fg() {
        return P('<canvas class="ddl-game-canvas" width="640" height="360"></canvas>')
    }

    function Gg() {
        return P('<canvas class="ddl-play-button" width="150" height="200"></canvas>')
    }

    function Hg(a) {
        const b = a.he,
            c = a.Aa,
            d = a.Je,
            e = a.fe,
            f = a.Ne,
            g = a.Oe,
            k = a.He;
        return P('<div class="ddl-game-over UI_SPRITE"><div class="ddl-buttons-bg UI_SPRITE BUTTONS_BG_offset"><div class="ddl-header">' + ng(a.Yd) + '</div><div class="ddl-score">' + ng(c) + '</div><div class="ddl-row-buttons">' + Ig("ddl-replay", "UI_SPRITE REPLAY_offset", "UI_SPRITE REPLAY_HOVER_offset", d, d) + Ig("ddl-home", "UI_SPRITE HOME_offset", "UI_SPRITE HOME_HOVER_offset", e, e) + Ig("ddl-search", "UI_SPRITE SEARCH_offset", "UI_SPRITE SEARCH_HOVER_offset",
            f, f) + "</div>" + (b ? Ig("ddl-share", "UI_SPRITE SHARE_IOS_offset", "UI_SPRITE SHARE_IOS_HOVER_offset", g, g) : Ig("ddl-share", "UI_SPRITE SHARE_offset", "UI_SPRITE SHARE_HOVER_offset", g, g)) + '</div><div class="ddl-play-previous">' + Ig("ddl-ghost-icon", "UI_SPRITE PLAY_PREV_offset", "UI_SPRITE PLAY_PREV_HOVER_offset", k, k) + '<div class="ddl-text">' + ng(k) + "</div></div></div>")
    }

    function Jg(a) {
        const b = a.Ke;
        return P('<div class="ddl-pause-button-container ddl-hidden"><button class="ddl-pause-button UI_SPRITE PAUSE_offset" aria-label="' + Q(a.Ee) + '"></button><button class="ddl-resume-button UI_SPRITE RESUME_offset" aria-label="' + Q(b) + '"></button></div>')
    }

    function Kg(a) {
        const b = a.Le;
        return P('<div class="ddl-pause-screen"><div class="ddl-overlay"></div><div class="ddl-pause-text">' + ng(a.Fe) + '</div><div class="ddl-resume-text">' + ng(b) + "</div></div>")
    }

    function Lg() {
        return P('<div class="ddl-video-container"></div>')
    }

    function Mg(a) {
        return P('<button class="ddl-skip-button UI_SPRITE SKIP_offset" aria-label="' + Q(a.Pc) + '"></button>')
    }

    function Ng(a) {
        const b = a.Tc;
        return P('<div class="ddl-mute-button"><button class="ddl-mute UI_SPRITE MUTE_offset ddl-hidden" aria-label="' + Q(a.Jc) + '"></button><button class="ddl-unmute UI_SPRITE UNMUTE_offset ddl-hidden" aria-label="' + Q(b) + '"></button></div>')
    }

    function Og(a) {
        const b = a.ye,
            c = a.Ud;
        var d = a.Wd;
        let e = '<div class="ddl-info-card-container"><div class="ddl-bg UI_SPRITE MAP_offset"></div><div class="ddl-altitudes">';
        a = a.xe;
        var f = a.length;
        for (var g = 0; g < f; g++) {
            const k = a[g];
            e += '<div class="ddl-height-' + Q(g) + '">' + ng(k) + "</div>"
        }
        e += '</div><div class="ddl-checkpoints UI_SPRITE CHECKMARKS_offset"></div>';
        a = Math.max(0, Math.ceil(d + 1));
        for (f = 0; f < a; f++) g = f, e += g === d ? '<div class="ddl-checkmark-' + Q(g) + ' UI_SPRITE CHECK_RED_offset"></div>' : '<div class="ddl-checkmark-' +
            Q(g) + ' UI_SPRITE CHECK_offset"></div>';
        e += '<div class="ddl-layer-names">';
        d = b.length;
        for (a = 0; a < d; a++) f = b[a], e += '<div class="ddl-height-' + Q(a) + '">' + ng(f) + "</div>";
        e += '</div><div class="ddl-boss-card"><div class="ddl-boss-card-bg ' + Q(c.Va) + '"></div><div class="ddl-boss-name">' + ng(c.name) + "</div></div></div>";
        return P(e)
    }

    function Ig(a, b, c, d, e) {
        return P('<div class="' + Q(a) + ' ddl-button-hover-parent"><button class="' + Q(b) + ' ddl-button-norm-child" aria-label="' + Q(d) + '"></button><button class="' + Q(c) + ' ddl-button-hover-child" aria-label="' + Q(e) + '"></button></div>')
    }

    function Pg(a) {
        return P('<div class="ddl-loading"><canvas class="ddl-loading-canvas" width="90" height="90"></canvas><div class="ddl-loading-text">' + ng(a.Ae) + "</div></div>")
    };

    function Qg(a) {
        return new Promise(b => {
            setTimeout(b, a)
        })
    };

    function Rg(a, b, c, d, e) {
        const f = a.font;
        a.font = " " + c + "px 'Itim', sans-serif";
        let g = Sg(a, b, d);
        for (; g.length > e && c > 12;) c = Math.max(12, c > 1 ? c - 1 : c - .1), a.font = " " + c + "px 'Itim', sans-serif", g = Sg(a, b, d);
        for (b = 0; b < g.length; b++)
            for (; a.measureText(g[b]).width > d && c > 12;) c = Math.max(12, c > 1 ? c - 1 : c - .1), a.font = " " + c + "px 'Itim', sans-serif";
        a.font = f;
        return {
            lines: g,
            fontFamily: "'Itim', sans-serif",
            fontSize: c,
            fontStyle: ""
        }
    }

    function Sg(a, b, c) {
        b = b.match(/[^\s-]+-?/g);
        if (!b || b.length < 1) return [""];
        let d = b[0];
        const e = [];
        for (let f = 1; f < b.length; f++) {
            const g = d + (d[d.length - 1] == "-" ? "" : " ") + b[f];
            a.measureText(g).width > c ? (e.push(d), d = b[f]) : d = g
        }
        e.push(d);
        return e
    }

    function Tg(a, b, c, d) {
        for (a.style.fontSize = b + "px";
            (a.offsetWidth > c || a.offsetHeight > d) && b > 10;) b--, a.style.fontSize = b + "px"
    };

    function Ug(a) {
        m(function*() {
            yield Qg(10);
            a.g.classList.add("ddl-info-card-slide-in");
            yield Qg(800);
            a.g.classList.add("ddl-info-card-bob")
        })
    }

    function Vg(a) {
        m(function*() {
            a.g.classList.remove("ddl-info-card-slide-in", "ddl-info-card-start-pos", "ddl-info-card-bob");
            yield Qg(10);
            a.g.classList.add("ddl-info-card-slide-out");
            yield Qg(800);
            a.i.removeChild(a.g)
        })
    }
    var Zg = class {
        constructor(a, b) {
            this.i = a;
            a = Wg[b];
            a = {
                Va: a.Va,
                name: O(a.name)
            };
            this.g = Eg(Og, {
                ye: Xg.map(c => O(c)),
                xe: Yg.map(c => O(c)),
                Ud: a,
                Wd: b
            });
            this.i.appendChild(this.g);
            Tg(this.g.querySelector(".ddl-boss-name"), 16, 191, 50);
            for (const c of this.g.querySelectorAll(".ddl-altitudes")) Tg(c, 12, 150, 50);
            for (const c of this.g.querySelectorAll(".ddl-layer-names")) Tg(c, 16, 150, 50);
            this.g.classList.add("ddl-info-card-start-pos")
        }
    };
    const Yg = ["altitude_5", "altitude_4", "altitude_3", "altitude_2", "altitude_1"],
        Xg = ["layer_5", "layer_4", "layer_3", "layer_2", "layer_1"],
        Wg = [{
            Va: "UI_SPRITE PROGRESS_L1_offset",
            name: "boss_1"
        }, {
            Va: "UI_SPRITE PROGRESS_L2_offset",
            name: "boss_2"
        }, {
            Va: "UI_SPRITE PROGRESS_L3_offset",
            name: "boss_3"
        }, {
            Va: "UI_SPRITE PROGRESS_L4_offset",
            name: "boss_4"
        }, {
            Va: "",
            name: "boss_5"
        }];

    function $g() {
        ah || (ah = new bh);
        return ah
    }

    function ch(a, b, c) {
        const d = new Set(a.g);
        for (const e of d) a.g.has(e) && dh(e, b, c)
    }
    var bh = class {
            constructor() {
                this.g = new Set
            }
            addListener(a) {
                this.g.add(a)
            }
            removeListener(a) {
                this.g.delete(a)
            }
            Yb() {
                this.g.clear()
            }
        },
        ah;
    const eh = uc();

    function fh(a, b, c, d = !0) {
        c = c.get(b);
        b = Rd(eh, c.O, c.loop);
        c = D(eh, c.O[0]);
        d && (b.offset = y(c.g.H(), -.5));
        sd(a, b);
        return b
    }
    var gh = new Map([
            [0, {
                O: Xc,
                loop: !0
            }],
            [14, {
                O: [
                    [2, 760, 340, 186, 165],
                    [2, 949, 340, 186, 165],
                    [2, 1138, 340, 186, 165],
                    [2, 1327, 340, 186, 165],
                    [2, 1516, 340, 186, 165],
                    [2, 1705, 340, 186, 165]
                ],
                loop: !0
            }],
            [2, {
                O: [
                    [2, 193, 172, 186, 165],
                    [2, 193, 172, 186, 165],
                    [2, 382, 172, 186, 165],
                    [2, 571, 172, 186, 165],
                    [2, 760, 172, 186, 165],
                    [2, 949, 172, 186, 165],
                    [2, 949, 172, 186, 165]
                ],
                loop: !1
            }],
            [3, {
                O: [
                    [2, 1701, 508, 186, 165],
                    [2, 1701, 508, 186, 165],
                    [2, 0, 512, 186, 165],
                    [2, 189, 676, 186, 165],
                    [2, 378, 676, 186, 165],
                    [2, 567, 676, 186, 165],
                    [2, 756, 676, 186, 165]
                ],
                loop: !1
            }],
            [4, {
                O: [
                    [2,
                        189, 1348, 186, 165
                    ],
                    [2, 189, 1348, 186, 165],
                    [2, 378, 1348, 186, 165],
                    [2, 567, 1348, 186, 165],
                    [2, 756, 1348, 186, 165],
                    [2, 945, 1348, 186, 165],
                    [2, 945, 1348, 186, 165]
                ],
                loop: !1
            }],
            [5, {
                O: [
                    [2, 1701, 1516, 186, 165],
                    [2, 1701, 1516, 186, 165],
                    [2, 0, 1520, 186, 165],
                    [2, 189, 1684, 186, 165],
                    [2, 378, 1684, 186, 165],
                    [2, 567, 1684, 186, 165],
                    [2, 567, 1684, 186, 165]
                ],
                loop: !1
            }],
            [6, {
                O: [
                    [2, 945, 676, 186, 165],
                    [2, 945, 676, 186, 165],
                    [2, 1134, 676, 186, 165],
                    [2, 1323, 676, 186, 165],
                    [2, 1512, 676, 186, 165],
                    [2, 1701, 676, 186, 165],
                    [2, 1701, 676, 186, 165]
                ],
                loop: !1
            }],
            [7, {
                O: [
                    [2, 945, 1180,
                        186, 165
                    ],
                    [2, 945, 1180, 186, 165],
                    [2, 1134, 1180, 186, 165],
                    [2, 1323, 1180, 186, 165],
                    [2, 1512, 1180, 186, 165],
                    [2, 1701, 1180, 186, 165],
                    [2, 0, 1184, 186, 165]
                ],
                loop: !1
            }],
            [8, {
                O: [
                    [2, 378, 1516, 186, 165],
                    [2, 378, 1516, 186, 165],
                    [2, 567, 1516, 186, 165],
                    [2, 756, 1516, 186, 165],
                    [2, 945, 1516, 186, 165],
                    [2, 1134, 1516, 186, 165],
                    [2, 1323, 1516, 186, 165],
                    [2, 1512, 1516, 186, 165]
                ],
                loop: !1
            }],
            [9, {
                O: [
                    [2, 1138, 172, 186, 165],
                    [2, 1138, 172, 186, 165],
                    [2, 1327, 172, 186, 165],
                    [2, 1516, 172, 186, 165],
                    [2, 1705, 172, 186, 165],
                    [2, 193, 340, 186, 165],
                    [2, 382, 340, 186, 165],
                    [2, 571, 340, 186,
                        165
                    ]
                ],
                loop: !1
            }],
            [10, {
                O: [
                    [27, 271, 484, 226, 172],
                    [27, 500, 484, 226, 172],
                    [27, 729, 484, 226, 172],
                    [27, 958, 484, 226, 172],
                    [27, 1187, 484, 226, 172],
                    [27, 1416, 484, 226, 172],
                    [27, 1645, 484, 226, 172],
                    [27, 271, 659, 226, 172],
                    [27, 500, 659, 226, 172],
                    [27, 729, 659, 226, 172],
                    [27, 958, 659, 226, 172],
                    [27, 1187, 659, 226, 172],
                    [27, 1416, 659, 226, 172],
                    [27, 1645, 659, 226, 172],
                    [27, 0, 726, 226, 172],
                    [27, 229, 834, 226, 172],
                    [27, 458, 834, 226, 172],
                    [27, 687, 834, 226, 172],
                    [27, 916, 834, 226, 172]
                ],
                loop: !1
            }],
            [1, {
                O: [
                    [2, 0, 680, 186, 165],
                    [2, 189, 844, 186, 165],
                    [2, 378, 844, 186, 165],
                    [2, 567, 844, 186, 165]
                ],
                loop: !1
            }],
            [16, {
                O: [
                    [2, 0, 0, 190, 169],
                    [2, 0, 0, 190, 169],
                    [2, 0, 0, 190, 169],
                    [2, 193, 0, 190, 169],
                    [2, 386, 0, 190, 169],
                    [2, 579, 0, 190, 169],
                    [2, 772, 0, 190, 169],
                    [2, 965, 0, 190, 169],
                    [2, 1158, 0, 190, 169],
                    [2, 1351, 0, 190, 169],
                    [2, 1544, 0, 190, 169],
                    [2, 1737, 0, 190, 169],
                    [2, 0, 172, 190, 169]
                ],
                loop: !1
            }],
            [12, {
                O: [
                    [2, 1894, 172, 146, 184],
                    [2, 1894, 172, 146, 184],
                    [2, 1894, 359, 146, 184],
                    [2, 1890, 546, 146, 184],
                    [2, 1890, 733, 146, 184],
                    [2, 1890, 920, 146, 184],
                    [2, 1890, 1107, 146, 184],
                    [2, 1890, 1294, 146, 184],
                    [2, 1890, 1481, 146, 184],
                    [2, 167, 1852, 146, 184],
                    [2, 316, 1852, 146, 184],
                    [2, 465, 1852, 146, 184],
                    [3, 1837, 0, 146, 184],
                    [3, 1837, 187, 146, 184],
                    [3, 0, 219, 146, 184],
                    [3, 149, 219, 146, 184],
                    [3, 298, 219, 146, 184],
                    [3, 447, 219, 146, 184],
                    [3, 596, 219, 146, 184],
                    [3, 596, 219, 146, 184],
                    [3, 596, 219, 146, 184]
                ],
                loop: !1
            }],
            [18, {
                O: [
                    [2, 756, 1684, 164, 216],
                    [2, 923, 1684, 164, 216],
                    [2, 1090, 1684, 164, 216],
                    [2, 756, 1684, 164, 216],
                    [2, 923, 1684, 164, 216],
                    [2, 1090, 1684, 164, 216],
                    [2, 756, 1684, 164, 216],
                    [2, 923, 1684, 164, 216],
                    [2, 1090, 1684, 164, 216],
                    [2, 1257, 1684, 164, 216],
                    [2, 1424, 1684, 164, 216],
                    [2, 1591, 1684, 164, 216],
                    [2, 1758,
                        1684, 164, 216
                    ],
                    [2, 0, 1688, 164, 216],
                    [3, 0, 0, 164, 216],
                    [3, 167, 0, 164, 216],
                    [3, 334, 0, 164, 216]
                ],
                loop: !1
            }],
            [19, {
                O: [
                    [3, 501, 0, 164, 216],
                    [3, 668, 0, 164, 216],
                    [3, 835, 0, 164, 216],
                    [3, 1002, 0, 164, 216],
                    [3, 1169, 0, 164, 216],
                    [3, 1336, 0, 164, 216],
                    [3, 1503, 0, 164, 216],
                    [3, 1670, 0, 164, 216],
                    [2, 923, 1684, 164, 216],
                    [2, 1090, 1684, 164, 216]
                ],
                loop: !1
            }]
        ]),
        hh = new Map([
            [0, {
                O: bd,
                loop: !0
            }],
            [1, {
                O: [
                    [27, 592, 1009, 143, 134],
                    [27, 738, 1009, 143, 134],
                    [27, 884, 1009, 143, 134],
                    [27, 1030, 1056, 143, 134],
                    [27, 1176, 1056, 143, 134]
                ],
                loop: !1
            }],
            [16, {
                O: [
                    [27, 1897, 0, 145, 219],
                    [27,
                        1897, 222, 145, 219
                    ],
                    [27, 1897, 444, 145, 219],
                    [27, 1897, 444, 145, 219],
                    [27, 1897, 444, 145, 219],
                    [27, 1897, 444, 145, 219],
                    [27, 1897, 444, 145, 219],
                    [27, 1897, 444, 145, 219],
                    [27, 1897, 444, 145, 219],
                    [27, 1874, 666, 145, 219],
                    [27, 1874, 666, 145, 219],
                    [27, 1145, 834, 145, 219],
                    [27, 1293, 834, 145, 219],
                    [27, 1441, 834, 145, 219],
                    [27, 1589, 834, 145, 219],
                    [27, 1737, 888, 145, 219],
                    [27, 1885, 888, 145, 219],
                    [27, 0, 901, 145, 219],
                    [27, 148, 1009, 145, 219],
                    [27, 296, 1009, 145, 219],
                    [27, 444, 1009, 145, 219]
                ],
                loop: !1
            }],
            [12, {
                O: [
                    [27, 1760, 1247, 143, 134],
                    [27, 0, 1260, 143, 134],
                    [27, 584,
                        1283, 143, 134
                    ],
                    [27, 730, 1283, 143, 134],
                    [27, 876, 1283, 143, 134],
                    [27, 1022, 1330, 143, 134],
                    [27, 1168, 1330, 143, 134],
                    [27, 1314, 1330, 143, 134],
                    [27, 1460, 1330, 143, 134],
                    [27, 146, 1368, 143, 134],
                    [27, 292, 1368, 143, 134],
                    [27, 438, 1368, 143, 134],
                    [27, 1606, 1384, 143, 134],
                    [27, 1752, 1384, 143, 134],
                    [27, 1898, 1384, 143, 134],
                    [27, 0, 1397, 143, 134],
                    [27, 0, 1397, 143, 134],
                    [27, 0, 1397, 143, 134],
                    [27, 0, 1397, 143, 134],
                    [27, 0, 1397, 143, 134]
                ],
                loop: !1
            }]
        ]),
        ih = new Map([
            [0, {
                O: [Zc[0]],
                loop: !1
            }],
            [1, {
                O: [
                    [27, 1906, 1110, 109, 91],
                    [27, 1906, 1204, 109, 91],
                    [27, 584, 1420, 109,
                        91
                    ],
                    [27, 696, 1420, 109, 91],
                    [27, 808, 1420, 109, 91],
                    [27, 808, 1420, 109, 91],
                    [27, 808, 1420, 109, 91],
                    [27, 808, 1420, 109, 91]
                ],
                loop: !1
            }],
            [4, {
                O: Zc,
                loop: !1
            }],
            [10, {
                O: [
                    [27, 920, 1420, 97, 112],
                    [27, 1020, 1467, 97, 112],
                    [27, 1120, 1467, 97, 112],
                    [27, 1220, 1467, 97, 112],
                    [27, 1320, 1467, 97, 112],
                    [27, 1420, 1467, 97, 112],
                    [27, 146, 1505, 97, 112],
                    [27, 246, 1505, 97, 112]
                ],
                loop: !1
            }]
        ]),
        jh = new Map([
            [0, {
                O: [Kc],
                loop: !1
            }],
            [1, {
                O: [Lc],
                loop: !1
            }],
            [2, {
                O: ad,
                loop: !1
            }],
            [3, {
                O: [
                    [4, 1661, 727, 41, 38],
                    [4, 1705, 727, 41, 38],
                    [4, 1749, 727, 41, 38],
                    [4, 1793, 727, 41, 38],
                    [4, 1837, 727,
                        41, 38
                    ],
                    [4, 1881, 727, 41, 38],
                    [4, 2006, 752, 41, 38],
                    [4, 1617, 768, 41, 38],
                    [4, 1661, 768, 41, 38],
                    [4, 1705, 768, 41, 38],
                    [4, 1749, 768, 41, 38],
                    [4, 1793, 768, 41, 38]
                ],
                loop: !1
            }]
        ]),
        kh = new Map([
            [0, {
                O: $c,
                loop: !0
            }],
            [10, {
                O: [
                    [27, 1906, 1298, 78, 63],
                    [27, 1692, 1521, 78, 63],
                    [27, 1773, 1521, 78, 63],
                    [27, 1854, 1521, 78, 63],
                    [27, 1935, 1521, 78, 63],
                    [27, 0, 1534, 78, 63],
                    [27, 862, 1535, 78, 63],
                    [27, 1520, 1575, 78, 63],
                    [27, 943, 1582, 78, 63],
                    [27, 943, 1582, 78, 63],
                    [27, 943, 1582, 78, 63],
                    [27, 943, 1582, 78, 63]
                ],
                loop: !1
            }]
        ]),
        lh = new Map([
            [0, {
                O: Wc,
                loop: !0
            }],
            [1, {
                O: [
                    [6, 1765, 187, 256,
                        184
                    ],
                    [6, 1506, 374, 256, 184],
                    [6, 1765, 374, 256, 184],
                    [6, 1765, 374, 256, 184]
                ],
                loop: !1
            }],
            [4, {
                O: [
                    [5, 1506, 0, 256, 184],
                    [5, 1765, 0, 256, 184],
                    [5, 1506, 187, 256, 184],
                    [5, 1506, 187, 256, 184],
                    [5, 1765, 187, 256, 184]
                ],
                loop: !1
            }],
            [10, {
                O: [
                    [5, 1506, 374, 256, 184],
                    [5, 1765, 374, 256, 184],
                    [5, 1506, 561, 256, 184],
                    [5, 1765, 561, 256, 184],
                    [5, 1506, 748, 256, 184],
                    [5, 1765, 748, 256, 184],
                    [5, 1506, 935, 256, 184],
                    [5, 1506, 935, 256, 184],
                    [5, 1506, 935, 256, 184],
                    [5, 1765, 935, 256, 184],
                    [5, 1506, 1122, 256, 184],
                    [5, 1765, 1122, 256, 184],
                    [5, 1506, 1309, 256, 184],
                    [5, 1765, 1309, 256, 184],
                    [5, 1765, 1309, 256, 184],
                    [5, 1506, 1496, 256, 184],
                    [5, 1765, 1496, 256, 184],
                    [5, 1506, 1683, 256, 184],
                    [5, 1765, 1683, 256, 184],
                    [5, 1765, 1683, 256, 184],
                    [5, 1765, 1683, 256, 184],
                    [5, 0, 1732, 256, 184],
                    [5, 259, 1732, 256, 184],
                    [5, 518, 1732, 256, 184],
                    [5, 518, 1732, 256, 184]
                ],
                loop: !1
            }],
            [11, {
                O: [
                    [5, 1036, 1732, 256, 184],
                    [6, 1506, 0, 256, 184],
                    [6, 1765, 0, 256, 184],
                    [6, 1506, 187, 256, 184]
                ],
                loop: !1
            }],
            [12, {
                O: [
                    [5, 777, 1732, 256, 184]
                ],
                loop: !1
            }],
            [13, {
                O: [
                    [6, 1506, 1309, 256, 184],
                    [6, 1765, 1309, 256, 184],
                    [6, 1506, 1309, 256, 184],
                    [6, 1765, 1309, 256, 184],
                    [6, 1506, 1309, 256, 184],
                    [6, 1765, 1309, 256, 184],
                    [6, 1506, 1496, 256, 184],
                    [6, 1765, 1496, 256, 184],
                    [6, 1506, 1683, 256, 184],
                    [6, 1765, 1496, 256, 184],
                    [6, 1506, 1683, 256, 184],
                    [6, 1765, 1496, 256, 184],
                    [6, 1506, 1683, 256, 184],
                    [6, 1765, 1496, 256, 184]
                ],
                loop: !1
            }]
        ]),
        mh = new Map([
            [0, {
                O: [Sc],
                loop: !1
            }],
            [1, {
                O: [
                    [17, 1929, 660, 111, 107],
                    [17, 456, 1815, 111, 107],
                    [17, 570, 1815, 111, 107],
                    [17, 684, 1815, 111, 107],
                    [17, 1929, 660, 111, 107]
                ],
                loop: !1
            }],
            [4, {
                O: [
                    [17, 1929, 0, 111, 107],
                    [17, 1929, 110, 111, 107],
                    [17, 1929, 220, 111, 107],
                    [17, 1929, 330, 111, 107],
                    [17, 1929, 440, 111, 107],
                    [17, 1929, 550, 111,
                        107
                    ],
                    [17, 1929, 330, 111, 107],
                    [17, 1929, 110, 111, 107],
                    [17, 1929, 0, 111, 107]
                ],
                loop: !1
            }],
            [10, {
                O: [
                    [17, 1929, 660, 111, 107],
                    [17, 1929, 770, 111, 107],
                    [17, 1929, 880, 111, 107],
                    [17, 1929, 990, 111, 107]
                ],
                loop: !1
            }],
            [14, {
                O: [
                    [17, 1929, 1100, 111, 107],
                    [17, 1929, 1210, 111, 107],
                    [17, 1929, 1320, 111, 107],
                    [17, 1929, 1430, 111, 107],
                    [17, 1929, 1540, 111, 107],
                    [17, 1929, 1650, 111, 107],
                    [17, 1929, 1760, 111, 107],
                    [17, 0, 1815, 111, 107],
                    [17, 114, 1815, 111, 107],
                    [17, 228, 1815, 111, 107],
                    [17, 342, 1815, 111, 107]
                ],
                loop: !1
            }]
        ]),
        nh = new Map([
            [0, {
                O: dd,
                loop: !0
            }],
            [1, {
                O: [
                    [21, 1929,
                        1338, 100, 99
                    ],
                    [21, 1929, 1440, 100, 99],
                    [21, 1929, 1542, 100, 99],
                    [21, 1929, 1644, 100, 99],
                    [21, 1929, 1746, 100, 99],
                    [21, 1929, 1848, 100, 99]
                ],
                loop: !1
            }],
            [4, {
                O: cd,
                loop: !1
            }],
            [10, {
                O: cd,
                loop: !1
            }]
        ]),
        oh = new Map([
            [0, {
                O: gd,
                loop: !0
            }],
            [1, {
                O: [
                    [10, 1506, 1068, 175, 175],
                    [10, 1684, 1068, 175, 175],
                    [10, 1862, 1068, 175, 175],
                    [10, 1506, 1246, 175, 175],
                    [10, 1684, 1246, 175, 175]
                ],
                loop: !1
            }],
            [4, {
                O: [
                    [9, 1506, 0, 175, 175],
                    [9, 1684, 0, 175, 175],
                    [9, 1862, 0, 175, 175],
                    [9, 1506, 178, 175, 175],
                    [9, 1684, 178, 175, 175],
                    [9, 1862, 178, 175, 175],
                    [9, 1506, 356, 175, 175],
                    [9, 1684, 356, 175,
                        175
                    ],
                    [9, 1684, 356, 175, 175],
                    [9, 1684, 356, 175, 175]
                ],
                loop: !1
            }],
            [10, {
                O: [
                    [9, 1862, 356, 175, 175],
                    [9, 1862, 356, 175, 175],
                    [9, 1506, 534, 175, 175],
                    [9, 1684, 534, 175, 175],
                    [9, 1862, 534, 175, 175],
                    [9, 1862, 534, 175, 175],
                    [9, 1506, 712, 175, 175],
                    [9, 1684, 712, 175, 175],
                    [9, 1862, 712, 175, 175],
                    [9, 1862, 712, 175, 175],
                    [9, 1862, 712, 175, 175],
                    [9, 1862, 712, 175, 175],
                    [9, 1506, 890, 175, 175],
                    [9, 1684, 890, 175, 175],
                    [9, 1862, 890, 175, 175],
                    [9, 1506, 1068, 175, 175],
                    [9, 1684, 1068, 175, 175],
                    [9, 1862, 1068, 175, 175],
                    [9, 1862, 1068, 175, 175],
                    [9, 1506, 1246, 175, 175],
                    [9, 1684, 1246,
                        175, 175
                    ],
                    [9, 1862, 1246, 175, 175],
                    [9, 1506, 1424, 175, 175],
                    [9, 1684, 1424, 175, 175],
                    [9, 1862, 1424, 175, 175],
                    [10, 1506, 0, 175, 175],
                    [10, 1684, 0, 175, 175],
                    [10, 1862, 0, 175, 175],
                    [10, 1506, 178, 175, 175],
                    [10, 1684, 178, 175, 175],
                    [10, 1862, 178, 175, 175],
                    [10, 1506, 356, 175, 175],
                    [10, 1684, 356, 175, 175],
                    [10, 1862, 356, 175, 175],
                    [10, 1506, 534, 175, 175],
                    [10, 1684, 534, 175, 175],
                    [10, 1862, 534, 175, 175],
                    [10, 1506, 712, 175, 175],
                    [10, 1684, 712, 175, 175],
                    [10, 1862, 712, 175, 175],
                    [10, 1506, 890, 175, 175],
                    [10, 1684, 890, 175, 175],
                    [10, 1862, 890, 175, 175]
                ],
                loop: !1
            }],
            [13,
                {
                    O: [
                        [11, 1684, 178, 175, 175],
                        [11, 1862, 178, 175, 175],
                        [11, 1506, 356, 175, 175],
                        [11, 1684, 356, 175, 175],
                        [11, 1684, 178, 175, 175],
                        [11, 1862, 356, 175, 175],
                        [11, 1506, 534, 175, 175],
                        [11, 1684, 534, 175, 175],
                        [11, 1684, 178, 175, 175],
                        [11, 1862, 178, 175, 175],
                        [11, 1506, 356, 175, 175],
                        [11, 1684, 356, 175, 175],
                        [11, 1684, 178, 175, 175],
                        [11, 1862, 356, 175, 175],
                        [11, 1506, 534, 175, 175],
                        [11, 1684, 534, 175, 175],
                        [11, 1684, 178, 175, 175]
                    ],
                    loop: !1
                }
            ]
        ]),
        ph = new Map([
            [4, {
                O: [
                    [25, 882, 726, 438, 360],
                    [25, 1323, 726, 438, 360],
                    [25, 882, 726, 438, 360],
                    [25, 1323, 726, 438, 360],
                    [25, 882,
                        726, 438, 360
                    ],
                    [25, 1323, 726, 438, 360],
                    [25, 882, 726, 438, 360],
                    [25, 1323, 726, 438, 360],
                    [25, 882, 726, 438, 360],
                    [25, 1323, 726, 438, 360],
                    [25, 0, 1089, 438, 360],
                    [25, 441, 1089, 438, 360]
                ],
                loop: !1
            }],
            [0, {
                O: id,
                loop: !0
            }],
            [13, {
                O: [
                    [25, 882, 1089, 438, 360],
                    [25, 1323, 1089, 438, 360],
                    [25, 0, 1452, 438, 360],
                    [25, 441, 1452, 438, 360],
                    [25, 0, 1452, 438, 360],
                    [25, 882, 1452, 438, 360],
                    [25, 1323, 1452, 438, 360],
                    [26, 0, 0, 438, 360],
                    [26, 0, 0, 438, 360],
                    [26, 441, 0, 438, 360],
                    [26, 441, 0, 438, 360],
                    [26, 882, 0, 438, 360],
                    [26, 0, 0, 438, 360],
                    [26, 1323, 0, 438, 360],
                    [26, 1323, 0, 438, 360],
                    [26, 882, 0, 438, 360],
                    [26, 882, 0, 438, 360],
                    [26, 441, 0, 438, 360],
                    [26, 1323, 0, 438, 360],
                    [26, 0, 0, 438, 360],
                    [26, 0, 0, 438, 360]
                ],
                loop: !0
            }]
        ]),
        qh = new Map([
            [0, {
                O: ld,
                loop: !0
            }],
            [1, {
                O: [
                    [23, 1286, 0, 640, 360],
                    [23, 0, 363, 640, 360],
                    [23, 643, 363, 640, 360],
                    [23, 1286, 363, 640, 360],
                    [23, 0, 726, 640, 360],
                    [23, 0, 726, 640, 360],
                    [23, 0, 726, 640, 360],
                    [23, 0, 726, 640, 360],
                    [23, 0, 726, 640, 360],
                    [23, 0, 726, 640, 360],
                    [23, 643, 726, 640, 360],
                    [23, 1286, 726, 640, 360],
                    [23, 0, 1089, 640, 360],
                    [23, 643, 1089, 640, 360],
                    [23, 1286, 1089, 640, 360],
                    [23, 0, 1452, 640, 360],
                    [23, 0, 1452, 640,
                        360
                    ],
                    [23, 0, 1452, 640, 360],
                    [23, 0, 1452, 640, 360]
                ],
                loop: !1
            }],
            [2, {
                O: [
                    [21, 0, 903, 640, 360],
                    [21, 643, 903, 640, 360],
                    [21, 1286, 903, 640, 360],
                    [21, 0, 1266, 640, 360],
                    [21, 643, 1266, 640, 360],
                    [21, 1286, 1266, 640, 360]
                ],
                loop: !1
            }],
            [3, {
                O: jd,
                loop: !0
            }],
            [4, {
                O: jd.slice(0, 3),
                loop: !1
            }],
            [10, {
                O: [
                    [22, 1286, 1452, 640, 360],
                    [22, 1286, 1452, 640, 360],
                    [22, 1286, 1452, 640, 360],
                    [23, 0, 0, 640, 360],
                    [23, 0, 0, 640, 360],
                    [23, 0, 0, 640, 360],
                    [23, 643, 0, 640, 360],
                    [23, 643, 0, 640, 360],
                    [23, 643, 0, 640, 360],
                    [23, 643, 0, 640, 360],
                    [23, 643, 0, 640, 360],
                    [23, 643, 0, 640, 360]
                ],
                loop: !1
            }],
            [13, {
                O: [
                    [24, 643, 0, 640, 360],
                    [24, 1286, 0, 640, 360],
                    [24, 0, 363, 640, 360],
                    [24, 643, 363, 640, 360],
                    [24, 1286, 363, 640, 360],
                    [24, 0, 726, 640, 360],
                    [24, 643, 726, 640, 360],
                    [24, 1286, 726, 640, 360],
                    [24, 0, 1089, 640, 360],
                    [24, 643, 1089, 640, 360],
                    [24, 1286, 1089, 640, 360],
                    [24, 0, 1452, 640, 360],
                    [24, 643, 1452, 640, 360],
                    [24, 1286, 1452, 640, 360],
                    [25, 0, 0, 640, 360],
                    [25, 643, 0, 640, 360],
                    [24, 1286, 1452, 640, 360],
                    [25, 0, 0, 640, 360],
                    [25, 643, 0, 640, 360],
                    [24, 1286, 1452, 640, 360],
                    [25, 0, 0, 640, 360],
                    [25, 643, 0, 640, 360],
                    [24, 1286, 1452, 640, 360],
                    [25, 0, 0, 640, 360]
                ],
                loop: !0
            }]
        ]),
        rh = new Map([
            [7, {
                O: od,
                loop: !0
            }],
            [5, {
                O: [
                    [15, 228, 1284, 225, 318],
                    [15, 456, 1284, 225, 318],
                    [15, 684, 1284, 225, 318],
                    [15, 912, 1284, 225, 318],
                    [15, 1140, 1284, 225, 318],
                    [15, 1368, 1284, 225, 318],
                    [15, 1596, 1284, 225, 318],
                    [15, 0, 1605, 225, 318]
                ],
                loop: !1
            }],
            [9, {
                O: nd.slice(0, 6),
                loop: !1
            }],
            [8, {
                O: nd.slice(6),
                loop: !0
            }],
            [6, {
                O: [
                    [15, 0, 0, 225, 318],
                    [15, 228, 0, 225, 318],
                    [15, 456, 0, 225, 318],
                    [15, 684, 0, 225, 318],
                    [15, 912, 0, 225, 318],
                    [15, 1140, 0, 225, 318],
                    [15, 1140, 0, 225, 318],
                    [15, 1140, 0, 225, 318],
                    [15, 1140, 0, 225, 318],
                    [15, 1368, 0, 225, 318],
                    [15, 1596, 0, 225, 318],
                    [15, 0, 321, 225, 318]
                ],
                loop: !1
            }],
            [0, {
                O: [nd[0]],
                loop: !1
            }],
            [1, {
                O: [
                    [16, 228, 963, 225, 318],
                    [16, 228, 963, 225, 318],
                    [16, 456, 963, 225, 318],
                    [16, 684, 963, 225, 318],
                    [16, 912, 963, 225, 318]
                ],
                loop: !1
            }],
            [10, {
                O: [
                    [16, 1140, 0, 225, 318],
                    [16, 1368, 0, 225, 318],
                    [16, 1596, 0, 225, 318],
                    [16, 0, 321, 225, 318],
                    [16, 228, 321, 225, 318],
                    [16, 456, 321, 225, 318],
                    [16, 684, 321, 225, 318],
                    [16, 912, 321, 225, 318],
                    [16, 1140, 321, 225, 318],
                    [16, 1368, 321, 225, 318],
                    [16, 1596, 321, 225, 318],
                    [16, 912, 321, 225, 318],
                    [16, 1140, 321, 225, 318],
                    [16, 0, 642, 225, 318],
                    [16, 228, 642, 225, 318],
                    [16,
                        456, 642, 225, 318
                    ],
                    [16, 684, 642, 225, 318],
                    [16, 684, 642, 225, 318],
                    [16, 684, 642, 225, 318],
                    [16, 684, 642, 225, 318],
                    [16, 684, 642, 225, 318],
                    [16, 684, 642, 225, 318],
                    [16, 912, 642, 225, 318],
                    [16, 1140, 642, 225, 318],
                    [16, 1368, 642, 225, 318],
                    [16, 1596, 642, 225, 318],
                    [16, 0, 963, 225, 318]
                ],
                loop: !1
            }],
            [13, {
                O: [
                    [16, 1140, 963, 225, 318],
                    [16, 1368, 963, 225, 318],
                    [16, 1596, 963, 225, 318],
                    [16, 0, 1284, 225, 318],
                    [16, 228, 1284, 225, 318],
                    [16, 456, 1284, 225, 318]
                ],
                loop: !1
            }]
        ]);
    var uh = a => {
        let b = new Image;
        b.onerror = b.onload = b.onabort = () => {
            delete sh[th]
        };
        sh[th] = b;
        b.src = `${""}/gen_204?atyp=i&ct=${"doodle"}&cad=${a}&zx=${Date.now()}`;
        th++
    };
    let sh = [],
        th = 0;
    var vh = ["Moz", "ms", "O", "webkit"],
        wh = (a, b, c) => {
            if (a) {
                for (const d of vh) a.style[d + b] = c;
                a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c
            }
        },
        xh = ["", "moz", "ms", "o", "webkit"],
        yh = (a, b) => {
            if (!a) return null;
            for (const d of xh) {
                var c = b;
                d.length > 0 && (c = b.charAt(0).toUpperCase() + b.substr(1));
                c = d + c;
                if (typeof a[c] != "undefined") return c
            }
            return null
        },
        zh = () => window.google && window.google.doodle !== void 0 ? window.google.doodle : null,
        Ah = (a, b) => {
            const c = zh();
            return c && c[a] != void 0 ? c[a] : b
        },
        Bh = a => {
            zh() || (window.google.doodle = {});
            window.google.doodle.pvc = a
        };

    function Ch(a) {
        return a.indexOf("//") == 0 ? "https:" + a : a
    }

    function Dh(a) {
        return Ch(Ah("shortlink", null) || "//www.google.com/?doodle=" + a)
    }
    var Eh = () => {
            const a = Ah("doodle_args", {}).is_dogfood;
            return a != null ? a : !1
        },
        Fh = Ah("hl", "en"),
        Gh = Ah("gl", "");
    kf.test(Fh);
    let Hh = null,
        Ih = null,
        Jh = null;
    var Kh = () => {
            Jh || (window.google && window.google.kEI && window.google.kEI.length ? Jh = window.google.kEI : Ge() && ue(F.url.g, "ei") && (Jh = F.url.g.get("ei")));
            return Jh
        },
        Lh = () => {
            if (!Hh) {
                const a = document.getElementById("hplogoved");
                a ? Hh = a.getAttribute("data-ved") : Ge() && ue(F.url.g, "ved") && (Hh = F.url.g.get("ved"))
            }
            return Hh
        };
    var Mh = Ah("id", "306734893"),
        Oh = pe(new be("https://www.google.com/doodles/halloween-2020"), "hl", Fh).toString();
    new URLSearchParams(window.location.search);
    var Ph = /#(.)(.)(.)/,
        Qh = /^#(?:[0-9a-f]{3}){1,2}$/i;
    const Rh = [new Ze(390.1, 169.5, 406.9, 185.5, 430.7, 194.3, 476, 162.2), new Ze(452.4, 164.3, 455.4, 164.2, 472.5, 162.8, 475.1, 162.6), new Ze(466.6, 183.9, 467.2, 178.4, 472.8, 167.5, 475.7, 162.6)];

    function Sh(a, b, c, d) {
        return new Ze(a, b, a, b, c, d, c, d)
    }
    const Th = [255, 255, 255];
    var Uh = new Map([
        [0, {
            color: "#0000ff",
            Ka: [1, 2035, 520, 8, 32],
            Rc: [Sh(0, -100, 0, 100)],
            Sc: new Ye(50, 180),
            jc: [
                [0, -10],
                [0, 0],
                [0, 16]
            ]
        }],
        [1, {
            color: "#22ff43",
            Ka: [1, 1929, 625, 24, 32],
            jc: [
                [-10, 4],
                [0, 0],
                [10, -12],
                [20, 0]
            ]
        }],
        [2, {
            color: "#ff0000",
            Ka: [1, 1956, 626, 24, 32],
            Rc: [Sh(175, 0, -175, 0)],
            Sc: new Ye(320, 240),
            jc: [
                [-8, 0],
                [0, 0],
                [16, 0]
            ]
        }],
        [3, {
            color: "#ffff00",
            Ka: [1, 2010, 626, 24, 32],
            jc: [
                [-10, -6],
                [0, 0],
                [10, 12],
                [20, 0]
            ]
        }],
        [4, {
            color: "#ff69b4",
            Ka: [1, 1929, 590, 25, 32],
            hc: n.Jd
        }],
        [5, {
            color: "#6bfbfd",
            Ka: [1, 1929, 660, 22, 32]
        }],
        [6, {
            color: "#ffd700",
            Ka: [1, 1957, 590, 18, 32],
            Rc: [Sh(25, -62.5, -25, 0), Sh(-25, 0, 31, -4), Sh(31, -4, -19, 58.5)],
            Sc: new Ye(410, 190),
            hc: n.Ac
        }],
        [8, {
            color: "#b888dd",
            Ka: [1, 1983, 626, 24, 32],
            hc: n.Bc
        }],
        [9, {
            color: "#ffd584",
            Ka: Tc
        }]
    ]);
    for (const a of Uh.values()) {
        var Vh = a.color,
            Wh = Vh;
        if (!Qh.test(Wh)) throw Error("v`" + Wh);
        Wh.length == 4 && (Wh = Wh.replace(Ph, "#$1$1$2$2$3$3"));
        Vh = Wh.toLowerCase();
        const b = parseInt(Vh.slice(1), 16);
        a.Me = [b >> 16, b >> 8 & 255, b & 255]
    };
    var R = class extends r {
            constructor(a) {
                super();
                this.Ua = a;
                this.state = 0;
                this.g = !1
            }
        },
        Xh = class extends r {
            constructor(a, b) {
                super();
                this.state = a;
                this.type = b
            }
        };

    function Yh(a) {
        const b = [];
        for (const c of a) b.push(Zh.get(c));
        return b
    }

    function $h(a) {
        const b = [];
        for (const c of a.ab) b.push(ai.get(c));
        return b.join("")
    }
    var S = class extends r {
            constructor(a, b, c, d, e = !0) {
                super();
                this.ta = e;
                this.Oa = !1;
                this.state = 0;
                this.Ha = 1;
                this.u = () => {};
                this.j = !0;
                this.U = this.N = !1;
                this.i = () => {};
                this.o = () => {};
                this.v = n.ld;
                this.hb = n.nd;
                this.T = 0;
                this.W = 1;
                this.g = vf(b, c, new A(320, 180));
                this.g.x < 320 && (this.Oa = !0);
                this.Db = d * 1E3;
                this.ab = Yh(a)
            }
        },
        Zh = new Map([
            ["|", 0],
            ["^", 1],
            ["-", 2],
            ["v", 3],
            ["z", 6],
            ["o", 5],
            ["3", 4],
            ["@", 8]
        ]),
        ai = new Map([
            [0, "|"],
            [1, "^"],
            [2, "-"],
            [3, "v"],
            [6, "z"],
            [5, "o"],
            [4, "3"],
            [8, "@"]
        ]),
        bi = class extends r {},
        ci = class extends r {
            constructor(a,
                b) {
                super();
                this.i = a;
                this.g = b
            }
        },
        di = class extends r {
            constructor(a) {
                super();
                this.Oa = a
            }
        },
        ei = class extends r {
            constructor(a) {
                super();
                this.ub = a
            }
        },
        fi = class extends r {
            constructor(a) {
                super();
                this.state = a
            }
        },
        gi = class extends r {},
        hi = class extends r {},
        ii = class extends r {
            constructor(a, b = "orange", c = 12, d = "center", e = 500, f = 1, g = "none") {
                super();
                this.text = a;
                this.color = b;
                this.fontSize = c;
                this.j = d;
                this.g = e;
                this.i = f;
                this.background = g
            }
        },
        ji = class extends r {
            constructor(a, b = 0, c = new A(0, 0), d = "orange") {
                super();
                this.type = a;
                this.g =
                    b;
                this.position = c;
                this.color = d
            }
        },
        ki = class extends r {
            constructor() {
                super(...arguments);
                this.Aa = 0
            }
        },
        li = class extends r {},
        mi = class extends r {},
        ni = class extends r {},
        oi = class extends r {},
        pi = class extends r {},
        qi = class extends r {},
        ri = class extends r {
            constructor(a) {
                super();
                this.Tb = a
            }
        },
        si = class extends r {},
        ti = class extends r {},
        ui = class extends r {
            constructor() {
                super(...arguments);
                this.rb = 1
            }
        },
        vi = class extends r {},
        wi = class extends r {},
        xi = class extends r {},
        yi = class extends r {};
    var zi = class extends r {
        constructor(a = [], b = !1) {
            super();
            this.actions = a;
            this.Ie = b
        }
    };

    function T(a, ...b) {
        let c = t(a, zi);
        c || (c = sd(a, new zi));
        c.actions.push(...b)
    };

    function Ai(a) {
        const b = Bi(a);
        let c = 0;
        b && T(a, new Ve(d => {
            c += d;
            d = 1 + .1 * Math.max(0, Math.sin(c / 100));
            b.get(B).scale = new A(d, d)
        }, () => !Ci(b)))
    }

    function Di(a) {
        const b = Bi(a);
        if (b) {
            const c = Ei(b, 2);
            Fi(a);
            c.V = () => {
                Ei(b, 1);
                Ai(a)
            }
        }
    }

    function Gi(a) {
        const b = Hi(a);
        if (b) {
            const c = Ei(b, 3);
            Fi(a);
            c.V = () => {
                Ei(b, 0);
                Ai(a)
            }
        }
    }

    function Bi(a) {
        a = a.get(ei);
        for (let b = a.ub.length - 1; b >= 0; b--) {
            const c = a.ub[b];
            if (Ci(c)) return c
        }
        return null
    }

    function Hi(a) {
        a = a.get(ei);
        for (let b = 0; b < a.ub.length; b++) {
            const c = a.ub[b],
                d = c.get(fi).state;
            if (d === 1 || d === 2) return c
        }
        return null
    }

    function Ci(a) {
        a = a.get(fi).state;
        return a === 0 || a === 3
    }

    function Ei(a, b) {
        a.get(fi).state = b;
        return fh(a, b, jh)
    }

    function Fi(a) {
        a.get(zi).actions = [];
        for (const b of a.get(ei).ub) b.get(B).scale = new A(1, 1)
    }

    function Ii(a, b) {
        b = new u(new B(b), a, new C(new Qd(c => {
            c.save();
            const d = Rg(c, a.text, a.fontSize, a.g, a.i);
            c.font = `${d.fontSize}px ${"'Itim', sans-serif"}`;
            c.fillStyle = a.color;
            c.textAlign = a.j;
            var e = d.fontSize / 4 - (d.lines.length - 1) / 2 * d.fontSize,
                f = d.fontSize;
            const g = c.font;
            c.font = d.fontStyle + " " + d.fontSize + "px " + d.fontFamily;
            for (let k = 0; k < d.lines.length; k++) c.fillText(d.lines[k], 0, e + k * f);
            c.font = g;
            c.restore()
        }), 4, 1));
        if (a.background !== "none") {
            const c = new u(new B(new A(0, -5)), new C(new Qd(d => {
                d.fillStyle = a.background;
                var e = Rg(d, a.text, a.fontSize, a.g, a.i);
                d.font = e.fontStyle + " " + e.fontSize + "px " + e.fontFamily;
                var f = 0;
                for (var g = 0; g < e.lines.length; g++) f = Math.max(f, d.measureText(e.lines[g]).width);
                g = f + 40;
                var k = e.lines.length * a.fontSize + 20;
                e = -k / 2;
                f = -g / 2;
                g /= 2;
                k /= 2;
                d.beginPath();
                d.moveTo(f + 20, e);
                d.lineTo(g - 20, e);
                d.quadraticCurveTo(g, e, g, e + 20);
                d.lineTo(g, k - 20);
                d.quadraticCurveTo(g, k, g - 20, k);
                d.lineTo(f + 20, k);
                d.quadraticCurveTo(f, k, f, k - 20);
                d.lineTo(f, e + 20);
                d.quadraticCurveTo(f, e, f + 20, e);
                d.fill()
            }), 4, 0));
            c.get(C).alpha = .7;
            Fd(b, c)
        }
        return b
    }

    function Ji() {
        let a = 0;
        return new u(new B(new A(470, 180)), new C(new Qd(b => {
            a += 20;
            a / 1500 > 1 && (a = 0);
            var c = Math.min(1, a / 1500);
            b.save();
            b.lineCap = "round";
            b.lineJoin = "round";
            b.lineWidth = 3;
            b.strokeStyle = "white";
            b.translate(-476, -163);
            c *= Rh.length;
            let d = 0;
            for (var e; c >= 0 && d < Rh.length;) {
                e = Rh[d];
                const G = Math.min(c, 1);
                if (G < 1) {
                    var f = e = new Ze(e.u, e.T, e.g, e.j, e.i, e.o, e.v, e.N);
                    if (G != 1) {
                        var g = N(f.u, f.g, G),
                            k = N(f.T, f.j, G),
                            l = N(f.g, f.i, G),
                            p = N(f.j, f.o, G),
                            z = N(f.i, f.v, G),
                            E = N(f.o, f.N, G);
                        f.g = g;
                        f.j = k;
                        g = N(g, l, G);
                        k = N(k, p, G);
                        l =
                            N(l, z, G);
                        p = N(p, E, G);
                        f.i = g;
                        f.o = k;
                        f.v = N(g, l, G);
                        f.N = N(k, p, G)
                    }
                }
                f = b;
                f.save();
                f.beginPath();
                f.moveTo(e.u, e.T);
                f.bezierCurveTo(e.g, e.j, e.i, e.o, e.v, e.N);
                f.stroke();
                f.restore();
                d++;
                c--
            }
            b.restore()
        }), 4))
    };
    const Ki = uc();

    function Li(a, b, c, d) {
        a = a.get(B).position;
        const e = b.get(B).position;
        b = b.get(C).Da.g;
        d = 180 / Math.PI * Math.atan((e.y - (a.y + d)) / Math.abs(e.x - a.x));
        a.x < e.x && (d = 180 - d);
        return vf(d, b.x / 3 + c, e)
    }

    function Mi() {
        return new u(new B, new C(new Qd(a => {
            a.fillStyle = "black";
            a.beginPath();
            a.moveTo(0, 0);
            Ni(a, 0, 0);
            Ni(a, 640, 360, !0);
            a.closePath();
            a.fill()
        }), 4, 2), new li)
    }

    function Oi() {
        return new u(new B, new C(new Qd(a => {
            a.fillStyle = "black";
            a.rect(0, 0, 640, 360);
            a.fill()
        }), 4, 2), new mi)
    }

    function Ni(a, b, c, d = !1) {
        for (let e = 0; e < 640; e++) a.lineTo(b + e * (d ? -1 : 1), c + 15 * (c > 180 ? 1 : -1) + Math.sin(e * .05) * 15)
    }

    function Pi(a, b, c) {
        a = D(Ki, a);
        c = new u(new B(c), new C(a, 4));
        b = Ii(new ii(b, "black", 24, "left", 300), new A(10, a.g.y / 2 + 5));
        b.get(C).Mb = 5;
        Fd(c, b);
        return c
    }

    function Qi(a) {
        let b = 0;
        const c = new A(a.x, 0),
            d = new u(new B, new C(new Qd(e => {
                let f = [a.H(), c];
                f = Ri(f[0], f[1], 3);
                const g = Ri(f[Math.floor(Math.random() * f.length * .2)], null, 2),
                    k = Ri(f[Math.floor(Number(Math.random() * f.length * .5))], null, 2),
                    l = Ri(k[k.length - 1], null, 2),
                    p = Ri(k[k.length - 1], null, 2),
                    z = 8 + Math.cos(3 * b / 1400) * 4;
                e.save();
                e.globalCompositeOperation = "overlay";
                e.shadowColor = "#7fa7fe";
                Si(e, f, z);
                Si(e, g, z * .5);
                Si(e, k, z * .3);
                Si(e, l, z * .2);
                Si(e, p, z * .1);
                e.restore()
            }), 3));
        T(d, new Ve(e => {
            b += e
        }, () => !1));
        return d
    }

    function Si(a, b, c) {
        for (var d = 0; d < b.length - 1; d += 1) {
            var e = b[d],
                f = b[d + 1];
            a.save();
            a.translate(e.x, e.y);
            a.scale(.2, .2);
            const g = f.x - e.x;
            e = f.y - e.y;
            f = Math.sqrt(g * g + e * e);
            a.rotate(Math.atan2(e, g) + Math.PI * .5);
            a.scale(c * 2, f * .14);
            wc(Ki, Oc, a, -10, -40, 1);
            a.restore();
            c -= .5;
            c = Math.max(0, c)
        }
        a.beginPath();
        a.moveTo(b[0].x, b[0].y);
        for (d = 1; d < b.length; d++) a.lineTo(b[d].x, b[d].y);
        a.lineWidth = c;
        a.strokeStyle = "white";
        a.stroke();
        a.closePath()
    }

    function Ri(a, b, c) {
        const d = Math.random() > .5 ? -1 : 1;
        c = Math.pow(2, c) + 1 - 1;
        const e = [a];
        b || (b = new A(a.x + (Math.random() * 20 + 10) * d, a.y + Math.random() * 10 + 30));
        e[c] = b;
        Ti(e, 0, c);
        return e
    }

    function Ti(a, b, c) {
        if (b + 1 !== c) {
            var d = Math.floor((b + c) / 2),
                e = a[b],
                f = a[c];
            a[d] = new A((e.x + f.x) / 2 + (Math.random() * 20 - 10), (e.y + f.y) / 2 + (Math.random() * 10 - 5));
            Ti(a, b, d);
            Ti(a, d, c)
        }
    };
    var U = class extends df {
        constructor(a, b, c, d) {
            super(a, b, c);
            this.U = d
        }
        N(a, b, c) {
            this.U.set(N(a.x, b.x, c), N(a.y, b.y, c))
        }
    };
    const Ui = uc();

    function W(a, b, c, d, e) {
        const f = Vi(b, c, d, e);
        return new I([new J(() => {
            f.get(C).alpha = 0;
            v(a, f)
        }), new M([new ef(500, 0, 1, g => {
            f.get(C).alpha = g
        }), new J(() => {
            Wi(a, f)
        })])])
    }

    function Vi(a, b, c, d, e = Zc[0]) {
        e = D(Ui, e);
        a = new S(a, b, c, d);
        b = new B(a.g.H());
        a.Oa && (b.scale.x *= -1);
        e = new u(a, b, new C(e, 3, 0, y(e.g.H(), -.5)));
        Xi(e);
        return e
    }

    function Xi(a) {
        var b = a.get(S);
        const c = new di(b.Oa);
        b = new B(new A(0, 8));
        c.Oa && (b.scale.x *= -1);
        b = new u(c, b, new C(new Qd(d => {
            var e = a.get(S),
                f = -5;
            for (var g of e.ab) {
                const k = Uh.get(g).Ka;
                f += k[3] + 5
            }
            g = a.get(C).Da.g.x;
            f = -f / 2 + g / 2 + (c.Oa ? -5 : 7);
            for (const k of e.ab) e = Uh.get(k).Ka, wc(Ui, e, d, Math.floor(f), Math.floor(-e[4] / 2 + 10)), f += e[3] + 5
        }), 3, 0, a.get(C).offset.H()));
        Fd(a, b);
        return b
    }

    function Yi(a, b) {
        a.get(S).ab = Yh(b);
        x(Dd(a, di)).get(C).alpha = 1
    }

    function Zi(a, b) {
        const c = a.get(B),
            d = x(Dd(a, di)),
            e = d.get(B);
        c.scale.x = Math.abs(c.scale.x);
        e.scale.x = Math.abs(e.scale.x);
        b < 320 && (c.scale.x *= -1, e.scale.x *= -1, d.get(di).Oa = !0, a.get(S).Oa = !0)
    }

    function Wi(a, b, c = !0, d = 0, e = 0) {
        const f = b.get(S),
            g = b.get(B).position,
            k = x(a.find(R));
        c && T(b, $i(b));
        c = new U(f.Db, g.H(), Li(b, k, d, e), g);
        f.wa = c;
        T(b, new I([c, new J(() => {
            f.state !== 10 && aj(b, a)
        })]))
    }

    function bj(a, b, c) {
        let d = !1;
        const e = b.get(S);
        if (e.ta && a === e.ab[0])
            if (d = !0, v(c, new u(new ji(0, 10, b.get(B).position.H(), Uh.get(a).color))), e.ab.shift(), e.ab.length === 0) {
                e.wa && (e.wa.o = !0, a = t(b, zi)) && (a.actions = []);
                e.u && e.u();
                e.Ha--;
                if (e.Ha !== 0) return cj(b, !0), d;
                if (t(b, wi)) e.i();
                else {
                    const f = Y(b, 10);
                    lc(e.hb, e.W);
                    e.hb.play(e.T);
                    f && (f.V = () => {
                        e.i();
                        e.j && (Gd(b), Hd(b), td(b));
                        f.V = null
                    })
                }
            } else cj(b, !1);
        return d
    }

    function cj(a, b) {
        var c = t(a, Sd);
        c && c.V && c.V();
        const d = Y(a, 1);
        c = a.get(S);
        b && c.U || !d || (d.V = () => {
            t(a, ui) ? a.get(ui).rb === 1 ? Y(a, 7) : Y(a, 8) : Y(a, 0);
            d.V = null
        })
    }

    function $i(a) {
        const b = a.get(C).offset.H();
        let c = 0;
        return new Ve(d => {
            c += d;
            d = x(Dd(a, di)).get(C).offset;
            const e = Math.sin(.8 * c * 2 * Math.PI / 1E3);
            a.get(C).offset.y = e * 6 + b.y;
            d.y = e * 6 + b.y
        }, () => a.g === void 0)
    }

    function aj(a, b) {
        v(b, new u(new hi));
        const c = a.get(S);
        let d;
        d = t(a, ui) ? a.get(ui).rb === 1 ? Y(a, 5) : Y(a, 6) : Y(a, 4);
        c.v.play();
        c.N || (x(Dd(a, di)).get(C).alpha = 0, c.ta = !1);
        d && (d.V = () => {
            c.j ? T(a, new I([new ef(300, 1, 0, e => {
                a.get(C).alpha = e
            }), new J(() => {
                w(b, a)
            })])) : c.o();
            d.V = null
        })
    }

    function Y(a, b) {
        var c = a.get(S);
        if (c.state !== 10) return c.state = b, c = t(a, gi) ? kh : t(a, bi) ? lh : t(a, ci) ? mh : t(a, pi) ? nh : t(a, ti) ? oh : t(a, wi) ? qh : t(a, ui) ? rh : ih, fh(a, b, c)
    };
    var dj = new Map([
        [0, {
            background: {
                O: Dc
            },
            kb: [{
                Pa: [Gc],
                Na: new A(0, 0)
            }, {
                Pa: [...Array(30).fill(Vc[0]), ...Vc.slice(1, 9)],
                Na: new A(-100, -30),
                component: ni
            }],
            Fa: n.xc
        }],
        [1, {
            index: 0,
            name: "level_1",
            background: {
                O: Dc
            },
            kb: [{
                Pa: [Gc],
                Na: new A(0, 0)
            }, {
                Pa: [...Array(30).fill(Vc[0]), ...Vc.slice(1, 9)],
                Na: new A(-100, -30),
                component: ni
            }],
            Fa: n.xc
        }],
        [2, {
            index: 1,
            name: "level_2",
            background: {
                O: [12, 0, 0, 640, 360]
            },
            kb: [{
                Pa: [
                    [9, 0, 1732, 640, 151],
                    [9, 643, 1732, 640, 151],
                    [9, 1286, 1732, 640, 151],
                    [9, 0, 1886, 640, 151],
                    [9, 643, 1886, 640, 151],
                    [9, 1286,
                        1886, 640, 151
                    ],
                    [10, 0, 1732, 640, 151],
                    [10, 643, 1732, 640, 151],
                    [10, 1286, 1732, 640, 151],
                    [10, 0, 1886, 640, 151],
                    [10, 643, 1886, 640, 151],
                    [10, 1286, 1886, 640, 151],
                    [11, 0, 1732, 640, 151],
                    [11, 643, 1732, 640, 151],
                    [11, 1286, 1732, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 643, 1886, 640, 151],
                    [11, 1286, 1886, 640, 151],
                    [12, 643, 0, 640, 151],
                    [12, 1286, 0, 640, 151],
                    [12, 643, 154, 640, 151],
                    [12, 1286, 154, 640, 151],
                    [12, 643, 308, 640, 151],
                    [12, 1286, 308, 640, 151],
                    [12,
                        0, 363, 640, 151
                    ],
                    [12, 643, 462, 640, 151],
                    [12, 1286, 462, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151],
                    [11, 0, 1886, 640, 151]
                ],
                Na: new A(0, 0)
            }],
            Fa: n.od
        }],
        [3, {
            index: 2,
            name: "level_3",
            background: {
                O: [13, 0, 0, 640, 360]
            },
            kb: [{
                Pa: [
                    [13, 0, 1815, 640, 131],
                    [13, 0, 1815, 640, 131],
                    [13, 0, 1815, 640, 131],
                    [13, 643, 1815, 640, 131],
                    [13, 1286, 1815, 640, 131],
                    [14, 1286, 726, 640, 131],
                    [14, 1286, 860, 640, 131],
                    [14, 1286, 994, 640, 131],
                    [14, 0, 1089, 640, 131],
                    [14, 643, 1089, 640, 131],
                    [14, 1286, 1128, 640, 131],
                    [14, 0, 1223, 640,
                        131
                    ],
                    [13, 0, 1815, 640, 131],
                    [13, 0, 1815, 640, 131],
                    [13, 0, 1815, 640, 131],
                    [14, 643, 1223, 640, 131],
                    [14, 643, 1223, 640, 131],
                    [14, 643, 1223, 640, 131],
                    [14, 1286, 1262, 640, 131],
                    [14, 0, 1357, 640, 131],
                    [14, 643, 1357, 640, 131],
                    [14, 1286, 1396, 640, 131],
                    [14, 0, 1491, 640, 131],
                    [14, 643, 1491, 640, 131],
                    [14, 1286, 1530, 640, 131],
                    [14, 0, 1625, 640, 131],
                    [14, 643, 1625, 640, 131],
                    [14, 1286, 1664, 640, 131],
                    [14, 643, 1223, 640, 131]
                ],
                Na: new A(0, 229)
            }],
            Fa: n.qd
        }],
        [4, {
            index: 3,
            name: "level_4",
            background: {
                O: [17, 0, 0, 640, 360]
            },
            kb: [],
            Fa: n.rd
        }],
        [5, {
            index: 4,
            name: "level_5",
            background: {
                O: [21, 0, 0, 1600, 900],
                Na: new A(320, 180),
                Qe: !0,
                component: yi
            },
            kb: [],
            Fa: n.ud
        }]
    ]);
    const ej = [5, 6, 7, 8, 9, 11, 12, 16, 17, 18];
    let fj = 0,
        gj = 0,
        hj = !1,
        ij = {},
        jj = [];
    var lj = () => {
            gj = Date.now();
            ij.d = Mh;
            !hj && Ne() && (hj = !0, kj(10))
        },
        mj = (a, b) => {
            ij[a] = b;
            !jj.includes(a) && jj.push(a)
        },
        kj = a => {
            var b = Date.now();
            ij.dt = b - gj;
            gj = b;
            a == 0 && (fj = b);
            ij.e = a;
            ij.t = fj == 0 ? -1 : Math.floor(b - fj);
            ij.l = Be() ? 0 : 1;
            b = [];
            for (var c in ij) ij.hasOwnProperty(c) && b.push(c + ":" + ij[c]);
            c = b.join(",");
            b = a == 10;
            var d = ej.indexOf(a) >= 0;
            De() && (c += "&ntp=1");
            b ? (b = Lh()) && (c += `&ved=${b}`) : d && (Ih || ((b = document.getElementById("hplogoshareved")) ? Ih = b.getAttribute("data-ved") : Ge() && ue(F.url.g, "sved") && (Ih = F.url.g.get("sved"))),
                (b = Ih) && (c += `&ved=${b}`));
            c.search("&ei=") == -1 && (c += "&ei=", (b = Kh()) && (c += b));
            for (window.google && window.google.log ? window.google.log("doodle", c) : uh(c); jj.length > 0;) delete ij[jj.pop()];
            hj || a != 0 || Ne() || (hj = !0, kj(10))
        };

    function nj(a, b) {
        a.g.has(b) || (ij.c = b, kj(1), a.g.add(b))
    }

    function oj(a) {
        var b = pj;
        nj(b, qj.get(a));
        mj("d3", a);
        b.log(108)
    }

    function rj(a) {
        var b = pj;
        mj("d3", a);
        b.log(110)
    }
    var sj = new class {
        constructor() {
            this.g = new Set;
            this.i = new Set;
            lj()
        }
        log(a) {
            kj(a);
            this.i.add(a)
        }
    };
    const tj = new Map([
            [0, 3],
            [1, 4],
            [2, 5],
            [3, 6],
            [4, 7],
            [5, 8]
        ]),
        qj = new Map([
            [0, 10],
            [1, 11],
            [2, 12]
        ]);

    function uj(a, b, c = !0, d = !0) {
        const e = a.get(R);
        if (e.state !== 12 && e.state !== 18 && e.state !== 19 && e.state !== 10) return e.state = b, b = fh(a, b, gh, d), c && (b.V = () => {
            uj(a, 0)
        }), b
    }

    function vj(a, b, c = !0) {
        var d = Dd(a, ri);
        d.length !== 0 && (d = x(d), d.get(C).alpha = 1, b = fh(d, b, hh, !1), b.offset = d.get(C).offset.H(), c && (b.V = () => {
            vj(a, 0)
        }))
    };
    const wj = uc();

    function xj(a, b, c) {
        a.x = b;
        a.y = c;
        a.scale = Math.random() * .8;
        a.speed = .5 * Math.random() + .9;
        a.g = Math.random() + 2;
        a.j = -.2;
        a.o = Math.random() * 2 * Math.PI
    }
    var yj = class {
        constructor() {
            this.v = this.u = this.y = this.x = this.i = 0;
            this.scale = Math.random() * .8;
            this.speed = .5 * Math.random() + .9;
            this.g = Math.random() + 2;
            this.j = -.2;
            this.o = Math.random() * 2 * Math.PI
        }
        update(a, b, c) {
            this.u = b;
            this.v = c;
            this.i = a;
            this.x += Math.cos(this.o) * this.speed;
            this.y += Math.sin(this.o) * this.speed;
            this.y += this.j;
            this.g -= .05;
            this.j += .04;
            this.g <= 2 && xj(this, this.u, this.v)
        }
    };

    function zj(a, b) {
        b = b.getBoundingClientRect();
        const c = b.width > b.height;
        if (b.width === b.height) throw Error("w");
        return c === !0 ? new A((a.pageX - b.x) / (b.width / 640), (a.pageY - b.y) / (b.height / 360)) : c ? new A((b.height - a.pageY + b.y) / (b.height / 640), (a.pageX - b.x) / (b.width / 360)) : new A((a.pageY - b.y) / (b.height / 640), (b.width - a.pageX + b.x) / (b.width / 360))
    };
    var Aj = class extends Cd {
        constructor(a, b, c) {
            super(a);
            this.j = b;
            this.N = c;
            this.u = this.v = this.i = !1;
            this.o = new A(0, 0);
            const d = e => {
                this.u = this.i = !1;
                Id(this.o, zj(e, this.j))
            };
            this.j.addEventListener("pointerdown", e => {
                this.i = !0;
                Id(this.o, zj(e, this.j))
            });
            this.j.addEventListener("pointermove", e => {
                this.u = !0;
                Id(this.o, zj(e, this.j))
            });
            this.j.addEventListener("pointerup", e => {
                d(e)
            });
            this.j.addEventListener("pointercancel", e => {
                d(e)
            });
            this.j.addEventListener("pointerout", e => {
                d(e)
            });
            this.N.addEventListener("keydown",
                e => {
                    e.code === "Space" && (this.i = !0)
                });
            this.N.addEventListener("keyup", e => {
                e.code === "Space" && (this.i = !1)
            })
        }
        update() {
            this.v = this.i
        }
    };

    function Bj(a, b) {
        a.kc = !1;
        a.ta && (a.ta = !1, a.j = b.H(), a.rc = Date.now(), (b = Cj(a)) ? (a.oc = b.Ja, v(a.g, new u(new Xh(2, a.oc)))) : v(a.g, new u(new Xh(3))))
    }

    function Cj(a) {
        if (a.Gb < 2 || a.i.length < 2) return null;
        var b = a.v.H().sub(a.o),
            c = b.length(),
            d = a.o.y,
            e = a.v.y;
        const f = a.o.x,
            g = b.x / 2,
            k = b.y / 2;
        var l = b.y / 3,
            p = We(c / 320, 1);
        const z = a.Gb / ((g + k) / 2) > 15;
        if (a.N.has(2) && b.x / b.y > 3 && a.Ga <= 1) return {
            Ja: 2,
            confidence: p
        };
        if (a.N.has(0) && a.Ga < 3 && (b.y / b.x > 3 && a.W < 2 || b.y / b.x > 5 && a.W < 4)) return {
            Ja: 0,
            confidence: p
        };
        const E = [
                [0],
                [0, 0],
                [0, 0, 0]
            ],
            G = [
                [0],
                [0, 0],
                [0, 0, 0]
            ];
        if (b.y > 0)
            for (let za = 0, Ml = a.i.length; za < Ml - 1; za++) {
                var X = a.i[za];
                const Nh = a.lc[za];
                var V = (X.y - d) / b.y;
                for (let eb = 0; eb < E.length; eb++) E[eb][Math.floor(We(V *
                    (eb + 1), eb))] += Nh;
                X = (X.x - f) / b.x;
                for (V = 0; V < G.length; V++) G[V][Math.floor(We(X * (V + 1), V))] += Nh
            }
        if (a.j.H().sub(a.u).length() < c / 3.75 && !z) return c = a.Ga, d = a.W, a.N.has(9) && d >= 4 ? {
            Ja: 9,
            confidence: p
        } : a.N.has(4) && c >= 4 ? {
            Ja: 4,
            confidence: p
        } : a.N.has(5) ? {
            Ja: 5,
            confidence: p
        } : null;
        if (a.N.has(8) && (b = new A(a.o.x + g, a.o.y + k), b = Math.sqrt(Math.pow(a.u.x - b.x, 2) + Math.pow(a.u.y - b.y, 2)) < Math.sqrt(Math.pow(a.j.x - b.x, 2) + Math.pow(a.j.y - b.y, 2)) ? a.u : a.j, b = Math.min(a.v.x - b.x, a.v.y - b.y, b.x - a.o.x, b.y - a.o.y) / c > .08 ? {
                Ja: 8,
                confidence: p
            } : null)) return b;
        if (a.N.has(6) && (a.W === 3 || E[2][1] > E[0][0] * .4 && (a.u.y < d + l && a.j.y > e - l || a.j.y < d + l && a.u.y > e - l))) return {
            Ja: 6,
            confidence: p
        };
        c /= 6;
        l = a.ya.H().sub(a.u);
        p = l.length();
        e = a.j.H().sub(a.ya);
        d = e.length();
        if (p > c && d > c && (l = Xe(l.x, l.y), e = Xe(e.x, e.y), l > 270 && e < 90 || l > 180 && l < 270 && e > 90 && e < 180) && (p = We(1 - Math.abs(p - Math.min(p, d)) / p, 1), a.N.has(1))) return {
            Ja: 1,
            confidence: p
        };
        l = a.wa.H().sub(a.u);
        p = l.length();
        e = a.j.H().sub(a.wa);
        d = e.length();
        return a.N.has(3) && p > c && d > c && (a = Xe(l.x, l.y), c = Xe(e.x, e.y), a < 90 && c > 270 || a > 90 && a < 180 && c > 180 &&
            c < 270) ? (p = We(1 - Math.abs(p - Math.min(p, d)) / p, 1), {
            Ja: 3,
            confidence: p
        }) : null
    }
    var Ej = class extends Cd {
        constructor(a) {
            super(a);
            this.i = [];
            this.nc = [];
            this.lc = [];
            this.Gb = 0;
            this.u = new A(0, 0);
            this.j = new A(0, 0);
            this.o = new A(0, 0);
            this.v = new A(0, 0);
            this.ya = new A(0, 0);
            this.wa = new A(0, 0);
            this.U = this.T = this.qb = this.ob = this.Ga = this.W = 0;
            this.kc = this.ta = !1;
            this.oc = 0;
            this.rc = Date.now();
            this.N = new Set;
            this.Ia = [];
            if (Dj)
                for (a = 0; a < 100; a++) this.Ia.push(new yj);
            v(this.g, new u(new B(new A(0, 0)), new C(new Qd(b => {
                b.save();
                var c = Date.now() - this.rc,
                    d = !this.ta && c < 500;
                if (this.ta || d)
                    if (d && (b.globalAlpha =
                            1 - c / 500), this.u && this.i.length) {
                        (d = Cj(this)) ? (c = Uh.get(d.Ja).Me, d = d.confidence, d = We(d, 1), c = "rgb(" + [Math.round(Th[0] + d * (c[0] - Th[0])), Math.round(Th[1] + d * (c[1] - Th[1])), Math.round(Th[2] + d * (c[2] - Th[2]))].join() + ")") : c = "white";
                        b.strokeStyle = c;
                        b.lineWidth = 10;
                        b.lineCap = "round";
                        b.beginPath();
                        b.moveTo(this.u.x, this.u.y);
                        c = this.i.length;
                        for (d = 0; d < c - 2; d++) b.quadraticCurveTo(this.i[d].x, this.i[d].y, (this.i[d].x + this.i[d + 1].x) / 2, (this.i[d].y + this.i[d + 1].y) / 2);
                        c > 1 && b.quadraticCurveTo(this.i[c - 2].x, this.i[c - 2].y,
                            this.i[c - 1].x, this.i[c - 1].y);
                        b.stroke();
                        c = this.i.length;
                        if (c > 0 && (b.beginPath(), b.arc(this.i[c - 1].x, this.i[c - 1].y, 10, 0, 2 * Math.PI), b.fillStyle = "white", b.fill(), Dj)) {
                            b.globalCompositeOperation = "lighter";
                            d = c - 1;
                            c = this.j.x - (d > 0 ? this.i[d - 1].x : 0);
                            d = this.j.y - (d > 0 ? this.i[d - 1].y : 0);
                            c = Math.sqrt(c * c + d * d);
                            c = Math.min(c, 1.5);
                            for (let f = 0; f < this.Ia.length; f++) {
                                if (this.ta) {
                                    d = this.Ia[f];
                                    var e = b;
                                    e.save();
                                    e.globalAlpha = .2 * Math.sin(d.g) * d.g;
                                    let g = d.i * (.5 - 2 * d.scale + d.i * .2);
                                    wc(wj, Jc, e, d.x - 4, d.y - 4, g * .1, !0);
                                    e.globalAlpha = d.g *
                                        .5 + d.i * .2;
                                    g = Math.sin(d.x) + .15 * d.scale + d.i * .2;
                                    wc(wj, Rc, e, d.x - 4, d.y - 4, .3 * g, !0);
                                    e.restore()
                                }
                                this.Ia[f].update(c, this.j.x, this.j.y)
                            }
                        }
                    } b.restore()
            }), 5)))
        }
        update() {
            var a = x(Ad(this.g, Aj));
            const b = a.o;
            if (a.i && !a.v) {
                this.i = [];
                this.lc = [];
                this.Gb = 0;
                this.o.x = 640;
                this.o.y = 360;
                this.v.x = 0;
                this.v.y = 0;
                this.ya.y = 360;
                this.U = this.T = this.qb = this.ob = this.Ga = this.W = this.wa.y = 0;
                for (a = 0; a < this.Ia.length; a++) xj(this.Ia[a], b.x, b.y);
                this.nc = [];
                this.ta = !0;
                this.u = b.H();
                v(this.g, new u(new Xh(0)))
            } else if (a.i && this.ta && a.u) {
                a = b.x;
                var c = b.y;
                if (a < 8 || c < 8 || a > 632 || c > 352) Bj(this, b);
                else {
                    a = b.x;
                    c = b.y;
                    this.i.push(new A(a, c));
                    this.nc.push(new A(a, c));
                    var d = this.i.length - 1;
                    if (d > 0) {
                        d = this.i[d - 1];
                        var e = d.y - c,
                            f = Math.abs(e);
                        this.qb === 0 && f > 3 ? (this.Ga++, this.qb = e / f) : e * this.qb < 0 ? (this.U += f, this.U > 12 && (this.Ga++, this.U = 0, this.qb = e / f)) : e * this.qb > 0 && (this.U -= f, this.U < -6 && (this.U = 0));
                        e = d.x - a;
                        f = Math.abs(e);
                        this.ob === 0 && f > 3.75 ? (this.W++, this.ob = e / f) : e * this.ob < 0 ? (this.T += f, this.T > 15 && (this.W++, this.T = 0, this.ob = e / f)) : e * this.ob > 0 && (this.T -= f, this.T <
                            -7.5 && (this.T = 0));
                        d = Math.sqrt(Math.pow(a - d.x, 2) + Math.pow(c - d.y, 2));
                        this.lc.push(d);
                        this.Gb += d
                    }
                    this.o.x = Math.min(this.o.x, a);
                    this.o.y = Math.min(this.o.y, c);
                    this.v.x = Math.max(this.v.x, a);
                    this.v.y = Math.max(this.v.y, c);
                    c > this.wa.y && (this.wa.x = a, this.wa.y = c);
                    c < this.ya.y && (this.ya.x = a, this.ya.y = c);
                    this.j = b.H();
                    this.kc || (v(this.g, new u(new Xh(1))), this.kc = !0)
                }
            } else a.v && !a.i && Bj(this, b)
        }
    };
    const Dj = !Ae();
    const Fj = $g();
    var Gj = class extends Cd {
        constructor(a) {
            super(a);
            this.actions = new u;
            v(this.g, this.actions)
        }
        update() {
            for (const a of this.g.find(hi)) {
                const b = x(this.g.find(R)),
                    c = b.get(R),
                    d = x(this.g.find(ei)),
                    e = [new J(() => {
                        const f = this;
                        return m(function*() {
                            c.Ua = Math.max(0, --c.Ua);
                            Di(d);
                            c.g = !0;
                            if (c.Ua <= 0) {
                                x(Dd(b, oi)).get(C).alpha = 0;
                                var g = b.get(B).position,
                                    k = b.get(C).Da;
                                const l = uj(b, 16, !1);
                                l && (l.offset = y(k.g.H(), -.5).add(new A(-39.5, .5)));
                                vj(b, 16);
                                n.jd.play();
                                T(b, new I([new L(500), new U(1E3, g.H(), new A(g.x, 450), g)]));
                                g = Dd(b, ri);
                                g.length > 0 && (g = x(g), k = g.get(B).position, T(g, new I([new L(500), new U(1E3, k.H(), new A(k.x, 450), k)])));
                                ch(Fj, 0)
                            } else uj(b, 1), vj(b, 1), f.g.find(gi).length === 0 && (g = Vi("3", 160, 295, 0, $c[0]), sd(g, new gi), fh(g, 0, kh), T(g, $i(g)), v(f.g, g))
                        })
                    }), new L(150), new J(() => {
                        c.g = !1
                    })];
                T(this.actions, new I([new L(200), H(() => c.g || c.state === 1 ? new J(() => {}) : new I(e))]));
                w(this.g, a)
            }
        }
    };
    const Hj = uc();

    function Ij(a) {
        a.v = !0;
        const b = a.o.get(C),
            c = x(Dd(a.o, ii)).get(C);
        T(a.actions, new I([new M([wf(b, 500, 1, 0), wf(c, 500, 1, 0)]), new L(500), new J(() => {
            a.v = !1
        })]))
    }

    function Jj(a) {
        const b = a.o.get(C),
            c = x(Dd(a.o, ii)).get(C);
        T(a.actions, wf(b, 200, 0, .6), wf(c, 200, 0, 1))
    }

    function Kj(a, b) {
        const c = Ii(new ii(`+ ${b.g * a.i}`, b.color, 24, "center"), b.position.H());
        v(a.g, c);
        T(c, new M([new U(400, b.position.H(), new A(b.position.x, b.position.y - 60), c.get(B).position), new ef(400, 1, 0, d => {
            c.get(C).alpha = d
        })]))
    }

    function Lj(a, b) {
        var c = a.j.get(ki);
        const d = c.Aa;
        b = b.g * a.i + d;
        c.Aa = b;
        if (c = t(a.j, zi)) c.actions = [];
        T(a.j, new ef(300, d, b, e => {
            a.j.get(ii).text = String(Math.floor(e))
        }))
    }
    var Nj = class extends Cd {
        constructor(a) {
            super(a);
            this.actions = new u;
            this.u = this.i = 0;
            this.v = !1;
            this.Oc = Mj[0];
            a = D(Hj, Cc);
            var b = new C(a, 1, 2);
            b.offset = y(a.g.H(), -.5);
            b.alpha = 0;
            a = new u(new B(new A(320, 320), 0, new A(.5, .5)), b);
            b = Ii(new ii("x 2", "orange", 64, "center"), new A(-10, 10));
            b.get(C).alpha = 0;
            Fd(a, b);
            this.o = a;
            v(this.g, this.o);
            v(this.g, this.actions);
            this.j = Ii(new ii("0", "orange", 40, "right"), new A(630, 25));
            sd(this.j, new ki);
            this.j.get(C).alpha = 0;
            v(this.g, this.j)
        }
        update(a) {
            this.u += a;
            this.u > 500 && this.i >=
                2 && !this.v && Ij(this);
            for (const b of this.g.find(ji)) {
                a = b.get(ji);
                if (a.type === 0) {
                    this.u >= 1E3 && (this.i = 0);
                    this.i++;
                    x(Dd(this.o, ii)).get(ii).text = `x ${this.i}`;
                    this.i === 2 && Jj(this);
                    if (this.i > 2 && this.u > 500) {
                        this.v = !1;
                        const c = t(this.actions, zi);
                        c && (c.actions = []);
                        Jj(this)
                    }
                    Kj(this, a);
                    Lj(this, a);
                    this.u = 0
                } else a.type === 1 && (this.i = 0);
                w(this.g, b);
                this.Oc = Mj[this.i % Mj.length]
            }
        }
    };
    const Mj = [n.Ed, n.Fd, n.Gd, n.Hd, n.Id];

    function Oj(a, b) {
        const c = x(a.g.find(R));
        var d = a.g.find(ri),
            e = !1;
        if (b === 9 && d.length !== 0) {
            const k = x(d);
            d = k.get(ri);
            if (d.Tb) {
                e = !0;
                const l = uj(c, 10, !1, !1);
                if (l) {
                    var f = c.get(C).Da.g;
                    l.offset = y(f.H(), -.5).add(new A(-40, -20));
                    k.get(C).alpha = 0;
                    l.V = () => {
                        k.get(C).alpha = 1;
                        c.get(R).state = 0;
                        uj(c, 0);
                        l.V = null
                    }
                }
                v(a.g, new u(new qi));
                f = x(Dd(k, si));
                Gd(f);
                Hd(f);
                td(f);
                d.Tb = !1
            }
        }
        d = !1;
        for (const k of a.g.find(S))
            if (f = bj(b, k, a.g), d || (d = f), t(k, gi) && b === 4 && (c.get(R).Ua++, Gi(x(a.g.find(ei)))), b === 6 && f) {
                f = k.get(B).position;
                const l =
                    Qi(f.H());
                v(a.g, l);
                T(l, new I([new L(500), new J(() => {
                    w(a.g, l)
                })]))
            } if (d) {
            uj(c, Pj.get(b));
            var g;
            (e = (g = Uh.get(b)) == null ? void 0 : g.hc) ? e.play(): x(Ad(a.g, Nj)).Oc.play();
            b === 8 && Qj(a)
        } else e || v(a.g, new u(new Xh(4)))
    }

    function Qj(a) {
        const b = D(uc(), qd[0]),
            c = Rd(uc(), qd, !1);
        c.offset = y(b.g.H(), -.5);
        const d = new u(new B(new A(320, 180)), new C(b, 4, 0, y(b.g.H(), -.5)), c);
        v(a.g, d);
        c.V = () => {
            w(a.g, d);
            c.V = null
        }
    }
    var Rj = class extends Cd {
        update() {
            for (const b of this.g.find(Xh)) {
                var a = b.get(Xh);
                switch (a.state) {
                    case 0:
                        a = x(this.g.find(R));
                        uj(a, 14, !1);
                        break;
                    case 2:
                        Oj(this, a.type);
                        break;
                    case 3:
                        a = x(this.g.find(R));
                        uj(a, 0);
                        v(this.g, new u(new ji(1)));
                        break;
                    case 4:
                        a = x(this.g.find(R)), uj(a, 0), v(this.g, new u(new ji(1)))
                }
                w(this.g, b)
            }
        }
    };
    const Pj = new Map([
        [2, 4],
        [0, 2],
        [1, 3],
        [3, 5],
        [6, 7],
        [8, 8],
        [5, 9],
        [4, 6],
        [9, 10]
    ]);
    var Sj = class extends Cd {
        update(a) {
            for (const b of this.g.find(zi)) {
                const {
                    actions: c,
                    Ie: d
                } = b.get(zi);
                for (let e = c.length - 1; e >= 0; e--) c[e].update(a), c[e].Xa() && c.splice(e, 1);
                c.length === 0 && d && w(this.g, b)
            }
        }
    };

    function Tj() {
        let a, b;
        const c = new Promise((d, e) => {
            a = d;
            b = e
        });
        return new Uj(c, a, b)
    }

    function Vj(a) {
        a.g = !0;
        a.i && (clearTimeout(a.i), a.i = void 0)
    }
    var Uj = class {
        constructor(a, b, c) {
            this.promise = a;
            this.o = b;
            this.j = c;
            this.g = !1
        }
        resolve(a) {
            this.g || (Vj(this), this.o(a))
        }
        reject(a) {
            this.g || (Vj(this), this.j(a))
        }
    };
    const Wj = uc(),
        Xj = $g(),
        Bf = oc.Rb();

    function Yj(a, b = new A(320, 500), c = !0) {
        var d = v,
            e = a.g,
            f = D(Wj, Xc[0]);
        b = b.H();
        var g = new R(a.ka.nb);
        f = new u(new B(b), new C(f, 2, 1, y(f.g.H(), -.5)), g);
        b = D(Wj, Ec);
        b = new u(new B(new A(-12, 58)), new C(b, 2, 0, y(b.g.H(), -.5)), new oi);
        Fd(f, b);
        uj(f, 0);
        d(e, f);
        d = v;
        e = a.g;
        f = new u(new B(new A(30, 20)));
        b = [];
        g = x(a.g.find(R)).get(R).Ua;
        for (let l = 0; l < 5; l++) {
            var k = l < g;
            const p = k ? D(Wj, Kc) : D(Wj, Lc);
            k = new u(new B(new A(p.g.x * l, 0)), new C(p, 4, 0, y(p.g.H(), -.5)), new fi(k ? 0 : 1));
            b.push(k);
            Fd(f, k)
        }
        sd(f, new ei(b));
        Ai(f);
        d(e, f);
        if (d = dj.get(a.ka.level)) {
            e =
                d.background;
            f = D(Wj, e.O);
            f = new u(new B(e.Na ? e.Na : new A(0, 0)), new C(f, 0, 0, e.Qe ? y(f.g.H(), -.5) : new A(0, 0)));
            e.component && sd(f, new e.component);
            v(a.g, f);
            for (const l of d.kb) d = Rd(Wj, l.Pa, !0), d = new u(new B(l.Na), new C(D(Wj, l.Pa[0]), 1), d), l.component && sd(d, new l.component), v(a.g, d)
        }
        c && v(a.g, Oi());
        (c = dj.get(a.ka.level)) && c.Fa && (a.Fa = c.Fa, a.Fa.play(0, !0))
    }

    function Zj(a) {
        return m(function*() {
            const b = Tj();
            a.j(b);
            var c = a.ka.nb,
                d = a.ka.Aa;
            mj("d2", a.ka.level);
            mj("d4", c);
            ij.s = d;
            sj.log(102);
            yield b.promise
        })
    }

    function ak(a) {
        for (const b of a.g.g) b.enabled = !1
    }

    function bk(a) {
        for (const b of Ad(a.g, ...ck)) b.enabled = !1
    }

    function dk(a) {
        for (const b of ck) x(Ad(a.g, b)).enabled = !0
    }

    function ek(a) {
        for (const d of a.g.find(qi)) w(a.g, d);
        const b = document.querySelector(".ddl-game-canvas").getContext("2d"),
            c = new u;
        v(a.g, c);
        T(c, new I([new ef(500, 50, 100, d => {
            b.filter = `saturate(${d}%)`
        }), new J(() => {
            var d = Bf.g;
            xf || zf(d);
            xf.frequency.exponentialRampToValueAtTime(xf.frequency.maxValue, d.currentTime + 1.5);
            w(a.g, c)
        })]))
    }

    function fk(a, b) {
        const c = new u(new B, new C(D(Wj, Uc)), new qi),
            d = Rd(Wj, md, !1),
            e = D(Wj, md[0]),
            f = new u(new B(new A(100, 0)), new C(e), d, new qi);
        b && (b = y(e.g.H(), -.5), Id(f.get(C).offset, b), Id(d.offset, b), f.get(B).position = new A(340, 180), f.get(B).rotation = -Math.PI / 3.97);
        v(a.g, c);
        v(a.g, f);
        Af();
        const g = document.querySelector(".ddl-game-canvas").getContext("2d");
        T(c, new ef(500, 100, 50, k => {
            g.filter = `saturate(${k}%)`
        }));
        n.Fc.play();
        return f
    }

    function gk(a) {
        return a.g.find(S).filter(b => !t(b, gi)).length === 0
    }

    function hk(a, b) {
        return new J(() => {
            a.finished = !0;
            b.resolve()
        })
    }

    function ik(a) {
        const b = a.g.find(ki),
            c = a.g.find(R);
        b.length !== 0 && c.length !== 0 && (a.ka.Aa = x(b).get(ki).Aa, a.ka.nb = x(c).get(R).Ua)
    }

    function jk(a, b) {
        return new J(() => {
            ik(a);
            b.resolve()
        })
    }

    function kk(a) {
        x(a.g.find(ki)).get(ki).Aa = a.ka.Aa;
        x(a.g.find(ki)).get(ii).text = String(a.ka.Aa);
        x(a.g.find(R)).get(R).Ua = a.ka.nb
    }

    function lk(a, b = !0, c = new A(320, 180), d = !0) {
        return H(() => {
            const e = Mi();
            var f = e.get(B).position;
            f.y = b ? -15 : 360;
            const g = b ? -390 : 0,
                k = x(a.g.find(R)),
                l = k.get(R),
                p = k.get(B).position,
                z = b ? c : new A(320, -100);
            let E = !1;
            const G = [];
            f = new I([new J(() => {
                for (const X of a.g.find(li)) w(a.g, X);
                v(a.g, e);
                for (const X of a.g.find(mi)) w(a.g, X)
            }), new U(1200, f.H(), new A(0, g), f)]);
            b && G.push(f);
            d && G.push(new M([new J(() => {
                x(Dd(k, oi)).get(C).alpha = 0;
                let X;
                b ? (X = uj(k, 18, !1), n.kd.play(0, !1, 550)) : (X = uj(k, 19, !1), lc(n.tc, .5), n.tc.play());
                const V = k.get(C).Da;
                X && (X.offset = y(V.g.H(), -.5).add(new A(8.5, -8)), X.V = () => {
                    E = !0;
                    l.state = 0;
                    X.V = null
                })
            }), new U(1E3, p.H(), z, p)]), new K(() => E), new J(() => {
                x(Dd(k, oi)).get(C).alpha = 1;
                uj(k, 0)
            }));
            b || G.push(f);
            return new I(G)
        })
    }

    function mk(a, b, c = !0) {
        return new J(() => {
            for (const d of a.g.find(fi)) d.get(C).alpha = b ? 1 : 0;
            x(a.g.find(ki)).get(C).alpha = b ? 1 : 0;
            ch(Xj, b ? 6 : 5, c)
        })
    }

    function nk(a) {
        var b = new A(-320, 10);
        const c = new A(-320, 67);
        var d = Pi(Hc, O("banner_ready"), b);
        const e = Pi(Ic, O("banner_set"), c),
            f = Ii(new ii(O("banner_draw"), "white", 32, "center", 200, 1, "black"), new A(320, 60));
        v(a.g, d);
        v(a.g, e);
        d = [];
        d.push(...ok(a));
        b = [new U(500, b.H(), new A(0, b.y), b), new L(500), new U(500, c.H(), new A(0, c.y), c), new L(500), new J(() => {
            v(a.g, f)
        }), new L(200), new M([new U(300, new A(0, b.y), new A(-320, b.y), b), new U(300, new A(0, c.y), new A(-320, c.y), c)]), new L(900), new J(() => {
            w(a.g, f)
        })];
        d.push(...b);
        return new I(d)
    }

    function pk(a) {
        return new I([lk(a, !1, new A(320, 180))])
    }

    function qk(a) {
        const b = new Zg(document.querySelector("#ddlContentRoot"), dj.get(a.ka.level).index || 0);
        return new I([new J(() => {
            Ug(b)
        }), new L(4500), new J(() => {
            Vg(b)
        }), new L(1E3)])
    }

    function ok(a) {
        const b = [],
            c = dj.get(a.ka.level);
        if (c && c.name) {
            const d = Ii(new ii(O(c.name), "white", 32, "center", 200, 1, "black"), new A(320, 60));
            b.push(new J(() => {
                v(a.g, d)
            }), new L(1E3), new J(() => {
                w(a.g, d)
            }))
        }
        return b
    }

    function rk(a) {
        return new I([new J(() => {
            let b;
            (b = a.Fa) == null || b.stop();
            n.vd.play()
        }), new L(400), new J(() => {
            const b = x(a.g.find(R)),
                c = uj(b, 12, !1);
            vj(b, 12, !1);
            n.Ad.play(100);
            n.Bd.play(1E3);
            c && (c.V = () => {
                b.get(R).state = 0;
                c.V = null
            })
        }), new L(1E3)])
    }
    var tk = class {
        constructor(a) {
            this.ka = a;
            this.finished = !1;
            const b = document.querySelector(".ddl-game-canvas"),
                c = b.getContext("2d"),
                d = new Bd,
                e = new Ej(d);
            e.N = sk;
            d.g = [new Sj(d), e, new Rj(d), new Gj(d), new Nj(d), new Aj(d, b, b), new Yd(d), new Xd(d, c)];
            v(d, new u(new B, new Nd));
            this.g = d;
            this.actions = new u(new zi);
            v(this.g, this.actions);
            a = a.level;
            nj(sj, tj.get(a));
            mj("d2", a);
            sj.log(101)
        }
        start() {
            const a = this;
            return m(function*() {
                const b = Tj();
                a.o(b);
                yield b.promise
            })
        }
        update(a) {
            this.g.update(a)
        }
        Xa() {
            return this.finished
        }
        W() {
            return !1
        }
    };
    const sk = new Set([2, 0, 1, 3, 4, 6, 8, 9]),
        ck = [Rj, Gj, Nj];
    const uk = uc();

    function vk(a, b, c = !1) {
        return new J(() => {
            if (!(a.g.find(si).length > 0)) {
                var d = x(a.g.find(ri));
                d.get(ri).Tb = !0;
                var e = d.get(C).offset;
                var f = b === 0 ? e.H().add(new A(30, -50)) : e.H().add(new A(-50, 30));
                e = new A(0, 0);
                c && (e = new A(300, -360));
                var g = new u(new B(c ? e : f), new C(D(uk, Tc), 2), new si);
                g.get(B).scale = c ? new A(2.5, 2.5) : new A(1.25, 1.25);
                var k = g.get(C).alpha = 0;
                T(g, new I([H(() => {
                    const l = g.get(B).position;
                    return c ? new I([wf(g.get(C), 1E3, 0, 1), new M([new U(1300, l.H(), f, l), new ef(1300, 2.5, 1.25, p => {
                        g.get(B).scale = new A(p,
                            p)
                    })])]) : new J(() => {
                        g.get(C).alpha = 1
                    })
                }), new Ve(l => {
                    k += l;
                    g.get(C).alpha = Math.sin(k / 2E3 * 2 * Math.PI) * .25 + .75
                }, () => !1)]));
                Fd(d, g)
            }
        })
    }

    function wk(a) {
        return new J(() => {
            const b = x(a.g.find(vi)),
                c = fh(b, 4, ph);
            c.V = () => {
                fh(b, 0, ph);
                c.V = null
            }
        })
    }

    function xk(a, b, c, d) {
        return H(() => {
            const e = Vi(b, c, 295, d, dd[0]);
            sd(e, new pi);
            e.get(S).hb = n.zd;
            return new I([new J(() => {
                e.get(C).alpha = 0;
                v(a.g, e);
                Y(e, 0)
            }), new M([wf(e.get(C), 500, 0, 1), new J(() => {
                Wi(a.g, e, !1, -25)
            })])])
        })
    }

    function yk(a) {
        return H(() => {
            const b = x(a.g.find(vi)),
                c = b.get(B).position,
                d = x(a.g.find(R)),
                e = d.get(B).position;
            var f = x(a.g.find(xi));
            const g = f.get(B).position;
            f = f.get(C).Da;
            const k = x(a.g.find(wi)).get(B).position,
                l = x(a.g.find(yi));
            return new I([new J(() => {
                fh(b, 13, ph);
                n.Qd.play(200);
                a.U = !0
            }), new L(2E3), new U(1500, c.H(), new A(1E3, -50), c), new M([new U(2E3, e.H(), zk, e), new ef(2E3, .6, .4, p => {
                d.get(B).scale = new A(p, p)
            }), new ef(3E3, 1, .4, p => {
                l.get(B).scale = new A(p, p)
            }), new I([new L(1500), new U(1500, g.H(), new A(320,
                360 - f.g.y / 2), g)]), new I([new L(2E3), new U(2E3, k.H(), a.wa.H(), k)])])])
        })
    }

    function Ak(a) {
        return new J(() => {
            const b = x(a.g.find(wi)),
                c = new S("", 90, 6, 10);
            c.g = b.get(B).position.H();
            c.Ha = 3;
            c.N = !0;
            c.j = !1;
            c.U = !0;
            c.u = () => {
                a.T.stop();
                a.N.stop();
                n.Ec.play();
                a.u = !0;
                a.i = !0
            };
            c.o = () => {
                a.i = !0;
                Y(b, 13)
            };
            c.i = () => {
                n.Dc.play();
                Y(b, 10);
                const d = b.get(B).position;
                var e = Rd(uk, kd, !1);
                const f = D(uk, kd[0]),
                    g = new u(new B(new A(320, 180)), new C(f, 3, 0, y(f.g.H(), -.5)), e);
                e.offset = g.get(C).offset.H();
                e.V = () => {
                    w(a.g, g)
                };
                v(a.g, g);
                e = new u;
                v(a.g, e);
                T(e, new I([new U(1E3, d.H(), a.ya.H(), d), new J(() => {
                    a.ta = !0
                })]))
            };
            sd(b, c);
            Xi(b).get(B).position = Bk.H()
        })
    }

    function Ck(a, b, c) {
        return new I([new J(() => {
            const d = x(a.g.find(wi));
            d.get(S).Db = c * 1E3;
            Yi(d, b);
            a.i = !1;
            a.u = !1;
            a.v = !1;
            n.Rd.play();
            const e = fh(d, 2, qh);
            e.V = () => {
                fh(d, 3, qh);
                lc(a.T, 1.8);
                a.T.play(0, !0);
                lc(a.N, .5);
                a.N.play(0, !0);
                Wi(a.g, d, !1, 25);
                e.V = null
            }
        }), new K(() => a.i), H(() => x(a.g.find(wi)).get(S).Ha === 0 ? new J(() => {
            a.v = !0
        }) : Dk(a, a.wa.H())), H(() => {
            if (a.u) return new J(() => {});
            const d = x(a.g.find(wi)).get(S);
            return Ck(a, $h(d), c)
        })])
    }

    function Dk(a, b) {
        let c;
        return new I([H(() => {
            c = x(a.g.find(wi)).get(B).position;
            return new U(1E3, c.H(), b, c)
        }), new J(() => {
            a.v = !0
        })])
    }
    var Fk = class extends tk {
        constructor(a) {
            super(a);
            this.U = this.ta = this.v = this.u = this.i = !1;
            this.T = n.Cc;
            this.N = n.Pd;
            a.level = 5;
            Yj(this, Ek);
            a = D(uk, bd[0]);
            a = new u(new B, new C(a, 2, 0, y(a.g.H(), -.5).add(new A(-80, -40))), new ri(!1));
            const b = x(this.g.find(R));
            Fd(b, a);
            vj(b, 0);
            y(b.get(B).scale, .6);
            a = D(uk, id[0]);
            a = new u(new B(new A(640 - a.g.x / 2, a.g.y / 2)), new C(a), new vi);
            fh(a, 0, ph);
            v(this.g, a);
            a = D(uk, Fc);
            a = new u(new B(new A(320, 360 + a.g.y / 2)), new C(a, 1, 0, y(a.g.H(), -.5)), new xi);
            v(this.g, a);
            a = D(uk, ld[0]);
            a = new u(new B(new A(320,
                -a.g.y / 2)), new C(a, 1, 0, y(a.g.H(), -.5)), new wi);
            fh(a, 0, qh);
            v(this.g, a);
            a = a.get(C).Da.g;
            this.wa = new A(320, a.y / 2 - 70);
            this.ya = new A(320, a.y / 2 - 100)
        }
        o(a) {
            kk(this);
            T(this.actions, new I([mk(this, !0), lk(this, !0, new A(320, 180), !1), nk(this), vk(this, 0, !0), new L(2500), wk(this), xk(this, "|^|", 60, 6), xk(this, "-v-", 20, 6), xk(this, "^-^", 30, 6), xk(this, "|-|", 10, 6), new K(() => gk(this)), vk(this, 0, !0), new L(1E3), wk(this), new M([xk(this, "|-|^|-|", 40, 7), xk(this, "|-|v|-|", -20, 7)]), new L(3E3), xk(this, "v^v||v^v", 10, 7), new K(() =>
                    gk(this)), vk(this, 0, !0), new L(1E3), wk(this), new L(500), xk(this, "||", 60, 3), xk(this, "--", -20, 3), xk(this, "^^", 30, 3), xk(this, "vv", 10, 3), xk(this, "||", -10, 3), xk(this, "--", 60, 4), xk(this, "^^", -30, 4), xk(this, "vv", 40, 4), xk(this, "||", 40, 4), new K(() => gk(this)), yk(this), new L(500), Ak(this), vk(this, 1), new L(500), Ck(this, "vv|-|-|vv@", 6), new K(() => this.u && this.i && this.v), vk(this, 1), Ck(this, "^^-|-|-^^z", 6), new K(() => this.u && this.i && this.v), vk(this, 1), Ck(this, "-||^^|---", 5), new K(() => this.u && this.i && this.v), rk(this),
                new K(() => this.ta), hk(this, a)
            ]))
        }
        j(a) {
            T(this.actions, new I([mk(this, !1), jk(this, a)]))
        }
        W() {
            return this.U
        }
    };
    const Ek = new A(100, 300),
        zk = new A(340, 265),
        Bk = new A(0, 270);
    const Gk = uc();

    function Hk(a) {
        return H(() => new J(() => {
            for (const c of Ik[a.i].tb) {
                var b = D(Gk, Sc);
                b = new u(new B(c[0].H()), new C(D(Gk, Sc), 1, 1, y(b.g.H(), -.5)), new ci(c[0].H(), c[1].H()));
                b.get(C).alpha = 0;
                v(a.g, b);
                T(b, new I([new L(800), wf(b.get(C), 800, 0, 1)]))
            }
        }))
    }

    function Jk(a, b) {
        return H(() => {
            var c = D(Gk, Ik[a.i].bc);
            const d = new u(new B(Ik[a.i].Nb), new C(c, 3, 0, y(c.g.H(), -.5)));
            d.get(C).alpha = 0;
            c = D(Gk, Ik[a.i].Vb);
            const e = new u(new B(Ik[a.i].Nb), new C(c, 1, 0, y(c.g.H(), -.5)));
            e.get(C).alpha = 0;
            c = [];
            c.push(wf(e.get(C), 1600, 0, 1));
            b && c.push(wf(d.get(C), 1600, 0, 1));
            const f = [];
            f.push(wf(e.get(C), 1300, 1, 0), new I([new L(650), Kk(a, b)]));
            b && f.push(new I([new L(1040), wf(d.get(C), 1300, 1, 0)]));
            return new I([new J(() => {
                    v(a.g, e);
                    v(a.g, d);
                    b ? n.Zc.play() : n.Yc.play(650)
                }), new M(c),
                new J(() => m(function*() {
                    b && (Ik[a.i].Zb.play(Ik[a.i].ac), fh(d, 13, Ik[a.i].Ob))
                })), Lk(a, b), new M(f)
            ])
        })
    }

    function Z(a, b, c, d, e, f) {
        return H(() => {
            const g = Vi(c, d, e, f, Sc);
            sd(g, new ci(Ik[a.i].tb[a.v][0].H(), Ik[a.i].tb[a.v][1].H()));
            a.v++;
            const k = g.get(S);
            k.j = !1;
            k.v = n.Od;
            k.i = () => {
                Mk(a, g)
            };
            k.o = () => {
                const l = t(g, zi);
                l && (l.actions = []);
                x(Dd(g, di)).get(C).alpha = 0;
                Y(g, 10);
                Mk(a, g)
            };
            return new I([new J(() => {
                g.get(C).alpha = 0;
                v(b, g)
            }), new M([new ef(500, 0, 1, l => {
                g.get(C).alpha = l
            }), new J(() => {
                Wi(b, g, !0, -10)
            })])])
        })
    }

    function Nk(a) {
        return new J(() => {
            a.v = 0;
            a.u = 0;
            a.i++
        })
    }

    function Mk(a, b) {
        const c = b.get(B).position,
            d = b.get(ci);
        b.get(C).Mb = 1;
        T(b, new I([new U(1E3, c.H(), d.i.H(), c), new J(() => {
            a.u++
        })]))
    }

    function Kk(a, b) {
        return H(() => {
            const c = [];
            for (const g of a.g.find(ci)) {
                var d = g.get(ci),
                    e = g.get(B).position;
                const k = new U(1300, e.H(), d.g, e);
                d = c;
                e = d.push;
                var f = I;
                k.v = cf;
                e.call(d, new f([new M([k, wf(g.get(C), 1300, 1, 0)]), new J(() => {
                    w(a.g, g)
                })]))
            }
            return new M([new J(() => {
                b && n.Nd.play()
            }), ...c])
        })
    }

    function Lk(a, b) {
        const c = [];
        b && c.push(new J(() => {
            for (const d of a.g.find(ci)) d.get(S).state = 0, Y(d, 14)
        }), new L(500));
        return new M(c)
    }
    var Ok = class extends tk {
        constructor(a) {
            super(a);
            this.i = this.u = this.v = 0;
            a.level = 4;
            Yj(this)
        }
        o(a) {
            kk(this);
            T(this.actions, new I([mk(this, !1), lk(this, !0, new A(320, 180)), nk(this), mk(this, !0), new L(1E3), Hk(this), Jk(this, !1), new L(1E3), new M([Z(this, this.g, "v||v", 90, 140, 8), Z(this, this.g, "-^^-", 160, 295, 8), Z(this, this.g, "|^^|", 20, 295, 8), Z(this, this.g, "|vv|", 225, 295, 8), Z(this, this.g, "-^^-", -45, 295, 8)]), new K(() => this.u === Ik[this.i].Eb), new L(1E3), Jk(this, !0), new L(2E3), Nk(this), Hk(this), Jk(this, !1), new L(1E3),
                new M([Z(this, this.g, "--", 90, 140, 6), Z(this, this.g, "-|", 160, 295, 6), Z(this, this.g, "-|", -20, 295, 6), Z(this, this.g, "^v", 20, 295, 6), Z(this, this.g, "^v", 200, 295, 6), Z(this, this.g, "|^", 240, 217.5, 6), Z(this, this.g, "|^", -60, 217.5, 6)]), new L(5E3), new M([Z(this, this.g, "|||", 150, 295, 8), Z(this, this.g, "vvv", 30, 295, 8), Z(this, this.g, "^^^", -30, 295, 8), Z(this, this.g, "---", -150, 295, 8)]), new K(() => this.u === Ik[this.i].Eb), new L(1E3), Jk(this, !0), new L(2E3), Nk(this), Hk(this), Jk(this, !1), new L(1E3), Z(this, this.g, "|v", 180, 217.5,
                    4), Z(this, this.g, "v^", -30, 217.5, 4), Z(this, this.g, "^-", 210, 217.5, 4), Z(this, this.g, "-|", -30, 217.5, 4), Z(this, this.g, "|-", 210, 217.5, 4), Z(this, this.g, "-^", 30, 217.5, 5), Z(this, this.g, "^v", 150, 217.5, 5), Z(this, this.g, "v|", -45, 217.5, 5), new L(500), Z(this, this.g, "|-|", 160, 295, 7), Z(this, this.g, "-|-", 200, 295, 7), Z(this, this.g, "^-^", 260, 217.5, 7), Z(this, this.g, "---", -20, 295, 7), Z(this, this.g, "---", -20, 295, 7), Z(this, this.g, "---", -20, 295, 7), new K(() => this.u === Ik[this.i].Eb), new L(1E3), Jk(this, !0), new L(500), rk(this),
                new L(500), hk(this, a)
            ]))
        }
        j(a) {
            T(this.actions, new I([mk(this, !1), qk(this), jk(this, a)]))
        }
    };
    const Pk = [
            [new A(224, 256), new A(100, 600)],
            [new A(246, 167), new A(100, 200)],
            [new A(409, 256), new A(600, 400)],
            [new A(384, 120), new A(500, 30)],
            [new A(437, 101), new A(600, 0)]
        ],
        Qk = [
            [new A(206, 221), new A(100, 400)],
            [new A(233, 137), new A(200, 20)],
            [new A(233, 235), new A(200, 400)],
            [new A(223, 285), new A(223, 400)],
            [new A(305, 249), new A(305, 400)],
            [new A(377, 175), new A(377, 20)],
            [new A(392, 192), new A(600, 300)],
            [new A(422, 268), new A(580, 400)],
            [new A(447, 136), new A(447, 0)],
            [new A(472, 122), new A(640, 0)],
            [new A(506, 175),
                new A(700, 175)
            ]
        ],
        Rk = [
            [new A(169, 172), new A(169, 20)],
            [new A(130, 188), new A(100, 20)],
            [new A(98, 200), new A(0, 200)],
            [new A(116, 250), new A(0, 330)],
            [new A(163, 279), new A(163, 400)],
            [new A(206, 284), new A(240, 400)],
            [new A(239, 240), new A(330, 400)],
            [new A(268, 201), new A(200, 100)],
            [new A(344, 157), new A(344, 0)],
            [new A(371, 145), new A(371, 0)],
            [new A(398, 151), new A(398, 500)],
            [new A(442, 96), new A(600, 0)],
            [new A(467, 134), new A(700, 20)],
            [new A(494, 215), new A(700, 400)]
        ],
        Ik = [{
            tb: Pk,
            Eb: Pk.length,
            Vb: [18, 1286, 363, 583, 326],
            bc: Yc[0],
            Nb: new A(325, 200),
            Ob: new Map([
                [4, {
                    O: Yc,
                    loop: !1
                }],
                [13, {
                    O: [
                        [19, 586, 0, 583, 326],
                        [19, 1172, 0, 583, 326],
                        [19, 0, 329, 583, 326],
                        [19, 586, 329, 583, 326],
                        [19, 586, 329, 583, 326],
                        [19, 586, 329, 583, 326],
                        [19, 1172, 329, 583, 326],
                        [19, 0, 658, 583, 326],
                        [19, 586, 658, 583, 326],
                        [19, 1172, 658, 583, 326]
                    ],
                    loop: !1
                }]
            ]),
            Zb: n.hd,
            ac: 300
        }, {
            tb: Qk,
            Eb: Qk.length,
            Vb: [19, 0, 987, 481, 318],
            bc: rd[0],
            Nb: new A(355, 160),
            Ob: new Map([
                [4, {
                    O: rd,
                    loop: !1
                }],
                [13, {
                    O: [
                        [20, 1452, 0, 481, 318],
                        [20, 0, 321, 481, 318],
                        [20, 484, 321, 481, 318],
                        [20, 968, 321, 481, 318],
                        [20, 1452, 321,
                            481, 318
                        ],
                        [20, 0, 642, 481, 318],
                        [20, 484, 642, 481, 318],
                        [20, 968, 642, 481, 318],
                        [20, 1452, 642, 481, 318],
                        [20, 0, 963, 481, 318],
                        [20, 484, 963, 481, 318],
                        [20, 968, 963, 481, 318],
                        [20, 1452, 963, 481, 318],
                        [20, 0, 1284, 481, 318],
                        [20, 484, 1284, 481, 318],
                        [20, 968, 1284, 481, 318]
                    ],
                    loop: !1
                }]
            ]),
            Zb: n.Td,
            ac: 0
        }, {
            tb: Rk,
            Eb: Rk.length,
            Vb: [17, 643, 0, 640, 360],
            bc: fd[0],
            Nb: new A(320, 180),
            Ob: new Map([
                [4, {
                    O: fd,
                    loop: !1
                }],
                [13, {
                    O: [
                        [17, 1286, 0, 640, 360],
                        [17, 643, 1452, 640, 360],
                        [17, 1286, 1452, 640, 360],
                        [18, 0, 0, 640, 360],
                        [18, 643, 0, 640, 360],
                        [18, 643, 0, 640, 360],
                        [18, 643,
                            0, 640, 360
                        ],
                        [18, 643, 0, 640, 360],
                        [18, 1286, 0, 640, 360],
                        [18, 0, 363, 640, 360],
                        [18, 643, 363, 640, 360]
                    ],
                    loop: !1
                }]
            ]),
            Zb: n.Dd,
            ac: 300
        }];
    const Sk = uc();

    function Tk(a) {
        let b = !1;
        const c = Rd(Sk, Vc, !1);
        c.V = () => {
            b = !0;
            c.V = null
        };
        const d = new u(new B(new A(0, 0)), new C(D(Sk, Vc[0]), 3), c);
        return new I([new J(() => {
            const e = x(a.g.find(ni)),
                f = e.get(B).position;
            d.get(B).position = f.H();
            v(a.g, d);
            w(a.g, e);
            n.Xc.play()
        }), new K(() => b), Uk(a), new J(() => {
            w(a.g, d)
        })])
    }

    function Vk(a, b, c, d, e) {
        return new I([new J(() => {
            const f = x(a.g.find(bi)),
                g = f.get(S);
            f.get(B).position = d.H();
            Zi(f, d.x);
            g.Db = c * 1E3;
            Yi(f, b);
            a.i = !1;
            a.u = !1;
            a.v = !1;
            Wi(a.g, f)
        }), new K(() => a.i), H(() => x(a.g.find(bi)).get(S).Ha === 0 ? new J(() => {
            a.v = !0
        }) : a.u ? Wk(a, e === 0 ? new A(780, 125) : Xk[e].H()) : Wk(a, Yk[e].H())), H(() => {
            if (x(a.g.find(bi)).get(S).Ha === 0) return new J(() => {});
            if (a.u) return Wk(a, e === 0 ? new A(780, 125) : Xk[e].H());
            const f = x(a.g.find(bi)).get(S);
            return Vk(a, $h(f), c, Yk[e].H(), e)
        })])
    }

    function Uk(a) {
        const b = Vi("", 0, 295, 10, Wc[0]);
        sd(b, new bi);
        const c = b.get(S);
        c.g = Xk[0];
        c.Ha = 3;
        c.j = !1;
        c.N = !0;
        c.v = n.Uc;
        c.hb = n.Wc;
        c.T = 800;
        c.i = () => {
            Zk(a)
        };
        c.u = () => {
            a.u = !0;
            a.i = !0
        };
        c.o = () => {
            a.i = !0;
            const d = Y(b, 13);
            d && (d.V = () => {
                Y(b, 0)
            })
        };
        b.get(B).position = c.g;
        Y(b, 0);
        return new J(() => {
            v(a.g, b)
        })
    }

    function Zk(a) {
        const b = x(a.g.find(bi)),
            c = b.get(B).position,
            d = b.get(C).Da.g.y,
            e = new u;
        v(a.g, e);
        T(e, new I([new J(() => {
                fh(b, 12, lh)
            }), new U(500, c.H(), new A(320, 180 + d / 2 - 8), c), new J(() => {
                n.Vc.play();
                fh(b, 11, lh)
            }), H(() => {
                const f = x(a.g.find(R)).get(B).position;
                return new U(70, f.H(), new A(f.x, f.y + 10), f)
            }), H(() => {
                const f = x(a.g.find(R)).get(B).position;
                return new U(70, f.H(), new A(f.x, f.y - 10), f)
            }), new L(1100), new J(() => {
                fh(b, 12, lh)
            }), H(() => {
                const f = b.get(B).position;
                return new U(1500, f.H(), new A(-150, 500), c)
            }),
            new J(() => {
                a.N = !0
            })
        ]))
    }

    function Wk(a, b) {
        let c;
        return new I([H(() => {
            c = x(a.g.find(bi)).get(B).position;
            return new U(1E3, c.H(), b, c)
        }), new J(() => {
            a.v = !0
        })])
    }
    var $k = class extends tk {
        constructor(a) {
            super(a);
            this.N = this.v = this.u = this.i = !1;
            a.level = 1;
            Yj(this, new A(320, 200), !1)
        }
        o(a) {
            kk(this);
            const b = x(this.g.find(R)).get(B).position;
            T(this.actions, new I([mk(this, !0), new U(800, b.H(), new A(320, 180), b), nk(this), new L(1E3), new M([W(this.g, "|", 0, 217.5, 5), W(this.g, "^", 180, 217.5, 5)]), new K(() => gk(this)), new L(1E3), new M([W(this.g, "-v", -30, 295, 5), W(this.g, "|v", 210, 295, 5)]), new K(() => gk(this)), new L(1E3), new M([W(this.g, "|^", 30, 295, 5), W(this.g, "-^", 150, 295, 5)]), new K(() =>
                gk(this)), new L(1E3), new M([W(this.g, "|^", -30, 217.5, 5), W(this.g, "|v", 210, 217.5, 5), W(this.g, "-v", 30, 217.5, 5), W(this.g, "-^", 150, 217.5, 5)]), new K(() => gk(this)), new L(1E3), Tk(this), Vk(this, "|-^v", 8, Xk[0], 0), new K(() => this.u && this.i && this.v), Vk(this, "v^-|", 8, Xk[1], 1), new K(() => this.u && this.i && this.v), Vk(this, "v|-|-|v", 9, Xk[2], 2), new K(() => this.N), rk(this), new L(500), hk(this, a)]))
        }
        j(a) {
            T(this.actions, new I([mk(this, !1), qk(this), pk(this), jk(this, a)]))
        }
    };
    const Xk = [new A(465, 125), new A(50, 450), new A(700, 50)],
        Yk = [new A(600, 150), new A(50, 250), new A(570, 150)];
    const al = uc();

    function bl(a) {
        const b = D(al, pd[0]),
            c = Rd(al, pd, !1);
        let d = !1;
        c.offset = y(b.g.H(), -.5);
        c.V = () => {
            d = !0;
            c.V = null
        };
        const e = new u(new B(new A(320, 180)), new C(b, 3, 0, y(b.g.H(), -.5)), c);
        return new I([new J(() => {
            v(a.g, e);
            n.yd.play()
        }), new K(() => d), cl(a), new J(() => {
            w(a.g, e)
        })])
    }

    function dl(a, b, c, d = !1) {
        return new I([new J(() => {
            const e = x(a.g.find(ui)),
                f = e.get(S);
            e.get(B).position = el[a.N].H();
            Zi(e, el[a.N].x);
            f.Db = c * 1E3;
            Yi(e, b);
            a.i = !1;
            a.u = !1;
            a.v = !1;
            e.get(ui).rb === 1 ? Y(e, 7) : d ? Y(e, 8) : fl(e);
            Wi(a.g, e, !1, 0, -250)
        }), new K(() => a.i), H(() => x(a.g.find(ui)).get(S).Ha === 0 ? new J(() => {
            a.v = !0
        }) : a.u ? gl(a) : hl(a, el[a.N].H())), H(() => {
            if (a.u) return new J(() => {});
            const e = x(a.g.find(ui)).get(S);
            return dl(a, $h(e), c, !0)
        })])
    }

    function il(a) {
        return a.u && a.i && a.v
    }

    function jl(a, b) {
        return H(() => {
            const c = x(a.g.find(ui));
            a.N++;
            c.get(ui).rb = b;
            c.get(B).position = el[a.N];
            Y(c, 0);
            return wf(c.get(C), 1500, 0, 1)
        })
    }

    function cl(a) {
        const b = Vi("", 0, 295, 10, od[0]);
        sd(b, new ui);
        const c = b.get(S);
        c.g = kl;
        c.Ha = 6;
        c.j = !1;
        c.N = !0;
        c.U = !0;
        c.v = n.wd;
        c.hb = n.xd;
        c.T = 500;
        c.W = 2;
        c.i = () => {
            a.T = !0
        };
        c.u = () => {
            a.u = !0;
            a.i = !0
        };
        c.o = () => {
            a.i = !0;
            b.get(ui).rb === 1 ? Y(b, 7) : Y(b, 8)
        };
        b.get(B).position = c.g;
        Y(b, 7);
        return new J(() => {
            v(a.g, b)
        })
    }

    function fl(a) {
        const b = Y(a, 9);
        b && (b.V = () => {
            Y(a, 8)
        })
    }

    function gl(a) {
        return new I([H(() => {
            const b = x(a.g.find(ui));
            return wf(b.get(C), 1100, 1, 0)
        }), new J(() => {
            a.v = !0
        })])
    }

    function hl(a, b) {
        let c;
        return new I([H(() => {
            c = x(a.g.find(ui)).get(B).position;
            return new U(1E3, c.H(), b, c)
        }), new J(() => {
            a.v = !0
        })])
    }
    var ll = class extends tk {
        constructor(a) {
            super(a);
            this.T = this.v = this.u = this.i = !1;
            this.N = 0;
            a.level = 3;
            Yj(this)
        }
        o(a) {
            kk(this);
            T(this.actions, new I([mk(this, !1), lk(this, !0, new A(320, 230)), nk(this), mk(this, !0), new L(1E3), W(this.g, "v", 20, 295, 1.5), new L(500), W(this.g, "^", 160, 295, 1.5), new L(500), W(this.g, "|", 140, 295, 1.5), new L(500), W(this.g, "-", 40, 295, 1.5), new K(() => gk(this)), new L(500), new M([W(this.g, "v|v", 20, 217.5, 9), W(this.g, "^-^", 160, 217.5, 9), W(this.g, "|-|", 90, 140, 9)]), new K(() => gk(this)), new L(500), W(this.g,
                "-", 20, 295, 1.2), new L(200), W(this.g, "v", 20, 295, 1.5), new L(500), W(this.g, "-", 160, 295, 1.2), new L(200), W(this.g, "^", 160, 295, 1.5), new L(500), W(this.g, "-", 140, 295, 1.2), new L(200), W(this.g, "|", 140, 295, 1.5), new L(500), W(this.g, "-", 40, 295, 1.2), new L(300), W(this.g, "z", 40, 295, 3), new K(() => gk(this)), new L(1E3), bl(this), new L(1E3), dl(this, "|-|-|-|z", 10), new K(() => il(this)), jl(this, 0), dl(this, "-z", 2), new K(() => il(this)), jl(this, 1), dl(this, "v^v^v^z", 10), new K(() => il(this)), jl(this, 0), dl(this, "|z", 2), new K(() =>
                il(this)), jl(this, 1), dl(this, "|-^v|-z", 10), new K(() => il(this)), jl(this, 0), dl(this, "vz", 3), new K(() => this.T), rk(this), new L(500), hk(this, a)]))
        }
        j(a) {
            T(this.actions, new I([mk(this, !1), qk(this), pk(this), jk(this, a)]))
        }
    };
    const kl = new A(495, 160),
        ml = new A(320, 170),
        el = [kl, ml, new A(100, 190), ml, kl, ml];
    const nl = uc();

    function ol(a) {
        const b = D(nl, pl[0]);
        let c = !1,
            d = !1;
        const e = Rd(nl, pl, !1);
        e.offset = y(b.g.H(), -.5);
        e.V = () => {
            c = !0;
            e.V = null
        };
        const f = Rd(nl, ql, !1);
        f.V = () => {
            d = !0;
            f.V = null
        };
        f.offset = y(b.g.H(), -.5);
        const g = new u(new B(new A(320, 180)), new C(b, 3, 0, y(b.g.H(), -.5)), e);
        return new I([new J(() => {
            n.Md.play();
            v(a.g, g)
        }), new K(() => c), new M([new J(() => {
            sd(g, f)
        }), H(() => {
            const k = g.get(B).position;
            return new U(500, k.H(), rl, k)
        })]), new K(() => d), sl(a), new J(() => {
            w(a.g, g)
        })])
    }

    function tl(a, b, c, d, e) {
        return new I([new J(() => {
            const f = x(a.g.find(ti)),
                g = f.get(S);
            f.get(B).position = d.H();
            Zi(f, d.x);
            g.Db = c * 1E3;
            Yi(f, b);
            a.i = !1;
            a.u = !1;
            a.v = !1;
            Wi(a.g, f, !0, 20)
        }), new K(() => a.i), H(() => x(a.g.find(ti)).get(S).Ha === 0 ? new J(() => {
            a.v = !0
        }) : a.u ? ul(a, vl[e].H()) : ul(a, wl[e].H())), H(() => {
            if (a.u) return new J(() => {});
            const f = x(a.g.find(ti)).get(S);
            return tl(a, $h(f), c, wl[e].H(), e)
        })])
    }

    function xl(a, b) {
        return H(() => {
            const c = x(a.g.find(ti)),
                d = c.get(B).position;
            Y(c, 0);
            return new U(1E3, d.H(), vl[b], d)
        })
    }

    function sl(a) {
        const b = Vi("", 0, 295, 10, gd[0]);
        sd(b, new ti);
        const c = b.get(S);
        c.g = rl;
        c.Ha = 3;
        c.j = !1;
        c.N = !0;
        c.U = !0;
        c.v = n.Kd;
        c.hb = n.Ld;
        c.T = 1E3;
        c.W = 3;
        c.i = () => {
            a.T = !0
        };
        c.u = () => {
            a.u = !0;
            a.i = !0
        };
        c.o = () => {
            a.i = !0;
            Y(b, 0)
        };
        b.get(B).position = c.g;
        Y(b, 0);
        return new J(() => {
            v(a.g, b)
        })
    }

    function ul(a, b) {
        let c;
        return new I([H(() => {
            c = x(a.g.find(ti)).get(B).position;
            return new U(200, c.H(), b, c)
        }), new J(() => {
            a.v = !0
        })])
    }
    var yl = class extends tk {
        constructor(a) {
            super(a);
            this.T = this.v = this.u = this.i = !1;
            this.N = n.Sd;
            a.level = 2;
            lc(this.N, .3);
            this.N.play(0, !0);
            Yj(this)
        }
        o(a) {
            kk(this);
            T(this.actions, new I([mk(this, !1), lk(this, !0, new A(320, 230)), nk(this), mk(this, !0), new L(1E3), new M([W(this.g, "|", 50, 140, 5), W(this.g, "-", 130, 140, 5)]), new L(500), new M([W(this.g, "||", 20, 217.5, 6), W(this.g, "--", 160, 217.5, 6)]), new L(500), new M([W(this.g, "|||", 0, 295, 7), W(this.g, "---", 180, 295, 7)]), new K(() => gk(this)), new L(1E3), new M([W(this.g, "v", 50,
                    140, 5), W(this.g, "^", 130, 140, 5)]), new L(500), new M([W(this.g, "^v", 20, 217.5, 6), W(this.g, "v^", 160, 217.5, 6)]), new L(500), new M([W(this.g, "v^v", 0, 295, 7), W(this.g, "^v^", 180, 295, 7)]), new K(() => gk(this)), new L(1E3), W(this.g, "-v^v-", 90, 140, 5), new K(() => gk(this)), new L(1E3), ol(this), tl(this, "-----@", 5, vl[0], 0), new K(() => this.u && this.i && this.v), new L(500), xl(this, 1), tl(this, "|||||@", 3, vl[1], 1), new K(() => this.u && this.i && this.v), new L(500), xl(this, 2), tl(this, "v^v@", 3, vl[2], 2), new K(() => this.T), rk(this), new L(500),
                hk(this, a)
            ]))
        }
        j(a) {
            T(this.actions, new I([mk(this, !1), qk(this), pk(this), new J(() => {
                this.N.stop()
            }), jk(this, a)]))
        }
    };
    const rl = new A(540, 180),
        vl = [rl, new A(320, 80), new A(100, 180)],
        wl = vl.slice(),
        pl = hd.slice(0, 26),
        ql = hd.slice(26);

    function zl(a) {
        return new J(() => {
            a.i = Eg(Mg, {
                Pc: O("btn_skip")
            });
            a.i.addEventListener("click", () => {
                a.finished = !0;
                let b;
                (b = a.u) == null || b.resolve();
                let c;
                (c = a.i) == null || c.remove()
            });
            document.querySelector("#ddlContentRoot").appendChild(a.i)
        })
    }

    function Al(a, b) {
        const c = b.get(B).position;
        return new I([new J(() => {
            v(a.g, b);
            T(b, $i(b))
        }), new U(800, c.H(), new A(c.x - 100, c.y), c)])
    }

    function Bl(a, b) {
        const c = Ii(new ii(O(b), "white", 50, "center", 350, 2, "black"), new A(320, 75));
        return new J(() => {
            v(a.g, c)
        })
    }

    function Cl(a, b) {
        return new J(() => {
            v(a.g, b)
        })
    }

    function Dl(a) {
        return new J(() => {
            for (const b of a.g.find(ii)) {
                b.get(C).alpha = 0;
                for (const c of Dd(b)) c.get(C).alpha = 0
            }
        })
    }

    function El(a, b) {
        return new J(() => {
            a.get(C).alpha = b ? 1 : 0
        })
    }
    var Fl = class extends tk {
        constructor(a) {
            super(a);
            a.level = 0;
            Yj(this)
        }
        o(a) {
            this.u = a;
            const b = Vi("-", 0, 295, 10),
                c = Vi("|-|", 0, 295, 10),
                d = Ji();
            T(this.actions, new I([mk(this, !1, !1), zl(this), new J(() => {
                dk(this)
            }), lk(this, !0, new A(320, 200)), Al(this, b), Bl(this, "tutorial_1"), Cl(this, d), new K(() => b.g === void 0), Dl(this), El(d, !1), new L(1E3), Al(this, c), Bl(this, "tutorial_2"), El(d, !0), new K(() => c.g === void 0), Dl(this), El(d, !1), new L(500), hk(this, a)]))
        }
        j(a) {
            let b;
            (b = this.i) == null || b.remove();
            a.resolve()
        }
    };

    function Gl(a) {
        a.classList.add("ddl-hidden")
    }

    function Hl(a) {
        a.classList.remove("ddl-hidden")
    };
    var Il = class extends mb {
        constructor() {
            const a = document.createElement("video");
            a.setAttribute("webkit-playsinline", "");
            a.setAttribute("playsinline", "");
            a.preload = "none";
            a.muted = !0;
            a.controls = !1;
            a.disablePictureInPicture = !0;
            a.style.position = "absolute";
            a.style.left = "0";
            a.style.top = "0";
            a.style.width = "100%";
            a.style.height = "100%";
            super();
            this.g = a;
            this.loaded = this.o = !1;
            this.v = this.i = this.T = this.U = null
        }
        load(a) {
            if (!this.W) {
                let b = () => {};
                this.W = new Promise(f => {
                    b = f
                });
                let c = null;
                const d = () => {
                    c !== null && (clearInterval(c),
                        c = null);
                    this.loaded = !0;
                    b(this)
                };
                c = setInterval(() => {
                    this.g.readyState === this.g.HAVE_ENOUGH_DATA && d()
                }, 32);
                const e = () => {
                    this.g.removeEventListener("error", e);
                    d()
                };
                this.g.addEventListener("canplaythrough", () => {
                    this.g.removeEventListener("error", e);
                    d()
                });
                this.g.addEventListener("error", e);
                this.g.src = a;
                this.g.preload = "auto";
                this.g.load()
            }
            return this.W
        }
        play() {
            this.T = new Promise(d => {
                this.U = () => {
                    d();
                    this.T = this.U = null
                }
            });
            this.v = new Promise(d => {
                this.i = () => {
                    d();
                    this.v = this.i = null
                }
            });
            const a = () => {
                this.g.removeEventListener("timeupdate",
                    a);
                ob(this, "play", !0, {});
                let d;
                (d = this.U) == null || d.call(this)
            };
            this.g.addEventListener("timeupdate", a);
            const b = () => {
                this.g.removeEventListener("ended", b);
                this.o = !1;
                ob(this, "ended", !0, {});
                let d;
                (d = this.i) == null || d.call(this)
            };
            this.g.addEventListener("ended", b);
            const c = d => {
                this.g.removeEventListener("error", c);
                this.o = !1;
                console.error("playback failed", this.g.src, d);
                ob(this, "play", !0, {});
                let e;
                (e = this.U) == null || e.call(this);
                ob(this, "ended", !0, {});
                let f;
                (f = this.i) == null || f.call(this)
            };
            this.g.addEventListener("error",
                c);
            this.o = !0;
            this.g.play().catch(c);
            return {
                Nc: this.T,
                Mc: this.v
            }
        }
        Nc() {
            return this.T
        }
        Mc() {
            return this.v
        }
    };
    const Jl = $g(),
        pj = sj,
        yc = uc();
    var Kl = class extends tk {
            constructor(a, b, c = !1, d, e) {
                super(a);
                this.T = b;
                this.N = c;
                this.u = d;
                this.video = new Il;
                this.i = Eg(Lg);
                this.i.style.background = xc(e);
                this.v = Eg(Mg, {
                    Pc: O("btn_skip")
                });
                this.v.addEventListener("click", () => {
                    var p = this.video;
                    p.o = !1;
                    p.g.pause();
                    ob(p, "play", !0, {});
                    ob(p, "ended", !0, {});
                    let z;
                    (z = p.i) == null || z.call(p);
                    p = pj;
                    mj("d3", this.u);
                    p.log(109)
                });
                this.Za = Eg(Ng, {
                    Jc: O("btn_mute"),
                    Tc: O("btn_unmute")
                });
                const f = this.Za.querySelector(".ddl-mute"),
                    g = this.Za.querySelector(".ddl-unmute");
                c ? Hl(f) :
                    Hl(g);
                const k = () => {
                        l.muted ? (this.video.g.muted = !1, Gl(g), Hl(f)) : (this.video.g.muted = !0, Hl(g), Gl(f))
                    },
                    l = this.video.g;
                l.addEventListener("click", () => void k());
                this.Za.addEventListener("click", () => void k());
                this.i.appendChild(this.video.g);
                document.querySelector("#ddlContentRoot").appendChild(this.i);
                oj(this.u)
            }
            o(a) {
                this.video.load(`${"/logos/2024/halloween24/rc3/"}${"/logos/2024/halloween24/rc3/".endsWith("/") ? "" : "/"}${this.T}`);
                this.video.g.muted = !this.N;
                const {
                    Nc: b,
                    Mc: c
                } = this.video.play();
                b.then(() => {
                    this.i.appendChild(this.v);
                    this.i.appendChild(this.Za)
                });
                c.then(() => {
                    this.finished = !0;
                    a.resolve()
                })
            }
            j(a) {
                const b = this;
                m(function*() {
                    b.i.remove();
                    rj(b.u);
                    a.resolve()
                })
            }
        },
        Ll = class extends Kl {
            constructor(a) {
                super(a, "intro.mp4", !1, 0, Mc)
            }
        },
        Nl = class extends Kl {
            constructor(a) {
                super(a, "L4_cutscene.mp4", !xe() || ze(), 1, Nc)
            }
        },
        Ol = class extends Kl {
            constructor(a) {
                super(a, "outro.mp4", !xe() || ze(), 2, Qc)
            }
            j() {
                const a = this;
                m(function*() {
                    a.i.remove();
                    rj(a.u);
                    ch(Jl, 7)
                })
            }
        };
    var Ql = Pl;

    function Pl(a, b = !1) {
        (b = (b = b && !ze()) || Ee()) ? Hb(a): (b = window.top.location, a = Ab(a, zb) || wb, a = Cb(a), a !== void 0 && b.assign(a))
    };

    function Rl(a) {
        const b = a.te,
            c = a.oe,
            d = a.qe,
            e = a.re,
            f = a.ue,
            g = a.we,
            k = a.Pe,
            l = a.Zd;
        a = a.ze;
        return P('<div class="' + Q("ddl-share-modal") + '"><div class="' + Q("ddl-modal-overlay") + '"></div><div class="' + Q("ddl-modal-dialog") + '" role="dialog" aria-modal="true" aria-label="' + Q(b) + '"><div class="' + Q("ddl-modal-header") + '"><div class="' + Q("ddl-modal-header-text") + '">' + ng(b) + '</div><button class="' + Q("ddl-modal-close") + '" title="' + Q(c) + '">' + P('<div class="' + Q("ddl-modal-close-icon") + '"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#444746"/></svg></div>') +
            '</button></div><div class="' + Q("ddl-modal-content") + '"><div class="' + Q("ddl-modal-buttons") + '"><div class="' + Q("ddl-modal-button-container") + '"><button class="' + Q("ddl-share-facebook") + '" title="' + Q(e) + '">' + P('<div class="' + Q("ddl-share-facebook-icon") + '"><svg width="19" height="35" viewBox="0 0 19 35"><path d="M5.81384 35V19.6874H0.25V13.3532H5.81384V8.52552C5.81384 3.03358 9.08538 0 14.0907 0C16.4874 0 18.9959 0.427988 18.9959 0.427988V5.82064H16.2328C13.5108 5.82064 12.6617 7.5099 12.6617 9.24454V13.3532H18.7391L17.7675 19.6874H12.6617V35H5.81384Z" fill="#fff"/></svg></div>') +
            '</button><div class="' + Q("ddl-modal-button-label") + '" aria-hidden="true">' + ng(d) + '</div></div><div class="' + Q("ddl-modal-button-container") + '"><button class="' + Q("ddl-share-twitter") + '" title="' + Q(g) + '">' + P('<div class="' + Q("ddl-share-twitter-icon") + '"><svg width="32" height="32" viewBox="0 0 32 33"><path d="M19.0443 13.731L30.9571 0H28.1341L17.7903 11.9224L9.52875 0H0L12.4931 18.0288L0 32.4278H2.82309L13.7464 19.8373L22.4713 32.4278H32L19.0437 13.731H19.0443ZM15.1777 18.1876L13.9119 16.3924L3.84029 2.10729H8.1764L16.3043 13.6358L17.5701 15.431L28.1355 30.4163H23.7994L15.1777 18.1883V18.1876Z" fill="#fff"/></svg></div>') +
            '</button><div class="' + Q("ddl-modal-button-label") + '" aria-hidden="true">' + ng(f) + '</div></div></div><div class="' + Q("ddl-modal-copy-link-container") + '"><button class="' + Q("ddl-modal-copy-link") + '" aria-label="' + Q(l) + '">' + P('<div class="' + Q("ddl-modal-copy-link-icon") + '" aria-hidden="true"><svg width="48" height="48" viewBox="0 0 48 48"><path d="M23 27H19C17.35 27 16 25.65 16 24C16 22.35 17.35 21 19 21H23V19H19C16.24 19 14 21.24 14 24C14 26.76 16.24 29 19 29H23V27ZM29 19H25V21H29C30.65 21 32 22.35 32 24C32 25.65 30.65 27 29 27H25V29H29C31.76 29 34 26.76 34 24C34 21.24 31.76 19 29 19ZM28 23H20V25H28V23Z"/></svg></div>') +
            '<div class="' + Q("ddl-modal-share-link") + '">' + ng(k) + '</div></button><div class="' + Q("ddl-modal-help-text") + '" aria-hidden="true">' + ng(l) + '</div></div></div><div class="' + Q("ddl-modal-snack-bar") + '" role="alert">' + ng(a) + "</div></div></div>")
    };

    function Sl(a, ...b) {
        for (const [c, d] of b) {
            b = c;
            const e = d,
                f = a.style;
            f && b in f && f.setProperty(b, String(e))
        }
    };
    var Wl = a => m(function*() {
        const b = typeof a === "string" ? a : a.value;
        var c;
        if (!(c = yield Tl(b)))
            if (Lb) {
                typeof a === "string" ? (Ul || (Ul = document.createElement("input"), Ul.readOnly = !0, Sl(Ul, ["position", "absolute"], ["opacity", 0], ["left", 0], ["top", 0], ["pointerEvents", "none"]), document.body.appendChild(Ul)), Ul.value = a, c = Ul) : c = a;
                c !== document.activeElement && c.focus();
                const e = c.contentEditable,
                    f = c.readOnly;
                c.contentEditable = "true";
                c.readOnly = !1;
                const g = document.createRange();
                g.selectNodeContents(c);
                const k = window.getSelection();
                k.removeAllRanges();
                k.addRange(g);
                try {
                    c.select(), c.setSelectionRange(0, c.value.length)
                } catch (l) {}
                c.contentEditable = e;
                c.readOnly = f;
                try {
                    var d = Lb(document, "copy")
                } catch (l) {
                    d = !1
                }
                window.getSelection().removeAllRanges();
                c.blur();
                Ul && (Ul.remove(), Ul = null);
                c = d
            } else c = !1;
        return c || (yield Vl()) && (yield Tl(b)) ? Promise.resolve() : Promise.reject()
    });
    const Tl = a => m(function*() {
            return navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(a).then(() => !0, () => !1) : !1
        }),
        Xl = a => m(function*() {
            switch (a.state) {
                case "granted":
                    return !0;
                case "denied":
                    return !1
            }
            return new Promise(b => {
                a.onchange = () => b(Xl(a))
            })
        }),
        Vl = () => m(function*() {
            return navigator.permissions && navigator.permissions.query ? Xl(yield navigator.permissions.query({
                name: "clipboard-write"
            })) : !1
        });
    let Ul = null;
    var Yl = (a, b) => {
            Eh() || (kj(9), a = a.indexOf("//") == 0 ? "https:" + a : a, window.location = "http://www.google.com/doodles/_SHARE?description=" + encodeURIComponent(b) + "&url=" + encodeURIComponent(a))
        },
        Zl = () => window.agsa_ext != null && window.agsa_ext.share != null,
        $l = (a, b) => {
            !Eh() && Zl() && (kj(15), window.agsa_ext.share(b + " " + a, null))
        },
        am = (a, b, c = null) => {
            if (Ae() && navigator.share) try {
                navigator.share({
                    text: b,
                    url: a
                }).then(() => {
                    kj(17)
                })
            } catch (d) {
                d instanceof DOMException && d.name === "AbortError" || (ze() && !Ce() ? Yl(a, b) : Zl() ? $l(a, b) :
                    c())
            } else ze() && !Ce() ? Yl(a, b) : Zl() ? $l(a, b) : c()
        },
        bm = a => m(function*() {
            if (Eh()) return Promise.reject();
            kj(16);
            return Wl(a)
        });
    const tf = of();

    function cm(a, b, c) {
        let d;
        (d = a.querySelector(`.${b}`)) == null || d.addEventListener("click", c)
    }

    function dm(a, b) {
        m(function*() {
            yield bm(b);
            a.i.focus();
            const c = a.g.querySelector(".ddl-modal-dialog");
            c.classList.add("ddl-with-snack-bar", "ddl-link-copied");
            yield Qg(2400);
            c.classList.remove("ddl-link-copied");
            yield Qg(400);
            c.classList.remove("ddl-with-snack-bar")
        })
    }
    var em = class {
        constructor(a, b, c, d, e = () => {}, f = () => {}) {
            this.ha = a;
            this.o = e;
            this.j = f;
            this.g = Eg(Rl, {
                te: sf("share_modal_share"),
                oe: sf("share_modal_button_close"),
                qe: sf("share_modal_label_facebook"),
                re: sf("share_modal_button_facebook"),
                ue: sf("share_modal_label_twitter"),
                we: sf("share_modal_button_twitter"),
                Pe: c,
                Zd: sf("share_modal_click_link"),
                ze: sf("share_modal_button_copied")
            });
            this.i = this.g.querySelector(".ddl-modal-copy-link");
            cm(this.g, "ddl-modal-close", () => {
                this.close()
            });
            cm(this.g, "ddl-modal-overlay",
                () => {
                    this.close()
                });
            cm(this.g, "ddl-share-facebook", () => {
                var g = Ch(Ah("facebook_link", null) || Dh(d));
                if (!Eh()) {
                    g = g.indexOf("//") == 0 ? "https:" + g : g;
                    var k = {
                        app_id: "738026486351791",
                        href: g,
                        hashtag: "#GoogleDoodle"
                    };
                    g = new he;
                    for (var l in k) g.add(l, k[l]);
                    l = new be("https://www.facebook.com/dialog/share");
                    ee(l, g);
                    Hb(l.toString());
                    kj(5)
                }
            });
            cm(this.g, "ddl-share-twitter", () => {
                var g = Ch(Ah("twitter_link", null) || Dh(d));
                Eh() || (g = g.indexOf("//") == 0 ? "https:" + g : g, g = "text=" + encodeURIComponent(b + "\n" + g), Hb("http://twitter.com/intent/tweet?" +
                    g), kj(6))
            });
            cm(this.g, "ddl-modal-copy-link-container", () => {
                dm(this, c);
                kj(16)
            })
        }
        close() {
            const a = this;
            return m(function*() {
                a.g.classList.add("ddl-closing");
                yield Qg(150);
                a.g.remove();
                a.g.classList.remove("ddl-closing");
                a.j()
            })
        }
    };
    const fm = $g();

    function gm(a) {
        a.g.classList.add("ddl-hidden")
    }

    function hm(a, b) {
        var c = document.querySelector("#ddlContentRoot");
        const d = a.g.querySelector(".ddl-share");
        d.addEventListener("click", () => {
            am(f, e, () => {
                kj(18);
                g.o();
                g.ha.appendChild(g.g);
                g.i.focus()
            })
        });
        const e = O("share_text").replace("[%s]", String(b)),
            f = Dh(Mh),
            g = new em(c, e, f, Mh, () => {}, () => {
                d.focus()
            })
    }

    function im(a, b) {
        const c = a.g.querySelector(".ddl-play-previous"),
            d = a.g.querySelector(".ddl-replay");
        b ? (c.classList.remove("ddl-hidden"), d.classList.add("ddl-gone"), a.g.classList.remove("GAME_OVER_BG_offset"), a.g.classList.add("GAME_WIN_BG_offset")) : (d.classList.remove("ddl-gone"), c.classList.add("ddl-hidden"), a.g.classList.remove("GAME_WIN_BG_offset"), a.g.classList.add("GAME_OVER_BG_offset"));
        a.g.querySelector(".ddl-score").textContent = String(a.ka.Aa);
        hm(a, a.ka.Aa);
        a.g.classList.remove("ddl-hidden")
    }
    var jm = class {
        constructor(a, b) {
            this.ka = b;
            this.g = Eg(Hg, {
                Je: O("btn_replay"),
                fe: O("btn_home"),
                Ne: O("btn_search"),
                Oe: O("btn_share"),
                He: O("btn_play_part_2"),
                Aa: "1000",
                Yd: O("happy_halloween"),
                he: xe() || !(!navigator.vendor || navigator.vendor.indexOf("Apple") !== 0)
            });
            a.appendChild(this.g);
            gm(this);
            Tg(this.g.querySelector(".ddl-header"), 32, 220, 50);
            Tg(this.g.querySelector(".ddl-score"), 36, 220, 60);
            this.g.querySelector(".ddl-replay").addEventListener("click", () => {
                mj("d2", this.ka.level);
                sj.log(104);
                ch(fm, 1)
            });
            this.g.querySelector(".ddl-home").addEventListener("click",
                () => {
                    mj("d2", this.ka.level);
                    sj.log(106);
                    ch(fm, 2)
                });
            this.g.querySelector(".ddl-search").addEventListener("click", () => {
                sj.log(105);
                kj(3);
                var e;
                (e = Ah("url", "")) && Ql(e, !0)
            });
            a = this.g.querySelector(".ddl-play-previous");
            a.addEventListener("click", () => {
                sj.log(107);
                Pl(Oh, !0)
            });
            const c = a.querySelector(".ddl-text");
            Tg(c, 18, 180, 50);
            const d = this.g.querySelector(".ddl-ghost-icon");
            a.addEventListener("pointerover", () => {
                d.classList.add("ddl-ghost-hover")
            });
            a.addEventListener("pointerout", () => {
                d.classList.remove("ddl-ghost-hover")
            });
            d.addEventListener("pointerover", () => {
                c.classList.add("ddl-play-prev-hover")
            });
            d.addEventListener("pointerout", () => {
                c.classList.remove("ddl-play-prev-hover")
            })
        }
    };
    const km = $g();
    var lm = class {
        constructor(a) {
            this.u = !1;
            this.i = Eg(Jg, {
                Ee: O("pause"),
                Ke: O("resume")
            });
            this.g = Eg(Kg, {
                Fe: O("paused"),
                Le: O("resume")
            });
            this.i.addEventListener("click", () => {
                this.u = !0;
                Gl(this.j);
                Hl(this.o);
                Hl(this.g);
                ch(km, 3)
            });
            this.j = this.i.querySelector(".ddl-pause-button");
            this.o = this.i.querySelector(".ddl-resume-button");
            this.g.addEventListener("click", () => {
                this.u = !1;
                Gl(this.o);
                Hl(this.j);
                Gl(this.g);
                ch(km, 4)
            });
            a.appendChild(this.i);
            a.appendChild(this.g);
            Gl(this.g);
            Hl(this.j);
            Gl(this.o)
        }
        mb() {
            return this.u
        }
    };
    const mm = $g(),
        nm = oc.Rb();

    function dh(a, b, c) {
        m(function*() {
            switch (b) {
                case 0:
                    var d;
                    (d = a.oa) == null || bk(d);
                    let f;
                    (f = a.oa) == null || ik(f);
                    yield Qg(2E3);
                    let g;
                    (g = a.oa) == null || ak(g);
                    im(a.Ib, !1);
                    mj("d2", a.ka.level);
                    nj(sj, 9);
                    sj.log(103);
                    break;
                case 1:
                    gm(a.Ib);
                    dc(nm);
                    var e = a.vb;
                    Gl(e.o);
                    Hl(e.j);
                    Gl(e.g);
                    a.ka.nb = 5;
                    a.ka.Aa = a.Ub;
                    a.Fb = !1;
                    a.Bb && (document.querySelector(".ddl-game-canvas").getContext("2d").filter = "saturate(100%)");
                    a.Bb = !1;
                    a.yb = !1;
                    a.Cb = 0;
                    a.oa = new om[a.Ra](a.ka);
                    a.oa.start();
                    break;
                case 2:
                    gm(a.Ib);
                    dc(nm);
                    e = a.vb;
                    Gl(e.o);
                    Hl(e.j);
                    Gl(e.g);
                    a.ka.nb = 5;
                    a.ka.Aa = 0;
                    a.ka.level = 0;
                    a.Ra = 1;
                    a.Ub = 0;
                    a.Fb = !1;
                    a.oa = new om[a.Ra](a.ka);
                    a.oa.start();
                    break;
                case 3:
                    let k;
                    (k = a.oa) == null || ak(k);
                    ec(nm);
                    break;
                case 4:
                    if ((d = a.oa) != null)
                        for (e of d.g.g) e.enabled = !0;
                    fc(nm);
                    break;
                case 5:
                    let l;
                    (l = a.oa) == null || bk(l);
                    Gl(a.vb.i);
                    c && Gl(a.Za);
                    break;
                case 6:
                    let p;
                    (p = a.oa) == null || dk(p);
                    Hl(a.vb.i);
                    c && Hl(a.Za);
                    break;
                case 7:
                    let z;
                    (z = a.oa) == null || ak(z);
                    let E;
                    (E = a.oa) == null || ik(E);
                    im(a.Ib, !0);
                    ij.s = a.ka.Aa;
                    sj.log(111);
                    nj(sj, 13)
            }
        })
    }

    function pm(a, b) {
        const c = Eg(Ng, {
            Jc: O("btn_mute"),
            Tc: O("btn_unmute")
        });
        b.appendChild(c);
        const d = c.querySelector(".ddl-mute"),
            e = c.querySelector(".ddl-unmute");
        Hl(d);
        c.addEventListener("click", () => {
            a.muted ? (a.muted = !1, nm.j && nm.g && nm.j.gain.setValueAtTime(1, nm.g.currentTime), nm.N = !1, Hl(d), Gl(e)) : (a.muted = !0, nm.j && nm.g && nm.j.gain.setValueAtTime(0, nm.g.currentTime), nm.N = !0, Hl(e), Gl(d))
        });
        return c
    }

    function qm(a) {
        if (a.oa instanceof Kl) return a.oa.video
    }
    var rm = class {
        constructor() {
            this.Ra = 0;
            this.Fb = !1;
            this.Cb = this.Ub = 0;
            this.muted = this.yb = this.Bb = !1;
            this.ka = {
                nb: 5,
                Aa: 0,
                level: 0
            };
            const a = document.querySelector("#ddlContentRoot");
            this.Za = pm(this, a);
            this.vb = new lm(a);
            this.Ib = new jm(a, this.ka);
            this.oa = new om[this.Ra](this.ka);
            this.oa.start();
            mm.addListener(this)
        }
        update(a) {
            const b = this;
            return m(function*() {
                if (b.oa.g.find(qi).length !== 0) {
                    if (!b.Bb) {
                        b.Bb = !0;
                        const c = fk(b.oa, b.oa.W());
                        c.get(Sd).V = () => {
                            b.yb = !0;
                            w(b.oa.g, c)
                        }
                    }
                    b.yb && (b.Cb += a, b.Cb >= 5E3 && (b.Cb = 0, b.yb = !1, b.Bb = !1, ek(b.oa)))
                }
                b.oa.update(b.yb ? a / 2.5 : a);
                if (b.oa.Xa() && !b.Fb) {
                    b.Fb = !0;
                    yield Zj(b.oa);
                    let c;
                    (c = b.oa.Fa) == null || c.stop();
                    b.Ra++;
                    b.Ub = b.ka.Aa;
                    b.Ra < om.length && (b.oa = new om[b.Ra](b.ka), yield b.oa.start(), b.Fb = !1)
                }
            })
        }
        mb() {
            return this.vb.mb()
        }
    };
    const om = [Ll, Fl, $k, yl, ll, Ok, Nl, Fk, Ol];

    function sm(a) {
        var b = a.getContext("2d");
        a = new Bd;
        a.g = [new Sj(a), new Xd(a, b)];
        v(a, new u(new B, new Nd));
        b = D(uc(), Pc);
        const c = new u(new B(y(b.g.H(), .5).add(new A(5, 5))), new C(b, 0, 0, y(b.g.H(), -.5)));
        v(a, c);
        T(c, new Ve(d => {
            c.get(B).rotation += -d / 200 % (2 * Math.PI)
        }, () => !1));
        return a
    }
    var tm = class {
        constructor(a) {
            this.i = a;
            this.j = !1;
            this.g = Eg(Pg, {
                Ae: O("loading")
            });
            this.o = sm(this.g.querySelector(".ddl-loading-canvas"))
        }
        update(a) {
            this.o.update(a)
        }
        load() {
            const a = this;
            return m(function*() {
                a.i.appendChild(a.g);
                yield Promise.all([hc.mc.o(), tc(), Qg(1E3)]);
                a.i.removeChild(a.g);
                a.j = !0;
                nj(sj, 2);
                return Promise.resolve()
            })
        }
    };

    function um() {
        const a = document.getElementById("hplogo"),
            b = document.getElementById("ddlDomRoot"),
            c = document.getElementById("ctaRoot"),
            d = document.getElementById("ddlContentRoot");
        if (a === null || b === null || c === null || d === null) throw Error("x");
        return {
            scale: 1,
            orientation: "landscape-primary",
            isFullscreen: !1,
            Lb: !1,
            width: 960,
            height: 540,
            ha: a,
            Ca: b,
            Ea: c,
            Ba: d
        }
    };

    function vm(a, b) {
        a.va.style.display = b ? "block" : "none"
    }
    var xm = class {
        constructor(a, b) {
            this.va = wm();
            this.va.style.top = "10px";
            this.va.style.right = "10px";
            this.va.style.width = "52px";
            this.va.style.height = "52px";
            this.va.style.cursor = "pointer";
            this.va.style.position = "absolute";
            this.va.style.pointerEvents = "all";
            this.va.style.background = "transparent";
            this.va.style.display = "none";
            this.va.setAttribute("role", "button");
            this.va.setAttribute("aria-label", "Close");
            this.va.tabIndex = 0;
            $a(this.va, "click", b);
            $a(this.va, "keydown", c => {
                c.keyCode !== 32 && c.keyCode !== 13 || b()
            });
            a.appendChild(this.va)
        }
    };
    const wm = () => {
        var a = 52 * (window.devicePixelRatio || 1);
        const b = document.createElement("canvas");
        b.width = a;
        b.height = a;
        const c = b.getContext("2d");
        c.fillStyle = "rgba(0,0,0,.3)";
        c.arc(a / 2, a / 2, a / 2, 0, 2 * Math.PI);
        c.fill();
        c.strokeStyle = "#fff";
        c.lineWidth = a / 52 * 3.5;
        const d = a / 52 * 2;
        c.beginPath();
        c.moveTo(a / 4 + d, a / 4 + d);
        c.lineTo(3 * a / 4 - d, 3 * a / 4 - d);
        c.stroke();
        c.beginPath();
        c.moveTo(3 * a / 4 - d, a / 4 + d);
        c.lineTo(a / 4 + d, 3 * a / 4 - d);
        c.stroke();
        return b
    };

    function ym(a) {
        return m(function*() {
            return new Promise(b => {
                setTimeout(() => {
                    b(void 0)
                }, a)
            })
        })
    };

    function zm(a) {
        Ne() ? setTimeout(() => {
            Am(a)
        }, 300) : (Bm(a), He() && F.g.includes("Safari") ? a.j = $a(a.Ea, "click", () => {
            Am(a)
        }, !0) : a.j = ab(a.Ea, "click", () => {
            Am(a)
        }, !0))
    }

    function Am(a) {
        return m(function*() {
            a.U && (yield Cm(a));
            return a.T()
        })
    }

    function Bm(a) {
        Le() && (a.v.start(), a.i && a.o && a.i.classList.add(a.o))
    }

    function Dm(a) {
        a.i && a.o && a.i.classList.remove(a.o);
        Pe(a.v)
    }

    function Cm(a) {
        return m(function*() {
            if (a.u) return a.u;
            a.Ea.classList.remove(a.g.zc);
            a.u = ym(500);
            yield a.u;
            a.i && a.i.remove();
            a.Ea.remove()
        })
    }
    var Em = class {
        constructor(a, b, c, d, e, f = !0) {
            this.i = b;
            this.o = c;
            this.N = d;
            this.T = e;
            this.U = f;
            this.Qa = 1;
            this.u = null;
            this.g = {
                qc: "hplogocta",
                zc: "showCta",
                yc: "ctaHideDuringLightbox"
            };
            this.Ea = a.Ea;
            this.Ea.classList.add(this.g.qc);
            Ne() || this.Ea.classList.add(this.g.zc);
            b && (this.Ea.appendChild(b), b.tabIndex = -1, b.ariaHidden = "true");
            this.v = new Qe(g => {
                this.N(g)
            });
            zm(this)
        }
    };
    const Fm = xe() && F.g.includes("OS 12_");

    function Gm(a, b, c) {
        a.style.position = "absolute";
        a.style.top = "0";
        a.style.left = "0";
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.direction = "ltr";
        a.dataset.width = b.toString();
        a.dataset.height = c.toString()
    }

    function Hm(a, b = !1) {
        const c = a.g.parentElement ? a.g.parentElement.offsetWidth : a.ha.offsetWidth,
            d = a.g.parentElement ? a.g.parentElement.offsetHeight : a.ha.offsetHeight;
        a.j && (window.scrollX === 0 && window.scrollY === 0 || window.scrollTo(0, 0));
        if (c !== a.u || d !== a.o || a.i.isFullscreen !== a.v || b) {
            b = Number(a.g.dataset.width);
            var e = Number(a.g.dataset.height);
            if (Ge()) throw Error("d");
            var f = Me() && Ae() && (Ae() && !we() || Be() && !Ae() || De() || Fe() || Ce()) && !ze() && !we() && a.i.orientation === "landscape-primary" ? b < e !== c < d : !1;
            var g = (a.i.Lb =
                    f) ? Math.min(c / e, d / b) : Math.min(c / b, d / e),
                k = g * b,
                l = g * e;
            a.i.scale = g;
            g = `scale(${g}, ${g})`;
            var p = (k - b) / 2;
            var z = (l - e) / 2;
            var E = f ? Math.abs(c - l) / 2 : Math.abs(c - k) / 2,
                G = f ? Math.abs(d - k) / 2 : Math.abs(d - l) / 2;
            f ? (f = (k - l) / 2, k = p - f + E, z = z + f + G, g += "rotate(90deg)") : (k = E + p, z += G);
            wh(a.g, "TransformOrigin", "center center");
            wh(a.g, "Transform", g);
            Sl(a.g, ["position", "absolute"], ["width", `${b}px`], ["height", `${e}px`], ["left", `${k}px`], ["top", `${z}px`]);
            Fm && a.j && (b = document.documentElement, e = b.getBoundingClientRect(), e.width === c && e.height ===
                d || Sl(b, ["width", `${c}px`], ["height", `${d}px`]));
            a.j && !F.g.includes("CriOS") && c > 0 && document.body.clientWidth !== c && (document.body.clientWidth < document.body.scrollWidth && (document.body.style.width = `${Math.min(document.body.scrollWidth, c)}px`), document.body.clientWidth > c && (document.body.style.width = `${c}px`));
            a.j && Sl(a.ha, ["height", "100%"], ["width", "100%"]);
            a.u = c;
            a.o = d;
            a.v = a.i.isFullscreen
        }
    }
    var Im = class {
        constructor(a) {
            this.i = a;
            this.o = this.u = 0;
            this.v = !1;
            this.ha = a.ha;
            this.g = document.querySelector("#uidsdoodle") ? a.ha : a.Ca;
            Gm(this.g, a.width, a.height);
            this.j = Me();
            window.addEventListener("resize", () => {
                Hm(this)
            })
        }
        setSize(a, b) {
            this.g.dataset.width = a.toString();
            this.g.dataset.height = b.toString()
        }
    };
    var Jm = class {
        g() {
            return !0
        }
    };
    var Km = class extends Jm {
        contains() {
            return !1
        }
    };

    function Lm(a) {
        var b = a.Ba.getBoundingClientRect();
        const c = a.j.Lb ? b.height : b.width;
        b = a.j.Lb ? b.width : b.height;
        const [d, e] = a.getSize();
        a.ta = d / c;
        a.N = e / b
    }
    var Mm = class {
        constructor(a) {
            this.j = a;
            this.o = [];
            this.g = this.i = null;
            this.U = this.T = 0;
            this.W = this.u = !1;
            this.v = [];
            this.N = this.ta = 1;
            this.Ba = this.j.Ba;
            this.wa = [this.Ba];
            $a(window, "resize", () => {
                Lm(this)
            });
            a = () => {
                ab(window, "resize", () => {
                    Lm(this)
                })
            };
            window.hasOwnProperty("screen") && window.screen.hasOwnProperty("orientation") && !xe() ? $a(screen.orientation, "change", a) : $a(window, "orientationchange", a);
            Lm(this)
        }
        handleEvent(a) {
            Lm(this);
            var b = a.i;
            var c = void 0;
            b = (b = b || window.event) ? (c = c || b.targetTouches && b.targetTouches[0] ||
                b.changedTouches && b.changedTouches[0]) && c.pageX !== void 0 ? [c.pageX, c.pageY] : b.clientX !== void 0 ? [b.clientX + (document.dir == "rtl" ? -1 : 1) * (document.body.scrollLeft || document.documentElement.scrollLeft || 0), b.clientY + (document.body.scrollTop || document.documentElement.scrollTop || 0)] : b.pageX !== void 0 ? [b.pageX, b.pageY] : [0, 0] : [0, 0];
            c = this.Ba.getBoundingClientRect();
            if (this.j.Lb) {
                var d = c.right - b[0];
                b[0] = b[1] - c.top;
                b[1] = d
            } else b[0] -= c.left, b[1] -= c.top;
            b[0] *= this.ta;
            b[1] *= this.N;
            c = b[1];
            this.T = b[0];
            this.U = c;
            a = a.type;
            if (!this.W || a.indexOf("mouse") !== 0) {
                b = {
                    touchstart: "mousedown",
                    touchend: "mouseup",
                    touchmove: "mousemove"
                };
                a in b && (this.W = !0, a = b[a]);
                c = a;
                a = this.T;
                b = this.U;
                if (!this.u && c === "mousedown")
                    for (this.u = !0, d = 0; d < this.v.length; d++) this.v[d]();
                if (c === "mousedown") {
                    if (!this.i)
                        for (c = 0; c < this.o.length; c++)
                            if (d = this.o[c], d.i.contains(a, b)) {
                                this.g = this.i = d;
                                d.g("mousedown", a, b);
                                break
                            }
                } else if (c === "mouseup") this.i ? (this.i.g("mouseup", a, b), this.i = null) : this.g && this.g.g("mouseup", a, b);
                else if (c === "mousemove" || c === "areamove") {
                    d =
                        null;
                    for (let e = 0; e < this.o.length; e++) {
                        const f = this.o[e];
                        if (f.i.contains(a, b)) {
                            d = f;
                            break
                        }
                    }
                    this.g !== d && (this.g && this.g.g("mouseout", a, b), d && d.g("mouseover", a, b), this.g = d);
                    if (c === "mousemove")
                        for (this.i && this.i.g("mousemove", a, b), c = 0; c < this.o.length; c++) d = this.o[c], d !== this.i && d.i.contains(a, b) && d.g("mousemove", a, b)
                } else c === "mouseout" ? (this.g && this.g.g("mouseout", a, b), this.g = this.i = null) : c === "contextmenu" && this.g && this.g.g("contextmenu", a, b);
                a = this.g && this.g.i.g() ? "pointer" : "default";
                for (const e of this.wa) e.style.cursor =
                    a
            }
        }
        getSize() {
            return [this.j.width, this.j.height]
        }
    };
    (() => {
        const a = new Km;
        a.contains = () => !0;
        a.g = () => !1;
        return a
    })();
    const Nm = document[yh(document, "exitFullscreen")],
        Om = yh(document, "fullscreenElement"),
        Pm = yh(document, "fullscreenEnabled");

    function Qm(a) {
        a.i && window.screen.orientation && window.screen.orientation.lock && window.screen.orientation.lock(a.i).catch(() => {})
    }

    function Rm(a, b) {
        a.i = b;
        a.g.orientation = b;
        document[Om] && Qm(a)
    }
    var Tm = class {
        constructor(a) {
            this.g = a;
            this.i = null;
            this.ha = a.ha;
            a = yh(this.ha, "requestFullscreen");
            this.o = this.ha[a];
            a = !(!document[Pm] || !Nm);
            if (Ge()) throw Error("d");
            if (this.j = (xe() ? !1 : Fe() && !(ze() || ye() && !xe()) || Ce() && Ae()) && a) document.body.style.margin = "0", Sl(this.ha, ["overflow", "visible"], ["width", "100%"], ["height", "100%"]), document.body.scrollLeft = 0, $a(window, "scroll", Sm, !0)
        }
    };
    const Sm = a => {
        a.preventDefault();
        a.stopPropagation();
        return !1
    };
    let Um;
    const Vm = {
        Cf: "resizeComplete",
        Te: "hibernate",
        Hf: "wake"
    };

    function Wm() {
        Um || (Um = new Xm);
        return Um
    }

    function Ym(a) {
        var b = Wm();
        $a(b.g, "hibernate", a)
    }

    function Zm(a) {
        var b = Wm();
        $a(b.g, "wake", a)
    }
    var Xm = class {
        constructor() {
            Je();
            this.i = a => {
                Object.values(Vm).includes(a.data.cmd) && this.g.dispatchEvent(new CustomEvent(a.data.cmd, a.data))
            };
            this.g = document.createElement("div");
            window.addEventListener("message", this.i)
        }
        destroy() {
            window.removeEventListener("message", this.i);
            var a = this.g;
            if (a)
                if (Na(a)) a.Yb();
                else if (a = fb(a)) {
                var b = 0;
                for (const c in a.g) {
                    const d = a.g[c].concat();
                    for (let e = 0; e < d.length; ++e) kb(d[e]) && ++b
                }
            }
        }
    };

    function $m(a) {
        ua.call(this);
        this.i = a;
        this.g = {}
    }
    pa($m, ua);
    var an = [];

    function bn(a, b, c, d, e) {
        Array.isArray(c) || (c && (an[0] = c.toString()), c = an);
        for (let f = 0; f < c.length; f++) {
            const g = $a(b, c[f], d || a.handleEvent, e || !1, a.i || a);
            if (!g) break;
            a.g[g.key] = g
        }
    }

    function cn(a) {
        Ra(a.g, function(b, c) {
            this.g.hasOwnProperty(c) && kb(b)
        }, a);
        a.g = {}
    }
    $m.prototype.Sa = function() {
        $m.Ab.Sa.call(this);
        cn(this)
    };
    $m.prototype.handleEvent = function() {
        throw Error("z");
    };

    function dn(a, b, c) {
        new en(a, b, c)
    }

    function fn(a) {
        var b = window.agsa_ext;
        if (!a.ta && !a.o && b && b.getPageVisibility) return b.getPageVisibility() === "hidden";
        b = document[a.o];
        return document[a.ta] || b === "hidden"
    }

    function gn(a) {
        a.T ? hn(a) : ye() && !xe() && jn(a, () => {
            hn(a)
        })
    }

    function kn(a) {
        bn(a.U, document, "mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup".split(" "), () => void ln(a), !0);
        bn(a.U, window, ["orientationchange", "resize"], () => void ln(a), !0)
    }

    function mn(a) {
        const b = a.g || a.i || a.N;
        a.j && !b ? (a.j = !1, a.ya(), nn(a)) : !a.j && b && (a.j = !0, a.wa())
    }

    function nn(a) {
        a.timeout && clearTimeout(a.timeout);
        a.timeout = setTimeout(() => {
            a.timeout = void 0;
            a.i = Date.now() - a.v >= a.W;
            a.i || nn(a);
            mn(a)
        }, Math.max(100, a.W - (Date.now() - a.v)))
    }

    function ln(a) {
        a.v = Date.now();
        a.i = !1;
        mn(a)
    }

    function hn(a) {
        a.u = () => {
            a.g = fn(a);
            a.g ? mn(a) : ln(a)
        };
        const b = window.agsa_ext;
        a.T ? document.addEventListener(a.T, a.u, !1) : b && b.registerPageVisibilityListener && (Bh(() => {
            a.u && a.u()
        }), b.registerPageVisibilityListener("google.doodle.pvc();"))
    }

    function jn(a, b) {
        window.agsa_ext ? b() : setTimeout(() => {
            gn(a)
        }, 100)
    }
    var en = class {
        constructor(a, b, c) {
            this.W = a;
            this.wa = b;
            this.ya = c;
            this.i = !1;
            this.u = () => {};
            this.N = !1;
            this.v = Date.now();
            this.ta = yh(document, "hidden");
            this.T = (this.o = yh(document, "visibilityState")) ? this.o.replace(/state$/i, "change").toLowerCase() : null;
            this.j = this.g = fn(this);
            this.U = new $m;
            gn(this);
            kn(this);
            Ym(() => {
                this.N = !0;
                mn(this)
            });
            Zm(() => {
                this.N = !1;
                mn(this)
            });
            nn(this)
        }
    };

    function on(a, b) {
        const c = document.createElement("div");
        c.classList.add("lightboxContainer");
        c.classList.add("lightboxBackground");
        a.ha.appendChild(c);
        const d = document.createElement("div");
        d.classList.add("lightboxContentContainer");
        c.appendChild(d);
        b.classList.add("lightboxContent");
        Sl(b, ["position", "relative"], ["left", "50%"], ["top", "50%"]);
        d.appendChild(b);
        b = new xm(b, () => {
            pn(a)
        });
        c.appendChild(b.va);
        window.addEventListener("resize", () => {
            a.i()
        });
        return {
            va: b,
            Ya: c,
            Pb: d
        }
    }

    function pn(a) {
        m(function*() {
            a.g && (document.body.classList.remove("ddlLightboxNoScroll"), kb(a.j), a.ha.classList.remove("lightboxMode"), a.Ya.classList.remove("lightboxBackground"), a.Ya.classList.remove("lightboxEnabled"), a.g = !1, a.u(), vm(a.va, !1), Ae() || !F.g.includes("Safari") || F.g.includes("Chrome") || (a.ha.style.display = "none", a.ha.offsetWidth, a.ha.style.display = "block"), yield ym(0))
        })
    }

    function qn(a) {
        return m(function*() {
            a.g || (yield ym(0), document.body.classList.add("ddlLightboxNoScroll"), a.ha.classList.add("lightboxMode"), a.Ya.classList.add("lightboxBackground"), a.Ya.getBoundingClientRect(), a.Ya.classList.add("lightboxEnabled"), a.g = !0, a.i(), a.j = $a(document, "keydown", b => {
                b.keyCode === 27 && pn(a)
            }), vm(a.va, !0), yield ym(500))
        })
    }
    var rn = class {
        constructor(a, b, c, d, e = () => {}, f = () => {}) {
            this.ha = a;
            this.o = b;
            this.i = e;
            this.j = null;
            this.g = !1;
            this.i = e;
            this.u = f;
            const {
                va: g,
                Ya: k,
                Pb: l
            } = on(this, b);
            this.va = g;
            this.Ya = k;
            this.Pb = l;
            this.setSize(c, d)
        }
        setSize(a, b) {
            Sl(this.Pb, ["maxWidth", `${a}px`], ["maxHeight", `${b}px`]);
            Sl(this.o, ["width", `${a}px`], ["height", `${b}px`])
        }
    };
    var sn = a => {
            if (xe() && (Fe() || Ce()))
                for (const b of a) $a(b, "touchmove", c => {
                    c.scale !== 1 && c.preventDefault()
                }, {
                    passive: !1
                })
        },
        tn = a => {
            for (const b of a) $a(b, "contextmenu", c => {
                c.preventDefault()
            }, {
                passive: !1
            })
        };
    let un = null;

    function vn(a) {
        m(function*() {
            if (a.doodle && F.url.g.get("ddllb") === "1") {
                var b = a.j;
                b.j !== void 0 && b.j !== null && kb(b.j);
                yield Am(b)
            }
        })
    }

    function wn(a) {
        return m(function*() {
            if (He()) {
                var b = a.g.Gc;
                const c = new be("/");
                pe(c, "fpdoodle", "1");
                pe(c, "doodle", String(b));
                Fh && pe(c, "hl", Fh);
                Gh && pe(c, "gl", Gh);
                Ql(c.toString(), !1)
            } else if (!De() || Ne()) a.setSize(a.g.width, a.g.height), a.v.start(), a.ya = !0, a.ta = !0, a.ha.removeAttribute("title"), $b(a.doodle.wc.ha), nj(xn, 1), yield yn(a), kj(0), Hm(a.o, !0), zn(a.doodle)
        })
    }

    function An(a, b) {
        const c = b ? 0 : -1,
            d = b ? "false" : "true";
        for (const e of a.Ca.children) e instanceof HTMLElement && (e.tabIndex = c, e.ariaHidden = d);
        a = a.j;
        b = !b;
        a.Ea.tabIndex = b ? 0 : -1;
        a.Ea.ariaHidden = b ? "false" : "true"
    }

    function Bn(a) {
        sn([document, a.ha, a.Ca, a.Ba]);
        tn([a.ha, a.Ca, a.Ba]);
        bn(a.U, a.ha, "touchend", () => {
            var b = a.fullscreen;
            b.j && !document[Om] && (b.o.call(b.ha), Qm(b), b.g.isFullscreen = !!document[Om])
        })
    }

    function Cn(a) {
        bn(a.U, a.Ca, ["mousedown", "mouseout", "touchstart"], b => {
            a.u.handleEvent(b)
        });
        bn(a.U, document, ["mouseup", "mousemove", "touchend", "touchmove", "contextmenu"], b => {
            a.u.handleEvent(b)
        })
    }

    function Dn(a) {
        for (const b of a.Ia) {
            let c, d;
            (d = (c = b).g) == null || d.call(c, a.i)
        }
    }

    function yn(a) {
        return m(function*() {
            if (a.T) return En(a);
            An(a, !0);
            Lm(a.u)
        })
    }

    function En(a) {
        return m(function*() {
            a.N = new rn(a.ha, a.Ca, a.g.width, a.g.height, () => {
                Hm(a.o, !0);
                Lm(a.u)
            }, () => {
                a.Wb()
            });
            yield Fn(a);
            a.Ca.addEventListener("click", () => Gn(a))
        })
    }

    function Hn(a) {
        Lm(a.u);
        a.ya && a.ta ? (De() && un && (kb(un), un = null), a.v.start()) : Bm(a.j);
        a.doodle.Xb()
    }

    function In(a, b) {
        a.W = b
    }

    function Fn(a) {
        return m(function*() {
            var b = a.j;
            b.Qa !== 0 && b.Ea.classList.add(b.g.yc);
            b = a.wa;
            if (b.Qa !== 0)
                for (const e of b.Ca.children) e.classList.contains(b.g) || e.classList.remove("contentHide");
            a.setSize(a.g.width, a.g.height);
            let c, d;
            (c = a.W) == null || (d = c.Nf) == null || d.call(c);
            An(a, !0);
            a.ha.removeAttribute("title");
            yield qn(a.N)
        })
    }

    function Gn(a) {
        return m(function*() {
            let b;
            (b = a.N) != null && b.g || (yield Fn(a), Hn(a))
        })
    }
    var Ln = class {
        constructor(a, b, c) {
            this.g = a;
            this.ta = this.ya = !1;
            this.W = null;
            this.Ia = [];
            De() && !Ne() && (a.La.Re = !1);
            this.i = um();
            this.ha = this.i.ha;
            this.Ga = this.ha.title;
            this.Ba = this.i.Ba;
            this.Ca = this.i.Ca;
            this.i.width = this.g.width;
            this.i.height = this.g.height;
            (this.T = !He() && !Ae() && !Ce() && !Ge() && !De() && !Fe()) && this.Ca.classList.add("domRootLightboxed");
            let d;
            dn((d = a.Mf) != null ? d : 6E4, () => {
                Pe(this.v);
                Dm(this.j);
                Jn(this.doodle)
            }, () => {
                this.Xb()
            });
            this.U = new $m(this);
            this.u = new Mm(this.i);
            this.fullscreen = new Tm(this.i);
            Rm(this.fullscreen, this.g.orientation);
            this.o = new Im(this.i);
            this.va = new xm(this.Ca, () => {
                var e = this.fullscreen;
                Nm.call(document);
                e.g.isFullscreen = !!document[Om]
            });
            this.va.va.classList.add("closeFullscreenBtn");
            this.j = new Em(this.i, this.g.La.Ge, this.g.La.Vd, () => {}, () => wn(this), this.g.La.Re !== !1 && !this.T && !He());
            this.wa = new Kn(this.i.Ca, this.j.g.qc, this.g.La.Qa);
            this.v = new Qe(e => {
                this.update(e)
            });
            An(this, Ne());
            Bn(this);
            Hm(this.o);
            a = this.i.Ba;
            if (!this.i.ha || !a) throw console.error("Unable to render the Doodle. This is expected during unit tests but may be a cause for concern elsewhere."),
                Error();
            Cn(this);
            Dn(this);
            this.doodle = new b(this, ...c);
            this.setSize(this.g.La.width, this.g.La.height);
            De() && !Ne() && this.ha.addEventListener("click", () => {
                const e = new URL("https://www.google.com/webhp"),
                    f = e.searchParams;
                f.set("ddllb", "1");
                f.set("doodle", this.g.Gc);
                Fh && f.set("hl", Fh);
                Gh && f.set("gl", Gh);
                Pl(e.toString(), !0)
            })
        }
        setSize(a, b) {
            this.i.width = a;
            this.i.height = b;
            this.o.setSize(a, b);
            let c;
            (c = this.N) == null || c.setSize(a, b);
            Hm(this.o, !0)
        }
        Xb() {
            let a;
            !this.T || ((a = this.N) == null ? 0 : a.g) ? Hn(this) : Bm(this.j)
        }
        update(a) {
            vm(this.va,
                !!document[Om]);
            this.doodle.Ma(a)
        }
        Wb() {
            Pe(this.v);
            Dm(this.j);
            Jn(this.doodle);
            An(this, !1);
            this.ha.setAttribute("title", this.Ga);
            var a = this.j;
            a.Qa !== 0 && (a.Ea.classList.remove(a.g.yc), Bm(a));
            a = this.wa;
            if (a.Qa !== 0)
                for (const d of a.Ca.children) d.classList.contains(a.g) || d.classList.add("contentHide");
            Hm(this.o, !0);
            this.setSize(this.g.La.width, this.g.La.height);
            let b, c;
            (b = this.W) == null || (c = b.Wb) == null || c.call(b)
        }
    };
    class Kn {
        constructor(a, b, c) {
            this.Ca = a;
            this.g = b;
            this.Qa = c
        }
    };
    var Nn = () => {
            var a = ["Itim", "Google Sans", "Google Sans Text"];
            let b, c;
            const d = new Promise((e, f) => {
                b = e;
                c = f
            });
            if (window.WebFontConfig && a) {
                for (const e of a) Mn(e);
                return d
            }
            oa("WebFontConfig.active", b);
            oa("WebFontConfig.inactive", c);
            oa("WebFontConfig.timeout", 6E4);
            oa("WebFontConfig.google.families", a);
            a = yg(document, "SCRIPT");
            Jb(a);
            a.type = "text/javascript";
            a.async = !0;
            (document.getElementById("xjsc") || document.body).appendChild(a);
            return d
        },
        Mn = a => {
            a = a.toLowerCase().replace(/ /g, "");
            const b = document.documentElement.classList;
            for (const c of b.values())
                if (c.search(`wf-${a}-w+-active`)) break
        };

    function On(a) {
        const b = new XMLHttpRequest;
        b.open("GET", a);
        return new Promise((c, d) => {
            b.send();
            b.onreadystatechange = () => {
                if (b.readyState == 4)
                    if (b.status == 200 && b.responseText) a: {
                        var e = b.responseText;e.startsWith(")]}'\n") && (e = e.substring(5));
                        let f = {};
                        try {
                            f = JSON.parse(e)
                        } catch (g) {
                            d(e);
                            break a
                        }
                        f.hasOwnProperty("ddllog") && (f = f.ddllog);f.hasOwnProperty("__err__") ? d(f.__err__) : c(f)
                    }
                else d(b)
            }
        })
    }

    function Pn(a, b, c = () => {}, d = !1) {
        d = d ? "//www.google.com" : "";
        d = new be("ddllog".startsWith("/") ? `${d}${"ddllog"}` : `${d}/async/${"ddllog"}`);
        ee(d, b);
        d = d.toString();
        a.g++;
        c(a.g);
        return On(d).catch(e => a.g < 1 ? a.i(2E3 * Math.pow(2, a.g - 1)).then(() => Pn(a, b, c)) : Promise.reject(e)).finally(() => a.g = 0)
    }
    class Qn {
        constructor(a) {
            this.g = 0;
            this.i = a
        }
    };
    class Rn extends Qn {
        constructor() {
            super(a => new Promise(b => setTimeout(b, a)))
        }
    };
    var Sn = class extends hg {};
    var Tn = () => {
        if (Lh() && Kh()) return Promise.resolve();
        let a = `_fmt:jspb,doodle:${Mh},slot:0,` + "type:3,cta:1";
        De() && (a += ",ntp:1");
        Lh() && (a += ",impr:0");
        const b = new he;
        b.add("async", a);
        return Pn(new Rn, b, void 0, !1).then(c => {
            c = new Sn(c);
            if (!Lh() && eg(c, 2)) {
                const d = eg(c, 2);
                Hh = (new be(d)).g.get("ved", "")
            }!Kh() && eg(c, 3) && (Jh = eg(c, 3))
        }).catch(() => Promise.resolve())
    };
    const ac = oc.Rb(),
        xn = sj;

    function zn(a) {
        m(function*() {
            var b;
            (b = a.j) != null && (b.isVisible = !1, Pe(b.i));
            a.i = new tm(a.Ba);
            yield a.i.load();
            b = Eg(Fg);
            a.Ba.appendChild(b);
            a.g = new rm
        })
    }

    function Jn(a) {
        ec(ac);
        let b, c;
        (b = a.g) != null && (c = qm(b)) != null && c.g.pause()
    }
    class Un {
        constructor(a, b) {
            a.i.ha.appendChild(Ag());
            this.wc = a.i;
            this.Ba = this.wc.Ba;
            b && (this.j = new Se(b), Re(this.j), In(a, {
                Wb: () => {
                    let c;
                    (c = this.j) == null || Re(c)
                }
            }))
        }
        Ma(a) {
            let b;
            if ((b = this.i) == null || !b.j) {
                let d;
                (d = this.i) == null || d.update(a)
            }
            let c;
            (c = this.g) == null || c.update(a)
        }
        Xb() {
            if (xe()) ab(this.Ba, "pointerdown", () => {
                let c;
                ((c = this.g) == null ? 0 : c.mb()) || fc(ac)
            });
            else {
                let c;
                ((c = this.g) == null ? 0 : c.mb()) || fc(ac)
            }
            let a, b;
            (a = this.g) != null && (b = qm(a)) != null && (b.o ? b.g.play() : Promise.resolve())
        }
    }
    m(function*() {
        lj();
        var a = [Tn(), of().load(Fh, Gh, pc, "/logos/2024/halloween24/rc3/"), sc(uc(), vc.Cd), Nn()];
        const b = Eg(Gg);
        try {
            yield Promise.all(a);
            a = {
                width: 640,
                height: 360,
                Gc: Mh,
                orientation: "landscape-primary",
                La: {
                    width: 432,
                    height: 200,
                    Ge: b,
                    Vd: "ctaAnimated",
                    Qa: 1
                }
            };
            var c = Un,
                d = [Ne() ? void 0 : b];
            const e = new Ln(a, c, d);
            vn(e);
            return e.doodle
        } catch (e) {
            console.error("Failed to initialize Doodle. Error: ", e)
        }
    });
}).call(this);