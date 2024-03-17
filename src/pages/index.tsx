/*
 * @Author:
 * @Date: 2024-03-13 21:36:45
 * @LastEditors:
 * @LastEditTime: 2024-03-17 19:28:27
 * @FilePath: /coral-frontend/src/pages/index.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/Layout/normalLayout'
import { PageModel } from 'model/navModel'
import IncrementInput from 'components/IncrementInput'
import { SmartContract, ThirdwebSDK, useAddress, useConnectedWallet } from '@thirdweb-dev/react'
import coralCidAbi from 'abi/coral-cid-abi'
import coralDepinAbi from 'abi/coral-depin-abi'
import { BaseContract, BigNumber, ethers } from 'ethers'

export default Home

function Home() {
  let pageModel = new PageModel('Overview', 'Coral', 'HOME')
  return <>{NormalLayout(Main(), pageModel)}</>
}

enum ActionType {
  CID,
  DEPIN,
}

function Main() {
  // 合约地址配置
  const usdtAddress = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'
  const cidAddress = '0x396DE4961D31De6d593B4252D94355c8367Ff727'
  const depinAddress = '0x6F4866Bccb37E5E0EB2789063681e61385a8F6C7'

  // 合约参数配置
  const perAddressCidLimit = 10
  const perAddressDepinLimit = 10

  // cid 价格配置
  const cidDisplayPrice = '0.1'
  const depinDisplayPrice = '0.1'
  const cidPrice = ethers.utils.parseUnits('0.1', 18)
  const depinPrice = ethers.utils.parseUnits('0.1', 18)
  const approveAmount = ethers.utils.parseUnits('0.3', 18)

  // 购买数量配置
  const [cidNftValue, setCidNftValue] = useState('1')
  const [depinNftValue, setDepinNftValue] = useState('1')

  // 钱包 signer
  const signer = useConnectedWallet()
  const address = useAddress()

  // 文案常量
  const usdtNotEnough = 'Insufficient USDT balance'
  const usdtApprove = 'Approve USDT For Mint'
  const mintText = 'Mint'

  // mint 文案配置
  const [cidMintText, setCidMintText] = useState(mintText)
  const [depinMintText, setDepinMintText] = useState(mintText)

  // 合约配置
  const [cidContract, setCidContract] = useState<SmartContract<BaseContract>>()
  const [usdtContract, setUsdtContract] = useState<SmartContract<BaseContract>>()
  const [depinContract, setDepinContract] = useState<SmartContract<BaseContract>>()

  // usdt 余额
  const [usdtBalance, setUsdtBalance] = useState<BigNumber>()

  // 初始化 sdk
  useEffect(() => {
    if (signer) {
      const sdk = ThirdwebSDK.fromSigner(signer)
      // 初始化 usdt 合约
      sdk
        .getContract(usdtAddress)
        .then(res => {
          setUsdtContract(res)
          // 初始化成功之后获取 usdt 余额
          res.erc20
            .balanceOf(address)
            .then(balance => {
              setUsdtBalance(balance.value)
            })
            .catch(e => {
              console.log('get usdt balance error:', e)
            })
        })
        .catch(e => {
          console.log('init usdt contract error', e)
        })
      // 初始化 cid 合约
      sdk
        .getContractFromAbi(cidAddress, coralCidAbi)
        .then(res => {
          setCidContract(res)
        })
        .catch(e => {
          console.log('init cid contract error', e)
        })
      // 初始化 depin 合约
      sdk
        .getContractFromAbi(depinAddress, coralDepinAbi)
        .then(res => {
          setDepinContract(res)
        })
        .catch(e => {
          console.log('init depin contract error', e)
        })
    }
  }, [signer, address])

  useEffect(() => {
    if (usdtContract && cidContract && depinContract && usdtBalance) {
      console.log('start check')
      checkAccountInfo(ActionType.CID, '1')
      checkAccountInfo(ActionType.DEPIN, '1')
    }
  }, [usdtContract, cidContract, depinContract, usdtBalance])

  const handleInputChange = (value, setValue, type: ActionType) => {
    if (!isNaN(value) && parseInt(value) >= 1) {
      setValue(value)
      checkAccountInfo(type, value.toString())
    }
  }

  const handleIncrementValue = (value, setValue, type: ActionType) => {
    const newValue = parseInt(value) + 1
    setValue(newValue.toString())
    checkAccountInfo(type, newValue.toString())
  }

  const handleDecrementValue = (value, setValue, type: ActionType) => {
    const newValue = parseInt(value) - 1
    if (newValue >= 1) {
      setValue(newValue.toString())
      checkAccountInfo(type, newValue.toString())
    }
  }

  const checkAccountInfo = async (type: ActionType, value: string) => {
    var price = type == ActionType.CID ? cidPrice : depinPrice
    var contractAddress = type == ActionType.CID ? cidAddress : depinAddress
    var setText = type == ActionType.CID ? setCidMintText : setDepinMintText
    console.log('type:', type)
    var totalPrice = BigNumber.from(value).mul(price)
    console.log('totalPrice: ', totalPrice)
    // 检查余额
    if (totalPrice > usdtBalance) {
      setText(usdtNotEnough)
      return
    }
    if (!usdtContract) {
      return
    }
    // 检查 usdt 是否授权
    var allowance = await usdtContract.erc20.allowance(contractAddress)
    console.log('allowance: ', allowance)
    if (allowance.value >= totalPrice) {
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

    // 计算总价格
    var totalPrice = BigNumber.from(mintAmount).mul(price)
    // 检查余额
    if (totalPrice > usdtBalance) {
      setCidMintText(usdtNotEnough)
      return
    }
    try {
      // 检查 usdt 是否授权
      var allowance = await usdtContract.erc20.allowance(contractAddress)
      // 如果授权数量大于等于需要的 usdt 数量，直接 mint
      if (allowance.value >= totalPrice) {
        if (contract) {
          try {
            var res = await contract.call(
              'claim',
              [address, parseInt(mintAmount), usdtAddress, price, [[], mintNftLimit, price, usdtAddress], []],
              {
                value: ethers.utils.parseUnits('0', 18),
              }
            )
            // todo: 弹框提示成功，显示出 txid，点击 txid 可以跳转到浏览器
            var mintTxid = res.receipt.transactionHash
            console.log('res:', mintTxid)
          } catch (e) {
            // todo: 弹框提示错误信息，比如用户拒绝等。
            console.log('Res: ', e)
          }
        } else {
          console.log('please init contract')
        }
      } else {
        // 如果授权数量不足，继续授权
        var maxValue = totalPrice
        if (totalPrice < approveAmount) {
          maxValue = approveAmount
        }
        var allowRes = await usdtContract.erc20.setAllowance(
          contractAddress,
          ethers.utils.parseUnits(ethers.utils.formatUnits(maxValue, 18), 18).toString()
        )
        // 最好可以加个 loading...
        // 授权成功，提示 "授权成功，前往浏览器查看 txid, 或者 3s 后刷新页面继续 mint"
        var allowTxid = allowRes.receipt.transactionHash
        console.log('allowRes: ', allowTxid)
      }
    } catch (e) {
      // 弹框提示错误信息
      // 过滤用户错误信息 user rejected transaction， 其余统一处理
      console.log('error:', e)
    }
  }

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
                  <p>10,000</p>
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
                  <p>10,000</p>
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
          <div className="home-footer">© 2024 Coral App.</div>
        </div>
      </div>
    </>
  )
}
