// ====== Users in localStorage ======
function getUsers() {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// ====== Movies (القائمة الحقيقية اللي تظهر في الموقع) ======
const movies = [
    {
        movieId: 1,
        title: "Superman",
        genre: "Superhero / Action",
        year: 2025,
        duration: 130,
        description: "A new take on the classic hero as Clark Kent learns how to balance being human and a symbol of hope.",
        averageRating: 4.2,
        image: "superman.jpg",
        link: "https://www.youtube.com/results?search_query=superman+2025+trailer"
    },
    {
        movieId: 2,
        title: "Top Gun: Maverick",
        genre: "Action / Drama",
        year: 2022,
        duration: 131,
        description: "After more than 30 years of service, Maverick faces the past while training a new generation of elite pilots.",
        averageRating: 4.6,
        image: "topgun-maverick.jpg",
        link: "https://www.youtube.com/results?search_query=top+gun+maverick+trailer"
    },
    {
        movieId: 3,
        title: "Encanto",
        genre: "Animation / Family",
        year: 2021,
        duration: 102,
        description: "In a magical Colombian family, Mirabel discovers that she may be the only one who can save their home.",
        averageRating: 4.4,
        image: "encanto.jpg",
        link: "https://www.youtube.com/results?search_query=encanto+trailer"
    }
];

// ====== Ratings (تشبه جدول Ratings) ======
let ratings = [
    { ratingId: 1, userId: 1, movieId: 1, ratingValue: 3.5 },
    { ratingId: 2, userId: 2, movieId: 2, ratingValue: 2.0 },
    { ratingId: 3, userId: 3, movieId: 3, ratingValue: 4.3 },
    { ratingId: 4, userId: 4, movieId: 1, ratingValue: 2.3 }
];

function getAverageRating(movieId) {
    const list = ratings.filter(r => r.movieId === movieId);
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, r) => acc + r.ratingValue, 0);
    return sum / list.length;
}

// ====== Helpers للـ Auth و Watchlist ======
function getCurrentUserId() {
    return Number(localStorage.getItem("currentUserId"));
}

function getWatchlist() {
    const data = localStorage.getItem("watchlist");
    return data ? JSON.parse(data) : [];
}

function saveWatchlist(list) {
    localStorage.setItem("watchlist", JSON.stringify(list));
}

// ====== Login Page Logic ======
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorDiv = document.getElementById("login-error");

    if (username.length < 3) {
        errorDiv.textContent = "Username must be at least 3 characters.";
        return;
    }

    let users = getUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        // إنشاء حساب جديد
        user = {
            userId: Date.now(),
            username: username,
            password: password
        };
        users.push(user);
        saveUsers(users);
        alert("Account created successfully!");
    } else if (user.password !== password) {
        errorDiv.textContent = "Incorrect password.";
        return;
    }

    localStorage.setItem("currentUserId", user.userId);
    localStorage.setItem("currentUsername", user.username);

    window.location.href = "movies.html";
}

function checkAuthOrRedirect() {
    if (!getCurrentUserId()) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUsername");
    window.location.href = "login.html";
}

// ====== Movies Page Logic ======
function renderMovies() {
    checkAuthOrRedirect();

    const container = document.getElementById("movies-container");
    const usernameSpan = document.getElementById("nav-username");
    usernameSpan.textContent = localStorage.getItem("currentUsername") || "Guest";

    container.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.image}" alt="${movie.title}" style="width:100%; height:100%; border-radius:8px; object-fit:cover;">
            </div>
            <div class="movie-title">${movie.title}</div>
            <div class="movie-meta">${movie.genre} | ${movie.year} • ${movie.duration} min</div>
            <div class="movie-desc">${movie.description}</div>
            <div class="rating-badge" id="avg-${movie.movieId}">
                ⭐ ${getAverageRating(movie.movieId).toFixed(1)} / 5.0
            </div>
            <div class="rating-form">
                <label for="rating-${movie.movieId}">Rate this movie:</label>
                <select id="rating-${movie.movieId}">
                    <option value="1">1 ★</option>
                    <option value="2">2 ★</option>
                    <option value="3">3 ★</option>
                    <option value="4">4 ★</option>
                    <option value="5">5 ★</option>
                </select>
                <button onclick="rateMovie(${movie.movieId})">Submit</button>
            </div>
            <a class="watch-link" href="${movie.link}" target="_blank">Open movie link / trailer</a>
            <button onclick="addToWatchlist(${movie.movieId})">Add to Watchlist</button>
        `;

        container.appendChild(card);
    });
}

function addToWatchlist(movieId) {
    const userId = getCurrentUserId();
    if (!userId) {
        alert("Please log in first.");
        return;
    }

    let list = getWatchlist();
    const exists = list.some(item => item.userId === userId && item.movieId === movieId);

    if (exists) {
        alert("This movie is already in your watchlist.");
        return;
    }

    list.push({
        watchlistId: Date.now(),
        userId: userId,
        movieId: movieId,
        addedDate: new Date().toISOString().split("T")[0]
    });

    saveWatchlist(list);
    alert("Movie added to your watchlist.");
}

// ====== Watchlist Page Logic ======
function renderWatchlist() {
    checkAuthOrRedirect();

    const container = document.getElementById("watchlist-container");
    const usernameSpan = document.getElementById("nav-username");
    usernameSpan.textContent = localStorage.getItem("currentUsername") || "Guest";

    container.innerHTML = "";

    const userId = getCurrentUserId();
    const list = getWatchlist().filter(item => item.userId === userId);

    if (list.length === 0) {
        container.innerHTML = `<p class="empty-text">Your watchlist is empty.</p>`;
        return;
    }

    list.forEach(item => {
        const movie = movies.find(m => m.movieId === item.movieId);
        if (!movie) return;

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.image}" alt="${movie.title}" style="width:100%; height:100%; border-radius:8px; object-fit:cover;">
            </div>
            <div class="movie-title">${movie.title}</div>
            <div class="movie-meta">${movie.genre} | ${movie.year} • ${movie.duration} min</div>
            <div class="movie-desc">${movie.description}</div>
            <div class="rating-badge">
                ⭐ ${getAverageRating(movie.movieId).toFixed(1)} / 5.0
            </div>
            <a class="watch-link" href="${movie.link}" target="_blank">Open movie link / trailer</a>
            <div class="movie-meta">Added on: ${item.addedDate}</div>
        `;

        container.appendChild(card);
    });
}

// ====== Rating Logic ======
function rateMovie(movieId) {
    const userId = getCurrentUserId();
    if (!userId) {
        alert("Please log in first.");
        return;
    }

    const select = document.getElementById(`rating-${movieId}`);
    const value = Number(select.value);

    if (!value || value < 1 || value > 5) {
        alert("Please choose a rating between 1 and 5.");
        return;
    }

    const existing = ratings.find(r => r.userId === userId && r.movieId === movieId);
    if (existing) {
        existing.ratingValue = value;
    } else {
        ratings.push({
            ratingId: Date.now(),
            userId: userId,
            movieId: movieId,
            ratingValue: value
        });
    }

    const avgSpan = document.getElementById(`avg-${movieId}`);
    if (avgSpan) {
        avgSpan.textContent = `⭐ ${getAverageRating(movieId).toFixed(1)} / 5.0`;
    }

    alert("Your rating has been saved.");
}
