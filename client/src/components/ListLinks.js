import React from 'react'
import {Link} from 'react-router-dom'

export const ListLinks = ({links}) => {
  if (!links.length) {
    return <p>Ничего не найдено</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>To</th>
        <th>From</th>
        <th>Date</th>
        <th>Перейти</th>
      </tr>
      </thead>

      <tbody>
      {links.map(link => {
        return <tr key={link._id}>
          <td>{link.to}</td>
          <td>{link.from}</td>
          <td>{new Date(link.date).toLocaleDateString()}</td>
          <td>
            <Link to={`/details/${link._id}`}>
              Открыть
            </Link>
          </td>
        </tr>
      })}
      </tbody>
    </table>
  )
}