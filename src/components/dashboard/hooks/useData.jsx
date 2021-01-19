import { useState, useEffect } from 'react';

export function useData(dataObject, dispatch){
  // These utility methods apply to each dataObject,
  // regardless of their identity as a specificStore object or generalStore object

  const { setStore } = dataObject;

  const moveUp = order => {

    setStore(data => {

      const newData = data.map(object => {
        if (object.order === order) {
          return {
            ...object,
            order: order - 1,
            isEdited: true
          }
        } else if (object.order === order - 1) {
          return {
            ...object,
            order: order,
            isEdited: true
          }
        } else {
          return object
        }
      })

      return newData
    })
  }


  const moveDown = order => {
    setStore(data => {

      const newData = data.map(object => {
        if (object.order === order) {
          return {
            ...object,
            order: object.order + 1,
            isEdited: true
          }
        } else if (object.order === order + 1) {
          return {
            ...object,
            order: object.order - 1,
            isEdited: true
          }
        } else {
          return object
        }
      })

      return newData
    }
  )}


  const [makeNew, setMakeNew] = useState(false);
  useEffect(() => {
    if (!makeNew) return;
    dataObject.reload();
    const viewName = dataObject.resource + '-new'
    dispatch({type: viewName})
    setMakeNew(false)
  }, [makeNew])


  const addInOrder = order => {
    dataObject.reload();
    const viewName = dataObject.resource + '-newByOrder'
    dispatch({type: viewName, payload: {order: order}})
  }


  const [eleToDelete, setEleToDelete] = useState(null);
  useEffect(() => {
    if (!eleToDelete) return
    dataObject.reload();
    const viewName = dataObject.resource + '-del'
    dispatch({
      type: viewName,
      payload: {
        id: eleToDelete
      }
  })
    setEleToDelete(null);
  }, [eleToDelete])


  const save = () => {
    const { id, data, resource, reload } = dataObject;
    reload(id);
    const viewName = resource + '-updateOne'
    dispatch(
      {
        type: viewName,
        payload: {
          id: id, 
          body: data
        }
      }
    )
  }

  const saveBatch = () => {
    const { data, resource, reload } = dataObject;
    // genericStore doesn't need an id for reload
    const updatedData = data.filter(d => d.isEdited)
    reload()
    const viewName = resource + '-updateBatch'
    dispatch(
      {
        type: viewName,
        payload: {
          body: updatedData
        }
      }
    )

  }

  // these relate to the whole data object
  const dataFuncs = {
    moveUp: (order) => moveUp(order),
    moveDown: (order) => moveDown(order),
    add: () => setMakeNew(true),
    addInOrder: (order) => addInOrder(order),
    edit: (id) => dispatch({type: dataObject.specificView, payload: {id: id}}),
    del: (id) => setEleToDelete(id),
    save: () => save(),
    saveBatch: () => saveBatch()
  }

  return [dataFuncs]
}