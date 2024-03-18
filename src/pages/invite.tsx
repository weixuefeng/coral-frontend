/*
 * @Author:  
 * @Date: 2024-03-18 10:55:51
 * @LastEditors:  
 * @LastEditTime: 2024-03-18 13:57:30
 * @FilePath: /coral-frontend/src/pages/invite.tsx
 */

import Home from './index'
import { useRouter } from 'next/router'

const Invite = () => {
  const router = useRouter()
  const params = router.asPath.split('?')[1] || []

  return (
    <Home />
  )
}

export default Invite