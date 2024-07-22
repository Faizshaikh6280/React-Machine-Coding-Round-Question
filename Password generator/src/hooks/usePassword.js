import { useState } from "react";
function usePassword() {
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const generatePassword = (length, checkboxes) => {
    if (+length < 5) {
      setErrMsg("Password should be atleast 5 characters long.");
      return;
    }
    const lowerset = "abcdefghijklmnopqrstuvwxyz";
    const upperset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberset = "0123456789";
    const symbolset = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = "";
    checkboxes.forEach((el) => {
      if (el.status) {
        switch (el.case) {
          case "uppercase":
            charset += upperset;
            break;
          case "lowercase":
            charset += lowerset;
            break;
          case "number":
            charset += numberset;
            break;
          case "symbol":
            charset += symbolset;
            break;
        }
      }
    });
    if (!charset.length) {
      setErrMsg("Select which characters you want.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setPassword(password);
    setErrMsg("");
  };

  return { generatePassword, password, errMsg, setErrMsg };
}

export default usePassword;
