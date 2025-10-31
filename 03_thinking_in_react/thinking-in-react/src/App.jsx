import { useState } from "react"

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
]

function FilterableProductTable({ products }){
  const [filteredText, setFilteredText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div>
      <SearchBar filteredText={filteredText} inStockOnly={inStockOnly} onFilterTextChange={setFilteredText} onInStockOnlyChange={setInStockOnly} />
      <ProductTable products={products} filteredText={filteredText} inStockOnly={inStockOnly} />
    </div>
  )
}

function SearchBar({ filteredText, inStockOnly, onFilterTextChange, onInStockOnlyChange }){
  return (
    <form>
      <input type="text" placeholder="Search..." value={filteredText} onChange={(e) => {onFilterTextChange(e.target.value)}}/>
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => {onInStockOnlyChange(e.target.checked)}}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products, filteredText, inStockOnly }){
  const rows = []
  let previous_category

  products.forEach((product) => {
    if(product.name.toLowerCase().indexOf(filteredText.toLowerCase()) === -1){
      return
    }
    if(inStockOnly && !product.stocked){
      return
    }
    if(previous_category !== product.category){
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category}/>
      )
    }
    rows.push(
      <ProductRow product={product} key={product.name}/>
    )
    previous_category = product.category
  })

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

function ProductCategoryRow({ category }){
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  )
}

function ProductRow({ product }){
  const name = product.stocked ? product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

export default function App(){
  return <FilterableProductTable products={PRODUCTS} />
}