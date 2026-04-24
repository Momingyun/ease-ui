<template>
  <div class="crud-demo">
    <!-- 搜索区域 -->
    <XlySearchForm
      ref="searchFormRef"
      :items="searchItems"
      :model-value="searchData"
      :show-expand-button="false"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 表格区域 -->
    <XlyTable
      ref="tableRef"
      :data="tableData"
      :columns="tableColumns"
      :loading="tableLoading"
      :total="total"
      :page="pagination.page"
      :page-size="pagination.pageSize"
      :show-index="true"
      :selectable="true"
      show-refresh
      show-export
      show-column-settings
      :selection-mode="'multiple'"
      pagination-position="right"
      @selection-change="handleSelectionChange"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
      style="margin-top: 20px"
    >
      <template #toolbar>
        <XlyButton type="primary" size="small" @click="openAddModal"> 新增 </XlyButton>
      </template>
      <!-- 状态列自定义 -->
      <template #col-status="{ row }">
        <XlyTag :type="row.status === 1 ? 'success' : 'info'" size="small">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </XlyTag>
      </template>

      <!-- 操作列 -->
      <template #action="{ row }">
        <div class="action-buttons">
          <XlyButton link type="primary" size="small" @click="openViewModal(row)"> 查看 </XlyButton>
          <XlyButton link type="primary" size="small" @click="openEditModal(row)"> 编辑 </XlyButton>
          <XlyButton link size="small" type="danger" @click="handleDelete(row)"> 删除 </XlyButton>
        </div>
      </template>
    </XlyTable>

    <!-- 新增/编辑弹窗 -->
    <XlyModal
      v-model="formModal.visible"
      :title="formModal.isEdit ? '编辑用户' : '新增用户'"
      width="520px"
      @confirm="handleFormSubmit"
      @cancel="formModal.visible = false"
    >
      <XlyForm ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <XlyFormItem label="用户名" prop="name">
          <XlyInput v-model="formData.name" placeholder="请输入用户名" />
        </XlyFormItem>
        <XlyFormItem label="邮箱" prop="email">
          <XlyInput v-model="formData.email" placeholder="请输入邮箱" />
        </XlyFormItem>
        <XlyFormItem label="手机号" prop="phone">
          <XlyInput v-model="formData.phone" placeholder="请输入手机号" />
        </XlyFormItem>
        <XlyFormItem label="部门" prop="dept">
          <XlySelect v-model="formData.dept" placeholder="请选择部门" :options="deptOptions" />
        </XlyFormItem>
        <XlyFormItem label="状态" prop="status">
          <XlySelect v-model="formData.status" placeholder="请选择状态" :options="statusOptions" />
        </XlyFormItem>
        <XlyFormItem label="备注" prop="remark">
          <XlyInput v-model="formData.remark" type="textarea" placeholder="请输入备注" :rows="3" />
        </XlyFormItem>
      </XlyForm>
    </XlyModal>

    <!-- 查看详情弹窗 -->
    <XlyModal
      v-model="viewModal.visible"
      title="用户详情"
      width="50%"
      :show-confirm="false"
      @cancel="viewModal.visible = false"
    >
      <XlyDescriptions :column="2" border>
        <XlyDescriptionsItem label="用户ID">{{ viewData.id }}</XlyDescriptionsItem>
        <XlyDescriptionsItem label="用户名">{{ viewData.name }}</XlyDescriptionsItem>
        <XlyDescriptionsItem label="邮箱">{{ viewData.email }}</XlyDescriptionsItem>
        <XlyDescriptionsItem label="手机号">{{ viewData.phone }}</XlyDescriptionsItem>
        <XlyDescriptionsItem label="部门">{{ viewData.deptName }}</XlyDescriptionsItem>
        <XlyDescriptionsItem label="状态">
          <XlyTag :type="viewData.status === 1 ? 'success' : 'info'" size="small">
            {{ viewData.status === 1 ? '启用' : '禁用' }}
          </XlyTag>
        </XlyDescriptionsItem>
        <XlyDescriptionsItem label="创建时间">{{ viewData.createTime }}</XlyDescriptionsItem>
        <XlyDescriptionsItem label="备注">{{ viewData.remark || '-' }}</XlyDescriptionsItem>
      </XlyDescriptions>
    </XlyModal>

    <!-- 删除确认弹窗 -->
    <XlyModal
      v-model="deleteModal.visible"
      title="确认删除"
      width="400px"
      @confirm="confirmDelete"
      @cancel="deleteModal.visible = false"
    >
      <div class="delete-tip">
        <el-icon color="#ef4444" :size="24"><WarningFilled /></el-icon>
        <p>
          确定要删除用户 <strong>{{ deleteData.name }}</strong> 吗？
        </p>
        <p class="delete-tip__sub">此操作不可恢复，请谨慎操作。</p>
      </div>
    </XlyModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import XlySearchForm from '@/components/xly-search-form/index.vue'
