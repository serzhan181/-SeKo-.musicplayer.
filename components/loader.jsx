import Image from 'next/image'

export default function Loader() {
  return (
    <div className='flex-center h-screen-80'>
      <Image
        src='/images/loaders/tail-spin.svg'
        className='text-gray-900'
        width={35}
        height={35}
      />
    </div>
  )
}
