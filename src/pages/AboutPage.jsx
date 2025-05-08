// src/pages/AboutPage.jsx
import React from 'react';

function AboutPage() {
  return (
    <div>
      <h2>About This App</h2>

      <section>
        <h3>Our Mission</h3>
        <p>
          Our app is a simple, intuitive tool designed to help you stay on top of both your finances and daily tasks. Whether you're managing a budget, keeping track of your to-dos, or converting time zones, we've got you covered.
        </p>
      </section>

      <section>
        <h3>Key Features</h3>
        <ul>
          <li>Track income and spending with ease</li>
          <li>Manage your daily tasks and mark them as completed</li>
          <li>View a clean dashboard summary of your financial status and tasks</li>
          <li>Secure login with JWT authentication</li>
          <li>Time Zone Converter to easily coordinate with others across different regions</li>
        </ul>
      </section>

      <section>
        <h3>Who It's For</h3>
        <p>
          Ideal for freelancers, students, professionals working across multiple time zones, or anyone who wants to stay financially aware while managing their daily tasks.
        </p>
      </section>

      <section>
        <h3>The Story Behind the App</h3>
        <p>
          Built as part of a capstone project, this app reflects my passion for helping people manage their time, money, and cross activities more effectively. Combining the power of React and Ruby on Rails, this app is designed to be easy to use and highly functional.
        </p>
      </section>

      <section>
        <h3>Contact / Acknowledgments</h3>
        <p>
          If you have any questions or suggestions, feel free to reach out via GitHub or email. Special thanks to the open-source community for the amazing libraries and resources that made this possible. But most importantly to our teacher Leon Shimizu and the ChamorroChip cohort for his guidance throughout the class.
        </p>
        <p>
          <a href="https://github.com/charleysan/CSGCapstone" target="_blank" rel="noopener noreferrer">
            GitHub Repo
          </a>
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
