import rss from './rss.mjs'
import socialImages from './social-images.mjs'

async function postbuild() {
  await rss()
  await socialImages()
}

postbuild()