import XlyTable from '@/components/xly-table/index.vue'
import XlyModal from '@/components/xly-modal/index.vue'
import XlyForm from '@/components/xly-form/index.vue'
import XlyFormItem from '@/components/xly-form/xly-form-item.vue'
import XlyInput from '@/components/xly-input/index.vue'
import XlySelect from '@/components/xly-select/index.vue'
import XlyButton from '@/components/xly-button/index.vue'
import XlyDescriptions from '@/components/xly-descriptions/index.vue'
import XlyDescriptionsItem from '@/components/xly-descriptions/item.vue'
import { xly } from '@/utils/xly'
import { email, minLength, min, required } from '@/components/xly-form/utils'

defineOptions({ name: 'CrudDemo' })

// ============ 搜索区域 ============
const searchFormRef = ref()
const searchData = reactive({
  name: '',
  status: null,
  beginDate: '',
  endDate: '',
})

const searchItems = [
  { prop: 'name', label: '用户名', type: 'input', placeholder: '请输入用户名', span: 4 },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
    span: 4,
  },
  {
    prop: 'beginDate',
    endProp: 'endDate',
    label: '创建时间',
    type: 'daterange',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    span: 6,
  },
]

function handleSearch(data: Record<string, any>) {
  pagination.page = 1
  fetchTableData()
}

function handleReset() {
  pagination.page = 1
  fetchTableData()
}

// ============ 表格区域 ============
const tableRef = ref()
const tableLoading = ref(false)
const tableData = ref<Record<string, any>[]>([])
const selectedRows = ref<Record<string, any>[]>([])
const total = ref(0)
const pagination = reactive({
  page: 1,
  pageSize: 10,
})

const tableColumns = [
  { prop: 'name', name: '用户名', minWidth: 120 },
  { prop: 'email', name: '邮箱', minWidth: 180 },
  { prop: 'phone', name: '手机号', width: 130 },
  { prop: 'deptName', name: '部门', minWidth: 120 },
  { prop: 'status', name: '状态', width: 100, align: 'center' as const },
  { prop: 'createTime', name: '创建时间', minWidth: 160 },
]

function handleSelectionChange(rows: Record<string, any>[]) {
  selectedRows.value = rows
}

function handlePageChange(page: number) {
  pagination.page = page
  fetchTableData()
}

function handlePageSizeChange(pageSize: number) {
  pagination.pageSize = pageSize
  pagination.page = 1
  fetchTableData()
}

// ============ 新增/编辑弹窗 ============
const formModal = reactive({
  visible: false,
  isEdit: false,
  loading: false,
})
const formRef = ref()
const formData = reactive({
  id: '',
  name: '',
  email: '',
  phone: '',
  dept: null,
  status: 1,
  remark: '',
})

const formRules = {
  name: [required('请输入用户名'), minLength(2, '至少2个字符')],
  email: [required('请输入邮箱'), email()],
  phone: [required('请输入手机号'), min(11, '手机号至少11位')],
  dept: [required('请选择部门')],
}

const deptOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
  { label: '市场部', value: 'marketing' },
  { label: '财务部', value: 'finance' },
]

const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]

function openAddModal() {
  formModal.isEdit = false
  formModal.visible = true
  // 重置表单数据
  Object.assign(formData, {
    id: '',
    name: '',
    email: '',
    phone: '',
    dept: null,
    status: 1,
    remark: '',
  })
}

function openEditModal(row: Record<string, any>) {
  formModal.isEdit = true
  formModal.visible = true
  // 填充表单数据
  Object.assign(formData, {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    dept: row.dept,
    status: row.status,
    remark: row.remark || '',
  })
}

