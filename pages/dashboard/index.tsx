import { GetServerSideProps, Redirect } from 'next';
import React, { useEffect, useRef, useState } from 'react'
import ApiKeyForm from '../../components/api-key-form';
import Layout from '../../components/layout'
import { getUserData } from '../../services/auth';
import { StatePropsType } from '../../types'

export default function Home() {
  let isMounted = useRef(true);
  const [state, setState] = useState<StatePropsType>({
    loading: true,
    data: {},
    errors: null,
    message: null,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await fetch('/api/keys/list');
        const data = await response.json();
        if (data.code === 'success') {
          isMounted.current && setState({
            ...state,
            loading: false,
            data: data.data,
          });
        } else {
          isMounted.current && setState({
            ...state,
            loading: false,
            errors: data.errors,
          });
        }
      } catch (error) {
        alert(error)
        isMounted.current && setState({
          ...state,
          loading: false,
          errors: {
            global: 'Something went wrong, please try again!'
          }
        });
      }
    }
    loadInitialData();

    return () => {
      isMounted.current = false;
    }
  }, []);


  return (
    <Layout title='Dashboard Home'>
      <div>
        <h1>
          Api keys:
        </h1>
        {
          state.loading === true
            ? <h2>Loading keys..</h2>
            : (
              state.data.keys?.map((keyData: Record<string, any>) => (
                <div key={`key-${keyData.key}`}>
                  <h2>{keyData.title} - {keyData.domain}</h2>
                  <mark>{keyData.key}</mark>
                  <p>{keyData.description}</p>
                  <time>{new Date(keyData.createdAt).toDateString()}</time>
                </div>
              ))
            )
        }
        <ApiKeyForm />
      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const headers = {
    cookie: String(req.headers.cookie)
  };
  let redirect: Redirect | undefined = undefined;
  const user = await getUserData('http://localhost:4321', headers);

  if (user?.code !== 'success') {
    redirect = {
      destination: '/signin',
      permanent: false,
    }
  }

  return {
    props: {},
    redirect
  };
}