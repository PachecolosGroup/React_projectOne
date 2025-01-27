/// Import de todoas la depencias
import {useState, useEffect } from 'react'
import { db } from "../data/db"
import { useMemo } from 'react'

///Hook funcion de javascript
export const useCart = () => {

    // Aca tendria que poner toda la logica, entre el return y el inicio de la funciton

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


        ////// states de Header 
         // Derivado
        const isEmpty = useMemo( () => cart.length === 0, [cart])  
        // derivado reduce
         const cartTotal = useMemo (
        () => cart.reduce((total, item) => total + (item.quantity * item.price), 0),
        [cart] 
    );


    return {
        data, 
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        emptyCart,
        increaseQuantity,
        isEmpty,
        cartTotal,
    }

}


