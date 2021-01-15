import { useEffect, useState } from 'react';


export function useSpecificStore(viewName) {
  const [view,] = useState(viewName)
  const [store, setStore] = useState([])
  

  const setDataHasLoadedID = (id) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {
            ...object,
            hasLoaded: true
          }
          return newObject
        } else {
          return object
        }

      })
    )
  }


  const [resetDataByID, setResetDataByID] = useState(null);
  // use this to communicate to the parent view list that something has changed
  // and a reload of data from the server is necessary
  const [resetGenericView, setResetGenericView] = useState(false)
  const genericViewHasBeenReset = () => setResetGenericView(false);
  useEffect(() => {
    if (!resetDataByID) return;
    // console.log('resetting id ', resetDataByID)
    setStore(store => store.map(object => 
      object.id !== resetDataByID ? object : {...object, hasLoaded: false}
    ))
    // request reset of generic view as well
    setResetGenericView(true);
    setResetDataByID(null);
  }, [resetDataByID])


  const [changeList, setChangeList] = useState([])
  useEffect(() => {
    // console.log('store is ', store)
    const editedElements = store.filter(d => d.isEdited).map(d => d.id)
    // console.log('edited elements are ', editedElements)
    setChangeList(editedElements);
  }, [setChangeList, store])


  
  const setNewData = (newData, id) => {

    setStore(store =>
      store.map(object => {

        if (object.id === id) {
          const newObject = {
            ...object,
            data: {...newData, update_timestamp: false},
            isEdited: false
          }

          return newObject
        } else {
          return object
        }
      })
    )
  }


  const setUserInput = userInput => {
    const { newData, field, id } = userInput

    setStore(store =>

      store.map(object => {
        
        if (object.id === id) {
          const newObject = {...object, isEdited: true}
          newObject.data[field] = newData;
          return newObject
        } else {
          return object
        }

      })
    )
  }


  const setTogglePublished = togglePublished => {
    const { e, id } = togglePublished;

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {...object, isEdited: true}
          newObject.data.published = e.target.checked
          return newObject
        } else {
          return object
        }

      })
    )
  }

  // thesaurus specific functions
  const addThesaurusTerm = (id, title, word) => {
    //console.log('addThesaurusTerm: id, title and word', id, title, word)
    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {...object, isEdited: true}
          newObject['data'][title] = object['data'][title].concat(word)
          return newObject
        } else {
          return object
        }
      })
    )
  }

  const delThesaurusTerm = (id, title, word) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {...object, isEdited: true}
          newObject['data'][title] = newObject['data'][title].filter(w => w !== word)
          return newObject
        } else {
          return object
        }
      })
    )
  }

  // blog specific functions
  const toggleUpdateTimestamp = (e, id ) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {...object, isEdited: true}
          newObject.data.update_timestamp = e.target.checked
          return newObject
        } else {
          return object
        }

      })
    )
  }

  const addContent = (id, content_type) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          
          const order = object.data.contents.length + 1

          const newContent = {
            content_type: content_type,
            css: null,
            id: null,
            order: order,
            payload: null,
            post_id: id,
            uri: null
          }

          const newObject = {
            ...object,
            isEdited: true,
            data: {
              ...object.data,
              contents: object.data.contents.concat(newContent)
            } 
          }
          return newObject

        } else {
          return object
        }

      })
    )
  }

  const delContent = (id, order) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {
            ...object,
            isEdited: true,
            data: {
              ...object.data,
              contents: object.data.contents
                .filter(d => d.order !== order)
                .map(d => d.order < order ? d : {...d, order: d.order - 1})
            }
          }
          return newObject
        } else {
          return object
        }

      })
    )
  }


  const moveContentDown = (id, order) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {
            ...object,
            isEdited: true,
            data: {
              ...object.data,
              contents: object.data.contents
                .map(d => 
                  d.order === order ? {...d, order: d.order + 1}
                  : d.order === order + 1 ? {...d, order: d.order - 1}
                  : d
                )
            }
          }
          return newObject
        } else {
          return object
        }

      })
    )
  }

  const moveContentUp = (id, order) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {
            ...object,
            isEdited: true,
            data: {
              ...object.data,
              contents: object.data.contents
                .map(d => 
                  d.order === order ? {...d, order: d.order - 1}
                  : d.order === order - 1 ? {...d, order: d.order + 1}
                  : d
                )
            }
          }
          return newObject
        } else {
          return object
        }

      })
    )
  }

  const setBlogUserInput = (id, order, input, field) => {

    setStore(store =>

      store.map(object => {

        if (object.id === id) {
          const newObject = {
            ...object,
            isEdited: true,
            data: {
              ...object.data,
              contents: object.data.contents
                .map(d => 
                  d.order === order ? {...d, [field]: input}
                  : d
                )
            }
          }
          return newObject
        } else {
          return object
        }

      })
    )
  }


  // api known as dataObject in the rest of the app
  const accessStore = id => {
    const dataObject = store.find(ele => ele.id === id)
    if (!dataObject) {
      const newDataObject = {
        id: id,
        resource: view,
        data: null,
        hasLoaded: false,
        isEdited: false,
        dataHasLoaded: (id) => setDataHasLoadedID(id),
        reload: (id) => setResetDataByID(id),
        updateData: (newData, id) => setNewData(newData, id),
        editData: (newData, field, id) => setUserInput({ newData, field, id }),
        togglePublished: (e, id) => setTogglePublished({ e, id }),
        // view specific methods
        // .. thesaurus:
        addThesaurusTerm: (id, title, word) => addThesaurusTerm(id, title, word),
        delThesaurusTerm: (id, title, word) => delThesaurusTerm(id, title, word),
        // .. blog
        toggleUpdateTimestamp: (e, id) => toggleUpdateTimestamp(e, id),
        addContent: (id, content_type) => addContent(id, content_type),
        delContent: (id, order) => delContent(id, order),
        moveContentUp: (id, order) => moveContentUp(id, order),
        moveContentDown: (id, order) => moveContentDown(id, order),
        setBlogUserInput: (id, order, input, field) => 
              setBlogUserInput(id, order, input, field)
      }
      setStore(store => store.concat(newDataObject))
      return newDataObject;
    }

    return dataObject
  }

  return [accessStore, changeList, resetGenericView, genericViewHasBeenReset]
}
