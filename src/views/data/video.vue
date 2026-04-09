<template>
  <div class="video-doc">
    <!-- 页面标题 -->
    <div class="doc-header">
      <h1 class="doc-title">Video 视频</h1>
      <p class="doc-desc">现代风格的视频播放组件，支持封面图、播放控制、进度拖拽、音量调节、全屏等功能。</p>
    </div>

    <!-- 弹幕功能 -->
    <section class="doc-section">
      <h2 class="doc-section__title">弹幕功能</h2>
      <p class="doc-section__desc">
        支持弹幕显示、发送弹幕、弹幕列表等B站风格功能。默认静音播放，按 <code>C</code> 键可快速切换弹幕显示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyVideo
            src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
            poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
            :height="480"
            :danmaku="danmakuList"
            :showPoster="true"
            @danmakuSend="handleDanmakuSend"
          />
        </div>
        <div class="doc-code">
          <pre><code>const danmakuList = [
  { id: 1, text: '前方高能！', time: 5, color: '#FE0302', mode: 'scroll' },
  { id: 2, text: '哈哈哈', time: 10, color: '#FFFF00', mode: 'scroll' },
]

&lt;XlyVideo
  src="..."
  :danmaku="danmakuList"
  @danmakuSend="handleDanmakuSend"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自动播放 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自动播放</h2>
      <p class="doc-section__desc">
        设置 <code>autoplay</code> 属性实现自动播放，<code>muted</code> 属性实现静音自动播放。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="video-row">
            <div class="video-item">
              <span class="video-label">自动播放（静音）</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                :autoplay="true"
                :muted="true"
                :show-poster="false"
                :height="180"
              />
            </div>
            <div class="video-item">
              <span class="video-label">不自动播放</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                :autoplay="false"
                :show-poster="false"
                :height="180"
              />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 静音自动播放 --&gt;
&lt;XlyVideo src="..." :autoplay="true" :muted="true" /&gt;

&lt;!-- 手动播放 --&gt;
&lt;XlyVideo src="..." :autoplay="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 封面图模式 -->
    <section class="doc-section">
      <h2 class="doc-section__title">封面图模式</h2>
      <p class="doc-section__desc">
        设置 <code>showPoster</code> 属性控制是否显示封面图，点击封面后开始播放视频。如果未传入 <code>poster</code>，将自动捕获视频第一帧作为封面。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="video-row">
            <div class="video-item">
              <span class="video-label">自定义封面图</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
                :height="180"
              />
            </div>
            <div class="video-item">
              <span class="video-label">自动捕获第一帧（无poster）</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                :showPoster="true"
                :height="180"
              />
            </div>
            <div class="video-item">
              <span class="video-label">隐藏封面图</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                :showPoster="false"
                :height="180"
              />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;!-- 自定义封面图 --&gt;
&lt;XlyVideo src="..." poster="..." /&gt;

&lt;!-- 自动捕获第一帧（不传poster） --&gt;
&lt;XlyVideo src="..." /&gt;

&lt;!-- 隐藏封面图 --&gt;
&lt;XlyVideo src="..." :show-poster="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义尺寸 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义尺寸</h2>
      <p class="doc-section__desc">
        通过 <code>width</code> 和 <code>height</code> 属性设置视频尺寸。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="video-row">
            <div class="video-item">
              <span class="video-label">小尺寸 320x180</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
                :width="320"
                :height="180"
              />
            </div>
            <div class="video-item">
              <span class="video-label">大尺寸 640x360</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
                :width="640"
                :height="360"
              />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyVideo src="..." :width="320" :height="180" /&gt;
