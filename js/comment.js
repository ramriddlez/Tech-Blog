const commentHandler = async (event) => {

    event.preventDefault();
  
    const content = document.getElementById('Textarea6').value.trim();
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    console.log(post_id)
    console.log(content)
    if (content) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, post_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
};
  
document
    .querySelector('.form-group')
    .addEventListener('submit', commentHandler);
// console.log(document.querySelector('#submit-comment').getAttribute('data-post_id') );

console.log('connected')