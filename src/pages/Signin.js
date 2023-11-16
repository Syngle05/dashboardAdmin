import React, { useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsArrowRightCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/FireBase";
import ReactLoading from "react-loading";

function Signin() {
  const navigate = useNavigate();
  const [isInputText, setIsInputText] = useState();
  const [error, setError] = useState();
  const [viewPasswoard, setViewPasswoard] = useState(false);
  const [user, setUser] = useState(undefined);
  const [passwoard, setPasswoard] = useState(undefined);
  const [errorPasswoard, setErrorPasswoard] = useState();
  const [isPasswoardText, setIsPasswoardText] = useState();
  const [loadingButton, setLoadingButton] = useState(false);

  function handleChangeUser(e) {
    setUser(e.target.value.toLowerCase());
    if (e.target.value !== "") {
      setError(undefined);
      setIsInputText(true);
    } else {
      setIsInputText(false);
      setError(undefined);
    }
  }

  function handleChangePasswoard(e) {
    setPasswoard(e.target.value);
    if (e.target.value !== "") {
      setErrorPasswoard(undefined);
      setIsPasswoardText(true);
    } else {
      setIsPasswoardText(false);
      setErrorPasswoard(undefined);
    }
  }

  function submitUser(e) {
    if (user === "admin@admin.com") {
      setError(undefined);
      setViewPasswoard(true);
    } else {
      setError("Usuario incorreto");
    }
  }

  async function submitPasswoard(e) {
    setLoadingButton(true);
    if (passwoard === "Admin@123") {
      const data = await getToken();

      localStorage.setItem("token", data[0].tokenDefault);
      setErrorPasswoard(undefined);
      setLoadingButton(false);

      navigate("/");
    } else {
      setLoadingButton(false);
      setErrorPasswoard("Senha incorreto");
    }
  }

  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-themecolor-1000">
      <div className="p-4 ">
        <div className="w-full flex justify-center   items-center flex-col ">
          <MdOutlineSpaceDashboard className="text-secondColor-500 text-8xl" />
          <h1 className="text-2xl text-themecolor-200">DashBoardAdmin</h1>
        </div>
        <div className="mt-8 relative flex items-center">
          {!viewPasswoard && (
            <button
              onClick={submitUser}
              disabled={user === "" || user === undefined || viewPasswoard}
              className=" flex items-center absolute right-4"
            >
              <BsArrowRightCircle
                className={`text-2xl ${
                  isInputText ? "text-themecolor-500" : "text-themecolor-700 "
                }`}
              />
            </button>
          )}

          <input
            disabled={viewPasswoard}
            className={`${
              viewPasswoard && "rounded-b-none"
            } py-3 px-4 text-themecolor-200 pr-12 rounded-md placeholder:text-themecolor-600  w-[23rem] bg-themecolor-900 border border-themecolor-800`}
            type="text"
            autoComplete="on"
            name="user"
            placeholder="Usuario"
            onChange={handleChangeUser}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submitUser(event);
              }
            }}
          />
          {error && (
            <span className="text-red-500 text-sm absolute -bottom-6">
              {error}
            </span>
          )}
        </div>
        {viewPasswoard && (
          <div className="relative flex items-center">
            {viewPasswoard && (
              <button
                onClick={submitPasswoard}
                disabled={!viewPasswoard}
                className=" flex items-center absolute right-4"
              >
                {!loadingButton ? (
                  <BsArrowRightCircle
                    className={`text-2xl ${
                      isPasswoardText
                        ? "text-themecolor-500"
                        : "text-themecolor-700 "
                    }`}
                  />
                ) : (
                  <ReactLoading
                    type="spin"
                    color="#29B6F6"
                    height={24}
                    width={24}
                  />
                )}
              </button>
            )}
            <input
              autoFocus
              className="py-3 px-4 pr-12 text-themecolor-200 rounded-md placeholder:text-themecolor-600 rounded-t-none  w-[23rem] bg-themecolor-900 border border-themecolor-800"
              type="password"
              name="passwoard"
              placeholder="Passwoard"
              onChange={handleChangePasswoard}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitPasswoard(event);
                }
              }}
            />
            {errorPasswoard && (
              <span className="text-red-500 text-sm absolute -bottom-6">
                {errorPasswoard}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Signin;
