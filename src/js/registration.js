import { registerParticipantApi } from './api.js';
import { showMessage } from './utils.js';

export async function handleRegistrationSubmit(event) {
  event.preventDefault();

  const selectedSources = Array.from(
    document.querySelectorAll('input[name="source"]:checked')
  ).map(checkbox => checkbox.value);

  const participantData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    dateOfBirth: document.getElementById('dateOfBirth').value,
    source: selectedSources.join(', '),
    eventId: document.getElementById('eventId').value,
  };

  try {
    const response = await registerParticipantApi(participantData);
    console.log('Registration successful:', response);
    showMessage('Registration successful!', false);

    document.getElementById('registration-form').reset();
    document.getElementById('registration-modal').style.display = 'none';

    updateParticipantsList([response], participantData.eventId);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Registration failed:', errorMessage);
    showMessage(`Registration failed: ${errorMessage}`, true);
  }
}

export function openRegistrationModal(eventId) {
  document.getElementById('eventId').value = eventId;
  document.getElementById('registration-modal').style.display = 'block';
}

export function closeRegistrationModal() {
  document.getElementById('registration-modal').style.display = 'none';
}

export function updateParticipantsList(participants, eventId) {
  const participantsList = document.getElementById(`participants-${eventId}`);
  participants.forEach(participant => {
    const listItem = document.createElement('li');
    listItem.textContent = `${participant.fullName} - ${participant.email}`;
    participantsList.appendChild(listItem);
  });
}
