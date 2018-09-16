const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-user-managers-react-redux-2', { logging: false });

const User = conn.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.belongsTo(User, { as: 'manager' });

const syncAndSeed = () => {
    let Eric, Mymy, Pearl, Brian;
    conn.sync({ force: true })
        .then(() => Promise.all([
            User.create({ name: 'Eric' }),
            User.create({ name: 'Mymy' }),
            User.create({ name: 'Pearl' }),
            User.create({ name: 'Brian' })
        ]))
        .then(users => {
            [Eric, Mymy, Pearl, Brian] = users;
            Mymy.setManager(Eric);
            Pearl.setManager(Mymy);
            Brian.setManager(Eric);
        })
}

module.exports = {
    syncAndSeed,
    models: {
        User
    }
}