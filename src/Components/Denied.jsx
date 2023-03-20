import '../Styles/shortener.css';

export default function Denied() {

    return (
        <div className='denied-container'>
            <div className="denied-text">
                <h1>Acces denied!</h1>
                <h2>Something went wrong...</h2><br></br>
                <h3>Try to login again or refresh the home page.</h3>
            </div>
        </div>
    )
};