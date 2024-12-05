# Gemini

A real-time cryptocurrency tracker that allows users to monitor cryptocurrency prices, trends, and historical data. This application is built using React.js for the frontend, Firebase for the database, and integrates Charts.js for displaying cryptocurrency price charts.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This Cryptocurrency Tracker app provides users with the ability to:
- View live cryptocurrency prices.
- Visualize price trends using Charts.js.
- Access historical data and see how different cryptocurrencies have performed.
- Authenticate and store user data in Firebase for customized tracking and preferences.

## Technologies Used

### Front-End:
- **React.js**: JavaScript library for building user interfaces.
- **Material UI**: React UI framework for designing responsive layouts with pre-built components.
- **Charts.js**: A JavaScript library for creating charts and graphs to visualize cryptocurrency price trends.
- **HTML**: Markup language for creating the structure of web pages.
- **CSS**: Stylesheet language for designing the layout and appearance of the app.

### Back-End:
- **Firebase**: Cloud-based platform for real-time database storage, authentication, and hosting.

## Features

- **Real-Time Price Updates**: View the latest cryptocurrency prices with auto-refresh.
- **Price Charts**: Track cryptocurrency trends over different time periods (hourly, daily, etc.).
- **User Authentication**: Sign in to your account and save your favorite cryptocurrencies using Firebase authentication.
- **Historical Data**: View past price history for any cryptocurrency.
- **Search Functionality**: Search for specific cryptocurrencies by name or symbol.

## Setup and Installation

To set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git

2. **Navigate to the project directory:**
   ```bash
   cd crypto-tracker

3. **Install the required dependencies:**
   ```bash
   npm install

4. Set up Firebase:
   - Create a Firebase project at Firebase Console.
   - Obtain your Firebase configuration credentials and add them to the firebase.js configuration file in the src directory.
  
5. **Run the application:**
   ```bash
   npm start

The app will run on http://localhost:3000.

## Usage
- View Real-Time Prices: Upon loading the app, you'll see the current prices of various cryptocurrencies.
- Track a Cryptocurrency: Search for a cryptocurrency and add it to your favorites for quick access.
- View Historical Data: Use the chart to select a time frame and analyze the price trends.
- Authentication: Sign in using Google or email/password authentication to store preferences and favorites in Firebase.


## Contributing
If you’d like to contribute to the project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix (git checkout -b feature-name).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Create a new pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

This is the full `README.md` file with all sections, including Setup, Usage, Contributing, and License. Just paste it into your `README.md` file, and it will be ready to render properly on GitHub or similar platforms.
