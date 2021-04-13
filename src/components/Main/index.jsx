import React, { useEffect } from 'react'
import { audio } from '../../store/MainStore'
import { observer } from 'mobx-react-lite'
import { Preloader } from '../Preloader'
import SongItem from '../SongItem'
import { MainList } from './Main.style'
import { withTheme } from 'styled-components'
import { useQuery } from '../../hooks/useQuery'

const Main = observer(({ player }) => {
  const query = useQuery()

  audio.setSongsOnSearch(query.get('q'))

  const toggleSetSongOrSwitchState = (songId, songData) => {
    const state = audio.checkSongHasBeenSet(songId)

    if (!state) {
      audio.setSong(songData)
    }
  }

  useEffect(() => {
    if (audio.isPlayingId) {
      player.current.play()
    } else {
      player.current.pause()
    }
  }, [player])

  return (
    <>
      {!audio.haveSongsLoaded ? (
        <Preloader />
      ) : (
        <MainList>
          {audio.songs.map((s) => (
            <SongItem
              key={s.id}
              title={s.title}
              author={s.author}
              img={s.img}
              toggleSetSongOrSwitchState={toggleSetSongOrSwitchState}
              id={s.id}
              playingId={audio.curSong?.id}
              isPlayingId={audio.isPlayingId}
              loadedSongId={audio.loadedSongId}
            />
          ))}
        </MainList>
      )}
    </>
  )
})

export default withTheme(Main)
