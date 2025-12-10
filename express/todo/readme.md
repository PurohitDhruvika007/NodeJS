<h1>📌 Todos API (Express.js – File System Storage)</h1>

<p>
This project is a simple <strong>Todos Management API</strong> built using 
<strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>JSON File Storage</strong>. 
It supports full CRUD operations and includes filtering features like 
searching by title, filtering by status, and filtering by due date.
</p>

<hr/>

<h2>🚀 Features</h2>
<ul>
  <li>Create a new todo</li>
  <li>Get all todos</li>
  <li>Get a todo by ID</li>
  <li>Update a todo</li>
  <li>Delete a todo</li>
  <li>Filter todos by <strong>status</strong></li>
  <li>Search todos by <strong>title</strong></li>
  <li>Filter todos by <strong>due date</strong></li>
  <li>Data stored in a local <strong>JSON file</strong></li>
</ul>

<hr/>

<h2>🛠 Tech Stack</h2>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>File System (fs)</li>
  <li>JSON Database</li>
</ul>

<hr/>

<h2>📁 Project Structure</h2>
<pre>
/project-folder
│── todo.json
│── index.js
│── package.json
│── README.md
</pre>

<hr/>

<h2>📥 Installation & Setup</h2>

<h3>1️⃣ Clone the repository</h3>
<pre>git clone &lt;your-repo-link&gt;
cd project-folder</pre>

<h3>2️⃣ Install dependencies</h3>
<pre>npm install</pre>

<h3>3️⃣ Start the server</h3>
<pre>node index.js</pre>

<p>Server runs on: <strong>http://localhost:4000</strong></p>

<hr/>

<h2>🔗 API Endpoints</h2>

<h3>📌 1. Get All Todos</h3>
<pre>GET /</pre>

<h4>Filters supported:</h4>
<pre>
/?status=pending
/?search=project
/?dueDate=2025-01-15
</pre>

<h3>📌 2. Get Todo by ID</h3>
<pre>GET /:id</pre>

<h3>📌 3. Create a New Todo</h3>
<pre>POST /</pre>

<h4>Body Example:</h4>
<pre>{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, fruits, vegetables",
  "status": "pending",
  "dueDate": "2025-02-01",
  "createdAt": "2025-01-25"
}
</pre>

<h3>📌 4. Update Todo</h3>
<pre>PUT /:id</pre>

<h3>📌 5. Delete Todo</h3>
<pre>DELETE /:id</pre>

<hr/>

<h2>🧪 Postman Testing Video</h2>
<p>📹 <strong>Video URL:</strong> </p>

https://github.com/user-attachments/assets/70efed9f-8e1a-4e1e-915b-f85cd643b1fe

