import React from 'react';
import '../styles/ApartmentCard.css'

const ApartmentCard = (props) => {
    return (
        <a className='apartment-item' href={props.props.id}>
            <div className="apartment-item-image">
                <img src={props.props.layout_image} alt={props.props.id}/>
            </div>
                <div className="apartment-item-main-info">
                    <div className="apartment-item-main-info-price">
                        {Math.round(props.props.price).toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽'}
                    </div>
                    <div className="apartment-item-main-info-price-for-m2">
                        {Math.round((props.props.price / parseInt(props.props.area_total))).toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽/м²'}
                    </div>
                </div>
                <div className="apartment-item-other-info">
                    <div className="apartment-item-other-info-item apartment-item-other-info-rooms">
                        {props.props.rooms + '-комн. квартира'}
                    </div>
                    <div className="apartment-item-other-info-item apartment-item-other-info-area">
                        {props.props.area_total + ' м²'}
                    </div>
                    <div className="apartment-item-other-info-item apartment-item-other-info-floor">
                        {props.props.floor + ' эт.'}
                    </div>
                </div>
        </a>
    );
};

export default ApartmentCard;