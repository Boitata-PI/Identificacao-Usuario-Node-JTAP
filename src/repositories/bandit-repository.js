//REPOSITORY FOR FIREBASE FIRESTORE DATABASE WITH TRY CATCH BLOCKS

const { db } = require("../config/firebase");

class BanditRepository{
    async getBandits(){
        try{
            const bandits = await db.collection('bandits').get();
            return bandits;
        }catch(error){
            console.error('Error getting bandits', error);
        }
    }

    async getBanditByKey(key){
        try{
            return await db.collection('bandits').doc(key).get();
        }catch(error){
            console.error('Error getting bandit by id', error);
        }
    }

    async createBandit(bandit){
        try{
            const response = await db.collection('bandits').add(bandit);
            return response;
        }catch(error){
            console.error('Error creating bandit', error);
        }
    }

    async updateBandit(id, bandit){
        try{
            await db.collection('bandits').doc(id).update(bandit);
            return true;
        }catch(error){
            console.error('Error updating bandit', error);
        }
    }

    async deleteBandit(id){
        try{
            await db.collection('bandits').doc(id).delete();
            return true;
        }catch(error){
            console.error('Error deleting bandit', error);
        }
    }
}


module.exports = new BanditRepository();