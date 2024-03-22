/*
 * @Author:
 * @Date: 2024-03-18 15:04:24
 * @LastEditors:
 * @LastEditTime: 2024-03-18 19:53:08
 * @FilePath: /coral-frontend/src/components/Loading.tsx
 */

import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Message = ({ isLoading, closeLoading }) => {
  const closeModal = () => {
    closeLoading()
  }

  return (
    <>
      <Transition appear show={isLoading} as={Fragment}>
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
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="message-wrap">
            <div className="message">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="wrap">
                  <div className="mt-2">
                    <div className="result">
                      <h5 className="loading">
                        <img src="assets/image/loading.png" alt="" />
                        <span>Loading...</span>
                      </h5>
                    </div>
                  </div>
                  <div className="content">{/* <button onClick={closeModal}>Close</button> */}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Message
