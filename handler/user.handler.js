import * as wiston from "winston";

const dbUsers = [
    {
        id : 1,
        email: "darknes@gmail.com", 
        password: "rahasia"
    },
    {
        id : 2,
        email: "neko@gmail.com",
        password: "rahasia"
    },
    {
        id : 3,
        email: "aqua@gmail.com",
        password: "rahasia"
    },
    {
        id : 4,
        email: "megumin@gmail.com",
        password: "rahasia"
    }
]

const log = wiston.createLogger({
    level: "info",
    format: wiston.format.combine(
        wiston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        wiston.format.splat(),
        wiston.format.json(),
        wiston.format.errors({stack: true}),
    ),
    transports: [
        new wiston.transports.Console({}),

    ]})

const getLoginView = (req, res) => {
    res.render('login')
}


const login = (req, res) => {
    log.info("Request URL: %s from IP: %s with method %s", req.originalUrl, req.ip, req.method);
    const {email, password} = req.body;

    for (const user of dbUsers) {
        if (user.email === email && user.password === password) {
            res.status(200)
                .json({
                    id : user.id,
                    email: user.email,
                    password: user.password,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                })
            return
        }
    }

    res.status(401)
        .json({
            code: 401,
            message: "Email or password is wrong!"
        })
}

const create = (req, res) => {
    log.info("Request URL: %s from IP: %s with method %s", req.originalUrl, req.ip, req.method)
    const {email, password} = req.body;

    for (const user of dbUsers) {
        if (user.email === email) {
            res.status(409)
                .json({
                    code: 409,
                    status: "OK",
                    data: "Oops email already registered!"
                })
            return
        }
    }

    const user = {id: dbUsers.length + 1, email: email, password: password};
    dbUsers.push(user)

    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    res.status(201)
        .json({
            code: 201,
            status: "OK",
            data: user
        })
}

const findById = (req, res) => {
    log.info("Request URL: %s from IP: %s with method %s", req.originalUrl, req.ip, req.method)
    const userId =  req.params.id;
    for (const user of dbUsers) {
        if (user.id == userId) {
            res.status(200)
                .json({
                    code: 200,
                    status: "OK",
                    data : {
                        id : user.id,
                        email: user.email,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }
                })
            return
        }
    }

    res.status(404)
        .json({
            code: 404,
            message: "User not found!"
        })
}

const updateById = (req, res) => {
    log.info("Request URL: %s from IP: %s with method %s", req.originalUrl, req.ip, req.method)
    const userId =  req.params.id;

    const {email, password} = req.body;
    for (const user of dbUsers) {
        if (user.id == userId) {
            user.email = email;
            user.password = password;

            res.status(200)
                .json({
                    code: 200,
                    status: "OK",
                    data : {
                        id : user.id,
                        email: user.email,
                        password: user.password,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }
                })
            return
        }
    }

    res.status(404)
        .json({
            code: 404,
            message: "User not found!"
        })
}

const deleteById = (req, res) => {
    log.info("Request URL: %s from IP: %s with method %s", req.originalUrl, req.ip, req.method)
    const userId =  req.params.id;

    dbUsers.filter(user => user.id != userId); // use splice pls.
    res.status(200)
        .json({
            code: 200,
            status: "OK",
            data: null
        })
}

export default {
    getLoginView,
    login,
    findById,
    updateById,
    deleteById,
    create
}