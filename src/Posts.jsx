import './App.css'
import React,{useState, useEffect} from 'react'

const Posts = () => {
    
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json()) //muutetaan json data javascriptiksi
    .then(oliot => setPosts(oliot))
},[]
)

    return (
        <div class="formWrapper">
            <h2 onClick={() => setShowPosts(!showPosts)}>Posts from typicode</h2> 

            {
                posts && posts.map(p => 

                    <div className='posts' key={p.id}>

                    <h4>{p.tittle}</h4>
                    <h5>User ID: {p.useId}</h5>
                    <p>{p.body}</p>

                    </div>
                )
            }
            
        </div>
    )
}
export default Posts