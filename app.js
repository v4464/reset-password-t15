const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const User = require('./models/user');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');
const Expense = require('./models/expenses');


var cors = require('cors');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());


const { nextTick } = require('process');
const purchasepremiumRoutes = require('./routes/purchase');
const premiumFeatureRoutes = require('./routes/premiumFeature');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense')

const resetPasswordRoutes = require('./routes/resetpassword');


const exp = require('constants');



// app.use(bodyParser.json({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/user', userRoutes);
app.use('/purchase', purchasepremiumRoutes);
app.use('/premium', premiumFeatureRoutes);
app.use('/expense', expenseRoutes);

app.use('/password', resetPasswordRoutes);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


app.use(errorController.get404);

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
