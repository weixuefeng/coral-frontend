import React, { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBtc } from 'connection/btcconnector/context'
import http from 'services/http'

let defaultWalletList = [
  {
    icon: "/assets/image/unisat.png",
    name: "Unisat Wallet",
    status: "check",
    flag: "Unisat",
  },
  {
    icon: "/assets/image/okx.png",
    name: "OKX Wallet",
    status: "check",
    flag: "OKX",
  },
  {
    icon: "/assets/image/gate.png",
    name: "Gate Wallet",
    status: "check",
    flag: "Gate",
  },
]

const ConnectWallet = ({ onInvitationChange, isWalletOpen, handWalletChange }) => {
  const { isConnected, address, publicKey, network, connect } = useBtc()

  const [unisatInstalled, setUnisatInstalled] = useState(false)
  const [okxInstalled, setOkxInstalled] = useState(false)
  const [gateInstalled, setGateInstalled] = useState(false)
  const [walletList, setWalletList] = useState(defaultWalletList)

  const [isInvitation, setIsInvitation] = useState(false)

  const closeModal = () => {
    handWalletChange(false)
  }

  const openModal = () => {
    handWalletChange(true)
  }

  const handleWallet = (flag) => {
    connect(flag)
    handWalletChange(false)
  }

  // check okx
  useEffect(() => {
    async function checkOkx() {
      let okx = (window as any).okxwallet
      for (let i = 1; i < 10 && !okx; i += 1) {
        await new Promise(resolve => setTimeout(resolve, 100 * i))
        okx = (window as any).okxwallet
      }
      if (okx) {
        defaultWalletList[1].status = "installed"
        setWalletList(defaultWalletList),
          setOkxInstalled(true)
      } else {
        setOkxInstalled(false)
        defaultWalletList[1].status = "uninstalled"
        setWalletList(defaultWalletList)
      };
    }
    checkOkx().then()
  }, [okxInstalled])

  // check unisat
  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat
      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise(resolve => setTimeout(resolve, 100 * i))
        unisat = (window as any).unisat
      }
      if (unisat) {
        defaultWalletList[0].status = "installed"
        setWalletList(defaultWalletList),
          setUnisatInstalled(true)
      } else {
        defaultWalletList[0].status = "uninstalled"
        setWalletList(defaultWalletList),
          setUnisatInstalled(false)
      }
    }
    checkUnisat().then()
  }, [unisatInstalled])

  // check gate installed
  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat
      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise(resolve => setTimeout(resolve, 100 * i))
        unisat = (window as any).unisat
      }
      if (unisat) {
        defaultWalletList[2].status = "installed"
        setWalletList(defaultWalletList),
          setGateInstalled(true)
      } else {
        defaultWalletList[2].status = "uninstalled"
        setWalletList(defaultWalletList),
          setGateInstalled(false)
      }
    }
    checkUnisat().then()
  }, [gateInstalled])

  useEffect(() => {
    if (address) {
      console.log("request")
      http.requestLogin(address).then((res: any) => {
        if (res?.is_whitelist == false && res?.have_parent == false) {
          setIsInvitation(true)
          onInvitationChange(true);
          console.log('denglu', onInvitationChange(true))
        }
        console.log('登录')
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [address])

  return (
    <>
      {/* <div className='wallet'>
        <button
          onClick={openModal}
        >CONNECT WALLET</button>
      </div> */}
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
                  <Dialog.Title as="h3">
                    Connect Wallet
                  </Dialog.Title>
                  <ul>
                    {
                      walletList.map((item, index) => {
                        if (item.status == "installed") {
                          return (
                            <li key={index} onClick={() => {
                              handleWallet(item.flag)
                            }}>
                              <img src={item.icon} alt={item.name} />
                              <span>{item.name}</span>
                            </li>
                          )
                        } else {
                          return (
                            <li className="border-gray-900 text-gray-800 bg-gray-900" key={index} onClick={() => {
                              // handleWallet(item.flag)
                            }}>
                              <img src={item.icon} alt={item.name} />
                              <span className="text-gray-600">{item.name} </span>
                            </li>
                          )
                        }
                      })
                    }
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