const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require("../helpers/request_helper.js")

const DbModel = function() {
this.items = []
this.request = new RequestHelper('/api/cardcrusher');
}
