
# 🍽️ Recipe Explorer - Full Stack App (FastAPI + React)

This is a full-stack recipe explorer web application that allows users to browse, search, and filter a dataset of US-based recipes. It features:

- Backend: FastAPI with PostgreSQL/SQLite
- Frontend: React + React Bootstrap
- Data ingestion from `US_recipes_null.json`
- Pagination, search, and off-canvas recipe details

---

## 🔧 Features

✅ REST API with FastAPI  
✅ Search recipes by title, cuisine, rating, calories  
✅ Responsive React frontend using Bootstrap  
✅ Drawer view for detailed recipe info  
✅ Data preloading from a JSON file  
✅ Pagination (15–50 recipes per page)

---

## 📦 Tech Stack

| Layer     | Technology        |
|-----------|-------------------|
| Backend   | FastAPI + SQLAlchemy |
| Database  | SQLite (default) or PostgreSQL |
| Frontend  | React + React-Bootstrap |
| API Client| Axios             |

---

## 🚀 Quickstart

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/recipe-explorer.git
cd recipe-explorer
```

---

### 🔹 2. Set Up Backend (FastAPI)

#### 🐍 Create virtual environment

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
```

#### 📦 Install requirements

```bash
pip install -r requirements.txt
```

#### 🗃️ Load recipes from JSON

```bash
python ingest.py
```

#### 🚀 Start the API server

```bash
uvicorn main:app --reload
```

API is now running at: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 🔹 3. Set Up Frontend (React)

#### 📁 Move into frontend folder

```bash
cd recipe-ui
```

#### 📦 Install dependencies

```bash
npm install
```

#### 🧩 Set proxy to FastAPI (in package.json)

```json
"proxy": "http://localhost:8000"
```

#### ▶️ Start the React server

```bash
npm start
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🌐 API Endpoints

| Endpoint                | Description                    |
|-------------------------|--------------------------------|
| `/api/recipes`          | Get all recipes (paginated)    |
| `/api/recipes/search`   | Search by title, cuisine, etc. |
| `/check` (optional)     | Returns count of recipes       |

---

## 📁 Folder Structure

```
root/
├── database.py
├── main.py
├── models.py
├── schemas.py
├── crud.py
├── ingest.py
├── US_recipes_null.json
├── requirements.txt
├── recipe-ui/ (React frontend)
```

---

## 📌 Future Enhancements

- User authentication (JWT)
- Favorite recipes
- Upload recipe images
- MongoDB or PostgreSQL support

---

## 🧑‍💼 Author

Intern Project @ **Securin**  
Built by: [Your Name]
