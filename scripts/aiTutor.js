function askAIQuestion() {
  const question = document.getElementById('ai-question').value;
  let response;

  if (question.toLowerCase().includes('superposition')) {
    response = 'Superposition is the ability of a quantum system to be in multiple states at once.';
  } else if (question.toLowerCase().includes('entanglement')) {
    response = 'Entanglement is a connection between qubits where the state of one affects the other, instantly, no matter the distance.';
  } else {
    response = 'That is a great question! Let me get back to you on that.';
  }

  document.getElementById('ai-response').innerText = response;
}