import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
  const auth = useContext(AuthContext)
  const [link, setLink] = useState('')
  const {request} = useHttp()
  const history = useHistory()

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        console.log(link)
        const data = await request('/api/link/generate', 'POST', {from: link} ,{
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/details/${data.link._id}`)
      } catch (e) {

      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            onChange={e => setLink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Ссылка</label>
        </div>
      </div>
    </div>
  )
}