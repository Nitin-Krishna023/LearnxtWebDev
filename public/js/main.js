document.addEventListener('DOMContentLoaded', async () => {
	let posts = await getPosts();
	let articles = document.querySelector('.articles');
	articles.innerHTML = '';
	posts.forEach((post) => {
		let postHTML = `
        <div class="col-sm-6 col-md-4 d-flex pb-3">
            <div class="card">
                <img src="${post.imageURL}" alt="${post.title}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.description}</p>
                    <button class="btn btn-outline-info btn-sm">Details</button>
                </div>
            </div>
        </div>`;
		articles.insertAdjacentHTML('beforeend', postHTML);
	});
});
