import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useCart } from './hooks/useCart'

function App() {

    // Custom hook
    const {  data, cart, addToCart, removeFromCart, decreaseQuantity, emptyCart, increaseQuantity, isEmpty, cartTotal } = useCart()


  return (
    <>
    <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        emptyCart={emptyCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}

    />

    <main className="container-xl mt-5">
        <h2 className="text-center"> Nuestra Colección </h2>

        <div className="row mt-5">
            {/* componente por cada guitarra, de acuerdo al numero de elmentos del array */}
            {
                data.map((guitar) => (
                <Guitar 
                key={guitar.name}
                guitar={guitar}
                addToCart={addToCart}
                />
            ))
            }
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

      
    </>
  )
}

export default App
