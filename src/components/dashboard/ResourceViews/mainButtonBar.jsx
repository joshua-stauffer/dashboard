
export function MainButtonBar({backFunc, homeFunc, saveFunc, isEdited}) {

  return (
    <div className='header-button-box'>
      <button onClick={backFunc}>Back</button>
      <button onClick={homeFunc}>Home</button>
      <button title='Save' onClick={saveFunc} disabled={isEdited === true ? false : true}>Save</button>
    </div>
  )
}