<template>
  <div>
    <h2>首页/文章列表</h2>
    <el-table :data="postList" style="width: 100%">
      <el-table-column prop="create_date" label="日期" width="220">
      </el-table-column>
      <el-table-column prop="id" label="ID编号" width="100"></el-table-column>
      <el-table-column
        prop="title"
        label="文章题目"
        width="350"
      ></el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="120">
      </el-table-column>
      <el-table-column label="封面缩略图">
        <template slot-scope="scope">
          <img
            :src="scope.row.cover[0].url"
            v-if="scope.row.cover.length > 0"
            class="thumbnail"
          />
          <img src="@/assets/smoke.jpg" v-else class="thumbnail" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="info" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  created() {
    this.loadPost();
  },
  methods: {
    handleSizeChange(total) {
      console.log(total);
      this.pageSize = total;
      this.loadPost();
    },
    handleCurrentChange(currentPage) {
      // console.log(currentPage);
      this.pageIndex = currentPage;
      this.loadPost();
    },
    loadPost() {
      this.$axios({
        url: "/post",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.postList = res.data.data;
          console.log(res);
          this.total = res.data.total;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
h2 {
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 400;
}
.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>