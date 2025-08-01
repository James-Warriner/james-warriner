

document.addEventListener('DOMContentLoaded', () => {

  const openBtn    = document.getElementById('openFullResponse');
  const respPre    = document.getElementById('response');
  const modalPre   = document.getElementById('modalResponse');
  const respModal  = new bootstrap.Modal(
    document.getElementById('responseModal'),
    {}
  );
  const sendBtn    = document.getElementById('apiSend');
  const showGuiBtn = document.getElementById('showGUI');


  openBtn.addEventListener('click', () => {
    respModal.show();
  });


  sendBtn.addEventListener('click', async () => {
    const urlPart = document.getElementById('urlPart').value;
    try {
      const jsonData = await getInfo(urlPart);
      const pretty   = JSON.stringify(jsonData, null, 2);

    
      respPre.textContent  = pretty;
      modalPre.textContent = pretty;
    } catch (err) {
      const msg = `Error: ${err.message || err}`;
      respPre.textContent  = msg;
      modalPre.textContent = msg;
    }
  });


  showGuiBtn.addEventListener('click', async () => {
    const section = document.getElementById('infoType').value;
    const display = document.getElementById('GUIsection');

    try {
      let data;
      if (section === 'All') {
        data = await getInfo('about_me');
      } else {
        data = await getInfo(`about_me?section=${section}`);
      }
      display.innerHTML = renderData(data);

   
      const pretty = JSON.stringify(data, null, 2);
      respPre.textContent  = pretty;
      modalPre.textContent = pretty;
    } catch (err) {
      display.innerHTML   = `<p class="text-danger">Error: ${err}</p>`;
      respPre.textContent = respPre.textContent || '';
      modalPre.textContent = modalPre.textContent || '';
    }
  });


  document
    .querySelectorAll('input[name="mode"]')
    .forEach(radio => {
      radio.addEventListener('change', e => {
        document
          .querySelectorAll('.mode-content')
          .forEach(sec => sec.classList.remove('active'));
        document
          .getElementById(e.target.value + '-content')
          .classList.add('active');
      });
    });
 
  document.getElementById('api-content').classList.add('active');
});




async function getInfo(urlPart) {
  const url = `https://james-warriner-api.onrender.com/api/${urlPart}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}


function renderData(data) {
  if (Array.isArray(data)) {
    return data
      .map(item => `<div class="json-array-item">${renderData(item)}</div>`)
      .join('');
  }

  if (data && typeof data === 'object') {
    return Object.entries(data)
      .map(([k, v]) => {
        if (Array.isArray(v) || (v && typeof v === 'object')) {
          return `
            <section class="json-section">
              <h3>${k}</h3>
              ${renderData(v)}
            </section>`;
        } else {
          return `
            <div class="json-kv">
              <h4>${k}</h4>
              <p>${v}</p>
            </div>`;
        }
      })
      .join('');
  }

  return `<p>${data}</p>`;
}
