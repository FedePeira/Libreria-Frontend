import PropTypes from 'prop-types';
import Book from './Book'
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const ALL_GENRES = gql`
query {
  allGenres
}
`

const Books = (props) => {
  const genres = useQuery(ALL_GENRES, {
    pollInterval: 2000
  })
  const [genre, setGenre] = useState()
  const books = props.books


  if (!props.show) {
    return null
  }

  const showBooks = () => {
    if(!genre) {
      return books.map((b) => {
        return(
          <tr key={b.title}>
            <Book key={b.title} book={b}/>
          </tr>
        )
      })
    } else {
      return books.map((b) => (
        b.genres.includes(genre) ? (
          <tr key={b.title}>
            <Book key={b.title} book={b}/>
          </tr>
        ) : null
      ))
    }
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {showBooks()}
        </tbody>
      </table>
      <div>
        {
          genres.data.allGenres.map((g) =>(
            <button key={g} onClick={() => setGenre(g)}>{g}</button>
          ))
        }
      </div>
    </div>
  )
}

Books.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      born: PropTypes.number,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  show: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    published: PropTypes.number.isRequired,
 })).isRequired,
}
export default Books