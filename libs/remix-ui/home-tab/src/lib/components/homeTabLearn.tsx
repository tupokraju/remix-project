/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { ThemeContext } from '../themeContext'
declare global {
  interface Window {
    _paq: any
  }
}
const _paq = window._paq = window._paq || [] //eslint-disable-line

enum VisibleTutorial {
  Basics,
  Intermediate,
  Advanced
}
interface  HomeTabLearnProps {
  plugin: any
}

function HomeTabLearn ({plugin}: HomeTabLearnProps) {
  const [state, setState] = useState<{
    visibleTutorial: VisibleTutorial
  }>({
    visibleTutorial: VisibleTutorial.Basics
  })

  const themeFilter = useContext(ThemeContext)

  const openLink = () => {
    window.open("https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html?highlight=learneth#learneth-tutorial-repos", '_blank')
  }

  const startLearnEthTutorial = async (tutorial) => {
    await plugin.appManager.activatePlugin(['solidity', 'LearnEth', 'solidityUnitTesting'])
    plugin.call('LearnEth', 'startTutorial', 'ethereum/remix-workshops', 'master', tutorial)
    plugin.verticalIcons.select('LearnEth')
    _paq.push(['trackEvent', 'hometab', 'startLearnEthTutorial', tutorial])
  }

  return (
    <div className="d-flex px-2 pb-2 pt-2 d-flex flex-column" id="hTLearnSection">
      <div className="d-flex justify-content-between">
        <label className="py-2 align-self-center m-0" style={{fontSize: "1.2rem"}}>
          <FormattedMessage id="home.learn" />
        </label>
        <button
          onClick={ ()=> openLink()}
          className="h-100 px-2 pt-0 btn"
        >
          <img className="align-self-center" src="assets/img/learnEthLogo.webp" alt="" style={ { filter: themeFilter.filter, width: "1rem", height: "1ren" } } />
        </button>
      </div>
      <div className="d-flex flex-column">
        <label className="d-flex flex-column btn border" onClick={() => setState((prevState) => {return { ...prevState, visibleTutorial: VisibleTutorial.Basics }})}>
          <label className="card-title align-self-start m-0 float-left" style={{fontSize: "1rem"}}>
            <FormattedMessage id="home.remixBasics" />
          </label>
          {(state.visibleTutorial === VisibleTutorial.Basics) && <div className="pt-2 d-flex flex-column text-left">
            <span>
              <FormattedMessage id="home.remixBasicsDesc" />
            </span>
            <button className="btn btn-sm btn-secondary mt-2" style={{width: 'fit-content'}} onClick={() => startLearnEthTutorial('basics')}>
              <FormattedMessage id="home.getStarted" />
            </button>
          </div>}
        </label>
        <label className="d-flex flex-column btn border" onClick={() => setState((prevState) => {return { ...prevState, visibleTutorial: VisibleTutorial.Intermediate }})}>
          <label className="card-title align-self-start m-0 float-left" style={{fontSize: "1rem"}}>
            <FormattedMessage id="home.remixIntermediate" />
          </label>
          {(state.visibleTutorial === VisibleTutorial.Intermediate) && <div className="pt-2 d-flex flex-column text-left">
            <span>
            <FormattedMessage id="home.remixIntermediateDesc" /></span>
            <button className="btn btn-sm btn-secondary mt-2" style={{width: 'fit-content'}} onClick={() => startLearnEthTutorial('useofweb3js')}>
            <FormattedMessage id="home.getStarted" />
          </button>
          </div>}
        </label>
        <label className="d-flex flex-column btn border" onClick={() => setState((prevState) => {return { ...prevState, visibleTutorial: VisibleTutorial.Advanced }})}>
          <label className="card-title align-self-start m-0 float-left" style={{fontSize: "1rem"}}>
            <FormattedMessage id="home.remixAdvanced" />
          </label>
          {(state.visibleTutorial === VisibleTutorial.Advanced) && <div className="pt-2 d-flex flex-column text-left">
            <span>
            <FormattedMessage id="home.remixAdvancedDesc" /></span>
            <button className="btn btn-sm btn-secondary mt-2" style={{width: 'fit-content'}} onClick={() => startLearnEthTutorial('deploylibraries')}>
            <FormattedMessage id="home.getStarted" />
          </button>
          </div>}
        </label>
      </div>
    </div>
  )
}

export default HomeTabLearn
