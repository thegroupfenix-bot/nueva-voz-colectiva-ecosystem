(function(){
  const copyButton = document.querySelector('[data-copy-campaign-link]');
  const status = document.getElementById('humanitarian-copy-status');
  if(!copyButton || !status) return;

  copyButton.addEventListener('click', async function(){
    const campaignUrl = 'https://corporacionnuevavozcolectiva.org/ayuda-humanitaria.html';
    try{
      await navigator.clipboard.writeText(campaignUrl);
      status.textContent = 'Enlace copiado.';
    }catch(error){
      const field = document.createElement('textarea');
      field.value = campaignUrl;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
      status.textContent = 'Enlace copiado.';
    }
  });
})();
