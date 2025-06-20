# June Calendar - Interactive Celebration Calendar - Using AWS Amplify Hosting for Responsive Landing Pages

_This is a submission for [Frontend Challenge - June Celebrations, Perfect Landing: June Celebrations](https://dev.to/challenges/frontend-2025-06-04)_

## What I Built

I created an interactive calendar that showcases significant days and celebrations throughout the month of June. The calendar highlights cultural celebrations, historical events, awareness days, and natural phenomena that occur during this vibrant month.

Key features include:
- Interactive calendar grid with event indicators
- Category filtering system to focus on specific types of events
- Detailed information panels for each significant day
- Featured days section highlighting important June celebrations
- Responsive design that works across all devices

The calendar focuses on important June celebrations like Juneteenth, Summer Solstice, and Flag Day, providing educational content about their significance and history.

## Demo

The project is deployed on AWS Amplify and can be accessed at: [June Calendar Demo](http://calendar.viaan.tech)

![June Celebration Abstract](images/june-celebration-abstract.png)

## Journey

### Inspiration

June is a month filled with significant celebrations and observances. From Juneteenth commemorating the emancipation of enslaved African Americans to the Summer Solstice marking the longest day of the year, June offers a rich tapestry of cultural, historical, and natural events. I wanted to create an interactive way for people to explore these celebrations and learn about their significance.

### Development Process

1. **Research Phase**: I began by researching significant days in June, gathering information about cultural celebrations, historical events, awareness days, and natural phenomena.

2. **Design Phase**: I created a clean, modern design focused on usability and accessibility. The color scheme was chosen to evoke the bright, warm feeling of summer.

3. **Development Phase**: 
   - Built the responsive calendar grid using CSS Grid
   - Implemented the event data structure in JavaScript
   - Created interactive features like filtering and day selection
   - Developed the featured days section to highlight key celebrations
   - Ensured accessibility compliance throughout the application

4. **Testing & Refinement**: Tested across multiple devices and browsers, refined the user experience, and fixed any issues that arose.

### Challenges & Solutions

One of the main challenges was creating a calendar grid that maintained consistent sizing across different screen sizes while accommodating varying amounts of content. I solved this by using a combination of CSS Grid for layout and flexbox for content distribution within each day cell.

Another challenge was implementing the filtering system in a way that was both visually appealing and performant. I used CSS transitions to create smooth animations when filtering, while ensuring the JavaScript filtering logic was optimized.

### What I Learned

This project deepened my understanding of:
- Advanced CSS Grid and Flexbox techniques
- JavaScript event handling and DOM manipulation
- Accessibility considerations for interactive web applications
- Performance optimization for animations and transitions

### Next Steps

In the future, I'd like to:
- Add more interactive elements like a search function
- Expand the calendar to cover other months
- Implement a user contribution system where people can submit their own significant days
- Create a year view that highlights major celebrations across all months

## Deployment

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/awsdataarcitect/june-calendar.git
   cd june-calendar
   ```

2. **Open the project**:
   Simply open the `index.html` file in your browser to view the project locally.

3. **Make changes**:
   - Edit the HTML, CSS, and JavaScript files as needed
   - Refresh your browser to see the changes

**Recommended Solutions:**

1. **Use Amplify Console Instead (Recommended)**:
   - The web-based Amplify Console (Option 4) doesn't have this issue
   - It handles static site deployment efficiently without large local artifacts

2. **Use an Alternative Deployment Method**:
   - GitHub Pages, Netlify, or Vercel (Options 1-3) are better suited for simple static sites
   - These platforms are optimized for static site hosting and deployment

### Deployment Options

Since this is a static HTML/CSS/JS site, you have several simple deployment options:

#### Option 1: GitHub Pages (Easiest)

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select your branch (main/master) as the source
4. Your site will be published at `https://yourusername.github.io/repository-name/`

#### Option 2: Netlify Drop (No Account Required)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop your project folder
3. Your site will be instantly published with a Netlify subdomain

#### Option 3: Vercel (Good for Continuous Deployment)

1. Push your code to a Git repository
2. Go to [Vercel](https://vercel.com/import)
3. Connect your repository
4. Your site will be deployed automatically

#### Option 4: AWS Amplify Console

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
3. Click "New app" > "Host web app"
4. Connect your Git provider and select your repository
5. For the build settings, use:
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands: []
     artifacts:
       baseDirectory: /
       files:
         - '**/*'
   ```
6. Click "Save and deploy"

#### Option 5: AWS Amplify CLI (Advanced)

If you prefer using the CLI, follow these steps to make it work correctly:

1. **Prerequisites**:
   - AWS CLI installed and configured
   - Amplify CLI installed: `npm install -g @aws-amplify/cli`

2. **Create a build script file**:
   ```bash
   # Create a simple build script
   echo '#!/bin/bash\necho "No build required for static site"\nexit 0' > build.sh
   chmod +x build.sh
   ```

3. **Initialize and deploy**:
   ```bash
   # Initialize Amplify
   amplify init
   
   # Add hosting
   amplify add hosting
   # Choose "Amplify Hosting" when prompted
   # Select "Manual deployment" option
   
   # Configure the project
   amplify configure project
   # What javascript framework are you using? -> Select "none"
   # Source Directory Path: -> Enter "."
   # Distribution Directory Path: -> Enter "."
   # Build Command: -> Enter "./build.sh"
   # Start Command: -> Leave empty (just press Enter)
   
   # Publish the app
   amplify publish
   ```

4. **If you still encounter issues**, use the Amplify Console method (Option 4) instead

### Custom Domain (Optional)

All the platforms mentioned above support custom domains:

1. Purchase a domain from a registrar like Namecheap, GoDaddy, or AWS Route 53
2. In your hosting platform's settings, find the "Custom Domains" or "Domain Management" section
3. Follow the platform-specific instructions to connect your domain
4. Update your DNS records as instructed by the platform
5. Wait for DNS propagation (can take up to 48 hours)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ for the Frontend Challenge - June Celebrations