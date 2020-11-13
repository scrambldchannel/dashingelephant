// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome Portfolio Starter',
  siteDescription: 'A simple portfolio theme for Gridsome powered by Tailwind CSS v1',
  siteUrl: 'https://gridsome-portfolio-starter.netlify.com',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
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
        plugins: [
          '@gridsome/remark-prismjs'
        ]
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Code and Cricket',
          feed_url: 'https://codeandcricket.netlify.com/rss.xml',
          site_url: 'https://codeandcricket.netlify.com/'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: 'https://codeandcricket.netlify.com' + node.path,
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
      plugins: [
        ['gridsome-plugin-remark-shiki', { theme: 'nord', skipInline: true }]
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    }
  },
}
