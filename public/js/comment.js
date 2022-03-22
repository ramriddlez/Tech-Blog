const commentHandler = async (event) => {

    event.preventDefault();
  
    const content = document.getElementById('comment').value.trim();
    const post_id = document.querySelector('#submit-comment').getAttribute('data-post_id')

    console.log(post_id)
    console.log(content)
    if (content) {
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        body: JSON.stringify({ content, post_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
      } else {
        alert(response.statusText);
      }
    }
};
  
document
    .querySelector('#submit-comment')
    .addEventListener('click', commentHandler);
// console.log(document.querySelector('#submit-comment').getAttribute('data-post_id') );

console.log('connected')