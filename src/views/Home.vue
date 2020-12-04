<template>
  <el-container>
    <el-aside width="200px">
      <h2>白马头条</h2>
      <el-menu>
        <el-submenu index="2" @click.native="$router.push('/postList')">
          <template slot="title"><i class="el-icon-menu"></i>文章列表</template>
        </el-submenu>
        <el-submenu index="3" @click.native="$router.push('/editPost')">
          <template slot="title"
            ><i class="el-icon-setting"></i>发布文章</template
          >
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="info">
          <img
            :src="$axios.defaults.baseURL + this.userInfo.head_img"
            class="avatar"
          />
          <span class="name">我是{{ userInfo.nickname }}</span>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {},
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #333;
  color: #888;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #000;
  color: #888;
  text-align: center;
  line-height: 60px;
  h2 {
    font-size: 20px;
    color: #888;
  }
}
.el-submenu {
  background: #000;
}
/deep/ .el-submenu__title {
  color: #888;
}
/deep/ .el-submenu__icon-arrow.el-icon-arrow-down {
  &::before {
    content: "";
  }
}
.el-header {
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 500px;
    .avatar {
      width: 37px;
      height: 37px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }
}
.el-main {
  background-color: #f2f2f2;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>