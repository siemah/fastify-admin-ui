import React, { useState } from 'react';
import A from '../components/a';
import Button from '../components/button';
import InputField from '../components/input-field';
import Layout from '../components/layout'
import { StatePropsType } from '../types';

export default function Signup() {
  const [state, setState] = useState<StatePropsType>({
    errors: null,
    data: {},
    message: null,
    loading: false,
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value
      }
    });
  }
  const onSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/auth/signup`,
        {
          method: 'POST',
          body: JSON.stringify(state.data),
          headers: {
            'content-type': 'application/json'
          }
        }
      );
      const data = await response.json();

      if (data.code === 'success') {
        setState({
          ...state,
          message: data.message
        })
      } else {
        setState({
          ...state,
          errors: data.errors
        });
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Layout title='Sign Up'>
      <form onSubmit={onSignUp}>
        <h1>Sign Up</h1>
        <InputField
          name='email'
          label='Email'
          type='email'
          autoFocus={true}
          error={state?.errors?.email}
          onChange={onChange}
        />
        <InputField
          name='password'
          label='Password'
          type='password'
          error={state?.errors?.password}
          onChange={onChange}
        />
        <InputField
          name='fullname'
          label='Full name'
          error={state?.errors?.fullname}
          onChange={onChange}
        />
        <InputField
          type='textarea'
          name='bio'
          label='Bio'
          error={state?.errors?.bio}
          onChange={onChange}
        />
        <Button type='submit'>
          Register
        </Button>
        <A href='/signin'>
          {` `}or sign in
        </A>
      </form>
    </Layout>
  );
}
