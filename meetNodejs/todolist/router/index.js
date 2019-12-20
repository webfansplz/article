const Router = require("./router");
const ListServer = require("../controllers/list");
const Routers = new Router();

// 新增任务项
Routers.post("/list", ListServer.post);
// 删除任务项
Routers.delete("/list/:id", ListServer.delete);
// 编辑任务项
Routers.put("/list/:id", ListServer.put);
// 获取任务列表
Routers.get("/list", ListServer.get);

module.exports = Routers;
