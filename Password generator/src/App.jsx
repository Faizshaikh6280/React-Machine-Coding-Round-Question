import usePassword from "./hooks/usePassword.js";
import { useState } from "react";

export default function App() {
  const [length, setLength] = useState(0);
  const [checkboxState, setCheckboxState] = useState([
    { title: "Include Uppercase Letters", case: "uppercase", status: false },
    { title: "Include Lowercase Letters", case: "lowercase", status: false },
    { title: "Include Numbers Letters", case: "number", status: false },
    { title: "Include Symbols Letters", case: "symbol", status: false },
  ]);
  const [copied, setCopied] = useState(false);

  const { password, errMsg, generatePassword, setErrMsg } = usePassword();

  function handleCheckbox(indx) {
    const newChecBoxes = [...checkboxState];
    newChecBoxes[indx].status = !newChecBoxes[indx].status;
    setCheckboxState(newChecBoxes);
  }
  function handleGeneratePassword() {
    generatePassword(length, checkboxState);
  }

  function handleCopy() {
    if (!password.length) {
      setErrMsg("There is no password to copy.");
      return;
    }
    navigator.clipboard.writeText(password);
    setCopied(true);
    setErrMsg("");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="password">
        <h2 className="password__display">{password}</h2>
        <div className="copy-btn">
          {copied ? (
            <span> Copied!</span>
          ) : (
            <span class="material-symbols-outlined" onClick={handleCopy}>
              file_copy
            </span>
          )}
        </div>
      </div>

      <div className="password-input">
        <div className="flex length">
          <h2>Character Length</h2>
          <h2>{length}</h2>
        </div>

        <input
          type="range"
          min={0}
          max={15}
          className="range"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <div className="checkboxes">
          {checkboxState.map((el, indx) => {
            return (
              <div className="checkbox" key={indx}>
                <input
                  type="checkbox"
                  id={el.case}
                  onChange={() => handleCheckbox(indx)}
                />
                <label htmlFor={el.case}> {el.title}</label>
              </div>
            );
          })}
        </div>

        <div className="strength flex">
          <h2>strength</h2>
          <div className="strength-display">
            <h2>
              {length < 6 && "Poor"}
              {length >= 6 && length < 10 && "Medium"}
              {length >= 10 && "Strong"}
            </h2>
            <div className="boxes">
              {Array.from({ length: 4 }, (_, indx) => {
                return (
                  <div
                    className={`box 
                    ${length < 6 && indx === 0 && "red"}
                    ${length >= 6 && length < 10 && indx < 3 && "yellow"}
                    ${length >= 10 && "green"} 
                    `}
                    key={indx}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>

        {errMsg && <p className="errmsg"> {errMsg}</p>}

        <button className="generate-button" onClick={handleGeneratePassword}>
          generate &rarr;
        </button>
      </div>
    </div>
  );
}
