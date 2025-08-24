# Seeds of Hope Queensburgh Website

A clean, modern, and mobile-responsive website for the Seeds of Hope Queensburgh non-profit organization. Built with HTML, CSS, and JavaScript, featuring a minimalist design inspired by the organization's logo.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, minimalist design with smooth animations
- **Brand Colors**: Uses the organization's brand colors throughout
- **Interactive Elements**: Hover effects, smooth scrolling, and animations
- **Contact Form**: Functional contact form with validation
- **Testimonials Slider**: Auto-advancing testimonials with manual navigation
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🎨 Design System

### Brand Colors
- **Deep Blue**: `#003366` - Headers, footer, and primary buttons
- **Bright Red**: `#E53935` - Accents and call-to-action buttons
- **Golden Yellow**: `#FBC02D` - Highlights, icons, and section dividers
- **White**: `#FFFFFF` - Main background for clean, approachable look

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold sans-serif (700 weight)
- **Body Text**: Regular sans-serif (400 weight)

## 📁 File Structure

```
Seeds of Hope/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── Seeds of Hope.png   # Organization logo
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation
1. Download or clone the project files
2. Ensure all files are in the same directory
3. Open `index.html` in your web browser
4. The website should load with all functionality intact

### Local Development
For local development, you can use any of these methods:

**Option 1: Simple HTTP Server (Python)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option 2: Live Server (VS Code Extension)**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

**Option 3: Node.js HTTP Server**
```bash
npx http-server
```

## 🛠️ Customization Guide

### Updating Content

#### 1. Organization Information
Edit the following sections in `index.html`:
- Organization name and tagline
- Contact information
- Office hours
- Social media links

#### 2. Programs Section
Update the programs in the "Our Programs" section:
```html
<div class="program-card">
    <div class="program-icon">
        <i class="fas fa-[icon-name]"></i>
    </div>
    <h3 class="program-title">Your Program Title</h3>
    <p class="program-description">Your program description here.</p>
</div>
```

#### 3. Testimonials
Replace the placeholder testimonials with real community stories:
```html
<div class="testimonial">
    <div class="testimonial-content">
        <p class="testimonial-text">"Your testimonial text here."</p>
        <div class="testimonial-author">
            <div class="author-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="author-info">
                <h4 class="author-name">Author Name</h4>
                <p class="author-title">Author Title</p>
            </div>
        </div>
    </div>
</div>
```

#### 4. Statistics
Update the impact statistics in the About section:
```html
<div class="stat">
    <span class="stat-number">Your Number</span>
    <span class="stat-label">Your Label</span>
</div>
```

### Styling Customization

#### 1. Colors
Update the CSS custom properties in `styles.css`:
```css
:root {
    --deep-blue: #003366;      /* Your primary blue */
    --bright-red: #E53935;     /* Your accent red */
    --golden-yellow: #FBC02D;  /* Your highlight yellow */
    --white: #FFFFFF;          /* Your white */
}
```

#### 2. Typography
Change the font family in `styles.css`:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

#### 3. Layout Adjustments
Modify container widths, spacing, and grid layouts in `styles.css`:
```css
.container {
    max-width: 1200px; /* Adjust maximum width */
    padding: 0 20px;   /* Adjust padding */
}
```

### Adding Images

#### 1. Replace Placeholder Images
Replace the placeholder in the About section:
```html
<div class="about-image">
    <img src="path/to/your/image.jpg" alt="Description" class="about-img">
</div>
```

#### 2. Add CSS for New Images
```css
.about-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 20px;
}
```

### Form Configuration

The contact form is currently set up for demonstration. To make it functional:

1. **Backend Integration**: Connect to your preferred backend service
2. **Email Service**: Use services like Formspree, Netlify Forms, or custom backend
3. **Validation**: The form includes basic client-side validation

Example with Formspree:
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
    <!-- form fields -->
</form>
```

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Skip navigation link
- High contrast color scheme
- Focus indicators

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## 📈 Performance Optimization

- Optimized images
- Minified CSS and JavaScript (for production)
- Efficient animations using CSS transforms
- Lazy loading for images (can be added)
- Compressed assets

## 🚀 Deployment

### Static Hosting
The website can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a repository
- **AWS S3**: Upload files to S3 bucket
- **Traditional Web Hosting**: Upload via FTP

### Production Checklist
Before deploying to production:

1. [ ] Optimize images (compress and resize)
2. [ ] Minify CSS and JavaScript
3. [ ] Update meta tags for SEO
4. [ ] Test on multiple devices and browsers
5. [ ] Validate HTML and CSS
6. [ ] Test contact form functionality
7. [ ] Check accessibility compliance

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for Seeds of Hope Queensburgh. Please ensure you have permission to use and modify this code for your organization.

## 📞 Support

For questions or support:
- Email: info@seedsofhopequeensburgh.org.za
- Phone: +27 31 123 4567

## 🔄 Updates and Maintenance

### Regular Maintenance Tasks
- Update contact information
- Refresh testimonials and statistics
- Check and update social media links
- Review and update program information
- Test form functionality
- Monitor website performance

### Content Updates
- Keep programs and services current
- Update impact statistics regularly
- Refresh testimonials with new stories
- Update events and news sections (if added)

---

**Built with ❤️ for Seeds of Hope Queensburgh**
