import React, { useEffect } from 'react';
import './Sidebar.css';


const fakeBrands = [
    { id: 0, image: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png', notificationCount: 0 },
    { id: 1, image: 'https://image.flaticon.com/icons/png/512/124/124021.png', notificationCount: 99 },
    { id: 2, image: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png', notificationCount: 0 },
    { id: 3, image: 'https://image.flaticon.com/icons/png/512/124/124021.png', notificationCount: 0 },

]

export const Sidebar = ({activeBrand, setActiveBrand}) => {

    useEffect(() => {
        //to make accordion menu items, active or not, click listener and its funcitons are added.
        // 1 - add class to apply css
        // 2 - change button view (+/-)

        var acc = document.getElementsByClassName("menu-item");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active-menu");
                var panel = this.nextElementSibling;
                var iconSpan = this.lastChild;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    if (!iconSpan.className.includes("notification-count")) {
                        iconSpan.innerHTML = "+"
                    }

                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    if (!iconSpan.className.includes("notification-count")) {
                        iconSpan.innerHTML = "-"
                    }


                }
            });
        }
    }, [])


    return (
        <div className="sidebar">
            <div className="logo">
                <strong>sociality</strong>.io
            </div>
            <div className="subsections">
                <div className="brands">
                    {fakeBrands.map((brand, index) => {
                        return <Brand 
                                key={index} 
                                brand={brand} 
                                setActiveBrand={setActiveBrand} 
                                isActive={activeBrand === brand.id} />
                        })
                    }
                </div>
                <div className="menu">
                    <ul className="menu-items">
                        <li className="menu-item">
                            <div>
                                <span className="material-icons">notifications_active</span>
                                <p>Notifications</p>
                            </div>
                            <span className="notification-count">29</span>
                        </li>
                        <ul className="menu-subitems">
                            <li className="menu-subitem">Subitem 1</li>
                            <li className="menu-subitem ">Subitem 2</li>
                        </ul>

                        <li className="menu-item">
                            <div>
                                <span className="material-icons">assessment</span>
                                <p>Summary</p>
                            </div>
                            <span className="collapse-button">+</span>
                        </li>
                        <ul className="menu-subitems">
                            <li className="menu-subitem">Subitem 1</li>
                            <li className="menu-subitem ">Subitem 2</li>
                        </ul>

                        <li className="menu-item">
                            <div>
                                <span className="material-icons">publish</span>
                                <p>Publish</p>
                            </div>
                            <span className="collapse-button">+</span>
                        </li>
                        <ul className="menu-subitems">
                            <li className="menu-subitem">Compose</li>
                            <li className="menu-subitem active-subitem">Feed</li>
                        </ul>

                        <li className="menu-item">
                            <div>
                                <span className="material-icons">forum</span>
                                <p>Engage</p>
                            </div>
                            <span className="collapse-button">+</span>
                        </li>
                        <ul className="menu-subitems">
                            <li className="menu-subitem">Subitem 1</li>
                            <li className="menu-subitem ">Subitem 2</li>
                        </ul>

                        <li className="menu-item">
                            <div>
                                <span className="material-icons">hearing</span>
                                <p>Listen</p>
                            </div>
                            <span className="collapse-button">+</span>
                        </li>
                        <ul className="menu-subitems">
                            <li className="menu-subitem">Subitem 1</li>
                            <li className="menu-subitem ">Subitem 2</li>
                        </ul>

                        <li className="menu-item">
                            <div>
                                <span className="material-icons">bar_chart</span>
                                <p>Report</p>
                            </div>
                            <span className="collapse-button">+</span>
                        </li>
                        <ul className="menu-subitems">
                            <li className="menu-subitem">Subitem 1</li>
                            <li className="menu-subitem ">Subitem 2</li>
                        </ul>


                    </ul>
                </div>
            </div>
        </div>
    )
}

const Brand = ({ brand, isActive, setActiveBrand }) => {

    const handleClick = () => {
        if (isActive) return;
        setActiveBrand(brand.id);
    }

    return (
        <div onClick={handleClick} className={"brand" + (isActive ? " active-brand" : "")}>
            {brand.notificationCount ? <div className="brand-notification">{brand.notificationCount}</div> : ""}
            <img src={brand.image} alt="brand logo" />
        </div>
    )
}
