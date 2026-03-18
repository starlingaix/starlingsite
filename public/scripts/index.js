/* ========================================================
   HERO — DLM Intelligence Engine Mockup
   ======================================================== */

/* ========================================================
   HERO — DLM Terminal Demo (Airframe section)
   Types a query, resolves through UCA → Org Brain → DLM
   ======================================================== */
(function(){
    const terminal = document.getElementById('heroTerminal');
    if (!terminal) return;
    const input = document.getElementById('heroTermInput');
    const cursor = document.getElementById('heroTermCursor');
    const stepsEl = document.getElementById('heroTermSteps');
    const resultEl = document.getElementById('heroTermResult');
    const replayBtn = document.getElementById('heroTermReplay');

    const demos = [
        {
            query: 'MA20 — Competitive Position',
            steps: [
                { icon:'UCA', iconClass:'hero-term__step-icon--uca', label:'UCA Resolve', value:'Address <strong>MA20</strong> found in Mission Architecture' },
                { icon:'ORG', iconClass:'hero-term__step-icon--brain', label:'Org Brain Lookup', value:'Retrieving canonical memory from sovereign store...' },
                { icon:'DLM', iconClass:'hero-term__step-icon--dlm', label:'DLM Synthesis', value:'Merging context with LLM processing layer' },
            ],
            result: { code:'MA20', title:'Competitive Position & Market Strategy', excerpt:'The organization competes on cognitive infrastructure — not features. Our moat is the architecture itself.', tag:'Canonical — Single Source of Truth' }
        },
        {
            query: 'VL01 — Core Offering',
            steps: [
                { icon:'UCA', iconClass:'hero-term__step-icon--uca', label:'UCA Resolve', value:'Address <strong>VL01</strong> found in Value Chain' },
                { icon:'ORG', iconClass:'hero-term__step-icon--brain', label:'Org Brain Lookup', value:'Retrieving canonical memory from sovereign store...' },
                { icon:'DLM', iconClass:'hero-term__step-icon--dlm', label:'DLM Synthesis', value:'Merging context with LLM processing layer' },
            ],
            result: { code:'VL01', title:'Core Offering & Product Definition', excerpt:'Starling delivers cognitive infrastructure — the architecture that makes AI work for the entire organization.', tag:'Canonical — Single Source of Truth' }
        },
        {
            query: 'MA10 — Organizational Values',
            steps: [
                { icon:'UCA', iconClass:'hero-term__step-icon--uca', label:'UCA Resolve', value:'Address <strong>MA10</strong> found in Mission Architecture' },
                { icon:'ORG', iconClass:'hero-term__step-icon--brain', label:'Org Brain Lookup', value:'Retrieving canonical memory from sovereign store...' },
                { icon:'DLM', iconClass:'hero-term__step-icon--dlm', label:'DLM Synthesis', value:'Merging context with LLM processing layer' },
            ],
            result: { code:'MA10', title:'Core Values & Operating Principles', excerpt:'Sovereignty over speed. Architecture over automation. Canon over context. Build infrastructure, not dependencies.', tag:'Canonical — Single Source of Truth' }
        }
    ];

    let demoIdx = 0;
    let animating = false;
    let timeouts = [];

    function clearTimers(){ timeouts.forEach(t=>clearTimeout(t)); timeouts=[]; }

    function runDemo(idx) {
        if(animating) return;
        animating = true;
        const demo = demos[idx % demos.length];
        input.textContent = '';
        stepsEl.innerHTML = '';
        resultEl.style.display = 'none';
        resultEl.classList.remove('is-visible');
        replayBtn.classList.remove('is-visible');
        cursor.style.display = '';

        // Type the query
        let charIdx = 0;
        function typeChar(){
            if(charIdx <= demo.query.length){
                input.textContent = demo.query.slice(0, charIdx);
                charIdx++;
                timeouts.push(setTimeout(typeChar, 40 + Math.random()*30));
            } else {
                cursor.style.display = 'none';
                showSteps();
            }
        }
        timeouts.push(setTimeout(typeChar, 600));

        function showSteps(){
            // Build step HTML
            stepsEl.innerHTML = demo.steps.map((s,i) => `
                <div class="hero-term__step" data-step="${i}">
                    <div class="hero-term__step-icon ${s.iconClass}">${s.icon}</div>
                    <div class="hero-term__step-body">
                        <div class="hero-term__step-label">${s.label}</div>
                        <div class="hero-term__step-value">${s.value}</div>
                    </div>
                </div>
            `).join('');
            const stepEls = stepsEl.querySelectorAll('.hero-term__step');
            stepEls.forEach((el,i) => {
                timeouts.push(setTimeout(()=> el.classList.add('is-visible'), i*400));
            });
            timeouts.push(setTimeout(showResult, stepEls.length*400 + 300));
        }

        function showResult(){
            const r = demo.result;
            resultEl.innerHTML = `
                <div class="hero-term__result-header">
                    <span class="hero-term__result-code">${r.code}</span>
                    <span class="hero-term__result-status"><span class="hero-term__result-status-dot"></span> Resolved</span>
                </div>
                <div class="hero-term__result-title">${r.title}</div>
                <div class="hero-term__result-excerpt">${r.excerpt}</div>
                <span class="hero-term__step-tag hero-term__step-tag--canon">${r.tag}</span>
            `;
            resultEl.style.display = '';
            timeouts.push(setTimeout(()=> resultEl.classList.add('is-visible'), 50));
            timeouts.push(setTimeout(()=>{
                replayBtn.classList.add('is-visible');
                animating = false;
            }, 600));

            // Auto-advance to next demo after 6s
            timeouts.push(setTimeout(()=>{
                if(!animating){
                    demoIdx++;
                    runDemo(demoIdx);
                }
            }, 6000));
        }
    }

    replayBtn.addEventListener('click', ()=>{
        clearTimers();
        animating = false;
        demoIdx++;
        runDemo(demoIdx);
    });

    // Start first demo after entrance animation
    timeouts.push(setTimeout(()=> runDemo(0), 1200));
})();

