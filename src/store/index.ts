import { combineReducers, createStore } from "redux"
import { IScenariosState, scenariosReducer } from "./scenarios/scenarios"
import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface IPayload {
    type: string,
    payload: any
};

export interface IRootStore {
    scenarious: IScenariosState
};

const rootReducer = combineReducers({
    scenarious: scenariosReducer
});

export const store = createStore(rootReducer);

export const useTypedSelector: TypedUseSelectorHook<IRootStore> = useSelector;


