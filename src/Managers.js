import React from 'react';

const Managers = ({ managers }) => {
    return (
        <ul>
        {
            managers.map((manager, idx) => <li key={ idx }>
                { manager }
            </li>)
        }
        </ul>
    )
}

export default Managers;