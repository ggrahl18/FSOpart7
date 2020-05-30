describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'vlad',
      username: 'vlad',
      password: 'vlad'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  describe('when not logged in', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Blogs')
      cy.contains('Blog Logger')
    })

    it.only('login fails with wrong password', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#user-name').type('vlad')
      cy.get('#pass-word').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Incorrect login!')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'ggrahl logged in')
    })

    it('was a successful login', function() {
      cy.contains('login').click()
      cy.get('#user-name').type('vlad')
      cy.get('#pass-word').type('vlad')
      cy.get('#login-button').click()

      cy.contains('vlad logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'vlad', password: 'vlad' })
    })

    it('A new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('And then there was light!')
      cy.get('#author').type('God')
      cy.get('#url').type('https://www.comeuntochrist.org/beliefs/jesus-christ')
      cy.get('#add-button').click()

      cy.contains('And then there was light! - God')
      cy.get('.success').contains('Blog added!')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')
    })

    it('blogs are arranged by most votes', function() {
      cy.createBlog({
        title: 'Heres Stan the Man!',
        author: 'Stan Duh!',
        url: 'www.goooogle.com'
      })
      cy.createBlog({
        title: 'And Thar She Goes, Again...',
        author: 'Rooster Cogburn',
        url: 'www.bingggg.com'
      })
      cy.createBlog({
        title: 'And then there was light!',
        author: 'God',
        url: 'https://www.comeuntochrist.org/beliefs/jesus-christ'
      })

      cy.contains('And Thar She Goes, Again...').parent().contains('show more').click()
      cy.contains('And Thar She Goes, Again...').parent().find('#vote-button')
        .click().click().click().click().click().click()

      cy.contains('And then there was light!').parent().contains('show more').click()
      cy.contains('And then there was light!').parent().find('#vote-button')
        .click().click()

      cy.get('.BlogShow:first').contains('And Thar She Goes, Again...')
      cy.get('.BlogShow:last').contains('Heres Stan the Man!')
    })
  })

  describe('blog exists', function() {
    beforeEach(function() {
      cy.login({ username: 'vlad', password: 'vlad' })
      cy.createBlog({
        title: 'Heres Stan the Man!',
        author: 'Stan Duh!',
        url: 'www.google.com'
      })
    })

    it('show more button works', function() {
      cy.contains('Heres Stan the Man!')
        .contains('show more')
        .click()

      cy.contains('Heres Stan the Man!')
        .get('#showless-button')
    })

    it('added one vote', function() {
      cy.contains('Heres Stan the Man!')
        .contains('show more').click()

      cy.get('#vote-button').click().parent()
        .contains('1 votes')
    })

    it('can be removed by authorized user', function() {
      cy.contains('Heres Stan the Man!')
        .contains('remove').click()

      cy.get('.success').contains('Deleted Heres Stan the Man!')
    })
  })

  describe('unauthorized commands', function() {
    beforeEach(function() {
      cy.login({ username: 'vlad', password: 'vlad' })
      cy.createBlog({
        title: 'Theres a snake in my boot!',
        author: 'Woody',
        url: 'www.google.com'
      })
    })

    it('unauthorized user cannot remove a blog', function(){
      cy.contains('log out').click()
      cy.get('html').should('not.contain', 'vlad logged in')
      cy.contains('Theres a snake in my boot!')
        .contains('remove').click()
      cy.get('.error').contains('Theres a snake in my boot! was NOT removed!')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })
  })
})