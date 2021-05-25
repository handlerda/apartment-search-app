import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getApartmentDetails } from "../../store/apartment";

function Apartment() {
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getApartmentDetails(id));
  }, [dispatch]);
  console.log(id);
  return <div>{id}</div>;
}

export default Apartment;
