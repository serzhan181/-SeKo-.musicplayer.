import Image from 'next/image'
import Search from './search'

export default function Layout({ children }) {
  return (
    <>
      <header className='border-b  flex-center flex-col'>
        <div className='h-10 flex justify-between container'>
          <Search />
          <div className='flex-center'>
            <span className='text-xs mr-1'>Powered by</span>
            <a
              className='underline font-semibold'
              target='__blank'
              href='https://vercel.com'
            >
              <Image src='/vercel.svg' width={100} height={50} alt='vercel' />
            </a>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </>
  )
}
