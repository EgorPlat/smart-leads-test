import type { Edge, Node } from 'reactflow';

export interface ScenarioMeta {
    id: string;
    name: string;
    updatedAt: string; // ISO string
}

export interface Scenario extends ScenarioMeta {
    nodes: Node[];
    edges: Edge[];
}

export type NewScenarioInput = {
    name?: string;
};

export interface SaveResult {
    success: true;
    scenario: Scenario;
}
