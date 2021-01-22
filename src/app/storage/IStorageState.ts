import {IdStorage} from "./IdStorage";

export type IStorageState = {
    [key in IdStorage]: string;
};
