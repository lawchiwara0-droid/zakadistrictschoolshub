(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  const state = {
    tab: 'home',
    stack: [], // drill-down history within a tab: {label, render}
    promptVersion: {}, // code -> 'full' | 'wa'
    promptCat: 'Scheme'
  };

  function setHeader(eyebrow, title, showBack){
    $('#header-eyebrow').textContent = eyebrow;
    $('#header-title').textContent = title;
    $('#back-row').style.display = showBack ? 'flex' : 'none';
  }

  function showTab(tab, resetStack){
    state.tab = tab;
    if (resetStack !== false) state.stack = [];
    $$('section').forEach(s => s.classList.remove('active'));
    $$('nav.tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    render();
  }

  $$('nav.tabbar button').forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });

  $('#back-btn').addEventListener('click', () => {
    state.stack.pop();
    render();
  });

  function push(frame){
    state.stack.push(frame);
    render();
  }

  function render(){
    const top = state.stack[state.stack.length - 1];
    if (top){
      setHeader(top.eyebrow || 'Zaka District Schools', top.title, true);
    } else {
      const map = {
        home: ['Zaka District Schools', 'AI Hub'],
        guide: ['Offline Mini-Guide', 'How to Access AI Tools'],
        modules: ['Learn the workflow', 'Modules'],
        prompts: ['Copy, paste, generate', 'Prompt Studio'],
        pilot: ['4-week rollout', 'Pilot Toolkit']
      };
      const [eb, t] = map[state.tab];
      setHeader(eb, t, false);
    }
    $$('section').forEach(s => s.classList.remove('active'));
    const sectionId = '#view-' + state.tab;
    $(sectionId).classList.add('active');

    if (top){
      $(sectionId).innerHTML = top.html;
      if (top.after) top.after();
    } else {
      renderTab(state.tab);
    }
  }

  function renderTab(tab){
    const el = $('#view-' + tab);
    if (tab === 'home') el.innerHTML = homeHTML();
    if (tab === 'guide') el.innerHTML = guideHTML();
    if (tab === 'modules') el.innerHTML = modulesHTML();
    if (tab === 'prompts') { el.innerHTML = promptsHTML(); wirePrompts(el); }
    if (tab === 'pilot') el.innerHTML = pilotHTML();

    if (tab === 'home') wireHome(el);
    if (tab === 'guide') wireGuideAccordion(el);
    if (tab === 'modules') wireModuleList(el);
  }

  // ---------- HOME ----------
  function homeHTML(){
    return `
      <div class="hero-board">
        <div class="stat">10 min</div>
        <div class="stat-label">to draft a 6-week scheme, instead of two hours typing from scratch</div>
        <h2>${CONTENT.meta.tagline}</h2>
        <p>Read every tutorial and prompt offline. Connect briefly, on Wi-Fi or your own data, only when you're ready to generate a new draft.</p>
      </div>
      <div class="section-label">Jump in</div>
      <div class="quick-grid">
        <button class="quick-card" data-go="guide">
          <div class="k-title">Mini-Guide</div>
          <div class="k-sub">Get set up with AI, low-data</div>
        </button>
        <button class="quick-card" data-go="modules">
          <div class="k-title">Modules</div>
          <div class="k-sub">Learn the scheme workflow</div>
        </button>
        <button class="quick-card" data-go="prompts">
          <div class="k-title">Prompt Studio</div>
          <div class="k-sub">Copy a ready prompt</div>
        </button>
        <button class="quick-card" data-go="pilot">
          <div class="k-title">Pilot Toolkit</div>
          <div class="k-sub">Feedback form & timeline</div>
        </button>
      </div>
      <div class="section-label">Sample output</div>
      <div class="sample-card">
        <h3>${CONTENT.samples[0].title}</h3>
        <div class="sample-meta">${CONTENT.samples[0].meta}</div>
        <p>${CONTENT.samples[0].body.split('\n\n')[0]}</p>
      </div>
    `;
  }
  function wireHome(el){
    el.querySelectorAll('[data-go]').forEach(b => {
      b.addEventListener('click', () => showTab(b.dataset.go));
    });
  }

  // ---------- GUIDE ----------
  function guideHTML(){
    return `
      <div class="section-label">5 things to know before you start</div>
      <div>
        ${CONTENT.mini_guide.map((g,i) => `
          <div class="accordion-item ${i===0?'open':''}" data-idx="${i}">
            <div class="accordion-head">${g.title}<span class="plus">${i===0?'–':'+'}</span></div>
            <div class="accordion-body"><p>${g.body}</p></div>
          </div>
        `).join('')}
      </div>
    `;
  }
  function wireGuideAccordion(el){
    el.querySelectorAll('.accordion-item').forEach(item => {
      const head = item.querySelector('.accordion-head');
      head.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        el.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.plus').textContent = '+';
        });
        if (!wasOpen){
          item.classList.add('open');
          item.querySelector('.plus').textContent = '–';
        }
      });
    });
  }

  // ---------- MODULES ----------
  function modulesHTML(){
    return `
      <div class="section-label">Three modules, in order</div>
      <div class="card-list">
        ${CONTENT.modules.map(m => `
          <div class="list-card" data-mod="${m.id}">
            <span class="lc-arrow">›</span>
            <div class="lc-title">${m.title}</div>
            <div class="lc-sub">${m.subtitle} · ${m.tutorials.length} tutorials</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  function wireModuleList(el){
    el.querySelectorAll('[data-mod]').forEach(card => {
      card.addEventListener('click', () => {
        const mod = CONTENT.modules.find(m => m.id === card.dataset.mod);
        push({
          title: mod.title,
          eyebrow: 'Modules',
          html: moduleDetailHTML(mod),
          after: () => wireModuleDetail(mod)
        });
      });
    });
  }
  function moduleDetailHTML(mod){
    return `
      <div>
        ${mod.tutorials.map(t => `
          <div class="step-card">
            <h3>${t.title}</h3>
            <p>${t.body}</p>
            ${t.promptRefs ? `<div>${t.promptRefs.map(code => `<span class="prompt-chip" data-code="${code.replace('-WA','')}">${code}</span>`).join('')}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  function wireModuleDetail(mod){
    $('#view-modules').querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        showTab('prompts', true);
        setTimeout(() => {
          const codeBase = chip.dataset.code;
          const catBtn = [...document.querySelectorAll('.cat-tab')].find(b => {
            const p = CONTENT.prompts.find(pr => pr.code === codeBase);
            return p && b.dataset.cat === p.category;
          });
          if (catBtn) catBtn.click();
        }, 0);
      });
    });
  }

  // ---------- PROMPT STUDIO ----------
  function promptsHTML(){
    const cats = [...new Set(CONTENT.prompts.map(p => p.category))];
    return `
      <div class="cat-tabs">
        ${cats.map(c => `<button class="cat-tab ${c===state.promptCat?'active':''}" data-cat="${c}">${c}</button>`).join('')}
      </div>
      <div id="prompt-list"></div>
    `;
  }
  function renderPromptList(el){
    const list = CONTENT.prompts.filter(p => p.category === state.promptCat);
    el.querySelector('#prompt-list').innerHTML = list.map(p => {
      const version = state.promptVersion[p.code] || 'full';
      const text = version === 'full' ? p.full : p.wa;
      return `
        <div class="prompt-card" data-code="${p.code}">
          <div class="pc-code">${p.code}</div>
          <h3>${p.title}</h3>
          <div class="version-toggle">
            <button class="v-btn ${version==='full'?'active':''}" data-v="full">Full (browser AI)</button>
            <button class="v-btn ${version==='wa'?'active':''}" data-v="wa">WhatsApp-length</button>
          </div>
          <div class="prompt-text">${text}</div>
          <div class="btn-row">
            <button class="btn btn-copy" data-action="copy">Copy prompt</button>
            <button class="btn btn-wa" data-action="wa">Open in WhatsApp</button>
          </div>
        </div>
      `;
    }).join('');
    wirePromptCards(el);
  }
  function wirePrompts(el){
    el.querySelectorAll('.cat-tab').forEach(b => {
      b.addEventListener('click', () => {
        state.promptCat = b.dataset.cat;
        el.querySelectorAll('.cat-tab').forEach(x => x.classList.toggle('active', x === b));
        renderPromptList(el);
      });
    });
    renderPromptList(el);
  }
  function wirePromptCards(el){
    el.querySelectorAll('.prompt-card').forEach(card => {
      const code = card.dataset.code;
      card.querySelectorAll('.v-btn').forEach(vb => {
        vb.addEventListener('click', () => {
          state.promptVersion[code] = vb.dataset.v;
          renderPromptList(el);
        });
      });
      card.querySelector('[data-action="copy"]').addEventListener('click', (e) => {
        const text = card.querySelector('.prompt-text').textContent;
        copyToClipboard(text);
        flashCopied(e.target);
      });
      card.querySelector('[data-action="wa"]').addEventListener('click', () => {
        const text = card.querySelector('.prompt-text').textContent;
        window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
      });
    });
  }
  function copyToClipboard(text){
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }
  function fallbackCopy(text){
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e){}
    document.body.removeChild(ta);
  }
  function flashCopied(btn){
    const original = btn.textContent;
    btn.textContent = 'Copied ✓';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1400);
  }

  // ---------- PILOT ----------
  function pilotHTML(){
    return `
      <div class="section-label">Weekly feedback form</div>
      <div class="sample-card" style="margin-bottom:20px;">
        ${CONTENT.feedback_questions.map((q,i) => `
          <div class="feedback-q">
            <div class="qn">${i+1}.</div>
            <p>${q}</p>
          </div>
        `).join('')}
        <div class="btn-row" style="margin-top:12px;">
          <button class="btn btn-copy" id="copy-feedback">Copy form text</button>
          <button class="btn btn-wa" id="wa-feedback">Send via WhatsApp</button>
        </div>
      </div>

      <div class="section-label">4-week timeline</div>
      ${CONTENT.pilot_timeline.map(row => `
        <div class="timeline-card">
          <div class="tc-week">${row.week}</div>
          <h3>${row.focus}</h3>
          <div class="tc-row"><b>Activity —</b> ${row.activity}</div>
          <div class="tc-row"><b>Milestone —</b> ${row.milestone}</div>
          <div class="tc-row"><b>Check-in —</b> ${row.checkin}</div>
        </div>
      `).join('')}
    `;
  }

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'copy-feedback'){
      copyToClipboard(feedbackFormText());
      flashCopied(e.target);
    }
    if (e.target && e.target.id === 'wa-feedback'){
      window.open('https://wa.me/?text=' + encodeURIComponent(feedbackFormText()), '_blank');
    }
  });
  function feedbackFormText(){
    return 'Weekly Pilot Feedback — Zaka District Schools AI Hub\n\n' +
      CONTENT.feedback_questions.map((q,i) => `${i+1}. ${q}`).join('\n\n');
  }

  // init
  render();

  // register service worker for offline use
  if ('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
})();
