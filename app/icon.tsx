import { ImageResponse } from 'next/og'

// The favicon is the family's selection motif with pixelactions' own mark:
// the committed-green click point centered in the dashed preview-blue
// region. Geometry, not text — legible at 16px, and distinct from the
// pixelcoords tab. Emitted as a static PNG at build time.
export const dynamic = 'force-static'
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

const HANDLE = 10

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

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#0a0a0a',
        padding: 10,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          border: '3px dashed #00a0ff',
        }}
      >
        <Handle position={{ top: -5, left: -5 }} />
        <Handle position={{ top: -5, right: -5 }} />
        <Handle position={{ bottom: -5, left: -5 }} />
        <Handle position={{ bottom: -5, right: -5 }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 14,
            height: 14,
            marginTop: -7,
            marginLeft: -7,
            borderRadius: 7,
            background: '#00ff66',
          }}
        />
      </div>
    </div>,
    { ...size },
  )
}
