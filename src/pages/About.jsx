import React from "react";

const About = () => {
    return (
        <>
            <div className="h-100">
                <h1 className="display-3 p-2 text-white text-center">About</h1>
                <hr />
            </div>

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-primary border border-2 display-6">Purpose</h2>
                <hr />
                <div className="p-2 bg-dark border border-2">
                    <p>
                        The reason for creating this site was to gain a functional knowledge of the React
                        framework as well as improving my skills with frontend development in general. 
                    </p>

                    <p>
                        It started with a simple tutorial for a task manager to get the basics of how 
                        React was structured, the component lifecycle, what it was capable of and how data 
                        was passed around. Once that was complete and operational I made the jump to 
                        desiging an entire frontend for a fictional distribution company.
                    </p>

                    <p>
                        I needed a data source to start with as the goal of this exercise was to learn 
                        React, not design and populate data tables. I came across a repository that
                        was a sqlite conversion of a legacy Microsoft Access sample database on GitHub
                        (credited below). This seemed to be the perfect entry point for putting up an 
                        API and having a backend to utilize while gaining real world applicable
                        knowledge of React.
                    </p>

                    <p>
                        This being a fictional use case, the project will be feature rich, but not feature 
                        complete. With this site applied as a learning experience, there will be some obvious 
                        opportunities left for improvement and as such it only needs to go so far in its reach.
                    </p>
                </div>
            </div>

            <hr />

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-success border border-2 display-6">Tech</h2>
                <hr />
                <div className="p-2 bg-dark border border-2">
                    <p className="text-decoration-underline">
                        Data Source
                    </p>
                    <div className="ps-5">
                        <p>
                            <a href="https://github.com/jpwhite3/northwind-SQLite3">GitHub Northwind SQLite3</a>
                            &nbsp; Author: jpwhite3 
                            <br />
                        </p>

                        <p>
                            Modifications Made:
                            <div className="ps-5">
                                Additional Tables for employee logins/passwords
                                <ul style={{listStyle:"disc"}}>
                                    <li>Auth(Id, RoleId, EmployeeId, Username, Hash)</li>
                                    <li>Role(Id, RoleName)</li>
                                </ul>
                            </div>
                            
                            Minor fix - CustomerId's not matching Order table
                        </p>
                    </div>

                    <p className="text-decoration-underline">
                        API Backend
                    </p>
                    <div className="ps-5">
                        <p>
                            Microsoft
                            <div className="ps-5">
                                <ul style={{listStyle:"disc"}}>
                                    <li>NET Core Framework</li>
                                    <li>ASPNET Core Framework</li>
                                    <li>Entity Framework Core for SQLite</li>
                                </ul>
                            </div>
                            3rd Party
                            <div className="ps-5">
                                <ul style={{listStyle:"disc"}}>
                                    <li>Swagger via Swashbuckle</li>
                                    <li>Automapper</li>
                                </ul>
                            </div>

                        </p>                 
                    </div>

                    <p className="text-decoration-underline">
                        Frontend
                    </p>
                    <p>
                        <div className="ps-5">
                            <ul style={{listStyle:"disc"}}>
                                <li>REACT Framework</li>
                                <ul className="ps-5" style={{listStyle:"disc"}}>
                                    <li>native fetch (api calls)</li>
                                </ul>
                                <li>Vite (for enhanced development)</li>
                                <li>Node.js (required by Vite)</li>
                                <li>SASS</li>
                                <li>Bootstrap + react-bootstrap (for JS dependent components)</li>
                                <li>MUI X (Dashboard Charts)</li>
                            </ul>
                        </div>
                    </p>
                </div>
            </div>
            
            <hr />

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-warning border border-2 display-6">Bio</h2>
                <hr />
                <div className="p-2 bg-dark border border-2">
                    <p>
                        I have a lengthy history of full-stack development for a large enterprise
                        company where I had to manage a wide variety of web based applications 
                        across many repos that implemented varying dependencies and tech.
                    </p>

                    <p>
                        I spent much of my time there
                        <div className="ps-5">
                            <ul style={{listStyle:"disc"}}>
                                <li>Maintaining legacy projects</li>
                                <li>Migrating business logic to API's</li>
                                <li>Implementing new site functionality</li>
                                <li>Testing new code and writing unit tests</li>
                                <li>Overhauling existing logical systems</li>
                                <li>Inserting mass table data</li>
                                <li>Restructuring tables</li>
                                <li>Auditing legacy data and resolving issues</li>
                                <li>Investigating long standing complex bugs </li>
                            </ul>
                        </div> 
                        
                        The nature of the business depended on the immutability of bound contracts. Data integrity was priority 
                        number one so all theses tasks were performed with calculated regard to maintain that integrity.
                    </p>
                    <hr />
                    <p>
                        While working with this company I simultaneously spent a large portion of my free time working with an indie game
                        studio as the sole developer to create mobile games in Unity 3D. The team consisted of a studio head that ran scrum 
                        meetings, one or two artists, a marketing and web designer, a sound designer along with myself.

                        Many of my tasks with this group included
                        <div className="ps-5">
                            <ul style={{listStyle:"disc"}}>
                                <li>Writing logic for</li>
                                    <ul className="ps-5" style={{listStyle:"disc"}}>
                                        <li>UI</li>
                                        <li>Game State</li>
                                        <li>Events</li>
                                        <li>Player Movement</li>
                                        <li>Player Interactions</li>
                                        <li>Animation Transitions</li>
                                        <li>Enemy AI</li>
                                    </ul>
                                <li>Importing assets to the game engine</li>
                                <li>Placing assets, building levels and setting collision bounds</li>
                                <li>Utilizing ad frameworks for monetization</li>
                                <li>Submitting builds for both Android and iOS</li>
                            </ul>
                        </div> 
                    </p>
                </div>
            </div>

            <hr />

            <div className="w-100">
                <h2 className="p-2 text-white text-center bg-secondary border border-2 display-6">Credits - Assets</h2>
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