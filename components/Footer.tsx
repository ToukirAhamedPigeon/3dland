import { footerLinks } from '@/constants'
import React from 'react'

const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5'>
      <div>
        <p className="font-semibold text-gray text-xs">
            More ways to shop: {' '}
            <span className="underline text-blue">
                Find an Apple Store {' '}
            </span>
            or {' '}
            <span className="underline text-blue">
                other retailer {' '}
            </span>
            near you. {' '}
            </p>
            <p className="font-semibold text-gray text-xs">
            <span className="underline text-blue">
                Visit an Apple Store {' '}
            </span>
            to pick up your order, or {' '}
            <span className="underline text-blue">
                shop online {' '}
            </span>
            at apple.com.
        </p>
      </div>
      <div className='bg-neutral-700 my-5 h-[1px] w-full'/>
      <div className="flex md:flex-row flex-col md:items-center justify-between">
      <p className="font-semibold text-gray text-xs">
        Copyright © 2024 Apple Inc. All rights reserved.
      </p>
      <div className="flex">
        {footerLinks.map((link,i) => (
            <p key={link} className="font-semibold text-gray text-xs cursor-pointer">
                {link}{' '}
                {i!==footerLinks.length-1 && (<span className='mx-2'>|</span>)}
            </p>
        ))}
      </div>
      </div>
    </footer>
  )
}

export default Footer
