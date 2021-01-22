import * as React from "react";
import {IManualCodeProps} from "./ManualCodeForm";
import {api} from "../../api/api";
import useForm from "react-hook-form";
import {utilFormValidation} from "../../utils/utilFormValidation";

export interface IDisable2FaFormProps extends IManualCodeProps {}

export const Disable2FaForm: React.FC<IDisable2FaFormProps> = ({setUsing2FA}) => {
    const {errors, handleSubmit, register, setError, clearError} = useForm();

    const onSubmit = (data: any) => {
        const {code} = data;

        api.disable2Fa(code).subscribe((response) => {
            if (response.action === "success") {
                setUsing2FA(false);
                return;
            }

            setError("code", "wrong", "Something went wrong");
        });
    };

    return (
        <div>
            {errors.code && <div className="err_2fa">Please Check Code</div>}
            <div className="profile_title1">Disable Code</div>
            <form className="code_form position-relative" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="code"
                    className={`profile_manual${errors.code ? " auth_input-error" : ""}`}
                    ref={register(utilFormValidation.config.required)}
                    onFocus={() => clearError("code")}
                />
                <button type="submit" className="code_save">
                    DISABLE
                </button>
            </form>
        </div>
    );
};
