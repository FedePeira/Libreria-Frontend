import PropTypes from 'prop-types'
import BornForm from './BornForm'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BornForm setError={props.setError} authors={authors}/>
    </div>
  )
}

Authors.propTypes = {
  authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        born: PropTypes.number,
        bookCount: PropTypes.number.isRequired,
      })
  ).isRequired,
  show: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
}

export default Authors