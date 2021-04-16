import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import Modal from '../components/Modal'

export default function Home() {
  const [modal, setModal] = useState({
    active: true,
    type: 'info',
    body: 'Hello! start searching for samples by typing in the input above.',
  })
  return (
    <Layout>
      <Head>
        <title>Meere</title>
      </Head>

      <Modal
        active={modal.active}
        body={modal.body}
        setActive={setModal}
        type={modal.type}
      />
      <div
        className='flex-center h-screen-80'
        onClick={() => setModal((m) => ({ ...m, active: true }))}
      >
        <button className='btn'>How to use?</button>
      </div>
    </Layout>
  )
}
