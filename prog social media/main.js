document.addEventListener('DOMContentLoaded', function () {
    let observer;

    function postMaken(postData) {
        const li = document.createElement('li');
        li.classList.add('post');

        const headerPost = document.createElement('div');
        headerPost.classList.add('headerpost');

        const avatarContainer = document.createElement('figure');
        avatarContainer.classList.add('avatarcontainer');

        const avatarImg = document.createElement('img');
        avatarImg.classList.add('avatar');
        avatarImg.src = postData.avatar;

        avatarContainer.appendChild(avatarImg);
        headerPost.appendChild(avatarContainer);

        const gebruikersnaam = document.createElement('p');
        gebruikersnaam.textContent = postData.user;

        const balletje = document.createElement('p');
        balletje.textContent = '•';

        const datum = document.createElement('p');
        datum.textContent = postData.date;

        headerPost.appendChild(gebruikersnaam);
        headerPost.appendChild(balletje);
        headerPost.appendChild(datum);

        li.appendChild(headerPost);

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('imagecontainer');

        const postImage = document.createElement('img');
        postImage.classList.add('postafbeelding');
        postImage.src = postData.post_image;

        imgContainer.appendChild(postImage);
        li.appendChild(imgContainer);

        const loremflex = document.createElement('div');
        loremflex.classList.add('loremflex');

        const gebruiksnaamlorem = document.createElement('p');
        gebruiksnaamlorem.classList.add('lorem1');
        gebruiksnaamlorem.textContent = postData.user + ':';

        const beschrijving = document.createElement('p');
        beschrijving.classList.add('lorem');
        beschrijving.textContent = postData.content;

        loremflex.appendChild(gebruiksnaamlorem);
        loremflex.appendChild(beschrijving);

        li.appendChild(loremflex);

        return li;
    }

    function laadVolgendePost() {
        fetch('info.json')
            .then(response => response.json())
            .then(data => {
                const postsData = shuffleArray(data.posts);
                const volgendePostData = postsData.shift();
                const li = postMaken(volgendePostData);
                document.querySelector('.posts').appendChild(li);
                observer.observe(li);
            })
            .catch(error => {
                console.error('er is een fout:', error);
            });
    }

    function initObserver() {
        observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    laadVolgendePost();
                }
            });
        }, { threshold: 0.5 });

        const laatstePost = document.querySelector('.post:last-child');
        if (laatstePost) {
            observer.observe(laatstePost);
        }
    }

    fetch('info.json')
        .then(response => response.json())
        .then(data => {
            const postsData = shuffleArray(data.posts);
            const eerstePostData = postsData.shift();
            const eerstPost = postMaken(eerstePostData);
            document.querySelector('.posts').appendChild(eerstPost);
            initObserver();
        })
        .catch(error => {
            console.error('er is een fout:', error);
        });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