(function(){
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Trigger entrance
    setTimeout(() => hero.classList.add('is-loaded'), 100);

    // Mockup elements
    const modules = document.querySelectorAll('.hero-mock__module');
    const queryEl = document.getElementById('mockQuery');
    const queryText = document.getElementById('mockQueryText');
    const cursorEl = document.getElementById('mockCursor');
    const pipeline = document.getElementById('mockPipeline');
    const resultEl = document.getElementById('mockResult');
    const statusEl = document.getElementById('mockStatus');
    const fillEl = document.getElementById('mockFill');
    const cognatesEl = document.getElementById('mockCognates');
    const replayBtn = document.getElementById('mockReplay');
    if (!modules.length) return;

    const DEMOS = [
        {
            query: 'MA20 — Competitive Position',
            activeModules: ['uca','org','llm'],
            steps: [
                { icon:'UCA', bg:'linear-gradient(135deg,var(--brand),#e8945a)', label:'UCA Resolve', value:'Address <strong>MA20</strong> → Mission Architecture' },
                { icon:'ORG', bg:'linear-gradient(135deg,#635bff,#9b5de5)', label:'Org Brain', value:'Canonical memory retrieved from sovereign store' },
                { icon:'DLM', bg:'linear-gradient(135deg,#1a9e82,#36d1b7)', label:'DLM Synthesis', value:'Context merged with LLM processing layer' },
            ],
            result: { code:'MA20', title:'Competitive Position & Market Strategy', excerpt:'The organization competes on cognitive infrastructure — not features. Our moat is the architecture itself: UCA addressing + sovereign Org Brain + DLM synthesis.' }
        },
        {
            query: 'VL01 — Product Offering',
            activeModules: ['mcp','uca','org'],
            steps: [
                { icon:'MCP', bg:'linear-gradient(135deg,#1a9e82,#36d1b7)', label:'MCP Connect', value:'Bridging to product data sources via protocol' },
                { icon:'UCA', bg:'linear-gradient(135deg,var(--brand),#e8945a)', label:'UCA Resolve', value:'Address <strong>VL01</strong> → Value Chain' },
                { icon:'ORG', bg:'linear-gradient(135deg,#635bff,#9b5de5)', label:'Org Brain', value:'Canonical offering definition retrieved' },
            ],
            result: { code:'VL01', title:'Core Offering & Product Definition', excerpt:'Starling delivers cognitive infrastructure — the architecture that makes AI work for the entire organization, not just individual users.' }
        },
        {
            query: 'MA05 — Vision & Future State',
            activeModules: ['llm','uca','org'],
            steps: [
                { icon:'LLM', bg:'linear-gradient(135deg,#e06090,#f580b0)', label:'LLM Process', value:'Natural language query parsed and structured' },
                { icon:'UCA', bg:'linear-gradient(135deg,var(--brand),#e8945a)', label:'UCA Resolve', value:'Address <strong>MA05</strong> → Mission Architecture' },
                { icon:'ORG', bg:'linear-gradient(135deg,#635bff,#9b5de5)', label:'Org Brain', value:'Persistent vision memory resolved' },
            ],
            result: { code:'MA05', title:'Vision & Future State', excerpt:'Every organization will have a cognitive architecture. We are building the standard. The future is sovereign intelligence — owned, governed, and evolved by the organization itself.' }
        }
    ];

    let demoIdx = 0;
    let running = false;
    let timers = [];

    function clearTimers(){ timers.forEach(t=>clearTimeout(t)); timers=[]; }

    function runDemo(idx){
        if(running) return;
        running = true;
        const demo = DEMOS[idx % DEMOS.length];

        // Reset
        queryText.textContent = '';
        cursorEl.style.display = '';
        pipeline.innerHTML = '';
        resultEl.innerHTML = '';
        resultEl.classList.remove('is-visible');
        resultEl.style.display = 'none';
        queryEl.classList.remove('is-active');
        statusEl.classList.remove('is-visible');
        replayBtn.classList.remove('is-visible');
        modules.forEach(m => m.classList.remove('is-active'));

        // 1) Show modules staggered
        modules.forEach((m, i) => {
            timers.push(setTimeout(() => m.classList.add('is-visible'), 200 + i * 120));
        });

        // 2) Type query
        let charIdx = 0;
        function typeChar(){
            if(charIdx <= demo.query.length){
                queryText.textContent = demo.query.slice(0, charIdx);
                charIdx++;
                timers.push(setTimeout(typeChar, 35 + Math.random() * 25));
            } else {
                cursorEl.style.display = 'none';
                queryEl.classList.add('is-active');
                showPipeline();
            }
        }
        timers.push(setTimeout(typeChar, modules.length * 120 + 600));

        // 3) Pipeline steps + activate modules
        function showPipeline(){
            // Show status
            timers.push(setTimeout(() => statusEl.classList.add('is-visible'), 100));

            // Activate relevant modules
            demo.activeModules.forEach((key, i) => {
                timers.push(setTimeout(() => {
                    modules.forEach(m => {
                        if(m.dataset.mod === key) m.classList.add('is-active');
                    });
                }, i * 350));
            });

            // Build steps HTML
            pipeline.innerHTML = demo.steps.map((s, i) => `
                <div class="hero-mock__pipe-step" data-step="${i}">
                    <div class="hero-mock__pipe-step-icon" style="background:${s.bg}">${s.icon}</div>
                    <div class="hero-mock__pipe-step-body">
                        <div class="hero-mock__pipe-step-label">${s.label}</div>
                        <div class="hero-mock__pipe-step-value">${s.value}</div>
                    </div>
                    <div class="hero-mock__pipe-step-check">&#10003;</div>
                </div>
            `).join('');

            const stepEls = pipeline.querySelectorAll('.hero-mock__pipe-step');
            stepEls.forEach((el, i) => {
                timers.push(setTimeout(() => el.classList.add('is-visible'), 300 + i * 400));
            });

            timers.push(setTimeout(showResult, 300 + stepEls.length * 400 + 300));
        }

        // 4) Show result
        function showResult(){
            const r = demo.result;
            resultEl.innerHTML = `
                <div class="hero-mock__result-head">
                    <span class="hero-mock__result-code">${r.code}</span>
                    <span class="hero-mock__result-badge">Canonical</span>
                </div>
                <div class="hero-mock__result-title">${r.title}</div>
                <div class="hero-mock__result-excerpt">${r.excerpt}</div>
            `;
            resultEl.style.display = '';
            timers.push(setTimeout(() => resultEl.classList.add('is-visible'), 50));

            // Animate footer
            fillEl.style.width = '67%';
            animateCount(cognatesEl, 28, 800);

            timers.push(setTimeout(() => {
                replayBtn.classList.add('is-visible');
                running = false;
            }, 500));

            // Auto-advance
            timers.push(setTimeout(() => {
                if(!running){
                    demoIdx++;
                    runDemo(demoIdx);
                }
            }, 5500));
        }
    }

    function animateCount(el, target, dur){
        const start = performance.now();
        function tick(now){
            const p = Math.min((now - start) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    replayBtn.addEventListener('click', () => {
        clearTimers();
        running = false;
        demoIdx++;
        runDemo(demoIdx);
    });

    // Start after hero entrance
    timers.push(setTimeout(() => runDemo(0), 800));
})();

/* ========================================================
   BARRIER — Without vs With DLM Toggle (animated)
   ======================================================== */
(function(){
    const btns = document.querySelectorAll('.barrier-toggle__btn');
    const panels = document.querySelectorAll('.barrier-panel');
    if(!btns.length) return;

    /* Element refs */
    const withoutMsgs    = document.querySelectorAll('#barrierWithout .barrier-chat__msg');
    const withoutResults = document.querySelectorAll('#barrierWithout .barrier-chat__result');
    const withoutNoise   = document.querySelector('#barrierWithout .barrier-chat__noise');
    const withPrompt     = document.querySelector('#barrierWith .barrier-retrieval__prompt');
    const withArrow      = document.querySelector('#barrierWith .barrier-retrieval__arrow');
    const withCard       = document.querySelector('#barrierWith .barrier-retrieval__card');
    const withStatus     = document.querySelector('#barrierWith .barrier-retrieval__status');
    const withTags       = document.querySelectorAll('#barrierWith .barrier-retrieval__tag');
    const withExcerpt    = document.querySelector('#barrierWith .barrier-retrieval__excerpt');

    function resetWithout(){
        withoutMsgs.forEach(m => m.classList.remove('is-visible'));
        withoutResults.forEach(r => r.classList.remove('is-visible'));
        if(withoutNoise) withoutNoise.classList.remove('is-visible');
    }
    function resetWith(){
        if(withPrompt){ withPrompt.classList.remove('is-visible','is-active'); }
        if(withArrow) withArrow.classList.remove('is-visible');
        if(withCard) withCard.classList.remove('is-visible');
        if(withStatus) withStatus.classList.remove('is-visible');
        withTags.forEach(t => t.classList.remove('is-visible'));
        if(withExcerpt) withExcerpt.classList.remove('is-visible');
    }

    function animateWithout(){
        resetWithout();
        /* Stagger messages in */
        withoutMsgs.forEach((msg, i) => {
            setTimeout(() => msg.classList.add('is-visible'), 200 + i * 500);
        });
        /* Results slide in after 2nd msg */
        const resDelay = 200 + 1 * 500 + 350;
        withoutResults.forEach((r, i) => {
            setTimeout(() => r.classList.add('is-visible'), resDelay + i * 250);
        });
        /* Noise text at the end */
        const noiseDelay = 200 + withoutMsgs.length * 500 + 300;
        if(withoutNoise) setTimeout(() => withoutNoise.classList.add('is-visible'), noiseDelay);
    }

    function animateWith(){
        resetWith();
        let t = 200;
        /* Prompt appears */
        setTimeout(() => { if(withPrompt){ withPrompt.classList.add('is-visible'); withPrompt.classList.add('is-active'); }}, t);
        /* Arrow bounces in */
        t += 500;
        setTimeout(() => { if(withArrow) withArrow.classList.add('is-visible'); }, t);
        /* Remove prompt active glow */
        t += 300;
        setTimeout(() => { if(withPrompt) withPrompt.classList.remove('is-active'); }, t);
        /* Card slides in */
        t += 200;
        setTimeout(() => { if(withCard) withCard.classList.add('is-visible'); }, t);
        /* Status badge pops */
        t += 400;
        setTimeout(() => { if(withStatus) withStatus.classList.add('is-visible'); }, t);
        /* Tags */
        t += 250;
        withTags.forEach((tag, i) => {
            setTimeout(() => tag.classList.add('is-visible'), t + i * 200);
        });
        /* Excerpt */
        t += withTags.length * 200 + 200;
        setTimeout(() => { if(withExcerpt) withExcerpt.classList.add('is-visible'); }, t);
    }

    function setPanel(name, animate){
        btns.forEach(b => b.classList.toggle('is-active', b.dataset.panel === name));
        panels.forEach(p => p.classList.toggle('is-active', p.id === (name === 'without' ? 'barrierWithout' : 'barrierWith')));
        if(animate !== false){
            if(name === 'without') animateWithout();
            else animateWith();
        }
    }

    btns.forEach(b => b.addEventListener('click', () => {
        setPanel(b.dataset.panel);
        clearInterval(autoToggle);
        /* Restart auto-cycle after 12s inactivity */
        autoToggle = setInterval(() => {
            current = current === 'without' ? 'with' : 'without';
            setPanel(current);
        }, 6000);
    }));

    /* Auto-cycle */
    let current = 'without';
    let autoToggle = setInterval(() => {
        current = current === 'without' ? 'with' : 'without';
        setPanel(current);
    }, 6000);

    /* Initial animation when section scrolls into view */
    const section = document.getElementById('barrier');
    if(section){
        const io = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting){
                animateWithout();
                io.unobserve(section);
            }
        }, { threshold: 0.3 });
        io.observe(section);
    }
})();

