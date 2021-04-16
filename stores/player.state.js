import { makeAutoObservable, runInAction } from 'mobx'
import { fetchData } from '../helpers/fetchData'
import { parseSamples } from '../helpers/parseSamples'

class Player {
  constructor() {
    makeAutoObservable(this)
  }

  samples = []

  isSongLoadingId = false
  setIsSongLoaingId = (value) => {
    this.isSongLoadingId = value
  }
  currentPlaying = null

  toggleIsPlayingId = (id) => {
    console.log(id)
    if (this.currentPlaying?.isPlayingId !== null) {
      this.currentPlaying.isPlayingId = null
    } else this.currentPlaying.isPlayingId = id
  }

  fetchSamples = async (query) => {
    this.samples = null
    const { data, error } = await fetchData(
      `https://young-oasis-52093.herokuapp.com/search?q=${query}`
    )
    if (error) {
      this.setIsLoading(false)
      return { error }
    }
    const parsed = parseSamples(data)
    runInAction(() => {
      this.samples = parsed
    })
  }

  setSample = async (sampleData) => {
    const { id } = sampleData
    this.setIsSongLoaingId(id)
    const { data, error } = await fetchData(
      `https://young-oasis-52093.herokuapp.com/song?id=${id}`
    )
    if (error) return { error }
    runInAction(() => {
      this.currentPlaying = { ...sampleData, sampleURL: data, isPlayingId: id }
    })
    this.setIsSongLoaingId(false)
  }

  setNext = async (id) => {
    const idxInArr = this.samples.findIndex((s) => s.id === id)

    let nextSong

    if (idxInArr === this.samples.length - 1) nextSong = this.samples[0]
    else nextSong = this.samples[idxInArr + 1]

    await this.setSample(nextSong)
  }

  setPrev = async (id) => {
    const idxInArr = this.samples.findIndex((s) => s.id === id)

    let prevSong

    if (idxInArr === 0) prevSong = this.samples[this.samples.length - 1]
    else prevSong = this.samples[idxInArr - 1]

    await this.setSample(prevSong)
  }
}

export const player = new Player()
