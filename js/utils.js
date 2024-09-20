export function showMessage(message, isError = false) {
  const messageBox = document.getElementById('message-box');
  messageBox.textContent = message;
  messageBox.style.color = isError ? 'red' : 'green';
  messageBox.style.display = 'block';
}
