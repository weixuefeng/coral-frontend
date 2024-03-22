/*
 * @Author:
 * @Date: 2024-03-13 21:36:45
 * @LastEditors:
 * @LastEditTime: 2024-03-18 19:57:09
 * @FilePath: /coral-frontend/src/pages/index.tsx
 */
import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'
import IncrementInput from 'components/IncrementInput'
import coralCidAbi from 'abi/coral-cid-abi'
import coralDepinAbi from 'abi/coral-depin-abi'
import { BigNumberish, ethers } from 'ethers'
import Message from 'components/message'
import Loading from 'components/Loading'
import http from 'services/http'
import {
  CONTRACT_CID,
  CONTRACT_CID_LIMIT,
  CONTRACT_CID_PRICE,
  CONTRACT_DEPIN,
  CONTRACT_DEPIN_LIMIT,
  CONTRACT_DEPIN_PRICE,
  CONTRACT_USDT,
} from 'constants/setting'
import { Contract } from '@ethersproject/contracts'

import { hooks } from '../connectors/metamask'
import usdtAbi from 'abi/usdt-abi'

const { useAccounts, useProvider } = hooks

export default Home

function Home() {
  let pageModel = new PageModel('Mint', 'Coral', 'MINT')
  return <>{NormalLayout(IndexMainPage(null), pageModel)}</>
}

enum ActionType {
  CID,
  DEPIN,
}

