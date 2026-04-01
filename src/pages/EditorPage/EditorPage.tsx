import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    Connection,
    NodeTypes,
    ReactFlowProvider,
} from 'reactflow';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../store';
import { IScenariosItem } from '../../store/scenarios/scenarios';
import CustomActionNode from '../../components/custom-action-node/custom-action-node';
import CustomIfNode from '../../components/custom-if-node/custom-if-node';
import "./EditorPage.css";


export default function EditorPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
    const [title, setTitle] = useState<string>("");
    const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]); // выделенные узлы

    const scenarios = useTypedSelector((store) => store.scenarious.list);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nodeTypes: NodeTypes = useMemo(() => {
        return {
            custom: CustomActionNode,
            if: CustomIfNode
        };
    }, []);

    const addNode = () => {
        const newNode: Node = {
            id: `node-${Date.now()}`,
            type: 'custom',
            position: {
                x: Math.random() * 400,
                y: Math.random() * 300,
            },
            data: { label: `Блок ${nodes.length + 1}` },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const addIfNode = () => {
        const newNode: Node = {
            id: `node-${Date.now()}`,
            type: 'if',
            position: {
                x: Math.random() * 400,
                y: Math.random() * 300,
            },
            data: { label: `Условие ${nodes.length + 1}` },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }, [setEdges]);

    // Отслеживаем изменение выделения
    const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
        setSelectedNodeIds(nodes.map(n => n.id));
    }, []);

    // Удаление выбранных узлов
    const deleteSelectedNodes = useCallback(() => {
        if (selectedNodeIds.length === 0) return;

        // Удаляем узлы
        setNodes(nds => nds.filter(node => !selectedNodeIds.includes(node.id)));
        // Удаляем рёбра, связанные с удалёнными узлами
        setEdges(eds => eds.filter(edge =>
            !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)
        ));
        // Сбрасываем выделение
        setSelectedNodeIds([]);
    }, [selectedNodeIds, setNodes, setEdges]);

    // Обработка нажатия клавиши Delete
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Delete' && selectedNodeIds.length > 0) {
                deleteSelectedNodes();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteSelectedNodes, selectedNodeIds]);

    const saveScenarios = () => {
        if (title.length === 0) {
            alert("Название сценария не должно быть пустым");
            return;
        }
        if (id) {
            const isScenarioExists = scenarios.find((el: IScenariosItem) => el.id === +id);
            dispatch({
                type: isScenarioExists ? "SAVE_SCENARIO" : "CREATE_SCENARIO",
                payload: { title, nodes, edges, id: +id }
            });
        }
        navigate("/");
    };

    useEffect(() => {
        if (id) {
            const currentScenario = scenarios.find((el: IScenariosItem) => el.id === +id);
            if (currentScenario) {
                setNodes(currentScenario.nodes);
                setEdges(currentScenario.edges);
                setTitle(currentScenario.title);
            }
        }
    }, [id, scenarios, setNodes, setEdges]);

    return (
        <div style={{ width: '100%', height: 'calc(100% - 100px)' }}>
            <div className="menu">
                <button onClick={addNode} className='create-btn'>
                    Блок действие
                </button>
                <button onClick={addIfNode} className='create-btn'>
                    Блок условие
                </button>
                <input
                    placeholder='Введите название сценария'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={deleteSelectedNodes}
                    className='btn'
                    disabled={selectedNodeIds.length === 0}
                    style={{ opacity: selectedNodeIds.length === 0 ? 0.5 : 1 }}
                >
                    Удалить выбранные ({selectedNodeIds.length})
                </button>
                <button onClick={saveScenarios} className='btn'>
                    Сохранить сценарий
                </button>
            </div>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onEdgeClick={onEdgeClick}
                    onSelectionChange={onSelectionChange}
                    nodeTypes={nodeTypes}
                    fitView
                    className='main-flow'
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}