import React from "react";
import "./InterestedTenant.css";

function InterestedTenant({
  title,
  body,
  name,
  text,
  email,
  phone,
  other,
  paymentOptions,
  requestedAmount,
}) {
  return (
    <div className="interested-tenant-container">
      <div className="interested">
        {title && body && (
          <div className="review">
            <div className="tenant-interested-options tenant-interested-review">
              <h4>Title: {title}</h4>
              <p>
                <span style={{ fontWeight: "bold" }}>review: </span>
                {body}
              </p>
            </div>
          </div>
        )}
        {requestedAmount && (
          <div className="interested-review">
            <div className="mediums">
              <div className="tenant-interested-options">
                <h4>How {name} wants to be reached out</h4>
                <label>
                  Text (SMS)
                  <input name="text" type="checkbox" checked={text} disabled />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="checkbox"
                    checked={email}
                    disabled
                  />
                </label>
                <label>
                  Phone
                  <input
                    name="phone"
                    type="checkbox"
                    checked={phone}
                    disabled
                  />
                </label>

                {other && (
                  <label>
                    Other
                    <input name="other" type="text" value={other} disabled />
                  </label>
                )}
              </div>
            </div>
            <div className="price">
              <div className="tenant-interested-options">
                <h4>Payment</h4>
                <label>
                  Payment types they accept
                  <input
                    name="paymentOptions"
                    type="text"
                    value={paymentOptions}
                    disabled
                  />
                </label>
                <label>
                  Amount
                  <input
                    name="amount"
                    type="text"
                    value={requestedAmount}
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterestedTenant;

{
  /* <div className="review-container">
<h4 className="review-content"> {name}</h4>
<h4 className="review-content">{date}</h4>
{text ? (
  <p className="review-content">{text}</p>
) : (
  <p className="review-content">
    This user did not leave detailed review
  </p>
)}
<h5 className="review-content"> {rating} Stars</h5>
</div> */
}
