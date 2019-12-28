const fs = require('fs')
const request = require('request')
const querystring = require('querystring')
// 前端分类id
const webCategoryId = '5562b415e4b00c57d9b94ac8'
function getQuery(page) {
  return querystring.stringify({
    src: 'web',
    tagId: '55979fe6e4b08a686ce562fe',
    page,
    pageSize: 20,
    sort: 'hotIndex'
  })
}

function getDataTask() {
  return new Promise((resolve, reject) => {
    const task = function(page = 0, totalSize = 0, articles = []) {
      console.log(`正在爬取第${page}页数据,当前数量${articles.length}`)
      request.get(
        `https://timeline-merger-ms.juejin.im/v1/get_tag_entry?${getQuery(page)}`,
        {
          json: true
        },
        (err, res, body) => {
          if (err) {
            reject(err)
          }
          const list = body.d.entrylist
          if (list[0].viewsCount < 2000) {
            resolve(articles)
            return false
          }
          const total = body.d.total
          !totalSize && (totalSize = Math.ceil(total / 20))
          const result = list.filter(({ category, viewsCount }) => category.id === webCategoryId && viewsCount >= 2000)
          articles.push(...result)
          page < totalSize ? task(++page, totalSize, articles) : resolve(articles)
        }
      )
    }
    task()
  })
}

function renderTask(res) {
  const content = res.reduce(
    (a, { user, collectionCount, title, originalUrl }) =>
      a + `「 🌟 ${collectionCount} 」 [${title} By <font color="#f33">${user.username}</font> ](${originalUrl})  \n`,
    ''
  )
  fs.writeFileSync('./articles.md', content)
}
async function mainTask() {
  getDataTask()
    .then(res => {
      res.sort((a, b) => b.collectionCount - a.collectionCount)
      renderTask(res)
    })
    .catch(e => {
      console.log('获取文章出错', e)
    })
}

mainTask()
