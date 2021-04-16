export const fetchData = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return { data, error: false }
  } catch (e) {
    return { error: 'Something went wrong...' } // API is so easy so that rarely happen
  }
}
