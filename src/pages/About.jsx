import React from "react";

const About = () => {
    return (
        <>
            <div className="h-100">
                <h1 className="display-1 p-2 text-white text-center">About</h1>
                <hr />
            </div>

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-primary border border-2 display-4">Purpose</h2>
                <hr />
                <div className="p-2 bg-dark border border-2">
                    <p>
                        The reason for creating this site was to gain a functional knowledge of the React
                        framework as well as improving my skills with frontend development in general. 
                    </p>

                    <p>
                        It started with a simple tutorial for a task manager to get the basics of how 
                        React was structured, what it was capable of and how data was passed to and from 
                        components. Once that was complete and operational I made the jump to desiging an 
                        entire functional frontend for a fictional distribution company.
                    </p>

                    <p>
                        I needed a datasource to start with as the goal of this exercise was to learn 
                        React, not design and populate data tables. I came across a repository that
                        was a conversion of Microsoft Access 2000 Northwind sample database on GitHub
                        (credited below). This seemed to be the perfect entry point for putting up an 
                        API and having some backend to play with while gaining real world applicable
                        knowledge of React.
                    </p>
                </div>
            </div>

            <hr />

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-success border border-2 display-4">Tech</h2>
                <hr />
                <div className="p-2 bg-dark border border-2">
                    <p className="text-decoration-underline">
                        Data Source
                    </p>
                    <p>
                        <a href="https://github.com/jpwhite3/northwind-SQLite3">GitHub Northwind SQLite3</a>
                        &nbsp; Author: jpwhite3 
                        <br />
                    </p>

                    <p>
                        Modifications Made:
                        <br />
                        Table Auth(Id, RoleId, EmployeeId, Username, Hash)
                        <br />
                        Table Role(Id, RoleName)
                        <br />
                        Minor fix - CustomerId's not matching Order table
                    </p>

                    <p className="text-decoration-underline">
                        API Backend
                    </p>
                    <p>
                        Microsoft
                        <br />
                        NET Core Framework
                        <br />
                        ASPNET Core Framework
                        <br />
                        Entity Framework Core for SQLite
                    </p>
                    <p className="text-decoration-underline">
                        Frontend
                    </p>
                    <p>
                        REACT Framework
                        <br />
                        SASS (styling)
                    </p>

                </div>
            </div>
            
            <hr />

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-warning border border-2 display-4">Bio</h2>
                <hr />
                <div className="p-2 bg-dark border border-2">
                    <p>
                        I have a lengthy history of full-stack development for a large enterprise insurance
                        company where I had to manage a wide variety of applications across many repos utilizing
                        different methods and tech.
                    </p>

                    <p>
                        I worked on maintaining legacy projects, migrating business
                        logic to API's, implementing new functionality, overhauling existing systems, mass data 
                        insertion, database rewrites, stored procedures, lengthy investigations for complex bugs 
                        all while ensuring the the integrity of the insurance contract was maintained. This means
                        data integrity was a number one priority, once bound the policy was immutable.
                    </p>
                </div>
            </div>

            <hr />

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-secondary border border-2 display-4">Credits - Assets</h2>
                <hr />
                <div className="p-2 bg-dark border border-2">
                    <p>
                        Following Vectors and icons from <a href="https://www.svgrepo.com">SVG Repo</a>
                        <br />
                        Under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons by Attribution</a> License
                        <br />
                        <br />
                        Product Catalog icons by <a href="https://www.behance.net/james_chou?ref=svgrepo.com">Yu Chun Chou</a>
                        
                    </p>

                    <hr />

                    <p>
                        Following Vectors and icons from <a href="https://fonts.google.com/icons">Google</a>
                        <br />
                        Under <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a> License

                        <br />
                        <br />
                        Navigation Icons
                    </p>
                </div>
            </div>

            <br />
        </>
    );
};

export default About;