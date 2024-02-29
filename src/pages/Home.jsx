import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/conf'
import { Container,PostCard } from '../components'


function Home() {
    const[posts,setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts)
            {
                setPosts(posts.documents)
            }
    })
    },[])
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-3xl px-15 text-white md:text-[52px] lg:text-[72px]
                            font-bold rounded-2xl ">
                               Welcome to
                               <span className=' text-pink-600'> Blogify Hub!</span>  
                            </h1>

                            <div className=' mt-10  text-xl text-white'>
                                <div className=''>Discover a world of captivating stories, insightful articles,
                                 and thought-provoking content that awaits you beyond the login screen. 
                                 At VyaktiVichar, we believe in the power of words to inspire, educate, 
                                 and entertain. Uncover hidden gems, gain fresh perspectives, and join a 
                                 community passionate about the topics that matter.</div>
                           </div>
                           <h1 className="text-3xl px-15 text-white
                            font-bold hover:text-gray-400 mt-10">
                              Login To Read the Post 
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home