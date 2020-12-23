const keys = require('../keys')

module.exports = function(email, token) {
    return {
        to: email,
    from: keys.EMAIL_FROM,
    subject: "Востановление пароля",
    html: `
    <h1>Вы забыли пароль  ?</h1>
    <p>Если нет то морозь письмо</p>
    <p>Ну а если да то жмакай ссыль ниже:</p>
    <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстановить</a></p>
    <hr/>
    <a href="${keys.BASE_URL}">Перейти на сайт</a>
    `,
    }
}