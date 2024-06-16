//REPOSITORY FOR FIREBASE FIRESTORE DATABASE WITH TRY CATCH BLOCKS
class BanditRepository{
    constructor(firestore){
        this.firestore = firestore;
    }

    async getBandits(){
        try{
            const bandits = await this.firestore.collection('bandits').get();
            return bandits;
        }catch(error){
            console.error('Error getting bandits', error);
        }
    }

    async getBanditById(id){
        try{
            const bandit = await this.firestore.collection('bandits').doc(id).get();
            return bandit;
        }catch(error){
            console.error('Error getting bandit by id', error);
        }
    }

    async createBandit(bandit){
        try{
            const response = await this.firestore.collection('bandits').add(bandit);
            return response;
        }catch(error){
            console.error('Error creating bandit', error);
        }
    }

    async updateBandit(id, bandit){
        try{
            await this.firestore.collection('bandits').doc(id).update(bandit);
            return true;
        }catch(error){
            console.error('Error updating bandit', error);
        }
    }

    async deleteBandit(id){
        try{
            await this.firestore.collection('bandits').doc(id).delete();
            return true;
        }catch(error){
            console.error('Error deleting bandit', error);
        }
    }
}