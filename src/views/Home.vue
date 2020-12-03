<template>
  <el-container>
    <el-aside width="200px">
      <h2>白马头条</h2>
      <el-menu>
        <el-submenu index="2" @click.native="$router.push('/postList')">
          <template slot="title"><i class="el-icon-menu"></i>文章列表</template>
        </el-submenu>
        <el-submenu index="3" @click.native="$router.push('/publish')">
          <template slot="title"
            ><i class="el-icon-setting"></i>发布文章</template
          >
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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
.el-main {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  line-height: 160px;
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