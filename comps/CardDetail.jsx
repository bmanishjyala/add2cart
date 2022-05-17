import React from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { DEL,ADD,REMOVE } from "../redux/actions/action";
import { useDispatch } from "react-redux";
export default function CardDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const history =useNavigate()
  const [qty,setQtny]=useState(0)
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.cartReducer.carts);
  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
  };
  const send = (e) => {
    
    dispatch(ADD(e));
  };
  const dlt =(isd)=>{
    dispatch(DEL(isd))
    history('/')
  
  }
  const remove=(item)=>{
    dispatch(REMOVE(item))
  }
  useEffect(() => {
    compare();
  }, [id,qty]);
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Item Details</h2>
      </div>
      <section className="d-flex mt-3 justify-content-center">
        {data.map((element) => {
          return (
            <div
              className="detailCard d-flex border px-4 py-3"
              
            >
             
              <img
                style={{ width:"200px",height: "100%" }}
                src={element.image}
                alt="Product Image"
                className="mx-3"
              />
              <div className="w-100 pt-4">
                <h6 className="text-center">{element.title}</h6>
                <div
                  className="d-flex prting justify-content-around"
                  style={{ height: "60px" }}
                >
                  <div className="fs-5 d-flex align-items-center ">
                    <h6 className=" fw-bold pt-1">Rating :</h6>
                    <span className="mx-1  px-1  ">
                      {element.rating.rate}
                    </span>
                  </div>
                  <div className="fs-5 d-flex align-items-center ">
                    <h6 className="pt-2 mx-2 fw-bold">Price : </h6>
                    ₹ {(element.price).toFixed(2)}
                  </div>
                </div>
                <div className="d-flex tqing justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn fw-bold fs-5 shadow-none border px-3 mx-1"
                      onClick={() => {
                        if(element.qtny<=1){
                           dlt(element.id)
                        }else{
                          remove(element)
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      id="input"
                      type="text"
                      className="text-center"
                      value={element.qtny}
                      onChange={(e)=>{
                        e.preventDefault()
                        setQtny(e.target.value)

                      }}
                      style={{ width: "30px", border: "none" }}
                    />
                    <button
                      className="btn fw-bold fs-5 shadow-none border px-3 mx-1"
                      onClick={() => {
                        send(element)
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="fs-5 pt-2 d-flex align-items-center ">
                    <h6 className="pt-2 mx-2 fw-bold">Total : </h6> {((element.price)*(element.qtny)).toFixed(2)}
                  </div>
                </div>
                <div className="mt-5">
                <h6>About The Product</h6>
                        <p>{element.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
