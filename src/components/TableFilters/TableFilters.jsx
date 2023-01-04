import { useRef } from 'react';
import Icon from '../Icon/Icon';
import './TableFilters.css';

function TableFilters() {

    const orderby = [
        {
            label: 'Datum',
            value: 'date'
        },
        {
            label: 'Titulek',
            value: 'title'
        },
        {
            label: 'Autor',
            value: 'author'
        },
    ];

    const order = [
        {
            label: 'Sestupně',
            value: 'desc',
        },
        {
            label: 'Vzestupně',
            value: 'asc'
        }
    ]

    const textInput = useRef(null);
    const onButtonClick = () => {
        textInput.current.focus();
        console.log(textInput.current.value);
    };

    

    return (
        <div id="table-filters">

            <div id='short-select'>
                <select name="orderby" id="orderby">
                    {orderby.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select name="order" id="order">
                    {order.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div id="search-bar">
                <input type="text" ref={textInput} placeholder='Hledat...' name="search" id="text-input" />
                <button id='search-button' onClick={onButtonClick}><Icon name="search" type="fa"/></button>
            </div>
            
        </div>
    )
}

export default TableFilters;