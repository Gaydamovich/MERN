import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/loader'
import {ListLinks} from '../components/ListLinks'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {request, loading} = useHttp()
  const {token} = useContext(AuthContext)

  const getLinks = useCallback(async () => {
    try {
      const data = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(data)
    } catch (e) {}
  }, [request, token])

  useEffect(() => {
    getLinks()
  }, [getLinks])

  if (loading) return <Loader />

  return (
    <div className="container">
      <h1>Links</h1>
      {!loading && <ListLinks links={links}/>}
    </div>
  )
}