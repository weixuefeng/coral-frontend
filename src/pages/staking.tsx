/*
 * @Author:  
 * @Date: 2024-03-14 21:36:55
 * @LastEditors:  
 * @LastEditTime: 2024-03-15 19:30:01
 * @FilePath: /coral-frontend/src/pages/staking.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'
import IncrementInput from 'components/IncrementInput'

export default Nft

function Nft() {
  let pageModel = new PageModel('Staking', 'Coral', 'STAKING')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  const [cidNftValue, setCidNftValue] = useState("1");
  const [depinNftValue, setDepinNftValue] = useState("1");

  const handleInputChange = (value, setValue) => {
    if (!isNaN(value) && parseInt(value) >= 1) {
      setValue(value);
    }
  };

  const handleIncrementValue = (value, setValue) => {
    const newValue = parseInt(value) + 1;
    setValue(newValue.toString());
  };

  const handleDecrementValue = (value, setValue) => {
    const newValue = parseInt(value) - 1;
    if (newValue >= 1) {
      setValue(newValue.toString());
    }
  };

  return (
    <div className='main staking-page'>
      <div className='title'>
        <p>PRODUCT NFT</p>
        <h3>Pledge <span> NFT</span></h3>
        <div className='text'>Pledge your Coral NFT to gain more return on your investment.</div>
      </div>
      <div className='nft-wrap'>
        <div className='nft-left'>
          <div className='img'><img src="assets/image/nft1.png" alt="nft" /></div>
          <div>
            <h4>Coral CID NFTs</h4>
            <ul>
              <li>
                <h5>Total Computing Power</h5>
                <p>30,294<span>T</span></p>
              </li>
              <li>
                <h5>Claimed</h5>
                <p>10,267<span>T</span></p>
              </li>
              <li>
                <h5>APY</h5>
                <p>109<span>%</span></p>
              </li>
            </ul>
          </div>
        </div>
        <div className='nft-right'>
          <IncrementInput
            text={'Pledge'}
            value={cidNftValue}
            onInput={(value) => handleInputChange(value, setCidNftValue)}
            onIncrement={() => handleIncrementValue(cidNftValue, setCidNftValue)}
            onDecrement={() => handleDecrementValue(cidNftValue, setCidNftValue)}
          />
          <p className='own'>You own<span>5</span></p>
        </div>
      </div>
      <div className='nft-wrap'>
        <div className='nft-left'>
          <div className='img'><img src="assets/image/nft2.png" alt="nft" /></div>
          <div>
            <h4>Coral CID NFTs</h4>
            <ul>
              <li>
                <h5>Total Computing Power</h5>
                <p>30,294<span>T</span></p>
              </li>
              <li>
                <h5>Claimed</h5>
                <p>10,267<span>T</span></p>
              </li>
              <li>
                <h5>APY</h5>
                <p>109<span>%</span></p>
              </li>
            </ul>
          </div>
        </div>
        <div className='nft-right'>
          <IncrementInput
            text={'Pledge'}
            value={depinNftValue}
            onInput={(value) => handleInputChange(value, setDepinNftValue)}
            onIncrement={() => handleIncrementValue(depinNftValue, setDepinNftValue)}
            onDecrement={() => handleDecrementValue(depinNftValue, setDepinNftValue)}
          />
          <p className='own'>You own<span>5</span></p>
        </div>
      </div>
    </div>
  )
}

