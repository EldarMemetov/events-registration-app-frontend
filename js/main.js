import { fetchEvents, toggleDetails } from './events.js';
import {
  handleRegistrationSubmit,
  closeRegistrationModal,
  openRegistrationModal,
} from './registration.js';

document
  .getElementById('registration-form')
  .addEventListener('submit', handleRegistrationSubmit);
document
  .getElementById('close-modal-button')
  .addEventListener('click', closeRegistrationModal);

fetchEvents();

window.toggleDetails = toggleDetails;
window.openRegistrationModal = openRegistrationModal;
