import React, { useState } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import './custom-if-node.css';

interface CustomConditionNodeData {
    label: string;
    trueLabel?: string;
    falseLabel?: string;
}

const CustomIfNode: React.FC<NodeProps<CustomConditionNodeData>> = ({ id, data, selected }) => {
    const { setNodes } = useReactFlow();
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(data.label);

    const handleDoubleClick = () => setIsEditing(true);

    const handleBlur = () => {
        if (inputValue !== data.label) {
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === id
                        ? { ...node, data: { ...node.data, label: inputValue } }
                        : node
                )
            );
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleBlur();
    };

    return (
        <div className={`custom-condition-node ${selected ? 'selected' : ''}`} onDoubleClick={handleDoubleClick}>
            <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
            <div className="node-content">
                {isEditing ? (
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="node-input"
                    />
                ) : (
                    <div className="node-label">{data.label}</div>
                )}
            </div>
            <div className="handles-bottom">
                <div className="handle-wrapper">
                    <Handle type="source" position={Position.Bottom} id="true" className="handle-true" />
                    <span className="handle-label">{data.trueLabel || 'Да'}</span>
                </div>
                <div className="handle-wrapper">
                    <Handle type="source" position={Position.Bottom} id="false" className="handle-false" />
                    <span className="handle-label">{data.falseLabel || 'Нет'}</span>
                </div>
            </div>
        </div>
    );
};

export default CustomIfNode;