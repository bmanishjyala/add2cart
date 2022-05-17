import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoodIcon from "@mui/icons-material/Mood";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";
import {FakeData} from './FakeData'

export default function ProductList() {
  const [data, setData] = useState(FakeData);
  const dispatch = useDispatch();
  const send = (e) => {
    
    dispatch(ADD(e));
  };

  return (
    <div>
      <div className="mt-2 container">
        <h2 className="text-center">All Products</h2>
        <div className="row d-flex mt-5 justify-content-center align-items-center">
          {data.map((datas, id) => {
            return (
              <div key={id}
                className="card mx-3 mb-5"
                style={{ width: "18rem", height: "24rem" }}
              >
                <img
                  src={datas.image}
                  className="card-img-top pt-3"
                  alt="..."
                  style={{ height: "12rem" }}
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ height: "50px", overflow: "hidden" }}
                  >
                    {datas.title}
                  </h5>
                  <div
                    className="d-flex justify-content-between"
                    style={{ height: "60px" }}
                  >
                    <p className="fs-5 d-flex align-items-center ">
                      <MoodIcon className="mx-1" />
                      {datas.rating.rate}
                    </p>
                    <p className="fs-5 d-flex align-items-center ">
                      <CurrencyRupeeIcon />
                      {(datas.price).toFixed(2)}
                    </p>
                  </div>
                
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        send(datas);
                      }}
                      className="btn btn-success w-100"
                    >
                      Add to Cart
                    </a>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
