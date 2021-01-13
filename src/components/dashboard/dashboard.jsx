import React, { useEffect } from 'react';
import { useReducer} from 'react';

import { Overview } from './overview';
import { resourceReducerState, resourceReducer } from './hooks/resourceReducer';
import { GenResourceView } from './genResourceView';
import { SpecificResourceView } from './specificResourceView';

import { useAPI } from './hooks/useAPI';
import { useData } from './hooks/useData';
import { useDataStore } from './hooks/useDataStore';
import { Loading } from './loading';
import { ErrorView } from './errorView';



export function Dashboard({ token, logout }) {
  const [state, dispatch] = useReducer(resourceReducer, resourceReducerState);
  const [callAPI, isLoading] = useAPI(dispatch, token, logout);
  const getData = useDataStore();
  const dataObject = getData(state.view)
  const { hasLoaded } = dataObject;
  const [dataFuncs] = useData(dataObject, dispatch);


  useEffect(() => {
    if (state.view === 'home'|| state.view === 'error') return
    if ((hasLoaded || isLoading)) return
    
    callAPI(state.apiAddress, state.apiArgs, dataObject)
  }, [hasLoaded, isLoading, state, dataObject])


  if (state.view === 'home') {
    return <Overview dispatch={dispatch}/>
  }
  if (state.view === 'error') {
    return (
      <ErrorView
        state={state}
        dispatch={dispatch}
      />
    )
  }

  if (!hasLoaded) {
    return <Loading />
  }

  if (state.view.split('-')[1] === 'gen') {
    return(
      <GenResourceView
        view={ state.view }
        dispatch={dispatch}
        dataObject={dataObject}
        dataFuncs={dataFuncs}
      />
    )

  } else if (state.view.split('-')[1] === 'sp') {
    return(
      <SpecificResourceView
        rawView={ state.view }
        dispatch={dispatch}
        dataObject={dataObject}
        dataFuncs={dataFuncs}
      />
    )

  } else {
    throw new Error('Unexpected view in dashboard')
  }
}