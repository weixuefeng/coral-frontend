/*
 * @Author:  
 * @Date: 2024-03-14 21:36:55
 * @LastEditors:  
 * @LastEditTime: 2024-03-14 22:48:51
 * @FilePath: /coral-frontend/src/pages/me.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'

export default Nft

function Nft() {
  let pageModel = new PageModel('Me', 'Coral', '')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {

  return (
    <div className='main me-page'>
      <div className='title'>
        <p>PRODUCT NFT</p>
        <h3>Your <span>Information</span></h3>
      </div>
      <div className='mt-nft'>
        <ul>
          <li className='nft-item'>
            <div>
              <img src="" alt="" />
              <span>CID NFTs</span>
            </div>
            <div>
              <h5>Available</h5>
              <p>0</p>
            </div>
            <div>
              <h5>Staked</h5>
              <p>0</p>
            </div>
          </li>
          <li>
            <div>
              <img src="" alt="" />
              <span>DePIN NFTs</span>
            </div>
            <div>
              <h5>Available</h5>
              <p>0</p>
            </div>
            <div>
              <h5>Staked</h5>
              <p>0</p>
            </div>
          </li>
        </ul>
        <div className='power'>
          <h3>Computing Power</h3>
          <div className='content'>
            <span>0</span>
            <span>T</span>
          </div>
        </div>
      </div>
      <div className='invite-wrap'>
        <div className='invite'>
          <h5>Invite Friends to join Coralverse now </h5>
          <div className='share'>
            <p>http://invite.coralapp.io/user98732</p>
          </div>
        </div>
        <div className='address'>
          <p>Your Web3 Referrer :</p>
          <p>0xasdfv...98jyUkL</p>
        </div>
      </div>
    </div>
  )
}

