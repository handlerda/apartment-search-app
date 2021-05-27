import React from "react";

function InterestedTenant({
  name,
  text,
  email,
  phone,
  other,
  paymentOptions,
  requestedAmount,
}) {
  console.log(`hello world`);
  return (
    <div className="interested-tenant-container">
      <h5 className="interested-tenant-content">{name}</h5>
      <div className="interested">
        <div className="mediums">
          <h4>Select from the following mediums</h4>
          <div className="tenant-interested-options">
            <label>
              Text (SMS)
              <input name="text" type="checkbox" checked={text} disabled />
            </label>
            <label>
              Email
              <input name="email" type="checkbox" checked={email} disabled />
            </label>
            <label>
              Phone
              <input name="phone" type="checkbox" checked={phone} disabled />
            </label>
            <label>
              Other
              <input
                name="other"
                type="text"
                placeholder="Zoom, Facetime, e.t.c"
                value={other}
                disabled
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
