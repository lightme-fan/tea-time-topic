// Grab the elements which are going to be used
const nextTopicList = document.querySelector('.next_topic');
const pastTopicList = document.querySelector('.past_topic'); 
const submitBtn = document.querySelector('.addBtn');

// API url
const endpoint = 'https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json';

// Fetching data
const fetchTopic = async () => {
    console.log(await fetch(endpoint));
}
fetchTopic();

