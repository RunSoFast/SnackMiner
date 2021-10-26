<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="商品名称;">
              <el-input v-model="formInline.queryname" placeholder="商品名称">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="queryall">恢复默认</el-button>
              <!-- <el-button @click="setCurrent()">取消选择</el-button> -->
            </el-form-item>
          </el-form>

          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            ref="singleform"
          >
            <el-form-item label="商品名称:">
              <el-input v-model="formInline.name" placeholder="商品名称">
              </el-input>
            </el-form-item>
            <el-form-item label="商品类别:">
              <el-input v-model="formInline.category" placeholder="商品类别">
              </el-input>
            </el-form-item>
            <el-form-item label="价格:">
              <el-input v-model="formInline.price" placeholder="价格">
              </el-input>
            </el-form-item>
            <el-form-item label="剩余数量:">
              <el-input v-model="formInline.quantity" placeholder="剩余数量">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <br />
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
            <el-table-column
              prop="price"
              label="价格"
              :formatter="formatter"
              sortable
            >
            </el-table-column>
            <el-table-column prop="quantity" label="剩余数量" sortable>
            </el-table-column>
            <el-table-column label="图片" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.currentPage"
            :page-sizes="[10,20,30,40]"
            :page-size="paginationInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationInfo.total"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
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
      tableData: [
        // {
        //   name: "经典美式咖啡",
        //   imageurl: require("assets/img/diet/coffee/01.png"),
        //   price: 12,
        //   quantity: 66
        // },
        // {
        //   name: "热拿铁",
        //   imageurl: require("assets/img/diet/coffee/02.png"),
        //   price: 6,
        //   quantity: 102
        // },
        // {
        //   name: "经典美式咖啡",
        //   imageurl: require("assets/img/diet/coffee/03.png"),
        //   price: 5,
        //   quantity: 82
        // },
        // {
        //   name: "热卡布奇诺",
        //   imageurl: require("assets/img/diet/coffee/04.png"),
        //   price: 13,
        //   quantity: 48
        // }
      ],
      paginationInfo:{
        currentPage:1,
        pageSize:30,
        total:0
      },
      
    };
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    queryall() {
      axios({
        url: url.dietManagementdefaultquery,
        method: "get"
      })
        .then(response => {
          // console.log(response);
          if (response.data.code == 200) this.tableData = response.data.message;
          // console.log(this.tableData);
          this.paginationInfo.total=this.tableData.length
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
    async handleSizeChange(val) {
      this.paginationInfo.pageSize = val;
      // console.log(`每页 ${val} 条`);
      // this.queryall();
      // this.tableData = this.tableData.slice(0,val);
      this.paginationquery(this.paginationInfo.currentPage,val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.paginationInfo.currentPage = val
      this.paginationquery(val,this.paginationInfo.pageSize)
      // this.tableData
    },
    paginationquery(currentPage,pageSize){
      axios({
        url: url.dietManagementpaginationquery,
        method: "post",
        data:{
          currentPage,
          pageSize
        }
      })
        .then(response => {
          // console.log(response);
          if (response.data.code == 200) this.tableData = response.data.message;
          // console.log(response.data.message);
          // console.log(this.tableData);
          // this.paginationInfo.total=this.tableData.length
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.queryall();
  }
};
</script>
