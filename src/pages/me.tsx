/*
 * @Author:
 * @Date: 2024-03-14 21:36:55
 * @LastEditors:
 * @LastEditTime: 2024-03-15 20:40:29
 * @FilePath: /coral-frontend/src/pages/me.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'
import InvitationId from 'components/InvitationId'

export default Me

function Me() {
  let pageModel = new PageModel('Me', 'Coral', 'ME')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  const [isInvitation, setIsInvitation] = useState(false)
  const [inviteTitle, setInviteTitle] = useState('')
  const handleInvitationChange = newValue => {
    setIsInvitation(newValue)
  }
  const submitInviteCode = (inviteCode: string) => {
    // setInviteTitle('')
    // if (address && inviteCode) {
    //   http
    //     .requestSubmitInviteCode(inviteCode, address)
    //     .then((res: any) => {
    //       if (res.status == undefined) {
    //         setInviteTitle(res)
    //       } else {
    //         setInviteCodeTitle('Submit Success!')
    //         setInviteCodeImg('/assets/image/success.png')
    //         setIsInvite(true)
    //       }
    //     })
    //     .catch(err => {
    //       setInviteCodeTitle(`Submit Failed! because: ${err}`)
    //       setInviteCodeImg('/assets/image/failed.png')
    //     })
    // } else {
    //   //todo: please login
    // }
  }

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
                <p>0</p>
                <h5 className="block md:hidden">Staked</h5>
                <p className="block md:hidden">0</p>
              </div>
              <div className="hidden md:block">
                <h5>Staked</h5>
                <p>0</p>
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
                <p>0</p>
                <h5 className="block md:hidden">Staked</h5>
                <p className="block md:hidden">0</p>
              </div>
              <div className="hidden md:block">
                <h5>Staked</h5>
                <p>0</p>
              </div>
            </li>
          </ul>
          <div className="power">
            <h3>Computing Power</h3>
            <div className="content">
              <span>0</span>
              <span>T</span>
            </div>
          </div>
        </div>
        <div className="invite-wrap">
          <div className="invite">
            <h5>Invite Friends to join Coralverse now </h5>
            <div className="share">
              <p>http://invite.coralapp.io/user98732</p>
              <img className="share-copy" src="assets/image/copy.png" alt="copy" />
              <img src="assets/image/share.png" alt="share" />
            </div>
          </div>
          <div className="address">
            <p className="tit">Your Web3 Referrer :</p>
            <p className="text">0xasdfv...98jyUkL</p>
          </div>
        </div>
      </div>
      <InvitationId
        isInvitation={isInvitation}
        handleInvitationChange={handleInvitationChange}
        submitInviteCode={submitInviteCode}
        title={inviteTitle}
      />
    </>
  )
}
