<template>
  <div class="carousel-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Carousel 轮播</h1>
      <p class="doc-desc">用于循环展示一组内容，支持 3D 透视模式、自动播放、循环切换、键盘导航、轮播标题和多种指示器样式。</p>
    </div>

    <!-- 基础用法 -->
    <section class="doc-section">
      <h2 class="doc-section__title">基础用法</h2>
      <p class="doc-section__desc">通过 <code>items</code> 属性传入图片 URL 数组，组件会自动轮播。默认间隔 3 秒，支持循环播放。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="carousel-demo">
            <XlyCarousel :items="basicImages" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel :items="images" /&gt;

&lt;script setup&gt;
const images = [
  'https://picsum.photos/seed/slide1/800/400',
  'https://picsum.photos/seed/slide2/800/400',
  'https://picsum.photos/seed/slide3/800/400',
]
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 3D 模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">3D 透视模式</h2>
      <p class="doc-section__desc">通过 <code>mode="3d"</code> 开启 3D 透视效果，幻灯片以卡片堆叠形式展示，当前项居中放大，两侧项缩小并带有透视旋转，带来更沉浸的视觉体验。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="carousel-demo">
            <XlyCarousel :items="basicImages" mode="3d" :interval="4000" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel :items="images" mode="3d" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 轮播标题 -->
    <section class="doc-section">
      <h2 class="doc-section__title">轮播标题</h2>
      <p class="doc-section__desc">通过 <code>show-title</code> 属性开启标题栏，标题文本默认从数据对象的 <code>title</code> 字段读取。可通过 <code>title-field</code> 指定字段名，也可通过 <code>#title</code> 插槽完全自定义标题内容。配合 <code>show-counter</code> 可显示当前序号。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; gap: 20px;">
          <div class="carousel-demo">
            <p class="demo-label">默认标题 + 计数器</p>
            <XlyCarousel :items="titledSlides" show-title show-counter :interval="4000" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">自定义字段名（titleField="name"）</p>
            <XlyCarousel :items="namedSlides" show-title title-field="name" :interval="4000" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">3D 模式 + 标题</p>
            <XlyCarousel :items="titledSlides" mode="3d" show-title :interval="4000" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 默认标题字段 --&gt;
&lt;XlyCarousel :items="slides" show-title show-counter /&gt;

&lt;!-- 指定字段名 --&gt;
&lt;XlyCarousel :items="slides" show-title title-field="name" /&gt;

&lt;!-- 3D 模式 + 标题 --&gt;
&lt;XlyCarousel :items="slides" mode="3d" show-title /&gt;

&lt;!-- 自定义标题插槽 --&gt;
&lt;XlyCarousel :items="slides" show-title&gt;
  &lt;template #title="{ item }"&gt;
    &lt;span&gt;&lbrace;&lbrace; item.category &rbrace;&rbrace; - &lbrace;&lbrace; item.title &rbrace;&rbrace;&lt;/span&gt;
  &lt;/template&gt;
&lt;/XlyCarousel&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 指示器样式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">指示器样式</h2>
      <p class="doc-section__desc">通过 <code>dot-type</code> 属性设置指示器样式，支持 <code>dot</code>（圆点）、<code>line</code>（线条）和 <code>number</code>（数字）三种类型。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; gap: 20px;">
          <div class="carousel-demo">
            <p class="demo-label">圆点指示器（默认）</p>
            <XlyCarousel :items="basicImages" dot-type="dot" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">线条指示器</p>
            <XlyCarousel :items="basicImages" dot-type="line" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">数字指示器</p>
            <XlyCarousel :items="basicImages" dot-type="number" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 圆点指示器 --&gt;
&lt;XlyCarousel :items="images" dot-type="dot" /&gt;

&lt;!-- 线条指示器 --&gt;
&lt;XlyCarousel :items="images" dot-type="line" /&gt;

&lt;!-- 数字指示器 --&gt;
&lt;XlyCarousel :items="images" dot-type="number" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 指示器位置 -->
    <section class="doc-section">
      <h2 class="doc-section__title">指示器位置</h2>
      <p class="doc-section__desc">通过 <code>dot-position</code> 属性设置指示器位置，支持 <code>bottom</code>（底部）、<code>left</code>（左侧）、<code>right</code>（右侧）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; gap: 20px;">
          <div class="carousel-demo">
            <p class="demo-label">底部（默认）</p>
            <XlyCarousel :items="basicImages" dot-position="bottom" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">左侧</p>
            <XlyCarousel :items="basicImages" dot-position="left" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel :items="images" dot-position="bottom" /&gt;
