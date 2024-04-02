import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
        setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])

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
  }

  return (
    <div>
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
}

export default LoginForm