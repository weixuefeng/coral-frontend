
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBtc } from 'connection/btcconnector/context'

const OksIcon = "assets/image/okx.png";
const GateIcon = "assets/image/gate.png";
const MetaMaskIcon = "assets/image/metamask.png";

const evmWalletList = [
  {
    icon: OksIcon,
    name: "OKX Wallet",
    status: "check",
    flag: "OKX",
  },
  {
    icon: GateIcon,
    name: "Gate Wallet",
    status: "check",
    flag: "Gate",
  },
  {
    icon: MetaMaskIcon,
    name: "MetaMask",
    status: "check",
    flag: "Metamask",
  },
];

const ConnectWallet = (props: any) => {

  const { isWalletOpen, handWalletChange, isBTC } = props;
  const { connect } = useBtc();
  const [okxInstalled, setOkxInstalled] = useState(false);
  const [gateInstalled, setGateInstalled] = useState(false);
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  const closeModal = () => {
    handWalletChange(false)
  }

  const handleWallet = async (flag: any) => {
    try {
      await connect(flag);
    } catch (error) {
    }
    handWalletChange(false);
  };

  // check okx
  useEffect(() => {
    async function checkOkx() {
      let okx = (window as any).okxwallet;
      for (let i = 1; i < 10 && !okx; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        okx = (window as any).okxwallet;
      }
      if (okx) {
        evmWalletList[0].status = "installed";
        // updateWalletListInfo();
        setOkxInstalled(true);
      } else {
        setOkxInstalled(false);
        evmWalletList[0].status = "uninstalled";
        // updateWalletListInfo();
      }
    }
    checkOkx().then();
  }, [okxInstalled]);

  // check gate installed
  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat;
      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = (window as any).unisat;
      }
      if (unisat) {
        evmWalletList[1].status = "installed";
        // updateWalletListInfo();
        setGateInstalled(true);
      } else {
        evmWalletList[1].status = "uninstalled";
        // updateWalletListInfo();
        setGateInstalled(false);
      }
    }
    checkUnisat().then();
  }, [gateInstalled]);

  // check meatamsk
  useEffect(() => {
    async function checkOkx() {
      let metamask = (window as any).ethereum;
      for (let i = 1; i < 10 && !metamask; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        metamask = (window as any).ethereum;
      }
      if (metamask) {
        evmWalletList[2].status = "installed";
        // updateWalletListInfo();
        setMetamaskInstalled(true);
      } else {
        setMetamaskInstalled(false);
        evmWalletList[2].status = "uninstalled";
        // updateWalletListInfo();
      }
    }
    checkOkx().then();
  }, [metamaskInstalled]);

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
                  <Dialog.Title as="h3">
                    Connect Wallet
                  </Dialog.Title>
                  <ul>
                    {evmWalletList.map((item, index) => {
                      console.log(item)
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