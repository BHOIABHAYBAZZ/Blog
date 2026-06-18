import React, { useState, useEffect } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    blog: "",
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !product.title.trim() ||
      !product.image.trim() ||
      !product.blog.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    let updatedProducts;

    if (editIndex !== null) {
      updatedProducts = [...products];
      updatedProducts[editIndex] = product;
      setEditIndex(null);
    } else {
      updatedProducts = [...products, product];
    }

    setProducts(updatedProducts);
    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setProduct({
      title: "",
      image: "",
      blog: "",
    });
  }

  function Delete(index) {
    const updated = products.filter((_, i) => i !== index);

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  function Edit(index) {
    setProduct(products[index]);
    setEditIndex(index);
  }

  const filteredProducts = [...products]
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "za") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });
const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    padding: "40px 8%",
    fontFamily: "'Poppins', sans-serif",
  },

  heading: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "30px",
  },

  formCard: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "40px",
    border: "1px solid #334155",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #334155",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    padding: "14px",
    minHeight: "120px",
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #334155",
    borderRadius: "10px",
    resize: "vertical",
    outline: "none",
    fontSize: "15px",
    marginBottom: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  topBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
  },

  search: {
    flex: 1,
    padding: "12px",
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155",
    borderRadius: "10px",
  },

  select: {
    padding: "12px",
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155",
    borderRadius: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },

  image: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
  },

  title: {
    padding: "20px 20px 10px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
  },

  blog: {
    padding: "0 20px",
    color: "#475569",
    lineHeight: "1.8",
    fontSize: "15px",
  },

  btnGroup: {
    display: "flex",
    gap: "10px",
    padding: "20px",
  },

  editBtn: {
    flex: 1,
    padding: "12px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteBtn: {
    flex: 1,
    padding: "12px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  noData: {
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "18px",
    marginTop: "40px",
  },


  
};
  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
       <h1 style={styles.heading}>
  ✍️ My Blog Studio
</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Blog Title"
            value={product.title}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="image"
            placeholder="Enter Image URL"
            value={product.image}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="blog"
            rows="4"
            placeholder="Enter Blog Content"
            value={product.blog}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            {editIndex !== null ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>

      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="🔍 Search By Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={styles.select}
        >
          <option value="">Sort</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredProducts.map((item, index) => (
          <div key={index} style={styles.card}>
            <img
              src={item.image}
              alt={item.title}
              style={styles.image}
            />

            <h3 style={styles.title}>{item.title}</h3>

            <p style={styles.blog}>{item.blog}</p>

            <div style={styles.btnGroup}>
              <button
                style={styles.editBtn}
                onClick={() => Edit(index)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => Delete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <h2 style={styles.noData}>No Blogs Found</h2>
      )}
    </div>
  );
}