&lt;XlyVideo src="..." width="100%" :height="360" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 播放控制选项 -->
    <section class="doc-section">
      <h2 class="doc-section__title">播放控制选项</h2>
      <p class="doc-section__desc">
        通过属性控制各个控制项的显示隐藏。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="video-row">
            <div class="video-item">
              <span class="video-label">隐藏速度控制</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
                :show-speed="false"
                :height="180"
              />
            </div>
            <div class="video-item">
              <span class="video-label">隐藏音量控制</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
                :show-volume="false"
                :height="180"
              />
            </div>
            <div class="video-item">
              <span class="video-label">隐藏全屏按钮</span>
              <XlyVideo
                src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
                poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
                :show-fullscreen="false"
                :height="180"
              />
            </div>
          </div>
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyVideo src="..." :show-speed="false" /&gt;
&lt;XlyVideo src="..." :show-volume="false" /&gt;
&lt;XlyVideo src="..." :show-fullscreen="false" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 循环播放 -->
    <section class="doc-section">
      <h2 class="doc-section__title">循环播放</h2>
      <p class="doc-section__desc">
        设置 <code>loop</code> 属性实现视频循环播放。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyVideo
            src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
            poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
            :loop="true"
            :height="280"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyVideo src="..." :loop="true" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 自定义播放速率 -->
    <section class="doc-section">
      <h2 class="doc-section__title">自定义播放速率</h2>
      <p class="doc-section__desc">
        通过 <code>playbackRates</code> 属性自定义可选的播放速率。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyVideo
            src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
            poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
            :playback-rates="[0.5, 1, 2, 3]"
            :height="280"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyVideo src="..." :playback-rates="[0.5, 1, 2, 3]" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 事件监听 -->
    <section class="doc-section">
      <h2 class="doc-section__title">事件监听</h2>
      <p class="doc-section__desc">
        支持 <code>play</code>、<code>pause</code>、<code>ended</code>、<code>timeupdate</code>、<code>error</code> 等事件。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyVideo
            ref="videoRef"
            src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
            poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
            :height="280"
            @play="handlePlay"
            @pause="handlePause"
            @ended="handleEnded"
            @timeupdate="handleTimeUpdate"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyVideo
  ref="videoRef"
  src="..."
  @play="handlePlay"
  @pause="handlePause"
  @ended="handleEnded"
  @timeupdate="handleTimeUpdate"
/&gt;

