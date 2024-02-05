const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
        <div class="footer-about" id="footer">
            <div class = "logo-slogan">
                <img src="../img/light-logo.png" class="logo" alt="">
                <p class="slogan">Where Education Meets Innovation</p>
            </div>
            <div class="footer-about-container">
                <div class="about">
                    <p class="footer-title">About ME</p>
                    <p class="info">Hello there! I'm Laysan, a dedicated Quality Assurance Automation Engineer with a passion for ensuring the reliability,
                    </p>
                    <p class="info"> performance, and scalability of software applications. With a keen eye for detail and a commitment to quality,
                    </p>
                    <p class="info"> I specialize in designing and implementing automated testing solutions to streamline the testing process.
                    </p>
                    <p class="info">This portfolio showcases the project and initiative that reflect
                        my commitment to interactive technologies and user-friendly experiences.
                    </p>
                </div>
            </div>
        </div>
        <div class="footer-info-container">
            <ul class="contact-info">
                <li class="contact-info-title">Contact me:</li>
                <li><a href="#" class="contact-info-link">https://www.linkedin.com/in/laysan-martin/</a></li>
                <li><a href="#" class="contact-info-link">laysan.martin.job.com</a></li>
                <li><a href="#" class="contact-info-link">970-000-0000</a></li>
            </ul>  
            <ul class="contact-info">
                <li class="contact-info-title">Skills:</li>
                <li><a href="#" class="contact-info-link">Programming Languages: Java, Python, JavaScript, HTML, CSS, JSON</a></li>
                <li><a href="#" class="contact-info-link">Automation Frameworks: Playwright, Selenium WebDriver, Maven, TestNG, JUnit, Node.js, Cucumber, Cypress</a></li>
                <li><a href="#" class="contact-info-link">API Testing: Swagger, Selenium DevTools, Postman, Playwright, Charles Proxy</a></li>
            </ul>
            <ul class="contact-info">
                <li class="contact-info-title">Skills:</li>
                <li><a href="#" class="contact-info-link">Backend Testing: SQL, JDBC</a></li>
                <li><a href="#" class="contact-info-link">CI/CD: GitHub Actions, Jenkins</a></li>
                <li><a href="#" class="contact-info-link">Test Management: Jira, TestRail, Zephyr, Trello, QTest, QAlity Plus, Confluence</a></li> 
            </ul>            
        </div>
    </div>
    <div class="footer-bottom">
        <br>
    </div>
    `;
}

createFooter();