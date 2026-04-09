<template>
  <div class="xly-video-wrapper">
    <!-- 视频播放器容器 -->
    <div
      class="xly-video"
      :class="{ 'is-fullscreen': isFullscreen, 'is-hover': controlsVisible }"
      :style="containerStyle"
      @mouseenter="showControls"
      @mouseleave="hideControls"
      @mousemove="handleMouseMove"
      @click="handleClick"
      @dblclick="handleDblclick"
    >
      <!-- 封面图 -->
      <div v-if="showPoster && !hasPlayed" class="xly-video__poster" @click="play">
        <img v-if="posterSrc" :src="posterSrc" class="xly-video__poster-img" />
        <div v-else class="xly-video__poster-placeholder">
          <svg viewBox="0 0 24 24" width="64" height="64">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
        <div class="xly-video__play-btn">
          <svg viewBox="0 0 24 24" width="48" height="48">
            <path fill="currentColor" d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      <!-- 视频元素 -->
      <video
        ref="videoRef"
        class="xly-video__player"
        :src="src"
        :poster="!showPoster || hasPlayed ? undefined : posterSrc"
        :autoplay="autoplay"
        :muted="muted"
        :loop="loop"
        :preload="preload"
        @play="handlePlay"
        @pause="handlePause"
        @ended="handleEnded"
        @timeupdate="handleTimeUpdate"
        @loadedmetadata="handleLoadedMetadata"
        @waiting="handleWaiting"
        @canplay="handleCanPlay"
        @error="handleError"
      />

      <!-- 弹幕层 -->
      <div v-if="danmakuEnabled" class="xly-video__danmaku-container" ref="danmakuContainerRef">
        <div
          v-show="danmakuVisible"
          v-for="danmaku in activeDanmaku"
          :key="danmaku.id"
          class="xly-video__danmaku-item"
          :class="danmaku.mode"
          :style="danmaku.style"
        >
          <span class="xly-video__danmaku-text">{{ danmaku.text }}</span>
        </div>
      </div>

      <!-- 加载中遮罩 -->
      <div v-if="isLoading" class="xly-video__loading">
        <div class="xly-video__spinner"></div>
      </div>

      <!-- 控制栏 -->
      <div
        v-show="controlsVisible || !isPlaying || isFullscreen"
        class="xly-video__controls"
        :class="{ 'is-show': controlsVisible || !isPlaying || isFullscreen }"
        @click.stop
        @dblclick.stop
      >
        <!-- 进度条 -->
        <div class="xly-video__progress-wrap" @click.stop @dblclick.stop>
          <div class="xly-video__progress" @click="seekTo">
            <div
              class="xly-video__progress-buffered"
              :style="{ width: bufferedPercent + '%' }"
            ></div>
            <div class="xly-video__progress-played" :style="{ width: playedPercent + '%' }">
              <div class="xly-video__progress-thumb"></div>
            </div>
            <!-- 弹幕预览点 -->
            <div
              v-if="danmakuEnabled"
              v-for="dm in danmakuPoints"
              :key="dm.time"
              class="xly-video__progress-danmaku"
              :style="{ left: dm.percent + '%' }"
              :title="dm.text"
            ></div>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="xly-video__controls-inner">
          <!-- 左侧控制 -->
          <div class="xly-video__controls-left">
            <!-- 播放/暂停  -->
            <div class="xly-video__btn-play" @click="togglePlay">
              <svg v-if="isPlaying" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </div>

            <!-- 当前时间 / 总时长 -->
            <div class="xly-video__time">
              {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
            </div>
          </div>

          <!-- 右侧控制 - 按B站图片顺序 -->
          <div class="xly-video__controls-right">
            <!-- 弹幕开关 -->
            <div
              v-if="danmakuEnabled && showDanmakuToggle"
              class="xly-video__btn"
              :class="{ 'is-active': danmakuVisible }"
              @click.stop="toggleDanmaku"
            >
              <span class="xly-video__btn-text">{{ danmakuVisible ? '弹幕' : '弹幕' }}</span>
            </div>

            <!-- 播放速度 -->
            <div v-if="showSpeed" class="xly-video__speed" @click.stop="toggleSpeedMenu">
              <span class="xly-video__speed-text">{{ playbackRate }}x</span>
              <div v-show="speedMenuVisible" class="xly-video__speed-menu">
                <div
                  v-for="rate in playbackRates"
                  :key="rate"
                  class="xly-video__speed-item"
                  :class="{ 'is-active': playbackRate === rate }"
                  @click.stop="setPlaybackRate(rate)"
                >
                  {{ rate }}x
                </div>
              </div>
            </div>

            <!-- 音量控制 -->
            <div
              v-if="showVolume"
              class="xly-video__volume"
              @mouseenter="handleVolumeEnter"
              @mouseleave="handleVolumeLeave"
            >
              <!-- 静音按钮 -->
              <div class="xly-video__volume-btn" @click.stop="toggleMute">
                <!-- 静音图标 -->
                <svg v-if="isMuted || volumePercent === 0" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="currentColor"
                    d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                  />
                </svg>
                <!-- 低音量图标 -->
                <svg
                  v-else-if="volumePercent < 30"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="currentColor"
                    d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
                  />
                </svg>
                <!-- 中音量图标 -->
                <svg
                  v-else-if="volumePercent < 70"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="currentColor"
                    d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5zm6.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
                  />
                </svg>
                <!-- 高音量图标 -->
                <svg v-else viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="currentColor"
                    d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                  />
                </svg>
              </div>

              <!-- 水平音量滑块 -->
              <div class="xly-video__volume-slider">
                <div
                  class="xly-video__volume-track"
                  @mousedown="startVolumeDrag"
                  @click.stop="handleVolumeClick"
                >
                  <div
                    class="xly-video__volume-progress"
                    :style="{ width: volumePercent + '%' }"
                  ></div>
                  <div
                    class="xly-video__volume-handle"
                    :style="{ left: volumePercent + '%' }"
                  ></div>
                </div>
              </div>

              <!-- 音量数值 -->
              <div class="xly-video__volume-value" :class="{ 'is-muted': isMuted }">
                {{ Math.round(volumePercent) }}
              </div>
            </div>

            <!-- 全屏 - 始终显示 -->
            <div class="xly-video__btn" @click="toggleFullscreen">
              <svg v-if="isFullscreen" viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="currentColor"
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="currentColor"
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 大播放按钮（暂停时显示） -->
      <div v-if="!isPlaying && hasPlayed" class="xly-video__big-play" @click="play">
        <svg viewBox="0 0 24 24" width="56" height="56">
          <path fill="currentColor" d="M8 5v14l11-7z"/>
        </svg>
      </div>

      <!-- 弹幕列表面板 -->
      <transition name="slide-right">
        <div v-if="danmakuEnabled && danmakuListVisible" class="xly-video__danmaku-panel" @click.stop>
          <div class="xly-video__danmaku-panel-header">
            <span>弹幕列表</span>
            <span class="xly-video__danmaku-panel-count">{{ danmakuList.length }}条</span>
            <XlyButton type="text" size="small" @click="danmakuListVisible = false">
              <XlyIcon name="el:Close" :size="16" />
            </XlyButton>
          </div>
          <div class="xly-video__danmaku-panel-list">
            <div
              v-for="(dm, index) in danmakuList"
              :key="index"
              class="xly-video__danmaku-panel-item"
              @click="seekToTime(dm.time)"
            >
              <span class="xly-video__danmaku-panel-time">{{ formatTime(dm.time) }}</span>
              <span class="xly-video__danmaku-panel-text" :style="{ color: dm.color }">{{
                dm.text
              }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 弹幕输入区域（播放器下方）- 完全按B站图片 -->
    <div v-if="danmakuEnabled && showDanmakuInput" class="xly-video__danmaku-bar">
      <div class="xly-video__danmaku-bar-inner">
        <!-- 左侧：弹幕数 + 图标 -->
        <div class="xly-video__danmaku-left">
          <span class="xly-video__danmaku-info">
            已装填
            <span class="xly-video__danmaku-count" @click.stop="toggleDanmakuList">
              {{ danmakuList.length }}
            </span>
            条弹幕
            <span v-if="!danmakuEnabled">（已关闭）</span>
          </span>
        </div>

        <!-- 中间：输入框 -->
        <div class="xly-video__danmaku-input-area">
          <input
            v-model="danmakuInputText"
            type="text"
            class="xly-video__danmaku-input"
            placeholder="发个友善的弹幕见证当下"
            maxlength="20"
            @keydown.enter.stop="handleSendDanmaku"
          />
        </div>

        <!-- 右侧：颜色选择 + 发送 -->
        <div class="xly-video__danmaku-right">
          <!-- 颜色选择器 -->
          <div class="xly-video__danmaku-color-picker" @click.stop>
            <div class="xly-video__danmaku-color-btn" @click.stop="toggleColorPicker">
              <span class="xly-video__danmaku-color-current" :style="{ background: danmakuColor }"></span>
            </div>
            <!-- 颜色选择面板 -->
            <transition name="fade">
              <div v-show="colorPickerVisible" class="xly-video__danmaku-color-panel">
                <div
                  v-for="color in danmakuColors"
                  :key="color"
                  class="xly-video__danmaku-color-item"
                  :class="{ 'is-active': danmakuColor === color }"
                  :style="{ background: color }"
                  @click.stop="selectColor(color)"
                >
                  <svg v-if="danmakuColor === color" viewBox="0 0 24 24" width="14" height="14">
                    <path fill="#fff" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
            </transition>
          </div>

          <button
            type="button"
            class="xly-video__danmaku-send"
            :disabled="!danmakuInputText.trim() || isSending"
            @click.stop="handleSendDanmaku"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import XlyButton from '@/components/xly-button/index.vue'
import XlyIcon from '@/components/xly-icon/index.vue'

// 弹幕类型
interface Danmaku {
  id: number
  text: string
  time: number // 出现时间(秒)
  color: string
  mode: 'scroll' | 'top' | 'bottom'
}

const props = withDefaults(
  defineProps<{
    /** 视频地址 */
    src: string
    /** 封面图地址（未传时使用视频第一帧） */
    poster?: string
    /** 自动播放 */
    autoplay?: boolean
    /** 静音播放（默认true） */
    muted?: boolean
    /** 循环播放 */
    loop?: boolean
    /** 预加载模式 */
    preload?: 'auto' | 'metadata' | 'none'
    /** 宽度 */
    width?: number | string
    /** 高度 */
    height?: number | string
    /** 是否显示控制栏 */
    controls?: boolean
    /** 是否显示封面图（播放前显示封面，点击后播放） */
    showPoster?: boolean
    /** 是否显示播放速度选择 */
    showSpeed?: boolean
    /** 是否显示音量控制 */
    showVolume?: boolean
    /** 是否显示全屏按钮 */
    showFullscreen?: boolean
    /** 是否开启双击全屏（默认 true） */
    dblclickFullscreen?: boolean
    /** 是否开启弹幕功能（关闭后所有弹幕相关UI都不显示） */
    danmakuEnabled?: boolean
    /** 是否显示弹幕开关 */
    showDanmakuToggle?: boolean
    /** 是否显示弹幕输入 */
    showDanmakuInput?: boolean
    /** 是否显示弹幕列表 */
    showDanmakuList?: boolean
    /** 弹幕数据 */
    danmaku?: Danmaku[]
    /** 观看人数 */
    viewCount?: number | string
    /** 初始音量 0-1 */
    initialVolume?: number
    /** 播放速率选项 */
    playbackRates?: number[]
  }>(),
  {
    src: '',
    poster: '',
    autoplay: false,
    muted: true, // 默认静音
    loop: false,
    preload: 'auto',
    width: '100%',
    height: 540,
    controls: true,
    showPoster: true,
    showSpeed: true,
    showVolume: true,
    showFullscreen: true,
    dblclickFullscreen: true,
    danmakuEnabled: true,
    showDanmakuToggle: true,
    showDanmakuInput: true,
    showDanmakuList: true,
    danmaku: () => [],
    viewCount: 0,
    initialVolume: 0,
    playbackRates: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
  },
)

const emit = defineEmits<{
  play: [event: Event]
  pause: [event: Event]
  ended: [event: Event]
  timeupdate: [currentTime: number]
  error: [error: ErrorEvent]
  volumechange: [volume: number]
  danmakuSend: [danmaku: Danmaku]
}>()

defineOptions({
  name: 'XlyVideo',
})

// ============ Refs ============
const videoRef = ref<HTMLVideoElement>()
const danmakuContainerRef = ref<HTMLElement>()
const isPlaying = ref(false)
const hasPlayed = ref(false)
const isLoading = ref(true)
const currentTime = ref(0)
const duration = ref(0)
const buffered = ref(0)
// 音量相关
const volume = ref(0.5) // 实际音量
const isMuted = ref(false) // 静音状态
const isDragging = ref(false) // 是否正在拖动
let volumeTrackRect: DOMRect | null = null // 轨道位置
const volumeHover = ref(false) // 鼠标是否在音量区域
const isFullscreen = ref(false)
const controlsVisible = ref(true)
const speedMenuVisible = ref(false)
const playbackRate = ref(1)

// 封面相关
const firstFramePoster = ref('')
const isFirstFrameCaptured = ref(false)

// 弹幕相关
const danmakuVisible = ref(true)
const danmakuListVisible = ref(false)
const danmakuInputText = ref('')
const danmakuColor = ref('#ffffff')
const hideControlsTimer = ref<ReturnType<typeof setTimeout>>()
const danmakuAnimationFrame = ref<number>()
// 用户发送的弹幕
const sentDanmaku = ref<Danmaku[]>([])
// 防止重复发送
const isSending = ref(false)

// 弹幕颜色选项
const danmakuColors = [
  '#ffffff',
  '#FE0302',
  '#FF7204',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#4A5BEE',
  '#FF39C4',
]

// 颜色选择器是否显示
const colorPickerVisible = ref(false)

// 切换颜色选择器
const toggleColorPicker = () => {
  colorPickerVisible.value = !colorPickerVisible.value
}

// 选择颜色
const selectColor = (color: string) => {
  danmakuColor.value = color
  colorPickerVisible.value = false
}

// 弹幕实例（渲染中的）
const activeDanmaku = ref<(Danmaku & { style: Record<string, string>; offset: number })[]>([])
const danmakuTrackCount = 10 // 轨道数量
// 记录每个弹幕ID对应的轨道（确保弹幕始终在同一轨道）
const danmakuTrackMap = new Map<number, number>()
// 记录每个轨道的"释放时间"，用于避免轨道冲突
const trackReleaseTime = new Map<number, number>()
// 滚动时长（秒）
const scrollDuration = 12

// ============ Computed ============

// 容器样式
const containerStyle = computed(() => {
  const style: Record<string, string> = {}
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width
  const height = typeof props.height === 'number' ? `${props.height}px` : props.height
  style.width = width
  style.height = height
  return style
})

// 封面图地址（有自定义封面用自定义，没有则用第一帧）
const posterSrc = computed(() => {
  if (props.poster) return props.poster
  return firstFramePoster.value
})

// 播放进度百分比
const playedPercent = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

// 缓冲进度百分比
const bufferedPercent = computed(() => {
  if (!duration.value) return 0
  return (buffered.value / duration.value) * 100
})

// 音量百分比
const volumePercent = computed(() => {
  if (isMuted.value) return 0
  return Math.round(volume.value * 100)
})

// 进度条上的弹幕预览点
const danmakuPoints = computed(() => {
  return props.danmaku.slice(0, 20).map((dm) => ({
    time: dm.time,
    percent: duration.value ? (dm.time / duration.value) * 100 : 0,
    text: dm.text,
  }))
})

// 弹幕列表（传入的 + 发送的）
const danmakuList = computed(() => [...props.danmaku, ...sentDanmaku.value])

// ============ Methods ============

// 捕获视频第一帧作为封面
const captureFirstFrame = async () => {
  if (!videoRef.value || isFirstFrameCaptured.value) return

  try {
    // 创建canvas捕获第一帧
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 等待视频元数据加载
    if (videoRef.value.readyState < 1) {
      await new Promise<void>((resolve) => {
        videoRef.value?.addEventListener('loadedmetadata', () => resolve(), { once: true })
      })
    }

    // 设置canvas尺寸
    canvas.width = videoRef.value.videoWidth || 320
    canvas.height = videoRef.value.videoHeight || 180

    // 跳转到0.1秒位置捕获第一帧（避免黑屏）
    const oldTime = videoRef.value.currentTime
    videoRef.value.currentTime = 0.1

    await new Promise<void>((resolve) => {
      videoRef.value?.addEventListener('seeked', () => resolve(), { once: true })
    })

    // 绘制第一帧
    ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)

    // 恢复原始时间
    videoRef.value.currentTime = oldTime

    // 转换为Data URL
    firstFramePoster.value = canvas.toDataURL('image/jpeg', 0.8)
    isFirstFrameCaptured.value = true
  } catch (e) {
    console.warn('Failed to capture first frame:', e)
  }
}

// 播放
const play = () => {
  if (!videoRef.value) return
  videoRef.value.play()
}

// 暂停
const pause = () => {
  if (!videoRef.value) return
  videoRef.value.pause()
}

// 切换播放/暂停
const togglePlay = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

// 跳转播放进度
const seekTo = (e: MouseEvent) => {
  if (!videoRef.value || !duration.value) return
  const progressEl = e.currentTarget as HTMLElement
  const rect = progressEl.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  const time = percent * duration.value
  videoRef.value.currentTime = time
}

// 跳转到指定时间
const seekToTime = (time: number) => {
  if (!videoRef.value) return
  videoRef.value.currentTime = time
}

// 设置视频音量
const applyVolume = () => {
  if (!videoRef.value) return
  const v = volume.value > 0 ? volume.value : 0
  videoRef.value.volume = v
  videoRef.value.muted = isMuted.value
}

// 切换静音
const toggleMute = () => {
  isMuted.value = !isMuted.value
  applyVolume()
}

// 点击音量轨道
const handleVolumeClick = (e: MouseEvent) => {
  const trackEl = e.currentTarget as HTMLElement
  const rect = trackEl.getBoundingClientRect()
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  volume.value = percent
  if (percent > 0) {
    isMuted.value = false
  }
  applyVolume()
}

// 拖动开始
const startVolumeDrag = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()

  const trackEl = e.currentTarget as HTMLElement
  volumeTrackRect = trackEl.getBoundingClientRect()

  // 立即计算并更新音量
  const percent = Math.max(0, Math.min(1, (e.clientX - volumeTrackRect.left) / volumeTrackRect.width))
  volume.value = percent
  if (percent > 0) {
    isMuted.value = false
  }
  applyVolume()

  isDragging.value = true
  document.addEventListener('mousemove', onVolumeDrag)
  document.addEventListener('mouseup', stopVolumeDrag)
}

