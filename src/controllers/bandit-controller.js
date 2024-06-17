const BanditRepository = require('../repositories/bandit-repository.js');

class BanditController {
    async dashboard(req, res){
        var bandits = await BanditRepository.getBandits();
        var bandits_list = [];

        bandits.forEach(doc => {
            var key = doc.id;
            var data = doc.data();
            data.key = key;
            bandits_list.push(data);
        })

        res.render('dashboard', { bandits: bandits_list});
    }

    profile(req, res){
        res.render('profile', { user: req.user });
    }

    async ecrime(req, res){
        var bandit = await BanditRepository.getBanditByKey(req.params.key);
        res.render('ecrime', { bandit: bandit.data() });
    }

    createBandit(req, res){
        res.render('register-bandit');
    }

    async storeBandit(req, res){
        const bandit = req.body;
        await BanditRepository.createBandit(bandit);
        res.redirect('/dashboard');
    }

    async editBandit(req, res) {
        var bandit = await BanditRepository.getBanditByKey(req.params.key);

        res.render('edit', { bandit });
    }

    async updateBandit(req, res) {
        var bandit = await BanditRepository.updateBandit(req.params.key, req.body);

        res.render('edit', { bandit });
    }

    async deleteBandit(req, res) {
        await BanditRepository.deleteBandit(req.params.key);

        res.redirect('/dashboard');
    }
}


module.exports = new BanditController();