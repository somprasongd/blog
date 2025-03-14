import rss from './rss.mjs'
import socialImages from './social-images.mjs'

const isProduction = process.env.NODE_ENV === 'production'

async function postbuild() {
  await rss()
  if (!isProduction) {
    await socialImages()
  }
}

postbuild()
