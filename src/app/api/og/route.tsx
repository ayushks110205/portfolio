import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width:      '1200px',
          height:     '630px',
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020408 0%, #0a1628 50%, #040810 100%)',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset:    0,
            backgroundImage:
              'linear-gradient(rgba(0,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '-80px', left: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,255,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '-60px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        }} />

        {/* Badge row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['CS Student', 'Web Developer', 'ML Enthusiast'].map((tag, i) => (
            <div key={tag} style={{
              padding:      '6px 16px',
              borderRadius: '99px',
              border:       `1px solid ${i === 0 ? 'rgba(0,255,255,0.4)' : i === 1 ? 'rgba(167,139,250,0.4)' : 'rgba(0,255,136,0.4)'}`,
              color:        i === 0 ? '#00FFFF' : i === 1 ? '#A78BFA' : '#00FF88',
              fontSize:     '14px',
              fontFamily:   'monospace',
              letterSpacing: '0.15em',
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Name */}
        <div style={{
          fontSize:   '72px',
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.02em',
          textAlign:  'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #00FFFF 40%, #7C3AED 70%, #FF00FF 100%)',
          backgroundClip: 'text',
          color:      'transparent',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          AYUSH KUMAR SINGH
        </div>

        {/* Tagline */}
        <div style={{
          fontSize:   '20px',
          color:      '#94a3b8',
          fontFamily: 'sans-serif',
          textAlign:  'center',
          maxWidth:   '600px',
          lineHeight: 1.5,
          marginBottom: '32px',
        }}>
          Exploring the universe of{' '}
          <span style={{ color: '#00FFFF' }}>intelligent systems</span>
          {' '}and{' '}
          <span style={{ color: '#A78BFA' }}>interactive algorithms</span>
        </div>

        {/* Branding pill */}
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '10px',
          padding:      '10px 24px',
          borderRadius: '99px',
          border:       '1px solid rgba(0,255,255,0.25)',
          background:   'rgba(0,255,255,0.06)',
        }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #00FFFF, #7C3AED)',
          }} />
          <span style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '16px', letterSpacing: '0.2em' }}>
            AKS<span style={{ color: '#00FFFF' }}>.</span>lab — GALACTIC AI PORTFOLIO
          </span>
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
    }
  )
}
