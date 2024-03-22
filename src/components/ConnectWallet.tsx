import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const OksIcon = 'assets/image/okx.png'
const GateIcon = 'assets/image/gate.png'
const MetaMaskIcon = 'assets/image/metamask.png'
const BitgetIcon = 'assets/image/bit.png'

const evmWalletList = [
  {
    icon: OksIcon,
    name: 'OKX Wallet',
    status: 'installed',
    flag: 'OKX',
  },
  {
    icon: GateIcon,
    name: 'Gate Wallet',
    status: 'installed',
    flag: 'Gate',
  },
  {
    icon: MetaMaskIcon,
    name: 'MetaMask',
    status: 'installed',
    flag: 'Metamask',
  },
  {
    icon: BitgetIcon,
    name: 'Bitget Wallet',
    status: 'installed',
    flag: 'Bitget Wallet',
  },
]

const ConnectWallet = (props: any) => {
  const { isWalletOpen, handWalletChange, isBTC } = props
  const [okxInstalled, setOkxInstalled] = useState(false)
  const [gateInstalled, setGateInstalled] = useState(false)
  const [metamaskInstalled, setMetamaskInstalled] = useState(false)

  const closeModal = () => {
    handWalletChange(false)
  }

  const handleWallet = async (flag: any) => {
    try {
    } catch (error) {}
    handWalletChange(false)
  }

  return (
    <>
      <Transition appear show={isWalletOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white/65" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto modail-wallet">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="wrap connectWallet">
                  <Dialog.Title as="h3">Connect Wallet</Dialog.Title>
                  <ul>
                    {evmWalletList.map((item, index) => {
                      if (item.status == 'installed') {
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              handleWallet(item.flag)
                            }}
                          >
                            <img src={item.icon} alt={item.name} />
                            <span>{item.name}</span>
                          </li>
                        )
                      } else {
                        return (
                          <li className="uninstalled" key={index}>
                            <img src={item.icon} alt={item.name} />
                            <span className="text-gray-600">{item.name}</span>
                          </li>
                        )
                      }
                    })}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ConnectWallet
