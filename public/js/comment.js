const commentHandler = async (event) => {
    event.preventDefault();
  
    const content = document.getElementById('.comment').value.trim();
   

    if (content) {
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        body: JSON.stringify({ content}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        alert(response.statusText);
      }
    }
};
  
document
    .querySelector('#submit-comment')
    .addEventListener('click', commentHandler);