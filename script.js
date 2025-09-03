document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('diary-form');
    const entriesContainer = document.getElementById('entries-container');

    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    function displayEntries() {
        entriesContainer.innerHTML = '';
        entries.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <h3>${entry.title}</h3>
                <p>${entry.content}</p>
                <button onclick="deleteEntry(${index})">Delete</button>
            `;
            entriesContainer.appendChild(entryDiv);
        });
    }

    function addEntry(title, content) {
        entries.push({ title, content });
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        displayEntries();
    }

    window.deleteEntry = function(index) {
        entries.splice(index, 1);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        displayEntries();
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('entry-title').value;
        const content = document.getElementById('entry-content').value;
        addEntry(title, content);
        form.reset();
    });

    displayEntries();
});