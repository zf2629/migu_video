import fs from "fs"
import { dataList, getUrlInfo } from "./utils/fetchList.js"
import { getEncryptURL, initWasm } from "./utils/getddCalcuURL.js"

async function fetchURLByWasm() {

  const start = Date.now()
  // 必须绝对路径
  const path = process.cwd() + '/interface.txt'
  // 文件不存在则创建
  if (!fs.existsSync(path)) {
    fs.writeFile(path, "", error => {
      if (error) {
        throw new Error("文件创建失败")
      }
      console.log("文件创建成功")
    })
  }

  // aptv 必须绝对路径
  const aptvPath = process.cwd() + '/interface-aptv.txt'
  // 文件不存在则创建
  if (!fs.existsSync(aptvPath)) {
    fs.writeFile(aptvPath, "", error => {
      if (error) {
        throw new Error("文件创建失败")
      }
      console.log("文件创建成功")
    })
  }

  // 清除文件
  fs.writeFile(path, "", error => {
    if (error) {
      throw new Error("文件清除失败")
    }
    console.log("文件清除成功")
  })


  // 清除aptv文件内容
  fs.writeFile(aptvPath, "", error => {
    if (error) {
      throw new Error("aptv文件清除失败")
    }
    console.log("aptv文件清除成功")
  })

  // 所有数据
  const datas = await dataList()
  // const datas = channelName
  // 获取加密方法
  const exports = await initWasm("https://m.miguvideo.com/mgs/player/prd/v_20250506111629_ddc2c612/dist/pickproof1000.wasm")


  // aptv写入开头
  fs.appendFile(aptvPath, `#EXTM3U\n`, error => {
    if (error) {
      throw new Error("写入失败")
    }
  })


  // 写入分类
  for (let i = 0; i < datas.length; i++) {
    console.log(`正在写入分类###:${datas[i].name}`)
    // 写入分类数据
    fs.appendFile(path, `${datas[i].name},#genre#\n`, error => {
      if (error) {
        throw new Error("写入失败")
      }
    })

    const data = datas[i].dataList

    // 遍历节目
    for (let j = 0; j < data.length; j++) {

      // 获取播放链接
      const url = await getUrlInfo(data[j].pID)
      if (url == "") {
        console.log(`${data[j].name}：节目调整，暂不提供服务`)
        continue
      }
      // 加密链接
      const link = getEncryptURL(exports, url)

      console.log(`正在写入节目:${data[j].name}`)
      // 写入节目
      fs.appendFile(path, `${data[j].name},${link}\n`, error => {
        if (error) {
          throw new Error("写入失败")
        }
      })

      // 写入节目aptv
      fs.appendFile(aptvPath, `#EXTINF:-1 svg-id="${data[j].name}" group-title="${datas[i].name}",${data[j].name}\n${link}\n`, error => {
        if (error) {
          throw new Error("写入失败")
        }
      })
    }
  }

  const end = Date.now()
  console.log(`本次耗时:${(end - start) / 1000}秒`)
}

fetchURLByWasm()
