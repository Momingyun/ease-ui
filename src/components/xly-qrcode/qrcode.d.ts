// qrcode 库类型声明
declare module 'qrcode' {
  interface QRCodeOptions {
    width?: number
    height?: number
    margin?: number
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    color?: {
      dark?: string
      light?: string
    }
    type?: 'image/png' | 'image/jpeg' | 'image/webp'
    rendererOpts?: {
      quality?: number
    }
  }

  function toCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    opts?: QRCodeOptions,
  ): Promise<void>

  function toDataURL(text: string, opts?: QRCodeOptions): Promise<string>

  function toString(text: string, opts?: QRCodeOptions): Promise<string>

  export default { toCanvas, toDataURL, toString }
}
