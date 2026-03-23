<template>
  <div class="page-container">
    <h2>栅格布局</h2>
    <p class="desc">通过基础的 24 分栏，迅速简便地创建布局。</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-block">
        <XlyRow>
          <XlyCol :span="24"><div class="grid-content bg-purple-dark"></div></XlyCol>
        </XlyRow>
        <XlyRow>
          <XlyCol :span="12"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="12"><div class="grid-content bg-purple-light"></div></XlyCol>
        </XlyRow>
        <XlyRow>
          <XlyCol :span="8"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="8"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="8"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
        <XlyRow>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
        </XlyRow>
        <XlyRow>
          <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
        </XlyRow>
      </div>
    </section>

    <!-- 分栏间隔 -->
    <section class="demo-section">
      <h3>分栏间隔</h3>
      <div class="demo-block">
        <XlyRow :gutter="20">
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
      </div>
    </section>

    <!-- 混合布局 -->
    <section class="demo-section">
      <h3>混合布局</h3>
      <div class="demo-block">
        <XlyRow :gutter="20">
          <XlyCol :span="16"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="8"><div class="grid-content bg-purple-light"></div></XlyCol>
        </XlyRow>
        <XlyRow :gutter="20">
          <XlyCol :span="8"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="8"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple-light"></div></XlyCol>
        </XlyRow>
        <XlyRow :gutter="20">
          <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="16"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="4"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
      </div>
    </section>

    <!-- 分栏偏移 -->
    <section class="demo-section">
      <h3>分栏偏移</h3>
      <div class="demo-block">
        <XlyRow :gutter="20">
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6" :offset="6"><div class="grid-content bg-purple-light"></div></XlyCol>
        </XlyRow>
        <XlyRow :gutter="20">
          <XlyCol :span="6" :offset="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6" :offset="6"><div class="grid-content bg-purple-light"></div></XlyCol>
        </XlyRow>
        <XlyRow :gutter="20">
          <XlyCol :span="12" :offset="6"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
      </div>
    </section>

    <!-- 对齐方式 -->
    <section class="demo-section">
      <h3>对齐方式</h3>
      <div class="demo-block">
        <XlyRow justify="center" :gutter="20">
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
        <XlyRow justify="end" :gutter="20">
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
        <XlyRow justify="space-between" :gutter="20">
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
        <XlyRow justify="space-around" :gutter="20">
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple-light"></div></XlyCol>
          <XlyCol :span="6"><div class="grid-content bg-purple"></div></XlyCol>
        </XlyRow>
      </div>
    </section>

    <!-- 响应式布局 -->
    <section class="demo-section">
      <h3>响应式布局</h3>
      <p class="desc">参照 Bootstrap 的响应式设计，预设六个响应尺寸：xs、sm、md、lg、xl。</p>
      <div class="demo-block">
        <XlyRow :gutter="10">
          <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple"></div>
          </XlyCol>
          <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple-light"></div>
          </XlyCol>
          <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple"></div>
          </XlyCol>
          <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple-light"></div>
          </XlyCol>
          <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple"></div>
          </XlyCol>
          <XlyCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple-light"></div>
          </XlyCol>
        </XlyRow>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyRow from '@/components/xly-row/index.vue'
import XlyCol from '@/components/xly-col/index.vue'
</script>

<style scoped lang="scss">
.page-container {
  padding: 20px;
}

h2 {
  margin-bottom: 8px;
}

h3 {
  margin: 20px 0 12px;
  font-size: 18px;
}

.desc {
  color: #909399;
  font-size: 14px;
  margin-bottom: 16px;
}

.demo-section {
  margin-bottom: 24px;
}

.demo-block {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 24px;
  overflow: hidden;

  .xly-row {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
}

.bg-purple-dark {
  background-color: #99a9bf;
}

.bg-purple {
  background-color: #7e57c2;
}

.bg-purple-light {
  background-color: #b39ddb;
}
</style>
