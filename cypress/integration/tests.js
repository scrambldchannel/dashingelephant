describe('Loading Pages', () => {
  it('visits the homepage', () => {
    cy.visit('/')
      .contains('Sutcliffe')
  })


  it('can click the blog', () => {
    cy.visit('/')

    cy.get('[data-cypress=blog]').click()

    cy.url().should('include', '/blog')
  })

  it('can visit a single blog post', () => {
    cy.visit('/blog/2020-11-15-enhanced-syntax-highlighting-gridsome/')

    cy.url().should('include', '/blog/2020-11-15-enhanced-syntax-highlighting-gridsome/')
    cy.contains('Enhanced syntax highlighting options for Gridsome')
  })



  describe('Page Scroll to Sections', () => {

    it('can scroll to About', () => {
      cy.visit('/')

      cy.get('[data-cypress=about]').click()
      cy.get('#about').should('be.visible')
    })

    it('can scroll to Contact', () => {
      cy.visit('/')

      cy.get('[data-cypress=contact]').click()
      cy.get('#contact').should('be.visible')
    })
  })

  describe('Pagination', () => {
    it('the next button works', () => {
      cy.visit('/blog')

      cy.get('[data-cypress=next').click()
      cy.url().should('include', '/blog/2')
      cy.get('[data-cypress=next').click()
      cy.url().should('include', '/blog/3')
      cy.get('[data-cypress=next').click()
      cy.url().should('include', '/blog/4')

    })

    it('the prev button works', () => {
      cy.visit('/blog/3')
      cy.get('[data-cypress=prev').click()
      cy.url().should('include', '/blog/2')
      cy.get('[data-cypress=prev').click()
      cy.url().should('include', '/blog')
    })
  })

  describe('Tags for posts', () => {
    it('can visit tags page', () => {
      cy.visit('/tag/python')

      cy.contains('Tag: python')
      cy.contains('Adventures with pre-commit')
      cy.contains('Creating a TI process from a .pro file using TM1py')
    })

    it('can click on tags from blog post page', () => {
      cy.visit('/blog/2020-09-30-adventures-with-pre-commit')

      cy.contains('python').click()
      cy.url().should('include', '/tag/python')
      cy.contains('Tag: python')
      cy.contains('Adventures with pre-commit')
    })
  })

  describe('Theme Switcher', () => {
    it('can change to dark theme', () => {
      cy.visit('/')

      cy.get('[data-cypress=switchTheme]').click({ force: true })
      cy.get('.content-wrapper').should('have.class', 'theme-dark')
    })

    it('can change to light theme', () => {
      cy.visit('/')

      cy.get('[data-cypress=switchTheme]').click({ force: true })
      cy.get('[data-cypress=switchTheme]').click({ force: true })
      cy.get('.content-wrapper').should('have.class', 'theme-light')
    })
  })

  describe('Search with Vue Fuse', () => {
    it('can search for blog posts', () => {
      cy.visit('/')

      cy.get('[data-cypress=search-results]').should('not.be.visible')
      cy.get('[data-cypress=search]').type('Adventures')
      cy.get('[data-cypress=search-results]').should('be.visible')
      cy.contains('Adventures with pre-commit')
    })

  })

})
