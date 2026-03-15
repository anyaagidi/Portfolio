import { useState, useEffect } from 'react'

const S = {
  nav: { position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'1.25rem 2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',transition:'border-color 0.3s, background 0.3s',fontFamily:'var(--font-mono)',fontSize:'0.75rem',letterSpacing:'0.08em',borderBottom:'1px solid transparent' },
  navScrolled: { background:'rgba(250,248,242,0.95)',backdropFilter:'blur(8px)',borderBottom:'1px solid var(--border)' },
  navLinks: { display:'flex',gap:'2rem',listStyle:'none',color:'var(--ink-muted)' },
  hero: { minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'0 2.5rem 5rem',maxWidth:'1100px',margin:'0 auto' },
  eyebrow: { fontFamily:'var(--font-mono)',fontSize:'0.75rem',letterSpacing:'0.12em',color:'var(--accent)',marginBottom:'1rem',textTransform:'uppercase' },
  heroName: { fontFamily:'var(--font-display)',fontSize:'clamp(3rem, 8vw, 7rem)',fontWeight:300,lineHeight:1.0,letterSpacing:'-0.02em',marginBottom:'1.5rem' },
  italic: { fontStyle:'italic',color:'var(--accent)' },
  heroBio: { maxWidth:'520px',fontSize:'1.05rem',color:'var(--ink-muted)',lineHeight:1.8,marginBottom:'2.5rem' },
  heroLinks: { display:'flex',gap:'1.5rem',flexWrap:'wrap' },
  heroLink: { fontFamily:'var(--font-mono)',fontSize:'0.75rem',letterSpacing:'0.08em',padding:'0.6rem 1.2rem',border:'1px solid var(--border)',borderRadius:'2px',color:'var(--ink-muted)',transition:'border-color 0.2s, color 0.2s',display:'inline-block' },
  section: { maxWidth:'1100px',margin:'0 auto',padding:'6rem 2.5rem',borderTop:'1px solid var(--border)' },
  label: { fontFamily:'var(--font-mono)',fontSize:'0.7rem',letterSpacing:'0.14em',color:'var(--accent)',textTransform:'uppercase',marginBottom:'3rem' },
  twoCol: { display:'grid',gridTemplateColumns:'1fr 2fr',gap:'4rem',alignItems:'start' },
  h2: { fontFamily:'var(--font-display)',fontSize:'clamp(2rem, 4vw, 3rem)',fontWeight:300,lineHeight:1.15,letterSpacing:'-0.01em' },
  expItem: { marginBottom:'3rem',paddingBottom:'3rem',borderBottom:'1px solid var(--border)' },
  expHeader: { display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.3rem',gap:'1rem',flexWrap:'wrap' },
  expCompany: { fontFamily:'var(--font-display)',fontSize:'1.25rem',fontWeight:400 },
  expDate: { fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--ink-muted)',letterSpacing:'0.06em',paddingTop:'0.3rem',whiteSpace:'nowrap' },
  expRole: { fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--accent)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'1rem' },
  bullets: { listStyle:'none',display:'flex',flexDirection:'column',gap:'0.75rem',marginBottom:'1.5rem' },
  bullet: { display:'flex',gap:'0.75rem',fontSize:'0.9rem',color:'var(--ink-muted)',lineHeight:1.7 },
  dot: { flexShrink:0,marginTop:'0.6rem',width:'4px',height:'4px',borderRadius:'50%',background:'var(--accent)',display:'inline-block' },
  strip: { display:'flex',gap:'0.75rem',overflowX:'auto',paddingBottom:'0.5rem',scrollbarWidth:'none',msOverflowStyle:'none',marginTop:'1rem' },
  stripImg: { height:'160px',width:'220px',objectFit:'cover',objectPosition:'top center',borderRadius:'2px',flexShrink:0,border:'1px solid var(--border)',cursor:'zoom-in',transition:'opacity 0.2s',display:'block' },
  projGrid: { display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'2rem' },
  projCard: { border:'1px solid var(--border)',borderRadius:'2px',padding:'1.75rem',transition:'border-color 0.2s' },
  tag: { fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.1em',color:'var(--accent)',textTransform:'uppercase',marginBottom:'0.75rem',display:'flex',gap:'0.75rem',flexWrap:'wrap' },
  projTitle: { fontFamily:'var(--font-display)',fontSize:'1.3rem',fontWeight:400,marginBottom:'0.4rem',lineHeight:1.3 },
  projSub: { fontSize:'0.78rem',color:'var(--ink-faint)',marginBottom:'0.75rem',fontFamily:'var(--font-mono)',letterSpacing:'0.05em' },
  projDesc: { fontSize:'0.875rem',color:'var(--ink-muted)',lineHeight:1.75 },
  skillsGrid: { display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'2.5rem' },
  skillTitle: { fontFamily:'var(--font-mono)',fontSize:'0.7rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--ink)',marginBottom:'1rem',paddingBottom:'0.5rem',borderBottom:'1px solid var(--border)' },
  skillList: { listStyle:'none',display:'flex',flexDirection:'column',gap:'0.4rem' },
  skillItem: { fontSize:'0.875rem',color:'var(--ink-muted)' },
  interestsGrid: { display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'2rem' },
  iCard: { border:'1px solid var(--border)',borderRadius:'2px',padding:'1.75rem',transition:'border-color 0.2s' },
  iTitle: { fontFamily:'var(--font-display)',fontSize:'1.1rem',fontWeight:400,marginBottom:'0.5rem' },
  iDesc: { fontSize:'0.875rem',color:'var(--ink-muted)',lineHeight:1.7,marginBottom:'0.5rem' },
  iCaption: { fontFamily:'var(--font-mono)',fontSize:'0.68rem',color:'var(--ink-faint)',letterSpacing:'0.06em',marginTop:'0.25rem' },
  footer: { maxWidth:'1100px',margin:'0 auto',padding:'3rem 2.5rem',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem' },
  footerName: { fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:300 },
  footerMono: { fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--ink-muted)',letterSpacing:'0.08em' },
  overlay: { position:'fixed',inset:0,zIndex:999,background:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'zoom-out' },
  overlayImg: { maxWidth:'90vw',maxHeight:'90vh',objectFit:'contain',borderRadius:'2px' },
}

const experience = [
  {
    company:'Formlabs', location:'Somerville, MA',
    role:'Settings & Optimization — R&D Intern', dates:'May 2024 – Aug 2024',
    bullets:[
      'Collected and prepared White Nylon12 Powder samples across successive SLS print runs, adjusting machine settings to isolate variables affecting print quality. Analyzed samples using Thermogravimetric Analysis (TGA) to quantitatively measure material degradation, using results to optimize print parameters and achieve ~90% retention of color and chemical composition.',
      'Conducted multi-material SLS print studies using Nylon 11, Nylon 12, and TPU, leveraging knowledge of melt temperature, crystallization behavior, and powder aging to diagnose and resolve defects including warping, porosity, and over-sintering across iterative laser power and scan speed adjustments.',
    ],
    images:[
      { src:'/formlabs-2.jpg', caption:'White nylon powder in SLS printer bed' },
      { src:'/formlabs-1.jpg', caption:'Printer control — Nylon 12 V1' },
      { src:'/formlabs-3.jpg', caption:'Lab scale — powder sample weighing' },
      { src:'/formlabs-4.jpg', caption:'Kitchen sink test parts' },
    ],
  },
  {
    company:'Hack Diversity', location:'Boston, MA',
    role:'Fellow & Project Manager', dates:'Oct 2023 – Aug 2024',
    bullets:['Led the design and development of an accessible pill bottle opener, improving usability for individuals with motor issues and visual impairments.'],
    images:[],
  },
  {
    company:'Raeth LLC', location:'Snellville, GA',
    role:'Research Intern', dates:'May 2022 – May 2023',
    bullets:[
      'Used Splunk to analyze data from permitted websites, identifying flaws in firewall activation time.',
      'Performed penetration tests with Python in Kali Linux to surface website vulnerabilities, resulting in a more secure web infrastructure.',
    ],
    images:[],
  },
]

const projects = [
  {
    title:'E-Bike Range Planner', subtitle:'Constant Cycle — Senior Design',
    tags:['Arduino','CAD','Onshape','Embedded Systems'],
    desc:'Designed and iterated on a 3-part custom enclosure for an E-Bike telemetry system housing a Raspberry Pi Pico and E-Ink display. Conducted high-current PCB load testing up to 800W using FLIR thermal imaging to validate hardware performance.',
    images:['/ebike-2.png','/ebike-1.png','/ebike-3.png','/ebike-4.png'],
  },
  {
    title:'Remote Temperature Sensor', subtitle:'Health Monitoring System',
    tags:['Arduino IDE','AutoCAD','Inventor'],
    desc:'Built a temperature monitoring system to detect critical changes in crowded spaces. Designed the circuit, fabricated a custom enclosure, and implemented an LCD display for real-time alerts with health-specific temperature thresholds.',
    images:['/temp-1.jpg','/temp-2.jpg','/temp-3.jpg'],
  },
]

const skills = [
  { group:'Languages', items:['Python','Java','C','JavaScript','MATLAB','HTML'] },
  { group:'Hardware & CAD', items:['SolidWorks','Onshape','Autodesk Inventor','Arduino','AutoCAD'] },
  { group:'Software & Tools', items:['React','Node.js','Git','Linux/Unix','SQL','Jupyter Notebook'] },
  { group:'Engineering', items:['SLS 3D Printing','TGA Analysis','PCB Testing','Mechatronics','BLE/Embedded'] },
]

const interests = [
  {
    title:'OriginalKutz',
    desc:"Running a campus barbershop while studying engineering full-time. Over 300 clients, zero days off, and a whole lot of stories exchanged in the chair. Building something from nothing is the best feeling there is.",
    caption:'All while studying engineering full-time at BU.',
    images:[
      { src:'/kutz-1.jpg', pos:'top center' },
      { src:'/kutz-2.jpg', pos:'top center' },
    ],
  },
  {
    title:'Regal Rain Co.',
    desc:"Co-founder of a luxury umbrella brand that just hit New York Fashion Week. The idea? Rainy days should not slow you down, they should be your runway. We are on a mission to make every storm feel regal. Check us out at regalrainco.com.",
    caption:'Co-founded alongside BU classmates. Debuted at NYFW 2026.',
    images:[
      { src:'/regal-1.jpg', pos:'center center' },
      { src:'/regal-2.jpg', pos:'center center' },
      { src:'/regal-3.jpg', pos:'center 15%' },
    ],
  },
  {
    title:'Food & Adventure',
    desc:"From homemade Nigerian jollof rice to birria tacos at a random truck, if it looks good, I am trying it. Snowboarding, exploring new cities, finding the best hidden spots. Life is too short to eat boring food or stay home.",
    caption:'Always exploring, always eating well.',
    images:[
      { src:'/food-1.jpg', pos:'center center' },
      { src:'/food-3.jpg', pos:'center center' },
      { src:'/snowboard.jpg', pos:'center center' },
      { src:'/food-4.jpg', pos:'center center' },
    ],
  },
]

function useScrolled() {
  const [s,setS] = useState(false)
  useEffect(() => {
    const h = () => setS(window.scrollY > 40)
    window.addEventListener('scroll',h)
    return () => window.removeEventListener('scroll',h)
  },[])
  return s
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const h = e => { if(e.key==='Escape') onClose() }
    window.addEventListener('keydown',h)
    return () => window.removeEventListener('keydown',h)
  },[onClose])
  return (
    <div style={S.overlay} onClick={onClose}>
      <img src={src} alt="" style={S.overlayImg} onClick={e=>e.stopPropagation()} />
    </div>
  )
}

