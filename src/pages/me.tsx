/*
 * @Author:
 * @Date: 2024-03-14 21:36:55
 * @LastEditors:
 * @LastEditTime: 2024-03-22 23:46:59
 * @FilePath: /coral-frontend/src/pages/me.tsx
 */

import React, { useState, useEffect, useRef } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'
import InvitationId from 'components/InvitationId'
import { Contract } from '@ethersproject/contracts'
import http from 'services/http'
import Message from 'components/message'
import { CONTRACT_CID, CONTRACT_DEPIN, INVITE_PREFIX } from 'constants/setting'
import coralCidAbi from 'abi/coral-cid-abi'
import coralDepinAbi from 'abi/coral-depin-abi'
import { hooks } from 'connectors/metamask'
const { useAccounts, useProvider } = hooks
import useClippy from 'use-clippy'

export default Me

interface PowerInfo {
  power: number
  cid_available: number
  depin_available: number
  cid_stake: number
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
  const [inviteCode, setInviteCode] = useState('')
  const [address, setAddress] = useState<string>()
  const [power, setPower] = useState<PowerInfo>({
    power: 0,
    cid_available: 0,
    depin_available: 0,
    cid_stake: 0,
    depin_stake: 0,
  })

  const account = useAccounts()
  const provider = useProvider()

  const cidAddress = CONTRACT_CID
  const depinAddress = CONTRACT_DEPIN

  // 合约配置
  const [cidContract, setCidContract] = useState<Contract>()
  const [usdtContract, setUsdtContract] = useState<Contract>()
  const [depinContract, setDepinContract] = useState<Contract>()

  const [cidBalance, setCidBalance] = useState(0)
  const [depinBalance, setDepinBalance] = useState(0)

  // loading
  const [title, setTitle] = useState('')
  const [txid, setTxid] = useState('')
  const [imgMessage, setImgMessage] = useState('')
  const [isMessage, setIsMessage] = useState(false)

  const showFailMessage = msg => {
    setTitle(msg)
    setTxid('')
    setIsMessage(true)
    setImgMessage('assets/image/failed.png')
  }
  const showSuccessMessage = (msg, txid) => {
    setTitle(msg)
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
        .then(() => {
          setIsInvitation(false)
          showSuccessMessage('Submit success.', '')
        })
        .catch(err => {
          showFailMessage(err)
        })
    }
  }

  const [clipboard, setClipboard] = useClippy()

  // 钱包 signer

  const [isCopy, setIsCopy] = useState(false)
  // const copyToAddress = (addressVal: string) => {
  //   const textArea = document.createElement('textarea')
  //   textArea.value = addressVal
  //   document.body.appendChild(textArea)
  //   const range = document.createRange()
  //   range.selectNode(textArea)
  //   window.getSelection().addRange(range)
  //   try {
  //     document.execCommand('copy')
  //     setIsCopy(true)
  //     setTimeout(() => setIsCopy(false), 2000)
  //   } catch (err) {
  //     setIsCopy(false)
  //   }
  //   document.body.removeChild(textArea)
  // }

  const copyToAddress = () => {
    setClipboard(`${currentDomain}/invite?address=${address}`)
    setIsCopy(true)
    setTimeout(() => setIsCopy(false), 2000)
  }

  useEffect(() => {
    if (account) {
      setAddress(account[0])
      http
        .requestPowerInfo(account[0])
        .then(res => {
          setPower(res as PowerInfo)
        })
        .catch(err => {
          console.log('err:', err)
        })
      http
        .requestLogin(account[0], null)
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log('login error:', err)
        })
      const cidContract = new Contract(cidAddress, coralCidAbi, provider)
      const depinContract = new Contract(depinAddress, coralDepinAbi, provider)

      setCidContract(cidContract)
      setDepinContract(depinContract)

      cidContract.balanceOf(account[0]).then(balance => {
        setCidBalance(parseInt((balance as any)._hex))
      })
      depinContract.balanceOf(account[0]).then(balance => {
        setDepinBalance(parseInt((balance as any)._hex))
      })
    }
  }, [provider])

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
                <p>{cidBalance}</p>
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
                <p>{depinBalance}</p>
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
              <div className="use">
                <span>
                  {currentDomain}/invite?address={address}
                </span>
              </div>
              <img
                // onClick={() => copyToAddress(`${currentDomain}/invite?${address}`)}
                onClick={copyToAddress}
                className="share-copy"
                src="assets/image/copy.png"
                alt="copy"
              />
              {isCopy && <p>Copy Success</p>}
            </div>
          </div>
          <div className="address">
            <p className="tit">Your Web3 Referrer :</p>
            <p className="text">{newAddress(inviteCode)}</p>
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
