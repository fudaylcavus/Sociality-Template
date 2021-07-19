import React from 'react';
import { getMonthNameByNum } from '../../App';
import './PostList.css'


export const PostList = ({postlist}) => {
    return (
        <div className="postlist">  
            {postlist.map((post, index) => {
                return <Post key={index} post={post}/>
            })}
        </div>
    )
}


export const Post = ({post}) => {

    const handleDateView = () => {
        const date = post.published_at;
        const [dayMonthYear, clock] = date.split(" ")
        const dmy = dayMonthYear.split('-')
        const month = getMonthNameByNum(Number(dmy[1]));
        const day = dmy[2];
        const year = dmy[0];
        const fixedClock = clock.slice(0, 5);
        return `${year} ${month} ${day} - ${fixedClock}`
    }

    const handleHyperlinkWithText = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        console.log(text.split(urlRegex))
        return text.split(urlRegex)
           .map(part => {
                if(part.match(urlRegex)) {
                    return <a className="link" href={part}>{part}</a>;
                }
                return part;
           });
      }

    const handleChannelIcon = channel => {
        switch (channel) {
            case 'facebook':
                return (
                    <i class="fab fa-facebook-f"></i>
                )
            case 'twitter':
                return (
                    <i class="fab fa-twitter"></i>
                )
            case 'instagrambusiness':
                return (
                    <i class="fab fa-instagram"></i>
                )
            default:
                break;
        }
    }

    const handleStatusColor = status => {
        //0 for Need Approval, 
        //1 for Scheduled, 
        //2 for Publishing (Note?), 
        //3 for Published, 
        //4 for Error
        switch (status) {
            case 0:
                return "#f7bf38";
            case 1:
                return "#3ac183";
            case 2:
                return "#67b1f2";
            case 3:
                return "#acacac";
            case 4:
                return "#fb6450";
            default:
                break;
        }
    }

    return (
        <div className="post">
            <div 
            style={{backgroundColor: handleStatusColor(post.status)}} 
            className="post-channel">{handleChannelIcon(post.account.channel)}</div>
            <div className="post-content">
                <div className="post-top">
                    <p>{handleDateView()}</p>
                    <div className="post-actions">
                        {post.status === 1 ? <i class="fas fa-ban"></i> : ""}
                        {post.status === 0 ? <i class="fas fa-check"></i> : ""}                        
                        <i class="far fa-trash-alt"></i>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <p className="post-text">{handleHyperlinkWithText(post.entry.message)}</p>
                <div className="post-image">
                    <img 
                    src={post.entry.image[0]} 
                    onError={({target}) => target.src = "./no-post-image.png"} 
                    alt="post"/>
                </div>
                <div className="interactions">
                    <div className="interaction">
                        {["twitter","instagrambusiness"].includes(post.account.channel) 
                        ? <i class="far fa-heart"></i>
                        : <i class="far fa-thumbs-up"></i>}
                        
                        {/* Since don't have data for it, values are hardcoded*/}
                        {post.status !== 3 
                        ? 0
                        : 124}                        
                    </div>

                    <div className="interaction">
                        <i class="far fa-comment-alt"></i>
                        {post.status !== 3 
                        ? 0
                        : 63}
                    </div>

                    <div className="interaction">
                        {post.account.channel === "twitter"
                        ? <i class="fas fa-retweet"></i>
                        : <i class="fas fa-share-alt"></i>}
                        {post.status !== 3 
                        ? 0
                        : 4}
                    </div>

                    <div className="interaction">
                        <i class="far fa-eye"></i>
                        {post.status !== 3 
                        ? 0
                        : 1426}
                    </div>
                </div>
            </div>
        </div>
    )
}