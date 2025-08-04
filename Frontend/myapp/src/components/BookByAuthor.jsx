const { default: useFetch } = require("../useFetch");

const BookByAuthor = ({authorName})=>{
    // console.log(authorName)

    const {data, loading, error} = useFetch(`https://fullstack-book-manager.vercel.app/books/authors/${authorName}`)
    // console.log(data)

    return (
        <>
        {
            data ? (
            <div>
                <h1>Book by {authorName}</h1>
            <ul>
                {data?.map((books) => <li key={books._id}>{books.title}</li> )}
            </ul>
            </div>
            ) : loading && <p>Loading...</p>
        }
        </>
    )
}

export default BookByAuthor