/* ========================================================
   SCOPE — UCA Address Browser
   ======================================================== */
(function(){
    const DATA = {
        MA01:{code:'MA01',title:'Organizational Purpose',type:'Persistent',desc:'The foundational reason the organization exists. Defines the ultimate value it creates and for whom. Anchors all downstream strategy and decision-making.',badge:'persistent'},
        MA05:{code:'MA05',title:'Vision & Future State',type:'Persistent',desc:'The aspirational destination the organization is building toward. Provides directional clarity for innovation and long-term planning.',badge:'persistent'},
        MA10:{code:'MA10',title:'Core Values & Principles',type:'Persistent',desc:'The non-negotiable behavioral and ethical standards that govern how the organization operates, decides, and interacts.',badge:'persistent'},
        MA15:{code:'MA15',title:'Strategic Framework',type:'Active',desc:'The current strategic plan including objectives, key results, and initiatives. Updated quarterly. Drives resource allocation and prioritization.',badge:'active'},
        MA20:{code:'MA20',title:'Competitive Position & Market Strategy',type:'Persistent',desc:'The organization competes on cognitive infrastructure — not features. Our moat is the architecture itself: UCA addressing + sovereign Org Brain + DLM synthesis.',badge:'persistent'},
        VL01:{code:'VL01',title:'Product & Service Offering',type:'Active',desc:'The current portfolio of products and services, their value propositions, pricing models, and delivery mechanisms. Updated as offerings evolve.',badge:'active'},
        VL05:{code:'VL05',title:'Market Intelligence',type:'Learned',desc:'Accumulated insights from market research, competitive analysis, customer feedback, and trend monitoring. Continuously enriched through operations.',badge:'learned'}
    };

    const items = document.querySelectorAll('.uca-browser__item');
    const detail = document.getElementById('ucaDetail');
    if(!items.length || !detail) return;

    function renderDetail(code){
        const d = DATA[code];
        if(!d) return;
        detail.innerHTML = `
            <div class="uca-browser__detail-header">
                <span class="uca-browser__detail-code">${d.code}</span>
                <span class="uca-browser__detail-badge uca-browser__detail-badge--${d.badge}">${d.type}</span>
            </div>
            <div class="uca-browser__detail-title">${d.title}</div>
            <div class="uca-browser__detail-desc">${d.desc}</div>
            <div class="uca-browser__detail-canonical">
                <span class="uca-browser__detail-canonical-dot"></span>
                <span class="uca-browser__detail-canonical-text">Canonical — Single Source of Truth</span>
            </div>`;
    }

    function activate(code){
        items.forEach(i=>i.classList.toggle('is-active', i.dataset.code===code));
        renderDetail(code);
    }

    // Default
    activate('MA20');

    let userClicked = false;
    items.forEach(item=>item.addEventListener('click',()=>{
        userClicked = true;
        activate(item.dataset.code);
    }));

    // Auto-cycle
    const codes = Array.from(items).map(i=>i.dataset.code);
    let idx = codes.indexOf('MA20');
    setInterval(()=>{
        if(userClicked) return;
        idx = (idx+1)%codes.length;
        activate(codes[idx]);
    }, 4000);
})();

