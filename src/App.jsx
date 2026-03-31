import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg:      '#07050d',
  gold:    '#c4a24a',
  goldDim: 'rgba(196,162,74,0.08)',
  goldBd:  'rgba(196,162,74,0.2)',
  text:    'rgba(223,214,178,0.72)',
  textMut: 'rgba(223,214,178,0.32)',
};

const STAGES = [
  {
    id:'welcome', label:'The Vestibule', sub:'Stand at the threshold',
    hz:null, carrier:null, shape:'metatron',
    whispers:['You stand before the Gateway.','Put on headphones.','Find complete stillness.','When you are ready — begin.'],
    info:'Headphones are required. Binaural beats work only when each ear receives a separate tone.',
  },
  {
    id:'tuning', label:'Resonant Tuning', sub:'Attune the vessel',
    hz:10, carrier:200, shape:'sine',
    whispers:['Seal every thought in a box.','Lock it. They will wait.','Now hum with the tone.','Feel it in your sternum.','In your skull.','The body becomes a single vibration.'],
    info:'Place all distractions in an imagined sealed container. Hum aloud with the binaural tone to begin physical resonance.',
  },
  {
    id:'focus3', label:'Focus 3', sub:'Hemi-Sync initiated',
    hz:10, carrier:200, shape:'circles',
    whispers:['Each ear receives a different tone.','Your brain hears only the difference.','It begins to follow.','The left hemisphere grows quiet.','The right opens.','You are becoming a laser.'],
    info:'The Frequency Following Response: your brainwaves entrain to the beat frequency between the two tones. Left-brain analysis recedes.',
  },
  {
    id:'focus10', label:'Focus 10', sub:'Body asleep · mind awake',
    hz:7, carrier:200, shape:'rings',
    whispers:['The body enters sleep.','The mind remains.','Your heartbeat slows.','You vibrate at 7 Hz.','The same frequency as the Earth.','Build the balloon of light.','Crown to feet. Feet to crown.'],
    info:'Visualize light flowing from your crown down all sides to your feet, then rising back through the interior — a protective egg of energy.',
  },
  {
    id:'focus12', label:'Focus 12', sub:'Expanded awareness',
    hz:5, carrier:200, shape:'torus',
    whispers:['You have entered expanded awareness.','The Torus surrounds you.','All of time encoded in a single field.','Symbols may arise.','Do not grasp them.','Simply receive.'],
    info:'The universal hologram — the Torus — contains all events across time. Impressions arise in the right hemisphere. Observe without analysis.',
  },
  {
    id:'focus15', label:'Focus 15', sub:'No time',
    hz:3, carrier:200, shape:'merkaba',
    whispers:['Time is only a measure of change.','Here, change slows.','A great wheel appears in space.','Each spoke is a moment.','Turn it gently.','The past opens.'],
    info:'Fewer than 5% of practitioners reach this state in a session. Visualize a vast cosmic wheel. Each spoke gives access to a different moment.',
  },
  {
    id:'focus21', label:'Focus 21', sub:'The threshold of the Absolute',
    hz:1.5, carrier:200, shape:'void',
    whispers:['Beyond time-space.','Causality falters here.','Past, present, future coexist.','The Absolute cannot be seen.','Only approached.','You are an eternal spark.','Remain as long as you are able.'],
    info:'The outermost boundary McDonnell described. The Absolute — energy in perfect rest — cannot be perceived directly. Stand at its edge.',
  },
  {
    id:'return', label:'The Return', sub:'Re-enter',
    hz:10, carrier:200, shape:'metatron',
    whispers:['Feel the weight of your hands.','The surface beneath you.','The breath returning.','Open the box.','Observe from a distance.','The part still encodes the whole.'],
    info:'Allow full waking awareness to return gradually. The insights gathered in expanded states often clarify over the following 2–3 days.',
  },
];

// ── Geometry ──────────────────────────────────────────────────────

