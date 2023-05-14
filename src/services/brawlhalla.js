const axios = require('axios').default

const brawlhallaCode = async (steamId) => {
  try {
    const brawlhallaCode = await axios(`https://api.brawlhalla.com/search?steamid=${steamId}&api_key=${process.env.BRAWLHALLA_TOKEN}`)
    return brawlhallaCode.data
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = brawlhallaCode