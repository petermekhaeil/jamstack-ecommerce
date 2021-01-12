import Link from "next/link"
import { FaTimes } from "react-icons/fa"
import { slugify } from "../utils/helpers"
import QuantityPicker from "../components/QuantityPicker"
import Image from "../components/Image"
import DENOMINATION from "../utils/currencyProvider"
import { useUpdateItem, useRemoveItem } from "nextjs-commerce-shopify"

const CartItem = ({ item }) => {
  const updateItem = useUpdateItem(item)
  const removeItem = useRemoveItem()

  async function increment(item) {
    const quantity = item.quantity + 1
    await updateItem({ quantity })
  }

  async function decrement(item) {
    if (item.quantity === 1) return
    const quantity = item.quantity - 1
    await updateItem({ quantity })
  }

  async function removeFromCart(item) {
    await removeItem({ id: item.id })
  }

  return (
    <div className="border-b py-10" key={item.id}>
      <div className="flex items-center hidden md:flex">
        <Link href={`/product/${slugify(item.name)}`}>
          <a aria-label={item.name}>
            <Image className="w-32 m-0" src={item.image} alt={item.name} />
          </a>
        </Link>
        <Link href={`/product/${slugify(item.name)}`}>
          <a aria-label={item.name}>
            <p
              className="
          m-0 pl-10 text-gray-600 w-60
          "
            >
              {item.name}
            </p>
          </a>
        </Link>
        <div className="ml-4">
          <QuantityPicker
            numberOfitems={item.quantity}
            increment={() => increment(item)}
            decrement={() => decrement(item)}
          />
        </div>
        <div className="flex flex-1 justify-end">
          <p className="m-0 pl-10 text-gray-900 tracking-wider">
            {DENOMINATION + item.price}
          </p>
        </div>
        <div
          role="button"
          onClick={() => removeFromCart(item)}
          className="
      m-0 ml-10 text-gray-900 text-s cursor-pointer
      "
        >
          <FaTimes />
        </div>
      </div>

      <div className="flex items-center flex md:hidden">
        <Link href={`/product/${slugify(item.name)}`}>
          <a>
            <Image className="w-32 m-0" src={item.image} alt={item.name} />
          </a>
        </Link>
        <div>
          <Link href={`/product/${slugify(item.name)}`}>
            <a aria-label={item.name}>
              <p
                className="
            m-0 pl-6 text-gray-600 text-base
            "
              >
                {item.name}
              </p>
            </a>
          </Link>
          <div className="ml-6 mt-4 mb-2">
            <QuantityPicker
              hideQuantityLabel
              numberOfitems={item.quantity}
              increment={() => increment(item)}
              decrement={() => decrement(item)}
            />
          </div>
          <div className="flex flex-1">
            <p className="text-lg m-0 pl-6 pt-4 text-gray-900 tracking-wider">
              {DENOMINATION + item.price}
            </p>
          </div>
        </div>
        <div
          role="button"
          onClick={() => removeFromCart(item)}
          className="
      m-0 ml-10 text-gray-900 text-s cursor-pointer mr-2
      "
        >
          <FaTimes />
        </div>
      </div>
    </div>
  )
}

export default CartItem
