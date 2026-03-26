<template>
  <div class="image-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Image 图片</h1>
      <p class="doc-desc">图片展示组件，支持多种数据格式、懒加载加载、预览放大等功能。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">
        通过 <code>src</code> 属性传入图片地址，支持数组或逗号拼接的字符串。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyImage :src="singleImage" alt="单张图片" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 单张图片 --&gt;
&lt;XlyImage :src="singleImage" /&gt;

&lt;!-- 数组形式 --&gt;
&lt;XlyImage :src="['url1', 'url2', 'url3']" /&gt;

&lt;!-- 逗号拼接字符串 --&gt;
&lt;XlyImage src="url1, url2, url3" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 不同数量展示 -->
    <section class="doc-section">
      <h2 class="doc-section__title">不同数量展示</h2>
      <p class="doc-section__desc">根据图片数量自动调整布局，支持单图和多图展示。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="image-row">
            <div class="image-item">
              <span class="image-label">单张</span>
              <XlyImage :src="singleImage" />
            </div>
            <div class="image-item">
              <span class="image-label">两张</span>
              <XlyImage :src="twoImages" />
            </div>
            <div class="image-item">
              <span class="image-label">三张</span>
              <XlyImage :src="threeImages" />
            </div>
            <div class="image-item">
              <span class="image-label">四张</span>
              <XlyImage :src="fourImages" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyImage :src="singleImage" /&gt;
&lt;XlyImage :src="twoImages" /&gt;
&lt;XlyImage :src="threeImages" /&gt;
&lt;XlyImage :src="fourImages" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义显示数量 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义显示数量</h2>
      <p class="doc-section__desc">
        通过 <code>max</code> 属性设置多图模式下显示的图片数量，超出部分显示 +N 提示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="image-row">
            <div class="image-item">
              <span class="image-label">max = 1</span>
              <XlyImage :src="manyImages" :max="1" />
            </div>
            <div class="image-item">
              <span class="image-label">max = 2</span>
              <XlyImage :src="manyImages" :max="2" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyImage :src="manyImages" :max="1" /&gt;
&lt;XlyImage :src="manyImages" :max="2" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 图片填充模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">图片填充模式</h2>
      <p class="doc-section__desc">通过 <code>fit</code> 属性设置图片的填充方式。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="image-row">
            <div class="image-item">
              <span class="image-label">fill</span>
              <XlyImage :src="singleImage" fit="fill" />
            </div>
            <div class="image-item">
              <span class="image-label">contain</span>
              <XlyImage :src="singleImage" fit="contain" />
            </div>
            <div class="image-item">
              <span class="image-label">cover</span>
              <XlyImage :src="singleImage" fit="cover" />
            </div>
            <div class="image-item">
              <span class="image-label">scale-down</span>
              <XlyImage :src="singleImage" fit="scale-down" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyImage :src="singleImage" fit="fill" /&gt;
&lt;XlyImage :src="singleImage" fit="contain" /&gt;
&lt;XlyImage :src="singleImage" fit="cover" /&gt;
&lt;XlyImage :src="singleImage" fit="scale-down" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>width</code> 和 <code>height</code> 属性设置图片尺寸。<br>
        <strong>如果只设置其中一个，宽高将使用相同的值（正方形）。</strong>
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="image-row">
            <div class="image-item">
              <span class="image-label">默认 120x120</span>
              <XlyImage :src="singleImage" />
            </div>
            <div class="image-item">
              <span class="image-label">width=80</span>
              <XlyImage :src="singleImage" :width="80" />
            </div>
            <div class="image-item">
              <span class="image-label">width=60</span>
              <XlyImage :src="singleImage" :width="60" />
            </div>
            <div class="image-item">
              <span class="image-label">width=48</span>
              <XlyImage :src="singleImage" :width="48" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 只设置一个尺寸，宽高相同 --&gt;
