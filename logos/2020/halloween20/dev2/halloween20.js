(function() { /*

   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var m,
    aa =
        function(a) {
      var b = 0;
      return function() {
        return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
      }
    },
    ba = 'function' == typeof Object.defineProperties ?
    Object.defineProperty :
    function(a, b, c) {
      if (a == Array.prototype || a == Object.prototype) return a;
      a[b] = c.value;
      return a
    },
    da = function(a) {
      a = [
        'object' == typeof globalThis && globalThis, a,
        'object' == typeof window && window, 'object' == typeof self && self,
        'object' == typeof global && global
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
      }
      throw Error('a');
    }, ea = da(this), ha = function(a, b) {
      if (b)
        a: {
          var c = ea; a = a.split('.'); for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
          } a = a[a.length - 1];
          d = c[a];
          b = b(d);
          b != d && null != b &&
          ba(c, a, {configurable: !0, writable: !0, value: b})
        }
    };
ha('Symbol', function(a) {
  if (a) return a;
  var b = function(e, f) {
    this.g = e;
    ba(this, 'description', {configurable: !0, writable: !0, value: f})
  };
  b.prototype.toString = function() {
    return this.g
  };
  var c = 0, d = function(e) {
    if (this instanceof d) throw new TypeError('b');
    return new b('jscomp_symbol_' + (e || '') + '_' + c++, e)
  };
  return d
});
ha('Symbol.iterator', function(a) {
  if (a) return a;
  a = Symbol('Symbol.iterator');
  for (
      var b = 'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'
                  .split(' '),
          c = 0;
      c < b.length; c++) {
    var d = ea[b[c]];
    'function' === typeof d && 'function' != typeof d.prototype[a] &&
        ba(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function() {
            return ia(aa(this))
          }
        })
  }
  return a
});
var ia = function(a) {
  a = {next: a};
  a[Symbol.iterator] = function() {
    return this
  };
  return a
}, n = function(a) {
  var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : {next: aa(a)}
}, ja = function(a) {
  if (!(a instanceof Array)) {
    a = n(a);
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
    a = c
  }
  return a
}, ka = 'function' == typeof Object.create ? Object.create : function(a) {
  var b = function() {};
  b.prototype = a;
  return new b
}, la;
if ('function' == typeof Object.setPrototypeOf)
  la = Object.setPrototypeOf;
else {
  var ma;
  a: {
    var na = {a: !0}, oa = {}; try {
      oa.__proto__ = na;
      ma = oa.a;
      break a
    } catch (a) {} ma = !1
  } la = ma ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError('c`' + a);
    return a
  } : null
}
var pa = la, p = function(a, b) {
  a.prototype = ka(b.prototype);
  a.prototype.constructor = a;
  if (pa)
    pa(a, b);
  else
    for (var c in b)
      if ('prototype' != c)
        if (Object.defineProperties) {
          var d = Object.getOwnPropertyDescriptor(b, c);
          d && Object.defineProperty(a, c, d)
        } else
          a[c] = b[c];
  a.Wb = b.prototype
}, qa = function() {
  this.o = !1;
  this.i = null;
  this.j = void 0;
  this.g = 1;
  this.H = 0;
  this.v = null
}, ra = function(a) {
  if (a.o) throw new TypeError('e');
  a.o = !0
};
qa.prototype.s = function(a) {
  this.j = a
};
var sa = function(a, b) {
  a.v = {Ve: b, Xe: !0};
  a.g = a.H
};
qa.prototype.return = function(a) {
  this.v = {return: a};
  this.g = this.H
};
var ta = function(a, b, c) {
  a.g = c;
  return {
    value: b
  }
}, ua = function(a) {
  this.g = new qa;
  this.i = a
}, xa = function(a, b) {
  ra(a.g);
  var c = a.g.i;
  if (c)
    return va(a, 'return' in c ? c['return'] : function(d) {
      return {
        value: d, done: !0
      }
    }, b, a.g.return );
  a.g.return(b);
  return wa(a)
}, va = function(a, b, c, d) {
  try {
    var e = b.call(a.g.i, c);
    if (!(e instanceof Object)) throw new TypeError('d`' + e);
    if (!e.done) return a.g.o = !1, e;
    var f = e.value
  } catch (g) {
    return a.g.i = null, sa(a.g, g), wa(a)
  }
  a.g.i = null;
  d.call(a.g, f);
  return wa(a)
}, wa = function(a) {
  for (; a.g.g;) try {
      var b = a.i(a.g);
      if (b) return a.g.o = !1, {
          value: b.value, done: !1
        }
    } catch (c) {
      a.g.j = void 0, sa(a.g, c)
    }
  a.g.o = !1;
  if (a.g.v) {
    b = a.g.v;
    a.g.v = null;
    if (b.Xe) throw b.Ve;
    return {
      value: b.return, done: !0
    }
  }
  return {
    value: void 0, done: !0
  }
}, ya = function(a) {
  this.next = function(b) {
    ra(a.g);
    a.g.i ? b = va(a, a.g.i.next, b, a.g.s) : (a.g.s(b), b = wa(a));
    return b
  };
  this.throw = function(b) {
    ra(a.g);
    a.g.i ? b = va(a, a.g.i['throw'], b, a.g.s) : (sa(a.g, b), b = wa(a));
    return b
  };
  this.return = function(b) {
    return xa(a, b)
  };
  this[Symbol.iterator] = function() {
    return this
  }
}, Aa = function(a) {
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
}, Ba = function(a) {
  return Aa(new ya(new ua(a)))
};
ha('Promise', function(a) {
  function b() {
    this.g = null
  }
  function c(g) {
    return g instanceof e ? g : new e(function(h) {
      h(g)
    })
  }
  if (a) return a;
  b.prototype.i = function(g) {
    if (null == this.g) {
      this.g = [];
      var h = this;
      this.j(function() {
        h.v()
      })
    }
    this.g.push(g)
  };
  var d = ea.setTimeout;
  b.prototype.j = function(g) {
    d(g, 0)
  };
  b.prototype.v = function() {
    for (; this.g && this.g.length;) {
      var g = this.g;
      this.g = [];
      for (var h = 0; h < g.length; ++h) {
        var k = g[h];
        g[h] = null;
        try {
          k()
        } catch (l) {
          this.o(l)
        }
      }
    }
    this.g = null
  };
  b.prototype.o = function(g) {
    this.j(function() {
      throw g;
    })
  };
  var e = function(g) {
    this.g = 0;
    this.j = void 0;
    this.i = [];
    this.H = !1;
    var h = this.o();
    try {
      g(h.resolve, h.reject)
    } catch (k) {
      h.reject(k)
    }
  };
  e.prototype.o = function() {
    function g(l) {
      return function(r) {
        k || (k = !0, l.call(h, r))
      }
    }
    var h = this, k = !1;
    return {
      resolve: g(this.ha), reject: g(this.v)
    }
  };
  e.prototype.ha = function(g) {
    if (g === this)
      this.v(new TypeError('f'));
    else if (g instanceof e)
      this.Ea(g);
    else {
      a: switch (typeof g) {
        case 'object':
          var h = null != g;
          break a;
        case 'function':
          h = !0;
          break a;
        default:
          h = !1
      }
      h ? this.$(g) : this.s(g)
    }
  };
  e.prototype.$ = function(g) {
    var h = void 0;
    try {
      h = g.then
    } catch (k) {
      this.v(k);
      return
    }
    'function' == typeof h ? this.Aa(h, g) : this.s(g)
  };
  e.prototype.v = function(g) {
    this.S(2, g)
  };
  e.prototype.s = function(g) {
    this.S(1, g)
  };
  e.prototype.S = function(g, h) {
    if (0 != this.g) throw Error('g`' + g + '`' + h + '`' + this.g);
    this.g = g;
    this.j = h;
    2 === this.g && this.va();
    this.V()
  };
  e.prototype.va = function() {
    var g = this;
    d(function() {
      if (g.ka()) {
        var h = ea.console;
        'undefined' !== typeof h && h.error(g.j)
      }
    }, 1)
  };
  e.prototype.ka = function() {
    if (this.H) return !1;
    var g = ea.CustomEvent, h = ea.Event, k = ea.dispatchEvent;
    if ('undefined' === typeof k) return !0;
    'function' === typeof g ?
        g = new g('unhandledrejection', {cancelable: !0}) :
        'function' === typeof h ?
        g = new h('unhandledrejection', {cancelable: !0}) :
        (g = ea.document.createEvent('CustomEvent'),
         g.initCustomEvent('unhandledrejection', !1, !0, g));
    g.promise = this;
    g.reason = this.j;
    return k(g)
  };
  e.prototype.V = function() {
    if (null != this.i) {
      for (var g = 0; g < this.i.length; ++g) f.i(this.i[g]);
      this.i = null
    }
  };
  var f = new b;
  e.prototype.Ea = function(g) {
    var h = this.o();
    g.Fc(h.resolve, h.reject)
  };
  e.prototype.Aa = function(g, h) {
    var k = this.o();
    try {
      g.call(h, k.resolve, k.reject)
    } catch (l) {
      k.reject(l)
    }
  };
  e.prototype.then = function(g, h) {
    function k(B, z) {
      return 'function' == typeof B ? function(C) {
        try {
          l(B(C))
        } catch (W) {
          r(W)
        }
      } : z
    }
    var l, r, w = new e(function(B, z) {
                l = B;
                r = z
              });
    this.Fc(k(g, l), k(h, r));
    return w
  };
  e.prototype.catch = function(g) {
    return this.then(void 0, g)
  };
  e.prototype.Fc = function(g, h) {
    function k() {
      switch (l.g) {
        case 1:
          g(l.j);
          break;
        case 2:
          h(l.j);
          break;
        default:
          throw Error('h`' + l.g);
      }
    }
    var l = this;
    null == this.i ? f.i(k) : this.i.push(k);
    this.H = !0
  };
  e.resolve = c;
  e.reject = function(g) {
    return new e(function(h, k) {
      k(g)
    })
  };
  e.race = function(g) {
    return new e(function(h, k) {
      for (var l = n(g), r = l.next(); !r.done; r = l.next())
        c(r.value).Fc(h, k)
    })
  };
  e.all = function(g) {
    var h = n(g), k = h.next();
    return k.done ? c([]) : new e(function(l, r) {
      function w(C) {
        return function(W) {
          B[C] = W;
          z--;
          0 == z && l(B)
        }
      }
      var B = [], z = 0;
      do B.push(void 0), z++, c(k.value).Fc(w(B.length - 1), r), k = h.next();
      while (!k.done)
    })
  };
  return e
});
ha('Object.is', function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
  }
});
ha('Array.prototype.includes', function(a) {
  return a ? a : function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var f = d[c];
      if (f === b || Object.is(f, b)) return !0
    }
    return !1
  }
});
ha('String.prototype.includes', function(a) {
  return a ? a : function(b, c) {
    if (null == this) throw new TypeError('i`includes');
    if (b instanceof RegExp) throw new TypeError('j`includes');
    return -1 !== (this + '').indexOf(b, c || 0)
  }
});
ha('Array.prototype.fill', function(a) {
  return a ? a : function(b, c, d) {
    var e = this.length || 0;
    0 > c && (c = Math.max(0, e + c));
    if (null == d || d > e) d = e;
    d = Number(d);
    0 > d && (d = Math.max(0, e + d));
    for (c = Number(c || 0); c < d; c++) this[c] = b;
    return this
  }
});
var Ca = function(a) {
  return a ? a : Array.prototype.fill
};
ha('Int8Array.prototype.fill', Ca);
ha('Uint8Array.prototype.fill', Ca);
ha('Uint8ClampedArray.prototype.fill', Ca);
ha('Int16Array.prototype.fill', Ca);
ha('Uint16Array.prototype.fill', Ca);
ha('Int32Array.prototype.fill', Ca);
ha('Uint32Array.prototype.fill', Ca);
ha('Float32Array.prototype.fill', Ca);
ha('Float64Array.prototype.fill', Ca);
var Da = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
};
ha('WeakMap', function(a) {
  function b() {}
  function c(k) {
    var l = typeof k;
    return 'object' === l && null !== k || 'function' === l
  }
  function d(k) {
    if (!Da(k, f)) {
      var l = new b;
      ba(k, f, {value: l})
    }
  }
  function e(k) {
    var l = Object[k];
    l && (Object[k] = function(r) {
      if (r instanceof b) return r;
      Object.isExtensible(r) && d(r);
      return l(r)
    })
  }
  if (function() {
        if (!a || !Object.seal) return !1;
        try {
          var k = Object.seal({}), l = Object.seal({}),
              r = new a([[k, 2], [l, 3]]);
          if (2 != r.get(k) || 3 != r.get(l)) return !1;
          r.delete(k);
          r.set(l, 4);
          return !r.has(k) && 4 == r.get(l)
        } catch (w) {
          return !1
        }
      }())
    return a;
  var f = '$jscomp_hidden_' + Math.random();
  e('freeze');
  e('preventExtensions');
  e('seal');
  var g = 0, h = function(k) {
    this.g = (g += Math.random() + 1).toString();
    if (k) {
      k = n(k);
      for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
    }
  };
  h.prototype.set = function(k, l) {
    if (!c(k)) throw Error('k');
    d(k);
    if (!Da(k, f)) throw Error('l`' + k);
    k[f][this.g] = l;
    return this
  };
  h.prototype.get = function(k) {
    return c(k) && Da(k, f) ? k[f][this.g] : void 0
  };
  h.prototype.has = function(k) {
    return c(k) && Da(k, f) && Da(k[f], this.g)
  };
  h.prototype.delete = function(k) {
    return c(k) && Da(k, f) && Da(k[f], this.g) ? delete k[f][this.g] : !1
  };
  return h
});
ha('Map', function(a) {
  if (function() {
        if (!a || 'function' != typeof a || !a.prototype.entries ||
            'function' != typeof Object.seal)
          return !1;
        try {
          var h = Object.seal({x: 4}), k = new a(n([[h, 's']]));
          if ('s' != k.get(h) || 1 != k.size || k.get({x: 4}) ||
              k.set({x: 4}, 't') != k || 2 != k.size)
            return !1;
          var l = k.entries(), r = l.next();
          if (r.done || r.value[0] != h || 's' != r.value[1]) return !1;
          r = l.next();
          return r.done || 4 != r.value[0].x || 't' != r.value[1] ||
                  !l.next().done ?
              !1 :
              !0
        } catch (w) {
          return !1
        }
      }())
    return a;
  var b = new WeakMap, c = function(h) {
    this.i = {};
    this.g = f();
    this.size = 0;
    if (h) {
      h = n(h);
      for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
    }
  };
  c.prototype.set = function(h, k) {
    h = 0 === h ? 0 : h;
    var l = d(this, h);
    l.list || (l.list = this.i[l.id] = []);
    l.Oa ?
        l.Oa.value = k :
        (l.Oa = {next: this.g, Db: this.g.Db, head: this.g, key: h, value: k},
         l.list.push(l.Oa), this.g.Db.next = l.Oa, this.g.Db = l.Oa,
         this.size++);
    return this
  };
  c.prototype.delete = function(h) {
    h = d(this, h);
    return h.Oa && h.list ?
        (h.list.splice(h.index, 1), h.list.length || delete this.i[h.id],
         h.Oa.Db.next = h.Oa.next, h.Oa.next.Db = h.Oa.Db, h.Oa.head = null,
         this.size--, !0) :
        !1
  };
  c.prototype.clear = function() {
    this.i = {};
    this.g = this.g.Db = f();
    this.size = 0
  };
  c.prototype.has = function(h) {
    return !!d(this, h).Oa
  };
  c.prototype.get = function(h) {
    return (h = d(this, h).Oa) && h.value
  };
  c.prototype.entries = function() {
    return e(this, function(h) {
      return [h.key, h.value]
    })
  };
  c.prototype.keys = function() {
    return e(this, function(h) {
      return h.key
    })
  };
  c.prototype.values = function() {
    return e(this, function(h) {
      return h.value
    })
  };
  c.prototype.forEach = function(h, k) {
    for (var l = this.entries(), r; !(r = l.next()).done;)
      r = r.value, h.call(k, r[1], r[0], this)
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var d = function(h, k) {
    var l = k && typeof k;
    'object' == l || 'function' == l ?
        b.has(k) ? l = b.get(k) : (l = '' + ++g, b.set(k, l)) :
        l = 'p_' + k;
    var r = h.i[l];
    if (r && Da(h.i, l))
      for (h = 0; h < r.length; h++) {
        var w = r[h];
        if (k !== k && w.key !== w.key || k === w.key) return {
            id: l, list: r, index: h, Oa: w
          }
      }
    return {
      id: l, list: r, index: -1, Oa: void 0
    }
  }, e = function(h, k) {
    var l = h.g;
    return ia(function() {
      if (l) {
        for (; l.head != h.g;) l = l.Db;
        for (; l.next != l.head;) return l = l.next, {done: !1, value: k(l)};
        l = null
      }
      return {
        done: !0, value: void 0
      }
    })
  }, f = function() {
    var h = {};
    return h.Db = h.next = h.head = h
  }, g = 0;
  return c
});
var Ea = 'function' == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d)
      for (var e in d) Da(d, e) && (a[e] = d[e])
  }
  return a
};
ha('Object.assign', function(a) {
  return a || Ea
});
var Fa = function(a, b) {
  a instanceof String && (a += '');
  var c = 0, d = !1, e = {
    next: function() {
      if (!d && c < a.length) {
        var f = c++;
        return {
          value: b(f, a[f]), done: !1
        }
      }
      d = !0;
      return {
        done: !0, value: void 0
      }
    }
  };
  e[Symbol.iterator] = function() {
    return e
  };
  return e
};
ha('Array.prototype.entries', function(a) {
  return a ? a : function() {
    return Fa(this, function(b, c) {
      return [b, c]
    })
  }
});
ha('Array.prototype.values', function(a) {
  return a ? a : function() {
    return Fa(this, function(b, c) {
      return c
    })
  }
});
ha('Array.prototype.keys', function(a) {
  return a ? a : function() {
    return Fa(this, function(b) {
      return b
    })
  }
});
ha('Array.from', function(a) {
  return a ? a : function(b, c, d) {
    c = null != c ? c : function(h) {
      return h
    };
    var e = [],
        f = 'undefined' != typeof Symbol && Symbol.iterator &&
        b[Symbol.iterator];
    if ('function' == typeof f) {
      b = f.call(b);
      for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
    } else
      for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
    return e
  }
});
ha('Array.prototype.flat', function(a) {
  return a ? a : function(b) {
    b = void 0 === b ? 1 : b;
    for (var c = [], d = 0; d < this.length; d++) {
      var e = this[d];
      Array.isArray(e) && 0 < b ?
          (e = Array.prototype.flat.call(e, b - 1), c.push.apply(c, e)) :
          c.push(e)
    }
    return c
  }
});
ha('Set', function(a) {
  if (function() {
        if (!a || 'function' != typeof a || !a.prototype.entries ||
            'function' != typeof Object.seal)
          return !1;
        try {
          var c = Object.seal({x: 4}), d = new a(n([c]));
          if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size ||
              d.add({x: 4}) != d || 2 != d.size)
            return !1;
          var e = d.entries(), f = e.next();
          if (f.done || f.value[0] != c || f.value[1] != c) return !1;
          f = e.next();
          return f.done || f.value[0] == c || 4 != f.value[0].x ||
                  f.value[1] != f.value[0] ?
              !1 :
              e.next().done
        } catch (g) {
          return !1
        }
      }())
    return a;
  var b = function(c) {
    this.g = new Map;
    if (c) {
      c = n(c);
      for (var d; !(d = c.next()).done;) this.add(d.value)
    }
    this.size = this.g.size
  };
  b.prototype.add = function(c) {
    c = 0 === c ? 0 : c;
    this.g.set(c, c);
    this.size = this.g.size;
    return this
  };
  b.prototype.delete = function(c) {
    c = this.g.delete(c);
    this.size = this.g.size;
    return c
  };
  b.prototype.clear = function() {
    this.g.clear();
    this.size = 0
  };
  b.prototype.has = function(c) {
    return this.g.has(c)
  };
  b.prototype.entries = function() {
    return this.g.entries()
  };
  b.prototype.values = function() {
    return this.g.values()
  };
  b.prototype.keys = b.prototype.values;
  b.prototype[Symbol.iterator] = b.prototype.values;
  b.prototype.forEach = function(c, d) {
    var e = this;
    this.g.forEach(function(f) {
      return c.call(d, f, f, e)
    })
  };
  return b
});
var Ga = Ga || {}, Ha = this || self, Ia = function() {}, Ja = function(a) {
  a.Yc = void 0;
  a.wa = function() {
    return a.Yc ? a.Yc : a.Yc = new a
  }
}, Ka = function(a) {
  var b = typeof a;
  b = 'object' != b ? b : a ? Array.isArray(a) ? 'array' : b : 'null';
  return 'array' == b || 'object' == b && 'number' == typeof a.length
}, La = function(a) {
  var b = typeof a;
  return 'object' == b && null != a || 'function' == b
}, Ma = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
}, Na = function(a, b, c) {
  if (!a) throw Error();
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
}, Oa = function(a, b, c) {
  Function.prototype.bind &&
          -1 != Function.prototype.bind.toString().indexOf('native code') ?
      Oa = Ma :
      Oa = Na;
  return Oa.apply(null, arguments)
}, Pa = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d)
  }
}, Qa = function(a, b) {
  a = a.split('.');
  var c = Ha;
  a[0] in c || 'undefined' == typeof c.execScript ||
      c.execScript('var ' + a[0]);
  for (var d; a.length && (d = a.shift());)
    a.length || void 0 === b ?
        c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} :
        c[d] = b
}, Ra = function(a, b) {
  function c() {}
  c.prototype = b.prototype;
  a.Wb = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.tf = function(d, e, f) {
    for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
      g[h - 2] = arguments[h];
    return b.prototype[e].apply(d, g)
  }
}, Sa = function(a) {
  return a
};
var Ua = function(a) {
  this.Nb = a;
  this.j = !1;
  this.v = []
};
Ua.prototype.i = function() {
  if (!this.j) {
    this.j = !0;
    for (var a = n(this.v), b = a.next(); !b.done; b = a.next())
      b = b.value, b()
  }
};
Ua.prototype.preload = function() {};
Ua.prototype.Kc = function() {
  return this.j
};
var Va = function(a, b) {
  a.j ? b() : a.v.push(b)
}, Wa = function(a, b) {
  Promise
      .all(a.map(function(c) {
        return c.preload()
      }))
      .then(b)
};
var Ya = function(a) {
  Ua.call(this, a);
  this.image = new Image
};
p(Ya, Ua);
Ya.prototype.preload = function() {
  var a = this;
  if (this.image.src) return Promise.resolve(this.image);
  var b, c = new Promise(function(e) {
           return b = e
         }),
         d = function() {
           a.i();
           b(a.image)
         };
  this.image.decode ? (this.image.src = this.Nb,
                       this.image.decode().then(
                           d,
                           function(e) {
                             console.error(e);
                             d()
                           })) :
                      (this.image.onload = d, this.image.src = this.Nb);
  (this.image.complete || 'complete' == this.image.readyState) && d();
  return c
};
var ab = function(a) {
  var b = new Image;
  b.onerror = b.onload = b.onabort = function() {
    delete Za[$a]
  };
  Za[$a] = b;
  b.src = '/gen_204?atyp=i&ct=doodle&cad=' + a + '&zx=' + Date.now();
  $a++
}, Za = [], $a = 0;
var bb;
var cb = Array.prototype.indexOf ? function(a, b) {
  return Array.prototype.indexOf.call(a, b, void 0)
} : function(a, b) {
  if ('string' === typeof a)
    return 'string' !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
  for (var c = 0; c < a.length; c++)
    if (c in a && a[c] === b) return c;
  return -1
}, db = Array.prototype.forEach ? function(a, b, c) {
  Array.prototype.forEach.call(a, b, c)
} : function(a, b, c) {
  for (var d = a.length, e = 'string' === typeof a ? a.split('') : a, f = 0;
       f < d; f++)
    f in e && b.call(c, e[f], f, a)
}, eb = Array.prototype.filter ? function(a, b) {
  return Array.prototype.filter.call(a, b, void 0)
} : function(a, b) {
  for (var c = a.length, d = [], e = 0,
           f = 'string' === typeof a ? a.split('') : a, g = 0;
       g < c; g++)
    if (g in f) {
      var h = f[g];
      b.call(void 0, h, g, a) && (d[e++] = h)
    }
  return d
}, fb = Array.prototype.reduce ? function(a, b, c) {
  return Array.prototype.reduce.call(a, b, c)
} : function(a, b, c) {
  var d = c;
  db(a, function(e, f) {
    d = b.call(void 0, d, e, f, a)
  });
  return d
};
function gb(a, b) {
  a: {
    for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0;
         e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) {
      b = e;
      break a
    } b = -1
  } return 0 > b ?
                              null :
      'string' === typeof a ? a.charAt(b) :
                              a[b]
}
function hb(a, b) {
  b = cb(a, b);
  var c;
  (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
  return c
}
function ib(a) {
  return Array.prototype.concat.apply([], arguments)
}
function jb(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
    return c
  }
  return []
}
function kb(a, b) {
  if (!Ka(a) || !Ka(b) || a.length != b.length) return !1;
  for (var c = a.length, d = lb, e = 0; e < c; e++)
    if (!d(a[e], b[e])) return !1;
  return !0
}
function lb(a, b) {
  return a === b
}
function mb(a) {
  for (var b = Math.random, c = a.length - 1; 0 < c; c--) {
    var d = Math.floor(b() * (c + 1)), e = a[c];
    a[c] = a[d];
    a[d] = e
  }
};
var nb =
        function(a, b, c) {
  for (var d in a) b.call(c, a[d], d, a)
},
    ob =
        'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'
            .split(' '),
    pb = function(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < ob.length; f++)
          c = ob[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
      }
    };
var qb;
var rb =
        /[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]/,
    sb =
        /^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]/,
    tb = /^http:\/\/.*/, ub = /\s+/, vb = /[\d\u06f0-\u06f9]/;
var wb = String.prototype.trim ?
    function(a) {
      return a.trim()
    } :
    function(a) {
      return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    },
    xb = /&/g, yb = /</g, zb = />/g, Ab = /"/g, Bb = /'/g, Cb = /\x00/g,
    Db = /[\x00&<>"']/, Eb = function(a, b) {
      return -1 != a.indexOf(b)
    }, Fb = function(a, b) {
      return a < b ? -1 : a > b ? 1 : 0
    };
var Hb = function(a, b) {
  this.j = b === Gb ? a : ''
};
Hb.prototype.Wc = !0;
Hb.prototype.g = function() {
  return this.j.toString()
};
Hb.prototype.Md = !0;
Hb.prototype.i = function() {
  return 1
};
var Ib = function(a) {
  return a instanceof Hb && a.constructor === Hb ? a.j : 'type_error:SafeUrl'
}, Jb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i, Kb = function(a) {
  if (a instanceof Hb) return a;
  a = 'object' == typeof a && a.Wc ? a.g() : String(a);
  Jb.test(a) || (a = 'about:invalid#zClosurez');
  return new Hb(a, Gb)
}, Gb = {};
var Lb;
a: {
  var Mb = Ha.navigator; if (Mb) {
    var Nb = Mb.userAgent;
    if (Nb) {
      Lb = Nb;
      break a
    }
  } Lb = ''
};
var Pb = function(a, b, c) {
  this.j = c === Ob ? a : '';
  this.o = b
};
Pb.prototype.Md = !0;
Pb.prototype.i = function() {
  return this.o
};
Pb.prototype.Wc = !0;
Pb.prototype.g = function() {
  return this.j.toString()
};
var Qb = function(a) {
  return a instanceof Pb && a.constructor === Pb ? a.j : 'type_error:SafeHtml'
}, Sb = function(a) {
  if (a instanceof Pb) return a;
  var b = 'object' == typeof a, c = null;
  b && a.Md && (c = a.i());
  a = b && a.Wc ? a.g() : String(a);
  Db.test(a) &&
      (-1 != a.indexOf('&') && (a = a.replace(xb, '&amp;')),
       -1 != a.indexOf('<') && (a = a.replace(yb, '&lt;')),
       -1 != a.indexOf('>') && (a = a.replace(zb, '&gt;')),
       -1 != a.indexOf('"') && (a = a.replace(Ab, '&quot;')),
       -1 != a.indexOf('\'') && (a = a.replace(Bb, '&#39;')),
       -1 != a.indexOf('\x00') && (a = a.replace(Cb, '&#0;')));
  return Rb(a, c)
}, Ob = {}, Rb = function(a, b) {
  if (void 0 === qb) {
    var c = null;
    var d = Ha.trustedTypes;
    if (d && d.createPolicy) {
      try {
        c = d.createPolicy(
            'goog#html',
            {createHTML: Sa, createScript: Sa, createScriptURL: Sa})
      } catch (e) {
        Ha.console && Ha.console.error(e.message)
      }
      qb = c
    } else
      qb = c
  }
  a = (c = qb) ? c.createHTML(a) : a;
  return new Pb(a, b, Ob)
}, Tb = new Pb(Ha.trustedTypes && Ha.trustedTypes.emptyHTML || '', 0, Ob);
var Ub =
        function(a) {
  var b = !1, c;
  return function() {
    b || (c = a(), b = !0);
    return c
  }
}(function() {
  var a = document.createElement('div'), b = document.createElement('div');
  b.appendChild(document.createElement('div'));
  a.appendChild(b);
  b = a.firstChild.firstChild;
  a.innerHTML = Qb(Tb);
  return !b.parentElement
}),
    Vb = function(a) {
      a = a instanceof Hb ? a : Kb(a);
      Ha.open(Ib(a), '', void 0, void 0)
    };
var Wb = function(a, b) {
  return a + Math.random() * (b - a)
}, Xb = function(a, b) {
  return Math.min(Math.max(a, 0), b)
}, q = function(a, b, c) {
  return a + c * (b - a)
}, Yb = function(a, b) {
  a = 180 * Math.atan2(b - 0, a - 0) / Math.PI % 360;
  return 0 > 360 * a ? a + 360 : a
}, Zb = function(a) {
  return fb(arguments, function(b, c) {
    return b + c
  }, 0)
}, ac = function(a) {
  return Zb.apply(null, arguments) / arguments.length
};
var bc = function(a, b) {
  this.i = {};
  this.g = [];
  this.j = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) throw Error('m');
    for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
  } else if (a)
    if (a instanceof bc)
      for (c = a.Bb(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
    else
      for (d in a) this.set(d, a[d])
};
bc.prototype.tb = function() {
  cc(this);
  for (var a = [], b = 0; b < this.g.length; b++) a.push(this.i[this.g[b]]);
  return a
};
bc.prototype.Bb = function() {
  cc(this);
  return this.g.concat()
};
var cc = function(a) {
  if (a.j != a.g.length) {
    for (var b = 0, c = 0; b < a.g.length;) {
      var d = a.g[b];
      dc(a.i, d) && (a.g[c++] = d);
      b++
    }
    a.g.length = c
  }
  if (a.j != a.g.length) {
    var e = {};
    for (c = b = 0; b < a.g.length;)
      d = a.g[b], dc(e, d) || (a.g[c++] = d, e[d] = 1), b++;
    a.g.length = c
  }
};
bc.prototype.get = function(a, b) {
  return dc(this.i, a) ? this.i[a] : b
};
bc.prototype.set = function(a, b) {
  dc(this.i, a) || (this.j++, this.g.push(a));
  this.i[a] = b
};
bc.prototype.forEach = function(a, b) {
  for (var c = this.Bb(), d = 0; d < c.length; d++) {
    var e = c[d], f = this.get(e);
    a.call(b, f, e, this)
  }
};
var dc = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
};
var ec = function(a) {
  if (a.tb && 'function' == typeof a.tb) return a.tb();
  if ('string' === typeof a) return a.split('');
  if (Ka(a)) {
    for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
    return b
  }
  b = [];
  c = 0;
  for (d in a) b[c++] = a[d];
  return b
}, fc = function(a, b) {
  if (a.forEach && 'function' == typeof a.forEach)
    a.forEach(b, void 0);
  else if (Ka(a) || 'string' === typeof a)
    db(a, b, void 0);
  else {
    if (a.Bb && 'function' == typeof a.Bb)
      var c = a.Bb();
    else if (a.tb && 'function' == typeof a.tb)
      c = void 0;
    else if (Ka(a) || 'string' === typeof a) {
      c = [];
      for (var d = a.length, e = 0; e < d; e++) c.push(e)
    } else
      for (e in c = [], d = 0, a) c[d++] = e;
    d = ec(a);
    e = d.length;
    for (var f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a)
  }
};
var gc =
        /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
    hc = function(a, b) {
      if (a) {
        a = a.split('&');
        for (var c = 0; c < a.length; c++) {
          var d = a[c].indexOf('='), e = null;
          if (0 <= d) {
            var f = a[c].substring(0, d);
            e = a[c].substring(d + 1)
          } else
            f = a[c];
          b(f, e ? decodeURIComponent(e.replace(/\+/g, ' ')) : '')
        }
      }
    };
var ic = function(a) {
  this.j = this.H = this.o = '';
  this.S = null;
  this.v = this.i = '';
  this.s = !1;
  var b;
  a instanceof ic ?
      (this.s = a.s, jc(this, a.o), this.H = a.H, this.j = a.j, kc(this, a.S),
       this.i = a.i, lc(this, mc(a.g)), this.v = a.v) :
      a && (b = String(a).match(gc)) ?
      (this.s = !1, jc(this, b[1] || '', !0), this.H = nc(b[2] || ''),
       this.j = nc(b[3] || '', !0), kc(this, b[4]), this.i = nc(b[5] || '', !0),
       lc(this, b[6] || '', !0), this.v = nc(b[7] || '')) :
      (this.s = !1, this.g = new oc(null, this.s))
};
ic.prototype.toString = function() {
  var a = [], b = this.o;
  b && a.push(pc(b, qc, !0), ':');
  var c = this.j;
  if (c || 'file' == b)
    a.push('//'), (b = this.H) && a.push(pc(b, qc, !0), '@'),
        a.push(encodeURIComponent(String(c)).replace(
            /%25([0-9a-fA-F]{2})/g, '%$1')),
        c = this.S, null != c && a.push(':', String(c));
  if (c = this.i)
    this.j && '/' != c.charAt(0) && a.push('/'),
        a.push(pc(c, '/' == c.charAt(0) ? rc : sc, !0));
  (c = this.g.toString()) && a.push('?', c);
  (c = this.v) && a.push('#', pc(c, tc));
  return a.join('')
};
ic.prototype.resolve = function(a) {
  var b = new ic(this), c = !!a.o;
  c ? jc(b, a.o) : c = !!a.H;
  c ? b.H = a.H : c = !!a.j;
  c ? b.j = a.j : c = null != a.S;
  var d = a.i;
  if (c)
    kc(b, a.S);
  else if (c = !!a.i) {
    if ('/' != d.charAt(0))
      if (this.j && !this.i)
        d = '/' + d;
      else {
        var e = b.i.lastIndexOf('/');
        -1 != e && (d = b.i.substr(0, e + 1) + d)
      }
    e = d;
    if ('..' == e || '.' == e)
      d = '';
    else if (Eb(e, './') || Eb(e, '/.')) {
      d = 0 == e.lastIndexOf('/', 0);
      e = e.split('/');
      for (var f = [], g = 0; g < e.length;) {
        var h = e[g++];
        '.' == h ? d && g == e.length && f.push('') :
            '..' == h ?
                   ((1 < f.length || 1 == f.length && '' != f[0]) && f.pop(),
                    d && g == e.length && f.push('')) :
                   (f.push(h), d = !0)
      }
      d = f.join('/')
    } else
      d = e
  }
  c ? b.i = d : c = '' !== a.g.toString();
  c ? lc(b, mc(a.g)) : c = !!a.v;
  c && (b.v = a.v);
  return b
};
var jc =
        function(a, b, c) {
  a.o = c ? nc(b, !0) : b;
  a.o && (a.o = a.o.replace(/:$/, ''))
},
    kc =
        function(a, b) {
      if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b) throw Error('n`' + b);
        a.S = b
      } else
        a.S = null
    },
    lc =
        function(a, b, c) {
      b instanceof oc ? (a.g = b, uc(a.g, a.s)) :
                        (c || (b = pc(b, vc)), a.g = new oc(b, a.s))
    },
    nc =
        function(a, b) {
      return a ?
          b ? decodeURI(a.replace(/%25/g, '%2525')) : decodeURIComponent(a) :
          ''
    },
    pc =
        function(a, b, c) {
      return 'string' === typeof a ?
          (a = encodeURI(a).replace(b, wc),
           c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), a) :
          null
    },
    wc =
        function(a) {
      a = a.charCodeAt(0);
      return '%' + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    },
    qc = /[#\/\?@]/g, sc = /[#\?:]/g, rc = /[#\?]/g, vc = /[#\?@]/g, tc = /#/g,
    oc = function(a, b) {
      this.i = this.g = null;
      this.j = a || null;
      this.o = !!b
    }, xc = function(a) {
      a.g ||
          (a.g = new bc, a.i = 0,
           a.j && hc(a.j, function(b, c) {
             a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c)
           }))
    };
oc.prototype.add = function(a, b) {
  xc(this);
  this.j = null;
  a = yc(this, a);
  var c = this.g.get(a);
  c || this.g.set(a, c = []);
  c.push(b);
  this.i += 1;
  return this
};
var zc = function(a, b) {
  xc(a);
  b = yc(a, b);
  dc(a.g.i, b) &&
      (a.j = null, a.i -= a.g.get(b).length, a = a.g,
       dc(a.i, b) && (delete a.i[b], a.j--, a.g.length > 2 * a.j && cc(a)))
}, Ac = function(a, b) {
  xc(a);
  b = yc(a, b);
  return dc(a.g.i, b)
};
m = oc.prototype;
m.forEach = function(a, b) {
  xc(this);
  this.g.forEach(function(c, d) {
    db(c, function(e) {
      a.call(b, e, d, this)
    }, this)
  }, this)
};
m.Bb = function() {
  xc(this);
  for (var a = this.g.tb(), b = this.g.Bb(), c = [], d = 0; d < b.length; d++)
    for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
  return c
};
m.tb = function(a) {
  xc(this);
  var b = [];
  if ('string' === typeof a)
    Ac(this, a) && (b = ib(b, this.g.get(yc(this, a))));
  else {
    a = this.g.tb();
    for (var c = 0; c < a.length; c++) b = ib(b, a[c])
  }
  return b
};
m.set = function(a, b) {
  xc(this);
  this.j = null;
  a = yc(this, a);
  Ac(this, a) && (this.i -= this.g.get(a).length);
  this.g.set(a, [b]);
  this.i += 1;
  return this
};
m.get = function(a, b) {
  if (!a) return b;
  a = this.tb(a);
  return 0 < a.length ? String(a[0]) : b
};
m.toString = function() {
  if (this.j) return this.j;
  if (!this.g) return '';
  for (var a = [], b = this.g.Bb(), c = 0; c < b.length; c++) {
    var d = b[c], e = encodeURIComponent(String(d));
    d = this.tb(d);
    for (var f = 0; f < d.length; f++) {
      var g = e;
      '' !== d[f] && (g += '=' + encodeURIComponent(String(d[f])));
      a.push(g)
    }
  }
  return this.j = a.join('&')
};
var mc = function(a) {
  var b = new oc;
  b.j = a.j;
  a.g && (b.g = new bc(a.g), b.i = a.i);
  return b
}, yc = function(a, b) {
  b = String(b);
  a.o && (b = b.toLowerCase());
  return b
}, uc = function(a, b) {
  b && !a.o && (xc(a), a.j = null, a.g.forEach(function(c, d) {
    var e = d.toLowerCase();
    d != e &&
        (zc(this, d), zc(this, e),
         0 < c.length &&
             (this.j = null, this.g.set(yc(this, e), jb(c)),
              this.i += c.length))
  }, a));
  a.o = b
};
var Bc = navigator.userAgent, Cc = new ic(location.href),
    Dc = 'MacIntel' === navigator.platform && 1 < navigator.maxTouchPoints,
    Ec = Bc.includes('iPad') || Bc.includes('iPhone') || Bc.includes('iPod') ||
    Dc,
    Fc = Bc.toLowerCase().includes('gsa') || Bc.includes('GoogleApp'),
    Gc = Fc && Ec, Hc = Fc && !Ec,
    Ic = Ec || Bc.includes('Android') || Bc.includes('Mobile') ||
    Bc.includes('Silk') || Bc.includes('UCBrowser') || Bc.includes('UCWEB'),
    Jc = !!document.querySelector('body.hp');
Bc.includes('GT-I9300') && Bc.includes('Chrome');
var Kc = Cc.i.includes('/logos/') && Cc.i.includes('.html'), Mc = function() {
  return !!document.getElementById('fkbx') || Lc()
}, Lc = function() {
  var a = Cc.g.get('ntp');
  return '1' == a || '2' == a
}, Nc = function() {
  return '1' == Cc.g.get('fpdoodle') && !!document.getElementById('fpdoodle')
}, Oc = function() {
  return !!document.querySelector('body#iframedoodle')
};
var Pc =
        function(a, b) {
  for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
  if (a)
    for (d = 0; d < c.length; d += 2) {
      var e = c[d], f = c[d + 1], g = a.style;
      g && e in g ? g[e] = f : e in a && (a[e] = f)
    }
},
    Qc = Date.now,
    Rc =
        function() {
      return self.performance.now()
    },
    Sc = ['Moz', 'ms', 'O', 'webkit'],
    Tc =
        function(a, b, c) {
      if (a) {
        for (var d = n(Sc), e = d.next(); !e.done; e = d.next())
          a.style[e.value + b] = c;
        a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c
      }
    },
    Uc = ['', 'moz', 'ms', 'o', 'webkit'],
    Vc =
        function(a, b) {
      if (!a) return null;
      for (var c = n(Uc), d = c.next(); !d.done; d = c.next()) {
        d = d.value;
        var e = b;
        0 < d.length && (e = b.charAt(0).toUpperCase() + b.substr(1));
        d += e;
        if ('undefined' != typeof a[d]) return d
      }
      return null
    },
    Xc =
        function(a) {
      var b = google.doodle ? google.doodle.url : '';
      b && Wc(b, a)
    },
    Wc =
        function(a, b) {
      (b = (b = b && !Gc) || Lc()) ?
          Vb(a) :
          (b = window.top.location, a = a instanceof Hb ? a : Kb(a),
           b.assign(Ib(a)))
    },
    Yc =
        function(a, b) {
      var c;
      return (c = window.google && void 0 !== window.google.doodle ?
                  window.google.doodle :
                  null) &&
              void 0 != c[a] ?
          c[a] :
          b
    },
    Zc =
        function(a) {
      return 0 == a.indexOf('//') ? 'https:' + a : a
    },
    $c =
        function() {
      return Zc(Yc('shortlink', null) || '//www.google.com/?doodle=144867964')
    },
    ad =
        function(a) {
      return Zc(Yc(a, null) || $c())
    },
    bd =
        function() {
      var a = Yc('doodle_args', {}).is_dogfood;
      return null != a ? a : !1
    },
    cd = Yc('alt', ''), dd = Yc('hl', 'en'), ed = Yc('gl', ''),
    gd = function(a, b, c) {
      var d = Math.max(0, c - 230) +
          (document.querySelector('div.og-pdp') ? 36 : 12);
      Pc(a, 'width', b + 'px', 'height', c + 'px');
      fd(d)
    }, fd = function(a) {
      a += 'px';
      var b = document.getElementById('lga');
      b && Pc(b, 'marginBottom', a);
      Mc() ||
          ((b = document.getElementById('searchform')) &&
               Pc(b, 'transform', 'translateY(' + a + ')'),
           a = new UIEvent(
               'resize', {bubbles: !1, uf: !1, view: window, detail: 0}),
           window.dispatchEvent(a))
    }, hd = null, id = null, jd = null, kd = function(a, b, c) {
      Mc() && (a += '&ntp=1');
      b ? (hd ||
               ((b = document.getElementById('hplogoved')) ?
                    hd = b.getAttribute('data-ved') :
                    Oc() && Ac(Cc.g, 'ved') && (hd = Cc.g.get('ved'))),
           (b = hd) && (a += '&ved=' + b)) :
          c &&
              (id ||
                   ((b = document.getElementById('hplogoshareved')) ?
                        id = b.getAttribute('data-ved') :
                        Oc() && Ac(Cc.g, 'sved') && (id = Cc.g.get('sved'))),
               (b = id) && (a += '&ved=' + b));
      -1 == a.search('&ei=') &&
          (a += '&ei=',
           jd ||
               (window.google && window.google.kEI && window.google.kEI.length ?
                    jd = window.google.kEI :
                    Oc() && Ac(Cc.g, 'ei') && (jd = Cc.g.get('ei'))),
           (b = jd) && (a += b));
      window.google && window.google.log ? window.google.log('doodle', a) :
                                           ab(a)
    };
var ld = function(a, b) {
  this.g = [];
  this.i = [];
  b = n(b);
  for (var c = b.next(); !c.done; c = b.next()) {
    var d = c.value;
    c = new Ya(a + d.filename);
    d = d.size;
    this.g.push(c);
    this.i.push(d)
  }
}, md = function(a) {
  return 'number' === typeof a ? a : a[0]
};
ld.prototype.preload = function(a, b) {
  var c = nd(this, a);
  return (new Promise(function(d) {
           Va(c, d);
           c.preload()
         }))
      .then(function() {
        return b && b()
      })
};
ld.prototype.Kc = function() {
  return nd(this, void 0).Kc()
};
var nd = function(a, b) {
  return a.g[md(b)]
};
ld.prototype.Ic = function() {
  return nd(this, void 0).image
};
var od = function(a, b) {
  return b[3]
};
ld.prototype.Fa = function(a) {
  return a[4]
};
ld.prototype.Gb = function(a) {
  return a[5] || 1
};
ld.prototype.Ca = function(a, b, c, d, e, f, g) {
  e = void 0 === e ? 1 : e;
  f = void 0 === f ? !1 : f;
  g = void 0 === g ? !1 : g;
  var h = void 0 === h ? !1 : h;
  var k = a[3], l = this.Fa(a);
  b.save();
  b.translate(c, d);
  b.scale(g ? -e : e, h ? -e : e);
  var r = -k * (f ? .5 : g ? 1 : 0), w = a[1], B = a[2], z = a[3], C = a[4];
  void 0 == k     ? (c = w, d = B, e = z, g = C, f = r = 0, k = z, l = C) :
      void 0 == r ? (c = w, d = B, e = z, g = C, f = r = 0) :
                    (c = w + 0, d = B + 0, e = k, g = l,
                     f = -l *
                         (f     ? .5 :
                              h ? 1 :
                                  0));
  c < w && (h = w - c, c = w, e -= h, r += h, k -= h);
  d < B && (h = B - d, d = B, g -= h, f += h, l -= h);
  c + e > w + z && (w = c + e - (w + z), e -= w, k -= w);
  d + g > B + C && (B = d + g - (B + C), g -= B, l -= B);
  a = nd(this, a);
  if (!a.Kc()) throw Error('p');
  0 < e && 0 < g && b.drawImage(a.image, c, d, e, g, r, f, k, l);
  b.restore()
};
var pd = function(a, b, c) {
  c = void 0 === c ? 1 : c;
  var d = a.Gb(b);
  a = a.i[md(b)];
  return c * a[0] / d + 'px ' + c * a[1] / d + 'px'
}, rd = function(a) {
  var b = qd, c = document.createElement('div');
  Pc(c, 'position', 'absolute');
  Pc(c, 'userSelect', 'none', 'MozUserSelect', 'none', 'webkitUserSelect',
     'none', 'webkitTapHighlightColor', 'rgba(0,0,0,0)');
  c.unselectable = 'on';
  var d = a[3], e = b.Fa(a), f = b.Gb(a);
  f && 1 != f && b.i[md(a)] && (d = Math.floor(d / f), e = Math.floor(e / f));
  Pc(c, 'width', d + 'px', 'height', e + 'px');
  var g;
  d = g = void 0 === g ? 1 : g;
  d = void 0 === d ? 1 : d;
  e = b.Gb(a);
  a = [
    c,
    'url(' + nd(b, a).Nb + ') ' +
        (-(d * a[1] / e) + 'px ' + -(d * a[2] / e) + 'px/') + pd(b, a, g) +
        ' no-repeat',
    pd(b, a)
  ];
  b = a[0];
  c = a[2];
  Pc(b, 'background', a[1]);
  c && Pc(b, 'backgroundSize', c);
  return b
};
var td = function() {
  ld.call(this, '/logos/2020/halloween20/dev2/', sd)
};
p(td, ld);
Ja(td);
var sd =
        [
          {filename: 'window-fish-sprite.png', size: [354, 462]},
          {filename: 'sponge-sneeze-sprite.png', size: [580, 70]},
          {filename: 'level2sun-sprite.png', size: [778, 64]},
          {filename: 'symbols.png', size: [190, 32]},
          {filename: 'progress.png', size: [751, 884]},
          {filename: 'cat-sprites.png', size: [5001, 826]},
          {filename: 'cat-swim.png', size: [1317, 167]},
          {filename: 'ocean-bg-three-sprite.png', size: [700, 416]},
          {filename: 'ocean-bg-two-sprite.png', size: [700, 416]},
          {filename: 'ocean-bg-one-sprite.png', size: [700, 416]},
          {filename: 'ocean-sprite.png', size: [2676, 835]},
          {filename: 'ocean-boss-fight.png', size: [1590, 1879]},
          {filename: 'ocean-boss-fight-cinematic.png', size: [2121, 2750]},
          {filename: 'volcano-boss-fight.png', size: [5431, 1086]},
          {filename: 'volcano-boss-fight-cinematic.png', size: [7901, 723]},
          {filename: 'angler-sprite.png', size: [11745, 2127]},
          {filename: 'anenome-sprite.png', size: [1287, 196]},
          {filename: 'jellyfish-sprite.png', size: [3406, 950]},
          {filename: 'boops-sprite.png', size: [2048, 1126]},
          {filename: 'cta-png-sprite.png', size: [865, 242]},
          {filename: 'main-png-sprite.png', size: [1354, 1501]},
          {filename: 'level1-png-sprite.png', size: [3228, 1310]},
          {filename: 'level1-png1-sprite.png', size: [597, 111]},
          {filename: 'level1-jpg-sprite.png', size: [1051, 430]},
          {filename: 'gameover-png-sprite.png', size: [433, 222]},
          {filename: 'level2-png-sprite.png', size: [2017, 1137]},
          {filename: 'level2-jpg-sprite.png', size: [640, 360]},
          {filename: 'level3-png-sprite.png', size: [4450, 420]},
          {filename: 'level3-jpg-sprite.png', size: [1283, 360]},
          {filename: 'level4-png-sprite.png', size: [4686, 591]},
          {filename: 'level4-jpg-sprite.png', size: [640, 360]},
          {filename: 'level5-png-sprite.png', size: [1251, 1710]},
          {filename: 'level5-png1-sprite.png', size: [4187, 723]},
          {filename: 'level5-png2-sprite.png', size: [2566, 1165]},
          {filename: 'level5-png3-sprite.png', size: [4035, 360]},
          {filename: 'level5-jpg-sprite.png', size: [2703, 1069]},
          {filename: 'end-png-sprite.png', size: [3647, 812]},
          {filename: 'end-png1-sprite.png', size: [2428, 183]},
          {filename: 'end-jpg-sprite.png', size: [640, 360]},
          {filename: 'main-jpg-sprite.png', size: [1283, 280]},
          {filename: 'shield-sprite.png', size: [1986, 303]},
          {filename: 'vamp-squid-sprite.png', size: [7440, 1378]}
        ],
    ud = [20, 1296, 1210, 46, 24], vd = [20, 327, 1115, 43, 32],
    wd = [21, 3030, 643, 189, 124], xd = [20, 252, 1208, 68, 27],
    yd = [20, 1120, 1318, 69, 68], zd = [20, 962, 1347, 59, 53],
    Ad = [20, 67, 1347, 61, 53], Bd = [20, 768, 1342, 61, 53],
    Cd = [20, 67, 1347, 61, 53], Dd = [18, 1975, 737, 60, 22],
    Ed = [18, 1286, 0, 640, 360], Fd = [18, 0, 363, 640, 360],
    Gd = [18, 643, 363, 640, 360], Hd = [18, 1955, 946, 80, 65],
    Id = [18, 1955, 946, 80, 65], Jd = [18, 1286, 1061, 80, 65],
    Kd = [15, 8359, 726, 559, 360], Ld = [17, 2751, 761, 127, 161],
    Md = [17, 2051, 761, 137, 162], Nd = [17, 791, 702, 150, 171],
    Od = [41, 7234, 853, 206, 194], Pd = [41, 5621, 329, 253, 259],
    Qd = [41, 1659, 816, 234, 281], Rd = [24, 0, 103, 71, 71],
    Sd = [24, 362, 48, 71, 71], Td = [24, 370, 170, 45, 45],
    Ud = [24, 370, 122, 45, 45], Vd = [24, 148, 103, 71, 71],
    Wd = [24, 74, 103, 71, 71], Xd = [24, 0, 48, 178, 52],
    Yd = [24, 181, 48, 178, 52], Zd = [24, 296, 122, 71, 71],
    $d = [24, 222, 103, 71, 71], ae = [20, 0, 293, 122, 134],
    be = [20, 1101, 300, 122, 134], ce = [20, 1226, 300, 122, 134],
    de = [20, 614, 302, 122, 134], ee = [20, 739, 322, 122, 134],
    fe = [20, 864, 333, 122, 134], ge = [20, 375, 335, 122, 134],
    he = [20, 0, 430, 122, 134], ie = [20, 125, 430, 122, 134],
    je = [20, 250, 430, 122, 134], ke = [20, 989, 437, 122, 134],
    le = [20, 1114, 437, 122, 134], me = [20, 500, 439, 122, 134],
    ne = [20, 625, 459, 122, 134], oe = [20, 375, 472, 122, 134],
    pe = [20, 250, 567, 122, 134], qe = [20, 875, 574, 122, 134],
    re = [20, 1E3, 574, 122, 134], se = [20, 625, 596, 122, 134],
    te = [20, 750, 607, 122, 134], ue = [20, 375, 609, 122, 134],
    ve = [20, 0, 704, 122, 134], we = [20, 1125, 711, 122, 134],
    xe = [20, 375, 746, 122, 134], ye = [20, 0, 841, 122, 134],
    ze = [20, 250, 841, 122, 134], Ae = [20, 500, 850, 122, 134],
    Be = [20, 625, 870, 122, 134], Ce = [20, 875, 985, 122, 134],
    De = [22, 240, 0, 117, 111], Ee = [22, 360, 0, 117, 111],
    Fe = [22, 480, 0, 117, 111], Ge = [4, 676, 237, 64, 54],
    He = [4, 676, 294, 64, 54], Ie = [17, 258, 363, 225, 222],
    Je = [20, 871, 1122, 82, 78], Ke = [20, 956, 1122, 82, 78],
    Le = [20, 1041, 1122, 82, 78], Me = [20, 1126, 1122, 82, 78],
    Ne = [20, 496, 1124, 82, 78], Oe = [23, 643, 0, 408, 430],
    Pe = [10, 0, 0, 700, 549], Qe = [20, 989, 333, 102, 87],
    Re = [20, 500, 335, 102, 87], Se = [20, 1239, 437, 102, 87],
    Te = [20, 875, 470, 102, 87], Ue = [20, 875, 470, 102, 87],
    Ve = [23, 0, 0, 640, 360], We = [21, 2572, 643, 455, 65],
    Xe = [21, 2572, 711, 455, 65], Ye = [21, 2653, 1228, 78, 63],
    Ze = [21, 2916, 988, 50, 50], $e = [21, 2972, 873, 42, 31],
    af = [21, 2824, 1228, 42, 31], bf = [17, 643, 0, 640, 360],
    cf = [18, 0, 726, 640, 360], df = [18, 643, 726, 640, 360],
    ef = [15, 1286, 0, 640, 360], ff = [21, 2616, 1270, 20, 40],
    gf = [4, 676, 351, 43, 370], hf = [20, 955, 169, 143, 161],
    jf = [34, 3834, 230, 52, 61], kf = [31, 418, 624, 390, 360],
    lf = [31, 811, 624, 390, 360], mf = [31, 0, 936, 390, 360],
    nf = [31, 393, 987, 390, 360], of = [11, 1062, 257, 528, 254],
    pf = [11, 0, 710, 520, 193], qf = [11, 523, 710, 520, 193],
    rf = [11, 1046, 710, 520, 193], sf = [11, 0, 906, 520, 193],
    tf = [20, 653, 0, 179, 158], uf = [4, 0, 0, 512, 290],
    vf = [9, 0, 0, 700, 416], wf = [8, 0, 0, 700, 416],
    xf = [7, 0, 0, 700, 416], yf = [20, 579, 1225, 80, 77],
    zf = [20, 1172, 1238, 80, 77], Af = [20, 1255, 1238, 80, 77],
    Bf = [21, 3172, 1027, 50, 50], Cf = [20, 327, 1196, 81, 74],
    Df = [20, 411, 1196, 81, 74], Ef = [20, 375, 293, 87, 37],
    Ff = [24, 48, 177, 45, 45], Gf = [24, 0, 177, 45, 45],
    Hf = [24, 144, 177, 45, 45], If = [24, 96, 177, 45, 45],
    Jf = [24, 210, 0, 207, 45], Kf = [24, 240, 177, 45, 45],
    Lf = [24, 192, 177, 45, 45], Mf = [17, 1166, 363, 85, 56],
    Nf = [38, 0, 0, 640, 360], Of = [28, 643, 0, 640, 360],
    Pf = [[18, 0, 0, 640, 360], [18, 643, 0, 640, 360], Ed, Fd, Gd],
    Qf =
        [
          Hd, Id, [18, 1286, 993, 80, 65], [18, 1369, 993, 80, 65],
          [18, 1369, 993, 80, 65], [18, 1452, 993, 80, 65],
          [18, 1535, 993, 80, 65], [18, 1618, 1010, 80, 65],
          [18, 1701, 1010, 80, 65], [18, 1784, 1010, 80, 65],
          [18, 1955, 1014, 80, 65], [18, 1867, 1021, 80, 65], Jd
        ],
    Rf =
        [
          Nd, [17, 944, 702, 150, 171], [17, 154, 751, 150, 171],
          [17, 307, 751, 150, 171], [17, 1592, 761, 150, 171],
          [17, 1745, 761, 150, 171], [17, 1898, 761, 150, 171]
        ],
    Sf =
        [
          Od, [41, 7234, 1050, 206, 194], [41, 3540, 1100, 206, 194],
          [41, 3749, 1100, 206, 194], [41, 5449, 1137, 206, 194]
        ],
    Tf =
        [
          Pd,
          [41, 5621, 329, 253, 259],
          [41, 5877, 329, 253, 259],
          [41, 6133, 329, 253, 259],
          [41, 6389, 329, 253, 259],
          [41, 6645, 329, 253, 259],
          [41, 6901, 329, 253, 259],
          [41, 7157, 329, 253, 259],
          [41, 7157, 329, 253, 259],
          [41, 7157, 329, 253, 259],
          [41, 7157, 329, 253, 259],
          [41, 7157, 329, 253, 259],
          [41, 0, 554, 253, 259],
          [41, 256, 554, 253, 259],
          [41, 512, 554, 253, 259],
          [41, 768, 554, 253, 259],
          [41, 1024, 554, 253, 259],
          [41, 1280, 554, 253, 259],
          [41, 1536, 554, 253, 259],
          [41, 1792, 554, 253, 259],
          [41, 2048, 554, 253, 259],
          [41, 2304, 554, 253, 259],
          [41, 2304, 554, 253, 259],
          [41, 2560, 554, 253, 259],
          [41, 2816, 554, 253, 259],
          [41, 3072, 554, 253, 259],
          [41, 3328, 554, 253, 259],
          [41, 3584, 554, 253, 259],
          [41, 3840, 554, 253, 259],
          [41, 5621, 591, 253, 259],
          [41, 5621, 591, 253, 259],
          [41, 5621, 591, 253, 259],
          [41, 5621, 591, 253, 259],
          [41, 5621, 591, 253, 259],
          [41, 5621, 591, 253, 259],
          [41, 5621, 591, 253, 259],
          [41, 5877, 591, 253, 259],
          [41, 6133, 591, 253, 259],
          [41, 6389, 591, 253, 259],
          [41, 6645, 591, 253, 259],
          [41, 6901, 591, 253, 259],
          [41, 7157, 591, 253, 259],
          [41, 4096, 613, 253, 259],
          [41, 4352, 613, 253, 259],
          [41, 6901, 591, 253, 259],
          [41, 7157, 591, 253, 259],
          [41, 4608, 613, 253, 259],
          [41, 4352, 613, 253, 259],
          [41, 6901, 591, 253, 259],
          [41, 7157, 591, 253, 259],
          [41, 4608, 613, 253, 259]
        ],
    Uf =
        [
          Qd,
          [41, 1896, 816, 234, 281],
          [41, 2133, 816, 234, 281],
          [41, 2370, 816, 234, 281],
          [41, 2370, 816, 234, 281],
          [41, 2370, 816, 234, 281],
          [41, 2607, 816, 234, 281],
          [41, 2844, 816, 234, 281],
          [41, 3081, 816, 234, 281],
          [41, 3318, 816, 234, 281],
          [41, 3555, 816, 234, 281],
          [41, 3792, 816, 234, 281],
          [41, 5575, 853, 234, 281],
          [41, 5812, 853, 234, 281],
          [41, 6049, 853, 234, 281],
          [41, 6286, 853, 234, 281],
          [41, 6523, 853, 234, 281],
          [41, 6760, 853, 234, 281],
          [41, 6997, 853, 234, 281],
          [41, 4029, 875, 234, 281],
          [41, 4266, 875, 234, 281],
          [41, 4503, 875, 234, 281],
          [41, 4740, 897, 234, 281]
        ],
    Vf =
        [
          [19, 498, 83, 76, 76], [19, 577, 83, 76, 76], [19, 656, 83, 76, 76],
          [19, 735, 83, 76, 76], [19, 498, 162, 76, 76], [19, 577, 162, 76, 76],
          [19, 656, 162, 76, 76], [19, 735, 162, 76, 76], [19, 0, 166, 76, 76],
          [19, 79, 166, 76, 76], [19, 158, 166, 76, 76], [19, 735, 83, 76, 76],
          [19, 237, 166, 76, 76], [19, 316, 166, 76, 76],
          [19, 395, 166, 76, 76], [19, 395, 166, 76, 76]
        ],
    Wf =
        [
          [19, 0, 0, 80, 80], [19, 83, 0, 80, 80], [19, 166, 0, 80, 80],
          [19, 249, 0, 80, 80], [19, 332, 0, 80, 80], [19, 415, 0, 80, 80],
          [19, 498, 0, 80, 80], [19, 581, 0, 80, 80], [19, 664, 0, 80, 80],
          [19, 747, 0, 80, 80], [19, 0, 83, 80, 80], [19, 249, 0, 80, 80],
          [19, 83, 83, 80, 80], [19, 166, 83, 80, 80], [19, 249, 83, 80, 80],
          [19, 249, 83, 80, 80]
        ],
    Xf =
        [
          $e, [21, 2972, 907, 42, 31], [21, 2972, 941, 42, 31],
          [21, 2916, 1041, 42, 31], [21, 3174, 1080, 42, 31],
          [21, 3174, 1114, 42, 31], [21, 3174, 1148, 42, 31],
          [21, 2734, 1228, 42, 31], [21, 2779, 1228, 42, 31], af
        ],
    Yf =
        [
          [21, 2734, 1262, 41, 38], [21, 2778, 1262, 41, 38],
          [21, 2822, 1262, 41, 38], [21, 2866, 1268, 41, 38],
          [21, 2910, 1268, 41, 38], [21, 2954, 1268, 41, 38],
          [21, 2998, 1268, 41, 38], [21, 3042, 1268, 41, 38],
          [21, 3086, 1268, 41, 38], [21, 3130, 1268, 41, 38],
          [21, 3174, 1268, 41, 38], [21, 2572, 1270, 41, 38]
        ],
    Zf = [
      [11, 0, 514, 520, 193], [11, 523, 514, 520, 193],
      [11, 523, 514, 520, 193], [11, 1046, 514, 520, 193], pf, qf, rf, sf,
      [11, 0, 710, 520, 193]
    ];
var t = function(a, b) {
  this.x = void 0 !== a ? a : 0;
  this.y = void 0 !== b ? b : 0
}, $f = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y)
}, ag = function(a, b) {
  return new t(a.x - b.x, a.y - b.y)
}, bg = function(a, b) {
  return new t(a.x + b.x, a.y + b.y)
};
t.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this
};
t.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this
};
t.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this
};
t.prototype.scale = function(a, b) {
  this.x *= a;
  this.y *= 'number' === typeof b ? b : a;
  return this
};
document.getElementById('hplogo');
document.getElementById('hpcanvas');
var cg = new ic('https://www.google.com/doodles/halloween-2016');
cg.g.set('hl', dd);
var dg = cg.toString(), eg = new t(320, 180), fg = new t(370, 60);
td.wa();
td.wa();
var hg = function(a, b, c, d, e, f) {
  if (6 == arguments.length)
    gg(this, a, b, c, d, e, f);
  else {
    if (0 != arguments.length) throw Error('q');
    this.j = this.o = 1;
    this.s = this.v = this.i = this.g = 0
  }
}, ig = function(a) {
  return new hg(a.j, a.s, a.v, a.o, a.i, a.g)
}, gg = function(a, b, c, d, e, f, g) {
  if ('number' !== typeof b || 'number' !== typeof c || 'number' !== typeof d ||
      'number' !== typeof e || 'number' !== typeof f || 'number' !== typeof g)
    throw Error('r');
  a.j = b;
  a.s = c;
  a.v = d;
  a.o = e;
  a.i = f;
  a.g = g;
  return a
};
hg.prototype.scale = function(a, b) {
  this.j *= a;
  this.s *= a;
  this.v *= b;
  this.o *= b;
  return this
};
var jg = function(a, b, c) {
  a.i += b * a.j + c * a.v;
  a.g += b * a.s + c * a.o;
  return a
};
hg.prototype.rotate = function(a, b, c) {
  var d = new hg, e = Math.cos(a);
  a = Math.sin(a);
  b = gg(d, e, a, -a, e, b - b * e + c * a, c - b * a - c * e);
  return kg(this, b)
};
hg.prototype.toString = function() {
  return 'matrix(' + [this.j, this.s, this.v, this.o, this.i, this.g].join() +
      ')'
};
var kg = function(a, b) {
  var c = a.j, d = a.v;
  a.j = b.j * c + b.s * d;
  a.v = b.v * c + b.o * d;
  a.i += b.i * c + b.g * d;
  c = a.s;
  d = a.o;
  a.s = b.j * c + b.s * d;
  a.o = b.v * c + b.o * d;
  a.g += b.i * c + b.g * d;
  return a
};
hg.prototype.transform = function(a, b, c, d, e) {
  var f = b;
  for (b += 2 * e; f < b;) {
    e = a[f++];
    var g = a[f++];
    c[d++] = e * this.j + g * this.v + this.i;
    c[d++] = e * this.s + g * this.o + this.g
  }
};
var u = function() {
  this.Qa = new hg;
  this.opacity = 1;
  this.W = 0;
  this.Ba = !0;
  this.Ab = [];
  this.vb = null;
  this.Nc = this.Yb = this.nd = 0;
  this.La = new lg;
  this.Dc = null
};
u.prototype.Ta = function() {
  return this.Ba
};
u.prototype.Ja = function() {
  return this.Ab
};
u.prototype.getParent = function() {
  return this.vb
};
var v = function(a, b) {
  null != b.vb && b.vb.removeChild(b);
  b.vb = a;
  a.Ab.push(b);
  mg(b)
};
u.prototype.removeChild = function(a) {
  var b = this.Ab.indexOf(a);
  -1 != b && (this.Ab.splice(b, 1), a.vb = null);
  mg(a)
};
var x = function(a) {
  a.vb && a.vb.removeChild(a)
}, ng = function(a) {
  for (var b = 0; b < a.Ab.length; b++) a.Ab[b].vb = null;
  a.Ab = []
};
u.prototype.update = function() {};
u.prototype.Ca = function() {};
var y = function(a, b, c) {
  var d = a.Qa, e = -a.Qa.g;
  d.i += -a.Qa.i;
  d.g += e;
  d = a.Qa;
  e = void 0 === c ? b.y : c;
  d.i += void 0 === c ? b.x : b;
  d.g += e;
  mg(a)
}, A = function(a) {
  return new t(a.Qa.i, a.Qa.g)
};
u.prototype.setScale = function(a) {
  0 >= a && (a = 1E-4);
  this.Gb() && this.Qa.scale(1 / this.Qa.j, 1 / this.Qa.o);
  this.Qa.scale(a, a);
  mg(this)
};
u.prototype.Gb = function() {
  return this.Qa.j
};
u.prototype.rotate = function(a) {
  this.Nc += a;
  this.Qa.rotate(a, 0, 0);
  mg(this)
};
var og = function(a, b) {
  a.nd = b;
  mg(a)
}, pg = function(a) {
  if (!a.Dc) {
    var b = a.vb ? jg(kg(ig(pg(a.vb)), a.Qa), a.Yb, a.nd) :
                   jg(ig(a.Qa), a.Yb, a.nd);
    a.Dc = b
  }
  return a.Dc
}, mg = function(a) {
  a.Dc = null;
  for (var b = 0; b < a.Ab.length; b++) mg(a.Ab[b])
}, qg = function(a, b) {
  for (a.La.index = -1; null != a;) {
    var c = a.Ja();
    -1 == a.La.index && b(a) && (a.La.index = c.length);
    a.La.index++;
    a.La.index < c.length ? (c[a.La.index].La.index = -1, a = c[a.La.index]) :
                            a = a.getParent()
  }
}, lg = function() {
  this.i = this.g = this.index = 0
};
var rg = function() {
  u.call(this);
  this.v = !1
};
p(rg, u);
m = rg.prototype;
m.update = function(a) {
  this.v || (this.v = !0, this.hd());
  this.jd(a);
  this.Za() && this.Lc()
};
m.jd = function() {};
m.hd = function() {};
m.Lc = function() {};
m.Za = function() {
  return !1
};
var D = function(a) {
  rg.call(this);
  this.g = !1;
  this.hd = a
};
p(D, rg);
D.prototype.update = function(a) {
  this.g = !0;
  return rg.prototype.update.call(this, a)
};
D.prototype.Za = function() {
  return this.g
};
var E = function(a, b, c) {
  rg.call(this);
  this.duration = a;
  this.g = 0;
  b && (this.j = b);
  c && (this.S = c)
};
p(E, rg);
E.prototype.jd = function(a) {
  this.j && this.j(a)
};
E.prototype.Lc = function() {
  this.S && this.S()
};
E.prototype.update = function(a) {
  this.g += a;
  return rg.prototype.update.call(this, a)
};
E.prototype.Za = function() {
  return this.g >= this.duration
};
var sg = Number.POSITIVE_INFINITY;
var tg = function(a) {
  rg.call(this);
  this.actions = a
};
p(tg, rg);
tg.prototype.update = function(a) {
  rg.prototype.update.call(this, a);
  for (var b = n(this.actions), c = b.next(); !c.done; c = b.next())
    c = c.value, c.Za() || c.update(a)
};
tg.prototype.Za = function() {
  for (var a = n(this.actions), b = a.next(); !b.done; b = a.next())
    if (!b.value.Za()) return !1;
  return !0
};
var ug = function(a, b, c, d, e, f, g, h) {
  this.v = a;
  this.S = b;
  this.g = c;
  this.j = d;
  this.i = e;
  this.o = f;
  this.s = g;
  this.H = h
}, vg = function(a, b) {
  if (0 == b) return a.v;
  if (1 == b) return a.s;
  var c = q(a.v, a.g, b), d = q(a.g, a.i, b);
  a = q(a.i, a.s, b);
  c = q(c, d, b);
  d = q(d, a, b);
  return q(c, d, b)
}, wg = function(a, b) {
  if (0 == b) return a.S;
  if (1 == b) return a.H;
  var c = q(a.S, a.j, b), d = q(a.j, a.o, b);
  a = q(a.o, a.H, b);
  c = q(c, d, b);
  d = q(d, a, b);
  return q(c, d, b)
}, xg = function(a, b) {
  return new t(vg(a, b), wg(a, b))
}, yg = function(a, b) {
  var c = (b - a.v) / (a.s - a.v);
  if (0 >= c) return 0;
  if (1 <= c) return 1;
  for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
    f = vg(a, c);
    var h = (vg(a, c + 1E-6) - f) / 1E-6;
    if (1E-6 > Math.abs(f - b)) return c;
    if (1E-6 > Math.abs(h))
      break;
    else
      f < b ? d = c : e = c, c -= (f - b) / h
  }
  for (g = 0; 1E-6 < Math.abs(f - b) && 8 > g; g++)
    f < b ? (d = c, c = (c + e) / 2) : (e = c, c = (c + d) / 2), f = vg(a, c);
  return c
};
var zg = function(a, b, c) {
  var d = new ug(0, 0, a, b, c, 1, 1, 1);
  return function(e) {
    return wg(d, yg(d, e))
  }
}, Ag = zg(.25, .1, .25), Bg = function(a, b, c, d) {
  d = void 0 === d ? Ag : d;
  return b + d(a) * (c - b)
}, Cg = function(a) {
  return a
}, Dg = zg(.4, 0, 1), Eg = zg(0, 0, .6), Fg = zg(.6, 0, .4);
var F = function(a, b, c, d, e, f) {
  f = void 0 === f ? Cg : f;
  E.call(this, b, null, e);
  this.s = a;
  this.i = c;
  this.o = d;
  this.H = f
};
p(F, E);
F.prototype.update = function(a) {
  this.i || (this.i = A(this.s));
  a = E.prototype.update.call(this, a);
  var b = Xb(this.g / this.duration, 1), c = Bg(b, this.i.x, this.o.x, this.H);
  b = Bg(b, this.i.y, this.o.y, this.H);
  y(this.s, c, b);
  return a
};
var G = function() {
  u.call(this);
  this.v = [];
  this.$ = []
};
p(G, u);
G.prototype.update = function(a) {
  if (0 < this.v.length && 0 < a) {
    var b = this.v[0];
    b.update(a);
    b.Za() && this.v.length && this.v[0] === b && this.v.shift()
  }
  for (b = 0; b < this.$.length; b++)
    this.$[b].update(a), this.$[b].Za() && this.$.splice(b--, 1)
};
var H = function(a, b) {
  a.v.push(b)
}, I = function(a, b) {
  a.v.push(new E(b))
}, J = function(a, b, c) {
  a.v.push(new E(b, null, c))
}, Gg = function(a, b) {
  J(a, 0, function() {
    K(a, b)
  })
}, Hg = function(a, b, c, d, e, f) {
  a.v.push(new F(a, b, c, d, e, f))
}, L = function(a) {
  a.v = []
}, Ig = function(a) {
  a.$ = []
}, K = function(a, b) {
  a.$.push(b)
};
var Jg = function(a, b, c, d, e) {
  e = void 0 === e ? Cg : e;
  E.call(this, b, null, void 0 === d ? function() {} : d);
  this.o = a;
  this.i = c;
  this.s = e
};
p(Jg, E);
Jg.prototype.update = function(a) {
  E.prototype.update.call(this, a);
  a = xg(this.i, this.s(Xb(this.g / this.duration, 1)));
  y(this.o, a.x, a.y)
};
var Kg = function(a, b, c, d, e, f) {
  f = void 0 === f ? Cg : f;
  E.call(this, b, null, void 0 === e ? function() {} : e);
  this.i = a;
  this.easing = f;
  this.o = c;
  this.s = d
};
p(Kg, E);
Kg.prototype.update = function(a) {
  a = E.prototype.update.call(this, a);
  var b = Bg(Xb(this.g / this.duration, 1), this.o, this.s, this.easing);
  this.i.opacity = b;
  return a
};
var Lg = td.wa(), M = function(a, b) {
  G.call(this);
  this.V = this.ka = this.time = 0;
  this.S = this.i = null;
  this.Cb = !1;
  this.scale = 1;
  'number' === typeof a[0] ?
      this.i = {ya: a, duration: 0, x: 0, y: 0, z: null, children: null} :
      (this.S = a, this.i = this.S[this.V]);
  this.Lb = b ? b : Ia
};
p(M, G);
var Mg = function(a) {
  for (var b = 0, c = 0; c < a.length; c++)
    b += 0 < a[c].duration ? a[c].duration : 83;
  return b
}, N = function(a, b, c, d, e) {
  e = void 0 === e ? null : e;
  return a.map(function(f) {
    return {
      ya: f, duration: b, x: c, y: d, z: e, children: null
    }
  })
}, O = function(a, b, c, d, e) {
  a = N(a, b, c, d, e);
  0 < a.length && (a[a.length - 1].duration = 0);
  return a
}, Ng = function(a, b) {
  a = a.map(function(c) {
    var d = {ya: c[0], duration: b, x: c[1], y: c[2], z: null, children: null};
    4 == c.length && c[3] && (d.children = Ng(c[3], b));
    return d
  });
  0 < a.length && (a[a.length - 1].duration = 0);
  return a
};
M.prototype.Ra = function() {
  var a = this.S[this.V].duration;
  0 < a && this.ka > a && (this.V = ++this.V % this.S.length, this.ka -= a);
  this.i = this.S[this.V]
};
M.prototype.update = function(a) {
  G.prototype.update.call(this, a);
  this.Lb(a);
  this.ka += a;
  this.S && this.Ra()
};
M.prototype.Ca = function(a) {
  G.prototype.Ca.call(this, a);
  if (this.i.ya) {
    var b = this.i.x || 0, c = this.i.y || 0;
    Lg.Ca(this.i.ya, a, b, c, this.scale, !0, this.Cb);
    if (this.i.children)
      for (var d = 0, e; e = this.i.children[d]; d++)
        Lg.Ca(e.ya, a, b + (e.x || 0), c + (e.y || 0), 1, !0, this.Cb)
  }
};
M.prototype.Fa = function() {
  return Lg.Fa(this.i.ya)
};
var P = function(a, b) {
  b = void 0 === b ? new Map : b;
  M.call(this, a.get(0));
  this.Sb = a;
  this.Ka = b;
  this.state = 0
};
p(P, M);
P.prototype.Ra = function() {
  var a = this.Sb.get(this.state);
  a && (this.S = a, M.prototype.Ra.call(this))
};
var Q = function(a, b, c, d, e, f) {
  H(a, new Og(a, b, c, d, e, f))
}, Pg = function(a, b, c) {
  H(a, new Og(a, 1, b, null, null, function() {}, c))
};
P.prototype.U = function(a) {
  this.Ka.has(this.state) && this.Ka.get(this.state).stop();
  this.state = a;
  this.V = this.ka = 0;
  this.Ra();
  this.Ka.has(a) && this.Ka.get(a).play()
};
P.prototype.Ya = function(a, b, c, d) {
  this.opacity = a;
  K(this, new Kg(this, c, a, b, void 0 === d ? function() {} : d))
};
var Og = function(a, b, c, d, e, f, g) {
  f = void 0 === f ? function() {} : f;
  E.call(this, c, null, function() {
    h.H.U(h.V);
    h.s()
  });
  var h = this;
  this.H = a;
  this.s = f;
  this.V = b;
  e && (this.o = new F(a, c, d, e));
  !e && g && (this.i = new Jg(a, c, g))
};
p(Og, E);
Og.prototype.update = function(a) {
  this.o && this.o.update(a);
  this.i && this.i.update(a);
  E.prototype.update.call(this, a)
};
var Sg = function(a, b) {
  P.call(this, Qg);
  y(this, a, b);
  this.U(0);
  this.V = Math.floor(Math.random() * Rg.length)
};
p(Sg, P);
var Vg =
        function(a) {
  var b = new M(Tg);
  y(b, 0, -40);
  J(b, Ug, function() {
    x(b)
  });
  v(a, b)
},
    Rg = N(
        [
          [16, 0, 95, 93, 101],    [16, 0, 95, 93, 101],
          [16, 96, 95, 93, 101],   [16, 96, 95, 93, 101],
          [16, 192, 95, 93, 101],  [16, 192, 95, 93, 101],
          [16, 288, 95, 93, 101],  [16, 288, 95, 93, 101],
          [16, 384, 95, 93, 101],  [16, 384, 95, 93, 101],
          [16, 480, 95, 93, 101],  [16, 480, 95, 93, 101],
          [16, 576, 95, 93, 101],  [16, 576, 95, 93, 101],
          [16, 672, 95, 93, 101],  [16, 672, 95, 93, 101],
          [16, 768, 95, 93, 101],  [16, 768, 95, 93, 101],
          [16, 864, 95, 93, 101],  [16, 864, 95, 93, 101],
          [16, 960, 95, 93, 101],  [16, 960, 95, 93, 101],
          [16, 1056, 95, 93, 101], [16, 1056, 95, 93, 101],
          [16, 1152, 95, 93, 101], [16, 1152, 95, 93, 101]
        ],
        83, 0, 0),
    Tg = O(
        [
          [16, 0, 0, 126, 92], [16, 129, 0, 126, 92], [16, 258, 0, 126, 92],
          [16, 387, 0, 126, 92], [16, 516, 0, 126, 92], [16, 645, 0, 126, 92],
          [16, 774, 0, 126, 92], [16, 903, 0, 126, 92], [16, 1032, 0, 126, 92],
          [16, 1161, 0, 126, 92]
        ],
        83, 0, 0),
    Qg = new Map([[0, Rg]]), Ug = Mg(Tg);
var Wg = function(a) {
  Wg[' '](a);
  return a
};
Wg[' '] = Ia;
var Yg = function(a, b) {
  var c = Xg;
  return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
};
var Zg = Eb(Lb, 'Opera'), $g = Eb(Lb, 'Trident') || Eb(Lb, 'MSIE'),
    ah = Eb(Lb, 'Edge'),
    bh = Eb(Lb, 'Gecko') &&
    !(Eb(Lb.toLowerCase(), 'webkit') && !Eb(Lb, 'Edge')) &&
    !(Eb(Lb, 'Trident') || Eb(Lb, 'MSIE')) && !Eb(Lb, 'Edge'),
    ch = Eb(Lb.toLowerCase(), 'webkit') && !Eb(Lb, 'Edge'), dh = function() {
      var a = Ha.document;
      return a ? a.documentMode : void 0
    }, eh;
a: {
  var fh = '',
  gh =
      function() {
        var a = Lb;
        if (bh) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (ah) return /Edge\/([\d\.]+)/.exec(a);
        if ($g) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (ch) return /WebKit\/(\S+)/.exec(a);
        if (Zg) return /(?:Version)[ \/]?(\S+)/.exec(a)
      }();
  gh && (fh = gh ? gh[1] : '');
  if ($g) {
    var hh = dh();
    if (null != hh && hh > parseFloat(fh)) {
      eh = String(hh);
      break a
    }
  } eh = fh
} var ih = eh,
      Xg = {}, jh = function(a) {
        return Yg(a, function() {
          for (var b = 0, c = wb(String(ih)).split('.'),
                   d = wb(String(a)).split('.'),
                   e = Math.max(c.length, d.length), f = 0;
               0 == b && f < e; f++) {
            var g = c[f] || '', h = d[f] || '';
            do {
              g = /(\d*)(\D*)(.*)/.exec(g) || ['', '', '', ''];
              h = /(\d*)(\D*)(.*)/.exec(h) || ['', '', '', ''];
              if (0 == g[0].length && 0 == h[0].length) break;
              b = Fb(0 == g[1].length ? 0 : parseInt(g[1], 10),
                     0 == h[1].length ? 0 : parseInt(h[1], 10)) ||
                  Fb(0 == g[2].length, 0 == h[2].length) || Fb(g[2], h[2]);
              g = g[3];
              h = h[3]
            } while (0 == b)
          }
          return 0 <= b
        })
      }, kh;
if (Ha.document && $g) {
  var lh = dh();
  kh = lh ? lh : parseInt(ih, 10) || void 0
} else
  kh = void 0;
var mh = kh;
var nh = !$g || 9 <= Number(mh), oh = $g && !jh('9'), ph = function() {
  if (!Ha.addEventListener || !Object.defineProperty) return !1;
  var a = !1, b = Object.defineProperty({}, 'passive', {
    get: function() {
      a = !0
    }
  });
  try {
    Ha.addEventListener('test', Ia, b), Ha.removeEventListener('test', Ia, b)
  } catch (c) {
  }
  return a
}();
var qh = function() {
  this.V = this.V;
  this.H = this.H
};
qh.prototype.V = !1;
qh.prototype.Gc = function() {
  this.V || (this.V = !0, this.i())
};
var rh = function(a, b) {
  a.V ? b() : (a.H || (a.H = []), a.H.push(b))
};
qh.prototype.i = function() {
  if (this.H)
    for (; this.H.length;) this.H.shift()()
};
var sh = function(a) {
  a && 'function' == typeof a.Gc && a.Gc()
};
var th = function(a, b) {
  this.type = a;
  this.g = this.target = b;
  this.defaultPrevented = this.i = !1
};
th.prototype.stopPropagation = function() {
  this.i = !0
};
th.prototype.preventDefault = function() {
  this.defaultPrevented = !0
};
var vh = function(a, b) {
  th.call(this, a ? a.type : '');
  this.relatedTarget = this.g = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
  this.key = '';
  this.keyCode = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.state = null;
  this.pointerId = 0;
  this.pointerType = '';
  this.j = null;
  if (a) {
    var c = this.type = a.type,
        d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] :
                                                          null;
    this.target = a.target || a.srcElement;
    this.g = b;
    if (b = a.relatedTarget) {
      if (bh) {
        a: {
          try {
            Wg(b.nodeName);
            var e = !0;
            break a
          } catch (f) {} e = !1
        } e ||
            (b = null)
      }
    } else
      'mouseover' == c ? b = a.fromElement :
                         'mouseout' == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
         this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
         this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) :
        (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
         this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
         this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || '';
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = 'string' === typeof a.pointerType ?
        a.pointerType :
        uh[a.pointerType] || '';
    this.state = a.state;
    this.j = a;
    a.defaultPrevented && this.preventDefault()
  }
};
Ra(vh, th);
var uh = {2: 'touch', 3: 'pen', 4: 'mouse'};
vh.prototype.stopPropagation = function() {
  vh.Wb.stopPropagation.call(this);
  this.j.stopPropagation ? this.j.stopPropagation() : this.j.cancelBubble = !0
};
vh.prototype.preventDefault = function() {
  vh.Wb.preventDefault.call(this);
  var a = this.j;
  if (a.preventDefault)
    a.preventDefault();
  else if (a.returnValue = !1, oh)
    try {
      if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {
    }
};
var wh = 'closure_listenable_' + (1E6 * Math.random() | 0), xh = function(a) {
  return !(!a || !a[wh])
}, yh = 0;
var zh = function(a, b, c, d, e) {
  this.listener = a;
  this.g = null;
  this.src = b;
  this.type = c;
  this.capture = !!d;
  this.Jc = e;
  this.key = ++yh;
  this.Ub = this.Ec = !1
}, Ah = function(a) {
  a.Ub = !0;
  a.listener = null;
  a.g = null;
  a.src = null;
  a.Jc = null
};
var Bh = function(a) {
  this.src = a;
  this.g = {};
  this.i = 0
};
Bh.prototype.add = function(a, b, c, d, e) {
  var f = a.toString();
  a = this.g[f];
  a || (a = this.g[f] = [], this.i++);
  var g = Ch(a, b, d, e);
  -1 < g ? (b = a[g], c || (b.Ec = !1)) :
           (b = new zh(b, this.src, f, !!d, e), b.Ec = c, a.push(b));
  return b
};
var Dh = function(a, b) {
  var c = b.type;
  if (!(c in a.g)) return !1;
  var d = hb(a.g[c], b);
  d && (Ah(b), 0 == a.g[c].length && (delete a.g[c], a.i--));
  return d
}, Ch = function(a, b, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.Ub && f.listener == b && f.capture == !!c && f.Jc == d) return e
  }
  return -1
};
var Eh = 'closure_lm_' + (1E6 * Math.random() | 0), Fh = {}, Gh = 0,
    Ih =
        function(a, b, c, d, e) {
      if (d && d.once) return Hh(a, b, c, d, e);
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) Ih(a, b[f], c, d, e);
        return null
      }
      c = Jh(c);
      return xh(a) ? Kh(a, b, c, La(d) ? !!d.capture : !!d, e) :
                     Lh(a, b, c, !1, d, e)
    },
    Lh =
        function(a, b, c, d, e, f) {
      if (!b) throw Error('s');
      var g = La(e) ? !!e.capture : !!e, h = Mh(a);
      h || (a[Eh] = h = new Bh(a));
      c = h.add(b, c, d, g, f);
      if (c.g) return c;
      d = Nh();
      c.g = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener)
        ph || (e = g), void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent)
        a.attachEvent(Oh(b.toString()), d);
      else if (a.addListener && a.removeListener)
        a.addListener(d);
      else
        throw Error('t');
      Gh++;
      return c
    },
    Nh =
        function() {
      var a = Ph, b = nh ? function(c) {
        return a.call(b.src, b.listener, c)
      } : function(c) {
        c = a.call(b.src, b.listener, c);
        if (!c) return c
      };
      return b
    },
    Hh =
        function(a, b, c, d, e) {
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) Hh(a, b[f], c, d, e);
        return null
      }
      c = Jh(c);
      return xh(a) ? a.j.add(String(b), c, !0, La(d) ? !!d.capture : !!d, e) :
                     Lh(a, b, c, !0, d, e)
    },
    Qh =
        function(a, b, c, d, e) {
      if (Array.isArray(b))
        for (var f = 0; f < b.length; f++) Qh(a, b[f], c, d, e);
      else
        (d = La(d) ? !!d.capture : !!d, c = Jh(c), xh(a)) ?
            (a = a.j, b = String(b).toString(),
             b in a.g &&
                 (f = a.g[b], c = Ch(f, c, d, e),
                  -1 < c &&
                      (Ah(f[c]), Array.prototype.splice.call(f, c, 1),
                       0 == f.length && (delete a.g[b], a.i--)))) :
            a && (a = Mh(a)) &&
                (b = a.g[b.toString()], a = -1, b && (a = Ch(b, c, d, e)),
                 (c = -1 < a ? b[a] : null) && Rh(c))
    },
    Rh =
        function(a) {
      if ('number' === typeof a || !a || a.Ub) return !1;
      var b = a.src;
      if (xh(b)) return Dh(b.j, a);
      var c = a.type, d = a.g;
      b.removeEventListener ? b.removeEventListener(c, d, a.capture) :
          b.detachEvent     ? b.detachEvent(Oh(c), d) :
                              b.addListener && b.removeListener &&
              b.removeListener(d);
      Gh--;
      (c = Mh(b)) ? (Dh(c, a), 0 == c.i && (c.src = null, b[Eh] = null)) :
                    Ah(a);
      return !0
    },
    Oh =
        function(a) {
      return a in Fh ? Fh[a] : Fh[a] = 'on' + a
    },
    Th =
        function(a, b, c, d) {
      var e = !0;
      if (a = Mh(a))
        if (b = a.g[b.toString()])
          for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.capture == c && !f.Ub && (f = Sh(f, d), e = e && !1 !== f)
          }
      return e
    },
    Sh =
        function(a, b) {
      var c = a.listener, d = a.Jc || a.src;
      a.Ec && Rh(a);
      return c.call(d, b)
    },
    Ph =
        function(a, b) {
      if (a.Ub) return !0;
      if (!nh) {
        if (!b)
          a: {
            b = ['window', 'event']; for (var c = Ha, d = 0; d < b.length;
                                          d++) if (c = c[b[d]], null == c) {
              b = null;
              break a
            } b = c
          } d = b;
        b = new vh(d, this);
        c = !0;
        if (!(0 > d.keyCode || void 0 != d.returnValue)) {
          a: {
            var e = !1; if (0 == d.keyCode) try {
              d.keyCode = -1;
              break a
            } catch (g) {
              e = !0
            } if (e || void 0 == d.returnValue) d.returnValue = !0
          } d = [];
          for (e = b.g; e; e = e.parentNode) d.push(e);
          a = a.type;
          for (e = d.length - 1; !b.i && 0 <= e; e--) {
            b.g = d[e];
            var f = Th(d[e], a, !0, b);
            c = c && f
          }
          for (e = 0; !b.i && e < d.length; e++)
            b.g = d[e], f = Th(d[e], a, !1, b), c = c && f
        }
        return c
      }
      return Sh(a, new vh(b, this))
    },
    Mh =
        function(a) {
      a = a[Eh];
      return a instanceof Bh ? a : null
    },
    Uh = '__closure_events_fn_' + (1E9 * Math.random() >>> 0),
    Jh = function(a) {
      if ('function' === typeof a) return a;
      a[Uh] || (a[Uh] = function(b) {
        return a.handleEvent(b)
      });
      return a[Uh]
    };
var Vh = function() {
  qh.call(this);
  this.j = new Bh(this);
  this.Lb = this;
  this.Aa = null
};
Ra(Vh, qh);
Vh.prototype[wh] = !0;
Vh.prototype.addEventListener = function(a, b, c, d) {
  Ih(this, a, b, c, d)
};
Vh.prototype.removeEventListener = function(a, b, c, d) {
  Qh(this, a, b, c, d)
};
var Xh = function(a, b) {
  var c, d = a.Aa;
  if (d)
    for (c = []; d; d = d.Aa) c.push(d);
  a = a.Lb;
  d = b.type || b;
  if ('string' === typeof b)
    b = new th(b, a);
  else if (b instanceof th)
    b.target = b.target || a;
  else {
    var e = b;
    b = new th(d, a);
    pb(b, e)
  }
  e = !0;
  if (c)
    for (var f = c.length - 1; !b.i && 0 <= f; f--) {
      var g = b.g = c[f];
      e = Wh(g, d, !0, b) && e
    }
  b.i ||
      (g = b.g = a, e = Wh(g, d, !0, b) && e,
       b.i || (e = Wh(g, d, !1, b) && e));
  if (c)
    for (f = 0; !b.i && f < c.length; f++)
      g = b.g = c[f], e = Wh(g, d, !1, b) && e
};
Vh.prototype.i = function() {
  Vh.Wb.i.call(this);
  this.Ia();
  this.Aa = null
};
var Kh = function(a, b, c, d, e) {
  return a.j.add(String(b), c, !1, d, e)
};
Vh.prototype.Ia = function(a) {
  if (this.j) {
    var b = this.j;
    a = a && a.toString();
    var c = 0, d;
    for (d in b.g)
      if (!a || d == a) {
        for (var e = b.g[d], f = 0; f < e.length; f++) ++c, Ah(e[f]);
        delete b.g[d];
        b.i--
      }
  }
};
var Wh = function(a, b, c, d) {
  b = a.j.g[String(b)];
  if (!b) return !0;
  b = b.concat();
  for (var e = !0, f = 0; f < b.length; ++f) {
    var g = b[f];
    if (g && !g.Ub && g.capture == c) {
      var h = g.listener, k = g.Jc || g.src;
      g.Ec && Dh(a.j, g);
      e = !1 !== h.call(k, d) && e
    }
  }
  return e && !d.defaultPrevented
};
var Yh = function() {};
Yh.prototype.g = null;
Yh.prototype.getOptions = function() {
  var a;
  (a = this.g) || (a = {}, Zh(this) && (a[0] = !0, a[1] = !0), a = this.g = a);
  return a
};
var $h, ai = function() {};
Ra(ai, Yh);
var bi = function(a) {
  return (a = Zh(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}, Zh = function(a) {
  if (!a.i && 'undefined' == typeof XMLHttpRequest &&
      'undefined' != typeof ActiveXObject) {
    for (var b =
                 [
                   'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP',
                   'Microsoft.XMLHTTP'
                 ],
             c = 0;
         c < b.length; c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.i = d
      } catch (e) {
      }
    }
    throw Error('u');
  }
  return a.i
};
$h = new ai;
var ci = !bh && !$g || $g && 9 <= Number(mh) || bh && jh('1.9.1');
var di = function(a, b) {
  this.width = a;
  this.height = b
};
m = di.prototype;
m.aspectRatio = function() {
  return this.width / this.height
};
m.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
m.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
m.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
m.scale = function(a, b) {
  this.width *= a;
  this.height *= 'number' === typeof b ? b : a;
  return this
};
var ei = function() {
  var a = window.document;
  a = 'CSS1Compat' == a.compatMode ? a.documentElement : a.body;
  return new di(a.clientWidth, a.clientHeight)
}, fi = function() {
  this.g = Ha.document || document
};
fi.prototype.Ja = function() {
  return ci && void 0 != (void 0).children ?
      (void 0).children :
      eb((void 0).childNodes, function(a) {
        return 1 == a.nodeType
      })
};
var gi = function(a, b, c) {
  if ('function' === typeof a)
    c && (a = Oa(a, c));
  else if (a && 'function' == typeof a.handleEvent)
    a = Oa(a.handleEvent, a);
  else
    throw Error('w');
  return 2147483647 < Number(b) ? -1 : Ha.setTimeout(a, b || 0)
};
var hi = function(a) {
  Vh.call(this);
  this.headers = new bc;
  this.$ = a || null;
  this.o = !1;
  this.ka = this.g = null;
  this.Ea = '';
  this.v = this.va = this.s = this.ha = !1;
  this.Ra = 0;
  this.S = null;
  this.Ka = '';
  this.Wa = this.rb = !1
};
Ra(hi, Vh);
var ii = /^https?$/i, ji = ['POST', 'PUT'], ki = [], mi = function(a, b) {
  var c = new hi;
  ki.push(c);
  b && Kh(c, 'complete', b);
  c.j.add('ready', c.Td, !0, void 0, void 0);
  li(c, a, void 0, void 0, void 0);
  return c
};
hi.prototype.Td = function() {
  this.Gc();
  hb(ki, this)
};
var li = function(a, b, c, d, e) {
  if (a.g) throw Error('x`' + a.Ea + '`' + b);
  c = c ? c.toUpperCase() : 'GET';
  a.Ea = b;
  a.ha = !1;
  a.o = !0;
  a.g = a.$ ? bi(a.$) : bi($h);
  a.ka = a.$ ? a.$.getOptions() : $h.getOptions();
  a.g.onreadystatechange = Oa(a.Ma, a);
  try {
    a.va = !0, a.g.open(c, String(b), !0), a.va = !1
  } catch (g) {
    ni(a);
    return
  }
  b = d || '';
  var f = new bc(a.headers);
  e && fc(e, function(g, h) {
    f.set(h, g)
  });
  e = gb(f.Bb(), oi);
  d = Ha.FormData && b instanceof Ha.FormData;
  !(0 <= cb(ji, c)) || e || d ||
      f.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  f.forEach(function(g, h) {
    this.g.setRequestHeader(h, g)
  }, a);
  a.Ka && (a.g.responseType = a.Ka);
  'withCredentials' in a.g && a.g.withCredentials !== a.rb &&
      (a.g.withCredentials = a.rb);
  try {
    pi(a),
        0 < a.Ra &&
        (a.Wa = qi(a.g),
         a.Wa ? (a.g.timeout = a.Ra, a.g.ontimeout = Oa(a.nb, a)) :
                a.S = gi(a.nb, a.Ra, a)),
        a.s = !0, a.g.send(b), a.s = !1
  } catch (g) {
    ni(a)
  }
}, qi = function(a) {
  return $g && jh(9) && 'number' === typeof a.timeout && void 0 !== a.ontimeout
}, oi = function(a) {
  return 'content-type' == a.toLowerCase()
};
hi.prototype.nb = function() {
  'undefined' != typeof Ga && this.g && (Xh(this, 'timeout'), this.abort(8))
};
var ni = function(a) {
  a.o = !1;
  a.g && (a.v = !0, a.g.abort(), a.v = !1);
  ri(a);
  si(a)
}, ri = function(a) {
  a.ha || (a.ha = !0, Xh(a, 'complete'), Xh(a, 'error'))
};
hi.prototype.abort = function() {
  this.g && this.o &&
      (this.o = !1, this.v = !0, this.g.abort(), this.v = !1,
       Xh(this, 'complete'), Xh(this, 'abort'), si(this))
};
hi.prototype.i = function() {
  this.g &&
      (this.o && (this.o = !1, this.v = !0, this.g.abort(), this.v = !1),
       si(this, !0));
  hi.Wb.i.call(this)
};
hi.prototype.Ma = function() {
  this.V || (this.va || this.s || this.v ? ti(this) : this.Ud())
};
hi.prototype.Ud = function() {
  ti(this)
};
var ti = function(a) {
  if (a.o && 'undefined' != typeof Ga &&
      (!a.ka[1] || 4 != (a.g ? a.g.readyState : 0) || 2 != ui(a)))
    if (a.s && 4 == (a.g ? a.g.readyState : 0))
      gi(a.Ma, 0, a);
    else if (Xh(a, 'readystatechange'), a.Ga()) {
      a.o = !1;
      try {
        vi(a) ? (Xh(a, 'complete'), Xh(a, 'success')) : ri(a)
      } finally {
        si(a)
      }
    }
}, si = function(a, b) {
  if (a.g) {
    pi(a);
    var c = a.g, d = a.ka[0] ? Ia : null;
    a.g = null;
    a.ka = null;
    b || Xh(a, 'ready');
    try {
      c.onreadystatechange = d
    } catch (e) {
    }
  }
}, pi = function(a) {
  a.g && a.Wa && (a.g.ontimeout = null);
  a.S && (Ha.clearTimeout(a.S), a.S = null)
};
hi.prototype.Ta = function() {
  return !!this.g
};
hi.prototype.Ga = function() {
  return 4 == (this.g ? this.g.readyState : 0)
};
var vi = function(a) {
  var b = ui(a);
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
  if (!c) {
    if (b = 0 === b)
      a = String(a.Ea).match(gc)[1] || null,
      !a && Ha.self && Ha.self.location &&
          (a = Ha.self.location.protocol, a = a.substr(0, a.length - 1)),
      b = !ii.test(a ? a.toLowerCase() : '');
    c = b
  }
  return c
}, ui = function(a) {
  try {
    return 2 < (a.g ? a.g.readyState : 0) ? a.g.status : -1
  } catch (b) {
    return -1
  }
}, wi = function(a) {
  try {
    return a.g ? a.g.responseXML : null
  } catch (b) {
    return null
  }
};
var xi = function(a, b) {
  this.v = a;
  this.o = b;
  this.j = this.g = null;
  this.S = this.s = this.H = !1;
  this.V = [];
  this.i = null
}, Di = function(a) {
  var b = yi;
  if (zi && !b.g) {
    b.g = new (window.AudioContext || window.webkitAudioContext);
    b.j = b.g.createGain();
    b.j.connect(b.g.destination);
    for (var c in b.v) b.v[c].o = b.g;
    for (var d in b.o) Ai(b.o[d], b.g, b.j);
    b.g.onstatechange = function() {
      Bi(b)
    };
    Bi(b);
    Ci(b);
    Hh(a, ['click', 'pointerup', 'mouseup', 'touchend'], function() {
      b.g.resume();
      Ci(b)
    }, !0)
  }
}, Bi = function(a) {
  if ('running' == a.g.state && !a.S) {
    a.S = !0;
    for (var b = 0; b < a.V.length; b++) a.V[b]()
  }
}, Ei = function(a) {
  a.i = a.g.createBufferSource();
  a.i.buffer = a.g.createBuffer(1, 1, 22050);
  a.i.connect(a.g.destination);
  a.i.start(0)
}, Ci = function(a) {
  a.g &&
      (null == a.i ? Ei(a) :
           void 0 === a.i.playbackState ?
                     Ei(a) :
                     a.i.playbackState !== a.i.PLAYING_STATE &&
               a.i.playbackState !== a.i.FINISHED_STATE && Ei(a))
};
xi.prototype.destroy = function() {
  this.g.close();
  this.g = null
};
xi.prototype.reset = function() {
  for (var a in this.v) this.v[a].v = [];
  for (var b in this.o) this.o[b].stop()
};
var Fi = function() {
  var a = yi;
  a.j && a.j.gain.setValueAtTime(0, a.g.currentTime);
  a.H = !0
};
xi.prototype.isMuted = function() {
  return this.H && !!this.j && 0 == this.j.gain.value
};
var zi = !(!window.AudioContext && !window.webkitAudioContext) &&
    !!window.GainNode,
    R = function(a, b, c) {
      this.v = a;
      this.S = b;
      this.H = c;
      this.j = {};
      this.o = this.s = this.g = this.i = null;
      this.V = 0
    }, Ai = function(a, b, c) {
      a.g = b;
      a.s = c
    }, Gi = function(a) {
      if (a.g)
        for (var b in a.j) {
          var c = a.j[b];
          !c.Ye && 1E3 * a.g.currentTime > c.Pd + a.H && delete a.j[b]
        }
    }, Hi = function(a) {
      !a.i && a.g.createGain && (a.i = a.g.createGain())
    };
R.prototype.play = function(a, b, c, d, e, f) {
  a = void 0 === a ? 0 : a;
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? 0 : c;
  e = void 0 === e ? !1 : e;
  if (!this.g || !this.s) return -1;
  Gi(this);
  f = void 0 === f ? this.g.currentTime + a / 1E3 : f;
  d ||
      (d = this.g.createBufferSource(),
       d.playbackRate.setValueAtTime(1, this.g.currentTime));
  Hi(this);
  this.o && d.connect(this.o);
  this.i ? (this.o ? this.o.connect(this.i) : d.connect(this.i),
            this.i.connect(this.s)) :
      this.o ? this.o.connect(this.s) :
               d.connect(this.s);
  this.o = null;
  d.loop = b;
  try {
    d.buffer = this.v.s
  } catch (h) {
    return -1
  }
  a = this.S / 1E3;
  var g = this.H / 1E3 / d.playbackRate.value;
  b ? (d.loopStart = a + (e ? c / 1E3 : 0), d.loopEnd = a + g,
       d.start(f, a + c / 1E3)) :
      d.start(f, a + c / 1E3, g);
  e = this.V++;
  this.j[e] = {node: d, Pd: 1E3 * f - c, Ye: b};
  return e
};
var Ii = function(a, b) {
  var c = void 0 === c ? 0 : c;
  Hi(a);
  a.i && a.i.gain.setValueAtTime(b, a.g.currentTime + c)
}, Ji = function(a, b, c, d) {
  d = void 0 === d ? 0 : d;
  Hi(a);
  a.i &&
      (a.i.gain.setValueAtTime(a.i.gain.value, a.g.currentTime + d),
       a.i.gain.exponentialRampToValueAtTime(b, a.g.currentTime + d + c))
};
R.prototype.stop = function(a) {
  Gi(this);
  if (void 0 !== a) {
    if (this.j[a]) {
      try {
        this.j[a].node.stop(0)
      } catch (c) {
      }
      var b = (1E3 * this.g.currentTime - this.j[a].Pd) % this.H;
      delete this.j[a];
      return [b]
    }
    return []
  }
  a = [];
  for (b in this.j) a = a.concat(this.stop(b));
  return a
};
var Ki, Li = document.createElement('audio'),
        Mi = (Ki = 'function' === typeof Li.canPlayType &&
                  '' != Li.canPlayType('audio/mpeg')) ?
    '.mp3' :
    '.ogg',
        Ni = function(a, b) {
          Ua.call(this, a + b + Mi);
          this.o = this.s = null;
          this.g = 0
        };
p(Ni, Ua);
Ni.prototype.preload = function(a, b) {
  var c = this, d = new Promise(function(f) {
                  Va(c, f)
                });
  a && Va(this, a);
  if (0 != this.g) return Promise.resolve();
  if (!this.o) return Promise.reject();
  var e = new XMLHttpRequest;
  e.open('GET', this.Nb, !0);
  e.responseType = 'arraybuffer';
  e.onload = function() {
    c.o.decodeAudioData(e.response, function(f) {
      f && (c.s = f, c.g = 3, c.i())
    });
    c.g = 2
  };
  b && (e.onprogress = function(f) {
    f.lengthComputable && b(f.loaded / f.total)
  });
  e.send();
  this.g = 1;
  return d
};
var Oi = function() {
  xi.call(this, S, T)
};
p(Oi, xi);
var S = {};
S.Sa = new Ni('/logos/2020/halloween20/dev2/', 'main');
S.Rc = new Ni('/logos/2020/halloween20/dev2/', 'music');
S.vd = new Ni('/logos/2020/halloween20/dev2/', 'l2_music');
S.xd = new Ni('/logos/2020/halloween20/dev2/', 'l3_music');
S.fe = new Ni('/logos/2020/halloween20/dev2/', 'l4_music');
S.Cc = new Ni('/logos/2020/halloween20/dev2/', 'l5_music');
S.Da = new Ni('/logos/2020/halloween20/dev2/', 'sfx');
S.Vd = new Ni('/logos/2020/halloween20/dev2/', 'initial');
S.Re = new Ni('/logos/2020/halloween20/dev2/', 'victory');
S.Mb = new Ni('/logos/2020/halloween20/dev2/', 'end');
var T = {};
T.$e = new R(S.Da, 0, 3613.3330078125);
T.od = new R(S.Mb, 0, 1933.3330078125);
T.df = new R(S.Mb, 2933.3330078125, 4466.6669921875);
T.ef = new R(S.Mb, 8400, 5233.3330078125);
T.ff = new R(S.Mb, 14633.3330078125, 2309.342041015625);
T.hf = new R(S.Mb, 17942.67578125, 2966.6669921875);
T.Rd = new R(S.Da, 4613.3330078125, 1790);
T.Sd = new R(S.Da, 7403.3330078125, 1100);
T.kf = new R(S.Mb, 21909.341796875, 3E4);
T.qd = new R(S.Sa, 0, 1741.4969482421875);
T.Qc = new R(S.Sa, 2741.4970703125, 1335.14697265625);
T.rd = new R(S.Re, 0, 18413.423828125);
T.Wd = new R(S.Vd, 0, 16921.54296875);
T.Xd = new R(S.Rc, 0, 1207.052001953125);
T.sd = new R(S.Rc, 2207.052001953125, 30858.888671875);
T.Yd = new R(S.vd, 0, 2668.616943359375);
T.ud = new R(S.vd, 3668.616943359375, 16708.5703125);
T.Zd = new R(S.xd, 0, 7714.2861328125);
T.wd = new R(S.xd, 8714.2861328125, 36091.65625);
T.$d = new R(S.Da, 9503.3330078125, 2633.197021484375);
T.yd = new R(S.fe, 0, 45175.984375);
T.he = new R(S.Cc, 0, 2115.14697265625);
T.zd = new R(S.Cc, 3115.14697265625, 37613.17578125);
T.Ad = new R(S.Cc, 41728.3203125, 29589.796875);
T.Bd = new R(S.Cc, 72318.1171875, 8645.0791015625);
T.Cd = new R(S.Sa, 5076.64404296875, 1573.1519775390625);
T.Dd = new R(S.Da, 108517.53125, 783.3330078125);
T.Ed = new R(S.Da, 110300.859375, 783.3330078125);
T.Fd = new R(S.Rc, 34065.94140625, 48E3);
T.Gd = new R(S.Da, 13136.53125, 396.6669921875);
T.le = new R(S.Da, 14533.197265625, 3611.677978515625);
T.oe = new R(S.Da, 19144.875, 886.6669921875);
T.qe = new R(S.Da, 21031.54296875, 1248.344970703125);
T.lf = new R(S.Da, 23279.88671875, 2506.6669921875);
T.re = new R(S.Da, 26786.552734375, 1088.344970703125);
T.Hd = new R(S.Da, 28874.8984375, 2506.6669921875);
T.te = new R(S.Da, 32381.564453125, 5528.34521484375);
T.ue = new R(S.Da, 38909.91015625, 1261.677978515625);
T.mf = new R(S.Da, 41171.5859375, 8516.6669921875);
T.we = new R(S.Da, 50688.25390625, 2969.251953125);
T.xe = new R(S.Da, 54657.5078125, 5770);
T.ye = new R(S.Da, 61427.5078125, 2666.6669921875);
T.ze = new R(S.Da, 65094.171875, 11124.9892578125);
T.Id = new R(S.Da, 77219.1640625, 785.010986328125);
T.Ae = new R(S.Da, 79004.171875, 2200);
T.Be = new R(S.Da, 82204.171875, 3886.6669921875);
T.Ce = new R(S.Da, 87090.8359375, 5421.67822265625);
T.nf = new R(S.Da, 93512.515625, 2756.6669921875);
T.De = new R(S.Da, 97269.1875, 2735.010986328125);
T.Ee = new R(S.Da, 101004.1953125, 6513.3330078125);
T.qf = new R(S.Da, 112084.1953125, 4E3);
T.Fe = new R(S.Sa, 7649.7958984375, 1168.2540283203125);
T.rf = new R(S.Da, 117084.1953125, 3071.677978515625);
T.Ge = new R(S.Da, 121155.875, 713.3330078125);
T.He = new R(S.Da, 122869.203125, 666.6669921875);
T.Ie = new R(S.Da, 124535.875, 4800);
T.Je = new R(S.Da, 130335.875, 4011.677978515625);
T.Sc = new R(S.Sa, 9818.0498046875, 983.5599975585938);
T.Jd = new R(S.Sa, 11801.6103515625, 1160);
T.Ke = new R(S.Sa, 13961.6103515625, 1248.0050048828125);
T.Le = new R(S.Sa, 16209.615234375, 1386.6669921875);
T.Me = new R(S.Sa, 18596.28125, 1482.6529541015625);
T.Ne = new R(S.Sa, 21078.93359375, 1271.29296875);
T.Oe = new R(S.Sa, 23350.2265625, 1567.3470458984375);
T.Pe = new R(S.Sa, 25917.57421875, 1625.39697265625);
T.Qe = new R(S.Sa, 28542.970703125, 2066.575927734375);
T.Se = new R(S.Da, 135347.546875, 1783.3330078125);
Ja(Oi);
var Pi = function() {
  this.g = new Map
}, Qi, Ri = function() {
  Qi || (Qi = new Pi);
  return Qi
};
Pi.prototype.play = function(a) {
  this.g.has(a) && 200 > Date.now() - this.g.get(a) ||
      (a.play(), this.g.set(a, Date.now()))
};
var Si = function() {
  this.g = []
}, Ti, U = function(a, b, c) {
  for (var d = a.g.slice(0), e = 0; e < d.length; e++)
    -1 != a.g.indexOf(d[e]) && d[e].Pa(b, c)
};
Si.prototype.addListener = function(a) {
  this.g.push(a)
};
Si.prototype.removeListener = function(a) {
  for (var b = this.g.indexOf(a); - 1 != b;)
    this.g.splice(b, 1), b = this.g.indexOf(a)
};
Si.prototype.Ia = function() {
  this.g = []
};
var Ui = function() {
  Ti || (Ti = new Si);
  return Ti
};
var Vi = /#(.)(.)(.)/, Wi = /^#(?:[0-9a-f]{3}){1,2}$/i;
var Xi = function(a, b, c) {
  b *= c.length;
  for (var d = 0, e = c[0]; 0 <= b && d < c.length;) {
    e = c[d];
    var f = Math.min(b, 1);
    if (1 > f) {
      var g = e = new ug(e.v, e.S, e.g, e.j, e.i, e.o, e.s, e.H);
      if (1 != f) {
        var h = q(g.v, g.g, f), k = q(g.S, g.j, f), l = q(g.g, g.i, f),
            r = q(g.j, g.o, f), w = q(g.i, g.s, f), B = q(g.o, g.H, f);
        g.g = h;
        g.j = k;
        h = q(h, l, f);
        k = q(k, r, f);
        l = q(l, w, f);
        r = q(r, B, f);
        g.i = h;
        g.o = k;
        g.s = q(h, l, f);
        g.H = q(k, r, f)
      }
    }
    f = a;
    g = e;
    f.save();
    f.beginPath();
    f.moveTo(g.v, g.S);
    f.bezierCurveTo(g.g, g.j, g.i, g.o, g.s, g.H);
    f.stroke();
    f.restore();
    d++;
    b--
  }
  return e
}, Yi = [255, 255, 255];
function Zi(a, b, c) {
  a.save();
  a.translate(b - 73, c - 15);
  a.beginPath();
  a.moveTo(66.7, 352.6);
  a.bezierCurveTo(66.7, 352.6, 67.8, 279.6, 67.8, 263.1);
  a.bezierCurveTo(67.8, 246.6, 50.3, 247.1, 43.3, 234.8);
  a.bezierCurveTo(36.4, 222.6, 8.7, 156.5, 49.7, 150.1);
  a.bezierCurveTo(52.4, 115.5, 56.1, 50.6, 57.7, 29.2);
  a.bezierCurveTo(59.3, 7.9, 90.2, 13.3, 89.7, 29.8);
  a.bezierCurveTo(89.1, 46.3, 87.5, 111.3, 87.5, 111.3);
  a.bezierCurveTo(87.5, 111.3, 93.4, 103.3, 107.2, 105.9);
  a.bezierCurveTo(121.1, 108.6, 124.8, 122.5, 124.8, 122.5);
  a.bezierCurveTo(124.8, 122.5, 149.9, 98.5, 161, 134.7);
  a.bezierCurveTo(176.5, 117.7, 188.2, 133.6, 189.8, 145.9);
  a.bezierCurveTo(191, 155.5, 196.2, 192.8, 189.3, 215.7);
  a.bezierCurveTo(182.3, 238.6, 163.7, 264.7, 163.7, 264.7);
  a.lineTo(162.6, 352.6);
  a.lineWidth = 9;
  a.strokeStyle = 'rgb(255, 255, 255)';
  a.lineCap = 'round';
  a.lineJoin = 'round';
  a.stroke();
  a.restore()
}
function $i(a, b, c) {
  a.save();
  a.translate(b, c);
  a.save();
  a.beginPath();
  a.moveTo(12.5, 43.5);
  a.lineTo(.2, 54.7);
  a.lineTo(0, 0);
  a.lineTo(44.9, 33.4);
  a.lineTo(25.9, 36.3);
  a.lineTo(33.4, 53);
  a.lineTo(21, 59.2);
  a.lineTo(12.5, 43.5);
  a.closePath();
  a.fillStyle = 'rgb(255, 255, 255)';
  a.fill();
  a.beginPath();
  a.moveTo(36.8, 31.1);
  a.lineTo(3, 6);
  a.lineTo(3.2, 46.8);
  a.lineTo(13.2, 36.2);
  a.lineTo(22.3, 55.2);
  a.lineTo(29.4, 51.7);
  a.lineTo(20.2, 32.7);
  a.lineTo(36.8, 31.1);
  a.closePath();
  a.fillStyle = 'rgb(1, 1, 1)';
  a.fill();
  a.restore();
  a.restore()
}
var aj = [
  new ug(390.1, 169.5, 406.9, 185.5, 430.7, 194.3, 476, 162.2),
  new ug(452.4, 164.3, 455.4, 164.2, 472.5, 162.8, 475.1, 162.6),
  new ug(466.6, 183.9, 467.2, 178.4, 472.8, 167.5, 475.7, 162.6)
];
function bj(a, b, c, d) {
  return new ug(a, b, a, b, c, d, c, d)
};
for (var cj =
             new Map([
               [
                 0, {
                   color: '#0000ff',
                   ya: [3, 182, 0, 8, 32],
                   mb: [bj(0, -100, 0, 100)],
                   Jb: new t(50, 180),
                   wb: [[0, -10], [0, 0], [0, 16]],
                   $a: null
                 }
               ],
               [
                 1, {
                   color: '#22ff43',
                   ya: [3, 28, 0, 24, 32],
                   mb: null,
                   Jb: null,
                   wb: [[-10, 4], [0, 0], [10, -12], [20, 0]],
                   $a: null
                 }
               ],
               [
                 2, {
                   color: '#ff0000',
                   ya: [3, 55, 0, 24, 32],
                   mb: [bj(175, 0, -175, 0)],
                   Jb: new t(320, 240),
                   wb: [[-8, 0], [0, 0], [16, 0]],
                   $a: null
                 }
               ],
               [
                 3, {
                   color: '#ffff00',
                   ya: [3, 109, 0, 24, 32],
                   mb: null,
                   Jb: null,
                   wb: [[-10, -6], [0, 0], [10, 12], [20, 0]],
                   $a: null
                 }
               ],
               [
                 4, {
                   color: '#ff69b4',
                   ya: [3, 0, 0, 25, 32],
                   mb: null,
                   Jb: null,
                   wb: null,
                   $a: T.Pe
                 }
               ],
               [
                 5, {
                   color: '#6bfbfd',
                   ya: [3, 136, 0, 22, 32],
                   mb: null,
                   Jb: null,
                   wb: null,
                   $a: null
                 }
               ],
               [
                 6, {
                   color: '#ffd700',
                   ya: [3, 161, 0, 18, 32],
                   mb: [
                     bj(25, -62.5, -25, 0), bj(-25, 0, 31, -4),
                     bj(31, -4, -19, 58.5)
                   ],
                   Jb: new t(410, 190),
                   $a: T.Qe,
                   wb: null
                 }
               ],
               [7, {color: '#4682b4', ya: null, mb: null, wb: null, $a: null}],
               [
                 8, {
                   color: '#b888dd',
                   ya: [3, 82, 0, 24, 32],
                   mb: null,
                   wb: null,
                   $a: null
                 }
               ],
               [9, {color: '#d1002d', ya: null, mb: null, wb: null, $a: null}],
               [10, {color: '#00d5ff', ya: null, mb: null, wb: null, $a: null}]
             ]),
         dj = n(cj.values()), ej = dj.next();
     !ej.done; ej = dj.next()) {
  var fj = ej.value, gj = fj.color, hj = gj;
  if (!Wi.test(hj)) throw Error('y`' + hj);
  4 == hj.length && (hj = hj.replace(Vi, '#$1$1$2$2$3$3'));
  gj = hj.toLowerCase();
  var ij = parseInt(gj.substr(1), 16);
  fj.Ze = [ij >> 16, ij >> 8 & 255, ij & 255]
};
var jj =
        function(a, b, c, d) {
  this.g = a;
  this.j = b;
  this.i = c;
  this.o = void 0 === d ? !1 : d
},
    V =
        function(a, b, c, d) {
      return new jj(kj(a, b), 1E3 * c, lj(d))
    },
    lj =
        function(a) {
      var b = [];
      a = n(a);
      for (var c = a.next(); !c.done; c = a.next()) b.push(mj.get(c.value));
      return b
    },
    kj =
        function(a, b) {
      a = 2 * a * Math.PI / 360;
      return new t(320 + Math.cos(a) * b, Math.sin(a) * b + 203)
    },
    mj = new Map([
      ['|', 0], ['^', 1], ['-', 2], ['v', 3], ['z', 6], ['o', 5], ['3', 4],
      ['@', 8]
    ]);
var nj = function(a, b, c, d) {
  E.call(this, sg);
  this.i = a;
  this.H = c;
  this.s = b;
  this.o = d || 0
};
p(nj, E);
nj.prototype.update = function(a) {
  E.prototype.update.call(this, a);
  a = Math.sin(this.s * this.g * 2 * Math.PI / 1E3);
  var b = this.i;
  b.Yb = a * this.o;
  mg(b);
  og(this.i, a * this.H)
};
var oj = td.wa(), pj = function() {
  u.call(this);
  this.j = 0;
  this.g = [];
  this.o = [];
  this.i = [];
  this.v = [];
  this.s = [];
  this.H = new t(0, 0)
};
p(pj, u);
pj.prototype.update = function(a) {
  this.j += a;
  a = pg(this);
  this.g = [new t(0, -a.g / a.o), this.H];
  this.g = qj(this, this.g[0], this.g[1], 3);
  this.o =
      qj(this, this.g[Math.floor(Number(Math.random() * this.g.length * .2))],
         null, 2);
  this.i =
      qj(this, this.g[Math.floor(Number(Math.random() * this.g.length * .5))],
         null, 2);
  this.v = qj(this, this.i[this.i.length - 1], null, 2);
  this.s = qj(this, this.i[this.i.length - 1], null, 2)
};
pj.prototype.Ca = function(a) {
  var b = 8 + 4 * Math.cos(3 * this.j / 1E3);
  a.save();
  a.globalCompositeOperation = 'overlay';
  a.shadowColor = '#7fa7fe';
  rj(a, this.g, b);
  rj(a, this.o, .5 * b);
  rj(a, this.i, .3 * b);
  rj(a, this.v, .2 * b);
  rj(a, this.s, .1 * b);
  a.restore()
};
var qj = function(a, b, c, d) {
  var e = .5 < Math.random() ? -1 : 1;
  d = Math.pow(2, d) + 1 - 1;
  var f = [b];
  c ||
      (c = new t(
           b.x + (20 * Math.random() + 10) * e, b.y + 10 * Math.random() + 30));
  f[d] = c;
  sj(a, f, 0, d);
  return f
}, sj = function(a, b, c, d) {
  if (c + 1 != d) {
    var e = Math.floor((c + d) / 2), f = b[c], g = b[d];
    b[e] = new t(
        (f.x + g.x) / 2 + (20 * Math.random() - 10),
        (f.y + g.y) / 2 + (10 * Math.random() - 5));
    sj(a, b, c, e);
    sj(a, b, e, d)
  }
}, rj = function(a, b, c) {
  for (var d = 0; d < b.length - 1; d += 1) {
    var e = b[d], f = b[d + 1];
    a.save();
    a.translate(e.x, e.y);
    a.scale(.2, .2);
    var g = f.x - e.x;
    e = f.y - e.y;
    f = Math.sqrt(g * g + e * e);
    a.rotate(Math.atan2(e, g) + .5 * Math.PI);
    a.scale(2 * c, .14 * f);
    oj.Ca(ff, a, -10, -40, 1);
    a.restore();
    c -= .5;
    c = Math.max(0, c)
  }
  a.beginPath();
  a.moveTo(b[0].x, b[0].y);
  for (d = 1; d < b.length; d++) a.lineTo(b[d].x, b[d].y);
  a.lineWidth = c;
  a.strokeStyle = 'white';
  a.stroke();
  a.closePath()
};
var tj = function(a, b, c, d, e, f, g) {
  e = void 0 === e ? Cg : e;
  g = void 0 === g ? function() {} : g;
  E.call(this, a);
  this.i = b;
  this.H = c;
  this.s = d;
  this.ka = e;
  this.o = f;
  this.V = g
};
p(tj, E);
tj.prototype.hd = function() {
  null === this.i && void 0 !== this.o && (this.i = this.o())
};
tj.prototype.jd = function() {
  this.s(q(this.i, this.H, this.ka(Xb(this.g / this.duration, 1))))
};
tj.prototype.Lc = function() {
  this.s(this.H);
  this.V()
};
var vj = function() {
  M.call(this, uj);
  this.Ba = this.g = !1
};
p(vj, M);
var wj =
        function(a) {
  a.g = !0;
  T.Ge.play();
  K(a, new tj(700, .8, .2, function(b) {
      a.opacity = b
    }, Fg));
  H(a, new E(700, null, function() {
      a.Ba = !1
    }))
},
    xj =
        function(a, b) {
      T.He.play();
      a.Ba = !0;
      a.g = !1;
      a.opacity = 0;
      J(a, 100, function() {
        L(a);
        var c = ag(b, A(a.getParent()));
        K(a, new F(a, 800, c, new t(0, 0), function() {}, Fg));
        K(a, new tj(800, 0, .8, function(d) {
            a.opacity = d
          }));
        K(a, new tj(800, .4, 1, function(d) {
            a.setScale(d)
          }))
      })
    },
    uj = N(
        [
          [40, 0, 0, 150, 150],      [40, 153, 0, 150, 150],
          [40, 306, 0, 150, 150],    [40, 459, 0, 150, 150],
          [40, 612, 0, 150, 150],    [40, 765, 0, 150, 150],
          [40, 918, 0, 150, 150],    [40, 1071, 0, 150, 150],
          [40, 1224, 0, 150, 150],   [40, 1377, 0, 150, 150],
          [40, 1530, 0, 150, 150],   [40, 1683, 0, 150, 150],
          [40, 1836, 0, 150, 150],   [40, 0, 153, 150, 150],
          [40, 153, 153, 150, 150],  [40, 306, 153, 150, 150],
          [40, 459, 153, 150, 150],  [40, 612, 153, 150, 150],
          [40, 765, 153, 150, 150],  [40, 918, 153, 150, 150],
          [40, 1071, 153, 150, 150], [40, 1224, 153, 150, 150],
          [40, 1377, 153, 150, 150], [40, 1530, 153, 150, 150],
          [40, 1683, 153, 150, 150], [40, 1836, 153, 150, 150]
        ],
        83, 0, 0);
var Aj = function() {
  P.call(this, yj);
  var a = this;
  this.U(0);
  T.Se.play();
  H(this, new E(zj, null, function() {
      x(a)
    }));
  this.W = -1
};
p(Aj, P);
var Bj = O(
        [
          [21, 0, 0, 640, 640], [21, 643, 0, 640, 640], [21, 1286, 0, 640, 640],
          [21, 1929, 0, 640, 640], [21, 2572, 0, 640, 640],
          [21, 0, 643, 640, 640], [21, 643, 643, 640, 640],
          [21, 1286, 643, 640, 640], [21, 1929, 643, 640, 640]
        ],
        83, 0, 0),
    zj = Mg(Bj), yj = new Map([[0, Bj]]);
var Cj = Ui(),
    Dj = O(
        [
          [5, 156, 325, 146, 184],  [5, 156, 325, 146, 184],
          [5, 305, 325, 146, 184],  [5, 454, 325, 146, 184],
          [5, 603, 325, 146, 184],  [5, 752, 325, 146, 184],
          [5, 1909, 329, 146, 184], [5, 2058, 329, 146, 184],
          [5, 2207, 329, 146, 184], [5, 2356, 329, 146, 184],
          [5, 2505, 329, 146, 184], [5, 2654, 329, 146, 184],
          [5, 2803, 329, 146, 184], [5, 2952, 329, 146, 184],
          [5, 3101, 329, 146, 184], [5, 901, 434, 146, 184],
          [5, 4044, 448, 146, 184], [5, 4193, 448, 146, 184],
          [5, 4342, 448, 146, 184], [5, 4342, 448, 146, 184],
          [5, 4342, 448, 146, 184]
        ],
        83, 0, -36),
    Ej = O([Fe], 83, 14, -15),
    Fj = O(
        [
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          [20, 125, 293, 122, 134],
          [20, 250, 293, 122, 134],
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          ae,
          be,
          be,
          ce,
          ce,
          de,
          de,
          ee,
          ee,
          fe,
          fe,
          ge,
          ge,
          he,
          he,
          ie,
          ie,
          je,
          je,
          ke,
          ke,
          le,
          le,
          me,
          me,
          ne,
          ne,
          ne,
          ne,
          ne
        ],
        83, 0, -9),
    Gj = O(
        [
          [20, 750, 470, 122, 134],
          oe,
          oe,
          oe,
          oe,
          oe,
          oe,
          oe,
          oe,
          [20, 0, 567, 122, 134],
          [20, 125, 567, 122, 134],
          pe,
          pe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          qe,
          re,
          re,
          re,
          re,
          re,
          re,
          [20, 1125, 574, 122, 134],
          [20, 500, 576, 122, 134]
        ],
        83, 0, -9),
    Hj = O(
        [
          se, se, se, se, te, ue, ve, ve, te, ue, ue, ve, ve,
          [20, 875, 711, 122, 134], [20, 1E3, 711, 122, 134]
        ],
        83, 0, -9),
    Ij = O(
        [
          we,
          we,
          we,
          we,
          we,
          [20, 500, 713, 122, 134],
          [20, 625, 733, 122, 134],
          [20, 750, 744, 122, 134],
          xe,
          xe,
          xe,
          ye,
          ye,
          ye,
          ye,
          [20, 125, 841, 122, 134],
          ze,
          ze,
          ze,
          ze,
          ze,
          ze,
          ze,
          ze,
          ze,
          ze,
          [20, 875, 848, 122, 134],
          [20, 1E3, 848, 122, 134],
          [20, 1125, 848, 122, 134],
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          Ae,
          [20, 875, 848, 122, 134],
          Be,
          Be,
          Be,
          Be,
          [20, 750, 881, 122, 134]
        ],
        83, 0, -9),
    Jj = O(
        [
          [20, 375, 883, 122, 134], [20, 0, 978, 122, 134],
          [20, 125, 978, 122, 134], [20, 250, 978, 122, 134], Ce, Ce, Ce, Ce,
          Ce, Ce, Ce, Ce, Ce, [20, 1E3, 985, 122, 134],
          [20, 1125, 985, 122, 134], [20, 500, 987, 122, 134],
          [20, 625, 1007, 122, 134]
        ],
        83, 0, -9),
    Kj = O(
        [
          [34, 3834, 0, 99, 112], [34, 3936, 0, 99, 112],
          [34, 3834, 115, 99, 112], [34, 3936, 115, 99, 112]
        ],
        83, -2, 17),
    Lj = O([[36, 3410, 434, 117, 86]], 83, 20, -2),
    Mj = O([[36, 3530, 523, 117, 86], [36, 620, 580, 117, 86]], 83, 20, -2),
    Nj = O([[36, 3530, 434, 117, 86], [36, 3410, 523, 117, 86]], 83, 20, -2),
    Oj = O(
        [
          [36, 3008, 0, 307, 214], [36, 3318, 0, 307, 214],
          [36, 3008, 217, 307, 214], [36, 3318, 217, 307, 214],
          [36, 0, 363, 307, 214], [36, 310, 363, 307, 214],
          [36, 620, 363, 307, 214], [36, 930, 363, 307, 214],
          [36, 1240, 363, 307, 214], [36, 1550, 363, 307, 214],
          [36, 1550, 363, 307, 214], [36, 1860, 363, 307, 214],
          [36, 2170, 363, 307, 214], [36, 2480, 363, 307, 214],
          [36, 2790, 434, 307, 214], [36, 3100, 434, 307, 214],
          [36, 0, 580, 307, 214], [36, 310, 580, 307, 214]
        ],
        83, 60, -35),
    Pj = N(
        [
          [36, 1075, 726, 74, 81], [36, 1075, 726, 74, 81],
          [36, 1152, 726, 74, 81], [36, 1152, 726, 74, 81],
          [36, 1229, 726, 74, 81], [36, 1229, 726, 74, 81]
        ],
        83, -14, 0),
    Qj =
        O(
            [
              [37, 0, 0, 184, 183], [37, 187, 0, 184, 183],
              [37, 374, 0, 184, 183], [37, 561, 0, 184, 183],
              [37, 561, 0, 184, 183], [37, 561, 0, 184, 183],
              [37, 748, 0, 184, 183], [37, 935, 0, 184, 183],
              [37, 1122, 0, 184, 183], [37, 1309, 0, 184, 183],
              [37, 1496, 0, 184, 183], [37, 1683, 0, 184, 183],
              [37, 1870, 0, 184, 183], [37, 2057, 0, 184, 183],
              [37, 2244, 0, 184, 183]
            ],
            83, -62, 38),
    Rj =
        N(
            [
              [36, 851, 580, 105, 143], [36, 959, 580, 105, 143],
              [36, 1067, 580, 105, 143], [36, 1175, 580, 105, 143],
              [36, 1283, 580, 105, 143], [36, 1391, 580, 105, 143],
              [36, 1499, 580, 105, 143], [36, 1607, 580, 105, 143],
              [36, 1715, 580, 105, 143]
            ],
            83, -124, 65),
    Sj = O([[5, 2090, 686, 113, 113]], 0, -40, 0),
    Tj =
        N(
            [
              [5, 396, 512, 117, 167],  [5, 516, 512, 117, 167],
              [5, 636, 512, 117, 167],  [5, 756, 512, 117, 167],
              [5, 1874, 516, 117, 167], [5, 1994, 516, 117, 167],
              [5, 2114, 516, 117, 167], [5, 2234, 516, 117, 167],
              [5, 2354, 516, 117, 167], [5, 2474, 516, 117, 167],
              [5, 2594, 516, 117, 167], [5, 2714, 516, 117, 167],
              [5, 2834, 516, 117, 167], [5, 2954, 516, 117, 167],
              [5, 3074, 516, 117, 167], [5, 876, 621, 117, 167],
              [5, 1610, 626, 117, 167], [5, 1730, 626, 117, 167],
              [5, 0, 628, 117, 167],    [5, 3950, 635, 117, 167],
              [5, 4070, 635, 117, 167], [5, 4190, 635, 117, 167],
              [5, 4310, 635, 117, 167], [5, 4430, 642, 117, 167],
              [5, 4550, 642, 117, 167], [5, 4670, 642, 117, 167],
              [5, 4790, 642, 117, 167], [5, 3194, 648, 117, 167],
              [5, 3314, 648, 117, 167]
            ],
            83, 0, 0),
    Uj =
        O(
            [
              [5, 2206, 686, 110, 113], [5, 2319, 686, 110, 113],
              [5, 2432, 686, 110, 113], [5, 2545, 686, 110, 113]
            ],
            83, 0, -31),
    Vj =
        N(
            [
              [5, 360, 682, 117, 107], [5, 480, 682, 117, 107],
              [5, 600, 682, 117, 107], [5, 720, 682, 117, 107],
              [5, 1850, 686, 117, 107], [5, 1970, 686, 117, 107]
            ],
            83, 10, -3),
    Wj =
        O(
            [
              [5, 4084, 161, 159, 151], [5, 4084, 161, 159, 151],
              [5, 4246, 161, 159, 151], [5, 4408, 161, 159, 151],
              [5, 4570, 161, 159, 151], [5, 4732, 161, 159, 151],
              [5, 4732, 161, 159, 151]
            ],
            83, 12, -21),
    Xj =
        O(
            [
              [5, 0, 168, 158, 154], [5, 0, 168, 158, 154],
              [5, 161, 168, 158, 154], [5, 322, 168, 158, 154],
              [5, 483, 168, 158, 154], [5, 644, 168, 158, 154],
              [5, 805, 168, 158, 154]
            ],
            83, 0, -26.5),
    Yj =
        O(
            [
              [5, 966, 168, 155, 130], [5, 966, 168, 155, 130],
              [5, 966, 301, 155, 130], [5, 4084, 315, 155, 130],
              [5, 4242, 315, 155, 130], [5, 4400, 315, 155, 130],
              [5, 4400, 315, 155, 130]
            ],
            83, 0, -19),
    Zj =
        O(
            [
              [5, 4872, 315, 129, 144], [5, 4872, 315, 129, 144],
              [5, 1610, 479, 129, 144], [5, 1742, 479, 129, 144],
              [5, 0, 481, 129, 144], [5, 132, 512, 129, 144],
              [5, 264, 512, 129, 144]
            ],
            83, 0, -27),
    ak =
        O(
            [
              [5, 0, 0, 186, 165], [5, 0, 0, 186, 165], [5, 189, 0, 186, 165],
              [5, 378, 0, 186, 165], [5, 567, 0, 186, 165],
              [5, 756, 0, 186, 165], [5, 945, 0, 186, 165]
            ],
            83, 0, -27),
    bk =
        O(
            [
              [5, 2039, 161, 172, 165], [5, 2039, 161, 172, 165],
              [5, 2214, 161, 172, 165], [5, 2389, 161, 172, 165],
              [5, 2564, 161, 172, 165], [5, 2739, 161, 172, 165],
              [5, 2914, 161, 172, 165], [5, 3089, 161, 172, 165]
            ],
            83, 0, -27),
    ck =
        O(
            [
              [5, 3434, 648, 117, 167], [5, 3554, 648, 117, 167],
              [5, 3674, 648, 117, 167], [5, 3794, 648, 117, 167],
              [5, 996, 649, 117, 167], [5, 1116, 649, 117, 167],
              [5, 1236, 649, 117, 167], [5, 1356, 649, 117, 167],
              [5, 3434, 648, 117, 167], [5, 1476, 649, 117, 167],
              [5, 120, 659, 117, 167], [5, 240, 659, 117, 167]
            ],
            83, 0, 0),
    dk = O([[22, 0, 0, 117, 111], [22, 120, 0, 117, 111], De, Ee], 83, 14, -15),
    ek = O([Fe, De, Ee], 83, 14, -15),
    fk =
        O(
            [
              [5, 3264, 161, 161, 158], [5, 3264, 161, 161, 158],
              [5, 3428, 161, 161, 158], [5, 3592, 161, 161, 158],
              [5, 3756, 161, 161, 158], [5, 3920, 161, 161, 158],
              [5, 3920, 161, 161, 158]
            ],
            83, 6, -22),
    gk =
        O(
            [
              [5, 3264, 322, 153, 153], [5, 3264, 322, 153, 153],
              [5, 3420, 322, 153, 153], [5, 3576, 322, 153, 153],
              [5, 3732, 322, 153, 153], [5, 3888, 322, 153, 153],
              [5, 0, 325, 153, 153]
            ],
            83, 0, -28),
    hk =
        O(
            [
              [5, 4491, 472, 137, 167], [5, 4631, 472, 137, 167],
              [5, 4771, 472, 137, 167], [5, 3250, 478, 137, 167],
              [5, 3390, 478, 137, 167], [5, 3530, 478, 137, 167],
              [5, 3670, 478, 137, 167], [5, 3670, 478, 137, 167],
              [5, 3670, 478, 137, 167], [5, 3810, 478, 137, 167],
              [5, 1050, 479, 137, 167], [5, 1190, 479, 137, 167],
              [5, 1330, 479, 137, 167], [5, 1470, 479, 137, 167],
              [5, 1050, 479, 137, 167], [5, 1190, 479, 137, 167],
              [5, 1330, 479, 137, 167], [5, 1470, 479, 137, 167],
              [5, 1050, 479, 137, 167], [5, 1190, 479, 137, 167],
              [5, 1330, 479, 137, 167], [5, 1470, 479, 137, 167],
              [5, 1050, 479, 137, 167], [5, 1190, 479, 137, 167],
              [5, 1330, 479, 137, 167], [5, 1470, 479, 137, 167]
            ],
            83, 0, 0),
    ik =
        O(
            [
              [5, 1134, 0, 178, 158],   [5, 1134, 0, 178, 158],
              [5, 1134, 0, 178, 158],   [5, 1134, 0, 178, 158],
              [5, 1134, 0, 178, 158],   [5, 1315, 0, 178, 158],
              [5, 1496, 0, 178, 158],   [5, 1677, 0, 178, 158],
              [5, 1858, 0, 178, 158],   [5, 2039, 0, 178, 158],
              [5, 2220, 0, 178, 158],   [5, 2401, 0, 178, 158],
              [5, 2582, 0, 178, 158],   [5, 2763, 0, 178, 158],
              [5, 2944, 0, 178, 158],   [5, 3125, 0, 178, 158],
              [5, 3306, 0, 178, 158],   [5, 3487, 0, 178, 158],
              [5, 3668, 0, 178, 158],   [5, 3849, 0, 178, 158],
              [5, 4030, 0, 178, 158],   [5, 4211, 0, 178, 158],
              [5, 4392, 0, 178, 158],   [5, 4573, 0, 178, 158],
              [5, 4754, 0, 178, 158],   [5, 1134, 161, 178, 158],
              [5, 1315, 161, 178, 158], [5, 1496, 161, 178, 158],
              [5, 1677, 161, 178, 158], [5, 1858, 161, 178, 158]
            ],
            83, -40, 0),
    jk = new Map([
      [12, Vj], [1, Uj],  [0, Tj],  [16, Vj], [10, ck], [2, Wj],  [3, Xj],
      [4, Yj],  [5, Zj],  [6, fk],  [7, gk],  [8, ak],  [9, bk],  [13, dk],
      [14, ek], [15, Ej], [11, Dj], [18, hk], [19, Fj], [20, Gj], [21, Hj],
      [22, Ij], [23, Jj], [24, Kj], [25, Lj], [26, Mj], [27, Nj], [28, Oj],
      [29, Pj], [31, Rj], [30, Qj]
    ]),
    kk = new Map([[10, T.Sd]]), lk = new Map([[0, Sj], [1, ik]]),
    mk = function() {
      P.call(this, jk, kk);
      this.o = new vj;
      this.brightness = 100;
      this.va = 150;
      this.H = !1;
      this.s = 0;
      y(this, 320, 180);
      this.j = 5;
      this.ha = this.j - 1;
      this.state = 0;
      Cj.addListener(this);
      v(this, this.o)
    };
p(mk, P);
var nk = function(a) {
  0 >= a.s && 1 != a.state &&
      (a.j = Math.max(0, a.j - 1), Q(a, 1, 0),
       0 >= a.j && !a.H ?
           (a.H = !0, U(Cj, 0),
            Q(a, 18, 350, void 0, void 0,
              function() {
                T.Rd.play()
              }),
            a.g && Q(a.g, 1, 350), I(a, 900),
            Hg(a, 1E3, A(a), new t(A(a).x, -100), function() {}, Dg),
            J(a, 500,
              function() {
                U(Cj, 16)
              })) :
           (a.s = a.va, Q(a, 0, 350)));
  a.j <= a.ha && (a.ha--, U(Cj, 21))
}, ok = function(a) {
  0 != a.state && (a.U(0), a.g && a.g.U(0))
}, qk = function(a, b) {
  if (18 == a.state) return !1;
  L(a);
  a.U(pk.get(b));
  Q(a, 0, 500);
  return !0
};
mk.prototype.reset = function() {
  this.j = 5;
  this.ha = this.j - 1;
  this.H = !1;
  this.g && x(this.g)
};
mk.prototype.update = function(a) {
  this.s -= a;
  P.prototype.update.call(this, a)
};
mk.prototype.Ca = function(a) {
  100 !== this.brightness ?
      (a.save(), a.filter = 'brightness(' + this.brightness + '%)',
       P.prototype.Ca.call(this, a), a.restore()) :
      P.prototype.Ca.call(this, a)
};
mk.prototype.Pa = function(a, b) {
  switch (a) {
    case 6:
      this.o.Ta() ? (a = this.o, a.g || wj(a)) : nk(this);
      break;
    case 7:
    case 9:
      rk(this);
      break;
    case 8:
      sk(this);
      break;
    case 19:
      xj(this.o, b);
      break;
    case 28:
      v(this, new Aj);
      break;
    case 18:
      this.j = a = this.j + 1, U(Cj, 10, a)
  }
};
var tk =
        function(a, b, c) {
  Q(a, 10, 0);
  Q(a, 0, 1E3 / a.Gb(), null, b, c)
},
    rk =
        function(a) {
      0 == a.state && a.U(16)
    },
    sk =
        function(a) {
      16 == a.state && a.U(0)
    },
    uk =
        function(a) {
      a.g ? x(a.g) : (a.g = new P(lk), K(a.g, new nj(a, .7, 3)));
      a.g.setScale(2.5);
      a.g.Cb = !1;
      og(a.g, 2);
      v(a, a.g)
    },
    vk = 83 * Dj.length,
    pk = new Map([
      [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 9], [6, 7], [8, 8], [7, 0]
    ]);
[].concat(ja(pk.entries())).map(function(a) {
  return [a[1], a[0]]
});
var wk = td.wa(), xk = function(a) {
  u.call(this);
  this.g = a
};
p(xk, u);
xk.prototype.Ca = function(a) {
  for (var b = this.g.length, c = -5, d = 0; d < b; d++) {
    var e = cj.get(this.g[d]).ya;
    c += e[3] + 5
  }
  c = -c / 2;
  for (d = 0; d < b; d++)
    e = cj.get(this.g[d]).ya,
    wk.Ca(e, a, Math.floor(c), Math.floor(-wk.Fa(e) / 2)), c += e[3] + 5
};
var yk = function(a, b) {
  this.x = a;
  this.y = b
};
Ra(yk, t);
var zk = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y)
};
yk.prototype.scale = t.prototype.scale;
var Ak = function(a) {
  return a.scale(1 / zk(a))
};
yk.prototype.add = function(a) {
  this.x += a.x;
  this.y += a.y;
  return this
};
yk.prototype.rotate = function(a) {
  var b = Math.cos(a);
  a = Math.sin(a);
  var c = this.y * b + this.x * a;
  this.x = this.x * b - this.y * a;
  this.y = c;
  return this
};
var Bk = function(a, b) {
  return new yk(a.x - b.x, a.y - b.y)
}, Ck = function(a, b, c) {
  return new yk(q(a.x, b.x, c), q(a.y, b.y, c))
};
var Dk = Ui(), Ek = function(a, b, c, d, e, f, g, h) {
  P.call(this, a, h);
  this.points = b;
  this.Ha = f;
  this.va = !1;
  this.s = 0;
  this.j = !0;
  this.Wa = .2;
  this.Ia = new pj;
  this.Ia.Ba = !1;
  v(this, this.Ia);
  this.Cb = 320 > d;
  this.o = c;
  this.g = new xk(c);
  y(this.g, this.Cb ? -7 : 7, g);
  this.g.W = 1;
  v(this, this.g);
  this.nb = Mg(a.get(2));
  this.ha = Mg(a.get(3));
  this.Ea = Mg(a.get(5));
  y(this, d, e);
  460 < this.W && (this.W = 460);
  this.opacity = .8;
  K(this, new nj(this, .8, 5));
  Dk.addListener(this)
};
p(Ek, P);
var Fk = function(a, b) {
  0 < b && (a.s = b, Q(a, 1, b, A(a), Ck(A(a), a.Ha, 1 - a.Wa * a.Gb())))
}, Gk = function(a, b, c) {
  c = void 0 === c ? 1 : c;
  K(a, new tj(1E3, 0, b, function(d) {
      a.setScale(d);
      a.g.setScale(c)
    }))
};
Ek.prototype.Qb = function() {
  this.Ya(0, .8, 1E3)
};
Ek.prototype.Od = function() {
  L(this);
  Ig(this);
  this.U(2);
  U(Dk, 6);
  Ri().play(T.qd);
  this.kd()
};
Ek.prototype.kd = function() {
  var a = this;
  Q(this, 4, this.nb, void 0, void 0, function() {
    a.Ya(.8, 0, 500)
  });
  Q(this, 6, 500)
};
var Jk = function(a, b) {
  if (!Hk(a) || Ik(a) !== b) return !1;
  switch (b) {
    case 6:
      return U(Dk, 20), !0;
    case 8:
      return U(Dk, 28), !0;
    default:
      return a.H()
  }
}, Ik = function(a) {
  if (Hk(a)) return a.o[0]
};
Ek.prototype.H = function() {
  var a = this;
  if (0 === this.o.length) return !0;
  var b = this.o.shift();
  b = cj.get(b).color;
  this.Ib() ? this.Na(b) :
              (U(Dk, 11, {points: this.points, position: A(this), color: b}),
               this.U(3), K(this, new E(this.ha, null, function() {
                              a.U(0)
                            })), this.ld());
  return !0
};
Ek.prototype.Ib = function() {
  return 0 == this.o.length
};
Ek.prototype.ld = function() {};
Ek.prototype.Na = function(a, b) {
  a = void 0 === a ? '#000' : a;
  b = void 0 === b ? !0 : b;
  L(this);
  Ig(this);
  Dk.removeListener(this);
  this.U(5);
  Q(this, 6, this.Ea);
  U(Dk, 5, {points: this.points, position: A(this), color: a});
  b && Ri().play(T.Qc)
};
var Kk = function(a) {
  a.Ia.Ba = !0;
  K(a, new E(500, null, function() {
      a.Ia.Ba = !1
    }))
};
Ek.prototype.update = function(a) {
  P.prototype.update.call(this, a);
  6 == this.state ? x(this) : 1 == this.state && this.Od()
};
Ek.prototype.Ya = function(a, b, c) {
  this.opacity = a;
  K(this, new Kg(this, c, a, b))
};
var Lk = function(a, b) {
  a.o = b;
  x(a.g);
  a.g = new xk(b);
  y(a.g, a.Cb ? -7 : 7, -35);
  a.g.W = 1;
  v(a, a.g)
}, Mk = function(a) {
  a.va && (L(a), a.H(), a.va = !1, H(a, new E(a.ha, null, function() {
                                       Fk(a, a.s)
                                     })))
};
Ek.prototype.Pa = function(a) {
  var b = this;
  Hk(this) &&
      (20 === a ? (Kk(this), this.H()) :
                  28 === a &&
               (this.va = !0, L(this), this.U(10),
                Q(this, 0, 1E3, A(this), Nk(this), function() {
                  b.H();
                  b.va = !1;
                  Fk(b, b.s)
                })))
};
var Hk =
        function(a) {
  return a.getParent() && a.Ta() && 6 != a.state && a.j
},
    Nk =
        function(a) {
      a = ag(A(a), a.Ha);
      a = Ak(new yk(a.x, a.y));
      return new t(Xb(295 * a.x + 320, 640), Xb(295 * a.y + 180, 360))
    },
    Sk =
        function(a, b, c, d, e) {
      return new Ek(
          new Map([
            [0, Ok], [2, Pk], [3, Qk], [5, Rk], [6, [Rk[Rk.length - 1]]],
            [10, Qk]
          ]),
          10, a, b, c, d, void 0 === e ? -35 : e)
    },
    Ok = O([[21, 2572, 988, 83, 105]], 83, 0, 0),
    Qk = O(
        [
          [21, 3030, 770, 109, 91], [21, 2572, 779, 109, 91],
          [21, 2684, 779, 109, 91], [21, 2796, 779, 109, 91],
          [21, 2908, 779, 109, 91], [21, 2908, 779, 109, 91],
          [21, 2908, 779, 109, 91], [21, 2908, 779, 109, 91]
        ],
        83, 0, 0),
    Rk = O(
        [
          [21, 3020, 864, 97, 112], [21, 3120, 864, 97, 112],
          [21, 2572, 873, 97, 112], [21, 2672, 873, 97, 112],
          [21, 2772, 873, 97, 112], [21, 2872, 873, 97, 112],
          [21, 2972, 979, 97, 112], [21, 3072, 979, 97, 112]
        ],
        83, 0, 0),
    Pk = O(
        [
          [21, 2572, 988, 83, 105], [21, 2658, 988, 83, 105],
          [21, 2744, 988, 83, 105], [21, 2830, 988, 83, 105],
          [21, 2916, 1094, 83, 105], [21, 3002, 1094, 83, 105],
          [21, 3088, 1094, 83, 105], [21, 2572, 1096, 83, 105],
          [21, 2572, 1096, 83, 105]
        ],
        83, 0, 0);
var Tk = Ui(), Vk = function(a, b, c) {
  Ek.call(this, Uk, 10, a, b, c, new t(0, 0), -35);
  this.Ma = b;
  this.rb = c;
  this.Aa = T.$d;
  this.W = 2E3
};
p(Vk, Ek);
Vk.prototype.H = function() {
  var a = this;
  if (0 === this.o.length) return !0;
  var b = this.o.shift(), c = cj.get(b).color;
  if (this.Ib()) {
    this.Aa.stop();
    L(this);
    b = new t(this.Ma, this.rb + 18);
    var d = new t(this.Ma, this.rb + -150);
    J(this, 0, function() {
      T.Id.play()
    });
    H(this, new F(this, 300, null, b, function() {}, Dg));
    H(this, new F(this, 600, null, d, function() {}, Eg));
    H(this, new D(function() {
        a.Na(c, !1)
      }))
  } else
    U(Tk, 11, {points: this.points, position: A(this), color: c}), this.U(3),
        K(this, new E(this.ha, null, function() {
            a.U(0)
          })), this.ld();
  return !0
};
Vk.prototype.Ca = function(a) {
  Ek.prototype.Ca.call(this, a);
  var b = a.createRadialGradient(0, 18, 20, 0, 18, 100);
  b.addColorStop(0, 'rgba(240, 183, 29, 1)');
  b.addColorStop(.3, 'rgba(240, 183, 29, 0.9)');
  b.addColorStop(1, 'rgba(240, 183, 29, 0)');
  a.globalAlpha = .3 * this.opacity;
  a.beginPath();
  a.arc(0, 18, 100, 0, 2 * Math.PI);
  a.fillStyle = b;
  a.fill();
  a.globalAlpha = .4 * this.opacity;
  a.beginPath();
  a.arc(0, 18, 20, 0, 2 * Math.PI);
  a.fillStyle = '#f0b71d';
  a.fill()
};
var Xk =
        function(a, b, c) {
  b     ? c ? Wk(a, .1, 1, 1E3, Dg, !0) : a.opacity = 1 :
      c ? Wk(a, 1, .1, 1E3, Dg, !0) :
          a.opacity = 0
},
    Yk =
        function(a, b) {
      J(a, 0, function() {
        T.Id.play()
      });
      H(a, new F(a, 700, null, b, function() {}, Eg))
    },
    Zk =
        function(a) {
      I(a, 1E3);
      for (var b = 0; b < Math.floor(Wb(1, 3)); b++)
        I(a, Wb(20, 60)), H(a, new D(function() {
                              a.opacity = Wb(.5, .8)
                            })),
            I(a, Wb(20, 60)), H(a, new D(function() {
                                  a.opacity = 1
                                }));
      Wk(a, 1, .5, 2E3, Fg);
      Wk(a, .5, 1, 2E3, Fg);
      J(a, 200, function() {
        Zk(a)
      })
    },
    $k =
        function(a) {
      K(a, new D(function() {
          Ii(a.Aa, .1);
          a.Aa.play(0, !0)
        }));
      K(a, new D(function() {
          setTimeout(function() {
            Ji(a.Aa, .5, 2)
          }, 10)
        }))
    },
    Wk =
        function(a, b, c, d, e, f) {
      e = void 0 === e ? Dg : e;
      f = void 0 === f ? !1 : f;
      J(a, 0, function() {
        f && (b < c ? (Ii(T.Ed, .5), T.Ed.play()) : (Ii(T.Dd, .5), T.Dd.play()))
      });
      H(a, new Kg(a, d, b, c, function() {}, e))
    },
    al = N([[15, 11574, 0, 118, 154]], 83, 0, 0),
    Uk = new Map([[0, al], [2, al], [3, al], [5, al], [6, al]]);
var bl = function(a, b) {
  u.call(this);
  this.g = 0;
  y(this, a, b)
};
p(bl, u);
bl.prototype.update = function(a) {
  this.g += a
};
bl.prototype.Ca = function(a) {
  var b = Math.min(1, this.g / 1500);
  a.save();
  a.lineCap = 'round';
  a.lineJoin = 'round';
  a.lineWidth = 3;
  a.strokeStyle = 'white';
  a.translate(-476, -163);
  Xi(a, b, aj);
  a.restore()
};
function cl() {
  if (Ki)
    for (var a = n(Object.keys(Oi.wa().o)), b = a.next(); !b.done; b = a.next())
      Oi.wa().o[b.value].S = Oi.wa().o[b.value].S + 25
};
var dl =
    'af am ar az bg bs ca cs da de el en en-GB es es-419 et fa fil fr hi hr hu hy id is it iw ja ka kk km ko ky lo lt lv mk mn my nl no pl pt-BR pt-PT ro ru si sk sl sq sr sv sw th tr uk uz zh-CN zh-HK zh-TW zu'
        .split(' ');
Ng(
    [
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [xd, 115, 206],
      [[20, 662, 1275, 75, 37], 112, 197],
      [[20, 168, 1208, 81, 43], 112, 191],
      [[20, 740, 1275, 75, 37], 112, 192],
      [[20, 168, 1254, 75, 38], 112, 189],
      [[20, 246, 1254, 75, 38], 112, 187],
      [[20, 324, 1273, 75, 38], 112, 180],
      [[20, 402, 1273, 75, 38], 112, 174],
      [[20, 0, 1280, 75, 37], 112, 165],
      [[20, 666, 1144, 75, 44], 112, 148],
      [[20, 895, 1280, 74, 47], 113, 135],
      [[20, 818, 1280, 74, 59], 114, 116],
      [[20, 78, 1280, 74, 64], 114, 101],
      [[20, 1048, 1280, 69, 68], 116, 81],
      [[20, 480, 1282, 69, 68], 116, 69],
      [[20, 155, 1295, 69, 68], 116, 55],
      [[20, 227, 1295, 69, 68], 116, 41],
      [[20, 552, 1305, 69, 68], 116, 26],
      [[20, 299, 1314, 69, 68], 116, 21],
      [[20, 371, 1314, 69, 68], 116, 18],
      [[20, 1192, 1318, 67, 69], 118, 15],
      [[20, 624, 1315, 69, 68], 116, 16],
      [[20, 696, 1315, 69, 68], 116, 19],
      [yd, 116, 20],
      [yd, 116, 20],
      [yd, 116, 20],
      [yd, 116, 20],
      [yd, 116, 20],
      [yd, 116, 20]
    ],
    83);
Ng(
    [
      [[20, 972, 1280, 73, 64], 112, 21], [[20, 500, 1376, 52, 45], 132, 26],
      [[20, 1296, 1157, 58, 50], 131, 19], [[20, 894, 1385, 51, 47], 133, 17],
      [[20, 663, 1386, 51, 46], 133, 18], [[20, 609, 1386, 51, 47], 133, 18],
      [[20, 0, 1388, 51, 46], 133, 19], [[20, 1134, 1389, 50, 46], 120, 5],
      [[20, 1187, 1390, 50, 45], 77, 0], [[20, 562, 1436, 47, 44], 29, 16],
      [[20, 612, 1436, 46, 42], 19, 22], [[20, 0, 1437, 46, 42], 19, 20],
      [[20, 262, 1438, 46, 42], 19, 17], [[20, 311, 1438, 46, 42], 19, 19]
    ],
    83);
Ng(
    [
      [zd, 60, 84],
      [zd, 60, 84],
      [zd, 60, 84],
      [zd, 60, 84],
      [[20, 832, 1342, 59, 54], 66, 92],
      [[20, 768, 1342, 61, 53], 67, 96],
      [Ad, 68, 98],
      [Ad, 68, 98],
      [[20, 832, 1342, 59, 54], 66, 92],
      [Bd, 67, 96],
      [Bd, 67, 96],
      [Cd, 68, 98],
      [Cd, 68, 98],
      [[20, 1024, 1351, 54, 50], 53, 82],
      [[20, 1101, 223, 54, 51], 17, 53],
      [[20, 244, 1366, 51, 51], 0, 27],
      [[20, 443, 1353, 54, 50], 3, 26],
      [[20, 131, 1366, 54, 50], 35, 26],
      [[20, 188, 1366, 53, 50], 72, 25],
      [[20, 1101, 169, 55, 51], 137, 21],
      [[20, 1262, 1366, 53, 50], 198, 20],
      [[20, 555, 1376, 51, 50], 254, 18],
      [[20, 298, 1385, 51, 50], 329, 18],
      [[20, 352, 1385, 51, 50], 366, 18],
      [[20, 1081, 1389, 50, 50], 407, 18],
      [[20, 614, 166, 11, 29], 446, 23]
    ],
    83);
O(
    [
      [20, 769, 1398, 49, 66],  [20, 821, 1399, 49, 66],
      [20, 821, 1399, 49, 66],  [20, 821, 1399, 49, 66],
      [20, 821, 1399, 49, 66],  [20, 821, 1399, 49, 66],
      [20, 54, 1403, 49, 66],   [20, 948, 1403, 49, 66],
      [20, 1E3, 1404, 49, 66],  [20, 406, 1406, 49, 66],
      [20, 406, 1406, 49, 66],  [20, 406, 1406, 49, 66],
      [20, 406, 1406, 49, 66],  [20, 406, 1406, 49, 66],
      [20, 106, 1419, 49, 66],  [20, 158, 1419, 49, 66],
      [20, 210, 1420, 49, 66],  [20, 1240, 1419, 49, 66],
      [20, 1292, 1419, 49, 66], [20, 458, 1424, 49, 66],
      [20, 510, 1429, 49, 66],  [20, 510, 1429, 49, 66],
      [20, 510, 1429, 49, 66],  [20, 663, 1435, 49, 66]
    ],
    83, 0, 0);
var el = Ui(), gl = function(a, b) {
  Ek.call(this, fl, 10, [], a, b, new t(100, 180), -35);
  this.Cb = !1;
  this.Wa = .15
};
p(gl, Ek);
gl.prototype.Na = function(a) {
  a = void 0 === a ? '#000' : a;
  L(this);
  Ig(this);
  el.removeListener(this);
  this.U(5);
  Q(this, 14, this.Ea);
  var b = new F(this, 1E3, null, new t(640, A(this).y)),
      c = new Kg(this, 500, 1, 0);
  H(this, new tg([b, c]));
  Q(this, 6, 0);
  U(el, 5, {points: this.points, position: A(this), color: a});
  T.Qc.play()
};
var hl = O([[18, 1369, 1061, 79, 36]], 83, 0, 0), il = O([Hd, Id], 83, 0, 0),
    jl = O([Jd], 83, 0, 0), kl = O([Ed, Fd, Gd], 83, 0, 0),
    ll = O(Pf, 83, 0, 0), ml = O(Qf, 83, 0, 0),
    nl = O(
        [
          [18, 1929, 0, 86, 64],   [18, 1929, 67, 86, 64],
          [18, 1929, 134, 86, 64], [18, 1929, 201, 86, 64],
          [18, 1929, 268, 86, 64], [18, 1929, 268, 86, 64],
          [18, 1929, 335, 86, 64], [18, 1929, 335, 86, 64],
          [18, 1929, 402, 86, 64], [18, 1929, 469, 86, 64],
          [18, 1929, 536, 86, 64], [18, 1929, 603, 86, 64],
          [18, 1929, 670, 86, 64], [18, 1619, 726, 86, 64],
          [18, 1708, 726, 86, 64], [18, 1797, 726, 86, 64],
          [18, 1797, 726, 86, 64], [18, 1797, 726, 86, 64],
          [18, 1886, 737, 86, 64], [18, 1797, 726, 86, 64],
          [18, 1886, 737, 86, 64], [18, 1797, 726, 86, 64],
          [18, 1797, 726, 86, 64], [18, 1797, 726, 86, 64],
          [18, 1797, 726, 86, 64], [18, 1797, 726, 86, 64],
          [18, 1797, 726, 86, 64], [18, 1619, 793, 86, 64],
          [18, 1708, 793, 86, 64], [18, 1797, 793, 86, 64],
          [18, 1886, 804, 86, 64]
        ],
        83, 0, 0),
    ol = N([[18, 1451, 1061, 79, 36]], 83, 0, 0),
    fl = new Map([
      [0, hl], [2, ll], [3, hl], [11, il], [12, kl], [5, ml], [13, nl],
      [14, jl], [6, hl]
    ]),
    pl = new Map([[0, ol], [2, ol], [3, ol], [5, ol], [6, ol]]);
var ql = Ui(), sl = function() {
  P.call(this, rl);
  this.T = this.ta = null;
  this.hb = 8E3;
  this.Zc = !0;
  this.qc = 0;
  this.brightness = 20;
  this.bc = T.ze;
  y(this, 320, 180);
  this.opacity = 0;
  this.setScale(.8);
  ql.addListener(this)
};
p(sl, P);
m = sl.prototype;
m.update = function(a) {
  var b = this, c;
  if (null === (c = this.ta) || void 0 === c ? 0 : 5 === c.state)
    this.ta = null, this.bc.stop(), L(this), Ig(this),
    this.Ib() ? this.Na() :
                (this.U(4), I(this, 500), tl(this, 1E3, this.Gb(), .8),
                 J(this, 0, function() {
                   b.Ya(1, 0, 1E3)
                 }));
  P.prototype.update.call(this, a)
};
m.Ca = function(a) {
  a.save();
  a.filter = 'brightness(' + this.brightness + '%)';
  P.prototype.Ca.call(this, a);
  a.restore()
};
m.Ib = function() {
  return 3 === this.qc
};
m.Na = function() {
  this.U(6);
  T.xe.play();
  this.T && (this.T.brightness = 100)
};
m.Fb = function(a, b) {
  this.T = b;
  this.Zc = !0;
  this.qc++;
  this.ta = a;
  a = A(this);
  y(this.ta, a.x, a.y);
  this.ta.points = 100;
  this.ta.opacity = 0;
  this.ta.g.opacity = 0;
  this.ta.W = this.W + 1;
  this.hb -= 1E3;
  this.kb()
};
m.kb = function() {
  var a = this;
  this.setScale(.8);
  Q(this, 0, 300);
  this.Zc && (this.opacity = 0, J(this, 10, function() {
                a.ta && K(a, new Kg(a.ta.g, 1500, 0, 1, function() {}, Dg));
                K(a, new Kg(a, 1500, 0, 1, function() {}, Dg))
              }));
  ul(this);
  J(this, 0, function() {
    K(a, new Og(a, 1, 2E3, void 0, void 0, void 0))
  });
  tl(this, this.hb - Mg(vl), .8, 1.5);
  Q(this, 2, 0);
  I(this, Mg(vl) - 200);
  J(this, 0, function() {
    a.bc.stop();
    T.we.play();
    U(ql, 6)
  });
  Q(this, 5, 0);
  I(this, Mg(wl));
  tl(this, 1E3, 1.5, .8, function() {
    a.Zc = !1;
    a.kb()
  })
};
var tl = function(a, b, c, d, e) {
  e = void 0 === e ? function() {} : e;
  var f = new tj(b, c, d, function(k) {
    a.setScale(k)
  }, Dg), g = 100, h = 40;
  d < c && (g = 40, h = 100);
  c = new tj(
      .8 * b, null, g,
      function(k) {
        a.brightness = k
      },
      Dg,
      function() {
        return a.brightness
      });
  b = new tj(
      .6 * b, null, h,
      function(k) {
        a.T && (a.T.brightness = k)
      },
      Dg,
      function() {
        return a.T ? a.T.brightness : 100
      });
  f = new tg([f, c, b]);
  H(a, f);
  H(a, new D(function() {
      e()
    }))
}, ul = function(a) {
  J(a, 0, function() {
    Ii(a.bc, .1);
    a.bc.play()
  });
  J(a, 2, function() {
    Ji(a.bc, 1, 4)
  })
};
sl.prototype.Pa = function(a) {
  0 === a && (Ig(this), L(this), tl(this, 500, 1.5, .8), J(this, 0, function() {
                T.ye.play()
              }), Q(this, 7, 0))
};
var xl = O([Kd], 83, 0, 0),
    yl = O(
        [
          Kd, [15, 8921, 726, 559, 360], [15, 9483, 726, 559, 360],
          [15, 10045, 726, 559, 360], [15, 10607, 726, 559, 360],
          [15, 11169, 726, 559, 360], [15, 0, 1089, 559, 360],
          [15, 562, 1089, 559, 360], [15, 1124, 1089, 559, 360],
          [15, 1686, 1089, 559, 360], [15, 2248, 1089, 559, 360]
        ],
        83, 0, 0),
    vl = O(
        [
          [15, 2248, 1089, 559, 360], [15, 2248, 1089, 559, 360],
          [15, 2810, 1089, 559, 360], [15, 3372, 1089, 559, 360],
          [15, 3934, 1089, 559, 360]
        ],
        83, 0, 0),
    wl = O(
        [
          [15, 4496, 1089, 559, 360], [15, 5058, 1089, 559, 360],
          [15, 6744, 1089, 559, 360], [15, 7306, 1089, 559, 360],
          [15, 7868, 1089, 559, 360], [15, 8430, 1089, 559, 360],
          [15, 8992, 1089, 559, 360], [15, 9554, 1089, 559, 360],
          [15, 10116, 1089, 559, 360], [15, 10116, 1089, 559, 360],
          [15, 10116, 1089, 559, 360], [15, 10678, 1089, 559, 360],
          [15, 0, 1452, 559, 360], Kd
        ],
        83, 0, 0),
    zl = O(
        [
          [15, 5840, 1452, 403, 336], [15, 6246, 1452, 403, 336],
          [15, 6652, 1452, 403, 336], [15, 7058, 1452, 403, 336],
          [15, 7464, 1452, 403, 336], [15, 7870, 1452, 403, 336],
          [15, 7870, 1452, 403, 336], [15, 7870, 1452, 403, 336],
          [15, 7870, 1452, 403, 336], [15, 7870, 1452, 403, 336],
          [15, 7870, 1452, 403, 336], [15, 7870, 1452, 403, 336],
          [15, 8276, 1452, 403, 336], [15, 8682, 1452, 403, 336],
          [15, 9088, 1452, 403, 336], [15, 9494, 1452, 403, 336],
          [15, 9900, 1452, 403, 336], [15, 10306, 1452, 403, 336],
          [15, 10712, 1452, 403, 336]
        ],
        83, 0, 0),
    Al = O(
        [
          [15, 1929, 0, 640, 360],    [15, 2572, 0, 640, 360],
          [15, 3215, 0, 640, 360],    [15, 3858, 0, 640, 360],
          [15, 4501, 0, 640, 360],    [15, 5144, 0, 640, 360],
          [15, 5787, 0, 640, 360],    [15, 6430, 0, 640, 360],
          [15, 7073, 0, 640, 360],    [15, 7716, 0, 640, 360],
          [15, 8359, 0, 640, 360],    [15, 9002, 0, 640, 360],
          [15, 9645, 0, 640, 360],    [15, 10288, 0, 640, 360],
          [15, 10931, 0, 640, 360],   [15, 0, 363, 640, 360],
          [15, 643, 363, 640, 360],   [15, 1286, 363, 640, 360],
          [15, 1929, 363, 640, 360],  [15, 1286, 363, 640, 360],
          [15, 1929, 363, 640, 360],  [15, 2572, 363, 640, 360],
          [15, 3215, 363, 640, 360],  [15, 3858, 363, 640, 360],
          [15, 4501, 363, 640, 360],  [15, 5144, 363, 640, 360],
          [15, 5787, 363, 640, 360],  [15, 6430, 363, 640, 360],
          [15, 7073, 363, 640, 360],  [15, 7716, 363, 640, 360],
          [15, 7716, 363, 640, 360],  [15, 7716, 363, 640, 360],
          [15, 7716, 363, 640, 360],  [15, 7716, 363, 640, 360],
          [15, 7716, 363, 640, 360],  [15, 7716, 363, 640, 360],
          [15, 8359, 363, 640, 360],  [15, 9002, 363, 640, 360],
          [15, 9645, 363, 640, 360],  [15, 10288, 363, 640, 360],
          [15, 10931, 363, 640, 360], [15, 0, 726, 640, 360],
          [15, 643, 726, 640, 360],   [15, 1286, 726, 640, 360],
          [15, 1929, 726, 640, 360],  [15, 2572, 726, 640, 360],
          [15, 3215, 726, 640, 360],  [15, 3858, 726, 640, 360],
          [15, 4501, 726, 640, 360],  [15, 5144, 726, 640, 360],
          [15, 5787, 726, 640, 360],  [15, 6430, 726, 640, 360],
          [15, 7073, 726, 640, 360],  [15, 7716, 726, 640, 360]
        ],
        83, 0, 0),
    Bl = O(
        [
          [15, 11118, 1767, 403, 336], [15, 11118, 1767, 403, 336],
          [15, 562, 1791, 403, 336],   [15, 968, 1791, 403, 336],
          [15, 1374, 1791, 403, 336],  [15, 1780, 1791, 403, 336],
          [15, 2186, 1791, 403, 336],  [15, 2592, 1791, 403, 336],
          [15, 2998, 1791, 403, 336],  [15, 3404, 1791, 403, 336],
          [15, 3810, 1791, 403, 336],  [15, 4216, 1791, 403, 336],
          [15, 4622, 1791, 403, 336],  [15, 5028, 1791, 403, 336],
          [15, 5434, 1791, 403, 336],  [15, 5840, 1791, 403, 336],
          [15, 6246, 1791, 403, 336],  [15, 5028, 1791, 403, 336],
          [15, 6652, 1791, 403, 336],  [15, 7058, 1791, 403, 336],
          [15, 7464, 1791, 403, 336],  [15, 5028, 1791, 403, 336],
          [15, 7870, 1791, 403, 336],  [15, 8276, 1791, 403, 336],
          [15, 8682, 1791, 403, 336],  [15, 5028, 1791, 403, 336],
          [15, 9088, 1791, 403, 336],  [15, 9494, 1791, 403, 336],
          [15, 9900, 1791, 403, 336],  [15, 5028, 1791, 403, 336]
        ],
        83, 0, 0),
    rl = new Map([
      [0, xl], [1, yl], [2, vl], [5, wl], [3, xl], [4, zl], [6, Al], [7, Bl]
    ]);
var Cl = Ui(), Dl = td.wa(), El = [['o']],
    Fl =
        [
          {
            Vc: [
              '..oo....'.split(''), '.oooo..o'.split(''), '.oooo.oo'.split(''),
              'oooooooo'.split(''), '.oooo.oo'.split(''), '.oooo..o'.split(''),
              '..oo....'.split('')
            ],
            $c: 10,
            Uc: '-|-v-|-v'
          },
          {
            Vc: [
              ['.', 'o', 'o', '.', 'o'], ['o', 'o', 'o', 'o', 'o'],
              ['.', 'o', 'o', '.', 'o']
            ],
            $c: 7,
            Uc: '^|v^|v^|'
          },
          {Vc: El, $c: 4, Uc: '^-^-^z'}
        ],
    Gl = Dd[3], Hl = Dl.Fa(Dd), Il = ['|', 'v', '^', '-'], Ll = function() {
      P.call(this, Jl);
      this.g = new u;
      this.ha = new Map;
      this.ta = null;
      this.o = new t(450, 180);
      this.hb = 7E3;
      this.s = new G;
      this.j = 0;
      this.H = !1;
      this.opacity = 0;
      y(this, this.o);
      v(this, this.g);
      Kl(this);
      K(this, new nj(this, .8, 5));
      v(this, this.s)
    };
p(Ll, P);
var Kl = function(a) {
  Ig(a);
  L(a);
  ng(a.g);
  x(a.g);
  a.g = new u;
  y(a.g, 400, 0);
  v(a, a.g);
  var b = Fl[a.j].Vc;
  b === El && (a.H = !0);
  for (var c = 0; c < b.length; c++)
    for (var d = 0; d < b[c].length; d++)
      if ('o' === b[c][d]) {
        var e = d * Gl * .54, f = c * Hl * .9 * .8, g = new gl(e, f);
        g.setScale(.9);
        v(a.g, g);
        a.ha.set(new t(e, f), g)
      }
  c = a.g;
  c.Yb = .54 * -Gl * b[0].length / 2;
  mg(c);
  og(a.g, .9 * -Hl * .8 * b.length / 2);
  H(a, new F(a.g, 2E3, null, new t(0, 0)))
}, Nl = function(a, b) {
  var c = 0, d = new Map, e = [].concat(ja(a.g.Ja()));
  mb(e);
  var f = Fl[a.j].$c, g = e.slice(0, f), h = e.slice(f);
  f = 0;
  var k = 360 / h.length;
  h = n(h);
  for (var l = h.next(); !l.done; l = h.next()) {
    l = l.value;
    l.Sb = pl;
    .5 > Math.random() ? l.setScale(.5) : l.setScale(.3);
    l.opacity = 1;
    l.W = 0;
    y(l, 680, f);
    var r = 1E3 * Wb(5, 10);
    r > c && (c = r);
    l = new F(l, r, null, new t(-50, f), function() {});
    d.set(l, !1);
    f += k
  }
  f = 360 / g.length;
  k = 0;
  h = {};
  g = n(g);
  for (l = g.next(); !l.done; h = {Hb: h.Hb, $b: h.$b}, l = g.next())
    h.Hb = l.value, y(h.Hb, 680, k), k += f, h.$b = 1E3 * Wb(6, 10),
    h.$b > c && (c = h.$b), l = new D(function(w) {
                              return function() {
                                Fk(w.Hb, w.$b)
                              }
                            }(h)),
    d.set(l, !0), Lk(h.Hb, Ml()), h.Hb.W = 2, l = h.Hb.g, l.setScale(.75),
    l.Yb = -10, mg(l), og(l, 20);
  J(a, 0, function() {
    ng(a.g);
    for (var w = n(e), B = w.next(); !B.done; B = w.next()) v(b, B.value)
  });
  f = Array.from(d.keys());
  mb(f);
  g = {};
  f = n(f);
  for (k = f.next(); !k.done; g = {Bc: g.Bc}, k = f.next())
    g.Bc = k.value, k = d.get(g.Bc) ? 300 : 100, c += k, J(a, k, function(w) {
      return function() {
        K(a, w.Bc)
      }
    }(g));
  return c
}, Ol = function(a) {
  for (var b = a.g.Ja().length, c = [], d = 0; d < b; d++) {
    var e = a.g.Ja()[d], f = new t;
    f.y = d <= b / 2 ? -300 : 300;
    f.x = A(e).x - Wb(100, 200);
    e = new F(e, Wb(1E3, 2E3), A(e), f, function() {}, Dg);
    c.push(e)
  }
  b = new tg(c);
  H(a, b);
  return b
};
Ll.prototype.update = function(a) {
  var b;
  if (null === (b = this.ta) || void 0 === b ? 0 : 5 === b.state) {
    this.ta = null;
    L(this);
    Ig(this);
    this.U(3);
    if (this.H) {
      var c = this.g.Ja()[0];
      T.qe.play();
      Q(c, 13, 0);
      Q(c, 14, Mg(c.Sb.get(13)));
      Hg(c, 1E3, null, new t(640, -180));
      P.prototype.update.call(this, a);
      return
    }
    c = n(this.g.Ja());
    for (var d = c.next(); !d.done; d = c.next())
      d = d.value, Q(d, 11, 0), Q(d, 0, 700);
    Hg(this, 700, null, this.o);
    c = 0;
    c = void 0 === c ? 0 : c;
    this.ta &&
        (d = new F(this.ta, 700, null, this.o), I(this.s, c), H(this.s, d))
  }
  P.prototype.update.call(this, a)
};
Ll.prototype.Fb = function(a, b) {
  this.hb -= 1E3;
  this.ta = a;
  a = A(this);
  y(this.ta, a.x, a.y);
  this.ta.points = 75;
  this.ta.opacity = 0;
  this.ta.j = !1;
  this.ta.g.opacity = 0;
  this.ta.W = this.W + 1;
  this.kb(b)
};
Ll.prototype.kb = function(a) {
  var b = this;
  this.ta && 0 === this.ta.g.opacity &&
      (J(this, 0, function() {
         var c;
         null === (c = b.ta) || void 0 === c ? void 0 : c.j = !0
       }), H(this, new Kg(this.ta.g, 500, 0, 1)));
  Pl(this, this.hb, new t(a.x + this.i.ya[3] / 2.1, a.y));
  J(this, 10, function() {
    T.oe.play();
    U(Cl, 6);
    for (var c = b.H ? 2 : 12, d = n(b.g.Ja()), e = d.next(); !e.done;
         e = d.next())
      e = e.value, Q(e, c, 0), Q(e, 0, Mg(e.Sb.get(c)))
  });
  Pl(this, 700, this.o);
  H(this, new D(function() {
      b.kb(a)
    }))
};
var Pl =
        function(a, b, c) {
  var d = [], e = new F(a, b, null, c);
  b = new F(a.ta, b, null, c);
  a.ta && d.push(b);
  d.push(e);
  H(a, new tg(d))
},
    Ml =
        function() {
      for (var a = [], b = 0; 3 > b; b++)
        a.push(Il[Math.floor(Math.random() * Il.length)]);
      return lj(a.join(''))
    },
    Ql = N([[18, 1286, 726, 330, 264]], 83, 0, 0),
    Jl = new Map([[0, Ql], [1, Ql], [4, Ql], [2, Ql], [3, Ql]]);
var Rl = Ui(),
    Sl = N(
        [
          Ld, Ld, Ld, Ld, Ld, Ld, Ld, Ld, [17, 2881, 761, 127, 161],
          [17, 3011, 761, 127, 161], [17, 3141, 761, 127, 161],
          [17, 3271, 761, 127, 161], [17, 1097, 789, 127, 161],
          [17, 1227, 789, 127, 161]
        ],
        83, 2, -10),
    Tl = O(
        [
          [17, 1286, 0, 255, 142],   [17, 1544, 0, 255, 142],
          [17, 1802, 0, 255, 142],   [17, 2060, 0, 255, 142],
          [17, 2318, 0, 255, 142],   [17, 2576, 0, 255, 142],
          [17, 2834, 0, 255, 142],   [17, 3092, 0, 255, 142],
          [17, 1286, 145, 255, 142], [17, 1544, 145, 255, 142],
          [17, 1802, 145, 255, 142], [17, 2060, 145, 255, 142],
          [17, 2318, 145, 255, 142], [17, 2576, 145, 255, 142],
          [17, 2834, 145, 255, 142], [17, 3092, 145, 255, 142],
          [17, 1286, 290, 255, 142], [17, 1544, 290, 255, 142],
          [17, 1802, 290, 255, 142], [17, 2060, 290, 255, 142],
          [17, 2318, 290, 255, 142], [17, 2576, 290, 255, 142],
          [17, 2834, 290, 255, 142], [17, 3092, 290, 255, 142],
          [17, 0, 363, 255, 142]
        ],
        83, -39, 9),
    Ul = N(
        [
          [17, 2051, 761, 137, 162], [17, 2191, 761, 137, 162],
          [17, 2331, 761, 137, 162], [17, 2471, 761, 137, 162],
          [17, 2611, 761, 137, 162], [17, 2051, 761, 137, 162], Md, Md, Md, Md,
          Md, Md, Md, Md
        ],
        83, 0, 0),
    Vl = O(
        [
          [17, 1130, 611, 151, 175], [17, 1284, 611, 151, 175],
          [17, 1438, 611, 151, 175], [17, 0, 671, 151, 175],
          [17, 483, 702, 151, 175], [17, 637, 702, 151, 175],
          [17, 637, 702, 151, 175]
        ],
        83, 0, 0),
    Wl = O(
        [
          [17, 1676, 435, 158, 160], [17, 1837, 435, 158, 160],
          [17, 1998, 435, 158, 160], [17, 2159, 435, 158, 160],
          [17, 2320, 435, 158, 160], [17, 2320, 435, 158, 160],
          [17, 2320, 435, 158, 160], [17, 2320, 435, 158, 160],
          [17, 2481, 435, 158, 160], [17, 2642, 435, 158, 160],
          [17, 2803, 435, 158, 160], [17, 2964, 435, 158, 160],
          [17, 3125, 435, 158, 160], [17, 0, 508, 158, 160],
          [17, 486, 539, 158, 160],  [17, 647, 539, 158, 160],
          [17, 808, 539, 158, 160],  [17, 969, 539, 158, 160],
          [17, 969, 539, 158, 160],  [17, 969, 539, 158, 160],
          [17, 161, 588, 158, 160],  [17, 322, 588, 158, 160],
          [17, 1676, 598, 158, 160], [17, 1837, 598, 158, 160],
          [17, 1998, 598, 158, 160], [17, 2159, 598, 158, 160],
          [17, 2320, 598, 158, 160], [17, 2481, 598, 158, 160],
          [17, 2642, 598, 158, 160], [17, 2803, 598, 158, 160],
          [17, 2964, 598, 158, 160], [17, 3125, 598, 158, 160],
          [17, 3125, 598, 158, 160], [17, 3125, 598, 158, 160],
          [17, 3125, 598, 158, 160], [17, 3125, 598, 158, 160],
          [17, 3125, 598, 158, 160]
        ],
        83, 0, 0),
    Xl = O(
        [
          [17, 486, 363, 167, 173], [17, 656, 363, 167, 173],
          [17, 826, 363, 167, 173], [17, 996, 363, 167, 173],
          [17, 1166, 435, 167, 173], [17, 1336, 435, 167, 173],
          [17, 1506, 435, 167, 173]
        ],
        83, 0, 0),
    Yl = N(Rf, 83, 0, 0), Zl = N([[17, 3350, 0, 56, 56]], 83, -2, 52),
    $l = new Map([[2, T.Gd]]), am = ['--^--^@', 'v|v|v|@', '|-v|^@'],
    bm = [new t(170, 210), new t(120, 150), new t(220, 250)],
    cm = new Map([
      [0, Ul], [2, Xl], [9, Yl], [3, Vl], [5, Wl], [13, Zl],
      [6, [Wl[Wl.length - 1]]], [7, Tl], [14, Sl], [10, Vl], [9, Yl]
    ]),
    dm = function(a) {
      Ek.call(this, cm, 100, lj(am.shift()), bm[0].x, bm[0].y, a, -60, $l);
      this.Aa = bm[0];
      this.opacity = 0;
      this.g.opacity = 0;
      this.Ma = am;
      bm.shift();
      this.rb = bm;
      this.Wa = .3;
      this.j = !1
    };
p(dm, Ek);
m = dm.prototype;
m.kd = function() {
  var a = this;
  Q(this, 9, this.nb);
  Q(this, 0, this.ha, A(this), this.Aa, function() {
    Fk(a, a.s)
  })
};
m.Ib = function() {
  return 0 === this.o.length && 0 === this.Ma.length
};
m.Od = function() {
  L(this);
  Ig(this);
  this.U(2);
  U(Rl, 6);
  this.kd()
};
m.Na = function(a) {
  var b = this;
  Ek.prototype.Na.call(this, void 0 === a ? '#000' : a);
  L(this);
  J(this, 800, function() {
    T.le.play()
  });
  Q(this, 13, this.Ea, void 0, void 0, function() {
    var c = new M(Mf);
    v(b, c);
    y(c, 0, -51);
    c.Cb = !0;
    K(c, new nj(c, .8, 5))
  });
  I(this, 2E4)
};
m.Qb = function() {
  var a = this;
  J(this, 0, function() {
    y(a, new t(999, 999));
    a.opacity = 1;
    a.U(14)
  });
  Hg(this, 4E3, new t(160, 460), A(this));
  J(this, 1E3, function() {
    a.U(7)
  });
  J(this, Mg(Tl), function() {
    a.g.opacity = 1;
    a.U(0);
    a.j = !0
  })
};
m.ld = function() {
  var a = this;
  if (0 === this.o.length) {
    L(this);
    var b = this.Ma.shift();
    T.Qc.play();
    b || this.Na();
    this.Aa = this.rb.shift();
    Q(this, 0, this.ha, A(this), this.Aa, function() {
      a.o.push.apply(a.o, ja(lj(b)));
      a.s *= .5;
      Fk(a, a.s)
    })
  }
};
var em = Ui();
td.wa();
var jm = function() {
  P.call(this, fm);
  this.ta = null;
  this.hb = 7E3;
  this.T = null;
  this.Xb = new M(gm);
  this.xc = new M(hm);
  this.qc = 0;
  this.Xc = T.Ee;
  this.Xb.opacity = 0;
  og(this.Xb, 65);
  this.xc.opacity = 0;
  v(this, this.xc);
  v(this, this.Xb);
  og(this.xc, 215);
  y(this, 320, 360 - this.Fa() / 2);
  this.W = -1;
  this.U(0);
  I(this, Mg(im));
  Q(this, 1, 1);
  em.addListener(this)
};
p(jm, P);
m = jm.prototype;
m.update = function(a) {
  var b;
  if (null === (b = this.ta) || void 0 === b ? 0 : 5 === b.state)
    this.Xc.stop(), T.De.play(),
        this.ta = null, L(this), Ig(this),
        this.Ib() ? this.Na() :
                    (this.U(5), km(this), this.Sb === lm || Q(this, 1, 1));
  P.prototype.update.call(this, a)
};
m.Ib = function() {
  return 3 === this.qc
};
m.Na = function() {
  T.Be.play();
  this.U(6)
};
m.Fb = function(a, b) {
  this.ta = a;
  this.T = b;
  this.qc++;
  a = A(this);
  y(this.ta, a.x, a.y);
  this.ta.points = 100;
  this.ta.opacity = 0;
  this.ta.g.W = b.W + 1;
  this.ta.W = this.W + 1;
  this.hb -= 1E3;
  this.kb()
};
m.kb = function() {
  var a = this;
  Q(this, 1, 300);
  J(this, 0, function() {
    a.Xc.play()
  });
  Q(this, 2, 1, null, void 0, function() {
    a.U(3)
  });
  mm(this);
  I(this, 20);
  Q(this, 4, 1);
  J(this, 0, function() {
    a.Xc.stop();
    T.Ae.play()
  });
  km(this, function() {
    a.kb()
  })
};
var mm = function(a) {
  var b = new F(a.T, a.hb, null, new t(fg.x, A(a).y), function() {
    U(em, 6)
  });
  H(a, b)
}, km = function(a, b) {
  b = new F(a.T, 1E3, null, fg, void 0 === b ? function() {} : b);
  H(a, b)
};
jm.prototype.Pa = function(a) {
  0 === a &&
      (Ig(this), L(this), this.ta && (this.ta.g.opacity = 0), Q(this, 7, 0))
};
var nm = N(
        [
          [11, 1046, 1298, 519, 191], [11, 1046, 1492, 519, 191],
          [11, 0, 1494, 519, 191], [11, 522, 1494, 519, 191],
          [11, 1044, 1686, 519, 191], [11, 0, 1688, 519, 191],
          [11, 1046, 1298, 519, 191], [11, 1046, 1492, 519, 191],
          [11, 0, 1494, 519, 191], [11, 522, 1494, 519, 191],
          [11, 1044, 1686, 519, 191], [11, 0, 1688, 519, 191],
          [11, 1046, 1298, 519, 191]
        ],
        83, 0, 0),
    im = O(
        [
          [12, 1062, 771, 519, 191],  [12, 1062, 771, 519, 191],
          [12, 1062, 771, 519, 191],  [12, 1062, 771, 519, 191],
          [12, 1062, 771, 519, 191],  [12, 1062, 771, 519, 191],
          [12, 1062, 771, 519, 191],  [12, 1062, 771, 519, 191],
          [12, 1062, 771, 519, 191],  [12, 1584, 771, 519, 191],
          [12, 1062, 965, 519, 191],  [12, 1584, 965, 519, 191],
          [12, 1062, 771, 519, 191],  [12, 1584, 965, 519, 191],
          [12, 0, 1028, 519, 191],    [12, 522, 1028, 519, 191],
          [12, 1044, 1159, 519, 191], [12, 1566, 1159, 519, 191],
          [12, 1566, 1159, 519, 191], [12, 1566, 1159, 519, 191],
          [12, 1566, 1159, 519, 191], [12, 1566, 1159, 519, 191],
          [12, 1566, 1159, 519, 191], [12, 1566, 1159, 519, 191],
          [12, 1566, 1159, 519, 191], [12, 1566, 1159, 519, 191],
          [12, 1566, 1159, 519, 191], [12, 1566, 1159, 519, 191],
          [12, 1566, 1159, 519, 191], [12, 0, 1222, 519, 191],
          [12, 522, 1222, 519, 191],  [12, 1044, 1353, 519, 191],
          [12, 1566, 1353, 519, 191], [12, 0, 1416, 519, 191],
          [12, 522, 1416, 519, 191],  [12, 1044, 1547, 519, 191],
          [12, 1566, 1547, 519, 191], [12, 0, 1610, 519, 191],
          [12, 522, 1610, 519, 191],  [12, 1044, 1741, 519, 191],
          [12, 522, 1416, 519, 191],  [12, 1044, 1547, 519, 191],
          [12, 1566, 1547, 519, 191], [12, 0, 1610, 519, 191],
          [12, 522, 1610, 519, 191],  [12, 1044, 1741, 519, 191]
        ],
        83, 0, 0),
    om = O(
        [
          [12, 0, 0, 528, 254],      [12, 531, 0, 528, 254],
          [12, 1062, 0, 528, 254],   [12, 1593, 0, 528, 254],
          [12, 0, 257, 528, 254],    [12, 531, 257, 528, 254],
          [12, 1062, 257, 528, 254], [12, 1062, 257, 528, 254],
          [12, 1062, 257, 528, 254], [12, 1062, 257, 528, 254],
          [12, 1062, 257, 528, 254], [12, 1062, 257, 528, 254],
          [12, 1593, 257, 528, 254], [12, 0, 514, 528, 254],
          [12, 531, 514, 528, 254],  [12, 531, 514, 528, 254],
          [12, 531, 514, 528, 254],  [12, 531, 514, 528, 254],
          [12, 531, 514, 528, 254],  [12, 1062, 514, 528, 254],
          [12, 1593, 514, 528, 254], [12, 0, 771, 528, 254],
          [12, 531, 771, 528, 254]
        ],
        83, 0, 0),
    pm = O(
        [
          [12, 1566, 1741, 491, 250], [12, 0, 1804, 491, 250],
          [12, 494, 1804, 491, 250],  [12, 988, 1935, 491, 250],
          [12, 1482, 1994, 491, 250], [12, 0, 2057, 491, 250],
          [12, 494, 2057, 491, 250],  [12, 988, 1935, 491, 250],
          [12, 1482, 1994, 491, 250], [12, 0, 2057, 491, 250],
          [12, 494, 2057, 491, 250],  [12, 988, 1935, 491, 250],
          [12, 1482, 1994, 491, 250], [12, 0, 2057, 491, 250],
          [12, 494, 2057, 491, 250],  [12, 988, 1935, 491, 250],
          [12, 1482, 1994, 491, 250], [12, 0, 2057, 491, 250],
          [12, 494, 2057, 491, 250],  [12, 988, 1935, 491, 250],
          [12, 1482, 1994, 491, 250], [12, 0, 2057, 491, 250],
          [12, 494, 2057, 491, 250],  [12, 988, 1935, 491, 250],
          [12, 988, 2188, 491, 250],  [12, 1482, 2247, 491, 250],
          [12, 0, 2310, 491, 250],    [12, 494, 2310, 491, 250],
          [12, 988, 2441, 491, 250],  [12, 1482, 2500, 491, 250],
          [12, 0, 2310, 491, 250],    [12, 494, 2310, 491, 250],
          [12, 988, 2441, 491, 250],  [12, 1482, 2500, 491, 250],
          [12, 0, 2310, 491, 250],    [12, 494, 2310, 491, 250],
          [12, 988, 2441, 491, 250],  [12, 1482, 2500, 491, 250],
          [12, 0, 2310, 491, 250],    [12, 494, 2310, 491, 250],
          [12, 988, 2441, 491, 250]
        ],
        83, 0, 0),
    qm = O(
        [
          [11, 0, 0, 528, 254], [11, 531, 0, 528, 254], [11, 1062, 0, 528, 254],
          [11, 0, 257, 528, 254], [11, 531, 257, 528, 254], of, of, of, of, of,
          of, of, of, of, of, of, of
        ],
        83, 0, 0),
    rm = O(
        [
          [11, 523, 906, 520, 193], [11, 523, 514, 520, 193],
          [11, 1046, 906, 520, 193], [11, 0, 1102, 520, 193],
          [11, 523, 1102, 520, 193], [11, 1046, 1102, 520, 193],
          [11, 0, 1298, 520, 193], [11, 523, 1298, 520, 193],
          [11, 523, 1102, 520, 193], [11, 1046, 1102, 520, 193],
          [11, 0, 1298, 520, 193], [11, 523, 1298, 520, 193],
          [11, 523, 1102, 520, 193], [11, 1046, 1102, 520, 193],
          [11, 0, 1298, 520, 193], [11, 523, 1298, 520, 193],
          [11, 523, 1102, 520, 193], [11, 1046, 1102, 520, 193],
          [11, 0, 1298, 520, 193]
        ],
        83, 0, 0),
    sm = O(Zf, 83, 0, 0), tm = N([pf, qf, rf, sf], 83, 0, 0),
    um = N(
        [
          [13, 2470, 726, 491, 360], [13, 2964, 726, 491, 360],
          [13, 3458, 726, 491, 360], [13, 3952, 726, 491, 360],
          [13, 4446, 726, 491, 360], [13, 4940, 726, 491, 360],
          [13, 2470, 726, 491, 360], [13, 2964, 726, 491, 360],
          [13, 3458, 726, 491, 360], [13, 3952, 726, 491, 360],
          [13, 4446, 726, 491, 360], [13, 4940, 726, 491, 360]
        ],
        83, 0, 0),
    vm = O(
        [
          [14, 6916, 0, 491, 360],   [14, 6916, 0, 491, 360],
          [14, 6916, 0, 491, 360],   [14, 6916, 0, 491, 360],
          [14, 7410, 0, 491, 360],   [14, 0, 363, 491, 360],
          [14, 494, 363, 491, 360],  [14, 988, 363, 491, 360],
          [14, 988, 363, 491, 360],  [14, 988, 363, 491, 360],
          [14, 988, 363, 491, 360],  [14, 988, 363, 491, 360],
          [14, 988, 363, 491, 360],  [14, 1482, 363, 491, 360],
          [14, 1976, 363, 491, 360], [14, 2470, 363, 491, 360],
          [14, 2964, 363, 491, 360], [14, 3458, 363, 491, 360],
          [14, 3952, 363, 491, 360], [14, 4446, 363, 491, 360],
          [14, 4940, 363, 491, 360], [14, 5434, 363, 491, 360],
          [14, 5928, 363, 491, 360], [14, 6422, 363, 491, 360],
          [14, 6916, 363, 491, 360], [14, 7410, 363, 491, 360],
          [14, 1976, 363, 491, 360], [14, 2470, 363, 491, 360],
          [14, 2964, 363, 491, 360], [14, 3458, 363, 491, 360],
          [14, 3952, 363, 491, 360], [14, 4446, 363, 491, 360],
          [14, 4940, 363, 491, 360], [14, 5434, 363, 491, 360],
          [14, 5928, 363, 491, 360], [14, 6422, 363, 491, 360],
          [14, 6916, 363, 491, 360], [14, 7410, 363, 491, 360],
          [14, 1976, 363, 491, 360], [14, 2470, 363, 491, 360],
          [14, 2964, 363, 491, 360]
        ],
        83, 0, 0),
    wm =
        O(
            [
              [13, 4940, 363, 491, 360], [13, 0, 726, 491, 360],
              [13, 494, 726, 491, 360], [13, 988, 726, 491, 360],
              [13, 1482, 726, 491, 360], [13, 1976, 726, 491, 360],
              [13, 1976, 726, 491, 360], [13, 1976, 726, 491, 360],
              [13, 1976, 726, 491, 360], [13, 1976, 726, 491, 360],
              [13, 1976, 726, 491, 360], [13, 1976, 726, 491, 360],
              [13, 1976, 726, 491, 360], [13, 1976, 726, 491, 360],
              [13, 1976, 726, 491, 360], [13, 1976, 726, 491, 360],
              [13, 1976, 726, 491, 360]
            ],
            83, 0, 0),
    xm =
        O(
            [
              [14, 0, 0, 491, 360],    [14, 0, 0, 491, 360],
              [14, 0, 0, 491, 360],    [14, 494, 0, 491, 360],
              [14, 988, 0, 491, 360],  [14, 1482, 0, 491, 360],
              [14, 1976, 0, 491, 360], [14, 2470, 0, 491, 360],
              [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360],
              [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360],
              [14, 2470, 0, 491, 360], [14, 2964, 0, 491, 360],
              [14, 3458, 0, 491, 360], [14, 3952, 0, 491, 360],
              [14, 4446, 0, 491, 360], [14, 4940, 0, 491, 360],
              [14, 5434, 0, 491, 360], [14, 5928, 0, 491, 360],
              [14, 6422, 0, 491, 360]
            ],
            83, 0, 0),
    ym =
        O(
            [
              [13, 4446, 0, 491, 360], [13, 4940, 0, 491, 360],
              [13, 0, 363, 491, 360], [13, 494, 363, 491, 360],
              [13, 988, 363, 491, 360], [13, 1482, 363, 491, 360],
              [13, 1976, 363, 491, 360], [13, 2470, 363, 491, 360],
              [13, 2964, 363, 491, 360], [13, 3458, 363, 491, 360],
              [13, 3952, 363, 491, 360], [13, 4446, 363, 491, 360],
              [13, 4446, 0, 491, 360], [13, 4940, 0, 491, 360],
              [13, 0, 363, 491, 360], [13, 494, 363, 491, 360],
              [13, 988, 363, 491, 360], [13, 1482, 363, 491, 360],
              [13, 1976, 363, 491, 360]
            ],
            83, 0, 0),
    zm =
        O(
            [
              [13, 0, 0, 491, 360], [13, 494, 0, 491, 360],
              [13, 988, 0, 491, 360], [13, 1482, 0, 491, 360]
            ],
            83, 0, 0),
    Am =
        N(
            [
              [13, 1976, 0, 491, 360], [13, 2470, 0, 491, 360],
              [13, 2964, 0, 491, 360], [13, 3458, 0, 491, 360],
              [13, 3952, 0, 491, 360], [13, 1482, 0, 491, 360]
            ],
            83, 0, 0),
    gm = O([[10, 1406, 0, 700, 416]], 83, 0, 0),
    hm = O([[10, 703, 419, 700, 416]], 83, 0, 0),
    fm = new Map([
      [0, im], [1, nm], [2, sm], [3, tm], [4, rm], [6, om], [7, pm], [5, qm]
    ]),
    lm = new Map([
      [0, xm], [1, um], [2, zm], [3, Am], [4, ym], [6, um], [7, vm], [5, wm]
    ]);
var Bm = Ui(), Dm = function() {
  P.call(this, Cm);
  this.ta = null;
  this.Mc = new t(320, 180);
  this.ub = !1;
  this.Oc = this.Hc = 0;
  this.Pc = null;
  this.Qd = 0;
  this.reset();
  Bm.addListener(this)
};
p(Dm, P);
Dm.prototype.reset = function() {
  this.Ba = !1;
  this.Hc = 2100;
  this.Oc = 5500;
  this.U(0);
  L(this);
  Ig(this);
  K(this, new nj(this, .8, 5));
  this.ub = !1;
  y(this, Em);
  this.W = 1;
  this.setScale(.6);
  this.Pc && x(this.Pc);
  I(this, 1800);
  this.opacity = 1
};
var Im = function(a) {
  a.ub ? Fm(a) : (Gm(a), Hm(a))
}, Gm = function(a) {
  var b = void 0 === b ? 1E3 : b;
  Q(a, 3, 0);
  var c = Ak(Bk(A(a), a.Mc)).scale(320);
  H(a, new F(a, b, A(a), bg(A(a), c), function() {}, Dg))
}, Hm = function(a) {
  var b = .5 > Math.random() ? -60 : 700,
      c = new t(b, Math.floor(360 * Math.random()));
  J(a, 0, function() {
    y(a, c);
    a.ta.g.opacity = 1;
    a.ta.j = !0;
    a.Cb = 0 > b
  });
  I(a, 500);
  Q(a, 2, 0, void 0, void 0, function() {
    a.Qd = T.Hd.play()
  });
  H(a, new F(a, a.Hc, c, a.Mc, function() {}, Eg))
}, Mm = function(a) {
  Jm(a);
  J(a, 0, function() {
    T.ue.play()
  });
  a.ub ? (Q(a, 12, 0), Q(a, 1, Mg(Km), void 0, void 0, function() {
            L(a);
            a.ub = !1;
            Jm(a);
            Im(a)
          })) : (Q(a, 6, 0), Q(a, 8, Mg(Lm), void 0, void 0, function() {
                   L(a);
                   a.ub = !0;
                   Im(a)
                 }))
}, Fm = function(a) {
  Jm(a);
  J(a, 0, function() {
    a.ta.g.opacity = 1;
    a.ta.j = !0
  });
  Q(a, 9, 0);
  H(a, new F(a, a.Oc, Nm(a), a.Mc))
}, Jm = function(a) {
  Q(a, a.ub ? 8 : 3, 0);
  H(a, new F(a, 1E3, A(a), Nm(a), function() {}, Fg))
}, Nm = function(a) {
  return 320 > A(a).x ? Om : Em
};
Dm.prototype.Fb = function(a) {
  this.ta = a;
  this.ta.points = this.ub ? 100 : 500;
  this.ta.opacity = 0;
  this.ta.g.opacity = 0;
  this.ta.g.setScale(1 / .6);
  this.ta.j = !1;
  this.Pc = this.ta.g;
  v(this, this.Pc);
  this.ta.W = this.W + 1;
  Im(this)
};
Dm.prototype.Na = function() {
  var a = this;
  L(this);
  H(this, new F(this, 800, A(this), Nm(this), function() {
      a.U(14);
      T.te.play()
    }, Fg));
  I(this, 3200);
  H(this,
    new F(
        this, 2E3, Nm(this), new t(Nm(this).x, Nm(this).y - 500), function() {},
        Dg))
};
Dm.prototype.update = function(a) {
  var b, c;
  null === (b = this.ta) || void 0 === b ? void 0 : y(b, A(this));
  (2 === this.state || 9 === this.state) && 60 > zk(Bk(A(this), this.Mc)) &&
      (T.re.play(), this.U(this.ub ? 10 : 4), L(this), I(this, 400), Im(this),
       U(Bm, 6));
  if (null === (c = this.ta) || void 0 === c ? 0 : 5 === c.state)
    this.ta.U(6), this.ta = null, L(this),
                  this.ub ? (this.U(11), this.Oc -= 1E3) :
                            (T.Hd.stop(this.Qd), this.U(5), this.Hc -= 50),
                  I(this, Mg(Pm));
  P.prototype.update.call(this, a)
};
Dm.prototype.Pa = function(a) {
  var b = this;
  0 === a &&
      (Ig(this), L(this),
       this.ub ? this.U(13) : (this.U(7), J(this, Mg(Qm), function() {
                                 var c;
                                 b.opacity = 0;
                                 null === (c = b.ta) || void 0 === c ?
                                     void 0 :
                                     c.g.opacity = 0
                               })))
};
var Om = new t(120, 200), Em = new t(520, 200),
    Rm = O(
        [
          [41, 4864, 613, 234, 281], [41, 5101, 613, 234, 281],
          [41, 5338, 613, 234, 281], [41, 0, 816, 234, 281],
          [41, 237, 816, 234, 281], [41, 474, 816, 234, 281],
          [41, 711, 816, 234, 281], [41, 948, 816, 234, 281],
          [41, 1185, 816, 234, 281], [41, 1422, 816, 234, 281],
          [41, 1659, 816, 234, 281]
        ],
        83, 0, 0),
    Sm = N([Qd], 83, 0, 0), Tm = O(Uf, 83, 0, 0),
    Pm = O(
        [
          [41, 4336, 329, 254, 281], [41, 4593, 329, 254, 281],
          [41, 4850, 329, 254, 281], [41, 5107, 329, 254, 281],
          [41, 5364, 329, 254, 281]
        ],
        83, 0, 0),
    Lm = O(
        [
          [41, 0, 0, 360, 326],    [41, 0, 0, 360, 326],
          [41, 363, 0, 360, 326],  [41, 726, 0, 360, 326],
          [41, 1089, 0, 360, 326], [41, 1452, 0, 360, 326],
          [41, 1815, 0, 360, 326], [41, 2178, 0, 360, 326],
          [41, 2541, 0, 360, 326], [41, 2904, 0, 360, 326],
          [41, 3267, 0, 360, 326], [41, 3630, 0, 360, 326],
          [41, 3993, 0, 360, 326], [41, 4356, 0, 360, 326],
          [41, 4719, 0, 360, 326], [41, 5082, 0, 360, 326],
          [41, 5445, 0, 360, 326], [41, 5808, 0, 360, 326],
          [41, 5808, 0, 360, 326], [41, 5808, 0, 360, 326],
          [41, 6171, 0, 360, 326], [41, 6534, 0, 360, 326],
          [41, 6897, 0, 360, 326]
        ],
        83, 0, 0),
    Qm = O(
        [
          [41, 4977, 897, 233, 278], [41, 5213, 897, 233, 278],
          [41, 0, 1100, 233, 278], [41, 236, 1100, 233, 278],
          [41, 5213, 897, 233, 278], [41, 472, 1100, 233, 278],
          [41, 5213, 897, 233, 278], [41, 708, 1100, 233, 278],
          [41, 944, 1100, 233, 278], [41, 1180, 1100, 233, 278],
          [41, 1416, 1100, 233, 278], [41, 1652, 1100, 233, 278],
          [41, 1888, 1100, 233, 278], [41, 2124, 1100, 233, 278],
          [41, 2360, 1100, 233, 278], [41, 2596, 1100, 233, 278],
          [41, 2832, 1100, 233, 278], [41, 3068, 1100, 233, 278],
          [41, 3304, 1100, 233, 278]
        ],
        83, 0, 0),
    Um = N([Od], 83, 0, 0), Vm = O(Sf, 83, 0, 0), Wm = O([Pd], 83, 0, 0),
    Km = O(
        [
          [41, 0, 329, 268, 222], [41, 271, 329, 268, 222],
          [41, 542, 329, 268, 222], [41, 813, 329, 268, 222],
          [41, 1084, 329, 268, 222], [41, 1355, 329, 268, 222],
          [41, 1626, 329, 268, 222], [41, 1897, 329, 268, 222],
          [41, 2168, 329, 268, 222], [41, 2439, 329, 268, 222],
          [41, 2710, 329, 268, 222], [41, 2981, 329, 268, 222],
          [41, 3252, 329, 268, 222], [41, 3523, 329, 268, 222],
          [41, 3794, 329, 268, 222], [41, 4065, 329, 268, 222]
        ],
        83, 0, 0),
    Xm = O(
        [
          [41, 5658, 1137, 194, 194], [41, 5658, 1137, 194, 194],
          [41, 5855, 1137, 194, 194], [41, 6052, 1137, 194, 194],
          [41, 6249, 1137, 194, 194], [41, 6446, 1137, 194, 194],
          [41, 6446, 1137, 194, 194], [41, 6446, 1137, 194, 194],
          [41, 6446, 1137, 194, 194], [41, 6446, 1137, 194, 194],
          [41, 6643, 1137, 194, 194], [41, 6840, 1137, 194, 194],
          [41, 3958, 1159, 194, 194], [41, 4155, 1159, 194, 194],
          [41, 4352, 1159, 194, 194], [41, 4977, 1178, 194, 194],
          [41, 5174, 1178, 194, 194], [41, 4549, 1181, 194, 194],
          [41, 4549, 1181, 194, 194], [41, 4549, 1181, 194, 194],
          [41, 4549, 1181, 194, 194]
        ],
        83, 0, 0),
    Ym = O(Tf, 83, 0, 0),
    Cm = new Map([
      [0, Rm], [1, Sm], [2, Tm], [3, Sm], [4, Sm], [5, Pm], [6, Lm], [7, Qm],
      [8, Um], [9, Vm], [10, Um], [11, Wm], [12, Km], [13, Xm], [14, Ym]
    ]);
var $m = function(a, b, c, d, e, f, g) {
  P.call(this, Zm);
  this.j = a;
  this.x = b;
  this.y = c;
  this.o = d;
  this.ha = e;
  this.H = f;
  this.s = g;
  this.g = 0;
  this.speed = 1;
  6 > this.j ? this.U(0) : this.U(1);
  this.W = 300;
  this.opacity = .25
};
p($m, P);
$m.prototype.update = function(a) {
  -50 > this.y ? x(this) :
                 (this.y -= this.ha * a * .05 * this.speed,
                  this.rotate(this.o * a * .05 * this.speed),
                  this.g += a * this.s * this.speed,
                  y(this, this.x + Math.sin(this.g) * this.H, this.y))
};
var an = O([[19, 851, 29, 12, 11]], 83, 0, 0),
    bn = O([[19, 830, 57, 17, 19]], 83, 0, 0),
    cn = O([[19, 830, 29, 18, 25]], 83, 0, 0),
    Zm = new Map([[0, an], [1, bn], [2, cn]]);
var dn = function(a) {
  a = void 0 === a ? .01 : a;
  u.call(this);
  this.g = a
};
p(dn, u);
dn.prototype.update = function() {
  if (this.Ta() && Math.random() < this.g) {
    var a = 3 + 9 * Math.random(), b = 160 * Math.random();
    .5 > Math.random() && (b += 480);
    v(this,
      new $m(
          a, b, 410, Math.random() / a * .3, 1.2 - a / 35,
          Math.random() * a * 1.2, .05 * Math.random() / a))
  }
};
var en = function() {};
en.prototype.s = function() {
  return !0
};
var fn = function(a, b, c, d) {
  this.g = a;
  this.i = b;
  this.o = Math.abs(c);
  this.v = void 0 === d ? !1 : d;
  this.v || (this.g += this.o, this.i += this.o)
};
p(fn, en);
var gn = function(a, b, c) {
  a.g = b;
  a.i = c;
  a.v || (a.g += a.o, a.i += a.o)
};
fn.prototype.j = function(a, b) {
  return Math.sqrt((this.g - a) * (this.g - a) + (this.i - b) * (this.i - b)) <=
      this.o
};
fn.prototype.Ca = function(a) {
  a.beginPath();
  a.arc(this.g, this.i, this.o, 0, 2 * Math.PI, !0);
  a.fill();
  a.stroke()
};
var hn = function(a) {
  this.g = a
};
p(hn, en);
var jn = function(a, b, c, d) {
  return new hn([a, b, a + c, b, a + c, b + d, a, b + d])
};
hn.prototype.j = function(a, b) {
  var c = this.g;
  if (6 > c.length) return !1;
  for (var d = !1, e = 0, f = c.length - 2; e < c.length; f = e, e += 2) {
    var g = c[e], h = c[e + 1], k = c[f];
    f = c[f + 1];
    a < g != a<k && b>h + (a - g) * (f - h) / (k - g) && (d = !d)
  }
  return d
};
hn.prototype.Ca = function(a) {
  a.beginPath();
  for (var b = 0; b < this.g.length; b += 2) a.lineTo(this.g[b], this.g[b + 1]);
  a.lineTo(this.g[0], this.g[1]);
  a.fill();
  a.stroke()
};
var kn = function(a, b, c) {
  b -= a.g[0];
  c -= a.g[1];
  if (0 != b || 0 != c)
    for (var d = 0; d < a.g.length - 1; d += 2) a.g[d] += b, a.g[d + 1] += c
};
var ln = function(a, b, c, d, e, f, g, h, k) {
  k = void 0 === k ? function() {} : k;
  P.call(this, new Map([[0, O([e], 0, 0, 0)], [1, O([f || e], 0, 0, 0)]]));
  this.g = c;
  this.o = d;
  this.H = g;
  this.ha = h;
  this.s = k;
  this.j = document.getElementById('hplogo');
  y(this, a, b)
};
p(ln, P);
var nn = function(a, b, c, d, e, f) {
  var g = mn;
  f = void 0 === f ? 0 : f;
  var h = gb(g, function(k) {
            return kb(k.ya, b)
          }) || {x: 0, y: 0};
  g = od(td.wa(), b) / 2;
  f = h.x + g + f;
  h = h.y + g;
  return new ln(f, h, new fn(f, h, 3 * g, !0), a, b, c, d, e)
}, on = function(a, b, c, d, e, f) {
  var g = mn;
  f = void 0 === f ? 0 : f;
  g = gb(g, function(l) {
        return kb(l.ya, b)
      }) || {x: 0, y: 0};
  var h = od(td.wa(), b), k = td.wa().Fa(b);
  return new ln(g.x + f, g.y, jn(0, 0, 3 * h, 3 * k), a, b, c, d, e)
}, rn = function(a) {
  var b = pg(a);
  a.g instanceof fn ? gn(a.g, b.i, b.g) :
                      kn(a.g, b.i - 3 * a.i.ya[3] / 2, b.g - 3 * a.Fa() / 2);
  a.U(0);
  a.s(!1);
  pn(a.o, a.g, function(c) {
    'mouseup' == c ?
        a.H() :
        'mouseover' == c ?
        (a.U(1), a.s(!0), a.j.title = a.ha, a.j.style.cursor = 'pointer') :
        'mouseout' == c &&
            (a.U(0), a.s(!1), a.j.title = '', a.j.style.cursor = 'default')
  });
  qn(a.o.g, a.g)
};
var sn = function() {
  u.call(this);
  this.g = new G;
  this.W = 460;
  v(this, this.g);
  this.opacity = 0
};
p(sn, u);
sn.prototype.Ca = function(a) {
  a.save();
  a.globalCompositeOperation = 'multiply';
  a.fillStyle = '#403f45';
  a.fillRect(0, 0, 640, 360);
  a.restore()
};
sn.prototype.Ya = function(a, b, c) {
  K(this.g, new Kg(this, c, a, b))
};
var tn = Ui(), un = Ng([[hf, 33, 5, [[Ef, -2, -27]]]], 83),
    vn = Ng(
        [
          [[20, 0, 1320, 64, 65], 62, 47], [[20, 242, 1115, 82, 90], 47, 31],
          [[20, 653, 161, 149, 138], 29, 27], [[20, 999, 0, 159, 166], 28, 0]
        ],
        83),
    wn = Ng([[hf, 33, 3, [[Ef, -2, -25]]], [hf, 33, 1, [[Ef, -2, -23]]]], 83),
    xn = Ng(
        [
          [hf, 33, 5, [[Ef, -3, -23]]], [[20, 835, 0, 161, 162], 27, 4],
          [[20, 468, 0, 182, 163], 2, 3]
        ],
        83),
    yn = Ng([[tf, 0, 1], [tf, 0, 1], [tf, 0, 1]], 83),
    zn = Ng(
        [
          [tf, 0, 1], [tf, 0, 1], [tf, 0, 1], [tf, 0, 1], [tf, 0, 3],
          [tf, 0, -1], [tf, 0, -3], [tf, 0, -1], [tf, 0, 1], [tf, 0, 3],
          [tf, 0, -1], [tf, 0, -3], [tf, 0, -1], [tf, 0, 1], [tf, 0, 3]
        ],
        83),
    An = Ng(
        [
          [[20, 805, 165, 147, 154], 36, 0], [[20, 1161, 0, 149, 149], 47, 0],
          [[20, 1161, 152, 149, 145], 80, 0]
        ],
        83),
    Bn = O([[20, 468, 166, 143, 166]], 83, 33, 0),
    Cn = O([jf, [34, 3889, 230, 52, 61], [34, 3944, 230, 52, 61]], 83, 0, 0),
    Dn = O([jf], 83, 0, 0), En = O([[33, 2514, 0, 52, 61]], 83, 0, 0),
    Fn =
        N(
            [
              [33, 2095, 726, 195, 218], [33, 2293, 726, 195, 218],
              [33, 2095, 947, 195, 218], [33, 2293, 947, 195, 218]
            ],
            83, 0, 0),
    Gn =
        O(
            [
              kf, lf, mf, nf, kf, lf, mf, nf, [31, 786, 987, 390, 360],
              [31, 0, 1299, 390, 360], [31, 393, 1350, 390, 360],
              [31, 786, 1350, 390, 360]
            ],
            83, 0, 0),
    Hn =
        N(
            [
              [31, 0, 0, 415, 309], [31, 418, 0, 415, 309],
              [31, 836, 0, 415, 309], [31, 0, 312, 415, 309],
              [31, 418, 312, 415, 309], [31, 836, 312, 415, 309],
              [31, 0, 624, 415, 309]
            ],
            83, 0, 25),
    In =
        O(
            [
              [36, 0, 0, 373, 360], [36, 376, 0, 373, 360],
              [36, 752, 0, 373, 360], [36, 1128, 0, 373, 360]
            ],
            83, 0, 0),
    Jn =
        N(
            [
              [36, 1504, 0, 373, 360], [36, 1880, 0, 373, 360],
              [36, 2256, 0, 373, 360], [36, 2632, 0, 373, 360]
            ],
            83, 0, 0),
    Kn = O([[36, 2790, 363, 59, 67]], 83, 0, 0),
    Ln =
        O(
            [
              [34, 0, 0, 423, 360], [34, 426, 0, 423, 360],
              [34, 852, 0, 423, 360], [34, 1278, 0, 423, 360],
              [34, 1704, 0, 423, 360], [34, 2130, 0, 423, 360],
              [34, 2556, 0, 423, 360], [34, 2982, 0, 423, 360],
              [34, 3408, 0, 423, 360]
            ],
            83, 0, 25),
    Mn =
        O(
            [
              [32, 0, 0, 416, 360],      [32, 419, 0, 416, 360],
              [32, 838, 0, 416, 360],    [32, 1257, 0, 416, 360],
              [32, 1676, 0, 416, 360],   [32, 2095, 0, 416, 360],
              [32, 2514, 0, 416, 360],   [32, 2933, 0, 416, 360],
              [32, 3352, 0, 416, 360],   [32, 3771, 0, 416, 360],
              [32, 0, 363, 416, 360],    [32, 419, 363, 416, 360],
              [32, 838, 363, 416, 360],  [32, 1257, 363, 416, 360],
              [32, 1676, 363, 416, 360], [32, 2095, 363, 416, 360],
              [32, 2514, 363, 416, 360], [32, 2933, 363, 416, 360],
              [32, 3352, 363, 416, 360], [32, 3771, 363, 416, 360],
              [33, 0, 0, 416, 360]
            ],
            83, 0, 25),
    Nn =
        O(
            [
              [33, 419, 0, 416, 360], [33, 838, 0, 416, 360],
              [33, 1257, 0, 416, 360], [33, 1676, 0, 416, 360],
              [33, 2095, 0, 416, 360], [33, 0, 363, 416, 360],
              [33, 419, 363, 416, 360], [33, 838, 363, 416, 360],
              [33, 1257, 363, 416, 360], [33, 1676, 363, 416, 360],
              [33, 2095, 363, 416, 360], [33, 0, 726, 416, 360],
              [33, 419, 726, 416, 360], [33, 838, 726, 416, 360],
              [33, 1257, 726, 416, 360], [33, 1676, 726, 416, 360]
            ],
            83, 0, 25),
    On = function() {
      P.call(this, new Map([
               [0, vn],  [1, un],  [2, wn],  [3, xn],  [4, yn],
               [5, zn],  [6, An],  [7, Bn],  [8, Cn],  [9, Fn],
               [10, Dn], [11, En], [12, Gn], [13, Hn], [14, In],
               [15, Jn], [16, Kn], [17, Ln], [18, Mn], [19, Nn]
             ]))
    };
p(On, P);
On.prototype.update = function(a) {
  var b;
  if (null === (b = this.g) || void 0 === b ? 0 : 5 === b.state)
    this.g = null, L(this), Ig(this), T.od.stop(), this.U(17),
    Hg(this, 300, null, Pn),
    K(this, new Og(this, 13, Qn, void 0, void 0, void 0));
  P.prototype.update.call(this, a)
};
On.prototype.Fb = function(a) {
  this.g = a;
  a = A(this);
  y(this.g, a.x - 50, a.y);
  this.g.points = 200;
  this.g.opacity = 0;
  this.g.W = this.W + 1;
  this.kb()
};
On.prototype.kb = function() {
  var a = this;
  Q(this, 18, 4E3);
  Gg(this, new E(1E3, null, function() {
       T.od.play()
     }));
  Q(this, 19, Rn, Pn, Sn, function() {
    T.qd.play();
    U(tn, 6);
    Hg(a, 300, null, Pn);
    a.kb()
  });
  Q(this, 13, Tn)
};
O([[20, 1313, 43, 40, 40], [20, 1313, 86, 40, 40], [20, 1313, 129, 40, 40]], 83,
  0, 0);
var Pn = new t(475, 181), Sn = new t(Pn.x - 90, Pn.y), Qn = 83 * Ln.length,
    Rn = 83 * Mn.length, Tn = 83 * Nn.length;
var Un = td.wa(),
    X =
        function(a, b, c, d) {
      d = void 0 === d ? !1 : d;
      return new jj(a, 1E3 * b, lj(c), d)
    },
    Vn = new M([10, 136, 552, 71, 70]), Wn = new M([10, 0, 552, 133, 63]),
    Xn = new M([10, 2612, 100, 49, 20]), Yn = new M([10, 2612, 151, 24, 19]),
    Zn = new M([10, 2612, 123, 39, 25]), $n = new M([10, 1406, 419, 640, 360]),
    ao = N(
        [
          [1, 0, 0, 50, 70],   [1, 0, 0, 50, 70],   [1, 0, 0, 50, 70],
          [1, 53, 0, 50, 70],  [1, 106, 0, 50, 70], [1, 106, 0, 50, 70],
          [1, 106, 0, 50, 70], [1, 106, 0, 50, 70], [1, 106, 0, 50, 70],
          [1, 159, 0, 50, 70], [1, 212, 0, 50, 70], [1, 265, 0, 50, 70],
          [1, 265, 0, 50, 70], [1, 265, 0, 50, 70], [1, 265, 0, 50, 70],
          [1, 265, 0, 50, 70], [1, 318, 0, 50, 70], [1, 318, 0, 50, 70],
          [1, 371, 0, 50, 70], [1, 371, 0, 50, 70], [1, 424, 0, 50, 70],
          [1, 424, 0, 50, 70], [1, 477, 0, 50, 70], [1, 477, 0, 50, 70],
          [1, 530, 0, 50, 70], [1, 530, 0, 50, 70]
        ],
        83, 23, 270, 460);
ao[ao.length - 1].duration = 6E3;
var bo = N(
    [
      [0, 0, 0, 48, 90], [0, 51, 0, 48, 90], [0, 102, 0, 48, 90],
      [0, 153, 0, 48, 90], [0, 204, 0, 48, 90], [0, 255, 0, 48, 90],
      [0, 306, 0, 48, 90], [0, 0, 93, 48, 90], [0, 51, 93, 48, 90],
      [0, 102, 93, 48, 90], [0, 153, 93, 48, 90], [0, 204, 93, 48, 90],
      [0, 255, 93, 48, 90], [0, 306, 93, 48, 90], [0, 0, 186, 48, 90],
      [0, 51, 186, 48, 90], [0, 102, 186, 48, 90], [0, 153, 186, 48, 90]
    ],
    83, 38, 133, 1);
bo[bo.length - 1].duration = 2E3;
var co = N(
    [
      [0, 204, 186, 48, 90], [0, 255, 186, 48, 90], [0, 306, 186, 48, 90],
      [0, 0, 279, 48, 90], [0, 51, 279, 48, 90], [0, 102, 279, 48, 90],
      [0, 153, 279, 48, 90], [0, 204, 279, 48, 90], [0, 255, 279, 48, 90],
      [0, 306, 279, 48, 90], [0, 0, 372, 48, 90], [0, 51, 372, 48, 90],
      [0, 102, 372, 48, 90], [0, 153, 372, 48, 90], [0, 204, 372, 48, 90],
      [0, 255, 372, 48, 90], [0, 306, 372, 48, 90]
    ],
    83, 38, 123, 1);
co[co.length - 1].duration = 3E3;
var eo =
        [
          nd(Un, 4), nd(Un, 21), nd(Un, 22), nd(Un, 23), nd(Un, 24), nd(Un, 16),
          nd(Un, 17), nd(Un, 40), nd(Un, 3), nd(Un, 5)
        ],
    Go = [
      {
        title: 'Level1',
        background: [17, 0, 0, 640, 360],
        backgroundPosition: eg,
        lc: [O([bf], 0, bf[3] / 2, Un.Fa(bf) / 2, 300)],
        kc: new dn,
        ac: [],
        Tb: [],
        Vb: [
          new Sg(15, 80), new Sg(15, 160), new Sg(15, 240), new Sg(90, 320),
          new Sg(165, 320), new Sg(630, 80), new Sg(630, 160), new Sg(630, 240),
          new Sg(480, 320), new Sg(560, 320)
        ],
        uc: [T.ud],
        wc: [25, 26, 18, 2],
        Ha: new t(310, 85),
        yc: function(a) {
          var b = function(c) {
            return fo(a, c)
          };
          b = [
            b([V(180, 295, 8, '|')]),
            go(800),
            b([V(0, 295, 8, '-')]),
            go(800),
            b([V(100, 140, 8, '^')]),
            Y(a),
            b([V(0, 295, 8, '-|')]),
            go(800),
            b([V(170, 140, 8, '^v')]),
            Y(a),
            b([V(20, 217.5, 4, '@')]),
            go(400),
            b([
              V(-10, 295, 8, '--'), V(200, 217.5, 8, '||'), V(160, 140, 8, 'vv')
            ]),
            Y(a),
            ho(a),
            go(2E3),
            b([V(-20, 295, 9, '|vv')]),
            b([V(60, 217.5, 9, '|vv')]),
            go(400),
            b([V(150, 295, 9, '-^^')]),
            b([V(210, 217.5, 9, '-^^')]),
            Y(a),
            b([V(40, 295, 9, '-')]),
            go(100),
            b([V(140, 295, 9, '-')]),
            go(100),
            b([V(20, 295, 9, '^')]),
            go(100),
            b([V(160, 295, 9, '^')]),
            go(100),
            b([V(0, 295, 9, '|')]),
            go(100),
            b([V(180, 295, 9, '|')]),
            go(100),
            b([V(-20, 295, 9, 'v')]),
            go(100),
            b([V(200, 295, 9, 'v')]),
            go(100),
            b([V(0, 140, 4, '@')]),
            Y(a),
            go(2E3),
            io(a),
            jo()
          ].flat();
          ko(a, b);
          return b
        },
        state: 13,
        Xa: new dm(new t(320, 100)),
        scale: 1,
        yb: T.sd,
        nc: T.Xd,
        Rb: 800,
        Kb: !1
      },
      {
        title: 'Level2',
        background: [18, 1286, 363, 640, 360],
        backgroundPosition: eg,
        lc: [
          O([df], 0, df[3] / 2, Un.Fa(df) / 2, 460),
          O([cf], 0, cf[3] / 2, Un.Fa(cf) / 2, 1)
        ],
        kc: null,
        ac: [N(
            [
              [2, 0, 0, 68, 64],   [2, 0, 0, 68, 64],   [2, 0, 0, 68, 64],
              [2, 71, 0, 68, 64],  [2, 71, 0, 68, 64],  [2, 71, 0, 68, 64],
              [2, 142, 0, 68, 64], [2, 142, 0, 68, 64], [2, 142, 0, 68, 64],
              [2, 213, 0, 68, 64], [2, 213, 0, 68, 64], [2, 213, 0, 68, 64],
              [2, 284, 0, 68, 64], [2, 284, 0, 68, 64], [2, 284, 0, 68, 64],
              [2, 355, 0, 68, 64], [2, 355, 0, 68, 64], [2, 355, 0, 68, 64],
              [2, 426, 0, 68, 64], [2, 426, 0, 68, 64], [2, 426, 0, 68, 64],
              [2, 497, 0, 68, 64], [2, 497, 0, 68, 64], [2, 497, 0, 68, 64],
              [2, 568, 0, 68, 64], [2, 568, 0, 68, 64], [2, 568, 0, 68, 64],
              [2, 639, 0, 68, 64], [2, 639, 0, 68, 64], [2, 639, 0, 68, 64],
              [2, 710, 0, 68, 64], [2, 710, 0, 68, 64], [2, 710, 0, 68, 64]
            ],
            50, 320, 30, 0)],
        Tb: [],
        Vb: [],
        uc: [T.wd],
        wc: [27, 28, 41, 1],
        scale: 1,
        Ha: new t(70, 190),
        yc: function(a) {
          var b = new Ll;
          b = [
            lo(a, b), mo(a, b), no(a, b), Y(a), oo(b), go(1E3), po(b), ho(a),
            mo(a, b), no(a, b), Y(a), oo(b), go(1E3), po(b), mo(a, b), no(a, b),
            Y(a), go(5E3)
          ].flat();
          ko(a, b);
          return b
        },
        nc: T.Yd,
        Rb: 2100,
        state: 14,
        Xa: null,
        yb: T.ud,
        Kb: !1
      },
      {
        title: 'Level3',
        background: [28, 0, 0, 640, 360],
        backgroundPosition: eg,
        lc: [O([Of], 83, Of[3] / 2, 360 - Un.Fa(Of) / 2, 360 - Un.Fa(Of) / 2)],
        kc: new dn,
        ac: [ao],
        Tb: [],
        Vb: [],
        uc: [T.yd],
        wc: [29, 30, 15, 0],
        scale: 1,
        Ha: new t(310, 170),
        yc: function(a) {
          var b = function(d) {
            return go(1E3 * d)
          }, c = function(d) {
            return fo(a, d)
          };
          b = [
            c([V(-20, 295, 6, '|^')]),
            c([V(180, 295, 6, '-^')]),
            c([V(30, 295, 6, 'v^')]),
            Y(a),
            b(.8),
            c([V(20, 295, 5, '|-')]),
            c([V(200, 295, 5, '^-')]),
            c([V(140, 295, 5, 'v-')]),
            Y(a),
            c([V(40, 295, 8, '-^^--^')]),
            c([V(140, 295, 8, '|^^||^')]),
            Y(a),
            ho(a),
            b(1),
            c([V(-20, 295, 3, '|')]),
            b(1),
            c([V(200, 295, 3, '^')]),
            b(1),
            c([V(0, 295, 3, 'v')]),
            b(1),
            c([V(180, 295, 3, '-')]),
            Y(a),
            b(1),
            c([V(-20, 295, 3, '^')]),
            b(.8),
            c([V(200, 295, 3, '-')]),
            b(.7),
            c([V(0, 295, 3, '^')]),
            b(.6),
            c([V(180, 295, 3, '|')]),
            b(.5),
            c([V(-20, 295, 3, 'v')]),
            b(.4),
            c([V(200, 295, 3, '-')]),
            b(.3),
            c([V(0, 295, 3, '|')]),
            b(.3),
            c([V(180, 295, 3, 'v')]),
            b(.3),
            c([V(200, 295, 3, '|')]),
            b(.3),
            c([V(220, 295, 3, '-')]),
            b(.3),
            c([V(-40, 295, 3, '|')]),
            b(.3),
            c([V(-20, 295, 3, 'v')]),
            b(.3),
            c([V(0, 295, 3, '-')]),
            b(.3),
            c([V(20, 295, 3, '^')]),
            b(.3),
            c([V(40, 295, 3, '^')]),
            b(.3),
            c([V(140, 295, 3, '-')]),
            b(.3),
            c([V(180, 295, 3, 'v')]),
            Y(a),
            b(2),
            qo(),
            ro(a, '|'),
            Y(a),
            ro(a, '^'),
            Y(a),
            ro(a, 'v'),
            Y(a),
            so(),
            ro(a, '||||||||||'),
            Y(a),
            so(),
            ro(a, '^'),
            Y(a),
            ro(a, '-'),
            Y(a),
            so(),
            ro(a, '----------'),
            Y(a),
            to(),
            b(6)
          ];
          ko(a, b);
          return b
        },
        state: 15,
        Xa: new Dm,
        yb: T.wd,
        nc: T.Zd,
        Rb: 6200,
        Ld: 200,
        Kb: !1
      },
      {
        title: 'Level4',
        background: [15, 643, 0, 640, 360],
        backgroundPosition: eg,
        lc: [O([ef], 0, ef[3] / 2, Un.Fa(ef) / 2, 500)],
        kc: null,
        ac: [bo, co],
        Tb: [],
        Vb: [],
        Ha: new t(310, 150),
        uc: [T.zd],
        wc: [31, 32, 33, 34, 35, 10, 9, 8, 7, 11, 12, 13, 14],
        scale: .8,
        yc: function(a) {
          var b = new t(320, 48), c = new t(320, -80), d = function(l) {
            return go(1E3 * l)
          }, e = function(l) {
            return fo(a, l)
          }, f = function(l, r) {
            return uo(a, new Vk([], l.x, l.y), r)
          }, g = function(l, r) {
            return vo(a, !0, l, void 0 === r ? !1 : r)
          }, h = function(l) {
            return vo(a, !1, l, !1)
          }, k = new sn;
          b = [
            wo(a, k),
            xo(a),
            f(b),
            d(.5),
            e([V(10, 295, 10, '^-^')]),
            d(.9),
            e([V(90, 140, 10, 'v-^')]),
            d(.5),
            h(!0),
            yo(k),
            d(1),
            e([V(30, 295, 10, '|vv')]),
            d(.2),
            e([V(135, 217.5, 10, '-|v')]),
            d(1),
            g(!0),
            zo(k),
            d(.2),
            e([V(160, 295, 10, '--v')]),
            d(.8),
            e([V(170, 295, 10, '^-v')]),
            d(1.2),
            h(!0),
            yo(k),
            d(3),
            g(!0),
            zo(k),
            e([V(0, 217.5, 6, '^|-v-')]),
            Y(a),
            d(.2),
            e([V(0, 295, 10, '^v-|')]),
            d(.2),
            e([V(-30, 295, 15, 'v-')]),
            d(.2),
            e([V(30, 295, 10, '^v-')]),
            d(.2),
            e([V(60, 217.5, 15, 'v')]),
            d(.2),
            e([V(90, 140, 10, 'v-|')]),
            d(.2),
            e([V(120, 140, 15, '^')]),
            d(.2),
            h(!0),
            yo(k),
            d(1),
            e([V(150, 217.5, 10, '-|')]),
            d(.2),
            e([V(180, 295, 15, '^v')]),
            d(.2),
            e([V(200, 295, 10, '-')]),
            d(.2),
            e([V(210, 295, 15, 'v-|')]),
            d(.2),
            d(1),
            g(!0),
            zo(k),
            d(2),
            h(!0),
            yo(k),
            d(2),
            Y(a),
            g(!0),
            zo(k),
            e([V(0, 295, 3, '-')]),
            d(.2),
            e([V(170, 295, 3, '^')]),
            d(.2),
            e([V(10, 295, 3, '|')]),
            d(.2),
            e([V(190, 295, 3, 'v')]),
            d(.2),
            e([V(-15, 295, 3, '-')]),
            d(.2),
            e([V(160, 295, 3, '^')]),
            d(.2),
            e([V(5, 295, 3, '|')]),
            d(.2),
            h(!0),
            yo(k),
            e([V(10, 295, 20, 'z')]),
            e([V(180, 295, 3, 'v')]),
            d(.2),
            e([V(0, 295, 3, '-')]),
            d(.2),
            e([V(0, 295, 3, '|')]),
            d(.2),
            e([V(170, 295, 3, '^')]),
            d(.2),
            e([V(10, 295, 3, 'v')]),
            d(.2),
            e([V(190, 295, 3, '-')]),
            d(.2),
            e([V(-15, 295, 3, '^')]),
            d(.2),
            g(!0),
            zo(k),
            e([V(160, 295, 3, '|')]),
            d(.2),
            e([V(5, 295, 3, 'v')]),
            d(.2),
            e([V(-20, 295, 3, '|')]),
            e([V(180, 295, 3, 'v')]),
            d(.2),
            e([V(0, 295, 3, '-')]),
            d(.2),
            h(!0),
            yo(k),
            d(3),
            Y(a),
            g(!0, !0),
            zo(k),
            d(2),
            Ao(a, lj('|v|v|v')),
            Y(a),
            Bo(a, '|^|^|^|^'),
            Y(a),
            d(2),
            f(c, b),
            g(!1, !0),
            Ao(a, lj('|v^v|')),
            Y(a),
            Bo(a, '-||v^v^||-'),
            Y(a),
            d(2),
            f(c, b),
            g(!1, !0),
            Ao(a, lj('^|v-|')),
            Y(a),
            Bo(a, 'v|^-v-|^v'),
            Y(a),
            d(4)
          ].flat();
          ko(a, b);
          return b
        },
        state: 16,
        Xa: new sl,
        yb: T.yd,
        Kb: !1
      },
      {
        title: 'Level5',
        background: [10, 703, 0, 700, 416],
        backgroundPosition: eg,
        scale: .44,
        uc: [T.rd],
        wc: [36, 37, 38],
        kc: null,
        ac: [],
        Tb: [
          {Eb: Vn, position: new t(100, 330), z: 0},
          {Eb: Wn, position: new t(540, 240), z: 0},
          {Eb: Xn, position: new t(540, 340), z: 0},
          {Eb: Yn, position: new t(70, 200), z: 0},
          {Eb: Zn, position: new t(30, 260), z: 0},
          {Eb: $n, position: new t(320, 180), z: 460}
        ],
        lc: [],
        Vb: [],
        Ha: fg,
        Kb: !0,
        nc: T.he,
        Rb: 1600,
        yb: T.zd,
        yc: function(a) {
          var b =
                  function($b) {
            return go(1E3 * $b)
          },
              c =
                  function($b) {
                return fo(a, $b, !0)
              },
              d =
                  function($b) {
                return fo(a, $b, !1, !0)
              },
              e = new jm, f = new t(A(e).x, 230), g = new u, h = new M(vf),
              k = new M(wf), l = new M(xf);
          y(g, h.i.ya[3] / 2, h.Fa() / 2);
          k = [l, k, h];
          for (l = 0; l < k.length; l++) {
            var r = k[l];
            v(g, r);
            y(r, 0, -l * h.Fa());
            r.W = -1
          }
          var w = new M(Pe);
          y(w, 320, -1 * w.Fa());
          h = new t(220, 220);
          k = new t(400, 230);
          l = new t(140, 280);
          r = new t(220, 310);
          var B = new t(320, 320), z = new t(400, 310), C = new t(470, 300),
              W = new t(270, 275), fa = new t(270, 275), ca = new t(300, 275),
              Ta = new t(340, 275), za = new t(370, 275), Xa = new t(370, 275),
              Ur = new D(function() {
                Z.yb.stop();
                T.Bd.play();
                T.Ad.play(T.Bd.H - 800, !0)
              }),
              Vr = new D(function() {
                T.Ad.stop()
              });
          b = [
            Co(a, g, w),
            Do(a, e),
            b(3),
            c([X(h, 9, '^^')]),
            b(.9),
            c([X(k, 9, '||')]),
            b(.9),
            c([X(l, 9, '--')]),
            b(.9),
            c([X(r, 9, 'vv')]),
            b(.9),
            c([X(B, 9, '^-')]),
            b(.9),
            c([X(z, 9, '|-')]),
            b(.9),
            c([X(C, 9, '-v')]),
            b(.9),
            c([X(k, 9, 'v|')]),
            Y(a),
            Eo(a, e, '|-|^-^|-|z'),
            Y(a),
            b(1),
            c([X(l, 3, '^')]),
            b(.5),
            c([X(k, 4, '|')]),
            b(.5),
            c([X(r, 5, '-')]),
            b(.5),
            c([X(C, 3, 'v')]),
            b(.5),
            c([X(h, 4, '^')]),
            b(.5),
            c([X(z, 5, '|')]),
            b(.5),
            c([X(l, 3, '-')]),
            b(.5),
            c([X(k, 4, 'v')]),
            b(.5),
            c([X(h, 5, '|')]),
            b(.5),
            c([X(B, 3, '^')]),
            b(.5),
            c([X(C, 4, '-')]),
            b(.5),
            c([X(l, 5, 'v')]),
            b(.5),
            c([X(k, 3, '|')]),
            Y(a),
            Eo(a, e, 'vv|^-^|vvz'),
            Y(a),
            b(1),
            c([X(h, 10, '^-^-')]),
            c([X(k, 10, 'v-v-')]),
            c([X(l, 10, '|-|-')]),
            c([X(r, 10, 'v|v|')]),
            c([X(B, 10, '^|^|')]),
            c([X(z, 10, '-|-|')]),
            c([X(C, 10, 'vv^^')]),
            Y(a),
            Eo(a, e, '^-|v^-|v-^z'),
            Y(a),
            Ur,
            function() {
              return Fo(
                  a, g, Go[4].Tb.map(function($b) {
                    return $b.Eb
                  }),
                  w, e)
            }(),
            Ho(a, e, f),
            d([X(W, 10, '^|--'), X(Xa, 10, '--|^', !0)]),
            b(3),
            d([X(fa, 10, '||v-'), X(za, 10, '-v||', !0)]),
            b(3),
            d([X(ca, 10, '^--|'), X(Ta, 10, '|--^', !0)]),
            b(1.5),
            d([X(W, 10, '|-'), X(Xa, 10, '-|', !0)]),
            b(1.5),
            d([X(fa, 10, '^-^'), X(za, 10, 'v-v', !0)]),
            b(1.5),
            d([X(ca, 10, '||v'), X(Ta, 10, '^||', !0)]),
            b(1.5),
            d([X(ca, 20, 'z', !0)]),
            b(1.5),
            d([X(ca, 10, '^--|'), X(Ta, 10, '|--v', !0)]),
            b(1.5),
            d([X(fa, 10, '|-v-|'), X(za, 10, '^--|', !0)]),
            b(1.5),
            d([X(W, 10, '^|--'), X(Ta, 10, '--|^', !0)]),
            Y(a),
            Eo(a, e, '-|-v^-|-v^-|-z'),
            Y(a),
            b(1),
            Vr
          ].flat();
          ko(a, b);
          return b
        },
        state: 17,
        Xa: new On
      }
    ];
function Io() {
  return [].concat(
      ja(Z.uc.map(function(a) {
        return a.v
      })),
      ja(Z.wc.map(function(a) {
        return nd(Un, a)
      })))
}
var Z = Go[0];
var Jo = function(a) {
  u.call(this);
  this.g = a
};
p(Jo, u);
Jo.prototype.update = function() {
  var a = this.g.Ja(), b = Z.Vb;
  a = n(a);
  for (var c = a.next(); !c.done; c = a.next())
    if (c = c.value, c.va)
      for (var d = n(b), e = d.next(); !e.done; e = d.next()) {
        e = e.value;
        var f = A(c), g = A(e), h = f.x - g.x;
        f = f.y - g.y;
        h * h + f * f < Math.pow(60, 2) && (Vg(e), Mk(c))
      }
};
var Ko = {}, Lo = function() {
  throw Error('z');
};
Lo.prototype.Kd = null;
Lo.prototype.toString = function() {
  return this.g
};
var Mo = function() {
  Lo.call(this)
};
Ra(Mo, Lo);
Mo.prototype.Ue = Ko;
var No = function(a) {
  function b(c) {
    this.g = c
  }
  b.prototype = a.prototype;
  return function(c, d) {
    c = new b(String(c));
    void 0 !== d && (c.Kd = d);
    return c
  }
}(Mo);
var Oo = function() {
  var a = No(
      '<style>\n#fpdoodle body,#sadoodle body{background:#000}.ddlh20-fullscreenClickTarget_{position:absolute;height:100%;width:100%;top:0;left:0;pointer-events:all;cursor:pointer}.ddlh20-audioButton_{position:absolute;bottom:10px;left:15px;z-index:2;pointer-events:all;cursor:pointer}.ddlh20-unmute_{font-family:\'Itim\',\'sans-serif\';position:absolute;bottom:10px;left:70px;z-index:2;padding:5px;color:white;background-color:rgba(0,0,0,0.6);-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.ddlh20-unmuteFade_{opacity:0;-webkit-transition:opacity 300ms ease-in-out;-o-transition:opacity 300ms ease-in-out;transition:opacity 300ms ease-in-out}.ddlh20-video_{width:100%;height:100%}.ddlh20-thumbnail_{width:100%;height:100%;position:absolute;top:0;left:0}.ddlh20-wipeOut_{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;background-color:white}.ddlh20-wipeOut_.ddlh20-transition_{opacity:1;-webkit-transition:opacity 500ms ease-in-out;-o-transition:opacity 500ms ease-in-out;transition:opacity 500ms ease-in-out}.ddlh20-skip_{position:absolute;bottom:-2px;right:5px;z-index:2;pointer-events:all;cursor:pointer}.ddlh20-pauseContainer_{width:100%;height:100%;position:absolute;bottom:0;right:0}.ddlh20-pauseBg_{width:100%;height:100%;position:absolute;top:0;left:0;background:black;opacity:0.5}.ddlh20-pauseButton_{position:absolute;width:100px;height:100px;bottom:15px;right:15px;background-color:black;z-index:2;pointer-events:all}.ddlh20-pauseButton_:hover{cursor:pointer;filter:drop-shadow(-3px 3px 2px #2f3538)}.ddlh20-unpauseButton_{text-align:center;position:absolute;font-family:\'Itim\',\'sans-serif\';width:100%;font-size:48px;font-weight:normal;color:white;top:154px;z-index:2}.ddlh20-pauseText_{font-family:\'Itim\',\'sans-serif\';text-align:center;position:absolute;width:100%;font-size:24px;font-weight:400;color:#fbaa1a;line-height:28px;top:133px;z-index:2}.ddlh20-hide_{visibility:hidden}.ddlh20-domRoot_{left:50%;top:50%;pointer-events:all;position:absolute;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0}\n</style>');
  var b = (bb || (bb = new fi)).g;
  var c = 'DIV';
  'application/xhtml+xml' === b.contentType && (c = c.toLowerCase());
  b = b.createElement(c);
  if (La(a))
    if (a instanceof Lo) {
      if (a.Ue !== Ko) throw Error('A');
      a = Rb(a.toString(), a.Kd || null)
    } else
      a = Sb('zSoyz');
  else
    a = Sb(String(a));
  if (Ub())
    for (; b.lastChild;) b.removeChild(b.lastChild);
  b.innerHTML = Qb(a);
  1 == b.childNodes.length && (a = b.firstChild, 1 == a.nodeType && (b = a));
  return b
};
var Po = function() {
  u.call(this)
};
p(Po, u);
Po.prototype.Ca = function(a) {
  a.clearRect(-320, -180, 640, 360);
  u.prototype.Ca.call(this, a)
};
var Ro = function() {
  u.call(this);
  this.g = !1;
  this.i = .075;
  for (var a = 0; 30 > a; a++) Qo(this);
  a = n(this.Ja());
  for (var b = a.next(); !b.done; b = a.next()) b.value.y = 360 * Math.random()
};
p(Ro, u);
Ro.prototype.update = function() {
  Math.random() < this.i && Qo(this);
  if (this.g)
    for (var a = n(this.Ja()), b = a.next(); !b.done; b = a.next())
      b.value.speed = 3
};
var Qo = function(a) {
  var b = 3 + 9 * Math.random();
  for (var c = 0, d = 0; 2 > d; d++) c += Math.random();
  c = Math.floor(c / 2 * 640) - 320;
  .5 > Math.random() && (c = 320 + (320 - c));
  b = new $m(
      b, c, 360, Math.random() / b * .3, 1.4 - b / 35, Math.random() * b * 1.2,
      .05 * Math.random() / b);
  b.setScale(.1 * (b.j - 5) + 1.2);
  v(a, b)
}, So = function(a) {
  a.g = !0;
  a.i = .8
}, To = function(a) {
  a.g = !1;
  a.i = .075;
  a = n(a.Ja());
  for (var b = a.next(); !b.done; b = a.next()) b.value.speed = 1
};
var Uo = function(a, b, c, d, e) {
  d = void 0 === d ? !1 : d;
  e = void 0 === e ? !1 : e;
  G.call(this);
  this.g = a;
  this.width = b;
  this.height = c;
  this.j = d;
  this.i = e
};
p(Uo, G);
Uo.prototype.Ca = function(a) {
  a.fillStyle = this.g;
  a.beginPath();
  a.moveTo(0, 0);
  this.j ? Vo(this, a, 0, 0) : a.lineTo(this.width, 0);
  a.lineTo(this.width, this.height);
  this.i ? Vo(this, a, this.width, this.height, !0) : a.lineTo(0, this.height);
  a.closePath();
  a.fill()
};
var Vo = function(a, b, c, d, e) {
  e = void 0 === e ? !1 : e;
  for (var f = 0; f < a.width; f++)
    b.lineTo(
        c + f * (e ? -1 : 1),
        d + 15 * (180 < d ? 1 : -1) + 15 * Math.sin(.05 * f))
};
var Wo = function() {
  this.g = new u;
  this.g.setScale(3)
}, Xo;
Wo.prototype.reset = function() {
  this.g = new u;
  this.g.setScale(3)
};
var Yo = function() {
  Xo || (Xo = new Wo);
  return Xo
}, ap = function(a, b) {
  var c = Zo, d = [];
  qg(c.g, function(g) {
    return g.Ta() ? (d.push(g), !1) : !0
  });
  for (var e = 0; e < d.length; e++) d[e].update(a);
  d = [];
  var f = 0;
  qg(c.g, function(g) {
    return g.Ta() ?
        (d.push(g), g.La.i = ++f,
         g.La.g = g.W + (g.getParent() ? g.getParent().La.g : 0), !1) :
        !0
  });
  d.sort(function(g, h) {
    return g.La.g != h.La.g ? g.La.g - h.La.g : g.La.i - h.La.i
  });
  b.save();
  for (a = 0; a < d.length; a++)
    $o(b, pg(d[a])), b.globalAlpha = d[a].opacity, d[a].Ca(b);
  b.restore()
}, $o = function(a, b) {
  a.setTransform(b.j, b.v, b.s, b.o, b.i, b.g)
};
var bp = function() {
  this.Ga = !1
};
bp.prototype.update = function() {
  return this.Ga ? (this.Ga = !1, 1) : 0
};
bp.prototype.ka = function() {};
bp.prototype.Ea = function() {};
var dp = function() {
  qh.call(this);
  this.$ = !0;
  this.ka = !1;
  this.s = [];
  this.S = !1;
  this.g = this.o = this.j = 0;
  this.v = cp
};
p(dp, qh);
var gp = function(a, b) {
  b = new ep(b);
  fp(a, b)
}, fp = function(a, b) {
  a.s.push(b);
  a.S = !0
}, jp = function(a) {
  if (a.$)
    a.ka = !1;
  else {
    a.ka = !0;
    hp(a);
    a.S &&
        (a.s.sort(function(e, f) {
          return e.g == f.g ? f.i - e.i : e.g - f.g
        }),
         a.S = !1);
    for (var b = 0, c, d = 0; c = a.s[d]; d++)
      if (c.g <= a.j)
        ip(c) && fp(a, c), b++;
      else
        break;
    a.s.splice(0, b);
    a.j++;
    requestAnimationFrame(function() {
      jp(a)
    })
  }
}, hp = function(a) {
  var b = (new Date).getTime();
  30 < a.j && a.o &&
      (b - a.o >= 1.05 * a.v ? a.g++ : a.g >>= 1,
       20 < a.g && (a.v = Math.min(50, 1.2 * a.v), a.g = 0));
  a.o = b
};
dp.prototype.start = function() {
  this.$ = !1;
  this.ka || jp(this)
};
dp.prototype.stop = function() {
  this.$ = !0;
  this.o = this.g = 0
};
dp.prototype.i = function() {
  this.reset();
  qh.prototype.i.call(this)
};
dp.prototype.reset = function() {
  this.stop();
  this.s = [];
  this.j = 0;
  this.S = !1;
  this.v = cp;
  this.o = this.g = 0
};
Ja(dp);
var cp = 1E3 / 60, ep = function(a) {
  var b = void 0;
  b = void 0 === b ? null : b;
  this.i = 1E3 / 60;
  this.j = a;
  this.g = dp.wa().j;
  this.v = 0;
  this.o = b
}, ip = function(a) {
  var b = a.j(a.v);
  a.v++;
  a.g = dp.wa().j + a.i / dp.wa().v;
  !b && a.o && a.o();
  return b
};
ep.prototype.cancel = function() {
  this.j = function() {
    return !1
  }
};
var kp = Yo(), lp = function(a, b, c) {
  this.Ga = !1;
  this.s = a;
  this.H = b;
  this.S = c;
  this.v = jn(75, 75, 1770, 930);
  this.o = new Po;
  y(this.o, 320, 180);
  this.j = new M(N(Vf, 83, 0, 0, 2));
  y(this.j, 330, 170);
  this.j.setScale(2);
  this.bubbles = new Ro;
  this.i = new M(N(Wf, 83, 0, 0, 2));
  y(this.i, 330, 170);
  this.i.opacity = 0;
  this.i.setScale(2);
  this.Ya = new Uo('white', 640, 360);
  this.Ya.W = 460;
  this.g = new G;
  v(this.g, this.o);
  v(this.g, this.j);
  v(this.g, this.i);
  v(this.g, this.bubbles);
  v(this.g, this.Ya)
};
p(lp, bp);
lp.prototype.Ua = function() {
  var a = this;
  this.Ya.opacity = 0;
  pn(this.H, this.v, function(b) {
    switch (b) {
      case 'mouseup':
        H(a.g, new Kg(a.Ya, 150, 0, 1));
        J(a.g, 300, function() {
          a.Ga = !0;
          a.S && (mp(a.S, function() {
                    dp.wa().stop()
                  }), dp.wa().start())
        });
        break;
      case 'mouseover':
        a.s.style.cursor = 'pointer';
        a.j.opacity = 0;
        a.i.opacity = 1;
        So(a.bubbles);
        break;
      case 'mouseout':
        a.s.style.cursor = '', a.j.opacity = 1, a.i.opacity = 0, To(a.bubbles)
    }
  });
  v(kp.g, this.g)
};
lp.prototype.Va = function() {
  x(this.g);
  np(this.H, this.v);
  var a = document.getElementById('hplogo');
  null != a && a.removeAttribute('title')
};
td.wa();
N(
    [
      Cf, Cf, Cf, Cf, Cf, Cf, Df, [20, 0, 1203, 81, 74], [20, 84, 1203, 81, 74],
      Df, Df
    ],
    83, 0, 0);
O(
    [
      [20, 920, 1203, 81, 74], [20, 1004, 1203, 81, 74],
      [20, 1088, 1203, 81, 74], [20, 495, 1205, 81, 74]
    ],
    83, 0, 0);
O([[36, 1306, 726, 64, 84]], 83, 0, -2);
O([[36, 1373, 726, 64, 84], [36, 1440, 726, 64, 84]], 83, 0, -2);
N(
    [
      [36, 2465, 580, 100, 113], [36, 2568, 580, 100, 113],
      [36, 2671, 580, 100, 113], [36, 3410, 612, 100, 113],
      [36, 3513, 612, 100, 113], [36, 2774, 651, 100, 113]
    ],
    83, 0, -2);
N(
    [
      yf, yf, yf, yf, yf, yf, yf, yf, yf, yf, yf, yf, yf, yf, yf,
      yf, yf, yf, yf, yf, zf, zf, Af, Af, Af, Af, Af, Af, zf, zf
    ],
    83, 0, 0);
O([[36, 1507, 726, 63, 82]], 83, 0, 0);
O([[36, 1573, 726, 63, 82], [36, 1639, 726, 63, 82]], 83, 0, 0);
N(
    [
      [36, 1823, 580, 104, 113], [36, 1930, 580, 104, 113],
      [36, 2037, 580, 104, 113], [36, 2144, 580, 104, 113],
      [36, 2251, 580, 104, 113], [36, 2358, 580, 104, 113]
    ],
    83, 0, 0);
N(
    [
      Qe, Qe, Qe, Qe, Re, Re, Se, Se, Te, Te, Ue, Ue, Ue, Ue, Ue,
      Ue, Ue, Ue, Ue, Ue, Te, Te, Se, Se, Re, Re, Qe, Qe, Qe, Qe
    ],
    83, 0, 0);
O(
    [
      [20, 1250, 617, 102, 87], [20, 1250, 707, 102, 87],
      [20, 1250, 797, 102, 87], [20, 1250, 887, 102, 87],
      [20, 1250, 977, 102, 87], [20, 1250, 1067, 102, 87]
    ],
    83, 0, 0);
O([[36, 1705, 726, 61, 84]], 83, 0, -6);
O([[36, 3367, 728, 61, 84], [36, 3431, 728, 61, 84]], 83, 0, -6);
N(
    [
      [36, 620, 669, 92, 113], [36, 1823, 696, 92, 113],
      [36, 1918, 696, 92, 113], [36, 2013, 696, 92, 113],
      [36, 2108, 696, 92, 113], [36, 2203, 696, 92, 113]
    ],
    83, 0, -6);
N([Je, Je, Ke, Ke, Le, Le, Me, Me, Ne, Ne], 83, 0, 0);
O(
    [
      [20, 581, 1144, 82, 78], [20, 1211, 1157, 82, 78],
      [20, 666, 1194, 82, 78], [20, 751, 1194, 82, 78]
    ],
    83, 0, 0);
N(
    [
      [36, 2562, 696, 76, 75], [36, 2641, 696, 76, 75], [36, 838, 726, 76, 75],
      [36, 917, 726, 76, 75], [36, 996, 726, 76, 75]
    ],
    83, 0, 1);
O([[36, 2386, 696, 85, 81], [36, 2474, 696, 85, 81]], 83, 0, 1);
N(
    [
      [36, 2877, 651, 95, 105], [36, 2975, 651, 95, 105],
      [36, 3073, 651, 95, 105], [36, 3171, 651, 95, 105],
      [36, 3269, 651, 95, 105], [36, 740, 655, 95, 105]
    ],
    83, 0, 1);
td.wa();
var pp = function(a, b) {
  P.call(this, op);
  y(this, a, b)
};
p(pp, P);
pp.prototype.update = function(a) {
  P.prototype.update.call(this, a);
  a = 1;
  1 == this.state && (a += .1 * Math.max(0, Math.sin(this.ka / 100)));
  this.setScale(a)
};
pp.prototype.U = function(a) {
  this.state == a || 3 == this.state && 2 == a || 4 == this.state && 1 == a ||
      (qp.get(a) && rp.get(this.state) ?
           (L(this), Q(this, 2, sp), a = 3) :
           rp.get(a) && qp.get(this.state) && (L(this), Q(this, 0, tp), a = 4),
       P.prototype.U.call(this, a))
};
var up = $e[3], vp = 1E3 / 12, sp = Xf.length * vp, tp = Yf.length * vp,
    qp = new Map([[2, !0], [3, !0]]), rp = new Map([[0, !0], [1, !0], [4, !0]]),
    op = new Map([
      [0, [{ya: $e, duration: 0, x: 0, y: 0, z: 0, children: []}]],
      [1, [{ya: $e, duration: 0, x: 0, y: 0, z: 0, children: []}]],
      [2, [{ya: af, duration: 0, x: 0, y: 0, z: 0, children: []}]],
      [3, O(Xf, vp, 0, 0)], [4, O(Yf, vp, -3, 0)]
    ]);
function wp(a, b, c, d, e, f, g) {
  var h = void 0 === h ? '' : h;
  var k = a.font;
  a.font = h + ' ' + d + 'px ' + c;
  for (var l = xp(a, b, f); l.length > g && d > e;)
    d = Math.max(e, 1 < d ? d - 1 : d - .1), a.font = h + ' ' + d + 'px ' + c,
    l = xp(a, b, f);
  for (b = 0; b < l.length; b++)
    for (; a.measureText(l[b]).width > f && d > e;)
      d = Math.max(e, 1 < d ? d - 1 : d - .1), a.font = h + ' ' + d + 'px ' + c;
  a.font = k;
  return {
    lines: l, fontFamily: c, fontSize: d, fontStyle: h
  }
}
function xp(a, b, c) {
  b = b.match(/[^\s-]+-?/g);
  if (!b || 1 > b.length) return [''];
  for (var d = b[0], e = [], f = 1; f < b.length; f++) {
    var g = d + ('-' == d[d.length - 1] ? '' : ' ') + b[f];
    a.measureText(g).width > c ? (e.push(d), d = b[f]) : d = g
  }
  e.push(d);
  return e
};
var yp = function(a, b, c, d, e, f, g, h, k) {
  f = void 0 === f ? '#000' : f;
  g = void 0 === g ? 'left' : g;
  u.call(this);
  this.text = a;
  this.fontFamily = d;
  this.fontSize = e;
  this.i = f;
  this.s = g;
  this.v = h;
  this.o = k;
  y(this, b, c);
  this.j = this.fontSize + 'px ' + this.fontFamily
};
p(yp, u);
yp.prototype.Ca = function(a) {
  u.prototype.Ca.call(this, a);
  a.save();
  void 0 !== this.o &&
      (this.fontSize = wp(a, this.text, this.fontFamily, this.fontSize,
                          this.fontSize / 4, this.o, 1)
                           .fontSize,
       this.j = this.fontSize + 'px ' + this.fontFamily);
  a.font = this.j;
  this.i && (a.fillStyle = this.i);
  this.v && (a.shadowColor = this.v, a.shadowBlur = 5);
  a.textAlign = this.s;
  a.fillText(this.text, 0, 0);
  a.restore()
};
var zp = Ui(), Bp = function(a) {
  G.call(this);
  this.i = [];
  this.g = 0;
  this.o = a;
  for (a = 0; 5 > a; a++) {
    var b = new pp(up * (a + 1), 25);
    this.i.push(b);
    v(this, b)
  }
  Ap(this);
  this.j = new yp(
      this.g.toString(), 640 - (Ic ? 74 : 25), 37, '\'Itim\', sans-serif', 40,
      'orange', 'right', 'black');
  v(this, this.j);
  zp.addListener(this)
};
p(Bp, G);
Bp.prototype.Pa = function(a, b) {
  var c = this;
  10 == a && 5 < b ? this.i[this.i.length - 1].U(2) :
                     2 == a &&
          (L(this),
           this.g < b ? H(this, new tj(300, this.g, b, function(d) {
                            c.g = Math.ceil(d);
                            c.j.text = c.g.toString()
                          })) : (this.g = b, this.j.text = this.g.toString()))
};
Bp.prototype.update = function(a) {
  G.prototype.update.call(this, a);
  Ap(this)
};
var Ap = function(a) {
  for (var b = 0; b < a.i.length; b++) {
    var c = 0;
    b > a.o.j - 1 ? c = 2 : b == a.o.j - 1 && (c = 1);
    a.i[b].U(c)
  }
};
var Cp = function(a) {
  G.call(this);
  var b = a.position,
      c = new yp(
          '+' + a.points.toString(), 0, 0, '\'Itim\', sans-serif', 24, a.color,
          'center');
  v(this, c);
  y(this, b.x, b.y - 30);
  this.opacity = 0;
  this.W = 470;
  K(this, new F(this, 400, null, new t(b.x, b.y - 60), function() {}, Ag));
  K(this, new Kg(c, 400, 1, 0, function() {
      x(c)
    }));
  K(this, new nj(this, 1.1 * (320 > b.x ? -1 : 1), 0, 2))
};
p(Cp, G);
var Dp = Ui(), Ep = function() {
  G.call(this);
  this.S = this.o = this.s = 0;
  this.i = new G;
  v(this, this.i);
  this.g = new yp(
      '0', 315, 340, '\'Itim\', sans-serif', 32, 'orange', 'center', 'black');
  this.g.W = 470;
  K(this, new nj(this.g, .7, 3));
  this.g.Ba = !1;
  this.j = new M(wd);
  this.j.W = -1;
  this.j.setScale(.5);
  this.j.opacity = .6;
  y(this.j, 5, -10);
  v(this.g, this.j);
  v(this, this.g);
  this.H = T.Sc;
  Ui().addListener(this)
};
p(Ep, G);
Ep.prototype.Pa = function(a, b) {
  !this.Ta() || 5 != a && 11 != a ?
      this.Ta() && 0 < this.o && (8 == a || 17 == a) ?
      (L(this.i), Gg(this.i, new Kg(this.j, 200, .6, 0)),
       H(this.i, new Kg(this.g, 200, 1, 0)), Hp(this)) :
      13 == a && (this.S = this.s) :
      (Fp(this), this.H = Gp[(this.o - 1) % Gp.length], b.points *= this.o,
       this.s += b.points, U(Dp, 2, this.s), v(this, new Cp(b)))
};
var Fp = function(a) {
  L(a.i);
  Ig(a.i);
  a.o++;
  2 <= a.o ?
      (2 == a.o ?
           (K(a, new Kg(a.g, 200, 0, 1)), K(a, new Kg(a.j, 200, 0, .6))) :
           (a.g.opacity = 1, a.j.opacity = .6),
       a.g.Ba = !0, a.g.text = ' x ' + a.o, I(a.i, 500),
       Gg(a.i, new Kg(a.j, 500, .6, 0)),
       H(a.i,
         new Kg(
             a.g, 500, 1, 0,
             function() {
               return Hp(a)
             }))) :
      J(a.i, 1E3, function() {
        return Hp(a)
      })
}, Hp = function(a) {
  a.o = 0;
  a.H = T.Sc
}, Gp = [T.Jd, T.Ke, T.Le, T.Me];
var Ip = Ui(), Lp = function(a, b) {
  Ek.call(
      this,
      new Map([[0, Jp], [2, Jp], [3, Jp], [5, Kp], [6, [Kp[Kp.length - 1]]]]),
      20, [4], a, b, new t(0, 0), -35);
  this.W = 460
};
p(Lp, Ek);
Lp.prototype.H = function() {
  U(Ip, 18);
  return Ek.prototype.H.call(this)
};
var Jp = N(
        [
          [21, 3063, 1202, 78, 63], [21, 3144, 1202, 78, 63],
          [21, 2572, 1204, 78, 63], Ye, Ye, Ye, Ye, Ye
        ],
        83, 0, 0),
    Kp = O(
        [
          [21, 3142, 770, 78, 63], [21, 2658, 1096, 78, 63],
          [21, 2739, 1096, 78, 63], [21, 2820, 1096, 78, 63],
          [21, 2658, 1162, 78, 63], [21, 2739, 1162, 78, 63],
          [21, 2820, 1162, 78, 63], [21, 2901, 1202, 78, 63],
          [21, 2982, 1202, 78, 63], [21, 2982, 1202, 78, 63],
          [21, 2982, 1202, 78, 63], [21, 2982, 1202, 78, 63]
        ],
        83, 0, 0);
var Mp = function(a, b, c) {
  E.call(this, b, null, void 0 === c ? function() {} : c);
  this.s = a;
  this.i = 0;
  this.o = A(a)
};
p(Mp, E);
Mp.prototype.update = function(a) {
  E.prototype.update.call(this, a);
  60 < this.g - this.i &&
      (this.i = this.g,
       y(this.s, this.o.x + 12 * Math.random(), this.o.y + 12 * Math.random()))
};
var Np = Ui(), Qp = function(a, b) {
  Ek.call(this, Op, 20, [5], a.start.x, a.start.y, new t(0, 0), -35);
  this.Ma = b;
  this.speed = 80;
  this.Aa = !0;
  this.direction = a.direction;
  this.state = 0;
  Pp(this);
  this.setScale(.3);
  this.g.setScale(1 / .3);
  og(this.g, -40);
  this.g.W = this.W
};
p(Qp, Ek);
Qp.prototype.Qb = function() {};
Qp.prototype.H = function() {
  var a = this;
  U(Np, 19, A(this));
  this.U(5);
  this.g.opacity = 0;
  this.j = !1;
  L(this);
  J(this, 100, function() {
    K(a, new F(a, 800, A(a), a.Ma, function() {
        a.Na()
      }, Fg));
    K(a, new tj(800, 1, 0, function(b) {
        a.opacity = b
      }));
    K(a, new tj(800, .3, .7, function(b) {
        a.setScale(b)
      }, Fg))
  });
  return !0
};
Qp.prototype.update = function(a) {
  var b = A(this);
  (50 < b.x - 640 || 50 < b.y - 360 || -50 > b.x || -50 > b.y) && this.Aa &&
      this.Na();
  Ek.prototype.update.call(this, a)
};
Qp.prototype.Na = function() {
  this.Aa = !1;
  L(this);
  Ig(this);
  Np.removeListener(this);
  this.U(5);
  Q(this, 6, this.Ea)
};
var Pp =
        function(a) {
  a.state = 2;
  H(a, new F(a, 1700, A(a), Rp(a), function() {}, Eg));
  Q(a, 0, 0);
  J(a, 500, function() {
    Pp(a)
  })
},
    Rp =
        function(a) {
      var b = A(a);
      return new t(
          b.x + Ak(a.direction).x * a.speed, b.y + Ak(a.direction).y * a.speed)
    },
    Sp = O([Ie], 83, 0, 0), Tp = N([Ie], 83, 0, 0),
    Op = new Map([[0, Tp], [2, Tp], [3, Tp], [5, Sp], [6, Sp]]);
var Up = function() {
  G.call(this)
};
p(Up, G);
var Vp = function(a) {
  I(a, Wb(4E3, 1E4));
  J(a, 0, function() {
    .5 < Math.random() ? T.Ie.play() : T.Je.play()
  });
  J(a, 0, function() {
    Vp(a)
  })
};
var Wp = Ui(), Xp = function(a, b, c, d) {
  u.call(this);
  this.g = a;
  this.T = b;
  this.i = c;
  this.s = d;
  this.j = null;
  this.scale = 1;
  this.v = this.o = null;
  this.Ha = A(b);
  Wp.addListener(this)
};
p(Xp, u);
var go = function(a) {
  return new E(a)
}, Y = function(a) {
  var b = new rg;
  b.Za = function() {
    return a.g.Ja().length ===
        (a.o && 6 != a.o.state ? 1 : 0) + (a.v && 6 != a.v.state ? 1 : 0)
  };
  return b
}, fo = function(a, b, c, d) {
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? !1 : d;
  return new D(function() {
    var e = c, f = d;
    e = void 0 === e ? !1 : e;
    f = void 0 === f ? !1 : f;
    for (var g = [], h = 0; h < b.length; h++) {
      var k = b[h];
      if (!(4 === k.i[0] && 5 <= a.T.j)) {
        var l = void 0;
        0 < k.i.length && 4 === k.i[0] ?
            l = new Lp(k.g.x, k.g.y) :
            l = Sk(k.i.slice(), k.g.x, k.g.y, a.Ha);
        l.Qb();
        if (0 < k.j)
          if (f) {
            var r = l, w = k.j, B = k.o;
            if (0 < w) {
              r.s = w;
              k = r.Ha.x;
              var z = r.Ha.y, C = A(r).x, W = A(r).y, fa = z - W, ca = k - C,
                  Ta = (void 0 === B ? 0 : B) ? .8 : -.8;
              B = new t(k + fa * -Ta, z + ca * Ta);
              ca = new t(C + fa * -Ta, W + ca * Ta);
              fa = Ck(ca, B, .15);
              B = Ck(ca, B, .85);
              Pg(r, w, new ug(C, W, fa.x, fa.y, B.x, B.y, k, z))
            }
          } else
            Fk(l, k.j);
        e ? (l.setScale(0),
             .5 > a.scale ? Gk(l, a.scale, 3 * a.scale) : Gk(l, a.scale)) :
            (l.setScale(a.scale), .5 > a.scale && l.g.setScale(3 * a.scale));
        l.W < a.T.W && (l.W = a.T.W + 1);
        v(a.g, l);
        g.push(l)
      }
    }
    U(Wp, 22)
  })
}, uo = function(a, b, c) {
  return new D(function() {
    v(a.i, b);
    c && Yk(b, c);
    b.setScale(a.scale);
    b.j = !1
  })
}, Ao = function(a, b) {
  return new D(function() {
    var c = a.i.Ja().filter(function(d) {
      return d instanceof Vk
    })[0];
    Lk(c, b);
    c.j = !0;
    $k(c);
    v(a.g, c)
  })
}, xo = function(a) {
  return new D(function() {
    var b = new Up;
    v(a.i, b);
    Vp(b)
  })
}, vo = function(a, b, c, d) {
  return new D(function() {
    var e = a.i.Ja().filter(function(f) {
      return f instanceof Vk
    })[0];
    Xk(e, b, c);
    d && b && Zk(e)
  })
}, io = function(a) {
  var b = V(5, 295, 14, ''), c = Go[0].Xa;
  return new D(function() {
    c.Qb();
    Fk(c, b.j);
    v(a.g, c);
    U(Wp, 22)
  })
}, jo = function() {
  var a = Go[0].Xa, b = new rg;
  b.Za = function() {
    return 13 === a.state
  };
  return b
}, po = function(a) {
  var b, c = new D(function() {
           b = Ol(a)
         }),
         d = new rg;
  d.Za = function() {
    return b.Za()
  };
  return [c, d]
}, lo = function(a, b) {
  return new D(function() {
    v(a.s, b)
  })
}, mo = function(a, b) {
  var c = 20, d = new D(function() {
                c = Nl(b, a.g)
              }),
      e = new E(c);
  e.j = function() {
    e.duration = c
  };
  return [d, e]
}, no = function(a, b) {
  return new D(function() {
    for (var c = n([].concat(ja(a.g.Ja()))), d = c.next(); !d.done;
         d = c.next())
      d = d.value, d instanceof Lp || d instanceof Qp || x(d);
    Kl(b);
    c = Sk(lj(Fl[b.j].Uc), 0, 0, a.Ha, -105);
    b.Fb(c, a.Ha);
    v(a.g, c);
    U(Wp, 22)
  })
}, oo = function(a) {
  return new D(function() {
    a.j++
  })
}, qo = function() {
  var a = Go[2].Xa;
  return new D(function() {
    a.reset();
    a.Ba = !0
  })
}, ro = function(a, b) {
  var c = Go[2].Xa;
  return new D(function() {
    var d = Sk(lj(b), 0, 0, a.Ha, -120);
    c.Fb(d);
    v(a.g, d);
    v(a.s, c);
    U(Wp, 22)
  })
}, so = function() {
  var a = Go[2].Xa;
  return new D(function() {
    Mm(a)
  })
}, to = function() {
  var a = Go[2].Xa;
  return new D(function() {
    a.Na()
  })
}, Bo = function(a, b) {
  var c = Go[3].Xa;
  return new D(function() {
    var d = Sk(lj(b), 0, 0, a.Ha, -105);
    c.Fb(d, a.T);
    v(a.g, d);
    v(a.s, c);
    U(Wp, 22)
  })
}, Do = function(a, b) {
  return new D(function() {
    v(a.s, b)
  })
}, Eo = function(a, b, c) {
  return new D(function() {
    var d = Sk(lj(c), 0, 0, a.Ha, -105);
    b.Fb(d, a.T);
    v(a.g, d);
    U(Wp, 22)
  })
}, Ho = function(a, b, c) {
  var d = new D(function() {
    U(em, 29);
    b.Sb = lm;
    b.U(1);
    og(b, -50);
    b.opacity = 0;
    b.W = 460;
    b.Xb.W = -10;
    b.xc.W = -461;
    b.Xb.opacity = 1;
    b.xc.opacity = 1
  });
  c = new F(b, 2E3, null, c, function() {}, Dg);
  var e = b.Xb, f = A(e);
  e = new F(e, 2E3, new t(f.x, f.y + 40), new t(f.x, f.y), function() {}, Dg);
  f = new F(a.T, 2E3, null, fg, function() {
    a.Ha = A(a.T)
  });
  c = new tg([c, e, f]);
  var g = 0;
  e = new D(function() {
    b.U(0);
    b.opacity = 1;
    g = Mg(xm)
  });
  f = new D(function() {
    b.U(1)
  });
  var h = new E(g);
  h.j = function() {
    h.duration = g
  };
  return [d, c, e, h, f]
}, Co = function(a, b, c) {
  return new D(function() {
    v(a.i, b);
    v(a.i, c)
  })
}, Fo = function(a, b, c, d, e) {
  var f = [], g = [];
  c = n(c);
  for (var h = c.next(); !h.done; h = c.next())
    h = h.value, g.push(new Mp(h, 1500)),
    f.push(new F(h, 1E3, null, new t(A(h).x, 500)));
  c = new D(function() {
    T.Ce.play()
  });
  g = new tg(g);
  b = new F(b, 3E3, null, new t(320, 1E3), function() {}, Fg);
  a = new F(a.T, 2E3, null, new t(fg.x, 500), function() {}, Dg);
  e = new F(e, 1E3, null, new t(A(e).x, 500), function() {}, Dg);
  d = new F(d, 2E3, null, new t(A(d).x, 1.5 * d.Fa()), function() {}, Dg);
  f.push(b);
  f.push(a);
  f.push(e);
  f.push(d);
  f = new tg(f);
  return [c, g, f]
}, ko = function(a, b) {
  for (var c = function(e) {
         return function() {
           x(b[e]);
           if (e < b.length - 1) {
             var f = b[e + 1];
             a.j && x(a.j);
             a.j = f;
             v(a, f)
           } else
             U(Wp, 1)
         }
       }, d = 0; d < b.length; d++)
    b[d].Lc = c(d)
}, wo = function(a, b) {
  return new D(function() {
    v(a.i, b)
  })
}, yo = function(a) {
  return new D(function() {
    a.Ya(0, 1, 1E3)
  })
}, zo = function(a) {
  return new D(function() {
    a.Ya(1, 0, 1E3)
  })
};
Xp.prototype.Pa = function(a) {
  switch (a) {
    case 21:
      this.o && 6 != this.o.state ||
          (a = kj(190, 295), a = new Lp(a.x, a.y), a.Qb(),
           a.setScale(this.scale), v(this.g, a), this.o = a)
  }
};
var ho =
        function(a) {
  return new D(function() {
    if (!(a.v && 6 != a.v.state || a.T.o.Ta())) {
      var b = new Qp(Yp[Math.floor(Math.random() * Yp.length)], a.Ha);
      b.Qb();
      v(a.g, b);
      a.v = b
    }
  })
},
    Yp = [
      {start: new t(670, 300), direction: new yk(-1, 0)},
      {start: new t(-30, 300), direction: new yk(1, 0)}
    ];
var Zp = function(a) {
  Ua.call(this, a);
  this.o = this.g = this.s = null
};
p(Zp, Ua);
Zp.prototype.preload = function() {
  var a = this, b, c = new Promise(function(d) {
                     return b = d
                   });
  if (this.s || this.g) return Promise.resolve();
  this.g = mi(this.Nb, function() {
    a.i();
    b()
  });
  return c
};
Zp.prototype.i = function() {
  var a = this;
  this.g && vi(this.g) &&
      (this.s = wi(this.g), this.g.Gc(), this.g = null, this.o = new Image,
       this.o.onload =
           function() {
             return Ua.prototype.i.call(a)
           },
       this.o.src = 'data:image/svg+xml;utf-8,' +
           encodeURIComponent((new XMLSerializer).serializeToString(this.s)))
};
Zp.prototype.Ic = function() {
  return this.o
};
var $p = function(a, b) {
  this.g = b.map(function(c) {
    return new Zp(a + c)
  })
};
$p.prototype.preload = function(a, b) {
  var c = aq(this, a);
  return (new Promise(function(d) {
           Va(c, d);
           c.preload()
         }))
      .then(function() {
        return b && b()
      })
};
var aq = function(a, b) {
  return 'number' == typeof b ? a.g[b] : a.g[b[0]]
};
$p.prototype.Fa = function(a) {
  return a[4]
};
var bq = function(a, b) {
  var c = void 0 === c ? 1 : c;
  var d = document.createElement('div');
  d.style.width = b[3] * c + 'px';
  d.style.height = a.Fa(b) * c + 'px';
  c = void 0 === c ? 1 : c;
  a = aq(a, b);
  d.style.background = 'url(' + a.Nb + ') ' +
      (-b[1] * c + 'px ' + -b[2] * c + 'px/') +
      (a.Ic().width * c + 'px ' + (a.Ic().height * c + 'px no-repeat'));
  return d
};
$p.prototype.Ca = function(a, b, c, d, e, f) {
  var g = aq(this, a);
  g.Kc() &&
      b.drawImage(g.Ic(), a[0], a[1], a[3], a[4], c - e / 2, d - f / 2, e, f)
};
var dq = function() {
  $p.call(this, '/logos/2020/halloween20/dev2/', cq)
};
p(dq, $p);
Ja(dq);
var cq = ['svg-sprite.svg'], eq = [0, 20, 20, 54, 54], fq = [0, 20, 94, 54, 54],
    gq = [0, 20, 168, 54, 54], hq = [0, 20, 242, 54, 54];
td.wa();
var iq = dq.wa(), jq = Ui(), kq = Yo(), lq = function(a, b, c) {
  this.Ga = !1;
  this.T = a;
  this.s = b;
  this.V = c;
  this.i = new u;
  this.va = new u;
  this.ha = new u;
  this.v = new Xp(this.i, this.T, this.va, this.ha);
  this.S = new Bp(this.T);
  this.Aa = new Jo(this.i);
  this.o = new Ep;
  this.o.Ba = !1;
  this.g = new u;
  this.g.Ba = !1;
  this.$ = 0;
  jq.addListener(this);
  v(this.g, this.T);
  v(this.g, this.i);
  v(this.g, this.va);
  v(this.g, this.ha);
  v(this.g, this.v);
  v(this.g, this.o);
  this.S.W = 470;
  v(this.g, this.S);
  v(this.g, this.Aa);
  this.H = bq(iq, eq);
  this.H.classList.add('ddlh20-pauseButton_');
  Ih(this.H, 'click', function() {
    U(jq, 23)
  });
  this.j = bq(iq, fq);
  this.j.classList.add('ddlh20-pauseButton_');
  this.j.classList.add('ddlh20-hide_');
  Ih(this.j, 'click', function() {
    U(jq, 24)
  })
};
p(lq, bp);
lq.prototype.Pa = function(a, b) {
  switch (a) {
    case 4:
      if (!this.g.Ta()) break;
      if (!qk(this.T, b)) break;
      var c = this.i.Ja();
      a = !1;
      c = n(c);
      for (var d = c.next(); !d.done; d = c.next())
        d = d.value, 6 == d.state || (a = Jk(d, b) || a);
      a || U(jq, 17);
      (b = cj.get(b).$a) ? b.play() : this.o.H.play();
      break;
    case 7:
      mq(this);
      break;
    case 9:
      if (!this.g.Ta()) break;
      rk(this.T);
      break;
    case 8:
      if (!this.g.Ta()) break;
      sk(this.T);
      break;
    case 1:
      L(this.T);
      U(jq, 13);
      this.$ = 1;
      break;
    case 0:
      nq(this.s);
      this.v.Ba = !1;
      break;
    case 16:
      this.$ = 7;
      break;
    case 15:
      x(this.g);
      this.T.reset();
      b = this.o;
      b.s = 0;
      U(Dp, 2, b.s);
      b.S = 0;
      break;
    case 14:
      this.T.reset();
      Z.Kb && uk(this.T);
      b = this.o;
      b.s = b.S;
      U(Dp, 2, b.s);
      oq(this);
      break;
    case 22:
      mq(this)
  }
};
lq.prototype.ka = function() {
  this.v.Ba = !1;
  nq(this.s);
  this.H.classList.add('ddlh20-hide_');
  this.j.classList.remove('ddlh20-hide_')
};
var oq = function(a) {
  ok(a.T);
  ng(a.i);
  ng(a.va);
  ng(a.ha);
  var b = Z, c = a.v;
  a = b.yc(a.v);
  var d = b.Ha;
  c.scale = b.scale;
  c.o = null;
  c.v = null;
  c.Ha = d;
  b = a[0];
  c.j && x(c.j);
  c.j = b;
  v(c, b)
}, mq = function(a) {
  for (var b = new Set, c = n(a.i.Ja()), d = c.next(); !d.done; d = c.next())
    b.add(Ik(d.value));
  a.s.j = b
};
lq.prototype.Ua = function() {
  this.g.Ba = !0;
  this.$ = 0;
  this.S.Ba = !0;
  v(this.g, this.T);
  v(this.g, this.i);
  L(this.T);
  y(this.T, Z.Ha);
  ok(this.T);
  this.T.W = 180 + this.T.Fa() / 2;
  this.T.setScale(Z.scale);
  this.o.Ba = !0;
  this.v.Ba = !0;
  Z.Kb && uk(this.T);
  v(kq.g, this.g);
  pq(this.s);
  this.V.appendChild(this.H);
  this.V.appendChild(this.j)
};
lq.prototype.Va = function() {
  if (4 === Go.indexOf(Z))
    this.S.Ba = !1, Z.yb.stop();
  else {
    0 === Go.indexOf(Z) && v(kq.g, this.i);
    this.g.Ba = !1;
    var a = this.T;
    a.g && x(a.g);
    x(this.g)
  }
  this.o.Ba = !1;
  nq(this.s);
  L(this.T);
  this.V.removeChild(this.H);
  this.V.removeChild(this.j)
};
lq.prototype.update = function() {
  return this.$
};
var qq = function(a, b) {
  b = void 0 === b ? 'white' : b;
  G.call(this);
  var c = this, d = new t(0, 0);
  a = new yp(a, 0, 0, '\'Itim\', sans-serif', 24, b, 'center');
  v(this, a);
  y(this, d.x, d.y);
  this.W = 470;
  I(this, 1E3);
  H(this, new Kg(a, 500, 1, 0, function() {
      x(c)
    }))
};
p(qq, G);
var rq = function(a, b, c, d, e, f, g, h, k, l, r, w) {
  yp.call(this, b, c, d, g, h, e, f);
  var B = this;
  this.g = wp(a, b, g, h, k, l, r);
  w && (a = new u, a.Ca = function(z) {
    z.fillStyle = '#000';
    var C = B.g;
    z.font = C.fontStyle + ' ' + C.fontSize + 'px ' + C.fontFamily;
    for (var W = 0, fa = 0; fa < C.lines.length; fa++)
      W = Math.max(W, z.measureText(C.lines[fa]).width);
    var ca = W + 40;
    fa = B.g.lines.length * h + 20;
    C = -fa / 2;
    W = -ca / 2;
    ca /= 2;
    fa /= 2;
    z.beginPath();
    z.moveTo(W + 20, C);
    z.lineTo(ca - 20, C);
    z.quadraticCurveTo(ca, C, ca, C + 20);
    z.lineTo(ca, fa - 20);
    z.quadraticCurveTo(ca, fa, ca - 20, fa);
    z.lineTo(W + 20, fa);
    z.quadraticCurveTo(W, fa, W, fa - 20);
    z.lineTo(W, C + 20);
    z.quadraticCurveTo(W, C, W + 20, C);
    z.fill()
  }, a.opacity = .7, a.W = -1, y(a, 0, -5), v(this, a))
};
p(rq, yp);
rq.prototype.Ca = function(a) {
  a.fillStyle = this.i;
  a.textAlign = this.s;
  var b = this.g,
      c = this.g.fontSize / 4 - (this.g.lines.length - 1) / 2 * this.g.fontSize,
      d = this.g.fontSize, e = a.font;
  a.font = b.fontStyle + ' ' + b.fontSize + 'px ' + b.fontFamily;
  for (var f = 0; f < b.lines.length; f++) a.fillText(b.lines[f], 0, c + f * d);
  a.font = e
};
var sq={ad:['ca'],ae:['ar','en','fa','hi','ur'],af:['ps','fa'],ag:['en'],ai:['en'],al:['sq','en'],am:['hy','ru'],ao:['pt-PT'],ar:['es-419','es'],as:['en'],at:['de'],au:['en'],az:['az','ru'],ba:['bs','hr','sr'],bd:['bn','en'],be:['nl','de','en','fr'],bf:['fr'],bg:['bg'],bh:['ar','en'],bi:['fr'],bj:['fr'],bn:['ms','en','zh-CN'],bo:['es-419','es'],br:['pt-BR','en'],bs:['en'],bt:['en'],bw:['tn','en'],by:['be','ru'],bz:['en','es','es-419'],ca:['en','fr','fr-CA'],cd:['fr','sw'],cf:['fr'],cg:['fr'],ch:['de',
'en','fr','it'],ci:['fr'],ck:['en'],cl:['es-419','es'],cm:['fr','en'],cn:['zh-CN'],co:['es-419','es'],cr:['es-419','en','es'],cu:['es-419','es'],cv:['pt-PT'],cy:['en','el','tr'],cz:['cs'],de:['de','en','fr'],dj:['fr','ar','so'],dk:['da'],dm:['en'],'do':['es-419','es'],dz:['fr','ar'],ec:['es-419','es'],ee:['et','ru'],eg:['ar','en'],es:['es','ca','en','eu','gl'],et:['am','en','so'],fi:['fi','sv'],fj:['en'],fr:['fr'],ga:['fr'],ge:['ka','en'],gg:['en','fr'],gh:['en'],gi:['en','es','it','pt-PT'],gl:['da',
'en'],gm:['en','wo'],gr:['el'],gt:['es-419','es'],gy:['en'],hk:['zh-TW','en','zh-CN','zh-HK'],hn:['es-419','es'],hr:['hr'],ht:['fr','en','ht'],hu:['hu'],id:['id','en','nl'],ie:['en-GB','ga'],il:['iw','ar','en'],im:['en'],'in':'en bn gu hi kn ml mr ne or pa ta te'.split(' '),iq:['ar','en'],is:['is','en'],it:['it','en'],je:['en','fr'],jm:['en'],jo:['ar','en'],jp:['ja'],ke:['sw','en'],kg:['ky','ru'],kh:['km','en'],ki:['en'],kr:['ko'],kw:['ar','en'],kz:['kk','ru'],la:['lo','en'],lb:['ar','en','fr','hy'],
lk:['en','si','ta'],ls:['st','en','zu'],lt:['lt'],lu:['de','fr'],lv:['lv','lt','ru'],ly:['ar','en','it'],ma:['fr','ar'],md:['ro','ro-MD','ru'],me:['sr-ME','bs','sr'],mg:['mg','fr'],mk:['mk'],ml:['fr'],mm:['my','en'],mn:['mn'],mt:['mt','en'],mu:['en','fr'],mv:['en'],mw:['ny','en'],mx:['es-419','es'],my:['en','ms'],mz:['pt-PT','ny','sn','sw'],na:['en','af','de'],ne:['fr'],ng:['en'],ni:['es-419','en','es'],nl:['nl','en'],no:['no','nn'],np:['ne','en'],nr:['en'],nu:['en'],nz:['en-GB'],om:['ar','en'],pa:['es-419',
'en','es'],pe:['es-419','es'],pg:['en'],ph:['en'],pk:['en','pa','ur'],pl:['pl'],pn:['en'],pr:['es-419','en','es'],ps:['ar','en'],pt:['pt-PT'],py:['es-419','es'],qa:['ar','en'],ro:['ro','de','hu'],rs:['sr','sr-Latn'],ru:['ru'],rw:['en','fr','sw'],sa:['ar','en'],sb:['en'],sc:['crs','en','fr'],se:['sv'],sg:['en','ms','ta','zh-CN'],si:['sl'],sk:['sk','hu'],sl:['en'],sm:['it'],sn:['fr','wo'],so:['so','ar','en'],sr:['nl','en'],st:['pt-PT'],sv:['es-419','es'],td:['fr','ar'],tg:['fr'],th:['th','en'],tj:['tg',
'ru'],tl:['pt-PT','en','id'],tm:['tk','ru','uz'],tn:['ar','fr'],to:['en'],tr:['tr'],tt:'en es es-419 fr hi zh-TW'.split(' '),tw:['zh-TW','en'],tz:['sw','en'],ua:['uk','ru'],ug:['en'],uk:['en-GB'],us:['en','es','es-419','zh-CN'],uy:['es-419','es'],uz:['uz','ru'],vc:['en'],ve:['es-419','es'],vi:['en'],vn:['vi','en','fr','zh-TW'],vu:['en','fr'],ws:['en'],za:['en','af','st','tn','zu'],zm:['en','ny','sn'],zw:['en','ny','sn','tn','zu']};
var tq = function() {
  this.g = this.i = null
};
tq.prototype.load = function(a, b, c, d) {
  var e = this;
  a = uq(this, a, b, c);
  if (null == a) return Promise.resolve();
  var f = d + 'messages.' + a + '.nocache.json', g = new hi;
  g.Ka = 'text';
  return new Promise(function(h, k) {
    Kh(g, 'success', function() {
      try {
        var l = g.g ? g.g.responseText : ''
      } catch (r) {
        l = ''
      }
      e.i = JSON.parse(l.substring(5));
      h()
    });
    Kh(g, 'error', k);
    li(g, f)
  })
};
var vq = function(a, b) {
  if (null == a.i) throw Error('B');
  a = void 0 === a.i[b] ? '' : a.i[b];
  for (var c = b = 0, d = !1, e = a.split(ub), f = 0; f < e.length; f++) {
    var g = e[f];
    sb.test(g)     ? (b++, c++) :
        tb.test(g) ? d = !0 :
        rb.test(g) ? c++ :
                     vb.test(g) && (d = !0)
  }
  b = 0 == c ? d ? 1 : 0 : .4 < b / c ? -1 : 1;
  return 1 == b ? '\u202a' + a + '\u202c' :
      -1 == b   ? '\u202b' + a + '\u202c' :
                  a
}, uq = function(a, b, c, d) {
  var e = b + '-' + c;
  if (d.includes(e)) return a.g = b, e;
  if (b && d.includes(b)) return a.g = b;
  if (c && sq[c])
    for (b = n(sq[c]), c = b.next(); !c.done; c = b.next())
      if (c = c.value, d.includes(c)) return a.g = c, a.g;
  return d.includes('en') ? (a.g = 'en', a.g) : a.g = null
};
Ja(tq);
var zq = function(a) {
  var b = void 0 === b ? !0 : b;
  var c, d, e, f;
  return Ba(function(g) {
    switch (g.g) {
      case 1:
        return c = 'string' === typeof a ? a : a.value, ta(g, wq(c), 2);
      case 2:
        var h;
        if (!(h = g.j))
          if (document.execCommand) {
            'string' === typeof a ?
                (xq ||
                     (xq = document.createElement('input'), xq.readOnly = !0,
                      Pc(xq, 'position', 'absolute', 'opacity', 0, 'left', 0,
                         'top', 0, 'pointerEvents', 'none'),
                      document.body.appendChild(xq)),
                 xq.value = a, h = xq) :
                h = a;
            h !== document.activeElement && h.focus();
            var k = h.contentEditable, l = h.readOnly;
            h.contentEditable = !0;
            h.readOnly = !1;
            var r = document.createRange();
            r.selectNodeContents(h);
            var w = window.getSelection();
            w.removeAllRanges();
            w.addRange(r);
            try {
              h.select(), h.setSelectionRange(0, h.value.length)
            } catch (z) {
            }
            h.contentEditable = k;
            h.readOnly = l;
            try {
              var B = document.execCommand('copy')
            } catch (z) {
              B = !1
            }
            window.getSelection().removeAllRanges();
            h.blur();
            xq && xq.remove();
            h = B
          } else
            h = !1;
        if (d = h) {
          g.g = 3;
          break
        }
        if (!(e = b)) {
          g.g = 4;
          break
        }
        return ta(g, yq(), 5);
      case 5:
        e = g.j;
      case 4:
        if (!(f = e)) {
          g.g = 6;
          break
        }
        return ta(g, wq(c), 7);
      case 7:
        f = g.j;
      case 6:
        d = f;
      case 3:
        return d ? g.return(Promise.resolve()) : g.return(Promise.reject())
    }
  })
}, wq = function(a) {
  return Ba(function(b) {
    return navigator.clipboard && navigator.clipboard.writeText ?
        b.return(navigator.clipboard.writeText(a).then(
            function() {
              return !0
            },
            function() {
              return !1
            })) :
        b.return(!1)
  })
}, Aq = function(a) {
  return Ba(function(b) {
    switch (a.state) {
      case 'granted':
        return b.return(!0);
      case 'denied':
        return b.return(!1)
    }
    return b.return(new Promise(function(c) {
      a.onchange = function() {
        return c(Aq(a))
      }
    }))
  })
}, yq = function() {
  var a;
  return Ba(function(b) {
    if (1 == b.g) {
      if (!navigator.permissions || !navigator.permissions.query)
        return b.return(!1);
      a = Aq;
      return ta(b, navigator.permissions.query({name: 'clipboard-write'}), 2)
    }
    return b.return(a(b.j))
  })
}, xq = null;
var Bq = function() {
  return Oc() ? '1' != Cc.g.get('scta') : !Mc()
}, Cq = function() {
  if (Oc()) throw '';
  return Jc || Mc()
}, Dq = function() {
  if (Oc()) throw '';
  return Nc() || Kc || Ic && !Dc
}, Eq = function() {
  return Oc() ? '1' == Cc.g.get('ccta') : Nc() && !Mc() || Kc && Ic && !Jc
};
var Fq = [5, 6, 7, 8, 9, 11, 12, 16], Gq = 0, Hq = 0, Iq = !1, Jq = {}, Kq = [],
    Lq = function(a) {
      var b = Date.now();
      Jq.dt = b - Hq;
      Hq = b;
      0 == a && (Gq = b);
      Jq.e = a;
      Jq.t = 0 == Gq ? -1 : Math.floor(b - Gq);
      Jq.m = Ic ? 1 : 0;
      b = ei();
      Jq.w = b.width > b.height ? 1 : 0;
      b = [];
      for (var c in Jq) Jq.hasOwnProperty(c) && b.push(c + ':' + Jq[c]);
      for (kd(b.join(','), 10 == a, 0 <= Fq.indexOf(a)); 0 < Kq.length;)
        delete Jq[Kq.pop()];
      Iq || 0 != a || Eq() || (Iq = !0, Lq(10))
    };
var Mq = function(a) {
  qh.call(this);
  this.j = a;
  this.g = {}
};
Ra(Mq, qh);
var Nq = [], Oq = function(a, b, c, d, e) {
  Array.isArray(c) || (c && (Nq[0] = c.toString()), c = Nq);
  for (var f = 0; f < c.length; f++) {
    var g = Ih(b, c[f], d || a.handleEvent, e || !1, a.j || a);
    if (!g) break;
    a.g[g.key] = g
  }
}, Pq = function(a) {
  nb(a.g, function(b, c) {
    this.g.hasOwnProperty(c) && Rh(b)
  }, a);
  a.g = {}
};
Mq.prototype.i = function() {
  Mq.Wb.i.call(this);
  Pq(this)
};
Mq.prototype.handleEvent = function() {
  throw Error('C');
};
var Qq = function(a) {
  return 0 == a.indexOf('//') ? 'https:' + a : a
}, Rq = function(a, b) {
  var c = new oc, d;
  for (d in b) c.add(d, b[d]);
  a = new ic(a);
  lc(a, c);
  return a.toString()
}, Sq = function() {
  var a = ad('copy_link');
  Ba(function(b) {
    if (bd()) return b.return(Promise.reject());
    Lq(16);
    return b.return(zq(a))
  })
};
var Tq = tq.wa();
function Uq(a) {
  return vq(Tq, 'Share Message').replace(/\[.*\]/, '' + a)
}
function Vq() {
  var a = ad('facebook_link');
  bd() ||
      (a = Qq(a),
       a =
           Rq('https://www.facebook.com/dialog/share',
              {app_id: '738026486351791', href: a, hashtag: '#GoogleDoodle'}),
       Vb(a), Lq(5))
};
var mn = [
  {ya: Rd, x: 350, y: 134}, {ya: Sd, x: 350, y: 134}, {ya: Td, x: 528, y: 224},
  {ya: Ud, x: 528, y: 224}, {ya: Vd, x: 431, y: 134}, {ya: Wd, x: 431, y: 134},
  {ya: Xd, x: 568, y: 324}, {ya: Zd, x: 511, y: 134}, {ya: $d, x: 511, y: 134},
  {ya: Ff, x: 474, y: 224}, {ya: Gf, x: 474, y: 224}, {ya: Hf, x: 366, y: 224},
  {ya: If, x: 366, y: 224}, {ya: Jf, x: 467, y: 244},
  {ya: [24, 0, 0, 207, 45], x: 467, y: 244}, {ya: Kf, x: 420, y: 224},
  {ya: Lf, x: 420, y: 224}, {ya: Nf, x: 0, y: 0}
];
var Wq = Ui(), Xq = tq.wa(), Yq = function(a, b, c) {
  this.Ga = !1;
  var d = this;
  this.s = this.H = !1;
  this.j = 0;
  this.v = this.o = null;
  this.Ka = b;
  this.V = c;
  c = b ? -40 : 0;
  this.Wa = nn(a, Rd, Sd, function() {
    d.H = !0
  }, vq(Xq, 'Replay'));
  this.Ra = nn(a, Vd, Wd, function() {
    d.s = !0
  }, vq(Xq, 'New Game'), c);
  this.nb = nn(a, Zd, $d, Xc, vq(Xq, 'Search'), c);
  this.S = nn(a, Td, Ud, function() {
    Sq();
    var e = new qq(vq(Xq, 'Share2'));
    e.Yb = 82;
    mg(e);
    og(e, 48);
    v(d.S, e)
  }, vq(Xq, 'Share1'));
  this.Ma = nn(a, Kf, Lf, function() {
    var e = ad('twitter_link'), f = Uq(d.j);
    bd() ||
        (e = Qq(e), e = 'text=' + encodeURIComponent(f + '\n' + e),
         Vb('http://twitter.com/intent/tweet?' + e), Lq(6))
  }, vq(Xq, 'Share Twitter'));
  this.Aa = nn(a, Hf, If, Vq, vq(Xq, 'Share Facebook'));
  this.va = nn(a, Ff, Gf, function() {
    var e = ad('email_link'), f = Uq(d.j);
    if (!bd()) {
      Lq(8);
      var g = window.top.location, h = void 0;
      h = void 0 === h ? cd : h;
      e = Qq(e);
      f = Rq('mailto:', {subject: h, body: f + '\n' + e});
      g.href = f
    }
  }, vq(Xq, 'Email'));
  this.Ia = on(a, Jf, Jf, function() {
    var e = $c(), f = Uq(d.j);
    bd() ||
        (Lq(9), e = Qq(e),
         window.location = 'http://www.google.com/doodles/_SHARE?description=' +
             encodeURIComponent(f) + '&url=' + encodeURIComponent(e))
  }, vq(Xq, 'Share1'));
  this.$ = on(a, Xd, Yd, function() {
    Wc(dg)
  }, vq(Xq, 'Play old game'), 0);
  this.g = [this.Ra, this.nb, this.$];
  b || this.g.push(this.Wa);
  Gc && !Kc ? this.g.push(this.Ia) :
              this.g = this.g.concat([this.S, this.Ma, this.Aa, this.va]);
  this.i = new u;
  this.i.W = 461;
  a = new M(b ? Nf : Ve);
  b = new M(Oe);
  b.setScale(.67);
  y(b, 148, -5);
  v(a, b);
  y(a, 320, 180);
  v(this.i, a);
  this.buttons = new u;
  v(this.i, this.buttons);
  this.buttons.setScale(.9);
  y(this.buttons, 46, 45);
  db(this.g, function(e) {
    v(d.buttons, e)
  });
  this.ha =
      new yp('0', 466, 143, '\'Itim\', sans-serif', 40, 'white', 'center');
  v(this.i, this.ha);
  Wq.addListener(this)
};
p(Yq, bp);
Yq.prototype.Ua = function() {
  this.s = this.H = !1;
  this.o ||
      (this.o = new rq(
           this.V, vq(Xq, 'Happy Halloween'), 466, 78, 'white', 'center',
           '\'Itim\', sans-serif', 36, 20, 236, 1, !1),
       v(this.i, this.o));
  this.v ||
      (this.v = new rq(
           this.V, vq(Xq, 'Play old game'), -34, 0, 'white', 'center',
           '\'Itim\', sans-serif', 24, 10, 65, 1, !1),
       v(this.$, this.v));
  v(Yo().g, this.i);
  db(this.g, function(a) {
    rn(a)
  });
  this.Ka || (Z.yb.stop(), T.Fd.play(0, !0))
};
Yq.prototype.Va = function() {
  x(this.i);
  T.rd.stop();
  T.Fd.stop();
  db(this.g, function(a) {
    np(a.o, a.g);
    a.j.title = ''
  })
};
Yq.prototype.update = function() {
  return this.H ? (U(Wq, 14), Z.state) : this.s ? (U(Wq, 15), 13) : 0
};
Yq.prototype.Pa = function(a, b) {
  2 == a && (this.j = b, this.ha.text = '' + this.j)
};
var Zq = td.wa(), $q = function() {
  this.i = this.j = this.o = 0;
  this.H = .8 * Math.random();
  this.S = .5 * Math.random() + .9;
  this.g = Math.random() + 2;
  this.v = -.2;
  this.s = 2 * Math.random() * Math.PI
}, ar = function(a, b, c) {
  a.j = b;
  a.i = c;
  a.H = .8 * Math.random();
  a.S = .5 * Math.random() + .9;
  a.g = Math.random() + 2;
  a.v = -.2;
  a.s = 2 * Math.random() * Math.PI
};
$q.prototype.update = function(a, b, c) {
  this.V = b;
  this.ka = c;
  this.o = a;
  this.j += Math.cos(this.s) * this.S;
  this.i += Math.sin(this.s) * this.S;
  this.i += this.v;
  this.g -= .05;
  this.v += .04;
  2 >= this.g && ar(this, this.V, this.ka)
};
$q.prototype.Ca = function(a) {
  a.save();
  a.globalAlpha = .2 * Math.sin(this.g) * this.g;
  var b = this.o * (.5 - 2 * this.H + .2 * this.o);
  Zq.Ca(Ze, a, this.j - 4, this.i - 4, .1 * b, !0);
  a.globalAlpha = .5 * this.g + .2 * this.o;
  b = Math.sin(this.j) + .15 * this.H + .2 * this.o;
  Zq.Ca(Bf, a, this.j - 4, this.i - 4, .3 * b, !0);
  a.restore()
};
var br = function() {};
p(br, en);
br.prototype.j = function() {
  return !1
};
br.prototype.Ca = function() {};
var dr = function(a) {
  var b = this;
  this.o = a;
  this.i = [];
  this.g = null;
  this.s = this.v = 0;
  this.$ = this.H = !1;
  this.S = [];
  this.V = this.ha = 1;
  this.va = [this.o];
  this.ka = !1;
  Ih(window, 'resize', function() {
    cr(b)
  });
  cr(this)
}, cr = function(a, b) {
  void 0 !== b && (a.ka = b);
  a.ha = a.o.width / a.o.clientWidth;
  a.V = a.o.height / a.o.clientHeight
}, qn = function(a, b) {
  for (var c = null, d = 0; d < a.i.length; d++) a.i[d].i === b && (c = a.i[d]);
  c && (hb(a.i, c), a.i.unshift(c))
};
dr.prototype.handleEvent = function(a) {
  var b = a.j;
  var c = void 0;
  b = (b = b || window.event) ?
      (c = c || b.targetTouches && b.targetTouches[0] ||
           b.changedTouches && b.changedTouches[0]) &&
              void 0 !== c.pageX ?
      [c.pageX, c.pageY] :
          void 0 !== b.clientX ?
      [
        b.clientX +
            ('rtl' == document.dir ? -1 : 1) *
                (document.body.scrollLeft ||
                 document.documentElement.scrollLeft || 0),
        b.clientY +
            (document.body.scrollTop || document.documentElement.scrollTop || 0)
      ] :
          void 0 !== b.pageX ? [b.pageX, b.pageY] :
                               [0, 0] :
      [0, 0];
  c = this.o;
  var d = 0, e = 0;
  if (c) {
    do d += c.offsetLeft, e += c.offsetTop;
    while (c = c.offsetParent) }
  c = [d, e];
  b = [b[0] - c[0], b[1] - c[1]];
  this.ka && (c = b[0], b[0] = b[1], b[1] = 0 - c);
  b[0] *= this.ha;
  b[1] *= this.V;
  c = b[1];
  this.v = b[0];
  this.s = c;
  a = a.type;
  this.$ && 0 == a.indexOf('mouse') ||
      (b = {
        touchstart: 'mousedown',
        touchend: 'mouseup',
        touchmove: 'mousemove'
      },
       a in b && (this.$ = !0, a = b[a]), er(this, a, this.v, this.s))
};
var er = function(a, b, c, d) {
  if (!a.H && 'mousedown' == b) {
    a.H = !0;
    for (var e = 0; e < a.S.length; e++) a.S[e]()
  }
  if ('mousedown' == b) {
    if (!a.j)
      for (b = 0; b < a.i.length; b++)
        if (e = a.i[b], e.i.j(c, d)) {
          a.j = e;
          e.g('mousedown', c, d);
          break
        }
  } else if ('mouseup' == b)
    a.j ? (a.j.g('mouseup', c, d), a.j = null) : a.g && a.g.g('mouseup', c, d);
  else if ('mousemove' == b || 'areamove' == b) {
    e = null;
    for (var f = 0; f < a.i.length; f++) {
      var g = a.i[f];
      if (g.i.j(c, d)) {
        e = g;
        break
      }
    }
    a.g != e &&
        (a.g && a.g.g('mouseout', c, d), e && e.g('mouseover', c, d), a.g = e);
    if ('mousemove' == b)
      for (a.j && a.j.g('mousemove', c, d), b = 0; b < a.i.length; b++)
        e = a.i[b], e != a.j && e.i.j(c, d) && e.g('mousemove', c, d)
  } else
    'mouseout' == b ? (a.g && a.g.g('mouseout', c, d), a.j = null, a.g = null) :
                      'contextmenu' == b && a.g && a.g.g('contextmenu', c, d);
  fr(a)
}, fr = function(a) {
  for (var b = a.g && a.g.i.s() ? 'pointer' : 'default', c = 0, d; d = a.va[c];
       c++)
    Pc(d, 'cursor', b)
}, gr = function(a, b) {
  this.i = a;
  this.g = b
}, hr = function() {
  var a = new br;
  a.j = function() {
    return !0
  };
  a.s = function() {
    return !1
  };
  return a
}();
var ir = Ui(), lr = function(a) {
  u.call(this);
  this.g = [];
  this.nb = [];
  this.Wa = [];
  this.Ka = 0;
  this.j = new Set;
  this.rb = 0;
  this.Ea = [];
  this.Ra = !1;
  this.S = this.H = this.Ia = this.Aa = this.va = this.$ = 0;
  this.V = !1;
  this.Ma = 0;
  this.i = new t(0, 0);
  this.v = new t(0, 0);
  this.ka = new t(0, 0);
  this.ha = new t(0, 0);
  this.s = new t(0, 0);
  this.o = new t(0, 0);
  jr(this);
  this.Lb = a;
  if (kr)
    for (a = 0; 100 > a; a++) this.Ea.push(new $q)
};
p(lr, u);
var pq = function(a) {
  a.Ra || (pn(a.Lb, hr, function(b, c, d) {
             a.handleEvent(b, c / 3, d / 3)
           }), a.Ra = !0)
}, nq = function(a) {
  a.Ra && (np(a.Lb, hr), a.Ra = !1, a.V = !1, jr(a))
}, mr = function(a, b) {
  a.j = b
}, jr = function(a) {
  a.g = [];
  a.Wa = [];
  a.Ka = 0;
  a.i.x = 640;
  a.i.y = 360;
  a.v.x = 0;
  a.v.y = 0;
  a.ha.y = 360;
  a.ka.y = 0;
  a.$ = 0;
  a.va = 0;
  a.Aa = 0;
  a.Ia = 0;
  a.H = 0;
  a.S = 0
}, nr = function(a) {
  if (3 > a.Ka || 3 > a.g.length) return null;
  var b = Bk(a.v, a.i), c = zk(b), d = a.i.y, e = a.v.y, f = a.i.x, g = a.s,
      h = a.o, k = b.x / 2, l = b.y / 2, r = b.y / 3, w = Xb(c / 320, 1),
      B = 15 < a.Ka / ((k + l) / 2);
  if (a.j.has(2) && 3 < b.x / b.y && 1 >= a.va) return {ab: 2, confidence: w};
  if (a.j.has(0) && 3 > a.va &&
      (3 < b.y / b.x && 2 > a.$ || 5 < b.y / b.x && 4 > a.$))
    return {ab: 0, confidence: w};
  var z = [[0], [0, 0], [0, 0, 0]], C = [[0], [0, 0], [0, 0, 0]];
  if (0 < b.y)
    for (var W = 0, fa = a.g.length; W < fa - 1; W++) {
      for (var ca = a.g[W], Ta = a.Wa[W], za = (ca[1] - d) / b.y, Xa = 0;
           Xa < z.length; Xa++)
        z[Xa][Math.floor(Xb(za * (Xa + 1), Xa))] += Ta;
      ca = (ca[0] - f) / b.x;
      for (za = 0; za < z.length; za++)
        C[za][Math.floor(Xb(ca * (za + 1), za))] += Ta
    }
  if (zk(Bk(a.o, a.s)) < c / 4.5 && !B)
    return h = w, g = (C[2][1] / C[2][0] + C[2][1] / C[2][2]) / 2,
           z = z[2][0] / z[2][2],
           a.j.has(9) && 1 < g && 1.5 > z && .6 < z ? {ab: 9, confidence: h} :
               a.j.has(4) && 1.2 < z                ? {ab: 4, confidence: h} :
               a.j.has(7) && .75 > z                ? {ab: 7, confidence: h} :
               a.j.has(5)                           ? {ab: 5, confidence: h} :
                                                      null;
  if (a.j.has(8) &&
      (C = new t(a.i.x + k, a.i.y + l),
       C = Math.sqrt(Math.pow(a.s.x - C.x, 2) + Math.pow(a.s.y - C.y, 2)) <
               Math.sqrt(Math.pow(a.o.x - C.x, 2) + Math.pow(a.o.y - C.y, 2)) ?
           a.s :
           a.o,
       C = .08 < Math.min(a.v.x - C.x, a.v.y - C.y, C.x - a.i.x, C.y - a.i.y) /
                   c ?
           {ab: 8, confidence: w} :
           null))
    return C;
  if (a.j.has(6) &&
      (3 === a.$ ||
       z[2][1] > .4 * z[0][0] &&
           (g.y < d + r && h.y > e - r || h.y < d + r && g.y > e - r)))
    return {ab: 6, confidence: w};
  z = c / 6;
  e = ag(a.ha, g);
  w = $f(e);
  d = ag(h, a.ha);
  c = $f(d);
  if (w > z && c > z &&
      (e = Yb(e.x, e.y), d = Yb(d.x, d.y),
       270 < e && 90 > d || 180 < e && 270 > e && 90 < d && 180 > d)) {
    w = Xb(1 - Math.abs(w - Math.min(w, c)) / w, 1);
    if (a.j.has(10) && 2 < a.va) return {ab: 10, confidence: w};
    if (a.j.has(1)) return {
        ab: 1, confidence: w
      }
  }
  w = ag(a.ka, g);
  g = $f(w);
  c = ag(h, a.ka);
  h = $f(c);
  return a.j.has(3) && g > z && h > z &&
          (a = Yb(w.x, w.y), z = Yb(c.x, c.y),
           90 > a && 270 < z || 90 < a && 180 > a && 180 < z && 270 > z) ?
      (w = Xb(1 - Math.abs(g - Math.min(g, h)) / g, 1),
       {ab: 3, confidence: w}) :
      null
};
lr.prototype.Ca = function(a) {
  a.save();
  var b = Date.now() - this.rb, c = !this.V && 500 > b;
  if (this.V || c)
    if (c && (a.globalAlpha = 1 - b / 500), this.s && this.g.length) {
      (c = nr(this)) ? (b = cj.get(c.ab).Ze, c = c.confidence, c = Xb(c, 1),
                        b = 'rgb(' +
                            [
                              Math.round(Yi[0] + c * (b[0] - Yi[0])),
                              Math.round(Yi[1] + c * (b[1] - Yi[1])),
                              Math.round(Yi[2] + c * (b[2] - Yi[2]))
                            ].join() +
                            ')') :
                       b = 'white';
      a.strokeStyle = b;
      a.lineWidth = 10;
      a.lineCap = 'round';
      a.beginPath();
      a.moveTo(this.s.x, this.s.y);
      b = this.g.length;
      for (c = 0; c < b - 2; c++)
        a.quadraticCurveTo(
            this.g[c][0], this.g[c][1], (this.g[c][0] + this.g[c + 1][0]) / 2,
            (this.g[c][1] + this.g[c + 1][1]) / 2);
      1 < b &&
          a.quadraticCurveTo(
              this.g[b - 2][0], this.g[b - 2][1], this.g[b - 1][0],
              this.g[b - 1][1]);
      a.stroke();
      b = this.g.length;
      if (0 < b &&
          (a.beginPath(),
           a.arc(this.g[b - 1][0], this.g[b - 1][1], 10, 0, 2 * Math.PI),
           a.fillStyle = 'white', a.fill(), kr))
        for (a.globalCompositeOperation = 'lighter', c = b - 1,
            b = this.o.x - (0 < c ? this.g[c - 1][0] : 0),
            c = this.o.y - (0 < c ? this.g[c - 1][1] : 0),
            b = Math.sqrt(b * b + c * c), b = Math.min(b, 1.5), c = 0;
             c < this.Ea.length; c++)
          this.V && this.Ea[c].Ca(a), this.Ea[c].update(b, this.o.x, this.o.y)
    }
  a.restore()
};
var or = function(a, b, c) {
  a.V &&
      (a.V = !1, a.o = new t(b, c), a.rb = Date.now(),
       (b = nr(a)) ? (a.Ma = b.ab, U(ir, 4, a.Ma)) : U(ir, 8))
};
lr.prototype.handleEvent = function(a, b, c) {
  switch (a) {
    case 'mousemove':
      if (8 > b || 8 > c || 632 < b || 352 < c)
        or(this, b, c);
      else if (this.V) {
        this.g.push([b, c]);
        this.nb.push(new t(b, c));
        a = this.g.length - 1;
        if (0 < a) {
          a = this.g[a - 1];
          var d = a[1] - c, e = Math.abs(d);
          0 === this.Ia && 3.75 < e ?
              (this.va++, this.Ia = d / e) :
              0 > d * this.Ia ?
              (this.S += e,
               15 < this.S && (this.va++, this.S = 0, this.Ia = d / e)) :
              0 < d * this.Ia && (this.S -= e, -7.5 > this.S && (this.S = 0));
          d = a[0] - b;
          e = Math.abs(d);
          0 === this.Aa && 3.75 < e ?
              (this.$++, this.Aa = d / e) :
              0 > d * this.Aa ?
              (this.H += e,
               15 < this.H && (this.$++, this.H = 0, this.Aa = d / e)) :
              0 < d * this.Aa && (this.H -= e, -7.5 > this.H && (this.H = 0));
          a = Math.sqrt(Math.pow(b - a[0], 2) + Math.pow(c - a[1], 2));
          this.Wa.push(a);
          this.Ka += a
        }
        this.i.x = Math.min(this.i.x, b);
        this.i.y = Math.min(this.i.y, c);
        this.v.x = Math.max(this.v.x, b);
        this.v.y = Math.max(this.v.y, c);
        c > this.ka.y && (this.ka.x = b, this.ka.y = c);
        c < this.ha.y && (this.ha.x = b, this.ha.y = c);
        this.o = new t(b, c);
        U(ir, 9)
      }
      break;
    case 'mousedown':
      jr(this);
      for (a = 0; a < this.Ea.length; a++) ar(this.Ea[a], b, c);
      this.g = [];
      this.nb = [];
      this.V = !0;
      this.s = new t(b, c);
      U(ir, 7);
      break;
    case 'mouseup':
      or(this, b, c);
      break;
    case 'mouseout':
      or(this, b, c)
  }
};
var kr = !Ic;
var pr = Yo(), qr = tq.wa(), rr = function(a, b) {
  this.Ga = !1;
  this.o = 0;
  this.g = [];
  this.S = this.H = null;
  this.i = a;
  this.s = 0;
  td.wa();
  a = We[3];
  this.V = new t(-a / 2, 40);
  this.ha = new t(a / 2, 40);
  this.$ = new t(-a / 2, 120);
  this.va = new t(a / 2, 120);
  this.v = b;
  this.j = new u;
  this.j.W = 461
};
p(rr, bp);
rr.prototype.Ua = function() {
  this.g[0] = new M(We);
  y(this.g[0], this.V);
  v(this.g[0],
    new rq(
        this.v, vq(qr, 'Ready'), -90, 3, 'black', 'left',
        '\'Itim\', sans-serif', 53, 20, 260, 1, !1));
  this.g[1] = new M(Xe);
  y(this.g[1], this.$);
  v(this.g[1],
    new rq(
        this.v, vq(qr, 'Set'), -90, 3, 'black', 'left', '\'Itim\', sans-serif',
        53, 20, 260, 1, !1));
  this.H = new rq(
      this.v, vq(qr, 'Draw'), 320, 80, 'white', 'center',
      '\'Itim\', sans-serif', 53, 26.5, 640, 1, !0);
  y(this.H, 320, 80);
  this.S = new rq(
      this.v, vq(qr, Z.title), 320, 105, 'white', 'center',
      '\'Itim\', sans-serif', 53, 26.5, 640, 2, !0);
  this.o = 0;
  v(pr.g, this.j);
  v(pr.g, this.i);
  this.i.W = 2;
  0 === Go.indexOf(Z) ? Hg(this.i, 1E3, null, Z.Ha) : y(this.i, Z.Ha);
  this.i.setScale(Z.scale);
  ok(this.i);
  Z.Kb && uk(this.i);
  this.U(0)
};
rr.prototype.Va = function() {
  ng(this.j);
  x(this.j);
  x(this.i);
  this.i.W = 0;
  var a = this.i;
  a.g && x(a.g);
  (a = Z.Xa) && x(a)
};
rr.prototype.update = function(a) {
  this.o += a;
  if (this.o >= sr.get(this.s)) {
    this.o = 0;
    if (3 == this.s) return 1;
    this.U(this.s + 1)
  }
  return 0
};
rr.prototype.U = function(a) {
  switch (a) {
    case 0:
      v(this.j, this.S);
      break;
    case 1:
      x(this.S);
      v(this.j, this.g[0]);
      Hg(this.g[0], 500, null, this.ha);
      break;
    case 2:
      v(this.j, this.g[1]);
      Hg(this.g[1], 500, null, this.va);
      break;
    case 3:
      Hg(this.g[0], 300, null, this.V);
      Hg(this.g[1], 300, null, this.$);
      v(this.j, this.H);
      break;
    default:
      throw Error('Unknown GetReadyStateState');
  }
  this.s = a
};
var sr = new Map([[0, 1400], [1, 900], [2, 900], [3, 1200]]);
var tr = Ui(), ur = Yo(), vr = tq.wa(), xr = function(a) {
  this.Ga = !1;
  this.v = new u;
  this.i = 0;
  this.o = new G;
  this.T = a;
  this.g = new M(uf);
  this.g.W = 461;
  K(this.g, new nj(this.g, .5, 4));
  for (a = 0; 5 > a; a++) {
    var b = wr[a],
        c = new yp(
            vq(vr, b.depth), b.Pb.x, b.Pb.y, '\'Itim\', sans-serif', 16,
            '#88bbff', void 0, void 0, 70);
    c.rotate(2 * Math.PI / 180);
    v(this.g, c);
    b = new yp(
        vq(vr, b.Ac), b.Zb.x, b.Zb.y, '\'Itim\', sans-serif', 18, '#88bbff',
        'right', void 0, 120);
    b.rotate(2 * Math.PI / 180);
    v(this.g, b)
  }
  this.j = new M(gf);
  y(this.j, -157, 10);
  this.j.setScale(.65);
  v(this.g, this.j);
  v(this.g, this.v);
  tr.addListener(this)
};
p(xr, bp);
xr.prototype.Ua = function() {
  var a = this;
  T.Cd.play();
  x(this.o);
  ng(this.o);
  v(ur.g, this.o);
  v(this.o, this.T);
  v(this.o, this.g);
  var b = wr[this.i].zc;
  y(b, 140, -40);
  v(this.v, b);
  b = new yp(
      vq(vr, wr[this.i].jc), 120, 60, '\'Itim\', sans-serif', 20, '#122a36',
      'center', void 0, 200);
  b.rotate(-12 * Math.PI / 180);
  var c = new yp(
      vq(vr, wr[this.i].hc), 115, 80, '\'Itim\', sans-serif', 15, '#445c5c',
      'center', void 0, 200);
  c.rotate(-12 * Math.PI / 180);
  v(this.v, b);
  v(this.v, c);
  for (b = 0; b < this.i; b++)
    c = new M(Ge), c.setScale(.85), y(c, wr[b].Ob), v(this.j, c);
  b = new M(He);
  y(b, wr[this.i].Ob);
  b.setScale(.85);
  b.opacity = 0;
  v(this.j, b);
  y(this.g, 320, -this.g.Fa());
  J(this.T, 0, function() {
    a.T.o.Ba = !1
  });
  Q(this.T, 11, 500);
  J(this.T, 0, function() {
    T.Oe.play()
  });
  J(this.T, 1E3, function() {
    T.Ne.play()
  });
  I(this.T, vk - 1E3);
  Z.yb.stop();
  T.Cd.play();
  H(this.T, new F(this.g, 700, null, new t(320, 180)));
  I(this.T, 200);
  J(this.T, 0, function() {
    T.Fe.play()
  });
  H(this.T, new Kg(b, 200, 0, 1));
  I(this.T, 200);
  J(this.T, 0, function() {
    3 === a.i ? (a.T.setScale(1), y(a.T, 314, 245)) :
                (Q(a.T, 0, 0), y(a.T, Z.Ha))
  });
  I(this.T, 3700);
  H(this.T, new F(this.g, 700, null, new t(320, 2 * this.g.Fa())));
  J(this.T, 500, function() {
    a.Ga = !0
  })
};
xr.prototype.Va = function() {
  L(this.T);
  ng(this.v);
  ng(this.j);
  x(this.g)
};
xr.prototype.Pa = function(a, b) {
  12 === a && (this.i = b)
};
var yr = new M([4, 393, 293, 280, 195]);
yr.setScale(.7);
og(yr, 30);
var zr = new M([4, 393, 491, 280, 195]);
zr.setScale(.6);
og(zr, 20);
var Ar = new M([4, 0, 683, 280, 195]);
Ar.setScale(.7);
og(Ar, 30);
var Br = new M([4, 283, 689, 280, 195]);
Br.setScale(.6);
og(Br, 15);
var wr = [
  {
    Ob: new t(5, -185),
    Pb: new t(-246, -90),
    depth: 'Depth1',
    Zb: new t(0, -100),
    Ac: 'SunlightZone',
    zc: yr,
    jc: 'Jellyfish1',
    hc: 'Jellyfish2'
  },
  {
    Ob: new t(5, -150),
    Pb: new t(-245, -65),
    depth: 'Depth2',
    Zb: new t(0, -73),
    Ac: 'TwilightZone',
    zc: zr,
    jc: 'Boops1',
    hc: 'Boops2'
  },
  {
    Ob: new t(7, -75),
    Pb: new t(-244, 0),
    depth: 'Depth3',
    Zb: new t(0, -7),
    Ac: 'MidnightZone',
    zc: Ar,
    jc: 'Squid1',
    hc: 'Squid2'
  },
  {
    Ob: new t(10, 12),
    Pb: new t(-242, 47),
    depth: 'Depth4',
    Zb: new t(0, 39),
    Ac: 'The Abyss',
    zc: Br,
    jc: 'Angler1',
    hc: 'Angler2'
  },
  {
    Ob: new t(7, 100),
    Pb: new t(-240, 137),
    depth: 'Depth5',
    Zb: new t(0, 130),
    Ac: 'The Trenches',
    zc: new M(Nd),
    jc: 'Final Boss',
    hc: 'Final Boss'
  }
];
var Cr = Ui(), Dr = Yo(), Er = function(a, b) {
  this.Ga = !1;
  this.Nd = a;
  this.We = b;
  this.Tc = new Uo('black', 640, 360);
  this.Tc.W = 461;
  Cr.addListener(this)
};
p(Er, bp);
Er.prototype.Ua = function() {
  Z = Go[this.Nd];
  Wa(Io(), Ia);
  Fr();
  oq(this.We);
  U(Cr, 12, this.Nd);
  this.Ga = !0;
  v(Dr.g, this.Tc);
  var a = Z, b = a.yb;
  a.nc && a.Rb ? (a.nc.play(), b.play(a.Rb, !0)) : b.play(0, !0);
  if (a.Ld) {
    var c = a.Rb || 0;
    Ii(b, 1E-4);
    var d = a.Ld;
    setTimeout(function() {
      Ji(b, 1, d / 1E3, c / 1E3)
    }, 1)
  }
};
Er.prototype.Pa = function(a) {
  29 !== a || Gr || (Gr = new dn, v(Dr.g, Gr))
};
Er.prototype.reset = function() {
  Hr = Ir = null
};
var Fr = function() {
  if (Ir) {
    var a = Ir, b = Z.background;
    a.S = null;
    a.i = {ya: b, duration: 0, x: 0, y: 0, z: null, children: null}
  } else
    Ir = new M(Z.background), Ir.W = -1, y(Ir, 320, 180), v(Dr.g, Ir);
  Gr && x(Gr);
  (Gr = Z.kc) && v(Dr.g, Gr);
  y(Ir, Z.backgroundPosition);
  Hr ? ng(Hr) : (Hr = new u, v(Dr.g, Hr));
  a = Z.lc;
  for (b = 0; b < a.length; b++) {
    var c = new M(a[b]);
    void 0 != a[b][0].z && (c.W = a[b][0].z);
    v(Hr, c)
  }
  a = n(Z.Tb);
  for (b = a.next(); !b.done; b = a.next())
    b = b.value, y(b.Eb, b.position), b.Eb.W = b.z, v(Hr, b.Eb);
  a = n(Z.ac);
  for (b = a.next(); !b.done; b = a.next())
    b = b.value, c = new M(b), c.W = b[0].z, v(Hr, c);
  a = Z.Vb;
  for (b = 0; b < a.length; b++) v(Hr, a[b])
};
Er.prototype.Va = function() {
  x(this.Tc)
};
var Ir = null, Hr = null, Gr = null;
var Jr = function(a) {
  M.call(this, a);
  this.W = 462;
  y(this, eg)
};
p(Jr, M);
var Kr = function(a) {
  H(a, new E(2E3, function(b) {
      a.rotate(.1 * 17 / b)
    }));
  J(a, 0, function() {
    Kr(a)
  })
};
var Lr = Yo(), Or = function(a, b) {
  this.Ga = !1;
  this.o = a;
  this.v = b || null;
  this.g = new G;
  this.j = new Uo(Mr.get(this.o), 640, 360);
  this.j.W = 461;
  v(this.g, this.j);
  this.i = new Jr(Nr.get(this.o));
  v(this.g, this.i)
};
p(Or, bp);
Or.prototype.Ua = function() {
  this.i.opacity = 0;
  var a = this.i;
  a.Qa.rotate(-a.Nc, 0, 0);
  a.Nc = 0;
  mg(a);
  this.i.rotate(-20);
  Kr(this.i);
  Pr(this);
  v(Lr.g, this.g)
};
Or.prototype.Va = function() {
  x(this.g);
  L(this.g);
  L(this.i)
};
var Pr =
        function(a) {
  Wa(a.v || Io(), function() {
    L(a.g);
    0 < a.i.opacity && H(a.g, new Kg(a.i, 200, a.i.opacity, 0));
    J(a.g, 0, function() {
      a.Ga = !0
    })
  });
  I(a.g, 500);
  H(a.g, new Kg(a.i, 200, 0, 1))
},
    Mr = new Map([[0, 'white'], [1, 'black']]),
    Nr = new Map([[0, [19, 415, 83, 80, 80]], [1, [19, 332, 83, 80, 80]]]);
var Qr = Yo(), Rr = function(a) {
  this.Ga = !1;
  this.T = a;
  this.i = new u;
  this.g = new Uo('#000', 640, 360, !0);
  this.g.W = 461;
  v(this.i, this.g)
};
p(Rr, bp);
Rr.prototype.Ua = function() {
  var a = this;
  v(this.i, this.T);
  v(Qr.g, this.i);
  y(this.g, 0, 0);
  var b = Z.Ha;
  0 === Go.indexOf(Z) && (b = eg);
  y(this.T, b.x, -this.T.Fa());
  this.T.setScale(Z.scale);
  H(this.g, new F(this.g, 1E3, null, new t(0, 390)));
  I(this.T, 200);
  tk(this.T, b, function() {
    a.Ga = !0
  })
};
Rr.prototype.Va = function() {
  L(this.T);
  L(this.g);
  x(this.i)
};
var Sr = Yo(), Tr = function(a) {
  this.Ga = !1;
  this.i = new u;
  this.g = a
};
p(Tr, bp);
Tr.prototype.Ua = function() {
  var a = this;
  v(this.i, this.g);
  v(Sr.g, this.i);
  var b = Z.Ha;
  y(this.g, b);
  this.g.setScale(Z.scale);
  tk(this.g, new t(b.x, 360 + this.g.Fa()), function() {
    a.Ga = !0
  })
};
Tr.prototype.Va = function() {
  L(this.g);
  x(this.i)
};
var Wr = function() {
  this.i = this.g = this.j = 0;
  Ui().addListener(this)
}, Xr;
Wr.prototype.reset = function() {
  this.i = this.g = this.j = 0
};
Wr.prototype.Pa = function(a, b) {
  2 == a      ? this.j = b :
      3 == a  ? this.g = b :
      12 == a ? this.i = b :
                15 == a && this.reset()
};
Wr.prototype.log = function(a, b) {
  if (!Yr.has(a)) {
    var c = Date.now(), d = this.o ? c - this.o : 0;
    this.o = c;
    c = ei();
    c = c.width > c.height;
    kd([
      'halloween20', 's:' + a, 'v:' + (void 0 !== b ? b : '_'), 'gs:' + this.j,
      'ls:' + this.g, 'l:' + this.i, 'dt:' + d,
      't:' + (void 0 !== Ic ? Ic ? '1' : '0' : '_'),
      'w:' + (void 0 !== c ? c ? '1' : '0' : '_'),
      'o:' + ('orientation' in window ? Number(window.orientation) : '_')
    ].join())
  }
};
var Yr = new Set([0, 1, 5, 10, 11, 12]);
var Zr;
Xr || (Xr = new Wr);
Zr = Xr;
var as = function(a) {
  var b;
  u.call(this);
  this.i = a;
  this.g = 2;
  this.j = 0;
  $r(this);
  this.i.get(this.g).Ua();
  a = window;
  a.mc = null !== (b = a.mc) && void 0 !== b ? b : {};
  a.mc.sf = as
};
p(as, u);
var $r = function(a) {
  void 0 !== a.g && a.i.get(a.g) && a.i.get(a.g).Va();
  a.j = 0;
  if (!Bq() || Nc() && (!Ec || Gc)) a.j = 1;
  a.g = bs[a.j]
};
as.prototype.update = function(a) {
  if (a = this.i.get(this.g).update(a)) {
    if (1 === a && this.j < bs.length - 1)
      a = bs[++this.j];
    else {
      var b = bs.indexOf(a);
      -1 !== b && (this.j = b)
    }
    this.U(a)
  }
};
as.prototype.U = function(a) {
  this.i.get(this.g).Va();
  this.g = a;
  this.i.get(this.g).Ua();
  Zr.log(a)
};
var cs =
        function(a) {
  return a.i.get(a.g)
},
    bs = [
      2,  24, 3, 26, 13, 10, 4,  9,  5,  6, 19, 11, 12, 23, 14,
      10, 5,  6, 19, 11, 12, 23, 15, 10, 5, 6,  19, 11, 12, 23,
      16, 10, 5, 6,  19, 18, 23, 17, 5,  6, 22, 8,  25
    ];
var ds = function(a) {
  u.call(this);
  this.i = this.g = 0;
  a = cj.get(a);
  this.o = a.mb;
  this.j = a.color;
  this.v = Ic ? Zi : $i;
  a = a.Jb;
  y(this, a.x, a.y)
};
p(ds, u);
ds.prototype.update = function(a) {
  this.g += a;
  this.i = Fg(Xb(this.g % 2E3 / 1E3, 1))
};
ds.prototype.Ca = function(a) {
  a.save();
  a.lineWidth = 10;
  a.lineCap = 'round';
  a.lineJoin = 'round';
  a.strokeStyle = this.j;
  var b = xg(Xi(a, this.i, this.o), 1);
  this.v(a, b.x, b.y);
  a.restore()
};
td.wa();
var es = dq.wa(), fs = Ui(), gs = Yo(),
    hs = tq.wa(), is = function(a, b, c, d, e, f) {
      this.Ga = !1;
      var g = this;
      this.$ = a;
      this.va = b;
      this.T = f;
      this.H = [];
      this.v = this.o = null;
      this.S = e;
      this.g = new G;
      this.ha = lj(c);
      this.s = this.ha.slice();
      this.j = new u;
      y(this.j, 320, 70);
      this.j.W = 465;
      v(this.g, this.j);
      this.j.Ba = !1;
      v(this.j,
        new rq(
            this.va, vq(hs, 1 < this.s.length ? 'Tutorial2' : 'Tutorial1'), 0,
            0, 'white', 'center', '\'Itim\', sans-serif', 50, 20, 400, 2, !0));
      this.i = new ds(this.s[0]);
      this.i.W = 464;
      this.i.Ba = !1;
      v(this.g, this.i);
      this.state = 0;
      this.V = bq(es, gq);
      this.V.classList.add('ddlh20-skip_');
      Ih(this.V, ['click'], function() {
        g.U(7)
      })
    };
p(is, bp);
m = is.prototype;
m.Ua = function() {
  this.s = this.ha.slice();
  fs.addListener(this);
  this.$.appendChild(this.V);
  Hg(this.T, 1E3, null, eg);
  ok(this.T);
  v(this.g, this.T);
  this.v = Sk(this.s, 550, 198, eg);
  y(this.v, 690, 180);
  this.H.push(this.v);
  v(this.g, this.v);
  this.o && (this.o.Ba = !1);
  this.i.Ba = !1;
  v(gs.g, this.g);
  this.U(1);
  pq(this.S)
};
m.Va = function() {
  this.$.removeChild(this.V);
  nq(this.S);
  L(this.g);
  L(this.T);
  fs.removeListener(this);
  for (var a = 0; a < this.H.length; a++) this.g.removeChild(this.H[a]);
  this.H = [];
  x(this.g);
  this.state = 0
};
m.update = function() {
  switch (this.state) {
    case 6:
      return 1;
    case 7:
      return 5;
    default:
      return 0
  }
};
m.Pa = function(a, b) {
  var c = this;
  switch (a) {
    case 4:
      if (b !== this.s[0]) {
        this.U(3);
        sk(this.T);
        break
      }
      qk(this.T, b);
      for (a = 0; a < this.H.length; a++) Jk(this.H[a], b);
      (b = cj.get(b).$a) ? b.play() : T.Sc.play();
      0 < this.s.length &&
          (x(this.i), this.i = new ds(this.s[0]), this.i.W = 464,
           this.i.Ba = !1, v(this.g, this.i), J(this.g, 2E3, function() {
             c.U(2)
           }));
      this.o && this.o.Ta() && K(this.g, new Kg(this.o, 200, 1, 0));
      break;
    case 5:
      H(this.g, new E(500, null, function() {
          c.U(5)
        }));
      break;
    case 8:
      if (3 === this.state || 2 === this.state) this.U(3), sk(this.T);
      break;
    case 7:
      L(this.g);
      if (3 === this.state || 2 === this.state) this.U(4), rk(this.T);
      break;
    case 9:
      this.v && mr(this.S, new Set([this.s[0]])),
          3 !== this.state && 2 !== this.state && 4 !== this.state || rk(this.T)
  }
};
m.U = function(a) {
  var b = this;
  switch (a) {
    case 1:
      js(this);
      break;
    case 2:
      ks(this);
      break;
    case 3:
      this.j.Ba = !0;
      this.i.Ba = !0;
      break;
    case 4:
      this.j.Ba = !1;
      this.i.Ba = !1;
      break;
    case 5:
      nq(this.S), this.j.Ba = !1, this.i.Ba = !1, this.j.Ba = !1,
                  J(this.T, 1E3, function() {
                    b.U(6)
                  })
  }
  this.state = a
};
var js = function(a) {
  a.v && Hg(a.v, 2E3, null, new t(490, 180), function() {
    a.U(2)
  })
}, ks = function(a) {
  ok(a.T);
  a.j.Ba = !0;
  a.o && (a.o.Ba = !0);
  H(a.g, new E(2E3, null, function() {
      a.U(3)
    }));
  a.v && (a.o = new bl(-20, -30), v(a.v, a.o))
};
var ms = function(a, b) {
  var c = this;
  this.s = a;
  this.g = ls(b);
  this.j = this.v = null;
  this.S = new Promise(function(d) {
    c.j = d
  });
  this.i = null;
  this.H = new Promise(function(d) {
    c.i = d
  });
  this.o = !1
};
ms.prototype.load = function() {
  var a = this;
  if (!this.v) {
    var b = null;
    this.v = new Promise(function(f) {
      b = f
    });
    var c = null, d = function() {
      null !== c && (clearInterval(c), c = null);
      b()
    };
    c = setInterval(function() {
      a.g.readyState === a.g.HAVE_ENOUGH_DATA && d()
    }, 32);
    var e = function() {
      a.g.removeEventListener('error', e);
      var f = 0, g = null, h = a.g.error;
      h && (f = h.code || 0, g = h.message || null);
      console.error('video loading error', f, g);
      d()
    };
    this.g.addEventListener('canplaythrough', function() {
      a.g.removeEventListener('error', e);
      d()
    });
    this.g.addEventListener('error', e);
    this.g.preload = 'auto';
    this.g.load()
  }
  return this.v
};
ms.prototype.play = function() {
  var a = this, b = function() {
    a.g.removeEventListener('timeupdate', b);
    a.s.appendChild(a.g);
    a.j()
  };
  this.g.addEventListener('timeupdate', b);
  this.g.addEventListener('ended', function() {
    a.o = !1;
    a.i()
  });
  var c = function(d) {
    var e = 0, f = null;
    if (void 0 === d) {
      if (d = a.g.error) e = d.code || 0, f = d.message || null
    } else
      f = d,
      'NotSupportedError' === f ? e = 4 : 'NotAllowedError' === f && (e = 5);
    console.error('video error', e, f);
    a.o = !1;
    a.j();
    a.i()
  };
  this.g.addEventListener('error', function(d) {
    c(d.error)
  });
  this.o = !0;
  this.g.play().catch(function(d) {
    console.error('playback failed', a.g.src);
    c(d)
  })
};
var ls = function(a) {
  var b = document.createElement('video');
  b.setAttribute('webkit-playsinline', '');
  b.setAttribute('playsinline', '');
  b.preload = 'none';
  b.muted = !0;
  b.src = a;
  return b
};
var ns = dq.wa(), qd = td.wa(), os = Yo(), ps = tq.wa(),
    qs = function(a, b, c, d) {
      c = void 0 === c ? !1 : c;
      d = void 0 === d ? !1 : d;
      this.Ga = !1;
      var e = this;
      this.g = a;
      this.S = new G;
      this.V = new G;
      this.video = new ms(a, b);
      this.video.g.classList.add('ddlh20-video_');
      d && (this.video.g.muted = !1);
      this.video.S.then(function() {
        e.g.appendChild(e.H);
        d ||
            (e.g.appendChild(e.o), e.g.appendChild(e.v), e.g.appendChild(e.j),
             e.g.appendChild(e.s), J(e.V, 5E3, function() {
               e.j.classList.add('ddlh20-unmuteFade_')
             }))
      });
      this.video.H.then(function() {
        c ? (e.i.classList.add('ddlh20-transition_'), I(e.S, 700),
             J(e.S, 0,
               function() {
                 e.Ga = !0
               })) :
            e.Ga = !0
      });
      this.i = document.createElement('div');
      this.i.classList.add('ddlh20-wipeOut_');
      this.H = bq(ns, gq);
      this.H.classList.add('ddlh20-skip_');
      Ih(this.H, ['click'], function() {
        var f = e.video;
        f.o = !1;
        f.g.pause();
        f.j();
        f.i()
      });
      this.j = document.createElement('div');
      this.j.textContent = vq(ps, 'Unmute');
      this.j.classList.add('ddlh20-unmute_');
      this.v = rd(ud);
      this.v.classList.add('ddlh20-audioButton_');
      this.o = rd(vd);
      this.o.classList.add('ddlh20-audioButton_');
      this.o.classList.add('ddlh20-hide_');
      this.s = document.createElement('div');
      this.s.classList.add('ddlh20-fullscreenClickTarget_');
      Ih(this.s, ['click'], function() {
        e.o.classList.remove('ddlh20-hide_');
        e.v.classList.add('ddlh20-hide_');
        e.j.classList.add('ddlh20-hide_');
        e.video.g.muted = !1
      })
    };
p(qs, bp);
qs.prototype.Ua = function() {
  v(os.g, this.S);
  v(os.g, this.V);
  this.i.classList.add('ddlh20-wipeOut_');
  this.g.appendChild(this.i);
  this.video.play()
};
qs.prototype.Va = function() {
  this.g.contains(this.video.g) && this.g.removeChild(this.video.g);
  this.g.contains(this.v) && this.g.removeChild(this.v);
  this.g.contains(this.o) && this.g.removeChild(this.o);
  this.g.contains(this.j) && this.g.removeChild(this.j);
  this.g.contains(this.s) && this.g.removeChild(this.s);
  this.g.removeChild(this.H);
  this.g.removeChild(this.i);
  x(this.S);
  x(this.V);
  this.i.classList.remove('ddlh20-transition_');
  this.i.classList.remove('ddlh20-wipeOut_')
};
qs.prototype.ka = function() {
  this.video.g.pause()
};
qs.prototype.Ea = function() {
  this.video.play()
};
var rs = Yo(), ss = function() {
  this.Ga = !1;
  this.g = new Uo('#000', 640, 360, !1, !0);
  this.g.W = 461
};
p(ss, bp);
ss.prototype.Ua = function() {
  var a = this;
  v(rs.g, this.g);
  y(this.g, 0, -390);
  H(this.g, new F(this.g, 1E3, null, new t(0, 0)));
  H(this.g, new E(1E3, null, function() {
      a.Ga = !0
    }))
};
ss.prototype.Va = function() {
  L(this.g);
  x(this.g)
};
var ts = Ec && navigator.userAgent.includes('OS 12_'), us = function() {
  this.ha = this.va = this.Ea = this.j = this.i = null;
  this.Aa = !1;
  this.V = null;
  this.s = this.ka = this.o = this.v = !1;
  this.g = !0;
  this.H = this.$ = !1;
  this.S = null
};
us.prototype.reset = function() {
  this.ha = this.va = this.Ea = this.j = this.i = null;
  this.Aa = !1;
  this.V = null;
  this.s = this.ka = this.o = this.v = !1;
  this.g = !0;
  this.H = this.$ = !1;
  this.S = null
};
var ws = function(a) {
  a.v &&
      (a.H ?
           (vs.call(document), a.H = !1) :
           (a.V.call(a.j),
            a.S &&
                (window.screen.lockOrientation &&
                     window.screen.lockOrientation(a.S),
                 window.screen.orientation && window.screen.orientation.lock &&
                     window.screen.orientation.lock(a.S).catch(Ia))))
}, ys = function(a, b, c, d, e) {
  var f = void 0 === f ? !0 : f;
  a.j = b;
  a.i = c;
  a.Ea = void 0 === e ? function() {} : e;
  a.s = !1;
  a.V = b[Vc(b, 'requestFullscreen')];
  b = !!(document[Vc(document, 'fullscreenEnabled')] && a.V && vs);
  if (Oc()) throw '';
  c = Ec ? !1 : Nc() && !(Gc || Hc) || Kc && Ic;
  a.v = c && b;
  a.o = f && Dq();
  a.ka = !f && Dq();
  a.g = !0;
  if (a.v || a.o)
    Pc(document.body, 'margin', '0'),
        Pc(a.j, 'overflow', 'visible', 'width', '100%', 'height', '100%'),
        document.body.scrollLeft = 0,
        d ? Oq(d, window, 'scroll', xs) : Ih(window, 'scroll', xs, !0)
}, As = function(a) {
  var b = zs;
  b.i.push(a);
  b.g = !0
}, Cs = function() {
  var a = Bs;
  return function(b) {
    'mousedown' == b && (a.H = !0)
  }
};
us.prototype.close = function() {
  this.H = !0;
  ws(this)
};
us.prototype.update = function() {
  if (this.v || this.o || this.ka) {
    var a = !!document[Ds], b = window.innerWidth, c = window.innerHeight;
    0 == window.scrollX && 0 == window.scrollY || window.scrollTo(0, 0);
    if (b != this.va || c != this.ha || a != this.Aa || this.g) {
      this.$ = b < c;
      for (var d = !1, e = 0; e < this.i.length; ++e) {
        var f = this.i[e], g = f.width || parseInt(f.dataset.width, 10),
            h = f.height || parseInt(f.dataset.height, 10);
        if (this.o) {
          if (Oc()) throw '';
          Dq() && Ic && !Jc && !Gc && 0 == e && (d = g < h != this.$);
          var k = d ? Math.min(b / h, c / g) : Math.min(b / g, c / h),
              l = k * g, r = k * h, w = this.s ? 'scale(' + k + ') ' : '';
          if (d) {
            k = (b - r) / 2 + r;
            var B = (c - l) / 2;
            w += 'rotate(90deg)'
          } else
            k = (b - l) / 2, B = (c - r) / 2;
          g = this.s ? g : l;
          h = this.s ? h : r;
          Tc(f, 'TransformOrigin', '0 0');
          Tc(f, 'Transform', w);
          Pc(f, 'position', 'absolute', 'width', g + 'px', 'height', h + 'px',
             'left', k + 'px', 'top', B + 'px')
        } else
          Ec && Pc(f, 'height', c + 'px')
      }
      ts &&
          (e = document.documentElement, f = e.getBoundingClientRect(),
           f.width == b && f.height == c ||
               Pc(e, 'width', b + 'px', 'height', c + 'px'));
      !this.ka && !Bc.includes('CriOS') && 0 < b &&
          document.body.clientWidth !== b &&
          (document.body.clientWidth < document.body.scrollWidth &&
               Pc(document.body, 'width',
                  Math.min(document.body.scrollWidth, b) + 'px'),
           document.body.clientWidth > b &&
               Pc(document.body, 'width', b + 'px'));
      Pc(this.j, 'height', '100%', 'width', '100%');
      this.Ea(d);
      this.va = b;
      this.ha = c;
      this.Aa = a;
      this.g = !1
    }
  }
};
var Es = function(a, b) {
  var c = document.createElement('div');
  c.style.pointerEvents = 'none';
  c.style.position = 'absolute';
  c.style.top = '0';
  c.style.left = '0';
  c.style.width = '100%';
  c.style.height = '100%';
  c.style.direction = 'ltr';
  c.dataset.width = a.toString();
  c.dataset.height = b.toString();
  return c
};
Ja(us);
var Ds = Vc(document, 'fullscreenElement'),
    vs = document[Vc(document, 'exitFullscreen')], xs = function(a) {
      a.preventDefault();
      a.stopPropagation();
      return !1
    };
var Js = function(a, b, c) {
  qh.call(this);
  this.va = a;
  this.Ia = b;
  this.Ka = c;
  this.$ = Qc();
  this.Ea = Vc(document, 'hidden');
  this.v = (this.ka = Vc(document, 'visibilityState')) ?
      this.ka.replace(/state$/i, 'change').toLowerCase() :
      null;
  this.s = Fs(this);
  this.j = !1;
  this.o = this.s;
  this.ha = new Mq;
  rh(this, Pa(sh, this.ha));
  Gs(this);
  Hs(this);
  Is(this)
};
p(Js, qh);
var Hs = function(a) {
  Oq(a.ha, document,
     'mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup'
         .split(' '),
     function() {
       a.$ = Qc();
       a.j = !1;
       Ks(a)
     },
     !0)
}, Gs = function(a) {
  a.v ? Ls(a) : Hc && Ms(a, function() {
                  Ls(a)
                })
}, Ls = function(a) {
  a.g = function() {
    a.s = Fs(a);
    a.s || (a.$ = Qc(), a.j = !1);
    Ks(a)
  };
  var b = window.agsa_ext;
  a.v ? document.addEventListener(a.v, a.g, !1) :
        b && b.registerPageVisibilityListener &&
          (google.doodle || (google.doodle = {}),
           google.doodle.pvc = function() {
             a.g && a.g()
           }, b.registerPageVisibilityListener('google.doodle.pvc();'))
}, Ms = function(a, b) {
  window.agsa_ext ? b() : a.Aa = setTimeout(function() {
                            Gs(a)
                          }, 100)
};
Js.prototype.i = function() {
  clearTimeout(this.S);
  clearTimeout(this.Aa);
  this.g &&
      (this.v && document.removeEventListener ?
           document.removeEventListener(this.v, this.g, !1) :
           window.agsa_ext && window.agsa_ext.registerPageVisibilityListener &&
               (this.g = null));
  qh.prototype.i.call(this)
};
var Fs = function(a) {
  if (!a.Ea && !a.ka && window.agsa_ext && window.agsa_ext.getPageVisibility)
    return 'hidden' == window.agsa_ext.getPageVisibility();
  var b = document[a.ka];
  return document[a.Ea] || 'hidden' == b
}, Ks = function(a) {
  var b = a.s || a.j;
  a.o && !b ? (a.o = !1, a.Ka(), Is(a)) : !a.o && b && (a.o = !0, a.Ia())
}, Is = function(a) {
  a.S && clearTimeout(a.S);
  var b = Math.max(100, a.va - Ns(a));
  a.S = setTimeout(function() {
    a.S = null;
    a.j = Ns(a) >= a.va;
    a.j || Is(a);
    Ks(a)
  }, b)
}, Ns = function(a) {
  return Qc() - a.$
};
var Bs = us.wa(), Us = function(a, b, c, d) {
  c = void 0 === c ? [] : c;
  d = void 0 === d ? 6E4 : d;
  qh.call(this);
  var e = this;
  this.j = b;
  this.$ = ei();
  this.o = new Mq(this);
  rh(this, Pa(sh, this.o));
  this.Ia = new Js(
      d,
      function() {
        Os();
        Fi()
      },
      function() {
        6 !== Ps.o.g && Qs();
        var f = yi;
        f.j && f.j.gain.setValueAtTime(1, f.g.currentTime);
        f.H = !1
      });
  rh(this, Pa(sh, this.Ia));
  this.g = new dr(b);
  Oq(this.o, a, ['mousedown', 'mouseout', 'touchstart'], function(f) {
    e.g.handleEvent(f)
  }, !0);
  Oq(this.o, document,
     ['mouseup', 'mousemove', 'touchend', 'touchmove', 'contextmenu'],
     function(f) {
       e.g.handleEvent(f)
     },
     !0);
  ys(Bs, a, [b].concat(c), this.o, function(f) {
    cr(e.g, f)
  });
  Rs(this, b);
  this.va = Ss;
  this.S = hq;
  this.v = .5;
  this.Aa = !0;
  this.ka = this.S[3];
  this.ha = this.va.Fa(this.S);
  this.s = 0;
  this.Ea = jn(this.s, 0, this.ka + 10, this.ha + 10);
  pn(this, this.Ea, Cs());
  Ts(this)
};
p(Us, qh);
Us.prototype.i = function() {
  Bs.reset();
  qh.prototype.i.call(this)
};
Us.prototype.update = function() {
  Bs.update();
  var a = ei();
  (document[Ds] && (this.$.width != a.width || this.$.height != a.height) ||
   this.Aa) &&
      0 < parseInt(getComputedStyle(this.j).width, 10) &&
      (this.$ = a, Ts(this), this.Aa = !1)
};
var Ts = function(a) {
  a.v = 26 / a.ka * a.j.width / parseInt(getComputedStyle(a.j).width, 10);
  a.s = a.j.width - a.v * (10 + a.ka);
  var b = a.v * (10 + a.ha);
  a.Ea.g = [a.s, 0, a.j.width, 0, a.j.width, b, a.s, b];
  a = a.g;
  er(a, 'areamove', a.v, a.s)
}, Vs = function(a, b) {
  document[Ds] && a.va.Ca(a.S, b, a.s, 10 * a.v, a.v)
}, Rs = function(a, b) {
  Oq(a.o, b, 'touchend', function() {
    ws(Bs)
  })
}, pn = function(a, b, c) {
  a.g.i.push(new gr(b, c))
}, np = function(a, b) {
  a = a.g;
  for (var c = a.i.length - 1; 0 <= c; c--) a.i[c].i === b && a.i.splice(c, 1);
  a.g && b === a.g.i && (a.g = null, fr(a));
  a.j && b === a.j.i && (a.j = null);
  er(a, 'areamove', a.v, a.s)
};
var Xs = function(a, b, c) {
  var d = Ws;
  d = void 0 === d ? Ag : d;
  c = void 0 === c ? Rc : c;
  this.i = a;
  this.v = b;
  this.s = {};
  this.duration = 400;
  this.H = d;
  this.j = c;
  this.g = null;
  this.o = !1
}, Zs = function(a) {
  var b = Math.min(Math.max(Ys(a) / a.duration, 0), 1);
  a.o && (b = 1 - b);
  for (var c in a.i)
    a.v.hasOwnProperty(c) && (a.s[c] = Bg(b, a.i[c], a.v[c], a.H));
  return a.s
};
Xs.prototype.Ga = function() {
  return Ys(this) >= this.duration
};
var Ys = function(a) {
  return null === a.g ? 0 : a.j() - a.g
};
Xs.prototype.start = function() {
  this.g = this.j();
  this.o = !1
};
Xs.prototype.reset = function() {
  this.g = null
};
var Ws = function(a) {
  return 3 * a * a - 2 * a * a * a
};
var $s = function(a, b) {
  b = void 0 === b ? function() {} : b;
  qh.call(this);
  this.j = !1;
  this.S = b;
  this.g = a;
  this.s = '1' == Cc.g.get('ntp');
  this.v = function() {
    return !1
  };
  this.o = null;
  Cq() && (this.g.style.willChange = 'width,height')
};
p($s, qh);
var mp = function(a, b) {
  b = void 0 === b ? function() {} : b;
  var c = void 0 === c ? !1 : c;
  var d = void 0 === d ? 0 : d;
  var e = void 0 === e ? !1 : e;
  if (a.g && Cq() && !a.j) {
    var f = a.g;
    if (Lc())
      at(a, b);
    else {
      document.getElementById('fkbx') && Pc(f.parentElement, 'width', '100%');
      var g = f.offsetHeight, h = f.offsetWidth;
      d = Math.min(960, f.parentElement.clientWidth) - 2 * d;
      e = e ? 540 : d / (960 / 540);
      var k = dp.wa(), l = Rc(),
          r = new Xs({height: g, width: h}, {height: e, width: d}, function() {
            return l
          });
      r.start();
      a.j = !0;
      a.v = function(w) {
        l = void 0 !== w ? l + w : Rc();
        w = Zs(r);
        gd(f, Math.round(w.width), Math.round(w.height));
        a.S();
        return r.Ga() ? (b(), a.g.style.willChange = 'unset', a.v = function() {
          return !1
        }, !1) : !0
      };
      c || gp(k, function() {
        return a.v()
      })
    }
  }
}, at = function(a, b) {
  var c, d, e;
  Ba(function(f) {
    if (1 == f.g) return ta(f, bt(a), 2);
    c = {
      cmd: 'resizeDoodle',
      width: '960px',
      height: '540px',
      duration: '400ms'
    };
    '1' == Cc.g.get('ntp') ?
        window.parent.postMessage(c, 'chrome-search://local-ntp') :
        window.top.postMessage(c, 'chrome://new-tab-page');
    a.j = !0;
    d = !1;
    e = function() {
      a.s && a.g.classList.remove('expanderHide');
      d = !0;
      b()
    };
    a.o = setTimeout(e, 500);
    window.addEventListener('message', function(g) {
      'resizeComplete' === g.data.vf &&
          (null !== a.o && (clearTimeout(a.o), a.o = null), d || e())
    });
    return f.return()
  })
}, bt = function(a) {
  if (!a.s) return Promise.resolve();
  a.g.classList.add('expanderHide');
  return new Promise(function(b) {
    setTimeout(b, 200)
  })
};
$s.prototype.i = function() {
  qh.prototype.i.call(this);
  this.reset();
  this.g = null
};
$s.prototype.reset = function() {
  this.j &&
      (Pc(this.g, 'width', '', 'height', ''), fd(0), this.g.style.width = '',
       this.g.style.height = '');
  this.j = !1
};
$s.prototype.update = function(a) {
  this.v(a)
};
var ct = function() {
  this.v = this.i = null;
  this.g = {};
  this.o = null;
  this.tc = Number.MIN_VALUE;
  this.min = Number.MAX_VALUE;
  this.j = this.s = 0
};
ct.prototype.update = function() {
  var a = self.performance ? self.performance.now() : Date.now();
  if (this.i) {
    var b = a - this.i, c = Math.round(1E3 / b);
    c > this.tc && (this.tc = c);
    c < this.min && (this.min = c);
    this.s++;
    this.j += b;
    b = Math.round(1E3 * this.s / this.j);
    this.g[a] = c;
    this.o = {
      now: c,
      yf: dt(this, 1E3, a),
      xf: dt(this, 5E3, a),
      zf: {Te: b, tc: this.tc, min: this.min}
    }
  }
  this.i = a;
  for (var d in this.g) Number(d) + 5100 < a && delete this.g[d];
  return this.o
};
var ft = function(a) {
  var b = et;
  b.v || (b.v = a)
}, dt = function(a, b, c) {
  var d = [], e = Number.MIN_VALUE, f = Number.MAX_VALUE, g;
  for (g in a.g)
    Number(g) + b >= c &&
        (a.g[g] > e && (e = a.g[g]), a.g[g] < f && (f = a.g[g]),
         d.push(a.g[g]));
  return {
    Te: Math.round(ac.apply(null, d)), tc: e, min: f
  }
};
Ja(ct);
var gt = function(a, b) {
  window.google && google.doodle &&
      (b && Qa('google.doodle.cpDestroy', b),
       Qa('google.doodle.cpInit', function() {
         b && b();
         a()
       }))
};
var yi = Oi.wa(), Ss = td.wa(), ht = dq.wa(), et = ct.wa(), it = Ui(),
    Zo = Yo(), jt = tq.wa(), zs = us.wa(), kt = function(a, b) {
      Us.call(this, a, b)
    };
p(kt, Us);
var mt = function(a, b) {
  qh.call(this);
  var c = this;
  this.$ = !0;
  this.Aa = 0;
  this.ha = !1;
  this.va = null;
  this.s = b.getContext('2d');
  var d = Oo();
  a.appendChild(d);
  ft(this.s);
  this.j = new kt(a, b);
  rh(this, Pa(sh, this.j));
  Hq = Date.now();
  Jq.d = '144867964';
  !Iq && Eq() && (Iq = !0, Lq(10));
  var e = this.j.g;
  d = this.j.o;
  it.addListener(this);
  this.ka = Es(b.width, b.height);
  a.appendChild(this.ka);
  ys(zs, a, [b, this.ka], d, function(h) {
    cr(e, h)
  });
  this.g = document.createElement('div');
  this.g.className = 'ddlh20-domRoot_';
  this.g.style.width = '640px';
  this.g.style.height = '360px';
  this.ka.appendChild(this.g);
  As(this.ka);
  lt(this);
  this.Ea = Date.now();
  Cq() && (this.va = new $s(a, function() {
             return cr(e)
           }), rh(this, Pa(sh, this.va)), Bq() || (mp(this.va, function() {
                                                     dp.wa().stop()
                                                   }), dp.wa().start()));
  b = new mk;
  var f = new lr(this.j);
  f.W = 461;
  v(Zo.g, f);
  this.v = new lq(b, f, this.g);
  b = new Map([
    [2, new lp(a, this.j, this.va)],
    [6, this.v],
    [3, new qs(this.g, '/logos/2020/halloween20/dev2/intro.mp4')],
    [5, new rr(b, this.s)],
    [7, new Yq(this.j, !1, this.s)],
    [8, new Yq(this.j, !0, this.s)],
    [4, new is(this.g, this.s, '-', d, f, b)],
    [9, new is(this.g, this.s, '|-|', d, f, b)],
    [10, new Rr(b)],
    [11, new Tr(b)],
    [12, new ss],
    [13, new Er(0, this.v)],
    [14, new Er(1, this.v)],
    [15, new Er(2, this.v)],
    [16, new Er(3, this.v)],
    [17, new Er(4, this.v)],
    [
      18,
      new qs(this.g, '/logos/2020/halloween20/dev2/shipcutscene.mp4', !1, !0)
    ],
    [19, new xr(b)],
    [22, new qs(this.g, '/logos/2020/halloween20/dev2/outro.mp4', !0, !0)],
    [23, new Or(1)],
    [24, new Or(0, [T.Jd.v, nd(Ss, 6)])],
    [25, new Or(0)],
    [26, new Or(1, eo)]
  ]);
  this.Ia = [b.get(13), b.get(14), b.get(15), b.get(16), b.get(17)];
  this.o = new as (b);
  this.S = document.createElement('div');
  this.S.classList.add('ddlh20-pauseContainer_');
  b = document.createElement('div');
  b.classList.add('ddlh20-pauseBg_');
  f = document.createElement('div');
  f.classList.add('ddlh20-pauseText_');
  var g = document.createElement('div');
  g.classList.add('ddlh20-unpauseButton_');
  this.S.appendChild(b);
  this.S.appendChild(f);
  this.S.appendChild(g);
  Ih(this.S, ['click'], function() {
    U(it, 24)
  });
  f.textContent = vq(jt, 'Paused');
  g.textContent = vq(jt, 'Resume');
  Oq(d, a, 'contextmenu', function(h) {
    h.preventDefault()
  }, !1);
  Oq(d, a, 'keydown', function(h) {
    27 === h.keyCode && 6 === c.o.g && U(it, 23)
  }, !1)
};
p(mt, qh);
mt.prototype.Pa = function(a) {
  23 === a && 6 === this.o.g ? Os() : 24 === a && 6 === this.o.g && Qs()
};
mt.prototype.i = function() {
  for (var a = 0, b; b = this.Ia[a++];) b.reset();
  $r(this.o);
  Zo.reset();
  qh.prototype.i.call(this)
};
mt.prototype.start = function() {
  !this.j.Ia.o || Hc ? (this.ha = !0, nt(this)) : Os()
};
var nt = function(a) {
  if (a.$) {
    requestAnimationFrame(function() {
      nt(a)
    });
    var b = Date.now(), c = Math.min(b - a.Ea, 50);
    a.Ea = b;
    a.o.update(c);
    ap(c, a.s);
    a.j.update();
    Vs(a.j, a.s);
    lt(a);
    zs.update()
  } else
    a.ha = !1
}, ot = function() {
  var a = document.getElementById('hplogo'), b = a.querySelector('canvas'),
      c = [], d = new Promise(function(l) {
                Ss.preload(19, function() {
                  l()
                })
              });
  Di(a);
  cl();
  var e = new Promise(function(l) {
    T.Wd.v.preload(function() {
      l()
    })
  }),
      f = new Promise(function(l) {
        T.sd.v.preload(function() {
          l()
        })
      }),
      g = new Promise(function(l) {
        T.Gd.v.preload(function() {
          l()
        })
      }),
      h = tq.wa().load(dd, ed, dl, '/logos/2020/halloween20/dev2/'),
      k = new Promise(function(l) {
        ht.preload(0, l)
      });
  c.push(d);
  c.push(e);
  c.push(f);
  c.push(g);
  c.push(h);
  c.push(k);
  Promise.all(c).then(function() {
    var l;
    Ps = new mt(a, b);
    Ps.start();
    var r = window;
    r.mc = null !== (l = r.mc) && void 0 !== l ? l : {};
    r.mc.jf = mt
  })
}, Os = function() {
  var a = Ps;
  a && a.$ &&
      (a.$ = !1, cs(a.o).ka(),
       6 === a.o.g &&
           (a.g.appendChild(a.S), a.v.ka(), a = yi, a.s || a.g.suspend(),
            a.s = !0))
}, Qs = function() {
  var a = Ps;
  a && !a.$ &&
      (a.$ = !0, a.Ea = Date.now(), a.ha || (a.ha = !0, nt(a)), cs(a.o).Ea(),
       6 === a.o.g &&
           (a.g.removeChild(a.S), a = a.v, a.v.Ba = !0, pq(a.s),
            a.H.classList.remove('ddlh20-hide_'),
            a.j.classList.add('ddlh20-hide_'), a = yi, a.s && a.g.resume(),
            a.s = !1))
}, lt = function(a) {
  var b = a.ka.offsetHeight / 360;
  a.Aa !== b &&
      (a.Aa = b,
       a.g.style.transform =
           'scale(' + b + ',' + b + ') translate3d(-50%,-50%,0)',
       cr(a.j.g))
}, Ps = null;
(function(a, b) {
gt(function() {
  a()
}, b);
a()
})(
    function() {
var a = document.getElementById('hplogo'),
    b = a ? a.querySelector('canvas') : null;
a && b &&
    (Mc() && (document.body.id = 'ntp'),
     Bq() ? ot() : Ih(b, 'click', function() {
       ot();
       if (b)
         if (xh(b))
           b.Ia('click');
         else {
           var c = Mh(b);
           if (c) {
             var d = 0, e = 'click'.toString(), f;
             for (f in c.g)
               if (!e || f == e)
                 for (var g = c.g[f].concat(), h = 0; h < g.length; ++h)
                   Rh(g[h]) && ++d
           }
         }
     }))
    },
    function() {
Fi();
for (var a = n(Ss.g), b = a.next(); !b.done; b = a.next()) b.value.v = [];
Os();
sh(Ps);
Ps = null
    });
}).call(this);
