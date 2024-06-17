const banditRepository = require('../repositories/BanditRepository');

class BanditController {
    dashboard(req, res){
        res.render('dashboard');
    }

    home(req, res){
        res.render('home');
    }

    getBandit(req, res) {
        const bandit = {
            id: 1,
            name: "Bandit 1",
            level: 1,
            attack: 10,
            defense: 5,
            agility: 3,
        };
        res.render('ecrime', { bandit });
    }

    adicionarBandit(req, res) {
        const bandit = {
            id: 1,
            name: "Bandit 1",
            level: 1,
            attack: 10,
            defense: 5,
            agility: 3,
        };

        res.render('adicionar', { bandit });
    }

    updateBandit(req, res) {
        const bandit = req.body;
        console.log(bandit);
        res.render('edit', { bandit });
    }
}


module.exports = new BanditController();