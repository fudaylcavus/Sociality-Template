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
  const [hasError, setHasError] = useState(false);
  const [activeBrand, setActiveBrand] = useState(2);

  const handleDateView = date => {
      const args = date.split("-");
      return `${args[2]} ${getMonthNameByNum(Number(args[1]))} ${args[0]}`  
  }

  const isFetchSuccessed = () => Math.random() >= .3;

  const loadPosts = async () => {
    setHasError(false);
    setIsLoading(true);
    
    //To longer the loading animation, fake load timeout.
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, (Math.random() * 3) * 1000)})
    
    try {
      let response = await fetch('./data.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!isFetchSuccessed()) {
        throw new Error("unexpected error")
      }
      if (response.ok) {
        let data = await response.json();
        setData(data);
        setIsLoading(false)
      }
    } catch (err) {
      setHasError(true);
      setIsLoading(false);
      console.log(err);
    }
    
  }

  useEffect(() => {
    loadPosts()
  }, [activeBrand])

  return (
    <div className="App">
      <div className="mobile">
        <i className="fas fa-mobile-alt"></i>
        You can't view on Phone!
      </div>
      <Sidebar activeBrand={activeBrand} setActiveBrand={setActiveBrand}/>
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
        ? (
          <div className="center-info loading">
            <i className="fas fa-spinner"></i>
          </div>
          )
        : !hasError 
          ? (
          <div>
            {Object.keys(data?.posts_by_date).reverse().map((date, index) => {
              return (
                <div key={index}>
                  <div className="posts-date">{handleDateView(date)}</div>
                  <PostList postlist={data.posts_by_date[date]}/>
                </div>
              )
            })}
          </div>
          )
        : (
        <div className="center-info error">
          <i className="fas fa-exclamation-triangle"></i>
          <br/>
          {/* Test for situations,which create problem */}
          U4580-404
        </div>
        )
        }
        
      </main>
    </div>
  );
}

export default App;