// 拖动中
const onVolumeDrag = (e: MouseEvent) => {
  if (!isDragging.value || !volumeTrackRect) return

  const percent = Math.max(0, Math.min(1, (e.clientX - volumeTrackRect.left) / volumeTrackRect.width))
  volume.value = percent
  if (percent > 0) {
    isMuted.value = false
  }
  applyVolume()
}

// 拖动结束
const stopVolumeDrag = () => {
  isDragging.value = false
  volumeTrackRect = null
  document.removeEventListener('mousemove', onVolumeDrag)
  document.removeEventListener('mouseup', stopVolumeDrag)
}

// 音量区域鼠标进入
const handleVolumeEnter = () => {
  volumeHover.value = true
}

// 音量区域鼠标离开
const handleVolumeLeave = () => {
  volumeHover.value = false
}

// 切换播放速度菜单
const toggleSpeedMenu = () => {
  speedMenuVisible.value = !speedMenuVisible.value
}

// 设置播放速度
const setPlaybackRate = (rate: number) => {
  if (!videoRef.value) return
  playbackRate.value = rate
  videoRef.value.playbackRate = rate
  speedMenuVisible.value = false
}

// 切换全屏
const toggleFullscreen = () => {
  const container = videoRef.value?.parentElement?.closest('.xly-video')
  if (!container) return

  if (!document.fullscreenElement) {
    container.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 显示控制栏
const showControls = () => {
  controlsVisible.value = true
  clearHideControlsTimer()
  if (isPlaying.value) {
    startHideControlsTimer()
  }
}

// 隐藏控制栏
const hideControls = () => {
  if (isPlaying.value) {
    startHideControlsTimer()
  }
}

// 鼠标移动时显示控制栏
const handleMouseMove = () => {
  if (isPlaying.value) {
    showControls()
  }
}

// 点击处理
const handleClick = () => {
  if (props.showPoster && !hasPlayed.value) {
    play()
  } else {
    togglePlay()
  }
}

// 双击处理（仅在开启双击全屏时触发）
const handleDblclick = () => {
  if (props.dblclickFullscreen) {
    toggleFullscreen()
  }
}

// 开始隐藏控制栏计时器
const startHideControlsTimer = () => {
  clearHideControlsTimer()
  hideControlsTimer.value = setTimeout(() => {
    controlsVisible.value = false
  }, 3000)
}

// 清除隐藏控制栏计时器
const clearHideControlsTimer = () => {
  if (hideControlsTimer.value) {
    clearTimeout(hideControlsTimer.value)
  }
}

// 格式化时间
const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 切换弹幕显示
const toggleDanmaku = () => {
  danmakuVisible.value = !danmakuVisible.value
}

// 切换弹幕列表
const toggleDanmakuList = () => {
  danmakuListVisible.value = !danmakuListVisible.value
}

// 发送弹幕（按钮点击）
const handleSendDanmaku = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  if (isSending.value) return
  doSendDanmaku()
}

// 发送弹幕（键盘回车）
const sendDanmaku = (e?: Event) => {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  if (isSending.value) return
  doSendDanmaku()
}

// 实际发送逻辑
const doSendDanmaku = () => {
  if (!danmakuInputText.value.trim() || !videoRef.value) return
  if (isSending.value) return

  // 防止重复发送
  isSending.value = true

  const text = danmakuInputText.value.trim()
  const currentTime = videoRef.value.currentTime

  // 清空输入
  danmakuInputText.value = ''

  const newDanmaku: Danmaku = {
    id: Date.now(),
    text: text,
    time: currentTime,
    color: danmakuColor.value,
    mode: 'scroll',
  }

  // 使用 replace 添加到列表
  sentDanmaku.value = [...sentDanmaku.value, newDanmaku]
  emit('danmakuSend', newDanmaku)

  // 短暂延迟后重置发送状态
  setTimeout(() => {
    isSending.value = false
  }, 300)
}

// 弹幕动画循环 - 纯 JS 逐帧更新位置
const updateDanmaku = () => {
  // 如果弹幕功能未开启，清空弹幕并跳过
  if (!props.danmakuEnabled) {
    activeDanmaku.value = []
    danmakuTrackMap.clear()
    trackReleaseTime.clear()
    danmakuAnimationFrame.value = requestAnimationFrame(updateDanmaku)
    return
  }

  if (!danmakuContainerRef.value) {
    danmakuAnimationFrame.value = requestAnimationFrame(updateDanmaku)
    return
  }

  const containerWidth = danmakuContainerRef.value.offsetWidth
  const containerHeight = danmakuContainerRef.value.offsetHeight

  if (!containerWidth || !containerHeight) {
    danmakuAnimationFrame.value = requestAnimationFrame(updateDanmaku)
    return
  }

  // 合并所有弹幕
  const allDanmaku = [...(props.danmaku || []), ...sentDanmaku.value]

  // 过滤当前时间窗口内的弹幕
  const visibleDms = allDanmaku.filter((dm) => {
    if (!danmakuVisible.value) return false
    const elapsed = currentTime.value - dm.time
    return elapsed >= 0 && elapsed <= scrollDuration
  })

  // 轨道只分布在上半屏
  const trackHeight = containerHeight / 2 / danmakuTrackCount

  // 弹幕总移动距离 = 容器宽度 + 200px（预留左右缓冲区）
  const totalDistance = containerWidth + 200

  // 为每个弹幕分配固定轨道（使用id哈希），并检测冲突
  activeDanmaku.value = visibleDms.map((dm) => {
    const elapsed = currentTime.value - dm.time

    // 计算弹幕的"消失时间"（相对视频播放时间）
    const disappearTime = dm.time + scrollDuration

    // 如果弹幕已经有固定轨道，检查是否仍有效（未被新弹幕占用）
    let track = danmakuTrackMap.get(dm.id)

    if (track !== undefined) {
      // 检查当前轨道是否被其他弹幕占用
      const releaseTime = trackReleaseTime.get(track) || 0
      if (disappearTime <= releaseTime) {
        // 轨道被占用，需要找新轨道
        track = undefined
      }
    }

    // 如果没有固定轨道，分配一个新轨道
    if (track === undefined) {
      // 从哈希轨道开始，找最近的可用轨道
      const baseTrack = Math.abs(dm.id) % danmakuTrackCount

      for (let i = 0; i < danmakuTrackCount; i++) {
        const candidateTrack = (baseTrack + i) % danmakuTrackCount
        const releaseTime = trackReleaseTime.get(candidateTrack) || 0

        // 如果这个轨道已经释放，可以使用
        if (disappearTime <= releaseTime || currentTime.value >= releaseTime) {
          track = candidateTrack
          break
        }
      }

      // 如果所有轨道都被占用，使用哈希轨道（兜底）
      if (track === undefined) {
        track = baseTrack
      }
    }

    // 更新轨道记录
    danmakuTrackMap.set(dm.id, track)
    trackReleaseTime.set(track, disappearTime)

    // 计算当前位置：弹幕从右侧（containerWidth + 100）移动到左侧（-100px）
    // progress: 0 = 开始, 1 = 结束
    const progress = elapsed / scrollDuration
    const startX = containerWidth + 100
    const endX = -100
    const currentX = startX + (endX - startX) * progress

    const top = track * trackHeight + 16

    return {
      ...dm,
      offset: track,
      style: {
        left: `${currentX}px`,
        top: `${top}px`,
        color: dm.color,
      },
    }
  })

  // 清理已过期弹幕的轨道记录
  const currentIds = new Set(allDanmaku.map((dm) => dm.id))
  for (const id of danmakuTrackMap.keys()) {
    if (!currentIds.has(id)) {
      danmakuTrackMap.delete(id)
    }
  }

  danmakuAnimationFrame.value = requestAnimationFrame(updateDanmaku)
}

// ============ Event Handlers ============

const handlePlay = (e: Event) => {
  isPlaying.value = true
  hasPlayed.value = true
  emit('play', e)
}

const handlePause = (e: Event) => {
  isPlaying.value = false
  controlsVisible.value = true
  emit('pause', e)
}

const handleEnded = (e: Event) => {
  isPlaying.value = false
  controlsVisible.value = true
  emit('ended', e)
}

const handleTimeUpdate = () => {
  if (!videoRef.value) return
  currentTime.value = videoRef.value.currentTime
  emit('timeupdate', currentTime.value)

  // 更新缓冲进度
  if (videoRef.value.buffered.length > 0) {
    buffered.value = videoRef.value.buffered.end(videoRef.value.buffered.length - 1)
  }
}

const handleLoadedMetadata = () => {
  if (!videoRef.value) return
  duration.value = videoRef.value.duration
  isLoading.value = false

  // 捕获第一帧作为封面
  if (props.showPoster && !props.poster && !isFirstFrameCaptured.value) {
    captureFirstFrame()
  }
}

const handleWaiting = () => {
  isLoading.value = true
}

const handleCanPlay = () => {
  isLoading.value = false
}

const handleError = (e: Event) => {
  isLoading.value = false
  emit('error', e as ErrorEvent)
}

const handleVolumeChange = () => {
  // 不再通过 volumechange 更新 UI，完全由我们自己控制
  emit('volumechange', volume.value)
}

// ============ Fullscreen Change ============
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// ============ Keyboard Controls ============
const handleKeydown = (e: KeyboardEvent) => {
  if (!videoRef.value) return
  // 忽略当焦点在输入框等元素上时
  if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return

  switch (e.key) {
    case ' ':
    case 'k':
      e.preventDefault()
      togglePlay()
      break
    case 'f':
      e.preventDefault()
      toggleFullscreen()
      break
    case 'm':
      e.preventDefault()
      toggleMute()
      break
    case 'c':
      e.preventDefault()
      toggleDanmaku()
      break
    case 'ArrowLeft':
      e.preventDefault()
      videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 5)
      break
    case 'ArrowRight':
      e.preventDefault()
      videoRef.value.currentTime = Math.min(duration.value, videoRef.value.currentTime + 5)
      break
    case 'ArrowUp':
      e.preventDefault()
      volume.value = Math.min(1, volume.value + 0.1)
      if (volume.value > 0) {
        isMuted.value = false
      }
      applyVolume()
      break
    case 'ArrowDown':
      e.preventDefault()
      volume.value = Math.max(0, volume.value - 0.1)
      if (volume.value > 0) {
        isMuted.value = false
      }
      applyVolume()
      break
  }
}

