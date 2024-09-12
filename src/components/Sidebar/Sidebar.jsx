import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiSidebar, 
    FiShoppingBag,
    FiTrendingUp,
    FiThumbsUp,
    FiBarChart,
    FiUser,
    FiLogOut
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { GiJoystick, GiChessQueen, GiPokerHand } from 'react-icons/gi'; // Game Icons

import './Sidebar.scss';
import { logout } from '../../store/AccessTokenStore';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <FiSidebar />,
        to: '/',
        section: '',
        sectionNumber: 0
    },
    {
        display: 'Income',
        icon: <FiTrendingUp />,
        to: '/incomes',
        section: 'incomes',
        sectionNumber: 0
    },
    {
        display: 'Expense',
        icon: <FiShoppingBag />,
        to: '/expenses',
        section: 'expenses',
        sectionNumber: 0
    },
    {
        display: 'Goals',
        icon: <FiThumbsUp />,
        to: '/goals',
        section: 'goals',
        sectionNumber: 0
    },
    {
        display: 'Finance Advisor AI',
        icon: <RiRobot2Line />,
        to: '/commons',
        section: 'commons',
        sectionNumber: 1
    },
    {
        display: 'Scholarship',
        icon: <RiRobot2Line />,
        to: '/scholarship',
        section: 'scholarship',
        sectionNumber: 2
    },
    {
        display: 'Investments',
        icon: <FiThumbsUp />,
        to: '/investments',
        section: 'investments',
        sectionNumber: 0
    },
    {
        display: 'Budget Guessing',
        title: 'FINANCE EXPLORER GAMES',
        icon: <GiChessQueen />,
        url: 'https://6698b18bd6b9114e37a99c17--adorable-chimera-4a4a1a.netlify.app/',
        sectionNumber: 3
    },
    {
        display: 'Credit Decision',
        icon: <GiPokerHand />,
        url: 'https://6698b353229abc5078b8b5a2--monumental-sunflower-f75b4d.netlify.app/',
        section: 'profile',
        sectionNumber: 3
    },
    {
        display: 'Loan Interview',
        icon: <GiJoystick />,
        url: 'https://6698b47c2b97e7509331ca90--wondrous-salamander-c3ec3b.netlify.app/3333333',
        section: 'profile',
        sectionNumber: 3
    }, 
    {
        display: 'Profile',
        title: 'MY ACCOUNT',
        icon: <FiUser />,
        to: '/profile',
        section: 'profile',
        sectionNumber: 4
    },
    {
        display: 'Logout',
        icon: <FiLogOut />,
        to: '/login',
        section: 'profile',
        sectionNumber: 4
    },
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        const curPath = location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current?.querySelector('.sidebar__menu__item');
            if (sidebarItem) {
                indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
                setStepHeight(sidebarItem.clientHeight);
            }
        }, 50);
    }, []);

    const sidebarIndicatorHeight = activeIndex * stepHeight;

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <div className='sidebar__fullLogo'>
                    <FiBarChart style={{ marginRight: '1rem' }} />
                    <Link to={'/'}>EduFinance Hub</Link>
                </div>
            </div>

            <b><hr/></b>
            <h3 className='sidebar__title'>MAIN</h3>
            <b><hr/></b>

            <div ref={sidebarRef} className="sidebar__menu">
                <div
                    ref={indicatorRef}
                    className="sidebar__menu__indicator"
                    style={{
                        transform: 
                        `translateX(-50%) 
                        translateY(${sidebarIndicatorHeight}px)`
                    }}
                />

                {sidebarNavItems.map((item, index) => (
                    item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" key={index}>
                            {item.title && <h3 className='sidebar__title'><b><hr/></b>{item.title}<b><hr/></b></h3>}
                            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                <div className="sidebar__menu__item__icon">
                                    {item.icon}
                                </div>
                                <div className="sidebar__menu__item__text">
                                    {item.display}
                                </div>
                            </div>
                        </a>
                    ) : (
                        <Link to={item.to} key={index}>
                            {item.title && <h3 className='sidebar__title'><b><hr/></b>{item.title}<b><hr/></b></h3>}
                            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                <div className="sidebar__menu__item__icon">
                                    {item.icon}
                                </div>
                                <div className="sidebar__menu__item__text">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    )
                ))}

            </div>
        </div>
    );
};

export default Sidebar;
