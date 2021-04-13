let addPostBtn = document.querySelector('.create-post-btn');

document.addEventListener('DOMContentLoaded', async () => {
	let posts = await getPosts();
	let articles = document.querySelector('.articles');
	articles.innerHTML = '';
	posts.forEach((post) => {
		let postHTML = `
        <article class="d-flex justify-content-between align-items-center">
            <div class="id w5">${post.id}</div>
            <div class="name w30">${post.title}</div>
            <div class="date w30">${post.date}</div>
            <div class="country w20">${post.country}</div>
            <div class="edit w10"><button class="btn btn-link">Edit</button></div>
            <div class="remove w5"><button class="btn btn-link">X</button></div> 
        </article>`;
		articles.insertAdjacentHTML('beforeend', postHTML);
	});
});

addPostBtn.addEventListener('click', () => {
	document.getElementById('v-pills-articles').classList.remove('show');
	document.getElementById('v-pills-articles').classList.remove('active');
	document.getElementById('v-pills-create-post').classList.add('show');
	document.getElementById('v-pills-create-post').classList.add('active');
});