// ============ Lifecycle ============
onMounted(() => {
  // 初始化音量
  volume.value = props.initialVolume || 0.5
  isMuted.value = props.muted
  applyVolume()

  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('keydown', handleKeydown)
  danmakuAnimationFrame.value = requestAnimationFrame(updateDanmaku)
})

onUnmounted(() => {
  clearHideControlsTimer()
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('keydown', handleKeydown)
  if (danmakuAnimationFrame.value) {
    cancelAnimationFrame(danmakuAnimationFrame.value)
  }
})

// 监听 props 变化
watch(
  () => props.initialVolume,
  (val) => {
    volume.value = val
    if (videoRef.value) {
      videoRef.value.volume = val
    }
  },
)

watch(
  () => props.muted,
  (val) => {
    isMuted.value = val
    applyVolume()
  },
)

// 监听弹幕数据变化
watch(
  () => props.danmaku,
  () => {
    // 重置轨道
    danmakuTracks.value = new Array(danmakuTrackCount).fill(0)
  },
)
</script>

<style scoped lang="scss">
/* ========== 设计令牌 ========== */
$color-primary: #00a1d6;
$color-primary-light: #00c8ff;
$color-primary-dark: #007bb0;
$color-white: #ffffff;
$color-black: #000000;
$color-bg-dark: rgba(0, 0, 0, 0.7);
$color-bg-darker: rgba(0, 0, 0, 0.85);
$color-bg-glass: rgba(20, 20, 30, 0.85);
$color-bg-panel: rgba(0, 0, 0, 0.9);
$color-text-light: #ffffff;
$color-text-muted: rgba(255, 255, 255, 0.8);
$color-text-dim: rgba(255, 255, 255, 0.5);
$radius-base: 6px;
$radius-sm: 4px;
$radius-lg: 8px;
$transition-fast: 0.15s;
$transition-normal: 0.25s;

