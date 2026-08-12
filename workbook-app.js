/* Ella Content Workbook — renderer, autosave, and export. Vanilla JS. */
(function () {
  var STORE = 'ella_wb_v1__';
  var flags = {
    source: { txt: 'NEEDS A SOURCE', cls: 'flag-source' },
    real:   { txt: 'MUST BE REAL', cls: 'flag-real' },
    scope:  { txt: 'PENDING SCOPE (Q1)', cls: 'flag-scope' },
  };

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function key(id) { return STORE + id; }

  var allSlots = [];
  WORKBOOK.forEach(function (sec) { sec.slots.forEach(function (s) { allSlots.push(s); }); });

  function filledCount() {
    var n = 0;
    allSlots.forEach(function (s) { if ((localStorage.getItem(key(s.id)) || '').trim()) n++; });
    return n;
  }

  function updateProgress() {
    var done = filledCount(), total = allSlots.length;
    var pct = Math.round(done / total * 100);
    document.getElementById('wb-count').textContent = done + ' / ' + total + ' slots written';
    document.getElementById('wb-bar-fill').style.width = pct + '%';
  }

  function autosize(ta) { ta.style.height = 'auto'; ta.style.height = Math.max(ta.scrollHeight, 44) + 'px'; }

  function render() {
    var root = document.getElementById('wb-sections');
    WORKBOOK.forEach(function (sec, si) {
      var secEl = el('section', 'wb-sec');
      secEl.id = 'sec-' + si;
      var head = el('div', 'wb-sec-head');
      head.appendChild(el('h2', null, esc(sec.page)));
      if (sec.blurb) head.appendChild(el('p', 'wb-sec-blurb', esc(sec.blurb)));
      secEl.appendChild(head);

      sec.slots.forEach(function (slot) {
        var card = el('div', 'wb-slot');
        var top = el('div', 'wb-slot-top');
        top.appendChild(el('span', 'wb-slot-label', esc(slot.label)));
        if (slot.flag && flags[slot.flag]) {
          top.appendChild(el('span', 'wb-flag ' + flags[slot.flag].cls, flags[slot.flag].txt));
        }
        card.appendChild(top);
        if (slot.guide) card.appendChild(el('p', 'wb-guide', esc(slot.guide)));
        if (slot.current) {
          var cur = el('div', 'wb-current');
          cur.appendChild(el('span', 'wb-current-tag', 'On the site now'));
          cur.appendChild(el('div', 'wb-current-text', esc(slot.current).replace(/\n/g, '<br>')));
          card.appendChild(cur);
        }
        var ta = el('textarea', 'wb-input');
        ta.placeholder = 'Your words…';
        ta.value = localStorage.getItem(key(slot.id)) || '';
        ta.addEventListener('input', function () {
          localStorage.setItem(key(slot.id), ta.value);
          autosize(ta);
          updateProgress();
        });
        card.appendChild(ta);
        secEl.appendChild(card);
        // size after insert
        requestAnimationFrame(function () { autosize(ta); });
      });
      root.appendChild(secEl);
    });
    updateProgress();
  }

  function buildExport() {
    var out = ['ELLA — CONTENT WORKBOOK', 'Filled: ' + filledCount() + ' / ' + allSlots.length, ''];
    WORKBOOK.forEach(function (sec) {
      out.push('========================================');
      out.push(sec.page.toUpperCase());
      out.push('========================================');
      sec.slots.forEach(function (s) {
        var v = (localStorage.getItem(key(s.id)) || '').trim();
        out.push('');
        out.push('— ' + s.label + (s.flag ? '  [' + (flags[s.flag] ? flags[s.flag].txt : s.flag) + ']' : ''));
        out.push(v ? v : '(not yet written)');
      });
      out.push('');
    });
    return out.join('\n');
  }

  function flash(msg) {
    var t = document.getElementById('wb-toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(flash._t);
    flash._t = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();

    document.getElementById('wb-copy').addEventListener('click', function () {
      var text = buildExport();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { flash('Copied! Paste it back to me in the chat.'); },
          function () { fallbackCopy(text); }
        );
      } else { fallbackCopy(text); }
    });
    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); flash('Copied! Paste it back to me in the chat.'); }
      catch (e) { flash('Press Ctrl/Cmd+C to copy.'); }
      document.body.removeChild(ta);
    }

    document.getElementById('wb-download').addEventListener('click', function () {
      var blob = new Blob([buildExport()], { type: 'text/plain' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ella-content.txt';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      flash('Downloaded ella-content.txt');
    });

    document.getElementById('wb-clear').addEventListener('click', function () {
      if (!confirm('Clear everything you\u2019ve written here? This can\u2019t be undone.')) return;
      allSlots.forEach(function (s) { localStorage.removeItem(key(s.id)); });
      document.querySelectorAll('.wb-input').forEach(function (ta) { ta.value = ''; autosize(ta); });
      updateProgress();
      flash('Cleared.');
    });
  });
})();
