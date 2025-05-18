const importObj = {
  a: {
    a: (a, b, c) => { },
    b: (a) => { return 0 },
    c: () => { },
    d: (a, b, c, d) => { return 0 },
    e: (a) => { return 0 },
    f: (a, b, c, d, e) => { return 0 },
    g: (a, b) => { return 0 },
    h: (a, b) => { return 0 },
    i: (a) => { return 0 },
    j: (a, b, c, d, e) => { return 0 }
  }
}

/**
 * 加密url
 * @param {string} videoURL - 视频url
 * @param {Uint8Array} memoryView - 内存
 * @param {Function} getEncrypt - 加密方法
 * @returns {string} - 加密地址
 */
function encrypt(videoURL, memoryView, getEncrypt) {
  // 将地址写入内存
  let i;
  for (i = 0; i < videoURL.length; ++i) {
    memoryView[i] = videoURL.charCodeAt(i)
  }
  memoryView[i] = 0

  // 加密内存中的url
  let start = getEncrypt(0)

  // 从内存中读取加密后的url
  let encryptedURL = ""
  for (let i = start; memoryView[i] != 0; ++i) {
    encryptedURL += String.fromCharCode(memoryView[i])
  }
  return encryptedURL
}


/**
 * 初始化wasm
 * @param {string} masmURL - wasm地址
 * @returns {object} - wasm导出的内容
 */
async function init_wasm(masmURL) {
  // 获取wasm文件
  let resp = await fetch(masmURL);
  // 初始化
  let { instance } = await WebAssembly.instantiateStreaming(resp, importObj)
  return instance.exports;
}



/**
 * 获取加密url
 * @param {object} exports - wasm导出的内容
 * @param {string} videoURL - 视频地址
 * @returns {string} - 播放地址
 */
function getEncryptURL(exports, videoURL) {
  // 获得内存
  const memory = exports.k
  const memoryView = new Uint8Array(memory.buffer)

  // 获取加密方法
  const getEncrypt = exports.m
  return encrypt(videoURL, memoryView, getEncrypt)
}

export { init_wasm, getEncryptURL }
