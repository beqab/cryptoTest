import {isEmail} from "../form/ValidatorConfig";

class UtilFormValidation {
    public config = {
        captcha: {
            validate: {
                cap: false,
            },
            required: true,
        },

        email: {
            validate: {
                email: isEmail,
            },
            required: true,
        },
        name: {
            minLength: 2,
            required: true,
        },
        password: {
            minLength: 8,
            required: true,
            validate: {
                lowerCase: (value: string) => /[a-z]/.test(value),
                upperCase: (value: string) => /[A-Z]/.test(value),
                numeric: (value: string) => /[0-9]/.test(value),
            },
        },

        required: {
            required: true,
        },

        phone: {
            required: true,
            minLength: 9,
        },

        month: {
            required: true,
            validate: {
                isSelected: (value: string) => value !== "month",
            },
        },

        year: {
            required: true,
            validate: {
                notAdult: (value: string | number) => 2020 - Number(value) > 18,
            },
        },
    };
}

export const utilFormValidation = new UtilFormValidation();
