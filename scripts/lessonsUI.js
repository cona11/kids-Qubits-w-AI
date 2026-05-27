// Lesson and quiz UI
async function loadLessonsUI() {
  const lessons = await QuantumDB.getAllLessons();
  const container = document.getElementById('lessons-list');
  container.innerHTML = '';
  lessons.forEach(l => {
    const el = document.createElement('div');
    el.className = 'lesson-item';
    el.innerHTML = `<h3>${l.title}</h3><p>${l.content}</p><button data-id="${l.id}">Take Quiz</button>`;
    el.querySelector('button').addEventListener('click', () => startQuiz(l));
    container.appendChild(el);
  });
}

function startQuiz(lesson) {
  const q = lesson.quiz[0];
  const quizArea = document.getElementById('quiz-area');
  quizArea.innerHTML = `<h4>${q.question}</h4>`;
  q.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.innerText = opt;
    b.addEventListener('click', async () => {
      const correct = i === q.answer;
      quizArea.innerHTML = `<p>${correct ? 'Correct!' : 'Incorrect. The correct answer is: ' + q.options[q.answer]}</p>`;
      await QuantumDB.saveProgress(lesson.id, { completed: true, correct });
    });
    quizArea.appendChild(b);
  });
}