export function IndexMainPage(invite_address: string | undefined) {
  const account = useAccounts()
  const provider = useProvider()

  // 合约地址配置
  const usdtAddress = CONTRACT_USDT
  const cidAddress = CONTRACT_CID
  const depinAddress = CONTRACT_DEPIN

  // 合约参数配置
  const perAddressCidLimit = parseInt(CONTRACT_CID_LIMIT)
  const perAddressDepinLimit = parseInt(CONTRACT_DEPIN_LIMIT)

  // cid 价格配置
  const cidDisplayPrice = CONTRACT_CID_PRICE
  const depinDisplayPrice = CONTRACT_DEPIN_PRICE
  const approveDisplayAmount = '10000000000'

  const cidPrice = ethers.parseUnits(cidDisplayPrice, 18)
  const depinPrice = ethers.parseUnits(depinDisplayPrice, 18)
  const approveAmount = ethers.parseUnits(approveDisplayAmount, 18)

  // 购买数量配置
  const [cidNftValue, setCidNftValue] = useState('0')
  const [depinNftValue, setDepinNftValue] = useState('0')

  // 文案常量
  const usdtNotEnough = 'Insufficient USDT balance'
  const usdtApprove = 'Approve USDT For Mint'
  const mintText = 'Mint'

  // mint 文案配置
  const [cidMintText, setCidMintText] = useState(mintText)
  const [depinMintText, setDepinMintText] = useState(mintText)

  // 合约配置
  const [cidContract, setCidContract] = useState<Contract>()
  const [usdtContract, setUsdtContract] = useState<Contract>()
  const [depinContract, setDepinContract] = useState<Contract>()

  // usdt 余额
  const [usdtBalance, setUsdtBalance] = useState<BigNumberish>()

  // user limit
  const [userCidLimit, setUserCidLimit] = useState(parseInt(CONTRACT_CID_LIMIT))
  const [userDepinLimit, setUserDepinLimit] = useState(parseInt(CONTRACT_DEPIN_LIMIT))

  // 初始化 sdk
  useEffect(() => {
    if (account) {
      var address = account[0]
      const signer = provider?.getSigner(account[0])
      console.log(signer)
      http
        .requestLogin(account[0], invite_address)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log('login error:', err)
        })

      const cidContract = new Contract(cidAddress, coralCidAbi, signer)
      const depinContract = new Contract(depinAddress, coralDepinAbi, signer)
      const usdtContract = new Contract(usdtAddress, usdtAbi, signer)
      setCidContract(cidContract)
      setDepinContract(depinContract)
      setUsdtContract(usdtContract)
      usdtContract.balanceOf(address).then(balance => {
        setUsdtBalance(balance)
      })
      cidContract.balanceOf(account[0]).then(balance => {
        setUserCidLimit(parseInt(CONTRACT_CID_LIMIT) - parseInt((balance as any)._hex))
      })
      depinContract.balanceOf(account[0]).then(balance => {
        setUserDepinLimit(parseInt(CONTRACT_DEPIN_LIMIT) - parseInt((balance as any)._hex))
      })
    }
  }, [provider])

  const handleInputChange = (value, setValue, type: ActionType) => {
    var mintNftLimit = type == ActionType.CID ? userCidLimit : userDepinLimit
    if (!isNaN(value) && parseInt(value) >= 0 && parseInt(value) <= mintNftLimit) {
      setValue(value)
      checkAccountInfo(type, value.toString())
    }
  }

  const handleIncrementValue = (value, setValue, type: ActionType) => {
    var mintNftLimit = type == ActionType.CID ? userCidLimit : userDepinLimit
    const newValue = parseInt(value) + 1
    if (newValue <= mintNftLimit) {
      setValue(newValue.toString())
      checkAccountInfo(type, newValue.toString())
    } else {
      showSuccessMessage('You reach the limit', '')
    }
  }

  const handleDecrementValue = (value, setValue, type: ActionType) => {
    const newValue = parseInt(value) - 1
    if (newValue >= 0) {
      setValue(newValue.toString())
      checkAccountInfo(type, newValue.toString())
    }
  }

  const checkAccountInfo = async (type: ActionType, value: string) => {
    if (!usdtBalance) {
      return
    }
    if (value == '0') {
      return
    }
    var price = type == ActionType.CID ? cidPrice : depinPrice
    var contractAddress = type == ActionType.CID ? cidAddress : depinAddress
    var setText = type == ActionType.CID ? setCidMintText : setDepinMintText

    var totalPrice = BigInt(value) * price
    // 检查余额
    if (parseInt(totalPrice.toString()) - parseInt(usdtBalance.toString()) > 0) {
      setText(usdtNotEnough)
      return
    }
    if (!usdtContract) {
      return
    }
    // 检查 usdt 是否授权
    var allowance = await usdtContract.allowance(account[0], contractAddress)
    if (parseInt(allowance._hex) - parseInt(totalPrice.toString()) > 0) {
      setText(mintText)
    } else {
      setText(usdtApprove)
    }
  }

  const checkAndMintNft = async (type: ActionType) => {
    var price = type == ActionType.CID ? cidPrice : depinPrice
    var contractAddress = type == ActionType.CID ? cidAddress : depinAddress
    var mintAmount = type == ActionType.CID ? cidNftValue : depinNftValue
    var mintNftLimit = type == ActionType.CID ? perAddressCidLimit : perAddressDepinLimit
    var contract = type == ActionType.CID ? cidContract : depinContract

    if (mintAmount == '0') {
      return
    }
    // 计算总价格
    var totalPrice = BigInt(mintAmount) * price
    // 检查余额
    if (parseInt(totalPrice.toString()) - parseInt(usdtBalance.toString()) > 0) {
      setCidMintText(usdtNotEnough)
      return
    }
    if (!usdtContract) {
      return
    }
    try {
      // 检查 usdt 是否授权
      var allowance = await usdtContract.allowance(account[0], contractAddress)
      // 如果授权数量大于等于需要的 usdt 数量，直接 mint
      if (parseInt(allowance) >= parseInt(totalPrice.toString())) {
        if (contract) {
          setIsLoading(true)
          var res = await contract.claim(
            account[0],
            parseInt(mintAmount),
            usdtAddress,
            price,
            [[], mintNftLimit, price, usdtAddress],
            []
          )
          // todo: 弹框提示成功，显示出 txid，点击 txid 可以跳转到浏览器
          var mintTxid = res['hash']
          setIsLoading(false)
          showSuccessMessage('Success!', 'Mint txid: ' + mintTxid)
        } else {
          showFailMessage('please init contract')
        }
      } else {
        // 如果授权数量不足，继续授权
        var maxValue = totalPrice
        if (totalPrice < approveAmount) {
          maxValue = approveAmount
        }
        console.log("max:", maxValue)
        setIsLoading(true)
        try {
          var allowRes = await usdtContract.approve(
            contractAddress,
            ethers.parseUnits(ethers.formatUnits(maxValue, 18), 18).toString()
          )
          // 授权成功，提示 "授权成功，前往浏览器查看 txid, 或者 3s 后刷新页面继续 mint"
          var allowTxid = allowRes['hash']
          setIsLoading(false)
          showSuccessMessage('Success!', 'Approved txid: ' + allowTxid)
          checkAccountInfo(type, mintAmount)
        } catch(e) {
          console.log(e)
        }
        
      }
    } catch (e) {
      // 弹框提示错误信息
      console.log(e)
      setIsLoading(false)
      showFailMessage('user rejected transaction')
    }
  }

  // 弹出框提示
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

  // loading
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div className="main">
        <div className="cid-nft">
          <div className="nft">
            <p className="tit">PRODUCT NFT</p>
            <h3>
              Coral&nbsp;<span>CID NFT</span>
            </h3>
            <p className="mb-6 md:mb-8">
              Join Coral member pass with Coral CID NFT.
              <br /> Get special benefits and gain more profits!
            </p>
            <p>
              CID NFT is the most basic user unit, and each CID NFT has the ability to
              <br /> share the revenue of the Coral platform.
            </p>
            <div className="nft-img block md:hidden mt-5 mb-3">
              <img className="img1" src="assets/image/cid_nft_bg.png" alt="nft-bg" />
              <img className="img" src="assets/image/nft1.png" alt="nft" />
            </div>
            <div className="nft-name">
              <ul>
                <li>
                  <p>NFT Name</p>
                  <p>CID NFTs</p>
                </li>
                <li>
                  <p>Quantity</p>
                  <p>20,000</p>
                </li>
                <li>
                  <p>Price per NFT</p>
                  <p>
                    <span>{cidDisplayPrice}</span> USDT
                  </p>
                </li>
                <li className="purchase">
                  <div className="price">Amount</div>
                  <IncrementInput
                    text={cidMintText}
                    value={cidNftValue}
                    onInput={value => handleInputChange(value, setCidNftValue, ActionType.CID)}
                    onIncrement={() => handleIncrementValue(cidNftValue, setCidNftValue, ActionType.CID)}
                    onDecrement={() => handleDecrementValue(cidNftValue, setCidNftValue, ActionType.CID)}
                    onMint={() => checkAndMintNft(ActionType.CID)}
                  />
                </li>
              </ul>
              <div className="mint block md:hidden" onClick={() => checkAndMintNft(ActionType.CID)}>
                {cidMintText}
              </div>
            </div>
          </div>
          <div className="nft-img hidden md:block">
            <img src="assets/image/cid_nft_bg.png" alt="nft-bg" />
            <img className="img" src="assets/image/nft1.png" alt="nft" />
          </div>
        </div>
      </div>
      <div className="bg-redFA py-[25px] md:py-[82px] mt-[25px] md:mt-[100px]">
        <div className="main officially">
          <div className="text">
            <p>
              CID NFTs are the primary assets in Coral's metaverse, functioning as 3D rendering engines powered by
              collaboration with DGX Cloud under NVIDIA.
            </p>
            <p className="mt-5 md:mt-10">
              They support Coral‘s future metaverse scenes and generate tokens by providing rendering services,
              alongside AI capabilities, with potential for external computing power output.
            </p>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="cid-nft depin-nft">
          <div className="nft-img hidden md:block">
            <img src="assets/image/depin_nft_bg.png" alt="nft-bg" />
            <img className="img" src="assets/image/nft2.png" alt="nft" />
          </div>
          <div className="nft">
            <div className="best hidden md:block">
              <img className="img1" src="assets/image/best.png" alt="" />
              <img className="img2" src="assets/image/best_val.png" alt="" />
            </div>
            <p className="tit">Coral DePIN NFT</p>
            <h3>
              Coral&nbsp;<span>DePIN NFT</span>
            </h3>
            <p>A superior NFT above CID.</p>
            <p>Enjoy the ability to manage and distribute the CID NFT.</p>
            <p>
              Each Depin NFT belongs to a verifiable data node, and the CID NFT managed by Depin NFT can obtain better
              asset returns.
            </p>
            <div className="nft-img block md:hidden mt-5 mb-3">
              <img className="img1" src="assets/image/depin_nft_bg.png" alt="nft-bg" />
              <img className="img" src="assets/image/nft2.png" alt="nft" />
              <img className="img3" src="assets/image/best-h5.png" alt="nft" />
            </div>
            <div className="nft-name">
              <ul>
                <li>
                  <p>NFT Name</p>
                  <p>DePIN NFT</p>
                </li>
                <li>
                  <p>Quantity</p>
                  <p>1,000</p>
                </li>
                <li>
                  <p>Price per NFT</p>
                  <p>
                    <span>{depinDisplayPrice}</span> USDT
                  </p>
                </li>
                <li className="purchase">
                  <div className="price">Amount</div>
                  <IncrementInput
                    text={depinMintText}
                    value={depinNftValue}
                    onInput={value => handleInputChange(value, setDepinNftValue, ActionType.DEPIN)}
                    onIncrement={() => handleIncrementValue(depinNftValue, setDepinNftValue, ActionType.DEPIN)}
                    onDecrement={() => handleDecrementValue(depinNftValue, setDepinNftValue, ActionType.DEPIN)}
                    onMint={() => checkAndMintNft(ActionType.DEPIN)}
                  />
                </li>
              </ul>
              <div className="mint block md:hidden" onClick={() => checkAndMintNft(ActionType.DEPIN)}>
                {depinMintText}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src="assets/image/footer-top.png" alt="" />
      </div>
      <div className="bg-black44 pt-5">
        <div className="main officially">
          <div className="text">
            <p>
              DePIN NFTs enhance CID NFTs with more computing power and ecosystem benefits, such as governance rights
              and increased token rewards.
            </p>
            <p className="mt-6 md:mt-10">
              Acting as data processing nodes, each DePIN NFT receives allocated CID NFT computing power. Coral supplies
              iris recognition devices to DePIN NFT holders, enabling biometric verification and motion capture for the
              metaverse. DePIN NFTs conduct iris recognition, rewarding participants with Coral incentives.
            </p>
            <p className="mt-6 md:mt-10">
              Additionally, DePIN NFTs can autonomously promote and sell CID NFTs, with proceeds primarily benefiting
              the equipment provider and supporting Coral's ecosystem and maintenance.
            </p>
          </div>
          <div className="home-footer"></div>
        </div>
      </div>
      <Message
        title={title}
        txid={txid}
        isMessage={isMessage}
        imgMessage={imgMessage}
        closePop={() => {
          setIsMessage(false)
        }}
      />
      <Loading
        isLoading={isLoading}
        closeLoading={() => {
          setIsLoading(false)
        }}
      />
    </>
  )
}
