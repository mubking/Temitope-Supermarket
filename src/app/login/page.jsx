import React from 'react';
import Login from '../../components/LoginForm';
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";
const LoginPage = async () => {
//   const session = await getServerSession(authOptions);
  return (
    <>
      <Login/>
      {/* <Login session={session}/> */}
     
    </>
  );
}

export default LoginPage;
