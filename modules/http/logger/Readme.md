<!-- Paste this HTML into your GitHub README.md (GitHub will render HTML inside markdown files) -->
<h1>Node.js HTTP Server with Request Logging</h1>

<p>
  <img src="https://img.shields.io/badge/Node.js-18+-green" alt="Node.js">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/Language-JavaScript-yellow" alt="Language">
  <img src="https://img.shields.io/badge/Platform-Node.js-lightgrey" alt="Platform">
</p>

<p>
  A small Node.js HTTP server that handles common HTTP methods on the root route and logs each request to <code>log_details.txt</code>. Useful for learning raw Node.js (no frameworks).
</p>

<h2>Features</h2>
<ul>
  <li>Handles <code>GET</code>, <code>POST</code>, <code>PUT</code>, and <code>DELETE</code> on <code>/</code>.</li>
  <li>Logs request details (URL, method, timestamp, client IP) to <code>log_details.txt</code>.</li>
  <li>Returns <code>404</code> for unknown routes.</li>
  <li>Uses only Node core modules: <code>http</code> and <code>fs</code>.</li>
</ul>

<h2>Project Structure</h2>
<pre><code>
.
├── server.js
├── log_details.txt  (auto-created)
└── README.md
</code></pre>

<h2>How it works</h2>
<p>
  The server listens on port <strong>4200</strong>. For every incoming request it:
</p>
<ol>
  <li>Builds a log string with URL, method, timestamp, and client IP.</li>
  <li>Appends that string to <code>log_details.txt</code> using <code>fs.appendFileSync()</code>.</li>
  <li>Sends a text response depending on the request method or a 404 for unknown routes.</li>
</ol>


<h2>Usage</h2>
<ol>
  <li>Install Node.js if not already installed.</li>
  <li>Save the code above to <code>server.js</code>.</li>
  <li>Run the server:
    <pre><code>node server.js</code></pre>
  </li>
  <li>Send requests to <code>http://localhost:4200/</code> (curl, Postman, or browser).</li>
</ol>

<h2>Example curl commands</h2>
<ul>
  <li><code>curl http://localhost:4200/</code> (GET)</li>
  <li><code>curl -X POST http://localhost:4200/</code> (POST)</li>
  <li><code>curl -X PUT http://localhost:4200/</code> (PUT)</li>
  <li><code>curl -X DELETE http://localhost:4200/</code> (DELETE)</li>
</ul>

<h2>Example log entry</h2>
<pre><code>
request sent on http://localhost:/ by GET at 05/12/2025 | 14:45:23 at ip address ::1
</code></pre>

<h2>Tags / Topics</h2>
<p>
  nodejs, javascript, http-server, webserver, backend, request-logging, logging-system, file-logging, raw-node, fs-module, http-module, learning-nodejs, beginner-project
</p>

<h2>Notes</h2>
<ul>
  <li><code>log_details.txt</code> is created automatically if missing.</li>
  <li>This project is intended for learning — consider using Express.js for production applications.</li>
  <li>For large scale logging, prefer asynchronous logging libraries or external logging services.</li>
</ul>

