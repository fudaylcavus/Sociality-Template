import { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './features/Sidebar/Sidebar';
import { PostList } from './features/PostList/PostList'

export const getMonthNameByNum = num => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return months[num -1]

}

function App() {

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const handleDateView = date => {
      const args = date.split("-");
      return `${args[2]} ${getMonthNameByNum(Number(args[1]))} ${args[0]}`  
  }

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      let response = await fetch('./data.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        let data = await response.json();
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadPosts();
  }, [])

  return (
    <div className="App">
      <Sidebar/>
      <main>
        <div className="color-infos">
          <div className="color-info">
            <div className="color-circle"></div>
            Published
          </div>
          
          <div className="color-info">
            <div className="color-circle"></div>
            Scheduled
          </div>

          <div className="color-info">
            <div className="color-circle"></div>
            Need Approval
          </div>

          <div className="color-info">
            <div className="color-circle"></div>
            Error
          </div>

          <div className="color-info">
            <div className="color-circle"></div>
            Notes
          </div>
        </div>

        <div className="profile">
          <img src="https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg" alt="profile"/>
        </div>

        {isLoading 
        ? (<div>Loading...</div>)
        : (
          <div>
            {Object.keys(data.posts_by_date).reverse().map((date, index) => {
              return (
                <div key={index}>
                  <div className="posts-date">{handleDateView(date)}</div>
                  <PostList postlist={data.posts_by_date[date]}/>
                </div>
              )
            })}
          </div>
          )
        }
        
      </main>
    </div>
  );
}

export default App;
