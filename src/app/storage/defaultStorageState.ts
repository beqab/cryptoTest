import {IStorageState} from "./IStorageState";
import {IdLanguage} from "../locale/IdLanguage";
import {IdStorage} from "./IdStorage";

export const defaultStorageState: IStorageState = {
    [IdStorage.AccessToken]: "",
    [IdStorage.Language]: IdLanguage.English,
};
