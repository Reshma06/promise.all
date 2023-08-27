const posts = [
    { title: 'Post One', body: 'This is post one'},
    { title: 'Post Two', body: 'This is post two'}
];

let lastActivityTime = ' ';

function updateLastUserActivityTime() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lastActivityTime = new Date().toLocaleTimeString();
            resolve();
        }, 1000);
    });
}

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            posts.push(post);
            
            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('Error');
            }
        }, 2000);
    });
}

function deleteLastPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost);
            } else {
                reject('No posts to delete');
            }
        }, 1000);
    });
}

const newPost = { title: 'Post Three', body: 'This is post three' };

const promise1 = createPost(newPost);
const promise2 = updateLastUserActivityTime();

Promise.all([promise1, promise2])
    .then(() => {
        console.log('Before creating post 4, user last activity time:', lastActivityTime);
        return createPost({ title: 'Post Four', body: 'This is post four' });
    })
    .then(() => updateLastUserActivityTime())
    .then(() => {
        console.log('After creating post 4, ')
        console.log('Posts:');
        posts.forEach(post => console.log(post.title));
        console.log('User last activity time:', lastActivityTime);
        return deleteLastPost();
    })
    .then(deletedPost => {
        console.log('Deleted post:', deletedPost.title);
        console.log('Updated Posts:');
        posts.forEach(post => console.log(post.title));
    })
    .catch(error => {
        console.error(error);
    });
