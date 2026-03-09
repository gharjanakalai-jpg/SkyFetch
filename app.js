<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SkyFetch Weather Dashboard</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<h1>🌤 SkyFetch Weather Dashboard</h1>

<div class="search-box">
<input type="text" id="cityInput" placeholder="Enter city name">
<button id="searchBtn">Search</button>
</div>

<div class="recent-container">
<h3>Recent Searches</h3>
<div id="recentSearches"></div>
<button id="clearBtn">Clear History</button>
</div>

<div id="weatherResult"></div>
<div id="forecast"></div>

<script src="app.js"></script>
</body>
</html>