&lt;XlyCarousel :items="images" dot-position="left" /&gt;
&lt;XlyCarousel :items="images" dot-position="right" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 箭头策略 -->
    <section class="doc-section">
      <h2 class="doc-section__title">箭头显示策略</h2>
      <p class="doc-section__desc">通过 <code>arrow</code> 属性控制箭头的显示方式：<code>hover</code>（悬停显示，默认）、<code>always</code>（始终显示）、<code>never</code>（始终隐藏）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; gap: 20px;">
          <div class="carousel-demo">
            <p class="demo-label">悬停显示（默认） — 鼠标移入查看效果</p>
            <XlyCarousel :items="basicImages" arrow="hover" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">始终显示</p>
            <XlyCarousel :items="basicImages" arrow="always" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">始终隐藏</p>
            <XlyCarousel :items="basicImages" arrow="never" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel :items="images" arrow="hover" /&gt;
&lt;XlyCarousel :items="images" arrow="always" /&gt;
&lt;XlyCarousel :items="images" arrow="never" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义内容 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义内容</h2>
      <p class="doc-section__desc">通过 <code>#item</code> 作用域插槽自定义每张幻灯片的内容，适用于非图片类的轮播场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="carousel-demo">
            <XlyCarousel :items="customSlides" :interval="4000">
              <template #item="{ item, index }">
                <div class="custom-slide" :style="{ background: (item as any).bg }">
                  <div class="custom-slide__content">
                    <h3>{{ (item as any).title }}</h3>
                    <p>{{ (item as any).desc }}</p>
                  </div>
                </div>
              </template>
            </XlyCarousel>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel :items="slides" :interval="4000"&gt;
  &lt;template #item="{ item }"&gt;
    &lt;div class="custom-slide" :style="{ background: item.bg }"&gt;
      &lt;h3&gt;&lbrace;&lbrace; item.title &rbrace;&rbrace;&lt;/h3&gt;
      &lt;p&gt;&lbrace;&lbrace; item.desc &rbrace;&rbrace;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/XlyCarousel&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 垂直轮播 -->
    <section class="doc-section">
      <h2 class="doc-section__title">垂直轮播</h2>
      <p class="doc-section__desc">通过 <code>direction="vertical"</code> 切换为垂直方向轮播，适用于侧边公告等场景。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="carousel-demo carousel-demo--vertical">
            <XlyCarousel :items="verticalSlides" direction="vertical" :interval="2500">
              <template #item="{ item }">
                <div class="vertical-slide" :style="{ background: (item as any).bg }">
                  <span class="vertical-slide__tag">{{ (item as any).tag }}</span>
                  <span class="vertical-slide__text">{{ (item as any).text }}</span>
                </div>
              </template>
            </XlyCarousel>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel
  :items="notices"
  direction="vertical"
  :interval="2500"
&gt;
  &lt;template #item="{ item }"&gt;
    &lt;div class="notice"&gt;
      &lt;span&gt;&lbrace;&lbrace; item.tag &rbrace;&rbrace;&lt;/span&gt;
      &lt;span&gt;&lbrace;&lbrace; item.text &rbrace;&rbrace;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/XlyCarousel&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义高度 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义高度</h2>
      <p class="doc-section__desc">通过 <code>height</code> 属性设置轮播容器高度，支持数字（单位 px）或 CSS 字符串（如 <code>'40vh'</code>、<code>'300px'</code>）。默认高度为 200px（3D 模式为 260px）。</p>
      <div class="doc-preview">
        <div class="doc-preview__body" style="flex-direction: column; gap: 20px;">
          <div class="carousel-demo">
            <p class="demo-label">高度 120px</p>
            <XlyCarousel :items="basicImages" :height="120" :interval="0" arrow="always" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">高度 300px</p>
            <XlyCarousel :items="basicImages" :height="300" :interval="0" arrow="always" />
          </div>
          <div class="carousel-demo">
            <p class="demo-label">CSS 字符串 '50vh'</p>
            <XlyCarousel :items="basicImages" height="50vh" :interval="0" arrow="always" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 数字类型（单位 px） --&gt;
