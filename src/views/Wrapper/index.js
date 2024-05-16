import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, SearchIcon } from '@heroicons/react/solid'
import { MoonIcon, SunIcon, CogIcon } from '@heroicons/react/outline'
import components from 'components'
import axios from 'axios'
import services from 'services'

class Wrapper extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      pumpkinInfo: {},
    }
  }

  componentDidMount() {
    var headers = {}
    var url =
      'https://api.dexscreener.com/latest/dex/pairs/fantom/0xA73d251D37040ADE6e3eFf71207901621c9C867a'
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response)
        }
        return response.json()
      })
      .then((data) => {
        var pumpkinInfo = data
        this.setState({ pumpkinInfo: pumpkinInfo })
        console.log(this.state)
      })
      .catch(function (error) {
        console.log('price ticker issue: ', error)
      })
  }
  toggleMenu = () => {
    this.setState((state) => ({
      menuOpen: !state.menuOpen,
    }))
  }
  toggleDarkmode = () => {
    this.props.setDarkmode(!this.props.isDarkmode)
  }

  render() {
    return (
      <div
        className={`font-poppins`}
        style={{
          backgroundImage: `url(${services.linking.static('images/bg.svg')})`,
        }}
      >
        <components.Modal ref={(ref) => (this.searchModal = ref)}>
          <div className="font-bold"></div>
          <components.DomainSearch
            onBeforeSubmit={() => this.searchModal.toggle()}
            modal={true}
          />
        </components.Modal>
        <components.Modal ref={(ref) => (this.browserModal = ref)}>
          <div className="font-bold"></div>
          <components.UpcomingNews />
        </components.Modal>
        {/* Mobile menu */}
        <div
          className="fixed top-0 bg-white dark:bg-gray-900 h-full left-0 w-screen z-10 transition-all"
          style={{
            left: '100%',
            transform: this.state.menuOpen
              ? 'translateX(-100%)'
              : 'translateX(0)',
          }}
        >
          <div
            className="absolute top-0 right-0 p-4 cursor-pointer"
            onClick={this.toggleMenu.bind(this)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="font-poppins flex-col flex items-center h-full p-4">
            <Link
              to={services.linking.path('Landing')}
              onClick={this.toggleMenu.bind(this)}
            >
              <div
                className="dark:bg-white mb-4"
                style={{ borderRadius: '500px' }}
              >
                <img
                  src={services.linking.static('images/logo.png')}
                  className="w-12 md:w-14 m-auto dark:w-12 dark:md:w-12"
                  alt="FNS Domains"
                />
              </div>
            </Link>
            <div className="mb-2 w-full">
              <components.DomainSearch
                onBeforeSubmit={this.toggleMenu.bind(this)}
              />
            </div>
            <Link
              className="block text-lg p-2 w-full h-16 flex items-center justify-between"
              to={services.linking.path('MyDomains')}
              onClick={this.toggleMenu.bind(this)}
            >
              <div>My Domains</div>
              <ArrowRightIcon className="w-6" />
            </Link>

            <div
              className="block text-lg p-2 w-full h-16 flex items-center justify-between"
              onClick={() => {
                this.browserModal.toggle()
                this.toggleMenu.bind(this)
              }}
            >
              <div>Open Browser</div>
              <ArrowRightIcon className="w-6" />
            </div>
            <div className="block text-lg p-2 w-full h-16 flex items-center justify-between">
              <a href="https://spooky.fi/#/swap?outputCurrency=0xad522217e64ec347601015797dd39050a2a69694">
                <img
                  src={services.linking.static('images/pumpkin_symbol.png')}
                  alt="Powered by Fantom."
                  className="inline-block object-scale-down w-5 h-5 m-2"
                />
                <span className="text-sm md:text-sm">
                  {this.state.pumpkinInfo?.pair?.priceUsd}
                </span>
              </a>
              <ArrowRightIcon className="w-6" />
            </div>
            <div className="w-full h-1 bg-gray-100 dark:bg-gray-800"></div>
            <div>
              <div className="font-poppins mr-4 text-md">
                <div
                  className="py-8 px-4 cursor-pointer"
                  onClick={() => this.props.setDarkmode(!this.props.isDarkmode)}
                >
                  {this.props.isDarkmode ? (
                    <SunIcon className="w-6" />
                  ) : (
                    <MoonIcon className="w-6" />
                  )}
                </div>
              </div>
            </div>
            <div className="h-24"></div>
          </div>
          <div className="absolute bottom-0 mb-8 text-center w-full">
            <div className="w-32 m-auto">
              <a href="https://fantom.foundation">
                <img
                  src={services.linking.static('images/ftm.png')}
                  alt="Powered by Fantom."
                />
              </a>
            </div>
          </div>
        </div>

        {/* Page header */}
        <div className="fixed top-0 w-full h-16 md:h-24 border-b-2 border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-700 z-10">
          <div className="text-center flex items-center justify-between w-full h-full max-w-screen-xl m-auto">
            <Link to={services.linking.path('Landing')}>
              <div className="h-full ml-1 md:ml-6 items-center justify-center flex">
                <div
                  className="dark:bg-white dark:mx-2"
                  style={{ borderRadius: '500px' }}
                >
                  <img
                    src={services.linking.static('images/logo.png')}
                    className="w-12 md:w-14 m-auto dark:w-8 dark:md:w-12"
                    alt="FNS Domains"
                  />
                </div>
                <div className="text-left ml-1 md:ml-3 dark:text-white">
                  <div className="font-arial uppercase text-md md:text-xl">
                    FNS
                  </div>
                  <div
                    className="font-poppins text-xs md:text-sm"
                    style={{ marginTop: '-4px' }}
                  >
                    The Fantom Name Service
                  </div>
                </div>
              </div>
            </Link>
            <div
              className="p-3 md:hidden cursor-pointer"
              onClick={this.toggleMenu.bind(this)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
            <div className="pr-8 hidden md:flex items-center dark:text-white">
              <div className="font-poppins ml-4 text-md">
                <div
                  className="py-8 px-4 cursor-pointer"
                  onClick={() => this.searchModal.toggle()}
                >
                  <SearchIcon className="w-6" />
                </div>
              </div>
              <div className="font-poppins mr-4 text-md">
                <div
                  className="px-4 cursor-pointer"
                  onClick={() => this.props.setDarkmode(!this.props.isDarkmode)}
                >
                  {this.props.isDarkmode ? (
                    <SunIcon className="w-6" />
                  ) : (
                    <MoonIcon className="w-6" />
                  )}
                </div>
              </div>
              <div className="font-poppins ml-8 text-md">
                <Link to={services.linking.path('MyDomains')}>My Domains</Link>
              </div>
              <div className="font-poppins ml-4 text-md">
                <div
                  className="py-8 px-4 cursor-pointer"
                  onClick={() => this.browserModal.toggle()}
                >
                  Open Browser
                </div>
              </div>
              <div className="font-poppins ml-4 text-md">
                <a href="https://spooky.fi/#/swap?outputCurrency=0xad522217e64ec347601015797dd39050a2a69694">
                  <img
                    src={services.linking.static('images/pumpkin_symbol.png')}
                    alt="Powered by Fantom."
                    className="inline-block object-scale-down w-6 h-6 m-2"
                  />
                  <span className="text-sm md:text-sm">
                    {this.state.pumpkinInfo?.pair?.priceUsd}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-16 md:h-24"></div>
        <components.ContinueRegistration />
        <div className="max-w-screen-xl m-auto p-16 min-h-screen">
          {this.props.children}
        </div>

        {/* Cart */}
        <div className="absolute bottom-0 w-full"></div>
        {/* Footer */}
        <footer className="fixed bottom-0 w-full  border-t-2 border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-700 z-10">
          {/* Bottom area */}
          <div className="flex flex-row justify-between md:flex md:flex-row md:items-center md:justify-between py-1 border-t border-gray-200">
            {/* Copyrights note */}
            <div className="flex text-sm text-gray-600 mr-4">
              <div className="m-auto">
                <a href="https://fantom.foundation">
                  <img
                    src={services.linking.static('images/fantom-ftm-logo.png')}
                    alt="Powered by Fantom."
                    className="inline-block object-scale-down w-10 h-10 m-2"
                  />
                  <span className="text-lg md:text-lg">Powered by Fantom</span>
                </a>
              </div>
            </div>
            {/* Copyrights note */}
            <div className="flex text-sm text-gray-600 mr-4">
              <div className="m-auto">
                Copyright <span>&#169;</span>
                {'   ' + new Date().getFullYear()}
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isDarkmode: services.darkmode.selectors.isDarkmode(state),
})

const mapDispatchToProps = (dispatch) => ({
  setDarkmode: (value) =>
    dispatch(services.darkmode.actions.setDarkmode(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
