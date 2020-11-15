// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Dashing Elephant',
  siteDescription: 'Dashing Elephant',
  siteUrl: 'https://dashingelephant.xyz',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
    },
    {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
          id: "G-GK1559EZDV",
        },
      },
    },

    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          plugins: [
            ['gridsome-plugin-remark-prismjs-all', {
              showLineNumbers: false, //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              noInlineHighlight: true,
            },

            ],
          ],
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
          anchorClassName: 'icon icon-link',
        }
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Dashing Elephant',
          feed_url: 'https://dashingelephant.xyz/rss.xml',
          site_url: 'https://dashingelephant.xyz/'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: 'https://dashingelephant.xyz' + node.path,
          author: 'Alexander Sutcliffe',
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        config: {
          '/blog/*': {
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: '2020-11-13',
          }
        }
      }
    }

  ],
  templates: {
    Tag: '/tag/:id'
  },
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    }
  },
}
