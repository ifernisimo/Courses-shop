const keys = require('../keys')

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Регистрация прошла успешна",
    html: `
    <h1>Добро пожаловать</h1>
    <p>Вы успешно создали аккаунт на email - ${email}</p>
    <hr/>
    <a href="${keys.BASE_URL}">Перейти на сайт</a>
    `,
  };
};
