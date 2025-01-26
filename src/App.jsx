import {useState, useEffect } from 'react'
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {

    ////Manejo del carrito en formato persistente
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart
         ? JSON.parse(localStorageCart) : []
    }

    ///Data Base
    const [data] = useState(db)
    /// State Car
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS= 5;
    const MIN_ITEMS = 1;

    ///UseEffect trabaja en automatico y solo se actualzara, cuando (cart) tengan alguna novedad

    useEffect (() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    ///// Añaadir al carrito
    function addToCart(item){

        const itemExist = cart.findIndex(guitar => guitar.id === item.id);
        
        if(itemExist >= 0) {
            if ( cart[itemExist].quantity >= MAX_ITEMS) return 
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        } else { 
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    ///Remover elementos del carrito usando la X
    function removeFromCart(id){
        setCart((prevCart => prevCart.filter(guitar => guitar.id !== id)))
    }

    //// Aumentar cantidad de elementos por medio de interfaz 
    function increaseQuantity(id) {
        const updatedCart = cart.map( item => { 
            if( item.id === id && item.quantity < MAX_ITEMS ){
                return {
                    ...item,
                    quantity: item.quantity + 1 
                }
            }
            return item 
        })
        setCart(updatedCart)
    }

    //// Eliminando cantidades con la interfaz

    function decreaseQuantity(id) {
        const removedCart = cart.map ( item => {
            if (item.id === id && item.quantity >= MIN_ITEMS ){
                return {
                    ...item,
                    quantity: item.quantity - 1

                }
            }
            return item
        })
        setCart(removedCart)
    }

    // //// Vaciar el carrito 

    function emptyCart(){
        setCart([])
    }


  return (
    <>
    <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        emptyCart={emptyCart}

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


                setCart={setCart}
                
                cart={cart}
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
