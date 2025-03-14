import chromium from 'chrome-aws-lambda'
import fs from 'fs'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../data/siteMetadata.js'

const imageAvatar = fs.readFileSync('./public/static/images/avatar.png')
const base64Image = new Buffer.from(imageAvatar).toString('base64')
const dataURI = 'data:image/jpeg;base64,' + base64Image

// https://github.com/Xaconi/xaconi-site
const generateFeaturedImage = async (browser, config, post) => {
  const filePath = `./public/static/social-images/${post.slug.split('/').join('-')}.jpg`

  if (fs.existsSync(filePath)) {
    return
  }

  const originalDate = new Date(post.date)
  const formattedDate = `${originalDate.getDate()}/${('0' + (originalDate.getMonth() + 1)).slice(
    -2
  )}/${originalDate.getFullYear()}`

  const tags =
    post.tags
      ?.map((tag) => {
        return `#${tag}`
      })
      .join(' | ') || ''

  const page = await browser.newPage()
  page.setViewport({ width: 1128, height: 600 })
  page.setContent(`<html>
            <body>
                <div class="social-image-content">
                    <h1>
                        ${post.title}
                    </h1>
                    <div class="social-image-footer">
                        <div class="social-image-footer-left">
                            <img src="${dataURI}" />
                            <span>somprasongd.work · ${formattedDate} · ${post.readingTime.text}</span>
                        </div>
                        <div class="social-image-footer-right">
                            ${tags}
                        </div>
                    </div>
                </div>
            </body>
            <style>
                html, body {
                    height : 100%;
                }
                body {
                    align-items : center;
                    display : flex;
                    height : 600px;
                    justify-content : center;
                    margin: 0;
                    width : 1128px;
                    background-color: #e2e2e2;
                }
                .social-image-content {
                    border : 2px solid black;
                    border-radius : 5px;
                    box-sizing: border-box;
                    display : flex;
                    flex-direction : column;
                    height : calc(100% - 80px);
                    margin : 40px;
                    padding : 20px;
                    width : calc(100% - 80px);
                    position: relative;
                    background-color: white;
                }
                .social-image-content::after {
                    content: ' ';
                    position: absolute;
                    top: 7px;
                    left: 7px;
                    width: 100%;
                    background-color: black;
                    height: 100%;
                    z-index: -1;
                    border-radius: 5px;
                }
                .social-image-content h1 {
                    font-size: 72px;
                    margin-top: 90px;
                }
                .social-image-footer {
                    display : flex;
                    flex-direction : row;
                    margin-top : auto;
                }
                .social-image-footer-left {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    font-size : 28px;
                    font-weight : 600;
                    justify-content: center;
                    line-height: 40px;
                }
                .social-image-footer-left img {
                    border : 2px solid black;
                    border-radius : 50%;
                    height : 40px;
                    margin-right : 10px;
                    width : 40px;
                }
                .social-image-footer-right {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    height : 40px;
                    justify-content: center;
                    margin-left : auto;
                    font-size : 28px;
                }
                * {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    font-weight : 600;
                }
            </style>
        </html>`)
  const screenShotBuffer = await page.screenshot()

  fs.writeFileSync(filePath, screenShotBuffer)

  return filePath.substring(8)
}

async function generateSocialImages(config, allBlogs) {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    })

    for (let i = 0; i < publishPosts.length; i++) {
      const post = publishPosts[i]
      await generateFeaturedImage(browser, config, post)
    }

    browser.close()
  }
}

const socialImages = () => {
  generateSocialImages(siteMetadata, allBlogs)
  console.log('Social images generated...')
}
export default socialImages
