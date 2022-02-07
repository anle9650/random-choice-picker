const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

// Focus onto text area as soon as app is entered.
textarea.focus();

// On keyup, generate and insert the tag elements from input string.
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value);

    // If user pressed Enter, randomly choose a tag element.
    if (e.key === 'Enter') {
        // Wait 10ms, then clear textarea.
        setTimeout(() => {
            e.target.value = '';
        }, 10);

        randomSelect();
    }
});

// Takes a comma-separated input string of tags, and inserts them into the DOM as tag elements.
function createTags(input) {
    // Split input string into array of tags, filter out any blank tags, trim remaining tags.
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());

    // Clear out previous set of tags from DOM.
    tagsEl.innerHTML = '';

    // Add each new tag to DOM.
    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    });
}

// Randomly highlights a tag a specified number of times, then chooses a random tag to land on.
function randomSelect() {
    const times = 30;

    // Every 100ms, select a random tag element to hightlight.
    const interval = setInterval(() => {
        const randomTag = pickRandomTag();

        // Highlight the tag for 100ms, then unhighlight.
        highlightTag(randomTag);

        setTimeout(() => {
            unHighlightTag(randomTag);
        }, 100);
    }, 100);

    // After a random tag has been highlighted the specified number of times, choose a random tag to land on.
    setTimeout(() => {
        // Stop the random highlighting interval.
        clearInterval(interval);

        // Wait 100ms, then highlight a random tag.
        setTimeout(() => {
            const randomTag = pickRandomTag();

            highlightTag(randomTag);
        }, 100)
    }, times * 100)
}

// Returns a random tag element from the DOM.
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

// Adds the highlight class to a tag element.
function highlightTag(tag) {
    tag.classList.add('highlight');
} 

// Removes the highlight class from a tag element.
function unHighlightTag(tag) {
    tag.classList.remove('highlight');
} 