&lt;XlyCarousel :items="images" :height="120" /&gt;
&lt;XlyCarousel :items="images" :height="300" /&gt;

&lt;!-- CSS 字符串 --&gt;
&lt;XlyCarousel :items="images" height="50vh" /&gt;
&lt;XlyCarousel :items="images" height="400px" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 关闭自动播放 -->
    <section class="doc-section">
      <h2 class="doc-section__title">关闭自动播放</h2>
      <p class="doc-section__desc">将 <code>interval</code> 设为 <code>0</code> 关闭自动播放，通过箭头或指示器手动切换。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="carousel-demo">
            <XlyCarousel :items="basicImages" :interval="0" arrow="always" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel :items="images" :interval="0" arrow="always" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 非循环模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">非循环模式</h2>
      <p class="doc-section__desc">将 <code>loop</code> 设为 <code>false</code>，轮播到达首尾后停止，不会循环。</p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="carousel-demo">
            <XlyCarousel :items="basicImages" :loop="false" :interval="0" arrow="always" />
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyCarousel :items="images" :loop="false" :interval="0" arrow="always" /&gt;</code></pre>
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
              <td><code>items</code></td>
              <td>轮播数据列表，支持图片 URL 字符串或任意对象</td>
              <td><code>(string | Record&lt;string, unknown&gt;)[]</code></td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td><code>mode</code></td>
              <td>轮播模式</td>
              <td><code>'slide' | '3d'</code></td>
              <td><code>'slide'</code></td>
            </tr>
            <tr>
              <td><code>interval</code></td>
              <td>自动播放间隔（毫秒），0 表示不自动播放</td>
              <td><code>number</code></td>
              <td><code>3000</code></td>
            </tr>
            <tr>
              <td><code>loop</code></td>
              <td>是否循环播放</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>direction</code></td>
              <td>轮播方向</td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
            </tr>
            <tr>
              <td><code>arrow</code></td>
              <td>箭头显示策略</td>
              <td><code>'always' | 'hover' | 'never'</code></td>
              <td><code>'hover'</code></td>
            </tr>
            <tr>
              <td><code>dot-position</code></td>
              <td>指示器位置</td>
              <td><code>'bottom' | 'left' | 'right'</code></td>
              <td><code>'bottom'</code></td>
            </tr>
            <tr>
              <td><code>dot-type</code></td>
              <td>指示器样式类型</td>
              <td><code>'dot' | 'line' | 'number'</code></td>
              <td><code>'dot'</code></td>
            </tr>
            <tr>
              <td><code>show-dots</code></td>
              <td>是否显示指示器</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-arrows</code></td>
              <td>是否显示箭头</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>show-title</code></td>
              <td>是否显示标题栏</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>show-counter</code></td>
              <td>是否在标题旁显示计数器（如 1 / 4）</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>title-field</code></td>
              <td>数据中标题字段名</td>
              <td><code>string</code></td>
              <td><code>'title'</code></td>
            </tr>
            <tr>
              <td><code>item-key</code></td>
              <td>数据中用作唯一 key 的字段名</td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
            </tr>
            <tr>
              <td><code>pause-on-hover</code></td>
              <td>鼠标悬停时是否暂停自动播放</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>initial-index</code></td>
              <td>初始索引</td>
              <td><code>number</code></td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td>轮播容器高度，支持数字（px）或 CSS 字符串</td>
              <td><code>number | string</code></td>
              <td><code>200</code></td>
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
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>item</code></td>
              <td>自定义每项内容</td>
              <td><code>{ item: T, index: number }</code></td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>自定义标题栏内容（需 <code>show-title</code>）</td>
              <td><code>{ item: T, index: number }</code></td>
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
              <td><code>change</code></td>
              <td>切换时触发</td>
              <td><code>(index: number, prevIndex: number)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Expose</h3>
      <div class="doc-table">
        <table>
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>next()</code></td>
              <td>切换到下一张</td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td><code>prev()</code></td>
              <td>切换到上一张</td>
              <td><code>—</code></td>
            </tr>
            <tr>
              <td><code>goTo(index)</code></td>
              <td>跳转到指定索引</td>
              <td><code>index: number</code></td>
            </tr>
            <tr>
              <td><code>currentIndex</code></td>
              <td>当前索引（响应式 ref）</td>
              <td><code>—</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XlyCarousel from '@/components/xly-carousel/index.vue'

