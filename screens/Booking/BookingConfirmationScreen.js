import React, { useEffect, useState } from "react";
import Booking from "../../components/Booking";

const BookingConfirmationScreen = ({ route }) => {
  const bookingInfo = route.params.bookingInfo;

  return <Booking {...bookingInfo}></Booking>;
};

export default BookingConfirmationScreen;
