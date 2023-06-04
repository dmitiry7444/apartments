import React from 'react';
import '../styles/FilterComponent.css'

const FilterComponent = (props) => {
    return (
        <div className="filter-item">
            <div className="filter-item-name">{props.item.name}</div>
            <div className="filter-item-inputs">
                {props.item.type === 'text' ? props.item.selector.map((el, index) =>
                        <input type={props.item.type} placeholder={el.placeholder}
                               key={el.name}
                               value={props.searchParams.get(el.name) ? props.searchParams.get(el.name) : ''}
                               onChange={(e) => props.handleInputChange(el.name, e)}/>
                    )
                    :
                    props.item.selector.map((el, index) =>
                        <label htmlFor={el.placeholder} key={index + 1}>
                            <input type={props.item.type}
                                   name={el.name}
                                   value={index + 1}
                                   id={el.placeholder}
                                   checked={+props.searchParams.get(el.name) === (index + 1)}
                                   onChange={(e) => e.target.checked ? props.handleCheckboxChange(el.name, e.target.value) : props.handleCheckboxChange(el.name, 0)}/>
                            <span>{el.placeholder}</span>
                        </label>
                    )}
            </div>
        </div>
    );
};

export default FilterComponent;
