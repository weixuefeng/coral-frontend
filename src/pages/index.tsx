/*
 * @Author:  
 * @Date: 2024-03-13 21:36:45
 * @LastEditors:  
 * @LastEditTime: 2024-03-15 18:09:13
 * @FilePath: /coral-frontend/src/pages/index.tsx
 */


import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'
import IncrementInput from 'components/IncrementInput'

export default Nft

function Nft() {
  let pageModel = new PageModel('Overview', 'Coral', 'HOME')
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
    <>
      <div className="main">
        <div className='cid-nft'>
          <div className='nft'>
            <p className='tit'>PRODUCT NFT</p>
            <h3>Coral&nbsp;<span>CID NFT</span></h3>
            <p className='mb-6 md:mb-8'>Join Coral member pass with Coral CID NFT.<br /> Get special benefits and gain more profits!</p>
            <p>CID NFT is the most basic user unit, and each CID NFT has the ability to<br /> share the revenue of the Coral platform.</p>
            <div className='nft-img block md:hidden mt-5 mb-3'>
              <img className='img1' src="assets/image/cid_nft_bg.png" alt="nft-bg" />
              <img className='img' src="assets/image/nft1.png" alt="nft" />
            </div>
            <div className='nft-name'>
              <ul>
                <li>
                  <span>NFT Name</span>
                  <span>CID NFTs</span>
                </li>
                <li>
                  <span>Quantity</span>
                  <span>10,000</span>
                </li>
                <li>
                  <span>Price per NFT</span>
                  <span>20 USDT</span>
                </li>
                <li className='purchase'>
                  <div className='price'>Amount</div>
                  <IncrementInput
                    text={'Mint'}
                    value={cidNftValue}
                    onInput={(value) => handleInputChange(value, setCidNftValue)}
                    onIncrement={() => handleIncrementValue(cidNftValue, setCidNftValue)}
                    onDecrement={() => handleDecrementValue(cidNftValue, setCidNftValue)}
                  />
                </li>
              </ul>
              <div className='mint block md:hidden'>Mint</div>
            </div>
          </div>
          <div className='nft-img hidden md:block'>
            <img src="assets/image/cid_nft_bg.png" alt="nft-bg" />
            <img className='img' src="assets/image/nft1.png" alt="nft" />
          </div>
        </div>
      </div>
      <div className='bg-redFA py-[25px] md:py-[82px] mt-[25px] md:mt-[100px]'>
        <div className='main officially'>
          <div className='text'>
            <p>CID NFTs are the primary assets in Coral's metaverse, functioning as 3D rendering engines powered by collaboration with DGX Cloud under NVIDIA.</p>
            <p className='mt-5 md:mt-10'>They support Coral‘s future metaverse scenes and generate tokens by providing rendering services, alongside AI capabilities, with potential for external computing power output.</p>
          </div>
          {/* <ul>
            <li>
              <h3>1092</h3>
              <p>Total holders</p>
            </li>
            <li>
              <h3>1,092,231</h3>
              <p>Total NFTs</p>
            </li>
          </ul> */}
        </div>
      </div>
      <div className='main'>
        <div className='cid-nft depin-nft'>
          <div className='nft-img hidden md:block'>
            <img src="assets/image/depin_nft_bg.png" alt="nft-bg" />
            <img className='img' src="assets/image/nft2.png" alt="nft" />
          </div>
          <div className='nft'>
            <div className='best hidden md:block'>
              <img className='img1' src="assets/image/best.png" alt="" />
              <img className='img2' src="assets/image/best_val.png" alt="" />
            </div>
            <p className='tit'>Coral DePIN NFT</p>
            <h3>Coral&nbsp;<span>CID NFT</span></h3>
            <p>A superior NFT above CID.</p>
            <p>Enjoy the ability to manage and distribute the CID NFT.</p>
            <p>Each Depin NFT belongs to a verifiable data node, and the CID NFT managed by Depin NFT can obtain better asset returns.</p>
            <div className='nft-img block md:hidden mt-5 mb-3'>
              <img className='img1' src="assets/image/depin_nft_bg.png" alt="nft-bg" />
              <img className='img' src="assets/image/nft2.png" alt="nft" />
              <img className='img3' src="assets/image/best-h5.png" alt="nft" />
            </div>
            <div className='nft-name'>
              <ul>
                <li>
                  <span>NFT Name</span>
                  <span>CID NFTs</span>
                </li>
                <li>
                  <span>Quantity</span>
                  <span>10,000</span>
                </li>
                <li>
                  <span>Price per NFT</span>
                  <span>20 USDT</span>
                </li>
                <li className='purchase'>
                  <div className='price'>Amount</div>
                  <IncrementInput
                    text={'Mint'}
                    value={depinNftValue}
                    onInput={(value) => handleInputChange(value, setDepinNftValue)}
                    onIncrement={() => handleIncrementValue(depinNftValue, setDepinNftValue)}
                    onDecrement={() => handleDecrementValue(depinNftValue, setDepinNftValue)}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div><img src="assets/image/footer-top.png" alt="" /></div>
      <div className='bg-black44 pt-5'>
        <div className='main officially'>
          <div className='text'>
            <p>DePIN NFTs enhance CID NFTs with more computing power and ecosystem benefits, such as governance rights and increased token rewards. </p>
            <p className='mt-6 md:mt-10'>Acting as data processing nodes, each DePIN NFT receives allocated CID NFT computing power. Coral supplies iris recognition devices to DePIN NFT holders, enabling biometric verification and motion capture for the metaverse. DePIN NFTs conduct iris recognition, rewarding participants with Coral incentives. </p>
            <p className='mt-6 md:mt-10'>Additionally, DePIN NFTs can autonomously promote and sell CID NFTs, with proceeds primarily benefiting the equipment provider and supporting Coral's ecosystem and maintenance.</p>
          </div>
          <div className='home-footer'>© 2024 Coral App.</div>
          {/* <ul>
            <li>
              <h3>21</h3>
              <p>Total holders</p>
            </li>
            <li>
              <h3>320</h3>
              <p>Total NFTs</p>
            </li>
          </ul> */}
        </div>
      </div>
    </>
  )
}