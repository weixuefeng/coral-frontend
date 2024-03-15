/*
 * @Author:  
 * @Date: 2024-01-13 22:42:06
 * @LastEditors:  
 * @LastEditTime: 2024-03-15 14:37:15
 * @FilePath: /coral-frontend/src/components/Layout/normalLayout.tsx
 */

import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import { PageModel } from 'model/navModel'

export default function NormalLayout(children: React.ReactNode, pageModel: PageModel = null): JSX.Element {

  function FooterWrap() {
    console.log('=====',pageModel?.name)
    if (pageModel?.name == "HOME") {
      return (
        <></>
      )
    } else {
      return <Footer />
    }
  }
  
  return (
    <>
      <Head>
        <title>{pageModel?.title}</title>
        <meta name="description" content={pageModel?.description} />
        <meta name="keywords" content="newtonproject" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <div className={pageModel.name}>
        {FooterWrap()}
      </div>
    </>
  )
}
