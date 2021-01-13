import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ThesaurusItem } from './thesaurusItem';

export function ThesaurusList({ id, title, list , allWords, dataFuncs}){
  
  const { addThesaurusTerm, delThesaurusTerm } = dataFuncs;
  console.log('add thesaurus and del thesaurus funcs are ', addThesaurusTerm, delThesaurusTerm)
  const [inputState, setInputState] = useState('')
  const addWord = (id, title, val) => {
    addThesaurusTerm(id, title, val)
    setInputState('')
  }
  const buttonStyle = {size: '20px', color: '#385749ff'}

  
  return (
    <div className='sp-item'>
      <h2 className='thesaurus-header'>{ title }</h2>
      <ul className='thesaurus-list'>
        {list.map(d => 
          <ThesaurusItem
            id={id}
            title={title}
            word={d}
            delFunc={delThesaurusTerm}
            allWords={allWords}
            buttonStyle={buttonStyle}
          />
        )}
      </ul>
      <label className='thesaurus-label'>
        <p>Add Term</p>
        <input
          type='text'
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <button onClick={() => addWord(id, title, inputState)}><AiOutlinePlus {...buttonStyle} /></button>
      </label>
    </div>
  )
}