import { useCallback, useEffect, useState } from 'react';


export function useAPI(dispatch, token, logout){

  // const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [APIAddress, setAPIAddress] = useState(null);
  const [dataObject, setDataObject] = useState(null);
  const [APIArgs, setAPIArgs] = useState(null);

  const resetAPICall = useCallback(() => {
    setAPIAddress(null);
    setAPIArgs(null);
    setLoadData(false);
    dataObject.dataHasLoaded();
    setIsLoading(false);
    setDataObject(null);
  }, [dataObject])

  const errorReset = () => {
    setAPIAddress(null);
    setAPIArgs(null);
    setLoadData(false);
    setIsLoading(false);
    setDataObject(null);
  }


  useEffect(() => {
    if (!loadData) return;
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

        // errors
        if (!r.ok) {
          if (r.status === 429) {
            // hit rate limiter - gracefully ignore
          }
          else {
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
          }

        // no errors
        } else {
          return r.json()
        }
      })
      .then(data => {
        if (data) {
          setIsLoading(false);
          dataObject.updateData(data, dataObject.id);
          dataObject.dataHasLoaded(dataObject.id);
          resetAPICall();
        }
      })
      .catch((error => {
        // console.log(error)
      }))

  }, [loadData])


  const callAPI = (APIAddress, APIArgs, dataObject) => {
    setAPIAddress(APIAddress);
    setAPIArgs(APIArgs);
    setDataObject(dataObject);
    setLoadData(true);
    setIsLoading(true);
  }
  




  return [callAPI, isLoading];
}
