import {IExchangeItem} from "./IExchangeItem";
import {IdCurrency} from "../constants/IdCurrency";

export type IExchange = {[key in IdCurrency]: IExchangeItem};
