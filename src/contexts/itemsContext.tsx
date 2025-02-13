import { createContext, useContext, useState, ReactNode, useRef } from 'react'

const textArray = [
  { id: 1, text: 'React is great' },
  { id: 2, text: 'React is powerful' },
  { id: 3, text: 'React' },
  { id: 4, text: 'Vue' },
  { id: 5, text: 'Angular' },
  { id: 6, text: 'Svelte' },
  { id: 7, text: 'Next.js' },
  { id: 8, text: 'Node.js' },
  { id: 9, text: 'Django' },
  { id: 10, text: 'TypeScript is awesome' },
  { id: 11, text: 'JavaScript is versatile' },
  { id: 12, text: 'Python is great for data science' },
  { id: 13, text: 'GraphQL simplifies API calls' },
  { id: 14, text: 'Tailwind CSS makes styling easy' },
  { id: 15, text: 'Firebase for real-time apps' },
  { id: 16, text: 'Express.js is a flexible framework' },
  { id: 17, text: 'MongoDB for NoSQL' },
  { id: 18, text: 'PostgreSQL is a powerful database' },
  { id: 19, text: 'AWS provides scalable solutions' },
  { id: 20, text: 'Kubernetes is for container orchestration' },
  { id: 21, text: 'Docker simplifies container management' },
  { id: 22, text: 'Elixir is great for concurrent apps' },
  { id: 23, text: 'Rust is fast and secure' },
  { id: 24, text: 'Go is great for concurrent programming' },
  { id: 25, text: 'Ruby on Rails for quick web apps' },
  { id: 26, text: 'Swift is the future of iOS' },
  { id: 27, text: 'Flutter allows for cross-platform mobile apps' },
  { id: 28, text: 'PHP is still widely used' },
  { id: 29, text: 'Laravel for rapid PHP development' },
  { id: 30, text: 'PHP development' },
  { id: 31, text: 'HTML5 provides great multimedia support' },
  { id: 32, text: 'CSS3 for styling' },
  { id: 33, text: 'Sass for more powerful styling' },
  { id: 34, text: 'Less for simpler styling' },
  { id: 35, text: 'Stylus for flexible styling' },
  { id: 36, text: 'Bootstrap for quick styling' },
  { id: 37, text: 'Material-UI for React apps' },
  { id: 38, text: 'Chakra UI for React apps' },
  { id: 39, text: 'Ant Design for React apps' },
  { id: 40, text: 'Tailwind CSS for utility-first styling' },
  { id: 41, text: 'Jest for testing' },
  { id: 42, text: 'Cypress for end-to-end testing' },
  { id: 43, text: 'React Testing Library for testing React components' },
  { id: 44, text: 'Jasmine for testing JavaScript' },
  { id: 45, text: 'Mocha for testing' },
  { id: 46, text: 'Chai for testing' },
  { id: 47, text: 'Enzyme for testing React components' },
  { id: 48, text: 'Karma for testing' },
  { id: 49, text: 'Puppeteer for browser automation' },
  { id: 50, text: 'Playwright for browser automation' },
  { id: 51, text: 'Cucumber for BDD' },
  { id: 52, text: 'Gherkin for BDD' },
  { id: 53, text: 'Behave for BDD' },
  { id: 54, text: 'SpecFlow for BDD' },
  { id: 55, text: 'Cypress for BDD' },
  { id: 56, text: 'Jest for BDD' },
  { id: 57, text: 'Mocha for BDD' },
  { id: 58, text: 'Chai for BDD' },
  { id: 59, text: 'Jasmine for BDD' },
  { id: 60, text: 'Karma for BDD' },
  { id: 61, text: 'Puppeteer for BDD' },
  { id: 62, text: 'Playwright for BDD' },
  { id: 63, text: 'React for BDD' },
  { id: 64, text: 'Vue for BDD' },
  { id: 65, text: 'Angular for BDD' },
  { id: 66, text: 'Svelte for BDD' },
  { id: 67, text: 'Next.js for BDD' },
  { id: 68, text: 'Node.js for BDD' },
  { id: 69, text: 'Django for BDD' },
  { id: 70, text: 'TypeScript for BDD' },
  { id: 71, text: 'JavaScript for BDD' },
  { id: 72, text: 'Python for BDD' },
  { id: 73, text: 'GraphQL for BDD' },
  { id: 74, text: 'Tailwind CSS for BDD' },
  { id: 75, text: 'Firebase for BDD' },
  { id: 76, text: 'Express.js for BDD' },
  { id: 77, text: 'MongoDB for BDD' },
  { id: 78, text: 'PostgreSQL for BDD' },
  { id: 79, text: 'AWS for BDD' },
  { id: 80, text: 'Kubernetes for BDD' },
  { id: 81, text: 'Docker for BDD' },
  { id: 82, text: 'Elixir for BDD' },
  { id: 83, text: 'Rust for BDD' },
  { id: 84, text: 'Go for BDD' },
  { id: 85, text: 'Ruby on Rails for BDD' },
  { id: 86, text: 'Swift for BDD' },
  { id: 87, text: 'Flutter for BDD' },
  { id: 88, text: 'PHP for BDD' },
  { id: 89, text: 'Laravel for BDD' },
  { id: 90, text: 'HTML5 for BDD' },
]
type Item = {
  id: number
  text: string
}

type ItemsContextType = {
  items: Item[]
  addItem: (item: Item) => void
  removeItem: (id: number) => void
  filterAllItems: (ids: number[]) => void
  cleanFilterItems: () => void
  filterItem: (id: number) => void
  isFiltered?: boolean
  totalItems: number
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined)

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const items = useRef(textArray)
  const isFiltered = useRef(false)
  const [filteredItems, setFilteredItems] = useState<Item[]>(items.current)
  const addItem = (item: Item) => {
    items.current = [item, ...items.current]
    setFilteredItems((prev) => [item, ...prev])
  }

  const removeItem = (id: number) => {
    items.current = items.current.filter((item) => item.id !== id)
    setFilteredItems((prev) => prev.filter((item) => item.id !== id))
  }
  const filterItem = (id: number) => {
    setFilteredItems((prev) => prev.filter((item) => item.id === id))
    isFiltered.current = true
  }

  const filterAllItems = (ids: number[]) => {
    setFilteredItems((prev) => prev.filter((item) => ids.includes(item.id)))
    isFiltered.current = true
  }

  const cleanFilterItems = () => {
    setFilteredItems(items.current)
    isFiltered.current = false
  }

  return (
    <ItemsContext.Provider
      value={{
        items: filteredItems,
        addItem,
        filterItem,
        cleanFilterItems,
        removeItem,
        isFiltered: isFiltered.current,
        filterAllItems,
        totalItems: items.current.length,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export const useItems = () => {
  const context = useContext(ItemsContext)
  if (!context) throw new Error('useItems must be inside of ItemsProvider')
  return context
}