&lt;script setup&gt;
const handlePlay = () => console.log('播放开始')
const handlePause = () => console.log('暂停')
const handleEnded = () => console.log('播放结束')
const handleTimeUpdate = (time) => console.log('当前时间:', time)
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 关闭弹幕功能 -->
    <section class="doc-section">
      <h2 class="doc-section__title">关闭弹幕功能</h2>
      <p class="doc-section__desc">
        设置 <code>danmakuEnabled</code> 属性为 <code>false</code> 可关闭弹幕功能，所有弹幕相关 UI 都不显示。
      </p>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <XlyVideo
            src="https://media.zlongame.com/media/pictures/cn/7jiemt/img/pc/video/1.mp4"
            poster="https://media.zlongame.com/media/pictures/cn/7jiemt/file-business/pc_banner/ZZzZZKrp1904803141292003328b8112.jpg"
            :height="280"
            :danmaku="danmakuList"
            :danmaku-enabled="false"
          />
        </div>
        <div class="doc-code">
          <pre><code>&lt;XlyVideo
  src="..."
  :danmaku="danmakuList"
  :danmaku-enabled="false"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- API -->
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
              <td>视频地址</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>poster</code></td>
              <td>封面图地址（未传时自动捕获视频第一帧）</td>
              <td><code>string</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>视频宽度</td>
              <td><code>number | string</code></td>
              <td><code>'100%'</code></td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td>视频高度</td>
              <td><code>number | string</code></td>
              <td><code>540</code></td>
            </tr>
            <tr>
              <td><code>autoplay</code></td>
              <td>是否自动播放</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>muted</code></td>
              <td>是否静音（默认true）</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>loop</code></td>
              <td>是否循环播放</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>controls</code></td>
              <td>是否显示控制栏</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showPoster</code></td>
              <td>是否显示封面图（未传poster时自动捕获第一帧）</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showSpeed</code></td>
              <td>是否显示播放速度控制</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showVolume</code></td>
              <td>是否显示音量控制</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showFullscreen</code></td>
              <td>是否显示全屏按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>dblclickFullscreen</code></td>
              <td>是否开启双击视频区域全屏</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>danmakuEnabled</code></td>
              <td>是否开启弹幕功能（关闭后所有弹幕相关UI都不显示）</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showDanmakuToggle</code></td>
              <td>是否显示弹幕开关</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showDanmakuInput</code></td>
              <td>是否显示弹幕输入框（在播放器下方）</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>showDanmakuList</code></td>
              <td>是否显示弹幕列表按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>danmaku</code></td>
              <td>弹幕数据列表</td>
              <td><code>Danmaku[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>initialVolume</code></td>
              <td>初始音量 0-1</td>
              <td><code>number</code></td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>playbackRates</code></td>
              <td>播放速率选项</td>
              <td><code>number[]</code></td>
              <td><code>[0.5, 0.75, 1, 1.25, 1.5, 2]</code></td>
            </tr>
            <tr>
              <td><code>preload</code></td>
              <td>预加载模式</td>
              <td><code>'auto' | 'metadata' | 'none'</code></td>
              <td><code>'auto'</code></td>
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
              <td><code>play</code></td>
              <td>播放时触发</td>
              <td><code>(event: Event)</code></td>
            </tr>
            <tr>
              <td><code>pause</code></td>
              <td>暂停时触发</td>
              <td><code>(event: Event)</code></td>
            </tr>
            <tr>
              <td><code>ended</code></td>
              <td>播放结束时触发</td>
              <td><code>(event: Event)</code></td>
            </tr>
            <tr>
              <td><code>timeupdate</code></td>
              <td>播放进度更新时触发</td>
              <td><code>(currentTime: number)</code></td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>加载错误时触发</td>
              <td><code>(error: ErrorEvent)</code></td>
            </tr>
            <tr>
              <td><code>volumechange</code></td>
              <td>音量变化时触发</td>
              <td><code>(volume: number)</code></td>
            </tr>
            <tr>
              <td><code>danmakuSend</code></td>
              <td>发送弹幕时触发</td>
              <td><code>(danmaku: Danmaku)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="doc-subtitle">Methods</h3>
      <p class="doc-section__desc">
        通过 <code>ref</code> 绑定组件实例后，可以调用以下方法：
      </p>
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
              <td><code>play()</code></td>
              <td>播放视频</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>pause()</code></td>
              <td>暂停视频</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>seekTo(time)</code></td>
              <td>跳转到指定时间</td>
              <td><code>(time: number)</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 快捷键说明 -->
    <section class="doc-section">
      <h2 class="doc-section__title">键盘快捷键</h2>
      <div class="doc-preview">
        <div class="doc-preview__body">
          <div class="shortcuts-list">
            <div class="shortcut-item">
              <span class="shortcut-key">空格 / K</span>
              <span class="shortcut-desc">播放/暂停</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">F</span>
              <span class="shortcut-desc">切换全屏</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">M</span>
              <span class="shortcut-desc">切换静音</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">←</span>
              <span class="shortcut-desc">后退 5 秒</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">→</span>
              <span class="shortcut-desc">前进 5 秒</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">↑</span>
              <span class="shortcut-desc">增加音量</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">↓</span>
              <span class="shortcut-desc">降低音量</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">双击视频</span>
              <span class="shortcut-desc">切换全屏（可通过 <code>dblclickFullscreen</code> 关闭）</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">C</span>
              <span class="shortcut-desc">切换弹幕显示</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XlyVideo from '@/components/xly-video/index.vue'

// 弹幕类型
interface Danmaku {
  id: number
  text: string
  time: number
  color: string
  mode: 'scroll' | 'top' | 'bottom'
}

// 示例弹幕数据
const danmakuList = ref<Danmaku[]>([
  { id: 1, text: '前方高能！', time: 3, color: '#FE0302', mode: 'scroll' },
  { id: 2, text: '太精彩了', time: 6, color: '#FF7204', mode: 'scroll' },
  { id: 3, text: '哈哈哈笑死了', time: 9, color: '#FFFF00', mode: 'scroll' },
  { id: 4, text: '学到了', time: 12, color: '#00FF00', mode: 'scroll' },
  { id: 5, text: '必须三连！', time: 15, color: '#00FFFF', mode: 'scroll' },
  { id: 6, text: '大佬牛皮', time: 18, color: '#4A5BEE', mode: 'scroll' },
  { id: 7, text: '泪目', time: 21, color: '#FF39C4', mode: 'scroll' },
  { id: 8, text: '太强了', time: 24, color: '#ffffff', mode: 'scroll' },
  { id: 9, text: '收藏了', time: 27, color: '#FFFF00', mode: 'scroll' },
  { id: 10, text: '下次还看', time: 30, color: '#00FF00', mode: 'scroll' },
  { id: 11, text: '666', time: 33, color: '#FE0302', mode: 'scroll' },
  { id: 12, text: '干货满满', time: 36, color: '#FF7204', mode: 'scroll' },
  { id: 13, text: '点赞！', time: 39, color: '#00FFFF', mode: 'scroll' },
  { id: 14, text: '值得关注', time: 42, color: '#4A5BEE', mode: 'scroll' },
  { id: 15, text: '辛苦了', time: 45, color: '#FF39C4', mode: 'scroll' },
  { id: 16, text: '前方高能！1111', time: 3, color: '#FE0302', mode: 'scroll' },
  { id: 17, text: '太精彩了111', time: 6, color: '#FF7204', mode: 'scroll' },
  { id: 18, text: '哈哈哈笑死了111', time: 9, color: '#FFFF00', mode: 'scroll' },
  { id: 19, text: '学到了111', time: 90, color: '#00FF00', mode: 'scroll' },
  { id: 20, text: '必须三连！111', time: 60, color: '#00FFFF', mode: 'scroll' },
  { id: 21, text: '大佬牛皮111', time: 80, color: '#4A5BEE', mode: 'scroll' },
])

// 弹幕发送处理（组件内部已维护 sentDanmaku，无需外部重复添加）
const handleDanmakuSend = (danmaku: Danmaku) => {
  console.log('发送弹幕:', danmaku)
}

const videoRef = ref()

// 播放事件处理
const handlePlay = () => {
  console.log('播放开始')
}

// 暂停事件处理
const handlePause = () => {
  console.log('暂停')
}

// 结束事件处理
const handleEnded = () => {
  console.log('播放结束')
}

// 时间更新事件处理
const handleTimeUpdate = (time: number) => {
  console.log('当前时间:', time)
}

</script>

<style scoped lang="scss">
.video-doc {
  padding: 8px 0 40px;
}

.doc-header {
  margin-bottom: 36px;

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
    line-height: 1.6;
    margin: 0;
  }
}

.doc-section {
  margin-bottom: 32px;

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f3f7;
  }

  &__desc {
    font-size: 14px;
    color: #8e8ea0;
    line-height: 1.6;
    margin: 0 0 16px;

    code {
      background: #f5f6fa;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 13px;
      color: #4f6ef7;
    }
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
  margin-bottom: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
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
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    color: #4f6ef7;
  }
}

.doc-preview {
  border: 1px solid #f2f3f7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;

  &__body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
}

.video-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.video-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .video-label {
    font-size: 13px;
    color: #666;
  }
}

.shortcuts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.shortcut-key {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  color: #4f6ef7;
  background: #eef2ff;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.shortcut-desc {
  font-size: 13px;
  color: #666;
}
</style>
