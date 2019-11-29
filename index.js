if (!process.env.PRODUCTION) {
    require('dotenv').config();
}

const Database = require('./shared/cashback-context');
const Koa = require('koa');
const cors = require('koa2-cors');
const app = new Koa();
const bodyParser = require('koa-body');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

(async () => {
    await Database.connect();
    
    app.use(cors({
        origin: '*',
        allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
    }));

    app.use(bodyParser());
    
    publicRoutes.resolve(app);
    privateRoutes.resolve(app);
    
    app.listen(process.env.PORT || 4000);
})()