/* ========================================================
   AIRFRAME — UCA Tree expand/collapse
   ======================================================== */
(function(){
    const tree = document.getElementById('ucaTree');
    if(!tree) return;
    tree.querySelectorAll('[data-toggle]').forEach(node=>{
        node.addEventListener('click',()=>{
            const key = node.dataset.toggle;
            const children = tree.querySelector(`[data-parent="${key}"]`);
            const caret = node.querySelector('.uca-tree__caret');
            if(children){
                children.classList.toggle('is-open');
                if(caret) caret.classList.toggle('is-open');
            }
        });
    });
    // Open org and mission by default
    setTimeout(()=>{
        tree.querySelector('[data-toggle="org"]')?.click();
        setTimeout(()=>tree.querySelector('[data-toggle="mission"]')?.click(), 300);
    }, 600);
})();

/* ========================================================
   AIRFRAME — Org Brain hover highlights
   ======================================================== */
(function(){
    const brain = document.getElementById('orgBrain');
    if(!brain) return;
    const cognates = brain.querySelectorAll('.org-brain__cognate');
    const hemis = brain.querySelectorAll('.org-brain__hemi');

    hemis.forEach(h=>{
        h.addEventListener('mouseenter',()=>{
            const side = h.dataset.side;
            cognates.forEach(c=>{
                const hemi = c.dataset.hemi;
                c.classList.remove('is-highlight-left','is-highlight-right');
                if(hemi===side || hemi==='both'){
                    c.classList.add(side==='left'?'is-highlight-left':'is-highlight-right');
                }
            });
        });
        h.addEventListener('mouseleave',()=>{
            cognates.forEach(c=>c.classList.remove('is-highlight-left','is-highlight-right'));
        });
    });
})();

