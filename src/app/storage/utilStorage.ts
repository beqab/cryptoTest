import {IdStorage} from "./IdStorage";
import {defaultStorageState} from "./defaultStorageState";

class UtilStorage {
    public get<T extends string = string>(id: IdStorage) {
        return (localStorage.getItem(id) || defaultStorageState[id]) as T;
    }

    public set(id: IdStorage, value: string) {
        localStorage.setItem(id, value);
    }

    public remove(id: IdStorage) {
        localStorage.removeItem(id);
    }

    public clear() {
        localStorage.clear();
    }
}

export const utilStorage = new UtilStorage();
