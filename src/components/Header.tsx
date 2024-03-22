import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { hooks, metaMask } from '../connectors/metamask'

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks


const navList = [
  {
    src: '/',
    nav: 'Mint',
    page: 'MINT',
  },
  // {
  //   src: '/',
  //   nav: 'Staking',
  //   page: 'STAKING',
  // },
  // {
  //   src: '/staking',
  //   nav: 'Staking',
  //   page: 'STAKING',
  // },
]

export default function Header({ pageName }) {
  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false)
  const [isInvitation, setIsInvitation] = useState(false)

  const chainId = useChainId()
  console.log("chainid:", chainId)
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()
  
  const [isWalletOpen, setWalletOpen] = useState(false)

  const connect = () => {
    metaMask
        .activate()
        .then(() => console.log("ok"))
        .catch(e => {
          console.log(e)
        })
  }

  const handleInvitationChange = newValue => {
    setIsInvitation(newValue)
  }

  const handWalletOpen = () => {
    setWalletOpen(!isWalletOpen)
  }

  const handWalletChange = newValue => {
    setWalletOpen(newValue)
  }

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  return (
    <>
      <div className="border-b-[1px] border-solid border-[#919090] md:border-b-0">
        <div className="header main">
          <div className="logo">
            <Link href="/" passHref>
              <img src="assets/image/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="nav">
            {navList.map((item, index) => {
              return (
                <Link className={`${pageName == item.page ? 'active' : ''}`} key={`nav${index}`} href={item.src}>
                  {item.nav}
                </Link>
              )
            })}
          </div>
          <div className="wallet-wrap">
            <div className="wallet">
              <div className='wallet'>
                 {accounts == null ? <div onClick={() => {
                  connect()
                 }}>Connect</div> : <>{newAddress(accounts[0] )}</>}
              </div>
            </div>
            <div className="me-nav">
              <Link href="/me" passHref>
                <img src="assets/image/icon_me.png" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="mobile-btn">
            <img
              onClick={() => setMobileHeaderOpen(true)}
              className="menu"
              src="assets/image/ion_menu.png"
              alt="header"
            />
            <Link href="/me" passHref>
              <img className="menu-me" src="assets/image/icon_me.png" alt="logo" />
            </Link>
          </div>
        </div>
        <div className="mobile-dialog">
          <Transition.Root show={mobileHeaderOpen} as={Fragment}>
            <Dialog
              as="div"
              static
              className="bg-grayf9 fixed top-0 left-0 z-40 flex h-full w-full lg:hidden"
              open={mobileHeaderOpen}
              onClose={setMobileHeaderOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="overlay" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div id="mobile-sidebar" className={'mobile-sidebar'}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="logo-wrap">
                      <div className="logo">
                        <Link href="/" passHref>
                          <img src="assets/image/logo.png" alt="logo" />
                        </Link>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          className="flex items-center justify-center bg-black bg-opacity-0 focus:outline-none dark:bg-opacity-0"
                          onClick={() => setMobileHeaderOpen(false)}
                        >
                          <img className="w-[30px] h-[30px]" src="/assets/image/icon_close.png" alt="" />
                        </button>
                        <div className="ml-5">
                          <Link href="/me" passHref>
                            <img className="w-[35px] h-[35px]" src="assets/image/icon_me.png" alt="logo" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                  <nav>
                    <div className="space-y-2 px-2">
                      <div className={'menu-header'}>
                        <div onClick={() => setMobileHeaderOpen(false)}>
                          <ul className="nav">
                            {navList.map((item, index) => {
                              return (
                                <li key={index}>
                                  <Link
                                    className={`${pageName == item.page ? 'active' : ''}`}
                                    key={index}
                                    href={item.src}
                                  >
                                    {item.nav}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                          <div className="wallet-h5">
                          <div className='wallet'>
                 {accounts == null ? <div onClick={() => {
                  connect()
                 }}>Connect</div> : <>{newAddress(accounts[0] )}</>}
              </div>                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0" aria-hidden="true"></div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </>
  )
}

const Connected = props => {
  const { address } = props
  return <div className="connected">{newAddress(address)}</div>
}

function newAddress(oldAddress) {
  let displayAddress
  if (oldAddress) {
    displayAddress = oldAddress.substr(0, 6) + '...' + oldAddress.substr(-4)
  }
  return displayAddress
}
