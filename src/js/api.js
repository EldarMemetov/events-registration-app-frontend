export async function registerParticipantApi(participantData) {
  const response = await axios.post(
    "https://events-registration-app-backend-cwou.onrender.com/api/participants",
    participantData
  );
  return response.data;
}

export async function fetchEventsApi() {
  const response = await axios.get(
    "https://events-registration-app-backend-cwou.onrender.com/api/events"
  );
  return response.data;
}

export async function fetchParticipantsByEventIdApi(eventId) {
  const response = await axios.get(
    `https://events-registration-app-backend-cwou.onrender.com/api/participants/${eventId}`
  );
  return response.data;
}
