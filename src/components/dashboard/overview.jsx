 
export function Overview({ dispatch }) {
  return (
    <main className='main-dashboard'>

      <div className='overview'>
        <div className='overview-header'>
          <h1 className='overview-header-h1'>Dashboard</h1>
        </div>
        <div className='overview-button-box'>
          <button onClick={() => dispatch({type: 'quotes-gen'})}>Quotes</button>
          <button onClick={() => dispatch({type: 'resources-gen'})}>Resources</button>
          <button onClick={() => dispatch({type: 'videos-gen'})}>Videos</button>
          <button onClick={() => dispatch({type: 'blog-gen'})}>Blog</button>
          <button onClick={() => dispatch({type: 'thesaurus-gen'})}>Thesaurus</button>
        </div>
      </div>
    </main>
    
  )
}