import React, { useState } from 'react'
import { StatePropsType } from '../../types'
import Alert from '../alert';
import Button from '../button'
import InputField from '../input-field'

export default function ApiKeyForm() {
  const [state, setState] = useState<StatePropsType>({
    loading: false,
    data: {},
    errors: null,
    message: null
  });
  const onCreateNewKey = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({
      ...state,
      loading: true,
    });
    const formData = new FormData(event.currentTarget);
    let data = {};
    for (var [key, value] of formData.entries()) {
      data = {
        ...data,
        [key]: value
      };
    }
    try {
      const response = await fetch('/api/keys/create', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const newKey = await response.json();
      if (newKey.code === 'success') {
        setState({
          ...state,
          loading: false,
          message: newKey.message
        });
      } else {
        setState({
          ...state,
          loading: false,
          errors: newKey.errors
        });
      }
    } catch (error) {
      console.log(error)
      setState({
        ...state,
        loading: false,
        errors: {
          // @ts-expect-error
          global: error.message
        }
      });
    }
  }
  return (
    <form onSubmit={onCreateNewKey}>
      <h2>Create New Key</h2>
      <Alert
        message={state.message || state.errors?.global}
        type={state.message ? 'success' : 'error'}
      />
      <InputField
        name='title'
        label='Name'
        error={state.errors?.title}
        autoFocus
      />
      <InputField
        name='domain'
        label='Domain'
        error={state.errors?.domain}
      />
      <InputField
        name='description'
        label='Describe your key usage'
        error={state.errors?.description}
      />
      <Button
        type='submit'
        disabled={state.loading}
      >
        create new key
      </Button>
    </form>
  )
}
