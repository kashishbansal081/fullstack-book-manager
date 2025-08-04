import { useState } from "react";

const AddNewBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    language: "",
    country: "",
    rating: "",
    summary: "",
    coverImageUrl: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'publishedYear' || name === "rating" ? parseInt(value) : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page reload on form submission

  try {
    const response = await fetch("http://localhost:3000/books/postBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Book added successfully:", data);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <>
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label><br />
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="author">Author: </label><br />
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="publishedYear">Published Year: </label><br />
        <input
          type="number"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="genre">Genre: </label><br />
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        /><br /><br />


        <label htmlFor="language">Language: </label><br />
        <input
          type="text"
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="country">Country: </label><br />
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="rating">Rating: </label><br />
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        /><br /><br />


        <label htmlFor="summary">Summary: </label><br />
        <input
          type="text"
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="coverImageUrl">CoverImageUrl: </label><br />
        <input
          type="text"
          id="coverImageUrl"
          name="coverImageUrl"
          value={formData.coverImageUrl}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddNewBookForm;
