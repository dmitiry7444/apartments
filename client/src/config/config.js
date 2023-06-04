export const config = {
    API_URL: 'http://localhost:5000/api/',
    filters : {
        main: [
            {
                name: 'Стоимость, ₽',
                type: 'text',
                selector: [
                    {name: 'priceFrom', placeholder: 'от'},
                    {name: 'priceTo', placeholder: 'до'}
                ]
            },
            {
                name: 'Общая площадь, м²',
                type: 'text',
                selector: [
                    {name: 'areaTotalFrom', placeholder: 'от'},
                    {name: 'areaTotalTo', placeholder: 'до'}
                ]
            },
            {
                name: 'Комнат',
                type: 'checkbox',
                selector: [
                    {name: 'rooms', placeholder: '1к'},
                    {name: 'rooms', placeholder: '2к'},
                    {name: 'rooms', placeholder: '3к'},
                    {name: 'rooms', placeholder: '4к+'},
                ]
            }
        ],
        add: [
            {
                name: 'Этаж',
                type: 'text',
                selector: [
                    {name: 'floorFrom', placeholder: 'от'},
                    {name: 'floorTo', placeholder: 'до'}
                ]
            },
            {
                name: 'Площадь кухни, м²',
                type: 'text',
                selector: [
                    {name: 'areaKitchenFrom', placeholder: 'от'},
                    {name: 'areaKitchenTo', placeholder: 'до'}
                ]
            },
            {
                name: 'Жилая площадь, м²',
                type: 'text',
                selector: [
                    {name: 'areaLiveFrom', placeholder: 'от'},
                    {name: 'areaLiveTo', placeholder: 'до'}
                ]
            },
        ],
    },
    queryFilters : [
        {name: 'sort', layoutName: 'Сортировка'},
        {name: 'priceFrom', layoutName: 'Цена от'},
        {name: 'priceTo', layoutName: 'Цена до'},
        {name: 'areaTotalFrom', layoutName: 'Площадь от м2'},
        {name: 'areaTotalTo', layoutName: 'Площадь до м2'},
        {name: 'areaKitchenFrom', layoutName: 'Площадь кухни от м2'},
        {name: 'areaKitchenTo', layoutName: 'Площадь кухни до м2'},
        {name: 'areaLiveFrom', layoutName: 'Жилая площадь от м2'},
        {name: 'areaLiveTo', layoutName: 'Жилая площадь до м2'},
        {name: 'floorFrom', layoutName: 'Этаж от'},
        {name: 'floorTo', layoutName: 'Этаж до'},
        {name: 'rooms', layoutName: 'Кол-во комнат'},
    ],
    sortingOption : [
        {name: 'По возрастанию цены', selector: 'price-asc'},
        {name: 'По уменьшению цены', selector: 'price-desc'},
        {name: 'По возрастанию м2', selector: 'area-asc'},
        {name: 'По уменьшению м2', selector: 'area-desc'},
    ],
}