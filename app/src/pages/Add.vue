<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { FormInstance, FormRules } from "element-plus";

Nprogress.configure({
  showSpinner: false,
});

const value = ref(["guide", "disciplines"]);
const searchValue = ref<any[]>([]);
const ruleFormRef = ref<FormInstance>();

const props = {
  expandTrigger: "hover",
};

const handleChange = (value: string) => {
  console.log(value);
};

const options = ref([]);

const searchDataByKeyword = () => {
  Nprogress.start();
  setTimeout(() => {
    Nprogress.done();
  }, 4200);
};

const dialogFormVisible = ref(false);
const form = reactive({
  title: "",
  url: "",
  tag: [],
  type: "",
});

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: "网页标题不能为空",
      trigger: "change",
    },
  ],
  url: [
    {
      required: true,
      message: "网页网址不能为空",
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: "网页类型不能为空",
      trigger: "change",
    },
  ],
});

const dialogConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios
        .post("http://localhost:3010/api/url/create", {
          data: form,
        })
        .then((res) => {
          console.log(res.data);
        })
        .finally(() => {
          init();
        });

      dialogFormVisible.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};

const init = async () => {
  Nprogress.start();
  try {
    let res = await axios.post("http://localhost:3010/api/url");
    searchValue.value = res.data;

    res = await axios.post("http://localhost:3010/api/tag");
    options.value = res.data;
  } catch (e) {
    console.log(e);
  } finally {
    Nprogress.done();
  }
};

onMounted(init);
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    class="append-form"
    label-width="180px"
    :rules="rules"
  >
    <el-form-item label="网页标题 Title" prop="title">
      <el-input v-model="form.title" autocomplete="off" />
    </el-form-item>
    <el-form-item label="网址链接 Url" prop="url">
      <el-input v-model="form.url" autocomplete="off" />
    </el-form-item>
    <el-form-item label="网址类型 Type" prop="url">
      <el-radio-group v-model="form.type">
        <el-radio label="video">视频</el-radio>
        <el-radio label="article">文章</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签 Tags" prop="type">
      <el-cascader
        v-model="form.tag"
        :options="options"
        :props="props"
        placeholder="Vue.js Proxy原理"
        clearable
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="dialogConfirm(ruleFormRef)">
        保存 Confirm
      </el-button>
    </el-form-item>
  </el-form>

  <div class="_box"></div>
</template>
