import * as React from "react";
import { api } from "../../api/api";
import useForm from "react-hook-form";
import { useState } from "react";
import { utilFormValidation } from "../../utils/utilFormValidation";
import Modal from "react-modal";
import { useUtilBrowser } from "../../utils/UtilBrowserHook";

export interface IChangePasswordProps {}

const ChangePasswordInner: React.FC<IChangePasswordProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updatePasswordFetching, setUpdatePasswordFetching] = useState<boolean>(
    false
  );
  const [updatePasswordStatus, setUpdatePasswordStatus] = useState<boolean>(
    false
  );

  const {
    errors,
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearError,
  } = useForm();
  // const [hasPasswordChanged, setHasPasswordChanged] = useState(false);
  const isMobile = useUtilBrowser();

  // TODO: some spring validation error when the password has special chars (?) ERR 400
  const onSubmit = (data: any) => {
    setUpdatePasswordFetching(true);
    setShowModal(true);

    api
      .changePassword(data.oldPassword, data.newPassword)
      .subscribe((response) => {
        if (response.action === "success") {
          // setHasPasswordChanged(true);
          setUpdatePasswordStatus(true);
          setUpdatePasswordFetching(false);
          reset();
          return;
        }

        setUpdatePasswordFetching(false);
        setUpdatePasswordStatus(false);

        setError("oldPassword", "wrong", "Old password is wrong");
      });
  };

  return (
    <div className="profile_item1">
      <Modal
        ariaHideApp={false}
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
          setUpdatePasswordFetching(false);
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            maxWidth: isMobile ? "75%" : 700,
            width: "100%",
            borderRadius: 15,
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {updatePasswordFetching ? null : (
          <>
            <p style={{ color: "#006EDA" }}>
              {updatePasswordStatus
                ? "All changes Successfully Saved"
                : "Something went wrong"}
            </p>
            <button
              className="sell_button"
              style={{ maxWidth: 230 }}
              onClick={() => setShowModal(false)}
            >
              Done
            </button>
          </>
        )}
      </Modal>
      <form className="password_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="password_form-inputGroup d-flex">
          <input
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            className={`password_input${
              errors.oldPassword ? " auth_input-error" : ""
            }`}
            ref={register(utilFormValidation.config.required)}
            onFocus={() => clearError("oldPassword")}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className={`password_input${
              errors.newPassword ? " auth_input-error" : ""
            }`}
            ref={register({
              ...utilFormValidation.config.password,
              validate: {
                ...utilFormValidation.config.password.validate,
                notSame: (value: string) => value !== watch("oldPassword"),
              },
            })}
          />
          <input
            type="password"
            name="newPasswordConfirm"
            placeholder="Repeat New Password"
            className={`password_input${
              errors.newPasswordConfirm ? " auth_input-error" : ""
            }`}
            ref={register({
              required: true,
              validate: {
                confirm: (value) => value === watch("newPassword"),
                notSame: (value: string) => value !== watch("oldPassword"),
              },
            })}
          />
          <button
            type="submit"
            className="password_save"
            style={{ cursor: "pointer", minWidth: 220 }}
          >
            SAVE CHANGES
          </button>
        </div>
        {/* <div className="password_form-button">
                    <button type="submit" className="password_save" style={{cursor: "pointer", minWidth: 220}}>
                        SAVE CHANGES
                    </button>
                </div> */}
      </form>
    </div>
  );
};

export const ChangePassword = ChangePasswordInner;
