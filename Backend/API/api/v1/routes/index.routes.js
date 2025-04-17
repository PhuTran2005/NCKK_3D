const routesModel = require("./model.routes") ;
const routesHotspot = require("./hotspot.routes") ;

module.exports = (app) => {
    const version = "/api/v1" ;

    app.use(version + "/model" , routesModel)  ;
    app.use(version + "/hotspot" , routesHotspot) ;
}