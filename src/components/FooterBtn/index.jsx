import React from 'react';
import './index.scss'

function Index({onCancel, onConfirm}) {
    return (
        <div className='foot'>
            <button className='cancel' onClick={() => onCancel()}>取消</button>
            <button className='confirm' onClick={() => onConfirm()}>确认</button>
        </div>
    );
}

export default Index;