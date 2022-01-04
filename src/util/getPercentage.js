import * as wordModel from '../components/words/wordsModel.js'
import * as hourModel from '../components/hours/hoursModel.js'

async function getClassesPercentage() {
    const words = await wordModel.default.Word.getAllWords().toArray()
    const hours = await hourModel.default.Hour.getAllHourInfo().toArray()

    let nouns = {
        quantity: 0,
        get percentage(){
            return (this.quantity * 100) / words.length
        }
    }

    let verbs = {
        quantity: 0,
        get percentage(){
            return (this.quantity * 100) / words.length
        }
    }

    let adverbs = {
        quantity: 0,
        get percentage(){
            return (this.quantity * 100) / words.length
        }
    }

    let adjectives = {
        quantity: 0,
        get percentage(){
            return (this.quantity * 100) / words.length
        }
    }

    let phrasalVerbs = {
        quantity: 0,
        get percentage(){
            return (this.quantity * 100) / words.length
        }
    }
    
    //percentage = menor x100 / maior

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

    return [
        nouns, verbs, adverbs, adjectives, phrasalVerbs
    
    ]
    

}

export {getClassesPercentage}