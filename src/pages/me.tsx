/*
 * @Author:
 * @Date: 2024-03-14 21:36:55
 * @LastEditors:  
 * @LastEditTime: 2024-03-19 11:02:02
 * @FilePath: /coral-frontend/src/pages/me.tsx
 */

import React, { useState, useEffect,useRef } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'
import InvitationId from 'components/InvitationId'
import { useAddress, useConnectedWallet } from '@thirdweb-dev/react'
import http from 'services/http'
import Message from 'components/message'
import { INVITE_PREFIX } from 'constants/setting'

export default Me

interface PowerInfo {
  power: number
  cid_available: number,
  depin_available: number,
  cid_stake: number,
  depin_stake: number
}

function Me() {
  let pageModel = new PageModel('Me', 'Coral', 'ME')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  var currentDomain = INVITE_PREFIX
  const [isInvitation, setIsInvitation] = useState(false)
  const [inviteTitle, setInviteTitle] = useState('')
  const [power, setPower] = useState<PowerInfo>({
    "power": 0,
    "cid_available": 0,
    "depin_available": 0,
    "cid_stake": 0,
    "depin_stake": 0
})

  // loading
  const [title, setTitle] = useState('')
  const [txid, setTxid] = useState('')
  const [imgMessage, setImgMessage] = useState('')
  const [isMessage, setIsMessage] = useState(false)

  const showFailMessage = (msg) => {
    setTitle(msg)
    setTxid('')
    setIsMessage(true)
    setImgMessage('assets/image/failed.png')
  }
  const showSuccessMessage = (msg, txid) => {
    setTitle(msg);
    setTxid(txid)
    setIsMessage(true)
    setImgMessage('assets/image/success.png')
  }


  const handleInvitationChange = newValue => {
    setIsInvitation(newValue)
  }
  const submitInviteCode = (inviteCode: string) => {
    if (address && inviteCode) {
      http
        .requestSubmitInviteCode(address, inviteCode)
        .then((res: any) => {
            setIsInvitation(false)
            showSuccessMessage("Submit success.", '')
        })
        .catch(err => {
          showFailMessage(err)
        })
    } 
  }

  // 钱包 signer
  const signer = useConnectedWallet()
  const address = useAddress()
  
  const addressRef = useRef(null)
  const [isCopy, setIsCopy] = useState(false)
  const copyToAddress = () => {
    const addressVal = addressRef.current.textContent
    if(navigator) {
      navigator.clipboard
      .writeText(addressVal)
      .then(() => {
        setIsCopy(true)
        setTimeout(() => setIsCopy(false), 2000)
      })
      .catch(err => {
        setIsCopy(false)
      })
    }
  }

  useEffect(() => {
    if(signer) {
      http.requestPowerInfo(address)
      .then(res => {
        setPower(res as PowerInfo)
      })
      .catch(err => {
        console.log("err:", err)
      })
      http.requestLogin(address, null)
      .then(res => {
         setIsInvitation(!res['have_parent'])
      }).catch(err=> {
        console.log("err:", err)
      })
    }
  }, [signer])

  return (
    <>
      <div className="main me-page">
        <div className="title">
          <p>PRODUCT NFT</p>
          <h3>
            Your <span>Information</span>
          </h3>
        </div>
        <div className="mt-nft">
          <ul>
            <li>
              <div className="nft-name">
                <img src="assets/image/cid-nft.png" alt="nft" />
                <span>CID NFTs</span>
              </div>
              <div>
                <h3 className="block md:hidden">CID NFTs</h3>
                <h5>Available</h5>
                <p>{power.cid_available}</p>
                <h5 className="block md:hidden">Staked</h5>
                <p className="block md:hidden">{power.cid_stake}</p>
              </div>
              <div className="hidden md:block">
                <h5>Staked</h5>
                <p>{power.cid_stake}</p>
              </div>
            </li>
            <li>
              <div className="nft-name">
                <img src="assets/image/depin-nft.png" alt="nft" />
                <span>DePIN NFTs</span>
              </div>
              <div>
                <h3 className="block md:hidden">DePIN NFTs</h3>
                <h5>Available</h5>
                <p>{power.depin_available}</p>
                <h5 className="block md:hidden">Staked</h5>
                <p className="block md:hidden">{power.depin_stake}</p>
              </div>
              <div className="hidden md:block">
                <h5>Staked</h5>
                <p>{power.depin_stake}</p>
              </div>
            </li>
          </ul>
          <div className="power">
            <img src="assets/image/bgbeige.png" alt="" />
            <h3>Computing Power</h3>
            <div className="content">
              <span>{power.power}</span>
              <span>T</span>
            </div>
          </div>
        </div>
        <div className="invite-wrap">
          <div className="invite">
            <h5>Invite Friends to join Coralverse now </h5>
            <div className="share">
              <div className='use' ref={addressRef}>{currentDomain}/invite?{address}</div>
              <img onClick={copyToAddress} className="share-copy" src="assets/image/copy.png" alt="copy" />
              {/* <img src="assets/image/share.png" alt="share" /> */}
              {isCopy && <p>Copy Success</p>}
            </div>
          </div>
          <div className="address">
            <p className="tit">Your Web3 Referrer :</p>
            <p className="text">{newAddress(address)}</p>
          </div>
        </div>
      </div>
      <InvitationId
        isInvitation={isInvitation}
        handleInvitationChange={handleInvitationChange}
        submitInviteCode={submitInviteCode}
        title={inviteTitle}
      />
      <Message
        title={title}
        txid={txid}
        isMessage={isMessage}
        imgMessage={imgMessage}
        closePop={() => {
          setIsMessage(false)
        }}
      />
    </>
  )
}

function newAddress(oldAddress) {
  let displayAddress
  if (oldAddress) {
    displayAddress = oldAddress.substr(0, 6) + '...' + oldAddress.substr(-4)
  }
  return displayAddress
}
