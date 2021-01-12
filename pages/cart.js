import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { CommerceProvider, useCommerce } from "nextjs-commerce-shopify"
import DENOMINATION from '../utils/currencyProvider'
import Head from 'next/head'
import CartLink from '../components/CartLink'
import CartItem from '../components/CartItem'

const Cart = () => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  const { checkout } = useCommerce()
  const { totalPriceV2 } = checkout || {}
  const total = totalPriceV2?.amount || '';

  const cart = checkout?.lineItems ?? []

  const numberOfItemsInCart = checkout?.lineItems.reduce(
    (count, item) => count + item.quantity,
    0
  )

  const cartEmpty = numberOfItemsInCart === Number(0)

  if (!renderClientSideComponent) return null

  return (
    <>
      <CartLink />
      <div className="flex flex-col items-center pb-10">
        <Head>
          <title>Jamstack ECommerce - Cart</title>
          <meta name="description" content={`Jamstack ECommerce - Shopping cart`} />
          <meta property="og:title" content="Jamstack ECommerce - Cart" key="title" />
        </Head>
        <div className="
          flex flex-col w-full
          c_large:w-c_large
        ">
          <div className="pt-10 pb-8">
            <h1 className="text-5xl font-light">Your Cart</h1>
          </div>

          {
            cartEmpty ? (
              <h3>No items in cart.</h3>
            ) : (
              <div className="flex flex-col">
                <div>
                  {
                  cart.map((item) => {
                    return {
                      id: item.id,
                      name: item.title,
                      image: item.variant.image.src,
                      quantity: item.quantity,
                      price: item.variant.price,
                    }
                  })
                  .map((item) => {
                      return (
                        <CartItem item={item} key={item.id} />
                      )
                    })
                  }
                </div>  
            </div>
            )
          }
          <div className="flex flex-1 justify-end py-8">
            <p className="text-sm pr-10">Total</p>
            <p className="font-semibold tracking-wide">{DENOMINATION + total}</p>
          </div>
          {!cartEmpty && (
            <Link href={checkout?.webUrl || "#"} className="flex flex-1 justify-end">
              <a aria-label="Check out">
                <div className="cursor-pointer flex items-center">
                  <p className="text-gray-600 text-sm mr-2">Proceed to check out</p>
                  <FaLongArrowAltRight className="text-gray-600" />
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

function CartWithContext(props) {
  return (
    <CommerceProvider
      config={{
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        token: process.env.NEXT_PUBLIC_TOKEN,
      }}
    >
      <Cart {...props} />
    </CommerceProvider>
  )
}


export default CartWithContext