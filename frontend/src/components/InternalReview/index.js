import React, { useEffect, useState } from "react";

import "./InternalReview.css";
function InternalReview() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [other, setOther] = useState("");
  const [review, setReview] = useState("");
  const [isInterested, setIsInterested] = useState(null);
  console.log(isInterested);
  return (
    <form className="form-box">
      <ur>
        {/* {errors.map((error, idx) => {
          <li key={idx}>{error}</li>;
        })} */}
      </ur>
      <label>Title</label>
      <div className="review-input-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <label>Review</label>
      <div className="review-input-group">
        <textarea
          type="text"
          value={title}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <h2>Interested in being contacted?</h2>
      <p>
        Similar to facebook marketplace people can reach out to you to ask
        specific questions! You can charge a price for your time!
      </p>
      <div className="review-input-group radio-group">
        <label>Yes, I am interested :)</label>
        <input
          type="radio"
          name="isInterested"
          value={true}
          onChange={(e) => setIsInterested(true)}
        />
      </div>
      <div className="review-input-group radio-group">
        <label>No, I am not interested</label>
        <input
          type="radio"
          value={false}
          name="isInterested"
          onChange={(e) => setIsInterested(false)}
        />
      </div>
      {isInterested === true && (
        <div className="interested">
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
              You can charge for your time to speak to a potential tenant. We
              find most people charge betweem 10-15 dollars for a 15 minute
              phone call, but it is up to you!
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
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default InternalReview;
