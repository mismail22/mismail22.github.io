// Progressive enhancement for the contact form. Without JS the form posts
// directly to Formspree.

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const label = form.querySelector<HTMLElement>('[data-submit-label]')!;

  const setStatus = (message: string, tone: 'muted' | 'success' | 'error' = 'muted') => {
    status.textContent = message;
    status.classList.toggle('text-accent', tone === 'success');
    status.classList.toggle('text-red-400', tone === 'error');
    status.classList.toggle('text-muted', tone === 'muted');
  };

  const setBusy = (busy: boolean) => {
    submit.disabled = busy;
    label.textContent = busy ? 'Sending…' : 'Send message';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get('_gotcha')) return;

    setBusy(true);
    setStatus('');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        const json = await response.json().catch(() => null);
        throw new Error(json?.errors?.map((e: { message: string }) => e.message).join(', ') || response.statusText);
      }
      form.reset();
      setStatus("Thanks, your message was sent. I'll reply by email.", 'success');
    } catch (error) {
      const reason = error instanceof Error && error.message ? ` (${error.message})` : '';
      setStatus(`Message not sent${reason}. Try again, or message me on LinkedIn.`, 'error');
    } finally {
      setBusy(false);
    }
  });
}
