const brawlhalla = require('./brawlhalla')
const axios = require('axios').default

const userInfo = async (steamId) => {
  try {
    const bhData = await brawlhalla(steamId)
    const userInfo = await axios(`https://api.brawlhalla.com/player/${bhData.brawlhalla_id}/stats?api_key=${process.env.BRAWLHALLA_TOKEN}`)
    return userInfo.data
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = userInfo