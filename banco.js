import {Sequelize} from "sequelize";

const sequelize = new Sequelize('biblioteca2025', 'postgres', 'Mxk&6qh8', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default sequelize;