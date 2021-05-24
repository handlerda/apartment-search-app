import React from "react";
import "./Card.css";

function Card() {
  return (
    <div className="card">
      <img
        src={
          "https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
        alt="denver test img"
        width="300px"
        height="300px"
      ></img>
      <div className="card-body">
        <h2 id="title">Hello from Denver</h2>
        <p id="">
          jdfkljdalk;dsfda;kldjfkl;asdkjlf djl kf dlkj fkjlljksdf lj fsj l l
          lj;sjflj;k;fkjldslkjdsadfad fdfadf
          dafdijusdafjkldfjkl;defjlkdfl;dfd;jlfkdafkdfdla;jkl;djfkldsak;dfjkl;djk;lafd;kal
        </p>
      </div>
      <h5 id="address">Address</h5>
    </div>
  );
}

export default Card;
