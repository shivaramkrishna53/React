import React, { useEffect, useRef, useState } from "react";

export default function () {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [gender, setGender] = useState("");
  let [languages, setLanguages] = useState([]);
  let [otherlangflag, setOtherlangflag] = useState(false);
  let [otherlangtext, setOtherlangtext] = useState("");
  let fname = useRef("");
  let lname = useRef("");
  let [erros, setErrors] = useState({});
  let [submitflag, setSubmitflag] = useState(false);

  const handlecheckbox = (e) => {
    if (e.target.checked) {
      setLanguages([...languages, e.target.value]);
    } else {
      setLanguages(
        languages.filter((item) => {
          return item !== e.target.value;
        })
      );
    }
  };

  const handleothertodisplay = (e) => {
    let ele = document.getElementById("otherlangtxt");
    if (e.target.checked) {
      setOtherlangflag(true);
      ele.style.display = "block";
      console.log("inside if");
    } else {
      setOtherlangflag(false);
      ele.style.display = "none";
      console.log("inside else");
      setLanguages(languages.filter((ele) => ele !== otherlangtext));
      setOtherlangtext("");
    }
  };

  const storeintolanguagesarray = () => {
    console.log("inside storeintolanguagesarray");
    if (otherlangflag) {
      setLanguages([...languages, otherlangtext]);
    } else {
      setLanguages(languages.filter((ele) => ele !== otherlangtext));
    }
  };

  const submitform = (e) => {
    e.preventDefault();
    setErrors(checkforerrors());
    setSubmitflag(true);
  };

  useEffect(() => {
    if (Object.keys(erros).length === 0 && submitflag) {
      alert(
        `Email::${email} Password::${password} Gender::${gender} Languges::${languages} FirstName::${fname.current.value} LastName::${lname.current.value}`
      );
    }
  }, [erros]);

  const checkforerrors = () => {
    let errs = {};
    if (email.length == 0) errs.emailerror = "email cannot be empty";
    else if (!email.includes("@"))
      errs.emailerror = "should contain @ for email id";
    else if (password.length == 0)
      errs.passworderror = "password cannot be empty";
    else if (password.length <= 5)
      errs.passworderror = "password needs to be minimum of 5 characters";
    else if (gender.length == 0) errs.gendererror = "Gender cannot be empty";
    else if (languages.length == 0)
      errs.languageserror = "Any one language you need to know";

    return errs;
  };

  return (
    <div className="container">
      <div style={{ width: "50%", textAlign: "left" }} className="container">
        <h1>Login Form::</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {erros.emailerror && (
              <div
                id="emailerro"
                className="form-text"
                style={{ color: "red" }}
              >
                {erros.emailerror}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {erros.passworderror && (
            <div
              id="passworderro"
              className="form-text"
              style={{ color: "red" }}
            >
              {erros.passworderror}
            </div>
          )}

          <label>Gender::</label>
          <br></br>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="male"
              onChange={(event) => setGender(event.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="female"
              onChange={(event) => setGender(event.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Female
            </label>
          </div>
          {erros.gendererror && (
            <div
              id="gendererror"
              className="form-text"
              style={{ color: "red" }}
            >
              {erros.gendererror}
            </div>
          )}
          <label>Languages Known::</label>
          <br></br>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              className="btn-check"
              id="btncheck1"
              autoComplete="off"
              value="telugu"
              onChange={(e) => handlecheckbox(e)}
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck1">
              TELUGU
            </label>
            <input
              type="checkbox"
              className="btn-check"
              id="btncheck2"
              autoComplete="off"
              value="hindi"
              onChange={(e) => handlecheckbox(e)}
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck2">
              HINDI
            </label>
            <input
              type="checkbox"
              className="btn-check"
              id="btncheck3"
              autoComplete="off"
              value="other"
              onChange={(e) => handleothertodisplay(e)}
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck3">
              OTHER
            </label>
          </div>
          <br></br>
          <div id="otherlangtxt" style={{ display: "none" }}>
            <label>Enter Other language: </label>
            <input
              type="text"
              value={otherlangtext}
              onChange={(e) => setOtherlangtext(e.target.value)}
              onBlur={storeintolanguagesarray}
            ></input>
          </div>
          {erros.languageserror && (
            <div
              id="languageserror"
              className="form-text"
              style={{ color: "red" }}
            >
              {erros.languageserror}
            </div>
          )}
          <br></br>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              First Name::
            </label>
            <input
              type="text"
              ref={fname}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <br></br>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last Name::
            </label>
            <input
              type="text"
              ref={lname}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => submitform(e)}
          >
            Submit
          </button>
        </form>
        <p id="result"></p>
      </div>
    </div>
  );
}
