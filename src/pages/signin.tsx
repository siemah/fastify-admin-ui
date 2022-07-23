import { GetServerSideProps, Redirect } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import A from '../components/a';
import Alert from '../components/alert';
import Button from '../components/button';
import InputField from '../components/input-field';
import Layout from '../components/layout'
import { getUserData } from '../services/auth';
import { StatePropsType } from '../types';

export default function Signin() {
  const router = useRouter();
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
  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/auth/signin`,
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
        });
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000);
      } else {
        setState({
          ...state,
          errors: data.errors
        });
      }
    } catch (error) {
      // @ts-expect-error
      alert(error.message)
    }
  }

  return (
    <Layout title='Sign In'>
      <form onSubmit={onSignIn}>
        <h1>Sign In</h1>
        <Alert
          type={state?.errors?.global ? "error" : "success"}
          message={state?.errors?.global || state?.message}
        />
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
        <Button type='submit'>
          Sign me in
        </Button>
        <A href='/signup'>
          {` `}or create an account
        </A>
      </form>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const headers = {
    cookie: String(req.headers.cookie)
  };
  let redirect: Redirect | undefined = undefined;
  let user = await getUserData('http://localhost:4321', headers);

  if (user?.code === 'success') {
    redirect = {
      destination: '/dashboard',
      permanent: false,
    }
  }

  return {
    props: {},
    redirect
  };
}