import { FiAlertCircle } from 'react-icons/fi';

import { ResourceList } from './resourceList';

export function GenResourceView({ view, dispatch, dataObject, dataFuncs }) {
  const name = view.split('-')[0].toUpperCase()
  const { data } = dataObject;
  const { saveBatch } = dataFuncs;
  const canMoveItems = data[0].order || data[0].order === 0 ? true : false;
  const showSaveButton = data.map(d => d.isEdited).filter(d => d === true).length
  const canSave = data.filter(d => d.isEdited).length ? false : true;
  const buttonStyle = {size: '20px', color: '#385749ff'}

  return (
    <main className='main-dashboard'>
      <div className='gen-body'>
        <div className='top-bar'>

          <h1 className='gen-header'>{ name }</h1>
          <div className='header-button-box'>

            {canMoveItems && showSaveButton ?
              <button
                className='wide-button'
                onClick={saveBatch}
                disabled={canSave}
              >Save Order
            </button> : null}

            <button onClick={() => dispatch({type: 'home'})}>Home</button>

          </div>
        </div>

        <hr/>
        <div className='edit-warning-box'>
          {showSaveButton ? <p><FiAlertCircle className='warning-icon' {...buttonStyle} /> You have unsaved changes in item order</p> : null}
        </div>
        <ResourceList dataObject={dataObject} dataFuncs={dataFuncs} view={ view } name={name} buttonStyle={buttonStyle}/>
      </div>
    </main>
  )
}