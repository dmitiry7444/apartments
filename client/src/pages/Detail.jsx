import React, {useEffect, useState} from 'react';
import {config} from "../config/config";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/Detail.css'

const Detail = () => {
    let {id} = useParams();
    const [apartment, setApartment] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        let shouldLog = true;
        const abortController = new AbortController();
        const {signal} = abortController;
        setTimeout(() => abortController.abort(), 1000); //завершение fetch в случае долгого вызова(выброс ошибки)

        //получение/обновление данных
        const getApartment = () => fetch(config.API_URL + "apartments/" + id, {
            signal: signal
        })
            .then(response => response.json())
            .then(data => setApartment(data))
            .catch((e) => {
                if (signal?.aborted) {
                    navigate('/')
                } else {
                    console.log(e)
                }
            })

        if (shouldLog) {
            shouldLog = false;
            getApartment();
        }
    }, []);


    return (
        <div className='detail'>
            <a className="back" onClick={()=> navigate('/')}> &#60; Вернуться назад</a>
            {apartment ?
                <div className="detail-content">
                    <div className="detail-img">
                        <img src={apartment?.layout_image} alt='План апартаментов'/>
                    </div>
                    <div className="detail-info">
                        <div className="detail-info-main">
                            <div className="detail-info-main-title title">
                                Основные характеристики
                            </div>
                            <div className="detail-info-main-properties properties">
                                {apartment?.price ?
                                    <div className="detail-info-properties-item">
                                        <span>Стоимость:</span> {Math.round(apartment?.price).toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽'}
                                    </div>
                                    : ''}
                                {apartment?.area_total ?
                                    <div className="detail-info-properties-item">
                                        <span>Общая площадь:</span> {apartment?.area_total + ' м²'}
                                    </div>
                                    : ''}
                                {apartment?.rooms ?
                                    <div className="detail-info-properties-item">
                                        <span>Кол-во комнат:</span> {apartment?.rooms}
                                    </div>
                                    : ''}
                            </div>
                        </div>

                        <div className="detail-info-other">
                            <div className="detail-info-other-title title">
                                Дополнительные характеристики
                            </div>
                            <div className="detail-info-other-properties properties">
                                {apartment?.floor ?
                                    <div className="detail-info-properties-item">
                                        <span>Этаж:</span> {apartment?.floor}
                                    </div>
                                    : ''}
                                {apartment?.area_kitchen ?
                                    <div className="detail-info-properties-item">
                                        <span>Площадь кухни:</span> {apartment?.area_kitchen + ' м²'}
                                    </div>
                                    : ''}
                                {apartment?.area_live ?
                                    <div className="detail-info-properties-item">
                                        <span>Жилая площадь:</span> {apartment?.area_live + ' м²'}
                                    </div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
                : ''
            }
        </div>
    );
};

export default Detail;