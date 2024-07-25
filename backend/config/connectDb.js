const sequelize = require('./configDB')

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');
    }catch(err){
        console.log('error connecting db '+ err)
    }    
};

module.exports = connectDb;