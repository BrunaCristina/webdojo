const pgp = require('pg-promise')()

const db = pgp({    //Montando uma conexão
    host:'localhost',
    port: 5432,
    database: 'UserDB',
    user: 'dba',
    password: 'dba'
})

function deleteUserByEmail(email){
    return db.none ('delete from public."User" where email = $1',[email])     // None é uma função do pg-promise que é usada para especificar que não é necessário retornar dados, por exemplo aqui deleta apenas.

}


module.exports = {
    deleteUserByEmail
}