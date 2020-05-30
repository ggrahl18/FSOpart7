import { useState } from 'react'

const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    reset,
    fill: {
      name,
      value,
      onChange
    }
  }
}

export default useField