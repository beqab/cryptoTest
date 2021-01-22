import * as React from "react";
import {ActivateModal} from "../modals/activate/ActivateModal";
import {ChangePasswordModal} from "../modals/change-password/ChangePasswordModal";
import {ForgotModal} from "../modals/forgot/ForgotModal";
import {IdModal} from "./IdModal";
import {Login2FaModal} from "../modals/login-2fa/Login2FaModal";
import {LoginModal} from "../modals/login/LoginModal";
import {QrCodeModal} from "../modals/qr-code/QrCodeModal";
import {RegistrationModal} from "../modals/registration/RegistrationModal";
import {SellAndWithdrawModal} from "../exchange/SellAndWithdrawModal";

export const configModal: Map<IdModal, React.FC> = new Map([
    [IdModal.Activate, ActivateModal],
    [IdModal.Approve2Fa, Login2FaModal as any],
    [IdModal.LoginPrompt, LoginModal as any],
    [IdModal.RegistrationPrompt, RegistrationModal],
    [IdModal.ForgotPrompt, ForgotModal],
    [IdModal.ChangePassword, ChangePasswordModal],
    [IdModal.SellAndWithdraw, SellAndWithdrawModal],
    [IdModal.QrCode, QrCodeModal],
]);
