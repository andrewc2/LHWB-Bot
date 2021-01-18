const { Sequelize } = require("sequelize");
const config = require("../config.json")

const sequelize = new Sequelize(config.mySQL.database, config.mySQL.username, config.mySQL.password, {
    host: config.mySQL.host,
    dialect: "mysql",
    logging: false
});

const music = sequelize.define("music", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    path: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
    },
    playcount: {
        type: Sequelize.INTEGER,
    },
    album: {
        type: Sequelize.STRING,
    },
    albumart: {
        type: Sequelize.STRING,
    }
},{
    freezeTableName: true,
    timestamps: false
})

const queue = sequelize.define("queue", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    path: {
        type: Sequelize.STRING,
    },
    queuedby: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
})

const recent = sequelize.define("recent", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    album: {
        type: Sequelize.STRING,
    },
    queuedby: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
})

const requested = sequelize.define("requested", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: Sequelize.STRING,
    },
    request: {
        type: Sequelize.STRING,
    }
},{
    freezeTableName: true,
    timestamps: false
})

const album = sequelize.define("album", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    path: {
        type: Sequelize.STRING,
    },
    albumorder: {
        type: Sequelize.INTEGER,
    },
    album: {
        type: Sequelize.STRING,
    },
},{
    freezeTableName: true,
    timestamps: false
})

const countdown = sequelize.define("countdown", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    startdate: {
        type: Sequelize.DATE(6)
    },
    enddate: {
        type: Sequelize.DATE(6)
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = { music, queue, recent, requested, album, countdown }