const basicImages = [
  'https://picsum.photos/seed/carousel-a/800/400',
  'https://picsum.photos/seed/carousel-b/800/400',
  'https://picsum.photos/seed/carousel-c/800/400',
  'https://picsum.photos/seed/carousel-d/800/400',
]

const titledSlides = [
  { src: 'https://picsum.photos/seed/title-1/800/400', title: '晨光中的城市天际线', desc: '宁静的早晨，城市在晨曦中苏醒' },
  { src: 'https://picsum.photos/seed/title-2/800/400', title: '海岸边的日落余晖', desc: '金色的阳光洒在海面上' },
  { src: 'https://picsum.photos/seed/title-3/800/400', title: '雪山与星空的对话', desc: '在海拔 4000 米仰望银河' },
  { src: 'https://picsum.photos/seed/title-4/800/400', title: '热带雨林深处的秘境', desc: '探索未知的自然奇观' },
]

const namedSlides = [
  { src: 'https://picsum.photos/seed/name-1/800/400', name: '科技前沿' },
  { src: 'https://picsum.photos/seed/name-2/800/400', name: '艺术殿堂' },
  { src: 'https://picsum.photos/seed/name-3/800/400', name: '自然之声' },
]

const customSlides = [
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', title: '全新设计语言', desc: '采用现代化 UI 设计，带来极致视觉体验' },
  { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', title: '高效开发体验', desc: '丰富的组件库，开箱即用' },
  { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', title: '强大的类型系统', desc: '全面 TypeScript 支持，开发更安心' },
]

const verticalSlides = [
  { bg: '#4f6ef7', tag: '新功能', text: 'v2.0 版本发布，新增暗色模式支持' },
  { bg: '#34c759', tag: '通知', text: '系统将于今晚 22:00 进行维护升级' },
  { bg: '#f5a623', tag: '公告', text: '年度技术大会报名已开启，名额有限' },
  { bg: '#f56c6c', tag: '预警', text: 'API 调用量已达日限额的 80%' },
]
</script>

<style scoped lang="scss">
.carousel-doc {
  padding: 8px 0 40px;
}

.doc-header { margin-bottom: 36px; }
.doc-title {
  font-size: 26px; font-weight: 700; color: #1a1a2e;
  margin: 0 0 8px; letter-spacing: -0.3px;
}
.doc-desc {
  font-size: 14px; color: #8e8ea0; margin: 0; line-height: 1.6;
}

.doc-section { margin-bottom: 32px; }
.doc-section__title {
  font-size: 18px; font-weight: 600; color: #1a1a2e;
  margin: 0 0 8px; padding-bottom: 10px; border-bottom: 1px solid #f2f3f7;
}
.doc-section__desc {
  font-size: 14px; color: #8e8ea0; margin: 0 0 16px; line-height: 1.6;
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7; border-radius: 12px;
  overflow: hidden; background: #fff;
}
.doc-preview__body {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 12px; padding: 24px;
}
.doc-code {
  border-top: 1px solid #f2f3f7; background: #fafbfd;
  padding: 16px 20px; overflow-x: auto;
  pre { margin: 0; padding: 0; }
  code {
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 13px; line-height: 1.7; color: #4a4a6a; white-space: pre;
  }
}

.doc-subtitle { font-size: 15px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; }
.doc-table { overflow-x: auto;
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f2f3f7; white-space: nowrap; }
  th { background: #fafbfd; font-weight: 600; color: #1a1a2e; }
  td { color: #4a4a6a; }
  code {
    background: #f5f6fa; color: #4f6ef7; padding: 2px 6px;
    border-radius: 4px; font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  }
}

/* 演示区域 */
.carousel-demo {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  &--vertical {
    max-width: 360px;
  }
}

.demo-label {
  font-size: 13px;
  color: #8e8ea0;
  margin: 0 0 8px;
}

/* 自定义幻灯片样式 */
.custom-slide {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  &__content {
    text-align: center;
    color: #fff;

    h3 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 8px;
    }

    p {
      font-size: 14px;
      opacity: 0.85;
      margin: 0;
    }
  }
}

/* 垂直幻灯片样式 */
.vertical-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  box-sizing: border-box;
  color: #fff;

  &__tag {
    flex-shrink: 0;
    padding: 2px 10px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }

  &__text {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
