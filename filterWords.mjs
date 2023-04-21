import wordList2 from "./words.mjs";

// function uniqueWords(words) {
//   let reps = [];
//   let unique = {};
//   for (let i = 0; i < words.length; i++) {
//     let word = words[i]
//     if (unique[word] === 1 || word.length === 3) {
//       reps.push(word);
//     } else {
//       unique[word] = 1;
//     }
//   }
//   console.log(Object.keys(unique).length);
// }

// uniqueWords(wordList2);

async function validWords(words) {
  let valid = [];
  let invalid = [];

  for(let word of words) {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response)=>{
      if (!response.ok) invalid.push(word);
      else valid.push(word)
    })
  }
  console.log({valid, invalid})
}

export default validWords;
