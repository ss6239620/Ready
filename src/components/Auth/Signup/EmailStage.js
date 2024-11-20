import React from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import Basicinput from "../../../utils/input/Basicinput";

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
      className="modal-overlay"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="modal-content"
        style={{
          display: "flex",
          flexDirection: "column", // Stack content vertically
          justifyContent: "space-between",
        }}
      >
        <div style={{ paddingInline: 30 }}>
          <h2 style={{ marginBlock: 10 }}>Sign Up</h2>
          <div>
            <a>
              By continuing, you agree to our{" "}
              <span style={{ color: "#648EFC", cursor: "pointer" }}>
                User Agreement
              </span>{" "}
              and acknowledge that you understand the{" "}
              <span style={{ color: "#648EFC", cursor: "pointer" }}>
                Privacy Policy
              </span>{" "}
              .
            </a>
          </div>
          <BigButton
            Icon={FcGoogle}
            title={"Continue With google"}
            style={{ background: "#fff", color: "black", marginBlock: 10 }}
          />
          <BigButton
            Icon={FaMeta}
            title={"Continue With Meta"}
            style={{ background: "#fff", color: "black", marginBlock: 10 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBlock: 10,
            }}
          >
            <div style={{ border: "1px solid #FFFFFF19", width: "100%" }} />
            <span style={{ marginInline: 10 }}>OR</span>
            <div style={{ border: "1px solid #FFFFFF19", width: "100%" }} />
          </div>
          <Basicinput
            placeHolder={"Email"}
            style={{ marginBlock: 20 }}
            value={formValues.email}
            setFormValues={setFormValues}
            name="email"
          />
          <div style={{ marginBottom: 30 }}>
            <a>Alredy A Member? </a>
            <span style={{ color: "#648EFC", cursor: "pointer" }}>Log In</span>
          </div>
        </div>
        <div style={{ paddingInline: 30 }}>
          <BigButton
            title={"Continue"}
            disabled={isDisabled}
            style={{
              background: "red",
              borderRadius: 50,
              background: isDisabled ? "grey" : "red",
            }}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
