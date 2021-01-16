import { BlogButtons } from './blogButtons';

export function BlogIMG({ uri, payload, css, setInput, title, blogButtonsProps }) {
  return (
    <div className='sp-item'>

        <div className='blog-col-1'>
          <p className='sp-label'>{ title }</p>
          <BlogButtons
            {...blogButtonsProps}
          />
        </div>


      <div className='iframe-preview'>
        <img
          src={ uri }
          alt={ payload }
        />
      </div>
      
      <div className="blog-end">

          <a href="https://cloudinary.com/users/login" target="_blank">
          Upload image here, then copy the url and paste it below.
          </a>

      </div>

      <label>
        <p className='sp-label'>Image Source</p>
        <input
          type='text'
          value={ uri }
          className='blog-input'
          onChange={ (e) => setInput(e.target.value, 'uri') }
        />
      </label>

      <label>
        <p className='sp-label'>Alternate Text</p>
        <input
          type='text'
          value={ payload }
          onChange={ (e) => setInput(e.target.value, 'payload') }
          className='blog-input'
        />
      </label>

      <label>
        <p className='sp-label'>Image Position</p>
        <select
          value={css}
          onChange={ (e) => setInput(e.target.value, 'css') }
        >
          <option value='float: right;'>Right</option>
          <option value='float: left;'>Left</option>
        </select>
      </label>
    </div>
  )
}