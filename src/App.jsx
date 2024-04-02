import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'
import PropTypes from 'prop-types';

const ALL_BOOKS = gql`
query {
  allBooks { 
    title 
    author
    published 
    genres
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

const App = () => {
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (books.loading)   {
    return <div>loading...</div>
  }

  if (authors.loading)   {
    return <div>loading...</div>
  }

  console.log(authors.data.allAuthors)
  console.log(books.data.allBooks)

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} setError={notify}/>

      <Books show={page === 'books'} books={books.data.allBooks} authors={authors.data.allAuthors}/>

      <NewBook show={page === 'add'}  />
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}
Notify.propTypes = {
 errorMessage: PropTypes.string,
};

export default App