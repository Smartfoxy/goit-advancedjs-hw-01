const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formData = { email: '', message: '' };

function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    formData.email = parsed.email ?? '';
    formData.message = parsed.message ?? '';
  } catch {
    return;
  }

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

loadFormData();

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!(name in formData)) {
    return;
  }

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
