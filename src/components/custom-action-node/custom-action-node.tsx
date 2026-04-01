import React, { useState } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import './custom-action-node.css';

interface CustomActionNodeData {
    label: string;
}

const CustomActionNode: React.FC<NodeProps<CustomActionNodeData>> = ({ id, data, selected }) => {
    const { setNodes } = useReactFlow();
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(data.label);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

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
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <div className={`custom-action-node ${selected ? 'selected' : ''}`} onDoubleClick={handleDoubleClick}>
            <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
            {isEditing ? (
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{ width: '100%', textAlign: 'center' }}
                />
            ) : (
                <div>{data.label}</div>
            )}
            <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
        </div>
    );
};

export default CustomActionNode;