import fs from "fs"
import { dataList } from "./utils/fetchList.js"
import { getAndroidURL } from "./utils/androidURL.js"
import refreshToken from "./utils/refreshToken.js"

async function fetchURLByAndroid() {

  const userId = process.env.USERID
  const token = process.env.MIGU_TOKEN

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

  // await delay(100)
  // 清除文件内容
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

  // 刷新token 0点刷新token
  if (!new Date(start).getHours()) {
    await refreshToken(userId, token) ? console.log("token刷新成功") : console.log("token刷新失败")
  }
  // 获取数据
  const datas = await dataList()
  // const datas = channelName
  // 获取加密方法
  // const exports = await initWasm("https://m.miguvideo.com/mgs/player/prd/v_20250506111629_ddc2c612/dist/pickproof1000.wasm")
  // console.log("{")

  // aptv写入开头
  fs.appendFile(aptvPath, `#EXTM3U\n`, error => {
    if (error) {
      throw new Error("写入失败")
    }
  })

  // 分类列表
  for (let i = 0; i < datas.length; i++) {
    console.log(`正在写入分类###:${datas[i].name}`)
    // 写入分类
    fs.appendFile(path, `${datas[i].name},#genre#\n`, error => {
      if (error) {
        throw new Error("写入失败")
      }
    })

    const data = datas[i].dataList
    // console.log(`"${datas[i].name}": {`)
    // 写入节目
    for (let j = 0; j < data.length; j++) {
      // console.log(data[j].pID)

      // 获取链接
      // const resObj = await getAndroidVideoURL(userId, token, exports, data[j].pID, 999)
      const resObj = await getAndroidURL(userId, token, data[j].pID, 999)
      if (resObj.url == "") {
        console.log(`${data[j].name}：节目调整，暂不提供服务`)
        continue
      }
      console.log(`正在写入节目:${data[j].name}`)
      // 写入节目
      fs.appendFile(path, `${data[j].name},${resObj.url}\n`, error => {
        if (error) {
          throw new Error("写入失败")
        }
      })
      // aptv写入节目
      fs.appendFile(aptvPath, `#EXTINF:-1 svg-id="${data[j].name}" tvg-logo="${data[j].pics.highResolutionH}" group-title="${datas[i].name}",${data[j].name}\n${resObj.url}\n`, error => {
        if (error) {
          throw new Error("写入失败")
        }
      })
    }
    // console.log("},")
  }
  // console.log("}")
  const end = Date.now()
  console.log(`本次耗时:${(end - start) / 1000}秒`)
}

fetchURLByAndroid()
