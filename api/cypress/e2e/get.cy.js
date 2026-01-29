describe('GET /api/users', () => {

    const heroes = [
        {
            name: 'Moisés',
            email: 'moises@heroes.com',
            password: 'pwd123'
        },
        {
            name: 'Davi',
            email: 'davi@heroes.com',
            password: 'pwd123'
        },
        {
            name: 'Sansão',
            email: 'sansao@heroes.com',
            password: 'pwd123'
        },
        {
            name: 'Josué',
            email: 'josue@heroes.com',
            password: 'pwd123'
        },
        {
            name: 'Gideão',
            email: 'gideao@heroes.com',
            password: 'pwd123'
        }
    ]

    before(() => {
        heroes.forEach((hero) => {
            cy.postUser(hero)
        })
    })

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {
                const found = response.body.find((user) => user.email === hero.email)
                expect(found.name).to.eq(hero.name)
                expect(found.email).to.eq(hero.email)
                expect(found).to.have.property('id')
            })
        })
    })
})