&lt;XlyImage :src="singleImage" :width="80" /&gt;  &lt;!-- 80x80 --&gt;
&lt;XlyImage :src="singleImage" :width="60" /&gt;  &lt;!-- 60x60 --&gt;

&lt;!-- 同时设置宽高 --&gt;
&lt;XlyImage :src="singleImage" :width="120" :height="80" /&gt;

&lt;!-- 字符串形式 --&gt;
&lt;XlyImage :src="singleImage" width="80px" /&gt;
&lt;XlyImage :src="singleImage" width="100%" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 预览功能 -->
    <section class="doc-section">
      <h2 class="doc-section__title">预览功能</h2>
      <p class="doc-section__desc">
        设置 <code>preview</code> 属性开启预览，点击图片可放大查看。支持滚轮缩放、拖拽移动、旋转、左右切换。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyImage :src="fourImages" :preview="true" />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyImage :src="fourImages" :preview="true" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义预览操作 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义预览操作</h2>
      <p class="doc-section__desc">
        通过 <code>previewActions</code> 属性自定义预览界面的操作按钮。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="image-row">
            <div class="image-item">
              <span class="image-label">仅缩放</span>
              <XlyImage :src="singleImage" :preview="true" :preview-actions="['zoomIn', 'zoomOut']" />
            </div>
            <div class="image-item">
              <span class="image-label">仅旋转</span>
              <XlyImage :src="singleImage" :preview="true" :preview-actions="['rotateLeft', 'rotateRight', 'reset']" />
            </div>
            <div class="image-item">
              <span class="image-label">完整功能</span>
              <XlyImage :src="fourImages" :preview="true" :preview-actions="true" />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 仅缩放 --&gt;
&lt;XlyImage :src="singleImage" :preview="true" :preview-actions="['zoomIn', 'zoomOut']" /&gt;

