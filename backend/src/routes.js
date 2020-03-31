const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ongController = require("./controller/ongController");
const incidentController = require("./controller/incidentController");
const profileController = require("./controller/profileController");
const sessionController = require("./controller/sessionController");
const authInterceptor = require("./interceptor/authInterceptor");

const routes = express.Router();

routes.post("/sessions", celebrate({
    [Segments.BODY] : Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}), sessionController.auth);

routes.get("/ongs", celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number()
    })
}), ongController.list);

routes.get("/profiles", celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), authInterceptor, profileController.list);

routes.post("/ongs", celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })  
}), ongController.create);

routes.get("/incidents", celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.list)

routes.post("/incidents", celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY] : Joi.object().keys({
        title: Joi.string().required().min(3),
        value: Joi.number().required(),
        description: Joi.string().required().min(10)
    })  
}), authInterceptor, incidentController.create);

routes.delete("/incidents/:id", celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required()
    })
}), authInterceptor, incidentController.delete);


module.exports = routes;