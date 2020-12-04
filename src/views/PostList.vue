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
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
    };
  },
  created() {
    this.$axios({
      url: "/post",
    }).then((res) => {
      if (res.status === 200) {
        this.postList = res.data.data;
        console.log(this.postList);
      }
    });
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