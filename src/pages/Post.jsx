import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [liked,setLiked] = useState(false);
    const[likescount,setLikesCount] = useState(0)

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // useEffect(() => {
    //     if (slug) {
    //         appwriteService.getPost(slug).then((post) => {
    //             if (post) 
    //            { 
    //             setPost(post);
    //             setLikesCount(post.likes || 0);
    //             // Retrieve liked status from local storage (optional)
    //       const storedLikedStatus = localStorage.getItem(`liked_${post.$id}`);
    //       setLiked(storedLikedStatus === "true");
    //         }
    //             else navigate("/");
    //         });
    //     } else navigate("/");
    // }, [slug, navigate]);

    // const handleLikeDislike = ()=>{
    //     appwriteService.updateLikesCount(post.$id,likescount).then(()=>{
    //         setLikesCount(likescount + (liked ? -1 : 1));
    // setLiked(!liked);
    //         localStorage.setItem(`liked_${post.$id}`, liked);
           
    //     })
       
    // }
    
    useEffect(() => {
        if (slug) {
          appwriteService
            .getPost(slug)
            .then((post) => {
              if (post) {
                // Fetch updated likes count and liked status
                setPost(post);
                setLikesCount(post.likes || 0);
                const storedLikedStatus = localStorage.getItem(`liked_${post.$id}`); // unique key is generated
                console.log("storedLikedStatus",storedLikedStatus)
                setLiked(storedLikedStatus === "true"); // Restore from local storage
              } else {
                navigate("/"); // Handle non-existent post
              }
            })
            .catch((error) => {
              console.error("Error fetching post:", error);
            });
        }
      }, [slug, navigate]);
    
      const handleLikeDislike = async () => {
        const newLikesCount = liked ? likescount - 1 : likescount + 1;
        console.log("Likes Count : ",newLikesCount)
    
        try {
          // Update likes count in Appwrite database
          await appwriteService.updateLikesCount(post.$id, newLikesCount);
    
          // Update local state and localStorage
          setLikesCount(newLikesCount);
          console.log("Likes Count 1: ",newLikesCount)
    
          setLiked(!liked); // Toggle liked status
          localStorage.setItem(`liked_${post.$id}`, !liked); // Update local storage
        } catch (error) {
          console.error("Error updating like:", error);
          // Handle errors gracefully, e.g., display error message to user
        }
      }
   

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImg);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImg)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className=" lg:text-[40px] font-bold text-white">{post.title}</h1>
                    
                    <div className="flex items-center gap-3">
                    <button className="flex items-center gap-3 sm:text-xl text-lg" onClick={handleLikeDislike}>
                    {!liked? <FontAwesomeIcon icon={faHeart} className="text-gray-500"  />: 
                    <FontAwesomeIcon icon={faHeart} className="text-pink-500"  />}                    
                   {likescount}
                   </button>
                    
                    </div>
                    
                </div>
                <div className="browser-css text-white">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}