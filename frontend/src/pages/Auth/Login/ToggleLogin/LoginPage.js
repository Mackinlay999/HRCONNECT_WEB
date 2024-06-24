import React, { useState } from "react";
import UserLogin from "../UserLogin/UserLogin";
import HrLogin from "../HrLogin/HrLogin";

const LoginPage = () => {
  const [isHRLogin, setIsHRLogin] = useState(false);

  const toggleLoginType = () => {
    setIsHRLogin(!isHRLogin);
  };

  return (
    <>
      {isHRLogin ? (
        <HrLogin toggleLoginType={toggleLoginType} />
      ) : (
        <UserLogin toggleLoginType={toggleLoginType} />
      )}
    </>
  );
};

export default LoginPage;
