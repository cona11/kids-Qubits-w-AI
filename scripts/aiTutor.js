// Enhanced AI tutor using local lesson data and logging
async function askAIQuestion() {
  const questionEl = document.getElementById('ai-question');
  const responseEl = document.getElementById('ai-response');
  const question = questionEl.value.trim();
  if (!question) return;

  // Simple keyword-based responses using lessons data
  const lessons = await QuantumDB.getAllLessons();
  let response = 'That is a great question! Try asking about superposition or entanglement.';

  if (question.toLowerCase().includes('superposition')) {
    const l = lessons.find(x => x.title.toLowerCase().includes('superposition'));
    response = l ? l.content : 'Superposition lets a qubit be in multiple states at once.';
  } else if (question.toLowerCase().includes('entanglement')) {
    response = 'Entanglement is when two qubits are connected so the state of one affects the other.';
  } else if (question.toLowerCase().includes('qubit')) {
    const l = lessons.find(x => x.title.toLowerCase().includes('qubit'));
    response = l ? l.content : 'A qubit is the basic unit of quantum information.';
  }

  responseEl.innerText = response;
  await QuantumDB.saveQA(question, response);
}