function MetatronSVG({ size=240 }) {
  const cx=size/2, cy=size/2, R=size*0.38, cr=size*0.11;
  const inner=Array.from({length:6},(_,i)=>({x:cx+R*0.45*Math.cos(i*Math.PI/3),y:cy+R*0.45*Math.sin(i*Math.PI/3)}));
  const outer=Array.from({length:6},(_,i)=>({x:cx+R*0.9*Math.cos(i*Math.PI/3+Math.PI/6),y:cy+R*0.9*Math.sin(i*Math.PI/3+Math.PI/6)}));
  const all=[{x:cx,y:cy},...inner,...outer];
  const lines=[];
  for(let i=0;i<all.length;i++) for(let j=i+1;j<all.length;j++) lines.push([all[i],all[j]]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{transformOrigin:`${cx}px ${cy}px`,animation:'spinSlow 80s linear infinite'}}>
        {lines.map(([a,b],i)=><line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.gold} strokeWidth="0.4" opacity="0.14"/>)}
        {all.map((c,i)=><circle key={i} cx={c.x} cy={c.y} r={cr} fill="none" stroke={C.gold} strokeWidth={i===0?0.85:0.45} opacity={i===0?0.5:0.25}/>)}
        <circle cx={cx} cy={cy} r={3} fill={C.gold} opacity="0.9"/>
      </g>
    </svg>
  );
}