&lt;!-- 仅旋转 --&gt;
&lt;XlyImage :src="singleImage" :preview="true" :preview-actions="['rotateLeft', 'rotateRight', 'reset']" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 业务场景 -->
    <section class="doc-section">
      <h2 class="doc-section__title">业务场景</h2>

      <h3 class="doc-subtitle">商品图片</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="product-card">
            <XlyImage :src="fourImages" />
            <div class="product-info">
              <div class="product-title">AirPods Pro 无线耳机</div>
              <div class="product-price">¥1999.00</div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="doc-subtitle">用户相册</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="user-album">
            <div class="album-header">
              <XlyAvatar>紫</XlyAvatar>
              <div class="album-info">
                <div class="album-title">旅行照片</div>
                <div class="album-count">12 张照片</div>
              </div>
            </div>
            <XlyImage :src="manyImages" :max="6" />
          </div>
        </div>
      </div>

      <h3 class="doc-subtitle">聊天消息中的图片</h3>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="chat-messages">
            <div class="chat-message">
              <XlyAvatar>张</XlyAvatar>
              <div class="chat-content">
                <div class="chat-bubble">这是现场的照片</div>
                <XlyImage :src="threeImages" :max="3" />
                <div class="chat-time">10:30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="doc-section">
      <h2 class="doc-section__title">API</h2>

      <h3 class="doc-subtitle">Props</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>src</code></td>
              <td>图片地址，支持数组或逗号拼接的字符串</td>
              <td><code>string | string[]</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>alt</code></td>
              <td>图片 alt</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>previewSrcList</code></td>
              <td>预览图片列表</td>
              <td><code>string[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>preview</code></td>
              <td>是否开启预览</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>previewActions</code></td>
              <td>预览操作按钮配置</td>
              <td><code>array | true</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td>多图模式显示数量</td>
              <td><code>number</code></td>
              <td><code>4</code></td>
            </tr>
            <tr>
              <td><code>fit</code></td>
              <td>图片填充模式</td>
              <td><code>'fill' | 'contain' | 'cover' | 'none' | 'scale-down'</code></td>
              <td><code>'cover'</code></td>
            </tr>
            <tr>
              <td><code>mode</code></td>
              <td>预览模式: 单图single/多图grid</td>
              <td><code>'single' | 'grid'</code></td>
              <td><code>'grid'</code></td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>图片宽度，支持数字(px)或字符串</td>
              <td><code>number | string</code></td>
              <td><code>120</code></td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td>图片高度，支持数字(px)或字符串</td>
              <td><code>number | string</code></td>
              <td><code>120</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Events</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>error</code></td>
              <td>图片加载失败时触发</td>
              <td><code>(event: Event)</code></td>
            </tr>
            <tr>
              <td><code>preview</code></td>
              <td>点击图片预览时触发</td>
              <td><code>(index: number)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Slots</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>插槽名</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>overlay</code></td>
              <td>图片遮罩层内容</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyAvatar from '@/components/xly-avatar/index.vue'
import XlyImage from '@/components/xly-image/index.vue'

// 示例图片
const singleImage = 'https://picsum.photos/400/300?random=1'
const twoImages = ['https://picsum.photos/400/300?random=2', 'https://picsum.photos/400/300?random=3']
const threeImages = ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5', 'https://picsum.photos/400/300?random=6']
const fourImages = [
  'https://picsum.photos/400/300?random=7',
  'https://picsum.photos/400/300?random=8',
  'https://picsum.photos/400/300?random=9',
  'https://picsum.photos/400/300?random=10',
]
const manyImages = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/400/300?random=${i + 20}`)
</script>

<style scoped lang="scss">
.image-doc {
  padding: 8px 0 40px;
}

.doc-header {
  margin-bottom: 36px;
}

.doc-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}

.doc-desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0;
  line-height: 1.6;
}

.doc-section {
  margin-bottom: 32px;
}

.doc-section__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f3f7;
}

.doc-section__desc {
  font-size: 14px;
  color: #8e8ea0;
  margin: 0 0 16px;
  line-height: 1.6;

  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.doc-preview__body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
  padding: 24px;
}

.doc-code {
  border-top: 1px solid #f2f3f7;
  background: #fafbfd;
  padding: 16px 20px;
  overflow-x: auto;

  pre {
    margin: 0;
    padding: 0;
  }

  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 13px;
    line-height: 1.7;
    color: #4a4a6a;
    white-space: pre;
  }
}

.doc-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 20px 0 10px;
}

.doc-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th,
  td {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid #f2f3f7;
    white-space: nowrap;
  }

  th {
    background: #fafbfd;
    font-weight: 600;
    color: #1a1a2e;
  }

  td {
    color: #4a4a6a;
  }

  code {
    background: #f5f6fa;
    color: #4f6ef7;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

/* 图片演示行 */
.image-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.image-label {
  font-size: 12px;
  color: #8e8ea0;
}

/* 商品卡片 */
.product-card {
  display: inline-flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #e8e8f0;
  border-radius: 12px;
  gap: 12px;
  background: #fff;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-title {
  font-size: 14px;
  color: #4a4a6a;
}

.product-price {
  font-size: 16px;
  color: #f56c6c;
  font-weight: 600;
}

/* 用户相册 */
.user-album {
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e8e8f0;
  border-radius: 12px;
  background: #fff;
}

.album-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.album-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.album-title {
  font-size: 14px;
  color: #4a4a6a;
  font-weight: 500;
}

.album-count {
  font-size: 12px;
  color: #8e8ea0;
}

/* 聊天消息 */
.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.chat-message {
  display: flex;
  gap: 12px;
}

.chat-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-bubble {
  padding: 10px 14px;
  background: #f0f2f8;
  border-radius: 12px;
  font-size: 14px;
  color: #4a4a6a;
  max-width: 240px;
}

.chat-time {
  font-size: 11px;
  color: #8e8ea0;
}
</style>