/* ========== 外包装 ========== */
.xly-video-wrapper {
  width: 100%;
}

/* ========== 视频容器 ========== */
.xly-video {
  position: relative;
  width: 100%;
  background: $color-black;
  border-radius: $radius-base;
  overflow: hidden;
  user-select: none;

  &.is-fullscreen {
    border-radius: 0;
  }

  &:hover {
    .xly-video__controls {
      opacity: 1;
    }
  }

  /* 封面图 */
  &__poster {
    position: absolute;
    inset: 0;
    z-index: 2;
    cursor: pointer;

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);

      .xly-icon {
        color: rgba($color-white, 0.3);
      }
    }
  }

  &__play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color-primary, 0.9);
    border-radius: 50%;
    color: $color-white;
    transition: all $transition-normal;
    box-shadow:
      0 4px 16px rgba($color-primary, 0.4),
      0 8px 32px rgba(0, 0, 0, 0.3);

    svg {
      margin-left: 3px; // 视觉居中
    }

    &:hover {
      transform: translate(-50%, -50%) scale(1.08);
      background: $color-primary;
      box-shadow:
        0 6px 20px rgba($color-primary, 0.5),
        0 12px 40px rgba(0, 0, 0, 0.35);
    }
  }

  /* 视频播放器 */
  &__player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: $color-black;
    z-index: 0;
  }

  /* 加载中 */
  &__loading {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
  }

  &__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba($color-white, 0.2);
    border-top-color: $color-white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 大播放按钮 */
  &__big-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color-primary, 0.9);
    border-radius: 50%;
    color: $color-white;
    cursor: pointer;
    transition: all $transition-normal;
    box-shadow:
      0 4px 16px rgba($color-primary, 0.4),
      0 8px 32px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: translate(-50%, -50%) scale(1.08);
      background: $color-primary;
      box-shadow:
        0 6px 20px rgba($color-primary, 0.5),
        0 12px 40px rgba(0, 0, 0, 0.35);
    }

    svg {
      margin-left: 3px; // 视觉居中
    }
  }

  /* ========== 弹幕层 ========== */
  &__danmaku-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  &__danmaku-item {
    position: absolute;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    text-shadow:
      1px 1px 2px rgba(0, 0, 0, 0.8),
      -1px -1px 2px rgba(0, 0, 0, 0.8);
    will-change: left, transform;
    transform: translateZ(0);

    /* 顶部弹幕 */
    &.top {
      left: 50%;
      transform: translateX(-50%);
      top: 10%;
    }

    /* 底部弹幕 */
    &.bottom {
      left: 50%;
      transform: translateX(-50%);
      top: 90%;
    }
  }

  &__danmaku-text {
    display: block;
  }

  /* ========== 控制栏 ========== */
  &__controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 24px 20px 14px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity $transition-normal;

    &.is-show {
      opacity: 1;
    }
  }

  &__controls-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__controls-left,
  &__controls-right {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 10px;
    color: $color-text-light;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      background: rgba($color-white, 0.15);
    }

    &.is-active {
      color: $color-primary;
      background: rgba($color-primary, 0.2);
    }

    .xly-video__btn-text {
      font-size: 13px;
      font-weight: 500;
    }
  }

  /* 无圆圈播放按钮 */
  &__btn-play {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: $color-text-light;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      color: $color-primary;
    }
  }

  /* 清晰度按钮 */
  &__quality {
    font-size: 12px;
    color: $color-text-muted;
  }

  &__time {
    color: $color-text-light;
    font-size: 13px;
    margin-left: 12px;
    font-variant-numeric: tabular-nums;
    font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
  }

  /* 进度条 */
  &__progress-wrap {
    padding: 10px 0;
    cursor: pointer;
  }

  &__progress {
    position: relative;
    height: 4px;
    background: rgba($color-white, 0.2);
    border-radius: 2px;
    transition: height $transition-fast;

    &:hover {
      height: 5px;

      .xly-video__progress-thumb {
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
    }
  }

  &__progress-buffered {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba($color-white, 0.3);
    border-radius: 2px;
  }

  &__progress-played {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: $color-primary;
    border-radius: 2px;
  }

  &__progress-thumb {
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%) scale(0);
    width: 12px;
    height: 12px;
    background: $color-white;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all $transition-fast;
  }

  &__progress-danmaku {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    background: $color-primary;
    border-radius: 50%;
    opacity: 0.7;
    cursor: pointer;

    &:hover {
      transform: translateY(-50%) scale(1.5);
      opacity: 1;
    }
  }

  /* 播放速度 */
  &__speed {
    position: relative;
    cursor: pointer;

    &-text {
      color: $color-text-light;
      font-size: 13px;
      padding: 8px 12px;
      display: block;
      border-radius: $radius-sm;
      transition: all $transition-fast;
      font-weight: 500;

      &:hover {
        background: rgba($color-white, 0.15);
      }
    }

    &-menu {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 10px;
      background: $color-bg-glass;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba($color-white, 0.1);
      border-radius: $radius-lg;
      padding: 6px 0;
      min-width: 80px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      animation: menuSlideIn 0.2s ease;
    }

    @keyframes menuSlideIn {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &-item {
      color: $color-text-muted;
      font-size: 13px;
      padding: 8px 16px;
      text-align: center;
      transition: all $transition-fast;

      &:hover {
        color: $color-white;
        background: rgba($color-white, 0.1);
      }

      &.is-active {
        color: $color-primary;
        background: rgba($color-primary, 0.15);
        font-weight: 600;
      }
    }
  }

  /* 音量 */
  &__volume {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 15;

    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: $color-text-light;
      cursor: pointer;
      border-radius: $radius-sm;
      transition: all $transition-fast;

      &:hover {
        color: $color-primary;
        background: rgba($color-white, 0.1);
      }
    }

    &-slider {
      width: 80px;
      height: 24px;
      display: flex;
      align-items: center;
    }

    &-track {
      position: relative;
      width: 100%;
      height: 4px;
      background: rgba($color-white, 0.2);
      border-radius: 2px;
      cursor: pointer;
      transition: height $transition-fast;

      &:hover {
        height: 6px;

        .xly-video__volume-handle {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }

    &-progress {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 100%;
      background: $color-primary;
      border-radius: 2px;
      transition: width 0.05s;
    }

    &-handle {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%) scale(0);
      width: 14px;
      height: 14px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      cursor: grab;
      opacity: 0;
      transition: all $transition-fast;

      &:active {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(1.1);
      }
    }

    &-value {
      min-width: 36px;
      font-size: 12px;
      color: $color-text-light;
      font-variant-numeric: tabular-nums;
      text-align: right;
      transition: color $transition-fast;

      &.is-muted {
        color: $color-text-dim;
      }
    }
  }

  /* ========== 弹幕列表面板 ========== */
  &__danmaku-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    z-index: 20;
    background: $color-bg-panel;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      align-items: center;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 14px;
      font-weight: 600;
      color: $color-white;

      .xly-video__danmaku-panel-count {
        margin-left: auto;
        margin-right: 6px;
        font-size: 12px;
        color: $color-text-muted;
        font-weight: 400;
      }
    }

    &-list {
      flex: 1;
      overflow-y: auto;
      padding: 6px 0;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 3px;
      }
    }

    &-item {
      display: flex;
      align-items: flex-start;
      padding: 8px 16px;
      cursor: pointer;
      transition: background $transition-fast;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    &-time {
      flex-shrink: 0;
      font-size: 12px;
      color: $color-text-muted;
      font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
      margin-right: 10px;
    }

    &-text {
      font-size: 13px;
      line-height: 1.5;
      word-break: break-all;
    }
  }
}

