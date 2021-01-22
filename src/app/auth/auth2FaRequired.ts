import {BehaviorSubject} from "rxjs";

export const auth2FaRequired$ = new BehaviorSubject<boolean>(false);