function Strip({ images, setLb }) {
  if (!images || images.length === 0) return null
  return (
    <div style={S.strip}>
      {images.map((img,i) => {
        const src = typeof img === 'string' ? img : img.src
        const pos = typeof img === 'string' ? 'center center' : (img.pos || 'center center')
        return (
          <img key={i} src={src} alt=""
            style={{ ...S.stripImg, objectPosition: pos }}
            onClick={() => setLb(src)}
            onMouseEnter={e => e.target.style.opacity='0.75'}
            onMouseLeave={e => e.target.style.opacity='1'}
          />
        )
      })}
    </div>
  )
}

export default function App() {
  const scrolled = useScrolled()
  const [lb,setLb] = useState(null)
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })

  return (
    <>
      {lb && <Lightbox src={lb} onClose={() => setLb(null)} />}

      {/* NAV */}
      <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled:{}) }}>
        <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.75rem',letterSpacing:'0.08em' }}>AA</span>
        <ul style={S.navLinks}>
          {['experience','projects','skills','about'].map(s => (
            <li key={s} style={{ cursor:'pointer',transition:'color 0.2s' }}
              onClick={() => go(s)}
              onMouseEnter={e => e.target.style.color='var(--ink)'}
              onMouseLeave={e => e.target.style.color='var(--ink-muted)'}
            >{s}</li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <img src="/profile.jpg" alt="Anya Agidi"
          className="fade-up fade-up-delay-1"
          style={{ width:'80px',height:'80px',borderRadius:'50%',objectFit:'cover',objectPosition:'center top',marginBottom:'2rem',border:'2px solid var(--border)' }}
        />
        <p className="fade-up fade-up-delay-1" style={S.eyebrow}>Computer Engineering · Boston University · 2026</p>
        <h1 className="fade-up fade-up-delay-2" style={S.heroName}>
          Anya <span style={S.italic}>Agidi</span>
        </h1>
        <p className="fade-up fade-up-delay-3" style={S.heroBio}>
          Computer Engineer based in Boston. The past four years at Boston University have brought
          many new experiences, from interning at Formlabs, to creating two businesses, to working
          on a tech startup. I bring the same obsessive attention to detail into all of my passions.
          For now, I am currently finishing my CE degree at BU and looking for what's next.
          I would love to connect with you! Below are my contacts.
        </p>
        <div className="fade-up fade-up-delay-4" style={S.heroLinks}>
          {[
            { label:'anyaa@bu.edu', href:'mailto:anyaa@bu.edu' },
            { label:'LinkedIn', href:'https://linkedin.com/in/anya-agidi-0b9987248' },
            { label:'GitHub', href:'https://github.com/anyaagidi' },
            { label:'Regal Rain', href:'https://regalrainco.com' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={S.heroLink}
              onMouseEnter={e => { e.target.style.borderColor='var(--accent)'; e.target.style.color='var(--accent)' }}
              onMouseLeave={e => { e.target.style.borderColor='var(--border)'; e.target.style.color='var(--ink-muted)' }}
            >{label}</a>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={S.section}>
        <p style={S.label}>01 — Experience</p>
        <div style={S.twoCol}>
          <h2 style={S.h2}>Where I've<br /><span style={S.italic}>worked</span></h2>
          <div>
            {experience.map((exp,i) => (
              <div key={i} style={i===experience.length-1 ? {...S.expItem,borderBottom:'none',marginBottom:0} : S.expItem}>
                <div style={S.expHeader}>
                  <span style={S.expCompany}>{exp.company}</span>
                  <span style={S.expDate}>{exp.dates}</span>
                </div>
                <p style={S.expRole}>{exp.role}</p>
                <ul style={S.bullets}>
                  {exp.bullets.map((b,j) => (
                    <li key={j} style={S.bullet}><span style={S.dot}/><span>{b}</span></li>
                  ))}
                </ul>
                {exp.images.length > 0 && (
                  <div style={S.strip}>
                    {exp.images.map((img,j) => (
                      <img key={j} src={img.src} alt={img.caption} title={img.caption}
                        style={S.stripImg}
                        onClick={() => setLb(img.src)}
                        onMouseEnter={e => e.target.style.opacity='0.75'}
                        onMouseLeave={e => e.target.style.opacity='1'}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={S.section}>
        <p style={S.label}>02 — Projects</p>
        <h2 style={{...S.h2,marginBottom:'3rem'}}>Things I've <span style={S.italic}>built</span></h2>
        <div style={S.projGrid}>
          {projects.map((p,i) => (
            <div key={i} style={S.projCard}
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
            >
              <div style={S.tag}>{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              <h3 style={S.projTitle}>{p.title}</h3>
              <p style={S.projSub}>{p.subtitle}</p>
              <p style={S.projDesc}>{p.desc}</p>
              <Strip images={p.images} setLb={setLb} />            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={S.section}>
        <p style={S.label}>03 — Skills</p>
        <h2 style={{...S.h2,marginBottom:'3rem'}}>What I <span style={S.italic}>know</span></h2>
        <div style={S.skillsGrid}>
          {skills.map((s,i) => (
            <div key={i}>
              <p style={S.skillTitle}>{s.group}</p>
              <ul style={S.skillList}>
                {s.items.map(item => <li key={item} style={S.skillItem}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={S.section}>
        <p style={S.label}>04 — Beyond Engineering</p>
        <h2 style={{...S.h2,marginBottom:'0.75rem'}}>What I'm <span style={S.italic}>about</span></h2>
        <p style={{ fontSize:'0.9rem',color:'var(--ink-muted)',marginBottom:'3rem',maxWidth:'520px',lineHeight:1.7 }}>
          All while studying engineering full-time, these are the businesses, passions, and adventures that keep life interesting.
        </p>
        <div style={S.interestsGrid}>
          {interests.map((item,i) => (
            <div key={i} style={S.iCard}
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
            >
              <h3 style={S.iTitle}>{item.title}</h3>
              <p style={S.iDesc}>{item.desc}</p>
              <p style={S.iCaption}>{item.caption}</p>
              <Strip images={item.images} setLb={setLb} />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <span style={S.footerName}>Anya Agidi</span>
        <span style={S.footerMono}>(678) 650-3520 · anyaa@bu.edu</span>
      </footer>
    </>
  )
}
