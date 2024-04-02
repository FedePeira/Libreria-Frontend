import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import PropTypes from 'prop-types'

const FIND_AUTHOR_QUERY = gql`
 query FindAuthor($id: ID!) {
    findAuthorById(authorId: $id) {
      name
    }
 }
`

const Book = ({ book }) => {
 const { loading, error, data } = useQuery(FIND_AUTHOR_QUERY, {
    variables: { id: book.author },
 })

 if (loading) return <td>Loading...</td>
 if (error) return <td>Error :(</td>

 return (
    <>
      <td>{book.title}</td>
      <td>{data.findAuthorById.name}</td>
      <td>{book.published}</td>
    </>
 )
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    published: PropTypes.number.isRequired, 
  }).isRequired
}

export default Book