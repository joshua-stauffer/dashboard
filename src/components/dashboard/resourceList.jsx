import { ResourceItem } from './resourceItem';
import { ResourceEditControls } from './resourceEditControls';
import { ResourceMoveControls } from './resourceMoveControls';
import { compareObjOrder } from './utils/compareObjOrder';

import { AiOutlinePlus } from 'react-icons/ai'

export function ResourceList({dataObject, dataFuncs, view, name, buttonStyle}){
  const { data, isEditedList } = dataObject;

  data.sort(compareObjOrder)

  return (
    <ul className='gen-list'>
      <li className='gen-list-item'>
        <div className='gen-list-edit-controls'>
        <button
          onClick={()=> dataFuncs.addInOrder(0)}
          title='Add New'
        >
            <AiOutlinePlus {...buttonStyle}/>
        </button>
        </div>
      </li>
    
    {data.map(d => (
      <li className={d.isEdited ? 'gen-list-item edit-warning' : 'gen-list-item'}>
        <ResourceEditControls 
          id={d.id}
          key={'control' + d.id}         
          funcs={dataFuncs}
          buttonStyle={buttonStyle}
        />
        <ResourceItem
          key={'item' + d.id}
          primary={d.primary}
          secondary={d.secondary}
          editWarning={isEditedList.includes(d.id) ? true : false}/>
        <ResourceMoveControls
          id={d.id}
          order={d.order}
          funcs={dataFuncs}
          isFirst={d.order === 0 ? true : false}
          isLast={d.order === data.length - 1 ? true : false}
          view={view}
          buttonStyle={buttonStyle}
        />
      </li>
    ))}
          <li className='gen-list-item'>
        <div className='gen-list-edit-controls'>
        <button
          onClick={()=> dataFuncs.addInOrder(data.length)}
          title='Add New'
        >
            <AiOutlinePlus {...buttonStyle}/>
        </button>
        </div>
      </li>
    </ul>
  )
}