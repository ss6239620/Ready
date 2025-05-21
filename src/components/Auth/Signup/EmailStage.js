import React, { useState } from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import Basicinput from "../../../utils/input/Basicinput";
import { validateEmail } from "../../../utils/CommonFunction";

export default function EmailStage({
  isOpen,
  setModal,
  setNextModal,
  formValues,
  setFormValues,
}) {

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    // Close modal only if clicking on the overlay, not the modal content
    if (event.target === event.currentTarget) {
      setModal(false);
    }
  };

  function handleClick(params) {
    setModal(false);
    setNextModal(true);
  }

  const isDisabled = !formValues.email;

  return (
    <div
      className="modal-overlay div-center-justify-center "
      onClick={handleOverlayClick}
    >
      <div
        className="modal-content flex justify-between flex-col  px-[30px!important] "
      >
        <div  >
          <h2 className="large-text-large-weight mx-[0px!important]">Sign Up</h2>
          <div>
            <a>
              By continuing, you agree to our{" "}
              <span className={'accent-text-style cursor-pointer '}>
                User Agreement
              </span>{" "}
              and acknowledge that you understand the{" "}
              <span className={'accent-text-style cursor-pointer '}>
                Privacy Policy
              </span>{" "}
              .
            </a>
          </div>
          <BigButton
            Icon={FcGoogle}
            title={"Continue With google"}
            className={'secondary-bg primary-text my-3 rounded-3xl '}
          />
          <BigButton
            Icon={FaMeta}
            title={"Continue With Meta"}
            className={'secondary-bg primary-text my-3 rounded-3xl '}
          />
          <div
            className="div-center-justify-center my-3"
          >
            <div className="divider-bottom w-[100%]" />
            <span className="mx-3" >OR</span>
            <div className="divider-bottom w-[100%]" />
          </div>
          <Basicinput
            placeHolder={"Email"}
            className={'my-5'}
            value={formValues.email}
            validationFunc={validateEmail}
            setFormValues={setFormValues}
            name="email"
          />
          <div className="mb-7" >
            <a>Alredy A Member? </a>
            <span className={'accent-text-style cursor-pointer '}>
              Log In</span>
          </div>
        </div>
        <div className="py-7">
          <BigButton
            title={"Continue"}
            disabled={isDisabled}
            className={`rounded-[50px!important] ${isDisabled ? 'bg-[var(--divider)]' : 'bg-[var(--teritory)]'}`}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
