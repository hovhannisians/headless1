import axios from "axios";
import React, {useEffect, useState} from "react";
import "./blog.css";

export default function Blog({post}) {

    const [featuredImage, setFeaturedImage] = useState();

    const [postDate, setPostDate] = useState(null);


    const getImage = async () => {
        try {
            const response = await axios.get(post?._links["wp:featuredmedia"][0]?.href);

            if(response.data && response.data.source_url) {
                setFeaturedImage(response.data.source_url);
            }

            if(post.date) {
                const dateObj = new Date(post.date);
                const formatedDate = dateObj.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                setPostDate(formatedDate);
            }
        } catch (error) {console.log("Error - ", error);}
    };

    useEffect( () => {
        getImage();
    }, [post] );

    return (
        <div className="item">
            {featuredImage && <img src={featuredImage} alt={post.title.rendered} />}
            <h2>{post.title.rendered}</h2>
            <div>{postDate}</div>
            <div className="excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
        </div>
    )
}