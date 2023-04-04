// @ts-nocheck
const Guess = ({word, wl, isGuessed, guess}) => {
  const gridCalc = (wl:number) => {
    const arr = [];
    for (let i = 0; i < wl; i++) {
      arr.push('1fr')
    }
    return (arr.join(' '))
  }
  console.log(word, 'before split')
  let used = word.split('');

  return (
    <div id="guess" style={{gridTemplateColumns: gridCalc(wl)}}>
      {new Array(wl).fill(0).map((_, i) => {
        const BGColor = !isGuessed
          ? 'black'
          : guess[i] === word[i]
          ? '#005ac0'
          : used.includes(guess[i])
          ? '#1f025e'
          : 'black'
          if (used.includes(guess[i])) {
            used.splice(used.indexOf(guess[i]), 1)
          }
        const flipOrNot = !isGuessed
          ? ''
          : guess[i] === word[i]
          ? 'flip'
          : used.includes(guess[i])
          ? 'flip'
          : 'flip'
          if (used.includes(guess[i])) {
            used.splice(used.indexOf(guess[i]), 1)
          }
        return <div key={i} className={`guess-letter ${flipOrNot}`} style={{
          "--backgroundColor": BGColor,
          animationDelay: `${i * 480}ms`
        }}>{guess[i]}</div>
      })}
    </div>
  )
}

export default Guess;
