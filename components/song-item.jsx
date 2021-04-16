import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import { player } from '../stores/player.state'

const SongItem = observer(({ imageUrl, title, authorName, id }) => {
  const sampleImg =
    player.isSongLoadingId === id
      ? 'loaders/three-dots.svg'
      : player.currentPlaying?.isPlayingId === id
      ? 'play_on.svg'
      : 'pause_on.svg'
  return (
    <div
      className={`flex border-b border-gray-400 hover:bg-gray-200 ${
        sampleImg === 'play_on.svg' && 'bg-gray-200'
      }  h-auto`}
    >
      <div className='relative flex-center select-none'>
        <div
          className={`${
            sampleImg === 'play_on.svg' ? 'opacity-100' : 'opacity-0'
          } hover:opacity-100 absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity`}
          onClick={() => player.setSample({ imageUrl, title, authorName, id })}
        >
          <Image
            src={`/images/${sampleImg}`}
            className='bg-white rounded-full'
            width={40}
            height={40}
            alt='play'
          />
        </div>
        <div className='w-16 h-16 overflow-hidden'>
          <Image
            className='object-cover'
            src={imageUrl}
            width={150}
            height={150}
            alt={title}
          />
        </div>
      </div>
      <div className='ml-4 py-2 cursor-default'>
        <h1 className='font-semibold'>{title}</h1>
        <p className='text-sm text-gray-600'>{authorName}</p>
      </div>
    </div>
  )
})

export default SongItem
