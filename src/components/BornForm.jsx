import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import Select from 'react-select'

const EDIT_BORN = gql`
  mutation changeBorn($name: String!, $born: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $born
    ) {
       name
       born
    }
   }
`

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const BornForm = ({ setError, authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [born, setBorn] = useState(0)

  const [ changeBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [  {query: ALL_AUTHORS } ],
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const firstError = error.graphQLErrors[0];
        if (firstError.extensions && firstError.extensions.error && firstError.extensions.error.errors) {
          const errors = firstError.extensions.error.errors;
          const messages = Object.values(errors).map(e => e.message).join('\n');
          setError(messages);
        } else {
          setError('An unexpected error occurred.');
        }
     } else {
        setError('An unexpected error occurred.');
     }
    }
  })

  const authorOptions = authors.map(author => ({
    name: author.name, 
    label: `${author.name} (Born: ${author.born})`,
   }));

  const submit = (event) => {
    event.preventDefault()

    if (selectedAuthor) {
        const name = selectedAuthor.name
        changeBorn({ variables: { name, born: parseInt(born, 10) } })
    }

    setSelectedAuthor(null)
    setBorn('')
  }

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <Select
          options={authorOptions}
          value={selectedAuthor}
          onChange={setSelectedAuthor}
          placeholder="Select an author"
        />
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

BornForm.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      born: PropTypes.number,
      bookCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  setError: PropTypes.func.isRequired,
}

export default BornForm