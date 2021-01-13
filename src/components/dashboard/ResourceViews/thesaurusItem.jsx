import { FaLink, FaTrash } from 'react-icons/fa'

export function ThesaurusItem({id, title, word, delFunc, allWords, buttonStyle}) {
  return (
  <li className='thesaurus-item'>
    <p className='thesaurus-term'>{ word }         
      { allWords.includes(word) && 
        < FaLink 
          {...buttonStyle}
          title={'This term will link to another term!'}
        />
      }
    </p>
      <div className='thesaurus-term-box'>
      

        <button 
          onClick={() => delFunc(id, title, word)}
        >
          <FaTrash
            {...buttonStyle}
            title='Delete'
          />
        </button>
      </div>
     
  </li>
  )
}