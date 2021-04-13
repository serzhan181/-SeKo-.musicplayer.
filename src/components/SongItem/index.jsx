import React from 'react'
import { GroupDetails, Item, SongImg, SongMetaImg } from './SongItem.style'
import { withTheme } from 'styled-components'

const SongItem = ({
  title,
  author,
  img,
  toggleSetSongOrSwitchState,
  id,
  playingId,
  isPlayingId,
  loadedSongId,
}) => {
  let imageStateSrc =
    isPlayingId !== id ? 'assets/pause_on.svg' : 'assets/play_on.svg'

  return (
    <Item active={playingId === id}>
      <SongImg>
        <img src={img} alt={title} />
        <SongMetaImg
          src={loadedSongId === id ? 'assets/songLoading.svg' : imageStateSrc}
          alt='song state'
          onClick={() => {
            toggleSetSongOrSwitchState(id, { title, author, img, id })
          }}
        />
      </SongImg>
      <GroupDetails>
        <h4 dangerouslySetInnerHTML={{ __html: title }} />
        <span>{author}</span>
      </GroupDetails>
    </Item>
  )
}

export default withTheme(SongItem)
