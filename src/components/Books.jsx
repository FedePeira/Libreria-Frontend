import PropTypes from 'prop-types';
import Book from './Book'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <Book key={b.title} book={b}/>
            </tr>
          ))}
        </tbody>
      </table>
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