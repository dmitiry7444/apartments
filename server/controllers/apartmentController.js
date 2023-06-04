const ApiError = require('../error/ApiError');
const Apartments = require('../models/models');
const {Op} = require('sequelize');

class ApartmentController {

    async getApartments(req, res) {
        let {
            page,
            limit,
            sort,
            priceFrom,
            priceTo,
            areaTotalFrom,
            areaTotalTo,
            areaKitchenFrom,
            areaKitchenTo,
            areaLiveFrom,
            areaLiveTo,
            floorFrom,
            floorTo,
            rooms
        } = req.query;

        page = page || 1;
        limit = limit || 8;
        let offset = page * limit - limit;


        const filter = {};
        if (priceFrom || priceTo) {
            let filterData = {};
            if (priceFrom) {
                filterData.gte = priceFrom;
                filter.price = {...filter.price, [Op.gte]: filterData.gte};
            }
            if (priceTo) {
                filterData.lte = priceTo;
                filter.price = {...filter.price, [Op.lte]: filterData.lte};
            }
        }

        if (areaTotalFrom || areaTotalTo) {
            let filterData = {};
            if (areaTotalFrom) {
                filterData.gte = areaTotalFrom;
                filter.area_total = {...filter.area_total, [Op.gte]: filterData.gte};
            }
            if (areaTotalTo) {
                filterData.lte = areaTotalTo;
                filter.area_total = {...filter.area_total, [Op.lte]: filterData.lte};
            }

        }
        if (areaKitchenFrom || areaKitchenTo) {
            let filterData = {};
            if (areaKitchenFrom) {
                filterData.gte = areaKitchenFrom;
                filter.area_kitchen = {...filter.area_kitchen, [Op.gte]: filterData.gte};
            }
            if (areaKitchenTo) {
                filterData.lte = areaKitchenTo;
                filter.area_kitchen = {...filter.area_kitchen, [Op.lte]: filterData.lte};
            }
        }
        if (areaLiveFrom || areaLiveTo) {
            let filterData = {};
            if (areaLiveFrom) {
                filterData.gte = areaLiveFrom;
                filter.area_live = {...filter.area_live, [Op.gte]: filterData.gte};
            }
            if (areaLiveTo) {
                filterData.lte = areaLiveTo;
                filter.area_live = {...filter.area_live, [Op.lte]: filterData.lte};
            }
        }
        if (floorFrom || floorTo) {
            let filterData = {};
            if (floorFrom) {
                filterData.gte = floorFrom;
                filter.floor = {...filter.floor, [Op.gte]: filterData.gte};
            }
            if (floorTo) {
                filterData.lte = floorTo;
                filter.floor = {...filter.floor, [Op.lte]: filterData.lte};
            }
        }
        if (rooms) {
            if (rooms === 4) {
                filter.rooms = {[Op.gte]: rooms};
            } else {
                filter.rooms = rooms;
            }
        }

        let apartmentsQuery;

        let apartmentsQueryCount = Apartments.count({
            where: {...filter}, limit, offset
        });

        if (sort) {
            switch (sort) {
                case 'price-asc':
                    apartmentsQuery = Apartments.findAll({
                        where: {...filter}, limit, offset,
                        order: [
                            ['price', 'ASC']
                        ]
                    });
                    break;
                case 'price-desc':
                    apartmentsQuery = Apartments.findAll({
                        where: {...filter}, limit, offset,
                        order: [
                            ['price', 'DESC']
                        ]
                    });
                    break;
                case 'area-asc':
                    apartmentsQuery = Apartments.findAll({
                        where: {...filter}, limit, offset,
                        order: [
                            ['area_total', 'ASC']
                        ]
                    });
                    break;
                case 'area-desc':
                    apartmentsQuery = Apartments.findAll({
                        where: {...filter}, limit, offset,
                        order: [
                            ['area_total', 'DESC']
                        ]
                    });
                    break;
            }
        } else {
            apartmentsQuery = Apartments.findAll({
                where: {...filter}, limit, offset
            });
        }

        let apartments = await apartmentsQuery;
        let apartmentsCount = await apartmentsQueryCount;
        res.json({
            totalCount: apartmentsCount,
            pages: Math.ceil(apartmentsCount / limit),
            items: apartments
        })

    }

    async getOneApartment(req, res) {
        const {id} = req.params;
        if (!id) {
            return ApiError.badRequest("Не передан параметр id");
        }

        let apartment = await Apartments.findOne({
            where: {id}
        });
        if (!apartment) {
            return ApiError.badRequest("Апартаменты не найдены");
        }
        res.json(apartment);
    }

    async createApartment(req, res, next) {
        try {
            const {floor, pos_on_floor, price, rooms, area_total, area_kitchen, area_live, layout_image} = req.body;
            const apartment = await Apartments.create({
                floor,
                pos_on_floor,
                price,
                rooms,
                area_total,
                area_kitchen,
                area_live,
                layout_image
            });
            return res.json(apartment);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateApartment(req, res, next) {
        try {
            const apartment = await Apartments.update(req.body);
            return res.json(apartment);
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteApartment(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                return ApiError.badRequest("Не передан параметр id");
            }
            const apartment = await Apartments.destroy(id);
            return res.json(apartment);
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ApartmentController();