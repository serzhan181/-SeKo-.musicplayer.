import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import PlayerComponent from '../components/player'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <PlayerComponent />
    </>
  )
}

export default MyApp
