import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEL } from "../redux/actions/action";
import { useDispatch } from "react-redux";



export default function Navbar() {
  const getData = useSelector((state) => state.cartReducer.carts);
  const history =useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalPrice, settotalPrice] = useState(0);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  let counter = 0;
for (let i = 0; i < getData.length; i++) {
  if (getData[i].id) counter++;
}
if(counter==0){
  getData.length=0
    }
  console.log(counter)
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dlt =(id)=>{
    dispatch(DEL(id))
    history('/')
  }
const total=()=>{
  let price=0;
  getData.map((elem,k)=>{
    price=elem.price+price;
  })
  settotalPrice(price)
}
useEffect(()=>{
  total()
},[total])
  return (
    <nav className="navbar navbar-dark bg-dark px-5 fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand text-light" href="#">
            Cart
          </a>
          <NavLink className="text-light text-decoration-none pt-1" to="/">
            Home
          </NavLink>
        </div>
        <Badge
          badgeContent={counter}
          color="primary"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ShoppingCartIcon
            className="text-light"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          />
        </Badge>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Cart</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body m-0 p-0">
            {counter ? (
              <div className="col">
                {counter && getData.map((els) => {
                  return (
                    <div key={els.id} className="border shadow mb-3">
                      <div className=" px-1">
                        <div className="dropdown">
                          <MoreHorizIcon
                            id="dropdownMenu2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          />
                          <ul
                            className="dropdown-menu  dropdown-menu-lg-start"
                            aria-labelledby="dropdownMenu2"
                          >
                            <li>
                              <button className="dropdown-item" onClick={()=>{dlt(els.id)}} type="button">
                                <DeleteIcon />
                                Remove
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                     <div className=" d-flex border p-2">
                       <NavLink to={`/cart/${els.id}`}> <img
                          style={{height: "120px",width:"80px" }}
                          src={els.image}
                          alt=""
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"/></NavLink>
                        <div className="px-2 pt-3 w-100">
                          <h6>{els.title}</h6>
                          <p>
                            ₹ {els.price}
                          </p>
                           <div className="d-flex justify-content-end">
                           <p className="">Quantity :</p>
                            <label
                              className="text-center"
                              style={{ width: "20px", border: "none" }}
                            >{els.qtny}</label>
                           </div>
                           <div className="d-flex justify-content-end mx-5 ">
                           <p className="">Total :</p>
                            <label
                              className="text-center"
                              style={{ width: "20px", border: "none" }}
                            >  ₹{(els.price*els.qtny).toFixed(2)}</label>
                           </div>
                        </div>
                      </div>
                    </div>
                   );
                })}
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100 ">
                <p className="pt-3 fs-3" style={{ color: "grey" }}>
                  Your carts is Empty
                </p>
                <RemoveShoppingCartIcon
                  className="fs-1 mx-2"
                  style={{ color: "grey" }}
                />
              </div>
            )}
            
           
          </div>
        </div>
      </div>
    </nav>
  );
}
