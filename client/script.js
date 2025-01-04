let addSongButton = document.getElementById("addSong");

let getSongButton = document.getElementById("randomSong");

addSongButton.addEventListener('click', async () => {
    let name = document.getElementById("song_name").value;
    let artist = document.getElementById("song_artist").value;
    let url = document.getElementById("song_url").value;

    const nameValidation = validateSongName(name);
    const artistValidation = validateArtistName(artist);
    const urlValidation = validateURL(url);

    if (!nameValidation.valid) {
        showError('song_name', nameValidation.message);
        return;
    }

    if (!artistValidation.valid) {
        showError('song_artist', artistValidation.message);
        return;
    }

    if (!urlValidation.valid) {
        showError('song_url', urlValidation.message);
        return;
    }

    try {
        const body = JSON.stringify({
            name: nameValidation.value,
            artist: artistValidation.value,
            video_url: url,
            votes: 0
        });

        const response = await fetch('http://localhost:3000/songs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });

        if (response.status === 201) {
            alert('Song added successfully');
            clearForm();
        } else {
            const errorData = await response.json();
            alert(errorData.error || "Error saving the song");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error processing the request");
    }
});

getSongButton.addEventListener('click', async () => {
    let response = await fetch('http://localhost:3000/songs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    let song = await response.json();

    renderRandomSongTemplate(song);
});

function renderRandomSongTemplate(data) {
    let template = document.querySelector('.random-template');
    let container = document.getElementById('random');
    let firstChild = container.firstElementChild;

    let clonedTemplate = template.content.cloneNode(true);

    let id = clonedTemplate.querySelector('.random-id');
    let title = clonedTemplate.querySelector('.random-name');
    let subtitle = clonedTemplate.querySelector('.random-artist');
    let link = clonedTemplate.querySelector('.random-url');
    let voteButton = clonedTemplate.querySelector('.random-vote');
    let likes = clonedTemplate.querySelector('.total-likes');

    id.style.display = 'none';

    id.textContent = data._id;
    title.textContent = data.name;
    subtitle.textContent = data.artist;
    link.href = data.video_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    likes.textContent = data.votes + ' likes';

    let handleVote = async () => {
        let voteId = id.textContent;
        let voteCount = 1;

        try {
            let response = await fetch('http://localhost:3000/songs/', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: voteId, votes: voteCount })
            });

            if (response.status === 200) {
                const updatedData = await response.json();
                likes.textContent = updatedData.votes + ' likes';
                voteButton.setAttribute('disabled', '');
            } else {
                alert("Response not ok");
            }
        } catch (error) {
            console.error("Error updating votes:", error);
            alert("Error updating votes");
        }
    };

    voteButton.addEventListener('click', handleVote);

    if (firstChild) {
        firstChild.classList.add('fade-out');
        container.classList.remove('fade-in');

        setTimeout(() => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.classList.add('fade-in');
            container.appendChild(clonedTemplate);
        }, 300);

    } else {
        container.classList.add('fade-in');
        container.appendChild(clonedTemplate);
    }
}

function validateURL(url) {
    try {
        const urlObj = new URL(url);

        const patterns = [
            /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/, 
            /^(https?:\/\/)?(www\.)?youtu\.be\/[a-zA-Z0-9_-]{11}$/
        ];

        const isValid = patterns.some(pattern => pattern.test(url));

        if (!isValid) {
            return {
                valid: false,
                message: "The URL must be a valid YouTube link"
            };
        }

        let videoId;
        if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v');
        } else if (urlObj.hostname.includes('youtu.be')) {
            videoId = urlObj.pathname.slice(1);
        }

        return {
            valid: true,
            value: url,
            videoId: videoId,
            message: "Valid URL"
        };

    } catch (error) {
        return {
            valid: false,
            message: "Malformed URL"
        };
    }
}

function validateSongName(name) {
    name = name.trim();

    if (name.length < 1 || name.length > 100) {
        return {
            valid: false,
            message: "Enter a valid name"
        };
    }

    if (!/[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/.test(name)) {
        return {
            valid: false,
            message: "Enter a valid name"
        };
    }

    return {
        valid: true,
        value: name,
        message: ""
    };
}

function validateArtistName(artist) {

    artist = artist.trim();

    if (artist.length < 1 || artist.length > 50) {
        return {
            valid: false,
            message: "Enter an artist"
        };
    }

    if (!/[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/.test(artist)) {
        return {
            valid: false,
            message: "Enter an artist"
        };
    }

    return {
        valid: true,
        value: artist,
        message: ""
    };
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    input.classList.add('is-invalid');

    let feedbackDiv = input.nextElementSibling;
    if (!feedbackDiv || !feedbackDiv.classList.contains('invalid-feedback')) {
        feedbackDiv = document.createElement('span');
        feedbackDiv.className = 'invalid-feedback';
        input.parentNode.insertBefore(feedbackDiv, input.nextSibling);
    }
    feedbackDiv.textContent = message;
}

function clearErrorMessages() {
    const inputs = ['song_name', 'song_artist', 'song_url'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.classList.remove('is-invalid');
        const feedbackDiv = input.nextElementSibling;
        if (feedbackDiv && feedbackDiv.classList.contains('invalid-feedback')) {
            feedbackDiv.remove();
        }
    });
}

function clearForm() {
    document.getElementById("song_name").value = '';
    document.getElementById("song_artist").value = '';
    document.getElementById("song_url").value = '';
    clearErrorMessages();
}
