(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    'use strict';
    var r, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("a");
    }
    var ca = ba(this);
    function da(a, b) {
        if (b)
            a: {
                var c = ca;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c))
                        break a;
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && aa(c, a, {
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
        }
        )
    }
    function u(a) {
        return ea(a())
    }
    da("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
            return c
        }
    });
    da("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b))
                    return !0
            }
            return !1
        }
    });
    function fa(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
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
        }
        ;
        return e
    }
    da("Array.prototype.values", function(a) {
        return a ? a : function() {
            return fa(this, function(b, c) {
                return c
            })
        }
    });
    da("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
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
    var ha = ha || {}
      , A = this || self;
    function ia() {
        throw Error("b");
    }
    function ja(a) {
        a.wc = void 0;
        a.Ua = function() {
            return a.wc ? a.wc : a.wc = new a
        }
    }
    function ka(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
    function la(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    function ma(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function na(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
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
    function oa(a, b, c) {
        oa = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ma : na;
        return oa.apply(null, arguments)
    }
    function qa(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
    function ra(a, b) {
        a = a.split(".");
        var c = A;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
    function sa(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Qb = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Jg = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
                g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    }
    function ta(a) {
        return a
    }
    ;function ua(a, b) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, ua);
        else {
            const c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    sa(ua, Error);
    ua.prototype.name = "CustomError";
    var va;
    function wa() {
        throw Error("c");
    }
    function xa(a, b) {
        b = String.fromCharCode.apply(null, b);
        return null == a ? b : a + b
    }
    let ya = void 0, za;
    const Aa = "undefined" !== typeof TextDecoder;
    let Ba;
    const Ca = "undefined" !== typeof TextEncoder;
    function Da(a) {
        if (Ca)
            a = (Ba || (Ba = new TextEncoder)).encode(a);
        else {
            let c = 0;
            const d = new Uint8Array(3 * a.length);
            for (let e = 0; e < a.length; e++) {
                var b = a.charCodeAt(e);
                if (128 > b)
                    d[c++] = b;
                else {
                    if (2048 > b)
                        d[c++] = b >> 6 | 192;
                    else {
                        if (55296 <= b && 57343 >= b) {
                            if (56319 >= b && e < a.length) {
                                const f = a.charCodeAt(++e);
                                if (56320 <= f && 57343 >= f) {
                                    b = 1024 * (b - 55296) + f - 56320 + 65536;
                                    d[c++] = b >> 18 | 240;
                                    d[c++] = b >> 12 & 63 | 128;
                                    d[c++] = b >> 6 & 63 | 128;
                                    d[c++] = b & 63 | 128;
                                    continue
                                } else
                                    e--
                            }
                            b = 65533
                        }
                        d[c++] = b >> 12 | 224;
                        d[c++] = b >> 6 & 63 | 128
                    }
                    d[c++] = b & 63 | 128
                }
            }
            a = c === d.length ? d : d.subarray(0, c)
        }
        return a
    }
    ;function Ea(a) {
        A.setTimeout( () => {
            throw a;
        }
        , 0)
    }
    ;var Fa = /&/g
      , Ga = /</g
      , Ha = />/g
      , Ia = /"/g
      , Ja = /'/g
      , Ka = /\x00/g
      , La = /[\x00&<>"']/;
    var Ma, Na;
    a: {
        for (var Oa = ["CLOSURE_FLAGS"], Pa = A, Qa = 0; Qa < Oa.length; Qa++)
            if (Pa = Pa[Oa[Qa]],
            null == Pa) {
                Na = null;
                break a
            }
        Na = Pa
    }
    var Ra = Na && Na[610401301];
    Ma = null != Ra ? Ra : !1;
    function Sa() {
        var a = A.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var Ta;
    const Ua = A.navigator;
    Ta = Ua ? Ua.userAgentData || null : null;
    function Va(a) {
        return Ma ? Ta ? Ta.brands.some( ({brand: b}) => b && -1 != b.indexOf(a)) : !1 : !1
    }
    function Wa(a) {
        return -1 != Sa().indexOf(a)
    }
    ;function Xa() {
        return Ma ? !!Ta && 0 < Ta.brands.length : !1
    }
    function Ya() {
        return Xa() ? !1 : Wa("Trident") || Wa("MSIE")
    }
    function Za() {
        return Xa() ? Va("Chromium") : (Wa("Chrome") || Wa("CriOS")) && !(Xa() ? 0 : Wa("Edge")) || Wa("Silk")
    }
    ;const $a = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (let c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , ab = Array.prototype.some ? function(a, b) {
        return Array.prototype.some.call(a, b, void 0)
    }
    : function(a, b) {
        const c = a.length
          , d = "string" === typeof a ? a.split("") : a;
        for (let e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    }
    ;
    function bb(a, b) {
        b = $a(a, b);
        let c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
    ;function cb(a) {
        cb[" "](a);
        return a
    }
    cb[" "] = function() {}
    ;
    var db = Ya()
      , eb = Wa("Gecko") && !(-1 != Sa().toLowerCase().indexOf("webkit") && !Wa("Edge")) && !(Wa("Trident") || Wa("MSIE")) && !Wa("Edge")
      , fb = -1 != Sa().toLowerCase().indexOf("webkit") && !Wa("Edge");
    !Wa("Android") || Za();
    Za();
    Wa("Safari") && (Za() || (Xa() ? 0 : Wa("Coast")) || (Xa() ? 0 : Wa("Opera")) || (Xa() ? 0 : Wa("Edge")) || (Xa() ? Va("Microsoft Edge") : Wa("Edg/")) || Xa() && Va("Opera"));
    var gb = {}
      , hb = null;
    function ib(a, b) {
        void 0 === b && (b = 0);
        jb();
        b = gb[b];
        const c = Array(Math.floor(a.length / 3))
          , d = b[64] || "";
        let e = 0
          , f = 0;
        for (; e < a.length - 2; e += 3) {
            var g = a[e]
              , h = a[e + 1]
              , k = a[e + 2]
              , l = b[g >> 2];
            g = b[(g & 3) << 4 | h >> 4];
            h = b[(h & 15) << 2 | k >> 6];
            k = b[k & 63];
            c[f++] = l + g + h + k
        }
        l = 0;
        k = d;
        switch (a.length - e) {
        case 2:
            l = a[e + 1],
            k = b[(l & 15) << 2] || d;
        case 1:
            a = a[e],
            c[f] = b[a >> 2] + b[(a & 3) << 4 | l >> 4] + k + d
        }
        return c.join("")
    }
    function kb(a) {
        var b = a.length
          , c = 3 * b / 4;
        c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
        var d = new Uint8Array(c)
          , e = 0;
        lb(a, function(f) {
            d[e++] = f
        });
        return e !== c ? d.subarray(0, e) : d
    }
    function lb(a, b) {
        function c(k) {
            for (; d < a.length; ) {
                var l = a.charAt(d++)
                  , m = hb[l];
                if (null != m)
                    return m;
                if (!/^[\s\xa0]*$/.test(l))
                    throw Error("e`" + l);
            }
            return k
        }
        jb();
        for (var d = 0; ; ) {
            var e = c(-1)
              , f = c(0)
              , g = c(64)
              , h = c(64);
            if (64 === h && -1 === e)
                break;
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2),
            64 != h && b(g << 6 & 192 | h))
        }
    }
    function jb() {
        if (!hb) {
            hb = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                gb[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === hb[f] && (hb[f] = e)
                }
            }
        }
    }
    ;var mb = "undefined" !== typeof Uint8Array
      , nb = !db && "function" === typeof btoa;
    function ob(a) {
        if (!nb)
            return ib(a);
        let b = ""
          , c = 0;
        const d = a.length - 10240;
        for (; c < d; )
            b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
        b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
        return btoa(b)
    }
    const pb = /[-_.]/g
      , qb = {
        "-": "+",
        _: "/",
        ".": "="
    };
    function rb(a) {
        return qb[a] || ""
    }
    function sb(a) {
        if (!nb)
            return kb(a);
        pb.test(a) && (a = a.replace(pb, rb));
        a = atob(a);
        const b = new Uint8Array(a.length);
        for (let c = 0; c < a.length; c++)
            b[c] = a.charCodeAt(c);
        return b
    }
    function tb(a) {
        return mb && null != a && a instanceof Uint8Array
    }
    let ub;
    function vb() {
        return ub || (ub = new Uint8Array(0))
    }
    function wb(a, b) {
        const c = a.length;
        if (c !== b.length)
            return !1;
        for (let d = 0; d < c; d++)
            if (a[d] !== b[d])
                return !1;
        return !0
    }
    var xb = {};
    let yb;
    function zb() {
        return yb || (yb = new Ab(null,xb))
    }
    function Bb(a) {
        if (xb !== xb)
            throw Error("f");
        var b = a.wb;
        b = null == b || tb(b) ? b : "string" === typeof b ? sb(b) : null;
        return null == b ? b : a.wb = b
    }
    function Cb(a, b) {
        if (!a.wb || !b.wb || a.wb === b.wb)
            return a.wb === b.wb;
        if ("string" === typeof a.wb && "string" === typeof b.wb) {
            var c = a.wb;
            let d = b.wb;
            b.wb.length > a.wb.length && (d = a.wb,
            c = b.wb);
            if (0 !== c.lastIndexOf(d, 0))
                return !1;
            for (b = d.length; b < c.length; b++)
                if ("=" !== c[b])
                    return !1;
            return !0
        }
        c = Bb(a);
        b = Bb(b);
        return wb(c, b)
    }
    function Db(a, b) {
        if ("string" === typeof b)
            b = b ? new Ab(b,xb) : zb();
        else if (b instanceof Uint8Array)
            b = new Ab(b,xb);
        else if (!(b instanceof Ab))
            return !1;
        return Cb(a, b)
    }
    var Ab = class {
        constructor(a, b) {
            if (b !== xb)
                throw Error("f");
            this.wb = a;
            if (null != a && 0 === a.length)
                throw Error("g");
        }
        isEmpty() {
            return null == this.wb
        }
    }
    ;
    function Eb(a) {
        return 0 == a.length ? zb() : new Ab(a,xb)
    }
    ;function Fb(a) {
        if ("string" === typeof a)
            return {
                buffer: sb(a),
                bc: !1
            };
        if (Array.isArray(a))
            return {
                buffer: new Uint8Array(a),
                bc: !1
            };
        if (a.constructor === Uint8Array)
            return {
                buffer: a,
                bc: !1
            };
        if (a.constructor === ArrayBuffer)
            return {
                buffer: new Uint8Array(a),
                bc: !1
            };
        if (a.constructor === Ab)
            return {
                buffer: Bb(a) || vb(),
                bc: !0
            };
        if (a instanceof Uint8Array)
            return {
                buffer: new Uint8Array(a.buffer,a.byteOffset,a.byteLength),
                bc: !1
            };
        throw Error("p");
    }
    ;const Gb = "function" === typeof Uint8Array.prototype.slice;
    let Hb = 0, Ib = 0, Jb;
    function Kb(a) {
        const b = 0 > a;
        a = Math.abs(a);
        let c = a >>> 0;
        a = Math.floor((a - c) / 4294967296);
        if (b) {
            const [d,e] = Lb(c, a);
            a = e;
            c = d
        }
        Hb = c >>> 0;
        Ib = a >>> 0
    }
    const Mb = "function" === typeof BigInt;
    function Lb(a, b) {
        b = ~b;
        a ? a = ~a + 1 : b += 1;
        return [a, b]
    }
    ;function Nb(a, b, {Xd: c=!1}={}) {
        a.Xd = c;
        b && (b = Fb(b),
        a.i = b.buffer,
        a.v = b.bc,
        a.u = 0,
        a.j = a.i.length,
        a.g = a.u)
    }
    function Ob(a, b) {
        a.g = b;
        if (b > a.j)
            throw Error("n`" + b + "`" + a.j);
    }
    function Pb(a) {
        let b = 0
          , c = a.g;
        const d = c + 10
          , e = a.i;
        for (; c < d; ) {
            const f = e[c++];
            b |= f;
            if (0 === (f & 128))
                return Ob(a, c),
                !!(b & 127)
        }
        throw Error("m");
    }
    function Qb(a) {
        var b = a.i;
        const c = a.g;
        var d = b[c];
        var e = b[c + 1];
        const f = b[c + 2];
        b = b[c + 3];
        a.advance(4);
        e = (d << 0 | e << 8 | f << 16 | b << 24) >>> 0;
        a = 2 * (e >> 31) + 1;
        d = e >>> 23 & 255;
        e &= 8388607;
        return 255 == d ? e ? NaN : Infinity * a : 0 == d ? a * Math.pow(2, -149) * e : a * Math.pow(2, d - 150) * (e + Math.pow(2, 23))
    }
    function Rb(a, b) {
        if (0 > b)
            throw Error("o`" + b);
        const c = a.g
          , d = c + b;
        if (d > a.j)
            throw Error("n`" + (a.j - c) + "`" + b);
        a.g = d;
        return c
    }
    function Sb(a, b) {
        if (0 == b)
            return zb();
        var c = Rb(a, b);
        a.Xd && a.v ? c = a.i.subarray(c, c + b) : (a = a.i,
        b = c + b,
        c = c === b ? vb() : Gb ? a.slice(c, b) : new Uint8Array(a.subarray(c, b)));
        return Eb(c)
    }
    var Tb = class {
        constructor(a, b) {
            this.i = null;
            this.v = !1;
            this.g = this.j = this.u = 0;
            Nb(this, a, b)
        }
        clear() {
            this.i = null;
            this.v = !1;
            this.g = this.j = this.u = 0;
            this.Xd = !1
        }
        reset() {
            this.g = this.u
        }
        advance(a) {
            Ob(this, this.g + a)
        }
        o() {
            const a = this.i;
            let b = this.g
              , c = a[b++]
              , d = c & 127;
            if (c & 128 && (c = a[b++],
            d |= (c & 127) << 7,
            c & 128 && (c = a[b++],
            d |= (c & 127) << 14,
            c & 128 && (c = a[b++],
            d |= (c & 127) << 21,
            c & 128 && (c = a[b++],
            d |= c << 28,
            c & 128 && a[b++] & 128 && a[b++] & 128 && a[b++] & 128 && a[b++] & 128 && a[b++] & 128)))))
                throw Error("m");
            Ob(this, b);
            return d
        }
    }
      , Ub = [];
    function Vb(a, {Qe: b=!1}={}) {
        a.Qe = b
    }
    function Wb(a) {
        var b = a.g;
        if (b.g == b.j)
            return !1;
        a.j = a.g.g;
        var c = a.g.o() >>> 0;
        b = c >>> 3;
        c &= 7;
        if (!(0 <= c && 5 >= c))
            throw Error("i`" + c + "`" + a.j);
        if (1 > b)
            throw Error("j`" + b + "`" + a.j);
        a.o = b;
        a.i = c;
        return !0
    }
    function Xb(a) {
        switch (a.i) {
        case 0:
            0 != a.i ? Xb(a) : Pb(a.g);
            break;
        case 1:
            a.g.advance(8);
            break;
        case 2:
            if (2 != a.i)
                Xb(a);
            else {
                var b = a.g.o() >>> 0;
                a.g.advance(b)
            }
            break;
        case 5:
            a.g.advance(4);
            break;
        case 3:
            b = a.o;
            do {
                if (!Wb(a))
                    throw Error("k");
                if (4 == a.i) {
                    if (a.o != b)
                        throw Error("l");
                    break
                }
                Xb(a)
            } while (1);
            break;
        default:
            throw Error("i`" + a.i + "`" + a.j);
        }
    }
    function Yb(a, b, c) {
        const d = a.g.j
          , e = a.g.o() >>> 0
          , f = a.g.g + e;
        let g = f - d;
        0 >= g && (a.g.j = f,
        c(b, a, void 0, void 0, void 0),
        g = f - a.g.g);
        if (g)
            throw Error("h`" + e + "`" + (e - g));
        a.g.g = f;
        a.g.j = d
    }
    function Zb(a) {
        var b = a.g.o() >>> 0;
        a = a.g;
        var c = Rb(a, b);
        a = a.i;
        if (Aa) {
            var d = a, e;
            (e = za) || (e = za = new TextDecoder("utf-8",{
                fatal: !0
            }));
            a = c + b;
            d = 0 === c && a === d.length ? d : d.subarray(c, a);
            try {
                var f = e.decode(d)
            } catch (h) {
                if (void 0 === ya) {
                    try {
                        e.decode(new Uint8Array([128]))
                    } catch (k) {}
                    try {
                        e.decode(new Uint8Array([97])),
                        ya = !0
                    } catch (k) {
                        ya = !1
                    }
                }
                !ya && (za = void 0);
                throw h;
            }
        } else {
            f = c;
            b = f + b;
            c = [];
            let h = null;
            let k;
            for (; f < b; ) {
                var g = a[f++];
                128 > g ? c.push(g) : 224 > g ? f >= b ? wa() : (k = a[f++],
                194 > g || 128 !== (k & 192) ? (f--,
                wa()) : c.push((g & 31) << 6 | k & 63)) : 240 > g ? f >= b - 1 ? wa() : (k = a[f++],
                128 !== (k & 192) || 224 === g && 160 > k || 237 === g && 160 <= k || 128 !== ((d = a[f++]) & 192) ? (f--,
                wa()) : c.push((g & 15) << 12 | (k & 63) << 6 | d & 63)) : 244 >= g ? f >= b - 2 ? wa() : (k = a[f++],
                128 !== (k & 192) || 0 !== (g << 28) + (k - 144) >> 30 || 128 !== ((d = a[f++]) & 192) || 128 !== ((e = a[f++]) & 192) ? (f--,
                wa()) : (g = (g & 7) << 18 | (k & 63) << 12 | (d & 63) << 6 | e & 63,
                g -= 65536,
                c.push((g >> 10 & 1023) + 55296, (g & 1023) + 56320))) : wa();
                8192 <= c.length && (h = xa(h, c),
                c.length = 0)
            }
            f = xa(h, c)
        }
        return f
    }
    var $b = class {
        constructor(a, b) {
            if (Ub.length) {
                const c = Ub.pop();
                Nb(c, a, b);
                a = c
            } else
                a = new Tb(a,b);
            this.g = a;
            this.j = this.g.g;
            this.i = this.o = -1;
            Vb(this, b)
        }
        reset() {
            this.g.reset();
            this.j = this.g.g;
            this.i = this.o = -1
        }
        advance(a) {
            this.g.advance(a)
        }
    }
      , ac = [];
    function bc(a) {
        if (!a)
            return cc || (cc = new dc(0,0));
        if (!/^-?\d+$/.test(a))
            return null;
        if (16 > a.length)
            Kb(Number(a));
        else if (Mb)
            a = BigInt(a),
            Hb = Number(a & BigInt(4294967295)) >>> 0,
            Ib = Number(a >> BigInt(32) & BigInt(4294967295));
        else {
            const b = +("-" === a[0]);
            Ib = Hb = 0;
            const c = a.length;
            for (let d = b, e = (c - b) % 6 + b; e <= c; d = e,
            e += 6) {
                const f = Number(a.slice(d, e));
                Ib *= 1E6;
                Hb = 1E6 * Hb + f;
                4294967296 <= Hb && (Ib += Hb / 4294967296 | 0,
                Hb %= 4294967296)
            }
            if (b) {
                const [d,e] = Lb(Hb, Ib);
                Hb = d;
                Ib = e
            }
        }
        return new dc(Hb,Ib)
    }
    var dc = class {
        constructor(a, b) {
            this.i = a >>> 0;
            this.g = b >>> 0
        }
    }
    ;
    let cc;
    function ec(a, b, c) {
        for (; 0 < c || 127 < b; )
            a.g.push(b & 127 | 128),
            b = (b >>> 7 | c << 25) >>> 0,
            c >>>= 7;
        a.g.push(b)
    }
    function fc(a, b) {
        for (; 127 < b; )
            a.g.push(b & 127 | 128),
            b >>>= 7;
        a.g.push(b)
    }
    function gc(a, b) {
        if (0 <= b)
            fc(a, b);
        else {
            for (let c = 0; 9 > c; c++)
                a.g.push(b & 127 | 128),
                b >>= 7;
            a.g.push(1)
        }
    }
    var ic = class {
        constructor() {
            this.g = []
        }
        length() {
            return this.g.length
        }
        end() {
            const a = this.g;
            this.g = [];
            return a
        }
    }
    ;
    function jc(a, b) {
        0 !== b.length && (a.j.push(b),
        a.i += b.length)
    }
    function kc(a, b, c) {
        fc(a.g, 8 * b + 2);
        fc(a.g, c.length);
        jc(a, a.g.end());
        jc(a, c)
    }
    var lc = class {
        constructor() {
            this.j = [];
            this.i = 0;
            this.g = new ic
        }
    }
    ;
    class mc {
        constructor(a, b) {
            this.g = a;
            this.i = b
        }
    }
    ;function nc(a) {
        return Array.prototype.slice.call(a)
    }
    ;const oc = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;
    var pc = oc ? (a, b) => {
        a[oc] |= b
    }
    : (a, b) => {
        void 0 !== a.g ? a.g |= b : Object.defineProperties(a, {
            g: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }
    ;
    function qc(a) {
        const b = rc(a);
        1 !== (b & 1) && (Object.isFrozen(a) && (a = nc(a)),
        sc(a, b | 1))
    }
    var tc = oc ? (a, b) => {
        a[oc] &= ~b
    }
    : (a, b) => {
        void 0 !== a.g && (a.g &= ~b)
    }
      , rc = oc ? a => a[oc] | 0 : a => a.g | 0
      , E = oc ? a => a[oc] : a => a.g
      , sc = oc ? (a, b) => {
        a[oc] = b
    }
    : (a, b) => {
        void 0 !== a.g ? a.g = b : Object.defineProperties(a, {
            g: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }
    ;
    function uc(a) {
        pc(a, 1);
        return a
    }
    function vc(a, b) {
        sc(b, (a | 0) & -255)
    }
    function wc(a, b) {
        sc(b, (a | 34) & -221)
    }
    function xc(a) {
        a = a >> 10 & 1023;
        return 0 === a ? 536870912 : a
    }
    ;var yc = {};
    function zc(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    let Ac;
    function Bc(a, b, c) {
        if (null != a)
            if ("string" === typeof a)
                a = a ? new Ab(a,xb) : zb();
            else if (a.constructor !== Ab)
                if (tb(a))
                    a = c ? Eb(a) : a.length ? new Ab(new Uint8Array(a),xb) : zb();
                else {
                    if (!b)
                        throw Error();
                    a = void 0
                }
        return a
    }
    function Cc(a, b, c) {
        if (!Array.isArray(a) || a.length)
            return !1;
        const d = rc(a);
        if (d & 1)
            return !0;
        if (!b || !b.includes(c))
            return !1;
        sc(a, d | 1);
        return !0
    }
    var Dc;
    const Ec = [];
    sc(Ec, 39);
    Dc = Object.freeze(Ec);
    function Fc(a) {
        if (a & 2)
            throw Error();
    }
    let Gc;
    function Hc(a, b) {
        (b = Gc ? b[Gc] : void 0) && (a[Gc] = nc(b))
    }
    ;function Ic(a) {
        if (null == a)
            return a;
        if ("number" === typeof a || "NaN" === a || "Infinity" === a || "-Infinity" === a)
            return Number(a)
    }
    function Jc(a) {
        if (null == a)
            return a;
        if ("boolean" === typeof a || "number" === typeof a)
            return !!a
    }
    function Kc(a) {
        return "number" === typeof a && Number.isFinite(a) || !!a && "string" === typeof a && isFinite(a)
    }
    function Lc(a) {
        if (null == a)
            return a;
        if ("string" === typeof a) {
            if (!a)
                return;
            a = +a
        }
        if ("number" === typeof a)
            return a
    }
    function Mc(a) {
        if (null != a) {
            if (!Kc(a))
                throw Error("s`" + a + "`" + ka(a));
            a = "string" === typeof a ? a : a
        }
        return a
    }
    function Nc(a) {
        if (null == a)
            return a;
        if (Kc(a))
            return "number" === typeof a ? a : a
    }
    function Oc(a) {
        if (null != a && "string" !== typeof a)
            throw Error();
        return a
    }
    function Pc(a) {
        return null == a || "string" === typeof a ? a : void 0
    }
    function Qc(a, b, c) {
        var d = !1;
        if (null != a && "object" === typeof a && !(d = Array.isArray(a)) && a.rc === yc)
            return a;
        if (d) {
            var e = d = rc(a);
            0 === e && (e |= c & 32);
            e |= c & 2;
            e !== d && sc(a, e);
            return new b(a)
        }
    }
    ;let Rc;
    function Sc(a, b) {
        Rc = b;
        a = new a(b);
        Rc = void 0;
        return a
    }
    let Tc;
    function Uc(a) {
        switch (typeof a) {
        case "number":
            return 0 < a ? void 0 : 0 === a ? Tc || (Tc = [0, void 0]) : [-a, void 0];
        case "string":
            return [0, a];
        case "object":
            return a
        }
    }
    function Vc(a, b, c) {
        null == a && (a = Rc);
        Rc = void 0;
        if (null == a) {
            var d = 96;
            c ? (a = [c],
            d |= 512) : a = [];
            b && (d = d & -1047553 | (b & 1023) << 10)
        } else {
            if (!Array.isArray(a))
                throw Error();
            d = rc(a);
            if (d & 64)
                return a;
            d |= 64;
            if (c && (d |= 512,
            c !== a[0]))
                throw Error();
            a: {
                c = a;
                var e = c.length;
                if (e) {
                    const g = e - 1;
                    var f = c[g];
                    if (zc(f)) {
                        d |= 256;
                        b = +!!(d & 512) - 1;
                        e = g - b;
                        1024 <= e && (Wc(c, b, f),
                        e = 1023);
                        d = d & -1047553 | (e & 1023) << 10;
                        break a
                    }
                }
                b && (f = +!!(d & 512) - 1,
                b = Math.max(b, e - f),
                1024 < b && (Wc(c, f, {}),
                d |= 256,
                b = 1023),
                d = d & -1047553 | (b & 1023) << 10)
            }
        }
        sc(a, d);
        return a
    }
    function Wc(a, b, c) {
        const d = 1023 + b
          , e = a.length;
        for (let f = d; f < e; f++) {
            const g = a[f];
            null != g && g !== c && (c[f - b] = g)
        }
        a.length = d + 1;
        a[d] = c
    }
    ;function Xc(a, b) {
        if ("string" === typeof b)
            try {
                b = sb(b)
            } catch (c) {
                return !1
            }
        return tb(b) && wb(a, b)
    }
    function Yc(a, b) {
        let c;
        if (a.rc === yc)
            c = a.constructor.kc,
            a = a.La;
        else if (!Array.isArray(a))
            return !1;
        if (b.rc === yc)
            c = c || b.constructor.kc,
            b = b.La;
        else if (!Array.isArray(b))
            return !1;
        return Zc(a, b, c)
    }
    function Zc(a, b, c) {
        if (a === b || null == a && null == b)
            return !0;
        if (null == a || null == b)
            return !1;
        if (a instanceof Ab)
            return Db(a, b);
        if (b instanceof Ab)
            return Db(b, a);
        if (tb(a))
            return Xc(a, b);
        if (tb(b))
            return Xc(b, a);
        var d = typeof a
          , e = typeof b;
        if ("object" !== d || "object" !== e)
            return Number.isNaN(a) || Number.isNaN(b) ? String(a) === String(b) : "string" === d && "number" === e || "number" === d && "string" === e ? +a === +b : "boolean" === d && "number" === e || "number" === d && "boolean" === e ? !a === !b : !1;
        if (a.rc === yc || b.rc === yc)
            return Yc(a, b);
        if (a.constructor != b.constructor)
            return !1;
        if (a.constructor === Array) {
            var f = a.length
              , g = b.length
              , h = Math.max(f, g);
            d = +!!((rc(a) | rc(b)) & 512) - 1;
            e = f && a[f - 1];
            let t = g && b[g - 1];
            zc(e) || (e = null);
            zc(t) || (t = null);
            f = f - d - +!!e;
            g = g - d - +!!t;
            for (var k = 0; k < h; k++)
                if (!$c(k - d, a, e, f, b, t, g, d, c))
                    return !1;
            if (e)
                for (var l in e) {
                    h = a;
                    k = e;
                    var m = b
                      , n = t
                      , q = c;
                    const w = +l;
                    if (!(!Number.isFinite(w) || w < f || w < g || $c(w, h, k, f, m, n, g, d, q)))
                        return !1
                }
            if (t)
                for (let w in t)
                    if ((l = e && w in e) || (l = a,
                    h = e,
                    k = b,
                    m = t,
                    n = c,
                    q = +w,
                    l = !Number.isFinite(q) || q < f || q < g ? !0 : $c(q, l, h, f, k, m, g, d, n)),
                    !l)
                        return !1;
            return !0
        }
        if (a.constructor === Object)
            return Zc([a], [b]);
        throw Error();
    }
    function $c(a, b, c, d, e, f, g, h, k) {
        b = ad(a, b, c, d, h);
        e = ad(a, e, f, g, h);
        return null == e && Cc(b, k, a) || null == b && Cc(e, k, a) ? !0 : Zc(b, e)
    }
    function ad(a, b, c, d, e) {
        let f;
        return null != (f = a < d ? b[a + e] : void 0) ? f : null == c ? void 0 : c[a]
    }
    ;function bd(a, b) {
        return cd(b)
    }
    function cd(a) {
        switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "boolean":
            return a ? 1 : 0;
        case "object":
            if (a && !Array.isArray(a)) {
                if (tb(a))
                    return ob(a);
                if (a instanceof Ab) {
                    const b = a.wb;
                    return null == b ? "" : "string" === typeof b ? b : a.wb = ob(b)
                }
            }
        }
        return a
    }
    ;function dd(a, b, c) {
        const d = nc(a);
        var e = d.length;
        const f = b & 256 ? d[e - 1] : void 0;
        e += f ? -1 : 0;
        for (b = b & 512 ? 1 : 0; b < e; b++)
            d[b] = c(d[b]);
        if (f) {
            b = d[b] = {};
            for (const g in f)
                b[g] = c(f[g])
        }
        Hc(d, a);
        return d
    }
    function ed(a, b, c, d, e, f) {
        if (null != a) {
            if (Array.isArray(a))
                a = e && 0 == a.length && rc(a) & 1 ? void 0 : f && rc(a) & 2 ? a : gd(a, b, c, void 0 !== d, e, f);
            else if (zc(a)) {
                const g = {};
                for (let h in a)
                    g[h] = ed(a[h], b, c, d, e, f);
                a = g
            } else
                a = b(a, d);
            return a
        }
    }
    function gd(a, b, c, d, e, f) {
        const g = d || c ? rc(a) : 0;
        d = d ? !!(g & 32) : void 0;
        const h = nc(a);
        for (let k = 0; k < h.length; k++)
            h[k] = ed(h[k], b, c, d, e, f);
        c && (Hc(h, a),
        c(g, h));
        return h
    }
    function hd(a) {
        return a.rc === yc ? a.toJSON() : cd(a)
    }
    ;function id(a, b, c=wc) {
        if (null != a) {
            if (mb && a instanceof Uint8Array)
                return b ? a : new Uint8Array(a);
            if (Array.isArray(a)) {
                const d = rc(a);
                return d & 2 ? a : !b || d & 68 || !(d & 32 || 0 === d) ? gd(a, id, d & 4 ? wc : c, !0, !1, !0) : (sc(a, d | 34),
                a)
            }
            a.rc === yc && (b = a.La,
            c = E(b),
            a = c & 2 ? a : Sc(a.constructor, jd(b, c, !0)));
            return a
        }
    }
    function jd(a, b, c) {
        const d = c || b & 2 ? wc : vc
          , e = !!(b & 32);
        a = dd(a, b, f => id(f, e, d));
        pc(a, 32 | (c ? 2 : 0));
        return a
    }
    function kd(a) {
        const b = a.La
          , c = E(b);
        return c & 2 ? Sc(a.constructor, jd(b, c, !1)) : a
    }
    ;function ld(a, b) {
        a = a.La;
        return md(a, E(a), b)
    }
    function md(a, b, c, d) {
        if (-1 === c)
            return null;
        if (c >= xc(b)) {
            if (b & 256)
                return a[a.length - 1][c]
        } else {
            var e = a.length;
            if (d && b & 256 && (d = a[e - 1][c],
            null != d))
                return d;
            b = c + (+!!(b & 512) - 1);
            if (b < e)
                return a[b]
        }
    }
    function F(a, b, c, d) {
        const e = a.La
          , f = E(e);
        Fc(f);
        nd(e, f, b, c, d);
        return a
    }
    function nd(a, b, c, d, e) {
        var f = xc(b);
        if (c >= f || e) {
            e = b;
            if (b & 256)
                f = a[a.length - 1];
            else {
                if (null == d)
                    return;
                f = a[f + (+!!(b & 512) - 1)] = {};
                e |= 256
            }
            f[c] = d;
            e !== b && sc(a, e)
        } else
            a[c + (+!!(b & 512) - 1)] = d,
            b & 256 && (a = a[a.length - 1],
            c in a && delete a[c])
    }
    function od(a, b, c, d, e) {
        var f = b & 2;
        let g = md(a, b, c, e);
        Array.isArray(g) || (g = Dc);
        const h = rc(g);
        h & 1 || uc(g);
        if (f)
            h & 2 || pc(g, 34),
            d & 1 || Object.freeze(g);
        else {
            f = !(d & 2);
            const k = h & 2;
            d & 1 || !k ? f && h & 32 && !k && tc(g, 32) : (g = uc(nc(g)),
            nd(a, b, c, g, e))
        }
        return g
    }
    function pd(a, b) {
        return F(a, b, void 0, !1)
    }
    function qd(a, b, c, d) {
        const e = E(a);
        Fc(e);
        (c = rd(a, e, c)) && c !== b && nd(a, e, c);
        nd(a, e, b, d)
    }
    function sd(a, b, c) {
        a = a.La;
        return rd(a, E(a), b) === c ? c : -1
    }
    function td(a, b) {
        a = a.La;
        return rd(a, E(a), b)
    }
    function rd(a, b, c) {
        let d = 0;
        for (let e = 0; e < c.length; e++) {
            const f = c[e];
            null != md(a, b, f) && (0 !== d && nd(a, b, d),
            d = f)
        }
        return d
    }
    function ud(a, b, c) {
        const d = E(a);
        Fc(d);
        const e = md(a, d, c);
        let f;
        if (null != e && e.rc === yc)
            return b = kd(e),
            b !== e && nd(a, d, c, b),
            b.La;
        if (Array.isArray(e)) {
            const g = rc(e);
            g & 2 ? f = jd(e, g, !1) : f = e;
            f = Vc(f, b[0], b[1])
        } else
            f = Vc(void 0, b[0], b[1]);
        f !== e && nd(a, d, c, f);
        return f
    }
    function vd(a, b, c) {
        a = a.La;
        const d = E(a)
          , e = md(a, d, c, !1);
        b = Qc(e, b, d);
        b !== e && null != b && nd(a, d, c, b, !1);
        return b
    }
    function G(a, b, c) {
        b = vd(a, b, c);
        if (null == b)
            return b;
        a = a.La;
        const d = E(a);
        if (!(d & 2)) {
            const e = kd(b);
            e !== b && (b = e,
            nd(a, d, c, b, !1))
        }
        return b
    }
    function wd(a, b, c, d, e) {
        var f = !!(b & 2)
          , g = od(a, b, d, 1);
        if (g === Dc || !(rc(g) & 4)) {
            var h = g;
            g = !!(b & 2);
            var k = !!(rc(h) & 2);
            f = h;
            !g && k && (h = nc(h));
            var l = b | (k ? 2 : 0);
            k = k || void 0;
            let m = 0
              , n = 0;
            for (; m < h.length; m++) {
                const q = Qc(h[m], c, l);
                void 0 !== q && (k = k || E(q.La) & 2,
                h[n++] = q)
            }
            n < m && (h.length = n);
            c = h;
            h = rc(c);
            l = h | 5;
            k = k ? l & -9 : l | 8;
            h != k && (Object.isFrozen(c) && (c = nc(c)),
            sc(c, k));
            h = c;
            f !== h && nd(a, b, d, h);
            (g && 2 !== e || 1 === e) && Object.freeze(h);
            return h
        }
        if (3 === e)
            return g;
        f ? 2 === e && (e = rc(g),
        g = nc(g),
        sc(g, e),
        nd(a, b, d, g)) : (f = Object.isFrozen(g),
        1 === e ? f || Object.freeze(g) : (e = rc(g),
        c = e & -35,
        f && (g = nc(g),
        e = 0,
        nd(a, b, d, g)),
        e !== c && sc(g, c)));
        return g
    }
    function xd(a, b, c) {
        var d = a.La;
        const e = E(d);
        a = !!(e & 2);
        b = wd(d, e, b, c, a ? 1 : 2);
        if (!(a || rc(b) & 8)) {
            for (c = 0; c < b.length; c++)
                a = b[c],
                d = kd(a),
                a !== d && (b[c] = d);
            pc(b, 8)
        }
        return b
    }
    function yd(a, b, c) {
        null == c && (c = void 0);
        F(a, b, c)
    }
    function zd(a, b, c) {
        if (null != c && "number" !== typeof c)
            throw Error("q`" + typeof c + "`" + c);
        F(a, b, c)
    }
    function Ad(a, b) {
        {
            a = a.La;
            const c = E(a)
              , d = c & 2;
            let e = od(a, c, b, 1)
              , f = rc(e);
            if (!(f & 4)) {
                Object.isFrozen(e) && (f = 0,
                e = nc(e),
                nd(a, c, b, e));
                let g = 0
                  , h = 0;
                for (; g < e.length; g++) {
                    const k = Lc(e[g]);
                    null != k && (e[h++] = k)
                }
                h < g && (e.length = h);
                f |= 5;
                d && (f |= 34);
                sc(e, f);
                f & 2 && Object.freeze(e)
            }
            !d && (f & 2 || Object.isFrozen(e)) && (e = nc(e),
            pc(e, 5),
            nd(a, c, b, e));
            b = e
        }
        return b
    }
    function Bd(a, b, c) {
        if (null != c) {
            if ("boolean" !== typeof c)
                throw Error("r`" + ka(c) + "`" + c);
            c = !!c
        }
        F(a, b, c)
    }
    function Cd(a, b, c) {
        if (null != c && "number" !== typeof c)
            throw Error();
        F(a, b, c)
    }
    function Dd(a, b) {
        return null != a ? a : b
    }
    function Ed(a, b) {
        return Dd(Jc(ld(a, b)), !1)
    }
    function Fd(a, b) {
        return Dd(Lc(ld(a, b)), 0)
    }
    function Gd(a, b) {
        a = a.La;
        const c = E(a)
          , d = md(a, c, b)
          , e = Ic(d);
        null != e && e !== d && nd(a, c, b, e);
        return Dd(e, 0)
    }
    function Hd(a, b) {
        return Dd(Pc(ld(a, b)), "")
    }
    function H(a, b, c=0) {
        return Dd(ld(a, b), c)
    }
    ;var K = class {
        constructor(a) {
            this.La = Vc(a)
        }
        toJSON() {
            if (Ac)
                var a = Id(this, this.La, !1);
            else
                a = gd(this.La, hd, void 0, void 0, !1, !1),
                a = Id(this, a, !0);
            return a
        }
        Hd() {
            Ac = !0;
            try {
                return JSON.stringify(this.toJSON(), bd)
            } finally {
                Ac = !1
            }
        }
        clone() {
            const a = this.La;
            return Sc(this.constructor, jd(a, E(a), !1))
        }
        bc() {
            return !!(rc(this.La) & 2)
        }
    }
    ;
    K.prototype.rc = yc;
    K.prototype.toString = function() {
        return Id(this, this.La, !1).toString()
    }
    ;
    function Id(a, b, c) {
        var d = a.constructor.kc
          , e = xc(E(c ? a.La : b))
          , f = !1;
        if (d) {
            if (!c) {
                b = nc(b);
                var g;
                if (b.length && zc(g = b[b.length - 1]))
                    for (f = 0; f < d.length; f++)
                        if (d[f] >= e) {
                            Object.assign(b[b.length - 1] = {}, g);
                            break
                        }
                f = !0
            }
            e = b;
            c = !c;
            g = E(a.La);
            a = xc(g);
            g = +!!(g & 512) - 1;
            var h;
            for (let p = 0; p < d.length; p++) {
                var k = d[p];
                if (k < a) {
                    k += g;
                    var l = e[k];
                    null == l ? e[k] = c ? Dc : uc([]) : c && l !== Dc && qc(l)
                } else {
                    if (!h) {
                        var m = void 0;
                        e.length && zc(m = e[e.length - 1]) ? h = m : e.push(h = {})
                    }
                    l = h[k];
                    null == h[k] ? h[k] = c ? Dc : uc([]) : c && l !== Dc && qc(l)
                }
            }
        }
        d = b.length;
        if (!d)
            return b;
        let n, q;
        if (zc(h = b[d - 1])) {
            a: {
                var t = h;
                m = {};
                e = !1;
                for (let p in t)
                    c = t[p],
                    Array.isArray(c) && c != c && (e = !0),
                    null != c ? m[p] = c : e = !0;
                if (e) {
                    for (let p in m) {
                        t = m;
                        break a
                    }
                    t = null
                }
            }
            t != h && (n = !0);
            d--
        }
        for (; 0 < d; d--) {
            h = b[d - 1];
            if (null != h)
                break;
            q = !0
        }
        if (!n && !q)
            return b;
        var w;
        f ? w = b : w = Array.prototype.slice.call(b, 0, d);
        b = w;
        f && (b.length = d);
        t && b.push(t);
        return b
    }
    ;function Jd(a, b) {
        if (Array.isArray(b)) {
            var c = rc(b);
            if (c & 4)
                return b;
            for (var d = 0, e = 0; d < b.length; d++) {
                const f = a(b[d]);
                null != f && (b[e++] = f)
            }
            e < d && (b.length = e);
            sc(b, c | 5);
            c & 2 && Object.freeze(b);
            return b
        }
    }
    const Kd = Symbol();
    function Ld(a) {
        let b = a[Kd];
        if (!b) {
            const c = Md(a)
              , d = c.j;
            b = d ? (e, f) => d(e, f, c) : (e, f) => {
                for (; Wb(f) && 4 != f.i; ) {
                    var g = f.o
                      , h = c[g];
                    if (!h) {
                        var k = c.i;
                        k && (k = k[g]) && (h = c[g] = Nd(k))
                    }
                    h && h(f, e, g) || (h = f,
                    g = h.j,
                    Xb(h),
                    h.Qe ? h = void 0 : (k = h.g.g - g,
                    h.g.g = g,
                    h = Sb(h.g, k)),
                    g = e,
                    h && (Gc || (Gc = Symbol()),
                    (k = g[Gc]) ? k.push(h) : g[Gc] = [h]))
                }
            }
            ;
            a[Kd] = b
        }
        return b
    }
    function Od(a) {
        if (a = a.Le)
            return Ld(a)
    }
    function Nd(a) {
        const b = Od(a)
          , c = a.Vf.g;
        if (b) {
            const d = Md(a.Le).g;
            return (e, f, g) => c(e, f, g, d, b)
        }
        return (d, e, f) => c(d, e, f)
    }
    function Pd(a, b, c, d) {
        b.g = Uc(a[0]);
        let e = 1;
        if (a.length > e && !(a[e]instanceof mc)) {
            var f = a[e++];
            if (Array.isArray(f))
                return b.j = f[0],
                b.i = f[1],
                b;
            b.i = f
        }
        for (f = 0; e < a.length; ) {
            const m = a[e++];
            var g = a[e];
            "number" === typeof g ? (e++,
            f += g) : f++;
            for (g = e; g < a.length && !(a[g]instanceof mc); )
                g++;
            if (g -= e) {
                var h = a
                  , k = e
                  , l = h[k];
                "function" == typeof l && (l = l(),
                h[k] = l);
                if ((h = Array.isArray(l)) && !(h = Qd in l || Rd in l) && (h = 0 < l.length)) {
                    h = l;
                    k = h[0];
                    const n = Uc(k);
                    null != n && n !== k && (h[0] = n);
                    h = null != n
                }
                (l = h ? l : void 0) ? (e++,
                b[f] = 1 === g ? d(m, l) : d(m, l, a[e++])) : b[f] = c(m, a[e++])
            } else
                b[f] = c(m)
        }
        return b
    }
    const Sd = Symbol();
    function Td(a) {
        let b = a[Sd];
        if (!b) {
            const c = Ud(a);
            b = (d, e) => Vd(d, e, c);
            a[Sd] = b
        }
        return b
    }
    const Rd = Symbol();
    function Wd(a) {
        return a.i
    }
    function Xd(a, b) {
        let c, d;
        const e = a.i;
        return (f, g, h) => e(f, g, h, d || (d = Ud(b).g), c || (c = Td(b)))
    }
    function Ud(a) {
        let b = a[Rd];
        if (b)
            return b;
        b = Pd(a, a[Rd] = {}, Wd, Xd);
        Qd in a && Rd in a && (a.length = 0);
        return b
    }
    const Qd = Symbol();
    function Yd(a, b) {
        const c = a.g;
        return b ? (d, e, f) => c(d, e, f, b) : c
    }
    function Zd(a, b, c) {
        const d = a.g;
        let e, f;
        return (g, h, k) => d(g, h, k, f || (f = Md(b).g), e || (e = Ld(b)), c)
    }
    function Md(a) {
        let b = a[Qd];
        if (b)
            return b;
        b = Pd(a, a[Qd] = {}, Yd, Zd);
        Qd in a && Rd in a && (a.length = 0);
        return b
    }
    function $d(a, b) {
        var c = a[b];
        if (c)
            return c;
        if (c = a.i)
            if (c = c[b]) {
                var d = c.Le
                  , e = c.Vf.i;
                if (d) {
                    const f = Td(d)
                      , g = Ud(d).g;
                    c = (h, k, l) => e(h, k, l, g, f)
                } else
                    c = e;
                return a[b] = c
            }
    }
    function Vd(a, b, c) {
        for (var d = E(a), e = +!!(d & 512) - 1, f = a.length, g = d & 512 ? 1 : 0, h = f + (d & 256 ? -1 : 0); g < h; g++) {
            const k = a[g];
            if (null == k)
                continue;
            const l = g - e
              , m = $d(c, l);
            m && m(b, k, l)
        }
        if (d & 256) {
            d = a[f - 1];
            for (let k in d)
                e = +k,
                Number.isNaN(e) || (f = d[k],
                null != f && (h = $d(c, e)) && h(b, f, e))
        }
        if (a = Gc ? a[Gc] : void 0)
            for (jc(b, b.g.end()),
            c = 0; c < a.length; c++)
                jc(b, Bb(a[c]) || vb())
    }
    function ae(a, b) {
        return new mc(a,b)
    }
    function be(a, b, c) {
        nd(a, E(a), b, c)
    }
    function ce(a, b, c) {
        b = Ic(b);
        null != b && (fc(a.g, 8 * c + 5),
        a = a.g,
        c = Jb || (Jb = new DataView(new ArrayBuffer(8))),
        c.setFloat32(0, +b, !0),
        Ib = 0,
        b = Hb = c.getUint32(0, !0),
        a.g.push(b >>> 0 & 255),
        a.g.push(b >>> 8 & 255),
        a.g.push(b >>> 16 & 255),
        a.g.push(b >>> 24 & 255))
    }
    function de(a, b, c) {
        b = Jc(b);
        null != b && (fc(a.g, 8 * c),
        a.g.g.push(b ? 1 : 0))
    }
    function ee(a, b, c) {
        b = Pc(b);
        null != b && kc(a, c, Da(b))
    }
    function fe(a, b, c, d, e) {
        b = b instanceof K ? b.La : Array.isArray(b) ? Vc(b, d[0], d[1]) : void 0;
        if (null != b) {
            fc(a.g, 8 * c + 2);
            c = a.g.end();
            jc(a, c);
            c.push(a.i);
            e(b, a);
            e = c.pop();
            for (e = a.i + a.g.length() - e; 127 < e; )
                c.push(e & 127 | 128),
                e >>>= 7,
                a.i++;
            c.push(e);
            a.i++
        }
    }
    var ge = ae(function(a, b, c) {
        if (5 !== a.i)
            return !1;
        be(b, c, Qb(a.g));
        return !0
    }, ce)
      , he = ae(function(a, b, c, d) {
        if (5 !== a.i)
            return !1;
        qd(b, c, d, Qb(a.g));
        return !0
    }, ce)
      , ie = ae(function(a, b, c) {
        if (0 !== a.i)
            return !1;
        {
            var d = a.g;
            let f = 0
              , g = a = 0;
            const h = d.i;
            let k = d.g;
            do {
                var e = h[k++];
                f |= (e & 127) << g;
                g += 7
            } while (32 > g && e & 128);
            32 < g && (a |= (e & 127) >> 4);
            for (g = 3; 32 > g && e & 128; g += 7)
                e = h[k++],
                a |= (e & 127) << g;
            Ob(d, k);
            if (128 > e) {
                d = f >>> 0;
                e = a >>> 0;
                if (a = e & 2147483648)
                    d = ~d + 1 >>> 0,
                    e = ~e >>> 0,
                    0 == d && (e = e + 1 >>> 0);
                d = 4294967296 * e + (d >>> 0);
                a = a ? -d : d
            } else
                throw Error("m");
        }
        be(b, c, a);
        return !0
    }, function(a, b, c) {
        a: if (null != b) {
            if (Kc(b)) {
                if ("string" === typeof b)
                    break a;
                if ("number" === typeof b)
                    break a
            }
            b = void 0
        }
        null != b && ("string" === typeof b && bc(b),
        null != b && (fc(a.g, 8 * c),
        "number" === typeof b ? (a = a.g,
        Kb(b),
        ec(a, Hb, Ib)) : (c = bc(b),
        ec(a.g, c.i, c.g))))
    })
      , je = ae(function(a, b, c) {
        if (0 !== a.i)
            return !1;
        be(b, c, a.g.o());
        return !0
    }, function(a, b, c) {
        b = Lc(b);
        null != b && null != b && (fc(a.g, 8 * c),
        gc(a.g, b))
    })
      , ke = ae(function(a, b, c) {
        if (0 !== a.i && 2 !== a.i)
            return !1;
        b = od(b, E(b), c, 2, !1);
        if (2 == a.i) {
            c = Tb.prototype.o;
            var d = a.g.o() >>> 0;
            for (d = a.g.g + d; a.g.g < d; )
                b.push(c.call(a.g))
        } else
            b.push(a.g.o());
        return !0
    }, function(a, b, c) {
        b = Jd(Lc, b);
        if (null != b)
            for (let f = 0; f < b.length; f++) {
                var d = a
                  , e = b[f];
                null != e && (fc(d.g, 8 * c),
                gc(d.g, e))
            }
    })
      , le = ae(function(a, b, c) {
        if (0 !== a.i)
            return !1;
        be(b, c, Pb(a.g));
        return !0
    }, de)
      , me = ae(function(a, b, c, d) {
        if (0 !== a.i)
            return !1;
        qd(b, c, d, Pb(a.g));
        return !0
    }, de)
      , ne = ae(function(a, b, c) {
        if (2 !== a.i)
            return !1;
        be(b, c, Zb(a));
        return !0
    }, ee)
      , oe = ae(function(a, b, c) {
        if (2 !== a.i)
            return !1;
        a = Zb(a);
        const d = E(b);
        Fc(d);
        od(b, d, c, 2).push(a);
        return !0
    }, function(a, b, c) {
        b = Jd(Pc, b);
        if (null != b)
            for (let e = 0; e < b.length; e++) {
                var d = b[e];
                null != d && kc(a, c, Da(d))
            }
    })
      , pe = ae(function(a, b, c, d) {
        if (2 !== a.i)
            return !1;
        qd(b, c, d, Zb(a));
        return !0
    }, ee)
      , qe = ae(function(a, b, c, d, e) {
        if (2 !== a.i)
            return !1;
        Yb(a, ud(b, d, c), e);
        return !0
    }, fe)
      , re = ae(function(a, b, c, d, e) {
        if (2 !== a.i)
            return !1;
        d = Vc(void 0, d[0], d[1]);
        const f = E(b);
        Fc(f);
        let g = od(b, f, c, 3);
        if (Object.isFrozen(g) || rc(g) & 4)
            g = nc(g),
            nd(b, f, c, g);
        g.push(d);
        Yb(a, d, e);
        return !0
    }, function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (let f = 0; f < b.length; f++)
                fe(a, b[f], c, d, e)
    })
      , se = ae(function(a, b, c, d, e, f) {
        if (2 !== a.i)
            return !1;
        const g = E(b);
        Fc(g);
        (f = rd(b, g, f)) && c !== f && nd(b, g, f);
        b = ud(b, d, c);
        Yb(a, b, e);
        return !0
    }, fe)
      , te = ae(function(a, b, c) {
        if (0 !== a.i)
            return !1;
        be(b, c, a.g.o());
        return !0
    }, function(a, b, c) {
        b = Lc(b);
        null != b && (b = parseInt(b, 10),
        fc(a.g, 8 * c),
        gc(a.g, b))
    });
    function ue(a, b) {
        return (c, d) => {
            a: {
                if (ac.length) {
                    const f = ac.pop();
                    Vb(f, d);
                    Nb(f.g, c, d);
                    c = f
                } else
                    c = new $b(c,d);
                try {
                    const f = new a;
                    Ld(b)(f.La, c);
                    var e = f;
                    break a
                } finally {
                    c.g.clear(),
                    c.o = -1,
                    c.i = -1,
                    100 > ac.length && ac.push(c)
                }
                e = void 0
            }
            return e
        }
    }
    function ve(a) {
        return function() {
            const b = new lc;
            Vd(this.La, b, Ud(a));
            jc(b, b.g.end());
            const c = new Uint8Array(b.i)
              , d = b.j
              , e = d.length;
            let f = 0;
            for (let g = 0; g < e; g++) {
                const h = d[g];
                c.set(h, f);
                f += h.length
            }
            b.j = [c];
            return c
        }
    }
    ;var we = class extends K {
        getTypeName() {
            return Hd(this, 1).split("/").pop()
        }
    }
      , xe = [0, ae(function(a, b, c) {
        if (2 !== a.i)
            return !1;
        a = Zb(a);
        be(b, c, "" === a ? void 0 : a);
        return !0
    }, ee), ae(function(a, b, c) {
        if (2 !== a.i)
            return !1;
        const d = a.g.o() >>> 0;
        a = Sb(a.g, d);
        be(b, c, a === zb() ? void 0 : a);
        return !0
    }, function(a, b, c) {
        if (null != b) {
            if (b instanceof K) {
                const d = b.Tg;
                d && (b = d(b),
                null != b && kc(a, c, Fb(b).buffer));
                return
            }
            if (Array.isArray(b))
                return
        }
        b = null == b || "string" === typeof b || tb(b) || b instanceof Ab ? b : void 0;
        null != b && kc(a, c, Fb(b).buffer)
    })];
    function ye() {}
    ;function ze(a, b, c) {
        for (const d in a)
            b.call(c, a[d], d, a)
    }
    const Ae = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Be(a, b) {
        let c, d;
        for (let e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (let f = 0; f < Ae.length; f++)
                c = Ae[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    ;var Ce;
    function De() {
        if (void 0 === Ce) {
            var a = null
              , b = A.trustedTypes;
            if (b && b.createPolicy) {
                try {
                    a = b.createPolicy("goog#html", {
                        createHTML: ta,
                        createScript: ta,
                        createScriptURL: ta
                    })
                } catch (c) {
                    A.console && A.console.error(c.message)
                }
                Ce = a
            } else
                Ce = a
        }
        return Ce
    }
    ;function Ee(a, b) {
        this.g = a === Fe && b || "";
        this.i = Ge
    }
    Ee.prototype.Hc = !0;
    Ee.prototype.Gc = function() {
        return this.g
    }
    ;
    function He(a) {
        return a instanceof Ee && a.constructor === Ee && a.i === Ge ? a.g : "type_error:Const"
    }
    function Ie(a) {
        return new Ee(Fe,a)
    }
    var Ge = {}
      , Fe = {};
    var Je = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g + ""
        }
    }
    ;
    Je.prototype.Hc = !0;
    Je.prototype.Gc = function() {
        return this.g.toString()
    }
    ;
    function Ke(a) {
        return a instanceof Je && a.constructor === Je ? a.g : "type_error:TrustedResourceUrl"
    }
    function Le() {
        var a = {}
          , b = He(Ie("//google-doodles.appspot.com/?"));
        if (!Me.test(b))
            throw Error("v`" + b);
        var c = b.replace(Ne, function(d, e) {
            if (!Object.prototype.hasOwnProperty.call(a, e))
                throw Error("w`" + e + "`" + b + "`" + JSON.stringify(a));
            d = a[e];
            return d instanceof Ee ? He(d) : encodeURIComponent(String(d))
        });
        return Oe(c)
    }
    var Ne = /%{(\w+)}/g
      , Me = RegExp("^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)", "i")
      , Pe = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
    function Qe(a) {
        var b = Le();
        b = Pe.exec(Ke(b).toString());
        var c = b[3] || "";
        return Oe(b[1] + Re("?", b[2] || "", a) + Re("#", c))
    }
    var Se = {};
    function Oe(a) {
        const b = De();
        a = b ? b.createScriptURL(a) : a;
        return new Je(a,Se)
    }
    function Re(a, b, c) {
        if (null == c)
            return b;
        if ("string" === typeof c)
            return c ? a + encodeURIComponent(c) : "";
        for (var d in c)
            if (Object.prototype.hasOwnProperty.call(c, d)) {
                var e = c[d];
                e = Array.isArray(e) ? e : [e];
                for (var f = 0; f < e.length; f++) {
                    var g = e[f];
                    null != g && (b || (b = a),
                    b += (b.length > a.length ? "&" : "") + encodeURIComponent(d) + "=" + encodeURIComponent(String(g)))
                }
            }
        return b
    }
    ;var Te = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g.toString()
        }
    }
    ;
    Te.prototype.Hc = !0;
    Te.prototype.Gc = function() {
        return this.g.toString()
    }
    ;
    function Ue(a) {
        return a instanceof Te && a.constructor === Te ? a.g : "type_error:SafeUrl"
    }
    var Ve;
    try {
        new URL("s://g"),
        Ve = !0
    } catch (a) {
        Ve = !1
    }
    var We = Ve
      , Xe = {}
      , Ye = new Te("about:invalid#zClosurez",Xe);
    const Ze = {};
    function $e(a) {
        return a instanceof af && a.constructor === af ? a.g : "type_error:SafeHtml"
    }
    function bf(a) {
        a instanceof af || (a = "object" == typeof a && a.Hc ? a.Gc() : String(a),
        La.test(a) && (-1 != a.indexOf("&") && (a = a.replace(Fa, "&amp;")),
        -1 != a.indexOf("<") && (a = a.replace(Ga, "&lt;")),
        -1 != a.indexOf(">") && (a = a.replace(Ha, "&gt;")),
        -1 != a.indexOf('"') && (a = a.replace(Ia, "&quot;")),
        -1 != a.indexOf("'") && (a = a.replace(Ja, "&#39;")),
        -1 != a.indexOf("\x00") && (a = a.replace(Ka, "&#0;"))),
        a = cf(a));
        return a
    }
    function cf(a) {
        const b = De();
        a = b ? b.createHTML(a) : a;
        return new af(a,Ze)
    }
    function df(a) {
        const b = bf(ef)
          , c = []
          , d = e => {
            Array.isArray(e) ? e.forEach(d) : (e = bf(e),
            c.push($e(e).toString()))
        }
        ;
        a.forEach(d);
        return cf(c.join($e(b).toString()))
    }
    function ff(a) {
        return df(Array.prototype.slice.call(arguments))
    }
    class af {
        constructor(a) {
            this.g = a;
            this.Hc = !0
        }
        Gc() {
            return this.g.toString()
        }
        toString() {
            return this.g.toString()
        }
    }
    var ef = new af(A.trustedTypes && A.trustedTypes.emptyHTML || "",Ze)
      , jf = cf("<br>");
    var kf = function(a) {
        let b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }(function() {
        var a = document.createElement("div")
          , b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = $e(ef);
        return !b.parentElement
    });
    function lf(a, b) {
        if (kf())
            for (; a.lastChild; )
                a.removeChild(a.lastChild);
        a.innerHTML = $e(b)
    }
    function mf(a, b) {
        a: {
            var c = (a.ownerDocument && a.ownerDocument.defaultView || A).document;
            if (c.querySelector && (c = c.querySelector("script[nonce]")) && (c = c.nonce || c.getAttribute("nonce")) && nf.test(c))
                break a;
            c = ""
        }
        c && a.setAttribute("nonce", c);
        a.src = Ke(b)
    }
    function of(a) {
        if (!(a instanceof Te || a instanceof Te)) {
            a = "object" == typeof a && a.Hc ? a.Gc() : String(a);
            b: {
                var b = a;
                if (We) {
                    try {
                        var c = new URL(b)
                    } catch (d) {
                        b = "https:";
                        break b
                    }
                    b = c.protocol
                } else
                    c: {
                        c = document.createElement("a");
                        try {
                            c.href = b
                        } catch (d) {
                            b = void 0;
                            break c
                        }
                        b = c.protocol;
                        b = ":" === b || "" === b ? "https:" : b
                    }
            }
            "javascript:" === b && (a = "about:invalid#zClosurez");
            a = new Te(a,Xe)
        }
        A.open(Ue(a), "")
    }
    var nf = /^[\w+/_-]+[=]{0,2}$/;
    var pf = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    function qf(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    }
    ;function rf(a) {
        this.i = this.O = this.j = "";
        this.H = null;
        this.u = this.v = "";
        this.o = !1;
        var b;
        a instanceof rf ? (this.o = a.o,
        sf(this, a.j),
        this.O = a.O,
        this.i = a.i,
        tf(this, a.H),
        this.v = a.v,
        uf(this, a.g.clone()),
        this.u = a.u) : a && (b = String(a).match(pf)) ? (this.o = !1,
        sf(this, b[1] || "", !0),
        this.O = vf(b[2] || ""),
        this.i = vf(b[3] || "", !0),
        tf(this, b[4]),
        this.v = vf(b[5] || "", !0),
        uf(this, b[6] || "", !0),
        this.u = vf(b[7] || "")) : (this.o = !1,
        this.g = new wf(null,this.o))
    }
    rf.prototype.toString = function() {
        var a = []
          , b = this.j;
        b && a.push(xf(b, yf, !0), ":");
        var c = this.i;
        if (c || "file" == b)
            a.push("//"),
            (b = this.O) && a.push(xf(b, yf, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.H,
            null != c && a.push(":", String(c));
        if (c = this.v)
            this.i && "/" != c.charAt(0) && a.push("/"),
            a.push(xf(c, "/" == c.charAt(0) ? zf : Af, !0));
        (c = this.g.toString()) && a.push("?", c);
        (c = this.u) && a.push("#", xf(c, Bf));
        return a.join("")
    }
    ;
    rf.prototype.clone = function() {
        return new rf(this)
    }
    ;
    function sf(a, b, c) {
        a.j = c ? vf(b, !0) : b;
        a.j && (a.j = a.j.replace(/:$/, ""))
    }
    function tf(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("x`" + b);
            a.H = b
        } else
            a.H = null
    }
    function uf(a, b, c) {
        b instanceof wf ? (a.g = b,
        Cf(a.g, a.o)) : (c || (b = xf(b, Df)),
        a.g = new wf(b,a.o))
    }
    function Ef(a, b, c) {
        a.g.set(b, c);
        return a
    }
    function Ff(a) {
        return a instanceof rf ? a.clone() : new rf(a)
    }
    function vf(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
    function xf(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, Gf),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
    function Gf(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var yf = /[#\/\?@]/g
      , Af = /[#\?:]/g
      , zf = /[#\?]/g
      , Df = /[#\?@]/g
      , Bf = /#/g;
    function wf(a, b) {
        this.i = this.g = null;
        this.j = a || null;
        this.o = !!b
    }
    function Hf(a) {
        a.g || (a.g = new Map,
        a.i = 0,
        a.j && qf(a.j, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    r = wf.prototype;
    r.add = function(a, b) {
        Hf(this);
        this.j = null;
        a = If(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.i += 1;
        return this
    }
    ;
    function Jf(a, b) {
        Hf(a);
        b = If(a, b);
        a.g.has(b) && (a.j = null,
        a.i -= a.g.get(b).length,
        a.g.delete(b))
    }
    r.clear = function() {
        this.g = this.j = null;
        this.i = 0
    }
    ;
    r.isEmpty = function() {
        Hf(this);
        return 0 == this.i
    }
    ;
    function Kf(a, b) {
        Hf(a);
        b = If(a, b);
        return a.g.has(b)
    }
    r.forEach = function(a, b) {
        Hf(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    r.oe = function(a) {
        Hf(this);
        let b = [];
        if ("string" === typeof a)
            Kf(this, a) && (b = b.concat(this.g.get(If(this, a))));
        else {
            a = Array.from(this.g.values());
            for (let c = 0; c < a.length; c++)
                b = b.concat(a[c])
        }
        return b
    }
    ;
    r.set = function(a, b) {
        Hf(this);
        this.j = null;
        a = If(this, a);
        Kf(this, a) && (this.i -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.i += 1;
        return this
    }
    ;
    r.get = function(a, b) {
        if (!a)
            return b;
        a = this.oe(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    r.toString = function() {
        if (this.j)
            return this.j;
        if (!this.g)
            return "";
        const a = []
          , b = Array.from(this.g.keys());
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            const f = encodeURIComponent(String(d))
              , g = this.oe(d);
            for (d = 0; d < g.length; d++) {
                var e = f;
                "" !== g[d] && (e += "=" + encodeURIComponent(String(g[d])));
                a.push(e)
            }
        }
        return this.j = a.join("&")
    }
    ;
    r.clone = function() {
        var a = new wf;
        a.j = this.j;
        this.g && (a.g = new Map(this.g),
        a.i = this.i);
        return a
    }
    ;
    function If(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }
    function Cf(a, b) {
        b && !a.o && (Hf(a),
        a.j = null,
        a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            if (d != e && (Jf(this, d),
            Jf(this, e),
            0 < c.length)) {
                this.j = null;
                d = this.g;
                var f = d.set;
                e = If(this, e);
                var g = c.length;
                if (0 < g) {
                    const h = Array(g);
                    for (let k = 0; k < g; k++)
                        h[k] = c[k];
                    g = h
                } else
                    g = [];
                f.call(d, e, g);
                this.i += c.length
            }
        }, a));
        a.o = b
    }
    ;var Lf = navigator.userAgent
      , Mf = new rf(location.href)
      , Nf = () => "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
      , Of = () => Lf.includes("iPad") || Lf.includes("iPhone") || Lf.includes("iPod") || Nf();
    const Pf = () => Lf.toLowerCase().includes("gsa") || Lf.includes("GoogleApp");
    var Qf = () => Of() || Lf.includes("Android") || Lf.includes("Mobile") || Lf.includes("Silk") || Lf.includes("UCBrowser") || Lf.includes("UCWEB")
      , Rf = "sdoodles" === document.documentElement.id && !Qf();
    Lf.includes("GT-I9300") && Lf.includes("Chrome");
    var Sf = () => Mf.v.includes("/logos/") && Mf.v.includes(".html")
      , Tf = () => {
        const a = Mf.g.get("ntp");
        return "1" === a || "2" === a
    }
      , Uf = () => "1" === Mf.g.get("fpdoodle") && !!document.getElementById("fpdoodle")
      , Vf = () => !!document.querySelector("body#iframedoodle")
      , Wf = () => (!Qf() || Nf()) && !Rf && !(document.getElementById("fkbx") || Tf()) && !Uf() && !Sf()
      , Xf = Nf() && !Rf && !(document.getElementById("fkbx") || Tf()) && !Uf() && !Sf();
    var $f = a => {
        let b = new Image;
        b.onerror = b.onload = b.onabort = () => {
            delete Yf[Zf]
        }
        ;
        Yf[Zf] = b;
        //b.src = `${""}/gen_204?atyp=i&ct=${"doodle"}&cad=${a}&zx=${Date.now()}`;
        Zf++
    }
    ;
    let Yf = []
      , Zf = 0;
    var ag = RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]")
      , bg = RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]")
      , cg = /^http:\/\/.*/
      , dg = /\s+/
      , eg = /[\d\u06f0-\u06f9]/;
    /*

 SPDX-License-Identifier: Apache-2.0
*/
    var fg;
    try {
        new URL("s://g"),
        fg = !0
    } catch (a) {
        fg = !1
    }
    const gg = fg;
    function hg(a) {
        a: if (gg) {
            try {
                var b = new URL(a)
            } catch (c) {
                b = "https:";
                break a
            }
            b = b.protocol
        } else
            b: {
                b = document.createElement("a");
                try {
                    b.href = a
                } catch (c) {
                    b = void 0;
                    break b
                }
                b = b.protocol;
                b = ":" === b || "" === b ? "https:" : b
            }
        if ("javascript:" !== b)
            return a
    }
    ;function ig(a, b) {
        a.src = Ke(b);
        var c;
        let d;
        (c = (b = null == (d = (c = (a.ownerDocument && a.ownerDocument.defaultView || window).document).querySelector) ? void 0 : d.call(c, "script[nonce]")) ? b.nonce || b.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", c)
    }
    ;function jg(a, b, c) {
        b = String(b);
        let d = c;
        "inserthtml" === b.toLowerCase() && (d = $e(c));
        return a.execCommand(b, !1, d)
    }
    ;class kg {
        constructor(a) {
            this.Vc = a
        }
    }
    function lg(a) {
        return new kg(b => b.substr(0, a.length + 1).toLowerCase() === a + ":")
    }
    const mg = [lg("data"), lg("http"), lg("https"), lg("mailto"), lg("ftp"), new kg(a => /^[^:]*([/?#]|$)/.test(a))];
    function ng(a, b=mg) {
        for (let c = 0; c < b.length; ++c) {
            const d = b[c];
            if (d instanceof kg && d.Vc(a))
                return new Te(a,Xe)
        }
    }
    ;function og(a, ...b) {
        if (0 === b.length)
            return Oe(a[0]);
        let c = a[0];
        for (let d = 0; d < b.length; d++)
            c += encodeURIComponent(b[d]) + a[d + 1];
        return Oe(c)
    }
    ;var pg = (a, ...b) => {
        if (a)
            for (let c = 0; c < b.length; c += 2) {
                const d = b[c]
                  , e = b[c + 1]
                  , f = a.style;
                f && d in f ? f[d] = e : d in a && (a[d] = e)
            }
    }
      , qg = ["Moz", "ms", "O", "webkit"]
      , rg = (a, b, c) => {
        if (a) {
            for (const d of qg)
                a.style[d + b] = c;
            a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c
        }
    }
      , sg = ["", "moz", "ms", "o", "webkit"]
      , tg = (a, b) => {
        if (!a)
            return null;
        for (const d of sg) {
            var c = b;
            0 < d.length && (c = b.charAt(0).toUpperCase() + b.substr(1));
            c = d + c;
            if ("undefined" != typeof a[c])
                return c
        }
        return null
    }
      , ug = (a, b) => {
        (b = (b = b && !(Pf() && Of())) || Tf()) ? (b = window,
        a = a instanceof Te ? Ue(a) : hg(a),
        void 0 !== a && b.open(a, void 0, void 0)) : (b = window.top.location,
        a = ng(a, mg) || Ye,
        a = a instanceof Te ? Ue(a) : hg(a),
        void 0 !== a && b.assign(a))
    }
      , vg = () => window.google && void 0 !== window.google.doodle ? window.google.doodle : null
      , wg = (a, b) => {
        const c = vg();
        return c && void 0 != c[a] ? c[a] : b
    }
      , xg = a => {
        vg() || (window.google.doodle = {});
        window.google.doodle.pvc = a
    }
    ;
    function yg() {
        var a = zg;
        a = Ag(Bg(Cg(new Dg, Hd(G(a.g, Dg, 2), 1)), Hd(G(a.g, Dg, 2), 2)), Eg.Od.name);
        a = ib(a.g(), 3);
        a = Ef(Ff("https://www.google.com/webhp"), "doodle", `${Fg}_${a}`).toString();
        a = new URL(a);
        const b = new URL(a.origin);
        for (let c of "fpdoodle tune doodle hl gl nord".split(" ")) {
            const d = a.searchParams.get(c);
            d && b.searchParams.set(c, d)
        }
        return b.toString()
    }
    var Gg = (a, b) => {
        a = wg("doodle_args", {})[a];
        return null != a ? a : b
    }
      , Hg = () => !!Gg("is_dogfood", !1)
      , Ig = wg("hl", "en")
      , Jg = wg("gl", "");
    RegExp("^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)", "i").test(Ig);
    var Lg = (a, b, c) => {
        const d = Math.max(0, c - 230) + (document.querySelector("div.og-pdp") ? 36 : 12);
        pg(a, "width", `${b}px`, "height", `${c}px`);
        Kg(d)
    }
    ;
    const Kg = a => {
        a = `${a}px`;
        var b = document.getElementById("lga");
        b && pg(b, "marginBottom", a);
        document.getElementById("fkbx") || Tf() || ((b = document.getElementById("searchform")) && pg(b, "transform", "translateY(" + a + ")"),
        a = new UIEvent("resize",{
            bubbles: !1,
            Kg: !1,
            view: window,
            detail: 0
        }),
        window.dispatchEvent(a))
    }
    ;
    let Mg = null
      , Ng = null
      , Og = null;
    var Pg = () => {
        Og || (window.google && window.google.kEI && window.google.kEI.length ? Og = window.google.kEI : Vf() && Kf(Mf.g, "ei") && (Og = Mf.g.get("ei")));
        return Og
    }
      , Qg = () => {
        if (!Mg) {
            const a = document.getElementById("hplogoved");
            a ? Mg = a.getAttribute("data-ved") : Vf() && Kf(Mf.g, "ved") && (Mg = Mf.g.get("ved"))
        }
        return Mg
    }
    ;
    var Rg = {
        [2]: "wss://matchmaker.prod.h22.cloud.doodles.goog",
        [3]: "",
        [4]: "wss://matchmaker.prod.h22.cloud.doodles.goog",
        [6]: "wss://matchmaker.18.h18.cloud.doodles.goog",
        [5]: "wss://matchmaker.18.h18.cloud.doodles.goog",
        [1]: "",
        [0]: ""
    }[4]
      , L = Qf() && !Xf
      , M = L ? 540 : 960
      , Sg = L ? 960 : 540
      , Tg = 1E3 / 24
      , Ug = document.querySelector("#hplogo")
      , N = document.getElementById("hpcanvas")
      , O = N.getContext("2d")
      , Vg = {
        qg: "MOST_SPIRITS_COLLECTED",
        Eg: "STOLE_MOST",
        og: "MOST_MEGA_FLAMES",
        Zf: "COLLECT_1000_SPIRITS",
        jg: "COLLECT_5000_SPIRITS",
        Dg: "STEAL_250",
        Cg: "STEAL_1000",
        dg: "COLLECT_10_MEGA_FLAMES",
        ig: "COLLECT_30_MEGA_FLAMES",
        Hg: "WIN_5_GAMES",
        Gg: "WIN_35_GAMES",
        zg: "PLAY_10_GAMES",
        Ag: "PLAY_50_GAMES",
        fg: "COLLECT_150_SPIRITS_SINGLE_GAME",
        hg: "COLLECT_200_SPIRITS_SINGLE_GAME",
        rg: "MOST_SPIRITS_COLLECTED_5_GAMES"
    }
      , Wg = new Map([[87, !0], [65, !0], [83, !0], [68, !0], [32, !0], [37, !0], [38, !0], [39, !0], [40, !0], [192, !1]])
      , Fg = wg("id", "207425579")
      , Xg = Qf() ? 78 : 0
      , Yg = 0 <= "en en-US en-GB ko ko-KR ko-US".split(" ").indexOf(Ig) ? "Poor Story" : "Noto Sans"
      , P = `${Yg},sans-serif`
      , Zg = "true" === Gg("disable_host", "false");
    function $g(a) {
        if (!a.g) {
            a.g = !0;
            for (const b of a.o)
                b()
        }
    }
    function ah(a, b) {
        a.g ? b() : a.o.push(b)
    }
    class bh {
        constructor(a) {
            this.j = a;
            this.g = !1;
            this.o = []
        }
        preload() {}
    }
    var ch = (a, b) => {
        Promise.all(a.map(c => c.preload())).then(b)
    }
    ;
    class dh extends bh {
        constructor(a) {
            super(a);
            this.image = new Image
        }
        preload() {
            if (this.image.src)
                return Promise.resolve(this.image);
            let a;
            const b = new Promise(d => a = d)
              , c = () => {
                $g(this);
                a(this.image)
            }
            ;
            this.image.crossOrigin = "Anonymous";
            this.image.decode ? (this.image.src = this.j,
            this.image.decode().then(c, () => {
                this.image.removeAttribute("crossOrigin");
                this.image.src = this.j;
                this.image.decode().then(c, () => {
                    c()
                }
                )
            }
            )) : (this.image.onload = c,
            this.image.onerror = () => {
                this.image.removeAttribute("crossOrigin");
                this.image.removeAttribute("onerror");
                this.image.src = this.image.src
            }
            ,
            this.image.src = this.j);
            (this.image.complete || "complete" == this.image.readyState) && c();
            return b
        }
    }
    ;function eh(a, b, c) {
        a.g.push(b);
        a.i.push(c);
        return a.g.length - 1
    }
    function fh(a, b) {
        var c = gh;
        Promise.all(a.map(d => c.preload(d))).then( () => {
            b && b()
        }
        )
    }
    function hh(a, b, c, d, e, f, g, h, k) {
        var l = c[1]
          , m = c[2];
        const n = c[3]
          , q = c[4];
        let t, w, p, v;
        void 0 === d ? (t = l,
        w = m,
        p = n,
        v = q,
        g = f = 0,
        d = n,
        e = q) : void 0 === f ? (t = l,
        w = m,
        p = n,
        v = q,
        g = f = 0) : (t = l,
        w = m,
        p = d,
        v = e,
        d = h,
        e = k);
        t < l && (k = l - t,
        t = l,
        p -= k,
        f += k,
        d -= k);
        w < m && (k = m - w,
        w = m,
        v -= k,
        g += k,
        e -= k);
        t + p > l + n && (l = t + p - (l + n),
        p -= l,
        d -= l);
        w + v > m + q && (m = w + v - (m + q),
        v -= m,
        e -= m);
        a = a.g["number" === typeof c ? c : c[0]];
        if (!a.g)
            throw Error("z");
        0 < p && 0 < v && b.drawImage(a.image, t, w, p, v, f, g, d, e)
    }
    function ih(a, b, c, d, e, f=1, g=!1) {
        const h = b[3]
          , k = b[4];
        c.save();
        c.translate(d, e);
        c.scale(f, f);
        hh(a, c, b, h, k, -h * (g ? .5 : 0), -k * (g ? .5 : 0), h, k);
        c.restore()
    }
    var kh = class {
        constructor() {
            var a = jh;
            this.g = [];
            this.i = [];
            for (const b of a)
                eh(this, new dh("/archive/tggd/2021/v81123/" + b.filename), b.size)
        }
        preload(a, b) {
            const c = this.g["number" === typeof a ? a : a[0]];
            return (new Promise(d => {
                ah(c, d);
                c.preload()
            }
            )).then( () => {
                b && b()
            }
            )
        }
        getSize(a) {
            return {
                width: a[3],
                height: a[4]
            }
        }
    }
    ;
    class lh extends kh {
    }
    ja(lh);
    var jh = [{
        filename: "main-sprite.png",
        size: [2042, 565]
    }, {
        filename: "hats-sprite.png",
        size: [2047, 1120]
    }, {
        filename: "achievements-sprite.png",
        size: [2047, 1195]
    }, {
        filename: "tutorial-sprite.png",
        size: [2044, 1615]
    }, {
        filename: "alpha-sprite.png",
        size: [2045, 3832]
    }, {
        filename: "bravo-sprite.png",
        size: [2047, 3574]
    }, {
        filename: "desktop-sprite.png",
        size: [3849, 1083]
    }, {
        filename: "initial-sprite.png",
        size: [1017, 412]
    }, {
        filename: "mobile-sprite.png",
        size: [3798, 1923]
    }, {
        filename: "dogfood-sprite.png",
        size: [60, 60]
    }]
      , mh = [2, 1926, 722, 84, 84]
      , nh = [2, 1926, 148, 98, 98]
      , oh = [2, 0, 982, 172, 172]
      , ph = [2, 1926, 350, 98, 98]
      , qh = [2, 0, 0, 960, 540]
      , rh = [2, 963, 0, 540, 960]
      , sh = [2, 1506, 0, 417, 436]
      , th = [2, 1506, 439, 417, 436]
      , uh = [2, 0, 543, 417, 436]
      , vh = [2, 1926, 542, 87, 87]
      , wh = [2, 1926, 632, 87, 87]
      , xh = [2, 1926, 451, 93, 88]
      , yh = [4, 234, 3708, 75, 75]
      , zh = [6, 0, 0, 960, 540]
      , Ah = [8, 0, 0, 540, 960]
      , Bh = [0, 951, 271, 306, 117]
      , Ch = [0, 951, 235, 32, 33]
      , Dh = [6, 963, 0, 960, 540]
      , Eh = [8, 543, 0, 540, 960]
      , Fh = [0, 1795, 271, 166, 192]
      , Gh = [3, 874, 718, 300, 100]
      , Hh = [0, 459, 415, 96, 96]
      , Ih = [6, 2889, 0, 960, 540]
      , Jh = [8, 1629, 0, 540, 960]
      , Kh = [3, 0, 0, 512, 512]
      , Lh = [3, 515, 0, 512, 512]
      , Mh = [3, 1829, 718, 156, 76]
      , Nh = [3, 874, 668, 56, 37]
      , Oh = [1, 687, 956, 100, 100]
      , Ph = [3, 1177, 718, 275, 261]
      , Qh = [3, 1924, 0, 116, 116]
      , Rh = [6, 0, 543, 960, 540]
      , Sh = [6, 963, 543, 960, 540]
      , Th = [8, 2715, 0, 540, 960]
      , Uh = [6, 1926, 543, 960, 540]
      , Vh = [8, 3258, 0, 540, 960]
      , Wh = [3, 1455, 718, 205, 93]
      , Xh = [0, 1528, 271, 264, 202]
      , Yh = [0, 1260, 271, 265, 265]
      , Zh = [3, 447, 515, 424, 462]
      , $h = [3, 1924, 119, 100, 98]
      , ai = [3, 1030, 0, 444, 356]
      , bi = [3, 1477, 0, 444, 356]
      , ci = [3, 1477, 0, 444, 356]
      , di = [3, 1030, 359, 444, 356]
      , ei = [3, 1477, 359, 444, 356]
      , fi = [3, 0, 515, 444, 356]
      , gi = [0, 1964, 271, 77, 77]
      , hi = [0, 0, 0, 640, 141]
      , ii = [3, 1663, 718, 163, 75]
      , ji = [3, 933, 668, 56, 37]
      , ki = [6, 2889, 543, 960, 540]
      , li = [8, 0, 963, 540, 960]
      , mi = [[3, 874, 515, 150, 150], [3, 874, 515, 150, 150], [3, 1663, 796, 150, 150], [3, 1663, 796, 150, 150], [3, 1663, 796, 150, 150], [3, 1816, 797, 150, 150], [3, 1816, 797, 150, 150], [3, 1816, 797, 150, 150], [3, 1455, 814, 150, 150], [3, 1455, 814, 150, 150], [3, 1455, 814, 150, 150], [3, 874, 821, 150, 150], [3, 874, 821, 150, 150], [3, 874, 821, 150, 150], [3, 0, 874, 150, 150], [3, 153, 874, 150, 150], [3, 153, 874, 150, 150], [3, 153, 874, 150, 150], [3, 1608, 949, 150, 150], [3, 1608, 949, 150, 150], [3, 1761, 950, 150, 150], [3, 1761, 950, 150, 150], [3, 1761, 950, 150, 150], [3, 874, 515, 150, 150], [3, 1455, 967, 150, 150], [3, 874, 974, 150, 150], [3, 874, 974, 150, 150], [3, 306, 980, 150, 150], [3, 1816, 797, 150, 150], [3, 1816, 797, 150, 150], [3, 1816, 797, 150, 150], [3, 1455, 814, 150, 150], [3, 1455, 814, 150, 150], [3, 1455, 814, 150, 150], [3, 874, 821, 150, 150], [3, 874, 821, 150, 150], [3, 874, 821, 150, 150], [3, 0, 874, 150, 150], [3, 153, 874, 150, 150], [3, 153, 874, 150, 150], [3, 153, 874, 150, 150], [3, 1608, 949, 150, 150], [3, 1608, 949, 150, 150], [3, 1761, 950, 150, 150], [3, 1761, 950, 150, 150], [3, 1761, 950, 150, 150]]
      , ni = [[1, 793, 144, 200, 200], [1, 1467, 152, 200, 200], [1, 0, 163, 200, 200], [1, 996, 174, 200, 200], [1, 1199, 174, 200, 200], [1, 203, 181, 200, 200], [1, 1670, 187, 200, 200], [1, 406, 331, 200, 200], [1, 609, 347, 200, 200], [1, 1402, 355, 200, 200], [1, 0, 366, 200, 200], [1, 812, 377, 200, 200], [1, 1015, 377, 200, 200], [1, 203, 384, 200, 200], [1, 1605, 390, 200, 200], [1, 1808, 390, 200, 200], [1, 406, 534, 200, 200], [1, 609, 550, 200, 200], [1, 1218, 558, 200, 200], [1, 0, 569, 200, 200], [1, 812, 580, 200, 200], [1, 1015, 580, 200, 200], [1, 203, 587, 200, 200], [1, 1421, 593, 200, 200], [1, 1624, 593, 200, 200], [1, 1827, 593, 200, 200], [1, 406, 737, 200, 200], [1, 609, 753, 200, 200], [1, 1218, 761, 200, 200], [1, 0, 772, 200, 200], [1, 812, 783, 200, 200]]
      , oi = [[3, 1988, 688, 50, 50], [3, 1988, 688, 50, 50], [3, 1988, 741, 50, 50], [3, 1988, 741, 50, 50], [3, 1608, 814, 50, 50], [3, 1608, 814, 50, 50], [3, 1105, 821, 50, 50], [3, 1105, 821, 50, 50], [3, 1608, 867, 50, 50], [3, 1608, 867, 50, 50], [3, 384, 874, 50, 50], [3, 384, 874, 50, 50], [3, 1105, 874, 50, 50], [3, 1105, 874, 50, 50], [3, 1105, 927, 50, 50], [3, 1105, 927, 50, 50], [3, 1988, 688, 50, 50], [3, 1988, 688, 50, 50], [3, 1988, 741, 50, 50], [3, 1988, 741, 50, 50], [3, 1608, 814, 50, 50], [3, 1608, 814, 50, 50], [3, 1105, 821, 50, 50], [3, 1992, 953, 50, 50], [3, 1992, 1006, 50, 50], [3, 765, 1058, 50, 50], [3, 818, 1058, 50, 50], [3, 818, 1058, 50, 50], [3, 1992, 1059, 50, 50], [3, 1992, 1059, 50, 50], [3, 1333, 1060, 50, 50], [3, 1333, 1060, 50, 50], [3, 1386, 1060, 50, 50], [3, 1386, 1060, 50, 50], [3, 1992, 1112, 50, 50], [3, 1992, 1112, 50, 50], [3, 1486, 1198, 50, 50], [3, 1486, 1198, 50, 50], [3, 1539, 1198, 50, 50], [3, 1539, 1198, 50, 50], [3, 1224, 1213, 50, 50], [3, 1224, 1213, 50, 50], [3, 818, 1058, 50, 50], [3, 818, 1058, 50, 50], [3, 1992, 1059, 50, 50], [3, 1992, 1059, 50, 50], [3, 1333, 1060, 50, 50], [3, 1333, 1060, 50, 50], [3, 1386, 1060, 50, 50], [3, 1386, 1060, 50, 50], [3, 1992, 1112, 50, 50], [3, 1992, 1112, 50, 50], [3, 1486, 1198, 50, 50], [3, 1486, 1198, 50, 50], [3, 1277, 1213, 50, 50], [3, 1277, 1213, 50, 50], [3, 1149, 1288, 50, 50], [3, 1608, 867, 50, 50], [3, 384, 874, 50, 50], [3, 384, 874, 50, 50], [3, 1105, 874, 50, 50], [3, 1105, 874, 50, 50], [3, 1105, 927, 50, 50], [3, 1105, 927, 50, 50], [3, 1988, 688, 50, 50], [3, 1988, 688, 50, 50], [3, 1988, 741, 50, 50], [3, 1988, 741, 50, 50], [3, 1608, 814, 50, 50], [3, 1608, 814, 50, 50], [3, 1105, 821, 50, 50], [3, 1105, 821, 50, 50], [3, 234, 1333, 50, 50], [3, 234, 1333, 50, 50], [3, 1149, 1341, 50, 50], [3, 384, 874, 50, 50], [3, 1105, 874, 50, 50], [3, 1105, 874, 50, 50], [3, 1105, 927, 50, 50], [3, 1105, 927, 50, 50]]
      , pi = [[3, 1383, 1429, 50, 50], [3, 1383, 1429, 50, 50], [3, 702, 1439, 50, 50], [3, 702, 1439, 50, 50], [3, 1077, 1444, 50, 50], [3, 1077, 1444, 50, 50], [3, 702, 1492, 50, 50], [3, 702, 1492, 50, 50], [3, 1311, 1507, 50, 50], [3, 1311, 1507, 50, 50], [3, 755, 1511, 50, 50], [3, 755, 1511, 50, 50], [3, 234, 1517, 50, 50], [3, 234, 1517, 50, 50], [3, 287, 1517, 50, 50], [3, 287, 1517, 50, 50], [3, 1383, 1429, 50, 50], [3, 340, 1517, 50, 50], [3, 393, 1517, 50, 50], [3, 393, 1517, 50, 50], [3, 446, 1517, 50, 50], [3, 499, 1517, 50, 50], [3, 552, 1517, 50, 50], [3, 605, 1517, 50, 50], [3, 808, 1519, 50, 50], [3, 808, 1519, 50, 50], [3, 861, 1519, 50, 50], [3, 861, 1519, 50, 50], [3, 914, 1519, 50, 50], [3, 914, 1519, 50, 50], [3, 967, 1522, 50, 50], [3, 967, 1522, 50, 50], [3, 1020, 1522, 50, 50], [3, 1020, 1522, 50, 50], [3, 658, 1545, 50, 50], [3, 658, 1545, 50, 50], [3, 1311, 1560, 50, 50], [3, 1311, 1560, 50, 50], [3, 605, 1517, 50, 50], [3, 605, 1517, 50, 50], [3, 808, 1519, 50, 50], [3, 808, 1519, 50, 50], [3, 861, 1519, 50, 50], [3, 711, 1564, 50, 50], [3, 1364, 1564, 50, 50], [3, 1364, 1564, 50, 50], [3, 1417, 1564, 50, 50], [3, 1470, 1564, 50, 50], [3, 1383, 1429, 50, 50], [3, 1383, 1429, 50, 50], [3, 702, 1439, 50, 50], [3, 702, 1439, 50, 50], [3, 1077, 1444, 50, 50], [3, 1077, 1444, 50, 50], [3, 702, 1492, 50, 50], [3, 702, 1492, 50, 50], [3, 1311, 1507, 50, 50], [3, 1311, 1507, 50, 50], [3, 755, 1511, 50, 50], [3, 755, 1511, 50, 50], [3, 234, 1517, 50, 50], [3, 1523, 1565, 50, 50], [3, 1576, 1565, 50, 50], [3, 1576, 1565, 50, 50], [3, 1629, 1565, 50, 50], [3, 1383, 1429, 50, 50], [3, 702, 1439, 50, 50], [3, 702, 1439, 50, 50], [3, 1077, 1444, 50, 50], [3, 1077, 1444, 50, 50], [3, 702, 1492, 50, 50], [3, 702, 1492, 50, 50], [3, 1311, 1507, 50, 50], [3, 1311, 1507, 50, 50], [3, 755, 1511, 50, 50], [3, 755, 1511, 50, 50], [3, 234, 1517, 50, 50], [3, 234, 1517, 50, 50], [3, 287, 1517, 50, 50], [3, 287, 1517, 50, 50]]
      , qi = [[7, 966, 0, 50, 50], [7, 966, 0, 50, 50], [7, 966, 53, 50, 50], [7, 966, 53, 50, 50], [7, 966, 106, 50, 50], [7, 966, 106, 50, 50], [7, 966, 159, 50, 50], [7, 966, 159, 50, 50], [7, 702, 332, 50, 50], [7, 702, 332, 50, 50], [7, 755, 332, 50, 50], [7, 755, 332, 50, 50], [7, 808, 332, 50, 50], [7, 808, 332, 50, 50], [7, 861, 332, 50, 50], [7, 861, 332, 50, 50], [7, 914, 332, 50, 50], [7, 914, 332, 50, 50], [7, 967, 332, 50, 50], [7, 78, 349, 50, 50], [7, 966, 106, 50, 50], [7, 966, 106, 50, 50], [7, 966, 159, 50, 50], [7, 966, 159, 50, 50], [7, 702, 332, 50, 50], [7, 702, 332, 50, 50], [7, 755, 332, 50, 50], [7, 755, 332, 50, 50], [7, 808, 332, 50, 50], [7, 808, 332, 50, 50], [7, 861, 332, 50, 50], [7, 861, 332, 50, 50], [7, 966, 0, 50, 50], [7, 966, 0, 50, 50], [7, 966, 53, 50, 50], [7, 966, 53, 50, 50], [7, 966, 106, 50, 50], [7, 966, 106, 50, 50], [7, 966, 159, 50, 50], [7, 966, 159, 50, 50], [7, 702, 332, 50, 50], [7, 702, 332, 50, 50], [7, 755, 332, 50, 50], [7, 755, 332, 50, 50], [7, 808, 332, 50, 50], [7, 808, 332, 50, 50], [7, 861, 332, 50, 50], [7, 861, 332, 50, 50], [7, 966, 0, 50, 50], [7, 966, 0, 50, 50], [7, 966, 53, 50, 50], [7, 966, 53, 50, 50], [7, 966, 106, 50, 50], [7, 966, 106, 50, 50], [7, 966, 159, 50, 50], [7, 966, 159, 50, 50], [7, 702, 332, 50, 50], [7, 702, 332, 50, 50], [7, 755, 332, 50, 50], [7, 755, 332, 50, 50], [7, 808, 332, 50, 50], [7, 808, 332, 50, 50], [7, 861, 332, 50, 50], [7, 861, 332, 50, 50], [7, 966, 0, 50, 50], [7, 966, 0, 50, 50], [7, 966, 53, 50, 50], [7, 966, 53, 50, 50], [7, 966, 106, 50, 50], [7, 966, 106, 50, 50], [7, 966, 159, 50, 50], [7, 966, 159, 50, 50], [7, 702, 332, 50, 50], [7, 702, 332, 50, 50], [7, 755, 332, 50, 50], [7, 755, 332, 50, 50], [7, 808, 332, 50, 50], [7, 808, 332, 50, 50], [7, 861, 332, 50, 50], [7, 861, 332, 50, 50]]
      , ri = [[0, 1067, 0, 314, 268], [0, 1384, 0, 314, 268], [0, 1384, 0, 314, 268], [0, 1701, 0, 314, 268], [0, 0, 144, 314, 268], [0, 317, 144, 314, 268], [0, 317, 144, 314, 268], [0, 634, 235, 314, 268]]
      , si = [[0, 2018, 0, 24, 31], [0, 2018, 0, 24, 31], [0, 2018, 34, 24, 31], [0, 2018, 34, 24, 31], [0, 2018, 68, 24, 31], [0, 2018, 68, 24, 31], [0, 2018, 102, 24, 31], [0, 2018, 102, 24, 31], [0, 2018, 136, 24, 31], [0, 2018, 136, 24, 31]]
      , ti = [[7, 186, 0, 75, 80], [7, 186, 0, 75, 80], [7, 264, 0, 75, 80], [7, 342, 0, 75, 80], [7, 420, 0, 75, 80], [7, 498, 0, 75, 80], [7, 576, 0, 75, 80], [7, 654, 0, 75, 80], [7, 732, 0, 75, 80], [7, 810, 0, 75, 80], [7, 810, 0, 75, 80], [7, 888, 0, 75, 80], [7, 186, 83, 75, 80], [7, 186, 83, 75, 80], [7, 264, 83, 75, 80], [7, 342, 83, 75, 80], [7, 420, 83, 75, 80], [7, 498, 83, 75, 80], [7, 576, 83, 75, 80], [7, 654, 83, 75, 80], [7, 732, 83, 75, 80], [7, 810, 83, 75, 80], [7, 888, 83, 75, 80], [7, 888, 83, 75, 80], [7, 186, 0, 75, 80], [7, 186, 0, 75, 80], [7, 186, 0, 75, 80], [7, 342, 0, 75, 80], [7, 93, 100, 75, 80], [7, 0, 101, 75, 80], [7, 171, 166, 75, 80], [7, 249, 166, 75, 80], [7, 327, 166, 75, 80], [7, 405, 166, 75, 80], [7, 483, 166, 75, 80], [7, 561, 166, 75, 80], [7, 888, 0, 75, 80], [7, 810, 0, 75, 80], [7, 186, 83, 75, 80], [7, 264, 83, 75, 80], [7, 639, 166, 75, 80], [7, 420, 83, 75, 80], [7, 498, 83, 75, 80], [7, 717, 166, 75, 80], [7, 654, 83, 75, 80], [7, 732, 83, 75, 80], [7, 795, 166, 75, 80], [7, 888, 83, 75, 80], [7, 888, 83, 75, 80], [7, 888, 83, 75, 80]]
      , ui = [[7, 873, 166, 75, 80], [7, 78, 183, 75, 80], [7, 0, 184, 75, 80], [7, 156, 249, 75, 80], [7, 234, 249, 75, 80], [7, 312, 249, 75, 80], [7, 390, 249, 75, 80], [7, 468, 249, 75, 80], [7, 546, 249, 75, 80], [7, 624, 249, 75, 80], [7, 702, 249, 75, 80], [7, 780, 249, 75, 80], [7, 858, 249, 75, 80], [7, 936, 249, 75, 80], [7, 78, 266, 75, 80], [7, 0, 267, 75, 80]]
      , vi = [[7, 156, 332, 75, 80], [7, 234, 332, 75, 80], [7, 312, 332, 75, 80], [7, 312, 332, 75, 80], [7, 390, 332, 75, 80], [7, 390, 332, 75, 80], [7, 468, 332, 75, 80], [7, 468, 332, 75, 80], [7, 546, 332, 75, 80], [7, 546, 332, 75, 80], [7, 546, 332, 75, 80], [7, 624, 332, 75, 80], [7, 624, 332, 75, 80], [7, 624, 332, 75, 80]]
      , wi = [[0, 951, 391, 150, 150], [0, 951, 391, 150, 150], [0, 951, 391, 150, 150], [0, 1104, 391, 150, 150], [0, 1104, 391, 150, 150], [0, 1104, 391, 150, 150], [0, 0, 415, 150, 150], [0, 0, 415, 150, 150], [0, 0, 415, 150, 150], [0, 153, 415, 150, 150], [0, 153, 415, 150, 150], [0, 153, 415, 150, 150]];
    function xi(a) {
        a && "function" == typeof a.dispose && a.dispose()
    }
    ;function yi() {
        this.ya = this.ya;
        this.oa = this.oa
    }
    yi.prototype.ya = !1;
    yi.prototype.dispose = function() {
        this.ya || (this.ya = !0,
        this.ub())
    }
    ;
    function zi(a, b) {
        a.ya ? b() : (a.oa || (a.oa = []),
        a.oa.push(b))
    }
    yi.prototype.ub = function() {
        if (this.oa)
            for (; this.oa.length; )
                this.oa.shift()()
    }
    ;
    function Ai(a, b) {
        this.type = a;
        this.i = this.target = b;
        this.defaultPrevented = !1
    }
    Ai.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    var Bi = function() {
        if (!A.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            const c = () => {}
            ;
            A.addEventListener("test", c, b);
            A.removeEventListener("test", c, b)
        } catch (c) {}
        return a
    }();
    function Ci(a, b) {
        Ai.call(this, a ? a.type : "");
        this.relatedTarget = this.i = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.g = null;
        if (a) {
            var c = this.type = a.type
              , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.i = b;
            if (b = a.relatedTarget) {
                if (eb) {
                    a: {
                        try {
                            cb(b.nodeName);
                            var e = !0;
                            break a
                        } catch (f) {}
                        e = !1
                    }
                    e || (b = null)
                }
            } else
                "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
            this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
            this.screenX = d.screenX || 0,
            this.screenY = d.screenY || 0) : (this.offsetX = fb || void 0 !== a.offsetX ? a.offsetX : a.layerX,
            this.offsetY = fb || void 0 !== a.offsetY ? a.offsetY : a.layerY,
            this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
            this.screenX = a.screenX || 0,
            this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Di[a.pointerType] || "";
            this.state = a.state;
            this.g = a;
            a.defaultPrevented && Ci.Qb.preventDefault.call(this)
        }
    }
    sa(Ci, Ai);
    var Di = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Ci.prototype.preventDefault = function() {
        Ci.Qb.preventDefault.call(this);
        var a = this.g;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    ;
    Ci.prototype.j = function() {
        return this.g
    }
    ;
    var Ei = "closure_listenable_" + (1E6 * Math.random() | 0);
    function Fi(a) {
        return !(!a || !a[Ei])
    }
    ;var Gi = 0;
    function Hi(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Bd = e;
        this.key = ++Gi;
        this.Zc = this.yd = !1
    }
    function Ii(a) {
        a.Zc = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.Bd = null
    }
    ;function Ji(a) {
        this.src = a;
        this.g = {};
        this.i = 0
    }
    Ji.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [],
        this.i++);
        var g = Ki(a, b, d, e);
        -1 < g ? (b = a[g],
        c || (b.yd = !1)) : (b = new Hi(b,this.src,f,!!d,e),
        b.yd = c,
        a.push(b));
        return b
    }
    ;
    function Li(a, b) {
        var c = b.type;
        if (!(c in a.g))
            return !1;
        var d = bb(a.g[c], b);
        d && (Ii(b),
        0 == a.g[c].length && (delete a.g[c],
        a.i--));
        return d
    }
    function Ki(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Zc && f.listener == b && f.capture == !!c && f.Bd == d)
                return e
        }
        return -1
    }
    ;var Mi = "closure_lm_" + (1E6 * Math.random() | 0)
      , Ni = {}
      , Oi = 0;
    function Pi(a, b, c, d, e) {
        if (d && d.once)
            return Qi(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Pi(a, b[f], c, d, e);
            return null
        }
        c = Ri(c);
        return Fi(a) ? Si(a, b, c, la(d) ? !!d.capture : !!d, e) : Ti(a, b, c, !1, d, e)
    }
    function Ti(a, b, c, d, e, f) {
        if (!b)
            throw Error("A");
        var g = la(e) ? !!e.capture : !!e
          , h = Ui(a);
        h || (a[Mi] = h = new Ji(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy)
            return c;
        d = Vi();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Bi || (e = g),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(Wi(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("B");
        Oi++;
        return c
    }
    function Vi() {
        function a(c) {
            return b.call(a.src, a.listener, c)
        }
        const b = Xi;
        return a
    }
    function Qi(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Qi(a, b[f], c, d, e);
            return null
        }
        c = Ri(c);
        return Fi(a) ? a.j.add(String(b), c, !0, la(d) ? !!d.capture : !!d, e) : Ti(a, b, c, !0, d, e)
    }
    function Yi(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                Yi(a, b[f], c, d, e);
        else
            (d = la(d) ? !!d.capture : !!d,
            c = Ri(c),
            Fi(a)) ? (a = a.j,
            b = String(b).toString(),
            b in a.g && (f = a.g[b],
            c = Ki(f, c, d, e),
            -1 < c && (Ii(f[c]),
            Array.prototype.splice.call(f, c, 1),
            0 == f.length && (delete a.g[b],
            a.i--)))) : a && (a = Ui(a)) && (b = a.g[b.toString()],
            a = -1,
            b && (a = Ki(b, c, d, e)),
            (c = -1 < a ? b[a] : null) && Zi(c))
    }
    function Zi(a) {
        if ("number" === typeof a || !a || a.Zc)
            return !1;
        var b = a.src;
        if (Fi(b))
            return Li(b.j, a);
        var c = a.type
          , d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Wi(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        Oi--;
        (c = Ui(b)) ? (Li(c, a),
        0 == c.i && (c.src = null,
        b[Mi] = null)) : Ii(a);
        return !0
    }
    function Wi(a) {
        return a in Ni ? Ni[a] : Ni[a] = "on" + a
    }
    function Xi(a, b) {
        if (a.Zc)
            a = !0;
        else {
            b = new Ci(b,this);
            var c = a.listener
              , d = a.Bd || a.src;
            a.yd && Zi(a);
            a = c.call(d, b)
        }
        return a
    }
    function Ui(a) {
        a = a[Mi];
        return a instanceof Ji ? a : null
    }
    var $i = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function Ri(a) {
        if ("function" === typeof a)
            return a;
        a[$i] || (a[$i] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[$i]
    }
    ;function aj() {
        yi.call(this);
        this.j = new Ji(this);
        this.Xa = this;
        this.Da = null
    }
    sa(aj, yi);
    aj.prototype[Ei] = !0;
    aj.prototype.addEventListener = function(a, b, c, d) {
        Pi(this, a, b, c, d)
    }
    ;
    aj.prototype.removeEventListener = function(a, b, c, d) {
        Yi(this, a, b, c, d)
    }
    ;
    function bj(a, b) {
        var c, d = a.Da;
        if (d)
            for (c = []; d; d = d.Da)
                c.push(d);
        a = a.Xa;
        d = b.type || b;
        if ("string" === typeof b)
            b = new Ai(b,a);
        else if (b instanceof Ai)
            b.target = b.target || a;
        else {
            var e = b;
            b = new Ai(d,a);
            Be(b, e)
        }
        e = !0;
        if (c)
            for (var f = c.length - 1; 0 <= f; f--) {
                var g = b.i = c[f];
                e = cj(g, d, !0, b) && e
            }
        g = b.i = a;
        e = cj(g, d, !0, b) && e;
        e = cj(g, d, !1, b) && e;
        if (c)
            for (f = 0; f < c.length; f++)
                g = b.i = c[f],
                e = cj(g, d, !1, b) && e
    }
    aj.prototype.ub = function() {
        aj.Qb.ub.call(this);
        this.removeAllListeners();
        this.Da = null
    }
    ;
    function Si(a, b, c, d, e) {
        return a.j.add(String(b), c, !1, d, e)
    }
    aj.prototype.removeAllListeners = function(a) {
        if (this.j) {
            var b = this.j;
            a = a && a.toString();
            var c = 0, d;
            for (d in b.g)
                if (!a || d == a) {
                    for (var e = b.g[d], f = 0; f < e.length; f++)
                        ++c,
                        Ii(e[f]);
                    delete b.g[d];
                    b.i--
                }
            b = c
        } else
            b = 0;
        return b
    }
    ;
    function cj(a, b, c, d) {
        b = a.j.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Zc && g.capture == c) {
                var h = g.listener
                  , k = g.Bd || g.src;
                g.yd && Li(a.j, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && !d.defaultPrevented
    }
    ;function dj() {}
    dj.prototype.g = null;
    dj.prototype.getOptions = function() {
        var a;
        (a = this.g) || (a = {},
        ej(this) && (a[0] = !0,
        a[1] = !0),
        a = this.g = a);
        return a
    }
    ;
    var fj;
    function gj() {}
    sa(gj, dj);
    function hj(a) {
        return (a = ej(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
    function ej(a) {
        if (!a.i && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            const b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (let c = 0; c < b.length; c++) {
                const d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.i = d
                } catch (e) {}
            }
            throw Error("C");
        }
        return a.i
    }
    fj = new gj;
    function ij(a, b) {
        a.o(b);
        100 > a.i && (a.i++,
        b.next = a.g,
        a.g = b)
    }
    class jj {
        constructor(a, b) {
            this.j = a;
            this.o = b;
            this.i = 0;
            this.g = null
        }
        get() {
            let a;
            0 < this.i ? (this.i--,
            a = this.g,
            this.g = a.next,
            a.next = null) : a = this.j();
            return a
        }
    }
    ;function kj(a, b, c) {
        return Math.min(Math.max(a, b), c)
    }
    function lj(a, b, c) {
        return a + c * (b - a)
    }
    ;function Q(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }
    r = Q.prototype;
    r.clone = function() {
        return new Q(this.x,this.y)
    }
    ;
    r.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    r.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    r.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    r.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    }
    ;
    function mj(a, b) {
        this.width = a;
        this.height = b
    }
    r = mj.prototype;
    r.clone = function() {
        return new mj(this.width,this.height)
    }
    ;
    r.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    r.isEmpty = function() {
        return !(this.width * this.height)
    }
    ;
    r.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    r.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    r.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    r.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    }
    ;
    function nj(a, b) {
        ze(b, function(c, d) {
            c && "object" == typeof c && c.Hc && (c = c.Gc());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : oj.hasOwnProperty(d) ? a.setAttribute(oj[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }
    var oj = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    function pj(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }
    function qj(a) {
        this.g = a || A.document || document
    }
    qj.prototype.removeChildren = function(a) {
        for (var b; b = a.firstChild; )
            a.removeChild(b)
    }
    ;
    qj.prototype.Na = function() {
        if (!a)
            return null;
        if (a.firstChild)
            return a.firstChild;
        for (; a && !a.nextSibling; )
            var a = a.parentNode;
        return a ? a.nextSibling : null
    }
    ;
    qj.prototype.contains = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
    ;
    var rj;
    function sj() {
        var a = A.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !Wa("Presto") && (a = function() {
            var e = pj(document, "IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random()
              , h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = oa(function(k) {
                if (("*" == h || k.origin == h) && k.data == g)
                    this.port1.onmessage()
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    f.postMessage(g, h)
                }
            }
        }
        );
        if ("undefined" !== typeof a && !Ya()) {
            var b = new a
              , c = {}
              , d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.cb;
                    c.cb = null;
                    e()
                }
            }
            ;
            return function(e) {
                d.next = {
                    cb: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            A.setTimeout(e, 0)
        }
    }
    ;function tj() {
        var a = uj;
        let b = null;
        a.g && (b = a.g,
        a.g = a.g.next,
        a.g || (a.i = null),
        b.next = null);
        return b
    }
    class vj {
        constructor() {
            this.i = this.g = null
        }
        add(a, b) {
            const c = wj.get();
            c.set(a, b);
            this.i ? this.i.next = c : this.g = c;
            this.i = c
        }
    }
    var wj = new jj( () => new xj,a => a.reset());
    class xj {
        constructor() {
            this.next = this.g = this.i = null
        }
        set(a, b) {
            this.i = a;
            this.g = b;
            this.next = null
        }
        reset() {
            this.next = this.g = this.i = null
        }
    }
    ;let yj, zj = !1, uj = new vj, Bj = (a, b) => {
        yj || Aj();
        zj || (yj(),
        zj = !0);
        uj.add(a, b)
    }
    , Aj = () => {
        if (A.Promise && A.Promise.resolve) {
            const a = A.Promise.resolve(void 0);
            yj = () => {
                a.then(Cj)
            }
        } else
            yj = () => {
                var a = Cj;
                "function" !== typeof A.setImmediate || A.Window && A.Window.prototype && (Xa() || !Wa("Edge")) && A.Window.prototype.setImmediate == A.setImmediate ? (rj || (rj = sj()),
                rj(a)) : A.setImmediate(a)
            }
    }
    ;
    var Cj = () => {
        let a;
        for (; a = tj(); ) {
            try {
                a.i.call(a.g)
            } catch (b) {
                Ea(b)
            }
            ij(wj, a)
        }
        zj = !1
    }
    ;
    function Dj(a) {
        if (!a)
            return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    }
    ;function Ej(a) {
        this.g = 0;
        this.H = void 0;
        this.o = this.i = this.j = null;
        this.u = this.v = !1;
        if (a != ye)
            try {
                var b = this;
                a.call(void 0, function(c) {
                    Fj(b, 2, c)
                }, function(c) {
                    Fj(b, 3, c)
                })
            } catch (c) {
                Fj(this, 3, c)
            }
    }
    function Gj() {
        this.next = this.context = this.i = this.j = this.g = null;
        this.o = !1
    }
    Gj.prototype.reset = function() {
        this.context = this.i = this.j = this.g = null;
        this.o = !1
    }
    ;
    var Hj = new jj(function() {
        return new Gj
    }
    ,function(a) {
        a.reset()
    }
    );
    function Ij(a, b, c) {
        var d = Hj.get();
        d.j = a;
        d.i = b;
        d.context = c;
        return d
    }
    Ej.prototype.then = function(a, b, c) {
        return Jj(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    }
    ;
    Ej.prototype.$goog_Thenable = !0;
    Ej.prototype.cancel = function(a) {
        if (0 == this.g) {
            var b = new Kj(a);
            Bj(function() {
                Lj(this, b)
            }, this)
        }
    }
    ;
    function Lj(a, b) {
        if (0 == a.g)
            if (a.j) {
                var c = a.j;
                if (c.i) {
                    for (var d = 0, e = null, f = null, g = c.i; g && (g.o || (d++,
                    g.g == a && (e = g),
                    !(e && 1 < d))); g = g.next)
                        e || (f = g);
                    e && (0 == c.g && 1 == d ? Lj(c, b) : (f ? (d = f,
                    d.next == c.o && (c.o = d),
                    d.next = d.next.next) : Mj(c),
                    Nj(c, e, 3, b)))
                }
                a.j = null
            } else
                Fj(a, 3, b)
    }
    function Oj(a, b) {
        a.i || 2 != a.g && 3 != a.g || Pj(a);
        a.o ? a.o.next = b : a.i = b;
        a.o = b
    }
    function Jj(a, b, c, d) {
        var e = Ij(null, null, null);
        e.g = new Ej(function(f, g) {
            e.j = b ? function(h) {
                try {
                    var k = b.call(d, h);
                    f(k)
                } catch (l) {
                    g(l)
                }
            }
            : f;
            e.i = c ? function(h) {
                try {
                    var k = c.call(d, h);
                    void 0 === k && h instanceof Kj ? g(h) : f(k)
                } catch (l) {
                    g(l)
                }
            }
            : g
        }
        );
        e.g.j = a;
        Oj(a, e);
        return e.g
    }
    Ej.prototype.V = function(a) {
        this.g = 0;
        Fj(this, 2, a)
    }
    ;
    Ej.prototype.oa = function(a) {
        this.g = 0;
        Fj(this, 3, a)
    }
    ;
    function Fj(a, b, c) {
        if (0 == a.g) {
            a === c && (b = 3,
            c = new TypeError("D"));
            a.g = 1;
            a: {
                var d = c
                  , e = a.V
                  , f = a.oa;
                if (d instanceof Ej) {
                    Oj(d, Ij(e || ye, f || null, a));
                    var g = !0
                } else if (Dj(d))
                    d.then(e, f, a),
                    g = !0;
                else {
                    if (la(d))
                        try {
                            var h = d.then;
                            if ("function" === typeof h) {
                                Qj(d, h, e, f, a);
                                g = !0;
                                break a
                            }
                        } catch (k) {
                            f.call(a, k);
                            g = !0;
                            break a
                        }
                    g = !1
                }
            }
            g || (a.H = c,
            a.g = b,
            a.j = null,
            Pj(a),
            3 != b || c instanceof Kj || Rj(a, c))
        }
    }
    function Qj(a, b, c, d, e) {
        function f(k) {
            h || (h = !0,
            d.call(e, k))
        }
        function g(k) {
            h || (h = !0,
            c.call(e, k))
        }
        var h = !1;
        try {
            b.call(a, g, f)
        } catch (k) {
            f(k)
        }
    }
    function Pj(a) {
        a.v || (a.v = !0,
        Bj(a.O, a))
    }
    function Mj(a) {
        var b = null;
        a.i && (b = a.i,
        a.i = b.next,
        b.next = null);
        a.i || (a.o = null);
        return b
    }
    Ej.prototype.O = function() {
        for (var a; a = Mj(this); )
            Nj(this, a, this.g, this.H);
        this.v = !1
    }
    ;
    function Nj(a, b, c, d) {
        if (3 == c && b.i && !b.o)
            for (; a && a.u; a = a.j)
                a.u = !1;
        if (b.g)
            b.g.j = null,
            Sj(b, c, d);
        else
            try {
                b.o ? b.j.call(b.context) : Sj(b, c, d)
            } catch (e) {
                Tj.call(null, e)
            }
        ij(Hj, b)
    }
    function Sj(a, b, c) {
        2 == b ? a.j.call(a.context, c) : a.i && a.i.call(a.context, c)
    }
    function Rj(a, b) {
        a.u = !0;
        Bj(function() {
            a.u && Tj.call(null, b)
        })
    }
    var Tj = Ea;
    function Kj(a) {
        ua.call(this, a)
    }
    sa(Kj, ua);
    Kj.prototype.name = "cancel";
    function Uj(a, b, c) {
        if ("function" === typeof a)
            c && (a = oa(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = oa(a.handleEvent, a);
        else
            throw Error("E");
        return 2147483647 < Number(b) ? -1 : A.setTimeout(a, b || 0)
    }
    ;function Vj(a) {
        aj.call(this);
        this.headers = new Map;
        this.O = a || null;
        this.i = !1;
        this.H = this.g = null;
        this.Ba = "";
        this.o = this.wa = this.u = this.V = !1;
        this.Ka = 0;
        this.v = null;
        this.Ja = "";
        this.Wa = this.Oa = !1
    }
    sa(Vj, aj);
    var Wj = /^https?$/i
      , Xj = ["POST", "PUT"];
    function Yj(a, b) {
        if (a.g)
            throw Error("F`" + a.Ba + "`" + b);
        a.Ba = b;
        a.V = !1;
        a.i = !0;
        a.g = a.O ? hj(a.O) : hj(fj);
        a.H = a.O ? a.O.getOptions() : fj.getOptions();
        a.g.onreadystatechange = oa(a.Xe, a);
        try {
            a.wa = !0,
            a.g.open("GET", String(b), !0),
            a.wa = !1
        } catch (e) {
            Zj(a);
            return
        }
        b = new Map(a.headers);
        const c = Array.from(b.keys()).find(e => "content-type" == e.toLowerCase())
          , d = A.FormData && !1;
        !(0 <= $a(Xj, "GET")) || c || d || b.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        for (const [e,f] of b)
            a.g.setRequestHeader(e, f);
        a.Ja && (a.g.responseType = a.Ja);
        "withCredentials"in a.g && a.g.withCredentials !== a.Oa && (a.g.withCredentials = a.Oa);
        try {
            ak(a),
            0 < a.Ka && (a.Wa = bk(a.g),
            a.Wa ? (a.g.timeout = a.Ka,
            a.g.ontimeout = oa(a.nd, a)) : a.v = Uj(a.nd, a.Ka, a)),
            a.u = !0,
            a.g.send(""),
            a.u = !1
        } catch (e) {
            Zj(a)
        }
    }
    function bk(a) {
        return db && "number" === typeof a.timeout && void 0 !== a.ontimeout
    }
    r = Vj.prototype;
    r.nd = function() {
        "undefined" != typeof ha && this.g && (bj(this, "timeout"),
        this.abort(8))
    }
    ;
    function Zj(a) {
        a.i = !1;
        a.g && (a.o = !0,
        a.g.abort(),
        a.o = !1);
        ck(a);
        dk(a)
    }
    function ck(a) {
        a.V || (a.V = !0,
        bj(a, "complete"),
        bj(a, "error"))
    }
    r.abort = function() {
        this.g && this.i && (this.i = !1,
        this.o = !0,
        this.g.abort(),
        this.o = !1,
        bj(this, "complete"),
        bj(this, "abort"),
        dk(this))
    }
    ;
    r.ub = function() {
        this.g && (this.i && (this.i = !1,
        this.o = !0,
        this.g.abort(),
        this.o = !1),
        dk(this, !0));
        Vj.Qb.ub.call(this)
    }
    ;
    r.Xe = function() {
        this.ya || (this.wa || this.u || this.o ? ek(this) : this.Rf())
    }
    ;
    r.Rf = function() {
        ek(this)
    }
    ;
    function ek(a) {
        if (a.i && "undefined" != typeof ha && (!a.H[1] || 4 != (a.g ? a.g.readyState : 0) || 2 != fk(a)))
            if (a.u && 4 == (a.g ? a.g.readyState : 0))
                Uj(a.Xe, 0, a);
            else if (bj(a, "readystatechange"),
            4 == (a.g ? a.g.readyState : 0)) {
                a.i = !1;
                try {
                    const f = fk(a);
                    a: switch (f) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var b = !0;
                        break a;
                    default:
                        b = !1
                    }
                    var c;
                    if (!(c = b)) {
                        var d;
                        if (d = 0 === f) {
                            var e = String(a.Ba).match(pf)[1] || null;
                            !e && A.self && A.self.location && (e = A.self.location.protocol.slice(0, -1));
                            d = !Wj.test(e ? e.toLowerCase() : "")
                        }
                        c = d
                    }
                    c ? (bj(a, "complete"),
                    bj(a, "success")) : ck(a)
                } finally {
                    dk(a)
                }
            }
    }
    function dk(a, b) {
        if (a.g) {
            ak(a);
            const c = a.g
              , d = a.H[0] ? () => {}
            : null;
            a.g = null;
            a.H = null;
            b || bj(a, "ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
    function ak(a) {
        a.g && a.Wa && (a.g.ontimeout = null);
        a.v && (A.clearTimeout(a.v),
        a.v = null)
    }
    r.isActive = function() {
        return !!this.g
    }
    ;
    function fk(a) {
        try {
            return 2 < (a.g ? a.g.readyState : 0) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    }
    ;function gk(a) {
        if (a.g && "running" == a.g.state && !a.H) {
            a.H = !0;
            for (let b = 0; b < a.O.length; b++)
                a.O[b]()
        }
    }
    function hk(a) {
        a.g && (null == a.i ? ik(a) : void 0 === a.i.playbackState ? ik(a) : a.i.playbackState !== a.i.PLAYING_STATE && a.i.playbackState !== a.i.FINISHED_STATE && ik(a))
    }
    function jk(a) {
        var b = kk.Ua();
        if (lk && !b.g) {
            b.g = new (window.AudioContext || window.webkitAudioContext);
            b.v = b.g.createGain();
            b.v.connect(b.g.destination);
            for (let c in b.o)
                b.o[c].i = b.g;
            for (let c in b.j)
                mk(b.j[c], b.g, b.v);
            b.g.onstatechange = () => {
                gk(b)
            }
            ;
            gk(b);
            hk(b);
            Qi(a, "click pointerup mousedown mouseup touchstart touchend".split(" "), () => {
                b.g && (b.g.resume(),
                hk(b))
            }
            , !0)
        }
    }
    function ik(a) {
        if (a.g) {
            a.i = a.g.createBufferSource();
            var b = a.g.createBuffer(1, 1, 22050);
            a.i.buffer = b;
            a.i.connect(a.g.destination);
            a.i.start(0);
            for (const c of a.V)
                c()
        }
    }
    function nk() {
        var a = ok;
        !a.u && a.g && a.g.suspend();
        a.u = !0
    }
    class pk {
        constructor() {
            var a = R;
            this.o = S;
            this.j = a;
            this.g = null;
            this.V = [];
            this.v = null;
            this.H = this.u = !1;
            this.O = [];
            this.i = null
        }
        getContext() {
            return this.g
        }
        destroy() {
            this.g && (this.g.close(),
            this.g = null)
        }
        reset() {
            for (let a in this.o)
                this.o[a].o = [];
            for (let a in this.j)
                this.j[a].stop()
        }
        isMuted() {
            return !1
        }
    }
    var lk = !(!window.AudioContext && !window.webkitAudioContext) && !!window.GainNode;
    function mk(a, b, c) {
        a.g = b;
        a.u = c
    }
    function qk(a) {
        if (a.g)
            for (const c in a.j) {
                var b = a.j[c];
                !b.Jf && null !== a.g && 1E3 * a.g.currentTime > b.Ze + a.v && delete a.j[c]
            }
    }
    function rk(a) {
        !a.i && a.g && a.g.createGain && (a.i = a.g.createGain())
    }
    function sk(a, b) {
        rk(a);
        a.i && a.g && a.i.gain.setValueAtTime(b, a.g.currentTime)
    }
    var tk = class {
        constructor(a, b, c, d) {
            this.H = a;
            this.O = b;
            this.v = c;
            this.V = d;
            this.j = {};
            this.o = this.u = this.g = this.i = null;
            this.oa = 0
        }
        clone() {
            const a = new tk(this.H,this.O,this.v,this.V);
            mk(a, this.g, this.u);
            return a
        }
        getContext() {
            return this.g
        }
        play(a=0, b=!1, c=0, d, e=0, f) {
            if (!this.g || !this.u)
                return -1;
            qk(this);
            f = void 0 === f ? this.g.currentTime + a / 1E3 : f;
            d || (d = this.g.createBufferSource(),
            d.playbackRate.setValueAtTime(1, this.g.currentTime));
            rk(this);
            this.o && d.connect(this.o);
            this.i ? (this.o ? this.o.connect(this.i) : d.connect(this.i),
            this.i.connect(this.u)) : this.o ? this.o.connect(this.u) : d.connect(this.u);
            this.o = null;
            d.loop = b;
            try {
                d.buffer = this.H.buffer
            } catch (h) {
                return -1
            }
            a = this.O / 1E3;
            const g = this.v / 1E3 / d.playbackRate.value;
            b ? (d.loopStart = a + (e ? e / 1E3 : c / 1E3),
            d.loopEnd = a + g,
            d.start(f, a + c / 1E3)) : d.start(f, a + c / 1E3, g);
            e = this.oa++;
            this.j[e] = {
                node: d,
                Ze: 1E3 * f - c,
                Jf: b
            };
            return e
        }
        setPlaybackRate(a, b) {
            qk(this);
            if (void 0 !== b) {
                if (this.j[b])
                    try {
                        this.j[b].node.playbackRate.value = a
                    } catch (c) {}
            } else
                for (let c in this.j)
                    this.setPlaybackRate(a, c)
        }
        stop(a) {
            qk(this);
            if (void 0 !== a && this.g) {
                if (this.j[a]) {
                    try {
                        this.j[a].node.stop(0)
                    } catch (c) {}
                    var b = (1E3 * this.g.currentTime - this.j[a].Ze) % this.v;
                    delete this.j[a];
                    return [b]
                }
                return []
            }
            a = [];
            for (b in this.j)
                a = a.concat(this.stop(b));
            return a
        }
    }
    ;
    const uk = document.createElement("audio");
    var vk = "function" === typeof uk.canPlayType && "" != uk.canPlayType("audio/mpeg") ? ".mp3" : ".ogg"
      , wk = class extends bh {
        constructor(a) {
            super("/archive/tggd/2021/v81123/" + a + vk);
            this.i = this.buffer = null;
            this.u = 0
        }
        preload(a, b) {
            const c = new Promise(e => {
                ah(this, e)
            }
            );
            a && ah(this, a);
            if (0 != this.u)
                return Promise.resolve();
            if (!this.i)
                return Promise.reject(Error("H"));
            const d = new XMLHttpRequest;
            d.open("GET", this.j, !0);
            d.responseType = "arraybuffer";
            d.onload = () => {
                const e = f => {
                    f && (this.buffer = f,
                    this.u = 3,
                    $g(this))
                }
                ;
                this.i && this.i.decodeAudioData(d.response, e);
                this.u = 2
            }
            ;
            b && (d.onprogress = e => {
                e.lengthComputable && b && b(e.loaded / e.total)
            }
            );
            d.send();
            this.u = 1;
            return c
        }
    }
    ;
    class kk extends pk {
    }
    var S = {};
    S.Rb = new wk("sfx");
    S.wd = new wk("tutorial");
    S.vd = new wk("lobby");
    S.Qd = new wk("outside");
    S.rd = new wk("hurry_up");
    S.Oc = new wk("postgame");
    var R = {};
    R.lf = new tk(S.Rb,0,1541.156005859375,.1589999943971634);
    R.mf = new tk(S.Rb,2541.156005859375,1810.4310302734375,.11299999803304672);
    R.nf = new tk(S.Rb,5351.5869140625,559.7730102539062,.2720000147819519);
    R.rd = new tk(S.rd,0,26250,0);
    R.rf = new tk(S.Rb,6911.36083984375,11390.8388671875,51.74599838256836);
    R.vd = new tk(S.vd,0,17142.853515625,0);
    R.tf = new tk(S.Oc,0,16666.66796875,0);
    R.uf = new tk(S.Oc,17666.66796875,5454.5419921875,0);
    R.Qd = new tk(S.Qd,0,38540.14453125,0);
    R.Rd = new tk(S.Rb,19302.19921875,1316.009033203125,.9300000071525574);
    R.vf = new tk(S.Rb,21618.208984375,1156.43994140625,25.19300079345703);
    R.Ce = new tk(S.Rb,23774.6484375,3412.2900390625,.6579999923706055);
    R.wf = new tk(S.Rb,28186.939453125,1699.2969970703125,2.8570001125335693);
    R.xf = new tk(S.Rb,30886.236328125,1830.4539794921875,.9520000219345093);
    R.yf = new tk(S.Rb,33716.6875,1841.905029296875,.8389999866485596);
    R.zf = new tk(S.Rb,36558.59375,4530.68017578125,1.7910000085830688);
    R.wd = new tk(S.wd,0,40615.375,0);
    R.Af = new tk(S.Oc,24121.20703125,16E3,0);
    R.Bf = new tk(S.Oc,41121.20703125,5818.18701171875,0);
    ja(kk);
    var xk = "en af am ar az be bg bn bs ca cs da de el en-GB-uk es es-419 et eu fa fi fr fr-ca gl gu hi hr hu hy id is it iw ja ka kk km kn ko ky lo lt lv mk ml mn mr ms my ne nl no pa pl pt-BR pt-PT ro ru si-lk sk sl sq sr sv sw ta te th tr uk ur uz vi zh-CN zh-HK zh-TW zu crs".split(" ");
    var yk = () => {
        if (Vf())
            throw Error("I");
        return Wf() || !!document.getElementById("fkbx") || Tf() || Sf()
    }
      , zk = () => Vf() ? "1" === Mf.g.get("ccta") : Uf() && !(document.getElementById("fkbx") || Tf()) || Sf() && Qf() && !Wf()
      , Ak = () => {
        const a = !Qf() && Wf() && 600 >= window.innerHeight;
        return !Xf && (Wf() || a) && !Sf()
    }
    ;
    const Bk = [5, 6, 7, 8, 9, 11, 12, 16, 18];
    let Ck = 0
      , Dk = 0
      , Ek = !1
      , Fk = {}
      , Gk = [];
    var Hk = a => {
        var b = Date.now();
        Fk.dt = b - Dk;
        Dk = b;
        0 == a && (Ck = b);
        Fk.e = a;
        Fk.t = 0 == Ck ? -1 : Math.floor(b - Ck);
        Fk.l = "sdoodles" === document.documentElement.id ? 0 : 1;
        b = [];
        for (var c in Fk)
            Fk.hasOwnProperty(c) && b.push(c + ":" + Fk[c]);
        c = b.join(",");
        b = 10 == a;
        var d = 0 <= Bk.indexOf(a);
        (document.getElementById("fkbx") || Tf()) && (c += "&ntp=1");
        b ? (b = Qg()) && (c += `&ved=${b}`) : d && (Ng || ((b = document.getElementById("hplogoshareved")) ? Ng = b.getAttribute("data-ved") : Vf() && Kf(Mf.g, "sved") && (Ng = Mf.g.get("sved"))),
        (b = Ng) && (c += `&ved=${b}`));
        -1 == c.search("&ei=") && (c += "&ei=",
        (b = Pg()) && (c += b));
        for (window.google && window.google.log ? window.google.log("doodle", c) : $f(c); 0 < Gk.length; )
            delete Fk[Gk.pop()];
        Ek || 0 != a || zk() || (Ek = !0,
        Hk(10))
    }
    ;
    var Kk = () => {
        var a = Hg() || !1;
        Dk = Date.now();
        Fk.d = Fg;
        !Ek && zk() && (Ek = !0,
        Hk(10));
        a && Ik("d1", 1);
        Jk(1)
    }
      , Jk = a => {
        Fk.c = a;
        Hk(1);
        switch (a) {
        case 12:
            Hk(0);
            break;
        case 16:
            Hk(2)
        }
    }
    ;
    const Lk = (new Map).set(PIXI.RENDERER_TYPE.UNKNOWN, "UNKNOWN").set(PIXI.RENDERER_TYPE.WEBGL, "WEBGL").set(PIXI.RENDERER_TYPE.CANVAS, "CANVAS")
      , Mk = (new Map).set(0, "UNDEFINED_CLIENT_TYPE").set(1, "PUBLIC").set(2, "PRIVATE_CLIENT").set(3, "PRIVATE_HOST")
      , Ik = (a, b) => {
        Fk[a] = b;
        switch (a) {
        case "d2":
            Lk.get(b);
            break;
        case "d3":
            Mk.get(b)
        }
    }
    ;
    var Nk = a => {
        void 0 === a ? delete Fk.d4 : Ik("d4", a)
    }
    ;
    var Ok = a => a.split("").reduce( (b, c) => (b << 5) - b + c.charCodeAt(0) | 0, 0);
    var Qk = a => {
        var b = [Yg];
        let c, d;
        new Promise( (e, f) => {
            c = e;
            d = f
        }
        );
        if (window.WebFontConfig && b)
            for (const e of b)
                Pk(e) && a && a(e, "");
        else
            ra("WebFontConfig.active", c),
            ra("WebFontConfig.inactive", d),
            ra("WebFontConfig.timeout", 6E4),
            ra("WebFontConfig.google.families", b),
            a && ra("WebFontConfig.fontactive", a),
            a = pj(document, "SCRIPT"),
            ig(a, og`//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`),
            a.type = "text/javascript",
            a.async = !0,
            (document.getElementById("xjsc") || document.body).appendChild(a)
    }
      , Pk = a => {
        a = a.toLowerCase().replace(/ /g, "");
        const b = document.documentElement.classList;
        for (const c of b.values())
            if (c.search(`wf-${a}-w+-active`))
                return !0;
        return !1
    }
    ;
    var Rk = {
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
        ch: ["de", "en", "fr", "it"],
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
        lk: ["en", "si", "ta"],
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
        pa: ["es-419", "en", "es"],
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
        tj: ["tg", "ru"],
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
    let Sk = null;
    function Tk() {
        Sk || (Sk = new Uk);
        return Sk
    }
    function Vk(a, b, c, d) {
        const e = `${b}-${c}`;
        if (d.includes(e))
            return a.hl = b,
            e;
        if (b && d.includes(b))
            return a.hl = b;
        if (c && Rk[c])
            for (const f of Rk[c])
                if (d.includes(f))
                    return a.hl = f,
                    a.hl;
        return d.includes("en") ? (a.hl = "en",
        a.hl) : a.hl = null
    }
    function T(a) {
        var b = Wk;
        if (!b.g)
            throw Error("J");
        a = void 0 === b.g[a] ? "" : b.g[a];
        let c = b = 0
          , d = !1;
        const e = a.split(dg);
        for (let f = 0; f < e.length; f++) {
            const g = e[f];
            bg.test(g) ? (b++,
            c++) : cg.test(g) ? d = !0 : ag.test(g) ? c++ : eg.test(g) && (d = !0)
        }
        b = 0 == c ? d ? 1 : 0 : .4 < b / c ? -1 : 1;
        return 1 === b ? "\u202a" + a + "\u202c" : -1 === b ? "\u202b" + a + "\u202c" : a
    }
    var Uk = class {
        constructor() {
            this.hl = null
        }
        load(a, b, c, d) {
            a = Vk(this, a, b, c);
            if (null == a)
                return Promise.resolve();
            const e = `${d}messages.${a}.nocache.json`
              , f = new Vj;
            f.Ja = "text";
            return new Promise( (g, h) => {
                Si(f, "success", () => {
                    try {
                        var k = f.g ? f.g.responseText : ""
                    } catch (l) {
                        k = ""
                    }
                    this.g = JSON.parse(k.substring(5));
                    g()
                }
                );
                Si(f, "error", h);
                Yj(f, e)
            }
            )
        }
    }
    ;
    function Xk(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }
    r = Xk.prototype;
    r.clone = function() {
        return new Xk(this.left,this.top,this.width,this.height)
    }
    ;
    r.contains = function(a) {
        return a instanceof Q ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    r.getSize = function() {
        return new mj(this.width,this.height)
    }
    ;
    r.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    r.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    r.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    r.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    }
    ;
    function Yk() {}
    ;/*

 Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: MIT
*/
    function Zk(a, b) {
        this.u = [];
        this.wa = a;
        this.ya = b || null;
        this.o = this.j = !1;
        this.i = void 0;
        this.V = this.Ba = this.H = !1;
        this.v = 0;
        this.g = null;
        this.O = 0
    }
    sa(Zk, Yk);
    Zk.prototype.cancel = function(a) {
        if (this.j)
            this.i instanceof Zk && this.i.cancel();
        else {
            if (this.g) {
                const b = this.g;
                delete this.g;
                a ? b.cancel(a) : (b.O--,
                0 >= b.O && b.cancel())
            }
            this.wa ? this.wa.call(this.ya, this) : this.V = !0;
            this.j || (a = new $k(this),
            al(this),
            bl(this, !1, a))
        }
    }
    ;
    Zk.prototype.oa = function(a, b) {
        this.H = !1;
        bl(this, a, b)
    }
    ;
    function bl(a, b, c) {
        a.j = !0;
        a.i = c;
        a.o = !b;
        cl(a)
    }
    function al(a) {
        if (a.j) {
            if (!a.V)
                throw new dl(a);
            a.V = !1
        }
    }
    function el(a, b, c, d) {
        a.u.push([b, c, d]);
        a.j && cl(a)
    }
    Zk.prototype.then = function(a, b, c) {
        let d, e;
        const f = new Ej(function(g, h) {
            e = g;
            d = h
        }
        );
        el(this, e, function(g) {
            g instanceof $k ? f.cancel() : d(g);
            return fl
        }, this);
        return f.then(a, b, c)
    }
    ;
    Zk.prototype.$goog_Thenable = !0;
    function gl(a) {
        return ab(a.u, function(b) {
            return "function" === typeof b[1]
        })
    }
    var fl = {};
    function cl(a) {
        if (a.v && a.j && gl(a)) {
            var b = a.v
              , c = hl[b];
            c && (A.clearTimeout(c.g),
            delete hl[b]);
            a.v = 0
        }
        a.g && (a.g.O--,
        delete a.g);
        b = a.i;
        for (var d = c = !1; a.u.length && !a.H; ) {
            var e = a.u.shift()
              , f = e[0];
            const h = e[1];
            e = e[2];
            if (f = a.o ? h : f)
                try {
                    var g = f.call(e || a.ya, b);
                    g === fl && (g = void 0);
                    void 0 !== g && (a.o = a.o && (g == b || g instanceof Error),
                    a.i = b = g);
                    if (Dj(b) || "function" === typeof A.Promise && b instanceof A.Promise)
                        d = !0,
                        a.H = !0
                } catch (k) {
                    b = k,
                    a.o = !0,
                    gl(a) || (c = !0)
                }
        }
        a.i = b;
        d && (g = oa(a.oa, a, !0),
        d = oa(a.oa, a, !1),
        b instanceof Zk ? (el(b, g, d),
        b.Ba = !0) : b.then(g, d));
        c && (b = new il(b),
        hl[b.g] = b,
        a.v = b.g)
    }
    function dl() {
        ua.call(this)
    }
    sa(dl, ua);
    dl.prototype.message = "Deferred has already fired";
    dl.prototype.name = "AlreadyCalledError";
    function $k() {
        ua.call(this)
    }
    sa($k, ua);
    $k.prototype.message = "Deferred was canceled";
    $k.prototype.name = "CanceledError";
    function il(a) {
        this.g = A.setTimeout(oa(this.j, this), 0);
        this.i = a
    }
    il.prototype.j = function() {
        delete hl[this.g];
        throw this.i;
    }
    ;
    var hl = {};
    function jl() {
        var a = kl;
        const b = {}
          , c = b.document || document
          , d = Ke(a).toString()
          , e = pj((new qj(c)).g, "SCRIPT");
        var f = {
            hf: e,
            nd: void 0
        };
        const g = new Zk(ll,f);
        let h = null;
        const k = null != b.timeout ? b.timeout : 5E3;
        0 < k && (h = window.setTimeout(function() {
            ml(e, !0);
            var l = new nl(1,"Timeout reached for loading script " + d);
            al(g);
            bl(g, !1, l)
        }, k),
        f.nd = h);
        e.onload = e.onreadystatechange = function() {
            e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (ml(e, b.Lg || !1, h),
            al(g),
            bl(g, !0, null))
        }
        ;
        e.onerror = function() {
            ml(e, !0, h);
            var l = new nl(0,"Error while loading script " + d);
            al(g);
            bl(g, !1, l)
        }
        ;
        f = b.attributes || {};
        Be(f, {
            type: "text/javascript",
            charset: "UTF-8"
        });
        nj(e, f);
        mf(e, a);
        ol(c).appendChild(e);
        return g
    }
    function ol(a) {
        const b = (a || document).getElementsByTagName("HEAD");
        return b && 0 !== b.length ? b[0] : a.documentElement
    }
    function ll() {
        if (this && this.hf) {
            const a = this.hf;
            a && "SCRIPT" == a.tagName && ml(a, !0, this.nd)
        }
    }
    function ml(a, b, c) {
        null != c && A.clearTimeout(c);
        a.onload = () => {}
        ;
        a.onerror = () => {}
        ;
        a.onreadystatechange = () => {}
        ;
        b && window.setTimeout(function() {
            a && a.parentNode && a.parentNode.removeChild(a)
        }, 0)
    }
    function nl(a, b) {
        let c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        ua.call(this, c);
        this.code = a
    }
    sa(nl, ua);
    const Wk = Tk()
      , gh = lh.Ua();
    var pl = a => `${"/archive/tggd/2021/v81123/"}${a}`.toLowerCase();
    let ql = null;
    const kl = og`https://www.gstatic.com/external_hosted/pixi_v5/pixi-legacy.min.js`
      , rl = () => new Promise(a => {
        var b = jl();
        el(b, a, null)
    }
    );
    var sl = () => {
        const a = [];
        a.push(rl());
        a.push(new Promise(b => {
            fh([7], b)
        }
        ));
        a.push(new Promise(b => {
            Qk( () => {
                b()
            }
            )
        }
        ));
        a.push(Tk().load(Ig, Jg, xk, "/archive/tggd/2021/v81123/"));
        return Promise.all(a)
    }
      , ul = () => {
        const a = [];
        a.push(new Promise(c => {
            gh.preload(3, c)
        }
        ));
        const b = [S.Rb, S.wd];
        for (const c of b)
            a.push(new Promise(d => {
                c.preload(d)
            }
            ));
        a.push(tl("tutorial-map.json").then(c => {
            ql = c
        }
        ));
        return Promise.all(a)
    }
      , vl = () => {
        const a = [];
        a.push(new Promise(b => {
            fh([0, 1, 2, 4, 5, L ? 8 : 6], b)
        }
        ));
        a.push(new Promise(b => {
            S.vd.preload(b)
        }
        ));
        return Promise.all(a)
    }
    ;
    function tl(a, b) {
        return u(function*() {
            const c = pl(a);
            try {
                return yield wl(c, b)
            } catch (d) {
                return Hk(114),
                Promise.reject(d)
            }
        })
    }
    const wl = (a, b) => new Promise( (c, d) => {
        const e = new XMLHttpRequest;
        e.addEventListener("load", () => {
            try {
                if (200 !== e.status)
                    d(`${e.status}: ${a}`);
                else {
                    var f = JSON.parse(e.responseText);
                    if (void 0 !== b) {
                        const g = Ok(JSON.stringify(f));
                        g !== b && (Hk(115),
                        d(`Hash mismatch: expected: ${b} actual: ${g}`))
                    }
                    c(f)
                }
            } catch (g) {
                d(g)
            }
        }
        );
        e.addEventListener("error", f => {
            d(f)
        }
        );
        e.addEventListener("abort", f => {
            d(f)
        }
        );
        e.open("GET", a, !0);
        e.send()
    }
    );
    var xl = (a, b) => {
        a.play(0, !1);
        a.play(a.v, !0, b, void 0)
    }
      , yl = (a, b, c) => {
        const d = a[3];
        a = a[4];
        void 0 === b && (b = d);
        void 0 === c && (c = a);
        return Math.min(b / d, c / a)
    }
    ;
    const zl = new Xk(0,0,0,0);
    var Al = a => {
        const b = Math.min(a.width, a.height - Xg);
        zl.left = (a.width - b) / 2;
        zl.top = Xg;
        zl.width = b;
        zl.height = b
    }
      , Bl = (a, b) => {
        if (a) {
            const c = b ? "visible" : "hidden";
            a.classList.remove(b ? "hidden" : "visible");
            a.classList.add(c)
        }
    }
    ;
    var Dl = (a, b) => {
        if (!Cl)
            return b;
        let c;
        try {
            c = window.localStorage.getItem(a)
        } catch (d) {
            return b
        }
        return null == c ? b : JSON.parse(c)
    }
      , El = (a, b) => {
        if (Cl)
            try {
                window.localStorage.setItem(a, JSON.stringify(b))
            } catch (c) {}
    }
      , Cl = !!self.localStorage;
    var Fl = (new Map).set("MOST_SPIRITS_COLLECTED", [[2, 175, 982, 168, 142], [1, 406, 181, 168, 142], [1, 1218, 377, 168, 142]]).set("STOLE_MOST", [[2, 420, 887, 209, 184], [1, 1680, 0, 209, 184], [1, 581, 144, 209, 184]]).set("MOST_MEGA_FLAMES", [[2, 1885, 1030, 160, 165], [1, 400, 940, 160, 165], [1, 203, 955, 160, 165]]).set("COLLECT_1000_SPIRITS", [[2, 420, 706, 245, 178], [1, 333, 0, 245, 178], null]).set("COLLECT_5000_SPIRITS", [[2, 890, 963, 194, 162], [1, 203, 790, 194, 162], [1, 1421, 796, 194, 162]]).set("STEAL_250", [[2, 1087, 963, 190, 118], [1, 1618, 796, 190, 118], [1, 1811, 796, 190, 118]]).set("STEAL_1000", [[2, 668, 706, 225, 141], [1, 581, 0, 225, 141], [1, 809, 0, 225, 141]]).set("COLLECT_10_MEGA_FLAMES", [[2, 1280, 963, 174, 137], [1, 1873, 187, 174, 137], null]).set("COLLECT_30_MEGA_FLAMES", [[2, 1721, 1030, 161, 115], [1, 1015, 935, 161, 115], null]).set("WIN_5_GAMES", [[2, 420, 543, 330, 160], [1, 0, 0, 330, 160], null]).set("WIN_35_GAMES", [[2, 632, 991, 162, 179], [1, 1618, 917, 162, 179], [1, 1783, 917, 162, 179]]).set("PLAY_10_GAMES", [[2, 1457, 1052, 134, 115], [1, 1892, 0, 134, 115], null]).set("PLAY_50_GAMES", [[2, 1926, 0, 121, 145], [1, 563, 956, 121, 145], null]).set("COLLECT_150_SPIRITS_SINGLE_GAME", [[2, 1506, 878, 212, 171], [1, 1037, 0, 212, 171], [1, 1252, 0, 212, 171]]).set("COLLECT_200_SPIRITS_SINGLE_GAME", [[2, 1721, 878, 210, 149], [1, 1467, 0, 210, 149], null]).set("MOST_SPIRITS_COLLECTED_5_GAMES", [[2, 753, 543, 200, 149], [1, 1015, 783, 200, 149], null]);
    const Gl = [{
        Bb: "COLLECT_1000_SPIRITS",
        counter: "SPIRITS_COLLECTED",
        threshold: 1E3
    }, {
        Bb: "COLLECT_5000_SPIRITS",
        counter: "SPIRITS_COLLECTED",
        threshold: 5E3
    }, {
        Bb: "STEAL_250",
        counter: "STEALS",
        threshold: 250
    }, {
        Bb: "STEAL_1000",
        counter: "STEALS",
        threshold: 1E3
    }, {
        Bb: "COLLECT_10_MEGA_FLAMES",
        counter: "MEGA_FLAMES",
        threshold: 10
    }, {
        Bb: "COLLECT_30_MEGA_FLAMES",
        counter: "MEGA_FLAMES",
        threshold: 30
    }, {
        Bb: "WIN_5_GAMES",
        counter: "WINS",
        threshold: 5
    }, {
        Bb: "WIN_35_GAMES",
        counter: "WINS",
        threshold: 35
    }, {
        Bb: "PLAY_10_GAMES",
        counter: "PLAYS",
        threshold: 10
    }, {
        Bb: "PLAY_50_GAMES",
        counter: "PLAYS",
        threshold: 50
    }, {
        Bb: "COLLECT_150_SPIRITS_SINGLE_GAME",
        counter: "SPIRITS_COLLECTED_SINGLE_GAME",
        threshold: 150
    }, {
        Bb: "COLLECT_200_SPIRITS_SINGLE_GAME",
        counter: "SPIRITS_COLLECTED_SINGLE_GAME",
        threshold: 200
    }, {
        Bb: "MOST_SPIRITS_COLLECTED_5_GAMES",
        counter: "MOST_SPIRITS_COLLECTED",
        threshold: 5
    }];
    function Hl(a) {
        return Dl("H21_COUNTER_" + a, 0)
    }
    function Il() {
        for (const a of Gl)
            Hl(a.counter) >= a.threshold && !Dl("H21_" + a.Bb, !1) && El("H21_" + a.Bb, !0)
    }
    function Jl() {
        return [...Object.values(Vg)].filter(a => Dl("H21_" + a, !1) && !Dl("H21_ACK_" + a, !1))
    }
    function Kl() {
        if (0 < Jl().length)
            return Jl()[0];
        let a = Gl.filter(b => 0 < Hl(b.counter) && !Dl("H21_" + b.Bb, !1));
        0 === a.length && (a = Gl.filter(b => !Dl("H21_" + b.Bb, !1)));
        return 0 < a.length ? a[Math.floor(a.length * Math.random())].Bb : [...Object.values(Vg)][Math.floor([...Object.values(Vg)].length * Math.random())]
    }
    function Ll(a, b=1) {
        b = Hl(a) + b;
        El("H21_COUNTER_" + a, b)
    }
    function Ml(a) {
        a > Hl("SPIRITS_COLLECTED_SINGLE_GAME") && El("H21_COUNTER_SPIRITS_COLLECTED_SINGLE_GAME", a)
    }
    function Nl(a) {
        const b = Gl.filter(c => c.Bb === a)[0];
        return b ? `${Math.min(Hl(b.counter), b.threshold)}/${b.threshold}` : ""
    }
    ;var Ol = new Map([[16, 1], [1, 2], [2, 2]]);
    function Pl() {
        Ql || (Ql = new Rl);
        return Ql
    }
    function Sl(a, b, c) {
        a.left += b / a.g;
        a.top += c / a.g
    }
    function Tl(a, b, c, d=N.width / 2, e=N.height) {
        e /= a.g;
        a.left = b - d / a.g;
        a.top = c - e
    }
    function Ul(a, b) {
        const c = N.width / 2
          , d = N.height / 2
          , e = a.left + c / a.g
          , f = a.top + d / a.g;
        a.g *= b;
        a.left = e - c / a.g;
        a.top = f - d / a.g
    }
    function Vl(a, b) {
        a.g = b
    }
    function Wl(a, b) {
        a = (b - a.left) * a.g;
        return a - 0 * (N.width / 2 - a)
    }
    function Xl(a, b) {
        return (b - a.top) * a.g
    }
    var Rl = class {
        constructor() {
            this.top = this.left = 0;
            this.i = this.j = !1;
            this.g = 25;
            this.o = new Map([[73, () => {
                Ul(this, 1.5)
            }
            ], [79, () => {
                Ul(this, 1 / 1.5)
            }
            ], [65, () => {
                Sl(this, -100, 0)
            }
            ], [68, () => {
                Sl(this, 100, 0)
            }
            ], [87, () => {
                Sl(this, 0, -100)
            }
            ], [83, () => {
                Sl(this, 0, 100)
            }
            ], [81, () => {}
            ]])
        }
    }
    , Ql;
    const Yl = lh.Ua()
      , Zl = Pl();
    var am = (a, b, c, d, e=0, f=!1, g=1, h=1, k, l=Yl) => {
        b = Wl(Zl, b);
        c = Xl(Zl, c);
        $l(a, b, c, Zl.g * d, e, f, g, h, k, l)
    }
      , $l = (a, b, c, d, e=0, f=!1, g=1, h=1, k, l=Yl) => {
        O.save();
        void 0 !== k && (O.globalAlpha = k);
        O.translate(b, c);
        O.scale(g, h);
        f && O.rotate(e);
        b = a[3] / (a[5] || 1);
        c = a[4] / (a[5] || 1);
        void 0 !== d && (d /= c,
        O.scale(d, d));
        !f && 0 > Math.cos(e) && O.scale(-1, 1);
        ih(l, a, O, -(b / 2), -(c / 2));
        O.restore()
    }
      , V = (a, b, c, d, e, f) => {
        if (!a)
            return 0;
        e = yl(a, e, f);
        ih(Yl, a, b, c, d, e, !0);
        return e
    }
      , bm = (a, b, c, d) => {
        a = Wl(Zl, a);
        b = Xl(Zl, b);
        c *= Zl.g;
        d && (O.fillStyle = d);
        O.beginPath();
        O.arc(a, b, c, 0, 2 * Math.PI);
        d ? O.fill() : O.stroke()
    }
      , cm = (a, b, c, d, e, f, g) => {
        b = Wl(Zl, b);
        c = Xl(Zl, c);
        O.save();
        O.translate(b, c);
        void 0 !== f && O.rotate(f);
        void 0 !== g && O.scale(g, g);
        void 0 !== e && (O.strokeStyle = e,
        O.strokeText(a, 0, 0));
        void 0 !== d && (O.fillStyle = d,
        O.fillText(a, 0, 0));
        O.restore()
    }
      , dm = a => {
        a.save();
        a.setTransform(1, 0, 0, 1, 0, 0);
        a.fillStyle = "rgba(0,0,0,0.6)";
        a.fillRect(0, 0, a.canvas.width, a.canvas.height);
        a.restore()
    }
    ;
    var em = class {
        j() {
            return !0
        }
    }
    ;
    var fm = class extends em {
        constructor(a, b, c) {
            super();
            this.g = a;
            this.i = b;
            this.o = Math.abs(c)
        }
        moveTo(a, b) {
            this.g = a;
            this.i = b
        }
        contains(a, b) {
            return Math.sqrt((this.g - a) * (this.g - a) + (this.i - b) * (this.i - b)) <= this.o
        }
    }
    ;
    function gm(a, b, c, d, e, f, g, h="") {
        const k = a.font;
        a.font = h + " " + d + "px " + c;
        let l = hm(a, b, f);
        for (; l.length > g && d > e; )
            d = Math.max(e, 1 < d ? d - 1 : d - .1),
            a.font = h + " " + d + "px " + c,
            l = hm(a, b, f);
        for (b = 0; b < l.length; b++)
            for (; a.measureText(l[b]).width > f && d > e; )
                d = Math.max(e, 1 < d ? d - 1 : d - .1),
                a.font = h + " " + d + "px " + c;
        a.font = k;
        return {
            lines: l,
            fontFamily: c,
            fontSize: d,
            fontStyle: h
        }
    }
    function hm(a, b, c) {
        b = b.match(/[^\s-]+-?/g);
        if (!b || 1 > b.length)
            return [""];
        let d = b[0];
        const e = [];
        for (let f = 1; f < b.length; f++) {
            const g = d + ("-" == d[d.length - 1] ? "" : " ") + b[f];
            a.measureText(g).width > c ? (e.push(d),
            d = b[f]) : d = g
        }
        e.push(d);
        return e
    }
    function im(a, b, c, d, e, f) {
        const g = a.font;
        a.font = b.fontStyle + " " + b.fontSize + "px " + b.fontFamily;
        for (let h = 0; h < b.lines.length; h++)
            a.fillText(b.lines[h], c, d + h * e),
            f && a.strokeText(b.lines[h], c, d + h * e);
        a.font = g
    }
    ;lh.Ua();
    const jm = [30, 30]
      , km = new fm(jm[0],jm[1],80)
      , lm = [874, 93]
      , mm = L ? [280, M / 2] : [720, 300]
      , nm = [417, 436]
      , om = [M / 2, 27]
      , pm = L ? [100, 560] : [100, 120]
      , qm = L ? [470, 440] : [880, 470]
      , rm = new fm(qm[0],qm[1],110);
    function sm(a) {
        a = Object.values(Vg).indexOf(a);
        return [pm[0] + a % 4 * 110, pm[1] + 110 * Math.floor(a / 4)]
    }
    function tm(a) {
        for (const c of Object.values(Vg)) {
            var b = sm(c);
            b = new fm(b[0],b[1],40);
            um(a.g, b, d => {
                "mouseup" === d && (a.j = c,
                Dl("H21_" + c, !1) ? (Dl("H21_ACK_" + c, !1) || El("H21_ACK_" + c, !0),
                El("H21_HAT", c)) : El("H21_HAT", null))
            }
            );
            vm(a.g, b);
            a.i.push(b)
        }
        um(a.g, km, c => {
            "mouseup" === c && a.v()
        }
        );
        vm(a.g, km);
        a.i.push(km);
        um(a.g, rm, c => {
            "mouseup" === c && (a.j = void 0,
            El("H21_HAT", null))
        }
        );
        vm(a.g, rm);
        a.i.push(rm)
    }
    var wm = class extends yi {
        constructor(a, b= () => {}
        ) {
            super();
            this.g = a;
            this.v = b;
            this.i = [];
            this.u = new Map;
            this.o = 0;
            this.O = T("achievements_header");
            this.H = L ? rh : qh;
            this.j = Dl("H21_HAT", null);
            for (const c of Object.values(Vg))
                this.u.set(c, [T(c + "_NAME"), T(c + "_DESC")])
        }
        ub() {
            super.ub()
        }
        update(a) {
            this.o += a
        }
        render(a) {
            a.save();
            a.textAlign = "center";
            V(this.H, a, M / 2, Sg / 2);
            V(xh, a, lm[0], lm[1]);
            var b = gm(a, this.O, P, 40, 20, 450, 1);
            a.fillStyle = "#fff";
            a.shadowColor = "#0078ff";
            a.shadowBlur = 10;
            im(a, b, om[0], om[1], b.fontSize);
            a.shadowColor = "transparent";
            this.j || V(sh, a, mm[0], mm[1], nm[0], nm[0]);
            for (const d of Object.values(Vg)) {
                var c = Dl("H21_" + d, !1);
                b = sm(d);
                const e = c ? uh : th
                  , f = c ? ph : nh
                  , g = c ? Fl.get(d)[1] : Fl.get(d)[0];
                this.j === d && (V(oh, a, b[0], b[1], 175, 175),
                V(e, a, mm[0], mm[1], nm[0], nm[0]),
                c && (a.shadowColor = "#88ddff"),
                V(g, a, mm[0] - 10, mm[1] - 130 + 6 * Math.sin(this.o / 400), g[3], g[4]),
                a.shadowColor = "transparent",
                c ? (a.fillStyle = "#fff",
                a.shadowColor = "#0078ff") : a.fillStyle = "#000",
                c = gm(a, this.u.get(d)[0], P, 32, 20, 300, 1),
                im(a, c, mm[0], 340, 1.25 * c.fontSize),
                a.shadowColor = "transparent",
                a.fillStyle = "#000",
                c = Nl(d) || "",
                c = gm(a, this.u.get(d)[1] + " " + c, P, 28, 16, 300, 2),
                im(a, c, mm[0], 375, 1.25 * c.fontSize));
                V(f, a, b[0], b[1], 100, 100);
                V(g, a, b[0], b[1], 60, 60);
                !Dl("H21_ACK_" + d, !1) && Dl("H21_" + d, !1) && (a.beginPath(),
                a.fillStyle = "#f33",
                a.arc(b[0] + 30, b[1] - 30, 14, 0, 2 * Math.PI),
                a.closePath(),
                a.fill(),
                a.font = `20px bold ${P}`,
                a.fillStyle = "#fff",
                a.fillText("!", b[0] + 30, b[1] - 30))
            }
            V(mh, a, jm[0], jm[1], 70, 70);
            V(this.j ? vh : wh, a, qm[0], qm[1], 100, 100);
            a.restore()
        }
    }
    ;
    var xm = class {
        constructor() {
            this.o = this.u = !1
        }
        update(a) {
            this.u || (this.onStart(),
            this.u = !0);
            this.g() ? this.o || (this.j(),
            this.o = !0) : this.Ra(a)
        }
        g() {
            return !0
        }
        onStart() {}
        Ra() {}
        j() {}
        reset() {
            this.o = this.u = !1
        }
    }
      , ym = class extends xm {
        constructor(a) {
            super();
            this.i = a
        }
        j() {
            super.j();
            this.i()
        }
    }
      , W = class extends xm {
        constructor(a, b) {
            super();
            this.i = a;
            this.v = b
        }
        onStart() {
            this.i.start()
        }
        Ra(a) {
            this.i.update(a);
            this.v(zm(this.i))
        }
        g() {
            return !this.i.u && Am(this.i)
        }
        reset() {
            super.reset();
            this.i.reset()
        }
    }
      , Bm = class extends xm {
        constructor(a) {
            super();
            this.v = a;
            this.i = 0
        }
        Ra(a) {
            this.i += a
        }
        g() {
            return this.i >= this.v
        }
        reset() {
            super.reset();
            this.i = 0
        }
    }
      , Cm = class extends xm {
        constructor(a, b=!1) {
            super();
            this.actions = a;
            this.v = b;
            this.i = a.slice()
        }
        g() {
            return !this.actions.length
        }
        Ra(a) {
            if (0 < this.actions.length && 0 < a) {
                const b = this.actions[0];
                b.update(a);
                b.g() && this.actions.length && this.actions[0] === b && this.actions.shift()
            }
            this.g() && this.v && this.reset()
        }
        reset() {
            super.reset();
            this.actions = this.i.slice();
            for (const a of this.actions)
                a.reset()
        }
    }
      , Dm = class extends xm {
        constructor(a) {
            super();
            this.actions = a
        }
        g() {
            for (const a of this.actions)
                if (!a.g())
                    return !1;
            return !0
        }
        Ra(a) {
            if (!this.g())
                for (const b of this.actions)
                    b.update(a)
        }
        reset() {
            super.reset();
            for (const a of this.actions)
                a.reset()
        }
    }
    ;
    function Em(a, b, c, d, e, f, g, h) {
        this.g = a;
        this.u = b;
        this.j = c;
        this.v = d;
        this.o = e;
        this.H = f;
        this.i = g;
        this.O = h
    }
    Em.prototype.clone = function() {
        return new Em(this.g,this.u,this.j,this.v,this.o,this.H,this.i,this.O)
    }
    ;
    function Fm(a, b) {
        if (0 == b)
            return a.g;
        if (1 == b)
            return a.i;
        var c = lj(a.g, a.j, b)
          , d = lj(a.j, a.o, b);
        a = lj(a.o, a.i, b);
        c = lj(c, d, b);
        d = lj(d, a, b);
        return lj(c, d, b)
    }
    function Gm(a, b) {
        if (0 == b)
            return a.u;
        if (1 == b)
            return a.O;
        var c = lj(a.u, a.v, b)
          , d = lj(a.v, a.H, b);
        a = lj(a.H, a.O, b);
        c = lj(c, d, b);
        d = lj(d, a, b);
        return lj(c, d, b)
    }
    Em.prototype.Cb = function() {
        return new Q(Fm(this),Gm(this))
    }
    ;
    function Hm(a, b) {
        var c = (b - a.g) / (a.i - a.g);
        if (0 >= c)
            return 0;
        if (1 <= c)
            return 1;
        for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
            f = Fm(a, c);
            var h = (Fm(a, c + 1E-6) - f) / 1E-6;
            if (1E-6 > Math.abs(f - b))
                return c;
            if (1E-6 > Math.abs(h))
                break;
            else
                f < b ? d = c : e = c,
                c -= (f - b) / h
        }
        for (g = 0; 1E-6 < Math.abs(f - b) && 8 > g; g++)
            f < b ? (d = c,
            c = (c + e) / 2) : (e = c,
            c = (c + d) / 2),
            f = Fm(a, c);
        return c
    }
    ;const Im = (a, b, c, d) => {
        const e = new Em(0,0,a,b,c,d,1,1);
        return f => Gm(e, Hm(e, f))
    }
    ;
    var Jm = Im(.25, .1, .25, 1)
      , Km = (a, b, c, d=Jm) => b + d(a) * (c - b)
      , Lm = a => a
      , Mm = Im(.4, 0, 1, 1)
      , Nm = Im(.6, -.28, .735, .045)
      , Om = Im(0, 0, .6, 1)
      , Pm = Im(.175, .885, .32, 1.275)
      , Qm = Im(.6, 0, .4, 1);
    function Rm() {
        return performance.now()
    }
    function zm(a) {
        let b = Math.min(Math.max(Sm(a) / a.duration, 0), 1);
        a.i && (b = 1 - b);
        for (let c in a.v)
            a.O.hasOwnProperty(c) && (a.V[c] = Km(b, a.v[c], a.O[c], a.oa));
        return a.V
    }
    function Am(a) {
        return Sm(a) >= a.duration
    }
    function Sm(a) {
        return null === a.g ? 0 : a.o() - a.g
    }
    function Tm(a) {
        if (null !== a.g && !a.i) {
            var b = Math.min(a.duration, Sm(a));
            a.g = a.o() - (a.duration - b);
            a.i = !0
        }
    }
    class Um {
        constructor(a, b, c, d=Jm, e=Rm) {
            this.v = a;
            this.O = b;
            this.V = {};
            this.duration = c;
            this.oa = d;
            this.o = e;
            this.g = null;
            this.i = !1
        }
        start() {
            this.g = this.o();
            this.i = !1
        }
        reset() {
            this.g = null
        }
    }
    ;class X extends Um {
        constructor(a, b, c, d=Jm, e=!1, f=!1) {
            super(a, b, c, d, () => this.j);
            this.j = 0;
            this.H = f;
            this.u = e
        }
        update(a) {
            null !== this.g && (this.j += a,
            Am(this) && (this.H && !this.i ? Tm(this) : this.u && this.i && (this.i = !1),
            this.H || this.u)) && (this.g = 0,
            this.j %= this.duration)
        }
        reset() {
            super.reset();
            this.j = 0
        }
    }
    ;var Xm = (a, b) => void 0 !== b && Vm.has(b) ? Vm.get(b).get(a) : Wm.get(a)
      , $m = (a, b) => {
        a = Ym[a - 1];
        return new Cm([new X({
            y: a.a.y
        },{
            y: a.b.y
        },a.b.f * Zm,Qm), new X({
            y: a.b.y
        },{
            y: a.c.y
        },(a.c.f - a.b.f) * Zm,Qm)].map(c => new W(c,b)),!0)
    }
    ;
    const Zm = 1E3 / 24
      , Wm = new Map([[1, [yh]], [2, [[4, 312, 3708, 75, 75]]], [3, [[4, 1014, 3741, 63, 75]]], [4, [[4, 390, 3714, 75, 63]]], [5, [[5, 390, 3499, 75, 75]]], [6, [[5, 468, 3499, 75, 75]]], [7, [[5, 546, 3499, 75, 75]]], [8, [[5, 624, 3499, 75, 75]]], [9, [[4, 0, 0, 150, 180]]], [10, [[4, 1377, 2415, 150, 150]]], [11, [[5, 0, 0, 150, 180]]], [12, [[5, 306, 1989, 150, 150]]], [0, [yh]]])
      , Vm = new Map([["sleep", new Map([[1, [[3, 1611, 1409, 75, 75], [3, 1611, 1409, 75, 75], [3, 1689, 1409, 75, 75], [3, 1689, 1409, 75, 75], [3, 1767, 1409, 75, 75], [3, 1767, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 1845, 1409, 75, 75], [3, 0, 1411, 75, 75], [3, 0, 1411, 75, 75], [3, 78, 1411, 75, 75], [3, 78, 1411, 75, 75], [3, 156, 1411, 75, 75], [3, 156, 1411, 75, 75], [3, 78, 1411, 75, 75], [3, 78, 1411, 75, 75], [3, 156, 1411, 75, 75], [3, 156, 1411, 75, 75], [3, 78, 1411, 75, 75], [3, 78, 1411, 75, 75], [3, 156, 1411, 75, 75], [3, 156, 1411, 75, 75], [3, 78, 1411, 75, 75]]], [5, [[3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1929, 1499, 75, 75], [3, 1077, 1504, 75, 75], [3, 1077, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1155, 1504, 75, 75], [3, 1233, 1507, 75, 75], [3, 1233, 1507, 75, 75]]], [0, mi]])], ["idle", new Map([[1, mi], [2, [[4, 153, 0, 150, 180], [4, 153, 0, 150, 180], [4, 306, 0, 150, 180], [4, 306, 0, 150, 180], [4, 306, 0, 150, 180], [4, 306, 0, 150, 180], [4, 459, 0, 150, 180], [4, 612, 0, 150, 180], [4, 765, 0, 150, 180], [4, 918, 0, 150, 180], [4, 1071, 0, 150, 180], [4, 1224, 0, 150, 180], [4, 1224, 0, 150, 180], [4, 1377, 0, 150, 180], [4, 1530, 0, 150, 180], [4, 1683, 0, 150, 180], [4, 1683, 0, 150, 180], [4, 1836, 0, 150, 180], [4, 0, 183, 150, 180], [4, 1377, 0, 150, 180], [4, 1530, 0, 150, 180], [4, 153, 183, 150, 180], [4, 153, 183, 150, 180], [4, 306, 183, 150, 180], [4, 459, 183, 150, 180], [4, 612, 183, 150, 180], [4, 765, 183, 150, 180], [4, 918, 183, 150, 180], [4, 918, 183, 150, 180], [4, 1071, 183, 150, 180], [4, 1224, 183, 150, 180], [4, 1377, 183, 150, 180], [4, 1530, 183, 150, 180], [4, 1683, 183, 150, 180], [4, 1683, 183, 150, 180], [4, 1836, 0, 150, 180], [4, 1836, 183, 150, 180], [4, 0, 366, 150, 180], [4, 0, 366, 150, 180], [4, 153, 366, 150, 180], [4, 306, 366, 150, 180], [4, 306, 366, 150, 180], [4, 459, 366, 150, 180], [4, 612, 366, 150, 180], [4, 612, 366, 150, 180], [4, 765, 366, 150, 180], [4, 153, 0, 150, 180], [4, 153, 0, 150, 180], [4, 153, 0, 150, 180], [4, 306, 0, 150, 180], [4, 918, 366, 150, 180], [4, 1071, 366, 150, 180], [4, 1224, 366, 150, 180], [4, 1377, 366, 150, 180], [4, 1530, 366, 150, 180], [4, 1683, 366, 150, 180], [4, 1836, 366, 150, 180], [4, 0, 549, 150, 180], [4, 459, 0, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180], [4, 153, 549, 150, 180]]], [3, [[4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 459, 549, 150, 180], [4, 459, 549, 150, 180], [4, 459, 549, 150, 180], [4, 459, 549, 150, 180], [4, 459, 549, 150, 180], [4, 459, 549, 150, 180], [4, 612, 549, 150, 180], [4, 612, 549, 150, 180], [4, 612, 549, 150, 180], [4, 612, 549, 150, 180], [4, 765, 549, 150, 180], [4, 765, 549, 150, 180], [4, 765, 549, 150, 180], [4, 765, 549, 150, 180], [4, 918, 549, 150, 180], [4, 918, 549, 150, 180], [4, 918, 549, 150, 180], [4, 918, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 306, 549, 150, 180], [4, 459, 549, 150, 180], [4, 459, 549, 150, 180], [4, 459, 549, 150, 180], [4, 1071, 549, 150, 180], [4, 1071, 549, 150, 180], [4, 1224, 549, 150, 180], [4, 1377, 549, 150, 180], [4, 1377, 549, 150, 180], [4, 1377, 549, 150, 180], [4, 1377, 549, 150, 180], [4, 1530, 549, 150, 180], [4, 1530, 549, 150, 180], [4, 1530, 549, 150, 180], [4, 1530, 549, 150, 180], [4, 1683, 549, 150, 180], [4, 1683, 549, 150, 180], [4, 1683, 549, 150, 180], [4, 1683, 549, 150, 180], [4, 1836, 549, 150, 180], [4, 1836, 549, 150, 180], [4, 1836, 549, 150, 180], [4, 1836, 549, 150, 180], [4, 0, 732, 150, 180], [4, 153, 732, 150, 180], [4, 306, 732, 150, 180], [4, 306, 732, 150, 180], [4, 306, 732, 150, 180], [4, 306, 732, 150, 180], [4, 306, 732, 150, 180], [4, 306, 732, 150, 180], [4, 459, 732, 150, 180], [4, 459, 732, 150, 180], [4, 459, 732, 150, 180], [4, 459, 732, 150, 180], [4, 612, 732, 150, 180], [4, 612, 732, 150, 180], [4, 612, 732, 150, 180], [4, 612, 732, 150, 180], [4, 765, 732, 150, 180], [4, 918, 732, 150, 180], [4, 918, 732, 150, 180], [4, 1071, 732, 150, 180]]], [4, [[4, 1530, 2415, 150, 150], [4, 1530, 2415, 150, 150], [4, 1683, 2415, 150, 150], [4, 1683, 2415, 150, 150], [4, 1836, 2415, 150, 150], [4, 1836, 2415, 150, 150], [4, 0, 2445, 150, 150], [4, 153, 2445, 150, 150], [4, 306, 2445, 150, 150], [4, 459, 2445, 150, 150], [4, 612, 2445, 150, 150], [4, 765, 2445, 150, 150], [4, 765, 2445, 150, 150], [4, 918, 2445, 150, 150], [4, 1071, 2445, 150, 150], [4, 1224, 2568, 150, 150], [4, 1224, 2568, 150, 150], [4, 1377, 2568, 150, 150]]], [5, [[3, 459, 980, 150, 150], [3, 459, 980, 150, 150], [3, 459, 980, 150, 150], [3, 612, 980, 150, 150], [3, 612, 980, 150, 150], [3, 1027, 982, 150, 150], [3, 1027, 982, 150, 150], [3, 1180, 982, 150, 150], [3, 1180, 982, 150, 150], [3, 0, 1027, 150, 150], [3, 0, 1027, 150, 150], [3, 0, 1027, 150, 150], [3, 1180, 982, 150, 150], [3, 1180, 982, 150, 150], [3, 153, 1027, 150, 150], [3, 153, 1027, 150, 150], [3, 1608, 1102, 150, 150], [3, 1608, 1102, 150, 150], [3, 459, 980, 150, 150], [3, 459, 980, 150, 150], [3, 459, 980, 150, 150], [3, 612, 980, 150, 150], [3, 612, 980, 150, 150], [3, 1027, 982, 150, 150], [3, 1027, 982, 150, 150], [3, 1180, 982, 150, 150], [3, 1180, 982, 150, 150], [3, 0, 1027, 150, 150], [3, 0, 1027, 150, 150], [3, 1761, 1103, 150, 150], [3, 1333, 1120, 150, 150], [3, 1333, 1120, 150, 150], [3, 765, 1127, 150, 150], [3, 306, 1133, 150, 150], [3, 459, 1133, 150, 150], [3, 612, 1133, 150, 150], [3, 918, 1135, 150, 150], [3, 918, 1135, 150, 150], [3, 918, 1135, 150, 150], [3, 1071, 1135, 150, 150], [3, 1071, 1135, 150, 150], [3, 0, 1180, 150, 150], [3, 0, 1180, 150, 150], [3, 153, 1180, 150, 150], [3, 153, 1180, 150, 150], [3, 1486, 1255, 150, 150], [3, 1486, 1255, 150, 150], [3, 1486, 1255, 150, 150], [3, 153, 1180, 150, 150], [3, 153, 1180, 150, 150], [3, 1639, 1256, 150, 150], [3, 1639, 1256, 150, 150], [3, 1792, 1256, 150, 150], [3, 1792, 1256, 150, 150], [3, 918, 1135, 150, 150], [3, 918, 1135, 150, 150], [3, 918, 1135, 150, 150], [3, 1071, 1135, 150, 150], [3, 1071, 1135, 150, 150], [3, 0, 1180, 150, 150], [3, 0, 1180, 150, 150], [3, 153, 1180, 150, 150], [3, 1224, 1273, 150, 150], [3, 765, 1280, 150, 150], [3, 765, 1280, 150, 150], [3, 306, 1286, 150, 150], [3, 459, 1286, 150, 150], [3, 612, 1286, 150, 150], [3, 918, 1288, 150, 150], [3, 918, 1288, 150, 150], [3, 1608, 1102, 150, 150], [3, 1608, 1102, 150, 150]]], [6, [[5, 459, 1989, 150, 150], [5, 459, 1989, 150, 150], [5, 459, 1989, 150, 150], [5, 612, 1989, 150, 150], [5, 612, 1989, 150, 150], [5, 765, 1989, 150, 150], [5, 765, 1989, 150, 150], [5, 918, 1989, 150, 150], [5, 918, 1989, 150, 150], [5, 1071, 1989, 150, 150], [5, 1071, 1989, 150, 150], [5, 1071, 1989, 150, 150], [5, 918, 1989, 150, 150], [5, 918, 1989, 150, 150], [5, 1224, 1989, 150, 150], [5, 1224, 1989, 150, 150], [5, 1377, 1989, 150, 150], [5, 1377, 1989, 150, 150], [5, 1530, 1989, 150, 150], [5, 1530, 1989, 150, 150], [5, 1683, 1989, 150, 150], [5, 1683, 1989, 150, 150], [5, 1836, 1989, 150, 150], [5, 0, 2019, 150, 150], [5, 153, 2142, 150, 150], [5, 153, 2142, 150, 150], [5, 153, 2142, 150, 150], [5, 306, 2142, 150, 150], [5, 306, 2142, 150, 150], [5, 459, 2142, 150, 150], [5, 459, 2142, 150, 150], [5, 612, 2142, 150, 150], [5, 612, 2142, 150, 150], [5, 612, 2142, 150, 150], [5, 306, 2142, 150, 150], [5, 306, 2142, 150, 150], [5, 765, 2142, 150, 150], [5, 765, 2142, 150, 150], [5, 153, 2142, 150, 150], [5, 153, 2142, 150, 150], [5, 153, 2142, 150, 150], [5, 306, 2142, 150, 150], [5, 918, 2142, 150, 150], [5, 1071, 2142, 150, 150], [5, 1224, 2142, 150, 150], [5, 1377, 2142, 150, 150], [5, 1530, 2142, 150, 150], [5, 1530, 2142, 150, 150], [5, 1683, 2142, 150, 150], [5, 1683, 2142, 150, 150], [5, 1836, 2142, 150, 150], [5, 0, 2172, 150, 150], [5, 153, 2295, 150, 150], [5, 306, 2295, 150, 150], [5, 306, 2295, 150, 150], [5, 459, 2295, 150, 150], [5, 459, 2295, 150, 150], [5, 612, 2295, 150, 150], [5, 612, 2295, 150, 150], [5, 612, 2295, 150, 150], [5, 765, 2295, 150, 150], [5, 765, 2295, 150, 150], [5, 918, 2295, 150, 150], [5, 918, 2295, 150, 150], [5, 1071, 2295, 150, 150], [5, 1071, 2295, 150, 150], [5, 1071, 2295, 150, 150], [5, 765, 2295, 150, 150], [5, 765, 2295, 150, 150], [5, 459, 2295, 150, 150], [5, 459, 2295, 150, 150], [5, 612, 2295, 150, 150], [5, 612, 2295, 150, 150], [5, 612, 2295, 150, 150], [5, 1224, 2295, 150, 150], [5, 1224, 2295, 150, 150], [5, 1377, 2295, 150, 150], [5, 1530, 2295, 150, 150], [5, 1683, 2295, 150, 150], [5, 1836, 2295, 150, 150], [5, 1836, 2295, 150, 150], [5, 0, 2325, 150, 150], [5, 0, 2325, 150, 150], [5, 459, 1989, 150, 150]]], [7, [[5, 153, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 765, 2448, 150, 150], [5, 918, 2448, 150, 150], [5, 918, 2448, 150, 150], [5, 1071, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 1224, 2448, 150, 150], [5, 1377, 2448, 150, 150], [5, 1530, 2448, 150, 150], [5, 1683, 2448, 150, 150], [5, 1683, 2448, 150, 150], [5, 1683, 2448, 150, 150], [5, 1530, 2448, 150, 150], [5, 1530, 2448, 150, 150], [5, 1836, 2448, 150, 150], [5, 1836, 2448, 150, 150], [5, 0, 2478, 150, 150], [5, 153, 2601, 150, 150], [5, 306, 2601, 150, 150], [5, 459, 2601, 150, 150], [5, 612, 2601, 150, 150], [5, 765, 2601, 150, 150], [5, 765, 2601, 150, 150], [5, 918, 2601, 150, 150], [5, 918, 2601, 150, 150], [5, 918, 2601, 150, 150], [5, 765, 2601, 150, 150], [5, 765, 2601, 150, 150], [5, 612, 2601, 150, 150], [5, 612, 2601, 150, 150], [5, 1071, 2601, 150, 150], [5, 1071, 2601, 150, 150], [5, 1071, 2601, 150, 150], [5, 1224, 2601, 150, 150], [5, 1377, 2601, 150, 150], [5, 1530, 2601, 150, 150], [5, 459, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 612, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 459, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 306, 2448, 150, 150], [5, 153, 2448, 150, 150], [5, 153, 2448, 150, 150]]], [8, [[5, 1683, 2601, 150, 150], [5, 1683, 2601, 150, 150], [5, 1683, 2601, 150, 150], [5, 1836, 2601, 150, 150], [5, 1836, 2601, 150, 150], [5, 0, 2631, 150, 150], [5, 0, 2631, 150, 150], [5, 153, 2754, 150, 150], [5, 153, 2754, 150, 150], [5, 153, 2754, 150, 150], [5, 306, 2754, 150, 150], [5, 459, 2754, 150, 150], [5, 612, 2754, 150, 150], [5, 612, 2754, 150, 150], [5, 1683, 2601, 150, 150], [5, 1683, 2601, 150, 150], [5, 1683, 2601, 150, 150], [5, 1836, 2601, 150, 150], [5, 1836, 2601, 150, 150], [5, 0, 2631, 150, 150], [5, 765, 2754, 150, 150], [5, 765, 2754, 150, 150], [5, 918, 2754, 150, 150], [5, 1071, 2754, 150, 150], [5, 1071, 2754, 150, 150], [5, 1224, 2754, 150, 150], [5, 1224, 2754, 150, 150], [5, 1224, 2754, 150, 150], [5, 1377, 2754, 150, 150], [5, 1377, 2754, 150, 150], [5, 1530, 2754, 150, 150], [5, 1530, 2754, 150, 150], [5, 1530, 2754, 150, 150], [5, 1683, 2754, 150, 150], [5, 1683, 2754, 150, 150], [5, 1836, 2754, 150, 150], [5, 1836, 2754, 150, 150], [5, 0, 2784, 150, 150], [5, 0, 2784, 150, 150], [5, 0, 2784, 150, 150], [5, 153, 2907, 150, 150], [5, 153, 2907, 150, 150], [5, 306, 2907, 150, 150], [5, 306, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 612, 2907, 150, 150], [5, 612, 2907, 150, 150], [5, 765, 2907, 150, 150], [5, 765, 2907, 150, 150], [5, 765, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 612, 2907, 150, 150], [5, 612, 2907, 150, 150], [5, 765, 2907, 150, 150], [5, 765, 2907, 150, 150], [5, 765, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 459, 2907, 150, 150], [5, 612, 2907, 150, 150], [5, 612, 2907, 150, 150], [5, 765, 2907, 150, 150], [5, 918, 2907, 150, 150], [5, 1071, 2907, 150, 150], [5, 1071, 2907, 150, 150], [5, 1071, 2907, 150, 150], [5, 1224, 2907, 150, 150], [5, 1224, 2907, 150, 150]]], [9, [[4, 1530, 2568, 150, 150], [4, 1683, 2568, 150, 150], [4, 1683, 2568, 150, 150], [4, 1836, 2568, 150, 150], [4, 0, 2598, 150, 150], [4, 153, 2598, 150, 150], [4, 306, 2598, 150, 150], [4, 459, 2598, 150, 150], [4, 1224, 2415, 150, 150], [4, 612, 2598, 150, 150], [4, 765, 2598, 150, 150], [4, 918, 2598, 150, 150], [4, 1071, 2598, 150, 150], [4, 1224, 2721, 150, 150], [4, 1377, 2721, 150, 150], [4, 1530, 2721, 150, 150], [4, 1683, 2721, 150, 150], [4, 1836, 2721, 150, 150], [4, 0, 2751, 150, 150], [4, 153, 2751, 150, 150], [4, 306, 2751, 150, 150], [4, 459, 2751, 150, 150], [4, 612, 2751, 150, 150], [4, 765, 2751, 150, 150], [4, 918, 2751, 150, 150], [4, 1071, 2751, 150, 150], [4, 1071, 2751, 150, 150], [4, 1224, 2874, 150, 150], [4, 1377, 2874, 150, 150], [4, 1530, 2874, 150, 150], [4, 1683, 2874, 150, 150], [4, 1836, 2874, 150, 150], [4, 0, 2904, 150, 150], [4, 153, 2904, 150, 150], [4, 306, 2904, 150, 150], [4, 459, 2904, 150, 150], [4, 612, 2904, 150, 150], [4, 765, 2904, 150, 150], [4, 765, 2904, 150, 150], [4, 765, 2904, 150, 150], [4, 918, 2904, 150, 150], [4, 1071, 2904, 150, 150], [4, 1224, 3027, 150, 150], [4, 1377, 3027, 150, 150], [4, 1530, 3027, 150, 150], [4, 1683, 3027, 150, 150], [4, 1836, 3027, 150, 150], [4, 0, 3057, 150, 150], [4, 1530, 2568, 150, 150], [4, 1683, 2568, 150, 150], [4, 1683, 2568, 150, 150], [4, 1836, 2568, 150, 150], [4, 153, 2598, 150, 150], [4, 306, 2598, 150, 150], [4, 153, 3057, 150, 150], [4, 306, 3057, 150, 150], [4, 918, 2598, 150, 150], [4, 459, 3057, 150, 150], [4, 612, 3057, 150, 150], [4, 765, 3057, 150, 150], [4, 918, 3057, 150, 150], [4, 1071, 3057, 150, 150], [4, 1224, 3180, 150, 150], [4, 1224, 3180, 150, 150], [4, 1377, 3180, 150, 150], [4, 1530, 3180, 150, 150], [4, 1683, 3180, 150, 150], [4, 1836, 3180, 150, 150], [4, 0, 3210, 150, 150], [4, 153, 3210, 150, 150], [4, 306, 3210, 150, 150], [4, 0, 3057, 150, 150]]], [10, [[4, 1836, 885, 150, 150], [4, 0, 915, 150, 150], [4, 0, 915, 150, 150], [4, 153, 915, 150, 150], [4, 306, 915, 150, 150], [4, 459, 915, 150, 150], [4, 612, 915, 150, 150], [4, 765, 915, 150, 150], [4, 918, 915, 150, 150], [4, 1071, 915, 150, 150], [4, 1224, 1038, 150, 150], [4, 1377, 1038, 150, 150], [4, 1530, 1038, 150, 150], [4, 1683, 1038, 150, 150], [4, 1836, 1038, 150, 150], [4, 0, 1068, 150, 150], [4, 153, 1068, 150, 150], [4, 306, 1068, 150, 150], [4, 459, 1068, 150, 150], [4, 612, 1068, 150, 150], [4, 765, 1068, 150, 150], [4, 918, 1068, 150, 150], [4, 1071, 1068, 150, 150], [4, 1224, 1191, 150, 150], [4, 1377, 1191, 150, 150], [4, 1530, 1191, 150, 150], [4, 1683, 1191, 150, 150], [4, 1836, 1191, 150, 150], [4, 0, 1221, 150, 150], [4, 153, 1221, 150, 150], [4, 306, 1221, 150, 150], [4, 459, 1221, 150, 150], [4, 612, 1221, 150, 150], [4, 765, 1221, 150, 150], [4, 918, 1221, 150, 150], [4, 1071, 1221, 150, 150], [4, 1224, 1344, 150, 150], [4, 1377, 1344, 150, 150], [4, 1530, 1344, 150, 150], [4, 1530, 1344, 150, 150], [4, 1683, 1344, 150, 150], [4, 1836, 1344, 150, 150], [4, 0, 1374, 150, 150], [4, 153, 1374, 150, 150], [4, 306, 1374, 150, 150], [4, 459, 1374, 150, 150], [4, 612, 1374, 150, 150], [4, 765, 1374, 150, 150], [4, 918, 1374, 150, 150], [4, 1071, 1374, 150, 150], [4, 1071, 1374, 150, 150], [4, 1224, 1497, 150, 150], [4, 1377, 1497, 150, 150], [4, 1530, 1497, 150, 150], [4, 1683, 1497, 150, 150], [4, 1836, 1497, 150, 150], [4, 0, 1527, 150, 150], [4, 153, 1527, 150, 150], [4, 306, 1527, 150, 150], [4, 459, 1527, 150, 150], [4, 612, 1527, 150, 150], [4, 765, 1527, 150, 150], [4, 765, 1527, 150, 150], [4, 765, 1527, 150, 150], [4, 918, 1527, 150, 150], [4, 1071, 1527, 150, 150], [4, 1224, 1650, 150, 150], [4, 1377, 1650, 150, 150], [4, 1530, 1650, 150, 150], [4, 1683, 1650, 150, 150], [4, 1836, 1650, 150, 150], [4, 0, 1680, 150, 150], [4, 1836, 885, 150, 150], [4, 0, 915, 150, 150], [4, 153, 915, 150, 150], [4, 153, 1680, 150, 150], [4, 459, 915, 150, 150], [4, 306, 1680, 150, 150], [4, 459, 1680, 150, 150], [4, 1836, 1497, 150, 150], [4, 612, 1680, 150, 150], [4, 765, 1680, 150, 150], [4, 918, 1680, 150, 150], [4, 1071, 1680, 150, 150], [4, 1224, 1803, 150, 150], [4, 1377, 1803, 150, 150], [4, 1530, 1803, 150, 150], [4, 1683, 1803, 150, 150], [4, 1836, 1803, 150, 150], [4, 0, 1833, 150, 150], [4, 153, 1833, 150, 150], [4, 306, 1833, 150, 150], [4, 1530, 1650, 150, 150], [4, 459, 1833, 150, 150], [4, 612, 1833, 150, 150], [4, 0, 1680, 150, 150]]], [11, [[5, 1836, 0, 150, 150], [5, 1836, 0, 150, 150], [5, 1836, 0, 150, 150], [5, 153, 153, 150, 150], [5, 306, 153, 150, 150], [5, 306, 153, 150, 150], [5, 459, 153, 150, 150], [5, 459, 153, 150, 150], [5, 612, 153, 150, 150], [5, 765, 153, 150, 150], [5, 918, 153, 150, 150], [5, 1071, 153, 150, 150], [5, 1224, 153, 150, 150], [5, 1377, 153, 150, 150], [5, 1530, 153, 150, 150], [5, 1683, 153, 150, 150], [5, 1836, 153, 150, 150], [5, 0, 183, 150, 150], [5, 153, 306, 150, 150], [5, 306, 306, 150, 150], [5, 459, 306, 150, 150], [5, 612, 306, 150, 150], [5, 765, 306, 150, 150], [5, 765, 306, 150, 150], [5, 1836, 0, 150, 150], [5, 1836, 0, 150, 150], [5, 1836, 0, 150, 150], [5, 153, 153, 150, 150], [5, 306, 153, 150, 150], [5, 918, 306, 150, 150], [5, 459, 153, 150, 150], [5, 1071, 306, 150, 150], [5, 1224, 306, 150, 150], [5, 1377, 306, 150, 150], [5, 1530, 306, 150, 150], [5, 1683, 306, 150, 150], [5, 1836, 306, 150, 150], [5, 1836, 306, 150, 150], [5, 0, 336, 150, 150], [5, 153, 459, 150, 150], [5, 306, 459, 150, 150], [5, 459, 459, 150, 150], [5, 612, 459, 150, 150], [5, 765, 459, 150, 150], [5, 918, 459, 150, 150], [5, 1071, 459, 150, 150], [5, 1224, 459, 150, 150], [5, 1224, 459, 150, 150], [5, 1377, 459, 150, 150], [5, 1377, 459, 150, 150], [5, 1377, 459, 150, 150], [5, 1530, 459, 150, 150], [5, 1683, 459, 150, 150], [5, 1836, 459, 150, 150], [5, 0, 489, 150, 150], [5, 153, 612, 150, 150], [5, 306, 612, 150, 150], [5, 459, 612, 150, 150], [5, 612, 612, 150, 150], [5, 765, 612, 150, 150], [5, 918, 612, 150, 150], [5, 918, 612, 150, 150], [5, 918, 612, 150, 150], [5, 1071, 612, 150, 150], [5, 459, 459, 150, 150], [5, 1224, 612, 150, 150], [5, 1377, 612, 150, 150], [5, 765, 459, 150, 150], [5, 1530, 612, 150, 150], [5, 1683, 612, 150, 150], [5, 1836, 612, 150, 150], [5, 0, 642, 150, 150]]], [12, [[5, 459, 1071, 150, 150], [5, 612, 1071, 150, 150], [5, 612, 1071, 150, 150], [5, 765, 1071, 150, 150], [5, 918, 1071, 150, 150], [5, 1071, 1071, 150, 150], [5, 1224, 1071, 150, 150], [5, 1377, 1071, 150, 150], [5, 1530, 1071, 150, 150], [5, 1683, 1071, 150, 150], [5, 1836, 1071, 150, 150], [5, 0, 1101, 150, 150], [5, 153, 1224, 150, 150], [5, 306, 1224, 150, 150], [5, 459, 1224, 150, 150], [5, 612, 1224, 150, 150], [5, 765, 1224, 150, 150], [5, 918, 1224, 150, 150], [5, 1071, 1224, 150, 150], [5, 1224, 1224, 150, 150], [5, 1377, 1224, 150, 150], [5, 1530, 1224, 150, 150], [5, 1683, 1224, 150, 150], [5, 1836, 1224, 150, 150], [5, 459, 1071, 150, 150], [5, 612, 1071, 150, 150], [5, 612, 1071, 150, 150], [5, 0, 1254, 150, 150], [5, 153, 1377, 150, 150], [5, 306, 1377, 150, 150], [5, 459, 1377, 150, 150], [5, 612, 1377, 150, 150], [5, 765, 1377, 150, 150], [5, 918, 1377, 150, 150], [5, 1071, 1377, 150, 150], [5, 1224, 1377, 150, 150], [5, 1377, 1377, 150, 150], [5, 1530, 1377, 150, 150], [5, 1530, 1377, 150, 150], [5, 1683, 1377, 150, 150], [5, 1836, 1377, 150, 150], [5, 0, 1407, 150, 150], [5, 153, 1530, 150, 150], [5, 306, 1530, 150, 150], [5, 459, 1530, 150, 150], [5, 612, 1530, 150, 150], [5, 765, 1530, 150, 150], [5, 918, 1530, 150, 150], [5, 1071, 1530, 150, 150], [5, 1224, 1530, 150, 150], [5, 1377, 1530, 150, 150], [5, 1530, 1530, 150, 150], [5, 1683, 1530, 150, 150], [5, 1836, 1530, 150, 150], [5, 0, 1560, 150, 150], [5, 153, 1683, 150, 150], [5, 306, 1683, 150, 150], [5, 459, 1683, 150, 150], [5, 612, 1683, 150, 150], [5, 765, 1683, 150, 150], [5, 918, 1683, 150, 150], [5, 1071, 1683, 150, 150], [5, 1071, 1683, 150, 150], [5, 1224, 1683, 150, 150], [5, 1377, 1683, 150, 150], [5, 1530, 1683, 150, 150], [5, 1683, 1683, 150, 150], [5, 1836, 1683, 150, 150], [5, 0, 1713, 150, 150], [5, 153, 1836, 150, 150], [5, 306, 1836, 150, 150], [5, 459, 1836, 150, 150]]], [0, mi]])], ["move", new Map([[1, [[3, 1224, 1135, 75, 75], [3, 1224, 1135, 75, 75], [3, 1224, 1135, 75, 75], [3, 1945, 1187, 75, 75], [3, 1945, 1187, 75, 75], [3, 1945, 1187, 75, 75], [3, 1945, 1265, 75, 75], [3, 1945, 1265, 75, 75], [3, 1945, 1265, 75, 75], [3, 1377, 1273, 75, 75], [3, 1377, 1273, 75, 75], [3, 1377, 1273, 75, 75]]], [2, [[4, 78, 3444, 75, 90], [4, 78, 3444, 75, 90], [4, 156, 3444, 75, 90], [4, 234, 3444, 75, 90], [4, 312, 3444, 75, 90], [4, 1029, 3477, 75, 90], [4, 1107, 3477, 75, 90], [4, 1185, 3477, 75, 90], [4, 1263, 3477, 75, 90], [4, 1263, 3477, 75, 90], [4, 1263, 3477, 75, 90], [4, 1263, 3477, 75, 90], [4, 1341, 3477, 75, 90], [4, 1341, 3477, 75, 90], [4, 1419, 3495, 75, 90], [4, 1419, 3495, 75, 90], [4, 1419, 3495, 75, 90]]], [3, [[4, 1248, 3570, 75, 90], [4, 1248, 3570, 75, 90], [4, 1326, 3570, 75, 90], [4, 1326, 3570, 75, 90], [4, 1326, 3570, 75, 90], [4, 1326, 3570, 75, 90], [4, 1404, 3588, 75, 90], [4, 1404, 3588, 75, 90], [4, 1404, 3588, 75, 90], [4, 1482, 3588, 75, 90], [4, 1482, 3588, 75, 90], [4, 1482, 3588, 75, 90]]], [4, [[4, 1248, 3663, 75, 75], [4, 1248, 3663, 75, 75], [4, 1326, 3663, 75, 75], [4, 1326, 3663, 75, 75], [4, 1326, 3663, 75, 75], [4, 1404, 3681, 75, 75], [4, 1404, 3681, 75, 75], [4, 1404, 3681, 75, 75], [4, 1404, 3681, 75, 75], [4, 1482, 3681, 75, 75], [4, 1482, 3681, 75, 75], [4, 1482, 3681, 75, 75]]], [5, [[3, 999, 1444, 75, 75], [3, 999, 1444, 75, 75], [3, 999, 1444, 75, 75], [3, 1383, 1486, 75, 75], [3, 1383, 1486, 75, 75], [3, 1383, 1486, 75, 75], [3, 1461, 1486, 75, 75], [3, 1461, 1486, 75, 75], [3, 1461, 1486, 75, 75], [3, 1539, 1487, 75, 75], [3, 1539, 1487, 75, 75], [3, 1539, 1487, 75, 75]]], [6, [[5, 936, 3265, 75, 75], [5, 936, 3265, 75, 75], [5, 936, 3265, 75, 75], [5, 1014, 3265, 75, 75], [5, 1014, 3265, 75, 75], [5, 1014, 3265, 75, 75], [5, 1092, 3265, 75, 75], [5, 1092, 3265, 75, 75], [5, 1092, 3265, 75, 75], [5, 1170, 3265, 75, 75], [5, 1170, 3265, 75, 75], [5, 1248, 3265, 75, 75], [5, 1248, 3265, 75, 75]]], [7, [[5, 156, 3421, 75, 75], [5, 156, 3421, 75, 75], [5, 156, 3421, 75, 75], [5, 234, 3421, 75, 75], [5, 234, 3421, 75, 75], [5, 234, 3421, 75, 75], [5, 234, 3421, 75, 75], [5, 312, 3421, 75, 75], [5, 312, 3421, 75, 75], [5, 390, 3421, 75, 75], [5, 390, 3421, 75, 75], [5, 390, 3421, 75, 75], [5, 468, 3421, 75, 75], [5, 468, 3421, 75, 75], [5, 468, 3421, 75, 75]]], [8, [[5, 1482, 3465, 75, 75], [5, 1482, 3465, 75, 75], [5, 1560, 3469, 75, 75], [5, 1560, 3469, 75, 75], [5, 1638, 3469, 75, 75], [5, 1638, 3469, 75, 75], [5, 1638, 3469, 75, 75], [5, 1638, 3469, 75, 75], [5, 1716, 3469, 75, 75], [5, 1794, 3469, 75, 75], [5, 1794, 3469, 75, 75], [5, 1794, 3469, 75, 75]]], [9, [[4, 612, 2139, 150, 150], [4, 612, 2139, 150, 150], [4, 612, 2139, 150, 150], [4, 765, 2139, 150, 150], [4, 765, 2139, 150, 150], [4, 765, 2139, 150, 150], [4, 918, 2139, 150, 150], [4, 918, 2139, 150, 150], [4, 918, 2139, 150, 150], [4, 1071, 2139, 150, 150], [4, 1071, 2139, 150, 150], [4, 1071, 2139, 150, 150]]], [10, [[4, 765, 1833, 150, 150], [4, 765, 1833, 150, 150], [4, 765, 1833, 150, 150], [4, 918, 1833, 150, 150], [4, 918, 1833, 150, 150], [4, 918, 1833, 150, 150], [4, 1071, 1833, 150, 150], [4, 1071, 1833, 150, 150], [4, 1071, 1833, 150, 150], [4, 1224, 1956, 150, 150], [4, 1224, 1956, 150, 150], [4, 1224, 1956, 150, 150]]], [11, [[5, 153, 765, 150, 150], [5, 153, 765, 150, 150], [5, 153, 765, 150, 150], [5, 306, 765, 150, 150], [5, 306, 765, 150, 150], [5, 306, 765, 150, 150], [5, 459, 765, 150, 150], [5, 459, 765, 150, 150], [5, 459, 765, 150, 150], [5, 612, 765, 150, 150], [5, 612, 765, 150, 150], [5, 612, 765, 150, 150]]], [12, [[5, 612, 1836, 150, 150], [5, 612, 1836, 150, 150], [5, 612, 1836, 150, 150], [5, 765, 1836, 150, 150], [5, 765, 1836, 150, 150], [5, 765, 1836, 150, 150], [5, 918, 1836, 150, 150], [5, 918, 1836, 150, 150], [5, 918, 1836, 150, 150], [5, 1071, 1836, 150, 150], [5, 1071, 1836, 150, 150], [5, 1071, 1836, 150, 150]]], [0, mi]])], ["happy", new Map([[1, [[3, 1924, 220, 75, 75], [3, 1924, 220, 75, 75], [3, 1924, 298, 75, 75], [3, 1924, 298, 75, 75], [3, 1924, 376, 75, 75], [3, 1924, 376, 75, 75], [3, 1924, 454, 75, 75], [3, 1924, 454, 75, 75], [3, 1924, 532, 75, 75], [3, 1924, 532, 75, 75], [3, 1924, 610, 75, 75], [3, 1969, 797, 75, 75], [3, 1969, 797, 75, 75], [3, 1027, 821, 75, 75], [3, 1027, 821, 75, 75], [3, 306, 874, 75, 75], [3, 306, 874, 75, 75], [3, 1969, 875, 75, 75], [3, 1969, 875, 75, 75], [3, 1969, 875, 75, 75], [3, 1027, 899, 75, 75], [3, 1027, 899, 75, 75], [3, 1027, 899, 75, 75], [3, 1027, 899, 75, 75], [3, 1914, 953, 75, 75], [3, 1914, 953, 75, 75], [3, 1914, 953, 75, 75], [3, 1914, 953, 75, 75], [3, 765, 980, 75, 75], [3, 765, 980, 75, 75], [3, 1333, 982, 75, 75], [3, 1914, 1031, 75, 75], [3, 1914, 1031, 75, 75], [3, 1914, 1109, 75, 75], [3, 1914, 1109, 75, 75], [3, 1486, 1120, 75, 75], [3, 1486, 1120, 75, 75]]], [2, [[4, 1734, 3414, 75, 90], [4, 1734, 3414, 75, 90], [4, 1812, 3414, 75, 90], [4, 1812, 3414, 75, 90], [4, 1812, 3414, 75, 90], [4, 1890, 3414, 75, 90], [4, 1890, 3414, 75, 90], [4, 1890, 3414, 75, 90], [4, 1890, 3414, 75, 90], [4, 1890, 3414, 75, 90], [4, 1890, 3414, 75, 90], [4, 1890, 3414, 75, 90], [4, 1968, 3414, 75, 90], [4, 1968, 3414, 75, 90], [4, 405, 3435, 75, 90], [4, 483, 3435, 75, 90], [4, 483, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 639, 3435, 75, 90], [4, 639, 3435, 75, 90], [4, 717, 3435, 75, 90], [4, 717, 3435, 75, 90], [4, 717, 3435, 75, 90], [4, 795, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 561, 3435, 75, 90], [4, 873, 3435, 75, 90], [4, 873, 3435, 75, 90], [4, 951, 3435, 75, 90], [4, 951, 3435, 75, 90], [4, 0, 3444, 75, 90], [4, 0, 3444, 75, 90]]], [3, [[4, 780, 3528, 75, 90], [4, 780, 3528, 75, 90], [4, 858, 3528, 75, 90], [4, 858, 3528, 75, 90], [4, 936, 3528, 75, 90], [4, 936, 3528, 75, 90], [4, 0, 3537, 75, 90], [4, 0, 3537, 75, 90], [4, 78, 3537, 75, 90], [4, 78, 3537, 75, 90], [4, 156, 3537, 75, 90], [4, 156, 3537, 75, 90], [4, 234, 3537, 75, 90], [4, 234, 3537, 75, 90], [4, 234, 3537, 75, 90], [4, 234, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 312, 3537, 75, 90], [4, 1014, 3570, 75, 90], [4, 1092, 3570, 75, 90], [4, 1092, 3570, 75, 90], [4, 1170, 3570, 75, 90], [4, 1170, 3570, 75, 90]]], [4, [[4, 546, 3621, 75, 75], [4, 546, 3621, 75, 75], [4, 624, 3621, 75, 75], [4, 624, 3621, 75, 75], [4, 702, 3621, 75, 75], [4, 702, 3621, 75, 75], [4, 780, 3621, 75, 75], [4, 780, 3621, 75, 75], [4, 858, 3621, 75, 75], [4, 936, 3621, 75, 75], [4, 0, 3630, 75, 75], [4, 0, 3630, 75, 75], [4, 78, 3630, 75, 75], [4, 78, 3630, 75, 75], [4, 78, 3630, 75, 75], [4, 78, 3630, 75, 75], [4, 156, 3630, 75, 75], [4, 156, 3630, 75, 75], [4, 156, 3630, 75, 75], [4, 156, 3630, 75, 75], [4, 156, 3630, 75, 75], [4, 156, 3630, 75, 75], [4, 156, 3630, 75, 75], [4, 234, 3630, 75, 75], [4, 234, 3630, 75, 75], [4, 234, 3630, 75, 75], [4, 234, 3630, 75, 75], [4, 312, 3630, 75, 75], [4, 312, 3630, 75, 75], [4, 1014, 3663, 75, 75], [4, 1092, 3663, 75, 75], [4, 1170, 3663, 75, 75], [4, 1170, 3663, 75, 75]]], [5, [[3, 1923, 1421, 75, 75], [3, 1923, 1421, 75, 75], [3, 1149, 1426, 75, 75], [3, 1149, 1426, 75, 75], [3, 1227, 1426, 75, 75], [3, 1227, 1426, 75, 75], [3, 1305, 1429, 75, 75], [3, 765, 1433, 75, 75], [3, 765, 1433, 75, 75], [3, 765, 1433, 75, 75], [3, 765, 1433, 75, 75], [3, 765, 1433, 75, 75], [3, 765, 1433, 75, 75], [3, 234, 1439, 75, 75], [3, 234, 1439, 75, 75], [3, 312, 1439, 75, 75], [3, 312, 1439, 75, 75], [3, 390, 1439, 75, 75], [3, 390, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 468, 1439, 75, 75], [3, 546, 1439, 75, 75], [3, 546, 1439, 75, 75], [3, 624, 1439, 75, 75], [3, 624, 1439, 75, 75], [3, 843, 1441, 75, 75], [3, 843, 1441, 75, 75], [3, 921, 1441, 75, 75], [3, 921, 1441, 75, 75]]], [6, [[5, 0, 3263, 75, 75], [5, 0, 3263, 75, 75], [5, 78, 3265, 75, 75], [5, 78, 3265, 75, 75], [5, 156, 3265, 75, 75], [5, 156, 3265, 75, 75], [5, 234, 3265, 75, 75], [5, 234, 3265, 75, 75], [5, 312, 3265, 75, 75], [5, 312, 3265, 75, 75], [5, 390, 3265, 75, 75], [5, 390, 3265, 75, 75], [5, 468, 3265, 75, 75], [5, 468, 3265, 75, 75], [5, 468, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 546, 3265, 75, 75], [5, 624, 3265, 75, 75], [5, 624, 3265, 75, 75], [5, 702, 3265, 75, 75], [5, 702, 3265, 75, 75], [5, 780, 3265, 75, 75], [5, 780, 3265, 75, 75], [5, 858, 3265, 75, 75]]], [7, [[5, 78, 3343, 75, 75], [5, 78, 3343, 75, 75], [5, 156, 3343, 75, 75], [5, 156, 3343, 75, 75], [5, 234, 3343, 75, 75], [5, 312, 3343, 75, 75], [5, 390, 3343, 75, 75], [5, 468, 3343, 75, 75], [5, 546, 3343, 75, 75], [5, 624, 3343, 75, 75], [5, 702, 3343, 75, 75], [5, 780, 3343, 75, 75], [5, 858, 3343, 75, 75], [5, 936, 3343, 75, 75], [5, 1014, 3343, 75, 75], [5, 1092, 3343, 75, 75], [5, 1170, 3343, 75, 75], [5, 1248, 3343, 75, 75], [5, 1872, 3350, 75, 75], [5, 1950, 3350, 75, 75], [5, 1950, 3350, 75, 75], [5, 1326, 3352, 75, 75], [5, 1404, 3352, 75, 75], [5, 1482, 3387, 75, 75], [5, 1560, 3391, 75, 75], [5, 1560, 3391, 75, 75], [5, 1638, 3391, 75, 75], [5, 1638, 3391, 75, 75], [5, 1638, 3391, 75, 75], [5, 1716, 3391, 75, 75], [5, 1716, 3391, 75, 75], [5, 1716, 3391, 75, 75], [5, 1716, 3391, 75, 75], [5, 1794, 3391, 75, 75], [5, 1794, 3391, 75, 75], [5, 0, 3419, 75, 75], [5, 0, 3419, 75, 75], [5, 0, 3419, 75, 75], [5, 78, 3421, 75, 75], [5, 78, 3421, 75, 75]]], [8, [[5, 936, 3421, 75, 75], [5, 936, 3421, 75, 75], [5, 1014, 3421, 75, 75], [5, 1014, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1170, 3421, 75, 75], [5, 1170, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1170, 3421, 75, 75], [5, 1170, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1170, 3421, 75, 75], [5, 1170, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1248, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1092, 3421, 75, 75], [5, 1872, 3428, 75, 75], [5, 1872, 3428, 75, 75], [5, 1950, 3428, 75, 75], [5, 1950, 3428, 75, 75], [5, 1326, 3430, 75, 75], [5, 1326, 3430, 75, 75], [5, 1404, 3430, 75, 75], [5, 1404, 3430, 75, 75]]], [9, [[4, 918, 1986, 150, 150], [4, 918, 1986, 150, 150], [4, 1071, 1986, 150, 150], [4, 1071, 1986, 150, 150], [4, 1224, 2109, 150, 150], [4, 1224, 2109, 150, 150], [4, 1377, 2109, 150, 150], [4, 1377, 2109, 150, 150], [4, 1377, 2109, 150, 150], [4, 1377, 2109, 150, 150], [4, 1530, 2109, 150, 150], [4, 1530, 2109, 150, 150], [4, 1683, 2109, 150, 150], [4, 1683, 2109, 150, 150], [4, 1836, 2109, 150, 150], [4, 1836, 2109, 150, 150], [4, 0, 2139, 150, 150], [4, 0, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 153, 2139, 150, 150], [4, 306, 2139, 150, 150], [4, 306, 2139, 150, 150], [4, 459, 2139, 150, 150], [4, 459, 2139, 150, 150], [4, 918, 1986, 150, 150], [4, 918, 1986, 150, 150]]], [10, [[4, 1224, 732, 150, 150], [4, 1224, 732, 150, 150], [4, 1377, 732, 150, 150], [4, 1377, 732, 150, 150], [4, 1530, 732, 150, 150], [4, 1530, 732, 150, 150], [4, 1683, 732, 150, 150], [4, 1683, 732, 150, 150], [4, 1836, 732, 150, 150], [4, 1836, 732, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1224, 885, 150, 150], [4, 1377, 885, 150, 150], [4, 1377, 885, 150, 150], [4, 1530, 885, 150, 150], [4, 1530, 885, 150, 150], [4, 1683, 885, 150, 150], [4, 1683, 885, 150, 150], [4, 1224, 732, 150, 150], [4, 1224, 732, 150, 150]]], [11, [[5, 153, 0, 150, 150], [5, 153, 0, 150, 150], [5, 306, 0, 150, 150], [5, 459, 0, 150, 150], [5, 612, 0, 150, 150], [5, 612, 0, 150, 150], [5, 765, 0, 150, 150], [5, 918, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1071, 0, 150, 150], [5, 1224, 0, 150, 150], [5, 1224, 0, 150, 150], [5, 1377, 0, 150, 150], [5, 1377, 0, 150, 150], [5, 1530, 0, 150, 150], [5, 1683, 0, 150, 150], [5, 1683, 0, 150, 150]]], [12, [[5, 153, 918, 150, 150], [5, 153, 918, 150, 150], [5, 306, 918, 150, 150], [5, 306, 918, 150, 150], [5, 306, 918, 150, 150], [5, 459, 918, 150, 150], [5, 459, 918, 150, 150], [5, 459, 918, 150, 150], [5, 612, 918, 150, 150], [5, 765, 918, 150, 150], [5, 918, 918, 150, 150], [5, 918, 918, 150, 150], [5, 1071, 918, 150, 150], [5, 1224, 918, 150, 150], [5, 1224, 918, 150, 150], [5, 1224, 918, 150, 150], [5, 1224, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1377, 918, 150, 150], [5, 1530, 918, 150, 150], [5, 1530, 918, 150, 150], [5, 1683, 918, 150, 150], [5, 1836, 918, 150, 150], [5, 1836, 918, 150, 150], [5, 0, 948, 150, 150], [5, 0, 948, 150, 150], [5, 153, 1071, 150, 150], [5, 306, 1071, 150, 150], [5, 306, 1071, 150, 150], [5, 153, 918, 150, 150], [5, 153, 918, 150, 150]]], [0, mi]])], ["sad", new Map([[1, [[3, 1071, 1288, 75, 75], [3, 1071, 1288, 75, 75], [3, 1071, 1288, 75, 75], [3, 1071, 1288, 75, 75], [3, 0, 1333, 75, 75], [3, 0, 1333, 75, 75], [3, 78, 1333, 75, 75], [3, 156, 1333, 75, 75], [3, 156, 1333, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1945, 1343, 75, 75], [3, 1377, 1351, 75, 75], [3, 1377, 1351, 75, 75], [3, 1071, 1366, 75, 75], [3, 1071, 1366, 75, 75], [3, 1455, 1408, 75, 75], [3, 1533, 1408, 75, 75], [3, 1533, 1408, 75, 75], [3, 1533, 1408, 75, 75], [3, 1071, 1288, 75, 75]]], [2, [[4, 1497, 3495, 75, 90], [4, 1497, 3495, 75, 90], [4, 1575, 3495, 75, 90], [4, 1575, 3495, 75, 90], [4, 1653, 3495, 75, 90], [4, 1731, 3507, 75, 90], [4, 1809, 3507, 75, 90], [4, 1887, 3507, 75, 90], [4, 1965, 3507, 75, 90], [4, 390, 3528, 75, 90], [4, 390, 3528, 75, 90], [4, 1965, 3507, 75, 90], [4, 1965, 3507, 75, 90], [4, 468, 3528, 75, 90], [4, 468, 3528, 75, 90], [4, 1965, 3507, 75, 90], [4, 1965, 3507, 75, 90], [4, 468, 3528, 75, 90], [4, 468, 3528, 75, 90], [4, 1965, 3507, 75, 90], [4, 1965, 3507, 75, 90], [4, 468, 3528, 75, 90], [4, 468, 3528, 75, 90], [4, 1965, 3507, 75, 90], [4, 1965, 3507, 75, 90], [4, 468, 3528, 75, 90], [4, 468, 3528, 75, 90], [4, 1965, 3507, 75, 90], [4, 1965, 3507, 75, 90], [4, 468, 3528, 75, 90], [4, 468, 3528, 75, 90], [4, 1965, 3507, 75, 90], [4, 1965, 3507, 75, 90], [4, 468, 3528, 75, 90], [4, 468, 3528, 75, 90], [4, 1965, 3507, 75, 90], [4, 546, 3528, 75, 90], [4, 624, 3528, 75, 90], [4, 624, 3528, 75, 90], [4, 1497, 3495, 75, 90], [4, 1497, 3495, 75, 90], [4, 702, 3528, 75, 90], [4, 702, 3528, 75, 90]]], [3, [[4, 1560, 3588, 75, 90], [4, 1560, 3588, 75, 90], [4, 1638, 3588, 75, 90], [4, 1638, 3588, 75, 90], [4, 1716, 3600, 75, 90], [4, 1716, 3600, 75, 90], [4, 1794, 3600, 75, 90], [4, 1872, 3600, 75, 90], [4, 1872, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 1950, 3600, 75, 90], [4, 390, 3621, 75, 90], [4, 390, 3621, 75, 90], [4, 468, 3621, 75, 90], [4, 468, 3621, 75, 90]]], [4, [[4, 1560, 3681, 75, 75], [4, 1638, 3681, 75, 75], [4, 1638, 3681, 75, 75], [4, 1716, 3693, 75, 75], [4, 1716, 3693, 75, 75], [4, 1794, 3693, 75, 75], [4, 1794, 3693, 75, 75], [4, 1872, 3693, 75, 75], [4, 1872, 3693, 75, 75], [4, 1872, 3693, 75, 75], [4, 1950, 3693, 75, 75], [4, 1950, 3693, 75, 75], [4, 546, 3699, 75, 75], [4, 546, 3699, 75, 75], [4, 624, 3699, 75, 75], [4, 624, 3699, 75, 75], [4, 702, 3699, 75, 75], [4, 702, 3699, 75, 75], [4, 702, 3699, 75, 75], [4, 702, 3699, 75, 75], [4, 702, 3699, 75, 75], [4, 702, 3699, 75, 75], [4, 702, 3699, 75, 75], [4, 780, 3699, 75, 75], [4, 780, 3699, 75, 75], [4, 858, 3699, 75, 75], [4, 858, 3699, 75, 75], [4, 936, 3699, 75, 75], [4, 936, 3699, 75, 75], [4, 0, 3708, 75, 75], [4, 0, 3708, 75, 75], [4, 78, 3708, 75, 75], [4, 78, 3708, 75, 75], [4, 156, 3708, 75, 75]]], [5, [[3, 1617, 1487, 75, 75], [3, 1617, 1487, 75, 75], [3, 1695, 1487, 75, 75], [3, 1773, 1487, 75, 75], [3, 0, 1489, 75, 75], [3, 78, 1489, 75, 75], [3, 1773, 1487, 75, 75], [3, 0, 1489, 75, 75], [3, 78, 1489, 75, 75], [3, 1773, 1487, 75, 75], [3, 0, 1489, 75, 75], [3, 78, 1489, 75, 75], [3, 1773, 1487, 75, 75], [3, 0, 1489, 75, 75], [3, 78, 1489, 75, 75], [3, 1773, 1487, 75, 75], [3, 0, 1489, 75, 75], [3, 78, 1489, 75, 75], [3, 1773, 1487, 75, 75], [3, 0, 1489, 75, 75], [3, 156, 1489, 75, 75], [3, 156, 1489, 75, 75], [3, 1851, 1499, 75, 75], [3, 1851, 1499, 75, 75]]], [6, [[5, 1931, 3272, 75, 75], [5, 1931, 3272, 75, 75], [5, 1326, 3274, 75, 75], [5, 1326, 3274, 75, 75], [5, 1404, 3274, 75, 75], [5, 1404, 3274, 75, 75], [5, 1482, 3309, 75, 75], [5, 1482, 3309, 75, 75], [5, 1560, 3313, 75, 75], [5, 1560, 3313, 75, 75], [5, 1482, 3309, 75, 75], [5, 1482, 3309, 75, 75], [5, 1560, 3313, 75, 75], [5, 1560, 3313, 75, 75], [5, 1482, 3309, 75, 75], [5, 1482, 3309, 75, 75], [5, 1560, 3313, 75, 75], [5, 1638, 3313, 75, 75], [5, 1716, 3313, 75, 75], [5, 1794, 3313, 75, 75], [5, 1794, 3313, 75, 75], [5, 0, 3341, 75, 75], [5, 0, 3341, 75, 75]]], [7, [[5, 78, 3343, 75, 75], [5, 78, 3343, 75, 75], [5, 546, 3421, 75, 75], [5, 546, 3421, 75, 75], [5, 624, 3421, 75, 75], [5, 702, 3421, 75, 75], [5, 702, 3421, 75, 75], [5, 780, 3421, 75, 75], [5, 780, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 858, 3421, 75, 75], [5, 0, 3419, 75, 75], [5, 0, 3419, 75, 75], [5, 0, 3419, 75, 75], [5, 78, 3421, 75, 75], [5, 78, 3421, 75, 75]]], [8, [[5, 0, 3497, 75, 75], [5, 0, 3497, 75, 75], [5, 1014, 3421, 75, 75], [5, 1014, 3421, 75, 75], [5, 78, 3499, 75, 75], [5, 78, 3499, 75, 75], [5, 156, 3499, 75, 75], [5, 156, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 78, 3499, 75, 75], [5, 78, 3499, 75, 75], [5, 156, 3499, 75, 75], [5, 156, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 78, 3499, 75, 75], [5, 78, 3499, 75, 75], [5, 156, 3499, 75, 75], [5, 156, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 234, 3499, 75, 75], [5, 78, 3499, 75, 75], [5, 78, 3499, 75, 75], [5, 312, 3499, 75, 75], [5, 312, 3499, 75, 75], [5, 1950, 3428, 75, 75], [5, 1950, 3428, 75, 75], [5, 1326, 3430, 75, 75], [5, 1326, 3430, 75, 75], [5, 1404, 3430, 75, 75], [5, 1404, 3430, 75, 75]]], [9, [[4, 1224, 2262, 150, 150], [4, 1224, 2262, 150, 150], [4, 1377, 2262, 150, 150], [4, 1377, 2262, 150, 150], [4, 1530, 2262, 150, 150], [4, 1530, 2262, 150, 150], [4, 1683, 2262, 150, 150], [4, 1836, 2262, 150, 150], [4, 0, 2292, 150, 150], [4, 0, 2292, 150, 150], [4, 0, 2292, 150, 150], [4, 0, 2292, 150, 150], [4, 0, 2292, 150, 150], [4, 0, 2292, 150, 150], [4, 0, 2292, 150, 150], [4, 0, 2292, 150, 150], [4, 153, 2292, 150, 150], [4, 153, 2292, 150, 150], [4, 153, 2292, 150, 150], [4, 306, 2292, 150, 150], [4, 459, 2292, 150, 150], [4, 459, 2292, 150, 150], [4, 612, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 765, 2292, 150, 150], [4, 918, 2292, 150, 150], [4, 1071, 2292, 150, 150]]], [10, [[4, 1377, 1956, 150, 150], [4, 1377, 1956, 150, 150], [4, 1530, 1956, 150, 150], [4, 1530, 1956, 150, 150], [4, 1530, 1956, 150, 150], [4, 1530, 1956, 150, 150], [4, 1683, 1956, 150, 150], [4, 1683, 1956, 150, 150], [4, 1683, 1956, 150, 150], [4, 1683, 1956, 150, 150], [4, 1836, 1956, 150, 150], [4, 0, 1986, 150, 150], [4, 0, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 153, 1986, 150, 150], [4, 306, 1986, 150, 150], [4, 306, 1986, 150, 150], [4, 459, 1986, 150, 150], [4, 459, 1986, 150, 150], [4, 612, 1986, 150, 150], [4, 612, 1986, 150, 150], [4, 765, 1986, 150, 150], [4, 765, 1986, 150, 150]]], [11, [[5, 765, 765, 150, 150], [5, 765, 765, 150, 150], [5, 918, 765, 150, 150], [5, 1071, 765, 150, 150], [5, 1071, 765, 150, 150], [5, 1224, 765, 150, 150], [5, 1377, 765, 150, 150], [5, 1377, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1530, 765, 150, 150], [5, 1683, 765, 150, 150], [5, 1836, 765, 150, 150], [5, 1836, 765, 150, 150], [5, 0, 795, 150, 150], [5, 0, 795, 150, 150], [5, 765, 765, 150, 150]]], [12, [[5, 1224, 1836, 150, 150], [5, 1224, 1836, 150, 150], [5, 1377, 1836, 150, 150], [5, 1377, 1836, 150, 150], [5, 1530, 1836, 150, 150], [5, 1530, 1836, 150, 150], [5, 1683, 1836, 150, 150], [5, 1683, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 1836, 1836, 150, 150], [5, 0, 1866, 150, 150], [5, 0, 1866, 150, 150], [5, 153, 1989, 150, 150], [5, 153, 1989, 150, 150], [5, 1224, 1836, 150, 150], [5, 1224, 1836, 150, 150]]], [0, mi]])], ["lobby", new Map([[1, [[4, 1989, 0, 56, 68]]], [2, [[4, 1491, 3333, 78, 78], [4, 1572, 3333, 78, 78], [4, 1653, 3333, 78, 78], [4, 1734, 3333, 78, 78], [4, 1815, 3333, 78, 78], [4, 1896, 3333, 78, 78], [4, 459, 3354, 78, 78], [4, 540, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 621, 3354, 78, 78], [4, 702, 3354, 78, 78], [4, 702, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 783, 3354, 78, 78], [4, 864, 3354, 78, 78], [4, 945, 3354, 78, 78], [4, 0, 3363, 78, 78], [4, 81, 3363, 78, 78], [4, 162, 3363, 78, 78], [4, 243, 3363, 78, 78], [4, 324, 3363, 78, 78], [4, 1491, 3414, 78, 78], [4, 1572, 3414, 78, 78], [4, 1653, 3414, 78, 78], [4, 1491, 3333, 78, 78], [4, 1491, 3333, 78, 78]]], [3, [[4, 459, 3210, 126, 141], [4, 459, 3210, 126, 141], [4, 459, 3210, 126, 141], [4, 588, 3210, 126, 141], [4, 588, 3210, 126, 141], [4, 588, 3210, 126, 141], [4, 588, 3210, 126, 141], [4, 717, 3210, 126, 141], [4, 717, 3210, 126, 141], [4, 846, 3210, 126, 141], [4, 846, 3210, 126, 141], [4, 975, 3210, 126, 141], [4, 975, 3210, 126, 141], [4, 1104, 3333, 126, 141], [4, 1104, 3333, 126, 141], [4, 1233, 3333, 126, 141], [4, 1233, 3333, 126, 141], [4, 1362, 3333, 126, 141]]], [4, [[4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1080, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91], [4, 1145, 3741, 62, 91]]], [5, [[5, 1969, 2907, 78, 92], [5, 1969, 2907, 78, 92], [5, 1969, 2907, 78, 92], [5, 1969, 3002, 78, 92], [5, 1969, 3002, 78, 92], [5, 1969, 3002, 78, 92], [5, 1961, 3097, 78, 92], [5, 1961, 3097, 78, 92], [5, 1961, 3097, 78, 92]]], [6, [[5, 1536, 3149, 76, 77], [5, 1615, 3153, 76, 77], [5, 1694, 3153, 76, 77], [5, 1773, 3153, 76, 77], [5, 1852, 3153, 76, 77], [5, 0, 3183, 76, 77], [5, 79, 3185, 76, 77], [5, 158, 3185, 76, 77], [5, 237, 3185, 76, 77], [5, 237, 3185, 76, 77], [5, 237, 3185, 76, 77], [5, 316, 3185, 76, 77], [5, 316, 3185, 76, 77], [5, 316, 3185, 76, 77], [5, 316, 3185, 76, 77], [5, 395, 3185, 76, 77], [5, 395, 3185, 76, 77], [5, 395, 3185, 76, 77], [5, 395, 3185, 76, 77], [5, 474, 3185, 76, 77], [5, 474, 3185, 76, 77], [5, 474, 3185, 76, 77], [5, 474, 3185, 76, 77], [5, 553, 3185, 76, 77], [5, 553, 3185, 76, 77], [5, 553, 3185, 76, 77], [5, 553, 3185, 76, 77], [5, 632, 3185, 76, 77], [5, 632, 3185, 76, 77], [5, 632, 3185, 76, 77], [5, 711, 3185, 76, 77], [5, 711, 3185, 76, 77], [5, 711, 3185, 76, 77], [5, 711, 3185, 76, 77], [5, 237, 3185, 76, 77], [5, 237, 3185, 76, 77], [5, 237, 3185, 76, 77], [5, 237, 3185, 76, 77], [5, 316, 3185, 76, 77], [5, 316, 3185, 76, 77], [5, 316, 3185, 76, 77], [5, 790, 3185, 76, 77], [5, 869, 3185, 76, 77], [5, 948, 3185, 76, 77], [5, 1027, 3185, 76, 77], [5, 1106, 3185, 76, 77], [5, 1185, 3185, 76, 77], [5, 1264, 3185, 76, 77], [5, 1931, 3192, 76, 77], [5, 1536, 3229, 76, 77], [5, 1615, 3233, 76, 77], [5, 1694, 3233, 76, 77], [5, 1773, 3233, 76, 77], [5, 1852, 3233, 76, 77]]], [7, [[5, 1673, 3028, 93, 122], [5, 1673, 3028, 93, 122], [5, 1769, 3028, 93, 122], [5, 1769, 3028, 93, 122], [5, 1769, 3028, 93, 122], [5, 1769, 3028, 93, 122], [5, 1865, 3028, 93, 122], [5, 0, 3058, 93, 122], [5, 0, 3058, 93, 122], [5, 0, 3058, 93, 122], [5, 96, 3060, 93, 122], [5, 96, 3060, 93, 122], [5, 96, 3060, 93, 122], [5, 96, 3060, 93, 122], [5, 192, 3060, 93, 122], [5, 192, 3060, 93, 122], [5, 192, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 384, 3060, 93, 122], [5, 384, 3060, 93, 122], [5, 480, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 288, 3060, 93, 122], [5, 576, 3060, 93, 122], [5, 576, 3060, 93, 122], [5, 576, 3060, 93, 122], [5, 672, 3060, 93, 122], [5, 672, 3060, 93, 122], [5, 672, 3060, 93, 122], [5, 768, 3060, 93, 122], [5, 768, 3060, 93, 122], [5, 768, 3060, 93, 122], [5, 768, 3060, 93, 122], [5, 768, 3060, 93, 122], [5, 864, 3060, 93, 122], [5, 864, 3060, 93, 122], [5, 864, 3060, 93, 122], [5, 864, 3060, 93, 122], [5, 960, 3060, 93, 122], [5, 960, 3060, 93, 122], [5, 1056, 3060, 93, 122], [5, 1056, 3060, 93, 122], [5, 1152, 3060, 93, 122], [5, 1152, 3060, 93, 122], [5, 1248, 3060, 93, 122], [5, 1248, 3060, 93, 122], [5, 1344, 3149, 93, 122], [5, 1344, 3149, 93, 122], [5, 1440, 3149, 93, 122]]], [8, [[5, 1377, 2907, 145, 118], [5, 1377, 2907, 145, 118], [5, 1377, 2907, 145, 118], [5, 1525, 2907, 145, 118], [5, 1525, 2907, 145, 118], [5, 1525, 2907, 145, 118], [5, 1673, 2907, 145, 118], [5, 1673, 2907, 145, 118], [5, 1821, 2907, 145, 118], [5, 1821, 2907, 145, 118], [5, 1821, 2907, 145, 118], [5, 0, 2937, 145, 118], [5, 0, 2937, 145, 118], [5, 0, 2937, 145, 118], [5, 1377, 3028, 145, 118], [5, 1377, 3028, 145, 118], [5, 1525, 3028, 145, 118], [5, 1525, 3028, 145, 118], [5, 1525, 3028, 145, 118]]], [9, [[4, 1224, 2415, 150, 150]]], [10, [[4, 1836, 885, 150, 150]]], [11, [[5, 1836, 0, 150, 150]]], [12, [[5, 459, 1071, 150, 150]]], [0, mi]])], ["ready", new Map([[1, [[4, 1104, 3210, 108, 116]]], [2, [[4, 1026, 3354, 72, 75]]], [3, [[4, 1977, 3333, 66, 75]]], [4, [[4, 468, 3714, 72, 75]]], [5, [[5, 702, 3499, 70, 75]]], [6, [[5, 775, 3499, 66, 75]]], [7, [[5, 909, 3499, 61, 75]]], [8, [[5, 844, 3499, 62, 75]]], [9, [[4, 765, 2139, 150, 150]]], [10, [[4, 1836, 885, 150, 150]]], [11, [[5, 1836, 0, 150, 150]]], [12, [[5, 459, 1071, 150, 150]]], [0, mi]])]])
      , Ym = [{
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 16,
            y: 7.7
        },
        c: {
            f: 24,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 16,
            y: 7.7
        },
        c: {
            f: 24,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 35,
            y: -16
        },
        c: {
            f: 72,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 16,
            y: 5
        },
        c: {
            f: 24,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 10,
            y: -8
        },
        c: {
            f: 18,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 13,
            y: 5
        },
        c: {
            f: 24,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 21,
            y: -5
        },
        c: {
            f: 42,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 21,
            y: 8
        },
        c: {
            f: 42,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 13,
            y: 5
        },
        c: {
            f: 24,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 35,
            y: -16
        },
        c: {
            f: 72,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 13,
            y: 5
        },
        c: {
            f: 24,
            y: 0
        }
    }, {
        a: {
            f: 1,
            y: 0
        },
        b: {
            f: 13,
            y: 5
        },
        c: {
            f: 24,
            y: 0
        }
    }];
    var an = class extends K {
    }
    ;
    var bn = class extends K {
        constructor() {
            super()
        }
    }
    ;
    var cn = class extends K {
    }
    ;
    function dn(a, b) {
        Cd(a, 1, b)
    }
    var en = class extends K {
        getId() {
            return Fd(this, 1)
        }
    }
      , fn = [0, je, te, ge, ge, qe, 2, [0, te, 2, te, le], qe, [0], qe, [0, te, je, je], qe, [0], qe, [0]];
    var gn = class extends K {
    }
    ;
    gn.kc = [1];
    var hn = [0, ke];
    var jn = class extends K {
        Mc(a) {
            Cd(this, 3, a)
        }
    }
      , kn = [0, te, le, je];
    var ln = class extends K {
    }
      , mn = [0, te];
    var nn = class extends K {
        getType() {
            return H(this, 1, 0)
        }
    }
      , on = [0, te];
    var pn = class extends K {
        getType() {
            return H(this, 1, 0)
        }
    }
      , qn = [0, te, te];
    var rn = class extends K {
    }
      , sn = [0, ge, ge];
    var tn = class extends K {
        getType() {
            return H(this, 1, 0)
        }
    }
      , un = [0, te, je];
    var vn = class extends K {
    }
    ;
    vn.kc = [7, 9, 13, 14, 15];
    var wn = class extends K {
        getId() {
            return Fd(this, 1)
        }
        getPlayerState() {
            return G(this, vn, 3)
        }
    }
      , xn = [0, je, te, qe, [0, ge, ge, je, te, je, 2, re, sn, le, ke, le, le, 2, re, qn, re, un, re, on, le, ge, le, je, je, ne], qe, kn, qe, hn, qe, mn, qe, [0, te]];
    var yn = [0, te];
    var zn = class extends K {
    }
      , An = [0, je];
    var Bn = class extends K {
        getId() {
            return Fd(this, 1)
        }
    }
      , Cn = [0, je, ne, ie, ne];
    var Dn = class extends K {
        constructor() {
            super()
        }
    }
    ;
    var En = class extends K {
        constructor() {
            super()
        }
    }
      , Fn = [0, ne, qe, [0, ie, ie], ne];
    var Gn = class extends K {
        getId() {
            return Fd(this, 1)
        }
    }
      , Hn = [0, je, ge, ge, le];
    var In = class extends K {
    }
      , Jn = [0, ie];
    var Kn = class extends K {
    }
      , Ln = [2, 3, 4]
      , Mn = [0, ne, pe, Ln, he, Ln, me, Ln];
    var Nn = class extends K {
    }
    ;
    Nn.kc = [2];
    var On = [0, re, 2, Mn, ne, je];
    var Pn = class extends K {
    }
      , Qn = [0, je, te];
    var Rn = class extends K {
    }
    ;
    Rn.kc = [10];
    var Sn = [0, je, 3, je, je, le, le, te, re, 2, Qn];
    var Tn = class extends K {
        getId() {
            return Fd(this, 1)
        }
    }
      , Un = [0, je, ge, ge, ge, ge, le];
    var Vn = class extends K {
    }
    ;
    Vn.kc = [1];
    var Wn = class extends K {
    }
    ;
    var Xn = class extends K {
        getId() {
            return Fd(this, 1)
        }
    }
    ;
    var Yn = class extends K {
        getType() {
            return H(this, 1, 0)
        }
    }
      , Zn = [0, te, je, le, qe, Fn, qe, Cn, qe, 2, On, qe, An, qe, [0, qe, fn, qe, xn], qe, [0, je], qe, Sn, qe, Hn, qe, xn, qe, Un, qe, [0, re, Mn], qe, yn, qe, Jn];
    /*

 copyright (c) 2006-2007 Erin Catto http://www.gphysics.com

 This software is provided 'as-is', without any express or implied
 warranty.  In no event will the authors be held liable for any damages
 arising from the use of this software.
 Permission is granted to anyone to use this software for any purpose,
 including commercial applications, and to alter it and redistribute it
 freely, subject to the following restrictions:
 1. The origin of this software must not be misrepresented; you must not
 claim that you wrote the original software. If you use this software
 in a product, an acknowledgment in the product documentation would be
 appreciated but is not required.
 2. Altered source versions must be plainly marked as such, and must not be
 misrepresented as being the original software.
 3. This notice may not be removed or altered from any source distribution.
*/
    function $n(a, b) {
        this.x = a;
        this.y = b
    }
    var ao = [];
    function Y(a, b) {
        if (0 < ao.length) {
            var c = ao.pop();
            c.set(a, b);
            return c
        }
        return new $n(a,b)
    }
    function Z(a) {
        null != a && ao.push(a)
    }
    function bo(a) {
        a.x = 0;
        a.y = 0
    }
    r = $n.prototype;
    r.set = function(a, b) {
        this.x = a;
        this.y = b
    }
    ;
    r.Ca = function(a) {
        this.x = a.x;
        this.y = a.y
    }
    ;
    function co(a) {
        return Y(-a.x, -a.y)
    }
    function eo(a) {
        a.x = -a.x;
        a.y = -a.y
    }
    function fo(a) {
        return Y(a.x, a.y)
    }
    r.add = function(a) {
        this.x += a.x;
        this.y += a.y
    }
    ;
    function go(a, b) {
        a.x *= b;
        a.y *= b
    }
    r.abs = function() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y)
    }
    ;
    r.length = function() {
        return Math.sqrt(ho(this))
    }
    ;
    function ho(a) {
        return a.x * a.x + a.y * a.y
    }
    function io(a) {
        var b = a.length();
        b < Number.MIN_VALUE || (b = 1 / b,
        a.x *= b,
        a.y *= b)
    }
    r.Vc = function() {
        return isFinite(this.x) && isFinite(this.y)
    }
    ;
    function jo(a) {
        const b = {
            x: 0,
            y: 0
        };
        if (a.Ve && a.Wa) {
            var c = a.Wa
              , d = ((new Date).getTime() - c.t) / 1E3;
            if (d < +ko(a, "sync_dt_threshold")) {
                var e = a.body.va.position;
                const f = c.x + c.Md * d
                  , g = c.y + c.Nd * d
                  , h = +ko(a, "sync_slip_time")
                  , k = Math.sqrt((f - e.x) * (f - e.x) + (g - e.y) * (g - e.y));
                d = Math.sqrt(c.Md * c.Md + c.Nd * c.Nd) * (h + d) + +ko(a, "sync_epsilon");
                !a.Wd && k > d ? (c = a.body,
                e = Y(f + (e.x - f) * d / k, g + (e.y - g) * d / k),
                lo(c, e, c.ha.a)) : (c = +ko(a, "sync_coefficient"),
                b.x = (f - e.x) * k / d * c,
                b.y = (g - e.y) * k / d * c)
            }
            a.Wd = !0
        }
        return b
    }
    function ko(a, b) {
        return a.settings.get(b)
    }
    var po = class {
        constructor(a, b, c) {
            this.Ba = a;
            this.settings = b;
            this.config = c;
            this.body = null;
            this.angle = 1;
            this.Wa = this.Ve = null;
            this.Wd = this.Vd = !1;
            this.alpha = 1;
            this.id = c.getId();
            this.type = H(c, 2, 0);
            this.g = Y(Gd(c, 3), Gd(c, 4))
        }
        getId() {
            return this.id
        }
        getType() {
            return this.type
        }
        Sd() {
            return !1
        }
        O() {
            const a = this.body.va.position;
            this.g.x = a.x;
            this.g.y = a.y
        }
        mc(a) {
            if (Ed(a, 6)) {
                var b = this.body
                  , c = Y(Gd(a, 2), Gd(a, 3));
                lo(b, c, b.ha.a);
                mo(this.body, Y(Gd(a, 4), Gd(a, 5)))
            } else
                this.Ve = a,
                this.Wa = {
                    x: Gd(a, 2),
                    y: Gd(a, 3),
                    Md: Gd(a, 4),
                    Nd: Gd(a, 5),
                    t: (new Date).getTime()
                },
                this.Wd = !1
        }
        Cc() {
            const a = jo(this)
              , b = this.body.ka;
            b.x += a.x;
            b.y += a.y;
            mo(this.body, b);
            b.x && (this.angle = Math.PI + Math.atan2(-b.x, b.y))
        }
        Ja() {
            return Ol.get(this.type) || 0
        }
        isVisible() {
            return !0
        }
        render() {}
        Ud(a) {
            var b = this.body.va.position;
            const c = this.body.ka
              , d = new Tn;
            Cd(d, 1, this.id);
            zd(d, 2, b.x);
            zd(d, 3, b.y);
            zd(d, 4, c.x);
            zd(d, 5, c.y);
            Bd(d, 6, !1);
            b = new Yn;
            F(b, 1, 11);
            Cd(b, 2, this.id);
            a ? (Bd(d, 6, !0),
            Bd(b, 3, !0),
            yd(b, 14, d),
            no(this.Ba.ud, b)) : (yd(b, 14, d),
            this.Ba.Yd(b))
        }
        ya() {
            this.Vd = !0
        }
        Ge() {
            return this.Vd
        }
        dispose(a) {
            var b = this.body;
            b && oo(a.o, b)
        }
    }
    ;
    function qo() {
        this.i = 0;
        this.g = Y(0, 0);
        this.I = 0
    }
    var ro = [];
    qo.prototype.Ca = function(a, b, c) {
        this.i = a;
        this.g.Ca(b);
        this.I = c
    }
    ;
    qo.prototype.set = function(a, b, c, d) {
        this.i = a;
        this.g.set(b, c);
        this.I = d
    }
    ;
    function so() {
        this.ab = Y(0, 0);
        this.Db = Y(0, 0);
        this.w = Y(0, 0);
        this.Za = this.Ya = this.a = 0
    }
    so.prototype.set = function(a) {
        this.ab.Ca(a.ab);
        this.Db.Ca(a.Db);
        this.w.Ca(a.w);
        this.a = a.a;
        this.Ya = a.Ya;
        this.Za = a.Za
    }
    ;
    function to() {
        this.T = Y(0, 0);
        this.U = Y(0, 0);
        this.T.set(1, 0);
        this.U.set(0, 1)
    }
    var uo = [];
    function vo() {
        if (0 < uo.length) {
            var a = uo.pop();
            a.T.set(0, 0);
            a.U.set(0, 0);
            return a
        }
        return new to
    }
    to.prototype.set = function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.T.set(b, a);
        this.U.set(-a, b)
    }
    ;
    to.prototype.abs = function() {
        this.T.abs();
        this.U.abs()
    }
    ;
    function wo(a, b) {
        return a.x * b.x + a.y * b.y
    }
    function xo(a, b) {
        return a.x * b.y - a.y * b.x
    }
    function yo(a) {
        return Y(a.y, -1 * a.x)
    }
    function zo(a, b) {
        return Y(a.T.x * b.x + a.U.x * b.y, a.T.y * b.x + a.U.y * b.y)
    }
    function Ao(a, b) {
        return Y(wo(b, a.T), wo(b, a.U))
    }
    function Bo(a, b) {
        b = zo(a.R, b);
        b.x += a.position.x;
        b.y += a.position.y;
        return b
    }
    function Co(a, b) {
        return Y(a.x - b.x, a.y - b.y)
    }
    function Do(a, b, c) {
        return a < b ? b : a > c ? c : a
    }
    ;function Eo(a) {
        if (!a)
            throw Error("K");
    }
    var Fo = .5 * Math.PI
      , Go = Fo * Fo
      , Ho = 2 / 180 * Math.PI
      , Io = Number.MIN_VALUE * Number.MIN_VALUE;
    function Jo() {
        this.i = new so;
        this.j = new so;
        this.u = new so;
        this.o = [this.i, this.j, this.u];
        this.g = 0
    }
    var Ko = [];
    function Lo(a) {
        if (1 == a.g)
            return 0;
        if (2 == a.g) {
            var b = Co(a.i.w, a.j.w);
            a = b.length();
            Z(b);
            return a
        }
        if (3 == a.g) {
            b = Co(a.j.w, a.i.w);
            var c = Co(a.u.w, a.i.w);
            a = xo(b, c);
            Z(b);
            Z(c);
            return a
        }
        Eo(!1);
        return 0
    }
    ;function Mo(a, b, c) {
        if (0 < Ko.length) {
            var d = Ko.pop();
            for (var e = 0; e < d.o.length; e++) {
                var f = d.o[e];
                null != f.ab && f.ab.set(0, 0);
                null != f.Db && f.Db.set(0, 0);
                null != f.w && f.w.set(0, 0);
                f.Ya = 0;
                f.Za = 0;
                f.a = 0
            }
        } else
            d = new Jo;
        e = d;
        f = c.g;
        var g = c.j
          , h = c.i
          , k = c.o;
        Eo(0 <= b.count && 3 >= b.count);
        e.g = b.count;
        for (var l = e.o, m = 0; m < e.g; m++) {
            var n = l[m];
            n.Ya = b.Ya[m];
            n.Za = b.Za[m];
            var q = No(f, n.Ya);
            var t = No(h, n.Za);
            Z(n.ab);
            Z(n.Db);
            Z(n.w);
            n.ab = Bo(g, q);
            n.Db = Bo(k, t);
            n.w = Co(n.Db, n.ab);
            n.a = 0
        }
        1 < e.g && (q = b.g,
        t = Lo(e),
        t < .5 * q || 2 * q < t || t < Number.MIN_VALUE) && (e.g = 0);
        0 == e.g && (n = l[0],
        n.Ya = 0,
        n.Za = 0,
        q = No(f, 0),
        t = No(h, 0),
        Z(n.ab),
        Z(n.Db),
        Z(n.w),
        n.ab = Bo(g, q),
        n.Db = Bo(k, t),
        n.w = Co(n.Db, n.ab),
        e.g = 1);
        (1 > d.g || 3 < d.g) && Eo(!1);
        for (e = 0; 20 > e; ) {
            f = [];
            for (g = 0; g < d.g; g++)
                f[g] = {},
                f[g].Ya = d.o[g].Ya,
                f[g].Za = d.o[g].Za;
            if (2 == d.g)
                g = d,
                k = g.i.w,
                l = g.j.w,
                h = Co(l, k),
                k = -(k.x * h.x + k.y * h.y),
                0 >= k ? (Z(h),
                g.i.a = 1,
                g.g = 1) : (l = l.x * h.x + l.y * h.y,
                Z(h),
                0 >= l ? (g.j.a = 1,
                g.g = 1,
                g.i.set(g.j)) : (h = 1 / (l + k),
                g.i.a = l * h,
                g.j.a = k * h,
                g.g = 2));
            else if (3 == d.g) {
                g = d;
                q = g.i.w;
                t = g.j.w;
                n = g.u.w;
                var w = Co(t, q);
                h = wo(t, w);
                k = -wo(q, w);
                var p = Co(n, q)
                  , v = wo(q, p);
                l = wo(n, p);
                m = xo(w, p);
                Z(w);
                Z(p);
                w = -v;
                v = Co(n, t);
                var C = wo(t, v);
                p = wo(n, v);
                Z(v);
                v = -C;
                C = m * xo(t, n);
                n = m * xo(n, q);
                q = m * xo(q, t);
                0 >= k && 0 >= w ? (g.i.a = 1,
                g.g = 1) : 0 < h && 0 < k && 0 >= q ? (l = 1 / (h + k),
                g.i.a = h * l,
                g.j.a = k * l,
                g.g = 2) : 0 < l && 0 < w && 0 >= n ? (h = 1 / (l + w),
                g.i.a = l * h,
                g.u.a = w * h,
                g.g = 2,
                g.j.set(g.u)) : 0 >= h && 0 >= v ? (g.j.a = 1,
                g.g = 1,
                g.i.set(g.j)) : 0 >= l && 0 >= p ? (g.u.a = 1,
                g.g = 1,
                g.i.set(g.u)) : 0 < p && 0 < v && 0 >= C ? (h = 1 / (p + v),
                g.j.a = p * h,
                g.u.a = v * h,
                g.g = 2,
                g.i.set(g.u)) : (h = 1 / (C + n + q),
                g.i.a = C * h,
                g.j.a = n * h,
                g.u.a = q * h,
                g.g = 3)
            }
            if (3 == d.g)
                break;
            h = d;
            1 == h.g ? g = co(h.i.w) : 2 == h.g ? (g = Co(h.j.w, h.i.w),
            h = co(h.i.w),
            k = xo(g, h),
            Z(h),
            h = 0 < k ? Y(-1 * g.y, g.x) : yo(g),
            Z(g),
            g = h) : (Eo(!1),
            g = Y(0, 0));
            if (ho(g) < Io) {
                Z(g);
                break
            }
            Z(d.o[d.g].ab);
            Z(d.o[d.g].Db);
            Z(d.o[d.g].w);
            h = co(g);
            k = Ao(c.j.R, h);
            Z(h);
            d.o[d.g].Ya = Oo(c.g, k);
            Z(k);
            d.o[d.g].ab = Bo(c.j, No(c.g, d.o[d.g].Ya));
            h = Ao(c.o.R, g);
            Z(g);
            d.o[d.g].Za = Oo(c.i, h);
            Z(h);
            d.o[d.g].Db = Bo(c.o, No(c.i, d.o[d.g].Za));
            d.o[d.g].w = Co(d.o[d.g].Db, d.o[d.g].ab);
            e++;
            h = !1;
            for (g = 0; g < f.length; g++)
                if (d.o[d.g].Ya == f[g].Ya && d.o[d.g].Za == f[g].Za) {
                    h = !0;
                    break
                }
            if (h)
                break;
            d.g++
        }
        e = d;
        f = a.g;
        g = a.i;
        1 == e.g ? (f.Ca(e.i.ab),
        g.Ca(e.i.Db)) : 2 == e.g ? (f.x = e.i.a * e.i.ab.x + e.j.a * e.j.ab.x,
        f.y = e.i.a * e.i.ab.y + e.j.a * e.j.ab.y,
        g.x = e.i.a * e.i.Db.x + e.j.a * e.j.Db.x,
        g.y = e.i.a * e.i.Db.y + e.j.a * e.j.Db.y) : 3 == e.g ? (g.x = f.x = e.i.a * e.i.ab.x + e.j.a * e.j.ab.x + e.u.a * e.u.ab.x,
        g.y = f.y = e.i.a * e.i.ab.y + e.j.a * e.j.ab.y + e.u.a * e.u.ab.y) : Eo(!1);
        e = Co(a.g, a.i);
        a.j = e.length();
        Z(e);
        e = d;
        b.g = Lo(e);
        b.count = e.g;
        f = e.o;
        for (g = 0; g < e.g; g++)
            b.Ya[g] = f[g].Ya,
            b.Za[g] = f[g].Za;
        null != d && Ko.push(d);
        c.u && (b = c.g.i,
        c = c.i.i,
        a.j > b + c && a.j > Number.MIN_VALUE ? (a.j -= b + c,
        d = Co(a.i, a.g),
        io(d),
        a.g.x += b * d.x,
        a.g.y += b * d.y,
        a.i.x -= c * d.x,
        a.i.y -= c * d.y,
        Z(d)) : (c = Y(0, 0),
        c.x = .5 * (a.g.x + a.i.x),
        c.y = .5 * (a.g.y + a.i.y),
        a.g.x = a.i.x = c.x,
        a.g.y = a.i.y = c.y,
        a.j = 0,
        Z(c)))
    }
    ;function Po() {
        this.u = !1;
        this.o = this.j = this.i = this.g = null
    }
    ;function Qo() {
        this.g = Y(0, 0);
        this.i = Y(0, 0);
        this.j = 0
    }
    ;function Ro() {
        this.i = this.j = 0;
        this.g = []
    }
    Ro.prototype.set = function(a) {
        a.we(this)
    }
    ;
    function Oo(a, b) {
        for (var c = 0, d = a.g[0].x * b.x + a.g[0].y * b.y, e = 1; e < a.j; e++) {
            var f = a.g[e].x * b.x + a.g[e].y * b.y;
            f > d && (c = e,
            d = f)
        }
        return c
    }
    function So(a, b) {
        return a.g[Oo(a, b)]
    }
    function No(a, b) {
        void 0 === b && (b = 0);
        Eo(0 <= b && b < a.j);
        return a.g[b]
    }
    ;function To() {
        this.Ya = [0, 0, 0];
        this.Za = [0, 0, 0]
    }
    ;function Uo() {
        this.j = .005
    }
    r = Uo.prototype;
    r.getTypeName = function() {
        return ia()
    }
    ;
    r.Pd = function() {
        return ia()
    }
    ;
    r.set = function(a) {
        this.j = a.j
    }
    ;
    r.Sc = function() {
        ia()
    }
    ;
    r.fe = function() {
        ia()
    }
    ;
    r.we = function() {
        ia()
    }
    ;
    function Vo() {
        this.position = Y(0, 0);
        this.R = vo()
    }
    Vo.prototype.set = function(a) {
        this.position.Ca(a.position);
        var b = this.R;
        a = a.R;
        b.T.Ca(a.T);
        b.U.Ca(a.U)
    }
    ;
    function Wo() {
        this.j = .005;
        this.u = Y(0, 0);
        this.g = [];
        this.o = 0;
        this.i = []
    }
    sa(Wo, Uo);
    r = Wo.prototype;
    r.getTypeName = function() {
        return "PolygonShape"
    }
    ;
    r.Pd = function() {
        var a = new Wo;
        a.set(this);
        return a
    }
    ;
    r.set = function(a) {
        Wo.Qb.set.call(this, a);
        if (a instanceof Wo) {
            this.u.Ca(a.u);
            this.o = a.o;
            Xo(this, this.o);
            for (var b = 0; b < this.o; b++)
                this.g[b].Ca(a.g[b]),
                this.i[b].Ca(a.i[b])
        }
    }
    ;
    function Yo(a, b) {
        var c = new Wo;
        c.o = 4;
        Xo(c, 4);
        c.g[0].set(-a, -b);
        c.g[1].set(a, -b);
        c.g[2].set(a, b);
        c.g[3].set(-a, b);
        c.i[0].set(0, -1);
        c.i[1].set(1, 0);
        c.i[2].set(0, 1);
        c.i[3].set(-1, 0);
        bo(c.u);
        return c
    }
    function Zo(a, b) {
        var c = new Wo;
        c.o = 2;
        Xo(c, 2);
        c.g[0].Ca(a);
        c.g[1].Ca(b);
        c.u.x = .5 * (a.x + b.x);
        c.u.y = .5 * (a.y + b.y);
        a = Co(b, a);
        b = yo(a);
        Z(a);
        c.i[0] = b;
        io(c.i[0]);
        c.i[1].x = -c.i[0].x;
        c.i[1].y = -c.i[0].y;
        return c
    }
    r.Sc = function(a, b) {
        for (var c = b.R, d = this.g[0], e = b.position.x + (c.T.x * d.x + c.U.x * d.y), f = b.position.y + (c.T.y * d.x + c.U.y * d.y), g = e, h = f, k = 1; k < this.o; ++k) {
            d = this.g[k];
            var l = b.position.x + (c.T.x * d.x + c.U.x * d.y);
            d = b.position.y + (c.T.y * d.x + c.U.y * d.y);
            e = e < l ? e : l;
            f = f < d ? f : d;
            g = g > l ? g : l;
            h = h > d ? h : d
        }
        a.g.x = e - this.j;
        a.g.y = f - this.j;
        a.i.x = g + this.j;
        a.i.y = h + this.j
    }
    ;
    r.fe = function(a, b) {
        if (2 == this.o)
            a.g.x = .5 * (this.g[0].x + this.g[1].x),
            a.g.y = .5 * (this.g[0].y + this.g[1].y),
            a.i = 0,
            a.I = 0;
        else {
            for (var c = 0, d = 0, e = 0, f = 0, g = 1 / 3, h = 0; h < this.o; ++h) {
                var k = this.g[h]
                  , l = h + 1 < this.o ? this.g[h + 1] : this.g[0]
                  , m = k.x
                  , n = k.y
                  , q = l.x
                  , t = l.y
                  , w = m * t - n * q
                  , p = .5 * w;
                e += p;
                c += p * g * (k.x + l.x);
                d += p * g * (k.y + l.y);
                k = m;
                f += w * (g * (.25 * (k * k + q * k + q * q) + (0 * k + 0 * q)) + g * (.25 * (n * n + t * n + t * t) + (0 * n + 0 * t)))
            }
            a.set(b * e, 1 / e * c, 1 / e * d, b * f)
        }
    }
    ;
    r.we = function(a) {
        var b = this.j
          , c = this.g;
        a.j = this.o;
        a.i = b;
        a.g = c
    }
    ;
    function Xo(a, b) {
        for (var c = 0; c < a.g.length; c++)
            Z(a.g[c]),
            Z(a.i[c]);
        a.g = [];
        a.i = [];
        for (c = 0; c < b; c++)
            a.g[c] = Y(0, 0),
            a.i[c] = Y(0, 0)
    }
    vo();
    function $o() {
        this.position = Y(0, 0);
        this.V = Y(0, 0);
        this.j = this.O = this.o = this.angle = 0;
        this.u = this.i = !0;
        this.v = this.H = !1;
        this.type = 0;
        this.active = !0;
        this.g = 1
    }
    ;function ap() {
        this.g = 1;
        this.i = 65535;
        this.j = 0
    }
    ;function bp() {
        this.filter = new ap;
        this.filter.g = 1;
        this.filter.i = 65535;
        this.filter.j = 0;
        this.g = null;
        this.H = .2;
        this.i = this.oa = 0;
        this.j = !1
    }
    ;var ep = class extends po {
        constructor(a, b, c, d) {
            super(a, b, c);
            this.i = d;
            a = G(c, an, 8);
            this.Sa = H(a, 1, 0);
            this.width = Fd(a, 2);
            this.height = Fd(a, 3);
            a = new $o;
            a.type = 0;
            a.position.set(this.g.x, this.g.y);
            this.body = cp(d.o, a);
            this.body.Ie = this;
            d = new bp;
            d.j = !0;
            d.g = Yo(this.width, this.height);
            d.filter.g = 4;
            d.filter.i = 3;
            dp(this.body, d);
            d.j = !1;
            d.filter.i = 1 === this.Sa ? 2 : 1;
            dp(this.body, d)
        }
    }
    ;
    var fp = class extends ep {
        constructor(a, b, c, d) {
            super(a, b, c, d);
            this.state = null;
            this.j = {
                radius: Math.sqrt(this.width * this.width + this.height * this.height) + 5,
                ue: 0,
                Sa: this.Sa,
                Fd: null,
                Cd: !0,
                visible: !0
            }
        }
        render() {}
        update() {
            if (this.state) {
                var a = this
                  , b = Ad(this.state, 1);
                for (let c = 0; c < b.length; c++) {
                    const d = this.i.v.get(b[c]);
                    d && (d.H(a, c + 1),
                    a = d)
                }
            }
        }
        O() {
            if (this.state)
                for (const a of Ad(this.state, 1)) {
                    const b = this.i.v.get(a);
                    b && b.O()
                }
        }
        le() {
            return this.j
        }
    }
    ;
    const gp = Pl()
      , hp = lh.Ua()
      , ip = [-.5, -1]
      , jp = [0, 0];
    function kp(a, b, c, d, e) {
        const f = b[3]
          , g = b[4]
          , h = document.createElement("canvas");
        h.width = f;
        h.height = g;
        const k = h.getContext("2d");
        hh(hp, k, b);
        b = PIXI.TilingSprite.from(h, Math.ceil(M / (f * e * .5)) * f, Math.ceil(Sg / (g * e * .5)) * g);
        b.blendMode = c;
        b.alpha = d;
        e /= 25;
        b.scale.set(e);
        a.ld.push(f * e);
        a.kd.push(g * e);
        a.g.addChild(b)
    }
    function lp(a, b) {
        const c = a.g.children[b];
        c.tilePosition.set(25 * ip[b] * a.i / 1E3, 25 * jp[b] * a.i / 1E3);
        const d = a.ld[b];
        a = a.kd[b];
        c.position.set(Math.floor(gp.left / d) * d, Math.floor(gp.top / a) * a)
    }
    var mp = class extends yi {
        constructor() {
            super();
            this.ld = [];
            this.kd = [];
            this.i = 0;
            this.j = PIXI.autoDetectRenderer({
                antialias: !0,
                clearBeforeRender: !1,
                preserveDrawingBuffer: !0,
                view: N,
                powerPreference: "high-performance",
                forceCanvas: !0,
                width: N.width,
                height: N.height
            });
            this.j.plugins.interaction.destroy();
            this.g = new PIXI.Container;
            kp(this, Kh, PIXI.BLEND_MODES.SCREEN, .5, 1);
            kp(this, Lh, PIXI.BLEND_MODES.MULTIPLY, .15, 1.5)
        }
        ub() {
            super.ub();
            this.g.destroy(!0);
            this.j.destroy(!1)
        }
        update(a) {
            this.i += a
        }
        render() {
            lp(this, 0);
            lp(this, 1);
            this.g.scale.set(gp.g);
            this.g.position.set(Wl(gp, 0), Xl(gp, 0));
            this.j.render(this.g)
        }
    }
    ;
    var op = class {
        constructor(a) {
            this.ud = a
        }
        xd(a) {
            no(this.ud, a)
        }
        Yd(a) {
            no(this.ud, a)
        }
        g() {
            var a = this.ud;
            0 < xd(a.i, Yn, 1).length && (a.sendMessage(a.i),
            a.i = new np)
        }
    }
      , pp = class extends op {
        constructor() {
            super()
        }
        xd() {}
        Yd() {}
        g() {}
    }
    ;
    var rp = (a, b, c) => {
        if (!qp)
            return b;
        let d;
        try {
            d = window.sessionStorage.getItem(a)
        } catch (e) {
            return b
        }
        if (null == d)
            return b;
        a = JSON.parse(d);
        return c && !c(a) ? b : a
    }
    , sp = (a, b, c) => {
        if (qp && (!c || c(b)))
            try {
                window.sessionStorage.setItem(a, JSON.stringify(b))
            } catch (d) {}
    }
    , tp;
    try {
        tp = !!self.sessionStorage
    } catch (a) {
        tp = !1
    }
    var qp = tp;
    var vp = () => {
        const a = rp("halloween21.client.match_config", null, up);
        if (!a)
            return null;
        const b = a.timestamp;
        return !b || 15E4 < Date.now() - b ? (sp("halloween21.client.match_config", null),
        null) : a
    }
    ;
    function up(a) {
        return a ? void 0 !== a.url && void 0 !== a.match && void 0 !== a.player && void 0 !== a.nonce && void 0 !== a.timestamp : !1
    }
    ;function wp(a, b) {
        var c = a.La;
        const d = E(c);
        Fc(d);
        c = wd(c, d, Yn, 1, 2);
        b = null != b ? b : new Yn;
        c.push(b);
        b.bc() && tc(c, 8);
        return a
    }
    var np = class extends K {
    }
    ;
    np.kc = [1];
    var xp = [0, re, Zn]
      , yp = ue(np, xp);
    np.prototype.g = ve(xp);
    function no(a, b) {
        if (Ed(b, 3))
            wp(a.i, b);
        else {
            var c = "" + b.getType();
            Fd(b, 2) && (c += "_" + Fd(b, 2));
            var d = a.o.get(c);
            b == d || b && d && b instanceof d.constructor && Yc(b, d) || (a.o.set(c, b),
            wp(a.i, b))
        }
    }
    var zp = class {
        constructor() {
            this.o = new Map;
            this.i = new np
        }
    }
    ;
    var Ap = {
        Hd: a => a.g(),
        Pe: a => yp(a),
        jf: "h21.MessageContainer",
        ff: "h21.MessageContainer"
    };
    function Bp(a, b) {
        const c = new En;
        F(c, 1, Oc(a.Ic));
        if (a.Lc) {
            const d = new Dn;
            yd(c, 2, d);
            F(d, 1, Mc(a.Lc.player));
            F(d, 2, Mc(a.Lc.nonce))
        }
        b && F(c, 3, Oc(b));
        a = new Yn;
        F(a, 1, 1);
        yd(a, 4, c);
        return a
    }
    ;function Cp(a) {
        return u(function*() {
            for (; a.i < a.j; ) {
                a.i++;
                if (yield a.v())
                    return a.u(a.i),
                    !0;
                yield new Promise(b => void setTimeout(b, a.g));
                a.g *= 2
            }
            a.o();
            return !1
        })
    }
    var Dp = class {
        constructor(a, b, c, d= () => {}
        , e= () => {}
        ) {
            this.v = a;
            this.g = b;
            this.j = c;
            this.u = d;
            this.o = e;
            this.i = 0
        }
    }
    ;
    const Ep = Ie(".cloud.doodles.goog")
      , Fp = Ie("gs.")
      , Gp = Ie("wss");
    function Hp(a) {
        a = Ff(a);
        return a.j === He(Gp) && a.i.startsWith(He(Fp)) && a.i.endsWith(He(Ep)) && !a.u && "" === a.g.toString() && null == a.H ? !0 : !1
    }
    ;function Ip(a) {
        var b = {
            Bc: Ap,
            Ld: !0
        }
          , c = Jp;
        return u(function*() {
            if (!Hp(a))
                throw Error("L`" + a);
            const d = new c(b);
            if (!(yield Cp(new Dp( () => u(function*() {
                try {
                    return yield d.connect(a),
                    !0
                } catch (e) {
                    return !1
                }
            }),500,3,e => void console.log("Connecting to", a, "- attempt", e), () => void console.log("Could not connect to", a)))))
                throw Error("M");
            return d
        })
    }
    ;function Kp(a) {
        return "string" === typeof a
    }
    ;function Lp(a, b) {
        console.warn("WARN: %s%s", a.g, b)
    }
    var Mp = class {
        constructor() {
            this.g = ""
        }
        error(a) {
            console.error("ERROR: %s%s", this.g, a)
        }
        log(a, b=2) {
            2 >= b && console.log("INFO: %s%s", this.g, a)
        }
    }
    ;
    function Np() {
        let a, b;
        const c = new Promise( (d, e) => {
            a = d;
            b = e
        }
        );
        return new Op(c,a,b)
    }
    function Pp(a) {
        a.g = !0;
        a.i && (clearTimeout(a.i),
        a.i = void 0)
    }
    function Qp(a, b) {
        a.g || (Pp(a),
        a.o(b))
    }
    function Rp(a, b) {
        a.g || (Pp(a),
        a.j(b))
    }
    function Sp(a) {
        a.g || (a.i = window.setTimeout( () => {
            Rp(a, "timed out")
        }
        , 250))
    }
    var Op = class {
        constructor(a, b, c) {
            this.promise = a;
            this.o = b;
            this.j = c;
            this.g = !1
        }
    }
    ;
    var Tp = class {
        constructor() {
            this.g = Np()
        }
        set(a) {
            this.value = a;
            Qp(this.g, a)
        }
        get() {
            return void 0 !== this.value ? Promise.resolve(this.value) : this.g.promise
        }
    }
    ;
    let Up = 0;
    function Vp(a, b, ...c) {
        a = [...a.g[b].entries()].sort( (d, e) => d[0].localeCompare(e[0]));
        for (const [,d] of a)
            d(...c)
    }
    var Wp = class {
        constructor() {
            this.g = {
                [0]: new Map,
                [2]: new Map,
                [1]: new Map,
                [3]: new Map
            }
        }
        addListener(a, b) {
            const c = `${a}${Up++}`;
            this.g[a].set(c, b);
            return c
        }
        removeListener(a, b) {
            b ? this.g[a].delete(b) : this.g[a].clear()
        }
        reset() {
            this.g = {
                [0]: new Map,
                [2]: new Map,
                [1]: new Map,
                [3]: new Map
            }
        }
    }
    ;
    var Xp = class extends K {
    }
      , Yp = [0, te, qe, xe, ne, ne]
      , Zp = ue(Xp, Yp);
    Xp.prototype.g = ve(Yp);
    function $p(a, b, c) {
        if (c) {
            var d = new we;
            c = a.Bc.Hd(c);
            var e = "";
            "/" !== e.substr(-1) && (e += "/");
            e = Oc(e + a.Bc.jf);
            var f = d.La;
            const g = E(f);
            Fc(g);
            nd(f, g, 1, "" !== e ? e : void 0);
            c = Fb(c);
            f = c.bc ? new Uint8Array(c.buffer) : c.buffer;
            c = d.La;
            e = E(c);
            Fc(e);
            f = Bc(f, !1, !1);
            nd(c, e, 2, null == f || f.isEmpty() ? void 0 : f)
        }
        c = pd(pd(pd(F(aq, 1, b.Dd), 3), 2), 4);
        b.clientId && F(c, 3, Oc(b.clientId));
        b.zd && F(c, 4, Oc(b.zd));
        d && yd(c, 2, d);
        b = c.g();
        a.ob.Vb.send(b)
    }
    function bq(a) {
        if (a.o) {
            var b = (new Date).getTime() - a.O.getTime();
            1E4 < b ? (a.g.log(`No Ping Received in ${b}ms; closing connection.`),
            a.close()) : $p(a, {
                Dd: 0
            })
        } else
            Lp(a.g, "Failed to send ping - Socket not alive.")
    }
    function cq(a, b) {
        a.o ? void 0 !== a.u.value ? $p(a, {
            Dd: 3
        }, b) : a.g.error("Connection to server not yet established (no websocket key).") : a.g.error("Failed to send message - Socket not alive.")
    }
    function dq(a, b, c) {
        a.i.addListener(b, c)
    }
    function eq(a) {
        a.o = !0;
        a.O = new Date;
        bq(a);
        const b = setInterval( () => {
            bq(a)
        }
        , a.Ye);
        a.V.push(b)
    }
    var fq = class {
        constructor(a, b=5E3) {
            this.Bc = a;
            this.Ye = b;
            this.u = new Tp;
            this.V = [];
            this.O = new Date;
            this.o = !1;
            this.g = new Mp;
            this.i = new Wp
        }
        oa() {}
        close() {
            this.H()
        }
        v() {
            this.ob.removeAllListeners();
            this.o = !1;
            for (const a of this.V)
                clearInterval(a);
            Vp(this.i, 2);
            this.i.reset()
        }
        onError(a) {
            Vp(this.i, 3, a)
        }
        wa() {
            eq(this);
            this.oa();
            this.u.get().then(a => {
                this.onReady(a)
            }
            )
        }
        onReady(a) {
            this.g.g = `(${a.clientId}) `;
            Vp(this.i, 0, a)
        }
        ya(a) {
            if (a)
                a: {
                    try {
                        var b = Zp(new Uint8Array(a.message))
                    } catch (d) {
                        Lp(this.g, "Found unparsable message");
                        break a
                    }
                    switch (H(b, 1, 0)) {
                    case 0:
                        this.o ? $p(this, {
                            Dd: 1
                        }) : this.g.log("Cancelling scheduled pong - Socket closed.");
                        break;
                    case 1:
                        this.O = new Date;
                        break;
                    case 2:
                        this.u.set({
                            clientId: Hd(b, 3),
                            zd: Hd(b, 4)
                        });
                        break;
                    case 3:
                        b = G(b, we, 2);
                        a = this.Bc.Pe;
                        var c = this.Bc.ff;
                        if (Hd(b, 1).split("/").pop() != c)
                            a = null;
                        else {
                            b = b.La;
                            c = E(b);
                            const d = md(b, c, 2)
                              , e = Bc(d, !0, !!(c & 34));
                            null != e && e !== d && nd(b, c, 2, e);
                            b = e;
                            b = null == b ? zb() : b;
                            b = (b = Bb(b)) ? new Uint8Array(b) : vb();
                            a = a(b)
                        }
                        a ? Vp(this.i, 1, a) : Lp(this.g, "Failed to unpack message")
                    }
                }
            else
                Lp(this.g, "Received empty message.")
        }
    }
      , aq = new Xp;
    var hq = class extends fq {
        constructor(a) {
            super(a.Bc, a.Ye);
            let b;
            this.Ld = null != (b = a.Ld) ? b : !1
        }
        connect(a) {
            const b = this;
            return u(function*() {
                b.address = a;
                b.j = Np();
                b.g.log("Websocket Client: connecting to " + a);
                gq(b, "opened", b.wa.bind(b));
                gq(b, "message", b.ya.bind(b));
                gq(b, "closed", b.v.bind(b));
                gq(b, "error", b.onError.bind(b));
                b.ob.ze(a);
                yield b.j.promise;
                b.g.log("Websocket Client: connected to " + a)
            })
        }
        oa() {
            const a = this.Ld ? rp("WS_SERVER_CLIENT_KEY", void 0, Kp) : void 0;
            $p(this, {
                Dd: 2,
                zd: a
            })
        }
        onReady(a) {
            this.Ld && sp("WS_SERVER_CLIENT_KEY", a.zd, Kp);
            super.onReady(a);
            if (!this.j)
                throw Error("N`" + this.address);
            Qp(this.j)
        }
        onError(a) {
            super.onError(a);
            this.g.error(`Error connecting to ${this.address}: ${a.message}`);
            if (!this.j)
                throw Error("O`" + this.address);
            Rp(this.j)
        }
        v(a) {
            this.g.log("WebSocket client closed: " + a);
            super.v();
            this.j = void 0
        }
        H() {
            this.v(1005)
        }
    }
    ;
    function iq(a) {
        aj.call(this);
        a || (a = {});
        this.o = 0 != a.He;
        this.g = a.Pg || jq;
        this.u = a.binaryType || "blob";
        this.i = this.g(this.Yc)
    }
    sa(iq, aj);
    r = iq.prototype;
    r.Vb = null;
    r.qd = null;
    r.Xc = void 0;
    r.Zd = !1;
    r.Yc = 0;
    r.Ac = null;
    function jq(a) {
        return Math.min(1E3 * Math.pow(2, a), 6E4)
    }
    r.ze = function(a, b) {
        null != this.Ac && A.clearTimeout(this.Ac);
        this.Ac = null;
        this.qd = a;
        this.Vb = (this.Xc = b) ? new WebSocket(this.qd,this.Xc) : new WebSocket(this.qd);
        this.Vb.binaryType = this.u;
        this.Vb.onopen = oa(this.Qf, this);
        this.Vb.onclose = oa(this.Nf, this);
        this.Vb.onmessage = oa(this.Pf, this);
        this.Vb.onerror = oa(this.Of, this)
    }
    ;
    r.close = function() {
        null != this.Ac && A.clearTimeout(this.Ac);
        this.Ac = null;
        this.Vb && (this.Zd = !0,
        this.Vb.close(),
        this.Vb = null)
    }
    ;
    r.Qf = function() {
        bj(this, "d");
        this.Yc = 0;
        this.i = this.g(this.Yc)
    }
    ;
    r.Nf = function(a) {
        bj(this, new kq(a.code,a.reason,a.wasClean));
        this.Vb = null;
        this.Zd ? (this.qd = null,
        this.Xc = void 0) : this.o && (this.Ac = Uj(oa(this.ze, this, this.qd, this.Xc), this.i, this),
        this.Yc++,
        this.i = this.g(this.Yc));
        this.Zd = !1
    }
    ;
    r.Pf = function(a) {
        bj(this, new lq(a.data))
    }
    ;
    r.Of = function(a) {
        bj(this, new mq(a.data))
    }
    ;
    r.ub = function() {
        iq.Qb.ub.call(this);
        this.close()
    }
    ;
    function kq(a, b, c) {
        Ai.call(this, "a");
        this.code = a;
        this.reason = b;
        this.wasClean = c
    }
    sa(kq, Ai);
    function lq(a) {
        Ai.call(this, "c");
        this.message = a
    }
    sa(lq, Ai);
    function mq(a) {
        Ai.call(this, "b");
        this.data = a
    }
    sa(mq, Ai);
    const nq = {
        opened: "d",
        closed: "a",
        message: "c",
        error: "b"
    }
      , oq = {
        opened: a => a,
        error: a => a,
        message: a => b => {
            a(b)
        }
        ,
        closed: a => () => {
            a()
        }
    };
    function gq(a, b, c) {
        Si(a.ob, nq[b], oq[b](c))
    }
    var Jp = class extends hq {
        constructor(a) {
            super(a);
            let b;
            this.ob = new iq({
                He: null != (b = a.He) ? b : !1,
                binaryType: "arraybuffer"
            })
        }
        H() {
            this.ob.close();
            super.H()
        }
    }
    ;
    function pq(a) {
        return u(function*() {
            return Ip(a)
        })
    }
    ;function qq(a, b) {
        return u(function*() {
            const c = yield pq(b.Uc)
              , d = new rq(c,a,b);
            var e = Bp(b, Dl("H21_HAT", null));
            e = wp(new np, e);
            cq(c, e);
            return d
        })
    }
    function sq(a, b, c) {
        return u(function*() {
            return new rq(c,a,b)
        })
    }
    function tq(a) {
        return u(function*() {
            return a.j.promise
        })
    }
    var rq = class extends zp {
        constructor(a, b, c) {
            super();
            this.ob = a;
            this.g = b;
            this.connectionInfo = c;
            this.u = !1;
            this.j = Np();
            dq(this.ob, 1, this.H.bind(this));
            dq(this.ob, 2, this.v.bind(this));
            dq(this.ob, 3, this.onError.bind(this))
        }
        H(a) {
            for (const c of xd(a, Yn, 1))
                switch (c.getType()) {
                case 2:
                    console.log("handshake!");
                    a = G(c, Bn, 5);
                    var b = a.getId();
                    uq(this.g.match.g, b);
                    sp("halloween21.client.match_config", {
                        url: this.connectionInfo.Uc,
                        player: b,
                        match: Hd(a, 2),
                        nonce: Dd(Nc(ld(a, 3)), 0),
                        timestamp: Date.now()
                    }, up);
                    Jk(12);
                    void 0 !== this.connectionInfo.Lc && Hk(112);
                    Qp(this.j);
                    break;
                case 5:
                    /*
                    a = G(c, zn, 8);
                    b = this.g.match;
                    b.qb = Fd(a, 1);
                    b.Ab || (Jk(14),
                    b.Ab = !0);
                    */
                    break;
                case 4:
                    vq(this.g, G(c, Nn, 7));
                    break;
                case 8:
                    //Ed(G(c, Rn, 11), 7) && (this.u = !0);
                    //a = G(c, Rn, 11);
                    //this.g.match.update(a);
                    break;
                case 6:
                    //a = G(c, Wn, 9);
                    //wq(this.g.match, a);
                    break;
                case 7:
                    a = G(c, Xn, 10);
                    (a = xq(this.g.match.g, a.getId())) && a.ya();
                    break;
                case 10:
                    a = G(c, wn, 13);
                    yq(this.g.match.g, a);
                    break;
                case 9:
                    a = G(c, Gn, 12);
                    xq(this.g.match.g, a.getId()).o = a;
                    break;
                case 11:
                    a = G(c, Tn, 14);
                    (b = xq(this.g.match.g, a.getId())) ? b.mc(a) : a.getId();
                    break;
                case 12:
                    a = G(c, Vn, 15);
                    zq(this.g.match, xd(a, Kn, 1));
                    break;
                case 15:
                    Hk(111),
                    sp("halloween21.client.match_config", null)
                }
        }
        v() {
            this.u || (void 0 !== this.connectionInfo.Lc && !this.j.g || this.g.H(),
            this.j.g ? console.error("Lost connection to GameServer.") : Rp(this.j, "Failed to connect to GameServer."))
        }
        onError() {
            void 0 === this.connectionInfo.Lc && Hk(110)
        }
        sendMessage(a) {
            cq(this.ob, a)
        }
    }
    ;
    function Cg(a, b) {
        return F(a, 1, Oc(b))
    }
    function Bg(a, b) {
        return F(a, 2, Oc(b))
    }
    function Ag(a, b) {
        return F(a, 3, Oc(b))
    }
    var Dg = class extends K {
    }
      , Aq = [0, ne, ne, ne]
      , Bq = ue(Dg, Aq);
    Dg.prototype.g = ve(Aq);
    var Cq = class extends K {
    }
      , Dq = function(a) {
        return b => {
            if (null == b || "" == b)
                b = new a;
            else {
                b = JSON.parse(b);
                if (!Array.isArray(b))
                    throw Error(void 0);
                pc(b, 32);
                b = Sc(a, b)
            }
            return b
        }
    }(Cq);
    const Eq = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      , Fq = /^mtch-\w+-\d+-HALLOWEEN_PRIVATE$/;
    var Gq = class {
        constructor(a, b, c) {
            this.ob = a;
            this.connectionInfo = b;
            b = Bp(b, c);
            b = wp(new np, b);
            cq(a, b)
        }
        join(a, b) {
            return new Promise( (c, d) => {
                dq(this.ob, 1, e => {
                    for (const f of xd(e, Yn, 1))
                        switch (f.getType()) {
                        case 16:
                            let g, h;
                            a(null != (h = null == (g = G(f, In, 17)) ? void 0 : Dd(Nc(ld(g, 1)), 0)) ? h : 1);
                            break;
                        case 17:
                            this.ob.i.removeListener(1, void 0);
                            this.ob.i.removeListener(2, void 0);
                            c({
                                ob: this.ob,
                                connectionInfo: this.connectionInfo
                            });
                            break;
                        case 18:
                            b();
                            break;
                        default:
                            console.log("Unexpected message", f.getType())
                        }
                }
                );
                dq(this.ob, 2, () => {
                    d()
                }
                )
            }
            )
        }
        start() {
            var a = new np;
            var b = new Yn;
            b = F(b, 1, 17);
            a = wp(a, b);
            cq(this.ob, a)
        }
    }
    ;
    const Hq = Ie(".cloud.doodles.goog")
      , Iq = Ie("gs.")
      , Jq = Ie("wss");
    function Kq(a) {
        a = Ff(a);
        return a.j === He(Jq) && a.i.startsWith(He(Iq)) && a.i.endsWith(He(Hq)) && !a.u && "" === a.g.toString() && null == a.H ? !0 : !1
    }
    ;var Eg = {
        DEFAULT: {
            name: "DEFAULT",
            Jc: 2
        },
        yg: {
            name: "PETANQUE_SINGLES",
            Jc: 2
        },
        vg: {
            name: "PETANQUE_DOUBLES",
            Jc: 4
        },
        xg: {
            name: "PETANQUE_PRIVATE_SINGLES",
            Jc: 1
        },
        wg: {
            name: "PETANQUE_PRIVATE_DOUBLES",
            Jc: 1
        },
        Od: {
            name: "HALLOWEEN",
            Jc: 8
        },
        qf: {
            name: "HALLOWEEN_PRIVATE",
            Jc: 1
        }
    };
    function Lq() {
        Mq || (Mq = new Nq);
        return Mq
    }
    function Oq(a) {
        F(a.g, 3, Oc(a.i));
        sp("halloween21.client.replay", a.g.Hd());
        Ik("d3", H(a.g, 1, 1))
    }
    function Pq(a) {
        if (!a)
            return !1;
        switch (H(a, 1, 1)) {
        case 1:
            return !0;
        case 2:
        case 3:
            var b = G(a, Dg, 2);
            if (!b)
                return !1;
            a = Hd(b, 2);
            b = Hd(b, 1) || "";
            return (Eq.test(b) || "local-match-id" === b || Fq.test(b)) && a && Kq(a) ? !0 : !1;
        default:
            return !1
        }
    }
    function Qq(a) {
        if (!a.i)
            return null;
        const b = a.i.indexOf("_");
        if (0 > b)
            return null;
        a = a.i.substr(b + 1);
        if (!a)
            return null;
        let c;
        try {
            c = Bq(kb(a))
        } catch (d) {
            return null
        }
        a = new Cq;
        F(a, 1, 2);
        yd(a, 2, c);
        return Pq(a) ? a : null
    }
    var Nq = class {
        constructor() {
            this.i = Ff(window.location.href).g.get("doodle");
            var a;
            b: if (a = rp("halloween21.client.replay", null)) {
                try {
                    var b = Dq(a)
                } catch (c) {
                    a = null;
                    break b
                }
                a = Pq(b) ? b : null
            } else
                a = null;
            a = Pq(a) && Pc(ld(a, 3)) === this.i ? a : null;
            a || (a = Qq(this),
            a || (a = new Cq,
            F(a, 1, 1)));
            this.g = a;
            Oq(this)
        }
        set(a, b) {
            F(this.g, 1, a);
            yd(this.g, 2, b);
            Oq(this)
        }
    }
    , Mq;
    function Rq(a) {
        return a.g[Math.min(a.g.length - 1, a.o)]
    }
    function Sq(a, b) {
        a.g = b;
        a.o = 0;
        a.elapsedTime = 0
    }
    var Tq = class {
        constructor(a) {
            this.g = a;
            this.o = 0;
            this.j = !0;
            this.elapsedTime = 0;
            this.i = this.loop = !0;
            this.Tb = 0;
            this.point = new Q(0,0);
            this.opacity = 1
        }
        Ga(a, b) {
            this.point.x = a;
            this.point.y = b
        }
        Cb() {
            return this.point
        }
        update(a) {
            this.j && 1 !== this.g.length + this.Tb && (this.loop || this.o !== this.g.length + this.Tb + this.Tb - 1) && (this.elapsedTime += a,
            this.o = Math.floor(this.elapsedTime % (1E3 / 24 * (this.g.length + this.Tb)) / 1E3 * 24) % (this.g.length + this.Tb))
        }
        render(a=0, b=0, c, d=0, e=!1, f=1, g, h) {
            h = void 0 !== h ? h : this.opacity;
            const k = Rq(this);
            g = void 0 !== g ? g : f;
            this.i && void 0 !== c ? am(k, a + this.point.x, b + this.point.y, c, d, e, f, g, h) : $l(k, a + this.point.x, b + this.point.y, c, d, e, f, g, h)
        }
        play() {
            this.j || (this.elapsedTime = 0,
            this.j = !0)
        }
        stop() {
            this.j = !1
        }
        setLoop(a) {
            this.loop = a
        }
    }
    ;
    var Uq = class {
        constructor() {
            this.Ia = new Tq(qi);
            this.status = 1
        }
        render(a, b, c, d) {
            am(Rq(this.Ia), a, b, 2, c, !1, 1, 1, d, lh.Ua())
        }
        update(a) {
            this.Ia.update(a)
        }
    }
    ;
    var Vq = class {
        constructor() {
            const a = Array(256);
            for (var b = 0; b < a.length; ++b)
                a[b] = b;
            for (b = a.length - 1; 0 < b; --b) {
                const c = Math.floor(Math.random() * a.length)
                  , d = a[b];
                a[b] = a[c];
                a[c] = d
            }
            this.g = a.concat(a)
        }
    }
    , Wq;
    const Xq = (a, b, c, d) => {
        a &= 15;
        const e = 8 > a ? b : c;
        b = 4 > a ? c : 12 === a || 14 === a ? b : d;
        return (0 === (a & 1) ? e : -e) + (0 === (a & 2) ? b : -b)
    }
    ;
    function Yq(a, b) {
        H(a.state, 1, 0) !== b && F(a.state, 1, b)
    }
    var Zq = class extends po {
        constructor(a, b, c, d, e=!0) {
            super(a, b, c);
            this.Xa = d;
            this.i = null;
            this.state = new jn;
            Yq(this, 1);
            Bd(this.state, 2, !0);
            this.Mc(null);
            e && (a = new $o,
            a.type = 2,
            a.position.set(this.g.x, this.g.y),
            this.body = cp(d.o, a),
            this.body.Me = this,
            d = new bp,
            d.j = !0,
            d.i = 1E-4,
            d.H = .1,
            d.g = Yo(1, 1),
            d.filter.g = 16,
            d.filter.i = 64,
            dp(this.body, d))
        }
        V(a) {
            (a = (this.state = a) && Fd(a, 3)) ? this.i = this.Xa.i.get(a) || null : this.i = null
        }
        isVisible() {
            return 4 !== H(this.state, 1, 0)
        }
        Mc(a) {
            (this.i = a) ? this.state.Mc(a.getId()) : pd(this.state, 3)
        }
        H(a) {
            const b = this.body.va.position
              , c = fo(a.body.va.position);
            c.x -= b.x;
            c.y -= b.y;
            go(c, this.j());
            mo(this.body, c);
            this.angle = a.angle
        }
        j() {
            return +ko(this, "collectible_trail_speed")
        }
        update() {}
    }
    ;
    var ar = class extends Zq {
        constructor(a, b, c, d, e=!1) {
            super(a, b, c, d, e);
            this.Oa = e;
            this.Ka = new Uq;
            this.opacity = 0;
            this.Id = 1;
            this.o = this.u = null;
            this.v = {
                x: 0,
                y: 0
            };
            this.oa = new Tq(ni);
            this.Da = new Tq(wi);
            this.u = new Cm([new W(new X({
                opacity: 0
            },{
                opacity: 1
            },242,Mm),f => {
                this.opacity = f.opacity
            }
            ), new ym( () => {
                this.u = null
            }
            )]);
            this.wa = {
                radius: 7,
                ue: 0,
                Sa: 1,
                Fd: 1E3 * Math.random(),
                Cd: !1,
                visible: !0
            }
        }
        ya() {
            this.o = new Dm([new W(new X({
                opacity: 1
            },{
                opacity: 0
            },750,Om),a => {
                this.opacity = a.opacity
            }
            ), new W(new X({
                Id: 1
            },{
                Id: 5
            },2E3,Om),a => {
                this.Id = a.speedMultiplier
            }
            )])
        }
        Ge() {
            return !!this.o && this.o.g()
        }
        update(a) {
            this.o ? this.o.update(a) : this.u && this.u.update(a);
            var b = this.Ka
              , c = H(this.state, 1, 0);
            if (b.status !== c) {
                b.status = c;
                switch (c) {
                case 2:
                    Sq(b.Ia, oi);
                    break;
                case 3:
                    Sq(b.Ia, pi);
                    break;
                default:
                    Sq(b.Ia, qi)
                }
                b.Ia.play()
            }
            this.Ka.update(a);
            this.oa.opacity = this.opacity;
            this.Da.opacity = this.opacity;
            this.oa.update(a);
            this.Da.update(a)
        }
        render() {
            this.isVisible() && (this.Ka.render(this.g.x, this.g.y, this.angle, this.opacity),
            this.i && $q(this.i) && (this.oa.render(this.g.x, this.g.y, 2),
            this.Da.render(this.g.x, this.g.y, 2)))
        }
        V(a) {
            const b = this.i;
            super.V(a);
            (a = this.i) && a.i && (!b || !b.i) && a.i && a.Da - a.Se >= Tg && (R.Rd.play(),
            a.Se = a.Da)
        }
        Mc(a) {
            super.Mc(a);
            a && a.i && R.Rd.play()
        }
        H(a, b) {
            this.Oa ? super.H(a, b) : (b = a.g,
            this.v.x = this.j() * (b.x - this.g.x),
            this.v.y = this.j() * (b.y - this.g.y),
            this.angle = a.angle)
        }
        O() {
            this.Oa ? super.O() : (this.g.x += 16 * this.v.x / 1E3,
            this.g.y += 16 * this.v.y / 1E3)
        }
        mc(a) {
            this.Oa ? super.mc(a) : Ed(a, 6) && (this.g.x = Gd(a, 2),
            this.g.y = Gd(a, 3))
        }
        j() {
            return this.Id * super.j()
        }
        le() {
            this.wa.Sa = 2 === H(this.state, 1, 0) ? 1 : 2;
            this.wa.visible = 2 === H(this.state, 1, 0) || 3 === H(this.state, 1, 0);
            return this.wa
        }
    }
    ;
    var br = class {
        render(a, b) {
            a.save();
            0 > b ? (b = T("countdown_get_ready"),
            a.textAlign = "center",
            a.font = `${L ? 45 : 60}px ${P}`,
            a.fillStyle = "#700",
            a.fillText(b, 0, 0),
            a.strokeStyle = "#F93",
            a.strokeText(b, 0, 0)) : (V(Fh, a, 0, 0),
            a.textAlign = "center",
            a.textBaseline = "middle",
            lh.Ua(),
            a.font = `${.75 * Fh[3]}px ${P}`,
            a.fillStyle = "#000",
            a.fillText(`${b}`, 0, 0));
            a.restore()
        }
    }
    ;
    var cr = class {
    }
    ;
    class dr extends cr {
        constructor(a, b, c) {
            super();
            this.text = a;
            this.V = b;
            this.oa = c;
            this.offsetX = 1
        }
        j() {
            return -1
        }
        cancel() {}
        Ra(a) {
            this.offsetX = a.offsetX
        }
        render(a) {
            lh.Ua();
            var b = Gh[3];
            var c = this.V - b / 2;
            c += this.offsetX * c;
            const d = this.oa;
            a.save();
            V(Gh, a, c + b / 2, d);
            var e = this.v();
            if (e) {
                lh.Ua();
                var f = e[3];
                lh.Ua();
                V(e, a, c, d, f / 2, e[4] / 2);
                a.textAlign = "center";
                a.textBaseline = "middle";
                a.fillStyle = "#000";
                e = gm(a, this.text, P, 24, 16, b - f / 4, 2);
                f = 1.25 * e.fontSize;
                im(a, e, c + b / 2 + 20, d - e.lines.length * f / 2 + f / 2, f)
            }
            a.restore()
        }
    }
    var fr = class extends dr {
        constructor(a, b, c, d) {
            super(a, c, d);
            this.action = er(this, b)
        }
        u() {
            return this.action.g()
        }
        update(a) {
            this.action.update(a)
        }
    }
      , ir = class extends dr {
        constructor(a) {
            super(a, 0, 0);
            this.o = !1;
            this.O = gr(this);
            this.H = hr(this)
        }
        u() {
            return this.H.g()
        }
        update(a) {
            this.O.g() ? this.o && !this.H.g() && this.H.update(a) : this.O.update(a)
        }
    }
    ;
    var jr = class {
        constructor(a, b, c, d, e) {
            this.x = a;
            this.y = b;
            this.width = c;
            this.height = d;
            this.j = e;
            this.body = null;
            this.i = new $o;
            this.i.type = 0;
            this.i.position.set(a, b);
            this.g = new bp;
            this.g.H = .1;
            this.g.i = 1E3;
            this.g.g = Yo(c, d);
            this.g.filter.g = 256;
            this.g.filter.i = 1
        }
        close() {
            this.body || (this.body = cp(this.j, this.i),
            this.body.Xa = this,
            dp(this.body, this.g))
        }
        render(a) {
            if (this.body) {
                a.save();
                a.fillStyle = "#000";
                var b = this.x - this.width
                  , c = this.y - this.height
                  , d = 2 * this.width
                  , e = 2 * this.height;
                b = Wl(Zl, b);
                c = Xl(Zl, c);
                d *= Zl.g;
                e *= Zl.g;
                O.fillRect(b, c, d, e);
                a.restore()
            }
        }
    }
    ;
    function kr(a) {
        const b = N.getContext("2d");
        b.textAlign = a.j;
        b.textBaseline = "middle";
        return gm(b, a.text, a.fontFamily, a.fontSize, Math.round(a.fontSize / 4), a.v, a.H, a.fontStyle)
    }
    function lr(a, b, c=3) {
        a.u = c;
        a.o = b
    }
    var mr = class {
        constructor(a, b, c, d=1) {
            this.fontSize = b;
            this.v = c;
            this.H = d;
            this.fontFamily = P;
            this.point = new Q(0,0);
            this.fontStyle = "";
            this.g = "#fff";
            this.o = null;
            this.j = "center";
            this.u = 3;
            this.text = T(a);
            this.i = kr(this)
        }
        Ga(a, b) {
            this.point.x = a;
            this.point.y = b
        }
        render(a) {
            a.save();
            null != this.o && (a.strokeStyle = this.o,
            a.lineWidth = this.u);
            a.fillStyle = this.g;
            a.textAlign = this.j;
            a.textBaseline = "middle";
            im(a, this.i, this.point.x, this.point.y - this.i.fontSize * (this.i.lines.length - 1) / 2, .85 * this.fontSize, !!this.o);
            a.restore()
        }
    }
    ;
    function nr(a, b, c, d) {
        return new or([a, b, a + c, b, a + c, b + d, a, b + d])
    }
    function pr(a, b, c) {
        b -= a.g[0];
        c -= a.g[1];
        if (0 != b || 0 != c)
            for (let d = 0; d < a.g.length - 1; d += 2)
                a.g[d] += b,
                a.g[d + 1] += c
    }
    var or = class extends em {
        constructor(a) {
            super();
            this.g = a
        }
        contains(a, b) {
            const c = this.g;
            if (6 > c.length)
                return !1;
            let d = !1;
            for (let e = 0, f = c.length - 2; e < c.length; f = e,
            e += 2) {
                const g = c[e]
                  , h = c[e + 1]
                  , k = c[f]
                  , l = c[f + 1];
                a < g != a < k && b > h + (a - g) * (l - h) / (k - g) && (d = !d)
            }
            return d
        }
    }
    ;
    var tr = (a, b) => u(function*() {
        const c = "string" === typeof a ? a : a.value;
        var d;
        if (!(d = yield qr(c)))
            if (jg) {
                "string" === typeof a ? (rr || (rr = document.createElement("input"),
                rr.readOnly = !0,
                pg(rr, "position", "absolute", "opacity", 0, "left", 0, "top", 0, "pointerEvents", "none"),
                document.body.appendChild(rr)),
                rr.value = a,
                d = rr) : d = a;
                d !== document.activeElement && d.focus();
                const f = d.contentEditable
                  , g = d.readOnly;
                d.contentEditable = "true";
                d.readOnly = !1;
                const h = document.createRange();
                h.selectNodeContents(d);
                const k = window.getSelection();
                k.removeAllRanges();
                k.addRange(h);
                try {
                    d.select(),
                    d.setSelectionRange(0, d.value.length)
                } catch (l) {}
                d.contentEditable = f;
                d.readOnly = g;
                try {
                    var e = jg(document, "copy")
                } catch (l) {
                    e = !1
                }
                window.getSelection().removeAllRanges();
                d.blur();
                b && b !== document.activeElement && b.focus();
                rr && (rr.remove(),
                rr = null);
                d = e
            } else
                d = !1;
        return d || (yield sr()) && (yield qr(c)) ? Promise.resolve() : Promise.reject()
    });
    const qr = a => u(function*() {
        return navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(a).then( () => !0, () => !1) : !1
    })
      , ur = a => u(function*() {
        switch (a.state) {
        case "granted":
            return !0;
        case "denied":
            return !1
        }
        return new Promise(b => {
            a.onchange = () => b(ur(a))
        }
        )
    })
      , sr = () => u(function*() {
        return navigator.permissions && navigator.permissions.query ? ur(yield navigator.permissions.query({
            name: "clipboard-write"
        })) : !1
    });
    let rr = null;
    var vr = () => null != window.agsa_ext && null != window.agsa_ext.share;
    const wr = (a, b) => {
        const c = new wf;
        for (let d in b)
            c.add(d, b[d]);
        a = new rf(a);
        uf(a, c);
        return a.toString()
    }
    ;
    var xr = (a, b) => u(function*() {
        if (Hg())
            return Promise.reject();
        Hk(16);
        return tr(a, b)
    });
    lh.Ua();
    const yr = L ? 285 : 520
      , zr = L ? 93 : 47
      , Ar = L ? 270 : 291
      , Br = L ? -20 : 7
      , Cr = L ? -112 : -140
      , Dr = L ? 120 : 106
      , Er = L ? 70 : 105
      , Fr = L ? 275 : 735
      , Gr = L ? 645 : 200
      , Hr = L ? 390 : 850
      , Ir = L ? 550 : 100
      , Jr = L ? 270 : 737
      , Kr = L ? 906 : 475
      , Lr = (new Map).set(1, "#005c20").set(2, "#f6d4fb")
      , Mr = (new Map).set(1, "#8bffb5").set(2, "#dc6dfb")
      , Nr = M / 2
      , Or = L ? 225 : 15
      , Pr = (new Map).set(0, L ? new fm(110,790,66) : new fm(590,346,66)).set(2, L ? new fm(270,790,80) : new fm(738,338,80)).set(3, L ? new fm(440,790,66) : new fm(875,346,66)).set(1, L ? nr(140, 880, 270, 80) : nr(600, 440, 270, 80)).set(4, L ? nr(100, 530, 340, 170) : nr(560, 80, 340, 170)).set(5, nr(Nr + 91, Or + 96, 122, 122)).set(6, nr(Nr + 235, Or + 96, 122, 122)).set(7, nr(Nr + 91, Or + 241, 122, 122)).set(8, nr(Nr + 235, Or + 241, 122, 122)).set(9, nr(Nr + 331, Or - 100, 102, 102));
    function Qr(a) {
        [...a.match.g.i.values()].sort( (b, c) => Rr(c) - Rr(b))[0] === a.match.g.g && (Ll("MOST_SPIRITS_COLLECTED"),
        El("H21_MOST_SPIRITS_COLLECTED", !0));
        Ll("PLAYS");
        a.i === a.match.g.g.Sa && Ll("WINS");
        Ml(Rr(a.match.g.g));
        a = Sr(a.match, a.match.g.g.getId());
        5 === a ? El("H21_STOLE_MOST", !0) : 10 === a && El("H21_MOST_MEGA_FLAMES", !0);
        Il()
    }
    function Tr(a) {
        const b = [...a.match.g.i.values()];
        b.sort( (c, d) => Rr(d) - Rr(c));
        for (const c of b) {
            const d = c.Sa
              , e = Rr(c);
            c.i && (Fk.s = e);
            a.Ba.set(d, (a.Ba.get(d) || 0) + e)
        }
        return b
    }
    function Ur(a) {
        if (1 === a.i) {
            var b = "alpha_team_wins";
            a = "#019d4b"
        } else
            2 === a.i ? (b = "bravo_team_wins",
            a = "#9a00d6") : (b = "draw",
            a = "#2c2b8f");
        b = new mr(b,64,360);
        b.Ga(yr, 264);
        b.g = a;
        return b
    }
    function Vr(a) {
        Wr(a, 0, () => {
            if (vr()) {
                var b = Xr()
                  , c = Yr();
                !Hg() && vr() && (Hk(15),
                window.agsa_ext.share(c + " " + b, null))
            } else
                Zr(a),
                a.wa = !0,
                $r(a)
        }
        );
        Wr(a, 2, () => {
            Zr(a);
            as(a, 4);
            Hk(4)
        }
        );
        Zg || Wr(a, 1, () => {
            Zr(a);
            as(a, 3);
            Hk(113)
        }
        );
        Wr(a, 3, () => {
            Hk(3);
            let b = google.doodle ? google.doodle.url : "";
            b && ug(b, !0)
        }
        );
        Wr(a, 4, () => {
            Zr(a);
            a.o = !0;
            a.H.includes(a.Ka) && El("H21_ACK_" + a.Ka, !0);
            tm(a.j)
        }
        )
    }
    function Wr(a, b, c) {
        if (b = Pr.get(b))
            um(a.O, b, d => {
                "mouseup" === d && c()
            }
            ),
            vm(a.O, b)
    }
    function Zr(a) {
        for (const b of Pr.values())
            bs(a.O, b)
    }
    function Xr() {
        const a = wg("shortlink", `https://www.google.com/?doodle=${Fg}`);
        return 0 === a.indexOf("//") ? `https:${a}` : a
    }
    function Yr() {
        return wg("share", "TODO(b/116542685): Default share message")
    }
    function $r(a) {
        const b = Xr()
          , c = Yr()
          , d = pl("share.png");
        Wr(a, 5, () => {
            Hk(16);
            xr(b, N).then( () => {
                Bl(a.g, !0);
                setTimeout( () => {
                    Bl(a.g, !1)
                }
                , 2E3)
            }
            )
        }
        );
        Wr(a, 6, () => {
            var e = b;
            Hg() || (e = 0 == e.indexOf("//") ? "https:" + e : e,
            e = "text=" + encodeURIComponent(c + "\n" + e),
            of("http://twitter.com/intent/tweet?" + e),
            Hk(6))
        }
        );
        Wr(a, 7, () => {
            var e = b;
            Hg() || (e = 0 == e.indexOf("//") ? "https:" + e : e,
            e = wr("https://www.tumblr.com/widgets/share/tool", {
                canonicalUrl: e,
                posttype: "photo",
                title: c,
                content: d
            }),
            of(e),
            Hk(12))
        }
        );
        Wr(a, 8, () => {
            var e = b;
            Hg() || (e = 0 == e.indexOf("//") ? "https:" + e : e,
            e = wr("https://www.facebook.com/dialog/share", {
                app_id: "738026486351791",
                href: e,
                hashtag: "#GoogleDoodle"
            }),
            of(e),
            Hk(5))
        }
        );
        Wr(a, 9, () => {
            Zr(a);
            a.wa = !1;
            a.o ? tm(a.j) : Vr(a)
        }
        )
    }
    function as(a, b) {
        a.state = b;
        a.v = 0;
        switch (a.state) {
        case 1:
            Vr(a),
            Jk(17),
            xl(a.Da, a.Xa)
        }
    }
    function cs(a, b, c, d) {
        b.save();
        b.translate(c, 0);
        c = Lr.get(d);
        b.fillStyle = c;
        b.font = `56px ${P}`;
        b.fillText(`${a.Ba.get(d) || 0}`, 0, Br);
        b.font = `48px ${P}`;
        let e = Er;
        for (const f of a.qb)
            if (f.Sa === d) {
                if (f.i) {
                    a = Mr.get(d);
                    b.fillStyle = a;
                    a = e - 47.5;
                    const g = a + 48
                      , h = e + 47.5
                      , k = h - 48;
                    b.beginPath();
                    b.moveTo(-49.5, a);
                    b.lineTo(49.5, a);
                    b.arc(49.5, g, 48, -Math.PI / 2, 0);
                    b.lineTo(97.5, k);
                    b.arc(49.5, k, 48, 0, Math.PI / 2);
                    b.lineTo(-49.5, h);
                    b.arc(-49.5, k, 48, Math.PI / 2, Math.PI);
                    b.lineTo(-97.5, g);
                    b.arc(-49.5, g, 48, Math.PI, 3 * Math.PI / 2);
                    b.fill();
                    b.fillStyle = c
                }
                a = Xm(f.Oa)[0];
                V(a, b, -45, e, 90, 90);
                f.Rc && V(Ch, b, -72, e + 26);
                b.fillText(`${Rr(f)}`, 45, e);
                e += 95
            }
        b.restore()
    }
    var ds = class extends yi {
        constructor(a, b) {
            super();
            this.match = a;
            this.O = b;
            this.v = this.state = 0;
            this.Ba = new Map;
            this.wa = this.o = !1;
            this.g = this.ta = this.u = null;
            this.i = a.Ka;
            Qr(this);
            this.Ja = (a = this.i === a.g.g.Sa) ? R.Bf : R.uf;
            this.Da = a ? R.Af : R.tf;
            this.Xa = a ? 4363 : 6E3;
            this.qb = Tr(this);
            this.yb = 1 === this.i ? Qf() ? Ah : zh : 2 === this.i ? Qf() ? Eh : Dh : Qf() ? li : ki;
            this.Ab = Ur(this);
            this.V = new mr("host_private_match",30,200,1);
            this.V.g = "#fff";
            this.V.Ga(Jr, Kr);
            this.Eb = T("achievements_header");
            this.Oa = Qf() ? Jh : Ih;
            this.Wa = document.getElementById("ddlDomRoot");
            this.H = Jl();
            this.Ka = Kl();
            this.g = document.createElement("div");
            this.g.classList.add("shareLinkCopied");
            this.g.style.font = `28px ${P}`;
            this.g.textContent = T("share_link_copied");
            this.ta = document.createElement("div");
            this.ta.classList.add("shareLinkContainer");
            pg(this.ta, "width", "100%");
            this.ta.appendChild(this.g);
            this.Wa.appendChild(this.ta);
            Jk(16);
            this.Ja.play();
            this.j = new wm(b, () => {
                this.o = !1;
                var c = this.j;
                for (const d of c.i)
                    bs(c.g, d);
                c.i = [];
                Vr(this);
                this.H = Jl()
            }
            )
        }
        ub() {
            super.ub();
            this.Ja.stop();
            this.Da.stop();
            this.ta && (this.ta.remove(),
            this.ta = null)
        }
        render(a) {
            a.save();
            a.fillStyle = "#000";
            a.fillRect(0, 0, a.canvas.width, a.canvas.height);
            switch (this.state) {
            case 0:
                V(this.yb, a, M / 2, Sg / 2);
                this.Ab.render(a);
                break;
            default:
                V(this.Oa, a, M / 2, Sg / 2);
                a.textAlign = "center";
                a.textBaseline = "middle";
                a.save();
                a.translate(Ar, zr);
                cs(this, a, Cr, 2);
                cs(this, a, Dr, 1);
                a.restore();
                Zg || this.V.render(a);
                a.fillStyle = "#fff";
                a.shadowColor = "#fff";
                a.shadowOffsetX = 0;
                a.shadowOffsetY = 0;
                a.shadowBlur = 15;
                var b = gm(a, this.Eb, P, 50, 30, 200, 2);
                im(a, b, Fr, Gr, 42);
                a.shadowColor = "transparent";
                0 < this.H.length && (a.beginPath(),
                a.fillStyle = "#f33",
                a.arc(Hr, Ir, 29, 0, 2 * Math.PI),
                a.closePath(),
                a.fill(),
                a.font = `36px bold ${P}`,
                a.fillStyle = "#fff",
                a.fillText(this.H.length.toString(10), Hr, Ir));
                this.o && this.j.render(a);
                if (this.wa) {
                    dm(a);
                    b = M / 2;
                    var c = Or + Zh[4] / 2;
                    V(Zh, a, b, c);
                    V(Yh, a, b, c);
                    pr(Pr.get(5), b - Yh[3] / 2, c - Yh[4] / 2);
                    pr(Pr.get(6), b + 10, c - Yh[4] / 2);
                    pr(Pr.get(7), b - Yh[3] / 2, c + 10);
                    pr(Pr.get(8), b + 10, c + 10);
                    b = b + Zh[3] / 2 - $h[3] / 2;
                    c = Or + $h[4] / 2;
                    V($h, a, b, c);
                    pr(Pr.get(9), b - $h[3] / 2, c - $h[4] / 2);
                    a.fillStyle = "#5977ab";
                    a.textAlign = "center";
                    a.textBaseline = "middle";
                    this.u || (this.u = gm(a, T("share"), P, 48, 20, 320, 1));
                    im(a, this.u, M / 2, Or + 416, this.u.fontSize)
                }
            }
            a.restore()
        }
    }
    ;
    lh.Ua();
    (new Map).set(1, "#005c20").set(2, "#f6d4fb");
    (new Map).set(1, "#8bffb5").set(2, "#dc6dfb");
    const es = M / 2
      , fs = L ? 225 : 15;
    (new Map).set(0, L ? new fm(425,682,50) : new fm(892,165,50)).set(1, L ? new fm(101,811,55) : new fm(615,346,55)).set(2, L ? new fm(247,849,68) : new fm(738,438,68)).set(3, L ? new fm(432,811,55) : new fm(852,346,55)).set(4, nr(es + 91, fs + 96, 122, 122)).set(5, nr(es + 235, fs + 96, 122, 122)).set(6, nr(es + 91, fs + 241, 122, 122)).set(7, nr(es + 235, fs + 241, 122, 122)).set(8, nr(es + 331, fs - 100, 102, 102));
    (new Map).set(1, "most_spirits_collected").set(2, "least_spirits_collected").set(3, "most_spirits_held_at_once").set(4, "most_spirits_held_at_end").set(5, "stole_most").set(6, "most_stolen_from").set(7, "most_team_bonus").set(10, "most_mega_flames").set(11, "fastest_to_max_powerups").set(12, "fewest_powerups");
    (new Map).set(1, "most_spirits_collected_subtitle").set(2, "least_spirits_collected_subtitle").set(3, "most_spirits_held_at_once_subtitle").set(4, "most_spirits_held_at_end_subtitle").set(5, "stole_most_subtitle").set(6, "most_stolen_from_subtitle").set(7, "most_team_bonus_subtitle").set(10, "most_mega_flames_subtitle").set(11, "fastest_to_max_powerups_subtitle").set(12, "fewest_powerups_subtitle");
    function gs(a, b) {
        a.Da = b
    }
    function xq(a, b) {
        return a.H.get(b)
    }
    function hs(a, b) {
        for (const f of a.H.values())
            if (f.update(b),
            f.Ge()) {
                var c = a
                  , d = f.getId()
                  , e = f.getType();
                const g = c.H.get(d);
                if (g) {
                    g.Sd() && c.V.delete(d);
                    switch (e) {
                    case 1:
                    case 2:
                        c.i.delete(d);
                        break;
                    case 16:
                        c.v.delete(d);
                        break;
                    case 4:
                        c.u.delete(d)
                    }
                    c.H.delete(d);
                    g.dispose(c);
                    c.Da && c.Da(d)
                }
                f.Vd = !1
            }
    }
    function is(a) {
        for (const b of a.V.values())
            b.Cc()
    }
    function js(a, b) {
        a.H.set(b.getId(), b);
        b.Sd() && a.V.set(b.getId(), b);
        switch (b.getType()) {
        case 1:
        case 2:
            a.i.set(b.getId(), b);
            break;
        case 16:
            a.v.set(b.getId(), b);
            break;
        case 4:
            a.u.set(b.getId(), b)
        }
    }
    var ls = class {
        constructor(a) {
            this.o = a;
            this.H = new Map;
            this.V = new Map;
            this.i = new Map;
            this.v = new Map;
            this.u = new Map;
            this.Ba = 1;
            this.j = this.O = 0;
            this.Da = null
        }
        ya(a) {
            this.O += a;
            for (this.j += a; 100 <= this.O && 16 <= this.j; )
                this.update(100),
                ks(this.o),
                this.oa(),
                this.O -= 100,
                this.j -= 16;
            for (; 16 <= this.j; )
                ks(this.o),
                this.oa(),
                this.j -= 16
        }
        update(a) {
            hs(this, a);
            is(this)
        }
        oa() {
            for (const a of this.H.values())
                a.O()
        }
        wake() {
            this.j = 0
        }
    }
    ;
    function uq(a, b) {
        if (b = a.i.get(b))
            a.g = b,
            a = a.g,
            a.i = !0,
            a.Fc.Cd = !0
    }
    function yq(a, b) {
        switch (H(b, 2, 0)) {
        case 1:
        case 2:
            var c = b.getId();
            a = a.i.get(c);
            if (c = b.getPlayerState()) {
                b = a.state ? H(a.state, 4, 0) : 0;
                var d = !(!a.state || !Ed(a.state, 12));
                a.state = c;
                a.state && null != Jc(ld(a.state, 16)) && (a.Rc = Ed(a.state, 16));
                if (!a.oa && null != Pc(ld(a.state, 21))) {
                    const h = Hd(a.state, 21);
                    h && Fl.has(h) && (a.oa = new ms(a,Fl.get(h)[1],Fl.get(h)[2]))
                }
                a.i && !d && a.state && Ed(a.state, 12) && R.wf.play();
                a.j = [];
                for (var e of Ad(c, 9))
                    (d = a.yb.v.get(e)) && a.j.push(d);
                for (var f of xd(c, tn, 14))
                    switch (f.getType()) {
                    case 1:
                        ns(a, Fd(f, 2));
                        break;
                    case 3:
                        e = a;
                        d = Fd(f, 2);
                        os(e, new ps(d,e.Fe,e.Wf));
                        e.Kb = e.Fe;
                        e.i && R.lf.play();
                        break;
                    case 2:
                        e = a;
                        d = Fd(f, 2);
                        os(e, new qs(d));
                        e.i && (R.mf.play(),
                        Ll("SPIRITS_COLLECTED", d));
                        break;
                    case 4:
                        e = a,
                        d = Fd(f, 2),
                        os(e, new rs(d)),
                        e.i && (R.Rd.play(),
                        Ll("MEGA_FLAMES"))
                    }
                for (var g of xd(c, pn, 13)) {
                    f = null;
                    switch (g.getType()) {
                    case 1:
                        f = a;
                        d = zl;
                        e = d.width / 2 + d.left + ko(f, "notice_offset_x");
                        d = .75 * d.height + d.top + ko(f, "notice_offset_y");
                        f = new ss(g.getType(),ts(H(g, 2, 0)),ko(f, "notice_duration_ms"),e,d);
                        break;
                    case 2:
                        f = new us(vs(H(g, 2, 0)),ko(a, "notice_duration_ms"))
                    }
                    f && os(a, f)
                }
                g = xd(c, nn, 15);
                g.length && ws(a, g[g.length - 1].getType());
                (a.state ? H(a.state, 4, 0) : 0) > b && (xs(a),
                ys(a))
            }
            break;
        case 16:
            g = b.getId();
            (g = a.v.get(g)) ? g.V(G(b, jn, 4)) : (b.getId(),
            H(G(b, jn, 4), 1, 0));
            break;
        case 4:
            g = b.getId();
            g = a.u.get(g);
            a = G(b, gn, 5);
            g.state = a;
            break;
        case 32:
            g = xq(a, b.getId()),
            a = G(b, ln, 6),
            g.state = a
        }
    }
    var Bs = class extends ls {
        constructor(a, b) {
            super(a);
            this.wa = b;
            this.g = null
        }
        update() {
            is(this);
            if (this.g && zs(this.g)) {
                var a = new Gn
                  , b = this.g.getId();
                Cd(a, 1, b);
                zd(a, 2, 0);
                zd(a, 3, 0);
                Bd(a, 4, !1);
                b = this.wa.j;
                ho(b) && (io(b),
                go(b, (Gd(this.g.state, 2) || 0) * this.wa.u),
                zd(a, 2, b.x),
                zd(a, 3, b.y),
                Bd(a, 4, !0));
                this.g.o = a;
                this.g.Ud()
            }
        }
        ya(a) {
            super.ya(a);
            this.update(a);
            hs(this, a);
            for (var b of this.i.values())
                if (b !== this.g)
                    for (var c of b.j)
                        c.O();
            for (var d of this.u.values())
                d.O();
            a = this.wa;
            if (a.g) {
                c = a.gamepad;
                if (navigator.getGamepads) {
                    d = navigator.getGamepads();
                    b = !1;
                    for (var e of d)
                        if (e && e.connected) {
                            if (e.axes) {
                                d = e.axes[0];
                                let f = e.axes[1];
                                .1 > Math.abs(d) && (d = 0);
                                .1 > Math.abs(f) && (f = 0);
                                b = 0 !== d || 0 !== f;
                                e = c.g;
                                e.u || (c = 72.5 * d,
                                d = 72.5 * f,
                                e.g = {
                                    x: 0,
                                    y: 0
                                },
                                e.i = {
                                    x: c,
                                    y: d
                                },
                                e.j = Y(c, d),
                                e.o = As(Math.min(1, ho(e.j) / 5256.25)))
                            }
                            break
                        }
                } else
                    b = !1;
                if (b || a.O)
                    a.o = b,
                    a.j = a.gamepad.g.j,
                    a.u = a.gamepad.g.o;
                a.O = b
            }
            for (const f of a.v)
                f();
            a.v = []
        }
        oa() {
            for (const a of this.V.values())
                a.O();
            for (const a of this.g.j)
                a.O()
        }
        wake() {
            super.wake();
            this.g.wake()
        }
    }
    ;
    lh.Ua();
    function Cs(a) {
        var b = Ds(a);
        b = yl(a.g, b.width, b.height);
        return new mj(a.g[3] * b,a.g[4] * b)
    }
    function Es(a) {
        const b = Cs(a);
        a.j = nr(N.width / 2 - b.width / 2, N.height / 2 - b.height / 2, b.width, b.height);
        um(a.u, a.j, d => {
            "mouseup" === d && (bs(a.u, a.j),
            a.v())
        }
        );
        vm(a.u, a.j);
        const c = document.createElement("canvas").getContext("2d");
        a.title = gm(c, T("error_eek"), P, 56, 20, .8 * b.width, 1);
        a.o = gm(c, T("error_something_went_wrong"), P, 48, 20, .8 * b.width, 1);
        a.i = gm(c, T("error_try_again"), P, 48, 20, b.width / 2, 1)
    }
    function Ds(a) {
        return new mj(Math.min(a.g[3], .8 * M),Math.min(a.g[4], .8 * Sg))
    }
    var Fs = class {
        constructor(a, b) {
            this.u = a;
            this.v = b;
            this.g = Zh;
            this.i = this.o = this.title = this.j = null
        }
        render(a) {
            if (this.title && this.o && this.i) {
                a.save();
                dm(a);
                a.translate(N.width / 2, N.height / 2);
                var b = Ds(this);
                b = V(this.g, a, 0, 0, b.width, b.height);
                a.scale(b, b);
                var c = this.g[4];
                V(Xh, a, 0, 0);
                a.fillStyle = "#5977ab";
                a.textAlign = "center";
                a.textBaseline = "middle";
                im(a, this.title, 0, -c / 2 + 50, this.title.fontSize);
                im(a, this.o, 0, -c / 2 + 110, this.o.fontSize);
                im(a, this.i, 0, 150, this.i.fontSize);
                c = gi[3];
                var d = gi[4]
                  , e = this.i;
                a.font = e.fontStyle + " " + e.fontSize + "px " + e.fontFamily;
                let f = 0;
                for (let g = 0; g < e.lines.length; g++) {
                    const h = a.measureText(e.lines[g]).width;
                    f = Math.max(f, h)
                }
                V(gi, a, f / 2 + 10 + b * c / 2, 150, b * c, b * d);
                a.restore()
            }
        }
    }
    ;
    var Gs = class {
        constructor() {
            this.g = new mr("times_up",64,.75 * M,3);
            this.g.Ga(0, 10);
            this.g.g = "#700";
            lr(this.g, "#F93");
            this.g.j = "center"
        }
        render(a, b) {
            a.save();
            if (0 >= b) {
                lh.Ua();
                b = Fh[4];
                lh.Ua();
                var c = fi[3];
                lh.Ua();
                var d = fi[4];
                V(Fh, a, 0, b / 2);
                V(fi, a, 0, b / 2, c / 2, d / 2);
                a.translate(0, 0);
                this.g.render(a)
            } else
                a.translate(0, 0),
                a.textAlign = "center",
                a.font = `60px ${P}`,
                a.fillStyle = "#700",
                a.fillText("" + b, 0, 0),
                a.strokeStyle = "#F93",
                a.strokeText("" + b, 0, 0);
            a.restore()
        }
    }
    ;
    var Is = class {
        constructor() {
            this.g = new Hs;
            this.i = !1;
            this.alpha = 1
        }
        reset() {
            this.g.reset();
            this.i = !1
        }
        render(a) {
            a.save();
            a.globalAlpha = this.alpha;
            this.g.render(a);
            a.restore()
        }
    }
    ;
    const As = Im(.39, .575, .565, 1);
    class Hs {
        constructor() {
            this.g = {
                x: 0,
                y: 0
            };
            this.i = {
                x: 0,
                y: 0
            };
            this.j = Y(0, 0);
            this.o = 0;
            this.u = !1
        }
        reset() {
            this.g = {
                x: 0,
                y: 0
            };
            this.i = {
                x: 0,
                y: 0
            };
            this.j = Y(0, 0);
            this.o = 0;
            this.u = !1
        }
        render(a) {
            var b = N.width / 2;
            var c = N.height - (N.height - (zl.height + zl.top)) / 2;
            var d = this.i.x - this.g.x
              , e = this.i.y - this.g.y;
            a.save();
            $l(Ph, b - 2, c + 8);
            $l(Qh, b + kj(-72.5, d, 72.5), c + kj(-72.5, e, 72.5));
            a.restore()
        }
    }
    function Js(a) {
        const b = N.getBoundingClientRect();
        return window.innerHeight > window.innerWidth ? {
            x: a.clientX - b.left,
            y: a.clientY - b.top
        } : {
            x: a.clientY - b.top,
            y: b.left - a.clientX
        }
    }
    ;function Ks(a, b, c) {
        return c ? Promise.resolve(b) : a.Wc(Eg.qf).then(d => Ag(Cg(Bg(new Dg, d.Uc), d.Ic), Eg.Od.name))
    }
    ;var Ls = class extends em {
        contains() {
            return !1
        }
    }
    ;
    function um(a, b, c) {
        a.i.push(new Ms(b,c))
    }
    function vm(a, b) {
        let c = null;
        for (let d = 0; d < a.i.length; d++)
            a.i[d].i === b && (c = a.i[d]);
        c && (bb(a.i, c),
        a.i.unshift(c))
    }
    function bs(a, b) {
        for (let c = a.i.length - 1; 0 <= c; c--)
            a.i[c].i === b && a.i.splice(c, 1);
        a.g && b === a.g.i && (a.g = null,
        Ns(a));
        a.j && b === a.j.i && (a.j = null);
        Os(a, "areamove", a.u, a.v)
    }
    function Ps(a) {
        var b = a.Yb.getBoundingClientRect();
        const c = a.o.Ed ? b.height : b.width;
        b = a.o.Ed ? b.width : b.height;
        const [d,e] = a.getSize();
        a.ya = d / c;
        a.V = e / b
    }
    function Ns(a) {
        var b = a.g && a.g.i.j() ? "pointer" : "default";
        for (const c of a.wa)
            pg(c, "cursor", b)
    }
    function Qs(a, b, c) {
        c = (b = (b = b.g) || window.event) ? (c = c || b.targetTouches && b.targetTouches[0] || b.changedTouches && b.changedTouches[0]) && void 0 !== c.pageX ? [c.pageX, c.pageY] : void 0 !== b.clientX ? [b.clientX + ("rtl" == document.dir ? -1 : 1) * (document.body.scrollLeft || document.documentElement.scrollLeft || 0), b.clientY + (document.body.scrollTop || document.documentElement.scrollTop || 0)] : void 0 !== b.pageX ? [b.pageX, b.pageY] : [0, 0] : [0, 0];
        b = a.Yb.getBoundingClientRect();
        if (a.o.Ed) {
            const d = b.right - c[0];
            c[0] = c[1] - b.top;
            c[1] = d
        } else
            c[0] -= b.left,
            c[1] -= b.top;
        c[0] *= a.ya;
        c[1] *= a.V;
        return c
    }
    function Os(a, b, c, d) {
        if (!a.H && "mousedown" === b) {
            a.H = !0;
            for (var e = 0; e < a.O.length; e++)
                a.O[e]()
        }
        if ("mousedown" === b) {
            if (!a.j)
                for (b = 0; b < a.i.length; b++)
                    if (e = a.i[b],
                    e.i.contains(c, d)) {
                        a.j = e;
                        a.g = e;
                        e.g("mousedown", c, d);
                        break
                    }
        } else if ("mouseup" === b)
            a.j ? (a.j.g("mouseup", c, d),
            a.j = null) : a.g && a.g.g("mouseup", c, d);
        else if ("mousemove" === b || "areamove" === b) {
            e = null;
            for (let f = 0; f < a.i.length; f++) {
                const g = a.i[f];
                if (g.i.contains(c, d)) {
                    e = g;
                    break
                }
            }
            a.g !== e && (a.g && a.g.g("mouseout", c, d),
            e && e.g("mouseover", c, d),
            a.g = e);
            if ("mousemove" === b)
                for (a.j && a.j.g("mousemove", c, d),
                b = 0; b < a.i.length; b++)
                    e = a.i[b],
                    e !== a.j && e.i.contains(c, d) && e.g("mousemove", c, d)
        } else
            "mouseout" === b ? (a.g && a.g.g("mouseout", c, d),
            a.j = null,
            a.g = null) : "contextmenu" === b && a.g && a.g.g("contextmenu", c, d);
        Ns(a)
    }
    var Rs = class {
        constructor(a) {
            this.o = a;
            this.i = [];
            this.g = this.j = null;
            this.v = this.u = 0;
            this.oa = this.H = !1;
            this.O = [];
            this.V = this.ya = 1;
            this.Yb = this.o.Yb;
            this.wa = [this.Yb];
            Pi(window, "resize", () => {
                Ps(this)
            }
            );
            a = () => {
                Qi(window, "resize", () => {
                    Ps(this)
                }
                )
            }
            ;
            window.hasOwnProperty("screen") && window.screen.hasOwnProperty("orientation") && !Of() ? Pi(screen.orientation, "change", a) : Pi(window, "orientationchange", a);
            Ps(this)
        }
        handleEvent(a) {
            Ps(this);
            var b = Qs(this, a)
              , c = b[1];
            this.u = b[0];
            this.v = c;
            a = a.type;
            this.oa && 0 === a.indexOf("mouse") || (b = {
                touchstart: "mousedown",
                touchend: "mouseup",
                touchmove: "mousemove"
            },
            a in b && (this.oa = !0,
            a = b[a]),
            Os(this, a, this.u, this.v))
        }
        getSize() {
            return [this.o.width, this.o.height]
        }
    }
      , Ss = ( () => {
        const a = new Ls;
        a.contains = () => !0;
        a.j = () => !1;
        return a
    }
    )();
    class Ms {
        constructor(a, b) {
            this.i = a;
            this.g = b
        }
    }
    ;class Ts {
        constructor(a, b) {
            this.j = a;
            this.o = b;
            this.i = {};
            this.g = document.getElementsByTagName("input")
        }
        handleEvent(a) {
            var b;
            if (b = a && a.j && this.o(a) && !a.ctrlKey && !a.metaKey && !a.altKey) {
                a: {
                    for (b = 0; b < this.g.length; b++)
                        if ("q" == this.g[b].name) {
                            b = this.g[b];
                            break a
                        }
                    b = null
                }
                b = !(b && b == document.activeElement)
            }
            if (b && (!document.activeElement || !document.activeElement.tagName || "textarea" != document.activeElement.tagName.toLowerCase())) {
                b = a.g;
                var c = b.keyCode;
                c && ("keydown" == a.type ? this.i[c] || (this.j(a),
                this.i[c] = !0) : "keyup" == a.type && (this.j(a),
                this.i[c] = !1),
                b.preventDefault && b.preventDefault(),
                b.stopPropagation && b.stopPropagation())
            }
        }
    }
    ;function Us(a) {
        um(a.V, Ss, (c, d, e) => {
            switch (c) {
            case "mousedown":
                window !== window.parent && window.focus();
                a.g && (a.o = !0,
                Vs(a, d, e));
                break;
            case "mousemove":
                Vs(a, d, e);
                break;
            case "mouseup":
                Ws(a)
            }
        }
        );
        const b = new Ts(c => {
            if ("keydown" === c.type) {
                if (a.g) {
                    a.i.set(c.keyCode, !0);
                    Xs(a);
                    var d = Pl();
                    c = c.keyCode;
                    192 === c ? (d.i && (d.j = !d.j),
                    d.i = !0) : d.i = !1;
                    d.j && (d = d.o.get(c)) && d()
                }
            } else
                "keyup" === c.type && Ys(a, c)
        }
        ,c => !!c.keyCode && !!Wg.get(c.keyCode));
        Pi(document, ["keydown", "keyup", "keypress"], c => {
            b.handleEvent(c)
        }
        , !0)
    }
    function Zs(a) {
        a.reset();
        a.g = !0;
        document.activeElement && document.activeElement.blur()
    }
    function $s(a) {
        a.g = !1;
        a.reset()
    }
    function Vs(a, b, c) {
        a.g && a.o && (a.j = Y(b - N.width / 2, c - N.height / 2),
        a.u = ho(a.j) ? 1 : 0)
    }
    function Ws(a) {
        a.g && a.v.push( () => {
            a.j = Y(0, 0);
            a.o = !1;
            a.u = 0
        }
        )
    }
    function Ys(a, b) {
        a.g && a.v.push( () => {
            a.i.set(b.keyCode, !1);
            Xs(a)
        }
        )
    }
    function Xs(a) {
        const b = Y(0, 0);
        (a.i.get(37) || a.i.get(65)) && b.x--;
        (a.i.get(39) || a.i.get(68)) && b.x++;
        (a.i.get(38) || a.i.get(87)) && b.y--;
        (a.i.get(40) || a.i.get(83)) && b.y++;
        a.H = 0 !== b.x || 0 !== b.y;
        a.j = b;
        a.u = a.H ? 1 : 0
    }
    function at(a, b) {
        const c = b.g.changedTouches[0];
        if (!c)
            return null;
        a = Qs(a.V, b, c);
        return {
            x: a[0],
            y: a[1]
        }
    }
    var bt = class {
        constructor(a, b) {
            this.V = a;
            this.gamepad = b;
            this.i = new Map;
            this.v = [];
            this.j = Y(0, 0);
            this.u = 1;
            this.g = this.O = this.o = this.H = !1;
            Qf() ? (Pi(N, "touchstart", this.wa, void 0, this),
            Pi(N, "touchmove", this.ya, void 0, this),
            Pi(N, "touchend", this.oa, void 0, this)) : Us(this)
        }
        reset() {
            this.i.clear();
            this.v = [];
            this.j = Y(0, 0);
            this.u = 1;
            this.O = this.o = this.H = !1
        }
        wa(a) {
            if (this.g && at(this, a)) {
                var b = this.gamepad;
                b.i = !0;
                b = b.g;
                b.g = Js(a);
                b.i = b.g;
                this.o = b.u = !0
            }
        }
        ya(a) {
            if (this.g && at(this, a) && this.o) {
                var b = this.gamepad;
                b.i && (b = b.g,
                b.i = Js(a),
                b.j = Y(b.i.x - b.g.x, b.i.y - b.g.y),
                b.o = As(Math.min(1, ho(b.j) / 5256.25)));
                this.j = this.gamepad.g.j;
                this.u = this.gamepad.g.o
            }
        }
        oa(a) {
            this.g && at(this, a) && this.v.push( () => {
                var b = this.gamepad
                  , c = b.g;
                c.g = {
                    x: 0,
                    y: 0
                };
                c.i = {
                    x: 0,
                    y: 0
                };
                c.o = 0;
                c.u = !1;
                b.i = !1;
                this.j = Y(0, 0);
                this.u = 0;
                this.o = !1
            }
            )
        }
    }
    ;
    function ct(a) {
        return 50 < a.g && 2E3 > a.g ? new Promise(b => {
            setTimeout(b, 2E3 - a.g)
        }
        ) : Promise.resolve()
    }
    var dt = class {
        constructor() {
            this.g = 0;
            const a = new Tq(ti);
            a.Ga(-100, 0);
            a.opacity = 0;
            const b = new Tq(ti);
            b.Ga(0, 0);
            b.opacity = 0;
            const c = new Tq(ti);
            c.Ga(100, 0);
            c.opacity = 0;
            this.i = [a, b, c];
            this.j = new Cm([new W(new X({
                opacity: 0,
                y: 0
            },{
                opacity: 1,
                y: -15
            },500),d => {
                a.opacity = d.opacity;
                a.Ga(a.Cb().x, d.y)
            }
            ), new W(new X({
                opacity: 0,
                y: 0
            },{
                opacity: 1,
                y: -15
            },500),d => {
                a.opacity = 1 - d.opacity;
                a.Ga(a.Cb().x, -15 - d.y);
                b.opacity = d.opacity;
                b.Ga(b.Cb().x, d.y)
            }
            ), new W(new X({
                opacity: 0,
                y: 0
            },{
                opacity: 1,
                y: -15
            },500),d => {
                b.opacity = 1 - d.opacity;
                b.Ga(b.Cb().x, -15 - d.y);
                c.opacity = d.opacity;
                c.Ga(c.Cb().x, d.y)
            }
            ), new W(new X({
                opacity: 1,
                y: -15
            },{
                opacity: 0,
                y: 0
            },500),d => {
                c.opacity = d.opacity;
                c.Ga(c.Cb().x, d.y)
            }
            )],!0)
        }
        render(a) {
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.fillStyle = "#000";
            a.fillRect(0, 0, a.canvas.width, a.canvas.height);
            for (const b of this.i)
                b.render(a.canvas.width / 2, a.canvas.height / 2)
        }
    }
    ;
    var ft = () => {
        var a = et
          , b = "wc";
        if (a.wc && a.hasOwnProperty(b))
            return a.wc;
        b = new a;
        return a.wc = b
    }
    ;
    function gt(a, b) {
        const c = a.g[b];
        c && (c.od && (clearTimeout(c.od),
        c.od = 0),
        c.lc && (c.lc.parentNode && c.lc.parentNode.removeChild(c.lc),
        c.lc = null),
        c.xe = null,
        c.Tc = null,
        c.Nc || delete a.g[b])
    }
    function ht(a, b, c) {
        var d = ft();
        let e = d.g[a];
        if (e) {
            if (e.Nc) {
                b && b(e.Nc);
                return
            }
            if (e.od)
                return
        } else
            e = {
                Tc: c,
                If: a,
                lc: null,
                xe: b,
                od: 0,
                Nc: null
            };
        e.lc || (e.lc = document.createElement("script"));
        b = "c" + ++d.i;
        it[b] = function(f) {
            var g = ft()
              , h = e;
            h.Nc = f.id;
            h.Nc ? h.xe && h.xe(h.Nc) : h.Tc && h.Tc();
            gt(g, h.If)
        }
        ;
        b = Qe({
            callback: "google.doodle.lsc." + b,
            url: a
        });
        ig(e.lc, b);
        e.od = setTimeout( () => {
            e.Tc && e.Tc();
            gt(ft(), a)
        }
        , 2E3);
        d.j.appendChild(e.lc);
        d.g[a] = e
    }
    class et {
        constructor() {
            this.g = {};
            this.i = 0;
            this.j = document.body
        }
        reset() {
            for (const a in this.g)
                gt(this, a);
            this.g = {}
        }
    }
    const it = {};
    ra("google.doodle.lsc", it);
    const zg = Lq();
    lh.Ua();
    const jt = Qf() ? 130 : 86;
    function kt(a) {
        pg(a.g, "textAlign", "center", "border", "none", "padding", "0", "background", "none", "font", `${a.fontSize}px sans-serif`, "pointerEvents", "auto");
        const b = lt();
        b.onclick = () => {
            xr(a.g.textContent, b).then( () => {
                Bl(a.j, !0);
                setTimeout( () => {
                    Bl(a.j, !1)
                }
                , 2E3)
            }
            )
        }
        ;
        a.ta = document.createElement("div");
        a.ta.classList.add("shareLinkContainer");
        a.ta.style.position = "absolute";
        a.oa.appendChild(a.ta);
        a.ta.appendChild(b);
        a.ta.appendChild(a.g);
        a.ta.appendChild(a.j);
        a.H && (a.o = !0,
        a.H.then(c => {
            zg.set(a.V ? 3 : 2, c);
            const d = yg();
            ht(d, e => {
                a.o = !1;
                a.g.textContent = 0 == e.indexOf("//") ? "https:" + e : e;
                mt(a)
            }
            , () => {
                a.o = !1;
                a.g.textContent = 0 == d.indexOf("//") ? "https:" + d : d;
                mt(a)
            }
            )
        }
        ))
    }
    function mt(a) {
        var b = yl(a.i, .9 * M, a.i[4])
          , c = b * (a.i[3] - 48);
        const d = Math.floor(c / N.width * N.offsetWidth);
        b *= a.i[4] - 48;
        const e = Math.floor(b / N.height * N.offsetHeight)
          , [f,g] = [Math.floor((a.ya[3] - c) / 2 / N.width * N.offsetWidth + N.offsetLeft), Math.floor((jt - b / 2) / N.height * N.offsetHeight + N.offsetTop)];
        !a.ta || a.ta.offsetLeft === f && a.ta.offsetTop === g && a.ta.offsetWidth === d && a.ta.offsetHeight === e || (a.fontSize = 48,
        pg(a.ta, "left", `${f}px`, "top", `${g}px`, "width", `${d}px`, "height", `${e}px`),
        pg(a.g, "fontSize", `${a.fontSize}px`));
        c = N.getContext("2d");
        c = gm(c, a.g.textContent, "sans-serif", 48, 12, a.g.clientWidth, 1);
        pg(a.g, "fontSize", `${c.fontSize}px`)
    }
    var nt = class {
        constructor(a, b, c, d) {
            this.O = a;
            this.H = b;
            this.V = c;
            this.ya = d;
            this.fontSize = 48;
            this.ta = null;
            this.i = hi;
            this.o = !1;
            this.u = 0;
            this.g = document.createElement("div");
            this.g.classList.add("shareLink");
            this.oa = document.getElementById("ddlDomRoot");
            this.j = document.createElement("div");
            this.j.classList.add("shareLinkCopied");
            this.j.style.font = `28px ${P}`;
            this.j.textContent = T("share_link_copied");
            this.v = new mr("share_invite_link",24,.9 * M);
            this.v.g = "#ff8c00"
        }
        update(a) {
            this.u = (this.u + a / 150) % (2 * Math.PI)
        }
        dispose() {
            bs(this.O, null);
            ft().reset();
            this.ta && (this.ta.remove(),
            this.ta = null)
        }
        render(a) {
            var b = a.canvas.width;
            const c = b / 2;
            b = V(this.i, a, c, jt, .9 * b, this.i[4]);
            this.v.Ga(c, jt + b * this.i[4] / 2 + 24);
            this.v.render(a);
            mt(this);
            this.o && (a.save(),
            a.strokeStyle = "#333",
            a.lineWidth = 4,
            a.beginPath(),
            a.arc(c, jt, b * this.i[4] / 4, this.u, this.u + Math.PI / 3),
            a.stroke(),
            a.restore())
        }
    }
    ;
    const lt = () => {
        const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        a.classList.add("shareButton");
        a.setAttribute("viewBox", "0 0 24 24");
        a.setAttribute("width", "24");
        a.setAttribute("height", "24");
        const b = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        b.setAttribute("cx", "12");
        b.setAttribute("cy", "12");
        b.setAttribute("r", "12");
        b.setAttribute("fill", "white");
        const c = document.createElementNS("http://www.w3.org/2000/svg", "path");
        c.setAttribute("transform", "translate(4, 4) scale(0.66)");
        c.setAttribute("d", "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z");
        a.appendChild(b);
        a.appendChild(c);
        return a
    }
    ;
    const ot = [{
        height: 86
    }, {
        height: 78,
        Tb: 12
    }, {
        height: 151,
        Tb: 12
    }, {
        height: 102
    }, {
        height: 106
    }, {
        height: 90,
        Tb: 18
    }, {
        height: 150,
        Tb: 6
    }, {
        height: 130
    }]
      , pt = 1E3 / 24
      , qt = [a => new Dm([new W(new X({
        y: a.Cb().y
    },{
        y: a.Cb().y - 8
    },12 * pt,Lm,!0,!0),b => {
        a.Ga(a.Cb().x, b.y)
    }
    ), new Cm([new W(new X({
        opacity: 0
    },{
        opacity: 1
    },24 * pt,Lm),b => {
        a.opacity = b.opacity
    }
    ), new Bm(16 * pt), new W(new X({
        opacity: 1
    },{
        opacity: 0
    },11 * pt,Lm),b => {
        a.opacity = b.opacity
    }
    ), new Bm(11 * pt)],!0)]), null, a => new Cm([new W(new X({
        opacity: 0
    },{
        opacity: 1
    },16 * pt,Lm),b => {
        a.opacity = b.opacity
    }
    ), new Bm(1250), new W(new X({
        opacity: 1
    },{
        opacity: 0
    },13 * pt,Lm),b => {
        a.opacity = b.opacity
    }
    ), new Bm(13 * pt)],!0), a => {
        a.opacity = 0;
        return new Cm([new Bm(10 * pt), new W(new X({
            opacity: 0
        },{
            opacity: 1
        },16 * pt,Lm),b => {
            a.opacity = b.opacity
        }
        ), new Bm(26 * pt), new W(new X({
            opacity: 1
        },{
            opacity: 0
        },20 * pt,Lm),b => {
            a.opacity = b.opacity
        }
        )],!0)
    }
    , a => new Dm([new Cm([new W(new X({
        x: a.Cb().x
    },{
        x: a.Cb().x + 132
    },50 * pt,Lm),b => {
        a.Ga(b.x, a.Cb().y)
    }
    ), new Bm(22 * pt)],!0), new W(new X({
        y: a.Cb().y
    },{
        y: a.Cb().y - 15
    },9 * pt,Lm,!0,!0),b => {
        a.Ga(a.Cb().x, b.y)
    }
    ), new Cm([new W(new X({
        opacity: 0
    },{
        opacity: 1
    },8 * pt,Lm),b => {
        a.opacity = b.opacity
    }
    ), new Bm(35 * pt), new W(new X({
        opacity: 1
    },{
        opacity: 0
    },7 * pt,Lm),b => {
        a.opacity = b.opacity
    }
    ), new Bm(22 * pt)],!0)]), null, null, a => new Cm([new W(new X({
        opacity: 0
    },{
        opacity: 1
    },16 * pt),b => {
        a.opacity = b.opacity
    }
    ), new Bm(32 * pt), new W(new X({
        opacity: 1
    },{
        opacity: 0
    },13 * pt),b => {
        a.opacity = b.opacity
    }
    ), new Bm(11 * pt)],!0)]
      , rt = (Qf() ? [{
        position: new Q(244,193)
    }, {
        position: new Q(405,716)
    }, {
        position: new Q(207,648)
    }, {
        position: new Q(401,415)
    }, {
        position: new Q(200,480)
    }, {
        position: new Q(151,404)
    }, {
        position: new Q(107,209)
    }, {
        position: new Q(100,864)
    }] : [{
        position: new Q(484,168)
    }, {
        position: new Q(362,193),
        scale: new Q(1,-1)
    }, {
        position: new Q(456,344)
    }, {
        position: new Q(769,419),
        rotation: 5 * Math.PI / 180
    }, {
        position: new Q(635,296)
    }, {
        position: new Q(162,308),
        rotation: -10 * Math.PI / 180
    }, {
        position: new Q(97,433),
        rotation: 60 * Math.PI / 180,
        scale: new Q(-1,1)
    }, {
        position: new Q(875,390)
    }]).map( (a, b) => Object.assign(a, ot[b]))
      , st = [{
        height: 116
    }, {
        height: 126
    }, {
        height: 136
    }, {
        height: 109
    }, {
        height: 113
    }, {
        height: 115
    }, {
        height: 129
    }, {
        height: 127
    }]
      , tt = (Qf() ? [{
        position: new Q(216,496)
    }, {
        position: new Q(128,372)
    }, {
        position: new Q(140,514)
    }, {
        position: new Q(116,638)
    }, {
        position: new Q(368,364)
    }, {
        position: new Q(430,532)
    }, {
        position: new Q(326,494)
    }, {
        position: new Q(398,675)
    }] : [{
        position: new Q(414,276)
    }, {
        position: new Q(274,174),
        rotation: -12 * Math.PI / 180
    }, {
        position: new Q(314,316),
        rotation: -7 * Math.PI / 180
    }, {
        position: new Q(216,392)
    }, {
        position: new Q(586,282)
    }, {
        position: new Q(682,332),
        rotation: 15 * Math.PI / 180
    }, {
        position: new Q(688,206)
    }, {
        position: new Q(798,402),
        rotation: -14 * Math.PI / 180
    }]).map( (a, b) => Object.assign(a, st[b]));
    var ut = class {
        constructor(a) {
            this.v = a;
            this.o = rt;
            this.j = this.g = null;
            this.u = [1, 2, 3, 4, 5, 6, 7, 8].map( (b, c) => {
                b = Xm(b, "lobby");
                b = new Tq(b);
                b.i = !1;
                b.Tb = rt[c].Tb || 0;
                c = rt[c].position;
                b.Ga(c.x, c.y);
                return b
            }
            );
            this.H = [1, 2, 3, 4, 5, 6, 7, 8].map( (b, c) => {
                b = Xm(b, "ready");
                b = new Tq(b);
                b.i = !1;
                c = tt[c].position;
                b.Ga(c.x, c.y);
                return b
            }
            );
            this.actions = qt.map( (b, c) => b ? b(this.u[c]) : null);
            this.i = this.u;
            a || (this.g = new Tq(si),
            a = rt[0].position,
            this.g.Ga(a.x + 23, a.y),
            this.j = new X({
                y: a.y
            },{
                y: a.y - 8
            },12 * pt,Lm,!0,!0),
            this.j.start());
            this.state = 0
        }
        update(a) {
            if (0 === this.state) {
                for (const b of this.u)
                    b.update(a);
                if (!this.v) {
                    this.j.update(a);
                    this.g.update(a);
                    this.g.Ga(this.g.Cb().x, zm(this.j).y);
                    for (const b of this.actions)
                        b && b.update(a)
                }
            }
        }
        render() {
            for (let a = 0; a < this.i.length; a++) {
                const b = this.o[a];
                this.i[a].render(void 0, void 0, b.height, b.rotation || 0, !0, void 0 !== b.scale ? b.scale.x : 1, void 0 !== b.scale ? b.scale.y : void 0)
            }
            this.v || 0 !== this.state || this.g.render()
        }
    }
    ;
    function vt(a) {
        a: {
            var b = a.match(wt);
            if (b) {
                var c = Number(b[1]);
                const d = Number(b[2]);
                b = Number(b[3]);
                if (0 <= c && 255 >= c && 0 <= d && 255 >= d && 0 <= b && 255 >= b) {
                    c = [c, d, b];
                    break a
                }
            }
            c = []
        }
        if (!c.length)
            throw Error("P`" + a);
        return c
    }
    function xt(a) {
        var b = a[0]
          , c = a[1];
        a = a[2];
        b = Number(b);
        c = Number(c);
        a = Number(a);
        if (b != (b & 255) || c != (c & 255) || a != (a & 255))
            throw Error("Q`" + b + "`" + c + "`" + a);
        c = b << 16 | c << 8 | a;
        return 16 > b ? "#" + (16777216 | c).toString(16).slice(1) : "#" + c.toString(16)
    }
    var wt = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
    function zt(a) {
        var b = [255, 255, 255];
        var c = kj(.5, 0, 1);
        return [Math.round(a[0] + c * (b[0] - a[0])), Math.round(a[1] + c * (b[1] - a[1])), Math.round(a[2] + c * (b[2] - a[2]))]
    }
    ;var At = class {
        constructor() {
            var a = Qf() ? 80 : 60;
            this.j = new mr("connected",80,M - 20);
            this.j.g = "#773903";
            lr(this.j, "#ff8d03", 6);
            this.j.Ga(M / 2, a);
            this.o = new mr("connected",80,M - 20);
            this.o.g = "#773903";
            this.o.Ga(M / 2, a);
            a += 90;
            this.g = new mr("team_alpha",64,M / 2 - 30);
            this.g.j = "right";
            this.g.Ga(M / 2 - 50, a);
            this.g.g = "rgb(50,255,100)";
            lr(this.g, xt(zt(vt("rgb(50,255,100)"))));
            this.i = new mr("team_bravo",64,M / 2 - 30);
            this.i.j = "left";
            this.i.Ga(M / 2 + 50, a);
            this.i.g = "rgb(100,0,255)";
            lr(this.i, xt(zt(vt("rgb(100,0,255)"))));
            this.u = new mr("versus",48,60);
            this.u.Ga(M / 2, a)
        }
        render(a) {
            this.j.render(a);
            this.o.render(a);
            this.g.render(a);
            this.i.render(a);
            this.u.render(a)
        }
    }
    ;
    var Bt = class {
        constructor(a, b) {
            this.j = b;
            b = xt(zt(vt(this.j)));
            this.o = new mr("you_are",64,M - 20);
            this.i = new mr(1 === a ? "team_alpha" : "team_bravo",Qf() ? 120 : 100,M - 20);
            this.i.g = this.j;
            lr(this.i, b);
            this.i.Ga(0, Qf() ? 90 : 80);
            var c = Tk();
            if (this.g = c.hl && "en" !== c.hl && "en-GB" !== c.hl ? new mr(1 === a ? "alpha_team" : "bravo_team",Qf() ? 120 : 72,M - 20) : null)
                this.g.g = this.j,
                lr(this.g, b),
                this.g.Ga(0, Qf() ? 90 : 80)
        }
        render(a) {
            const b = a.canvas.width / 2;
            a.save();
            a.translate(b, Qf() ? 120 : 60);
            this.g ? this.g.render(a) : (this.o.render(a),
            this.i.render(a));
            a.restore()
        }
    }
    ;
    const Ct = lh.Ua()
      , Dt = L ? -11 : 15
      , Et = L ? 795 : 427
      , Ft = L ? 120 : 83
      , Gt = L ? 150 : 267
      , Ht = L ? 2 : 1.5
      , It = L ? 829 : 429;
    function Jt(a, b) {
        a.re = b;
        if (a.qb) {
            var c = a.Wa;
            c.i = [];
            c.o = [];
            for (let d = 0; d < b; d++) {
                const e = Math.floor(d % 2 ? d / 2 + 4 : d / 2);
                c.i.push(c.H[e]);
                c.o.push(tt[e])
            }
            c = a.Oa;
            c.text = a.mc.replace("[NUM]", `${b}`);
            c.i = kr(c)
        }
    }
    function Kt(a, b) {
        a.state = b;
        a.v = 0;
        var c = a.ya;
        c.i = kr(c);
        c = a.Ka;
        c.i = kr(c);
        0 !== b && a.i && (c = a.i,
        c.ta && (c.ta.remove(),
        c.ta = null));
        switch (b) {
        case 0:
            xl(a.Ja, 3428);
            a.g = L ? Th : Sh;
            a.qb && kt(a.i);
            break;
        case 7:
            a.u = new X({
                opacity: 0
            },{
                opacity: 1
            },250,Mm);
            a.u.start();
            R.zf.play();
            a.Ja.stop();
            break;
        case 1:
            a.g = L ? Vh : Uh;
            a = a.Wa;
            a.i = a.H;
            a.o = tt;
            a.state = 1;
            break;
        case 2:
            a.j = new X({
                scale: 1
            },{
                scale: a.g[3] / Gt
            },250,Im(.95, .05, .795, .035));
            a.wa = new X({
                x: a.g[3] / 2,
                y: a.g[4] / 2
            },{
                x: N.width / 2 + Dt,
                y: Et + 70
            },250,Lm);
            a.j.start();
            a.wa.start();
            break;
        case 4:
            a.O.play();
            a.g = L ? Vh : Uh;
            a.oa = new X({
                scale: .2
            },{
                scale: 1
            },250,Im(.95, .05, .795, .035));
            a.oa.start();
            break;
        case 5:
            a.O.stop();
            a.dispose();
            break;
        case 6:
            a.dispose()
        }
    }
    function Lt(a, b, c) {
        0 === a.state && (a.H = new Tq(Xm(b, "idle")),
        a.H.i = !1,
        a.yb = $m(b, d => {
            a.H.Ga(0, d.y)
        }
        ),
        b = 1 === c ? "rgb(50,255,100)" : "rgb(100,0,255)",
        a.Mb = new At,
        a.Nb = new Bt(c,b),
        Kt(a, 7))
    }
    function Mt(a) {
        Kt(a, 6);
        a.Ba || (a.Ba = new Fs(a.V, () => {
            document.location.reload()
        }
        ));
        Es(a.Ba);
        R.nf.play();
        a.Ja.stop()
    }
    function Nt(a, b) {
        const c = b.canvas.width / 2;
        a.i.render(b);
        const d = a.Xa[3]
          , e = a.Xa[4]
          , f = c - d / 2
          , g = It - e / 2
          , h = g + e + 24;
        if (!a.Zb || a.Lb)
            a.Da ? (V(a.Xa, b, c, It),
            a.ya.render(b),
            a.o || (a.o = nr(f, g, d, e),
            um(a.V, a.o, k => {
                if ("mousedown" === k) {
                    bs(a.V, a.o);
                    k = a.ya;
                    var l = T("game_starting");
                    k.text = l;
                    k.i = kr(k);
                    a.Wb()
                }
            }
            ),
            vm(a.V, a.o))) : a.Eb.render(b);
        a.Oa.Ga(c, h);
        a.Oa.render(b)
    }
    var Ot = class {
        constructor(a, b, c, d, e, f=!1) {
            this.V = a;
            this.qb = b;
            this.Da = c;
            this.Wb = e;
            this.Zb = f;
            this.state = null;
            this.v = 0;
            this.g = L ? Th : Sh;
            this.Ab = L ? null : Rh;
            this.Xa = Bh;
            this.Nb = this.Mb = this.H = this.yb = this.oa = this.u = this.wa = this.j = this.o = null;
            this.Kb = Gh;
            this.Ja = R.vd;
            this.Ba = null;
            this.Lb = !1;
            this.i = b ? new nt(a,d,c,this.g) : null;
            this.ya = new mr("start_game",48,.7 * this.Xa[3]);
            this.ya.g = "#f0f";
            this.ya.Ga(M / 2, It);
            this.mc = T("num_players_ready");
            this.Oa = new mr("num_players_ready",24,.8 * M);
            this.Oa.g = "#fff";
            this.Eb = new mr("waiting_for_host",48,.8 * M);
            this.Eb.g = "#fff";
            this.Eb.Ga(M / 2, It);
            lh.Ua();
            this.Ka = new mr("waiting_for_players",64,1.6 * this.Kb[3] - 46);
            this.Ka.Ga(M / 2, 70);
            this.Ka.g = "#000";
            this.Wa = new ut(b);
            this.O = new Tq(ri);
            this.O.i = !1;
            this.O.setLoop(!1);
            this.re = b ? 1 : 8;
            Jt(this, this.re);
            Kt(this, 0);
            this.qb ? this.Da ? Jk(6) : Jk(5) : Jk(4)
        }
        dispose() {
            this.Ja.stop();
            this.i && this.i.dispose();
            this.o && bs(this.V, this.o)
        }
        render(a) {
            var b = a.canvas.width
              , c = a.canvas.height;
            const d = b / 2;
            a.fillStyle = "#000";
            a.fillRect(0, 0, b, c);
            a.save();
            c = 1;
            this.j && null !== this.j.g && (c = zm(this.j),
            b = zm(this.wa),
            c = c.scale,
            a.translate(b.x, b.y),
            a.scale(c, c),
            a.translate(-b.x, -b.y));
            V(this.g, a, this.g[3] / 2, this.g[4] / 2);
            this.Ab && ih(Ct, this.Ab, a, this.g[3] / 2 + 18, this.g[4] - .291 * this.Ab[4] / 2 - 40, .291, !0);
            this.O.render(d + Dt, Et, Ft);
            if (4 === this.state || 5 === this.state)
                a.save(),
                a.translate(d + Dt, Et + 20),
                c = zm(this.oa).scale * Ht / c,
                this.H.render(0, 0, 150, 0, !1, c),
                a.restore();
            this.Wa.render();
            1 !== this.state && 2 !== this.state || this.Mb.render(a);
            a.restore();
            0 === this.state ? this.i ? Nt(this, a) : ($l(this.Kb, d, 70, void 0, 0, !1, 1.6, 1, 1),
            this.Ka.render(a)) : 4 === this.state || 5 === this.state ? this.Nb.render(a) : 6 === this.state ? this.Ba.render(a) : 7 === this.state && (a.save(),
            a.setTransform(1, 0, 0, 1, 0, 0),
            a.fillStyle = "#fff",
            a.globalAlpha = zm(this.u).opacity,
            a.fillRect(0, 0, a.canvas.width, a.canvas.height),
            a.restore())
        }
    }
    ;
    function Pt(a, b) {
        a.g.push(b)
    }
    var Qt = class {
        constructor() {
            this.g = []
        }
    }
    ;
    var Rt = class {
        constructor(a, b, c, d) {
            this.g = c;
            c = new $o;
            c.type = 0;
            c.position.set(a, b);
            this.body = cp(d, c);
            this.body.kf = this;
            a = new bp;
            a.j = !0;
            a.g = Yo(1, 1);
            a.filter.g = 128;
            a.filter.i = 3;
            dp(this.body, a)
        }
        getId() {
            return this.g
        }
    }
    ;
    var St = class {
        constructor(a, b, c, d, e, f, g) {
            this.i = b;
            this.width = e;
            this.height = f;
            const h = new $o;
            h.type = 0;
            h.position.set(c, d);
            this.body = cp(g, h);
            this.body.Ab = this;
            c = new bp;
            c.H = .1;
            c.i = 1E3;
            c.filter.g = b ? 1024 : 8;
            c.filter.i = 35;
            b = null;
            switch (a) {
            case 1:
                b = Yo(e, f);
                break;
            case 2:
            case 4:
                b = Zo(Y(-e, f), Y(e, -f));
                break;
            case 3:
            case 5:
                b = Zo(Y(-e, -f), Y(e, f))
            }
            this.g = c.g = b;
            dp(this.body, c)
        }
    }
    ;
    var Tt = class extends St {
        render(a) {
            if (this.g && !(2 > this.g.o)) {
                a.save();
                a.globalAlpha = .3;
                a.fillStyle = "#000";
                a.strokeStyle = this.i ? "#40e0d0" : "#0f0";
                var b = this.body.va.position
                  , c = Pl()
                  , d = this.g.g;
                a.beginPath();
                a.moveTo(Wl(c, b.x + d[0].x), Xl(c, b.y + d[0].y));
                for (let e = 1; e < d.length; ++e)
                    a.lineTo(Wl(c, b.x + d[e].x), Xl(c, b.y + d[e].y));
                a.closePath();
                a.fill();
                a.stroke();
                a.restore()
            }
        }
    }
    ;
    function Ut(a, b, c, d) {
        const e = a.g.Kd.tiles;
        let f;
        for (const h of a.g.layers) {
            var g = +h.tiles[d * a.g.width + c] & 536870911;
            0 !== g && (g = e[g].properties,
            b in g && (f = g[b]))
        }
        return f
    }
    function Vt(a, b, c, d, e) {
        const f = a.g.Kd.tiles;
        for (const h of a.g.layers) {
            var g = +h.tiles[e * a.g.width + d] & 536870911;
            if (0 !== g && (g = f[g].properties,
            b in g && g[b] === c))
                return !0
        }
        return !1
    }
    function Wt(a, b, c) {
        const d = a.g.Kd.tiles;
        let e;
        for (const g of a.g.layers) {
            var f = +g.tiles[c * a.g.width + b] & 536870911;
            0 !== f && (f = d[f].objectgroup) && (e = f)
        }
        return e
    }
    function Xt(a, b, c) {
        a = Wt(a, b, c);
        if (!a)
            return null;
        c = a.objects;
        if (!c || !c.length)
            return null;
        b = [];
        for (const g of c) {
            var d = a.x + g.x
              , e = a.y + g.y;
            c = [];
            var f = !1;
            if (g.polygon) {
                for (const h of g.polygon)
                    c.push({
                        x: d + h.x,
                        y: e + h.y
                    });
                f = !0
            } else if (g.polyline)
                for (const h of g.polyline)
                    c.push({
                        x: d + h.x,
                        y: e + h.y
                    });
            else if (g.ellipse)
                console.error("Unsupported elliptical shadow object");
            else {
                f = d;
                const h = e;
                d += g.width;
                e += g.height;
                c.push({
                    x: f,
                    y: h
                });
                c.push({
                    x: d,
                    y: h
                });
                c.push({
                    x: d,
                    y: e
                });
                c.push({
                    x: f,
                    y: e
                });
                f = !0
            }
            for (e = 1; e < c.length; ++e)
                b.push([c[e - 1], c[e]]);
            f && b.push([c[c.length - 1], c[0]])
        }
        return b
    }
    function Yt(a, b, c) {
        a = Ut(a, "wall", b, c);
        switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return a;
        default:
            return 0
        }
    }
    var Zt = class {
        constructor() {
            this.g = null
        }
        getSize() {
            return {
                x: this.g.width,
                y: this.g.height
            }
        }
    }
    ;
    var $t = class {
        constructor(a, b) {
            this.x = a;
            this.y = b;
            this.g = this.j = this.i = !1;
            this.parent = null
        }
    }
      , au = class {
        constructor(a, b) {
            this.width = a;
            this.height = b;
            this.g = Array(b);
            for (let c = 0; c < b; c++) {
                this.g[c] = Array(a);
                for (let d = 0; d < a; d++)
                    this.g[c][d] = new $t(d,c)
            }
        }
        reset() {
            for (let a = 0; a < this.height; a++)
                for (let b = 0; b < this.width; b++)
                    this.g[a][b].j = !1,
                    this.g[a][b].g = !1,
                    this.g[a][b].parent = null
        }
    }
    ;
    function bu(a, b) {
        const c = []
          , d = (g, h, k, l, m, n) => {
            k = cu(a, k, l);
            m = 2 * m / 2;
            n = 2 * n / 2;
            c.push(new Tt(g,h,k.x + m,k.y + n,m,n,b))
        }
        ;
        var e = du(a, (g, h) => 1 === Yt(a.map, g, h));
        for (var f of e)
            d(1, !1, f.x, f.y, f.width, f.height);
        e = a.map.getSize();
        for (f = 0; f < e.y; f++)
            for (let g = 0; g < e.x; g++) {
                const h = Yt(a.map, g, f);
                switch (h) {
                case 2:
                case 3:
                case 4:
                case 5:
                    d(h, !1, g, f, 1, 1)
                }
            }
        e = a.map.getSize();
        d(1, !0, -1, -1, e.x + 2, 1);
        d(1, !0, -1, e.y, e.x + 2, 1);
        d(1, !0, -1, 0, 1, e.y);
        d(1, !0, e.x, 0, 1, e.y)
    }
    function eu(a, b) {
        const c = a.map.getSize()
          , d = new au(c.x,c.y);
        for (let e = 0; e < c.y; e++)
            for (let f = 0; f < c.x; f++)
                if (0 !== Yt(a.map, f, e) || Vt(a.map, 1 === b ? "Alpha Base" : "Bravo Base", !0, f, e))
                    for (let g = -1; 1 >= g; g++)
                        for (let h = -1; 1 >= h; h++)
                            f + g < c.x && 0 <= f + g && e + h < c.y && 0 <= e + h && (d.g[e + h][f + g].i = !0)
    }
    function cu(a, b, c) {
        a = a.map.getSize();
        return {
            x: 2 * (b - .5) - a.x + 1,
            y: 2 * (c - .5) - a.y + 1
        }
    }
    function du(a, b) {
        var c = a.map.getSize();
        a = [];
        for (var d = 0; d < c.y; d++) {
            var e = -1;
            for (let f = 0; f < c.x; f++)
                if (b(f, d) && 0 > e && (e = f),
                (!b(f, d) || f === c.x - 1) && 0 <= e) {
                    let g = f - e;
                    f === c.x - 1 && ++g;
                    a.push({
                        x: e,
                        y: d,
                        width: g,
                        height: 1
                    });
                    e = -1
                }
        }
        for (b = 0; b < a.length; ++b)
            for (c = a[b],
            d = b + 1; d < a.length; ++d)
                e = a[d],
                c.x === e.x && c.width === e.width && c.y + c.height === e.y && (c.height += e.height,
                a.splice(d, 1),
                d--);
        return a
    }
    function fu(a) {
        const b = [];
        var c = du(a, (d, e) => Vt(a.map, "Alpha Base", !0, d, e));
        for (const d of c) {
            c = cu(a, d.x, d.y);
            const e = new an;
            F(e, 1, 1);
            Cd(e, 2, d.width);
            Cd(e, 3, d.height);
            const f = new en;
            dn(f, a.j.Ba++);
            F(f, 2, 4);
            zd(f, 3, c.x + d.width);
            zd(f, 4, c.y + d.height);
            yd(f, 8, e);
            b.push(gu(a, f))
        }
    }
    function hu(a) {
        const b = []
          , c = a.map.getSize();
        for (let h = 0; h < c.y; h++)
            for (let k = 0; k < c.x; k++)
                if (Vt(a.map, "Candle", !0, k, h)) {
                    var d = cu(a, k, h)
                      , e = new en;
                    dn(e, a.j.Ba++);
                    F(e, 2, 16);
                    zd(e, 3, d.x + 1);
                    zd(e, 4, d.y + 1);
                    d = new bn;
                    yd(e, 7, d);
                    d = b;
                    var f = d.push
                      , g = a;
                    e = new ar(g.oa,g.settings,e,g.j,g.Da);
                    js(g.j, e);
                    f.call(d, e)
                }
    }
    var iu = class {
        constructor(a, b, c, d, e) {
            this.oa = a;
            this.j = b;
            this.settings = c;
            a = this.map = new Zt;
            b = {
                Jd: [],
                tiles: {}
            };
            for (var f of d.tilesets || []) {
                b.Jd.push({
                    image: f.image,
                    width: f.imagewidth,
                    height: f.imageheight
                });
                for (var g = 0; g < f.tilecount; ++g)
                    b.tiles[g + f.firstgid] = {
                        Ia: [b.Jd.length - 1, g % f.columns * (f.tilewidth + f.spacing), Math.floor(g / f.columns) * (f.tileheight + f.spacing), f.tilewidth, f.tileheight],
                        properties: f.tileproperties && f.tileproperties[g] ? f.tileproperties[g] : {},
                        objectgroup: f.tiles && f.tiles[g] && f.tiles[g].objectgroup
                    }
            }
            f = [];
            g = 1;
            for (const h of d.layers || [])
                "tilelayer" !== h.type ? "players" === h.name && (g = 2) : h.compression ? console.warn(`Skipping map layer "${h.name}": ${h.compression} compression not supported`) : h.encoding && "csv" !== h.encoding ? console.warn(`Skipping map layer "${h.name}": ${h.encoding} encoding not supported`) : f.push({
                    group: g,
                    properties: h.properties || {},
                    tiles: h.data
                });
            a.g = {
                width: d.width,
                height: d.height,
                ld: d.tilewidth,
                kd: d.tileheight,
                Kd: b,
                layers: f,
                properties: d.properties || {}
            };
            c.get("use_pathfinding") || bu(this, e);
            eu(this, 2);
            eu(this, 1)
        }
    }
    ;
    const ju = lh.Ua()
      , ku = new Map;
    function gu(a, b) {
        b = new fp(a.oa,a.settings,b,a.j);
        js(a.j, b);
        return b
    }
    function lu(a) {
        const b = a.map.getSize();
        for (let c = 0; c < b.y; ++c)
            for (let d = 0; d < b.x; ++d) {
                Vt(a.map, "character spawn", !0, d, c) && (a.v = cu(a, d, c),
                a.v.x += 1,
                a.v.y += 1);
                Vt(a.map, "enemy spawn", !0, d, c) && (a.u = cu(a, d, c),
                a.u.x += 1,
                a.u.y += 1);
                Vt(a.map, "circle_center", !0, d, c) && (a.o = cu(a, d, c),
                a.o.x += 1,
                a.o.y += 1);
                const e = Ut(a.map, "spider", d, c);
                if (void 0 !== e) {
                    const f = cu(a, d, c);
                    f.x += 1;
                    f.y += 1;
                    a.g.set(e, f)
                }
            }
    }
    function mu(a, b) {
        const c = a.map.getSize();
        for (let d = 0; d < c.y; ++d)
            for (let e = 0; e < c.x; ++e) {
                const f = Ut(a.map, "trigger", e, d);
                if (void 0 !== f) {
                    const g = cu(a, e, d);
                    g.x += 1;
                    g.y += 1;
                    a.Ja.push(new Rt(g.x,g.y,f,b))
                }
            }
    }
    function nu(a, b) {
        for (let c = 1; 3 > c; ++c)
            a.H.set(c, ou(a, b, c))
    }
    function pu(a) {
        var b = du(a, (h, k) => {
            var l = a.map, m;
            if (m = 1 === Yt(l, h, k))
                h = Wt(l, h, k),
                m = !(h && h.objects && h.objects.length);
            return m
        }
        );
        for (var c of b) {
            var d = cu(a, c.x, c.y);
            b = d.x;
            var e = d.x + 2 * c.width
              , f = d.y;
            d = d.y + 2 * c.height;
            Pt(a.i, [b, f, e, f]);
            Pt(a.i, [e, f, e, d]);
            Pt(a.i, [e, d, b, d]);
            Pt(a.i, [b, d, b, f])
        }
        c = a.map.getSize();
        for (b = 0; b < c.y; ++b)
            for (e = 0; e < c.x; ++e)
                if (f = Xt(a.map, e, b)) {
                    d = cu(a, e, b);
                    for (const h of f)
                        Pt(a.i, [h[0].x / 25 + d.x, h[0].y / 25 + d.y, h[1].x / 25 + d.x, h[1].y / 25 + d.y])
                } else if (f = Yt(a.map, e, b),
                2 <= f && 5 >= f) {
                    var g = cu(a, e, b);
                    d = g.x;
                    const h = g.x + 2
                      , k = g.y;
                    g = g.y + 2;
                    switch (f) {
                    case 2:
                    case 4:
                        Pt(a.i, [d, g, h, k]);
                        break;
                    case 3:
                    case 5:
                        Pt(a.i, [d, k, h, g])
                    }
                }
    }
    function qu(a) {
        const b = a.map.getSize()
          , c = () => {
            const e = document.createElement("canvas");
            e.width = a.map.g.ld * b.x;
            e.height = a.map.g.kd * b.y;
            return e
        }
        ;
        let d = a.V = c();
        for (const e of a.map.g.layers)
            if (!e.properties.invisible) {
                switch (e.group) {
                case 1:
                    d = a.V;
                    break;
                case 2:
                    a.O || (a.O = c()),
                    d = a.O
                }
                const f = d.getContext("2d");
                for (let g = 0; g < b.y; g++)
                    for (let h = 0; h < b.x; h++)
                        ru(a, e, h, g, f)
            }
    }
    function ou(a, b, c) {
        const d = [];
        var e = du(a, (f, g) => Vt(a.map, "door", c, f, g));
        for (const f of e)
            e = cu(a, f.x, f.y),
            d.push(new jr(e.x + f.width,e.y + f.height,f.width,f.height,b));
        return d
    }
    function su(a, b) {
        if (a = a.H.get(b))
            for (const c of a)
                c.body && (oo(c.j, c.body),
                c.body = null)
    }
    function tu(a, b) {
        if (a = a.H.get(b))
            for (const c of a)
                c.close()
    }
    function ru(a, b, c, d, e) {
        const f = b.tiles[d * a.map.g.width + c];
        if (f) {
            b = a.map.g.ld;
            const g = a.map.g.kd;
            e.save();
            e.translate((c + .5) * b, (d + .5) * g);
            f & 1073741824 && e.scale(1, -1);
            f & 2147483648 && e.scale(-1, 1);
            f & 536870912 && e.transform(0, 1, 1, 0, 0, 0);
            a = a.Ba.get(+f & 536870911);
            ih(ju, a, e, -b / 2, -g / 2);
            e.restore()
        }
    }
    function uu(a) {
        if (!a)
            return !1;
        var b = a.height / 25;
        var c = Wl(Zl, 0);
        var d = Xl(Zl, 0);
        O.save();
        O.translate(c, d);
        c = a.width;
        d = a.height;
        b = Zl.g * b / d;
        O.scale(b, b);
        O.drawImage(a, -(c / 2), -(d / 2));
        O.restore();
        return !0
    }
    function vu(a, b) {
        uu(a.O);
        for (const c of a.H.values())
            for (const d of c)
                d.render(b)
    }
    var wu = class extends iu {
        constructor(a, b, c, d, e, f) {
            super(a, b, c, d, e);
            this.Da = f;
            this.V = this.O = null;
            this.ya = !1;
            this.Ja = [];
            this.g = new Map;
            this.H = new Map;
            this.o = this.u = this.v = null;
            this.i = new Qt;
            this.wa = [];
            this.Ba = new Map;
            f ? (lu(this),
            fu(this),
            hu(this),
            mu(this, e),
            nu(this, e)) : Nk(+this.map.g.properties.map);
            Qf() || pu(this);
            const g = [];
            a = this.map.g.Kd;
            for (b = 0; b < a.Jd.length; ++b)
                c = a.Jd[b],
                d = pl(c.image),
                ku.has(d) || (e = new dh(d),
                ku.set(d, eh(ju, e, [c.width, c.height])),
                g.push(e)),
                this.wa[b] = ku.get(d);
            for (var h of Object.keys(a.tiles))
                b = +h & 536870911,
                c = a.tiles[b],
                this.Ba.set(b, [this.wa[c.Ia[0]], c.Ia[1], c.Ia[2], c.Ia[3], c.Ia[4], 1]);
            h = () => {
                qu(this);
                this.ya = !0;
                for (const k of g)
                    k.o = []
            }
            ;
            g.length ? ch(g, h) : h()
        }
    }
    ;
    var xu = class {
        constructor() {
            this.Ia = new Tq(ti);
            this.status = 1
        }
        render(a, b, c, d) {
            am(Rq(this.Ia), a, b, 3, c, !1, 1, 1, d, lh.Ua())
        }
        update(a) {
            this.Ia.update(a)
        }
    }
    ;
    var yu = class extends po {
        constructor(a, b, c) {
            super(a, b, c);
            this.Ee = !1;
            this.o = null
        }
        Sd() {
            return !0
        }
        Cc() {
            if (this.o) {
                this.Ee = !!Ed(this.o, 4);
                let a = Gd(this.o, 2)
                  , b = Gd(this.o, 3);
                const c = jo(this);
                a += c.x;
                b += c.y;
                mo(this.body, Y(a, b));
                a && (this.angle = Math.atan2(b, a))
            } else
                super.Cc()
        }
        Ud(a) {
            super.Ud(a);
            this.o && (a = new Yn,
            F(a, 1, 9),
            Cd(a, 2, this.id),
            yd(a, 12, this.o),
            this.Ba.Yd(a))
        }
    }
    ;
    function zu(a) {
        this.j = a;
        this.i = a * a;
        this.g = Y(0, 0);
        this.o = [this.g]
    }
    sa(zu, Uo);
    r = zu.prototype;
    r.getTypeName = function() {
        return "CircleShape"
    }
    ;
    r.Pd = function() {
        var a = new zu(this.j);
        a.set(this);
        return a
    }
    ;
    r.set = function(a) {
        zu.Qb.set.call(this, a);
        a instanceof zu && this.g.Ca(a.g)
    }
    ;
    r.Sc = function(a, b) {
        var c = b.R
          , d = b.position.x + (c.T.x * this.g.x + c.U.x * this.g.y);
        b = b.position.y + (c.T.y * this.g.x + c.U.y * this.g.y);
        a.g.set(d - this.j, b - this.j);
        a.i.set(d + this.j, b + this.j)
    }
    ;
    r.fe = function(a, b) {
        b = b * Math.PI * this.i;
        a.Ca(b, this.g, b * (.5 * this.i + (this.g.x * this.g.x + this.g.y * this.g.y)))
    }
    ;
    r.we = function(a) {
        var b = this.j
          , c = this.o;
        a.j = 1;
        a.i = b;
        a.g = c
    }
    ;
    var Au = class extends yu {
        constructor(a, b, c, d) {
            super(a, b, c);
            a = new $o;
            a.type = 2;
            a.position.set(this.g.x, this.g.y);
            a.angle = 0;
            a.g = 1;
            this.body = cp(d.o, a);
            this.body.qb = this;
            d = new bp;
            d.i = 1;
            d.H = 1;
            d.g = new zu(Math.sqrt(3));
            d.filter.g = 32;
            d.filter.i = 1035;
            dp(this.body, d)
        }
        update() {}
    }
    ;
    var Cu = class extends Au {
        constructor(a, b, c, d) {
            super(a, b, c, d);
            this.u = new xu;
            this.state = new ln;
            this.j = null;
            this.opacity = 0;
            this.i = null;
            this.i = new Cm([new W(new X({
                opacity: 0
            },{
                opacity: 1
            },242,Mm),e => {
                this.opacity = e.opacity
            }
            ), new ym( () => {
                this.i = null
            }
            )])
        }
        update(a) {
            this.j ? this.j.update(a) : this.i && this.i.update(a);
            var b = this.u
              , c = H(this.state, 1, 0);
            if (b.status !== c) {
                b.status = c;
                switch (c) {
                case 3:
                    Sq(b.Ia, ui);
                    break;
                case 4:
                    Sq(b.Ia, vi);
                    break;
                default:
                    Sq(b.Ia, ti)
                }
                b.Ia.play()
            }
            this.u.update(a)
        }
        render() {
            this.u.render(this.g.x, this.g.y, this.angle, this.opacity)
        }
        ya() {
            Bu(this.body);
            F(this.state, 1, 4);
            this.j = new Cm([new Bm(1E3 * (vi.length - 1) / 24), new ym( () => {
                super.ya()
            }
            )])
        }
    }
    ;
    let Du = !1;
    var Eu = class {
        constructor(a) {
            this.o = a;
            this.i = this.v = this.u = 0;
            this.H = 1E3 / 60;
            this.g = Math.ceil(1E3 / this.H);
            this.j = Array(this.g);
            for (a = 0; a < this.g; ++a)
                this.j[a] = 0
        }
    }
    ;
    const Fu = lh.Ua()
      , Gu = new Map([[0, Y(-.5, -1.8)], [1, Y(-.4, -1.75)], [2, Y(-.4, -1.5)], [3, Y(-.3, -1.8)], [4, Y(-.3, -1.3)], [5, Y(-.3, -1.65)], [6, Y(-.4, -1.5)], [7, Y(-.4, -1.5)], [8, Y(-.5, -1.8)], [9, Y(-.2, -1.6)], [10, Y(-.3, -1.8)], [11, Y(-.3, -1.6)], [12, Y(-.15, -1.3)]]);
    function Hu(a) {
        const b = Gu.get(a.player.Oa)
          , c = a.player.body.ka;
        var d = a.player;
        return {
            x: -(.01 * c.x) + b.x * Math.cos(a.player.angle),
            y: -(.005 * c.y) + b.y + ("idle" !== Iu(d) ? 0 : d.Ab.Ia.Cb().y)
        }
    }
    function Ju(a, b=1) {
        a.render(a.i, b)
    }
    function Ku(a, b=1) {
        a.render(a.g, b)
    }
    var ms = class {
        constructor(a, b, c) {
            this.player = a;
            this.i = b;
            this.g = c;
            this.scale = 1;
            this.x = Hu(this).x;
            this.y = Hu(this).y
        }
        update(a) {
            this.scale = this.player.scale;
            var b = a / 1E3;
            a = Math.min(1, 10 * b);
            b = Math.min(1, 40 * b);
            this.x = this.x * (1 - a) + Hu(this).x * a;
            this.y = this.y * (1 - b) + Hu(this).y * b
        }
        render(a, b) {
            a && am(a, this.player.g.x + this.x, this.player.g.y + this.y, 2, this.player.angle, !1, this.scale, this.scale, b, Fu)
        }
    }
    ;
    function er(a, b) {
        return new Cm([new W(new X({
            offsetX: 1
        },{
            offsetX: 0
        },500,Pm),c => a.Ra(c)), new W(new X({
            offsetX: 0
        },{
            offsetX: 0
        },b,Mm),c => a.Ra(c)), new W(new X({
            offsetX: -.1
        },{
            offsetX: 1
        },500,Nm),c => a.Ra(c))])
    }
    var ss = class extends fr {
        constructor(a, b, c, d, e) {
            super(b, c, d, e);
            this.type = a
        }
        v() {
            return 1 === this.type ? bi : null
        }
    }
    ;
    class Lu extends cr {
        constructor(a, b) {
            super();
            this.text = a;
            this.scale = 0;
            this.action = this.g(b)
        }
        cancel() {}
        g(a) {
            return new Cm([new W(new X({
                scale: 0
            },{
                scale: 1
            },218,Mm),b => this.Ra(b)), new Bm(a), new W(new X({
                scale: 1
            },{
                scale: 0
            },218,Om),b => this.Ra(b))])
        }
        u() {
            return this.action.g()
        }
        update(a) {
            this.action.update(a)
        }
        Ra(a) {
            this.scale = a.scale
        }
    }
    var us = class extends Lu {
        j() {
            return 4
        }
        render(a, b=0, c=0) {
            a.save();
            a.fillStyle = "#000";
            a.textAlign = "center";
            a.font = `48px ${P}`;
            a.lineWidth = 4;
            cm(this.text, b, c - 2, "#4B1", "#BF5", 0, this.scale);
            a.restore()
        }
    }
      , Mu = class extends Lu {
        constructor(a, b, c, d) {
            super(a, b);
            this.x = c;
            this.y = d
        }
        j() {
            return 5
        }
        g(a) {
            return new Cm([new W(new X({
                scale: 0
            },{
                scale: 1
            },218,Mm),b => this.Ra(b)), new Bm(a), new W(new X({
                scale: 1
            },{
                scale: 2
            },128,Om),b => this.Ra(b))])
        }
        render(a) {
            a.save();
            a.translate(this.x, this.y);
            a.scale(this.scale, this.scale);
            a.textAlign = "center";
            a.font = `60px ${P}`;
            a.fillStyle = "#700";
            a.fillText(this.text, 0, 0);
            a.strokeStyle = "#F93";
            a.strokeText(this.text, 0, 0);
            a.restore()
        }
    }
    ;
    const Nu = Pl();
    var Ou = class {
        constructor(a) {
            this.g = a;
            this.state = "idle";
            this.Ia = new Tq(Xm(this.g, this.state));
            this.Ia.play();
            this.i = $m(this.g, b => {
                this.Ia.Ga(0, b.y / Nu.g)
            }
            )
        }
        render(a, b, c, d, e, f=!1) {
            this.Ia.render(a, b, 3, c, f, d, d, e)
        }
        update(a) {
            "idle" === this.state && this.i.update(a);
            this.Ia.update(a)
        }
    }
    ;
    class Pu extends cr {
        constructor(a, b) {
            super();
            this.amount = a;
            this.scale = this.opacity = this.offsetY = 0;
            this.action = this.H(b)
        }
        cancel() {
            this.action = this.g()
        }
        u() {
            return this.action.g()
        }
        update(a) {
            this.action.update(a)
        }
        Ra(a) {
            this.offsetY = a.offsetY;
            this.opacity = a.opacity;
            this.scale = a.scale
        }
    }
    var qs = class extends Pu {
        constructor(a) {
            super(a, 1E3)
        }
        j() {
            return 3
        }
        H(a) {
            return new Cm([new W(new X({
                offsetY: 0,
                opacity: 0,
                scale: 0
            },{
                offsetY: -.5,
                opacity: 1,
                scale: 1.25
            },107,Mm),b => this.Ra(b)), new W(new X({
                offsetY: -.5,
                opacity: 1,
                scale: 1.1
            },{
                offsetY: -.5,
                opacity: 1,
                scale: 1
            },a,Mm),b => this.Ra(b)), new W(new X({
                offsetY: -.5,
                opacity: 1,
                scale: 1
            },{
                offsetY: -.5,
                opacity: 1,
                scale: 1
            },218,Mm),b => this.Ra(b)), this.g()])
        }
        g() {
            return new W(new X({
                offsetY: -.5,
                opacity: 1,
                scale: 1
            },{
                offsetY: -.5,
                opacity: 0,
                scale: 1
            },107,Mm),a => {
                this.Ra(a)
            }
            )
        }
        render(a, b=0, c=0) {
            const d = this.offsetY - 1.5;
            a.save();
            a.fillStyle = "#000";
            a.textAlign = "center";
            a.font = `48px ${P}`;
            a.lineWidth = 4;
            a.globalAlpha = this.opacity;
            cm(`+${this.amount}!`, b, c + d, "#4B1", "#BF5", 0, this.scale);
            a.restore()
        }
    }
    ;
    class Qu extends Pu {
        j() {
            return 2
        }
        H(a) {
            const b = this.i();
            return new Cm([new W(new X({
                offsetY: this.v(),
                opacity: 0
            },{
                offsetY: b,
                opacity: 1
            },107,Mm),c => this.Ra(c)), new W(new X({
                offsetY: b,
                opacity: 1
            },{
                offsetY: b,
                opacity: 1
            },a,Mm),c => this.Ra(c)), this.g()])
        }
        g() {
            const a = this.i();
            return new W(new X({
                offsetY: a,
                opacity: 1
            },{
                offsetY: a,
                opacity: 0
            },107,Mm),b => {
                this.Ra(b)
            }
            )
        }
        render(a, b=0, c=0) {
            const d = this.offsetY - 1.5;
            a.save();
            a.fillStyle = "#000";
            a.textAlign = "center";
            a.font = `32px ${P}`;
            a.lineWidth = 3;
            a.globalAlpha = this.opacity;
            this.o(a, b, c + d);
            a.restore()
        }
    }
    var Ru = class extends Qu {
        constructor(a) {
            super(a, 1E3)
        }
        v() {
            return 0
        }
        i() {
            return -.5
        }
        o(a, b, c) {
            cm(`+${this.amount}`, b, c, "#59E", "#FFF")
        }
    }
      , Su = class extends Qu {
        constructor(a) {
            super(a, 1E3)
        }
        v() {
            return -.5
        }
        i() {
            return 0
        }
        o(a, b, c) {
            cm(`${this.amount}`, b, c, "#D67", "#000")
        }
    }
      , ps = class extends Qu {
        constructor(a, b, c) {
            super(a, b);
            this.color = c
        }
        j() {
            return 1
        }
        v() {
            return 0
        }
        i() {
            return -.5
        }
        o(a, b, c) {
            var d = Pl();
            b = Wl(d, b);
            c = Xl(d, c);
            a.font = `32px ${P}`;
            a.textAlign = "center";
            a.textBaseline = "middle";
            a.fillStyle = `rgb(${this.color})`;
            a.strokeStyle = "#fff";
            a.lineWidth = 3;
            a.strokeText(`+${this.amount}`, b, c - 40);
            a.fillText(`+${this.amount}`, b, c - 40);
            a.lineWidth = .5;
            a.font = `12px ${P}`;
            d = gm(a, T("buddy_bonus"), P, 12, 8, 50, 2);
            im(a, d, b, c - 15, 1.25 * d.fontSize, !0)
        }
    }
      , rs = class extends Ru {
        o(a, b, c) {
            cm(`+${this.amount}`, b, c, "#0AF", "#FFF")
        }
    }
    ;
    function Tu(a) {
        let b = a;
        for (let c = 0; c < a.j.length; c++) {
            const d = a.j[c];
            d.H(b, c + 1);
            b = d
        }
    }
    function $q(a) {
        return 0 < a.Ka ? 2E3 < a.Ka ? !0 : 0 === Math.round(a.Ka / 200) % 2 : !1
    }
    function ys(a) {
        a.kb && (a.kb.v.i = (1 === a.Sa ? 2 : 1) | (Uu(a, 4) ? 1024 : 1544) | 420)
    }
    var Wu = class extends yu {
        constructor(a, b, c, d) {
            super(a, b, c);
            this.yb = d;
            this.j = [];
            this.Ka = 0;
            this.v = !1;
            this.H = 0;
            this.Te = Y(0, 0);
            a = G(c, cn, 6);
            this.Sa = H(a, 2, 0);
            this.Oa = H(a, 3, 0);
            this.Rc = Ed(a, 4);
            a = new $o;
            a.type = 2;
            a.position.set(this.g.x, this.g.y);
            a.angle = 0;
            a.g = 1;
            this.body = cp(d.o, a);
            this.body.df = this;
            d = new bp;
            d.g = new zu(Math.sqrt(3));
            d.i = 1;
            d.H = 1;
            d.filter.g = 1 === this.Sa ? 1 : 2;
            this.kb = dp(this.body, d);
            ys(this);
            d.j = !0;
            d.filter.g = 64;
            dp(this.body, d);
            this.Yf = ko(this, "return_to_base_duration_ms")
        }
        Td() {
            if (this.v) {
                this.v = !1;
                this.H = 0;
                var a = new bp;
                a.g = new zu(Math.sqrt(3));
                a.i = 1;
                a.H = 1;
                a.filter.g = 1 === this.Sa ? 1 : 2;
                this.kb = dp(this.body, a)
            }
        }
        Qc(a) {
            this.v && (this.kb && (Vu(this.body, this.kb),
            this.kb = void 0),
            this.H += a / this.Yf,
            this.H = Math.min(this.H, 1),
            this.o = null,
            mo(this.body, Y(0, 0)),
            .5 < this.H && (a = this.body,
            lo(a, this.Te, a.ha.a)))
        }
        Dc() {
            return !0
        }
    }
    ;
    function Rr(a) {
        return a.state ? Fd(a.state, 6) || 0 : 0
    }
    function zs(a) {
        return a.Re && !a.v
    }
    function Uu(a, b) {
        return a.state ? H(a.state, 4, 0) >= b : !1
    }
    function ns(a, b) {
        a.V += b;
        a.Wb = ko(a, "score_delta_timer_ms");
        a.i && 0 < b && Ll("STEALS", b)
    }
    function ws(a, b) {
        if (a.qb !== b) {
            var c = Xm(a.Oa, 1 === b ? "happy" : "sad").length;
            a.qb = b;
            a.Lb = new Cm([new Bm(1E3 * c / 24), new ym( () => {
                a.qb = null;
                a.Lb = null
            }
            )])
        }
    }
    function os(a, b) {
        if (!a.u || a.u.j() <= b.j())
            a.u && a.u.cancel(),
            a.u = b
    }
    function vs(a) {
        switch (a) {
        case 1:
            return T("powerup_fast");
        case 2:
            return T("powerup_all_seeing");
        case 3:
            return T("powerup_magnetic");
        case 4:
            return T("powerup_dematerialized");
        case 5:
            return T("powerup_invincible");
        default:
            return ""
        }
    }
    function xs(a) {
        a.wa = ko(a, "sonic_boom_timer_ms");
        a.i && R.vf.play()
    }
    function ts(a) {
        switch (a) {
        case 1:
            return T("base_powerup_fast");
        case 2:
            return T("base_powerup_all_seeing");
        case 3:
            return T("base_powerup_magnetic");
        case 4:
            return T("base_powerup_dematerialized");
        default:
            return ""
        }
    }
    function Iu(a) {
        let b = "idle";
        a.Xa ? b = "sleep" : 1 === a.qb ? b = "happy" : 2 === a.qb ? b = "sad" : a.Ee && (b = "move");
        return b
    }
    function Xu(a, b, c, d, e) {
        a.oa && Ku(a.oa, e);
        $q(a) ? (a.Nb || (a.Nb = !0,
        a.Mb.play()),
        a.Ec.render(b, c, 4, e, a.v),
        a.Pc.render(b, c, 4, e, a.v)) : a.Nb && (a.Nb = !1,
        a.Mb.stop());
        a.Ab.render(b, c, a.angle, d, e, a.v);
        a.oa && Ju(a.oa, e)
    }
    function Yu(a) {
        let b = 0
          , c = 0
          , d = Number.MAX_VALUE;
        const e = a.g;
        for (const g of a.yb.u.values()) {
            if (g.Sa !== a.Sa)
                continue;
            var f = g.g;
            const h = f.x - e.x;
            f = f.y - e.y;
            const k = h * h + f * f;
            k < d && (d = k,
            b = h,
            c = f)
        }
        return [b, c]
    }
    function Zu(a, b) {
        if (a.i && !a.Xa) {
            const h = Pl()
              , [k,l] = Yu(a)
              , m = Math.atan2(l, k) % Math.PI + Math.PI;
            var c = N.width / h.g
              , d = N.height / h.g;
            if (a.Tf)
                var e = a.Zb;
            else {
                e = a.j.length + Rr(a);
                var f = (a.state ? H(a.state, 4, 0) : 0) + 1;
                f = +ko(a, `powerup_threshold_${f}`) || 500;
                e = e >= f
            }
            var g = e;
            if (g || c / 2 <= Math.abs(k) || d / 2 <= Math.abs(l)) {
                b.save();
                c = a.g;
                e = f = d = 1;
                g ? (e = 3,
                f = (Date.now() & 511) / 512,
                b.globalAlpha = .9,
                d = 1.25,
                f = 1 + f) : b.globalAlpha = .25;
                g = Qf() ? 42 : 32;
                b.fillStyle = "#fff";
                b.strokeStyle = "#000";
                for (let n = 1; n <= e; n++) {
                    const q = c.x - 3 * Math.cos(m) * f * n
                      , t = c.y - 3 * Math.sin(m) * f * n;
                    b.save();
                    b.translate(Wl(h, q), Xl(h, t));
                    b.scale(d, d);
                    b.rotate(m - Math.PI);
                    b.beginPath();
                    b.moveTo(-g / 2, -g / 2);
                    b.lineTo(g / 2, 0);
                    b.lineTo(-g / 2, g / 2);
                    b.closePath();
                    b.fill();
                    b.stroke();
                    b.restore()
                }
                b.restore()
            }
        }
        a.u && a.u.render(b, a.g.x, a.g.y)
    }
    var $u = class extends Wu {
        constructor(a, b, c, d, e) {
            super(a, b, c, d);
            this.Tf = e;
            this.state = null;
            this.i = !1;
            this.Kb = this.Wb = this.V = this.wa = 0;
            this.qb = this.u = null;
            this.Xa = !1;
            this.Re = !0;
            this.Zb = this.Nb = !1;
            this.Lb = null;
            this.opacity = this.Da = 0;
            this.Eb = null;
            this.scale = 1;
            this.oa = null;
            this.Ec = new Tq(ni);
            this.Pc = new Tq(wi);
            this.Mb = R.rf.clone();
            this.Fe = ko(this, "ally_bonus_timer_ms");
            this.Wf = 1 === this.Sa ? "50,255,100" : "150,60,255";
            this.Uf = ko(this, "draw_debug_location");
            this.Ue = ko(this, "speed_boost_trail_coefficient");
            this.Xf = ko(this, "render_paths");
            this.Ab = new Ou(this.Oa);
            this.Se = this.Da;
            this.Fc = {
                radius: this.i ? Fd(this.state, 3) || 0 : 10,
                ue: 10,
                Sa: this.Sa,
                Fd: 1E3 * Math.random(),
                Cd: !1,
                visible: !0
            };
            this.Ec.play();
            this.Pc.play();
            this.Eb = new Cm([new W(new X({
                opacity: 0
            },{
                opacity: 1
            },242,Mm),f => {
                this.opacity = f.opacity
            }
            ), new ym( () => {
                this.Eb = null
            }
            )])
        }
        Ja() {
            const a = super.Ja();
            return this.i ? a + 1 : a
        }
        Dc() {
            return null != this.state
        }
        update(a) {
            this.Ec.update(a);
            this.Pc.update(a);
            this.Da += a;
            if ($q(this))
                if (this.i)
                    sk(this.Mb, 1);
                else {
                    var b = fo(this.yb.g.g)
                      , c = this.g;
                    b.x -= c.x;
                    b.y -= c.y;
                    c = Math.max(1E-4, Math.pow(b.length(), 2));
                    sk(this.Mb, kj(40 / c, 0, 1))
                }
            this.oa && this.oa.update(a);
            0 < this.wa && (this.wa -= a);
            0 < this.Kb && (this.Kb -= a);
            0 < this.Wb ? this.Wb -= a : this.i && 0 !== this.V && (os(this, 0 < this.V ? new Ru(this.V) : new Su(this.V)),
            (0 < this.V ? R.xf : R.yf).play(),
            this.V = 0);
            Tu(this);
            this.u && (this.u.update(a),
            this.u.u() && (this.u = null));
            this.Lb && this.Lb.update(a);
            c = this.Ab;
            b = Iu(this);
            b !== c.state && (c.state = b,
            "idle" === c.state && c.i.reset(),
            c.Ia.setLoop("happy" !== c.state && "sad" !== c.state),
            c.Ia.Ga(0, 0),
            Sq(c.Ia, Xm(c.g, c.state)),
            c.Ia.play());
            this.Ab.update(a);
            this.Eb && this.Eb.update(a);
            c = Gd(this.state, 17);
            c > this.Ka && (xs(this),
            b = new us(vs(5),ko(this, "notice_duration_ms")),
            os(this, b));
            this.Ka = c;
            c = Ed(this.state, 18);
            !this.v && c ? ws(this, 2) : this.v && !c && this.Td();
            this.v = c;
            this.Te = Y(Fd(this.state, 19), Fd(this.state, 20));
            this.Qc(a)
        }
        sendMessage(a) {
            this.Ba.xd(a)
        }
        Qc(a) {
            this.v && (this.angle = 15 * this.H,
            this.scale = .5 > this.H ? 1 - 2 * this.H : 2 * this.H - 1,
            super.Qc(a))
        }
        Td() {
            this.scale = 1;
            super.Td()
        }
        render(a) {
            const b = this.g.x
              , c = this.g.y;
            if (this.Uf && this.Wa) {
                a.save();
                a.globalAlpha = .5;
                var d = this.Wa
                  , e = d.x
                  , f = d.y
                  , g = ((new Date).getTime() - this.Wa.t) / 1E3;
                bm(e + d.Md * g, f + d.Nd * g, 1.5, "yellow");
                bm(e, f, 1.5, "white");
                a.restore()
            }
            a.save();
            a.globalAlpha = this.alpha;
            Uu(this, 4) && (a.save(),
            a.globalAlpha *= .1);
            if (Ed(this.state, 12))
                for (d = 0; 3 > d; d++)
                    e = this.body.ka,
                    Xu(this, b - e.x * this.Ue * (d + 1), c - e.y * this.Ue * (d + 1), this.scale, a.globalAlpha * (.1 + (3 - d) / 6));
            Xu(this, b, c, this.scale, 1 > this.opacity ? this.opacity : a.globalAlpha);
            if (0 < this.wa)
                for (d = ko(this, "sonic_boom_timer_ms"),
                e = 0; 5 > e; e++)
                    Xu(this, b, c, .1 + 3 * e * (d - this.wa) / d, a.globalAlpha * (.1 + (5 - e) / 12 - .1 * (d - this.wa) / d));
            Uu(this, 4) && a.restore();
            if (xd(this.state, rn, 7) && this.Xf)
                for (d = Pl(),
                a.strokeStyle = "#f00",
                a.lineWidth = 2,
                e = b,
                f = c,
                g = 0; g < xd(this.state, rn, 7).length; ++g) {
                    const h = xd(this.state, rn, 7)[g];
                    0 < g && (a.beginPath(),
                    a.moveTo(Wl(d, e), Xl(d, f)),
                    a.lineTo(Wl(d, Gd(h, 1)), Xl(d, Gd(h, 2))),
                    a.stroke());
                    bm(Gd(h, 1), Gd(h, 2), 3 * .1, "#f00");
                    e = Gd(h, 1);
                    f = Gd(h, 2)
                }
            Ed(this.state, 8) || this.Rc || am(Hh, b, c, 3, 0);
            this.Xa && (a.font = `32px ${P}`,
            a.lineWidth = 3,
            Math.floor(this.Da / 500) % 2 ? cm("Z z Z", b - .17, c - 1.8, "#4B1", "#BF5") : cm("z Z z", b - .17, c - 1.8, "#4B1", "#BF5"));
            a.restore()
        }
        wake() {
            const a = new Yn;
            F(a, 1, 13);
            Cd(a, 2, this.id);
            Bd(a, 3, !0);
            this.Ba.xd(a)
        }
        le() {
            this.Fc.radius = this.i ? Fd(this.state, 3) || 0 : 10;
            return this.Fc
        }
    }
    ;
    var av = class {
        constructor() {
            this.Ia = new Tq([Oh]);
            this.status = 1;
            this.g = new Tq(ni);
            this.i = new Tq(wi)
        }
        render(a, b, c, d) {
            am(Rq(this.Ia), a, b, 4, c, !1, 1, 1, d, lh.Ua());
            this.g.render(a, b, 5);
            this.i.render(a, b, 5)
        }
        update(a) {
            this.Ia.update(a);
            this.g.update(a);
            this.i.update(a)
        }
    }
    ;
    var bv = class extends yu {
        constructor(a, b, c, d) {
            super(a, b, c);
            a = new $o;
            a.type = 0;
            a.position.set(this.g.x, this.g.y);
            a.angle = 0;
            a.g = 1;
            this.body = cp(d.o, a);
            this.body.yb = this;
            d = new bp;
            d.i = 1;
            d.j = !0;
            d.H = 1;
            d.g = new zu(Math.sqrt(3));
            d.filter.g = 32;
            d.filter.i = 1035;
            dp(this.body, d)
        }
    }
    ;
    var cv = class extends bv {
        constructor(a, b, c, d) {
            super(a, b, c, d);
            this.j = new av;
            this.opacity = 0;
            this.i = null;
            this.i = new Cm([new W(new X({
                opacity: 0
            },{
                opacity: 1
            },242,Mm),e => {
                this.opacity = e.opacity
            }
            ), new ym( () => {
                this.i = null
            }
            )])
        }
        update(a) {
            this.i && this.i.update(a);
            var b = this.j;
            1 !== b.status && (b.status = 1,
            Sq(b.Ia, [Oh]),
            b.Ia.play());
            this.j.update(a)
        }
        render() {
            this.j.render(this.g.x, this.g.y, this.angle, this.opacity)
        }
        ya() {
            super.ya()
        }
    }
    ;
    function dv(a, b) {
        a = new PIXI.Sprite(a);
        a.blendMode = PIXI.BLEND_MODES.ADD;
        a.scale.set(2 * b / 256);
        a.anchor.set(.5);
        return a
    }
    var ev = class {
        constructor(a, b, c=0) {
            this.i = b;
            this.scale = 1;
            this.ta = new PIXI.Container;
            const d = dv(a, b);
            this.ta.addChild(d);
            0 < c && (a = dv(a, c),
            this.ta.addChild(a));
            this.g = new Xk(0,0,2 * b,2 * b)
        }
        getBounds() {
            return this.g
        }
    }
    ;
    const fv = Pl();
    function gv(a, b) {
        var c = a.i.get(b);
        c && (c = c.ta,
        a.g.removeChild(c),
        a.i.delete(b),
        c.destroy({
            children: !0
        }))
    }
    function hv(a, b, c, d=0) {
        let e = a.i.get(b);
        e || (e = new ev(a.texture,c,d),
        a.i.set(b, e),
        a.g.addChild(e.ta));
        return e
    }
    var jv = class extends yi {
        constructor() {
            var a = N.width
              , b = N.height;
            super();
            this.g = new PIXI.Container;
            this.i = new Map;
            this.v = new Map;
            this.o = 0;
            this.u = !1;
            a = this.j = PIXI.autoDetectRenderer({
                antialias: !1,
                backgroundColor: 6579350,
                powerPreference: "high-performance",
                width: a,
                height: b,
                forceCanvas: !1
            });
            a.type !== PIXI.RENDERER_TYPE.WEBGL && Hk(103);
            Ik("d2", a.type);
            this.j.plugins.interaction.destroy();
            a = PIXI.Texture;
            b = a.from;
            const c = document.createElement("canvas");
            c.width = 256;
            c.height = 256;
            const d = c.getContext("2d")
              , e = d.createRadialGradient(128, 128, 128, 128, 128, 0);
            e.addColorStop(0, "rgba(255,255,255,0)");
            e.addColorStop(.5, "rgba(255,255,255,1)");
            e.addColorStop(1, "rgba(255,255,255,1)");
            d.fillStyle = e;
            d.fillRect(0, 0, 256, 256);
            this.texture = b.call(a, c, {
                scaleMode: PIXI.SCALE_MODES.LINEAR
            })
        }
        ub() {
            super.ub();
            this.v.clear();
            this.i.clear();
            this.g.destroy(!0);
            this.texture.destroy(!0);
            this.j.destroy(!0)
        }
        update(a) {
            this.o += a
        }
        render(a, b, c, d) {
            const e = fv.left
              , f = fv.top;
            var g = e + N.width / fv.g;
            var h = f + N.height / fv.g;
            let k = 1;
            Uu(b, 2) && (k = iv(d, "all_seeing_lighting_multiplier"),
            this.u || (gv(this, b.getId()),
            this.u = !0));
            b = b.Sa;
            for (const C of c) {
                c = C.le();
                var l = c.Sa === b;
                d = C;
                const D = hv(this, d.getId(), c.radius, c.ue * (l ? k : 1));
                if (c.visible) {
                    var m = 1 === c.Sa ? 3342180 : 9846015;
                    for (const x of D.ta.children || [])
                        x.tint = m;
                    D.ta.alpha = d.alpha * (l ? 1 : .2);
                    l = d.g;
                    D.ta.position.set(l.x, l.y);
                    D.g.left = l.x;
                    D.g.top = l.y;
                    m = l.x - kj(l.x, e, g);
                    l = l.y - kj(l.y, f, h);
                    D.ta.visible = m * m + l * l < Math.pow(D.scale * D.i, 2);
                    if (null != c.Fd) {
                        Wq || (Wq = new Vq);
                        var n = Wq;
                        m = c.Fd + .003 * this.o;
                        var q = l = 0
                          , t = Math.floor(m) & 255
                          , w = Math.floor(l) & 255
                          , p = Math.floor(q) & 255;
                        m -= Math.floor(m);
                        l -= Math.floor(l);
                        q -= Math.floor(q);
                        const x = m * m * m * (m * (6 * m - 15) + 10)
                          , J = l * l * l * (l * (6 * l - 15) + 10);
                        n = n.g;
                        var v = n[t] + w;
                        const B = n[v] + p;
                        v = n[v + 1] + p;
                        w = n[t + 1] + w;
                        t = n[w] + p;
                        p = n[w + 1] + p;
                        w = 25 * D.i;
                        D.scale = (w + ((lj(lj(lj(Xq(n[B], m, l, q), Xq(n[t], m - 1, l, q), x), lj(Xq(n[v], m, l - 1, q), Xq(n[p], m - 1, l - 1, q), x), J), lj(lj(Xq(n[B + 1], m, l, q - 1), Xq(n[t + 1], m - 1, l, q - 1), x), lj(Xq(n[v + 1], m, l - 1, q - 1), Xq(n[p + 1], m - 1, l - 1, q - 1), x), J), q * q * q * (q * (6 * q - 15) + 10)) + 1) / 2 * 20 - 10)) / w;
                        D.ta.scale.set(D.scale);
                        D.g.width = 2 * D.i * D.scale;
                        D.g.height = 2 * D.i * D.scale
                    }
                    c.Cd && d.getId()
                } else
                    D.ta.visible = !1
            }
            this.g.scale.set(fv.g);
            this.g.position.set(Wl(fv, 0), Xl(fv, 0));
            this.j.render(this.g);
            a.save();
            a.globalCompositeOperation = "multiply";
            a.drawImage(this.j.view, 0, 0);
            a.restore()
        }
    }
    ;
    const kv = `30px ${P}`;
    var lv = class {
        constructor() {
            var a = .6 * N.width;
            this.width = a;
            this.i = null;
            this.o = this.j = 0;
            this.g = new X({
                alphaCount: 0,
                alphaWidth: a / 2,
                bravoCount: 0,
                bravoWidth: a / 2
            },{
                alphaCount: 0,
                alphaWidth: a / 2,
                bravoCount: 0,
                bravoWidth: a / 2
            },1)
        }
        update(a) {
            this.g.update(a)
        }
        render(a, b, c) {
            if (this.j !== b || this.o !== c) {
                this.j = b;
                this.o = c;
                var d = b + c
                  , e = this.width * (0 === d ? .5 : b / d);
                d = this.width * (0 === d ? .5 : c / d);
                const f = zm(this.g);
                this.g = new X({
                    alphaCount: f.alphaCount,
                    alphaWidth: f.alphaWidth,
                    bravoCount: f.bravoCount,
                    bravoWidth: f.bravoWidth
                },{
                    alphaCount: b,
                    alphaWidth: e,
                    bravoCount: c,
                    bravoWidth: d
                },250);
                this.g.start()
            }
            b = zm(this.g);
            c = -this.width / 2;
            e = b.alphaWidth + c;
            a.save();
            this.i || (this.i = a.createLinearGradient(0, -4, 0, 20),
            this.i.addColorStop(0, "rgba(76,92,92,0.5)"),
            this.i.addColorStop(1, "rgba(136,136,136,0.5)"));
            a.fillStyle = this.i;
            a.beginPath();
            a.moveTo(c, -4);
            a.lineTo(c + this.width, -4);
            a.arc(c + this.width, 6, 10, -Math.PI / 2, Math.PI / 2);
            a.lineTo(c, 16);
            a.arc(c, 6, 10, Math.PI / 2, 3 * Math.PI / 2);
            a.fill();
            a.fillStyle = "rgb(50,255,100)";
            a.fillRect(c, 0, b.alphaWidth, 12);
            a.beginPath();
            a.arc(c, 6, 6, Math.PI / 2, 3 * Math.PI / 2);
            a.fill();
            a.fillStyle = "rgb(100,0,255)";
            a.fillRect(e, 0, b.bravoWidth, 12);
            a.beginPath();
            a.arc(c + this.width, 6, 6, -Math.PI / 2, Math.PI / 2);
            a.fill();
            a.fillStyle = "#fff";
            a.fillRect(-2, -4, 4, 20);
            a.font = kv;
            a.textAlign = "right";
            a.textBaseline = "middle";
            a.fillText(`${Math.floor(b.alphaCount)}`, c - 6 - 12, 6);
            a.textAlign = "left";
            a.fillText(`${Math.floor(b.bravoCount)}`, c + this.width + 18, 6);
            a.restore()
        }
    }
    ;
    function mv(a, b, c) {
        b.setTransform(1, 0, 0, 1, 0, 0);
        c.H || c.v || (b.save(),
        b.translate(b.canvas.width / 2, b.canvas.height / 4),
        a.H.render(b, c.qb),
        b.restore());
        !c.v && 6E3 > c.o && c.H && (b.save(),
        b.translate(b.canvas.width / 2, b.canvas.height / 4),
        a.O.render(b, Math.floor(c.o / 1E3)),
        b.restore());
        c.H && (b.save(),
        b.translate(b.canvas.width / 2, 70),
        a.v.render(b, c.Wa, c.Xa),
        b.restore());
        b.save();
        var d = c.o;
        c.H && (b.font = `50px ${P}`,
        b.globalAlpha = 1,
        b.fillStyle = "#fff",
        b.textAlign = "center",
        b.textBaseline = "middle",
        0 >= d ? d = "0:00" : (c = Math.floor(d % 6E4 / 1E3),
        d = `${Math.floor(d / 6E4)}:${10 > c ? "0" : ""}${c}`),
        b.fillText(d, b.canvas.width / 2, 36));
        Qf() && a.gamepad && a.gamepad.render(b);
        b.restore()
    }
    var nv = class extends yi {
        constructor() {
            super();
            this.j = new jv;
            this.o = new mp;
            this.v = new lv;
            this.H = new br;
            this.O = new Gs;
            this.i = this.g = this.gamepad = null;
            this.u = 25;
            zi(this, qa(xi, this.j));
            zi(this, qa(xi, this.o))
        }
        update(a) {
            this.i && this.i.update(a);
            this.o.update(a);
            this.j.update(a);
            this.v.update(a)
        }
        render(a, b, c) {
            Al(b.canvas);
            b.fillStyle = "#000";
            b.fillRect(0, 0, b.canvas.width, b.canvas.height);
            if (null !== a) {
                b.save();
                var d = a.Ba
                  , e = a.g.g;
                if (e) {
                    var f = e.g
                      , g = Math.max(25 - iv(a, "zoom_out_per_collectible_held") * e.j.length, 12.5);
                    this.u !== g && (this.i = new X({
                        zoom: c.g
                    },{
                        zoom: g
                    },iv(a, "zoom_tween_time_ms")),
                    this.i.start(),
                    this.u = g);
                    Vl(c, this.i ? zm(this.i).zoom : this.u);
                    Tl(c, f.x, f.y, zl.left + zl.width / 2, zl.top + zl.height / 2)
                }
                f = a.i;
                if (e && e.Dc() && uu(f.V)) {
                    const m = []
                      , n = new Map;
                    g = c.left;
                    var h = c.top
                      , k = N.width / c.g;
                    c = N.height / c.g;
                    for (var l of a.g.H.values()) {
                        const q = l.g;
                        q.x >= g - 1 && q.x < g + k + 1 && q.y >= h - 1 && q.y < h + c + 1 && (-1 === m.indexOf(l.Ja()) && (m.push(l.Ja()),
                        n.set(l.Ja(), [])),
                        n.get(l.Ja()).push(l))
                    }
                    m.sort( (q, t) => q - t);
                    for (const q of m)
                        for (const t of n.get(q))
                            t.isVisible() && t.render(b);
                    iv(a, "render_map_layers_above_players") && vu(f, b);
                    1 > a.u && (b.fillStyle = `rgba(0, 0, 0, ${1 - a.u})`,
                    b.fillRect(0, 0, b.canvas.width, b.canvas.height),
                    e.render(b),
                    d && d.render(b, !0));
                    1 > a.u && (b.save(),
                    b.globalAlpha = a.u);
                    iv(a, "render_fog") && 0 < a.u && this.o.render();
                    iv(a, "render_lighting") && (l = Du ? [e, ...a.g.u.values()] : [...a.g.i.values(), ...a.g.v.values(), ...a.g.u.values()],
                    this.j.render(b, e, l, a, !Du));
                    d && d.render(b, !1);
                    1 > a.u && b.restore();
                    e && e.Dc() && Zu(e, b)
                }
                this.g || (L ? (this.g = b.createLinearGradient(0, 0, 0, b.canvas.height),
                d = zl.top / b.canvas.height,
                e = (zl.top + zl.height) / b.canvas.height) : (this.g = b.createLinearGradient(0, 0, b.canvas.width, 0),
                d = zl.left / b.canvas.width,
                e = (zl.left + zl.width) / b.canvas.width),
                this.g.addColorStop(0, "rgba(0,0,0,1)"),
                this.g.addColorStop(d, "rgba(0,0,0,0)"),
                this.g.addColorStop(e, "rgba(0,0,0,0)"),
                this.g.addColorStop(1, "rgba(0,0,0,1)"));
                b.fillStyle = this.g;
                b.fillRect(0, 0, b.canvas.width, b.canvas.height);
                b.restore();
                mv(this, b, a)
            }
        }
    }
    ;
    function ov(a, b) {
        if (a.i = b)
            a.g = Date.now()
    }
    var pv = class {
        constructor() {
            this.y = this.x = 0;
            this.i = !1;
            this.g = 0
        }
        render(a, b) {
            a.save();
            var c = 0;
            this.i && (c = .25 * Math.sin(.025 * (Date.now() - this.g)));
            const d = this.x;
            c = this.y + c;
            var e = Pl();
            const f = Wl(e, d);
            e = Xl(e, c);
            a.strokeStyle = "#fff";
            a.beginPath();
            a.moveTo(f, 0);
            a.lineTo(f, e);
            a.stroke();
            (b = b ? Nh : ji) && am(b, d, c, .5);
            a.restore()
        }
    }
    ;
    function qv(a, b, c) {
        for (let d = 0; d < a.settings.length; ++d) {
            const e = a.settings[d]
              , f = e[0]
              , g = b[f]
              , h = e[1]
              , k = typeof h;
            void 0 !== g ? rv(a, f, k, g, e[2], e[3]) : c && rv(a, f, k, h, e[2], e[3])
        }
    }
    function rv(a, b, c, d, e, f) {
        switch (c) {
        case "number":
            d = Number(d);
            void 0 !== e && (d = Math.max(d, e));
            void 0 !== f && (d = Math.min(d, f));
            break;
        case "boolean":
            d = !!d
        }
        a.state.set(b, d)
    }
    var sv = class {
        constructor() {
            var a = {};
            this.state = new Map;
            this.settings = [["match_size", 8, 1, 8], ["num_players", 8, 1, 8], ["match_duration", 120], ["match_ends_when_time_expires", !0], ["match_ends_when_lobby_empties", !0], ["lobby_ttl_sec", 30], ["player_join_ttl_sec", 5], ["init_ttl_sec", 10], ["match_fps", 24], ["countdown_timer", 5], ["use_pathfinding", !1], ["render_paths", !1], ["render_fog", !0], ["fog_intensity", 170], ["fog_scale_x", .125], ["fog_scale_y", .25], ["fog_scale_t", 3.2E-4], ["render_lighting", !0], ["render_map_layers_above_players", !0], ["light_map_debug", !1], ["player_vision_radius", 10], ["player_base_speed", 15], ["powerup_speed_multiplier", 1.5], ["use_collectible_stealing", !0], ["max_collectibles_held", -1], ["collectible_trail_speed", 10], ["collectible_respawn", !0], ["collectible_respawn_timer_ms", 18E3], ["power_pellet_respawn_timer_ms", 3E4], ["magnet_attraction_radius", 15], ["magnet_sensor_radius", 10], ["magnet_inversion_rate", .15], ["all_seeing_lighting_multiplier", 2.2], ["use_dematerialization", !0], ["sonic_boom_timer_ms", 700], ["score_delta_timer_ms", 250], ["powerup_threshold_1", 15], ["powerup_threshold_2", 45], ["powerup_threshold_3", 105], ["powerup_threshold_4", 225], ["repel_smaller_collectible_holder", !0], ["ai_step_size", 7], ["ai_random_arc_range", Math.PI / 4], ["ai_action_timer_ms", 500], ["ai_seek_timer_ms", 3E3], ["steals_for_cooldown", 3], ["steal_delay_timer_ms", 1E3], ["steal_cooldown_timer_ms", 0], ["steal_speed_boost_time_ms", 1750], ["steal_speed_boost", 1.5], ["speed_boost_trail_coefficient", .01], ["use_ally_candle_bonus", !0], ["ally_candle_bonus_value", 5], ["ally_candle_bonus_cooldown_ms", 3E3], ["ally_bonus_timer_ms", 3E3], ["mega_flame_spawn_interval", 3E4], ["mega_flames_per_spawn", 2], ["mega_flame_movement_timer", 1E3], ["mega_flame_speed", 5], ["mega_flame_collectible_value", 10], ["mega_flame_flee_timer", 2500], ["mega_flame_flee_radius", 10], ["mega_flame_flee_speed", 20], ["invincible_timer_ms", 9E3], ["return_to_base_duration_ms", 2E3], ["sync_dt_threshold", .2], ["sync_slip_time", .1], ["sync_epsilon", 1], ["sync_coefficient", .1], ["client_broadcast_timeout", 50], ["draw_debug_location", !1], ["notice_duration_ms", 2E3], ["notice_offset_x", 0], ["notice_offset_y", 0], ["time_warning_duration_ms", 2E3], ["zoom_out_per_collectible_held", .5], ["zoom_tween_time_ms", 1E3], ["verify_map_hash", !1], ["is_2018", !1]];
            for (const [b,c] of Object.entries(a))
                this.settings.push([`env_${b}`, c]);
            qv(this, {}, !0)
        }
        update(a) {
            qv(this, a, !1)
        }
        get(a) {
            return this.state.get(a)
        }
        set(a, b) {
            this.state.set(a, b)
        }
    }
    ;
    function tv() {}
    tv.prototype.Je = function() {}
    ;
    tv.prototype.g = function() {}
    ;
    function uv() {
        this.g = Y(0, 0);
        this.i = Y(0, 0)
    }
    var vv = [];
    function wv() {
        if (0 < vv.length) {
            var a = vv.pop();
            a.g.set(0, 0);
            a.i.set(0, 0);
            return a
        }
        return new uv
    }
    uv.prototype.Vc = function() {
        return 0 > this.i.x - this.g.x || 0 > this.i.y - this.g.y ? !1 : this.g.Vc() && this.i.Vc()
    }
    ;
    uv.prototype.contains = function(a) {
        var b;
        return b = (b = (b = (b = this.g.x <= a.g.x) && this.g.y <= a.g.y) && a.i.x <= this.i.x) && a.i.y <= this.i.y
    }
    ;
    uv.prototype.jd = function(a) {
        return 0 < a.g.x - this.i.x || 0 < a.g.y - this.i.y || 0 < this.g.x - a.i.x ? !1 : 0 >= this.g.y - a.i.y
    }
    ;
    function xv(a, b, c) {
        a.g.x = Math.min(b.g.x, c.g.x);
        a.g.y = Math.min(b.g.y, c.g.y);
        a.i.x = Math.max(b.i.x, c.i.x);
        a.i.y = Math.max(b.i.y, c.i.y)
    }
    ;function yv() {
        this.Gb = Y(0, 0);
        this.Fb = Y(0, 0);
        this.c = Y(0, 0);
        this.vb = this.a = this.Sb = null
    }
    yv.prototype.set = function(a) {
        this.Gb.Ca(a.Gb);
        this.Fb.Ca(a.Fb);
        this.c.Ca(a.c);
        this.Sb = a.Sb;
        this.a = a.a;
        this.vb = a.vb
    }
    ;
    function zv(a, b, c) {
        void 0 === c && (c = 0);
        b.position.x = (1 - c) * a.Fb.x + c * a.c.x;
        b.position.y = (1 - c) * a.Fb.y + c * a.c.y;
        b.R.set((1 - c) * a.Sb + c * a.a);
        c = b.R;
        b.position.x -= c.T.x * a.Gb.x + c.U.x * a.Gb.y;
        b.position.y -= c.T.y * a.Gb.x + c.U.y * a.Gb.y
    }
    yv.prototype.advance = function(a) {
        void 0 === a && (a = 0);
        if (this.vb < a && 1 - this.vb > Number.MIN_VALUE) {
            var b = (a - this.vb) / (1 - this.vb);
            this.Fb.x = (1 - b) * this.Fb.x + b * this.c.x;
            this.Fb.y = (1 - b) * this.Fb.y + b * this.c.y;
            this.Sb = (1 - b) * this.Sb + b * this.a;
            this.vb = a
        }
    }
    ;
    function Av(a) {
        this.rb = a;
        this.g = this.next = null
    }
    var Bv = [];
    Av.prototype.tc = function(a) {
        this.g = a
    }
    ;
    Av.prototype.Na = function() {
        return this.next
    }
    ;
    function Cv() {
        this.i = [];
        for (var a = 0; a <= Dv; a++)
            this.i[a] = null;
        this.j = [];
        for (a = 0; a <= Dv; a++)
            this.j[a] = null;
        this.g = {}
    }
    Cv.prototype.Pa = function(a) {
        return this.i[a]
    }
    ;
    function Ev(a, b) {
        var c = b.i;
        if (null == a.g[c]) {
            a.g[c] = [];
            for (var d = 0; d <= Dv; d++)
                a.g[c][d] = null;
            Fv(a, b, c, Dv)
        }
    }
    function Gv(a, b, c, d) {
        c ? Fv(a, b, b.i, Hv) : Iv(a, b.i, Hv);
        d ? Fv(a, b, b.i, Jv) : Iv(a, b.i, Jv)
    }
    function Kv(a, b) {
        b = b.i;
        if (null != a.g[b]) {
            for (var c = 0; c <= Dv; c++)
                Iv(a, b, c);
            delete a.g[b]
        }
    }
    function Iv(a, b, c) {
        var d = a.g[b];
        if (null != d && (b = d[c],
        null != b)) {
            d[c] = null;
            d = b.g;
            var e = b.Na();
            null == d ? a.i[c] = e : d.next = e;
            null == e ? a.j[c] = d : e.tc(d);
            Bv.push(b)
        }
    }
    function Fv(a, b, c, d) {
        c = a.g[c];
        if (null == c[d]) {
            if (0 < Bv.length) {
                var e = Bv.pop();
                e.next = null;
                e.g = null;
                e.rb = b;
                b = e
            } else
                b = new Av(b);
            c[d] = b;
            b = a.j[d];
            null != b ? (b.next = c[d],
            c[d].tc(b)) : a.i[d] = c[d];
            a.j[d] = c[d]
        }
    }
    var Hv = 0
      , Jv = 1
      , Dv = 2;
    function Lv(a) {
        this.body = a;
        this.g = this.next = null
    }
    Lv.prototype.tc = function(a) {
        this.g = a
    }
    ;
    Lv.prototype.Na = function() {
        return this.next
    }
    ;
    function Mv() {
        this.i = [];
        for (var a = 0; a <= Nv; a++)
            this.i[a] = null;
        this.j = [];
        for (a = 0; a <= Nv; a++)
            this.j[a] = null;
        this.g = {}
    }
    Mv.prototype.Pa = function(a) {
        return this.i[a]
    }
    ;
    function Ov(a, b) {
        var c = b.getType()
          , d = b.ya
          , e = b.ac()
          , f = b.isActive();
        2 == c ? Pv(a, b, d, Qv) : Rv(a, d, Qv);
        0 != c ? Pv(a, b, d, Sv) : Rv(a, d, Sv);
        0 != c && f && e ? Pv(a, b, d, Tv) : Rv(a, d, Tv);
        e ? Pv(a, b, d, Uv) : Rv(a, d, Uv);
        f ? Pv(a, b, d, Vv) : Rv(a, d, Vv)
    }
    function Rv(a, b, c) {
        var d = a.g[b];
        null != d && (b = d[c],
        null != b && (d[c] = null,
        d = b.g,
        b = b.Na(),
        null == d ? a.i[c] = b : d.next = b,
        null == b ? a.j[c] = d : b.tc(d)))
    }
    function Pv(a, b, c, d) {
        var e = a.g[c];
        if (null == e) {
            e = [];
            for (var f = 0; f <= Nv; f++)
                e[f] = null;
            a.g[c] = e
        }
        null == e[d] && (e[d] = new Lv(b),
        b = a.j[d],
        null != b ? b.next = e[d] : a.i[d] = e[d],
        e[d].tc(b),
        a.j[d] = e[d])
    }
    var Qv = 0
      , Sv = 1
      , Vv = 2
      , Tv = 3
      , Uv = 4
      , Nv = 5;
    function Wv() {}
    Wv.prototype.Pa = function() {
        return null
    }
    ;
    function Xv(a) {
        this.Ha = wv();
        this.parent = this.Xb = this.Hb = null;
        this.kb = a
    }
    var Yv = [];
    function Zv(a) {
        "undefined" == typeof a && (a = null);
        if (0 < Yv.length) {
            var b = Yv.pop();
            b.kb = a;
            a = b.Ha;
            a.g.set(0, 0);
            a.i.set(0, 0);
            return b
        }
        return new Xv(a)
    }
    Xv.prototype.destroy = function() {
        this.kb = this.parent = this.Xb = this.Hb = null;
        Yv.push(this)
    }
    ;
    function $v(a, b) {
        this.H = "Fixture" + aw++;
        var c = b.filter
          , d = new ap;
        d.g = c.g;
        d.i = c.i;
        d.j = c.j;
        this.v = d;
        this.j = wv();
        this.O = wv();
        this.g = a;
        this.Va = b.g.Pd();
        this.u = b.i;
        this.V = b.H;
        this.oa = b.oa;
        this.o = b.j;
        this.i = null
    }
    $v.prototype.destroy = function() {
        var a = this.j;
        null != a && vv.push(a)
    }
    ;
    function bw(a, b, c, d) {
        if (a.i) {
            a.Va.Sc(a.j, c);
            a.Va.Sc(a.O, d);
            xv(a.j, a.j, a.O);
            c = Co(d.position, c.position);
            d = a.i;
            var e = b.u;
            a = a.j;
            Eo(null === d.Hb);
            if (d.Ha.contains(a))
                e = !1;
            else {
                cw(e, d);
                var f = .1 + 2 * Math.abs(c.x)
                  , g = .1 + 2 * Math.abs(c.y);
                d.Ha.g.x = a.g.x - f;
                d.Ha.g.y = a.g.y - g;
                d.Ha.i.x = a.i.x + f;
                d.Ha.i.y = a.i.y + g;
                dw(e, d);
                e = !0
            }
            e && b.i.push(d);
            Z(c)
        }
    }
    var aw = 0;
    function ew(a) {
        this.kb = a;
        this.g = this.next = null
    }
    ew.prototype.tc = function(a) {
        this.g = a
    }
    ;
    ew.prototype.Na = function() {
        return this.next
    }
    ;
    function fw() {
        this.j = this.i = null;
        this.g = {}
    }
    fw.prototype.Pa = function() {
        return this.i
    }
    ;
    function gw(a, b) {
        var c = b.H;
        if (null == a.g[c]) {
            b = new ew(b);
            var d = a.j;
            null != d ? d.next = b : a.i = b;
            b.tc(d);
            a.j = b;
            a.g[c] = b
        }
    }
    function hw(a, b) {
        b = b.H;
        var c = a.g[b];
        if (null != c) {
            var d = c.g;
            c = c.Na();
            null == d ? a.i = c : d.next = c;
            null == c ? a.j = d : c.tc(d);
            delete a.g[b]
        }
    }
    ;function iw(a, b) {
        this.ya = "Body" + jw++;
        this.va = new Vo;
        this.va.position.Ca(a.position);
        this.va.R.set(a.angle);
        this.ha = new yv;
        bo(this.ha.Gb);
        this.ha.vb = 1;
        this.ha.Sb = this.ha.a = a.angle;
        this.ha.c.x = this.va.R.T.x * this.ha.Gb.x + this.va.R.U.x * this.ha.Gb.y;
        this.ha.c.y = this.va.R.T.y * this.ha.Gb.x + this.va.R.U.y * this.ha.Gb.y;
        this.ha.c.x += this.va.position.x;
        this.ha.c.y += this.va.position.y;
        this.ha.Fb.Ca(this.ha.c);
        this.ka = fo(a.V);
        this.oa = Y(0, 0);
        this.u = a.v;
        this.Da = a.H;
        this.wa = a.i;
        this.V = a.u;
        this.v = a.active;
        this.g = b;
        this.Pb = null;
        this.tb = new Cv;
        this.Wa = new Wv;
        this.Aa = a.o;
        this.Ja = a.O;
        this.Ba = a.j;
        this.O = this.Ka = 0;
        this.j = a.type;
        this.Jb = 2 == this.j ? 1 : 0;
        this.Ma = 2 == this.j ? 1 : 0;
        this.nb = this.i = 0;
        this.Oa = a.g;
        this.o = new fw;
        this.H = []
    }
    function dp(a, b) {
        Eo(!a.g.i);
        b = new $v(a,b);
        if (a.v) {
            var c = a.g.g.g;
            b.Va.Sc(b.j, a.va);
            var d = b.j
              , e = c.u
              , f = Zv(b);
            f.Ha.g.x = d.g.x - .1;
            f.Ha.g.y = d.g.y - .1;
            f.Ha.i.x = d.i.x + .1;
            f.Ha.i.y = d.i.y + .1;
            dw(e, f);
            c.i.push(f);
            b.i = f
        }
        gw(a.o, b);
        b.g = a;
        0 < b.u && kw(a);
        a.g.v = !0;
        return b
    }
    r = iw.prototype;
    r.destroy = function() {
        Z(this.ka);
        Z(this.oa)
    }
    ;
    function Vu(a, b) {
        Eo(!a.g.i);
        hw(a.o, b);
        for (var c = a.tb.Pa(Dv); c; c = c.Na())
            b != c.rb.mb && b != c.rb.hb || a.g.g.destroy(c.rb);
        if (a.v && null != b.i) {
            c = a.g.g.g;
            var d = b.i;
            bb(c.i, d);
            cw(c.u, d);
            d.destroy();
            b.i = null
        }
        b.destroy();
        kw(a)
    }
    function lo(a, b, c) {
        Eo(!a.g.i);
        a.va.R.set(c);
        a.va.position.Ca(b);
        b = a.va.R;
        var d = a.ha.Gb;
        a.ha.c.x = b.T.x * d.x + b.U.x * d.y;
        a.ha.c.y = b.T.y * d.x + b.U.y * d.y;
        a.ha.c.x += a.va.position.x;
        a.ha.c.y += a.va.position.y;
        a.ha.Fb.Ca(a.ha.c);
        a.ha.Sb = a.ha.a = c;
        c = a.g.g.g;
        for (b = a.o.Pa(); b; b = b.Na())
            bw(b.kb, c, a.va, a.va);
        lw(a.g.g)
    }
    r.setTransform = function(a) {
        lo(this, a.position, Math.atan2(a.R.T.y, a.R.T.x))
    }
    ;
    function mo(a, b) {
        0 != a.j && a.ka.Ca(b)
    }
    r.split = function(a) {
        var b = fo(this.ka)
          , c = this.Aa
          , d = this.ha.c
          , e = this.g
          , f = new $o;
        f.type = this.getType();
        f.i = this.wa;
        f.angle = this.ha.a;
        f.j = this.Ba;
        f.o = this.Aa;
        f.H = this.Da;
        f.v = this.u;
        f.active = this.v;
        f.u = this.V;
        f.O = this.Ja;
        f.V.Ca(this.ka);
        f.position.Ca(this.va.position);
        e = cp(e, f);
        for (f = this.o.Pa(); f; f = f.Na()) {
            var g = f.kb;
            a(g) && (hw(this.o, g),
            gw(e.o, g))
        }
        kw(this);
        kw(e);
        a = e.ha.c;
        g = Co(this.ha.c, d);
        f = Y(-c * g.y, c * g.x);
        Z(g);
        g = Y(b.x + f.x, b.y + f.y);
        Z(f);
        mo(this, g);
        Z(g);
        a = Co(a, d);
        d = Y(-c * a.y, c * a.x);
        Z(a);
        a = Y(b.x + d.x, b.y + d.y);
        Z(d);
        mo(e, a);
        Z(a);
        Z(b);
        0 != this.j && (this.Aa = c);
        0 != e.j && (e.Aa = c);
        mw(this);
        mw(e);
        return e
    }
    ;
    function kw(a) {
        a.Jb = 0;
        a.Ma = 0;
        a.i = 0;
        a.nb = 0;
        bo(a.ha.Gb);
        if (0 != a.j && 1 != a.j) {
            for (var b = Y(0, 0), c = a.o.Pa(); c; c = c.Na()) {
                var d = c.kb;
                if (0 != d.u) {
                    var e = void 0;
                    0 < ro.length ? (e = ro.pop(),
                    e.i = 0,
                    bo(e.g),
                    e.I = 0) : e = new qo;
                    d.Va.fe(e, d.u);
                    a.Jb += e.i;
                    b.x += e.g.x * e.i;
                    b.y += e.g.y * e.i;
                    a.i += e.I
                }
            }
            0 < a.Jb ? (a.Ma = 1 / a.Jb,
            b.x *= a.Ma,
            b.y *= a.Ma) : (a.Jb = 1,
            a.Ma = 1);
            0 < a.i && !a.Da ? (a.i -= a.Jb * (b.x * b.x + b.y * b.y),
            a.i *= a.Oa,
            Eo(0 < a.i),
            a.nb = 1 / a.i) : (a.i = 0,
            a.nb = 0);
            c = fo(a.ha.c);
            a.ha.Gb.Ca(b);
            a.ha.Fb.Ca(Bo(a.va, a.ha.Gb));
            a.ha.c.Ca(a.ha.Fb);
            a.ka.x += a.Aa * -(a.ha.c.y - c.y);
            a.ka.y += a.Aa * +(a.ha.c.x - c.x);
            Z(b);
            Z(c)
        }
    }
    r.getType = function() {
        return this.j
    }
    ;
    function nw(a, b) {
        if (a.V != b)
            for (a.V = b,
            a.O = 0,
            b || (bo(a.ka),
            a.Aa = 0,
            bo(a.oa),
            a.Ka = 0),
            b = 0; b < a.H.length; b++)
                Ov(a.H[b], a)
    }
    r.ac = function() {
        return this.V
    }
    ;
    function Bu(a) {
        var b;
        if (0 != a.v) {
            a.v = !1;
            var c = a.g.g.g;
            for (b = a.o.Pa(); b; b = b.Na()) {
                var d = b.kb;
                if (null != d.i) {
                    var e = c
                      , f = d.i;
                    bb(e.i, f);
                    cw(e.u, f);
                    f.destroy();
                    d.i = null
                }
            }
            for (c = a.tb.Pa(Dv); c; c = c.Na())
                a.g.g.destroy(c.rb);
            for (c = 0; c < a.H.length; c++)
                Ov(a.H[c], a)
        }
    }
    r.isActive = function() {
        return this.v
    }
    ;
    function mw(a) {
        ow.R.set(a.ha.Sb);
        var b = ow.R
          , c = a.ha.Gb;
        ow.position.x = a.ha.Fb.x - (b.T.x * c.x + b.U.x * c.y);
        ow.position.y = a.ha.Fb.y - (b.T.y * c.x + b.U.y * c.y);
        b = a.g.g.g;
        for (c = a.o.Pa(); c; c = c.Na())
            bw(c.kb, b, ow, a.va)
    }
    function pw(a) {
        a.va.R.set(a.ha.a);
        var b = a.va.R
          , c = a.ha.Gb;
        a.va.position.x = a.ha.c.x - (b.T.x * c.x + b.U.x * c.y);
        a.va.position.y = a.ha.c.y - (b.T.y * c.x + b.U.y * c.y)
    }
    function qw(a, b) {
        if (2 != a.j && 2 != b.j)
            return !1;
        for (a = a.Pb; a; a = a.next)
            if (a.Ub == b && 0 == a.xc.Kf)
                return !1;
        return !0
    }
    r.advance = function(a) {
        this.ha.advance(a);
        this.ha.c.Ca(this.ha.Fb);
        this.ha.a = this.ha.Sb;
        pw(this)
    }
    ;
    var jw = 0
      , ow = new Vo;
    function rw() {
        this.j = this.i = this.o = this.g = 0
    }
    function sw(a, b) {
        a.g = b;
        a.o = a.g & 255;
        a.i = (a.g & 65280) >> 8 & 255;
        a.j = (a.g & 16711680) >> 16 & 255;
        a.u = (a.g & 4278190080) >> 24 & 255
    }
    rw.prototype.set = function(a) {
        sw(this, a.g)
    }
    ;
    function tw() {
        this.g = null
    }
    function dw(a, b) {
        if (null === a.g)
            a.g = b,
            a.g.parent = null;
        else {
            var c = b.Ha;
            c = Y((c.g.x + c.i.x) / 2, (c.g.y + c.i.y) / 2);
            for (var d = a.g; null !== d.Hb; ) {
                var e = d.Hb;
                d = d.Xb;
                d = Math.abs((e.Ha.g.x + e.Ha.i.x) / 2 - c.x) + Math.abs((e.Ha.g.y + e.Ha.i.y) / 2 - c.y) < Math.abs((d.Ha.g.x + d.Ha.i.x) / 2 - c.x) + Math.abs((d.Ha.g.y + d.Ha.i.y) / 2 - c.y) ? e : d
            }
            Z(c);
            c = d;
            e = c.parent;
            d = Zv();
            d.parent = e;
            xv(d.Ha, b.Ha, c.Ha);
            if (e)
                for (c.parent.Hb == c ? e.Hb = d : e.Xb = d,
                d.Hb = c,
                d.Xb = b,
                c.parent = d,
                b.parent = d; e && !e.Ha.contains(d.Ha); )
                    xv(e.Ha, e.Hb.Ha, e.Xb.Ha),
                    d = e,
                    e = e.parent;
            else
                d.Hb = c,
                d.Xb = b,
                c.parent = d,
                b.parent = d,
                a.g = d
        }
    }
    function cw(a, b) {
        if (b == a.g)
            a.g = null;
        else {
            var c = b.parent
              , d = c.parent;
            b = c.Hb == b ? c.Xb : c.Hb;
            if (d)
                for (d.Hb == c ? d.Hb = b : d.Xb = b,
                b.parent = d; d; ) {
                    a = d.Ha;
                    xv(d.Ha, d.Hb.Ha, d.Xb.Ha);
                    if (a.contains(d.Ha))
                        break;
                    d = d.parent
                }
            else
                a.g = b,
                b.parent = null;
            c.destroy()
        }
    }
    ;function uw() {
        this.u = new tw;
        this.i = [];
        this.g = this.v = this.o = this.j = null
    }
    uw.prototype.jd = function(a, b) {
        return a.Ha.jd(b.Ha)
    }
    ;
    function vw(a, b) {
        a.j = null;
        a.o = null;
        for (a.v = b; 0 < a.i.length; ) {
            a.g = a.i.pop();
            var c = a.u;
            b = a.H;
            var d = a.g.Ha
              , e = a;
            if (null !== c.g) {
                var f = [];
                for (f.push(c.g); 0 < f.length; )
                    if (c = f.pop(),
                    c.Ha.jd(d))
                        if (null === c.Hb) {
                            if (!b.call(e, c.kb))
                                break
                        } else
                            f.push(c.Hb),
                            f.push(c.Xb)
            }
        }
        a.j = null;
        a.o = null;
        a.v = null;
        a.g = null
    }
    uw.prototype.H = function(a) {
        a == this.g.kb || this.g.kb == this.j && a == this.o || this.g.kb == this.o && a == this.j || (this.v(this.g.kb, a),
        this.j = this.g.kb,
        this.o = a);
        return !0
    }
    ;
    function ww(a, b) {
        a = a.v;
        b = b.v;
        return a.j == b.j && 0 != a.j ? 0 < a.j : 0 != (a.i & b.g) && 0 != (a.g & b.i)
    }
    ;function xw() {
        this.g = Y(0, 0);
        this.id = new rw
    }
    xw.prototype.set = function(a) {
        this.g.Ca(a.g);
        this.id.set(a.id)
    }
    ;
    function yw() {
        this.Fa = Y(0, 0);
        this.hc = new rw;
        this.qc = this.oc = 0
    }
    yw.prototype.reset = function() {
        bo(this.Fa);
        this.qc = this.oc = 0;
        sw(this.hc, 0)
    }
    ;
    yw.prototype.set = function(a) {
        this.Fa.Ca(a.Fa);
        this.oc = a.oc;
        this.qc = a.qc;
        this.hc.set(a.hc)
    }
    ;
    function zw() {
        this.j = this.g = 0;
        this.Ea = [];
        for (var a = 0; 2 > a; a++)
            this.Ea[a] = new yw;
        this.i = Y(0, 0);
        this.Fa = Y(0, 0)
    }
    zw.prototype.reset = function() {
        for (var a = 0; 2 > a; a++)
            this.Ea[a].reset();
        bo(this.i);
        bo(this.Fa);
        this.g = this.j = 0
    }
    ;
    zw.prototype.set = function(a) {
        this.g = a.g;
        for (var b = 0; 2 > b; b++)
            this.Ea[b].set(a.Ea[b]);
        this.i.Ca(a.i);
        this.Fa.Ca(a.Fa);
        this.j = a.j
    }
    ;
    function Aw(a, b, c, d) {
        var e = 0
          , f = b[0].g
          , g = b[1].g
          , h = c.x * f.x + c.y * f.y - d;
        c = c.x * g.x + c.y * g.y - d;
        0 >= h && a[e++].set(b[0]);
        0 >= c && a[e++].set(b[1]);
        0 > h * c && (c = h / (h - c),
        d = a[e].g,
        d.x = f.x + c * (g.x - f.x),
        d.y = f.y + c * (g.y - f.y),
        a[e].id = 0 < h ? b[0].id : b[1].id,
        e++);
        return e
    }
    function Bw(a, b, c, d, e) {
        for (var f = b.R.T.x * a.i[c].x + b.R.U.x * a.i[c].y, g = b.R.T.y * a.i[c].x + b.R.U.y * a.i[c].y, h = e.R.T.x * f + e.R.T.y * g, k = e.R.U.x * f + e.R.U.y * g, l = 0, m = Number.MAX_VALUE, n = 0; n < d.o; n++) {
            var q = d.g[n].x * h + d.g[n].y * k;
            q < m && (m = q,
            l = n)
        }
        return (e.position.x + (e.R.T.x * d.g[l].x + e.R.U.x * d.g[l].y) - (b.position.x + (b.R.T.x * a.g[c].x + b.R.U.x * a.g[c].y))) * f + (e.position.y + (e.R.T.y * d.g[l].x + e.R.U.y * d.g[l].y) - (b.position.y + (b.R.T.y * a.g[c].x + b.R.U.y * a.g[c].y))) * g
    }
    function Cw(a, b, c, d) {
        var e = d.position.x + (d.R.T.x * c.u.x + d.R.U.x * c.u.y)
          , f = d.position.y + (d.R.T.y * c.u.x + d.R.U.y * c.u.y);
        e -= b.position.x + (b.R.T.x * a.u.x + b.R.U.x * a.u.y);
        f -= b.position.y + (b.R.T.y * a.u.x + b.R.U.y * a.u.y);
        var g = e * b.R.T.x + f * b.R.T.y;
        f = e * b.R.U.x + f * b.R.U.y;
        e = 0;
        for (var h = -Number.MAX_VALUE, k = 0; k < a.o; ++k) {
            var l = a.i[k].x * g + a.i[k].y * f;
            l > h && (h = l,
            e = k)
        }
        g = Bw(a, b, e, c, d);
        k = e - 1;
        0 > k && (k = a.o - 1);
        f = Bw(a, b, k, c, d);
        l = e + 1;
        l >= a.o && (l = 0);
        h = Bw(a, b, l, c, d);
        if (f > g && f > h)
            for (; ; )
                if (e = k - 1,
                0 > e && (e = a.o - 1),
                g = Bw(a, b, e, c, d),
                g > f)
                    k = e,
                    f = g;
                else
                    break;
        else if (h > g)
            for (k = l,
            f = h; ; )
                if (e = k + 1,
                e >= a.o && (e = 0),
                g = Bw(a, b, e, c, d),
                g > f)
                    k = e,
                    f = g;
                else
                    break;
        else
            k = e,
            f = g;
        return {
            Ke: k,
            Gd: f
        }
    }
    var Dw = [new xw, new xw]
      , Ew = [new xw, new xw]
      , Fw = [new xw, new xw]
      , Gw = Y(0, 0)
      , Hw = Y(0, 0)
      , Iw = Y(0, 0)
      , Jw = Y(0, 0)
      , Kw = Y(0, 0)
      , Lw = Y(0, 0)
      , Mw = Y(0, 0)
      , Nw = Y(0, 0);
    function Ow() {
        var a = Pw
          , b = Qw
          , c = Rw
          , d = 0;
        switch (a.o) {
        case 1:
            var e = Ao(b.R, a.g)
              , f = co(a.g);
            d = Ao(c.R, f);
            Z(f);
            var g = So(a.i, e);
            Z(e);
            e = So(a.j, d);
            Z(d);
            b = Bo(b, g);
            c = Bo(c, e);
            d = (c.x - b.x) * a.g.x + (c.y - b.y) * a.g.y;
            Z(b);
            Z(c);
            break;
        case 2:
            f = zo(b.R, a.g);
            g = co(f);
            d = Ao(c.R, g);
            Z(g);
            e = So(a.j, d);
            Z(d);
            b = Bo(b, a.Fa);
            c = Bo(c, e);
            d = (c.x - b.x) * f.x + (c.y - b.y) * f.y;
            Z(f);
            Z(b);
            Z(c);
            break;
        case 4:
            f = zo(c.R, a.g);
            g = co(f);
            e = Ao(b.R, g);
            Z(g);
            g = So(a.i, e);
            Z(e);
            b = Bo(b, g);
            c = Bo(c, a.Fa);
            d = (b.x - c.x) * f.x + (b.y - c.y) * f.y;
            Z(f);
            Z(b);
            Z(c);
            break;
        default:
            Eo(!1)
        }
        return d
    }
    ;var Sw = 0
      , Tw = 0
      , Uw = 0
      , Vw = new To
      , Ww = new Po
      , Qw = new Vo
      , Rw = new Vo
      , Pw = new function() {
        this.Fa = Y(0, 0);
        this.g = Y(0, 0);
        this.j = this.i = null
    }
      , Xw = new Qo;
    function Yw(a, b) {
        this.i = "Contact" + Zw++;
        this.g = new zw;
        this.v = new zw;
        this.u = !1;
        var c = a.g
          , d = b.g;
        this.Ba = 2 != c.getType() || c.u || 2 != d.getType() || d.u;
        this.ya = a.o || b.o;
        this.oa = !1;
        this.mb = a;
        this.hb = b;
        this.zc = null;
        this.H = !0;
        this.O = c.tb;
        this.V = d.tb;
        this.wa = d.g.tb;
        $w(this)
    }
    Yw.prototype.reset = function(a, b) {
        this.g.reset();
        this.v.reset();
        this.u = !1;
        var c = a.g
          , d = b.g;
        this.Ba = 2 != c.getType() || c.u || 2 != d.getType() || d.u;
        this.ya = a.o || b.o;
        this.oa = !1;
        this.mb = a;
        this.hb = b;
        this.H = !0;
        this.O = c.tb;
        this.V = d.tb;
        this.wa = d.g.tb;
        $w(this)
    }
    ;
    function $w(a) {
        Ev(a.O, a);
        Ev(a.V, a);
        Ev(a.wa, a);
        ax(a)
    }
    function ax(a) {
        var b = !1
          , c = !1;
        !a.ya && a.H && (a.u && (b = !0),
        a.Ba && (c = !0));
        Gv(a.O, a, b, c);
        Gv(a.V, a, b, c);
        Gv(a.wa, a, b, c)
    }
    function bx(a, b) {
        var c = a.mb.g;
        return c != b ? c : a.hb.g
    }
    Yw.prototype.update = function(a) {
        var b = this.v;
        this.v = this.g;
        this.g = b;
        this.H = !0;
        var c = !1;
        b = this.u;
        var d = this.mb.g
          , e = this.hb.g
          , f = this.mb.j.jd(this.hb.j);
        if (this.ya) {
            if (f) {
                c = this.mb.Va;
                d = d.va;
                f = this.hb.Va;
                var g = e.va;
                e = new Po;
                e.g = new Ro;
                e.g.set(c);
                e.i = new Ro;
                e.i.set(f);
                e.j = d;
                e.o = g;
                e.u = !0;
                d = new To;
                d.count = 0;
                c = new Qo;
                Mo(c, d, e);
                Z(c.g);
                Z(c.i);
                c = c.j < 10 * Number.MIN_VALUE
            }
            this.g.g = 0
        } else {
            this.Ba = 2 != d.getType() || d.u || 2 != e.getType() || e.u;
            if (f)
                for (this.j(),
                c = 0 < this.g.g,
                f = 0; f < this.g.g; f++) {
                    g = this.g.Ea[f];
                    g.oc = 0;
                    for (var h = g.qc = 0; h < this.v.g; h++) {
                        var k = this.v.Ea[h];
                        if (k.hc.g == g.hc.g) {
                            g.oc = k.oc;
                            g.qc = k.qc;
                            break
                        }
                    }
                }
            else
                this.g.g = 0;
            c != b && (nw(d, !0),
            nw(e, !0))
        }
        this.u = c;
        c != b && ax(this);
        !b && c && a.Je(this)
    }
    ;
    Yw.prototype.j = function() {}
    ;
    var cx = new function() {
        this.g = new Ro;
        this.i = new Ro;
        this.j = new yv;
        this.o = new yv
    }
      , Zw = 0;
    function dx(a, b) {
        Yw.call(this, a, b)
    }
    sa(dx, Yw);
    dx.prototype.reset = function(a, b) {
        dx.Qb.reset.call(this, a, b)
    }
    ;
    dx.prototype.j = function() {
        var a = this.g
          , b = this.mb.Va
          , c = this.mb.g.va
          , d = this.hb.Va
          , e = this.hb.g.va;
        a.g = 0;
        var f = e.position.x + (e.R.T.x * d.g.x + e.R.U.x * d.g.y) - (c.position.x + (c.R.T.x * b.g.x + c.R.U.x * b.g.y));
        c = e.position.y + (e.R.T.y * d.g.x + e.R.U.y * d.g.y) - (c.position.y + (c.R.T.y * b.g.x + c.R.U.y * b.g.y));
        e = b.j + d.j;
        f * f + c * c > e * e || (a.j = 1,
        a.Fa.Ca(b.g),
        bo(a.i),
        a.g = 1,
        a.Ea[0].Fa.Ca(d.g),
        sw(a.Ea[0].hc, 0))
    }
    ;
    function ex() {}
    ;function fx(a, b) {
        Yw.call(this, a, b)
    }
    sa(fx, Yw);
    fx.prototype.reset = function(a, b) {
        fx.Qb.reset.call(this, a, b)
    }
    ;
    fx.prototype.j = function() {}
    ;
    function gx(a, b) {
        Eo(a.Va instanceof Wo);
        Eo(b.Va instanceof zu);
        Yw.call(this, a, b)
    }
    sa(gx, Yw);
    gx.prototype.reset = function(a, b) {
        Eo(a.Va instanceof Wo);
        Eo(b.Va instanceof zu);
        gx.Qb.reset.call(this, a, b)
    }
    ;
    gx.prototype.j = function() {
        a: {
            var a = this.g
              , b = this.mb.Va
              , c = this.mb.g.va
              , d = this.hb.Va
              , e = this.hb.g.va;
            a.g = 0;
            var f = e.position.x + (e.R.T.x * d.g.x + e.R.U.x * d.g.y) - c.position.x
              , g = e.position.y + (e.R.T.y * d.g.x + e.R.U.y * d.g.y) - c.position.y;
            e = f * c.R.T.x + g * c.R.T.y;
            c = f * c.R.U.x + g * c.R.U.y;
            f = 0;
            g = -Number.MAX_VALUE;
            for (var h = b.j + d.j, k = 0; k < b.o; ++k) {
                var l = b.i[k].x * (e - b.g[k].x) + b.i[k].y * (c - b.g[k].y);
                if (l > h)
                    break a;
                l > g && (g = l,
                f = k)
            }
            l = f + 1;
            l >= b.o && (l = 0);
            k = b.g[f];
            var m = b.g[l];
            if (g < Number.MIN_VALUE)
                a.g = 1,
                a.j = 2,
                a.i.Ca(b.i[f]),
                a.Fa.x = .5 * (k.x + m.x),
                a.Fa.y = .5 * (k.y + m.y);
            else if (0 >= (e - k.x) * (m.x - k.x) + (c - k.y) * (m.y - k.y)) {
                if ((e - k.x) * (e - k.x) + (c - k.y) * (c - k.y) > h * h)
                    break a;
                a.g = 1;
                a.j = 2;
                a.i.x = e - k.x;
                a.i.y = c - k.y;
                io(a.i);
                a.Fa.Ca(k)
            } else if (0 >= (e - m.x) * (k.x - m.x) + (c - m.y) * (k.y - m.y)) {
                if ((e - m.x) * (e - m.x) + (c - m.y) * (c - m.y) > h * h)
                    break a;
                a.g = 1;
                a.j = 2;
                a.i.x = e - m.x;
                a.i.y = c - m.y;
                io(a.i);
                a.Fa.Ca(m)
            } else {
                l = .5 * (k.x + m.x);
                k = .5 * (k.y + m.y);
                g = (e - l) * b.i[f].x + (c - k) * b.i[f].y;
                if (g > h)
                    break a;
                a.g = 1;
                a.j = 2;
                a.i.x = b.i[f].x;
                a.i.y = b.i[f].y;
                io(a.i);
                a.Fa.set(l, k)
            }
            a.Ea[0].Fa.Ca(d.g);
            sw(a.Ea[0].hc, 0)
        }
    }
    ;
    function hx(a, b) {
        Eo(a.Va instanceof Wo);
        Eo(!1);
        Yw.call(this, a, b)
    }
    sa(hx, Yw);
    hx.prototype.reset = function(a, b) {
        Eo(a.Va instanceof Wo);
        Eo(!1);
        hx.Qb.reset.call(this, a, b)
    }
    ;
    hx.prototype.j = function() {}
    ;
    function ix(a, b) {
        Yw.call(this, a, b)
    }
    sa(ix, Yw);
    ix.prototype.reset = function(a, b) {
        ix.Qb.reset.call(this, a, b)
    }
    ;
    ix.prototype.j = function() {
        var a = this.g
          , b = this.mb.Va
          , c = this.mb.g.va
          , d = this.hb.Va
          , e = this.hb.g.va;
        a.g = 0;
        var f = b.j + d.j
          , g = Cw(b, c, d, e);
        if (!(g.Gd > f)) {
            var h = Cw(d, e, b, c);
            if (!(h.Gd > f)) {
                var k = b
                  , l = d
                  , m = c
                  , n = e
                  , q = 0
                  , t = g.Ke;
                a.j = 2;
                h.Gd > .98 * g.Gd + .001 && (k = d,
                l = b,
                m = e,
                n = c,
                t = h.Ke,
                a.j = 4,
                q = 1);
                b = t;
                c = n;
                e = m.R.T.x * k.i[b].x + m.R.U.x * k.i[b].y;
                g = m.R.T.y * k.i[b].x + m.R.U.y * k.i[b].y;
                d = c.R.T.x * e + c.R.T.y * g;
                g = c.R.U.x * e + c.R.U.y * g;
                e = d;
                d = 0;
                h = Number.MAX_VALUE;
                for (var w = 0; w < l.o; w++) {
                    var p = e * l.i[w].x + g * l.i[w].y;
                    p < h && (h = p,
                    d = w)
                }
                e = d + 1;
                e >= l.o && (e = 0);
                Dw[0].g.x = c.position.x + (c.R.T.x * l.g[d].x + c.R.U.x * l.g[d].y);
                Dw[0].g.y = c.position.y + (c.R.T.y * l.g[d].x + c.R.U.y * l.g[d].y);
                g = Dw[0].id;
                g.o = b;
                g.g = g.g & 4294967040 | g.o & 255;
                g = Dw[0].id;
                g.i = d;
                g.g = g.g & 4294902015 | g.i << 8 & 65280;
                d = Dw[0].id;
                d.j = 0;
                d.g = d.g & 4278255615 | d.j << 16 & 16711680;
                Dw[1].g.x = c.position.x + (c.R.T.x * l.g[e].x + c.R.U.x * l.g[e].y);
                Dw[1].g.y = c.position.y + (c.R.T.y * l.g[e].x + c.R.U.y * l.g[e].y);
                l = Dw[1].id;
                l.o = b;
                l.g = l.g & 4294967040 | l.o & 255;
                b = Dw[1].id;
                b.i = e;
                b.g = b.g & 4294902015 | b.i << 8 & 65280;
                b = Dw[1].id;
                b.j = 1;
                b.g = b.g & 4278255615 | b.j << 16 & 16711680;
                b = k.g[t];
                k = t + 1 < k.o ? k.g[t + 1] : k.g[0];
                Gw.set(k.x - b.x, k.y - b.y);
                io(Gw);
                Hw.x = Gw.y;
                Hw.y = -Gw.x;
                Iw.set(.5 * (b.x + k.x), .5 * (b.y + k.y));
                Kw.x = m.R.T.x * Gw.x + m.R.U.x * Gw.y;
                Kw.y = m.R.T.y * Gw.x + m.R.U.y * Gw.y;
                Lw.x = -Kw.x;
                Lw.y = -Kw.y;
                Jw.x = Kw.y;
                Jw.y = -Kw.x;
                Mw.x = m.position.x + (m.R.T.x * b.x + m.R.U.x * b.y);
                Mw.y = m.position.y + (m.R.T.y * b.x + m.R.U.y * b.y);
                Nw.x = m.position.x + (m.R.T.x * k.x + m.R.U.x * k.y);
                Nw.y = m.position.y + (m.R.T.y * k.x + m.R.U.y * k.y);
                if (!(2 > Aw(Ew, Dw, Lw, -Kw.x * Mw.x - Kw.y * Mw.y + f) || 2 > Aw(Fw, Ew, Kw, Kw.x * Nw.x + Kw.y * Nw.y + f))) {
                    a.i.Ca(Hw);
                    a.Fa.Ca(Iw);
                    m = Jw.x * Mw.x + Jw.y * Mw.y;
                    for (t = k = 0; 2 > t; ++t)
                        Jw.x * Fw[t].g.x + Jw.y * Fw[t].g.y - m <= f && (b = Fw[t].g.x - n.position.x,
                        l = Fw[t].g.y - n.position.y,
                        a.Ea[k].Fa.x = b * n.R.T.x + l * n.R.T.y,
                        a.Ea[k].Fa.y = b * n.R.U.x + l * n.R.U.y,
                        a.Ea[k].hc.set(Fw[t].id),
                        b = a.Ea[k].hc,
                        b.u = q,
                        b.g = b.g & 16777215 | b.u << 24 & 4278190080,
                        k++);
                    a.g = k
                }
            }
        }
    }
    ;
    function jx() {
        this.g = {};
        this.i = {};
        kx(this, dx, "CircleShape", "CircleShape");
        kx(this, gx, "PolygonShape", "CircleShape");
        kx(this, ix, "PolygonShape", "PolygonShape");
        kx(this, fx, "EdgeShape", "CircleShape");
        kx(this, hx, "PolygonShape", "EdgeShape")
    }
    function kx(a, b, c, d) {
        a.i[c] = a.i[c] || {};
        a.i[c][d] = a.i[c][d] || [];
        a.g[c] = a.g[c] || {};
        a.g[c][d] = new ex;
        a.g[c][d].Oe = b;
        a.g[c][d].ef = !0;
        c != d && (a.g[d] = a.g[d] || {},
        a.g[d][c] = new ex,
        a.g[d][c].Oe = b,
        a.g[d][c].ef = !1)
    }
    jx.prototype.create = function(a, b) {
        var c = a.Va.getTypeName()
          , d = b.Va.getTypeName()
          , e = this.g[c][d]
          , f = e.Oe;
        return null != f ? e.ef ? 0 < this.i[c][d].length ? (c = this.i[c][d].pop(),
        c.reset(a, b),
        c) : new f(a,b) : 0 < this.i[d][c].length ? (c = this.i[d][c].pop(),
        c.reset(b, a),
        c) : new f(b,a) : null
    }
    ;
    jx.prototype.destroy = function(a) {
        var b = a.mb.Va.getTypeName()
          , c = a.hb.Va.getTypeName();
        this.i[b][c].push(a)
    }
    ;
    function lx(a) {
        this.o = a;
        this.i = new tv;
        this.j = new jx;
        this.g = new uw
    }
    function lw(a) {
        vw(a.g, function(b, c) {
            a: {
                var d = b.g
                  , e = c.g;
                if (d != e && qw(e, d) && ww(b, c)) {
                    for (d = e.tb.Pa(Dv); d; d = d.Na())
                        if (e = d.rb.mb,
                        e == b) {
                            if (e = d.rb.hb,
                            e == c)
                                break a
                        } else if (e == c && (e = d.rb.hb,
                        e == b))
                            break a;
                    a.j.create(b, c)
                }
            }
        })
    }
    lx.prototype.destroy = function(a) {
        var b = a.mb.g
          , c = a.hb.g;
        0 < a.g.g && (nw(b, !0),
        nw(c, !0));
        Kv(a.O, a);
        Kv(a.V, a);
        Kv(a.wa, a);
        this.j.destroy(a)
    }
    ;
    new function() {
        this.position = Y(0, 0);
        Y(0, 0);
        Y(0, 0);
        this.id = new rw
    }
    ;
    function mx() {
        this.u = Y(0, 0);
        this.i = Y(0, 0);
        this.j = Y(0, 0);
        this.o = this.g = 0
    }
    mx.prototype.reset = function() {
        this.u.set(0, 0);
        this.i.set(0, 0);
        this.j.set(0, 0);
        this.o = this.g = 0
    }
    ;
    function nx() {
        this.O = Y(0, 0);
        this.v = Y(0, 0);
        this.o = Y(0, 0);
        this.V = vo();
        this.K = vo();
        this.j = [];
        for (var a = 0; 2 > a; a++)
            this.j[a] = new mx
    }
    ;function ox() {
        this.g = Y(0, 0);
        this.i = [];
        this.Ea = [];
        for (var a = 0; 2 > a; a++)
            this.Ea[a] = Y(0, 0)
    }
    ox.prototype.j = function(a) {
        var b = a.g.va.R
          , c = a.v
          , d = a.g.va.position.x + (b.T.x * c.x + b.U.x * c.y)
          , e = a.g.va.position.y + (b.T.y * c.x + b.U.y * c.y);
        b = a.i.va.R;
        c = a.j[0].u;
        var f = a.i.va.position.x + (b.T.x * c.x + b.U.x * c.y);
        b = a.i.va.position.y + (b.T.y * c.x + b.U.y * c.y);
        c = f - d;
        var g = b - e
          , h = c * c + g * g;
        h > Io ? (h = Math.sqrt(h),
        this.g.x = c / h,
        this.g.y = g / h) : (this.g.x = 1,
        this.g.y = 0);
        this.Ea[0].x = .5 * (d + f);
        this.Ea[0].y = .5 * (e + b);
        this.i[0] = c * this.g.x + g * this.g.y - a.radius
    }
    ;
    ox.prototype.o = function(a) {
        this.g.x = a.g.va.R.T.x * a.O.x + a.g.va.R.U.x * a.O.y;
        this.g.y = a.g.va.R.T.y * a.O.x + a.g.va.R.U.y * a.O.y;
        for (var b = a.g.va.position.x + (a.g.va.R.T.x * a.v.x + a.g.va.R.U.x * a.v.y), c = a.g.va.position.y + (a.g.va.R.T.y * a.v.x + a.g.va.R.U.y * a.v.y), d = 0; d < a.u; d++) {
            var e = a.i.va.position.x + (a.i.va.R.T.x * a.j[d].u.x + a.i.va.R.U.x * a.j[d].u.y)
              , f = a.i.va.position.y + (a.i.va.R.T.y * a.j[d].u.x + a.i.va.R.U.y * a.j[d].u.y);
            this.i[d] = (e - b) * this.g.x + (f - c) * this.g.y - a.radius;
            this.Ea[d].x = e;
            this.Ea[d].y = f
        }
    }
    ;
    ox.prototype.u = function(a) {
        this.g.x = a.i.va.R.T.x * a.O.x + a.i.va.R.U.x * a.O.y;
        this.g.y = a.i.va.R.T.y * a.O.x + a.i.va.R.U.y * a.O.y;
        for (var b = a.i.va.position.x + (a.i.va.R.T.x * a.v.x + a.i.va.R.U.x * a.v.y), c = a.i.va.position.y + (a.i.va.R.T.y * a.v.x + a.i.va.R.U.y * a.v.y), d = 0; d < a.u; d++) {
            var e = a.g.va.position.x + (a.g.va.R.T.x * a.j[d].u.x + a.g.va.R.U.x * a.j[d].u.y)
              , f = a.g.va.position.y + (a.g.va.R.T.y * a.j[d].u.x + a.g.va.R.U.y * a.j[d].u.y);
            this.i[d] = (e - b) * this.g.x + (f - c) * this.g.y - a.radius;
            this.Ea[d].set(e, f)
        }
        this.g.x *= -1;
        this.g.y *= -1
    }
    ;
    function px() {
        this.reset(0, 0, 0, 0, !0)
    }
    px.prototype.reset = function(a, b, c, d, e) {
        this.g = a;
        var f = 0;
        0 < a && (f = 1 / a);
        this.i = f;
        this.u = b;
        this.j = c;
        this.o = d;
        this.v = e
    }
    ;
    function qx() {
        this.g = [];
        this.i = 0
    }
    function rx(a, b, c) {
        for (a.i = c; a.g.length < a.i; )
            a.g[a.g.length] = new nx;
        for (var d = 0; d < c; d++) {
            var e = b[d]
              , f = e.mb
              , g = e.hb
              , h = f.Va.j
              , k = g.Va.j
              , l = f.g
              , m = g.g;
            e = e.g;
            var n = Math.sqrt(f.V * g.V);
            f = f.oa;
            g = g.oa;
            var q = f > g ? f : g;
            g = l.ka.x;
            f = l.ka.y;
            var t = m.ka.x
              , w = m.ka.y
              , p = l.Aa
              , v = m.Aa;
            Eo(0 < e.g);
            var C = e
              , D = l.va
              , x = h
              , J = m.va
              , B = k
              , I = sx;
            if (0 != C.g)
                switch (C.j) {
                case 1:
                    var y = D.R;
                    var z = C.Fa;
                    var U = D.position.x + y.T.x * z.x + y.U.x * z.y;
                    D = D.position.y + y.T.y * z.x + y.U.y * z.y;
                    y = J.R;
                    z = C.Ea[0].Fa;
                    C = J.position.x + y.T.x * z.x + y.U.x * z.y;
                    J = J.position.y + y.T.y * z.x + y.U.y * z.y;
                    y = C - U;
                    z = J - D;
                    var pa = y * y + z * z;
                    pa > Io ? (pa = Math.sqrt(pa),
                    I.g.x = y / pa,
                    I.g.y = z / pa) : (I.g.x = 1,
                    I.g.y = 0);
                    y = D + x * I.g.y;
                    J -= B * I.g.y;
                    I.Ea[0].x = .5 * (U + x * I.g.x + (C - B * I.g.x));
                    I.Ea[0].y = .5 * (y + J);
                    break;
                case 2:
                    y = D.R;
                    z = C.i;
                    pa = y.T.x * z.x + y.U.x * z.y;
                    var hc = y.T.y * z.x + y.U.y * z.y;
                    y = D.R;
                    z = C.Fa;
                    var gf = D.position.x + y.T.x * z.x + y.U.x * z.y;
                    var hf = D.position.y + y.T.y * z.x + y.U.y * z.y;
                    I.g.x = pa;
                    I.g.y = hc;
                    for (U = 0; U < C.g; U++) {
                        y = J.R;
                        z = C.Ea[U].Fa;
                        var fd = J.position.x + y.T.x * z.x + y.U.x * z.y;
                        y = J.position.y + y.T.y * z.x + y.U.y * z.y;
                        I.Ea[U].x = fd + .5 * (x - (fd - gf) * pa - (y - hf) * hc - B) * pa;
                        I.Ea[U].y = y + .5 * (x - (fd - gf) * pa - (y - hf) * hc - B) * hc
                    }
                    break;
                case 4:
                    for (y = J.R,
                    z = C.i,
                    pa = y.T.x * z.x + y.U.x * z.y,
                    hc = y.T.y * z.x + y.U.y * z.y,
                    y = J.R,
                    z = C.Fa,
                    gf = J.position.x + y.T.x * z.x + y.U.x * z.y,
                    hf = J.position.y + y.T.y * z.x + y.U.y * z.y,
                    I.g.x = -pa,
                    I.g.y = -hc,
                    U = 0; U < C.g; U++)
                        y = D.R,
                        z = C.Ea[U].Fa,
                        fd = D.position.x + y.T.x * z.x + y.U.x * z.y,
                        y = D.position.y + y.T.y * z.x + y.U.y * z.y,
                        I.Ea[U].x = fd + .5 * (B - (fd - gf) * pa - (y - hf) * hc - x) * pa,
                        I.Ea[U].y = y + .5 * (B - (fd - gf) * pa - (y - hf) * hc - x) * hc
                }
            B = sx.g.x;
            I = sx.g.y;
            x = a.g[d];
            x.g = l;
            x.i = m;
            x.ya = e;
            x.o.x = B;
            x.o.y = I;
            x.u = e.g;
            x.H = n;
            x.oa = q;
            x.O.x = e.i.x;
            x.O.y = e.i.y;
            x.v.x = e.Fa.x;
            x.v.y = e.Fa.y;
            x.radius = h + k;
            x.type = e.j;
            for (h = 0; h < x.u; ++h)
                n = e.Ea[h],
                k = x.j[h],
                k.g = n.oc,
                k.o = n.qc,
                k.u.Ca(n.Fa),
                n = k.i.x = sx.Ea[h].x - l.ha.c.x,
                q = k.i.y = sx.Ea[h].y - l.ha.c.y,
                J = k.j.x = sx.Ea[h].x - m.ha.c.x,
                U = k.j.y = sx.Ea[h].y - m.ha.c.y,
                y = n * I - q * B,
                z = J * I - U * B,
                y *= y,
                z *= z,
                k.V = 1 / (l.Ma + m.Ma + l.nb * y + m.nb * z),
                C = l.Jb * l.Ma + m.Jb * m.Ma,
                C += l.Jb * l.nb * y + m.Jb * m.nb * z,
                k.H = 1 / C,
                z = I,
                C = -B,
                y = n * C - q * z,
                z = J * C - U * z,
                y *= y,
                z *= z,
                k.O = 1 / (l.Ma + m.Ma + l.nb * y + m.nb * z),
                k.v = 0,
                n = x.o.x * (t + -v * U - g - -p * q) + x.o.y * (w + v * J - f - p * n),
                -1 > n && (k.v += -x.oa * n);
            2 == x.u && (w = x.j[0],
            t = x.j[1],
            e = l.Ma,
            l = l.nb,
            g = m.Ma,
            m = m.nb,
            f = w.i.x * I - w.i.y * B,
            w = w.j.x * I - w.j.y * B,
            p = t.i.x * I - t.i.y * B,
            h = t.j.x * I - t.j.y * B,
            t = e + g + l * f * f + m * w * w,
            v = e + g + l * p * p + m * h * h,
            m = e + g + l * f * p + m * w * h,
            t * t < 100 * (t * v - m * m) ? (x.K.T.set(t, m),
            x.K.U.set(m, v),
            m = x.K,
            l = x.V,
            e = m.T.x * m.U.y - m.U.x * m.T.y,
            0 !== e && (e = 1 / e),
            l.T.x = e * m.U.y,
            l.U.x = -e * m.U.x,
            l.T.y = -e * m.T.y,
            l.U.y = e * m.T.x) : x.u = 1)
        }
    }
    function tx(a) {
        for (var b = 0; b < a.i; b++) {
            for (var c = a.g[b], d = c.o.x, e = c.o.y, f = 0; f < c.u; f++) {
                var g = c
                  , h = c.j[f]
                  , k = g.o.y
                  , l = -g.o.x
                  , m = g.H * h.g;
                m = Do(h.o - h.O * ((g.i.ka.x - g.i.Aa * h.j.y - g.g.ka.x + g.g.Aa * h.i.y) * k + (g.i.ka.y + g.i.Aa * h.j.x - g.g.ka.y - g.g.Aa * h.i.x) * l), -m, m);
                var n = m - h.o;
                k *= n;
                l *= n;
                g.g.ka.x -= g.g.Ma * k;
                g.g.ka.y -= g.g.Ma * l;
                g.g.Aa -= g.g.nb * (h.i.x * l - h.i.y * k);
                g.i.ka.x += g.i.Ma * k;
                g.i.ka.y += g.i.Ma * l;
                g.i.Aa += g.i.nb * (h.j.x * l - h.j.y * k);
                h.o = m
            }
            if (1 == c.u)
                f = c.j[0],
                g = f.g - f.V * ((c.i.ka.x - c.i.Aa * f.j.y - c.g.ka.x + c.g.Aa * f.i.y) * d + (c.i.ka.y + c.i.Aa * f.j.x - c.g.ka.y - c.g.Aa * f.i.x) * e - f.v),
                g = 0 < g ? g : 0,
                h = g - f.g,
                d *= h,
                e *= h,
                c.g.ka.x -= c.g.Ma * d,
                c.g.ka.y -= c.g.Ma * e,
                c.g.Aa -= c.g.nb * (f.i.x * e - f.i.y * d),
                c.i.ka.x += c.i.Ma * d,
                c.i.ka.y += c.i.Ma * e,
                c.i.Aa += c.i.nb * (f.j.x * e - f.j.y * d),
                f.g = g;
            else
                for (f = c.j[0],
                g = c.j[1],
                h = f.g,
                l = g.g,
                m = (c.i.ka.x - c.i.Aa * f.j.y - c.g.ka.x + c.g.Aa * f.i.y) * d + (c.i.ka.y + c.i.Aa * f.j.x - c.g.ka.y - c.g.Aa * f.i.x) * e - f.v,
                e = (c.i.ka.x - c.i.Aa * g.j.y - c.g.ka.x + c.g.Aa * g.i.y) * d + (c.i.ka.y + c.i.Aa * g.j.x - c.g.ka.y - c.g.Aa * g.i.x) * e - g.v,
                m -= c.K.T.x * h + c.K.U.x * l,
                e -= c.K.T.y * h + c.K.U.y * l; ; ) {
                    d = -(c.V.T.x * m + c.V.U.x * e);
                    if (0 <= d && (k = -(c.V.T.y * m + c.V.U.y * e),
                    0 <= k)) {
                        ux(c, f, g, d - h, k - l);
                        f.g = d;
                        g.g = k;
                        break
                    }
                    d = -f.V * m;
                    if (0 <= d && 0 <= c.K.T.y * d + e) {
                        ux(c, f, g, d - h, -l);
                        f.g = d;
                        g.g = 0;
                        break
                    }
                    d = -g.V * e;
                    if (0 <= d && 0 <= c.K.U.x * d + m) {
                        ux(c, f, g, -h, d - l);
                        f.g = 0;
                        g.g = d;
                        break
                    }
                    if (0 <= m && 0 <= e) {
                        ux(c, f, g, -h, -l);
                        f.g = 0;
                        g.g = 0;
                        break
                    }
                    break
                }
        }
    }
    function ux(a, b, c, d, e) {
        var f = d * a.o.x;
        d *= a.o.y;
        var g = e * a.o.x;
        e *= a.o.y;
        a.g.ka.x -= a.g.Ma * (f + g);
        a.g.ka.y -= a.g.Ma * (d + e);
        a.g.Aa -= a.g.nb * (b.i.x * d - b.i.y * f + c.i.x * e - c.i.y * g);
        a.i.ka.x += a.i.Ma * (f + g);
        a.i.ka.y += a.i.Ma * (d + e);
        a.i.Aa += a.i.nb * (b.j.x * d - b.j.y * f + c.j.x * e - c.j.y * g);
        b.g = 0;
        c.g = 0
    }
    function vx(a, b) {
        void 0 === b && (b = 0);
        for (var c = 0, d = 0; d < a.i; d++) {
            var e = a.g[d]
              , f = e.g
              , g = e.i
              , h = f.Jb * f.Ma
              , k = f.Jb * f.nb
              , l = g.Jb * g.Ma
              , m = g.Jb * g.nb
              , n = e
              , q = wx;
            Eo(0 < n.u);
            switch (n.type) {
            case 1:
                q.j(n);
                break;
            case 2:
                q.o(n);
                break;
            case 4:
                q.u(n)
            }
            n = wx.g;
            for (q = 0; q < e.u; q++) {
                var t = e.j[q]
                  , w = wx.Ea[q]
                  , p = wx.i[q]
                  , v = w.x - f.ha.c.x
                  , C = w.y - f.ha.c.y
                  , D = w.x - g.ha.c.x;
                w = w.y - g.ha.c.y;
                c = c < p ? c : p;
                p = -t.H * Do(b * (p + .005), -.2, 0);
                t = p * n.x;
                p *= n.y;
                f.ha.c.x -= h * t;
                f.ha.c.y -= h * p;
                f.ha.a -= k * (v * p - C * t);
                pw(f);
                g.ha.c.x += l * t;
                g.ha.c.y += l * p;
                g.ha.a += m * (D * p - w * t);
                pw(g)
            }
        }
        return -.0075 < c
    }
    var sx = new function() {
        this.g = Y(0, 0);
        this.Ea = [];
        for (var a = 0; 2 > a; a++)
            this.Ea[a] = Y(0, 0)
    }
      , wx = new ox;
    function xx() {
        this.g = [];
        this.i = []
    }
    xx.prototype.reset = function() {
        this.g = [];
        this.i = []
    }
    ;
    function yx(a, b) {
        this.O = a;
        this.o = b;
        this.j = [];
        this.v = [];
        this.u = [];
        this.i = [];
        this.g = [];
        this.H = new xx
    }
    r = yx.prototype;
    r.reset = function(a, b) {
        this.O = a;
        this.o = b
    }
    ;
    r.clear = function() {
        this.j = [];
        this.v = [];
        this.u = [];
        this.i = [];
        this.g = []
    }
    ;
    r.Cf = function(a, b) {
        for (var c = 0; c < this.v.length; c++) {
            var d = this.v[c];
            d.ka.x += a.g * (b.x + d.Ma * d.oa.x);
            d.ka.y += a.g * (b.y + d.Ma * d.oa.y);
            d.Aa += a.g * d.nb * d.Ka;
            go(d.ka, Do(1 - a.g * d.Ja, 0, 1));
            d.Aa *= Do(1 - a.g * d.Ba, 0, 1)
        }
    }
    ;
    r.Ff = function(a) {
        for (var b = this.o, c = 0; c < b.i; ++c) {
            var d = b.g[c], e = d.g, f = d.i, g = e.Ma, h = e.nb, k = f.Ma, l = f.nb, m = d.o.x, n = d.o.y, q = n, t = -m, w;
            if (a.v) {
                var p = d.u;
                for (w = 0; w < p; ++w) {
                    var v = d.j[w];
                    v.g *= a.u;
                    v.o *= a.u;
                    var C = v.g * m + v.o * q
                      , D = v.g * n + v.o * t;
                    e.Aa -= h * (v.i.x * D - v.i.y * C);
                    e.ka.x -= g * C;
                    e.ka.y -= g * D;
                    f.Aa += l * (v.j.x * D - v.j.y * C);
                    f.ka.x += k * C;
                    f.ka.y += k * D
                }
            } else
                for (p = d.u,
                w = 0; w < p; ++w)
                    e = d.j[w],
                    e.g = 0,
                    e.o = 0
        }
        for (b = 0; b < this.g.length; b++)
            this.g[b].j(a);
        for (b = 0; b < a.o; b++) {
            for (c = 0; c < this.g.length; c++)
                this.g[c].u(a);
            tx(this.o)
        }
        for (a = 0; a < this.g.length; a++)
            this.g[a].v();
        a = this.o;
        for (b = 0; b < a.i; ++b)
            for (c = a.g[b],
            d = c.ya,
            w = 0; w < c.u; ++w)
                p = d.Ea[w],
                e = c.j[w],
                p.oc = e.g,
                p.qc = e.o
    }
    ;
    r.Df = function(a) {
        for (var b = 0; b < this.u.length; ++b) {
            var c = this.u[b]
              , d = a.g * c.ka.x
              , e = a.g * c.ka.y;
            4 < d * d + e * e && (io(c.ka),
            c.ka.x = 2 * c.ka.x * a.i,
            c.ka.y = 2 * c.ka.y * a.i);
            d = a.g * c.Aa;
            d * d > Go && (c.Aa = 0 > c.Aa ? -Fo * a.i : Fo * a.i);
            c.ha.Fb.Ca(c.ha.c);
            c.ha.Sb = c.ha.a;
            c.ha.c.x += a.g * c.ka.x;
            c.ha.c.y += a.g * c.ka.y;
            c.ha.a += a.g * c.Aa;
            pw(c)
        }
    }
    ;
    r.Ef = function(a) {
        for (var b = 0; b < a.j; b++) {
            for (var c = vx(this.o, .2), d = !0, e = 0; e < this.g.length; e++) {
                var f = this.g[e].o(.2);
                d = d && f
            }
            if (c && d)
                break
        }
    }
    ;
    r.Ig = function(a) {
        for (var b = Number.MAX_VALUE, c = 0; c < this.u.length; c++) {
            var d = this.u[c];
            !d.wa || Math.abs(d.Aa) > Ho || 1E-4 < wo(d.ka, d.ka) ? b = d.O = 0 : (d.O += a.g,
            b = Math.min(b, d.O))
        }
        if (.5 <= b)
            for (a = 0; a < this.j.length; a++)
                nw(this.j[a], !1)
    }
    ;
    r.report = function(a) {
        if (null != this.O)
            for (var b = 0; b < this.i.length; ++b) {
                var c = a[b];
                this.H.reset();
                for (var d = 0; d < c.u; ++d)
                    this.H.g[d] = c.j[d].g,
                    this.H.i[d] = c.j[d].o
            }
    }
    ;
    function zx(a, b) {
        a.j.push(b);
        0 != b.getType() && (a.u.push(b),
        2 == b.getType() && a.v.push(b))
    }
    ;function Ax() {
        this.i = [];
        this.g = []
    }
    Ax.prototype.isEmpty = function() {
        return 0 === this.i.length && 0 === this.g.length
    }
    ;
    Ax.prototype.clear = function() {
        this.i = [];
        this.g = []
    }
    ;
    Ax.prototype.contains = function(a) {
        return 0 <= $a(this.i, a) || 0 <= $a(this.g, a)
    }
    ;
    Ax.prototype.oe = function() {
        for (var a = [], b = this.i.length - 1; 0 <= b; --b)
            a.push(this.i[b]);
        var c = this.g.length;
        for (b = 0; b < c; ++b)
            a.push(this.g[b]);
        return a
    }
    ;
    function Bx() {
        var a = Y(0, 0);
        this.g = new lx(this);
        this.u = new qx;
        this.v = this.i = !1;
        this.j = new Mv;
        this.tb = new Cv;
        this.Pb = null;
        this.oa = new Wv;
        this.Ba = a;
        this.V = 0;
        cp(this, new $o);
        this.o = new px;
        this.O = new px;
        this.H = new yx(this.g.i,this.u)
    }
    var Cx = 1 - 100 * Number.MIN_VALUE;
    function Dx(a, b) {
        a.g.i = b
    }
    function cp(a, b) {
        Eo(!a.i);
        b = new iw(b,a);
        a = a.j;
        var c = b.ya;
        null == a.g[c] && (Pv(a, b, c, Nv),
        Ov(a, b),
        b.H.push(a));
        return b
    }
    function oo(a, b) {
        Eo(!a.i);
        for (var c = b.Pb; c; ) {
            var d = c;
            c = c.next;
            var e = a;
            d = d.xc;
            var f = d.Kf;
            d.qe && (d.qe.zc = d.zc);
            d.zc && (d.zc.qe = d.qe);
            d == e.Pb && (e.Pb = d.zc);
            e = d.H;
            var g = d.O;
            nw(e, !0);
            nw(g, !0);
            d.g.jc && (d.g.jc.next = d.g.next);
            d.g.next && (d.g.next.jc = d.g.jc);
            d.g == e.Pb && (e.Pb = d.g.next);
            d.g.jc = null;
            d.g.next = null;
            d.i.jc && (d.i.jc.next = d.i.next);
            d.i.next && (d.i.next.jc = d.i.jc);
            d.i == g.Pb && (g.Pb = d.i.next);
            d.i.jc = null;
            d.i.next = null;
            if (!f)
                for (d = g.tb.Pa(Dv); d; d = d.Na())
                    bx(d.rb, g) == e && (d.rb.oa = !0)
        }
        for (c = b.Wa.Pa(); c; c = c.Na())
            c.controller.g(b);
        for (c = b.tb.Pa(Dv); c; c = c.Na())
            a.g.destroy(c.rb);
        for (c = b.o.Pa(); c; c = c.Na())
            Vu(b, c.kb);
        b.destroy();
        a = a.j;
        c = b.ya;
        if (null != a.g[c]) {
            bb(b.H, a);
            for (b = 0; b <= Nv; b++)
                Rv(a, c, b);
            delete a.g[c]
        }
    }
    function ks(a) {
        a.v && (lw(a.g),
        a.v = !1);
        a.i = !0;
        a.o.reset(.016, .016 * a.V, 10, 10, !0);
        for (var b = a.g, c = b.o.tb.Pa(Dv); c; c = c.Na()) {
            var d = c.rb
              , e = d.mb
              , f = d.hb
              , g = e.g
              , h = f.g;
            if (g.ac() || h.ac()) {
                if (d.oa) {
                    if (!qw(h, g)) {
                        b.destroy(d);
                        continue
                    }
                    if (!ww(e, f)) {
                        b.destroy(d);
                        continue
                    }
                    d.oa = !1
                }
                b.g.jd(e.i, f.i) ? d.update(b.i) : b.destroy(d)
            }
        }
        if (0 < a.o.g) {
            b = a.o;
            for (c = a.oa.Pa(); c; c = c.Na())
                c.controller.i(b);
            c = a.H;
            c.reset(a.g.i, a.u);
            for (d = a.j.Pa(Nv); d; d = d.Na())
                d.body.Qa = !1;
            for (f = a.tb.Pa(Dv); f; f = f.Na())
                f.rb.Qa = !1;
            for (d = a.Pb; d; d = d.zc)
                d.Qa = !1;
            for (d = a.j.Pa(Tv); d; d = d.Na())
                if (f = d.body,
                !f.Qa) {
                    c.clear();
                    e = [];
                    e.push(f);
                    for (f.Qa = !0; 0 < e.length; )
                        if (g = e.pop(),
                        zx(c, g),
                        g.ac() || nw(g, !0),
                        0 != g.getType()) {
                            for (f = g.tb.Pa(Hv); f; f = f.Na())
                                h = f.rb,
                                h.Qa || (c.i.push(h),
                                h.Qa = !0,
                                h = bx(h, g),
                                h.Qa || (e.push(h),
                                h.Qa = !0));
                            for (f = g.Pb; f; f = f.next)
                                !f.xc.Qa && f.Ub.isActive() && (c.g.push(f.xc),
                                f.xc.Qa = !0,
                                f.Ub.Qa || (e.push(f.Ub),
                                f.Ub.Qa = !0))
                        }
                    e = c;
                    f = b;
                    e.Cf(f, a.Ba);
                    rx(e.o, e.i, e.i.length);
                    e.Ff(f);
                    e.Df(f);
                    e.Ef(f);
                    e.report(e.o.g)
                }
            for (d = a.j.Pa(Tv); d; d = d.Na())
                mw(d.body);
            lw(a.g);
            b = a.o;
            c = a.H;
            c.reset(a.g.i, a.u);
            for (d = a.j.Pa(Nv); d; d = d.Na())
                f = d.body,
                f.Qa = !1,
                f.ha.vb = 0;
            for (g = a.tb.Pa(Dv); g; g = g.Na())
                g.rb.Qa = !1,
                g.rb.o = null;
            for (d = a.Pb; d; d = d.zc)
                d.Qa = !1;
            for (; ; ) {
                d = a.ya(b);
                e = d.Lf;
                d = d.Mf;
                if (null === e || Cx < d)
                    break;
                g = e.mb.g;
                f = e.hb.g;
                Ex.set(g.ha);
                Fx.set(f.ha);
                g.advance(d);
                f.advance(d);
                e.update(a.g.i);
                e.o = null;
                if (e.ya || !e.H)
                    g.ha.set(Ex),
                    f.ha.set(Fx),
                    pw(g),
                    pw(f);
                else if (e.u) {
                    2 != g.getType() && (g = f);
                    c.clear();
                    e = new Ax;
                    e.g.push(g);
                    for (g.Qa = !0; 0 < e.i.length + e.g.length; )
                        if (g = f = e,
                        0 === g.i.length && (g.i = g.g,
                        g.i.reverse(),
                        g.g = []),
                        f = f.i.pop(),
                        zx(c, f),
                        f.ac() || nw(f, !0),
                        2 == f.getType()) {
                            for (g = f.tb.Pa(Hv); g && 32 != c.i.length; g = g.Na())
                                h = g.rb,
                                h.Qa || (c.i.push(h),
                                h.Qa = !0,
                                h = bx(h, f),
                                h.Qa || (0 != h.getType() && (h.advance(d),
                                nw(h, !0),
                                e.g.push(h)),
                                h.Qa = !0));
                            for (f = f.Pb; f; f = f.next)
                                32 != c.g.length && !f.xc.Qa && f.Ub.isActive() && (c.g.push(f.xc),
                                f.xc.Qa = !0,
                                f.Ub.Qa || (0 != f.Ub.getType() && (f.Ub.advance(d),
                                nw(f.Ub, !0),
                                e.g.push(f.Ub)),
                                f.Ub.Qa = !0))
                        }
                    a.O.reset((1 - d) * b.g, 0, b.o, b.j, !1);
                    e = c;
                    f = a.O;
                    rx(e.o, e.i, e.i.length);
                    g = e.o;
                    for (d = 0; d < e.g.length; ++d)
                        e.g[d].j(f);
                    for (d = 0; d < f.o; ++d)
                        for (tx(g),
                        h = 0; h < e.g.length; ++h)
                            e.g[h].u(f);
                    for (d = 0; d < e.u.length; ++d) {
                        h = e.u[d];
                        var k = f.g * h.ka.x
                          , l = f.g * h.ka.y;
                        4 < k * k + l * l && (io(h.ka),
                        h.ka.x = 2 * h.ka.x * f.i,
                        h.ka.y = 2 * h.ka.y * f.i);
                        k = f.g * h.Aa;
                        k * k > Go && (h.Aa = 0 > h.Aa ? -Fo * f.i : Fo * f.i);
                        h.ha.Fb.Ca(h.ha.c);
                        h.ha.Sb = h.ha.a;
                        h.ha.c.x += f.g * h.ka.x;
                        h.ha.c.y += f.g * h.ka.y;
                        h.ha.a += f.g * h.Aa;
                        pw(h)
                    }
                    for (d = 0; d < f.j; ++d) {
                        k = vx(g, .75);
                        l = !0;
                        for (h = 0; h < e.g.length; ++h) {
                            var m = e.g[h].o(.2);
                            l = l && m
                        }
                        if (k && l)
                            break
                    }
                    e.report(g.g);
                    for (d = 0; d < c.j.length; d++)
                        if (c.j[d].Qa = !1,
                        c.j[d].ac() && 2 == c.j[d].getType())
                            for (mw(c.j[d]),
                            g = c.j[d].tb.Pa(Dv); g; g = g.Na())
                                g.rb.o = null;
                    for (d = 0; d < c.i.length; d++)
                        c.i[d].Qa = !1,
                        c.i[d].o = null;
                    for (d = 0; d < c.g.length; d++)
                        c.g[d].Qa = !1;
                    lw(a.g)
                }
            }
            a.V = a.o.i
        }
        a.i = !1
    }
    Bx.prototype.ya = function(a) {
        for (var b = null, c = 1, d = this.tb.Pa(Jv); d; d = d.Na()) {
            var e = d.rb;
            if (!this.wa(a, e)) {
                if (null != e.o)
                    var f = e.o;
                else {
                    if (e.u)
                        f = 1;
                    else {
                        var g = e.mb.g
                          , h = e.hb.g
                          , k = g.ha.vb;
                        g.ha.vb < h.ha.vb ? (k = h.ha.vb,
                        g.ha.advance(k)) : h.ha.vb < g.ha.vb && (k = g.ha.vb,
                        h.ha.advance(k));
                        f = e;
                        g = g.ha;
                        h = h.ha;
                        cx.g.set(f.mb.Va);
                        cx.i.set(f.hb.Va);
                        cx.j = g;
                        cx.o = h;
                        cx.u = .005;
                        var l = cx;
                        Sw++;
                        f = l.g;
                        h = l.i;
                        g = l.j;
                        var m = l.o;
                        Eo(g.vb == m.vb);
                        Eo(1 - g.vb > Number.MIN_VALUE);
                        var n = f.i + h.i;
                        l = l.u;
                        var q = 0
                          , t = 0
                          , w = 0;
                        Vw.count = 0;
                        for (Ww.u = !1; ; ) {
                            zv(g, Qw, q);
                            zv(m, Rw, q);
                            Ww.g = f;
                            Ww.i = h;
                            Ww.j = Qw;
                            Ww.o = Rw;
                            Mo(Xw, Vw, Ww);
                            if (0 >= Xw.j) {
                                q = 1;
                                break
                            }
                            var p = h;
                            var v = Pw;
                            var C = Vw;
                            var D = Qw;
                            var x = Rw;
                            v.i = f;
                            v.j = p;
                            p = C.count;
                            Eo(0 < p && 3 > p);
                            if (1 == p) {
                                v.o = 1;
                                var J = No(v.i, C.Ya[0]);
                                C = No(v.j, C.Za[0]);
                                p = J;
                                var B = D.R;
                                J = D.position.x + (B.T.x * p.x + B.U.x * p.y);
                                D = D.position.y + (B.T.y * p.x + B.U.y * p.y);
                                p = C;
                                B = x.R;
                                C = x.position.x + (B.T.x * p.x + B.U.x * p.y);
                                x = x.position.y + (B.T.y * p.x + B.U.y * p.y);
                                v.g.x = C - J;
                                v.g.y = x - D;
                                io(v.g)
                            } else if (C.Za[0] == C.Za[1]) {
                                v.o = 2;
                                var I = No(v.i, C.Ya[0]);
                                var y = No(v.i, C.Ya[1]);
                                C = No(v.j, C.Za[0]);
                                v.Fa.x = .5 * (I.x + y.x);
                                v.Fa.y = .5 * (I.y + y.y);
                                var z = Co(y, I);
                                Z(v.g);
                                v.g = yo(z);
                                Z(z);
                                io(v.g);
                                p = v.g;
                                B = D.R;
                                I = B.T.x * p.x + B.U.x * p.y;
                                y = B.T.y * p.x + B.U.y * p.y;
                                p = v.Fa;
                                B = D.R;
                                J = D.position.x + (B.T.x * p.x + B.U.x * p.y);
                                D = D.position.y + (B.T.y * p.x + B.U.y * p.y);
                                p = C;
                                B = x.R;
                                C = x.position.x + (B.T.x * p.x + B.U.x * p.y);
                                x = x.position.y + (B.T.y * p.x + B.U.y * p.y);
                                0 > (C - J) * I + (x - D) * y && eo(v.g)
                            } else if (C.Ya[0] == C.Ya[0])
                                v.o = 4,
                                B = No(v.j, C.Za[0]),
                                p = No(v.j, C.Za[1]),
                                J = No(v.i, C.Ya[0]),
                                v.Fa.x = .5 * (B.x + p.x),
                                v.Fa.y = .5 * (B.y + p.y),
                                z = Co(p, B),
                                Z(v.g),
                                v.g = yo(z),
                                Z(z),
                                io(v.g),
                                p = v.g,
                                B = x.R,
                                I = B.T.x * p.x + B.U.x * p.y,
                                y = B.T.y * p.x + B.U.y * p.y,
                                p = v.Fa,
                                B = x.R,
                                C = x.position.x + (B.T.x * p.x + B.U.x * p.y),
                                x = x.position.y + (B.T.y * p.x + B.U.y * p.y),
                                p = J,
                                B = D.R,
                                J = D.position.x + (B.T.x * p.x + B.U.x * p.y),
                                D = D.position.y + (B.T.y * p.x + B.U.y * p.y),
                                0 > (J - C) * I + (D - x) * y && eo(v.g);
                            else {
                                I = No(v.i, C.Ya[0]);
                                y = No(v.i, C.Ya[1]);
                                B = No(v.j, C.Za[0]);
                                p = No(v.j, C.Za[1]);
                                z = Co(y, I);
                                var U = zo(D.R, z);
                                Z(z);
                                z = Co(p, B);
                                x = zo(x.R, z);
                                Z(z);
                                D = U.x * U.x + U.y * U.y;
                                J = x.x * x.x + x.y * x.y;
                                var pa = Co(x, U);
                                C = U.x * pa.x + U.y * pa.y;
                                z = x.x * pa.x + x.y * pa.y;
                                Z(pa);
                                U = U.x * x.x + U.y * x.y;
                                pa = D * J - U * U;
                                x = 0;
                                0 != pa && (x = Do((U * z - C * J) / pa, 0, 1));
                                0 > (U * x + z) / J && (x = Do((U - C) / D, 0, 1));
                                J = Y(0, 0);
                                J.x = I.x + x * (y.x - I.x);
                                J.y = I.y + x * (y.y - I.y);
                                C = Y(0, 0);
                                C.x = B.x + x * (p.x - B.x);
                                C.y = B.y + x * (p.y - B.y);
                                0 == x || 1 == x ? (v.o = 4,
                                z = Co(p, B),
                                Z(v.g),
                                v.g = yo(z),
                                Z(z),
                                io(v.g),
                                v.Fa = C) : (v.o = 2,
                                z = Co(y, I),
                                Z(v.g),
                                v.g = yo(z),
                                Z(z),
                                v.Fa = J);
                                0 > x && eo(v.g);
                                Z(J);
                                Z(C)
                            }
                            y = Ow();
                            if (0 >= y) {
                                q = 1;
                                break
                            }
                            0 == t && (w = y > n ? Math.max(n - l, .75 * n) : Math.max(y - l, .02 * n));
                            if (y - w < .5 * l) {
                                if (0 == t) {
                                    q = 1;
                                    break
                                }
                                break
                            }
                            p = v = q;
                            B = 1;
                            zv(g, Qw, B);
                            zv(m, Rw, B);
                            I = Ow();
                            if (I >= w) {
                                q = 1;
                                break
                            }
                            for (x = 0; ; ) {
                                D = x & 1 ? p + (w - y) * (B - p) / (I - y) : .5 * (p + B);
                                zv(g, Qw, D);
                                zv(m, Rw, D);
                                J = Ow();
                                if (Math.abs(J - w) < .025 * l) {
                                    v = D;
                                    break
                                }
                                J > w ? (p = D,
                                y = J) : (B = D,
                                I = J);
                                x++;
                                Uw++;
                                if (50 == x)
                                    break
                            }
                            if (v < (1 + 100 * Number.MIN_VALUE) * q)
                                break;
                            q = v;
                            t++;
                            Tw++;
                            if (1E3 == t)
                                break
                        }
                        f = q;
                        Eo(0 <= f && 1 >= f);
                        0 < f && 1 > f && (f = (1 - f) * k + f)
                    }
                    e.o = f
                }
                Number.MIN_VALUE < f && f < c && (b = e,
                c = f)
            }
        }
        return {
            Lf: b,
            Mf: c
        }
    }
    ;
    Bx.prototype.wa = function(a, b) {
        a = b.mb.g;
        b = b.hb.g;
        return 2 == a.getType() && a.ac() || 2 == b.getType() && b.ac() ? !1 : !0
    }
    ;
    Bx.prototype.drawShape = function(a, b, c) {
        if (a instanceof zu) {
            var d = Bo(b, a.g);
            null.Xg(d, a.j, b.R.T, c);
            Z(d)
        } else if (a instanceof Wo) {
            d = a.o;
            var e = a.g
              , f = [];
            for (a = 0; a < d; a++)
                f[a] = Bo(b, e[a]);
            null.Yg(f, d, c);
            for (a = 0; a < d; a++)
                Z(f[a])
        }
    }
    ;
    new Vo;
    var Ex = new yv
      , Fx = new yv;
    function Sr(a, b) {
        for (const c of a.Oa)
            if (Fd(c, 1) === b)
                return H(c, 2, 0);
        return 0
    }
    function iv(a, b) {
        a = a.settings.get(b);
        return "false" === a ? !1 : a
    }
    function Gx(a) {
        const b = new tv;
        b.Je = c => {
            var d = c.mb.g
              , e = c.hb.g;
            c = d.df || e.df;
            var f = d.Ie || e.Ie
              , g = d.Me || e.Me;
            d = d.kf || e.kf;
            if (c && f && c.i)
                a.Kb && (xs(c),
                $s(a.wa),
                a.yb());
            else if (c && g)
                a: {
                    d = g.i && c && g.i.Sa === c.Sa;
                    if (f = g.isVisible() && g.i !== c) {
                        if (f = ko(g, "use_ally_candle_bonus") && d) {
                            f = Number.MAX_VALUE;
                            e = c.g;
                            for (var h of c.yb.u.values())
                                if (h.Sa === c.Sa) {
                                    var k = h.g
                                      , l = k.x - e.x;
                                    k = k.y - e.y;
                                    l = l * l + k * k;
                                    l < f && (f = l)
                                }
                            f = 400 <= f
                        }
                        f = !f && ko(g, "use_collectible_stealing") && Ed(g.state, 2) && !d
                    }
                    if (f && (h = +ko(g, "max_collectibles_held"),
                    !(-1 !== h && c.j.length >= h))) {
                        if (g.i) {
                            if (0 < g.i.Ka)
                                break a;
                            h = g.i;
                            h = h.j.splice(h.j.indexOf(g), 1);
                            g = g.i;
                            Tu(g);
                            ns(g, -1);
                            ws(g, 2);
                            ns(c, 1);
                            ws(c, 1)
                        } else
                            h = [g];
                        for (const m of h)
                            m.Mc(c),
                            0 <= c.j.indexOf(m) ? console.error("adding a collectible that is already in the list") : Uu(c, 3) ? c.j.unshift(m) : c.j.push(m),
                            g = c.Sa,
                            1 === g ? Yq(m, 2) : 2 === g && Yq(m, 3);
                        Tu(c)
                    }
                }
            else
                c && d && a.Nb(c, d)
        }
        ;
        b.g = () => {}
        ;
        return b
    }
    function Hx(a) {
        return !!(a.i && a.i.ya && a.j && a.j.H.g)
    }
    function Ix(a, b, c, d, e) {
        const f = new en;
        dn(f, a.g.Ba++);
        F(f, 2, d);
        zd(f, 3, e.x);
        zd(f, 4, e.y);
        e = new cn;
        F(e, 2, c);
        F(e, 3, b);
        Bd(e, 4, !1);
        yd(f, 6, e);
        b = new wn;
        F(b, 2, d);
        d = new vn;
        zd(d, 1, 0);
        c = iv(a, "player_base_speed");
        zd(d, 2, c);
        c = iv(a, "player_vision_radius");
        Cd(d, 3, c);
        Cd(d, 6, 0);
        Bd(d, 8, !0);
        yd(b, 3, d);
        d = new Wn;
        yd(d, 1, f);
        yd(d, 2, b);
        return wq(a, d)
    }
    function Jx(a) {
        const b = Ix(a, 1, 1, 1, a.i.v);
        var c = b.getId();
        uq(a.g, c);
        return b
    }
    function Kx(a) {
        return Ix(a, 5, 2, 2, a.i.u)
    }
    function wq(a, b) {
        let c = xq(a.g, G(b, en, 1).getId());
        c || (c = Lx(a, b)) && js(a.g, c);
        var d = G(b, wn, 2)
          , e = c.getId();
        Cd(d, 1, e);
        b = G(b, wn, 2);
        yq(a.g, b);
        return c
    }
    function Mx(a) {
        a.Ba = new pv;
        return a.Ba
    }
    function Nx(a, b) {
        a.i = new wu(a.O,a.g,a.settings,b,a.Da,a.v);
        a.j = a.v || !a.i.map.g.properties.outside ? R.wd : R.Qd;
        a.j.H.preload();
        S.rd.preload();
        S.Oc.preload()
    }
    function zq(a, b) {
        for (const c of b)
            switch (b = Hd(c, 1),
            td(c, Ln)) {
            case 2:
                a.settings.set(b, Hd(c, sd(c, Ln, 2)));
                break;
            case 3:
                a.settings.set(b, Gd(c, sd(c, Ln, 3)));
                break;
            case 4:
                a.settings.set(b, Ed(c, sd(c, Ln, 4)))
            }
    }
    function Lx(a, b) {
        switch (H(G(b, en, 1), 2, 0)) {
        case 1:
        case 2:
            return new $u(a.O,a.settings,G(b, en, 1),a.g,a.v);
        case 16:
            return new ar(a.O,a.settings,G(b, en, 1),a.g);
        case 4:
            return new fp(a.O,a.settings,G(b, en, 1),a.g);
        case 32:
            return new Cu(a.O,a.settings,G(b, en, 1),a.g);
        case 2048:
            return new cv(a.O,a.settings,G(b, en, 1),a.g)
        }
    }
    function Ox(a, b) {
        if (!a.Ja)
            if (Hx(a))
                a.Ja = !0,
                Qp(a.onReady);
            else
                return;
        Du || (a.Lb.v = performance.now());
        const c = a.o;
        a.V.update(b);
        a.g.ya(b);
        a.o -= b;
        if (!a.v && 21E3 >= a.o && a.H && !a.Mb) {
            if (b = a.g.g) {
                var d = zl.width / 2 + zl.left;
                const e = .3 * zl.height + zl.top;
                d = new Mu(T("time_warning"),ko(b, "time_warning_duration_ms"),d,e);
                os(b, d);
                a.j.stop();
                a.j = R.rd;
                a.j.play()
            }
            a.Mb = !0
        }
        !a.v && 1E3 > a.o && 1E3 <= c && a.H && R.Ce.play()
    }
    function Px(a) {
        const b = () => {
            a.O.g();
            setTimeout(b, iv(a, "client_broadcast_timeout"))
        }
        ;
        b()
    }
    function Qx(a) {
        a.j && (a.v ? xl(a.j, 14769) : a.i.map.g.properties.outside ? xl(a.j, 3503) : xl(a.j, 14769))
    }
    function Rx(a) {
        a.j && (a = a.j,
        rk(a),
        a.i && a.g && (a.i.gain.setValueAtTime(a.i.gain.value, a.g.currentTime),
        a.i.gain.exponentialRampToValueAtTime(.01, a.g.currentTime + 3)))
    }
    var Sx = class extends yi {
        constructor(a, b, c, d, e, f) {
            super();
            this.O = a;
            this.wa = b;
            this.v = d;
            this.yb = e;
            this.Nb = f;
            this.V = new nv;
            this.Da = new Bx;
            this.Kb = !1;
            this.i = null;
            this.Xa = this.Wa = 0;
            this.settings = new sv;
            this.qb = -1;
            this.o = 0;
            this.Eb = this.H = !1;
            this.Ka = null;
            this.Oa = [];
            this.Mb = !1;
            this.Ba = null;
            this.u = 1;
            this.j = null;
            this.Ab = !1;
            this.onReady = Np();
            this.Ja = !1;
            zi(this, qa(xi, this.V));
            $s(this.wa);
            d && Dx(this.Da, Gx(this));
            this.g = new Bs(this.Da,b);
            gs(this.g, g => {
                gv(this.V.j, g)
            }
            );
            this.Lb = new Eu( () => {
                if (this.V) {
                    var g = this.V.j;
                    for (const h of g.i.keys())
                        gv(g, h)
                }
            }
            );
            c.reset();
            this.V.gamepad = c
        }
        ub() {
            super.ub();
            this.j && (this.j.stop(),
            sk(this.j, 1));
            this.i = null
        }
        update(a) {
            Ed(a, 6) && !this.H && (Zs(this.wa),
            this.H = !0,
            Jk(15));
            this.o = 1E3 * Fd(a, 3);
            this.Wa = Fd(a, 4);
            this.Xa = Fd(a, 5);
            Ed(a, 7) && !this.Eb && (Jk(16),
            this.Eb = !0,
            this.Ka = H(a, 8, 0),
            this.Oa = xd(a, Pn, 10),
            this.yb())
        }
        render(a, b) {
            this.V.render(this, a, b);
            a = this.Lb;
            if (!Du) {
                b = performance.now() - a.v;
                var c = a.u++ % a.g;
                a.i -= a.j[c];
                a.i += b;
                a.j[c] = b;
                !(a.u < 3 * a.g) && a.i / a.g > a.H && (Du = !0,
                Hk(104),
                a.o && a.o())
            }
        }
        wake() {
            this.g.wake()
        }
    }
    ;
    function Tx(a) {
        a.g ? a.g = !1 : (requestAnimationFrame( () => {
            Tx(a)
        }
        ),
        a.loop(Date.now()))
    }
    function Ux(a) {
        a.i && (a.i = !1,
        a.g = !0)
    }
    var Vx = class {
        constructor(a) {
            this.onLoop = a;
            this.j = 0;
            this.g = this.i = !1
        }
        start() {
            this.j = Date.now();
            const a = !this.g && !this.i;
            this.g = !1;
            this.i = !0;
            a && Tx(this)
        }
        loop(a) {
            var b = a - this.j;
            0 > b || (b = Math.min(b, 50),
            this.j = a,
            this.onLoop(b))
        }
    }
    ;
    let Wx;
    const Xx = {
        Bg: "resizeComplete",
        lg: "hibernate",
        Fg: "wake"
    };
    function Yx(a, b) {
        var c = Wx;
        return u(function*() {
            if (!c.o.hd || c.i)
                return Promise.resolve();
            c.i = !0;
            const d = Np()
              , e = Qi(c.g, "resizeComplete", () => {
                Qp(d)
            }
            );
            window.parent.postMessage({
                cmd: "resizeDoodle",
                width: `${Math.floor(a)}px`,
                height: `${Math.floor(b)}px`,
                duration: "150ms",
                preserveAspectRatio: !0
            }, "*");
            Sp(d);
            try {
                yield d.promise
            } catch (f) {}
            Zi(e);
            c.i = !1
        })
    }
    var $x = class {
        constructor() {
            var a = new URLSearchParams(window.location.search);
            this.i = !1;
            this.j = l => {
                Object.values(Xx).includes(l.data.cmd) && this.g.dispatchEvent(new CustomEvent(l.data.cmd,l.data))
            }
            ;
            var b;
            const c = (null == (b = a.get("hl")) ? void 0 : b.toLowerCase()) || "en";
            var d;
            b = (null == (d = a.get("gl")) ? void 0 : d.toLowerCase()) || "us";
            var e;
            d = Zx(null != (e = a.get("cta")) ? e : "");
            e = "1" === a.get("se");
            var f;
            const g = null != (f = a.get("ved")) ? f : void 0;
            let h;
            f = null != (h = a.get("sved")) ? h : void 0;
            let k;
            a = null != (k = a.get("ei")) ? k : void 0;
            this.o = {
                hl: c,
                gl: b,
                hd: e,
                Ng: d,
                Wg: g,
                Vg: f,
                Og: a
            };
            this.g = document.createElement("div");
            window.addEventListener("message", this.j)
        }
        destroy() {
            window.removeEventListener("message", this.j);
            var a = this.g;
            if (a)
                if (Fi(a))
                    a.removeAllListeners(void 0);
                else if (a = Ui(a)) {
                    var b = 0, c;
                    for (c in a.g)
                        for (var d = a.g[c].concat(), e = 0; e < d.length; ++e)
                            Zi(d[e]) && ++b
                }
        }
    }
    ;
    function Zx(a) {
        switch (a) {
        case "a":
            return 1;
        case "s":
            return 0;
        default:
            return 2
        }
    }
    ;function ay(a) {
        return 3 * a * a - 2 * a * a * a
    }
    ;function by(a, b= () => {}
    ) {
        return new cy(a,b)
    }
    function dy(a, b, c) {
        return u(function*() {
            yield ey(a);
            Wx || (Wx = new $x);
            yield Yx(b, c);
            a.j && a.ta.classList.remove("expanderHide")
        })
    }
    function fy(a, b, c) {
        if (!a.ta || !yk() || a.i)
            return Promise.resolve();
        const d = a.ta;
        if (Tf() || Sf())
            return dy(a, b, c);
        document.getElementById("fkbx") && pg(d.parentElement, "width", "100%");
        const e = Math.min(b, d.parentElement.clientWidth);
        let f = performance.now();
        const g = new Um({
            height: d.offsetHeight,
            width: d.offsetWidth
        },{
            height: e / (b / c),
            width: e
        },400,ay, () => f);
        g.start();
        a.i = !0;
        const h = new Vx(k => a.g(k));
        return new Promise(k => {
            a.g = l => {
                f = void 0 !== l ? f + l : performance.now();
                l = zm(g);
                Lg(d, Math.round(l.width), Math.round(l.height));
                a.o();
                return Am(g) ? (Ux(h),
                k(),
                a.ta.style.willChange = "unset",
                a.g = () => !1,
                !1) : !0
            }
        }
        )
    }
    function ey(a) {
        if (!a.j)
            return Promise.resolve();
        a.ta.classList.add("expanderHide");
        return new Promise(b => {
            setTimeout(b, 200)
        }
        )
    }
    var cy = class {
        constructor(a, b= () => {}
        ) {
            this.o = b;
            this.i = !1;
            this.j = "1" === Mf.g.get("ntp");
            this.g = () => !1;
            this.ta = a;
            yk() && (this.ta.style.willChange = "width,height")
        }
        reset() {
            this.i && (pg(this.ta, "width", "", "height", ""),
            Kg(0),
            this.ta.style.width = "",
            this.ta.style.height = "");
            this.i = !1
        }
        update(a) {
            this.g(a)
        }
    }
    ;
    var gy = class {
        constructor(a) {
            this.g = () => {
                N.style.background = "#000";
                a()
            }
            ;
            this.j = 2 === H(Lq().g, 1, 1);
            this.state = 1;
            this.i = new Um({
                alpha: 0
            },{
                alpha: 1
            },400)
        }
        Kc(a) {
            Hk(a ? 102 : 101);
            Ug.removeAttribute("title");
            this.state = 2;
            this.i.start();
            this.g();
            window !== window.parent && window.focus()
        }
        render() {}
    }
    ;
    lh.Ua();
    function hy(a, b) {
        window.clearTimeout(a.Cc);
        iy(a, !1);
        $s(a.mc);
        a.gamepad.alpha = 1;
        a.Pc(b)
    }
    function jy(a) {
        const b = a.match.i.g.get(1)
          , c = a.match.i.g.get(2);
        a.match.u = 0;
        a.j.Xa = !0;
        a.actions.push(new Cm([new Dm([new W(new X({
            brightness: 0
        },{
            brightness: 1
        },1E3,Mm),d => {
            a.Ka = d.brightness
        }
        ), new W(new X({
            x: b.x,
            y: b.y
        },{
            x: c.x,
            y: c.y
        },3500,Mm),d => {
            var e = a.i
              , f = d.y;
            e.x = d.x;
            e.y = f
        }
        )]), new Bm(700), new ym( () => {
            ov(a.i, !0);
            a.g = new ky(fi,T("tutorial_1"),1);
            a.u.push(a.g);
            R.Ce.play()
        }
        ), new Bm(3E3), new ym( () => {
            a.g.o = !0;
            ov(a.i, !1);
            a.j.Xa = !1
        }
        ), new W(new X({
            brightness: 0
        },{
            brightness: 1
        },1E3,Mm),d => {
            a.match.u = d.brightness
        }
        ), new Bm(1E3), new ym( () => {
            ov(a.i, !0);
            a.g = new ky(di,T(Qf() ? "tutorial_2_mobile" : "tutorial_2_desktop"),2);
            a.u.push(a.g)
        }
        ), new Bm(750), new W(new X({
            alpha: 0
        },{
            alpha: 1
        },250,Mm),d => {
            a.gamepad.alpha = d.alpha
        }
        ), new ym( () => {
            ly(a)
        }
        )]))
    }
    function ly(a) {
        a.Da = !0;
        document.activeElement && document.activeElement.blur()
    }
    function my(a, b, c) {
        const d = new Gn;
        var e = a.getId();
        Cd(d, 1, e);
        zd(d, 2, b);
        zd(d, 3, c);
        Bd(d, 4, 0 !== b || 0 !== c);
        a.o = d
    }
    function ny(a) {
        const b = a.match.i.g.get(2)
          , c = a.match.i.g.get(3);
        a.actions.push(new Cm([new ym( () => {
            a.g.o = !0;
            ov(a.i, !1);
            a.Ec = !0
        }
        ), new Bm(1250), new W(new X({
            alpha: 1
        },{
            alpha: 0
        },250,Om),d => {
            a.gamepad.alpha = d.alpha
        }
        ), new ym( () => {
            a.Da = !1;
            my(a.j, 0, 0);
            su(a.match.i, 1)
        }
        ), new W(new X({
            x: b.x,
            y: b.y
        },{
            x: c.x,
            y: c.y
        },333,Mm),d => {
            var e = a.i
              , f = d.y;
            e.x = d.x;
            e.y = f
        }
        ), new ym( () => {
            a.g = new ky(ai,T("tutorial_3"),1);
            a.u.push(a.g);
            ov(a.i, !0)
        }
        ), new Bm(750), new W(new X({
            alpha: 0
        },{
            alpha: 1
        },250,Mm),d => {
            a.gamepad.alpha = d.alpha
        }
        ), new ym( () => {
            ly(a)
        }
        )]))
    }
    function oy(a) {
        const b = a.match.i.g.get(3)
          , c = a.match.i.g.get(4);
        a.actions.push(new Cm([new ym( () => {
            a.Dc = !0
        }
        ), new W(new X({
            x: b.x,
            y: b.y
        },{
            x: c.x,
            y: c.y
        },2E3,Mm),d => {
            var e = a.i
              , f = d.y;
            e.x = d.x;
            e.y = f
        }
        )]))
    }
    function py(a) {
        const b = a.match.i.g.get(4)
          , c = a.match.i.g.get(5);
        a.actions.push(new Cm([new ym( () => {
            a.Da = !1;
            my(a.j, 0, 0);
            a.g.o = !0;
            a.Oa = !0;
            a.j.Zb = !1;
            tu(a.match.i, 2)
        }
        ), new Dm([new W(new X({
            alpha: 1
        },{
            alpha: 0
        },250,Om),d => {
            a.gamepad.alpha = d.alpha
        }
        ), new W(new X({
            x: b.x,
            y: b.y
        },{
            x: c.x,
            y: c.y
        },1E3,Mm),d => {
            var e = a.i
              , f = d.y;
            e.x = d.x;
            e.y = f
        }
        )]), new ym( () => {
            a.g = new ky(ei,T("tutorial_4"),1);
            a.u.push(a.g);
            ov(a.i, !0)
        }
        ), new Bm(750), new W(new X({
            alpha: 0
        },{
            alpha: 1
        },250,Mm),d => {
            a.gamepad.alpha = d.alpha
        }
        ), new ym( () => {
            ly(a)
        }
        )]))
    }
    function qy(a) {
        const b = a.match.i.g.get(5)
          , c = a.match.i.g.get(6);
        a.actions.push(new Cm([new ym( () => {
            a.g.o = !0;
            ov(a.i, !1);
            a.qb = !0;
            a.j.Zb = !0;
            su(a.match.i, 2);
            a.match.Kb = !0
        }
        ), new ym( () => {
            a.g = new ky(bi,T("tutorial_5"),2);
            a.u.push(a.g);
            ov(a.i, !0)
        }
        ), new W(new X({
            x: b.x,
            y: b.y
        },{
            x: c.x,
            y: c.y
        },4E3,Mm),d => {
            var e = a.i
              , f = d.y;
            e.x = d.x;
            e.y = f
        }
        )]))
    }
    function iy(a, b) {
        ry(a, b);
        sy(a, b)
    }
    function ty(a, b) {
        iy(a, !b);
        b ? (uy(a, a.Nb, c => {
            "mouseup" === c && (ty(a, !1),
            Hk(106),
            hy(a, !0))
        }
        ),
        uy(a, a.Ab, c => {
            "mouseup" === c && ty(a, !1)
        }
        ),
        uy(a, a.Kb, c => {
            "mouseup" === c && ty(a, !1)
        }
        )) : (bs(a.v, a.Nb),
        bs(a.v, a.Ab),
        bs(a.v, a.Kb));
        a.Mb = b
    }
    function vy(a, b) {
        a.j.Re = a.Da && !a.Mb;
        Ox(a.match, b);
        if (Hx(a.match)) {
            a.Xa = Math.max(a.Xa, a.o.j.length);
            var c;
            if (c = !a.Ec)
                c = a.mc,
                c = c.H || c.o;
            c && zs(a.j) && ny(a);
            !a.Dc && !a.Oa && 0 < a.j.j.length && oy(a);
            !a.Oa && 0 < a.o.j.length && py(a);
            !a.qb && a.o.j.length < a.Xa && 5 <= a.j.j.length && qy(a);
            a.H.update(b);
            a.qb && 0 === a.o.j.length && null === a.H.g && a.H.start();
            null !== a.H.g && (c = zm(a.H).alpha,
            a.o.alpha = c);
            Am(a.H) && a.o.ya();
            if (a.Wa) {
                if (0 <= a.V) {
                    c = 36 * Math.PI;
                    var d = 2 * iv(a.match, "player_base_speed");
                    a.V += b;
                    c = 2 * -(a.V / 1E3 / (c / d)) * Math.PI + 1.5 * Math.PI;
                    d = a.o.g;
                    my(a.o, a.Wa.x + 18 * Math.cos(c) - d.x, a.Wa.y - 18 * Math.sin(c) - d.y)
                }
                if (a.Zb) {
                    c = a.j;
                    const [g,h] = Yu(c);
                    d = g;
                    var e = h;
                    let k = !0;
                    .1 > d && .1 > e && (e = d = 0,
                    k = !1);
                    const l = new Gn;
                    var f = c.getId();
                    Cd(l, 1, f);
                    zd(l, 2, d);
                    zd(l, 3, e);
                    Bd(l, 4, k);
                    c.o = l
                }
                for (c = 0; c < a.u.length; c++)
                    d = a.u[c],
                    d.update(b),
                    d.u() && a.u.splice(c--, 1);
                for (c = 0; c < a.actions.length; c++)
                    d = a.actions[c],
                    d.update(b),
                    d.g() && a.actions.splice(c--, 1)
            }
        }
    }
    function uy(a, b, c) {
        um(a.v, b, c);
        vm(a.v, b)
    }
    function ry(a, b) {
        a.Fc && a.wa && (b ? uy(a, a.wa, c => {
            "mouseup" === c && (Hk(105),
            ty(a, !0))
        }
        ) : bs(a.v, a.wa))
    }
    function sy(a, b) {
        a.Ja && (b ? uy(a, a.Ja, c => {
            "mouseup" === c && (Hk(107),
            hy(a, !1))
        }
        ) : bs(a.v, a.Ja))
    }
    var wy = class extends yi {
        constructor(a, b, c, d, e) {
            super();
            this.mc = a;
            this.v = b;
            this.gamepad = c;
            this.Pc = e;
            this.Ec = !1;
            this.yb = new Set;
            this.V = -1;
            this.Xa = 0;
            this.Zb = this.qb = this.Oa = this.Dc = !1;
            this.u = [];
            this.actions = [];
            this.Cc = 0;
            this.O = this.Ja = this.Ba = this.wa = null;
            this.Mb = !1;
            this.Ka = 0;
            this.g = null;
            this.gamepad.alpha = 0;
            this.Fc = !Zg && 2 !== H(Lq().g, 1, 1);
            this.Qc = T("host_private_match");
            this.Rc = T("skip_tutorial");
            this.Lb = new mr("host_private_match_dialog",36,.8 * Zh[3],2);
            this.Lb.g = "#000";
            this.Wb = new mr("host_private_match_dialog_yes_button",36,.9 * Wh[3]);
            this.Wb.g = "#000";
            this.Eb = new mr("host_private_match_dialog_back_button",36,.9 * Wh[3]);
            this.Eb.g = "#000";
            this.Nb = nr(0, 0, 223, 102);
            this.Ab = nr(0, 0, 223, 109);
            this.Kb = nr(0, 0, 106, 101);
            this.match = new Sx(new pp,a,c,!0, () => {
                this.g.o = !0;
                this.actions.push(new W(new X({
                    alpha: 1
                },{
                    alpha: 0
                },250,Om),g => {
                    this.gamepad.alpha = g.alpha
                }
                ));
                const f = new ky(ci,T("tutorial_6"),1);
                this.u.push(f);
                this.Da = this.j.Zb = !1;
                this.Zb = !0;
                Jk(3);
                Rx(this.match);
                this.Cc = window.setTimeout( () => {
                    hy(this, !1)
                }
                , 3E3)
            }
            , (f, g) => {
                g = g.getId();
                if (!this.yb.has(g))
                    switch (g) {
                    case 1:
                        f.i && (this.yb.add(g),
                        my(this.o, 0, iv(this.match, "player_base_speed")));
                        break;
                    case 2:
                        f.i || (this.yb.add(g),
                        this.V = 0)
                    }
            }
            );
            Nx(this.match, d);
            tu(this.match.i, 1);
            su(this.match.i, 2);
            zi(this, qa(xi, this.match));
            this.j = Jx(this.match);
            this.o = Kx(this.match);
            this.i = Mx(this.match);
            this.H = new X({
                alpha: this.o.alpha
            },{
                alpha: 0
            },1E3);
            this.Wa = this.match.i.o;
            this.Da = !1;
            jy(this);
            Qx(this.match);
            Jk(2)
        }
        load() {
            return this.match.onReady.promise
        }
        wake() {
            this.match.wake()
        }
        render(a, b) {
            a.save();
            this.match.render(a, b);
            1 > this.Ka && (a.save(),
            a.fillStyle = `rgba(0, 0, 0, ${1 - this.Ka}`,
            a.fillRect(0, 0, a.canvas.width, a.canvas.height),
            a.restore());
            a.textAlign = "center";
            a.textBaseline = "middle";
            var c = ii[3]
              , d = ii[4]
              , e = a.canvas.width - 20 - c / 2
              , f = L ? zl.top + zl.height : a.canvas.height - 20 - d / 2;
            b = e - c / 2;
            V(ii, a, e, f);
            e = a.canvas.width - 20 - c + 74;
            this.O || (this.O = gm(a, this.Rc, P, 24, 12, 95, 2));
            const g = this.O.fontSize;
            im(a, this.O, e, f - g * (this.O.lines.length - 1) / 2, g);
            this.Ja || (this.Ja = nr(b, f - d / 2, c, d),
            sy(this, !0));
            this.Fc && (c = Mh[3],
            d = Mh[4],
            b = L ? 20 + c / 2 : b - 20 - c / 2,
            f = L ? zl.top + zl.height : a.canvas.height - 20 - d / 2,
            V(Mh, a, b, f),
            this.Ba || (this.Ba = gm(a, this.Qc, P, this.O.fontSize, 12, c - 30, 2)),
            e = this.Ba.fontSize,
            im(a, this.Ba, b, f - e * (this.Ba.lines.length - 1) / 2, e),
            this.wa || (this.wa = nr(b - c / 2, f - d / 2, c, d),
            ry(this, !0)));
            for (var h of this.u)
                h.render(a, 0, 0);
            this.Mb && (dm(a),
            h = a.canvas.width / 2,
            b = a.canvas.height / 2,
            V(Zh, a, h, b),
            h -= Zh[3] / 2,
            b -= Zh[4] / 2,
            c = M / 2,
            this.Lb.Ga(M / 2, b + 140),
            this.Lb.render(a),
            V(Wh, a, c, b + 260),
            this.Wb.Ga(c, b + 260),
            this.Wb.render(a),
            V(Wh, a, c, b + 378),
            this.Eb.Ga(c, b + 378),
            this.Eb.render(a),
            pr(this.Kb, h + Zh[3] - 118, b - 2),
            V($h, a, h + Zh[3] - 118 + $h[3] / 2, b - 2 + $h[4] / 2),
            pr(this.Nb, h + 114, b + 206),
            pr(this.Ab, h + 114, b + 324));
            a.restore()
        }
    }
    ;
    function gr(a) {
        return new W(new X({
            scale: 0
        },{
            scale: .8
        },250,Pm),b => a.Ra(b))
    }
    function hr(a) {
        return new W(new X({
            scale: .8
        },{
            scale: 0
        },250,Nm),b => a.Ra(b))
    }
    class ky extends ir {
        constructor(a, b, c) {
            super(b);
            this.Ia = a;
            this.scale = 0;
            this.position = Qf() ? 2 : c;
            a = document.createElement("canvas");
            b = this.v();
            a.width = 1.5 * Gh[3] + b[3] / 2;
            a.height = b[4] / 2;
            this.g = a;
            this.i = this.g.getContext("2d")
        }
        v() {
            return this.Ia
        }
        Ra(a) {
            this.scale = a.scale
        }
        render(a) {
            const b = 1.5 * Gh[3]
              , c = 1.5 * Gh[4];
            var d = this.v();
            const e = d[3] / 2
              , f = d[4] / 2
              , g = zl.width
              , h = zl.left
              , k = (1 === this.position ? .25 : .7) * zl.height + zl.top;
            this.i.clearRect(0, 0, this.g.width, this.g.height);
            V(Gh, this.i, (e + b) / 2, f / 2, b, c);
            V(d, this.i, e / 2, f / 2, e, f);
            this.i.textAlign = "center";
            this.i.textBaseline = "middle";
            this.i.fillStyle = "#000";
            d = gm(this.i, this.text, P, 36, 16, b - e / 2, 2);
            im(this.i, d, (1.2 * e + b) / 2, c / 2 + (10 - 16.25 * (d.lines.length - 1)), 1.25 * d.fontSize);
            a.save();
            a.translate(h + g / 2, k);
            a.translate(this.scale / 2 * -this.g.width, this.scale / 2 * -this.g.height);
            a.drawImage(this.g, 0, 0, this.g.width * this.scale, this.g.height * this.scale);
            a.restore()
        }
    }
    ;function xy(a, b=null) {
        return u(function*() {
            var c = Hd(a, 2);
            if (!Kq(c))
                throw Error("R");
            c = yield pq(c);
            return new Gq(c,{
                Uc: Hd(a, 2),
                Ic: Hd(a, 1)
            },b)
        })
    }
    ;var yy = class extends K {
    }
    ;
    var zy = class extends K {
    }
    ;
    var Ay = class extends K {
    }
    ;
    var By = [1, 2]
      , Cy = ue(class extends K {
    }
    , [0, se, [0, te, ne, ne, qe, [0, je, ne, ne, je]], By, se, [0, je, ne, ne, le, ne], By]);
    var Dy = {
        Hd: a => a.g(),
        Pe: a => Cy(a),
        jf: "ddl.mm.MatchmakerClientMessage",
        ff: "ddl.mm.MatchmakerServerMessage"
    };
    var Ey = class extends Error {
        constructor(a) {
            super(`MatchmakerServerError: {${a}}`);
            Object.setPrototypeOf(this, Ey.prototype)
        }
    }
      , Fy = class extends Error {
        constructor(a) {
            super(`MatchmakerDisconnectedError: {${a}}`);
            Object.setPrototypeOf(this, Fy.prototype)
        }
    }
      , Gy = class extends Error {
        constructor(a) {
            super(`MatchmakerWebSocketError: {${a}}`);
            Object.setPrototypeOf(this, Gy.prototype)
        }
    }
    ;
    var Hy = class extends K {
        constructor() {
            super()
        }
    }
    ;
    Hy.kc = [1];
    var Iy = class extends K {
        constructor() {
            super()
        }
    }
      , Jy = [1, 2, 3, 4];
    Iy.prototype.g = ve([0, se, [0, oe, ne], Jy, se, [0, oe], Jy, se, [0, ne], Jy, se, [0, ne], Jy]);
    function Ky(a, b) {
        var c = [];
        return u(function*() {
            if (1 !== a.status)
                throw Error("S`" + a.clientId);
            c.push(`${"GAME_MODE"}:${b.name}`);
            a.status = 3;
            var d = a.g
              , e = new Hy
              , f = c
              , g = e.La
              , h = E(g);
            Fc(h);
            if (null == f)
                nd(g, h, 1);
            else {
                if (!(rc(f) & 4)) {
                    Object.isFrozen(f) && (f = nc(f));
                    for (let n = 0; n < f.length; n++) {
                        var k = f
                          , l = n
                          , m = f[n];
                        if ("string" !== typeof m)
                            throw Error();
                        k[l] = m
                    }
                    sc(f, 5)
                }
                nd(g, h, 1, f)
            }
            f = new Iy;
            null == e && (e = void 0);
            g = f.La;
            h = E(g);
            Fc(h);
            (k = rd(g, h, Jy)) && 1 !== k && null != e && nd(g, h, k);
            nd(g, h, 1, e);
            cq(d, f);
            a.nc = Np();
            return a.nc.promise
        })
    }
    function Ly(a, b) {
        console.error("MatchmakerClient Error: {%o}", b);
        0 === a.status ? a.status = 5 : 2 === a.status ? (a.status = 5,
        Rp(a.u, b)) : (a.status = 5,
        a.nc ? Rp(a.nc, b) : console.error(`Unhandled Matchmaker error: ${b}`))
    }
    var My = class {
        constructor() {
            var a = Jp;
            this.status = 0;
            this.clientId = "unset";
            this.o = 0;
            this.v = null;
            this.H = () => {}
            ;
            this.g = new a({
                Bc: Dy
            });
            dq(this.g, 0, this.j.bind(this));
            dq(this.g, 2, this.i.bind(this));
            dq(this.g, 3, this.onError.bind(this));
            dq(this.g, 1, this.O.bind(this))
        }
        connect(a) {
            this.o = Date.now();
            return this.g.connect(a)
        }
        O(a) {
            switch (td(a, By)) {
            case 1:
                a = G(a, zy, sd(a, By, 1));
                if (!a)
                    break;
                this.v = a;
                if (1 === H(a, 1, 0) && null != Pc(ld(a, 2)) && void 0 !== vd(a, yy, 4)) {
                    if (!this.nc)
                        throw this.status = 5,
                        Error("T");
                    this.status = 4;
                    Qp(this.nc, {
                        address: Hd(a, 2),
                        Ic: Hd(G(a, yy, 4), 2),
                        re: Fd(G(a, yy, 4), 1)
                    })
                } else
                    a = new Ey(Hd(a, 3) || "Unknown Error"),
                    Ly(this, a);
                this.g.close();
                break;
            case 2:
                if (a = G(a, Ay, sd(a, By, 2)))
                    if (this.H(a),
                    2 === this.status) {
                        a = Ag(Bg(Cg(new Dg, Hd(a, 3)), Hd(a, 2)), Hd(a, 5));
                        if (!this.u)
                            throw this.status = 5,
                            Error("U");
                        this.status = 3;
                        this.nc = Np();
                        Qp(this.u, {
                            Rg: a,
                            nc: this.nc.promise
                        })
                    }
            }
        }
        disconnect() {
            this.g.close()
        }
        j() {
            this.clientId = this.g.u.value.clientId;
            this.status = 1
        }
        i() {
            let a;
            console.log("(%s) Disconnected from Matchmaker (result: %s) after (%d)s.", this.clientId, (null == (a = this.v) ? 0 : Hd(a, 2).length) ? "success" : "fail", (Date.now() - this.o) / 1E3);
            4 === this.status || 5 === this.status || Ly(this, new Fy("Disconnected unexpectedly waiting for match."))
        }
        onError(a) {
            Ly(this, new Gy(`${this.clientId}: ${a}`))
        }
    }
    ;
    var Ny = class extends My {
        constructor(a= () => {}
        , b, c, d) {
            super();
            this.oa = b;
            this.V = c;
            this.ya = d;
            this.H = a
        }
        j() {
            this.oa();
            super.j()
        }
        onError(a) {
            this.V(a);
            super.onError(a)
        }
        i() {
            this.ya();
            super.i()
        }
    }
    ;
    function Oy(a, b=a.H) {
        return u(function*() {
            a.i || (a.i = Np(),
            yield a.g.connect(b),
            Qp(a.i));
            return a.i.promise
        })
    }
    var Py = class {
        constructor(a) {
            this.H = Rg;
            this.j = a;
            this.v = Np();
            this.g = new Ny(this.u.bind(this), () => {}
            ,this.j, () => {}
            )
        }
        Wc(a) {
            const b = this;
            return u(function*() {
                yield Oy(b);
                const c = yield Ky(b.g, a);
                return {
                    Uc: `wss://${c.address}`,
                    Ic: c.Ic
                }
            })
        }
        reset() {
            this.i = void 0;
            this.v = Np();
            this.o = void 0;
            this.g.disconnect();
            this.g = new Ny(this.u.bind(this), () => {}
            ,this.j, () => {}
            )
        }
        u(a) {
            a = Hd(a, 3);
            this.o || Qp(this.v);
            this.o = a
        }
    }
    ;
    const Qy = Pl()
      , Ry = Lq();
    function vq(a, b) {
        u(function*() {
            zq(a.match, xd(b, Kn, 2));
            const c = Hd(b, 3);
            if (c)
                try {
                    const d = yield tl(c, Fd(b, 4) || void 0);
                    Nx(a.match, d);
                    Jk(13)
                } catch (d) {
                    a.H()
                }
            else
                a.H()
        })
    }
    function Sy(a, b) {
        a.match = new Sx(new op(b),a.V,a.gamepad,!1, () => {
            a.o = new ds(a.match,a.j);
            Ty(a, 5);
            sp("halloween21.client.match_config", null)
        }
        , () => {}
        )
    }
    function Uy(a) {
        const b = vp();
        b ? Vy(a, {
            Uc: b.url,
            Ic: b.match,
            Lc: {
                player: b.player,
                nonce: b.nonce
            }
        }) : Wy(a).then( () => {
            Xy(a)
        }
        )
    }
    function Vy(a, b) {
        u(function*() {
            yield Promise.all([Yy(a), Wy(a)]);
            try {
                yield Zy(a, b)
            } catch (c) {
                Xy(a);
                return
            }
            yield a.match.onReady.promise;
            Ty(a, 4);
            Px(a.match);
            Qx(a.match)
        })
    }
    function Wy(a) {
        return u(function*() {
            $y(a);
            yield ul();
            return ct(a.v)
        })
    }
    function Xy(a) {
        const b = ql;
        b ? (a.i = new wy(a.V,a.j,a.gamepad,b,c => {
            az(a, c)
        }
        ),
        a.i.load().then( () => {
            vl();
            Ty(a, 2);
            Zs(a.V)
        }
        )) : az(a, !1)
    }
    function az(a, b) {
        u(function*() {
            yield Yy(a);
            return b ? bz(a) : 2 === H(Ry.g, 1, 1) ? cz(a) : a.Wc()
        })
    }
    function Ty(a, b) {
        switch (a.state) {
        case 2:
            a.i.dispose();
            a.i = null;
            break;
        case 4:
            a.match.dispose();
            a.match = null;
            break;
        case 5:
            a.o.dispose();
            a.o = null;
            break;
        case 6:
            a.v = null
        }
        a.state = b
    }
    function Yy(a) {
        return u(function*() {
            $y(a);
            yield vl();
            return ct(a.v)
        })
    }
    function bz(a, b=!1) {
        return u(function*() {
            var c = Ks(a.wa, G(Ry.g, Dg, 2), b);
            a.g = new Ot(a.j,!0,!0,c, () => {
                a.u && (a.u.start(),
                Hk(108))
            }
            ,b);
            Ty(a, 3);
            c = yield c;
            return dz(a, 3, c)
        })
    }
    function cz(a, b=!1) {
        const c = G(Ry.g, Dg, 2);
        a.g = new Ot(a.j,!0,!1,Promise.resolve(c), () => {
            a.u && (a.u.start(),
            Hk(108))
        }
        ,b);
        Ty(a, 3);
        return dz(a, 2, c)
    }
    function dz(a, b, c) {
        return u(function*() {
            Ry.set(b, c);
            const d = ( () => {
                if (1 === b)
                    return () => u(function*() {
                        return {
                            connectionInfo: yield a.wa.Wc(Eg.Od),
                            ob: void 0
                        }
                    });
                if (!c)
                    throw Error("V");
                return () => u(function*() {
                    a.u = yield xy(c, Dl("H21_HAT", null));
                    const {ob: e, connectionInfo: f} = yield a.u.join(g => {
                        let h;
                        null == (h = a.g) || Jt(h, g)
                    }
                    , () => {
                        let g;
                        null != (g = a.g) && (g.Lb = !0,
                        g.Da || Hk(116),
                        g.Da = !0)
                    }
                    );
                    a.u = null;
                    return {
                        ob: e,
                        connectionInfo: f
                    }
                })
            }
            )();
            try {
                const {connectionInfo: e, ob: f} = yield d();
                Jk(10);
                yield Zy(a, e, f)
            } catch (e) {
                a.H()
            } finally {
                a.wa.reset()
            }
        })
    }
    function Zy(a, b, c) {
        return u(function*() {
            const d = yield c ? sq(a, b, c) : qq(a, b);
            Sy(a, d);
            yield tq(d);
            Jk(11)
        })
    }
    function $y(a) {
        6 !== a.state && (Ty(a, 6),
        a.v = new dt)
    }
    var ez = class extends yi {
        constructor(a) {
            super();
            this.j = a;
            this.state = 1;
            this.u = this.O = this.i = this.o = this.v = this.match = this.g = null;
            this.title = new gy( () => {
                document.activeElement && document.activeElement.blur();
                a: {
                    var b = document.getElementsByTagName("INPUT");
                    for (const c of b)
                        if ("q" === c.name) {
                            b = c;
                            break a
                        }
                    b = null
                }
                b && b.setAttribute("data-saf", "true");
                N.width = M;
                N.height = Sg;
                Ps(this.j);
                Uy(this)
            }
            );
            this.gamepad = new Is;
            this.V = new bt(this.j,this.gamepad);
            this.wa = ( () => new Py(this.H.bind(this)))();
            Tl(Pl(), 0, 0)
        }
        Kc() {
            this.title.Kc(!1)
        }
        wake() {
            switch (this.state) {
            case 2:
                this.i.wake();
                break;
            case 4:
                this.match.wake()
            }
        }
        Wc() {
            this.g = new Ot(this.j,!1,!1);
            Ty(this, 3);
            return dz(this, 1)
        }
        H() {
            3 === this.state && this.g ? Mt(this.g) : (Ty(this, 7),
            this.O || (this.O = new Fs(this.j, () => {
                document.location.reload()
            }
            )),
            Es(this.O))
        }
        update(a) {
            switch (this.state) {
            case 1:
                a = this.title;
                switch (a.state) {
                case 1:
                    a.j && a.Kc(!0);
                    break;
                case 2:
                    Am(a.i) && a.g()
                }
                break;
            case 6:
                var b = this.v;
                b.j.update(a);
                for (const c of b.i)
                    c.update(a);
                b.g += a;
                this.i ? vy(this.i, a) : this.match && Ox(this.match, a);
                break;
            case 2:
                vy(this.i, a);
                break;
            case 3:
                0 === this.g.state && this.match && (b = this.match.g.g) && Lt(this.g, b.Oa, b.Sa);
                b = this.g;
                b.i && b.i.update(a);
                b.v += a;
                b.Wa.update(a);
                b.u && b.u.update(a);
                b.j && b.j.update(a);
                b.wa && b.wa.update(a);
                b.oa && b.oa.update(a);
                b.yb && b.yb.update(a);
                switch (b.state) {
                case 7:
                    Am(b.u) && (Kt(b, 1),
                    Tm(b.u));
                    break;
                case 1:
                    1E3 <= b.v && Kt(b, 2);
                    break;
                case 2:
                    Am(b.j) && Kt(b, 3);
                    break;
                case 3:
                    500 <= b.v && Kt(b, 4);
                    break;
                case 4:
                    b.O.update(a),
                    3E3 <= b.v && Kt(b, 5)
                }
                b.H && b.H.update(a);
                if (5 === this.g.state && Hx(this.match)) {
                    if (a = this.match.g.g)
                        b = new Yn,
                        F(b, 1, 14),
                        Cd(b, 2, a.id),
                        Bd(b, 3, !0),
                        a.Ba.xd(b);
                    Ty(this, 4);
                    Px(this.match);
                    Qx(this.match)
                }
                break;
            case 4:
                Ox(this.match, a);
                break;
            case 5:
                b = this.o;
                b.v += a;
                b.o && b.j.update(a);
                switch (b.state) {
                case 0:
                    3E3 <= b.v && as(b, 1)
                }
                if (3 === this.o.state)
                    this.match = null,
                    bz(this);
                else if (4 === this.o.state)
                    switch (this.match = null,
                    H(Ry.g, 1, 1)) {
                    case 3:
                        bz(this, !0);
                        break;
                    case 2:
                        cz(this, !0);
                        break;
                    case 1:
                        this.Wc()
                    }
            }
        }
        render(a) {
            switch (this.state) {
            case 1:
                this.title.render(a);
                break;
            case 6:
                this.v.render(a);
                break;
            case 2:
                this.i.render(a, Qy);
                break;
            case 3:
                this.g.render(a);
                break;
            case 4:
                this.match.render(a, Qy);
                break;
            case 5:
                this.o.render(a);
                break;
            case 7:
                this.O.render(a)
            }
        }
    }
    ;
    var fz = {};
    function gz() {
        throw Error("W");
    }
    gz.prototype.i = null;
    gz.prototype.toString = function() {
        return this.Ae
    }
    ;
    gz.prototype.g = function() {
        if (this.Ne !== fz)
            throw Error("X");
        return cf(this.toString())
    }
    ;
    function hz() {
        gz.call(this)
    }
    sa(hz, gz);
    hz.prototype.Ne = fz;
    var iz = function(a) {
        function b(c) {
            this.Ae = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.i = d);
            return c
        }
    }(hz);
    const jz = {
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
    function kz(a) {
        return jz[a]
    }
    const lz = /[\x00\x22\x26\x27\x3c\x3e]/g
      , mz = /[\x00\x22\x27\x3c\x3e]/g
      , nz = /^[a-zA-Z0-9+\/_-]+={0,2}$/
      , oz = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g
      , pz = /</g;
    /*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    function qz() {
        var a = rz
          , b = va || (va = new qj);
        if ((a = a(sz, void 0)) && a.j)
            return a.j();
        a: if (la(a)) {
            if (a.g && (a = a.g(),
            a instanceof af))
                break a;
            a = bf("zSoyz")
        } else
            a = bf(String(a));
        b = b.g;
        var c = a;
        a = pj(b, "DIV");
        db ? (c = ff(jf, c),
        lf(a, c),
        a.removeChild(a.firstChild)) : lf(a, c);
        if (1 == a.childNodes.length)
            b = a.removeChild(a.firstChild);
        else
            for (b = b.createDocumentFragment(); a.firstChild; )
                b.appendChild(a.firstChild);
        return b
    }
    const sz = {};
    function rz(a, b) {
        (a = b && b.Mg) ? (a = String(a),
        a = nz.test(a) ? a : "zSoyz",
        a = ' nonce="' + (null != a && a.Ne === fz ? String(String(a.Ae).replace(oz, "").replace(pz, "&lt;")).replace(mz, kz) : String(a).replace(lz, kz)) + '"') : a = "";
        a = iz("<style" + a + ">\n#hplogo{-webkit-transition:opacity 200ms;-o-transition:opacity 200ms;transition:opacity 200ms}#fpdoodle #hplogo.fpdoodleready{opacity:1}#hpcanvas{background:none;pointer-events:all}#fpdoodle body,#sadoodle body{background:#000;-webkit-transition:background 200ms;-o-transition:background 200ms;transition:background 200ms}#fpdoodle .ntp,#sadoodle .ntp{background:transparent}.expanderHide{opacity:0}.closeFullscreenBtn{z-index:3000}.playButtonStatic18{position:absolute;top:32%;left:50%;-webkit-transform:translate(-35%,-50%) scale(1);-ms-transform:translate(-35%,-50%) scale(1);-o-transform:translate(-35%,-50%) scale(1);transform:translate(-35%,-50%) scale(1)}.playButtonStatic{position:absolute;left:0;top:0;height:100%;width:100%;background-image:url(/archive/tggd/2021/v81123/Halloween21-CTAGreenButton.png);background-position:center;-webkit-background-size:contain;-o-background-size:contain;background-size:contain;background-repeat:no-repeat}.playButtonStatic18.playButtonAnimated{-webkit-animation:play18Animation 2s ease-in-out infinite;-o-animation:play18Animation 2s ease-in-out infinite;animation:play18Animation 2s ease-in-out infinite}.playButtonStatic.playButtonAnimated{-webkit-animation:playAnimation 2s ease-in-out infinite;-o-animation:playAnimation 2s ease-in-out infinite;animation:playAnimation 2s ease-in-out infinite}@keyframes playAnimation{0%{background-image:url(/archive/tggd/2021/v81123/Halloween21-CTAGreenButton.png)}50%{background-image:url(/archive/tggd/2021/v81123/Halloween21-CTAPurpleButton.png)}}@keyframes play18Animation{0%{-webkit-transform:translate(-35%,-50%) scale(1);-ms-transform:translate(-35%,-50%) scale(1);-o-transform:translate(-35%,-50%) scale(1);transform:translate(-35%,-50%) scale(1)}50%{-webkit-transform:translate(-35%,-50%) scale(1.4);-ms-transform:translate(-35%,-50%) scale(1.4);-o-transform:translate(-35%,-50%) scale(1.4);transform:translate(-35%,-50%) scale(1.4)}to{-webkit-transform:translate(-35%,-50%) scale(1);-ms-transform:translate(-35%,-50%) scale(1);-o-transform:translate(-35%,-50%) scale(1);transform:translate(-35%,-50%) scale(1)}}.shareLinkContainer{position:absolute;width:60%;height:36px;top:0;margin:0 auto;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:flex-start;justify-content:flex-start;word-wrap:break-word}.shareLink{color:#000;background:none;overflow:hidden;width:100%;text-align:center;vertical-align:middle;-webkit-user-select:all;-moz-user-select:all;-ms-user-select:all;-webkit-user-select:all;-moz-user-select:all;-ms-user-select:all}.shareButton{position:absolute;width:44px;height:44px;bottom:-22px;right:-22px;opacity:.75;pointer-events:all;cursor:pointer}.shareLinkCopied{color:#000;position:absolute;top:160px;left:50%;padding:10px 15px;-webkit-border-radius:30px;-moz-border-radius:30px;border-radius:30px;background-color:rgba(255,255,255,.7);-webkit-transform:translate(-50%,-100%);-ms-transform:translate(-50%,-100%);-o-transform:translate(-50%,-100%);transform:translate(-50%,-100%);-webkit-transition:transform .2s ease-out,opacity .2s ease-out;-o-transition:transform .2s ease-out,opacity .2s ease-out;transition:transform .2s ease-out,opacity .2s ease-out;opacity:0}.shareLinkCopied.visible{-webkit-transform:translate(-50%,0%);-ms-transform:translate(-50%,0%);-o-transform:translate(-50%,0%);transform:translate(-50%,0%);opacity:1}.hplogocta{width:100%;height:100%;-webkit-background-size:contain;background-size:contain;background-position:center;border:none;overflow:hidden;position:absolute;left:0;top:0;z-index:10;cursor:pointer;padding:0;-webkit-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s;opacity:0;pointer-events:auto}.hplogocta.showCta{opacity:1}.hplogocta.ctaHideDuringLightbox{display:none}.closeFullscreenBtn{pointer-events:all;cursor:pointer;position:absolute;top:5px;right:5px;z-index:3000}.domRootLightboxed{left:0;top:0}.contentHide{display:none}#ddlDomRoot{pointer-events:none}.lightboxMode,#hplogo.lightboxMode{position:absolute;top:0;left:0;height:100%;width:100%;z-index:1000;overflow:hidden}.lightboxContentContainer{position:relative;height:100%;width:100%}.lightboxEnabled .lightboxContentContainer{height:90%;width:90%}.lightboxContent{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0}.lightboxContainer{position:absolute;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%;height:100%;left:0;top:0}.lightboxBackground{opacity:0;background-color:rgba(0,0,0,.8)}.lightboxEnabled{opacity:1;-webkit-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s}sentinel{}\n</style>");
        return iz(a)
    }
    ;function tz() {
        const a = document.getElementById("hplogo")
          , b = document.getElementById("ddlDomRoot")
          , c = document.getElementById("ctaRoot")
          , d = document.getElementById("ddlContentRoot");
        if (null === a || null === b || null === c || null === d)
            throw Error("Y");
        return {
            scale: 1,
            orientation: "landscape-primary",
            isFullscreen: !1,
            Ed: !1,
            width: 960,
            height: 540,
            ta: a,
            Ib: b,
            Ob: c,
            Yb: d
        }
    }
    ;function uz(a, b) {
        a.Ta.style.display = b ? "block" : "none"
    }
    var wz = class {
        constructor(a, b) {
            this.Ta = vz();
            this.Ta.style.top = "10px";
            this.Ta.style.right = "10px";
            this.Ta.style.width = "52px";
            this.Ta.style.height = "52px";
            this.Ta.style.cursor = "pointer";
            this.Ta.style.position = "absolute";
            this.Ta.style.pointerEvents = "all";
            this.Ta.style.background = "transparent";
            this.Ta.style.display = "none";
            this.Ta.setAttribute("role", "button");
            this.Ta.setAttribute("aria-label", "Close");
            this.Ta.tabIndex = 0;
            Pi(this.Ta, "click", b);
            Pi(this.Ta, "keydown", c => {
                32 !== c.keyCode && 13 !== c.keyCode || b()
            }
            );
            a.appendChild(this.Ta)
        }
    }
    ;
    const vz = () => {
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
    }
    ;
    function xz(a) {
        return u(function*() {
            return new Promise(b => {
                setTimeout( () => {
                    b(void 0)
                }
                , a)
            }
            )
        })
    }
    ;function yz(a) {
        zk() ? setTimeout( () => {
            zz(a)
        }
        , 300) : (Az(a),
        Xf && Lf.includes("Safari") ? Pi(a.Ob, "click", () => {
            zz(a)
        }
        , !0) : Qi(a.Ob, "click", () => {
            zz(a)
        }
        , !0))
    }
    function Az(a) {
        (Vf() ? "1" === Mf.g.get("scta") : document.getElementById("fkbx") || Tf()) || (a.u.start(),
        a.i && a.j && a.i.classList.add(a.j))
    }
    function Bz(a) {
        a.i && a.j && a.i.classList.remove(a.j);
        Ux(a.u)
    }
    function Cz(a) {
        return u(function*() {
            if (a.o)
                return a.o;
            a.Ob.classList.remove(a.g.De);
            a.o = xz(500);
            yield a.o;
            a.i && a.i.remove();
            a.Ob.remove()
        })
    }
    function zz(a) {
        u(function*() {
            a.O && (yield Cz(a));
            return a.H()
        })
    }
    var Dz = class {
        constructor(a, b, c, d, e, f=!0) {
            this.i = b;
            this.j = c;
            this.v = d;
            this.H = e;
            this.O = f;
            this.uc = 1;
            this.o = null;
            this.g = {
                ye: "hplogocta",
                De: "showCta",
                Be: "ctaHideDuringLightbox"
            };
            this.Ob = a.Ob;
            this.Ob.classList.add(this.g.ye);
            this.Ob.classList.add(this.g.De);
            b && (this.Ob.appendChild(b),
            b.tabIndex = -1,
            b.ariaHidden = "true");
            this.u = new Vx(g => {
                this.v(g)
            }
            );
            yz(this)
        }
    }
    ;
    const Ez = Of() && Lf.includes("OS 12_");
    function Fz(a, b, c) {
        a.style.position = "absolute";
        a.style.top = "0";
        a.style.left = "0";
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.direction = "ltr";
        a.dataset.width = b.toString();
        a.dataset.height = c.toString()
    }
    function Gz(a, b=!1) {
        const c = a.g.parentElement ? a.g.parentElement.offsetWidth : a.ta.offsetWidth
          , d = a.g.parentElement ? a.g.parentElement.offsetHeight : a.ta.offsetHeight;
        a.j && (0 === window.scrollX && 0 === window.scrollY || window.scrollTo(0, 0));
        if (c !== a.u || d !== a.o || a.i.isFullscreen !== a.v || b) {
            b = Number(a.g.dataset.width);
            var e = Number(a.g.dataset.height);
            if (Vf())
                throw Error("I");
            a.i.Ed = !1;
            var f = Math.min(c / b, d / e)
              , g = f * b
              , h = f * e;
            a.i.scale = f;
            f = `scale(${f}, ${f})`;
            var k = Math.abs(d - h) / 2;
            g = Math.abs(c - g) / 2 + (g - b) / 2;
            h = (h - e) / 2 + k;
            rg(a.g, "TransformOrigin", "center center");
            rg(a.g, "Transform", f);
            pg(a.g, "position", "absolute", "width", `${b}px`, "height", `${e}px`, "left", `${g}px`, "top", `${h}px`);
            Ez && a.j && (b = document.documentElement,
            e = b.getBoundingClientRect(),
            e.width === c && e.height === d || pg(b, "width", `${c}px`, "height", `${d}px`));
            a.j && !Lf.includes("CriOS") && 0 < c && document.body.clientWidth !== c && (document.body.clientWidth < document.body.scrollWidth && pg(document.body, "width", `${Math.min(document.body.scrollWidth, c)}px`),
            document.body.clientWidth > c && pg(document.body, "width", `${c}px`));
            a.j && pg(a.ta, "height", "100%", "width", "100%");
            a.u = c;
            a.o = d;
            a.v = a.i.isFullscreen
        }
    }
    var Hz = class {
        constructor(a) {
            this.i = a;
            this.o = this.u = 0;
            this.v = !1;
            this.ta = a.ta;
            this.g = document.querySelector("#uidsdoodle") ? a.ta : a.Ib;
            Fz(this.g, a.width, a.height);
            if (Vf())
                throw Error("I");
            this.j = Uf() || Sf() || Qf() && !Nf();
            window.addEventListener("resize", () => {
                Gz(this)
            }
            )
        }
        setSize(a, b) {
            this.g.dataset.width = a.toString();
            this.g.dataset.height = b.toString()
        }
    }
    ;
    const Iz = document[tg(document, "exitFullscreen")]
      , Jz = tg(document, "fullscreenElement")
      , Kz = tg(document, "fullscreenEnabled");
    function Lz(a) {
        a.i && window.screen.orientation && window.screen.orientation.lock && window.screen.orientation.lock(a.i).catch( () => {}
        )
    }
    function Mz(a, b) {
        a.i = b;
        a.g.orientation = b;
        document[Jz] && Lz(a)
    }
    var Oz = class {
        constructor(a) {
            this.g = a;
            this.i = null;
            this.ta = a.ta;
            a = tg(this.ta, "requestFullscreen");
            this.o = this.ta[a];
            a = !(!document[Kz] || !Iz);
            if (Vf())
                throw Error("I");
            if (this.j = (Of() ? !1 : Uf() && !(Pf() && Of() || Pf() && !Of()) || Sf() && Qf()) && a)
                pg(document.body, "margin", "0"),
                pg(this.ta, "overflow", "visible", "width", "100%", "height", "100%"),
                document.body.scrollLeft = 0,
                Pi(window, "scroll", Nz, !0)
        }
    }
    ;
    const Nz = a => {
        a.preventDefault();
        a.stopPropagation();
        return !1
    }
    ;
    function Pz(a) {
        yi.call(this);
        this.i = a;
        this.g = {}
    }
    sa(Pz, yi);
    var Qz = [];
    function Rz(a, b, c, d, e) {
        Array.isArray(c) || (c && (Qz[0] = c.toString()),
        c = Qz);
        for (var f = 0; f < c.length; f++) {
            var g = Pi(b, c[f], d || a.handleEvent, e || !1, a.i || a);
            if (!g)
                break;
            a.g[g.key] = g
        }
    }
    function Sz(a) {
        ze(a.g, function(b, c) {
            this.g.hasOwnProperty(c) && Zi(b)
        }, a);
        a.g = {}
    }
    Pz.prototype.ub = function() {
        Pz.Qb.ub.call(this);
        Sz(this)
    }
    ;
    Pz.prototype.handleEvent = function() {
        throw Error("Z");
    }
    ;
    function Tz(a, b, c) {
        new Uz(a,b,c)
    }
    function Vz(a) {
        var b = window.agsa_ext;
        if (!a.oa && !a.o && b && b.getPageVisibility)
            return "hidden" === b.getPageVisibility();
        b = document[a.o];
        return document[a.oa] || "hidden" === b
    }
    function Wz(a) {
        a.H ? Xz(a) : Pf() && !Of() && Yz(a, () => {
            Xz(a)
        }
        )
    }
    function Zz(a) {
        Rz(a.O, document, "mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup".split(" "), () => void $z(a), !0);
        Rz(a.O, window, ["orientationchange", "resize"], () => void $z(a), !0)
    }
    function aA(a) {
        a.timeout && clearTimeout(a.timeout);
        a.timeout = setTimeout( () => {
            a.timeout = void 0;
            a.j = Date.now() - a.v >= a.V;
            a.j || aA(a);
            bA(a)
        }
        , Math.max(100, a.V - (Date.now() - a.v)))
    }
    function $z(a) {
        a.v = Date.now();
        a.j = !1;
        bA(a)
    }
    function Xz(a) {
        a.u = () => {
            a.i = Vz(a);
            a.i ? bA(a) : $z(a)
        }
        ;
        const b = window.agsa_ext;
        a.H ? document.addEventListener(a.H, a.u, !1) : b && b.registerPageVisibilityListener && (xg( () => {
            a.u && a.u()
        }
        ),
        b.registerPageVisibilityListener("google.doodle.pvc();"))
    }
    function Yz(a, b) {
        window.agsa_ext ? b() : setTimeout( () => {
            Wz(a)
        }
        , 100)
    }
    function bA(a) {
        const b = a.i || a.j;
        a.g && !b ? (a.g = !1,
        a.wa(),
        aA(a)) : !a.g && b && (a.g = !0,
        a.ya())
    }
    var Uz = class {
        constructor(a, b, c) {
            this.V = a;
            this.ya = b;
            this.wa = c;
            this.j = !1;
            this.u = () => {}
            ;
            this.v = Date.now();
            this.oa = tg(document, "hidden");
            this.H = (this.o = tg(document, "visibilityState")) ? this.o.replace(/state$/i, "change").toLowerCase() : null;
            this.g = this.i = Vz(this);
            this.O = new Pz;
            Wz(this);
            Zz(this);
            aA(this)
        }
        ac() {
            return !this.g
        }
    }
    ;
    function cA(a, b) {
        const c = document.createElement("div");
        c.classList.add("lightboxContainer");
        c.classList.add("lightboxBackground");
        a.ta.appendChild(c);
        const d = document.createElement("div");
        d.classList.add("lightboxContentContainer");
        c.appendChild(d);
        b.classList.add("lightboxContent");
        pg(b, "position", "relative", "left", "50%", "top", "50%");
        d.appendChild(b);
        b = new wz(b, () => {
            dA(a)
        }
        );
        c.appendChild(b.Ta);
        window.addEventListener("resize", () => {
            a.i()
        }
        );
        return {
            Ta: b,
            yc: c,
            he: d
        }
    }
    function dA(a) {
        u(function*() {
            a.g && (Zi(a.j),
            a.ta.classList.remove("lightboxMode"),
            a.yc.classList.remove("lightboxBackground"),
            a.yc.classList.remove("lightboxEnabled"),
            a.g = !1,
            a.u(),
            uz(a.Ta, !1),
            Qf() || !Lf.includes("Safari") || Lf.includes("Chrome") || (a.ta.style.display = "none",
            a.ta.offsetWidth,
            a.ta.style.display = "block"),
            yield xz(0))
        })
    }
    function eA(a) {
        return u(function*() {
            a.g || (yield xz(0),
            a.ta.classList.add("lightboxMode"),
            a.yc.classList.add("lightboxBackground"),
            a.yc.getBoundingClientRect(),
            a.yc.classList.add("lightboxEnabled"),
            a.g = !0,
            a.i(),
            a.j = Pi(document, "keydown", b => {
                27 === b.keyCode && dA(a)
            }
            ),
            uz(a.Ta, !0),
            yield xz(500))
        })
    }
    var fA = class {
        constructor(a, b, c, d, e= () => {}
        , f= () => {}
        ) {
            this.ta = a;
            this.o = b;
            this.i = e;
            this.j = null;
            this.g = !1;
            this.i = e;
            this.u = f;
            const {Ta: g, yc: h, he: k} = cA(this, b);
            this.Ta = g;
            this.yc = h;
            this.he = k;
            this.setSize(c, d)
        }
        setSize(a, b) {
            pg(this.he, "maxWidth", `${a}px`, "maxHeight", `${b}px`);
            pg(this.o, "width", `${a}px`, "height", `${b}px`)
        }
    }
    ;
    var gA = a => {
        if (Of() && (Uf() || Sf()))
            for (const b of a)
                Pi(b, "touchmove", c => {
                    1 !== c.scale && c.preventDefault()
                }
                , {
                    passive: !1
                })
    }
      , hA = a => {
        for (const b of a)
            Pi(b, "contextmenu", c => {
                c.preventDefault()
            }
            , {
                passive: !1
            })
    }
    ;
    let iA = null;
    function jA(a) {
        return u(function*() {
            if (Xf) {
                var b = a.i.Gf;
                const c = new rf("/");
                Ef(c, "fpdoodle", "1");
                Ef(c, "doodle", String(b));
                Ig && Ef(c, "hl", Ig);
                Jg && Ef(c, "gl", Jg);
                ug(c.toString(), !1)
            } else
                a.H.start(),
                a.Ba = !0,
                a.ya = !0,
                a.ta.removeAttribute("title"),
                a.doodle.Kc(),
                yield kA(a),
                Hk(0),
                Gz(a.u, !0)
        })
    }
    function lA(a, b) {
        const c = b ? 0 : -1
          , d = b ? "false" : "true";
        for (const e of a.Ib.children)
            e instanceof HTMLElement && (e.tabIndex = c,
            e.ariaHidden = d);
        a = a.j;
        b = !b;
        a.Ob.tabIndex = b ? 0 : -1;
        a.Ob.ariaHidden = b ? "false" : "true"
    }
    function mA(a) {
        gA([document, a.ta, a.Ib, a.Yb]);
        hA([a.ta, a.Ib, a.Yb]);
        Rz(a.O, a.ta, "touchend", () => {
            var b = a.fullscreen;
            b.j && !document[Jz] && (b.o.call(b.ta),
            Lz(b),
            b.g.isFullscreen = !!document[Jz])
        }
        )
    }
    function nA(a) {
        Rz(a.O, a.Ib, ["mousedown", "mouseout", "touchstart"], b => {
            a.o.handleEvent(b)
        }
        );
        Rz(a.O, document, ["mouseup", "mousemove", "touchend", "touchmove", "contextmenu"], b => {
            a.o.handleEvent(b)
        }
        )
    }
    function kA(a) {
        return u(function*() {
            if (a.v)
                return oA(a);
            lA(a, !0);
            if (yk() && a.i.hd)
                return a.V = by(a.ta, () => {}
                ),
                fy(a.V, a.i.width, a.i.height);
            Ps(a.o)
        })
    }
    function oA(a) {
        return u(function*() {
            a.oa = new fA(a.ta,a.Ib,a.i.width,a.i.height, () => {
                Gz(a.u, !0);
                Ps(a.o)
            }
            , () => {
                a.We()
            }
            );
            yield pA(a);
            a.Ib.addEventListener("click", () => qA(a))
        })
    }
    function rA(a) {
        Ps(a.o);
        a.Ba && a.ya ? ((document.getElementById("fkbx") || Tf()) && iA && (Zi(iA),
        iA = null),
        a.H.start()) : Az(a.j);
        a.doodle.te()
    }
    function pA(a) {
        return u(function*() {
            var b = a.j;
            0 !== b.uc && b.Ob.classList.add(b.g.Be);
            b = a.wa;
            if (0 !== b.uc)
                for (const e of b.Ib.children)
                    e.classList.contains(b.g) || e.classList.remove("contentHide");
            let c, d;
            null == (c = a.Da) || null == (d = c.Sg) || d.call(c);
            lA(a, !0);
            a.ta.removeAttribute("title");
            yield eA(a.oa)
        })
    }
    function qA(a) {
        return u(function*() {
            yield pA(a);
            rA(a)
        })
    }
    var tA = class {
        constructor(a, b, c) {
            this.i = a;
            this.ya = this.Ba = !1;
            this.Da = null;
            this.g = tz();
            this.ta = this.g.ta;
            this.Ja = this.ta.title;
            this.Yb = this.g.Yb;
            this.Ib = this.g.Ib;
            this.g.width = this.i.width;
            this.g.height = this.i.height;
            (this.v = Ak()) && this.Ib.classList.add("domRootLightboxed");
            let d;
            Tz(null != (d = a.Qg) ? d : 6E4, () => {
                Ux(this.H);
                Bz(this.j);
                nk()
            }
            , () => {
                this.te()
            }
            );
            this.O = new Pz(this);
            this.o = new Rs(this.g);
            this.fullscreen = new Oz(this.g);
            Mz(this.fullscreen, this.i.orientation);
            this.u = new Hz(this.g);
            this.Ta = new wz(this.Ib, () => {
                var e = this.fullscreen;
                Iz.call(document);
                e.g.isFullscreen = !!document[Jz]
            }
            );
            this.Ta.Ta.classList.add("closeFullscreenBtn");
            this.j = new Dz(this.g,this.i.Ad.Sf,this.i.Ad.Hf, () => {}
            , () => jA(this),!1 !== this.i.Ad.Ug && !this.v && !Xf);
            this.wa = new sA(this.g.Ib,this.j.g.ye,this.i.Ad.uc);
            this.H = new Vx(e => {
                this.update(e)
            }
            );
            lA(this, zk());
            mA(this);
            Gz(this.u);
            a = this.g.Yb;
            if (!this.g.ta || !a)
                throw console.error("Unable to render the Doodle. This is expected during unit tests but may be a cause for concern elsewhere."),
                Error();
            nA(this);
            this.doodle = new b(this,...c)
        }
        setSize(a, b) {
            this.g.width = a;
            this.g.height = b;
            this.u.setSize(a, b);
            let c;
            null == (c = this.oa) || c.setSize(a, b);
            Gz(this.u, !0)
        }
        te() {
            let a;
            !this.v || (null == (a = this.oa) ? 0 : a.g) ? rA(this) : Az(this.j)
        }
        update(a) {
            this.V && this.V.update(a);
            uz(this.Ta, !!document[Jz]);
            this.doodle.Ra(a)
        }
        hd() {
            return !this.v && yk()
        }
        We() {
            Ux(this.H);
            Bz(this.j);
            nk();
            lA(this, !1);
            this.ta.setAttribute("title", this.Ja);
            var a = this.j;
            0 !== a.uc && (a.Ob.classList.remove(a.g.Be),
            Az(a));
            a = this.wa;
            if (0 !== a.uc)
                for (const d of a.Ib.children)
                    d.classList.contains(a.g) || d.classList.add("contentHide");
            Gz(this.u, !0);
            let b, c;
            null == (b = this.Da) || null == (c = b.We) || c.call(b)
        }
    }
    ;
    class sA {
        constructor(a, b, c) {
            this.Ib = a;
            this.g = b;
            this.uc = c
        }
    }
    ;function uA(a) {
        const b = new XMLHttpRequest;
        b.open("GET", a);
        return new Promise( (c, d) => {
            b.send();
            b.onreadystatechange = () => {
                if (4 == b.readyState)
                    if (200 == b.status && b.responseText)
                        a: {
                            var e = b.responseText;
                            e.startsWith(")]}'\n") && (e = e.substring(5));
                            let f = {};
                            try {
                                f = JSON.parse(e)
                            } catch (g) {
                                d(e);
                                break a
                            }
                            f.hasOwnProperty("ddllog") && (f = f.ddllog);
                            f.hasOwnProperty("__err__") ? d(f.__err__) : c(f)
                        }
                    else
                        d(b)
            }
        }
        )
    }
    function vA(a, b, c= () => {}
    , d=!1) {
        d = d ? "//www.google.com" : "";
        d = new rf("ddllog".startsWith("/") ? `${d}${"ddllog"}` : `${d}/async/${"ddllog"}`);
        uf(d, b);
        d = d.toString();
        a.g++;
        c(a.g);
        //return uA(d).catch(e => 1 > a.g ? a.i(2E3 * Math.pow(2, a.g - 1)).then( () => vA(a, b, c)) : Promise.reject(e)).finally( () => a.g = 0)
    }
    class wA {
        constructor(a) {
            this.g = 0;
            this.i = a
        }
    }
    ;class xA extends wA {
        constructor() {
            super(a => new Promise(b => setTimeout(b, a)))
        }
    }
    ;var yA = class extends K {
    }
    ;
    var zA = () => {
        var a = Fg;
        if (Qg() && Pg())
            return Promise.resolve();
        a = `_fmt:jspb,doodle:${a},slot:0,` + "type:3,cta:1";
        (document.getElementById("fkbx") || Tf()) && (a += ",ntp:1");
        Qg() && (a += ",impr:0");
        const b = new wf;
        b.add("async", a);
        /*return vA(new xA, b, void 0, !1).then(c => {
            c = new yA(c);
            !Qg() && Hd(c, 2) && (Mg = (new rf(Hd(c, 2))).g.get("ved", ""));
            !Pg() && Hd(c, 3) && (Og = Hd(c, 3))
        }
        ).catch( () => Promise.resolve())*/
    }
    ;
    lh.Ua();
    const ok = kk.Ua();
    (function() {
        Kk();
        const a = document.getElementById("hplogo");
        var b = document.getElementById("hpcanvas");
        if (a && b) {
            (document.getElementById("fkbx") || Tf()) && document.body.classList.add("ntp");
            a.appendChild(qz());
            b.width = M;
            b.height = Sg;
            var c = b.getContext("2d");
            b = zA();
            jk(a);
            Promise.all([sl(), b]).then( () => {
                var d = document.createElement("div");
                d.classList.add("playButtonStatic");
                d = {
                    width: M,
                    height: Sg,
                    Gf: Fg,
                    orientation: L ? "portrait-primary" : "landscape-primary",
                    Ad: {
                        Sf: d,
                        Hf: "playButtonAnimated",
                        uc: 1
                    }
                };
                var e = [c]
                  , f = AA;
                null != d.hd || (d.hd = !0);
                new tA(d,f,e)
            }
            )
        }
    }
    )();
    class AA {
        constructor(a, b) {
            this.j = a;
            Mz(a.fullscreen, "portrait-primary");
            a.g.ta.classList.add("fpdoodleready");
            L || a.setSize(463, 200);
            this.g = new ez(a.o);
            this.i = b
        }
        Kc() {
            this.j.setSize(M, Sg);
            this.g.Kc()
        }
        Ra(a) {
            this.g.update(a);
            this.g.render(this.i)
        }
        te() {
            this.g.wake();
            var a = ok;
            Promise.resolve();
            a.u && a.g && a.g.resume();
            a.u = !1
        }
    }
    ;
}
).call(this);
