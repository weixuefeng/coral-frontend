/*
 * @Author:  
 * @Date: 2024-03-14 21:36:55
 * @LastEditors:  
 * @LastEditTime: 2024-03-15 17:53:31
 * @FilePath: /coral-frontend/src/pages/staking.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'

export default Nft

function Nft() {
  let pageModel = new PageModel('Staking', 'Coral', 'STAKING')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {


  return (
    <div className='main staking-page'>
      <div className='title'>
        <p>PRODUCT NFT</p>
        <h3>Your <span>Information</span></h3>
        <div className='text'>Pledge your Coral NFT to gain more return on your investment.</div>
      </div>
    </div>
  )
}
