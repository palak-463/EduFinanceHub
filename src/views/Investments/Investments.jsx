// src/components/Investment.jsx
import React from 'react';
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import './Investments.css'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const Investment = ({ }) => {

   

    

    const [total, setTotal] = useState()
    const { user } = useAuthContext()


    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null); // State to hold the result
    const [submittedValue, setSubmittedValue] = useState('');
    const [percentageResult, setPercentageResult] = useState(null); // State to hold the percentage result
    const [finalValue, setFinalValue] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedValue(inputValue);
        const age = Number(inputValue); // Convert input to a number
        if (!isNaN(age)) {
            const calculatedResult = 100 - age; // Calculate the result
            setResult(calculatedResult); // Set the result
            if (total) {
                const calculatedPercentageResult = (calculatedResult / 100) * total; // Calculate the percentage result
                setPercentageResult(calculatedPercentageResult); // Set the percentage result
                setFinalValue(total - calculatedPercentageResult); // Calculate and set the final result
            }
            setInputValue(''); // Clear the input field
        } else {
            alert('Please enter a valid number'); // Handle invalid input
        }
    };

    // video urls
    const videoUrl = "https://www.youtube.com/watch?v=Jb7MIBgMwgU";

    useEffect(() => {
        let expenses = 0
        for (let i = 0; i < user?.expense.length; i++) {
            expenses += Number(user?.expense[i].amount)
        }
        let incomes = 0
        for (let i = 0; i < user?.income.length; i++) {
            incomes += Number(user?.income[i].amount)
        }
        let totalSum = incomes - expenses
        setTotal(totalSum)
    }, [user?.income, user?.expense, user])

    const data = {
        labels: ['Low Risk', 'High Risk'],
        datasets: [
          {
            label: 'Percentage amount',
            data: [result, submittedValue],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
             
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
             
            ],
            borderWidth: 1,
          },
        ],
      };


    return (
        <>
            <div className='BalanceModule'>
                <div className='chart-div'>
                    <div className='icon'>
                        <p>💰</p>
                    </div>
                    <div>
                        <h3>Amount for investment</h3>
                        {total ? <h2>{total} ₹</h2> : <h2>0 ₹</h2>}
                    </div>

                </div>
            </div>



            {/* get user age */}
            <div className=" ">
                <div className=''>
                    <form onSubmit={handleSubmit} className='age-box'>

                        <h3 className='mb-3'>Enter your age</h3>
                        <input
                            type="text"
                            id="userInput"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        
                        <button 
                            type="submit"
                            className="ml-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        >
                            <span className='submit-btn-txt '>Submit</span>
                        </button>

                    </form>
                    {/* {submittedValue && (
                        <div className="mt-4">
                            <h3 className="text-gray-700 text-lg font-bold">You entered:</h3>
                            <p className="text-gray-900 text-xl">{submittedValue}</p>
                        </div>
                    )} */}
                    {/* {result !== null && ( // Conditionally render the result
                        <div className="mt-4">
                            <h3 className="text-gray-700 text-lg font-bold">Result:</h3>
                            <p className="text-gray-900 text-xl">High risk: {result}</p>
                            <p className="text-gray-900 text-xl">Low risk: {submittedValue}</p>
                        </div>
                    )}
                    {percentageResult !== null && (
                        <div className="mt-4">
                            <h3 className="text-gray-700 text-lg font-bold">Calculated Percentage:</h3>
                            <p className="text-gray-900 text-xl">{percentageResult} €</p>
                        </div>
                    )} */}
                    {finalValue !== null && (
                        <div className="mt-4">
                            {/* <h3 className="text-gray-700 text-lg font-bold">Total - Percentage Result:</h3>
                            <p className="text-gray-900 text-xl">{finalValue} €</p> */}
                        


                        
                        {/* <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className="px-6 py-4"> */}
                            <div className="font-bold text-xl mb-2"></div>
                            <p className="text-gray-700 text-base">
                            <h2 className='pie-chart-title'>Hey, we have made it simple for you! Your investment percentage are here</h2>
                                   
                                <div style={{ width: '25%', margin: 'auto' }}>
                              
                                    
                                    <Pie data={data} />
                               
                                
                                </div>
                            </p>
                        {/* </div>
                      

                    </div> */}
                    </div>

                    )}



                </div>
            </div>



            {/* toggles  */}

            <div className="my-component all-toggles">
            <p className="button-group">
    <button
        className="btn btn-primary btn-custom1"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample1"
        aria-expanded="false"
        aria-controls="collapseExample1"
    >
        High risk investment
    </button>

    <button
        className="btn btn-primary btn-custom2"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample2"
        aria-expanded="false"
        aria-controls="collapseExample2"
    >
        Low risk investment
    </button>
</p>



                <div className="collapse" id="collapseExample1">
                    <div className="card card-body">

                        <div class="card percentage-card" >
                            <h5 class="card-header percentage-card">We suggest investing your ₹{percentageResult} in plans having high risks and high returns</h5>
                            <div class="card-body percentage-card">
                                <p class="card-text percentage-card">
                                    <ul>
                                        <li>Potential for High Returns</li>
                                        <li>Longer Investment Horizon</li>
                                        <li>Higher Chance of Loss</li>
                                    </ul>
                                </p>

                                <div class="container">

                                    <div class="cards">

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I=" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Stocks</h2>
                                                <p className='mt-4'>Stocks represent ownership in companies, bought and sold on financial markets, offering potential growth or income.</p>
                                                <ul>
                                                    <li>Grow</li>
                                                    <li>Investopedia</li>
                                                    <li>Zerodha</li>
                                                </ul>
                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=5fLUp5lmyaU">Learn more</a></button>

                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://media.istockphoto.com/id/1426182267/photo/investment-on-mutual-fund-concept-coins-in-a-jar-with-soil-and-growing-plant-in-nature.webp?b=1&s=170667a&w=0&k=20&c=BpBMiLQYxn_g-JEbrTPOXIFHJomvvBxm-amK5svrhTk=" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Equity Mutual Funds</h2>
                                                <p className='mt-4'>Invests primarily in stocks or equities of companies.Potential for high returns over the long term.
                                                    Diversification across sectors and companies.</p>
                                                
                                                    <ul>
                                                    <li>morningstar</li>
                                                    <li>vanguard</li>
                                                    <li>fidelity</li>
                                                    </ul>

                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=TPS22HRRY1k">Learn more</a></button>

                                            </div>
                                        </div>


                                    </div>

                                    <div className="cards">
                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Cryptocurrencies</h2>
                                                <p>Cryptocurrencies are digital assets designed for secure, decentralized transactions, utilizing blockchain technology for transparency and global accessibility.</p>
                                                    <ul>
                                                        <li>coinbase</li>
                                                        <li>coinmarketcap</li>
                                                        <li>cryptoslate</li>
                                                    </ul>
                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=rYQgy8QDEBI">Learn more</a></button>

                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://t4.ftcdn.net/jpg/02/73/56/31/360_F_273563132_mqONjq5vNAifX4v7Ha2oGcP3Y1ldzCfb.jpg" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Small caps</h2>
                                                <p>Small-cap stocks represent companies with smaller market capitalizations, offering higher growth potential and increased volatility for investors.</p>
                                                <ul>
                                                    <li>finance.yahoo.com</li>
                                                     <li>zacks</li>
                                                    <li>smallcapnetwork</li>

                                                </ul>
                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=Yixs7pOC4V8">Learn more</a></button>

                                            </div>


                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>

                        <div class="card  percentage-card">
                            <h5 class="card-header percentage-card">We suggest investing your ₹{finalValue} in plans having low risks and low returns</h5>
                            <div class="card-body percentage-card">
                                <p class="card-text percentage-card">
                                    <ul>
                                        <li>Stability and lower potential for loss</li>
                                        <li>Consistent Returns</li>
                                        <li>Ideal for Short-Term Goals</li>
                                    </ul>
                                </p>


                                <div class="container">

                                    <div class="cards">

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpx-SivyPnV6jSEPTo4Q3CcUy_EfWABfmEA&s" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Debt fund</h2>
                                                <p className='mt-4'>Debt funds invest in fixed-income securities like bonds, providing stable returns with lower risk compared to equity investments.</p>
                                                <ul>
                                                    <li>treasurydirect</li>
                                                    <li>morningstar</li>
                                                    <li>investopedia</li>
                                                </ul>
                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=punoIzJm4Ro"></a>Learn more</button>

                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://jamaappprod.s3.ap-south-1.amazonaws.com/Blog/Should+You+Stop+or+Continue+Your+SIP+in+the+Current+Market+Scenario.jpg" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>SIP</h2>
                                                <p className='mt-4'>Systematic Investment Plan (SIP) is a disciplined approach to investing in mutual funds, offering benefits of regular savings and potential growth over the long term.
                                                </p>
                                                <ul>
                                                    <li>Groww</li>
                                                    <li>Etmony</li>
                                                    <li>valueresearchonline</li>
                                                </ul>

                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=1DRq8N7SpYc">Learn more</a></button>

                                            </div>
                                        </div>


                                    </div>

                                    <div className="cards">
                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://cm-cdn.creditmantri.com/community/article/guide-to-liquid-funds-in-india-working-benefits-features-best-performing-funds-more.jpg" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Liquid Funds</h2>
                                                <p className='mt-4'>Liquid funds are mutual funds designed for investors seeking short-term liquidity and stability with minimal risk.</p>
                                                <ul>
                                                    <li>Moneycontrol</li>
                                                    <li>Groww</li>
                                                    <li>Etmoney</li>
                                                </ul>
                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=jW-MDfsvL7o">Learn more</a></button>

                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://cdn.zeebiz.com/hindi/sites/default/files/styles/zeebiz_850x478/public/2023/02/14/125161-fixed-deposit-1.png" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Fixed deposits (FDs)</h2>
                                                <p className='mt-4'>Fixed deposits (FDs) are secure investments where you deposit money for a fixed period to earn guaranteed returns.</p>
                                                <ul>
                                                    <li>bankbazaar</li>
                                                    <li>www.sbi.co.in</li>
                                                    <li>hdfcbank</li>
                                                </ul>
                                                <button type="button" class="btn btn-primary btn-learn"><a href="https://www.youtube.com/watch?v=2GwZN82zMtU">Learn more</a></button>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>





                        {/*  */}
                    </div>
                </div>

                {/* card low risk */}
                <div className="collapse" id="collapseExample2">
                    <div className="card card-body">


                        <div class="card percentage-card" >
                            <h5 class="card-header percentage-card">We suggest investing your ₹{finalValue} in plans having high risks and high returns</h5>
                            <div class="card-body percentage-card">
                                <p class="card-text percentage-card">
                                    <ul>
                                        <li>Stability and lower potential for loss</li>
                                        <li>Consistent Returns</li>
                                        <li>Ideal for Short-Term Goals</li>
                                    </ul>
                                </p>

                                <div class="container">

                                    <div class="cards">

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I=" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Stocks</h2>
                                                <p className='mt-4'>Stocks represent ownership in companies, bought and sold on financial markets, offering potential growth or income.</p>
                                               
                                                <ul>
                                                    <li>finance.yahoo.com</li>
                                                     <li>zacks</li>
                                                    <li>smallcapnetwork</li>

                                                </ul>
                                                <button type="button" class="btn btn-primary btn-learn">Learn more</button>
                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://media.istockphoto.com/id/1426182267/photo/investment-on-mutual-fund-concept-coins-in-a-jar-with-soil-and-growing-plant-in-nature.webp?b=1&s=170667a&w=0&k=20&c=BpBMiLQYxn_g-JEbrTPOXIFHJomvvBxm-amK5svrhTk=" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Equity Mutual Funds</h2>
                                                <p className='mt-4'>Invests primarily in stocks or equities of companies.Potential for high returns over the long term.
                                                    Diversification across sectors and companies.</p>
                                                    <ul>
                                                    <li>morningstar</li>
                                                    <li>vanguard</li>
                                                    <li>fidelity</li>
                                                    </ul>
                                                <button type="button" class="btn btn-primary btn-learn">Learn more</button>

                                            </div>
                                        </div>


                                    </div>

                                    <div className="cards">
                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Cryptocurrencies</h2>
                                                <p>Cryptocurrencies are digital assets designed for secure, decentralized transactions, utilizing blockchain technology for transparency and global accessibility.</p>
                                                <ul>
                                                        <li>coinbase</li>
                                                        <li>coinmarketcap</li>
                                                        <li>cryptoslate</li>
                                                    </ul>
                                                <button type="button" class="btn btn-primary btn-learn">Learn more</button>

                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card__img">
                                                <img src="https://t4.ftcdn.net/jpg/02/73/56/31/360_F_273563132_mqONjq5vNAifX4v7Ha2oGcP3Y1ldzCfb.jpg" alt="" />
                                            </div>
                                            <div class="cart__content">
                                                <h2>Small caps</h2>
                                                <p>Small-cap stocks represent companies with smaller market capitalizations, offering higher growth potential and increased volatility for investors.</p>
                                                <ul>
                                                    <li>finance.yahoo.com</li>
                                                     <li>zacks</li>
                                                    <li>smallcapnetwork</li>

                                                </ul>
                                                <button type="button" class="btn btn-primary btn-learn">Learn more</button>

                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>



                    <div class="card percentage-card" >
                        <h5 class="card-header percentage-card">We suggest investing your ₹{percentageResult} in plans having low risks and low returns</h5>
                        <div class="card-body percentage-card">
                            <p class="card-text percentage-card">
                                <ul>
                                    <li>Potential for High Returns</li>
                                    <li>Longer Investment Horizon</li>
                                    <li>Higher Chance of Loss</li>
                                </ul>
                            </p>

                            <div class="container">



                                <div class="cards">

                                    <div class="card">
                                        <div class="card__img">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpx-SivyPnV6jSEPTo4Q3CcUy_EfWABfmEA&s" alt="" />
                                        </div>
                                        <div class="cart__content">
                                            <h2>Debt fund</h2>
                                            <p className='mt-4'>Debt funds invest in fixed-income securities like bonds, providing stable returns with lower risk compared to equity investments.</p>
                                            <ul>
                                                    <li>treasurydirect</li>
                                                    <li>morningstar</li>
                                                    <li>investopedia</li>
                                                </ul>
                                            <button type="button" class="btn btn-primary btn-learn">Learn more</button>

                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card__img">
                                            <img src="https://jamaappprod.s3.ap-south-1.amazonaws.com/Blog/Should+You+Stop+or+Continue+Your+SIP+in+the+Current+Market+Scenario.jpg" alt="" />
                                        </div>
                                        <div class="cart__content">
                                            <h2>SIP</h2>
                                            <p className='mt-4'>Systematic Investment Plan (SIP) is a disciplined approach to investing in mutual funds, offering benefits of regular savings and potential growth over the long term.
                                            </p>
                                            <ul>
                                                    <li>Groww</li>
                                                    <li>Etmony</li>
                                                    <li>valueresearchonline</li>
                                                </ul>

                                            <button type="button" class="btn btn-primary btn-learn">Learn more</button>

                                        </div>
                                    </div>


                                </div>

                                <div className="cards">
                                    <div class="card">
                                        <div class="card__img">
                                            <img src="https://cm-cdn.creditmantri.com/community/article/guide-to-liquid-funds-in-india-working-benefits-features-best-performing-funds-more.jpg" alt="" />
                                        </div>
                                        <div class="cart__content">
                                            <h2>Liquid Funds</h2>
                                            <p className='mt-4'>Liquid funds are mutual funds designed for investors seeking short-term liquidity and stability with minimal risk.</p>
                                            <ul>
                                                    <li>Moneycontrol</li>
                                                    <li>Groww</li>
                                                    <li>Etmoney</li>
                                                </ul>
                                            <button type="button" class="btn btn-primary btn-learn">Learn more</button>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card__img">
                                            <img src="https://cdn.zeebiz.com/hindi/sites/default/files/styles/zeebiz_850x478/public/2023/02/14/125161-fixed-deposit-1.png" alt="" />
                                        </div>
                                        <div class="cart__content">
                                            <h2>Fixed deposits (FDs)</h2>
                                            <p className='mt-4'>Fixed deposits (FDs) are secure investments where you deposit money for a fixed period to earn guaranteed returns.</p>
                                            <ul>
                                                    <li>bankbazaar</li>
                                                    <li>www.sbi.co.in</li>
                                                    <li>hdfcbank</li>
                                                </ul>
                                            <button type="button" class="btn btn-primary btn-learn">Learn more</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>




            {/* card ends */}



        </>
    )
};

export default Investment;