import * as React from "react";
import {api} from "../../api/api";
import useForm from "react-hook-form";
import {utilFormValidation} from "../../utils/utilFormValidation";

export interface IManualCodeProps {
    setUsing2FA: (value: boolean) => void;
}

export const ManualCodeForm: React.FC<IManualCodeProps> = ({setUsing2FA}) => {
    const {errors, handleSubmit, register, setError, clearError} = useForm();

    const onSubmit = (data: any) => {
        const {code} = data;

        api.activate2Fa(code).subscribe((response) => {
            if (response.action === "success") {
                setUsing2FA(true);
                return;
            }

            setError("code", "wrong", "Something went wrong");
        });
    };

    return (
        <div>
            {errors.code && <div className="err_2fa">Please Check Code</div>}
            {/* <div className="profile_title2">
                If you have a problam with scanning the <br /> QR code please enter the one time password below.
            </div>
            <br />
            <div className="profile_title1 mb-15">Manual Code</div> */}
            <form className="code_form position-relative" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="code"
                    placeholder="Manual Code"
                    className={`profile_manual${errors.code ? " auth_input-error" : ""}`}
                    ref={register(utilFormValidation.config.required)}
                    onFocus={() => clearError("code")}
                />
                <button type="submit" className="code_save">
                    Enable
                </button>
            </form>
        </div>
    );
};
