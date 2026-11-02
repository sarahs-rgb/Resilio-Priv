(() => {
  const steps = [
    {
      title: 'Source: renewable energy begins outside the storage system',
      description: 'Sunlight or wind is an energy source. Available energy changes with the site and conditions; this model does not predict actual production.'
    },
    {
      title: 'Controller: manages energy from a source',
      description: 'A controller manages energy from a renewable source in a matched system. Its behavior and limits depend on the exact equipment and manufacturer documentation.'
    },
    {
      title: 'Storage: keeps energy for later',
      description: 'A battery stores energy so it may be available when the source is not producing. This animation does not model battery chemistry, protection, temperature, or faults.'
    },
    {
      title: 'Output: makes energy available to a device',
      description: 'A stand-alone system may provide documented AC or low-voltage outputs. Which output is appropriate depends on the exact device and manufacturer specifications.'
    },
    {
      title: 'Plug-in load: uses energy from a documented output',
      description: 'A compatible plug-in device uses energy from a documented output. This model does not check running demand, startup demand, compatibility, or safe operation.'
    }
  ];

  const root = document.querySelector('#energyFlow');
  const stepButtons = [...root.querySelectorAll('[data-flow-step]')];
  const heading = root.querySelector('#flowHeading');
  const description = root.querySelector('#flowDescription');
  const progress = root.querySelector('#flowProgress');
  const previous = root.querySelector('#flowPrevious');
  const next = root.querySelector('#flowNext');
  const play = root.querySelector('#flowPlay');
  let activeStep = 0;
  let playbackTimer;

  function stopPlayback() {
    window.clearInterval(playbackTimer);
    playbackTimer = undefined;
    root.classList.remove('is-playing');
    play.textContent = 'Play explanation';
    play.setAttribute('aria-pressed', 'false');
  }

  function showStep(index, fromPlayback = false) {
    activeStep = Math.max(0, Math.min(steps.length - 1, index));
    const step = steps[activeStep];
    heading.textContent = step.title;
    description.textContent = step.description;
    progress.textContent = `Step ${activeStep + 1} of ${steps.length}`;
    previous.disabled = activeStep === 0;
    next.disabled = activeStep === steps.length - 1;
    stepButtons.forEach((button, buttonIndex) => {
      button.setAttribute('aria-pressed', String(buttonIndex === activeStep));
    });

    if (!fromPlayback) stopPlayback();
  }

  stepButtons.forEach((button) => {
    button.addEventListener('click', () => showStep(Number(button.dataset.flowStep)));
  });
  previous.addEventListener('click', () => showStep(activeStep - 1));
  next.addEventListener('click', () => showStep(activeStep + 1));
  play.addEventListener('click', () => {
    if (playbackTimer !== undefined) {
      stopPlayback();
      return;
    }

    if (activeStep === steps.length - 1) showStep(0, true);
    root.classList.add('is-playing');
    play.textContent = 'Pause explanation';
    play.setAttribute('aria-pressed', 'true');
    playbackTimer = window.setInterval(() => {
      if (activeStep === steps.length - 1) {
        stopPlayback();
      } else {
        showStep(activeStep + 1, true);
      }
    }, 2200);
  });

  showStep(0);
})();
