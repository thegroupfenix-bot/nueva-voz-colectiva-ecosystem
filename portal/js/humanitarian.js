(function(){
  const copyButton = document.querySelector('[data-copy-campaign-link]');
  const status = document.getElementById('humanitarian-copy-status');

  if(copyButton && status){
    copyButton.addEventListener('click', async function(){
      const campaignUrl = 'https://corporacionnuevavozcolectiva.org/ayuda-humanitaria.html';
      try{
        await navigator.clipboard.writeText(campaignUrl);
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
      }
      status.textContent = 'Enlace copiado.';
    });
  }

  const modal = document.getElementById('humanitarian-poster-modal');
  const modalImage = document.getElementById('humanitarian-modal-image');
  const modalTitle = document.getElementById('humanitarian-modal-title');
  const modalOpen = document.getElementById('humanitarian-modal-open');
  const triggers = document.querySelectorAll('[data-poster]');
  let lastTrigger = null;

  if(!modal || !modalImage || !modalTitle || !modalOpen || !triggers.length) return;

  function openModal(trigger){
    const source = trigger.getAttribute('data-poster');
    const title = trigger.getAttribute('data-poster-title') || 'Guía de donación';
    lastTrigger = trigger;
    modalTitle.textContent = title;
    modalImage.src = source;
    modalImage.alt = 'Pieza oficial Valle Solidario: ' + title;
    modalOpen.href = source;
    modal.hidden = false;
    document.body.classList.add('humanitarian-modal-open');
    modal.querySelector('.humanitarian-modal-close').focus();
  }

  function closeModal(){
    modal.hidden = true;
    modalImage.removeAttribute('src');
    document.body.classList.remove('humanitarian-modal-open');
    if(lastTrigger) lastTrigger.focus();
  }

  triggers.forEach(function(trigger){
    trigger.addEventListener('click', function(){ openModal(trigger); });
  });
  modal.querySelectorAll('[data-modal-close]').forEach(function(control){
    control.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && !modal.hidden) closeModal();
  });
})();
