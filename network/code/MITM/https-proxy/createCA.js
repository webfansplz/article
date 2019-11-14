const CAServices = require("./CAServices");
// 生成根级证书
CAServices.generateKey().save();
