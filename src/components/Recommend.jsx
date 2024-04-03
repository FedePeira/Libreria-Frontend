import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Book from './Book'

const GET_USER =  gql`
query {
 me{
    username
    favoriteGenre
 }
}
`

const Recommend = (props) => {
  const user = useQuery(GET_USER, {
    pollInterval: 2000
  })
  const allBooks = props.books

  if (!props.show) {
    return null
  }

  if(!user){
    return null
  }

  const showBooks = () => {
    const genre = user.data.me.favoriteGenre

    if(!genre) {
      return ( 
        <tr>
          <td>No favorite genre</td>
        </tr>
      )
    } else {
      return allBooks.map((b) => (
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
      <h2>Recommended</h2>

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
    </div>
  )
}

Recommend.propTypes = {
  show: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    published: PropTypes.number.isRequired,
  })).isRequired
}
export default Recommend