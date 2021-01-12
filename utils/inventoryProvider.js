import { getAllCollections } from "nextjs-commerce-shopify"

/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

async function fetchInventory() {
  const collections = await getAllCollections({
    domain: process.env.DOMAIN,
    token: process.env.TOKEN,
  })

  const inventory = collections
    .map((collection) => {
      return collection.products
        .filter((product) => product.availableForSale)
        .map((product) => {
          return {
            id: product.variants[0].id,
            price: product.variants[0].price,
            name: product.title,
            image: product.variants[0].image.src,
            description: product.description,
            currentInventory: 100,
            brand: product.vendor,
            sku: product.variants[0].sku,
            categories: [collection.handle],
          }
        })
    })
    .flat()

  return Promise.resolve(inventory)
}

export { fetchInventory }
