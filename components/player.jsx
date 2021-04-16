import { player } from '../stores/player.state'
import Image from 'next/image'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Modal from './Modal'

const PlayerComponent = observer(() => {
  const playerRef = useRef(null)
  const [curDur, setCurDur] = useState(0)
  const dur = playerRef.current?.duration

  const [volume, setVolume] = useState(0.3)

  const [muted, setMuted] = useState({ isMuted: false, curVolume: volume })

  const toggleMuted = () => {
    setMuted({ isMuted: !muted.isMuted, curVolume: volume })

    if (muted.isMuted) {
      setVolume(muted.curVolume)
      return (playerRef.current.volume = muted.curVolume)
    }

    setVolume(0)
    return (playerRef.current.volume = 0)
  }

  const handleVolume = (v) => {
    if (muted.isMuted) {
      toggleMuted()
    } else if (v === 0) setMuted({ ...muted, isMuted: true })

    const computed = v.target.value / 100
    setVolume(computed)
    playerRef.current.volume = computed
  }

  const handleProgress = (e) => {
    const duration = dur === Infinity ? 20 : dur
    const compute = Math.floor((e.target.value * duration) / 100)
    playerRef.current.currentTime = compute
    setCurDur(compute)
  }

  useEffect(() => {
    if (player.currentPlaying?.isPlayingId) {
      return playerRef.current.play()
    } else {
      playerRef.current.pause()
    }
  }, [player.currentPlaying?.isPlayingId, player.currentPlaying, player])

  const [modalState, setModalState] = useState({
    active: false,
    type: null,
    body: null,
  })
  const handleSampleCrush = () => {
    setModalState({
      active: true,
      type: 'error',
      body: "There's something wrong with this sample. Try other one, please",
    })
  }

  return (
    <>
      <audio
        onTimeUpdate={(e) => setCurDur(e.target.currentTime)}
        onEnded={() => player.setNext(player.currentPlaying?.id)}
        src={player.currentPlaying?.sampleURL}
        ref={playerRef}
        type='audio/mpeg'
        preload='true'
        autoPlay={true}
        onError={handleSampleCrush}
      ></audio>
      <Modal
        active={modalState.active}
        setActive={setModalState}
        body={modalState.body}
      />
      <div
        className={cn(
          'transform transition-transform',
          {
            'translate-y-20': !player.currentPlaying,
            'translate-y-0': player.currentPlaying,
          },
          'fixed h-14 w-full bottom-0 left-0 right-0 z-50 px-3 bg-gray-50'
        )}
      >
        {player.currentPlaying && (
          <>
            <div className='grid grid-cols-2 md:grid-cols-3'>
              <div className='w-full flex-center'>
                <div className='flex-center gap-4 lg:gap-10 w-max'>
                  <Icon
                    src='/images/prev.svg'
                    onClick={() => player.setPrev(player.currentPlaying?.id)}
                  />
                  <Icon
                    src={
                      player.currentPlaying?.isPlayingId
                        ? '/images/play_on.svg'
                        : '/images/pause_on.svg'
                    }
                    width={40}
                    height={40}
                    onClick={() =>
                      player.toggleIsPlayingId(player.currentPlaying?.id)
                    }
                  />
                  <Icon
                    src='/images/forward.svg'
                    onClick={() => player.setNext(player.currentPlaying?.id)}
                  />
                </div>
              </div>
              <div className='hidden md:flex gap-2'>
                <div className='flex-center'>
                  <Image
                    src={
                      player.currentPlaying?.imageUrl ||
                      'https://i.ytimg.com/vi/InaBFl-cXEo/mqdefault.jpg'
                    }
                    width={30}
                    height={30}
                    className='rounded-full animate-spin-slow'
                  />
                </div>
                <h3 className='text-sm font-semibold text-center mt-2'>
                  {player.currentPlaying?.title}
                </h3>
              </div>
              <div className='flex-center'>
                <div className='flex-center gap-2'>
                  <Icon
                    src={
                      muted.isMuted
                        ? '/images/volume-muted.svg'
                        : '/images/volume.svg'
                    }
                    onClick={toggleMuted}
                  />
                  <input
                    type='range'
                    className='text-gray-900 w-40 outline-none'
                    value={volume * 100}
                    onChange={handleVolume}
                  />
                </div>
              </div>
            </div>
            <div className='relative'>
              <input
                type='range'
                className='w-full absolute h-4/5 bg-transparent left-0 -top-12 outline-none'
                title={player.currentPlaying?.title}
                value={dur ? (curDur * 100) / dur : 0}
                onChange={handleProgress}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
})

export default PlayerComponent

function Icon({ src, ...restProps }) {
  return (
    <Image
      src={src}
      width={20}
      height={20}
      className='cursor-pointer'
      {...restProps}
    />
  )
}
