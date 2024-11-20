import React from "react";

const About = () => {
    return (
        <>
            <div className="h-100">
                <h1 className="display-1 p-2 text-white">About</h1>
                <hr className="text-white w-80" style={{height: "3px"}}/>
            </div>

            <div>
                <h2 className="p-2 text-white">Credits - Assets</h2>
                <hr className="text-white w-25" style={{height: "3px"}}/>
                <p>
                    Following Vectors and icons from <a href="https://www.svgrepo.com">SVG Repo</a>
                    <br />
                    Under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons by Attribution</a> License
                    <br />
                    <br />
                    Product Catalog icons by <a href="https://www.behance.net/james_chou?ref=svgrepo.com">Yu Chun Chou</a>
                    <br />
                    <br /> 
                    <hr className="text-white w-25" style={{height: "3px"}}/>
                    Following Vectors and icons from <a href="https://fonts.google.com/icons">Google</a>
                    <br />
                    Under <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a> License

                    <br />
                    <br />
                    Navigation Icons
                </p>
            </div>
        </>
    );
};

export default About;