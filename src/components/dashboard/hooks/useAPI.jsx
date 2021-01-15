import { useCallback, useEffect, useState } from 'react';


export function useAPI(dispatch, token, logout){

  // const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [APIAddress, setAPIAddress] = useState(null);
  const [dataObject, setDataObject] = useState(null);
  const [APIArgs, setAPIArgs] = useState(null);

  const resetAPICall = useCallback(() => {
    // console.log('resetting api call')
    setAPIAddress(null);
    setAPIArgs(null);
    setLoadData(false);
    dataObject.dataHasLoaded();
    setIsLoading(false);
    setDataObject(null);
  }, [dataObject])

  const errorReset = () => {
    // console.log('error reset in api call')
    setAPIAddress(null);
    setAPIArgs(null);
    setLoadData(false);
    setIsLoading(false);
    setDataObject(null);
  }


  useEffect(() => {
    if (!loadData) return;
    // console.log('calling api with the following args: ', APIArgs, APIAddress, dataObject)
    setIsLoading(true)
    setLoadData(false)

    // add authentication to the header
    const authArgs = {
      ...APIArgs,
      headers: {
        ...APIArgs.headers,
        'authorization': 'Bearer ' + token
      }
    }

    // make api call
    fetch(APIAddress, authArgs)
      .then(r => {

        if (!r.ok) {
          if (r.status === 401) {
            logout('Your session expired - please login and try again. (note that your data is still saved here in the browser, but not yet saved to the server)')
          }
          dispatch({
            type: 'error',
            payload: {
              errorCode: r.status
            }
          })
          errorReset()
        } else {
          return r.json()
        }
      })
      .then(data => {
        if (data) {
          //console.log('got data ',  data)
          setIsLoading(false);
          dataObject.updateData(data, dataObject.id);
          dataObject.dataHasLoaded(dataObject.id);
          //console.log('just updated data for ', dataObject.id)
          resetAPICall();
        }
      })
      .catch((error => {
        console.log(error)
      }))

  }, [loadData, APIArgs, APIAddress, dataObject, resetAPICall])


  const callAPI = (APIAddress, APIArgs, dataObject) => {
    //console.log('entered callAPI')
    setAPIAddress(APIAddress);
    setAPIArgs(APIArgs);
    setDataObject(dataObject);
    setLoadData(true);
    setIsLoading(true);
  }
  




  return [callAPI, isLoading];
}
