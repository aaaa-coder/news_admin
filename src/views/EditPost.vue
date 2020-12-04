<template>
  <div>
    <h2>首页/文章列表</h2>
    <el-form label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <VueEditor style="background-color: #fff" v-model="form.content" />
      </el-form-item>
      <el-form-item label="分类" class="category">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="category in categoryList"
            :key="category.id"
            :label="category.id"
            >{{ category.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面" class="cover">
        <el-upload
          :file-list="form.cover"
          :action="$axios.defaults.baseURL + '/upload'"
          list-type="picture-card"
          :on-success="loadcurrentSuccess"
          :on-remove="currentRemove"
          :headers="{
            Authorization: token,
          }"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型" class="post_type">
        <el-radio v-model="form.type" label="1">普通文章</el-radio>
        <el-radio v-model="form.type" label="2">视频文章</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="upload">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        type: "",
        cover: [],
        categories: [],
      },
      categoryList: [],
      checkList: [],
      token: localStorage.getItem("token"),
    };
  },
  watch: {
    checkList() {
      this.form.categories = this.checkList.map((num) => {
        return {
          id: num,
        };
      });
    },
  },

  created() {
    this.loadCategory();
    if (this.$route.query.id) {
      this.loadPost();
    }
  },
  methods: {
    loadCategory() {
      this.$axios({
        url: "category",
      }).then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          data.splice(0, 2);
          this.categoryList = data;
        }
      });
    },

    loadPost() {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          data.content.replace(/div/g, "p");
          this.checkList = data.categories.map((item) => {
            return item.id;
          });
          data.cover.map((img) => {
            if (img.url.indexOf("http") == -1) {
              img.url = this.$axios.defaults.baseURL + img.url;
            }
            img.uid = img.id;
            return img;
          });

          this.form = data;
          console.log(this.form);
        }
      });
    },
    loadcurrentSuccess(res, file, fileList) {
      file.id = res.data.id;
      this.form.cover.push(file);
    },
    currentRemove(file, fileList) {},
    upload() {
      this.$axios({
        method: "post",
        url: "/post",
        data: this.form,
        headers: {
          Authorization: this.token,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.$router.push("/postList");
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
.el-input {
  width: 500px;
}

.category,
.post_type {
  /deep/ .el-form-item__content {
    background-color: #fff;
  }
}
.post_type {
  /deep/ .el-form-item__content {
    width: 200px;
  }
}
</style>