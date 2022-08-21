import Filters from '../../Components/Filters';
import Product from '../../Components/Product';
import { CartState } from '../../context/Context'
import './Home.css'

const Home = () => {
  const { 
    state: { products },
    prodState: { sort, byStock, byFastDelivery, byRating, searchQuery }
  } = CartState();
  console.log(sort);
  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
        sortedProducts = sortedProducts.sort((a, b) => 
        sort === "lowtoHigh" ? a.price - b.price : b.price - a.price
        );
      }
      
      if(!byStock) {
        sortedProducts = sortedProducts.filter((prd) => prd.inStock)
      }
      
      if(byFastDelivery) {
        sortedProducts = sortedProducts.filter((prd) => prd.fastDelivery)
      }
      
      if (byRating) {
        sortedProducts = sortedProducts.filter((prd) => prd.ratings >= byRating)
      }
      
      if (searchQuery) {
        sortedProducts = sortedProducts.filter((prd) => prd.name.toLowerCase().includes(searchQuery))
      }
      return sortedProducts
    }
  return (
    <div className='home'>
      <Filters />
      <div className='productContainer'>
        {
          transformProducts().map((prd => {
            return <Product prd={prd} key={prd.id} />
          }))
        }
      </div>
    </div>
  )
}

export default Home