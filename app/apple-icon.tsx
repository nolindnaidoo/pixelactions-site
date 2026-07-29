import { ImageResponse } from 'next/og'

// Same click-point-in-selection motif as icon.tsx at Apple's touch-icon
// size — the green dot is pixelactions' mark inside the family frame.
export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const HANDLE = 22

function Handle({ position }: { readonly position: Record<string, number> }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: HANDLE,
        height: HANDLE,
        background: '#00a0ff',
        ...position,
      }}
    />
  )
}

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#0a0a0a',
        padding: 30,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          border: '6px dashed #00a0ff',
        }}
      >
        <Handle position={{ top: -11, left: -11 }} />
        <Handle position={{ top: -11, right: -11 }} />
        <Handle position={{ bottom: -11, left: -11 }} />
        <Handle position={{ bottom: -11, right: -11 }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 36,
            height: 36,
            marginTop: -18,
            marginLeft: -18,
            borderRadius: 18,
            background: '#00ff66',
          }}
        />
      </div>
    </div>,
    { ...size },
  )
}
