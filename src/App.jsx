import { useEffect, useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

import { gql, useApolloClient, useQuery } from '@apollo/client'

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
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    setPage('authors')
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (books.loading)   {
    return <div>loading...</div>
  }

  if (authors.loading)   {
    return <div>loading...</div>
  }

  if(!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <LoginForm
          setPage={setPage}
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
        />

        <Authors show={page === 'authors'} authors={authors.data.allAuthors} setError={notify}/>
        <Books show={page === 'books'} books={books.data.allBooks} authors={authors.data.allAuthors}/>
      </>
    )
  }

  return (
    <>
      <Notify errorMessage={errorMessage}/>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} setError={notify}/>

      <Books show={page === 'books'} books={books.data.allBooks} authors={authors.data.allAuthors}/>

      <NewBook show={page === 'add'}  />
    </>
  )
}

export default App