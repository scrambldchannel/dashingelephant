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
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-183105325-1'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          plugins: [
            ['gridsome-plugin-remark-mermaid', {
              // the default theme gets applied after any themeVariables and can override things
              // explicitly using the base theme seems to be less prone to doing this
              theme: 'base',
              mermaidOptions: {
                'themeVariables': {
                  "primaryColor": "#e2e8f0",
                  "textColor": "#2C7A7B",
                  "lineColor": "#2d3748"
                }
              }
            }],
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
    },


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
