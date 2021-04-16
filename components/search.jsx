import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Search() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    return router.push(`/discover/${query}`)
  }

  return (
    <form className='flex-center' onSubmit={handleSubmit}>
      <input
        className='border text-sm p-1 px-3 rounded focus:outline-none focus:border-gray-500 focus:divide-dashed'
        placeholder='e.g "beat"'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type='text'
      />
      <button className='btn text-xs ml-3'>search</button>
    </form>
  )
}
