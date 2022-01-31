import {UserProgress} from '../components/users/UserProgress.js'
// menor * 100 / maior
async function getClassesPercentage(userId) {
    const userProgress = await UserProgress.getUserProgress(userId)
    const wordsAttributes = {
        quantity: 0,
        get percentage(){
            return (this.quantity * 100) / userProgress.words.wordsCounter
        }
    }

    let nouns = {quantity: 0, get percentage(){return Math.ceil((this.quantity * 100) / userProgress.words.wordsCounter)}}
    let verbs = {quantity: 0, get percentage(){return Math.ceil((this.quantity * 100) / userProgress.words.wordsCounter)}}
    let adverbs = {quantity: 0, get percentage(){return Math.ceil((this.quantity * 100) / userProgress.words.wordsCounter)}}
    let adjectives = {quantity: 0, get percentage(){return Math.ceil((this.quantity * 100) / userProgress.words.wordsCounter)}}
    let phrasalVerbs = {quantity: 0, get percentage(){return Math.ceil((this.quantity * 100) / userProgress.words.wordsCounter)}}


    userProgress.words.userWords.forEach(word => {
        switch(word.wordClass) {
            case 'noun':
                nouns.quantity++
                break
            case 'adjective':
                adjectives.quantity++
                break
            case 'verb':
                verbs.quantity++
                break
            case 'phrasal-verb':
                phrasalVerbs.quantity++
                break
            case 'adverb':
                adverbs.quantity++
                break
        }
    })

    return { nouns, verbs, adverbs, adjectives, phrasalVerbs }
    

}

async function getHoursPercentage(userId){
    const userProgress = await UserProgress.getUserProgress(userId)


    if(userProgress.hours.hoursInfo.length > 0) {

        let hoursPercentage = {
            listeningDays: userProgress.hours.hoursInfo.length,
            get listenigPercentage() {
                return Math.ceil(this.listeningDays * 100 / 365)
            },
            get daysPercentage() {
                return 100 - this.listenigPercentage
            }
        }
        return {
            hoursPercentage
        }
    } else {
        return []
    }
}


export {getClassesPercentage, getHoursPercentage}