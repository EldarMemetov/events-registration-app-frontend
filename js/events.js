import { fetchEventsApi, fetchParticipantsByEventIdApi } from './api.js';
import { updateParticipantsList } from './registration.js';
import { showMessage } from './utils.js';

export async function fetchEvents() {
  try {
    const events = await fetchEventsApi();
    displayEvents(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    showMessage('Failed to fetch events!', true);
  }
}

function displayEvents(events) {
  const eventsList = document.getElementById('events-list');
  eventsList.innerHTML = '';

  events.forEach(event => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${event.title}</strong> - ${new Date(
      event.eventDate
    ).toLocaleDateString()}
      <button onclick="toggleDetails('${event._id}')">Details</button>
      <div id="details-${event._id}" style="display: none;">
        <p>${event.description}</p>
        <button onclick="openRegistrationModal('${
          event._id
        }')">Register</button>
        <h4>Registered Participants:</h4>
        <ul id="participants-${event._id}"></ul>
      </div>
    `;
    eventsList.appendChild(listItem);
  });
}

export function toggleDetails(eventId) {
  const details = document.getElementById(`details-${eventId}`);
  details.style.display = details.style.display === 'none' ? 'block' : 'none';
  if (details.style.display === 'block') {
    fetchParticipants(eventId);
  }
}

async function fetchParticipants(eventId) {
  try {
    const participants = await fetchParticipantsByEventIdApi(eventId);
    updateParticipantsList(participants, eventId);
  } catch (error) {
    console.error('Failed to fetch participants:', error);
  }
}
