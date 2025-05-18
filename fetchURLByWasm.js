import fs from "fs"
import { data_list, getUrlInfo } from "./utils/fetchList.js"
import { getEncryptURL, init_wasm } from "./utils/getddCalcuURL.js"

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function fetch_url() {

  // 必须绝对路径
  let path = process.cwd() + '/interface.txt'
  // 文件不存在则创建
  if (!fs.existsSync(path)) {
    fs.writeFile(path, "", error => {
      if (error) {
        throw new Error("文件创建失败")
      }
      console.log("文件创建成功")
    })
  }
  await delay(1000)

  // 备份文件
  fs.copyFile(path, path + ".bak", error => {
    if (error) {
      throw error
    }
    console.log("文件备份成功")
  })

  await delay(1000)
  fs.writeFile(path, "", error => {
    if (error) {
      throw new Error("文件清除失败")
    }
    console.log("文件清除成功")
  })
  let datas = await data_list()
  const exports = await init_wasm("https://m.miguvideo.com/mgs/player/prd/v_20250506111629_ddc2c612/dist/pickproof1000.wasm")
  for (let i = 0; i < datas.length; i++) {

    console.log("正在写入分类###:" + datas[i].name)
    // 写入分类数据
    fs.appendFile(path, datas[i].name + ",#genre#\n", error => {
      if (error) {
        throw new Error("写入失败")
      }
    })

    let data = datas[i].dataList
    for (let j = 0; j < data.length; j++) {
      console.log("正在准备节目")
      let link
      // console.log(data[j].pID)
      // try {
      let url = await getUrlInfo(data[j].pID)
      if (url == "") {
        console.log("节目调整")
        continue
      }
      link = getEncryptURL(exports, url)
      // link = await fetch(base_link, {
      //   method: "GET"
      // }).then(res => res.text())

      if (!link) {
        continue
      }
      // } catch (error) {
      //   throw new Error("链接获取失败")
      // }
      console.log("正在写入节目:" + data[j].name)
      // 写入分类数据
      fs.appendFile(path, data[j].name + "," + link + "\n", error => {
        if (error) {
          throw new Error("写入失败")
        }
      })
    }

  }
}

fetch_url()
