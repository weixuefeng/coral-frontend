
import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import { PageModel } from 'model/navModel'

export default function NormalLayout(children: React.ReactNode, pageModel: PageModel = null): JSX.Element {
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
        <Footer />
      </div>
    </>
  )
}
