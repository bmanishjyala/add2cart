const INIT_STATE = {
  carts: [],
};

export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
     const ItemIndex=state.carts.findIndex((items)=>items.id === action.payload.id)
     if(ItemIndex >=0){
       state.carts[ItemIndex].qtny+=1
     }
     else{
       const temp={...action.payload,qtny:1}
       return {
        ...state,
        carts: [...state.carts, temp],
      };
     }
     break
      case "REM_CART":
        const data=state.carts.filter((el)=>el.id!==action.payload)

        return {
            ...state,
            carts:data
        }
      break
      case "RMV_ONE":
        const ItemIndex_dec=state.carts.findIndex((items)=>items.id === action.payload.id)
      if(state.carts[ItemIndex_dec].qtny>=1){
        const dltItem=state.carts[ItemIndex_dec].qtny-=1
        return {
          ...state,
          carts: [...state.carts, dltItem],
        };
      }
      else if(state.carts[ItemIndex_dec].qtny===1){
        const data=state.carts.filter((el)=>el.id!==action.payload)

        return {
            ...state,
            carts:data
        }
      }
     break
    default:
      return state;
  }
};
