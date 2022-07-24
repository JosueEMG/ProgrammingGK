const brawlhalla = require('./brawlhalla')
const axios = require('axios').default

const userInfo = async (steamId) => {
  try {
    const userInfo = await axios(`https://api.brawlhalla.com/player/${await brawlhalla(steamId).data.brawlhalla_id}/stats?api_key=${process.env.BRAWLHALLA_TOKEN}`)
    return userInfo
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = userInfo