async function handleFormSubmit() {
  const isValid = await formRef.value?.validate().catch(() => false)
  if (!isValid) return

  formModal.loading = true
  try {
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (formModal.isEdit) {
      // 编辑
      const index = tableData.value.findIndex((item) => item.id === formData.id)
      if (index !== -1) {
        tableData.value[index] = {
          ...tableData.value[index],
          ...formData,
          deptName: deptOptions.find((d) => d.value === formData.dept)?.label || '',
        }
      }
      xly.$msg.success('数据已成功保存', { title: '操作成功' })
    } else {
      // 新增
      const newRow = {
        id: Date.now().toString(),
        ...formData,
        deptName: deptOptions.find((d) => d.value === formData.dept)?.label || '',
        createTime: new Date().toLocaleString('zh-CN'),
      }
      tableData.value.unshift(newRow)
      total.value++
      xly.$msg.success('数据已成功保存', { title: '操作成功' })
    }

    formModal.visible = false
  } catch (error) {
    xly.$msg.success('数据保存失败', { title: '操作失败' })
  } finally {
    formModal.loading = false
  }
}

// ============ 查看详情弹窗 ============
const viewModal = reactive({
  visible: false,
})
const viewData = reactive<Record<string, any>>({})

function openViewModal(row: Record<string, any>) {
  viewModal.visible = true
  Object.assign(viewData, row)
}

// ============ 删除操作 ============
const deleteModal = reactive({
  visible: false,
})
const deleteData = reactive({
  id: '',
  name: '',
})

function handleDelete(row: Record<string, any>) {
  deleteModal.visible = true
  deleteData.id = row.id
  deleteData.name = row.name
}

async function confirmDelete() {
  try {
    // 从表格数据中移除
    const index = tableData.value.findIndex((item) => item.id === deleteData.id)
    if (index !== -1) {
      tableData.value.splice(index, 1)
      total.value--
    }

    xly.$msg.success('数据已成功删除', { title: '操作成功' })
    deleteModal.visible = false
  } catch (error) {
    // 用户取消
  }
}

// ============ 模拟数据 ============
function generateMockData() {
  const names = ['张伟', '李娜', '王芳', '刘洋', '陈静', '杨明', '赵雪', '黄磊', '周婷', '吴强']
  const depts = [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '运营部', value: 'operation' },
    { label: '市场部', value: 'marketing' },
    { label: '财务部', value: 'finance' },
  ]

  return Array.from({ length: 55 }, (_, i) => {
    const name = names[i % names.length]
    const dept = depts[i % depts.length]
    return {
      id: (i + 1).toString(),
      name: `${name}${Math.floor(i / names.length) || ''}`,
      email: `${name.toLowerCase()}${i}@example.com`,
      phone: `138${String(100000000 + i).slice(-8)}`,
      dept: dept.value,
      deptName: dept.label,
      status: i % 5 === 0 ? 0 : 1,
      createTime: new Date(2024, 0, (i % 28) + 1).toLocaleString('zh-CN'),
      remark: i % 3 === 0 ? '备注信息' : '',
    }
  })
}

const allMockData = generateMockData()

async function fetchTableData() {
  tableLoading.value = true
  try {
    // 模拟 API 延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 模拟搜索过滤
    let filtered = [...allMockData]
    if (searchData.name) {
      filtered = filtered.filter((item) => item.name.includes(searchData.name))
    }
    if (searchData.status !== null && searchData.status !== '') {
      filtered = filtered.filter((item) => item.status === searchData.status)
    }
    // 日期范围过滤
    if (searchData.beginDate || searchData.endDate) {
      filtered = filtered.filter((item) => {
        const createTime = new Date(item.createTime).getTime()
        const begin = searchData.beginDate ? new Date(searchData.beginDate).getTime() : 0
        const end = searchData.endDate ? new Date(searchData.endDate).getTime() : Infinity
        return createTime >= begin && createTime <= end
      })
    }

    // 分页
    const start = (pagination.page - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    tableData.value = filtered.slice(start, end)
    total.value = filtered.length
  } finally {
    tableLoading.value = false
  }
}

// ============ 初始化 ============
onMounted(() => {
  fetchTableData()
})
</script>

<style scoped lang="scss">
.crud-demo {
  padding: 24px;
  min-height: 100%;
  background: #f5f7fa;
}
</style>