function SineSVG({ size=240 }) {
  const w=size,h=size,amp=size*0.13,y0=h/2;
  const path=(freq,shift=0)=>Array.from({length:101},(_,i)=>{
    const x=i*w/100,y=y0+amp*Math.sin(freq*Math.PI*2*i/100+shift);
    return `${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <line x1={0} y1={y0} x2={w} y2={y0} stroke={C.gold} strokeWidth="0.3" opacity="0.1"/>
      <path d={path(2)} fill="none" stroke={C.gold} strokeWidth="1.3" opacity="0.7" style={{animation:'breatheOp 3s ease-in-out infinite'}}/>
      <path d={path(4,0.5)} fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.25" style={{animation:'breatheOp 2s ease-in-out 0.5s infinite'}}/>
      <circle cx={w/2} cy={y0} r={3} fill={C.gold} opacity="0.8"/>
    </svg>
  );
}

function FlowerSVG({ size=240 }) {
  const cx=size/2,cy=size/2,cr=size*0.185;
  const centers=[{x:cx,y:cy},...Array.from({length:6},(_,i)=>({x:cx+cr*Math.cos(i*Math.PI/3),y:cy+cr*Math.sin(i*Math.PI/3)}))];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{transformOrigin:`${cx}px ${cy}px`,animation:'breatheSc 7s ease-in-out infinite'}}>
        {centers.map((c,i)=><circle key={i} cx={c.x} cy={c.y} r={cr} fill={i===0?C.goldDim:'none'} stroke={C.gold} strokeWidth="0.55" opacity={i===0?0.45:0.28}/>)}
        <circle cx={cx} cy={cy} r={cr*2} fill="none" stroke={C.gold} strokeWidth="0.3" opacity="0.1" strokeDasharray="3 7"/>
        <circle cx={cx} cy={cy} r={3} fill={C.gold} opacity="0.85"/>
      </g>
    </svg>
  );
}

function RingsSVG({ size=240 }) {
  const cx=size/2,cy=size/2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={4} fill={C.gold} opacity="0.9"/>
      {[0.12,0.24,0.36,0.47,0.56].map((r,i)=>(
        <circle key={i} cx={cx} cy={cy} r={r*size} fill="none" stroke={C.gold} strokeWidth="0.5"
          style={{transformOrigin:`${cx}px ${cy}px`,animation:`ripple 7s ease-out ${i*1.3}s infinite`}} opacity="0.4"/>
      ))}
    </svg>
  );
}

function TorusSVG({ size=240 }) {
  const cx=size/2,cy=size/2;
  const ellipses=Array.from({length:13},(_,i)=>{
    const t=(i/12)*Math.PI*2;
    return {rx:size*0.3+size*0.11*Math.cos(t),ry:size*0.09+size*0.035*Math.abs(Math.cos(t)),y:cy+size*0.22*Math.sin(t),op:0.1+0.26*Math.abs(Math.cos(t))};
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{transformOrigin:`${cx}px ${cy}px`,animation:'spinSlow 28s linear infinite'}}>
        {ellipses.map((e,i)=><ellipse key={i} cx={cx} cy={e.y} rx={e.rx} ry={e.ry} fill="none" stroke={C.gold} strokeWidth="0.55" opacity={e.op}/>)}
        <ellipse cx={cx} cy={cy} rx={size*0.3} ry={size*0.09} fill="none" stroke={C.gold} strokeWidth="0.85" opacity="0.4"/>
        <circle cx={cx} cy={cy} r={3} fill={C.gold} opacity="0.9"/>
      </g>
    </svg>
  );
}

function MerkabaSVG({ size=240 }) {
  const cx=size/2,cy=size/2,R=size*0.38;
  const tri=off=>Array.from({length:3},(_,i)=>`${cx+R*Math.cos(off+i*2*Math.PI/3)},${cy+R*Math.sin(off+i*2*Math.PI/3)}`).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{transformOrigin:`${cx}px ${cy}px`,animation:'spinSlow 55s linear infinite'}}>
        <polygon points={tri(-Math.PI/2)} fill="none" stroke={C.gold} strokeWidth="0.7" opacity="0.48"/>
        <polygon points={tri(Math.PI/2)} fill="none" stroke={C.gold} strokeWidth="0.7" opacity="0.48"/>
        {Array.from({length:6},(_,i)=>{
          const a=i*Math.PI/3,a2=(i+1)*Math.PI/3,r=R*0.55;
          return <line key={i} x1={cx+r*Math.cos(a)} y1={cy+r*Math.sin(a)} x2={cx+r*Math.cos(a2)} y2={cy+r*Math.sin(a2)} stroke={C.gold} strokeWidth="0.3" opacity="0.2"/>;
        })}
        <circle cx={cx} cy={cy} r={R*0.56} fill="none" stroke={C.gold} strokeWidth="0.3" opacity="0.12" strokeDasharray="2 7"/>
        <circle cx={cx} cy={cy} r={4} fill={C.gold} opacity="0.9"/>
      </g>
    </svg>
  );
}

function VoidSVG({ size=240 }) {
  const cx=size/2,cy=size/2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.54,0.38,0.24,0.12].map((r,i)=>(
        <circle key={i} cx={cx} cy={cy} r={r*size} fill="none" stroke={C.gold} strokeWidth="0.4"
          style={{animation:`voidPulse ${6+i*3}s ease-in-out ${i*1.1}s infinite`}} opacity="0.09"/>
      ))}
      <circle cx={cx} cy={cy} r={size*0.07} fill={C.goldDim} stroke={C.gold} strokeWidth="0.5"
        style={{animation:'voidPulse 4s ease-in-out infinite'}} opacity="0.3"/>
      <circle cx={cx} cy={cy} r={3.5} fill={C.gold} style={{animation:'voidPulse 4s ease-in-out infinite'}} opacity="0.95"/>
    </svg>
  );
}

const ShapeMap={metatron:MetatronSVG,sine:SineSVG,circles:FlowerSVG,rings:RingsSVG,torus:TorusSVG,merkaba:MerkabaSVG,void:VoidSVG};

// ── Whisper — one line drifts in, holds, then the next ────────────
function Whisper({ lines }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => { setIdx(0); setFade(true); }, [lines]);

  useEffect(() => {
    if (idx >= lines.length - 1) return;
    const hold = setTimeout(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => i + 1); setFade(true); }, 700);
    }, 5200);
    return () => clearTimeout(hold);
  }, [idx, lines]);

  return (
    <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{
        margin:0, fontSize:15, lineHeight:1.7,
        fontFamily:"'Georgia','Times New Roman',serif",
        fontStyle:'italic', letterSpacing:0.8,
        color: C.text, textAlign:'center', maxWidth:320,
        transition:'opacity 0.7s ease, transform 0.7s ease',
        opacity: fade ? 1 : 0,
        transform: fade ? 'translateY(0)' : 'translateY(-6px)',
      }}>
        {lines[idx]}
      </p>
    </div>
  );
}

// ── Breath orb ────────────────────────────────────────────────────
function BreathOrb({ hz }) {
  const dur = hz ? Math.max(4, 12 - hz) : 8;
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" style={{display:'block',margin:'0 auto'}}>
      <circle cx="35" cy="35" r="25" fill="none" stroke={C.gold} strokeWidth="0.3" opacity="0.1"/>
      <circle cx="35" cy="35" r="16" fill={C.goldDim} stroke={C.gold} strokeWidth="0.55"
        style={{transformOrigin:'35px 35px',animation:`breathOrb ${dur}s ease-in-out infinite`}} opacity="0.5"/>
      <circle cx="35" cy="35" r="3" fill={C.gold} opacity="0.85"/>
    </svg>
  );
}

// ── Dots nav ──────────────────────────────────────────────────────
function Dots({ current, total, onJump }) {
  return (
    <div style={{display:'flex',gap:7,justifyContent:'center',alignItems:'center'}}>
      {Array.from({length:total},(_,i)=>(
        <div key={i} onClick={()=>onJump(i)} style={{
          width:i===current?16:5, height:5, borderRadius:3, cursor:'pointer',
          transition:'all 0.45s ease',
          background:i===current?C.gold:i<current?'rgba(196,162,74,0.28)':'rgba(196,162,74,0.1)',
        }}/>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────
export default function GatewayApp() {
  const [si, setSi] = useState(0);
  const [key, setKey] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [vol, setVol] = useState(0.18);
  const [elapsed, setElapsed] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const ctxRef   = useRef(null);
  const oscsRef  = useRef([]);
  const gainsRef = useRef([]);
  const timerRef = useRef(null);
  const volRef   = useRef(vol);
  volRef.current = vol;

  const stage = STAGES[si];
  const Shape = ShapeMap[stage.shape] || MetatronSVG;

  useEffect(() => {
    setElapsed(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed(e => e+1), 1000);
    return () => clearInterval(timerRef.current);
  }, [si]);

  const stopAudio = useCallback(() => {
    oscsRef.current.forEach(o => { try { o.stop(); } catch(e) {} });
    oscsRef.current=[]; gainsRef.current=[]; setAudioOn(false);
  }, []);

  const startAudio = useCallback(async (stg) => {
    if (!stg.hz || !stg.carrier) return;
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = ctxRef.current;
    if (ctx.state==='suspended') await ctx.resume();
    oscsRef.current.forEach(o => { try { o.stop(); } catch(e) {} });
    oscsRef.current=[];
    const merger=ctx.createChannelMerger(2); merger.connect(ctx.destination);
    const lg=ctx.createGain(); lg.gain.value=volRef.current;
    const rg=ctx.createGain(); rg.gain.value=volRef.current;
    lg.connect(merger,0,0); rg.connect(merger,0,1);
    gainsRef.current=[lg,rg];
    const lo=ctx.createOscillator(); lo.type='sine'; lo.frequency.value=stg.carrier; lo.connect(lg); lo.start();
    const ro=ctx.createOscillator(); ro.type='sine'; ro.frequency.value=stg.carrier+stg.hz; ro.connect(rg); ro.start();
    oscsRef.current=[lo,ro]; setAudioOn(true);
  }, []);

  useEffect(() => {
    gainsRef.current.forEach(g => { if(g) g.gain.setTargetAtTime(vol, ctxRef.current?.currentTime||0, 0.1); });
  }, [vol]);

  useEffect(() => () => stopAudio(), [stopAudio]);

  const navigate = n => { stopAudio(); setSi(n); setKey(k=>k+1); setShowInfo(false); };
  const toggleAudio = () => { if(audioOn) stopAudio(); else startAudio(stage); };
  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div style={{background:C.bg, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem'}}>
      <style>{`
        @keyframes spinSlow  { to { transform:rotate(360deg); } }
        @keyframes breatheSc { 0%,100%{transform:scale(0.96);opacity:0.8} 50%{transform:scale(1.04);opacity:1} }
        @keyframes breatheOp { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes breathOrb { 0%,100%{transform:scale(0.62);opacity:0.3} 40%,60%{transform:scale(1.22);opacity:0.78} }
        @keyframes ripple    { 0%{transform:scale(0.18);opacity:0.55} 100%{transform:scale(1);opacity:0} }
        @keyframes voidPulse { 0%,100%{opacity:0.05} 50%{opacity:0.16} }
        @keyframes fadeIn    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowBtn   { 0%,100%{box-shadow:0 0 0 rgba(196,162,74,0)} 50%{box-shadow:0 0 12px rgba(196,162,74,0.15)} }
        .btn {
          background:none; border:1px solid ${C.goldBd}; color:${C.gold};
          padding:8px 20px; cursor:pointer;
          font-family:'Georgia','Times New Roman',serif;
          font-size:10px; letter-spacing:3px; text-transform:uppercase;
          transition:background 0.3s, border-color 0.3s;
        }
        .btn:hover:not(:disabled){ background:${C.goldDim}; border-color:${C.gold}; }
        .btn:disabled{ opacity:0.12; cursor:not-allowed; }
        .btn.lit{ border-color:${C.gold}; animation:glowBtn 3s ease-in-out infinite; }
        input[type=range]{ accent-color:${C.gold}; cursor:pointer; width:72px; }
      `}</style>

      <div key={key} style={{width:'100%', maxWidth:440, animation:'fadeIn 0.55s ease', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem'}}>

        {/* App title */}
        <div style={{textAlign:'center', marginBottom:'-0.5rem'}}>
          <div style={{fontSize:9, letterSpacing:6, color:C.textMut, textTransform:'uppercase', fontFamily:"'Georgia','Times New Roman',serif"}}>
            The Gateway Experience
          </div>
        </div>

        <Dots current={si} total={STAGES.length} onJump={navigate}/>

        {/* Label */}
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:8.5, letterSpacing:5, color:C.textMut, textTransform:'uppercase', marginBottom:5}}>
            {stage.sub}
          </div>
          <h1 style={{margin:0, fontSize:24, fontWeight:'normal', color:C.gold, letterSpacing:4, fontFamily:"'Georgia','Times New Roman',serif"}}>
            {stage.label}
          </h1>
          {stage.hz && (
            <div style={{marginTop:4, fontSize:8.5, color:C.textMut, letterSpacing:2.5}}>
              {stage.hz} Hz · {stage.carrier} Hz carrier
            </div>
          )}
        </div>

        {/* Geometry */}
        <Shape size={220}/>

        {/* Breath */}
        <BreathOrb hz={stage.hz}/>

        {/* Whispers — the only "reading", one line at a time */}
        <Whisper key={key} lines={stage.whispers}/>

        {/* Optional guidance — hidden by default */}
        <div style={{textAlign:'center', minHeight:20}}>
          <span onClick={()=>setShowInfo(s=>!s)} style={{
            fontSize:8.5, letterSpacing:3, color:C.textMut, cursor:'pointer',
            textTransform:'uppercase', borderBottom:`0.5px solid ${C.goldBd}`, paddingBottom:1,
          }}>
            {showInfo ? 'close' : 'guidance'}
          </span>
          {showInfo && (
            <p style={{
              marginTop:12, marginBottom:0, fontSize:11.5, color:C.textMut, lineHeight:1.9,
              fontStyle:'italic', maxWidth:320, textAlign:'center',
              fontFamily:"'Georgia','Times New Roman',serif",
              animation:'fadeIn 0.4s ease',
            }}>
              {stage.info}
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{width:'100%', display:'flex', alignItems:'center', gap:10, opacity:0.15}}>
          <div style={{flex:1, height:'0.5px', background:C.gold}}/>
          <span style={{color:C.gold, fontSize:9}}>✦</span>
          <div style={{flex:1, height:'0.5px', background:C.gold}}/>
        </div>

        {/* Controls */}
        <div style={{display:'flex', alignItems:'center', gap:9, flexWrap:'wrap', justifyContent:'center'}}>
          {stage.hz && (
            <button className={`btn${audioOn?' lit':''}`} onClick={toggleAudio}>
              {audioOn ? '◼ silence' : '▶ tone'}
            </button>
          )}
          {stage.hz && audioOn && (
            <input type="range" min="0" max="0.4" step="0.01" value={vol}
              onChange={e=>setVol(parseFloat(e.target.value))}/>
          )}
          <button className="btn" onClick={()=>navigate(si-1)} disabled={si===0}>◄</button>
          <button className={`btn${si===0?' lit':''}`} onClick={()=>navigate(si+1)} disabled={si===STAGES.length-1}>
            {si===0?'enter':'deepen ►'}
          </button>
        </div>

        {/* Timer */}
        <div style={{fontSize:9.5, color:C.textMut, letterSpacing:3, fontFamily:'monospace'}}>
          {fmt(elapsed)}
          {audioOn && <span style={{color:C.gold, marginLeft:12, fontSize:8, letterSpacing:2}}>● transmitting</span>}
        </div>

      </div>
    </div>
  );
}
