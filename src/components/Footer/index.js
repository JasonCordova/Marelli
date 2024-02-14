import './index.css';

const footerLogo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 379.408 36.328"><path d="M306.164 18.164C306.164 7.94 313.604.5 324.117.5c10.464 0 17.9 7.441 17.9 17.664s-7.439 17.664-17.9 17.664c-10.509 0-17.953-7.44-17.953-17.664Zm3.792 0c0 8.3 5.808 14.3 14.161 14.3s14.159-6 14.159-14.3-5.808-14.3-14.159-14.3-14.161 5.996-14.161 14.3Zm69.952 17.04v-1h1v1Zm-118.48 0V1.124h7.1v34.08Zm-37.68 0V1.124h7.1v28.272h13.489v5.808Zm-37.344 0V1.124h7.1v28.272h13.488v5.808Zm-41.424 0V1.124h24.48v5.808h-17.471v8.016h15.888v5.756h-15.888v8.688h17.808v5.812Zm-23.184 0-7.728-12.1h-5.808v12.1h-6.96V1.124h14.928c7.1 0 12.337 3.743 12.337 10.7v.58a9.83 9.83 0 0 1-7.3 9.984l8.5 12.816ZM108.26 17.252h7.248c3.36 0 5.76-1.488 5.76-4.848v-.576c0-3.408-2.4-4.848-5.76-4.848h-7.248ZM78.5 35.204l-2.592-7.3H62.181l-2.592 7.3h-7.2L65.301 1.125h7.728L85.94 35.204ZM64.244 22.148h9.649L69.045 8.565ZM30.308 35.204V9.188l-8.64 26.016h-5.617L7.364 9.14v26.064H.499V1.124h10.177l8.352 25.247 8.3-25.247h9.7v34.08Zm283.824-16.752v-.528c0-6.289 3.888-10.464 10.271-10.464 5.328 0 8.88 3.024 9.456 7.968h-5.424c-.383-2.208-1.535-3.647-4.127-3.647-3.072 0-4.512 2.256-4.512 6.144v.528c0 3.936 1.44 6.144 4.512 6.144 2.592 0 3.744-1.44 4.127-3.648h5.473c-.624 4.992-4.176 8.017-9.5 8.017-6.388-.002-10.276-4.274-10.276-10.514Z"/></svg>;

const Footer = () => {
    return (
        <div className="footer">
            
            <div className="footer-logo">
                {footerLogo}
                {footerLogo}
            </div>

            <div className="footer-line">
                <span>Marelli © 2024</span>
                <span>Code by Jason C.</span>
            </div>

        </div>
    );
}

export default Footer;