/* ========================================================
   AIRFRAME — DLM Equation Builder animation
   ======================================================== */
(function(){
    const eq = document.getElementById('dlmEquation');
    if(!eq) return;
    const parts = eq.querySelectorAll('.dlm-equation__part');
    const ops = eq.querySelectorAll('.dlm-equation__op');
    const result = eq.querySelector('.dlm-equation__result');

    function reset(){
        parts.forEach(p=>p.classList.remove('is-visible'));
        ops.forEach(o=>o.classList.remove('is-visible'));
        result.classList.remove('is-visible');
    }

    function animate(){
        reset();
        let delay = 300;
        parts.forEach((p,i)=>{
            setTimeout(()=>p.classList.add('is-visible'), delay);
            delay += 500;
            if(i < ops.length){
                setTimeout(()=>ops[i].classList.add('is-visible'), delay);
                delay += 200;
            }
        });
        setTimeout(()=>result.classList.add('is-visible'), delay + 300);
    }

    // Run on visibility
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
            if(e.isIntersecting){
                animate();
                setInterval(()=>animate(), 7000);
                observer.unobserve(e.target);
            }
        });
    },{threshold:0.3});
    observer.observe(eq);
})();

/* ========================================================
   SCROLL REVEAL + ANIMATED COUNTERS
   ======================================================== */
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            e.target.querySelectorAll('.counter').forEach(el => {
                if (el.dataset.counted) return;
                el.dataset.counted = '1';
                const target = parseInt(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const start = performance.now();
                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ========================================================
   ORG BRAIN — Interactive Mockup
   ======================================================== */
(function(){
    const mockup = document.getElementById('brainMockup');
    if (!mockup) return;
    const canvasWrap = mockup.querySelector('.brain-mockup__canvas-wrap');
    const nodes = mockup.querySelectorAll('.brain-node');
    const sideItems = mockup.querySelectorAll('.brain-sidebar__item');
    const pulseSvg = document.getElementById('brainPulse');
    const countEl = document.getElementById('brainCount');
    const pctEl = document.getElementById('brainPct');
    const fillEl = document.getElementById('brainFill');
    let activeNode = null;
    let cycleTimer = null;
    let cycleIdx = 0;

    // Node positions (percentage from center)
    // 6 nodes evenly spaced in a circle (60° apart), starting from top
    const NODE_COUNT = 6;
    const RADIUS = 0.40;
    const positions = Array.from({length: NODE_COUNT}, (_, i) => ({
        angle: -90 + (i * 360 / NODE_COUNT),  // start from top (-90°), go clockwise
        r: RADIUS
    }));

    function positionNodes() {
        const w = canvasWrap.offsetWidth;
        const h = canvasWrap.offsetHeight;
        const cx = w / 2;
        const cy = h / 2;
        const scale = Math.min(w, h);

        nodes.forEach((node, i) => {
            const pos = positions[i];
            const rad = (pos.angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * scale * pos.r;
            const y = cy + Math.sin(rad) * scale * pos.r;
            node.style.left = x + 'px';
            node.style.top = y + 'px';
            node.style.transform = node.classList.contains('is-visible')
                ? (node.classList.contains('is-active') ? 'translate(-50%,-50%) scale(1.1)' : 'translate(-50%,-50%) scale(1)')
                : 'translate(-50%,-50%) scale(0.7)';
        });

        // Draw pulse lines
        drawPulses(cx, cy, scale);
    }

    function drawPulses(cx, cy, scale) {
        let svg = '';
        nodes.forEach((node, i) => {
            const pos = positions[i];
            const rad = (pos.angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * scale * pos.r;
            const y = cy + Math.sin(rad) * scale * pos.r;
            const color = node.style.color || '#ccc';
            const isActive = node.classList.contains('is-active');
            const opacity = isActive ? 0.35 : 0.1;
            const dashArray = isActive ? 'none' : '4 6';
            svg += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="${isActive ? 2 : 1}" stroke-opacity="${opacity}" stroke-dasharray="${dashArray}"/>`;
            if (isActive) {
                // Animated pulse dot
                svg += `<circle r="4" fill="${color}" opacity="0.7">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M${x},${y} L${cx},${cy}"/>
                </circle>`;
            }
        });
        pulseSvg.innerHTML = svg;
    }

    function setActive(key) {
        nodes.forEach(n => n.classList.toggle('is-active', n.dataset.brain === key));
        sideItems.forEach(s => s.classList.toggle('is-active', s.dataset.brainSide === key));
        activeNode = key;
        positionNodes();
    }

    // Animate count-up
    function countUp(target, duration) {
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            countEl.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // Animate percentage
    function animatePct(target, duration) {
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            pctEl.textContent = Math.round(target * eased) + '%';
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function entrance() {
        // Reveal nodes staggered
        nodes.forEach((node, i) => {
            setTimeout(() => {
                node.classList.add('is-visible');
                positionNodes();
            }, 200 + i * 150);
        });
        // Reveal sidebar items
        sideItems.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('is-visible');
                const fill = item.querySelector('.brain-sidebar__item-fill');
                if (fill) fill.style.width = fill.dataset.width;
            }, 400 + i * 180);
        });
        // Count up
        setTimeout(() => countUp(28, 1200), 300);
        // Percentage & fill
        setTimeout(() => {
            animatePct(67, 1000);
            fillEl.style.width = '67%';
        }, 800);
        // Start auto-cycle
        setTimeout(() => startCycle(), nodes.length * 150 + 800);
    }

    function startCycle() {
        clearInterval(cycleTimer);
        const keys = Array.from(nodes).map(n => n.dataset.brain);
        cycleTimer = setInterval(() => {
            setActive(keys[cycleIdx % keys.length]);
            cycleIdx++;
        }, 3000);
    }

    nodes.forEach(n => {
        n.addEventListener('click', () => {
            clearInterval(cycleTimer);
            setActive(n.dataset.brain);
            setTimeout(startCycle, 6000);
        });
    });

    // Position on resize
    window.addEventListener('resize', positionNodes);

    // Trigger on scroll
    const brainObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                positionNodes();
                entrance();
                brainObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    brainObserver.observe(mockup);

    // Initial position (hidden)
    positionNodes();
})();

// Newsletter Inbox — interactive split-pane with typewriter
(function() {
    const inbox = document.getElementById('nlInbox');
    if (!inbox) return;
    const items = inbox.querySelectorAll('.nl-inbox__item');
    const reader = document.getElementById('nlReader');
    let activeIdx = 0;
    let cycleTimer = null;
    let typeTimers = [];

    const essays = [
        { title:'Why Your AI Can\'t Remember', date:'Mar 17, 2026',
          lines:[
              'Most organizations treat AI like a search engine — ask a question, get a result, move on.',
              'But search doesn\'t build knowledge. Every session starts from zero.',
              'UCA changes this by giving knowledge a <strong>permanent address</strong>. Your AI doesn\'t search — it <em>resolves</em>.',
              'That\'s the shift: from search to memory. From context to canon.'
          ]},
        { title:'The Mach 1 Metaphor', date:'Mar 10, 2026',
          lines:[
              'In 1947, pilots kept dying trying to break the sound barrier. More power didn\'t help.',
              'The problem wasn\'t thrust — it was <strong>architecture</strong>. The airframe couldn\'t handle transonic forces.',
              'Your business has the same inflection point. More AI tools create turbulence.',
              'You don\'t need a bigger engine. You need a <em>better airframe</em>.'
          ]},
        { title:'11 Cognates, One Brain', date:'Mar 3, 2026',
          lines:[
              'Every business — regardless of industry or stage — thinks in the same 11 domains.',
              'We call these <strong>organizational cognates</strong>: the universal cognitive structure of business.',
              'Map them once with UCA, and your AI finally speaks your language.',
              'Not because it was trained on your data — because it was <em>given your architecture</em>.'
          ]},
        { title:'Canon vs. Context', date:'Feb 24, 2026',
          lines:[
              'Every RAG pipeline gives AI "context." But context is ephemeral — it vanishes after the session.',
              'Canon is the <strong>governing truth</strong> — the single source of authority that persists.',
              'When you give AI context, you\'re whispering. When you give it canon, you\'re <em>legislating</em>.',
              'The real unlock: not smarter prompts, but authoritative infrastructure.'
          ]},
        { title:'The DLM Thesis', date:'Feb 17, 2026',
          lines:[
              'LLMs are stateless. They process language brilliantly but don\'t <em>know</em> your business.',
              'The <strong>Domain Language Model</strong> bridges that gap with UCA + Org Brain sovereignty.',
              'The know-how is the asset. The processing is the commodity. DLM marries them.',
              'The result: AI that doesn\'t just respond — it <em>remembers and governs</em>.'
          ]}
    ];

    function renderReader(idx) {
        typeTimers.forEach(t => clearTimeout(t));
        typeTimers = [];
        const e = essays[idx];
        reader.innerHTML = `
            <div class="nl-reader__header">
                <div class="nl-reader__avatar">CK</div>
                <div class="nl-reader__from"><strong>Chris Kincade</strong><br>Starling CEO</div>
                <div class="nl-reader__date">${e.date}</div>
            </div>
            <div class="nl-reader__title">${e.title}</div>
            <div class="nl-reader__content" id="nlContent">
                ${e.lines.map((l,i) => `<p class="nl-reader__line" data-line="${i}">${l}</p>`).join('')}
            </div>
            <div class="nl-reader__cta">
                <a href="#newsletter" class="nl-reader__cta-link" id="nlCtaLink">Read full essay <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M0.5 5.5h7"/><path d="M5.5 1.5l4 4-4 4"/></svg></a>
            </div>
        `;
        const lines = reader.querySelectorAll('.nl-reader__line');
        lines.forEach((line, i) => {
            const t = setTimeout(() => line.classList.add('is-typed'), 150 + i * 200);
            typeTimers.push(t);
        });
        const cta = document.getElementById('nlCtaLink');
        if (cta) {
            const ct = setTimeout(() => cta.classList.add('is-typed'), 150 + lines.length * 200 + 300);
            typeTimers.push(ct);
        }
    }

    function setActive(idx) {
        items.forEach(el => el.classList.remove('is-active'));
        items[idx].classList.add('is-active');
        activeIdx = idx;
        renderReader(idx);
    }

    function showItems() {
        items.forEach((item, i) => {
            setTimeout(() => item.classList.add('is-visible'), i * 100);
        });
        setTimeout(() => renderReader(0), items.length * 100 + 200);
    }

    function startCycle() {
        cycleTimer = setInterval(() => {
            setActive((activeIdx + 1) % items.length);
        }, 6000);
    }

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            clearInterval(cycleTimer);
            setActive(i);
            startCycle();
        });
    });

    const nlObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showItems();
                setTimeout(startCycle, items.length * 100 + 1500);
                nlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    nlObserver.observe(inbox);
})();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});
