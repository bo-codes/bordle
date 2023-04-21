// @ts-nocheck
import { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import Keyboard from '../components/Keyboard'
import Guess from '../components/Guess'
import WordleStore from '../stores/WordleStore'
import Modal from '../components/Modal'


export default observer(function Home() {
  const store = useLocalObservable(() => WordleStore)
  const [wordLength, setWordLength] = useState(6)
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false);
  }

  const activateModal = () => {
    // console.log('modal activating')
    setTimeout(() => {
      return (
        <Modal onClose={handleClose}>
          {store.won && <div id='won-txt'>YOU WON &#39;o&#39;</div>}
          {store.lost && <div id='lost-txt'>YOU LOST &#39;_&#39;</div>}
          {store.lost && <div id='reveal-txt'>
              <div id='tww'>The word was:</div>
              <div id='revealed-word'>{store.word}</div>
            </div>}
          <div id='play-again' onClick={handlePlayAgain}>Play Again</div>
        </Modal>
      )
    }, calcModalDelay(wordLength))
  }

  const handlePlayAgain = () => {
    store.init()
    setShowModal(false);
    // window.location.reload(false);
  }

  useEffect(() => {
    setShowModal(false);
    store.wordLength = wordLength
    store.init();
    window.addEventListener('keyup', store.handleType)
    return () => {
      window.removeEventListener('keyup', store.handleType)
    }
  },[wordLength])

  const calcModalDelay = (wl) => {
    let totalMs = 0;
    for (let i = 0; i < wl; i++) {
      totalMs += i * 480;
    }
    return totalMs;
  }

  return (
    <div className='main'>
      <div className="modal-container"></div>
      {(store.won || store.lost) && (
          <Modal onClose={handleClose}>
            {store.won && <div id='won-txt'>YOU WON &#39;o&#39;</div>}
            {store.lost && <div id='lost-txt'>YOU LOST &#39;_&#39;</div>}
            {store.lost && <div id='reveal-txt'>
                <div id='tww'>The word was:</div>
                <div id='revealed-word'>{store.word}</div>
              </div>}
            <div id='play-again' onClick={handlePlayAgain}>Play Again</div>
          </Modal>
        )
      }
      <h1 id='title'>Bordle</h1>
      {store.guesses.map((_, i) => (
        <Guess word={store.word} wl={store.wordLength} key={i} isGuessed={i < store.currGuess} guess={store.guesses[i]}/>
      )
      )}
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
