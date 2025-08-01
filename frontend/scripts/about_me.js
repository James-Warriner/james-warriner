document.addEventListener('DOMContentLoaded', () => {
  const openBtn    = document.getElementById('openFullResponse');
  const respPre    = document.getElementById('response');
  const modalPre   = document.getElementById('modalResponse');
  const respModal  = new bootstrap.Modal(document.getElementById('responseModal'));

  openBtn.addEventListener('click', () => {
  
    modalPre.textContent = respPre.textContent || '[ no response ]';
 
    respModal.show();
  });
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

    document.getElementById('apiSend').addEventListener('click',async()=>{
        const urlPart = document.getElementById('urlPart').value

        const jsonData = await getInfo(urlPart)
  
  

        document.getElementById('response').innerText = JSON.stringify(jsonData,null,2)
    })

        document.getElementById('showGUI').addEventListener('click',async()=>{
        let urlPart = document.getElementById('infoType').value
        const textArea = document.getElementById('GUIsection')
        
        if (urlPart !== 'All'){
            const jsonData = await getInfo(`about_me?section=${urlPart}`)


            textArea.innerHTML = renderData(jsonData)
            

           
        }

        else{
            const all = await getInfo('about_me')
            textArea.innerHTML = renderData(all)
        }

        
  
  

        document.getElementById('response').innerText = JSON.stringify(jsonData,null,2)
    })


    async function getInfo(urlPart){
        const url = `https://james-warriner-api.onrender.com/api/${urlPart}`
        try{
            const res = await fetch(url,
            {
                method:"GET",
                headers:{'Content-Type':'application/json'}
            }
        )

        const data = await res.json()

        return data
        }
        catch(err){
            return err
        }
        

        
    }


    function renderData(data) {

  if (Array.isArray(data)) {
    return data
      .map((item, i) => 
        `<div class="json-array-item">
           ${renderData(item)}
         </div>`)
      .join('');
  }


  if (data !== null && typeof data === 'object') {
    return Object.entries(data)
      .map(([key, value]) => {

        if (Array.isArray(value)) {
          return `<section class="json-section">
                    <h3>${key}</h3>
                    ${renderData(value)}
                  </section>`;
        }

        if (value !== null && typeof value === 'object') {
          return `<section class="json-section">
                    <h3>${key}</h3>
                    ${renderData(value)}
                  </section>`;
        }

        return `<div class="json-kv">
                  <h4>${key}</h4>
                  <p>${value}</p>
                </div>`;
      })
      .join('');
  }


  return `<p>${data}</p>`;
}
