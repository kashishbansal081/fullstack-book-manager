import { useState } from "react";
import useFetch from "../useFetch";

const Books = () => {
    const [successMessage, setSuccessMessage] = useState('')
  const { data, loading, error } = useFetch("http://localhost:3000/books");

  const deleteHandler = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log("Book has not been deleted.");
      }
      const data = await response.json();
      if (data) {
        setSuccessMessage("Book has been deleted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <ul>
          {data?.map((book) => (
            <li key={book._id}>
              {book.title}{" "}
              <button onClick={() => deleteHandler(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <p>{successMessage}</p>
      </div>
    </>
  );
};

export default Books;
