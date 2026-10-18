(() => {
  if (typeof navigator.clipboard?.writeText !== 'function') {
    return;
  }

  const COPY_ICON =
    '<svg width="16" height="16" aria-hidden="true"><use href="/assets/icons/copy.svg#copy-icon"/></svg>';
  const FEEDBACK_DURATION_MS = 2000;

  document.querySelectorAll('.post-content pre').forEach((pre) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.replaceWith(wrapper);

    const toolbar = document.createElement('div');
    toolbar.className = 'code-block-toolbar';
    wrapper.append(toolbar, pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `${COPY_ICON}<span class="copy-code-label" role="status"></span>`;
    toolbar.append(button);

    const label = button.querySelector('.copy-code-label');
    let timeout;

    const showFeedback = (message) => {
      label.textContent = message;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        label.textContent = '';
      }, FEEDBACK_DURATION_MS);
    };

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        showFeedback('Copied!');
      } catch {
        showFeedback('Failed');
      }
    });
  });
})();
