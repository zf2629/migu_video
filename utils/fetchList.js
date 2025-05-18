import axios from "axios"

// 获取分类集合
async function cate_list() {
  try {
    let resp = await axios.get("https://program-sc.miguvideo.com/live/v2/tv-data/a5f78af9d160418eb679a6dd0429c920")
    let liveList = resp.data.body.liveList
    // 印象天下没有内容
    liveList = liveList.filter((item) => {
      return item.name != "印象天下"
    })
    return liveList
  } catch (error) {
    throw error
  }
}

// 所有数据
async function data_list() {
  try {
    let cates = await cate_list()

    for (let cate in cates) {
      let resp = await axios.get("https://program-sc.miguvideo.com/live/v2/tv-data/" + cates[cate].vomsID)
      cates[cate].dataList = resp.data.body.dataList;
    }
    // console.log(cates)
    return cates
  } catch (error) {
    throw error
  }
}

// 获取电视链接
async function getUrlInfo(contId) {
  try {
    let resp = await axios.get(`https://webapi.miguvideo.com/gateway/playurl/v2/play/playurlh5?contId=${contId}&rateType=3&startPlay=true&xh265=false&channelId=0131_200300220100002`)
    // console.log(resp.data.body.urlInfo.url)
    // console.log(resp.data)
    if (resp.data?.body?.urlInfo?.url) {
      return resp.data.body.urlInfo.url
    }
    return ""
  } catch (error) {
    throw error
  }
}

export { cate_list, data_list, getUrlInfo }
