<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import HelloWorld from "../components/HelloWorld.vue";
import { FormInstance, FormRules } from "element-plus";
import { useList } from "../store/index";

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
const textarea = ref("");

onMounted(init);
</script>

<template>
  <div class="input-t">Request</div>
  <div class="input">
    <textarea type="text" spellcheck="false" />
  </div>
  <div class="result-t">Responce</div>
  <div class="result">
    <TransitionGroup tag="ul" name="list" class="search-list">
      <HelloWorld v-for="item in searchValue" :key="item.id" :item="item" />
    </TransitionGroup>
  </div>
</template>
