(this.webpackJsonpeva=this.webpackJsonpeva||[]).push([[14],{1354:function(r,n){},1585:function(r,n,t){"use strict";t.r(n),function(r){t.d(n,"getED25519Key",(function(){return f}));var a=t(104),e=t(1408),c=t.n(e).a.lowlevel;function f(n){var t;t="string"===typeof n?r.from(n,"hex"):n;var e=new Uint8Array(64),f=[c.gf(),c.gf(),c.gf(),c.gf()],i=new Uint8Array([].concat(Object(a.a)(new Uint8Array(t)),Object(a.a)(new Uint8Array(32)))),o=new Uint8Array(32);c.crypto_hash(e,i,32),e[0]&=248,e[31]&=127,e[31]|=64,c.scalarbase(f,e),c.pack(o,f);for(var s=0;s<32;s+=1)i[s+32]=o[s];return{sk:r.from(i),pk:r.from(o)}}}.call(this,t(23).Buffer)}}]);
//# sourceMappingURL=14.d39b4d58.chunk.js.map