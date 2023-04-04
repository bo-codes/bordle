// @ts-nocheck
import { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import Keyboard from '../components/Keyboard'
import Guess from '../components/Guess'
import WordleStore from '../stores/WordleStore'


export default observer(function Home() {
  const store = useLocalObservable(() => WordleStore)
  const [wordLength, setWordLength] = useState(6)

  useEffect(() => {
    store.wordLength = wordLength
    store.init();
    window.addEventListener('keyup', store.handleType)
    return () => {
      window.removeEventListener('keyup', store.handleType)
    }
  },[wordLength])

  return (
    <div className='main'>
      <h1 id='title'>Bordle</h1>
      {store.guesses.map((_, i) => (
        <Guess word={store.word} wl={store.wordLength} key={i} isGuessed={i < store.currGuess} guess={store.guesses[i]}/>
      )
      )}
      {store.won && <div id='won-txt'>WON</div>}
      {store.lost && <div id='lost-txt'>LOST</div>}
      {store.lost && <div id='reveal-txt'>{store.word}</div>}
      <div id='wl-options'>
        <div className={wordLength == 4 ?'wl-option chosen': 'wl-option'} onClick={() => setWordLength(4)}>4</div>
        <div className={wordLength == 5 ?'wl-option chosen': 'wl-option'} onClick={() => setWordLength(5)}>5</div>
        <div className={wordLength == 6 ?'wl-option chosen': 'wl-option'} onClick={() => setWordLength(6)}>6</div>
        <div className={wordLength == 7 ?'wl-option chosen': 'wl-option'} onClick={() => setWordLength(7)}>7</div>
      </div>
      <Keyboard store={store}/>
    </div>
  )
})
