import React, {useEffect, useState} from 'react';
import {config} from "../config/config";
import ApartmentCard from "../components/ApartmentCard";
import {useSearchParams} from "react-router-dom";
import FilterComponent from "../components/FilterComponent";
import useDebounce from "../hooks/useDebounce";
import AppliedFilterItem from "../components/AppliedFilterItem";
import "../styles/Main.css";

const Main = () => {
    const [apartments, setApartments] = useState();
    const [pages, setPages] = useState([]);
    const [sortingOpen, setSortingOpen] = useState(false);
    const [switchBtn, setSwitchBtn] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();
    const debouncedValue = useDebounce(updateData, 500);


    useEffect(() => {
        let shouldLog = true;
        if (shouldLog) {
            shouldLog = false;
            updateData();
            searchParams.set('page', '1');
            setSearchParams(searchParams);
        }
    }, []);

    //получение/обновление данных
    function updateData() {
        try {
            fetch(config.API_URL + "apartments?" + searchParams)
                .then(response => response.json())
                .then(data => {
                    setApartments(data)
                    countPages(data)
                });
        } catch (e) {
            console.log(e)
        }
    }

    //установка стейта для пагинации
    const countPages = (arr) => {
        const data = [];
        for (let i = 0; i < arr.pages; i++) {
            data.push(i + 1)
        }
        setPages(data);
    }


    // мониторинг изменение значения в input
    const handleInputChange = (name, e) => {
        if (!e.target.value) {
            searchParams.delete(name);
            setSearchParams(searchParams);
            debouncedValue(e.target.value);
        } else {
            searchParams.set(name, e.target.value);
            setSearchParams(searchParams);
            debouncedValue(e.target.value);
        }
    }
    // мониторинг изменение значения в checkbox
    const handleCheckboxChange = (name, e) => {
        if (!e) {
            deleteParams(name);
        } else {
            setParams(name, e);
        }
    }


    // удаление параметра
    const deleteParams = (name) => {
        searchParams.delete(name);
        setSearchParams(searchParams);
        updateData();
    }
    // добавление/изменение параметра
    const setParams = (name, value) => {
        searchParams.set('page', '1');
        searchParams.set(name, value);
        setSearchParams(searchParams);
        updateData();
    }
    // установка страницы (пагинация)
    const setPage = (name, value) => {
        searchParams.set(name, value);
        setSearchParams(searchParams);
        updateData();
    }
    // очистка всех фильтров
    const clearAllParams = () => {
        [...searchParams].forEach(item => searchParams.delete(item[0]));
        setSearchParams(searchParams);
        updateData();
    }

    //__________________________________________________________________________________

    return (
        <div className="main">
            <div className="filters">
                <div className="filters-title">Фильтр</div>
                <div className="filter-items-main">
                    {config.filters.main.map((item) =>
                        <FilterComponent item={item} key={item.name} searchParams={searchParams}
                                         handleInputChange={handleInputChange}
                                         handleCheckboxChange={handleCheckboxChange}/>
                    )}
                </div>
                <div className="filters-add">
                    <div className="filters-add-title">Дополнительно</div>
                    <div className={switchBtn ? "switch-btn switch-on" : "switch-btn"}
                         onClick={() => setSwitchBtn(!switchBtn)}></div>
                </div>
                <div className={switchBtn ? "filter-items-add active" : "filter-items-add"}>
                    {config.filters.add.map((item) =>
                        <FilterComponent item={item} key={item.name} searchParams={searchParams}
                                         handleInputChange={handleInputChange}
                                         handleCheckboxChange={handleCheckboxChange}/>
                    )}
                </div>
                <div className="filters-btn">
                    <button className="button" onClick={() => clearAllParams()}>Очистить фильтры</button>
                </div>
            </div>
            <div className="apartments">
                <div className="apartments-header">
                    <div className="apartments-head">
                        <div className="apartments-applied-filters">
                            {config.queryFilters.map((item) => searchParams.get(item.name) ?
                                <AppliedFilterItem key={item.name} item={item} deleteParams={deleteParams}/> : ''
                            )}
                        </div>

                        <div className={sortingOpen ? "apartments-sorting open" : "apartments-sorting"}
                             onClick={() => setSortingOpen(!sortingOpen)}>
                            <div className="apartments-sorting-head">
                                <span>Сортировать</span>
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.0003 14.5C9.41693 14.5 8.83359 14.275 8.39193 13.8334L2.95859 8.40003C2.71693 8.15837 2.71693 7.75837 2.95859 7.5167C3.20026 7.27503 3.60026 7.27503 3.84193 7.5167L9.27526 12.95C9.67526 13.35 10.3253 13.35 10.7253 12.95L16.1586 7.5167C16.4003 7.27503 16.8003 7.27503 17.0419 7.5167C17.2836 7.75837 17.2836 8.15837 17.0419 8.40003L11.6086 13.8334C11.1669 14.275 10.5836 14.5 10.0003 14.5Z"
                                        fill="#2C2C2C"/>
                                </svg>
                            </div>
                            <div className="apartments-sorting-body">
                                {config.sortingOption.map((item) =>
                                    <div
                                        className={item.selector === searchParams.get(item.name) ? "apartments-sorting-item active" : "apartments-sorting-item"}
                                        key={item.selector}
                                        onClick={() => setParams('sort', item.selector)}>{item.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="apartments-items">
                    {apartments?.items.length > 0 ?
                        apartments?.items.map((item) =>
                            <ApartmentCard props={item} key={item.id}/>
                        )
                        :
                        <div className="apartments-not-items">
                            Не найдено апартаментов, попробуйте изменить настройки фильтров.
                        </div>
                    }
                </div>
                {pages.length > 1 ?
                    <div className="pagination">
                        {+searchParams?.get('page') === 1 || !searchParams?.get('page') ?
                            <div className="pagination-arrow disabled"
                                 onClick={(e) => e.preventDefault()}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.56988 5.98092C9.75988 5.98092 9.94988 6.04973 10.0999 6.19717C10.3899 6.48223 10.3899 6.95405 10.0999 7.2391L4.55988 12.6847L10.0999 18.1303C10.3899 18.4153 10.3899 18.8871 10.0999 19.1722C9.80988 19.4573 9.32988 19.4573 9.03988 19.1722L2.96988 13.2056C2.67988 12.9206 2.67988 12.4488 2.96988 12.1637L9.03988 6.19717C9.18988 6.04973 9.37988 5.98092 9.56988 5.98092Z"
                                        fill="#2C2C2C"/>
                                    <path
                                        d="M3.67 11.9474L20.5 11.9474C20.91 11.9474 21.25 12.2816 21.25 12.6847C21.25 13.0877 20.91 13.4219 20.5 13.4219L3.67 13.4219C3.26 13.4219 2.92 13.0877 2.92 12.6847C2.92 12.2816 3.26 11.9474 3.67 11.9474Z"
                                        fill="#2C2C2C"/>
                                </svg>
                            </div>
                            :
                            <div className="pagination-arrow"
                                 onClick={() => setPage('page', +searchParams.get('page') - 1)}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.56988 5.98092C9.75988 5.98092 9.94988 6.04973 10.0999 6.19717C10.3899 6.48223 10.3899 6.95405 10.0999 7.2391L4.55988 12.6847L10.0999 18.1303C10.3899 18.4153 10.3899 18.8871 10.0999 19.1722C9.80988 19.4573 9.32988 19.4573 9.03988 19.1722L2.96988 13.2056C2.67988 12.9206 2.67988 12.4488 2.96988 12.1637L9.03988 6.19717C9.18988 6.04973 9.37988 5.98092 9.56988 5.98092Z"
                                        fill="#2C2C2C"/>
                                    <path
                                        d="M3.67 11.9474L20.5 11.9474C20.91 11.9474 21.25 12.2816 21.25 12.6847C21.25 13.0877 20.91 13.4219 20.5 13.4219L3.67 13.4219C3.26 13.4219 2.92 13.0877 2.92 12.6847C2.92 12.2816 3.26 11.9474 3.67 11.9474Z"
                                        fill="#2C2C2C"/>
                                </svg>
                            </div>
                        }

                        <div className='pagination-pages'>
                            {pages.map((item) =>
                                +searchParams?.get('page') === item ?
                                    <a className="pagination-page active"
                                       key={item}
                                       onClick={(e) => e.preventDefault()}>{item}</a>
                                    :
                                    <a className={item === 1 && !searchParams?.get('page') ? "pagination-page active" : "pagination-page"}
                                       key={item}
                                       onClick={() => setPage('page', item)}>{item}</a>
                            )}
                        </div>

                        {+searchParams?.get('page') === pages.length ?
                            <div className="pagination-arrow disabled"
                                 onClick={(e) => e.preventDefault()}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.4301 19.3885C14.2401 19.3885 14.0501 19.3197 13.9001 19.1722C13.6101 18.8872 13.6101 18.4153 13.9001 18.1303L19.4401 12.6847L13.9001 7.23913C13.6101 6.95407 13.6101 6.48225 13.9001 6.19719C14.1901 5.91213 14.6701 5.91213 14.9601 6.19719L21.0301 12.1637C21.3201 12.4488 21.3201 12.9206 21.0301 13.2057L14.9601 19.1722C14.8101 19.3197 14.6201 19.3885 14.4301 19.3885Z"
                                        fill="#2C2C2C"/>
                                    <path
                                        d="M20.33 13.4219H3.5C3.09 13.4219 2.75 13.0877 2.75 12.6847C2.75 12.2817 3.09 11.9475 3.5 11.9475H20.33C20.74 11.9475 21.08 12.2817 21.08 12.6847C21.08 13.0877 20.74 13.4219 20.33 13.4219Z"
                                        fill="#2C2C2C"/>
                                </svg>
                            </div>
                            :
                            <div className="pagination-arrow"
                                 onClick={() => setPage('page', +searchParams.get('page') + 1)}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.4301 19.3885C14.2401 19.3885 14.0501 19.3197 13.9001 19.1722C13.6101 18.8872 13.6101 18.4153 13.9001 18.1303L19.4401 12.6847L13.9001 7.23913C13.6101 6.95407 13.6101 6.48225 13.9001 6.19719C14.1901 5.91213 14.6701 5.91213 14.9601 6.19719L21.0301 12.1637C21.3201 12.4488 21.3201 12.9206 21.0301 13.2057L14.9601 19.1722C14.8101 19.3197 14.6201 19.3885 14.4301 19.3885Z"
                                        fill="#2C2C2C"/>
                                    <path
                                        d="M20.33 13.4219H3.5C3.09 13.4219 2.75 13.0877 2.75 12.6847C2.75 12.2817 3.09 11.9475 3.5 11.9475H20.33C20.74 11.9475 21.08 12.2817 21.08 12.6847C21.08 13.0877 20.74 13.4219 20.33 13.4219Z"
                                        fill="#2C2C2C"/>
                                </svg>
                            </div>
                        }
                    </div>
                    : ''
                }
            </div>
        </div>

    );
};

export default Main;