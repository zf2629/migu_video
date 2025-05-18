const playURLImport = {
  wbg: {
    __wbindgen_string_new: (t, e) => 0,
    __wbg_buffer_085ec1f694018c4f: (t) => 0,
    __wbg_call_01734de55d61e11d: () => 0,
    __wbg_call_cb65541d95d71282: () => 0,
    __wbg_crypto_1d1f22824a6a080c: (t) => 0,
    __wbg_getRandomValues_3aa56aa6edec874c: () => 0,
    __wbg_globalThis_1d39714405582d3c: () => 0,
    __wbg_global_651f05c6a0944d1c: () => 0,
    __wbg_msCrypto_eb05e62b530a1508: (t) => 0,
    __wbg_new_8125e318e6245eed: (t) => 0,
    __wbg_newnoargs_581967eacc0e2604: (t, e) => 0,
    __wbg_newwithbyteoffsetandlength_6da8e527659b86aa: (t, e, n) => 0,
    __wbg_newwithlength_e5d69174d6984cd7: (t) => 0,
    __wbg_node_104a2ff8d6ea03a2: (t) => 0,
    __wbg_process_4a72847cc503995b: (t) => 0,
    __wbg_randomFillSync_5c9c955aa56b6049: () => 0,
    __wbg_require_cca90b1a94a0255b: () => 0,
    __wbg_self_1ff1d729e9aae938: () => { },
    __wbg_set_5cf90238115182c3: (t, e, n) => 0,
    __wbg_subarray_13db269f57aa838d: (t, e, n) => 0,
    __wbg_versions_f686565e586dd935: (t) => 0,
    __wbg_window_5f4faef6c12b79ec: () => 0,
    __wbindgen_is_function: (t) => 0,
    __wbindgen_is_object: (t) => 0,
    __wbindgen_is_string: (t) => 0,
    __wbindgen_is_undefined: (t) => 0,
    __wbindgen_memory: () => 0,
    __wbindgen_object_clone_ref: (t) => 0,
    __wbindgen_object_drop_ref: (t) => { },
    __wbindgen_throw: (t, e) => { throw new Error() },
  }
}

const gatewayImport = {
  wbg: {
    __wbindgen_debug_string: (t, e) => { },
    __wbindgen_object_drop_ref: (t) => { },
    __wbindgen_string_new: (t, e) => "",
  }

}

/**
 * 初始化wasm
 * @param {string} masmURL - wasm地址
 * @param {object} objImport - 必要的导入方法
 * @returns {object} - wasm导出的内容
 */
async function init_wasm(masmURL, objImport) {
  // 获取wasm文件
  const resp = await fetch(masmURL);
  // 初始化
  const { instance } = await WebAssembly.instantiateStreaming(resp, objImport)
  return instance.exports;
}



const O = new TextEncoder("utf-8");
const _ = new TextDecoder('utf-8', { fatal: !0, ignoreBOM: !0 });
// wasm导出方法对象
const o = await init_wasm("https://cdnm.miguvideo.com/mgs/common/miguvendor/prd/playurl-crypto.wasm", playURLImport)

// 内存
var g = null;
function y() {
  return null !== g && 0 !== g.byteLength || (g = new Uint8Array(o.memory.buffer)),
    g
}

// 编码为字符
function b(t, e) {
  console.log("解码")
  return t >>>= 0,
    _.decode(y().subarray(t, t + e))
}

var k
function I(t, e, n) {
  if (void 0 === n) {
    var r = O.encode(t)
      , o = e(r.length, 1) >>> 0;
    return y().subarray(o, o + r.length).set(r),
      k = r.length,
      o
  }
  for (var i = t.length, a = e(i, 1) >>> 0, c = y(), s = 0; s < i; s++) {
    var u = t.charCodeAt(s);
    if (u > 127)
      break;
    c[a + s] = u
  }
  if (s !== i) {
    // 0 !== s && (t = p()(t).call(t, s)),
    //   a = n(a, i, i = s + 3 * t.length, 1) >>> 0;
    // var f = y().subarray(a + s, a + i);
    // s += T(t, f).written
  }
  return k = s,
    a
}

// 内存
var R = null;
function P() {
  return null !== R && 0 !== R.byteLength || (R = new Int32Array(o.memory.buffer)),
    R
}

function $(t, e) {
  var n, r;
  try {
    var i = o.__wbindgen_add_to_stack_pointer(-16)
      , a = I(t, o.__wbindgen_malloc, o.__wbindgen_realloc)
      , c = k
      , s = e == null ? 0 : I(e, o.__wbindgen_malloc, o.__wbindgen_realloc)
      , u = k;

    console.log("i：" + i)
    console.log("a：" + a)
    console.log("c：" + c)
    console.log("s：" + s)
    console.log("u：" + u)
    o.base64AesCBC_encrypt(i, a, c, s, u);
    var f = P()[i / 4 + 0]
      , l = P()[i / 4 + 1]
      , p = P()[i / 4 + 2]
      , d = P()[i / 4 + 3]
      , h = f
      , v = l;

    console.log("f：" + f)
    console.log("l：" + l)
    console.log("p：" + p)
    console.log("d：" + d)
    // 测试不会抛出
    // if (d)
    //   throw h = 0,
    //   v = 0,
    //   A(p);
    return n = h,
      r = v,
      b(h, v)
  } finally {
    o.__wbindgen_add_to_stack_pointer(16),
      o.__wbindgen_free(n, r, 1)
  }
}
function M(t, e) {
  var n, r;
  try {
    var i = o.__wbindgen_add_to_stack_pointer(-16)
      , a = I(t, o.__wbindgen_malloc, o.__wbindgen_realloc)
      , c = k
      , s = e == null ? 0 : I(e, o.__wbindgen_malloc, o.__wbindgen_realloc)
      , u = k;
    o.md5_encrypt(i, a, c, s, u);
    var f = P()[i / 4 + 0]
      , l = P()[i / 4 + 1]
      , p = P()[i / 4 + 2]
      , d = P()[i / 4 + 3]
      , h = f
      , v = l;
    // 测试不会抛出
    // if (d)
    //   throw h = 0,
    //   v = 0,
    //   A(p);
    return n = h,
      r = v,
      b(h, v)
  } finally {
    o.__wbindgen_add_to_stack_pointer(16),
      o.__wbindgen_free(n, r, 1)
  }
}


async function playurlEncrypt() {
  let t = {
    sent: ""
  }
  // const base = $("c1c19c14-58ef-41ed-9387-5139dfd8ebe6", "0e00b1070eba0f0b000b0e020abbbbb1")
  // console.log("第一个base：" + base)

  const md5 = M("17474923438226088074209907828", "babb0bb7ba0bb1ba0cbb0a0b0a010abf")
  console.log("第二个md5：" + md5)
  // const exports = await init_wasm("https://cdnm.miguvideo.com/mgs/common/miguvendor/prd/gateway-crypto.wasm")
  // console.log(exports)

}

playurlEncrypt()

// const exports = await init_wasm("https://cdnm.miguvideo.com/mgs/common/miguvendor/prd/gateway-crypto.wasm", gatewayImport)
// console.log(exports)
