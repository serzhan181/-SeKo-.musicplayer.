import React, { useState, useEffect } from 'react'
import { audio } from '../../store/MainStore'
import { observer } from 'mobx-react-lite'
import Player from './Player.jsx'

export const PlayerContainer = observer(({ player }) => {
  const [curTime, setCurTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState({ notMuted: true, curVolume: 1 })
  const dur = player.current?.duration

  const toggleMuteVolume = () => {
    setMuted((muted) => ({
      ...muted,
      notMuted: !muted.notMuted,
      curVolume: volume,
    }))

    if (muted.notMuted) {
      setVolume(0)
      player.current.volume = 0
    } else {
      setVolume(muted.curVolume)
      player.current.volume = muted.curVolume
    }
  }

  const handleVolume = (v) => {
    if (!muted.notMuted) {
      toggleMuteVolume()
    } else if (v === 0) setMuted({ ...muted, notMuted: false })

    setVolume(v)
    player.current.volume = v
  }

  const handleProgress = (e) => {
    let duration = dur === Infinity ? 20 : dur

    let compute = Math.floor((e.target.value * duration) / 100)

    setCurTime(compute)
    player.current.currentTime = compute
  }

  useEffect(() => {
    if (audio.isPlayingId) {
      player.current.play()
    } else {
      player.current.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio.isPlayingId, audio.curSong, player])

  const [errDisplayValue, setErrDisplayValue] = useState('none')
  const [isModalOpened, setIsModalOpened] = useState(false)

  useEffect(() => {
    if (isModalOpened) {
      document.body.style.overflow = 'hidden'
      setErrDisplayValue('flex')
    } else {
      document.body.style.overflow = 'visible'
      setErrDisplayValue('none')
    }
  }, [isModalOpened])

  return (
    <Player
      player={player}
      setCurTime={setCurTime}
      volume={volume}
      handleVolume={handleVolume}
      handleProgress={handleProgress}
      curTime={curTime}
      dur={dur}
      toggleMuteVolume={toggleMuteVolume}
      notMuted={muted.notMuted}
      errDisplayValue={errDisplayValue}
      setErrDisplayValue={setErrDisplayValue}
      isModalOpened={isModalOpened}
      setIsModalOpened={setIsModalOpened}
    />
  )
})
