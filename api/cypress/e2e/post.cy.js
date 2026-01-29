describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Alice',
      email: 'alicegomes@teste.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email) // Chama a task criada para deletar e-mail para garantir que não tenha o email no banco antes de criar.

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)

      expect(response.body.message).to.eq('Usuário cadastrado com sucesso!')
      expect(String(response.body.user.id)).to.match(/^\d+$/)    // Expressão regular para verificar se o campo é do tipo inteiro
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })

  })

  it('Não deve cadastrar com email duplicado', () => {

    const user = {
      name: 'Pedro',
      email: 'pedrogomes@teste.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('Email já está em uso!')
    })

  })


  it('O Campo Name deve ser obrigatório', () => {

    const user = {
      email: 'brunagomes@teste.com',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('O Nome é obrigatório!')

    })
  })

  it('O Campo Email deve ser obrigatório', () => {

    const user = {
      name: 'André Gomes',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('O Email é obrigatório!')

    })
  })

  it('O Campo Senha deve ser obrigatório', () => {

    const user = {
      name: 'Luisa Gomes',
      email: 'luisagomes@teste.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('A Senha é obrigatória!')

    })
  })


  it('Não deve passar quando o JSON está mal formatado', () => {

    const user = `{
      name: 'Caroline Gomes',
      email: 'carolgomes@teste.com'
      password: 'pwd123'

    }`

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('Invalid JSON format.')

    })
  })

})


