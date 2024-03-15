import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { useBtc } from 'connection/btcconnector/context'
import ConnectWallet from 'components/ConnectWallet'


const navList = [
  {
    src: '/',
    nav: 'Overview',
    page: ''
  },
  {
    src: '/',
    nav: 'Staking',
    page: 'Staking'
  }
]

const LinkTwitterList = [
  {
    href: 'https://twitter.com/_XDIN3_',
    icon: 'assets/image/mdi_twitter.png',
    iconH5: 'assets/image/faq_twitter_icon.png',
  },
  {
    href: 'https://discord.gg/mKAmCrvVeD',
    icon: 'assets/image/mdi_discord.png',
    iconH5: 'assets/image/faq_discord_icon.png'
  },
  {
    href: 'https://t.me/XDIN3',
    icon: 'assets/image/mdi_telegram.png',
    iconH5: 'assets/image/faq_telegram_icon.png'
  }
]

export default function Header() {

  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false)
  const { isConnected, address, publicKey, network, connect } = useBtc()
  const [isInvitation, setIsInvitation] = useState(false);

  const [isWalletOpen, setWalletOpen] = useState(false);

  const handleInvitationChange = (newValue) => {
    setIsInvitation(newValue);
  };

  const handWalletOpen = () => {
    setWalletOpen(!isWalletOpen);
  };

  const handWalletChange = (newValue) => {
    setWalletOpen(newValue)
  }

  const [launchName, setLaunchName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const launchName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
      setLaunchName(launchName);
    }
  }, []);

  return (
    <>
      <header className='header main'>
        <div className='logo'>
          <Link href="/" passHref>
            <img src="assets/image/bitDao_logo.png" alt="logo" />
          </Link>
        </div>
        <div className='nav'>
          {navList.map((item, index) => {
            return (
              <Link
                className={`${launchName == item.page ? 'active' : (launchName == '' ? '' : '')}`}
                key={`nav${index}`} href={item.src}>{item.nav}</Link>
            )
          })}
        </div>
        {!isConnected && (<>
          <div className='wallet'>
            <button onClick={handWalletOpen}>Connect Wallet</button>
            <div className='me-nav'>
              <Link href="/me" passHref>
              <img src="assets/image/icon_me.png" alt="logo" />
              </Link>
            </div>
          </div>
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            handWalletChange={handWalletChange}
            onInvitationChange={handleInvitationChange}
          />
        </>
        )}
        {isConnected && <Connected address={address} />}
        <div className='mobile-btn'
          onClick={() => setMobileHeaderOpen(true)}
        >
          <img src="assets/image/ion_menu.png" alt="header" />
        </div>
      </header>
      <div className='mobile-dialog'>
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
                    <div className='logo'>
                      <Link href="/" passHref>
                        <img src="assets/image/bitDao_logo.png" alt="logo" />
                      </Link>
                    </div>
                    <button
                      className="flex items-center justify-center bg-black bg-opacity-0 focus:outline-none dark:bg-opacity-0"
                      onClick={() => setMobileHeaderOpen(false)}
                    >
                      <img className='w-[30px] h-[30px]' src="/assets/image/icon_close.png" alt="" />
                    </button>
                  </div>
                </Transition.Child>
                <nav>
                  <div className="space-y-2 px-2">
                    <div className={'menu-header'}>
                      <div onClick={() => setMobileHeaderOpen(false)}>
                        <ul className='nav'>
                          {navList.map((item, index) => {
                            return (
                              <li key={index}>
                                <Link
                                  className={`${launchName == item.page ? 'active' : (launchName == '' ? '' : '')}`}
                                  key={index} href={item.src}>{item.nav}</Link></li>
                            )
                          })}
                        </ul>
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
    </>
  )
}


const Connected = (props) => {
  const { address } = props
  return (
    <div className='connected'>{newAddress(address)}</div>
  )
}


function newAddress(oldAddress) {
  let displayAddress
  if (oldAddress) {
    displayAddress = oldAddress.substr(0, 6) + '...' + oldAddress.substr(-4)
  }
  return displayAddress
}


