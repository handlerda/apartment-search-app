import React, { useEffect, useState } from "react";
import "./InternalReview.css";

function InterestedTenantForm() {
  const [text, setText] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [other, setOther] = useState("");
  return (
    <form>
      <div className="mediums">
        <h4>Select from the following mediums</h4>
        <div className="tenant-interested-options">
          <label>
            Text (SMS)
            <input
              name="text"
              type="checkbox"
              checked={text}
              onChange={() => setText(!text)}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="checkbox"
              checked={email}
              onChange={() => setEmail(!email)}
            />
          </label>
          <label>
            Phone
            <input
              name="phone"
              type="checkbox"
              checked={phone}
              onChange={() => setPhone(!phone)}
            />
          </label>
          <label>
            Other
            <input
              name="other"
              type="text"
              placeholder="Zoom, Facetime, e.t.c"
              onChange={(e) => setOther(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="price">
        <h4>Payment</h4>
        <p>
          You can charge for your time to speak to a potential tenant. We find
          most people charge betweem 10-15 dollars for a 15 minute phone call,
          but it is up to you!
        </p>
        <div className="tenant-interested-options">
          <label>
            Payment types you accept
            <input
              name="amount"
              type="text"
              placeholder="Venmo, Cash App, Bitcoin e.t.c"
              onChange={(e) => setOther(e.target.value)}
            />
          </label>
          <label>
            Amount
            <input
              name="amount"
              type="text"
              placeholder="Whatever feels right"
              onChange={(e) => setOther(e.target.value)}
            />
          </label>
        </div>
      </div>
    </form>
  );
}

export default InterestedTenantForm;
