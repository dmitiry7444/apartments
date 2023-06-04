import React from 'react';

const AppliedFilterItem = (props) => {
    return (
        <div className="apartments-applied-filter">
            <span>{props.item.layoutName}</span>
            <a onClick={() => props.deleteParams(props.item.name)}>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2058_553)">
                        <line x1="1.93562" y1="3.1499" x2="13.9564" y2="15.1707"
                              stroke="#A8ABA7"
                              strokeLinecap="round"/>
                        <line x1="13.9238" y1="3.12996" x2="1.90301" y2="15.1508"
                              stroke="#A8ABA7"
                              strokeLinecap="round"/>
                    </g>
                </svg>
            </a>
        </div>
    );
};

export default AppliedFilterItem;