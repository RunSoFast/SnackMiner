<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table
            ref="singleTable"
            :data="tableData"
            stripe
            border
            height="1000"
            highlight-current-row
            @current-change="handleCurrentChange"
            :default-sort="{ prop: 'price', order: 'ascending' }"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
              prop="name"
              label="商品名称"
              width="180"
            ></el-table-column>
            <el-table-column label="图片" width="180">
              <template slot-scope="scope">
                <el-popover placement="top-start" trigger="hover">
                  <img
                    :src="scope.row.imageurl"
                    alt=""
                    style="width: 150px;height: 150px"
                  />
                  <img
                    slot="reference"
                    :src="scope.row.imageurl"
                    style="width: 30px;height: 30px"
                  />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="类别" sortable>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              :formatter="formatter"
              sortable
            >
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)"
                  >+1</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.name)"
                  >-1</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <span>总计花费：{{ sumPrice }}</span>
          <el-button style="float:right" type="success" @click="pay">支付</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="编辑商品信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="singleform"
      >
        <el-form-item label="商品名称:">
          <el-input
            v-model="editformInline.name"
            placeholder="商品名称"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商品类别:">
          <el-input v-model="editformInline.category" placeholder="商品类别">
          </el-input>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input v-model="editformInline.price" placeholder="价格">
          </el-input>
        </el-form-item>
        <el-form-item label="剩余数量:">
          <el-input v-model="editformInline.quantity" placeholder="剩余数量">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      formInline: {
        queryname: "",
        name: "",
        category: "",
        imageurl: require("assets/img/diet/default.png"),
        price: "",
        quantity: ""
      },
      editformInline: {
        name: "",
        category: "汉堡",
        imageurl: require("assets/img/diet/default.png"),
        price: "",
        quantity: ""
      },
      tableData: [],
      dialogVisible: false
    };
  },
  computed: {
    // 计算属性的 getter
    sumPrice() {
      // `this` 指向 vm 实例
      let sum = 0;
      for (let index in this.tableData) {
        sum += this.tableData[index].price;
      }
      return sum;
    }
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      axios({
        url: url.dietManagementadd,
        method: "post",
        data: {
          name: this.formInline.name,
          category: this.formInline.category,
          price: this.formInline.price,
          imageurl: this.getimageurl(),
          quantity: this.formInline.quantity
        }
      })
        .then(response => {
          console.log(response);
          this.queryall();
          this.formInline.name = "";
          this.formInline.category = "";
          this.formInline.price = "";
          this.formInline.quantity = "";
          // this.$refs.singleform.resetFields();
        })
        .catch(error => {
          console.log(error);
        });
    },
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row);
    // },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    formatter(row, column) {
      return row.price + 1;
    },
    handleEdit(row) {
      axios({
        url: url.shoppingCartAdd,
        method: "post",
        data: {
          username: window.localStorage.username,
          name: row.name,
          category: row.category,
          price: row.price,
          imageurl: row.imageurl,
          quantity: row.quantity
        }
      })
        .then(response => {
          console.log(response);
          this.queryall();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDelete(name) {
      // console.log(name);
      axios({
        url: url.shoppingCartDelone,
        method: "post",
        data: {
          username:window.localStorage.username,
          name
        }
      })
        .then(response => {
          // console.log(response);
          this.queryall();
        })
        .catch(err => {
          console.log(err);
        });
    },
    queryall() {
      // console.log(1111);
      axios({
        url: url.shoppingCartQueryAll + "/" + window.localStorage.username,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) this.tableData = response.data.message;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getimageurl() {
      try {
        return require("assets/img/diet/" +
          this.formInline.category +
          "/" +
          this.formInline.name +
          ".png");
      } catch (err) {
        return this.formInline.imageurl;
      }
    },
    querysingle() {
      axios({
        url: url.dietManagementsinglequery,
        method: "post",
        data: {
          queryname: this.formInline.queryname
        }
      })
        .then(response => {
          console.log(response);
          this.tableData = [];
          this.tableData.push(response.data.message);
          //  console.log(this.tableData);
        })
        .catch(err => {
          // console.log(1111);
          console.log(err);
          this.$message.error("该商品不存在");
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    editone() {
      axios({
        url: url.dietManagementeditone,
        method: "post",
        data: {
          name: this.editformInline.name,
          price: this.editformInline.price,
          category: "汉堡",
          quantity: this.editformInline.quantity
        }
      })
        .then(response => {
          this.dialogVisible = false;
          console.log(response);
          //  console.log(this.tableData);
          this.queryall();

          (this.editformInline.price = ""), (this.editformInline.quantity = "");
        })
        .catch(err => {
          // console.log(1111);
          console.log(err);
          this.$message.error("该商品不存在");
        });
    },
    pay(){
      axios({
        url: url.pay,
        method: "post",
        data: {
          username:window.localStorage.username
        }
      })
        .then(response => {
          // console.log(response);
          this.queryall();
          this.$message.success(`您已经支付了${this.sumPrice}元`)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.queryall();
  }
};
</script>
