import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { createOrder } from './helper/OrderHelper';
import { getmeToken, processPayment } from "./helper/paymentbhelper"
import DropIn from "braintree-web-drop-in-react"

const Paymentb = ({products, setReload = f =>f, reload = undefined}) => {

    const [ info, setinfo ] = useState({
        loading : false,
        success : false,
        clientToken : null,
        instance : {},
        error: ""
    });

    const userId = isAutheticated() && isAutheticated().user._id
    const token = isAutheticated() && isAutheticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            console.log("INFORMATION",info)
            if (info ) {
                setInfo({...info, error: info.error})
            }
            else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className = "btn btn-success btn-block" onClick={onPurchase}>Buy</button>
        </div>

                ) : (<h3>Please login or add something to cart</h3>) }
            </div>
        )
    }

useEffect(() => {
    getToken(userId, token)
}, [])


    const onPurchase = () => {
        setInfo ({loading: true})
        let nonce;
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            }
            processPayment(userId, token, paymentData)
            .then(res => {
                setinfo({...info, success: res.success, loading: false})

                const orderData = {
                    products : products,
                    transation_id : res.transation.id,
                    amount : res.transation.amount
                }
                createOrder(userId, token, orderData)
                cartEmpty(() => {

                })

                setReload(!reload);

            })
            .catch(err => {
                setinfo({loading: false, success: false})
            })
        })
        
    }

    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    }

    return (
        <div>
            <h3>Your bill is {getAmount()}</h3>
            {showbtdropIn()}
            
        </div>
    );
};

export default Paymentb;