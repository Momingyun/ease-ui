<template>
  <nav class="horizontal-menu">
    <div
      v-for="item in menuList"
      :key="item.id"
      class="horizontal-menu__item"
      :class="{ active: item.active }"
      @click="handleMenuClick(item)"
      @mouseenter="hoveredItem = item"
      @mouseleave="hoveredItem = null"
    >
      <ElIcon v-if="item.icon" class="horizontal-menu__icon">
        <component :is="item.icon" />
      </ElIcon>
      <span>{{ item.name }}</span>
      <ElIcon v-if="item.children?.length" class="horizontal-menu__arrow">
        <ArrowDown />
      </ElIcon>

      <!-- 下拉子菜单 -->
      <Transition name="dropdown">
        <div
          v-if="item.children?.length && hoveredItem === item"
          class="horizontal-menu__dropdown"
          @click.stop
        >
          <template v-for="child in item.children" :key="child.id">
            <!-- 有三级菜单 -->
            <div
              v-if="child.children?.length"
              class="horizontal-menu__dropdown-item horizontal-menu__dropdown-item--has-child"
              :class="{ active: child.active }"
              @mouseenter="hoveredChild = child"
              @mouseleave="hoveredChild = null"
            >
              <span>{{ child.name }}</span>
              <ElIcon class="horizontal-menu__dropdown-arrow">
                <ArrowRight />
              </ElIcon>
              <!-- 三级菜单 -->
              <div v-if="child.children?.length && hoveredChild === child" class="horizontal-menu__third-dropdown">
                <div
                  v-for="grand in child.children"
                  :key="grand.id"
                  class="horizontal-menu__dropdown-item"
                  :class="{ active: grand.active }"
                  @click.stop="handleGrandClick(grand, child)"
                >
                  {{ grand.name }}
                </div>
              </div>
            </div>
            <!-- 无三级菜单 -->
            <div
              v-else
              class="horizontal-menu__dropdown-item"
              :class="{ active: child.active }"
              @click.stop="handleSubMenuClick(child)"
            >
              <span>{{ child.name }}</span>
            </div>
          </template>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import { getMenuData, flattenMenu, type MenuItem } from '@/utils/menu'

const router = useRouter()

// 菜单列表
const menuList = ref<MenuItem[]>([])
const hoveredItem = ref<MenuItem | null>(null)
const hoveredChild = ref<MenuItem | null>(null)

// 初始化菜单
onMounted(async () => {
  const menuData = await getMenuData()
  menuList.value = flattenMenu(menuData)
  // 默认展开第一个
  if (menuList.value.length > 0) {
    menuList.value[0].active = true
  }
})

// 点击菜单
function handleMenuClick(item: MenuItem) {
  // 关闭其他菜单
  menuList.value.forEach((m) => {
    m.active = false
    if (m.children) {
      m.children.forEach((c) => (c.active = false))
    }
  })

  if (item.children?.length) {
    item.open = !item.open
    item.active = true
  } else if (item.path) {
    item.active = true
    router.push(item.path)
  }
}

// 点击子菜单
function handleSubMenuClick(child: MenuItem) {
  if (child.children?.length) {
    child.active = !child.active
  } else if (child.path) {
    child.active = true
    router.push(child.path)
  }
}

// 点击三级菜单
function handleGrandClick(grand: MenuItem, child: MenuItem) {
  grand.active = true
  if (grand.path) {
    router.push(grand.path)
  }
}
</script>

<style scoped lang="scss">
$primary: #4f6ef7;
$text-primary: #1a1a2e;
$text-secondary: #4a4a6a;
$bg-hover: #f0f4ff;

.horizontal-menu {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  background: #eef1f8;

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    height: 100%;
    padding: 0 16px;
    color: $text-secondary;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: $primary;
      background: $bg-hover;
    }

    &.active {
      color: $primary;
      background: $bg-hover;
    }
  }

  &__icon {
    font-size: 16px;
  }

  &__arrow {
    font-size: 12px;
    margin-left: 2px;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 180px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 6px;
    z-index: 100;
  }

  &__dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    color: $text-secondary;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: $primary;
      background: $bg-hover;
    }

    &.active {
      color: $primary;
      background: $bg-hover;
    }
  }

  &__dropdown-arrow {
    font-size: 12px;
  }

  // 有子菜单的项
  &__dropdown-item--has-child {
    position: relative;
  }

  // 三级下拉
  &__third-dropdown {
    position: absolute;
    top: 0;
    left: 100%;
    min-width: 160px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 6px;
    margin-left: 4px;
  }
}

// 过渡动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
