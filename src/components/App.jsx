import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import MainList from './Main'
import { theme } from '../store/ThemeStore'
import { PlayerContainer } from './Player'
import { Errorpage } from './ErrorPage'

const App = () => {
  const player = useRef(null)

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem('themeMode') || 'light'
  )

  const setTheme = () => {
    setThemeMode((themeMode) => {
      return themeMode === 'light' ? 'dark' : 'light'
    })
  }

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode)
  }, [themeMode])

  return (
    <ThemeProvider theme={theme.themes[themeMode]}>
      <MainWrapper>
        <Router>
          <Header setTheme={setTheme} themeMode={themeMode} />
          <div className='container'>
            <Switch>
              <Route path='/search'>
                <MainList player={player} />
              </Route>

              <Route path='/error' component={Errorpage} />
            </Switch>
          </div>
          <PlayerContainer player={player} />
        </Router>
      </MainWrapper>
    </ThemeProvider>
  )
}

const MainWrapper = styled.div`
  body {
    width: 100%;
    background-color: ${(props) => props.theme.primary};
  }
`

export default withTheme(App)
