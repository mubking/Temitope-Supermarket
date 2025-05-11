import React from 'react'
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../lib/auth';
import Signup from "../../components/Signup"

const page = async () => {
    // const session = await getServerSession(authOptions);
    // console.log(session);  
  return (
   
    <div>
        {/* <Signup session={session}/> */}
        <Signup />
    </div>
  )
}

export default page