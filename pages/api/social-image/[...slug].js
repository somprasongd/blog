// NodeJS Core
import fs from 'fs'
import path from 'path'

// Libs
import chromium from 'chrome-aws-lambda'
import matter from 'gray-matter'

let basePath = process.cwd()
// if (process.env.NODE_ENV === 'production') {
//   basePath = path.join(process.cwd(), '.next/server/chunks')
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const postSlug = req.query.slug.join('/').replace('.jpg', '')
  const post = await getFileBySlug('blog', postSlug.substring(5))
  const imageAvatar = fs.readFileSync(basePath + '/public/static/images/avatar.png')
  const base64Image = new Buffer.from(imageAvatar).toString('base64')
  const dataURI = 'data:image/jpeg;base64,' + base64Image
  const originalDate = new Date(post.frontMatter.date)
  const formattedDate = `${originalDate.getDate()}/${('0' + (originalDate.getMonth() + 1)).slice(
    -2
  )}/${originalDate.getFullYear()}`

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

  const tags =
    post.frontMatter.tags
      ?.map((tag) => {
        return `#${tag}`
      })
      .join(' | ') || ''
  const content = createContent(dataURI, post.frontMatter.title, formattedDate, tags)
  const page = await browser.newPage()
  page.setViewport({ width: 1128, height: 600 })
  page.setContent(content)
  const screenShotBuffer = await page.screenshot()
  browser.close()
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': Buffer.byteLength(screenShotBuffer),
  })
  res.end(screenShotBuffer)
  //   }
}

function getFileBySlug(type, slug) {
  const mdxPath = path.join(basePath, 'data', type, `${slug}.mdx`)
  const mdPath = path.join(basePath, 'data', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  const { data: frontmatter } = matter(source)

  return {
    frontMatter: {
      // slug: slug || null,
      // fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}

function createContent(logoURI, title, formattedDate, tags) {
  return `
  <!DOCTYPE HTML>
  <html lang="th">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div class="social-image-content">
        <h1>
          ${Buffer.from(title, 'utf-8').toString()}
        </h1>
        <div class="social-image-footer">
          <div class="social-image-footer-left">
            <img src="${logoURI}" />
            <span>somprasongd.work · ${formattedDate} </span>
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
  </html>`
}
