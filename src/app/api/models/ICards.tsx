export interface ICard {
    cardHolderName: string;
    cardNumber: string;
    expired: string;
    ccv: string;
    id: number;
}

export interface IResponeCreateCard {
    action: "success" | "error";
    data: ICard;
}

export interface IResponeDeleteCard {
    action: "success" | "error";
}
