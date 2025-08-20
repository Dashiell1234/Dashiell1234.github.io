window.onload = function () {
  const page = document.body.getAttribute('data-page'); // "1", "2", "3", "4"
  const endpoint = `/comments/${page}`;

  const Namebox = document.getElementById('Nameboxid');
  const Messagebox = document.getElementById('Messageboxid');
  const sendButton = document.getElementById('SendButton');

  function updateSendButton() {
    sendButton.disabled = !(Namebox.value.trim() && Messagebox.value.trim());
  }

  Namebox.addEventListener("input", updateSendButton);
  Messagebox.addEventListener("input", updateSendButton);
  updateSendButton();

  // Load comments
  fetch(endpoint)
    .then(res => res.json())
    .then(data => renderComments(data))
    .catch(console.error);

  // Send new comment
  sendButton.addEventListener("click", () => {
    const newComment = { user: { username: Namebox.value }, content: Messagebox.value };

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    })
      .then(res => res.json())
      .then(() => {
        renderComments([newComment]);
        Namebox.value = "";
        Messagebox.value = "";
        sendButton.disabled = true;
      })
      .catch(console.error);
  });
};

let messageCount = 0;

function renderComments(comments) {
  const section = document.querySelector('.CommentSection');
  const template = document.getElementById('MessageBox');

  comments.forEach(comment => {
    messageCount++;
    const clone = template.cloneNode(true);
    clone.id = `Message${messageCount}`;
    clone.style.display = 'flex';
    clone.querySelector('.CommentName').textContent = comment.user.username;
    clone.querySelector('.CommentMessage').textContent = comment.content;
    section.appendChild(clone);
  });

  document.getElementById('Counter').textContent = "Reviews: " + messageCount;
}
