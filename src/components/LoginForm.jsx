import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
        props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data ) {
      const token = result.data.login.value
      console.log('Token: ', token)
      props.setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ 
        variables: { username, password },
        onCompleted: (data) => {
            if (data && data.login) {
              alert('Inicio de sesión exitoso');
            }
          },
          onError: (error) => {
            console.error('Error al iniciar sesión:', error);
          }, 
    })
    props.setPage('authors')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setError: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}

export default LoginForm