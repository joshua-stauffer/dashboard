import { ImMoveUp, ImMoveDown } from 'react-icons/im'
import {  FaTrash } from 'react-icons/fa'



export function ResourceMoveControls({ id, order, isFirst, isLast, view, funcs, buttonStyle  }) {
  const { moveUp, moveDown, del } = funcs
  return (
    <div className='gen-list-move-controls'>

      { (order || order === 0) && 
        <div>
          <button
            onClick={() => moveUp(order, view)}
            disabled={moveUp && !isFirst ? false : true}
            title={'Move Item Up'}
          >
            <ImMoveUp {...buttonStyle}/>
          </button>

          <button
            onClick={() => moveDown(order, view)}
            disabled={moveDown && !isLast ? false : true}
            title={'Move Item Down'}
          >
            <ImMoveDown {...buttonStyle}/>
          </button>

        </div>
      }
        <button
          onClick={() => del(id)}
          disabled={del ? false : true}
          title={'Delete'}
        >
          <FaTrash {...buttonStyle}/>
        </button>

    </div>
  )
}