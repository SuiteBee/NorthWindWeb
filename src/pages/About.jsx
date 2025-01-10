import React from "react";

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import ProduceImg from "@/assets/products/apple.svg";
import GrainsImg from "@/assets/products/bread.svg";
import ConfectionsImg from "@/assets/products/donut.svg";
import BeveragesImg from "@/assets/products/drink.svg";
import CondimentsImg from "@/assets/products/jar.svg";
import SeafoodImg from "@/assets/products/lobster.svg";
import MeatImg from "@/assets/products/meat.svg";
import DairyImg from "@/assets/products/milk.svg";

import HomeIcon from "@/assets/icon/homeIcon.svg";
import TaskIcon from "@/assets/icon/taskIcon.svg";
import OrderIcon from "@/assets/icon/orderIcon.svg";
import ClientsIcon from "@/assets/icon/clientsIcon.svg";
import CatalogIcon from "@/assets/icon/productIcon.svg";
import AboutIcon from "@/assets/icon/aboutIcon.svg";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";

import ProfileImg from "@/assets/icon/profileIcon.svg";

const About = () => {
    return (
        <>
            <div className="h-100 px-5">
                <h1 className="aboutHeader">About</h1>
                <hr />
            </div>

            <div className="w-100 px-5">
                <h2 className="aboutSubHeader bg-primary">Purpose</h2>
                <hr />
                <div className="aboutBlock">
                    <p className="aboutText">
                        The reason for creating this site was to gain a functional knowledge of the React
                        framework as well as improving my skills with frontend development in general. 
                    </p>

                    <p className="aboutText">
                        It started with a simple tutorial for a task manager to get the basics of how 
                        React was structured, the component lifecycle, what it was capable of and how data 
                        was passed around. Once that was complete and operational I made the jump to 
                        desiging an entire frontend for a fictional distribution company.
                    </p>

                    <p className="aboutText">
                        I needed a data source to start with as the goal of this exercise was to learn 
                        React, not design and populate data tables. I came across a repository that
                        was a sqlite conversion of a legacy Microsoft Access sample database on GitHub
                        (credited below). This seemed to be the perfect entry point for putting up an 
                        API and having a backend to utilize while gaining real world applicable
                        knowledge of React.
                    </p>

                    <p className="aboutText">
                        This being a fictional use case, the project will be feature rich, but not feature 
                        complete. With this site applied as a learning experience, there will be some obvious 
                        opportunities left for improvement and as such it only needs to go so far in its reach.
                    </p>
                </div>
            </div>

            <div className="w-100 px-5">
                <hr />
                <h2 className="aboutSubHeader bg-success">Tech</h2>
                <hr />
                <div className="aboutBlock">
                    <p className="aboutText text-decoration-underline">
                        Data Source
                    </p>
                    <div className="ps-5">
                        <p className="aboutText">
                            <a href="https://github.com/jpwhite3/northwind-SQLite3">GitHub Northwind SQLite3</a>
                            &nbsp; Author: jpwhite3 
                            <br />
                        </p>

                        <p className="aboutText">
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

                    <p className="aboutText text-decoration-underline">
                        API Backend
                    </p>
                    <div className="ps-5">
                        <p className="aboutText">
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

                    <p className="aboutText text-decoration-underline">
                        Frontend
                    </p>
                    <p className="aboutText">
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

            <div className="w-100 px-5">
                <hr />
                <h2 className="aboutSubHeader bg-info">Bio</h2>
                <hr />
                <div className="aboutBlock">
                    <p className="aboutText">
                        I have a lengthy history of full-stack development for a large enterprise
                        company where I had to manage a wide variety of web based applications 
                        across many repos that implemented varying dependencies and tech.
                    </p>

                    <p className="aboutText">
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
                    <p className="aboutText">
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

            <div className="w-100 px-5">
                <hr />
                <h2 className="aboutSubHeader bg-secondary">Credits - Assets</h2>
                <hr />
                <div className="aboutBlock">
                    <p className="aboutText">
                        Following Vectors and icons from <a href="https://www.svgrepo.com">SVG Repo</a>
                        <br />
                        Under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons by Attribution</a> License
                        <br />
                        <br />
                        Product Catalog icons by <a href="https://www.behance.net/james_chou?ref=svgrepo.com">Yu Chun Chou</a>
                        <div className="p-2 d-flex gap-3">
                            <img style={{height:"25px", width:"25px"}} src={ProduceImg}></img>
                            <img style={{height:"25px", width:"25px"}} src={GrainsImg}></img>
                            <img style={{height:"25px", width:"25px"}} src={ConfectionsImg}></img>
                            <img style={{height:"25px", width:"25px"}} src={BeveragesImg}></img>
                            <img style={{height:"25px", width:"25px"}} src={CondimentsImg}></img>
                            <img style={{height:"25px", width:"25px"}} src={SeafoodImg}></img>
                            <img style={{height:"25px", width:"25px"}} src={MeatImg}></img>
                            <img style={{height:"25px", width:"25px"}} src={DairyImg}></img>
                        </div>
                        
                    </p>

                    <hr />

                    <p className="aboutText">
                        Following Vectors and icons from <a href="https://fonts.google.com/icons">Google</a>
                        <br />
                        Under <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a> License

                        <br />
                        <br />
                        <div className="ps-5">
                            <ul style={{listStyle:"disc"}}>
                                <li>Navigation Icons</li>
                                <li style={{listStyle:"none"}}>
                                    <div className="p-2 d-flex gap-3">
                                        <img style={{height:"25px", width:"25px"}} src={HomeIcon}></img>
                                        <img style={{height:"25px", width:"25px"}} src={TaskIcon}></img>
                                        <img style={{height:"25px", width:"25px"}} src={OrderIcon}></img>
                                        <img style={{height:"25px", width:"25px"}} src={ClientsIcon}></img>
                                        <img style={{height:"25px", width:"25px"}} src={CatalogIcon}></img>
                                        <img style={{height:"25px", width:"25px"}} src={AboutIcon}></img>
                                        <img style={{height:"25px", width:"25px"}} src={LogoutIcon}></img>
                                    </div>
                                </li>
                                <li>Client Profile Icon</li>
                                <li style={{listStyle:"none"}}>
                                    <div className="p-2 d-flex gap-3">
                                        <img style={{height:"25px", width:"25px"}} src={ProfileImg}></img>
                                    </div>
                                </li>
                                <li><a href="https://fonts.google.com/specimen/Lora" style={{fontFamily:"Lora"}}>Lora Font</a></li>
                                <li><a href="https://fonts.google.com/specimen/Merriweather" style={{fontFamily:"Merriweather"}}>Merriweather Font</a></li>
                                <li><a href="https://fonts.google.com/specimen/Poppins" style={{fontFamily:"Poppins"}}>Poppins Font</a></li>
                            </ul>
                        </div>
                    </p>
                </div>
            </div>
            <br />
        </>
    );
};

export default About;