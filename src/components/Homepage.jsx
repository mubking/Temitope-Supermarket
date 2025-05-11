import React from "react";
import { FaPhone } from "react-icons/fa6";

function Homepage() {
  return (
    <div className="bg-white h-screen w-full ">
      <div className="bg-[green] text-white text-center h-[20vh] justify-center items-center flex flex-col ">
        <h3 className="text-xl">
          Malete and ibadan deliveries will be done on Thursdays |Office address
          at No12 beside Olowo gada complex,taiwo isale llorin | Contact us to
          invest in our ranching projects - +234 9056116119 or +234 9037352863
        </h3>

        <h2 className="mt-3">
          Share your coupon code with family, friends & foes to earn commission
          on every order completed on Foodlocker. They will enjoy a one-time 0%
          discount on their purchase.
        </h2>
      </div>
      <div className="bg-[#444444] h-[20vh  text-center h-[20vh] justify-center flex ]">
        <div className="flex items-center gap-2">
        <FaPhone />
        <div>
        <h1 className="text-lg"> For supplies(wholesale) and enquires call +234 905 611 6119 , +234 903 735 2863</h1>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
