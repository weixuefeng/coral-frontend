/*
 * @Author:
 * @Date: 2024-03-18 10:55:51
 * @LastEditors:
 * @LastEditTime: 2024-03-18 13:57:30
 * @FilePath: /coral-frontend/src/pages/invite.tsx
 */

import { PageModel } from 'model/navModel'
import { IndexMainPage } from './index'
import { useRouter } from 'next/router'
import NormalLayout from 'components/Layout/normalLayout'

export default InvitePage

function InvitePage() {
  let pageModel = new PageModel('Invite', 'Coral', 'HOME')
  const router = useRouter()
  const params = router.asPath.split('?')[1] || undefined
  var address = ""
  // check
  if (params) {
    if(params.toString().startsWith("0x")) {
      if(params.indexOf("&") > 0) {
        // had third params
        address = params.split("&")[0]
      } else {
        //todo: add length check
        address = params
      }
    } else {
      if(params.indexOf("&")) {
        address = params.split("&")[0].split("=")[1]
      } else {
        address = params.split("=")[1]
      }
    }
    console.log("Ad", address)
    return <>{NormalLayout(IndexMainPage(address), pageModel)}</>
  } else {
    return <>{NormalLayout(IndexMainPage(null), pageModel)}</>
  }
  
}
