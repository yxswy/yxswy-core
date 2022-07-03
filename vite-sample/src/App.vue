<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import HelloWorld from './components/HelloWorld.vue'
import { Plus } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus'

Nprogress.configure({
  showSpinner: false,
})

const value = ref(['guide', 'disciplines'])
const searchValue = ref<any[]>([])
const ruleFormRef = ref<FormInstance>()

const props = {
  expandTrigger: 'hover',
}

const handleChange = (value: string) => {
  console.log(value)
}

const options = [
  {
    value: 'guide',
    label: 'Vue2.js',
    children: [
      {
        value: 'vue2',
        label: '官方文档',
      },
      {
        value: 'attr',
        label: '属性',
      },
    ],
  },
  {
    value: 'guide',
    label: 'Vue3.js',
    children: [
      {
        value: 'vue3',
        label: '官方文档',
      },
      {
        value: 'disciplines',
        label: 'Proxy代理原理',
      },
    ],
  },
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const searchDataByKeyword = () => {
  Nprogress.start()
  setTimeout(() => {
    Nprogress.done()
  }, 4200)
}

const dialogFormVisible = ref(false)
const form = reactive({
  title: '',
  url: '',
  tag: [],
  type: '',
})

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: '网页标题不能为空',
      trigger: 'change',
    },
  ],
  url: [
    {
      required: true,
      message: '网页网址不能为空',
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: '网页类型不能为空',
      trigger: 'change',
    },
  ],
})

const dialogConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios
        .post('http://localhost:3000/url/create', {
          data: form,
        })
        .then((res) => {
          console.log(res.data)
        })
        .finally(() => {
          init()
        })

      dialogFormVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

const init = () => {
  axios.get('http://localhost:3000/url').then((res) => {
    searchValue.value = res.data
  })
}

onMounted(init)
</script>

<template>
  <div class="container">
    <div class="append" @click="dialogFormVisible = true">
      <el-icon :size="18" color="#000000">
        <Plus />
      </el-icon>
    </div>

    <el-dialog
      v-model="dialogFormVisible"
      width="740px"
      class=""
      title="添加记录"
    >
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
        <el-form-item label="标签 Type" prop="type">
          <el-cascader
            v-model="form.tag"
            :options="options"
            :props="props"
            placeholder="Vue.js Proxy原理"
            clearable
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭 Cancel</el-button>
          <el-button type="primary" @click="dialogConfirm(ruleFormRef)">
            保存 Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-form label-width="140px" class="core-form">
      <el-form-item label="查询内容：">
        <div class="app-cascader-search">
          <el-space wrap>
            <el-cascader
              v-model="value"
              :options="options"
              :props="props"
              placeholder="Vue.js Proxy原理"
              clearable
              @change="handleChange"
            />

            <el-button type="primary" @click="searchDataByKeyword">
              搜索关键词
            </el-button>
          </el-space>
        </div>
      </el-form-item>
      <el-form-item label="查询结果：">
        <TransitionGroup tag="ul" name="list" class="search-list">
          <HelloWorld v-for="item in searchValue" :key="item.id" :item="item" />
        </TransitionGroup>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 86rem;
  max-width: 1180px;
  height: auto;
  min-height: 100px;
  margin: 100px auto 0 auto;

  .core-form {
    .el-form-item__label {
      font-weight: bold;
    }

    .el-cascader {
      width: 400px;
    }
    .el-button,
    .el-input__wrapper {
      border-radius: 3px;
    }

    .el-button.el-button--primary {
      background-color: #0d6dff;
      border-color: #0d6dff;
    }
  }
}

.append {
  width: 45px;
  height: 45px;
  border-radius: 50px;
  box-shadow: 2px 2px 12px #cccccc;
  position: fixed;
  top: 180px;
  right: 188px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 5;
  &:hover {
    background-color: #0d6dff;
    i {
      color: white;
    }
  }
}

.append-form {
  padding-top: 48px;
  padding-bottom: 24px;
  .el-button--text {
    margin-right: 15px;
  }

  .el-form-item__content {
    > .el-select {
      width: calc(100% - 60px);
    }

    > .el-input {
      width: calc(100% - 60px);
    }

    > .el-cascader {
      width: calc(100% - 60px);
    }
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}

.search-list {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

@media screen and (max-width: 1180px) and (min-width: 980px) {
  .container {
    width: 56rem;
  }
}

@media screen and (max-width: 980px) {
  .container {
    width: 100%;
  }
}
</style>
