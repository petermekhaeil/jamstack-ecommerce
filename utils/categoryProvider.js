import { fetchInventory } from './inventoryProvider'

async function fetchCategories () {
  const inventory = await fetchInventory()
  const categories = inventory.reduce((acc, next) => {
    next.categories.map(category => {
      if (acc.includes(category)) return
      acc.push(category)
    })
    return acc
  }, [])
  return Promise.resolve(categories)
}

export default fetchCategories