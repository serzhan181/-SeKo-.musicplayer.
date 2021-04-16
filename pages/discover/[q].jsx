import Head from 'next/head'
import { useRouter } from 'next/router'
import { player } from '../../stores/player.state'
import Layout from '../../components/layout'
import SongItem from '../../components/song-item'
import Loader from '../../components/loader'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const Discover = observer(() => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.q) {
      player.fetchSamples(router.query.q)
    }
  }, [router.query.q])

  return (
    <Layout>
      <Head>
        <title>{router.query.q}</title>
        <meta name='keywords' content={router.query.q} />
      </Head>
      {player.samples ? (
        <div className='flex-center flex-col'>
          <div className='container'>
            <h1 className='text-xl mt-2 mb-5 underline cursor-default'>
              Results for "{router.query.q}"
            </h1>
            <div className='w-full'>
              {player.samples.map((s) => (
                <SongItem
                  key={s.id}
                  {...{
                    authorName: s.authorName,
                    title: s.title,
                    imageUrl: s.imageUrl,
                    id: s.id,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  )
})

export default Discover
