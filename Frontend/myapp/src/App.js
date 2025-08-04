import AddNewBookForm from "./components/AddNewBookForm";
import BookByAuthor from "./components/BookByAuthor";
import BookByTitle from "./components/BookByTitle";
import Books from "./components/Books";



function App() {
  return (
    <div className="App">
      <AddNewBookForm/>
      <Books />
      <BookByTitle title="To Kill a Mockingbird" />
      <BookByAuthor authorName="Harper Lee"/>
    </div>
  );
}

export default App;
