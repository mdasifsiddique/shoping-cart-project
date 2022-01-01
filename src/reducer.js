const reducer=(state,action)=>{

    // if(action.type==='CLEAR_CART'){
    //     return {...state,cart:[]}
    // }

    // if(action.type==='REMOVE'){
    //     const RemoveItem=state.cart.filter((item)=>item.id!==action.payload);
    //         return {...state,cart:RemoveItem}
    // }
    switch(action.type){
        case 'CLEAR_CART':{
            return {...state,cart:[]}
        }
        case 'REMOVE':{
            const RemoveItem=state.cart.filter((item)=>item.id!==action.payload);
            return {...state,cart:RemoveItem}
        }

        case 'INCREASE':{
            const  tempCart=state.cart.map((item)=>{
                if(item.id===action.payload){
                    return {...item,amount:item.amount+1}
                }
                else {
                    return {...item}
                }
            })

            return {...state,cart:tempCart}
        }


        
        case 'DECREASE':{
            let tempCart=state.cart.map((item)=>{
                if(item.id===action.payload){
                    return {...item,amount:item.amount-1}
                }
                else {
                    return {...item}
                }
            }).filter((nayaItem)=>nayaItem.amount!==0)

            return {...state,cart:tempCart}
        }

        case 'GET_TOTAL' :{
            let {total,amount}=state.cart.reduce((cartTotal,cartItem)=>{

            const {price,amount}=cartItem;
            cartTotal.amount+=amount;

            const itemTotalMoney=price*amount;
            cartTotal.total+=itemTotalMoney;

            return cartTotal;

            },{total:0,amount:0})


            total=parseFloat(total.toFixed(2));
            return {...state,amount:amount,total:total}
        }

        case 'LOADING':{
            return {...state,loading:true}
        }


        case 'DISPLAY_ITEMS':{
            return {...state,loading:false,cart:action.payload}
        }

    }

    return state;
}

export default reducer