<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Videography Booking Website</title>
    <link rel="stylesheet" href="{{ asset('styles.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/x-icon" href="favicon.png.png">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#booking">Booking</a></li>
            </ul>
        </nav>
    </header>

    <section id="home">
        <h1>Your story, captured beautifully</h1>
        <section> </section>
          <div class="portfolio-container">
        <iframe src="https://drive.google.com/file/d/1s3zisoZDr28hEBd8eqEOZxRpuRmSdG6p/preview?" width="800" height="450"> </iframe> 
    </div> </section>

    <section id="portfolio">
        <h1>My Portfolio</h1>
        <div class="portfolio-container">
            <div class="portfolio-item">
                <iframe width="560" height="315" src="https://drive.google.com/file/d/1vVra14fXKVjYSza3NYKMpR2UKyGew1tv/preview?" frameborder="0" allowfullscreen></iframe>
                <p>Dance Competition</p>
            </div>
            <div class="portfolio-item">
                <iframe width="560" height="315" src="https://drive.google.com/file/d/1C74RylCukKvomRIjAOnAg8bB6D6g45MQ/preview?" frameborder="0" allowfullscreen></iframe>
                <p>Predebut Film </p>
            </div>
            <div class="portfolio-item">
                <iframe width="560" height="315" src="https://drive.google.com/file/d/1VbW0FXiMeb6rsOyBVgwibf1iP09SL-sP//preview?" frameborder="0" allowfullscreen></iframe>
                <p>Battle of the Bands<p>
            </div>
      
        <div class="portfolio-item">
            <iframe width="560" height="315" src="https://drive.google.com/file/d/1qhrCj_jECfxySmIjx81Db-D4GryATsa4//preview?" frameborder="0" allowfullscreen></iframe>
            <p>Documentary<p>
            </div>
            <div class="portfolio-item">
                <iframe width="560" height="315" src="https://drive.google.com/file/d/1VTmcMthu34rSysa1_Dn6e3lHGa-QNyrE//preview?" frameborder="0" allowfullscreen></iframe>
                <p>Maritime Flag Raising<p>
        </div>
    </div>
    
    </section>

    <section id="about">
        <h1>About Me</h1>
        <div class="about-content">
            <div class="about-text">
                <p>I am dedicated to capturing your special moments. With over 5 years of experience, I bring your stories to life through the lens of my cameras. Whether it's a wedding, corporate event, or a music video, I deliver high-quality videos tailored to your needs.</p>
                <p>I am passionate about storytelling and committed to delivering a cinematic experience. I use the latest technology and creative techniques to ensure your videos are not only beautiful but also memorable.</p>
                <p>I believe in building lasting relationships with my clients and strive to exceed their expectations. My goal is to provide a seamless and enjoyable experience from the initial consultation to the final delivery of your video.</p>
            </div>
            <div class="about-photo">
                <img src="pp.png" alt="About Us">
            </div>
        </div>
        <div class="about-photo-placeholder">
            <img src="sag.png" alt="Placeholder Image">
        </div>
    </section>

    <section id="booking">  
        <h2>Book a Session</h2>
        <form id="bookingForm">
            <input type="text" id="nameInput" placeholder="Your Name" required>
            <input type="email" id="emailInput" placeholder="Your Email" required>
            <input type="date" id="dateInput" required>
            <button type="submit">Book Now</button>
        </form>
        <ul id="bookingList"></ul>
        <div class="about-photo-placeholder">
            <img src="soon.png" alt="Placeholder Image">
        </div>
    </section>

    <footer>
        <p>&copy; 2024 Markshane Clemen. All rights reserved.</p>
    </footer>
    <script src="{{asset('scripts.js')}}"></script>  
    
</body>
</html>