/* 弹幕列表面板动画 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* ========== 弹幕工具栏（播放器下方）- 完全按B站图片 ========== */
.xly-video__danmaku-bar {
  background: #fff;
  border-radius: 0 0 8px 8px;
  border: 1px solid #e3e5e7;
  border-top: none;
}

.xly-video__danmaku-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 16px;
}

/* 左侧 */
.xly-video__danmaku-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.xly-video__danmaku-info {
  font-size: 12px;
  color: #61666d;
}

.xly-video__danmaku-count {
  cursor: pointer;
  border-bottom: 1px solid #9499a0;
  padding-bottom: 1px;
  transition: all 0.2s;

  &:hover {
    color: #00a1d6;
    border-bottom-color: #00a1d6;
  }
}

.xly-video__danmaku-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #9499a0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #00a1d6;
  }
}

/* 中间：输入框 */
.xly-video__danmaku-input-area {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f1f2f3;
  border-radius: 4px;
  padding: 0 12px;
  height: 36px;
  transition: all 0.2s;

  &:focus-within {
    background: #fff;
    box-shadow: 0 0 0 2px #00a1d6;
  }
}

.xly-video__danmaku-input-a {
  font-size: 14px;
  color: #9499a0;
  margin-right: 8px;
  font-family: Arial, sans-serif;
}

.xly-video__danmaku-input {
  flex: 1;
  border: none;
  background: transparent;
  color: #18191c;
  font-size: 14px;
  outline: none;
  min-width: 0;

  &::placeholder {
    color: #9499a0;
  }
}

/* 右侧 */
.xly-video__danmaku-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.xly-video__danmaku-tip {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  color: #9499a0;
  text-decoration: none;

  &:hover {
    color: #00a1d6;
  }
}

.xly-video__danmaku-send {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 32px;
  background: #00a1d6;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #00b5e5;
  }

  &:disabled {
    background: #e3e5e7;
    color: #9499a0;
    cursor: not-allowed;
  }
}

/* 颜色选择器 */
.xly-video__danmaku-color-picker {
  position: relative;
}

.xly-video__danmaku-color-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}

.xly-video__danmaku-color-current {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.xly-video__danmaku-color-panel {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  z-index: 100;
}

.xly-video__danmaku-color-item {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.1);
  }

  &.is-active {
    border-color: #00a1d6;
    box-shadow: 0 0 0 2px rgba(0, 161, 214, 0.3);
  }
}

/* 颜色选择面板淡入动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
