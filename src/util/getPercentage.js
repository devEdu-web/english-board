import * as wordModel from '../components/words/wordsModel.js'
import * as hourModel from '../components/hours/hoursModel.js'
// menor * 100 / maior
async function getClassesPercentage() {
    const words = await wordModel.default.Word.getAllWords().toArray()
    const wordsAttributes = {
        quantity: 0,
        get percentage(){
            return (this.quantity * 100) / words.length
        }
    }

    let nouns = {...wordsAttributes, get percentage(){return Math.ceil((this.quantity * 100) / words.length)}}
    let verbs = {...wordsAttributes, get percentage(){return Math.ceil((this.quantity * 100) / words.length)}}
    let adverbs = {...wordsAttributes, get percentage(){return Math.ceil((this.quantity * 100) / words.length)}}
    let adjectives = {...wordsAttributes, get percentage(){return Math.ceil((this.quantity * 100) / words.length)}}
    let phrasalVerbs = {...wordsAttributes, get percentage(){return Math.ceil((this.quantity * 100) / words.length)}}


    words.forEach(word => {
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

    return [ nouns, verbs, adverbs, adjectives, phrasalVerbs ]
    

}

async function getHoursPercentage(){
    const hours = await hourModel.default.Hour.getAllHourInfo().toArray()
    let hoursPercentage = {
        listeningDays: hours[0].hoursInfo.length,
        get listenigPercentage() {
            return Math.ceil(this.listeningDays * 100 / 365)
        },
        get daysPercentage() {
            return 100 - this.listenigPercentage
        }
    }

    // hours.forEach(item => {
    //     hoursPercentage.listeningDays = item.hoursInfo.length
    // })

    return {
        hoursPercentage
    }
}

export {getClassesPercentage, getHoursPercentage}