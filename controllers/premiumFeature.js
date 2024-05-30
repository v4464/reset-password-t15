const User = require('../models/user');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

const getUserLeaderBoard = async (req, res) => {
    try{
                    //Most efficient way-------->
                    
                    // const leaderboard = await User.findAll({
                    //     attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.expenseamount')), 'total_cost']],
                    //     include: [
                    //         {
                    //             model: Expense,
                    //             attributes: []
                    //         }
                    //     ],
                    //     group: ['users.id'],
                    //     order: [['total_cost', 'DESC']]
            
                    // })
                    const leaderboard = await User.findAll({
                        order: [['totalExpenses', 'DESC']]
            
                    })
                    res.status(200).json(leaderboard)


                    


    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard
}