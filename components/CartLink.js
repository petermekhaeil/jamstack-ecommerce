import { useState, useEffect } from 'react'
import { CommerceProvider, useCommerce } from "nextjs-commerce-shopify"
import { FaShoppingCart, FaCircle } from 'react-icons/fa';
import Link from "next/link"
import { colors } from '../theme'
const { primary } = colors

function CartLink(props) {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  const { checkout } = useCommerce()

  const numberOfItemsInCart = checkout?.lineItems.reduce(
    (count, item) => count + item.quantity,
    0
  )

  return (
    <div>
      <div className="fixed
      sm:top-53 right-24 desktop:right-flexiblemargin
      top-40 z-10">
        <div className="flex flex-1 justify-end pr-4 relative">
          <Link href="/cart">
            <a aria-label="Cart">
              <FaShoppingCart />
            </a>
          </Link>
          {
            renderClientSideComponent && numberOfItemsInCart > Number(0) && (
              <FaCircle color={primary} size={12} suppressHydrationWarning />
            )
          }
        </div>
      </div>
    </div>
  )
}

function CartLinkWithContext(props) {
  return (
    <CommerceProvider
      config={{
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        token: process.env.NEXT_PUBLIC_TOKEN,
      }}
    >
      <CartLink {...props} />
    </CommerceProvider>
  )
}

export default CartLinkWithContext