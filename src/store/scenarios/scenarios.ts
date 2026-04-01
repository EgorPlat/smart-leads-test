import { IPayload } from "..";
import { Node, Edge } from 'reactflow';

export interface IScenariosItem {
    id: number,
    title: string,
    nodes: Node[],
    edges: Edge[]
};

export interface IScenariosState {
    list: IScenariosItem[],
};

const scenariosState: IScenariosState = {
    list: [
        { id: 1, nodes: [], edges: [], title: "Сценарий 1" },
        { id: 2, nodes: [], edges: [], title: "Сценарий 2" },
    ],
};

export function scenariosReducer(state = scenariosState, data: IPayload) {
    switch(data.type) {
        case "SET_SCENARIOS": 
            return { ...state, list: data.payload }
        case "SAVE_SCENARIO":
            return { 
                ...state, 
                list: state.list.map(el => {
                    if (el.id === data.payload.id) {
                        return data.payload;
                    }
                    return el;
                })
            }
        case "CREATE_SCENARIO":
            return { 
                ...state, 
                list: [
                    ...state.list,
                    data.payload
                ]
            }
        default:
            return state;
    }
}