// Grab the elements which are going to be used
const nextTopicList = document.querySelector('.next_topic');
const pastTopicList = document.querySelector('.past_topic'); 
const submitBtn = document.querySelector('.addBtn');

// API url
const endpoint = 'https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json';

// Declaring an empty array
let teaTopics = [];

// Fetching data
const fetchTeaTopic = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    teaTopics = data;
    
    // Update local storage
    const updatedLocalStorage = () => {
        localStorage.setItem('teaTopics', JSON.stringify(teaTopics));
    }
  
    // initial Local Storage
    const initialLocalStorage = () => {
        const storedTeaTopics = JSON.parse(localStorage.getItem('teaTopics'));
        if (storedTeaTopics) {
        teaTopics = storedTeaTopics;
        }
        updatedLocalStorage();
    }

    // Displaying the tea topocs
    const displayTeaTopics =  () => {
        // Filtering the tea topics which aren't discussed on 
        const nextTopicFilter = teaTopics.filter(teaTopic => teaTopic.discussedOn === "");
        const sorting = teaTopics.sort((a,b) => {
            const likes = b.upvotes - a.upvotes;
            const dislikes = b.downvotes - a.downvotes;
            // console.log(likes - dislikes);
            return likes - dislikes; 
        });

        // Display Nest topics
        const nextTopicHtml = nextTopicFilter.map(nextTopic => `
            <div class="topic-card" data-id="${nextTopic.id}">
                <p class="d-flex justify-content-between">
                    <span>${nextTopic.title}</span>
                    <button class="archive_btn align-self-start">
                        <img src="./icons/archive.svg" alt="">
                    </button>
                </p>
                <p class="d-flex justify-content-around">
                    <div class="d-flex">
                        <button class="like_btn" value="${nextTopic.id}"><img src="./icons/like.svg" alt=""></button>
                        <span>${nextTopic.upvotes}</span>
                    </div>
                    <div class="d-flex">
                        <button class="dislike_btn" value="${nextTopic.id}"><img src="./icons/dislike.svg" alt=""></button>
                        <span>${nextTopic.downvotes}</span>
                    </div>
                </p>
            </div>
        `)
        nextTopicList.innerHTML = nextTopicHtml.join("");

        // Filtering the tea topics which have been discussed on
        const pastTopicFilter = teaTopics.filter(teaTopic => teaTopic.discussedOn)
        
        // Display past Topics
        const pastTopicHtml = pastTopicFilter.map(pastTopic => `
            <div class="topic-card discussedTopic" data-id="${pastTopic.id}">
                <p class="d-flex justify-content-between">
                    <span>${pastTopic.title}</span>
                    <button class="delete_button align-self-start" value=${pastTopic.id}>
                        <img src="./icons/trash.svg" alt="">
                    </button>
                </p>
                <div class="align-center">Date</div>
            </div>
        `)
        pastTopicList.innerHTML = pastTopicHtml.join("");

    }

    // Handle Click buttons
    const handleClickButtons = (e) => {
        
        // Handle delete button
        if (e.target.matches('button.delete_button')) {
            const findClosest = e.target.closest('.discussedTopic');
            const id = findClosest.dataset.id;
            deleteTeaTopic(id);
        }
    }

    //  Delete items
    const deleteTeaTopic = (id) => {
        teaTopics = teaTopics.filter(teaTopic => teaTopic.id !== id);
        displayTeaTopics();
        updatedLocalStorage(teaTopics)
    }

    // Local Storage
    initialLocalStorage();

    // Event listener for click buttons
    window.addEventListener('click', handleClickButtons);

    // display TeaTopics
    displayTeaTopics();

}

fetchTeaTopic()
