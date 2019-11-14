module.exports = {
    database: "quizzes-db",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "quizzes-db.sqlite",
        define: {
            underscored: true
        }
    },
    jwtSecret: "p4ssW0rd",
    jwtSession: {session: false}
};