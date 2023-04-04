// @ts-nocheck

const Keyboard = ({store}) => {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  return (
    <div id="whole-kb">
      {qwerty.map((row, i) => {
        return <div className="kb-row" key={i}>
          {row.split('').map((char, i) => {
            const bgColor = store.exactGuesses.includes(char)
            ? '#0b2cb1'
            : store.inexactGuesses.includes(char)
            ? '#1f025e'
            : store.allGuesses.includes(char)
            ? 'grey' :
            '#2c2c2c'
            return <div className="kb-char" style={{backgroundColor: bgColor}} key={i}>{char}</div>
          })}
        </div>
      })}
    </div>
  )
}

export default Keyboard;
