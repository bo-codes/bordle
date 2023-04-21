// @ts-nocheck
import { runInAction } from 'mobx'
import wordList from '../../words.mjs'

export default {
  word: '',
  guesses: [],
  currGuess: 0,
  wordLength: 0,
  get won () {
    return this.guesses[this.currGuess - 1] === this.word
  },
  get lost (){
    return !this.won && this.currGuess >= this.wordLength + 1
  },
  init () {
    // USING THE HEROKU API
    // const getWord = async() => {
    //   this.word = await wordList(this.wordLength)
    // }
    // getWord()

    // USING OUR OWN LIST
    let wordsArr = wordList(this.wordLength);
    let  randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    this.word = randomWord
    this.guesses.replace(new Array(this.wordLength + 1).fill(""))
    this.currGuess = 0;
  },
  submitGuess () {
    const submit = async() => {
      await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.guesses[this.currGuess]}`).then((response)=>{
      if (!response.ok) return;
      return response.json()
      }).then((data) => {
        if ((data && this.guesses[this.currGuess].length === this.wordLength) || this.guesses[this.currGuess] === this.word) {
          runInAction(() => {
            this.currGuess += 1
          })
        } else return;
      })
    }
    submit();
  },
  // gets all letters from all guesses so far
  get allGuesses() {
    return this.guesses.slice(0, this.currGuess).join('').split('')
  },
  get exactGuesses() {
    return this.word.split('').filter((letter, i) => {
      return this.guesses.slice(0, this.currGuess).map((word) => word[i]).includes(letter)
    })
  },
  get inexactGuesses() {
    return this.word.split('').filter((letter) => this.allGuesses.includes(letter))
  },
  handleType(e) {
    if (this.won || this.lost) {
      return
    }

    if (e.key === 'Enter') {
      return this.submitGuess()
    }
    if (e.key === 'Backspace') {
      this.guesses[this.currGuess] = this.guesses[this.currGuess].slice(
        0,
        this.guesses[this.currGuess].length - 1
      )
      return
    }
    if (this.guesses[this.currGuess].length < this.wordLength && e.key.match(/^[A-z]$/)) {
      this.guesses[this.currGuess] =
        this.guesses[this.currGuess] + e.key.toLowerCase()
    }
  },
}
