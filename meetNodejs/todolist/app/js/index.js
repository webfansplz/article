const INITFORM = {
  name: "",
  content: ""
};
new Vue({
  el: "#app",
  data: function() {
    return {
      // 任务类型
      taskType: "",
      // 请求地址
      reqUrl: "http://localhost:8888",
      // 任务列表
      todolist: [],
      // 新建任务表单
      form: Object.assign({}, INITFORM),
      // 任务框
      taskDialog: false,
      // 任务id
      taskId: 0
    };
  },
  computed: {
    taskTitle() {
      return this.taskType === "add" ? "新建任务" : "编辑任务";
    }
  },
  created() {
    this.getList().catch(e => {});
  },
  watch: {
    taskDialog(value) {
      !value && Object.assign(this.form, INITFORM);
    }
  },
  methods: {
    // 获取任务列表
    async getList() {
      const { data } = await axios.get(`${this.reqUrl}/list`);
      this.todolist = data.data;
    },
    // 新建/编辑任务
    taskHandler() {
      const { name, content } = this.form;
      if (!name || !content) {
        this.$message.warning("表单内容不能为空");
        return false;
      }
      console.log();
      // 方法
      const handler = this.taskType === "add" ? axios.post : axios.put;
      // url
      const url =
        this.taskType === "add"
          ? `${this.reqUrl}/list`
          : `${this.reqUrl}/list/${this.taskId}`;
      // 参数
      const params =
        this.taskType === "add"
          ? {
              ...this.form,
              id: Date.now()
            }
          : this.form;
      // 任务类型
      const taskType = { add: "新增", edit: "编辑" }[this.taskType];

      handler(url, params)
        .then(res => {
          if (res.data.code === 0) {
            this.getList();
            this.taskDialog = false;
            this.$message.success(`${taskType} 任务成功!`);
          }
        })
        .catch(e => {
          this.$message.error(`${taskType} 任务失败 !`);
        });
    },
    // 编辑任务
    edit(item) {
      this.taskType = "edit";
      this.taskDialog = true;
      this.taskId = item.id;
      this.$set(this.form, "name", item.name);
      this.$set(this.form, "content", item.content);
    },
    // 删除任务
    del(id) {
      this.$confirm("你确定要删除这个任务吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          axios
            .delete(`${this.reqUrl}/list/${id}`)
            .then(res => {
              this.$message.success("删除任务成功!");
              this.getList();
            })
            .catch(e => {
              this.$message.error("删除任务失败!");
            });
        })
        .catch(() => {});
    }
  }
});
