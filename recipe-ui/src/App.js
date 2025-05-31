// App.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Form,
  Row,
  Col,
  Button,
  Offcanvas,
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState({
    title: "",
    cuisine: "",
    rating: "",
    calories: "",
  });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        `http://localhost:8000` +
        (search.title || search.cuisine || search.rating || search.calories
          ? `/api/recipes/search?title=${search.title}&cuisine=${search.cuisine}&rating=${search.rating}&calories=${search.calories}`
          : `/api/recipes?page=${page}&limit=${limit}`);
      const res = await axios.get(url);
      setRecipes(res.data.data || res.data); // depends on backend shape
      setTotal(res.data.total || 50); // fallback if total not provided
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleSearch = () => {
    setPage(1);
    fetchRecipes();
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🍽️ Recipe Explorer</h2>

      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Control
              placeholder="Title"
              value={search.title}
              onChange={(e) => setSearch({ ...search, title: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Cuisine"
              value={search.cuisine}
              onChange={(e) =>
                setSearch({ ...search, cuisine: e.target.value })
              }
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Rating >="
              value={search.rating}
              onChange={(e) => setSearch({ ...search, rating: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Calories <="
              value={search.calories}
              onChange={(e) =>
                setSearch({ ...search, calories: e.target.value })
              }
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && (
        <Alert variant="danger">
          Failed to load recipes. Please try again later.
        </Alert>
      )}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table responsive bordered hover>
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Cuisine</th>
                <th>Rating</th>
                <th>Total Time</th>
                <th>Serves</th>
              </tr>
            </thead>
            <tbody>
              {recipes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Recipes Found
                  </td>
                </tr>
              ) : (
                recipes.map((r, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelected(r)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      {r.title?.slice(0, 30)}
                      {r.title?.length > 30 && "..."}
                    </td>
                    <td>{r.cuisine}</td>
                    <td>{"⭐".repeat(Math.round(r.rating || 0))}</td>
                    <td>{r.total_time} min</td>
                    <td>{r.serves}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          <Row className="align-items-center">
            <Col md="auto">
              <Form.Select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                {[15, 20, 25, 50].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} per page
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Pagination className="justify-content-end">
                {[...Array(Math.ceil(total / limit)).keys()].map((p) => (
                  <Pagination.Item
                    key={p}
                    active={p + 1 === page}
                    onClick={() => setPage(p + 1)}
                  >
                    {p + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </>
      )}

      <Offcanvas
        show={!!selected}
        onHide={() => setSelected(null)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {selected?.title} - {selected?.cuisine}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            <strong>Description:</strong> {selected?.description}
          </p>
          <p>
            <strong>Total Time:</strong> {selected?.total_time} min
          </p>
          <p>
            <strong>Prep:</strong> {selected?.prep_time} min |{" "}
            <strong>Cook:</strong> {selected?.cook_time} min
          </p>
          <h5>Nutrition</h5>
          <Table bordered size="sm">
            <tbody>
              {selected?.nutrients &&
                Object.entries(selected.nutrients).map(([k, v]) => (
                  <tr key={k}>
                    <td>
                      <strong>{k}</strong>
                    </td>
                    <td>{v}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default App;
